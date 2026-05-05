// Sucht nach einem Firmennamen in deutschen Registern.
// Quelle: NorthData (aggregiert Handelsregister, Vereinsregister, Partnerschaftsregister).
// Filter auf DE-Register-Marker (HRB/HRA/VR/PR/GnR/GsR/PartG) – sonst kommen NL/FR/etc-Hits.
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

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
  // Fallback: matche im sichtbaren Text Pattern wie
  // "MMS E-Commerce GmbH, Ingolstadt, Amtsgericht Ingolstadt HRB 3479"
  const text = decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
  const pat = /([A-ZÄÖÜ][^,<>{}]{2,80}?(?:GmbH(?:\s*&\s*Co\.?\s*KGa?A?)?|AG|UG\s*\(haftungsbeschränkt\)|UG|KGaA|KG|OHG|SE|e\.\s*V\.|e\.\s*K\.|GbR|PartG))(?:\s*,\s*([A-ZÄÖÜ][^,<>]{2,40}))?(?:\s*,\s*Amtsgericht\s+([A-ZÄÖÜ][\wäöüÄÖÜß-]+(?:\s+[A-ZÄÖÜ][\wäöüÄÖÜß-]+)?)\s+(HRB|HRA|VR|PR|GnR|GsR|PartG)\s+([0-9]+))?/g;
  let m;
  let count = 0;
  while ((m = pat.exec(text)) !== null && count < 60) {
    count++;
    const name = m[1].replace(/\s+/g, " ").trim();
    if (name.length < 4) continue;
    mergeHit(hits, byName, {
      name,
      court: m[3]?.trim() ?? m[2]?.trim(),
      registerType: m[4]?.toUpperCase(),
      registerNumber: m[5],
      source: "northdata",
    });
  }
}

async function searchNorthData(q: string): Promise<Hit[] | null> {
  const url = `https://www.northdata.de/_search?query=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
        "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
      },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });
    if (!res.ok) return null;
    const html = await res.text();

    const hits: Hit[] = [];
    const byName = new Map<string, Hit>();

    // 1) JSON-LD: LocalBusiness (Detail-Hit) + BreadcrumbList/ItemList (Liste).
    extractFromJsonLd(html, hits, byName);

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

    // 3) Last-Resort: Sichtbarer Text. "Firma GmbH, Stadt, Amtsgericht X HRB N".
    if (hits.length === 0) {
      extractFromVisibleText(html, hits, byName);
    }

    return hits;
  } catch {
    return null;
  }
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
    const queryForSearch = qStripped.length >= 2 ? qStripped : q;

    const ndHits = await searchNorthData(queryForSearch);

    const sources = {
      northdata: ndHits === null ? "error" : "ok",
    };

    let exactConflict = false;
    let similarConflict = false;
    const scored = (ndHits ?? [])
      .map((h) => {
        const hStripped = stripLegalForm(h.name);
        const exact = qStripped.length > 0 && hStripped === qStripped;
        const score = overlapScore(q, h.name);
        if (exact) exactConflict = true;
        if (!exact && score >= 0.6) similarConflict = true;
        return { ...h, score, exact };
      })
      .sort((a, b) => Number(b.exact) - Number(a.exact) || (b.score ?? 0) - (a.score ?? 0));

    const searchFailed = ndHits === null;
    const noHits = !searchFailed && scored.length === 0;

    return new Response(JSON.stringify({
      query: q,
      hits: scored.slice(0, 12),
      exactConflict,
      similarConflict,
      noHits,
      searchFailed,
      sources,
      handelsregisterUrl: `https://www.handelsregister.de/rp_web/search.xhtml`,
      northdataUrl: `https://www.northdata.de/_search?query=${encodeURIComponent(q)}`,
      unternehmensregisterUrl: `https://www.unternehmensregister.de/ureg/search1.4.html?submitaction=showQuickSearch&search.text=${encodeURIComponent(q)}`,
      dpmaUrl: `https://register.dpma.de/DPMAregister/marke/erweitert?searchTerm=${encodeURIComponent(q)}`,
      note: "Indikative Suche – verbindlich nur die offizielle Handelsregister-Auskunft.",
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
