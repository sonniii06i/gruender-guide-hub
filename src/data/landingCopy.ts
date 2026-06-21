// Verkaufsstarke Landing-Copy pro Tool/Guide-Slug.
// Bespoke-Einträge (TOOL_COPY / GUIDE_COPY) überschreiben den generischen
// Fallback. Jeder Slug ohne Eintrag bekommt trotzdem eine vollständige,
// funktionierende Landing-Page über die Fallback-Generatoren.

export interface LandingCopy {
  /** Google-Snippet-Titel, ≤60 Zeichen, Stil "So funktioniert X – X einfach erklärt". */
  seoTitle: string;
  /** Meta-Description, ≤160 Zeichen. */
  seoDescription: string;
  /** Subhead unter der H1, 1–2 Sätze. */
  lead: string;
  /** Dringlichkeits-/Verkaufs-Absatz ("…sonst verlierst du bares Geld"). */
  urgency: string;
  /** "Das hast du am Ende" — 3–5 konkrete Ergebnis-Bullets. */
  outcomes: string[];
  /** Ehrlicher Kurz-Disclaimer. */
  disclaimer: string;
}

// Wird von den Copy-Batches befüllt (generiert).
import { TOOL_COPY } from "./landingCopy.tools";
import { GUIDE_COPY } from "./landingCopy.guides";

export { TOOL_COPY, GUIDE_COPY };

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

/** Generischer, immer-vorhandener Fallback für ein Tool ohne Bespoke-Copy. */
export function toolCopyFallback(t: {
  slug: string;
  title: string;
  desc: string;
  categoryTitle: string;
  categoryTagline: string;
}): LandingCopy {
  const cat = t.categoryTitle.replace(/^[^\wÄÖÜäöü]+/, "").trim();
  return {
    seoTitle: clip(`${t.title} – einfach erklärt | GründerX`, 60),
    seoDescription: clip(t.desc, 160),
    lead: t.desc,
    urgency:
      `Als Gründer zählt jede Entscheidung — und genau hier verlieren die meisten Zeit, Geld oder Nerven. ` +
      `Mit „${t.title}" im GründerX-Cockpit machst du es in Minuten richtig, statt teure Fehler zu riskieren. Jetzt freischalten und sofort loslegen.`,
    outcomes: [
      `Klarheit, was bei „${t.title}" konkret zu tun ist`,
      `Ein nachvollziehbares Ergebnis statt Bauchgefühl`,
      `Zugriff auf alle weiteren GründerX-Tools & Guides`,
    ],
    disclaimer:
      `GründerX ersetzt keine individuelle Rechts- oder Steuerberatung. Die Inhalte sind sorgfältig recherchiert, dienen aber der Orientierung — im Zweifel ziehst du eine Fachperson hinzu.`,
  };
}

/** Generischer Fallback für einen Guide ohne Bespoke-Copy. */
export function guideCopyFallback(g: {
  slug: string;
  title: string;
  tagline: string;
  outcome: string;
  duration: string;
  difficulty: string;
  steps: number;
}): LandingCopy {
  return {
    seoTitle: clip(`So funktioniert: ${g.title} | GründerX`, 60),
    seoDescription: clip(`${g.tagline}. Schritt für Schritt in ${g.steps} Schritten (${g.duration}). ${g.outcome}`, 160),
    lead: `${g.tagline}. Schritt-für-Schritt-Begleitung in ${g.steps} Schritten — verständlich, ohne Behörden-Deutsch.`,
    urgency:
      `Die meisten verschieben „${g.title}" wochenlang, weil unklar ist, wo man anfängt — und machen dann teure Anfängerfehler. ` +
      `Mit dem GründerX-Guide gehst du jeden Schritt in der richtigen Reihenfolge durch und kommst sicher ans Ziel. Jetzt freischalten.`,
    outcomes: [
      g.outcome,
      `Alle ${g.steps} Schritte in der richtigen Reihenfolge — nichts vergessen`,
      `Zeit- und Kostenrahmen vorab klar (${g.duration})`,
    ],
    disclaimer:
      `Dieser Guide ist eine strukturierte Orientierungshilfe, keine Rechts- oder Steuerberatung. Behörden-Anforderungen können sich ändern — im Zweifel prüfst du den aktuellen Stand bzw. ziehst eine Fachperson hinzu.`,
  };
}

export const getToolCopy = (
  slug: string,
  fallbackInput: Parameters<typeof toolCopyFallback>[0],
): LandingCopy => TOOL_COPY[slug] ?? toolCopyFallback(fallbackInput);

export const getGuideCopy = (
  slug: string,
  fallbackInput: Parameters<typeof guideCopyFallback>[0],
): LandingCopy => GUIDE_COPY[slug] ?? guideCopyFallback(fallbackInput);
