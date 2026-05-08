import { useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Eye,
  Globe,
  Calculator,
  ListChecks,
  Scale,
} from "lucide-react";
import { EU_ALTERNATIVES, type EUAlternative } from "@/data/euAlternatives";
import { REAL_STRUCTURES, type RealStructure } from "@/data/realStructureExamples";

const FIT_COLOR: Record<EUAlternative["fitForGermans"], string> = {
  "Sehr gut": "bg-emerald-500/10 text-emerald-700",
  Gut: "bg-accent-blue/10 text-accent-blue",
  Mittel: "bg-amber-500/10 text-amber-700",
  Schwierig: "bg-red-500/10 text-red-700",
};

const EUAlternativen = () => {
  const [selected, setSelected] = useState<EUAlternative | null>(null);
  const [sortBy, setSortBy] = useState<"tax" | "capital" | "fit">("fit");

  const sorted = [...EU_ALTERNATIVES].sort((a, b) => {
    if (sortBy === "tax") return parseFloat(a.effectiveTotal) - parseFloat(b.effectiveTotal);
    if (sortBy === "capital") return a.minCapital - b.minCapital;
    const fitOrder = { "Sehr gut": 0, Gut: 1, Mittel: 2, Schwierig: 3 } as const;
    return fitOrder[a.fitForGermans] - fitOrder[b.fitForGermans];
  });

  if (selected) {
    return (
      <CockpitShell
        eyebrow={`${selected.flag} EU-Alternative`}
        title={`${selected.legalForm} (${selected.country})`}
        subtitle={selected.shortName}
      >
        <Detail s={selected} onBack={() => setSelected(null)} />
      </CockpitShell>
    );
  }

  return (
    <CockpitShell
      eyebrow="EU-Alternativen"
      title="9 EU-/CH-Rechtsform-Alternativen für deutsche Gründer"
      subtitle="Statt DE-GmbH → EU-Alternative gründen. Vergleich nach KSt, Stammkapital, Substanz-Anforderung, DE-Eignung. ATAD-konforme Strukturen die in 2026 funktionieren — keine ‚Briefkasten-Tricks'."
    >
      {/* Wichtige Hinweise */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mb-6 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtig vorweg (Stand 2026):</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>§AStG-Hinzurechnungsbesteuerung</strong>: bei DE-Wohnsitz + Beherrschung &gt; 50 % +
                niedrigerer Steuer (&lt; 25 %) + passiven Einkünften → BMF rechnet Gewinne in DE hinzu.
                Aktive Geschäftstätigkeit + echte Substanz vor Ort ist zwingend.
              </li>
              <li>
                <strong>ATAD III seit 2024</strong>: Mailbox-Companies werden EU-weit durchschaut. Ohne lokale
                Substanz (Adresse + Mitarbeiter + echte Geschäftsleitung) wird Sitz nach DE umqualifiziert.
              </li>
              <li>
                <strong>Pillar 2 OECD ab 2024</strong>: 15 % Mindeststeuer für Konzerne &gt; 750 Mio Umsatz —
                kleine KMUs unbetroffen.
              </li>
              <li>
                <strong>Wegzugsbesteuerung §6 AStG</strong>: bei Wegzug aus DE mit GmbH-Anteilen → Anteile gelten
                als verkauft mit Wertaufholung. Bei EU-Wegzug: nur Stundung (kein Verzicht mehr seit 2022).
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sort Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSortBy("fit")}
          className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
            sortBy === "fit" ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Nach Eignung für DE-Gründer
        </button>
        <button
          onClick={() => setSortBy("tax")}
          className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
            sortBy === "tax" ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Nach Steuersatz
        </button>
        <button
          onClick={() => setSortBy("capital")}
          className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
            sortBy === "capital" ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Nach Stammkapital
        </button>
      </div>

      {/* Country-Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {sorted.map((s) => (
          <button
            key={s.slug}
            onClick={() => setSelected(s)}
            className="text-left rounded-2xl border border-border bg-card p-5 hover:border-accent-blue/40 hover:shadow-soft transition-all group"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{s.flag}</span>
                <div>
                  <h3 className="font-bold text-sm leading-tight">{s.country}</h3>
                  <p className="text-[11px] text-muted-foreground">{s.legalForm}</p>
                </div>
              </div>
              <Eye className="h-4 w-4 text-muted-foreground group-hover:text-accent-blue shrink-0" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
              <div className="rounded-lg bg-secondary/40 p-2">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">KSt</div>
                <div className="font-mono font-semibold">{s.effectiveTotal.split("·")[0].trim()}</div>
              </div>
              <div className="rounded-lg bg-secondary/40 p-2">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Min. Kapital</div>
                <div className="font-mono font-semibold">
                  {s.minCapital < 100 ? `${s.minCapital} €` : `${s.minCapital.toLocaleString("de-DE")} €`}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${FIT_COLOR[s.fitForGermans]}`}>
                DE-Eignung: {s.fitForGermans}
              </span>
              <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[10px]">
                Setup: {s.setupTime}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Compare-Table */}
      <div className="rounded-2xl border border-border bg-card p-5 overflow-x-auto">
        <h3 className="font-bold text-sm mb-3">Side-by-Side Steuer-Vergleich</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-2">Land</th>
              <th className="text-left py-2 px-2">KSt</th>
              <th className="text-left py-2 px-2">Min. Kap.</th>
              <th className="text-left py-2 px-2">Setup</th>
              <th className="text-left py-2 px-2">Quellen-St.</th>
              <th className="text-left py-2 pl-2">DE-Eignung</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => (
              <tr
                key={s.slug}
                onClick={() => setSelected(s)}
                className="border-b border-border last:border-0 cursor-pointer hover:bg-secondary/30"
              >
                <td className="py-2 pr-2">
                  <span className="mr-1.5">{s.flag}</span>
                  <span className="font-semibold">{s.country}</span>
                </td>
                <td className="py-2 px-2 font-mono text-[10px]">{s.corporateTax.split("·")[0].trim()}</td>
                <td className="py-2 px-2 font-mono text-[10px]">
                  {s.minCapital < 100 ? `${s.minCapital} €` : `${(s.minCapital / 1000).toFixed(0)}k`}
                </td>
                <td className="py-2 px-2 text-muted-foreground text-[10px]">{s.setupTime}</td>
                <td className="py-2 px-2 font-mono text-[10px]">{s.withholdingDividends.split("·")[0].trim()}</td>
                <td className="py-2 pl-2">
                  <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${FIT_COLOR[s.fitForGermans]}`}>
                    {s.fitForGermans}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Real-World Multi-Jurisdiktion Strukturen */}
      <div className="mt-8">
        <h3 className="font-bold text-base mb-3 flex items-center gap-2">
          <Globe className="h-5 w-5 text-accent-blue" /> Real-World Multi-Jurisdiktions-Konstrukte
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Echte Holding-Architekturen die in der DACH-Wirtschaft + UHNW-Familien tatsächlich genutzt werden. Keine
          theoretischen Modelle — sondern Strukturen aus Handelsregistern, Pressemeldungen und Case Studies.
        </p>
        <div className="space-y-3">
          {REAL_STRUCTURES.map((rs) => (
            <RealStructureCard key={rs.slug} rs={rs} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 mt-6 text-[11px] text-muted-foreground leading-relaxed">
        <strong>Disclaimer:</strong> Dieses Tool ist Orientierungshilfe, keine Steuer-/Rechtsberatung. EU-Setup ist
        komplex und länderspezifisch. Immer mit StB UND Anwalt in DE + im Zielland final klären, BEVOR du eine
        ausländische Gesellschaft gründest. Stand: Mai 2026.
      </div>
    </CockpitShell>
  );
};

const RealStructureCard = ({ rs }: { rs: RealStructure }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-start gap-3">
          <div className="text-3xl">{rs.emoji}</div>
          <div className="flex-1">
            <h4 className="font-bold text-sm mb-1">{rs.name}</h4>
            <div className="text-[11px] text-muted-foreground mb-1">Familie: {rs.family}</div>
            <p className="text-xs text-muted-foreground line-clamp-2">{rs.description}</p>
          </div>
          <div className="text-xs text-accent-blue shrink-0">{open ? "▲" : "▼"}</div>
        </div>
      </button>
      {open && (
        <div className="border-t border-border p-4 bg-secondary/20 space-y-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Diagramm</div>
            <pre className="font-mono text-[10px] leading-tight whitespace-pre overflow-x-auto bg-card border border-border rounded-lg p-3">
              {rs.diagram}
            </pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
              <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-1">
                Warum es funktioniert
              </div>
              <ul className="space-y-1 text-xs">
                {rs.whyThisWorks.map((w, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 shrink-0">+</span>
                    <span dangerouslySetInnerHTML={{ __html: w.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-accent-blue/30 bg-accent-blue/5 p-3">
              <div className="text-[10px] uppercase tracking-wider text-accent-blue font-semibold mb-1">
                Steuer-Logik
              </div>
              <p className="text-xs leading-relaxed">{rs.taxLogic}</p>
            </div>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs">
            <div className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold mb-1">
              Take-Away für DACH-Founder
            </div>
            <p className="leading-relaxed">{rs.takeaway}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Detail = ({ s, onBack }: { s: EUAlternative; onBack: () => void }) => (
  <div>
    <button onClick={onBack} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent-blue mb-4">
      <ArrowLeft className="h-3 w-3" /> Zurück zur Übersicht
    </button>

    {/* Hero */}
    <div className="rounded-2xl border border-accent-blue/30 bg-gradient-to-br from-card via-card to-accent-blue/5 p-6 mb-6">
      <div className="flex items-start gap-4">
        <div className="text-5xl">{s.flag}</div>
        <div className="flex-1">
          <div className="text-xs text-muted-foreground mb-1">{s.country}</div>
          <h2 className="text-xl md:text-2xl font-bold mb-1">{s.legalForm}</h2>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${FIT_COLOR[s.fitForGermans]}`}>
              DE-Eignung: {s.fitForGermans}
            </span>
            <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[11px]">
              {s.setupTime} Setup
            </span>
            {s.motherDaughterApplies && (
              <span className="rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 text-[11px] font-semibold">
                ✓ Mutter-Tochter-RL
              </span>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Key Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
      <Stat icon={<Calculator className="h-4 w-4" />} label="KSt-Satz" value={s.corporateTax} />
      <Stat icon={<Calculator className="h-4 w-4" />} label="Effektiv-Steuer" value={s.effectiveTotal} />
      <Stat icon={<Globe className="h-4 w-4" />} label="Min. Stammkapital" value={`${s.minCapital.toLocaleString("de-DE")} €`} sub={s.capitalPaidUp} />
      <Stat icon={<Globe className="h-4 w-4" />} label="Quellensteuer" value={s.withholdingDividends} />
      <Stat icon={<Calculator className="h-4 w-4" />} label="Setup-Kosten" value={s.setupCost} />
      <Stat icon={<Calculator className="h-4 w-4" />} label="Lfd. Kosten" value={s.runningCost} />
    </div>

    {/* Substanz */}
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mb-6">
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
            Substanz-Anforderungen (kritisch!)
          </div>
          <div className="text-sm leading-relaxed">{s.substance}</div>
        </div>
      </div>
    </div>

    {/* Best for + Pros */}
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
        <div className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-2">Real-Beispiele</div>
        <ul className="space-y-1 text-sm">
          {s.realExamples.map((e, i) => (
            <li key={i} className="text-muted-foreground">
              · {e}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Pros + Cons */}
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

    {/* DE-Steuer-Auswirkung */}
    <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Scale className="h-4 w-4 text-accent-blue" />
        <div className="text-xs font-semibold uppercase tracking-wider text-accent-blue">DE-Steuer-Auswirkung</div>
      </div>
      <p className="text-sm leading-relaxed">{s.deTaxImpact}</p>
    </div>

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

    {/* Official Links */}
    <div className="rounded-2xl border border-border bg-secondary/30 p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Offizielle Quellen
      </div>
      <div className="flex flex-wrap gap-2">
        {s.officialLinks.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 rounded-lg bg-card border border-border px-3 py-1.5 text-[11px] hover:bg-secondary"
          >
            {l.label} <ExternalLink className="h-3 w-3" />
          </a>
        ))}
      </div>
    </div>
  </div>
);

const Stat = ({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) => (
  <div className="rounded-xl border border-border bg-card p-3">
    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
      {icon}
      <div className="text-[10px] uppercase tracking-wider font-semibold">{label}</div>
    </div>
    <div className="text-sm font-semibold leading-snug">{value}</div>
    {sub && <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>}
  </div>
);

export default EUAlternativen;
