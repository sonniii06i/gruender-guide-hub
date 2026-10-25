// ===================================================================
// tippsStrecke.ts — Tipps-Strecke nach einem Gratis-Tool (25.10.2026).
//
// RECHTSLAGE. tool_leads ist KEINE Werbeeinwilligung (siehe Migration).
// Diese Strecke geht deshalb nur an Adressen, die
//   1. im E-Mail-Tor das freiwillige, nicht vorangekreuzte Häkchen gesetzt
//      haben (Einwilligungstext EINWILLIGUNG_TEXT, Version gespeichert) und
//   2. den Link in der Bestätigungsmail geklickt haben (Double-Opt-in).
// Jede Strecken-Mail trägt einen signierten Ein-Klick-Abmeldelink.
//
// ABLAUF
//   tipps-anfordern    → Zeile in tipps_abo + Bestätigungsmail
//   tipps-bestaetigen  → bestaetigt_am, Redirect auf /tipps-bestaetigt
//   send-tipps-strecke → stündlich per pg_cron, je Zeile die fällige Stufe
//
// Vier Strecken (Thema), je vier Mails: sofort, Tag 2, Tag 5, Tag 9.
// Alle Zahlen sind belegt (Quellen im Kommentar der jeweiligen Strecke).
//
// Ohne Deno.serve(): Import startet keinen zweiten Server.
// ===================================================================

import { sameSig } from "./unsubscribe.ts";
import {
  aufmacher, bullets, button, paragraph, plain, renderMail, secondary, esc, type Built,
} from "./mailLayout.ts";

export const SITE = "https://gruenderx.de";

/** Version des Einwilligungstexts im E-Mail-Tor — bei jeder Textänderung hochzählen. */
export const EINWILLIGUNG_VERSION = "2026-10-25";
export const EINWILLIGUNG_TEXT =
  "Ja, schickt mir in den nächsten 10 Tagen bis zu 4 E-Mails mit Tipps zu diesem Thema und zu GründerX " +
  "(mit Messung von Öffnungen und Klicks). Abmelden geht jederzeit mit einem Klick.";

export type Strecke = "creator" | "tiktok" | "gruendung" | "ecommerce";

/** Welches Gratis-Tool welche Strecke auslöst. Unbekannte Slugs werden abgelehnt. */
export const TOOL_STRECKE: Record<string, { strecke: Strecke; name: string }> = {
  "influencer-steuer-check": { strecke: "creator", name: "Influencer-Steuer-Check" },
  "pr-paket-rechner": { strecke: "creator", name: "PR-Paket-Rechner" },
  "tiktok-shop-checkliste": { strecke: "tiktok", name: "TikTok-Shop-Checkliste" },
  "businessplan-erstellen": { strecke: "gruendung", name: "Businessplan-Generator" },
  "gruendungskosten-rechner": { strecke: "gruendung", name: "Gründungskosten-Rechner" },
  "rechtsform-finden": { strecke: "gruendung", name: "Rechtsform-Finder" },
  "weee-check": { strecke: "ecommerce", name: "WEEE-Check" },
  "brand-check": { strecke: "ecommerce", name: "Brand-Check" },
  "lucid-wizard": { strecke: "ecommerce", name: "LUCID-Wizard" },
  "amazon-marken-freischaltung-widerspruch-generator": { strecke: "ecommerce", name: "Marken-Freischaltungs-Generator" },
  "amazon-transparency-seriennummer-widerspruch-generator": { strecke: "ecommerce", name: "Transparency-Generator" },
};

/** Stufen: ab wie vielen Stunden nach der Bestätigung fällig. */
export const STUFEN = [
  { nr: 1, ab: 0, spalte: "stufe1_at" },
  { nr: 2, ab: 48, spalte: "stufe2_at" },
  { nr: 3, ab: 120, spalte: "stufe3_at" },
  { nr: 4, ab: 216, spalte: "stufe4_at" },
] as const;

/** Älter als das (Stunden nach Bestätigung) → Strecke abgelaufen, nichts nachholen. */
export const MAX_STUNDEN = 24 * 21;

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
export const normalisiere = (email: string) => email.trim().toLowerCase();

export function tippsSecret(): string | undefined {
  return Deno.env.get("TIPPS_SECRET") || Deno.env.get("UNSUBSCRIBE_SECRET") || undefined;
}

