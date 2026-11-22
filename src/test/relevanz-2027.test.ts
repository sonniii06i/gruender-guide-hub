import { describe, expect, it } from "vitest";
import { eRechnungPflicht, kiPflichten, ksaCheck } from "@/lib/relevanz2027";
import { STICHTAGE, WERTE_2027, stichtageZwischen } from "@/data/stichtage";
import { fristenFuer, type FristProfil } from "@/lib/steuerFristen";

describe("KI-Kennzeichnung (Art. 50 KI-VO)", () => {
  it("Anbieter mit Alt-Tool: Nachfrist 02.12.2026 für die maschinenlesbare Markierung", () => {
    const [p] = kiPflichten({ rolle: "anbieter", inhalte: ["bild"], vorStichtag: true });
    expect(p.stufe).toBe("ja");
    expect(p.ab).toBe("2026-12-02");
    expect(p.grundlage).toContain("Art. 111 Abs. 4");
  });
  it("Anbieter mit neuem Tool: seit 02.08.2026, Chatbot nach Abs. 1 ohne Nachfrist", () => {
    const r = kiPflichten({ rolle: "anbieter", inhalte: ["text", "chatbot"], vorStichtag: true });
    expect(r.find((x) => x.inhalt === "chatbot")?.ab).toBe("2026-08-02");
    expect(kiPflichten({ rolle: "anbieter", inhalte: ["text"], vorStichtag: false })[0].ab).toBe("2026-08-02");
  });
  it("Betreiber: nur Deepfakes kennzeichnen, bei Kunst eingeschränkt", () => {
    expect(kiPflichten({ rolle: "betreiber", inhalte: ["bild"], deepfake: false })[0].stufe).toBe("nein");
    expect(kiPflichten({ rolle: "betreiber", inhalte: ["bild"] })[0].stufe).toBe("offen");
    expect(kiPflichten({ rolle: "betreiber", inhalte: ["video"], deepfake: true })[0].stufe).toBe("offen");
    expect(kiPflichten({ rolle: "betreiber", inhalte: ["video"], deepfake: true, kunst: false })[0].stufe).toBe("ja");
    expect(kiPflichten({ rolle: "betreiber", inhalte: ["video"], deepfake: true, kunst: true })[0].stufe).toBe("eingeschraenkt");
  });
  it("Betreiber Text: nur bei Information der Öffentlichkeit ohne redaktionelle Verantwortung", () => {
    expect(kiPflichten({ rolle: "betreiber", inhalte: ["text"] })[0].stufe).toBe("offen");
    expect(kiPflichten({ rolle: "betreiber", inhalte: ["text"], textOeffentlich: false })[0].stufe).toBe("nein");
    expect(kiPflichten({ rolle: "betreiber", inhalte: ["text"], textOeffentlich: true, redaktion: true })[0].stufe).toBe("nein");
    expect(kiPflichten({ rolle: "betreiber", inhalte: ["text"], textOeffentlich: true, redaktion: false })[0].stufe).toBe("ja");
  });
  it("Private Nutzung löst keine Pflicht aus", () => {
    expect(kiPflichten({ rolle: "privat", inhalte: ["bild", "chatbot"] }).every((x) => x.stufe === "nein")).toBe(true);
  });
});

describe("E-Rechnung (§ 27 Abs. 38 UStG)", () => {
  const basis = { b2bInland: true, b2c: false, ausland: false, kleinunternehmer: false, umsatz2026: 0 };
  it("über 800.000 € Vorjahresumsatz: Pflicht ab 01.01.2027", () => {
    expect(eRechnungPflicht({ ...basis, umsatz2026: 800_001 }).ab).toBe("2027-01-01");
  });
  it("genau 800.000 € zählt noch als darunter: Pflicht ab 01.01.2028", () => {
    const r = eRechnungPflicht({ ...basis, umsatz2026: 800_000 });
    expect(r.ab).toBe("2028-01-01");
    expect(r.papierBis).toBe("2027-12-31");
  });
  it("Kleinunternehmer befreit, nur B2C/Ausland keine Pflicht", () => {
    expect(eRechnungPflicht({ ...basis, kleinunternehmer: true, umsatz2026: 2_000_000 }).art).toBe("befreit");
    expect(eRechnungPflicht({ ...basis, b2bInland: false, b2c: true }).art).toBe("keine");
  });
});

describe("Künstlersozialabgabe (§§ 24, 27 KSVG)", () => {
  it("Eigenwerbung bis 1.000 € frei, darüber 4,9 % für 2026", () => {
    expect(ksaCheck({ typ: "eigenwerbung", summe2026: 1000 }).pflichtig).toBe(false);
    const r = ksaCheck({ typ: "eigenwerbung", summe2026: 12_000 });
    expect(r.pflichtig).toBe(true);
    expect(r.abgabe2026).toBe(588);
    expect(r.vorauszahlung2027).toBe(50); // 12.000 / 12 × 5,0 %
  });
  it("Verwerter nach Abs. 1 ohne Grenze, Vorauszahlung bis 40 € entfällt", () => {
    const r = ksaCheck({ typ: "verwerter", summe2026: 500 });
    expect(r.pflichtig).toBe(true);
    expect(r.vorauszahlungEntfaellt).toBe(true);
    expect(r.vorauszahlung2027).toBe(0);
  });
  it("Nutzung nur bei bis zu drei Veranstaltungen: keine Abgabe", () => {
    expect(ksaCheck({ typ: "nutzung", summe2026: 5000, nurVeranstaltungen: true }).pflichtig).toBe(false);
  });
});

describe("Stichtage und Werte 2027", () => {
  it("enthält die drei Termine aus dem Relevanz-Radar mit Quelle", () => {
    for (const d of ["2026-12-02", "2027-01-01", "2027-03-31"]) expect(STICHTAGE.some((s) => s.datum === d)).toBe(true);
    expect(STICHTAGE.every((s) => s.quellen.length > 0 && s.link.startsWith("/cockpit/"))).toBe(true);
    expect(stichtageZwischen("2026-11-22", "2026-12-06").map((s) => s.datum)).toEqual(["2026-12-02"]);
  });
  it("jeder Wert hat eine Quelle, Rechengrößen tragen den Vorbehalt", () => {
    expect(WERTE_2027.every((w) => w.quellen.length > 0)).toBe(true);
    expect(WERTE_2027.find((w) => w.id === "bbg_kv")?.stand).toBe("verkuendungOffen");
  });
  it("Steuerkalender nimmt die KSA-Meldung am 31.03. auf, wenn angehakt", () => {
    const p: FristProfil = { rechtsform: "einzel", ust: "quartal", dauerfrist: false, ekVorauszahlung: false, gewstVorauszahlung: false, mitarbeiter: "keine", lohnsteuer: "monat", zm: "keine", steuerberater: false, gruendungsjahr: 2025, ksa: true };
    const f = fristenFuer(p, "2026-11-22", 12).fristen.find((x) => x.art === "ksa");
    expect(f?.datum).toBe("2027-03-31");
    expect(fristenFuer({ ...p, ksa: false }, "2026-11-22", 12).fristen.some((x) => x.art === "ksa")).toBe(false);
  });
});
