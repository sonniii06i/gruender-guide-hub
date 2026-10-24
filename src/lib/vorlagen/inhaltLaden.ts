// Lädt Text und Ratgeber einer Vorlage (inhalte/<slug>.ts) für React-Suspense.
//
// WARUM SUSPENSE. Das prerenderte HTML enthält den vollen Inhalt. Würde die
// Seite beim ersten Client-Render einen Ladezustand zeigen, passt das nicht
// zum HTML: React verwirft die Hydration und rendert alles neu (#418/#422).
// Wirft der Render dagegen ein Promise innerhalb einer Suspense-Grenze, behält
// React das Server-HTML, bis das Modul da ist, und hydriert dann.

import type { Vorlage, VorlagenInhalt } from "@/data/vorlagen/types";

type Eintrag =
  | { status: "laedt"; promise: Promise<void> }
  | { status: "fertig"; wert: VorlagenInhalt }
  | { status: "fehler"; fehler: unknown };

const cache = new Map<string, Eintrag>();

export function vorlagenInhaltLesen(vorlage: Pick<Vorlage, "slug" | "inhalt">): VorlagenInhalt {
  let e = cache.get(vorlage.slug);
  if (!e) {
    const promise = vorlage.inhalt().then(
      (m) => {
        cache.set(vorlage.slug, { status: "fertig", wert: m.default });
      },
      (fehler) => {
        cache.set(vorlage.slug, { status: "fehler", fehler });
      },
    );
    e = { status: "laedt", promise };
    cache.set(vorlage.slug, e);
  }
  if (e.status === "fertig") return e.wert;
  if (e.status === "fehler") {
    // Beim nächsten Versuch neu laden (z. B. nach einem Netzfehler).
    cache.delete(vorlage.slug);
    throw e.fehler;
  }
  throw e.promise;
}

/** Nur für Tests. */
export function vorlagenInhaltCacheLeeren(): void {
  cache.clear();
}
