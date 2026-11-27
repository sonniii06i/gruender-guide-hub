/**
 * Funnel-Lauf 27.11.2026: Der Pfad-Wähler der Startseite verlinkte vier Quizze, die es nicht gibt
 * (/quiz/u18-start-check, /quiz/nebengewerbe-ready, /quiz/website-oder-app, /quiz/amex-us-check) →
 * „Quiz nicht gefunden" bzw. 404 beim Direktaufruf. Jeder fest verdrahtete Quiz- oder Umfrage-Link im
 * Quelltext muss auf einen Eintrag in QUIZZES zeigen, mit dem richtigen Präfix.
 */
import { describe, expect, it } from "vitest";
import { globSync, readFileSync } from "node:fs";
import { QUIZZES } from "@/data/quizzes";

describe("Quiz-Links im Quelltext", () => {
  it("zeigen alle auf ein vorhandenes Quiz", () => {
    const bekannt = new Set(QUIZZES.map((q) => `${q.routePrefix}/${q.slug}`));
    const dateien = (globSync as (p: string) => string[])("src/**/*.{ts,tsx}").filter(
      (d) => !/\.test\.|\/test\//.test(d),
    );
    expect(dateien.length).toBeGreaterThan(100);
    const funde: string[] = [];
    for (const d of dateien) {
      const q = readFileSync(d, "utf8");
      for (const m of q.matchAll(/["'`](\/(?:quiz|umfrage)\/[a-z0-9-]+)["'`#?]/g)) {
        if (!bekannt.has(m[1])) funde.push(`${d}: ${m[1]}`);
      }
    }
    expect(funde).toEqual([]);
  });
});
