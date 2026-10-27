// aktion-code (27.10.2026): serverseitige Grenzen für HQ-Aktionscodes.
// Ausfuehren:  deno test -A supabase/functions/_shared/aktionCode.test.ts
import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { autorisiert, pruefeAnlegen, pruefePromo } from "./aktionCode.ts";

const JETZT = 1_800_000_000;
const gut = { aktion_id: "12", anlass: "black-week-2026", titel: "Black Week", code: "GXBLACK50", prozent: 50, monate: 1, bis: JETZT + 7 * 86400 };

Deno.test("anlegen: gültige Aktion", () => {
  const r = pruefeAnlegen(gut, JETZT);
  assert(r.ok);
  if (r.ok) assertEquals(r.d.neukunden, true);
});

Deno.test("anlegen: Grenzen serverseitig", () => {
  const fall = (x: Record<string, unknown>) => { const r = pruefeAnlegen({ ...gut, ...x }, JETZT); return r.ok ? "ok" : r.feld; };
  assertEquals(fall({ prozent: 51 }), "prozent");
  assertEquals(fall({ prozent: 0 }), "prozent");
  assertEquals(fall({ prozent: 12.5 }), "prozent");
  assertEquals(fall({ monate: 4 }), "monate");
  assertEquals(fall({ bis: JETZT - 1 }), "bis");
  assertEquals(fall({ bis: JETZT + 61 * 86400 }), "bis");
  assertEquals(fall({ code: "gx black" }), "code");
  assertEquals(fall({ aktion_id: "1; drop" }), "aktion_id");
  assertEquals(fall({ anlass: "../x" }), "anlass");
});

Deno.test("promo_id-Format", () => {
  assertEquals(pruefePromo("promo_1UV5Ci71P2jUFISl"), "promo_1UV5Ci71P2jUFISl");
  assertEquals(pruefePromo("coupon_x"), null);
  assertEquals(pruefePromo("promo_../x"), null);
});

Deno.test("Auth: nur exaktes, langes Secret", () => {
  const s = "a".repeat(40);
  assert(autorisiert("Bearer " + s, s));
  assert(!autorisiert("Bearer " + s.slice(1), s));
  assert(!autorisiert(null, s));
  assert(!autorisiert("Bearer kurz", "kurz"));           // Secret zu kurz -> immer zu
  assert(!autorisiert("Bearer ", undefined));
});
