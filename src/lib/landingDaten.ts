// Lädt die Daten EINER Tool- oder Guide-Landing (src/data/landing/**, erzeugt von
// scripts/generate-landing-data.mjs) statt der kompletten Playbooks und Verkaufstexte.
// Die Komponente „suspendet“ wie React.lazy, bis die Datei da ist; App.tsx startet den
// Abruf schon parallel zum Seiten-Chunk (vorladenFuerPfad), damit kein Wasserfall entsteht.
import type { GuideLandingEntry } from "@/data/guides";
import type { LandingCopy } from "@/data/landingCopy";

export interface GuideDatei {
  guide: GuideLandingEntry;
  copy: LandingCopy;
  related: { slug: string; title: string; tagline: string }[];
}
export interface ToolDatei {
  copy: LandingCopy;
}

const GUIDES = import.meta.glob<GuideDatei>("../data/landing/guides/*.json", { import: "default" });
const TOOLS = import.meta.glob<ToolDatei>("../data/landing/tools/*.json", { import: "default" });

type Eintrag<T> = { promise: Promise<void>; wert?: T | null };
const cache = new Map<string, Eintrag<unknown>>();

function starten<T>(art: "guides" | "tools", slug: string): Eintrag<T> {
  const key = `${art}/${slug}`;
  let e = cache.get(key) as Eintrag<T> | undefined;
  if (!e) {
    const laden = (art === "guides" ? GUIDES : TOOLS)[`../data/landing/${art}/${slug}.json`] as (() => Promise<T>) | undefined;
    const neu = {} as Eintrag<T>;
    if (laden) {
      neu.promise = laden().then(
        (w) => { neu.wert = w; },
        // Netzfehler: nicht als „gibt es nicht“ merken, beim nächsten Render neu versuchen.
        () => { neu.wert = null; cache.delete(key); },
      );
    } else {
      neu.wert = null; // unbekannter Slug → Seite zeigt „nicht gefunden“
      neu.promise = Promise.resolve();
    }
    cache.set(key, neu);
    e = neu;
  }
  return e;
}

/** Liefert die Daten oder null (unbekannter Slug); suspendet, solange sie laden. */
function lesen<T>(art: "guides" | "tools", slug: string): T | null {
  const e = starten<T>(art, slug);
  if (e.wert === undefined) throw e.promise;
  return e.wert;
}

export const guideDaten = (slug: string) => lesen<GuideDatei>("guides", slug);
export const toolDaten = (slug: string) => lesen<ToolDatei>("tools", slug);

/** Abruf für /guides/:slug bzw. /tools/:slug sofort starten (aus dem lazy()-Lader in App.tsx). */
export function vorladenFuerPfad(pfad: string): void {
  const m = pfad.match(/^\/(guides|tools)\/([^/?#]+)/);
  if (m) starten(m[1] as "guides" | "tools", decodeURIComponent(m[2]));
}
