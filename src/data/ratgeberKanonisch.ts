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
//
// 22.11.2026: anwaltx.de ist eingestellt und antwortet mit 503. Der GPSR-Ratgeber
// gehoert damit wieder gruenderx.de (eigenes Canonical, Article-Schema, Sitemap).
// Die Liste bleibt als Mechanik bestehen, ist aber leer.
export const RATGEBER_KANONISCH_ANDERSWO: Readonly<Record<string, { url: string; label: string }>> = {};

export const fremdKanonisch = (slug: string) => RATGEBER_KANONISCH_ANDERSWO[slug];
