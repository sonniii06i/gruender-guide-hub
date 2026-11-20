// Erzeugt Beispiel-XRechnungen für alle vier Modi nach ./xr-beispiele/ –
// die GitHub Action prüft sie anschließend mit dem KoSIT-Validator.
import { mkdirSync, writeFileSync } from "fs";
import { baueXRechnung, xrFehlend, type XrDaten } from "../src/lib/xrechnung";

const basis: XrDaten = {
  verkaeufer: {
    name: "Muster Webdesign Erika Muster", strasse: "Hauptstraße 1", plzOrt: "10115 Berlin",
    steuernummer: "27/123/45678", ustId: "DE123456789", iban: "DE02120300000000202051", bic: "BYLADEM1001",
    email: "rechnung@muster.example", telefon: "+49 30 1234567", kontaktName: "Erika Muster",
  },
  kunde: { name: "Kunde GmbH", strasse: "Marktplatz 5", plzOrt: "80331 München", land: "Deutschland", ustId: "", email: "buchhaltung@kunde.example" },
  kaeuferReferenz: "PO-4711",
  rechnungsnummer: "RE-2026-042",
  rechnungsdatum: "2026-10-08",
  leistungsdatum: "2026-10-01",
  zahlungsziel: 14,
  modus: "standard",
  positionen: [
    { beschreibung: "Webdesign Startseite", menge: 1, einzelpreisNetto: 1200, ustSatz: 19 },
    { beschreibung: "Fachbuch", menge: 2, einzelpreisNetto: 24.99, ustSatz: 7 },
    { beschreibung: "Pflege-Stunden", menge: 3.5, einzelpreisNetto: 85, ustSatz: 19 },
  ],
  freitext: "Vielen Dank für Ihren Auftrag.",
};

const faelle: Record<string, XrDaten> = {
  standard: basis,
  kleinunternehmer: { ...basis, modus: "kleinunternehmer", verkaeufer: { ...basis.verkaeufer, ustId: "" } },
  "reverse-charge": { ...basis, modus: "reverse-charge", kunde: { ...basis.kunde, ustId: "DE987654321" } },
  innergemeinschaftlich: {
    ...basis, modus: "innergemeinschaftlich",
    kunde: { ...basis.kunde, name: "Klant BV", plzOrt: "1012 Amsterdam", land: "Niederlande", ustId: "NL123456789B01" },
  },
};

// Fälle des Tools „PDF in E-Rechnung umwandeln“ (/pdf-in-e-rechnung-umwandeln):
// Original-PDF als Anlage (BG-24), Einheit Stunde (HUR), Rabattzeile mit
// negativer Menge, Leistungszeitraum (BG-14) und eigene Zahlungsbedingungen.
// Kleines, gültiges PDF ohne Abhängigkeiten (der CI-Lauf installiert keine Pakete).
function minimalPdf(text: string): string {
  const inhalt = `BT /F1 12 Tf 50 780 Td (${text}) Tj ET`;
  const objekte = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${inhalt.length} >>\nstream\n${inhalt}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objekte.forEach((o, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objekte.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("")}`;
  pdf += `trailer\n<< /Size ${objekte.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, "latin1").toString("base64");
}
const anhang = { dateiname: "RE-2026-042.pdf", base64: minimalPdf("Rechnung RE-2026-042 (Original-PDF)"), beschreibung: "Original-Rechnung (PDF)" };
const konverter: XrDaten = {
  ...basis,
  leistungsdatum: "",
  leistungszeitraum: { von: "2026-10-01", bis: "2026-10-31" },
  zahlungsbedingungen: "2 % Skonto bei Zahlung bis 15.10.2026, sonst zahlbar ohne Abzug bis 22.10.2026.",
  positionen: [
    { beschreibung: "Pflege-Stunden Oktober", menge: 3.5, einzelpreisNetto: 85, ustSatz: 19, einheit: "HUR" },
    { beschreibung: "Treuerabatt", menge: 1, einzelpreisNetto: -50, ustSatz: 19 },
    { beschreibung: "Fachbuch", menge: 2, einzelpreisNetto: 24.99, ustSatz: 7, einheit: "H87" },
  ],
  anhang,
};
faelle["konverter-anhang"] = konverter;
faelle["konverter-datum-und-zeitraum"] = { ...konverter, leistungsdatum: "2026-10-31", anhang: undefined };
faelle["konverter-kleinunternehmer"] = { ...konverter, modus: "kleinunternehmer", verkaeufer: { ...basis.verkaeufer, ustId: "" }, positionen: [{ beschreibung: "Beratung", menge: 2, einzelpreisNetto: 60, ustSatz: 0, einheit: "HUR" }] };

mkdirSync("xr-beispiele", { recursive: true });
for (const [name, d] of Object.entries(faelle)) {
  const fehlt = xrFehlend(d);
  if (fehlt.length) throw new Error(`${name}: ${fehlt.join(", ")}`);
  writeFileSync(`xr-beispiele/${name}.xml`, baueXRechnung(d));
  console.log(`xr-beispiele/${name}.xml`);
}
