import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Sparkles, Download, Star } from "lucide-react";
import { Link } from "react-router-dom";

const STYLE_PRESETS = [
  { value: "90s cartoon", label: "90s Cartoon" },
  { value: "watercolor painting", label: "Watercolor" },
  { value: "pop art style", label: "Pop Art" },
  { value: "oil painting", label: "Oil Painting" },
  { value: "anime style", label: "Anime" },
  { value: "pencil sketch", label: "Pencil Sketch" },
  { value: "stained glass", label: "Stained Glass" },
  { value: "cyberpunk style", label: "Cyberpunk" },
];

export const AITransform = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [style, setStyle] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
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

  const handleTransform = async () => {
    if (!selectedFile || (!style && !customPrompt)) {
      toast({
        title: "Missing Information",
        description: "Please select an image and choose a style or enter a custom prompt.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to transform your image.",
        variant: "destructive",
      });
      return;
    }

    if ((profile?.credits || 0) <= 0) {
      toast({
        title: "No Credits Remaining",
        description: "You need credits to transform images. Consider upgrading your plan.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Upload image to Supabase storage
      const imageUrl = await uploadImage(selectedFile);
      
      // Call AI transform function
      const { data, error } = await supabase.functions.invoke('ai-transform', {
        body: {
          prompt: customPrompt || `Make this image in ${style} style`,
          input_image: imageUrl,
          output_format: 'jpg',
        },
      });

      if (error) throw error;

      setResult(data.output[0]);
      await refreshProfile(); // Update credits count
      
      toast({
        title: "Transformation Complete!",
        description: `Credits remaining: ${data.credits_remaining}`,
      });
    } catch (error: any) {
      console.error('Transform error:', error);
      toast({
        title: "Transformation Failed",
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
      link.download = `artifox-transform-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Transform Your Image
        </h2>
        <p className="text-muted-foreground">
          Upload an image and watch AI transform it into stunning artwork
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
        {/* Upload and Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Upload & Style</CardTitle>
            <CardDescription>
              Choose your image and transformation style
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="image-upload">Upload Image</Label>
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
                      Change Image
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
                    Select Image
                  </Button>
                )}
              </div>
            </div>

            {/* Style Selection */}
            <div className="space-y-2">
              <Label htmlFor="style-select">Choose Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a transformation style" />
                </SelectTrigger>
                <SelectContent>
                  {STYLE_PRESETS.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Prompt */}
            <div className="space-y-2">
              <Label htmlFor="custom-prompt">Or Custom Prompt</Label>
              <Input
                id="custom-prompt"
                placeholder="Describe your desired transformation..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
              />
            </div>

            <Button
              onClick={handleTransform}
              disabled={loading || !selectedFile || (!style && !customPrompt)}
              className="w-full"
              size="lg"
            >
              {loading ? (
                "Transforming..."
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Transform Image
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>
              Your AI-transformed artwork will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <img
                  src={result}
                  alt="Transformed"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <Button onClick={downloadResult} className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Result
                </Button>
              </div>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Your transformed image will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const UpgradeBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-gradient-to-r from-purple-700 to-indigo-800 p-3 md:p-6 text-white shadow-lg z-50 animate-slide-in-up overflow-x-hidden">
      <div className="w-full md:max-w-7xl md:mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
          <Star className="w-7 h-7 md:w-8 md:h-8 text-yellow-300 animate-pulse flex-shrink-0" />
          <div className="flex-1 text-center md:text-left">
            <p className="font-bold text-base md:text-xl mb-1">Unlock Pro: Unlimited AI Transformations!</p>
            <p className="text-xs md:text-base flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4" /> High-Res Outputs <span className="mx-1">•</span> Priority Processing
            </p>
          </div>
        </div>
        <Button
          asChild
          variant="secondary"
          size="lg"
          className="w-full md:w-auto text-indigo-800 font-semibold hover:bg-indigo-50 text-base md:text-lg py-2 md:py-3 px-4 md:px-6"
        >
          <Link to="/upgrade-pro">Upgrade Now</Link>
        </Button>
      </div>
    </div>
  );
};