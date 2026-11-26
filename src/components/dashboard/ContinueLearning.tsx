import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getPlaybook } from "@/data/playbooks";
import { getCourseTheme } from "@/components/CourseCoverCard";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface Run {
  id: string;
  playbook_slug: string;
  title: string;
  current_step: number;
  total_steps: number;
  last_activity_at: string;
}

export const ContinueLearning = ({ compact = false }: { compact?: boolean }) => {
  const { user } = useAuth();
  const [runs, setRuns] = useState<Run[] | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("playbook_runs")
      .select("id, playbook_slug, title, current_step, total_steps, last_activity_at")
      .eq("user_id", user.id)
      .neq("status", "completed")
      .order("last_activity_at", { ascending: false })
      .limit(3)
      .then(({ data }) => setRuns(Array.isArray(data) ? (data as Run[]) : []));
  }, [user]);

  if (!runs || runs.length === 0) return null;

  return (
    <section aria-label="Laufende Kurse">
      <div className="mb-3.5 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-base font-bold tracking-tight text-primary md:text-lg">Direkt weiterlernen</h2>
          {!compact && <p className="mt-0.5 text-xs text-muted-foreground">Da weitermachen, wo du zuletzt aufgehört hast.</p>}
        </div>
        <Link to="/playbooks" className="inline-flex items-center gap-1 text-xs font-bold text-accent-blue hover:underline">
          Alle Kurse <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
      <div className={cn("grid gap-3", runs.length === 1 ? "grid-cols-1" : "sm:grid-cols-2")}>
        {runs.map((r) => {
          const pb = getPlaybook(r.playbook_slug);
          const theme = getCourseTheme(r.playbook_slug, r.title);
          const ThemeIcon = theme.icon;
          const total = Math.max(1, pb?.steps.length ?? r.total_steps ?? 1);
          const done = Math.min(total, Math.max(0, r.current_step));
          const pct = Math.min(100, Math.round((done / total) * 100));
          return (
            <Link
              key={r.id}
              to={`/playbook/${r.id}`}
              className="press group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-card transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", theme.bandBg, theme.pillText)}>
                  <ThemeIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-[11px] font-semibold", theme.pillText)}>{theme.label}</p>
                  <h3 className="mt-0.5 line-clamp-1 text-sm font-bold text-primary group-hover:text-accent-blue">
                    {r.title}
                  </h3>
                </div>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-primary text-white transition-transform group-hover:translate-x-0.5">
                  <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                </span>
              </div>

              <div className="mt-3.5">
                <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold tabular">
                  <span className="text-muted-foreground">
                    Lektion {Math.min(done + 1, total)} von {total}
                  </span>
                  <span className="text-brand-green">{pct} %</span>
                </div>
                <div
                  className="h-1.5 overflow-hidden rounded-full bg-secondary"
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Fortschritt"
                >
                  <div className="h-full rounded-full bg-brand-green transition-[width] duration-300" style={{ width: `${Math.max(pct, 4)}%` }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