/** HMAC-SHA256 über "tipps|<adresse>" — eigenes Präfix, damit der Link weder abmeldet noch Vorlagen freischaltet. */
export async function signiereTipps(email: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`tipps|${normalisiere(email)}`));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function tippsSignaturGueltig(email: string, sig: string, secret: string): Promise<boolean> {
  if (!/^[0-9a-f]{64}$/.test(sig)) return false;
  return sameSig(sig, await signiereTipps(email, secret));
}

export function bestaetigungsLink(functionsUrl: string, email: string, slug: string, sig: string): string {
  return `${functionsUrl.replace(/\/+$/, "")}/tipps-bestaetigen` +
    `?e=${encodeURIComponent(normalisiere(email))}&t=${encodeURIComponent(slug)}&s=${sig}`;
}

// -------------------------------------------------------------------
// Bestätigungsmail (Dienstmail, keine Werbung, kein Abmeldelink nötig)
// -------------------------------------------------------------------
export function buildTippsBestaetigung(o: { toolName: string; link: string }): Built {
  const blocks = [
    aufmacher("Bitte kurz bestätigen", "Dann schicken wir dir die Tipps."),
    paragraph(
      `Du hast bei „<b>${esc(o.toolName)}</b>“ auf gruenderx.de angekreuzt, dass du Tipps per E-Mail möchtest. ` +
      "Mit einem Klick bestätigst du deine Adresse. Danach bekommst du in den nächsten 10 Tagen höchstens vier Mails – " +
      "jede mit einem Abmeldelink.",
    ),
    button(o.link, "Ja, Tipps bekommen"),
    paragraph(
      "<b>Nicht du?</b> Dann hat jemand deine Adresse eingegeben. Ignoriere diese Mail – ohne Klick bekommst du nichts, " +
      "und wir löschen die Adresse nach 30 Tagen.",
    ),
  ];
  const grund = "Du bekommst diese Mail, weil auf gruenderx.de für deine Adresse Tipps angefordert wurden. Ohne Klick passiert nichts.";
  return {
    subject: "Bitte bestätigen: deine Tipps von GründerX",
    text: plain({
      greeting: "Hallo,",
      lines: [
        `du hast bei „${o.toolName}“ auf gruenderx.de angekreuzt, dass du Tipps per E-Mail möchtest.`,
        "Mit einem Klick bestätigst du deine Adresse. Danach bekommst du in den nächsten 10 Tagen",
        "höchstens vier Mails, jede mit einem Abmeldelink.",
        "",
        "Nicht du? Dann ignoriere diese Mail. Ohne Klick bekommst du nichts,",
        "und wir löschen die Adresse nach 30 Tagen.",
      ],
      cta: ["Ja, Tipps bekommen", o.link],
      reason: grund,
    }),
    html: renderMail({ preheader: "Ein Klick, dann kommen deine Tipps.", blocks, footerReason: grund }),
  };
}

// -------------------------------------------------------------------
// Strecken-Mails
// -------------------------------------------------------------------
interface MailEntwurf {
  betreff: string;
  vorschau: string;
  titel: string;
  unter: string;
  absaetze: string[];
  punkte?: string[];
  knopf: [string, string];
  zweitlink?: [string, string];
}

const ABO_ABSATZ =
  "GründerX kostet ab 64,99 € im Monat inkl. USt. und ist jederzeit zum Ende der Abrechnungsperiode kündbar. " +
  "GründerX ersetzt keine Steuerberatung im Einzelfall – Felix führt dich durch Formulare, Regeln und Fristen.";

