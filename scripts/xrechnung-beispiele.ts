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

mkdirSync("xr-beispiele", { recursive: true });
for (const [name, d] of Object.entries(faelle)) {
  const fehlt = xrFehlend(d);
  if (fehlt.length) throw new Error(`${name}: ${fehlt.join(", ")}`);
  writeFileSync(`xr-beispiele/${name}.xml`, baueXRechnung(d));
  console.log(`xr-beispiele/${name}.xml`);
}
