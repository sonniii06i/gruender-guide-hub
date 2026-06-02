import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Check, Lock } from "lucide-react";
import { findLandingTool, relatedLandingTools } from "@/data/features";

const SITE = "https://gruenderx.de";

/**
 * Öffentliche Marketing-Landing-Page pro Cockpit-Tool (/tools/:slug).
 * Zeigt KEINEN Bezahl-Inhalt — nur Beschreibung, Einsatzzweck, FAQ und CTA
 * ins Abo. Crawlbar (außerhalb der Paywall) → SEO-Top-of-Funnel.
 */
const ToolLanding = () => {
  const { slug = "" } = useParams();
  const tool = findLandingTool(slug);

  if (!tool) {
    return (
      <div className="min-h-screen bg-background">
        <Seo title="Tool nicht gefunden | GründerX" description="Dieses Tool existiert nicht." path={`/tools/${slug}`} noindex />
        <Navbar />
        <main className="container max-w-2xl py-24 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Tool nicht gefunden</h1>
          <p className="text-muted-foreground mb-6">Diese Seite existiert nicht (mehr).</p>
          <Link to="/tools"><Button className="rounded-full">Alle Tools ansehen</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  const related = relatedLandingTools(slug);
  const metaTitle = `${tool.title} – Tool für Gründer 2026 | GründerX`;
  const lead = tool.desc;

  // Honest, keyword-orientierte FAQ aus den vorhandenen Tool-Daten abgeleitet.
  const faq: { q: string; a: string }[] = [
    {
      q: `Was ist „${tool.title}"?`,
      a: `${tool.desc} Teil von ${tool.categoryTitle.replace(/^[^\wÄÖÜäöü]+/, "").trim()} im GründerX-Cockpit.`,
    },
    {
      q: `Für wen ist „${tool.title}" gedacht?`,
      a: `${tool.categoryTagline} — gebaut für deutsche Gründer, E-Commerce-Brands, Creator und Solo-Selbstständige, die ohne teuren Berater starten wollen.`,
    },
    {
      q: `Was kostet die Nutzung?`,
      a: `Das Tool ist Teil des GründerX-Abos, das dir Zugriff auf alle Rechner, Wizards und Schritt-für-Schritt-Guides gibt. Plan wählen und sofort loslegen.`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.title,
      description: tool.desc,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${SITE}/tools/${tool.slug}`,
      offers: { "@type": "Offer", category: "subscription", priceCurrency: "EUR" },
      provider: { "@type": "Organization", name: "GründerX", url: SITE },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
        { "@type": "ListItem", position: 3, name: tool.title, item: `${SITE}/tools/${tool.slug}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo title={metaTitle} description={lead} path={`/tools/${tool.slug}`} type="website" jsonLd={jsonLd} />
      <Navbar />
      <main className="container max-w-3xl py-12 md:py-16 px-4">
        {/* Breadcrumb (sichtbar) */}
        <nav className="text-xs text-muted-foreground mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Start</Link>
          <span>/</span>
          <Link to="/tools" className="hover:text-foreground">Tools</Link>
          <span>/</span>
          <span className="text-foreground">{tool.title}</span>
        </nav>

        <header className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent-blue mb-2">
            {tool.categoryTitle.replace(/^[^\wÄÖÜäöü]+/, "").trim()}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{tool.title}</h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{lead}</p>
        </header>

        {/* Primärer CTA */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-7 shadow-card mb-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">„{tool.title}" im GründerX-Cockpit freischalten</h2>
              <p className="text-sm text-muted-foreground">
                Mit einem aktiven Abo nutzt du dieses Tool plus über 70 weitere Rechner, Wizards und Schritt-für-Schritt-Guides.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/checkout">
              <Button size="lg" className="rounded-full gap-2 bg-gradient-primary hover:opacity-95">
                <Sparkles className="h-4 w-4" /> Plan wählen
              </Button>
            </Link>
            <Link to={tool.route!}>
              <Button size="lg" variant="ghost" className="rounded-full gap-1">
                Tool öffnen <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-5">Häufige Fragen</h2>
          <div className="space-y-5">
            {faq.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold mb-1.5 flex items-start gap-2">
                  <Check className="h-4 w-4 mt-1 text-accent-blue shrink-0" /> {f.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Verwandte Tools (interne Verlinkung) */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-5">Passende Tools</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/tools/${r.slug}`}
                  className="rounded-xl border border-border bg-card p-4 hover:border-accent-blue/50 transition-colors"
                >
                  <p className="font-medium text-sm mb-1">{r.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{r.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ToolLanding;
