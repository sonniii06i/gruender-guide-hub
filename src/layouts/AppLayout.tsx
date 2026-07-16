import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import HeaderActions from "@/components/HeaderActions";
import { GlobalSearch } from "@/components/GlobalSearch";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { Loader2, HelpCircle } from "lucide-react";
import OnboardingTour, { TourStep } from "@/components/OnboardingTour";

const GGH_TOUR: TourStep[] = [
  { title: "Willkommen bei GründerX 👋", text: "Kurze Tour durch deinen Gründer-Copiloten – ca. 40 Sekunden. Du kannst sie jederzeit über das Fragezeichen oben rechts erneut starten." },
  { selector: '[data-tour="/dashboard"]', title: "Übersicht", text: "Dein Startpunkt: Fortschritt, empfohlene Guides und Tools – alles an einem Ort." },
  { selector: '[data-tour="/felix"]', title: "Felix-Chat", text: "Dein KI-Berater. Stell Felix jede Gründungs-, Rechts- oder Steuerfrage – er antwortet mit Quellen aus den Guides." },
  { selector: '[data-tour="/playbooks"]', title: "Alle Guides", text: "Schritt-für-Schritt-Playbooks von der Idee bis zur Gründung – zum Durcharbeiten und Abhaken." },
  { selector: '[data-tour="/dashboard?view=tools"]', title: "Tools & Rechner", text: "Über 80 Rechner & Wizards: Rechtsform, Steuer, Finanzen, Namen – direkt einsatzbereit." },
  { selector: '[data-tour="/cockpit/steuer"]', title: "Steuer-Cockpit", text: "Dein Steuer-Überblick: Fristen, Rechner und die wichtigsten To-dos für Gründer." },
  { selector: '[data-tour="/wizard/rechtsform"]', title: "Rechtsform-Wizard", text: "Beantworte ein paar Fragen und finde die passende Rechtsform (Einzelunternehmen, GmbH, UG …)." },
  { selector: '[data-tour="/anbieter"]', title: "Anbieter-Vergleich", text: "Vergleiche Banken, Tools & Dienstleister – kuratiert für Gründer, mit den relevanten Kriterien." },
  { selector: '[data-tour="/affiliate"]', title: "Partnerprogramm", text: "Empfiehl GründerX weiter und verdiene mit – 20 % lebenslange Provision je geworbenem Kunden." },
  { title: "Los geht's 🚀", text: "Das war's! Starte am besten mit einem Guide oder frag Felix direkt. Viel Erfolg beim Gründen." },
];

export default function AppLayout() {
  const { user, loading } = useAuth();
  const { loading: accessLoading, onboardingCompleted } = useAccess();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }
    // Neue, noch nicht eingerichtete User zuverlässig auf die Daten-/Account-Seite
    // führen — unabhängig davon, wohin der E-Mail-Bestätigungslink landet.
    if (!accessLoading && !onboardingCompleted) {
      navigate("/onboarding", { replace: true });
    }
  }, [user, loading, accessLoading, onboardingCompleted, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent-blue" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-border bg-card/80 backdrop-blur sticky top-0 z-30 px-3 md:px-4">
            <SidebarTrigger />
            <div className="flex-1 flex justify-center">
              <GlobalSearch />
            </div>
            <button
              onClick={() => window.dispatchEvent(new Event("start-tour"))}
              aria-label="Tour / Hilfe starten"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
            <HeaderActions />
          </header>
          <main className="flex-1 min-h-0">
            <Outlet />
          </main>
        </div>
        <OnboardingTour steps={GGH_TOUR} storageKey="ggh-tour-done-v1" />
      </div>
    </SidebarProvider>
  );
}
