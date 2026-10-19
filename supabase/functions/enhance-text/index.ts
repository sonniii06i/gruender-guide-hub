// Verbessert die Formulierung eines kurzen Texts (z.B. Unternehmensgegenstand)
// ohne den Sinn zu ändern. KI-Kette Claude → Gemini → OpenAI (_shared/llm.ts).
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { nutzerAusJwt } from "../_shared/authGuard.ts";
import { CLAUDE_MODELL, llmChat, llmVerfuegbar, versucheAus, versucheText } from "../_shared/llm.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  unternehmensgegenstand: `Du formulierst Unternehmensgegenstände für deutsche GmbH-Gesellschaftsverträge präziser.

Regeln:
- Konkret und prüfbar (Registergericht prüft das!) – keine Floskeln wie "Beratung allgemein" oder "Handel mit Waren aller Art"
- Zentrale Tätigkeit zuerst, dann Nebenleistungen
- "sowie damit verbundene Tätigkeiten" am Ende ist erlaubt und erweitert den Spielraum
- 1-3 Sätze, formell, professionell
- Sinn der Eingabe nicht verändern, nur Formulierung verbessern
- Auf Deutsch
- KEIN Markdown, KEINE Erklärungen, NUR die verbesserte Formulierung als plain text

Beispiel-Input: "wir verkaufen software für onlineshops und beraten kunden dabei"
Beispiel-Output: "Entwicklung und Vertrieb von Softwarelösungen für den Online-Handel sowie damit verbundene Beratungs- und Implementierungsleistungen."`,

  generic: `Verbessere die Formulierung des folgenden Texts. Behalte den Sinn exakt bei. Antworte nur mit dem verbesserten Text, ohne Erklärung.`,

  "taetigkeit-familiengericht": `Du formulierst die Tätigkeitsbeschreibung für einen Familiengericht-Antrag (§112 BGB) eines minderjährigen Gründers.

Regeln:
- Konkret beschreiben WAS das Kind tun will (Produkt / Dienstleistung / Plattformen / Zielgruppe)
- Risiko-bewusst formulieren: erwähne dass keine Lager-/Personal-/Kredit-Verpflichtungen entstehen wenn sinnvoll
- Schul-Kompatibilität betonen wenn aus dem Kontext klar
- Altersgerechte Tätigkeit deutlich machen
- 2-4 Sätze, sachlich-formell (das liest ein Familienrichter)
- Auf Deutsch
- Sinn der Eingabe NICHT verändern, nur professioneller formulieren
- KEIN Markdown, NUR die verbesserte Formulierung als plain text, KEINE Erklärung

Beispiel-Input: "online verkauf von sneakern"
Beispiel-Output: "Online-Handel mit Sneakern über eigene Shopify-Plattform sowie ausgewählte Marketplaces. Der Wareneinkauf erfolgt vorfinanziert ohne Kreditaufnahme; die Tätigkeit wird ausschließlich nach Schulschluss und an Wochenenden ausgeübt, ohne Beschäftigung von Mitarbeitern oder Anmietung von Geschäftsräumen."`,

  "gewa1-taetigkeit": `Du formulierst die Tätigkeitsbeschreibung für eine Gewerbeanmeldung (GewA1) präziser.

Regeln:
- Konkret und prüfbar (Gewerbeamt prüft das!) – keine Floskeln wie "Online-Handel allgemein"
- Hauptprodukt / Hauptdienstleistung zuerst, dann Plattformen / Zielgruppe
- Mehrere Tätigkeiten Komma-getrennt
- 1-2 Sätze, sachlich-formell
- Sinn nicht verändern
- Auf Deutsch, KEIN Markdown, NUR plain text

Beispiel-Input: "ich verkaufe kosmetik online"
Beispiel-Output: "Online-Einzelhandel mit eigenen Naturkosmetik-Produkten über Shopify und Amazon sowie damit verbundene Marketing-Tätigkeiten."`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // Nur fuer eingeloggte Nutzer (die Funktion haengt hinter der Paywall).
  // verify_jwt ist aus, der oeffentliche anon-Key allein reicht nicht mehr.
  if (!(await nutzerAusJwt(req))) {
    return new Response(JSON.stringify({ error: "Bitte einloggen." }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { text, kind } = await req.json();
    if (!text || typeof text !== "string" || text.trim().length < 3) {
      return new Response(JSON.stringify({ error: "text required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (text.length > 2000) {
      return new Response(JSON.stringify({ error: "text too long (max 2000 chars)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!llmVerfuegbar()) throw new Error("kein KI-Schlüssel gesetzt");

    const system = SYSTEM_PROMPTS[String(kind ?? "generic")] ?? SYSTEM_PROMPTS.generic;

    const response = await llmChat(
      {
        messages: [
          { role: "system", content: system },
          { role: "user", content: text.trim() },
        ],
        temperature: 0.3, // nur Gemini/OpenAI – Claude 5.5 lehnt Sampling-Parameter ab
      },
      {
        tag: "enhance-text",
        claude: { modell: CLAUDE_MODELL, effort: "low", maxTokens: 4000 },
        gemini: { modell: "gemini-2.5-flash" },
        openai: { modell: "gpt-4o-mini" },
      },
    );

    if (!response.ok) {
      // Anbieter-Gründe nur ins Function-Log, nicht an den Browser
      console.error("enhance-text: alle KI-Anbieter gescheitert", versucheText(versucheAus(response)));
      return new Response(JSON.stringify({ error: "Die Textverbesserung ist gerade nicht erreichbar. Bitte versuch es gleich noch einmal." }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const enhanced = String(data?.choices?.[0]?.message?.content ?? "").trim();
    if (!enhanced) {
      return new Response(JSON.stringify({ error: "empty response" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ enhanced, original: text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
