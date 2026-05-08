import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  TrendingUp,
  XCircle,
  Calculator,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================

type Setup = {
  // Wirtschaftliche Daten
  jahresGewinn?: number;
  reinvestPct?: number;
  liquiditaetsbedarfPrivat?: number;
  estSatz?: number;
  // Zusammensetzung
  founders?: number;
  vcPlanned?: boolean;
  exitInYears?: number;
  international?: "none" | "eu" | "global";
  familyContext?: boolean;
  largeWealth?: boolean;
  multiBrand?: boolean;
  hasIP?: boolean;
  // Persönliches
  existingSetup?: "none" | "einzel" | "ug" | "gmbh" | "holding";
  alter?: number;
  familienstand?: "ledig" | "verheiratet" | "geschieden";
};

type StructureCalc = {
  slug: string;
  name: string;
  emoji: string;
  /** 0 = nicht anwendbar, 100 = perfect match */
  fitScore: number;
  /** Steuer pro Jahr für DIESEN User. */
  steuerProJahr: number;
  /** Privat-Netto pro Jahr (auszahlbarer Anteil). */
  privatNettoProJahr: number;
  /** Effektivsteuer-Satz. */
  effektivPct: number;
  /** Über 5 Jahre kumuliert. */
  steuer5Jahre: number;
  /** Bei Exit: zusätzliche Ersparnis vs. Standard. */
  exitErsparnis?: number;
  /** Empfehlung-Begründung. */
  why: string[];
  /** Caveats. */
  caveats: string[];
  /** Setup-Cost einmalig. */
  setupCost: number;
  /** Laufende Kosten/Jahr. */
  runningCost: number;
  /** Detail-Link. */
  link: string;
};

// ============================================================
// BERECHNUNGS-LOGIK
// ============================================================

const KSt_PLUS_GEWST = 0.30; // ~30 % auf Op-GmbH-Gewinn (vereinfacht)
const ABG_ST = 0.26375; // 25 % AbgSt + Soli auf Dividenden privat
const HOLDING_RATE = 0.015; // ~1,5 % effektiv via §8b KStG

function estProgression(zvE: number): number {
  // Vereinfachte ESt-Berechnung 2026 (Tarif § 32a EStG)
  if (zvE <= 12096) return 0;
  if (zvE <= 17443) {
    const y = (zvE - 12096) / 10000;
    return Math.round((932.3 * y + 1400) * y);
  }
  if (zvE <= 68480) {
    const z = (zvE - 17443) / 10000;
    return Math.round((176.64 * z + 2397) * z + 1015.13);
  }
  if (zvE <= 277825) return Math.round(0.42 * zvE - 10911.92);
  return Math.round(0.45 * zvE - 19246.67);
}

function estSatzEffektiv(zvE: number): number {
  if (zvE <= 0) return 0;
  return estProgression(zvE) / zvE;
}

