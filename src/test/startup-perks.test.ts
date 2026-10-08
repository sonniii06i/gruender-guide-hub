import { describe, expect, it } from "vitest";
import { PERK_KATEGORIEN, STARTUP_PERKS } from "@/data/startupPerks";
import perksLive from "@/data/perksLive.json";

describe("Startup-Guthaben", () => {
  it("Slugs sind eindeutig und Links offiziell (https)", () => {
    const slugs = STARTUP_PERKS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of STARTUP_PERKS) expect(p.url, p.slug).toMatch(/^https:\/\//);
  });

  it("jedes Programm hat Prüfwörter, Voraussetzungen und ein Prüfdatum", () => {
    for (const p of STARTUP_PERKS) {
      expect(p.pruefWorte.length, p.slug).toBeGreaterThan(0);
      expect(p.voraussetzungen.length, p.slug).toBeGreaterThan(0);
      expect(p.geprueft, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(PERK_KATEGORIEN[p.kategorie], p.slug).toBeDefined();
    }
  });

  it("Nennwert nur, wenn der Text einen Betrag nennt", () => {
    for (const p of STARTUP_PERKS) if (p.wertUsd !== null) expect(p.wert, p.slug).toMatch(/\d/);
  });

  it("der Perk-Wächter kennt jedes Programm", () => {
    const live = (perksLive as { perks: Record<string, unknown> }).perks;
    for (const p of STARTUP_PERKS) expect(live[p.slug], `${p.slug} fehlt in perksLive.json – scripts/sync-perks.ts laufen lassen`).toBeDefined();
  });
});
