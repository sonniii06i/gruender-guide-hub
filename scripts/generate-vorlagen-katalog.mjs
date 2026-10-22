// Erzeugt supabase/functions/_shared/vorlagenKatalog.ts aus src/data/vorlagen/.
//
// WOZU. Die Bestätigungsmail (Edge Function vorlage-anfordern) nennt die
// angeforderte Vorlage beim Namen und akzeptiert nur Slugs, die es wirklich
// gibt. Die Vorlagen selbst liegen im Frontend; die Function soll weder das
// Frontend laden noch eine zweite, von Hand gepflegte Liste haben.
//
// Nach jeder Änderung an src/data/vorlagen/ erneut laufen lassen:
//   node scripts/generate-vorlagen-katalog.mjs
// Der Test src/data/vorlagen/vorlagen.test.ts schlägt fehl, wenn die Datei
// nicht mehr zum Stand der Vorlagen passt.
import { build } from "esbuild";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const tmp = mkdtempSync(join(tmpdir(), "vorlagen-"));
const out = join(tmp, "vorlagen.mjs");
await build({
  entryPoints: ["src/data/vorlagen/index.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: out,
  logLevel: "silent",
});
const { VORLAGEN } = await import(pathToFileURL(out).href);

const zeilen = VORLAGEN.map((v) => `  ${JSON.stringify(v.slug)}: ${JSON.stringify(v.titel)},`);
const inhalt = `// GENERIERT von scripts/generate-vorlagen-katalog.mjs — nicht von Hand ändern.
// Quelle: src/data/vorlagen/. Stand: ${VORLAGEN.length} Vorlagen.
//
// Slug → Titel der Vorlagen-Bibliothek (/vorlagen). Die Edge Function
// vorlage-anfordern nimmt nur Slugs aus dieser Liste an und nennt den Titel
// in der Bestätigungsmail.

export const VORLAGEN_KATALOG: Record<string, string> = {
${zeilen.join("\n")}
};

export function vorlageTitel(slug: string): string | undefined {
  return Object.prototype.hasOwnProperty.call(VORLAGEN_KATALOG, slug) ? VORLAGEN_KATALOG[slug] : undefined;
}
`;
writeFileSync("supabase/functions/_shared/vorlagenKatalog.ts", inhalt);
console.log(`vorlagenKatalog.ts: ${VORLAGEN.length} Vorlagen`);
