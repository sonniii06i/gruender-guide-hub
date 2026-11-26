import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Screenshot } from "@/data/screenshots";

export const GridBackground = (_: { className?: string }) => null;

export interface HeroCta {
  to: string;
  label: string;
}

/**
 * Full-Bleed GründerX Deep-Navy Studio Hero (Rebuild 11/2026):
 * Markante Navy-Vollfläche mit Architektur-Raster, strahlend weißer Geist-Display-Typo,
 * kontrastreicher Emerald-Hauptaktion (AAA) und interaktiver Produkt-Bühne rechts.
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
  <section className="gx-stage relative overflow-x-clip pb-16 pt-24 text-white md:pb-24 md:pt-28">
    <div className="gx-stage-grid pointer-events-none absolute inset-0" aria-hidden="true" />
    <div
      className={cn(
        "container relative z-10 max-w-6xl px-4",
        p.children && "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-12",
      )}
    >
      <div className={cn("min-w-0", !p.children && "max-w-3xl")}>
        {p.crumbs && p.crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-white/65">
            {p.crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.to ? (
                  <Link to={c.to} className="rounded-md transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-medium text-white">{c.label}</span>
                )}
                {i < p.crumbs!.length - 1 && <span aria-hidden="true">/</span>}
              </span>
            ))}
          </nav>
        )}

        <div className="mb-5 inline-flex max-w-full flex-wrap items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[13px] font-medium leading-snug text-white/90 backdrop-blur-sm sm:rounded-full">
          {p.eyebrow}
        </div>

        <h1 className="text-balance text-[2.25rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.75rem] md:text-[3.35rem]">
          {p.title}
          {p.accent && <span className="block text-[#6EE7B7] sm:inline"> {p.accent}</span>}
        </h1>

        <div className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/80 md:text-[18px]">
          {p.lead}
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="press h-12 w-full gap-2 rounded-xl bg-[#10B981] px-6 text-[15px] font-bold text-[#042016] shadow-lg hover:bg-[#34D399] sm:w-auto"
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
              className="press h-12 w-full rounded-xl border-white/25 bg-white/[0.07] px-6 text-[15px] font-semibold text-white hover:bg-white/15 hover:text-white sm:w-auto"
            >
              <Link to={p.secondary.to}>{p.secondary.label}</Link>
            </Button>
          )}
        </div>

        {p.trust && p.trust.length > 0 && (
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            {p.trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#10B981]/25 text-[#6EE7B7]">
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

/** Echter App-Screenshot im dunklen Studio-Fensterrahmen. */
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
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-card shadow-2xl ring-1 ring-black/10">
      <div className="flex items-center gap-2 border-b border-border bg-[#0F214C] px-4 py-2.5" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        </span>
        <span className="ml-2 hidden truncate rounded-md bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/80 sm:inline">
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
    {caption && <figcaption className="mt-3 text-xs text-current opacity-75">{caption}</figcaption>}
  </figure>
);

export const TextMarquee = ({ label, items }: { label: string; items: string[] }) => (
  <section aria-label={label} className="border-y border-border bg-card py-5">
    <div className="container flex max-w-6xl flex-col gap-3 px-4 md:flex-row md:items-center md:gap-5">
      <p className="shrink-0 text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
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
    <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
      {eyebrow}
    </p>
    <h2 className="text-balance text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-primary md:text-[2.35rem]">
      {title}
    </h2>
    {lead && (
      <p className="mt-3.5 text-pretty text-base leading-relaxed text-muted-foreground md:text-[17px]">
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
            <div className="relative h-44 overflow-hidden bg-[#0E2250] px-4 pt-4 md:h-52 md:px-5 md:pt-5">
              <img
                src={it.bild.klein}
                srcSet={`${it.bild.klein} 520w, ${it.bild.gross} 1000w`}
                sizes={breit ? "(min-width: 768px) 520px, 100vw" : "(min-width: 768px) 340px, 100vw"}
                alt={it.bild.alt}
                width={it.bild.breite}
                height={it.bild.hoehe}
                loading="lazy"
                decoding="async"
                className="w-full rounded-t-xl border border-b-0 border-white/15 object-cover object-top shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {it.chip && (
                <span className="absolute right-4 top-4 rounded-full bg-[#10B981] px-2.5 py-0.5 text-xs font-bold text-[#042016] shadow-sm">
                  {it.chip}
                </span>
              )}
            </div>
          )}
          <div className="flex flex-1 flex-col p-5">
            {!it.bild && it.chip && (
              <span className="mb-3 self-start rounded-full bg-brand-green-soft px-2.5 py-0.5 text-xs font-bold text-brand-green">
                {it.chip}
              </span>
            )}
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <it.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-base font-bold text-foreground">{it.title}</span>
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

export const StepsPath = ({ steps, note }: { steps: PathStep[]; note?: ReactNode }) => (
  <div>
    <ol className="grid gap-3.5 md:grid-cols-2">
      {steps.map((s, i) => (
        <li
          key={i}
          className={cn(
            "flex gap-4 rounded-2xl border p-5 transition-colors",
            s.description
              ? "border-border bg-card shadow-card"
              : "border-border/70 bg-secondary/45",
          )}
        >
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold tabular",
              s.description
                ? "bg-primary text-white shadow-sm"
                : "border border-border bg-card text-muted-foreground",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <p className="font-bold leading-snug text-foreground">{s.title}</p>
            {s.description && (
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            )}
            {s.meta && (
              <p className="mt-2 inline-flex rounded-lg bg-secondary px-2.5 py-0.5 text-xs font-semibold text-foreground/75">
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
    <div className="gx-stage relative overflow-hidden rounded-3xl px-6 py-10 text-white shadow-2xl md:px-12 md:py-14">
      <div className="gx-stage-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="min-w-0 max-w-2xl">
          <h2 className="text-balance text-2xl font-bold leading-[1.1] tracking-[-0.025em] md:text-[2.25rem]">
            {title}
          </h2>
          <p className="mt-3 text-pretty text-base leading-relaxed text-white/80 md:text-lg">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center md:flex-col md:items-stretch lg:flex-row lg:items-center">
          <Button
            asChild
            size="lg"
            className="press h-12 gap-2 rounded-xl bg-[#10B981] px-6 font-bold text-[#042016] shadow-lg hover:bg-[#34D399]"
          >
            <Link to={primary.to}>
              {primary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          {secondary && (
            <Link
              to={secondary.to}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/[0.07] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-white/15"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  </section>
);
