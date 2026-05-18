import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  Download,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Banknote,
  Building2,
  ArrowDown,
  ArrowUp,
  Minus,
} from "lucide-react";

type BwaPos = {
  category: string;
  emoji: string;
  type: "erloes" | "aufwand";
  /** Diese Kategorie zählt als Materialaufwand für Rohertragsberechnung. */
  istMaterial?: boolean;
  /** Diese Kategorie zählt als Personalaufwand. */
  istPersonal?: boolean;
  positions: { name: string; key: string; skr03?: string }[];
};

const BWA_STRUCTURE: BwaPos[] = [
  {
    category: "Erlöse",
    emoji: "💰",
    type: "erloes",
    positions: [
      { name: "Umsatzerlöse 19% USt", key: "erloese_19", skr03: "8400" },
      { name: "Umsatzerlöse 7% USt", key: "erloese_7", skr03: "8300" },
      { name: "Erlöse innergemeinschaftliche Lieferung", key: "erloese_ig", skr03: "8125" },
      { name: "Erlöse Drittland (Export)", key: "erloese_drittland", skr03: "8120" },
      { name: "Sonstige betriebliche Erträge", key: "erloese_sonstige", skr03: "8400" },
    ],
  },
  {
    category: "Wareneinkauf / Material",
    emoji: "📦",
    type: "aufwand",
    istMaterial: true,
    positions: [
      { name: "Wareneinkauf 19% VSt", key: "wareneinkauf_19", skr03: "3400" },
      { name: "Wareneinkauf 7% VSt", key: "wareneinkauf_7", skr03: "3300" },
      { name: "Roh- / Hilfsstoffe", key: "rohhilfsstoffe", skr03: "3000" },
      { name: "Verpackungsmaterial", key: "verpackung", skr03: "4775" },
      { name: "Bestandsveränderung", key: "bestandsveraendernung", skr03: "8990" },
    ],
  },
  {
    category: "Personal",
    emoji: "👥",
    type: "aufwand",
    istPersonal: true,
    positions: [
      { name: "Löhne und Gehälter", key: "loehne", skr03: "4120" },
      { name: "GF-Gehalt", key: "gf_gehalt", skr03: "4124" },
      { name: "Sozialversicherung", key: "sv", skr03: "4138" },
      { name: "Berufsgenossenschaft", key: "bg", skr03: "4138" },
    ],
  },
  {
    category: "Marketing / Vertrieb",
    emoji: "📣",
    type: "aufwand",
    positions: [
      { name: "Werbekosten / Ads (Meta, Google)", key: "ads", skr03: "4600" },
      { name: "Influencer / PR", key: "influencer", skr03: "4600" },
      { name: "Marketing-Tools (CRM, Email, Tracking)", key: "marketing_tools", skr03: "4910" },
      { name: "Provisionen", key: "provisionen", skr03: "4760" },
    ],
  },
  {
    category: "Versand / Fulfillment",
    emoji: "🚚",
    type: "aufwand",
    positions: [
      { name: "Frachtkosten / Versand", key: "fracht", skr03: "4730" },
      { name: "FBA / 3PL-Gebühren", key: "fba", skr03: "3100" },
      { name: "Lagerkosten", key: "lager", skr03: "4210" },
    ],
  },
  {
    category: "Marketplace-Gebühren",
    emoji: "🛍️",
    type: "aufwand",
    positions: [
      { name: "Amazon-Gebühren (FBA, Provision)", key: "amazon_fees", skr03: "3100" },
      { name: "Shopify / Stripe / Paypal Fees", key: "payment_fees", skr03: "3100" },
      { name: "eBay / Kaufland / Otto Provisionen", key: "marketplace_fees", skr03: "3100" },
    ],
  },
  {
    category: "Raumkosten",
    emoji: "🏢",
    type: "aufwand",
    positions: [
      { name: "Miete Büro / Geschäftsräume", key: "miete", skr03: "4210" },
      { name: "Strom / Heizung / Reinigung", key: "nebenkosten", skr03: "4240" },
      { name: "Coworking-Beiträge", key: "coworking", skr03: "4210" },
    ],
  },
  {
    category: "Verwaltung / Sonstige",
    emoji: "📋",
    type: "aufwand",
    positions: [
      { name: "Beratungs- / StB-Kosten", key: "stb", skr03: "4955" },
      { name: "Anwaltskosten", key: "anwalt", skr03: "4955" },
      { name: "Versicherungen (D&O, Haftpflicht)", key: "versicherung", skr03: "4360" },
      { name: "IT / Software-Abos", key: "it_software", skr03: "4910" },
      { name: "Bürobedarf", key: "buero", skr03: "4930" },
      { name: "Telefon / Internet", key: "telefon", skr03: "4920" },
      { name: "Fortbildung / Coaching", key: "fortbildung", skr03: "4945" },
      { name: "Reisekosten / Bewirtung", key: "reisen", skr03: "4670" },
      { name: "Sonstige Aufwendungen", key: "sonstige", skr03: "4900" },
    ],
  },
  {
    category: "Abschreibungen",
    emoji: "📉",
    type: "aufwand",
    positions: [
      { name: "AfA Sachanlagen (Computer, Möbel)", key: "afa_sach", skr03: "4830" },
      { name: "AfA immaterielle Güter (Software)", key: "afa_immat", skr03: "4831" },
      { name: "GWG-Sofortabschreibung (< 800 €)", key: "gwg", skr03: "4855" },
    ],
  },
  {
    category: "Finanzierung / Zinsen",
    emoji: "🏦",
    type: "aufwand",
    positions: [
      { name: "Zinsaufwand Kredite", key: "zinsen_kredit", skr03: "2110" },
      { name: "Bankgebühren", key: "bank_geb", skr03: "4970" },
    ],
  },
];

type Bilanz = {
  ek: number;
  fk_langfr: number;
  fk_kurzfr: number;
  cash: number;
  forderungen: number;
  vorraete: number;
};

type Kapitaldienst = {
  tilgung_pa: number;
  zinsen_pa: number;
};

type Summary = {
  branche: string;
  geschaeftsmodell: string;
  usp: string;
  ausblick: string;
  anlass: string;
};

type AmpelStatus = "gruen" | "gelb" | "rot" | "neutral";

const ampelMeta: Record<AmpelStatus, { color: string; bg: string; label: string }> = {
  gruen: { color: "text-emerald-700", bg: "bg-emerald-500/10 border-emerald-500/30", label: "✓ Bank-stark" },
  gelb: { color: "text-amber-700", bg: "bg-amber-500/10 border-amber-500/30", label: "⚠ Akzeptabel" },
  rot: { color: "text-red-700", bg: "bg-red-500/10 border-red-500/30", label: "✗ Bank-Risiko" },
  neutral: { color: "text-muted-foreground", bg: "bg-secondary/30 border-border", label: "— Keine Daten" },
};

