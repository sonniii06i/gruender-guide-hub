import { useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Globe,
  Calculator,
  ListChecks,
  Scale,
  ChevronRight,
  ChevronDown,
  Info,
  Plus,
  Minus,
  Check,
  Lightbulb,
  Landmark,
  Wallet,
  Building2,
} from "lucide-react";
import { Callout, ChoiceGroup, KitTable, ToneBadge, ToolSection, type Tone } from "@/components/cockpit/kit";
import { EU_ALTERNATIVES, type EUAlternative } from "@/data/euAlternatives";
import { REAL_STRUCTURES, type RealStructure } from "@/data/realStructureExamples";

const FIT_TONE: Record<EUAlternative["fitForGermans"], Tone> = {
  "Sehr gut": "success",
  Gut: "accent",
  Mittel: "warning",
  Schwierig: "danger",
};
const fitTone = (f: EUAlternative["fitForGermans"]): Tone => {
  const key = (["Sehr gut", "Gut", "Mittel", "Schwierig"] as const).find((k) => f.startsWith(k));
  return key ? FIT_TONE[key] : "neutral";
};

/** Rendert **fett** aus den Datentexten ohne innerHTML. */
const Md = ({ text }: { text: string }) => (
  <>
    {text.split(/\*\*([^*]+)\*\*/g).map((part, j) =>
      j % 2 === 1 ? (
        <strong key={j} className="font-semibold text-foreground">
          {part}
        </strong>
      ) : (
        <span key={j}>{part}</span>
      ),
    )}
  </>
);

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
        eyebrow={`EU-Alternativen · ${selected.country}`}
        title={`${selected.legalForm} (${selected.country})`}
        subtitle={selected.shortName}
      >
        <Detail s={selected} onBack={() => setSelected(null)} />
      </CockpitShell>
    );
  }

  return (
    <CockpitShell
      eyebrow="Rechtsform · EU-Alternativen"
      title="13 EU- und CH-Rechtsformen als Alternative für deutsche Gründer"
      subtitle="Statt DE-GmbH eine EU-Alternative gründen? Vergleich nach Körperschaftsteuer, Stammkapital, Substanz-Anforderung und Eignung für Gründer aus DE. ATAD-konforme Strukturen, die 2026 funktionieren, keine Briefkasten-Tricks."
    >
      {/* Wichtige Hinweise */}
      <Callout tone="warning" title="Wichtig vorweg (Stand 2026)" className="mb-6">
        <ul className="list-disc space-y-1 pl-4">
          <li>
            <strong className="font-semibold text-foreground">§AStG-Hinzurechnungsbesteuerung:</strong> Bei DE-Wohnsitz,
            Beherrschung über 50 %, niedrigerer Steuer (unter 25 %) und passiven Einkünften rechnet das BMF die Gewinne in DE
            hinzu. Aktive Geschäftstätigkeit und echte Substanz vor Ort sind zwingend.
          </li>
          <li>
            <strong className="font-semibold text-foreground">ATAD III seit 2024:</strong> Briefkastenfirmen werden EU-weit
            durchschaut. Ohne lokale Substanz (Adresse, Mitarbeiter, echte Geschäftsleitung) wird der Sitz nach DE verlegt.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Pillar 2 OECD ab 2024:</strong> 15 % Mindeststeuer für Konzerne
            über 750 Mio. Umsatz, kleine KMU sind nicht betroffen.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Wegzugsbesteuerung §6 AStG:</strong> Beim Wegzug aus DE mit
            GmbH-Anteilen gelten die Anteile als verkauft. Bei EU-Wegzug nur Stundung (kein Verzicht mehr seit 2022).
          </li>
        </ul>
      </Callout>

      {/* Sort Toggle */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">Länder im Überblick</h2>
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-muted-foreground sm:inline">Sortieren:</span>
          <ChoiceGroup<"tax" | "capital" | "fit">
            label="Sortierung"
            size="sm"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: "fit", label: "Eignung" },
              { value: "tax", label: "Steuersatz" },
              { value: "capital", label: "Stammkapital" },
            ]}
          />
        </div>
      </div>

      {/* Country-Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {sorted.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => setSelected(s)}
            className="press group rounded-2xl border border-border bg-card p-5 text-left shadow-card transition-[border-color,box-shadow] duration-200 hover:border-accent-blue/40 hover:shadow-soft"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl" aria-hidden="true">
                  {s.flag}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-tight">{s.country}</h3>
                  <p className="text-sm text-muted-foreground">{s.legalForm}</p>
                </div>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-secondary/50 px-3 py-2">
                <p className="text-xs text-muted-foreground">Steuer effektiv</p>
                <p className="text-sm font-semibold tabular">{s.effectiveTotal.split("·")[0].trim()}</p>
              </div>
              <div className="rounded-lg bg-secondary/50 px-3 py-2">
                <p className="text-xs text-muted-foreground">Mindestkapital</p>
                <p className="text-sm font-semibold tabular">
                  {s.minCapital < 100 ? `${s.minCapital} €` : `${s.minCapital.toLocaleString("de-DE")} €`}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <ToneBadge tone={fitTone(s.fitForGermans)}>Eignung: {s.fitForGermans}</ToneBadge>
              <ToneBadge>Setup: {s.setupTime}</ToneBadge>
            </div>
          </button>
        ))}
      </div>

      {/* Compare-Table */}
      <ToolSection title="Steuern im direkten Vergleich" description="Zeile anklicken für Details" icon={Scale} className="mb-8">
        <KitTable caption="Steuervergleich der EU-Alternativen" className="relative">
          <thead>
            <tr>
              <th>Land</th>
              <th>KSt</th>
              <th>Min. Kapital</th>
              <th>Setup</th>
              <th>Quellensteuer</th>
              <th>Eignung</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => (
              <tr
                key={s.slug}
                onClick={() => setSelected(s)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setSelected(s);
                }}
                tabIndex={0}
                className="cursor-pointer focus-visible:bg-secondary/50 focus-visible:outline-none"
              >
                <td className="whitespace-nowrap">
                  <span className="mr-2" aria-hidden="true">{s.flag}</span>
                  <span className="font-semibold">{s.country}</span>
                </td>
                <td className="whitespace-nowrap">{s.corporateTax.split("·")[0].trim()}</td>
                <td className="whitespace-nowrap">
                  {s.minCapital < 100 ? `${s.minCapital} €` : `${(s.minCapital / 1000).toFixed(0)}k`}
                </td>
                <td className="text-muted-foreground">{s.setupTime}</td>
                <td className="whitespace-nowrap">{s.withholdingDividends.split("·")[0].trim()}</td>
                <td>
                  <ToneBadge tone={fitTone(s.fitForGermans)}>{s.fitForGermans}</ToneBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </KitTable>
      </ToolSection>

      {/* Real-World Multi-Jurisdiktion Strukturen */}
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Globe className="h-5 w-5 text-accent-blue" aria-hidden="true" /> Multi-Jurisdiktions-Strukturen aus der Praxis
        </h2>
        <p className="mb-4 mt-1 max-w-[68ch] text-sm text-muted-foreground">
          Holding-Architekturen, die in der DACH-Wirtschaft und von sehr vermögenden Familien tatsächlich genutzt werden.
          Keine theoretischen Modelle, sondern Strukturen aus Handelsregistern, Pressemeldungen und Fallstudien.
        </p>
        <div className="space-y-3">
          {REAL_STRUCTURES.map((rs) => (
            <RealStructureCard key={rs.slug} rs={rs} />
          ))}
        </div>
      </div>

      <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>
          <strong className="font-semibold text-foreground">Hinweis:</strong> Dieses Tool ist eine Orientierungshilfe, keine
          Steuer- oder Rechtsberatung. Ein EU-Setup ist komplex und länderspezifisch. Immer mit StB und Anwalt in DE und im
          Zielland final klären, bevor du eine ausländische Gesellschaft gründest. Stand: Mai 2026.
        </span>
      </p>
    </CockpitShell>
  );
};

