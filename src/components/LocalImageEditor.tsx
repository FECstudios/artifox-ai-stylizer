
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Download, Upload, RotateCw, FlipHorizontal, FlipVertical } from 'lucide-react';

const LocalImageEditor: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);
        setProcessedImage(null);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const processImage = (operation: string) => {
    if (!uploadedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch (operation) {
        case 'grayscale':
          ctx.filter = 'grayscale(100%)';
          break;
        case 'sepia':
          ctx.filter = 'sepia(100%)';
          break;
        case 'invert':
          ctx.filter = 'invert(100%)';
          break;
        case 'blur':
          ctx.filter = 'blur(3px)';
          break;
        case 'vintage':
          ctx.filter = 'sepia(50%) contrast(120%) brightness(110%) saturate(130%)';
          break;
        default:
          ctx.filter = 'none';
      }

      ctx.drawImage(img, 0, 0);
      const processedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setProcessedImage(processedDataUrl);
    };
    img.src = uploadedImage;
  };

  const applyTransform = () => {
    if (!uploadedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const centerX = img.width / 2;
      const centerY = img.height / 2;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -centerX, -centerY);

      ctx.restore();

      const transformedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setProcessedImage(transformedDataUrl);
    };
    img.src = uploadedImage;
  };

  const cropToSquare = () => {
    if (!uploadedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const x = (img.width - size) / 2;
      const y = (img.height - size) / 2;

      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(img, x, y, size, size, 0, 0, size, size);

      const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setProcessedImage(croppedDataUrl);
    };
    img.src = uploadedImage;
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `edited-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Local Image Editor</h1>
          <p className="text-muted-foreground">
            Edit your images locally without using credits
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>
              Upload an image to start editing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              {uploadedImage ? (
                <div className="space-y-4">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="max-w-full h-48 object-contain mx-auto rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setUploadedImage(null);
                      setProcessedImage(null);
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
          </CardContent>
        </Card>

        {uploadedImage && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Editing Tools</CardTitle>
                <CardDescription>
                  Choose an editing operation to apply
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="filters" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="filters">Filters</TabsTrigger>
                    <TabsTrigger value="transform">Transform</TabsTrigger>
                    <TabsTrigger value="crop">Crop</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="filters" className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button onClick={() => processImage('grayscale')} variant="outline">
                        Grayscale
                      </Button>
                      <Button onClick={() => processImage('sepia')} variant="outline">
                        Sepia
                      </Button>
                      <Button onClick={() => processImage('invert')} variant="outline">
                        Invert
                      </Button>
                      <Button onClick={() => processImage('blur')} variant="outline">
                        Blur
                      </Button>
                      <Button onClick={() => processImage('vintage')} variant="outline">
                        Vintage
                      </Button>
                      <Button onClick={() => processImage('original')} variant="outline">
                        Original
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="transform" className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Rotation: {rotation}°</label>
                        <Slider
                          value={[rotation]}
                          onValueChange={(value) => setRotation(value[0])}
                          max={360}
                          min={0}
                          step={90}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => setFlipH(!flipH)}
                          variant={flipH ? "default" : "outline"}
                          size="sm"
                        >
                          <FlipHorizontal className="w-4 h-4 mr-1" />
                          Flip H
                        </Button>
                        <Button
                          onClick={() => setFlipV(!flipV)}
                          variant={flipV ? "default" : "outline"}
                          size="sm"
                        >
                          <FlipVertical className="w-4 h-4 mr-1" />
                          Flip V
                        </Button>
                      </div>
                      
                      <Button onClick={applyTransform} className="w-full">
                        Apply Transform
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="crop" className="space-y-4">
                    <Button onClick={cropToSquare} className="w-full" variant="outline">
                      Crop to Square
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Result</CardTitle>
                <CardDescription>
                  Your edited image will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {processedImage ? (
                  <div className="space-y-4">
                    <img
                      src={processedImage}
                      alt="Processed"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                    <Button onClick={downloadImage} className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Result
                    </Button>
                  </div>
                ) : (
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Apply an editing operation to see the result
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

export default LocalImageEditor;
