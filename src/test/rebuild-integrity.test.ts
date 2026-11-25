import { describe, expect, it } from "vitest";
import { PLAYBOOKS, getPlaybook } from "@/data/playbooks";
import { LISTICLES, getListicle } from "@/data/listicles";
import { QUIZZES, getQuiz } from "@/data/quizzes";
import { ZIELGRUPPEN } from "@/data/zielgruppen";
import { empfohleneGuides } from "@/lib/guideEmpfehlung";
import { ALTER_OPTIONEN } from "@/lib/onboarding";
import { getLevelInfo } from "@/lib/gamification";

/**
 * Harter Brand-Voice- & Human-Writing-Guard (gruenderx_marke.json Stand 20.11.2026).
 * Prüft alle neuen und überarbeiteten Datenquellen gegen die Verbotswörter und Muster.
 */
const BANNED_WORDS = [
  "fehlerfrei",
  "steuerfrei",
  "Steuern sparen",
  "Steuertrick",
  "Steuer-Trick",
  "abmahnsicher",
  "Abmahnschutz",
  "rechtssicher",
  "Steuerfahndung",
  "Geheimtipp",
  "Side Hustle",
  "reich werden",
  "finanzielle Freiheit",
  "Erfolgsgeheimnis",
  "Traumleben",
  "Mindset",
  "Gamechanger",
  "garantiert",
  "unschlagbar",
  "stressfrei",
  "Testsieger",
  "Autopilot",
  "nahtlos",
  "echter Mehrwert",
  "echten Mehrwert",
  "ganzheitlich",
  "maßgeschneidert",
  "zukunftsweisend",
  "Am Ende des Tages",
  "Lass uns eintauchen",
  "neue Maßstäbe",
  "entfesseln",
  "Steuerfalle",
  "Abmahnfalle",
  "die Wahrheit über",
  "kinderleicht",
  "AnwaltX",
];

const BANNED_PATTERNS: [string, RegExp][] = [
  ["VERFUEGBARKEIT", /24\/7|rund um die uhr/i],
  ["NICHT_SONDERN", /\b(nicht|kein\w*|selten)\b[^.!?\n]{0,80}\bsondern\b/i],
  ["GEDANKENSTRICH", /[–—]/],
  ["DROHUNG", /sonst droht|droht dir|drohen dir|bevor es zu spät ist|amazon sperrt|sperrt amazon/i],
  ["FALSCHE_NAEHE", /wir kennen (das|es) (doch )?alle|wer kennt es nicht/i],
  ["HYPE_EMOJI", /🚀/],
];

describe("GründerX Rebuild Integrität & Brand Voice", () => {
  it("Amex US Guide ist vollständig mit echten Praxis-Fakten vorhanden", () => {
    const amex = getPlaybook("amex-us-beantragen");
    expect(amex).toBeDefined();
    expect(amex!.steps.length).toBeGreaterThanOrEqual(8);
    const full = JSON.stringify(amex);
    expect(full).toContain("Cloud Residence");
    expect(full).toContain("Tello");
    expect(full).toContain("Global Transfer");
    expect(full).toContain("Chase");
    expect(full).toContain("Bank of America");
  });

  it("Amex US Privat Listicle enthält alle Kern-Vorteile, Vergleichstabelle und ehrliche Voraussetzungen", () => {
    const l = getListicle("amex-us-privat-vorteile");
    expect(l).toBeDefined();
    expect(l!.punkte.length).toBe(7);
    expect(l!.vergleichTabelle?.zeilen.length).toBeGreaterThanOrEqual(5);
    const full = JSON.stringify(l);
    expect(full).toContain("Global Transfer");
    expect(full).toContain("zweimal");
    expect(full).toContain("4x");
    expect(full).toContain("Hilton Honors");
    expect(full).toContain("Avios");
    expect(full).toContain("500.000");
    expect(full).toContain("Cloud Residence");
    expect(full).toContain("Tello");
    expect(full).toContain("Wise");
  });

  it("Zielgruppen decken 12 bis 70 Jahre und alle Kern-Use-Cases ab", () => {
    const slugs = new Set(ZIELGRUPPEN.map((z) => z.slug));
    for (const req of [
      "influencer",
      "tiktok-shop",
      "amazon-haendler",
      "u18-gruenden",
      "studenten-azubis",
      "nebengewerbe",
      "webseite-und-app",
      "gruenden-ab-50",
      "us-setup",
      "freelancer-agentur",
    ]) {
      expect(slugs.has(req), `Fehlende Zielgruppe: ${req}`).toBe(true);
    }
  });

  it("Onboarding-Altersgruppen (12 bis 70) liefern sinnvolle Guide-Empfehlungen", () => {
    expect(ALTER_OPTIONEN.length).toBe(5);
    const u18 = empfohleneGuides("", 4, null, "12-17");
    expect(u18.some((g) => g.slug === "einzelunternehmen-gruendung")).toBe(true);
    const bestAger = empfohleneGuides("", 4, null, "55-70");
    expect(bestAger.some((g) => g.slug === "freiberufler-anmelden")).toBe(true);
    expect(PLAYBOOKS.length).toBe(81);
  });

  it("Quizze & Umfragen sind vollständig und haben Ergebnisprofile", () => {
    expect(QUIZZES.length).toBeGreaterThanOrEqual(6);
    expect(getQuiz("gruendertyp")).toBeDefined();
    expect(getQuiz("us-amex-check")).toBeDefined();
    expect(getQuiz("gruender-barometer")?.kind).toBe("umfrage");
    for (const q of QUIZZES) {
      expect(q.fragen.length).toBeGreaterThanOrEqual(3);
      expect(q.profile.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("Gamification Level-Berechnung funktioniert monoton", () => {
    expect(getLevelInfo(0).level).toBe(1);
    expect(getLevelInfo(450).level).toBe(3);
    expect(getLevelInfo(7500).level).toBe(10);
  });

  it("Brand Voice & Human Writing Guard: 0 Treffer bei Wörtern und Mustern in neuen Inhalten", () => {
    const neueZielgruppen = ZIELGRUPPEN.filter((z) =>
      ["u18-gruenden", "studenten-azubis", "nebengewerbe", "webseite-und-app", "gruenden-ab-50", "us-setup", "freelancer-agentur"].includes(z.slug),
    );
    const amexPlaybook = getPlaybook("amex-us-beantragen");
    const payload = JSON.stringify({ LISTICLES, QUIZZES, neueZielgruppen, amexPlaybook });

    for (const word of BANNED_WORDS) {
      expect(payload, `Verbotenes Wort gefunden: ${word}`).not.toMatch(new RegExp(word, "i"));
    }
    for (const [name, re] of BANNED_PATTERNS) {
      expect(payload, `Verbotenes Muster gefunden: ${name}`).not.toMatch(re);
    }
  });
});
