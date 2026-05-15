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
export const buildIcs = (b: BookingRow): string => {
  const start = new Date(b.slot_iso);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const uid = `${b.id}@gruenderx.de`;
  const location = b.meet_link || "Google Meet (Link wird separat geschickt)";
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
    `SUMMARY:1:1 Strategie-Call — ${b.topic}`,
    `DESCRIPTION:30-Min-Strategie-Call zum Thema "${b.topic}".\\n\\nGoogle-Meet-Link: ${b.meet_link || "kommt 15 Min vorher per Email"}`,
    `LOCATION:${location}`,
    "ORGANIZER;CN=GründerX:mailto:impressum@gruenderx.de",
    `ATTENDEE;CN=${b.name};RSVP=TRUE:mailto:${b.email}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:1:1-Call in 30 Min",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
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
export const confirmationEmail = (b: BookingRow) => ({
  subject: `✓ Termin bestätigt: ${formatDateDe(b.slot_iso)} Uhr – GründerX 1:1-Call`,
  text: `Hallo ${b.name},

dein 1:1-Strategie-Call ist verbindlich gebucht.

📅 Termin: ${formatDateDe(b.slot_iso)} Uhr
⏱  Dauer: 30 Minuten
🎥 Format: Google Meet
🎯 Thema: ${b.topic}

WAS PASSIERT JETZT:
1. Diese Email + .ics-Anhang → in deinen Kalender importieren
2. 24h vor Termin: Reminder-Email
3. 15 Min vor Termin: Email mit Meet-Link

Stornierung bis 24h vorher kostenlos — einfach auf diese Email antworten.

Booking-ID: ${b.id.slice(0, 8)}

Viele Grüße
Dein GründerX-Team`,
  html: `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:600px;margin:auto;padding:24px;background:#fff;color:#111">
  <div style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;padding:24px;border-radius:16px 16px 0 0">
    <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.9;margin-bottom:8px">Termin bestätigt</div>
    <h1 style="margin:0;font-size:24px">Hallo ${escapeHtml(b.name)} 👋</h1>
  </div>
  <div style="background:#f6f9f7;padding:24px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 16px 16px">
    <p style="margin:0 0 16px;font-size:16px">Dein 1:1-Strategie-Call ist <strong>verbindlich gebucht</strong>.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      <tr><td style="padding:6px 0;color:#666;width:80px">📅 Termin</td><td style="padding:6px 0"><strong>${escapeHtml(formatDateDe(b.slot_iso))} Uhr</strong></td></tr>
      <tr><td style="padding:6px 0;color:#666">⏱ Dauer</td><td style="padding:6px 0">30 Minuten</td></tr>
      <tr><td style="padding:6px 0;color:#666">🎥 Format</td><td style="padding:6px 0">Google Meet</td></tr>
      <tr><td style="padding:6px 0;color:#666">🎯 Thema</td><td style="padding:6px 0">${escapeHtml(b.topic)}</td></tr>
    </table>
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:16px 0">
      <div style="font-size:11px;color:#10b981;letter-spacing:1px;text-transform:uppercase;font-weight:700;margin-bottom:8px">Was passiert jetzt</div>
      <ol style="margin:0;padding-left:20px;color:#374151;line-height:1.7">
        <li>Diese Email + .ics-Anhang → in den Kalender importieren</li>
        <li>24h vor Termin: Reminder-Email</li>
        <li>15 Min vor Termin: Email mit Google-Meet-Link</li>
        <li>30-Min-Call zum gewählten Termin</li>
      </ol>
    </div>
    <p style="margin:16px 0 0;color:#6b7280;font-size:13px">Stornierung bis 24h vorher kostenlos — einfach auf diese Email antworten.</p>
    <p style="margin:8px 0 0;color:#9ca3af;font-size:11px">Booking-ID: ${b.id.slice(0, 8)}</p>
  </div>
</div>`,
});

export const reminder24hEmail = (b: BookingRow) => ({
  subject: `🔔 Morgen ${new Date(b.slot_iso).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" })} Uhr — dein GründerX 1:1-Call`,
  text: `Hallo ${b.name},

kleine Erinnerung: Morgen ist dein 1:1-Strategie-Call.

📅 ${formatDateDe(b.slot_iso)} Uhr
🎯 Thema: ${b.topic}

VORBEREITUNG (5 Min reichen):
• Setup grob zusammenfassen (Rechtsform, Umsatz-Range, geplante Strukturen)
• Top-3 konkrete Fragen aufschreiben
• Falls vorhanden: BWA / Strukturbild als PDF bereithalten

Den Google-Meet-Link bekommst du 15 Min vor dem Call per Email.

Bis morgen!
GründerX-Team

Booking-ID: ${b.id.slice(0, 8)}`,
  html: `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:600px;margin:auto;padding:24px;background:#fff;color:#111">
  <div style="background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:#fff;padding:24px;border-radius:16px 16px 0 0">
    <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.9;margin-bottom:8px">⏰ Reminder · in 24h</div>
    <h1 style="margin:0;font-size:24px">Morgen ist dein Call</h1>
  </div>
  <div style="background:#f5f8ff;padding:24px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 16px 16px">
    <p style="margin:0 0 16px;font-size:16px">Hallo ${escapeHtml(b.name)},</p>
    <p style="margin:0 0 16px">kleine Erinnerung — morgen ist dein 1:1-Strategie-Call.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      <tr><td style="padding:6px 0;color:#666;width:80px">📅 Wann</td><td style="padding:6px 0"><strong>${escapeHtml(formatDateDe(b.slot_iso))} Uhr</strong></td></tr>
      <tr><td style="padding:6px 0;color:#666">🎯 Thema</td><td style="padding:6px 0">${escapeHtml(b.topic)}</td></tr>
    </table>
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:16px 0">
      <div style="font-size:11px;color:#3b82f6;letter-spacing:1px;text-transform:uppercase;font-weight:700;margin-bottom:8px">5-Min-Vorbereitung</div>
      <ul style="margin:0;padding-left:20px;color:#374151;line-height:1.7">
        <li>Setup grob zusammenfassen (Rechtsform, Umsatz-Range, geplante Strukturen)</li>
        <li>Top-3 konkrete Fragen aufschreiben</li>
        <li>Falls vorhanden: BWA / Strukturbild als PDF bereithalten</li>
      </ul>
    </div>
    <p style="margin:16px 0 0;color:#6b7280;font-size:13px">Den Google-Meet-Link bekommst du <strong>15 Min vor dem Call</strong> per Email.</p>
    <p style="margin:8px 0 0;color:#9ca3af;font-size:11px">Booking-ID: ${b.id.slice(0, 8)}</p>
  </div>
</div>`,
});

