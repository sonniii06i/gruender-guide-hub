/**
 * Baukasten für alle Cockpit-Tools (Redesign 10/2026).
 *
 * Ziel: Jedes der Tools hat dieselbe Grammatik.
 *   CockpitShell        Seitenkopf (Kicker, H1, Untertitel) und Rahmen
 *   ToolLayout          zweispaltig: Eingaben links, Ergebnis rechts (sticky)
 *   ToolSection         Abschnitt mit Titel, optionalem Icon und Beschreibung
 *   Field               Label über dem Eingabefeld, Hinweis darunter, Fehler darunter
 *   ResultPanel         hervorgehobene Ergebnis-Zone (dunkel oder hell)
 *   StatTile / StatGrid Kennzahlen mit tabellarischen Ziffern
 *   Callout             Hinweis-Box in einem Status-Ton
 *   ToneBadge           kleines Status-Etikett
 *   EmptyState          Leerzustand mit nächstem Schritt
 *   KitTable            Tabellen-Rahmen mit horizontalem Scroll auf Mobil
 *   ChoiceGroup         Segment-Auswahl (ersetzt handgebaute Knopfreihen)
 *
 * Regeln: Labels in Satzschreibung (keine Großbuchstaben mit Sperrung),
 * keine Emojis in Überschriften, Status-Farben nur über die Töne
 * success / warning / danger / info / neutral.
 */
import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Info, XCircle, CircleDashed } from "lucide-react";

export type Tone = "neutral" | "info" | "success" | "warning" | "danger" | "accent";

/** Entfernt führende Emojis/Symbole und Mehrfach-Leerzeichen aus UI-Texten. */
export const stripEmoji = (s: string): string =>
  s
    .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{FE0F}\u{200D}\u{20E3}]/gu, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^[\s·•|:–-]+/, "")
    .trim();

const TONE_SOFT: Record<Tone, string> = {
  neutral: "border-border bg-secondary/60 text-foreground",
  info: "border-info/20 bg-info-soft text-foreground",
  success: "border-success/25 bg-success-soft text-foreground",
  warning: "border-warning/25 bg-warning-soft text-foreground",
  danger: "border-danger/25 bg-danger-soft text-foreground",
  accent: "border-accent-blue/20 bg-accent text-foreground",
};
const TONE_TEXT: Record<Tone, string> = {
  neutral: "text-muted-foreground",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  accent: "text-accent-blue",
};
const TONE_ICON: Record<Tone, ElementType> = {
  neutral: CircleDashed,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
  accent: Info,
};

export const toneText = (t: Tone) => TONE_TEXT[t];
export const toneSoft = (t: Tone) => TONE_SOFT[t];

/* ------------------------------------------------------------------ Layout */

/** Zwei Spalten ab lg: Eingaben (breiter) und Ergebnis (sticky). Mobil gestapelt. */
export const ToolLayout = ({
  inputs,
  result,
  className,
  resultFirstOnMobile = false,
}: {
  inputs: ReactNode;
  result: ReactNode;
  className?: string;
  resultFirstOnMobile?: boolean;
}) => (
  <div className={cn("grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8", className)}>
    <div className={cn("min-w-0 space-y-6", resultFirstOnMobile && "order-2 lg:order-1")}>{inputs}</div>
    <div className={cn("min-w-0 space-y-6 lg:sticky lg:top-20", resultFirstOnMobile && "order-1 lg:order-2")}>{result}</div>
  </div>
);

export const ToolSection = ({
  title,
  description,
  icon: Icon,
  actions,
  children,
  className,
  bodyClassName,
  as: As = "section",
  id,
}: {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ElementType;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
  as?: ElementType;
  id?: string;
}) => (
  <As id={id} className={cn("rounded-2xl border border-border bg-card shadow-card", className)}>
    {(title || actions) && (
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 px-5 py-4 md:px-6">
        <div className="flex min-w-0 items-start gap-3">
          {Icon && (
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
          )}
          <div className="min-w-0">
            {title && <h2 className="text-base font-semibold leading-snug tracking-tight">{title}</h2>}
            {description && <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{description}</p>}
          </div>
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
    )}
    <div className={cn("p-5 md:p-6", bodyClassName)}>{children}</div>
  </As>
);

