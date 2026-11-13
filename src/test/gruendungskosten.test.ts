import { describe, expect, it } from "vitest";
import { FREE_TOOL_BY_SLUG } from "@/lib/freetools";
import {
  gebuehrTabelleB,
  wertGebuehr,
  gruendungskosten,
  gkBeispielZeilen,
  gruendungskostenConfig as cfg,
} from "@/lib/freetools/gruendungskosten";

// Sollwerte: Anlage 2 zu § 34 Abs. 3 GNotKG, Tabelle B (Fundstelle BGBl. 2025 I Nr. 109, S. 18),
// abgerufen am 13.11.2026 von gesetze-im-internet.de/gnotkg/anlage_2.html. Jede Zeile der amtlichen Tabelle.
const ANLAGE_2_TABELLE_B: [number, number][] = [
  [500, 15], [1_000, 19], [1_500, 23], [2_000, 27], [3_000, 33], [4_000, 39], [5_000, 45], [6_000, 51], [7_000, 57],
  [8_000, 63], [9_000, 69], [10_000, 75], [13_000, 83], [16_000, 91], [19_000, 99], [22_000, 107], [25_000, 115],
  [30_000, 125], [35_000, 135], [40_000, 145], [45_000, 155], [50_000, 165], [65_000, 192], [80_000, 219],
  [95_000, 246], [110_000, 273], [125_000, 300], [140_000, 327], [155_000, 354], [170_000, 381], [185_000, 408],
  [200_000, 435], [230_000, 485], [260_000, 535], [290_000, 585], [320_000, 635], [350_000, 685], [380_000, 735],
  [410_000, 785], [440_000, 835], [470_000, 885], [500_000, 935], [550_000, 1_015], [600_000, 1_095],
  [650_000, 1_175], [700_000, 1_255], [750_000, 1_335], [800_000, 1_415], [850_000, 1_495], [900_000, 1_575],
  [950_000, 1_655], [1_000_000, 1_735], [1_050_000, 1_815], [1_100_000, 1_895], [1_150_000, 1_975],
  [1_200_000, 2_055], [1_250_000, 2_135], [1_300_000, 2_215], [1_350_000, 2_295], [1_400_000, 2_375],
  [1_450_000, 2_455], [1_500_000, 2_535], [1_550_000, 2_615], [1_600_000, 2_695], [1_650_000, 2_775],
  [1_700_000, 2_855], [1_750_000, 2_935], [1_800_000, 3_015], [1_850_000, 3_095], [1_900_000, 3_175],
  [1_950_000, 3_255], [2_000_000, 3_335], [2_050_000, 3_415], [2_100_000, 3_495], [2_150_000, 3_575],
  [2_200_000, 3_655], [2_250_000, 3_735], [2_300_000, 3_815], [2_350_000, 3_895], [2_400_000, 3_975],
  [2_450_000, 4_055], [2_500_000, 4_135], [2_550_000, 4_215], [2_600_000, 4_295], [2_650_000, 4_375],
  [2_700_000, 4_455], [2_750_000, 4_535], [2_800_000, 4_615], [2_850_000, 4_695], [2_900_000, 4_775],
  [2_950_000, 4_855], [3_000_000, 4_935],
];

describe("Tabelle B GNotKG gegen die amtliche Anlage 2", () => {
  it("trifft alle 92 Zeilen der Anlage 2 auf den Euro", () => {
    expect(ANLAGE_2_TABELLE_B).toHaveLength(92);
    for (const [wert, soll] of ANLAGE_2_TABELLE_B) expect([wert, gebuehrTabelleB(wert)]).toEqual([wert, soll]);
  });

  it("zählt jeden angefangenen Betrag (§ 34 Abs. 2): 1 € über der Stufe = nächste Zeile", () => {
    for (let i = 0; i < ANLAGE_2_TABELLE_B.length - 1; i++) {
      expect(gebuehrTabelleB(ANLAGE_2_TABELLE_B[i][0] + 1)).toBe(ANLAGE_2_TABELLE_B[i + 1][1]);
    }
    expect(gebuehrTabelleB(1)).toBe(15);
  });

  it("Mindestgebühr 15 € (§ 34 Abs. 5), Mindest- und Höchstbeträge der KV-Nummern, Rundung auf Cent", () => {
    expect(wertGebuehr(1_000, 0.2)).toBe(15); // 0,2 × 19 = 3,80 → 15
    expect(wertGebuehr(1_000, 1.0, 60)).toBe(60); // KV 21200
    expect(wertGebuehr(1_000, 2.0, 120)).toBe(120); // KV 21100
    expect(wertGebuehr(25_000, 0.5, 30)).toBe(57.5); // KV 24102
    expect(wertGebuehr(3_000_000, 0.2, 15, 125)).toBe(125); // KV 22114 höchstens 125 €
    expect(wertGebuehr(3_000_000, 0.5, 15, 250)).toBe(250); // KV 22113 höchstens 250 €
    expect(wertGebuehr(75_000, 0.2)).toBe(43.8);
  });
});

