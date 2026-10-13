// Tests für Mail-Bausteine: Wochenmail-Escaping, ICS-Escaping/Falten,
// Betreff der Terminbestätigung, 15-Min-Erinnerung aus dem Kit.
//
// Ausführen:  deno test supabase/functions/_shared/mails.test.ts
import { assert, assertEquals, assertStringIncludes } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { buildWeekly, sichereUrl } from "./campaigns.ts";
import { buildIcs, confirmationEmail, icsFold, icsText, reminder15minEmail, type BookingRow } from "./booking-emails.ts";

Deno.test("sichereUrl: nur https, sonst Ersatz", () => {
  assertEquals(sichereUrl("https://lu.ma/x", "E"), "https://lu.ma/x");
  assertEquals(sichereUrl("javascript:alert(1)", "E"), "E");
  assertEquals(sichereUrl("data:text/html,x", "E"), "E");
  assertEquals(sichereUrl("kaputt", "E"), "E");
  assertEquals(sichereUrl(undefined, "E"), "E");
  // Runde 1: nur https, keine Zeichen, die aus dem href-Attribut ausbrechen.
  assertEquals(sichereUrl("http://lu.ma/x", "E"), "E");
  assertEquals(sichereUrl('https://lu.ma/x" onclick="a', "E"), "E");
  assertEquals(sichereUrl("https://lu.ma/<x>", "E"), "E");
});

Deno.test("Wochenmail: fremde Event-/Fristfelder werden escaped, javascript:-Links ersetzt", () => {
  const b = buildWeekly({
    stand: {
      events: [{
        name: '<a href="https://phish">Jetzt verifizieren</a>',
        wann: "Di 14.10.",
        ort: "<img src=x>",
        url: "javascript:alert(1)",
      }],
      fristen: [{ name: "<b>Frist</b>", wann: "31.10.", url: "https://ok.example/f" }],
      neueArtikel: [["<script>x</script>", "/ratgeber/a"]],
    },
    baseUrl: "https://gruenderx.de",
  });
  assert(!b.html.includes('<a href="https://phish">'), "rohes HTML aus Event-Namen");
  assert(!b.html.includes("<img src=x>"), "rohes HTML aus Ort");
  assert(!b.html.includes("javascript:"), "javascript:-Link");
  assert(!b.html.includes("<script>x</script>"), "rohes HTML aus Artikeltitel");
  assertStringIncludes(b.html, "&lt;a href=&quot;https://phish&quot;&gt;");
  assertStringIncludes(b.html, 'href="https://gruenderx.de/gruender-events"');
  assertStringIncludes(b.html, 'href="https://ok.example/f"');
  assert(!b.text.includes("javascript:"));
});

const buchung = (p: Partial<BookingRow> = {}): BookingRow => ({
  id: "12345678-aaaa-bbbb-cccc-1234567890ab",
  slot_iso: "2026-10-14T12:00:00Z", // 14:00 Uhr Berlin (MESZ)
  name: "Müller, Hans",
  email: "hans@example.com",
  topic: "Steuern; Rechtsform",
  message: null,
  meet_link: null,
  ...p,
});

Deno.test("icsText escaped \\ ; , und Zeilenumbrüche nach RFC 5545", () => {
  assertEquals(icsText("a;b,c\\d\r\nATTENDEE:x"), "a\\;b\\,c\\\\d\\nATTENDEE:x");
});

Deno.test("icsFold: keine Zeile über 75 Oktette, Entfalten ergibt Original", () => {
  const zeile = "DESCRIPTION:" + "Ä".repeat(100);
  const gefaltet = icsFold(zeile);
  for (const z of gefaltet.split("\r\n")) assert(new TextEncoder().encode(z).length <= 75);
  assertEquals(gefaltet.replace(/\r\n /g, ""), zeile);
});

Deno.test("buildIcs: Injektion über Thema/Name erzeugt keine eigene Property", () => {
  const ics = buildIcs(buchung({
    topic: "X\r\nATTENDEE:mailto:boese@example.com\r\nURL:https://phish",
    name: 'Eva "E"; Test:1',
    meet_link: "javascript:alert(1)",
  }));
  const zeilen = ics.replace(/\r\n /g, "").split("\r\n");
  assertEquals(zeilen.filter((z) => z.startsWith("ATTENDEE")).length, 1);
  assert(!zeilen.some((z) => z.startsWith("URL:")));
  assert(zeilen.includes('ATTENDEE;CN="Eva E; Test:1";RSVP=TRUE:mailto:hans@example.com'));
  assert(!ics.includes("javascript:"));
  for (const z of ics.split("\r\n")) assert(new TextEncoder().encode(z).length <= 75, z);
});

Deno.test("Bestätigung: Betreff enthält Datum UND Uhrzeit", () => {
  const m = confirmationEmail(buchung());
  assertEquals(m.subject, "Termin bestätigt: Mittwoch, 14. Oktober, 14:00 Uhr");
});

Deno.test("15-Min-Erinnerung: Kit-Layout, Link nur bei https, keine falsche Zeitzusage", () => {
  const ohne = reminder15minEmail(buchung());
  assert(!ohne.html.includes("#10b981") && !ohne.html.includes("#ef4444"));
  assert(!ohne.text.includes("1-2 Min") && !ohne.html.includes("1-2 Min"));
  assertStringIncludes(ohne.text, "in Kürze");
  assertEquals(ohne.subject, "In 15 Min: dein GründerX 1:1-Call");
  const mit = reminder15minEmail(buchung({ meet_link: "https://meet.google.com/abc-defg-hij" }));
  assertStringIncludes(mit.html, 'href="https://meet.google.com/abc-defg-hij"');
  assertStringIncludes(mit.text, "https://meet.google.com/abc-defg-hij");
  const boese = reminder15minEmail(buchung({ meet_link: 'javascript:alert(1)' }));
  assert(!boese.html.includes("javascript:"));
});