// Belege creator: Finanzamt Hessen, Leitfaden Influencer (Juni 2026); § 19 UStG; § 11 GewStG.
// Belege tiktok: TikTok Seller University (Registrierungswege, gelesen 25.10.2026); PStTG § 4 Abs. 5;
//   ZSVR (LUCID); ElektroG § 6.
// Belege gruendung: § 138 Abs. 4 AO; § 5a GmbHG; § 19 UStG.
// Belege ecommerce: ZSVR; ElektroG § 6; § 3c UStG (10.000 €); DPMA.
export const STRECKEN: Record<Strecke, [MailEntwurf, MailEntwurf, MailEntwurf, MailEntwurf]> = {
  creator: [
    {
      betreff: "Die 3 Fristen, die Creator am häufigsten verpassen",
      vorschau: "Eine davon läuft schon ab deinem ersten bezahlten Post.",
      titel: "Drei Fristen, die du kennen solltest",
      unter: "Kurz, damit du nichts verpasst.",
      absaetze: [
        "Schön, dass du dabei bist. Hier die drei Fristen, an denen Creator am häufigsten hängen bleiben:",
      ],
      punkte: [
        "<b>Ein Monat</b> nach dem Start: Fragebogen zur steuerlichen Erfassung über ELSTER – erst danach gibt es die Steuernummer.",
        "<b>Voranmeldungen</b>: Bist du kein Kleinunternehmer, meldest du die Umsatzsteuer monatlich oder vierteljährlich.",
        "<b>Einmal im Jahr</b>: Einkommensteuererklärung mit Anlage G und Anlage EÜR.",
      ],
      knopf: ["Ratgeber: Influencer-Steuern 2026", `${SITE}/ratgeber/influencer-steuern-2026`],
      zweitlink: ["Alles für Creator auf einen Blick", `${SITE}/influencer`],
    },
    {
      betreff: "Das PR-Paket auf deinem Tisch ist eine Einnahme",
      vorschau: "Was zählt, was nicht – und was du aufheben solltest.",
      titel: "PR-Pakete: was zählt",
      unter: "Nach dem Leitfaden der Finanzverwaltung.",
      absaetze: [
        "Darfst du ein Produkt nach der Werbung behalten, zählt es als Betriebseinnahme – mit dem üblichen Endpreis " +
        "abzüglich üblicher Rabatte. Musst du es zurückschicken, ist es keine Einnahme. Auch eine Gratis-Hotelnacht gegen " +
        "Werbung zählt mit ihrem regulären Wert.",
        "Heb für jedes Paket auf: die Kooperations-Mail, einen Screenshot des üblichen Preises, den Link zum Post – und bei " +
        "Rücksendung den Versandbeleg.",
      ],
      knopf: ["Werte mit dem PR-Paket-Rechner erfassen", `${SITE}/pr-paket-rechner`],
      zweitlink: ["Ratgeber: PR-Pakete versteuern", `${SITE}/ratgeber/pr-pakete-versteuern`],
    },
    {
      betreff: "Kleinunternehmer – ja oder nein?",
      vorschau: "Im ersten Jahr zählt genau eine Grenze.",
      titel: "Kleinunternehmer oder nicht?",
      unter: "Die Entscheidung triffst du im Fragebogen.",
      absaetze: [
        "Kleinunternehmer bist du, wenn dein Umsatz im Vorjahr höchstens 25.000 € betrug und im laufenden Jahr 100.000 € " +
        "nicht übersteigt. Im ersten Jahr zählt die Grenze von 25.000 €.",
        "Der Vorteil: keine Umsatzsteuer auf deinen Rechnungen, keine Voranmeldungen. Der Haken: Du bekommst die " +
        "Umsatzsteuer auf Kamera, Licht und Laptop nicht zurück. Arbeitest du vor allem für Marken und kaufst viel Technik, " +
        "kann sich der Verzicht lohnen.",
        "Und zur Gewerbesteuer: Die fällt erst an, wenn dein Gewerbeertrag über 24.500 € liegt.",
      ],
      knopf: ["Ratgeber: Kleinunternehmer 2026", `${SITE}/ratgeber/kleinunternehmer-2026`],
      zweitlink: ["UGC-Creator: Gewerbe & erste Rechnung", `${SITE}/ratgeber/ugc-creator-gewerbe-rechnung`],
    },
    {
      betreff: "Lass Felix den Papierkram machen",
      vorschau: "Gewerbe, Fragebogen, Rechnungen, Fristen – Schritt für Schritt.",
      titel: "Du machst Content. Felix macht das Finanzamt.",
      unter: "Das war die letzte Mail dieser Reihe.",
      absaetze: [
        "Mit GründerX gehst du die Pflichten in der richtigen Reihenfolge durch – mit dem KI-Co-Piloten Felix an deiner Seite:",
      ],
      punkte: [
        "Gewerbeanmeldung-Wizard: Tätigkeit richtig beschreiben",
        "Fragebogen-Wizard: zur Steuernummer ohne ELSTER-Fehler",
        "Rechnungs-Generator: Rechnungen an Marken mit allen Pflichtangaben",
        "Steuerkalender: alle Fristen auf einen Blick",
      ],
      knopf: ["Plan wählen & starten", `${SITE}/preise`],
      zweitlink: ["Was GründerX für Creator kann", `${SITE}/influencer`],
    },
  ],
  tiktok: [
    {
      betreff: "Der Klick bei TikTok, den viele falsch setzen",
      vorschau: "„Einzelunternehmer“ heißt dort etwas anderes, als du denkst.",
      titel: "Der richtige Registrierungsweg",
      unter: "Bevor du im Seller Center auf „weiter“ klickst.",
      absaetze: [
        "Bei TikTok bedeutet „Einzelunternehmer“: im Handelsregister eingetragen (e.K.) – dafür verlangt TikTok in " +
        "Deutschland die USt-IdNr. Hast du ein normales Gewerbe ohne Handelsregister, ist „gewerbliche:r Verkäufer:in“ " +
        "der richtige Weg: mit persönlicher Steuernummer, Geschäftsadresse und Ausweis.",
        "Als Ausweis akzeptiert TikTok Reisepass, Personalausweis oder einen unbefristeten Aufenthaltstitel – keinen Führerschein.",
      ],
      knopf: ["Ratgeber: TikTok-Shop-Verkäufer werden", `${SITE}/ratgeber/tiktok-shop-verkaeufer-werden`],
      zweitlink: ["Alles zum TikTok Shop", `${SITE}/tiktok-shop`],
    },
    {
      betreff: "Vor dem ersten Paket: LUCID",
      vorschau: "Und bei Elektrogeräten noch eine zweite Nummer.",
      titel: "Vor dem ersten Versand",
      unter: "Zwei Registrierungen, die nicht warten können.",
      absaetze: [
        "Wer in Deutschland verpackte Waren an Privatkunden verschickt, muss im Verpackungsregister LUCID registriert sein. " +
        "Für viele Verpackungen brauchst du zusätzlich eine Systembeteiligung.",
        "Verkaufst du Elektrogeräte, musst du dich vor dem ersten Angebot bei der stiftung ear registrieren. Ohne diese " +
        "Registrierung dürfen Online-Marktplätze das Angebot nicht ermöglichen.",
      ],
      knopf: ["Ratgeber: LUCID anmelden", `${SITE}/ratgeber/lucid-verpackungsregister-anmelden`],
      zweitlink: ["Kostenlos prüfen: WEEE-Check", `${SITE}/tools/weee-check/gratis`],
    },
    {
      betreff: "Ab 30 Verkäufen weiß es das Finanzamt",
      vorschau: "Was die Plattform meldet – und wie du Provisionen buchst.",
      titel: "Was TikTok meldet",
      unter: "Und wie du Verkäufe und Provisionen sauber trennst.",
      absaetze: [
        "Plattformen melden ihre Verkäufer an das Bundeszentralamt für Steuern. Ausgenommen ist nur, wer im Jahr weniger als " +
        "30 Verkäufe und zusammen weniger als 2.000 € erzielt.",
        "In der Buchhaltung trennst du: Umsatz als Erlös, TikTok-Gebühren und Provisionen an Creator als Ausgaben. Verdienst " +
        "du selbst als Affiliate, sind deine Provisionen Betriebseinnahmen – auch kleine Beträge.",
      ],
      knopf: ["Ratgeber: TikTok-Shop-Affiliate & Steuern", `${SITE}/ratgeber/tiktok-shop-affiliate-steuern`],
    },
    {
      betreff: "Dein TikTok-Shop-Setup mit Felix",
      vorschau: "Alle Schritte bis zum ersten Verkauf – in der richtigen Reihenfolge.",
      titel: "Setup fertig machen – mit Felix",
      unter: "Das war die letzte Mail dieser Reihe.",
      absaetze: ["Mit GründerX gehst du dein TikTok-Shop-Setup Schritt für Schritt durch:"],
      punkte: [
        "Guide „TikTok Shop starten“: Gewerbe, Fragebogen, Registrierungsweg, Produktpflichten",
        "LUCID-Wizard und WEEE-Check",
        "Schwellen-Check: Kleinunternehmer- und EU-Lieferschwelle im Blick",
        "Shop-Profit-Rechner: was nach Gebühren und Provision übrig bleibt",
      ],
      knopf: ["Plan wählen & starten", `${SITE}/preise`],
      zweitlink: ["Was GründerX für TikTok-Shop-Verkäufer kann", `${SITE}/tiktok-shop`],
    },
  ],
  gruendung: [
    {
      betreff: "Die Reihenfolge, die dir Wochen spart",
      vorschau: "Gewerbe, Fragebogen, Konto – in dieser Reihenfolge.",
      titel: "Die richtige Reihenfolge",
      unter: "Damit nichts doppelt gemacht werden muss.",
      absaetze: ["Viele verlieren beim Start Zeit, weil die Schritte in der falschen Reihenfolge laufen. So geht es glatt:"],
      punkte: [
        "Rechtsform festlegen",
        "Gewerbe anmelden (bzw. als Freiberufler direkt zum Finanzamt)",
        "Fragebogen zur steuerlichen Erfassung – innerhalb eines Monats nach Beginn",
        "Geschäftskonto eröffnen",
        "Kleinunternehmer ja oder nein entscheiden",
      ],
      knopf: ["Ratgeber: Einzelunternehmen gründen", `${SITE}/ratgeber/einzelunternehmen-gruenden-gewerbe-freiberufler`],
    },
    {
      betreff: "UG mit 1 € Stammkapital – der Haken",
      vorschau: "Warum die Mini-GmbH Rücklagen bilden muss.",
      titel: "UG oder GmbH?",
      unter: "Was 1 € Stammkapital wirklich bedeutet.",
      absaetze: [
        "Eine UG (haftungsbeschränkt) kannst du schon mit 1 € Stammkapital gründen. Dafür muss sie ein Viertel ihres " +
        "Jahresüberschusses als Rücklage behalten, bis das Stammkapital auf 25.000 € angehoben ist.",
        "Die GmbH braucht 25.000 € Stammkapital, davon mindestens 12.500 € vor der Eintragung. Beide brauchen Notar und " +
        "Handelsregister – das Einzelunternehmen nicht.",
      ],
      knopf: ["Ratgeber: UG oder GmbH?", `${SITE}/ratgeber/ug-oder-gmbh`],
    },
    {
      betreff: "Geld vom Staat für deine Gründung?",
      vorschau: "Ein Überblick über die wichtigsten Förderwege.",
      titel: "Förderung prüfen",
      unter: "Bevor du startest – manche Anträge gehen nur vorher.",
      absaetze: [
        "Für Gründer gibt es Zuschüsse, Stipendien und Förderkredite – etwa den Gründungszuschuss für Arbeitslose. Wichtig: " +
        "Viele Programme musst du beantragen, bevor du loslegst.",
      ],
      knopf: ["Ratgeber: Förderung für Gründer 2026", `${SITE}/ratgeber/foerderung-gruender-2026`],
    },
    {
      betreff: "Deine Gründung mit Felix",
      vorschau: "Rechtsform, Fragebogen, Fristen – Schritt für Schritt.",
      titel: "Gründen mit Felix",
      unter: "Das war die letzte Mail dieser Reihe.",
      absaetze: ["Mit GründerX gehst du deine Gründung Schritt für Schritt durch:"],
      punkte: [
        "Rechtsform-Wizard mit Empfehlung",
        "Gewerbeanmeldung- und Fragebogen-Wizard",
        "Gründungszuschuss-Check und Förder-Datenbank",
        "Steuerkalender mit deinen Fristen",
      ],
      knopf: ["Plan wählen & starten", `${SITE}/preise`],
    },
  ],
  ecommerce: [
    {
      betreff: "Drei Registrierungen vor dem ersten Verkauf",
      vorschau: "Ohne sie werden Angebote gesperrt.",
      titel: "Pflicht vor dem ersten Verkauf",
      unter: "Je nach Produkt.",
      absaetze: ["Bevor dein erstes Produkt online geht, prüf diese drei Punkte:"],
      punkte: [
        "<b>LUCID</b>: Wer verpackte Waren an Privatkunden verschickt, muss im Verpackungsregister registriert sein.",
        "<b>WEEE</b>: Elektrogeräte erst nach Registrierung bei der stiftung ear anbieten.",
        "<b>Produktsicherheit (GPSR)</b>: Hersteller bzw. verantwortliche Person in der EU und Sicherheitsinformationen im Angebot.",
      ],
      knopf: ["Ratgeber: LUCID anmelden", `${SITE}/ratgeber/lucid-verpackungsregister-anmelden`],
      zweitlink: ["Kostenlos prüfen: WEEE-Check", `${SITE}/tools/weee-check/gratis`],
    },
    {
      betreff: "Verkaufst du ins EU-Ausland? Die 10.000-€-Grenze",
      vorschau: "Ab da gilt die Umsatzsteuer des Ziellands.",
      titel: "OSS: ab 10.000 €",
      unter: "Für Verkäufe an Privatkunden in anderen EU-Ländern.",
      absaetze: [
        "Überschreiten deine Verkäufe an Privatkunden im EU-Ausland zusammen 10.000 € im Jahr, gilt die Umsatzsteuer des " +
        "jeweiligen Ziellands. Statt dich in jedem Land zu registrieren, meldest du über das OSS-Verfahren beim Bundeszentralamt für Steuern.",
      ],
      knopf: ["Ratgeber: OSS-Anmeldung", `${SITE}/ratgeber/oss-anmeldung`],
    },
    {
      betreff: "Deine Marke gehört dir – erst nach der Anmeldung",
      vorschau: "Warum du nicht warten solltest.",
      titel: "Marke schützen",
      unter: "Bevor jemand anderes es tut.",
      absaetze: [
        "Ein Markenname ohne Eintragung ist angreifbar – und für Brand Registry auf Marktplätzen brauchst du meist eine " +
        "eingetragene Marke. Prüf vorher, ob Name und Domain frei sind.",
      ],
      knopf: ["Ratgeber: Marke anmelden beim DPMA", `${SITE}/ratgeber/marke-anmelden-dpma`],
      zweitlink: ["Kostenlos prüfen: Brand-Check", `${SITE}/tools/brand-check/gratis`],
    },
    {
      betreff: "Dein Shop-Setup mit Felix",
      vorschau: "Pflichten, Steuern und Marge – an einem Ort.",
      titel: "Setup fertig machen – mit Felix",
      unter: "Das war die letzte Mail dieser Reihe.",
      absaetze: ["Mit GründerX gehst du dein Händler-Setup Schritt für Schritt durch:"],
      punkte: [
        "LUCID-Wizard, WEEE-Check und Brand-Check unbegrenzt",
        "Guides für Amazon FBA, Shopify und TikTok Shop",
        "Schwellen-Check und USt-Rechner",
        "Shop-Profit-Rechner für deine Marge",
      ],
      knopf: ["Plan wählen & starten", `${SITE}/preise`],
    },
  ],
};

