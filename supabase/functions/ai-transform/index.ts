import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import Replicate from "https://esm.sh/replicate@0.25.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const replicate = new Replicate({
  auth: Deno.env.get('REPLICATE_API_TOKEN') ?? '',
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Verify the JWT token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Invalid authentication');
    }

    // Get user profile and check credits
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      throw new Error('User profile not found');
    }

    if (profile.credits <= 0) {
      return new Response(
        JSON.stringify({ error: 'Insufficient credits' }),
        {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { prompt, input_image, output_format = 'jpg' } = await req.json();

    if (!prompt || !input_image) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: prompt and input_image' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Transforming image with prompt:', prompt);
    console.log('User status:', profile.user_status);

    // Call AI transform based on user status
    let output;
    if (profile.user_status === 'free') {
      // Free users get flux-kontext-dev
      console.log('Using flux-kontext-dev for free user');
      output = await replicate.run(
        "black-forest-labs/flux-kontext-dev",
        {
          input: {
            prompt: prompt,
            input_image: input_image,
            output_format: output_format,
            num_inference_steps: 30
          }
        }
      );
    } else {
      // Paid users get flux-kontext-pro
      console.log('Using flux-kontext-pro for paid user');
      output = await replicate.run(
        "black-forest-labs/flux-kontext-pro",
        {
          input: {
            prompt: prompt,
            input_image: input_image,
            output_format: output_format
          }
        }
      );
    }

    console.log('Transformation completed');

    // Deduct a credit from user's account
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ credits: profile.credits - 1 })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Failed to update credits:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        output,
        credits_remaining: profile.credits - 1
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in ai-transform function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});