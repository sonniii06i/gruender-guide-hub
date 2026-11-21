import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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
 * Einheitlicher Seitenkopf der öffentlichen Seiten (Umbau 11/2026): weiße
 * Fläche mit Linie darunter, genau eine H1, Lead-Absatz, optional Breadcrumb und
 * Zusatzinhalt (Suche, Kennzahlen). Immer linksbündig; `zentriert` setzt nur
 * noch die größere Schriftstufe der Hub-Seiten.
 */
export const PageHeader = ({ title, lead, kicker, crumbs, children, className, width = "max-w-5xl", zentriert = false }: PageHeaderProps) => (
  <section className={cn("border-b border-border bg-card pb-9 pt-[5.5rem] md:pb-11 md:pt-24", className)}>
    <div className={cn("container relative px-4", width)}>
      {crumbs && crumbs.length > 0 && (
        <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
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
      <header className="max-w-3xl">
        {kicker && <div className="mb-3">{kicker}</div>}
        <h1
          className={cn(
            "text-balance font-semibold tracking-[-0.02em] text-primary",
            zentriert ? "text-[2rem] leading-[1.1] md:text-[2.75rem]" : "text-[1.875rem] leading-[1.12] md:text-[2.5rem]",
          )}
        >
          {title}
        </h1>
        {lead && (
          <div className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</div>
        )}
      </header>
      {children && <div className="mt-7">{children}</div>}
    </div>
  </section>
);

export default PageHeader;
