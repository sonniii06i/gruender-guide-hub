import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calculator,
  CheckCircle2,
  Clock,
  CreditCard,
  ListChecks,
  Loader2,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CourseTheme {
  id: string;
  label: string;
  bandBg: string;
  iconBg: string;
  iconText: string;
  pillText: string;
  icon: LucideIcon;
}

/**
 * 7 ruhige, helle Studyflix-/Udemy-Themenwelten (Pastell-Akzent statt schwerer dunkler Blöcke).
 */
const THEMES: Record<string, CourseTheme> = {
  us: {
    id: "us",
    label: "US & Ausland",
    bandBg: "bg-[#FDF6E7]",
    iconBg: "bg-[#B45309]",
    iconText: "text-white",
    pillText: "text-[#92400E]",
    icon: CreditCard,
  },
  webapp: {
    id: "webapp",
    label: "Website & App",
    bandBg: "bg-[#EDF4FF]",
    iconBg: "bg-[#1E56C5]",
    iconText: "text-white",
    pillText: "text-[#1E40AF]",
    icon: Smartphone,
  },
  ecom: {
    id: "ecom",
    label: "Shop & Marktplätze",
    bandBg: "bg-[#ECF8F3]",
    iconBg: "bg-[#1E7F5C]",
    iconText: "text-white",
    pillText: "text-[#166534]",
    icon: ShoppingBag,
  },
  steuern: {
    id: "steuern",
    label: "Steuern & Finanzen",
    bandBg: "bg-[#EEF2F9]",
    iconBg: "bg-[#122B64]",
    iconText: "text-white",
    pillText: "text-[#122B64]",
    icon: Calculator,
  },
  creator: {
    id: "creator",
    label: "Creator & Wachstum",
    bandBg: "bg-[#F3EEFE]",
    iconBg: "bg-[#5B21B6]",
    iconText: "text-white",
    pillText: "text-[#5B21B6]",
    icon: Sparkles,
  },
  team: {
    id: "team",
    label: "Team & Kapital",
    bandBg: "bg-[#F1F5F9]",
    iconBg: "bg-[#334155]",
    iconText: "text-white",
    pillText: "text-[#334155]",
    icon: Users,
  },
  gruendung: {
    id: "gruendung",
    label: "Gründung & Recht",
    bandBg: "bg-[#EDF2FA]",
    iconBg: "bg-[#122B64]",
    iconText: "text-white",
    pillText: "text-[#122B64]",
    icon: Building2,
  },
};

export function getCourseTheme(slug: string, title = ""): CourseTheme {
  const s = `${slug} ${title}`.toLowerCase();
  if (/amex|us-llc|us-account|hk-limited|wegzug|estland|dubai|zypern|ausland/.test(s)) return THEMES.us;
  if (/webseite|website|app|saas|seo|domain|ki-|ai-/.test(s)) return THEMES.webapp;
  if (/amazon|shopify|tiktok|kaufland|etsy|ebay|reseller|d2c|shop|lucid|weee|gpsr|verpackung|ecom|marke/.test(s)) return THEMES.ecom;
  if (/steuer|elster|kleinunternehmer|buchhaltung|ust|oss|dac7|finanz|cashflow|bilanz|euer|rechnung/.test(s)) return THEMES.steuern;
  if (/creator|influencer|youtube|instagram|coach|kurs|agentur|freelancer|ugc|marketing|ads/.test(s)) return THEMES.creator;
  if (/hiring|team|minijob|foerder|pitch|vc|exit|kauf|versicherung|holding/.test(s)) return THEMES.team;
  return THEMES.gruendung;
}

export interface CourseCoverCardProps {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: string;
  stepsCount: number;
  to: string;
  onStart?: () => void;
  starting?: boolean;
  doneSteps?: number;
  completed?: boolean;
  compact?: boolean;
  badgeText?: string;
}

