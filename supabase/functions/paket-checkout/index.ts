// ===================================================================
// paket-checkout — Einmalkauf Gründungspaket (Freigabe #5, 26.10.2026).
//
// POST { zustimmung: true, kenntnis: true, utm_*?, website? }
//   <- { url, sessionId, modus }
//
// Ohne beide Häkchen (Zustimmung zum sofortigen Beginn + Kenntnis vom
// Erlöschen des Widerrufsrechts, § 356 Abs. 6 Nr. 2 lit. b/c BGB) gibt
// es keine Session: Der Server verlässt sich nicht auf den Knopf im
// Browser. Der Zeitpunkt der Erklärung landet in den Metadaten und von
// dort in der Bestätigungsmail (lit. d).
//
// Stripe-Konto: GründerX. Serverseitiger Schalter PAKET_STRIPE_MODUS (ungesetzt = aus,
// "test" nur mit Test-Zugang, "live"), siehe paketStripe.ts.
// ===================================================================

import { paketPreis, paketStripe, testZugangOk } from "../_shared/paketStripe.ts";
import { CHECKOUT_HINWEIS, PAKET_PRODUKT, PAKET_VERSION } from "../_shared/gruendungspaketTexte.ts";
import { mitWerbeHinweis } from "../_shared/werbeHinweis.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const ALLOWED_ORIGINS = ["https://gruenderx.de", "https://www.gruenderx.de", "http://localhost:8080"];
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method" }, 405);

  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  if (str(body.website, 200)) return json({ error: "abgelehnt" }, 400); // Honigtopf
  if (body.zustimmung !== true || body.kenntnis !== true) return json({ error: "zustimmung_fehlt" }, 400);

  const zugang = paketStripe();
  if (!zugang) {
    return json({ error: "verkauf_aus" }, 503);   // Modus aus oder Schlüssel passt nicht zum Modus
  }
  const { stripe, modus } = zugang;
  if (modus === "test" && !testZugangOk(body.testzugang)) return json({ error: "verkauf_aus" }, 503);

  try {
    const { price, taxRate } = await paketPreis(stripe);
    const rawOrigin = req.headers.get("origin") || "";
    const origin = ALLOWED_ORIGINS.includes(rawOrigin) ? rawOrigin : "https://gruenderx.de";
    const zustimmungAm = new Date().toISOString();

    const attribution: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"]) {
      const v = str(body[k], 200);
      if (v) attribution[k] = v;
    }
    const metadata = {
      produkt: PAKET_PRODUKT, version: PAKET_VERSION, zustimmung_am: zustimmungAm,
      zustimmung_356_6: "ja", kenntnis_erloeschen: "ja", ...attribution,
    };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "de",
      line_items: [{ price, quantity: 1, tax_rates: [taxRate] }],
      billing_address_collection: "auto",
      tax_id_collection: { enabled: true },
      customer_creation: "always",
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: "GründerX Gründungspaket 2026 – digitaler Inhalt (Download).",
          footer: "Widerrufsrecht: Der Käufer hat vor dem Kauf ausdrücklich zugestimmt, dass die Bereitstellung vor Ablauf " +
            "der Widerrufsfrist beginnt, und bestätigt, dass sein Widerrufsrecht damit erlischt (§ 356 Abs. 6 Nr. 2 BGB).",
          metadata,
        },
      },
      custom_text: { submit: { message: mitWerbeHinweis(CHECKOUT_HINWEIS) } },
      allow_promotion_codes: true,
      metadata,
      payment_intent_data: { metadata, description: "GründerX Gründungspaket 2026" },
      success_url: `${origin}/gruendungspaket/danke?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/gruendungspaket?abgebrochen=1`,
    });
    return json({ url: session.url, sessionId: session.id, modus });
  } catch (e) {
    console.error("❌ paket-checkout:", (e as Error).message);
    return json({ error: "stripe" }, 502);
  }
});
