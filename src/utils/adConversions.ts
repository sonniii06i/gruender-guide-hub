// Die Event-Leiter aus dem Kampagnen-Steuerpult — eine Funktion, beide Plattformen.
//
// Schwester von src/utils/adConversions.ts in AnwaltX. Gleiche Stufen, gleiche
// Meta-Ereignisnamen — nur so lassen sich beide Produkte nebeneinander bewerten.
//
// Warum eine gemeinsame Funktion statt zwei Aufrufe an der Aufrufstelle? Weil
// jede Conversion an ZWEI Plattformen muss und dabei zuverlässig eine vergessen
// wird. In AnwaltX ist genau das passiert: Meta-Events an mehreren Stellen
// verdrahtet, Google-Conversions an keiner einzigen.
//
// Zusätzlich entsteht hier die `event_id`. Sie ist die Voraussetzung dafür, dass
// Meta ein serverseitig per CAPI gemeldetes Ereignis und das Browser-Ereignis als
// EIN Ereignis erkennt. Ohne sie zählt jede Conversion doppelt, sobald CAPI dazukommt.

import {
  AD_CONVERSION_VALUES,
  GOOGLE_ADS_ID,
  GOOGLE_ADS_LABELS,
  type AdConversion,
} from "@/config/tracking";
import { hasMarketingConsent } from "@/utils/consent";

// Einzige Deklaration von `fbq` in diesem Projekt (AnwaltX hat sie in
// metaPixel.ts). adPixels.ts setzt den Stub per Cast, damit es bei genau
// dieser einen Signatur bleibt.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Meta-Standardereignis je Stufe der Leiter. */
const META_EVENT: Record<AdConversion, string> = {
  tool_result: "Lead",
  signup: "CompleteRegistration",
  activation: "StartTrial",
  purchase: "Purchase",
};

function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* ältere Browser */
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export interface AdConversionOptions {
  /** Überschreibt den Standardwert aus AD_CONVERSION_VALUES (z. B. echter Abo-Preis). */
  value?: number;
  /** Frei wählbare Bezeichnung, taucht in beiden Oberflächen auf. */
  label?: string;
  /**
   * Vorgegebene Ereignis-ID. Nur setzen, wenn dasselbe Ereignis zusätzlich
   * serverseitig gemeldet wird — dann muss dort DIESELBE ID stehen.
   */
  eventId?: string;
  /**
   * Roh-E-Mail des Nutzers, falls an der Aufrufstelle bekannt. Wird NICHT an
   * den Pixel gegeben, sondern nur an die CAPI-Funktion, die sie serverseitig
   * hasht — sie hebt die Event Match Quality deutlich.
   */
  email?: string;
}

/**
 * Eine Conversion an Meta und Google Ads gleichzeitig melden.
 *
 * Gibt die verwendete `event_id` zurück, damit die Aufrufstelle sie an einen
 * serverseitigen CAPI-Aufruf weiterreichen kann.
 * Ohne Einwilligung passiert nichts und es wird auch nichts protokolliert —
 * das ist der Normalfall, keine Fehlermeldung.
 */
export function trackAdConversion(
  kind: AdConversion,
  options: AdConversionOptions = {},
): string | null {
  if (typeof window === "undefined") return null;
  if (!hasMarketingConsent()) return null;

  const eventId = options.eventId ?? newEventId();
  const value = options.value ?? AD_CONVERSION_VALUES[kind];

  // --- Meta ---
  try {
    window.fbq?.(
      "track",
      META_EVENT[kind],
      {
        content_name: options.label ?? kind,
        value,
        currency: "EUR",
      },
      { eventID: eventId },
    );
  } catch {
    /* Tracking darf den Aufrufer nie zum Absturz bringen */
  }

  // --- Google Ads ---
  // Ein leeres Label bedeutet: die Conversion-Aktion ist in Google Ads noch
  // nicht angelegt. Dann lieber nichts senden als ein `send_to`, das ins Leere
  // zeigt und still verworfen wird.
  try {
    const gLabel = GOOGLE_ADS_LABELS[kind];
    if (gLabel) {
      window.gtag?.("event", "conversion", {
        send_to: `${GOOGLE_ADS_ID}/${gLabel}`,
        value,
        currency: "EUR",
        transaction_id: eventId,
      });
    }
  } catch {
    /* dito */
  }

  // --- Meta CAPI (serverseitig, dedupliziert über dieselbe event_id) ---
  // Fire-and-forget mit keepalive: das Ereignis faellt oft unmittelbar vor
  // einer Navigation an (Registrierung -> Weiterleitung). Ein normales fetch
  // wuerde dabei abgebrochen; keepalive laesst den Request weiterlaufen,
  // nachdem die Seite schon wechselt.
  void sendServerSide(kind, eventId, value, options.email);

  return eventId;
}

/**
 * Meldet dasselbe Ereignis zusätzlich über die Edge Function an Meta.
 *
 * Läuft bewusst im Browser und nicht rein serverseitig: `_fbc` und `_fbp`
 * stehen nur hier als Cookies zur Verfügung, und `fbc` ist der Parameter, der
 * die Event Match Quality am stärksten hebt. `credentials: "include"` ist
 * nötig, damit die Cookies überhaupt mitgehen.
 */
function sendServerSide(
  kind: AdConversion,
  eventId: string,
  value: number,
  email?: string,
): void {
  try {
    const base = import.meta.env.VITE_SUPABASE_URL;
    if (!base) return;
    void fetch(`${base}/functions/v1/meta-capi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      keepalive: true,
      body: JSON.stringify({
        kind,
        eventId,
        value,
        email,
        sourceUrl: window.location.href,
      }),
    }).catch(() => {
      /* CAPI ist Zusatzsignal, kein Pfad, der scheitern darf */
    });
  } catch {
    /* dito */
  }
}
