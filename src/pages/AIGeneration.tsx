
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIGeneration: React.FC = () => {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const userCredits = profile?.credits ?? 0;

  const handleLogout = async () => {
    await signOut();
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing Prompt",
        description: "Please enter a description for the image you want to generate.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to generate images.",
        variant: "destructive",
      });
      return;
    }

    if (userCredits <= 0) {
      toast({
        title: "No Credits Remaining",
        description: "You need credits to generate images. Consider upgrading your plan.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('replicate-generate', {
        body: {
          prompt: prompt,
        },
      });

      if (error) throw error;

      if (data.output && data.output.length > 0) {
        setGeneratedImage(data.output[0]);
        await refreshProfile();
        toast({
          title: "Image Generated!",
          description: `Credits remaining: ${data.credits_remaining || userCredits - 1}`,
        });
      }
    } catch (error: any) {
      console.error('Generate error:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `generated-image-${Date.now()}.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">AI Image Generation</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-lg">Credits: {userCredits}</span>
            <Link to="/ai-editing">
              <Button variant="outline">AI Editing</Button>
            </Link>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Generate Images with AI
          </h2>
          <p className="text-muted-foreground">
            Describe what you want to see and let AI create stunning artwork for you
          </p>
          {user && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                {userCredits} credits remaining
              </span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Image Prompt</CardTitle>
              <CardDescription>
                Describe the image you want to generate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Textarea
                  placeholder="e.g., A majestic dragon flying over a medieval castle at sunset, digital art style"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim() || userCredits === 0}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  "Generating..."
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Image (-1 Credit)
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Image</CardTitle>
              <CardDescription>
                Your AI-generated artwork will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedImage ? (
                <div className="space-y-4">
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <Button onClick={downloadImage} className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                  </Button>
                </div>
              ) : (
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                    Your generated image will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIGeneration;
