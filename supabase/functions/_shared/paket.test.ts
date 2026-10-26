// Gründungspaket (26.10.2026): signierter, ablaufender Download-Link und die
// Pflichtinhalte der Kauf- und Widerrufsmails.
//
// Ausfuehren:  deno test -A supabase/functions/_shared/paket.test.ts
import { assert, assertEquals, assertStringIncludes } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { downloadLink, paketLinkGueltig, signierePaket } from "./paketToken.ts";
import { buildPaketBestaetigung, buildWiderrufEingang } from "./paketMail.ts";
import { KENNTNIS_TEXT, PAKET_PREIS_CENT, ZUSTIMMUNG_TEXT } from "./gruendungspaketTexte.ts";
import { PAKET_BASE64, PAKET_DATEIEN, PAKET_SHA256 } from "./gruendungspaketZip.ts";
import {
  LIMIT_ADRESSE_TAG, LIMIT_GLOBAL_STUNDE, LIMIT_IP_STUNDE, VERTRAGSARTEN, bestaetigungErlaubt, clientIp, globalErlaubt, ipProbe, ipSchluessel,
  ipStufeAktiv, limitAdresse, pruefeWiderruf,
} from "./widerruf.ts";
import { paketModus, paketStripe, sessionPasstZumModus, testZugangOk } from "./paketStripe.ts";

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

Deno.test("Widerruf-Eingang: Datum/Uhrzeit, kein Name/Freitext an den Verbraucher, interne Kopie vollständig", () => {
  const eingang = new Date(Date.UTC(2026, 9, 26, 10, 5));
  const k = buildWiderrufEingang({ vertrag: VERTRAGSARTEN.abo, bestellnummer: "sub_1ABCdefGHI", eingang });
  assertStringIncludes(k.text, "26. Oktober 2026");
  assertStringIncludes(k.text, "11:05");
  assertStringIncludes(k.text, "sub_1ABCdefGHI");
  assertEquals(k.subject, "Eingangsbestätigung deines Widerrufs");
  assert(!k.text.includes("Name:"));
  const i = buildWiderrufEingang({ vertrag: VERTRAGSARTEN.abo, eingang, intern: { name: "Max <b>", email: "max@example.de" } });
  assertStringIncludes(i.text, "Name: Max <b>");
  assert(!i.html.includes("Max <b>"), "intern escaped");
  assertStringIncludes(i.html, "Max &lt;b&gt;");
  assert(!i.subject.includes("Max"), "neutraler Betreff");
});

Deno.test("Widerruf-Eingabe: nur Auswahl, Stripe-Kennung, Datum, Name ohne Links", () => {
  assert(pruefeWiderruf({ name: "Max Müller", email: "Max@Example.de", vertrag: "abo" }).ok);
  assertEquals(pruefeWiderruf({ name: "Max", email: "m@x.de", vertrag: "Kauf billig unter http://spam" }), { ok: false, feld: "vertrag" });
  assertEquals(pruefeWiderruf({ name: "Visit http://spam.example", email: "m@x.de", vertrag: "abo" }), { ok: false, feld: "name" });
  assertEquals(pruefeWiderruf({ name: "Max", email: "m@x.de", vertrag: "abo", bestellnummer: "free text here" }), { ok: false, feld: "bestellnummer" });
  assertEquals(pruefeWiderruf({ name: "Max", email: "m@x.de", vertrag: "abo", kaufdatum: "gestern" }), { ok: false, feld: "kaufdatum" });
  const ok = pruefeWiderruf({ name: "  Anna   Lena ", email: "a@b.de", vertrag: "gruendungspaket", bestellnummer: "pi_3Abcdefgh", kaufdatum: "2026-10-26" });
  assert(ok.ok && ok.daten.name === "Anna Lena");
});

Deno.test("Limit-Schlüssel: Plus-Adressen zusammengefasst, IP nur gehasht", async () => {
  assertEquals(limitAdresse("Max+spam1@Example.de"), "max@example.de");
  assertEquals(limitAdresse("max+2@example.de"), limitAdresse("max@example.de"));
  const a = await ipSchluessel("203.0.113.7");
  assert(a.startsWith("ip:") && !a.includes("203.0.113.7"));
  assertEquals(a, await ipSchluessel("203.0.113.7"));
});

Deno.test("Widerruf: Kundenmail fail-closed, Adresse/IP vor global, global nur echte Slots", () => {
  assert(bestaetigungErlaubt(1, 1), "erste Anfrage");
  assert(bestaetigungErlaubt(LIMIT_ADRESSE_TAG, LIMIT_IP_STUNDE), "genau am Limit");
  assert(!bestaetigungErlaubt(LIMIT_ADRESSE_TAG + 1, 1), "Adresse drüber");
  assert(!bestaetigungErlaubt(1, LIMIT_IP_STUNDE + 1), "IP drüber");
  assert(!bestaetigungErlaubt(null, 1), "Zähler unlesbar -> gedrosselt (fail-closed)");
  assert(!bestaetigungErlaubt(1, null));
  // Review 4: ohne vertrauten IP-Header keine IP-Stufe – der Bucket „unbekannt“ drosselt nicht alle
  assert(bestaetigungErlaubt(1, null, false), "IP-Stufe übersprungen");
  assert(bestaetigungErlaubt(1, 999, false), "IP-Zähler egal ohne vertrauten Header");
  assert(!bestaetigungErlaubt(LIMIT_ADRESSE_TAG + 1, null, false), "Adress-Limit gilt weiter");
  assert(!bestaetigungErlaubt(null, null, false), "Adress-Zähler unlesbar -> gedrosselt");
  assert(globalErlaubt(1) && globalErlaubt(LIMIT_GLOBAL_STUNDE));
  assert(!globalErlaubt(LIMIT_GLOBAL_STUNDE + 1));
  assert(!globalErlaubt(null), "Slot-Zähler unlesbar -> gedrosselt");
});

