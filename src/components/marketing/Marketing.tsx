import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Screenshot } from "@/data/screenshots";

// Marketing-Bausteine der öffentlichen Seiten. Umbau 11/2026: sachlich wie eine
// Buchhaltungs-Software. Weiße Flächen mit 1-px-Linie, linksbündige Köpfe, keine
// Raster-Hintergründe, keine Laufbänder, keine Schatten-Bühnen. Eigene Marke:
// Navy als Tinte und Hauptknopf, Grün nur als Häkchen; keine Sterne, keine fremden Logos.

/** Früher ein Linienraster hinter dem Hero. Bleibt als Name erhalten, zeichnet nichts mehr. */
export const GridBackground = (_: { className?: string }) => null;

export interface HeroCta {
  to: string;
  label: string;
}

/**
 * Hero der Landingpages. Mit `children` (Screenshot, Fahrplan) ab lg zweispaltig:
 * Text links, Produkt rechts. Ohne `children` eine linksbündige Textspalte.
 * Der Name stammt vom früheren, zentrierten Aufbau.
 */
export const HeroCentered = (p: {
  eyebrow: ReactNode;
  /** Überschrift vor dem Akzent. */
  title: string;
  /** Zweiter Teilsatz der Überschrift (optional), steht hinter `title`. */
  accent?: string;
  lead: ReactNode;
  primary: HeroCta;
  secondary?: HeroCta;
  /** Belegbare Vertrauenspunkte, z. B. „monatlich kündbar“. */
  trust?: string[];
  crumbs?: { label: string; to?: string }[];
  children?: ReactNode;
}) => (
  <section className="border-b border-border bg-card pb-10 pt-[5.5rem] md:pb-14 md:pt-28">
    <div
      className={cn(
        "container max-w-6xl px-4",
        p.children && "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-12",
      )}
    >
      <div className={cn("min-w-0", !p.children && "max-w-3xl")}>
        {p.crumbs && p.crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap gap-1.5 text-sm text-muted-foreground">
            {p.crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.to ? <Link to={c.to} className="hover:text-foreground">{c.label}</Link> : <span className="text-foreground">{c.label}</span>}
                {i < p.crumbs!.length - 1 && <span aria-hidden="true">/</span>}
              </span>
            ))}
          </nav>
        )}
        <div className="mb-4 flex flex-wrap items-center gap-2 text-[13px] font-medium text-muted-foreground">{p.eyebrow}</div>
        <h1 className="text-balance text-[1.875rem] font-semibold leading-[1.1] tracking-[-0.022em] text-primary md:text-[2.5rem]">
          {p.title}
          {p.accent && <> {p.accent}</>}
        </h1>
        <div className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">{p.lead}</div>
        <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="h-12 w-full gap-2 px-6 text-[15px] font-semibold sm:w-auto">
            <Link to={p.primary.to}>
              {p.primary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          {p.secondary && (
            <Button asChild size="lg" variant="outline" className="h-12 w-full px-6 text-[15px] font-semibold sm:w-auto">
              <Link to={p.secondary.to}>{p.secondary.label}</Link>
            </Button>
          )}
        </div>
        {p.trust && p.trust.length > 0 && (
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {p.trust.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8.5l3.2 3.2L13 5" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
      {p.children && <div className="min-w-0">{p.children}</div>}
    </div>
  </section>
);

/** Echter App-Screenshot im schlichten Fensterrahmen. */
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
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-3 py-2" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="ml-2 hidden truncate text-xs text-muted-foreground sm:inline">gruenderx.de{shot.pfad}</span>
      </div>
      <div className={cn("relative overflow-hidden", fade && "max-sm:max-h-[380px]")}>
        <picture>
          {shot.mobil ? (
            <source media="(max-width: 640px)" srcSet={shot.mobil.src} width={shot.mobil.breite} height={shot.mobil.hoehe} />
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

/** Themenzeile aus Text (keine fremden Logos). Früher ein Laufband, jetzt eine ruhige Zeile. */
export const TextMarquee = ({ label, items }: { label: string; items: string[] }) => (
  <section aria-label={label} className="border-b border-border bg-background py-5">
    <div className="container flex max-w-6xl flex-col gap-2 px-4 md:flex-row md:items-baseline md:gap-6">
      <p className="shrink-0 text-[13px] font-medium text-muted-foreground">{label}</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-medium text-foreground/80">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  </section>
);

export const SectionHead = ({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode; align?: "center" | "left" }) => (
  <header className="mb-8 max-w-2xl md:mb-10">
    <p className="mb-2 text-[13px] font-semibold text-muted-foreground">{eyebrow}</p>
    <h2 className="text-balance text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-primary md:text-[2rem]">{title}</h2>
    {lead && <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-[17px]">{lead}</p>}
  </header>
);

export interface BentoItem {
  to: string;
  title: string;
  text: string;
  icon: LucideIcon;
  /** UI-Ausschnitt oben in der Karte. */
  bild?: Screenshot;
  /** Kleine Marke auf dem Bild, z. B. „Gratis“. */
  chip?: string;
  /** Breite Karte über zwei Spalten. */
  breit?: boolean;
}

/** Kartenraster: oben UI-Ausschnitt, darunter Titel und Text. Mobil als Wischreihe. */
export const BentoGrid = ({ items }: { items: BentoItem[] }) => (
  <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
    {items.map((it, i) => {
      // Regelmäßiges Dreier-Raster; ein Rest von zwei oder einer Karte wird vorne breit gesetzt, damit keine Lücke bleibt.
      const rest = items.length % 3;
      const breit = it.breit ?? ((rest === 2 && i < 2) || (rest === 1 && i < 4 && items.length > 3));
      return (
        <Link
          key={it.to + it.title}
          to={it.to}
          className={cn(
            "press group flex w-[84%] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-border bg-card hover:border-foreground/30 md:w-auto",
            breit ? "md:col-span-3" : "md:col-span-2",
          )}
        >
          {it.bild && (
            <div className="relative h-44 overflow-hidden bg-secondary/60 px-4 pt-4 md:h-56 md:px-5 md:pt-5">
              <img
                src={it.bild.klein}
                srcSet={`${it.bild.klein} 520w, ${it.bild.gross} 1000w`}
                sizes={breit ? "(min-width: 768px) 520px, 100vw" : "(min-width: 768px) 340px, 100vw"}
                alt={it.bild.alt}
                width={it.bild.breite}
                height={it.bild.hoehe}
                loading="lazy"
                decoding="async"
                className="w-full rounded-t-md border border-b-0 border-border object-cover object-top"
              />
              {it.chip && (
                <span className="absolute right-4 top-4 rounded bg-brand-green px-2 py-0.5 text-xs font-semibold text-brand-green-foreground">
                  {it.chip}
                </span>
              )}
            </div>
          )}
          <div className="flex flex-1 flex-col border-t border-border p-4 md:p-5">
            {!it.bild && it.chip && (
              <span className="mb-3 self-start rounded-md bg-brand-green px-2 py-1 text-xs font-semibold text-brand-green-foreground">{it.chip}</span>
            )}
            <span className="flex items-center gap-2">
              <it.icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="text-base font-semibold text-foreground">{it.title}</span>
              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
            </span>
            <span className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{it.text}</span>
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

/** Nummerierter Weg als Liste mit Trennlinien. */
export const StepsPath = ({ steps, note }: { steps: PathStep[]; note?: ReactNode }) => (
  <div>
    <ol className="grid overflow-hidden rounded-lg border border-border bg-card md:grid-cols-2">
      {steps.map((s, i) => (
        <li
          key={i}
          className={cn(
            "flex gap-4 border-b border-border p-4 last:border-b-0 md:p-5 md:odd:border-r md:[&:nth-last-child(2):nth-child(odd)]:border-b-0",
            !s.description && "bg-secondary/40",
          )}
        >
          <span className={cn("w-7 shrink-0 pt-0.5 text-sm font-semibold tabular", s.description ? "text-primary" : "text-muted-foreground")}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <p className="font-semibold leading-snug">{s.title}</p>
            {s.description && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>}
            {s.meta && <p className="mt-1.5 text-xs font-medium text-muted-foreground">{s.meta}</p>}
          </div>
        </li>
      ))}
    </ol>
    {note && <p className="mt-4 text-sm text-muted-foreground">{note}</p>}
  </div>
);

/** Schluss-CTA: ein ruhiges Navy-Band, linksbündig, Knopf rechts. */
export const FinalCta = ({ title, text, primary, secondary }: { title: string; text: ReactNode; primary: HeroCta; secondary?: HeroCta }) => (
  <section className="container max-w-6xl px-4 pb-16 md:pb-20">
    <div className="flex flex-col gap-6 rounded-lg bg-ink px-5 py-8 text-primary-foreground md:flex-row md:items-center md:justify-between md:gap-10 md:px-10 md:py-10">
      <div className="min-w-0 max-w-2xl">
        <h2 className="text-balance text-2xl font-semibold leading-[1.15] tracking-[-0.02em] md:text-[1.75rem]">{title}</h2>
        <p className="mt-2.5 text-pretty text-base leading-relaxed text-primary-foreground/80">{text}</p>
      </div>
      <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center md:flex-col md:items-stretch lg:flex-row lg:items-center">
        <Button asChild size="lg" className="h-12 gap-2 bg-card px-6 font-semibold text-primary hover:bg-card/90">
          <Link to={primary.to}>
            {primary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        {secondary && (
          <Link to={secondary.to} className="inline-flex min-h-11 items-center justify-center text-[15px] font-semibold text-primary-foreground underline-offset-4 hover:underline">
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  </section>
);
