import { useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Callout, EmptyState, Field, ResultPanel, ToneBadge, ToolSection } from "@/components/cockpit/kit";
import { Search, CheckCircle2, XCircle, ExternalLink, Loader2, Tag, Globe, AtSign, Smartphone, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { TrialResult, useToolTrial } from "@/components/freetools/ToolTrial";

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
    return `https://www.ionos.de/domains/domain-check?domainname=${encodeURIComponent(d.fullDomain)}`;
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
  source?: string;
  sourceStatus?: { tmview: string; dpma: string; wipo: string; euipo?: string };
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

const linkPill =
  "inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/25";
const linkPillPrimary =
  "inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90";

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
        className="group block rounded-xl border border-success/25 bg-success-soft p-3.5 transition-colors hover:border-success/50"
      >
        <div className="mb-1 flex items-center justify-between gap-2">
          <code className="truncate font-mono text-sm font-semibold">{d.fullDomain}</code>
          <ToneBadge tone="success">
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> Verfügbar
          </ToneBadge>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>{d.label}</span>
          <span className="ml-auto inline-flex items-center gap-0.5 text-accent-blue opacity-80 transition-opacity group-hover:opacity-100">
            Bei IONOS kaufen <ExternalLink className="h-3 w-3" aria-hidden="true" />
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
      className="group block rounded-xl border border-danger/25 bg-danger-soft p-3.5 transition-colors hover:border-danger/50"
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <code className="truncate font-mono text-sm font-semibold">{d.fullDomain}</code>
        <ToneBadge tone="danger">
          <XCircle className="h-3 w-3" aria-hidden="true" /> Vergeben
        </ToneBadge>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <span className="truncate">
          {d.label}
          {d.registrar && ` · ${d.registrar}`}
          {d.expirationDate && ` · läuft ab ${new Date(d.expirationDate).toLocaleDateString("de-DE")}`}
        </span>
        <span className="ml-auto inline-flex shrink-0 items-center gap-0.5 text-accent-blue opacity-80 transition-opacity group-hover:opacity-100">
          Live ansehen <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
};

