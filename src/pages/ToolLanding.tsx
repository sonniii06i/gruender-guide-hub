import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { LandingPage, type LandingFaq } from "@/components/landing/LandingPage";
import { findLandingTool, relatedLandingTools } from "@/data/features";
import { toolDaten } from "@/lib/landingDaten";
import { RATGEBER_VORRANG, relatedGuidesFor } from "@/lib/internalLinks";
import { RelatedArticles } from "@/components/landing/RelatedArticles";
import { LexikonVerweise } from "@/components/lexikon/LexikonVerweise";
import { Gift, ArrowRight } from "lucide-react";
import { TRIAL_TOOL_BY_SLUG, TRIAL_CLAIM } from "@/lib/freetools/trialTools";
import { PRO_MONTH_GROSS_CENTS, formatEurCents, schemaPrice } from "@/config/pricing";
import { guideHref } from "@/data/guideMerges";
import { screenFuerTool } from "@/data/screenshots";
import { NewsletterOptin } from "@/components/NewsletterOptin";
import { ToolTrialProvider } from "@/components/freetools/ToolTrial";

// Freie Tools (trialTools.frei, 11.11.2026): das Tool selbst steht direkt auf der Landing – Google bevorzugt bei
// Rechner-Suchen Seiten, auf denen man sofort rechnen kann. Dazu der Einbettcode (Linkköder, Top-1-Programm).
const FREIE_TOOLS: Record<string, LazyExoticComponent<ComponentType<{ rahmen?: boolean }>>> = {
  "lucid-wizard": lazy(() => import("./LucidWizard.tsx")),
};
const EINBETTCODE: Record<string, string> = {
  "lucid-wizard":
    '<iframe src="https://gruenderx.de/einbetten/verpackungslizenz-rechner" title="Verpackungslizenz-Rechner" width="100%" height="900" style="border:0;max-width:900px" loading="lazy"></iframe>\n' +
    '<p style="font-size:12px">Verpackungslizenz-Rechner von <a href="https://gruenderx.de/tools/lucid-wizard">GründerX</a></p>',
};

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
  // Verkaufstext nur dieses Tools laden statt der Texte aller Tools und Guides.
  const daten = tool ? toolDaten(slug) : null;

  if (!tool || !daten) {
    return (
      <div className="min-h-screen bg-background">
        <Seo title="Tool nicht gefunden | GründerX" description="Dieses Tool existiert nicht." path={`/tools/${slug}`} noindex />
        <Navbar />
        <main className="container max-w-xl px-4 pb-24 pt-36 text-center">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight">Tool nicht gefunden</h1>
          <p className="mb-7 text-muted-foreground">Diese Seite existiert nicht (mehr).</p>
          <Button asChild size="lg" className="h-11 rounded-xl bg-gradient-primary font-semibold"><Link to="/tools">Alle Tools ansehen</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  const cat = tool.categoryTitle.replace(/^[^\wÄÖÜäöü]+/, "").trim();
  const { copy } = daten;
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
      screenshot={trial?.frei ? undefined : screenFuerTool(tool.slug, tool.categorySlug)}  // freie Tools: echter Rechner statt Bild
      topSlot={
        trial && trial.frei && FREIE_TOOLS[trial.slug] ? (
          <FreiesTool slug={trial.slug} tool={trial} />
        ) : trial ? (
          <section className="flex flex-col gap-4 rounded-2xl border border-brand-green/25 bg-brand-green-soft p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
            <div className="flex items-start gap-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-card text-brand-green shadow-card">
                <Gift className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold">{TRIAL_CLAIM}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Kein Konto, keine Zahlung: Du nutzt „{tool.title}" einmal kostenlos und bekommst das Ergebnis gegen
                  deine E-Mail-Adresse. Danach geht es mit dem GründerX-Abo unbegrenzt weiter.
                </p>
              </div>
            </div>
            <Button asChild size="lg" className="h-11 shrink-0 gap-2 rounded-xl bg-gradient-primary font-semibold hover:opacity-95">
              <Link to={trial.trialPath}>
                Kostenlos prüfen <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </section>
        ) : undefined
      }
      ctaTitle={trial?.frei ? "Alle weiteren Gründungs-Tools im GründerX-Cockpit" : `„${tool.title}" unbegrenzt im GründerX-Cockpit`}
      ctaText={`Mit dem Abo ab ${formatEurCents(PRO_MONTH_GROSS_CENTS)} im Monat (inkl. USt.) nutzt du dieses Tool und alle anderen Rechner, Wizards und Schritt-für-Schritt-Guides aus der Tool-Übersicht.`}
      primaryHref={trial ? trial.trialPath : "/preise"}
      primaryLabel={trial ? (trial.frei ? "Kostenlos rechnen" : "Kostenlos prüfen") : "Preise & Leistungen"}
      secondaryHref={trial ? "/preise" : tool.route!}
      secondaryLabel={trial ? "Preise & Leistungen" : "Tool öffnen"}
      relatedTitle="Passende Tools"
      related={related.map((r) => ({ to: `/tools/${r.slug}`, title: r.title, desc: r.desc }))}
      relatedGroups={[
        {
          title: "Passende Schritt-für-Schritt-Guides",
          items: relatedGuides.map((r) => ({ to: guideHref(r.slug), title: r.title, desc: r.desc })),
        },
      ]}
      bottomSlot={
        <>
          <NewsletterOptin
            quelle={`tool:${tool.slug}`}
            titel="Fristen & Änderungen, die dich betreffen"
            text="Wir melden uns kurz, bevor eine Steuerfrist abläuft oder sich für Gründer etwas ändert (z. B. neue Pflichten, Förderungen, Gebühren) – höchstens zwei Mails pro Woche, meist seltener."
          />
          <LexikonVerweise pfad={`/tools/${tool.slug}`} className="mb-12" />
          <RelatedArticles context={matchCtx} vorrang={RATGEBER_VORRANG[slug]} />
        </>
      }
    />
  );
};

