import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import ProductsServices from "./pages/ProductsServices";
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout";
import PracticeManagement from "./pages/PracticeManagement";
import ServiceDetail from "./pages/ServiceDetail";
import Login from "./pages/Login";
import BookDemo from "./pages/BookDemo";
import Resources from "./pages/Resources";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  // Scroll to top on route change
  // Using instant scroll for immediate top positioning
  // behavior: 'auto' avoids smooth delay
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="products-services" element={<ProductsServices />} />
            <Route path="practice-management" element={<PracticeManagement />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="login" element={<Login />} />
            <Route path="book-demo" element={<BookDemo />} />
            <Route path="resources" element={<Resources />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
