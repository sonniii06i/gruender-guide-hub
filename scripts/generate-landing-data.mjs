// Erzeugt je Guide und je Tool eine kleine JSON-Datei für die öffentlichen Landings
// (/guides/:slug, /tools/:slug) plus einen schlanken Guide-Index (25.10.2026).
//
// WOZU. GuideLanding und ToolLanding importierten bisher guides.ts (→ alle 80 Playbooks,
// ~200 KB) und landingCopy.ts (→ Verkaufstexte ALLER Guides UND Tools, ~220 KB). Jede
// einzelne Landing lud damit über 400 KB Daten, von denen sie einen Eintrag braucht.
// Jetzt lädt jede Landing nur ihre eigene Datei (src/lib/landingDaten.ts), und
// internalLinks.ts / RatgeberPost nutzen den Index (src/data/guideIndex.ts) statt aller Playbooks.
//
// Läuft automatisch vor build/dev (package.json). Von Hand: node scripts/generate-landing-data.mjs
// src/test/landingDaten.test.ts prüft, dass die Dateien zu den Quelldaten passen.
import { build } from "esbuild";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

// lucide-react stubben wie in generate-playbook-steps.mjs: Icons sind für die Daten egal.
const iconNamen = new Set();
for (const f of ["src/data/playbooks.ts", "src/data/features.ts"]) {
  const m = readFileSync(f, "utf8").match(/import\s*\{([^}]*)\}\s*from\s*"lucide-react"/);
  if (m) m[1].split(",").map((n) => n.trim()).filter((n) => n && !n.startsWith("type ")).forEach((n) => iconNamen.add(n.split(" as ")[0].trim()));
}
const stub = {
  name: "lucide-stub",
  setup(b) {
    b.onResolve({ filter: /^lucide-react$/ }, () => ({ path: "lucide", namespace: "stub" }));
    b.onLoad({ filter: /.*/, namespace: "stub" }, () => ({
      contents: "const leer = () => null;\n" + [...iconNamen].map((n) => `export const ${n} = leer;`).join("\n"),
      loader: "js",
    }));
    b.onResolve({ filter: /^@\// }, (a) => ({ path: join(process.cwd(), "src", a.path.slice(2)) + (a.path.endsWith(".ts") ? "" : ".ts") }));
  },
};

const tmp = mkdtempSync(join(tmpdir(), "landing-"));
const eintrag = join(tmp, "eintrag.ts");
writeFileSync(eintrag, `
export { GUIDE_LANDINGS, relatedGuides } from "${process.cwd()}/src/data/guides.ts";
export { LANDING_TOOLS } from "${process.cwd()}/src/data/features.ts";
export { getGuideCopy, getToolCopy } from "${process.cwd()}/src/data/landingCopy.ts";
export { GUIDE_MERGED_INTO } from "${process.cwd()}/src/data/guideMerges.ts";
`);
const out = join(tmp, "daten.mjs");
await build({ entryPoints: [eintrag], bundle: true, format: "esm", outfile: out, plugins: [stub], logLevel: "error" });
const { GUIDE_LANDINGS, relatedGuides, LANDING_TOOLS, getGuideCopy, getToolCopy, GUIDE_MERGED_INTO } = await import(pathToFileURL(out).href);
rmSync(tmp, { recursive: true, force: true });

const ZIEL = "src/data/landing";
for (const unter of ["guides", "tools"]) {
  mkdirSync(join(ZIEL, unter), { recursive: true });
  for (const f of readdirSync(join(ZIEL, unter))) rmSync(join(ZIEL, unter, f));
}

// Texte inkl. Fallback fertig berechnet: die Seiten brauchen landingCopy.ts dann gar nicht mehr.
for (const g of GUIDE_LANDINGS) {
  const copy = getGuideCopy(g.slug, { slug: g.slug, title: g.title, tagline: g.tagline, outcome: g.outcome, duration: g.duration, difficulty: g.difficulty, steps: g.steps });
  const related = relatedGuides(g.slug).map((r) => ({ slug: r.slug, title: r.title, tagline: r.tagline }));
  writeFileSync(join(ZIEL, "guides", `${g.slug}.json`), JSON.stringify({ guide: g, copy, related }) + "\n");
}
for (const t of LANDING_TOOLS) {
  const copy = getToolCopy(t.slug, { slug: t.slug, title: t.title, desc: t.desc, categoryTitle: t.categoryTitle, categoryTagline: t.categoryTagline });
  writeFileSync(join(ZIEL, "tools", `${t.slug}.json`), JSON.stringify({ copy }) + "\n");
}
// In Ratgeber zusammengelegte Guides zeigt RatgeberPost mit Aufwand und Schritt-Titeln.
const index = GUIDE_LANDINGS.map((g) => ({
  slug: g.slug, title: g.title, tagline: g.tagline, outcome: g.outcome,
  ...(g.slug in GUIDE_MERGED_INTO ? { duration: g.duration, schritte: g.outline.map((s) => s.title) } : {}),
}));
writeFileSync(join(ZIEL, "guideIndex.json"), JSON.stringify(index) + "\n");

console.log(`Landing-Daten: ${GUIDE_LANDINGS.length} Guides, ${LANDING_TOOLS.length} Tool-Texte, Index ${index.length}`);
