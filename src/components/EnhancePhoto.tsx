import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Sparkles, Download } from "lucide-react";

export const EnhancePhoto = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [enhanceStrength, setEnhanceStrength] = useState<number>(50);
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

  const handleEnhance = async () => {
    if (!selectedFile) {
      toast({
        title: "Missing Information",
        description: "Please select an image to enhance.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to enhance your photo.",
        variant: "destructive",
      });
      return;
    }

    if ((profile?.credits || 0) <= 0) {
      toast({
        title: "No Credits Remaining",
        description: "You need credits to enhance photos. Consider upgrading your plan.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage(selectedFile);
      
      const { data, error } = await supabase.functions.invoke('ai-transform', {
        body: {
          prompt: `enhance this photo, improve quality, clarity, and details. Enhancement strength: ${enhanceStrength}%`,
          input_image: imageUrl,
          output_format: 'jpg',
        },
      });

      if (error) throw error;

      setResult(data.output[0]);
      await refreshProfile();
      
      toast({
        title: "Photo Enhanced!",
        description: `Credits remaining: ${data.credits_remaining}`,
      });
    } catch (error: any) {
      console.error('Enhancement error:', error);
      toast({
        title: "Enhancement Failed",
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
      link.download = `artifox-enhanced-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Photo Enhancer
        </h2>
        <p className="text-muted-foreground">
          Enhance your photos with AI - improve quality, clarity, and details
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
            <CardTitle>Upload & Enhance</CardTitle>
            <CardDescription>
              Upload your photo and adjust enhancement settings
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

            <div className="space-y-2">
              <Label htmlFor="enhance-strength">Enhancement Strength</Label>
              <Slider
                id="enhance-strength"
                value={[enhanceStrength]}
                max={100}
                step={1}
                onValueChange={(value) => setEnhanceStrength(value[0])}
                className="w-full"
              />
              <span className="text-sm text-muted-foreground">{enhanceStrength}%</span>
            </div>

            <Button
              onClick={handleEnhance}
              disabled={loading || !selectedFile}
              className="w-full"
              size="lg"
            >
              {loading ? (
                "Enhancing..."
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Enhance Photo (-1 Credit)
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enhanced Photo</CardTitle>
            <CardDescription>
              Your enhanced photo will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <img
                  src={result}
                  alt="Enhanced"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <Button onClick={downloadResult} className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Enhanced Photo
                </Button>
              </div>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Your enhanced photo will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};