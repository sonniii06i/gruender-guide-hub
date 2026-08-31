// Protokoll-Schicht der externen Verkaufsplattformen: Signaturpruefung und
// Uebersetzung einer IPN-Meldung in "gib Zugang" / "nimm Zugang weg".
//
// Bewusst frei von Datenbank und Umgebung, damit sie ohne Supabase testbar ist
// (siehe ipn.test.ts). Was mit dem Ergebnis geschieht, entscheidet die
// aufrufende Edge Function.
//
// Signaturverfahren
// -----------------
// * CopeCart    — Header `X-Copecart-Signature`, Base64(HMAC-SHA256(roher Body,
//                 Secret)). Offiziell dokumentiert (IPN-Doku 1.6.7, 2025-06-17).
// * Digistore24 — Parameter `sha_sign`: alle nicht-leeren Parameter ausser
//                 `sha_sign`/`SHASIGN` nach Namen sortiert, je `KEY=VALUE` +
//                 Passphrase aneinandergehaengt, SHA-512, GROSSBUCHSTABEN.
// * elopage/ablefy — hat kein oeffentlich dokumentiertes Signaturverfahren. Der
//                 Schutz ist ein langes Geheimnis in der URL (prueft die
//                 aufrufende Funktion); eine mitgeschickte HMAC-Signatur wird
//                 hier zusaetzlich geprueft, falls vorhanden.
//
// `ablefy` ist nur der neue Name von elopage, keine zweite Plattform.

/** Wie lange ein Abo-Zugang ueber das gemeldete naechste Zahldatum hinaus gilt.
 *  Ohne diese Kulanz verliert ein zahlender Kunde den Zugang in der Stunde
 *  zwischen faelliger Abbuchung und der IPN-Meldung darueber. */
export const GRACE_DAYS = 3;

export class IpnError extends Error {}

export interface IpnEvent {
  provider: string;
  /** grant = Zugang geben/verlaengern, revoke = beenden, ignore = nur zur Kenntnis */
  action: "grant" | "revoke" | "ignore";
  email: string;
  orderId: string;
  productId: string | null;
  plan: string;
  /** ISO-Zeitpunkt, bis zu dem der Zugang laeuft. null = unbefristet. */
  periodEnd: string | null;
  /** Tatsaechlich belasteter Betrag in Cent — nicht der Listenpreis. Gutscheine
   *  der Plattform senken ihn, und die Conversion-Meldung an Meta/Google muss
   *  den echten Umsatz nennen, nicht einen erfundenen. null = unbekannt. */
  amountCents: number | null;
  currency: string;
  event: string;
  raw: unknown;
}

/** Ordnet einer Produkt-ID der Plattform unseren Plan zu. */
export type PlanResolver = (productId: string | null) => string;

const ALIASES: Record<string, string> = {
  digistore: "digistore24",
  ds24: "digistore24",
  ablefy: "elopage",
};
const PROVIDERS = new Set(["copecart", "digistore24", "elopage"]);

export function canonicalProvider(name: string): string | null {
  const n = (name ?? "").trim().toLowerCase();
  const canonical = ALIASES[n] ?? n;
  return PROVIDERS.has(canonical) ? canonical : null;
}

// --- Krypto-Hilfen ----------------------------------------------------------
const enc = new TextEncoder();

const hex = (buf: ArrayBuffer) =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

const b64 = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf)));

async function hmacSha256(secret: string, message: ArrayBuffer) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret) as BufferSource,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return await crypto.subtle.sign("HMAC", key, message);
}

async function sha512Hex(s: string) {
  return hex(await crypto.subtle.digest("SHA-512", enc.encode(s) as BufferSource));
}

