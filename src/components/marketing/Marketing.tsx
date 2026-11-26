import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Lock, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Screenshot } from "@/data/screenshots";

export const GridBackground = (_: { className?: string }) => null;

export interface HeroCta {
  to: string;
  label: string;
}

/**
 * Heller, ruhiger Editorial-Hero im Studyflix- / Udemy- / Lexoffice-Stil:
 * Saubere weiße Fläche mit feiner Trennlinie, kräftige GründerX-Navy-Überschrift,
 * klarer blauer Akzent und echte interaktive Vorschau rechts.
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
  <section className="relative overflow-x-clip border-b border-border bg-white pb-14 pt-24 text-foreground md:pb-20 md:pt-28">
    <div
      className={cn(
        "container max-w-6xl px-4",
        p.children && "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)] lg:gap-12",
      )}
    >
      <div className={cn("min-w-0", !p.children && "max-w-3xl")}>
        {p.crumbs && p.crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            {p.crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.to ? (
                  <Link to={c.to} className="rounded-md transition-colors hover:text-primary">
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

        <div className="mb-4 inline-flex max-w-full flex-wrap items-center gap-2 rounded-xl border border-border bg-secondary/70 px-3 py-1.5 text-[13px] font-medium leading-snug text-primary sm:rounded-full">
          {p.eyebrow}
        </div>

        <h1 className="text-balance text-[2.15rem] font-bold leading-[1.07] tracking-[-0.028em] text-primary sm:text-[2.65rem] md:text-[3.15rem]">
          {p.title}
          {p.accent && <span className="block text-accent-blue sm:inline"> {p.accent}</span>}
        </h1>

        <div className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-[17.5px]">
          {p.lead}
        </div>

        <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="press h-12 w-full gap-2 rounded-xl bg-primary px-6 text-[15px] font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto"
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
              className="press h-12 w-full rounded-xl border-border bg-white px-6 text-[15px] font-semibold text-foreground hover:bg-secondary sm:w-auto"
            >
              <Link to={p.secondary.to}>{p.secondary.label}</Link>
            </Button>
          )}
        </div>

        {p.trust && p.trust.length > 0 && (
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {p.trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
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

/** Echter App-Screenshot im hellen, sachlichen Fensterrahmen (Lexoffice / Studyflix). */
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
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/70 px-4 py-2.5" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </span>
        <span className="ml-2 hidden truncate rounded-md border border-border bg-white px-2.5 py-0.5 text-xs font-medium text-muted-foreground sm:inline">
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
    {caption && <figcaption className="mt-2.5 text-xs text-muted-foreground">{caption}</figcaption>}
  </figure>
);

