import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getPlaybook } from "@/data/playbooks";
import { ArrowRight, PlayCircle } from "lucide-react";

interface Run {
  id: string;
  playbook_slug: string;
  title: string;
  current_step: number;
  total_steps: number;
  last_activity_at: string;
}

export const ContinueLearning = () => {
  const { user } = useAuth();
  const [runs, setRuns] = useState<Run[] | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("playbook_runs")
      .select("id, playbook_slug, title, current_step, total_steps, last_activity_at")
      .eq("user_id", user.id)
      .neq("status", "completed")
      .order("last_activity_at", { ascending: false })
      .limit(3)
      .then(({ data }) => setRuns((data ?? []) as Run[]));
  }, [user]);

  if (!runs || runs.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-blue mb-1">Weitermachen</p>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Deine laufenden Guides</h2>
        </div>
        <Link to="/playbooks" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          Alle anzeigen <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {runs.map((r) => {
          const pb = getPlaybook(r.playbook_slug);
          const pct = Math.min(100, Math.round((r.current_step / Math.max(1, r.total_steps)) * 100));
          return (
            <Link
              key={r.id}
              to={`/playbook/${r.id}`}
              className="group rounded-2xl border border-border bg-card p-4 hover:border-accent-blue/50 hover:shadow-soft transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-xl shrink-0">
                  {pb?.emoji ?? "📘"}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm truncate">{r.title}</h3>
                  <p className="text-[11px] text-muted-foreground">{r.current_step} / {r.total_steps} Schritte</p>
                </div>
                <PlayCircle className="h-5 w-5 text-accent-blue group-hover:scale-110 transition-transform" />
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-gradient-primary transition-all" style={{ width: `${pct}%` }} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
