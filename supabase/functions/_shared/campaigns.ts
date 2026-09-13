// ===================================================================
// campaigns.ts — alle Werbemails von GruenderX.
//
// Aufbau: mailLayout.ts liefert das Geruest, mailBrand.ts die Marke,
// hier stehen nur Texte und Zahlen.
//
// -------------------------------------------------------------------
// ZU DEN ZAHLEN
// -------------------------------------------------------------------
// Die 20 % lebenslange Umsatzbeteiligung sind exakt das, was /affiliate
// oeffentlich zusagt ("20 % von jeder Zahlung deiner Geworbenen –
// dauerhaft, nicht nur im ersten Monat"). Die Euro-Betraege werden aus
// den echten Bruttopreisen GERECHNET, nicht geschaetzt: 20 % auf den
// Nettoumsatz, so wie es auf /affiliate steht und wie der Webhook
// (RATE = 0.20 auf total_excluding_tax) tatsaechlich abrechnet.
//
// Nichts in dieser Datei darf eine Zahl behaupten, die nicht auf
// gruenderx.de nachlesbar ist. Keine erfundenen Rabatte, keine
// Scheinknappheit, keine Superlative.
//
// -------------------------------------------------------------------
// WARUM DIE WARENKORBSTRECKE DREI MAILS HAT
// -------------------------------------------------------------------
// Bisher ging genau eine Mail raus. Drei Mails holen ein Vielfaches
// zurueck, aber nur, wenn sie verschiedene Dinge tun — drei Mal
// "Du hast etwas vergessen" verbrennt die Adresse.
//
//   Stufe 1 (~1 h)  HILFE. Der haeufigste Abbruchgrund an der Kasse ist
//       eine Stoerung, keine Entscheidung. Diese Mail verkauft nicht.
//   Stufe 2 (24 h)  EINWAND. Wer nach einem Tag nicht zurueck ist, hatte
//       einen inhaltlichen Grund. Die drei echten werden beantwortet.
//   Stufe 3 (72 h)  ENTSCHEIDUNG. Sagt ausdruecklich, dass es die letzte
//       Mail ist — der glaubwuerdigste Grund zu handeln, den es ohne
//       erfundene Knappheit gibt, und er haelt die Beschwerdequote unten.
// ===================================================================

import {
  BRAND, BRAND_DARK, bullets, button, callout, divider, eur, heading,
  paragraph, plain, priceRows, renderMail, secondary, steps, track,
  type Built,
} from "./mailLayout.ts";

/** Bruttopreise — die Betraege, die Stripe tatsaechlich einzieht. */
const PREIS = {
  gruenderx: { month: 6499, year: 64990 },
  bundle: { month: 9999, year: 99990 },
} as const;

export type Produkt = keyof typeof PREIS;
export type Intervall = "month" | "year";

const BASIS = "https://gruenderx.de";

/** 20 % vom Netto — dieselbe Rechnung wie im Affiliate-Webhook. */
const provision = (bruttoCents: number) =>
  eur(Math.round((bruttoCents / 1.19) * 0.20));

// "Founder-Set" ist der Name im Shop (18 Fundstellen gegen 2 mit
// "Founder-Bundle"). Wer in der Mail einen anderen Namen liest als auf
// der Kaufseite, glaubt an ein anderes Produkt.
const NAME: Record<Produkt, string> = {
  gruenderx: "GründerX",
  bundle: "Founder-Set (GründerX + AnwaltX)",
};

/** Kurzform fuer die Betreffzeile — lange Betreffs schneidet jedes Postfach ab. */
const KURZ: Record<Produkt, string> = {
  gruenderx: "GründerX",
  bundle: "das Founder-Set",
};

interface CartOpts {
  produkt?: Produkt;
  intervall?: Intervall;
  baseUrl?: string;
  unsubscribeUrl?: string;
  variant?: string;
}

/** Gemeinsame Ableitungen der drei Warenkorbstufen. */
function cartBasis(o: CartOpts) {
  const url = (o.baseUrl ?? BASIS).replace(/\/+$/, "");
  const p = o.produkt ?? "gruenderx";
  const iv: Intervall = o.intervall === "year" ? "year" : "month";
  const brutto = PREIS[p][iv];
  const tage = iv === "year" ? 365 : 30;
  // Der Warenkorb merkt sich die Auswahl selbst (gx_cart_variant); der
  // Link setzt sie zusaetzlich, damit sie auch auf einem anderen Geraet
  // stimmt.
  const variante = p === "bundle"
    ? (iv === "year" ? "bundle-year" : "bundle")
    : (iv === "year" ? "gruenderx-year" : "gruenderx");
  return {
    url, p, iv, brutto,
    preis: eur(brutto),
    zeitraum: iv === "year" ? "pro Jahr" : "pro Monat",
    proTag: eur(Math.round(brutto / tage)),
    ziel: `${url}/checkout?variant=${variante}`,
    v: o.variant ?? "a",
  };
}

