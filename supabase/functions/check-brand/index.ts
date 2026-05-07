import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// TLDs zum Check + RDAP-Endpoint (für Detail-Daten wenn Domain registriert ist)
const TLD_CHECKS: { tld: string; endpoint: (name: string) => string; label: string }[] = [
  { tld: "de", endpoint: (n) => `https://rdap.denic.de/domain/${n}.de`, label: ".de (DENIC)" },
  { tld: "com", endpoint: (n) => `https://rdap.verisign.com/com/v1/domain/${n}.com`, label: ".com (Verisign)" },
  { tld: "net", endpoint: (n) => `https://rdap.verisign.com/net/v1/domain/${n}.net`, label: ".net (Verisign)" },
  { tld: "io", endpoint: (n) => `https://rdap.identitydigital.services/rdap/domain/${n}.io`, label: ".io (Identity Digital)" },
  { tld: "shop", endpoint: (n) => `https://rdap.gmoregistry.net/domain/${n}.shop`, label: ".shop (GMO)" },
  { tld: "co", endpoint: (n) => `https://rdap.nic.co/domain/${n}.co`, label: ".co (.CO Internet)" },
  { tld: "app", endpoint: (n) => `https://rdap.nic.google/domain/${n}.app`, label: ".app (Google)" },
  { tld: "store", endpoint: (n) => `https://rdap.centralnic.com/store/domain/${n}.store`, label: ".store (CentralNic)" },
];

// Bekannte TLDs die User typisch mit anhängt (auch mehr als die wir checken)
const KNOWN_TLDS = new Set([
  "de", "com", "net", "io", "shop", "co", "app", "store",
  "org", "eu", "at", "ch", "uk", "us", "fr", "it", "es", "nl", "be", "pl", "cz",
  "info", "biz", "me", "tv", "cc", "ly", "ai", "tech", "online", "site", "website",
  "fashion", "beauty", "health", "fit", "fitness", "club", "live", "studio",
]);

/** Strippe TLD-Suffix wenn der User z.B. "kreya.de" eingibt → "kreya". */
function stripTld(input: string): string {
  const lower = input.trim().toLowerCase();
  // Letzten Punkt finden — wenn was danach kommt das eine bekannte TLD ist, abschneiden
  const lastDot = lower.lastIndexOf(".");
  if (lastDot < 1) return lower;
  const candidateTld = lower.slice(lastDot + 1);
  if (KNOWN_TLDS.has(candidateTld)) {
    return lower.slice(0, lastDot);
  }
  return lower;
}

// Sanitizer: erlaubt nur kleinbuchstaben, ziffern, hyphen
function sanitize(input: string): string {
  return stripTld(input)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // diakritische Zeichen entfernen
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "")
    .slice(0, 63);
}

interface DomainResult {
  tld: string;
  fullDomain: string;
  available: boolean; // immer eindeutig (DNS ist authoritative)
  registrar?: string;
  expirationDate?: string;
  label: string;
  /** Such-/Kauf-URL bei verfügbar bzw. Live-URL bei vergeben (klickbar im UI). */
  actionUrl: string;
  /** Quelle der Entscheidung. */
  source: "dns" | "rdap" | "fallback";
}

/**
 * Authoritative Domain-Status über Google DNS-over-HTTPS.
 * - Status 0 + NS-Records → Domain ist registriert (vergeben)
 * - Status 3 (NXDOMAIN) → Domain ist NICHT registriert (frei)
 * Das ist 99.99 % zuverlässig — DNS ist die letzte Wahrheit.
 */
