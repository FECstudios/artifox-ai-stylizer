import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, User, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "./AuthDialog";

export const Header = () => {
  const { user, profile, signOut } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Artifox
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#styles" className="text-muted-foreground hover:text-primary transition-colors">
              Styles
            </a>
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </a>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Credits:</span>
                  <span className="font-semibold text-primary">{profile?.credits || 0}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={() => setAuthDialogOpen(true)}>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
                <Button variant="hero" size="sm" onClick={() => setAuthDialogOpen(true)}>
                  <User className="w-4 h-4" />
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </header>
  );
};