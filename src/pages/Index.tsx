
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StylesGallery } from "@/components/StylesGallery";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { MobileOnboarding } from "@/components/MobileOnboarding";
import { PaywallModal } from "@/components/PaywallModal";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();
  const { 
    showOnboarding, 
    showPaywall, 
    setShowPaywall, 
    completeOnboarding, 
    startFreeTrial 
  } = useOnboarding();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        <div id="styles">
          <StylesGallery />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="pricing">
          <PricingSection />
        </div>
      </main>
      <Footer />

      {/* Mobile Onboarding */}
      {showOnboarding && (
        <MobileOnboarding onComplete={completeOnboarding} />
      )}

      {/* Paywall Modal */}
      <PaywallModal
        open={showPaywall}
        onOpenChange={setShowPaywall}
        onStartFreeTrial={startFreeTrial}
      />
    </div>
  );
};

export default Index;