// -------------------------------------------------------------------
// 1) Warenkorb, Stufe 1 — die Hilfsmail
// -------------------------------------------------------------------
export function buildCartHelp(o: CartOpts): Built {
  const b = cartBasis(o);
  const zurueck = track(b.ziel, "cart1", b.v);

  const subject = b.v === "b"
    ? "Die Zahlung ist nicht durchgegangen"
    : "Hat etwas nicht funktioniert?";

  const blocks = [
    paragraph(
      "du warst gerade an der Kasse und bist nicht durchgekommen. " +
      "Meistens liegt das nicht an der Entscheidung, sondern am Weg dorthin — " +
      "eine abgelehnte Karte, ein geschlossener Tab, eine Bank, die nachfragt. " +
      "<b>Abgebucht wurde nichts.</b>",
    ),
    button(zurueck, "Da weitermachen, wo du warst"),
    secondary(track(`${b.url}/kontakt`, "cart1", b.v),
      "Oder antworte auf diese Mail — ich schaue selbst nach."),
    divider(),
    heading("Falls es doch an etwas anderem lag"),
    bullets([
      "Die Zahlung läuft über Stripe. Deine Kartendaten liegen nicht bei uns.",
      "Kündbar zum Ende der Abrechnungsperiode — ein Klick im Kundenportal.",
      `Endpreis ${b.preis} ${b.zeitraum} inkl. 19 % USt. An der Kasse kommt nichts dazu.`,
      "Als Betriebsausgabe absetzbar.",
    ]),
  ];

  return {
    subject,
    text: plain({
      greeting: "Hallo,",
      lines: [
        "du warst gerade an der Kasse und bist nicht durchgekommen.",
        "Abgebucht wurde nichts.",
        "",
        "Meistens liegt das an einer abgelehnten Karte oder einem",
        "geschlossenen Tab — nicht an der Entscheidung.",
        "",
        `Endpreis ${b.preis.replace(" €", " EUR")} ${b.zeitraum} inkl. 19 % USt.`,
        "Kuendbar zum Ende der Abrechnungsperiode, als Betriebsausgabe absetzbar.",
      ],
      cta: ["Da weitermachen, wo du warst", zurueck],
      unsubscribeUrl: o.unsubscribeUrl,
      reason: "Du bekommst diese Mail, weil du bei GruenderX einen Kauf begonnen hast.",
    }),
    html: renderMail({
      preheader: "Es wurde nichts abgebucht — hier geht es zurück zur Kasse.",
      greeting: "Hallo,",
      blocks,
      baseUrl: b.url,
      footerReason:
        "Du bekommst diese Mail, weil du bei GründerX einen Kauf begonnen und " +
        "nicht abgeschlossen hast.",
      unsubscribeUrl: o.unsubscribeUrl,
    }),
  };
}

