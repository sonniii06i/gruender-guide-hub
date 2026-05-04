import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getPlaybook, type PlaybookStep } from "@/data/playbooks";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  CheckCircle2, Circle, ChevronRight, ChevronLeft, ExternalLink,
  AlertTriangle, Clock, Trophy, Loader2,
} from "lucide-react";

interface RunRow { id: string; current_step: number; status: string; total_steps: number; context: any }
interface StepRow { step_index: number; status: string; data: any; notes: string | null }

const PlaybookRun = () => {
  const { runId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [run, setRun] = useState<RunRow | null>(null);
  const [steps, setSteps] = useState<Record<number, StepRow>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");

  useEffect(() => { if (!authLoading && !user) navigate("/auth"); }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!runId || !user) return;
    (async () => {
      const { data: r } = await supabase.from("playbook_runs").select("*").eq("id", runId).maybeSingle();
      if (!r) { navigate("/dashboard"); return; }
      setRun(r as RunRow);
      setActiveIndex(r.current_step);
      const { data: s } = await supabase.from("playbook_step_progress").select("*").eq("run_id", runId);
      const map: Record<number, StepRow> = {};
      (s ?? []).forEach((row: any) => { map[row.step_index] = row; });
      setSteps(map);
      setLoading(false);
    })();
  }, [runId, user, navigate]);

  const slug = (run as any)?.playbook_slug as string | undefined;
  const pb = slug ? getPlaybook(slug) : null;

  useEffect(() => {
    const cur = steps[activeIndex];
    setFormData(cur?.data ?? {});
    setNotes(cur?.notes ?? "");
  }, [activeIndex, steps]);

  if (loading || authLoading || !pb || !run) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent-blue" />
      </div>
    );
  }

  const step = pb.steps[activeIndex];
  const completedCount = Object.values(steps).filter((s) => s.status === "done").length;
  const progress = Math.round((completedCount / pb.steps.length) * 100);

  const saveStep = async (status: "pending" | "done") => {
    if (!user) return;
    setSaving(true);
    const existing = steps[activeIndex];
    const payload = {
      run_id: run.id,
      user_id: user.id,
      step_index: activeIndex,
      step_slug: step.slug,
      status,
      data: formData,
      notes,
      completed_at: status === "done" ? new Date().toISOString() : null,
    };
    if (existing) {
      await supabase.from("playbook_step_progress").update(payload).eq("run_id", run.id).eq("step_index", activeIndex);
    } else {
      await supabase.from("playbook_step_progress").insert(payload);
    }
    const newSteps = { ...steps, [activeIndex]: { ...payload } as any };
    setSteps(newSteps);

    const newCompleted = Object.values(newSteps).filter((s: any) => s.status === "done").length;
    const isComplete = newCompleted === pb.steps.length;
    const newCurrent = status === "done" ? Math.min(activeIndex + 1, pb.steps.length - 1) : run.current_step;

    await supabase.from("playbook_runs").update({
      current_step: newCurrent,
      last_activity_at: new Date().toISOString(),
      status: isComplete ? "completed" : "in_progress",
      completed_at: isComplete ? new Date().toISOString() : null,
    }).eq("id", run.id);

    if (isComplete) {
      await supabase.from("notifications").insert({
        user_id: user.id, kind: "success",
        title: `🎉 ${pb.title} abgeschlossen!`,
        body: pb.outcome, link: "/dashboard",
      });
      toast.success(`Geschafft – ${pb.title} ist erledigt!`);
    } else if (status === "done") {
      toast.success("Schritt erledigt");
      setActiveIndex(newCurrent);
    } else {
      toast.success("Gespeichert");
    }
    setSaving(false);
  };

  return (
    <CockpitShell
      eyebrow={`${pb.emoji} Playbook`}
      title={pb.title}
      subtitle={pb.outcome}
    >
      {/* Progress bar */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold">Fortschritt</div>
          <div className="text-sm text-muted-foreground">{completedCount} von {pb.steps.length} ({progress} %)</div>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full bg-gradient-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
        {progress === 100 && (
          <div className="mt-4 flex items-center gap-2 text-success font-semibold text-sm">
            <Trophy className="h-4 w-4" /> Playbook abgeschlossen.
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Steps list */}
        <aside className="rounded-2xl border border-border bg-card p-3 h-fit lg:sticky lg:top-20">
          <div className="space-y-1">
            {pb.steps.map((s, i) => {
              const st = steps[i];
              const done = st?.status === "done";
              const active = i === activeIndex;
              return (
                <button key={s.slug} onClick={() => setActiveIndex(i)}
                  className={`w-full flex items-start gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    active ? "bg-accent text-accent-foreground" : "hover:bg-secondary"
                  }`}>
                  {done ? <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" /> : <Circle className={`h-4 w-4 mt-0.5 shrink-0 ${active ? "text-accent-blue" : "text-muted-foreground"}`} />}
                  <span className="flex-1 leading-snug">
                    <span className="text-[10px] font-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="block font-medium">{s.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Active step */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start justify-between mb-3 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-1">
                Schritt {activeIndex + 1} von {pb.steps.length}
              </div>
              <h2 className="text-2xl font-bold">{step.title}</h2>
            </div>
            <div className="text-xs text-muted-foreground inline-flex items-center gap-1 shrink-0">
              <Clock className="h-3.5 w-3.5" /> ~{step.estMinutes} min
            </div>
          </div>
          <p className="text-muted-foreground mb-5 leading-relaxed">{step.description}</p>

          {step.warning && (
            <div className="flex items-start gap-2 rounded-xl bg-destructive/10 text-destructive p-3 mb-5 text-sm">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{step.warning}</span>
            </div>
          )}

          <StepBody step={step} formData={formData} setFormData={setFormData} />

          <div className="mt-5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Deine Notizen</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-2" rows={3} placeholder="Anmerkungen, Ansprechpartner, Folge-Termine..." />
          </div>

          <div className="flex flex-wrap gap-3 mt-6 justify-between">
            <Button variant="outline" onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Zurück
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => saveStep("pending")} disabled={saving}>
                Speichern
              </Button>
              <Button onClick={() => saveStep("done")} disabled={saving} className="bg-success hover:bg-success/90 text-success-foreground">
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <CheckCircle2 className="h-4 w-4 mr-1" />}
                Schritt erledigt
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center">
          <ChevronLeft className="h-4 w-4" /> Zurück zum Cockpit
        </Link>
      </div>
    </CockpitShell>
  );
};

const StepBody = ({ step, formData, setFormData }: { step: PlaybookStep; formData: Record<string, string>; setFormData: (v: Record<string, string>) => void }) => (
  <div className="space-y-4">
    {step.checklist && (
      <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-2">
        {step.checklist.map((c, i) => {
          const checked = formData[`chk_${i}`] === "1";
          return (
            <button key={i} type="button"
              onClick={() => setFormData({ ...formData, [`chk_${i}`]: checked ? "" : "1" })}
              className="flex items-start gap-2 w-full text-left">
              {checked ? <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" /> : <Circle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />}
              <span className={`text-sm ${checked ? "line-through text-muted-foreground" : ""}`}>{c}</span>
            </button>
          );
        })}
      </div>
    )}
    {step.externalLinks && (
      <div className="grid sm:grid-cols-2 gap-2">
        {step.externalLinks.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-between gap-2 rounded-xl border border-border bg-card hover:border-accent-blue/40 px-4 py-3 text-sm font-semibold transition-colors">
            {l.label} <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        ))}
      </div>
    )}
    {step.fields && (
      <div className="grid sm:grid-cols-2 gap-3">
        {step.fields.map((f) => (
          <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</Label>
            {f.type === "textarea" ? (
              <Textarea value={formData[f.name] ?? ""} onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })} className="mt-2" rows={3} />
            ) : (
              <Input type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                value={formData[f.name] ?? ""}
                onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                className="mt-2" />
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default PlaybookRun;
