// emailMatch: exakter Abgleich ohne Platzhalter.
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { ilikeExakt, NIE_TREFFER } from "./emailMatch.ts";

Deno.test("ilikeExakt: `*` (PostgREST-Platzhalter) trifft nie (Abschlusspruefung 27.10.2026)", () => {
  assertEquals(ilikeExakt("*@firma.de"), NIE_TREFFER);
  assertEquals(ilikeExakt("a_b%c@x.de"), "a\\_b\\%c@x.de");
});
