import { AITransform } from '@/components/AITransform';
import { AuthDialog } from '@/components/AuthDialog';
import { UpgradeBanner } from '@/components/UpgradeBanner';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AIGeneration: React.FC = () => {
  const { session, signOut, profile } = useAuth();
  const userCredits = profile?.credits ?? 0; 
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-0 md:px-4 max-w-screen-lg py-8 pb-[120px] md:pb-[160px] lg:pb-[180px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">AI Generation Page</h1>
        {session && (
          <div className="flex items-center space-x-4">
            <span className="text-lg">Credits: {userCredits}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
      <p className="text-lg mt-4">
        This is where the AI generation magic happens!
      </p>
      <section className="py-20 px-4">
        <AITransform />
      </section>
      <AuthDialog open={open} onOpenChange={setOpen} />
      <UpgradeBanner />
    </div>
  );
};

export default AIGeneration;
