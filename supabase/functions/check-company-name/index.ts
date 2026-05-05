// Sucht nach einem Firmennamen in deutschen Registern.
// Quelle: NorthData (aggregiert Handelsregister, Vereinsregister, Partnerschaftsregister).
// Cache: 24h pro normalisiertem Query in public.company_check_cache (entkoppelt
// von NorthData-Rate-Limit, jede einzigartige Anfrage wird nur einmal pro Tag
// von einer User-Session getriggert).
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.0";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_TTL_FAIL_MS = 5 * 60 * 1000; // Bei searchFailed nur kurz cachen.

interface Hit {
  name: string;
  court?: string;
  registerType?: string;
  registerNumber?: string;
  source: string;
  exact?: boolean;
  score?: number;
}

const LEGAL_FORMS = [
  "gmbh & co. kg", "gmbh & co kg", "ug & co. kg", "ug (haftungsbeschränkt)",
  "gmbh", "mbh", "ag", "ug", "kg", "ohg", "gbr", "e.k.", "ek", "se", "limited", "ltd", "ltd.",
  "kgaa", "ev", "e.v.", "stiftung",
];

const norm = (s: string) =>
  s.toLowerCase()
    .normalize("NFKD")
    .replace(/[­\s]+/g, " ")
    .replace(/[.,;:'"`´()\[\]&]/g, "")
    .trim();

const stripLegalForm = (s: string) => {
  let out = norm(s);
  for (const lf of LEGAL_FORMS) {
    const lfn = norm(lf);
    if (out.endsWith(" " + lfn)) out = out.slice(0, -(lfn.length + 1)).trim();
    if (out === lfn) out = "";
  }
  return out;
};

const tokens = (s: string) => stripLegalForm(s).split(/\s+/).filter((t) => t.length >= 2);

const overlapScore = (a: string, b: string) => {
  const ta = new Set(tokens(a));
  const tb = new Set(tokens(b));
  if (ta.size === 0 || tb.size === 0) return 0;
  let common = 0;
  for (const t of ta) if (tb.has(t)) common++;
  return common / Math.min(ta.size, tb.size);
};

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");

function mergeHit(hits: Hit[], byName: Map<string, Hit>, candidate: Hit) {
  const key = norm(candidate.name);
  if (!key) return;
  const existing = byName.get(key);
  if (existing) {
    if (!existing.court && candidate.court) existing.court = candidate.court;
    if (!existing.registerType && candidate.registerType) existing.registerType = candidate.registerType;
    if (!existing.registerNumber && candidate.registerNumber) existing.registerNumber = candidate.registerNumber;
    return;
  }
  byName.set(key, candidate);
  hits.push(candidate);
}

function extractFromJsonLd(html: string, hits: Hit[], byName: Map<string, Hit>) {
  // Bei eindeutigen Treffern leitet NorthData direkt auf die Detail-Seite weiter,
  // die als <script type="application/ld+json"> ein LocalBusiness/Organization enthält.
  // Bei mehrdeutigen Treffern kommt eine BreadcrumbList/ItemList mit den Treffern.
  const scriptRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let s;
  while ((s = scriptRe.exec(html)) !== null) {
    let parsed: any;
    try { parsed = JSON.parse(s[1].trim()); } catch { continue; }
    const items: any[] = Array.isArray(parsed) ? parsed : [parsed];
    for (const item of items) {
      const t = item?.["@type"];
      if (t === "LocalBusiness" || t === "Organization" || t === "Corporation") {
        const name = String(item.name ?? "").trim();
        const addr = item.address ?? {};
        const country = String(addr.addressCountry ?? "").toUpperCase();
        if (country && country !== "DE") continue;
        if (!name) continue;
        mergeHit(hits, byName, {
          name,
          court: String(addr.addressLocality ?? "") || undefined,
          source: "northdata",
        });
      }
      if ((t === "BreadcrumbList" || t === "ItemList") && Array.isArray(item.itemListElement)) {
        for (const li of item.itemListElement) {
          const inner = li.item ?? li;
          const name = String(inner?.name ?? "").trim();
          const idUrl = String(inner?.["@id"] ?? inner?.url ?? "");
          if (!name) continue;
          const regMatch = idUrl.match(/\/(HRB|HRA|VR|PR|GnR|GsR|PartG)(?:%20|\s)([0-9A-Za-z]+)/i);
          if (!regMatch) continue;
          mergeHit(hits, byName, {
            name,
            registerType: regMatch[1].toUpperCase(),
            registerNumber: regMatch[2],
            source: "northdata",
          });
        }
      }
    }
  }
}

function extractFromVisibleText(html: string, hits: Hit[], byName: Map<string, Hit>) {
  // Strikter Fallback: matcht NUR vollständige Einträge mit
  // "Firmenname [Rechtsform], Stadt, Amtsgericht X HRB N".
  // Ohne diese Pflicht-Anker matcht der Regex sonst Glossar-Listen.
  const text = decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
  const pat = /([A-ZÄÖÜ][^,<>{}]{2,80}?(?:GmbH(?:\s*&\s*Co\.?\s*KGa?A?)?|AG|UG\s*\(haftungsbeschränkt\)|UG|KGaA|KG|OHG|SE|e\.\s*V\.|e\.\s*K\.|GbR|PartG))\s*,\s*([A-ZÄÖÜ][\wäöüÄÖÜß. -]{2,60}?)\s*,\s*Amtsgericht\s+([A-ZÄÖÜ][\wäöüÄÖÜß.-]+(?:\s+[A-ZÄÖÜ][\wäöüÄÖÜß.-]+)?)\s+(HRB|HRA|VR|PR|GnR|GsR|PartG)\s+([0-9]+)/g;
  let m;
  let count = 0;
  while ((m = pat.exec(text)) !== null && count < 60) {
    count++;
    const name = m[1].replace(/\s+/g, " ").trim();
    if (name.length < 4) continue;
    // Sanity: Name darf nicht nur aus Rechtsform-Wörtern bestehen
    if (/^(GmbH|AG|UG|KG|OHG|SE|GbR|e\.V\.|e\.K\.)\s/.test(name)) continue;
    mergeHit(hits, byName, {
      name,
      court: m[3]?.trim() ?? m[2]?.trim(),
      registerType: m[4]?.toUpperCase(),
      registerNumber: m[5],
      source: "northdata",
    });
  }
}

interface NdResult {
  hits: Hit[];
  debug: {
    httpStatus: number;
    htmlSize: number;
    jsonLdScripts: number;
    afterJsonLd: number;
    afterHtmlCards: number;
    afterVisibleText: number;
    finalLayout: "detail" | "list" | "empty" | "blocked";
    titleSnippet: string;
  };
}

const USER_AGENTS = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
];

async function fetchWithRetry(url: string): Promise<Response | null> {
  // Bei 429 einmal mit anderem User-Agent + kurzem Backoff erneut versuchen.
  for (let attempt = 0; attempt < 2; attempt++) {
    const ua = USER_AGENTS[(attempt + Math.floor(Math.random() * USER_AGENTS.length)) % USER_AGENTS.length];
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": ua,
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
          "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
          "Cache-Control": "no-cache",
        },
        signal: AbortSignal.timeout(10000),
        redirect: "follow",
      });
      if (res.status === 429 && attempt === 0) {
        const retryAfter = Number(res.headers.get("retry-after") ?? "0");
        const wait = Math.min(retryAfter > 0 ? retryAfter * 1000 : 800, 2000);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      return res;
    } catch {
      if (attempt === 1) return null;
    }
  }
  return null;
}

