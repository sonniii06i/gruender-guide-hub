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
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Callout, Field, ResultPanel, ResultRow, ToneBadge, ToolLayout, ToolSection, selectCls } from "@/components/cockpit/kit";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  FileDown,
  Upload,
  Trash2,
  Plus,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
  ImagePlus,
  ListChecks,
  MessageSquareText,
  Percent,
  Rows3,
  UserRound,
  X,
} from "lucide-react";
import jsPDF from "jspdf";
import { baueXRechnung, xrFehlend, type XrDaten } from "@/lib/xrechnung";
import autoTable from "jspdf-autotable";

type UstModus = "standard" | "kleinunternehmer" | "reverse-charge" | "innergemeinschaftlich";

type Position = {
  id: string;
  beschreibung: string;
  menge: number;
  einzelpreisNetto: number;
  ustSatz: 0 | 7 | 19;
};

type SenderData = {
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
  /** Ansprechpartner – Pflicht in der XRechnung (BR-DE-5). */
  kontaktName: string;
  logoDataUrl: string | null;
};

type RechnungsData = {
  sender: SenderData;
  kunde: {
    name: string;
    strasse: string;
    plzOrt: string;
    land: string;
    ustId: string;
    /** Elektronische Adresse des Kunden – Pflicht in der XRechnung. */
    email: string;
  };
  /** Käufer-Referenz / Bestellnummer / Leitweg-ID (BT-10). */
  kaeuferReferenz: string;
  rechnungsnummer: string;
  rechnungsdatum: string;
  leistungsdatum: string;
  zahlungsziel: number; // Tage
  ustModus: UstModus;
  positionen: Position[];
  freitext: string;
};

const heute = () => new Date().toISOString().split("T")[0];
const LS_COMPANY_KEY = "ggh-rechnung-company-v2";
const LOGO_MAX_BYTES = 250_000; // 250 KB Original-Datei (base64 inflate ≈ +33 %)

const emptySender: SenderData = {
  name: "", strasse: "", plzOrt: "",
  steuernummer: "", ustId: "",
  iban: "", bic: "", bank: "",
  email: "", telefon: "", kontaktName: "",
  logoDataUrl: null,
};

const emptyInvoice = (): Omit<RechnungsData, "sender"> => ({
  kunde: { name: "", strasse: "", plzOrt: "", land: "Deutschland", ustId: "", email: "" },
  kaeuferReferenz: "",
  rechnungsnummer: `RE-${new Date().getFullYear()}-001`,
  rechnungsdatum: heute(),
  leistungsdatum: heute(),
  zahlungsziel: 14,
  ustModus: "standard",
  positionen: [{ id: "p1", beschreibung: "", menge: 1, einzelpreisNetto: 0, ustSatz: 19 }],
  freitext: "",
});

