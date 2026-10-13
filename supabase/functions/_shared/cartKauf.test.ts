// Tests der Stufenwahl der Warenkorbstrecke.
// Ausfuehren:  deno test supabase/functions/_shared/cartKauf.test.ts
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { waehleStufe } from "./cartKauf.ts";

const STUFEN = [
  { nr: 1, ab: 1, spalte: "stufe1_at" },
  { nr: 2, ab: 24, spalte: "stufe2_at" },
  { nr: 3, ab: 72, spalte: "stufe3_at" },
] as const;

Deno.test("normaler Verlauf: Stufe 1 nach 1 h", () => {
  const w = waehleStufe(STUFEN, {}, 2);
  assertEquals(w?.stufe.nr, 1);
  assertEquals(w?.stempel, ["stufe1_at"]);
});

Deno.test("noch nichts faellig", () => {
  assertEquals(waehleStufe(STUFEN, {}, 0.5), null);
});

Deno.test("Fehlerklasse 13.10.: nach verspaetetem Lauf nie rueckwaerts", () => {
  // 80 h alt, nichts gesendet → Stufe 3, Stufen 1 und 2 werden mitgestempelt.
  const w = waehleStufe(STUFEN, {}, 80);
  assertEquals(w?.stufe.nr, 3);
  assertEquals(w?.stempel, ["stufe1_at", "stufe2_at", "stufe3_at"]);
  // Naechster Lauf: Stufe 3 steht → nichts mehr, auch wenn 1/2 leer waeren.
  assertEquals(waehleStufe(STUFEN, { stufe3_at: "2026-10-13T00:00:00Z" }, 81), null);
});

Deno.test("nach Stufe 1 und spaetem Lauf: Stufe 2 uebersprungen, Stufe 3 raus", () => {
  const w = waehleStufe(STUFEN, { stufe1_at: "x" }, 90);
  assertEquals(w?.stufe.nr, 3);
  assertEquals(w?.stempel, ["stufe2_at", "stufe3_at"]);
});

Deno.test("nach Stufe 2 ist Stufe 1 nie mehr faellig", () => {
  const w = waehleStufe(STUFEN, { stufe2_at: "x" }, 30);
  assertEquals(w, null);
});
