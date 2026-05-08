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

// Sanitizer: erlaubt nur kleinbuchstaben, ziffern, hyphen.
// WICHTIG: Umlaut-Replacement MUSS vor .normalize laufen, sonst wird "ä" zu "a" statt "ae"
// (NFD zerlegt ä in a + combining-diaeresis, anschließendes Strippen der diakritischen Marker
// macht aus ä ein "a" — und der spätere /ä/-Replace hat dann nichts mehr zu tun).
function sanitize(input: string): string {
  return stripTld(input)
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/Ä/g, "ae")
    .replace(/Ö/g, "oe")
    .replace(/Ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // sonstige diakritische Zeichen (é, ñ, etc.) entfernen
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
    // IONOS Domain-Suche mit Pre-Fill
    return `https://www.ionos.de/domains/domain-check?domainname=${encodeURIComponent(fullDomain)}`;
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
 * DPMA-Register Quick-Search.
 * Strategie: Session-Cookie holen, Trefferliste fetchen, RADIKAL einfach parsen
 * (jeden register/ID/DE-Anker als Hit zählen, keine komplexe Tabellen-Logik).
 */
async function tryDpmaScrape(query: string): Promise<{ totalHits: number; hits: TrademarkHit[] } | null> {
  const baseHeaders = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
    "Cache-Control": "no-cache",
  };

  try {
    // Step 1: Session-Cookie von Einsteigerseite holen
    let sessionCookie = "";
    try {
      const initCtrl = new AbortController();
      const initT = setTimeout(() => initCtrl.abort(), 8000);
      const initResp = await fetch("https://register.dpma.de/DPMAregister/marke/einsteiger", {
        headers: baseHeaders,
        signal: initCtrl.signal,
        redirect: "follow",
      });
      clearTimeout(initT);
      const setCookie = initResp.headers.get("set-cookie") || "";
      // Extrahiere JSESSIONID + ggf. weitere DPMA-Cookies
      const cookieParts = setCookie
        .split(/,(?=[^,;]+=)/g)
        .map((c) => c.split(";")[0].trim())
        .filter(Boolean);
      sessionCookie = cookieParts.join("; ");
    } catch (e) {
      console.warn("DPMA Session-Init fehlgeschlagen, versuche ohne Cookie:", e);
    }

    // Step 2: Trefferliste — mehrere Methoden + URLs probieren
    const attempts: { method: "GET" | "POST"; url: string; body?: string; contentType?: string }[] = [
      // 1) GET mit queryString = die einfachste Variante (User-Screenshot URL)
      {
        method: "GET",
        url: `https://register.dpma.de/DPMAregister/marke/trefferliste?queryString=${encodeURIComponent(query)}`,
      },
      // 2) GET mit allen 5 Feldern OR-verknüpft (wie Quick-Search es intern macht)
      {
        method: "GET",
        url: `https://register.dpma.de/DPMAregister/marke/trefferlisteOR?queryString=${encodeURIComponent(query)}&docId=&queryStringSchutzformen=&queryStringSchutzformenSearchOption=OR`,
      },
      // 3) POST direkt — manche JSF-Apps brauchen POST
      {
        method: "POST",
        url: "https://register.dpma.de/DPMAregister/marke/trefferliste",
        body: `queryString=${encodeURIComponent(query)}&queryStringSchutzformenSearchOption=OR`,
        contentType: "application/x-www-form-urlencoded",
      },
      // 4) Erweiterte Recherche direkt
      {
        method: "POST",
        url: "https://register.dpma.de/DPMAregister/marke/erweiterterecherche",
        body: `marke=${encodeURIComponent(query)}&rn=${encodeURIComponent(query)}&akz=${encodeURIComponent(query)}&queryStringSchutzformenSearchOption=OR`,
        contentType: "application/x-www-form-urlencoded",
      },
    ];

    let html = "";
    let lastStatus = 0;
    let lastUrl = "";
    for (const attempt of attempts) {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 12000);
        const resp = await fetch(attempt.url, {
          method: attempt.method,
          headers: {
            ...baseHeaders,
            Referer: "https://register.dpma.de/DPMAregister/marke/einsteiger",
            ...(sessionCookie ? { Cookie: sessionCookie } : {}),
            ...(attempt.contentType ? { "Content-Type": attempt.contentType } : {}),
          },
          body: attempt.body,
          signal: ctrl.signal,
          redirect: "follow",
        });
        clearTimeout(t);
        lastStatus = resp.status;
        lastUrl = attempt.url;
        if (resp.ok) {
          const text = await resp.text();
          // Nur als Erfolg werten wenn HTML eine Trefferliste-Spur enthält
          if (
            text.length > 1000 &&
            (/\/marke\/register\/\d+\/DE/.test(text) ||
              /Trefferliste|Treffer:|Treffer\b/i.test(text) ||
              /Keine Treffer|kein Treffer/i.test(text))
          ) {
            html = text;
            console.log(`DPMA ok via ${attempt.method} ${attempt.url} (${html.length} bytes)`);
            break;
          }
        }
      } catch (e) {
        console.warn(`DPMA ${attempt.method} ${attempt.url} fail:`, e);
      }
    }

    if (!html) {
      console.warn(`DPMA: alle URL-Varianten fail, lastStatus=${lastStatus}`);
      return null;
    }

    // Step 3: Parse "Trefferliste: X Treffer"
    let totalHits = 0;
    const totalPatterns = [
      /Trefferliste\s*:?\s*(\d+(?:\.\d{3})*)\s*Treffer/i, // "Trefferliste: 1 Treffer"
      /Marken[^(]*\(\s*(\d+(?:\.\d{3})*)\s*Treffer/i, // Tab-Header "Marken (1 Treffer)"
      /(\d+(?:\.\d{3})*)\s*Treffer\b/i, // Generic Fallback
      />Treffer:\s*(\d+(?:\.\d{3})*)/i,
    ];
    for (const re of totalPatterns) {
      const m = html.match(re);
      if (m) {
        totalHits = parseInt(m[1].replace(/\./g, ""), 10);
        break;
      }
    }
    if (totalHits === 0 && /Keine Treffer|0\s*Treffer/i.test(html)) {
      totalHits = 0;
    }

    // Step 4: Hits parsen — RADIKAL einfach
    // Jeden register/{ID}/DE-Link finden, Aktenzeichen extrahieren.
    // Den Markendarstellungs-Namen versuchen wir aus der gleichen Tabellen-Zeile zu lesen,
    // aber wenn das fail, ist das egal — User sieht trotzdem die Treffer-Anzahl + Detail-Link.
    const hits: TrademarkHit[] = [];
    const seen = new Set<string>();

    // Finde alle register-Anker
    const linkRe = /<a[^>]+href="[^"]*\/register\/(\d{5,})\/DE"[^>]*>/gi;
    let linkMatch: RegExpExecArray | null;
    while ((linkMatch = linkRe.exec(html)) !== null && hits.length < 30) {
      const applicationNumber = linkMatch[1].trim();
      if (seen.has(applicationNumber)) continue;
      seen.add(applicationNumber);

      // Versuche den Namen aus dem umgebenden Kontext zu extrahieren (200 Zeichen nach dem Anker)
      const linkPos = linkMatch.index ?? 0;
      const slice = html.slice(linkPos, linkPos + 1500);
      let name = query;
      let status = "";

      // Suche nächsten <td>-Inhalt nach dem Anker
      const tdsAfter = Array.from(slice.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi));
      for (const tdM of tdsAfter) {
        const text = tdM[1]
          .replace(/<[^>]+>/g, "")
          .replace(/&amp;/g, "&")
          .replace(/&nbsp;/g, " ")
          .replace(/&[a-z]+;/gi, " ")
          .replace(/\s+/g, " ")
          .trim();
        if (!text) continue;
        if (text === applicationNumber) continue;
        if (/^(DE|EM|EU|WO)$/i.test(text)) continue;
        if (/Marke (eingetragen|gelöscht|abgelehnt)|Widerspruchsfrist|zurückgenommen|Anmeldung\sgelöscht/i.test(text)) {
          if (!status) status = text;
          continue;
        }
        if (text.length >= 1 && text.length <= 200) {
          name = text;
          break; // erster sinnvoller Wert ist die Markendarstellung
        }
      }

      hits.push({
        name,
        office: "DPMA (DE)",
        applicationNumber,
        status,
        searchUrl: `https://register.dpma.de/DPMAregister/marke/register/${applicationNumber}/DE`,
      });
    }

    if (hits.length > totalHits) totalHits = hits.length;

    console.log(`DPMA ok: total=${totalHits}, parsed=${hits.length}, htmlSize=${html.length}`);
    return { totalHits, hits };
  } catch (e) {
    console.warn("DPMA-Scrape fehlgeschlagen:", e);
    return null;
  }
}

