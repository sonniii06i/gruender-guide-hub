// Erzeugt Aktivierungscodes: Klartext fuer die Druckerei, Hash fuer die Datenbank.
//
// WOZU. Amazon liefert in Deutschland keine Abos digital aus. Der Weg dorthin
// ist eine gedruckte Karte mit Code — so verkauft auch Adobe seine Abos dort.
// Dieselben Codes taugen als Beilage, Gutschein oder Messegeschenk.
//
// WICHTIG. Der Klartext existiert genau einmal: in der CSV, die dieses Skript
// schreibt. In der Datenbank liegt nur SHA-256. Geht die CSV verloren, bevor
// gedruckt wurde, ist die Auflage wertlos — es gibt keinen Weg zurueck.
// Nach dem Druck gehoert die Datei geloescht, nicht archiviert.
//
// Aufruf:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
//   node scripts/generate-codes.mjs --plan "GründerX" --tage 30 --anzahl 500 \
//        --praefix GRDX --charge amazon-karte-2026-10
//
// Ohne --schreiben wird nichts in die Datenbank geschrieben (Trockenlauf).
import { createHash, randomInt } from "node:crypto";
import { writeFileSync } from "node:fs";

// Alphabet ohne I, L, O, U, 0, 1: Die Karte wird von Hand abgetippt, und
// genau diese Zeichen werden verwechselt. Bleiben 30 Zeichen; bei 12 zufaelligen
// Stellen sind das rund 5,3e17 Moeglichkeiten — Erraten scheidet damit als
// Angriffsweg aus, auch ohne Bremse an der Einloesung.
const ALPHABET = "ABCDEFGHJKMNPQRSTVWXYZ23456789";

// Drei Buchstabenfolgen, die auf einer gedruckten Karte niemand sehen will.
// Billiger Filter, aber der Fall tritt bei ein paar tausend Codes wirklich ein.
const UNERWUENSCHT = /FCK|FUK|SEX|ARS|PEN|HUR|NAZ|SS8|KKK/;

const arg = (name, fallback = null) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const hat = (name) => process.argv.includes(`--${name}`);

const plan    = arg("plan");
const tage    = Number(arg("tage", "30"));
const anzahl  = Number(arg("anzahl", "100"));
const praefix = (arg("praefix", "CODE") || "").toUpperCase();
const charge  = arg("charge", `charge-${new Date().toISOString().slice(0, 10)}`);
const notiz   = arg("notiz", null);

if (!plan) {
  console.error("Fehlt: --plan. Der Planname muss exakt dem entsprechen, den check-subscription kennt.");
  process.exit(1);
}

const block = () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
const norm  = (s) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");
const hash  = (s) => createHash("sha256").update(norm(s)).digest("hex");

// Doppelte sind bei 1,2e24 praktisch ausgeschlossen, aber ein Set kostet nichts
// und verhindert, dass eine Auflage still zwei identische Karten enthaelt.
const gesehen = new Set();
const codes = [];
while (codes.length < anzahl) {
  const code = `${praefix}-${block()}-${block()}-${block()}`;
  if (gesehen.has(code) || UNERWUENSCHT.test(code)) continue;
  gesehen.add(code);
  codes.push(code);
}

const zeilen = codes.map((code) => ({
  code,
  code_hash: hash(code),
  code_tail: norm(code).slice(-4),
  batch: charge,
  plan,
  days: tage,
  status: "unused",
  note: notiz,
}));

const csv = "code;plan;tage;charge\n"
  + zeilen.map((z) => `${z.code};${z.plan};${z.days};${z.batch}`).join("\n") + "\n";
const datei = `codes-${charge}.csv`;
writeFileSync(datei, csv);
console.log(`${anzahl} Codes -> ${datei}   (Klartext, nur fuer den Druck)`);
console.log(`Beispiel: ${codes[0]}`);

if (!hat("schreiben")) {
  console.log("\nTrockenlauf. Mit --schreiben landen die Hashes in der Datenbank.");
  process.exit(0);
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY muessen gesetzt sein.");
  process.exit(1);
}

// In Haeppchen: Ein einzelnes Insert mit mehreren tausend Zeilen laeuft in die
// Zeitgrenze des PostgREST-Endpunkts.
const HAPPEN = 500;
let geschrieben = 0;
for (let i = 0; i < zeilen.length; i += HAPPEN) {
  const teil = zeilen.slice(i, i + HAPPEN).map(({ code, ...rest }) => rest);
  const res = await fetch(`${url}/rest/v1/redemption_codes`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(teil),
  });
  if (!res.ok) {
    console.error(`Abbruch bei Zeile ${i}: ${res.status} ${await res.text()}`);
    console.error(`${geschrieben} Codes sind bereits geschrieben. ${datei} enthaelt ALLE — die restlichen nicht drucken.`);
    process.exit(1);
  }
  geschrieben += teil.length;
  process.stdout.write(`\rgeschrieben: ${geschrieben}/${zeilen.length}`);
}
console.log(`\nFertig. Charge "${charge}", Plan "${plan}", ${tage} Tage je Code.`);
