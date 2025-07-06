
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const AIGeneration: React.FC = () => {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userCredits = profile?.credits ?? 0;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim() || !user) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('replicate-generate', {
        body: { prompt: prompt.trim() }
      });

      if (error) throw error;

      if (data?.output && data.output.length > 0) {
        setGeneratedImage(data.output[0]);
        await refreshProfile();
      }
    } catch (error: any) {
      console.error('Error generating image:', error);
      alert('Failed to generate image: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">AI Image Generation</h1>
        {profile && (
          <div className="flex items-center space-x-4">
            <span className="text-lg">Credits: {userCredits}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Generate Images with AI</h2>
          <p className="text-center text-muted-foreground">
            Create stunning images from text prompts using FLUX Schnell
          </p>
          
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full"
            />
            
            <Button 
              onClick={handleGenerateImage} 
              disabled={!prompt.trim() || isLoading || userCredits === 0}
              className="w-full"
            >
              {isLoading ? 'Generating...' : `Generate Image (-1 Credit)`}
            </Button>
            
            {userCredits === 0 && (
              <p className="text-center text-red-500">
                You need credits to generate images. Please upgrade your account.
              </p>
            )}
          </div>
        </div>

        {generatedImage && (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold">Generated Image</h3>
            <img 
              src={generatedImage} 
              alt="Generated" 
              className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
            />
            <Button
              onClick={() => {
                const link = document.createElement('a');
                link.href = generatedImage;
                link.download = 'generated-image.webp';
                link.click();
              }}
              variant="outline"
            >
              Download Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGeneration;
