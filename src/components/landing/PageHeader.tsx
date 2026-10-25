import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { GridBackground } from "@/components/marketing/Marketing";

interface PageHeaderProps {
  title: ReactNode;
  lead?: ReactNode;
  /** Kleines Label über der H1 (sparsam einsetzen). */
  kicker?: ReactNode;
  crumbs?: { label: string; to?: string }[];
  children?: ReactNode;
  className?: string;
  /** Breite des Inhalts, Standard max-w-5xl. */
  width?: string;
  /** Hub-Seiten (Tools, Guides, Ratgeber, Gratis-Tools …): zentriert und groß wie die Landingpages. */
  zentriert?: boolean;
}

/**
 * Einheitlicher Seitenkopf der öffentlichen Seiten: Linienraster (wie die
 * Landingpages, 25.10.2026), genau eine H1, Lead-Absatz, optional Breadcrumb und
 * Zusatzinhalt (Suche, Kennzahlen). `zentriert` für Hub-Seiten, sonst linksbündig
 * (Rechtstexte, Formulare).
 */
export const PageHeader = ({ title, lead, kicker, crumbs, children, className, width = "max-w-5xl", zentriert = false }: PageHeaderProps) => (
  <section className={cn("relative overflow-hidden border-b border-border/70 bg-background pb-12 pt-28 md:pb-16 md:pt-32", zentriert && "md:pb-20 md:pt-36", className)}>
    <GridBackground />
    <div className={cn("container relative px-4", width)}>
      {crumbs && crumbs.length > 0 && (
        <nav className={cn("mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground", zentriert && "justify-center")} aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {c.to ? (
                <Link to={c.to} className="hover:text-foreground">
                  {c.label}
                </Link>
              ) : (
                <span className="text-foreground">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
            </span>
          ))}
        </nav>
      )}
      <header className={cn(zentriert ? "mx-auto max-w-4xl text-center" : "max-w-3xl")}>
        {kicker && <div className="mb-5">{kicker}</div>}
        <h1
          className={cn(
            "text-balance font-semibold tracking-[-0.04em] text-primary",
            zentriert ? "text-[2.5rem] leading-[1.02] md:text-[4rem]" : "text-[2.25rem] leading-[1.05] md:text-[3.25rem]",
          )}
        >
          {title}
        </h1>
        {lead && (
          <div className={cn("mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground", zentriert && "mx-auto md:text-xl")}>{lead}</div>
        )}
      </header>
      {children && <div className={cn("mt-8", zentriert && "mt-10 flex flex-col items-center [&>*]:justify-center")}>{children}</div>}
    </div>
  </section>
);

export default PageHeader;
