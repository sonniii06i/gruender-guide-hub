// Ausfuehren:  deno test -A supabase/functions/_shared/abbruchNachtrag.test.ts
// (Datei in AnwaltX und GruenderX gleich, Domain je Marke im Test.)
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { abbruchPruefen } from "./abbruchNachtrag.ts";

const D = new URL("../../config.toml", import.meta.url);
const DOMAIN = (await Deno.readTextFile(D)).includes("bcmwvromaiqqvqcovxgn") ? "anwaltx.de" : "gruenderx.de";

// deno-lint-ignore no-explicit-any
const db = (zeilen: any[]) => ({ from: () => {
  // deno-lint-ignore no-explicit-any
  const q: any = { select: () => q, eq: () => q, gte: () => q, limit: () => Promise.resolve({ data: zeilen, error: null }) };
  return q;
} });
// deno-lint-ignore no-explicit-any
const stripe = (subStatus: string | null): any => ({
  customers: { list: () => Promise.resolve({ data: subStatus ? [{ id: "cus_1" }] : [] }) },
  subscriptions: { list: () => Promise.resolve({ data: subStatus ? [{ status: subStatus }] : [] }) },
});
const sess = (o: Record<string, unknown> = {}) => ({
  id: "cs_1", mode: "subscription", created: 1792300000,
  customer_details: { email: "Kunde@Example.de" },
  success_url: `https://${DOMAIN}/willkommen?session_id=x`, cancel_url: `https://${DOMAIN}/x`, metadata: {}, ...o,
});
const kein = { domain: DOMAIN, istKunde: () => Promise.resolve(false) };

Deno.test("Nachtrag nur fuer eigene, offene Abbrueche", async () => {
  const ok = await abbruchPruefen(sess(), db([]), stripe(null), kein);
  assertEquals(ok, { ok: true, email: "kunde@example.de", createdAt: new Date(1792300000_000).toISOString() });
  // fremde Marke (geteiltes Konto mit ArbitrageX)
  assertEquals((await abbruchPruefen(sess({ success_url: "https://arbitragex.de/ok", cancel_url: "https://arbitragex.de/x" }), db([]), stripe(null), kein)).ok, false);
  // schon Kunde laut DB / laut Stripe
  assertEquals((await abbruchPruefen(sess(), db([]), stripe(null), { ...kein, istKunde: () => Promise.resolve(true) })).ok, false);
  assertEquals((await abbruchPruefen(sess(), db([]), stripe("active"), kein)).ok, false);
  // Strecke laeuft schon (Zeile aus create-checkout) -> keine zweite
  assertEquals((await abbruchPruefen(sess(), db([{ id: "x", gekauft_at: null }]), stripe(null), kein)).ok, false);
  // kein Abo-Checkout / keine Adresse
  assertEquals((await abbruchPruefen(sess({ mode: "payment" }), db([]), stripe(null), kein)).ok, false);
  assertEquals((await abbruchPruefen(sess({ customer_details: {} }), db([]), stripe(null), kein)).ok, false);
});
