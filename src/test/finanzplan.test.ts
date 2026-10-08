import { describe, it, expect } from "vitest";
import { BEISPIEL, darlehensplan, rechneFinanzplan } from "@/lib/finanzplan";

describe("Finanzplan", () => {
  it("Darlehen: erst nur Zinsen, dann Annuität bis auf 0 getilgt", () => {
    const p = darlehensplan({ betrag: 12000, zinsProzent: 6, laufzeitJahre: 2, tilgungsfreiMonate: 6 }, 24);
    expect(p[0].tilgung).toBe(0);
    expect(p[0].zins).toBeCloseTo(60, 5);
    expect(p[6].tilgung).toBeGreaterThan(0);
    expect(p[23].rest).toBeCloseTo(0, 2);
  });

  it("zinsloses Darlehen wird gleichmäßig getilgt", () => {
    const p = darlehensplan({ betrag: 1200, zinsProzent: 0, laufzeitJahre: 1, tilgungsfreiMonate: 0 }, 12);
    expect(p.every((m) => Math.abs(m.tilgung - 100) < 1e-9)).toBe(true);
  });

  it("Kapitalbedarf = Investitionen + Gründungskosten + Reserve; Lücke erkannt", () => {
    const f = rechneFinanzplan({ ...BEISPIEL, eigenkapital: 1000, darlehen: { ...BEISPIEL.darlehen, betrag: 0 } });
    expect(f.kapitalbedarf.summe).toBe(3500 + 1600 + 3000);
    expect(f.finanzierung.luecke).toBe(8100 - 1000);
    expect(f.signale[0].stufe).toBe("kritisch");
  });

  it("Liquidität: Bestand ist die laufende Summe der Salden", () => {
    const f = rechneFinanzplan(BEISPIEL);
    let b = 0;
    for (const m of f.liquiditaet) {
      b += m.saldo;
      expect(Math.abs(m.bestand - b)).toBeLessThanOrEqual(12);
    }
    expect(f.liquiditaet[0].einUmsatz).toBe(0); // Zahlungsziel: erster Umsatz kommt in Monat 2
  });

  it("Zuschuss hebt die Liquidität, nicht den Gewinn", () => {
    const ohne = rechneFinanzplan(BEISPIEL);
    const mit = rechneFinanzplan({ ...BEISPIEL, zuschussMonatlich: 1800, zuschussMonate: 6 });
    expect(mit.rentabilitaet[0].gewinn).toBe(ohne.rentabilitaet[0].gewinn);
    expect(mit.liquiditaet[11].bestand - ohne.liquiditaet[11].bestand).toBeCloseTo(10800, -1);
  });

  it("Gewinn J1 = Rohertrag − Kosten (inkl. Gründungskosten) − Personal − AfA − Zinsen", () => {
    const r = rechneFinanzplan(BEISPIEL).rentabilitaet[0];
    expect(Math.abs(r.gewinn - (r.rohertrag - r.kosten - r.personal - r.abschreibung - r.zinsen))).toBeLessThanOrEqual(3);
  });

  it("andere Einkünfte im Haushalt senken die Privatentnahme", () => {
    const a = rechneFinanzplan(BEISPIEL);
    const b = rechneFinanzplan({ ...BEISPIEL, andereEinkuenfteMonat: 500 });
    expect(b.liquiditaet[0].ausPrivat).toBe(a.liquiditaet[0].ausPrivat - 500);
    expect(b.mindestumsatzMonat).toBeLessThan(a.mindestumsatzMonat);
  });
});
