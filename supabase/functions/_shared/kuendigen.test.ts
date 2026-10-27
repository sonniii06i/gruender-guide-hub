import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { kuendbar, mailNorm, pruefeKuendigung } from "./kuendigen.ts";

const basis = { name: "Max Probe", email: "Max@Example.com", vertrag: "abo" };

Deno.test("ordentliche Kündigung zum nächstmöglichen Zeitpunkt ist gültig", () => {
  const r = pruefeKuendigung(basis);
  assertEquals(r.ok, true);
  if (r.ok) {
    assertEquals(r.daten.email, "max@example.com");
    assertEquals(r.daten.art, "ordentlich");
    assertEquals(r.daten.zeitpunkt, "naechstmoeglich");
  }
});

Deno.test("außerordentliche Kündigung braucht einen Grund", () => {
  assertEquals(pruefeKuendigung({ ...basis, art: "ausserordentlich" }), { ok: false, feld: "grund" });
  assertEquals(pruefeKuendigung({ ...basis, art: "ausserordentlich", grund: "Leistung nicht erbracht" }).ok, true);
});

Deno.test("Freitext und Prototyp-Schlüssel als Vertrag/Art werden abgelehnt", () => {
  assertEquals(pruefeKuendigung({ ...basis, vertrag: "Kauf billig http://x" }), { ok: false, feld: "vertrag" });
  assertEquals(pruefeKuendigung({ ...basis, vertrag: "constructor" }), { ok: false, feld: "vertrag" });
  assertEquals(pruefeKuendigung({ ...basis, art: "__proto__" }), { ok: false, feld: "art" });
  assertEquals(pruefeKuendigung({ ...basis, zeitpunkt: "morgen" }), { ok: false, feld: "zeitpunkt" });
  assertEquals(pruefeKuendigung({ ...basis, name: "<a href=x>" }), { ok: false, feld: "name" });
});

Deno.test("Mail-Normalisierung und kündbare Stati", () => {
  assertEquals(mailNorm("A.B+test@Mail.de"), "a.b@mail.de");
  assertEquals(kuendbar("trialing"), true);
  assertEquals(kuendbar("active"), true);
  assertEquals(kuendbar("canceled"), false);
  assertEquals(kuendbar("incomplete_expired"), false);
});

import { signiereKuendigung, tokenGueltig, zerlegeToken } from "./kuendigen.ts";

Deno.test("Bestätigungslink: gültig nur mit passender Adresse, Signatur und vor Ablauf", async () => {
  const s = "geheim";
  const ab = Math.floor(Date.now() / 1000) + 3600;
  const t = await signiereKuendigung("a".repeat(32), ab, "Max+x@Example.com", s);
  assertEquals(await tokenGueltig(t, "max+x@example.com", s), true);
  assertEquals(await tokenGueltig(t, "max@example.com", s), false);   // Plus-Anhang ist eine andere Adresse
  assertEquals(await tokenGueltig(t, "anders@example.com", s), false);
  assertEquals(await tokenGueltig(t, "max@example.com", "falsch"), false);
  const alt = await signiereKuendigung("b".repeat(32), Math.floor(Date.now() / 1000) - 10, "max@example.com", s);
  assertEquals(await tokenGueltig(alt, "max@example.com", s), false);
  assertEquals(zerlegeToken("kaputt"), null);
});

import { mailExakt } from "./kuendigen.ts";

Deno.test("Autorisierung exakt: Plus-Anhang/Punkte sind andere Adressen", () => {
  assertEquals(mailExakt(" A+x@Gmail.com "), "a+x@gmail.com");
  assertEquals(mailExakt("a+x@gmail.com") === mailExakt("a@gmail.com"), false);
  assertEquals(mailExakt("a.b@gmail.com") === mailExakt("ab@gmail.com"), false);
});
