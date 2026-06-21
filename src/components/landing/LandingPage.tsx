import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Check, Lock, TrendingUp, Info, Clock } from "lucide-react";

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
}

/**
 * Gemeinsame öffentliche Marketing-Landing (Tools + Guides). Zeigt KEINEN
 * Bezahl-Inhalt — nur Pitch, Ergebnis, Disclaimer, FAQ und CTA in die Paywall.
 * Crawlbar → SEO-Top-of-Funnel.
 */
export const LandingPage = (p: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title={p.seoTitle} description={p.seoDescription} path={p.path} type="website" jsonLd={p.jsonLd} />
      <Navbar />
      <main className="container max-w-3xl py-12 md:py-16 px-4">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-6 flex flex-wrap items-center gap-1.5" aria-label="Breadcrumb">
          {p.crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {c.to ? (
                <Link to={c.to} className="hover:text-foreground">{c.label}</Link>
              ) : (
                <span className="text-foreground">{c.label}</span>
              )}
              {i < p.crumbs.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>

        {/* Hero */}
        <header className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent-blue mb-2">{p.eyebrow}</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{p.heading}</h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{p.lead}</p>
        </header>

        {/* Dringlichkeit / Warum jetzt */}
        <section className="rounded-2xl border border-accent-blue/20 bg-accent-blue/5 p-6 md:p-7 mb-8">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 mt-0.5 shrink-0 text-accent-blue" />
            <p className="text-sm md:text-[15px] leading-relaxed text-foreground/90">{p.urgency}</p>
          </div>
        </section>

        {/* Das hast du am Ende */}
        {p.outcomes.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4">Das hast du am Ende</h2>
            <ul className="space-y-2.5">
              {p.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm md:text-[15px] leading-relaxed">
                  <Check className="h-4 w-4 mt-1 shrink-0 text-accent-blue" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Ablauf-Umriss (Guides): sichtbare Struktur, Detail hinter Paywall */}
        {p.outline && p.outline.steps.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4">{p.outline.heading}</h2>
            <ol className="space-y-3">
              {p.outline.steps.map((s, i) => (
                <li key={i} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-blue/10 text-[11px] font-semibold text-accent-blue">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-sm">{s.title}</p>
                        {!s.description && <Lock className="h-3 w-3 text-muted-foreground/70" />}
                      </div>
                      {s.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mt-1">{s.description}</p>
                      )}
                      {s.meta && (
                        <p className="text-[11px] text-muted-foreground/80 mt-1.5 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {s.meta}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-xs text-muted-foreground leading-relaxed mt-4 flex items-start gap-2">
              <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <span>{p.outline.gateNote}</span>
            </p>
          </section>
        )}

        {/* Primärer CTA (Paywall) */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-7 shadow-card mb-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">{p.ctaTitle}</h2>
              <p className="text-sm text-muted-foreground">{p.ctaText}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to={p.primaryHref}>
              <Button size="lg" className="rounded-full gap-2 bg-gradient-primary hover:opacity-95">
                <Sparkles className="h-4 w-4" /> {p.primaryLabel}
              </Button>
            </Link>
            {p.secondaryHref && (
              <Link to={p.secondaryHref}>
                <Button size="lg" variant="ghost" className="rounded-full gap-1">
                  {p.secondaryLabel} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        {p.disclaimer && (
          <p className="text-xs text-muted-foreground leading-relaxed mb-10 flex items-start gap-2">
            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>{p.disclaimer}</span>
          </p>
        )}

        {/* FAQ */}
        {p.faq.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-5">Häufige Fragen</h2>
            <div className="space-y-5">
              {p.faq.map((f) => (
                <div key={f.q}>
                  <h3 className="font-semibold mb-1.5 flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 text-accent-blue shrink-0" /> {f.q}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-6">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Verwandte Landings (interne Verlinkung) — Legacy-Einzelgruppe + Gruppen */}
        {[
          ...(p.related && p.related.length > 0 ? [{ title: p.relatedTitle ?? "Passend dazu", items: p.related }] : []),
          ...(p.relatedGroups ?? []).filter((g) => g.items.length > 0),
        ].map((group) => (
          <section key={group.title} className="mt-10 first:mt-0">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-5">{group.title}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {group.items.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="rounded-xl border border-border bg-card p-4 hover:border-accent-blue/50 transition-colors"
                >
                  <p className="font-medium text-sm mb-1">{r.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{r.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {p.bottomSlot && <div className="mt-10">{p.bottomSlot}</div>}
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
