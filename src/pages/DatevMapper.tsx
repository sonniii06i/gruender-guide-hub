import { useState, useMemo } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Upload, Plus, Trash2, FileSpreadsheet, Wand2 } from "lucide-react";

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

// SKR03 Konten-Cheat-Sheet:
// 1200 Bank | 1360 Geldtransit | 1576 Vorsteuer 19% | 1771 USt 19%
// 1500 sonst Vermögen | 8400 sonst Erträge
// 3100 Fremdleistungen | 4600 Werbekosten | 4380 sonst Abgaben
// 4900 sonst Aufwand | 4910 Buchführung | 4920 Rechtsberatung | 4925 Telefon
// 4930 Strom | 4210 Miete | 4380 Versicherung | 6750 Reisekosten
// 8400 sonst Erträge | 8200 Erlöse 19% | 8338 Erlöse EU OSS | 8125 Erlöse stfr §4 EU
//
// BU-Schlüssel SKR03: 9 = VSt 19% | 8 = VSt 7% | 19 = §13b RC | 94 = Drittland

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
    match: "Stripe Auszahlung / Fees",
    einnahme: { konto: "1360", steuerschluessel: "", buchungstext: "Stripe Auszahlung" },
    ausgabe: { konto: "4970", steuerschluessel: "9", buchungstext: "Stripe Fees" },
  },
  {
    pattern: /paypal.*europe|paypal\s+pte/i,
    match: "PayPal Auszahlung / Fees",
    einnahme: { konto: "1360", steuerschluessel: "", buchungstext: "PayPal Auszahlung" },
    ausgabe: { konto: "4970", steuerschluessel: "9", buchungstext: "PayPal Fees" },
  },
  {
    pattern: /klarna|sofort gmbh|sofort\s+ag/i,
    match: "Klarna / Sofort",
    einnahme: { konto: "1360", steuerschluessel: "", buchungstext: "Klarna/Sofort Auszahlung" },
    ausgabe: { konto: "4970", steuerschluessel: "9", buchungstext: "Klarna/Sofort Fees" },
  },
  {
    pattern: /shopify/i,
    match: "Shopify",
    einnahme: { konto: "1360", steuerschluessel: "", buchungstext: "Shopify Payments Auszahlung" },
    ausgabe: { konto: "4980", steuerschluessel: "19", buchungstext: "Shopify Subscription (RC §13b)" },
  },
  {
    pattern: /ebay|kaufland|otto|etsy|zalando/i,
    match: "Marketplace (eBay/Kaufland/Otto/Etsy/Zalando)",
    einnahme: { konto: "1360", steuerschluessel: "", buchungstext: "Marketplace Auszahlung" },
    ausgabe: { konto: "3100", steuerschluessel: "9", buchungstext: "Marketplace Fees" },
  },

  // === Cloud / SaaS ===
  {
    pattern: /aws emea|amazon web services|amazon\s+cloud/i,
    match: "AWS Cloud (RC §13b)",
    ausgabe: { konto: "4980", steuerschluessel: "19", buchungstext: "AWS (RC §13b)" },
  },
  {
    pattern: /google\s+cloud|google.*workspace|google\s+ireland/i,
    match: "Google Cloud / Workspace (RC §13b)",
    ausgabe: { konto: "4980", steuerschluessel: "19", buchungstext: "Google Cloud (RC §13b)" },
  },
  {
    pattern: /microsoft\s+ireland|azure|office\s+365|microsoft\s+365/i,
    match: "Microsoft Azure / 365 (RC §13b)",
    ausgabe: { konto: "4980", steuerschluessel: "19", buchungstext: "MS Azure/365 (RC §13b)" },
  },
  {
    pattern: /openai|anthropic|claude\.ai|chatgpt/i,
    match: "OpenAI / Anthropic (RC §13b für IE-Sub, sonst Drittland)",
    ausgabe: { konto: "4980", steuerschluessel: "19", buchungstext: "AI-API Subscription" },
  },
  {
    pattern: /github|cloudflare|vercel|netlify|digitalocean|hetzner online|ovh/i,
    match: "Hosting / Dev-Tools",
    ausgabe: { konto: "4980", steuerschluessel: "9", buchungstext: "Hosting / Dev-Tools" },
  },
  {
    pattern: /lovable|figma|notion|slack|miro|linear|atlassian/i,
    match: "SaaS-Tools",
    ausgabe: { konto: "4980", steuerschluessel: "9", buchungstext: "SaaS-Subscription" },
  },

  // === Marketing / Ads ===
  {
    pattern: /meta platforms|facebook.*ireland|instagram\s+ads/i,
    match: "Meta Ads (RC §13b)",
    ausgabe: { konto: "4600", steuerschluessel: "19", buchungstext: "Meta Ads (RC §13b)" },
  },
  {
    pattern: /tiktok\s+ads|bytedance/i,
    match: "TikTok Ads (RC §13b)",
    ausgabe: { konto: "4600", steuerschluessel: "19", buchungstext: "TikTok Ads (RC §13b)" },
  },
  {
    pattern: /google\s+ads|google adwords/i,
    match: "Google Ads (RC §13b)",
    ausgabe: { konto: "4600", steuerschluessel: "19", buchungstext: "Google Ads (RC §13b)" },
  },
  {
    pattern: /klaviyo|brevo|sendinblue|mailchimp|active\s+campaign/i,
    match: "Email-Marketing-Tool",
    ausgabe: { konto: "4600", steuerschluessel: "9", buchungstext: "Email-Marketing-Subscription" },
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
    ausgabe: { konto: "4910", steuerschluessel: "9", buchungstext: "Buchführung / Steuerberatung" },
  },
  {
    pattern: /\brechtsanwalt\b|kanzlei|notariat|notar/i,
    match: "Rechtsberatung / Notar",
    ausgabe: { konto: "4920", steuerschluessel: "9", buchungstext: "Rechts-/Notarkosten" },
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
    ausgabe: { konto: "6750", steuerschluessel: "9", buchungstext: "Reisekosten Übernachtung" },
  },
  {
    pattern: /\blufthansa\b|easyjet|ryanair|eurowings|condor|swiss air|klm|british airways|deutsche bahn|sixt|europcar|hertz/i,
    match: "Verkehr (Flug/Bahn/Mietwagen)",
    ausgabe: { konto: "6750", steuerschluessel: "9", buchungstext: "Reisekosten Verkehr" },
  },

  // === Personal ===
  {
    pattern: /gehalt|lohn|gehaltszahlung|salary/i,
    match: "Lohn / Gehalt",
    ausgabe: { konto: "4120", steuerschluessel: "", buchungstext: "Lohn/Gehalt" },
  },
  {
    pattern: /sozialversicherung|aok|tk\s+|techniker krankenkasse|barmer|dak|knappschaft|minijob/i,
    match: "Sozialversicherung",
    ausgabe: { konto: "4130", steuerschluessel: "", buchungstext: "Sozialabgaben" },
  },

  // === Dauer-Verträge ===
  {
    pattern: /miete|rent\b/i,
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
    ausgabe: { konto: "4930", steuerschluessel: "9", buchungstext: "Strom / Energie" },
  },
];

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
    konto: betrag < 0 ? "4900" : "8400",
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
    rows.forEach((row, idx) => {
      if (!row.trim()) return;
      // Skip Header-Zeile
      if (idx === 0 && /datum|betrag|verwendung/i.test(row) && !/^\d/.test(row)) return;

      // Versuche zu splitten
      const sep = row.includes(";") ? ";" : row.includes("\t") ? "\t" : ",";
      const cols = row.split(sep).map((c) => c.replace(/^["']|["']$/g, "").trim());

      // Heuristik: Datum, Betrag, Zweck — find them
      let datum = new Date().toISOString().slice(0, 10);
      let betrag = 0;
      let zweck = row;

      cols.forEach((c) => {
        const dMatch = c.match(/^(\d{1,2})[\.\/-](\d{1,2})[\.\/-](\d{2,4})/);
        if (dMatch && datum === new Date().toISOString().slice(0, 10)) {
          let yyyy = dMatch[3];
          if (yyyy.length === 2) yyyy = "20" + yyyy;
          datum = `${yyyy}-${dMatch[2].padStart(2, "0")}-${dMatch[1].padStart(2, "0")}`;
        }
        const bMatch = c.replace(/\./g, "").replace(",", ".").match(/^-?\d+\.?\d*$/);
        if (bMatch && betrag === 0 && Math.abs(parseFloat(c.replace(/\./g, "").replace(",", "."))) > 0) {
          betrag = parseFloat(c.replace(/\./g, "").replace(",", "."));
        }
      });

      // Zweck: längster nicht-numerischer Text
      const textCols = cols.filter((c) => !/^-?[\d\.,]+$/.test(c) && !/^\d{1,2}[\.\/-]\d{1,2}/.test(c));
      if (textCols.length > 0) zweck = textCols.sort((a, b) => b.length - a.length)[0];

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
        `"${l.buchungstext.replace(/"/g, '""')}"`,
        l.konto,
        l.gegenkonto,
        Math.abs(l.betrag).toFixed(2).replace(".", ","),
        l.steuerschluessel,
        `${dirSign}: ${l.matched}`,
      ].join(";");
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lexoffice-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
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
        `"${l.buchungstext.replace(/"/g, '""')}"`,
      ].join(";");
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `datev-stapel-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const stats = useMemo(() => {
    const ausgaben = lines.filter((l) => l.betrag < 0).reduce((s, l) => s + Math.abs(l.betrag), 0);
    const einnahmen = lines.filter((l) => l.betrag > 0).reduce((s, l) => s + l.betrag, 0);
    const ungemappt = lines.filter((l) => l.matched === "—").length;
    return { ausgaben, einnahmen, ungemappt };
  }, [lines]);

  return (
    <CockpitShell
      eyebrow="DATEV / Lexoffice Auto-Mapper"
      title="Bank-CSV → DATEV-Stapel + Lexoffice-Import"
      subtitle="35+ Auto-Regeln (Amazon, Stripe, PayPal, Klarna, Shopify, AWS, Meta/TikTok/Google Ads, DHL, Steuerberater, Versicherungen, Reise, Strom). Auto-erkennt Reverse-Charge §13b für IE-Sub-Anbieter. Editierbar pro Zeile."
    >
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-emerald-700">Einnahmen</div>
          <div className="text-xl font-bold text-emerald-700">
            {stats.einnahmen.toLocaleString("de-DE", { maximumFractionDigits: 2 })} €
          </div>
        </div>
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-red-700">Ausgaben</div>
          <div className="text-xl font-bold text-red-700">
            {stats.ausgaben.toLocaleString("de-DE", { maximumFractionDigits: 2 })} €
          </div>
        </div>
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-amber-700">Ungemappt</div>
          <div className="text-xl font-bold text-amber-700">{stats.ungemappt}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Manuell prüfen</div>
        </div>
      </div>

      {/* CSV Import */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Upload className="h-4 w-4 text-accent-blue" />
          <h3 className="font-semibold text-sm">Bank-CSV einfügen (Holvi/Qonto/Penta/N26 etc.)</h3>
        </div>
        <textarea
          value={csvPaste}
          onChange={(e) => setCsvPaste(e.target.value)}
          placeholder="Datum;Betrag;Verwendungszweck&#10;01.05.2026;-149,90;Stripe Technology Inc Fees&#10;02.05.2026;3245,12;Amazon EU SARL Auszahlung"
          className="w-full h-32 rounded-md border border-input bg-background px-3 py-2 text-xs font-mono"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={importCsv}
            disabled={!csvPaste.trim()}
            className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:opacity-90 disabled:opacity-50"
          >
            <Wand2 className="h-3.5 w-3.5" /> Auto-Mappen
          </button>
          <button
            onClick={addLine}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
          >
            <Plus className="h-3.5 w-3.5" /> Manuelle Zeile
          </button>
        </div>
      </div>

      {/* Lines Table */}
      {lines.length > 0 && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-secondary text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="text-left p-2">Datum</th>
                  <th className="text-right p-2">Betrag</th>
                  <th className="text-left p-2">Zweck</th>
                  <th className="text-left p-2">Konto</th>
                  <th className="text-left p-2">Gegen</th>
                  <th className="text-left p-2">BU</th>
                  <th className="text-left p-2">Match</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l) => (
                  <tr key={l.id} className="border-t border-border">
                    <td className="p-1.5">
                      <Input
                        type="date"
                        value={l.datum}
                        onChange={(e) => updateLine(l.id, { datum: e.target.value })}
                        className="h-7 text-xs w-32"
                      />
                    </td>
                    <td className="p-1.5">
                      <Input
                        type="number"
                        step="0.01"
                        value={l.betrag || ""}
                        onChange={(e) => updateLine(l.id, { betrag: Number(e.target.value) || 0 })}
                        className={`h-7 text-xs w-24 text-right font-mono ${l.betrag < 0 ? "text-red-700" : l.betrag > 0 ? "text-emerald-700" : ""}`}
                      />
                    </td>
                    <td className="p-1.5">
                      <Input
                        value={l.zweck}
                        onChange={(e) => updateLine(l.id, { zweck: e.target.value })}
                        className="h-7 text-xs w-64"
                      />
                    </td>
                    <td className="p-1.5">
                      <Input
                        value={l.konto}
                        onChange={(e) => updateLine(l.id, { konto: e.target.value })}
                        className="h-7 text-xs w-16 font-mono"
                      />
                    </td>
                    <td className="p-1.5">
                      <Input
                        value={l.gegenkonto}
                        onChange={(e) => updateLine(l.id, { gegenkonto: e.target.value })}
                        className="h-7 text-xs w-14 font-mono"
                      />
                    </td>
                    <td className="p-1.5">
                      <Input
                        value={l.steuerschluessel}
                        onChange={(e) => updateLine(l.id, { steuerschluessel: e.target.value })}
                        className="h-7 text-xs w-12 font-mono"
                      />
                    </td>
                    <td className="p-1.5 text-[10px] text-muted-foreground max-w-[160px] truncate" title={l.matched}>
                      {l.matched}
                    </td>
                    <td className="p-1.5">
                      <button
                        onClick={() => removeLine(l.id)}
                        className="text-red-600 hover:bg-red-500/10 p-1 rounded"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Export */}
      {lines.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={exportLexoffice}
            className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-xs font-semibold hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" /> Lexoffice-CSV ({lines.length})
          </button>
          <button
            onClick={exportDatev}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-xs font-semibold hover:bg-secondary"
          >
            <FileSpreadsheet className="h-3.5 w-3.5" /> DATEV-Stapel ({lines.length})
          </button>
        </div>
      )}

      {/* Hinweise */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="font-semibold mb-2">Auto-Mapping-Logik</div>
        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
          <li>
            <strong>Reverse-Charge §13b UStG</strong> (BU 19): IE-Sub-Anbieter wie Meta, Google, AWS, Microsoft,
            TikTok, Stripe (IE) — du buchst USt selbst + ziehst sie sofort wieder als VSt (saldo 0).
          </li>
          <li>
            <strong>Vorsteuer 19%</strong> (BU 9): DE-USt mit ausgewiesenem 19%-Satz (Versand DHL, Steuerberater,
            Hotels, Strom).
          </li>
          <li>
            <strong>Ohne Steuerschlüssel</strong>: Versicherung, Sozialabgaben, Behördenzahlungen, Geldtransit
            (Auszahlung Marketplace → 1360).
          </li>
          <li>
            <strong>Konten-Cheat-Sheet</strong> (SKR03): 1200 Bank · 1360 Geldtransit · 3100 Fremdleistungen
            (Marketplace-Fees) · 4600 Werbung · 4730 Versand · 4900 Sonst Aufwand · 4910 Buchführung · 4925
            Telefon · 4930 Strom · 4970 Bankgebühr · 4980 Sonst Lieferung·Leistung · 6750 Reisekosten · 8400
            Sonst Erträge.
          </li>
          <li>
            <strong>Ungemappte Zeilen</strong> landen auf 4900 (Aufwand) bzw. 8400 (Ertrag) — manuell auf
            korrektes Konto umstellen vor Export.
          </li>
          <li>
            <strong>DATEV-Stapel</strong> ist vereinfacht (Buchungssatz-Zeilen ohne Header-Block). Für
            DATEV-Pro-Import muss dein StB die Datei in den DATEV-Format-Convert-Helfer laden — Header werden
            dort automatisch ergänzt.
          </li>
          <li>
            <strong>Lexoffice-CSV</strong> ist sofort import-bar via "Buchhaltung → Buchungssätze importieren".
          </li>
        </ul>
      </div>
    </CockpitShell>
  );
};

export default DatevMapper;
