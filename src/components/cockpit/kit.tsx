/**
 * Gemeinsamer Lexoffice × Studyflix Baukasten für alle Cockpit-Rechner & Tools.
 *
 *   CockpitShell        Klarer weißer Arbeitskopf mit Breadcrumb & optionalen Sub-Tabs
 *   ToolLayout          Zweispaltig: Eingaben links, sticky Ergebnis rechts
 *   ToolSection         Ruhige weiße Karte mit fein abgesetzter Kopfzeile
 *   Field               Präzises Label, Hinweis & Fehler
 *   ResultPanel         Hervorgehobene Ergebnis-Zone (Navy-KPI-Karte oder helle Rechenweg-Karte)
 *   StatTile / StatGrid Tabellarische Kennzahlen
 *   Callout             Scannbare Hinweis-Box mit linker Status-Kante
 *   ToneBadge           Kompaktes Status-Etikett
 *   EmptyState          Ruhiger Leerzustand mit nächstem Schritt
 *   KitTable            Saubere Lexoffice-Finanztabelle
 *   ChoiceGroup         Präzise Segment-Auswahl
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
  neutral: "border-border bg-secondary/50 text-foreground",
  info: "border-info/25 bg-info-soft text-foreground",
  success: "border-success/25 bg-success-soft text-foreground",
  warning: "border-warning/30 bg-warning-soft text-foreground",
  danger: "border-danger/30 bg-danger-soft text-foreground",
  accent: "border-primary/20 bg-accent/60 text-foreground",
};
const TONE_BAR: Record<Tone, string> = {
  neutral: "bg-border",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  accent: "bg-primary",
};
const TONE_TEXT: Record<Tone, string> = {
  neutral: "text-muted-foreground",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  accent: "text-primary",
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

/** Zwei Spalten ab lg: Eingaben (links) und sticky Ergebnis (rechts). Mobil gestapelt. */
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
  <div className={cn("grid items-start gap-6 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,1fr)] lg:gap-7", className)}>
    <div className={cn("min-w-0 space-y-5", resultFirstOnMobile && "order-2 lg:order-1")}>{inputs}</div>
    <div className={cn("min-w-0 space-y-5 lg:sticky lg:top-20", resultFirstOnMobile && "order-1 lg:order-2")}>{result}</div>
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
  <As id={id} className={cn("overflow-hidden rounded-2xl border border-border bg-white shadow-card", className)}>
    {(title || actions) && (
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-[#F8FAFC] px-5 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          {Icon && (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
          )}
          <div className="min-w-0">
            {title && <h2 className="text-[15px] font-bold leading-snug text-primary">{title}</h2>}
            {description && <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{description}</p>}
          </div>
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
    )}
    <div className={cn("p-5 sm:p-6", bodyClassName)}>{children}</div>
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
    <label htmlFor={htmlFor} className="block text-[13px] font-semibold text-foreground">
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

/** Klassen für native <select>, passend zu <Input> & <NumberField>. */
export const selectCls =
  "h-11 w-full rounded-xl border border-input bg-white px-3.5 text-sm font-medium text-foreground transition-[border-color,box-shadow] focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:opacity-50";

