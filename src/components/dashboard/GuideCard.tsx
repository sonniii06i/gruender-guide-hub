import { Button } from "@/components/ui/button";
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
  const isStarting = starting === pb.slug;
  return (
    <div className="group rounded-2xl border border-border bg-card p-5 hover:border-accent-blue/40 hover:shadow-soft transition-all flex flex-col">
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
      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-4">
        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {pb.duration}</span>
        <span className="inline-flex items-center gap-1"><ListChecks className="h-3 w-3" /> {pb.steps.length} Schritte</span>
      </div>
      <Button
        onClick={() => start(pb.slug)}
        disabled={isStarting}
        size="sm"
        className="rounded-full self-start gap-1.5 mt-auto"
      >
        {isStarting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <>Guide starten <ArrowRight className="h-3.5 w-3.5" /></>}
      </Button>
    </div>
  );
};
