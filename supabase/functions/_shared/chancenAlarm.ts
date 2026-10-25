// ===================================================================
// chancenAlarm.ts — Chancen-Alarm auf /gruender-chancen (25.10.2026).
//
// RECHTSLAGE. Werbeeinwilligung nur mit freiwilligem, nicht vorangekreuztem
// Häkchen (ALARM_TEXT, Version in der Zeile) und Klick in der
// Bestätigungsmail (Double-Opt-in). Jede Wochenmail trägt den signierten
// Ein-Klick-Abmeldelink (mail-unsubscribe → mail_optouts).
//
// ABLAUF
//   chancen-anfordern   → Zeile in chancen_abo + Bestätigungsmail
//   chancen-bestaetigen → bestaetigt_am, Redirect auf /chancen-bestaetigt
//   send-chancen-alarm  → montags per pg_cron: Neues seit der letzten Mail
//                         + „letzte Chance“ (Frist ≤ 7 Tage)
// Daten: https://gruenderx.de/gruender-chancen.json (prebuild, src/lib/gruenderChancen.ts).
//
// Ohne Deno.serve(): Import startet keinen zweiten Server.
// ===================================================================

import { sameSig } from "./unsubscribe.ts";
import { aufmacher, button, esc, heading, paragraph, plain, renderMail, secondary, type Built } from "./mailLayout.ts";

export const SITE = "https://gruenderx.de";

/** Version des Einwilligungstexts — bei jeder Textänderung hochzählen (auch in src/lib/chancenAlarm.ts). */
export const ALARM_VERSION = "2026-10-25";
export const ALARM_TEXT =
  "Ja, schickt mir einmal pro Woche eine E-Mail mit neuen Gründer-Chancen zu meiner Auswahl " +
  "(mit Messung von Öffnungen und Klicks). Abmelden geht jederzeit mit einem Klick.";

export const ARTEN = ["wettbewerb", "hackathon", "pitch", "marketing", "netzwerk"] as const;
export type ChancenArt = (typeof ARTEN)[number];
export const ART_NAME: Record<ChancenArt, string> = {
  wettbewerb: "🏆 Wettbewerbe & Programme",
  hackathon: "💻 Hackathons",
  pitch: "🎤 Pitch & Investoren",
  marketing: "📣 Marketing & Vertrieb",
  netzwerk: "🤝 Netzwerk & Konferenzen",
};

/** Ausschnitt aus src/lib/gruenderChancen.ts (Chance). */
export type Chance = {
  id: string; art: ChancenArt; titel: string; veranstalter: string; sortierung: string;
  frist?: string; datum?: string; datumBis?: string; vormerken?: string;
  ort: string; region: string; preis?: string; kurz?: string; nurFrauen: boolean; url: string;
};

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
export const REGION_RE = /^(alle|online|[A-Z]{2})$/;
export const normalisiere = (email: string) => email.trim().toLowerCase();

export function alarmSecret(): string | undefined {
  return Deno.env.get("TIPPS_SECRET") || Deno.env.get("UNSUBSCRIBE_SECRET") || undefined;
}

/** HMAC-SHA256 über "chancen|<adresse>" — eigenes Präfix, damit der Link weder abmeldet noch die Tipps bestätigt. */
export async function signiereAlarm(email: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`chancen|${normalisiere(email)}`));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function alarmSignaturGueltig(email: string, sig: string, secret: string): Promise<boolean> {
  if (!/^[0-9a-f]{64}$/.test(sig)) return false;
  return sameSig(sig, await signiereAlarm(email, secret));
}

export function bestaetigungsLink(functionsUrl: string, email: string, sig: string): string {
  return `${functionsUrl.replace(/\/+$/, "")}/chancen-bestaetigen?e=${encodeURIComponent(normalisiere(email))}&s=${sig}`;
}

/** Wie passtRegion() in src/lib/gruenderChancen.ts: bundesweit, EU und online gelten überall. */
export function passtRegion(c: Chance, region: string): boolean {
  if (!region || region === "alle") return true;
  if (region === "online") return c.region === "online";
  return c.region === region || ["bund", "EU", "online"].includes(c.region);
}

