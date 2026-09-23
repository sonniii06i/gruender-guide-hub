// ===================================================================
// mailSend.ts — eine Versandstelle fuer alle Mails dieser Marke.
//
// Diese Datei ist in allen Marken byte-identisch (wie mailLayout.ts).
// Was sich je Marke unterscheidet, ist der Versandweg — der steht in
// mailTransport.ts und wird hier nur benutzt.
//
// WOZU. Bisher rief jede Funktion ihren Versand selbst auf. Dadurch
// hatte jede ihre eigene Vorstellung davon, was ein Fehler ist, keine
// kannte die Abmeldeliste, und keine einzige Mail trug eine Kennung, an
// der sich spaeter ablesen liesse, ob sie geoeffnet wurde.
//
// WAS HIER PASSIERT, in dieser Reihenfolge:
//   1. Abmeldung pruefen  — wer abgemeldet ist, bekommt nichts. Zuerst.
//   2. Variante zuteilen  — deterministisch, siehe abTest().
//   3. Messung einbauen   — Klicklinks und Zaehlpixel (mailTrack.ts).
//   4. Senden             — ueber den Transport dieser Marke.
//   5. Protokollieren     — eine Zeile in mail_events, Typ "sent".
//
// Schlaegt 4 oder 5 fehl, wirft diese Funktion NICHT. Eine
// Bestellbestaetigung darf nicht deshalb ausbleiben, weil die
// Protokolltabelle klemmt. Der Rueckgabewert sagt, was passiert ist.
// ===================================================================

import { BRANDING } from "./mailBrand.ts";
import type { Built } from "./mailLayout.ts";
import { markieren } from "./mailTrack.ts";
import { transport } from "./mailTransport.ts";

export type SendResult =
  | { ok: true; id: string; variant: string }
  | { ok: false; reason: "optout" | "no-address" | "rejected" | "error"; detail?: string };

export interface SendOptions {
  to: string;
  built: Built;
  /** Kurzname der Kampagne, z. B. "cart1" oder "weekly". Landet im Protokoll. */
  campaign: string;
  /** Variante aus abTest(); ohne A/B-Test "a". */
  variant?: string;
  from?: string;
  replyTo?: string;
  unsubscribeUrl?: string;
  /** Supabase-Client fuer Abmeldeliste und Protokoll. Fehlt er, wird
   *  ohne beides gesendet — fuer Testlaeufe. */
  db?: SupabaseLike;
}

/** Nur das, was hier gebraucht wird — spart den Import des ganzen Clients. */
export interface SupabaseLike {
  // deno-lint-ignore no-explicit-any
  from: (t: string) => any;
}

/** Was ein Versandweg koennen muss. Siehe mailTransport.ts. */
export interface TransportMail {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
  headers: Record<string, string>;
  /** Nur Resend wertet das aus; SMTP ignoriert es. */
  tags: Array<{ name: string; value: string }>;
}
export type Transport =
  (m: TransportMail) => Promise<{ ok: boolean; id?: string; error?: string }>;

// -------------------------------------------------------------------
// A/B-Zuteilung
// -------------------------------------------------------------------
/**
 * Ordnet eine Adresse **deterministisch** einer Variante zu.
 *
 * Deterministisch und nicht zufaellig, aus zwei Gruenden:
 *
 *  1. Eine Warenkorbstrecke besteht aus drei Mails. Wuerfelt jede Mail
 *     neu, liest derselbe Mensch erst Variante A, dann B, dann A — und
 *     das Ergebnis misst nichts mehr.
 *  2. Ein erneuter Lauf nach einem Abbruch (der Merker war noch nicht
 *     gesetzt) wuerde sonst eine zweite, andere Mail schicken.
 *
 * Der Kampagnenname geht in den Hash ein, damit nicht dieselbe Haelfte
 * der Liste in jeder Kampagne in Variante A landet — sonst misst man am
 * Ende die Gruppe und nicht die Mail. Die STRECKE teilt sich bewusst
 * einen Namen (siehe abTestStrecke), damit Stufe 1, 2 und 3 beim selben
 * Empfaenger dieselbe Variante haben.
 */
export function abTest(email: string, campaign: string, variants = 2): string {
  const s = `${email.trim().toLowerCase()}|${campaign}`;
  let h = 2166136261;                       // FNV-1a, 32 Bit
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const idx = Math.abs(h) % variants;
  return String.fromCharCode(97 + idx);     // 0 -> "a", 1 -> "b"
}

/** Variante fuer eine mehrstufige Strecke: alle Stufen gleich. */
export const abTestStrecke = (email: string, strecke: string) =>
  abTest(email, `strecke:${strecke}`);

/**
 * Resend erlaubt in Tags nur ASCII-Buchstaben, Ziffern, _ und -.
 * Ein Tag mit "ä" laesst Resend die GESAMTE Mail ablehnen — deshalb
 * wird hier geputzt statt darauf zu vertrauen.
 */
const tagSafe = (v: string) =>
  v.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60) || "x";

// -------------------------------------------------------------------
// Abmeldung
// -------------------------------------------------------------------
/**
 * Ist diese Adresse abgemeldet?
 * Rueckgabe null heisst "konnte nicht geprueft werden" — der Aufrufer
 * entscheidet, was das bedeutet (siehe sendCampaign).
 */
export async function isOptedOut(
  db: SupabaseLike | undefined, email: string,
): Promise<boolean | null> {
  if (!db) return false;
  try {
    const { data, error } = await db.from("mail_optouts")
      .select("email").eq("email", email.trim().toLowerCase()).maybeSingle();
    if (error) return null;
    return !!data;
  } catch {
    return null;
  }
}

