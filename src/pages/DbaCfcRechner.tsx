import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Globe, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

// Daten pro Land: Steuersatz, DBA-Quellensteuer, AStG-Risiko
type CountryData = {
  flag: string;
  name: string;
  /** Lokaler Körperschaftssteuersatz in %. */
  cit: number;
  /** Quellensteuer auf Dividenden ans Ausland (regulär). */
  dividendWHT: number;
  /** Reduzierte Quellensteuer via DBA-DE. */
  dividendWHTwithDBA: number;
  /** Mutter-Tochter-RL anwendbar? */
  motherDaughter: boolean;
  /** Ist Land auf BMF-Niedrigsteuer-Liste? */
  isLowTaxCountry: boolean;
  /** Mindest-Beteiligung für DBA-Reduktion. */
  minStake?: string;
  notes: string[];
};

const COUNTRIES: Record<string, CountryData> = {
  estland: {
    flag: "🇪🇪",
    name: "Estland",
    cit: 0, // 0% thesauriert
    dividendWHT: 0,
    dividendWHTwithDBA: 0,
    motherDaughter: true,
    isLowTaxCountry: true,
    notes: ["0 % auf thesaurierte Gewinne · 22 % bei Ausschüttung"],
  },
  niederlande: {
    flag: "🇳🇱",
    name: "Niederlande",
    cit: 25.8,
    dividendWHT: 15,
    dividendWHTwithDBA: 5,
    motherDaughter: true,
    isLowTaxCountry: false,
    minStake: "≥ 25 % für 0 % via Mutter-Tochter",
    notes: ["Innovation Box: 9 % auf qualifiziertes IP", "Participation Exemption 100 %"],
  },
  luxembourg: {
    flag: "🇱🇺",
    name: "Luxemburg",
    cit: 24.94,
    dividendWHT: 15,
    dividendWHTwithDBA: 5,
    motherDaughter: true,
    isLowTaxCountry: false,
    minStake: "≥ 10 % oder 1,2 Mio €",
    notes: ["Participation Exemption 100 %", "SPF: 0 % CIT (separate Form)"],
  },
  irland: {
    flag: "🇮🇪",
    name: "Irland",
    cit: 12.5,
    dividendWHT: 25,
    dividendWHTwithDBA: 0,
    motherDaughter: true,
    isLowTaxCountry: true,
    minStake: "≥ 25 %",
    notes: ["12,5 % Trading · 25 % Passive", "Knowledge Box: 6,25 % auf IP"],
  },
  zypern: {
    flag: "🇨🇾",
    name: "Zypern",
    cit: 12.5,
    dividendWHT: 0,
    dividendWHTwithDBA: 0,
    motherDaughter: true,
    isLowTaxCountry: true,
    notes: ["0 % WHT auf Out-Dividenden", "Notional Interest Deduction möglich"],
  },
  malta: {
    flag: "🇲🇹",
    name: "Malta",
    cit: 5,
    dividendWHT: 0,
    dividendWHTwithDBA: 0,
    motherDaughter: true,
    isLowTaxCountry: true,
    notes: ["35 % nominell, 5 % effektiv via 6/7-Refund"],
  },
  schweiz: {
    flag: "🇨🇭",
    name: "Schweiz",
    cit: 11.9, // Zug niedrigster
    dividendWHT: 35,
    dividendWHTwithDBA: 0,
    motherDaughter: false, // Nicht-EU
    isLowTaxCountry: true,
    minStake: "≥ 25 % + 1 Jahr Haltedauer",
    notes: ["Zug 11,9 %, Zürich 19,7 %", "Bei DBA-Voraussetzungen: 0 % WHT"],
  },
  oesterreich: {
    flag: "🇦🇹",
    name: "Österreich",
    cit: 23,
    dividendWHT: 27.5,
    dividendWHTwithDBA: 0,
    motherDaughter: true,
    isLowTaxCountry: false,
    minStake: "≥ 10 %",
    notes: ["FlexCo 2024 — Vesting/Beteiligungs-friendly"],
  },
  polen: {
    flag: "🇵🇱",
    name: "Polen",
    cit: 19,
    dividendWHT: 19,
    dividendWHTwithDBA: 0,
    motherDaughter: true,
    isLowTaxCountry: true, // 9% small
    minStake: "≥ 25 % + 2 Jahre",
    notes: ["9 % CIT für Small Companies (< 2 Mio Umsatz)"],
  },
  litauen: {
    flag: "🇱🇹",
    name: "Litauen",
    cit: 15,
    dividendWHT: 15,
    dividendWHTwithDBA: 0,
    motherDaughter: true,
    isLowTaxCountry: true, // 5% small
    minStake: "≥ 10 %",
    notes: ["5 % CIT für Small (< 300k Umsatz, < 10 MA)"],
  },
  bulgarien: {
    flag: "🇧🇬",
    name: "Bulgarien",
    cit: 10,
    dividendWHT: 5,
    dividendWHTwithDBA: 0,
    motherDaughter: true,
    isLowTaxCountry: true,
    minStake: "≥ 10 %",
    notes: ["Niedrigster regulärer EU-CIT"],
  },
  usa: {
    flag: "🇺🇸",
    name: "USA",
    cit: 21,
    dividendWHT: 30,
    dividendWHTwithDBA: 5,
    motherDaughter: false,
    isLowTaxCountry: false,
    minStake: "≥ 10 % + 12 Monate",
    notes: ["LLC: oft Pass-Through (transparent)", "C-Corp: 21 % CIT"],
  },
  hongkong: {
    flag: "🇭🇰",
    name: "Hong Kong",
    cit: 16.5,
    dividendWHT: 0,
    dividendWHTwithDBA: 0,
    motherDaughter: false,
    isLowTaxCountry: true,
    notes: ["8,25 % bis 2 Mio HKD · Offshore-Status: 0 %"],
  },
  uk: {
    flag: "🇬🇧",
    name: "UK",
    cit: 25,
    dividendWHT: 0,
    dividendWHTwithDBA: 0,
    motherDaughter: false, // Brexit
    isLowTaxCountry: false,
    notes: ["19 % bis 50k Profit · 25 % darüber"],
  },
};

