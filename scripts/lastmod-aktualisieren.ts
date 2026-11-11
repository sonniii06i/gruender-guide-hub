// Pflegt scripts/lastmod-manifest.json (lastmod je Sitemap-Route).
//
//   bun run lastmod                 Hash geaendert oder Route neu → lastmod = heute (nur diese Route)
//   bun run lastmod -- --pruefen    nichts schreiben, Exit 1 bei Abweichung
//   bunx tsx scripts/lastmod-aktualisieren.ts --start-aus-git
//                                   NEUE Routen starten mit dem Datum des letzten Git-Commits
//                                   ihrer Quelle – bei Sammeldateien nur der Zeilen des Eintrags
//                                   (Erstbefuellung 11.11.2026; braucht Git-Historie und einen
//                                   sauberen Arbeitsbaum, laeuft nie im Vercel-Build)
//
// Unveraenderte Routen behalten ihr Datum. Routen, die es nicht mehr gibt,
// fliegen aus dem Manifest. Der Vercel-Build ruft dieses Skript NICHT auf: Er
// liest nur das eingecheckte Manifest (flacher Klon, keine Git-Historie).

import { execFileSync } from "child_process";
import { writeFileSync } from "fs";
import { join } from "path";
import {
  BEFEHL,
  MANIFEST_DATEI,
  WURZEL,
  abweichungen,
  liesManifest,
  routenStand,
  type Manifest,
  type Quelle,
} from "./lastmod-routen";

const args = new Set(process.argv.slice(2));
const nurPruefen = args.has("--pruefen");
const startAusGit = args.has("--start-aus-git");

/** Heutiges Datum in deutscher Zeit (nicht UTC: ein Lauf um 00:30 Uhr soll nicht "gestern" schreiben). */
const heute = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(new Date());

