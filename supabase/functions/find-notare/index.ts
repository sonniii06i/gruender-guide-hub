// Sucht Notare in der Nähe einer PLZ über die offizielle Notarsuche der Bundesnotarkammer.
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

interface Notar {
  name: string;
  street?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { plz } = await req.json();
    if (!plz || !/^\d{4,5}$/.test(String(plz))) {
      return new Response(JSON.stringify({ error: "plz required (4-5 digits)" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Notarsuche der Bundesnotarkammer (öffentliche JSON-API hinter dem UI)
    const url = `https://www.notar.de/notarsuche?type=1452&tx_bnotknotarverz_pi1[searchType]=plz&tx_bnotknotarverz_pi1[plz]=${plz}&tx_bnotknotarverz_pi1[radius]=10`;
    const html = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 GründerX-Bot", "Accept-Language": "de" },
    }).then((r) => r.text()).catch(() => "");

    const notare: Notar[] = [];
    // Jeder Notar ist in einer .notarverz-result-box o.ä. – wir parsen defensive.
    const blocks = html.split(/class="[^"]*(?:result|notar)[^"]*"/i).slice(1, 16);
    for (const block of blocks) {
      const chunk = block.slice(0, 2000);
      const text = chunk.replace(/<style[\s\S]*?<\/style>/g, "").replace(/<script[\s\S]*?<\/script>/g, "");
      const nameMatch = text.match(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/i);
      const name = nameMatch ? nameMatch[1].replace(/<[^>]+>/g, "").trim() : null;
      if (!name) continue;
      const plain = text.replace(/<[^>]+>/g, "\n").replace(/\n{2,}/g, "\n");
      const plzCity = plain.match(/(\d{5})\s+([A-Za-zÄÖÜäöüß\-\.\s]+)/);
      const street = plain.match(/([A-ZÄÖÜ][\wÄÖÜäöüß\.\- ]+\s+\d+[a-z]?)/);
      const phone = plain.match(/(\+?\d[\d\s\/\-\(\)]{6,})/);
      const email = plain.match(/[\w\.\-]+@[\w\.\-]+\.[a-z]{2,}/i);
      const website = chunk.match(/href="(https?:\/\/[^"]+)"/i);
      notare.push({
        name,
        street: street?.[1]?.trim(),
        postalCode: plzCity?.[1],
        city: plzCity?.[2]?.trim(),
        phone: phone?.[1]?.trim(),
        email: email?.[0],
        website: website?.[1],
      });
      if (notare.length >= 10) break;
    }

    return new Response(JSON.stringify({
      plz,
      notare,
      sourceUrl: url,
      fallbackUrl: `https://www.notar.de/notarsuche?tx_bnotknotarverz_pi1[plz]=${plz}`,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
