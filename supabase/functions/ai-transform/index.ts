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

// No authentication needed for Gradio client

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

    // Convert image URL to blob
    const imageResponse = await fetch(input_image);
    const imageBlob = await imageResponse.blob();

    // Connect to Gradio client
    const client = await Client.connect("OmniGen2/OmniGen2");
    
    // Call AI transform with optimized settings to avoid GPU timeout
    let result;
    if (profile.user_status === 'free') {
      // Free users get fast, lightweight settings
      console.log('Using fast settings for free user');
      result = await client.predict("/run", { 		
        instruction: prompt,
        width_input: 512, 		
        height_input: 512, 		
        scheduler: "euler", 		
        num_inference_steps: 10, // Reduced from 20 for speed
        image_input_1: imageBlob, 
        image_input_2: null,
        image_input_3: null, 		
        negative_prompt: "blurry, low quality", // Simplified negative prompt
        guidance_scale_input: 2, // Reduced for speed		
        img_guidance_scale_input: 1, // Reduced for speed		
        cfg_range_start: 0, 		
        cfg_range_end: 0.5, // Reduced for speed		
        num_images_per_prompt: 1, 		
        max_input_image_side_length: 512, 		
        max_pixels: 262144, 		
        seed_input: -1, 
      });
    } else {
      // Paid users get better quality but still optimized for speed
      console.log('Using balanced settings for paid user');
      result = await client.predict("/run", { 		
        instruction: prompt,
        width_input: 768, // Slightly larger but not too big		
        height_input: 768, 		
        scheduler: "euler", 		
        num_inference_steps: 20, // Moderate steps
        image_input_1: imageBlob, 
        image_input_2: null,
        image_input_3: null, 		
        negative_prompt: "blurry, low quality, distorted", 		
        guidance_scale_input: 3, 		
        img_guidance_scale_input: 1.5, 		
        cfg_range_start: 0, 		
        cfg_range_end: 0.8, 		
        num_images_per_prompt: 1, 		
        max_input_image_side_length: 768, 		
        max_pixels: 589824, // 768*768		
        seed_input: -1, 
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
        output: [output], // Wrap in array to match expected frontend format
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