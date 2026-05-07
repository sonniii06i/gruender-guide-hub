import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// TLDs zum Check + jeweiliger RDAP-Endpoint (oder zentral via rdap.org)
const TLD_CHECKS: { tld: string; endpoint: (name: string) => string; label: string }[] = [
  { tld: "de", endpoint: (n) => `https://rdap.denic.de/domain/${n}.de`, label: ".de (DENIC)" },
  { tld: "com", endpoint: (n) => `https://rdap.verisign.com/com/v1/domain/${n}.com`, label: ".com (Verisign)" },
  { tld: "net", endpoint: (n) => `https://rdap.verisign.com/net/v1/domain/${n}.net`, label: ".net (Verisign)" },
  { tld: "io", endpoint: (n) => `https://rdap.identitydigital.services/rdap/domain/${n}.io`, label: ".io (Identity Digital)" },
  { tld: "shop", endpoint: (n) => `https://rdap.gmoregistry.net/domain/${n}.shop`, label: ".shop (GMO)" },
  { tld: "co", endpoint: (n) => `https://rdap.nic.co/domain/${n}.co`, label: ".co (Afilias)" },
  { tld: "app", endpoint: (n) => `https://rdap.nominet.uk/app/domain/${n}.app`, label: ".app (Google)" },
  { tld: "store", endpoint: (n) => `https://rdap.centralnic.com/store/domain/${n}.store`, label: ".store (CentralNic)" },
];

// Sanitizer: erlaubt nur kleinbuchstaben, ziffern, hyphen
function sanitize(input: string): string {
  return input
    .trim()
    .toLowerCase()
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
  available: boolean | null; // null = unbekannt (Endpoint-Fehler)
  registrar?: string;
  expirationDate?: string;
  label: string;
  source: string;
}

async function checkDomain(name: string, check: typeof TLD_CHECKS[0]): Promise<DomainResult> {
  const fullDomain = `${name}.${check.tld}`;
  const url = check.endpoint(name);
  const result: DomainResult = {
    tld: check.tld,
    fullDomain,
    available: null,
    label: check.label,
    source: url,
  };

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const resp = await fetch(url, {
      headers: { Accept: "application/rdap+json", "User-Agent": "GruenderX-Brand-Check/1.0" },
      signal: ctrl.signal,
    });
    clearTimeout(t);

    if (resp.status === 404) {
      // RDAP 404 = Domain nicht registriert
      result.available = true;
      return result;
    }
    if (resp.status === 200) {
      result.available = false;
      try {
        const data = await resp.json();
        // Registrar aus events oder entities ziehen
        if (data.entities) {
          const reg = data.entities.find((e: any) => Array.isArray(e.roles) && e.roles.includes("registrar"));
          if (reg?.vcardArray?.[1]) {
            const fn = reg.vcardArray[1].find((v: any) => v[0] === "fn");
            if (fn?.[3]) result.registrar = fn[3];
          }
        }
        if (data.events) {
          const exp = data.events.find((e: any) => e.eventAction === "expiration");
          if (exp?.eventDate) result.expirationDate = exp.eventDate;
        }
      } catch {}
      return result;
    }
    // andere Stati = unsicher
    return result;
  } catch (e) {
    console.warn(`Domain-Check ${fullDomain} fehlgeschlagen:`, e);
    return result;
  }
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

  // TMView API (offiziell von EUIPO/TMDN)
  const tmviewUrl = "https://api.tmdn.org/tmview/api/search/results";
  const body = {
    page: "1",
    pageSize: "30",
    criteria: "WS",
    basicSearch: query,
    fOffices: "EM,DE", // EUIPO + DPMA
    sortBy: "relevance",
    typeSearch: "VERBAL",
  };

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const resp = await fetch(tmviewUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "User-Agent": "GruenderX-Brand-Check/1.0",
      },
      body: new URLSearchParams(body as Record<string, string>).toString(),
      signal: ctrl.signal,
    });
    clearTimeout(t);

    if (resp.ok) {
      const data = await resp.json();
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
  } catch (e) {
    console.warn("TMView fehlgeschlagen:", e);
    // Fallback: hits bleibt leer, totalHits bleibt null → UI zeigt manuelle Such-Links
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

    // Domains + Social + App-Store + Trademark parallel prüfen
    const [domainResults, socialResults, appStoreResult, trademarkResult] = await Promise.all([
      Promise.all(TLD_CHECKS.map((c) => checkDomain(sanitized, c))),
      Promise.all(SOCIAL_PLATFORMS.map((p) => checkSocialHandle(sanitized, p))),
      checkAppStore(name.trim()),
      checkTrademark(name.trim()),
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
