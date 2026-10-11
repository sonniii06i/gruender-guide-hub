import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PublicShell from "@/layouts/PublicShell";
import { Seo } from "@/components/Seo";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, BookOpen, Search } from "lucide-react";
import { HubNav } from "@/components/landing/HubNav";
import { PageHeader } from "@/components/landing/PageHeader";

interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  hero_image_url: string | null;
  category: string;
  tags: string[];
  reading_minutes: number;
  published_at: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  gruendung: "Gründung",
  steuern: "Steuern",
  ecommerce: "E-Commerce",
  banking: "Banking",
  recht: "Recht & Marken",
  international: "International",
  buchhaltung: "Buchhaltung",
  foerderung: "Förderung",
  versicherung: "Versicherung",
};

const Ratgeber = () => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // hero_image_url steht bei 15 von 20 Artikeln als base64-PNG in der
      // Datenbank (1–5 MB je Bild). Mit in die Liste geladen, war /ratgeber
      // 14 MB gross (gemessen 25.09.2026). Bilder deshalb nur holen, wenn es
      // echte URLs sind; die anderen Karten zeigen den Farbverlauf.
      const [{ data }, { data: bilder }] = await Promise.all([
        supabase
          .from("blog_posts")
          .select("id,slug,title,excerpt,category,tags,reading_minutes,published_at")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(200),
        supabase
          .from("blog_posts")
          .select("id,hero_image_url")
          .eq("status", "published")
          .like("hero_image_url", "http%")
          .limit(200),
      ]);
      const bildVon = new Map((bilder || []).map((b) => [b.id, b.hero_image_url as string | null]));
      setPosts(
        ((data || []) as Omit<BlogPostSummary, "hero_image_url">[]).map((p) => ({
          ...p,
          hero_image_url: bildVon.get(p.id) ?? null,
        })) as BlogPostSummary[],
      );
      setLoading(false);
    })();
  }, []);

  const cats = Array.from(new Set(posts.map((p) => p.category))).sort();

  const filtered = posts.filter((p) => {
    if (category && p.category !== category) return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <PublicShell>
      <Seo
        title="Ratgeber: Gründung, Steuern & E-Commerce 2026 | GründerX"
        description="Aktuelle Guides zu GmbH-Gründung, UG, Steuern, OSS, Amazon FBA, US-LLC, Geschäftskonten & Förderung. Recherchiert, praxisnah, Stand 2026."
        path="/ratgeber"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "GründerX Ratgeber",
          description: "Aktuelle Artikel zu Unternehmensgründung, Steuern, Buchhaltung und E-Commerce in Deutschland.",
          url: "https://gruenderx.de/ratgeber",
        }}
      />

      <PageHeader
        title="Gründer-Wissen, das wirklich weiterhilft."
        lead={
          <p>
            Praxis-Guides zu Rechtsform, Steuern, E-Commerce-Compliance und Banking. Recherchiert für den deutschen
            Markt, jede Woche neu, Stand 2026.
          </p>
        }
      >
        <div className="relative max-w-xl">
          <label htmlFor="ratgeber-suche" className="sr-only">Ratgeber durchsuchen</label>
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="ratgeber-suche"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Thema suchen, z. B. GmbH, OSS, Holding"
            className="h-12 rounded-xl pl-11 text-base shadow-card"
          />
        </div>
      </PageHeader>

      <section className="py-12 md:py-16">
        <div className="container max-w-5xl">
          {cats.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setCategory(null)}
                aria-pressed={!category}
                className={`rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  !category
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/75 hover:border-foreground/20 hover:text-foreground"
                }`}
              >
                Alle
              </button>
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    category === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground/75 hover:border-foreground/20 hover:text-foreground"
                  }`}
                >
                  {CATEGORY_LABELS[c] ?? c}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            /* data-prerender-pending: Signal an scripts/prerender.mjs, dass hier noch
               asynchron geladen wird. Ohne das friert der Prerender "Lade Artikel …"
               ein und der Crawler sieht KEINEN einzigen Artikel-Link. */
            <div data-prerender-pending aria-busy="true">
              <p className="sr-only">Lade Artikel …</p>
              <div className="grid gap-6 md:grid-cols-2" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="aspect-[16/9] animate-pulse bg-secondary" />
                    <div className="space-y-3 p-6">
                      <div className="h-3 w-1/3 animate-pulse rounded bg-secondary" />
                      <div className="h-5 w-4/5 animate-pulse rounded bg-secondary" />
                      <div className="h-3 w-full animate-pulse rounded bg-secondary" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Noch keine Artikel veröffentlicht.</p>
              <p className="text-sm text-muted-foreground">
                Die ersten Posts werden automatisch generiert und erscheinen hier in Kürze.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  to={`/ratgeber/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,box-shadow] hover:border-accent-blue/30 hover:shadow-soft"
                >
                  {p.hero_image_url ? (
                    <div className="aspect-[16/9] overflow-hidden bg-secondary">
                      <img
                        src={p.hero_image_url}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-gradient-to-br from-accent/30 to-primary/10" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <Badge variant="secondary" className="rounded-full">
                        {CATEGORY_LABELS[p.category] ?? p.category}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {p.reading_minutes} Min
                      </span>
                      <time dateTime={p.published_at}>
                        {new Date(p.published_at).toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <h2 className="mb-2 text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent-blue">
                      {p.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <HubNav show={["tools", "guides"]} />
        </div>
      </section>
    </PublicShell>
  );
};

export default Ratgeber;
