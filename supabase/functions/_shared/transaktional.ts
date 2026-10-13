// ===================================================================
// transaktional.ts — Mails, die kein Marketing sind.
//
// Bewusst getrennt von campaigns.ts: Diese Mails gehen immer raus, auch
// an Abgemeldete, und tragen keinen Abmeldelink. Wer einen Termin
// gebucht hat, bekommt die Bestaetigung — eine Abmeldung von Werbung
// ist keine Abmeldung vom eigenen Termin.
//
// Gleiches Geruest wie die Werbemails (mailLayout.ts). Vorher brachte
// jede dieser Mails ihr eigenes HTML mit, und zwar mit Farben, die zu
// keinem Marken-Token gehoeren: die Terminbestaetigung einen gruenen
// Farbverlauf (#10b981 -> #059669), die Erinnerung einen blauen
// (#3b82f6 -> #1d4ed8). GruenderX ist #256af4. Drei Mails vom selben
// Absender sahen damit nach drei verschiedenen Firmen aus.
// ===================================================================

import {
  aufmacher, betonung, bullets, button, divider, esc, hero, kennung, paragraph, plain,
  priceRows, renderMail, steps, type Built,
} from "./mailLayout.ts";

const BASIS = "https://gruenderx.de";

// -------------------------------------------------------------------
// 1) Terminbestaetigung
//
// Die Uhrzeit ist das Einzige, was zaehlt — sie gehoert in den Hero und
// nicht in eine Tabellenzeile mit Kalender-Emoji davor.
// -------------------------------------------------------------------
export function buildTerminBestaetigt(o: {
  name: string; terminText: string; uhrzeit: string; datumKurz: string;
  thema: string; bookingId: string; dauer?: string; format?: string;
  baseUrl?: string;
}): Built {
  const url = (o.baseUrl ?? BASIS).replace(/\/+$/, "");
  const dauer = o.dauer ?? "30 Minuten";
  const format = o.format ?? "Google Meet";
  const vorname = (o.name ?? "").trim().split(" ")[0];

  const blocks = [
    aufmacher("Dein Call steht.",
      `${o.terminText} Uhr — verbindlich gebucht.`),
    priceRows([
      ["Dauer", dauer],
      ["Format", format],
      ["Thema", esc(o.thema)],
    ]),
    divider(),
    steps([
      ["Termin in den Kalender", "Der .ics-Anhang dieser Mail legt ihn an — ein Klick."],
      ["24 Stunden vorher", "Erinnerung per Mail, damit er nicht untergeht."],
      ["15 Minuten vorher", `Der ${format}-Link kommt per Mail.`],
    ]),
    paragraph(
      "<b>Du kannst nicht?</b> Antworte auf diese Mail. Bis 24 Stunden vorher " +
      "ist die Absage kostenlos, danach auch — wir sind keine Fluggesellschaft.",
    ),
  ];

  return {
    // datumKurz hat keine Uhrzeit (nurDatum) — die Uhrzeit kommt aus o.uhrzeit
    // ("14:00 Uhr"); vorher stand hier "Dienstag, 14. Oktober Uhr".
    subject: `Termin bestätigt: ${o.datumKurz}, ${o.uhrzeit}`,
    text: plain({
      greeting: vorname ? `Hallo ${vorname},` : "Hallo,",
      lines: [
        "dein 1:1-Strategie-Call ist verbindlich gebucht.",
        "",
        `Termin: ${o.terminText} Uhr`,
        `Dauer:  ${dauer}`,
        `Format: ${format}`,
        `Thema:  ${o.thema}`,
        "",
        "Was jetzt passiert:",
        "1. Der .ics-Anhang legt den Termin in deinem Kalender an",
        "2. 24 Stunden vorher: Erinnerung per Mail",
        `3. 15 Minuten vorher: der ${format}-Link`,
        "",
        "Du kannst nicht? Antworte auf diese Mail — die Absage ist kostenlos.",
        "",
        `Buchungsnummer: ${o.bookingId}`,
      ],
    }),
    html: renderMail({
      preheader: `${o.terminText} Uhr · ${dauer} · ${format}`,
      heroBlock: hero({ klein: "Termin bestätigt", gross: o.uhrzeit,
        unten: `${o.datumKurz} · ${dauer} · ${format}` }),
      greeting: vorname ? `Hallo ${vorname},` : "Hallo,",
      blocks,
      baseUrl: url,
      footerNote: `Buchungsnummer ${o.bookingId}`,
      footerReason: "Du bekommst diese Mail, weil du einen Termin gebucht hast.",
    }),
  };
}