// -------------------------------------------------------------------
// 2) Warenkorb, Stufe 2 — die Einwandmail
// -------------------------------------------------------------------
export function buildCartObjections(o: CartOpts): Built {
  const b = cartBasis(o);
  const zurueck = track(b.ziel, "cart2", b.v);

  const subject = b.v === "b"
    ? "Die falsche Rechtsform kostet vierstellig"
    : `${KURZ[b.p]} — ${b.preis} ${b.zeitraum}`;

  const blocks = [
    paragraph(
      "du hast dir GründerX angesehen und dich noch nicht entschieden. " +
      "Das ist in Ordnung — ich kenne die drei Gründe, die üblicherweise " +
      "dahinterstehen, und beantworte sie lieber ehrlich als gar nicht.",
    ),
    steps([
      ["„Lohnt sich das für mich überhaupt?“",
       "Eine einzige Entscheidung trägt das Jahr: Die falsche Rechtsform kostet " +
       "vierstellig, eine vergessene LUCID- oder WEEE-Registrierung bringt " +
       "Abmahnungen, und ein Steuerberater-Erstgespräch allein kostet mehr als " +
       "einen Monat hier."],
      ["„Ich habe schon einen Steuerberater.“",
       "Dann bist du genau richtig: GründerX bereitet vor, was du sonst teuer " +
       "auf seinem Schreibtisch ablegst — Belege sortiert, EÜR vorbereitet, " +
       "Amazon-Abrechnung aufgeschlüsselt. Es ersetzt keine Steuerberatung, " +
       "es macht sie billiger."],
      ["„Was, wenn es nichts für mich ist?“",
       "Kündbar zum Ende der Abrechnungsperiode — ein Klick im Kundenportal, " +
       "keine Mindestlaufzeit, kein Anruf."],
    ]),
    callout(
      `${b.preis} ${b.zeitraum} — das sind ${b.proTag} am Tag`,
      "Endpreis inkl. 19 % USt., an der Kasse kommt nichts dazu. " +
      "Als Betriebsausgabe absetzbar.",
    ),
    button(zurueck, "Zahlung abschließen"),
  ];

  return {
    subject,
    text: plain({
      greeting: "Hallo,",
      lines: [
        "du hast dir GruenderX angesehen und dich noch nicht entschieden.",
        "Die drei Gruende, die ueblicherweise dahinterstehen:",
        "",
        "1. \"Lohnt sich das?\" — Die falsche Rechtsform kostet vierstellig,",
        "   eine vergessene LUCID- oder WEEE-Registrierung bringt Abmahnungen.",
        "2. \"Ich habe schon einen Steuerberater.\" — Dann bist du richtig:",
        "   GruenderX bereitet vor, was sonst teuer auf seinem Schreibtisch",
        "   landet. Es ersetzt keine Steuerberatung, es macht sie billiger.",
        "3. \"Und wenn es nichts fuer mich ist?\" — Kuendbar zum Ende der",
        "   Abrechnungsperiode, ein Klick im Kundenportal.",
        "",
        `${b.preis.replace(" €", " EUR")} ${b.zeitraum}, das sind ${b.proTag.replace(" €", " EUR")} am Tag.`,
        "Endpreis inkl. 19 % USt., als Betriebsausgabe absetzbar.",
      ],
      cta: ["Zahlung abschliessen", zurueck],
      unsubscribeUrl: o.unsubscribeUrl,
      reason: "Du bekommst diese Mail, weil du bei GruenderX einen Kauf begonnen hast.",
    }),
    html: renderMail({
      preheader: `${b.proTag} am Tag, kündbar zum Ende der Abrechnungsperiode.`,
      greeting: "Hallo,",
      blocks,
      baseUrl: b.url,
      footerReason:
        "Du bekommst diese Mail, weil du bei GründerX einen Kauf begonnen und " +
        "nicht abgeschlossen hast.",
      unsubscribeUrl: o.unsubscribeUrl,
    }),
  };
}

// -------------------------------------------------------------------
// 3) Warenkorb, Stufe 3 — die letzte Mail
// -------------------------------------------------------------------
export function buildCartLast(o: CartOpts): Built {
  const b = cartBasis(o);
  const zurueck = track(b.ziel, "cart3", b.v);

  const subject = b.v === "b"
    ? "Ich hake nicht weiter nach"
    : "Letzte Mail zu deinem Zugang";

  const blocks = [
    paragraph(
      "das ist die letzte Mail zu deinem angefangenen Kauf — danach hörst du " +
      "von mir nichts mehr dazu. Kein Countdown, kein Sonderpreis, der morgen " +
      "abläuft: Der Zugang kostet nächste Woche dasselbe wie heute.",
    ),
    paragraph(
      "Was sich ändert, ist der Zeitpunkt. Die Fragen, für die GründerX gebaut " +
      "ist, stellen sich nicht, wenn man Zeit hat — sondern wenn das Finanzamt " +
      "schreibt, die Registrierung fehlt oder der Marktplatz das Konto sperrt. " +
      "Wer dann erst anfängt zu suchen, zahlt den Eilzuschlag.",
    ),
    priceRows(
      [
        [`${NAME[b.p]}, monatlich`, eur(PREIS[b.p].month)],
        ["Jährlich (zwei Monate geschenkt)", eur(PREIS[b.p].year)],
        ["Kündigung", "zum Ende der Abrechnungsperiode"],
      ],
      ["Endpreis inkl. 19 % USt.", "als Betriebsausgabe absetzbar"],
    ),
    button(zurueck, "Zugang freischalten"),
    paragraph(
      `<span style="color:${BRAND_DARK}">Falls es nicht passt: Antworte kurz ` +
      `mit „passt nicht“ — dann weiß ich, woran es lag, und du hast deine Ruhe.</span>`,
    ),
  ];

  return {
    subject,
    text: plain({
      greeting: "Hallo,",
      lines: [
        "das ist die letzte Mail zu deinem angefangenen Kauf.",
        "Kein Countdown, kein Sonderpreis: Der Zugang kostet naechste",
        "Woche dasselbe wie heute.",
        "",
        "Was sich aendert, ist der Zeitpunkt. Die Fragen, fuer die",
        "GruenderX gebaut ist, stellen sich, wenn das Finanzamt schreibt",
        "oder der Marktplatz sperrt — dann zahlt man den Eilzuschlag.",
        "",
        `Monatlich: ${eur(PREIS[b.p].month).replace(" €", " EUR")}`,
        `Jaehrlich: ${eur(PREIS[b.p].year).replace(" €", " EUR")} (zwei Monate geschenkt)`,
        "Endpreis inkl. 19 % USt., kuendbar zum Ende der Abrechnungsperiode.",
        "",
        "Falls es nicht passt: Antworte kurz mit \"passt nicht\".",
      ],
      cta: ["Zugang freischalten", zurueck],
      unsubscribeUrl: o.unsubscribeUrl,
      reason: "Du bekommst diese Mail, weil du bei GruenderX einen Kauf begonnen hast.",
    }),
    html: renderMail({
      preheader: "Danach hörst du nichts mehr dazu — versprochen.",
      greeting: "Hallo,",
      blocks,
      baseUrl: b.url,
      footerNote:
        "Das war die letzte Mail zu diesem Vorgang. Wir schreiben deswegen " +
        "kein weiteres Mal.",
      footerReason:
        "Du bekommst diese Mail, weil du bei GründerX einen Kauf begonnen und " +
        "nicht abgeschlossen hast.",
      unsubscribeUrl: o.unsubscribeUrl,
    }),
  };
}

