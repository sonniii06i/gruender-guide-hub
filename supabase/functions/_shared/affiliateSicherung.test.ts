// Abschlusspruefung 27.10.2026: Partner-Selbstkauf, Rueckbuchung nach Erstattung/Chargeback.
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { normMail, partnerSelbstkauf, provisionWiederherstellen, provisionZurueck, rechnungZurZahlung } from "./affiliateSicherung.ts";

async function* liste<T>(xs: T[]) { for (const x of xs) yield x; }

// deno-lint-ignore no-explicit-any
function stripeMock(kunden: Record<string, string[]>, karten: Record<string, string[]>): any {
  return {
    customers: { list: ({ email }: { email: string }) => liste((kunden[email] ?? []).map((id) => ({ id }))) },
    paymentMethods: { list: ({ customer }: { customer: string }) => liste((karten[customer] ?? []).map((f) => ({ card: { fingerprint: f } }))) },
    charges: { list: () => liste([]) },
    invoicePayments: { list: () => Promise.resolve({ data: [{ invoice: "in_basil" }] }) },
  };
}

Deno.test("normMail: Plus-Anhang, Gmail-Punkte, googlemail", () => {
  assertEquals(normMail("Max.Muster+aff@GoogleMail.com"), "maxmuster@gmail.com");
  assertEquals(normMail("a+b@firma.de"), "a@firma.de");
  assertEquals(normMail("kaputt"), "");
});

Deno.test("partnerSelbstkauf: Mail-Variante, gleicher Kunde, gleiche Karte, fremd", async () => {
  const st = stripeMock({ "p@firma.de": ["cus_p"] }, { cus_p: ["fp1"], cus_k: ["fp1"], cus_f: ["fp9"] });
  assertEquals(await partnerSelbstkauf(st, "p@firma.de", "P+x@firma.de", "cus_x"), "selbe E-Mail");
  assertEquals(await partnerSelbstkauf(st, "p@firma.de", "k@andere.de", "cus_p"), "selber Stripe-Kunde");
  assertEquals(await partnerSelbstkauf(st, "p@firma.de", "k@andere.de", "cus_k"), "selbe Karte");
  assertEquals(await partnerSelbstkauf(st, "p@firma.de", "f@andere.de", "cus_f"), null);
});

// deno-lint-ignore no-explicit-any
function sbMock(rows: any[]) {
  const log: string[] = [];
  const q = (op: string) => {
    // deno-lint-ignore no-explicit-any
    const o: any = {
      select: () => o, eq: () => o, neq: () => o,
      then: (r: (v: unknown) => void) => r({ data: op === "select" ? rows : null, error: null }),
    };
    return o;
  };
  return {
    log,
    from: (_t: string) => ({
      select: () => q("select"),
      update: (v: unknown) => { log.push("update:" + JSON.stringify(v)); return q("update"); },
      // deno-lint-ignore no-explicit-any
      insert: (v: any) => { log.push("insert:" + v.stripe_invoice_id + ":" + v.commission_cents); return Promise.resolve({ error: null }); },
      delete: () => { log.push("delete"); return q("delete"); },
    }),
  };
}

Deno.test("provisionZurueck: offen -> reversed, ausgezahlt -> negative Gegenbuchung", async () => {
  const offen = sbMock([{ id: "c1", status: "pending", commission_cents: 1000 }]);
  assertEquals(await provisionZurueck(offen, "in_1", "refund"), "reversed");
  assertEquals(offen.log, ['update:{"status":"reversed","reversed_reason":"refund"}']);
  const bezahlt = sbMock([{ id: "c2", status: "paid", commission_cents: 1000, base_cents: 4000 }]);
  const r = await provisionZurueck(bezahlt, "in_2", "dispute");
  assertEquals(bezahlt.log, ["insert:in_2#rueck:-1000"]);
  assertEquals(r.startsWith("verrechnet"), true);
});

Deno.test("provisionWiederherstellen: nur Dispute-Stornos, nie bei Erstattung", async () => {
  const sb = sbMock([]);
  assertEquals(await provisionWiederherstellen(sb, "in_3", 0), true);
  assertEquals(sb.log, ['update:{"status":"pending","reversed_reason":null}', "delete"]);
  const sb2 = sbMock([]);
  assertEquals(await provisionWiederherstellen(sb2, "in_4", 500), false);
  assertEquals(sb2.log, []);
});

Deno.test("rechnungZurZahlung: alte API und basil", async () => {
  const st = stripeMock({}, {});
  assertEquals(await rechnungZurZahlung(st, { invoice: "in_alt" }), "in_alt");
  assertEquals(await rechnungZurZahlung(st, { payment_intent: "pi_1" }), "in_basil");
});
