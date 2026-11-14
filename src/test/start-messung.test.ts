import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

// Funnel-Pruefung 14.11.2026: Die Start-Stufe (checkout_started + signup_completed) sah nur den
// Gast-Checkout und das Passwort-Formular. Eingeloggte Kaeufe (Checkout, Bundles, Startangebot)
// und Google-Konten fehlten. Jeder Weg, der eine Checkout-Session anlegt, meldet den Start VOR dem
// Netzaufruf (nach der Weiterleitung zu Stripe laeuft kein Code mehr).
const KAUFWEGE = [
  "src/pages/Checkout.tsx",
  "src/components/landing/Bundles.tsx",
  "src/utils/startAngebot.ts",
  "src/utils/guestCheckout.ts",
];

describe("Start-Messung auf jedem Kaufweg", () => {
  it.each(KAUFWEGE)("%s meldet checkout_started vor dem Checkout-Aufruf", (datei) => {
    const q = readFileSync(datei, "utf8");
    const aufrufe = [...q.matchAll(/functions\.invoke(?:<[^>]*>)?\("(create-checkout|checkout-guest)"/g)];
    expect(aufrufe.length).toBeGreaterThan(0);
    for (const a of aufrufe) {
      const davor = q.slice(Math.max(0, (a.index ?? 0) - 700), a.index);
      expect(davor).toMatch(/trackMonetization\.checkoutStarted\(/);
    }
  });

  it("keine weitere Datei legt Checkout-Sessions an, ohne in KAUFWEGE zu stehen", async () => {
    const { globSync } = await import("node:fs");
    const dateien = (globSync as (p: string) => string[])("src/**/*.{ts,tsx}")
      .filter((d) => !/\.test\.|\/test\//.test(d))
      .filter((d) => /functions\.invoke(?:<[^>]*>)?\("(create-checkout|checkout-guest)"/.test(readFileSync(d, "utf8")));
    expect(dateien.sort()).toEqual([...KAUFWEGE].sort());
  });

  it("useAuth meldet frische Google-Konten (signup_completed) auf beiden Sitzungswegen", () => {
    const q = readFileSync("src/hooks/useAuth.tsx", "utf8");
    expect(q).toMatch(/istFrischesOAuthKonto/);
    expect(q.match(/meldeOAuthSignup\(sess\)/g)?.length).toBeGreaterThanOrEqual(2);
  });
});
