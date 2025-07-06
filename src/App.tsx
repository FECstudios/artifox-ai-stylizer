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
import Clarity from "./pages/Clarity";
import AIRestoration from "./pages/AIRestoration";
import AIGenerationPage from "./pages/AIGenerationPage";
import AIEditorPage from "./pages/AIEditorPage";
import PageWrapper from "./components/PageWrapper";

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
      <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
      <Route path="/ai-generation" element={<PageWrapper><AIGeneration /></PageWrapper>} />
      <Route path="/ai-generation/clarity" element={<PageWrapper><Clarity /></PageWrapper>} />
      <Route path="/ai-generation/restoration" element={<PageWrapper><AIRestoration /></PageWrapper>} />
      <Route path="/ai-generation/generation" element={<PageWrapper><AIGenerationPage /></PageWrapper>} />
      <Route path="/ai-editor" element={<PageWrapper><AIEditorPage /></PageWrapper>} />
      <Route path="/contact" element={<PageWrapper><ContactUs /></PageWrapper>} />
      <Route path="/privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
      <Route path="/terms" element={<PageWrapper><TermsOfService /></PageWrapper>} />
      <Route path="/upgrade-pro" element={<PageWrapper><UpgradePro /></PageWrapper>} />
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
