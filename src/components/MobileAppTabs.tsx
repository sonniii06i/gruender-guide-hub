import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Calculator,
  CalendarDays,
  ChevronRight,
  FileX,
  Grid2x2,
  Home,
  LifeBuoy,
  MessageCircle,
  MessageSquare,
  Shield,
  Smartphone,
  Sparkles,
  Target,
  Trophy,
  User,
  Wrench,
} from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useRole } from "@/hooks/useRole";
import { isGruenderXIosApp } from "@/lib/iosApp";
import { openExternalInIosApp } from "@/lib/iosBridge";
import { hapticSelection } from "@/lib/haptics";
import { DISCORD_INVITE_URL } from "@/config/links";
import { ANBIETER_ANZAHL, ANBIETER_KATEGORIEN } from "@/data/kennzahlen";
import { cn } from "@/lib/utils";

/**
 * Fokus-Routen blenden die Bottom-Tab-Bar auf Smartphones aus (wie Udemy, Studyflix, Revolut),
 * damit primäre Bottom-Aktionen (Lektion erledigt, Felix-Eingabe, Quiz-Antwort)
 * überlappungsfrei an `bottom-0 + safe-area-inset-bottom` liegen.
 */
export function isMobileFocusRoute(pathname: string): boolean {
  if (pathname.startsWith("/playbook/")) return true;
  if (pathname === "/felix") return true;
  if (pathname.startsWith("/quiz/") && pathname !== "/quiz") return true;
  return false;
}

const MEHR_BEREICHE = [
  { to: "/quiz", label: "Quizze & Checks", sub: "Kurz-Checks mit Bonus-XP", icon: Sparkles, tint: "bg-[#ECF8F3] text-brand-green" },
  { to: "/cockpit/steuer", label: "Steuern & Fristen", sub: "USt, EÜR, Kalender & Stichtage", icon: Calculator, tint: "bg-[#EEF2F9] text-primary" },
  { to: "/anbieter", label: "Anbieter-Vergleich", sub: `${ANBIETER_ANZAHL} Anbieter in ${ANBIETER_KATEGORIEN} Kategorien`, icon: Trophy, tint: "bg-[#FDF6E7] text-[#B45309]" },
  { to: "/cockpit/chancen-radar", label: "Chancen & Förderung", sub: "Zuschüsse, Credits & Wettbewerbe", icon: Target, tint: "bg-[#EDF4FF] text-[#1E40AF]" },
  { to: "/gruender-events", label: "Events & Netzwerk", sub: "Termine, Radar & Mitgründer-Börse", icon: CalendarDays, tint: "bg-[#F3EEFE] text-[#5B21B6]" },
];

const MEHR_HILFE = [
  { to: "/profile", label: "Mein Profil & Konto", icon: User },
  { to: "/profile?tab=app", label: "App-Einstellungen & Push", icon: Smartphone },
  { to: "/faq", label: "Häufige Fragen (FAQ)", icon: MessageCircle },
  { to: "/support", label: "Support & Kontakt", icon: LifeBuoy },
];

/**
 * Native iOS-/Mobile-Bottom-Navigation (Apple HIG × Revolut):
 * 5 klare Hauptziele (Start, Kurse, Tools, Felix, Mehr-Sheet) mit Safe-Area-Inset,
 * echten Taptic-Haptics und 44×44-px-Tippzielen.
 */
