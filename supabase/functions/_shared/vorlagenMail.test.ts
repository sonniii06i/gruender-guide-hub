// Vorlagen-Bibliothek (22.10.2026): Signatur ist an Adresse UND Zweck
// gebunden, die Mail nennt Titel und Link in HTML und Text.
//
// Ausfuehren:  deno test -A supabase/functions/_shared/vorlagenMail.test.ts
import { assert, assertEquals, assertNotEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { signEmail } from "./unsubscribe.ts";
import {
  bestaetigungsLink, buildVorlagenBestaetigung, freigabeLink, signaturGueltig, signiereVorlagenMail,
} from "./vorlagenMail.ts";

const SECRET = "test-secret-123";

Deno.test("Signatur ist deterministisch und ignoriert Gross-/Kleinschreibung", async () => {
  const a = await signiereVorlagenMail("Max@Example.de", SECRET);
  const b = await signiereVorlagenMail("  max@example.de ", SECRET);
  assertEquals(a, b);
  assertEquals(a.length, 64);
  assert(await signaturGueltig("max@example.de", a, SECRET));
});

Deno.test("Signatur unterscheidet sich von der Abmelde-Signatur derselben Adresse", async () => {
  const vorlagen = await signiereVorlagenMail("max@example.de", SECRET);
  const abmelden = await signEmail("max@example.de", SECRET);
  assertNotEquals(vorlagen, abmelden);
  assertEquals(await signaturGueltig("max@example.de", abmelden, SECRET), false);
});

Deno.test("fremde Adresse, fremdes Secret und kaputte Signatur werden abgelehnt", async () => {
  const sig = await signiereVorlagenMail("max@example.de", SECRET);
  assertEquals(await signaturGueltig("moritz@example.de", sig, SECRET), false);
  assertEquals(await signaturGueltig("max@example.de", sig, "anderes"), false);
  assertEquals(await signaturGueltig("max@example.de", "nicht-hex", SECRET), false);
  assertEquals(await signaturGueltig("max@example.de", sig.slice(0, 63), SECRET), false);
});

Deno.test("Links tragen Adresse, Slug und Signatur", async () => {
  const sig = await signiereVorlagenMail("max@example.de", SECRET);
  const link = bestaetigungsLink("https://x.supabase.co/functions/v1/", "Max@example.de", "gbr-gesellschaftsvertrag", sig);
  assertEquals(link,
    `https://x.supabase.co/functions/v1/vorlage-bestaetigen?e=max%40example.de&v=gbr-gesellschaftsvertrag&s=${sig}`);
  const ziel = freigabeLink("max@example.de", "gbr-gesellschaftsvertrag", sig);
  assert(ziel.startsWith("https://gruenderx.de/vorlagen/gbr-gesellschaftsvertrag?freigabe=1&e=max%40example.de&s="));
});

Deno.test("Bestaetigungsmail nennt Titel und Link in HTML und Text, ohne Abmeldelink", () => {
  const link = "https://x.supabase.co/functions/v1/vorlage-bestaetigen?e=a%40b.de&v=x&s=abc";
  const m = buildVorlagenBestaetigung({ titel: "GbR-Gesellschaftsvertrag", link, bereitsBestaetigt: false });
  assertEquals(m.subject, "Bitte bestätigen: GbR-Gesellschaftsvertrag");
  assert(m.html.includes(link));
  assert(m.text.includes(link));
  assert(m.text.includes("GbR-Gesellschaftsvertrag"));
  assert(!m.html.includes("Abmelden"));
  assert(!m.text.includes("Abmelden:"));

  const n = buildVorlagenBestaetigung({ titel: "NDA", link, bereitsBestaetigt: true });
  assertEquals(n.subject, "Dein Download-Link: NDA");
  assert(n.html.includes(link));
  assert(n.text.includes("schon bestätigt"));
});

Deno.test("Titel wird im HTML escaped", () => {
  const m = buildVorlagenBestaetigung({ titel: "<b>x</b>", link: "https://a.de", bereitsBestaetigt: false });
  assert(!m.html.includes("<b>x</b>"));
  assert(m.html.includes("&lt;b&gt;x&lt;/b&gt;"));
});