/**
 * Helle, übersichtliche Studyflix-/Udemy-Kurskarte für alle 81 Guides:
 * Sanfte Pastell-Kopfzeile mit Themen-Icon, klarer Navy-Titel auf Weiß,
 * kompakte Metadaten (Schritte, Dauer, Arbeitsfenster) und Fortschrittsbalken.
 */
export const CourseCoverCard = ({
  slug,
  title,
  subtitle,
  duration,
  difficulty,
  stepsCount,
  to,
  onStart,
  starting = false,
  doneSteps = 0,
  completed = false,
  compact = false,
  badgeText,
}: CourseCoverCardProps) => {
  const theme = getCourseTheme(slug, title);
  const Icon = theme.icon;
  const xp = stepsCount * 100;
  const pct = stepsCount > 0 ? Math.min(100, Math.round((doneSteps / stepsCount) * 100)) : 0;

  const header = (
    <div className={cn("flex items-center justify-between gap-2 border-b border-border/70 px-4 py-3", theme.bandBg)}>
      <span className="inline-flex min-w-0 items-center gap-2">
        <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg", theme.iconBg, theme.iconText)}>
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className={cn("truncate text-xs font-semibold", theme.pillText)}>
          {badgeText ?? theme.label}
        </span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-brand-green shadow-sm ring-1 ring-border tabular">
        {completed ? (
          <>
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
            Fertig
          </>
        ) : (
          <>
            <Zap className="h-3 w-3" aria-hidden="true" />
            +{xp} XP
          </>
        )}
      </span>
    </div>
  );

  const body = (
    <div className="flex flex-1 flex-col p-4">
      <h3 className="line-clamp-2 text-[16px] font-bold leading-snug tracking-tight text-primary group-hover:text-accent-blue">
        {title}
      </h3>

      {!compact && (
        <p className="mt-1.5 mb-3.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}

      <div className="mb-3.5 mt-auto flex flex-wrap items-center gap-1.5 pt-1 text-xs font-medium text-muted-foreground">
        <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-foreground/80 tabular">
          <ListChecks className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {stepsCount} Schritte
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-foreground/80">
          <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {duration}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-brand-green-soft px-2 py-1 font-semibold text-brand-green">
          <Wrench className="h-3 w-3" aria-hidden="true" />
          Arbeitsfenster
        </span>
      </div>

      {doneSteps > 0 && (
        <div className="mb-3.5">
          <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-muted-foreground tabular">
            <span>Kurs-Fortschritt</span>
            <span className="text-brand-green">{pct} %</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-brand-green transition-[width] duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 border-t border-border/70 pt-3">
        {onStart ? (
          <>
            <Button
              type="button"
              size="sm"
              disabled={starting}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onStart();
              }}
              className="press h-9 gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-semibold text-white hover:bg-primary/90"
            >
              {starting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Startet…
                </>
              ) : doneSteps > 0 && !completed ? (
                <>
                  Weiterlernen <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </>
              ) : (
                <>
                  Kurs starten <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </>
              )}
            </Button>
            <Link
              to={to}
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent-blue hover:underline"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Lehrplan
            </Link>
          </>
        ) : (
          <>
            <span className="text-xs font-medium text-muted-foreground">{difficulty}</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-blue group-hover:underline">
              Kurs ansehen
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </>
        )}
      </div>
    </div>
  );

  if (onStart) {
    return (
      <article
        className={cn(
          "gx-card gx-card-hover group flex min-w-0 flex-col overflow-hidden",
          completed && "ring-1 ring-brand-green/50",
        )}
      >
        <Link to={to} className="block focus-visible:outline-none">
          {header}
        </Link>
        {body}
      </article>
    );
  }

  return (
    <Link
      to={to}
      className={cn(
        "gx-card gx-card-hover press group flex min-w-0 flex-col overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        completed && "ring-1 ring-brand-green/50",
      )}
    >
      {header}
      {body}
    </Link>
  );
};
