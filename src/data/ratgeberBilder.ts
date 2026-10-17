// Titelbilder der Ratgeber als statische WebP-Dateien (SEO-Runde 17.10.2026).
//
// 15 von 20 Ratgebern tragen in blog_posts.hero_image_url ein base64-PNG
// (1024×1024, 0,27–1,06 MB). RatgeberPost schrieb es als data:-URI direkt ins
// <img> — das prerenderte HTML wog 0,4–1,5 MB, das Bild war das LCP-Element
// (PageSpeed mobil: LCP bis 14 s, Geschäftskonto-Ratgeber 44 Punkte).
// Dieselben Bilder liegen jetzt als WebP (q80, 6–14 KB) unter
// public/ratgeber-bilder/<slug>.webp und werden normal geladen und gecacht.
//
// Neues Bild: als http(s)-URL in die Datenbank (Storage) oder hier eintragen
// und die WebP-Datei ablegen. Ein base64-Bild ohne Eintrag hier wird NICHT
// mehr ausgeliefert — lieber kein Titelbild als 1 MB im HTML.
export const LOKALE_TITELBILDER: ReadonlySet<string> = new Set([
  "amazon-fba-starten-deutschland",
  "bestes-geschaeftskonto-gruender-vergleich-2026",
  "brutto-netto-selbstaendig",
  "crypto-steuer-deutschland-2026",
  "datev-export-buchhaltung-guide",
  "e-rechnung-pflicht-b2b-2026",
  "einzelunternehmen-gruenden-gewerbe-freiberufler",
  "foerderung-gruender-2026",
  "gmbh-gruenden-kosten-2026",
  "gpsr-verordnung-haendler",
  "hk-limited-gruenden",
  "lucid-verpackungsregister-anmelden",
  "marke-anmelden-dpma",
  "ug-oder-gmbh",
  "versicherung-selbststaendige",
]);

/** Auslieferbare Bild-URL (relativ oder absolut) oder undefined — nie eine data:-URI. */
export const titelbildUrl = (slug: string, heroImageUrl: string | null | undefined): string | undefined => {
  if (heroImageUrl && /^https?:\/\//.test(heroImageUrl)) return heroImageUrl;
  if (LOKALE_TITELBILDER.has(slug)) return `/ratgeber-bilder/${slug}.webp`;
  return undefined;
};

/** Absolute URL fuer og:image und Article.image. */
export const titelbildAbsolut = (slug: string, heroImageUrl: string | null | undefined): string | undefined => {
  const u = titelbildUrl(slug, heroImageUrl);
  return u?.startsWith("/") ? `https://gruenderx.de${u}` : u;
};
