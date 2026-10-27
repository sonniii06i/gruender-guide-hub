import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { verifizierungSenden } from "./mailVerifySend.ts";

// Der RPC mail_verify_slot ist atomar (live getestet: 6 parallele Aufrufe -> genau 1 true).
// Hier: Ohne Slot wird weder gesendet noch das Konto angefasst.
Deno.test("ohne Slot: gedrosselt, kein Versand, kein Update", async () => {
  let updates = 0;
  const admin = {
    rpc: () => Promise.resolve({ data: false, error: null }),
    auth: { admin: { updateUserById: () => { updates++; return Promise.resolve({}); } } },
  };
  assertEquals(await verifizierungSenden(admin, { id: "u1", email: "a@b.de" }), "gedrosselt");
  assertEquals(updates, 0);
});
Deno.test("RPC-Fehler: fehler (fail-closed)", async () => {
  const admin = { rpc: () => Promise.resolve({ data: null, error: { message: "x" } }), auth: { admin: {} } };
  assertEquals(await verifizierungSenden(admin, { id: "u1", email: "a@b.de" }), "fehler");
});
