import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// SEO-Audit N5 (22.11.2026): Interne Links dürfen keine UTM-Parameter tragen.
// checkoutAttribution() liest UTMs zuerst aus der aktuellen URL – ein interner
// Link wie /preise?utm_source=tool überschreibt sonst die echte Herkunft
// (Google, Social, Newsletter) im Checkout und erzeugt Parameter-Duplikate.
// Externe Ziele (Schwester-Marken, Einbettung auf fremden Seiten) bleiben erlaubt.

function dateien(ordner: string): string[] {
  return readdirSync(ordner).flatMap((n) => {
    const p = join(ordner, n);
    if (statSync(p).isDirectory()) return n === "test" ? [] : dateien(p);
    return /\.(tsx?|json)$/.test(n) ? [p] : [];
  });
}

describe("interne Links ohne UTM", () => {
  it("kein Pfad /…?…utm_ in src", () => {
    const intern = /["'`]\/(?!\/)[^"'`\s]*\?[^"'`\s]*utm_/;
    const funde = dateien("src").flatMap((f) =>
      readFileSync(f, "utf-8")
        .split("\n")
        .map((z, i) => (intern.test(z) ? `${f}:${i + 1}: ${z.trim().slice(0, 120)}` : null))
        .filter((x): x is string => x !== null),
    );
    expect(funde).toEqual([]);
  });

  it("gruenderx.de-Links ohne UTM, außer der Einbettung auf fremden Seiten", () => {
    const eigen = /https:\/\/(www\.)?gruenderx\.de\/[^"'`\s]*\?[^"'`\s]*utm_/;
    const funde = dateien("src")
      .filter((f) => !f.endsWith("EinbettenLucid.tsx"))
      .filter((f) => eigen.test(readFileSync(f, "utf-8")));
    expect(funde).toEqual([]);
  });
});
