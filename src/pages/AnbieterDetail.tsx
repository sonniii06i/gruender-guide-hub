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
} from "lucide-react";
import { Callout, EmptyState, ToolSection } from "@/components/cockpit/kit";
import { FULL_DESCRIPTIONS, isCoopActive, LEGAL_URLS, PROVIDERS, type Provider } from "./Anbieter";
import { Seo } from "@/components/Seo";

const getDomain = (url: string): string => {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
};

const ProviderLogo = ({ url, name, size = "md" }: { url: string; name: string; size?: "sm" | "md" | "lg" }) => {
  const domain = getDomain(url);
  const sources = [
    `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,
    `https://logo.clearbit.com/${domain}?size=256`,
  ];
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  const dim = size === "lg" ? "h-24 w-24" : size === "sm" ? "h-10 w-10" : "h-16 w-16";
  const text = size === "lg" ? "text-5xl" : size === "sm" ? "text-base" : "text-2xl";

  if (failed) {
    return (
      <div className={`${dim} flex shrink-0 items-center justify-center rounded-2xl bg-gradient-primary ${text} font-semibold text-primary-foreground shadow-card`} aria-hidden="true">
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={sources[idx]}
      alt={`${name} Logo`}
      loading="eager"
      decoding="async"
      // @ts-expect-error fetchpriority is valid HTML
      fetchpriority="high"
      className={`${dim} shrink-0 rounded-2xl border border-border bg-white object-contain p-1.5 shadow-card`}
      onError={() => {
        if (idx + 1 < sources.length) setIdx(idx + 1);
        else setFailed(true);
      }}
    />
  );
};

const StatCard = ({ icon: Icon, label, value, accent }: { icon: typeof Wallet; label: string; value: string; accent?: boolean }) => (
  <div className={`rounded-xl border p-4 ${accent ? "border-accent-blue/20 bg-accent" : "border-border bg-card"}`}>
    <div className="mb-1 flex items-center gap-1.5 text-sm text-muted-foreground">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </div>
    <div className="font-semibold leading-tight tabular">{value}</div>
  </div>
);

const AnbieterDetail = () => {
  const { slug } = useParams();
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
                <ArrowLeft aria-hidden="true" /> Zurück zum Vergleich
              </Link>
            </Button>
          }
        />
      </CockpitShell>
    );
  }

  const related = PROVIDERS.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 6);

  const verified = LEGAL_URLS[p.slug] ?? {};
  const legalImpressum = p.legal?.impressum ?? verified.impressum;
  const legalTerms = p.legal?.terms ?? verified.terms;
  const legalPrivacy = p.legal?.privacy ?? verified.privacy;
  const hasAnyLegal = Boolean(legalImpressum || legalTerms || legalPrivacy);

  const showCoop = isCoopActive(p.coop);
  const description = p.fullDescription ?? FULL_DESCRIPTIONS[p.slug];

  return (
    <CockpitShell
      eyebrow={`Anbieter-Vergleich · ${p.category}`}
      title={p.name}
      subtitle={p.tagline}
    >
      <Seo
        title={`${p.name} Erfahrungen 2026 – ${p.category} im Test | GründerX`}
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
            aggregateRating: p.rating
              ? { "@type": "AggregateRating", ratingValue: p.rating, bestRating: 5, ratingCount: 1 }
              : undefined,
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
      <Button asChild variant="ghost" size="sm" className="-ml-2 mb-5 text-muted-foreground">
        <Link to="/anbieter">
          <ArrowLeft aria-hidden="true" /> Alle Anbieter
        </Link>
      </Button>

      {/* Kopf: Logo, Name, Bewertung, CTA */}
      <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <ProviderLogo url={p.url} name={p.name} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-accent-blue">
                    {p.category} <span className="font-normal text-muted-foreground">· {p.region}</span>
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">{p.name}</h2>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">{p.tagline}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-warning/25 bg-warning-soft px-3 py-2" aria-label={`Bewertung ${p.rating.toFixed(1)} von 5`}>
                  <Star className="h-5 w-5 fill-current text-warning" aria-hidden="true" />
                  <span className="text-lg font-semibold tabular">{p.rating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">/ 5</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild size="lg" className="w-full rounded-xl font-semibold sm:w-auto">
                  <a href={p.url} target="_blank" rel="noreferrer">
                    Zum Anbieter <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="hidden rounded-xl md:inline-flex">
                  <a href={`https://${getDomain(p.url)}`} target="_blank" rel="noreferrer">{getDomain(p.url)}</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Kooperations-Deal direkt unter dem Kopf */}
        {showCoop && p.coop && (
          <div className="border-t border-dashed border-accent-blue/30 bg-accent/70 p-5 md:px-8">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-blue text-accent-blue-foreground">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-accent-blue">Aktueller Deal, gültig bis {p.coop.expires}</p>
                <p className="mt-0.5 font-semibold">{p.coop.text}</p>
                {p.coop.code && (
                  <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-dashed border-accent-blue/40 bg-card px-3 py-1.5">
                    <Tag className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" />
                    <span className="text-xs text-muted-foreground">Code:</span>
                    <span className="font-mono text-sm font-semibold">{p.coop.code}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Kurzporträt */}
      {description && (
        <p className="mb-6 max-w-[72ch] text-base leading-relaxed text-foreground/85">{description}</p>
      )}

      {/* Eckdaten */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard icon={Wallet} label="Preis ab" value={p.starting} accent />
        <StatCard icon={Clock} label="Setup" value={p.signupTime ?? "Sofort"} />
        <StatCard icon={MapPin} label="Region" value={p.region} />
        <StatCard icon={TrendingUp} label="Bewertung" value={`${p.rating.toFixed(1)} / 5`} />
      </div>

      {p.monthlyMin && (
        <Callout tone="warning" icon={AlertCircle} className="mb-6">
          <strong className="text-foreground">Mindestumsatz/-volumen:</strong> {p.monthlyMin}
        </Callout>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Hauptspalte */}
        <div className="min-w-0 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <ToolSection title="Stärken" icon={CheckCircle2}>
              <ul className="space-y-2.5">
                {p.pros.map((x, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-snug">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </ToolSection>
            <ToolSection title="Schwächen" icon={XCircle}>
              <ul className="space-y-2.5">
                {p.cons.map((x, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-snug">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </ToolSection>
          </div>

          {/* Community-Stimmen (aggregiert, keine Einzelzitate) */}
          {p.forumNotes && (
            <section className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
              <Quote className="absolute right-5 top-5 h-10 w-10 text-accent-blue/10" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-base font-semibold">Was die Community sagt</h3>
              <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-foreground/85">{p.forumNotes}</p>
              <p className="mt-4 border-t border-border/70 pt-3 text-xs text-muted-foreground">
                Zusammengefasst aus r/Selbststaendig, r/ecommerce_de, DTC-Slack, Indie Hackers, Trustpilot und finanzfluss.
              </p>
            </section>
          )}

          {related.length > 0 && (
            <section>
              <h3 className="mb-3 text-base font-semibold">Alternativen in {p.category}</h3>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/anbieter/${r.slug}`}
                    className="press flex items-center gap-3 rounded-xl border border-border bg-card p-3 hover:border-accent-blue/40 hover:shadow-card"
                  >
                    <ProviderLogo url={r.url} name={r.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold leading-tight">{r.name}</div>
                      <div className="mt-0.5 truncate text-xs text-muted-foreground">{r.tagline}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-0.5 text-xs tabular" aria-label={`Bewertung ${r.rating.toFixed(1)}`}>
                      <Star className="h-3 w-3 fill-current text-warning" aria-hidden="true" />
                      {r.rating.toFixed(1)}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Seitenleiste */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-20">
          <Button asChild size="lg" className="w-full rounded-xl font-semibold">
            <a href={p.url} target="_blank" rel="noreferrer">
              Zum Anbieter <ExternalLink aria-hidden="true" />
            </a>
          </Button>

          {p.links && p.links.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <h3 className="mb-2 text-sm font-semibold">Direkt-Links</h3>
              <ul className="space-y-1.5 text-sm">
                {p.links.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent-blue hover:underline">
                      <ExternalLink className="h-3 w-3" aria-hidden="true" /> {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasAnyLegal && (
            <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <h3 className="mb-2 text-sm font-semibold">Rechtliches</h3>
              <ul className="space-y-1.5 text-sm">
                {legalImpressum && (
                  <li>
                    <a href={legalImpressum} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent-blue hover:underline">
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" /> Impressum
                    </a>
                  </li>
                )}
                {legalTerms && (
                  <li>
                    <a href={legalTerms} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent-blue hover:underline">
                      <Scale className="h-3.5 w-3.5" aria-hidden="true" /> AGB / Terms
                    </a>
                  </li>
                )}
                {legalPrivacy && (
                  <li>
                    <a href={legalPrivacy} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent-blue hover:underline">
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Datenschutz
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </CockpitShell>
  );
};

export default AnbieterDetail;
