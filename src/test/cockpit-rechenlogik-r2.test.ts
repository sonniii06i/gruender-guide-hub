/**
 * Rechenlogik-Fixes Runde 2 (Cockpit-Tools). Erwartungswerte von Hand nachgerechnet.
 */
import { describe, expect, it } from "vitest";
import { calculate as auszahlungsWege } from "@/pages/AuszahlungOptimizer";
import { kstGewstRate, holdingRate } from "@/lib/germanTax";

describe("AuszahlungOptimizer: nur vergleichbare Wege ranken", () => {
  const wege = auszahlungsWege(250000, 0.42, true, 400, 40);
  it("Holding/Mix/Pension sind als Teil-Zufluss markiert", () => {
    const teil = wege.filter((w) => w.zufluss === "teil").map((w) => w.name);
    expect(teil.some((n) => n.includes("Holding-Ausschüttung"))).toBe(true);
    expect(teil.some((n) => n.startsWith("Mix"))).toBe(true);
    expect(teil.some((n) => n.startsWith("Pension"))).toBe(true);
  });
  it("Spalten GmbH + Privat + Holding ergeben die Gesamtsteuer", () => {
    for (const w of wege) {
      expect(w.steuerGmbh + w.steuerPrivat + w.steuerHolding).toBeCloseTo(w.totalSteuer, 6);
    }
    // Holding: 250.000 × kstGewst + (250.000 × (1 − kstGewst)) × holdingRate
    const k = kstGewstRate(400);
    const h = wege.find((w) => w.name.includes("Holding-Ausschüttung"))!;
    expect(h.totalSteuer).toBeCloseTo(250000 * k + 250000 * (1 - k) * holdingRate(400), 6);
  });
  it("beste Variante kommt aus den Wegen mit vollem Zufluss", () => {
    const best = wege.filter((w) => w.zufluss === "voll").sort((a, b) => a.totalSteuer - b.totalSteuer)[0];
    expect(best.privatNetto).toBeGreaterThan(0);
  });
});

import { abzugVorgezogeneInvestition } from "@/lib/jahresendHebel";

describe("PreYearEndCheck: vorgezogene Investition", () => {
  it("Anlagegut im Dezember: nur 1/12 AfA, kein voller Abzug", () => {
    // 20.000 € / 3 Jahre / 12 = 555,56 €
    const r = abzugVorgezogeneInvestition({ betrag: 20000, art: "anlage", nutzungsdauer: 3, monate: 1, gewinn: 150000, sonderAfa: false });
    expect(r.abzug).toBeCloseTo(555.5556, 3);
  });
  it("mit Sonder-AfA §7g 40 % bei Gewinn ≤ 200.000 €", () => {
    // 555,56 + 8.000 = 8.555,56 €
    const r = abzugVorgezogeneInvestition({ betrag: 20000, art: "anlage", nutzungsdauer: 3, monate: 1, gewinn: 150000, sonderAfa: true });
    expect(r.abzug).toBeCloseTo(8555.5556, 3);
  });
  it("Sonder-AfA entfällt über der Gewinngrenze", () => {
    const r = abzugVorgezogeneInvestition({ betrag: 20000, art: "anlage", nutzungsdauer: 3, monate: 1, gewinn: 250000, sonderAfa: true });
    expect(r.sonderAfa).toBe(0);
  });
  it("GWG sofort voll", () => {
    expect(abzugVorgezogeneInvestition({ betrag: 700, art: "gwg", nutzungsdauer: 3, monate: 1, gewinn: 0, sonderAfa: false }).abzug).toBe(700);
  });
});

import { pruefeKleinunternehmer } from "@/lib/kleinunternehmer";

describe("Kleinunternehmer-Wächter: Rumpf-Gründungsjahr", () => {
  it("Gründung im Oktober mit 10.000 € → hochgerechnet 40.000 €, im Folgejahr keine KU", () => {
    const monate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 4000, 3000, 3000];
    const r = pruefeKleinunternehmer({ gruendungsjahr: true, vorjahr: 0, monate, bisMonat: 12, gruendungsMonat: 10 });
    // 10.000 € / 3 aktive Monate × 12 = 40.000 €
    expect(r.jahresumsatzFolgejahr).toBe(40000);
    expect(r.folgejahrKu).toBe(false);
    expect(r.status).toBe("ku"); // im Gründungsjahr selbst unter 25.000 €
  });
});

import { barwertAnnuitaet } from "@/lib/germanTax";

