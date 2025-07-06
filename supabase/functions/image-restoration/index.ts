
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: Deno.env.get("REPLICATE_API_TOKEN"),
});

serve(async (req) => {
  const { imageUrl } = await req.json();

  const output = await replicate.run(
    "flux-kontext-apps/restore-image:62b3a6436c163b523c4633c0a2a3a84445443030075716231a1a2c33440996d4",
    {
      input: {
        input_image: imageUrl,
      },
    }
  );

  return new Response(JSON.stringify({ output }), {
    headers: { "Content-Type": "application/json" },
  });
});
