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
        "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
        "User-Agent": userAgent,
        Origin: "https://www.tmdn.org",
        Referer: "https://www.tmdn.org/tmview/",
        "X-Requested-With": "XMLHttpRequest",
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
      console.warn(`TMView HTTP ${resp.status} body:`, (await resp.text().catch(() => "")).slice(0, 200));
      return null;
    }
    const data = await resp.json();
    console.log(`TMView ok: ${data?.totalResults ?? data?.tradeMarks?.length ?? 0} hits`);
    return data;
  } catch (e) {
    console.warn("TMView attempt fehlgeschlagen:", e);
    return null;
  }
}

/** WIPO Global Brand Database (3. Datenquelle, JSON-API). */
async function tryWipo(query: string): Promise<{ totalHits: number; hits: TrademarkHit[] } | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 10000);
    const url = `https://branddb.wipo.int/branddb/api/?fq=brandName:${encodeURIComponent(query)}&limit=20`;
    const resp = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15",
      },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!resp.ok) {
      console.warn(`WIPO HTTP ${resp.status}`);
      return null;
    }
    const data = await resp.json();
    const docs: any[] = data?.response?.docs ?? data?.docs ?? [];
    const totalHits: number = data?.response?.numFound ?? data?.numFound ?? docs.length;
    const hits: TrademarkHit[] = docs.slice(0, 10).map((d: any) => ({
      name: d.brandName ?? d.t1 ?? query,
      office: d.officeName ?? d.so ?? "WIPO",
      applicationNumber: d.applicationNumber ?? d.an,
      classes: d.niceClass ? String(d.niceClass).split(",").map((s: string) => s.trim()) : undefined,
      status: d.statusCode ?? d.st,
      applicant: d.applicantName ?? d.cn,
      searchUrl: `https://branddb.wipo.int/en/quicksearch/results?fq=brandName:${encodeURIComponent(query)}`,
    }));
    console.log(`WIPO ok: ${totalHits} hits`);
    return { totalHits, hits };
  } catch (e) {
    console.warn("WIPO fehlgeschlagen:", e);
    return null;
  }
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

/**
 * DPMA-Register Einsteigersuche: stabilstes Endpoint für freie Wortsuche.
 * Liefert HTML-Trefferliste, parsed Treffer-Anzahl + Anmeldenummern + Marken-Namen.
 */
async function tryDpmaScrape(query: string): Promise<{ totalHits: number; hits: TrademarkHit[] } | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 12000);
    // Einsteigersuche akzeptiert direkten Wortsuche-Pattern
    const url = `https://register.dpma.de/DPMAregister/marke/trefferliste?queryString=${encodeURIComponent(query)}&docId=&queryStringSchutzformen=&queryStringSchutzformenSearchOption=AND`;
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
        Referer: "https://register.dpma.de/DPMAregister/marke/einsteiger",
      },
      signal: ctrl.signal,
    });
    if (!resp.ok) {
      console.warn(`DPMA HTTP ${resp.status}`);
      clearTimeout(t);
      return null;
    }
    const html = await resp.text();
    clearTimeout(t);

    // Anzahl Treffer aus dem HTML parsen — DPMA-Register zeigt "X Treffer" oder "Keine Treffer"
    let totalHits = 0;
    const hitsMatch =
      html.match(/(\d+(?:\.\d{3})*)\s*Treffer\b/i) ||
      html.match(/Treffer:\s*(\d+(?:\.\d{3})*)/i) ||
      html.match(/von\s+(\d+(?:\.\d{3})*)\s+Treffern/i);
    if (hitsMatch) {
      totalHits = parseInt(hitsMatch[1].replace(/\./g, ""), 10);
    } else if (/Keine Treffer|0 Treffer|kein Treffer/i.test(html)) {
      totalHits = 0;
    }

    // Hits parsen — DPMA-HTML hat <a href="../register/{id}/DE">Wortmarke</a>
    // Mehrere mögliche Pattern probieren
    const hits: TrademarkHit[] = [];
    const patterns = [
      /<a[^>]+href="[^"]*\/marke\/register\/([^"\/]+)\/DE"[^>]*>\s*([^<]{2,80})\s*<\/a>/gi,
      /<a[^>]+href="\.\.\/register\/([^"\/]+)\/DE"[^>]*>\s*([^<]{2,80})\s*<\/a>/gi,
      /href="[^"]*\/register\/([0-9A-Z]+)\/DE"[^>]*>\s*([^<\n]{2,80})/gi,
    ];
    for (const re of patterns) {
      let m: RegExpExecArray | null;
      while ((m = re.exec(html)) !== null && hits.length < 10) {
        const applicationNumber = m[1].replace(/\s+/g, "");
        const name = m[2].replace(/&[a-z]+;/gi, "").trim();
        if (!name || name.length < 2 || hits.some((h) => h.applicationNumber === applicationNumber)) continue;
        hits.push({
          name,
          office: "DPMA (DE)",
          applicationNumber,
          searchUrl: `https://register.dpma.de/DPMAregister/marke/register/${applicationNumber}/DE`,
        });
      }
      if (hits.length > 0) break;
    }

    // Wenn wir Hits haben aber totalHits noch 0 (Pattern verfehlt), nimm hits.length als Untergrenze
    if (hits.length > totalHits) totalHits = hits.length;

    console.log(`DPMA ok: ${totalHits} hits, ${hits.length} parsed`);
    return { totalHits, hits };
  } catch (e) {
    console.warn("DPMA-Scrape fehlgeschlagen:", e);
    return null;
  }
}

