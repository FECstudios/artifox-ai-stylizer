import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Check, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthDialog } from "./AuthDialog";
import { useState } from "react";

export const PricingSection = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authRedirectTo, setAuthRedirectTo] = useState("/ai-generation");
  const navigate = useNavigate();
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Free to Start
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Try Artifox with 5 free transformations, then unlock unlimited creativity
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <Card className="bg-gradient-card backdrop-blur-lg border-primary/20 p-8 relative hover-scale animate-fade-in transition-all duration-300 hover:shadow-glow">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Free Plan</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">$0</span>
                  <span className="text-muted-foreground">to start</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">5 free AI transformations</span>
                </div>
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">All 24+ art styles</span>
                </div>
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Email delivery</span>
                </div>
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Instant download</span>
                </div>
              </div>

              <Button
                variant="creative"
                className="w-full group"
                size="lg"
                onClick={() => {
                  setAuthRedirectTo("/ai-generation");
                  setAuthDialogOpen(true);
                }}
              >
                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Start Free
              </Button>
            </div>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-gradient-primary/10 backdrop-blur-lg border-primary/40 p-8 relative overflow-hidden hover-scale animate-fade-in transition-all duration-300 hover:shadow-glow pulse-glow" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-4 right-4 animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-1 bg-accent text-accent-foreground text-sm px-3 py-1 rounded-full font-medium">
                <Star className="w-4 h-4 fill-current" />
                Popular
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Pro Access</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">$9.99</span>
                  <span className="text-muted-foreground">one-time</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">100 AI transformations</span>
                </div>
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Priority processing</span>
                </div>
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">High resolution outputs</span>
                </div>
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Early access to new styles</span>
                </div>
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Commercial usage rights</span>
                </div>
              </div>

              <Button
                variant="hero"
                className="w-full group"
                size="lg"
                onClick={() => {
                  setAuthRedirectTo("/upgrade-pro");
                  setAuthDialogOpen(true);
                }}
              >
                <Star className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Upgrade to Pro
              </Button>
            </div>

            <div className="absolute inset-0 bg-gradient-primary opacity-5 pointer-events-none"></div>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            💳 Secure payment via Google Play • 🔒 No subscription • ✨ One-time purchase
          </p>
        </div>
      </div>
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        redirectTo={authRedirectTo}
      />
    </section>
  );
};