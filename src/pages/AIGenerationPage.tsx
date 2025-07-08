
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AIGenerationPage: React.FC = () => {
  const { session } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [style, setStyle] = useState('cinematic');
  const [aspectRatio, setAspectRatio] = useState('1024x1024');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setImageUrl('');

    const { data, error } = await supabase.functions.invoke('text-to-image', {
      body: { 
        prompt: `${prompt}, ${style}`,
        negative_prompt: negativePrompt,
        image_size: aspectRatio,
      },
    });

    if (error) {
      console.error('Error generating image:', error);
    } else {
      setImageUrl(data.output[0]);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">AI Text-to-Image Generation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your main prompt here..."
            rows={4}
          />
          <Textarea
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="Enter things to avoid in the image..."
            rows={2}
          />
          <div className="flex space-x-4">
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cinematic">Cinematic</SelectItem>
                <SelectItem value="photographic">Photographic</SelectItem>
                <SelectItem value="anime">Anime</SelectItem>
                <SelectItem value="digital-art">Digital Art</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
              </SelectContent>
            </Select>
            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger>
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1024x1024">Square (1:1)</SelectItem>
                <SelectItem value="1344x768">Landscape (16:9)</SelectItem>
                <SelectItem value="768x1344">Portrait (9:16)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleGenerate} disabled={loading} className="w-full">
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </div>
        <div className="flex items-center justify-center bg-gray-100 rounded-lg">
          {imageUrl ? (
            <img src={imageUrl} alt="Generated Image" className="w-full h-auto rounded-lg shadow-lg" />
          ) : (
            <p className="text-gray-500">Your generated image will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGenerationPage;
