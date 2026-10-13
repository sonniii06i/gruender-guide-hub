import { describe, expect, it } from "vitest";
import { calcAbgeltungSteuer } from "@/lib/germanTax";

describe("Abgeltungsteuer § 32d Abs. 1 EStG", () => {
  it("ohne Kirchensteuer: 25 % + SolZ", () => {
    const r = calcAbgeltungSteuer(10_000, 0);
    expect(r.kapErtrag).toBeCloseTo(2500, 2);
    expect(r.solz).toBeCloseTo(137.5, 2);
    expect(r.kist).toBe(0);
  });

  it("mit 9 % KiSt: e/(4+k) = 24,45 %, KiSt 2,2 %", () => {
    const r = calcAbgeltungSteuer(10_000, 9);
    expect(r.kapErtrag).toBeCloseTo(10_000 / 4.09, 2); // 2444,99
    expect(r.kist).toBeCloseTo((10_000 / 4.09) * 0.09, 2); // 220,05
    expect(r.solz).toBeCloseTo((10_000 / 4.09) * 0.055, 2);
  });

  it("mit 8 % KiSt: e/(4+k)", () => {
    expect(calcAbgeltungSteuer(10_000, 8).kapErtrag).toBeCloseTo(10_000 / 4.08, 2);
  });
});
