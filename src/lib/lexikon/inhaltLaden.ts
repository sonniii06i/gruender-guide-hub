// Lädt den Text eines Lexikon-Begriffs (data/lexikon/inhalte/<slug>.ts) für
// React-Suspense. Gleiches Muster und gleicher Grund wie lib/vorlagen/inhaltLaden.ts:
// Das prerenderte HTML enthält den vollen Text; wirft der Render innerhalb einer
// Suspense-Grenze ein Promise, behält React das HTML, bis das Modul da ist.

import type { LexikonBegriff, LexikonInhalt } from "@/data/lexikon/types";

type Eintrag =
  | { status: "laedt"; promise: Promise<void> }
  | { status: "fertig"; wert: LexikonInhalt }
  | { status: "fehler"; fehler: unknown };

const cache = new Map<string, Eintrag>();

export function lexikonInhaltLesen(begriff: Pick<LexikonBegriff, "slug" | "inhalt">): LexikonInhalt {
  let e = cache.get(begriff.slug);
  if (!e) {
    const promise = begriff.inhalt().then(
      (m) => {
        cache.set(begriff.slug, { status: "fertig", wert: m.default });
      },
      (fehler) => {
        cache.set(begriff.slug, { status: "fehler", fehler });
      },
    );
    e = { status: "laedt", promise };
    cache.set(begriff.slug, e);
  }
  if (e.status === "fertig") return e.wert;
  if (e.status === "fehler") {
    cache.delete(begriff.slug);
    throw e.fehler;
  }
  throw e.promise;
}
