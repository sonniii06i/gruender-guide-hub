// Tests der gemeinsamen Zugangsregel (Server-Gates).
// Ausfuehren:  deno test supabase/functions/_shared/access.test.ts
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { hatAktivenZugang } from "./access.ts";

const jetzt = new Date("2026-10-13T12:00:00Z");
const vor = (ms: number) => new Date(jetzt.getTime() - ms).toISOString();
const nach = (ms: number) => new Date(jetzt.getTime() + ms).toISOString();
const TAG = 864e5;

Deno.test("comp_access gilt immer", () => {
  assertEquals(hatAktivenZugang({ status: "canceled", comp_access: true, current_period_end: vor(100 * TAG) }, jetzt), true);
});

Deno.test("aktiv ohne Laufzeitende = Zugang (unbefristet)", () => {
  assertEquals(hatAktivenZugang({ status: "active", current_period_end: null }, jetzt), true);
});

Deno.test("Fehlerklasse 13.10.: status active, aber Laufzeit abgelaufen → kein Zugang", () => {
  // Reseller/Code: kein Puffer
  assertEquals(hatAktivenZugang({ status: "active", source: "copecart", current_period_end: vor(1000) }, jetzt), false);
  assertEquals(hatAktivenZugang({ status: "active", source: "code", current_period_end: vor(TAG) }, jetzt), false);
});

Deno.test("Fehlerklasse 13.10.: Stripe-Zeile mit veraltetem Ende bleibt offen (Verlaengerung ohne App-Besuch)", () => {
  // Nur check-subscription schrieb das Ende — wer verlaengert, ohne die App zu
  // oeffnen, traegt ein Ende von vor Wochen. Massgeblich ist der Status.
  assertEquals(hatAktivenZugang({ status: "active", source: "stripe", current_period_end: vor(TAG) }, jetzt), true);
  assertEquals(hatAktivenZugang({ status: "active", source: "stripe", current_period_end: vor(60 * TAG) }, jetzt), true);
  assertEquals(hatAktivenZugang({ status: "active", source: null, current_period_end: vor(60 * TAG) }, jetzt), true);
  // Gekuendigt/Zahlungsausfall setzt der Webhook im Status → kein Zugang.
  assertEquals(hatAktivenZugang({ status: "canceled", source: "stripe", current_period_end: nach(TAG) }, jetzt), false);
});

Deno.test("inaktive Status geben keinen Zugang", () => {
  for (const status of ["inactive", "canceled", "past_due", "none", null]) {
    assertEquals(hatAktivenZugang({ status, current_period_end: nach(TAG) }, jetzt), false, String(status));
  }
  assertEquals(hatAktivenZugang(null, jetzt), false);
});

Deno.test("unlesbares Laufzeitende sperrt nicht aus", () => {
  assertEquals(hatAktivenZugang({ status: "trialing", current_period_end: "kaputt" }, jetzt), true);
});
