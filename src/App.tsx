import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import AppLayout from "./layouts/AppLayout.tsx";
import { PaywallGate } from "./components/PaywallGate.tsx";
import { AdminGate } from "./components/AdminGate.tsx";
import { useTrackPageview } from "./hooks/useTrackPageview";

// Eager: Routen die jeder User durchläuft (Auth/Onboarding/Dashboard/Playbooks)
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import Checkout from "./pages/Checkout.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Playbooks from "./pages/Playbooks.tsx";
import NotFound from "./pages/NotFound.tsx";

// Lazy: Cockpit-Tools (jedes Tool eigener Chunk, on-demand)
const SteuerCockpit = lazy(() => import("./pages/SteuerCockpit.tsx"));
const AmazonBuchungen = lazy(() => import("./pages/AmazonBuchungen.tsx"));
const BrandCheck = lazy(() => import("./pages/BrandCheck.tsx"));
const MarkenWizard = lazy(() => import("./pages/MarkenWizard.tsx"));
const MarkenMonitor = lazy(() => import("./pages/MarkenMonitor.tsx"));
const HoldingDesigner = lazy(() => import("./pages/HoldingDesigner.tsx"));
const EUAlternativen = lazy(() => import("./pages/EUAlternativen.tsx"));
const EntscheidungsEngine = lazy(() => import("./pages/EntscheidungsEngine.tsx"));
const AuszahlungOptimizer = lazy(() => import("./pages/AuszahlungOptimizer.tsx"));
const PreYearEndCheck = lazy(() => import("./pages/PreYearEndCheck.tsx"));
const KfzOptimizer = lazy(() => import("./pages/KfzOptimizer.tsx"));
const SubstanceChecker = lazy(() => import("./pages/SubstanceChecker.tsx"));
const DbaCfcRechner = lazy(() => import("./pages/DbaCfcRechner.tsx"));
const SalesTaxNexus = lazy(() => import("./pages/SalesTaxNexus.tsx"));
const CryptoSteuer = lazy(() => import("./pages/CryptoSteuer.tsx"));
const SettlementParser = lazy(() => import("./pages/SettlementParser.tsx"));
const LucidWizard = lazy(() => import("./pages/LucidWizard.tsx"));
const CeRohsGenerator = lazy(() => import("./pages/CeRohsGenerator.tsx"));
const FoerderungDb = lazy(() => import("./pages/FoerderungDb.tsx"));
const UsLlcWizard = lazy(() => import("./pages/UsLlcWizard.tsx"));
const UsCreditCards = lazy(() => import("./pages/UsCreditCards.tsx"));
const UstRechner = lazy(() => import("./pages/UstRechner.tsx"));
const AbschreibungRechner = lazy(() => import("./pages/AbschreibungRechner.tsx"));
const HkLimitedWizard = lazy(() => import("./pages/HkLimitedWizard.tsx"));
const IntlBanking = lazy(() => import("./pages/IntlBanking.tsx"));
const BwaGenerator = lazy(() => import("./pages/BwaGenerator.tsx"));
const MargeTracker = lazy(() => import("./pages/MargeTracker.tsx"));
const PensionOptimizer = lazy(() => import("./pages/PensionOptimizer.tsx"));
const KvOptimizer = lazy(() => import("./pages/KvOptimizer.tsx"));
const GewerbeCheck = lazy(() => import("./pages/GewerbeCheck.tsx"));
const FreiberufCheck = lazy(() => import("./pages/FreiberufCheck.tsx"));
const SchwellenCheck = lazy(() => import("./pages/SchwellenCheck.tsx"));
const SteuerABC = lazy(() => import("./pages/SteuerABC.tsx"));
const BruttoNettoSolo = lazy(() => import("./pages/BruttoNettoSolo.tsx"));
const StundensatzRechner = lazy(() => import("./pages/StundensatzRechner.tsx"));
const ReisekostenLogger = lazy(() => import("./pages/ReisekostenLogger.tsx"));
const DatevMapper = lazy(() => import("./pages/DatevMapper.tsx"));
const StbHandoff = lazy(() => import("./pages/StbHandoff.tsx"));
const EcomRoadmap = lazy(() => import("./pages/EcomRoadmap.tsx"));
const LaborVergleich = lazy(() => import("./pages/LaborVergleich.tsx"));
const SalaryDividendOptimizer = lazy(() => import("./pages/SalaryDividendOptimizer.tsx"));
const VisaHelper = lazy(() => import("./pages/VisaHelper.tsx"));
const StbFinder = lazy(() => import("./pages/StbFinder.tsx"));
const AmazonUstEuUs = lazy(() => import("./pages/AmazonUstEuUs.tsx"));
const Booking = lazy(() => import("./pages/Booking.tsx"));
const StbMatch = lazy(() => import("./pages/StbMatch.tsx"));
const RechtsformWizard = lazy(() => import("./pages/RechtsformWizard.tsx"));
const IpBoxVergleich = lazy(() => import("./pages/IpBoxVergleich.tsx"));
const IabRechner = lazy(() => import("./pages/IabRechner.tsx"));
const QuartalsSteuer = lazy(() => import("./pages/QuartalsSteuer.tsx"));
const Anbieter = lazy(() => import("./pages/Anbieter.tsx"));
const AnbieterDetail = lazy(() => import("./pages/AnbieterDetail.tsx"));
const PlaybookRun = lazy(() => import("./pages/PlaybookRun.tsx"));
const PlaybookPreview = lazy(() => import("./pages/PlaybookPreview.tsx"));
const FelixChat = lazy(() => import("./pages/FelixChat.tsx"));
const FelixChatsOverview = lazy(() => import("./pages/FelixChatsOverview.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Admin = lazy(() => import("./pages/Admin.tsx"));
const Support = lazy(() => import("./pages/Support.tsx"));
const FAQ = lazy(() => import("./pages/FAQ.tsx"));
const Kontakt = lazy(() => import("./pages/Kontakt.tsx"));
const Impressum = lazy(() => import("./pages/Impressum.tsx"));
const Datenschutz = lazy(() => import("./pages/Datenschutz.tsx"));
const AGB = lazy(() => import("./pages/AGB.tsx"));

const queryClient = new QueryClient();

const RouteTracker = () => { useTrackPageview(); return null; };

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageFallback = () => (
  <div className="container max-w-6xl py-12 px-4">
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-32 bg-secondary rounded" />
      <div className="h-8 w-2/3 bg-secondary rounded" />
      <div className="h-4 w-1/2 bg-secondary rounded" />
      <div className="h-32 w-full bg-secondary rounded mt-6" />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <RouteTracker />
          <Suspense fallback={<PageFallback />}>
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
                <Route path="/cockpit/ip-box" element={<PaywallGate title="IP-Box-Vergleich"><IpBoxVergleich /></PaywallGate>} />
                <Route path="/cockpit/iab-rechner" element={<PaywallGate title="IAB-Rechner"><IabRechner /></PaywallGate>} />
                <Route path="/cockpit/quartals-steuer" element={<PaywallGate title="Quartals-Steuerschätzung"><QuartalsSteuer /></PaywallGate>} />
                <Route path="/cockpit/entscheidungs-engine" element={<PaywallGate title="Entscheidungs-Engine"><EntscheidungsEngine /></PaywallGate>} />
                <Route path="/cockpit/auszahlung-optimizer" element={<PaywallGate title="Auszahlung-Optimizer"><AuszahlungOptimizer /></PaywallGate>} />
                <Route path="/cockpit/pre-year-end" element={<PaywallGate title="Pre-Year-End-Check"><PreYearEndCheck /></PaywallGate>} />
                <Route path="/cockpit/kfz-optimizer" element={<PaywallGate title="Kfz-Optimizer"><KfzOptimizer /></PaywallGate>} />
                <Route path="/cockpit/substance-checker" element={<PaywallGate title="Substance-Checker"><SubstanceChecker /></PaywallGate>} />
                <Route path="/cockpit/dba-cfc" element={<PaywallGate title="DBA-CFC-Rechner"><DbaCfcRechner /></PaywallGate>} />
                <Route path="/cockpit/sales-tax-nexus" element={<PaywallGate title="Sales-Tax-Nexus"><SalesTaxNexus /></PaywallGate>} />
                <Route path="/cockpit/crypto-steuer" element={<PaywallGate title="Crypto-Steuer"><CryptoSteuer /></PaywallGate>} />
                <Route path="/cockpit/settlement-parser" element={<PaywallGate title="Settlement-Parser"><SettlementParser /></PaywallGate>} />
                <Route path="/cockpit/lucid-wizard" element={<PaywallGate title="LUCID-Wizard"><LucidWizard /></PaywallGate>} />
                <Route path="/cockpit/ce-generator" element={<PaywallGate title="CE/RoHS-Generator"><CeRohsGenerator /></PaywallGate>} />
                <Route path="/cockpit/foerderung" element={<PaywallGate title="Förderung-Datenbank"><FoerderungDb /></PaywallGate>} />
                <Route path="/cockpit/us-llc-wizard" element={<PaywallGate title="US-LLC-Wizard"><UsLlcWizard /></PaywallGate>} />
                <Route path="/cockpit/us-kreditkarten" element={<PaywallGate title="US-Kreditkarten-Guide"><UsCreditCards /></PaywallGate>} />
                <Route path="/cockpit/ust-rechner" element={<PaywallGate title="USt-Rechner"><UstRechner /></PaywallGate>} />
                <Route path="/cockpit/abschreibung" element={<PaywallGate title="Abschreibungs-Erklärer"><AbschreibungRechner /></PaywallGate>} />
                <Route path="/cockpit/hk-limited-wizard" element={<PaywallGate title="HK-Limited-Wizard"><HkLimitedWizard /></PaywallGate>} />
                <Route path="/cockpit/intl-banking" element={<PaywallGate title="Intl. Banking"><IntlBanking /></PaywallGate>} />
                <Route path="/cockpit/bwa-generator" element={<PaywallGate title="BWA-Generator"><BwaGenerator /></PaywallGate>} />
                <Route path="/cockpit/marge-tracker" element={<PaywallGate title="Marge-Tracker"><MargeTracker /></PaywallGate>} />
                <Route path="/cockpit/pension-optimizer" element={<PaywallGate title="Pension-Optimizer"><PensionOptimizer /></PaywallGate>} />
                <Route path="/cockpit/kv-optimizer" element={<PaywallGate title="KV-Optimizer"><KvOptimizer /></PaywallGate>} />
                <Route path="/cockpit/gewerbe-check" element={<PaywallGate title="Brauche ich ein Gewerbe?"><GewerbeCheck /></PaywallGate>} />
                <Route path="/cockpit/freiberuf-check" element={<PaywallGate title="Freiberuf vs. Gewerbe-Check"><FreiberufCheck /></PaywallGate>} />
                <Route path="/cockpit/schwellen-check" element={<PaywallGate title="Side-Hustle-Schwellen-Check"><SchwellenCheck /></PaywallGate>} />
                <Route path="/cockpit/steuer-abc" element={<PaywallGate title="Steuer-ABC Glossar"><SteuerABC /></PaywallGate>} />
                <Route path="/cockpit/brutto-netto-solo" element={<PaywallGate title="Brutto-Netto Solo-Selbstständig"><BruttoNettoSolo /></PaywallGate>} />
                <Route path="/cockpit/stundensatz-rechner" element={<PaywallGate title="Stundensatz-Rechner für Anfänger"><StundensatzRechner /></PaywallGate>} />
                <Route path="/cockpit/reisekosten-logger" element={<PaywallGate title="Reisekosten-Logger"><ReisekostenLogger /></PaywallGate>} />
                <Route path="/cockpit/datev-mapper" element={<PaywallGate title="DATEV-Mapper"><DatevMapper /></PaywallGate>} />
                <Route path="/cockpit/stb-handoff" element={<PaywallGate title="StB-Hand-off"><StbHandoff /></PaywallGate>} />
                <Route path="/cockpit/ecom-roadmap" element={<PaywallGate title="ECom-Brand-Roadmap"><EcomRoadmap /></PaywallGate>} />
                <Route path="/cockpit/labor-vergleich" element={<PaywallGate title="Labor-Anbieter-Vergleich"><LaborVergleich /></PaywallGate>} />
                <Route path="/cockpit/salary-dividende" element={<PaywallGate title="Salary-vs-Dividende"><SalaryDividendOptimizer /></PaywallGate>} />
                <Route path="/cockpit/visa-helper" element={<PaywallGate title="Visa-Helper"><VisaHelper /></PaywallGate>} />
                <Route path="/cockpit/stb-finder" element={<PaywallGate title="StB-Auswahl-Wizard"><StbFinder /></PaywallGate>} />
                <Route path="/cockpit/amazon-ust" element={<PaywallGate title="Amazon-USt EU vs US"><AmazonUstEuUs /></PaywallGate>} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/cockpit/stb-match" element={<PaywallGate title="StB-Match"><StbMatch /></PaywallGate>} />
                <Route path="/wizard/rechtsform" element={<PaywallGate title="Rechtsform-Wizard"><RechtsformWizard /></PaywallGate>} />
                <Route path="/playbooks" element={<PaywallGate title="Alle Guides"><Playbooks /></PaywallGate>} />
                <Route path="/playbook/preview/:slug" element={<PaywallGate title="Guide"><PlaybookPreview /></PaywallGate>} />
                <Route path="/playbook/:runId" element={<PaywallGate title="Guide"><PlaybookRun /></PaywallGate>} />
                <Route path="/anbieter" element={<PaywallGate title="Anbieter-Vergleich"><Anbieter /></PaywallGate>} />
                <Route path="/anbieter/:slug" element={<PaywallGate title="Anbieter-Vergleich"><AnbieterDetail /></PaywallGate>} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/felix" element={<FelixChat />} />
                <Route path="/felix/chats" element={<FelixChatsOverview />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminGate><Admin /></AdminGate>} />
                <Route path="/support" element={<Support />} />
              </Route>
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/agb" element={<AGB />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
