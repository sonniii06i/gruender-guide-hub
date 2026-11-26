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
  gradient: string;
  accentText: string;
  accentBg: string;
  icon: LucideIcon;
}

const THEMES: Record<string, CourseTheme> = {
  us: {
    id: "us",
    label: "US & Ausland",
    gradient: "linear-gradient(135deg, #091636 0%, #15316F 60%, #1E4699 100%)",
    accentText: "text-[#FDE68A]",
    accentBg: "bg-[#F59E0B]/20 border-[#FDE68A]/25",
    icon: CreditCard,
  },
  webapp: {
    id: "webapp",
    label: "Website & App",
    gradient: "linear-gradient(135deg, #0A1E46 0%, #16448E 62%, #1D61B8 100%)",
    accentText: "text-[#93C5FD]",
    accentBg: "bg-[#3B82F6]/20 border-[#93C5FD]/25",
    icon: Smartphone,
  },
  ecom: {
    id: "ecom",
    label: "Shop & Marktplätze",
    gradient: "linear-gradient(135deg, #092B25 0%, #0F513E 62%, #166B51 100%)",
    accentText: "text-[#6EE7B7]",
    accentBg: "bg-[#10B981]/20 border-[#6EE7B7]/25",
    icon: ShoppingBag,
  },
  steuern: {
    id: "steuern",
    label: "Steuern & Finanzen",
    gradient: "linear-gradient(135deg, #101E3A 0%, #1E345E 62%, #294880 100%)",
    accentText: "text-[#A7F3D0]",
    accentBg: "bg-[#10B981]/20 border-[#A7F3D0]/25",
    icon: Calculator,
  },
  creator: {
    id: "creator",
    label: "Creator & Wachstum",
    gradient: "linear-gradient(135deg, #161B48 0%, #27327A 62%, #35449E 100%)",
    accentText: "text-[#BFDBFE]",
    accentBg: "bg-[#60A5FA]/20 border-[#BFDBFE]/25",
    icon: Sparkles,
  },
  team: {
    id: "team",
    label: "Team & Kapital",
    gradient: "linear-gradient(135deg, #0E1F3D 0%, #1E3B6E 62%, #295092 100%)",
    accentText: "text-[#FDE68A]",
    accentBg: "bg-[#F59E0B]/20 border-[#FDE68A]/25",
    icon: Users,
  },
  gruendung: {
    id: "gruendung",
    label: "Gründung & Recht",
    gradient: "linear-gradient(135deg, #0B1B40 0%, #11295F 60%, #1A3C87 100%)",
    accentText: "text-[#6EE7B7]",
    accentBg: "bg-[#10B981]/20 border-[#6EE7B7]/25",
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
  /** Optional interaktiver Direktstart-Button (z. B. im eingeloggten Cockpit). */
  onStart?: () => void;
  starting?: boolean;
  doneSteps?: number;
  completed?: boolean;
  compact?: boolean;
  badgeText?: string;
}

/**
 * Einheitliche Udemy-/Masterclass-Kurskarte für alle 81 Guides (öffentlich & eingeloggt):
 * Farbiger Themen-Header mit Blueprint-Raster, Icon, XP-Wert, Fortschrittsbalken und
 * Arbeitsfenster-Hinweis statt grauer Textkästchen.
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
    <div
      className="relative overflow-hidden px-4 pb-4 pt-4 text-white"
      style={{ backgroundImage: theme.gradient }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold", theme.accentBg, theme.accentText)}>
          <Icon className="h-3 w-3" aria-hidden="true" />
          {badgeText ?? theme.label}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-0.5 text-[11px] font-bold text-[#6EE7B7] tabular">
          <Zap className="h-3 w-3" aria-hidden="true" />
          +{xp} XP
        </span>
      </div>

      <div className="relative z-10 mt-3.5 flex items-end justify-between gap-3">
        <h3 className="line-clamp-2 text-[16px] font-bold leading-snug tracking-tight text-white">
          {title}
        </h3>
        {completed && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#10B981] px-2 py-0.5 text-[10px] font-bold text-[#042016]">
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
            Fertig
          </span>
        )}
      </div>
    </div>
  );

  const body = (
    <div className="flex flex-1 flex-col p-4">
      {!compact && (
        <p className="mb-3.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}

      <div className="mb-3.5 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
        <span className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2 py-1 text-foreground/80 tabular">
          <ListChecks className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {stepsCount} Schritte
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2 py-1 text-foreground/80">
          <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {duration}
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg bg-brand-green-soft px-2 py-1 font-semibold text-brand-green">
          <Wrench className="h-3 w-3" aria-hidden="true" />
          Arbeitsfenster
        </span>
      </div>

      {doneSteps > 0 && (
        <div className="mb-3.5">
          <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-muted-foreground tabular">
            <span>Dein Kurs-Fortschritt</span>
            <span className="text-brand-green">{pct} %</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-brand-green transition-[width] duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/70 pt-3">
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
              className="press h-9 gap-1.5 rounded-xl bg-primary px-3.5 text-xs font-semibold text-white hover:bg-primary/90"
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
            <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-accent-blue">
              Guide ansehen
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
