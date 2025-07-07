
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CheckCircle, Crown, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartFreeTrial: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ 
  open, 
  onOpenChange, 
  onStartFreeTrial 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <div className="relative bg-gradient-primary text-white p-6 rounded-t-lg">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 text-white hover:bg-white/20"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-white/20 rounded-full p-3">
                <Crown className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Unlock Premium Features</h2>
              <p className="text-white/90 mt-2">
                Get unlimited access to all AI tools and premium features
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">Unlimited AI transformations</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">High-resolution exports</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">Priority processing</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">Exclusive AI models</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">No watermarks</span>
            </div>
          </div>

          {/* Pricing Card */}
          <Card className="border-primary/20 bg-gradient-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-lg">
                Premium Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">$9.99</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Cancel anytime • Instant access
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onStartFreeTrial}
              size="lg"
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start Free Trial (7 Days)
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full"
            >
              <Link to="/upgrade-pro">
                View All Plans
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground"
            >
              Maybe later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