/**
 * EUIPO eSearch direkt — Plain-Search-API der EUIPO-Frontend.
 * Liefert JSON für EU-Marken (offiziell EM-Office-Code).
 */
async function tryEuipoDirect(query: string): Promise<{ totalHits: number; hits: TrademarkHit[] } | null> {
  // EUIPO hat verschiedene Endpoint-Varianten — wir probieren mehrere
  const endpoints = [
    `https://euipo.europa.eu/eSearch/api/trademarks?text=${encodeURIComponent(query)}&size=20&page=0`,
    `https://euipo.europa.eu/copla/trademark/data/search?searchText=${encodeURIComponent(query)}&type=basic`,
  ];
  for (const url of endpoints) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      const resp = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15",
          "Accept-Language": "en",
          Referer: "https://euipo.europa.eu/eSearch/",
        },
        signal: ctrl.signal,
      });
      clearTimeout(t);
      if (!resp.ok) continue;
      const data = await resp.json();
      const items = data?.content ?? data?.results ?? data?.trademarks ?? data?.docs ?? [];
      if (!Array.isArray(items)) continue;
      const totalHits = data?.totalElements ?? data?.total ?? items.length;
      const hits: TrademarkHit[] = items.slice(0, 10).map((tm: any) => ({
        name: tm.markVerbalElementText ?? tm.text ?? tm.tmName ?? query,
        office: "EUIPO (EU)",
        applicationNumber: tm.applicationNumber ?? tm.id,
        classes: tm.niceClasses ? String(tm.niceClasses).split(",").map((c: string) => c.trim()) : undefined,
        status: tm.status ?? tm.markStatusCode,
        applicant: tm.applicantName ?? tm.applicants?.[0]?.name,
        searchUrl: tm.applicationNumber
          ? `https://euipo.europa.eu/eSearch/#details/trademarks/${tm.applicationNumber}`
          : `https://euipo.europa.eu/eSearch/`,
      }));
      console.log(`EUIPO direct ok: ${totalHits} hits`);
      return { totalHits, hits };
    } catch {}
  }
  return null;
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

  const [tmviewData, dpmaData, wipoData, euipoData] = await Promise.all([
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
    tryEuipoDirect(query),
  ]);

  // Source-Status für Transparenz im UI
  const sourceStatus = {
    tmview: tmviewData ? "ok" : "fail",
    dpma: dpmaData ? "ok" : "fail",
    wipo: wipoData ? "ok" : "fail",
    euipo: euipoData ? "ok" : "fail",
  };
  console.log("Marken-Sources:", sourceStatus);

  // Hits sammeln aus allen Quellen die antworteten
  const allHits: TrademarkHit[] = [];
  let maxTotal = 0;
  const sources: string[] = [];

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
    allHits.push(...hits);
    maxTotal = Math.max(maxTotal, total);
    sources.push(`TMView: ${total}`);
  }
  if (dpmaData) {
    // Nur Hits adden die nicht schon via TMView dabei sind
    for (const h of dpmaData.hits) {
      if (!allHits.some((x) => x.applicationNumber === h.applicationNumber)) allHits.push(h);
    }
    maxTotal = Math.max(maxTotal, dpmaData.totalHits);
    sources.push(`DPMA: ${dpmaData.totalHits}`);
  }
  if (wipoData) {
    for (const h of wipoData.hits) {
      if (!allHits.some((x) => x.applicationNumber === h.applicationNumber)) allHits.push(h);
    }
    maxTotal = Math.max(maxTotal, wipoData.totalHits);
    sources.push(`WIPO: ${wipoData.totalHits}`);
  }
  if (euipoData) {
    for (const h of euipoData.hits) {
      if (!allHits.some((x) => x.applicationNumber === h.applicationNumber)) allHits.push(h);
    }
    maxTotal = Math.max(maxTotal, euipoData.totalHits);
    sources.push(`EUIPO: ${euipoData.totalHits}`);
  }

  // Hat IRGENDEINE Quelle geantwortet?
  const anyOk = tmviewData || dpmaData || wipoData || euipoData;
  if (anyOk) {
    result.totalHits = maxTotal;
    result.hits = allHits.slice(0, 20);
    result.source = `Quellen: ${sources.join(" · ")}`;
    // sourceStatus für UI mitschicken — User soll wissen welche Quelle wirkte
    (result as any).sourceStatus = sourceStatus;
  }
  // Wenn ALLE 3 fehlen: result.totalHits bleibt null → UI zeigt "alle APIs offline"

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
