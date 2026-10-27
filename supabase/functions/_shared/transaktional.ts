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
  aufmacher, bullets, button, divider, esc, hero, kennung, paragraph, plain,
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
    subject: `Termin bestätigt: ${o.datumKurz} Uhr`,
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
// 3) Support-Anfrage eingegangen
// -------------------------------------------------------------------
export function buildTicketEingang(o: {
  betreff: string; name?: string | null; ticketId?: string | null;
  antwortInnerhalb?: string; baseUrl?: string;
}): Built {
  const url = (o.baseUrl ?? BASIS).replace(/\/+$/, "");
  const frist = o.antwortInnerhalb ?? "24 Stunden";
  const vorname = (o.name ?? "").trim().split(" ")[0];

  const blocks = [
    aufmacher("Deine Anfrage ist da.",
      `Wir antworten innerhalb von ${frist} — auf diese Adresse.`),
    paragraph(`<b>Dein Anliegen:</b> ${esc(o.betreff)}`),
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
    subject: `Anfrage erhalten: ${o.betreff}`.slice(0, 68),
    text: plain({
      greeting: vorname ? `Hallo ${vorname},` : "Hallo,",
      lines: [
        "deine Anfrage ist bei uns angekommen.",
        `Wir antworten innerhalb von ${frist} auf diese Adresse.`,
        "", `Dein Anliegen: ${o.betreff}`,
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

// -------------------------------------------------------------------
// Kuendigungsbestaetigung (Please Don't Go) — Dienstmail, keine Werbung.
//
// Ausloeser: Stripe customer.subscription.updated (Kuendigung zum
// Periodenende vorgemerkt) bzw. customer.subscription.deleted (sofort
// beendet, cancellation_details.reason = cancellation_requested).
// Verdrahtet in stripe-affiliate-webhook, hinter dem Schalter
// KUENDIGUNG_MAIL_AKTIV (Standard aus).
//
// Belegt: "Kündbar zum Ende der Abrechnungsperiode" (campaigns.ts).
// Kein Angebot, kein Rabatt, kein Knopf, kein Abmeldelink.
// -------------------------------------------------------------------
export function buildKuendigung(o: {
  /** Ende des bezahlten Zeitraums als "TT.MM.JJJJ"; null = sofort beendet. */
  ende: string | null;
  baseUrl?: string;
}): Built {
  const url = (o.baseUrl ?? BASIS).replace(/\/+$/, "");
  const zeile1 = o.ende
    ? `deine Kündigung ist eingegangen. Du kannst GründerX bis zum ${o.ende} weiter nutzen, das ist das Ende des bezahlten Zeitraums.`
    : "deine Kündigung ist eingegangen. Dein Zugang zu GründerX ist damit beendet.";
  const zeile2 = "Wenn du uns sagen magst, woran es lag, antworte auf diese Mail. Eine Zeile reicht.";
  const gruss = "Sonni von GründerX";
  const preheader = o.ende
    ? `Dein Zugang bleibt bis ${o.ende} bestehen.`
    : "Dein Zugang ist beendet.";

  return {
    subject: "Deine Kündigung bei GründerX ist eingegangen",
    text: plain({
      greeting: "Hallo,",
      // Gruss und "Fragen? Antworte einfach …" haengt plain() selbst an.
      lines: [zeile1, "", zeile2],
    }),
    html: renderMail({
      preheader,
      greeting: "Hallo,",
      blocks: [paragraph(zeile1), paragraph(zeile2), paragraph(gruss)],
      baseUrl: url,
      footerReason: "Du bekommst diese Mail, weil du dein GründerX-Abo gekündigt hast.",
    }),
  };
}

// -------------------------------------------------------------------
// 5) Startangebot: Testphase endet bald (27.10.2026)
//
// Ausloeser: Stripe customer.subscription.trial_will_end (3 Tage vor Ende).
// Pflichtinformation, keine Werbung: Datum, Folgepreis, Kuendigungsweg.
// -------------------------------------------------------------------
export function buildStartEndet(o: { ende: string; preis: string; marke?: string; baseUrl?: string; kontoPfad?: string }): Built {
  const url = (o.baseUrl ?? BASIS).replace(/\/+$/, "");
  const marke = o.marke ?? "GründerX";
  const konto = `${url}${o.kontoPfad ?? "/profile"}`;
  const zeile1 = `deine Startwoche bei ${marke} endet am ${o.ende}. Danach läuft dein Abo automatisch für ${o.preis} pro Monat weiter.`;
  const zeile2 = `Willst du nicht weitermachen, kündige bis dahin mit einem Klick in deinem Konto – dann zahlst du nichts weiter.`;
  return {
    subject: `Deine ${marke}-Startwoche endet am ${o.ende}`,
    text: plain({ greeting: "Hallo,", lines: [zeile1, "", zeile2, "", `Zum Konto: ${konto}`] }),
    html: renderMail({
      preheader: `Ab ${o.ende}: ${o.preis} pro Monat – kündbar mit einem Klick.`,
      greeting: "Hallo,",
      blocks: [paragraph(esc(zeile1)), paragraph(esc(zeile2)), button(konto, "Zum Konto")],
      baseUrl: url,
      footerReason: `Du bekommst diese Mail, weil du das ${marke}-Startangebot gebucht hast.`,
    }),
  };
}

// -------------------------------------------------------------------
// Adresse bestaetigen (27.10.2026) — Konten aus claim-account entstehen mit
// der im Checkout eingetippten Mail. Erst nach dem Klick verknuepfen wir
// sie mit bestehenden Daten zu dieser Adresse (Partnerkonto, Kaeufe).
// Der Link oeffnet eine Seite mit Knopf (Link-Scanner loesen sonst aus).
// -------------------------------------------------------------------
export function buildMailVerifizieren(o: { link: string; baseUrl?: string }): Built {
  const url = (o.baseUrl ?? BASIS).replace(/\/+$/, "");
  const zeile1 = "bitte bestätige kurz, dass diese Adresse dir gehört. Dein Konto kannst du schon nutzen – die Bestätigung brauchen wir, bevor wir es mit bestehenden Käufen oder einem Partnerkonto zu dieser Adresse verbinden.";
  const zeile2 = "Du hast bei GründerX nichts gekauft? Dann ignorier diese Mail. Ohne Bestätigung verbinden wir nichts mit deiner Adresse.";
  return {
    subject: "Bitte bestätige deine E-Mail-Adresse",
    text: plain({ greeting: "Hallo,", lines: [zeile1, "", o.link, "", zeile2] }),
    html: renderMail({
      preheader: "Ein Klick – dann ist dein Konto vollständig.",
      greeting: "Hallo,",
      blocks: [
        aufmacher("Adresse bestätigen", "Der Link gilt 7 Tage."),
        paragraph(zeile1),
        button(o.link, "Adresse bestätigen"),
        divider(),
        paragraph(`<b>Nicht du?</b> ${zeile2}`),
      ],
      baseUrl: url,
      footerReason: "Du bekommst diese Mail, weil mit dieser Adresse ein GründerX-Konto angelegt wurde.",
    }),
  };
}
