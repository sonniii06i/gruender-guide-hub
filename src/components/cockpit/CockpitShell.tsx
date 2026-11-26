import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import RelatedTools from "./RelatedTools";
import { stripEmoji } from "./kit";
import { cn } from "@/lib/utils";

export interface CockpitTab {
  label: string;
  to: string;
}

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  /** Set false to suppress auto Related-Tools section. */
  showRelated?: boolean;
  /** Optionale Aktionen rechts neben dem Titel (z. B. Export, Zurücksetzen). */
  actions?: ReactNode;
  /** Optionale Sub-Navigation für Themen-Hubs (z. B. Steuern, Chancen, Events). */
  tabs?: CockpitTab[];
}

/**
 * Einheitlicher Lexoffice-Arbeitsbereich für alle Cockpit-Rechner & Tools:
 * Ruhiger weißer Kopf mit Breadcrumb, klarer Navy-Überschrift, optionaler Sub-Tab-Leiste
 * und sicherem mobilem Abstand zur Bottom-Tab-Bar.
 */
const CockpitShell = ({ eyebrow, title, subtitle, children, showRelated = true, actions, tabs }: Props) => {
  const { pathname } = useLocation();
  const [kategorie, ...rest] = stripEmoji(eyebrow).split(/\s+·\s+/);
  const zusatz = rest.join(" · ");

  return (
    <div className="container max-w-6xl overflow-x-clip px-4 pb-24 pt-5 md:px-6 md:pb-16 md:pt-7">
      <header className="mb-6 rounded-2xl border border-border bg-white p-5 shadow-card md:mb-7 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 max-w-3xl">
            <nav aria-label="Pfad" className="mb-2 flex flex-wrap items-center gap-1 text-xs font-medium text-muted-foreground">
              <Link to="/dashboard?view=tools" className="transition-colors hover:text-primary">
                Tools &amp; Rechner
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" aria-hidden="true" />
              <span className="font-semibold text-primary">{kategorie}</span>
              {zusatz && <span className="text-muted-foreground">· {zusatz}</span>}
            </nav>

            <h1
              lang="de"
              className="break-words text-balance text-2xl font-bold leading-tight tracking-[-0.025em] text-primary [overflow-wrap:anywhere] hyphens-auto md:text-[1.85rem]"
            >
              {stripEmoji(title)}
            </h1>

            {subtitle && (
              <div className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {subtitle}
              </div>
            )}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
        </div>

        {tabs && tabs.length > 0 && (
          <nav
            aria-label="Bereichsnavigation"
            className="-mx-1 mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4"
          >
            {tabs.map((tab) => {
              const active = pathname === tab.to;
              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "press inline-flex min-h-9 items-center rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "bg-secondary/70 text-foreground/80 hover:bg-secondary hover:text-primary",
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {children}
      {showRelated && <RelatedTools />}
    </div>
  );
};

export default CockpitShell;
