// ===================================================================
// mailBrand.ts — alles, was diese Marke von den anderen unterscheidet.
//
// Gegenstueck zu mailLayout.ts: Das Layout ist in allen fuenf Marken
// identisch, hier stehen Farben, Name, Anschrift und Rechtszeile. Wer
// eine Markenfarbe aendert, aendert sie hier und nirgends sonst.
//
// Die Farben sind die Tokens der jeweiligen Website. Eine Mailfarbe, die
// auf keiner Seite vorkommt, laesst die Mail fremd wirken — genau das war
// bei der alten AnwaltX-Willkommensmail der Fall (#3182ce, in keinem Token).
// ===================================================================

export interface Branding {
  name: string;
  claim: string;
  url: string;
  imprint: string;
  signature: string;
  defaultReason: string;
  legalNote?: string;
  brand: string;
  brandDark: string;
  brandSoft: string;
  brandLine: string;
  ink: string;
  onInk: string;
  onBrand: string;
  inkSub: string;
  /** Kurzname fuer Tags und Auswertung — ASCII, klein. */
  slug: string;
  defaultFrom: string;
  defaultReplyTo: string;
}

export const BRANDING: Branding = {
  slug: "gruenderx",
  defaultFrom: "GründerX <no-reply@gruenderx.de>",
  defaultReplyTo: "kontakt@gruenderx.de",
  name: "GründerX",
  claim: "Gründung · Steuern · Marketplaces",
  url: "https://gruenderx.de",
  imprint: "GründerX · Sonni Buttke · Pinguinweg 18, 22527 Hamburg",
  signature: "Sonni von GründerX",
  defaultReason: "Du bekommst diese Mail, weil du ein GründerX-Konto hast.",
  legalNote: "GründerX ist eine Software und leistet keine Rechts- oder Steuerberatung.",
  brand: "#256af4",
  brandDark: "#0c2a6e",
  brandSoft: "#eef2ff",
  brandLine: "#dbe3f8",
  ink: "#0c2a6e",
  onInk: "#ffffff",
  onBrand: "#ffffff",
  inkSub: "#9fc0ff",
};
