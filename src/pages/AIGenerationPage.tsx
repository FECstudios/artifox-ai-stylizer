import { AITransform } from '@/components/AITransform';
import { ImageGenerator } from '@/components/ImageGenerator';
import { EnhancePhoto } from '@/components/EnhancePhoto';
import { RemoveBackground } from '@/components/RemoveBackground';
import { ColorizePhoto } from '@/components/ColorizePhoto';
import { AuthDialog } from '@/components/AuthDialog';
import { UpgradeBanner } from '@/components/UpgradeBanner';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AIGenerationPage: React.FC = () => {
  const { session, signOut, profile } = useAuth();
  const userCredits = profile?.credits ?? 0; 
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const getToolTitle = () => {
    const path = location.pathname;
    if (path.includes('image-generator')) return 'AI Image Generator';
    if (path.includes('style-transfer')) return 'Style Transfer';
    if (path.includes('enhance-photo')) return 'Photo Enhancer';
    if (path.includes('remove-background')) return 'Background Remover';
    if (path.includes('colorize')) return 'Photo Colorizer';
    if (path.includes('face-swap')) return 'Face Swap';
    if (path.includes('upscale')) return 'Image Upscaler';
    if (path.includes('anime-converter')) return 'Anime Converter';
    if (path.includes('sketch-to-art')) return 'Sketch to Art';
    if (path.includes('age-progression')) return 'Age Progression';
    if (path.includes('object-removal')) return 'Object Removal';
    if (path.includes('logo-generator')) return 'Logo Generator';
    return 'AI Tool';
  };

  const renderTool = () => {
    const path = location.pathname;
    if (path.includes('image-generator')) return <ImageGenerator />;
    if (path.includes('enhance-photo')) return <EnhancePhoto />;
    if (path.includes('remove-background')) return <RemoveBackground />;
    if (path.includes('colorize')) return <ColorizePhoto />;
    // For other tools, use the existing AITransform with different prompts
    return <AITransform />;
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-0 md:px-4 max-w-screen-lg py-8 overflow-x-hidden" style={{overflowX: 'hidden'}}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">{getToolTitle()}</h1>
        {session && (
          <div className="flex items-center space-x-4">
            <span className="text-lg">Credits: {userCredits}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
      <section className="py-8 px-4">
        {renderTool()}
      </section>
      <UpgradeBanner />
      <AuthDialog open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default AIGenerationPage;
