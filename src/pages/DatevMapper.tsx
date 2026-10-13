import { useState, useMemo } from "react";
import { csvCell } from "@/lib/csvSafe";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmptyState, Field, KitTable, StatGrid, StatTile, ToneBadge, ToolSection } from "@/components/cockpit/kit";
import { Download, Upload, Plus, Trash2, FileSpreadsheet, Wand2, ListChecks, Info } from "lucide-react";

type Direction = "soll" | "haben"; // S = Aufwand/Vermögen, H = Erlös/Verbindlichkeit aus Sicht des "Haupt"-Kontos

type Line = {
  id: string;
  datum: string; // YYYY-MM-DD
  betrag: number; // Brutto, Vorzeichen: negativ = Ausgabe (von Bank), positiv = Einnahme
  zweck: string;
  // Mapping-Resultat
  konto: string; // SKR03-Konto
  gegenkonto: string; // i.d.R. 1200 Bank
  steuerschluessel: string; // DATEV BU-Schlüssel
  buchungstext: string;
  matched: string; // welche Rule gematcht hat
};

type Rule = {
  pattern: RegExp;
  match: string; // human-readable
  /** Wenn Betrag negativ (Ausgabe). */
  ausgabe?: { konto: string; steuerschluessel: string; buchungstext: string };
  /** Wenn Betrag positiv (Einnahme). */
  einnahme?: { konto: string; steuerschluessel: string; buchungstext: string };
};

// SKR03 Konten-Cheat-Sheet (DATEV-Kontenrahmen SKR03):
// 1200 Bank | 1360 Geldtransit | 1576 Vorsteuer 19% | 1776 USt 19%
// 2700 Sonstige Erträge (ohne USt-Automatik) | 8400 Erlöse 19 % USt (Automatikkonto!)
// 3100 Fremdleistungen | 3123 Sonstige Leistungen EU-Unternehmer 19 % VSt/USt (§13b Abs. 1, Automatik)
// 4600 Werbekosten | 4380 Beiträge | 4360 Versicherungen
// 4900 sonst Aufwand | 4950 Rechts- und Beratungskosten | 4955 Buchführungskosten
// 4920 Telefon | 4925 Internet | 4240 Gas, Strom, Wasser | 4210 Miete
// 4670 Reisekosten Unternehmer | 4676 Reisekosten Unternehmer Übernachtung
// 8338 Erlöse EU OSS | 8125 Steuerfreie ig. Lieferungen §4 Nr. 1b | 8120 Steuerfreie Ausfuhr §4 Nr. 1a
//
// BU-Schlüssel: 9 = VSt 19% | 8 = VSt 7% | 19 = ig. ERWERB (Waren!) 19% — NICHT für Dienstleistungen
// | 94 = §13b 19 % (Leistungen ausländischer Unternehmer). Sonstige Leistungen von EU-Unternehmern
// (§13b Abs. 1 UStG, USt-VA Kz 46/47 + 67) laufen über das Automatikkonto 3123 ohne BU-Schlüssel.

