import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarketingBar from "@/components/MarketingBar";
import CartDrawer from "@/components/CartDrawer";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  return (
    <>
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/collections/:handle" element={<Collection />} />
          <Route path="/product/:handle" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MarketingBar />
      <CartDrawer />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