/** Lädt die öffentliche Chancen-Liste. null = nicht verfügbar (dann wird nichts versendet). */
export async function ladeChancen(basis = SITE): Promise<Chance[] | null> {
  try {
    const r = await fetch(`${basis}/gruender-chancen.json`, { headers: { Accept: "application/json" } });
    const roh = await r.text();
    // Achtung SPA-Fallback: unbekannte Pfade liefern die Startseite mit HTTP 200.
    if (!r.ok || !roh.trimStart().startsWith("{")) return null;
    const d = JSON.parse(roh) as { chancen?: Chance[] };
    return Array.isArray(d.chancen) && d.chancen.length ? d.chancen : null;
  } catch {
    return null;
  }
}

const plusTage = (iso: string, n: number) => new Date(Date.parse(`${iso}T12:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
const WT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
export const tag = (iso: string) => {
  const d = new Date(`${iso}T12:00:00Z`);
  return `${WT[d.getUTCDay()]} ${iso.slice(8, 10)}.${iso.slice(5, 7)}.`;
};

export const MAX_NEU = 25;
/** Events nur, wenn sie in den nächsten 45 Tagen stattfinden; Fristen und Programme immer. */
const EVENT_TAGE = 45;

export function auswahl(
  chancen: Chance[],
  abo: { arten: string[]; region: string; ohne_nur_frauen: boolean; gesendet: string[] },
  heute: string,
): { neu: Chance[]; mehrNeu: number; letzteChance: Chance[]; alleNeuIds: string[] } {
  const gesendet = new Set(abo.gesendet);
  const passend = chancen.filter((c) =>
    abo.arten.includes(c.art) && passtRegion(c, abo.region) && !(abo.ohne_nur_frauen && c.nurFrauen) &&
    (c.frist ? c.frist >= heute : c.datum ? (c.datumBis ?? c.datum) >= heute && c.datum <= plusTage(heute, EVENT_TAGE) : Boolean(c.vormerken)));
  const neuAlle = passend.filter((c) => !gesendet.has(c.id));
  const letzteChance = passend.filter((c) => gesendet.has(c.id) && c.frist && c.frist <= plusTage(heute, 7));
  // alleNeuIds: auch die über MAX_NEU hinaus gelten nach dem Versand als gesendet (stehen auf der Seite),
  // sonst käme nächste Woche Altes als „neu“.
  return { neu: neuAlle.slice(0, MAX_NEU), mehrNeu: Math.max(0, neuAlle.length - MAX_NEU), letzteChance, alleNeuIds: neuAlle.map((c) => c.id) };
}

// -------------------------------------------------------------------
// Bestätigungsmail (Dienstmail, keine Werbung)
// -------------------------------------------------------------------
export function buildAlarmBestaetigung(o: { link: string; arten: string[] }): Built {
  const auswahlText = o.arten.map((a) => ART_NAME[a as ChancenArt] ?? a).join(", ");
  const grund = "Du bekommst diese Mail, weil auf gruenderx.de für deine Adresse der Chancen-Alarm angefordert wurde. Ohne Klick passiert nichts.";
  return {
    subject: "Bitte bestätigen: dein Chancen-Alarm von GründerX",
    text: plain({
      greeting: "Hallo,",
      lines: [
        "du hast auf gruenderx.de/gruender-chancen den Chancen-Alarm angefordert.",
        `Deine Auswahl: ${auswahlText.replace(/[^\p{L}\p{N} ,&-]/gu, "").trim()}.`,
        "Mit einem Klick bestätigst du deine Adresse. Danach kommt jeden Montag eine Mail, jede mit Abmeldelink.",
        "",
        "Nicht du? Dann ignoriere diese Mail. Ohne Klick bekommst du nichts,",
        "und wir löschen die Adresse nach 30 Tagen.",
      ],
      cta: ["Ja, Chancen-Alarm aktivieren", o.link],
      reason: grund,
    }),
    html: renderMail({
      preheader: "Ein Klick, dann kommt jeden Montag das Neue.",
      blocks: [
        aufmacher("Bitte kurz bestätigen", "Dann kommt dein Chancen-Alarm jeden Montag."),
        paragraph(`Du hast auf gruenderx.de den Chancen-Alarm angefordert. Deine Auswahl: <b>${esc(auswahlText)}</b>.`),
        button(o.link, "Ja, Chancen-Alarm aktivieren"),
        paragraph("<b>Nicht du?</b> Dann hat jemand deine Adresse eingegeben. Ignoriere diese Mail – ohne Klick bekommst du nichts, und wir löschen die Adresse nach 30 Tagen."),
      ],
      footerReason: grund,
    }),
  };
}

// -------------------------------------------------------------------
// Wochenmail
// -------------------------------------------------------------------
function zeileHtml(c: Chance): string {
  const wann = c.frist ? `<b>${c.art === "hackathon" ? "Einreichen" : "Bewerben"} bis ${tag(c.frist)}</b>`
    : c.datum ? `<b>${tag(c.datum)}</b>` : `<b>Vormerken:</b> ${esc(c.vormerken ?? "")}`;
  const preis = c.preis ? `<br>💰 ${esc(c.preis)}` : "";
  return `<p style="margin:0 0 14px">${wann} · <a href="${esc(c.url)}" style="font-weight:600">${esc(c.titel)}</a>${preis}` +
    `<br><span style="color:#6b7280;font-size:13px">${esc(c.ort)}${c.veranstalter ? ` · ${esc(c.veranstalter)}` : ""}</span></p>`;
}
const zeileText = (c: Chance) =>
  `- ${c.frist ? `bis ${tag(c.frist)}` : c.datum ? tag(c.datum) : "vormerken"}: ${c.titel}${c.preis ? ` (${c.preis})` : ""} – ${c.url}`;

export function buildAlarmMail(o: { neu: Chance[]; mehrNeu: number; letzteChance: Chance[]; unsubscribeUrl: string }): Built {
  const blocks: string[] = [
    aufmacher(`${o.neu.length} neue Gründer-Chancen`, o.letzteChance.length ? `Plus ${o.letzteChance.length} mit Frist in dieser Woche.` : "Deine Auswahl der Woche."),
  ];
  if (o.letzteChance.length) {
    blocks.push(heading("⏰ Letzte Chance – Frist in den nächsten 7 Tagen"), ...o.letzteChance.map(zeileHtml));
  }
  for (const art of ARTEN) {
    const teil = o.neu.filter((c) => c.art === art);
    if (teil.length) blocks.push(heading(ART_NAME[art]), ...teil.map(zeileHtml));
  }
  if (o.mehrNeu) blocks.push(paragraph(`Und ${o.mehrNeu} weitere neue Chancen auf der Seite.`));
  blocks.push(
    button(`${SITE}/gruender-chancen`, "Alle Chancen ansehen"),
    secondary(`${SITE}/cockpit/pitch-deck`, "Pitch-Deck bauen mit GründerX"),
    paragraph('<span style="color:#6b7280;font-size:13px">Preisgelder und Termine sind Angaben der Veranstalter. Bitte vor der Anmeldung beim Veranstalter prüfen.</span>'),
  );
  const grund = "Du bekommst diese Mail, weil du den Chancen-Alarm auf gruenderx.de bestätigt hast.";
  return {
    subject: o.letzteChance.length
      ? `${o.neu.length} neue Chancen + ${o.letzteChance.length} Fristen diese Woche`
      : `${o.neu.length} neue Gründer-Chancen für dich`,
    text: plain({
      greeting: "Hallo,",
      lines: [
        ...(o.letzteChance.length ? ["LETZTE CHANCE – Frist in den nächsten 7 Tagen:", ...o.letzteChance.map(zeileText), ""] : []),
        "NEU:",
        ...o.neu.map(zeileText),
        ...(o.mehrNeu ? ["", `Und ${o.mehrNeu} weitere auf der Seite.`] : []),
        "",
        "Preisgelder und Termine sind Angaben der Veranstalter. Bitte vor der Anmeldung prüfen.",
      ],
      cta: ["Alle Chancen ansehen", `${SITE}/gruender-chancen`],
      unsubscribeUrl: o.unsubscribeUrl,
      reason: grund,
    }),
    html: renderMail({
      preheader: o.neu.slice(0, 3).map((c) => c.titel).join(" · "),
      blocks,
      footerReason: grund,
      unsubscribeUrl: o.unsubscribeUrl,
    }),
  };
}
