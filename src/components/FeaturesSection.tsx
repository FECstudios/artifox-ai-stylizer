import { Card } from "@/components/ui/card";
import { Upload, Zap, Mail, Shield, Gift, Share2 } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Simple Upload",
    description: "Drag & drop your photo and watch the magic happen in seconds"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "AI-powered transformations delivered in under 30 seconds"
  },
  {
    icon: Mail,
    title: "Email & Download",
    description: "Get your artwork via email or instant download to your device"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your photos are processed securely and never stored permanently"
  },
  {
    icon: Gift,
    title: "Perfect for Gifts",
    description: "Create unique profile pics, gifts, and social media content"
  },
  {
    icon: Share2,
    title: "Social Ready",
    description: "Optimized for all social platforms with perfect sizing"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Why Choose Artifox?
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The fastest and easiest way to transform your photos into stunning artwork
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group bg-gradient-card backdrop-blur-lg border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow hover-scale p-8 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};