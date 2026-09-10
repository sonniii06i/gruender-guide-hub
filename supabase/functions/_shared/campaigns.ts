// ===================================================================
// Kampagnen-Mails: Empfehlung nach dem Kauf und Warenkorb-Abbruch.
//
// Beide bauen auf mailLayout.ts, damit Kopf, Knopf und Fuss ueberall gleich
// aussehen und eine Markenaenderung nur an einer Stelle passiert.
//
// ZU DEN ZAHLEN: Die 20 % lebenslange Umsatzbeteiligung sind exakt das, was
// /affiliate bereits oeffentlich zusagt ("20 % von jeder Zahlung deiner
// Geworbenen – dauerhaft, nicht nur im ersten Monat"). Die Euro-Betraege
// werden hier aus den echten Bruttopreisen gerechnet, nicht geschaetzt --
// 20 % auf den NETTO-Umsatz, so wie es auf /affiliate steht und wie der
// Webhook (RATE = 0.20 auf total_excluding_tax) tatsaechlich abrechnet.
// ===================================================================

import {
  BRAND, BRAND_DARK, button, callout, heading, paragraph, renderMail, steps,
} from "./mailLayout.ts";

/** Bruttopreise — die Betraege, die Stripe tatsaechlich einzieht. */
const PREIS = {
  gruenderx: { month: 6499, year: 64990 },
  bundle: { month: 9999, year: 99990 },
} as const;

export type Produkt = keyof typeof PREIS;
export type Intervall = "month" | "year";

const eur = (cents: number) =>
  `${(cents / 100).toFixed(2).replace(".", ",")} €`;

/** 20 % vom Netto — dieselbe Rechnung wie im Affiliate-Webhook. */
const provision = (bruttoCents: number) =>
  eur(Math.round((bruttoCents / 1.19) * 0.20));

export interface Built {
  subject: string;
  text: string;
  html: string;
}

// "Founder-Set" ist der Name im Shop (18 Fundstellen gegen 2 mit
// "Founder-Bundle"). Wer in der Mail einen anderen Namen liest als auf der
// Kaufseite, glaubt an ein anderes Produkt.
const NAME: Record<Produkt, string> = {
  gruenderx: "GründerX",
  bundle: "Founder-Set (GründerX + AnwaltX)",
};

/** Kurzform fuer die Betreffzeile — lange Betreffs schneidet jedes Postfach ab. */
const KURZ: Record<Produkt, string> = {
  gruenderx: "GründerX",
  bundle: "das Founder-Set",
};

