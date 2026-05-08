import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  Calculator,
  ListChecks,
  Scale,
  Eye,
} from "lucide-react";
import {
  HOLDING_STRUCTURES,
  recommendStructures,
  type HoldingStructure,
  type WizardAnswers,
} from "@/data/holdingStructures";

const HoldingDesigner = () => {
  const [mode, setMode] = useState<"overview" | "wizard">("overview");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [selected, setSelected] = useState<HoldingStructure | null>(null);

  const recommendations = useMemo(() => recommendStructures(answers), [answers]);

  return (
    <CockpitShell
      eyebrow="Holding-Designer"
      title="Holding-Strukturen für deutsche Gründer"
      subtitle="8 echte Holding-Strukturen die in Deutschland legal sind und von Mittelstand bis Startup tatsächlich genutzt werden — mit Steuer-Effekt, Sperrfristen und konkreten Real-World-Beispielen."
    >
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => {
            setMode("overview");
            setSelected(null);
          }}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            mode === "overview"
              ? "bg-accent-blue text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Alle 8 Strukturen
        </button>
        <button
          onClick={() => {
            setMode("wizard");
            setStep(1);
            setSelected(null);
          }}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors inline-flex items-center gap-1 ${
            mode === "wizard"
              ? "bg-accent-blue text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          <Sparkles className="h-3 w-3" /> Empfehlung-Wizard
        </button>
      </div>

      {/* Detail-View */}
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

      {/* Disclaimer */}
      <div className="rounded-2xl border border-border bg-card p-4 mt-6 text-[11px] text-muted-foreground leading-relaxed">
        <strong>Disclaimer:</strong> Dieses Tool ist Orientierungshilfe, keine Steuer- oder Rechtsberatung. Holding-
        Strukturen müssen IMMER mit StB + ggf. Fachanwalt für Steuerrecht final aufgesetzt werden — Fehler kosten oft
        sechsstellig (z.B. verfehlte Sperrfristen §22 UmwStG, falsche Verrechnungspreise, Lohnsummen-Klausel-Verstöße).
        Stand der Daten: Mai 2026. Steuersätze, Verschonungsabschläge und Sperrfristen können sich ändern.
      </div>
    </CockpitShell>
  );
};

