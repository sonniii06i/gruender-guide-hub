import { Helmet } from "react-helmet-async";

const SITE = "https://gruenderx.de";
const DEFAULT_IMAGE = `${SITE}/og-default.jpg`;

interface SeoProps {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/playbooks" */
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
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
  type = "website",
  noindex,
  jsonLd,
}: SeoProps) => {
  const url = `${SITE}${path}`;
  const fullTitle = title.length > 60 ? title.slice(0, 57) + "…" : title;
  const desc = description.length > 160 ? description.slice(0, 157) + "…" : description;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
};

export default Seo;