const RULES: Rule[] = [
  // === Marketplaces ===
  {
    pattern: /amazon.*payments|amazon.*marketplace|amazon\.de|amazon eu|amazon\s+services/i,
    match: "Amazon-Auszahlung / Marketplace",
    einnahme: { konto: "1360", steuerschluessel: "", buchungstext: "Amazon Auszahlung (AUSZ-DE)" },
    ausgabe: { konto: "3100", steuerschluessel: "9", buchungstext: "Amazon Fees / Lastschrift" },
  },
  {
    pattern: /stripe payments|stripe technology/i,
    match: "Stripe Auszahlung / Fees (IE → RC §13b)",
    einnahme: { konto: "1360", steuerschluessel: "", buchungstext: "Stripe Auszahlung" },
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "Stripe Fees (RC §13b — Stripe IE)" },
  },
  {
    pattern: /paypal.*europe|paypal\s+pte/i,
    match: "PayPal Auszahlung / Fees (LU → RC §13b)",
    einnahme: { konto: "1360", steuerschluessel: "", buchungstext: "PayPal Auszahlung" },
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "PayPal Fees (RC §13b — PayPal LU)" },
  },
  {
    pattern: /klarna|sofort gmbh|sofort\s+ag/i,
    match: "Klarna / Sofort (SE → RC §13b)",
    einnahme: { konto: "1360", steuerschluessel: "", buchungstext: "Klarna/Sofort Auszahlung" },
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "Klarna/Sofort Fees (RC §13b — Klarna SE)" },
  },
  {
    pattern: /shopify/i,
    match: "Shopify",
    einnahme: { konto: "1360", steuerschluessel: "", buchungstext: "Shopify Payments Auszahlung" },
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "Shopify Subscription (RC §13b)" },
  },
  {
    pattern: /\bebay\b|kaufland|\botto\s+(gmbh|market|payments)|\botto\.de\b|\betsy\b|zalando/i,
    match: "Marketplace (eBay/Kaufland/Otto/Etsy/Zalando)",
    einnahme: { konto: "1360", steuerschluessel: "", buchungstext: "Marketplace Auszahlung" },
    ausgabe: { konto: "3100", steuerschluessel: "9", buchungstext: "Marketplace Fees" },
  },

  // === Cloud / SaaS ===
  {
    pattern: /aws emea|amazon web services|amazon\s+cloud/i,
    match: "AWS Cloud (RC §13b)",
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "AWS (RC §13b)" },
  },
  {
    pattern: /google\s+cloud|google.*workspace|google\s+ireland/i,
    match: "Google Cloud / Workspace (RC §13b)",
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "Google Cloud (RC §13b)" },
  },
  {
    pattern: /microsoft\s+ireland|azure|office\s+365|microsoft\s+365/i,
    match: "Microsoft Azure / 365 (RC §13b)",
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "MS Azure/365 (RC §13b)" },
  },
  {
    pattern: /anthropic|claude\.ai/i,
    match: "Anthropic (US — Drittland)",
    ausgabe: { konto: "4980", steuerschluessel: "94", buchungstext: "Anthropic API (US-Drittland)" },
  },
  {
    pattern: /openai|chatgpt/i,
    match: "OpenAI (IE-Sub seit 2024 → RC §13b)",
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "OpenAI API (RC §13b — IE-Sub)" },
  },
  {
    pattern: /hetzner online|strato|ionos|all-inkl|mittwald/i,
    match: "DE-Hoster (USt 19%)",
    ausgabe: { konto: "4980", steuerschluessel: "9", buchungstext: "Hosting (DE-USt 19%)" },
  },
  {
    pattern: /github|cloudflare|vercel|netlify|digitalocean|\bovh\b|linode|fly\.io|render\.com|supabase|firebase/i,
    match: "Hosting/Dev-Tools (i.d.R. EU-Sub → RC §13b)",
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "Hosting/Dev-Tools (RC §13b prüfen)" },
  },
  {
    pattern: /lovable|figma|notion|slack|miro|linear|atlassian|airtable|monday\.com|asana|clickup|loom|zoom/i,
    match: "SaaS-Tools (i.d.R. IE/US-EU-Sub → RC §13b)",
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "SaaS-Subscription (RC §13b)" },
  },

  // === Marketing / Ads ===
  {
    pattern: /meta platforms|facebook.*ireland|instagram\s+ads/i,
    match: "Meta Ads (RC §13b)",
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "Meta Ads (RC §13b)" },
  },
  {
    pattern: /tiktok\s+ads|bytedance/i,
    match: "TikTok Ads (RC §13b)",
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "TikTok Ads (RC §13b)" },
  },
  {
    pattern: /google\s+ads|google adwords/i,
    match: "Google Ads (RC §13b)",
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "Google Ads (RC §13b)" },
  },
  {
    pattern: /klaviyo|mailchimp|active\s+campaign|hubspot|salesforce|pipedrive/i,
    match: "Email/CRM (US → meist RC §13b über EU-Sub)",
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "Email-Marketing/CRM (RC §13b prüfen)" },
  },
  {
    pattern: /brevo|sendinblue/i,
    match: "Brevo / Sendinblue (FR → RC §13b)",
    ausgabe: { konto: "3123", steuerschluessel: "", buchungstext: "Brevo Email-Marketing (RC §13b — FR)" },
  },

  // === Versand / Fulfillment ===
  {
    pattern: /\bdhl\b|deutsche post|dpd|gls\s+germany|hermes|ups\s+\w/i,
    match: "Versand / Logistik",
    ausgabe: { konto: "4730", steuerschluessel: "9", buchungstext: "Versandkosten" },
  },
  {
    pattern: /sendcloud|easyship|shipbob|byrd|fromspace/i,
    match: "Versand-/3PL-SaaS",
    ausgabe: { konto: "4730", steuerschluessel: "9", buchungstext: "Versand-Software / 3PL" },
  },

  // === Bank / Payment-Provider Fees ===
  {
    pattern: /holvi|qonto|penta|kontist|finom|n26\s+business|deutsche bank|commerzbank|sparkasse|postbank|sumup|adyen/i,
    match: "Bank-Gebühren",
    ausgabe: { konto: "4970", steuerschluessel: "", buchungstext: "Bank-/Zahlungsgebühr" },
  },

  // === Steuerberater / Recht / Versicherung ===
  {
    pattern: /steuerberater|datev|lexoffice|sevdesk|candis|debitoor/i,
    match: "Buchhaltung / Steuerberater",
    ausgabe: { konto: "4955", steuerschluessel: "9", buchungstext: "Buchführung / Steuerberatung" },
  },
  {
    pattern: /\brechtsanwalt\b|kanzlei|notariat|notar/i,
    match: "Rechtsberatung / Notar",
    ausgabe: { konto: "4950", steuerschluessel: "9", buchungstext: "Rechts-/Notarkosten" },
  },
  {
    pattern: /allianz|axa|huk|gothaer|signal iduna|barmenia|haftpflicht|versicherung/i,
    match: "Versicherung",
    ausgabe: { konto: "4360", steuerschluessel: "", buchungstext: "Versicherung (kein VSt-Abzug)" },
  },

  // === LUCID / EPR / Behörden ===
  {
    pattern: /lizenzero|reclay|bellandvision|interseroh|der gruene punkt|zentrale stelle\s+verpackung/i,
    match: "LUCID / Verpackung",
    ausgabe: { konto: "4380", steuerschluessel: "9", buchungstext: "LUCID / Verpackungslizenz" },
  },
  {
    pattern: /finanzamt|hauptzollamt|stadtkasse|landeskasse|bundesanzeiger/i,
    match: "Behörden / Finanzamt",
    ausgabe: { konto: "1780", steuerschluessel: "", buchungstext: "Steuer / Behörden-Zahlung" },
  },

  // === Reise / Bewirtung ===
  {
    pattern: /booking\.com|airbnb|expedia|trivago|hotel|motel\s+one/i,
    match: "Übernachtung",
    ausgabe: { konto: "4676", steuerschluessel: "8", buchungstext: "Reisekosten Übernachtung (7 % Beherbergung, §12 Abs. 2 Nr. 11 UStG; Frühstück 19 % prüfen)" },
  },
  {
    pattern: /\blufthansa\b|easyjet|ryanair|eurowings|condor|swiss air|klm|british airways|deutsche bahn|sixt|europcar|hertz/i,
    match: "Verkehr (Flug/Bahn/Mietwagen)",
    ausgabe: { konto: "4670", steuerschluessel: "9", buchungstext: "Reisekosten Verkehr (Steuersatz prüfen)" },
  },

  // === Personal ===
  {
    pattern: /gehalt|lohn|gehaltszahlung|salary/i,
    match: "Lohn / Gehalt",
    ausgabe: { konto: "4120", steuerschluessel: "", buchungstext: "Lohn/Gehalt" },
  },
  {
    pattern: /sozialversicherung|\baok\b|\btk\s+|techniker krankenkasse|barmer|\bdak\b|knappschaft|minijob/i,
    match: "Sozialversicherung",
    ausgabe: { konto: "4130", steuerschluessel: "", buchungstext: "Sozialabgaben" },
  },

  // === Dauer-Verträge ===
  {
    pattern: /\bmiete\b|\brent\b/i,
    match: "Miete",
    ausgabe: { konto: "4210", steuerschluessel: "9", buchungstext: "Miete (USt-pflichtig)" },
  },
  {
    pattern: /telekom|vodafone|1&1|o2|telefonica|congstar|netcologne/i,
    match: "Telefon / Internet",
    ausgabe: { konto: "4925", steuerschluessel: "9", buchungstext: "Telefon / Internet" },
  },
  {
    pattern: /e\.on|eon\b|rwe|enbw|stadtwerke|lichtblick|eprimo|stromio|vattenfall/i,
    match: "Strom / Energie",
    ausgabe: { konto: "4240", steuerschluessel: "9", buchungstext: "Strom / Energie" },
  },
];

