
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, ChevronLeft, Sparkles, Wand2, Image, Palette } from 'lucide-react';

interface MobileOnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    icon: <Sparkles className="w-12 h-12 text-primary" />,
    title: "Welcome to Artifox",
    description: "Transform your photos with AI-powered editing tools and create stunning artwork in seconds."
  },
  {
    icon: <Wand2 className="w-12 h-12 text-primary" />,
    title: "AI-Powered Editing",
    description: "Use advanced AI to enhance, restore, and transform your images with just a few taps."
  },
  {
    icon: <Image className="w-12 h-12 text-primary" />,
    title: "Generate Art",
    description: "Create original artwork from text prompts using our cutting-edge AI generation tools."
  },
  {
    icon: <Palette className="w-12 h-12 text-primary" />,
    title: "Local Tools",
    description: "Access powerful local editing tools for quick adjustments and enhancements."
  }
];

export const MobileOnboarding: React.FC<MobileOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = onboardingSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-muted h-1">
        <div 
          className="h-full bg-gradient-primary transition-all duration-300"
          style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
        />
      </div>

      {/* Skip button */}
      <div className="flex justify-end p-4">
        <Button variant="ghost" size="sm" onClick={onComplete}>
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        <Card className="w-full max-w-lg border-0 shadow-none bg-transparent">
          <CardContent className="text-center space-y-8 p-8">
            <div className="flex justify-center mb-6">
              <div className="p-6 rounded-full bg-primary/10">
                {step.icon}
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-foreground">
                {step.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
                {step.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step indicators */}
        <div className="flex space-x-2 mt-8">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="opacity-50 disabled:opacity-0"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        <Button
          onClick={nextStep}
          size="lg"
          className="px-8"
        >
          {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          {currentStep < onboardingSteps.length - 1 && (
            <ChevronRight className="w-4 h-4 ml-1" />
          )}
        </Button>
      </div>
    </div>
  );
};