const DbaCfcRechner = () => {
  const [land, setLand] = useState<keyof typeof COUNTRIES>("luxembourg");
  const [beteiligung, setBeteiligung] = useState(100);
  const [haltedauer, setHaltedauer] = useState(12);
  const [auslandsgewinn, setAuslandsgewinn] = useState(200000);
  const [einkuenfteArt, setEinkuenfteArt] = useState<"aktiv" | "passive">("aktiv");
  const [hatHoldingDe, setHatHoldingDe] = useState(true);

  const country = COUNTRIES[land];

  const calc = useMemo(() => {
    const ausland = country.cit / 100;
    const auslandsSteuer = auslandsgewinn * ausland;
    const auslandsNetto = auslandsgewinn - auslandsSteuer;

    // Quellensteuer-Berechnung
    let wht = country.dividendWHT;
    const dbaApplies =
      beteiligung >= 10 && haltedauer >= 12 && country.dividendWHTwithDBA < country.dividendWHT;
    if (dbaApplies) wht = country.dividendWHTwithDBA;

    // Mutter-Tochter-RL (EU): 0 % wenn ≥ 10 % + 12 Monate
    const motherDaughter = country.motherDaughter && beteiligung >= 10 && haltedauer >= 12;
    if (motherDaughter) wht = 0;

    const whtAbsolute = (auslandsNetto * wht) / 100;
    const inDeAusgeschuettet = auslandsNetto - whtAbsolute;

    // DE-Behandlung
    let deSteuer = 0;
    let deBezeichnung = "";

    if (hatHoldingDe) {
      // §8b KStG: 95 % steuerfrei, 5 % steuerpflichtig × 30 % = 1,5 % effektiv
      deSteuer = inDeAusgeschuettet * 0.05 * 0.30;
      deBezeichnung = "DE-Holding §8b KStG: 95 % steuerfrei (1,5 % effektiv)";
    } else {
      // Privat: 26,375 % AbgSt
      deSteuer = inDeAusgeschuettet * 0.26375;
      deBezeichnung = "DE-Privatperson: 26,375 % Abgeltungssteuer";
    }

    // §AStG-Hinzurechnung-Check
    const istNiedrigsteuer = country.cit < 25;
    const istBeherrschungSchwelle = beteiligung > 50;
    const astgGreift = einkuenfteArt === "passive" && istNiedrigsteuer && istBeherrschungSchwelle;

    let astgZusatz = 0;
    let astgBezeichnung = "";
    if (astgGreift) {
      // §10 AStG: Hinzurechnung mit DE-Steuersatz (~30 %), aber Anrechnung auslandischer Steuer
      const sollDe = auslandsgewinn * 0.30;
      const anrechnung = auslandsSteuer;
      astgZusatz = Math.max(0, sollDe - anrechnung);
      astgBezeichnung = `§AStG Hinzurechnung: passive Einkünfte (Lizenz/Zinsen) + Niedrigsteuer (${country.cit} %) + Beherrschung > 50 % → DE besteuert mit ~30 % minus ${auslandsSteuer.toLocaleString("de-DE", { maximumFractionDigits: 0 })} € Anrechnung`;
    }

    const totalSteuer = auslandsSteuer + whtAbsolute + deSteuer + astgZusatz;
    const finalNetto = auslandsgewinn - totalSteuer;
    const effektivPct = (totalSteuer / auslandsgewinn) * 100;

    return {
      auslandsSteuer,
      auslandsNetto,
      whtAbsolute,
      whtRate: wht,
      motherDaughter,
      dbaApplies,
      inDeAusgeschuettet,
      deSteuer,
      deBezeichnung,
      astgGreift,
      astgZusatz,
      astgBezeichnung,
      totalSteuer,
      finalNetto,
      effektivPct,
    };
  }, [country, beteiligung, haltedauer, auslandsgewinn, einkuenfteArt, hatHoldingDe]);

  return (
    <CockpitShell
      eyebrow="DBA-CFC-Rechner"
      title="Auslands-Gewinn → DE-Steuer-Rechnung"
      subtitle="§AStG Hinzurechnung + DBA-Anrechnung + Mutter-Tochter-RL live für 14 Länder. Zeigt wieviel Steuer zwischen Ausland-Gesellschaft und DE-Privatperson/Holding entsteht."
    >
      {/* Inputs */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Auslandsgesellschaft</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Land</Label>
            <select
              value={land}
              onChange={(e) => setLand(e.target.value as keyof typeof COUNTRIES)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {Object.entries(COUNTRIES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.flag} {v.name} ({v.cit} % CIT)
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Auslandsgewinn (€)</Label>
            <Input
              type="number"
              value={auslandsgewinn}
              onChange={(e) => setAuslandsgewinn(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Beteiligung %
            </Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={beteiligung}
              onChange={(e) => setBeteiligung(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Haltedauer (Monate)
            </Label>
            <Input
              type="number"
              min={0}
              value={haltedauer}
              onChange={(e) => setHaltedauer(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Einkünfte-Art</Label>
            <select
              value={einkuenfteArt}
              onChange={(e) => setEinkuenfteArt(e.target.value as typeof einkuenfteArt)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="aktiv">Aktiv (Handel, Service, Produktion)</option>
              <option value="passive">Passiv (Lizenz, Zinsen, Dividenden, Mieten)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">DE-Empfänger</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: true, l: "DE-Holding-GmbH" },
                { v: false, l: "DE-Privatperson" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setHatHoldingDe(o.v)}
                  className={`rounded-md border h-10 text-sm transition-colors ${
                    hatHoldingDe === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Berechnung */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-4">Berechnung Schritt-für-Schritt</h3>

        <div className="space-y-3 text-sm">
          {/* 1. Auslandssteuer */}
          <div className="rounded-xl bg-secondary/40 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">1) Lokale {country.name}-Steuer ({country.cit} %)</span>
              <span className="font-mono">-{Math.round(calc.auslandsSteuer).toLocaleString("de-DE")} €</span>
            </div>
            <div className="text-[11px] text-muted-foreground">
              {auslandsgewinn.toLocaleString("de-DE")} × {country.cit} % = {Math.round(calc.auslandsSteuer).toLocaleString("de-DE")} €
            </div>
            <div className="text-[11px] mt-1">
              Verbleibend: <span className="font-mono">{Math.round(calc.auslandsNetto).toLocaleString("de-DE")} €</span>
            </div>
          </div>

          {/* 2. Quellensteuer */}
          <div className="rounded-xl bg-secondary/40 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">
                2) Quellensteuer beim Ausschütten ({calc.whtRate} %)
              </span>
              <span className="font-mono">
                -{Math.round(calc.whtAbsolute).toLocaleString("de-DE")} €
              </span>
            </div>
            <div className="text-[11px] text-muted-foreground">
              {calc.motherDaughter && (
                <div className="text-emerald-700">✓ EU-Mutter-Tochter-RL: 0 % Quellensteuer</div>
              )}
              {!calc.motherDaughter && calc.dbaApplies && (
                <div className="text-emerald-700">✓ DBA-Reduktion: {country.dividendWHT} % → {calc.whtRate} %</div>
              )}
              {!calc.motherDaughter && !calc.dbaApplies && (
                <div>Regulär ohne DBA: {country.dividendWHT} %</div>
              )}
              {country.minStake && <div>Voraussetzung: {country.minStake}</div>}
            </div>
            <div className="text-[11px] mt-1">
              Beim Empfänger ankommend:{" "}
              <span className="font-mono">{Math.round(calc.inDeAusgeschuettet).toLocaleString("de-DE")} €</span>
            </div>
          </div>

          {/* 3. DE-Steuer */}
          <div className="rounded-xl bg-secondary/40 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">3) DE-Empfänger-Steuer</span>
              <span className="font-mono">-{Math.round(calc.deSteuer).toLocaleString("de-DE")} €</span>
            </div>
            <div className="text-[11px] text-muted-foreground">{calc.deBezeichnung}</div>
          </div>

          {/* 4. AStG */}
          {calc.astgGreift && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-red-700">⚠ 4) §AStG-Hinzurechnung greift</span>
                <span className="font-mono text-red-700">
                  -{Math.round(calc.astgZusatz).toLocaleString("de-DE")} €
                </span>
              </div>
              <div className="text-[11px] text-muted-foreground">{calc.astgBezeichnung}</div>
            </div>
          )}
          {!calc.astgGreift && einkuenfteArt === "passive" && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs text-emerald-700">
              ✓ §AStG greift NICHT (entweder Steuersatz ≥ 25 % oder Beteiligung ≤ 50 %)
            </div>
          )}
          {einkuenfteArt === "aktiv" && country.isLowTaxCountry && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs text-emerald-700">
              ✓ §AStG greift NICHT bei aktiver Geschäftstätigkeit (auch bei Niedrigsteuer-Land)
            </div>
          )}
        </div>
      </div>

      {/* Total */}
      <div className="rounded-2xl border-2 border-accent-blue/40 bg-gradient-to-br from-card via-card to-accent-blue/5 p-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Total Steuer</div>
            <div className="text-xl font-bold text-red-700">
              {Math.round(calc.totalSteuer).toLocaleString("de-DE")} €
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Effektiv-Satz</div>
            <div className="text-xl font-bold text-accent-blue">{calc.effektivPct.toFixed(1)} %</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Netto beim Empfänger</div>
            <div className="text-xl font-bold text-emerald-700">
              {Math.round(calc.finalNetto).toLocaleString("de-DE")} €
            </div>
          </div>
        </div>
      </div>

      {/* Country-Notes */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-6 text-xs leading-relaxed">
        <div className="font-semibold mb-1">{country.flag} {country.name} — Spezifika:</div>
        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
          {country.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
          {country.motherDaughter && <li>✓ EU-Mutter-Tochter-Richtlinie greift (0 % WHT bei ≥ 10 % + 12 Monate)</li>}
          {country.isLowTaxCountry && <li>⚠ Niedrigsteuer-Land — §AStG-Risiko bei passiven Einkünften</li>}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtige Vereinfachungen:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>Modell mit DE-KSt+GewSt 30 % (kommunale Hebesätze variieren)</li>
              <li>§AStG-Aktivkatalog (Handel, Dienstleistung, Produktion) sehr vereinfacht — Detail-Prüfung mit StB</li>
              <li>Anrechnungs-Regel §10 Abs 1 AStG: tatsächlich gezahlte Auslandssteuer anrechenbar (vereinfacht)</li>
              <li>Bei Drittland-Töchtern: Einzelfall-Prüfung wegen DBA-Spezifika</li>
              <li>Pillar 2 (15 % Mindeststeuer) für Konzerne &gt; 750 Mio Umsatz nicht modelliert</li>
              <li>Konkrete Berechnung immer mit StB für internationales Steuerrecht</li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default DbaCfcRechner;
