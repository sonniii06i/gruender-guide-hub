import { Link, useParams } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, AlertCircle, Star, Tag, ExternalLink, MessageSquare, Scale, FileText, ShieldCheck } from "lucide-react";
import { PROVIDERS, type Provider } from "./Anbieter";

const AnbieterDetail = () => {
  const { slug } = useParams();
  const p = PROVIDERS.find((x) => x.slug === slug);

  if (!p) {
    return (
      <CockpitShell eyebrow="404" title="Anbieter nicht gefunden">
        <Link to="/anbieter" className="text-accent-blue hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Zurück zum Vergleich
        </Link>
      </CockpitShell>
    );
  }

  // Andere Anbieter aus derselben Kategorie als "Alternativen" anzeigen
  const related = PROVIDERS.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);

  // Fallback-Legal-Links über Heuristik (Domain + /impressum etc.)
  const baseDomain = (() => {
    try { return new URL(p.url).origin; } catch { return p.url; }
  })();
  const legalImpressum = p.legal?.impressum ?? `${baseDomain}/impressum`;
  const legalTerms = p.legal?.terms ?? `${baseDomain}/agb`;
  const legalPrivacy = p.legal?.privacy ?? `${baseDomain}/datenschutz`;

  return (
    <CockpitShell
      eyebrow={`🏆 ${p.category}`}
      title={p.name}
      subtitle={p.tagline}
    >
      <Link to="/anbieter" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Zurück zur Vergleichs-Engine
      </Link>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Hauptspalte */}
        <div className="space-y-6">
          {/* Brand-Header */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-1">{p.category} · {p.region}</div>
                <h2 className="text-2xl font-bold">{p.name}</h2>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold rounded-lg bg-yellow-50 text-yellow-700 px-3 py-1.5 dark:bg-yellow-950/30 dark:text-yellow-300">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {p.rating.toFixed(1)} / 5
              </div>
            </div>

            {p.fullDescription ? (
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.fullDescription}</p>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.tagline}</p>
            )}

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-secondary px-3 py-1">
                <strong>Ab:</strong> {p.starting}
              </span>
              {p.signupTime && (
                <span className="rounded-full bg-secondary px-3 py-1 inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {p.signupTime}
                </span>
              )}
              {p.monthlyMin && (
                <span className="rounded-full bg-warning/10 text-warning-foreground border border-warning/30 px-3 py-1 inline-flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {p.monthlyMin}
                </span>
              )}
            </div>
          </div>

          {/* Coop-Deal prominent */}
          {p.coop && (
            <div className="rounded-2xl border-2 border-accent-blue bg-accent-blue/5 p-5">
              <div className="flex items-start gap-3">
                <Tag className="h-5 w-5 text-accent-blue mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent-blue mb-1">Coop-Deal für GründerX-Mitglieder</div>
                  <div className="font-semibold mb-2">{p.coop.text}</div>
                  {p.coop.code && (
                    <div className="rounded-lg bg-card border border-border px-3 py-2 inline-block font-mono text-sm mb-2">
                      Code: <strong>{p.coop.code}</strong>
                    </div>
                  )}
                  {p.coop.expires && (
                    <div className="text-xs text-muted-foreground">gültig bis {p.coop.expires}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Pros / Cons */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="font-semibold text-success mb-2 text-sm">+ Stärken</div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {p.pros.map((s, i) => <li key={i} className="leading-snug">· {s}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="font-semibold text-destructive mb-2 text-sm">– Schwächen</div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {p.cons.map((s, i) => <li key={i} className="leading-snug">· {s}</li>)}
              </ul>
            </div>
          </div>

          {/* Forum-Notes / Reviews */}
          {p.forumNotes && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="font-semibold text-sm mb-2 inline-flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-accent-blue" /> Aus der Community (Reddit / E-Com-Foren)
              </div>
              <blockquote className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-accent-blue pl-3">
                {p.forumNotes}
              </blockquote>
              <div className="text-[10px] text-muted-foreground mt-3">
                Hinweis: Quellen-Aussagen aus r/Selbststaendig, r/ecommerce_de, DTC-Slack, Indie Hackers, Trustpilot. Vor Eröffnung selbst gegenchecken.
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-20 h-fit">
          {/* CTA */}
          <a href={p.url} target="_blank" rel="noreferrer" className="block">
            <Button className="w-full" size="lg">
              Zum Anbieter <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>

          {/* Quick-Links */}
          {p.links && p.links.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Direkt-Links</div>
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
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Rechtliches</div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href={legalImpressum} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline inline-flex items-center gap-1">
                  <FileText className="h-3 w-3" /> Impressum
                </a>
              </li>
              <li>
                <a href={legalTerms} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline inline-flex items-center gap-1">
                  <Scale className="h-3 w-3" /> AGB
                </a>
              </li>
              <li>
                <a href={legalPrivacy} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline inline-flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Datenschutz
                </a>
              </li>
            </ul>
            <div className="text-[10px] text-muted-foreground mt-2 italic">
              Heuristisch generiert — Pfade können beim Anbieter abweichen.
            </div>
          </div>

          {/* Alternativen */}
          {related.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Alternativen in {p.category}</div>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/anbieter/${r.slug}`} className="flex items-center justify-between text-sm hover:text-accent-blue transition-colors">
                      <span className="font-medium">{r.name}</span>
                      <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {r.rating.toFixed(1)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </CockpitShell>
  );
};

export default AnbieterDetail;
