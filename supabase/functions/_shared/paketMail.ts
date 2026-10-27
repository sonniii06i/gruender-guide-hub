// ===================================================================
// paketMail.ts — Transaktionsmails rund ums Gründungspaket.
//
// 1) Kaufbestätigung: zugleich die Bestätigung nach § 312f BGB auf einem
//    dauerhaften Datenträger (Vertragsinhalt + die beiden Erklärungen zum
//    vorzeitigen Erlöschen des Widerrufsrechts, § 356 Abs. 6 Nr. 2 lit. d
//    BGB) und der Download-Link.
// 2) Eingangsbestätigung der Widerrufsfunktion (§ 356a Abs. 4 BGB):
//    Inhalt der Erklärung sowie Datum und Uhrzeit des Eingangs.
//
// Beides sind Dienstmails: kein Abmeldelink, keine Werbung.
// ===================================================================

import { aufmacher, button, esc, paragraph, plain, priceRows, renderMail, type Built } from "./mailLayout.ts";
import {
  KENNTNIS_TEXT, PAKET_INHALT_KURZ, PAKET_NAME, PAKET_UST_SATZ, ZUSTIMMUNG_TEXT, preisText,
} from "./gruendungspaketTexte.ts";
import { WERBE_HINWEIS } from "./werbeHinweis.ts";

const zeitBerlin = (d: Date) =>
  d.toLocaleString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "long", timeStyle: "short" }) + " Uhr";

export function buildPaketBestaetigung(o: {
  link: string;
  gueltigBis: Date;
  danachUrl: string;
  betragCent: number;
  bestellnummer: string;
  zustimmungAm: Date;
}): Built {
  const netto = Math.round(o.betragCent / (1 + PAKET_UST_SATZ / 100));
  const ust = o.betragCent - netto;
  const blocks = [
    aufmacher("Dein Gründungspaket ist bereit", `${PAKET_NAME} — jetzt herunterladen.`),
    button(o.link, "Gründungspaket herunterladen (ZIP)"),
    paragraph(
      `Der Link gilt bis ${esc(zeitBerlin(o.gueltigBis))}. Danach holst du dir jederzeit einen neuen über ` +
      `<a href="${o.danachUrl}">diese Seite</a> (90 Tage ab Kauf).`,
    ),
    priceRows([
      ["Bestellnummer", esc(o.bestellnummer)],
      ["Produkt", esc(PAKET_NAME) + " (digitaler Inhalt, Download)"],
      ["Netto", preisText(netto)],
      [`USt ${PAKET_UST_SATZ} %`, preisText(ust)],
    ], ["Bezahlt", preisText(o.betragCent)]),
    paragraph("<b>Inhalt</b><br>" + PAKET_INHALT_KURZ.map((t) => "• " + esc(t)).join("<br>")),
    paragraph(
      "<b>Bestätigung zu deinem Widerrufsrecht</b><br>" +
      `Am ${esc(zeitBerlin(o.zustimmungAm))} hast du vor dem Kauf erklärt:<br>` +
      `„${esc(ZUSTIMMUNG_TEXT)}“<br>„${esc(KENNTNIS_TEXT)}“<br>` +
      "Mit der Bereitstellung des Downloads ist dein Widerrufsrecht deshalb erloschen. " +
      "Die Rechnung schickt dir Stripe in einer eigenen Mail.",
    ),
    paragraph(
      "Das Paket ist eine Arbeitshilfe und keine Steuer- oder Rechtsberatung. Fragen oder Probleme beim Download? " +
      "Antworte einfach auf diese Mail.",
    ),
    paragraph(esc(WERBE_HINWEIS)),
  ];
  return {
    subject: `Dein ${PAKET_NAME} – Download und Bestätigung`,
    text: plain({
      greeting: "Hallo,",
      lines: [
        `danke für deinen Kauf. Hier ist dein ${PAKET_NAME}.`,
        `Download (gültig bis ${zeitBerlin(o.gueltigBis)}): ${o.link}`,
        `Neuer Link jederzeit (90 Tage ab Kauf): ${o.danachUrl}`,
        "",
        `Bestellnummer: ${o.bestellnummer}`,
        `Produkt: ${PAKET_NAME} (digitaler Inhalt, Download)`,
        `Netto ${preisText(netto)} + USt ${PAKET_UST_SATZ} % ${preisText(ust)} = bezahlt ${preisText(o.betragCent)}`,
        "",
        "Inhalt:",
        ...PAKET_INHALT_KURZ.map((t) => "- " + t),
        "",
        "Bestätigung zu deinem Widerrufsrecht:",
        `Am ${zeitBerlin(o.zustimmungAm)} hast du vor dem Kauf erklärt:`,
        `„${ZUSTIMMUNG_TEXT}“`,
        `„${KENNTNIS_TEXT}“`,
        "Mit der Bereitstellung des Downloads ist dein Widerrufsrecht deshalb erloschen.",
        "Die Rechnung schickt dir Stripe in einer eigenen Mail.",
        "",
        "Arbeitshilfe, keine Steuer- oder Rechtsberatung.",
        "",
        WERBE_HINWEIS,
      ],
      reason: "Du bekommst diese Mail, weil du auf gruenderx.de das Gründungspaket gekauft hast.",
    }),
    html: renderMail({
      preheader: "Download-Link und Bestätigung deines Kaufs.",
      blocks,
      footerReason: "Du bekommst diese Mail, weil du auf gruenderx.de das Gründungspaket gekauft hast.",
    }),
  };
}

