import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, MessageSquare, Sparkles, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/dashboard", label: "Start", icon: Home, match: (p: string) => p === "/dashboard" },
  { to: "/playbooks", label: "Guides", icon: BookOpen, match: (p: string) => p.startsWith("/playbook") },
  { to: "/dashboard?view=tools", label: "Tools", icon: Wrench, match: (p: string) => p.startsWith("/cockpit/") || p.startsWith("/wizard/") },
  { to: "/quiz", label: "Quizze", icon: Sparkles, match: (p: string) => p.startsWith("/quiz") || p.startsWith("/umfrage") },
  { to: "/felix", label: "Felix", icon: MessageSquare, match: (p: string) => p.startsWith("/felix") },
];

/**
 * Native App-Bottom-Navigation für Smartphones (Mobile-first & Capacitor App).
 * Nur auf kleinen Viewports sichtbar (md:hidden), mit Safe-Area-Inset für iOS/Android.
 */
export function MobileAppTabs() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="App-Navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {TABS.map((t) => {
          const active = t.match(pathname);
          const Icon = t.icon;
          return (
            <li key={t.to}>
              <Link
                to={t.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-11 items-center justify-center rounded-full transition-colors",
                    active && "bg-primary/10 text-primary",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="truncate">{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
