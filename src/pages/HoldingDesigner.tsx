import { useMemo, useState, type ElementType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Callout, ChoiceGroup, EmptyState, Field, KitTable, ToneBadge, ToolSection } from "@/components/cockpit/kit";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  Calculator,
  ListChecks,
  Scale,
  LayoutGrid,
  Network,
  Wallet,
  Repeat,
  TrendingUp,
  Building2,
  Globe,
  BookOpen,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import {
  HOLDING_STRUCTURES,
  recommendStructures,
  type HoldingStructure,
  type WizardAnswers,
} from "@/data/holdingStructures";

const fett = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
const kurzKosten = (s: HoldingStructure) => s.setupCost.split("(")[0].trim().split("+")[0].trim();
const kurzAb = (s: HoldingStructure) => s.worthwhileFrom.split("/")[0].split("—")[0].trim();

const HoldingDesigner = () => {
  const [mode, setMode] = useState<"overview" | "wizard">("overview");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [selected, setSelected] = useState<HoldingStructure | null>(null);

  const recommendations = useMemo(() => recommendStructures(answers), [answers]);

  return (
    <CockpitShell
      eyebrow="Rechtsform & Struktur · Holding-Designer"
      title="Holding-Strukturen für deutsche Gründer"
      subtitle="Acht Holding-Strukturen, die in Deutschland legal sind und vom Mittelstand bis zum Startup tatsächlich genutzt werden: mit Steuereffekt, Sperrfristen und echten Beispielen."
    >
      {/* Ansicht wählen */}
      <div role="tablist" aria-label="Ansicht" className="mb-6 inline-flex rounded-xl border border-border bg-secondary/60 p-1">
        {[
          { key: "overview" as const, label: "Alle 8 Strukturen", kurz: "Übersicht", icon: LayoutGrid },
          { key: "wizard" as const, label: "Empfehlung in 5 Fragen", kurz: "Empfehlung", icon: Sparkles },
        ].map((t) => {
          const active = mode === t.key && !selected;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                if (t.key === "overview") {
                  setMode("overview");
                  setSelected(null);
                } else {
                  setMode("wizard");
                  setStep(1);
                  setSelected(null);
                }
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                active ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <t.icon className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.kurz}</span>
            </button>
          );
        })}
      </div>

      {selected ? (
        <StructureDetail s={selected} onBack={() => setSelected(null)} />
      ) : mode === "wizard" ? (
        <Wizard
          step={step}
          setStep={setStep}
          answers={answers}
          setAnswers={setAnswers}
          recommendations={recommendations}
          onSelect={setSelected}
        />
      ) : (
        <Overview onSelect={setSelected} />
      )}

      <Callout tone="neutral" title="Orientierungshilfe, keine Steuer- oder Rechtsberatung" className="mt-8">
        Holding-Strukturen immer mit Steuerberatung und gegebenenfalls Fachanwalt für Steuerrecht final aufsetzen. Fehler
        kosten oft sechsstellig, z. B. verfehlte Sperrfristen nach § 22 UmwStG, falsche Verrechnungspreise oder Verstöße
        gegen die Lohnsummen-Klausel. Datenstand: Mai 2026. Steuersätze, Verschonungsabschläge und Sperrfristen können sich
        ändern.
      </Callout>
    </CockpitShell>
  );
};

