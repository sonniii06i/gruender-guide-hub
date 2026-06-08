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
import { Card, CardContent } from "@/components/ui/card";
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
import { AccountGateDialog } from "./AccountGateDialog";

interface FreeToolWizardProps {
  config: ToolConfig;
}

function isVisible(field: FieldDef, data: ToolData): boolean {
  return !field.condition || field.condition(data);
}

export function FreeToolWizard({ config }: FreeToolWizardProps) {
  const { user } = useAuth();
  const [data, setData] = useState<ToolData>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const totalSteps = config.steps.length;
  const isLastStep = stepIndex === totalSteps - 1;
  const step = config.steps[stepIndex];

  const gated = config.gated !== false;
  const isUnlocked = !gated || Boolean(user) || unlocked;

  const document = useMemo(
    () => (showResult ? config.generate(data) : ""),
    [showResult, data, config]
  );

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

  const next = () => {
    if (!validateStep()) return;
    if (isLastStep) {
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-7 w-7 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Dein {config.documentName} ist fertig
          </h2>
          <p className="text-muted-foreground mt-2">
            {isUnlocked
              ? "Kopiere den Text oder lade ihn als PDF herunter."
              : "Erstelle ein kostenloses Konto, um das vollständige Ergebnis anzusehen und herunterzuladen."}
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground p-6 font-sans">
                {preview}
              </pre>
              {!isUnlocked && (
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/95 to-transparent flex items-end justify-center pb-8">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Vollständiges Ergebnis gesperrt
                    </p>
                    <p className="text-xs text-muted-foreground mb-4 max-w-xs mx-auto">
                      100 % kostenlos – du brauchst nur ein kostenloses Konto.
                    </p>
                    <Button onClick={() => setGateOpen(true)}>
                      <Lock className="mr-2 h-4 w-4" />
                      Kostenlos freischalten
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button variant="outline" onClick={back} className="sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Angaben ändern
          </Button>
          {isUnlocked ? (
            <div className="flex flex-wrap gap-3 sm:ml-auto">
              <Button variant="ghost" size="sm" onClick={downloadTxt} className="text-muted-foreground">
                <FileText className="mr-2 h-4 w-4" />
                .txt
              </Button>
              <Button variant="outline" onClick={copyDoc}>
                <Copy className="mr-2 h-4 w-4" />
                Kopieren
              </Button>
              <Button onClick={downloadPdf}>
                <Download className="mr-2 h-4 w-4" />
                Als PDF herunterladen
              </Button>
            </div>
          ) : (
            <Button onClick={() => setGateOpen(true)} className="sm:ml-auto">
              <Lock className="mr-2 h-4 w-4" />
              Kostenlos freischalten
            </Button>
          )}
        </div>

        <AccountGateDialog
          open={gateOpen}
          onOpenChange={setGateOpen}
          onUnlocked={() => {
            setUnlocked(true);
            setGateOpen(false);
          }}
          documentName={config.documentName}
          prefill={{
            firstName: typeof data.founder === "string" ? data.founder.split(" ")[0] : "",
          }}
        />
      </div>
    );
  }

  // ── Wizard-Ansicht ────────────────────────────────────────────────
  const progress = ((stepIndex + 1) / (totalSteps + 1)) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-medium text-foreground">
            Schritt {stepIndex + 1} von {totalSteps}
          </span>
          <span className="text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> 100 % kostenlos
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex flex-wrap gap-2 mt-3">
          {config.steps.map((st, i) => (
            <div key={st.title} className="flex items-center gap-1.5 text-xs">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  i < stepIndex
                    ? "bg-green-100 text-green-700"
                    : i === stepIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < stepIndex ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span className={i === stepIndex ? "text-foreground font-medium" : "text-muted-foreground hidden sm:inline"}>
                {st.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-foreground mb-1">{step.title}</h2>
          {step.subtitle && <p className="text-sm text-muted-foreground mb-6">{step.subtitle}</p>}

          <div className="grid grid-cols-2 gap-4">
            {step.fields.filter((f) => isVisible(f, data)).map((field) => (
              <FieldRenderer
                key={field.name}
                field={field}
                value={data[field.name]}
                onChange={(v) => setField(field.name, v)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 mt-6">
        {stepIndex > 0 && (
          <Button variant="outline" onClick={back}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
        )}
        <Button onClick={next} className="ml-auto" size="lg">
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
        <label className="flex items-start gap-3 cursor-pointer rounded-lg border p-3 hover:bg-muted/40 transition-colors">
          <Checkbox checked={value === true} onCheckedChange={(v) => onChange(v === true)} className="mt-0.5" />
          <span className="text-sm text-foreground">{field.label}</span>
        </label>
        {field.help && <p className="text-xs text-muted-foreground mt-1 ml-1">{field.help}</p>}
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div className={span}>
        <Label className="mb-2 block">
          {field.label}
          {field.required && <span className="text-red-500"> *</span>}
        </Label>
        <div className="space-y-2">
          {field.options?.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-3 cursor-pointer rounded-lg border p-3 transition-colors ${
                value === opt.value ? "border-primary bg-primary/5" : "hover:bg-muted/40"
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
        {field.help && <p className="text-xs text-muted-foreground mt-1">{field.help}</p>}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className={span}>
        <Label className="mb-2 block">
          {field.label}
          {field.required && <span className="text-red-500"> *</span>}
        </Label>
        <Select value={typeof value === "string" ? value : ""} onValueChange={(v) => onChange(v)}>
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
        {field.help && <p className="text-xs text-muted-foreground mt-1">{field.help}</p>}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={span}>
        <Label className="mb-2 block">
          {field.label}
          {field.required && <span className="text-red-500"> *</span>}
        </Label>
        <Textarea
          placeholder={field.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
        {field.help && <p className="text-xs text-muted-foreground mt-1">{field.help}</p>}
      </div>
    );
  }

  return (
    <div className={span}>
      <Label className="mb-2 block">
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </Label>
      <Input
        type={field.type}
        placeholder={field.placeholder}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {field.help && <p className="text-xs text-muted-foreground mt-1">{field.help}</p>}
    </div>
  );
}
