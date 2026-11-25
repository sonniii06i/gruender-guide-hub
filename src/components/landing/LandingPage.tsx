import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { FaqList } from "@/components/public/PublicBlocks";
import { ArrowRight, ArrowUpRight, Check, Lock, Sparkles } from "lucide-react";
import { FinalCta, HeroCentered, ScreenshotFrame, SectionHead, StepsPath } from "@/components/marketing/Marketing";
import type { Screenshot } from "@/data/screenshots";
import { GUIDE_COUNT, TOOL_COUNT } from "@/data/kennzahlen";

export interface LandingFaq {
  q: string;
  a: string;
}

export interface OutlineStep {
  title: string;
  description?: string;
  meta?: string;
}

export interface LandingOutline {
  heading: string;
  steps: OutlineStep[];
  gateNote: string;
}

export interface RelatedLink {
  to: string;
  title: string;
  desc: string;
}

export interface LandingPageProps {
  seoTitle: string;
  seoDescription: string;
  path: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  crumbs: { label: string; to?: string }[];
  eyebrow: string;
  heading: string;
  lead: string;
  urgency: string;
  outcomes: string[];
  outline?: LandingOutline;
  disclaimer: string;
  faq: LandingFaq[];
  ctaTitle: string;
  ctaText: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  relatedTitle?: string;
  related?: RelatedLink[];
  relatedGroups?: { title: string; items: RelatedLink[] }[];
  bottomSlot?: React.ReactNode;
  topSlot?: React.ReactNode;
  screenshot?: Screenshot;
}

/**
 * Gemeinsame öffentliche Landingpage für alle Guides (/guides/:slug) und Tools (/tools/:slug).
 * Rebuild 11/2026: klares Lern-Studio-Design, Check-Karten, Quiz-Einstieg, vollständiges HTML für SEO & KI-Suche.
 */
export const LandingPage = (p: LandingPageProps) => {
  const groups = [
    ...(p.related && p.related.length > 0 ? [{ title: p.relatedTitle ?? "Passend dazu", items: p.related }] : []),
    ...(p.relatedGroups ?? []).filter((g) => g.items.length > 0),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo title={p.seoTitle} description={p.seoDescription} path={p.path} type="website" jsonLd={p.jsonLd} />
      <Navbar />
      <main id="inhalt">
        <HeroCentered
          crumbs={p.crumbs}
          eyebrow={p.eyebrow}
          title={p.heading}
          lead={p.lead}
          primary={{ to: p.primaryHref, label: p.primaryLabel }}
          secondary={p.secondaryHref ? { to: p.secondaryHref, label: p.secondaryLabel ?? "Mehr erfahren" } : undefined}
          trust={["Monatlich kündbar", `${GUIDE_COUNT} interaktive Guides`, `${TOOL_COUNT} Tools & Wizards`]}
        >
          {p.screenshot && <ScreenshotFrame shot={p.screenshot} priority caption="Echte Ansicht aus dem GründerX-Cockpit" />}
        </HeroCentered>

        {p.topSlot && <div className="container max-w-4xl px-4 pt-8">{p.topSlot}</div>}

        <section className="container max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:gap-16">
            <div className="self-start lg:sticky lg:top-28">
              <SectionHead align="left" eyebrow="In der richtigen Reihenfolge" title="Schritt für Schritt erledigen statt lange suchen." />
              <div className="rounded-2xl border border-brand-green/25 bg-brand-green-soft/60 p-4">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-green">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Unsicher, womit du startest?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mach das kurze Gründer-Quiz (60 Sekunden) und schalte direkt deinen persönlichen Fahrplan plus
                  Aktionscode frei.
                </p>
                <Link
                  to="/quiz"
                  className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent-blue hover:underline"
                >
                  Zum Gründer-Quiz <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div>
              <p className="text-pretty text-base leading-relaxed text-foreground/85 md:text-lg">{p.urgency}</p>
              {p.outcomes.length > 0 && (
                <div className="mt-7 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
                  <h2 className="text-sm font-semibold text-primary">Das hast du am Ende fertig</h2>
                  <ul className="mt-4 space-y-3">
                    {p.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green">
                          <Check className="h-3 w-3" strokeWidth={2.75} aria-hidden="true" />
                        </span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {p.outline && p.outline.steps.length > 0 && (
          <section className="border-y border-border bg-secondary/45 py-14 md:py-20">
            <div className="container max-w-6xl px-4">
              <SectionHead eyebrow="Lehrplan & Ablauf" title={p.outline.heading} />
              <StepsPath
                steps={p.outline.steps}
                note={
                  <span className="inline-flex items-start gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{p.outline.gateNote}</span>
                  </span>
                }
              />
            </div>
          </section>
        )}

        <section className="container max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr,1.2fr] lg:gap-16">
            <div>
              <SectionHead align="left" eyebrow="FAQ" title="Häufige Fragen" />
              {p.disclaimer && <p className="-mt-4 text-sm leading-relaxed text-muted-foreground">{p.disclaimer}</p>}
            </div>
            {p.faq.length > 0 && <FaqList items={p.faq} />}
          </div>
        </section>

        {groups.length > 0 && (
          <section className="border-t border-border py-14 md:py-20">
            <div className="container grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
              {groups.map((group) => (
                <div key={group.title}>
                  <h2 className="mb-4 text-xl font-semibold tracking-tight text-primary">{group.title}</h2>
                  <ul className="space-y-2.5">
                    {group.items.map((r) => (
                      <li key={r.to}>
                        <Link
                          to={r.to}
                          className="press group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-card hover:border-primary/35"
                        >
                          <span className="min-w-0">
                            <span className="block font-semibold text-foreground group-hover:text-accent-blue">
                              {r.title}
                            </span>
                            <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">{r.desc}</span>
                          </span>
                          <ArrowUpRight
                            className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-blue"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {p.bottomSlot && <div className="container max-w-6xl px-4 pb-16">{p.bottomSlot}</div>}

        <FinalCta
          title={p.ctaTitle}
          text={p.ctaText}
          primary={{ to: p.primaryHref, label: p.primaryLabel }}
          secondary={p.secondaryHref ? { to: p.secondaryHref, label: p.secondaryLabel ?? "Mehr erfahren" } : undefined}
        />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
