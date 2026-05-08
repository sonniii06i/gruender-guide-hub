import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Download, TrendingUp, AlertTriangle } from "lucide-react";

type BwaPos = {
  category: string;
  emoji: string;
  type: "erloes" | "aufwand";
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
      { name: "Sonstige Erlöse", key: "erloese_sonstige", skr03: "8400" },
    ],
  },
  {
    category: "Wareneinkauf / Material",
    emoji: "📦",
    type: "aufwand",
    positions: [
      { name: "Wareneinkauf 19% VSt", key: "wareneinkauf_19", skr03: "3400" },
      { name: "Wareneinkauf 7% VSt", key: "wareneinkauf_7", skr03: "3300" },
      { name: "Roh- / Hilfsstoffe", key: "rohhilfsstoffe", skr03: "3000" },
      { name: "Verpackungsmaterial", key: "verpackung", skr03: "4775" },
      { name: "Wareneingangsbestände-Veränderung", key: "bestandsveraendernung", skr03: "8990" },
    ],
  },
  {
    category: "Personal",
    emoji: "👥",
    type: "aufwand",
    positions: [
      { name: "Löhne und Gehälter", key: "loehne", skr03: "4120" },
      { name: "GF-Gehalt (sozialvers. ja/nein)", key: "gf_gehalt", skr03: "4124" },
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
      { name: "Tools (CRM, Email, Tracking)", key: "marketing_tools", skr03: "4910" },
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

const BwaGenerator = () => {
  const [values, setValues] = useState<Record<string, number>>({});
  const [companyName, setCompanyName] = useState("");
  const [zeitraum, setZeitraum] = useState("Q1 2026");

  const update = (key: string, val: number) => setValues({ ...values, [key]: val });

  const totals = useMemo(() => {
    const totalErloese = BWA_STRUCTURE.filter((g) => g.type === "erloes").reduce(
      (sum, g) => sum + g.positions.reduce((s, p) => s + (values[p.key] ?? 0), 0),
      0,
    );
    const totalAufwand = BWA_STRUCTURE.filter((g) => g.type === "aufwand").reduce(
      (sum, g) => sum + g.positions.reduce((s, p) => s + (values[p.key] ?? 0), 0),
      0,
    );
    const ebitda = totalErloese - totalAufwand + (values.afa_sach ?? 0) + (values.afa_immat ?? 0) + (values.gwg ?? 0);
    const ebit = totalErloese - totalAufwand + (values.zinsen_kredit ?? 0);
    const gewinn = totalErloese - totalAufwand;
    return { totalErloese, totalAufwand, gewinn, ebitda, ebit };
  }, [values]);

  const margePct = totals.totalErloese > 0 ? (totals.gewinn / totals.totalErloese) * 100 : 0;
  const aufwandsquote = totals.totalErloese > 0 ? (totals.totalAufwand / totals.totalErloese) * 100 : 0;

  const groupTotals = useMemo(() => {
    return BWA_STRUCTURE.map((g) => ({
      ...g,
      total: g.positions.reduce((s, p) => s + (values[p.key] ?? 0), 0),
      pctOfErloese:
        totals.totalErloese > 0
          ? (g.positions.reduce((s, p) => s + (values[p.key] ?? 0), 0) / totals.totalErloese) * 100
          : 0,
    }));
  }, [values, totals.totalErloese]);

  const downloadPdf = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const left = 15;
    const right = 195;
    let y = 18;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`Betriebswirtschaftliche Auswertung (BWA)`, left, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${companyName || "—"} · Zeitraum: ${zeitraum}`, left, y);
    y += 8;

    // Group sections
    for (const g of groupTotals) {
      if (y > 270) {
        doc.addPage();
        y = 18;
      }
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`${g.category}`, left, y);
      doc.text(`${g.total.toLocaleString("de-DE")} €`, right, y, { align: "right" });
      y += 5;
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      for (const p of g.positions) {
        const v = values[p.key] ?? 0;
        if (v === 0) continue;
        if (y > 275) {
          doc.addPage();
          y = 18;
        }
        doc.text(`  ${p.name}${p.skr03 ? ` (SKR03 ${p.skr03})` : ""}`, left + 3, y);
        doc.text(`${v.toLocaleString("de-DE")} €`, right, y, { align: "right" });
        y += 4;
      }
      y += 3;
    }

    // Summary
    if (y > 250) {
      doc.addPage();
      y = 18;
    }
    doc.setLineWidth(0.5);
    doc.line(left, y, right, y);
    y += 6;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Zusammenfassung", left, y);
    y += 6;
    doc.setFontSize(10);
    doc.text(`Gesamterlöse:`, left, y);
    doc.text(`${totals.totalErloese.toLocaleString("de-DE")} €`, right, y, { align: "right" });
    y += 5;
    doc.text(`Gesamtaufwand:`, left, y);
    doc.text(`${totals.totalAufwand.toLocaleString("de-DE")} €`, right, y, { align: "right" });
    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text(`Gewinn / Verlust:`, left, y);
    doc.text(`${totals.gewinn.toLocaleString("de-DE")} €`, right, y, { align: "right" });
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.text(`Marge:`, left, y);
    doc.text(`${margePct.toFixed(1)} %`, right, y, { align: "right" });
    y += 5;
    doc.text(`Aufwandsquote:`, left, y);
    doc.text(`${aufwandsquote.toFixed(1)} %`, right, y, { align: "right" });

    y += 10;
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(
      "Disclaimer: Vereinfachte BWA für interne Auswertung. Keine StB-Erstellung — bei jährlichem Abschluss mit Steuerberater abstimmen.",
      left,
      y,
      { maxWidth: right - left },
    );

    doc.save(`bwa-${(companyName || "firma").toLowerCase().replace(/[^a-z0-9]/g, "-")}-${zeitraum.replace(/\s+/g, "-")}.pdf`);
  };

  return (
    <CockpitShell
      eyebrow="BWA-Auto-Generator"
      title="Betriebswirtschaftliche Auswertung auf Knopfdruck"
      subtitle="11 Kategorien (Erlöse, Personal, Marketing, Versand, Marketplace, Raum, Verwaltung, AfA, Zinsen) · 40+ Positionen mit SKR03-Mapping · Live-KPIs (Marge, Aufwandsquote, EBITDA, EBIT) · PDF-Export für StB."
    >
      {/* Header */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">Stammdaten</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Firma</Label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="z.B. Mustermann GmbH"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Zeitraum</Label>
            <Input
              value={zeitraum}
              onChange={(e) => setZeitraum(e.target.value)}
              placeholder="z.B. Q1 2026 / Januar 2026"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* KPI-Übersicht */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-emerald-700">Erlöse</div>
          <div className="text-lg font-bold text-emerald-700">
            {totals.totalErloese.toLocaleString("de-DE")} €
          </div>
        </div>
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-red-700">Aufwand</div>
          <div className="text-lg font-bold text-red-700">{totals.totalAufwand.toLocaleString("de-DE")} €</div>
        </div>
        <div className={`rounded-2xl border p-4 ${
          totals.gewinn >= 0 ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"
        }`}>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Gewinn / Verlust</div>
          <div className={`text-lg font-bold ${totals.gewinn >= 0 ? "text-emerald-700" : "text-red-700"}`}>
            {totals.gewinn.toLocaleString("de-DE")} €
          </div>
        </div>
        <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-accent-blue">Marge</div>
          <div className="text-lg font-bold text-accent-blue">{margePct.toFixed(1)} %</div>
        </div>
        <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-purple-700">Aufwandsquote</div>
          <div className="text-lg font-bold text-purple-700">{aufwandsquote.toFixed(1)} %</div>
        </div>
      </div>

      {/* Group Tabs */}
      <div className="space-y-3 mb-6">
        {BWA_STRUCTURE.map((g) => {
          const groupTotal = g.positions.reduce((s, p) => s + (values[p.key] ?? 0), 0);
          return (
            <details
              key={g.category}
              className={`rounded-2xl border bg-card overflow-hidden ${
                groupTotal > 0 ? "border-accent-blue/30" : "border-border"
              }`}
              open={groupTotal > 0}
            >
              <summary className="cursor-pointer p-4 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{g.emoji}</span>
                    <span className="font-bold">{g.category}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        g.type === "erloes" ? "bg-emerald-500/10 text-emerald-700" : "bg-red-500/10 text-red-700"
                      }`}
                    >
                      {g.type === "erloes" ? "Erlös" : "Aufwand"}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold">
                      {groupTotal.toLocaleString("de-DE")} €
                    </div>
                    {totals.totalErloese > 0 && (
                      <div className="text-[10px] text-muted-foreground">
                        {((groupTotal / totals.totalErloese) * 100).toFixed(1)} % der Erlöse
                      </div>
                    )}
                  </div>
                </div>
              </summary>
              <div className="border-t border-border p-4 space-y-2">
                {g.positions.map((p) => (
                  <div key={p.key} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <Label className="text-sm md:col-span-2">
                      {p.name}
                      {p.skr03 && <span className="text-[10px] text-muted-foreground ml-1">(SKR03 {p.skr03})</span>}
                    </Label>
                    <Input
                      type="number"
                      value={values[p.key] || ""}
                      onChange={(e) => update(p.key, Math.max(0, Number(e.target.value) || 0))}
                      placeholder="0"
                      className="text-right h-8 text-sm"
                    />
                  </div>
                ))}
              </div>
            </details>
          );
        })}
      </div>

      {/* Erweiterte KPIs */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent-blue" /> Erweiterte KPIs
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <div className="text-[10px] text-muted-foreground uppercase">EBITDA</div>
            <div className="font-bold">{totals.ebitda.toLocaleString("de-DE")} €</div>
            <div className="text-[10px] text-muted-foreground">Vor AfA + Zinsen</div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase">EBIT</div>
            <div className="font-bold">{totals.ebit.toLocaleString("de-DE")} €</div>
            <div className="text-[10px] text-muted-foreground">Vor Zinsen</div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase">EBITDA-Marge</div>
            <div className="font-bold">
              {totals.totalErloese > 0 ? ((totals.ebitda / totals.totalErloese) * 100).toFixed(1) : 0} %
            </div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase">Working-Capital-Bedarf</div>
            <div className="font-bold">~{Math.round(totals.totalAufwand / 12 * 2).toLocaleString("de-DE")} €</div>
            <div className="text-[10px] text-muted-foreground">2 Monate Aufwand</div>
          </div>
        </div>
      </div>

      {/* Aktion */}
      <div className="rounded-2xl border-2 border-accent-blue/40 bg-gradient-to-br from-card via-card to-accent-blue/5 p-5 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-bold text-lg mb-1">BWA als PDF</div>
            <div className="text-sm text-muted-foreground">
              Kompletter Report mit allen Positionen + KPIs für StB / Bank-Pitch / Investoren-Update
            </div>
          </div>
          <button
            onClick={downloadPdf}
            disabled={totals.totalErloese === 0 && totals.totalAufwand === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-6 py-3 text-sm font-bold hover:opacity-90 disabled:opacity-50"
          >
            <Download className="h-4 w-4" /> BWA herunterladen
          </button>
        </div>
      </div>

      {/* Tipps */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <Calculator className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">BWA in der Praxis:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Monats-BWA</strong>: typisch zum 10. des Folgemonats. Bank verlangt das oft bei Krediten.
              </li>
              <li>
                <strong>Zielmarken</strong>: Marge &gt; 20 % gesund · Aufwandsquote &lt; 80 % · EBITDA-Marge &gt;
                15 %
              </li>
              <li>
                <strong>SKR03 vs. SKR04</strong>: dieses Tool zeigt SKR03-Konten. SKR04 hat andere Nummern (z.B.
                4400 statt 8400 für Erlöse 19 %)
              </li>
              <li>
                <strong>Lexoffice / sevDesk</strong>: BWA wird automatisch erstellt — dieses Tool ist für
                Schnell-Auswertungen ohne Tool-Login nützlich oder bei Spreadsheet-Excel-Buchhaltung
              </li>
              <li>
                <strong>Nicht enthalten</strong>: Bilanz-Positionen (Aktiva/Passiva). Für Bilanz: separates
                Bilanz-Tool oder StB.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default BwaGenerator;
