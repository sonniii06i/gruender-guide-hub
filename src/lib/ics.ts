// iCalendar (RFC 5545) für Gründer-Events und Fristen: einzelne Termine zum
// Herunterladen und abonnierbare Kalender (public/kalender/*.ics).

export type IcsTermin = {
  uid: string;
  titel: string;
  start: string; // ISO-Datum YYYY-MM-DD (ganztägig)
  ende?: string | null; // letzter Tag, inklusive
  ort?: string;
  beschreibung?: string;
  url?: string;
};

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
const tag = (iso: string) => iso.replace(/-/g, "");
const naechsterTag = (iso: string) => new Date(Date.parse(`${iso}T12:00:00Z`) + 864e5).toISOString().slice(0, 10);

/** Zeilen über 75 Oktette falten (RFC 5545 3.1), UTF-8-sicher. */
function falte(zeile: string): string {
  const enc = new TextEncoder();
  if (enc.encode(zeile).length <= 75) return zeile;
  const teile: string[] = [];
  let akt = "";
  for (const z of zeile) {
    const grenze = teile.length ? 74 : 75; // Folgezeilen beginnen mit einem Leerzeichen
    if (enc.encode(akt + z).length > grenze) {
      teile.push(akt);
      akt = z;
    } else akt += z;
  }
  teile.push(akt);
  return teile.join("\r\n ");
}

export function baueIcs(termine: IcsTermin[], kalenderName: string, jetzt = new Date()): string {
  const stamp = jetzt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const zeilen = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GründerX//Gründer-Events//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${esc(kalenderName)}`,
    "X-WR-TIMEZONE:Europe/Berlin",
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
    "X-PUBLISHED-TTL:PT12H",
  ];
  for (const t of termine) {
    zeilen.push(
      "BEGIN:VEVENT",
      `UID:${t.uid}@gruenderx.de`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${tag(t.start)}`,
      `DTEND;VALUE=DATE:${tag(naechsterTag(t.ende && t.ende >= t.start ? t.ende : t.start))}`,
      `SUMMARY:${esc(t.titel)}`,
      ...(t.ort ? [`LOCATION:${esc(t.ort)}`] : []),
      ...(t.beschreibung || t.url ? [`DESCRIPTION:${esc([t.beschreibung, t.url].filter(Boolean).join("\n"))}`] : []),
      ...(t.url ? [`URL:${t.url}`] : []),
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  }
  zeilen.push("END:VCALENDAR");
  return zeilen.map(falte).join("\r\n") + "\r\n";
}

/** Einzelnen Termin im Browser als .ics herunterladen. */
export function ladeIcsHerunter(t: IcsTermin, dateiname: string) {
  const blob = new Blob([baueIcs([t], t.titel)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = dateiname.replace(/[^a-z0-9-]+/gi, "-").slice(0, 60) + ".ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
