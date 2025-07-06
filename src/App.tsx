import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIGeneration from "./pages/AIGeneration";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import UpgradePro from "./pages/UpgradePro";
import { useEffect } from "react";
import AIGenerationPage from "./pages/AIGenerationPage";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && window.location.pathname === '/') {
      navigate("/ai-generation");
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/ai-generation" element={<AIGeneration />} />
      <Route path="/ai-generation/image-generator" element={<AIGenerationPage />} />
      <Route path="/ai-generation/style-transfer" element={<AIGenerationPage />} />
      <Route path="/ai-generation/enhance-photo" element={<AIGenerationPage />} />
      <Route path="/ai-generation/remove-background" element={<AIGenerationPage />} />
      <Route path="/ai-generation/colorize" element={<AIGenerationPage />} />
      <Route path="/ai-generation/face-swap" element={<AIGenerationPage />} />
      <Route path="/ai-generation/upscale" element={<AIGenerationPage />} />
      <Route path="/ai-generation/anime-converter" element={<AIGenerationPage />} />
      <Route path="/ai-generation/sketch-to-art" element={<AIGenerationPage />} />
      <Route path="/ai-generation/age-progression" element={<AIGenerationPage />} />
      <Route path="/ai-generation/object-removal" element={<AIGenerationPage />} />
      <Route path="/ai-generation/logo-generator" element={<AIGenerationPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/upgrade-pro" element={<UpgradePro />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;