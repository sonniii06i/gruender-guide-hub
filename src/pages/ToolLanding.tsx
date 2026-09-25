import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { LandingPage, type LandingFaq } from "@/components/landing/LandingPage";
import { findLandingTool, relatedLandingTools } from "@/data/features";
import { getToolCopy } from "@/data/landingCopy";
import { relatedGuidesFor } from "@/lib/internalLinks";
import { RelatedArticles } from "@/components/landing/RelatedArticles";
import { Gift, ArrowRight } from "lucide-react";
import { TRIAL_TOOL_BY_SLUG, TRIAL_CLAIM } from "@/lib/freetools/trialTools";
import { PRO_MONTH_GROSS_CENTS, formatEurCents, schemaPrice } from "@/config/pricing";
import { guideHref } from "@/data/guideMerges";

const TOOL_CAT_TOPIC: Record<string, string> = {
  starter: "gruendung", rechtsform: "gruendung", steuer: "steuern", buchhaltung: "buchhaltung",
  marken: "marken", launch: "ecommerce", international: "international", anbieter: "banking",
};

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
  const topic = TOOL_CAT_TOPIC[tool.categorySlug];
  const matchCtx = { text: `${tool.title} ${tool.desc}`, topic };
  const relatedGuides = relatedGuidesFor(matchCtx, 4);
  // WEEE-Check, Brand-Check, LUCID-Wizard: eine kostenlose Prüfung ohne Konto.
  const trial = TRIAL_TOOL_BY_SLUG[slug];

  const faq: LandingFaq[] = [
    { q: `Was ist „${tool.title}"?`, a: `${tool.desc} Teil von ${cat} im GründerX-Cockpit.` },
    {
      q: `Für wen ist „${tool.title}" gedacht?`,
      a: `${tool.categoryTagline} — gebaut für deutsche Gründer, E-Commerce-Brands, Creator und Solo-Selbstständige, die ohne teuren Berater starten wollen.`,
    },
    {
      q: `Was kostet die Nutzung?`,
      a: trial
        ? `Eine Prüfung ist kostenlos: Du brauchst kein Konto, das Ergebnis gibt es gegen deine E-Mail-Adresse. Unbegrenzt nutzt du „${tool.title}" mit dem GründerX-Abo ab ${formatEurCents(PRO_MONTH_GROSS_CENTS)} im Monat inkl. USt., zusammen mit allen anderen Rechnern, Wizards und Guides.`
        : `Das Tool ist Teil des GründerX-Abos ab ${formatEurCents(PRO_MONTH_GROSS_CENTS)} im Monat inkl. USt., mit Zugriff auf alle Rechner, Wizards und Schritt-für-Schritt-Guides. Alle Preise stehen auf gruenderx.de/preise.`,
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
      offers: {
        "@type": "Offer",
        category: "subscription",
        price: schemaPrice(PRO_MONTH_GROSS_CENTS),
        priceCurrency: "EUR",
        url: `${SITE}/preise`,
      },
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
      topSlot={
        trial ? (
          <section className="rounded-2xl border border-border bg-card p-6 md:p-7 shadow-card mb-8">
            <p className="flex items-center gap-2 text-sm font-semibold text-accent-blue">
              <Gift className="h-4 w-4" /> {TRIAL_CLAIM}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Kein Konto, keine Zahlung: Du nutzt „{tool.title}" einmal kostenlos und bekommst das Ergebnis gegen
              deine E-Mail-Adresse. Danach geht es mit dem GründerX-Abo unbegrenzt weiter.
            </p>
            <Link to={trial.trialPath} className="mt-4 inline-block">
              <Button size="lg" className="rounded-full gap-2 bg-gradient-primary hover:opacity-95">
                Kostenlos prüfen <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </section>
        ) : undefined
      }
      ctaTitle={`„${tool.title}" unbegrenzt im GründerX-Cockpit`}
      ctaText={`Mit dem Abo ab ${formatEurCents(PRO_MONTH_GROSS_CENTS)} im Monat (inkl. USt.) nutzt du dieses Tool und alle anderen Rechner, Wizards und Schritt-für-Schritt-Guides aus der Tool-Übersicht.`}
      primaryHref="/preise"
      primaryLabel="Preise & Leistungen"
      secondaryHref={trial ? trial.trialPath : tool.route!}
      secondaryLabel={trial ? TRIAL_CLAIM : "Tool öffnen"}
      relatedTitle="Passende Tools"
      related={related.map((r) => ({ to: `/tools/${r.slug}`, title: r.title, desc: r.desc }))}
      relatedGroups={[
        {
          title: "Passende Schritt-für-Schritt-Guides",
          items: relatedGuides.map((r) => ({ to: guideHref(r.slug), title: r.title, desc: r.desc })),
        },
      ]}
      bottomSlot={<RelatedArticles context={matchCtx} />}
    />
  );
};

export default ToolLanding;
