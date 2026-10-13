// Tests für delete-account (ohne Netz, ohne Env): Abo-Sperre, Löschliste,
// kein Auth-Löschen bei Teilfehlern.
//
// Ausführen:  deno test supabase/functions/delete-account/handler.test.ts
import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { EMAIL_TABLES, handleDeleteAccount, USER_TABLES } from "./handler.ts";
import type { StripeLike, StripeSubscriptionLike } from "../_shared/stripeCustomer.ts";

type Call = { table: string; op: string; filters: [string, string, unknown][]; payload?: unknown };

/** Minimaler Supabase-Query-Builder: protokolliert jede Abfrage. */
function fakeDb(opts: {
  failDelete?: Set<string>;
  rows?: Record<string, Record<string, unknown>[]>;
  subRow?: Record<string, unknown> | null;
  /** Überschreibt Felder des angemeldeten Nutzers (z. B. app_metadata für 2FA). */
  user?: Record<string, unknown>;
} = {}) {
  const calls: Call[] = [];
  let authDeleted: string | null = null;
  const from = (table: string) => {
    const call: Call = { table, op: "select", filters: [] };
    calls.push(call);
    const result = () => {
      if (call.op === "delete" && opts.failDelete?.has(table)) {
        return { data: null, error: { message: `boom ${table}` } };
      }
      if (call.op === "select") return { data: opts.rows?.[table] ?? [], error: null };
      return { data: null, error: null };
    };
    const b: Record<string, unknown> = {
      select: () => b,
      delete: () => ((call.op = "delete"), b),
      update: (p: unknown) => ((call.op = "update"), (call.payload = p), b),
      eq: (c: string, v: unknown) => (call.filters.push(["eq", c, v]), b),
      ilike: (c: string, v: unknown) => (call.filters.push(["ilike", c, v]), b),
      limit: () => b,
      maybeSingle: () => Promise.resolve({ data: opts.subRow ?? null, error: null }),
      then: (res: (v: unknown) => unknown, rej?: (e: unknown) => unknown) => Promise.resolve(result()).then(res, rej),
    };
    return b;
  };
  const supabase = {
    from,
    auth: {
      getUser: (t: string) =>
        Promise.resolve(
          t === "good"
            ? { data: { user: { id: "u1", email: "Max@Firma.de", email_confirmed_at: "2026-01-01", ...opts.user } }, error: null }
            : { data: { user: null }, error: { message: "bad" } },
        ),
      admin: { deleteUser: (id: string) => ((authDeleted = id), Promise.resolve({ error: null })) },
    },
  };
  return { supabase, calls, authDeleted: () => authDeleted };
}

function fakeStripe(subsByCustomer: Record<string, StripeSubscriptionLike[]>, customers: { id: string; email: string }[] = []): StripeLike & { listed: string[] } {
  const listed: string[] = [];
  return {
    listed,
    customers: {
      // Gespeicherte Kunden-ID: existiert in Stripe.
      retrieve: (id: string) => Promise.resolve({ id }),
      // Stripe vergleicht hier groß/klein-genau.
      list: ({ email }) => Promise.resolve({ data: customers.filter((c) => c.email === email) }),
      search: ({ query }) => {
        const m = /email:'(.*)'/.exec(query);
        const want = (m?.[1] ?? "").toLowerCase();
        return Promise.resolve({ data: customers.filter((c) => c.email.toLowerCase() === want) });
      },
    },
    subscriptions: {
      list: ({ customer }) => (listed.push(customer), Promise.resolve({ data: subsByCustomer[customer] ?? [], has_more: false })),
    },
  };
}

/** JWT-Attrappe mit amr-Zeitstempel (Sekunden) — nur der Payload wird gelesen. */
const jwtMitLogin = (loginSek: number) =>
  `x.${btoa(JSON.stringify({ amr: [{ method: "password", timestamp: loginSek }] })).replace(/=+$/, "")}.y`;

const req = (token = "good") => new Request("http://x/delete-account", { method: "POST", headers: { Authorization: `Bearer ${token}` } });

Deno.test("ohne Token: 401, nichts gelöscht", async () => {
  const db = fakeDb();
  const res = await handleDeleteAccount(req("bad"), { supabase: db.supabase as never, hub: db.supabase, stripe: fakeStripe({}) });
  assertEquals(res.status, 401);
  assertEquals(db.calls.filter((c) => c.op === "delete").length, 0);
});

