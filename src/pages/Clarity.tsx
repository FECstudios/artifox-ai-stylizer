
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Download, Upload } from 'lucide-react';

const Clarity: React.FC = () => {
  const { profile } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [sharpness, setSharpness] = useState<number>(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const userCredits = profile?.credits ?? 0;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);
        setEnhancedImage(null);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const applyFilters = () => {
    if (!uploadedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Apply filters using CSS filter string
      const filterString = `
        brightness(${brightness}%) 
        contrast(${contrast}%) 
        saturate(${saturation}%)
      `;

      ctx.filter = filterString;
      ctx.drawImage(img, 0, 0);

      // Apply sharpening if needed
      if (sharpness !== 100) {
        applySharpenFilter(ctx, canvas.width, canvas.height, (sharpness - 100) / 100);
      }

      const enhancedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setEnhancedImage(enhancedDataUrl);
    };
    img.src = uploadedImage;
  };

  const applySharpenFilter = (ctx: CanvasRenderingContext2D, width: number, height: number, amount: number) => {
    if (amount === 0) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const factor = amount;
    const kernel = [
      0, -factor, 0,
      -factor, 1 + 4 * factor, -factor,
      0, -factor, 0
    ];

    const newData = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let sum = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const pixel = ((y + ky) * width + (x + kx)) * 4 + c;
              sum += data[pixel] * kernel[(ky + 1) * 3 + (kx + 1)];
            }
          }
          const pixel = (y * width + x) * 4 + c;
          newData[pixel] = Math.max(0, Math.min(255, sum));
        }
      }
    }

    const newImageData = new ImageData(newData, width, height);
    ctx.putImageData(newImageData, 0, 0);
  };

  const downloadImage = () => {
    if (enhancedImage) {
      const link = document.createElement('a');
      link.href = enhancedImage;
      link.download = `enhanced-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setSharpness(100);
    setEnhancedImage(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Clarity Enhancement</h1>
        {profile && <span className="text-lg">Credits: {userCredits}</span>}
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>
              Upload an image to enhance its clarity and quality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      ref={imageRef}
                      src={uploadedImage}
                      alt="Uploaded"
                      className="max-w-full h-48 object-contain mx-auto rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUploadedImage(null);
                        setEnhancedImage(null);
                        resetFilters();
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
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                  id="image-upload"
                />
                {!uploadedImage && (
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    Select Image
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {uploadedImage && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Enhancement Controls</CardTitle>
                <CardDescription>
                  Adjust these settings to enhance your image
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brightness: {brightness}%</label>
                  <Slider
                    value={[brightness]}
                    onValueChange={(value) => setBrightness(value[0])}
                    max={200}
                    min={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Contrast: {contrast}%</label>
                  <Slider
                    value={[contrast]}
                    onValueChange={(value) => setContrast(value[0])}
                    max={200}
                    min={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Saturation: {saturation}%</label>
                  <Slider
                    value={[saturation]}
                    onValueChange={(value) => setSaturation(value[0])}
                    max={200}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sharpness: {sharpness}%</label>
                  <Slider
                    value={[sharpness]}
                    onValueChange={(value) => setSharpness(value[0])}
                    max={200}
                    min={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button onClick={applyFilters} className="flex-1">
                    Apply Enhancement
                  </Button>
                  <Button onClick={resetFilters} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enhanced Image</CardTitle>
                <CardDescription>
                  Your enhanced image will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enhancedImage ? (
                  <div className="space-y-4">
                    <img
                      src={enhancedImage}
                      alt="Enhanced"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                    <Button onClick={downloadImage} className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Enhanced Image
                    </Button>
                  </div>
                ) : (
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Click "Apply Enhancement" to see the result
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default Clarity;