Deno.test("Client-IP: ohne gemessenen Header gemeinsamer Bucket, Client-Werte ignoriert", () => {
  const h = (m: Record<string, string>) => ({ get: (n: string) => m[n] ?? null });
  const gefaelscht = h({ "cf-connecting-ip": "6.6.6.6", "x-real-ip": "6.6.6.6", "x-forwarded-for": "6.6.6.6" });
  assertEquals(clientIp(gefaelscht), { ip: "unbekannt", quelle: "unbekannt" });
  assertEquals(clientIp(gefaelscht, "x-evil-header"), { ip: "unbekannt", quelle: "unbekannt" });
  assertEquals(clientIp(h({ "x-real-ip": "198.51.100.2" }), "X-Real-IP"), { ip: "198.51.100.2", quelle: "x-real-ip" });
  assertEquals(clientIp(h({ "x-forwarded-for": "6.6.6.6, 203.0.113.9" }), "x-forwarded-for").ip, "203.0.113.9");
  assertEquals(clientIp(h({}), "cf-connecting-ip").ip, "unbekannt");
});

Deno.test("IP-Messprobe meldet nur gefälscht/angehängt/anders/fehlt, keine IPs", () => {
  const h = (m: Record<string, string>) => ({ get: (n: string) => m[n] ?? null });
  const p = ipProbe(h({ "cf-connecting-ip": "198.51.100.77", "x-real-ip": "203.0.113.5", "x-forwarded-for": "198.51.100.77, 203.0.113.5" }), "198.51.100.77");
  assertEquals(p, "cf-connecting-ip=gefaelscht x-real-ip=anders x-forwarded-for=gefaelscht+angehaengt");
  assert(!p.includes("203.0.113.5"));
});

Deno.test("Verkaufsschalter: ohne PAKET_STRIPE_MODUS aus; Test nur mit Zugang; Session muss zum Modus passen", () => {
  const env = (m: Record<string, string>) => (n: string) => m[n];
  assertEquals(paketModus(env({})), "aus");
  assertEquals(paketModus(env({ PAKET_STRIPE_MODUS: "irgendwas" })), "aus");
  assertEquals(paketStripe(env({ STRIPE_SECRET_KEY: "sk_live_x", STRIPE_TEST_SECRET_KEY: "sk_test_x" })), null);
  assertEquals(paketStripe(env({ PAKET_STRIPE_MODUS: "test", STRIPE_TEST_SECRET_KEY: "sk_live_vertauscht" })), null);
  assertEquals(paketStripe(env({ PAKET_STRIPE_MODUS: "live", STRIPE_SECRET_KEY: "sk_test_vertauscht" })), null);
  assertEquals(paketStripe(env({ PAKET_STRIPE_MODUS: "test", STRIPE_TEST_SECRET_KEY: "sk_test_abc" }))?.modus, "test");
  const zugang = "z".repeat(32);
  assert(testZugangOk(zugang, env({ PAKET_TEST_ZUGANG: zugang })));
  assert(!testZugangOk(undefined, env({ PAKET_TEST_ZUGANG: zugang })));
  assert(!testZugangOk("kurz", env({ PAKET_TEST_ZUGANG: "kurz" })), "zu kurzer Zugang zählt nicht");
  assert(!sessionPasstZumModus(false, "live"), "Test-Session im Live-Betrieb");
  assert(sessionPasstZumModus(true, "live"));
  assert(sessionPasstZumModus(false, "test"));
  assert(!sessionPasstZumModus(true, "test"));
  assert(!sessionPasstZumModus(true, "aus") && !sessionPasstZumModus(false, "aus"));
});

Deno.test("Eingebettete ZIP passt zu SHA-256 und Dateiliste", async () => {
  const bin = Uint8Array.from(atob(PAKET_BASE64), (c) => c.charCodeAt(0));
  const sha = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", bin))).map((x) => x.toString(16).padStart(2, "0")).join("");
  assertEquals(sha, PAKET_SHA256);
  assertEquals(bin[0], 0x50); assertEquals(bin[1], 0x4b); // "PK"
  assert(PAKET_DATEIEN.includes("00-Uebersicht-und-Quellen.pdf"));
  assert(PAKET_DATEIEN.includes("09-Gruender-Tracker.xlsx"));
});

Deno.test("IP-Stufe nur aus Konfiguration: gesetzt + Header fehlt -> strenger Bucket „unbekannt“ (Review 5)", () => {
  assertEquals(ipStufeAktiv(undefined), false);
  assertEquals(ipStufeAktiv("  "), false);
  assertEquals(ipStufeAktiv("x-real-ip"), true);
  const ohneHeader = { get: (_: string) => null };
  assertEquals(clientIp(ohneHeader, "x-real-ip").ip, "unbekannt");
  // IP-Stufe bleibt aktiv: der gemeinsame Bucket zählt, über dem Limit wird gedrosselt
  assertEquals(bestaetigungErlaubt(1, 99, ipStufeAktiv("x-real-ip")), false);
  assertEquals(bestaetigungErlaubt(1, 99, ipStufeAktiv(undefined)), true);
});
