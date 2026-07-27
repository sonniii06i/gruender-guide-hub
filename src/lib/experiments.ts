// A/B-Experimente für GründerX.
//
// Zwei Eigenschaften entscheiden darüber, ob ein Test überhaupt auswertbar ist,
// und beide sind hier bewusst gesetzt:
//
// 1. DETERMINISTISCH. Die Variante wird aus (anon_id + experiment_id) gehasht,
//    nicht gewürfelt. Ein Zufallswert pro Aufruf hieße: andere Variante bei
//    jedem Reload, sichtbares Flackern, und ein Nutzer landet in beiden
//    Gruppen — womit die Auswertung wertlos ist. Der Hash braucht dafür weder
//    Server noch Speicher.
//
// 2. EXPOSURE GENAU EINMAL. Gezählt wird, wer eine Variante wirklich gesehen
//    hat — nicht jeder Render. Ohne diese Sperre wäre die Nennerzahl jeder
//    Conversion-Rate von der Render-Häufigkeit abhängig.
//
// Wer NICHT teilnahmeberechtigt ist, bekommt null und sieht das Original.
// Die Exposure wird trotzdem mit eligibility_flag=false geschrieben, sonst
// lässt sich später nicht mehr prüfen, ob das Ziel-Segment richtig geschnitten
// war.

import { getAnonId, trackExperiment } from "@/utils/analytics";

export interface ExperimentDef {
  id: string;
  variants: string[]; // erste Variante ist immer die Kontrolle
  enabled: boolean;
  description: string;
}

// Aktive Experimente. Ein Test wird durch `enabled: false` beendet, nicht durch
// Löschen — sonst verlieren die bereits geschriebenen Events ihren Bezug.
export const EXPERIMENTS: Record<string, ExperimentDef> = {
  felix_onboarding: {
    id: "felix_onboarding",
    variants: ["control", "playbook_first"],
    enabled: false,
    description: "Onboarding: direkt zu Felix gegen Playbook-Auswahl zuerst",
  },
};

// FNV-1a plus fmix32-Finalizer (aus MurmurHash3).
//
// Der Finalizer ist NICHT optional. Ohne ihn ist das unterste Bit von FNV-1a
// praktisch allein durch das letzte Eingabezeichen bestimmt: `% 2` liest genau
// dieses Bit, und zwei parallele Experimente ("exp_a" vs "exp_b") teilen jeden
// Nutzer dadurch perfekt gegenläufig zu — gemessen 0,00 % Übereinstimmung statt
// der erwarteten ~50 %. Wer in Test A die Kontrolle sieht, wäre in Test B
// garantiert in der Variante; beide Tests wären nicht mehr unabhängig
// auswertbar. fmix32 verteilt die Entropie über alle 32 Bit.
function hash32(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  // fmix32
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/** Variante für eine Zuteilungseinheit. Ohne Seiteneffekt — feuert nichts. */
export function getVariant(experimentId: string, unitId?: string): string | null {
  const exp = EXPERIMENTS[experimentId];
  if (!exp || !exp.enabled || exp.variants.length === 0) return null;

  const unit = unitId || (typeof window !== "undefined" ? getAnonId() : "");
  if (!unit) return null;

  // experiment_id MUSS in den Hash: sonst landet derselbe Nutzer in jedem
  // Experiment im selben Bucket und parallele Tests korrelieren miteinander.
  //
  // Bucket über die OBEREN Bits (Division durch 2^32) statt über `% n`. Der
  // Modulo würde wieder nur die untersten Bits lesen und wäre damit anfällig
  // für genau die Kopplung, die der Finalizer gerade behebt.
  const idx = Math.floor((hash32(`${unit}:${experimentId}`) / 0x100000000) * exp.variants.length);
  return exp.variants[Math.min(idx, exp.variants.length - 1)];
}

const exposed = new Set<string>();

/**
 * Variante holen UND die Exposure genau einmal pro Seitenleben melden.
 * `eligible` bildet Zielgruppen-Bedingungen ab (z. B. nur Neukunden).
 */
export function useExperimentVariant(
  experimentId: string,
  eligible: boolean = true,
): string | null {
  const variant = getVariant(experimentId);
  if (!variant) return null;

  const key = `${experimentId}:${variant}`;
  if (!exposed.has(key)) {
    exposed.add(key);
    trackExperiment.exposure(experimentId, variant, eligible);
  }

  return eligible ? variant : null;
}