export const TextMarquee = ({ label, items }: { label: string; items: string[] }) => (
  <section aria-label={label} className="border-y border-border bg-white py-5">
    <div className="container flex max-w-6xl flex-col gap-3 px-4 md:flex-row md:items-center md:gap-5">
      <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <ul className="flex flex-wrap gap-2 text-sm font-medium text-foreground/85">
        {items.map((t) => (
          <li
            key={t}
            className="rounded-lg border border-border bg-background px-3 py-1 text-[13px] font-medium"
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
    <p className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-semibold text-primary">
      {eyebrow}
    </p>
    <h2 className="text-balance text-2xl font-bold leading-[1.12] tracking-[-0.022em] text-primary md:text-[2.15rem]">
      {title}
    </h2>
    {lead && (
      <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-[16.5px]">
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

export const BentoGrid = ({ items }: { items: BentoItem[] }) => (
  <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
    {items.map((it, i) => {
      const rest = items.length % 3;
      const breit = it.breit ?? ((rest === 2 && i < 2) || (rest === 1 && i < 4 && items.length > 3));
      return (
        <Link
          key={it.to + it.title}
          to={it.to}
          className={cn(
            "gx-card gx-card-hover press group flex w-[84%] shrink-0 snap-start flex-col overflow-hidden md:w-auto",
            breit ? "md:col-span-3" : "md:col-span-2",
          )}
        >
          {it.bild && (
            <div className="relative h-44 overflow-hidden border-b border-border bg-secondary/60 px-4 pt-4 md:h-52 md:px-5 md:pt-5">
              <img
                src={it.bild.klein}
                srcSet={`${it.bild.klein} 520w, ${it.bild.gross} 1000w`}
                sizes={breit ? "(min-width: 768px) 520px, 100vw" : "(min-width: 768px) 340px, 100vw"}
                alt={it.bild.alt}
                width={it.bild.breite}
                height={it.bild.hoehe}
                loading="lazy"
                decoding="async"
                className="w-full rounded-t-xl border border-b-0 border-border bg-white object-cover object-top shadow-sm transition-transform duration-200 group-hover:scale-[1.015]"
              />
              {it.chip && (
                <span className="absolute right-4 top-4 rounded-full bg-brand-green px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
                  {it.chip}
                </span>
              )}
            </div>
          )}
          <div className="flex flex-1 flex-col p-5">
            {!it.bild && it.chip && (
              <span className="mb-3 self-start rounded-full bg-brand-green-soft px-2.5 py-0.5 text-xs font-semibold text-brand-green">
                {it.chip}
              </span>
            )}
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <it.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-base font-bold text-primary">{it.title}</span>
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

/**
 * Saubere vertikale Lehrplan-Liste im Udemy- / Studyflix-Stil:
 * Einheitliche Zeilen ohne ungleich hohe Leerkästen. Vorschau-Schritte zeigen
 * direkt ihre Erklärung (crawlbar im HTML), weitere Schritte stehen kompakt mit Schloss.
 */
export const StepsPath = ({ steps, note }: { steps: PathStep[]; note?: ReactNode }) => (
  <div className="max-w-4xl">
    <ol className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white shadow-card">
      {steps.map((s, i) => {
        const isPreview = Boolean(s.description);
        return (
          <li
            key={i}
            className={cn(
              "flex items-start gap-4 px-5 py-4 sm:px-6",
              isPreview ? "bg-white" : "bg-secondary/35",
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold tabular",
                isPreview
                  ? "bg-primary text-white"
                  : "border border-border bg-white text-muted-foreground",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className={cn("min-w-0 font-semibold leading-snug", isPreview ? "text-foreground" : "text-foreground/85")}>
                  {s.title}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {s.meta && (
                    <span className="max-w-full rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground tabular">
                      {s.meta}
                    </span>
                  )}
                  {isPreview ? (
                    <span className="rounded-md bg-brand-green-soft px-2 py-0.5 text-[11px] font-semibold text-brand-green">
                      Vorschau
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-white px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      <Lock className="h-3 w-3" aria-hidden="true" />
                      Im Kurs
                    </span>
                  )}
                </div>
              </div>

              {s.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
    {note && <div className="mt-4">{note}</div>}
  </div>
);

/** Ruhiger, solider GründerX-Navy-Abschlussblock ohne Glow oder Raster. */
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
  <section className="container max-w-6xl px-4 pb-16 pt-4 md:pb-24">
    <div className="rounded-2xl bg-primary px-6 py-10 text-primary-foreground shadow-soft md:px-12 md:py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="min-w-0 max-w-2xl">
          <h2 className="text-balance text-2xl font-bold leading-[1.12] tracking-[-0.02em] text-white md:text-[2rem]">
            {title}
          </h2>
          <p className="mt-2.5 text-pretty text-base leading-relaxed text-white/85 md:text-[17px]">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col items-stretch gap-2.5 sm:flex-row sm:items-center md:flex-col md:items-stretch lg:flex-row lg:items-center">
          <Button
            asChild
            size="lg"
            className="press h-12 gap-2 rounded-xl bg-white px-6 font-semibold text-primary hover:bg-white/90"
          >
            <Link to={primary.to}>
              {primary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          {secondary && (
            <Link
              to={secondary.to}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  </section>
);
