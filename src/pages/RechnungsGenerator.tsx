/**
 * RechnungsGenerator — "Erste richtige Rechnung schreiben"
 *
 * Tool 9 der Anfänger-Wave (Starter-Kategorie, Wave 3).
 *
 * Echtes Werkzeug, nicht nur Erklärung: erzeugt §14 UStG-konforme
 * Rechnung als PDF (jspdf + jspdf-autotable). Vier USt-Modi:
 *   - Standard (19 % / 7 %)
 *   - Kleinunternehmer §19 UStG (KU-Hinweis statt USt)
 *   - Reverse-Charge §13b UStG (innergemeinschaftlich B2B)
 *   - Innergemeinschaftliche Lieferung §6a UStG (steuerfrei + USt-IDs)
 *
 * Plus: §14-Pflichtangaben-Checkliste (live), Vorschau, PDF-Download,
 * Speichern als JSON (lokal, kein Server).
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  FileDown,
  Save,
  Upload,
  Trash2,
  Plus,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type UstModus = "standard" | "kleinunternehmer" | "reverse-charge" | "innergemeinschaftlich";

type Position = {
  id: string;
  beschreibung: string;
  menge: number;
  einzelpreisNetto: number;
  ustSatz: 0 | 7 | 19;
};

type RechnungsData = {
  sender: {
    name: string;
    strasse: string;
    plzOrt: string;
    steuernummer: string;
    ustId: string;
    iban: string;
    bic: string;
    bank: string;
    email: string;
    telefon: string;
  };
  kunde: {
    name: string;
    strasse: string;
    plzOrt: string;
    land: string;
    ustId: string;
  };
  rechnungsnummer: string;
  rechnungsdatum: string;
  leistungsdatum: string;
  zahlungsziel: number; // Tage
  ustModus: UstModus;
  positionen: Position[];
  freitext: string;
};

const heute = new Date().toISOString().split("T")[0];
const LS_KEY = "ggh-rechnung-v1";

const defaultData: RechnungsData = {
  sender: {
    name: "Max Mustermann Beratung",
    strasse: "Musterstraße 1",
    plzOrt: "20095 Hamburg",
    steuernummer: "12/345/67890",
    ustId: "DE123456789",
    iban: "DE12 3456 7890 1234 5678 90",
    bic: "GENODEF1HH1",
    bank: "Hamburger Sparkasse",
    email: "kontakt@mustermann.de",
    telefon: "+49 40 1234567",
  },
  kunde: {
    name: "Beispiel GmbH",
    strasse: "Kundenstraße 2",
    plzOrt: "10115 Berlin",
    land: "Deutschland",
    ustId: "",
  },
  rechnungsnummer: `RE-${new Date().getFullYear()}-001`,
  rechnungsdatum: heute,
  leistungsdatum: heute,
  zahlungsziel: 14,
  ustModus: "standard",
  positionen: [
    { id: "p1", beschreibung: "Beratungsleistung Marketing-Strategie", menge: 8, einzelpreisNetto: 120, ustSatz: 19 },
  ],
  freitext: "Vielen Dank für Ihren Auftrag!",
};

const RechnungsGenerator = () => {
  const [data, setData] = useState<RechnungsData>(() => {
    if (typeof window === "undefined") return defaultData;
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try { return { ...defaultData, ...JSON.parse(saved) }; } catch { return defaultData; }
    }
    return defaultData;
  });

  // Berechnung
  const berechnung = useMemo(() => {
    const istSteuerfrei = data.ustModus === "kleinunternehmer" || data.ustModus === "reverse-charge" || data.ustModus === "innergemeinschaftlich";
    let nettoSumme = 0;
    const ustSummen: Record<number, number> = { 7: 0, 19: 0 };

    data.positionen.forEach((p) => {
      const positionsNetto = p.menge * p.einzelpreisNetto;
      nettoSumme += positionsNetto;
      if (!istSteuerfrei && p.ustSatz > 0) {
        ustSummen[p.ustSatz] += positionsNetto * (p.ustSatz / 100);
      }
    });

    const ustGesamt = ustSummen[7] + ustSummen[19];
    const brutto = nettoSumme + ustGesamt;
    return { nettoSumme, ustSummen, ustGesamt, brutto, istSteuerfrei };
  }, [data.positionen, data.ustModus]);

  // §14-Pflichtangaben-Check (live)
  const pflichtCheck = useMemo(() => {
    const checks = [
      { label: "Name + Anschrift Sender", ok: !!(data.sender.name && data.sender.strasse && data.sender.plzOrt) },
      { label: "Name + Anschrift Kunde", ok: !!(data.kunde.name && data.kunde.strasse && data.kunde.plzOrt) },
      { label: "Steuernummer oder USt-ID Sender", ok: !!(data.sender.steuernummer || data.sender.ustId) },
      { label: "Rechnungsnummer (fortlaufend, eindeutig)", ok: !!data.rechnungsnummer },
      { label: "Rechnungsdatum", ok: !!data.rechnungsdatum },
      { label: "Leistungs-/Lieferdatum", ok: !!data.leistungsdatum },
      { label: "Menge + Art der Leistung", ok: data.positionen.length > 0 && data.positionen.every((p) => p.beschreibung && p.menge > 0) },
      { label: "Netto-Entgelt + USt-Satz/-Betrag (oder Hinweis)", ok: data.positionen.every((p) => p.einzelpreisNetto > 0) },
      { label: "USt-ID Sender (wenn IGL §6a oder RC §13b)", ok: data.ustModus === "standard" || data.ustModus === "kleinunternehmer" || !!data.sender.ustId },
      { label: "USt-ID Kunde (wenn IGL §6a oder RC §13b)", ok: data.ustModus === "standard" || data.ustModus === "kleinunternehmer" || !!data.kunde.ustId },
    ];
    return { checks, alleOk: checks.every((c) => c.ok), anzahlMissing: checks.filter((c) => !c.ok).length };
  }, [data]);

  const updateSender = (field: keyof RechnungsData["sender"], val: string) =>
    setData((d) => ({ ...d, sender: { ...d.sender, [field]: val } }));
  const updateKunde = (field: keyof RechnungsData["kunde"], val: string) =>
    setData((d) => ({ ...d, kunde: { ...d.kunde, [field]: val } }));
  const updatePosition = (id: string, field: keyof Position, val: string | number) =>
    setData((d) => ({
      ...d,
      positionen: d.positionen.map((p) => (p.id === id ? { ...p, [field]: val } : p)),
    }));
  const addPosition = () => setData((d) => ({
    ...d,
    positionen: [...d.positionen, { id: `p${Date.now()}`, beschreibung: "", menge: 1, einzelpreisNetto: 0, ustSatz: 19 }],
  }));
  const removePosition = (id: string) => setData((d) => ({
    ...d,
    positionen: d.positionen.filter((p) => p.id !== id),
  }));

  const saveLocal = () => {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
    alert("Rechnung lokal gespeichert (Browser-Storage).");
  };

  const loadDefault = () => {
    localStorage.removeItem(LS_KEY);
    setData(defaultData);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.rechnungsnummer || "rechnung"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        setData({ ...defaultData, ...parsed });
        alert("Rechnung aus JSON importiert.");
      } catch {
        alert("Fehler: Datei ist keine gültige Rechnungs-JSON.");
      }
    };
    reader.readAsText(file);
  };

  const generatePdf = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;

    // === Sender (klein, oben rechts) ===
    doc.setFontSize(8);
    doc.setTextColor(100);
    const senderLines = [
      data.sender.name,
      data.sender.strasse,
      data.sender.plzOrt,
      data.sender.email,
      data.sender.telefon,
    ].filter(Boolean);
    senderLines.forEach((l, i) => doc.text(l, W - 20, 20 + i * 4, { align: "right" }));

    // === Adresszeile + Kunde ===
    doc.setFontSize(7);
    doc.setTextColor(120);
    doc.text(`${data.sender.name} · ${data.sender.strasse} · ${data.sender.plzOrt}`, 20, 50);
    doc.setLineWidth(0.1);
    doc.line(20, 51, 100, 51);

    doc.setFontSize(10);
    doc.setTextColor(0);
    const kundeLines = [
      data.kunde.name,
      data.kunde.strasse,
      data.kunde.plzOrt,
      data.kunde.land !== "Deutschland" ? data.kunde.land : "",
    ].filter(Boolean);
    kundeLines.forEach((l, i) => doc.text(l, 20, 58 + i * 5));

    // === Rechnungs-Header ===
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Rechnung", 20, 95);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Rechnungs-Nr.: ${data.rechnungsnummer}`, 20, 103);
    doc.text(`Rechnungsdatum: ${data.rechnungsdatum.split("-").reverse().join(".")}`, 20, 108);
    doc.text(`Leistungs-/Lieferdatum: ${data.leistungsdatum.split("-").reverse().join(".")}`, 20, 113);
    if (data.kunde.ustId) doc.text(`USt-ID Kunde: ${data.kunde.ustId}`, 20, 118);

    // === Positionstabelle ===
    const startY = 130;
    const tableHead = berechnung.istSteuerfrei
      ? [["Pos", "Beschreibung", "Menge", "Einzelpreis", "Gesamt"]]
      : [["Pos", "Beschreibung", "Menge", "Einzelpreis", "USt", "Gesamt netto"]];
    const tableBody = data.positionen.map((p, i) => {
      const positionsNetto = p.menge * p.einzelpreisNetto;
      const baseCols = [
        String(i + 1),
        p.beschreibung,
        p.menge.toLocaleString("de-DE"),
        `${p.einzelpreisNetto.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €`,
      ];
      if (berechnung.istSteuerfrei) {
        baseCols.push(`${positionsNetto.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €`);
      } else {
        baseCols.push(`${p.ustSatz} %`);
        baseCols.push(`${positionsNetto.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €`);
      }
      return baseCols;
    });

    autoTable(doc, {
      startY,
      head: tableHead,
      body: tableBody,
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [44, 62, 80], textColor: 255 },
      theme: "grid",
    });

    // === Summen ===
    // @ts-expect-error jspdf-autotable extends doc
    let y = (doc.lastAutoTable?.finalY || startY + 30) + 8;

    doc.setFontSize(10);
    if (!berechnung.istSteuerfrei) {
      doc.text("Summe netto:", W - 80, y);
      doc.text(`${berechnung.nettoSumme.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €`, W - 20, y, { align: "right" });
      y += 5;
      if (berechnung.ustSummen[19] > 0) {
        doc.text(`zzgl. 19 % USt:`, W - 80, y);
        doc.text(`${berechnung.ustSummen[19].toLocaleString("de-DE", { minimumFractionDigits: 2 })} €`, W - 20, y, { align: "right" });
        y += 5;
      }
      if (berechnung.ustSummen[7] > 0) {
        doc.text(`zzgl. 7 % USt:`, W - 80, y);
        doc.text(`${berechnung.ustSummen[7].toLocaleString("de-DE", { minimumFractionDigits: 2 })} €`, W - 20, y, { align: "right" });
        y += 5;
      }
      doc.setFont("helvetica", "bold");
      doc.text("Rechnungsbetrag (brutto):", W - 80, y);
      doc.text(`${berechnung.brutto.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €`, W - 20, y, { align: "right" });
      doc.setFont("helvetica", "normal");
      y += 10;
    } else {
      doc.setFont("helvetica", "bold");
      doc.text("Rechnungsbetrag:", W - 80, y);
      doc.text(`${berechnung.nettoSumme.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €`, W - 20, y, { align: "right" });
      doc.setFont("helvetica", "normal");
      y += 8;
    }

    // === USt-Hinweis ===
    doc.setFontSize(9);
    doc.setTextColor(80);
    let hinweis = "";
    if (data.ustModus === "kleinunternehmer") {
      hinweis = "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmer-Regelung).";
    } else if (data.ustModus === "reverse-charge") {
      hinweis = "Steuerschuldnerschaft des Leistungsempfängers gemäß § 13b UStG (Reverse Charge).";
    } else if (data.ustModus === "innergemeinschaftlich") {
      hinweis = "Steuerfreie innergemeinschaftliche Lieferung gemäß § 6a UStG.";
    }
    if (hinweis) {
      const splitHinweis = doc.splitTextToSize(hinweis, W - 40);
      doc.text(splitHinweis, 20, y);
      y += splitHinweis.length * 5;
    }

    // === Zahlungsbedingungen ===
    y += 3;
    doc.setFontSize(9);
    doc.setTextColor(0);
    doc.text(
      `Bitte überweisen Sie den Betrag innerhalb von ${data.zahlungsziel} Tagen ab Rechnungsdatum auf folgendes Konto:`,
      20,
      y,
    );
    y += 5;
    doc.setFontSize(8);
    doc.text(`${data.sender.bank} · IBAN: ${data.sender.iban} · BIC: ${data.sender.bic}`, 20, y);

    // === Freitext ===
    if (data.freitext) {
      y += 8;
      doc.setFontSize(9);
      doc.setTextColor(60);
      const splitFreitext = doc.splitTextToSize(data.freitext, W - 40);
      doc.text(splitFreitext, 20, y);
    }

    // === Footer ===
    doc.setFontSize(7);
    doc.setTextColor(120);
    const footerLine = [data.sender.steuernummer && `St-Nr.: ${data.sender.steuernummer}`, data.sender.ustId && `USt-ID: ${data.sender.ustId}`]
      .filter(Boolean).join(" · ");
    doc.text(footerLine, W / 2, 285, { align: "center" });

    doc.save(`${data.rechnungsnummer || "rechnung"}.pdf`);
  };

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Rechnungs-Generator (PDF)"
      subtitle="Erste richtige Rechnung schreiben — §14 UStG-konform, mit 4 USt-Modi (Standard / Kleinunternehmer / Reverse-Charge / innergemeinschaftliche Lieferung), Live-Pflichtangaben-Check und PDF-Download."
    >
      <BeginnerHero />

      {/* === USt-Modus === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-accent-blue" /> 1. Welcher USt-Modus passt?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
          <UstModusCard
            modus="standard"
            current={data.ustModus}
            onSelect={(m) => setData((d) => ({ ...d, ustModus: m }))}
            title="Standard (19 % / 7 %)"
            desc="Regelbesteuert, USt wird ausgewiesen. Default für die meisten Selbstständigen."
          />
          <UstModusCard
            modus="kleinunternehmer"
            current={data.ustModus}
            onSelect={(m) => setData((d) => ({ ...d, ustModus: m }))}
            title="Kleinunternehmer §19 UStG"
            desc="Umsatz < 25k € (2025/2026 nach Reform): keine USt ausweisen, KU-Hinweis pflicht."
          />
          <UstModusCard
            modus="reverse-charge"
            current={data.ustModus}
            onSelect={(m) => setData((d) => ({ ...d, ustModus: m }))}
            title="Reverse Charge §13b"
            desc="B2B-Dienstleistung an EU-Ausland (mit USt-ID): Kunde schuldet USt. Bauleistungen DE auch."
          />
          <UstModusCard
            modus="innergemeinschaftlich"
            current={data.ustModus}
            onSelect={(m) => setData((d) => ({ ...d, ustModus: m }))}
            title="Innergemeinsch. Lieferung §6a"
            desc="WAREN-Lieferung B2B in EU-Ausland (mit USt-ID): steuerfrei + USt-ID-Pflicht."
          />
        </div>
      </div>

      {/* === Sender === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-4">
        <h3 className="font-bold text-sm mb-3">2. Dein Unternehmen (Sender)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Field label="Name / Firmierung" value={data.sender.name} onChange={(v) => updateSender("name", v)} />
          <Field label="Straße + Nr." value={data.sender.strasse} onChange={(v) => updateSender("strasse", v)} />
          <Field label="PLZ + Ort" value={data.sender.plzOrt} onChange={(v) => updateSender("plzOrt", v)} />
          <Field label="Email" value={data.sender.email} onChange={(v) => updateSender("email", v)} />
          <Field label="Telefon" value={data.sender.telefon} onChange={(v) => updateSender("telefon", v)} />
          <Field label="Steuernummer (FA)" value={data.sender.steuernummer} onChange={(v) => updateSender("steuernummer", v)} hint="Format: 12/345/67890" />
          <Field label="USt-ID (DE...)" value={data.sender.ustId} onChange={(v) => updateSender("ustId", v)} hint="Bei EU-Geschäft Pflicht" />
          <Field label="Bank" value={data.sender.bank} onChange={(v) => updateSender("bank", v)} />
          <Field label="IBAN" value={data.sender.iban} onChange={(v) => updateSender("iban", v)} />
          <Field label="BIC" value={data.sender.bic} onChange={(v) => updateSender("bic", v)} />
        </div>
      </div>

      {/* === Kunde === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-4">
        <h3 className="font-bold text-sm mb-3">3. Kunde (Rechnungsempfänger)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Field label="Name / Firmierung" value={data.kunde.name} onChange={(v) => updateKunde("name", v)} />
          <Field label="Straße + Nr." value={data.kunde.strasse} onChange={(v) => updateKunde("strasse", v)} />
          <Field label="PLZ + Ort" value={data.kunde.plzOrt} onChange={(v) => updateKunde("plzOrt", v)} />
          <Field label="Land" value={data.kunde.land} onChange={(v) => updateKunde("land", v)} />
          <Field label="USt-ID Kunde" value={data.kunde.ustId} onChange={(v) => updateKunde("ustId", v)}
            hint={data.ustModus === "reverse-charge" || data.ustModus === "innergemeinschaftlich" ? "⚠ PFLICHT bei §13b / §6a" : "optional"} />
        </div>
      </div>

      {/* === Metadaten === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-4">
        <h3 className="font-bold text-sm mb-3">4. Rechnungs-Metadaten</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <Field label="Rechnungs-Nr." value={data.rechnungsnummer} onChange={(v) => setData((d) => ({ ...d, rechnungsnummer: v }))} hint="fortlaufend, lückenlos" />
          <Field label="Rechnungsdatum" type="date" value={data.rechnungsdatum} onChange={(v) => setData((d) => ({ ...d, rechnungsdatum: v }))} />
          <Field label="Leistungsdatum" type="date" value={data.leistungsdatum} onChange={(v) => setData((d) => ({ ...d, leistungsdatum: v }))} />
          <Field label="Zahlungsziel (Tage)" type="number" value={String(data.zahlungsziel)} onChange={(v) => setData((d) => ({ ...d, zahlungsziel: Number(v) || 14 }))} />
        </div>
      </div>

      {/* === Positionen === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm">5. Positionen</h3>
          <Button onClick={addPosition} size="sm" variant="outline" className="text-xs">
            <Plus className="h-3 w-3 mr-1" /> Position hinzufügen
          </Button>
        </div>
        <div className="space-y-2">
          {data.positionen.map((p, idx) => (
            <div key={p.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start rounded-lg bg-secondary/30 p-2">
              <div className="md:col-span-1 text-xs text-muted-foreground pt-2">#{idx + 1}</div>
              <div className="md:col-span-5">
                <Input value={p.beschreibung} onChange={(e) => updatePosition(p.id, "beschreibung", e.target.value)} placeholder="Beschreibung (z.B. Beratung 1h Marketing)" className="h-9" />
              </div>
              <div className="md:col-span-1">
                <Input type="number" step="0.5" value={p.menge} onChange={(e) => updatePosition(p.id, "menge", Number(e.target.value) || 0)} placeholder="Menge" className="h-9" />
              </div>
              <div className="md:col-span-2">
                <Input type="number" step="0.01" value={p.einzelpreisNetto} onChange={(e) => updatePosition(p.id, "einzelpreisNetto", Number(e.target.value) || 0)} placeholder="Einzelpreis netto" className="h-9" />
              </div>
              <div className="md:col-span-2">
                <select value={p.ustSatz} onChange={(e) => updatePosition(p.id, "ustSatz", Number(e.target.value))} className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm" disabled={berechnung.istSteuerfrei}>
                  <option value={19}>19 % USt</option>
                  <option value={7}>7 % USt</option>
                  <option value={0}>0 % / steuerfrei</option>
                </select>
              </div>
              <div className="md:col-span-1 flex justify-end pt-1">
                <Button onClick={() => removePosition(p.id)} size="sm" variant="ghost" className="h-9 w-9 p-0 text-red-700" disabled={data.positionen.length === 1}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === Freitext === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-4">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">6. Freitext (z.B. Dankeschön, Hinweis)</Label>
        <textarea value={data.freitext} onChange={(e) => setData((d) => ({ ...d, freitext: e.target.value }))} className="mt-1 w-full rounded-md border border-input bg-background p-2 text-sm" rows={2} />
      </div>

      {/* === Summen-Hero === */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card p-5 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Rechnungssumme</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Netto:</span><span className="font-mono">{berechnung.nettoSumme.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span></div>
              {!berechnung.istSteuerfrei && berechnung.ustSummen[19] > 0 && (
                <div className="flex justify-between"><span>+ 19 % USt:</span><span className="font-mono">{berechnung.ustSummen[19].toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span></div>
              )}
              {!berechnung.istSteuerfrei && berechnung.ustSummen[7] > 0 && (
                <div className="flex justify-between"><span>+ 7 % USt:</span><span className="font-mono">{berechnung.ustSummen[7].toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span></div>
              )}
              <div className="flex justify-between border-t pt-1 font-bold text-base">
                <span>{berechnung.istSteuerfrei ? "Rechnungsbetrag:" : "Brutto:"}</span>
                <span className="font-mono text-emerald-700">{berechnung.brutto.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              §14 UStG-Pflichtangaben: {pflichtCheck.alleOk ? "✅ vollständig" : `⚠ ${pflichtCheck.anzahlMissing} fehlen`}
            </div>
            <div className="space-y-0.5 text-[11px] max-h-32 overflow-y-auto">
              {pflichtCheck.checks.map((c) => (
                <div key={c.label} className="flex items-start gap-1">
                  {c.ok
                    ? <CheckCircle2 className="h-3 w-3 text-emerald-600 mt-0.5 shrink-0" />
                    : <AlertCircle className="h-3 w-3 text-red-600 mt-0.5 shrink-0" />}
                  <span className={c.ok ? "text-muted-foreground" : "text-red-700"}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === Action-Buttons === */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button onClick={generatePdf} className="bg-emerald-700 hover:bg-emerald-800 text-white" disabled={!pflichtCheck.alleOk}>
          <FileDown className="h-4 w-4 mr-2" /> PDF herunterladen
        </Button>
        <Button onClick={saveLocal} variant="outline">
          <Save className="h-4 w-4 mr-2" /> Lokal speichern
        </Button>
        <Button onClick={exportJson} variant="outline">
          <FileText className="h-4 w-4 mr-2" /> Als JSON exportieren
        </Button>
        <label className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm cursor-pointer hover:bg-secondary/40">
          <Upload className="h-4 w-4" /> JSON importieren
          <input type="file" accept=".json" onChange={importJson} className="hidden" />
        </label>
        <Button onClick={loadDefault} variant="ghost">Reset</Button>
      </div>

      {/* === Cross-Links === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        <Link to="/cockpit/schwellen-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">← Schwellen-Check (Tool 3)</div>
          <div className="text-muted-foreground">Kleinunternehmer-Grenze 25k/100k</div>
        </Link>
        <Link to="/cockpit/ust-rechner" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">USt-Rechner →</div>
          <div className="text-muted-foreground">Komplexe USt-Fälle (RC, IGL, OSS)</div>
        </Link>
        <Link to="/cockpit/quartals-steuer" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Quartals-Steuerschätzung →</div>
          <div className="text-muted-foreground">Wann musst du USt-VA abgeben?</div>
        </Link>
      </div>

      <Glossar />
      <Stand2026Footer
        sources={[
          { label: "§14 UStG (Rechnungspflichtangaben)", url: "https://www.gesetze-im-internet.de/ustg_1980/__14.html" },
          { label: "§19 UStG (Kleinunternehmer)", url: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
          { label: "§13b UStG (Reverse Charge)", url: "https://www.gesetze-im-internet.de/ustg_1980/__13b.html" },
          { label: "§6a UStG (Innergemeinschaftliche Lieferung)", url: "https://www.gesetze-im-internet.de/ustg_1980/__6a.html" },
          { label: "BMF-Schreiben E-Rechnung 2025/2026", url: "https://www.bundesfinanzministerium.de" },
        ]}
        note="Hinweis E-Rechnung ab 2025: B2B-Rechnungen >250€ müssen ab 01.01.2025 als strukturierte E-Rechnung (XRechnung/ZUGFeRD) empfangbar sein. Versand-Pflicht stufenweise bis 2028. Dieses Tool erzeugt PDF/A — für vollwertige E-Rechnung (XML+PDF) lexoffice/sevdesk nötig. Rechnungsnummer muss fortlaufend + eindeutig sein (eine Lücke = Erklärung gegenüber FA)."
      />
    </CockpitShell>
  );
};

// ============================================================================
// Sub-Components
// ============================================================================
const BeginnerHero = () => (
  <div className="rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-card to-card p-5 mb-6">
    <div className="flex items-start gap-3">
      <Lightbulb className="h-6 w-6 text-purple-700 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-bold text-sm mb-1">Erste richtige Rechnung schreiben</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          Eine Rechnung muss <strong>10 Pflichtangaben nach §14 UStG</strong> enthalten — sonst ist sie für den Kunden
          nicht zum Vorsteuerabzug berechtigt (Kunde verärgert) und du musst nachbessern. Dieses Tool prüft alle
          Pflichten LIVE während du tippst und gibt dir am Ende eine §14-konforme PDF zum Download.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
          <div className="rounded-lg bg-emerald-500/5 p-2 border border-emerald-500/20">
            <strong className="text-emerald-700">Standard</strong>
            <div className="text-muted-foreground mt-0.5">19/7 % USt für die meisten</div>
          </div>
          <div className="rounded-lg bg-blue-500/5 p-2 border border-blue-500/20">
            <strong className="text-blue-700">§19 KU</strong>
            <div className="text-muted-foreground mt-0.5">{"<"}25k € Umsatz, keine USt</div>
          </div>
          <div className="rounded-lg bg-amber-500/5 p-2 border border-amber-500/20">
            <strong className="text-amber-700">§13b RC</strong>
            <div className="text-muted-foreground mt-0.5">B2B EU-Dienstleistung</div>
          </div>
          <div className="rounded-lg bg-purple-500/5 p-2 border border-purple-500/20">
            <strong className="text-purple-700">§6a IGL</strong>
            <div className="text-muted-foreground mt-0.5">Waren B2B EU steuerfrei</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UstModusCard = ({ modus, current, onSelect, title, desc }: {
  modus: UstModus; current: UstModus; onSelect: (m: UstModus) => void; title: string; desc: string;
}) => {
  const active = modus === current;
  return (
    <button
      onClick={() => onSelect(modus)}
      className={`text-left rounded-xl border-2 p-3 transition ${
        active ? "border-accent-blue bg-accent-blue/10" : "border-border bg-card hover:border-accent-blue/40"
      }`}
    >
      <div className="font-semibold text-xs mb-1">{title}</div>
      <div className="text-[11px] text-muted-foreground">{desc}</div>
    </button>
  );
};

const Field = ({ label, value, onChange, type = "text", hint }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; hint?: string;
}) => (
  <div>
    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</Label>
    <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="h-9 mt-1" />
    {hint && <div className="text-[10px] text-muted-foreground mt-0.5">{hint}</div>}
  </div>
);

const Glossar = () => (
  <details className="rounded-2xl border border-border bg-card p-5 mb-6">
    <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-accent-blue" /> Glossar — Begriffe einfach erklärt
    </summary>
    <div className="mt-3 space-y-3 text-xs leading-relaxed">
      {[
        { b: "§14 UStG Pflichtangaben", e: "10 Pflichtfelder: 1) voller Name+Anschrift Sender, 2) voller Name+Anschrift Empfänger, 3) Steuernummer ODER USt-ID Sender, 4) Ausstellungsdatum, 5) eindeutige fortlaufende Rechnungsnummer, 6) Menge+Art Leistung, 7) Leistungs-/Lieferdatum, 8) Netto-Entgelt aufgeschlüsselt nach Steuersätzen, 9) USt-Satz+Betrag (oder Hinweis auf Steuerbefreiung), 10) ggf. Hinweis auf Aufbewahrungspflicht bei Bauleistungen. Fehlt eines davon: Kunde verliert Vorsteuerabzug." },
        { b: "Rechnungsnummer fortlaufend", e: "Muss LÜCKENLOS und EINDEUTIG sein. Format frei wählbar (RE-2026-001, 26-001, 0001 etc.). Verschiedene Nummernkreise pro Bereich (z.B. RE-WEB / RE-COACH) sind erlaubt, aber innerhalb des Kreises lückenlos. Lücke = FA stellt Frage 'wo ist Nr. 0042?'" },
        { b: "Kleinunternehmer §19 UStG", e: "Wenn dein Vorjahres-Umsatz <25k € UND prognostiziert <100k € (Reform 2025): KEINE USt ausweisen, KU-Hinweis Pflicht. Du kannst aber auch optieren auf Regelbesteuerung (sinnvoll wenn du B2B verkaufst und VS-Abzug brauchst). Bindung 5 Jahre." },
        { b: "Reverse Charge §13b UStG", e: "Bei B2B-Dienstleistung an EU-Ausland (mit USt-ID): du stellst Rechnung OHNE USt aus, Kunde schuldet USt in seinem Land. Pflicht-Hinweis 'Steuerschuldnerschaft des Leistungsempfängers'. USt-ID beider Parteien zwingend. Auch bei Bauleistungen in DE (B2B)." },
        { b: "Innergemeinschaftliche Lieferung §6a", e: "WAREN-Lieferung B2B EU-Ausland: steuerfrei wenn Käufer mit gültiger USt-ID UND Beleg-/Buchnachweis (z.B. Gelangensbestätigung). Pflicht-Hinweis 'Steuerfreie innergemeinschaftliche Lieferung'. Meldung in ZM (Zusammenfassende Meldung) Pflicht. Achtung: ab 01.07.2021 IOSS für B2C." },
        { b: "USt-ID vs Steuernummer", e: "Steuernummer (Format: 12/345/67890): vom Wohnsitz-FA für ESt. USt-ID (DE+9 Ziffern): vom Bundeszentralamt für Steuern (BZSt), gratis online beantragen. Pflicht für EU-Geschäft. Auf Rechnung reicht EINE der beiden (Steuernummer ODER USt-ID), bei EU-Geschäft IMMER USt-ID." },
        { b: "E-Rechnung 2025/2026", e: "Ab 01.01.2025: B2B-Rechnungen >250€ müssen als strukturierte E-Rechnung (XRechnung XML oder ZUGFeRD-PDF) EMPFANGBAR sein (= Email-Postfach reicht). Versand-Pflicht stufenweise bis 2028. PDF allein reicht ÜBERGANGS-weise bis 31.12.2026 (mit Empfänger-Zustimmung). Für vollwertige E-Rechnung brauchst du lexoffice/sevdesk/StB." },
        { b: "Zahlungsziel", e: "Standard 14 Tage. Rechtlich keine Vorgabe — du kannst auch 7, 30, 60 Tage. Bei Verzug (nach Mahnung): 9 Prozentpunkte über Basiszinssatz bei Verbrauchern, 8 PP bei B2B (§288 BGB). Skonto-Option möglich (z.B. 2 % bei Zahlung innerhalb 7 Tage)." },
      ].map((g) => (
        <div key={g.b} className="rounded-lg bg-secondary/30 p-3">
          <div className="font-semibold text-foreground mb-1">{g.b}</div>
          <div className="text-muted-foreground">{g.e}</div>
        </div>
      ))}
    </div>
  </details>
);

export default RechnungsGenerator;
