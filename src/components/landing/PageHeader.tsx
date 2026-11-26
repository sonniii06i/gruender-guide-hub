import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: ReactNode;
  lead?: ReactNode;
  /** Kleines Label über der H1. */
  kicker?: ReactNode;
  crumbs?: { label: string; to?: string }[];
  children?: ReactNode;
  className?: string;
  /** Breite des Inhalts, Standard max-w-6xl. */
  width?: string;
  /** Hub-Seiten (Tools, Guides, Ratgeber, Gratis-Tools …): größere Display-Stufe. */
  zentriert?: boolean;
}

/**
 * Heller, klarer Seitenkopf im Studyflix- / Lexoffice-Stil:
 * Saubere weiße Fläche mit dezenter Trennlinie, ruhige Breadcrumbs,
 * kräftige GründerX-Navy-Überschrift und gut lesbarer Einleitungsabsatz.
 */
export const PageHeader = ({
  title,
  lead,
  kicker,
  crumbs,
  children,
  className,
  width = "max-w-6xl",
  zentriert = false,
}: PageHeaderProps) => (
  <section className={cn("border-b border-border bg-white pb-10 pt-24 md:pb-12 md:pt-28", className)}>
    <div className={cn("container px-4", width)}>
      {crumbs && crumbs.length > 0 && (
        <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {c.to ? (
                <Link to={c.to} className="transition-colors hover:text-primary">
                  {c.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
            </span>
          ))}
        </nav>
      )}
      <header className="max-w-3xl">
        {kicker && <div className="mb-3">{kicker}</div>}
        <h1
          className={cn(
            "text-balance font-bold tracking-[-0.025em] text-primary",
            zentriert
              ? "text-[2rem] leading-[1.08] md:text-[2.85rem]"
              : "text-[1.85rem] leading-[1.1] md:text-[2.5rem]",
          )}
        >
          {title}
        </h1>
        {lead && (
          <div className="mt-3.5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg [&_a]:font-medium [&_a]:text-accent-blue [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-foreground">
            {lead}
          </div>
        )}
      </header>
      {children && <div className="mt-7">{children}</div>}
    </div>
  </section>
);

export default PageHeader;
