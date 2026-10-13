import { useMemo, useState, type ReactNode } from "react";
import { solZ, gewStNatuerlich, gewStAnrechnung } from "@/lib/germanTax";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Callout,
  EmptyState,
  Field,
  KitTable,
  ResultPanel,
  StatTile,
  ToneBadge,
  ToolSection,
  selectCls,
} from "@/components/cockpit/kit";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  AlertTriangle,
  TrendingUp,
  XCircle,
  Calculator,
  RotateCcw,
  Scale,
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
  // Vereinfachte ESt-Berechnung 2026 (Tarif § 32a EStG, VZ 2026)
  if (zvE <= 12348) return 0;
  if (zvE <= 17799) {
    const y = (zvE - 12348) / 10000;
    return Math.round((914.51 * y + 1400) * y);
  }
  if (zvE <= 69878) {
    const z = (zvE - 17799) / 10000;
    return Math.round((173.10 * z + 2397) * z + 1034.87);
  }
  if (zvE <= 277825) return Math.round(0.42 * zvE - 11135.63);
  return Math.round(0.45 * zvE - 19470.38);
}

function estSatzEffektiv(zvE: number): number {
  if (zvE <= 0) return 0;
  return estProgression(zvE) / zvE;
}

// eslint-disable-next-line react-refresh/only-export-components
export function calculateAll(s: Setup): StructureCalc[] {
  const profit = s.jahresGewinn ?? 0;
  // Reinvest-Quote leitet sich aus Liquiditätsbedarf ab (Schritt 2 im Wizard).
  // Fallback: 50% wenn liquiditaetsbedarfPrivat nicht gesetzt.
  const liquid = s.liquiditaetsbedarfPrivat ?? profit * 0.5;
  const reinvest = profit > 0 ? Math.max(0, Math.min(1, 1 - liquid / profit)) : 0.5;
  const eS = s.estSatz ?? estSatzEffektiv(profit);

  const calcs: StructureCalc[] = [];

  // ==========================================================
  // 1) Einzelunternehmen
  // ==========================================================
  {
    // ESt + SolZ (auf ESt nach §35) + GewSt nach §35-Anrechnung (Hebesatz 400 % angenommen)
    const est = estProgression(profit);
    const gewst = gewStNatuerlich(profit, 400);
    const anrechnung = Math.min(gewStAnrechnung(profit, est), gewst);
    const steuer = est + solZ(Math.max(0, est - anrechnung)) + (gewst - anrechnung);
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
    // 0% thesauriert, 22% Distribution Tax bei Ausschüttung in EE.
    // Bei DE-Wohnsitz: zusätzlich AbgSt 26,375% auf Dividende; EE-Distribution-Tax wird in DE NICHT
    // als KSt anrechenbar gesehen (Praxis: DBA DE-EE behandelt die EE-Distribution-Tax als Profits-Tax
    // der Gesellschaft, nicht der Anteilseigner — keine Anrechnung). Konservative Rechnung.
    // Bei DE-Wohnsitz OHNE Wegzug wird die OÜ von DE aus geführt → Ort der Geschäftsleitung in DE (§10 AO),
    // unbeschränkte KSt- und GewSt-Pflicht in DE (§1 KStG). Die 0 % auf thesaurierte Gewinne gibt es dann nicht.
    // Deshalb wie eine DE-Kapitalgesellschaft rechnen und die Variante nur nach Wegzug empfehlen.
    const steuerGesellschaft = profit * KSt_PLUS_GEWST;
    const abgStTeil = Math.min(liquid, profit - steuerGesellschaft);
    const deAbgSt = abgStTeil * ABG_ST;
    const totalSteuer = steuerGesellschaft + deAbgSt;
    const privatNetto = abgStTeil - deAbgSt;
    const fit = 15;
    calcs.push({
      slug: "estland-ou",
      name: "Estland OÜ (nur nach Wegzug sinnvoll)",
      emoji: "🇪🇪",
      fitScore: fit,
      steuerProJahr: totalSteuer,
      privatNettoProJahr: privatNetto,
      effektivPct: profit > 0 ? (totalSteuer / profit) * 100 : 0,
      steuer5Jahre: totalSteuer * 5,
      why: [
        "Nach Wegzug bzw. mit echter Geschäftsleitung in EE: 0 % auf reinvestierte Gewinne, 22 % nur bei Ausschüttung",
        "Setup in 5 Tagen via e-Residency, ~600 € all-in",
      ],
      caveats: [
        "**Gerechnet mit DE-Wohnsitz:** Führst du die OÜ von DE aus, liegt der Ort der Geschäftsleitung in DE (§10 AO) → KSt + GewSt in DE wie bei einer GmbH (§1 KStG), die 0 % gelten nicht",
        "**§AStG-Hinzurechnung wahrscheinlich** bei DE-Wohnsitz + passiven Einkünften",
        "Bei DE-Wohnsitz: zusätzlich 26,375 % AbgSt auf Privat-Auszahlung (EE-Distribution-Tax wird NICHT angerechnet → effektiv ~42 % auf ausgeschütteten Anteil)",
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
    // NL-Tarif stufig: 19 % bis 200.000 €, 25,8 % auf den übersteigenden Teil (Belastingdienst)
    const steuer = 0.19 * Math.min(profit, 200000) + 0.258 * Math.max(0, profit - 200000);
    const taxRate = profit > 0 ? steuer / profit : 0;
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
        `19 % bis 200k Gewinn, 25,8 % darüber (du: ${(taxRate * 100).toFixed(1)} % Durchschnitt)`,
        s.hasIP ? "**Innovation Box: 9 % auf qualifizierten IP**" : "",
        "100 % Participation Exemption (besser als DE 95 %)",
        "EU-Mutter-Tochter-RL + Mutter-Tochter-Privileg",
      ].filter(Boolean),
      caveats: [
        "Nur mit echter Geschäftsleitung in NL: Wird die BV von DE aus geführt, ist sie in DE unbeschränkt KSt- und GewSt-pflichtig (§10 AO, §1 KStG)",
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

const STEP_TITEL = [
  "Gewinn",
  "Privater Bedarf",
  "Bisherige Struktur",
  "Gesellschafter",
  "VC und Exit",
  "International",
  "Besonderheiten",
  "Persönliches",
  "Ergebnis",
];

const OptionCard = ({
  active,
  onClick,
  children,
  center = false,
  check = false,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  center?: boolean;
  check?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-[border-color,background-color,box-shadow] duration-200",
      center ? "justify-center text-center" : "text-left",
      active
        ? "border-accent-blue/50 bg-accent shadow-[0_0_0_3px_hsl(var(--accent-blue)/0.12)]"
        : "border-border bg-card hover:border-foreground/25",
    )}
  >
    {check && (
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
          active ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card",
        )}
      >
        {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
      </span>
    )}
    <span className="min-w-0 flex-1">{children}</span>
    {!check && active && <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />}
  </button>
);

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
  const istErgebnis = step === totalSteps;

  const nav = (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">
      <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
        <ArrowLeft aria-hidden="true" /> Zurück
      </Button>
      {step < totalSteps ? (
        <Button className="bg-gradient-primary" onClick={() => setStep(step + 1)}>
          {step === totalSteps - 1 ? "Ergebnis anzeigen" : "Weiter"} <ArrowRight aria-hidden="true" />
        </Button>
      ) : (
        <Button variant="outline" onClick={() => setStep(1)}>
          <RotateCcw aria-hidden="true" /> Daten ändern
        </Button>
      )}
    </div>
  );

  return (
    <CockpitShell
      eyebrow="Rechtsform & Struktur · Entscheidungs-Engine"
      title="Welche Struktur passt, mit echten Zahlen?"
      subtitle="Acht Fragen, danach rechnen wir jede Struktur für deinen Gewinn und deinen privaten Bedarf durch: Steuer pro Jahr, Fünf-Jahres-Projektion, direkter Vergleich und warum andere Strukturen nicht passen."
    >
      {/* Fortschritt */}
      <div className="mb-6">
        <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
          <p className="font-medium">
            {istErgebnis ? "Ergebnis" : `Frage ${step} von ${totalSteps - 1}`}
            {!istErgebnis && <span className="font-normal text-muted-foreground"> · {STEP_TITEL[step - 1]}</span>}
          </p>
          <p className="text-muted-foreground tabular">{Math.round(((step - 1) / (totalSteps - 1)) * 100)} %</p>
        </div>
        <div className="flex gap-1" aria-hidden="true">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <span
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                s < step ? "bg-accent-blue" : s === step ? "bg-primary" : "bg-secondary",
              )}
            />
          ))}
        </div>
      </div>

      {!istErgebnis && (
        <ToolSection className="mb-6">
          {step === 1 && (
            <StepKopf nr={1} titel="Wie hoch ist dein erwarteter Jahresgewinn?" text="Operativer Gewinn vor Steuern." />
          )}
          {step === 1 && (
            <Field label="Gewinn pro Jahr (€)" htmlFor="ee-gewinn" className="max-w-sm">
              <Input
                id="ee-gewinn"
                type="number"
                value={setup.jahresGewinn ?? ""}
                onChange={(e) => update({ jahresGewinn: Number(e.target.value) || undefined })}
                className="tabular"
                autoFocus
              />
            </Field>
          )}

          {step === 2 && (
            <>
              <StepKopf
                nr={2}
                titel="Wie viel brauchst du privat pro Jahr?"
                text="Dein Liquiditätsbedarf: was du privat ausgibst, inklusive Steuern auf Entnahmen. Der Rest bleibt zum Reinvestieren."
              />
              <Field
                label="Privater Bedarf pro Jahr (€)"
                htmlFor="ee-privat"
                hint="Für die meisten reichen 60.000 bis 120.000 € privat. Was in der Holding bleibt, arbeitet mit Zinseszins."
                className="max-w-sm"
              >
                <Input
                  id="ee-privat"
                  type="number"
                  value={setup.liquiditaetsbedarfPrivat ?? ""}
                  onChange={(e) => update({ liquiditaetsbedarfPrivat: Number(e.target.value) || undefined })}
                  placeholder={setup.jahresGewinn ? `z. B. ${Math.round((setup.jahresGewinn ?? 0) * 0.5).toLocaleString("de-DE")}` : ""}
                  className="tabular"
                />
              </Field>
            </>
          )}

          {step === 3 && (
            <>
              <StepKopf nr={3} titel="Hast du schon eine Rechtsform?" />
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
                {[
                  { v: "none", l: "Noch nichts" },
                  { v: "einzel", l: "Einzelunternehmen" },
                  { v: "ug", l: "UG" },
                  { v: "gmbh", l: "GmbH (ohne Holding)" },
                  { v: "holding", l: "Holding-Setup vorhanden" },
                ].map((o) => (
                  <OptionCard
                    key={o.v}
                    active={setup.existingSetup === o.v}
                    onClick={() => update({ existingSetup: o.v as Setup["existingSetup"] })}
                  >
                    {o.l}
                  </OptionCard>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <StepKopf nr={4} titel="Wie viele Gründer oder Gesellschafter seid ihr?" />
              <div className="grid grid-cols-5 gap-2 sm:max-w-md">
                {[1, 2, 3, 4, 5].map((n) => (
                  <OptionCard key={n} center active={setup.founders === n} onClick={() => update({ founders: n })}>
                    <span className="tabular">{n === 5 ? "5+" : n}</span>
                  </OptionCard>
                ))}
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <StepKopf nr={5} titel="Ist Wagniskapital oder ein Exit geplant?" />
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {[
                  { v: true, l: "Ja, VC oder Exit in Planung" },
                  { v: false, l: "Nein, Bootstrap" },
                ].map((o) => (
                  <OptionCard key={String(o.v)} active={setup.vcPlanned === o.v} onClick={() => update({ vcPlanned: o.v })}>
                    {o.l}
                  </OptionCard>
                ))}
              </div>
              {setup.vcPlanned !== undefined && (
                <Field label="Exit-Horizont in Jahren" hint="0 bedeutet: kein Exit geplant" htmlFor="ee-exit" className="mt-5 max-w-sm">
                  <Input
                    id="ee-exit"
                    type="number"
                    min={0}
                    max={30}
                    value={setup.exitInYears ?? ""}
                    onChange={(e) => update({ exitInYears: Number(e.target.value) || undefined })}
                    placeholder="z. B. 5"
                    className="tabular"
                  />
                </Field>
              )}
            </>
          )}

          {step === 6 && (
            <>
              <StepKopf nr={6} titel="Wie international ist dein Geschäft?" />
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {[
                  { v: "none", l: "Nur DACH" },
                  { v: "eu", l: "EU-weit" },
                  { v: "global", l: "Global" },
                ].map((o) => (
                  <OptionCard
                    key={o.v}
                    active={setup.international === o.v}
                    onClick={() => update({ international: o.v as Setup["international"] })}
                  >
                    {o.l}
                  </OptionCard>
                ))}
              </div>
            </>
          )}

          {step === 7 && (
            <>
              <StepKopf nr={7} titel="Familie, mehrere Marken, geistiges Eigentum?" text="Mehrfachauswahl möglich." />
              <div className="space-y-2.5">
                {[
                  { k: "familyContext", l: "Familien-Kontext (Erbplanung, Pool mit Kindern)" },
                  { k: "largeWealth", l: "Vermögen über 5 Mio. € (relevant für Stiftung)" },
                  { k: "multiBrand", l: "Mehrere Marken oder Geschäftsfelder" },
                  { k: "hasIP", l: "Hoher IP-Wert (Marken, Patente, Software)" },
                ].map((o) => (
                  <OptionCard
                    key={o.k}
                    check
                    active={!!setup[o.k as keyof Setup]}
                    onClick={() => update({ [o.k]: !setup[o.k as keyof Setup] } as Partial<Setup>)}
                  >
                    {o.l}
                  </OptionCard>
                ))}
              </div>
            </>
          )}

          {step === 8 && (
            <>
              <StepKopf nr={8} titel="Ein paar persönliche Angaben" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Alter" htmlFor="ee-alter">
                  <Input
                    id="ee-alter"
                    type="number"
                    value={setup.alter ?? ""}
                    onChange={(e) => update({ alter: Number(e.target.value) || undefined })}
                    placeholder="z. B. 38"
                    className="tabular"
                  />
                </Field>
                <Field label="Familienstand" htmlFor="ee-familienstand">
                  <select
                    id="ee-familienstand"
                    value={setup.familienstand ?? ""}
                    onChange={(e) => update({ familienstand: e.target.value as Setup["familienstand"] })}
                    className={selectCls}
                  >
                    <option value="">Bitte wählen</option>
                    <option value="ledig">ledig</option>
                    <option value="verheiratet">verheiratet</option>
                    <option value="geschieden">geschieden</option>
                  </select>
                </Field>
                <Field label="Persönlicher Einkommensteuer-Spitzensatz" htmlFor="ee-est" className="md:col-span-2">
                  <select
                    id="ee-est"
                    value={setup.estSatz ?? ""}
                    onChange={(e) => update({ estSatz: Number(e.target.value) })}
                    className={selectCls}
                  >
                    <option value={0.14}>14 % (geringes Einkommen)</option>
                    <option value={0.24}>24 % (mittel)</option>
                    <option value={0.32}>32 %</option>
                    <option value={0.42}>42 % (Spitzensatz ab 69.879 €)</option>
                    <option value={0.45}>45 % (Reichensteuer ab 278k)</option>
                  </select>
                </Field>
              </div>
            </>
          )}

          {nav}
        </ToolSection>
      )}

      {istErgebnis && (
        <div className="mb-6 space-y-6">
          <Results top3={top3} excluded={excluded} setup={setup} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))}>
              <ArrowLeft aria-hidden="true" /> Zurück
            </Button>
            <Button variant="outline" onClick={() => setStep(1)}>
              <RotateCcw aria-hidden="true" /> Daten ändern
            </Button>
          </div>
        </div>
      )}

      <Callout tone="neutral" title="Vereinfachte Modellrechnung">
        KSt und GewSt pauschal 30 %, ESt nach § 32a EStG 2026, Abgeltungsteuer 26,375 % inklusive Soli. Holding nach § 8b
        KStG: 5 % steuerpflichtig mal rund 30 % ergibt etwa 1,5 % effektiv. Die konkrete Strukturierung immer mit der
        Steuerberatung klären.
      </Callout>
    </CockpitShell>
  );
};

