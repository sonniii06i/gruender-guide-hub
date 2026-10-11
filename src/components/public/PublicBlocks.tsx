import type { ReactNode, ElementType } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Bausteine für öffentliche Unterseiten (Redesign 10/2026), passend zu
 * PageHeader, Startseite und /preise: Sektion mit H2, FAQ-Liste aus nativen
 * <details> (Antworten bleiben im prerenderten HTML), Info-Karte, dunkles
 * Abschlussband.
 */

export const PublicSection = ({
  title,
  lead,
  children,
  className,
  id,
}: {
  title?: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={cn("scroll-mt-24", className)}>
    {title && <h2 className="text-2xl font-semibold tracking-tight md:text-[1.75rem]">{title}</h2>}
    {lead && <div className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{lead}</div>}
    <div className={cn(title || lead ? "mt-6" : "")}>{children}</div>
  </section>
);

export const InfoCard = ({
  title,
  icon: Icon,
  children,
  className,
  as: As = "div",
}: {
  title?: ReactNode;
  icon?: ElementType;
  children?: ReactNode;
  className?: string;
  as?: ElementType;
}) => (
  <As className={cn("rounded-2xl border border-border bg-card p-5 shadow-card md:p-6", className)}>
    {(title || Icon) && (
      <div className="mb-3 flex items-start gap-3">
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
        {title && <h3 className="pt-1.5 text-base font-semibold leading-snug tracking-tight">{title}</h3>}
      </div>
    )}
    {children}
  </As>
);

export const FaqList = ({ items, className }: { items: { q: string; a: ReactNode }[]; className?: string }) => (
  <div className={cn("divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-card", className)}>
    {items.map((f) => (
      <details key={f.q} className="group px-5 md:px-6 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold transition-colors hover:text-accent-blue md:py-5">
          {f.q}
          <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
        </summary>
        <div className="-mt-1 pb-5 text-[15px] leading-relaxed text-muted-foreground">{f.a}</div>
      </details>
    ))}
  </div>
);

export const CtaBand = ({
  title,
  children,
  actions,
  className,
}: {
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) => (
  <section className={cn("relative overflow-hidden rounded-2xl bg-ink p-7 text-primary-foreground shadow-soft md:p-10", className)}>
    <div className="pointer-events-none absolute inset-0 bg-dots-light" aria-hidden="true" />
    <div className="relative">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {children && <div className="mt-3 max-w-2xl leading-relaxed text-primary-foreground/75">{children}</div>}
      {actions && <div className="mt-6 flex flex-col gap-3 sm:flex-row">{actions}</div>}
    </div>
  </section>
);

/** Klassen für Buttons auf dem dunklen CtaBand. */
export const ctaPrimaryOnInk = "h-11 rounded-xl bg-card px-5 font-semibold text-primary shadow-none hover:bg-card/90";
export const ctaSecondaryOnInk =
  "h-11 rounded-xl border-white/20 bg-transparent px-5 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground";