/** Segment-Auswahl im Lexoffice-Stil (aria-pressed inklusive). */
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
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "press rounded-xl border text-left font-semibold transition-colors",
              size === "sm" ? "min-h-9 px-3 py-1.5 text-xs" : "min-h-11 px-4 py-2 text-sm",
              active
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-white text-foreground/85 hover:border-primary/40 hover:bg-secondary/50 hover:text-primary",
            )}
          >
            <span className="block">{o.label}</span>
            {o.hint && (
              <span className={cn("mt-0.5 block text-xs font-normal", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
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
 * Hervorgehobene Ergebnis-Zone:
 * - variant="ink": ruhige, solide GründerX-Navy-KPI-Karte für die eine Hauptzahl
 *   (kompatibel mit allen 45+ Rechner-Seiten, klarer Kontrast auf allen Kind-Karten).
 * - variant="light": helle Lexoffice-Rechenweg-Karte mit feiner Kopfzeile.
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
        ink
          ? "border-primary bg-primary text-primary-foreground shadow-soft"
          : "border-border bg-white shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          {kicker && (
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-wider",
                ink ? "text-brand-green-glow" : "text-muted-foreground",
              )}
            >
              {kicker}
            </p>
          )}
          {title && (
            <h2
              className={cn(
                "text-[15px] font-bold leading-snug",
                ink ? "text-white" : "text-primary",
                kicker && "mt-1",
              )}
            >
              {title}
            </h2>
          )}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>

      {value !== undefined && (
        <div className={cn("mt-4", !ink && "border-b border-border pb-4")}>
          <div className={cn("text-[2rem] font-bold leading-tight tracking-[-0.025em] tabular md:text-[2.35rem]", !ink && "text-primary")}>
            {value}
          </div>
          {valueHint && (
            <p className={cn("mt-1.5 text-sm", ink ? "text-primary-foreground/80" : "text-muted-foreground")}>{valueHint}</p>
          )}
        </div>
      )}

      {children && <div className={cn(value !== undefined || title ? "mt-5" : "", ink && "text-primary-foreground/90")}>{children}</div>}
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
}) => {
  const accentTone = tone === "neutral" ? "accent" : tone;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-4",
        emphasis ? cn("pl-5", TONE_SOFT[accentTone]) : "border-border bg-white shadow-card",
        className,
      )}
    >
      {emphasis && <span aria-hidden="true" className={cn("absolute inset-y-0 left-0 w-1", TONE_BAR[accentTone])} />}
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 font-bold tabular",
          emphasis ? "text-2xl md:text-[1.6rem]" : "text-xl",
          tone !== "neutral" ? TONE_TEXT[tone] : "text-primary",
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{hint}</p>}
    </div>
  );
};

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
      <span className={cn("text-sm", !strong && "opacity-85")}>{label}</span>
      {hint && <span className="block text-xs opacity-65">{hint}</span>}
    </div>
    <span className={cn("shrink-0 text-sm tabular", strong && "text-base font-bold", tone !== "neutral" && TONE_TEXT[tone])}>{value}</span>
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
    <div className={cn("relative flex gap-3 overflow-hidden rounded-xl border p-4 pl-5 text-sm leading-relaxed", TONE_SOFT[tone], className)}>
      <span aria-hidden="true" className={cn("absolute inset-y-0 left-0 w-1", TONE_BAR[tone])} />
      {Icon && <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", TONE_TEXT[tone])} aria-hidden="true" />}
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold text-foreground">{title}</p>}
        {children && <div className={cn("text-foreground/85", title && "mt-1")}>{children}</div>}
      </div>
    </div>
  );
};

export const ToneBadge = ({ tone = "neutral", children, className }: { tone?: Tone; children: ReactNode; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold leading-none",
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
  <div className={cn("flex flex-col items-center rounded-2xl border border-dashed border-border bg-white px-6 py-10 text-center shadow-card", className)}>
    <Icon className="mb-3 h-6 w-6 text-muted-foreground" aria-hidden="true" />
    <p className="font-semibold text-primary">{title}</p>
    {description && <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

/* ------------------------------------------------------------------ Tabellen */

/** Lexoffice-Finanztabelle: scrollt mobil horizontal, ruhige Kopfzeile, tabellarische Ziffern. */
export const KitTable = ({ children, className, caption }: { children: ReactNode; className?: string; caption?: ReactNode }) => (
  <div className={cn("relative max-w-full overflow-x-auto rounded-xl border border-border bg-white [contain:paint]", className)}>
    <table
      className={cn(
        "w-full border-collapse text-sm tabular",
        "[&_thead_th]:bg-[#F4F7FC] [&_thead_th]:px-3.5 [&_thead_th]:py-2.5 [&_thead_th]:text-left [&_thead_th]:text-xs [&_thead_th]:font-semibold [&_thead_th]:uppercase [&_thead_th]:tracking-wider [&_thead_th]:text-muted-foreground",
        "[&_tbody_td]:border-t [&_tbody_td]:border-border/80 [&_tbody_td]:px-3.5 [&_tbody_td]:py-2.5 [&_tbody_tr:hover]:bg-secondary/35",
        "[&_tfoot_td]:border-t [&_tfoot_td]:border-border [&_tfoot_td]:bg-secondary/30 [&_tfoot_td]:px-3.5 [&_tfoot_td]:py-2.5 [&_tfoot_td]:font-semibold",
      )}
    >
      {caption && <caption className="sr-only">{caption}</caption>}
      {children}
    </table>
  </div>
);
