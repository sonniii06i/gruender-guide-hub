// Runs before `vite dev` and `vite build` (predev/prebuild hooks).
// Writes public/sitemap.xml with all public, indexable routes:
// static pages + every Playbook-Slug + every Anbieter-Slug + every published Blog-Post-Slug.

import { writeFileSync, readFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://gruenderx.de";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://rwrjuzemkfghlziretdj.supabase.co";
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3cmp1emVta2ZnaGx6aXJldGRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MTYxMjcsImV4cCI6MjA5MzQ5MjEyN30.2zNrmQwqHyrrhhetpdOjEWbFZ9FZIh8X0KLE4wFYr6U";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const today = new Date().toISOString().slice(0, 10);

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
  { path: "/playbooks", changefreq: "weekly", priority: "0.9", lastmod: today },
  { path: "/anbieter", changefreq: "weekly", priority: "0.9", lastmod: today },
  { path: "/ratgeber", changefreq: "daily", priority: "0.9", lastmod: today },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/kontakt", changefreq: "yearly", priority: "0.4" },
  { path: "/impressum", changefreq: "yearly", priority: "0.2" },
  { path: "/datenschutz", changefreq: "yearly", priority: "0.2" },
  { path: "/agb", changefreq: "yearly", priority: "0.2" },
];

function extractTopLevelSlugs(file: string): string[] {
  const src = readFileSync(file, "utf8");
  const re = /^ {4}slug:\s*"([a-z0-9-]+)"/gm;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) out.push(m[1]);
  return Array.from(new Set(out));
}

const playbookSlugs = extractTopLevelSlugs(resolve("src/data/playbooks.ts"));
const providerSlugs = extractTopLevelSlugs(resolve("src/pages/Anbieter.tsx"));

const playbookEntries: SitemapEntry[] = playbookSlugs.map((slug) => ({
  path: `/playbook/preview/${slug}`,
  changefreq: "monthly",
  priority: "0.8",
  lastmod: today,
}));

const providerEntries: SitemapEntry[] = providerSlugs.map((slug) => ({
  path: `/anbieter/${slug}`,
  changefreq: "monthly",
  priority: "0.7",
  lastmod: today,
}));

// Fetch published blog posts via Supabase REST (no schema knowledge needed at build time)
async function fetchBlogEntries(): Promise<SitemapEntry[]> {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,published_at,updated_at&status=eq.published&order=published_at.desc&limit=1000`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      },
    );
    if (!r.ok) {
      console.warn(`sitemap: blog fetch failed ${r.status}`);
      return [];
    }
    const rows = (await r.json()) as Array<{ slug: string; published_at: string; updated_at: string }>;
    return rows.map((p) => ({
      path: `/ratgeber/${p.slug}`,
      lastmod: (p.updated_at || p.published_at || today).slice(0, 10),
      changefreq: "weekly" as const,
      priority: "0.7",
    }));
  } catch (e) {
    console.warn("sitemap: blog fetch exception", e);
    return [];
  }
}

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

(async () => {
  const blogEntries = await fetchBlogEntries();
  const entries = [...staticEntries, ...playbookEntries, ...providerEntries, ...blogEntries];
  writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
  console.log(
    `sitemap.xml written: ${entries.length} entries (${staticEntries.length} static + ${playbookEntries.length} guides + ${providerEntries.length} anbieter + ${blogEntries.length} ratgeber)`,
  );
})();
