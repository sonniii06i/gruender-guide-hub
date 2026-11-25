import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getPlaybook, type PlaybookStep } from "@/data/playbooks";
import { GUIDE_THEMEN } from "@/data/guides";
import { useGuideDetail, mergeStepDetail } from "@/hooks/useGuideDetail";
import { awardStepXp, readGamification, getLevelInfo } from "@/lib/gamification";
import { Callout, Field, ToneBadge } from "@/components/cockpit/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  ClipboardList,
  Clock,
  ExternalLink,
  FileText,
  Flame,
  Info,
  Lightbulb,
  List,
  Loader2,
  MessageSquare,
  NotebookPen,
  Sparkles,
  Trophy,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react";
import { CompanyNameCheck, NotarFinder } from "@/components/playbook/StepWidgets";
import { NotarPreparation } from "@/components/playbook/NotarPreparation";
import { BankComparison } from "@/components/playbook/BankComparison";
import { GewA1Form } from "@/components/playbook/GewA1Form";
import { FamiliengerichtForm } from "@/components/playbook/FamiliengerichtForm";
import { AmexUsReadinessWidget } from "@/components/playbook/AmexUsReadinessWidget";
import { AnbieterLink } from "@/components/PartnerLink";

interface RunRow {
  id: string;
  current_step: number;
  status: string;
  total_steps: number;
  context: Record<string, any>;
}

interface StepRow {
  step_index: number;
  status: string;
  data: Record<string, any>;
  notes: string | null;
  completed_at?: string | null;
}

const STEP_KIND_ICON: Record<string, typeof FileText> = {
  form: FileText,
  checklist: ClipboardList,
  external: ExternalLink,
  info: Info,
  decision: Lightbulb,
};

const STEP_KIND_LABEL: Record<string, string> = {
  form: "Arbeitsfenster",
  checklist: "Checkliste",
  external: "Anmeldung / Portal",
  info: "Kurz erklärt",
  decision: "Entscheidung",
};

function getWorkspaceMeta(guideSlug: string | undefined, step: PlaybookStep): {
  hasWorkspace: boolean;
  label: string;
  subtitle: string;
} {
  if (step.slug === "name") {
    return { hasWorkspace: true, label: "Firmenname direkt prüfen", subtitle: "Name gegen Register & Domains prüfen und für den ganzen Guide speichern." };
  }
  if (step.slug === "notar") {
    return { hasWorkspace: true, label: "Notar-Finder öffnen", subtitle: "Passende Notare in deiner Nähe finden und Termin vorbereiten." };
  }
  if (step.slug === "satzung") {
    return { hasWorkspace: true, label: "Notar-Datenblatt ausfüllen", subtitle: "Alle Eckdaten für den Notartermin strukturiert erfassen." };
  }
  if (step.slug === "konto") {
    return { hasWorkspace: true, label: "Geschäftskonten vergleichen", subtitle: "Passendes Konto nach Rechtsform und Kosten direkt auswählen." };
  }
  if (step.slug === "gewa1-pdf") {
    return { hasWorkspace: true, label: "GewA1-Formular ausfüllen", subtitle: "Daten eingeben und ausgefülltes PDF für das Gewerbeamt erzeugen." };
  }
  if (step.slug === "familiengericht") {
    return { hasWorkspace: true, label: "Antrag Familiengericht (§ 112 BGB)", subtitle: "Vorlage für Eltern & Jugendliche unter 18 direkt bearbeiten." };
  }
  if (guideSlug === "amex-us-beantragen" && (step.slug === "voraussetzungen-check" || step.slug === "us-bankkonto" || step.slug === "global-transfer-antrag")) {
    return { hasWorkspace: true, label: "Amex-US-Startcheck öffnen", subtitle: "Adresse, Utility-Bill, Tello eSIM und Bankkonto direkt gegenchecken." };
  }
  if (step.fields && step.fields.length > 0) {
    return { hasWorkspace: true, label: "Eingabe-Fenster bearbeiten", subtitle: "Deine Werte für diesen Schritt sicher im Guide speichern." };
  }
  return {
    hasWorkspace: true,
    label: "Arbeitsfenster öffnen",
    subtitle: "Trage deine Eckdaten, Links, Kosten und Notizen für diesen Schritt direkt im Guide ein.",
  };
}

interface MiniCheck {
  frage: string;
  optionen: { label: string; ok: boolean }[];
  erklaerung: string;
}