describe("PensionOptimizer: Steuerersparnisse abgezinst", () => {
  it("Barwert 1.000 €/Jahr über 2 Jahre bei 2,5 %", () => {
    // 1.000/1,025 + 1.000/1,025² = 975,61 + 951,81 = 1.927,42
    expect(barwertAnnuitaet(1000, 0.025, 2)).toBeCloseTo(1927.42, 2);
    expect(barwertAnnuitaet(1000, 0, 3)).toBe(3000);
  });
});

import { calculateAll } from "@/pages/EntscheidungsEngine";

describe("EntscheidungsEngine: NL-Tarif stufig, OÜ bei DE-Wohnsitz", () => {
  const r = calculateAll({ jahresGewinn: 300000, liquiditaetsbedarfPrivat: 0, international: "eu" });
  it("NL BV: 19 % bis 200k + 25,8 % darüber", () => {
    // 0,19 × 200.000 + 0,258 × 100.000 = 38.000 + 25.800 = 63.800 (ohne Entnahme keine AbgSt)
    expect(r.find((c) => c.slug === "nl-bv")!.steuerProJahr).toBeCloseTo(63800, 6);
  });
  it("Estland OÜ mit DE-Wohnsitz: KSt+GewSt in DE statt 0 %", () => {
    // 300.000 × 30 % = 90.000
    expect(r.find((c) => c.slug === "estland-ou")!.steuerProJahr).toBeCloseTo(90000, 6);
  });
});

import { calcAbschreibung, AFA_ASSETS } from "@/pages/AbschreibungRechner";

describe("AbschreibungRechner: GWG-/Pool-Grenzen auf volle Anschaffungskosten", () => {
  const kaffee = AFA_ASSETS.find((a) => a.id === "kaffeemaschine")!;
  it("1.500 € netto mit 50 % Privatanteil ist KEIN GWG, sondern linear (8 Jahre)", () => {
    const r = calcAbschreibung(kaffee, 1500, false, 1, false, 50);
    expect(r.modusKey).toBe("linear");
    // Basis 750 € / 8 Jahre = 93,75 €
    expect(r.jahresAfa).toBeCloseTo(93.75, 6);
  });
  it("Pool gewählt: 600 € gehören in den Sammelposten (nicht GWG)", () => {
    const r = calcAbschreibung(kaffee, 600, false, 1, true, 0);
    expect(r.modusKey).toBe("pool");
    expect(r.jahresAfa).toBeCloseTo(120, 6); // 600 / 5
  });
  it("Kleinunternehmer: 900 € brutto = 756,30 € netto → GWG", () => {
    expect(calcAbschreibung(kaffee, 900, true, 1, false, 0).modusKey).toBe("gwg");
  });
});

import { calcSv } from "@/lib/germanTax";

describe("germanTax: SV-Quote 2026", () => {
  it("KV+PV kinderlos 21,7 % + RV/AV 21,2 %", () => {
    // 50.000 × 21,7 % + 50.000 × 21,2 % = 10.850 + 10.600 = 21.450
    expect(calcSv(50000, true)).toBeCloseTo(21450, 6);
  });
});

import { calcBewirtung } from "@/pages/ReisekostenLogger";

describe("ReisekostenLogger: Bewirtung 70 % vom Netto", () => {
  it("107 € brutto (7 % Speisen) + 10 € Trinkgeld", () => {
    const c = calcBewirtung({ id: "b", datum: "", ort: "", gaeste: "", anlass: "", bewirtetGeschaeftlich: true, bruttoBetrag: 107, trinkgeld: 10, ustSatz: 7 });
    // Netto 100 €, abziehbar (100 + 10) × 70 % = 77 €, Vorsteuer 7 € voll
    expect(c.absetzbar).toBeCloseTo(77, 6);
    expect(c.vorsteuer).toBeCloseTo(7, 6);
  });
});

describe("PreYearEndCheck: Nutzungsdauer 1 Jahr (BMF 22.02.2022)", () => {
  it("Laptop 1.500 € im Dezember mit ND 1 Jahr: voller Abzug statt 1/12 (125 €)", () => {
    const r = abzugVorgezogeneInvestition({ betrag: 1500, art: "anlage", nutzungsdauer: 1, monate: 1, gewinn: 50000, sonderAfa: false });
    expect(r.afa).toBe(1500);
    expect(r.abzug).toBe(1500);
  });
  it("Sonder-AfA ändert am Deckel nichts: Abzug höchstens Anschaffungskosten", () => {
    const r = abzugVorgezogeneInvestition({ betrag: 1500, art: "anlage", nutzungsdauer: 1, monate: 1, gewinn: 50000, sonderAfa: true });
    expect(r.abzug).toBe(1500);
  });
});
