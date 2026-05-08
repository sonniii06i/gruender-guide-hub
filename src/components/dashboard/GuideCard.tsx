import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Clock, ListChecks, Loader2 } from "lucide-react";
import { useGuideStart } from "@/hooks/useGuideStart";
import type { Playbook } from "@/data/playbooks";

const DIFF_STYLES: Record<Playbook["difficulty"], string> = {
  Einfach: "bg-success/10 text-success",
  Mittel: "bg-accent-blue/10 text-accent-blue",
  Komplex: "bg-destructive/10 text-destructive",
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
      className="group rounded-2xl border border-border bg-card p-5 hover:border-accent-blue/40 hover:shadow-soft transition-all flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center text-2xl shrink-0">
          {pb.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`inline-flex rounded-full text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 ${DIFF_STYLES[pb.difficulty]}`}>
              {pb.difficulty}
            </span>
          </div>
          <h3 className="font-bold text-base leading-tight truncate">{pb.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{pb.tagline}</p>
        </div>
      </div>
      {!compact && (
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          <span className="font-semibold text-foreground">Ergebnis:</span> {pb.outcome}
        </p>
      )}
      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-2 flex-wrap">
        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {pb.duration}</span>
        <span className="inline-flex items-center gap-1"><ListChecks className="h-3 w-3" /> {pb.steps.length} Schritte</span>
      </div>
      {pb.totalCost && (
        <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-2 mb-3 text-[11px] leading-snug">
          <div className="font-semibold text-emerald-700 mb-0.5">💶 Setup: {pb.totalCost}</div>
          {pb.runningCost && <div className="text-muted-foreground text-[10px]">🔁 {pb.runningCost}</div>}
        </div>
      )}
      <div className="flex items-center gap-2 mt-auto">
        <Button
          onClick={handleStartClick}
          disabled={isStarting}
          size="sm"
          className="rounded-full gap-1.5"
        >
          {isStarting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <>Guide starten <ArrowRight className="h-3.5 w-3.5" /></>}
        </Button>
      </div>
    </div>
  );
};
