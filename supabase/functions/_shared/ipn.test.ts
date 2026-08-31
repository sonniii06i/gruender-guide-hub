// Tests der Protokoll-Schicht: Signaturpruefung, Ereignis-Zuordnung, Laufzeit.
//
// Ausfuehren:  deno test supabase/functions/_shared/ipn.test.ts
//
// Die Signaturen werden hier unabhaengig nachgerechnet (nicht mit denselben
// Hilfsfunktionen wie in ipn.ts) — sonst wuerde ein Fehler im Verfahren auf
// beiden Seiten gleich auftreten und der Test bliebe gruen.
import { assertEquals, assertRejects } from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  ack,
  canonicalProvider,
  IpnError,
  parseCopecart,
  parseDigistore,
  parseElopage,
} from "./ipn.ts";

const planFor = () => "gruenderx";
const enc = new TextEncoder();

async function copecartSignature(secret: string, body: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(body));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function digistoreSignature(
  params: Record<string, string>,
  passphrase: string,
  upper = true,
) {
  const parts = Object.entries(params)
    .filter(([k, v]) => k !== "sha_sign" && v !== "")
    .map(([k, v]) => [upper ? k.toUpperCase() : k, v] as [string, string])
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .map(([k, v]) => `${k}=${v}${passphrase}`)
    .join("");
  const digest = await crypto.subtle.digest("SHA-512", enc.encode(parts));
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

const bytes = (s: string) => enc.encode(s).buffer as ArrayBuffer;

async function copecart(payload: Record<string, unknown>, secret = "cope-geheim") {
  const body = JSON.stringify(payload);
  const headers = new Headers({ "x-copecart-signature": await copecartSignature(secret, body) });
  return await parseCopecart(bytes(body), headers, secret, planFor);
}

// --- CopeCart ---------------------------------------------------------------
Deno.test("CopeCart: gueltige Signatur, Kauf schaltet frei", async () => {
  const ev = await copecart({
    event_type: "payment.made",
    buyer_email: "Kunde@Example.de",
    order_id: "7clYUvQI",
    product_id: "2df15941",
    payment_plan: "abonnement",
    payment_status: "paid",
    next_payment_at: "2026-09-28",
    test_payment: false,
  });
  assertEquals(ev.action, "grant");
  assertEquals(ev.email, "kunde@example.de"); // wird kleingeschrieben
  assertEquals(ev.orderId, "7clYUvQI");
  // 28.09. + 3 Tage Kulanz
  assertEquals(ev.periodEnd, "2026-10-01T00:00:00.000Z");
});

Deno.test("CopeCart: falsche Signatur wird abgewiesen", async () => {
  const body = JSON.stringify({ event_type: "payment.made", buyer_email: "a@b.de" });
  await assertRejects(
    () =>
      parseCopecart(
        bytes(body),
        new Headers({ "x-copecart-signature": "falsch" }),
        "cope-geheim",
        planFor,
      ),
    IpnError,
  );
});

Deno.test("CopeCart: fehlendes Secret laesst nichts durch", async () => {
  const body = JSON.stringify({ event_type: "payment.made" });
  await assertRejects(
    () => parseCopecart(bytes(body), new Headers(), undefined, planFor),
    IpnError,
  );
});

Deno.test("CopeCart: Testkauf schaltet frei und ist markiert", async () => {
  // CopeCart zeigt die Bezahlart "test" nur dem Verkaeufer. Wuerden wir sie
  // ignorieren, waere die Kette nie im Ganzen pruefbar.
  const ev = await copecart({
    event_type: "payment.made",
    buyer_email: "test@example.de",
    order_id: "T1",
    test_payment: true,
    payment_status: "test_paid",
  });
  assertEquals(ev.action, "grant");
  assertEquals(ev.event, "payment.made (Testkauf)");
});

Deno.test("CopeCart: Kuendigung beendet den bezahlten Zeitraum nicht sofort", async () => {
  const ev = await copecart({
    event_type: "payment.recurring.cancelled",
    buyer_email: "kunde@example.de",
    order_id: "7clYUvQI",
    is_cancelled_for: "2026-09-30",
  });
  assertEquals(ev.action, "revoke");
  assertEquals(ev.periodEnd, "2026-09-30T00:00:00.000Z"); // laeuft bis dahin weiter
});

Deno.test("CopeCart: Kuendigung ohne Enddatum aendert nichts", async () => {
  const ev = await copecart({
    event_type: "payment.recurring.cancelled",
    buyer_email: "kunde@example.de",
    order_id: "7clYUvQI",
  });
  assertEquals(ev.action, "ignore");
});

Deno.test("CopeCart: Rueckerstattung entzieht sofort", async () => {
  const ev = await copecart({
    event_type: "payment.refunded",
    buyer_email: "kunde@example.de",
    order_id: "7clYUvQI",
  });
  assertEquals(ev.action, "revoke");
  assertEquals(ev.periodEnd, null); // sofort, kein Auslaufen
});

Deno.test("CopeCart: Einmalkauf laeuft unbefristet", async () => {
  const ev = await copecart({
    event_type: "payment.made",
    buyer_email: "kunde@example.de",
    order_id: "E1",
    payment_plan: "one_time_payment",
  });
  assertEquals(ev.action, "grant");
  assertEquals(ev.periodEnd, null);
});

// --- Digistore24 ------------------------------------------------------------
Deno.test("Digistore24: sha_sign wird in beiden Schreibweisen akzeptiert", async () => {
  const base = {
    event: "on_payment",
    email: "ds@example.de",
    order_id: "DS-1",
    product_id: "42",
    billing_type: "subscription",
    next_payment_at: "2026-09-28",
  };
  for (const upper of [true, false]) {
    const params = { ...base, sha_sign: await digistoreSignature(base, "ds-geheim", upper) };
    const ev = await parseDigistore(params, "ds-geheim", planFor);
    assertEquals(ev.action, "grant");
    assertEquals(ev.email, "ds@example.de");
  }
});

Deno.test("Digistore24: falsche Signatur wird abgewiesen", async () => {
  await assertRejects(
    () => parseDigistore({ event: "on_payment", sha_sign: "DEADBEEF" }, "ds-geheim", planFor),
    IpnError,
  );
});

Deno.test("Digistore24: connection_test aendert nichts", async () => {
  const base = { event: "connection_test", x: "1" };
  const params = { ...base, sha_sign: await digistoreSignature(base, "ds-geheim") };
  assertEquals((await parseDigistore(params, "ds-geheim", planFor)).action, "ignore");
});

Deno.test("Digistore24: neue und alte Ereignisnamen bedeuten dasselbe", async () => {
  for (const [event, expected] of [
    ["on_payment", "grant"],
    ["subscription_payment", "grant"],
    ["on_refund", "revoke"],
    ["on_chargeback", "revoke"],
    ["on_payment_missed", "revoke"],
    ["on_rebill_resumed", "grant"],
  ] as const) {
    const base = { event, email: "a@b.de", order_id: "X" };
    const params = { ...base, sha_sign: await digistoreSignature(base, "ds-geheim") };
    assertEquals((await parseDigistore(params, "ds-geheim", planFor)).action, expected, event);
  }
});

Deno.test("Digistore24: leere Werte fliessen nicht in die Signatur ein", async () => {
  // Digistore laesst leere Parameter aus dem Hash heraus. Ein mitgeschickter
  // leerer Wert darf die Pruefung deshalb nicht kippen.
  const signed = { event: "on_payment", email: "a@b.de", order_id: "X" };
  const params = {
    ...signed,
    note: "",
    sha_sign: await digistoreSignature(signed, "ds-geheim"),
  };
  assertEquals((await parseDigistore(params, "ds-geheim", planFor)).action, "grant");
});

// --- elopage / ablefy -------------------------------------------------------
Deno.test("elopage: E-Mail auch aus verschachtelter Nutzlast", async () => {
  const body = JSON.stringify({
    event: "order.paid",
    payload: { id: "ELO-9", payer: { email: "Elo@Example.de" }, next_payment_at: "2026-09-28" },
  });
  const ev = await parseElopage(bytes(body), new Headers(), undefined, planFor);
  assertEquals(ev.action, "grant");
  assertEquals(ev.email, "elo@example.de");
  assertEquals(ev.orderId, "ELO-9");
});

Deno.test("elopage: flache Nutzlast funktioniert genauso", async () => {
  const body = JSON.stringify({
    event: "payment.success",
    order_id: "ELO-10",
    email: "flach@example.de",
  });
  const ev = await parseElopage(bytes(body), new Headers(), undefined, planFor);
  assertEquals(ev.action, "grant");
  assertEquals(ev.email, "flach@example.de");
});

Deno.test("elopage: mitgeschickte Signatur wird geprueft, wenn ein Secret gesetzt ist", async () => {
  const body = JSON.stringify({ event: "order.paid", payload: { id: "1", email: "a@b.de" } });
  await assertRejects(
    () =>
      parseElopage(
        bytes(body),
        new Headers({ "x-elopage-signature": "falsch" }),
        "elo-geheim",
        planFor,
      ),
    IpnError,
  );
});

Deno.test("elopage: Rueckerstattung entzieht", async () => {
  const body = JSON.stringify({ event: "payment.refunded", payload: { id: "R1", email: "a@b.de" } });
  assertEquals(
    (await parseElopage(bytes(body), new Headers(), undefined, planFor)).action,
    "revoke",
  );
});

// --- Plattform-Namen und Quittung -------------------------------------------
Deno.test("Plattform-Namen inklusive Aliasse", () => {
  assertEquals(canonicalProvider("copecart"), "copecart");
  assertEquals(canonicalProvider("DigiStore"), "digistore24");
  assertEquals(canonicalProvider("ds24"), "digistore24");
  assertEquals(canonicalProvider("ablefy"), "elopage"); // ablefy = elopage, neuer Name
  assertEquals(canonicalProvider("paypal"), null);
  assertEquals(canonicalProvider(""), null);
});

Deno.test("Jede Plattform bekommt exakt 'OK' als Antworttext", async () => {
  // Digistore24 und CopeCart werten den Antworttext aus, nicht den Statuscode.
  // Ein JSON-Körper sähe für beide wie ein Fehlschlag aus — CopeCart würde die
  // Meldung dann 10-mal über 3 Stunden wiederholen.
  for (const p of ["digistore24", "copecart", "elopage"]) {
    assertEquals(await ack(p).text(), "OK");
  }
});
