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
} from "lucide-react";
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
      <div className={`${dim} rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center ${text} font-bold shadow-soft shrink-0`}>
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
      className={`${dim} rounded-2xl bg-white border border-border object-contain shadow-soft shrink-0`}
      onError={() => {
        if (idx + 1 < sources.length) setIdx(idx + 1);
        else setFailed(true);
      }}
    />
  );
};

const StatCard = ({ icon: Icon, label, value, accent }: { icon: typeof Wallet; label: string; value: string; accent?: boolean }) => (
  <div className={`rounded-xl border ${accent ? "border-accent-blue/30 bg-accent-blue/5" : "border-border bg-card"} p-4`}>
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
      <Icon className="h-3 w-3" />
      {label}
    </div>
    <div className="font-semibold text-sm leading-tight">{value}</div>
  </div>
);

const AnbieterDetail = () => {
  const { slug } = useParams();
  const p = PROVIDERS.find((x) => x.slug === slug);

  if (!p) {
    return (
      <CockpitShell eyebrow="404" title="Anbieter nicht gefunden">
        <Seo
          title="Anbieter nicht gefunden | GründerX"
          description="Dieser Anbieter existiert nicht in unserem Vergleich. Sieh dir alle Anbieter an."
          path={`/anbieter/${slug ?? ""}`}
          noindex
        />
        <Link to="/anbieter" className="text-accent-blue hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Zurück zum Vergleich
        </Link>
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
      eyebrow={`🏆 ${p.category}`}
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
      <Link to="/anbieter" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Alle Anbieter
      </Link>

      {/* HERO */}
      <div className="rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-card via-card to-accent-blue/5 mb-6">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <ProviderLogo url={p.url} name={p.name} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-accent-blue mb-1">{p.category} · {p.region}</div>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight">{p.name}</h2>
                  <p className="text-base text-muted-foreground mt-2 max-w-2xl">{p.tagline}</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300 px-3 py-2 shrink-0">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-bold">{p.rating.toFixed(1)}</span>
                  <span className="text-xs opacity-70">/ 5</span>
                </div>
              </div>

              {/* CTA – im Hero */}
              <div className="flex gap-2 mt-5">
                <a href={p.url} target="_blank" rel="noreferrer" className="flex-1 md:flex-none">
                  <Button size="lg" className="w-full md:w-auto">
                    Zum Anbieter <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
                <a href={`https://${getDomain(p.url)}`} target="_blank" rel="noreferrer" className="hidden md:inline-block">
                  <Button size="lg" variant="outline">{getDomain(p.url)}</Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Coop-Deal Banner direkt unter Hero */}
        {showCoop && p.coop && (
          <div className="border-t-2 border-dashed border-accent-blue/30 bg-accent-blue/10 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-accent-blue text-primary-foreground p-2.5 shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-accent-blue mb-1">Aktueller Deal · gültig bis {p.coop.expires}</div>
                <div className="font-semibold text-base">{p.coop.text}</div>
                {p.coop.code && (
                  <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-card border-2 border-accent-blue/30 border-dashed px-3 py-1.5">
                    <Tag className="h-3.5 w-3.5 text-accent-blue" />
                    <span className="text-xs text-muted-foreground">Code:</span>
                    <span className="font-mono font-bold text-sm">{p.coop.code}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BRAND-INTRO – 3-5 Zeiler über das Unternehmen */}
      {description && (
        <div className="rounded-2xl border border-border bg-card p-6 mb-6">
          <p className="text-base leading-relaxed text-foreground/90">{description}</p>
        </div>
      )}

      {/* STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard icon={Wallet} label="Preis ab" value={p.starting} accent />
        <StatCard icon={Clock} label="Setup" value={p.signupTime ?? "Sofort"} />
        <StatCard icon={MapPin} label="Region" value={p.region} />
        <StatCard icon={TrendingUp} label="Bewertung" value={`${p.rating.toFixed(1)} / 5`} />
      </div>

      {p.monthlyMin && (
        <div className="flex items-start gap-2 rounded-xl bg-warning/10 border border-warning/30 p-3 mb-6 text-sm">
          <AlertCircle className="h-4 w-4 text-warning-foreground mt-0.5 shrink-0" />
          <span><strong>Mindestumsatz/-volumen:</strong> {p.monthlyMin}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        {/* HAUPTSPALTE */}
        <div className="space-y-6">
          {/* Pros / Cons */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-success/30 bg-success/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="rounded-lg bg-success text-success-foreground p-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-sm">Stärken</h3>
              </div>
              <ul className="space-y-2.5">
                {p.pros.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-snug">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success mt-1 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="rounded-lg bg-destructive text-destructive-foreground p-1.5">
                  <XCircle className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-sm">Schwächen</h3>
              </div>
              <ul className="space-y-2.5">
                {p.cons.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-snug">
                    <XCircle className="h-3.5 w-3.5 text-destructive mt-1 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Community-Quote */}
          {p.forumNotes && (
            <div className="relative rounded-2xl border border-accent-blue/30 bg-gradient-to-br from-accent-blue/5 to-transparent p-6">
              <Quote className="absolute top-4 right-4 h-12 w-12 text-accent-blue/10" strokeWidth={1.5} />
              <div className="relative">
                <div className="text-xs font-bold uppercase tracking-wider text-accent-blue mb-2">Was die Community sagt</div>
                <p className="text-base italic leading-relaxed">{p.forumNotes}</p>
                <div className="text-[10px] text-muted-foreground mt-4 pt-4 border-t border-border">
                  Aggregiert aus r/Selbststaendig, r/ecommerce_de, DTC-Slack, Indie Hackers, Trustpilot, finanzfluss.
                </div>
              </div>
            </div>
          )}

          {/* Alternativen — horizontal scroll */}
          {related.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Alternativen in {p.category}</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {related.map((r) => (
                  <Link key={r.slug} to={`/anbieter/${r.slug}`} className="rounded-xl border border-border bg-card p-3 hover:border-accent-blue/40 transition-colors flex items-center gap-3">
                    <ProviderLogo url={r.url} name={r.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm leading-tight truncate">{r.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 truncate">{r.tagline}</div>
                    </div>
                    <div className="flex items-center gap-0.5 text-[10px] shrink-0">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {r.rating.toFixed(1)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-4 lg:sticky lg:top-20 h-fit">
          {/* CTA wiederholen für Sticky */}
          <a href={p.url} target="_blank" rel="noreferrer" className="block">
            <Button className="w-full" size="lg">
              Zum Anbieter <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>

          {/* Quick-Links */}
          {p.links && p.links.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Direkt-Links</div>
              <ul className="space-y-1.5 text-sm">
                {p.links.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline inline-flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" /> {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rechtsseiten */}
          {hasAnyLegal && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Rechtliches</div>
              <ul className="space-y-1.5 text-xs">
                {legalImpressum && (
                  <li>
                    <a href={legalImpressum} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline inline-flex items-center gap-1.5">
                      <FileText className="h-3 w-3" /> Impressum
                    </a>
                  </li>
                )}
                {legalTerms && (
                  <li>
                    <a href={legalTerms} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline inline-flex items-center gap-1.5">
                      <Scale className="h-3 w-3" /> AGB / Terms
                    </a>
                  </li>
                )}
                {legalPrivacy && (
                  <li>
                    <a href={legalPrivacy} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline inline-flex items-center gap-1.5">
                      <ShieldCheck className="h-3 w-3" /> Datenschutz
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
