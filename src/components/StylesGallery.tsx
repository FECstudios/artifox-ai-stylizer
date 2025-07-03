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
  },
  {
    id: 9,
    name: "Cyberpunk",
    description: "Futuristic neon aesthetic",
    preview: "🤖",
    popular: true
  },
  {
    id: 10,
    name: "Renaissance",
    description: "Classical art masterpiece",
    preview: "🏛️",
    popular: false
  },
  {
    id: 11,
    name: "Manga",
    description: "Japanese comic book style",
    preview: "📚",
    popular: true
  },
  {
    id: 12,
    name: "Gothic",
    description: "Dark medieval atmosphere",
    preview: "🏰",
    popular: false
  },
  {
    id: 13,
    name: "Impressionist",
    description: "Monet-inspired brushstrokes",
    preview: "🌅",
    popular: false
  },
  {
    id: 14,
    name: "Pixel Art",
    description: "Retro 8-bit gaming style",
    preview: "🕹️",
    popular: true
  },
  {
    id: 15,
    name: "Art Deco",
    description: "1920s glamorous design",
    preview: "💎",
    popular: false
  },
  {
    id: 16,
    name: "Surreal",
    description: "Dreamlike Salvador Dalí",
    preview: "🌀",
    popular: false
  },
  {
    id: 17,
    name: "Van Gogh",
    description: "Swirling post-impressionist",
    preview: "🌻",
    popular: true
  },
  {
    id: 18,
    name: "Comic Book",
    description: "Marvel/DC superhero style",
    preview: "💥",
    popular: true
  },
  {
    id: 19,
    name: "Graffiti",
    description: "Urban street art vibes",
    preview: "🎨",
    popular: false
  },
  {
    id: 20,
    name: "Minimalist",
    description: "Clean geometric lines",
    preview: "⚪",
    popular: false
  },
  {
    id: 21,
    name: "Baroque",
    description: "Dramatic chiaroscuro",
    preview: "🕯️",
    popular: false
  },
  {
    id: 22,
    name: "Vaporwave",
    description: "80s retro aesthetic",
    preview: "🌊",
    popular: true
  },
  {
    id: 23,
    name: "Film Noir",
    description: "Classic black & white",
    preview: "🎬",
    popular: false
  },
  {
    id: 24,
    name: "Steampunk",
    description: "Victorian sci-fi style",
    preview: "⚙️",
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
          {artStyles.map((style, index) => (
            <Card 
              key={style.id} 
              className="group relative bg-gradient-card backdrop-blur-lg border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer hover:shadow-glow hover:scale-105 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 text-center space-y-3">
                {style.popular && (
                  <div className="absolute top-3 right-3 animate-scale-in">
                    <div className="flex items-center gap-1 bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                      Popular
                    </div>
                  </div>
                )}
                
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{style.preview}</div>
                
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