describe("Gründungskosten GmbH/UG – jede Position aus dem Gesetz", () => {
  it("GmbH, 2 Gesellschafter, 25.000 €, Satzung: Mindestwert 30.000 € (§ 107 Abs. 1), 2,0 + Liste 0,5 + Anmeldung 0,5 + XML 0,2", () => {
    const r = gruendungskosten({ form: "gmbh", gesellschafter: 2, stammkapital: 25_000, art: "satzung" });
    expect(r.notar.map((p) => p.betrag)).toEqual([250, 62.5, 62.5, 25]); // 125 € × 2,0 / 0,5 / 0,5 / 0,2
    expect(r.notar[0].norm).toContain("KV 21100");
    expect(r.notarGebuehren).toBe(400);
    expect(r.auslagen).toBe(37.5); // 20 € (Kappung) + 20 % von 87,50 €
    expect(r.ust).toBe(83.13); // 19 % von 437,50 €
    expect(r.notarBrutto).toBe(520.63);
    expect(r.gericht?.betrag).toBe(225); // Nr. 2100 HRegGebV
    expect(r.summe).toBe(745.63);
  });

  it("GmbH, 1 Gesellschafter, 25.000 €, Musterprotokoll: kein Mindestwert (§ 105 Abs. 6), 1,0-Gebühr, keine Liste", () => {
    const r = gruendungskosten({ form: "gmbh", gesellschafter: 1, stammkapital: 25_000, art: "muster" });
    expect(r.notar.map((p) => p.betrag)).toEqual([115, 57.5, 23]);
    expect(r.notar[0].norm).toContain("KV 21200");
    expect(r.auslagen).toBe(36.1); // 20 € + 20 % von 80,50 €
    expect(r.notarBrutto).toBe(275.6);
    expect(r.summe).toBe(500.6);
  });

  it("GmbH, 1 Gesellschafter, Satzung: Liste nur 0,3 (KV 22111)", () => {
    const r = gruendungskosten({ form: "gmbh", gesellschafter: 1, stammkapital: 25_000, art: "satzung" });
    expect(r.notar.map((p) => p.betrag)).toEqual([125, 37.5, 62.5, 25]);
    expect(r.summe).toBe(567.13);
  });

  it("UG 1.000 € mit Musterprotokoll: Mindestgebühren 60 / 120 €, 30 €, 15 €", () => {
    const eins = gruendungskosten({ form: "ug", gesellschafter: 1, stammkapital: 1_000, art: "muster" });
    expect(eins.notar.map((p) => p.betrag)).toEqual([60, 30, 15]);
    expect(eins.auslagen).toBe(21); // 12 € + 9 €
    expect(eins.summe).toBe(374.94);
    const zwei = gruendungskosten({ form: "ug", gesellschafter: 2, stammkapital: 1_000, art: "muster" });
    expect(zwei.notar.map((p) => p.betrag)).toEqual([120, 30, 15]);
    expect(zwei.summe).toBe(455.86);
  });

  it("UG mit Satzung: Mindestwert 30.000 € gilt auch bei 1.000 € Stammkapital", () => {
    const r = gruendungskosten({ form: "ug", gesellschafter: 2, stammkapital: 1_000, art: "satzung" });
    expect(r.notar.map((p) => p.betrag)).toEqual([250, 62.5, 62.5, 25]);
  });

  it("Musterprotokoll mit 4 Gesellschaftern gibt es nicht → Satzung + Hinweis (§ 2 Abs. 1a GmbHG)", () => {
    const r = gruendungskosten({ form: "gmbh", gesellschafter: 4, stammkapital: 50_000, art: "muster" });
    expect(r.art).toBe("satzung");
    expect(r.hinweise.join(" ")).toContain("§ 2 Abs. 1a GmbHG");
    expect(r.notar.map((p) => p.betrag)).toEqual([330, 82.5, 82.5, 33]); // 165 € bei 50.000 €
  });

  it("GmbH unter 25.000 € wird auf das Mindeststammkapital gehoben", () => {
    const r = gruendungskosten({ form: "gmbh", gesellschafter: 1, stammkapital: 10_000, art: "muster" });
    expect(r.stammkapital).toBe(25_000);
    expect(r.hinweise.join(" ")).toContain("§ 5 Abs. 1 GmbHG");
  });

  it("weitere Notarkosten und Gewerbegebühr sind reine Eingaben", () => {
    const r = gruendungskosten({ form: "gmbh", gesellschafter: 1, stammkapital: 25_000, art: "muster", gewerbeGebuehr: 31, weitereNotar: 100 });
    expect(r.summe).toBe(631.6);
  });
});

