/**
 * Datenintegrität für neu hinzugefügte Daten:
 * - businessCreditCards.ts (BIZ_CARDS, AMEX_REFERRAL)
 * - neue Kreditkarten-Provider in anbieter.ts
 */
import { describe, it, expect } from "vitest";
import {
  BIZ_CARDS,
  AMEX_REFERRAL,
  SEGMENT_META,
  DECISION_GUIDE,
} from "@/data/businessCreditCards";
import { PROVIDERS } from "@/data/anbieter";

const NEW_KK_SLUGS = [
  "amex-business-gold",
  "amex-business-platinum",
  "amex-business-basic",
  "pleo",
  "moss",
  "payhawk",
  "spendesk",
];

describe("businessCreditCards — Datenintegrität", () => {
  it("hat eindeutige Card-IDs", () => {
    const ids = BIZ_CARDS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("jede Karte hat ein gültiges Segment", () => {
    const valid = Object.keys(SEGMENT_META);
    BIZ_CARDS.forEach((c) => expect(valid).toContain(c.segment));
  });

  it("jede Karte hat https-URL + nicht-leere Pflichtfelder", () => {
    BIZ_CARDS.forEach((c) => {
      expect(c.url.startsWith("https://"), `${c.id} url`).toBe(true);
      expect(c.name.length, `${c.id} name`).toBeGreaterThan(0);
      expect(c.bestFor.length, `${c.id} bestFor`).toBeGreaterThan(0);
      expect(c.rewards.length, `${c.id} rewards`).toBeGreaterThan(0);
      expect(Array.isArray(c.watchouts), `${c.id} watchouts`).toBe(true);
    });
  });

  it("hat alle 4 Segmente vertreten", () => {
    (Object.keys(SEGMENT_META) as Array<keyof typeof SEGMENT_META>).forEach((seg) => {
      expect(BIZ_CARDS.some((c) => c.segment === seg), seg).toBe(true);
    });
  });

  it("Decision-Guide hat profile/pick/why ohne Leerstrings", () => {
    expect(DECISION_GUIDE.length).toBeGreaterThan(0);
    DECISION_GUIDE.forEach((g) => {
      expect(g.profile.length).toBeGreaterThan(0);
      expect(g.pick.length).toBeGreaterThan(0);
      expect(g.why.length).toBeGreaterThan(0);
    });
  });
});

describe("AMEX_REFERRAL — exakte Links (Casing!)", () => {
  it("Gold-Link exakt wie vorgegeben", () => {
    expect(AMEX_REFERRAL.gold).toBe(
      "https://americanexpress.com/de-de/referral/business-gold?ref=sONNIBIJNE&CPID=999999539",
    );
  });
  it("Platinum-Link exakt wie vorgegeben", () => {
    expect(AMEX_REFERRAL.platinum).toBe(
      "https://americanexpress.com/de-de/referral/business-platinum?ref=sONNIB8uIi&CPID=999999539",
    );
  });
  it("BIZ_CARDS-Amex-Karten nutzen die Referral-Links", () => {
    const gold = BIZ_CARDS.find((c) => c.id === "amex-business-gold");
    const plat = BIZ_CARDS.find((c) => c.id === "amex-business-platinum");
    expect(gold?.url).toBe(AMEX_REFERRAL.gold);
    expect(plat?.url).toBe(AMEX_REFERRAL.platinum);
  });
});

describe("anbieter.ts — neue Kreditkarten-Provider", () => {
  it("alle 7 neuen Slugs existieren in PROVIDERS", () => {
    NEW_KK_SLUGS.forEach((slug) => {
      expect(PROVIDERS.some((p) => p.slug === slug), slug).toBe(true);
    });
  });

  it("neue Slugs sind untereinander eindeutig + kollidieren nicht doppelt", () => {
    NEW_KK_SLUGS.forEach((slug) => {
      const matches = PROVIDERS.filter((p) => p.slug === slug);
      expect(matches.length, `${slug} kommt ${matches.length}x vor`).toBe(1);
    });
  });

  it("alle Kreditkarten-Provider haben Pflichtfelder + https-URL", () => {
    const kk = PROVIDERS.filter((p) => p.category === "Kreditkarten");
    expect(kk.length).toBeGreaterThanOrEqual(7);
    kk.forEach((p) => {
      expect(p.url.startsWith("https://"), `${p.slug} url`).toBe(true);
      expect(p.pros.length, `${p.slug} pros`).toBeGreaterThan(0);
      expect(p.cons.length, `${p.slug} cons`).toBeGreaterThan(0);
      expect(p.tagline.length, `${p.slug} tagline`).toBeGreaterThan(0);
      expect(typeof p.rating, `${p.slug} rating`).toBe("number");
      expect(p.rating).toBeGreaterThan(0);
      expect(p.rating).toBeLessThanOrEqual(5);
    });
  });

  it("Amex-Provider nutzen die Referral-Links", () => {
    const gold = PROVIDERS.find((p) => p.slug === "amex-business-gold");
    const plat = PROVIDERS.find((p) => p.slug === "amex-business-platinum");
    expect(gold?.url).toBe(AMEX_REFERRAL.gold);
    expect(plat?.url).toBe(AMEX_REFERRAL.platinum);
  });

  it("Amex Gold ist höchstbewertete Kreditkarte (Default-Empfehlung)", () => {
    const kk = PROVIDERS.filter((p) => p.category === "Kreditkarten");
    const top = kk.reduce((a, b) => (b.rating > a.rating ? b : a));
    expect(top.slug).toBe("amex-business-gold");
  });
});

describe("anbieter.ts — globale Slug-Eindeutigkeit (Regression)", () => {
  it("kein Provider-Slug kommt doppelt vor", () => {
    const slugs = PROVIDERS.map((p) => p.slug);
    const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    expect(dupes, `Doppelte Slugs: ${[...new Set(dupes)].join(", ")}`).toEqual([]);
  });

  it("Cross-gelistete Tools haben eindeutige Kategorie-Suffix-Slugs", () => {
    const expected = [
      "discord-community",
      "gorgias-helpdesk",
      "mailerlite-newsletter",
      "northbeam-attribution",
      "polar-analytics-attribution",
      "tidio-helpdesk",
      "triple-whale-attribution",
    ];
    expected.forEach((slug) => {
      expect(PROVIDERS.filter((p) => p.slug === slug).length, slug).toBe(1);
    });
  });
});
