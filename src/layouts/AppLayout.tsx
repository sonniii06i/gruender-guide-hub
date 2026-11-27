import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import HeaderActions from "@/components/HeaderActions";
import { GlobalSearch } from "@/components/GlobalSearch";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { Loader2, HelpCircle, Zap, Flame } from "lucide-react";
import OnboardingTour, { TourStep } from "@/components/OnboardingTour";
import { TOOL_COUNT } from "@/data/kennzahlen";
import { merkeBesuch } from "@/lib/zuletztGenutzt";
import { merkeRundgang, rundgangGesehen } from "@/lib/cockpitZustand";
import { MobileAppTabs, isMobileFocusRoute } from "@/components/MobileAppTabs";
import { MobileTopHeader } from "@/components/MobileTopHeader";
import { GAMIFICATION_EVENT, getLevelInfo, readGamification } from "@/lib/gamification";

const GGH_TOUR: TourStep[] = [
  { title: "Einmal kurz durchs Cockpit", text: "Etwa eine Minute. Danach weißt du, wo dein Fahrplan steht, wo du Guides und Tools findest und wo du Hilfe bekommst." },
  { selector: '[data-tour="fahrplan"]', title: "Dein Fahrplan", text: "Hier steht immer dein nächster Schritt, passend zu deinen Antworten aus dem Onboarding. Erledigtes hakst du ab, der Stand gilt auf allen deinen Geräten." },
  { selector: '[data-tour="termine"]', title: "Die nächsten 14 Tage", text: "Steuertermine, Bewerbungsfristen und gemerkte Events der kommenden zwei Wochen. Steht etwas an, kannst du Felix direkt fragen, was zuerst dran ist." },
  { selector: '[data-tour="suche"]', title: "Suche", text: "Findet jeden Guide und jedes Tool. Am Rechner öffnest du sie auch mit ⌘K oder Strg+K." },
  { selector: '[data-tour="start"]', menue: true, title: "Übersicht und Felix", text: "Die Übersicht ist diese Seite. Felix ist dein KI-Gründungsberater für Fragen zu Gründung, Recht und Steuern. Frühere Gespräche liegen unter „Meine Chats“." },
  { selector: '[data-tour="gruppe-lernen"]', menue: true, title: "Lernen", text: "Die Guides führen dich Schritt für Schritt durch ein Thema. Was du begonnen hast, findest du unter „Meine Kurse“." },
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
  const [gamTick, setGamTick] = useState(0);

  useEffect(() => {
    const onGam = () => setGamTick((n) => n + 1);
    window.addEventListener(GAMIFICATION_EVENT, onGam);
    return () => window.removeEventListener(GAMIFICATION_EVENT, onGam);
  }, []);

  const gam = useMemo(() => readGamification(user?.id), [user?.id, gamTick]);
  const lvl = useMemo(() => getLevelInfo(gam.xp), [gam.xp]);

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

  useEffect(() => { merkeBesuch(user?.id, pathname); }, [user?.id, pathname]);

  // Wer in diesem Aufruf schon angemeldet war, hat sich abgemeldet: dann kein Hinweis auf /auth.
  const warAngemeldet = useRef(false);
  useEffect(() => { if (user) warAngemeldet.current = true; }, [user]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      // Ausgeloggter Einstieg auf einer Mitglieder-Seite: /auth bekommt die Seite genannt und
      // erklärt die Wand (Funnel-Lauf 27.11.2026, vorher 0 Konten aus 46 solchen Umleitungen).
      navigate("/auth", { replace: true, state: warAngemeldet.current ? undefined : { wand: pathname } });
      return;
    }
    if (!accessLoading && accessKnown && !onboardingCompleted) {
      navigate("/onboarding", { replace: true });
    }
  }, [user, loading, accessLoading, accessKnown, onboardingCompleted, navigate, pathname]);

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
          <MobileTopHeader />
          <header className="hidden md:flex h-14 items-center gap-3 border-b border-border bg-white sticky top-0 z-30 px-4">
            <SidebarTrigger />
            <div className="flex-1 flex justify-center">
              <GlobalSearch />
            </div>
            <Link
              to="/quiz"
              title={`Level ${lvl.level} (${lvl.titel}) · ${gam.xp} XP · ${gam.streak} Tage Serie`}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-xs font-semibold text-foreground transition-colors hover:border-primary/30 hover:bg-secondary"
            >
              <span className="inline-flex items-center gap-1 text-brand-green tabular">
                <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                L{lvl.level} · {gam.xp} XP
              </span>
              {gam.streak > 0 && (
                <span className="inline-flex items-center gap-0.5 text-amber-600 tabular">
                  <Flame className="h-3 w-3" aria-hidden="true" />
                  {gam.streak}T
                </span>
              )}
            </Link>
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
          <main className={isMobileFocusRoute(pathname) ? "flex-1 min-h-0" : "flex-1 min-h-0 pb-20 md:pb-0"}>
            <Outlet />
          </main>
        </div>
        <MobileAppTabs />
        <OnboardingTour steps={GGH_TOUR} autoStart={rundgangFaellig} onEnde={rundgangEnde} />
      </div>
    </SidebarProvider>
  );
}