const git = (argumente: string[]): string | null => {
  try {
    return execFileSync("git", argumente, { cwd: WURZEL, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return null;
  }
};
const alsDatum = (out: string | null): string | null => {
  const zeile = (out ?? "").split("\n").find((z) => /^\d{4}-\d{2}-\d{2}$/.test(z.trim()));
  return zeile ? zeile.trim() : null;
};

const gitCache = new Map<string, string | null>();
const zeilenCache = new Map<string, string[] | null>();
let ungenau = 0;

/** Zeilen der Datei im Stand von HEAD (git log -L zaehlt in HEAD, nicht im Arbeitsbaum). */
function kopfZeilen(datei: string): string[] | null {
  if (!zeilenCache.has(datei)) {
    const text = git(["show", `HEAD:${datei}`]);
    zeilenCache.set(datei, text === null ? null : text.split("\n"));
  }
  return zeilenCache.get(datei) ?? null;
}

/** Datum des letzten Commits, der die Quelle beruehrt hat: ganze Datei oder nur die Zeilen des Eintrags. */
function gitDatum(q: Quelle): string | null {
  const schluessel = typeof q === "string" ? q : `${q.datei}#${q.anker}#${q.zeilen ?? q.grenze ?? ""}`;
  if (gitCache.has(schluessel)) return gitCache.get(schluessel) ?? null;
  let d: string | null = null;
  if (typeof q === "string") {
    d = alsDatum(git(["log", "-1", "--format=%cs", "--", q]));
  } else {
    const zeilen = kopfZeilen(q.datei);
    const start = zeilen ? zeilen.findIndex((z) => z.startsWith(q.anker)) : -1;
    if (zeilen && start >= 0) {
      let ende = zeilen.length - 1;
      if (q.zeilen) ende = Math.min(ende, start + q.zeilen - 1);
      else if (q.grenze) {
        const re = new RegExp(q.grenze);
        const naechster = zeilen.findIndex((z, i) => i > start && re.test(z));
        if (naechster > start) ende = naechster - 1;
      }
      d = alsDatum(git(["log", "-1", "--format=%cs", "-s", `-L${start + 1},${ende + 1}:${q.datei}`]));
    }
    if (!d) {
      // Eintrag in HEAD nicht gefunden: ganze Datei als (groeberer) Rueckfall.
      ungenau++;
      d = alsDatum(git(["log", "-1", "--format=%cs", "--", q.datei]));
    }
  }
  gitCache.set(schluessel, d);
  return d;
}

/** Juengster Commit ueber alle Quellen; null, wenn Git fuer eine davon nichts liefert. */
function startDatum(quellen: Quelle[]): string | null {
  const daten = quellen.map(gitDatum);
  if (daten.length === 0 || daten.some((d) => !d)) return null;
  return (daten as string[]).sort().pop() ?? null;
}

const { stand, ohneQuelle } = routenStand();
const alt = liesManifest();
const diff = abweichungen(alt, stand);

if (ohneQuelle.length > 0) {
  console.error(
    `lastmod: ${ohneQuelle.length} Route(n) ohne Quelle – in scripts/lastmod-routen.ts (SEITEN) eintragen:\n  ` +
      ohneQuelle.join("\n  "),
  );
}

if (nurPruefen) {
  for (const a of diff) console.error(`lastmod: ${a.art}  ${a.path}`);
  if (diff.length > 0 || ohneQuelle.length > 0) {
    console.error(`lastmod: Manifest passt nicht zum Stand. Beheben: ${BEFEHL}`);
    process.exit(1);
  }
  console.log(`lastmod: Manifest aktuell (${Object.keys(stand).length} Routen).`);
  process.exit(0);
}

const neu: Manifest = {
  hinweis:
    "Erzeugt von scripts/lastmod-aktualisieren.ts (bun run lastmod). Nicht von Hand pflegen: " +
    "hash = Inhalt der Route, lastmod = Tag der letzten Inhaltsaenderung. Liest scripts/generate-sitemap.ts.",
  routen: {},
};
const zaehler = { neu: 0, geaendert: 0, gleich: 0, entfallen: 0, ohneGitDatum: 0 };
const meldungen: string[] = [];

for (const path of Object.keys(stand).sort()) {
  const s = stand[path];
  const e = alt.routen[path];
  if (e && e.hash === s.hash) {
    neu.routen[path] = { hash: e.hash, lastmod: e.lastmod };
    zaehler.gleich++;
  } else if (e) {
    neu.routen[path] = { hash: s.hash, lastmod: heute };
    zaehler.geaendert++;
    meldungen.push(`geaendert  ${path}  ${e.lastmod} → ${heute}`);
  } else {
    let lastmod = heute;
    if (startAusGit) {
      const d = startDatum(s.quellen);
      if (d) lastmod = d;
      else zaehler.ohneGitDatum++;
    }
    neu.routen[path] = { hash: s.hash, lastmod };
    zaehler.neu++;
    meldungen.push(`neu        ${path}  ${lastmod}`);
  }
}
for (const path of Object.keys(alt.routen)) {
  if (!stand[path]) {
    zaehler.entfallen++;
    meldungen.push(`entfallen  ${path}`);
  }
}

// Eine Zeile je Route: kleine Diffs, parallele Aenderungen lassen sich mergen.
const zeilen = Object.entries(neu.routen).map(([path, e]) => `    ${JSON.stringify(path)}: ${JSON.stringify(e)}`);
const text = `{\n  "hinweis": ${JSON.stringify(neu.hinweis)},\n  "routen": {\n${zeilen.join(",\n")}\n  }\n}\n`;
writeFileSync(join(WURZEL, MANIFEST_DATEI), text);

if (meldungen.length <= 40) for (const m of meldungen) console.log(`lastmod: ${m}`);
console.log(
  `lastmod: ${Object.keys(neu.routen).length} Routen im Manifest – ${zaehler.neu} neu, ${zaehler.geaendert} geaendert, ` +
    `${zaehler.gleich} unveraendert, ${zaehler.entfallen} entfallen` +
    (startAusGit ? `, ${zaehler.ohneGitDatum} ohne Git-Datum (heute gesetzt), ${ungenau} Eintraege nur dateigenau datiert` : ""),
);
if (ohneQuelle.length > 0) process.exit(1);
