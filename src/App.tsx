import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import Checkout from "./pages/Checkout.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import SteuerCockpit from "./pages/SteuerCockpit.tsx";
import AmazonBuchungen from "./pages/AmazonBuchungen.tsx";
import BrandCheck from "./pages/BrandCheck.tsx";
import MarkenWizard from "./pages/MarkenWizard.tsx";
import MarkenMonitor from "./pages/MarkenMonitor.tsx";
import HoldingDesigner from "./pages/HoldingDesigner.tsx";
import EUAlternativen from "./pages/EUAlternativen.tsx";
import EntscheidungsEngine from "./pages/EntscheidungsEngine.tsx";
import AuszahlungOptimizer from "./pages/AuszahlungOptimizer.tsx";
import PreYearEndCheck from "./pages/PreYearEndCheck.tsx";
import KfzOptimizer from "./pages/KfzOptimizer.tsx";
import RechtsformWizard from "./pages/RechtsformWizard.tsx";
import Anbieter from "./pages/Anbieter.tsx";
import AnbieterDetail from "./pages/AnbieterDetail.tsx";
import Playbooks from "./pages/Playbooks.tsx";
import PlaybookRun from "./pages/PlaybookRun.tsx";
import PlaybookPreview from "./pages/PlaybookPreview.tsx";
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
import { PaywallGate } from "./components/PaywallGate.tsx";
import { useTrackPageview } from "./hooks/useTrackPageview";

const queryClient = new QueryClient();

const RouteTracker = () => { useTrackPageview(); return null; };

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
              <Route path="/cockpit/steuer" element={<PaywallGate title="Steuer-Cockpit"><SteuerCockpit /></PaywallGate>} />
              <Route path="/cockpit/amazon-buchungen" element={<PaywallGate title="Steuer-Cockpit"><AmazonBuchungen /></PaywallGate>} />
              <Route path="/cockpit/check" element={<PaywallGate title="Brand-Check"><BrandCheck /></PaywallGate>} />
              <Route path="/cockpit/marken-wizard" element={<PaywallGate title="Marken-Wizard"><MarkenWizard /></PaywallGate>} />
              <Route path="/cockpit/marken-monitor" element={<PaywallGate title="Marken-Monitor"><MarkenMonitor /></PaywallGate>} />
              <Route path="/cockpit/holding-designer" element={<PaywallGate title="Holding-Designer"><HoldingDesigner /></PaywallGate>} />
              <Route path="/cockpit/eu-alternativen" element={<PaywallGate title="EU-Alternativen"><EUAlternativen /></PaywallGate>} />
              <Route path="/cockpit/entscheidungs-engine" element={<PaywallGate title="Entscheidungs-Engine"><EntscheidungsEngine /></PaywallGate>} />
              <Route path="/cockpit/auszahlung-optimizer" element={<PaywallGate title="Auszahlung-Optimizer"><AuszahlungOptimizer /></PaywallGate>} />
              <Route path="/cockpit/pre-year-end" element={<PaywallGate title="Pre-Year-End-Check"><PreYearEndCheck /></PaywallGate>} />
              <Route path="/cockpit/kfz-optimizer" element={<PaywallGate title="Kfz-Optimizer"><KfzOptimizer /></PaywallGate>} />
              <Route path="/wizard/rechtsform" element={<PaywallGate title="Rechtsform-Wizard"><RechtsformWizard /></PaywallGate>} />
              <Route path="/anbieter" element={<PaywallGate title="Anbieter-Vergleich"><Anbieter /></PaywallGate>} />
              <Route path="/anbieter/:slug" element={<PaywallGate title="Anbieter-Vergleich"><AnbieterDetail /></PaywallGate>} />
              <Route path="/playbooks" element={<Playbooks />} />
              <Route path="/playbook/preview/:slug" element={<PaywallGate title="Guide"><PlaybookPreview /></PaywallGate>} />
              <Route path="/playbook/:runId" element={<PaywallGate title="Guide"><PlaybookRun /></PaywallGate>} />
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
