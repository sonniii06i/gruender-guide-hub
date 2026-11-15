// Lädt Auswahl und Text einer Büro-Seite (data/buero/inhalte/<slug>.ts) für React-Suspense.
// Gleiches Muster und gleicher Grund wie lib/lexikon/inhaltLaden.ts: Das prerenderte HTML
// enthält den vollen Text; wirft der Render innerhalb einer Suspense-Grenze ein Promise,
// behält React das HTML, bis das Modul da ist.

import type { BueroInhalt, BueroSeite } from "@/data/buero/types";

type Eintrag =
  | { status: "laedt"; promise: Promise<void> }
  | { status: "fertig"; wert: BueroInhalt }
  | { status: "fehler"; fehler: unknown };

const cache = new Map<string, Eintrag>();

export function bueroInhaltLesen(seite: Pick<BueroSeite, "slug" | "inhalt">): BueroInhalt {
  let e = cache.get(seite.slug);
  if (!e) {
    const promise = seite.inhalt().then(
      (m) => {
        cache.set(seite.slug, { status: "fertig", wert: m.default });
      },
      (fehler) => {
        cache.set(seite.slug, { status: "fehler", fehler });
      },
    );
    e = { status: "laedt", promise };
    cache.set(seite.slug, e);
  }
  if (e.status === "fertig") return e.wert;
  if (e.status === "fehler") {
    cache.delete(seite.slug);
    throw e.fehler;
  }
  throw e.promise;
}
