import { describe, it, expect } from "vitest";
import { pruefeGruendungszuschuss, rechneGruendungszuschuss, type GzAntworten } from "@/lib/gruendungszuschuss";
import { GRUENDER_EVENTS, GRUENDER_FRISTEN, aktuelleEvents } from "@/data/gruenderEvents";

const passt: GzAntworten = {
  algAnspruch: true,
  restTage: 240,
  stunden: 40,
  sperrzeit: false,
  schonGestartet: false,
  foerderungLetzte24: false,
  rentenalter: false,
  behinderung: false,
  eigenkuendigung: false,
};

describe("Gründungszuschuss-Prüfung (§ 93 SGB III)", () => {
  it("grün, wenn alle Voraussetzungen erfüllt sind", () => {
    expect(pruefeGruendungszuschuss(passt).ampel).toBe("gruen");
  });

  it("150 Tage Restanspruch sind die Grenze – 149 reicht nicht, 150 schon", () => {
    expect(pruefeGruendungszuschuss({ ...passt, restTage: 149 }).ampel).toBe("rot");
    expect(pruefeGruendungszuschuss({ ...passt, restTage: 150 }).ampel).toBe("gruen");
  });

  it("mit anerkannter Behinderung entfällt die 150-Tage-Grenze (§ 116 Abs. 7)", () => {
    expect(pruefeGruendungszuschuss({ ...passt, restTage: 40, behinderung: true }).ampel).toBe("gruen");
  });

  it("unter 15 Wochenstunden ist es Nebenerwerb", () => {
    expect(pruefeGruendungszuschuss({ ...passt, stunden: 14 }).ampel).toBe("rot");
    expect(pruefeGruendungszuschuss({ ...passt, stunden: 15 }).ampel).toBe("gruen");
  });

  it.each([
    ["sperrzeit", { sperrzeit: true }],
    ["schon gestartet", { schonGestartet: true }],
    ["Förderung in den letzten 24 Monaten", { foerderungLetzte24: true }],
    ["Regelaltersgrenze", { rentenalter: true }],
    ["kein ALG I", { algAnspruch: false }],
  ])("Ausschluss: %s", (_, aenderung) => {
    expect(pruefeGruendungszuschuss({ ...passt, ...aenderung }).ampel).toBe("rot");
  });

  it("Eigenkündigung ist kein Ausschluss, aber ein Warnsignal", () => {
    expect(pruefeGruendungszuschuss({ ...passt, eigenkuendigung: true }).ampel).toBe("gelb");
  });

  it("offen, solange Pflichtfragen fehlen", () => {
    expect(pruefeGruendungszuschuss({ ...passt, stunden: null }).ampel).toBe("offen");
  });

  it("weist immer auf die Ermessensleistung hin", () => {
    expect(pruefeGruendungszuschuss(passt).befunde.some((b) => b.quelle === "FW 93.02")).toBe(true);
  });
});

describe("Gründungszuschuss-Rechner (§ 94 SGB III)", () => {
  it("6 × (ALG + 300) plus 9 × 300", () => {
    const r = rechneGruendungszuschuss(1500, 300);
    expect(r.phase1Monat).toBe(1800);
    expect(r.phase1Summe).toBe(10800);
    expect(r.phase2Summe).toBe(2700);
    expect(r.gesamt).toBe(13500);
    expect(r.restNachPhase1).toBe(120);
  });

  it("ohne Phase 2 nur die sechs Monate", () => {
    expect(rechneGruendungszuschuss(1000, null, false).gesamt).toBe(7800);
  });
});

describe("Event- und Fristendaten", () => {
  it("Slugs sind eindeutig", () => {
    const slugs = [...GRUENDER_EVENTS.map((e) => e.slug), ...aktuelleEvents("2026-10-07").map((e) => e.slug)];
    const kuratiert = GRUENDER_EVENTS.map((e) => e.slug);
    expect(new Set(kuratiert).size).toBe(kuratiert.length);
    expect(slugs.length).toBeGreaterThan(kuratiert.length);
    const fristen = GRUENDER_FRISTEN.map((f) => f.slug);
    expect(new Set(fristen).size).toBe(fristen.length);
  });

  it("jeder Eintrag hat eine https-URL und ein gültiges Datum", () => {
    for (const e of [...GRUENDER_EVENTS, ...GRUENDER_FRISTEN]) {
      expect(e.url).toMatch(/^https:\/\//);
    }
    for (const e of aktuelleEvents("2026-10-07")) {
      if (e.datum) expect(e.datum).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      if (e.datumBis) expect(e.datumBis >= e.datum!).toBe(true);
    }
  });

  it("vergangene Einzeltermine fallen weg, wiederkehrende bleiben ohne Datum", () => {
    const spaeter = aktuelleEvents("2027-12-31");
    expect(spaeter.find((e) => e.slug === "degut-2026")).toBeUndefined();
    const leipzig = spaeter.find((e) => e.slug === "ihk-leipzig-gruenderabend");
    expect(leipzig?.datum).toBeUndefined();
  });
});
