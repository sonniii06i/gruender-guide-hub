// Ratgeber (Text aus Supabase blog_posts), deren Thema eine andere Domain
// besitzt — Stand 26.09.2026 (Themenzuordnung AnwaltX <-> GruenderX):
// GPSR ist Compliance fuer Online-Haendler und gehoert zu anwaltx.de; dort
// steht die ausfuehrlichere Seite mit Artikelangaben der VO (EU) 2023/988.
//
// Folgen fuer jeden Eintrag:
// - Canonical zeigt auf das Ziel (RatgeberPost.tsx), kein Article-Schema.
// - Sichtbarer Verweis auf die Zielseite oben im Artikel.
// - Nicht in der Sitemap (scripts/generate-sitemap.ts).
// - WICHTIG: Pfad in EXTRA_ROUTES von scripts/prerender.mjs, sonst liefert der
//   Server den SPA-Fallback mit Canonical der Startseite.
//   ratgeberKanonisch.test.ts prueft das.
export const RATGEBER_KANONISCH_ANDERSWO: Readonly<Record<string, { url: string; label: string }>> = {
  "gpsr-verordnung-haendler": {
    url: "https://anwaltx.de/gpsr-produktsicherheit-onlinehandel",
    label: "GPSR-Pflichten für Online-Händler im Detail – mit Artikelangaben der Verordnung (AnwaltX)",
  },
};

export const fremdKanonisch = (slug: string) => RATGEBER_KANONISCH_ANDERSWO[slug];
