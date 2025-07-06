
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
import AIEditing from "./pages/AIEditing";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import UpgradePro from "./pages/UpgradePro";
import { useEffect } from "react";
import Clarity from "./pages/Clarity";
import AIRestoration from "./pages/AIRestoration";
import AIGeneration from "./pages/AIGeneration";
import LocalImageEditor from "./components/LocalImageEditor";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && window.location.pathname === '/') {
      navigate("/ai-editing");
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/ai-editing" element={<AIEditing />} />
      <Route path="/ai-editing/clarity" element={<Clarity />} />
      <Route path="/ai-editing/restoration" element={<AIRestoration />} />
      <Route path="/ai-editing/local-editor" element={<LocalImageEditor />} />
      <Route path="/ai-generation" element={<AIGeneration />} />
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