// -------------------------------------------------------------------
// 1) Empfehlung — einige Tage NACH dem Kauf
//
// WARUM NICHT SOFORT. Wer gerade gezahlt hat, will das Produkt benutzen
// und nicht verkaufen. Eine Empfehlungsbitte in der Kaufbestaetigung liest
// sich wie ein Nachfassen an der Kasse; nach einer Woche ist der Nutzen
// sichtbar geworden und die Frage berechtigt.
// -------------------------------------------------------------------
export function buildReferral(opts: {
  name?: string | null;
  produkt?: Produkt;
  baseUrl?: string;
  unsubscribeUrl?: string;
}): Built {
  const url = (opts.baseUrl ?? "https://gruenderx.de").replace(/\/+$/, "");
  const link = `${url}/affiliate`;
  const name = (opts.name ?? "").trim();
  const greeting = name ? `Hallo ${name},` : "Hallo,";
  const p = opts.produkt ?? "gruenderx";
  const proMonat = provision(PREIS[p].month);
  const proJahr = provision(PREIS[p].year);

  const blocks = [
    paragraph(
      "du nutzt GründerX jetzt ein paar Tage. Falls es dir hilft: In deinem " +
      "Umfeld gibt es sicher andere, die ihre Rechtsform noch im Forum " +
      "erfragen, ihre USt-Voranmeldung auf gut Glück abgeben und ihre " +
      "Amazon-Abrechnung nie wirklich gelesen haben.",
    ),
    callout(
      `${proMonat} pro Monat — für jeden geworbenen Kunden, dauerhaft`,
      `<b>20 % von jeder Zahlung</b>, nicht nur von der ersten. Wer zwölf ` +
      `Monate bleibt, bringt dir zwölf Provisionen; ein Jahresabo bringt ` +
      `${proJahr} auf einmal. Keine Deckelung, keine Mindestumsätze, ` +
      `kein Bewerbungsverfahren — Link holen und starten.`,
    ),
    button(link, "Empfehlungslink holen"),
    heading("Wenn du es kurz halten willst"),
    paragraph(
      `<i>„Ich nutze GründerX — Rechtsform, Steuern und Marketplace-Pflichten ` +
      `an einer Stelle, ${eur(PREIS[p].month)} im Monat. Wenn du deine ` +
      `Gründungsfragen noch googelst, schau es dir an: ` +
      `<a href="${link}" style="color:${BRAND}">gruenderx.de</a>“</i>`,
    ),
    paragraph(
      `<span style="color:${BRAND_DARK}">Deine Auszahlung läuft ab 20 € ` +
      `gesammelter Provision, per Überweisung. Die Übersicht steht jederzeit ` +
      `unter <a href="${link}" style="color:${BRAND}">Partnerprogramm</a>.</span>`,
    ),
  ];

  const text = [
    greeting, "",
    "du nutzt GruenderX jetzt ein paar Tage. Falls es dir hilft: In deinem",
    "Umfeld gibt es sicher andere mit denselben Gruendungsfragen.",
    "",
    `${proMonat.replace(" €", " EUR")} pro Monat, fuer jeden geworbenen Kunden.`,
    "20 % von jeder Zahlung — dauerhaft, nicht nur von der ersten.",
    "Keine Deckelung, keine Mindestumsaetze, kein Bewerbungsverfahren.",
    "",
    `Empfehlungslink holen: ${link}`,
    "",
    "Auszahlung ab 20 EUR gesammelter Provision, per Ueberweisung.",
    "",
    "Fragen? Antworte einfach auf diese Mail.",
    "",
    "Viele Gruesse",
    "Sonni von GruenderX",
  ].join("\n");

  return {
    subject: "Kennst du jemanden, dem GründerX hilft?",
    text,
    html: renderMail({
      preheader:
        `20 % von jeder Zahlung, dauerhaft — rund ${proMonat} pro Monat und geworbenem Kunden.`,
      greeting,
      blocks,
      baseUrl: url,
      footerNote:
        "Kein Interesse an Empfehlungen? Dann ignorier die Mail einfach — " +
        "sie kommt nur dieses eine Mal.",
      footerReason:
        `Du bekommst diese Mail einmalig, weil du ${NAME[p]} gekauft hast.`,
      unsubscribeUrl: opts.unsubscribeUrl,
    }),
  };
}