export const reminder15minEmail = (b: BookingRow) => {
  const link = b.meet_link?.trim();
  const linkBlock = link
    ? `<a href="${escapeHtml(link)}" style="display:inline-block;background:#10b981;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px">📹 Jetzt in den Call gehen</a>
       <div style="margin-top:8px;font-size:11px;color:#9ca3af;word-break:break-all">${escapeHtml(link)}</div>`
    : `<div style="background:#fff7ed;border:1px solid #fed7aa;color:#9a3412;padding:14px;border-radius:10px;font-size:14px">
         Der Meet-Link kommt gleich per separater Email — wir senden ihn 1-2 Min vor Call-Start.
       </div>`;
  return {
    subject: link
      ? `📹 In 15 Min: dein GründerX 1:1-Call — hier ist der Link`
      : `📹 In 15 Min: dein GründerX 1:1-Call`,
    text: `Hallo ${b.name},

in 15 Minuten geht's los — dein 1:1-Call startet um ${new Date(b.slot_iso).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" })} Uhr.

🎯 Thema: ${b.topic}

CALL-LINK:
${link || "Folgt in 1-2 Min per separater Email."}

CHECKLISTE VOR DEM CALL:
• Mikro + Kamera testen (Google Meet → Geräte)
• Ruhigen Spot suchen
• Notizen + Fragen bereit
• Glas Wasser ✓

Bis gleich!
GründerX-Team

Booking-ID: ${b.id.slice(0, 8)}`,
    html: `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:600px;margin:auto;padding:24px;background:#fff;color:#111">
  <div style="background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;padding:24px;border-radius:16px 16px 0 0">
    <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.9;margin-bottom:8px">🚨 In 15 Min</div>
    <h1 style="margin:0;font-size:24px">Es geht gleich los</h1>
  </div>
  <div style="background:#fef5f5;padding:24px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 16px 16px">
    <p style="margin:0 0 16px;font-size:16px">Hallo ${escapeHtml(b.name)},</p>
    <p style="margin:0 0 20px">in 15 Minuten startet dein 1:1-Strategie-Call zum Thema <strong>${escapeHtml(b.topic)}</strong>.</p>
    <div style="text-align:center;margin:24px 0">
      ${linkBlock}
    </div>
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:16px 0">
      <div style="font-size:11px;color:#dc2626;letter-spacing:1px;text-transform:uppercase;font-weight:700;margin-bottom:8px">2-Min-Checkliste</div>
      <ul style="margin:0;padding-left:20px;color:#374151;line-height:1.7">
        <li>Mikro + Kamera testen (Google Meet → Geräte)</li>
        <li>Ruhigen Spot suchen</li>
        <li>Notizen + Fragen bereit</li>
        <li>Glas Wasser ✓</li>
      </ul>
    </div>
    <p style="margin:8px 0 0;color:#9ca3af;font-size:11px">Booking-ID: ${b.id.slice(0, 8)}</p>
  </div>
</div>`,
  };
};

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
