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
