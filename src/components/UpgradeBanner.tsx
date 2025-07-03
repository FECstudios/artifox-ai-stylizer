import { Button } from "@/components/ui/button";
import { Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const UpgradeBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-700 to-indigo-800 p-4 md:p-6 text-white shadow-lg z-50 animate-slide-in-up">
      <div className="container mx-auto px-4 flex items-center justify-between flex-col md:flex-row gap-3">
        <div className="flex items-center gap-4">
          <Star className="w-8 h-8 text-yellow-300 animate-pulse" />
          <div className="text-center md:text-left">
            <p className="font-bold text-lg md:text-xl mb-1">Unlock Pro: Unlimited AI Transformations!</p>
            <p className="text-sm md:text-base flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4" /> High-Res Outputs <span className="mx-1">•</span> Priority Processing
            </p>
          </div>
        </div>
        <Button asChild variant="secondary" size="lg" className="w-full md:w-auto text-indigo-800 font-semibold hover:bg-indigo-50 text-base md:text-lg py-3 px-6">
          <Link to="/upgrade-pro">Upgrade Now</Link>
        </Button>
      </div>
    </div>
  );
};