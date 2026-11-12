/**
 * Code FOUNDER: 20 % auf die ERSTE RECHNUNG – nicht „im ersten Monat“.
 * An der Live-Kasse gemessen am 12.11.2026: Monat 51,99 €, Jahr 519,92 €.
 * Wortlaut und Beträge kommen nur aus config/pricing.ts.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import {
  FOUNDER_CODE, FOUNDER_KURZ, FOUNDER_SATZ, PLANS, discountCents, founderFirstInvoiceCents,
} from "@/config/pricing";

const SRC = resolve(__dirname, "..");
/** Die einzigen Dateien, die den Wortlaut selbst formulieren dürfen. */
const ZENTRAL = new Set(["config/pricing.ts", "lib/freetools/rechtsformRabatt.ts"]);

const dateien = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return n === "test" || n === "data" ? [] : dateien(p);
    return /\.(ts|tsx)$/.test(n) && !/\.test\./.test(n) ? [p] : [];
  });

describe("FOUNDER: Rechnung wie Stripe", () => {
  it("rundet kaufmännisch auf den Cent der Rechnung", () => {
    expect(discountCents(6499, 20)).toBe(1300);          // gemessen: −13,00 €
    expect(founderFirstInvoiceCents(6499)).toBe(5199);   // gemessen: 51,99 €
    expect(discountCents(64990, 20)).toBe(12998);        // gemessen: −129,98 €
    expect(founderFirstInvoiceCents(64990)).toBe(51992); // gemessen: 519,92 €
  });

  it("der zentrale Satz nennt die gerechneten Beträge für Monat und Jahr und sonst nichts", () => {
    expect(FOUNDER_KURZ).toBe("20 % auf die erste Rechnung");
    expect(founderFirstInvoiceCents(PLANS.gruenderx.grossCents)).toBe(5199);
    expect(founderFirstInvoiceCents(PLANS["gruenderx-year"].grossCents)).toBe(51992);
    for (const s of ["51,99 €", "64,99 €", "519,92 €", "649,90 €", "erste Rechnung", "danach regulär"]) expect(FOUNDER_SATZ).toContain(s);
    // Founder-Set ist nicht gemessen: kein Betrag, keine Nennung.
    expect(FOUNDER_SATZ).not.toMatch(/Set|Bundle|79,99|99,99|799,92|999,90/);
    expect(FOUNDER_SATZ).not.toMatch(/statt \d|nur noch|nur heute|exklusiv|gewinn/i);
  });
});

describe("FOUNDER: kein eigener Wortlaut außerhalb der zentralen Quelle", () => {
  const alle = dateien(SRC).map((p) => ({ rel: p.slice(SRC.length + 1), text: readFileSync(p, "utf8") }));
  const nutzer = alle.filter((d) => !ZENTRAL.has(d.rel) && /FOUNDER_(CODE|KURZ|SATZ)|["'`>\s]FOUNDER["'`<\s]/.test(d.text) && !/FOUNDERS? CUP|CO-FOUNDER/.test(d.text));

  it("findet die bekannten Nutzer", () => {
    const namen = nutzer.map((d) => d.rel);
    for (const n of ["components/landing/Hero.tsx", "components/landing/FinalCTA.tsx", "components/landing/Bundles.tsx", "components/landing/FAQ.tsx", "pages/Preise.tsx", "components/freetools/FreeToolPromo.tsx"]) {
      expect(namen).toContain(n);
    }
  });

  it("verbindet den Code nirgends mit „im ersten Monat“ oder „Monatszugang“ in eigenen Worten", () => {
    const alt = /%\s*(Rabatt\s*)?(<\/span>\s*)?(im|auf den)\s*(ersten|1\.)\s*Monat|ersten Monat eines Monatszugangs|FOUNDER_CODE\.percent\}\s*%/;
    for (const d of nutzer) expect(alt.test(d.text), d.rel).toBe(false);
  });

  it("tippt in Komponenten weder den Code noch Beträge der ersten Rechnung", () => {
    for (const d of nutzer) {
      expect(/51,99|519,92/.test(d.text), d.rel).toBe(false);
      if (d.rel !== "components/SchwesterTipp.tsx") expect(/FOUNDER_(KURZ|SATZ)/.test(d.text), d.rel).toBe(true);
    }
    expect(FOUNDER_CODE.code).toBe("FOUNDER");
  });
});
