import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { LandingPage, type LandingFaq } from "@/components/landing/LandingPage";
import { findLandingTool, relatedLandingTools } from "@/data/features";
import { getToolCopy } from "@/data/landingCopy";

const SITE = "https://gruenderx.de";

/**
 * Öffentliche Marketing-Landing pro Cockpit-Tool (/tools/:slug).
 * Zeigt KEINEN Bezahl-Inhalt — nur Pitch, Ergebnis, Disclaimer, FAQ und CTA
 * in die Paywall. Crawlbar → SEO-Top-of-Funnel.
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

  const cat = tool.categoryTitle.replace(/^[^\wÄÖÜäöü]+/, "").trim();
  const copy = getToolCopy(slug, {
    slug,
    title: tool.title,
    desc: tool.desc,
    categoryTitle: tool.categoryTitle,
    categoryTagline: tool.categoryTagline,
  });
  const related = relatedLandingTools(slug);

  const faq: LandingFaq[] = [
    { q: `Was ist „${tool.title}"?`, a: `${tool.desc} Teil von ${cat} im GründerX-Cockpit.` },
    {
      q: `Für wen ist „${tool.title}" gedacht?`,
      a: `${tool.categoryTagline} — gebaut für deutsche Gründer, E-Commerce-Brands, Creator und Solo-Selbstständige, die ohne teuren Berater starten wollen.`,
    },
    {
      q: `Was kostet die Nutzung?`,
      a: `Das Tool ist Teil des GründerX-Abos mit Zugriff auf alle Rechner, Wizards und Schritt-für-Schritt-Guides. Plan wählen und sofort loslegen.`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.title,
      description: copy.seoDescription,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${SITE}/tools/${tool.slug}`,
      offers: { "@type": "Offer", category: "subscription", priceCurrency: "EUR" },
      provider: { "@type": "Organization", name: "GründerX", url: SITE },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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
    <LandingPage
      seoTitle={copy.seoTitle}
      seoDescription={copy.seoDescription}
      path={`/tools/${tool.slug}`}
      jsonLd={jsonLd}
      crumbs={[{ label: "Start", to: "/" }, { label: "Tools", to: "/tools" }, { label: tool.title }]}
      eyebrow={cat}
      heading={tool.title}
      lead={copy.lead}
      urgency={copy.urgency}
      outcomes={copy.outcomes}
      disclaimer={copy.disclaimer}
      faq={faq}
      ctaTitle={`„${tool.title}" im GründerX-Cockpit freischalten`}
      ctaText="Mit einem aktiven Abo nutzt du dieses Tool plus über 70 weitere Rechner, Wizards und Schritt-für-Schritt-Guides."
      primaryHref="/checkout"
      primaryLabel="Plan wählen & starten"
      secondaryHref={tool.route!}
      secondaryLabel="Tool öffnen"
      relatedTitle="Passende Tools"
      related={related.map((r) => ({ to: `/tools/${r.slug}`, title: r.title, desc: r.desc }))}
    />
  );
};

export default ToolLanding;
