/**
 * Viele Ratgeber-Texte in blog_posts beginnen mit „# <Titel>“. Die Seite trägt
 * den Titel schon als H1 im Kopf; RatgeberPost rendert „#“ als H2, dadurch
 * wiederholte die erste H2 die H1 wörtlich (SEO-Lauf 26.10.2026: holding,
 * kleinunternehmer, oss, ug-oder-gmbh, us-llc, gpsr …). Nur eine führende
 * H1-Zeile fällt weg, alle weiteren Überschriften bleiben unverändert.
 */
export function ohneTitelzeile(md: string): string {
  return md.replace(/^\s*#(?!#)[ \t]+[^\n]*(\r?\n)+/, "");
}
