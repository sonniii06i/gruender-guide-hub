// Hackathon-Monitor: Online-Hackathons mit Preisgeld von Devpost → src/data/hackathonsLive.json.
// Läuft täglich in der Action „Gründer-Events aktualisieren“, lokal: `node scripts/sync-hackathons.mjs [--dry]`.
// Quelle: offene JSON-API devpost.com/api/hackathons (gemessen 25.10.2026: 183 offene/kommende, kein Bot-Schutz).
// Gleiche Regeln wie die anderen Monitore: Quelle tot → Einträge vom letzten Lauf behalten (abgelaufene
// raus) + Fehler im Protokoll; jeder Verwurf mit Grund gezählt.

import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const OUT = resolve("src/data/hackathonsLive.json");
const UA = "Mozilla/5.0 (compatible; GruenderX-Monitor/1.0; +https://gruenderx.de)";
const HEUTE = new Date().toISOString().slice(0, 10);
const DRY = process.argv.includes("--dry");
const MIN_USD = 5000;
const MAX = 40;
// Vor-Ort-Hackathons nur in Reichweite; „Online“ immer.
const ORTE = /germany|deutschland|hamburg|berlin|munich|münchen|europe|amsterdam|copenhagen|kopenhagen|vienna|wien|zurich|zürich/i;
const MONATE = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** "Oct 01 - Nov 12, 2026" · "Oct 05 - 27, 2026" · "Dec 15, 2026 - Jan 10, 2027" → "2027-01-10" */
export function devpostEnde(t) {
  const m = String(t ?? "").match(/([A-Za-z]{3})\s+(\d{1,2})(?:,\s*\d{4})?\s*-\s*(?:([A-Za-z]{3})\s+)?(\d{1,2}),\s*(\d{4})\s*$/);
  if (!m) return null;
  const monat = MONATE[(m[3] ?? m[1]).toLowerCase()];
  return monat ? `${m[5]}-${String(monat).padStart(2, "0")}-${m[4].padStart(2, "0")}` : null;
}

async function holen(seite) {
  for (const pause of [0, 2000, 8000]) {
    if (pause) await sleep(pause);
    const r = await fetch(`https://devpost.com/api/hackathons?status[]=upcoming&status[]=open&per_page=40&page=${seite}`, {
      headers: { "User-Agent": UA, Accept: "application/json" },
    });
    if (r.ok) return r.json();
    if (r.status < 500 && r.status !== 429) throw new Error(`HTTP ${r.status}`);
  }
  throw new Error("HTTP 5xx/429 nach 3 Versuchen");
}

const alt = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : { eintraege: [] };
const verworfen = { nur_einladung: 0, vor_ort_fern: 0, frist_vorbei: 0, preis_unter_5000_usd: 0, kein_usd_betrag: 0, ueber_max: 0 };
let protokoll;
let eintraege = [];
try {
  const treffer = [];
  let roh = 0;
  for (let seite = 1; seite <= 10; seite++) {
    const d = await holen(seite);
    const hs = d.hackathons ?? [];
    roh += hs.length;
    for (const h of hs) {
      if (h.invite_only) { verworfen.nur_einladung++; continue; }
      const ort = h.displayed_location?.location ?? "";
      if (ort !== "Online" && !ORTE.test(ort)) { verworfen.vor_ort_fern++; continue; }
      const ende = devpostEnde(h.submission_period_dates);
      if (!ende || ende <= HEUTE) { verworfen.frist_vorbei++; continue; }
      const preis = String(h.prize_amount ?? "").replace(/<[^>]+>/g, "").trim();
      if (!preis.startsWith("$")) { verworfen.kein_usd_betrag++; continue; }
      const usd = Number(preis.replace(/[^\d]/g, "")) || 0;
      if (usd < MIN_USD) { verworfen.preis_unter_5000_usd++; continue; }
      treffer.push({
        id: `devpost-${h.id}`, titel: h.title, url: h.url, ende, preisUsd: usd,
        geldpreise: h.prizes_counts?.cash ?? null, anmeldungen: h.registrations_count ?? null,
        ort, veranstalter: h.organization_name || "Devpost", themen: (h.themes ?? []).map((t) => t.name).slice(0, 4),
      });
    }
    if (!hs.length || seite * 40 >= (d.meta?.total_count ?? 0)) break;
    await sleep(1000);
  }
  treffer.sort((a, b) => b.preisUsd - a.preisUsd);
  verworfen.ueber_max = Math.max(0, treffer.length - MAX);
  eintraege = treffer.slice(0, MAX).sort((a, b) => a.ende.localeCompare(b.ende));
  protokoll = { ok: true, roh, uebernommen: eintraege.length, verworfen, letzterErfolg: new Date().toISOString() };
} catch (e) {
  eintraege = (alt.eintraege ?? []).filter((x) => x.ende > HEUTE);
  protokoll = { ok: false, fehler: String(e.message ?? e), behaltenVomLetztenLauf: eintraege.length, letzterErfolg: alt.quelle?.letzterErfolg ?? null };
}

console.log(protokoll.ok
  ? `devpost: ok (${protokoll.roh} roh, ${eintraege.length} übernommen) ${JSON.stringify(verworfen)}`
  : `devpost: FEHLER ${protokoll.fehler} – ${eintraege.length} behalten`);
const gleich = JSON.stringify(alt.eintraege ?? []) === JSON.stringify(eintraege) && alt.quelle?.ok === protokoll.ok;
if (DRY) console.log("Trockenlauf – nichts geschrieben.");
else if (gleich) console.log("Keine Änderung.");
else writeFileSync(OUT, JSON.stringify({ stand: new Date().toISOString(), quelle: protokoll, anzahl: eintraege.length, eintraege }, null, 1) + "\n");
if (!protokoll.ok) process.exit(1);
