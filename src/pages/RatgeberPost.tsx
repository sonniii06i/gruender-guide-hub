import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import PublicShell from "@/layouts/PublicShell";
import { Seo } from "@/components/Seo";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronLeft, BookOpen, Wrench, ListChecks, ArrowRight } from "lucide-react";
import { relatedToolsFor, relatedGuidesFor, BLOG_CATEGORY_TOPIC, type LinkItem } from "@/lib/internalLinks";
import { findGuideLanding } from "@/data/guides";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_md: string;
  hero_image_url: string | null;
  category: string;
  tags: string[];
  meta_title: string;
  meta_description: string;
  keywords: string[];
  related_playbooks: string[];
  related_providers: string[];
  author: string;
  reading_minutes: number;
  published_at: string;
  updated_at: string;
}

const RatgeberPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (!data) setNotFound(true);
      else setPost(data as BlogPost);
    })();
  }, [slug]);

  if (notFound) {
    return (
      <PublicShell>
        <div className="container max-w-3xl py-32 text-center">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-3">Artikel nicht gefunden</h1>
          <p className="text-muted-foreground mb-6">
            Vielleicht findest du dein Thema in unserer Übersicht.
          </p>
          <Link to="/ratgeber" className="text-accent-blue hover:underline">
            ← Zurück zum Ratgeber
          </Link>
        </div>
      </PublicShell>
    );
  }

  if (!post) {
    return (
      <PublicShell>
        <div className="container max-w-3xl py-32">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-24 bg-secondary rounded" />
            <div className="h-12 w-3/4 bg-secondary rounded" />
            <div className="h-64 w-full bg-secondary rounded mt-6" />
          </div>
        </div>
      </PublicShell>
    );
  }

  const url = `https://gruenderx.de/ratgeber/${post.slug}`;

  // Interne Verlinkung: passende Guides + Tools aus Kategorie/Tags/Titel ableiten.
  const matchCtx = {
    text: `${post.title} ${post.excerpt} ${(post.tags ?? []).join(" ")} ${(post.keywords ?? []).join(" ")}`,
    topic: BLOG_CATEGORY_TOPIC[post.category],
  };
  // Explizit gepflegte related_playbooks zuerst, dann per Matcher auffüllen.
  const explicitGuides: LinkItem[] = (post.related_playbooks ?? [])
    .map((s) => findGuideLanding(s))
    .filter((g): g is NonNullable<typeof g> => !!g)
    .map((g) => ({ slug: g.slug, title: g.title, desc: g.tagline }));
  const matchedGuides = relatedGuidesFor({ ...matchCtx, exclude: explicitGuides.map((g) => g.slug) }, 3);
  const guides = [...explicitGuides, ...matchedGuides].slice(0, 3);
  const tools = relatedToolsFor(matchCtx, 3);

  return (
    <PublicShell>
      <Seo
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        path={`/ratgeber/${post.slug}`}
        image={post.hero_image_url || undefined}
        type="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.meta_description || post.excerpt,
            image: post.hero_image_url || undefined,
            datePublished: post.published_at,
            dateModified: post.updated_at,
            author: { "@type": "Person", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "GründerX",
              logo: { "@type": "ImageObject", url: "https://gruenderx.de/favicon.png" },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            keywords: post.keywords.join(", "),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: "https://gruenderx.de/" },
              { "@type": "ListItem", position: 2, name: "Ratgeber", item: "https://gruenderx.de/ratgeber" },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        ]}
      />

      <article>
        <header className="pt-28 pb-10 bg-hero">
          <div className="container max-w-3xl">
            <Link
              to="/ratgeber"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Alle Ratgeber-Artikel
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
              <Badge variant="secondary" className="rounded-full">{post.category}</Badge>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {post.reading_minutes} Min Lesezeit
              </span>
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
              {post.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground text-balance">{post.excerpt}</p>
          </div>
        </header>

        {post.hero_image_url && (
          <div className="container max-w-4xl -mt-4">
            <img
              src={post.hero_image_url}
              alt={post.title}
              className="w-full aspect-[16/9] object-cover rounded-2xl shadow-soft"
            />
          </div>
        )}

        <div className="container max-w-3xl py-14">
          <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-24
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8
              prose-a:text-accent-blue prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-li:my-1
              prose-blockquote:border-accent-blue prose-blockquote:bg-secondary/50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
              prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-img:rounded-xl">
            <ReactMarkdown>{post.body_md}</ReactMarkdown>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Badge key={t} variant="outline" className="rounded-full">
                  #{t}
                </Badge>
              ))}
            </div>
          )}

          {(guides.length > 0 || tools.length > 0) && (
            <div className="mt-14 space-y-6">
              {guides.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold tracking-tight mb-3 flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-accent-blue" /> Guides, die dich Schritt für Schritt durchführen
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {guides.map((g) => (
                      <Link
                        key={g.slug}
                        to={`/guides/${g.slug}`}
                        className="group rounded-xl border border-border bg-card p-4 hover:border-accent-blue/50 transition-colors"
                      >
                        <p className="font-medium text-sm mb-1 flex items-center justify-between gap-2">
                          {g.title}
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{g.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {tools.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold tracking-tight mb-3 flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-accent-blue" /> Passende Tools im GründerX-Cockpit
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {tools.map((t) => (
                      <Link
                        key={t.slug}
                        to={`/tools/${t.slug}`}
                        className="group rounded-xl border border-border bg-card p-4 hover:border-accent-blue/50 transition-colors"
                      >
                        <p className="font-medium text-sm mb-1 flex items-center justify-between gap-2">
                          {t.title}
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{t.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-14 rounded-2xl border border-border bg-secondary/30 p-6">
            <p className="text-sm text-muted-foreground italic">
              Dieser Artikel ersetzt keine individuelle Steuer- oder Rechtsberatung. Stand 2026. Verfasst
              von <strong className="text-foreground not-italic">{post.author}</strong>, KI-Redakteur auf
              GründerX, redaktionell freigegeben.
            </p>
          </div>
        </div>
      </article>
    </PublicShell>
  );
};

export default RatgeberPost;