async function dnsLookupNS(fullDomain: string): Promise<{ registered: boolean } | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    const resp = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(fullDomain)}&type=NS`, {
      headers: { Accept: "application/dns-json" },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!resp.ok) return null;
    const data = await resp.json();
    // Status 3 = NXDOMAIN (Domain existiert nicht → frei)
    if (data?.Status === 3) return { registered: false };
    // Status 0 = NOERROR. Wenn Answer mit NS-Records → registriert.
    if (data?.Status === 0 && Array.isArray(data?.Answer) && data.Answer.length > 0) {
      return { registered: true };
    }
    // Keine NS-Records aber NOERROR — Domain existiert in Registry aber unparked. Trotzdem registriert.
    if (data?.Status === 0 && Array.isArray(data?.Authority) && data.Authority.length > 0) {
      // Authority-Abschnitt mit SOA → meist Domain unter Top-Level registriert
      // Wenn die SOA für die Domain selbst ist → registriert. Wenn für übergeordnete TLD → frei.
      const ownSoa = data.Authority.some((a: any) =>
        typeof a?.name === "string" && a.name.toLowerCase().replace(/\.$/, "") === fullDomain.toLowerCase(),
      );
      if (ownSoa) return { registered: true };
      return { registered: false };
    }
    return null;
  } catch {
    return null;
  }
}

/** Cloudflare-DNS als Fallback, falls Google-DNS down/blocked. */
async function dnsLookupNSCloudflare(fullDomain: string): Promise<{ registered: boolean } | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    const resp = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(fullDomain)}&type=NS`, {
      headers: { Accept: "application/dns-json" },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!resp.ok) return null;
    const data = await resp.json();
    if (data?.Status === 3) return { registered: false };
    if (data?.Status === 0 && Array.isArray(data?.Answer) && data.Answer.length > 0) return { registered: true };
    return null;
  } catch {
    return null;
  }
}

async function fetchRdapDetails(check: typeof TLD_CHECKS[0], fullDomain: string): Promise<{ registrar?: string; expirationDate?: string }> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    const resp = await fetch(check.endpoint(fullDomain.split(".")[0]), {
      headers: { Accept: "application/rdap+json", "User-Agent": "GruenderX-Brand-Check/1.0" },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!resp.ok) return {};
    const data = await resp.json();
    let registrar: string | undefined;
    let expirationDate: string | undefined;
    if (data.entities) {
      const reg = data.entities.find((e: any) => Array.isArray(e.roles) && e.roles.includes("registrar"));
      if (reg?.vcardArray?.[1]) {
        const fn = reg.vcardArray[1].find((v: any) => v[0] === "fn");
        if (fn?.[3]) registrar = fn[3];
      }
    }
    if (data.events) {
      const exp = data.events.find((e: any) => e.eventAction === "expiration");
      if (exp?.eventDate) expirationDate = exp.eventDate;
    }
    return { registrar, expirationDate };
  } catch {
    return {};
  }
}

function buildActionUrl(fullDomain: string, available: boolean): string {
  if (available) {
    // INWX Domain-Suche mit Pre-Fill (DE-Provider, EU-konform, breit)
    return `https://www.inwx.de/de/domain/check#search=${encodeURIComponent(fullDomain)}`;
  }
  // Live-URL der Domain — User sieht sofort was darauf läuft
  return `https://${fullDomain}`;
}

async function checkDomain(name: string, check: typeof TLD_CHECKS[0]): Promise<DomainResult> {
  const fullDomain = `${name}.${check.tld}`;

  // 1. Google DNS (primär, 99 % aller Cases)
  let dns = await dnsLookupNS(fullDomain);

  // 2. Cloudflare DNS als Fallback
  if (dns === null) {
    dns = await dnsLookupNSCloudflare(fullDomain);
  }

  // 3. Entscheidung: wenn DNS antwortet, ist das authoritative.
  // Wenn beide DNS-Provider versagen (sehr selten): default auf "vergeben" — sicherer Default,
  // weil Falsch-positiv "frei" zu Fehlkäufen führen würde.
  let available: boolean;
  let source: DomainResult["source"];
  if (dns !== null) {
    available = !dns.registered;
    source = "dns";
  } else {
    available = false;
    source = "fallback";
  }

  // 4. Wenn registriert: RDAP-Details parallel holen (Registrar, Ablaufdatum) — best effort
  let registrar: string | undefined;
  let expirationDate: string | undefined;
  if (!available) {
    const details = await fetchRdapDetails(check, fullDomain);
    registrar = details.registrar;
    expirationDate = details.expirationDate;
    if (registrar || expirationDate) source = "rdap";
  }

  return {
    tld: check.tld,
    fullDomain,
    available,
    registrar,
    expirationDate,
    label: check.label,
    actionUrl: buildActionUrl(fullDomain, available),
    source,
  };
}

interface TrademarkHit {
  name: string;
  office: string; // EUIPO, DPMA, WIPO
  applicationNumber?: string;
  classes?: string[];
  status?: string;
  applicant?: string;
  searchUrl: string;
}

