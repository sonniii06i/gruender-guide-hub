import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/landing/PageHeader";
import { PublicSection, FaqList } from "@/components/public/PublicBlocks";
import { ArrowRight, ArrowUpRight, Check, Lock, TrendingUp, Info, Clock } from "lucide-react";

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
}

/**
 * Gemeinsame öffentliche Marketing-Landing (Tools + Guides). Zeigt KEINEN
 * Bezahl-Inhalt — nur Pitch, Ergebnis, Disclaimer, FAQ und CTA in die Paywall.
 * Crawlbar → SEO-Top-of-Funnel.
 */
export const LandingPage = (p: LandingPageProps) => {
  const groups = [
    ...(p.related && p.related.length > 0 ? [{ title: p.relatedTitle ?? "Passend dazu", items: p.related }] : []),
    ...(p.relatedGroups ?? []).filter((g) => g.items.length > 0),
  ];

  const cta = (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
        <Lock className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-lg font-semibold leading-snug tracking-tight">{p.ctaTitle}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.ctaText}</p>
      <div className="mt-5 flex flex-col gap-2">
        <Button asChild size="lg" className="h-11 w-full gap-2 rounded-xl bg-gradient-primary font-semibold hover:opacity-95">
          <Link to={p.primaryHref}>
            {p.primaryLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        {p.secondaryHref && (
          <Button asChild size="lg" variant="outline" className="h-11 w-full gap-1.5 rounded-xl">
            <Link to={p.secondaryHref}>{p.secondaryLabel}</Link>
          </Button>
        )}
      </div>
      {p.disclaimer && (
        <p className="mt-5 flex items-start gap-2 border-t border-border/70 pt-4 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{p.disclaimer}</span>
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Seo title={p.seoTitle} description={p.seoDescription} path={p.path} type="website" jsonLd={p.jsonLd} />
      <Navbar />
      <main>
        <PageHeader
          width="max-w-6xl"
          crumbs={p.crumbs}
          kicker={
            <span className="inline-flex items-center rounded-full border border-accent-blue/20 bg-accent px-3 py-1 text-[13px] font-medium text-accent-blue">
              {p.eyebrow}
            </span>
          }
          title={p.heading}
          lead={<p>{p.lead}</p>}
        />

        <div className="container max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-12">
            <div className="min-w-0 space-y-12 lg:col-start-1 lg:row-start-1">
              {p.topSlot}

              {/* Dringlichkeit / Warum jetzt */}
              <section className="flex items-start gap-3.5 rounded-2xl border border-accent-blue/15 bg-accent/60 p-5 md:p-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-card text-accent-blue shadow-card">
                  <TrendingUp className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="pt-1 text-[15px] leading-relaxed text-foreground/90">{p.urgency}</p>
              </section>

              {/* Das hast du am Ende */}
              {p.outcomes.length > 0 && (
                <PublicSection title="Das hast du am Ende">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {p.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-[15px] leading-relaxed shadow-card">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </PublicSection>
              )}

              {/* Ablauf-Umriss (Guides): sichtbare Struktur, Detail hinter Paywall */}
              {p.outline && p.outline.steps.length > 0 && (
                <PublicSection title={p.outline.heading}>
                  <ol className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                    {p.outline.steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-4 border-b border-border/70 px-5 py-4 last:border-b-0 md:px-6">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular ${
                            s.description ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                            <p className={`text-[15px] font-medium ${s.description ? "" : "text-foreground/80"}`}>{s.title}</p>
                            {s.meta && (
                              <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground tabular">
                                <Clock className="h-3 w-3" aria-hidden="true" /> {s.meta}
                              </span>
                            )}
                          </div>
                          {s.description ? (
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                          ) : (
                            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground/80">
                              <Lock className="h-3 w-3" aria-hidden="true" /> Im Cockpit
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{p.outline.gateNote}</span>
                  </p>
                </PublicSection>
              )}

            </div>

            {/* CTA: mobil zwischen Inhalt und FAQ, auf Desktop mitlaufend rechts */}
            <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="lg:sticky lg:top-24">{cta}</div>
            </aside>

            {/* FAQ */}
            {p.faq.length > 0 && (
              <PublicSection title="Häufige Fragen" className="min-w-0 lg:col-start-1 lg:row-start-2">
                <FaqList items={p.faq} />
              </PublicSection>
            )}
          </div>

          {/* Verwandte Landings (interne Verlinkung): Legacy-Einzelgruppe + Gruppen */}
          {groups.length > 0 && (
            <div className="mt-16 space-y-12 border-t border-border/70 pt-12">
              {groups.map((group) => (
                <PublicSection key={group.title} title={group.title}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {group.items.map((r) => (
                      <Link
                        key={r.to}
                        to={r.to}
                        className="press group flex flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent-blue/40 hover:shadow-card"
                      >
                        <span className="flex items-start justify-between gap-2">
                          <span className="text-sm font-semibold leading-snug">{r.title}</span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-blue" aria-hidden="true" />
                        </span>
                        <span className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{r.desc}</span>
                      </Link>
                    ))}
                  </div>
                </PublicSection>
              ))}
            </div>
          )}

          {p.bottomSlot && <div className="mt-12">{p.bottomSlot}</div>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
