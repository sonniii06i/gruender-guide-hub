/**
 * Marketplace-Fee-Berechnungen für Kaufland, Otto, eBay, Etsy.
 *
 * Stand: 2026-05. Provisions-Tabellen aus den öffentlichen Gebühren-Übersichten
 * der Marketplaces (Stand Q1-2026). Bei Tariff-Änderungen hier zentral aktualisieren.
 *
 * Amazon-FBA-Fees werden separat via SP-API gezogen (siehe Edge Function
 * `amazon-fees-estimate`) — diese Library deckt nur die anderen Marketplaces ab.
 */

export type Marketplace = "kaufland" | "otto" | "ebay" | "etsy";

export type FeeCategory = {
  /** Slug für Programm-Lookup. */
  slug: string;
  /** Display-Name (Deutsch). */
  label: string;
  /** Provisions-Satz in Prozent vom VK brutto. */
  provisionPct: number;
};

export interface FeeBreakdown {
  /** Provisions-Gebühr in EUR brutto. */
  provision: number;
  /** Closing-/Listing-Gebühr in EUR brutto (z.B. 0,30€ Kaufland). */
  closingFee: number;
  /** Payment-Processing-Gebühr in EUR brutto. */
  paymentFee: number;
  /** Offsite-Ads-Gebühr (Etsy-spezifisch, sonst 0). */
  offsiteAdsFee: number;
  /** Summe aller Marketplace-Gebühren brutto. */
  totalFees: number;
  /** Quelle der Daten (für UI-Anzeige). */
  source: string;
}

// =============================================================
// KAUFLAND (Mirakl-basiert, Provisions-Tabelle Stand 2026)
// =============================================================
export const KAUFLAND_CATEGORIES: FeeCategory[] = [
  { slug: "computer-laptop", label: "Computer & Laptops", provisionPct: 6 },
  { slug: "smartphones-tablets", label: "Smartphones & Tablets", provisionPct: 6 },
  { slug: "elektronik", label: "Elektronik (Standard)", provisionPct: 8 },
  { slug: "lebensmittel", label: "Lebensmittel & Getränke", provisionPct: 8 },
  { slug: "buecher-medien", label: "Bücher & Medien", provisionPct: 8 },
  { slug: "buerobedarf", label: "Bürobedarf", provisionPct: 9 },
  { slug: "drogerie", label: "Drogerie & Gesundheit", provisionPct: 9 },
  { slug: "sport", label: "Sport & Outdoor", provisionPct: 10 },
  { slug: "moebel", label: "Möbel & Wohnen", provisionPct: 11 },
  { slug: "auto-motorrad", label: "Auto & Motorrad", provisionPct: 11 },
  { slug: "garten", label: "Garten", provisionPct: 11 },
  { slug: "haushalt", label: "Haushalt", provisionPct: 11 },
  { slug: "heimwerker", label: "Heimwerker & Werkzeug", provisionPct: 11 },
  { slug: "spielzeug-kinder", label: "Spielzeug & Kinderbedarf", provisionPct: 11 },
  { slug: "beauty-kosmetik", label: "Beauty & Kosmetik", provisionPct: 11 },
  { slug: "schmuck-uhren", label: "Schmuck & Uhren", provisionPct: 11 },
  { slug: "bekleidung", label: "Bekleidung", provisionPct: 13 },
  { slug: "schuhe-taschen", label: "Schuhe & Taschen", provisionPct: 14 },
];

const KAUFLAND_CLOSING_FEE_BRUTTO = 0.3; // 0,30€ Festgebühr pro Verkauf

export function calcKauflandFees(vkBrutto: number, categorySlug: string): FeeBreakdown {
  const cat = KAUFLAND_CATEGORIES.find((c) => c.slug === categorySlug) ?? KAUFLAND_CATEGORIES[0];
  const provision = (vkBrutto * cat.provisionPct) / 100;
  const totalFees = provision + KAUFLAND_CLOSING_FEE_BRUTTO;
  return {
    provision,
    closingFee: KAUFLAND_CLOSING_FEE_BRUTTO,
    paymentFee: 0,
    offsiteAdsFee: 0,
    totalFees,
    source: `Kaufland ${cat.label} (${cat.provisionPct}% + 0,30€)`,
  };
}

