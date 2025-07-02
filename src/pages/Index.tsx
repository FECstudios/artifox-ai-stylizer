import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StylesGallery } from "@/components/StylesGallery";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { AITransform } from "@/components/AITransform";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        {user && (
          <section className="py-20 px-4">
            <AITransform />
          </section>
        )}
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