/** Die Strecke in der Reihenfolge, in der sie versendet wird. */
export const CART_STRECKE = [
  { stufe: 1, nachStunden: 1, campaign: "cart1", build: buildCartHelp },
  { stufe: 2, nachStunden: 24, campaign: "cart2", build: buildCartObjections },
  { stufe: 3, nachStunden: 72, campaign: "cart3", build: buildCartLast },
] as const;

// -------------------------------------------------------------------
// 4) Empfehlung — einige Tage NACH dem Kauf
//
// WARUM NICHT SOFORT. Wer gerade gezahlt hat, will das Produkt benutzen
// und nicht verkaufen. Eine Empfehlungsbitte in der Kaufbestaetigung
// liest sich wie ein Nachfassen an der Kasse; nach einer Woche ist der
// Nutzen sichtbar geworden und die Frage berechtigt.
// -------------------------------------------------------------------
export function buildReferral(o: {
  name?: string | null; produkt?: Produkt; baseUrl?: string;
  unsubscribeUrl?: string; variant?: string;
}): Built {
  const url = (o.baseUrl ?? BASIS).replace(/\/+$/, "");
  const v = o.variant ?? "a";
  const link = track(`${url}/affiliate`, "referral", v);
  const name = (o.name ?? "").trim();
  const greeting = name ? `Hallo ${name},` : "Hallo,";
  const p = o.produkt ?? "gruenderx";
  const proMonat = provision(PREIS[p].month);
  const proJahr = provision(PREIS[p].year);

  const subject = v === "b"
    ? `${proMonat} pro geworbenem Kunden — dauerhaft`
    : "Kennst du jemanden, dem GründerX hilft?";

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

  return {
    subject,
    text: plain({
      greeting,
      lines: [
        "du nutzt GruenderX jetzt ein paar Tage. Falls es dir hilft: In deinem",
        "Umfeld gibt es sicher andere mit denselben Gruendungsfragen.",
        "",
        `${proMonat.replace(" €", " EUR")} pro Monat, fuer jeden geworbenen Kunden.`,
        "20 % von jeder Zahlung — dauerhaft, nicht nur von der ersten.",
        "Keine Deckelung, keine Mindestumsaetze, kein Bewerbungsverfahren.",
        "",
        "Auszahlung ab 20 EUR gesammelter Provision, per Ueberweisung.",
      ],
      cta: ["Empfehlungslink holen", link],
      unsubscribeUrl: o.unsubscribeUrl,
    }),
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
      unsubscribeUrl: o.unsubscribeUrl,
    }),
  };
}

