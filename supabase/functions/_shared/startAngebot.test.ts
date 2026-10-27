import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { startErlaubt, istStartAngebot, startPosition, startText, warSchonKunde, START_CENT } from "./startAngebot.ts";

Deno.test("istStartAngebot nur bei exakter Kennung", () => {
  assert(istStartAngebot({ angebot: "start1" }));
  assert(!istStartAngebot({ angebot: "start2" }));
  assert(!istStartAngebot({}));
  assert(!istStartAngebot(null));
});

Deno.test("Startposition: einmalig 1 €, kein Abo-Preis", () => {
  const p = startPosition("GründerX");
  assertEquals(p.price_data.unit_amount, START_CENT);
  assertEquals((p.price_data as Record<string, unknown>).recurring, undefined);
});

Deno.test("Startext nennt Gesamtpreis, Folgepreis, Kündigung, Neukunden", () => {
  const t = startText("GründerX", "64,99 €");
  for (const s of ["1,00 €", "64,99 €", "kündbar", "Neukunden", "7 Tage"]) assert(t.includes(s), s);
});

function fakeStripe(abos: Record<string, string[]>) {
  return {
    customers: { list: async ({ email }: { email: string }) => ({ data: email === "alt@x.de" ? [{ id: "cus_1" }] : [] }) },
    subscriptions: { list: async ({ customer }: { customer: string }) => ({ data: (abos[customer] ?? []).map((id) => ({ id })) }) },
  };
}

Deno.test("warSchonKunde: frueheres Abo zaehlt, das neue eigene nicht", async () => {
  assert(await warSchonKunde(fakeStripe({ cus_1: ["sub_alt", "sub_neu"] }), "alt@x.de", "sub_neu"));
  assert(!(await warSchonKunde(fakeStripe({ cus_1: ["sub_neu"] }), "alt@x.de", "sub_neu")));
  assert(!(await warSchonKunde(fakeStripe({}), "neu@x.de")));
});

Deno.test("startErlaubt: nur GründerX monatlich", () => {
  assert(startErlaubt("gruenderx", "month"));
  assert(!startErlaubt("gruenderx", "year"));
  assert(!startErlaubt("bundle", "month"));
});
