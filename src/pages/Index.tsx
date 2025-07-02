import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StylesGallery } from "@/components/StylesGallery";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

const Index = () => {
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
    </div>
  );
};

export default Index;