/** Baut Stufe `nr` (1–4) der Strecke als fertige Mail mit Abmeldelink. */
export function buildTippsMail(o: { strecke: Strecke; nr: number; toolName: string; unsubscribeUrl: string }): Built {
  const m = STRECKEN[o.strecke][o.nr - 1];
  if (!m) throw new Error(`Stufe ${o.nr} fehlt in Strecke ${o.strecke}`);
  const letzte = o.nr === 4;
  const grund =
    `Du bekommst diese Mail, weil du bei „${o.toolName}“ auf gruenderx.de Tipps angefordert und bestätigt hast. ` +
    `Mail ${o.nr} von 4.`;
  const blocks = [
    aufmacher(m.titel, m.unter),
    ...m.absaetze.map((a) => paragraph(a)),
    ...(m.punkte ? [bullets(m.punkte)] : []),
    ...(letzte ? [paragraph(ABO_ABSATZ)] : []),
    button(m.knopf[1], m.knopf[0]),
    ...(m.zweitlink ? [secondary(m.zweitlink[1], m.zweitlink[0])] : []),
  ];
  const ohneHtml = (s: string) => s.replace(/<[^>]+>/g, "");
  return {
    subject: m.betreff,
    text: plain({
      greeting: "Hallo,",
      lines: [
        ...m.absaetze.flatMap((a, i) => (i ? ["", ohneHtml(a)] : [ohneHtml(a)])),
        ...(m.punkte ? ["", ...m.punkte.map((p) => `- ${ohneHtml(p)}`)] : []),
        ...(letzte ? ["", ABO_ABSATZ] : []),
        ...(m.zweitlink ? ["", `${m.zweitlink[0]}: ${m.zweitlink[1]}`] : []),
      ],
      cta: [m.knopf[0], m.knopf[1]],
      unsubscribeUrl: o.unsubscribeUrl,
      reason: grund,
    }),
    html: renderMail({ preheader: m.vorschau, blocks, footerReason: grund, unsubscribeUrl: o.unsubscribeUrl }),
  };
}
