import { Sparkles, Twitter, Instagram, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-card/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Artifox
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Turn your photos into stunning AI-generated artwork in seconds. The creative power of artificial intelligence at your fingertips.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <div className="space-y-2 text-sm">
              <a href="#styles" className="block text-muted-foreground hover:text-primary transition-colors">Art Styles</a>
              <a href="#pricing" className="block text-muted-foreground hover:text-primary transition-colors">Pricing</a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gradient-secondary border border-primary/20 rounded-lg flex items-center justify-center hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-secondary border border-primary/20 rounded-lg flex items-center justify-center hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-secondary border border-primary/20 rounded-lg flex items-center justify-center hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Artifox. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ using AI
          </p>
        </div>
      </div>
    </footer>
  );
};