// =============================================================
// OTTO MARKETPLACE (Provisions-Tabelle Stand 2026)
// =============================================================
export const OTTO_CATEGORIES: FeeCategory[] = [
  { slug: "elektronik", label: "Elektronik", provisionPct: 11 },
  { slug: "computer", label: "Computer & Notebooks", provisionPct: 11 },
  { slug: "tv-audio", label: "TV & Audio", provisionPct: 13 },
  { slug: "haushaltsgeraete", label: "Haushaltsgeräte", provisionPct: 14 },
  { slug: "spielzeug", label: "Spielzeug", provisionPct: 14 },
  { slug: "sport", label: "Sport & Freizeit", provisionPct: 14 },
  { slug: "schuhe", label: "Schuhe", provisionPct: 14 },
  { slug: "bekleidung", label: "Bekleidung", provisionPct: 15 },
  { slug: "beauty-kosmetik", label: "Beauty & Kosmetik", provisionPct: 15 },
  { slug: "kinder-baby", label: "Kinder & Baby", provisionPct: 15 },
  { slug: "haushalt", label: "Haushaltswaren", provisionPct: 15 },
  { slug: "schmuck-uhren", label: "Schmuck & Uhren", provisionPct: 16 },
  { slug: "moebel", label: "Möbel & Wohnen", provisionPct: 16 },
  { slug: "garten", label: "Garten", provisionPct: 16 },
  { slug: "heimwerken", label: "Heimwerken & Bauen", provisionPct: 17 },
];

export function calcOttoFees(vkBrutto: number, categorySlug: string): FeeBreakdown {
  const cat = OTTO_CATEGORIES.find((c) => c.slug === categorySlug) ?? OTTO_CATEGORIES[0];
  const provision = (vkBrutto * cat.provisionPct) / 100;
  return {
    provision,
    closingFee: 0,
    paymentFee: 0,
    offsiteAdsFee: 0,
    totalFees: provision,
    source: `Otto ${cat.label} (${cat.provisionPct}%)`,
  };
}

// =============================================================
// EBAY (Endpreisvergebühr-Tabelle Stand 2026, Managed Payments aktiv)
// =============================================================
export const EBAY_CATEGORIES: FeeCategory[] = [
  { slug: "auto-motorrad", label: "Auto & Motorrad (Fahrzeuge)", provisionPct: 1 },
  { slug: "motorrad-teile", label: "Motorrad-Teile", provisionPct: 7 },
  { slug: "auto-teile", label: "Auto-Teile & Zubehör", provisionPct: 9 },
  { slug: "haus-garten", label: "Haus & Garten", provisionPct: 11 },
  { slug: "musik-instrumente", label: "Musikinstrumente", provisionPct: 11 },
  { slug: "elektronik", label: "Elektronik (Standard)", provisionPct: 11 },
  { slug: "computer-laptops", label: "Computer & Laptops", provisionPct: 11 },
  { slug: "smartphones", label: "Handys & Smartphones", provisionPct: 11 },
  { slug: "sport", label: "Sport", provisionPct: 11 },
  { slug: "kinder-baby", label: "Baby & Kind", provisionPct: 11 },
  { slug: "buecher", label: "Bücher", provisionPct: 12 },
  { slug: "filme-musik", label: "Filme/Musik (DVD/CD)", provisionPct: 12 },
  { slug: "bekleidung-schuhe", label: "Bekleidung & Schuhe", provisionPct: 12 },
  { slug: "beauty-kosmetik", label: "Beauty & Gesundheit", provisionPct: 12 },
  { slug: "schmuck-uhren", label: "Schmuck & Uhren", provisionPct: 13 },
  { slug: "antiquitaeten", label: "Antiquitäten & Kunst", provisionPct: 13 },
  { slug: "sammeln", label: "Sammeln & Seltenes", provisionPct: 13 },
];

