import { useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle2, XCircle, AlertCircle, ExternalLink, Loader2, Tag, Globe, AtSign, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DomainResult {
  tld: string;
  fullDomain: string;
  available: boolean | null; // legacy "null" Support für ältere Edge-Function-Versionen
  registrar?: string;
  expirationDate?: string;
  label: string;
  actionUrl?: string;
  source?: string;
}

/** Frontend-Fallback wenn Edge Function actionUrl noch nicht zurückgibt. */
function buildActionUrl(d: DomainResult): string {
  if (d.actionUrl) return d.actionUrl;
  if (d.available) {
    return `https://www.inwx.de/de/domain/check#search=${encodeURIComponent(d.fullDomain)}`;
  }
  return `https://${d.fullDomain}`;
}

interface TrademarkHit {
  name: string;
  office: string;
  applicationNumber?: string;
  classes?: string[];
  status?: string;
  applicant?: string;
  searchUrl: string;
}

interface TrademarkResult {
  query: string;
  totalHits: number | null;
  hits: TrademarkHit[];
  searchLinks: { label: string; url: string }[];
}

interface SocialResult {
  platform: string;
  handle: string;
  url: string;
  status: "available" | "taken" | "unknown";
}

interface AppStoreHit {
  store: string;
  appName: string;
  developer?: string;
  bundleId?: string;
  url: string;
  iconUrl?: string;
}

interface AppStoreResult {
  query: string;
  appleHits: AppStoreHit[];
  appleTotal: number | null;
  googleSearchUrl: string;
}

interface CheckResult {
  query: string;
  sanitized: string;
  domains: DomainResult[];
  socials?: SocialResult[];
  appStore?: AppStoreResult;
  trademarks: TrademarkResult;
  timestamp: string;
}

const DomainBadge = ({ d }: { d: DomainResult }) => {
  // Wenn die Edge Function noch null zurückgibt (Backend nicht aktuell), behandle als unsicher → "vergeben" als Default
  const isAvailable = d.available === true;
  const isTaken = d.available === false || d.available === null;
  const url = buildActionUrl(d);

  if (isAvailable) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 p-3 block transition-colors group cursor-pointer"
      >
        <div className="flex items-center justify-between gap-2 mb-1">
          <code className="font-mono text-sm font-bold">{d.fullDomain}</code>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 px-2 py-0.5 text-[11px] font-semibold">
            <CheckCircle2 className="h-3 w-3" /> Verfügbar
          </span>
        </div>
        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
          <span>{d.label}</span>
          <span className="text-accent-blue ml-auto opacity-70 group-hover:opacity-100 transition-opacity inline-flex items-center gap-0.5">
            Bei INWX kaufen <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </a>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="rounded-xl border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/50 p-3 block transition-colors group cursor-pointer"
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <code className="font-mono text-sm font-bold">{d.fullDomain}</code>
        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 text-red-600 px-2 py-0.5 text-[11px] font-semibold">
          <XCircle className="h-3 w-3" /> Vergeben
        </span>
      </div>
      <div className="text-[11px] text-muted-foreground flex items-center gap-1">
        <span className="truncate">
          {d.label}
          {d.registrar && ` · ${d.registrar}`}
          {d.expirationDate && ` · läuft ab ${new Date(d.expirationDate).toLocaleDateString("de-DE")}`}
        </span>
        <span className="text-accent-blue ml-auto opacity-70 group-hover:opacity-100 transition-opacity shrink-0 inline-flex items-center gap-0.5">
          Live ansehen <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
};

const TrademarkHitCard = ({ hit }: { hit: TrademarkHit }) => (
  <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-3">
    <div className="flex items-start justify-between gap-2 mb-2">
      <div>
        <div className="font-semibold text-sm">{hit.name}</div>
        <div className="text-[11px] text-muted-foreground">
          {hit.office}
          {hit.applicationNumber && ` · ${hit.applicationNumber}`}
        </div>
      </div>
      {hit.status && (
        <span className="rounded-full bg-orange-500/15 text-orange-700 px-2 py-0.5 text-[10px] font-semibold uppercase">
          {hit.status}
        </span>
      )}
    </div>
    {hit.classes && hit.classes.length > 0 && (
      <div className="text-[11px] mb-1">
        <span className="text-muted-foreground">Klassen: </span>
        <span className="font-mono">{hit.classes.join(", ")}</span>
      </div>
    )}
    {hit.applicant && <div className="text-[11px] text-muted-foreground mb-1">Inhaber: {hit.applicant}</div>}
    <a
      href={hit.searchUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-1 text-[11px] text-accent-blue hover:underline"
    >
      Detail im Register <ExternalLink className="h-3 w-3" />
    </a>
  </div>
);

const BrandCheck = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runCheck = async () => {
    if (!name.trim() || name.trim().length < 2) {
      setError("Bitte mindestens 2 Zeichen eingeben.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("check-brand", {
        body: { name: name.trim() },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setResult(data as CheckResult);
    } catch (e: any) {
      setError(e?.message || "Check fehlgeschlagen. Bitte später nochmal versuchen.");
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") runCheck();
  };

  const availableCount = result?.domains.filter((d) => d.available === true).length ?? 0;
  const takenCount = result?.domains.filter((d) => d.available === false).length ?? 0;
  const tmCount = result?.trademarks.totalHits ?? null;
  const socialAvailable = result?.socials?.filter((s) => s.status === "available").length ?? 0;
  const socialTaken = result?.socials?.filter((s) => s.status === "taken").length ?? 0;
  const appCount = result?.appStore?.appleTotal ?? null;

  return (
    <CockpitShell
      eyebrow="Brand-Check"
      title="Domain + Marken-Check"
      subtitle="Bevor du Geld in einen Markennamen investierst: prüfe in einem Schritt, ob Domain frei ist und ob es bereits eingetragene ähnliche Marken bei DPMA, EUIPO oder TMView gibt."
    >
      {/* Eingabe */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Marken-/Firmenname</label>
        <div className="flex gap-2 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={onKey}
              placeholder="z.B. cerise, fyrst, kreya"
              className="pl-9 h-11"
              autoFocus
            />
          </div>
          <button
            onClick={runCheck}
            disabled={loading}
            className="rounded-lg bg-accent-blue text-primary-foreground px-5 h-11 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity inline-flex items-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Prüfe..." : "Check starten"}
          </button>
        </div>
        <div className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
          Geprüft werden: 8 Domains (.de, .com, .net, .io, .shop, .co, .app, .store) via RDAP · 5 Social-Handles (IG, TikTok, YouTube, X, GitHub) ·
          Apple App Store (iTunes Search API) · EU-Marken via TMView (EUIPO + DPMA). Umlaute werden konvertiert (ä→ae, ö→oe, ü→ue, ß→ss).
        </div>
        {error && (
          <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-600">{error}</div>
        )}
      </div>

      {/* Result */}
      {result && (
        <>
          {/* Übersicht */}
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-2">Schnell-Übersicht</div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              <div>
                <div className="text-[11px] text-muted-foreground">Name</div>
                <div className="font-mono font-bold truncate">{result.query}</div>
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground">Domains</div>
                <div className="font-bold text-xs">
                  <span className="text-emerald-600">{availableCount} frei</span> ·{" "}
                  <span className="text-red-600">{takenCount} vergeben</span>
                </div>
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground">Social-Handles</div>
                <div className="font-bold text-xs">
                  <span className="text-emerald-600">{socialAvailable} frei</span> ·{" "}
                  <span className="text-red-600">{socialTaken} vergeben</span>
                </div>
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground">App-Store</div>
                <div className="font-bold text-xs">
                  {appCount === null ? (
                    <span className="text-amber-700">offline</span>
                  ) : appCount === 0 ? (
                    <span className="text-emerald-600">0 Apps</span>
                  ) : (
                    <span className="text-orange-600">{appCount} Apps</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground">Marken</div>
                <div className="font-bold text-xs">
                  {tmCount === null ? (
                    <span className="text-amber-700">offline</span>
                  ) : tmCount === 0 ? (
                    <span className="text-emerald-600">0 Treffer</span>
                  ) : (
                    <span className="text-orange-600">{tmCount} Treffer</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Domains */}
          <div className="mb-6">
            <h2 className="text-base font-bold mb-3 flex items-center gap-2">
              <Globe className="h-4 w-4" /> Domain-Verfügbarkeit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {result.domains.map((d) => (
                <DomainBadge key={d.tld} d={d} />
              ))}
            </div>
            <div className="text-[11px] text-muted-foreground mt-2">
              Quelle: DNS-over-HTTPS (Google + Cloudflare als Fallback) für Verfügbarkeit · RDAP für Registrar-/Ablauf-Details. Klick öffnet bei Verfügbar einen Bestell-Link bei INWX, bei Vergeben die Live-URL der Domain.
            </div>
          </div>

          {/* Social-Handles */}
          {result.socials && result.socials.length > 0 && (
            <div className="mb-6">
              <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                <AtSign className="h-4 w-4" /> Social-Handles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {result.socials.map((s) => {
                  const isAvailable = s.status === "available";
                  const isTaken = s.status === "taken";
                  // Bei unknown: NEUTRAL zeigen — keine Falschaussage, User klickt selbst zum Profil
                  return (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`rounded-xl border p-3 hover:opacity-80 transition-opacity block cursor-pointer ${
                        isAvailable
                          ? "border-emerald-500/30 bg-emerald-500/5"
                          : isTaken
                          ? "border-red-500/30 bg-red-500/5"
                          : "border-border bg-secondary/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <code className="font-mono text-sm font-bold">@{s.handle}</code>
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 px-2 py-0.5 text-[11px] font-semibold">
                            <CheckCircle2 className="h-3 w-3" /> Frei
                          </span>
                        ) : isTaken ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 text-red-600 px-2 py-0.5 text-[11px] font-semibold">
                            <XCircle className="h-3 w-3" /> Vergeben
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[11px] font-semibold">
                            <ExternalLink className="h-3 w-3" /> Bitte klicken
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {s.platform}
                        {!isAvailable && !isTaken && " · Plattform geblockt – manuell prüfen"}
                      </div>
                    </a>
                  );
                })}
              </div>
              <div className="text-[11px] text-muted-foreground mt-2">
                Klick öffnet die Profil-URL. Status = harte Prüfung pro Plattform-API (GitHub REST · Instagram Web-Profile-API · TikTok HTML · YouTube · Twitter Syndication).
              </div>
            </div>
          )}

          {/* App-Store */}
          {result.appStore && (
            <div className="mb-6">
              <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                <Smartphone className="h-4 w-4" /> App-Store-Namen
              </h2>
              {result.appStore.appleHits.length === 0 ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-emerald-700 mb-2">
                  ✓ Keine Apps in Apple App Store gefunden mit diesem Namen.
                </div>
              ) : (
                <>
                  <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-3 text-xs text-orange-800 mb-2">
                    <strong>{result.appStore.appleTotal}</strong> Apple-Treffer (Top 10 unten). Wenn du eine App mit ähnlichem
                    Namen planst, prüfe Markenrechte.
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {result.appStore.appleHits.map((h, i) => (
                      <a
                        key={i}
                        href={h.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="rounded-xl border border-border bg-card p-3 hover:border-accent-blue/40 transition-colors flex items-center gap-3"
                      >
                        {h.iconUrl && (
                          <img src={h.iconUrl} alt="" className="h-10 w-10 rounded-lg shrink-0" />
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold text-sm truncate">{h.appName}</div>
                          <div className="text-[11px] text-muted-foreground truncate">
                            {h.developer} · {h.bundleId}
                          </div>
                        </div>
                        <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0 ml-auto" />
                      </a>
                    ))}
                  </div>
                </>
              )}
              <div className="flex gap-2">
                <a
                  href={result.appStore.googleSearchUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-[11px] hover:bg-secondary/80"
                >
                  Google Play manuell prüfen <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href={`https://apps.apple.com/de/search?term=${encodeURIComponent(result.query)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-[11px] hover:bg-secondary/80"
                >
                  Apple App Store öffnen <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="text-[11px] text-muted-foreground mt-2">
                Apple via iTunes Search API · Google Play hat keine öffentliche API mehr → manuelle Prüfung via Such-Link.
              </div>
            </div>
          )}

          {/* Trademarks */}
          <div className="mb-6">
            <h2 className="text-base font-bold mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" /> Marken-Treffer (DPMA + EUIPO via TMView)
            </h2>
            {result.trademarks.totalHits === null && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-800 mb-3">
                <div className="font-semibold mb-1">TMView-API gerade nicht erreichbar.</div>
                <div className="text-xs leading-relaxed">
                  Prüfe manuell über die Such-Links unten. Das passiert ab und zu — TMView ist die offizielle EUIPO-API,
                  aber rate-limited.
                </div>
              </div>
            )}
            {result.trademarks.totalHits === 0 && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-emerald-700 mb-3">
                <div className="font-semibold mb-1">✓ Keine Treffer in DPMA + EUIPO Verbal-Suche.</div>
                <div className="text-xs leading-relaxed">
                  Trotzdem zusätzlich phonetische Ähnlichkeitssuche durchführen — Markenrecht prüft auch ähnlich
                  klingende Namen (z.B. „Krea" ähnlich „Kreya"). Such-Links unten.
                </div>
              </div>
            )}
            {result.trademarks.hits.length > 0 && (
              <>
                <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-3 text-xs text-orange-800 mb-3">
                  <strong>{result.trademarks.totalHits} bestehende Marke(n)</strong> mit deinem Wunschnamen gefunden.
                  Lass das von einem Anwalt für gewerblichen Rechtsschutz checken bevor du anmeldest – Konflikt =
                  3-monatiger Widerspruch + ggf. Löschung deiner Marke.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  {result.trademarks.hits.map((hit, i) => (
                    <TrademarkHitCard key={i} hit={hit} />
                  ))}
                </div>
              </>
            )}
            <div className="text-xs">
              <div className="font-semibold mb-1">Manuelle Such-Links:</div>
              <div className="flex flex-wrap gap-2">
                {result.trademarks.searchLinks.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-[11px] hover:bg-secondary/80"
                  >
                    {l.label} <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Empfehlung */}
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
            <h2 className="text-base font-bold mb-2">Empfehlung</h2>
            <div className="text-sm leading-relaxed space-y-2">
              {availableCount >= 2 && tmCount === 0 && (
                <p className="text-emerald-700">
                  ✓ Gute Ausgangslage: <strong>{availableCount} Domains frei</strong> und keine direkten Marken-Treffer.
                  Nächste Schritte:{" "}
                  <Link to="/playbook/marke-anmelden" className="underline font-semibold">
                    Marke anmelden
                  </Link>{" "}
                  + Domains gleich heute kaufen.
                </p>
              )}
              {(availableCount < 2 || (tmCount && tmCount > 0)) && (
                <p className="text-amber-700">
                  ⚠ Vorsichtig: {availableCount < 2 && `nur ${availableCount} freie Domain. `}
                  {tmCount && tmCount > 0 && `${tmCount} bestehende Marke(n). `}
                  Erwäge Namens-Variation oder Anwalts-Recherche bevor du Geld in Branding investierst.
                </p>
              )}
              <p className="text-muted-foreground text-xs">
                Disclaimer: kein Anspruch auf Vollständigkeit. Markenrecht ist komplex (phonetische Ähnlichkeit,
                Klassen-Ähnlichkeit, ältere Rechte). Bei kommerziellem Brand-Launch immer Anwalt für gewerblichen
                Rechtsschutz konsultieren.
              </p>
            </div>
          </div>
        </>
      )}

      {!result && !loading && (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Gib einen Wunsch-Markennamen ein und drücke „Check starten".
        </div>
      )}
    </CockpitShell>
  );
};

export default BrandCheck;
