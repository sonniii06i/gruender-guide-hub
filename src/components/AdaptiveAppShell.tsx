import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import HeaderActions from "@/components/HeaderActions";
import { GlobalSearch } from "@/components/GlobalSearch";
import { MobileAppTabs } from "@/components/MobileAppTabs";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";
import { useAuth } from "@/hooks/useAuth";
import { isPrerender } from "@/lib/prerender";

interface AdaptiveAppShellProps {
  /** Kurze Kategorie-Zeile im Cockpit-Modus (z. B. "Events & Netzwerk"). */
  eyebrow: string;
  /** Optionaler Pill-Kicker für die öffentliche SEO-Ansicht. */
  kicker?: ReactNode;
  title: string;
  lead: ReactNode;
  headerExtra?: ReactNode;
  width?: string;
  /** SEO-Komponente (wird in beiden Modi gerendert). */
  seo: ReactNode;
  children: ReactNode;
}

/**
 * Hält Seiten, die sowohl öffentlich (SEO) als auch aus der Cockpit-Sidebar
 * erreichbar sind (Gründer-Events, Startup-Guthaben, Gründer-Chancen), für
 * eingeloggte Nutzer sauber IM Dashboard/Cockpit (Sidebar + Suche + App-Tabs)
 * statt sie auf die öffentliche Marketing-Navbar hinauszuwerfen.
 */
export function AdaptiveAppShell({
  eyebrow,
  kicker,
  title,
  lead,
  headerExtra,
  width = "max-w-5xl",
  seo,
  children,
}: AdaptiveAppShellProps) {
  const { user } = useAuth();
  const inCockpit = Boolean(user) && !isPrerender();

  if (inCockpit) {
    return (
      <SidebarProvider>
        {seo}
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card px-3 md:px-4">
              <SidebarTrigger />
              <div className="flex flex-1 justify-center">
                <GlobalSearch />
              </div>
              <div className="flex items-center gap-1">
                <HeaderActions />
              </div>
            </header>
            <main className="min-h-0 flex-1 pb-24 md:pb-14">
              <div className={`container ${width} px-4 pt-6 md:px-6 md:pt-8`}>
                <header className="mb-6 border-b border-border pb-6">
                  <p className="inline-flex items-center rounded-full border border-border bg-card px-3 py-0.5 text-xs font-semibold text-primary shadow-sm">
                    {eyebrow}
                  </p>
                  <h1 className="mt-2.5 text-2xl font-semibold leading-tight tracking-[-0.02em] text-primary md:text-[1.875rem]">
                    {title}
                  </h1>
                  <div className="mt-2 max-w-[70ch] text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {lead}
                  </div>
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
      <main>
        <PageHeader zentriert width={width} kicker={kicker} title={title} lead={lead}>
          {headerExtra}
        </PageHeader>
        <div className={`container ${width} px-4 py-10 md:py-14`}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
