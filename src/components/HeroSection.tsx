import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Sparkles, Zap } from "lucide-react";
import { AuthDialog } from "./AuthDialog";
import heroImage from "@/assets/hero-transform.jpg";

export const HeroSection = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-glow-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">AI-Powered Photo Transformation</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                Turn Photos into
                <br />
                <span className="text-accent">Art with AI</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Transform your photos into eye-catching, stylized artworks — from 90s cartoons to elegant watercolor portraits — in seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="xl" 
                className="group animate-glow-pulse"
                onClick={() => setAuthDialogOpen(true)}
              >
                <Upload className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Creating with AI
              </Button>
              
              <Button 
                variant="creative" 
                size="xl"
                onClick={() => document.getElementById('styles')?.scrollIntoView({ behavior: 'smooth' })}
                className="group hover-scale"
              >
                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                See 20+ Styles
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>5 free transformations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Instant results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-glow rounded-full"></div>
                <span>20+ art styles</span>
              </div>
            </div>
          </div>

          {/* Right side - Hero Image */}
          <div className="relative animate-scale-in delay-300">
            <div className="relative bg-gradient-card backdrop-blur-lg border border-primary/20 rounded-3xl p-6 shadow-elegant">
              <img 
                src={heroImage} 
                alt="Photo transformation showcase" 
                className="w-full rounded-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-primary rounded-2xl p-4 shadow-glow">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </section>
  );
};