// -------------------------------------------------------------------
// Versand
// -------------------------------------------------------------------
export async function sendMail(o: SendOptions): Promise<SendResult> {
  const to = (o.to || "").trim();
  if (!to || !to.includes("@")) return { ok: false, reason: "no-address" };

  const variant = o.variant ?? "a";
  const from = o.from ?? Deno.env.get("ORDER_FROM_EMAIL") ?? BRANDING.defaultFrom;
  const replyTo = o.replyTo ?? Deno.env.get("ORDER_REPLY_TO") ?? BRANDING.defaultReplyTo;

  // Eigene Kennung. Verbindet den Versand mit Oeffnung und Klick, auch
  // wenn der Versandweg (SMTP) gar keine ID zurueckgibt.
  const mailId = crypto.randomUUID();

  const html = await markieren(o.built.html, {
    brand: BRANDING.slug, campaign: o.campaign, variant, recipient: to, mailId,
  });

  // List-Unsubscribe: Gmail und Yahoo verlangen den Header seit 02/2024
  // bei Massenversand. Ohne ihn steigt die Spam-Einstufung, ohne jede
  // Rueckmeldung.
  const headers: Record<string, string> = {};
  if (o.unsubscribeUrl) {
    headers["List-Unsubscribe"] = `<${o.unsubscribeUrl}>`;
    headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
  }

  let res: { ok: boolean; id?: string; error?: string };
  try {
    res = await transport({
      to, from, replyTo,
      subject: o.built.subject,
      html,
      text: o.built.text,
      headers,
      tags: [
        { name: "brand", value: tagSafe(BRANDING.slug) },
        { name: "campaign", value: tagSafe(o.campaign) },
        { name: "variant", value: tagSafe(variant) },
      ],
    });
  } catch (err) {
    console.error("[mail] Versand fehlgeschlagen:", err);
    return { ok: false, reason: "error", detail: String(err) };
  }

  if (!res.ok) {
    console.error(`[mail] ${o.campaign} an ${to} abgelehnt: ${res.error}`);
    return { ok: false, reason: "rejected", detail: res.error };
  }

  // Die eigene mailId, nicht die des Anbieters: Nur sie steht auch in
  // Pixel und Klicklinks, und nur darueber lassen sich sent, opened und
  // clicked derselben Mail zuordnen.
  await logEvent(o.db, {
    email_id: mailId, brand: BRANDING.slug, campaign: o.campaign,
    variant, recipient: to, event: "sent", subject: o.built.subject,
  });
  await archivieren({
    brand: BRANDING.slug, email_id: mailId, campaign: o.campaign, variant,
    recipient: to, subject: o.built.subject, html,
  });
  console.log(`[mail] ${o.campaign}/${variant} an ${to} — ${mailId}`);
  return { ok: true, id: mailId, variant };
}

/**
 * Kopie der versendeten Mail ans HQ-Portal (arbitragex.de/hq → Mails → Kampagne),
 * damit dort Layout und Empfaenger je Kampagne sichtbar sind — keine Marke
 * speichert den Mailinhalt selbst. HMAC-signiert mit HQ_ARCHIV_SECRET; ohne
 * Secret passiert nichts. Wirft nie und wartet hoechstens 3 Sekunden.
 */
async function archivieren(m: Record<string, string>): Promise<void> {
  const geheim = Deno.env.get("HQ_ARCHIV_SECRET");
  if (!geheim) return;
  try {
    const body = JSON.stringify(m);
    const key = await crypto.subtle.importKey(
      "raw", new TextEncoder().encode(geheim), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
    );
    const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body)));
    const hex = Array.from(sig).map((b) => b.toString(16).padStart(2, "0")).join("");
    await fetch("https://arbitragex.de/px/mail", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-HQ-Signatur": hex },
      body,
      signal: AbortSignal.timeout(3000),
    });
  } catch (err) {
    console.error("[mail] HQ-Archiv nicht erreichbar:", err);
  }
}

/**
 * Werbemail: wie sendMail(), aber mit Abmeldepruefung davor.
 *
 * Kann die Abmeldeliste nicht gelesen werden, wird NICHT gesendet. Das
 * ist die umgekehrte Entscheidung wie bei Transaktionsmails, und sie ist
 * bewusst so: Eine Werbemail an jemanden, der sich abgemeldet hat, ist
 * ein Rechtsverstoss; eine Werbemail, die einen Tag spaeter kommt, ist
 * ein verschobener Umsatz.
 */
export async function sendCampaign(o: SendOptions): Promise<SendResult> {
  const out = await isOptedOut(o.db, o.to);
  if (out === true) {
    console.log(`[mail] ${o.to} ist abgemeldet — ${o.campaign} nicht versendet`);
    return { ok: false, reason: "optout" };
  }
  if (out === null) {
    console.error(`[mail] Abmeldeliste nicht lesbar — ${o.campaign} an ${o.to} verschoben`);
    return { ok: false, reason: "error", detail: "optout-check-failed" };
  }
  return await sendMail(o);
}

// -------------------------------------------------------------------
// Protokoll
// -------------------------------------------------------------------
export interface MailEvent {
  email_id: string;
  brand: string;
  campaign: string;
  variant: string;
  recipient: string;
  event: string;
  subject?: string;
  link?: string;
}

/** Schreibt eine Zeile nach mail_events. Wirft nie. */
export async function logEvent(
  db: SupabaseLike | undefined, e: MailEvent,
): Promise<void> {
  if (!db) return;
  try {
    const { error } = await db.from("mail_events").insert({
      ...e, occurred_at: new Date().toISOString(),
    });
    if (error) console.error("[mail] Protokoll fehlgeschlagen:", error.message);
  } catch (err) {
    console.error("[mail] Protokoll fehlgeschlagen:", err);
  }
}
