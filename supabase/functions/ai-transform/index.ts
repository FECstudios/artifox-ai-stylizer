import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { Client } from "https://esm.sh/@gradio/client@latest";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Initialize Gradio client - no auth needed

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

    const { prompt, input_image } = await req.json();

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

    // Connect to Gradio client
    const client = await Client.connect("OmniGen2/OmniGen2");
    
    // Upload the image file to Gradio first
    console.log('Uploading image to Gradio...');
    const imageResponse = await fetch(input_image);
    const imageBlob = await imageResponse.blob();
    
    // Use the Gradio client predict method with proper parameters
    let result;
    if (profile.user_status === 'free') {
      // Free users get basic settings (matching working Python example but optimized)
      console.log('Using basic settings for free user');
      result = await client.predict("/run", {
        instruction: prompt,
        width_input: 512,
        height_input: 512,
        scheduler: "euler",
        num_inference_steps: 20, // Reduced for free users
        image_input_1: imageBlob,
        image_input_2: null,
        image_input_3: null,
        negative_prompt: "blurry, low quality",
        guidance_scale_input: 3, // Reduced for speed
        img_guidance_scale_input: 1.5,
        cfg_range_start: 0,
        cfg_range_end: 1,
        num_images_per_prompt: 1,
        max_input_image_side_length: 1024,
        max_pixels: 524288, // 512*512*2
        seed_input: 0,
      });
    } else {
      // Paid users get premium settings (closer to working Python example)
      console.log('Using premium settings for paid user');
      result = await client.predict("/run", {
        instruction: prompt,
        width_input: 1024,
        height_input: 1024,
        scheduler: "euler",
        num_inference_steps: 50,
        image_input_1: imageBlob,
        image_input_2: null,
        image_input_3: null,
        negative_prompt: "(((deformed))), blurry, over saturation, bad anatomy, disfigured, poorly drawn face, mutation, mutated, (extra_limb), (ugly), (poorly drawn hands), fused fingers, messy drawing, broken legs censor, censored, censor_bar",
        guidance_scale_input: 5,
        img_guidance_scale_input: 2,
        cfg_range_start: 0,
        cfg_range_end: 1,
        num_images_per_prompt: 1,
        max_input_image_side_length: 2048,
        max_pixels: 1048576,
        seed_input: 0,
      });
    }

    console.log('Raw result from OmniGen2:', result);
    const output = result.data;

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
        output: [output], // Return as array to match expected format
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