/**
 * Betrag aus einer CSV-Zelle. Erkennt DE-Format (1.234,56) und EN-Format
 * (1,234.56 oder 149.90). Gibt null zurück, wenn die Zelle keine Zahl ist.
 */
export const parseMoney = (raw: string): number | null => {
  const s = raw.trim().replace(/\s/g, "").replace(/[€$£]/g, "");
  if (!/^-?[\d.,]+$/.test(s)) return null;
  const hasComma = s.includes(",");
  const hasDot = s.includes(".");
  let normalized: string;
  if (hasComma && hasDot) {
    // Letztes Komma/Punkt = Dezimaltrenner, der andere ist Tausender
    normalized = s.lastIndexOf(",") > s.lastIndexOf(".") ? s.replace(/\./g, "").replace(",", ".") : s.replace(/,/g, "");
  } else if (hasComma) {
    normalized = s.replace(",", ".");
  } else {
    // Nur Punkte: ≥2 Punkte oder ein Punkt an Tausender-Position = Tausender, sonst EN-Dezimal.
    const parts = s.split(".");
    normalized = parts.length > 2 || (parts.length === 2 && parts[1].length === 3 && parts[0].length <= 3) ? s.replace(/\./g, "") : s;
  }
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? n : null;
};

const DATUM_RE = /^(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})$|^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Eine Zeile eines Bank-CSV-Exports lesen: Datum, Betrag, Verwendungszweck.
 * Datumszellen werden nie als Betrag gelesen (früher wurde 01.05.2026 als
 * 1.052.026 € erkannt, weil das Datum vor dem Betrag steht).
 */
