// Sucht im deutschen Unternehmensregister / Handelsregister nach einem Firmennamen.
// Gibt grobe Treffer + Link zur offiziellen Suche zurück. Ohne Garantie.
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

interface Hit { name: string; location?: string; court?: string; }

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { name } = await req.json();
    if (!name || typeof name !== "string" || name.length < 2) {
      return new Response(JSON.stringify({ error: "name required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const q = name.trim();

    // Unternehmensregister Quick Search (öffentlich, HTML)
    const url = `https://www.unternehmensregister.de/ureg/search1.4.html?submitaction=showQuickSearch&search.text=${encodeURIComponent(q)}`;
    const html = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 GründerX-Bot", "Accept-Language": "de" },
    }).then((r) => r.text()).catch(() => "");

    const hits: Hit[] = [];
    // Extrahiere Treffer-Zeilen (sehr defensiv, Layout kann sich ändern)
    const rows = html.match(/<a[^>]+class="[^"]*search-result[^"]*"[\s\S]*?<\/a>/g) ?? [];
    for (const row of rows.slice(0, 10)) {
      const text = row.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (text) hits.push({ name: text });
    }
    // Fallback: einfache Pattern – jeder bold mit Firmenname
    if (hits.length === 0) {
      const bold = html.match(/<b[^>]*>([^<]{3,120})<\/b>/g) ?? [];
      for (const b of bold.slice(0, 10)) {
        const t = b.replace(/<[^>]+>/g, "").trim();
        if (t.toLowerCase().includes(q.toLowerCase().split(" ")[0])) hits.push({ name: t });
      }
    }

    const exactConflict = hits.some((h) => h.name.toLowerCase().includes(q.toLowerCase()));

    return new Response(JSON.stringify({
      query: q,
      hits,
      exactConflict,
      sourceUrl: url,
      handelsregisterUrl: `https://www.handelsregister.de/rp_web/search.xhtml`,
      dpmaUrl: `https://register.dpma.de/DPMAregister/marke/erweitert?searchTerm=${encodeURIComponent(q)}`,
      note: "Indikative Suche – verbindlich nur die offizielle Handelsregister-Auskunft.",
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