const TrademarkHitCard = ({ hit }: { hit: TrademarkHit }) => (
  <div className="rounded-xl border border-warning/25 bg-warning-soft p-3.5">
    <div className="mb-2 flex items-start justify-between gap-2">
      <div className="min-w-0">
        <div className="text-sm font-semibold">{hit.name}</div>
        <div className="text-xs text-muted-foreground">
          {hit.office}
          {hit.applicationNumber && ` · ${hit.applicationNumber}`}
        </div>
      </div>
      {hit.status && <ToneBadge tone="warning">{hit.status}</ToneBadge>}
    </div>
    {hit.classes && hit.classes.length > 0 && (
      <div className="mb-1 text-xs">
        <span className="text-muted-foreground">Klassen: </span>
        <span className="font-mono">{hit.classes.join(", ")}</span>
      </div>
    )}
    {hit.applicant && <div className="mb-1 text-xs text-muted-foreground">Inhaber: {hit.applicant}</div>}
    <a
      href={hit.searchUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:underline"
    >
      Detail im Register <ExternalLink className="h-3 w-3" aria-hidden="true" />
    </a>
  </div>
);

const BrandCheck = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Nur auf der öffentlichen Probier-Seite gesetzt, im Cockpit null.
  const trial = useToolTrial();

  const runCheck = async () => {
    if (!name.trim() || name.trim().length < 2) {
      setError("Bitte mindestens 2 Zeichen eingeben.");
      return;
    }
    if (trial && !trial.beforeRun()) return;
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


  const dpmaUrl = (q: string) => `https://register.dpma.de/DPMAregister/marke/trefferliste?queryString=${encodeURIComponent(q)}`;
  const tmviewUrl = (q: string) => `https://www.tmdn.org/tmview/#/tmview/results?text=${encodeURIComponent(q)}`;

  return (
    <CockpitShell
      eyebrow="Brand-Check"
      title="Domain- und Marken-Check"
      subtitle="Bevor du Geld in einen Markennamen investierst: Prüfe in einem Schritt, ob die Domains frei sind und ob es bei DPMA, EUIPO oder TMView schon ähnliche eingetragene Marken gibt."
    >
      <ToolSection title="Namen prüfen" icon={Search} className="mb-6">
        <Field
          label="Marken- oder Firmenname"
          htmlFor="brand-name"
          hint="Umlaute werden umgewandelt (ä zu ae, ö zu oe, ü zu ue, ß zu ss)."
          error={error ?? undefined}
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                id="brand-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={onKey}
                placeholder="z. B. cerise, fyrst, kreya"
                className="h-11 pl-9"
                autoFocus
              />
            </div>
            <Button onClick={runCheck} disabled={loading} className="press h-11 rounded-xl bg-gradient-primary px-6">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              {loading ? "Prüfe …" : "Check starten"}
            </Button>
          </div>
        </Field>
        <ul className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
          {[
            { i: Globe, t: "8 Domains (.de, .com, .net, .io, .shop, .co, .app, .store) per RDAP" },
            { i: AtSign, t: "5 Social-Handles: Instagram, TikTok, YouTube, X, GitHub" },
            { i: Smartphone, t: "Apple App Store (iTunes Search API)" },
            { i: Tag, t: "EU-Marken über TMView (EUIPO und DPMA)" },
          ].map(({ i: I, t }) => (
            <li key={t} className="flex items-start gap-2">
              <I className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </ToolSection>

      {loading && (
        <div className="space-y-4" aria-busy="true" aria-label="Prüfung läuft …">
          <div className="h-28 animate-pulse rounded-2xl bg-secondary" />
          <div className="grid gap-2 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-secondary/70" />
            ))}
          </div>
        </div>
      )}

      {result && (
        <TrialResult>
          <ResultPanel variant="ink" kicker="Schnell-Übersicht" title={<span className="break-all font-mono">{result.query}</span>} className="mb-6">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 md:grid-cols-4">
              {[
                { l: "Domains", v: `${availableCount} frei · ${takenCount} vergeben` },
                { l: "Social-Handles", v: `${socialAvailable} frei · ${socialTaken} vergeben` },
                { l: "App Store", v: appCount === null ? "nicht erreichbar" : `${appCount} Apps` },
                { l: "Marken", v: tmCount === null ? "nicht erreichbar" : `${tmCount} Treffer` },
              ].map((k) => (
                <div key={k.l} className="bg-white/[0.04] p-3">
                  <div className="text-xs text-primary-foreground/65">{k.l}</div>
                  <div className="mt-0.5 text-sm font-semibold text-primary-foreground tabular">{k.v}</div>
                </div>
              ))}
            </div>
          </ResultPanel>

          <ToolSection
            title="Domain-Verfügbarkeit"
            icon={Globe}
            className="mb-6"
            actions={
              <ToneBadge tone={availableCount > 0 ? "success" : "danger"}>
                {availableCount} von {result.domains.length} frei
              </ToneBadge>
            }
          >
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {result.domains.map((d) => (
                <DomainBadge key={d.tld} d={d} />
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Quelle: DNS-over-HTTPS (Google, Cloudflare als Fallback) für die Verfügbarkeit, RDAP für Registrar und Ablaufdatum.
              Ein Klick öffnet bei freien Domains den Bestell-Link bei IONOS, bei vergebenen die Live-Seite.
            </p>
          </ToolSection>

          {result.socials && result.socials.length > 0 && (
            <ToolSection title="Social-Handles" icon={AtSign} className="mb-6">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
                      className={`block rounded-xl border p-3.5 transition-colors ${
                        isAvailable
                          ? "border-success/25 bg-success-soft hover:border-success/50"
                          : isTaken
                          ? "border-danger/25 bg-danger-soft hover:border-danger/50"
                          : "border-border bg-secondary/50 hover:border-foreground/25"
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <code className="truncate font-mono text-sm font-semibold">@{s.handle}</code>
                        {isAvailable ? (
                          <ToneBadge tone="success">
                            <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> Frei
                          </ToneBadge>
                        ) : isTaken ? (
                          <ToneBadge tone="danger">
                            <XCircle className="h-3 w-3" aria-hidden="true" /> Vergeben
                          </ToneBadge>
                        ) : (
                          <ToneBadge tone="neutral">
                            <ExternalLink className="h-3 w-3" aria-hidden="true" /> Selbst prüfen
                          </ToneBadge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {s.platform}
                        {!isAvailable && !isTaken && " · Plattform blockt die Abfrage, bitte manuell prüfen"}
                      </div>
                    </a>
                  );
                })}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Ein Klick öffnet die Profil-URL. Der Status kommt aus einer direkten Prüfung je Plattform (GitHub REST, Instagram
                Web-Profile-API, TikTok HTML, YouTube, Twitter Syndication).
              </p>
            </ToolSection>
          )}

          {result.appStore && (
            <ToolSection title="App-Store-Namen" icon={Smartphone} className="mb-6">
              {result.appStore.appleHits.length === 0 ? (
                <Callout tone="success" className="mb-3">
                  Im Apple App Store gibt es keine App mit diesem Namen.
                </Callout>
              ) : (
                <>
                  <Callout tone="warning" className="mb-3">
                    <strong className="tabular">{result.appStore.appleTotal}</strong> Treffer bei Apple (die ersten 10 unten).
                    Planst du eine App mit ähnlichem Namen, prüfe die Markenrechte.
                  </Callout>
                  <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                    {result.appStore.appleHits.map((h, i) => (
                      <a
                        key={i}
                        href={h.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-accent-blue/40"
                      >
                        {h.iconUrl && <img src={h.iconUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg" />}
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold">{h.appName}</div>
                          <div className="truncate text-xs text-muted-foreground">
                            {h.developer} · {h.bundleId}
                          </div>
                        </div>
                        <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </>
              )}
              <div className="flex flex-wrap gap-2">
                <a href={result.appStore.googleSearchUrl} target="_blank" rel="noreferrer noopener" className={linkPill}>
                  Google Play manuell prüfen <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                <a
                  href={`https://apps.apple.com/de/search?term=${encodeURIComponent(result.query)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={linkPill}
                >
                  Apple App Store öffnen <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Apple über die iTunes Search API. Google Play hat keine öffentliche API mehr, daher der Such-Link zur manuellen Prüfung.
              </p>
            </ToolSection>
          )}

          <ToolSection title="Marken-Treffer (DPMA, EUIPO, WIPO)" icon={Tag} className="mb-6">
            {(() => {
              const tm = result.trademarks;
              const ss = tm.sourceStatus;
              const okSources = ss ? Object.entries(ss).filter(([, v]) => v === "ok").map(([k]) => k.toUpperCase()) : [];
              const failSources = ss ? Object.entries(ss).filter(([, v]) => v === "fail").map(([k]) => k.toUpperCase()) : [];
              const totalSources = ss ? Object.keys(ss).length : 0;
              const allFailed = ss && failSources.length === totalSources;
              const partialOk = ss && okSources.length > 0 && failSources.length > 0;

              if (tm.totalHits === null || allFailed) {
                return (
                  <Callout tone="warning" title="Marken-Register gerade nicht erreichbar" className="mb-4">
                    <p>
                      Keine Quelle hat geantwortet. <strong>Das heißt nicht, dass keine Marken existieren.</strong> Prüfe direkt
                      im Register:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a href={dpmaUrl(result.query)} target="_blank" rel="noreferrer noopener" className={linkPillPrimary}>
                        DPMA-Trefferliste öffnen <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                      <a href={tmviewUrl(result.query)} target="_blank" rel="noreferrer noopener" className={linkPill}>
                        TMView öffnen <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                      <a
                        href={`https://branddb.wipo.int/en/quicksearch/results?fq=brandName:${encodeURIComponent(result.query)}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={linkPill}
                      >
                        WIPO Brand DB <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                  </Callout>
                );
              }
              if (tm.totalHits === 0 && partialOk) {
                return (
                  <Callout tone="warning" title="Nur teilweise geprüft, kein abschließendes Urteil" className="mb-4">
                    <p>
                      Erreichbar: <strong>{okSources.join(", ")}</strong> · Nicht erreichbar: <strong>{failSources.join(", ")}</strong>.
                      In den erreichbaren Quellen gibt es 0 Treffer, ohne {failSources.join("/")} lässt sich das aber nicht
                      endgültig bestätigen.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a href={dpmaUrl(result.query)} target="_blank" rel="noreferrer noopener" className={linkPillPrimary}>
                        DPMA-Trefferliste öffnen <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                      <a href={tmviewUrl(result.query)} target="_blank" rel="noreferrer noopener" className={linkPill}>
                        TMView öffnen <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                  </Callout>
                );
              }
              if (tm.totalHits === 0) {
                return (
                  <Callout tone="success" title="Keine Treffer in TMView, DPMA, EUIPO und WIPO" className="mb-4">
                    <p>
                      Mach trotzdem eine phonetische Ähnlichkeitssuche: Das Markenrecht prüft auch ähnlich klingende Namen
                      (z. B. „Krea“ und „Kreya“).
                    </p>
                    <div className="mt-3">
                      <a href={dpmaUrl(result.query)} target="_blank" rel="noreferrer noopener" className={linkPill}>
                        Bei DPMA verifizieren <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                  </Callout>
                );
              }
              return null;
            })()}
            {result.trademarks.hits.length > 0 && (
              <>
                <Callout tone="warning" className="mb-3">
                  <strong className="tabular">{result.trademarks.totalHits} bestehende Marke(n)</strong> mit deinem Wunschnamen
                  gefunden. Lass das vor der Anmeldung von einer Anwältin oder einem Anwalt für gewerblichen Rechtsschutz prüfen:
                  Ein Konflikt bedeutet 3 Monate Widerspruchsfrist und gegebenenfalls die Löschung deiner Marke.
                </Callout>
                <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                  {result.trademarks.hits.map((hit, i) => (
                    <TrademarkHitCard key={i} hit={hit} />
                  ))}
                </div>
              </>
            )}
            <p className="mb-2 text-sm font-medium">Manuelle Such-Links</p>
            <div className="flex flex-wrap gap-2">
              {result.trademarks.searchLinks.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer noopener" className={linkPill}>
                  {l.label} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              ))}
            </div>
          </ToolSection>

          <ToolSection title="Empfehlung" icon={Lightbulb}>
            {(() => {
              const ss = result.trademarks.sourceStatus;
              const totalSources = ss ? Object.keys(ss).length : 0;
              const failedSources = ss ? Object.entries(ss).filter(([, v]) => v === "fail").map(([k]) => k.toUpperCase()) : [];
              const allMarkenSourcesFailed = totalSources > 0 && failedSources.length === totalSources;
              const partialMarkenCheck = failedSources.length > 0 && failedSources.length < totalSources;
              const hasMarkenHits = (tmCount ?? 0) > 0;
              const allDomainsTaken = takenCount === result.domains.length;
              const allDomainsFree = availableCount === result.domains.length;
              const markeLink = (txt: string) => (
                <Link to="/playbook/marke-anmelden" className="font-semibold text-accent-blue underline underline-offset-2">
                  {txt}
                </Link>
              );

              // Fall 1: Marken-Treffer existieren → Konflikt-Warnung
              if (hasMarkenHits) {
                if (allDomainsTaken) {
                  return (
                    <Callout tone="info" title={`${tmCount} Marken-Treffer, alle Domains vergeben`}>
                      Wahrscheinlich gehört dieser Name schon jemandem (oder dir selbst). Ist es deine Marke, ist alles in Ordnung.
                      Sonst Finger weg: Das Konflikt-Risiko ist hoch.
                    </Callout>
                  );
                }
                return (
                  <Callout tone="warning" title={`${tmCount} bestehende Marken-Treffer für „${result.query}“`}>
                    Nicht ohne anwaltliche Recherche launchen. Verwechslungsgefahr nach § 14 MarkenG kann Abmahnung und
                    Unterlassung kosten (typisch 3.000 bis 10.000 € Anwaltskosten plus Schadenersatz).
                  </Callout>
                );
              }

              // Fall 2: Alle Marken-Quellen offline → können nichts sagen
              if (allMarkenSourcesFailed) {
                return (
                  <Callout tone="warning" title="Keine belastbare Aussage zu Marken-Konflikten möglich">
                    Alle 3 Marken-Quellen sind gerade nicht erreichbar. Prüfe den Namen über die Such-Links oben, bevor du Geld
                    ins Branding steckst.
                  </Callout>
                );
              }

              // Fall 3: Teilweise geprüft (z.B. nur DPMA, keine TMVIEW/WIPO)
              if (partialMarkenCheck) {
                return (
                  <Callout tone="warning" title="Marken-Check nur teilweise">
                    Nicht erreichbar: <strong>{failedSources.join(", ")}</strong>. In den erreichbaren Quellen gibt es 0 Treffer,
                    aber {failedSources.includes("TMVIEW") ? "TMView (EU-weit) " : ""}
                    {failedSources.includes("WIPO") ? "WIPO (international) " : ""}
                    konnte nicht geprüft werden. Prüfe über die Such-Links oben, bevor du dich auf den Namen festlegst.
                  </Callout>
                );
              }

              // Fall 4: Marken sauber + Domains
              if (availableCount >= 4 && tmCount === 0) {
                return (
                  <Callout tone="success" title={`${availableCount} von ${result.domains.length} Domains frei, keine Marken-Treffer`}>
                    Solide Ausgangslage (geprüft in TMView, DPMA und WIPO). Nächste Schritte: {markeLink("Marke anmelden")} und
                    die Domains zeitnah sichern, mindestens .de und .com.
                  </Callout>
                );
              }
              if (allDomainsFree && tmCount === 0) {
                return (
                  <Callout tone="success" title="Alle Domains frei, keine Marken-Treffer">
                    Fast zu schön. Mach einen Doppel-Check über die Such-Links und dann: {markeLink("Marke anmelden")}.
                  </Callout>
                );
              }
              if (availableCount >= 2 && tmCount === 0) {
                return (
                  <Callout tone="success" title={`${availableCount} Domains frei, keine Marken-Treffer`}>
                    Brauchbar. Prüfe, ob die wichtigen Endungen (.de, .com) unter den freien sind, dann: {markeLink("Marke anmelden")}.
                  </Callout>
                );
              }
              // Wenige freie Domains
              return (
                <Callout tone="warning" title={`Nur ${availableCount} von ${result.domains.length} Domains frei${tmCount === 0 ? " (Marken sauber)" : ""}`}>
                  Überleg dir eine Namens-Variante: Knappe Domains erschweren das Online-Marketing.
                </Callout>
              );
            })()}
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Ohne Anspruch auf Vollständigkeit. Markenrecht ist komplex (phonetische Ähnlichkeit, Klassen-Ähnlichkeit, ältere
              Rechte). Vor einem kommerziellen Launch immer eine Anwältin oder einen Anwalt für gewerblichen Rechtsschutz fragen.
            </p>
          </ToolSection>
        </TrialResult>
      )}

      {!result && !loading && (
        <EmptyState
          icon={Tag}
          title="Noch kein Name geprüft"
          description="Gib oben deinen Wunsch-Markennamen ein und starte den Check. Du siehst danach Domains, Social-Handles, App Store und Marken-Treffer auf einen Blick."
        />
      )}
    </CockpitShell>
  );
};

export default BrandCheck;
