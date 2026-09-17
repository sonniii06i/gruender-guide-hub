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
  /** Wortmarke zentrieren (Haendler) oder links (SaaS). */
  logoMitte?: boolean;
  /** Zusagen-Leiste ueber dem Logo — nur dort, wo es etwas zu versenden gibt. */
  utilityBar?: string;
  /** Kategorie-Navigation im Fuss. */
  navigation?: Array<{ titel: string; pfad: string }>;
  /** Kurzname fuer Tags und Auswertung — ASCII, klein. */
  slug: string;
  defaultFrom: string;
  defaultReplyTo: string;
}

export const BRANDING: Branding = {
  slug: "gruenderx",
  // Absender ist die Adresse, an der auch das Profilbild haengt: eine
  // no-reply-Adresse kann kein Bild tragen und sagt dem Empfaenger
  // zudem, dass Antworten ins Leere laufen.
  //
  // ACHTUNG: IONOS laesst nur das Postfach senden, mit dem sich
  // sendMail.ts anmeldet (SMTP_LOGIN). Diese Zeile zu aendern reicht
  // nur, wenn es fuer die Adresse auch ein Postfach gibt — sonst
  // quittiert der Server mit "550 Sender address is not allowed".
  defaultFrom: "GründerX <service@gruenderx.de>",
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
  logoMitte: false,
  inkSub: "#9fc0ff",
};
