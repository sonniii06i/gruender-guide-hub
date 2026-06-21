import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PublicShell from "@/layouts/PublicShell";
import { Seo } from "@/components/Seo";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, BookOpen, Search } from "lucide-react";
import { HubNav } from "@/components/landing/HubNav";

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
      const { data } = await supabase
        .from("blog_posts")
        .select("id,slug,title,excerpt,hero_image_url,category,tags,reading_minutes,published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(200);
      setPosts((data || []) as BlogPostSummary[]);
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

      <section className="pt-28 pb-12 bg-hero">
        <div className="container max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-2">
            Ratgeber
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance leading-tight">
            Gründer-Wissen, das wirklich weiterhilft.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            Praxis-Guides zu Rechtsform, Steuern, E-Commerce-Compliance und Banking. Recherchiert für
            den deutschen Markt, jede Woche neu — Stand 2026.
          </p>

          <div className="mt-8 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Thema suchen … z. B. GmbH, OSS, Holding"
              className="pl-11 h-12 rounded-full"
            />
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container max-w-5xl">
          {cats.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setCategory(null)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                  !category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-secondary"
                }`}
              >
                Alle
              </button>
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                    category === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {CATEGORY_LABELS[c] ?? c}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <p className="text-muted-foreground">Lade Artikel …</p>
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
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-soft hover:-translate-y-1 transition-all"
                >
                  {p.hero_image_url ? (
                    <div className="aspect-[16/9] overflow-hidden bg-secondary">
                      <img
                        src={p.hero_image_url}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                    <h2 className="text-xl font-bold leading-snug mb-2 group-hover:text-accent-blue transition-colors">
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
