import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ohneTitelzeile } from "@/lib/ratgeberMarkdown";
import { supabase } from "@/integrations/supabase/client";
import PublicShell from "@/layouts/PublicShell";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { PLANS, formatEurCents } from "@/config/pricing";
import { NewsletterOptin } from "@/components/NewsletterOptin";
import { Clock, ChevronLeft, BookOpen, Wrench, ListChecks, ArrowRight, Info } from "lucide-react";
import { relatedToolsFor, relatedGuidesFor, BLOG_CATEGORY_TOPIC, type LinkItem } from "@/lib/internalLinks";
import { findGuideIndex } from "@/data/guideIndex";
import { guideHref, guidesMergedInto } from "@/data/guideMerges";
import { fremdKanonisch } from "@/data/ratgeberKanonisch";
import { titelbildAbsolut, titelbildUrl } from "@/data/ratgeberBilder";
import { prerenderDaten, prerenderDatenMerken } from "@/lib/prerender";

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

type Weitere = Pick<BlogPost, "slug" | "title" | "excerpt" | "category">[];

// Stand, mit dem der Artikel prerendert wurde (siehe src/lib/prerender.ts):
// Der erste Render zeigt sonst das Lade-Skelett statt des HTML-Inhalts.
interface Snapshot {
  post: BlogPost | null;
  notFound: boolean;
  weitere: Weitere;
}
const snapshotKey = (slug: string) => `ratgeber:post:${slug}`;

const RatgeberPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [start] = useState(() => (slug ? prerenderDaten<Snapshot>(snapshotKey(slug)) : undefined));
  const [post, setPost] = useState<BlogPost | null>(start?.post ?? null);
  const [notFound, setNotFound] = useState(start?.notFound ?? false);
  // Weitere Ratgeber: bisher verlinkte kein Artikel einen anderen — jeder hing
  // nur an /ratgeber. null = laedt noch (Signal an den Prerender).
  const [weitere, setWeitere] = useState<Weitere | null>(start?.weitere ?? null);

  useEffect(() => {
    if (!slug) return;
    // Mit Snapshot steht die Liste schon -- nicht kurz auf „lädt" zurückspringen.
    if (!prerenderDaten<Snapshot>(snapshotKey(slug))) setWeitere(null);
    (async () => {
      // hero_image_url NICHT mitladen, solange es base64 sein kann: bei 15 von
      // 20 Artikeln waren das bis zu 1,4 MB JSON je Seitenaufruf. Echte URLs
      // holt die zweite Abfrage, base64-Bilder kommen aus ratgeberBilder.ts.
      const [{ data }, { data: bild }, { data: andere }] = await Promise.all([
        supabase
          .from("blog_posts")
          .select(
            "id,slug,title,excerpt,body_md,category,tags,meta_title,meta_description,keywords,related_playbooks,related_providers,author,reading_minutes,published_at,updated_at",
          )
          .eq("slug", slug)
          .eq("status", "published")
          .maybeSingle(),
        supabase
          .from("blog_posts")
          .select("hero_image_url")
          .eq("slug", slug)
          .eq("status", "published")
          .like("hero_image_url", "http%")
          .maybeSingle(),
        supabase
          .from("blog_posts")
          .select("slug, title, excerpt, category")
          .eq("status", "published")
          .neq("slug", slug)
          .order("published_at", { ascending: false })
          .limit(30),
      ]);
      const geladen = data
        ? { ...(data as Omit<BlogPost, "hero_image_url">), hero_image_url: bild?.hero_image_url ?? null }
        : null;
      const liste = (andere ?? []) as Weitere;
      const kat = geladen?.category;
      const gleich = liste.filter((a) => a.category === kat);
      const rest = liste.filter((a) => a.category !== kat);
      const auswahl = [...gleich, ...rest].slice(0, 3);
      prerenderDatenMerken(snapshotKey(slug), { post: geladen, notFound: !geladen, weitere: auswahl } satisfies Snapshot);
      setNotFound(!geladen);
      if (geladen) setPost(geladen);
      setWeitere(auswahl);
    })();
  }, [slug]);

  if (notFound) {
    return (
      <PublicShell>
        <div className="container max-w-xl px-4 pb-24 pt-36 text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-blue">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">Artikel nicht gefunden</h1>
          <p className="mt-3 text-muted-foreground">
            Vielleicht findest du dein Thema in unserer Übersicht.
          </p>
          <Button asChild size="lg" className="mt-7 h-11 rounded-xl bg-gradient-primary font-semibold">
            <Link to="/ratgeber">Zur Ratgeber-Übersicht</Link>
          </Button>
        </div>
      </PublicShell>
    );
  }

  if (!post) {
    return (
      <PublicShell>
        <div className="container max-w-3xl px-4 pb-24 pt-32" role="status" aria-live="polite">
          <span className="sr-only">Artikel wird geladen …</span>
          <div className="animate-pulse space-y-4" aria-hidden="true">
            <div className="h-4 w-40 rounded bg-secondary" />
            <div className="h-11 w-full rounded-lg bg-secondary" />
            <div className="h-11 w-2/3 rounded-lg bg-secondary" />
            <div className="h-5 w-5/6 rounded bg-secondary" />
            <div className="mt-8 aspect-[16/9] w-full rounded-2xl bg-secondary" />
          </div>
        </div>
      </PublicShell>
    );
  }

  const url = `https://gruenderx.de/ratgeber/${post.slug}`;
  // Sichtbares Änderungsdatum (Benchmark 25.10.2026: Gewinner zeigen „Stand/aktualisiert“) – nur bei echter Überarbeitung (> 1 Tag)
  const datumDe = (d: string) =>
    new Date(d).toLocaleDateString("de-DE", { timeZone: "Europe/Berlin", day: "2-digit", month: "long", year: "numeric" });
  const aktualisiert =
    !!post.updated_at && new Date(post.updated_at).getTime() - new Date(post.published_at).getTime() > 86_400_000;
  // Thema gehoert einer anderen Domain (z. B. GPSR -> anwaltx.de): Canonical
  // dorthin, kein Article-Schema (gehoert auf die kanonische Seite).
  const kanonisch = fremdKanonisch(post.slug);
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: "https://gruenderx.de/" },
      { "@type": "ListItem", position: 2, name: "Ratgeber", item: "https://gruenderx.de/ratgeber" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  // Interne Verlinkung: passende Guides + Tools aus Kategorie/Tags/Titel ableiten.
  const matchCtx = {
    text: `${post.title} ${post.excerpt} ${(post.tags ?? []).join(" ")} ${(post.keywords ?? []).join(" ")}`,
    topic: BLOG_CATEGORY_TOPIC[post.category],
  };
  // Explizit gepflegte related_playbooks zuerst, dann per Matcher auffüllen.
  const explicitGuides: LinkItem[] = (post.related_playbooks ?? [])
    .map((s) => findGuideIndex(s))
    .filter((g): g is NonNullable<typeof g> => !!g)
    .map((g) => ({ slug: g.slug, title: g.title, desc: g.tagline }));
  const matchedGuides = relatedGuidesFor({ ...matchCtx, exclude: explicitGuides.map((g) => g.slug) }, 3);
  // Guides, die in DIESEN Ratgeber zusammengelegt wurden, zeigt der
  // Playbook-Kasten unten — als Link wuerden sie auf die Seite selbst zeigen.
  const zusammengelegt = guidesMergedInto(post.slug)
    .map((s) => findGuideIndex(s))
    .filter((g): g is NonNullable<typeof g> & { duration: string; schritte: string[] } => !!g?.schritte && !!g.duration);
  const selbst = `/ratgeber/${post.slug}`;
  const guides = [...explicitGuides, ...matchedGuides]
    .filter((g, i, alle) => guideHref(g.slug) !== selbst && alle.findIndex((x) => guideHref(x.slug) === guideHref(g.slug)) === i)
    .slice(0, 3);
  const tools = relatedToolsFor(matchCtx, 3);

  // Nie eine data:-URI ausliefern (weder im <img> noch in og/JSON-LD):
  // base64-Titelbilder liegen als WebP unter /ratgeber-bilder/ (ratgeberBilder.ts).
  const titelbild = titelbildUrl(post.slug, post.hero_image_url);
  const teilbaresBild = titelbildAbsolut(post.slug, post.hero_image_url);

  return (
    <PublicShell>
      <Seo
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        path={`/ratgeber/${post.slug}`}
        image={teilbaresBild}
        type="article"
        canonicalUrl={kanonisch?.url}
        jsonLd={kanonisch ? [breadcrumbLd] : [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.meta_description || post.excerpt,
            image: teilbaresBild,
            datePublished: post.published_at,
            dateModified: post.updated_at,
            // 25.10.2026: Texte entstehen in der KI-gestützten Redaktion – Autor ist die Organisation,
            // verantwortlich die echte Person (keine erfundene Person als Autor im Markup).
            author: { "@type": "Organization", name: "GründerX-Redaktion", url: "https://gruenderx.de/" },
            accountablePerson: { "@type": "Person", name: "Sonni Buttke", jobTitle: "Gründer von GründerX", url: "https://gruenderx.de/impressum" },
            publisher: {
              "@type": "Organization",
              name: "GründerX",
              logo: { "@type": "ImageObject", url: "https://gruenderx.de/favicon.png" },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            keywords: post.keywords.join(", "),
          },
          breadcrumbLd,
        ]}
      />

      <article>
        <header className={`relative overflow-hidden border-b border-border/70 bg-hero pt-28 md:pt-32 ${titelbild ? "pb-16" : "pb-12 md:pb-14"}`}>
          <div
            className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
            aria-hidden="true"
          />
          <div className="container relative max-w-3xl px-4">
            <Link
              to="/ratgeber"
              className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Alle Ratgeber-Artikel
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center rounded-full border border-accent-blue/20 bg-accent px-3 py-0.5 text-[13px] font-medium text-accent-blue">
                {post.category}
              </span>
              <span className="flex items-center gap-1 tabular">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {post.reading_minutes} Min Lesezeit
              </span>
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString("de-DE", {
                  // feste Zone: Prerender (UTC) und Besucher rendern dasselbe Datum
                  timeZone: "Europe/Berlin",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              {aktualisiert && (
                <span>
                  · aktualisiert am{" "}
                  <time dateTime={post.updated_at}>{datumDe(post.updated_at)}</time>
                </span>
              )}
            </div>

            <h1 className="text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] md:text-[3rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
            {kanonisch && (
              <a
                href={kanonisch.url}
                className="mt-6 inline-flex items-center gap-1 rounded-xl border border-accent-blue/40 bg-card px-4 py-3 text-sm font-semibold text-accent-blue hover:border-accent-blue transition-colors"
              >
                {kanonisch.label} <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </a>
            )}
          </div>
        </header>

        {titelbild && (
          <div className="container relative -mt-8 max-w-4xl px-4">
            <img
              src={titelbild}
              alt={post.title}
              width={1024}
              height={576}
              // React 18 kennt fetchPriority nicht (Warnung), das Attribut klein durchreichen
              {...{ fetchpriority: "high" }}
              decoding="async"
              className="w-full aspect-[16/9] object-cover rounded-2xl shadow-soft"
            />
          </div>
        )}

        <div className="container max-w-3xl px-4 py-12 md:py-16">
          {/* Ratgeber sind der größte Einstieg, hatten aber keinen Weg zum Konto (Funnel 30.10.2026). */}
          <p className="mb-10 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            Gründest du gerade? Gratis-Tools und Rechner bekommst du mit dem kostenlosen Konto.{" "}
            <Link to="/auth" data-cta="ratgeber-oben" className="whitespace-nowrap font-semibold text-accent-blue hover:underline">
              Kostenlos starten
            </Link>
          </p>
          <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-24
              prose-h2:text-[1.75rem] prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8
              prose-a:text-accent-blue prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-li:my-1
              prose-blockquote:border-accent-blue prose-blockquote:bg-secondary/50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
              prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-img:rounded-xl">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Die Seite traegt ihre H1 schon im Kopf; eine "# …"-Zeile im
                // Artikeltext ergab bisher zwei H1 je Ratgeber.
                h1: ({ node: _node, ...props }) => <h2 {...props} />,
                img: ({ node: _node, ...props }) => <img loading="lazy" decoding="async" {...props} />,
                // Tabellen (remark-gfm) auf dem Handy horizontal scrollbar statt die Seite zu sprengen
                table: ({ node: _node, ...props }) => (
                  <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border">
                    <table className="w-full border-collapse text-sm [&_td]:border-t [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_th]:bg-secondary/60 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold" {...props} />
                  </div>
                ),
              }}
            >
              {ohneTitelzeile(post.body_md)}
            </ReactMarkdown>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {zusammengelegt.map((g) => (
            <section key={g.slug} className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-card md:p-7">
              <h2 className="flex items-start gap-3 text-lg font-semibold tracking-tight">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue">
                  <ListChecks className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-0.5">Schritt für Schritt: {g.title}</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {g.outcome} Aufwand realistisch {g.duration}.
              </p>
              <ol className="mt-4 space-y-2 text-sm">
                {g.schritte.map((schritt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{schritt}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-muted-foreground">
                Die vollständige Anleitung zu allen {g.schritte.length} Schritten – mit Checklisten, Formularen und Direkt-Links zu
                Ämtern und Registern – ist Teil des GründerX-Abos.
              </p>
              <Link to="/preise" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-blue hover:underline">
                Preise & Leistungen <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </section>
          ))}

          {(guides.length > 0 || tools.length > 0) && (
            <div className="mt-14 space-y-6">
              {guides.length > 0 && (
                <div>
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
                    <ListChecks className="h-4 w-4 text-accent-blue" /> Guides, die dich Schritt für Schritt durchführen
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {guides.map((g) => (
                      <Link
                        key={g.slug}
                        to={guideHref(g.slug)}
                        className="press group rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent-blue/40 hover:shadow-card"
                      >
                        <p className="mb-1 flex items-start justify-between gap-2 text-sm font-semibold leading-snug">
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
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
                    <Wrench className="h-4 w-4 text-accent-blue" /> Passende Tools im GründerX-Cockpit
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {tools.map((t) => (
                      <Link
                        key={t.slug}
                        to={`/tools/${t.slug}`}
                        className="press group rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent-blue/40 hover:shadow-card"
                      >
                        <p className="mb-1 flex items-start justify-between gap-2 text-sm font-semibold leading-snug">
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

          <section className="mt-14 rounded-2xl border border-border bg-card p-5 md:p-7">
            <h2 className="text-xl font-semibold tracking-tight">Wie geht es bei dir weiter?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Mit dem kostenlosen Konto hast du Gratis-Tools und Rechner an einem Ort, ohne Kreditkarte. Den vollen
              Zugang mit allen Guides und Felix kannst du danach 7 Tage für 1 € testen, dann{" "}
              {formatEurCents(PLANS.gruenderx.grossCents)} im Monat, monatlich kündbar.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button asChild size="lg" className="h-11 rounded-xl bg-gradient-primary font-semibold">
                <Link to="/auth" data-cta="ratgeber-ende">Kostenlos starten</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-xl font-semibold">
                <Link to="/gratis-tools" data-cta="ratgeber-ende-tools">Gratis-Tools testen</Link>
              </Button>
            </div>
          </section>

          <NewsletterOptin quelle="ratgeber" />

          {weitere === null ? (
            <p className="mt-14 text-sm text-muted-foreground" data-prerender-pending>
              Weitere Ratgeber werden geladen …
            </p>
          ) : weitere.length > 0 ? (
            <div className="mt-14">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
                <BookOpen className="h-4 w-4 text-accent-blue" /> Weitere Ratgeber
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {weitere.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/ratgeber/${a.slug}`}
                    className="press group rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent-blue/40 hover:shadow-card"
                  >
                    <p className="mb-1 text-sm font-semibold leading-snug">{a.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{a.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-14 flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-5 md:p-6">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Erstellt von der GründerX-Redaktion mit KI-Unterstützung ({post.author}), Stand{" "}
              {datumDe(post.updated_at || post.published_at)}. Verantwortlich für den Inhalt:{" "}
              <Link to="/impressum" className="font-semibold text-foreground hover:underline">Sonni Buttke</Link>, Gründer von
              GründerX. Keine Steuer- oder Rechtsberatung – im Einzelfall Steuerberater fragen.
            </p>
          </div>
        </div>
      </article>
    </PublicShell>
  );
};

export default RatgeberPost;
