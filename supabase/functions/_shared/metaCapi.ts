// ===================================================================
// Meta Conversions API — serverseitige Meldung derselben Ereignisse,
// die der Browser-Pixel schickt.
//
// WOZU. Der Browser-Pixel verliert in Deutschland typischerweise 10–30 % der
// Conversions: Ablehnung im Einwilligungsdialog, Adblocker, iOS-Tracking-Schutz.
// Was ankommt, ist zusätzlich schlecht zugeordnet. Meta misst das als Event
// Match Quality; der Unterschied zwischen EMQ 4 und EMQ 8 liegt in der Praxis
// im zweistelligen Prozentbereich beim CPA — mehr, als die meisten
// Creative-Tests bringen.
//
// DEDUPLIZIERUNG. Browser und Server melden DASSELBE Ereignis. Meta erkennt das
// nur an einer identischen `event_id` — die erzeugt adConversions.ts im Client
// und gibt sie zurück. Fehlt sie, zählt jede Conversion doppelt und die
// Gebotsstrategie reagiert auf eine erfundene Menge.
//
// HASHING. Alles Personenbezogene wird vor dem Versand SHA-256-gehasht, und
// zwar nach Metas Normalisierung (trimmen, kleinschreiben). Falsch normalisiert
// = kein Match = der ganze Aufwand umsonst. `fbc`/`fbp` sind Cookie-Werte und
// werden NICHT gehasht.
// ===================================================================

const GRAPH_VERSION = "v21.0";

export type CapiEvent =
  | "CompleteRegistration"
  | "StartTrial"
  | "Purchase"
  | "Lead"
  | "ViewContent";

export interface CapiUserData {
  /** Roh-E-Mail; wird hier normalisiert und gehasht. */
  email?: string | null;
  /** Cookie `_fbc` — entsteht aus dem fbclid. Stärkster Einzelparameter. */
  fbc?: string | null;
  /** Cookie `_fbp` — Browser-ID des Pixels. */
  fbp?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
  /** Externe stabile ID (hier: Supabase-User-ID), wird gehasht. */
  externalId?: string | null;
}

export interface CapiPayload {
  event: CapiEvent;
  /** MUSS identisch zur Browser-seitigen event_id sein. */
  eventId: string;
  /** Unix-Sekunden. Default: jetzt. Meta akzeptiert bis zu 7 Tage rückwirkend. */
  eventTime?: number;
  eventSourceUrl?: string | null;
  value?: number;
  currency?: string;
  user: CapiUserData;
}

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Metas Normalisierung: trimmen + kleinschreiben. Ohne sie matcht nichts. */
async function hashNormalized(value: string | null | undefined): Promise<string | undefined> {
  const v = (value || "").trim().toLowerCase();
  return v ? await sha256Hex(v) : undefined;
}

/** Ausgang eines CAPI-Aufrufs — siehe Kommentar an `sendMetaCapiEvent`. */
export type CapiResult = "sent" | "failed" | "skipped";

/**
 * Ein Ereignis an die Conversions API melden.
 *
 * Wirft NIE. Ein fehlgeschlagener CAPI-Aufruf darf weder einen Checkout noch
 * einen Webhook abbrechen — Stripe würde den Webhook sonst als fehlgeschlagen
 * werten und stundenlang wiederholen.
 *
 * GIBT ABER ZURÜCK, WAS PASSIERT IST. Vorher war der Rückgabewert `void` und
 * das Ergebnis stand nur in `console.log`. Damit ist eine kaputte CAPI völlig
 * stumm: Der Aufrufer bekommt dasselbe „ok" wie im Erfolgsfall, und ob Meta
 * die Ereignisse überhaupt annimmt, sieht man erst, wenn Wochen später die
 * Attribution nicht stimmt.
 *
 * Genau diese Fehlerklasse hat hier schon einmal zugeschlagen: 4249
 * Analytics-Zeilen, kein einziges `signup_completed`, weil eine RLS-Regel die
 * Inserts still verworfen hat — bei genau dem Ereignis, auf das die Kampagne
 * optimiert. Stille Fehlschläge in der Messkette sind teuer, weil man sie erst
 * bemerkt, wenn das Budget schon ausgegeben ist.
 *
 * Der Rückgabewert ist bewusst grob (`sent`/`failed`/`skipped`) und enthält
 * nicht Metas Fehlertext — die Antwort geht bis in den Browser, und dort haben
 * Token-Hinweise und interne Meldungen nichts zu suchen. Details bleiben im Log.
 */
export async function sendMetaCapiEvent(payload: CapiPayload): Promise<CapiResult> {
  const pixelId = Deno.env.get("META_PIXEL_ID");
  const token = Deno.env.get("META_CAPI_TOKEN");
  if (!pixelId || !token) {
    console.log("ℹ️ CAPI übersprungen: META_PIXEL_ID oder META_CAPI_TOKEN fehlt");
    return "skipped";
  }

  try {
    const user_data: Record<string, unknown> = {};
    const em = await hashNormalized(payload.user.email);
    if (em) user_data.em = [em];
    const extId = await hashNormalized(payload.user.externalId);
    if (extId) user_data.external_id = [extId];
    // Cookies gehen ungehasht — sie sind keine personenbezogenen Klartextdaten.
    if (payload.user.fbc) user_data.fbc = payload.user.fbc;
    if (payload.user.fbp) user_data.fbp = payload.user.fbp;
    if (payload.user.clientIp) user_data.client_ip_address = payload.user.clientIp;
    if (payload.user.userAgent) user_data.client_user_agent = payload.user.userAgent;

    const body: Record<string, unknown> = {
      data: [
        {
          event_name: payload.event,
          event_time: payload.eventTime ?? Math.floor(Date.now() / 1000),
          event_id: payload.eventId,
          action_source: "website",
          event_source_url: payload.eventSourceUrl ?? undefined,
          user_data,
          custom_data:
            payload.value !== undefined
              ? { value: payload.value, currency: payload.currency ?? "EUR" }
              : undefined,
        },
      ],
    };

    // Nur für die Fehlersuche im Events Manager ("Test-Ereignisse").
    const testCode = Deno.env.get("META_CAPI_TEST_EVENT_CODE");
    if (testCode) body.test_event_code = testCode;

    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      console.error(`⚠️ CAPI ${payload.event} fehlgeschlagen (${res.status}):`, await res.text());
      return "failed";
    }
    console.log(`✅ CAPI ${payload.event} gesendet (event_id ${payload.eventId})`);
    return "sent";
  } catch (err) {
    console.error("⚠️ CAPI-Ausnahme:", (err as Error).message);
    return "failed";
  }
}

/** Liest `_fbc`/`_fbp` aus dem Cookie-Header eines Requests. */
export function readFbCookies(req: Request): { fbc?: string; fbp?: string } {
  const raw = req.headers.get("cookie") || "";
  const out: { fbc?: string; fbp?: string } = {};
  for (const part of raw.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === "_fbc") out.fbc = rest.join("=");
    if (k === "_fbp") out.fbp = rest.join("=");
  }
  return out;
}
