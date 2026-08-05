// ===================================================================
// meta-capi: nimmt ein Conversion-Ereignis vom Client entgegen und meldet es
// serverseitig an Meta — mit derselben event_id, die der Browser-Pixel benutzt
// hat, damit Meta beides als EIN Ereignis zählt.
//
// Warum überhaupt vom Client aufgerufen? Weil genau dort `_fbc`/`_fbp` und der
// echte User-Agent liegen. Der Server sieht die Cookies sonst nicht — und `fbc`
// ist der Parameter, der die Event Match Quality am stärksten hebt.
//
// Der Kauf (Purchase) läuft NICHT hierüber, sondern aus dem Stripe-Webhook:
// dort ist die E-Mail sicher bekannt, der Betrag exakt (inkl. Rabattcode), und
// das Ereignis geht nicht verloren, wenn der Nutzer den Tab schließt.
//
// verify_jwt = false: das Ereignis kann auch vor dem Login entstehen
// (Tool-Ergebnis ohne Konto). Missbrauch ist unattraktiv — man könnte höchstens
// fremde Conversions erfinden, ohne Zugriff auf Daten zu bekommen.
// ===================================================================
import { readFbCookies, sendMetaCapiEvent, type CapiEvent } from "../_shared/metaCapi.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Nur diese Ereignisse sind erlaubt — verhindert, dass ein manipulierter Client
// beliebige Namen in den Datensatz schreibt und die Auswertung verwässert.
const ALLOWED: Record<string, CapiEvent> = {
  tool_result: "Lead",
  signup: "CompleteRegistration",
  activation: "StartTrial",
  purchase: "Purchase",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") {
    return new Response("method not allowed", { status: 405, headers: CORS });
  }

  try {
    const { kind, eventId, value, email, externalId, sourceUrl } = await req.json();

    const event = ALLOWED[String(kind)];
    if (!event || !eventId) {
      return new Response(JSON.stringify({ error: "kind oder eventId fehlt/ungültig" }), {
        status: 400,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const { fbc, fbp } = readFbCookies(req);

    const ergebnis = await sendMetaCapiEvent({
      event,
      eventId: String(eventId),
      value: typeof value === "number" ? value : undefined,
      currency: "EUR",
      eventSourceUrl: typeof sourceUrl === "string" ? sourceUrl : null,
      user: {
        email: typeof email === "string" ? email : null,
        externalId: typeof externalId === "string" ? externalId : null,
        fbc,
        fbp,
        // Cloudflare/Supabase reichen die echte Client-IP im Header durch.
        clientIp:
          req.headers.get("cf-connecting-ip") ||
          (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
          null,
        userAgent: req.headers.get("user-agent"),
      },
    });

    // `capi` sagt, ob Meta das Ereignis wirklich angenommen hat. Ohne das
    // Feld wäre "ok" auch dann wahr, wenn der Token abgelaufen ist.
    return new Response(JSON.stringify({ ok: true, capi: ergebnis }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (err) {
    // Auch hier: nie eskalieren. Der Client wartet nicht auf das Ergebnis.
    console.error("meta-capi:", (err as Error).message);
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