interface TrademarkResult {
  query: string;
  totalHits: number | null; // null = API nicht erreichbar
  hits: TrademarkHit[];
  source: string;
  searchLinks: { label: string; url: string }[];
}

async function tryTmview(query: string, userAgent: string, timeoutMs: number): Promise<any | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    const resp = await fetch("https://api.tmdn.org/tmview/api/search/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "User-Agent": userAgent,
        Origin: "https://www.tmdn.org",
        Referer: "https://www.tmdn.org/tmview/",
      },
      body: new URLSearchParams({
        page: "1",
        pageSize: "30",
        criteria: "WS",
        basicSearch: query,
        fOffices: "EM,DE",
        sortBy: "relevance",
        typeSearch: "VERBAL",
      }).toString(),
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!resp.ok) {
      console.warn(`TMView HTTP ${resp.status}`);
      return null;
    }
    return await resp.json();
  } catch (e) {
    console.warn("TMView attempt fehlgeschlagen:", e);
    return null;
  }
}

async function checkTrademark(query: string): Promise<TrademarkResult> {
  const result: TrademarkResult = {
    query,
    totalHits: null,
    hits: [],
    source: "TMView (EUIPO/EU)",
    searchLinks: [
      { label: "DPMA Register (manuell)", url: `https://register.dpma.de/DPMAregister/marke/trefferliste?docId=&queryString=${encodeURIComponent(query)}` },
      { label: "EUIPO eSearch (manuell)", url: `https://euipo.europa.eu/eSearch/#advanced/trademarks/1/100/n1=MarkVerbalElementText&v1=${encodeURIComponent(query)}&o1=AND` },
      { label: "TMView (alle EU-Register)", url: `https://www.tmdn.org/tmview/#/tmview/results?text=${encodeURIComponent(query)}` },
      { label: "WIPO Global Brand Database", url: `https://branddb.wipo.int/en/quicksearch/results?fq=brandName:${encodeURIComponent(query)}` },
    ],
  };

  // 3 Versuche mit unterschiedlichen UAs + längerem Timeout (TMView ist rate-limited / oft langsam)
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    "GruenderX-Brand-Check/1.0",
  ];

  let data: any = null;
  for (let i = 0; i < userAgents.length; i++) {
    data = await tryTmview(query, userAgents[i], 12000);
    if (data) break;
    if (i < userAgents.length - 1) await new Promise((r) => setTimeout(r, 800)); // backoff
  }

  if (data) {
    result.totalHits = data?.tradeMarks?.length ?? data?.totalResults ?? 0;
    const list: any[] = Array.isArray(data?.tradeMarks) ? data.tradeMarks.slice(0, 20) : [];
    result.hits = list.map((tm: any) => ({
      name: tm.tmName ?? query,
      office: tm.officeCode === "EM" ? "EUIPO (EU)" : tm.officeCode === "DE" ? "DPMA (DE)" : tm.officeCode,
      applicationNumber: tm.applicationNumber ?? tm.registrationNumber,
      classes: tm.niceClass ? String(tm.niceClass).split(",").map((c: string) => c.trim()) : undefined,
      status: tm.status,
      applicant: tm.applicantName,
      searchUrl:
        tm.officeCode === "EM" && tm.applicationNumber
          ? `https://euipo.europa.eu/eSearch/#details/trademarks/${tm.applicationNumber}`
          : tm.officeCode === "DE" && tm.applicationNumber
            ? `https://register.dpma.de/DPMAregister/marke/register/${tm.applicationNumber}/DE`
            : result.searchLinks[2].url,
    }));
  }

  return result;
}

// ============================================================
// Social-Handle-Checks
// ============================================================

interface SocialResult {
  platform: string;
  handle: string;
  url: string;
  status: "available" | "taken" | "unknown";
  note?: string;
}

