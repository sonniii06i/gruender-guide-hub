import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  TrendingDown,
  ListChecks,
  FileCheck,
  Globe,
} from "lucide-react";
import { IP_BOX_REGIMES, type IPBoxRegime } from "@/data/ipBoxRegimes";

const FIT_COLOR: Record<IPBoxRegime["fitForGermans"], string> = {
  "Sehr gut": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Gut: "bg-accent-blue/10 text-accent-blue",
  Mittel: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Schwierig: "bg-red-500/10 text-red-700 dark:text-red-400",
};

const CFC_COLOR: Record<IPBoxRegime["cfcRisk"], string> = {
  Niedrig: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Mittel: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Hoch: "bg-red-500/10 text-red-700 dark:text-red-400",
};

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
        eyebrow={`${selected.flag} IP-Box-Regime`}
        title={selected.regimeName}
        subtitle={`${selected.country} · ${selected.effectiveRate} % effektiv vs. DE-Baseline ~30 %`}
      >
        <Detail s={selected} royalties={royalties} onBack={() => setSelected(null)} />
      </CockpitShell>
    );
  }

  return (
    <CockpitShell
      eyebrow="IP-Box-Vergleich"
      title="9 EU-/CH-IP-Box-Regimes für Software, Patente, Lizenzen"
      subtitle="Effektive Steuersätze 1,75-9 % auf qualifizierte IP-Einkünfte. BEPS-Nexus-konform — Substanz vor Ort Pflicht. DE-FA prüft scharf — keine Mailbox-Strukturen mehr seit ATAD."
    >
      {/* Wichtige Hinweise vorweg */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mb-6 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtig vorweg (Stand 2026):</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>BEPS Action 5 Nexus-Approach</strong>: nur der Anteil qualifizierter F&E-Ausgaben
                im IP-Box-Land profitiert vom Box-Satz. Reine Mailbox-Lizenzholdings funktionieren nicht mehr.
              </li>
              <li>
                <strong>§AStG Hinzurechnungsbesteuerung</strong>: bei DE-Wohnsitz + Beherrschung &gt; 50 % +
                IP-Box-Steuer &lt; 25 % + passiven Royalty-Einkünften → BMF rechnet hinzu. Aktive
                IP-Lizenzierung mit eigener R&D-Aktivität = aktiv (Befreiung möglich).
              </li>
              <li>
                <strong>Pillar 2 OECD ab 2024</strong>: 15 % Mindeststeuer für Konzerne &gt; 750 Mio €.
                Bei IP-Box mit 2,5 % effektiv: Top-Up Tax auf 15 %. Kleine KMUs unbetroffen.
              </li>
              <li>
                <strong>Substanz ist Pflicht</strong>: lokale Mitarbeiter, Büro, R&D-Aktivität — nicht nur
                ein 'Director auf dem Papier'. Audits seit 2018 verschärft.
              </li>
              <li>
                <strong>DE-Verrechnungspreise §1 AStG</strong>: Lizenzgebühren-Höhe muss arm's-length sein.
                Inter-Company-Lizenzen brauchen Verrechnungspreis-Dokumentation (typisch 5-15 % vom IP-Wert).
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Royalties Input */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Deine geplanten IP-Einkünfte</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Jährliche Royalties / IP-Lizenz-Einnahmen (€)
            </Label>
            <Input
              type="number"
              value={royalties}
              onChange={(e) => setRoyalties(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Brutto-Lizenzgebühren bzw. IP-Veräußerungsgewinne pro Jahr
            </div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              DE-Baseline-Vergleich (KSt + GewSt ~30 %)
            </div>
            <div className="text-2xl font-bold text-foreground">
              {Math.round(deBaseline).toLocaleString("de-DE")} €
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              Steuer in DE ohne IP-Box-Setup
            </div>
          </div>
        </div>
      </div>

      {/* Sort Toggle */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSortBy("fit")}
          className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
            sortBy === "fit" ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Nach DE-Eignung
        </button>
        <button
          onClick={() => setSortBy("rate")}
          className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
            sortBy === "rate" ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Nach effektivem Steuersatz
        </button>
        <button
          onClick={() => setSortBy("cost")}
          className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
            sortBy === "cost" ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Nach Compliance-Kosten
        </button>
      </div>

      {/* Country Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {sorted.map((s) => {
          const steuer = (royalties * s.effectiveRate) / 100;
          const ersparnis = deBaseline - steuer;
          const meetsMin = royalties >= s.minRoyaltiesEur;
          return (
            <button
              key={s.slug}
              onClick={() => setSelected(s)}
              className="text-left rounded-2xl border border-border bg-card p-5 hover:border-accent-blue/40 hover:shadow-soft transition-all group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{s.flag}</span>
                  <div>
                    <div className="font-bold text-lg leading-tight">{s.country}</div>
                    <div className="text-[11px] text-muted-foreground">{s.regimeName.split(" — ")[0]}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 shrink-0 ${FIT_COLOR[s.fitForGermans]}`}>
                  {s.fitForGermans}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-2.5">
                  <div className="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">Effektiv-Satz</div>
                  <div className="text-xl font-bold text-foreground">{s.effectiveRate} %</div>
                  <div className="text-[10px] text-muted-foreground">Standard-KSt: {s.standardKSt} %</div>
                </div>
                <div className="rounded-lg bg-secondary/50 p-2.5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Steuer auf {Math.round(royalties / 1000)}k €</div>
                  <div className="text-xl font-bold text-foreground">{Math.round(steuer / 1000)}k €</div>
                  <div className="text-[10px] text-emerald-700 dark:text-emerald-400">−{Math.round(ersparnis / 1000)}k vs. DE</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[10px] mb-2">
                <span className={`rounded-full px-2 py-0.5 ${CFC_COLOR[s.cfcRisk]}`}>
                  AStG-Risiko {s.cfcRisk}
                </span>
                <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5">
                  Setup {s.setupComplexity}
                </span>
                {!meetsMin && (
                  <span className="rounded-full bg-red-500/10 text-red-700 dark:text-red-400 px-2 py-0.5">
                    &lt; Min-Volume
                  </span>
                )}
              </div>

              <div className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                {s.mechanism}
              </div>
            </button>
          );
        })}
      </div>

      {/* Universal hints */}
      <div className="rounded-2xl border border-border bg-secondary/30 p-5 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <ListChecks className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-foreground mb-2">Was alle 9 Regimes gemeinsam haben:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>BEPS-Nexus-Approach: Steuer-Vorteil nur proportional zur F&E-Aktivität im IP-Box-Land</li>
              <li>Software-Copyrights ohne Patent qualifizieren in: MT, NL, LU, BE, PL — NICHT in CY, IE, HU</li>
              <li>Buchhaltung muss IP-Income separat tracken (vom Standard-Income)</li>
              <li>R&D-Tagebuch + Spend-Tracking pro IP-Asset Pflicht</li>
              <li>Audited Accounts für IP-Box-Anträge in den meisten Ländern Pflicht</li>
              <li>DE-Verrechnungspreis-Doku §1 AStG bei Inter-Company-Lizenzen Pflicht</li>
              <li>Tax-Ruling im IP-Box-Land empfohlen für Rechtssicherheit (NL/CH/LU bieten Ruling-Systeme)</li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

const Detail = ({ s, royalties, onBack }: { s: IPBoxRegime; royalties: number; onBack: () => void }) => {
  const steuer = (royalties * s.effectiveRate) / 100;
  const ersparnis = royalties * 0.30 - steuer;
  const meetsMin = royalties >= s.minRoyaltiesEur;

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Zurück zur Übersicht
      </button>

      {/* Steuer-Resultat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
            Effektiver Steuersatz
          </div>
          <div className="text-3xl font-bold text-foreground">{s.effectiveRate} %</div>
          <div className="text-[11px] text-muted-foreground mt-1">{s.mechanism}</div>
        </div>
        <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-accent-blue font-semibold mb-1">
            Steuer auf deine Royalties
          </div>
          <div className="text-3xl font-bold text-foreground">{Math.round(steuer).toLocaleString("de-DE")} €</div>
          <div className="text-[11px] text-muted-foreground mt-1">
            Bei {Math.round(royalties / 1000)}k € Lizenz-Einnahmen
          </div>
        </div>
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold mb-1">
            Ersparnis vs. DE-Baseline
          </div>
          <div className="text-3xl font-bold text-foreground">{Math.round(ersparnis).toLocaleString("de-DE")} €</div>
          <div className="text-[11px] text-muted-foreground mt-1">
            DE-KSt+GewSt ~30 % Vergleichsbasis
          </div>
        </div>
      </div>

      {/* Min-Volume Warning */}
      {!meetsMin && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-xs">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-700 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground mb-1">
                Setup wirtschaftlich fragwürdig: deine Royalties sind unter dem Empfehlungs-Minimum
              </div>
              <div className="text-muted-foreground">
                Empfohlener Minimum-Royalty-Volume für {s.country}: {s.minRoyaltiesEur.toLocaleString("de-DE")} €/Jahr.
                Bei deinen {royalties.toLocaleString("de-DE")} € Royalties werden Setup ({s.setupCostEur}) +
                jährliche Compliance ({s.runningCostEur}) die Steuer-Ersparnis (~{Math.round(ersparnis).toLocaleString("de-DE")} €) auffressen.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Eckdaten */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Globe className="h-4 w-4 text-accent-blue" />
          Eckdaten
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg bg-secondary/50 p-3">
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Standard-KSt</dt>
            <dd className="font-semibold text-foreground mt-1">{s.standardKSt} %</dd>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Effektive IP-Box-Steuer</dt>
            <dd className="font-semibold text-foreground mt-1">{s.effectiveRate} %</dd>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Setup-Kosten</dt>
            <dd className="font-semibold text-foreground mt-1">{s.setupCostEur}</dd>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Jährliche Compliance</dt>
            <dd className="font-semibold text-foreground mt-1">{s.runningCostEur}</dd>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">AStG-Risiko</dt>
            <dd className={`font-semibold mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] ${CFC_COLOR[s.cfcRisk]}`}>
              {s.cfcRisk}
            </dd>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">DE-Eignung</dt>
            <dd className={`font-semibold mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] ${FIT_COLOR[s.fitForGermans]}`}>
              {s.fitForGermans}
            </dd>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Setup-Komplexität</dt>
            <dd className="font-semibold text-foreground mt-1">{s.setupComplexity}</dd>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Min-Royalties (wirtschaftlich)</dt>
            <dd className="font-semibold text-foreground mt-1">≥ {s.minRoyaltiesEur.toLocaleString("de-DE")} €/Jahr</dd>
          </div>
        </dl>
      </div>

      {/* Qualifizierende Einkommen */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <FileCheck className="h-4 w-4 text-accent-blue" />
          Qualifizierende IP-Einkommen
        </h3>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          {s.qualifyingIncome.map((q, i) => (
            <li key={i} className="flex gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Nexus + Substanz */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold text-sm mb-2">BEPS-Nexus-Anforderung</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{s.nexusRequirement}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold text-sm mb-2">Substanz-Anforderung vor Ort</h3>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {s.substanceRequirement.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent-blue shrink-0">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* R&D-Doku */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-bold text-sm mb-3">R&D-Dokumentations-Pflichten</h3>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          {s.rdDocumentation.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-accent-blue font-semibold shrink-0">{i + 1}.</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pros / Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <h3 className="font-bold text-sm mb-2 text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Vorteile
          </h3>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {s.pros.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-700 dark:text-emerald-400 shrink-0">+</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <h3 className="font-bold text-sm mb-2 text-red-700 dark:text-red-400 flex items-center gap-2">
            <TrendingDown className="h-4 w-4" /> Nachteile / Stolperfallen
          </h3>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {s.cons.map((c, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-red-700 dark:text-red-400 shrink-0">−</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* DBA-Hinweis */}
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
        <h3 className="font-bold text-sm mb-2 text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" /> DBA-Deutschland + AStG-Behandlung
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{s.dbaNote}</p>
      </div>

      {/* Official Link */}
      <div className="text-center">
        <a
          href={s.officialUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:underline"
        >
          Offizielle Steuerbehörde {s.country} <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

export default IpBoxVergleich;
