import { describe, it, expect } from "vitest";
import { einzelSteuer } from "@/lib/einzelSteuer";
import { progressionESt } from "@/lib/germanTax";

describe("einzelSteuer: § 35 EStG vor SolZ (Aktualität #161/#301)", () => {
  it("120.000 € Gewinn, Hebesatz 400 %: SolZ auf ESt nach Anrechnung, GewSt brutto", () => {
    const r = einzelSteuer({ gewinn: 120000, hebesatz: 400, gewerbe: true });
    expect(r.gewst).toBeCloseTo(13370, 0); // (120.000 − 24.500) × 3,5 % × 400 %
    expect(r.anrechnung).toBeCloseTo(13370, 0);
    expect(r.est).toBeCloseTo(progressionESt(120000) - 13370, 0);
    // Milderungszone: 11,9 % × (ESt nach Anrechnung − 20.350 €) statt 5,5 % auf die tarifliche ESt
    expect(r.solz).toBeCloseTo(Math.min(r.est * 0.055, 0.119 * (r.est - 20350)), 2);
    expect(r.total).toBeCloseTo(r.est + r.solz + r.gewst, 2);
    expect(r.total).toBeLessThan(progressionESt(120000) * 1.055);
  });
  it("Quartalsgewinn 10.000 € (Jahr 40.000 €): kein SolZ", () => {
    const r = einzelSteuer({ gewinn: 40000, hebesatz: 400, gewerbe: true });
    expect(r.solz).toBe(0);
  });
  it("Freiberufler: keine GewSt, keine Anrechnung", () => {
    const r = einzelSteuer({ gewinn: 80000, hebesatz: 400, gewerbe: false });
    expect(r.gewst).toBe(0);
    expect(r.anrechnung).toBe(0);
    expect(r.est).toBe(progressionESt(80000));
  });
  it("Anrechnung höchstens bis zur tatsächlich gezahlten GewSt (Hebesatz 250 %)", () => {
    const r = einzelSteuer({ gewinn: 100000, hebesatz: 250, gewerbe: true });
    expect(r.anrechnung).toBeCloseTo(r.gewst, 6);
  });
});
