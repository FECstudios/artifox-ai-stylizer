import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const UpgradeBanner = () => {
  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center z-50">
      <div className="w-full max-w-screen-lg px-0 md:px-4 mx-auto rounded-2xl shadow-2xl bg-white/90 backdrop-blur border border-indigo-200 py-4 md:py-6 flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full p-3 flex items-center justify-center shadow-md">
            <Sparkles className="w-7 h-7 text-white animate-bounce" />
          </div>
          <div className="text-center md:text-left">
            <p className="font-bold text-lg md:text-xl text-indigo-900 mb-1">Go Pro: Unlock Unlimited AI Art!</p>
            <p className="text-xs md:text-sm text-indigo-700 font-medium">No limits • High-Res • Priority Queue</p>
          </div>
        </div>
        <Button
          asChild
          variant="default"
          size="lg"
          className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 text-base md:text-lg px-6 py-3 shadow-lg"
        >
          <Link to="/upgrade-pro">Upgrade Now</Link>
        </Button>
      </div>
    </div>
  );
};
