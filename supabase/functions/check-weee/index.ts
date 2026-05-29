import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Offizielle SOAP-Schnittstelle der stiftung ear (VerzeichnisService v2).
// Doku: https://www.ear-system.de/ear-soap/v2/doc/service_ear_VerzeichnisService.html
// Keine Authentifizierung nötig, öffentliches Bestandsverzeichnis der registrierten Hersteller.
const EAR_ENDPOINT = "https://soap.ear-system.de/ear-soap/v2/VerzeichnisService";

/** XML-Sonderzeichen im User-Input escapen, damit der SOAP-Body valide bleibt. */
function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** XML-Entities in der Response zurück in Klartext wandeln. */
function decodeXml(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

/**
 * Feld aus einem XML-Chunk ziehen — prefix-agnostisch (ear:feld oder feld), ignoriert Attribute.
 * `(?:\s[^>]*)?>` statt `[^>]*>`: nach dem Tag-Namen darf nur ">" oder Whitespace+Attribute folgen.
 * Sonst würde z. B. <marke> auch das Container-Tag <marken> matchen.
 */
function field(chunk: string, name: string): string {
  const m = chunk.match(new RegExp(`<(?:\\w+:)?${name}(?:\\s[^>]*)?>([\\s\\S]*?)</(?:\\w+:)?${name}>`));
  return m ? decodeXml(m[1].trim()) : "";
}

interface MarkeEntry {
  weeeNr: string; // formatiert "DE 12345678"
  registrierungsnummer: string;
  marke: string;
  herstellername: string; // Hersteller ODER Bevollmächtigter ("X für Y")
  kategorie: string;
  geraeteart: string;
  veroeffentlichung: string; // YYYY-MM-DD
  markaustritt: string; // YYYY-MM-DD oder "" wenn noch aktiv
  aktiv: boolean;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const rawMarke: string = (body?.marke ?? "").toString().trim();
    const herstellername: string = (body?.herstellername ?? "").toString().trim();
    const page: number = Math.max(1, parseInt(String(body?.page ?? "1"), 10) || 1);

    if (rawMarke.length < 2 && herstellername.length < 2) {
      return new Response(
        JSON.stringify({ error: "Bitte mindestens 2 Zeichen eingeben (Marke oder Hersteller)." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Enthält-Suche per Wildcard, wenn der User nicht selbst * setzt.
    const markeQuery = rawMarke ? (rawMarke.includes("*") ? rawMarke : `*${rawMarke}*`) : "";
    const herstellerQuery = herstellername
      ? herstellername.includes("*")
        ? herstellername
        : `*${herstellername}*`
      : "";

    const parts: string[] = [];
    if (herstellerQuery) parts.push(`<herstellername>${escapeXml(herstellerQuery)}</herstellername>`);
    if (markeQuery) parts.push(`<marke>${escapeXml(markeQuery)}</marke>`);
    parts.push(`<page>${page}</page>`);

    const envelope = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v2="http://www.ear-system.de/ear-soap/v2"><soapenv:Header/><soapenv:Body><v2:getMarken>${parts.join("")}</v2:getMarken></soapenv:Body></soapenv:Envelope>`;

    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 25000);
    const resp = await fetch(EAR_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/xml; charset=utf-8", SOAPAction: '""' },
      body: envelope,
      signal: ctrl.signal,
    }).finally(() => clearTimeout(t));

    const text = await resp.text();

    // Auf SOAP-Fault prüfen.
    const fault = text.match(/<faultstring[^>]*>([\s\S]*?)<\/faultstring>/);
    if (fault) {
      console.error("EAR SOAP fault:", fault[1]);
      return new Response(
        JSON.stringify({ error: `EAR-Register meldet: ${decodeXml(fault[1].trim())}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Antwort kommt MTOM/XOP-verpackt — den SOAP-Envelope herausschneiden.
    const envMatch = text.match(/<(?:\w+:)?Envelope[\s\S]*?<\/(?:\w+:)?Envelope>/);
    const xml = envMatch ? envMatch[0] : text;

    // Container-Metadaten (stehen vor den Items, kollidieren namentlich nicht mit Item-Feldern).
    const total = parseInt(field(xml, "total") || "0", 10);
    const moreFound = field(xml, "moreFound") === "true";

    // Items: am Schließtag </marken> splitten. Jedes Segment mit registrierungsnummer ist ein Treffer.
    const segments = xml.split(/<\/(?:\w+:)?marken>/);
    const entries: MarkeEntry[] = [];
    for (const seg of segments) {
      if (!/<(?:\w+:)?registrierungsnummer/.test(seg)) continue;
      const reg = field(seg, "registrierungsnummer");
      if (!reg) continue;
      const markaustritt = field(seg, "markaustritt"); // bei nil="true" self-closing → ""
      entries.push({
        weeeNr: `DE ${reg}`,
        registrierungsnummer: reg,
        marke: field(seg, "marke"),
        herstellername: field(seg, "herstellername"),
        kategorie: field(seg, "kategoriename"),
        geraeteart: field(seg, "geraeteartname"),
        veroeffentlichung: field(seg, "veroeffentlichung"),
        markaustritt,
        aktiv: markaustritt === "",
      });
    }

    // Sortierung: aktive zuerst, dann nach Veröffentlichung absteigend.
    entries.sort((a, b) => {
      if (a.aktiv !== b.aktiv) return a.aktiv ? -1 : 1;
      return b.veroeffentlichung.localeCompare(a.veroeffentlichung);
    });

    const distinctWeee = new Set(entries.map((e) => e.registrierungsnummer)).size;
    const distinctHersteller = new Set(entries.map((e) => e.herstellername)).size;
    const aktivCount = entries.filter((e) => e.aktiv).length;

    return new Response(
      JSON.stringify({
        query: rawMarke || herstellername,
        searchedBy: rawMarke ? "marke" : "herstellername",
        total,
        moreFound,
        page,
        returned: entries.length,
        distinctWeee,
        distinctHersteller,
        aktivCount,
        entries,
        source: "stiftung ear · VerzeichnisService (offiziell)",
        verzeichnisUrl: "https://www.ear-system.de/ear-verzeichnis/hersteller",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("check-weee error:", e);
    const aborted = e instanceof Error && e.name === "AbortError";
    return new Response(
      JSON.stringify({
        error: aborted
          ? "EAR-Register antwortet gerade nicht (Timeout). Bitte später nochmal."
          : "Abfrage fehlgeschlagen. Bitte später nochmal versuchen.",
      }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
