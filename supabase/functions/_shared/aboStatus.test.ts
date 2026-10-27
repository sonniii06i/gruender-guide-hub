import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { appStatus, aboStatusSchreiben } from "./aboStatus.ts";

Deno.test("appStatus", () => {
  assertEquals(appStatus("active"), "active");
  assertEquals(appStatus("past_due"), "active");
  assertEquals(appStatus("trialing"), "trialing");
  for (const s of ["canceled", "unpaid", "incomplete_expired", "incomplete", "paused", ""]) assertEquals(appStatus(s), "inactive");
});

function fakeDb(treffer1: number, treffer2: number) {
  const log: Record<string, unknown>[] = [];
  let aufruf = 0;
  const q = () => {
    const self: Record<string, unknown> = {};
    let felder: Record<string, unknown> = {};
    self.update = (f: Record<string, unknown>) => { felder = f; return self; };
    self.eq = () => self; self.or = () => self;
    self.select = () => { aufruf++; log.push(felder); return Promise.resolve({ data: Array(aufruf === 1 ? treffer1 : treffer2).fill({ user_id: "u" }), error: null }); };
    return self;
  };
  return { db: { from: () => q() }, log };
}

Deno.test("Kündigung schreibt inactive über die Abo-ID", async () => {
  const { db, log } = fakeDb(1, 0);
  const r = await aboStatusSchreiben(db, { id: "sub_1", status: "canceled", customer: "cus_1" });
  assertEquals(log[0].status, "inactive");
  assertEquals(log[0].stripe_status, "canceled");
  assertEquals(r.includes("1 Zeile"), true);
});

Deno.test("Fallback über Kunde setzt die Abo-ID", async () => {
  const { db, log } = fakeDb(0, 1);
  await aboStatusSchreiben(db, { id: "sub_2", status: "trialing", customer: "cus_2" });
  assertEquals(log[1].stripe_subscription_id, "sub_2");
  assertEquals(log[1].status, "trialing");
});

Deno.test("Out-of-Order: aelteres active-Event schreibt den Live-Stand canceled", async () => {
  const { db, log } = fakeDb(1, 0);
  const { aboStatusAusStripe } = await import("./aboStatus.ts");
  const stripe = { subscriptions: { retrieve: async (id: string) => ({ id, status: "canceled", customer: "cus_1" }) } };
  await aboStatusAusStripe(db, stripe, { id: "sub_1", status: "active", customer: "cus_1" });
  assertEquals(log[0].status, "inactive");
  assertEquals(log[0].stripe_status, "canceled");
});

Deno.test("Live-Abruf scheitert -> wirft, schreibt nichts", async () => {
  const { db, log } = fakeDb(1, 0);
  const { aboStatusAusStripe } = await import("./aboStatus.ts");
  const stripe = { subscriptions: { retrieve: async () => { throw new Error("netz"); } } };
  let geworfen = false;
  try { await aboStatusAusStripe(db, stripe, "sub_1"); } catch { geworfen = true; }
  assertEquals(geworfen, true);
  assertEquals(log.length, 0);
});
