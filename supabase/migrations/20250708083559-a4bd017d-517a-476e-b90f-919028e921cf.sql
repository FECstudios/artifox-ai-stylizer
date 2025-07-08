
-- Add onboarding_completed and trial_ends_at columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN onboarding_completed BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN trial_ends_at TIMESTAMP WITH TIME ZONE;