const ampelHex: Record<AmpelStatus, string> = {
  gruen: "#10b981",
  gelb: "#f59e0b",
  rot: "#ef4444",
  neutral: "#9ca3af",
};

const formatEur = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const formatPct = (n: number) => `${n.toFixed(1)} %`;

const BwaGenerator = () => {
  const [values, setValues] = useState<Record<string, number>>({});
  const [valuesVor, setValuesVor] = useState<Record<string, number>>({});
  const [vorperiodeAktiv, setVorperiodeAktiv] = useState(false);
  const [bilanzAktiv, setBilanzAktiv] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [rechtsform, setRechtsform] = useState("GmbH");
  const [zeitraum, setZeitraum] = useState("Q1 2026");
  const [zeitraumVor, setZeitraumVor] = useState("Q1 2025");

  const [bilanz, setBilanz] = useState<Bilanz>({
    ek: 0,
    fk_langfr: 0,
    fk_kurzfr: 0,
    cash: 0,
    forderungen: 0,
    vorraete: 0,
  });
  const [kapitaldienst, setKapitaldienst] = useState<Kapitaldienst>({ tilgung_pa: 0, zinsen_pa: 0 });
  const [summary, setSummary] = useState<Summary>({
    branche: "",
    geschaeftsmodell: "",
    usp: "",
    ausblick: "",
    anlass: "",
  });

  const update = (key: string, val: number) => setValues({ ...values, [key]: val });
  const updateVor = (key: string, val: number) => setValuesVor({ ...valuesVor, [key]: val });

  // === BERECHNUNGEN ===
  const calcTotals = (v: Record<string, number>) => {
    const erloese = BWA_STRUCTURE.filter((g) => g.type === "erloes").reduce(
      (sum, g) => sum + g.positions.reduce((s, p) => s + (v[p.key] ?? 0), 0),
      0,
    );
    const material = BWA_STRUCTURE.filter((g) => g.istMaterial).reduce(
      (sum, g) => sum + g.positions.reduce((s, p) => s + (v[p.key] ?? 0), 0),
      0,
    );
    const personal = BWA_STRUCTURE.filter((g) => g.istPersonal).reduce(
      (sum, g) => sum + g.positions.reduce((s, p) => s + (v[p.key] ?? 0), 0),
      0,
    );
    const aufwand = BWA_STRUCTURE.filter((g) => g.type === "aufwand").reduce(
      (sum, g) => sum + g.positions.reduce((s, p) => s + (v[p.key] ?? 0), 0),
      0,
    );
    const afa = (v.afa_sach ?? 0) + (v.afa_immat ?? 0) + (v.gwg ?? 0);
    const zinsen = v.zinsen_kredit ?? 0;
    const gewinn = erloese - aufwand;
    const ebit = gewinn + zinsen;
    const ebitda = ebit + afa;
    const rohertrag = erloese - material;
    return { erloese, material, personal, aufwand, afa, zinsen, gewinn, ebit, ebitda, rohertrag };
  };

  const totals = useMemo(() => calcTotals(values), [values]);
  const totalsVor = useMemo(() => (vorperiodeAktiv ? calcTotals(valuesVor) : null), [valuesVor, vorperiodeAktiv]);

  const bilanzsumme = bilanz.ek + bilanz.fk_langfr + bilanz.fk_kurzfr;

  // === BANK-KENNZAHLEN ===
  const kpis = useMemo(() => {
    const e = totals.erloese;
    const umsatzrendite = e > 0 ? (totals.gewinn / e) * 100 : 0;
    const ebitdaMarge = e > 0 ? (totals.ebitda / e) * 100 : 0;
    const ebitMarge = e > 0 ? (totals.ebit / e) * 100 : 0;
    const rohertragsmarge = e > 0 ? (totals.rohertrag / e) * 100 : 0;
    const personalquote = e > 0 ? (totals.personal / e) * 100 : 0;
    const aufwandsquote = e > 0 ? (totals.aufwand / e) * 100 : 0;
    const ekQuote = bilanzsumme > 0 ? (bilanz.ek / bilanzsumme) * 100 : 0;
    const verschuldungsgrad = bilanz.ek > 0 ? ((bilanz.fk_langfr + bilanz.fk_kurzfr) / bilanz.ek) * 100 : 0;
    const zinsdeckung = totals.zinsen > 0 ? totals.ebit / totals.zinsen : 0;
    const kapitaldienstGesamt = kapitaldienst.tilgung_pa + kapitaldienst.zinsen_pa;
    const dscr = kapitaldienstGesamt > 0 ? totals.ebitda / kapitaldienstGesamt : 0;
    const currentRatio = bilanz.fk_kurzfr > 0
      ? (bilanz.cash + bilanz.forderungen + bilanz.vorraete) / bilanz.fk_kurzfr
      : 0;
    const liquiditaetsreserve = totals.aufwand > 0 ? (bilanz.cash / (totals.aufwand / 12)) : 0;

    // YoY-Wachstum
    const umsatzwachstum = totalsVor && totalsVor.erloese > 0
      ? ((totals.erloese - totalsVor.erloese) / totalsVor.erloese) * 100
      : null;
    const ebitdaWachstum = totalsVor && totalsVor.ebitda !== 0
      ? ((totals.ebitda - totalsVor.ebitda) / Math.abs(totalsVor.ebitda)) * 100
      : null;

    return {
      umsatzrendite, ebitdaMarge, ebitMarge, rohertragsmarge,
      personalquote, aufwandsquote, ekQuote, verschuldungsgrad,
      zinsdeckung, dscr, currentRatio, liquiditaetsreserve,
      umsatzwachstum, ebitdaWachstum, kapitaldienstGesamt,
    };
  }, [totals, totalsVor, bilanz, bilanzsumme, kapitaldienst]);

  // === BANK-AMPELN ===
  // Schwellen aus Banken-Rating-Praxis (Sparkassen-Rating-Modell, KfW-Anforderungen, BBB-Mittelstand)
  const ampel = useMemo(() => {
    const r: Record<string, { status: AmpelStatus; hint: string }> = {};

    // EBITDA-Marge: >15% sehr gut, 8-15% ok, <8% kritisch
    r.ebitdaMarge = kpis.ebitdaMarge >= 15
      ? { status: "gruen", hint: "Bank-stark (>15%)" }
      : kpis.ebitdaMarge >= 8
      ? { status: "gelb", hint: "Akzeptabel (8-15%)" }
      : totals.erloese > 0
      ? { status: "rot", hint: "Kritisch (<8%)" }
      : { status: "neutral", hint: "" };

    // EBIT-Marge: >10% sehr gut, 5-10% ok, <5% kritisch
    r.ebitMarge = kpis.ebitMarge >= 10
      ? { status: "gruen", hint: "Bank-stark (>10%)" }
      : kpis.ebitMarge >= 5
      ? { status: "gelb", hint: "Akzeptabel (5-10%)" }
      : totals.erloese > 0
      ? { status: "rot", hint: "Kritisch (<5%)" }
      : { status: "neutral", hint: "" };

    // EK-Quote: >25% sehr gut, 10-25% ok, <10% kritisch
    r.ekQuote = bilanzsumme === 0
      ? { status: "neutral", hint: "Bilanz fehlt" }
      : kpis.ekQuote >= 25
      ? { status: "gruen", hint: "Bank-stark (>25%)" }
      : kpis.ekQuote >= 10
      ? { status: "gelb", hint: "Akzeptabel (10-25%)" }
      : { status: "rot", hint: "Kritisch (<10%)" };

    // DSCR: >1.3 sehr gut, 1.1-1.3 ok, <1.1 kritisch (KfW verlangt >1.2)
    r.dscr = kpis.kapitaldienstGesamt === 0
      ? { status: "neutral", hint: "Kein Kapitaldienst" }
      : kpis.dscr >= 1.3
      ? { status: "gruen", hint: "Bank-stark (>1,3 — KfW-tauglich)" }
      : kpis.dscr >= 1.1
      ? { status: "gelb", hint: "Akzeptabel (1,1-1,3)" }
      : { status: "rot", hint: "Kritisch (<1,1 — Banken verlangen meist >1,2)" };

    // Zinsdeckung: >5 sehr gut, 2-5 ok, <2 kritisch
    r.zinsdeckung = totals.zinsen === 0
      ? { status: "neutral", hint: "Keine Zinsen" }
      : kpis.zinsdeckung >= 5
      ? { status: "gruen", hint: "Bank-stark (>5x)" }
      : kpis.zinsdeckung >= 2
      ? { status: "gelb", hint: "Akzeptabel (2-5x)" }
      : { status: "rot", hint: "Kritisch (<2x)" };

    // Current Ratio: >1.5 sehr gut, 1.0-1.5 ok, <1.0 kritisch
    r.currentRatio = bilanz.fk_kurzfr === 0
      ? { status: "neutral", hint: "Keine kurzfr. FK" }
      : kpis.currentRatio >= 1.5
      ? { status: "gruen", hint: "Bank-stark (>1,5)" }
      : kpis.currentRatio >= 1.0
      ? { status: "gelb", hint: "Akzeptabel (1,0-1,5)" }
      : { status: "rot", hint: "Kritisch (<1,0)" };

    // Wachstum: >10% sehr gut, 0-10% ok, <0% kritisch
    r.wachstum = kpis.umsatzwachstum === null
      ? { status: "neutral", hint: "Vorperiode fehlt" }
      : kpis.umsatzwachstum >= 10
      ? { status: "gruen", hint: `Wachstum +${kpis.umsatzwachstum.toFixed(1)}%` }
      : kpis.umsatzwachstum >= 0
      ? { status: "gelb", hint: `Stagnation ${kpis.umsatzwachstum.toFixed(1)}%` }
      : { status: "rot", hint: `Rückgang ${kpis.umsatzwachstum.toFixed(1)}%` };

    // Personalquote: <30% sehr gut, 30-50% ok, >50% kritisch (außer Beratung)
    r.personalquote = totals.erloese === 0
      ? { status: "neutral", hint: "" }
      : kpis.personalquote <= 30
      ? { status: "gruen", hint: "Effizient (<30%)" }
      : kpis.personalquote <= 50
      ? { status: "gelb", hint: "Mittel (30-50%)" }
      : { status: "rot", hint: "Hoch (>50%) — bei Dienstleistern OK" };

    return r;
  }, [kpis, bilanzsumme, totals, bilanz]);

  // === BANK-SCORE: 0-100 ===
  const bankScore = useMemo(() => {
    const weights = {
      ebitdaMarge: 20,
      ebitMarge: 15,
      ekQuote: 20,
      dscr: 20,
      wachstum: 10,
      zinsdeckung: 10,
      currentRatio: 5,
    };
    const statusScore = (s: AmpelStatus): number =>
      s === "gruen" ? 100 : s === "gelb" ? 60 : s === "rot" ? 20 : 50;
    let total = 0;
    let weightSum = 0;
    (Object.keys(weights) as (keyof typeof weights)[]).forEach((k) => {
      const a = ampel[k];
      if (!a || a.status === "neutral") return;
      total += statusScore(a.status) * weights[k];
      weightSum += weights[k];
    });
    if (weightSum === 0) return null;
    return Math.round(total / weightSum);
  }, [ampel]);

  const bankRating = bankScore === null
    ? null
    : bankScore >= 80
    ? { grade: "A", label: "Bonität sehr gut", color: "emerald" }
    : bankScore >= 65
    ? { grade: "BBB", label: "Bonität gut (Mittelstand)", color: "emerald" }
    : bankScore >= 50
    ? { grade: "BB", label: "Bonität akzeptabel", color: "amber" }
    : bankScore >= 35
    ? { grade: "B", label: "Bonität schwach", color: "amber" }
    : { grade: "CCC", label: "Bonität kritisch", color: "red" };

  // === PDF EXPORT ===
  const downloadPdf = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const PAGE_W = 210;
    const PAGE_H = 297;
    const left = 15;
    const right = PAGE_W - 15;
    const contentW = right - left;
    let y = 18;
    let pageNum = 1;

    const footer = () => {
      doc.setFontSize(7);
      doc.setTextColor(140);
      doc.setFont("helvetica", "normal");
      doc.text(`${companyName || "—"} · ${zeitraum} · BWA · vertraulich`, left, PAGE_H - 8);
      doc.text(`Seite ${pageNum}`, right, PAGE_H - 8, { align: "right" });
      doc.setTextColor(0);
    };

    const newPage = () => {
      footer();
      doc.addPage();
      pageNum++;
      y = 18;
    };

    const ensureSpace = (mm: number) => {
      if (y + mm > PAGE_H - 18) newPage();
    };

    const h1 = (text: string) => {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(text, left, y);
      y += 7;
      doc.setLineWidth(0.4);
      doc.setDrawColor(40, 90, 200);
      doc.line(left, y, left + 30, y);
      doc.setDrawColor(0);
      y += 6;
    };

    const h2 = (text: string) => {
      ensureSpace(10);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 60, 100);
      doc.text(text, left, y);
      doc.setTextColor(0);
      y += 6;
    };

    const para = (text: string, opts: { size?: number; bold?: boolean } = {}) => {
      const { size = 10, bold = false } = opts;
      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      const wrapped = doc.splitTextToSize(text, contentW);
      ensureSpace(wrapped.length * size * 0.42 + 2);
      doc.text(wrapped, left, y);
      y += wrapped.length * size * 0.42 + 2;
    };

    const kpiBox = (label: string, val: string, hint: string, status: AmpelStatus, x: number, boxY: number, w: number) => {
      doc.setDrawColor(...hexToRgb(ampelHex[status]));
      doc.setFillColor(...hexToRgb(ampelHex[status], 0.08));
      doc.roundedRect(x, boxY, w, 22, 2, 2, "FD");
      doc.setDrawColor(0);
      doc.setFontSize(7);
      doc.setTextColor(120);
      doc.setFont("helvetica", "normal");
      doc.text(label.toUpperCase(), x + 3, boxY + 5);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...hexToRgb(ampelHex[status]));
      doc.text(val, x + 3, boxY + 12);
      doc.setFontSize(7);
      doc.setTextColor(80);
      doc.setFont("helvetica", "normal");
      const wrappedHint = doc.splitTextToSize(hint, w - 6);
      doc.text(wrappedHint, x + 3, boxY + 17);
      doc.setTextColor(0);
    };

    // ========== SEITE 1: COVER + EXECUTIVE SUMMARY ==========
    // Banner
    doc.setFillColor(20, 50, 110);
    doc.rect(0, 0, PAGE_W, 50, "F");
    doc.setTextColor(255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("BETRIEBSWIRTSCHAFTLICHE AUSWERTUNG", left, 18);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(companyName || "[Firmenname]", left, 30);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${rechtsform} · Zeitraum: ${zeitraum}`, left, 40);
    doc.text(`Erstellt: ${new Date().toLocaleDateString("de-DE")}`, right, 40, { align: "right" });
    doc.setTextColor(0);

    y = 62;

    // Bank-Score-Box
    if (bankScore !== null && bankRating) {
      const scoreColor = bankRating.color === "emerald" ? "#10b981" : bankRating.color === "amber" ? "#f59e0b" : "#ef4444";
      doc.setDrawColor(...hexToRgb(scoreColor));
      doc.setFillColor(...hexToRgb(scoreColor, 0.06));
      doc.roundedRect(left, y, contentW, 28, 3, 3, "FD");
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text("BANK-TAUGLICHKEITS-SCORE", left + 5, y + 7);
      doc.setFontSize(26);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...hexToRgb(scoreColor));
      doc.text(`${bankScore} / 100`, left + 5, y + 19);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`Rating: ${bankRating.grade}`, right - 5, y + 12, { align: "right" });
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(bankRating.label, right - 5, y + 19, { align: "right" });
      doc.setTextColor(0);
      doc.setDrawColor(0);
      y += 34;
    }

    h2("Management-Summary");
    if (summary.anlass) para(`Anlass: ${summary.anlass}`, { bold: true });
    if (summary.branche) para(`Branche: ${summary.branche}`);
    if (summary.geschaeftsmodell) para(`Geschäftsmodell: ${summary.geschaeftsmodell}`);
    if (summary.usp) para(`USP / Wettbewerbsvorteil: ${summary.usp}`);
    if (summary.ausblick) para(`Ausblick: ${summary.ausblick}`);
    if (!summary.branche && !summary.geschaeftsmodell && !summary.usp && !summary.ausblick) {
      para("(Keine Management-Summary hinterlegt — bitte vor Bank-Vorlage ergänzen)", { size: 9 });
    }
    y += 4;

    h2("Kernzahlen auf einen Blick");
    const boxW = (contentW - 6) / 3;
    kpiBox("Umsatz", `${formatEur(totals.erloese)} €`, kpis.umsatzwachstum !== null ? `YoY ${kpis.umsatzwachstum >= 0 ? "+" : ""}${kpis.umsatzwachstum.toFixed(1)}%` : "Keine Vorperiode", ampel.wachstum.status, left, y, boxW);
    kpiBox("EBITDA", `${formatEur(totals.ebitda)} €`, `Marge ${formatPct(kpis.ebitdaMarge)}`, ampel.ebitdaMarge.status, left + boxW + 3, y, boxW);
    kpiBox("Gewinn/Verlust", `${formatEur(totals.gewinn)} €`, `Marge ${formatPct(kpis.umsatzrendite)}`, totals.gewinn >= 0 ? "gruen" : "rot", left + 2 * (boxW + 3), y, boxW);
    y += 26;

    // ========== SEITE 2: BANK-KENNZAHLEN-DASHBOARD ==========
    newPage();
    h1("Bank-Kennzahlen-Dashboard");
    para("Bewertung nach Banken-Standards (Sparkassen-Rating-Modell + KfW-Anforderungen + BBB-Mittelstand-Schwellen). Ampel-System zeigt direkt was Bank-fest ist und wo nachgebessert werden muss.", { size: 9 });
    y += 4;

    const kennzahlen: { label: string; val: string; hint: string; status: AmpelStatus }[] = [
      { label: "EBITDA-Marge", val: formatPct(kpis.ebitdaMarge), hint: ampel.ebitdaMarge.hint, status: ampel.ebitdaMarge.status },
      { label: "EBIT-Marge", val: formatPct(kpis.ebitMarge), hint: ampel.ebitMarge.hint, status: ampel.ebitMarge.status },
      { label: "EK-Quote", val: formatPct(kpis.ekQuote), hint: ampel.ekQuote.hint, status: ampel.ekQuote.status },
      { label: "DSCR", val: kpis.kapitaldienstGesamt > 0 ? `${kpis.dscr.toFixed(2)}x` : "—", hint: ampel.dscr.hint, status: ampel.dscr.status },
      { label: "Zinsdeckung", val: totals.zinsen > 0 ? `${kpis.zinsdeckung.toFixed(1)}x` : "—", hint: ampel.zinsdeckung.hint, status: ampel.zinsdeckung.status },
      { label: "Current Ratio", val: bilanz.fk_kurzfr > 0 ? `${kpis.currentRatio.toFixed(2)}` : "—", hint: ampel.currentRatio.hint, status: ampel.currentRatio.status },
      { label: "Umsatz-Wachstum YoY", val: kpis.umsatzwachstum !== null ? `${kpis.umsatzwachstum >= 0 ? "+" : ""}${formatPct(kpis.umsatzwachstum)}` : "—", hint: ampel.wachstum.hint, status: ampel.wachstum.status },
      { label: "Personal-Quote", val: formatPct(kpis.personalquote), hint: ampel.personalquote.hint, status: ampel.personalquote.status },
    ];
    const kpiBoxW = (contentW - 6) / 3;
    let rowY = y;
    kennzahlen.forEach((kz, i) => {
      const col = i % 3;
      const x = left + col * (kpiBoxW + 3);
      if (col === 0 && i > 0) {
        rowY += 26;
        ensureSpace(26);
      }
      kpiBox(kz.label, kz.val, kz.hint, kz.status, x, rowY, kpiBoxW);
    });
    y = rowY + 30;

    h2("Erklärung der Schwellen");
    para("EBITDA-Marge: >15% bank-stark · 8-15% akzeptabel · <8% kritisch", { size: 8 });
    para("EK-Quote: >25% bank-stark · 10-25% akzeptabel · <10% kritisch (sehr riskant)", { size: 8 });
    para("DSCR (Debt Service Coverage Ratio): >1,3 bank-stark · 1,1-1,3 akzeptabel · <1,1 kritisch (KfW verlangt >1,2)", { size: 8 });
    para("Zinsdeckung (EBIT / Zinsaufwand): >5x bank-stark · 2-5x akzeptabel · <2x kritisch", { size: 8 });

    // ========== SEITE 3: DETAILLIERTE GuV ==========
    newPage();
    h1("Gewinn- und Verlustrechnung (BWA-Form)");

    const showVor = vorperiodeAktiv && totalsVor !== null;
    // Tabellen-Header
    doc.setFillColor(240, 244, 250);
    doc.rect(left, y, contentW, 7, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Position", left + 2, y + 5);
    if (showVor) {
      doc.text(zeitraumVor, right - 80, y + 5, { align: "right" });
      doc.text(zeitraum, right - 30, y + 5, { align: "right" });
      doc.text("Δ %", right - 2, y + 5, { align: "right" });
    } else {
      doc.text(zeitraum, right - 2, y + 5, { align: "right" });
    }
    y += 9;

    for (const g of BWA_STRUCTURE) {
      const groupTotal = g.positions.reduce((s, p) => s + (values[p.key] ?? 0), 0);
      if (groupTotal === 0 && (!showVor || g.positions.reduce((s, p) => s + (valuesVor[p.key] ?? 0), 0) === 0)) continue;
      ensureSpace(8);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(g.type === "erloes" ? 16 : 110, g.type === "erloes" ? 130 : 60, g.type === "erloes" ? 90 : 60);
      doc.text(`${g.category}`, left + 2, y);
      if (showVor) {
        const vorTotal = g.positions.reduce((s, p) => s + (valuesVor[p.key] ?? 0), 0);
        const pct = vorTotal !== 0 ? ((groupTotal - vorTotal) / Math.abs(vorTotal)) * 100 : null;
        doc.text(`${formatEur(vorTotal)} €`, right - 80, y, { align: "right" });
        doc.text(`${formatEur(groupTotal)} €`, right - 30, y, { align: "right" });
        doc.text(pct !== null ? `${pct >= 0 ? "+" : ""}${pct.toFixed(0)}%` : "—", right - 2, y, { align: "right" });
      } else {
        doc.text(`${formatEur(groupTotal)} €`, right - 2, y, { align: "right" });
      }
      doc.setTextColor(0);
      y += 5;

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      for (const p of g.positions) {
        const v = values[p.key] ?? 0;
        const vVor = valuesVor[p.key] ?? 0;
        if (v === 0 && (!showVor || vVor === 0)) continue;
        ensureSpace(4);
        doc.setTextColor(80);
        const skrSuffix = p.skr03 ? ` (${p.skr03})` : "";
        doc.text(`   ${p.name}${skrSuffix}`, left + 2, y);
        if (showVor) {
          const pct = vVor !== 0 ? ((v - vVor) / Math.abs(vVor)) * 100 : null;
          doc.text(`${formatEur(vVor)} €`, right - 80, y, { align: "right" });
          doc.text(`${formatEur(v)} €`, right - 30, y, { align: "right" });
          doc.text(pct !== null ? `${pct >= 0 ? "+" : ""}${pct.toFixed(0)}%` : "—", right - 2, y, { align: "right" });
        } else {
          doc.text(`${formatEur(v)} €`, right - 2, y, { align: "right" });
        }
        doc.setTextColor(0);
        y += 4;
      }
      y += 2;
    }

    ensureSpace(28);
    doc.setLineWidth(0.4);
    doc.line(left, y, right, y);
    y += 5;

    const summaryRow = (label: string, val: number, valVor: number | null = null, bold = false) => {
      ensureSpace(5);
      doc.setFontSize(10);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.text(label, left + 2, y);
      if (showVor && valVor !== null) {
        doc.text(`${formatEur(valVor)} €`, right - 80, y, { align: "right" });
        doc.text(`${formatEur(val)} €`, right - 30, y, { align: "right" });
        const pct = valVor !== 0 ? ((val - valVor) / Math.abs(valVor)) * 100 : null;
        doc.text(pct !== null ? `${pct >= 0 ? "+" : ""}${pct.toFixed(0)}%` : "—", right - 2, y, { align: "right" });
      } else {
        doc.text(`${formatEur(val)} €`, right - 2, y, { align: "right" });
      }
      y += 5;
    };

    summaryRow("Gesamterlöse", totals.erloese, totalsVor?.erloese ?? null, true);
    summaryRow("Gesamtaufwand", totals.aufwand, totalsVor?.aufwand ?? null, true);
    summaryRow("EBITDA (vor Zinsen + AfA)", totals.ebitda, totalsVor?.ebitda ?? null, true);
    summaryRow("EBIT (vor Zinsen)", totals.ebit, totalsVor?.ebit ?? null);
    summaryRow("Gewinn / Verlust", totals.gewinn, totalsVor?.gewinn ?? null, true);

    // ========== SEITE 4: BILANZ-KENNZAHLEN + KAPITALDIENST ==========
    if (bilanzAktiv) {
      newPage();
      h1("Bilanz-Struktur + Kapitaldienst-Fähigkeit");

      h2("Bilanz-Eckwerte");
      const bilanzData = [
        { label: "Eigenkapital", val: bilanz.ek },
        { label: "Fremdkapital langfristig (>1 J.)", val: bilanz.fk_langfr },
        { label: "Fremdkapital kurzfristig (<1 J.)", val: bilanz.fk_kurzfr },
        { label: "Bilanzsumme", val: bilanzsumme, bold: true },
        { label: "Cash + Bank", val: bilanz.cash },
        { label: "Forderungen", val: bilanz.forderungen },
        { label: "Vorräte", val: bilanz.vorraete },
      ];
      bilanzData.forEach((b) => {
        ensureSpace(5);
        doc.setFontSize(10);
        doc.setFont("helvetica", b.bold ? "bold" : "normal");
        doc.text(b.label, left + 2, y);
        doc.text(`${formatEur(b.val)} €`, right - 2, y, { align: "right" });
        y += 5;
      });
      y += 3;

      h2("Kapitaldienst-Fähigkeit (DSCR-Analyse)");
      const dscrRows = [
        { label: "EBITDA (operativ)", val: `${formatEur(totals.ebitda)} €` },
        { label: "+ Tilgung p.a.", val: `${formatEur(kapitaldienst.tilgung_pa)} €` },
        { label: "+ Zinsen p.a.", val: `${formatEur(kapitaldienst.zinsen_pa)} €` },
        { label: "Kapitaldienst gesamt", val: `${formatEur(kpis.kapitaldienstGesamt)} €` },
        { label: "DSCR = EBITDA / Kapitaldienst", val: kpis.kapitaldienstGesamt > 0 ? `${kpis.dscr.toFixed(2)}x` : "—", bold: true },
        { label: "Banken-Schwelle (typisch)", val: ">1,2x (KfW); >1,3x (kommerziell)" },
      ];
      dscrRows.forEach((b) => {
        ensureSpace(5);
        doc.setFontSize(10);
        doc.setFont("helvetica", b.bold ? "bold" : "normal");
        doc.text(b.label, left + 2, y);
        doc.text(b.val, right - 2, y, { align: "right" });
        y += 5;
      });

      y += 4;
      h2("Strukturkennzahlen");
      const strukRows = [
        { label: "EK-Quote", val: `${formatPct(kpis.ekQuote)} (Schwelle BBB: >25%)` },
        { label: "Verschuldungsgrad (FK/EK)", val: bilanz.ek > 0 ? `${formatPct(kpis.verschuldungsgrad)}` : "—" },
        { label: "Current Ratio (Umlaufv./kurzfr.FK)", val: bilanz.fk_kurzfr > 0 ? `${kpis.currentRatio.toFixed(2)}` : "—" },
        { label: "Liquiditätsreserve (Monate)", val: totals.aufwand > 0 ? `${kpis.liquiditaetsreserve.toFixed(1)} Mon.` : "—" },
      ];
      strukRows.forEach((b) => {
        ensureSpace(5);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(b.label, left + 2, y);
        doc.text(b.val, right - 2, y, { align: "right" });
        y += 5;
      });
    }

    // ========== FINAL FOOTER + DISCLAIMER ==========
    ensureSpace(20);
    y += 5;
    doc.setLineWidth(0.2);
    doc.setDrawColor(200);
    doc.line(left, y, right, y);
    doc.setDrawColor(0);
    y += 4;
    doc.setFontSize(7);
    doc.setTextColor(140);
    doc.text(
      "Disclaimer: Diese BWA ist eine Management-Auswertung auf Basis der vom Mandanten eingegebenen Werte. " +
      "Keine geprüfte Buchhaltung. Für offizielle Bilanz / Jahresabschluss bitte Steuerberater konsultieren. " +
      "SKR03-Konten als Orientierung. Erstellt mit GründerX-BWA-Generator.",
      left,
      y,
      { maxWidth: contentW },
    );
    doc.setTextColor(0);
    footer();

    doc.save(`bwa-${(companyName || "firma").toLowerCase().replace(/[^a-z0-9]/g, "-")}-${zeitraum.replace(/\s+/g, "-")}-bankfaehig.pdf`);
  };

  return (
    <CockpitShell
      eyebrow="BWA-Generator · Bank-tauglich"
      title="Bank-feste BWA in 5 Sektionen"
      subtitle="Nicht nur GuV-Liste — komplette Banker-Story: Management-Summary, Bank-Kennzahlen-Dashboard mit Ampeln (EBITDA-Marge, EK-Quote, DSCR, Zinsdeckung), YoY-Vergleich, Bilanz-Struktur + Kapitaldienst. Bank-Score 0-100 mit BBB-Rating-Schwellen."
    >
      {/* Bank-Score-Hero */}
      {bankScore !== null && bankRating && (
        <div className={`rounded-2xl border-2 p-5 mb-6 ${
          bankRating.color === "emerald" ? "border-emerald-500/40 bg-emerald-500/5"
          : bankRating.color === "amber" ? "border-amber-500/40 bg-amber-500/5"
          : "border-red-500/40 bg-red-500/5"
        }`}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Bank-Tauglichkeits-Score</div>
              <div className="flex items-baseline gap-3">
                <div className={`text-4xl font-bold ${
                  bankRating.color === "emerald" ? "text-emerald-700"
                  : bankRating.color === "amber" ? "text-amber-700"
                  : "text-red-700"
                }`}>{bankScore}</div>
                <div className="text-lg text-muted-foreground">/ 100</div>
                <div className={`rounded-full px-3 py-1 text-sm font-bold ${
                  bankRating.color === "emerald" ? "bg-emerald-500/10 text-emerald-700"
                  : bankRating.color === "amber" ? "bg-amber-500/10 text-amber-700"
                  : "bg-red-500/10 text-red-700"
                }`}>{bankRating.grade}</div>
              </div>
              <div className="text-sm text-muted-foreground mt-1">{bankRating.label}</div>
            </div>
            <Banknote className="h-12 w-12 text-muted-foreground/40" />
          </div>
        </div>
      )}

      {/* Stammdaten */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-accent-blue" /> Stammdaten
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Firma</Label>
            <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="z.B. Mustermann GmbH" className="mt-1" />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Rechtsform</Label>
            <select value={rechtsform} onChange={(e) => setRechtsform(e.target.value)} className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1">
              {["Einzelunternehmen", "GbR", "UG (haftungsbeschränkt)", "GmbH", "GmbH & Co. KG", "AG", "Holding"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Zeitraum</Label>
            <Input value={zeitraum} onChange={(e) => setZeitraum(e.target.value)} placeholder="z.B. Q1 2026" className="mt-1" />
          </div>
        </div>
      </div>

      {/* Management-Summary (für Bank-Vorlage essentiell) */}
      <details className="rounded-2xl border-2 border-amber-500/40 bg-amber-500/5 p-5 mb-4" open>
        <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
          <Sparkle className="h-4 w-4 text-amber-700" /> Management-Summary (Cover-Letter für Bank) ★ Wichtig
        </summary>
        <p className="text-xs text-muted-foreground mt-2 mb-3">
          Banker wollen Story sehen, nicht nur Zahlen. Diese 5 Felder landen auf Seite 1 des PDFs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Anlass der BWA</Label>
            <Input value={summary.anlass} onChange={(e) => setSummary({ ...summary, anlass: e.target.value })} placeholder="z.B. Kreditverlängerung 2026, Wachstumsfinanzierung 500k" className="mt-1 h-9 text-sm" />
          </div>
          <div>
            <Label className="text-xs">Branche</Label>
            <Input value={summary.branche} onChange={(e) => setSummary({ ...summary, branche: e.target.value })} placeholder="z.B. D2C-Beauty / SaaS B2B / Online-Handel" className="mt-1 h-9 text-sm" />
          </div>
          <div className="md:col-span-2">
            <Label className="text-xs">Geschäftsmodell (1-2 Sätze)</Label>
            <textarea value={summary.geschaeftsmodell} onChange={(e) => setSummary({ ...summary, geschaeftsmodell: e.target.value })} rows={2} className="w-full mt-1 rounded-md border border-input bg-background px-2 py-1.5 text-sm" placeholder="z.B. D2C Skincare-Brand mit Razor-Blade-Modell. 60% Wiederkäufer, AOV 65€, LTV/CAC 3,2x." />
          </div>
          <div className="md:col-span-2">
            <Label className="text-xs">USP / Wettbewerbsvorteil</Label>
            <textarea value={summary.usp} onChange={(e) => setSummary({ ...summary, usp: e.target.value })} rows={2} className="w-full mt-1 rounded-md border border-input bg-background px-2 py-1.5 text-sm" placeholder="z.B. Eigene Formulierung mit Naturstoff X — patentgeschützt, Apothekenmarken konkurrieren nicht direkt." />
          </div>
          <div className="md:col-span-2">
            <Label className="text-xs">Ausblick / Forecast nächste 12 Monate</Label>
            <textarea value={summary.ausblick} onChange={(e) => setSummary({ ...summary, ausblick: e.target.value })} rows={2} className="w-full mt-1 rounded-md border border-input bg-background px-2 py-1.5 text-sm" placeholder="z.B. Umsatz-Plan +35% YoY, Skalierung auf AT/CH Q3 2026, EBITDA-Marge soll auf 18% steigen." />
          </div>
        </div>
      </details>

      {/* GuV-Eingabe (Detail) */}
      <div className="space-y-3 mb-4">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <Calculator className="h-4 w-4" /> GuV-Positionen
          <button
            onClick={() => setVorperiodeAktiv(!vorperiodeAktiv)}
            className={`ml-auto rounded-full px-3 py-1 text-[10px] font-semibold ${
              vorperiodeAktiv ? "bg-accent-blue text-primary-foreground" : "border border-border bg-card hover:bg-secondary"
            }`}
          >
            {vorperiodeAktiv ? "✓ Vorperioden-Vergleich AN" : "+ Vorperioden-Vergleich (YoY) aktivieren"}
          </button>
        </h3>
        {vorperiodeAktiv && (
          <div className="rounded-xl border border-accent-blue/30 bg-accent-blue/5 p-3">
            <Label className="text-xs">Vorperiode (für YoY-Vergleich)</Label>
            <Input value={zeitraumVor} onChange={(e) => setZeitraumVor(e.target.value)} placeholder="z.B. Q1 2025" className="mt-1 h-9 text-sm max-w-xs" />
          </div>
        )}
        {BWA_STRUCTURE.map((g) => {
          const groupTotal = g.positions.reduce((s, p) => s + (values[p.key] ?? 0), 0);
          const groupTotalVor = g.positions.reduce((s, p) => s + (valuesVor[p.key] ?? 0), 0);
          return (
            <details key={g.category} className={`rounded-2xl border bg-card overflow-hidden ${groupTotal > 0 ? "border-accent-blue/30" : "border-border"}`} open={groupTotal > 0}>
              <summary className="cursor-pointer p-4 hover:bg-secondary/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{g.emoji}</span>
                    <span className="font-bold">{g.category}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${g.type === "erloes" ? "bg-emerald-500/10 text-emerald-700" : "bg-red-500/10 text-red-700"}`}>
                      {g.type === "erloes" ? "Erlös" : "Aufwand"}
                    </span>
                  </div>
                  <div className="text-right text-xs">
                    <div className="font-mono font-bold">{formatEur(groupTotal)} €</div>
                    {vorperiodeAktiv && groupTotalVor > 0 && (
                      <YoyDelta now={groupTotal} prev={groupTotalVor} />
                    )}
                  </div>
                </div>
              </summary>
              <div className="border-t border-border p-4 space-y-2">
                {g.positions.map((p) => (
                  <div key={p.key} className={`grid gap-2 items-center ${vorperiodeAktiv ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1 md:grid-cols-3"}`}>
                    <Label className={`text-sm ${vorperiodeAktiv ? "md:col-span-2" : "md:col-span-2"}`}>
                      {p.name}
                      {p.skr03 && <span className="text-[10px] text-muted-foreground ml-1">(SKR03 {p.skr03})</span>}
                    </Label>
                    {vorperiodeAktiv && (
                      <Input type="number" value={valuesVor[p.key] || ""} onChange={(e) => updateVor(p.key, Math.max(0, Number(e.target.value) || 0))} placeholder={`${zeitraumVor}`} className="text-right h-8 text-sm bg-secondary/30" />
                    )}
                    <Input type="number" value={values[p.key] || ""} onChange={(e) => update(p.key, Math.max(0, Number(e.target.value) || 0))} placeholder={zeitraum} className="text-right h-8 text-sm" />
                  </div>
                ))}
              </div>
            </details>
          );
        })}
      </div>

      {/* Bilanz + Kapitaldienst (optional, aber für Bank-Score essentiell) */}
      <details className="rounded-2xl border-2 border-purple-500/30 bg-purple-500/5 p-5 mb-4" open={bilanzAktiv}>
        <summary className="cursor-pointer font-bold text-sm flex items-center gap-2" onClick={(e) => { e.preventDefault(); setBilanzAktiv(!bilanzAktiv); }}>
          <Building2 className="h-4 w-4 text-purple-700" />
          Bilanz-Eckwerte + Kapitaldienst ★ aktiviert EK-Quote, DSCR, Zinsdeckung im Bank-Score
          <span className="ml-auto text-xs text-purple-700">{bilanzAktiv ? "AN" : "AUS"}</span>
        </summary>
        {bilanzAktiv && (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <BilanzInput label="Eigenkapital (€)" val={bilanz.ek} onChange={(v) => setBilanz({ ...bilanz, ek: v })} hint="Gezeichnetes Kapital + Rücklagen + Gewinnvortrag" />
              <BilanzInput label="FK langfristig (€)" val={bilanz.fk_langfr} onChange={(v) => setBilanz({ ...bilanz, fk_langfr: v })} hint="Kredite >1J, Anleihen, sonst. langfr. Verbindlichkeiten" />
              <BilanzInput label="FK kurzfristig (€)" val={bilanz.fk_kurzfr} onChange={(v) => setBilanz({ ...bilanz, fk_kurzfr: v })} hint="Lieferanten, Lohn, Steuern, Kreditlinien <1J" />
              <BilanzInput label="Cash + Bank (€)" val={bilanz.cash} onChange={(v) => setBilanz({ ...bilanz, cash: v })} hint="Liquide Mittel" />
              <BilanzInput label="Forderungen (€)" val={bilanz.forderungen} onChange={(v) => setBilanz({ ...bilanz, forderungen: v })} hint="Offene Kundenrechnungen" />
              <BilanzInput label="Vorräte (€)" val={bilanz.vorraete} onChange={(v) => setBilanz({ ...bilanz, vorraete: v })} hint="Lager, Roh/Hilfs/Betriebsstoffe, FBA-Inventar" />
            </div>
            <div className="rounded-xl bg-white border border-purple-500/20 p-3">
              <div className="text-xs font-bold mb-2">Kapitaldienst (für DSCR)</div>
              <div className="grid grid-cols-2 gap-3">
                <BilanzInput label="Tilgung p.a. (€)" val={kapitaldienst.tilgung_pa} onChange={(v) => setKapitaldienst({ ...kapitaldienst, tilgung_pa: v })} hint="Jährliche Tilgungsleistung aller Kredite" />
                <BilanzInput label="Zinsen p.a. (€)" val={kapitaldienst.zinsen_pa} onChange={(v) => setKapitaldienst({ ...kapitaldienst, zinsen_pa: v })} hint="Jährlicher Zinsaufwand aller Kredite" />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Kapitaldienst gesamt: <strong>{formatEur(kpis.kapitaldienstGesamt)} €</strong>
                {kpis.kapitaldienstGesamt > 0 && <> · DSCR = EBITDA / Kapitaldienst = <strong className={ampelMeta[ampel.dscr.status].color}>{kpis.dscr.toFixed(2)}x</strong></>}
              </div>
            </div>
          </div>
        )}
      </details>

      {/* Bank-Kennzahlen-Dashboard */}
      <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-700" /> Bank-Kennzahlen-Dashboard
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <KpiCard label="EBITDA-Marge" val={formatPct(kpis.ebitdaMarge)} status={ampel.ebitdaMarge.status} hint={ampel.ebitdaMarge.hint} />
          <KpiCard label="EBIT-Marge" val={formatPct(kpis.ebitMarge)} status={ampel.ebitMarge.status} hint={ampel.ebitMarge.hint} />
          <KpiCard label="EK-Quote" val={bilanzsumme > 0 ? formatPct(kpis.ekQuote) : "—"} status={ampel.ekQuote.status} hint={ampel.ekQuote.hint} />
          <KpiCard label="DSCR" val={kpis.kapitaldienstGesamt > 0 ? `${kpis.dscr.toFixed(2)}x` : "—"} status={ampel.dscr.status} hint={ampel.dscr.hint} />
          <KpiCard label="Zinsdeckung" val={totals.zinsen > 0 ? `${kpis.zinsdeckung.toFixed(1)}x` : "—"} status={ampel.zinsdeckung.status} hint={ampel.zinsdeckung.hint} />
          <KpiCard label="Current Ratio" val={bilanz.fk_kurzfr > 0 ? kpis.currentRatio.toFixed(2) : "—"} status={ampel.currentRatio.status} hint={ampel.currentRatio.hint} />
          <KpiCard label="Wachstum (YoY)" val={kpis.umsatzwachstum !== null ? `${kpis.umsatzwachstum >= 0 ? "+" : ""}${formatPct(kpis.umsatzwachstum)}` : "—"} status={ampel.wachstum.status} hint={ampel.wachstum.hint} />
          <KpiCard label="Personal-Quote" val={formatPct(kpis.personalquote)} status={ampel.personalquote.status} hint={ampel.personalquote.hint} />
        </div>
      </div>

      {/* PDF-Download */}
      <div className="rounded-2xl border-2 border-accent-blue/40 bg-gradient-to-br from-card via-card to-accent-blue/5 p-5 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-bold text-lg mb-1">Bank-feste BWA als PDF</div>
            <div className="text-sm text-muted-foreground">
              5 Sektionen · Cover mit Bank-Score · KPI-Dashboard mit Ampeln · GuV mit YoY · Bilanz-Strukturanalyse
            </div>
          </div>
          <button
            onClick={downloadPdf}
            disabled={totals.erloese === 0 && totals.aufwand === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-6 py-3 text-sm font-bold hover:opacity-90 disabled:opacity-50"
          >
            <Download className="h-4 w-4" /> Bank-BWA herunterladen
          </button>
        </div>
      </div>

      {/* Tipps */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-2">Bank-BWA in der Praxis:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Wann zur Bank?</strong> Monatlich bei laufendem Kredit · Quartalsweise bei Wachstumsfinanzierung-Anfragen · Vor jeder Kreditverlängerung
              </li>
              <li>
                <strong>BBB-Mittelstand-Schwellen</strong> (gut für Bank-Termsheet): EK-Quote &gt;25% · EBITDA-Marge &gt;15% · DSCR &gt;1,3
              </li>
              <li>
                <strong>KfW-Programme</strong> verlangen typischerweise DSCR &gt;1,2 und positive Eigenkapital-Entwicklung
              </li>
              <li>
                <strong>Was Banker checken</strong>: Wachstums-Trajectory, Cash-Flow-Stabilität, Personal-Quote, Lieferanten-Konzentration, USt-Voranmeldungs-Pünktlichkeit
              </li>
              <li>
                <strong>Pro-Tipp</strong>: Management-Summary auf Seite 1 ist Differenzierungs-Faktor — Banker lesen das ZUERST. Schwammig = schlechtes Signal.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

// ===== Sub-Components =====

const Sparkle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" /></svg>
);

const YoyDelta = ({ now, prev }: { now: number; prev: number }) => {
  if (prev === 0) return null;
  const pct = ((now - prev) / Math.abs(prev)) * 100;
  const color = pct > 0 ? "text-emerald-700" : pct < 0 ? "text-red-700" : "text-muted-foreground";
  const Icon = pct > 0 ? ArrowUp : pct < 0 ? ArrowDown : Minus;
  return (
    <div className={`text-[10px] ${color} flex items-center justify-end gap-0.5`}>
      <Icon className="h-3 w-3" /> {pct >= 0 ? "+" : ""}{pct.toFixed(0)}% YoY
    </div>
  );
};

const BilanzInput = ({ label, val, onChange, hint }: { label: string; val: number; onChange: (v: number) => void; hint?: string }) => (
  <div>
    <Label className="text-xs font-semibold">{label}</Label>
    {hint && <div className="text-[10px] text-muted-foreground leading-tight mb-1">{hint}</div>}
    <Input type="number" value={val || ""} onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))} placeholder="0" className="h-9 text-sm text-right" />
  </div>
);

const KpiCard = ({ label, val, status, hint }: { label: string; val: string; status: AmpelStatus; hint: string }) => {
  const meta = ampelMeta[status];
  return (
    <div className={`rounded-xl border p-3 ${meta.bg}`}>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-lg font-bold ${meta.color}`}>{val}</div>
      <div className={`text-[10px] mt-0.5 ${meta.color}`}>{hint}</div>
    </div>
  );
};

// === Helpers ===
function hexToRgb(hex: string, alpha = 1): [number, number, number] {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // jsPDF setFillColor ignores alpha — we just return rgb. Alpha handled via repeated draws if needed.
  void alpha;
  return [r, g, b];
}

export default BwaGenerator;
