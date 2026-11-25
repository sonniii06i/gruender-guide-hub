import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Screenshot } from "@/data/screenshots";

// Marketing-Bausteine der öffentlichen Seiten (Rebuild 11/2026):
// Klares Lern-Studio-Interface im GründerX-CI (Navy, Felix-Grün, Link-Blau),
// Mobile-first, weiche Karten, fein geschichtete Schatten, hohe Kontraste.

/** Bleibt als Name für ältere Aufrufe erhalten. */
export const GridBackground = (_: { className?: string }) => null;

export interface HeroCta {
  to: string;
  label: string;
}

/**
 * Hero der Landingpages. Mit `children` (Screenshot, Fahrplan) ab lg zweispaltig:
 * Text links, interaktive Produktansicht rechts.
 */
export const HeroCentered = (p: {
  eyebrow: ReactNode;
  title: string;
  accent?: string;
  lead: ReactNode;
  primary: HeroCta;
  secondary?: HeroCta;
  trust?: string[];
  crumbs?: { label: string; to?: string }[];
  children?: ReactNode;
}) => (
  <section className="relative overflow-x-clip border-b border-border bg-card pb-12 pt-[5.5rem] md:pb-16 md:pt-28">
    <div
      className={cn(
        "container max-w-6xl px-4",
        p.children && "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-12",
      )}
    >
      <div className={cn("min-w-0", !p.children && "max-w-3xl")}>
        {p.crumbs && p.crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            {p.crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.to ? (
                  <Link to={c.to} className="rounded-md transition-colors hover:text-foreground">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground">{c.label}</span>
                )}
                {i < p.crumbs!.length - 1 && <span aria-hidden="true">/</span>}
              </span>
            ))}
          </nav>
        )}

        <div className="mb-4 inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1 text-[13px] font-medium text-foreground/85">
          {p.eyebrow}
        </div>

        <h1 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.025em] text-primary md:text-[2.75rem]">
          {p.title}
          {p.accent && <span className="text-accent-blue"> {p.accent}</span>}
        </h1>

        <div className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {p.lead}
        </div>

        <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="press h-12 w-full gap-2 rounded-xl px-6 text-[15px] font-semibold shadow-sm sm:w-auto"
          >
            <Link to={p.primary.to}>
              {p.primary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          {p.secondary && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="press h-12 w-full rounded-xl bg-card px-6 text-[15px] font-semibold sm:w-auto"
            >
              <Link to={p.secondary.to}>{p.secondary.label}</Link>
            </Button>
          )}
        </div>

        {p.trust && p.trust.length > 0 && (
          <ul className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {p.trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {p.children && <div className="min-w-0">{p.children}</div>}
    </div>
  </section>
);

/** Echter App-Screenshot im modernen Fensterrahmen. */
export const ScreenshotFrame = ({
  shot,
  priority = false,
  caption,
  fade = true,
  className,
}: {
  shot: Screenshot;
  priority?: boolean;
  caption?: ReactNode;
  fade?: boolean;
  className?: string;
}) => (
  <figure className={cn("relative", className)}>
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/70 px-4 py-2.5" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        </span>
        <span className="ml-2 hidden truncate rounded-md bg-card px-2.5 py-0.5 text-xs font-medium text-muted-foreground sm:inline">
          gruenderx.de{shot.pfad}
        </span>
      </div>
      <div className={cn("relative overflow-hidden bg-background", fade && "max-sm:max-h-[380px]")}>
        <picture>
          {shot.mobil ? (
            <source
              media="(max-width: 640px)"
              srcSet={shot.mobil.src}
              width={shot.mobil.breite}
              height={shot.mobil.hoehe}
            />
          ) : (
            <source media="(max-width: 640px)" srcSet={shot.klein} />
          )}
          <img
            src={shot.gross}
            alt={shot.alt}
            width={shot.breite}
            height={shot.hoehe}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            {...(priority ? { fetchpriority: "high" } : {})}
            className="block h-auto w-full"
          />
        </picture>
      </div>
    </div>
    {caption && <figcaption className="mt-3 text-xs text-muted-foreground">{caption}</figcaption>}
  </figure>
);

/** Themenzeile mit klaren Chips statt unruhigem Laufband. */
export const TextMarquee = ({ label, items }: { label: string; items: string[] }) => (
  <section aria-label={label} className="border-b border-border bg-background py-5">
    <div className="container flex max-w-6xl flex-col gap-3 px-4 md:flex-row md:items-center md:gap-5">
      <p className="shrink-0 text-[13px] font-semibold text-muted-foreground">{label}</p>
      <ul className="flex flex-wrap gap-2 text-sm font-medium text-foreground/85">
        {items.map((t) => (
          <li
            key={t}
            className="rounded-full border border-border bg-card px-3 py-1 text-[13px] shadow-sm"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const SectionHead = ({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
}) => (
  <header className="mb-8 max-w-2xl md:mb-10">
    <p className="mb-2.5 inline-flex items-center rounded-full border border-border bg-card px-3 py-0.5 text-[12.5px] font-semibold text-primary shadow-sm">
      {eyebrow}
    </p>
    <h2 className="text-balance text-2xl font-semibold leading-[1.14] tracking-[-0.02em] text-primary md:text-[2.125rem]">
      {title}
    </h2>
    {lead && (
      <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-[17px]">
        {lead}
      </p>
    )}
  </header>
);

export interface BentoItem {
  to: string;
  title: string;
  text: string;
  icon: LucideIcon;
  bild?: Screenshot;
  chip?: string;
  breit?: boolean;
}

/** Kartenraster: oben UI-Ausschnitt, darunter Titel und Text. Mobil als Wischreihe. */
export const BentoGrid = ({ items }: { items: BentoItem[] }) => (
  <div className="-mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
    {items.map((it, i) => {
      const rest = items.length % 3;
      const breit = it.breit ?? ((rest === 2 && i < 2) || (rest === 1 && i < 4 && items.length > 3));
      return (
        <Link
          key={it.to + it.title}
          to={it.to}
          className={cn(
            "press group flex w-[84%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:border-primary/35 md:w-auto",
            breit ? "md:col-span-3" : "md:col-span-2",
          )}
        >
          {it.bild && (
            <div className="relative h-44 overflow-hidden bg-secondary/70 px-4 pt-4 md:h-56 md:px-5 md:pt-5">
              <img
                src={it.bild.klein}
                srcSet={`${it.bild.klein} 520w, ${it.bild.gross} 1000w`}
                sizes={breit ? "(min-width: 768px) 520px, 100vw" : "(min-width: 768px) 340px, 100vw"}
                alt={it.bild.alt}
                width={it.bild.breite}
                height={it.bild.hoehe}
                loading="lazy"
                decoding="async"
                className="w-full rounded-t-xl border border-b-0 border-border object-cover object-top shadow-sm transition-transform duration-300 group-hover:scale-[1.015]"
              />
              {it.chip && (
                <span className="absolute right-4 top-4 rounded-full bg-brand-green px-2.5 py-0.5 text-xs font-semibold text-brand-green-foreground shadow-sm">
                  {it.chip}
                </span>
              )}
            </div>
          )}
          <div className="flex flex-1 flex-col border-t border-border p-5">
            {!it.bild && it.chip && (
              <span className="mb-3 self-start rounded-full bg-brand-green px-2.5 py-0.5 text-xs font-semibold text-brand-green-foreground">
                {it.chip}
              </span>
            )}
            <span className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <it.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold text-foreground">{it.title}</span>
              <ArrowUpRight
                className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
            </span>
            <span className="mt-2.5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {it.text}
            </span>
          </div>
        </Link>
      );
    })}
  </div>
);

export interface PathStep {
  title: string;
  description?: string;
  meta?: string;
}

/** Nummerierter Lernpfad mit klaren Schritt-Karten. */
export const StepsPath = ({ steps, note }: { steps: PathStep[]; note?: ReactNode }) => (
  <div>
    <ol className="grid gap-3.5 md:grid-cols-2">
      {steps.map((s, i) => (
        <li
          key={i}
          className={cn(
            "flex gap-4 rounded-2xl border border-border p-5 shadow-card",
            s.description ? "bg-card" : "bg-secondary/50",
          )}
        >
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold tabular",
              s.description
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <p className="font-semibold leading-snug text-foreground">{s.title}</p>
            {s.description && (
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            )}
            {s.meta && (
              <p className="mt-2 inline-flex rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {s.meta}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
    {note && <p className="mt-4 text-sm text-muted-foreground">{note}</p>}
  </div>
);

/** Schluss-CTA: ruhige Navy-Karte mit klarem Kontrast. */
export const FinalCta = ({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: ReactNode;
  primary: HeroCta;
  secondary?: HeroCta;
}) => (
  <section className="container max-w-6xl px-4 pb-16 md:pb-20">
    <div className="flex flex-col gap-6 rounded-2xl bg-ink px-6 py-9 text-primary-foreground shadow-lg md:flex-row md:items-center md:justify-between md:gap-10 md:px-10 md:py-11">
      <div className="min-w-0 max-w-2xl">
        <h2 className="text-balance text-2xl font-semibold leading-[1.14] tracking-[-0.02em] md:text-[1.875rem]">
          {title}
        </h2>
        <p className="mt-2.5 text-pretty text-base leading-relaxed text-primary-foreground/85">{text}</p>
      </div>
      <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center md:flex-col md:items-stretch lg:flex-row lg:items-center">
        <Button
          asChild
          size="lg"
          className="press h-12 gap-2 rounded-xl bg-card px-6 font-semibold text-primary hover:bg-card/90"
        >
          <Link to={primary.to}>
            {primary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        {secondary && (
          <Link
            to={secondary.to}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary-foreground/25 px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  </section>
);
