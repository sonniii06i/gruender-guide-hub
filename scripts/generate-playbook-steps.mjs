// Erzeugt supabase/functions/_shared/playbookSteps.ts aus src/data/playbooks.ts.
//
// WOZU. Die Wochenmail nennt den naechsten offenen Schritt beim Namen. Der
// Name steht nur in playbooks.ts — einer Datei, die lucide-react importiert
// und deshalb in einer Edge Function nicht ladbar ist. Statt die Titel im
// Mailcode ein zweites Mal zu pflegen (und sie dort veralten zu lassen),
// wird hier eine schlanke Kopie erzeugt: nur slug, Titel und die
// Schritt-Titel in ihrer Reihenfolge.
//
// Nach jeder Aenderung an playbooks.ts erneut laufen lassen:
//   node scripts/generate-playbook-steps.mjs
import { build } from "esbuild";
import { writeFileSync, readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

// lucide-react liefert nur Icon-Komponenten. Fuer die Titel ist egal, was
// dahinter steckt — aber esbuild verlangt, dass jeder importierte Name
// wirklich exportiert wird. Ein Proxy reicht deshalb nicht; der Stub
// exportiert genau die Namen, die playbooks.ts anfordert. Faellt ein
// Icon-Import weg oder kommt einer dazu, passt sich das von selbst an.
const quelle = readFileSync("src/data/playbooks.ts", "utf8");
const importZeile = quelle.match(/import\s*\{([^}]*)\}\s*from\s*"lucide-react"/);
if (!importZeile) throw new Error("lucide-Import in playbooks.ts nicht gefunden");
const iconNamen = importZeile[1]
  .split(",").map((n) => n.trim())
  .filter((n) => n && !n.startsWith("type "));

const stub = {
  name: "lucide-stub",
  setup(b) {
    b.onResolve({ filter: /^lucide-react$/ }, () => ({ path: "lucide", namespace: "stub" }));
    b.onLoad({ filter: /.*/, namespace: "stub" }, () => ({
      contents: "const leer = () => null;\n" +
        iconNamen.map((n) => `export const ${n} = leer;`).join("\n"),
      loader: "js",
    }));
  },
};

const dir = mkdtempSync(join(tmpdir(), "pb-"));
const out = join(dir, "playbooks.mjs");
await build({
  entryPoints: ["src/data/playbooks.ts"],
  bundle: true, format: "esm", outfile: out, plugins: [stub], logLevel: "error",
});

const { PLAYBOOKS } = await import(pathToFileURL(out).href);

const daten = Object.fromEntries(PLAYBOOKS.map((p) => [
  p.slug, { titel: p.title, schritte: p.steps.map((s) => s.title) },
]));

const kopf = `// AUTO-GENERIERT aus src/data/playbooks.ts — nicht von Hand aendern.
// Neu erzeugen mit: node scripts/generate-playbook-steps.mjs
//
// Nur Titel, keine Inhalte: die bezahlten Step-Details liegen weiterhin
// ausschliesslich in guide-detail/secure-data.ts.

export interface PlaybookTitel { titel: string; schritte: string[] }

export const PLAYBOOK_TITEL: Record<string, PlaybookTitel> = ${JSON.stringify(daten, null, 2)};

/**
 * Titel des Schritts, an dem der Lauf gerade steht.
 *
 * \`current_step\` ist ein NULLBASIERTER Index auf den OFFENEN Schritt —
 * PlaybookRun.tsx setzt damit direkt den aktiven Index (\`setActiveIndex\`).
 *
 * Verlass dich NICHT darauf, dass der Index am Ende ueber die Liste
 * hinauslaeuft: beim Abschluss des letzten Schritts wird er auf
 * \`min(index + 1, steps.length - 1)\` geklemmt und bleibt damit auf dem
 * letzten Schritt stehen. Ob ein Lauf fertig ist, sagt allein \`status\`
 * (\`completed\` / \`done\`) — niemals die Zahl.
 */
export function naechsterSchritt(slug: string, currentStep: number): string | null {
  const p = PLAYBOOK_TITEL[slug];
  if (!p) return null;
  return p.schritte[currentStep] ?? null;
}
`;
writeFileSync("supabase/functions/_shared/playbookSteps.ts", kopf);
console.log("geschrieben:", PLAYBOOKS.length, "Playbooks,",
  PLAYBOOKS.reduce((n, p) => n + p.steps.length, 0), "Schritte");
