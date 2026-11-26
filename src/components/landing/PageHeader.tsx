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
 * Einheitliche Deep-Navy-Studio-Bühne für alle öffentlichen Seiten (Rebuild 11/2026):
 * Geht nahtlos aus der Navy-Glass-Navbar hervor, trägt die H1 klar in Weiß und
 * sorgt auf jeder SEO-/Hub-Seite für sofortige Marken-Wiedererkennung.
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
  <section className={cn("gx-stage relative overflow-x-clip border-b border-white/10 pb-11 pt-24 text-white md:pb-14 md:pt-28", className)}>
    <div className="gx-stage-grid pointer-events-none absolute inset-0" aria-hidden="true" />
    <div className={cn("container relative z-10 px-4", width)}>
      {crumbs && crumbs.length > 0 && (
        <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-white/65" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {c.to ? (
                <Link to={c.to} className="transition-colors hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span className="font-medium text-white">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
            </span>
          ))}
        </nav>
      )}
      <header className="max-w-3xl">
        {kicker && <div className="mb-3.5">{kicker}</div>}
        <h1
          className={cn(
            "text-balance font-bold tracking-[-0.03em] text-white",
            zentriert
              ? "text-[2.1rem] leading-[1.06] md:text-[3.1rem]"
              : "text-[1.95rem] leading-[1.08] md:text-[2.75rem]",
          )}
        >
          {title}
        </h1>
        {lead && (
          <div className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/75 md:text-lg [&_a]:text-[#6EE7B7] [&_a]:underline [&_strong]:text-white">
            {lead}
          </div>
        )}
      </header>
      {children && <div className="mt-7">{children}</div>}
    </div>
  </section>
);

export default PageHeader;
