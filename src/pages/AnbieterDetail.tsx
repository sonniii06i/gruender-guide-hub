import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  AlertCircle,
  Star,
  Tag,
  ExternalLink,
  Quote,
  Scale,
  FileText,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  TrendingUp,
  MapPin,
  Wallet,
  Sparkles,
  Search,
  Copy,
  Check,
  Compass,
  ArrowRight,
} from "lucide-react";
import { Callout, EmptyState, ToolSection } from "@/components/cockpit/kit";
import { FULL_DESCRIPTIONS, isCoopActive, LEGAL_URLS, PROVIDERS } from "./Anbieter";
import { Seo } from "@/components/Seo";
import { AnbieterLink, PartnerFussnote } from "@/components/PartnerLink";

const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const ProviderLogo = ({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) => {
  const dim = size === "lg" ? "h-16 w-16 md:h-20 md:w-20" : size === "sm" ? "h-10 w-10" : "h-14 w-14";
  const text = size === "lg" ? "text-3xl md:text-4xl" : size === "sm" ? "text-sm" : "text-xl";
  return (
    <div
      className={`${dim} flex shrink-0 items-center justify-center rounded-2xl bg-white/15 ${text} font-semibold text-white ring-1 ring-white/25`}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

const AnbieterDetail = () => {
  const { slug } = useParams();
  const [copiedCode, setCopiedCode] = useState(false);
  const p = PROVIDERS.find((x) => x.slug === slug);

  if (!p) {
    return (
      <CockpitShell eyebrow="Anbieter-Vergleich" title="Anbieter nicht gefunden" showRelated={false}>
        <Seo
          title="Anbieter nicht gefunden | GründerX"
          description="Dieser Anbieter existiert nicht in unserem Vergleich. Sieh dir alle Anbieter an."
          path={`/anbieter/${slug ?? ""}`}
          noindex
        />
        <EmptyState
          icon={Search}
          title="Diesen Anbieter gibt es im Vergleich nicht"
          description="Vielleicht wurde er umbenannt oder entfernt. Im Vergleich findest du alle aktuellen Anbieter nach Kategorie."
          action={
            <Button asChild variant="outline">
              <Link to="/anbieter">
                <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" /> Zurück zum Vergleich
              </Link>
            </Button>
          }
        />
      </CockpitShell>
    );
  }

  const related = PROVIDERS.filter((x) => x.category === p.category && x.slug !== p.slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const verified = LEGAL_URLS[p.slug] ?? {};
  const legalImpressum = p.legal?.impressum ?? verified.impressum;
  const legalTerms = p.legal?.terms ?? verified.terms;
  const legalPrivacy = p.legal?.privacy ?? verified.privacy;
  const hasAnyLegal = Boolean(legalImpressum || legalTerms || legalPrivacy);

  const showCoop = isCoopActive(p.coop);
  const description = p.fullDescription ?? FULL_DESCRIPTIONS[p.slug];

  const copyDealCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="container max-w-6xl px-4 pb-24 pt-6 md:px-6 md:pb-16 md:pt-8">
      <Seo
        title={`${p.name} 2026: ${p.category} im Vergleich | GründerX`}
        description={(description ?? p.tagline).slice(0, 155)}
        path={`/anbieter/${p.slug}`}
        type="product"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: description ?? p.tagline,
            category: p.category,
            url: `https://gruenderx.de/anbieter/${p.slug}`,
            brand: { "@type": "Brand", name: p.name },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: "https://gruenderx.de/" },
              { "@type": "ListItem", position: 2, name: "Anbieter", item: "https://gruenderx.de/anbieter" },
              { "@type": "ListItem", position: 3, name: p.name, item: `https://gruenderx.de/anbieter/${p.slug}` },
            ],
          },
        ]}
      />

      {/* Breadcrumb-Navigation zurück zur Kategorie */}
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
        <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground hover:text-foreground">
          <Link to="/anbieter">
            <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Alle Anbieter
          </Link>
        </Button>
        <span className="text-muted-foreground" aria-hidden="true">/</span>
        <Link
          to={`/anbieter?cat=${encodeURIComponent(p.category)}`}
          className="font-medium text-accent-blue hover:underline"
        >
          {p.category}
        </Link>
      </div>

      {/* Masterclass-Hero-Karte in GründerX Navy */}
      <section className="mb-6 overflow-hidden rounded-2xl bg-ink text-primary-foreground shadow-lg">
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <ProviderLogo name={p.name} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-white">{p.category}</span>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-white/85">{p.region}</span>
                  </div>
                  <h1 className="mt-2.5 text-2xl font-semibold tracking-tight text-white md:text-3xl">{p.name}</h1>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 md:text-base">
                    {p.tagline}
                  </p>
                </div>

                <div
                  className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-white/10 px-3.5 py-2.5 ring-1 ring-white/20"
                  aria-label={`Bewertung ${p.rating.toFixed(1)} von 5`}
                >
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="text-xl font-semibold text-white tabular">{p.rating.toFixed(1)}</span>
                  <span className="text-xs text-primary-foreground/75">/ 5</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="press h-12 w-full rounded-xl bg-brand-green px-6 font-semibold text-brand-green-foreground hover:bg-brand-green/90 sm:w-auto"
                >
                  <AnbieterLink url={p.url} slug={p.slug} ort="anbieter">
                    Zum Anbieter <ExternalLink className="ml-1.5 h-4 w-4" aria-hidden="true" />
                  </AnbieterLink>
                </Button>
                <a
                  href={`https://${getDomain(p.url)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center rounded-xl border border-white/20 px-4 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
                >
                  {getDomain(p.url)}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Aktiver Partner-Deal direkt im Hero-Fuß */}
        {showCoop && p.coop && (
          <div className="border-t border-white/15 bg-white/10 px-6 py-4 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green text-brand-green-foreground">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-medium text-brand-green-glow">
                    Aktueller Deal (gültig bis {p.coop.expires})
                  </p>
                  <p className="text-sm font-semibold text-white">{p.coop.text}</p>
                </div>
              </div>
              {p.coop.code && (
                <button
                  type="button"
                  onClick={() => void copyDealCode(p.coop!.code!)}
                  className="press inline-flex items-center gap-2 rounded-xl bg-card px-3.5 py-2 text-xs font-semibold text-primary shadow-sm"
                >
                  <Tag className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                  <span className="font-mono text-sm">{p.coop.code}</span>
                  {copiedCode ? (
                    <Check className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 4 klare Kennzahlen */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-2xl border border-primary/20 bg-card p-4 shadow-card">
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Wallet className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Preis ab
          </p>
          <p className="mt-1.5 text-sm font-semibold leading-snug text-primary tabular md:text-base">{p.starting}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" /> Einrichtung
          </p>
          <p className="mt-1.5 text-sm font-semibold leading-snug text-foreground md:text-base">
            {p.signupTime ?? "Sofort online"}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" /> Region
          </p>
          <p className="mt-1.5 text-sm font-semibold leading-snug text-foreground md:text-base">{p.region}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" /> Praxis-Score
          </p>
          <p className="mt-1.5 text-sm font-semibold leading-snug text-foreground tabular md:text-base">
            {p.rating.toFixed(1)} von 5,0
          </p>
        </div>
      </div>

      {p.monthlyMin && (
        <Callout tone="warning" icon={AlertCircle} className="mb-6">
          <strong className="text-foreground">Mindestumsatz / Volumen:</strong> {p.monthlyMin}
        </Callout>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
        {/* Hauptspalte */}
        <div className="min-w-0 space-y-6">
          {description && (
            <section className="rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
              <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                <Compass className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" /> Kurzporträt &amp; Einordnung
              </p>
              <p className="max-w-[70ch] text-[15px] leading-relaxed text-foreground/85">{description}</p>
            </section>
          )}

          {/* Stärken vs. Schwächen nebeneinander */}
          <div className="grid gap-4 sm:grid-cols-2">
            <section className="rounded-2xl border border-brand-green/30 bg-brand-green-soft/45 p-5 shadow-card">
              <h3 className="mb-3.5 flex items-center gap-2 text-base font-semibold text-brand-green">
                <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                Was gut läuft (Stärken)
              </h3>
              <ul className="space-y-2.5">
                {p.pros.map((x, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-snug text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" strokeWidth={2.75} aria-hidden="true" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-danger/25 bg-danger-soft/55 p-5 shadow-card">
              <h3 className="mb-3.5 flex items-center gap-2 text-base font-semibold text-danger">
                <XCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                Worauf du achten musst (Schwächen)
              </h3>
              <ul className="space-y-2.5">
                {p.cons.map((x, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-snug text-foreground">
                    <span className="mt-0.5 text-sm font-bold text-danger" aria-hidden="true">−</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Community-Stimmen */}
          {p.forumNotes && (
            <section className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
              <Quote
                className="absolute right-5 top-5 h-9 w-9 text-primary/10"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="text-base font-semibold text-primary">Erfahrungen aus der Praxis</h3>
              <p className="mt-2.5 max-w-[68ch] text-[15px] leading-relaxed text-foreground/85">{p.forumNotes}</p>
              <p className="mt-4 border-t border-border/70 pt-3 text-xs text-muted-foreground">
                Zusammengefasst aus Gründer-Foren (u. a. r/Selbststaendig, r/ecommerce_de, Trustpilot und Fachportalen).
              </p>
            </section>
          )}

          {/* Alternativen in derselben Kategorie */}
          {related.length > 0 && (
            <ToolSection
              title={`Starke Alternativen in „${p.category}“`}
              description="Vergleiche Preis, Score und Stärken direkt mit den nächsten Optionen in derselben Kategorie."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/anbieter/${r.slug}`}
                    className="press group flex items-start gap-3 rounded-xl border border-border bg-background/60 p-3.5 hover:border-primary/35 hover:bg-card"
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
                      aria-hidden="true"
                    >
                      {r.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-foreground group-hover:text-accent-blue">
                          {r.name}
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold tabular">
                          <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
                          {r.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">{r.starting}</p>
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{r.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link
                  to={`/anbieter?cat=${encodeURIComponent(p.category)}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-blue hover:underline"
                >
                  Alle Anbieter in {p.category} ansehen <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </ToolSection>
          )}
        </div>

        {/* Sticky Seitenleiste */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-20">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-xs font-semibold text-muted-foreground">Direkt starten</p>
            <p className="mt-1 text-lg font-semibold text-primary">{p.name}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{p.starting}</p>
            <Button asChild size="lg" className="press mt-4 h-11 w-full rounded-xl font-semibold">
              <AnbieterLink url={p.url} slug={p.slug} ort="anbieter-seite">
                Zum Anbieter <ExternalLink className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </AnbieterLink>
            </Button>
            <div className="mt-3">
              <PartnerFussnote urls={[p.url, ...(p.links ?? []).map((l) => l.url)]} />
            </div>
          </div>

          {p.links && p.links.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h3 className="mb-3 text-sm font-semibold text-primary">Direkt-Links</h3>
              <ul className="space-y-2 text-sm">
                {p.links.map((l) => (
                  <li key={l.url}>
                    <AnbieterLink
                      url={l.url}
                      ort="anbieter-direkt"
                      className="inline-flex items-center gap-1.5 font-medium text-accent-blue hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {l.label}
                    </AnbieterLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasAnyLegal && (
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h3 className="mb-3 text-sm font-semibold text-primary">Rechtliches beim Anbieter</h3>
              <ul className="space-y-2 text-sm">
                {legalImpressum && (
                  <li>
                    <a
                      href={legalImpressum}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent-blue hover:underline"
                    >
                      <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Impressum
                    </a>
                  </li>
                )}
                {legalTerms && (
                  <li>
                    <a
                      href={legalTerms}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent-blue hover:underline"
                    >
                      <Scale className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> AGB / Bedingungen
                    </a>
                  </li>
                )}
                {legalPrivacy && (
                  <li>
                    <a
                      href={legalPrivacy}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent-blue hover:underline"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Datenschutz
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default AnbieterDetail;
