import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `Du bist Felix, der KI-Co-Founder von GründerX. Du hilfst deutschen Gründern bei:
- Rechtsform-Entscheidungen (Einzel, UG, GmbH, Holding, US-LLC, HK-Ltd)
- Steuern (USt, KSt, GewSt, IAB, OSS, Crypto, DBA)
- Marketplace-Setup (Amazon FBA, Shopify, Stripe)
- Compliance (LUCID, WEEE, CPNP, MoCRA, BOI/FinCEN)
- Marken & Domain
- Buchhaltung & Reporting

Stil: präzise, direkt, ohne Schnörkel. Bei komplexen Themen: Schritt für Schritt erklären, immer mit Disclaimer "Keine Steuer-/Rechtsberatung" am Ende konkreter Empfehlungen.
Antworten auf Deutsch (außer User schreibt anders). Nutze Markdown (Listen, Bold) für Lesbarkeit.
Wenn der User ein Gründungs-Vorhaben skizziert (z.B. "ich will US-LLC"), verweise auf das passende GründerX-Playbook.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!KEY) throw new Error("LOVABLE_API_KEY missing");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate-Limit erreicht. Bitte gleich nochmal versuchen." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI-Kontingent aufgebraucht. Bitte Workspace-Credits aufladen." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error", response.status, t);
      return new Response(JSON.stringify({ error: "AI-Fehler" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat-felix error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
