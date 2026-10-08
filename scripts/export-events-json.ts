// Läuft vor `vite build` (prebuild): schreibt public/gruender-events.json aus
// kuratierter Liste + Monitor-Daten. Die Edge Functions (Wochenmail, Felix)
// lesen diese Datei unter https://gruenderx.de/gruender-events.json – so gibt
// es genau eine Quelle für Termine und Fristen.
import { mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { aktuelleEvents, GRUENDER_FRISTEN, LIVE_STAND, type GruenderEvent } from "../src/data/gruenderEvents";
import { BUNDESLAND_NAMES } from "../src/data/foerderprogramme";
import { baueIcs, type IcsTermin } from "../src/lib/ics";
import chancen from "../src/data/chancenLive.json";
import perks from "../src/data/perksLive.json";
import { PERK_KATEGORIEN, STARTUP_PERKS } from "../src/data/startupPerks";

const heute = new Date().toISOString().slice(0, 10);
const events = aktuelleEvents(heute).map((e) => ({
  name: e.name,
  veranstalter: e.veranstalter,
  art: e.art,
  format: e.format,
  ort: e.ort,
  region: e.region,
  datum: e.datum ?? null,
  datumBis: e.datumBis ?? null,
  rhythmus: e.rhythmus ?? null,
  kostenlos: e.kostenlos ?? null,
  url: e.url,
}));
// Chancen nur als Status für den System-Wächter (die Inhalte stehen im Mitgliederbereich).
const chancenStatus = { stand: chancen.stand, anzahl: chancen.anzahl, quellen: Object.fromEntries(Object.entries(chancen.quellen).map(([k, v]) => [k, { ok: (v as { ok: boolean }).ok }])) };
// Perk-Wächter: nur Zähler + geänderte/kaputte Programme (für den System-Wächter).
const perksStatus = {
  stand: perks.stand,
  zaehler: perks.zaehler,
  auffaellig: Object.entries(perks.perks as Record<string, { status: string; detail: string }>).filter(([, v]) => v.status === "geaendert" || v.status === "fehler").map(([slug, v]) => ({ slug, status: v.status, detail: v.detail })),
};
const out = { stand: LIVE_STAND.stand, erzeugt: new Date().toISOString(), quellen: LIVE_STAND.quellen, chancen: chancenStatus, perks: perksStatus, events, fristen: GRUENDER_FRISTEN };
writeFileSync(resolve("public/gruender-events.json"), JSON.stringify(out));
// Startup-Guthaben öffentlich (Discord-Bot /guthaben + Perk-Feed): Programmdaten + Prüfstatus.
const perkStatus = perks.perks as Record<string, { status: string; letzterErfolg: string | null }>;
writeFileSync(
  resolve("public/startup-guthaben.json"),
  JSON.stringify({
    stand: perks.stand,
    kategorien: PERK_KATEGORIEN,
    perks: STARTUP_PERKS.map((p) => ({ ...p, status: perkStatus[p.slug]?.status ?? null, letzterErfolg: perkStatus[p.slug]?.letzterErfolg ?? null })),
  }),
);
console.log(`gruender-events.json: ${events.length} Events, ${GRUENDER_FRISTEN.length} Fristen`);

// Abonnierbare Kalender: alle Events, je Bundesland (inkl. Online-Events) und Fristen.
const datiert = aktuelleEvents(heute).filter((e) => e.datum);
const alsTermin = (e: GruenderEvent): IcsTermin => ({
  uid: e.slug,
  titel: e.name,
  start: e.datum!,
  ende: e.datumBis,
  ort: e.format === "online" ? "Online" : e.ort,
  beschreibung: `${e.veranstalter}${e.kurz ? ` – ${e.kurz}` : ""}`,
  url: e.url,
});
mkdirSync(resolve("public/kalender"), { recursive: true });
writeFileSync(resolve("public/kalender/gruender-events.ics"), baueIcs(datiert.map(alsTermin), "Gründer-Events Deutschland (GründerX)"));
let laender = 0;
for (const [code, name] of Object.entries(BUNDESLAND_NAMES)) {
  if (code === "bund") continue;
  const liste = datiert.filter((e) => e.region === code || e.format === "online" || e.region === "bund");
  writeFileSync(resolve(`public/kalender/gruender-events-${code.toLowerCase()}.ics`), baueIcs(liste.map(alsTermin), `Gründer-Events ${name} (GründerX)`));
  laender++;
}
const fristTermine: IcsTermin[] = GRUENDER_FRISTEN.filter((f) => f.frist && f.frist >= heute).map((f) => ({
  uid: `frist-${f.slug}`,
  titel: `Bewerbungsfrist: ${f.name}`,
  start: f.frist!,
  beschreibung: `${f.veranstalter} – ${f.kurz}`,
  url: f.url,
}));
writeFileSync(resolve("public/kalender/fristen.ics"), baueIcs(fristTermine, "Gründer-Fristen: Wettbewerbe & Stipendien (GründerX)"));
console.log(`Kalender: ${datiert.length} Events, ${laender} Bundesländer, ${fristTermine.length} Fristen`);
