// ===================================================================
// mailTrack.ts — Oeffnungen und Klicks messen, unabhaengig vom Versandweg.
//
// Diese Datei ist in allen Marken byte-identisch.
//
// WARUM NICHT EINFACH RESEND. Resend kann Oeffnungen und Klicks selbst
// messen — aber nur fuer Mails, die ueber Resend laufen. Das sind zwei
// der fuenf Marken. AnwaltX, GruenderX und ArbitrageX versenden ueber
// IONOS-SMTP; fuer sie gibt es bei Resend nichts zu sehen, und eine
// Umstellung des Versandwegs waere eine DNS-Aenderung an laufenden
// Domains mit allem, was daran haengt.
//
// Die Messung haengt deshalb an der Mail selbst und nicht am Anbieter:
// ein Zaehlpixel und umgeleitete Links, beide signiert. Damit misst
// jede Marke gleich, und die Auswertung hat eine Quelle statt zwei.
//
// Resends eigene Webhooks bleiben trotzdem angeschlossen (mail-webhook)
// — sie liefern Zustellung, Unzustellbarkeit und Beschwerden, und das
// kann ein Zaehlpixel grundsaetzlich nicht.
//
// -------------------------------------------------------------------
// WAS EIN ZAEHLPIXEL NICHT KANN, damit niemand die Zahlen ueberschaetzt
// -------------------------------------------------------------------
// Apple Mail laedt seit 2021 die Bilder aller eingehenden Mails vorab,
// auch die ungelesener. Jede Mail an einen Apple-Empfaenger zaehlt
// dadurch als geoeffnet. Gmail laedt Bilder ueber einen Zwischenspeicher
// und verdeckt dabei Geraet und Zeitpunkt. Und wer Bilder abgeschaltet
// hat, taucht nie auf, auch wenn er die Mail liest.
//
// Die Oeffnungsrate ist also eine Obergrenze mit unbekanntem Fehler.
// Die KLICKRATE ist die Zahl, auf die sich eine Entscheidung stuetzen
// laesst: Sie entsteht nur durch eine bewusste Handlung.
// ===================================================================

const enc = new TextEncoder();

/** Basis-URL der eigenen Track-Funktion. */
function basis(): string {
  const b = Deno.env.get("MAIL_TRACK_BASE")
    ?? `${Deno.env.get("SUPABASE_URL") ?? ""}/functions/v1/mail-track`;
  return b.replace(/\/+$/, "");
}

/**
 * Signiert die Nutzdaten eines Track-Links.
 *
 * Ohne Signatur koennte jeder beliebige Ereignisse in die Auswertung
 * schreiben, indem er die URL raet — und, schlimmer, die Klick-Umleitung
 * als offenen Weiterleiter fuer fremde Ziele missbrauchen. Genau das
 * bewertet jeder Spamfilter als Phishing-Merkmal und faellt auf die
 * Zustellrate der ganzen Domain zurueck.
 */
async function signieren(nutzdaten: string): Promise<string> {
  const secret = Deno.env.get("MAIL_TRACK_SECRET") ?? "";
  if (!secret) return "";
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(nutzdaten));
  return btoa(String.fromCharCode(...new Uint8Array(mac)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "").slice(0, 24);
}

export interface TrackKontext {
  brand: string;
  campaign: string;
  variant: string;
  recipient: string;
  /** Eigene Kennung der Mail; verbindet Oeffnung und Klick mit dem Versand. */
  mailId: string;
}

const b64url = (s: string) =>
  btoa(unescape(encodeURIComponent(s)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

/** Gemeinsame Nutzdaten von Pixel und Klicklink. */
function nutzdaten(k: TrackKontext, ziel?: string): string {
  return b64url(JSON.stringify({
    b: k.brand, c: k.campaign, v: k.variant, r: k.recipient, m: k.mailId,
    u: ziel ?? null,
  }));
}

/** Das Zaehlpixel. Gehoert ans ENDE des Koerpers. */
export async function pixel(k: TrackKontext): Promise<string> {
  const d = nutzdaten(k);
  const s = await signieren(d);
  // width/height 1 statt CSS: Outlook ignoriert display:none an Bildern
  // und wuerde ein sichtbares Kaestchen zeichnen.
  return `<img src="${basis()}?o=${d}&k=${s}" width="1" height="1" alt="" ` +
    `style="display:block;width:1px;height:1px;border:0;opacity:0" />`;
}

/**
 * Macht aus einem Ziel-Link einen gezaehlten Link.
 *
 * Fehlt das Secret, kommt das unveraenderte Ziel zurueck. Ein Link, der
 * ins Leere fuehrt, waere deutlich teurer als eine fehlende Messung.
 */
export async function klicklink(url: string, k: TrackKontext): Promise<string> {
  if (!url.startsWith("http")) return url;
  if (!Deno.env.get("MAIL_TRACK_SECRET")) return url;
  const d = nutzdaten(k, url);
  const s = await signieren(d);
  return `${basis()}?c=${d}&k=${s}`;
}

/**
 * Ersetzt alle href-Ziele im fertigen HTML durch gezaehlte Links und
 * haengt das Pixel an.
 *
 * Nachtraeglich statt beim Bauen, damit die Kampagnentexte nichts von
 * der Messung wissen muessen — sonst muss jeder neue Baustein daran
 * denken, und einer vergisst es.
 *
 * Ausgenommen: die Abmeldung und mailto:. Ein gezaehlter Abmeldelink
 * wuerde die Abmeldung von der Erreichbarkeit der Messung abhaengig
 * machen, und das ist der eine Link, der immer funktionieren muss.
 */
export async function markieren(
  html: string, k: TrackKontext, ausnahmen: string[] = [],
): Promise<string> {
  if (!Deno.env.get("MAIL_TRACK_SECRET")) return html;

  const roh: string[] = [];
  html.replace(/href="(https?:\/\/[^"]+)"/g, (_m, u) => { roh.push(u); return _m; });

  const einmalig = [...new Set(roh)].filter((u) =>
    !ausnahmen.some((a) => u.startsWith(a)) && !u.includes("/mail-unsubscribe")
  );
  const karte = new Map<string, string>();
  for (const u of einmalig) karte.set(u, await klicklink(u, k));

  let out = html.replace(/href="(https?:\/\/[^"]+)"/g,
    (m, u) => karte.has(u) ? `href="${karte.get(u)}"` : m);

  out = out.replace("</body>", `${await pixel(k)}</body>`);
  return out;
}
