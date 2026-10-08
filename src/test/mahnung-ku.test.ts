import { describe, it, expect } from "vitest";
import { basiszinsAm, verjaehrung, verzugsbeginn, verzugszinsen } from "@/lib/mahnung";
import { pruefeKleinunternehmer } from "@/lib/kleinunternehmer";

describe("Verzugszinsen", () => {
  it("Basiszins je Halbjahr; nach dem gepflegten Halbjahr unbekannt", () => {
    expect(basiszinsAm("2026-10-08")).toBe(1.52);
    expect(basiszinsAm("2026-03-01")).toBe(1.27);
    expect(basiszinsAm("2027-01-05")).toBeNull();
  });
  it("B2B: 1.000 € vom 01.08. bis 31.08.2026 = 30 Tage × 10,52 %", () => {
    const r = verzugszinsen(1000, "2026-08-01", "2026-08-31", false);
    expect(r.abschnitte[0].satz).toBeCloseTo(10.52, 5);
    expect(r.summe).toBeCloseTo(8.65, 2);
  });
  it("teilt am 01.07. in zwei Abschnitte (6,27 % / 6,52 % für Verbraucher)", () => {
    const r = verzugszinsen(1000, "2026-06-01", "2026-08-01", true);
    expect(r.abschnitte.map((a) => a.satz)).toEqual([6.27, 6.52]);
    expect(r.abschnitte.map((a) => a.tage)).toEqual([30, 31]);
  });
  it("Verzugsbeginn: 30-Tage-Regel B2B, Verbraucher ohne Hinweis erst mit Mahnung", () => {
    expect(verzugsbeginn({ faellig: "2026-09-01", zugang: "2026-08-20", verbraucher: false, hinweisInRechnung: false, kalenderdatumVereinbart: false }).datum).toBe("2026-10-02");
    expect(verzugsbeginn({ faellig: "2026-09-01", zugang: "2026-08-20", verbraucher: true, hinweisInRechnung: false, kalenderdatumVereinbart: false }).datum).toBeNull();
    expect(verzugsbeginn({ faellig: "2026-09-01", zugang: "2026-08-20", ersteMahnung: "2026-09-10", verbraucher: true, hinweisInRechnung: false, kalenderdatumVereinbart: false }).datum).toBe("2026-09-11");
    expect(verzugsbeginn({ faellig: "2026-09-01", zugang: "2026-08-20", verbraucher: true, hinweisInRechnung: false, kalenderdatumVereinbart: true }).datum).toBe("2026-09-02");
  });
  it("Verjährung zum 31.12. des dritten Folgejahres", () => {
    expect(verjaehrung("2026-03-15")).toBe("2029-12-31");
  });
});

describe("Kleinunternehmer-Wächter", () => {
  const monate = (x: number) => Array(12).fill(x);
  it("Gründungsjahr: 25.000 €-Grenze, Überschreiten im Monat erkannt", () => {
    const r = pruefeKleinunternehmer({ gruendungsjahr: true, vorjahr: 0, monate: monate(4000), bisMonat: 8 });
    expect(r.grenze).toBe(25000);
    expect(r.status).toBe("ueberschritten");
    expect(r.monatUeberschritten).toBe(7);
  });
  it("Normaljahr: Prognose, wann 100.000 € erreicht werden", () => {
    const r = pruefeKleinunternehmer({ gruendungsjahr: false, vorjahr: 20000, monate: monate(9000), bisMonat: 6 });
    expect(r.status).toBe("warnung");
    expect(r.prognoseMonat).toBe(12);
    expect(r.folgejahrKu).toBe(false);
  });
  it("Vorjahr über 25.000 € → dieses Jahr kein Kleinunternehmer", () => {
    expect(pruefeKleinunternehmer({ gruendungsjahr: false, vorjahr: 26000, monate: monate(100), bisMonat: 3 }).status).toBe("kein-ku");
  });
  it("Ruhig unter der Grenze", () => {
    const r = pruefeKleinunternehmer({ gruendungsjahr: false, vorjahr: 10000, monate: monate(1000), bisMonat: 6 });
    expect(r.status).toBe("ku");
    expect(r.folgejahrKu).toBe(true);
  });
});