// -------------------------------------------------------------------
// 2) Erinnerung, 24 Stunden vorher
//
// Kurz halten. Wer diese Mail bekommt, hat den Termin schon gebucht —
// er braucht keine Wiederholung aller Angaben, sondern die Uhrzeit und
// die Moeglichkeit abzusagen, falls doch etwas dazwischenkam.
// -------------------------------------------------------------------
export function buildTerminErinnerung(o: {
  name: string; terminText: string; uhrzeit: string; thema: string;
  baseUrl?: string;
}): Built {
  const url = (o.baseUrl ?? BASIS).replace(/\/+$/, "");
  const vorname = (o.name ?? "").trim().split(" ")[0];

  const blocks = [
    aufmacher("Morgen ist dein Call.",
      `${o.terminText} Uhr, 30 Minuten, zum Thema „${o.thema}“.`),
    paragraph(
      "Den Link bekommst du 15 Minuten vorher per Mail — du musst dir jetzt " +
      "nichts merken und nichts installieren.",
    ),
    divider(),
    paragraph(
      "<b>Es passt doch nicht?</b> Antworte kurz auf diese Mail. Dann wird der " +
      "Platz frei, und wir finden einen neuen Termin.",
    ),
  ];

  return {
    subject: `Morgen ${o.uhrzeit} Uhr — dein Call`,
    text: plain({
      greeting: vorname ? `Hallo ${vorname},` : "Hallo,",
      lines: [
        `morgen ist dein 1:1-Call: ${o.terminText} Uhr, 30 Minuten,`,
        `zum Thema "${o.thema}".`,
        "",
        "Den Link bekommst du 15 Minuten vorher per Mail.",
        "",
        "Es passt doch nicht? Antworte kurz auf diese Mail.",
      ],
    }),
    html: renderMail({
      preheader: `${o.terminText} Uhr · der Link kommt 15 Minuten vorher.`,
      heroBlock: hero({ klein: "Morgen", gross: `${o.uhrzeit} Uhr`,
        unten: o.thema, ruhig: true }),
      greeting: vorname ? `Hallo ${vorname},` : "Hallo,",
      blocks,
      baseUrl: url,
      footerReason: "Du bekommst diese Mail, weil du einen Termin gebucht hast.",
    }),
  };
}

