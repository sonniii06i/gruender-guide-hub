import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { utmMeta } from "./utmMeta.ts";

Deno.test("utmMeta: nur bekannte Felder, bereinigt, klein", () => {
  assertEquals(utmMeta({ utm_source: " AnwaltX ", utm_campaign: "guide-<x>", foo: "bar", landing: "/ratgeber/a?b" }),
    { utm_source: "anwaltx", utm_campaign: "guide-x", landing: "/ratgeber/ab" });
});

Deno.test("utmMeta: landing nur als Pfad, Nicht-Strings ignoriert, Laenge gedeckelt", () => {
  const r = utmMeta({ landing: "https://evil", utm_medium: 5 as unknown as string, utm_content: "x".repeat(500) });
  assertEquals(r.landing, undefined);
  assertEquals(r.utm_medium, undefined);
  assertEquals(r.utm_content.length, 200);
});

Deno.test("utmMeta: leer/undefined → leer", () => {
  assertEquals(utmMeta(undefined), {});
  assertEquals(utmMeta({ utm_source: "  " }), {});
});
