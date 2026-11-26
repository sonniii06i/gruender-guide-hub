import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getPlaybook, type PlaybookStep } from "@/data/playbooks";
import { GUIDE_THEMEN } from "@/data/guides";
import { getCourseTheme } from "@/components/CourseCoverCard";
import { useGuideDetail, mergeStepDetail } from "@/hooks/useGuideDetail";
import { awardStepXp, readGamification, getLevelInfo } from "@/lib/gamification";
import { Field } from "@/components/cockpit/kit";
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

type LessonTab = "umsetzen" | "werkzeug" | "tipps" | "check" | "notizen";

const STEP_KIND_LABEL: Record<string, string> = {
  form: "Arbeitsfenster",
  checklist: "Checkliste",
  external: "Anmeldung & Portal",
  info: "Kurz erklärt",
  decision: "Entscheidung",
};

function getWorkspaceMeta(guideSlug: string | undefined, step: PlaybookStep): {
  hasWorkspace: boolean;
  label: string;
  subtitle: string;
} {
  if (step.slug === "name") {
    return { hasWorkspace: true, label: "Firmenname direkt prüfen", subtitle: "Name gegen Register & Domains prüfen und für den ganzen Kurs speichern." };
  }
  if (step.slug === "notar") {
    return { hasWorkspace: true, label: "Notar-Finder", subtitle: "Passende Notare in deiner Nähe finden und Termin vorbereiten." };
  }
  if (step.slug === "satzung") {
    return { hasWorkspace: true, label: "Notar-Datenblatt", subtitle: "Alle Eckdaten für den Notartermin strukturiert erfassen." };
  }
  if (step.slug === "konto") {
    return { hasWorkspace: true, label: "Geschäftskonten vergleichen", subtitle: "Passendes Konto nach Rechtsform und Kosten direkt auswählen." };
  }
  if (step.slug === "gewa1-pdf") {
    return { hasWorkspace: true, label: "GewA1-Formular", subtitle: "Daten eingeben und ausgefülltes PDF für das Gewerbeamt erzeugen." };
  }
  if (step.slug === "familiengericht") {
    return { hasWorkspace: true, label: "Antrag Familiengericht (§ 112 BGB)", subtitle: "Vorlage für Eltern & Jugendliche unter 18 direkt bearbeiten." };
  }
  if (guideSlug === "amex-us-beantragen" && (step.slug === "voraussetzungen-check" || step.slug === "us-bankkonto" || step.slug === "global-transfer-antrag")) {
    return { hasWorkspace: true, label: "Amex-US-Startcheck", subtitle: "Adresse, Utility-Bill, Tello eSIM und Bankkonto direkt gegenchecken." };
  }
  if (step.fields && step.fields.length > 0) {
    return { hasWorkspace: true, label: "Eingaben & Daten", subtitle: "Deine Werte für diesen Schritt sicher im Kurs speichern." };
  }
  return {
    hasWorkspace: false,
    label: "Eigene Eckdaten",
    subtitle: "Optional: Anbieter, Datum oder Aktenzeichen für diesen Schritt festhalten.",
  };
}

interface MiniCheck {
  frage: string;
  optionen: { label: string; ok: boolean }[];
  erklaerung: string;
}

