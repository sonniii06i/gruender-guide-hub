import { Link, Navigate } from "react-router-dom";
import { ArrowRight, Gift } from "lucide-react";
import { LandingPage } from "@/components/landing/LandingPage";
import { RelatedArticles } from "@/components/landing/RelatedArticles";
import { findZielgruppe } from "@/data/zielgruppen";

const SITE = "https://gruenderx.de";

/**
 * Zielgruppen-Landing (/influencer, /tiktok-shop): Pitch + kostenlose Tools als
 * Einstieg, Ablauf-Umriss, passende Cockpit-Tools, Ratgeber und Guides.
 */
const ZielgruppeLanding = ({ slug }: { slug: string }) => {
  const z = findZielgruppe(slug);
  if (!z) return <Navigate to="/" replace />;
  const url = `${SITE}/${z.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: z.heading,
      description: z.seoDescription,
      url,
      audience: { "@type": "Audience", audienceType: z.eyebrow.replace(/^Für /, "") },
      citation: z.quellen.map((q) => q.url),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: z.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE },
        { "@type": "ListItem", position: 2, name: z.heading, item: url },
      ],
    },
  ];

  const gratis = (
    <section aria-labelledby="gratis-start">
      <h2 id="gratis-start" className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
        <Gift className="h-5 w-5 text-accent-blue" aria-hidden="true" /> Kostenlos starten – ohne Konto
      </h2>
      <ul className="grid gap-3 sm:grid-cols-3">
        {z.freeTools.map((t) => (
          <li key={t.to}>
            <Link
              to={t.to}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 shadow-card transition-colors hover:border-accent-blue/40"
            >
              <span className="text-sm font-semibold text-foreground">{t.title}</span>
              <span className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{t.desc}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent-blue">
                Gratis nutzen <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );

  const quellen = (
    <section className="mt-12">
      <h2 className="mb-3 text-base font-semibold">Quellen</h2>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {z.quellen.map((q) => (
          <li key={q.url}>
            <a href={q.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
              {q.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <LandingPage
      seoTitle={z.seoTitle}
      seoDescription={z.seoDescription}
      path={`/${z.slug}`}
      jsonLd={jsonLd}
      crumbs={[{ label: "Start", to: "/" }, { label: z.eyebrow.replace(/^Für /, "").split(" · ")[0] }]}
      eyebrow={z.eyebrow}
      heading={z.heading}
      lead={z.lead}
      urgency={z.urgency}
      outcomes={z.outcomes}
      outline={{
        heading: z.wegHeading,
        steps: z.weg,
        gateNote: "Die vollständigen Schritte mit Checklisten, ausfüllbaren Formularen und Direkt-Links zu Ämtern schaltest du im GründerX-Cockpit frei.",
      }}
      disclaimer="GründerX ist ein digitales Gründer-Tool und ersetzt keine individuelle Steuer- oder Rechtsberatung. Alle Angaben sind mit Quellen belegt (Stand Oktober 2026)."
      faq={z.faq}
      ctaTitle={z.ctaTitle}
      ctaText={z.ctaText}
      primaryHref="/checkout"
      primaryLabel="Plan wählen & starten"
      secondaryHref={z.freeTools[0].to}
      secondaryLabel={`Gratis: ${z.freeTools[0].title}`}
      relatedGroups={[
        { title: "Passende Tools im Cockpit", items: z.tools.map((t) => ({ to: `/tools/${t.slug}`, title: t.title, desc: t.desc })) },
        { title: "Ratgeber", items: z.ratgeber },
        { title: "Guides & Vorlagen", items: z.guides },
      ]}
      topSlot={gratis}
      bottomSlot={
        <>
          <RelatedArticles context={{ text: `${z.heading} ${z.lead}` }} />
          {quellen}
        </>
      }
    />
  );
};

export default ZielgruppeLanding;
