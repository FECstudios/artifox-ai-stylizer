import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Sparkles, Download } from "lucide-react";

export const ColorizePhoto = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleColorize = async () => {
    if (!selectedFile) {
      toast({
        title: "Missing Information",
        description: "Please select an image to colorize.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to colorize photos.",
        variant: "destructive",
      });
      return;
    }

    if ((profile?.credits || 0) <= 0) {
      toast({
        title: "No Credits Remaining",
        description: "You need credits to colorize photos. Consider upgrading your plan.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage(selectedFile);
      
      const { data, error } = await supabase.functions.invoke('ai-transform', {
        body: {
          prompt: "colorize this black and white photo, add realistic natural colors, vibrant but historically accurate colors",
          input_image: imageUrl,
          output_format: 'jpg',
        },
      });

      if (error) throw error;

      setResult(data.output[0]);
      await refreshProfile();
      
      toast({
        title: "Photo Colorized!",
        description: `Credits remaining: ${data.credits_remaining}`,
      });
    } catch (error: any) {
      console.error('Colorization error:', error);
      toast({
        title: "Colorization Failed",
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
      link.download = `artifox-colorized-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Photo Colorizer
        </h2>
        <p className="text-muted-foreground">
          Bring black and white photos to life with AI colorization
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
            <CardTitle>Upload Photo</CardTitle>
            <CardDescription>
              Upload a black and white photo to colorize
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Upload Photo</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center space-y-4">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-full h-48 object-contain mx-auto rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl("");
                      }}
                    >
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                )}
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="sr-only"
                />
                {!previewUrl && (
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    Select Photo
                  </Button>
                )}
              </div>
            </div>

            <Button
              onClick={handleColorize}
              disabled={loading || !selectedFile}
              className="w-full"
              size="lg"
            >
              {loading ? (
                "Colorizing..."
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Colorize Photo (-1 Credit)
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Colorized Photo</CardTitle>
            <CardDescription>
              Your colorized photo will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <img
                  src={result}
                  alt="Colorized"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <Button onClick={downloadResult} className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Colorized Photo
                </Button>
              </div>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Your colorized photo will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};