async function searchGleif(q: string): Promise<Hit[] | null> {
  // GLEIF (Global Legal Entity Identifier Foundation): kostenlose, offizielle
  // JSON-API. Deckt alle Firmen mit LEI-Code ab (i.d.R. größere/regulierte
  // Unternehmen). Kein Rate-Limit unter normaler Nutzung, kein Auth.
  const url =
    `https://api.gleif.org/api/v1/lei-records?` +
    `filter%5Bfulltext%5D=${encodeURIComponent(q)}` +
    `&filter%5Bentity.jurisdiction%5D=DE` +
    `&page%5Bsize%5D=10`;
  try {
    const res = await fetch(url, {
      headers: { "Accept": "application/vnd.api+json", "User-Agent": "GruenderX-CompanyCheck/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const json = await res.json().catch(() => null);
    if (!json?.data || !Array.isArray(json.data)) return null;
    const hits: Hit[] = [];
    for (const rec of json.data) {
      const entity = rec?.attributes?.entity;
      if (!entity) continue;
      const name = String(entity.legalName?.name ?? "").trim();
      if (!name) continue;
      // registeredAs ist z.B. "HRB 12345" oder "HRA 67890"
      const regRaw = String(entity.registeredAs ?? "");
      const regMatch = regRaw.match(/^(HRB|HRA|VR|PR|GnR|GsR|PartG)\s*([0-9A-Za-z]+)/i);
      const status = String(entity.status ?? "").toUpperCase();
      hits.push({
        name,
        court: String(entity.legalAddress?.city ?? entity.headquartersAddress?.city ?? "") || undefined,
        registerType: regMatch?.[1]?.toUpperCase(),
        registerNumber: regMatch?.[2],
        source: status === "INACTIVE" ? "gleif (inaktiv)" : "gleif",
      });
    }
    return hits;
  } catch {
    return null;
  }
}

async function searchNorthData(q: string): Promise<NdResult | null> {
  const url = `https://www.northdata.de/_search?query=${encodeURIComponent(q)}`;
  try {
    const res = await fetchWithRetry(url);
    if (!res) return null;
    const httpStatus = res.status;
    if (!res.ok) {
      return {
        hits: [],
        debug: {
          httpStatus,
          htmlSize: 0,
          jsonLdScripts: 0,
          afterJsonLd: 0,
          afterHtmlCards: 0,
          afterVisibleText: 0,
          finalLayout: "blocked",
          titleSnippet: "",
        },
      };
    }
    const html = await res.text();

    const hits: Hit[] = [];
    const byName = new Map<string, Hit>();

    const jsonLdScripts = (html.match(/<script type="application\/ld\+json">/g) ?? []).length;

    // 1) JSON-LD: LocalBusiness (Detail-Hit) + BreadcrumbList/ItemList (Liste).
    extractFromJsonLd(html, hits, byName);
    const afterJsonLd = hits.length;

    // 2) HTML-Treffer-Cards (alte search-results-Variante).
    const re = /<a class="title"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
    let m;
    while ((m = re.exec(html)) !== null) {
      const href = m[1];
      const titleRaw = decodeEntities(m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
      if (!titleRaw) continue;
      const regMatch = href.match(/\/(HRB|HRA|VR|PR|GnR|GsR|PartG)(?:%20|\s)([0-9A-Za-z]+)/i);
      if (!regMatch) continue;
      const parts = titleRaw.split(",").map((p) => p.trim()).filter(Boolean);
      const court = parts.length > 1 ? parts[parts.length - 1] : undefined;
      const name = (parts.length > 1 ? parts.slice(0, -1).join(", ") : titleRaw)
        .replace(/\s+✝︎\s*$/, "")
        .trim();
      mergeHit(hits, byName, {
        name,
        court,
        registerType: regMatch[1].toUpperCase(),
        registerNumber: regMatch[2],
        source: "northdata",
      });
    }
    const afterHtmlCards = hits.length;

    // 3) Last-Resort: Strikter Visible-Text-Regex (zwingt HRB/HRA/...).
    if (hits.length === 0) {
      extractFromVisibleText(html, hits, byName);
    }
    const afterVisibleText = hits.length;

    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const titleSnippet = titleMatch ? titleMatch[1].slice(0, 120) : "";

    // Explizite "keine Resultate"-Seite von NorthData (incl. frown icon).
    const explicitEmpty =
      /Keine Resultate zu dieser Suchanfrage/i.test(html) ||
      /<i class="frown icon"><\/i>/.test(html);

    let finalLayout: "detail" | "list" | "empty" | "blocked" = "empty";
    if (afterJsonLd > 0 || afterHtmlCards > 0 || afterVisibleText > 0) {
      finalLayout = jsonLdScripts > 1 ? "list" : "detail";
    } else if (explicitEmpty) {
      finalLayout = "empty";
    } else if (jsonLdScripts === 0 || html.length < 50000) {
      finalLayout = "blocked";
    }

    return {
      hits,
      debug: {
        httpStatus,
        htmlSize: html.length,
        jsonLdScripts,
        afterJsonLd,
        afterHtmlCards,
        afterVisibleText,
        finalLayout,
        titleSnippet,
      },
    };
  } catch {
    return null;
  }
}

function getSupabase() {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { name } = await req.json();
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return new Response(JSON.stringify({ error: "name required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const q = name.trim();
    const qStripped = stripLegalForm(q);
    const cacheKey = norm(q);

    // 1) Cache-Lookup (24h für ok, 5min für fail).
    const supabase = getSupabase();
    if (supabase) {
      const { data: cached } = await supabase
        .from("company_check_cache")
        .select("data, fetched_at")
        .eq("query_key", cacheKey)
        .maybeSingle();
      if (cached?.data && cached.fetched_at) {
        const ageMs = Date.now() - new Date(cached.fetched_at).getTime();
        const wasFail = !!cached.data.searchFailed;
        const ttl = wasFail ? CACHE_TTL_FAIL_MS : CACHE_TTL_MS;
        if (ageMs < ttl) {
          return new Response(
            JSON.stringify({ ...cached.data, _cached: true, _cacheAgeSec: Math.round(ageMs / 1000) }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }
      }
    }

    // 2) Live-Suche: NorthData + GLEIF parallel.
    const [ndResult, gleifHits] = await Promise.all([
      searchNorthData(q),
      searchGleif(q),
    ]);

    const ndBlocked = ndResult === null || ndResult.debug.finalLayout === "blocked";
    const gleifFailed = gleifHits === null;

    // searchFailed nur wenn BEIDE Quellen tot/blockiert sind. Ein "noHits" von
    // GLEIF allein reicht nicht (kleine GmbHs sind dort selten gelistet).
    const searchFailed = ndBlocked && gleifFailed;

    const sources = {
      northdata: ndResult === null ? "error" : ndBlocked ? "blocked" : "ok",
      gleif: gleifHits === null ? "error" : "ok",
    };

    // Treffer mergen: NorthData (großer Pool) + GLEIF (offiziell).
    const mergedByName = new Map<string, Hit>();
    const mergedHits: Hit[] = [];
    for (const h of ndResult?.hits ?? []) mergeHit(mergedHits, mergedByName, h);
    for (const h of gleifHits ?? []) mergeHit(mergedHits, mergedByName, h);

    let exactConflict = false;
    let similarConflict = false;
    const rawHits = searchFailed ? [] : mergedHits;
    const scored = rawHits
      .map((h) => {
        const hStripped = stripLegalForm(h.name);
        const exact = qStripped.length > 0 && hStripped === qStripped;
        const score = overlapScore(q, h.name);
        if (exact) exactConflict = true;
        if (!exact && score >= 0.6) similarConflict = true;
        return { ...h, score, exact };
      })
      .sort((a, b) => Number(b.exact) - Number(a.exact) || (b.score ?? 0) - (a.score ?? 0));

    const noHits = !searchFailed && scored.length === 0;

    const payload = {
      query: q,
      hits: scored.slice(0, 12),
      exactConflict,
      similarConflict,
      noHits,
      searchFailed,
      sources,
      debug: ndResult?.debug,
      handelsregisterUrl: `https://www.handelsregister.de/rp_web/search.xhtml`,
      northdataUrl: `https://www.northdata.de/_search?query=${encodeURIComponent(q)}`,
      unternehmensregisterUrl: `https://www.unternehmensregister.de/ureg/search1.4.html?submitaction=showQuickSearch&search.text=${encodeURIComponent(q)}`,
      dpmaUrl: `https://register.dpma.de/DPMAregister/marke/erweitert?searchTerm=${encodeURIComponent(q)}`,
      note: "Indikative Suche – verbindlich nur die offizielle Handelsregister-Auskunft.",
    };

    // 3) Cache-Write (auch bei searchFailed, aber kürzer – siehe Read-Pfad).
    if (supabase) {
      await supabase.from("company_check_cache").upsert({
        query_key: cacheKey,
        query_raw: q,
        data: payload,
        fetched_at: new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
