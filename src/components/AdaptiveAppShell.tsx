import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import HeaderActions from "@/components/HeaderActions";
import { GlobalSearch } from "@/components/GlobalSearch";
import { MobileAppTabs, isMobileFocusRoute } from "@/components/MobileAppTabs";
import { MobileTopHeader } from "@/components/MobileTopHeader";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";
import { useAuth } from "@/hooks/useAuth";
import { isPrerender } from "@/lib/prerender";
import { cn } from "@/lib/utils";

export interface AdaptiveTab {
  label: string;
  to: string;
}

interface AdaptiveAppShellProps {
  /** Kurze Kategorie-Zeile im Cockpit-Modus (z. B. "Events & Netzwerk"). */
  eyebrow: string;
  /** Optionaler Pill-Kicker für die öffentliche SEO-Ansicht. */
  kicker?: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  /** Optionale Hub-Untertabs im Cockpit-Modus (Revolut × Lexoffice Stil). */
  tabs?: AdaptiveTab[];
  /** Optionale Aktionen rechts im Cockpit-Kopf. */
  actions?: ReactNode;
  headerExtra?: ReactNode;
  width?: string;
  /** SEO-Komponente (wird in beiden Modi gerendert). */
  seo: ReactNode;
  /** Optionaler Zusatz ganz unten nur im öffentlichen Modus (z. B. MobileCtaBar). */
  publicFooterExtra?: ReactNode;
  children: ReactNode;
}

/**
 * Hält Seiten, die sowohl öffentlich (SEO) als auch aus der Cockpit-Sidebar
 * erreichbar sind (Gründer-Events, Startup-Guthaben, Gründer-Chancen, Quizze,
 * FAQ, Kündigen), für eingeloggte Nutzer sauber IM Dashboard/Cockpit
 * (Sidebar + Suche + App-Tabs) statt sie auf die Marketing-Navbar hinauszuwerfen.
 */
export function AdaptiveAppShell({
  eyebrow,
  kicker,
  title,
  lead,
  tabs,
  actions,
  headerExtra,
  width = "max-w-5xl",
  seo,
  publicFooterExtra,
  children,
}: AdaptiveAppShellProps) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const inCockpit = Boolean(user) && !isPrerender();

  if (inCockpit) {
    return (
      <SidebarProvider>
        {seo}
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <MobileTopHeader />
            <header className="sticky top-0 z-30 hidden h-14 items-center gap-3 border-b border-border bg-white px-4 md:flex">
              <SidebarTrigger />
              <div className="flex flex-1 justify-center">
                <GlobalSearch />
              </div>
              <div className="flex items-center gap-1">
                <HeaderActions />
              </div>
            </header>
            <main id="inhalt" className={cn("min-h-0 flex-1 md:pb-14", isMobileFocusRoute(pathname) ? "pb-10" : "pb-24")}>
              <div className={`container ${width} px-4 pt-6 md:px-6 md:pt-8`}>
                <header className="mb-6 rounded-2xl border border-border bg-white p-5 shadow-card md:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-primary">{eyebrow}</p>
                      <h1 className="mt-1.5 text-2xl font-bold leading-tight tracking-[-0.025em] text-primary md:text-[1.9rem]">
                        {title}
                      </h1>
                      <div className="mt-2 max-w-[70ch] text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                        {lead}
                      </div>
                    </div>
                    {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
                  </div>

                  {tabs && tabs.length > 0 && (
                    <nav
                      aria-label="Bereichs-Navigation"
                      className="mt-5 flex gap-1.5 overflow-x-auto border-t border-border pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                      {tabs.map((tab) => {
                        const active = pathname === tab.to || pathname.startsWith(`${tab.to}/`);
                        return (
                          <Link
                            key={tab.to}
                            to={tab.to}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "press shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors sm:text-[13px]",
                              active
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "bg-secondary/70 text-foreground/80 hover:bg-accent hover:text-primary",
                            )}
                          >
                            {tab.label}
                          </Link>
                        );
                      })}
                    </nav>
                  )}

                  {headerExtra && <div className="mt-5">{headerExtra}</div>}
                </header>
                {children}
              </div>
            </main>
          </div>
          <MobileAppTabs />
        </div>
      </SidebarProvider>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {seo}
      <Navbar />
      <main id="inhalt">
        <PageHeader zentriert width={width} kicker={kicker} title={title} lead={lead}>
          {headerExtra}
        </PageHeader>
        <div className={`container ${width} px-4 py-10 md:py-14`}>{children}</div>
      </main>
      <Footer />
      {publicFooterExtra}
    </div>
  );
}
