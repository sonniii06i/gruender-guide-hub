import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { ibanGueltig, leseERechnung, pruefeERechnung } from "@/lib/eRechnungLesen";
import { baueXRechnung } from "@/lib/xrechnung";

// Offizielle KoSIT-Testsuite (XRechnung 3.0.2, 2026-08-31), Ordner „standard“.
const ordner = join(__dirname, "fixtures/xrechnung");
const dateien = readdirSync(ordner).filter((f) => f.endsWith(".xml"));

describe("E-Rechnung lesen – KoSIT-Testsuite", () => {
  it("enthält Beispiele", () => expect(dateien.length).toBeGreaterThan(10));
  it.each(dateien)("%s", (f) => {
    const r = leseERechnung(readFileSync(join(ordner, f), "utf8"));
    expect(r.nummer).not.toBe("");
    expect(r.verkaeufer.name).not.toBe("");
    expect(r.positionen.length).toBeGreaterThan(0);
    expect(r.summen.zahlbar).not.toBeNaN();
    // Die offiziellen Beispiele sind gültig – unsere Rechenprüfung darf nichts beanstanden.
    const fehler = pruefeERechnung(r).filter((p) => !p.ok && !p.text.startsWith("IBAN"));
    expect(fehler.map((p) => p.text)).toEqual([]);
  });
});

describe("E-Rechnung lesen – eigener Export", () => {
  it("liest die eigene XRechnung zurück", () => {
    const xml = baueXRechnung({
      verkaeufer: { name: "A", strasse: "S 1", plzOrt: "10115 Berlin", steuernummer: "", ustId: "DE123456789", iban: "DE02120300000000202051", bic: "", email: "a@b.de", telefon: "1", kontaktName: "A" },
      kunde: { name: "K", strasse: "M", plzOrt: "80331 München", land: "DE", ustId: "", email: "k@b.de" },
      kaeuferReferenz: "PO-1", rechnungsnummer: "RE-9", rechnungsdatum: "2026-10-08", leistungsdatum: "2026-10-01", zahlungsziel: 14, modus: "standard",
      positionen: [{ beschreibung: "X", menge: 2, einzelpreisNetto: 50, ustSatz: 19 }],
    });
    const r = leseERechnung(xml);
    expect(r.nummer).toBe("RE-9");
    expect(r.summen.zahlbar).toBe(119);
    expect(r.faellig).toBe("2026-10-22");
    expect(r.kaeuferReferenz).toBe("PO-1");
    expect(pruefeERechnung(r).every((p) => p.ok)).toBe(true);
  });
  it("lehnt Nicht-XML und fremde Formate verständlich ab", () => {
    expect(() => leseERechnung("kein xml")).toThrow(/kein gültiges XML/);
    expect(() => leseERechnung("<foo/>")).toThrow(/Unbekanntes Format/);
  });
  it("IBAN-Prüfziffer", () => {
    expect(ibanGueltig("DE02 1203 0000 0000 2020 51")).toBe(true);
    expect(ibanGueltig("DE02120300000000202052")).toBe(false);
  });
});

describe("E-Rechnung lesen: Runde 2", () => {
  it("ungültiger Währungscode stürzt nicht ab und wird gemeldet", async () => {
    const { leseERechnung, pruefeERechnung } = await import("@/lib/eRechnungLesen");
    const xml = `<?xml version="1.0"?><Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"><cbc:ID>1</cbc:ID><cbc:IssueDate>2026-01-01</cbc:IssueDate><cbc:DocumentCurrencyCode>EURO</cbc:DocumentCurrencyCode><cac:LegalMonetaryTotal><cbc:LineExtensionAmount>100</cbc:LineExtensionAmount><cbc:TaxExclusiveAmount>100</cbc:TaxExclusiveAmount><cbc:TaxInclusiveAmount>119</cbc:TaxInclusiveAmount><cbc:PayableAmount>119</cbc:PayableAmount></cac:LegalMonetaryTotal></Invoice>`;
    const r = leseERechnung(xml);
    expect(r.waehrung).toBe("EUR");
    expect(r.waehrungUngueltig).toBe("EURO");
    expect(pruefeERechnung(r).some((x) => !x.ok && /Währungscode/.test(x.text))).toBe(true);
  });
});

describe("E-Rechnung lesen: Runde 3 (BR-CO-16 mit Rundungsbetrag BT-114)", () => {
  const ubl = (rundung: string, zahlbar: string) =>
    `<?xml version="1.0"?><Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"><cbc:ID>1</cbc:ID><cbc:IssueDate>2026-01-01</cbc:IssueDate><cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode><cac:LegalMonetaryTotal><cbc:LineExtensionAmount>99.97</cbc:LineExtensionAmount><cbc:TaxExclusiveAmount>99.97</cbc:TaxExclusiveAmount><cbc:TaxInclusiveAmount>118.96</cbc:TaxInclusiveAmount>${rundung}<cbc:PayableAmount>${zahlbar}</cbc:PayableAmount></cac:LegalMonetaryTotal></Invoice>`;
  it("UBL: 118,96 + Rundung 0,04 = 119,00 ist gültig", () => {
    const r = leseERechnung(ubl("<cbc:PayableRoundingAmount>0.04</cbc:PayableRoundingAmount>", "119.00"));
    expect(r.summen.rundung).toBe(0.04);
    const p = pruefeERechnung(r).find((x) => x.text.includes("BR-CO-16"));
    expect(p?.ok).toBe(true);
  });
  it("UBL: ohne Rundungsfeld wird die Abweichung weiter gemeldet", () => {
    const p = pruefeERechnung(leseERechnung(ubl("", "119.00"))).find((x) => x.text.includes("BR-CO-16"));
    expect(p?.ok).toBe(false);
  });
});