/** Vergleich in konstanter Zeit — ein frueher Abbruch verriete die Signatur. */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// --- Datums-Hilfen ----------------------------------------------------------
function parseDate(value: unknown): Date | null {
  if (value === null || value === undefined || value === "") return null;
  const s = String(value).trim();
  if (!s) return null;
  if (/^\d{9,}$/.test(s)) return new Date(Number(s) * 1000); // Unix-Zeit
  const d = new Date(s.includes("T") || s.includes(" ") ? s : `${s}T00:00:00Z`);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Bis wann der Zugang laeuft.
 *
 * Eine Kuendigung beendet den Zugang NICHT sofort: bezahlt ist bezahlt, und
 * beide Plattformen nennen den Tag, an dem er enden soll. Ohne diese
 * Unterscheidung wuerde eine Kuendigung am Kauftag den Zugang sofort killen,
 * obwohl der Monat bezahlt ist — der teuerste Support-Fall, den es hier gibt.
 */
export function periodEnd(nextPayment: unknown, cancelledFor: unknown): string | null {
  const end = parseDate(cancelledFor);
  if (end) return end.toISOString();
  const nxt = parseDate(nextPayment);
  if (nxt) return new Date(nxt.getTime() + GRACE_DAYS * 86400_000).toISOString();
  return null; // Einmalkauf -> unbefristet
}

/** Dezimalbetrag der Plattformen ("119.0", "99,99") -> Cent. */
function toCents(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(String(value).replace(",", "."));
  return Number.isFinite(n) ? Math.round(n * 100) : null;
}

function first(o: Record<string, unknown>, ...keys: string[]): string | null {
  for (const k of keys) {
    const v = o?.[k];
    if (v !== undefined && v !== null && v !== "") return String(v);
  }
  return null;
}

// --- CopeCart ---------------------------------------------------------------
const COPECART_GRANT = new Set([
  "payment.made",
  "payment.trial",
  "payment.recurring.upcoming",
]);
const COPECART_REVOKE = new Set([
  "payment.refunded",
  "payment.charged_back",
  "payment.failed",
]);

export async function parseCopecart(
  raw: ArrayBuffer,
  headers: Headers,
  secret: string | undefined,
  planFor: PlanResolver,
): Promise<IpnEvent> {
  if (!secret) throw new IpnError("IPN_COPECART_SECRET ist nicht gesetzt");
  const sent = headers.get("x-copecart-signature") ?? "";
  if (!timingSafeEqual(sent, b64(await hmacSha256(secret, raw)))) {
    throw new IpnError("Signatur stimmt nicht");
  }

  const d = JSON.parse(new TextDecoder().decode(raw)) as Record<string, unknown>;
  const event = String(d.event_type ?? "");
  let action: IpnEvent["action"];
  if (COPECART_GRANT.has(event)) action = "grant";
  else if (COPECART_REVOKE.has(event)) action = "revoke";
  else if (event === "payment.recurring.cancelled") {
    // Gekuendigt, aber der bezahlte Zeitraum laeuft weiter. Ohne
    // is_cancelled_for kennen wir das Ende nicht — dann erst beim
    // ausbleibenden payment.failed schliessen.
    action = d.is_cancelled_for ? "revoke" : "ignore";
  } else action = "ignore";

  // Testkaeufe des Verkaeufers schalten frei wie echte Kaeufe. CopeCart bietet
  // die Bezahlart "test" ausdruecklich nur dem Verkaeufer an (IPN-Doku 1.6.7:
  // "test (for the vendor only)") -- ein Kunde kann sie nicht ausloesen. Wuerden
  // wir sie ignorieren, liesse sich die Kette nie im Ganzen pruefen, und genau
  // das ist der teuerste blinde Fleck: ob CopeCart am Ende wirklich ruft.
  const isTest = d.test_payment === true ||
    String(d.payment_status ?? "").startsWith("test_");

  const productId = first(d, "product_id");
  return {
    provider: "copecart",
    action,
    email: (first(d, "buyer_email") ?? "").toLowerCase(),
    orderId: first(d, "order_id") ?? "",
    productId,
    plan: planFor(productId),
    periodEnd: periodEnd(d.next_payment_at, d.is_cancelled_for),
    amountCents: toCents(d.transaction_amount ?? d.first_payment),
    currency: String(d.transaction_currency ?? "EUR").toUpperCase(),
    event: event + (isTest ? " (Testkauf)" : ""),
    raw: d,
  };
}

// --- Digistore24 ------------------------------------------------------------
async function digistoreSign(
  params: Record<string, string>,
  passphrase: string,
  upperKeys: boolean,
) {
  const items = Object.entries(params)
    .filter(([k, v]) =>
      k.toLowerCase() !== "sha_sign" && k.toUpperCase() !== "SHASIGN" && v !== ""
    )
    .map(([k, v]) => [upperKeys ? k.toUpperCase() : k, v] as [string, string])
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  // Digistore24 schickt sha_sign in GROSSBUCHSTABEN (strtoupper im offiziellen
  // Beispielskript). Ohne diese Angleichung schlaegt jeder Vergleich fehl und
  // es kaeme nie eine Meldung durch.
  const digest = await sha512Hex(items.map(([k, v]) => `${k}=${v}${passphrase}`).join(""));
  return digest.toUpperCase();
}

export async function parseDigistore(
  params: Record<string, string>,
  passphrase: string | undefined,
  planFor: PlanResolver,
): Promise<IpnEvent> {
  if (!passphrase) throw new IpnError("IPN_DIGISTORE_PASSPHRASE ist nicht gesetzt");
  const sent = String(params.sha_sign ?? "").toUpperCase();
  // Die Doku ist uneindeutig, ob die Schluessel vor dem Sortieren gross
  // geschrieben werden. Beide Varianten setzen dieselbe Passphrase voraus, es
  // entsteht also keine Luecke — nur Robustheit gegen die Uneindeutigkeit.
  const ok = timingSafeEqual(sent, await digistoreSign(params, passphrase, true)) ||
    timingSafeEqual(sent, await digistoreSign(params, passphrase, false));
  if (!ok) throw new IpnError("sha_sign stimmt nicht");

  const event = String(params.event ?? "").toLowerCase();
  if (event === "connection_test") {
    return {
      provider: "digistore24",
      action: "ignore",
      email: "",
      orderId: "",
      productId: null,
      plan: planFor(null),
      periodEnd: null,
      amountCents: null,
      currency: "EUR",
      event,
      raw: params,
    };
  }

  const end = periodEnd(
    params.next_payment_at,
    params.is_cancelled_for ?? params.last_paid_day,
  );
  // Digistore24 hat zwei Namensgenerationen im Umlauf (`on_payment` und
  // `subscription_payment`). Deshalb auf Wortstaemme pruefen statt auf eine
  // feste Liste — sonst kippt die Freischaltung still, wenn Digistore die
  // Namen umstellt.
  let action: IpnEvent["action"];
  if (/refund|chargeback|missed|expire|last_paid_day/.test(event)) action = "revoke";
  else if (/cancel/.test(event)) action = end ? "revoke" : "ignore";
  else if (/payment|purchase|rebill|upgrade/.test(event)) action = "grant";
  else action = "ignore";

  const productId = first(params, "product_id");
  return {
    provider: "digistore24",
    action,
    email: (first(params, "email", "buyer_email", "address_email") ?? "").toLowerCase(),
    orderId: first(params, "order_id") ?? "",
    productId,
    plan: planFor(productId),
    periodEnd: end,
    amountCents: toCents(params.amount ?? params.amount_brutto ?? params.order_amount),
    currency: String(params.currency ?? "EUR").toUpperCase(),
    event,
    raw: params,
  };
}

// --- elopage / ablefy -------------------------------------------------------
// Bewusst tolerant, weil die genauen Feldnamen erst der erste echte Aufruf
// zeigt. Bis dahin steht jede Meldung roh in `ipn_log`.
export async function parseElopage(
  raw: ArrayBuffer,
  headers: Headers,
  secret: string | undefined,
  planFor: PlanResolver,
): Promise<IpnEvent> {
  const sent = headers.get("x-elopage-signature") ??
    headers.get("x-ablefy-signature") ?? headers.get("x-signature");
  if (secret && sent) {
    const sig = await hmacSha256(secret, raw);
    if (!timingSafeEqual(sent, hex(sig)) && !timingSafeEqual(sent, b64(sig))) {
      throw new IpnError("Signatur stimmt nicht");
    }
  }

  const d = JSON.parse(new TextDecoder().decode(raw)) as Record<string, unknown>;
  const payload = (typeof d.payload === "object" && d.payload !== null
    ? d.payload
    : d) as Record<string, unknown>;
  const event = (first(d, "event", "event_type", "type") ?? "").toLowerCase();

  let email = first(payload, "email", "buyer_email", "payer_email") ?? "";
  if (!email) {
    for (const key of ["payer", "buyer", "user", "customer", "seller_customer"]) {
      const sub = payload[key];
      if (typeof sub === "object" && sub !== null && (sub as Record<string, unknown>).email) {
        email = String((sub as Record<string, unknown>).email);
        break;
      }
    }
  }

  const end = periodEnd(
    first(payload, "next_payment_at", "next_billing_at", "paid_until"),
    first(payload, "cancelled_for", "expires_at", "access_until"),
  );
  let action: IpnEvent["action"];
  if (/refund|chargeback|revoke|failed|expire/.test(event)) action = "revoke";
  else if (/cancel/.test(event)) action = end ? "revoke" : "ignore";
  else if (/payment|order|success|paid|created|activate/.test(event)) action = "grant";
  else action = "ignore";

  const productId = first(payload, "product_id", "product_slug");
  return {
    provider: "elopage",
    action,
    email: email.toLowerCase(),
    orderId: first(payload, "order_id", "id", "transaction_id", "token") ?? "",
    productId,
    plan: planFor(productId),
    periodEnd: end,
    amountCents: toCents(
      first(payload, "amount", "total_amount", "price", "net_amount"),
    ),
    currency: String(first(payload, "currency", "currency_code") ?? "EUR").toUpperCase(),
    event,
    raw: d,
  };
}

/**
 * Quittung: der Text "OK", nichts anderes.
 *
 * Beide dokumentierten Plattformen pruefen den ANTWORTTEXT, nicht nur den
 * Statuscode:
 *   * Digistore24 schaltet den Endpunkt sonst als fehlerhaft ab.
 *   * CopeCart wertet die Meldung erst bei "OK" (Grossbuchstaben, ohne
 *     Anfuehrungszeichen) als zugestellt und wiederholt sie sonst 10-mal
 *     ueber die naechsten 3 Stunden (IPN-Doku 1.6.7, Abschnitt "IPN failures").
 *
 * Ein JSON-Koerper mit Status 200 sieht hier also aus wie ein Fehlschlag. Fuer
 * elopage/ablefy ist nichts dokumentiert — "OK" schadet dort nicht.
 */
export function ack(_provider?: string): Response {
  return new Response("OK", { headers: { "Content-Type": "text/plain" } });
}