// ============================================================
// Übersicht: alle 8 Strukturen als Karten
// ============================================================
const Overview = ({ onSelect }: { onSelect: (s: HoldingStructure) => void }) => (
  <div className="space-y-6">
    <Callout tone="accent" title="Wie wähle ich die richtige Struktur?">
      Öffne eine Karte für alle Details: Steuereffekt, Sperrfristen, Beispiele und Umsetzungsschritte. Oder nutze die
      Empfehlung in 5 Fragen oben.
    </Callout>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {HOLDING_STRUCTURES.map((s) => (
        <button
          key={s.slug}
          type="button"
          onClick={() => onSelect(s)}
          className="group flex flex-col rounded-2xl border border-border bg-card p-5 text-left shadow-card transition-[border-color,box-shadow] duration-200 hover:border-accent-blue/40 hover:shadow-soft"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue">
                <Network className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="text-base font-semibold leading-snug">{s.shortName}</h2>
                <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
              </div>
            </div>
            <ArrowRight
              className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue"
              aria-hidden="true"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <ToneBadge tone="neutral" className="tabular">Setup {kurzKosten(s)}</ToneBadge>
            <ToneBadge tone="neutral">ab {kurzAb(s)}</ToneBadge>
            {s.taxScenarios && s.taxScenarios.length > 0 && (
              <ToneBadge tone="accent">{s.taxScenarios.length} Steuer-Beispiele</ToneBadge>
            )}
            {s.pitfalls && s.pitfalls.length > 0 && <ToneBadge tone="warning">{s.pitfalls.length} typische Fehler</ToneBadge>}
          </div>
        </button>
      ))}
    </div>

    <ToolSection title="Alle Strukturen im Vergleich" icon={Scale} bodyClassName="p-0 md:p-0">
      <KitTable caption="Vergleich aller Holding-Strukturen" className="rounded-none border-0">
        <thead>
          <tr>
            <th>Struktur</th>
            <th className="whitespace-nowrap">Setup</th>
            <th className="whitespace-nowrap">Lohnt sich ab</th>
            <th>Hauptvorteil</th>
          </tr>
        </thead>
        <tbody>
          {HOLDING_STRUCTURES.map((s) => (
            <tr key={s.slug} onClick={() => onSelect(s)} className="cursor-pointer">
              <td className="min-w-[10rem]">
                <button type="button" onClick={() => onSelect(s)} className="text-left font-medium hover:text-accent-blue">
                  {s.shortName}
                </button>
              </td>
              <td className="whitespace-nowrap text-muted-foreground">{kurzKosten(s)}</td>
              <td className="min-w-[8rem] text-muted-foreground">{kurzAb(s)}</td>
              <td className="min-w-[14rem] max-w-md text-muted-foreground">
                <span className="line-clamp-2">{s.tagline}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </KitTable>
    </ToolSection>
  </div>
);

// ============================================================
// Wizard: 5 Fragen, dann Empfehlung
// ============================================================
const JaNeinWahl = ({
  label,
  value,
  onChange,
  ja,
  nein,
}: {
  label: string;
  value: boolean | undefined;
  onChange: (v: boolean) => void;
  ja: string;
  nein: string;
}) => (
  <ChoiceGroup
    label={label}
    className="grid grid-cols-1 sm:grid-cols-2"
    value={value === true ? "ja" : value === false ? "nein" : ""}
    onChange={(v) => onChange(v === "ja")}
    options={[
      { value: "ja", label: ja },
      { value: "nein", label: nein },
    ]}
  />
);

const WIZARD_TITEL = ["Gewinn", "Hauptziel", "Investoren", "Familie", "Marken und IP", "Empfehlung"];

const Wizard = ({
  step,
  setStep,
  answers,
  setAnswers,
  recommendations,
  onSelect,
}: {
  step: number;
  setStep: (n: number) => void;
  answers: WizardAnswers;
  setAnswers: (a: WizardAnswers) => void;
  recommendations: ReturnType<typeof recommendStructures>;
  onSelect: (s: HoldingStructure) => void;
}) => {
  const update = (patch: Partial<WizardAnswers>) => setAnswers({ ...answers, ...patch });

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
          <p className="font-medium">
            {step < 6 ? `Frage ${step} von 5` : "Empfehlung"}
            {step < 6 && <span className="font-normal text-muted-foreground"> · {WIZARD_TITEL[step - 1]}</span>}
          </p>
          <p className="text-muted-foreground tabular">{Math.round(((step - 1) / 5) * 100)} %</p>
        </div>
        <div className="flex gap-1" aria-hidden="true">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <span
              key={s}
              className={cn("h-1.5 flex-1 rounded-full", s < step ? "bg-accent-blue" : s === step ? "bg-primary" : "bg-secondary")}
            />
          ))}
        </div>
      </div>

      <ToolSection>
        {step === 1 && (
          <>
            <FrageKopf nr={1} titel="Wie hoch ist dein Jahresgewinn?" text="Operative Gesellschaft, vor Steuern. Eine Holding lohnt sich meist erst ab etwa 100.000 € pro Jahr." />
            <Field label="Gewinn pro Jahr (€)" htmlFor="hd-gewinn" className="max-w-sm">
              <Input
                id="hd-gewinn"
                type="number"
                value={answers.jahresGewinn ?? ""}
                onChange={(e) => update({ jahresGewinn: Number(e.target.value) || undefined })}
                placeholder="z. B. 250000"
                className="tabular"
                autoFocus
              />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <FrageKopf
              nr={2}
              titel="Was ist dein Hauptziel?"
              text="Wähle die wichtigste Motivation. Bei mehreren Zielen den Wizard einfach noch einmal mit einem anderen Ziel durchlaufen."
            />
            <ChoiceGroup
              label="Hauptziel"
              className="grid grid-cols-1 sm:grid-cols-2"
              value={answers.primaryGoal ?? ""}
              onChange={(v) => update({ primaryGoal: v as WizardAnswers["primaryGoal"] })}
              options={[
                { value: "steuer", label: "Steuer-Optimierung (Ausschüttungen)" },
                { value: "exit", label: "Geplanter Exit oder Verkauf" },
                { value: "familie", label: "Familie, Erbplanung, Schenkung" },
                { value: "vermoegen", label: "Vermögensverwaltung (ETF, Immobilien)" },
                { value: "multi-brand", label: "Mehrere Marken oder Geschäftsfelder" },
              ]}
            />
          </>
        )}

        {step === 3 && (
          <>
            <FrageKopf
              nr={3}
              titel="Sind Investoren geplant?"
              text="VC-Runde, Business Angels oder strategischer Investor in den nächsten 12 Monaten?"
            />
            <JaNeinWahl
              label="Investoren geplant"
              value={answers.vcPlanned}
              onChange={(v) => update({ vcPlanned: v })}
              ja="Ja, VC oder Investor geplant"
              nein="Nein, kein Investor"
            />
          </>
        )}

        {step === 4 && (
          <>
            <FrageKopf nr={4} titel="Spielt Familien- oder Erbplanung eine Rolle?" text="Mehrere Generationen oder Erbschaftsteuer-Optimierung wichtig?" />
            <JaNeinWahl
              label="Familienplanung"
              value={answers.familyContext}
              onChange={(v) => update({ familyContext: v })}
              ja="Ja, die Familie soll eingebunden sein"
              nein="Nein, nur ich"
            />
            {answers.familyContext === true && (
              <div className="mt-5 space-y-2">
                <p className="text-sm font-medium">Vermögen über 5 Mio. € (dann kann eine Stiftung sinnvoll sein)?</p>
                <JaNeinWahl
                  label="Vermögen über 5 Mio. €"
                  value={answers.hasLargeWealth}
                  onChange={(v) => update({ hasLargeWealth: v })}
                  ja="Ja, über 5 Mio. €"
                  nein="Nein, weniger"
                />
              </div>
            )}
          </>
        )}

        {step === 5 && (
          <>
            <FrageKopf nr={5} titel="Mehrere Marken, viel geistiges Eigentum?" />
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-medium">Mehrere Marken oder Geschäftsfelder?</p>
                <JaNeinWahl
                  label="Mehrere Marken"
                  value={answers.multiBrand}
                  onChange={(v) => update({ multiBrand: v })}
                  ja="Ja, mehrere Marken"
                  nein="Nein, eine Marke"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Hoher IP-Wert (Marken, Patente, Software; Lizenzpotenzial über 100.000 € pro Jahr)?</p>
                <JaNeinWahl
                  label="Hoher IP-Wert"
                  value={answers.hasIp}
                  onChange={(v) => update({ hasIp: v })}
                  ja="Ja, viel IP"
                  nein="Nein, wenig IP"
                />
              </div>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <div className="mb-5">
              <p className="text-sm font-medium text-accent-blue">Empfehlung</p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight">Die drei passendsten Strukturen für dich</h2>
              <p className="mt-1 text-sm text-muted-foreground">Auf Basis deiner Antworten. Öffne eine Struktur für alle Details.</p>
            </div>
            {recommendations.length === 0 ? (
              <EmptyState
                icon={Network}
                title="Keine konkrete Empfehlung"
                description="Für deine Antworten passt keine Struktur eindeutig. Schau dir die Übersicht aller acht Strukturen an."
              />
            ) : (
              <ol className="space-y-3">
                {recommendations.slice(0, 3).map((r, i) => (
                  <li key={r.structure.slug}>
                    <button
                      type="button"
                      onClick={() => onSelect(r.structure)}
                      className={cn(
                        "group flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-[border-color,box-shadow] duration-200",
                        i === 0
                          ? "border-accent-blue/40 bg-accent/60 hover:shadow-soft"
                          : "border-border bg-card hover:border-foreground/25",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular",
                          i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground",
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{r.structure.shortName}</span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">{r.structure.tagline}</span>
                        <span className="mt-1.5 block text-sm text-accent-blue">{r.why}</span>
                      </span>
                      <ArrowRight
                        className="mt-1 h-4 w-4 shrink-0 text-accent-blue transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">
          <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
            <ArrowLeft aria-hidden="true" /> Zurück
          </Button>
          {step < 6 ? (
            <Button className="bg-gradient-primary" onClick={() => setStep(step + 1)}>
              {step === 5 ? "Empfehlung anzeigen" : "Weiter"} <ArrowRight aria-hidden="true" />
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                setStep(1);
                setAnswers({});
              }}
            >
              <RotateCcw aria-hidden="true" /> Mit anderen Antworten neu starten
            </Button>
          )}
        </div>
      </ToolSection>
    </div>
  );
};

const FrageKopf = ({ nr, titel, text }: { nr: number; titel: string; text?: string }) => (
  <div className="mb-5">
    <p className="text-sm font-medium text-accent-blue">Frage {nr}</p>
    <h2 className="mt-1 text-lg font-semibold tracking-tight">{titel}</h2>
    {text && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>}
  </div>
);

// ============================================================
// Detail-Ansicht: alle Infos zu einer Struktur
// ============================================================
const ListeKarte = ({
  title,
  icon: Icon,
  tone,
  children,
}: {
  title: string;
  icon: ElementType;
  tone: "success" | "danger" | "warning" | "accent" | "neutral";
  children: ReactNode;
}) => {
  const ring = {
    success: "border-success/25",
    danger: "border-danger/25",
    warning: "border-warning/25",
    accent: "border-accent-blue/20",
    neutral: "border-border",
  }[tone];
  const iconCls = {
    success: "bg-success-soft text-success",
    danger: "bg-danger-soft text-danger",
    warning: "bg-warning-soft text-warning",
    accent: "bg-accent text-accent-blue",
    neutral: "bg-secondary text-muted-foreground",
  }[tone];
  return (
    <section className={cn("rounded-2xl border bg-card p-5 shadow-card", ring)}>
      <h3 className="mb-3 flex items-center gap-2.5 text-base font-semibold">
        <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg", iconCls)}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
};

const StructureDetail = ({ s, onBack }: { s: HoldingStructure; onBack: () => void }) => (
  <div className="space-y-6">
    <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
      <ArrowLeft aria-hidden="true" /> Zurück zur Übersicht
    </Button>

    <section className="rounded-2xl bg-ink p-6 text-primary-foreground shadow-soft md:p-8">
      <p className="text-sm font-medium text-brand-green-glow">Holding-Struktur</p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">{s.name}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-foreground/75">{s.tagline}</p>
      <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2">
        {[
          { l: "Setup-Kosten", v: s.setupCost, icon: Wallet },
          { l: "Laufende Kosten", v: s.runningCost, icon: Repeat },
          { l: "Lohnt sich ab", v: s.worthwhileFrom, icon: TrendingUp },
          { l: "Steuereffekt", v: s.taxImpact, icon: Scale },
        ].map((k) => (
          <div key={k.l} className="bg-white/[0.04] p-4">
            <div className="flex items-center gap-1.5 text-xs text-primary-foreground/65">
              <k.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {k.l}
            </div>
            <div className="mt-1 text-sm font-semibold leading-snug">{k.v}</div>
          </div>
        ))}
      </div>
    </section>

    <ToolSection title="Struktur-Diagramm" icon={Network}>
      <pre className="overflow-x-auto whitespace-pre rounded-xl bg-secondary/60 p-4 font-mono text-xs leading-snug">{s.diagram}</pre>
    </ToolSection>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ListeKarte title="Wann sinnvoll" icon={CheckCircle2} tone="success">
        <ul className="space-y-2 text-sm">
          {s.bestFor.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </ListeKarte>
      <ListeKarte title="Typische Konstellationen" icon={Building2} tone="accent">
        <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-accent-blue">
          {s.realWorldExamples.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </ListeKarte>
    </div>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ListeKarte title="Vorteile" icon={Plus} tone="success">
        <ul className="space-y-2 text-sm">
          {s.pros.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
              <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: fett(p) }} />
            </li>
          ))}
        </ul>
      </ListeKarte>
      <ListeKarte title="Nachteile und Fallstricke" icon={Minus} tone="danger">
        <ul className="space-y-2 text-sm">
          {s.cons.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" aria-hidden="true" />
              <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: fett(c) }} />
            </li>
          ))}
        </ul>
      </ListeKarte>
    </div>

    {s.lockUpPeriods && s.lockUpPeriods.length > 0 && (
      <Callout tone="warning" title="Sperrfristen">
        <ul className="list-disc space-y-1 pl-4">
          {s.lockUpPeriods.map((l, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: fett(l) }} />
          ))}
        </ul>
      </Callout>
    )}

    <ToolSection title="Umsetzung Schritt für Schritt" icon={ListChecks}>
      <ol className="space-y-3 text-sm">
        {s.setupSteps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular">
              {i + 1}
            </span>
            <span className="leading-relaxed text-muted-foreground">{step.replace(/^\d+\.\s*/, "")}</span>
          </li>
        ))}
      </ol>
    </ToolSection>

    {s.taxScenarios && s.taxScenarios.length > 0 && (
      <ToolSection title="Steuer-Beispielrechnungen" icon={Calculator}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {s.taxScenarios.map((sc, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold">{sc.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground tabular">
                    Operativer Gewinn {sc.opGewinn.toLocaleString("de-DE")} €
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-muted-foreground">Effektivsatz</p>
                  <p className="text-lg font-semibold text-success tabular">{sc.effektivPct.toFixed(1).replace(".", ",")} %</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-secondary/60 p-3">
                  <p className="text-xs text-muted-foreground">Steuern gesamt</p>
                  <p className="mt-0.5 font-semibold tabular">{sc.totalSteuer.toLocaleString("de-DE")} €</p>
                </div>
                <div className="rounded-lg bg-secondary/60 p-3">
                  <p className="text-xs text-muted-foreground">Privat netto</p>
                  <p className="mt-0.5 font-semibold tabular">{sc.privatNetto.toLocaleString("de-DE")} €</p>
                </div>
              </div>
              <details className="group mt-3 text-sm [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center gap-1 font-medium text-muted-foreground hover:text-foreground">
                  Rechenweg
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-muted-foreground">
                  {sc.breakdown.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
                {sc.vsEinzel && (
                  <p className="mt-3 rounded-lg border border-accent-blue/20 bg-accent px-3 py-2 text-xs">
                    <span className="font-semibold text-accent-blue">Im Vergleich zum Einzelunternehmen:</span> {sc.vsEinzel}
                  </p>
                )}
              </details>
            </div>
          ))}
        </div>
      </ToolSection>
    )}

    {s.pitfalls && s.pitfalls.length > 0 && (
      <ListeKarte title="Typische Fehler mit dieser Struktur" icon={AlertTriangle} tone="danger">
        <ul className="space-y-2 text-sm">
          {s.pitfalls.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" aria-hidden="true" />
              <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: fett(p) }} />
            </li>
          ))}
        </ul>
      </ListeKarte>
    )}

    {(s.migrationPath || s.intlConsiderations) && (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {s.migrationPath && (
          <ListeKarte title="Migrationspfad" icon={Repeat} tone="neutral">
            <div className="text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: fett(s.migrationPath) }} />
          </ListeKarte>
        )}
        {s.intlConsiderations && (
          <ListeKarte title="Internationale Aspekte" icon={Globe} tone="neutral">
            <div className="text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: fett(s.intlConsiderations) }} />
          </ListeKarte>
        )}
      </div>
    )}

    <ToolSection title="Rechtliche Grundlage" icon={BookOpen}>
      <div className="flex flex-wrap gap-1.5">
        {s.legalBasis.map((l) => (
          <span key={l} className="rounded-md border border-border bg-secondary/60 px-2 py-1 font-mono text-xs">
            {l}
          </span>
        ))}
      </div>
      <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        Zum Nachlesen:
        {[
          { l: "KStG", u: "https://www.gesetze-im-internet.de/kstg_1977/" },
          { l: "UmwStG", u: "https://www.gesetze-im-internet.de/umwstg_2006/" },
          { l: "ErbStG", u: "https://www.gesetze-im-internet.de/erbstg_1974/" },
        ].map((g) => (
          <a
            key={g.l}
            href={g.u}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline"
          >
            {g.l} <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        ))}
      </p>
    </ToolSection>

    {s.playbookSlug && (
      <section className="flex flex-col gap-4 rounded-2xl border border-accent-blue/25 bg-accent p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div>
          <h3 className="text-base font-semibold">Bereit zur Umsetzung?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Das Holding-Playbook führt durch Notar-Vorbereitung, Handelsregister, Stammkapital und Ausschüttungs-Setup.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0 rounded-xl bg-gradient-primary">
          <Link to={`/playbook/preview/${s.playbookSlug}`}>
            Zum Playbook <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </section>
    )}
  </div>
);

export default HoldingDesigner;