describe("Einzelunternehmen und GbR", () => {
  it("ohne Eintragung: kein Notar, kein Gericht, nur die eingegebene Gewerbegebühr", () => {
    expect(gruendungskosten({ form: "einzel", gewerbeGebuehr: 26 }).summe).toBe(26);
    expect(gruendungskosten({ form: "einzel" }).summe).toBe(0);
    const gbr = gruendungskosten({ form: "gbr", gesellschafter: 3, gewerbeGebuehr: 26 });
    expect(gbr.gewerbe).toBe(78); // je Gesellschafter eine Anzeige
    expect(gbr.notar).toHaveLength(0);
  });

  it("e. K.: Wert 30.000 € (§ 105 Abs. 3 Nr. 1), Gericht 105 € (Nr. 1100 HRegGebV)", () => {
    const r = gruendungskosten({ form: "einzel", register: true });
    expect(r.notar.map((p) => p.betrag)).toEqual([62.5, 25]);
    expect(r.gericht?.betrag).toBe(105);
    expect(r.summe).toBe(229.95);
  });

  it("eGbR: 45.000 € + 15.000 € je weiterem Gesellschafter; Gericht 150 € + 60 € ab dem vierten", () => {
    const zwei = gruendungskosten({ form: "gbr", gesellschafter: 2, register: true });
    expect(zwei.notar.map((p) => p.betrag)).toEqual([77.5, 31]); // 155 € bei 45.000 €
    expect(zwei.gericht?.betrag).toBe(150);
    const vier = gruendungskosten({ form: "gbr", gesellschafter: 4, register: true });
    expect(vier.notar.map((p) => p.betrag)).toEqual([109.5, 43.8]); // 219 € bei 75.000 €
    expect(vier.gericht?.betrag).toBe(210);
  });
});

describe("Seite und Ergebnistext", () => {
  const gen = FREE_TOOL_BY_SLUG["gruendungskosten-rechner"].generate;

  it("Ergebnis nennt jede Position mit Norm und die Summe", () => {
    const t = gen({ legalForm: "gmbh", gesellschafter: "2", stammkapital: "25.000", art: "satzung", gewerbe: "33", marketing: "1.000" });
    for (const x of ["KV 21100", "KV 22110", "KV 24102", "KV 22114", "KV 32005", "Nr. 2100 HRegGebV", "520,63 €", "778,63 €", "1.778,63 €", "Stammkapital von 25.000 €"]) {
      expect(t).toContain(x);
    }
    expect(t).not.toContain("Schätzwert");
  });

  it("Einzelunternehmen ohne Gebühr: Hinweis statt erfundener Zahl", () => {
    const t = gen({ legalForm: "einzel" });
    expect(t).toContain("Kein Notar nötig");
    expect(t).toContain("Keine Gebühr eingetragen");
    expect(t).toContain("zusammen: 0 €");
  });

  it("Kurzantwort-Tabelle stammt aus derselben Rechnung", () => {
    const z = gkBeispielZeilen();
    expect(z).toHaveLength(5);
    expect(z[0].slice(1)).toEqual(["105,00 €", "149,94 €", "225,00 €", "374,94 €"]);
    expect(z[4].slice(1)).toEqual(["400,00 €", "520,63 €", "225,00 €", "745,63 €"]);
    expect(cfg.kurzantwort?.text.join(" ")).toContain("374,94 €");
    expect(cfg.seo.faqs.map((f) => f.a).join(" ")).toContain("567,13 €");
  });

  it("Gate-Vorgaben: Title 30–65 mit Keyword, H1 mit Keyword, ≥ 800 Wörter, ≥ 3 FAQ, ≥ 5 Links, Quellen mit Stand", () => {
    expect(cfg.seo.title.length).toBeGreaterThanOrEqual(30);
    expect(cfg.seo.title.length).toBeLessThanOrEqual(65);
    expect(cfg.seo.title.toLowerCase()).toContain("gründungskosten-rechner");
    expect(cfg.heroTitle.toLowerCase()).toContain("gründungskosten-rechner");
    expect(cfg.seo.description.length).toBeGreaterThanOrEqual(120);
    expect(cfg.seo.description.length).toBeLessThanOrEqual(160);
    const text = [...(cfg.kurzantwort?.text || []), ...(cfg.seoSections || []).flatMap((x) => [x.heading, ...x.body]), ...cfg.seo.faqs.flatMap((f) => [f.q, f.a])].join(" ");
    expect(text.split(/\s+/).length).toBeGreaterThanOrEqual(800);
    expect(cfg.seo.faqs.length).toBeGreaterThanOrEqual(3);
    expect((cfg.links || []).length).toBeGreaterThanOrEqual(5);
    expect((cfg.quellen || []).length).toBeGreaterThanOrEqual(8);
    expect(cfg.stand).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
    expect(cfg.format).toBe("rechner");
  });
});
