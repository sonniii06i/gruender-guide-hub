import { assert, assertEquals } from "jsr:@std/assert@1";
import { alarmSignaturGueltig, auswahl, buildAlarmBestaetigung, buildAlarmMail, signiereAlarm, type Chance } from "./chancenAlarm.ts";
import { signiereTipps } from "./tippsStrecke.ts";

const UNSUB = "https://x.supabase.co/functions/v1/mail-unsubscribe?e=a%40b.de&s=abc";
const c = (id: string, x: Partial<Chance>): Chance =>
  ({ id, art: "wettbewerb", titel: id, veranstalter: "V", sortierung: "2026-11-01", ort: "Hamburg", region: "HH", nurFrauen: false, url: "https://x.de", ...x });
const HEUTE = "2026-10-26";
const liste = [
  c("wb-hh", { frist: "2026-11-30" }),
  c("wb-by", { frist: "2026-11-30", region: "BY" }),
  c("wb-bund-bald", { frist: "2026-10-30", region: "bund" }),
  c("pitch-hh", { art: "pitch", datum: "2026-11-05" }),
  c("pitch-weit", { art: "pitch", datum: "2027-03-01" }),
  c("frauen", { art: "netzwerk", datum: "2026-11-02", nurFrauen: true }),
  c("vorbei", { frist: "2026-10-01" }),
];

Deno.test("Auswahl: Art, Region (bundesweit gilt überall), Frauen-Filter, Event-Fenster 45 Tage", () => {
  const r = auswahl(liste, { arten: ["wettbewerb", "pitch", "netzwerk"], region: "HH", ohne_nur_frauen: true, gesendet: [] }, HEUTE);
  assertEquals(r.neu.map((x) => x.id).sort(), ["pitch-hh", "wb-bund-bald", "wb-hh"]);
  assertEquals(r.letzteChance.length, 0);
});

Deno.test("Schon Gesendetes kommt nicht wieder – außer als letzte Chance (Frist ≤ 7 Tage)", () => {
  const r = auswahl(liste, { arten: ["wettbewerb"], region: "alle", ohne_nur_frauen: false, gesendet: ["wb-hh", "wb-bund-bald"] }, HEUTE);
  assertEquals(r.neu.map((x) => x.id), ["wb-by"]);
  assertEquals(r.letzteChance.map((x) => x.id), ["wb-bund-bald"]);
  assertEquals(r.alleNeuIds, ["wb-by"]);
});

Deno.test("Wochenmail trägt den Abmeldelink in HTML und Text, kein HTML im Textteil", () => {
  const r = auswahl(liste, { arten: ["wettbewerb", "pitch"], region: "alle", ohne_nur_frauen: false, gesendet: [] }, HEUTE);
  const m = buildAlarmMail({ ...r, unsubscribeUrl: UNSUB });
  assert(m.html.includes(UNSUB) && m.text.includes(UNSUB));
  assert(!/<[a-z]/.test(m.text));
  assert(m.subject.length <= 70);
});

Deno.test("Bestätigungsmail ohne Nutzertexte außer der Auswahl, mit Link", () => {
  const m = buildAlarmBestaetigung({ link: "https://x/chancen-bestaetigen?e=a&s=b", arten: ["pitch", "<script>"] });
  assert(m.html.includes("chancen-bestaetigen"));
  assert(!m.html.includes("<script>"));
});

Deno.test("Signatur: eigenes Präfix – Tipps-Signatur gilt hier nicht", async () => {
  const s = await signiereAlarm("A@b.de", "geheim");
  assert(await alarmSignaturGueltig("a@b.de", s, "geheim"));
  assert(!(await alarmSignaturGueltig("a@b.de", await signiereTipps("a@b.de", "geheim"), "geheim")));
});