const EBAY_PER_ORDER_FEE_BRUTTO = 0.35; // Festgebühr pro Verkauf (in EPV oft schon inkludiert ab 2024)

export function calcEbayFees(vkBrutto: number, categorySlug: string): FeeBreakdown {
  const cat = EBAY_CATEGORIES.find((c) => c.slug === categorySlug) ?? EBAY_CATEGORIES[0];
  const provision = (vkBrutto * cat.provisionPct) / 100;
  const totalFees = provision + EBAY_PER_ORDER_FEE_BRUTTO;
  return {
    provision,
    closingFee: EBAY_PER_ORDER_FEE_BRUTTO,
    paymentFee: 0, // Managed Payments ist in EPV inkludiert
    offsiteAdsFee: 0,
    totalFees,
    source: `eBay ${cat.label} (${cat.provisionPct}% + 0,35€/Order)`,
  };
}

// =============================================================
// ETSY (Stand 2026, EUR-Konvertierung)
// =============================================================
const ETSY_LISTING_FEE_BRUTTO = 0.21; // ~0,20$ in EUR
const ETSY_TRANSACTION_PCT = 6.5;
const ETSY_PAYMENT_PCT = 3.0;
const ETSY_PAYMENT_FIXED_BRUTTO = 0.25; // DE-Pricing

export const ETSY_CATEGORIES: FeeCategory[] = [
  // Etsy hat keine Kategorie-basierten Provisionen, nur Flat 6.5%
  { slug: "standard", label: "Etsy Standard (6,5 % + 3 % Payment)", provisionPct: 6.5 },
];

export function calcEtsyFees(vkBrutto: number, _categorySlug: string, withOffsiteAds = false): FeeBreakdown {
  const transactionFee = (vkBrutto * ETSY_TRANSACTION_PCT) / 100;
  const paymentFee = (vkBrutto * ETSY_PAYMENT_PCT) / 100 + ETSY_PAYMENT_FIXED_BRUTTO;
  // Offsite Ads: 15% (Standard) oder 12% (ab 10k$/Jahr Revenue) — wir nehmen 15% als Standard
  const offsiteAdsFee = withOffsiteAds ? (vkBrutto * 15) / 100 : 0;
  const totalFees = transactionFee + ETSY_LISTING_FEE_BRUTTO + paymentFee + offsiteAdsFee;
  return {
    provision: transactionFee,
    closingFee: ETSY_LISTING_FEE_BRUTTO,
    paymentFee,
    offsiteAdsFee,
    totalFees,
    source: `Etsy (6,5 % + 0,21€ Listing + 3 % Payment${withOffsiteAds ? " + 15 % Offsite-Ads" : ""})`,
  };
}

// =============================================================
// Master-Dispatcher
// =============================================================
export function getMarketplaceCategories(marketplace: Marketplace): FeeCategory[] {
  switch (marketplace) {
    case "kaufland":
      return KAUFLAND_CATEGORIES;
    case "otto":
      return OTTO_CATEGORIES;
    case "ebay":
      return EBAY_CATEGORIES;
    case "etsy":
      return ETSY_CATEGORIES;
  }
}

export function calcMarketplaceFees(
  marketplace: Marketplace,
  vkBrutto: number,
  categorySlug: string,
  options?: { withOffsiteAds?: boolean },
): FeeBreakdown {
  switch (marketplace) {
    case "kaufland":
      return calcKauflandFees(vkBrutto, categorySlug);
    case "otto":
      return calcOttoFees(vkBrutto, categorySlug);
    case "ebay":
      return calcEbayFees(vkBrutto, categorySlug);
    case "etsy":
      return calcEtsyFees(vkBrutto, categorySlug, options?.withOffsiteAds);
  }
}
