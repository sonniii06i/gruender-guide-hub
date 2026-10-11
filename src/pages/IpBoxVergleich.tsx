import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Callout,
  ChoiceGroup,
  Field,
  ResultPanel,
  StatGrid,
  StatTile,
  ToneBadge,
  ToolLayout,
  ToolSection,
  type Tone,
} from "@/components/cockpit/kit";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Check,
  CheckCircle2,
  ExternalLink,
  TrendingDown,
  ListChecks,
  FileCheck,
  Globe,
  Plus,
  Minus,
  Building2,
  Microscope,
  NotebookPen,
  Sparkles,
} from "lucide-react";
import { IP_BOX_REGIMES, type IPBoxRegime } from "@/data/ipBoxRegimes";

const FIT_TONE: Record<IPBoxRegime["fitForGermans"], Tone> = {
  "Sehr gut": "success",
  Gut: "accent",
  Mittel: "warning",
  Schwierig: "danger",
};

const CFC_TONE: Record<IPBoxRegime["cfcRisk"], Tone> = {
  Niedrig: "success",
  Mittel: "warning",
  Hoch: "danger",
};

const eur = (n: number) => `${Math.round(n).toLocaleString("de-DE")} €`;
const satz = (n: number) => `${String(n).replace(".", ",")} %`;

