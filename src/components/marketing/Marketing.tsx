import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Screenshot } from "@/data/screenshots";

// Marketing-Bausteine im Aufbau von profitpath.com (25.10.2026): Raster-Hintergrund,
// zentrierter Hero mit Akzent-Teilsatz, gerahmter Echt-Screenshot, Text-Laufband,
// Bento-Karten mit UI-Ausschnitten, nummerierter Weg, Schluss-CTA.
// Eigene Marke: Navy + Akzentblau aus den Tokens, Geist; keine Sterne, keine fremden Logos.

/** Feines Linienraster, das nach unten ausläuft (Hero-Fläche). */
export const GridBackground = ({ className }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_75%)]",
      className,
    )}
  />
);

export interface HeroCta {
  to: string;
  label: string;
}

export const HeroCentered = (p: {
  eyebrow: ReactNode;
  /** Überschrift vor dem Akzent. */
  title: string;
  /** Farbig abgesetzter Teilsatz (optional), steht hinter `title`. */
  accent?: string;
  lead: ReactNode;
  primary: HeroCta;
  secondary?: HeroCta;
  /** Belegbare Vertrauenspunkte, z. B. „monatlich kündbar“. */
  trust?: string[];
  crumbs?: { label: string; to?: string }[];
  children?: ReactNode;
}) => (
  <section className="relative overflow-hidden bg-background pb-10 pt-28 md:pt-36">
    <GridBackground />
    <div className="container relative max-w-5xl px-4 text-center">
      {p.crumbs && p.crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap justify-center gap-1.5 text-sm text-muted-foreground">
          {p.crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {c.to ? <Link to={c.to} className="hover:text-foreground">{c.label}</Link> : <span className="text-foreground">{c.label}</span>}
              {i < p.crumbs!.length - 1 && <span aria-hidden="true">/</span>}
            </span>
          ))}
        </nav>
      )}
      <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-[13px] font-medium text-foreground/80 shadow-card">
        {p.eyebrow}
      </div>
      <h1 className="mx-auto max-w-4xl text-balance text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.045em] text-primary md:text-[4.25rem]">
        {p.title}
        {p.accent && <> <span className="text-accent-blue md:block">{p.accent}</span></>}
      </h1>
      <div className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">{p.lead}</div>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild size="lg" className="press h-12 gap-2 rounded-xl bg-accent-blue px-6 text-[15px] font-semibold text-accent-blue-foreground shadow-[0_10px_24px_-10px_hsl(var(--accent-blue)/0.6)] hover:bg-accent-blue/90">
          <Link to={p.primary.to}>
            {p.primary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        {p.secondary && (
          <Button asChild size="lg" variant="outline" className="press h-12 rounded-xl bg-card px-6 text-[15px] font-semibold">
            <Link to={p.secondary.to}>{p.secondary.label}</Link>
          </Button>
        )}
      </div>
      {p.trust && p.trust.length > 0 && (
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {p.trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
    {p.children && <div className="container relative mt-14 max-w-6xl px-4">{p.children}</div>}
  </section>
);

/** Echter App-Screenshot im Browser-Rahmen, unten ausgeblendet. */
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
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.35)] md:p-2">
      <div className="flex items-center gap-1.5 px-2.5 pb-2 pt-1" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-3 hidden rounded-md bg-secondary px-3 py-0.5 text-[11px] text-muted-foreground sm:inline">gruenderx.de{shot.pfad}</span>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-border/70">
        <picture>
          <source media="(max-width: 640px)" srcSet={shot.klein} />
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
        {fade && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent" aria-hidden="true" />}
      </div>
    </div>
    {caption && <figcaption className="mt-3 text-center text-xs text-muted-foreground">{caption}</figcaption>}
  </figure>
);

/** Laufband aus Text (keine fremden Logos). Doppelt gerendert für die nahtlose Schleife. */
export const TextMarquee = ({ label, items }: { label: string; items: string[] }) => (
  <section aria-label={label} className="border-y border-border/70 bg-card/60 py-6">
    <p className="mb-4 text-center text-[13px] font-medium text-muted-foreground">{label}</p>
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="gx-marquee flex w-max gap-12 whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} aria-hidden={i >= items.length} className="text-xl font-semibold tracking-tight text-primary/55 md:text-2xl">
            {t}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export const SectionHead = ({ eyebrow, title, lead, align = "center" }: { eyebrow: string; title: ReactNode; lead?: ReactNode; align?: "center" | "left" }) => (
  <header className={cn("mb-12 md:mb-16", align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl")}>
    <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-blue">{eyebrow}</p>
    <h2 className="text-balance text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-primary md:text-[3rem]">{title}</h2>
    {lead && <p className={cn("mt-5 text-pretty text-lg leading-relaxed text-muted-foreground", align === "center" && "mx-auto max-w-2xl")}>{lead}</p>}
  </header>
);

export interface BentoItem {
  to: string;
  title: string;
  text: string;
  icon: LucideIcon;
  /** UI-Ausschnitt oben in der Karte. */
  bild?: Screenshot;
  /** Kleine schwebende Marke auf dem Bild, z. B. „Gratis“. */
  chip?: string;
  /** Breite Karte über zwei Spalten. */
  breit?: boolean;
}

/** Bento-Raster: Karten unterschiedlicher Breite, oben UI-Ausschnitt, darunter Icon + Titel + Text. */
export const BentoGrid = ({ items }: { items: BentoItem[] }) => (
  <div className="grid gap-4 md:grid-cols-6">
    {items.map((it, i) => {
      const breit = it.breit ?? (i % 5 === 0 || i % 5 === 3);
      return (
        <Link
          key={it.to + it.title}
          to={it.to}
          className={cn(
            "press group flex flex-col overflow-hidden rounded-[1.25rem] bg-secondary/60 ring-1 ring-border/70 transition-shadow hover:shadow-soft hover:ring-accent-blue/30",
            breit ? "md:col-span-4" : "md:col-span-2",
          )}
        >
          {it.bild && (
            <div className="relative h-52 overflow-hidden px-5 pt-5 md:h-60">
              <img
                src={it.bild.klein}
                srcSet={`${it.bild.klein} 520w, ${it.bild.gross} 1000w`}
                sizes={breit ? "(min-width: 768px) 640px, 100vw" : "(min-width: 768px) 320px, 100vw"}
                alt={it.bild.alt}
                width={it.bild.breite}
                height={it.bild.hoehe}
                loading="lazy"
                decoding="async"
                className="w-full rounded-t-xl object-cover object-top shadow-[0_16px_40px_-18px_hsl(var(--primary)/0.4)] ring-1 ring-border transition-transform duration-500 group-hover:-translate-y-1"
              />
              {it.chip && (
                <span className="absolute right-6 top-7 rounded-md bg-brand-green px-2 py-1 text-[11px] font-semibold text-brand-green-foreground shadow-card">
                  {it.chip}
                </span>
              )}
            </div>
          )}
          <div className="flex flex-1 flex-col border-t border-border/70 bg-card p-5 md:p-6">
            <span className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-blue">
                <it.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-[17px] font-semibold tracking-tight text-accent-blue">{it.title}</span>
              <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent-blue" aria-hidden="true" />
            </span>
            <span className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{it.text}</span>
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

/** Nummerierter Weg (ProfitPath: „Your path to profit“). */
export const StepsPath = ({ steps, note }: { steps: PathStep[]; note?: ReactNode }) => (
  <div>
    <ol className="relative grid gap-3 md:grid-cols-2">
      {steps.map((s, i) => (
        <li key={i} className={cn("flex gap-4 rounded-2xl bg-card p-5 ring-1 ring-border/70 md:p-6", !s.description && "bg-card/60")}>
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold tabular",
              s.description ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <p className="font-semibold leading-snug tracking-tight">{s.title}</p>
            {s.description && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>}
            {s.meta && <p className="mt-2 text-xs font-medium text-accent-blue">{s.meta}</p>}
          </div>
        </li>
      ))}
    </ol>
    {note && <p className="mt-5 text-center text-sm text-muted-foreground">{note}</p>}
  </div>
);

/** Schluss-CTA auf dunkler Fläche desselben Navy-Tons. */
export const FinalCta = ({ title, text, primary, secondary }: { title: string; text: ReactNode; primary: HeroCta; secondary?: HeroCta }) => (
  <section className="container max-w-6xl px-4 pb-24">
    <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-14 text-center text-primary-foreground md:px-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-dots-light" aria-hidden="true" />
      <h2 className="relative mx-auto max-w-3xl text-balance text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[2.75rem]">{title}</h2>
      <p className="relative mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/75">{text}</p>
      <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild size="lg" className="press h-12 gap-2 rounded-xl bg-card px-6 font-semibold text-primary hover:bg-card/90">
          <Link to={primary.to}>
            {primary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        {secondary && (
          <Link to={secondary.to} className="text-[15px] font-semibold text-primary-foreground/85 underline-offset-4 hover:underline">
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  </section>
);
