
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const Clarity: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [clarityValue, setClarityValue] = useState<number>(50);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const applyClarityFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, intensity: number) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Apply unsharp mask filter for clarity
    const factor = intensity / 100;
    
    for (let i = 0; i < data.length; i += 4) {
      // Enhance contrast and sharpness
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Calculate luminance
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Apply contrast enhancement
      const contrast = 1.2 + (factor * 0.3);
      data[i] = Math.min(255, Math.max(0, (r - 128) * contrast + 128));
      data[i + 1] = Math.min(255, Math.max(0, (g - 128) * contrast + 128));
      data[i + 2] = Math.min(255, Math.max(0, (b - 128) * contrast + 128));
    }
    
    ctx.putImageData(imageData, 0, 0);
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
        ctx.drawImage(img, 0, 0);

        // Apply clarity filter
        applyClarityFilter(canvas, ctx, clarityValue);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Clarity Enhancement</h1>
        {profile && <span className="text-lg">Credits: {userCredits}</span>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold">Upload Image</h2>
          <Input type="file" accept="image/*" onChange={handleImageUpload} className="max-w-xs" />
          {uploadedImage && (
            <div className="space-y-4">
              <img src={uploadedImage} alt="Original" className="rounded-lg shadow-lg max-w-full" />
              <p className="text-sm text-muted-foreground text-center">Original Image</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold">Adjust Clarity</h2>
          <div className="w-full max-w-xs space-y-4">
            <div>
              <label className="text-sm font-medium">Clarity Level: {clarityValue}</label>
              <Slider
                value={[clarityValue]}
                onValueChange={(value) => setClarityValue(value[0])}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
            
            <Button 
              onClick={handleProcessImage} 
              disabled={!uploadedImage || isLoading || (!isPro && userCredits < 0.5)}
              className="w-full"
            >
              {isLoading ? 'Processing...' : isPro ? 'Enhance Clarity (Free for Pro)' : 'Enhance Clarity (-0.5 Credits)'}
            </Button>
          </div>
          
          {processedImage && (
            <div className="space-y-4">
              <img src={processedImage} alt="Enhanced" className="rounded-lg shadow-lg max-w-full" />
              <p className="text-sm text-muted-foreground text-center">Enhanced Image</p>
              <Button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = processedImage;
                  link.download = 'clarity-enhanced.jpg';
                  link.click();
                }}
                variant="outline"
                className="w-full"
              >
                Download Enhanced Image
              </Button>
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

export default Clarity;
