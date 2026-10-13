import { describe, expect, it } from "vitest";
import { csvZeileLesen, parseMoney } from "@/pages/DatevMapper";

describe("DATEV-Mapper: CSV-Zeilen lesen", () => {
  it("liest das Datum nicht als Betrag (01.05.2026 war 1.052.026 €)", () => {
    expect(csvZeileLesen("01.05.2026;-149,90;Stripe Technology Inc Fees")).toEqual({
      datum: "2026-05-01",
      betrag: -149.9,
      zweck: "Stripe Technology Inc Fees",
    });
  });

  it("erkennt Tausenderpunkt und ISO-Datum", () => {
    expect(csvZeileLesen("2026-05-02;3.245,12;Amazon EU SARL Auszahlung")).toMatchObject({
      datum: "2026-05-02",
      betrag: 3245.12,
    });
  });

  it("Betrag vor dem Datum und zweistelliges Jahr", () => {
    expect(csvZeileLesen("-12,00\t3.6.26\tKontoführung")).toMatchObject({ datum: "2026-06-03", betrag: -12 });
  });

  it("ohne Datum gilt das übergebene Tagesdatum", () => {
    expect(csvZeileLesen("49,99;Canva Pro", "2026-10-12").datum).toBe("2026-10-12");
  });

  it("parseMoney: DE, EN und keine Zahl", () => {
    expect(parseMoney("1.234,56")).toBe(1234.56);
    expect(parseMoney("1,234.56")).toBe(1234.56);
    expect(parseMoney("149.90")).toBe(149.9);
    expect(parseMoney("Miete")).toBeNull();
  });
});

describe("DATEV-Mapper: Runde 2", () => {
  it("liest die Betragsspalte aus der Kopfzeile statt der ersten Zahl", async () => {
    const { betragsSpalteAusHeader } = await import("@/pages/DatevMapper");
    const idx = betragsSpalteAusHeader("Kontonummer;Buchungstag;Verwendungszweck;Betrag;Saldo");
    expect(idx).toBe(3);
    expect(csvZeileLesen("123456789;01.05.2026;Miete Mai;-850,00;12.000,00", "2026-01-01", idx).betrag).toBe(-850);
  });

  it("splittet mit Anführungszeichen korrekt", async () => {
    const { csvSpalten } = await import("@/pages/DatevMapper");
    expect(csvSpalten('01.05.2026,"Amazon, Inc",-12.50')).toEqual(["01.05.2026", "Amazon, Inc", "-12.50"]);
  });
});

describe("DATEV-Mapper: Runde 3 (Betragsspalte bei Commerzbank/DKB)", () => {
  it("Commerzbank: Umsatzart ist nicht die Betragsspalte", async () => {
    const { betragsSpalteAusHeader } = await import("@/pages/DatevMapper");
    const idx = betragsSpalteAusHeader("Buchungstag;Wertstellung;Umsatzart;Buchungstext;Betrag;Währung;IBAN Auftraggeber;BIC Auftraggeber;Kategorie");
    expect(idx).toBe(4);
    expect(csvZeileLesen("01.05.2026;01.05.2026;Lastschrift;Miete Mai;-850,00;EUR;DE00;XX;Wohnen", "2026-01-01", idx).betrag).toBe(-850);
  });

  it("DKB: Umsatztyp ist nicht die Betragsspalte, 'Betrag (€)' schon", async () => {
    const { betragsSpalteAusHeader } = await import("@/pages/DatevMapper");
    const idx = betragsSpalteAusHeader(
      '"Buchungsdatum";"Wertstellung";"Status";"Zahlungspflichtige*r";"Zahlungsempfänger*in";"Verwendungszweck";"Umsatztyp";"IBAN";"Betrag (€)";"Gläubiger-ID"',
    );
    expect(idx).toBe(8);
    expect(
      csvZeileLesen('"01.05.26";"01.05.26";"Gebucht";"Ich";"Vermieter";"Miete Mai";"Ausgang";"DE00";"-850,00";""', "2026-01-01", idx).betrag,
    ).toBe(-850);
  });

  it("'Umsatz' nur als ganze Spalte, Umsatzkategorie nie", async () => {
    const { betragsSpalteAusHeader } = await import("@/pages/DatevMapper");
    expect(betragsSpalteAusHeader("Datum;Umsatzkategorie;Text;Umsatz in EUR")).toBe(3);
    expect(betragsSpalteAusHeader("Datum;Umsatzart;Text")).toBeNull();
  });

  it("leere Betragsspalte: Rückfall auf den Scan über alle Zellen", () => {
    expect(csvZeileLesen("01.05.2026;Miete Mai;;-850,00", "2026-01-01", 2).betrag).toBe(-850);
  });
});
