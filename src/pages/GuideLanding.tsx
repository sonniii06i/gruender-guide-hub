import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { LandingPage, type LandingFaq } from "@/components/landing/LandingPage";
import { findGuideLanding, relatedGuides } from "@/data/guides";
import { getGuideCopy } from "@/data/landingCopy";

const SITE = "https://gruenderx.de";

/**
 * Öffentliche Marketing-Landing pro Guide (/guides/:slug).
 * Crawlbar (Pitch/Upsell) — der eigentliche Schritt-für-Schritt-Inhalt liegt
 * hinter der Paywall (/playbooks). SEO-Top-of-Funnel.
 */
const GuideLanding = () => {
  const { slug = "" } = useParams();
  const guide = findGuideLanding(slug);

  if (!guide) {
    return (
      <div className="min-h-screen bg-background">
        <Seo title="Guide nicht gefunden | GründerX" description="Dieser Guide existiert nicht." path={`/guides/${slug}`} noindex />
        <Navbar />
        <main className="container max-w-2xl py-24 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Guide nicht gefunden</h1>
          <p className="text-muted-foreground mb-6">Diese Seite existiert nicht (mehr).</p>
          <Link to="/guides"><Button className="rounded-full">Alle Guides ansehen</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  const copy = getGuideCopy(slug, {
    slug,
    title: guide.title,
    tagline: guide.tagline,
    outcome: guide.outcome,
    duration: guide.duration,
    difficulty: guide.difficulty,
    steps: guide.steps,
  });
  const related = relatedGuides(slug);

  // Sichtbarer Ablauf-Umriss: alle Schritt-Titel, aber Beschreibung nur als
  // Content-Sample für die ersten Schritte. Checklisten, Formulare, Ämter-Links,
  // Warnungen und Kosten-Tipps werden NICHT gerendert → bleiben hinter der Paywall.
  const SAMPLE = 3;
  const outline = {
    heading: `Ablauf in ${guide.steps} Schritten`,
    steps: guide.outline.map((s, i) => ({
      title: s.title,
      description: i < SAMPLE ? s.description : undefined,
      meta: i < SAMPLE ? `ca. ${s.estMinutes} Min${s.estCost ? ` · ${s.estCost}` : ""}` : `ca. ${s.estMinutes} Min`,
    })),
    gateNote:
      "Die ersten Schritte siehst du hier als Vorschau. Die vollständige Anleitung — mit Checklisten, ausfüllbaren Formularen, Direkt-Links zu Ämtern & Registern, Warnungen vor teuren Fehlern und Kosten-Tipps — schaltest du im GründerX-Cockpit frei.",
  };

  const faq: LandingFaq[] = [
    { q: `Was bringt mir der Guide „${guide.title}"?`, a: `${guide.outcome} Du wirst in ${guide.steps} Schritten begleitet — Aufwand ca. ${guide.duration}, Schwierigkeit: ${guide.difficulty}.` },
    {
      q: `Wie lange dauert „${guide.title}"?`,
      a: `Realistisch ${guide.duration}.${guide.totalCost ? ` Setup-Kosten: ${guide.totalCost}.` : ""}${guide.runningCost ? ` Laufend: ${guide.runningCost}.` : ""}`,
    },
    {
      q: `Was kostet der Guide?`,
      a: `Der Guide ist Teil des GründerX-Abos — inklusive aller weiteren Guides, Rechner und Wizards. Plan wählen und sofort starten.`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: guide.title,
      description: copy.seoDescription,
      totalTime: guide.duration,
      url: `${SITE}/guides/${guide.slug}`,
      step: guide.outline.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        ...(i < SAMPLE ? { text: s.description } : {}),
      })),
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
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides` },
        { "@type": "ListItem", position: 3, name: guide.title, item: `${SITE}/guides/${guide.slug}` },
      ],
    },
  ];

  return (
    <LandingPage
      seoTitle={copy.seoTitle}
      seoDescription={copy.seoDescription}
      path={`/guides/${guide.slug}`}
      jsonLd={jsonLd}
      crumbs={[{ label: "Start", to: "/" }, { label: "Guides", to: "/guides" }, { label: guide.title }]}
      eyebrow={`Schritt-für-Schritt · ${guide.duration} · ${guide.difficulty}`}
      heading={guide.title}
      lead={copy.lead}
      urgency={copy.urgency}
      outcomes={copy.outcomes}
      outline={outline}
      disclaimer={copy.disclaimer}
      faq={faq}
      ctaTitle={`„${guide.title}" Schritt für Schritt im GründerX-Cockpit`}
      ctaText={`${guide.steps} Schritte in der richtigen Reihenfolge — plus alle weiteren Guides, Rechner und Wizards im Abo.`}
      primaryHref="/checkout"
      primaryLabel="Plan wählen & starten"
      secondaryHref="/playbooks"
      secondaryLabel="Alle Guides"
      relatedTitle="Passende Guides"
      related={related.map((r) => ({ to: `/guides/${r.slug}`, title: r.title, desc: r.tagline }))}
    />
  );
};

export default GuideLanding;
