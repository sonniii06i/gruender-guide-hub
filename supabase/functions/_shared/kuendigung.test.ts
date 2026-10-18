// Kuendigungsbestaetigung (18.10.2026): nur echte Kuendigungen loesen aus,
// Text bleibt Dienstmail ohne Abmeldelink und ohne Angebot.
//
// Ausfuehren:  deno test -A supabase/functions/_shared/kuendigung.test.ts
import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { kuendigungAusEvent } from "./kuendigungMail.ts";
import { buildKuendigung } from "./transaktional.ts";

const ev = (type: string, obj: unknown, prev?: unknown) =>
  // deno-lint-ignore no-explicit-any
  ({ type, data: { object: obj, previous_attributes: prev } }) as any;
const T = 1793750400; // 04.11.2026

Deno.test("Kuendigung: Ausloeser", () => {
  assertEquals(kuendigungAusEvent(ev("customer.subscription.updated",
    { cancel_at_period_end: true, items: { data: [{ current_period_end: T }] } }, { cancel_at_period_end: false })), { ende: "04.11.2026" });
  assertEquals(kuendigungAusEvent(ev("customer.subscription.updated",
    { cancel_at_period_end: true, current_period_end: T }, { metadata: {} })), undefined);
  assertEquals(kuendigungAusEvent(ev("customer.subscription.deleted",
    { cancel_at_period_end: true, cancellation_details: { reason: "cancellation_requested" } })), undefined);
  assertEquals(kuendigungAusEvent(ev("customer.subscription.deleted",
    { cancel_at_period_end: false, cancellation_details: { reason: "cancellation_requested" } })), { ende: null });
  assertEquals(kuendigungAusEvent(ev("customer.subscription.deleted",
    { cancel_at_period_end: false, cancellation_details: { reason: "payment_failed" } })), undefined);
});

Deno.test("Kuendigung: Text belegt, ohne Angebot und Abmeldelink", () => {
  const b = buildKuendigung({ ende: "04.11.2026" });
  assertEquals(b.subject, "Deine Kündigung bei GründerX ist eingegangen");
  assert(b.text.includes("bis zum 04.11.2026 weiter nutzen"));
  assert(!b.html.includes("Abmelden"));
  for (const v of ["Rabatt", "%", "gratis", "kostenlos"]) assert(!b.text.includes(v), v);
});