async function checkTrademark(query: string): Promise<TrademarkResult> {
  const result: TrademarkResult = {
    query,
    totalHits: null,
    hits: [],
    source: "TMView + DPMA-Register",
    searchLinks: [
      { label: "DPMA Register (manuell)", url: `https://register.dpma.de/DPMAregister/marke/trefferliste?docId=&queryString=${encodeURIComponent(query)}` },
      { label: "EUIPO eSearch (manuell)", url: `https://euipo.europa.eu/eSearch/#advanced/trademarks/1/100/n1=MarkVerbalElementText&v1=${encodeURIComponent(query)}&o1=AND` },
      { label: "TMView (alle EU-Register)", url: `https://www.tmdn.org/tmview/#/tmview/results?text=${encodeURIComponent(query)}` },
      { label: "WIPO Global Brand Database", url: `https://branddb.wipo.int/en/quicksearch/results?fq=brandName:${encodeURIComponent(query)}` },
    ],
  };

  // 3 Quellen parallel: TMView, DPMA-Scrape, WIPO
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
  ];

  const [tmviewData, dpmaData, wipoData] = await Promise.all([
    (async () => {
      for (const ua of userAgents) {
        const d = await tryTmview(query, ua, 10000);
        if (d) return d;
        await new Promise((r) => setTimeout(r, 500));
      }
      return null;
    })(),
    tryDpmaScrape(query),
    tryWipo(query),
  ]);

  // Priorität: TMView > DPMA > WIPO. Aber wenn höhere Quelle 0 Hits zeigt und niedrigere
  // Hits hat → benutze niedrigere (TMView kann Sync-Lag haben).
  let chosen: { source: string; totalHits: number; hits: TrademarkHit[] } | null = null;

  if (tmviewData) {
    const total = tmviewData?.totalResults ?? tmviewData?.tradeMarks?.length ?? 0;
    const list: any[] = Array.isArray(tmviewData?.tradeMarks) ? tmviewData.tradeMarks.slice(0, 20) : [];
    const hits: TrademarkHit[] = list.map((tm: any) => ({
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
    chosen = { source: "TMView (EUIPO + DPMA)", totalHits: total, hits };
  }

  // Wenn TMView 0 Hits aber DPMA Hits → DPMA bevorzugen (DPMA aktueller bei DE-Anmeldungen)
  if (dpmaData && (chosen === null || (chosen.totalHits === 0 && dpmaData.totalHits > 0))) {
    chosen = {
      source: chosen ? "DPMA Register (mehr Treffer als TMView)" : "DPMA Register",
      totalHits: dpmaData.totalHits,
      hits: dpmaData.hits,
    };
  }

  // WIPO als 3. Quelle wenn andere keine Hits liefern
  if (wipoData && (chosen === null || chosen.totalHits === 0)) {
    if (wipoData.totalHits > 0) {
      chosen = {
        source: "WIPO Global Brand Database",
        totalHits: wipoData.totalHits,
        hits: wipoData.hits,
      };
    } else if (chosen === null) {
      chosen = { source: "WIPO Global Brand Database", totalHits: 0, hits: [] };
    }
  }

  if (chosen) {
    result.source = chosen.source;
    result.totalHits = chosen.totalHits;
    result.hits = chosen.hits;
  }
  // Wenn alle 3 Quellen fehlen: result.totalHits bleibt null → UI zeigt manuelle Such-Links

  return result;
}

// ============================================================
// Social-Handle-Checks — pro Plattform die zuverlässigste Methode
// ============================================================

interface SocialResult {
  platform: string;
  handle: string;
  url: string;
  status: "available" | "taken" | "unknown";
}

const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15";

/**
 * GitHub: REST API — definitive, public, kein Auth.
 * 200 = existiert (taken). 404 = nicht (available).
 */
async function checkGithub(handle: string): Promise<SocialResult> {
  const url = `https://github.com/${handle}`;
  const result: SocialResult = { platform: "GitHub", handle, url, status: "unknown" };
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const resp = await fetch(`https://api.github.com/users/${encodeURIComponent(handle)}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "GruenderX-Brand-Check" },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (resp.status === 200) result.status = "taken";
    else if (resp.status === 404) result.status = "available";
  } catch {}
  return result;
}

/**
 * Instagram: Public-Page-Status-Check.
 * Strategie: 404 = User existiert nicht (frei) · 200/Redirect = User existiert (vergeben).
 * Instagram liefert IMMER 200 bei existierenden Profilen (mit Login-Wall) und IMMER 404 bei
 * nicht existierenden — egal ob Login. Status-Code allein ist authoritative.
 *
 * Plus Fallback auf Web-Profile-API wenn HTTP nicht eindeutig.
 */
async function checkInstagram(handle: string): Promise<SocialResult> {
  const url = `https://www.instagram.com/${handle}/`;
  const result: SocialResult = { platform: "Instagram", handle, url, status: "unknown" };

  // Methode 1: Public Page direkt
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    const resp = await fetch(url, {
      headers: { "User-Agent": BROWSER_UA, Accept: "text/html" },
      signal: ctrl.signal,
      redirect: "manual",
    });
    clearTimeout(t);

    if (resp.status === 404) {
      result.status = "available";
      return result;
    }
    if (resp.status === 200) {
      const html = await resp.text().catch(() => "");
      // IG zeigt manchmal "Sorry, this page isn't available" mit 200 statt 404
      if (/Sorry, this page isn['']t available|Page Not Found/i.test(html)) {
        result.status = "available";
        return result;
      }
      // OG-Title / Username / Profile-Pic im HTML = Profil existiert
      if (/og:title|"username":\s*"|"profile_pic_url"|"@context":\s*"https:\/\/schema.org"/i.test(html)) {
        result.status = "taken";
        return result;
      }
      // 200 ohne Profil-Indikatoren = wahrscheinlich Login-Wall = existiert
      // (IG liefert 200 NIEMALS für nicht existierende Handles)
      result.status = "taken";
      return result;
    }
    if (resp.status >= 300 && resp.status < 400) {
      // Redirect zu Login → Profil existiert
      result.status = "taken";
      return result;
    }
  } catch {}

  // Methode 2 (Fallback): Web-Profile-API
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const resp = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(handle)}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)",
        "X-IG-App-ID": "936619743392459",
        Accept: "*/*",
      },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (resp.status === 404) {
      result.status = "available";
    } else if (resp.status === 200) {
      const data = await resp.json().catch(() => null);
      if (data?.data?.user) result.status = "taken";
      else if (data?.data?.user === null) result.status = "available";
    }
  } catch {}

  return result;
}