/* ------------------------------------------------------------------ Formular */

export const Field = ({
  label,
  hint,
  error,
  htmlFor,
  children,
  className,
}: {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("space-y-1.5", className)}>
    <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
      {label}
    </label>
    {children}
    {hint && !error && <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>}
    {error && (
      <p className="text-xs font-medium text-danger" role="alert">
        {error}
      </p>
    )}
  </div>
);

/** Klassen für native <select>, passend zu <Input>. */
export const selectCls =
  "h-10 w-full rounded-md border border-input bg-card px-3 text-sm shadow-[0_1px_2px_hsl(var(--primary)/0.04)] transition-[border-color,box-shadow] focus:border-ring focus:outline-none focus:ring-[3px] focus:ring-ring/25 disabled:opacity-50";

/** Segment-Auswahl. Ersetzt handgebaute Knopfreihen (aria-pressed inklusive). */
export function ChoiceGroup<T extends string | number | boolean>({
  value,
  onChange,
  options,
  className,
  size = "md",
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: ReactNode; hint?: ReactNode }[];
  className?: string;
  size?: "sm" | "md";
  label?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-lg border text-left font-medium transition-[background-color,border-color,color] duration-200 active:translate-y-px",
              size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3.5 py-2 text-sm",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground/80 hover:border-foreground/25 hover:text-foreground",
            )}
          >
            <span className="block">{o.label}</span>
            {o.hint && (
              <span className={cn("mt-0.5 block text-xs font-normal", active ? "text-primary-foreground/75" : "text-muted-foreground")}>
                {o.hint}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ Ergebnis */

/**
 * Hervorgehobene Ergebnis-Zone. variant="ink" ist die dunkle Hauptkarte für
 * die eine Zahl, die zählt; variant="light" für ausführliche Ergebnisse.
 */
export const ResultPanel = ({
  title = "Ergebnis",
  kicker,
  value,
  valueHint,
  children,
  variant = "light",
  className,
  actions,
}: {
  title?: ReactNode;
  kicker?: ReactNode;
  value?: ReactNode;
  valueHint?: ReactNode;
  children?: ReactNode;
  variant?: "ink" | "light";
  className?: string;
  actions?: ReactNode;
}) => {
  const ink = variant === "ink";
  return (
    <section
      aria-live="polite"
      className={cn(
        "relative overflow-hidden rounded-2xl border p-5 md:p-6",
        ink ? "border-transparent bg-ink text-primary-foreground shadow-soft" : "border-accent-blue/20 bg-card shadow-soft",
        className,
      )}
    >
      {!ink && <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-blue to-brand-green" aria-hidden="true" />}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {kicker && <p className={cn("text-sm font-medium", ink ? "text-brand-green-glow" : "text-accent-blue")}>{kicker}</p>}
          {title && <h2 className={cn("text-base font-semibold tracking-tight", kicker && "mt-1")}>{title}</h2>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {value !== undefined && (
        <div className="mt-4">
          <div className="text-4xl font-semibold tracking-[-0.035em] tabular md:text-5xl">{value}</div>
          {valueHint && (
            <p className={cn("mt-1.5 text-sm", ink ? "text-primary-foreground/70" : "text-muted-foreground")}>{valueHint}</p>
          )}
        </div>
      )}
      {children && <div className={cn(value !== undefined || title ? "mt-5" : "", ink && "text-primary-foreground/85")}>{children}</div>}
    </section>
  );
};

export const StatGrid = ({ children, className, cols = 3 }: { children: ReactNode; className?: string; cols?: 2 | 3 | 4 }) => (
  <div
    className={cn(
      "grid gap-3",
      cols === 2 && "grid-cols-1 sm:grid-cols-2",
      cols === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      cols === 4 && "grid-cols-2 lg:grid-cols-4",
      className,
    )}
  >
    {children}
  </div>
);

export const StatTile = ({
  label,
  value,
  hint,
  tone = "neutral",
  emphasis = false,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  tone?: Tone;
  emphasis?: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-xl border p-4",
      emphasis ? TONE_SOFT[tone === "neutral" ? "accent" : tone] : "border-border bg-card",
      className,
    )}
  >
    <p className="text-sm text-muted-foreground">{label}</p>
    <p
      className={cn(
        "mt-1 font-semibold tracking-tight tabular",
        emphasis ? "text-2xl md:text-[1.7rem]" : "text-xl",
        tone !== "neutral" && TONE_TEXT[tone],
      )}
    >
      {value}
    </p>
    {hint && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{hint}</p>}
  </div>
);

/** Zeile Label/Wert für Aufschlüsselungen (z. B. Steuer-Positionen). */
export const ResultRow = ({
  label,
  value,
  hint,
  strong = false,
  tone = "neutral",
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  strong?: boolean;
  tone?: Tone;
}) => (
  <div className={cn("flex items-baseline justify-between gap-4 py-2.5", strong && "font-semibold")}>
    <div className="min-w-0">
      {/* Farbe erbt vom Container: funktioniert in hellen Karten und im dunklen ResultPanel. */}
      <span className={cn("text-sm", !strong && "opacity-80")}>{label}</span>
      {hint && <span className="block text-xs opacity-65">{hint}</span>}
    </div>
    <span className={cn("shrink-0 text-sm tabular", strong && "text-base", tone !== "neutral" && TONE_TEXT[tone])}>{value}</span>
  </div>
);

/* ------------------------------------------------------------------ Hinweise */

export const Callout = ({
  tone = "info",
  title,
  icon,
  children,
  className,
}: {
  tone?: Tone;
  title?: ReactNode;
  icon?: ElementType | false;
  children?: ReactNode;
  className?: string;
}) => {
  const Icon = icon === false ? null : icon ?? TONE_ICON[tone];
  return (
    <div className={cn("flex gap-3 rounded-xl border p-4 text-sm leading-relaxed", TONE_SOFT[tone], className)}>
      {Icon && <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", TONE_TEXT[tone])} aria-hidden="true" />}
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold text-foreground">{title}</p>}
        {children && <div className={cn("text-foreground/80", title && "mt-1")}>{children}</div>}
      </div>
    </div>
  );
};

export const ToneBadge = ({ tone = "neutral", children, className }: { tone?: Tone; children: ReactNode; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold leading-none",
      TONE_SOFT[tone],
      TONE_TEXT[tone],
      className,
    )}
  >
    {children}
  </span>
);

export const EmptyState = ({
  icon: Icon = CircleDashed,
  title,
  description,
  action,
  className,
}: {
  icon?: ElementType;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-12 text-center", className)}>
    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
    <p className="font-semibold">{title}</p>
    {description && <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

/* ------------------------------------------------------------------ Tabellen */

/** Rahmen für <table>: scrollt mobil horizontal, Kopfzeile dezent, Zahlen tabellarisch. */
export const KitTable = ({ children, className, caption }: { children: ReactNode; className?: string; caption?: ReactNode }) => (
  <div className={cn("relative max-w-full overflow-x-auto rounded-xl border border-border bg-card [contain:paint]", className)}>
    <table
      className={cn(
        "w-full border-collapse text-sm tabular",
        "[&_thead_th]:bg-secondary/70 [&_thead_th]:px-3 [&_thead_th]:py-2.5 [&_thead_th]:text-left [&_thead_th]:text-xs [&_thead_th]:font-semibold [&_thead_th]:text-muted-foreground",
        "[&_tbody_td]:border-t [&_tbody_td]:border-border/70 [&_tbody_td]:px-3 [&_tbody_td]:py-2.5 [&_tbody_tr:hover]:bg-secondary/30",
        "[&_tfoot_td]:border-t [&_tfoot_td]:border-border [&_tfoot_td]:px-3 [&_tfoot_td]:py-2.5 [&_tfoot_td]:font-semibold",
      )}
    >
      {caption && <caption className="sr-only">{caption}</caption>}
      {children}
    </table>
  </div>
);