function calculateAll(s: Setup): StructureCalc[] {
  const profit = s.jahresGewinn ?? 0;
  const reinvest = (s.reinvestPct ?? 50) / 100;
  const liquid = s.liquiditaetsbedarfPrivat ?? profit * (1 - reinvest);
  const eS = s.estSatz ?? estSatzEffektiv(profit);

  const calcs: StructureCalc[] = [];

  // ==========================================================
  // 1) Einzelunternehmen
  // ==========================================================
  {
    const steuer = estProgression(profit);
    const netto = profit - steuer;
    const fit = profit < 30000 ? 90 : profit < 60000 ? 60 : profit < 100000 ? 35 : 10;
    calcs.push({
      slug: "einzel",
      name: "Einzelunternehmen",
      emoji: "🚀",
      fitScore: s.vcPlanned ? 0 : s.founders && s.founders > 1 ? 0 : fit,
      steuerProJahr: steuer,
      privatNettoProJahr: netto,
      effektivPct: profit > 0 ? (steuer / profit) * 100 : 0,
      steuer5Jahre: steuer * 5,
      why: [
        `ESt-Satz ${(eS * 100).toFixed(0)} % auf ${profit.toLocaleString("de-DE")} € Gewinn`,
        "Keine KSt+GewSt-Bürokratie, kein Notar",
        "100 % verfügbar — direkt privat",
      ],
      caveats: [
        "Keine Haftungsbeschränkung — Privatvermögen haftet",
        "Bei Wachstum > 60k: Holding lohnt zunehmend",
        s.founders && s.founders > 1 ? "MEHRERE Gründer → GbR/UG/GmbH nötig" : "",
      ].filter(Boolean),
      setupCost: 50,
      runningCost: 800,
      link: "/playbook/preview/einzelunternehmen-gruendung",
    });
  }

  // ==========================================================
  // 2) UG (haftungsbeschränkt)
  // ==========================================================
  {
    const steuerGmbh = profit * KSt_PLUS_GEWST;
    const verfuegbar = profit - steuerGmbh;
    // Ausschüttung gemäß Liquiditätsbedarf
    const ausgeschuettet = Math.min(liquid, verfuegbar);
    const steuerAbgSt = ausgeschuettet * ABG_ST;
    const totalSteuer = steuerGmbh + steuerAbgSt;
    const privatNetto = ausgeschuettet - steuerAbgSt;
    const fit = profit >= 30000 && profit < 200000 && !s.vcPlanned ? 80 : 30;
    calcs.push({
      slug: "ug",
      name: "UG (haftungsbeschränkt)",
      emoji: "🇩🇪",
      fitScore: fit,
      steuerProJahr: totalSteuer,
      privatNettoProJahr: privatNetto,
      effektivPct: profit > 0 ? (totalSteuer / profit) * 100 : 0,
      steuer5Jahre: totalSteuer * 5,
      why: [
        `KSt+GewSt 30 % = ${steuerGmbh.toLocaleString("de-DE", { maximumFractionDigits: 0 })} €`,
        `+ AbgSt 26,375 % auf ${ausgeschuettet.toLocaleString("de-DE", { maximumFractionDigits: 0 })} € Ausschüttung`,
        "1 € Stammkapital · Haftungsbeschränkung",
        profit < 100000 ? "Übergangs-Lösung bevor GmbH/Holding sich lohnt" : "",
      ].filter(Boolean),
      caveats: [
        "25 %-Pflichtrücklage bis 25k Stammkapital erreicht",
        "Bei Wachstum > 100k: in GmbH umwandeln + Holding aufsetzen",
      ],
      setupCost: 400,
      runningCost: 1500,
      link: "/playbook/preview/ug-gruendung",
    });
  }

  // ==========================================================
  // 3) GmbH ohne Holding (Standalone)
  // ==========================================================
  {
    const steuerGmbh = profit * KSt_PLUS_GEWST;
    const verfuegbar = profit - steuerGmbh;
    const ausgeschuettet = Math.min(liquid, verfuegbar);
    const steuerAbgSt = ausgeschuettet * ABG_ST;
    const totalSteuer = steuerGmbh + steuerAbgSt;
    const privatNetto = ausgeschuettet - steuerAbgSt;
    const fit = profit >= 60000 && profit < 100000 ? 70 : profit >= 100000 ? 40 : 30;
    calcs.push({
      slug: "gmbh",
      name: "GmbH (standalone, ohne Holding)",
      emoji: "🏛️",
      fitScore: fit,
      steuerProJahr: totalSteuer,
      privatNettoProJahr: privatNetto,
      effektivPct: profit > 0 ? (totalSteuer / profit) * 100 : 0,
      steuer5Jahre: totalSteuer * 5,
      why: [
        "Volle Haftungsbeschränkung",
        "25k Stammkapital (12,5k bei Bargründung)",
        "KSt+GewSt 30 % + AbgSt bei Ausschüttung",
        "Solider Standard für stabile mittelständische Geschäfte",
      ],
      caveats: [
        profit >= 100000 ? "Bei deinem Gewinn: Holding lohnt sich (signifikante Reinvest-Vorteile)" : "",
        "Setup-Kosten 1.500–2.500 € + 25k gebundenes Stammkapital",
      ].filter(Boolean),
      setupCost: 2000,
      runningCost: 2500,
      link: "/playbook/preview/gmbh-gruendung",
    });
  }

  // ==========================================================
  // 4) Standard 2-Stufen-Holding
  // ==========================================================
  {
    const steuerGmbh = profit * KSt_PLUS_GEWST;
    const verfuegbar = profit - steuerGmbh;
    // In Holding: 1,5 % auf Ausschüttung von Op-GmbH
    const steuerHolding = verfuegbar * HOLDING_RATE;
    const inHolding = verfuegbar - steuerHolding;
    // Davon nur liquid privat entnommen mit AbgSt
    const ausgeschuettetPrivat = Math.min(liquid, inHolding);
    const steuerAbgSt = ausgeschuettetPrivat * ABG_ST;
    const totalSteuer = steuerGmbh + steuerHolding + steuerAbgSt;
    const privatNetto = ausgeschuettetPrivat - steuerAbgSt;
    const fit = profit >= 100000 && !s.vcPlanned && !s.multiBrand ? 95 : profit >= 100000 ? 60 : 20;

    // Exit-Ersparnis: bei 1 Mio Op-Gewinn-Verkauf: 95% steuerfrei (sonst Privat-Verkauf §17 EStG mit 60%×42% = ~25%)
    let exitErsparnis = 0;
    if (s.exitInYears && s.exitInYears > 0) {
      const exitErloes = profit * 4; // grobe Schätzung 4× Jahresgewinn
      exitErsparnis = exitErloes * (0.25 - 0.05 * 0.30); // Differenz zwischen privat und Holding
    }

    calcs.push({
      slug: "holding-standard",
      name: "Standard 2-Stufen-Holding",
      emoji: "🏛️",
      fitScore: fit,
      steuerProJahr: totalSteuer,
      privatNettoProJahr: privatNetto,
      effektivPct: profit > 0 ? (totalSteuer / profit) * 100 : 0,
      steuer5Jahre: totalSteuer * 5,
      exitErsparnis,
      why: [
        `Op-GmbH 30 % + Schachtel 1,5 % auf Reinvest + AbgSt auf ${ausgeschuettetPrivat.toLocaleString("de-DE", { maximumFractionDigits: 0 })} € Auszahlung`,
        `Reinvest in Holding: ${inHolding.toLocaleString("de-DE", { maximumFractionDigits: 0 })} € pro Jahr mit 1,5 % statt 26,375 %`,
        s.exitInYears
          ? `Bei Exit in ${s.exitInYears} Jahren: 95 % steuerfrei (${exitErsparnis.toLocaleString("de-DE", { maximumFractionDigits: 0 })} € Ersparnis)`
          : "",
        "Volle Haftungsbeschränkung · Vermögen aufbauen in Holding",
      ].filter(Boolean),
      caveats: [
        "**7-Jahres-Sperrfrist §22 UmwStG** bei Anteilseinbringung",
        "Setup 1,5–2,5k € + 25k Holding-Stammkapital",
        "Konzern-Buchhaltung StB-Kosten ~3k/Jahr extra",
        profit < 100000 ? "Bei Gewinn < 100k amortisiert sich Setup nicht" : "",
      ].filter(Boolean),
      setupCost: 2500,
      runningCost: 4000,
      link: "/cockpit/holding-designer",
    });
  }

  // ==========================================================
  // 5) Familien-Pool-Holding
  // ==========================================================
  {
    const steuerGmbh = profit * KSt_PLUS_GEWST;
    const verfuegbar = profit - steuerGmbh;
    const steuerHolding = verfuegbar * HOLDING_RATE;
    const inHolding = verfuegbar - steuerHolding;
    const ausgeschuettetPrivat = Math.min(liquid, inHolding);
    const steuerAbgSt = ausgeschuettetPrivat * ABG_ST;
    const totalSteuer = steuerGmbh + steuerHolding + steuerAbgSt;
    const privatNetto = ausgeschuettetPrivat - steuerAbgSt;
    const fit = s.familyContext && profit >= 200000 ? 90 : 0;
    calcs.push({
      slug: "familien-pool",
      name: "Familien-Pool-Holding",
      emoji: "👨‍👩‍👧",
      fitScore: fit,
      steuerProJahr: totalSteuer,
      privatNettoProJahr: privatNetto,
      effektivPct: profit > 0 ? (totalSteuer / profit) * 100 : 0,
      steuer5Jahre: totalSteuer * 5,
      why: [
        "Wie 2-Stufen-Holding + Pool-Vertrag",
        "**§13a ErbStG**: bis 100 % Schenkungs-Befreiung bei Vollverschonung",
        "Schenkung in 10-Jahres-Tranchen: 400k €/Kind alle 10 Jahre steuerfrei",
        "Kinder als Mit-Gesellschafter aufbauen vor Erbgang",
      ],
      caveats: [
        "**Behaltensfrist 7 Jahre** + **700 % Lohnsumme** für Vollverschonung",
        "Pool-Vertrag notariell: zusätzliche 1,5–3k €",
        "Familien-Konflikte: Pool kann schwer zu lösen sein",
      ],
      setupCost: 5000,
      runningCost: 4500,
      link: "/cockpit/holding-designer",
    });
  }

  // ==========================================================
  // 6) Familienstiftung
  // ==========================================================
  {
    const steuerGmbh = profit * KSt_PLUS_GEWST;
    const verfuegbar = profit - steuerGmbh;
    const steuerStiftung = verfuegbar * HOLDING_RATE;
    const totalSteuer = steuerGmbh + steuerStiftung;
    // Stiftung schüttet typisch nicht aus an Privatperson — Kreis gewinnt
    const privatNetto = 0;
    const fit = s.largeWealth && (s.alter ?? 0) > 50 ? 85 : s.largeWealth ? 70 : 0;
    calcs.push({
      slug: "stiftung",
      name: "Familienstiftung + Holding",
      emoji: "🏛️",
      fitScore: fit,
      steuerProJahr: totalSteuer,
      privatNettoProJahr: privatNetto,
      effektivPct: profit > 0 ? (totalSteuer / profit) * 100 : 0,
      steuer5Jahre: totalSteuer * 5,
      why: [
        "Vermögen 'eingefroren' — Pflichtteils- + Scheidungs-Schutz",
        "Lebt ewig (auch nach Tod der Gründer)",
        "Schachtelprivileg auch in Stiftung",
        s.familyContext ? "Familien-Streit präventiv unterbunden" : "",
      ].filter(Boolean),
      caveats: [
        "**Erbersatzsteuer alle 30 Jahre** ~30 % auf Stiftungsvermögen",
        "Vermögen UNWIDERRUFLICH übertragen — kann nicht zurückgeholt werden",
        "Setup 10–30k € + jährlich 5–15k € Verwaltung",
      ],
      setupCost: 25000,
      runningCost: 12000,
      link: "/cockpit/holding-designer",
    });
  }

  // ==========================================================
  // 7) Doppel-Holding mit Investor (VC)
  // ==========================================================
  {
    const steuerGmbh = profit * KSt_PLUS_GEWST;
    const verfuegbar = profit - steuerGmbh;
    const steuerHolding = verfuegbar * HOLDING_RATE;
    const totalSteuer = steuerGmbh + steuerHolding;
    const privatNetto = 0; // typisch alles in Founder-Holding bis Exit
    const fit = s.vcPlanned ? 95 : 0;

    let exitErsparnis = 0;
    if (s.exitInYears && s.exitInYears > 0) {
      const exitErloes = profit * 6; // VC-Multiples typ. höher
      exitErsparnis = exitErloes * (0.25 - 0.05 * 0.30);
    }

    calcs.push({
      slug: "vc-doppel",
      name: "Doppel-Holding mit VC-Investor",
      emoji: "📈",
      fitScore: fit,
      steuerProJahr: totalSteuer,
      privatNettoProJahr: privatNetto,
      effektivPct: profit > 0 ? (totalSteuer / profit) * 100 : 0,
      steuer5Jahre: totalSteuer * 5,
      exitErsparnis,
      why: [
        "Founder-Holding VOR Term-Sheet",
        s.exitInYears
          ? `Bei Exit in ${s.exitInYears} Jahren: pro Founder ${(exitErsparnis * 0.6).toLocaleString("de-DE", { maximumFractionDigits: 0 })} € Steuer-Ersparnis`
          : "Bei späterem Exit: 95 % steuerfrei via §8b",
        "Investoren-Holding parallel (steuerlich getrennt)",
        "Vesting / Reverse Vesting auf Founder-Holding-Ebene",
      ],
      caveats: [
        "**MUSS vor Term-Sheet aufgesetzt sein** — sonst 7-Jahres-Sperrfrist verlängert",
        "Pro Founder eine eigene Holding (3.000–5.000 € Notar pro Person)",
        "Komplex bei mehreren Foundern + Investoren-Drag-Along",
      ],
      setupCost: 4000 * (s.founders ?? 1),
      runningCost: 4000,
      link: "/cockpit/holding-designer",
    });
  }

  // ==========================================================
  // 8) 3-Stufen-Holding (Multi-Brand)
  // ==========================================================
  {
    const steuerGmbh = profit * KSt_PLUS_GEWST;
    const verfuegbar = profit - steuerGmbh;
    const steuerHolding = verfuegbar * HOLDING_RATE;
    const ausgeschuettetPrivat = Math.min(liquid, verfuegbar - steuerHolding);
    const steuerAbgSt = ausgeschuettetPrivat * ABG_ST;
    const totalSteuer = steuerGmbh + steuerHolding + steuerAbgSt;
    const privatNetto = ausgeschuettetPrivat - steuerAbgSt;
    const fit = s.multiBrand ? 90 : 0;
    calcs.push({
      slug: "3-stufen",
      name: "3-Stufen-Holding (Multi-Brand)",
      emoji: "🏢",
      fitScore: fit,
      steuerProJahr: totalSteuer,
      privatNettoProJahr: privatNetto,
      effektivPct: profit > 0 ? (totalSteuer / profit) * 100 : 0,
      steuer5Jahre: totalSteuer * 5,
      why: [
        "Risiko-Trennung pro Geschäftsfeld",
        "Selektiver Exit pro Brand möglich",
        "Investor-Aufnahme nur in Sub-Bereich ohne Top-Holding zu öffnen",
      ],
      caveats: [
        "4–7 GmbHs zu führen + Konsolidierung",
        "StB-Kosten 10–25k €/Jahr",
        "Ab Konzern-Pflicht: WP-Pflicht (~10k +)",
      ],
      setupCost: 8000,
      runningCost: 12000,
      link: "/cockpit/holding-designer",
    });
  }

  // ==========================================================
  // 9) Estland OÜ
  // ==========================================================
  if (s.international === "eu" || s.international === "global") {
    // 0% thesauriert, 22% bei Ausschüttung
    const inOu = profit * (1 - reinvest);
    const steuerOu = inOu * 0.22; // bei Ausschüttung
    const ausgeschuettetPrivat = Math.min(liquid, inOu - steuerOu);
    const totalSteuer = steuerOu;
    const privatNetto = ausgeschuettetPrivat;
    const fit = profit < 200000 && reinvest > 0.5 && !s.vcPlanned ? 75 : 30;
    calcs.push({
      slug: "estland-ou",
      name: "Estland OÜ (e-Residency)",
      emoji: "🇪🇪",
      fitScore: fit,
      steuerProJahr: totalSteuer,
      privatNettoProJahr: privatNetto,
      effektivPct: profit > 0 ? (totalSteuer / profit) * 100 : 0,
      steuer5Jahre: totalSteuer * 5,
      why: [
        "**0 % Steuer auf reinvestierte Gewinne** (einzigartig in EU)",
        "22 % nur bei Ausschüttung an Privatperson",
        "Setup in 5 Tagen via e-Residency, ~600 € all-in",
      ],
      caveats: [
        "**§AStG-Hinzurechnung wahrscheinlich** bei DE-Wohnsitz + passiven Einkünften",
        "Bei DE-Wohnsitz: Privat-Auszahlung zusätzlich AbgSt + EE-Vorbelastung anrechenbar",
        "Funktioniert sauber meist erst nach Wegzug aus DE",
      ],
      setupCost: 600,
      runningCost: 2000,
      link: "/cockpit/eu-alternativen",
    });
  }

  // ==========================================================
  // 10) Niederlande BV
  // ==========================================================
  if ((s.international === "eu" || s.international === "global") && profit >= 200000) {
    const taxRate = profit <= 200000 ? 0.19 : 0.258;
    const steuer = profit * taxRate;
    const verfuegbar = profit - steuer;
    const ausgeschuettetPrivat = Math.min(liquid, verfuegbar);
    const steuerAbgSt = ausgeschuettetPrivat * ABG_ST;
    const totalSteuer = steuer + steuerAbgSt;
    const privatNetto = ausgeschuettetPrivat - steuerAbgSt;
    const fit = profit >= 200000 && (s.hasIP || s.international === "global") ? 75 : 50;
    calcs.push({
      slug: "nl-bv",
      name: "Niederlande BV",
      emoji: "🇳🇱",
      fitScore: fit,
      steuerProJahr: totalSteuer,
      privatNettoProJahr: privatNetto,
      effektivPct: profit > 0 ? (totalSteuer / profit) * 100 : 0,
      steuer5Jahre: totalSteuer * 5,
      why: [
        `19 % bis 200k Gewinn, 25,8 % darüber (du: ${(taxRate * 100).toFixed(1)} %)`,
        s.hasIP ? "**Innovation Box: 9 % auf qualifizierten IP**" : "",
        "100 % Participation Exemption (besser als DE 95 %)",
        "EU-Mutter-Tochter-RL + Mutter-Tochter-Privileg",
      ].filter(Boolean),
      caveats: [
        "Substance-Test seit 2024 verschärft (ATAD III)",
        "Setup 1,5–3k € + Doppel-Buchhaltung mit DE",
      ],
      setupCost: 3000,
      runningCost: 4500,
      link: "/cockpit/eu-alternativen",
    });
  }

  // Sortiere nach FitScore (höchster zuerst)
  return calcs.sort((a, b) => b.fitScore - a.fitScore);
}