// -------------------------------------------------------------------
// 2b) Erinnerung, 15 Minuten vorher
//
// Gleiches Kit wie Bestaetigung und 24h-Erinnerung (vorher eigenes HTML mit
// rot/gruenem Verlauf, ohne Impressums-Fuss). Ohne Meet-Link keine
// Zeitzusage: der Link wird dann von Hand nachgeschickt (Admin-Warnung in
// send-booking-reminders), also nur "in Kuerze".
// -------------------------------------------------------------------
export function buildTerminGleich(o: {
  name: string; uhrzeit: string; thema: string; meetLink?: string | null;
  bookingId: string; baseUrl?: string;
}): Built {
  const url = (o.baseUrl ?? BASIS).replace(/\/+$/, "");
  const vorname = (o.name ?? "").trim().split(" ")[0];
  const roh = (o.meetLink ?? "").trim();
  const link = /^https:\/\/[^\s"'<>]+$/i.test(roh) ? roh : "";

  const blocks = [
    aufmacher("Es geht gleich los.",
      `Dein 1:1-Call zum Thema „${o.thema}“ startet um ${o.uhrzeit} Uhr.`),
    link
      ? button(esc(link), "Jetzt in den Call")
      : betonung("Der Link kommt in Kürze",
        "Wir schicken dir den Meet-Link in Kürze per separater Mail. " +
        "Falls er nicht ankommt, antworte einfach auf diese Mail."),
    divider(),
    steps([
      ["Mikro und Kamera testen", "Google Meet → Einstellungen → Audio/Video."],
      ["Ruhigen Platz suchen", "Damit wir die 30 Minuten voll nutzen."],
      ["Fragen bereitlegen", "Notizen helfen, nichts zu vergessen."],
    ]),
  ];

  return {
    subject: link
      ? `In 15 Min: dein GründerX 1:1-Call — hier ist der Link`
      : `In 15 Min: dein GründerX 1:1-Call`,
    text: plain({
      greeting: vorname ? `Hallo ${vorname},` : "Hallo,",
      lines: [
        `in 15 Minuten geht's los — dein 1:1-Call startet um ${o.uhrzeit} Uhr.`,
        `Thema: ${o.thema}`,
        "",
        link ? `Call-Link: ${link}` : "Der Meet-Link kommt in Kürze per separater Mail.",
        "",
        "Vor dem Call: Mikro und Kamera testen, ruhigen Platz suchen, Fragen bereitlegen.",
        "",
        `Buchungsnummer: ${o.bookingId}`,
      ],
    }),
    html: renderMail({
      preheader: link ? `Start ${o.uhrzeit} Uhr — der Link ist in dieser Mail.` : `Start ${o.uhrzeit} Uhr.`,
      heroBlock: hero({ klein: "In 15 Minuten", gross: `${o.uhrzeit} Uhr`, unten: o.thema }),
      greeting: vorname ? `Hallo ${vorname},` : "Hallo,",
      blocks,
      baseUrl: url,
      footerNote: `Buchungsnummer ${esc(o.bookingId)}`,
      footerReason: "Du bekommst diese Mail, weil du einen Termin gebucht hast.",
    }),
  };
}

// -------------------------------------------------------------------
// 3) Support-Anfrage eingegangen
// -------------------------------------------------------------------
// betreff ist optional: Die Kunden-Bestätigung des öffentlichen Kontaktformulars
// gibt ihn NICHT wieder — Adresse und Betreff wählt dort der Absender frei, und
// mit wiedergegebenem Betreff war das Formular ein Relay für beliebigen Text
// unter @gruenderx.de an fremde Adressen.
export function buildTicketEingang(o: {
  betreff?: string | null; name?: string | null; ticketId?: string | null;
  antwortInnerhalb?: string; baseUrl?: string;
}): Built {
  const url = (o.baseUrl ?? BASIS).replace(/\/+$/, "");
  const frist = o.antwortInnerhalb ?? "24 Stunden";
  const vorname = (o.name ?? "").trim().split(" ")[0];

  const blocks = [
    aufmacher("Deine Anfrage ist da.",
      `Wir antworten innerhalb von ${frist} — auf diese Adresse.`),
    ...(o.betreff ? [paragraph(`<b>Dein Anliegen:</b> ${esc(o.betreff)}`)] : []),
    ...(o.ticketId ? [kennung(o.ticketId,
      "Deine Ticketnummer. Wenn du nachfragst, nenn sie — dann finden wir " +
      "den Vorgang sofort.")] : []),
    divider(),
    paragraph(
      "Du musst nichts weiter tun. Antworte einfach auf diese Mail, wenn dir " +
      "noch etwas einfällt — es landet im selben Vorgang.",
    ),
  ];

  return {
    subject: o.betreff ? `Anfrage erhalten: ${o.betreff}`.slice(0, 68) : "Anfrage erhalten",
    text: plain({
      greeting: vorname ? `Hallo ${vorname},` : "Hallo,",
      lines: [
        "deine Anfrage ist bei uns angekommen.",
        `Wir antworten innerhalb von ${frist} auf diese Adresse.`,
        ...(o.betreff ? ["", `Dein Anliegen: ${o.betreff}`] : []),
        ...(o.ticketId ? ["", `Ticketnummer: ${o.ticketId}`] : []),
      ],
    }),
    html: renderMail({
      preheader: `Wir antworten innerhalb von ${frist}.`,
      heroBlock: hero({ klein: "Support", gross: "Angekommen",
        unten: `Antwort innerhalb von ${frist}.`, ruhig: true }),
      greeting: vorname ? `Hallo ${vorname},` : "Hallo,",
      blocks,
      baseUrl: url,
      footerReason: "Du bekommst diese Mail, weil du uns eine Anfrage geschickt hast.",
    }),
  };
}
