import { describe, expect, it } from "vitest";
import { berechneBruttoNettoSolo, type BruttoNettoSoloInput } from "@/lib/bruttoNettoSolo";

const basis: BruttoNettoSoloInput = {
  umsatz: 60000, betriebsausgaben: 15000, rechtsform: "freiberuf", hebesatz: 400,
  kvVariante: "gkv-freiwillig", zusatzBeitrag: 2.9, kinderlos: true, pkvBeitragMonat: 450,
  pkvBasisAnteil: 80, rvFreiwillig: false, kistSatz: 0, verheiratet: false,
};

describe("berechneBruttoNettoSolo", () => {
  it("zieht KV/PV als Vorsorge vom zvE ab (§10 Abs. 1 Nr. 3 EStG)", () => {
    const r = berechneBruttoNettoSolo(basis);
    // Gewinn 45.000; KV 45.000 × 17,5 % = 7.875 (× 0,96 = 7.560), PV 45.000 × 4,2 % = 1.890
    // zvE = 45.000 − 9.450 = 35.550 → ESt §32a 2026 = 5.835 €
    expect(r.gewinn).toBe(45000);
    expect(r.vorsorgeAbzug).toBeCloseTo(9450, 6);
    expect(r.zvE).toBeCloseTo(35550, 6);
    expect(r.eSt).toBe(5835);
  });

  it("nutzt bei Verheirateten die SolZ-Freigrenze 40.700 €", () => {
    const r = berechneBruttoNettoSolo({ ...basis, umsatz: 215000, verheiratet: true });
    // Gewinn 200.000; Vorsorge = 69.750 × 17,5 % × 0,96 + 69.750 × 4,2 % = 14.647,50
    // zvE 185.352,50 → Splitting 2 × round(0,42 × 92.676,25 − 11.135,63) = 55.576
    // SolZ = min(5,5 % × 55.576; 11,9 % × (55.576 − 40.700)) = 1.770,244
    expect(r.eSt).toBe(55576);
    expect(r.solz).toBeCloseTo(1770.244, 3);
  });

  it("KSK: RV ist Pflicht mit halbem Satz 9,3 %", () => {
    const r = berechneBruttoNettoSolo({ ...basis, kvVariante: "ksk" });
    // 45.000 × 9,3 % = 4.185
    expect(r.rvPflichtKsk).toBe(true);
    expect(r.rvJahr).toBeCloseTo(4185, 6);
  });
});
