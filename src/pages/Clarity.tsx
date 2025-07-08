import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const Clarity: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [clarityValue, setClarityValue] = useState<number>(50);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userCredits = profile?.credits ?? 0;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleGenerateImage = async () => {
    if (!uploadedImage || !user) return;

    setIsLoading(true);

    try {
      // Check credits
      if (userCredits <= 0) {
        alert("You don't have enough credits!");
        setIsLoading(false);
        return;
      }

      // Upload image to Supabase storage first
      const fileExt = 'jpg';
      const fileName = `clarity-${Math.random()}.${fileExt}`;
      
      // Convert base64 to blob
      const response = await fetch(uploadedImage);
      const blob = await response.blob();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);

      // Call AI enhancement function
      const { data, error } = await supabase.functions.invoke('ai-transform', {
        body: {
          prompt: `Enhance the clarity and sharpness of this image, increase detail and resolution, make it crisp and clear. Clarity level: ${clarityValue}%`,
          input_image: publicUrl,
          output_format: 'jpg',
        },
      });

      if (error) throw error;

      setGeneratedImage(data.output[0]);
      await refreshProfile();
    } catch (error: any) {
      console.error('Enhancement error:', error);
      alert('Enhancement failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Clarity AI</h1>
        {profile && <span className="text-lg">Credits: {userCredits}</span>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold">Upload Image</h2>
          <Input type="file" accept="image/*" onChange={handleImageUpload} className="max-w-xs" />
          {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="mt-4 rounded-lg shadow-lg" />}
        </div>
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold">Adjust Clarity</h2>
          <Slider
            defaultValue={[clarityValue]}
            max={100}
            step={1}
            onValueChange={(value) => setClarityValue(value[0])}
            className="w-full max-w-xs"
          />
          <span className="text-lg">{clarityValue}</span>
          <Button onClick={handleGenerateImage} disabled={!uploadedImage || isLoading || userCredits === 0}>
            {isLoading ? 'Generating...' : 'Generate Image (-1 Credit)'}
          </Button>
        </div>
      </div>
      {generatedImage && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Generated Image</h2>
          <img src={generatedImage} alt="Generated" className="mt-4 rounded-lg shadow-lg inline-block" />
        </div>
      )}
    </div>
  );
};

export default Clarity;
