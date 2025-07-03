import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const UpgradeBanner = () => {
  return (
    <div className="container mx-auto px-0 md:px-4 max-w-screen-lg py-8 overflow-x-hidden">
      <div className="w-full max-w-3xl mx-auto rounded-2xl shadow-xl bg-background border border-border py-8 md:py-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-x-hidden">
        <div className="flex flex-col items-center md:items-start gap-4 flex-1">
          <div className="flex items-center gap-4">
            <div className="bg-primary/90 rounded-full p-4 flex items-center justify-center shadow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="font-extrabold text-xl md:text-2xl text-primary mb-1">Go Pro: Unlock More AI Art!</p>
              <p className="text-base text-muted-foreground font-medium">Upgrade for the ultimate creative experience</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm md:text-base text-foreground">
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" /> More AI transformations</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" /> High-resolution output</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" /> Priority processing</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" /> Exclusive styles & features</li>
          </ul>
        </div>
        <div className="flex flex-col items-center gap-4 flex-shrink-0 w-full md:w-auto">
          <Button
            asChild
            variant="default"
            size="xl"
            className="w-full md:w-auto text-base md:text-lg px-8 py-4 shadow-lg rounded-xl"
          >
            <Link to="/upgrade-pro">Upgrade Now</Link>
          </Button>
          <span className="text-xs text-muted-foreground mt-2 text-center">Cancel anytime. Instant access after upgrade.</span>
        </div>
      </div>
    </div>
  );
};
