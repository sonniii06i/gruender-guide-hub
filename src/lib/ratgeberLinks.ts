// Links im Ratgeber-Text (Markdown aus Supabase blog_posts).
//
// Befund SEO 11.11.2026: 42 Fliesstext-Links in 12 Ratgebern zeigten auf
// /playbook/preview/<slug>. Diese Route liegt hinter der Paywall, ist in
// robots.txt gesperrt (Disallow: /playbook/) und liefert ohne JS nur die
// App-Huelle. Suchmaschinen konnten dem Link nicht folgen, Leser ohne Abo
// landeten vor der Bezahlwand. Zu fast jedem dieser Themen gibt es aber eine
// oeffentliche Seite: die Guide-Landing /guides/<slug> oder den Ratgeber, in
// den der Guide zusammengelegt wurde (guideMerges.ts).
//
// Der Link wird deshalb beim Rendern umgebogen, statt 12 Artikel einzeln zu
// aendern: so greift es auch fuer kuenftige Texte der Redaktion.
import { guideHref, isMergedGuide } from "@/data/guideMerges";
import { findGuideLanding } from "@/data/guides";

const VORSCHAU = /^\/playbook\/preview\/([a-z0-9-]+)\/?(?:[?#].*)?$/;

// Vorschau-Slugs ohne eigene Guide-Landing (Abschnitte eines Playbooks), fuer
// die es eine oeffentliche Seite zum selben Thema gibt.
// ratgeber-links.test.ts prueft, dass jedes Ziel in der Sitemap-Quelle steht.
export const VORSCHAU_ERSATZ: Readonly<Record<string, string>> = {
  lucid: "/ratgeber/lucid-verpackungsregister-anmelden",
  rechnung: "/tools/rechnungs-generator",
};

/**
 * Oeffentliches Ziel fuer einen Link aus dem Ratgeber-Text.
 * /playbook/preview/<slug> → Ratgeber (falls zusammengelegt), sonst Guide-Landing,
 * sonst Themen-Ersatz. Alles andere bleibt unveraendert; ebenso ein Link, der
 * auf den Artikel selbst zeigen wuerde.
 */
export function oeffentlichesLinkziel(href: string | undefined, selbst?: string): string | undefined {
  if (!href) return href;
  const m = VORSCHAU.exec(href);
  if (!m) return href;
  const slug = m[1];
  const ziel =
    isMergedGuide(slug) || findGuideLanding(slug) ? guideHref(slug) : VORSCHAU_ERSATZ[slug];
  if (!ziel || ziel === selbst) return href;
  return ziel;
}
