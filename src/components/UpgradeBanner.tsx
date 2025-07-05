import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const UpgradeBanner = () => {
  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-4xl mx-auto rounded-2xl shadow-xl bg-gradient-card backdrop-blur-lg border border-primary/20 p-6 md:p-8 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          <div className="flex flex-col items-center lg:items-start gap-4 flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <div className="bg-gradient-primary rounded-full p-3 flex items-center justify-center shadow-glow flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-extrabold text-lg md:text-xl text-primary mb-1">Go Pro: Unlock More AI Art!</h3>
                <p className="text-sm md:text-base text-muted-foreground font-medium">Upgrade for the ultimate creative experience</p>
              </div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm md:text-base text-foreground w-full">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> More AI transformations</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> High-resolution output</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> Priority processing</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> Exclusive styles & features</li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <Button
              asChild
              variant="default"
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-3 shadow-elegant rounded-xl bg-gradient-primary hover:shadow-glow transition-all duration-300 hover-scale"
            >
              <Link to="/upgrade-pro">Upgrade Now</Link>
            </Button>
            <span className="text-xs text-muted-foreground text-center">Cancel anytime. Instant access after upgrade.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
