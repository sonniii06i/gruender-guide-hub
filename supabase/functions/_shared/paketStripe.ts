// ===================================================================
// paketStripe.ts — Stripe-Zugang und Preis des Gründungspakets.
//
// SERVERSEITIGER VERKAUFSSCHALTER: PAKET_STRIPE_MODUS
//   ungesetzt / alles andere  -> "aus": Checkout und Download antworten 503
//   "test"  -> STRIPE_TEST_SECRET_KEY, Checkout NUR mit PAKET_TEST_ZUGANG
//              (Betreiber-Testkäufe; ohne Zugang kann niemand eine Test-
//              Session erzeugen und mit Testkarte gratis laden)
//   "live"  -> STRIPE_SECRET_KEY
// Download liefert nur Sessions, deren livemode zum Modus passt (Security-
// Review 26.10.: Test-Sessions dürfen im Live-Betrieb nie etwas freischalten).
// Das VITE-Flag im Frontend blendet nur den Knopf ein – es ist keine Sperre.
//
// Preis: wird über PAKET_LOOKUP_KEY gefunden; fehlt er, legt die Funktion
// Produkt, Preis und den 19-%-Steuersatz (inklusive) einmalig an. So
// steht die Umsatzsteuer auf der Stripe-Rechnung ausgewiesen (GründerX
// ist regelbesteuert, USt-IdNr. DE355021007 laut Impressum).
// ===================================================================

import Stripe from "https://esm.sh/stripe@18.5.0";
import { sameSig } from "./unsubscribe.ts";
import {
  PAKET_LOOKUP_KEY, PAKET_NAME, PAKET_PREIS_CENT, PAKET_PRODUKT, PAKET_UST_SATZ, PAKET_VERSION,
} from "./gruendungspaketTexte.ts";

export type Modus = "aus" | "test" | "live";
type Env = (name: string) => string | undefined;
const denoEnv: Env = (n) => Deno.env.get(n);

export function paketModus(env: Env = denoEnv): Modus {
  const m = env("PAKET_STRIPE_MODUS");
  return m === "live" ? "live" : m === "test" ? "test" : "aus";
}

/** Im Testmodus darf nur, wer den Test-Zugang kennt, eine Session erzeugen. */
export function testZugangOk(wert: unknown, env: Env = denoEnv): boolean {
  const soll = env("PAKET_TEST_ZUGANG") ?? "";
  return soll.length >= 24 && typeof wert === "string" && sameSig(wert, soll);
}

/** Passt die Session (livemode) zum Modus? Im Modus "aus" passt nichts. */
export function sessionPasstZumModus(livemode: boolean, modus: Modus): boolean {
  return modus === "live" ? livemode === true : modus === "test" ? livemode === false : false;
}

export function paketStripe(env: Env = denoEnv): { stripe: Stripe; modus: Exclude<Modus, "aus"> } | null {
  const modus = paketModus(env);
  if (modus === "aus") return null;
  const key = modus === "live" ? env("STRIPE_SECRET_KEY") : env("STRIPE_TEST_SECRET_KEY");
  if (!key) return null;
  const istTest = key.startsWith("sk_test_") || key.startsWith("rk_test_");
  if (istTest !== (modus === "test")) return null;   // Schlüssel muss zum Modus passen
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
