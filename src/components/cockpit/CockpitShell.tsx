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
 * Rahmen jedes Cockpit-Tools. Der Kicker (eyebrow) wird in Satzschreibung und
 * ohne Emojis gezeigt; Teile hinter einem "·" werden als ruhiger Zusatz gesetzt.
 */
const CockpitShell = ({ eyebrow, title, subtitle, children, showRelated = true, actions }: Props) => {
  const [kategorie, ...rest] = stripEmoji(eyebrow).split(/\s+·\s+/);
  const zusatz = rest.join(", ");
  return (
    <div className="container max-w-6xl px-4 pb-16 pt-6 md:px-6 md:pt-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5 md:mb-7">
        <div className="min-w-0 max-w-3xl">
          <p className="text-[13px] font-medium text-muted-foreground">
            {kategorie}
            {zusatz && <span className="font-normal text-muted-foreground"> · {zusatz}</span>}
          </p>
          <h1 className="mt-1 text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-[1.75rem]">
            {stripEmoji(title)}
          </h1>
          {subtitle && <div className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted-foreground md:text-[15px]">{subtitle}</div>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </header>
      {children}
      {showRelated && <RelatedTools />}
    </div>
  );
};

export default CockpitShell;
