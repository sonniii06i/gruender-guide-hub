import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { FaqList } from "@/components/public/PublicBlocks";
import { ArrowUpRight, Lock } from "lucide-react";
import { FinalCta, HeroCentered, ScreenshotFrame, SectionHead, StepsPath } from "@/components/marketing/Marketing";
import type { Screenshot } from "@/data/screenshots";
import { TOOL_COUNT } from "@/data/kennzahlen";

export interface LandingFaq {
  q: string;
  a: string;
}

export interface OutlineStep {
  title: string;
  /** Nur für die ersten paar Schritte sichtbar (Content-Sample). */
  description?: string;
  meta?: string;
}

export interface LandingOutline {
  /** Überschrift, z.B. "Ablauf in 12 Schritten". */
  heading: string;
  steps: OutlineStep[];
  /** Hinweis, dass die Detail-Anleitung hinter der Paywall liegt. */
  gateNote: string;
}

export interface RelatedLink {
  to: string;
  title: string;
  desc: string;
}

export interface LandingPageProps {
  /** SEO */
  seoTitle: string;
  seoDescription: string;
  path: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Breadcrumb */
  crumbs: { label: string; to?: string }[];
  /** Kategorie-Eyebrow über H1 */
  eyebrow: string;
  /** Sichtbarer H1 */
  heading: string;
  /** Subhead unter H1 */
  lead: string;
  /** Verkaufs-/Dringlichkeits-Absatz ("…sonst verlierst du Geld") */
  urgency: string;
  /** "Das hast du am Ende" — Ergebnis-Bullets */
  outcomes: string[];
  /** Optionaler Ablauf-Umriss (für Guides) — sichtbarer Content, Detail gegated */
  outline?: LandingOutline;
  /** Ehrlicher Kurz-Disclaimer */
  disclaimer: string;
  /** FAQ (für Snippet + JSON-LD bereits oben eingebettet) */
  faq: LandingFaq[];
  /** CTA-Box */
  ctaTitle: string;
  ctaText: string;
  /** Primärer CTA → Checkout/Paywall */
  primaryHref: string;
  primaryLabel: string;
  /** Optionaler Sekundär-CTA (Tool/Guide öffnen) */
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Verwandte Landings (Legacy-Einzelgruppe) */
  relatedTitle?: string;
  related?: RelatedLink[];
  /** Mehrere Related-Gruppen (z.B. „Passende Tools" + „Passende Guides"). */
  relatedGroups?: { title: string; items: RelatedLink[] }[];
  /** Beliebiger Inhalt am Seitenende (z.B. dynamisch geladene Ratgeber-Artikel). */
  bottomSlot?: React.ReactNode;
  /** Optionaler Block direkt unter dem Hero (z. B. kostenlose Probe eines Tools). */
  topSlot?: React.ReactNode;
  /** Echter App-Screenshot unter dem Hero (src/data/screenshots.ts). */
  screenshot?: Screenshot;
}

/**
 * Gemeinsame öffentliche Marketing-Landing (Tools + Guides) im Aufbau von
 * profitpath.com (25.10.2026): zentrierter Hero, echter Screenshot, „Warum jetzt“
 * mit Ergebnissen, nummerierter Ablauf, FAQ, verwandte Seiten, Schluss-CTA.
 * Zeigt KEINEN Bezahl-Inhalt. Crawlbar → SEO-Top-of-Funnel.
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
          trust={["Monatlich kündbar", "Server in Frankfurt am Main", `${TOOL_COUNT} Tools & Wizards`]}
        >
          {p.screenshot && <ScreenshotFrame shot={p.screenshot} priority caption="Echte Ansicht aus dem GründerX-Cockpit" />}
        </HeroCentered>

        {p.topSlot && <div className="container max-w-4xl px-4 pt-6">{p.topSlot}</div>}

        <section className="container max-w-6xl px-4 py-14 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr,1fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <SectionHead align="left" eyebrow="Warum jetzt" title="Einmal richtig machen statt teuer nachbessern." />
            </div>
            <div>
              <p className="text-pretty text-lg leading-relaxed text-foreground/85">{p.urgency}</p>
              {p.outcomes.length > 0 && (
                <>
                  <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Das hast du am Ende</h2>
                  <ul className="mt-3 divide-y divide-border border-y border-border">
                    {p.outcomes.map((o, i) => (
                      <li key={i} className="flex gap-3 py-3.5 text-[15px] leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" aria-hidden="true" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>

        {p.outline && p.outline.steps.length > 0 && (
          <section className="border-y border-border/70 bg-secondary/30 py-14 md:py-28">
            <div className="container max-w-6xl px-4">
              <SectionHead eyebrow="Ablauf" title={p.outline.heading} />
              <StepsPath
                steps={p.outline.steps}
                note={
                  <span className="inline-flex items-start gap-2">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {p.outline.gateNote}
                  </span>
                }
              />
            </div>
          </section>
        )}

        <section className="container max-w-6xl px-4 py-14 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr,1.2fr] lg:gap-16">
            <div>
              <SectionHead align="left" eyebrow="FAQ" title="Häufige Fragen" />
              {p.disclaimer && <p className="-mt-6 text-sm leading-relaxed text-muted-foreground">{p.disclaimer}</p>}
            </div>
            {p.faq.length > 0 && <FaqList items={p.faq} />}
          </div>
        </section>

        {groups.length > 0 && (
          <section className="border-t border-border/70 py-20">
            <div className="container grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
              {groups.map((group) => (
                <div key={group.title}>
                  <h2 className="mb-5 text-xl font-semibold tracking-tight">{group.title}</h2>
                  <ul className="divide-y divide-border border-y border-border">
                    {group.items.map((r) => (
                      <li key={r.to}>
                        <Link to={r.to} className="group flex items-start justify-between gap-4 py-4">
                          <span className="min-w-0">
                            <span className="block font-medium group-hover:text-accent-blue">{r.title}</span>
                            <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">{r.desc}</span>
                          </span>
                          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-accent-blue" aria-hidden="true" />
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
