import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { LandingPage, type LandingFaq } from "@/components/landing/LandingPage";
import { getCourseTheme } from "@/components/CourseCoverCard";
import { guideDaten } from "@/lib/landingDaten";
import { relatedToolsFor } from "@/lib/internalLinks";
import { RelatedArticles } from "@/components/landing/RelatedArticles";
import { LexikonVerweise } from "@/components/lexikon/LexikonVerweise";
import { guideHref, isMergedGuide } from "@/data/guideMerges";
import { SCREENS } from "@/data/screenshots";
import SchwesterTipp from "@/components/SchwesterTipp";
import { ChevronDown, Clock, ListChecks, Lock, Wrench, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const SITE = "https://gruenderx.de";

/**
 * Öffentliche Marketing-Landing pro Guide (/guides/:slug).
 * Crawlbar (Pitch/Upsell) — der eigentliche Schritt-für-Schritt-Inhalt liegt
 * hinter der Paywall (/playbooks). SEO-Top-of-Funnel.
 */
const GuideLanding = () => {
  const { slug = "" } = useParams();
  const [openStep, setOpenStep] = useState<number>(0);
  // Nur die Datei dieses Guides (Texte + Umriss + verwandte), nicht alle 80 Playbooks.
  const daten = isMergedGuide(slug) ? null : guideDaten(slug);
  const guide = daten?.guide;

  // Zusammengelegt: Server leitet per 301 (vercel.json), clientseitige
  // Navigation landet hier und springt ebenfalls zum Ratgeber.
  if (isMergedGuide(slug)) return <Navigate to={guideHref(slug)} replace />;

  if (!daten || !guide) {
    return (
      <div className="min-h-screen bg-background">
        <Seo title="Guide nicht gefunden | GründerX" description="Dieser Guide existiert nicht." path={`/guides/${slug}`} noindex />
        <Navbar />
        <main className="container max-w-xl px-4 pb-24 pt-36 text-center">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight">Guide nicht gefunden</h1>
          <p className="mb-7 text-muted-foreground">Diese Seite existiert nicht (mehr).</p>
          <Button asChild size="lg" className="h-11 rounded-xl bg-gradient-primary font-semibold"><Link to="/guides">Alle Guides ansehen</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  const { copy, related } = daten;
  const matchCtx = { text: `${guide.title} ${guide.tagline} ${guide.outcome}` };
  const relatedTools = relatedToolsFor(matchCtx, 4);

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
      "Die ersten Schritte siehst du hier als Vorschau. Im GründerX Lern-Studio schaltest du alle Checklisten, direkten Arbeitsfenster, Kurz-Checks (+25 XP), Links zu Ämtern und Praxishinweise frei.",
  };

  const faq: LandingFaq[] = [
    { q: `Was bringt mir der Guide „${guide.title}"?`, a: `${guide.outcome} Du wirst in ${guide.steps} Schritten begleitet (Aufwand ca. ${guide.duration}, Schwierigkeit: ${guide.difficulty}).` },
    {
      q: `Wie lange dauert „${guide.title}"?`,
      a: `Realistisch ${guide.duration}.${guide.totalCost ? ` Setup-Kosten: ${guide.totalCost}.` : ""}${guide.runningCost ? ` Laufend: ${guide.runningCost}.` : ""}`,
    },
    {
      q: `Was kostet der Guide?`,
      a: `Der Guide ist Teil des GründerX-Abos inklusive aller weiteren Guides, Arbeitsfenster, Rechner und Wizards. Plan wählen und sofort starten.`,
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
      screenshot={slug === "tiktok-shop-starten" ? SCREENS.guideTiktok : SCREENS.dashboard}
      heroRight={(() => {
        const theme = getCourseTheme(guide.slug, guide.title);
        const ThemeIcon = theme.icon;
        const previewSteps = guide.outline.slice(0, 4);
        return (
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <div className={cn("flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5", theme.bandBg)}>
              <span className="inline-flex items-center gap-2">
                <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg", theme.iconBg, theme.iconText)}>
                  <ThemeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className={cn("text-xs font-semibold", theme.pillText)}>{theme.label}</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-0.5 text-xs font-semibold text-brand-green ring-1 ring-border tabular">
                <Zap className="h-3 w-3" aria-hidden="true" /> +{guide.steps * 100} XP
              </span>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-2 text-xs text-foreground/85">
                <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 font-medium tabular">
                  <ListChecks className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {guide.steps} Schritte
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 font-medium">
                  <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {guide.duration}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-green-soft px-2.5 py-1 font-semibold text-brand-green">
                  <Wrench className="h-3.5 w-3.5" aria-hidden="true" /> Arbeitsfenster
                </span>
              </div>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Lehrplan-Vorschau (klicken zum Aufklappen)
              </p>
              <div className="mt-2.5 space-y-2">
                {previewSteps.map((st, idx) => {
                  const isSample = idx < SAMPLE;
                  const expanded = openStep === idx;
                  return (
                    <button
                      key={st.title}
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpenStep(expanded ? -1 : idx)}
                      className={cn(
                        "w-full rounded-xl border p-3 text-left transition-colors",
                        expanded
                          ? "border-primary/40 bg-[#F4F7FC]"
                          : "border-border bg-white hover:border-primary/30 hover:bg-secondary/40",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold tabular",
                            isSample ? "bg-primary text-white" : "bg-secondary text-muted-foreground",
                          )}
                        >
                          {idx + 1}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-xs font-semibold text-foreground sm:text-[13px]">
                          {st.title}
                        </span>
                        {!isSample ? (
                          <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                        ) : (
                          <ChevronDown
                            className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", expanded && "rotate-180")}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      {expanded && (
                        <p className="mt-2 pl-8 text-xs leading-relaxed text-muted-foreground">
                          {isSample
                            ? st.description
                            : "Checkliste, Eingabe-Arbeitsfenster und Praxishinweise stehen im GründerX-Cockpit bereit."}
                        </p>
                      )}
                    </button>
                  );
                })}
                {guide.steps > 4 && (
                  <p className="pt-1 text-center text-xs text-muted-foreground tabular">
                    + {guide.steps - 4} weitere Schritte im vollständigen Kurs
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })()}
      ctaTitle={`„${guide.title}" Schritt für Schritt im GründerX Lern-Studio`}
      ctaText={`${guide.steps} Schritte in der richtigen Reihenfolge mit direkten Arbeitsfenstern, plus alle weiteren Guides, Rechner und Wizards im Abo.`}
      primaryHref="/preise"
      primaryLabel="Plan wählen & starten"
      secondaryHref="/playbooks"
      secondaryLabel="Alle Guides"
      relatedTitle="Passende Guides"
      related={related.map((r) => ({ to: guideHref(r.slug), title: r.title, desc: r.tagline }))}
      relatedGroups={[
        {
          title: "Passende Tools",
          items: relatedTools.map((r) => ({ to: `/tools/${r.slug}`, title: r.title, desc: r.desc })),
        },
      ]}
      bottomSlot={
        <>
          <SchwesterTipp slug={guide.slug} />
          <LexikonVerweise pfad={`/guides/${guide.slug}`} className="mb-12" />
          <RelatedArticles context={matchCtx} />
        </>
      }
    />
  );
};

export default GuideLanding;