// -------------------------------------------------------------------
// 5) Wochenmail — aus dem echten Stand des jeweiligen Kontos
//
// Diese Mail ist der Grund, warum die Liste eine woechentliche Frequenz
// aushaelt: Sie ist keine Werbung, sie ist ein Arbeitsstand. Jede Zeile
// stammt aus dem Playbook-Fortschritt und dem Partnerkonto dieses
// Nutzers.
//
// Die Mail geht NUR raus, wenn es etwas zu berichten gibt — siehe
// hatInhalt(). Eine Wochenmail, die "diese Woche nichts" meldet,
// trainiert den Empfaenger darauf, sie nicht mehr zu oeffnen, und genau
// daran sterben Newsletter.
// -------------------------------------------------------------------
export interface WochenStand {
  /** Titel des Playbooks, an dem gerade gearbeitet wird. */
  playbook?: string | null;
  schrittNr?: number;
  schritteGesamt?: number;
  /** Titel des naechsten offenen Schritts. */
  naechsterSchritt?: string | null;
  /** Offene Provision in Cent. */
  provisionCents?: number;
  /** Neue Ratgeber-Artikel dieser Woche: [Titel, Pfad]. */
  neueArtikel?: Array<[string, string]>;
}

export function hatInhalt(s: WochenStand): boolean {
  return !!(s.naechsterSchritt || s.provisionCents || s.neueArtikel?.length);
}

export function buildWeekly(o: {
  name?: string | null; stand: WochenStand; baseUrl?: string;
  unsubscribeUrl?: string; variant?: string;
}): Built {
  const url = (o.baseUrl ?? BASIS).replace(/\/+$/, "");
  const v = o.variant ?? "a";
  const s = o.stand;
  const name = (o.name ?? "").trim();
  const greeting = name ? `Hallo ${name},` : "Hallo,";

  const offen = s.naechsterSchritt;
  const ziel = track(offen ? `${url}/playbooks` : `${url}/dashboard`, "weekly", v);

  // Der Betreff nennt den konkreten naechsten Schritt. Ein Betreff, der
  // sagt, was zu tun ist, wird geoeffnet; "Dein Wochenupdate" nicht.
  const subject = offen
    ? (v === "b" ? `Als Nächstes: ${offen}`.slice(0, 60) : "Ein Schritt fehlt noch")
    : (v === "b" ? "Neu diese Woche" : "Deine Woche bei GründerX");

  const blocks: string[] = [];

  if (offen) {
    blocks.push(paragraph(
      s.playbook && s.schrittNr && s.schritteGesamt
        ? `dein Playbook <b>${s.playbook}</b> steht bei Schritt ` +
          `${s.schrittNr} von ${s.schritteGesamt}. Der nächste offene Punkt:`
        : "ein Punkt in deinem Playbook ist noch offen:",
    ));
    blocks.push(callout(offen,
      "Angefangene Playbooks bleiben genau an der Stelle liegen, an der es " +
      "unbequem wird — meistens die, die später am teuersten ist."));
  } else {
    blocks.push(paragraph("hier ist, was diese Woche für dich dazugekommen ist:"));
  }

  if (s.provisionCents) {
    blocks.push(priceRows([
      ["Ausgezahlte und offene Provision", `<b>${eur(s.provisionCents)}</b>`],
    ]));
  }

  blocks.push(button(ziel, offen ? "Weitermachen" : "Zum Dashboard"));

  if (s.neueArtikel?.length) {
    blocks.push(divider());
    blocks.push(heading("Neu im Ratgeber"));
    blocks.push(bullets(s.neueArtikel.map(([t, p]) =>
      `<a href="${track(`${url}${p}`, "weekly", v)}" style="color:${BRAND}">${t}</a>`)));
  }

  return {
    subject,
    text: plain({
      greeting,
      lines: [
        offen
          ? `Dein Playbook steht bei Schritt ${s.schrittNr ?? "?"} von ${s.schritteGesamt ?? "?"}.`
          : "Was diese Woche dazugekommen ist:",
        offen ? `Naechster offener Punkt: ${offen}` : "",
        s.provisionCents ? `Provision: ${eur(s.provisionCents).replace(" €", " EUR")}` : "",
        "",
        ...(s.neueArtikel ?? []).map(([t, p]) => `- ${t}: ${url}${p}`),
      ].filter(Boolean),
      cta: [offen ? "Weitermachen" : "Zum Dashboard", ziel],
      unsubscribeUrl: o.unsubscribeUrl,
    }),
    html: renderMail({
      preheader: offen
        ? `${offen} — der nächste Schritt in deinem Playbook.`
        : "Was diese Woche dazugekommen ist.",
      greeting,
      blocks,
      baseUrl: url,
      footerNote:
        "Diese Mail kommt wöchentlich und nur, wenn es etwas zu berichten gibt.",
      unsubscribeUrl: o.unsubscribeUrl,
    }),
  };
}
