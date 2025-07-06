import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Download } from "lucide-react";

const ASPECT_RATIOS = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "16:9", label: "Landscape (16:9)" },
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "4:3", label: "Standard (4:3)" },
  { value: "3:2", label: "Photo (3:2)" },
];

export const ImageGenerator = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a prompt to generate an image.",
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

    if ((profile?.credits || 0) <= 0) {
      toast({
        title: "No Credits Remaining",
        description: "You need credits to generate images. Consider upgrading your plan.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('replicate-generate', {
        body: {
          prompt: prompt,
          aspect_ratio: aspectRatio,
        },
      });

      if (error) throw error;

      setResult(data.output[0]);
      
      // Deduct credit
      await supabase
        .from('profiles')
        .update({ credits: (profile?.credits || 0) - 1 })
        .eq('user_id', user.id);
      
      await refreshProfile();
      
      toast({
        title: "Image Generated!",
        description: `Credits remaining: ${(profile?.credits || 0) - 1}`,
      });
    } catch (error: any) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result;
      link.download = `artifox-generated-${Date.now()}.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          AI Image Generator
        </h2>
        <p className="text-muted-foreground">
          Generate stunning images from text descriptions using AI
        </p>
        {user && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary/10 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              {profile?.credits || 0} credits remaining
            </span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate Image</CardTitle>
            <CardDescription>
              Describe what you want to see and AI will create it
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Input
                id="prompt"
                placeholder="A majestic mountain landscape at sunset..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger>
                  <SelectValue placeholder="Select aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  {ASPECT_RATIOS.map((ratio) => (
                    <SelectItem key={ratio.value} value={ratio.value}>
                      {ratio.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full"
              size="lg"
            >
              {loading ? (
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
            {result ? (
              <div className="space-y-4">
                <img
                  src={result}
                  alt="Generated"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <Button onClick={downloadResult} className="w-full" variant="outline">
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
  );
};