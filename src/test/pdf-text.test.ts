// @vitest-environment node
import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import jsPDF from "jspdf";
import { PDFDocument } from "pdf-lib";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import { pdfInhaltMit } from "@/lib/pdfText";
import { lesePdfRechnung, summenAbgleich, zeilenAusTeilen } from "@/lib/pdfRechnungLesen";
import { baueXRechnung, xrSummen } from "@/lib/xrechnung";

// Echte PDF-Strecke wie im Browser: PDF erzeugen → pdf.js liest die Textebene →
// Zeilen → Felder. Layout wie eine typische Word-Rechnung (DIN 5008: Absenderzeile
// über dem Anschriftfeld links, Briefkopf rechts, Tabelle, Summen, Fußzeile).
function wordRechnungPdf(): Uint8Array {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFontSize(7);
  doc.text("Muster Webdesign · Hauptstraße 1 · 10115 Berlin", 20, 45);
  doc.setFontSize(10);
  ["Kunde GmbH", "Marktplatz 5", "80331 München"].forEach((t, i) => doc.text(t, 20, 52 + i * 5));
  ["Muster Webdesign", "Hauptstraße 1", "10115 Berlin", "Tel. +49 30 1234567", "rechnung@muster.example", "Ansprechpartner: Erika Muster"].forEach((t, i) => doc.text(t, 125, 20 + i * 5));
  doc.text("Rechnungsdatum: 08.10.2026", 125, 60);
  doc.text("Leistungsdatum: 01.10.2026", 125, 65);
  doc.setFontSize(14);
  doc.text("Rechnung Nr. RE-2026-042", 20, 90);
  doc.setFontSize(10);
  const zeile = (y: number, z: string[]) => {
    doc.text(z[0], 20, y);
    doc.text(z[1], 30, y);
    doc.text(z[2], 110, y);
    doc.text(z[3], 160, y, { align: "right" });
    doc.text(z[4], 190, y, { align: "right" });
  };
  zeile(105, ["Pos", "Beschreibung", "Menge", "Einzelpreis", "Gesamt"]);
  zeile(112, ["1", "Webdesign Startseite", "1 Stk", "1.200,00 €", "1.200,00 €"]);
  zeile(118, ["2", "Pflege-Stunden", "3,5 Std", "85,00 €", "297,50 €"]);
  const summe = (y: number, l: string, b: string) => {
    doc.text(l, 125, y);
    doc.text(b, 190, y, { align: "right" });
  };
  summe(130, "Nettobetrag", "1.497,50 €");
  summe(136, "zzgl. 19 % USt", "284,53 €");
  summe(142, "Gesamtbetrag", "1.782,03 €");
  doc.text("Zahlbar innerhalb von 14 Tagen ohne Abzug.", 20, 160);
  doc.setFontSize(8);
  doc.text("Muster Webdesign Erika Muster", 20, 280);
  doc.text("IBAN DE02 1203 0000 0000 2020 51", 80, 280);
  doc.text("USt-IdNr. DE123456789", 150, 280);
  doc.text("BIC BYLADEM1001", 80, 285);
  doc.text("Steuernummer 27/123/45678", 150, 285);
  return new Uint8Array(doc.output("arraybuffer"));
}

describe("PDF-Strecke mit pdf.js", () => {
  it("liest eine Word-Rechnung als PDF vollständig und mit passenden Summen", async () => {
    const inhalt = await pdfInhaltMit(pdfjs, wordRechnungPdf());
    expect(inhalt.seiten).toBe(1);
    expect(inhalt.anhaenge).toEqual([]);
    const v = lesePdfRechnung(zeilenAusTeilen(inhalt.teile, inhalt.seitenBreite));
    const d = v.daten;
    expect(d.rechnungsnummer).toBe("RE-2026-042");
    expect(d.rechnungsdatum).toBe("2026-10-08");
    expect(d.leistungsdatum).toBe("2026-10-01");
    expect(d.zahlungsziel).toBe(14);
    expect(d.verkaeufer).toMatchObject({ name: "Muster Webdesign", strasse: "Hauptstraße 1", plzOrt: "10115 Berlin", ustId: "DE123456789", steuernummer: "27/123/45678", email: "rechnung@muster.example", telefon: "+49 30 1234567", kontaktName: "Erika Muster", bic: "BYLADEM1001" });
    expect(d.kunde).toMatchObject({ name: "Kunde GmbH", strasse: "Marktplatz 5", plzOrt: "80331 München" });
    expect(d.positionen.map((p) => [p.beschreibung, p.menge, p.einzelpreisNetto, p.ustSatz, p.einheit])).toEqual([
      ["Webdesign Startseite", 1, 1200, 19, "C62"],
      ["Pflege-Stunden", 3.5, 85, 19, "HUR"],
    ]);
    expect(summenAbgleich(d, v.summen).ok).toBe(true);
    // XRechnung mit dem Original-PDF als Anlage
    const xml = baueXRechnung({ ...d, kunde: { ...d.kunde, email: "einkauf@kunde.example" }, anhang: { dateiname: "RE-2026-042.pdf", base64: "JVBERi0=" } });
    expect(xml).toContain("<ram:GrandTotalAmount>1782.03</ram:GrandTotalAmount>");
    expect(xml).toContain('<ram:BilledQuantity unitCode="HUR">3.5</ram:BilledQuantity>');
    expect(xml).toContain('mimeCode="application/pdf" filename="RE-2026-042.pdf"');
    expect(xrSummen(d).summeSteuer).toBe(284.53);
  });

  it("findet eine eingebettete E-Rechnung (ZUGFeRD/Factur-X) im PDF", async () => {
    const xml = readFileSync(join(__dirname, "fixtures/xrechnung/01.01a-INVOICE_uncefact.xml"));
    const pdf = await PDFDocument.create();
    pdf.addPage().drawText("Rechnung mit eingebetteter XML");
    await pdf.attach(new Uint8Array(xml), "factur-x.xml", { mimeType: "text/xml", description: "Factur-X" });
    const inhalt = await pdfInhaltMit(pdfjs, await pdf.save());
    expect(inhalt.anhaenge.map((a) => a.name)).toEqual(["factur-x.xml"]);
    expect(new TextDecoder().decode(inhalt.anhaenge[0].inhalt)).toContain("CrossIndustryInvoice");
  });
});
