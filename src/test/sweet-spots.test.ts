import { describe, it, expect } from "vitest";
import { SWEET_SPOTS } from "@/data/usCreditCards";

describe("Sweet-Spots: Cent pro Punkt", () => {
  it("centProPunkt folgt aus realerWertEur / punkte (auf 0,1 gerundet)", () => {
    for (const s of SWEET_SPOTS) {
      if (!s.punkte) {
        expect(s.centProPunkt, s.id).toBe(0);
        continue;
      }
      const soll = Math.round((s.realerWertEur / s.punkte) * 1000) / 10;
      expect(s.centProPunkt, s.id).toBe(soll);
    }
  });
  it("Nachgerechnete Fälle nach den Abwertungen 2026", () => {
    const wert = (id: string) => SWEET_SPOTS.find((s) => s.id === id)!.centProPunkt;
    expect(wert("aeroplan-jfk-fra-biz")).toBe(4.7); // 3.500 € / 75.000 = 4,67 ct
    expect(wert("hyatt-park-tokyo-offpeak")).toBe(1.3); // 1.000 € / 75.000 = 1,33 ct
    expect(wert("hyatt-maldives")).toBe(1.7); // 1.300 € / 75.000 = 1,73 ct
    expect(wert("aeroplan-miami-gru-avianca")).toBe(4.7); // 2.800 € / 60.000 = 4,67 ct
  });
});
