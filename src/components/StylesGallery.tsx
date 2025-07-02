import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Star, Zap } from "lucide-react";

const artStyles = [
  {
    id: 1,
    name: "3D Cartoon",
    description: "Pixar-style 3D character",
    preview: "🎭",
    popular: true
  },
  {
    id: 2,
    name: "The Simpsons",
    description: "Classic yellow cartoon style",
    preview: "🟡",
    popular: true
  },
  {
    id: 3,
    name: "Pop Art",
    description: "Warhol-inspired bold colors",
    preview: "🎨",
    popular: false
  },
  {
    id: 4,
    name: "Watercolor",
    description: "Elegant painted portrait",
    preview: "🖌️",
    popular: true
  },
  {
    id: 5,
    name: "Caricature",
    description: "Exaggerated features",
    preview: "😄",
    popular: false
  },
  {
    id: 6,
    name: "Stencil",
    description: "Street art style",
    preview: "🖤",
    popular: false
  },
  {
    id: 7,
    name: "Anime",
    description: "Japanese animation style",
    preview: "⭐",
    popular: true
  },
  {
    id: 8,
    name: "Oil Painting",
    description: "Classical portrait style",
    preview: "🎨",
    popular: false
  }
];

export const StylesGallery = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-sm">
            <Palette className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">20+ Unique Art Styles</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Choose Your Style
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From 3D cartoons to watercolor masterpieces, find the perfect artistic style for your photos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {artStyles.map((style) => (
            <Card 
              key={style.id} 
              className="group relative bg-gradient-card backdrop-blur-lg border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer hover:shadow-glow hover:scale-105 overflow-hidden"
            >
              <div className="p-6 text-center space-y-3">
                {style.popular && (
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                      Popular
                    </div>
                  </div>
                )}
                
                <div className="text-4xl mb-3">{style.preview}</div>
                
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {style.name}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {style.description}
                </p>
              </div>
              
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="creative" size="lg" className="group">
            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            View All 20+ Styles
          </Button>
        </div>
      </div>
    </section>
  );
};