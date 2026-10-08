import { describe, it, expect } from "vitest";
import { bafaSatz, pruefeBafa, rechneBafa, rechneEinstiegsgeld, type BafaAntworten } from "@/lib/foerderRechner";

describe("BAFA-Beratungsförderung", () => {
  it("80 % in den neuen Ländern, 50 % im Westen inkl. Berlin", () => {
    expect(bafaSatz({ land: "SN", sonderregion: "keine" })).toBe(0.8);
    expect(bafaSatz({ land: "BE", sonderregion: "keine" })).toBe(0.5);
    expect(bafaSatz({ land: "BY", sonderregion: "keine" })).toBe(0.5);
  });

  it("Sonderregionen: Leipzig 50 %, Lüneburg und Trier 80 %", () => {
    expect(bafaSatz({ land: "SN", sonderregion: "leipzig" })).toBe(0.5);
    expect(bafaSatz({ land: "NI", sonderregion: "lueneburg" })).toBe(0.8);
    expect(bafaSatz({ land: "RP", sonderregion: "trier" })).toBe(0.8);
  });

  it("Deckel 3.500 €: höchstens 1.750 € (West) bzw. 2.800 € (Ost)", () => {
    expect(rechneBafa(5000, { land: "HE", sonderregion: "keine" }, true).zuschuss).toBe(1750);
    expect(rechneBafa(5000, { land: "TH", sonderregion: "keine" }, true).zuschuss).toBe(2800);
  });

  it("ohne Vorsteuerabzug wird brutto bemessen", () => {
    const r = rechneBafa(2000, { land: "NW", sonderregion: "keine" }, false);
    expect(r.bemessung).toBe(2380);
    expect(r.zuschuss).toBe(1190);
  });

  const ok: BafaAntworten = {
    kmu: true, sitzDe: true, ausgeschlosseneBranche: false, insolvenz: false,
    beratungBegonnen: false, ueberwiegendRechtSteuer: false, gruendungsDatum: "2024-01-01",
  };
  it("grün im Normalfall, rot nach Beratungsbeginn, rot nach Ablauf der Richtlinie", () => {
    expect(pruefeBafa(ok, "2026-10-07").ampel).toBe("gruen");
    expect(pruefeBafa({ ...ok, beratungBegonnen: true }, "2026-10-07").ampel).toBe("rot");
    expect(pruefeBafa(ok, "2027-01-02").ampel).toBe("rot");
  });
  it("Jungunternehmen: Informationsgespräch ist Pflicht (gelb)", () => {
    expect(pruefeBafa({ ...ok, gruendungsDatum: "2026-06-01" }, "2026-10-07").ampel).toBe("gelb");
  });
});

describe("Einstiegsgeld (ESGV)", () => {
  it("Alleinstehend, kurz arbeitslos: 50 % von 563 €", () => {
    const r = rechneEinstiegsgeld({ stufe: 1, weiterePersonen: 0, monateArbeitslos: 3, vermittlungshemmnisse: false, monate: 12 });
    expect(r.monatlich).toBe(281.5);
    expect(r.gesamt).toBe(3378);
  });

  it("Langzeitarbeitslos + 2 weitere Personen: 281,50 + 112,60 + 112,60", () => {
    const r = rechneEinstiegsgeld({ stufe: 1, weiterePersonen: 2, monateArbeitslos: 30, vermittlungshemmnisse: false, monate: 24 });
    expect(r.monatlich).toBe(506.7);
  });

  it("Deckel bei 100 % RBS 1 = 563 €, Dauer max. 24 Monate", () => {
    const r = rechneEinstiegsgeld({ stufe: 1, weiterePersonen: 5, monateArbeitslos: 30, vermittlungshemmnisse: false, monate: 36 });
    expect(r.monatlich).toBe(563);
    expect(r.gedeckelt).toBe(true);
    expect(r.monate).toBe(24);
  });

  it("Vermittlungshemmnisse: Zuschlag schon ab 6 Monaten", () => {
    const r = rechneEinstiegsgeld({ stufe: 1, weiterePersonen: 0, monateArbeitslos: 6, vermittlungshemmnisse: true, monate: 6 });
    expect(r.zuschlagLangzeit).toBe(112.6);
  });
});