// ============================================================
// Übersicht — alle 8 Strukturen als Karten
// ============================================================
const Overview = ({ onSelect }: { onSelect: (s: HoldingStructure) => void }) => (
  <div>
    <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-6 text-xs leading-relaxed">
      <div className="font-semibold mb-1">Wie wähle ich die richtige Struktur?</div>
      <div className="text-muted-foreground">
        Klick auf eine Karte für volle Details (Steuer-Effekt, Sperrfristen, Real-Beispiele, Setup-Schritte). Oder
        nutze den Empfehlung-Wizard oben — der schlägt dir basierend auf 6 Fragen die passenden Strukturen vor.
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
      {HOLDING_STRUCTURES.map((s) => (
        <button
          key={s.slug}
          onClick={() => onSelect(s)}
          className="text-left rounded-2xl border border-border bg-card p-5 hover:border-accent-blue/40 hover:shadow-soft transition-all group"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{s.emoji}</span>
              <div>
                <h3 className="font-bold text-sm leading-tight">{s.shortName}</h3>
                <p className="text-[11px] text-muted-foreground line-clamp-2">{s.tagline}</p>
              </div>
            </div>
            <Eye className="h-4 w-4 text-muted-foreground group-hover:text-accent-blue shrink-0" />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">
              💶 {s.setupCost.split("(")[0].trim().split("+")[0].trim()}
            </span>
            <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[10px]">
              ab {s.worthwhileFrom.split("/")[0].split("—")[0].trim()}
            </span>
            {s.taxScenarios && s.taxScenarios.length > 0 && (
              <span className="rounded-full bg-accent-blue/10 text-accent-blue px-2 py-0.5 text-[10px] font-semibold">
                📊 {s.taxScenarios.length} Steuer-Sims
              </span>
            )}
            {s.pitfalls && s.pitfalls.length > 0 && (
              <span className="rounded-full bg-amber-500/10 text-amber-700 px-2 py-0.5 text-[10px]">
                ⚠ {s.pitfalls.length} Pitfalls
              </span>
            )}
          </div>
        </button>
      ))}
    </div>

    {/* Side-by-Side Compare-Tabelle */}
    <div className="rounded-2xl border border-border bg-card p-5 overflow-x-auto">
      <h3 className="font-bold text-sm mb-3">Side-by-Side Vergleich</h3>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 pr-3">Struktur</th>
            <th className="text-left py-2 px-2">Setup</th>
            <th className="text-left py-2 px-2">Lohnt sich ab</th>
            <th className="text-left py-2 pl-2">Hauptvorteil</th>
          </tr>
        </thead>
        <tbody>
          {HOLDING_STRUCTURES.map((s) => (
            <tr
              key={s.slug}
              onClick={() => onSelect(s)}
              className="border-b border-border last:border-0 cursor-pointer hover:bg-secondary/30"
            >
              <td className="py-2 pr-3">
                <div className="flex items-center gap-1.5">
                  <span>{s.emoji}</span>
                  <span className="font-semibold">{s.shortName}</span>
                </div>
              </td>
              <td className="py-2 px-2 text-muted-foreground font-mono text-[10px]">
                {s.setupCost.split("(")[0].trim().split("+")[0].trim()}
              </td>
              <td className="py-2 px-2 text-muted-foreground text-[10px]">
                {s.worthwhileFrom.split("/")[0].split("—")[0].trim()}
              </td>
              <td className="py-2 pl-2 text-muted-foreground text-[10px] line-clamp-2 max-w-xs">{s.tagline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ============================================================
// Wizard — 5 Fragen → Empfehlung
// ============================================================
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
    <div>
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div key={s} className="flex items-center gap-1.5 flex-1">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                s < step
                  ? "bg-emerald-500 text-white"
                  : s === step
                  ? "bg-accent-blue text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s < step ? <CheckCircle2 className="h-3 w-3" /> : s}
            </div>
            {s < 6 && <div className={`h-0.5 flex-1 ${s < step ? "bg-emerald-500" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        {step === 1 && (
          <>
            <h2 className="text-base font-bold mb-1">1. Wie hoch ist dein Jahres-Gewinn?</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Operative Gesellschaft (vor Steuer). Holding-Setup lohnt sich erst ab ~100 k €/Jahr.
            </p>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">€ pro Jahr</Label>
            <Input
              type="number"
              value={answers.jahresGewinn ?? ""}
              onChange={(e) => update({ jahresGewinn: Number(e.target.value) || undefined })}
              placeholder="z.B. 250000"
              className="mt-1"
              autoFocus
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-base font-bold mb-1">2. Was ist dein Hauptziel?</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Wähle die wichtigste Motivation. Mehrere Ziele → Wizard nochmal mit anderem Ziel laufen lassen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { v: "steuer", l: "Steuer-Optimierung (Ausschüttungen)" },
                { v: "exit", l: "Geplanter Exit / Verkauf" },
                { v: "familie", l: "Familie / Erbplanung / Schenkung" },
                { v: "vermoegen", l: "Vermögensverwaltung (ETF, Immobilien)" },
                { v: "multi-brand", l: "Multi-Brand / mehrere Geschäftsfelder" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => update({ primaryGoal: o.v as WizardAnswers["primaryGoal"] })}
                  className={`text-left rounded-xl border p-3 text-sm transition-colors ${
                    answers.primaryGoal === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-base font-bold mb-1">3. Investoren / VC?</h2>
            <p className="text-xs text-muted-foreground mb-4">
              VC-Runde, Business Angels oder strategischer Investor in den nächsten 12 Monaten geplant?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: true, l: "Ja, VC/Investor geplant" },
                { v: false, l: "Nein / kein Investor" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => update({ vcPlanned: o.v })}
                  className={`text-left rounded-xl border p-3 text-sm transition-colors ${
                    answers.vcPlanned === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-base font-bold mb-1">4. Familien-/Erbplanung relevant?</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Mehrere Generationen oder Erbschaftssteuer-Optimierung wichtig?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: true, l: "Ja, Familie soll mit involviert sein" },
                { v: false, l: "Nein, nur ich" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => update({ familyContext: o.v })}
                  className={`text-left rounded-xl border p-3 text-sm transition-colors ${
                    answers.familyContext === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
            {answers.familyContext === true && (
              <div className="mt-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Vermögen über 5 Mio € (Stiftung sinnvoll)?
                </Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { v: true, l: "Ja, > 5 Mio €" },
                    { v: false, l: "Nein, kleiner" },
                  ].map((o) => (
                    <button
                      key={String(o.v)}
                      onClick={() => update({ hasLargeWealth: o.v })}
                      className={`text-left rounded-xl border p-3 text-sm transition-colors ${
                        answers.hasLargeWealth === o.v
                          ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                          : "border-border hover:border-accent-blue/40"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="text-base font-bold mb-1">5. Multi-Brand & IP?</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Mehrere Geschäftsfelder oder hoher IP-Wert (Marken, Patente, Software)?
            </p>
            <div className="space-y-3">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Mehrere Brands / Geschäftsfelder?
                </Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { v: true, l: "Ja, mehrere Brands" },
                    { v: false, l: "Nein, ein Brand" },
                  ].map((o) => (
                    <button
                      key={String(o.v)}
                      onClick={() => update({ multiBrand: o.v })}
                      className={`text-left rounded-xl border p-3 text-sm transition-colors ${
                        answers.multiBrand === o.v
                          ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                          : "border-border hover:border-accent-blue/40"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Hoher IP-Wert (Marken/Patente/Software, Lizenz-Potenzial &gt; 100 k €/Jahr)?
                </Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { v: true, l: "Ja, viel IP" },
                    { v: false, l: "Nein, wenig IP" },
                  ].map((o) => (
                    <button
                      key={String(o.v)}
                      onClick={() => update({ hasIp: o.v })}
                      className={`text-left rounded-xl border p-3 text-sm transition-colors ${
                        answers.hasIp === o.v
                          ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                          : "border-border hover:border-accent-blue/40"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <h2 className="text-base font-bold mb-1">6. Empfehlung</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Basierend auf deinen Antworten — die Top-3 passendsten Strukturen für dich:
            </p>
            {recommendations.length === 0 ? (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-800">
                Keine spezifische Empfehlung. Schau dir die "Alle 8 Strukturen"-Übersicht an.
              </div>
            ) : (
              <div className="space-y-2">
                {recommendations.slice(0, 3).map((r, i) => (
                  <button
                    key={r.structure.slug}
                    onClick={() => onSelect(r.structure)}
                    className="text-left w-full rounded-xl border border-accent-blue/30 bg-accent-blue/5 hover:bg-accent-blue/10 p-4 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="rounded-full bg-accent-blue text-primary-foreground px-2 py-0.5 text-[10px] font-bold">
                            #{i + 1}
                          </span>
                          <span className="text-2xl">{r.structure.emoji}</span>
                          <span className="font-bold">{r.structure.shortName}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{r.structure.tagline}</p>
                        <p className="text-[11px] text-accent-blue">→ {r.why}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-accent-blue shrink-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Nav-Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          {step < 6 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                setStep(1);
                setAnswers({});
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              Nochmal mit anderen Antworten
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Detail-View — alle Infos zu einer Struktur
// ============================================================
const StructureDetail = ({ s, onBack }: { s: HoldingStructure; onBack: () => void }) => (
  <div>
    <button onClick={onBack} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent-blue mb-4">
      <ArrowLeft className="h-3 w-3" /> Zurück zur Übersicht
    </button>

    {/* Header */}
    <div className="rounded-2xl border border-accent-blue/30 bg-gradient-to-br from-card via-card to-accent-blue/5 p-6 mb-6">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{s.emoji}</div>
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold mb-1">{s.name}</h2>
          <p className="text-sm text-muted-foreground">{s.tagline}</p>
        </div>
      </div>
    </div>

    {/* Diagram */}
    <div className="rounded-2xl border border-border bg-card p-5 mb-6">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Struktur-Diagramm</div>
      <pre className="font-mono text-[11px] leading-tight whitespace-pre overflow-x-auto bg-secondary/40 rounded-lg p-3">{s.diagram}</pre>
    </div>

    {/* Key Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
      <Stat icon={<Calculator className="h-4 w-4" />} label="Setup-Kosten" value={s.setupCost} />
      <Stat icon={<Calculator className="h-4 w-4" />} label="Laufende Kosten" value={s.runningCost} />
      <Stat icon={<Sparkles className="h-4 w-4" />} label="Lohnt sich ab" value={s.worthwhileFrom} />
      <Stat icon={<Scale className="h-4 w-4" />} label="Steuer-Effekt" value={s.taxImpact} />
    </div>

    {/* Best for + Real-World */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">Wann sinnvoll</div>
        <ul className="space-y-1 text-sm">
          {s.bestFor.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-2">Wer das nutzt (real)</div>
        <ul className="space-y-1 text-sm">
          {s.realWorldExamples.map((e, i) => (
            <li key={i} className="text-muted-foreground">
              · {e}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Pros / Cons */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">Vorteile</div>
        <ul className="space-y-2 text-sm">
          {s.pros.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-emerald-600 shrink-0">+</span>
              <span dangerouslySetInnerHTML={{ __html: p.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-2">Nachteile / Fallstricke</div>
        <ul className="space-y-2 text-sm">
          {s.cons.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-red-600 shrink-0">−</span>
              <span dangerouslySetInnerHTML={{ __html: c.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Lock-up Periods */}
    {s.lockUpPeriods && s.lockUpPeriods.length > 0 && (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mb-6">
        <div className="flex items-start gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">Sperrfristen / Lock-ups</div>
        </div>
        <ul className="space-y-1 text-sm">
          {s.lockUpPeriods.map((l, i) => (
            <li key={i} className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: "· " + l.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
          ))}
        </ul>
      </div>
    )}

    {/* Setup-Steps */}
    <div className="rounded-2xl border border-border bg-card p-5 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <ListChecks className="h-4 w-4 text-accent-blue" />
        <div className="text-xs font-semibold uppercase tracking-wider">Setup-Schritte</div>
      </div>
      <ol className="space-y-2 text-sm">
        {s.setupSteps.map((step, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="rounded-full bg-accent-blue text-primary-foreground h-5 w-5 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="text-muted-foreground leading-relaxed">{step.replace(/^\d+\.\s*/, "")}</span>
          </li>
        ))}
      </ol>
    </div>

    {/* Steuer-Szenarien (Beispielrechnungen) */}
    {s.taxScenarios && s.taxScenarios.length > 0 && (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-4 w-4 text-emerald-700" />
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Steuer-Beispielrechnungen
          </div>
        </div>
        <div className="space-y-4">
          {s.taxScenarios.map((sc, i) => (
            <div key={i} className="rounded-xl border border-emerald-500/20 bg-card p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="font-bold text-sm">{sc.label}</div>
                  <div className="text-[11px] text-muted-foreground">
                    Op-Gewinn: {sc.opGewinn.toLocaleString("de-DE")} €
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Effektivsatz</div>
                  <div className="text-lg font-bold text-emerald-700">{sc.effektivPct.toFixed(1)} %</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-lg bg-secondary/40 p-2">
                  <div className="text-[10px] text-muted-foreground uppercase">Total Steuer</div>
                  <div className="font-mono font-semibold text-sm">
                    {sc.totalSteuer.toLocaleString("de-DE")} €
                  </div>
                </div>
                <div className="rounded-lg bg-secondary/40 p-2">
                  <div className="text-[10px] text-muted-foreground uppercase">Privat netto</div>
                  <div className="font-mono font-semibold text-sm">
                    {sc.privatNetto.toLocaleString("de-DE")} €
                  </div>
                </div>
              </div>
              <details className="text-xs text-muted-foreground">
                <summary className="cursor-pointer font-semibold text-foreground">Berechnungs-Details ▾</summary>
                <ul className="mt-2 space-y-1 list-disc pl-4">
                  {sc.breakdown.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
                {sc.vsEinzel && (
                  <div className="mt-3 rounded-lg bg-accent-blue/5 border border-accent-blue/20 p-2 text-[11px]">
                    <span className="font-semibold text-accent-blue">vs. Einzelunternehmen:</span> {sc.vsEinzel}
                  </div>
                )}
              </details>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Common Pitfalls */}
    {s.pitfalls && s.pitfalls.length > 0 && (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-red-700" />
          <div className="text-xs font-semibold uppercase tracking-wider text-red-700">
            Typische Fehler die User mit dieser Struktur machen
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          {s.pitfalls.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-red-600 shrink-0">⚠</span>
              <span
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: p.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }}
              />
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Migration-Pfad + Internationales */}
    {(s.migrationPath || s.intlConsiderations) && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {s.migrationPath && (
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Migration-Pfad
            </div>
            <div
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: s.migrationPath.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"),
              }}
            />
          </div>
        )}
        {s.intlConsiderations && (
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Internationale Aspekte
            </div>
            <div
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: s.intlConsiderations.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"),
              }}
            />
          </div>
        )}
      </div>
    )}

    {/* Legal Basis */}
    <div className="rounded-2xl border border-border bg-secondary/30 p-4 mb-6">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Rechtliche Grundlage
      </div>
      <div className="flex flex-wrap gap-1.5">
        {s.legalBasis.map((l) => (
          <span key={l} className="rounded-full bg-card border border-border px-2.5 py-1 text-[11px] font-mono">
            {l}
          </span>
        ))}
      </div>
    </div>

    {/* CTA: Playbook starten */}
    {s.playbookSlug && (
      <div className="rounded-2xl border border-accent-blue/40 bg-gradient-to-br from-card via-card to-accent-blue/5 p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-bold mb-1">Bereit umzusetzen?</div>
            <div className="text-xs text-muted-foreground">
              Geh durch das Holding-Playbook mit Notar-Vorbereitung, HR-Anmeldung, Stammkapital und
              Ausschüttungs-Setup.
            </div>
          </div>
          <Link
            to={`/playbook/preview/${s.playbookSlug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-5 py-2.5 text-sm font-bold hover:opacity-90"
          >
            <Sparkles className="h-4 w-4" /> Playbook-Übersicht <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )}

    {/* External resources */}
    <div className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
      Für tiefer gehende Recherche:{" "}
      <a
        href="https://www.gesetze-im-internet.de/kstg_1977/"
        target="_blank"
        rel="noreferrer noopener"
        className="text-accent-blue hover:underline inline-flex items-center gap-0.5"
      >
        KStG <ExternalLink className="h-3 w-3" />
      </a>{" "}
      ·{" "}
      <a
        href="https://www.gesetze-im-internet.de/umwstg_2006/"
        target="_blank"
        rel="noreferrer noopener"
        className="text-accent-blue hover:underline inline-flex items-center gap-0.5"
      >
        UmwStG <ExternalLink className="h-3 w-3" />
      </a>{" "}
      ·{" "}
      <a
        href="https://www.gesetze-im-internet.de/erbstg_1974/"
        target="_blank"
        rel="noreferrer noopener"
        className="text-accent-blue hover:underline inline-flex items-center gap-0.5"
      >
        ErbStG <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  </div>
);

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-xl border border-border bg-card p-3">
    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
      {icon}
      <div className="text-[10px] uppercase tracking-wider font-semibold">{label}</div>
    </div>
    <div className="text-sm font-semibold leading-snug">{value}</div>
  </div>
);

export default HoldingDesigner;
