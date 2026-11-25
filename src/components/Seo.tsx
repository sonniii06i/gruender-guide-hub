import { Helmet } from "react-helmet-async";

const SITE = "https://gruenderx.de";
// Brand-OG-Default (self-hosted). Wird genutzt, wenn eine Seite kein eigenes Bild übergibt.
// 22.11.2026: echtes 1200×630-JPEG (71 KB) statt og-image.png (2400×1260, 1 MB, im Kopf
// aber als 1200×630 angegeben). Maße und Alt-Text kommen je Seite aus dieser Komponente.
export const DEFAULT_IMAGE = "https://gruenderx.de/og-default.jpg";
const DEFAULT_MASSE = { width: 1200, height: 630 } as const;

interface SeoProps {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/playbooks" */
  path?: string;
  image?: string;
  /** Echte Pixelmaße eines eigenen Bilds (ohne Angabe: keine Maße im Kopf). */
  imageWidth?: number;
  imageHeight?: number;
  /** Alt-Text des OG-Bilds; Standard: der Seitentitel. */
  imageAlt?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  /** Absolute Canonical-URL, wenn eine andere Seite/Domain das Thema besitzt. */
  canonicalUrl?: string;
  /** Optional JSON-LD object(s) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Per-Route SEO. Sets <title>, meta description, canonical, OG/Twitter tags
 * and optional JSON-LD. Use exactly once per page near the top of the tree.
 */
export const Seo = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  imageWidth,
  imageHeight,
  imageAlt,
  type = "website",
  noindex,
  canonicalUrl,
  jsonLd,
}: SeoProps) => {
  const url = canonicalUrl || `${SITE}${path}`;
  // Nicht mehr hart bei 60 Zeichen mit „…“ abschneiden: Das kappte „| GründerX“
  // und ließ Titel im Tab und bei Google mit Auslassungspunkten enden. Google
  // kürzt selbst nach Pixelbreite; die Daten halten die Länge (Tests prüfen ≤ 60).
  const fullTitle = title;
  const desc = description.length > 160 ? description.slice(0, 157) + "…" : description;
  const masse =
    image === DEFAULT_IMAGE
      ? DEFAULT_MASSE
      : imageWidth && imageHeight
        ? { width: imageWidth, height: imageHeight }
        : null;
  const bildAlt = imageAlt || fullTitle;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      {masse && <meta property="og:image:width" content={String(masse.width)} />}
      {masse && <meta property="og:image:height" content={String(masse.height)} />}
      <meta property="og:image:alt" content={bildAlt} />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={bildAlt} />
      {blocks.map((b, i) => (
        // "<" escapen: kein </script>-Ausbruch aus Datentexten im prerenderten HTML
        <script key={i} type="application/ld+json">{JSON.stringify(b).replace(/</g, "\\u003c")}</script>
      ))}
    </Helmet>
  );
};

export default Seo;
