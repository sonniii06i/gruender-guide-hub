import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Clock, ListChecks, Loader2 } from "lucide-react";
import { useGuideStart } from "@/hooks/useGuideStart";
import type { Playbook } from "@/data/playbooks";
import { ToneBadge, type Tone } from "@/components/cockpit/kit";

const DIFF_TONE: Record<Playbook["difficulty"], Tone> = {
  Einfach: "success",
  Mittel: "info",
  Komplex: "warning",
};

export const GuideCard = ({ pb, compact = false }: { pb: Playbook; compact?: boolean }) => {
  const { start, starting } = useGuideStart();
  const navigate = useNavigate();
  const isStarting = starting === pb.slug;

  // Klick aufs Card-Body → Preview-Seite
  const goToPreview = () => navigate(`/playbook/preview/${pb.slug}`);

  // Klick auf Guide-starten Button → Run starten (Card-Click verhindern)
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
      className="group flex cursor-pointer flex-col rounded-xl border border-border bg-card p-5 transition-[border-color,box-shadow] duration-200 hover:border-accent-blue/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-2xl" aria-hidden="true">
          {pb.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <ToneBadge tone={DIFF_TONE[pb.difficulty]}>{pb.difficulty}</ToneBadge>
          </div>
          <h3 className="truncate text-base font-semibold leading-tight">{pb.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{pb.tagline}</p>
        </div>
      </div>
      {!compact && (
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          <span className="font-semibold text-foreground">Ergebnis:</span> {pb.outcome}
        </p>
      )}
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" /> {pb.duration}</span>
        <span className="inline-flex items-center gap-1 tabular"><ListChecks className="h-3.5 w-3.5" aria-hidden="true" /> {pb.steps.length} Schritte</span>
      </div>
      {pb.totalCost && (
        <dl className="mb-4 grid gap-1 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs leading-snug">
          <div className="flex gap-1.5"><dt className="text-muted-foreground">Setup:</dt><dd className="font-medium text-foreground">{pb.totalCost}</dd></div>
          {pb.runningCost && <div className="flex gap-1.5"><dt className="text-muted-foreground">Laufend:</dt><dd className="text-foreground/80">{pb.runningCost}</dd></div>}
        </dl>
      )}
      <div className="flex items-center gap-2 mt-auto">
        <Button
          onClick={handleStartClick}
          disabled={isStarting}
          size="sm"
          className="gap-1.5"
        >
          {isStarting ? <><Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Wird gestartet…</> : <>Guide starten <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></>}
        </Button>
      </div>
    </div>
  );
};