const StepKopf = ({ nr, titel, text }: { nr: number; titel: string; text?: string }) => (
  <div className="mb-5">
    <p className="text-sm font-medium text-accent-blue">Frage {nr}</p>
    <h2 className="mt-1 text-lg font-semibold tracking-tight">{titel}</h2>
    {text && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>}
  </div>
);

const fett = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
const eur0 = (n: number) => `${Math.round(n).toLocaleString("de-DE")} €`;

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
  <div className="space-y-6">
    {top3.length === 0 ? (
      <EmptyState
        icon={Calculator}
        title="Keine konkrete Empfehlung möglich"
        description="Bitte alle Fragen beantworten, vor allem Gewinn und privaten Bedarf."
      />
    ) : (
      <>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] [&>*]:min-w-0">
          <ResultPanel
            variant="ink"
            kicker="Beste Struktur für dich"
            title={top3[0].name}
            value={eur0(top3[0].steuerProJahr)}
            valueHint={`Steuern pro Jahr, effektiv ${top3[0].effektivPct.toFixed(1).replace(".", ",")} %`}
          >
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
              {[
                { l: "Privat netto pro Jahr", v: eur0(top3[0].privatNettoProJahr) },
                { l: "Steuern in 5 Jahren", v: eur0(top3[0].steuer5Jahre) },
                { l: "Einmalige Kosten", v: eur0(top3[0].setupCost) },
                { l: "Laufend pro Jahr", v: eur0(top3[0].runningCost) },
              ].map((k) => (
                <div key={k.l} className="bg-white/[0.04] p-3">
                  <div className="text-xs text-primary-foreground/65">{k.l}</div>
                  <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-primary-foreground/65">
              Gerechnet mit {(setup.jahresGewinn ?? 0).toLocaleString("de-DE")} € operativem Gewinn und{" "}
              {(setup.liquiditaetsbedarfPrivat ?? Math.round((setup.jahresGewinn ?? 0) * 0.5)).toLocaleString("de-DE")} € privatem
              Bedarf pro Jahr.
            </p>
          </ResultPanel>

          <div className="min-w-0 space-y-4">
            <ToolSection title="Die drei besten Strukturen im Vergleich" icon={Scale} bodyClassName="p-0 md:p-0">
              <KitTable caption="Vergleich der drei besten Strukturen" className="rounded-none border-0 [&_th]:whitespace-nowrap">
                <thead>
                  <tr>
                    <th>Struktur</th>
                    <th className="!text-right">Steuer pro Jahr</th>
                    <th className="!text-right">Privat netto</th>
                    <th className="!text-right">Effektiv</th>
                    <th className="!text-right">Steuer 5 Jahre</th>
                  </tr>
                </thead>
                <tbody>
                  {top3.map((c, i) => (
                    <tr key={c.slug} className={i === 0 ? "bg-success-soft/50" : undefined}>
                      <td>
                        <div className="flex min-w-[10rem] items-center gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold">
                            {i + 1}
                          </span>
                          <span className="font-medium">{c.name}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap text-right">{eur0(c.steuerProJahr)}</td>
                      <td className="whitespace-nowrap text-right">{eur0(c.privatNettoProJahr)}</td>
                      <td className="whitespace-nowrap text-right">{c.effektivPct.toFixed(1).replace(".", ",")} %</td>
                      <td className="whitespace-nowrap text-right font-semibold">{eur0(c.steuer5Jahre)}</td>
                    </tr>
                  ))}
                </tbody>
              </KitTable>
            </ToolSection>

            {top3.length >= 2 && top3[1].steuer5Jahre > top3[0].steuer5Jahre && (() => {
              // Nur bei gleicher Privatentnahme vergleichbar: thesaurierende Strukturen schieben Steuer nur auf
              const pn0 = top3[0].privatNettoProJahr;
              const pn1 = top3[1].privatNettoProJahr;
              const gleich = Math.abs(pn0 - pn1) <= 0.01 * Math.max(1, Math.abs(pn0), Math.abs(pn1));
              const proEuro = (c: StructureCalc) => (c.privatNettoProJahr > 0 ? c.steuerProJahr / c.privatNettoProJahr : null);
              const fmt = (v: number | null) => (v === null ? "—" : `${v.toFixed(2).replace(".", ",")} €`);
              return gleich ? (
                <StatTile
                  emphasis
                  tone="success"
                  label="Ersparnis über 5 Jahre, wenn du Platz 1 statt Platz 2 wählst"
                  value={eur0(top3[1].steuer5Jahre - top3[0].steuer5Jahre)}
                  hint="Differenz der kumulierten Steuern bei gleichem Gewinn und gleicher Privatentnahme"
                />
              ) : (
                <StatTile
                  label="Steuer je € privat verfügbar (Platz 1 / Platz 2)"
                  value={`${fmt(proEuro(top3[0]))} / ${fmt(proEuro(top3[1]))}`}
                  hint="Platz 1 und 2 entnehmen unterschiedlich viel privat. Eine niedrigere Steuer bei Thesaurierung ist nur aufgeschoben, deshalb keine direkte Ersparnis."
                />
              );
            })()}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {top3.map((c, i) => (
            <article
              key={c.slug}
              className={cn(
                "flex flex-col rounded-2xl border bg-card p-5 shadow-card",
                i === 0 ? "border-success/30" : "border-border",
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <ToneBadge tone={i === 0 ? "success" : "neutral"}>Platz {i + 1}</ToneBadge>
                {i === 0 && <ToneBadge tone="success">Beste für dich</ToneBadge>}
              </div>
              <h3 className="mt-2.5 text-base font-semibold leading-snug">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground tabular">
                Einmalig {c.setupCost.toLocaleString("de-DE")} € · laufend {c.runningCost.toLocaleString("de-DE")} € pro Jahr
              </p>

              {c.exitErsparnis !== undefined && c.exitErsparnis > 0 && (
                <Callout tone="accent" icon={TrendingUp} className="mt-3 p-3 text-xs">
                  <strong>Bei Exit:</strong> rund {Math.round(c.exitErsparnis).toLocaleString("de-DE")} € zusätzliche
                  Steuerersparnis gegenüber einem Privatverkauf
                </Callout>
              )}

              <ul className="mt-3 space-y-1.5 text-sm">
                {c.why.map((w, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                    <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: fett(w) }} />
                  </li>
                ))}
              </ul>

              {c.caveats.length > 0 && (
                <details className="group mt-4 rounded-xl border border-warning/25 bg-warning-soft/60 text-sm [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 font-medium">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" aria-hidden="true" />
                      Worauf du achten musst ({c.caveats.length})
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="list-disc space-y-1 border-t border-warning/20 px-3 py-2.5 pl-7 text-foreground/80">
                    {c.caveats.map((cv, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: fett(cv) }} />
                    ))}
                  </ul>
                </details>
              )}

              <Link
                to={c.link}
                className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent-blue hover:underline"
              >
                Details ansehen <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        {excluded.length > 0 && (
          <ToolSection title="Warum diese Strukturen für dich nicht passen" icon={XCircle}>
            <ul className="divide-y divide-border/70">
              {excluded.map((c) => (
                <li key={c.slug} className="py-2.5 text-sm first:pt-0 last:pb-0">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-muted-foreground">
                    : <span dangerouslySetInnerHTML={{ __html: fett(c.caveats[0] || "Setup nicht passend für deine Daten") }} />
                  </span>
                </li>
              ))}
            </ul>
          </ToolSection>
        )}
      </>
    )}
  </div>
);

export default EntscheidungsEngine;
