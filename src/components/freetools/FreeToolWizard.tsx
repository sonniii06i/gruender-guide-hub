import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Download,
  FileText,
  Lock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import type { FieldDef, ToolConfig, ToolData } from "@/lib/freetools/types";
import { downloadDocumentPdf } from "@/lib/freetools/pdf";
import { EmailGateDialog } from "./EmailGateDialog";
import { TrialUpsell } from "./ToolTrial";
import { isToolUnlockedLocally } from "@/lib/freetools/leads";
import { useAccess } from "@/hooks/useAccess";

interface FreeToolWizardProps {
  config: ToolConfig;
}

function isVisible(field: FieldDef, data: ToolData): boolean {
  return !field.condition || field.condition(data);
}

export function FreeToolWizard({ config }: FreeToolWizardProps) {
  const { user } = useAuth();
  // Abo-Erkennung wie auf den Probier-Seiten der Checks (ToolTrialPage):
  // aktives/laufendes Abo, Gratis-Zugang (comp_access) oder Admin. Ein bloßes
  // Login zählt nicht — ein gekündigtes Konto bekommt ebenfalls nur die eine
  // kostenlose Nutzung.
  const { loading: accessLoading, hasActiveSub, isAdmin } = useAccess();
  const subscriber = Boolean(user) && (hasActiveSub || isAdmin);

  const [data, setData] = useState<ToolData>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  // Eine kostenlose Nutzung je Generator (Slug) und Browser: Das erste fertige
  // Ergebnis gibt es gegen die E-Mail-Adresse; gemerkt wird das unter
  // `gruenderx:tool-unlocked:<slug>` (dieselbe Konvention wie bei den Checks).
  // Ab dem zweiten Durchlauf kommt statt des Ergebnisses der Abo-Hinweis.
  // Bewusst ein weicher Schutz (localStorage), kein Zugriffsschutz.
  const [unlocked, setUnlocked] = useState(false);
  const [spent, setSpent] = useState(() => isToolUnlockedLocally(config.slug));
  // Das freigeschaltete erste Ergebnis — bleibt ansehbar, solange es im State liegt.
  const [freeDoc, setFreeDoc] = useState<string | null>(null);

  const totalSteps = config.steps.length;
  const isLastStep = stepIndex === totalSteps - 1;
  const step = config.steps[stepIndex];

  const gated = config.gated !== false;
  const isUnlocked = !gated || subscriber || unlocked;
  const limited = gated && !subscriber;

  const document = useMemo(() => {
    if (!showResult) return "";
    if (limited && freeDoc !== null) return freeDoc;
    return config.generate(data);
  }, [showResult, limited, freeDoc, data, config]);

  const setField = (name: string, value: string | boolean) =>
    setData((prev) => ({ ...prev, [name]: value }));

  const validateStep = (): boolean => {
    for (const field of step.fields) {
      if (!isVisible(field, data)) continue;
      if (field.required) {
        const v = data[field.name];
        const empty = field.type === "checkbox" ? v !== true : !(typeof v === "string" && v.trim());
        if (empty) {
          toast.error(`„${field.label}" wird benötigt.`);
          return false;
        }
      }
    }
    return true;
  };

  const showFreeDoc = () => {
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = () => {
    if (!validateStep()) return;
    if (isLastStep) {
      if (gated && user && accessLoading) {
        toast("Dein Zugang wird noch geprüft – bitte gleich noch einmal klicken.");
        return;
      }
      // Zweiter Durchlauf (auch nach „Angaben ändern") nur mit Abo.
      if (limited && (spent || unlocked)) {
        setSpent(true);
        toast(`Deine kostenlose Nutzung von „${config.shortTitle}" ist aufgebraucht.`, {
          description: "Mit dem GründerX-Abo nutzt du alle Generatoren unbegrenzt.",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (!isUnlocked) setGateOpen(true);
      return;
    }
    setStepIndex((i) => i + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    if (showResult) {
      setShowResult(false);
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const copyDoc = async () => {
    await navigator.clipboard.writeText(document);
    toast.success(`${config.documentName} in die Zwischenablage kopiert.`);
  };

  const downloadPdf = () => {
    downloadDocumentPdf(document, config.resultFilename);
    toast.success(`${config.documentName} wurde als PDF heruntergeladen.`);
  };

  const downloadTxt = () => {
    const blob = new Blob([document], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${config.resultFilename}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Ergebnis-Ansicht ──────────────────────────────────────────────
  if (showResult) {
    const preview = isUnlocked ? document : document.split("\n").slice(0, 14).join("\n");

    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-6 flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success-soft text-success">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Fertig: {config.documentName}
          </h2>
          <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
            {isUnlocked
              ? "Kopiere den Text oder lade ihn als PDF herunter."
              : "Gib deine E-Mail-Adresse an, um das vollständige Ergebnis anzusehen und herunterzuladen – kostenlos, ohne Konto."}
          </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <div className="flex items-center gap-2 border-b border-border/70 bg-secondary/40 px-5 py-3 text-sm font-medium md:px-6">
            <FileText className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            {config.documentName}
          </div>
            <div className="relative">
              <pre className="whitespace-pre-wrap break-words p-5 font-sans text-sm leading-relaxed text-foreground md:p-6">
                {preview}
              </pre>
              {!isUnlocked && (
                <div className="absolute inset-x-0 bottom-0 flex h-64 items-end justify-center bg-gradient-to-t from-card via-card/95 to-transparent px-4 pb-8">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-blue">
                      <Lock className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className="mb-1 text-sm font-semibold text-foreground">
                      Vollständiges Ergebnis gesperrt
                    </p>
                    <p className="mx-auto mb-4 max-w-xs text-sm text-muted-foreground">
                      Kostenlos gegen deine E-Mail-Adresse – eine Nutzung, kein Konto, keine Zahlung.
                    </p>
                    <Button onClick={() => setGateOpen(true)} className="bg-gradient-primary font-semibold hover:opacity-95">
                      <Lock className="mr-2 h-4 w-4" />
                      Kostenlos freischalten
                    </Button>
                  </div>
                </div>
              )}
            </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="outline" onClick={back} className="sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Angaben ändern
          </Button>
          {isUnlocked ? (
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <Button variant="ghost" size="sm" onClick={downloadTxt} className="text-muted-foreground">
                <FileText className="mr-2 h-4 w-4" />
                .txt
              </Button>
              <Button variant="outline" onClick={copyDoc}>
                <Copy className="mr-2 h-4 w-4" />
                Kopieren
              </Button>
              <Button onClick={downloadPdf} className="bg-gradient-primary font-semibold hover:opacity-95">
                <Download className="mr-2 h-4 w-4" />
                Als PDF herunterladen
              </Button>
            </div>
          ) : (
            <Button onClick={() => setGateOpen(true)} className="bg-gradient-primary font-semibold hover:opacity-95 sm:ml-auto">
              <Lock className="mr-2 h-4 w-4" />
              Kostenlos freischalten
            </Button>
          )}
        </div>

        {limited && isUnlocked && (
          <div className="mt-8">
            <TrialUpsell tool={{ name: config.shortTitle }} variant="after" noun="Nutzung" />
          </div>
        )}

        <EmailGateDialog
          open={gateOpen}
          onOpenChange={setGateOpen}
          onUnlocked={() => {
            setUnlocked(true);
            setSpent(true);
            setFreeDoc(document);
            setGateOpen(false);
          }}
          resultName={config.documentName}
          slug={config.slug}
          singleUse
        />
      </div>
    );
  }

  // ── Wizard-Ansicht ────────────────────────────────────────────────
  const progress = ((stepIndex + 1) / (totalSteps + 1)) * 100;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6">
      {limited && spent && (
        <div className="mb-8">
          <TrialUpsell tool={{ name: config.shortTitle }} variant="spent" noun="Nutzung" />
          {freeDoc !== null && (
            <div className="mt-3 text-center">
              <Button variant="outline" onClick={showFreeDoc}>
                <FileText className="mr-2 h-4 w-4" />
                Dein erstes Ergebnis wieder ansehen
              </Button>
            </div>
          )}
        </div>
      )}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="border-b border-border/70 px-5 pb-4 pt-5 sm:px-7">
          <div className="mb-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
            <span className="font-medium tabular text-foreground">
              Schritt {stepIndex + 1} von {totalSteps}
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" /> {subscriber ? "Unbegrenzt im Abo" : "1 kostenlose Nutzung, nur E-Mail"}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
          <ol className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2">
            {config.steps.map((st, i) => (
              <li key={st.title} className="flex items-center gap-1.5 text-xs">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold tabular ${
                    i < stepIndex
                      ? "bg-success-soft text-success"
                      : i === stepIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i < stepIndex ? <Check className="h-3 w-3" aria-hidden="true" /> : i + 1}
                </span>
                <span className={i === stepIndex ? "font-medium text-foreground" : "hidden text-muted-foreground sm:inline"}>
                  {st.title}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="p-5 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">{step.title}</h2>
          {step.subtitle && <p className="mt-1 text-sm text-muted-foreground">{step.subtitle}</p>}

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
            {step.fields.filter((f) => isVisible(f, data)).map((field) => (
              <FieldRenderer
                key={field.name}
                field={field}
                value={data[field.name]}
                onChange={(v) => setField(field.name, v)}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="mt-5 flex gap-3">
        {stepIndex > 0 && (
          <Button variant="outline" onClick={back}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
        )}
        <Button onClick={next} className="ml-auto rounded-xl bg-gradient-primary font-semibold hover:opacity-95" size="lg">
          {isLastStep ? (
            <>
              {config.documentName} erstellen
              <Sparkles className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Weiter
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

interface FieldRendererProps {
  field: FieldDef;
  value: string | boolean | undefined;
  onChange: (value: string | boolean) => void;
}

function FieldRenderer({ field, value, onChange }: FieldRendererProps) {
  const span = field.colSpan === 1 ? "col-span-2 sm:col-span-1" : "col-span-2";

  if (field.type === "checkbox") {
    return (
      <div className={span}>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-input p-3.5 transition-colors hover:border-foreground/25">
          <Checkbox checked={value === true} onCheckedChange={(v) => onChange(v === true)} className="mt-0.5" />
          <span className="text-sm text-foreground">{field.label}</span>
        </label>
        {field.help && <p className="mt-1.5 text-xs text-muted-foreground">{field.help}</p>}
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div className={span}>
        <Label className="mb-1.5 block font-medium">
          {field.label}
          {field.required && <span className="text-danger"> *</span>}
        </Label>
        <div className="space-y-2">
          {field.options?.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-colors ${
                value === opt.value ? "border-primary bg-accent" : "border-input hover:border-foreground/25"
              }`}
            >
              <input
                type="radio"
                name={field.name}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="accent-[hsl(var(--primary))]"
              />
              <span className="text-sm text-foreground">{opt.label}</span>
            </label>
          ))}
        </div>
        {field.help && <p className="mt-1.5 text-xs text-muted-foreground">{field.help}</p>}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className={span}>
        <Label className="mb-1.5 block font-medium">
          {field.label}
          {field.required && <span className="text-danger"> *</span>}
        </Label>
        {/* form: Radix rendert das versteckte native <select> im ersten Render
            immer, entfernt es nach dem Mount aber, wenn kein <form> drumherum
            liegt. Der Prerender griff den Zustand danach ab -> Hydration-Mismatch
            (React #418) auf jeder Gratis-Tool-Seite. Mit gesetztem `form` bleibt
            es stehen; die ID gibt es nicht, also hängt es an keinem Formular. */}
        <Select
          value={typeof value === "string" ? value : ""}
          onValueChange={(v) => onChange(v)}
          form="freetool-wizard-ohne-formular"
        >
          <SelectTrigger>
            <SelectValue placeholder="Bitte wählen …" />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {field.help && <p className="mt-1.5 text-xs text-muted-foreground">{field.help}</p>}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={span}>
        <Label className="mb-1.5 block font-medium">
          {field.label}
          {field.required && <span className="text-danger"> *</span>}
        </Label>
        <Textarea
          placeholder={field.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
        {field.help && <p className="mt-1.5 text-xs text-muted-foreground">{field.help}</p>}
      </div>
    );
  }

  return (
    <div className={span}>
      <Label className="mb-1.5 block font-medium">
        {field.label}
        {field.required && <span className="text-danger"> *</span>}
      </Label>
      <Input
        type={field.type}
        placeholder={field.placeholder}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {field.help && <p className="mt-1.5 text-xs text-muted-foreground">{field.help}</p>}
    </div>
  );
}
