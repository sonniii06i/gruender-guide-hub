// Tests: Stripe-Abo-Ereignis → lokale subscriptions-Zeile (stripe-affiliate-webhook).
// Ausfuehren:  deno test supabase/functions/_shared/aboSync.test.ts
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { aboSyncPatch, type AboLike } from "./aboSync.ts";

const ENDE = 1_800_000_000;
const abo = (status: string, extra: Partial<AboLike> = {}): AboLike => ({
  id: "sub_1",
  status,
  items: { data: [{ current_period_end: ENDE, price: { id: "price_1TTUf764hSN6usxPLDOylK70" } }] },
  metadata: { product: "bundle" },
  ...extra,
});

Deno.test("Verlaengerung zieht das Laufzeitende bei aktiver Zeile nach", () => {
  const p = aboSyncPatch({ user_id: "u", status: "active", source: "stripe", stripe_subscription_id: "sub_1" }, abo("active"), false);
  assertEquals(p, { current_period_end: new Date(ENDE * 1000).toISOString(), stripe_subscription_id: "sub_1" });
});

Deno.test("Fehlerklasse 13.10.: Zahlung nach Mahnlauf geglueckt → Zeile wieder aktiv", () => {
  for (const status of ["past_due", "inactive"]) {
    const p = aboSyncPatch({ user_id: "u", status, source: "stripe", stripe_subscription_id: "sub_1" }, abo("active"), false);
    assertEquals(p?.status, "active", status);
    assertEquals(p?.plan, "Founder Bundle");
  }
  // Plan-Fallback ueber die Preis-ID (Alt-Abo ohne product-Metadatum)
  const alt = aboSyncPatch({ user_id: "u", status: "inactive", stripe_subscription_id: "sub_1" }, abo("active", { metadata: {} }), false);
  assertEquals(alt?.plan, "GründerX");
});

Deno.test("Reaktivierung nur fuer GENAU dieses Abo, nie fuer fremde oder gekuendigte Zeilen", () => {
  assertEquals(aboSyncPatch({ user_id: "u", status: "inactive", stripe_subscription_id: null }, abo("active"), false), null);
  assertEquals(aboSyncPatch({ user_id: "u", status: "inactive", stripe_subscription_id: "sub_2" }, abo("active"), false), null);
  assertEquals(aboSyncPatch({ user_id: "u", status: "canceled", stripe_subscription_id: "sub_1" }, abo("active"), false), null);
});

Deno.test("Mahnlauf (past_due/paused) entzieht keinen Zugang — Geschaeftsregel unveraendert", () => {
  for (const status of ["past_due", "paused", "incomplete"]) {
    assertEquals(aboSyncPatch({ user_id: "u", status: "active", stripe_subscription_id: "sub_1" }, abo(status), false), null, status);
  }
});

Deno.test("Endgueltiges Ende entzieht Zugang", () => {
  assertEquals(aboSyncPatch({ user_id: "u", status: "active", stripe_subscription_id: "sub_1" }, abo("canceled"), true)?.status, "canceled");
  assertEquals(aboSyncPatch({ user_id: "u", status: "active", stripe_subscription_id: "sub_1" }, abo("unpaid"), false)?.status, "inactive");
  assertEquals(aboSyncPatch({ user_id: "u", status: "active", stripe_subscription_id: "sub_1" }, abo("incomplete_expired"), false)?.status, "inactive");
});

Deno.test("comp_access und Reseller-Zeilen bleiben unberuehrt", () => {
  assertEquals(aboSyncPatch({ user_id: "u", status: "active", comp_access: true }, abo("canceled"), true), null);
  assertEquals(aboSyncPatch({ user_id: "u", status: "active", source: "copecart" }, abo("canceled"), true), null);
});