export function MobileAppTabs() {
  const { pathname, search } = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const { isAdmin } = useRole();
  const iosApp = isGruenderXIosApp();

  if (isMobileFocusRoute(pathname)) return null;

  const isToolsView =
    (pathname === "/dashboard" && (search.includes("view=tools") || search.includes("view=themen"))) ||
    pathname.startsWith("/cockpit/") ||
    pathname.startsWith("/wizard/") ||
    pathname.startsWith("/anbieter");
  const isKurseView =
    pathname === "/playbooks" ||
    pathname.startsWith("/playbook") ||
    (pathname === "/dashboard" && search.includes("view=meine"));
  const isFelixView = pathname.startsWith("/felix");
  const isStartView = pathname === "/dashboard" && !isToolsView && !isKurseView;
  const isMoreActive =
    moreOpen ||
    pathname.startsWith("/quiz") ||
    pathname.startsWith("/umfrage") ||
    pathname.startsWith("/gruender-events") ||
    pathname.startsWith("/gruender-chancen") ||
    pathname.startsWith("/startup-guthaben") ||
    pathname.startsWith("/community") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/support") ||
    pathname.startsWith("/faq");

  const tabs = [
    { to: "/dashboard", label: "Start", icon: Home, active: isStartView },
    { to: "/playbooks", label: "Kurse", icon: BookOpen, active: isKurseView },
    { to: "/dashboard?view=tools", label: "Tools", icon: Wrench, active: isToolsView },
    { to: "/felix", label: "Felix", icon: MessageSquare, active: isFelixView },
  ];

  return (
    <>
      <nav
        aria-label="App-Navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-white/95 backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <ul className="grid grid-cols-5 px-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <li key={t.label}>
                <Link
                  to={t.to}
                  onClick={() => hapticSelection()}
                  aria-current={t.active ? "page" : undefined}
                  className={cn(
                    "flex min-h-[54px] flex-col items-center justify-center gap-0.5 py-1.5 text-[11px] transition-transform duration-150 active:scale-[0.96]",
                    t.active ? "font-bold text-primary" : "font-medium text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-11 items-center justify-center rounded-full transition-colors duration-150",
                      t.active && "bg-primary/10 text-primary",
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={t.active ? 2.25 : 1.75} aria-hidden="true" />
                  </span>
                  <span className="leading-none">{t.label}</span>
                </Link>
              </li>
            );
          })}

          <li>
            <button
              type="button"
              onClick={() => {
                hapticSelection();
                setMoreOpen(true);
              }}
              aria-expanded={moreOpen}
              aria-haspopup="dialog"
              className={cn(
                "flex min-h-[54px] w-full flex-col items-center justify-center gap-0.5 py-1.5 text-[11px] transition-transform duration-150 active:scale-[0.96]",
                isMoreActive ? "font-bold text-primary" : "font-medium text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-11 items-center justify-center rounded-full transition-colors duration-150",
                  isMoreActive && "bg-primary/10 text-primary",
                )}
              >
                <Grid2x2 className="h-[18px] w-[18px]" strokeWidth={isMoreActive ? 2.25 : 1.75} aria-hidden="true" />
              </span>
              <span className="leading-none">Mehr</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Natives iOS-Bottom-Sheet für alle weiteren Cockpit-Bereiche */}
      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] overflow-y-auto rounded-t-[20px] border-t border-border bg-[#F7F8FB] p-0"
        >
          <div className="sticky top-0 z-10 border-b border-border bg-white px-5 pb-3.5 pt-4 pr-12">
            <SheetHeader className="text-left">
              <SheetTitle className="text-base font-bold tracking-tight text-primary">Alle Bereiche</SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                Direkt zu Quizzen, Steuern, Vergleichen, Chancen und Hilfe.
              </SheetDescription>
            </SheetHeader>
          </div>

          <div
            className="space-y-4 p-4"
            style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <ul className="divide-y divide-border/70">
                {MEHR_BEREICHE.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => {
                          hapticSelection();
                          setMoreOpen(false);
                        }}
                        className="flex min-h-[56px] items-center gap-3 px-4 py-3 transition-colors active:bg-secondary/60"
                      >
                        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", item.tint)}>
                          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                          <span className="block truncate text-xs text-muted-foreground">{item.sub}</span>
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <ul className="divide-y divide-border/70">
                {isAdmin && (
                  <li>
                    <Link
                      to="/admin"
                      onClick={() => {
                        hapticSelection();
                        setMoreOpen(false);
                      }}
                      className="flex min-h-[48px] items-center gap-3 px-4 py-2.5 text-sm font-semibold text-primary active:bg-secondary/60"
                    >
                      <Shield className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="flex-1">Admin</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
                    </Link>
                  </li>
                )}
                {MEHR_HILFE.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => {
                          hapticSelection();
                          setMoreOpen(false);
                        }}
                        className="flex min-h-[48px] items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground active:bg-secondary/60"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        <span className="flex-1">{item.label}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <a
                    href={DISCORD_INVITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      hapticSelection();
                      setMoreOpen(false);
                      if (iosApp) {
                        e.preventDefault();
                        void openExternalInIosApp(DISCORD_INVITE_URL);
                      }
                    }}
                    className="flex min-h-[48px] items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground active:bg-secondary/60"
                  >
                    <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="flex-1">Discord-Community</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
                  </a>
                </li>
                {!iosApp && (
                  <li>
                    <Link
                      to="/kuendigen"
                      onClick={() => {
                        hapticSelection();
                        setMoreOpen(false);
                      }}
                      className="flex min-h-[48px] items-center gap-3 px-4 py-2.5 text-sm font-medium text-muted-foreground active:bg-secondary/60"
                    >
                      <FileX className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="flex-1">Verträge hier kündigen</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
