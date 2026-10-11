import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getPlaybook, type PlaybookStep } from "@/data/playbooks";
import { useGuideDetail, mergeStepDetail } from "@/hooks/useGuideDetail";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Callout, Field, ToneBadge } from "@/components/cockpit/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  CheckCircle2, Circle, ChevronLeft, ExternalLink,
  AlertTriangle, Clock, Trophy, Loader2,
  ClipboardList, FileText, Info, Lightbulb, Sparkles, Zap,
  Wallet, Repeat, Check,
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
      // Step-Daten über die guide-data-Edge-Function laden (entschlüsselt server-seitig).
      const { data: loadRes } = await supabase.functions.invoke("guide-data", {
        body: { action: "load", run_id: runId },
      });
      const s = (loadRes?.rows ?? []) as any[];
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
  // Bezahlte Step-Details (Checklisten, Felder, Links, Warnungen, Tipps) liegen
  // nicht im Bundle — server-seitig (Abo-gegated) nachladen.
  const { detail, loading: detailLoading } = useGuideDetail(slug);

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
      <div className="container max-w-6xl px-4 pb-16 pt-8 md:px-6 md:pt-10" aria-busy="true">
        <p className="sr-only" role="status">Playbook wird geladen…</p>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-3 h-9 w-2/3 max-w-md" />
        <Skeleton className="mt-3 h-4 w-full max-w-xl" />
        <Skeleton className="mt-8 h-40 w-full rounded-2xl" />
        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <Skeleton className="h-80 w-full rounded-2xl" />
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  const step = mergeStepDetail(pb.steps[activeIndex], detail);
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
    // Sensible Step-Daten (data + notes) gehen verschlüsselt über die
    // guide-data-Edge-Function (Server-Key), nicht direkt in die DB.
    await supabase.functions.invoke("guide-data", {
      body: {
        action: "save",
        run_id: run.id,
        step_index: activeIndex,
        step_slug: step.slug,
        status,
        data: formData,
        notes,
        completed_at: payload.completed_at,
      },
    });
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


  const fertig = progress === 100;
  const ActiveIcon = STEP_KIND_ICON[step.kind];

  return (
    <CockpitShell
      eyebrow="Playbook"
      title={pb.title}
      subtitle={pb.outcome}
    >
      {/* Fortschritt */}
      <section className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6" aria-label="Fortschritt">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">
              {pb.difficulty} · {pb.duration}
            </p>
            <div className="mt-1 text-3xl font-semibold tracking-tight tabular md:text-4xl">
              {fertig ? (
                <span className="inline-flex items-center gap-2">
                  <Trophy className="h-7 w-7 text-success" aria-hidden="true" /> Geschafft!
                </span>
              ) : (
                <>
                  {completedCount} <span className="text-2xl font-normal text-muted-foreground">von {pb.steps.length} Schritten</span>
                </>
              )}
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {fertig
                ? "Du hast alle Schritte abgeschlossen."
                : <>Schritt {activeIndex + 1} aktiv · noch <strong className="font-semibold text-foreground">{remainingLabel}</strong> · <span className="tabular">{progress} %</span></>}
            </p>
            {(pb.totalCost || pb.runningCost) && (
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {pb.totalCost && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-2.5 py-1 font-medium">
                    <Wallet className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" /> Setup: {pb.totalCost}
                  </span>
                )}
                {pb.runningCost && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-muted-foreground">
                    <Repeat className="h-3.5 w-3.5" aria-hidden="true" /> {pb.runningCost}
                  </span>
                )}
              </div>
            )}
          </div>

          {!fertig && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-blue tabular">
              <Zap className="h-4 w-4" aria-hidden="true" /> {completedCount * 100} XP
            </span>
          )}
        </div>

        {/* Progress-Bar mit Meilensteinen */}
        <div
          className="relative mt-5 h-2.5 overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Fortschritt im Playbook"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-blue to-brand-green transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
          {milestones.map((m) => (
            <div
              key={m}
              className={cn("absolute top-0 h-full w-px", progress >= m ? "bg-white/50" : "bg-border")}
              style={{ left: `${m}%` }}
            />
          ))}
        </div>
        <div className="relative mt-2 h-4 text-xs text-muted-foreground tabular">
          {milestones.map((m) => (
            <span
              key={m}
              className={cn(
                "absolute top-0 whitespace-nowrap",
                m === 100 ? "right-0" : "-translate-x-1/2",
                progress >= m && (m === 100 ? "font-semibold text-success" : "font-medium text-accent-blue"),
              )}
              style={m === 100 ? undefined : { left: `${m}%` }}
            >
              {m} %
            </span>
          ))}
        </div>

        {fertig && (
          <Callout tone="success" title="Playbook abgeschlossen!" icon={Sparkles} className="mt-5">
            {pb.outcome}
          </Callout>
        )}
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* Schrittliste */}
        <aside className="order-2 rounded-2xl border border-border bg-card p-3 shadow-card lg:order-1 lg:sticky lg:top-20">
          <div className="flex items-center justify-between px-3 py-2 text-sm">
            <span className="font-semibold">Schritte</span>
            <span className="text-muted-foreground tabular">{completedCount} / {pb.steps.length}</span>
          </div>
          <ol className="space-y-0.5">
            {pb.steps.map((s, i) => {
              const st = steps[i];
              const done = st?.status === "done";
              const active = i === activeIndex;
              const StepKindIcon = STEP_KIND_ICON[s.kind];
              return (
                <li key={s.slug}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-current={active ? "step" : undefined}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      active ? "bg-accent" : "hover:bg-secondary",
                    )}
                  >
                    <span className="mt-0.5 shrink-0">
                      {done ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-primary-foreground">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                      ) : active ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-blue text-[11px] font-semibold text-primary-foreground tabular">{i + 1}</span>
                      ) : (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-[11px] text-muted-foreground tabular">{i + 1}</span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block font-medium leading-snug", done && "text-muted-foreground line-through decoration-muted-foreground/50")}>
                        {s.title}
                      </span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                        <StepKindIcon className="h-3 w-3" aria-hidden="true" />
                        {STEP_KIND_LABEL[s.kind]} · <span className="tabular">{s.estMinutes} min</span>
                      </span>
                      {s.estCost && (
                        <span className="mt-1 flex items-start gap-1 text-xs leading-snug text-foreground/75">
                          <Wallet className="mt-px h-3 w-3 shrink-0 text-accent-blue" aria-hidden="true" />
                          {s.estCost.length > 50 ? s.estCost.slice(0, 50) + "…" : s.estCost}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Aktiver Schritt */}
        <section ref={activeStepRef} className="order-1 min-w-0 scroll-mt-20 lg:order-2 rounded-2xl border border-border bg-card shadow-card">
          <header className="flex items-start gap-4 border-b border-border/70 p-5 md:p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-blue">
              <ActiveIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                <p className="text-sm font-medium text-accent-blue">
                  Schritt {activeIndex + 1} von {pb.steps.length} · {STEP_KIND_LABEL[step.kind]}
                </p>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground tabular">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> ~{step.estMinutes} min
                  </span>
                  {step.estCost && (
                    <ToneBadge tone="neutral">
                      <Wallet className="h-3 w-3" aria-hidden="true" />
                      {step.estCost.length > 30 ? step.estCost.split("·")[0].trim() : step.estCost}
                    </ToneBadge>
                  )}
                </div>
              </div>
              <h2 className="mt-1 text-xl font-semibold leading-tight tracking-tight md:text-2xl">{step.title}</h2>
            </div>
          </header>

          <div className="space-y-5 p-5 md:p-6">
            <p className="leading-relaxed text-muted-foreground">{step.description}</p>

            {step.slug === "shopify-account" && step.externalLinks?.[0] && (
              <a
                href={step.externalLinks[0].url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-card transition-opacity hover:opacity-95 sm:w-auto"
              >
                {step.externalLinks[0].label} <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}

            {step.estCost && step.estCost.length > 30 && (
              <Callout tone="neutral" title="Geschätzte Kosten" icon={Wallet}>
                {step.estCost}
              </Callout>
            )}

            {step.warning && (
              <Callout tone="danger" icon={AlertTriangle}>
                {step.warning}
              </Callout>
            )}

            {detailLoading ? (
              <div className="space-y-3 rounded-xl border border-border p-4" aria-busy="true">
                <p className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
                  <Loader2 className="h-4 w-4 animate-spin text-accent-blue" aria-hidden="true" /> Detailschritte werden geladen…
                </p>
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ) : (
              <StepBody step={step} formData={formData} setFormData={setFormData} allSteps={steps} pb={pb} runCtx={runCtx} updateRunCtx={updateRunCtx} />
            )}

            <Field label="Deine Notizen" htmlFor="pb-notizen">
              <Textarea
                id="pb-notizen"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Anmerkungen, Ansprechpartner, Folge-Termine …"
              />
            </Field>
          </div>

          <footer className="space-y-3 border-t border-border/70 p-5 md:p-6">
            {missingRequired.length > 0 && (
              <Callout tone="warning" title="Pflichtfelder fehlen">
                {missingRequired.join(", ")}
              </Callout>
            )}
            <div className="flex flex-wrap justify-between gap-3">
              <Button variant="outline" onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0}>
                <ChevronLeft aria-hidden="true" /> Zurück
              </Button>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => saveStep("pending")} disabled={saving}>
                  Speichern
                </Button>
                <Button
                  onClick={() => saveStep("done")}
                  disabled={saving || detailLoading || missingRequired.length > 0}
                  className="bg-success text-success-foreground hover:bg-success/90"
                >
                  {saving ? <Loader2 className="animate-spin" aria-hidden="true" /> : <CheckCircle2 aria-hidden="true" />}
                  Schritt erledigt
                </Button>
              </div>
            </div>
          </footer>
        </section>
      </div>

      <div className="mt-6">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Zurück zum Cockpit
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
  <div className="space-y-5">
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
      <div className="rounded-xl border border-border">
        <p className="border-b border-border/70 px-4 py-3 text-sm font-semibold">Checkliste</p>
        <ul className="divide-y divide-border/70">
          {step.checklist.map((c, i) => {
            const checked = formData[`chk_${i}`] === "1";
            return (
              <li key={i}>
                <button
                  type="button"
                  aria-pressed={checked}
                  onClick={() => setFormData({ ...formData, [`chk_${i}`]: checked ? "" : "1" })}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/50"
                >
                  {checked
                    ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
                  <span className={cn("text-sm", checked && "text-muted-foreground line-through decoration-muted-foreground/50")}>{c}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    )}
    {step.extendedNotes && step.extendedNotes.length > 0 && (
      <Callout tone="accent" title="Detail-Hinweise und Profi-Tipps" icon={Lightbulb}>
        <ul className="list-disc space-y-1.5 pl-4">
          {step.extendedNotes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </Callout>
    )}
    {step.externalLinks && (() => {
      const links = step.slug === "shopify-account" ? step.externalLinks.slice(1) : step.externalLinks;
      if (links.length === 0) return null;
      return (
        <div className="grid gap-2 sm:grid-cols-2">
          {links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
              className="group inline-flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-accent-blue/40">
              {l.label} <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-accent-blue" aria-hidden="true" />
            </a>
          ))}
        </div>
      );
    })()}
    {step.fields && (
      <div className="grid gap-4 sm:grid-cols-2">
        {step.fields.map((f) => (
          <Field key={f.name} label={f.label} htmlFor={`pb-f-${f.name}`} className={f.type === "textarea" ? "sm:col-span-2" : undefined}>
            {f.type === "textarea" ? (
              <Textarea id={`pb-f-${f.name}`} value={formData[f.name] ?? ""} onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })} rows={3} />
            ) : (
              <Input id={`pb-f-${f.name}`} type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                value={formData[f.name] ?? ""}
                onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })} />
            )}
          </Field>
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