const SOCIAL_PLATFORMS: { key: string; label: string; url: (h: string) => string; takenStatuses: number[]; freeStatuses: number[] }[] = [
  // Instagram: 200 = existiert, 404 = frei, 401 = Login-Wall (oft auch "existiert")
  { key: "instagram", label: "Instagram", url: (h) => `https://www.instagram.com/${h}/`, takenStatuses: [200, 401], freeStatuses: [404] },
  // TikTok: ähnlich
  { key: "tiktok", label: "TikTok", url: (h) => `https://www.tiktok.com/@${h}`, takenStatuses: [200], freeStatuses: [404] },
  // YouTube @-Handles (seit 2023)
  { key: "youtube", label: "YouTube", url: (h) => `https://www.youtube.com/@${h}`, takenStatuses: [200], freeStatuses: [404] },
  // X / Twitter: hat aggressiven Bot-Schutz, oft 200 mit Login-Wall
  { key: "x", label: "X (Twitter)", url: (h) => `https://x.com/${h}`, takenStatuses: [200], freeStatuses: [404] },
  // GitHub: 200 = existiert, 404 = frei
  { key: "github", label: "GitHub", url: (h) => `https://github.com/${h}`, takenStatuses: [200], freeStatuses: [404] },
];

async function checkSocialHandle(name: string, p: typeof SOCIAL_PLATFORMS[0]): Promise<SocialResult> {
  const handle = name; // sanitized stripped Sonderzeichen, aber Social-Handles brauchen das
  const url = p.url(handle);
  const result: SocialResult = { platform: p.label, handle, url, status: "unknown" };
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; GruenderX-Brand-Check/1.0)",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: ctrl.signal,
      redirect: "manual",
    });
    clearTimeout(t);
    if (p.freeStatuses.includes(resp.status)) {
      result.status = "available";
    } else if (p.takenStatuses.includes(resp.status)) {
      result.status = "taken";
      if (resp.status === 401) result.note = "Login-Wall (wahrscheinlich vergeben)";
    } else if (resp.status >= 300 && resp.status < 400) {
      // Redirect: typisch zu Login → existiert
      result.status = "taken";
      result.note = "Redirect (vermutlich vergeben)";
    } else {
      result.note = `HTTP ${resp.status}`;
    }
  } catch (e) {
    console.warn(`Social ${p.label} ${handle} fehlgeschlagen:`, e);
  }
  return result;
}

// ============================================================
// App-Store-Checks
// ============================================================

interface AppStoreHit {
  store: "Apple App Store" | "Google Play";
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
  /** Note: Google Play hat keine öffentliche API mehr — nur Such-Link, manuelle Prüfung. */
}

async function checkAppStore(query: string): Promise<AppStoreResult> {
  const result: AppStoreResult = {
    query,
    appleHits: [],
    appleTotal: null,
    googleSearchUrl: `https://play.google.com/store/search?q=${encodeURIComponent(query)}&c=apps`,
  };

  // Apple iTunes Search API (öffentlich, kein Key)
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=software&limit=10&country=de`;
    const resp = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    if (resp.ok) {
      const data = await resp.json();
      result.appleTotal = data.resultCount ?? 0;
      result.appleHits = (data.results ?? []).map((r: any) => ({
        store: "Apple App Store" as const,
        appName: r.trackName,
        developer: r.artistName,
        bundleId: r.bundleId,
        url: r.trackViewUrl,
        iconUrl: r.artworkUrl60,
      }));
    }
  } catch (e) {
    console.warn("Apple App-Store-Check fehlgeschlagen:", e);
  }

  return result;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { name } = await req.json();
    if (!name || typeof name !== "string") {
      return new Response(JSON.stringify({ error: "Name erforderlich" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const sanitized = sanitize(name);
    if (sanitized.length < 2) {
      return new Response(
        JSON.stringify({ error: "Name zu kurz nach Sanitization (min. 2 Zeichen, nur a-z/0-9/-)." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Für Marken/App-Store: TLD vom Original-Input strippen (User könnte "kreya.de" eingegeben haben)
    const cleanQuery = stripTld(name);

    // Domains + Social + App-Store + Trademark parallel prüfen
    const [domainResults, socialResults, appStoreResult, trademarkResult] = await Promise.all([
      Promise.all(TLD_CHECKS.map((c) => checkDomain(sanitized, c))),
      Promise.all(SOCIAL_PLATFORMS.map((p) => checkSocialHandle(sanitized, p))),
      checkAppStore(cleanQuery),
      checkTrademark(cleanQuery),
    ]);

    return new Response(
      JSON.stringify({
        query: name,
        sanitized,
        domains: domainResults,
        socials: socialResults,
        appStore: appStoreResult,
        trademarks: trademarkResult,
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("check-brand error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