function FreiesTool({ slug, tool }: { slug: string; tool: NonNullable<(typeof TRIAL_TOOL_BY_SLUG)[string]> }) {
  const Werkzeug = FREIE_TOOLS[slug];
  const code = EINBETTCODE[slug];
  return (
    <section id="rechner" className="rounded-2xl border border-border bg-card p-4 shadow-card md:p-6">
      <div className="mb-4 flex items-start gap-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green">
          <Gift className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl font-semibold">Jetzt rechnen: kostenlos und ohne Anmeldung</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Kein Konto, keine E-Mail, so oft du willst. Die Rechnung läuft komplett in deinem Browser.
          </p>
        </div>
      </div>
      <ToolTrialProvider tool={tool} ohneHinweis>
        <Suspense fallback={<div className="h-72 animate-pulse rounded-xl bg-secondary" aria-hidden="true" />}>
          <Werkzeug rahmen={false} />
        </Suspense>
      </ToolTrialProvider>
      {code && (
        <details className="mt-6 rounded-xl border border-border bg-background p-4 text-sm" id="einbinden">
          <summary className="cursor-pointer font-semibold">Rechner auf deiner Website einbinden</summary>
          <p className="mt-2 text-muted-foreground">
            Kostenlos für Blogs, Beratungen und Shop-Ratgeber. Der eingebettete Rechner lädt keine Cookies, kein Tracking
            und keine Werbung und rechnet mit denselben Tarifen wie hier.
          </p>
          <textarea
            readOnly
            rows={4}
            value={code}
            aria-label="Code zum Einbinden"
            onFocus={(e) => e.currentTarget.select()}
            className="mt-3 w-full rounded-lg border border-border bg-card p-2 font-mono text-xs"
          />
        </details>
      )}
    </section>
  );
}

export default ToolLanding;