// -------------------------------------------------------------------
// 2) Warenkorb-Abbruch — ausgeloest von checkout.session.expired
//
// Stripe laesst eine unbezahlte Checkout-Session nach rund 24 Stunden
// ablaufen und meldet das per Webhook. Das ist der saubere Ausloeser: Es
// steht fest, dass nicht gezahlt wurde, die Mailadresse liegt in der
// Session, und wir muessen keine eigenen Timer bauen. Die abgelaufene
// Session laesst sich nicht wiederbeleben -- der Knopf fuehrt deshalb auf
// einen frischen Checkout mit derselben Auswahl.
// -------------------------------------------------------------------
export function buildAbandoned(opts: {
  produkt?: Produkt;
  intervall?: Intervall;
  baseUrl?: string;
  unsubscribeUrl?: string;
}): Built {
  const url = (opts.baseUrl ?? "https://gruenderx.de").replace(/\/+$/, "");
  const p = opts.produkt ?? "gruenderx";
  const iv: Intervall = opts.intervall === "year" ? "year" : "month";
  const brutto = PREIS[p][iv];
  const preis = eur(brutto);
  const zeitraum = iv === "year" ? "pro Jahr" : "pro Monat";
  const tage = iv === "year" ? 365 : 30;
  const proTag = eur(Math.round(brutto / tage));
  // Der Warenkorb merkt sich die Auswahl selbst (gx_cart_variant); der Link
  // setzt sie zusaetzlich in der URL, damit sie auch auf einem anderen
  // Geraet stimmt.
  const variante = p === "bundle"
    ? (iv === "year" ? "bundle-year" : "bundle")
    : (iv === "year" ? "gruenderx-year" : "gruenderx");
  const zurueck = `${url}/checkout?variant=${variante}`;

  const blocks = [
    paragraph(
      "du warst gestern bei der Zahlung und bist nicht durchgekommen. " +
      "Kein Problem — hier ist der Weg zurück, es wurde nichts abgebucht.",
    ),
    callout(
      `${NAME[p]} — ${preis} ${zeitraum}`,
      `Endpreis inkl. 19 % USt., an der Kasse kommt nichts dazu. Das sind ` +
      `${proTag} am Tag und als Betriebsausgabe absetzbar. Jederzeit zum Ende ` +
      `der Abrechnungsperiode kündbar.`,
    ),
    button(zurueck, "Zahlung abschließen"),
    heading("Falls einer dieser Punkte der Grund war"),
    steps([
      ["„Lohnt sich das für mich überhaupt?“",
       "Eine einzige Entscheidung trägt das Jahr: die falsche Rechtsform kostet " +
       "vierstellig, eine vergessene LUCID- oder WEEE-Registrierung bringt " +
       "Abmahnungen, und ein Steuerberater-Erstgespräch allein kostet mehr als " +
       "einen Monat hier."],
      ["„Ich habe schon einen Steuerberater.“",
       "Dann bist du genau richtig: GründerX bereitet vor, was du sonst teuer " +
       "auf seinem Schreibtisch ablegst — Belege sortiert, EÜR vorbereitet, " +
       "Amazon-Abrechnung aufgeschlüsselt. Es ersetzt keine Steuerberatung."],
      ["„Was, wenn es nichts für mich ist?“",
       "Jederzeit zum Ende der Abrechnungsperiode kündbar — ein Klick im " +
       "Kundenportal, keine Mindestlaufzeit, kein Anruf."],
    ]),
  ];

  const text = [
    "Hallo,", "",
    "du warst bei der Zahlung und bist nicht durchgekommen.",
    "Es wurde nichts abgebucht — hier ist der Weg zurueck:",
    "",
    zurueck, "",
    `${NAME[p]}: ${preis.replace(" €", " EUR")} ${zeitraum} (Endpreis inkl. 19 % USt.),`,
    `das sind ${proTag.replace(" €", " EUR")} am Tag und als Betriebsausgabe absetzbar.`,
    "Jederzeit zum Ende der Abrechnungsperiode kuendbar.",
    "",
    "Fragen? Antworte einfach auf diese Mail.",
    "",
    "Viele Gruesse",
    "Sonni von GruenderX",
  ].join("\n");

  return {
    subject: `Dein Zugang wartet — ${KURZ[p]} für ${preis}`,
    text,
    html: renderMail({
      preheader: "Es wurde nichts abgebucht. Hier geht es zurück zur Kasse.",
      greeting: "Hallo,",
      blocks,
      baseUrl: url,
      footerNote:
        "Du hast dich anders entschieden? Dann ignorier die Mail — " +
        "wir schreiben deswegen kein zweites Mal.",
      // Wer abgebrochen hat, hat pay-first bedingt noch kein Konto.
      footerReason:
        "Du bekommst diese Mail, weil du bei GründerX einen Kauf begonnen und " +
        "nicht abgeschlossen hast.",
      unsubscribeUrl: opts.unsubscribeUrl,
    }),
  };
}
