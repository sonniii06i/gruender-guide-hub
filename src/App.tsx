import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import Checkout from "./pages/Checkout.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import SteuerCockpit from "./pages/SteuerCockpit.tsx";
import RechtsformWizard from "./pages/RechtsformWizard.tsx";
import Anbieter from "./pages/Anbieter.tsx";
import Playbooks from "./pages/Playbooks.tsx";
import PlaybookRun from "./pages/PlaybookRun.tsx";
import FelixChat from "./pages/FelixChat.tsx";
import FelixChatsOverview from "./pages/FelixChatsOverview.tsx";
import Profile from "./pages/Profile.tsx";
import Admin from "./pages/Admin.tsx";
import Support from "./pages/Support.tsx";
import FAQ from "./pages/FAQ.tsx";
import Kontakt from "./pages/Kontakt.tsx";
import Impressum from "./pages/Impressum.tsx";
import Datenschutz from "./pages/Datenschutz.tsx";
import AGB from "./pages/AGB.tsx";
import NotFound from "./pages/NotFound.tsx";
import AppLayout from "./layouts/AppLayout.tsx";
import { useTrackPageview } from "./hooks/useTrackPageview";

const queryClient = new QueryClient();

const RouteTracker = () => { useTrackPageview(); return null; };

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <RouteTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cockpit/steuer" element={<SteuerCockpit />} />
              <Route path="/wizard/rechtsform" element={<RechtsformWizard />} />
              <Route path="/anbieter" element={<Anbieter />} />
              <Route path="/playbooks" element={<Playbooks />} />
              <Route path="/playbook/:runId" element={<PlaybookRun />} />
              <Route path="/felix" element={<FelixChat />} />
              <Route path="/felix/chats" element={<FelixChatsOverview />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/support" element={<Support />} />
              <Route path="/faq" element={<FAQ />} />
            </Route>
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/agb" element={<AGB />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
