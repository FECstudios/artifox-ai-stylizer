
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: Deno.env.get("REPLICATE_API_TOKEN"),
});

serve(async (req) => {
  const { prompt, negative_prompt, image_size } = await req.json();

  const output = await replicate.run(
    "black-forest-labs/flux-schnell:9d23532d373645b897547736809c444395851371486c5b8888a838a61e35cc7b",
    {
      input: {
        prompt: `${prompt}${negative_prompt ? `, negative prompt: ${negative_prompt}` : ''}`,
        image_size: image_size,
      },
    }
  );

  return new Response(JSON.stringify({ output }), {
    headers: { "Content-Type": "application/json" },
  });
});