const IpBoxVergleich = () => {
  const [royalties, setRoyalties] = useState(500000);
  const [selected, setSelected] = useState<IPBoxRegime | null>(null);
  const [sortBy, setSortBy] = useState<"fit" | "rate" | "cost">("fit");

  // DE-Baseline zum Vergleich: KSt 15 % + SolZ + GewSt ~30 % auf Royalties
  const deBaseline = useMemo(() => royalties * 0.30, [royalties]);

  const sorted = useMemo(() => {
    const list = [...IP_BOX_REGIMES];
    if (sortBy === "rate") return list.sort((a, b) => a.effectiveRate - b.effectiveRate);
    if (sortBy === "cost") {
      const cost = (s: IPBoxRegime) => parseInt(s.runningCostEur.replace(/[^\d]/g, "").slice(0, 5)) || 0;
      return list.sort((a, b) => cost(a) - cost(b));
    }
    const fitOrder = { "Sehr gut": 0, Gut: 1, Mittel: 2, Schwierig: 3 } as const;
    return list.sort((a, b) => fitOrder[a.fitForGermans] - fitOrder[b.fitForGermans]);
  }, [sortBy]);

  if (selected) {
    return (
      <CockpitShell
        eyebrow={`IP-Box-Regime · ${selected.country}`}
        title={selected.regimeName}
        subtitle={`${selected.country}: ${satz(selected.effectiveRate)} effektiv, gegenüber rund 30 % in Deutschland.`}
      >
        <Detail s={selected} royalties={royalties} onBack={() => setSelected(null)} />
      </CockpitShell>
    );
  }

  return (
    <CockpitShell
      eyebrow="Steuern & Optimierung · IP-Box"
      title="9 IP-Box-Regime in EU und Schweiz für Software, Patente und Lizenzen"
      subtitle="Effektive Steuersätze von 1,75 bis 9 % auf qualifizierte IP-Einkünfte. Alle Regime folgen dem BEPS-Nexus-Ansatz, Substanz vor Ort ist Pflicht. Das deutsche Finanzamt prüft genau; reine Briefkasten-Strukturen funktionieren seit ATAD nicht mehr."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Deine geplanten IP-Einkünfte" icon={Sparkles}>
              <Field
                label="Lizenzeinnahmen pro Jahr (€)"
                htmlFor="ip-royalties"
                hint="Brutto-Lizenzgebühren bzw. Gewinne aus IP-Veräußerung pro Jahr"
              >
                <Input
                  id="ip-royalties"
                  type="number"
                  value={royalties}
                  onChange={(e) => setRoyalties(Math.max(0, Number(e.target.value) || 0))}
                  className="tabular"
                />
              </Field>
            </ToolSection>
            <Callout tone="warning" title="Wichtig vorweg (Stand 2026)">
              <ul className="list-disc space-y-1.5 pl-4">
                <li>
                  <strong>BEPS Action 5, Nexus-Ansatz:</strong> Nur der Anteil qualifizierter F&E-Ausgaben im IP-Box-Land
                  profitiert vom Box-Satz. Reine Briefkasten-Lizenzholdings funktionieren nicht mehr.
                </li>
                <li>
                  <strong>Hinzurechnungsbesteuerung nach AStG:</strong> Bei Wohnsitz in Deutschland, Beherrschung über 50 %,
                  IP-Box-Steuer unter 15 % und passiven Lizenzeinkünften wird hinzugerechnet. Aktive Lizenzierung mit eigener
                  F&E gilt als aktiv (Befreiung möglich).
                </li>
                <li>
                  <strong>Pillar 2 (OECD, seit 2024):</strong> 15 % Mindeststeuer für Konzerne über 750 Mio. € Umsatz. Bei
                  3 % effektiv wird auf 15 % aufgestockt. Kleine und mittlere Unternehmen sind nicht betroffen.
                </li>
                <li>
                  <strong>Substanz ist Pflicht:</strong> lokale Mitarbeitende, Büro und F&E-Tätigkeit, kein Direktor nur auf dem
                  Papier. Prüfungen sind seit 2018 verschärft.
                </li>
                <li>
                  <strong>Verrechnungspreise nach § 1 AStG:</strong> Lizenzgebühren müssen fremdüblich sein. Konzerninterne
                  Lizenzen brauchen eine Verrechnungspreis-Dokumentation (typisch 5 bis 15 % vom IP-Wert).
                </li>
              </ul>
            </Callout>
          </>
        }
        result={
          <ResultPanel
            variant="ink"
            kicker="Vergleichsbasis Deutschland"
            title="Steuer ohne IP-Box (KSt und GewSt rund 30 %)"
            value={eur(deBaseline)}
            valueHint={`auf ${eur(royalties)} Lizenzeinnahmen pro Jahr`}
          >
            <p className="text-sm leading-relaxed">
              Jede Karte unten zeigt die Steuer im jeweiligen Land und die Ersparnis gegenüber dieser Basis. Öffne ein Land für
              Substanzanforderungen, Dokumentationspflichten und DBA-Hinweise.
            </p>
          </ResultPanel>
        }
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">Alle Regime im Vergleich</h2>
        <ChoiceGroup<"fit" | "rate" | "cost">
          label="Sortierung"
          size="sm"
          value={sortBy}
          onChange={setSortBy}
          options={[
            { value: "fit", label: "Eignung für Deutsche" },
            { value: "rate", label: "Effektiver Steuersatz" },
            { value: "cost", label: "Compliance-Kosten" },
          ]}
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {sorted.map((s) => {
          const steuer = (royalties * s.effectiveRate) / 100;
          const ersparnis = deBaseline - steuer;
          const meetsMin = royalties >= s.minRoyaltiesEur;
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => setSelected(s)}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 text-left shadow-card transition-[border-color,box-shadow] duration-200 hover:border-accent-blue/40 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-snug">{s.country}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{s.regimeName.split(" — ")[0]}</p>
                </div>
                <ToneBadge tone={FIT_TONE[s.fitForGermans]} className="shrink-0">
                  {s.fitForGermans}
                </ToneBadge>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-success/20 bg-success-soft/60 p-3">
                  <p className="text-xs text-muted-foreground">Effektiver Satz</p>
                  <p className="mt-0.5 text-xl font-semibold tabular">{satz(s.effectiveRate)}</p>
                  <p className="text-xs text-muted-foreground tabular">Regulär {satz(s.standardKSt)}</p>
                </div>
                <div className="rounded-xl bg-secondary/60 p-3">
                  <p className="text-xs text-muted-foreground tabular">Steuer auf {Math.round(royalties / 1000)}k €</p>
                  <p className="mt-0.5 text-xl font-semibold tabular">{Math.round(steuer / 1000)}k €</p>
                  <p className="text-xs font-medium text-success tabular">−{Math.round(ersparnis / 1000)}k gegenüber DE</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <ToneBadge tone={CFC_TONE[s.cfcRisk]}>AStG-Risiko {s.cfcRisk.toLowerCase()}</ToneBadge>
                <ToneBadge tone="neutral">Setup {s.setupComplexity}</ToneBadge>
                {!meetsMin && <ToneBadge tone="danger">Unter Mindestvolumen</ToneBadge>}
              </div>

              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{s.mechanism}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-accent-blue">
                Details ansehen
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </button>
          );
        })}
      </div>

      <ToolSection title="Was alle 9 Regime gemeinsam haben" icon={ListChecks}>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 text-sm text-muted-foreground md:grid-cols-2">
          {[
            "BEPS-Nexus-Ansatz: Steuervorteil nur im Verhältnis zur F&E-Tätigkeit im IP-Box-Land",
            "Software-Urheberrechte ohne Patent qualifizieren in MT, NL, LU, BE und PL, nicht in CY, IE und HU",
            "Die Buchhaltung muss IP-Einkünfte getrennt von den übrigen Einkünften erfassen",
            "F&E-Tagebuch und Ausgaben-Tracking je IP-Asset sind Pflicht",
            "Geprüfte Abschlüsse sind für IP-Box-Anträge in den meisten Ländern Pflicht",
            "Verrechnungspreis-Dokumentation nach § 1 AStG bei konzerninternen Lizenzen ist Pflicht",
            "Ein Tax Ruling im IP-Box-Land schafft Rechtssicherheit (NL, CH und LU bieten Ruling-Verfahren)",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" aria-hidden="true" />
              <span className="leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </ToolSection>
    </CockpitShell>
  );
};

