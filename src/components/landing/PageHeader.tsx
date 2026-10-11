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
}

/**
 * Einheitlicher Seitenkopf der öffentlichen Hub-Seiten (Tools, Guides,
 * Ratgeber, Events, Gratis-Tools): heller Verlauf mit Punktraster, genau eine
 * H1, Lead-Absatz, optional Breadcrumb und Zusatzinhalt (Suche, Kennzahlen).
 */
export const PageHeader = ({ title, lead, kicker, crumbs, children, className, width = "max-w-5xl" }: PageHeaderProps) => (
  <section className={cn("relative overflow-hidden border-b border-border/70 bg-hero pb-12 pt-28 md:pb-16 md:pt-32", className)}>
    <div
      className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
      aria-hidden="true"
    />
    <div className={cn("container relative px-4", width)}>
      {crumbs && crumbs.length > 0 && (
        <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
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
        {kicker && <div className="mb-5">{kicker}</div>}
        <h1 className="text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[3.25rem]">{title}</h1>
        {lead && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lead}</div>}
      </header>
      {children && <div className="mt-8">{children}</div>}
    </div>
  </section>
);

export default PageHeader;
