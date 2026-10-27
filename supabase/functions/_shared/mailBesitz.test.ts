import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { mailVerifiziert, pruefeVerifyToken, verifyToken } from "./mailBesitz.ts";

const u = (am: Record<string, unknown>, conf = "2026-10-27") => ({ email: "a@b.de", email_confirmed_at: conf, app_metadata: am });

Deno.test("Sofort-Registrierung ohne Flag-Klick zaehlt nicht als Besitz", () => {
  assertEquals(mailVerifiziert(u({ provider: "email", mail_verifiziert: false })), false);
  assertEquals(mailVerifiziert(u({ provider: "email" })), false); // fehlendes Flag = nein
});
Deno.test("Flag true / OAuth zaehlen", () => {
  assert(mailVerifiziert(u({ provider: "email", mail_verifiziert: true, mail_verifiziert_email: "a@b.de" })));
  // Review: Flag ohne/mit anderer Adresse (nach Mail-Aenderung) zaehlt nicht
  assertEquals(mailVerifiziert(u({ provider: "email", mail_verifiziert: true })), false);
  assertEquals(mailVerifiziert(u({ provider: "email", mail_verifiziert: true, mail_verifiziert_email: "alt@b.de" })), false);
  // OAuth nur mit Identitaet fuer genau diese Adresse
  assertEquals(mailVerifiziert(u({ provider: "google" })), false);
  assert(mailVerifiziert({ ...u({ provider: "google" }), identities: [{ provider: "google", identity_data: { email: "A@b.de", email_verified: true } }] }));
  assertEquals(mailVerifiziert({ ...u({ provider: "google" }), identities: [{ provider: "google", identity_data: { email: "alt@b.de" } }] }), false);
  assertEquals(mailVerifiziert({ ...u({ provider: "email" }), identities: [{ provider: "email", identity_data: { email: "a@b.de" } }] }), false);
  assertEquals(mailVerifiziert(u({ provider: "google", mail_verifiziert: false })), false);
  assertEquals(mailVerifiziert(u({ mail_verifiziert: true }, "")), false);
});
Deno.test("Token: gueltig, falsche Signatur, abgelaufen, fremder Schluessel", async () => {
  const t = await verifyToken("geheim", "11111111-2222-3333-4444-555555555555", "A@B.de", 1000);
  const r = await pruefeVerifyToken("geheim", t, 1001);
  assert(r.ok); if (r.ok) assertEquals(r.email, "a@b.de");
  assertEquals((await pruefeVerifyToken("anders", t, 1001)).ok, false);
  assertEquals((await pruefeVerifyToken("geheim", t, 1000 + 8 * 86400)).ok, false);
  const [p] = t.split(".");
  assertEquals((await pruefeVerifyToken("geheim", p + ".xxx", 1001)).ok, false);
  assertEquals((await pruefeVerifyToken("geheim", "kaputt", 1001)).ok, false);
});