const STEP_MINI_CHECKS: Record<string, MiniCheck> = {
  "us-bankkonto": {
    frage: "Kurzer Praxis-Check: Welcher US-Bankkonto-Weg ist bei einer Amex-Bankprüfung wirklich sicher?",
    optionen: [
      { label: "Chase oder Bank of America per persönlichem Filialbesuch in den USA + Reisepass", ok: true },
      { label: "Wise reicht immer, auch bei einer Bankprüfung", ok: false },
    ],
    erklaerung: "Genau richtig: Mit Wise kannst du Glück haben, wenn keine Prüfung kommt. Kommt eine Rückfrage von Amex, scheitert Wise in der Regel. Sicher ist nur ein echtes US-Filialkonto mit persönlichem Besuch und Pass.",
  },
  "us-telefonnummer-tello": {
    frage: "Warum empfehlen wir eine echte US-eSIM wie Tello statt einer reinen VoIP-Nummer?",
    optionen: [
      { label: "Weil Amex regelmäßig anruft und VoIP-Nummern häufig abgelehnt werden", ok: true },
      { label: "Weil Amex nur per Brief kommuniziert", ok: false },
    ],
    erklaerung: "Richtig: American Express ruft regelmäßig zur Verifizierung an. Mit Tello per eSIM und Wi-Fi Calling nimmst du diese Anrufe direkt in Deutschland an.",
  },
  "elster": {
    frage: "Wie lange hast du nach Start für den Fragebogen zur steuerlichen Erfassung (§ 138 Abs. 4 AO)?",
    optionen: [
      { label: "1 Monat ab Beginn der Tätigkeit", ok: true },
      { label: "Bis zum Ende des Kalenderjahres", ok: false },
    ],
    erklaerung: "Genau: Die Ein-Monats-Frist beginnt mit dem Start deiner Tätigkeit, nicht erst mit einem Brief vom Finanzamt.",
  },
  "kleinunternehmer-check": {
    frage: "Wie lange bindet dich der Verzicht auf die Kleinunternehmerregelung (§ 19 Abs. 3 UStG)?",
    optionen: [
      { label: "5 Kalenderjahre", ok: true },
      { label: "2 Kalenderjahre", ok: false },
    ],
    erklaerung: "Richtig: Der Verzicht bindet mindestens fünf Kalenderjahre. Die Umsatzgrenzen liegen bei 25.000 € im Vorjahr und 100.000 € im laufenden Jahr.",
  },
  "familiengericht": {
    frage: "Wann brauchst du unter 18 das Familiengericht (§ 112 BGB)?",
    optionen: [
      { label: "Für ein selbstständiges Gewerbe auf deinen eigenen Namen", ok: true },
      { label: "Schon beim Bauen einer ersten Test-Website ohne Einnahmen", ok: false },
    ],
    erklaerung: "Stimmt: Bauen und Lernen geht sofort ohne Amt. Erst für ein eigenes Gewerbe mit dauerhafter Gewinnabsicht kommen Eltern und Familiengericht nach § 112 BGB dazu.",
  },
};

const CLUSTER_MINI_CHECKS: MiniCheck[] = [
  // 0: Rechtsform, Struktur & Ausland
  {
    frage: "Kurzer Reihenfolge-Check: Was kommt beim Start in Deutschland typischerweise vor der ersten Rechnung?",
    optionen: [
      { label: "Rechtsform klären, Anmeldung einreichen und ELSTER-Fragebogen fristgerecht starten", ok: true },
      { label: "Erst ein Jahr warten und erst am Jahresende beim Finanzamt melden", ok: false },
    ],
    erklaerung: "Stimmt: Erst die saubere Reihenfolge aus Rechtsform, Anmeldung und ELSTER-Fragebogen spart Rückfragen und unnötige Nacharbeiten.",
  },
  // 1: Marktplätze
  {
    frage: "Praxis-Check Marktplätze: Was prüfst du, bevor du dein erstes Produkt live schaltest?",
    optionen: [
      { label: "Pflichten wie LUCID, WEEE/GPSR, Gebühren und saubere Verifizierung", ok: true },
      { label: "Erst nach 1.000 Verkäufen um Verpackungslizenz und Gebühren kümmern", ok: false },
    ],
    erklaerung: "Genau: Verpackungsregister LUCID und korrekte Produktdaten sind ab dem ersten Verkauf an Endkunden in Deutschland Pflicht.",
  },
  // 2: Eigener Shop, Marke & App
  {
    frage: "Praxis-Check Shop, App & Marke: Was gehört vor dem ersten echten Kunden-Klick auf deine Seite?",
    optionen: [
      { label: "Impressum, Datenschutz, klare Bruttopreise und ein getesteter Kauf- oder Anmeldefluss", ok: true },
      { label: "Impressum und Preise erst nachtragen, wenn der Shop bekannt ist", ok: false },
    ],
    erklaerung: "Richtig: Pflichtangaben, transparente Bruttopreise und ein getesteter Checkout gehören direkt zum ersten Go-Live.",
  },
  // 3: Marketing & SEO
  {
    frage: "Praxis-Check Sichtbarkeit (Google & KI-Suche): Was macht eine Seite für Menschen und KI zitierbar?",
    optionen: [
      { label: "Klare Antworten auf konkrete Kauf- oder Kostenfragen mit aktuellen Zahlen und Quellen", ok: true },
      { label: "Möglichst lange allgemeine Texte ohne konkrete Daten oder Beispiele", ok: false },
    ],
    erklaerung: "Genau: Konkrete Kosten, Vergleiche, Datum und saubere Indexierbarkeit helfen sowohl in Google als auch in ChatGPT und Co.",
  },
  // 4: Creator & TikTok Shop
  {
    frage: "Praxis-Check Creator: Wann gilt ein bezahlter Post oder ein geschenktes Sample steuerlich als Einnahme?",
    optionen: [
      { label: "Sobald ein geldwerter Vorteil oder eine Gegenleistung vereinbart ist", ok: true },
      { label: "Nur bei Überweisungen ab 5.000 € pro Jahr", ok: false },
    ],
    erklaerung: "Richtig: Auch kostenlose Produkte im Tausch gegen Erwähnung können als Sachbezug steuerpflichtig sein. Saubere Dokumentation schützt vor Überraschungen.",
  },
  // 5: Coaching & Dienstleistung
  {
    frage: "Praxis-Check Dienstleistung & Coaching: Worauf achtest du vor deinem ersten Kundenprojekt?",
    optionen: [
      { label: "Klarer Leistungsumfang, schriftliche Angebotsbestätigung und saubere Rechnungsstellung", ok: true },
      { label: "Mündliche Absprache ohne Leistungsbeschreibung reicht für alle Fälle", ok: false },
    ],
    erklaerung: "Stimmt: Ein klar definierter Leistungsumfang verhindert Missverständnisse, Scope Creep und spätere Zahlungsstreitigkeiten.",
  },
  // 6: Finanzierung & Beteiligung
  {
    frage: "Praxis-Check Finanzierung & Förderung: Wann stellst du einen Förderantrag?",
    optionen: [
      { label: "Vor Beginn des Vorhabens bzw. vor Unterzeichnung verbindlicher Verträge", ok: true },
      { label: "Immer erst rückwirkend, nachdem alle Rechnungen bezahlt wurden", ok: false },
    ],
    erklaerung: "Genau: Bei fast allen öffentlichen Förderprogrammen gilt das Verbot des vorzeitigen Maßnahmebeginns. Erst beantragen, dann beauftragen.",
  },
  // 7: Team, Zahlen & Absicherung
  {
    frage: "Praxis-Check Finanzen & Team: Wie behältst du Steuern und Liquidität am sichersten im Griff?",
    optionen: [
      { label: "Steuerrücklage laufend getrennt zurücklegen und Fristen im Kalender pflegen", ok: true },
      { label: "Alles vom Hauptkonto ausgeben und auf den Steuerbescheid warten", ok: false },
    ],
    erklaerung: "Richtig: Ein separates Rücklagenkonto für Umsatz- und Einkommensteuer hält deine Liquidität auch im zweiten Geschäftsjahr stabil.",
  },
];