/**
 * Eingangsbestätigung der Widerrufsfunktion. An den Verbraucher geht KEIN
 * Freitext (Security-Review 26.10.: unbestätigte Adresse) – nur Vertragsart
 * aus fester Auswahl, geprüfte Bestellnummer/Datum und der Zeitpunkt. Name
 * und Adresse stehen nur in der internen Fassung (intern gesetzt).
 */
export function buildWiderrufEingang(o: {
  vertrag: string; bestellnummer?: string; kaufdatum?: string; eingang: Date;
  intern?: { name: string; email: string };
}): Built {
  const zeit = zeitBerlin(o.eingang);
  const felder: Array<[string, string]> = [
    ["Eingang", zeit],
    ["Vertrag", o.vertrag],
    ...(o.bestellnummer ? [["Bestellnummer", o.bestellnummer] as [string, string]] : []),
    ...(o.kaufdatum ? [["Kaufdatum", o.kaufdatum] as [string, string]] : []),
    ...(o.intern ? [["Name", o.intern.name], ["E-Mail", o.intern.email]] as Array<[string, string]> : []),
  ];
  const erklaerung = "Hiermit widerrufe ich den oben genannten Vertrag.";
  const weiter = "Wir prüfen den Widerruf und melden uns. Ist ein Widerrufsrecht schon erloschen (z. B. nach Download eines " +
    "digitalen Inhalts mit deiner Zustimmung), sagen wir dir das mit Begründung.";
  const grund = o.intern
    ? "Interne Kopie: Eingang über gruenderx.de/vertrag-widerrufen."
    : "Du bekommst diese Mail, weil auf gruenderx.de/vertrag-widerrufen ein Widerruf mit deiner Adresse abgeschickt wurde. " +
      "Warst du das nicht? Dann ignoriere sie einfach.";
  return {
    subject: o.intern ? `Widerruf eingegangen (${o.vertrag})` : "Eingangsbestätigung deines Widerrufs",
    text: plain({
      greeting: "Hallo,",
      lines: ["wir haben deinen Widerruf erhalten. Das ist die Eingangsbestätigung.", "",
        ...felder.map(([k, v]) => `${k}: ${v}`), `Erklärung: „${erklaerung}“`, "", weiter],
      reason: grund,
    }),
    html: renderMail({
      preheader: `Widerruf eingegangen am ${zeit}.`,
      blocks: [
        aufmacher("Dein Widerruf ist eingegangen", zeit),
        priceRows(felder.map(([k, v]) => [esc(k), esc(v)] as [string, string])),
        paragraph(`Erklärung: „${esc(erklaerung)}“`),
        paragraph(esc(weiter)),
      ],
      footerReason: grund,
    }),
  };
}