for (const status of ["active", "trialing", "past_due"]) {
  Deno.test(`Abo ${status} (gespeicherte Kunden-ID): 409, nichts gelöscht`, async () => {
    const db = fakeDb({ subRow: { stripe_customer_id: "cus_saved" } });
    const stripe = fakeStripe({ cus_saved: [{ id: "sub_1", status, customer: "cus_saved", current_period_end: 1893456000 }] });
    const res = await handleDeleteAccount(req(), { supabase: db.supabase as never, hub: db.supabase, stripe });
    assertEquals(res.status, 409);
    const body = await res.json();
    assertEquals(body.error, "active_subscription");
    assert(typeof body.message === "string" && body.message.length > 10);
    assertEquals(db.calls.filter((c) => c.op === "delete" || c.op === "update").length, 0);
    assertEquals(db.authDeleted(), null);
  });
}

Deno.test("Abo über E-Mail in anderer Schreibweise gefunden: 409", async () => {
  const db = fakeDb();
  const stripe = fakeStripe(
    { cus_mail: [{ id: "sub_2", status: "active", customer: "cus_mail" }] },
    [{ id: "cus_mail", email: "max@firma.de" }],
  );
  const res = await handleDeleteAccount(req(), { supabase: db.supabase as never, hub: db.supabase, stripe });
  assertEquals(res.status, 409);
  assertEquals(db.authDeleted(), null);
});

Deno.test("gekündigtes, auslaufendes Abo: 409 mit Enddatum", async () => {
  const db = fakeDb({ subRow: { stripe_customer_id: "cus_saved" } });
  const stripe = fakeStripe({
    cus_saved: [{ id: "sub_3", status: "active", customer: "cus_saved", cancel_at_period_end: true, current_period_end: 1893456000 }],
  });
  const res = await handleDeleteAccount(req(), { supabase: db.supabase as never, hub: db.supabase, stripe });
  assertEquals(res.status, 409);
  const body = await res.json();
  assert(body.message.includes("gekündigt"), body.message);
});

Deno.test("Stripe nicht konfiguriert: 503, nichts gelöscht", async () => {
  const db = fakeDb();
  const res = await handleDeleteAccount(req(), { supabase: db.supabase as never, hub: db.supabase, stripe: null });
  assertEquals(res.status, 503);
  assertEquals(db.calls.filter((c) => c.op === "delete").length, 0);
});

Deno.test("Stripe-Fehler: 503 statt 'kein Abo'", async () => {
  const db = fakeDb();
  const stripe = fakeStripe({});
  stripe.customers.list = () => Promise.reject(new Error("stripe down"));
  const res = await handleDeleteAccount(req(), { supabase: db.supabase as never, hub: db.supabase, stripe });
  assertEquals(res.status, 503);
  assertEquals(db.authDeleted(), null);
});

Deno.test("nur gekündigte Abos: löscht alle Tabellen und den Auth-Nutzer", async () => {
  const db = fakeDb({ subRow: { stripe_customer_id: "cus_saved" } });
  const stripe = fakeStripe({ cus_saved: [{ id: "sub_old", status: "canceled", customer: "cus_saved" }] });
  const res = await handleDeleteAccount(req(), { supabase: db.supabase as never, hub: db.supabase, stripe });
  assertEquals(res.status, 200);
  const deleted = new Set(db.calls.filter((c) => c.op === "delete").map((c) => c.table));
  for (const t of [
    ...USER_TABLES.map((t) => t.table),
    ...EMAIL_TABLES.map((t) => t.table),
  ]) assert(deleted.has(t), `nicht gelöscht: ${t}`);
  for (const t of ["external_entitlements", "cart_abandons", "mail_events", "chat_logs", "analytics_events", "tool_leads"]) {
    assert(deleted.has(t), `Pflichttabelle fehlt: ${t}`);
  }
  // E-Mail-Abgleich ohne Groß/Klein, exakt.
  const mail = db.calls.find((c) => c.table === "mail_events" && c.op === "delete")!;
  assertEquals(mail.filters[0], ["ilike", "recipient", "Max@Firma.de"]);
  // Affiliate-Daten: Adresse aus fremdem Ledger entfernt.
  assert(db.calls.some((c) => c.table === "affiliate_referrals" && c.op === "update"));
  // Abmeldung bleibt erhalten.
  assert(!deleted.has("mail_optouts"));
  assertEquals(db.authDeleted(), "u1");
});

