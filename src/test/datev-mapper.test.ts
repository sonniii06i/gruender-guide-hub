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
