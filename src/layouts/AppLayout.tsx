import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import HeaderActions from "@/components/HeaderActions";
import { GlobalSearch } from "@/components/GlobalSearch";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { Loader2, HelpCircle } from "lucide-react";
import OnboardingTour, { TourStep } from "@/components/OnboardingTour";
import { TOOL_COUNT } from "@/data/kennzahlen";
import { merkeBesuch } from "@/lib/zuletztGenutzt";
import { merkeRundgang, rundgangGesehen } from "@/lib/cockpitZustand";

const GGH_TOUR: TourStep[] = [
  { title: "Einmal kurz durchs Cockpit", text: "Etwa eine Minute. Danach weißt du, wo dein Fahrplan steht, wo du Guides und Tools findest und wo du Hilfe bekommst." },
  { selector: '[data-tour="fahrplan"]', title: "Dein Fahrplan", text: "Hier steht immer dein nächster Schritt, passend zu deinen Antworten aus dem Onboarding. Erledigtes hakst du ab, der Stand gilt auf allen deinen Geräten." },
  { selector: '[data-tour="termine"]', title: "Die nächsten 14 Tage", text: "Steuertermine, Bewerbungsfristen und gemerkte Events der kommenden zwei Wochen. Steht etwas an, kannst du Felix direkt fragen, was zuerst dran ist." },
  { selector: '[data-tour="suche"]', title: "Suche", text: "Findet jeden Guide und jedes Tool. Am Rechner öffnest du sie auch mit ⌘K oder Strg+K." },
  { selector: '[data-tour="start"]', menue: true, title: "Übersicht und Felix", text: "Die Übersicht ist diese Seite. Felix ist dein KI-Gründungsberater für Fragen zu Gründung, Recht und Steuern. Frühere Gespräche liegen unter „Meine Chats“." },
  { selector: '[data-tour="gruppe-lernen"]', menue: true, title: "Lernen", text: "Die Guides führen dich Schritt für Schritt durch ein Thema. Was du begonnen hast, findest du unter „Meine Guides“." },
  { selector: '[data-tour="gruppe-werkzeuge"]', menue: true, title: "Werkzeuge", text: `${TOOL_COUNT} Tools und Rechner. Die wichtigsten stehen direkt hier: Rechtsform finden, Steuern, Fristen, Finanzplan und der Anbieter-Vergleich.` },
  { selector: '[data-tour="gruppe-geld"]', menue: true, title: "Geld & Chancen", text: "Förder-Datenbank, Wettbewerbe mit Preisgeld und Startup-Guthaben. Eine Zahl am Chancen-Radar heißt: Es gibt neue Einträge." },
  { selector: '[data-tour="gruppe-netzwerk"]', menue: true, title: "Events & Netzwerk", text: "Gründer-Events, dein Event-Radar, die Mitgründer-Börse und das Partnerprogramm." },
  { selector: '[data-tour="hilfe"]', title: "Hilfe und Konto", text: "Das Fragezeichen startet diesen Rundgang noch einmal. Daneben liegen Benachrichtigungen und dein Konto. Support und FAQ stehen unten in der Seitenleiste." },
];

export default function AppLayout() {
  const { user, loading } = useAuth();
  const { loading: accessLoading, onboardingCompleted, known: accessKnown, hasActiveSub, isAdmin } = useAccess();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [rundgangFaellig, setRundgangFaellig] = useState(false);

  // Rundgang einmal von selbst: beim ersten Besuch im Cockpit nach dem Onboarding.
  // Ob er schon gesehen wurde, weiß erst das Gerät, dann das Konto (gilt auf allen Geräten).
  const uid = user?.id;
  const imCockpit = pathname === "/dashboard" && !search;
  const cockpitOffen = !accessLoading && accessKnown && onboardingCompleted && (hasActiveSub || isAdmin);
  useEffect(() => {
    if (!uid || !imCockpit || !cockpitOffen) return;
    let aktiv = true;
    rundgangGesehen(uid).then((gesehen) => { if (aktiv && !gesehen) setRundgangFaellig(true); });
    return () => { aktiv = false; };
  }, [uid, imCockpit, cockpitOffen]);
  const rundgangEnde = useCallback(() => {
    setRundgangFaellig(false);
    merkeRundgang(uid);
  }, [uid]);

  // „Zuletzt geöffnet“ im Cockpit: nur Tool-Seiten, nur auf diesem Gerät.
  useEffect(() => { merkeBesuch(user?.id, pathname); }, [user?.id, pathname]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }
    // Neue, noch nicht eingerichtete User zuverlässig auf die Daten-/Account-Seite
    // führen — unabhängig davon, wohin der E-Mail-Bestätigungslink landet.
    // Bei einem Abfragefehler ohne bekannten Stand NICHT umleiten: Ein
    // Netzfehler ist kein "Onboarding offen".
    if (!accessLoading && accessKnown && !onboardingCompleted) {
      navigate("/onboarding", { replace: true });
    }
  }, [user, loading, accessLoading, accessKnown, onboardingCompleted, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent-blue" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-border bg-card sticky top-0 z-30 px-3 md:px-4">
            <SidebarTrigger />
            <div className="flex-1 flex justify-center">
              <GlobalSearch />
            </div>
            <div className="flex items-center gap-1" data-tour="hilfe">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("start-tour"))}
                aria-label="Rundgang durchs Cockpit starten"
                title="Rundgang starten"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <HelpCircle className="h-4 w-4" aria-hidden="true" />
              </button>
              <HeaderActions />
            </div>
          </header>
          <main className="flex-1 min-h-0">
            <Outlet />
          </main>
        </div>
        <OnboardingTour steps={GGH_TOUR} autoStart={rundgangFaellig} onEnde={rundgangEnde} />
      </div>
    </SidebarProvider>
  );
}