Deno.test("eigenes Partnerkonto wird gelöscht", async () => {
  const db = fakeDb({ rows: { affiliates: [{ id: "aff1", user_id: "u1" }] } });
  const res = await handleDeleteAccount(req(), { supabase: db.supabase as never, hub: db.supabase, stripe: fakeStripe({}) });
  assertEquals(res.status, 200);
  assert(db.calls.some((c) => c.table === "affiliates" && c.op === "delete" && c.filters.some((f) => f[2] === "aff1")));
});

Deno.test("Teilfehler: Auth-Nutzer bleibt, 500 mit failed-Liste", async () => {
  const db = fakeDb({ failDelete: new Set(["mail_events"]) });
  const res = await handleDeleteAccount(req(), { supabase: db.supabase as never, hub: db.supabase, stripe: fakeStripe({}) });
  assertEquals(res.status, 500);
  const body = await res.json();
  assertEquals(body.error, "partial_delete");
  assertEquals(body.failed.map((f: { table: string }) => f.table), ["mail_events"]);
  assertEquals(db.authDeleted(), null);
});

Deno.test("2FA aktiv, Session nicht bestätigt: 403, keine Abo-Prüfung, nichts gelöscht", async () => {
  const login = 1_800_000_000;
  const db = fakeDb({
    subRow: { stripe_customer_id: "cus_saved" },
    user: {
      // Bestätigung liegt VOR dem Login dieser Session → Faktor offen.
      app_metadata: { two_factor_enabled: true, two_factor_verified_at: new Date((login - 60) * 1000).toISOString() },
    },
  });
  const stripe = fakeStripe({});
  const token = jwtMitLogin(login);
  const authed = { ...db.supabase, auth: { ...db.supabase.auth, getUser: () => db.supabase.auth.getUser("good") } };
  const res = await handleDeleteAccount(
    new Request("http://x/delete-account", { method: "POST", headers: { Authorization: `Bearer ${token}` } }),
    { supabase: authed as never, hub: db.supabase, stripe },
  );
  assertEquals(res.status, 403);
  assertEquals((await res.json()).error, "two_factor_required");
  assertEquals(db.calls.filter((c) => c.op === "delete" || c.op === "update").length, 0);
  assertEquals(stripe.listed.length, 0);
  assertEquals(db.authDeleted(), null);
});

Deno.test("2FA aktiv, ohne Bestätigungszeitpunkt: 403, nichts gelöscht", async () => {
  const db = fakeDb({ user: { app_metadata: { two_factor_enabled: true } } });
  const res = await handleDeleteAccount(req(), { supabase: db.supabase as never, hub: db.supabase, stripe: fakeStripe({}) });
  assertEquals(res.status, 403);
  assertEquals(db.calls.filter((c) => c.op === "delete").length, 0);
  assertEquals(db.authDeleted(), null);
});

Deno.test("2FA aktiv und in dieser Session bestätigt: Löschung läuft", async () => {
  const login = 1_800_000_000;
  const db = fakeDb({
    user: { app_metadata: { two_factor_enabled: true, two_factor_verified_at: new Date((login + 30) * 1000).toISOString() } },
  });
  const token = jwtMitLogin(login);
  const authed = { ...db.supabase, auth: { ...db.supabase.auth, getUser: () => db.supabase.auth.getUser("good") } };
  const res = await handleDeleteAccount(
    new Request("http://x/delete-account", { method: "POST", headers: { Authorization: `Bearer ${token}` } }),
    { supabase: authed as never, hub: db.supabase, stripe: fakeStripe({}) },
  );
  assertEquals(res.status, 200);
  assertEquals(db.authDeleted(), "u1");
});

Deno.test("customers.search fällt aus: 503 statt 'kein Abo' (strikte Suche)", async () => {
  const db = fakeDb();
  const stripe = fakeStripe({});
  stripe.customers.search = () => Promise.reject(new Error("search down"));
  const res = await handleDeleteAccount(req(), { supabase: db.supabase as never, hub: db.supabase, stripe });
  assertEquals(res.status, 503);
  assertEquals(db.calls.filter((c) => c.op === "delete").length, 0);
  assertEquals(db.authDeleted(), null);
});
