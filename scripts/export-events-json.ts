// Läuft vor `vite build` (prebuild): schreibt public/gruender-events.json aus
// kuratierter Liste + Monitor-Daten. Die Edge Functions (Wochenmail, Felix)
// lesen diese Datei unter https://gruenderx.de/gruender-events.json – so gibt
// es genau eine Quelle für Termine und Fristen.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { aktuelleEvents, GRUENDER_FRISTEN, LIVE_STAND } from "../src/data/gruenderEvents";

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
const out = { stand: LIVE_STAND.stand, erzeugt: new Date().toISOString(), events, fristen: GRUENDER_FRISTEN };
writeFileSync(resolve("public/gruender-events.json"), JSON.stringify(out));
console.log(`gruender-events.json: ${events.length} Events, ${GRUENDER_FRISTEN.length} Fristen`);