// ============================================================
// COMPONENT
// ============================================================

const EntscheidungsEngine = () => {
  const [setup, setSetup] = useState<Setup>({
    jahresGewinn: 250000,
    reinvestPct: 50,
    founders: 1,
    estSatz: 0.42,
  });
  const [step, setStep] = useState(1);
  const update = (patch: Partial<Setup>) => setSetup({ ...setup, ...patch });

  const calcs = useMemo(() => calculateAll(setup), [setup]);
  const top3 = calcs.filter((c) => c.fitScore > 0).slice(0, 3);
  const excluded = calcs.filter((c) => c.fitScore === 0);

  const totalSteps = 9;

  return (
    <CockpitShell
      eyebrow="Entscheidungs-Engine 2.0"
      title="Welche Struktur passt — mit echten Zahlen?"
      subtitle="9-Fragen-Wizard mit ECHTER Steuer-Berechnung pro Setup, 5-Jahres-Projektion, Side-by-Side-Vergleich + Warum-NICHT-Sektion. Keine Heuristik — konkrete Zahlen für DEINEN Gewinn + DEINEN Liquiditätsbedarf."
    >
      {/* Progress */}
      <div className="flex items-center gap-1 mb-6">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex items-center gap-1 flex-1">
            <div
              className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                s < step
                  ? "bg-emerald-500 text-white"
                  : s === step
                  ? "bg-accent-blue text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s < step ? <CheckCircle2 className="h-2.5 w-2.5" /> : s}
            </div>
            {s < totalSteps && <div className={`h-0.5 flex-1 ${s < step ? "bg-emerald-500" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        {step === 1 && (
          <>
            <h2 className="text-base font-bold mb-1">1. Erwarteter Jahres-Gewinn?</h2>
            <p className="text-xs text-muted-foreground mb-4">Operativer Gewinn vor Steuer.</p>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">€/Jahr</Label>
            <Input
              type="number"
              value={setup.jahresGewinn ?? ""}
              onChange={(e) => update({ jahresGewinn: Number(e.target.value) || undefined })}
              className="mt-1"
              autoFocus
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-base font-bold mb-1">2. Wieviel privat brauchst du pro Jahr?</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Liquiditätsbedarf: was du privat ausgibst (Lifestyle, Steuer-Privatentnahme). Rest bleibt für Reinvest.
            </p>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">€/Jahr privat</Label>
            <Input
              type="number"
              value={setup.liquiditaetsbedarfPrivat ?? ""}
              onChange={(e) => update({ liquiditaetsbedarfPrivat: Number(e.target.value) || undefined })}
              placeholder={setup.jahresGewinn ? `z.B. ${Math.round((setup.jahresGewinn ?? 0) * 0.5).toLocaleString("de-DE")}` : ""}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-2">
              Tipp: Lifestyle 60–120k privat reicht für die meisten. Rest in Holding bringt mehr Compounding.
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-base font-bold mb-1">3. Existing Setup?</h2>
            <p className="text-xs text-muted-foreground mb-4">Hast du schon eine Rechtsform?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {[
                { v: "none", l: "Noch nichts" },
                { v: "einzel", l: "Einzelunternehmen" },
                { v: "ug", l: "UG" },
                { v: "gmbh", l: "GmbH (ohne Holding)" },
                { v: "holding", l: "Holding-Setup vorhanden" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => update({ existingSetup: o.v as Setup["existingSetup"] })}
                  className={`text-left rounded-xl border p-3 text-sm transition-colors ${
                    setup.existingSetup === o.v
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
            <h2 className="text-base font-bold mb-1">4. Anzahl Co-Founder/Gesellschafter?</h2>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => update({ founders: n })}
                  className={`text-center rounded-xl border p-3 text-sm transition-colors ${
                    setup.founders === n
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  {n === 5 ? "5+" : n}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="text-base font-bold mb-1">5. VC / Exit geplant?</h2>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                { v: true, l: "Ja, VC/Exit in Planung" },
                { v: false, l: "Nein, Bootstrap" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => update({ vcPlanned: o.v })}
                  className={`text-left rounded-xl border p-3 text-sm transition-colors ${
                    setup.vcPlanned === o.v
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
            {setup.vcPlanned !== undefined && (
              <div className="mt-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Exit-Horizont (Jahre, 0 = nie)
                </Label>
                <Input
                  type="number"
                  min={0}
                  max={30}
                  value={setup.exitInYears ?? ""}
                  onChange={(e) => update({ exitInYears: Number(e.target.value) || undefined })}
                  placeholder="z.B. 5"
                  className="mt-1"
                />
              </div>
            )}
          </>
        )}

        {step === 6 && (
          <>
            <h2 className="text-base font-bold mb-1">6. Internationale Geschäftstätigkeit?</h2>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { v: "none", l: "Nur DACH" },
                { v: "eu", l: "EU-weit" },
                { v: "global", l: "Global" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => update({ international: o.v as Setup["international"] })}
                  className={`text-center rounded-xl border p-3 text-sm transition-colors ${
                    setup.international === o.v
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

        {step === 7 && (
          <>
            <h2 className="text-base font-bold mb-1">7. Familie / Multi-Brand / IP?</h2>
            <p className="text-xs text-muted-foreground mb-3">Mehrfach-Auswahl möglich.</p>
            <div className="space-y-2">
              {[
                { k: "familyContext", l: "Familien-Kontext (Erbplanung, Pool mit Kindern)" },
                { k: "largeWealth", l: "Vermögen > 5 Mio € (Stiftung-relevant)" },
                { k: "multiBrand", l: "Mehrere Brands / Geschäftsfelder" },
                { k: "hasIP", l: "Hoher IP-Wert (Marken/Patente/Software)" },
              ].map((o) => (
                <button
                  key={o.k}
                  onClick={() => update({ [o.k]: !setup[o.k as keyof Setup] } as Partial<Setup>)}
                  className={`w-full text-left rounded-xl border p-3 text-sm transition-colors flex items-center gap-3 ${
                    setup[o.k as keyof Setup]
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  <div className={`h-5 w-5 rounded border ${setup[o.k as keyof Setup] ? "bg-accent-blue border-accent-blue" : "border-border"} flex items-center justify-center shrink-0`}>
                    {setup[o.k as keyof Setup] && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  {o.l}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 8 && (
          <>
            <h2 className="text-base font-bold mb-1">8. Persönliches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Alter</Label>
                <Input
                  type="number"
                  value={setup.alter ?? ""}
                  onChange={(e) => update({ alter: Number(e.target.value) || undefined })}
                  placeholder="z.B. 38"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Familienstand</Label>
                <select
                  value={setup.familienstand ?? ""}
                  onChange={(e) => update({ familienstand: e.target.value as Setup["familienstand"] })}
                  className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">– wählen –</option>
                  <option value="ledig">ledig</option>
                  <option value="verheiratet">verheiratet</option>
                  <option value="geschieden">geschieden</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Persönlicher ESt-Spitzensatz
                </Label>
                <select
                  value={setup.estSatz ?? ""}
                  onChange={(e) => update({ estSatz: Number(e.target.value) })}
                  className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value={0.14}>14 % (geringes Einkommen)</option>
                  <option value={0.24}>24 % (mittel)</option>
                  <option value={0.32}>32 %</option>
                  <option value={0.42}>42 % (Spitzensatz ab 62k)</option>
                  <option value={0.45}>45 % (Reichensteuer ab 278k)</option>
                </select>
              </div>
            </div>
          </>
        )}

        {step === 9 && (
          <Results top3={top3} excluded={excluded} setup={setup} />
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              <Sparkles className="h-4 w-4" /> Daten ändern
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-[11px] text-muted-foreground leading-relaxed">
        <strong>Disclaimer:</strong> Vereinfachte Modellrechnung — KSt+GewSt 30 % pauschal, ESt nach §32a 2026,
        AbgSt 26,375 % inkl. SoliZ. Holding §8b: 5 % steuerpflichtig × ~30 % = 1,5 % effektiv. Konkrete
        Strukturierung immer mit StB klären.
      </div>
    </CockpitShell>
  );
};

// ============================================================
// RESULTS-COMPONENT
// ============================================================

const Results = ({
  top3,
  excluded,
  setup,
}: {
  top3: StructureCalc[];
  excluded: StructureCalc[];
  setup: Setup;
}) => (
  <div>
    <h2 className="text-base font-bold mb-1">Top-3 Empfehlungen mit echten Zahlen</h2>
    <p className="text-xs text-muted-foreground mb-4">
      Berechnet für deinen Op-Gewinn {(setup.jahresGewinn ?? 0).toLocaleString("de-DE")} € + Liquiditätsbedarf{" "}
      {(setup.liquiditaetsbedarfPrivat ?? Math.round((setup.jahresGewinn ?? 0) * 0.5)).toLocaleString("de-DE")} €/Jahr.
    </p>

    {top3.length === 0 ? (
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-800">
        Keine spezifische Empfehlung. Bitte alle Felder ausfüllen.
      </div>
    ) : (
      <>
        {/* Side-by-Side Tabelle */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-2 font-semibold">Struktur</th>
                <th className="text-right py-2 px-2 font-semibold">Steuer/Jahr</th>
                <th className="text-right py-2 px-2 font-semibold">Privat netto/Jahr</th>
                <th className="text-right py-2 px-2 font-semibold">Effektiv-%</th>
                <th className="text-right py-2 pl-2 font-semibold">5-Jahres-Steuer</th>
              </tr>
            </thead>
            <tbody>
              {top3.map((c, i) => (
                <tr
                  key={c.slug}
                  className={`border-b border-border last:border-0 ${i === 0 ? "bg-emerald-500/5" : ""}`}
                >
                  <td className="py-2 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-full bg-secondary text-muted-foreground px-1.5 py-0.5 text-[9px] font-bold">
                        #{i + 1}
                      </span>
                      <span>{c.emoji}</span>
                      <span className="font-semibold">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-2 text-right font-mono">
                    {Math.round(c.steuerProJahr).toLocaleString("de-DE")} €
                  </td>
                  <td className="py-2 px-2 text-right font-mono">
                    {Math.round(c.privatNettoProJahr).toLocaleString("de-DE")} €
                  </td>
                  <td className="py-2 px-2 text-right font-mono">{c.effektivPct.toFixed(1)} %</td>
                  <td className="py-2 pl-2 text-right font-mono font-semibold">
                    {Math.round(c.steuer5Jahre).toLocaleString("de-DE")} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Cards */}
        <div className="space-y-3 mb-6">
          {top3.map((c, i) => (
            <div
              key={c.slug}
              className={`rounded-2xl border p-4 ${
                i === 0 ? "border-emerald-500/40 bg-emerald-500/5" : "border-border bg-card"
              }`}
            >
              <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-accent-blue text-primary-foreground px-2 py-0.5 text-[10px] font-bold">
                    #{i + 1}
                  </span>
                  <span className="text-2xl">{c.emoji}</span>
                  <span className="font-bold">{c.name}</span>
                  {i === 0 && (
                    <span className="rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">
                      ✓ Beste für dich
                    </span>
                  )}
                </div>
                <Link
                  to={c.link}
                  className="inline-flex items-center gap-1 text-xs text-accent-blue hover:underline"
                >
                  Detail <ExternalLink className="h-3 w-3" />
                </Link>
              </div>

              {c.exitErsparnis !== undefined && c.exitErsparnis > 0 && (
                <div className="rounded-lg bg-accent-blue/5 border border-accent-blue/20 p-2 mb-2 text-xs">
                  <TrendingUp className="h-3 w-3 inline mr-1 text-accent-blue" />
                  <strong>Bei Exit:</strong> ~{Math.round(c.exitErsparnis).toLocaleString("de-DE")} € zusätzliche
                  Steuer-Ersparnis vs. Privat-Verkauf
                </div>
              )}

              <div className="text-[11px] text-muted-foreground mb-2">
                Setup einmalig: {c.setupCost.toLocaleString("de-DE")} € · Laufend: {c.runningCost.toLocaleString("de-DE")} €/Jahr
              </div>

              <ul className="space-y-1 text-xs mb-2">
                {c.why.map((w, j) => (
                  <li key={j} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 shrink-0">→</span>
                    <span dangerouslySetInnerHTML={{ __html: w.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
                  </li>
                ))}
              </ul>
              {c.caveats.length > 0 && (
                <details className="text-xs text-muted-foreground">
                  <summary className="cursor-pointer font-semibold text-amber-700">⚠ Caveats ({c.caveats.length})</summary>
                  <ul className="mt-2 space-y-1 list-disc pl-4">
                    {c.caveats.map((cv, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: cv.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </ul>
                </details>
              )}
            </div>
          ))}
        </div>

        {/* Warum NICHT */}
        {excluded.length > 0 && (
          <div className="rounded-2xl border border-border bg-secondary/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-bold text-sm">Warum diese Strukturen für dich NICHT passen</h3>
            </div>
            <div className="space-y-1.5 text-xs">
              {excluded.map((c) => (
                <div key={c.slug} className="flex items-start gap-2">
                  <span className="text-muted-foreground shrink-0">{c.emoji}</span>
                  <div>
                    <span className="font-semibold">{c.name}</span>
                    <span className="text-muted-foreground">: {c.caveats[0] || "Setup nicht passend für deine Daten"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5-Jahres-Compounding-Hinweis */}
        {top3.length >= 2 && top3[1].steuer5Jahre > top3[0].steuer5Jahre && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 mt-3">
            <div className="flex items-start gap-2">
              <Calculator className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-sm mb-1">5-Jahres-Ersparnis wenn du #1 wählst statt #2:</div>
                <div className="text-2xl font-bold text-emerald-700">
                  {Math.round(top3[1].steuer5Jahre - top3[0].steuer5Jahre).toLocaleString("de-DE")} €
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  (Differenz kumulierte Steuern über 5 Jahre, bei gleichbleibendem Op-Gewinn)
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )}
  </div>
);

export default EntscheidungsEngine;