const RealStructureCard = ({ rs }: { rs: RealStructure }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full px-5 py-4 text-left transition-colors hover:bg-secondary/40"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-xl" aria-hidden="true">
            {rs.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold leading-snug">{rs.name}</h3>
            <p className="text-sm text-muted-foreground">Familie: {rs.family}</p>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{rs.description}</p>
          </div>
          <ChevronDown className={`mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </div>
      </button>
      {open && (
        <div className="space-y-4 border-t border-border/70 bg-secondary/20 px-5 py-5">
          <div>
            <p className="mb-2 text-sm font-semibold">Struktur</p>
            <pre className="overflow-x-auto whitespace-pre rounded-xl border border-border bg-card p-4 font-mono text-xs leading-tight">
              {rs.diagram}
            </pre>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-success/25 bg-success-soft p-4">
              <p className="text-sm font-semibold">Warum es funktioniert</p>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-foreground/80">
                {rs.whyThisWorks.map((w, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Plus className="mt-1 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                    <span>
                      <Md text={w} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-accent-blue/20 bg-accent p-4">
              <p className="text-sm font-semibold">Steuer-Logik</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{rs.taxLogic}</p>
            </div>
          </div>
          <Callout tone="warning" icon={Lightbulb} title="Was Gründer aus der DACH-Region mitnehmen">
            {rs.takeaway}
          </Callout>
        </div>
      )}
    </div>
  );
};

const Detail = ({ s, onBack }: { s: EUAlternative; onBack: () => void }) => (
  <div className="space-y-6">
    <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2 text-muted-foreground">
      <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zurück zur Übersicht
    </Button>

    {/* Hero */}
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-3xl" aria-hidden="true">
        {s.flag}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted-foreground">{s.country}</p>
        <p className="text-xl font-semibold tracking-tight">{s.legalForm}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <ToneBadge tone={fitTone(s.fitForGermans)}>Eignung: {s.fitForGermans}</ToneBadge>
          <ToneBadge>{s.setupTime} Setup</ToneBadge>
          {s.motherDaughterApplies && (
            <ToneBadge tone="success">
              <Check className="h-3 w-3" aria-hidden="true" /> Mutter-Tochter-RL
            </ToneBadge>
          )}
        </div>
      </div>
    </div>

    {/* Key Stats */}
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Stat icon={Calculator} label="KSt-Satz" value={s.corporateTax} />
      <Stat icon={Calculator} label="Effektive Steuer" value={s.effectiveTotal} />
      <Stat icon={Landmark} label="Mindest-Stammkapital" value={`${s.minCapital.toLocaleString("de-DE")} €`} sub={s.capitalPaidUp} />
      <Stat icon={Globe} label="Quellensteuer" value={s.withholdingDividends} />
      <Stat icon={Wallet} label="Setup-Kosten" value={s.setupCost} />
      <Stat icon={Wallet} label="Laufende Kosten" value={s.runningCost} />
    </div>

    {/* Substanz */}
    <Callout tone="warning" title="Substanz-Anforderungen (kritisch)">
      {s.substance}
    </Callout>

    {/* Best for + Pros */}
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ToolSection title="Wann sinnvoll" icon={CheckCircle2}>
        <ul className="space-y-2 text-sm leading-relaxed">
          {s.bestFor.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </ToolSection>
      <ToolSection title="Beispiele aus der Praxis" icon={Building2}>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {s.realExamples.map((e, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" aria-hidden="true" />
              <span>{e}</span>
            </li>
          ))}
        </ul>
      </ToolSection>
    </div>

    {/* Pros + Cons */}
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-success/25 bg-success-soft p-5">
        <p className="text-base font-semibold">Vorteile</p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
          {s.pros.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <Plus className="mt-1 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
              <span>
                <Md text={p} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-danger/25 bg-danger-soft p-5">
        <p className="text-base font-semibold">Nachteile und Fallstricke</p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
          {s.cons.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <Minus className="mt-1 h-3.5 w-3.5 shrink-0 text-danger" aria-hidden="true" />
              <span>
                <Md text={c} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* DE-Steuer-Auswirkung */}
    <ToolSection title="Auswirkung auf die Steuer in DE" icon={Scale}>
      <p className="text-sm leading-relaxed">{s.deTaxImpact}</p>
    </ToolSection>

    {/* Setup-Steps */}
    <ToolSection title="Setup-Schritte" icon={ListChecks}>
      <ol className="space-y-3 text-sm">
        {s.setupSteps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-blue tabular">
              {i + 1}
            </span>
            <span className="leading-relaxed text-foreground/80">{step.replace(/^\d+\.\s*/, "")}</span>
          </li>
        ))}
      </ol>
    </ToolSection>

    {/* Official Links */}
    <ToolSection title="Offizielle Quellen" icon={ExternalLink}>
      <div className="flex flex-wrap gap-2">
        {s.officialLinks.map((l) => (
          <Button key={l.url} asChild variant="outline" size="sm">
            <a href={l.url} target="_blank" rel="noreferrer noopener">
              {l.label} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </Button>
        ))}
      </div>
    </ToolSection>
  </div>
);

const Stat = ({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string; sub?: string }) => (
  <div className="rounded-xl border border-border bg-card p-4">
    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </p>
    <p className="mt-1 text-sm font-semibold leading-snug">{value}</p>
    {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
  </div>
);

export default EUAlternativen;