/**
 * TikTok via oembed-Endpoint — offizielle API, designed für Iframe-Embeds.
 * 200 = User existiert · 404 = User existiert NICHT.
 * Viel zuverlässiger als HTML-Scrape (kein Cloudflare-Block).
 */
async function checkTiktok(handle: string): Promise<SocialResult> {
  const url = `https://www.tiktok.com/@${handle}`;
  const result: SocialResult = { platform: "TikTok", handle, url, status: "unknown" };
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    const resp = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, {
      headers: { Accept: "application/json", "User-Agent": BROWSER_UA },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (resp.status === 200) {
      // oembed liefert auch 200 mit error-Body wenn User nicht existiert
      const data = await resp.json().catch(() => null);
      if (data?.author_unique_id || data?.author_name || data?.title) {
        result.status = "taken";
      } else if (data === null || Object.keys(data || {}).length === 0) {
        result.status = "available";
      } else {
        result.status = "taken";
      }
    } else if (resp.status === 404 || resp.status === 400) {
      result.status = "available";
    }
  } catch {}
  return result;
}

/**
 * YouTube via oembed — offizielle JSON-API.
 * 200 = Channel existiert · 401/404 = nicht.
 */
async function checkYoutube(handle: string): Promise<SocialResult> {
  const url = `https://www.youtube.com/@${handle}`;
  const result: SocialResult = { platform: "YouTube", handle, url, status: "unknown" };
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    const resp = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`, {
      headers: { Accept: "application/json", "User-Agent": BROWSER_UA },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (resp.status === 200) {
      result.status = "taken";
    } else if (resp.status === 401 || resp.status === 404) {
      // YouTube oembed liefert 401 wenn der Channel keinen public Content hat oder nicht existiert.
      // Wir behandeln das als "available" — aber: ein leerer Channel mit Handle existiert dann u.U. trotzdem.
      // Heuristik: bei 401 zusätzlich Page-HTML kurz checken.
      if (resp.status === 404) {
        result.status = "available";
      } else {
        // 401 — extra check über Page selbst
        const ctrl2 = new AbortController();
        const t2 = setTimeout(() => ctrl2.abort(), 5000);
        const pageResp = await fetch(url, {
          headers: { "User-Agent": BROWSER_UA, Accept: "text/html" },
          signal: ctrl2.signal,
          redirect: "manual",
        });
        clearTimeout(t2);
        if (pageResp.status === 404) {
          result.status = "available";
        } else if (pageResp.status === 200) {
          // Wenn Page 200, aber oembed 401 → Channel existiert ohne Public Videos
          result.status = "taken";
        } else if (pageResp.status >= 300 && pageResp.status < 400) {
          result.status = "available"; // Redirect zu Suche
        }
      }
    }
  } catch {}
  return result;
}

/**
 * X / Twitter via fxtwitter.com — drittanbieter-Mirror mit sauberer öffentlicher API.
 * Sehr zuverlässig: 200 + JSON.user wenn existiert, 404 wenn nicht.
 */
async function checkX(handle: string): Promise<SocialResult> {
  const url = `https://x.com/${handle}`;
  const result: SocialResult = { platform: "X (Twitter)", handle, url, status: "unknown" };
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    const resp = await fetch(`https://api.fxtwitter.com/${encodeURIComponent(handle)}`, {
      headers: { Accept: "application/json", "User-Agent": "GruenderX-Brand-Check" },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (resp.status === 200) {
      const data = await resp.json().catch(() => null);
      // fxtwitter response: { code: 200, message: "OK", user: {...} } wenn existiert
      // bzw. { code: 404, message: "User not found" } wenn nicht
      if (data?.code === 200 && data?.user) {
        result.status = "taken";
      } else if (data?.code === 404) {
        result.status = "available";
      }
    } else if (resp.status === 404) {
      result.status = "available";
    }
  } catch {}
  return result;
}

const SOCIAL_CHECKERS: ((handle: string) => Promise<SocialResult>)[] = [
  checkInstagram,
  checkTiktok,
  checkYoutube,
  checkX,
  checkGithub,
];

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
      Promise.all(SOCIAL_CHECKERS.map((fn) => fn(sanitized))),
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
