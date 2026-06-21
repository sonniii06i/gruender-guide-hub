import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { rankItems, type MatchContext } from "@/lib/internalLinks";

interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  reading_minutes: number;
}

/**
 * Zeigt thematisch passende Ratgeber-Artikel auf einer Tool-/Guide-Landing.
 * Lädt veröffentlichte Blog-Posts und rankt sie per Token-Overlap zum Kontext.
 * Rendert nichts, wenn keine passenden Artikel existieren.
 */
export const RelatedArticles = ({ context, limit = 3 }: { context: MatchContext; limit?: number }) => {
  const [posts, setPosts] = useState<PostSummary[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("slug,title,excerpt,category,tags,reading_minutes")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(200);
      if (!cancelled) setPosts((data ?? []) as PostSummary[]);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const matched = rankItems(
    posts,
    (p) => `${p.title} ${p.excerpt} ${(p.tags ?? []).join(" ")} ${p.category}`,
    context,
    limit,
  );

  if (matched.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-5 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-accent-blue" /> Passende Ratgeber-Artikel
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {matched.map((p) => (
          <Link
            key={p.slug}
            to={`/ratgeber/${p.slug}`}
            className="rounded-xl border border-border bg-card p-4 hover:border-accent-blue/50 transition-colors"
          >
            <p className="font-medium text-sm mb-1">{p.title}</p>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{p.excerpt}</p>
            <p className="text-[11px] text-muted-foreground/80 flex items-center gap-1">
              <Clock className="h-3 w-3" /> {p.reading_minutes} Min
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
