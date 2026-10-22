// Einmaliger Umbau (22.10.2026): Verschiebt die schweren Felder `text` und
// `ratgeber` jeder Vorlage aus src/data/vorlagen/<kategorie>.ts in eigene
// Module src/data/vorlagen/inhalte/<slug>.ts und ersetzt sie durch
//   inhalt: () => import("./inhalte/<slug>"),
//
// WOZU. Vorher lag die gesamte Bibliothek (~1,3 MB JS: 102 Vertragstexte plus
// Ratgeber) in EINEM Chunk, den jede /vorlagen-Seite lud – schlecht für den
// Mobil-PageSpeed. Jetzt lädt der Hub nur die Metadaten, die Detailseite
// zusätzlich genau ihren Inhalt.
//
// Arbeitet mit dem TypeScript-Parser (keine Regex über Backticks), schreibt
// jede Kategorie-Datei neu und legt die Inhalts-Module an. Idempotent: Einträge
// ohne `text`-Property werden übersprungen.
//
//   node scripts/split-vorlagen-inhalte.mjs [--trocken] [--quelle src/data/vorlagen]
import ts from "typescript";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const trocken = args.includes("--trocken");
const quelle = args.includes("--quelle") ? args[args.indexOf("--quelle") + 1] : "src/data/vorlagen";
const zielOrdner = join(quelle, "inhalte");

const dateien = readdirSync(quelle).filter((f) => /^[a-z]+\.ts$/.test(f) && !["index.ts", "types.ts"].includes(f));
let gesamt = 0;

for (const datei of dateien) {
  const pfad = join(quelle, datei);
  const src = readFileSync(pfad, "utf8");
  const sf = ts.createSourceFile(pfad, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

  /** @type {{slug:string, start:number, end:number, text:string, ratgeber:string|null, anker:number}[]} */
  const eintraege = [];

  const besuche = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const props = Object.fromEntries(
        node.properties
          .filter((p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name))
          .map((p) => [p.name.text, p]),
      );
      if (props.slug && props.text && ts.isStringLiteral(props.slug.initializer)) {
        const slug = props.slug.initializer.text;
        const bereich = (p) => {
          // Property samt folgendem Komma und Zeilenumbruch entfernen.
          const start = p.getStart(sf);
          let end = p.getEnd();
          if (src[end] === ",") end++;
          while (src[end] === " " || src[end] === "\t") end++;
          if (src[end] === "\n") end++;
          // Führende Einrückung der Zeile mitnehmen.
          let s = start;
          while (s > 0 && (src[s - 1] === " " || src[s - 1] === "\t")) s--;
          return { start: s, end };
        };
        const textLit = src.slice(props.text.initializer.getStart(sf), props.text.initializer.getEnd());
        const ratgeberLit = props.ratgeber
          ? src.slice(props.ratgeber.initializer.getStart(sf), props.ratgeber.initializer.getEnd())
          : null;
        eintraege.push({
          slug,
          text: textLit,
          ratgeber: ratgeberLit,
          bereiche: [bereich(props.text), ...(props.ratgeber ? [bereich(props.ratgeber)] : [])],
          anker: bereich(props.text).start,
        });
        return; // nicht in den Eintrag hinein (ratgeber-Objekte haben kein slug/text)
      }
    }
    ts.forEachChild(node, besuche);
  };
  besuche(sf);

  if (eintraege.length === 0) {
    console.log(`${datei}: nichts zu tun`);
    continue;
  }

  // Inhalts-Module schreiben.
  mkdirSync(zielOrdner, { recursive: true });
  for (const e of eintraege) {
    const brauchtHinweis = /VORLAGEN_HINWEIS/.test(e.text) || (e.ratgeber ? /VORLAGEN_HINWEIS/.test(e.ratgeber) : false);
    const modul =
      `// Inhalt der Vorlage „${e.slug}“ – wird von der Detailseite nachgeladen.\n` +
      `// Metadaten (Titel, FAQ, SEO) stehen in ../${datei}.\n` +
      (brauchtHinweis ? `import { VORLAGEN_HINWEIS } from "../types";\n` : "") +
      `import type { VorlagenInhalt } from "../types";\n\n` +
      `const inhalt: VorlagenInhalt = {\n` +
      `  ratgeber: ${e.ratgeber ?? "[]"},\n` +
      `  text: ${e.text},\n` +
      `};\n\nexport default inhalt;\n`;
    if (!trocken) writeFileSync(join(zielOrdner, `${e.slug}.ts`), modul);
  }

  // Kategorie-Datei umschreiben: Bereiche von hinten nach vorn ersetzen.
  const schnitte = [];
  for (const e of eintraege) {
    const einrueckung = src.slice(e.anker).match(/^[ \t]*/)[0];
    for (const b of e.bereiche) schnitte.push({ ...b, ersatz: b.start === e.anker ? `${einrueckung}inhalt: () => import("./inhalte/${e.slug}"),\n` : "" });
  }
  schnitte.sort((a, b) => b.start - a.start);
  let neu = src;
  for (const s of schnitte) neu = neu.slice(0, s.start) + s.ersatz + neu.slice(s.end);

  // VORLAGEN_HINWEIS-Import entfernen, wenn er nicht mehr gebraucht wird.
  if (!/VORLAGEN_HINWEIS/.test(neu.replace(/import[^\n]*VORLAGEN_HINWEIS[^\n]*\n/, ""))) {
    neu = neu.replace(/import \{ ([^}]*)\bVORLAGEN_HINWEIS\b,?\s*([^}]*)\} from "\.\/types";\n/, (m, a, b) => {
      const rest = `${a}${b}`.replace(/,\s*,/g, ",").replace(/^\s*,|,\s*$/g, "").trim();
      return rest ? `import { ${rest} } from "./types";\n` : "";
    });
  }

  if (!trocken) writeFileSync(pfad, neu);
  gesamt += eintraege.length;
  console.log(`${datei}: ${eintraege.length} Vorlagen → inhalte/ (${src.length} → ${neu.length} Zeichen)`);
}
console.log(`${trocken ? "[trocken] " : ""}${gesamt} Inhalts-Module${trocken ? " würden" : ""} geschrieben in ${zielOrdner}`);