const RechnungsGenerator = () => {
  const [data, setData] = useState<RechnungsData>(() => {
    const base: RechnungsData = { sender: emptySender, ...emptyInvoice() };
    if (typeof window === "undefined") return base;
    const savedCompany = localStorage.getItem(LS_COMPANY_KEY);
    if (savedCompany) {
      try {
        const sender = JSON.parse(savedCompany) as Partial<SenderData>;
        return { ...base, sender: { ...emptySender, ...sender } };
      } catch { /* fall through */ }
    }
    return base;
  });

  // Sender-Daten (Firmenprofil + Logo) auto-persistieren — Vorlage liegt
  // direkt fürs nächste Mal im Browser, ohne expliziten "Speichern"-Klick.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(LS_COMPANY_KEY, JSON.stringify(data.sender));
    } catch (e) {
      console.warn("Firmen-Profil konnte nicht gespeichert werden:", e);
    }
  }, [data.sender]);

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

  const updateSender = (field: keyof SenderData, val: string | null) =>
    setData((d) => ({ ...d, sender: { ...d.sender, [field]: val } }));
  const updateKunde = (field: keyof RechnungsData["kunde"], val: string) =>
    setData((d) => ({ ...d, kunde: { ...d.kunde, [field]: val } }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // Reset, damit dasselbe File nochmal gewählt werden kann
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Bitte ein Bild (PNG/JPEG) auswählen.");
      return;
    }
    if (file.size > LOGO_MAX_BYTES) {
      alert(`Logo zu groß (${Math.round(file.size / 1024)} KB) — max ${Math.round(LOGO_MAX_BYTES / 1024)} KB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (typeof dataUrl === "string") updateSender("logoDataUrl", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => updateSender("logoDataUrl", null);
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

  // Reset = neue, leere Rechnung. Firmenprofil (sender + logo) bleibt erhalten.
  const resetInvoice = () => {
    if (!confirm("Alle Rechnungsfelder leeren? Deine Firmen-Daten (Sender, Logo, Bank) bleiben gespeichert.")) return;
    setData((d) => ({ ...emptyInvoice(), sender: d.sender }));
  };

  // JSON-Export/Import: für Backup einer einzelnen Rechnung ODER zum
  // Teilen einer Vorlage zwischen Geräten (z.B. Laptop ↔ Desktop).
  // Sender wird mit-exportiert; beim Import überschreibt importierter
  // Sender den aktuellen — Firmen-Profil wird also mit-übertragen.
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
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as Partial<RechnungsData>;
        setData((d) => ({
          ...d,
          ...parsed,
          sender: { ...emptySender, ...d.sender, ...(parsed.sender ?? {}) },
          kunde: { ...d.kunde, ...(parsed.kunde ?? {}) },
        }));
        alert("Rechnung aus JSON importiert.");
      } catch {
        alert("Fehler: Datei ist keine gültige Rechnungs-JSON.");
      }
    };
    reader.readAsText(file);
  };

  const xrDaten = (): XrDaten => ({
    verkaeufer: { ...data.sender, kontaktName: data.sender.kontaktName ?? "" },
    kunde: { ...data.kunde, email: data.kunde.email ?? "" },
    kaeuferReferenz: data.kaeuferReferenz ?? "",
    rechnungsnummer: data.rechnungsnummer,
    rechnungsdatum: data.rechnungsdatum,
    leistungsdatum: data.leistungsdatum,
    zahlungsziel: data.zahlungsziel,
    modus: data.ustModus,
    positionen: data.positionen,
    freitext: data.freitext,
  });
  const xrFehlt = xrFehlend(xrDaten());
  const xrechnungHerunterladen = () => {
    const blob = new Blob([baueXRechnung(xrDaten())], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(data.rechnungsnummer || "rechnung").replace(/[^a-z0-9-]+/gi, "-")}-xrechnung.xml`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const generatePdf = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    const H = 297;

    // === Logo (top-left, optional) ===
    if (data.sender.logoDataUrl) {
      try {
        const fmt = data.sender.logoDataUrl.startsWith("data:image/png") ? "PNG"
          : data.sender.logoDataUrl.startsWith("data:image/webp") ? "WEBP" : "JPEG";
        // Max 30 mm breit × 18 mm hoch — jsPDF erhält Seitenverhältnis nicht
        // automatisch, daher Box anpassen. Falls Logo schmal: passt; falls
        // hoch: wird gestaucht. Akzeptable Trade-off für simples MVP.
        doc.addImage(data.sender.logoDataUrl, fmt, 20, 14, 30, 18);
      } catch (e) {
        console.warn("Logo konnte nicht eingebettet werden:", e);
      }
    }

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

    // === Footer (Firmen-Stammdaten am Seitenende) ===
    // 4 Zeilen: Adresse | Kontakt | Bank | Steuer-IDs. Beginnt 16 mm überm
    // unteren Rand → endet bei ~H-4mm. Leere Zeilen werden übersprungen.
    doc.setFontSize(7);
    doc.setTextColor(120);
    doc.setLineWidth(0.1);
    doc.setDrawColor(180);
    const footerLines = [
      [data.sender.name, data.sender.strasse, data.sender.plzOrt].filter(Boolean).join(" · "),
      [data.sender.email, data.sender.telefon].filter(Boolean).join(" · "),
      [
        data.sender.bank,
        data.sender.iban && `IBAN: ${data.sender.iban}`,
        data.sender.bic && `BIC: ${data.sender.bic}`,
      ].filter(Boolean).join(" · "),
      [
        data.sender.steuernummer && `St-Nr.: ${data.sender.steuernummer}`,
        data.sender.ustId && `USt-ID: ${data.sender.ustId}`,
      ].filter(Boolean).join(" · "),
    ].filter((l) => l.length > 0);
    const footerStartY = H - 4 - (footerLines.length - 1) * 3.5;
    doc.line(20, footerStartY - 3, W - 20, footerStartY - 3);
    footerLines.forEach((line, i) => {
      doc.text(line, W / 2, footerStartY + i * 3.5, { align: "center" });
    });

    doc.save(`${data.rechnungsnummer || "rechnung"}.pdf`);
  };

  const eur2 = (n: number) => `${n.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €`;
  const pflichtUstId = data.ustModus === "reverse-charge" || data.ustModus === "innergemeinschaftlich";

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Rechnungs-Generator (PDF)"
      subtitle="Deine erste richtige Rechnung, §14 UStG-konform: vier USt-Modi (Standard, Kleinunternehmer, Reverse Charge, innergemeinschaftliche Lieferung), Live-Check der Pflichtangaben und PDF-Download."
    >
      <BeginnerHero />

      <ToolLayout
        className="mb-8"
        inputs={
          <>
            {/* === USt-Modus === */}
            <ToolSection title="Welcher USt-Modus passt?" icon={Percent}>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
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
            </ToolSection>

            {/* === Sender === */}
            <ToolSection
              title="Dein Unternehmen"
              icon={Building2}
              description={'Einmal eingeben: wird automatisch im Browser gespeichert und für jede weitere Rechnung wiederverwendet. „Neue Rechnung" lässt dieses Profil stehen.'}
            >
              {/* Logo-Upload */}
              <div className="mb-5 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-secondary/40 p-3.5">
                {data.sender.logoDataUrl ? (
                  <img src={data.sender.logoDataUrl} alt="Firmen-Logo" className="h-14 w-auto max-w-[120px] rounded-lg border border-border bg-white object-contain" />
                ) : (
                  <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed sm:w-[120px] border-border bg-card text-xs text-muted-foreground">
                    Kein Logo
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Firmen-Logo (optional)</p>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    <label className="inline-flex h-9 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md border border-input bg-card px-3 text-sm font-medium shadow-[0_1px_2px_hsl(var(--primary)/0.05)] transition-colors hover:bg-secondary focus-within:ring-2 focus-within:ring-ring">
                      <ImagePlus className="h-4 w-4" aria-hidden="true" /> {data.sender.logoDataUrl ? "Logo ersetzen" : "Logo hochladen"}
                      <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleLogoUpload} className="sr-only" />
                    </label>
                    {data.sender.logoDataUrl && (
                      <Button onClick={removeLogo} size="sm" variant="ghost" className="text-danger hover:text-danger">
                        <X aria-hidden="true" /> Entfernen
                      </Button>
                    )}
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">PNG oder JPEG, max. 250 KB. Erscheint oben links auf der PDF.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextFeld id="s-name" label="Name / Firmierung" value={data.sender.name} onChange={(v) => updateSender("name", v)} />
                <TextFeld id="s-strasse" label="Straße + Nr." value={data.sender.strasse} onChange={(v) => updateSender("strasse", v)} />
                <TextFeld id="s-plz" label="PLZ + Ort" value={data.sender.plzOrt} onChange={(v) => updateSender("plzOrt", v)} />
                <TextFeld id="s-email" label="E-Mail" value={data.sender.email} onChange={(v) => updateSender("email", v)} />
                <TextFeld id="s-tel" label="Telefon" value={data.sender.telefon} onChange={(v) => updateSender("telefon", v)} />
                <TextFeld id="s-kontakt" label="Ansprechpartner" value={data.sender.kontaktName} onChange={(v) => updateSender("kontaktName", v)} hint="Für die E-Rechnung" />
                <TextFeld id="s-stnr" label="Steuernummer (FA)" value={data.sender.steuernummer} onChange={(v) => updateSender("steuernummer", v)} hint="Format: 12/345/67890" />
                <TextFeld id="s-ustid" label="USt-ID (DE…)" value={data.sender.ustId} onChange={(v) => updateSender("ustId", v)} hint="Bei EU-Geschäft Pflicht" />
                <TextFeld id="s-bank" label="Bank" value={data.sender.bank} onChange={(v) => updateSender("bank", v)} />
                <TextFeld id="s-iban" label="IBAN" value={data.sender.iban} onChange={(v) => updateSender("iban", v)} />
                <TextFeld id="s-bic" label="BIC" value={data.sender.bic} onChange={(v) => updateSender("bic", v)} />
              </div>
            </ToolSection>

            {/* === Kunde === */}
            <ToolSection title="Kunde" description="Rechnungsempfänger" icon={UserRound}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextFeld id="k-name" label="Name / Firmierung" value={data.kunde.name} onChange={(v) => updateKunde("name", v)} />
                <TextFeld id="k-strasse" label="Straße + Nr." value={data.kunde.strasse} onChange={(v) => updateKunde("strasse", v)} />
                <TextFeld id="k-plz" label="PLZ + Ort" value={data.kunde.plzOrt} onChange={(v) => updateKunde("plzOrt", v)} />
                <TextFeld id="k-land" label="Land" value={data.kunde.land} onChange={(v) => updateKunde("land", v)} />
                <TextFeld
                  id="k-ustid"
                  label="USt-ID Kunde"
                  value={data.kunde.ustId}
                  onChange={(v) => updateKunde("ustId", v)}
                  hint={pflichtUstId ? <span className="font-medium text-warning">PFLICHT bei §13b / §6a</span> : "Optional"}
                />
                <TextFeld id="k-email" label="E-Mail Kunde (Rechnungsempfang)" value={data.kunde.email} onChange={(v) => updateKunde("email", v)} hint="Für die E-Rechnung" />
                <TextFeld
                  id="k-ref"
                  className="sm:col-span-2"
                  label="Bestell-Nr. / Käufer-Referenz"
                  value={data.kaeuferReferenz}
                  onChange={(v) => setData((d) => ({ ...d, kaeuferReferenz: v }))}
                  hint="Bei Behörden: Leitweg-ID"
                />
              </div>
            </ToolSection>

            {/* === Metadaten === */}
            <ToolSection title="Rechnungsdaten" icon={CalendarDays}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextFeld id="m-nr" label="Rechnungs-Nr." value={data.rechnungsnummer} onChange={(v) => setData((d) => ({ ...d, rechnungsnummer: v }))} hint="Fortlaufend und lückenlos" />
                <TextFeld id="m-ziel" label="Zahlungsziel (Tage)" type="number" value={String(data.zahlungsziel)} onChange={(v) => setData((d) => ({ ...d, zahlungsziel: Number(v) || 14 }))} />
                <TextFeld id="m-datum" label="Rechnungsdatum" type="date" value={data.rechnungsdatum} onChange={(v) => setData((d) => ({ ...d, rechnungsdatum: v }))} />
                <TextFeld id="m-leistung" label="Leistungsdatum" type="date" value={data.leistungsdatum} onChange={(v) => setData((d) => ({ ...d, leistungsdatum: v }))} />
              </div>
            </ToolSection>

            {/* === Positionen === */}
            <ToolSection
              title="Positionen"
              icon={Rows3}
              actions={
                <Button onClick={addPosition} size="sm" variant="outline">
                  <Plus aria-hidden="true" /> Position hinzufügen
                </Button>
              }
            >
              <div className="space-y-3">
                {data.positionen.map((p, idx) => (
                  <div key={p.id} className="rounded-xl border border-border bg-secondary/30 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold">
                        Position <span className="tabular">{idx + 1}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold tabular">{eur2(p.menge * p.einzelpreisNetto)}</span>
                        <Button
                          onClick={() => removePosition(p.id)}
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-danger hover:text-danger"
                          disabled={data.positionen.length === 1}
                          aria-label={`Position ${idx + 1} entfernen`}
                        >
                          <Trash2 aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,1.2fr)]">
                      <Field label="Artikel / Dienstleistung" htmlFor={`${p.id}-beschr`} className="col-span-2 sm:col-span-3">
                        <Input id={`${p.id}-beschr`} value={p.beschreibung} onChange={(e) => updatePosition(p.id, "beschreibung", e.target.value)} placeholder="z.B. Beratung Marketing-Strategie" />
                      </Field>
                      <Field label="Menge" htmlFor={`${p.id}-menge`}>
                        <Input id={`${p.id}-menge`} type="number" step="0.5" value={p.menge} onChange={(e) => updatePosition(p.id, "menge", Number(e.target.value) || 0)} placeholder="Menge" className="tabular" />
                      </Field>
                      <Field label="Preis netto / Einheit" htmlFor={`${p.id}-preis`}>
                        <Input id={`${p.id}-preis`} type="number" step="0.01" value={p.einzelpreisNetto} onChange={(e) => updatePosition(p.id, "einzelpreisNetto", Number(e.target.value) || 0)} placeholder="Einzelpreis netto" className="tabular" />
                      </Field>
                      <Field label="Umsatzsteuer" htmlFor={`${p.id}-ust`} className="col-span-2 sm:col-span-1">
                        <select id={`${p.id}-ust`} value={p.ustSatz} onChange={(e) => updatePosition(p.id, "ustSatz", Number(e.target.value))} className={selectCls} disabled={berechnung.istSteuerfrei}>
                          <option value={19}>19 % USt</option>
                          <option value={7}>7 % USt</option>
                          <option value={0}>0 % / steuerfrei</option>
                        </select>
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </ToolSection>

            {/* === Freitext === */}
            <ToolSection title="Freitext" icon={MessageSquareText} description="Optional, z. B. ein Dankeschön oder ein Hinweis.">
              <Textarea
                aria-label="Freitext"
                value={data.freitext}
                onChange={(e) => setData((d) => ({ ...d, freitext: e.target.value }))}
                rows={3}
              />
            </ToolSection>
          </>
        }
        result={
          <>
            {/* === Summen === */}
            <ResultPanel
              variant="ink"
              kicker="Rechnungssumme"
              title={berechnung.istSteuerfrei ? "Rechnungsbetrag" : "Brutto"}
              value={eur2(berechnung.brutto)}
              valueHint={berechnung.istSteuerfrei ? "Ohne Umsatzsteuer-Ausweis" : "Inklusive Umsatzsteuer"}
            >
              <div className="divide-y divide-white/10 border-t border-white/10">
                <ResultRow label="Netto" value={eur2(berechnung.nettoSumme)} />
                {!berechnung.istSteuerfrei && berechnung.ustSummen[19] > 0 && (
                  <ResultRow label="+ 19 % USt" value={eur2(berechnung.ustSummen[19])} />
                )}
                {!berechnung.istSteuerfrei && berechnung.ustSummen[7] > 0 && (
                  <ResultRow label="+ 7 % USt" value={eur2(berechnung.ustSummen[7])} />
                )}
              </div>
            </ResultPanel>

            {/* === Pflichtangaben === */}
            <ToolSection
              title="§14 UStG-Pflichtangaben"
              icon={ListChecks}
              actions={
                pflichtCheck.alleOk ? (
                  <ToneBadge tone="success">Vollständig</ToneBadge>
                ) : (
                  <ToneBadge tone="warning">
                    <span className="tabular">{pflichtCheck.anzahlMissing}</span> fehlen
                  </ToneBadge>
                )
              }
              bodyClassName="p-4 md:p-5"
            >
              <ul className="space-y-1.5 text-sm">
                {pflichtCheck.checks.map((c) => (
                  <li key={c.label} className="flex items-start gap-2">
                    {c.ok ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-label="erfüllt" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-label="fehlt" />
                    )}
                    <span className={c.ok ? "text-muted-foreground" : "text-foreground"}>{c.label}</span>
                  </li>
                ))}
              </ul>
            </ToolSection>

            {/* === Aktionen === */}
            <div className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-card md:p-5">
              <Button onClick={generatePdf} size="lg" className="w-full bg-gradient-primary" disabled={!pflichtCheck.alleOk}>
                <FileDown aria-hidden="true" /> PDF herunterladen
              </Button>
              <Button
                onClick={xrechnungHerunterladen}
                variant="outline"
                className="w-full"
                disabled={!pflichtCheck.alleOk || xrFehlt.length > 0}
                title={xrFehlt.length ? `Es fehlt: ${xrFehlt.join(", ")}` : "XRechnung 3.0 (CII) herunterladen"}
              >
                <FileText aria-hidden="true" /> E-Rechnung (XRechnung-XML)
              </Button>
              {!pflichtCheck.alleOk && (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Die Downloads werden aktiv, sobald alle Pflichtangaben ausgefüllt sind.
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 border-t border-border/70 pt-3">
                <Button onClick={resetInvoice} variant="outline" size="sm">
                  <Trash2 aria-hidden="true" /> Neue Rechnung (Felder leeren)
                </Button>
                <Button onClick={exportJson} variant="ghost" size="sm" title="Komplette Rechnung als JSON-Datei sichern (inkl. Firmen-Vorlage). Nützlich für Backup oder Übertrag zwischen Geräten.">
                  <FileText aria-hidden="true" /> Backup (JSON)
                </Button>
                <label
                  className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-within:ring-2 focus-within:ring-ring"
                  title="Eine vorher exportierte Rechnungs-JSON wieder laden"
                >
                  <Upload className="h-4 w-4" aria-hidden="true" /> Backup laden
                  <input type="file" accept=".json" onChange={importJson} className="sr-only" />
                </label>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Firmen-Daten und Logo bleiben im Browser gespeichert. „Neue Rechnung" leert nur Kunde, Positionen und Freitext.
              </p>
            </div>

            {/* === E-Rechnung === */}
            <Callout tone="info" title="E-Rechnung (XRechnung)">
              Empfangen müssen alle Unternehmen E-Rechnungen schon seit 01.01.2025. Ausstellen ist Pflicht für Rechnungen an
              Unternehmen ab 2027 (Vorjahresumsatz über 800.000 €) und ab 2028 für alle – ausgenommen Kleinbeträge bis 250 € und
              Kleinunternehmer. Die XML-Datei ist die eigentliche Rechnung; das PDF dient als Lesefassung. Geprüft gegen den
              offiziellen KoSIT-Validator (XRechnung 3.0.2).
              {xrFehlt.length > 0 && (
                <span className="mt-2 block font-medium text-warning">Für die E-Rechnung fehlt noch: {xrFehlt.join(" · ")}</span>
              )}
            </Callout>
          </>
        }
      />

      {/* === Cross-Links === */}
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { to: "/cockpit/schwellen-check", t: "Schwellen-Check", d: "Kleinunternehmer-Grenze 25k/100k" },
          { to: "/cockpit/ust-rechner", t: "USt-Rechner", d: "Komplexe USt-Fälle (RC, IGL, OSS)" },
          { to: "/cockpit/quartals-steuer", t: "Quartals-Steuerschätzung", d: "Wann musst du USt-VA abgeben?" },
        ].map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-card transition-colors hover:border-accent-blue/40"
          >
            <span>
              <span className="block text-sm font-semibold">{l.t}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{l.d}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
          </Link>
        ))}
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
  <section className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
    <h2 className="text-base font-semibold tracking-tight">Erste richtige Rechnung schreiben</h2>
    <p className="mt-1.5 max-w-[80ch] text-sm leading-relaxed text-muted-foreground">
      Eine Rechnung muss <strong className="text-foreground">10 Pflichtangaben nach §14 UStG</strong> enthalten — sonst ist sie für den Kunden
      nicht zum Vorsteuerabzug berechtigt (Kunde verärgert) und du musst nachbessern. Dieses Tool prüft alle
      Pflichten LIVE während du tippst und gibt dir am Ende eine §14-konforme PDF zum Download.
    </p>
    <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
      {[
        { k: "Standard", d: "19/7 % USt für die meisten", cls: "border-success/25 bg-success-soft", t: "text-success" },
        { k: "§19 KU", d: "<25k € Umsatz, keine USt", cls: "border-info/20 bg-info-soft", t: "text-info" },
        { k: "§13b RC", d: "B2B EU-Dienstleistung", cls: "border-warning/25 bg-warning-soft", t: "text-warning" },
        { k: "§6a IGL", d: "Waren B2B EU steuerfrei", cls: "border-accent-blue/20 bg-accent", t: "text-accent-blue" },
      ].map((c) => (
        <div key={c.k} className={cn("rounded-xl border p-3", c.cls)}>
          <strong className={cn("text-sm font-semibold", c.t)}>{c.k}</strong>
          <div className="mt-0.5 text-xs text-foreground/75">{c.d}</div>
        </div>
      ))}
    </div>
  </section>
);

