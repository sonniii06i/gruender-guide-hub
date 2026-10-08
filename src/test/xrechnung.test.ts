import { describe, it, expect } from "vitest";
import { baueXRechnung, landCode, trennePlzOrt, xrFehlend, type XrDaten } from "@/lib/xrechnung";

const d: XrDaten = {
  verkaeufer: { name: "A", strasse: "S 1", plzOrt: "10115 Berlin", steuernummer: "27/1/2", ustId: "DE123456789", iban: "DE02120300000000202051", bic: "", email: "a@b.de", telefon: "1", kontaktName: "A" },
  kunde: { name: "K", strasse: "M 5", plzOrt: "80331 München", land: "Deutschland", ustId: "", email: "k@b.de" },
  kaeuferReferenz: "",
  rechnungsnummer: "RE-1", rechnungsdatum: "2026-10-08", leistungsdatum: "2026-10-01", zahlungsziel: 14, modus: "standard",
  positionen: [
    { beschreibung: "X", menge: 1, einzelpreisNetto: 1200, ustSatz: 19 },
    { beschreibung: "Y", menge: 2, einzelpreisNetto: 24.99, ustSatz: 7 },
  ],
};

describe("XRechnung", () => {
  it("Summen und Steuer je Satz (BR-CO-17)", () => {
    const xml = baueXRechnung(d);
    expect(xml).toContain("<ram:LineTotalAmount>1249.98</ram:LineTotalAmount>");
    expect(xml).toContain("<ram:CalculatedAmount>228.00</ram:CalculatedAmount>");
    expect(xml).toContain("<ram:CalculatedAmount>3.50</ram:CalculatedAmount>");
    expect(xml).toContain("<ram:GrandTotalAmount>1481.48</ram:GrandTotalAmount>");
    expect(xml).toContain("<ram:BuyerReference>RE-1</ram:BuyerReference>");
    expect(xml).toContain("<udt:DateTimeString format=\"102\">20261022</udt:DateTimeString>");
  });
  it("Kleinunternehmer: Kategorie E mit Befreiungsgrund und Steuernummer als Verkäufer-ID", () => {
    const xml = baueXRechnung({ ...d, modus: "kleinunternehmer", verkaeufer: { ...d.verkaeufer, ustId: "" } });
    expect(xml).toContain("<ram:CategoryCode>E</ram:CategoryCode>");
    expect(xml).toContain("§ 19 UStG");
    expect(xml).toContain("<ram:ID>27/1/2</ram:ID>");
    expect(xml).toContain("<ram:TaxTotalAmount currencyID=\"EUR\">0.00</ram:TaxTotalAmount>");
  });
  it("Sonderzeichen werden escaped", () => {
    expect(baueXRechnung({ ...d, kunde: { ...d.kunde, name: "Müller & Söhne <GmbH>" } })).toContain("Müller &amp; Söhne &lt;GmbH&gt;");
  });
  it("meldet fehlende Pflichtfelder", () => {
    const f = xrFehlend({ ...d, kunde: { ...d.kunde, email: "" }, verkaeufer: { ...d.verkaeufer, kontaktName: "" } });
    expect(f.some((x) => x.includes("E-Mail des Kunden"))).toBe(true);
    expect(f.some((x) => x.includes("Ansprechpartner"))).toBe(true);
    expect(xrFehlend(d)).toEqual([]);
  });
  it("Hilfsfunktionen", () => {
    expect(landCode("Niederlande")).toBe("NL");
    expect(landCode("at")).toBe("AT");
    expect(trennePlzOrt("1012 Amsterdam")).toEqual({ plz: "1012", ort: "Amsterdam" });
  });
});
