import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getPlaybook, type PlaybookStep } from "@/data/playbooks";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2, Circle, ChevronLeft, ExternalLink,
  AlertTriangle, Clock, Trophy, Loader2,
  ClipboardList, FileText, Info, Lightbulb, Sparkles, Zap,
} from "lucide-react";
import { CompanyNameCheck, NotarFinder } from "@/components/playbook/StepWidgets";
import { NotarPreparation } from "@/components/playbook/NotarPreparation";
import { BankComparison } from "@/components/playbook/BankComparison";
import { GewA1Form } from "@/components/playbook/GewA1Form";
import { FamiliengerichtForm } from "@/components/playbook/FamiliengerichtForm";

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
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [notes, setNotes] = useState("");
  // Geteilter Run-Kontext (cross-step shared values wie company_name).
  const [runCtx, setRunCtx] = useState<Record<string, any>>({});
  const ctxSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Ref auf den aktiven Step-Container — beim Step-Wechsel wird dieser in den Viewport gescrollt.
  const activeStepRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { if (!authLoading && !user) navigate("/auth"); }, [user, authLoading, navigate]);

  // Guard gegen Doppel-Insert wenn useEffect mehrfach re-rendert (z.B. auth flicker).
  const initInFlight = useRef(false);
  useEffect(() => {
    if (!runId || !user) return;
    if (initInFlight.current) return;
    initInFlight.current = true;
    (async () => {
      // Falls runId KEIN UUID-Format ist → wahrscheinlich ein Playbook-Slug (z.B. /playbook/marke-anmelden).
      // Dann existierenden Run für diesen Slug suchen ODER neu anlegen.
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(runId);
      if (!isUuid) {
        const slug = runId;
        if (!getPlaybook(slug)) {
          navigate("/playbooks");
          return;
        }
        // Existing run für slug + user finden
        const { data: existing } = await supabase
          .from("playbook_runs")
          .select("id")
          .eq("user_id", user.id)
          .eq("playbook_slug", slug)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (existing) {
          navigate(`/playbook/${existing.id}`, { replace: true });
          return;
        }
        // Sonst neu anlegen
        const { data: created, error } = await supabase
          .from("playbook_runs")
          .insert({ user_id: user.id, playbook_slug: slug, title: getPlaybook(slug)!.title, total_steps: getPlaybook(slug)!.steps.length, current_step: 0, context: {} })
          .select("id")
          .single();
        if (error || !created) {
          navigate("/playbooks");
          return;
        }
        navigate(`/playbook/${created.id}`, { replace: true });
        return;
      }

      const { data: r } = await supabase.from("playbook_runs").select("*").eq("id", runId).maybeSingle();
      if (!r) { navigate("/dashboard"); return; }
      setRun(r as RunRow);
      setActiveIndex(r.current_step);
      const { data: s } = await supabase.from("playbook_step_progress").select("*").eq("run_id", runId);
      const map: Record<number, StepRow> = {};
      (s ?? []).forEach((row: any) => { map[row.step_index] = row; });
      setSteps(map);

      // runCtx hydraten: aus run.context, fallback auf step "name" data.
      const initialCtx: Record<string, any> = { ...((r.context ?? {}) as Record<string, any>) };
      if (!initialCtx.company_name) {
        const nameRow = Object.values(map).find((row: any) => row.step_slug === "name");
        if ((nameRow as any)?.data?.company_name) {
          initialCtx.company_name = (nameRow as any).data.company_name;
        }
      }
      setRunCtx(initialCtx);

      setLoading(false);
    })().finally(() => {
      initInFlight.current = false;
    });
  }, [runId, user, navigate]);

  const slug = (run as any)?.playbook_slug as string | undefined;
  const pb = slug ? getPlaybook(slug) : null;

  useEffect(() => {
    const cur = steps[activeIndex];
    setFormData(cur?.data ?? {});
    setNotes(cur?.notes ?? "");
  }, [activeIndex, steps]);

  // Beim Step-Wechsel: scrolle den aktiven Step-Container in den Viewport (Anfang des Steps),
  // damit der User nach 'Step erledigt'-Klick nicht in der Mitte des nächsten Schritts landet.
  // - Sticky-Header (h-14 = 56px) + Puffer 16px → -72px offset
  // - smooth-scroll für nicht-ruckige UX
  useEffect(() => {
    if (!activeStepRef.current) return;
    const HEADER_OFFSET = 72;
    const rect = activeStepRef.current.getBoundingClientRect();
    const targetY = rect.top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, [activeIndex]);

  // Geteilte Run-Kontext-Updates mit 500ms-Debounce (DB-Write).
  const updateRunCtx = (patch: Record<string, any>) => {
    const next = { ...runCtx, ...patch };
    setRunCtx(next);
    if (!run) return;
    if (ctxSaveTimer.current) clearTimeout(ctxSaveTimer.current);
    ctxSaveTimer.current = setTimeout(async () => {
      await supabase.from("playbook_runs").update({ context: next }).eq("id", run.id);
    }, 500);
  };

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
  const missingRequired = getMissingRequired(step, formData, runCtx);

  // Verbleibende Zeit (Summe estMinutes der noch nicht erledigten Schritte)
  const remainingMinutes = pb.steps.reduce((sum, s, i) => {
    if (steps[i]?.status === "done") return sum;
    return sum + (s.estMinutes ?? 0);
  }, 0);
  const remainingHrs = Math.floor(remainingMinutes / 60);
  const remainingMins = remainingMinutes % 60;
  const remainingLabel = remainingHrs > 0 ? `${remainingHrs} h ${remainingMins} min` : `${remainingMins} min`;

  // Meilensteine: 25/50/75/100 %
  const milestones = [25, 50, 75, 100];

  const saveStep = async (status: "pending" | "done") => {
    if (!user) return;
    if (status === "done" && missingRequired.length > 0) return;
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
    } else if (status === "done") {
      setActiveIndex(newCurrent);
    }
    setSaving(false);
  };

  return (
    <CockpitShell
      eyebrow={`${pb.emoji} Playbook`}
      title={pb.title}
      subtitle={pb.outcome}
    >
      {/* GAMIFIED HERO PROGRESS */}
      <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-accent-blue/5 p-6 md:p-8 mb-6">
        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent-blue mb-1">{pb.emoji} {pb.difficulty} · {pb.duration}</div>
            <div className="text-3xl md:text-4xl font-bold leading-none">
              {progress === 100 ? (
                <span className="inline-flex items-center gap-2"><Trophy className="h-8 w-8 text-yellow-500" /> Geschafft!</span>
              ) : (
                <>{completedCount} <span className="text-muted-foreground/50 text-2xl">/ {pb.steps.length}</span></>
              )}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {progress === 100
                ? "Du hast alle Schritte abgeschlossen."
                : <>Schritt {activeIndex + 1} aktiv · noch <strong>{remainingLabel}</strong> · {progress} %</>}
            </div>
            {(pb.totalCost || pb.runningCost) && (
              <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                {pb.totalCost && (
                  <div className="rounded-full bg-emerald-500/10 text-emerald-700 px-3 py-1 font-semibold">
                    💶 Setup: {pb.totalCost}
                  </div>
                )}
                {pb.runningCost && (
                  <div className="rounded-full bg-secondary text-muted-foreground px-3 py-1">
                    🔁 {pb.runningCost}
                  </div>
                )}
              </div>
            )}
          </div>

          {progress < 100 && (
            <div className="flex items-center gap-1.5 rounded-xl bg-accent-blue/10 text-accent-blue px-3 py-2 shrink-0">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-bold">{completedCount * 100} XP</span>
            </div>
          )}
        </div>

        {/* Progress-Bar mit Meilensteinen */}
        <div className="relative h-3 rounded-full bg-secondary overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-accent-blue to-yellow-400 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
          {milestones.map((m) => (
            <div
              key={m}
              className={`absolute top-0 h-full w-px ${progress >= m ? "bg-yellow-300/60" : "bg-border"}`}
              style={{ left: `${m}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span className={progress >= 25 ? "text-accent-blue font-semibold" : ""}>25 %</span>
          <span className={progress >= 50 ? "text-accent-blue font-semibold" : ""}>50 %</span>
          <span className={progress >= 75 ? "text-accent-blue font-semibold" : ""}>75 %</span>
          <span className={progress >= 100 ? "text-success font-bold" : ""}>🏆 100 %</span>
        </div>

        {progress === 100 && (
          <div className="mt-5 rounded-xl bg-success/10 border border-success/30 text-success p-4 flex items-start gap-3">
            <Sparkles className="h-5 w-5 mt-0.5 shrink-0" />
            <div>
              <div className="font-bold">Playbook abgeschlossen!</div>
              <div className="text-sm opacity-90">{pb.outcome}</div>
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Gamified Step-Sidebar */}
        <aside className="rounded-2xl border border-border bg-card p-3 h-fit lg:sticky lg:top-20">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 py-2 flex items-center justify-between">
            <span>Schritte</span>
            <span className="text-accent-blue">{completedCount} / {pb.steps.length}</span>
          </div>
          <div className="space-y-1">
            {pb.steps.map((s, i) => {
              const st = steps[i];
              const done = st?.status === "done";
              const active = i === activeIndex;
              const StepKindIcon = STEP_KIND_ICON[s.kind];
              return (
                <button key={s.slug} onClick={() => setActiveIndex(i)}
                  className={`w-full flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    active ? "bg-accent-blue/10 ring-1 ring-accent-blue/30" : done ? "hover:bg-secondary opacity-70" : "hover:bg-secondary"
                  }`}>
                  <div className="shrink-0 mt-0.5">
                    {done ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : active ? (
                      <div className="h-5 w-5 rounded-full bg-accent-blue text-primary-foreground flex items-center justify-center text-[10px] font-bold">{i + 1}</div>
                    ) : (
                      <div className="h-5 w-5 rounded-full border border-border flex items-center justify-center text-[10px] text-muted-foreground">{i + 1}</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`leading-snug font-medium text-sm ${done ? "line-through text-muted-foreground" : active ? "text-foreground" : ""}`}>
                      {s.title}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5 flex-wrap">
                      <StepKindIcon className="h-2.5 w-2.5" />
                      <span>{STEP_KIND_LABEL[s.kind]} · {s.estMinutes} min</span>
                    </div>
                    {s.estCost && (
                      <div className="mt-1 text-[10px] font-semibold text-emerald-700 leading-snug">
                        💶 {s.estCost.length > 50 ? s.estCost.slice(0, 50) + "…" : s.estCost}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Active step */}
        <div ref={activeStepRef} className="rounded-2xl border border-border bg-card p-6 scroll-mt-20">
          {(() => {
            const ActiveIcon = STEP_KIND_ICON[step.kind];
            return (
              <div className="flex items-start gap-4 mb-4">
                <div className="rounded-xl bg-accent-blue/10 text-accent-blue p-3 shrink-0">
                  <ActiveIcon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="text-xs font-bold uppercase tracking-wider text-accent-blue">
                      Schritt {activeIndex + 1} von {pb.steps.length} · {STEP_KIND_LABEL[step.kind]}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> ~{step.estMinutes} min
                      </div>
                      {step.estCost && (
                        <div className="text-xs font-semibold inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5">
                          💶 {step.estCost.length > 30 ? step.estCost.split("·")[0].trim() : step.estCost}
                        </div>
                      )}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mt-1 leading-tight">{step.title}</h2>
                </div>
              </div>
            );
          })()}
          <p className="text-muted-foreground mb-3 leading-relaxed">{step.description}</p>

          {step.slug === "shopify-account" && step.externalLinks?.[0] && (
            <a
              href={step.externalLinks[0].url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-blue text-white hover:bg-accent-blue/90 px-5 py-3 text-sm font-semibold w-full sm:w-auto mb-5 transition-colors shadow-card"
            >
              {step.externalLinks[0].label} <ExternalLink className="h-4 w-4" />
            </a>
          )}

          {step.estCost && step.estCost.length > 30 && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 mb-5 text-xs leading-relaxed">
              <span className="font-semibold text-emerald-700">Geschätzte Kosten:</span>{" "}
              <span className="text-muted-foreground">{step.estCost}</span>
            </div>
          )}

          {step.warning && (
            <div className="flex items-start gap-2 rounded-xl bg-destructive/10 text-destructive p-3 mb-5 text-sm">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{step.warning}</span>
            </div>
          )}

          <StepBody step={step} formData={formData} setFormData={setFormData} allSteps={steps} pb={pb} runCtx={runCtx} updateRunCtx={updateRunCtx} />

          <div className="mt-5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Deine Notizen</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-2" rows={3} placeholder="Anmerkungen, Ansprechpartner, Folge-Termine..." />
          </div>

          <div className="mt-6 space-y-2">
            {missingRequired.length > 0 && (
              <div className="flex items-start gap-2 rounded-lg bg-warning/10 border border-warning/30 text-warning-foreground p-3 text-xs">
                <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <div>
                  <strong>Pflichtfelder fehlen:</strong> {missingRequired.join(", ")}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-3 justify-between">
              <Button variant="outline" onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Zurück
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => saveStep("pending")} disabled={saving}>
                  Speichern
                </Button>
                <Button
                  onClick={() => saveStep("done")}
                  disabled={saving || missingRequired.length > 0}
                  className="bg-success hover:bg-success/90 text-success-foreground"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <CheckCircle2 className="h-4 w-4 mr-1" />}
                  Schritt erledigt
                </Button>
              </div>
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

const StepBody = ({
  step,
  formData,
  setFormData,
  allSteps: _allSteps,
  pb: _pb,
  runCtx,
  updateRunCtx,
}: {
  step: PlaybookStep;
  formData: Record<string, any>;
  setFormData: (v: Record<string, any>) => void;
  allSteps: Record<number, StepRow>;
  pb: ReturnType<typeof getPlaybook>;
  runCtx: Record<string, any>;
  updateRunCtx: (patch: Record<string, any>) => void;
}) => {
  const sharedCompanyName = runCtx.company_name ?? formData.company_name ?? "";
  return (
  <div className="space-y-4">
    {step.slug === "name" && (
      <CompanyNameCheck
        initial={sharedCompanyName}
        onPick={(v) => {
          setFormData({ ...formData, company_name: v });
          updateRunCtx({ company_name: v });
        }}
      />
    )}
    {step.slug === "notar" && (
      <NotarFinder companyName={sharedCompanyName} />
    )}
    {step.slug === "satzung" && (
      <NotarPreparation
        answers={formData}
        setAnswers={setFormData}
        companyName={sharedCompanyName}
        onCompanyNameChange={(v) => updateRunCtx({ company_name: v })}
      />
    )}
    {step.slug === "konto" && <BankComparison />}
    {step.slug === "gewa1-pdf" && (
      <GewA1Form answers={formData} setAnswers={setFormData} />
    )}
    {step.slug === "familiengericht" && (
      <FamiliengerichtForm answers={formData} setAnswers={setFormData} />
    )}
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
    {step.extendedNotes && step.extendedNotes.length > 0 && (
      <div className="rounded-xl border border-accent-blue/20 bg-accent-blue/5 p-4 space-y-1.5">
        <div className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-1">
          Detail-Hinweise & Pro-Tipps
        </div>
        <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
          {step.extendedNotes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </div>
    )}
    {step.externalLinks && (() => {
      const links = step.slug === "shopify-account" ? step.externalLinks.slice(1) : step.externalLinks;
      if (links.length === 0) return null;
      return (
        <div className="grid sm:grid-cols-2 gap-2">
          {links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-between gap-2 rounded-xl border border-border bg-card hover:border-accent-blue/40 px-4 py-3 text-sm font-semibold transition-colors">
              {l.label} <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
        </div>
      );
    })()}
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
};

/** Icon pro Step-Kind für die Sidebar-Visualisierung */
const STEP_KIND_ICON: Record<string, typeof FileText> = {
  form: FileText,
  checklist: ClipboardList,
  external: ExternalLink,
  info: Info,
  decision: Lightbulb,
};
const STEP_KIND_LABEL: Record<string, string> = {
  form: "Eingabe",
  checklist: "Checkliste",
  external: "Extern",
  info: "Info",
  decision: "Entscheidung",
};

/**
 * Bestimmt, welche Pflichtfelder im aktuellen Step noch leer sind.
 * Steps ohne Pflichtfelder (info / external / checklist / Vergleichs-Widgets)
 * geben immer [] zurück → Button bleibt aktiv.
 */
function getMissingRequired(
  step: PlaybookStep,
  formData: Record<string, any>,
  runCtx: Record<string, any>,
): string[] {
  const missing: string[] = [];
  const isEmpty = (v: any) => v === undefined || v === null || String(v).trim() === "";

  // Step "name" (Firmenname-Eingabe in jedem Playbook)
  if (step.slug === "name") {
    if (isEmpty(runCtx.company_name) && isEmpty(formData.company_name)) {
      missing.push("Firmenname");
    }
    return missing;
  }

  // Step "satzung" / Notar-Vorbereitung
  if (step.slug === "satzung") {
    if (isEmpty(runCtx.company_name) && isEmpty(formData.firmenname)) missing.push("Firmenname");
    if (isEmpty(formData.firmensitzStadt)) missing.push("Firmensitz (Stadt)");
    if (isEmpty(formData.firmensitzAdresse)) missing.push("Geschäftsadresse");
    if (isEmpty(formData.gegenstand)) missing.push("Unternehmensgegenstand");
    return missing;
  }

  // Generische Felder im Step (alle als Pflicht behandelt)
  if (step.fields) {
    for (const f of step.fields) {
      if (isEmpty(formData[f.name])) missing.push(f.label);
    }
  }

  return missing;
}

export default PlaybookRun;
