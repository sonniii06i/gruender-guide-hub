import { ReactNode } from "react";
import RelatedTools from "./RelatedTools";
import { stripEmoji } from "./kit";

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  /** Set false to suppress auto Related-Tools section. */
  showRelated?: boolean;
  /** Optionale Aktionen rechts neben dem Titel (z. B. Export, Zurücksetzen). */
  actions?: ReactNode;
}

/**
 * Einheitlicher Rahmen für alle Cockpit-Tools (Rebuild 11/2026):
 * Klares Lern-Studio-Feeling, Mobile-first mit sicherem Abstand zur unteren App-Navigation.
 */
const CockpitShell = ({ eyebrow, title, subtitle, children, showRelated = true, actions }: Props) => {
  const [kategorie, ...rest] = stripEmoji(eyebrow).split(/\s+·\s+/);
  const zusatz = rest.join(", ");
  return (
    <div className="container max-w-6xl px-4 pb-24 pt-6 md:px-6 md:pb-16 md:pt-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5 md:mb-7">
        <div className="min-w-0 max-w-3xl">
          <p className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-border bg-card px-3 py-0.5 text-xs font-semibold text-primary shadow-sm">
            <span>{kategorie}</span>
            {zusatz && <span className="font-normal text-muted-foreground">· {zusatz}</span>}
          </p>
          <h1 className="mt-2.5 text-2xl font-semibold leading-tight tracking-[-0.02em] text-primary md:text-[1.875rem]">
            {stripEmoji(title)}
          </h1>
          {subtitle && (
            <div className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {subtitle}
            </div>
          )}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </header>
      {children}
      {showRelated && <RelatedTools />}
    </div>
  );
};

export default CockpitShell;
