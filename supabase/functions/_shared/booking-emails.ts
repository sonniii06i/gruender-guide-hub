import { buildTerminBestaetigt, buildTerminErinnerung, buildTerminGleich } from "./transaktional.ts";
// Shared utilities für Booking-Emails (Confirmation, 24h-Reminder, 15min-Reminder)
// Wird von send-booking-confirmation + send-booking-reminders importiert

export interface BookingRow {
  id: string;
  slot_iso: string;
  name: string;
  email: string;
  topic: string;
  message: string | null;
  meet_link: string | null;
}

const escapeHtml = (s: string) =>
  s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]!));

// RFC 2047 MIME-B-encoded-word für Email-Subjects mit Unicode.
// denomailer (deno-x SMTP-Client) hat einen kaputten Quoted-Printable-Encoder
// für Subjects — daher pre-encoden wir selbst zu Base64-encoded-word.
export const encodeMimeSubject = (s: string): string => {
  // Pure ASCII? → unverändert lassen
  if (/^[\x20-\x7E]*$/.test(s)) return s;
  const utf8 = new TextEncoder().encode(s);
  let bin = "";
  for (const b of utf8) bin += String.fromCharCode(b);
  const b64 = btoa(bin);
  return `=?UTF-8?B?${b64}?=`;
};

