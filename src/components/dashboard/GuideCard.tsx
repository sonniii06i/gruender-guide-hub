import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, ListChecks, Loader2, Zap } from "lucide-react";
import { useGuideStart } from "@/hooks/useGuideStart";
import { useAuth } from "@/hooks/useAuth";
import type { Playbook } from "@/data/playbooks";
import { ToneBadge, type Tone } from "@/components/cockpit/kit";
import { readGamification } from "@/lib/gamification";
import { cn } from "@/lib/utils";

const DIFF_TONE: Record<Playbook["difficulty"], Tone> = {
  Einfach: "success",
  Mittel: "info",
  Komplex: "warning",
};

export const GuideCard = ({ pb, compact = false }: { pb: Playbook; compact?: boolean }) => {
  const { start, starting } = useGuideStart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isStarting = starting === pb.slug;

  const gam = readGamification(user?.id);
  const doneSteps = gam.completedSteps.filter((k) => k.startsWith(`${pb.slug}:`)).length;
  const isCompleted = gam.completedGuides.includes(pb.slug) || (pb.steps.length > 0 && doneSteps >= pb.steps.length);
  const pct = pb.steps.length > 0 ? Math.min(100, Math.round((doneSteps / pb.steps.length) * 100)) : 0;
  const totalXp = pb.steps.length * 100;

  const goToPreview = () => navigate(`/playbook/preview/${pb.slug}`);

  const handleStartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    start(pb.slug);
  };

  return (
    <div
      onClick={goToPreview}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToPreview();
        }
      }}
      className={cn(
        "press group flex min-w-0 cursor-pointer flex-col rounded-xl border bg-card p-4 shadow-sm transition-[border-color,box-shadow] duration-150 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-5",
        isCompleted ? "border-brand-green/45" : "border-border",
      )}
    >
      <div className="mb-3 flex items-start gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/50 text-xl"
          aria-hidden="true"
        >
          {pb.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-1.5">
            <ToneBadge tone={DIFF_TONE[pb.difficulty]}>{pb.difficulty}</ToneBadge>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-secondary px-1.5 py-0.5 text-[11px] font-semibold text-foreground/80 tabular">
              <Zap className="h-3 w-3 text-accent-blue" aria-hidden="true" />
              +{totalXp} XP
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 rounded-md bg-brand-green-soft px-1.5 py-0.5 text-[11px] font-semibold text-brand-green">
                <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                Fertig
              </span>
            )}
          </div>
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
            {pb.title}
          </h3>
        </div>
      </div>

      {!compact && (
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          <strong className="font-medium text-foreground">Ziel:</strong> {pb.outcome}
        </p>
      )}

      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {pb.duration}
        </span>
        <span className="inline-flex items-center gap-1 tabular">
          <ListChecks className="h-3.5 w-3.5" aria-hidden="true" /> {pb.steps.length} Schritte
        </span>
      </div>

      {doneSteps > 0 && (
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-muted-foreground tabular">
            <span>Fortschritt</span>
            <span className="text-brand-green">{pct} %</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-brand-green" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <Button
          onClick={handleStartClick}
          disabled={isStarting}
          size="sm"
          className="min-h-10 gap-1.5"
        >
          {isStarting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Startet…
            </>
          ) : doneSteps > 0 && !isCompleted ? (
            <>
              Weiterlernen <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </>
          ) : (
            <>
              Guide starten <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </>
          )}
        </Button>
        <span className="text-xs font-medium text-accent-blue group-hover:underline">Vorschau</span>
      </div>
    </div>
  );
};
