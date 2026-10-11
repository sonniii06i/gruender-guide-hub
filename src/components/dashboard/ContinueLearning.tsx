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
    <section>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight md:text-xl">Deine laufenden Guides</h2>
          <p className="mt-1 text-sm text-muted-foreground">Da weitermachen, wo du aufgehört hast.</p>
        </div>
        <Link to="/playbooks" className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline">
          Alle anzeigen <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {runs.map((r) => {
          const pb = getPlaybook(r.playbook_slug);
          const pct = Math.min(100, Math.round((r.current_step / Math.max(1, r.total_steps)) * 100));
          return (
            <Link
              key={r.id}
              to={`/playbook/${r.id}`}
              className="press group rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-xl" aria-hidden="true">
                  {pb?.emoji ?? "📘"}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm truncate">{r.title}</h3>
                  <p className="text-xs text-muted-foreground tabular">{r.current_step} von {r.total_steps} Schritten</p>
                </div>
                <PlayCircle className="h-5 w-5 shrink-0 text-accent-blue transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Fortschritt">
                <div className="h-full rounded-full bg-accent-blue transition-[width] duration-500" style={{ width: `${pct}%` }} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
