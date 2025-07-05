import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Initialize Hugging Face client
const hf = new HfInference(Deno.env.get('HF_TOKEN'));

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

    // Create a combined prompt for image transformation
    const transformPrompt = `${prompt}`;

    // Use Hugging Face Inference API for reliable image generation
    let result;
    if (profile.user_status === 'free') {
      // Free users get basic image-to-image transformation
      console.log('Using basic image-to-image model for free user');
      
      // Fetch the input image
      const imageResponse = await fetch(input_image);
      const imageBlob = await imageResponse.blob();
      
      result = await hf.imageToImage({
        inputs: imageBlob,
        parameters: {
          prompt: transformPrompt,
          negative_prompt: "blurry, low quality",
          num_inference_steps: 20,
          strength: 0.7,
          guidance_scale: 7
        },
        model: 'runwayml/stable-diffusion-v1-5'
      });
    } else {
      // Paid users get better quality transformation
      console.log('Using premium image-to-image model for paid user');
      
      // Fetch the input image
      const imageResponse = await fetch(input_image);
      const imageBlob = await imageResponse.blob();
      
      result = await hf.imageToImage({
        inputs: imageBlob,
        parameters: {
          prompt: transformPrompt,
          negative_prompt: "blurry, low quality, distorted",
          num_inference_steps: 30,
          strength: 0.8,
          guidance_scale: 9
        },
        model: 'stabilityai/stable-diffusion-xl-base-1.0'
      });
    }

    // Convert the blob to a base64 string for consistent response format
    const arrayBuffer = await result.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const output = `data:image/png;base64,${base64}`;

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