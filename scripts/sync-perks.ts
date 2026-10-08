// Perk-Wächter: prüft täglich jede offizielle Programmseite aus src/data/startupPerks.ts
// → src/data/perksLive.json. Läuft in der Action „Gründer-Events aktualisieren“,
// lokal: `npx tsx scripts/sync-perks.ts [--dry]`.
// Status je Perk: ok (alle Prüfwörter da) · geaendert (Seite erreichbar, Prüfwörter fehlen –
// Programm vermutlich geändert, Eintrag nachpflegen) · fehler (HTTP-Fehler/Bot-Schutz) ·
// browser (Seite sperrt Rechenzentren oder rendert per Skript; nur von Hand prüfbar).
// Fehler zählen nie als ok; der letzte erfolgreiche Prüftag bleibt erhalten.

import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { STARTUP_PERKS } from "../src/data/startupPerks";

const OUT = resolve("src/data/perksLive.json");
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36 GruenderX-Perkwaechter/1.0";
const DRY = process.argv.includes("--dry");
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Status = "ok" | "geaendert" | "fehler" | "browser";
type Ergebnis = { status: Status; detail: string; fehlend?: string[]; letzterErfolg: string | null };

// Zahlen kommen als „$1,000“, „$1.000“, „1 000 $“ oder mit geschütztem Leerzeichen – vor dem Vergleich angleichen.
const norm = (s: string) =>
  s
    // Skript-Inhalte bleiben drin: Next.js-Seiten liefern den sichtbaren Text als JSON im <script>.
    // Nur echte Tags entfernen – ein „<“ im JavaScript (i<n) würde sonst ganze Absätze verschlucken.
    .replace(/<\/?[a-z][^<>]*>/gi, " ")
    .replace(/\\u0024/g, "$")
    .replace(/&([aou])uml;/gi, (_, v) => ({ a: "ä", o: "ö", u: "ü", A: "Ä", O: "Ö", U: "Ü" })[v as "a"])
    .replace(/&szlig;/g, "ß")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&dollar;/g, "$")
    .replace(/&euro;/g, "€")
    .replace(/[\u00a0\u202f\u2009]/g, " ")
    .replace(/(\d)[.,\s](?=\d{3}\b)/g, "$1")
    .replace(/\s+/g, " ")
    .toLowerCase();

// Echte Sperrseiten sind kurz; große Seiten nennen „captcha“ oft nur im eingebundenen reCAPTCHA-Skript.
const istSperrseite = (status: number, text: string) =>
  status === 403 || status === 429 || (text.length < 40_000 && /cf-chl|just a moment|x-amzn-waf|perfdrive|captcha/i.test(text));

async function holen(url: string): Promise<{ status: number; text: string }> {
  let letzter: unknown;
  for (let i = 0; i < 2; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } /* ohne Accept-Language: Prüfwörter stammen aus der Standardfassung, „de“ liefert „1.000 $“ statt „$1,000“ */, redirect: "follow", signal: AbortSignal.timeout(25_000) });
      return { status: r.status, text: await r.text() };
    } catch (e) {
      letzter = e;
      await sleep(1500);
    }
  }
  throw letzter;
}

const alt: { perks?: Record<string, Ergebnis> } = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const heute = new Date().toISOString().slice(0, 10);
const perks: Record<string, Ergebnis> = {};
const zaehler: Record<Status, number> = { ok: 0, geaendert: 0, fehler: 0, browser: 0 };

for (const p of STARTUP_PERKS) {
  const vorher = alt.perks?.[p.slug]?.letzterErfolg ?? null;
  let e: Ergebnis;
  try {
    const { status, text } = await holen(p.url);
    const gesperrt = istSperrseite(status, text);
    if (gesperrt) {
      e = p.nurBrowser
        ? { status: "browser", detail: `HTTP ${status} – Seite sperrt automatische Abrufe, im Browser prüfen`, letzterErfolg: vorher }
        : { status: "fehler", detail: `HTTP ${status} – Bot-Schutz`, letzterErfolg: vorher };
    } else if (status >= 400) {
      e = { status: "fehler", detail: `HTTP ${status} – Seite weg oder umgezogen`, letzterErfolg: vorher };
    } else {
      const t = norm(text);
      const fehlend = p.pruefWorte.filter((w) => !t.includes(norm(w)));
      if (!fehlend.length) e = { status: "ok", detail: `${p.pruefWorte.length} Prüfwörter gefunden`, letzterErfolg: heute };
      else if (p.nurBrowser) e = { status: "browser", detail: `Inhalt per Skript geladen – fehlt im HTML: ${fehlend.join(", ")}`, fehlend, letzterErfolg: vorher };
      else e = { status: "geaendert", detail: `Fehlt auf der Seite: ${fehlend.join(", ")} – Programm vermutlich geändert`, fehlend, letzterErfolg: vorher };
    }
  } catch (err) {
    const detail = `Abruf fehlgeschlagen: ${(err as Error).message}`;
    e = p.nurBrowser ? { status: "browser", detail: `${detail} – Seite blockt automatische Abrufe, im Browser prüfen`, letzterErfolg: vorher } : { status: "fehler", detail, letzterErfolg: vorher };
  }
  perks[p.slug] = e;
  zaehler[e.status]++;
  console.log(`${e.status.padEnd(9)} ${p.slug}: ${e.detail}`);
  await sleep(700);
}

console.log(`${STARTUP_PERKS.length} Perks: ${JSON.stringify(zaehler)}`);
const gleich = JSON.stringify(alt.perks ?? {}) === JSON.stringify(perks);
if (DRY) console.log("Trockenlauf – nichts geschrieben.");
else if (gleich) console.log("Keine Änderung.");
else writeFileSync(OUT, JSON.stringify({ stand: new Date().toISOString(), zaehler, perks }, null, 1) + "\n");
// Nur wenn gar nichts erreichbar ist, ist der Lauf selbst kaputt (Netz weg).
if (zaehler.ok + zaehler.geaendert === 0) process.exit(1);