const STEP_MINI_CHECKS: Record<string, MiniCheck> = {
  "us-bankkonto": {
    frage: "Welcher US-Bankkonto-Weg ist bei einer Amex-Bankprüfung wirklich sicher?",
    optionen: [
      { label: "Chase oder Bank of America per persönlichem Filialbesuch in den USA + Reisepass", ok: true },
      { label: "Wise reicht immer, auch bei einer Bankprüfung", ok: false },
    ],
    erklaerung: "Genau richtig: Mit Wise kannst du Glück haben, wenn keine Prüfung kommt. Kommt eine Rückfrage von Amex, scheitert Wise in der Regel. Sicher ist ein echtes US-Filialkonto mit persönlichem Besuch und Pass.",
  },
  "us-telefonnummer-tello": {
    frage: "Warum empfehlen wir eine echte US-eSIM wie Tello statt einer reinen VoIP-Nummer?",
    optionen: [
      { label: "Weil Amex regelmäßig anruft und VoIP-Nummern häufig abgelehnt werden", ok: true },
      { label: "Weil Amex nur per Brief kommuniziert", ok: false },
    ],
    erklaerung: "Richtig: American Express ruft regelmäßig zur Verifizierung an. Mit Tello per eSIM und Wi-Fi Calling nimmst du diese Anrufe direkt in Deutschland an.",
  },
  elster: {
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
  familiengericht: {
    frage: "Wann brauchst du unter 18 das Familiengericht (§ 112 BGB)?",
    optionen: [
      { label: "Für ein selbstständiges Gewerbe auf deinen eigenen Namen", ok: true },
      { label: "Schon beim Bauen einer ersten Test-Website ohne Einnahmen", ok: false },
    ],
    erklaerung: "Stimmt: Bauen und Lernen geht sofort ohne Amt. Erst für ein eigenes Gewerbe mit dauerhafter Gewinnabsicht kommen Eltern und Familiengericht nach § 112 BGB dazu.",
  },
  transparenzregister: {
    frage: "Gilt die Pflicht zum Transparenzregister-Eintrag auch für eine Ein-Personen-GmbH?",
    optionen: [
      { label: "Ja, seit 2021 gilt das Vollregister für alle GmbHs und UGs ohne Ausnahme", ok: true },
      { label: "Nein, der Handelsregister-Eintrag reicht bei einem Gesellschafter automatisch aus", ok: false },
    ],
    erklaerung: "Genau: Seit dem 01.08.2021 ist die frühere Mitteilungsfiktion entfallen (§ 20 GwG). Jede GmbH und UG muss ihre wirtschaftlich Berechtigten aktiv im Transparenzregister eintragen.",
  },
};

const CLUSTER_MINI_CHECKS: MiniCheck[] = [
  {
    frage: "Was kommt beim Start in Deutschland typischerweise vor der ersten Rechnung?",
    optionen: [
      { label: "Rechtsform klären, Anmeldung einreichen und ELSTER-Fragebogen fristgerecht starten", ok: true },
      { label: "Erst ein Jahr warten und erst am Jahresende beim Finanzamt melden", ok: false },
    ],
    erklaerung: "Stimmt: Erst die saubere Reihenfolge aus Rechtsform, Anmeldung und ELSTER-Fragebogen spart Rückfragen und unnötige Nacharbeiten.",
  },
  {
    frage: "Was prüfst du bei Marktplätzen, bevor du dein erstes Produkt live schaltest?",
    optionen: [
      { label: "Pflichten wie LUCID, WEEE/GPSR, Gebühren und saubere Verifizierung", ok: true },
      { label: "Erst nach 1.000 Verkäufen um Verpackungslizenz und Gebühren kümmern", ok: false },
    ],
    erklaerung: "Genau: Verpackungsregister LUCID und korrekte Produktdaten sind ab dem ersten Verkauf an Endkunden in Deutschland Pflicht.",
  },
  {
    frage: "Was gehört vor dem ersten echten Kunden-Klick auf deinen Shop oder deine App?",
    optionen: [
      { label: "Impressum, Datenschutz, klare Bruttopreise und ein getesteter Kauf- oder Anmeldefluss", ok: true },
      { label: "Impressum und Preise erst nachtragen, wenn der Shop bekannt ist", ok: false },
    ],
    erklaerung: "Richtig: Pflichtangaben, transparente Bruttopreise und ein getesteter Checkout gehören direkt zum ersten Go-Live.",
  },
  {
    frage: "Was macht eine Seite für Menschen, Google und KI-Suche zitierbar?",
    optionen: [
      { label: "Klare Antworten auf konkrete Kauf- oder Kostenfragen mit aktuellen Zahlen und Quellen", ok: true },
      { label: "Möglichst lange allgemeine Texte ohne konkrete Daten oder Beispiele", ok: false },
    ],
    erklaerung: "Genau: Konkrete Kosten, Vergleiche, Datum und saubere Indexierbarkeit helfen sowohl in Google als auch in ChatGPT und Co.",
  },
  {
    frage: "Wann gilt ein bezahlter Post oder ein geschenktes Sample steuerlich als Einnahme?",
    optionen: [
      { label: "Sobald ein geldwerter Vorteil oder eine Gegenleistung vereinbart ist", ok: true },
      { label: "Nur bei Überweisungen ab 5.000 € pro Jahr", ok: false },
    ],
    erklaerung: "Richtig: Auch kostenlose Produkte im Tausch gegen Erwähnung können als Sachbezug steuerpflichtig sein. Saubere Dokumentation schützt vor Überraschungen.",
  },
  {
    frage: "Worauf achtest du vor deinem ersten Kundenprojekt als Dienstleister oder Coach?",
    optionen: [
      { label: "Klarer Leistungsumfang, schriftliche Angebotsbestätigung und saubere Rechnungsstellung", ok: true },
      { label: "Mündliche Absprache ohne Leistungsbeschreibung reicht für alle Fälle", ok: false },
    ],
    erklaerung: "Stimmt: Ein klar definierter Leistungsumfang verhindert Missverständnisse, Scope Creep und spätere Zahlungsstreitigkeiten.",
  },
  {
    frage: "Wann stellst du bei öffentlichen Programmen deinen Förderantrag?",
    optionen: [
      { label: "Vor Beginn des Vorhabens bzw. vor Unterzeichnung verbindlicher Verträge", ok: true },
      { label: "Immer erst rückwirkend, nachdem alle Rechnungen bezahlt wurden", ok: false },
    ],
    erklaerung: "Genau: Bei fast allen öffentlichen Förderprogrammen gilt das Verbot des vorzeitigen Maßnahmebeginns. Erst beantragen, dann beauftragen.",
  },
  {
    frage: "Wie behältst du Steuern und Liquidität im laufenden Betrieb am sichersten im Griff?",
    optionen: [
      { label: "Steuerrücklage laufend getrennt zurücklegen und Fristen im Kalender pflegen", ok: true },
      { label: "Alles vom Hauptkonto ausgeben und auf den Steuerbescheid warten", ok: false },
    ],
    erklaerung: "Richtig: Ein separates Rücklagenkonto für Umsatz- und Einkommensteuer hält deine Liquidität auch im zweiten Geschäftsjahr stabil.",
  },
];

function getStepMiniCheck(guideSlug: string | undefined, step: PlaybookStep, stepIndex: number): MiniCheck | null {
  if (STEP_MINI_CHECKS[step.slug]) return STEP_MINI_CHECKS[step.slug];
  if (!guideSlug) return null;
  if (stepIndex !== 0 && stepIndex !== 2) return null;
  const clusterIdx = GUIDE_THEMEN.findIndex((group) => group.includes(guideSlug));
  if (clusterIdx < 0) return CLUSTER_MINI_CHECKS[0];
  return CLUSTER_MINI_CHECKS[(clusterIdx + (stepIndex === 2 ? 1 : 0)) % CLUSTER_MINI_CHECKS.length];
}

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const PlaybookRun = () => {
  const { runId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [run, setRun] = useState<RunRow | null>(null);
  const [steps, setSteps] = useState<Record<number, StepRow>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<LessonTab>("umsetzen");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [notes, setNotes] = useState("");
  const [runCtx, setRunCtx] = useState<Record<string, any>>({});
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [miniAnswer, setMiniAnswer] = useState<number | null>(null);

  const ctxSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeStepRef = useRef<HTMLDivElement | null>(null);
  const activeCurriculumRef = useRef<HTMLButtonElement | null>(null);

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
    setActiveTab("umsetzen");
    setMiniAnswer(null);
  }, [activeIndex, steps]);

  useEffect(() => {
    if (!activeStepRef.current) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeCurriculumRef.current?.scrollIntoView({ block: "nearest" });
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
      <div className="container max-w-6xl px-4 pb-24 pt-6 md:px-6" aria-busy="true">
        <p className="sr-only" role="status">Kurs wird geladen…</p>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-3 h-8 w-2/3" />
        <Skeleton className="mt-6 h-96 w-full rounded-2xl" />
      </div>
    );
  }

  const theme = getCourseTheme(pb.slug, pb.title);
  const ThemeIcon = theme.icon;
  const safeActiveIndex = Math.max(0, Math.min(activeIndex, pb.steps.length - 1));
  const step = mergeStepDetail(pb.steps[safeActiveIndex], detail);
  const completedCount = Object.values(steps).filter((s) => s.status === "done").length;
  const progress = Math.round((completedCount / pb.steps.length) * 100);
  const missingRequired = getMissingRequired(step, formData, runCtx);
  const workspaceMeta = getWorkspaceMeta(slug, step);
  const miniCheck = getStepMiniCheck(slug, step, activeIndex);

  const remainingMinutes = pb.steps.reduce((sum, s, i) => {
    if (steps[i]?.status === "done") return sum;
    return sum + (s.estMinutes ?? 0);
  }, 0);
  const remainingHrs = Math.floor(remainingMinutes / 60);
  const remainingMins = remainingMinutes % 60;
  const remainingLabel = remainingHrs > 0 ? `${remainingHrs} h ${remainingMins} Min.` : `${remainingMins} Min.`;

  const savedStep = steps[activeIndex];
  const isDirty =
    JSON.stringify(formData ?? {}) !== JSON.stringify(savedStep?.data ?? {}) ||
    (notes ?? "") !== (savedStep?.notes ?? "");

  const checklistTotal = step.checklist?.length ?? 0;
  const checklistDone = step.checklist
    ? step.checklist.filter((_, i) => formData[`chk_${i}`] === "1").length
    : 0;
  const checklistPct = checklistTotal > 0 ? Math.round((checklistDone / checklistTotal) * 100) : 0;

  const gamState = readGamification(user?.id);
  const lvlInfo = getLevelInfo(gamState.xp);

  const savedFieldCount = Object.entries(formData).filter(
    ([k, v]) => !k.startsWith("chk_") && v !== undefined && v !== null && String(v).trim() !== "",
  ).length;

  const saveStep = async (status: "pending" | "done", autosave = false): Promise<boolean> => {
    if (!user) return false;
    if (status === "done" && missingRequired.length > 0) {
      setActiveTab("werkzeug");
      toast.info(`Bitte fülle zuerst noch aus: ${missingRequired.join(", ")}`);
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
          toast.success(`+${reward.earnedXp} XP · Lektion ${activeIndex + 1} abgeschlossen!`);
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
  const currentDone = steps[activeIndex]?.status === "done";
  const hasNotesTabTips = Boolean(step.extendedNotes && step.extendedNotes.length > 0);
  const shortCost = (() => {
    const raw = step.estCost?.trim();
    if (!raw) return null;
    const parenMatch = raw.match(/^([^(]+?)\s*\(([^)]*)\)/);
    if (parenMatch) {
      const base = parenMatch[1].trim();
      const inner = parenMatch[2].split("·")[0].trim();
      if (inner.length <= 16 && !inner.includes(",")) return `${base} (${inner})`;
      return base;
    }
    const part = raw.split("·")[0].trim();
    return part.length > 28 ? `${part.slice(0, 27).trimEnd()}…` : part;
  })();

  const tabs: { id: LessonTab; label: string; icon: typeof ClipboardList; badge?: string }[] = [
    {
      id: "umsetzen",
      label: "Umsetzen",
      icon: ClipboardList,
      badge: checklistTotal > 0 ? `${checklistDone}/${checklistTotal}` : undefined,
    },
    ...(workspaceMeta.hasWorkspace
      ? [{ id: "werkzeug" as const, label: workspaceMeta.label.length > 20 ? "Arbeitsfenster" : workspaceMeta.label, icon: Wrench, badge: savedFieldCount > 0 ? `${savedFieldCount}` : undefined }]
      : []),
    ...(hasNotesTabTips
      ? [{ id: "tipps" as const, label: "Tipps", icon: Lightbulb, badge: String(step.extendedNotes!.length) }]
      : []),
    ...(miniCheck
      ? [{ id: "check" as const, label: "Kurz-Check", icon: Sparkles, badge: miniAnswer !== null ? "✓" : "+25 XP" }]
      : []),
    {
      id: "notizen",
      label: "Notizen",
      icon: NotebookPen,
      badge: notes.trim() || (!workspaceMeta.hasWorkspace && savedFieldCount > 0) ? "✓" : undefined,
    },
  ];

  const lessonKindLabel = workspaceMeta.hasWorkspace
    ? "Arbeitsfenster"
    : step.checklist && step.checklist.length > 0
      ? "Umsetzung"
      : STEP_KIND_LABEL[step.kind];

  /* Saubere Udemy-Kursinhalts-Liste (RECHTS auf Desktop — KEIN line-through, 2-zeilige lesbare Titel!) */
  const CurriculumList = (
    <ol className="divide-y divide-border/60">
      {pb.steps.map((s, i) => {
        const done = steps[i]?.status === "done";
        const active = i === activeIndex;
        return (
          <li key={s.slug}>
            <button
              ref={active ? activeCurriculumRef : undefined}
              type="button"
              onClick={() => void goToStep(i)}
              aria-current={active ? "step" : undefined}
              className={cn(
                "relative flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                active ? "bg-accent/70" : "hover:bg-secondary/45",
              )}
            >
              {active && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-primary" />}
              <span className="mt-0.5 shrink-0">
                {done ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden="true" />
                  </span>
                ) : active ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white tabular">
                    {i + 1}
                  </span>
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-white text-[11px] font-semibold text-muted-foreground tabular">
                    {i + 1}
                  </span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "line-clamp-2 text-[13px] leading-snug",
                    active ? "font-bold text-primary" : done ? "font-medium text-foreground/85" : "font-medium text-foreground",
                  )}
                >
                  {s.title}
                </span>
                <span className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground tabular">
                  <span>{s.estMinutes} Min.</span>
                  {done && <span className="font-semibold text-brand-green">Erledigt</span>}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );

  return (
    <div ref={activeStepRef} className="min-h-screen overflow-x-clip bg-background pb-36 md:pb-16">
      {/* Schlanker Studyflix × Udemy Kurs-Header mit feiner Fortschrittslinie (1 Zeile auch mobil!) */}
      <div className="relative border-b border-border bg-white">
        <div className="container max-w-6xl px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <Link
                to="/playbooks"
                aria-label="Zurück zu allen Kursen"
                className="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-[10px] border border-border bg-white px-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/35 hover:text-primary"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Alle Kurse</span>
              </Link>
              <div className="min-w-0">
                <h1 className="truncate text-sm font-bold tracking-tight text-primary sm:text-base">{pb.title}</h1>
                <p className="truncate text-[11px] font-medium text-muted-foreground tabular">
                  {fertig ? "Kurs abgeschlossen" : `${completedCount} von ${pb.steps.length} Lektionen · noch ca. ${remainingLabel}`}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-xs font-semibold tabular">
              {gamState.streak > 0 && (
                <span className="hidden items-center gap-1 rounded-[10px] bg-secondary px-2.5 py-1 text-amber-700 md:inline-flex">
                  <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                  {gamState.streak} T
                </span>
              )}
              <span className="hidden items-center gap-1.5 rounded-[10px] bg-brand-green-soft px-2.5 py-1 text-brand-green lg:inline-flex">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                {progress} % erledigt
              </span>
              <button
                type="button"
                onClick={() => setChaptersOpen(true)}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[10px] border border-border bg-white px-2.5 text-xs font-semibold text-primary hover:bg-secondary lg:hidden"
              >
                <List className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Kursinhalt</span>
                <span>{activeIndex + 1}/{pb.steps.length}</span>
              </button>
            </div>
          </div>
        </div>
        {/* Durchgehende dünne Fortschrittslinie wie bei Studyflix / Revolut */}
        <div className="h-1 w-full bg-secondary" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Kursfortschritt">
          <div className="h-full bg-brand-green transition-[width] duration-300" style={{ width: `${Math.max(progress, 3)}%` }} />
        </div>
      </div>

      {/* Hauptlayout im echten Udemy-Stil: Breite Lektions-Bühne LINKS + ruhiger Kursinhalt RECHTS */}
      <div className="container max-w-6xl px-4 pt-5 md:px-6 md:pt-6">
        {fertig && (
          <section className="mb-5 rounded-2xl border border-brand-green/35 bg-brand-green-soft/45 p-5 shadow-card md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green text-white">
                  <Trophy className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-brand-green">Ziel erreicht · +{pb.steps.length * 100 + 250} XP</p>
                  <h2 className="mt-0.5 text-lg font-bold tracking-tight text-primary">Kurs komplett abgeschlossen!</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{pb.outcome}</p>
                </div>
              </div>
              <Button asChild size="sm" className="press rounded-[10px]">
                <Link to="/playbooks">
                  Nächsten Kurs wählen <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </section>
        )}

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* LINKS: Moderne Studyflix × Udemy Lektion */}
          <article className="min-w-0 overflow-hidden rounded-2xl border border-border bg-white shadow-card">
            {/* Studyflix-Lektionsbühne mit dezentem Pastell-Themenband */}
            <header className="border-b border-border">
              <div className={cn("flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 px-5 py-2.5 text-xs font-semibold sm:px-7", theme.bandBg)}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("inline-flex items-center gap-1.5", theme.pillText)}>
                    <ThemeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    Lektion {activeIndex + 1} von {pb.steps.length}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-foreground/80">{lessonKindLabel}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-foreground/80 tabular">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    ca. {step.estMinutes} Min.
                  </span>
                  {shortCost && (
                    <span className="inline-flex items-center gap-1">
                      <Wallet className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      {shortCost}
                    </span>
                  )}
                  {currentDone && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 font-bold text-brand-green shadow-sm">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Erledigt
                    </span>
                  )}
                </div>
              </div>

              <div className="px-5 py-4 sm:px-7 sm:py-5">
                <h2 className="text-balance text-xl font-bold leading-tight tracking-[-0.025em] text-primary sm:text-[1.65rem]">
                  {step.title}
                </h2>
                {step.description && (
                  <p className="mt-2 max-w-[66ch] text-sm leading-[1.65] text-foreground/85 sm:text-[15px]">
                    {step.description}
                  </p>
                )}

                {/* Ruhiger Lexoffice × Revolut Hinweis-Callout (ohne abgeschnittenen linken Randbalken) */}
                {step.warning && (
                  <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-danger/20 bg-[#FEF6F6] px-3.5 py-3 text-xs leading-relaxed text-foreground sm:text-[13px]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-danger/10 text-danger" aria-hidden="true">
                      <AlertTriangle className="h-3.5 w-3.5" />
                    </span>
                    <p className="min-w-0">
                      <span className="font-bold text-foreground">Wichtig: </span>
                      <span className="text-foreground/85">{step.warning}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Udemy-Stil Lektions-Tabs direkt unter der Lektionsbühne */}
              <nav
                aria-label="Lektions-Bereiche"
                className="flex gap-1 overflow-x-auto border-t border-border/80 bg-[#FAFBFD] px-3 pt-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6"
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-semibold transition-colors sm:px-3.5 sm:text-[13px]",
                        active
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-primary",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{tab.label}</span>
                      {tab.badge && (
                        <span
                          className={cn(
                            "rounded-[6px] px-1.5 py-0.5 text-[10px] font-bold tabular",
                            active
                              ? "bg-primary/10 text-primary"
                              : tab.id === "check" && miniAnswer === null
                                ? "bg-brand-green-soft text-brand-green"
                                : "bg-secondary text-muted-foreground",
                          )}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </header>

            {/* Lektions-Inhalt je aktivem Tab */}
            <div className="p-5 sm:p-6">
              {detailLoading ? (
                <div className="space-y-3" aria-busy="true">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden="true" />
                    Lektion wird geladen…
                  </p>
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              ) : (
                <>
                  {/* TAB 1: UMSETZEN */}
                  {activeTab === "umsetzen" && (
                    <div className="space-y-5">
                      {/* Spezial-Werkzeug-Einstieg (nur wenn echtes Widget/Felder vorhanden) */}
                      {workspaceMeta.hasWorkspace && (
                        <div className="flex flex-col gap-3 rounded-2xl border border-primary/20 bg-[#F4F7FC] p-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex min-w-0 items-start gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                              <Wrench className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-primary">{workspaceMeta.label}</p>
                              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{workspaceMeta.subtitle}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => setActiveTab("werkzeug")}
                            className="press h-10 shrink-0 gap-1.5 rounded-[10px] bg-primary px-4 text-xs font-semibold text-white hover:bg-primary/90"
                          >
                            Direkt bearbeiten <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </Button>
                        </div>
                      )}

                      {/* Einheitliche, ruhige Revolut-Aufgabenkarte mit knackigen eckigen Checkboxen */}
                      {step.checklist && step.checklist.length > 0 && (
                        <section aria-label="Aufgaben in dieser Lektion" className="overflow-hidden rounded-xl border border-border bg-white">
                          <div className="border-b border-border bg-[#F8FAFC] px-4 py-3 sm:px-5">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                                Aufgaben
                              </h3>
                              <span
                                className={cn(
                                  "shrink-0 whitespace-nowrap text-xs font-bold tabular",
                                  checklistDone === checklistTotal ? "text-brand-green" : "text-muted-foreground",
                                )}
                              >
                                {checklistDone} von {checklistTotal} erledigt
                              </span>
                            </div>
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                              <div
                                className="h-full rounded-full bg-brand-green transition-[width] duration-300"
                                style={{ width: `${checklistPct}%` }}
                              />
                            </div>
                          </div>

                          <ul className="divide-y divide-border/70">
                            {step.checklist.map((c, i) => {
                              const checked = formData[`chk_${i}`] === "1";
                              return (
                                <li key={i}>
                                  <button
                                    type="button"
                                    aria-pressed={checked}
                                    onClick={() => setFormData({ ...formData, [`chk_${i}`]: checked ? "" : "1" })}
                                    className={cn(
                                      "group flex min-h-12 w-full items-start gap-3.5 px-4 py-3 text-left transition-colors sm:px-5",
                                      checked ? "bg-brand-green-soft/35" : "hover:bg-secondary/35",
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border-[1.5px] transition-colors",
                                        checked
                                          ? "border-brand-green bg-brand-green text-white"
                                          : "border-primary/30 bg-white group-hover:border-primary/65",
                                      )}
                                      aria-hidden="true"
                                    >
                                      {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                                    </span>
                                    <span
                                      className={cn(
                                        "text-sm leading-relaxed",
                                        checked ? "text-muted-foreground" : "font-medium text-foreground",
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

                      {/* Offizielle Portale & Direkt-Links */}
                      {step.externalLinks && step.externalLinks.length > 0 && (
                        <section aria-label="Offizielle Links">
                          <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Portale &amp; Vorlagen direkt öffnen
                          </h3>
                          <div className="grid gap-2.5 sm:grid-cols-2">
                            {step.externalLinks.map((l) => (
                              <AnbieterLink
                                key={l.url}
                                url={l.url}
                                ort="playbook"
                                className="press group flex min-h-12 items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3 transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-sm"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-primary group-hover:text-accent-blue">{l.label}</p>
                                  <p className="truncate text-[11px] text-muted-foreground">{getDomain(l.url)}</p>
                                </div>
                                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                              </AnbieterLink>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Kompakter Hinweis bei offenen Pflichtfeldern */}
                      {missingRequired.length > 0 && (
                        <div className="flex items-start gap-2.5 rounded-xl border border-warning/35 bg-warning-soft p-3.5 text-sm">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-warning/15 text-amber-800" aria-hidden="true">
                            <Info className="h-3.5 w-3.5" />
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground">
                              Vor dem Abschließen noch ausfüllen: {missingRequired.join(", ")}
                            </p>
                            <button
                              type="button"
                              onClick={() => setActiveTab("werkzeug")}
                              className="mt-1 text-xs font-bold text-primary underline hover:text-accent-blue"
                            >
                              Jetzt im Tab „Arbeitsfenster“ ausfüllen →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Ruhige Hilfe-Zeile ganz unten */}
                      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-[#FAFBFD] px-4 py-3 text-xs">
                        <span className="text-muted-foreground">Noch eine Rückfrage zu diesem Schritt?</span>
                        <div className="flex flex-wrap items-center gap-2">
                          {miniCheck && miniAnswer === null && (
                            <Button type="button" variant="outline" size="sm" onClick={() => setActiveTab("check")} className="h-8 rounded-lg bg-white text-xs font-semibold text-brand-green">
                              <Sparkles className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> Kurz-Check (+25 XP)
                            </Button>
                          )}
                          <Button asChild variant="outline" size="sm" className="h-8 rounded-lg bg-white text-xs font-semibold">
                            <Link to={`/felix?frage=${encodeURIComponent(`Hilf mir kurz bei Schritt "${step.title}" im Kurs "${pb.title}"`)}`}>
                              <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                              Felix fragen
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: WERKZEUG / ARBEITSFENSTER INLINE */}
                  {activeTab === "werkzeug" && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-base font-bold text-primary">{workspaceMeta.label}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">{workspaceMeta.subtitle}</p>
                      </div>
                      <WorkspaceBody
                        guideSlug={slug}
                        step={step}
                        formData={formData}
                        setFormData={setFormData}
                        runCtx={runCtx}
                        updateRunCtx={updateRunCtx}
                      />
                      <div className="flex justify-end gap-2 border-t border-border pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-xl"
                          onClick={async () => {
                            const ok = await saveStep(savedStep?.status === "done" ? "done" : "pending");
                            if (ok) toast.success("Eingaben im Kurs gespeichert.");
                          }}
                          disabled={saving}
                        >
                          {saving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden="true" />}
                          Eingaben speichern
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: PRAXIS-TIPPS (Studyflix Takeaway-Karten) */}
                  {activeTab === "tipps" && step.extendedNotes && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Praxis-Hinweise &amp; typische Stolpersteine
                      </h3>
                      <ol className="space-y-2.5">
                        {step.extendedNotes.map((n, i) => (
                          <li key={i} className="flex items-start gap-3 rounded-xl border border-border bg-[#FAFBFD] p-4 text-sm leading-relaxed text-foreground">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent text-xs font-bold text-primary tabular">
                              {i + 1}
                            </span>
                            <span>{n}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* TAB 4: STUDYFLIX KURZ-CHECK (+25 XP) */}
                  {activeTab === "check" && miniCheck && (
                    <section className="space-y-4" aria-label="Kurzer Wissenscheck">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-green-soft px-2.5 py-1 text-xs font-bold text-brand-green">
                          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                          Wissens-Check · +25 Bonus-XP
                        </span>
                        {miniAnswer !== null && (
                          <span className="text-xs font-semibold text-brand-green">Beantwortet</span>
                        )}
                      </div>
                      <h3 className="text-base font-bold leading-snug text-primary">{miniCheck.frage}</h3>
                      <div className="space-y-2.5">
                        {miniCheck.optionen.map((opt, idx) => {
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
                                "press flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                                showOk
                                  ? "border-brand-green bg-brand-green-soft/75 text-foreground"
                                  : showBad
                                    ? "border-danger bg-danger-soft text-foreground"
                                    : "border-border bg-white hover:border-primary/40 hover:bg-secondary/35",
                              )}
                            >
                              <span>{opt.label}</span>
                              {showOk && <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />}
                            </button>
                          );
                        })}
                      </div>
                      {miniAnswer !== null && (
                        <div className="rounded-xl border border-border bg-[#F8FAFC] p-4 text-sm leading-relaxed text-foreground/90">
                          {miniCheck.erklaerung}
                        </div>
                      )}
                    </section>
                  )}

                  {/* TAB 5: NOTIZEN & EIGENE ECKDATEN INLINE */}
                  {activeTab === "notizen" && (
                    <div className="space-y-5">
                      <Field label="Deine persönlichen Notizen zu dieser Lektion" htmlFor="pb-notizen-inline">
                        <Textarea
                          id="pb-notizen-inline"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={4}
                          placeholder="Ansprechpartner, Aktenzeichen, nächste Termine oder offene Fragen …"
                          className="rounded-xl"
                        />
                      </Field>

                      {!workspaceMeta.hasWorkspace && (
                        <WorkspaceBody
                          guideSlug={slug}
                          step={step}
                          formData={formData}
                          setFormData={setFormData}
                          runCtx={runCtx}
                          updateRunCtx={updateRunCtx}
                        />
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                        <Link
                          to={`/felix?frage=${encodeURIComponent(`Hilf mir kurz bei Schritt "${step.title}" im Kurs "${pb.title}"`)}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:underline"
                        >
                          <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                          Frage an Felix zu diesem Schritt stellen
                        </Link>
                        <Button
                          type="button"
                          className="press rounded-xl"
                          disabled={saving}
                          onClick={async () => {
                            const ok = await saveStep(savedStep?.status === "done" ? "done" : "pending");
                            if (ok) toast.success("Notiz & Daten gespeichert.");
                          }}
                        >
                          {saving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden="true" />}
                          Speichern
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Ruhiger Desktop Footer */}
            <footer className="hidden items-center justify-between gap-3 border-t border-border bg-[#FAFBFD] px-6 py-4 md:flex">
              <Button
                variant="outline"
                onClick={() => void goToStep(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="min-h-11 rounded-xl bg-white"
              >
                <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Vorherige Lektion
              </Button>
              <div className="flex items-center gap-2.5">
                <Button variant="ghost" onClick={() => void saveStep("pending")} disabled={saving} className="min-h-11 rounded-xl text-muted-foreground hover:text-primary">
                  Zwischenspeichern
                </Button>
                <Button
                  onClick={() => void saveStep("done")}
                  disabled={saving || detailLoading}
                  className="press min-h-11 gap-2 rounded-xl bg-primary px-5 font-semibold text-white hover:bg-primary/90"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
                  {currentDone ? "Weiter zur nächsten Lektion" : "Lektion erledigt (+100 XP)"}
                </Button>
              </div>
            </footer>
          </article>

          {/* RECHTS: Ruhige Udemy-Kursinhalt-Sidebar (KEINE doppelte linke Sidebar mehr!) */}
          <aside className="hidden overflow-hidden rounded-2xl border border-border bg-white shadow-card lg:sticky lg:top-20 lg:block">
            <div className="border-b border-border bg-[#F8FAFC] px-4 py-3.5">
              <div className="flex items-center justify-between text-xs font-bold text-primary">
                <span>Kursinhalt</span>
                <span className="text-brand-green tabular">{progress} % ({completedCount}/{pb.steps.length})</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-brand-green transition-[width] duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">{CurriculumList}</div>
          </aside>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div
        className="fixed inset-x-0 bottom-14 z-30 border-t border-border bg-white px-3 py-2.5 md:hidden"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => void goToStep(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            aria-label="Vorherige Lektion"
            className="h-11 w-11 shrink-0 rounded-xl"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Button
            onClick={() => void saveStep("done")}
            disabled={saving || detailLoading}
            className="press h-11 flex-1 gap-1.5 rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
            {currentDone ? "Nächste Lektion" : "Erledigt (+100 XP)"}
          </Button>
        </div>
      </div>

      {/* Mobile Kursinhalt-Sheet */}
      <Sheet open={chaptersOpen} onOpenChange={setChaptersOpen}>
        <SheetContent side="bottom" className="max-h-[82vh] overflow-y-auto rounded-t-2xl p-0">
          <SheetHeader className="border-b border-border px-5 py-4 text-left">
            <SheetTitle>Kursinhalt ({completedCount}/{pb.steps.length})</SheetTitle>
            <SheetDescription>{pb.title}</SheetDescription>
          </SheetHeader>
          {CurriculumList}
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
                  className="rounded-xl"
                />
              ) : (
                <Input
                  id={`pb-f-${f.name}`}
                  type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                  value={formData[f.name] ?? ""}
                  onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                  className="h-11 rounded-xl"
                />
              )}
            </Field>
          ))}
        </div>
      )}
      {!hasSpecializedWidget && (
        <div className="space-y-4 rounded-2xl border border-border bg-[#F8FAFC] p-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Optional: Halte Anbieter, Termin oder Aktenzeichen für <strong className="text-foreground">{step.title}</strong> fest.
          </p>
          <Field label="Anbieter, Portal oder Lösung" htmlFor="pb-ws-provider">
            <Input
              id="pb-ws-provider"
              value={formData.ws_provider ?? ""}
              onChange={(e) => setFormData({ ...formData, ws_provider: e.target.value })}
              placeholder="z. B. Anbietername, Domain oder Behörde"
              className="h-11 rounded-xl bg-white"
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Zieldatum" htmlFor="pb-ws-date">
              <Input
                id="pb-ws-date"
                type="date"
                value={formData.ws_date ?? ""}
                onChange={(e) => setFormData({ ...formData, ws_date: e.target.value })}
                className="h-11 rounded-xl bg-white"
              />
            </Field>
            <Field label="Kosten (optional)" htmlFor="pb-ws-cost">
              <Input
                id="pb-ws-cost"
                value={formData.ws_cost ?? ""}
                onChange={(e) => setFormData({ ...formData, ws_cost: e.target.value })}
                placeholder="z. B. 0 € oder 29 €"
                className="h-11 rounded-xl bg-white"
              />
            </Field>
          </div>
          <Field label="Link, Aktenzeichen oder Entscheidung" htmlFor="pb-ws-ref">
            <Textarea
              id="pb-ws-ref"
              value={formData.ws_ref ?? ""}
              onChange={(e) => setFormData({ ...formData, ws_ref: e.target.value })}
              rows={2}
              placeholder="Link zum Portal, Bestätigungsnummer oder dein nächster konkreter Schritt …"
              className="rounded-xl bg-white"
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
