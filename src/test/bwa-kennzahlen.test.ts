import { describe, expect, it } from "vitest";
import { annualisierungsFaktor, hexToRgb, periodeMonateAus } from "@/lib/bwaKennzahlen";

describe("BWA-Kennzahlen", () => {
  it("leitet die Periodenlänge aus dem Zeitraum ab", () => {
    expect(periodeMonateAus("Q1 2026")).toBe(3);
    expect(periodeMonateAus("H2 2025")).toBe(6);
    expect(periodeMonateAus("03/2026")).toBe(1);
    expect(periodeMonateAus("März 2026")).toBe(1);
    expect(periodeMonateAus("2025")).toBe(12);
    expect(periodeMonateAus("")).toBe(12);
  });

  it("rechnet Quartals-EBITDA für die DSCR auf das Jahr hoch", () => {
    // Quartals-EBITDA 30.000 €, Kapitaldienst p.a. 100.000 € → DSCR = 30.000 × 4 / 100.000 = 1,2
    const faktor = annualisierungsFaktor(periodeMonateAus("Q1 2026"));
    expect(faktor).toBe(4);
    expect((30_000 * faktor) / 100_000).toBeCloseTo(1.2, 10);
  });

  it("mischt Füllfarben mit alpha gegen Weiß (Text bleibt lesbar)", () => {
    // #10b981 = (16,185,129); alpha 0,08 → 255 − (255 − c) × 0,08 = (236, 249, 245)
    expect(hexToRgb("#10b981", 0.08)).toEqual([236, 249, 245]);
    expect(hexToRgb("#10b981")).toEqual([16, 185, 129]);
    expect(hexToRgb("#10b981", 0.08)).not.toEqual(hexToRgb("#10b981"));
  });
});