// === ICS-Builder ===
// RFC 5545 §3.3.11: In TEXT-Werten müssen \ ; , und Zeilenumbrüche escaped
// werden — sonst kann ein Thema/Name mit "\r\nATTENDEE:…" eigene Properties
// in die METHOD:REQUEST-Einladung schreiben, und schon ein Komma macht die
// Einladung in Outlook/Google kaputt. Steuerzeichen fliegen ganz raus.
export const icsText = (s: string): string =>
  String(s ?? "")
    .replace(/\r\n|\r|\n/g, "\n")
    // deno-lint-ignore no-control-regex
    .replace(/[\x00-\x08\x0B-\x1F\x7F]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");

// RFC 5545 §3.2: Parameterwerte mit : ; , in DQUOTE; DQUOTE und Steuerzeichen
// sind darin nicht erlaubt.
const icsParam = (s: string): string =>
  `"${String(s ?? "").replace(/["\x00-\x1F\x7F]/g, "").trim()}"`;

// RFC 5545 §3.1: Zeilen länger als 75 Oktette falten (CRLF + Leerzeichen),
// ohne ein UTF-8-Zeichen zu zerteilen.
export const icsFold = (line: string): string => {
  const enc = new TextEncoder();
  const out: string[] = [];
  let cur = "";
  let curBytes = 0;
  for (const ch of line) {
    const n = enc.encode(ch).length;
    const limit = out.length === 0 ? 75 : 74; // Folgezeilen beginnen mit 1 Leerzeichen
    if (curBytes + n > limit) {
      out.push(cur);
      cur = "";
      curBytes = 0;
    }
    cur += ch;
    curBytes += n;
  }
  out.push(cur);
  return out.join("\r\n ");
};

const httpsLink = (u: string | null | undefined): string => {
  const t = (u ?? "").trim();
  return /^https:\/\/[^\s"'<>]+$/i.test(t) ? t : "";
};

export const buildIcs = (b: BookingRow): string => {
  const start = new Date(b.slot_iso);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const uid = `${b.id}@gruenderx.de`;
  const meet = httpsLink(b.meet_link);
  const location = meet || "Google Meet (Link wird separat geschickt)";
  // E-Mail ist durch die Buchung (= Login-Mail) vorgegeben; trotzdem keine
  // Zeilenumbrüche/Leerzeichen durchlassen.
  const mail = String(b.email ?? "").replace(/[\s"<>;:,]/g, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GruenderX//1on1//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${icsText(`1:1 Strategie-Call — ${b.topic}`)}`,
    `DESCRIPTION:${icsText(`30-Min-Strategie-Call zum Thema "${b.topic}".\n\nGoogle-Meet-Link: ${meet || "kommt 15 Min vorher per Email"}`)}`,
    `LOCATION:${icsText(location)}`,
    "ORGANIZER;CN=GründerX:mailto:impressum@gruenderx.de",
    `ATTENDEE;CN=${icsParam(b.name)};RSVP=TRUE:mailto:${mail}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:1:1-Call in 30 Min",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].map(icsFold).join("\r\n");
};

const formatDateDe = (iso: string): string =>
  new Date(iso).toLocaleString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  });

// === Email-Templates ===
// Die beiden Kundenmails kommen aus dem gemeinsamen Kit
// (_shared/transaktional.ts). Vorher brachte jede ihr eigenes HTML mit —
// die Bestaetigung einen gruenen Farbverlauf (#10b981 -> #059669), die
// Erinnerung einen blauen (#3b82f6 -> #1d4ed8). GruenderX ist #256af4;
// drei Mails vom selben Absender sahen nach drei Firmen aus.
//
// Die Uhrzeit steht jetzt im Hero statt in einer Tabellenzeile mit
// Kalender-Emoji davor: Sie ist das Einzige, was der Empfaenger
// tatsaechlich nachschlaegt.
const nurUhrzeit = (iso: string) =>
  new Date(iso).toLocaleTimeString("de-DE", {
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin",
  });

const nurDatum = (iso: string) =>
  new Date(iso).toLocaleDateString("de-DE", {
    weekday: "long", day: "2-digit", month: "long", timeZone: "Europe/Berlin",
  });

export const confirmationEmail = (b: BookingRow) =>
  buildTerminBestaetigt({
    name: b.name,
    terminText: formatDateDe(b.slot_iso),
    uhrzeit: `${nurUhrzeit(b.slot_iso)} Uhr`,
    datumKurz: nurDatum(b.slot_iso),
    thema: b.topic,
    bookingId: b.id.slice(0, 8),
  });

export const reminder24hEmail = (b: BookingRow) =>
  buildTerminErinnerung({
    name: b.name,
    terminText: formatDateDe(b.slot_iso),
    uhrzeit: nurUhrzeit(b.slot_iso),
    thema: b.topic,
  });


// 15-Min-Erinnerung: ebenfalls aus dem Kit (vorher eigenes HTML mit
// rot/gruenem Verlauf, ohne Impressums-Fuss, und mit der falschen Zusage
// "wir senden ihn 1-2 Min vor Call-Start" — fehlt der Link, geht nur eine
// Admin-Warnung raus, der Link wird von Hand nachgeschickt).
export const reminder15minEmail = (b: BookingRow) =>
  buildTerminGleich({
    name: b.name,
    uhrzeit: nurUhrzeit(b.slot_iso),
    thema: b.topic,
    meetLink: b.meet_link,
    bookingId: b.id.slice(0, 8),
  });

export const adminNotifyEmail = (b: BookingRow) => ({
  subject: `[Booking] ${formatDateDe(b.slot_iso)} — ${b.name} (${b.topic})`,
  text: `Neue Buchung:

Name: ${b.name}
Email: ${b.email}
Slot: ${formatDateDe(b.slot_iso)} Uhr
Thema: ${b.topic}
Kontext: ${b.message || "—"}

Booking-ID: ${b.id}

Meet-Link setzen via Admin-Page (vor 24h-Reminder!).`,
  html: `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:600px;margin:auto;padding:20px;background:#fff;color:#111">
  <h2 style="margin:0 0 16px">📩 Neue 1:1-Buchung</h2>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:6px 0;color:#666;width:120px">Name</td><td style="padding:6px 0"><strong>${escapeHtml(b.name)}</strong></td></tr>
    <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0">${escapeHtml(b.email)}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Slot</td><td style="padding:6px 0"><strong>${escapeHtml(formatDateDe(b.slot_iso))} Uhr</strong></td></tr>
    <tr><td style="padding:6px 0;color:#666">Thema</td><td style="padding:6px 0">${escapeHtml(b.topic)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;vertical-align:top">Kontext</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(b.message || "—")}</td></tr>
    <tr><td style="padding:6px 0;color:#666">ID</td><td style="padding:6px 0;font-family:monospace;font-size:12px">${b.id}</td></tr>
  </table>
  <div style="background:#fef3c7;border:1px solid #fbbf24;padding:12px;border-radius:8px;margin-top:16px;font-size:13px">
    ⚠️ Meet-Link rechtzeitig vor 15-Min-Reminder setzen (Admin-Page).
  </div>
</div>`,
});
