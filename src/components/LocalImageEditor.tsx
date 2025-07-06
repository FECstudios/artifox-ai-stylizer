
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const LocalImageEditor: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [blur, setBlur] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('none');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const userCredits = profile?.credits ?? 0;
  const isPro = profile?.user_status === 'paid';

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const applyFilters = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    // Apply CSS filters
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`;
    
    // Apply selected filter
    switch (selectedFilter) {
      case 'sepia':
        ctx.filter += ' sepia(100%)';
        break;
      case 'grayscale':
        ctx.filter += ' grayscale(100%)';
        break;
      case 'invert':
        ctx.filter += ' invert(100%)';
        break;
      case 'vintage':
        ctx.filter += ' sepia(50%) contrast(120%) brightness(90%)';
        break;
      case 'cool':
        ctx.filter += ' hue-rotate(180deg) saturate(120%)';
        break;
      case 'warm':
        ctx.filter += ' hue-rotate(45deg) saturate(110%) brightness(110%)';
        break;
    }
  };

  const handleProcessImage = async () => {
    if (!uploadedImage || !user) return;

    setIsLoading(true);

    try {
      // Check credits for non-pro users
      if (!isPro) {
        const creditsNeeded = 0.5;
        if (userCredits < creditsNeeded) {
          alert("You don't have enough credits!");
          setIsLoading(false);
          return;
        }

        // Deduct half a credit for non-pro users
        const newCredits = userCredits - creditsNeeded;
        await supabase
          .from('profiles')
          .update({ credits: newCredits })
          .eq('user_id', user.id);

        await refreshProfile();
      }

      // Process image locally
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;

        // Apply filters
        applyFilters(canvas, ctx);
        ctx.drawImage(img, 0, 0);

        // Reset filter for next operations
        ctx.filter = 'none';

        // Get processed image
        const processedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setProcessedImage(processedDataUrl);
      };
      img.src = uploadedImage;
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image');
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
    setSelectedFilter('none');
    setProcessedImage(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Local Image Editor</h1>
        {profile && <span className="text-lg">Credits: {userCredits}</span>}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Upload Image</h2>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploadedImage && (
            <div className="space-y-2">
              <img src={uploadedImage} alt="Original" className="w-full rounded-lg shadow-lg" />
              <p className="text-sm text-muted-foreground text-center">Original Image</p>
            </div>
          )}
        </div>

        {/* Controls Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Adjustments</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Brightness: {brightness}%</label>
              <Slider
                value={[brightness]}
                onValueChange={(value) => setBrightness(value[0])}
                max={200}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Contrast: {contrast}%</label>
              <Slider
                value={[contrast]}
                onValueChange={(value) => setContrast(value[0])}
                max={200}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            <div>
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

            <div>
              <label className="text-sm font-medium">Blur: {blur}px</label>
              <Slider
                value={[blur]}
                onValueChange={(value) => setBlur(value[0])}
                max={10}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Filter Effect</label>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="sepia">Sepia</SelectItem>
                  <SelectItem value="grayscale">Grayscale</SelectItem>
                  <SelectItem value="invert">Invert</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="cool">Cool</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              onClick={handleProcessImage} 
              disabled={!uploadedImage || isLoading || (!isPro && userCredits < 0.5)}
              className="w-full"
            >
              {isLoading ? 'Processing...' : isPro ? 'Apply Filters (Free for Pro)' : 'Apply Filters (-0.5 Credits)'}
            </Button>
            
            <Button onClick={resetFilters} variant="outline" className="w-full">
              Reset All Filters
            </Button>
          </div>
        </div>

        {/* Result Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Result</h2>
          {processedImage ? (
            <div className="space-y-4">
              <img src={processedImage} alt="Processed" className="w-full rounded-lg shadow-lg" />
              <p className="text-sm text-muted-foreground text-center">Processed Image</p>
              <Button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = processedImage;
                  link.download = 'edited-image.jpg';
                  link.click();
                }}
                variant="outline"
                className="w-full"
              >
                Download Edited Image
              </Button>
            </div>
          ) : (
            <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Processed image will appear here</p>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {/* Credit usage banner */}
      <div className="mt-8 p-4 bg-muted rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          {isPro 
            ? "🎉 Pro Account: Local image editing is FREE!" 
            : "💳 Local image editing uses 0.5 credits per operation"
          }
        </p>
      </div>
    </div>
  );
};

export default LocalImageEditor;
