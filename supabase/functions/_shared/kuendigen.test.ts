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
