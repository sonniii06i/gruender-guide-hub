/**
 * Runde-2-Fixes (Bereich gx-front): Datenkonsistenz und nachgerechnete Werte.
 */
import { describe, it, expect } from "vitest";
import { HOLDING_STRUCTURES } from "@/data/holdingStructures";
import { deadlineStatus, DEADLINES_2026, US_CARDS, SWEET_SPOTS } from "@/data/usCreditCards";
import { ROADMAP_TASKS, taskMatches, type UserSetup } from "@/data/roadmapTasks";
import { CATEGORIES, categoryToolCount, TOOL_COUNT } from "@/data/features";
import { BWA_STRUCTURE } from "@/data/bwaStruktur";
import { STB_AVOID_LIST } from "@/data/stbPool";

describe("Holding-Szenarien rechnen in sich stimmig", () => {
  const alle = HOLDING_STRUCTURES.flatMap((s) => (s.taxScenarios ?? []).map((sc) => ({ s: s.slug, sc })));

  it("totalSteuer + privatNetto = opGewinn und effektivPct passt", () => {
    expect(alle.length).toBeGreaterThan(0);
    for (const { s, sc } of alle) {
      expect(sc.totalSteuer + sc.privatNetto, `${s}: ${sc.label}`).toBe(sc.opGewinn);
      expect(sc.effektivPct, `${s}: ${sc.label}`).toBeCloseTo((sc.totalSteuer / sc.opGewinn) * 100, 0);
    }
  });

  it("100 k thesauriert: 30.000 € KSt+GewSt + 5 % × 70.000 € × 30 % = 1.050 € → 31.050 €", () => {
    const sc = HOLDING_STRUCTURES.flatMap((s) => s.taxScenarios ?? []).find((x) => x.opGewinn === 100000)!;
    // 100.000 × 0,30 = 30.000; 70.000 × 0,05 = 3.500; 3.500 × 0,30 = 1.050
    expect(sc.totalSteuer).toBe(31050);
    expect(sc.privatNetto).toBe(68950);
  });

  it("500 k: 150.000 + 5.250 + 65.937,50 (26,375 % auf 250.000) = 221.187,50 → 221.188 €", () => {
    const sc = HOLDING_STRUCTURES.flatMap((s) => s.taxScenarios ?? []).find((x) => x.opGewinn === 500000)!;
    expect(sc.totalSteuer).toBe(Math.round(150000 + 350000 * 0.05 * 0.3 + 250000 * 0.26375));
    expect(sc.effektivPct).toBe(44.2);
  });

  it("keine 95-%-Freistellung für ETF/Streubesitz und kein § 21 UmwStG für IP-Übertragung", () => {
    const vv = HOLDING_STRUCTURES.find((s) => s.slug === "vermoegensverwaltung")!;
    expect(vv.taxImpact).toMatch(/Streubesitz/);
    expect(vv.pros.join(" ")).not.toMatch(/ETFs \/ Aktien direkt halten: Dividenden \+ Kursgewinne gehen in Holding \(1,5 %/);
    const ip = HOLDING_STRUCTURES.find((s) => s.slug === "ip-holding")!;
    expect(ip.setupSteps.join(" ")).not.toMatch(/steuerlich neutral via §21 UmwStG/);
  });
});

describe("US-Karten: Fristen und Kategorien", () => {
  it("deadlineStatus rechnet aus dem Datum", () => {
    const heute = new Date(2026, 9, 13);
    expect(deadlineStatus("01.10.2026", heute)).toBe("passed");
    expect(deadlineStatus("13.10.2026", heute)).toBe("upcoming");
    expect(deadlineStatus("20.05.2027", heute)).toBe("upcoming");
  });

  it("DEADLINES_2026 hat keinen hart kodierten Status mehr, der dem Datum widerspricht", () => {
    for (const d of DEADLINES_2026) expect(d.status).toBe(deadlineStatus(d.date));
  });

  it("Kategorie „nur EIN“ enthält keine Karte, die eine SSN verlangt", () => {
    const ein = US_CARDS.filter((c) => c.useCase === "business-ein");
    expect(ein.length).toBeGreaterThan(0);
    for (const c of ein) expect(c.needsSsn, c.id).toBe(false);
  });

  it("Sweet Spots: Cent/Punkt passt zu Wert/Punkten (± 0,1)", () => {
    for (const s of SWEET_SPOTS.filter((x) => x.punkte > 0)) {
      expect(Math.abs(s.centProPunkt - (s.realerWertEur / s.punkte) * 100), s.id).toBeLessThan(0.11);
    }
  });
});

describe("Roadmap: Fragebogen zur steuerlichen Erfassung für alle Rechtsformen", () => {
  const basis: UserSetup = { rechtsform: "gbr", ustStatus: "unsicher", euGeschaeft: false, b2b: false, bereitsAngemeldet: false, mitarbeiter: false };
  for (const rf of ["gbr", "ug-gmbh", "einzel-gewerbe", "freiberuf"] as const) {
    it(`${rf} bekommt eine FsE-Aufgabe`, () => {
      const treffer = ROADMAP_TASKS.filter((t) => taskMatches(t, { ...basis, rechtsform: rf }) && /Fragebogen zur steuerlichen Erfassung/.test(t.titel));
      expect(treffer.length).toBe(1);
    });
  }
  it("keine BfA und kein Penta mehr", () => {
    const text = JSON.stringify(ROADMAP_TASKS);
    expect(text).not.toMatch(/\bBfA\b/);
    expect(text).not.toMatch(/Penta/);
  });
});

describe("Werbezahlen und Kontenrahmen", () => {
  it("Tool-Zahlen je Kategorie zählen nur nutzbare Tools (Summe = TOOL_COUNT)", () => {
    const summe = CATEGORIES.reduce((n, c) => n + categoryToolCount(c.slug), 0);
    expect(summe).toBe(TOOL_COUNT);
  });

  it("BWA-Mapping: keine Kosten auf Porto (4910) und keine Erträge auf Erlöse 19 % außer der Erlösposition", () => {
    const pos = BWA_STRUCTURE.flatMap((c) => c.positions);
    expect(pos.filter((p) => p.skr03 === "4910")).toHaveLength(0);
    expect(pos.filter((p) => p.skr03 === "8400").map((p) => p.key)).toEqual(["erloese_19"]);
    expect(pos.find((p) => p.key === "sv")?.skr03).toBe("4130");
    expect(pos.find((p) => p.key === "anwalt")?.skr03).toBe("4950");
  });

  it("StB-Hinweisliste nennt keine einzelnen Kanzleien", () => {
    const text = JSON.stringify(STB_AVOID_LIST);
    expect(text).not.toMatch(/Felix1|Ecovis|Lüders|ETL/);
  });
});
