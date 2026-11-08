import { assertEquals } from "jsr:@std/assert@1";
import { adressMuster, adresseNormal, clientIp, ipHash } from "./ticketSchutz.ts";

Deno.test("Adresse normalisiert (Plus-Anhang, Gross/Klein)", () => {
  assertEquals(adresseNormal("Max+spam1@Example.DE"), { lokal: "max", domain: "example.de" });
  assertEquals(adresseNormal("kaputt"), null);
});

Deno.test("ILIKE-Muster escaped Platzhalter", () => {
  assertEquals(adressMuster({ lokal: "a_b%", domain: "x.de" }), { exakt: "a\\_b\\%@x.de", plus: "a\\_b\\%+%@x.de" });
});

Deno.test("IP nur aus vertrauenswuerdigen Kopfzeilen", async () => {
  const r = new Request("https://x", { headers: { "x-forwarded-for": "1.2.3.4" } });
  assertEquals(clientIp(r), "");
  const r2 = new Request("https://x", { headers: { "cf-connecting-ip": "5.6.7.8", "x-forwarded-for": "1.2.3.4" } });
  assertEquals(clientIp(r2), "5.6.7.8");
  assertEquals((await ipHash("5.6.7.8")).length, 24);
  assertEquals(await ipHash(""), "");
});
