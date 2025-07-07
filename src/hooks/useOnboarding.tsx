
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useOnboarding = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user && profile) {
      // Check if user has completed onboarding
      if (!profile.onboarding_completed) {
        setShowOnboarding(true);
      }
    }
  }, [user, profile]);

  const completeOnboarding = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('user_id', user.id);

      if (error) throw error;

      setShowOnboarding(false);
      
      // Show paywall after onboarding if user is free
      if (profile?.user_status === 'free') {
        setTimeout(() => {
          setShowPaywall(true);
        }, 500);
      }

      await refreshProfile();
    } catch (error: any) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    }
  };

  const startFreeTrial = async () => {
    if (!user) return;

    try {
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 7);

      const { error } = await supabase
        .from('profiles')
        .update({ 
          user_status: 'paid',
          paid_plan: 'trial',
          trial_ends_at: trialEndDate.toISOString(),
          credits: 100 // Give trial users more credits
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setShowPaywall(false);
      await refreshProfile();

      toast({
        title: "Free Trial Started!",
        description: "You now have 7 days of premium access with 100 credits.",
      });
    } catch (error: any) {
      console.error('Error starting free trial:', error);
      toast({
        title: "Error",
        description: "Failed to start free trial. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    showOnboarding,
    showPaywall,
    setShowPaywall,
    completeOnboarding,
    startFreeTrial,
  };
};
