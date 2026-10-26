// Gründungspaket (26.10.2026): signierter, ablaufender Download-Link und die
// Pflichtinhalte der Kauf- und Widerrufsmails.
//
// Ausfuehren:  deno test -A supabase/functions/_shared/paket.test.ts
import { assert, assertEquals, assertStringIncludes } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { downloadLink, paketLinkGueltig, signierePaket } from "./paketToken.ts";
import { buildPaketBestaetigung, buildWiderrufEingang } from "./paketMail.ts";
import { KENNTNIS_TEXT, PAKET_PREIS_CENT, ZUSTIMMUNG_TEXT } from "./gruendungspaketTexte.ts";
import { PAKET_BASE64, PAKET_DATEIEN, PAKET_SHA256 } from "./gruendungspaketZip.ts";

const SECRET = "test-secret-123";
const SID = "cs_test_a1B2c3D4e5F6g7H8i9J0";

Deno.test("Download-Link: gültig, abgelaufen, fremde Session, manipuliert", async () => {
  const jetzt = Date.UTC(2026, 9, 26, 12);
  const ablauf = Math.floor(jetzt / 1000) + 3600;
  const sig = await signierePaket(SID, ablauf, SECRET);
  assert(await paketLinkGueltig(SID, ablauf, sig, SECRET, jetzt));
  assert(!(await paketLinkGueltig(SID, ablauf, sig, SECRET, jetzt + 2 * 3600_000)), "abgelaufen");
  assert(!(await paketLinkGueltig("cs_test_andereSession123456", ablauf, sig, SECRET, jetzt)), "fremde Session");
  assert(!(await paketLinkGueltig(SID, ablauf + 86400, sig, SECRET, jetzt)), "Ablauf verlängert");
  assert(!(await paketLinkGueltig(SID, ablauf, sig, "anderes-secret", jetzt)), "anderes Secret");
  assert(!(await paketLinkGueltig("pi_123", ablauf, sig, SECRET, jetzt)), "keine Checkout-Session");
  assertEquals(
    downloadLink("https://x.supabase.co/functions/v1/", SID, ablauf, sig),
    `https://x.supabase.co/functions/v1/paket-download?s=${SID}&x=${ablauf}&sig=${sig}`,
  );
});

Deno.test("Kaufbestätigung enthält Link, beide Erklärungen, USt-Ausweis (§ 312f / § 356 Abs. 6 BGB)", () => {
  const b = buildPaketBestaetigung({
    link: "https://dl.example/zip", gueltigBis: new Date(Date.UTC(2026, 9, 29, 11)), danachUrl: "https://gruenderx.de/gruendungspaket/danke?session_id=x",
    betragCent: PAKET_PREIS_CENT, bestellnummer: "pi_123", zustimmungAm: new Date(Date.UTC(2026, 9, 26, 10, 5)),
  });
  for (const teil of [b.html, b.text]) {
    assertStringIncludes(teil, "https://dl.example/zip");
    assertStringIncludes(teil, ZUSTIMMUNG_TEXT.slice(0, 40));
    assertStringIncludes(teil, KENNTNIS_TEXT.slice(0, 40));
    assertStringIncludes(teil, "24,37");   // netto aus 29,00 brutto
    assertStringIncludes(teil, "4,63");    // 19 % USt
    assertStringIncludes(teil, "29,00");
  }
});

Deno.test("Widerruf-Eingang nennt Datum/Uhrzeit und escaped Nutzertext (§ 356a Abs. 4 BGB)", () => {
  const b = buildWiderrufEingang({ name: "<b>Max</b>", email: "max@example.de", vertrag: "Abo", eingang: new Date(Date.UTC(2026, 9, 26, 10, 5)) });
  assertStringIncludes(b.text, "26. Oktober 2026");
  assertStringIncludes(b.text, "11:05");
  assert(!b.html.includes("<b>Max</b>"));
  assertStringIncludes(b.html, "&lt;b&gt;Max&lt;/b&gt;");
});

Deno.test("Eingebettete ZIP passt zu SHA-256 und Dateiliste", async () => {
  const bin = Uint8Array.from(atob(PAKET_BASE64), (c) => c.charCodeAt(0));
  const sha = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", bin))).map((x) => x.toString(16).padStart(2, "0")).join("");
  assertEquals(sha, PAKET_SHA256);
  assertEquals(bin[0], 0x50); assertEquals(bin[1], 0x4b); // "PK"
  assert(PAKET_DATEIEN.includes("00-Uebersicht-und-Quellen.pdf"));
  assert(PAKET_DATEIEN.includes("09-Gruender-Tracker.xlsx"));
});