const Detail = ({ s, royalties, onBack }: { s: IPBoxRegime; royalties: number; onBack: () => void }) => {
  const steuer = (royalties * s.effectiveRate) / 100;
  const ersparnis = royalties * 0.30 - steuer;
  const meetsMin = royalties >= s.minRoyaltiesEur;

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
        <ArrowLeft aria-hidden="true" /> Zurück zur Übersicht
      </Button>

      <StatGrid cols={3}>
        <StatTile emphasis tone="success" label="Effektiver Steuersatz" value={satz(s.effectiveRate)} hint={s.mechanism} />
        <StatTile
          label="Steuer auf deine Lizenzeinnahmen"
          value={eur(steuer)}
          hint={`Bei ${Math.round(royalties / 1000)}k € Lizenzeinnahmen`}
        />
        <StatTile
          label="Ersparnis gegenüber Deutschland"
          value={eur(ersparnis)}
          tone={ersparnis > 0 ? "success" : "danger"}
          hint="Vergleichsbasis KSt und GewSt rund 30 %"
        />
      </StatGrid>

      {!meetsMin && (
        <Callout tone="danger" title="Wirtschaftlich fragwürdig: deine Lizenzeinnahmen liegen unter dem empfohlenen Minimum">
          Empfohlenes Mindestvolumen für {s.country}: {s.minRoyaltiesEur.toLocaleString("de-DE")} € pro Jahr. Bei deinen{" "}
          {royalties.toLocaleString("de-DE")} € fressen Setup ({s.setupCostEur}) und jährliche Compliance ({s.runningCostEur})
          die Steuerersparnis (rund {Math.round(ersparnis).toLocaleString("de-DE")} €) auf.
        </Callout>
      )}

      <ToolSection title="Eckdaten" icon={Globe}>
        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Reguläre Körperschaftsteuer", d: satz(s.standardKSt) },
            { t: "Effektive IP-Box-Steuer", d: satz(s.effectiveRate) },
            { t: "Setup-Kosten", d: s.setupCostEur },
            { t: "Jährliche Compliance", d: s.runningCostEur },
            { t: "AStG-Risiko", d: <ToneBadge tone={CFC_TONE[s.cfcRisk]}>{s.cfcRisk}</ToneBadge> },
            { t: "Eignung für Deutsche", d: <ToneBadge tone={FIT_TONE[s.fitForGermans]}>{s.fitForGermans}</ToneBadge> },
            { t: "Setup-Komplexität", d: s.setupComplexity },
            { t: "Mindestvolumen (wirtschaftlich)", d: `ab ${s.minRoyaltiesEur.toLocaleString("de-DE")} € pro Jahr` },
          ].map((e) => (
            <div key={e.t} className="rounded-xl bg-secondary/60 p-3">
              <dt className="text-xs text-muted-foreground">{e.t}</dt>
              <dd className="mt-1 font-semibold tabular">{e.d}</dd>
            </div>
          ))}
        </dl>
      </ToolSection>

      <ToolSection title="Qualifizierende IP-Einkünfte" icon={FileCheck}>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {s.qualifyingIncome.map((q, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              <span className="leading-relaxed">{q}</span>
            </li>
          ))}
        </ul>
      </ToolSection>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ToolSection title="BEPS-Nexus-Anforderung" icon={Microscope}>
          <p className="text-sm leading-relaxed text-muted-foreground">{s.nexusRequirement}</p>
        </ToolSection>
        <ToolSection title="Substanz vor Ort" icon={Building2}>
          <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-accent-blue">
            {s.substanceRequirement.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </ToolSection>
      </div>

      <ToolSection title="Dokumentationspflichten für F&E" icon={NotebookPen}>
        <ol className="space-y-2.5 text-sm">
          {s.rdDocumentation.map((r, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular">
                {i + 1}
              </span>
              <span className="leading-relaxed text-muted-foreground">{r}</span>
            </li>
          ))}
        </ol>
      </ToolSection>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ToolSection title="Vorteile" icon={CheckCircle2} className="border-success/25">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {s.pros.map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </ToolSection>
        <ToolSection title="Nachteile und Stolperfallen" icon={TrendingDown} className="border-danger/25">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {s.cons.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" aria-hidden="true" />
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </ToolSection>
      </div>

      <Callout tone="warning" icon={AlertTriangle} title="Doppelbesteuerungsabkommen mit Deutschland und AStG">
        {s.dbaNote}
      </Callout>

      <div className="flex justify-center">
        <Button asChild variant="outline">
          <a href={s.officialUrl} target="_blank" rel="noreferrer">
            Offizielle Steuerbehörde {s.country} <ExternalLink aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default IpBoxVergleich;
