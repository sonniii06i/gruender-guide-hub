import { assert, assertEquals, assertMatch } from "jsr:@std/assert@1";
import {
  EINWILLIGUNG_TEXT, STRECKEN, STUFEN, TOOL_STRECKE, buildTippsBestaetigung, buildTippsMail,
  signiereTipps, tippsSignaturGueltig,
} from "./tippsStrecke.ts";

const UNSUB = "https://x.supabase.co/functions/v1/mail-unsubscribe?e=a%40b.de&s=abc";

Deno.test("jede Strecke hat 4 Mails, jede mit Abmeldelink in HTML und Text", () => {
  for (const s of Object.keys(STRECKEN) as (keyof typeof STRECKEN)[]) {
    assertEquals(STRECKEN[s].length, 4);
    for (const nr of [1, 2, 3, 4]) {
      const m = buildTippsMail({ strecke: s, nr, toolName: "Test-Tool", unsubscribeUrl: UNSUB });
      assert(m.html.includes(UNSUB), `${s}/${nr} HTML ohne Abmeldelink`);
      assert(m.text.includes(UNSUB), `${s}/${nr} Text ohne Abmeldelink`);
      assert(m.subject.length <= 70, `${s}/${nr} Betreff zu lang`);
      assertMatch(m.text, new RegExp(`Mail ${nr} von 4`));
      assert(!/<[a-z]/.test(m.text), `${s}/${nr} HTML im Textteil`);
    }
  }
});

Deno.test("Preis und Kündbarkeit nur in der letzten Mail, mit Steuerberater-Hinweis", () => {
  for (const s of Object.keys(STRECKEN) as (keyof typeof STRECKEN)[]) {
    for (const nr of [1, 2, 3]) assert(!buildTippsMail({ strecke: s, nr, toolName: "T", unsubscribeUrl: UNSUB }).text.includes("64,99"));
    const letzte = buildTippsMail({ strecke: s, nr: 4, toolName: "T", unsubscribeUrl: UNSUB }).text;
    assert(letzte.includes("64,99 € im Monat inkl. USt."));
    assert(letzte.includes("ersetzt keine Steuerberatung"));
  }
});

Deno.test("Links nur auf gruenderx.de", () => {
  for (const s of Object.keys(STRECKEN) as (keyof typeof STRECKEN)[]) {
    for (const m of STRECKEN[s]) {
      for (const url of [m.knopf[1], m.zweitlink?.[1]].filter(Boolean) as string[]) assertMatch(url, /^https:\/\/gruenderx\.de\//);
    }
  }
});

Deno.test("Stufen aufsteigend, Strecke endet spätestens an Tag 9", () => {
  const ab = STUFEN.map((s) => s.ab);
  assertEquals([...ab].sort((a, b) => a - b), ab);
  assert(ab[ab.length - 1] <= 24 * 10);
  assert(EINWILLIGUNG_TEXT.includes("bis zu 4 E-Mails") && EINWILLIGUNG_TEXT.includes("10 Tagen"));
});

Deno.test("Bestätigungsmail ohne Werbung, Signatur mit eigenem Präfix", async () => {
  const m = buildTippsBestaetigung({ toolName: "PR-Paket-Rechner", link: "https://l" });
  assert(!m.text.includes("64,99"));
  const sig = await signiereTipps("A@B.de ", "geheim");
  assert(await tippsSignaturGueltig("a@b.de", sig, "geheim"));
  assert(!(await tippsSignaturGueltig("c@b.de", sig, "geheim")));
});

Deno.test("alle Tools mit bekannter Strecke", () => {
  for (const t of Object.values(TOOL_STRECKE)) assert(t.strecke in STRECKEN);
});
