// Runs before `vite dev` and `vite build` (predev/prebuild hooks).
// Writes public/sitemap.xml with all public, indexable routes:
// static pages + every Playbook-Slug + every Anbieter-Slug.

import { writeFileSync, readFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://gruenderx.de";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const today = new Date().toISOString().slice(0, 10);

// ---------- Static, public, indexable routes ----------
const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
  { path: "/playbooks", changefreq: "weekly", priority: "0.9", lastmod: today },
  { path: "/anbieter", changefreq: "weekly", priority: "0.9", lastmod: today },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/kontakt", changefreq: "yearly", priority: "0.4" },
  { path: "/impressum", changefreq: "yearly", priority: "0.2" },
  { path: "/datenschutz", changefreq: "yearly", priority: "0.2" },
  { path: "/agb", changefreq: "yearly", priority: "0.2" },
];

// ---------- Extract Playbook slugs ----------
function extractTopLevelSlugs(file: string): string[] {
  const src = readFileSync(file, "utf8");
  // Match only top-level Playbook entries: lines starting with exactly 4 spaces "    slug:"
  const re = /^ {4}slug:\s*"([a-z0-9-]+)"/gm;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) out.push(m[1]);
  return out;
}

// ---------- Extract Provider slugs ----------
function extractProviderSlugs(file: string): string[] {
  const src = readFileSync(file, "utf8");
  // Match only top-level Provider entries inside the PROVIDERS array
  const re = /^ {4}slug:\s*"([a-z0-9-]+)"/gm;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) out.push(m[1]);
  return Array.from(new Set(out));
}

const playbookSlugs = extractTopLevelSlugs(resolve("src/data/playbooks.ts"));
const providerSlugs = extractProviderSlugs(resolve("src/pages/Anbieter.tsx"));

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

const entries: SitemapEntry[] = [
  ...staticEntries,
  ...playbookEntries,
  ...providerEntries,
];

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

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(
  `sitemap.xml written: ${entries.length} entries (${staticEntries.length} static + ${playbookEntries.length} guides + ${providerEntries.length} anbieter)`,
);