const UstModusCard = ({ modus, current, onSelect, title, desc }: {
  modus: UstModus; current: UstModus; onSelect: (m: UstModus) => void; title: string; desc: string;
}) => {
  const active = modus === current;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(modus)}
      className={cn(
        "rounded-xl border p-3.5 text-left transition-[background-color,border-color,box-shadow] duration-200 active:translate-y-px",
        active
          ? "border-accent-blue bg-accent shadow-[0_0_0_1px_hsl(var(--accent-blue)/0.35)]"
          : "border-border bg-card hover:border-foreground/25",
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</div>
    </button>
  );
};

const TextFeld = ({ id, label, value, onChange, type = "text", hint, className }: {
  id: string; label: string; value: string; onChange: (v: string) => void; type?: string; hint?: React.ReactNode; className?: string;
}) => (
  <Field label={label} htmlFor={id} hint={hint} className={className}>
    <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} className={type === "number" ? "tabular" : undefined} />
  </Field>
);

const Glossar = () => (
  <details className="group mb-6 rounded-2xl border border-border bg-card shadow-card [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-base font-semibold md:px-6">
      <span className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-blue">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        Glossar: Begriffe einfach erklärt
      </span>
      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <dl className="divide-y divide-border/70 border-t border-border/70 px-5 md:px-6">
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
        <div key={g.b} className="py-4">
          <dt className="text-sm font-semibold">{g.b}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.e}</dd>
        </div>
      ))}
    </dl>
  </details>
);

export default RechnungsGenerator;
