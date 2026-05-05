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
    });
    if (!res.ok) return null;
    const html = await res.text();

    const hits: Hit[] = [];
    const seen = new Set<string>();
    // <a class="title" href="/Firma%20Foo,%20Berlin/HRB%2012345" ...>Firma Foo, Berlin</a>
    const re = /<a class="title"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
    let m;
    while ((m = re.exec(html)) !== null && hits.length < 30) {
      const href = m[1];
      const titleRaw = decodeEntities(m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
      if (!titleRaw) continue;

      // DE-Register-Marker im Pfad
      const regMatch = href.match(/\/(HRB|HRA|VR|PR|GnR|GsR|PartG)(?:%20|\s)([0-9A-Za-z]+)/i);
      if (!regMatch) continue;
      const registerType = regMatch[1].toUpperCase();
      const registerNumber = regMatch[2];

      // Letztes Komma-Segment ist Stadt/Gericht
      const parts = titleRaw.split(",").map((p) => p.trim()).filter(Boolean);
      const court = parts.length > 1 ? parts[parts.length - 1] : undefined;
      // Name ist alles vor dem Stadt-Suffix (NorthData duplicates city manchmal)
      const name = parts.length > 1 ? parts.slice(0, -1).join(", ") : titleRaw;

      const key = `${registerType}-${registerNumber}`;
      if (seen.has(key)) continue;
      seen.add(key);

      hits.push({
        name: name.replace(/\s+✝︎\s*$/, "").trim(),
        court,
        registerType,
        registerNumber,
        source: "northdata",
      });
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