export const csvTrenner = (row: string) => (row.includes(";") ? ";" : row.includes("\t") ? "\t" : ",");

/** CSV-Zeile mit Anführungszeichen-Behandlung splitten ("Amazon, Inc" bleibt eine Zelle). */
export const csvSpalten = (row: string, sep = csvTrenner(row)): string[] => {
  const out: string[] = [];
  let cur = "";
  let inQuote = false;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      if (inQuote && row[i + 1] === '"') { cur += '"'; i++; }
      else inQuote = !inQuote;
    } else if (ch === sep && !inQuote) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((c) => c.replace(/^'|'$/g, "").trim());
};

/**
 * Index der Betragsspalte aus einer Kopfzeile (nie Saldo, Kontonummer, BLZ).
 * Vorrang: Betrag/Amount. "Umsatz" nur als Ausweichlösung und nur als ganze
 * Spalte ("Umsatz", "Umsatz in EUR", "Umsatz (€)") – nie Umsatzart/-typ/-kategorie
 * (Commerzbank: "Umsatzart" steht vor "Betrag", DKB: "Umsatztyp" vor "Betrag (€)").
 */
export const betragsSpalteAusHeader = (header: string): number | null => {
  const cols = csvSpalten(header).map((c) => c.toLowerCase().replace(/^"|"$/g, "").trim());
  const keinSaldo = (c: string) => !/saldo|balance|kontostand/.test(c);
  let idx = cols.findIndex((c) => /betrag|amount/.test(c) && keinSaldo(c));
  if (idx < 0) idx = cols.findIndex((c) => /^umsatz($| in| \()/.test(c) && keinSaldo(c));
  return idx >= 0 ? idx : null;
};

export const csvZeileLesen = (
  row: string,
  heute = new Date().toISOString().slice(0, 10),
  betragIdx: number | null = null,
) => {
  const cols = csvSpalten(row);
  let datum: string | null = null;
  let betrag = 0;
  // Betragsspalte aus der Kopfzeile nur nutzen, wenn sie in dieser Zeile eine Zahl
  // enthält; sonst auf den Scan über alle Zellen zurückfallen.
  let spalteGelesen = false;
  if (betragIdx !== null && cols[betragIdx] !== undefined) {
    const parsed = parseMoney(cols[betragIdx]);
    if (parsed !== null) {
      betrag = parsed;
      spalteGelesen = true;
    }
  }
  for (const c of cols) {
    const d = c.match(DATUM_RE);
    if (d) {
      if (!datum) {
        if (d[4]) datum = `${d[4]}-${d[5]}-${d[6]}`;
        else {
          const yyyy = d[3].length === 2 ? "20" + d[3] : d[3];
          datum = `${yyyy}-${d[2].padStart(2, "0")}-${d[1].padStart(2, "0")}`;
        }
      }
      continue;
    }
    if (betrag === 0 && !spalteGelesen) {
      const parsed = parseMoney(c);
      if (parsed !== null && Math.abs(parsed) > 0) betrag = parsed;
    }
  }
  // Zweck: längster nicht-numerischer Text
  const textCols = cols.filter((c) => c && !/^-?[\d.,\s€$£]+$/.test(c) && !DATUM_RE.test(c));
  const zweck = textCols.length > 0 ? [...textCols].sort((x, y) => y.length - x.length)[0] : row;
  return { datum: datum ?? heute, betrag, zweck };
};

const guessMapping = (zweck: string, betrag: number): Partial<Line> => {
  for (const r of RULES) {
    if (r.pattern.test(zweck)) {
      const m = betrag < 0 ? r.ausgabe : r.einnahme;
      if (!m) continue;
      return {
        konto: m.konto,
        gegenkonto: "1200",
        steuerschluessel: m.steuerschluessel,
        buchungstext: m.buchungstext,
        matched: r.match,
      };
    }
  }
  return {
    // Unbekannte Einnahme: 2700 Sonstige Erträge (kein Automatikkonto; 8400 würde 19 % USt herausrechnen)
    konto: betrag < 0 ? "4900" : "2700",
    gegenkonto: "1200",
    steuerschluessel: "",
    buchungstext: zweck.slice(0, 60),
    matched: "—",
  };
};

const DatevMapper = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [csvPaste, setCsvPaste] = useState("");

  const addLine = () => {
    const l: Line = {
      id: Date.now().toString(),
      datum: new Date().toISOString().slice(0, 10),
      betrag: 0,
      zweck: "",
      konto: "4900",
      gegenkonto: "1200",
      steuerschluessel: "",
      buchungstext: "",
      matched: "—",
    };
    setLines([...lines, l]);
  };

  const updateLine = (id: string, patch: Partial<Line>) => {
    setLines(lines.map((l) => {
      if (l.id !== id) return l;
      const next = { ...l, ...patch };
      // Re-trigger Mapping wenn zweck oder betrag geändert
      if (patch.zweck !== undefined || patch.betrag !== undefined) {
        const guess = guessMapping(next.zweck, next.betrag);
        return { ...next, ...guess };
      }
      return next;
    }));
  };

  const removeLine = (id: string) => setLines(lines.filter((l) => l.id !== id));

  const importCsv = () => {
    // Sehr toleranter Parser: trennt Zeilen, splittet bei ; , oder Tab
    const rows = csvPaste.trim().split(/\r?\n/);
    const newLines: Line[] = [];
    // Kopfzeile erkennen: Betragsspalte gezielt lesen (sonst würde z. B. Kontonummer oder Saldo als Betrag gebucht)
    const hatHeader = rows.length > 0 && /datum|betrag|verwendung|umsatz|amount/i.test(rows[0]) && !/^\d/.test(rows[0]);
    const betragIdx = hatHeader ? betragsSpalteAusHeader(rows[0]) : null;
    rows.forEach((row, idx) => {
      if (!row.trim()) return;
      if (idx === 0 && hatHeader) return;

      const { datum, betrag, zweck } = csvZeileLesen(row, undefined, betragIdx);

      const guess = guessMapping(zweck, betrag);
      newLines.push({
        id: `${Date.now()}-${idx}`,
        datum,
        betrag,
        zweck,
        konto: "4900",
        gegenkonto: "1200",
        steuerschluessel: "",
        buchungstext: "",
        matched: "—",
        ...guess,
      } as Line);
    });
    setLines([...lines, ...newLines]);
    setCsvPaste("");
  };

  const exportLexoffice = () => {
    const header = "Datum;Beleg;Buchungstext;Konto;Gegenkonto;Brutto;Steuerschlüssel;Match";
    const rows = lines.map((l) => {
      const dirSign = l.betrag < 0 ? "Ausgabe" : "Einnahme";
      return [
        l.datum.split("-").reverse().join("."),
        l.id.slice(-6),
        csvCell(l.buchungstext), // Verwendungszweck ist Fremdtext: Formeln entschaerfen
        l.konto,
        l.gegenkonto,
        Math.abs(l.betrag).toFixed(2).replace(".", ","),
        l.steuerschluessel,
        `${dirSign}: ${l.matched}`,
      ].join(";");
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lexoffice-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const exportDatev = () => {
    // DATEV-Buchungs-CSV (vereinfacht, ASCII-kompatibel)
    // Spec laut DATEV Format-Beschreibung "Buchungsstapel" (vereinfacht):
    const header =
      "Umsatz (ohne Soll-/Haben-Kz);Soll-/Haben-Kennzeichen;WKZ Umsatz;Konto;Gegenkonto (ohne BU-Schlüssel);BU-Schlüssel;Belegdatum;Belegfeld 1;Belegfeld 2;Buchungstext";
    const rows = lines.map((l) => {
      const sh = l.betrag < 0 ? "S" : "H"; // negativ = Soll auf Aufwand, positiv = Haben (Erlös)
      // Bei Ausgabe: Konto = Aufwand (Soll), Gegenkonto = Bank
      // Bei Einnahme: Konto = Erlös (Haben), Gegenkonto = Bank
      // Im DATEV-Stapel ist die Konvention: Konto + Gegenkonto wie unten
      const dd = l.datum.split("-")[2] + l.datum.split("-")[1]; // TTMM
      return [
        Math.abs(l.betrag).toFixed(2).replace(".", ","),
        sh,
        "EUR",
        l.konto,
        l.gegenkonto,
        l.steuerschluessel,
        dd,
        l.id.slice(-6),
        "",
        csvCell(l.buchungstext), // Verwendungszweck ist Fremdtext: Formeln entschaerfen
      ].join(";");
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `datev-stapel-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const stats = useMemo(() => {
    const ausgaben = lines.filter((l) => l.betrag < 0).reduce((s, l) => s + Math.abs(l.betrag), 0);
    const einnahmen = lines.filter((l) => l.betrag > 0).reduce((s, l) => s + l.betrag, 0);
    const ungemappt = lines.filter((l) => l.matched === "—").length;
    return { ausgaben, einnahmen, ungemappt };
  }, [lines]);

  const geld = (n: number) => `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
  const zellInput = "h-8 rounded-md px-2 text-xs";

  return (
    <CockpitShell
      eyebrow="Buchhaltung & Reporting · DATEV und Lexoffice"
      title="Bank-CSV zu DATEV-Stapel und Lexoffice-Import"
      subtitle="Über 35 Regeln ordnen deine Kontoumsätze automatisch zu (Amazon, Stripe, PayPal, Klarna, Shopify, AWS, Werbeplattformen, DHL, Steuerberatung, Versicherungen, Reisen, Strom). Reverse-Charge nach § 13b wird für Anbieter mit irischer Tochter erkannt. Jede Zeile bleibt editierbar."
    >
      <StatGrid cols={3} className="mb-6">
        <StatTile label="Einnahmen" value={geld(stats.einnahmen)} tone="success" />
        <StatTile label="Ausgaben" value={geld(stats.ausgaben)} tone="danger" />
        <StatTile
          label="Ohne Regel zugeordnet"
          value={stats.ungemappt}
          tone={stats.ungemappt > 0 ? "warning" : "neutral"}
          hint="Vor dem Export manuell prüfen"
        />
      </StatGrid>

      <ToolSection
        title="Bank-CSV einfügen"
        description="Export aus Holvi, Qonto, Penta, N26 und anderen. Trennzeichen Semikolon, Komma oder Tab; Datum, Betrag und Verwendungszweck werden erkannt."
        icon={Upload}
        className="mb-6"
      >
        <Field label="CSV-Inhalt" htmlFor="dm-csv">
          <Textarea
            id="dm-csv"
            value={csvPaste}
            onChange={(e) => setCsvPaste(e.target.value)}
            placeholder={"Datum;Betrag;Verwendungszweck\n01.05.2026;-149,90;Stripe Technology Inc Fees\n02.05.2026;3245,12;Amazon EU SARL Auszahlung"}
            className="h-36 font-mono text-xs"
          />
        </Field>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button className="bg-gradient-primary" onClick={importCsv} disabled={!csvPaste.trim()}>
            <Wand2 aria-hidden="true" /> Automatisch zuordnen
          </Button>
          <Button variant="outline" onClick={addLine}>
            <Plus aria-hidden="true" /> Zeile manuell hinzufügen
          </Button>
        </div>
      </ToolSection>

      {lines.length === 0 ? (
        <EmptyState
          icon={FileSpreadsheet}
          title="Noch keine Buchungen"
          description="Füge oben einen Kontoauszug als CSV ein oder lege eine Zeile manuell an. Danach kannst du jede Zuordnung prüfen und als DATEV-Stapel oder Lexoffice-CSV exportieren."
          className="mb-6"
        />
      ) : (
        <ToolSection
          title="Buchungen"
          description={`${lines.length} Zeile${lines.length === 1 ? "" : "n"}. Konto, Gegenkonto und BU-Schlüssel lassen sich direkt ändern.`}
          icon={ListChecks}
          className="mb-6"
          bodyClassName="p-0 md:p-0"
          actions={
            <>
              <Button size="sm" onClick={exportLexoffice}>
                <Download aria-hidden="true" /> Lexoffice-CSV ({lines.length})
              </Button>
              <Button size="sm" variant="outline" onClick={exportDatev}>
                <FileSpreadsheet aria-hidden="true" /> DATEV-Stapel ({lines.length})
              </Button>
            </>
          }
        >
          <KitTable caption="Zugeordnete Buchungen" className="rounded-none border-0 [contain:paint] [&_td]:!px-2 [&_td]:!py-2 [&_th]:whitespace-nowrap">
            <thead>
              <tr>
                <th>Datum</th>
                <th className="!text-right">Betrag</th>
                <th>Verwendungszweck</th>
                <th>Konto</th>
                <th>Gegenkonto</th>
                <th>BU</th>
                <th>Regel</th>
                <th>
                  <span className="sr-only">Aktionen</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.id}>
                  <td>
                    <Input
                      type="date"
                      aria-label="Datum"
                      value={l.datum}
                      onChange={(e) => updateLine(l.id, { datum: e.target.value })}
                      className={cn(zellInput, "w-36")}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      step="0.01"
                      aria-label="Betrag"
                      value={l.betrag || ""}
                      onChange={(e) => updateLine(l.id, { betrag: Number(e.target.value) || 0 })}
                      className={cn(zellInput, "w-28 text-right tabular", l.betrag < 0 ? "text-danger" : l.betrag > 0 ? "text-success" : "")}
                    />
                  </td>
                  <td>
                    <Input
                      aria-label="Verwendungszweck"
                      value={l.zweck}
                      onChange={(e) => updateLine(l.id, { zweck: e.target.value })}
                      className={cn(zellInput, "w-64")}
                    />
                  </td>
                  <td>
                    <Input
                      aria-label="Konto"
                      value={l.konto}
                      onChange={(e) => updateLine(l.id, { konto: e.target.value })}
                      className={cn(zellInput, "w-20 font-mono")}
                    />
                  </td>
                  <td>
                    <Input
                      aria-label="Gegenkonto"
                      value={l.gegenkonto}
                      onChange={(e) => updateLine(l.id, { gegenkonto: e.target.value })}
                      className={cn(zellInput, "w-20 font-mono")}
                    />
                  </td>
                  <td>
                    <Input
                      aria-label="BU-Schlüssel"
                      value={l.steuerschluessel}
                      onChange={(e) => updateLine(l.id, { steuerschluessel: e.target.value })}
                      className={cn(zellInput, "w-14 font-mono")}
                    />
                  </td>
                  <td className="max-w-[200px]" title={l.matched}>
                    {l.matched === "—" ? (
                      <ToneBadge tone="warning">Keine Regel</ToneBadge>
                    ) : (
                      <span className="line-clamp-2 text-xs text-muted-foreground">{l.matched}</span>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLine(l.id)}
                      aria-label="Zeile löschen"
                      className="h-8 w-8 text-muted-foreground hover:bg-danger-soft hover:text-danger"
                    >
                      <Trash2 aria-hidden="true" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </KitTable>
        </ToolSection>
      )}

      <ToolSection title="So ordnet der Mapper zu" icon={Info}>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm md:grid-cols-2">
          {[
            {
              t: "Reverse-Charge nach § 13b Abs. 1 UStG (Konto 3123)",
              d: "Anbieter mit EU-Sitz (z. B. irische Töchter von Meta, Google, AWS, Microsoft, TikTok, Stripe): Buchung auf das Automatikkonto 3123 ohne BU-Schlüssel, damit die USt-VA Kz 46/47 und 67 befüllt. Du buchst die Umsatzsteuer selbst und ziehst sie als Vorsteuer wieder ab, im Saldo null. BU 19 wäre innergemeinschaftlicher Erwerb von Waren und füllt die falschen Kennzahlen. Kostenart ggf. per Umbuchung zuordnen und mit der Steuerberatung abstimmen.",
            },
            {
              t: "Vorsteuer 19 % (BU 9)",
              d: "Deutsche Rechnungen mit ausgewiesenen 19 %: Versand per DHL, Steuerberatung, Strom. Hotelübernachtungen laufen mit 7 % (BU 8).",
            },
            {
              t: "Ohne Steuerschlüssel",
              d: "Versicherungen, Sozialabgaben, Zahlungen an Behörden und Geldtransit (Auszahlungen von Marktplätzen auf 1360).",
            },
            {
              t: "Kontenübersicht SKR03",
              d: "1200 Bank · 1360 Geldtransit · 3100 Fremdleistungen (Marktplatz-Gebühren) · 4600 Werbung · 4730 Versand · 4900 Sonstiger Aufwand · 4950 Rechts- und Beratungskosten · 4955 Buchführung · 4920 Telefon · 4925 Internet · 4240 Strom · 4970 Bankgebühr · 4980 Sonstiger Betriebsbedarf · 4670/4676 Reisekosten Unternehmer · 3123 §13b EU-Leistungen · 2700 Sonstige Erträge. 8400 ist das Automatikkonto „Erlöse 19 %“ und nicht für sonstige Erträge.",
            },
            {
              t: "Zeilen ohne Regel",
              d: "Landen auf 4900 (Aufwand) bzw. 2700 (sonstiger Ertrag, ohne USt-Automatik). Vor dem Export auf das richtige Konto umstellen, echte Umsatzerlöse z. B. auf 8400.",
            },
            {
              t: "DATEV-Stapel",
              d: "Vereinfacht, nur Buchungszeilen ohne Kopfblock. Für den Import in DATEV Pro lädt deine Steuerberatung die Datei in den Format-Konverter, der die Kopfdaten ergänzt.",
            },
            {
              t: "Lexoffice-CSV",
              d: "Direkt importierbar über „Buchhaltung → Buchungssätze importieren“.",
            },
          ].map((p) => (
            <div key={p.t}>
              <dt className="font-medium">{p.t}</dt>
              <dd className="mt-0.5 leading-relaxed text-muted-foreground">{p.d}</dd>
            </div>
          ))}
        </dl>
      </ToolSection>
    </CockpitShell>
  );
};

export default DatevMapper;
