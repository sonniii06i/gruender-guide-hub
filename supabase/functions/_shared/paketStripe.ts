// ===================================================================
// paketStripe.ts — Stripe-Zugang und Preis des Gründungspakets.
//
// TESTMODUS ZUERST. Solange PAKET_STRIPE_MODUS nicht ausdrücklich "live"
// ist, nutzt der Paketverkauf STRIPE_TEST_SECRET_KEY (Testschlüssel des
// GründerX-Kontos). Fehlt der, antwortet der Checkout mit 503 statt
// heimlich auf den Live-Schlüssel auszuweichen. Das Abo (create-checkout,
// checkout-guest) bleibt davon unberührt auf STRIPE_SECRET_KEY.
//
// Preis: wird über PAKET_LOOKUP_KEY gefunden; fehlt er, legt die Funktion
// Produkt, Preis und den 19-%-Steuersatz (inklusive) einmalig an. So
// steht die Umsatzsteuer auf der Stripe-Rechnung ausgewiesen (GründerX
// ist regelbesteuert, USt-IdNr. DE355021007 laut Impressum).
// ===================================================================

import Stripe from "https://esm.sh/stripe@18.5.0";
import {
  PAKET_LOOKUP_KEY, PAKET_NAME, PAKET_PREIS_CENT, PAKET_PRODUKT, PAKET_UST_SATZ, PAKET_VERSION,
} from "./gruendungspaketTexte.ts";

export type Modus = "test" | "live";

export function paketModus(): Modus {
  return Deno.env.get("PAKET_STRIPE_MODUS") === "live" ? "live" : "test";
}

export function paketStripe(): { stripe: Stripe; modus: Modus } | null {
  const modus = paketModus();
  const key = modus === "live" ? Deno.env.get("STRIPE_SECRET_KEY") : Deno.env.get("STRIPE_TEST_SECRET_KEY");
  if (!key) return null;
  if (modus === "test" && !key.startsWith("sk_test_") && !key.startsWith("rk_test_")) return null;
  return { stripe: new Stripe(key, { apiVersion: "2025-08-27.basil" }), modus };
}

let preisCache: { price: string; taxRate: string } | null = null;

export async function paketPreis(stripe: Stripe): Promise<{ price: string; taxRate: string }> {
  if (preisCache) return preisCache;

  const rates = await stripe.taxRates.list({ active: true, inclusive: true, limit: 100 });
  let rate = rates.data.find((r: Stripe.TaxRate) => r.percentage === PAKET_UST_SATZ && r.country === "DE" && r.metadata?.zweck === "gruendungspaket");
  if (!rate) {
    rate = await stripe.taxRates.create({
      display_name: "USt", description: `Umsatzsteuer ${PAKET_UST_SATZ} % (inklusive)`, jurisdiction: "DE",
      country: "DE", percentage: PAKET_UST_SATZ, inclusive: true, tax_type: "vat", metadata: { zweck: "gruendungspaket" },
    });
  }

  const vorhanden = await stripe.prices.list({ lookup_keys: [PAKET_LOOKUP_KEY], active: true, limit: 1 });
  let price = vorhanden.data[0];
  if (!price || price.unit_amount !== PAKET_PREIS_CENT || price.currency !== "eur") {
    const produkt = await stripe.products.create({
      name: PAKET_NAME,
      description: "Rechnungsvorlagen, Leitfaden E-Rechnung, Behörden-Checklisten und Gründer-Tracker als Download (Stand 26.10.2026).",
      metadata: { produkt: PAKET_PRODUKT, version: PAKET_VERSION },
    });
    price = await stripe.prices.create({
      product: produkt.id, unit_amount: PAKET_PREIS_CENT, currency: "eur", lookup_key: PAKET_LOOKUP_KEY,
      transfer_lookup_key: true, tax_behavior: "inclusive", metadata: { produkt: PAKET_PRODUKT },
    });
  }
  preisCache = { price: price.id, taxRate: rate.id };
  return preisCache;
}
