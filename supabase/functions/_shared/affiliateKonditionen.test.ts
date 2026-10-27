// Ausfuehren:  deno test -A supabase/functions/_shared/affiliateKonditionen.test.ts (AnwaltX + GruenderX identisch)
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { auszahlbar, fensterEnde, provisionsSatz } from "./affiliateKonditionen.ts";

const TAG = 86400_000;
const start = Date.parse("2026-11-15T10:00:00Z");

Deno.test("Fenster: 12 Kalendermonate ab Abo-Start, strikte Grenze", () => {
  assertEquals(new Date(fensterEnde(start)).toISOString(), "2027-11-15T10:00:00.000Z");
  assertEquals(provisionsSatz("v2_25_12m", start, start), 0.25);                                   // erste Rechnung
  assertEquals(provisionsSatz("v2_25_12m", start, Date.parse("2027-10-15T10:00:00Z")), 0.25);      // Monat 12
  assertEquals(provisionsSatz("v2_25_12m", start, Date.parse("2027-11-15T09:59:59Z")), 0.25);      // letzter Moment
  assertEquals(provisionsSatz("v2_25_12m", start, Date.parse("2027-11-15T10:00:00Z")), 0);         // Monat 13
  assertEquals(provisionsSatz("v2_25_12m", "2026-11-15T10:00:00Z", start + 400 * TAG), 0);
});

Deno.test("Fehlender oder kaputter Start: keine Provision (fail-closed)", () => {
  assertEquals(provisionsSatz("v2_25_12m", null, start), 0);
  assertEquals(provisionsSatz("v2_25_12m", "kaputt", start), 0);
  assertEquals(provisionsSatz(undefined, undefined, start), 0);
  assertEquals(provisionsSatz("v2_25_12m", start, NaN), 0);
});

Deno.test("Bestandsschutz: 20 % dauerhaft, auch ohne Start", () => {
  assertEquals(provisionsSatz("v1_20_dauerhaft", "2026-07-10T00:00:00Z", start + 900 * TAG), 0.20);
  assertEquals(provisionsSatz("v1_20_dauerhaft", null, start), 0.20);
});

Deno.test("Auszahlbar erst nach 14 Tagen", () => {
  assertEquals(auszahlbar("2026-11-15T10:00:00Z", start + 13 * TAG), false);
  assertEquals(auszahlbar("2026-11-15T10:00:00Z", start + 14 * TAG), true);
  assertEquals(auszahlbar("kaputt", start), false);
});

// Echte Rechnungsformen (gemessen 27.10.2026 im AnwaltX/ArbitrageX-Konto, beide API-Versionen)
import { leistungsBeginn } from "./affiliateKonditionen.ts";

Deno.test("Leistungsbeginn: erste Rechnung, Verlaengerung, Proration, beide API-Versionen", () => {
  const erste = { billing_reason: "subscription_create", period_start: 1792345418, created: 1792345418,
    lines: { data: [{ type: "subscription", proration: false, period: { start: 1792345418 } }] } };
  assertEquals(leistungsBeginn(erste), 1792345418000);
  // Verlaengerung: inv.period_start = VORHERIGER Zeitraum (1789743319), Position = neuer Zeitraum
  const verlaengerung = { billing_reason: "subscription_cycle", period_start: 1789743319, created: 1792335350,
    lines: { data: [{ parent: { type: "subscription_item_details", subscription_item_details: { proration: false } }, period: { start: 1792335319 } }] } };
  assertEquals(leistungsBeginn(verlaengerung), 1792335319000);
  const proration = { created: 1792400000,
    lines: { data: [
      { type: "subscription", proration: true, period: { start: 1792390000 } },
      { type: "subscription", proration: false, period: { start: 1792395000 } },
    ] } };
  assertEquals(leistungsBeginn(proration), 1792395000000);
  const nurProration = { created: 1792400000, status_transitions: { paid_at: 1792385000 },
    lines: { data: [
      { type: "subscription", proration: true, period: { start: 1792380000 } },
      { type: "subscription", proration: true, period: { start: 1792390000 } },
    ] } };
  assertEquals(leistungsBeginn(nurProration), 1792390000000);                        // spaetester Start
  const bezahltSpaeter = { status_transitions: { paid_at: 1792399000 }, lines: { data: [{ type: "subscription", proration: true, period: { start: 1792390000 } }] } };
  assertEquals(leistungsBeginn(bezahltSpaeter), 1792399000000);                      // max(start, bezahlt)
  // has_more: Aufrufer reicht alle Positionen herein; die regulaere Position steht erst auf Seite 2
  const seite1 = { lines: { has_more: true, data: [{ type: "invoiceitem", period: { start: 1 } }] } };
  assertEquals(leistungsBeginn(seite1, [{ type: "invoiceitem" }, { type: "subscription", proration: false, period: { start: 1792395000 } }]), 1792395000000);
});

Deno.test("Leistungsbeginn: Fallback bezahlt-am, nichts lesbar -> NaN", () => {
  assertEquals(leistungsBeginn({ lines: { data: [] }, status_transitions: { paid_at: 1792000000 }, created: 1791000000 }), 1792000000000);
  assertEquals(Number.isNaN(leistungsBeginn({ lines: { data: [{ type: "invoiceitem" }] } })), true);
  assertEquals(Number.isNaN(leistungsBeginn(null)), true);
});