function getStepMiniCheck(guideSlug: string | undefined, step: PlaybookStep, stepIndex: number): MiniCheck | null {
  if (STEP_MINI_CHECKS[step.slug]) return STEP_MINI_CHECKS[step.slug];
  // Jeder Guide bekommt in Schritt 1 (Index 0) und bei Entscheidungs-/Checklisten-Schritten einen passenden Themen-Check
  if (!guideSlug) return null;
  if (stepIndex !== 0 && stepIndex !== 2) return null;
  const clusterIdx = GUIDE_THEMEN.findIndex((group) => group.includes(guideSlug));
  if (clusterIdx < 0) return CLUSTER_MINI_CHECKS[0];
  return CLUSTER_MINI_CHECKS[(clusterIdx + (stepIndex === 2 ? 1 : 0)) % CLUSTER_MINI_CHECKS.length];
}

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
  const [runCtx, setRunCtx] = useState<Record<string, any>>({});
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [miniAnswer, setMiniAnswer] = useState<number | null>(null);

  const ctxSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeStepRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  const initInFlight = useRef(false);
  useEffect(() => {
    if (!runId || !user) return;
    if (initInFlight.current) return;
    initInFlight.current = true;
    (async () => {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(runId);
      if (!isUuid) {
        const slug = runId;
        if (!getPlaybook(slug)) {
          navigate("/playbooks");
          return;
        }
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
        const pbInit = getPlaybook(slug)!;
        const { data: created, error } = await supabase
          .from("playbook_runs")
          .insert({
            user_id: user.id,
            playbook_slug: slug,
            title: pbInit.title,
            total_steps: pbInit.steps.length,
            current_step: 0,
            context: {},
          })
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
      if (!r) {
        navigate("/dashboard");
        return;
      }
      const pbLoaded = getPlaybook((r as any).playbook_slug);
      const maxIdx = Math.max(0, (pbLoaded?.steps.length ?? 1) - 1);
      const rawIdx = typeof r.current_step === "number" && Number.isFinite(r.current_step) ? r.current_step : 0;
      const safeIdx = Math.max(0, Math.min(rawIdx, maxIdx));
      setRun({ ...(r as RunRow), current_step: safeIdx });
      setActiveIndex(safeIdx);
      const { data: loadRes } = await supabase.functions.invoke("guide-data", {
        body: { action: "load", run_id: runId },
      });
      const s = (loadRes?.rows ?? []) as any[];
      const map: Record<number, StepRow> = {};
      (s ?? []).forEach((row: any) => {
        map[row.step_index] = row;
      });
      setSteps(map);

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
  const { detail, loading: detailLoading } = useGuideDetail(slug);

  useEffect(() => {
    const cur = steps[activeIndex];
    setFormData(cur?.data ?? {});
    setNotes(cur?.notes ?? "");
    setWorkspaceOpen(false);
    setMiniAnswer(null);
  }, [activeIndex, steps]);

  useEffect(() => {
    if (!activeStepRef.current) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeIndex]);

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
      <div className="container max-w-5xl px-4 pb-24 pt-6 md:px-6" aria-busy="true">
        <p className="sr-only" role="status">Guide wird geladen…</p>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-3 h-8 w-2/3" />
        <Skeleton className="mt-4 h-3 w-full rounded-full" />
        <Skeleton className="mt-6 h-80 w-full rounded-xl" />
      </div>
    );
  }

  const safeActiveIndex = Math.max(0, Math.min(activeIndex, pb.steps.length - 1));
  const step = mergeStepDetail(pb.steps[safeActiveIndex], detail);
  const completedCount = Object.values(steps).filter((s) => s.status === "done").length;
  const progress = Math.round((completedCount / pb.steps.length) * 100);
  const missingRequired = getMissingRequired(step, formData, runCtx);
  const workspaceMeta = getWorkspaceMeta(slug, step);

  const remainingMinutes = pb.steps.reduce((sum, s, i) => {
    if (steps[i]?.status === "done") return sum;
    return sum + (s.estMinutes ?? 0);
  }, 0);
  const remainingHrs = Math.floor(remainingMinutes / 60);
  const remainingMins = remainingMinutes % 60;
  const remainingLabel = remainingHrs > 0 ? `${remainingHrs} h ${remainingMins} min` : `${remainingMins} min`;

  const savedStep = steps[activeIndex];
  const isDirty =
    JSON.stringify(formData ?? {}) !== JSON.stringify(savedStep?.data ?? {}) ||
    (notes ?? "") !== (savedStep?.notes ?? "");

  const checklistTotal = step.checklist?.length ?? 0;
  const checklistDone = step.checklist
    ? step.checklist.filter((_, i) => formData[`chk_${i}`] === "1").length
    : 0;

  const gamState = readGamification(user?.id);
  const lvlInfo = getLevelInfo(gamState.xp);

  const saveStep = async (status: "pending" | "done", autosave = false): Promise<boolean> => {
    if (!user) return false;
    if (status === "done" && missingRequired.length > 0) {
      if (workspaceMeta.hasWorkspace) setWorkspaceOpen(true);
      return false;
    }
    setSaving(true);
    try {
      const payload = {
        run_id: run.id,
        user_id: user.id,
        step_index: activeIndex,
        step_slug: step.slug,
        status,
        data: formData,
        notes,
        completed_at: status === "done" ? (autosave && savedStep?.completed_at) || new Date().toISOString() : null,
      };
      const { data: saveRes, error: saveErr } = await supabase.functions.invoke("guide-data", {
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
      if (saveErr || (saveRes as { error?: string } | null)?.error) {
        toast.error("Speichern fehlgeschlagen. Deine Eingaben bleiben hier, bitte noch einmal versuchen.");
        return false;
      }
      const newSteps = { ...steps, [activeIndex]: { ...payload } as any };
      setSteps(newSteps);

      const newCompleted = Object.values(newSteps).filter((s: any) => s.status === "done").length;
      const isComplete = newCompleted === pb.steps.length;
      const newCurrent = status === "done" && !autosave ? Math.min(activeIndex + 1, pb.steps.length - 1) : run.current_step;

      const neuAbgeschlossen = isComplete && run.status !== "completed";
      const nextStatus = isComplete ? "completed" : "in_progress";

      await supabase
        .from("playbook_runs")
        .update({
          current_step: newCurrent,
          last_activity_at: new Date().toISOString(),
          status: nextStatus,
          ...(isComplete && !neuAbgeschlossen ? {} : { completed_at: isComplete ? new Date().toISOString() : null }),
        })
        .eq("id", run.id);
      setRun((r) => (r ? { ...r, status: nextStatus, current_step: newCurrent } : r));

      if (status === "done" && !autosave) {
        const reward = awardStepXp(pb.slug, step.slug, {
          userId: user.id,
          guideCompleted: isComplete,
        });
        if (reward.earnedXp > 0) {
          toast.success(`+${reward.earnedXp} XP · Schritt ${activeIndex + 1} erledigt!`);
        }
      }

      if (neuAbgeschlossen) {
        await supabase.from("notifications").insert({
          user_id: user.id,
          kind: "success",
          title: `${pb.title} abgeschlossen`,
          body: pb.outcome,
          link: "/dashboard",
        });
      } else if (status === "done" && !autosave && activeIndex < pb.steps.length - 1) {
        setActiveIndex(newCurrent);
      }
      return true;
    } catch (e) {
      console.error("saveStep:", e);
      toast.error("Speichern fehlgeschlagen. Bitte noch einmal versuchen.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const goToStep = async (i: number) => {
    if (i === activeIndex) {
      setChaptersOpen(false);
      return;
    }
    if (isDirty) {
      const keepDone = savedStep?.status === "done" && missingRequired.length === 0;
      const ok = await saveStep(keepDone ? "done" : "pending", true);
      if (!ok && !window.confirm("Deine Eingaben konnten nicht gespeichert werden. Trotzdem wechseln?")) {
        return;
      }
    }
    setActiveIndex(i);
    setChaptersOpen(false);
  };

  const fertig = progress === 100;
  const ActiveIcon = STEP_KIND_ICON[step.kind] ?? BookOpen;
  const currentDone = steps[activeIndex]?.status === "done";

  const ChapterList = (
    <ol className="space-y-1">
      {pb.steps.map((s, i) => {
        const st = steps[i];
        const done = st?.status === "done";
        const active = i === activeIndex;
        return (
          <li key={s.slug}>
            <button
              type="button"
              onClick={() => void goToStep(i)}
              aria-current={active ? "step" : undefined}
              className={cn(
                "flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                active ? "bg-primary/10 font-semibold text-primary" : "hover:bg-secondary",
              )}
            >
              <span className="shrink-0">
                {done ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-brand-green-foreground">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                ) : active ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground tabular">
                    {i + 1}
                  </span>
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs text-muted-foreground tabular">
                    {i + 1}
                  </span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block truncate leading-snug", done && !active && "text-muted-foreground line-through")}>
                  {s.title}
                </span>
                <span className="text-[11px] font-normal text-muted-foreground tabular">
                  ~{s.estMinutes} min
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );

  const savedFieldCount = Object.entries(formData).filter(
    ([k, v]) => !k.startsWith("chk_") && v !== undefined && v !== null && String(v).trim() !== "",
  ).length;

  return (
    <div ref={activeStepRef} className="min-h-screen overflow-x-clip bg-background pb-36 md:pb-16">
      {/* Masterclass / Duolingo Kurs-Header in GründerX Navy */}
      <div className="border-b border-primary/20 bg-ink text-primary-foreground">
        <div className="container max-w-6xl px-4 py-4 md:px-6 md:py-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link
              to="/playbooks"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 -ml-2 text-xs font-medium text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-white sm:text-sm"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span>Alle Guides</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tabular">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-green px-2.5 py-1 text-brand-green-foreground shadow-sm">
                <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                Lvl {lvlInfo.level} · {gamState.xp} XP
              </span>
              <span className="hidden items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-white sm:inline-flex">
                <Flame className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                {gamState.streak} Tage
              </span>
              <button
                type="button"
                onClick={() => setChaptersOpen(true)}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white lg:hidden"
              >
                <List className="h-3.5 w-3.5" aria-hidden="true" />
                Kapitel {activeIndex + 1}/{pb.steps.length}
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="min-w-0 text-lg font-semibold leading-tight tracking-tight text-white sm:text-xl md:text-2xl">
              {pb.title}
            </h1>
            <p className="text-xs font-medium text-primary-foreground/80 tabular">
              {fertig ? "100 % abgeschlossen" : `${completedCount} von ${pb.steps.length} erledigt · noch ${remainingLabel}`}
            </p>
          </div>

          {/* Segmentierte Duolingo/Story-Fortschrittsleiste */}
          <div className="mt-3.5 flex gap-1.5" role="group" aria-label="Schritte im Guide">
            {pb.steps.map((s, i) => {
              const isDone = steps[i]?.status === "done";
              const isActive = i === activeIndex;
              return (
                <button
                  key={s.slug}
                  type="button"
                  title={`Schritt ${i + 1}: ${s.title}`}
                  aria-label={`Zu Schritt ${i + 1}: ${s.title}`}
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => void goToStep(i)}
                  className={cn(
                    "h-2.5 flex-1 rounded-full transition-all",
                    isDone
                      ? "bg-brand-green-glow"
                      : isActive
                        ? "bg-white shadow-sm"
                        : "bg-white/20 hover:bg-white/40",
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Hauptbereich: Desktop Kurs-Leiste + 1 ruhige Fokus-Lektion */}
      <div className="container max-w-6xl px-4 pt-5 md:px-6 md:pt-7">
        {fertig && (
          <section className="mb-6 rounded-2xl border border-brand-green/40 bg-brand-green-soft/75 p-5 shadow-card md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-brand-green-foreground shadow-sm">
                  <Trophy className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-brand-green">Ziel erreicht · +{pb.steps.length * 100 + 250} XP</p>
                  <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-primary">Guide komplett abgeschlossen!</h2>
                  <p className="mt-1 text-sm text-foreground/85">{pb.outcome}</p>
                </div>
              </div>
              <Button asChild size="sm" className="press rounded-xl">
                <Link to="/playbooks">
                  Nächsten Guide wählen <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </section>
        )}

        <div className="grid items-start gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">
          {/* Desktop Kapitel-Leiste */}
          <aside className="hidden rounded-2xl border border-border bg-card p-3 shadow-card lg:sticky lg:top-20 lg:block">
            <div className="mb-2 flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-muted-foreground">
              <span>Lehrplan</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-foreground tabular">
                {completedCount}/{pb.steps.length}
              </span>
            </div>
            {ChapterList}
          </aside>

          {/* Aktive Lektion (1 klarer Schritt, 0 Textwand, direktes Arbeitsfenster) */}
          <article className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-md">
            <header className="border-b border-border/70 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground tabular">
                    Schritt {activeIndex + 1} von {pb.steps.length}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground/80">
                    <ActiveIcon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    {STEP_KIND_LABEL[step.kind]}
                  </span>
                  {currentDone && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-green-soft px-2.5 py-1 text-xs font-semibold text-brand-green">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Erledigt
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground tabular">
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-2.5 py-1 font-medium">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> ~{step.estMinutes} Min.
                  </span>
                  {step.estCost && (
                    <ToneBadge tone="neutral">
                      <Wallet className="h-3 w-3" aria-hidden="true" />
                      <span className="max-w-[180px] truncate">{step.estCost.split("·")[0].trim()}</span>
                    </ToneBadge>
                  )}
                </div>
              </div>

              <h2 className="mt-4 text-balance text-xl font-semibold leading-snug tracking-tight text-primary sm:text-2xl">
                {step.title}
              </h2>

              {step.description && (
                <div className="mt-3 rounded-xl border border-border/80 bg-secondary/40 px-4 py-3 text-sm leading-relaxed text-foreground/85 sm:text-[15px]">
                  <span className="mb-1 block text-[11px] font-semibold text-primary">Kurz erklärt</span>
                  {step.description}
                </div>
              )}

              {/* Direktes Arbeitsfenster-Spotlight (Udemy/Masterclass Interactive Window) */}
              {workspaceMeta.hasWorkspace && (
                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-primary/25 bg-primary/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                      <Wrench className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{workspaceMeta.label}</p>
                        {savedFieldCount > 0 && (
                          <span className="rounded-full bg-brand-green-soft px-2 py-0.5 text-[11px] font-semibold text-brand-green tabular">
                            {savedFieldCount} gespeichert ✓
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{workspaceMeta.subtitle}</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setWorkspaceOpen(true)}
                    className="press h-11 shrink-0 gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
                  >
                    Fenster öffnen <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              )}

              {/* Sekundär-Aktionen: Notizen + Felix */}
              <div className="mt-3.5 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setNotesOpen(true)}
                  className="min-h-10 gap-1.5 rounded-xl"
                >
                  <NotebookPen className="h-4 w-4 text-primary" aria-hidden="true" />
                  Eigene Notizen {notes.trim() ? "✓" : ""}
                </Button>
                <Button asChild variant="outline" size="sm" className="min-h-10 gap-1.5 rounded-xl">
                  <Link to={`/felix?frage=${encodeURIComponent(`Hilf mir kurz bei Schritt "${step.title}" im Guide "${pb.title}"`)}`}>
                    <MessageSquare className="h-4 w-4 text-brand-green" aria-hidden="true" />
                    Felix zu diesem Schritt fragen
                  </Link>
                </Button>
              </div>
            </header>

            <div className="space-y-5 p-4 sm:p-6">
              {step.warning && (
                <Callout tone="danger" icon={AlertTriangle} title="Wichtig vor diesem Schritt">
                  {step.warning}
                </Callout>
              )}

              {detailLoading ? (
                <div className="space-y-3 rounded-xl border border-border p-4" aria-busy="true">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
                    <Loader2 className="h-4 w-4 animate-spin text-accent-blue" aria-hidden="true" />
                    Schritt-Details werden geladen…
                  </p>
                  <Skeleton className="h-11 w-full rounded-lg" />
                  <Skeleton className="h-11 w-full rounded-lg" />
                </div>
              ) : (
                <>
                  {/* Interaktive Check-Karten */}
                  {step.checklist && step.checklist.length > 0 && (
                    <section aria-label="Abhak-Schritte">
                      <div className="mb-2.5 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground">Jetzt erledigen</h3>
                        <span className="text-xs font-medium text-brand-green tabular">
                          {checklistDone} / {checklistTotal} abgehakt
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {step.checklist.map((c, i) => {
                          const checked = formData[`chk_${i}`] === "1";
                          return (
                            <li key={i}>
                              <button
                                type="button"
                                aria-pressed={checked}
                                onClick={() => setFormData({ ...formData, [`chk_${i}`]: checked ? "" : "1" })}
                                className={cn(
                                  "press flex min-h-12 w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                                  checked
                                    ? "border-brand-green/40 bg-brand-green-soft/60"
                                    : "border-border bg-background hover:border-primary/35",
                                )}
                              >
                                {checked ? (
                                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />
                                ) : (
                                  <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                                )}
                                <span
                                  className={cn(
                                    "text-sm leading-snug",
                                    checked && "text-muted-foreground line-through",
                                  )}
                                >
                                  {c}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  )}

                  {/* Direkt-Links zu Ämtern & Portalen */}
                  {step.externalLinks && step.externalLinks.length > 0 && (
                    <section aria-label="Direkte Links">
                      <h3 className="mb-2 text-sm font-semibold text-foreground">Direkt öffnen</h3>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {step.externalLinks.map((l) => (
                          <AnbieterLink
                            key={l.url}
                            url={l.url}
                            ort="playbook"
                            className="press group flex min-h-11 items-center justify-between gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/40"
                          >
                            <span className="truncate">{l.label}</span>
                            <ExternalLink className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
                          </AnbieterLink>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Zusatz-Tipps kompakt einklappbar, damit Screen ruhig bleibt */}
                  {step.extendedNotes && step.extendedNotes.length > 0 && (
                    <details className="group rounded-xl border border-border bg-secondary/35 p-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-foreground">
                        <span className="inline-flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-accent-blue" aria-hidden="true" />
                          Praxis-Hinweise & Details ({step.extendedNotes.length})
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden="true" />
                      </summary>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                        {step.extendedNotes.map((n, i) => (
                          <li key={i}>{n}</li>
                        ))}
                      </ul>
                    </details>
                  )}

                  {/* Interaktiver Mini-Wissenscheck (+25 Bonus-XP) für alle 81 Guides */}
                  {(() => {
                    const mc = getStepMiniCheck(slug, step, activeIndex);
                    if (!mc) return null;
                    return (
                      <section className="rounded-xl border border-primary/20 bg-primary/5 p-4" aria-label="Kurzer Wissenscheck">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                            Kurz-Check (+25 XP)
                          </span>
                          {miniAnswer !== null && (
                            <span className="text-xs font-semibold text-brand-green">Beantwortet</span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-foreground">{mc.frage}</p>
                        <div className="mt-3 space-y-2">
                          {mc.optionen.map((opt, idx) => {
                            const chosen = miniAnswer === idx;
                            const showOk = miniAnswer !== null && opt.ok;
                            const showBad = chosen && !opt.ok;
                            return (
                              <button
                                key={opt.label}
                                type="button"
                                disabled={miniAnswer !== null}
                                onClick={() => {
                                  setMiniAnswer(idx);
                                  if (opt.ok) {
                                    awardStepXp(pb.slug, `${step.slug}-check`, { userId: user?.id, bonusXp: 25 });
                                    toast.success("+25 Bonus-XP für den Kurz-Check!");
                                  }
                                }}
                                className={cn(
                                  "press flex min-h-11 w-full items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 text-left text-xs font-medium transition-colors sm:text-sm",
                                  showOk
                                    ? "border-brand-green bg-brand-green-soft text-foreground"
                                    : showBad
                                      ? "border-danger bg-danger-soft text-foreground"
                                      : "border-border bg-card hover:border-primary/40",
                                )}
                              >
                                <span>{opt.label}</span>
                                {showOk && <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />}
                              </button>
                            );
                          })}
                        </div>
                        {miniAnswer !== null && (
                          <p className="mt-3 rounded-lg bg-card p-3 text-xs leading-relaxed text-muted-foreground">
                            {mc.erklaerung}
                          </p>
                        )}
                      </section>
                    );
                  })()}

                  {/* Kurzer Hinweis wenn Arbeitsfenster Pflichtfelder hat */}
                  {missingRequired.length > 0 && (
                    <Callout tone="warning" title="Erst im Arbeitsfenster ausfüllen">
                      Noch offen: {missingRequired.join(", ")}.{" "}
                      <button
                        type="button"
                        onClick={() => setWorkspaceOpen(true)}
                        className="font-semibold text-accent-blue underline"
                      >
                        Fenster jetzt öffnen
                      </button>
                    </Callout>
                  )}
                </>
              )}
            </div>

            {/* Desktop Footer Actions */}
            <footer className="hidden items-center justify-between gap-3 border-t border-border/70 p-5 md:flex">
              <Button
                variant="outline"
                onClick={() => void goToStep(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="min-h-11"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Zurück
              </Button>
              <div className="flex items-center gap-2.5">
                <Button variant="outline" onClick={() => void saveStep("pending")} disabled={saving} className="min-h-11">
                  Zwischenspeichern
                </Button>
                <Button
                  onClick={() => void saveStep("done")}
                  disabled={saving || detailLoading}
                  className="press min-h-11 gap-2 bg-brand-green text-brand-green-foreground hover:bg-brand-green/90"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
                  {currentDone ? "Weiter zum nächsten Schritt" : "Schritt erledigt (+100 XP)"}
                </Button>
              </div>
            </footer>
          </article>
        </div>
      </div>

      {/* Mobile Sticky Action Bar (über der App-Bottom-Bar) */}
      <div
        className="fixed inset-x-0 bottom-14 z-30 border-t border-border bg-card/95 px-3 py-2.5 backdrop-blur-md md:hidden"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => void goToStep(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            aria-label="Vorheriger Schritt"
            className="h-11 w-11 shrink-0"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Button>

          {workspaceMeta.hasWorkspace && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setWorkspaceOpen(true)}
              className="h-11 shrink-0 gap-1.5 px-3 text-xs font-semibold"
            >
              <Wrench className="h-4 w-4 text-primary" aria-hidden="true" />
              Fenster
            </Button>
          )}

          <Button
            onClick={() => void saveStep("done")}
            disabled={saving || detailLoading}
            className="press h-11 flex-1 gap-1.5 bg-brand-green text-sm font-semibold text-brand-green-foreground hover:bg-brand-green/90"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
            {currentDone ? "Weiter" : "Erledigt (+100 XP)"}
          </Button>
        </div>
      </div>

      {/* Slide-Over Arbeitsfenster (Direkt im Guide bearbeiten!) */}
      <Sheet open={workspaceOpen} onOpenChange={setWorkspaceOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
          <SheetHeader className="mb-5 text-left">
            <SheetTitle>{workspaceMeta.label || step.title}</SheetTitle>
            <SheetDescription>{workspaceMeta.subtitle}</SheetDescription>
          </SheetHeader>

          <WorkspaceBody
            guideSlug={slug}
            step={step}
            formData={formData}
            setFormData={setFormData}
            runCtx={runCtx}
            updateRunCtx={updateRunCtx}
          />

          <div className="mt-6 flex items-center justify-end gap-2 border-t border-border pt-4">
            <Button variant="outline" onClick={() => setWorkspaceOpen(false)} className="min-h-11">
              Schließen
            </Button>
            <Button
              onClick={async () => {
                const ok = await saveStep(savedStep?.status === "done" ? "done" : "pending");
                if (ok) {
                  toast.success("Im Guide gespeichert.");
                  setWorkspaceOpen(false);
                }
              }}
              disabled={saving}
              className="min-h-11"
            >
              {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              Speichern & zurück zum Schritt
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Notizen-Fenster */}
      <Sheet open={notesOpen} onOpenChange={setNotesOpen}>
        <SheetContent side="bottom" className="mx-auto max-w-2xl rounded-t-2xl">
          <SheetHeader className="mb-4 text-left">
            <SheetTitle>Deine Notizen zu Schritt {activeIndex + 1}</SheetTitle>
            <SheetDescription>{step.title}</SheetDescription>
          </SheetHeader>
          <Field label="Notizen" htmlFor="pb-notizen">
            <Textarea
              id="pb-notizen"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Ansprechpartner, Aktenzeichen, nächste Termine…"
            />
          </Field>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setNotesOpen(false)}>Schließen</Button>
            <Button
              onClick={async () => {
                const ok = await saveStep(savedStep?.status === "done" ? "done" : "pending");
                if (ok) {
                  toast.success("Notiz gespeichert.");
                  setNotesOpen(false);
                }
              }}
              disabled={saving}
            >
              Speichern
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Kapitel-Übersicht */}
      <Sheet open={chaptersOpen} onOpenChange={setChaptersOpen}>
        <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto rounded-t-2xl">
          <SheetHeader className="mb-3 text-left">
            <SheetTitle>Alle Schritte ({completedCount}/{pb.steps.length})</SheetTitle>
            <SheetDescription>{pb.title}</SheetDescription>
          </SheetHeader>
          {ChapterList}
        </SheetContent>
      </Sheet>
    </div>
  );
};

function WorkspaceBody({
  guideSlug,
  step,
  formData,
  setFormData,
  runCtx,
  updateRunCtx,
}: {
  guideSlug: string | undefined;
  step: PlaybookStep;
  formData: Record<string, any>;
  setFormData: (v: Record<string, any>) => void;
  runCtx: Record<string, any>;
  updateRunCtx: (patch: Record<string, any>) => void;
}) {
  const sharedCompanyName = runCtx.company_name ?? formData.company_name ?? "";
  const hasSpecializedWidget =
    step.slug === "name" ||
    step.slug === "notar" ||
    step.slug === "satzung" ||
    step.slug === "konto" ||
    step.slug === "gewa1-pdf" ||
    step.slug === "familiengericht" ||
    guideSlug === "amex-us-beantragen" ||
    Boolean(step.fields && step.fields.length > 0);

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
      {step.slug === "notar" && <NotarFinder companyName={sharedCompanyName} />}
      {step.slug === "satzung" && (
        <NotarPreparation
          answers={formData}
          setAnswers={setFormData}
          companyName={sharedCompanyName}
          onCompanyNameChange={(v) => updateRunCtx({ company_name: v })}
        />
      )}
      {step.slug === "konto" && <BankComparison />}
      {step.slug === "gewa1-pdf" && <GewA1Form answers={formData} setAnswers={setFormData} />}
      {step.slug === "familiengericht" && <FamiliengerichtForm answers={formData} setAnswers={setFormData} />}
      {guideSlug === "amex-us-beantragen" && (
        <AmexUsReadinessWidget
          value={formData.amex_checks}
          onChange={(next) => setFormData({ ...formData, amex_checks: next })}
        />
      )}
      {step.fields && step.fields.length > 0 && (
        <div className="grid gap-4">
          {step.fields.map((f) => (
            <Field key={f.name} label={f.label} htmlFor={`pb-f-${f.name}`}>
              {f.type === "textarea" ? (
                <Textarea
                  id={`pb-f-${f.name}`}
                  value={formData[f.name] ?? ""}
                  onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                  rows={3}
                />
              ) : (
                <Input
                  id={`pb-f-${f.name}`}
                  type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                  value={formData[f.name] ?? ""}
                  onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                  className="h-11"
                />
              )}
            </Field>
          ))}
        </div>
      )}
      {!hasSpecializedWidget && (
        <div className="space-y-4 rounded-2xl border border-border bg-secondary/35 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Halte hier deine konkreten Angaben für <strong className="text-foreground">{step.title}</strong> fest. Alles
            wird direkt zu deinem Guide gespeichert.
          </p>
          <Field label="Gewählter Anbieter, Portal oder Lösung" htmlFor="pb-ws-provider">
            <Input
              id="pb-ws-provider"
              value={formData.ws_provider ?? ""}
              onChange={(e) => setFormData({ ...formData, ws_provider: e.target.value })}
              placeholder="z. B. Anbietername, Domain oder Behörde"
              className="h-11 bg-card"
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Zieldatum" htmlFor="pb-ws-date">
              <Input
                id="pb-ws-date"
                type="date"
                value={formData.ws_date ?? ""}
                onChange={(e) => setFormData({ ...formData, ws_date: e.target.value })}
                className="h-11 bg-card"
              />
            </Field>
            <Field label="Geplante Kosten (optional)" htmlFor="pb-ws-cost">
              <Input
                id="pb-ws-cost"
                value={formData.ws_cost ?? ""}
                onChange={(e) => setFormData({ ...formData, ws_cost: e.target.value })}
                placeholder="z. B. 0 € oder 29 €"
                className="h-11 bg-card"
              />
            </Field>
          </div>
          <Field label="Wichtiger Link, Aktenzeichen oder Entscheidung" htmlFor="pb-ws-ref">
            <Textarea
              id="pb-ws-ref"
              value={formData.ws_ref ?? ""}
              onChange={(e) => setFormData({ ...formData, ws_ref: e.target.value })}
              rows={3}
              placeholder="Link zum Portal, Bestätigungsnummer oder dein nächster konkreter Schritt…"
              className="bg-card"
            />
          </Field>
        </div>
      )}
    </div>
  );
}

function getMissingRequired(
  step: PlaybookStep,
  formData: Record<string, any>,
  runCtx: Record<string, any>,
): string[] {
  const missing: string[] = [];
  const isEmpty = (v: any) => v === undefined || v === null || String(v).trim() === "";

  if (step.slug === "name") {
    if (isEmpty(runCtx.company_name) && isEmpty(formData.company_name)) missing.push("Firmenname");
    return missing;
  }
  if (step.slug === "satzung") {
    if (isEmpty(runCtx.company_name) && isEmpty(formData.firmenname)) missing.push("Firmenname");
    if (isEmpty(formData.firmensitzStadt)) missing.push("Firmensitz (Stadt)");
    if (isEmpty(formData.firmensitzAdresse)) missing.push("Geschäftsadresse");
    if (isEmpty(formData.gegenstand)) missing.push("Unternehmensgegenstand");
    return missing;
  }
  if (step.fields) {
    for (const f of step.fields) {
      if (isEmpty(formData[f.name])) missing.push(f.label);
    }
  }
  return missing;
}

export default PlaybookRun;
