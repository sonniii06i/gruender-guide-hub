// Sucht im deutschen Unternehmensregister nach einem Firmennamen.
// Primär: OffeneRegister (Datasette-JSON). Fallback: ureg.de HTML-Scrape.
// Normalisiert Rechtsformen vor dem Vergleich, damit "MMS E-Commerce GmbH" auch dann
// matcht, wenn das Register "MMS E-Commerce" oder "MMS E-Commerce UG" zurückgibt.
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

interface Hit { name: string; court?: string; location?: string; source: string; }

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

async function searchOffeneRegister(q: string): Promise<Hit[] | null> {
  // Datasette-JSON. _shape=array gibt direkt ein Array von Objekten zurück.
  const url = `https://db.offeneregister.de/openregister/company.json?_search=${encodeURIComponent(q)}&_size=25&_shape=array`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "GruenderX-CompanyCheck/1.0", "Accept": "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    if (!Array.isArray(data)) return null;
    return data
      .map((r: any) => ({
        name: String(r.name ?? r.current_status ?? "").trim(),
        court: String(r.register_court ?? "").trim() || undefined,
        location: String(r.native_company_number ?? r.registered_office ?? "").trim() || undefined,
        source: "offeneregister",
      }))
      .filter((h) => h.name && h.name.length >= 2);
  } catch {
    return null;
  }
}

async function searchUnternehmensregister(q: string): Promise<Hit[] | null> {
  // ureg.de Quicksearch. Ist serverside JSF, der erste Request liefert oft schon
  // eine Trefferliste in einer Tabelle, wenn die Suche ohne Filter erfolgt.
  const url = `https://www.unternehmensregister.de/ureg/result.html;jsessionid=?submitaction=showResultList&search.text=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "de-DE,de;q=0.9",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    const hits: Hit[] = [];
    const seen = new Set<string>();
    const qLc = q.toLowerCase();
    const qFirstToken = qLc.split(/\s+/)[0];

    // 1) Treffer-Zeilen in einer Tabelle (typische ureg-Ausgabe)
    const tableRows = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) ?? [];
    for (const row of tableRows) {
      const text = row.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (!text || text.length < 4 || text.length > 300) continue;
      const lc = text.toLowerCase();
      const looksLikeCompany =
        LEGAL_FORMS.some((lf) => lc.includes(lf)) ||
        lc.includes(qFirstToken);
      if (!looksLikeCompany) continue;
      const key = norm(text);
      if (seen.has(key)) continue;
      seen.add(key);
      hits.push({ name: text.slice(0, 200), source: "ureg" });
    }

    // 2) Fallback: Bold/Strong-Tags mit Firmennamen
    if (hits.length === 0) {
      const bolds = html.match(/<(?:b|strong)[^>]*>([^<]{4,160})<\/(?:b|strong)>/gi) ?? [];
      for (const b of bolds) {
        const t = b.replace(/<[^>]+>/g, "").trim();
        const lc = t.toLowerCase();
        if (!lc.includes(qFirstToken)) continue;
        const key = norm(t);
        if (seen.has(key)) continue;
        seen.add(key);
        hits.push({ name: t, source: "ureg" });
      }
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

    const [orHits, uregHits] = await Promise.all([
      searchOffeneRegister(queryForSearch),
      searchUnternehmensregister(q),
    ]);

    const sources = {
      offeneregister: orHits === null ? "error" : "ok",
      unternehmensregister: uregHits === null ? "error" : "ok",
    };

    const merged = [...(orHits ?? []), ...(uregHits ?? [])];

    let exactConflict = false;
    let similarConflict = false;
    const scored = merged
      .map((h) => {
        const hStripped = stripLegalForm(h.name);
        const exact = qStripped.length > 0 && hStripped === qStripped;
        const score = overlapScore(q, h.name);
        if (exact) exactConflict = true;
        if (!exact && score >= 0.6) similarConflict = true;
        return { ...h, score, exact };
      })
      .sort((a, b) => Number(b.exact) - Number(a.exact) || b.score - a.score);

    const searchFailed = orHits === null && uregHits === null;
    const noHits = !searchFailed && scored.length === 0;

    return new Response(JSON.stringify({
      query: q,
      hits: scored.slice(0, 10),
      exactConflict,
      similarConflict,
      noHits,
      searchFailed,
      sources,
      handelsregisterUrl: `https://www.handelsregister.de/rp_web/search.xhtml`,
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
