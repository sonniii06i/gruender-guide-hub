import { BadgeCheck } from "lucide-react";
import { type ToolConfig, type ToolData, s, DISCLAIMER } from "./types";

// Widerspruch gegen abgelehnte Marken-/Kategorie-Freischaltung (Ungating) auf Amazon.
// Deckt die häufigsten Ablehnungsgründe der Brand-/Kategorie-Approval-Teams ab.

const REASON_LABEL: Record<string, string> = {
  menge: "Rechnung weist zu geringe Stückzahl auf / es wird eine höhere Menge verlangt",
  modifiziert: "Rechnung wurde als „modifiziert“ bzw. bearbeitet eingestuft",
  lieferant: "Lieferant gilt nicht als autorisierter Großhändler / Hersteller",
  alt: "Rechnung ist zu alt (außerhalb des akzeptierten Zeitraums)",
  unvollstaendig: "Pflichtangaben auf der Rechnung fehlen (Adresse, Kontakt, Artikel)",
  unleserlich: "Dokument ist angeblich unleserlich oder von schlechter Qualität",
  mismatch: "Angaben stimmen nicht mit den Verkäuferkonto-Daten überein",
  sonstiges: "Sonstiger Ablehnungsgrund",
};

// Mehrzeilige Eingabe → Aufzählungspunkte.
function bullets(text: string): string[] {
  return text
    .split(/\n+/)
    .map((l) => l.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean)
    .map((l) => `   • ${l}`);
}

// Liefert die reason-spezifische Argumentation als Absatz-Liste.
function reasonArgument(data: ToolData): string[] {
  const reason = s(data, "reason", "menge");
  const supplier = s(data, "supplier");
  const invoiceQty = s(data, "invoiceQty");
  const requestedQty = s(data, "requestedQty");
  const invoiceDate = s(data, "invoiceDate");

  const L: string[] = [];

  if (reason === "menge") {
    L.push(
      "Die eingereichte(n) Rechnung(en) erfüllt(en) zum Zeitpunkt der Antragstellung die zu diesem Zeitpunkt " +
        "kommunizierte Mindestabnahmemenge. Die Ablehnung stützt sich nun auf eine höhere Stückzahl, " +
        "die in der ursprünglichen Aufforderung nicht genannt war."
    );
    if (invoiceQty)
      L.push(
        `Unsere Rechnung weist eine Abnahmemenge von ${invoiceQty} Einheiten aus.` +
          (requestedQty ? ` Aktuell wird eine Menge von ${requestedQty} Einheiten gefordert.` : "")
      );
    L.push(
      "Wir bitten höflich um Bestätigung der konkret geforderten Mindestmenge sowie des maßgeblichen " +
        "Zeitraums. Gern reichen wir umgehend ergänzende Rechnungen desselben Lieferanten nach, um die " +
        "geforderte Gesamtmenge zu erreichen. Wir bitten darum, unseren Antrag nach Eingang der Ergänzung " +
        "erneut zu prüfen, ohne ihn vollständig abzulehnen."
    );
  } else if (reason === "modifiziert") {
    L.push(
      "Die eingereichte Rechnung ist authentisch und in keiner Weise inhaltlich verändert worden. " +
        "Es handelt sich um das Originaldokument unseres Lieferanten."
    );
    L.push(
      "Mögliche Ursache für die Einstufung als „modifiziert“ ist, dass die Rechnung als digital aus dem " +
        "Lieferantenportal exportierte bzw. zusammengeführte PDF-Datei vorliegt. Eine inhaltliche Manipulation " +
        "hat zu keinem Zeitpunkt stattgefunden."
    );
    L.push(
      "Zur Verifizierung bieten wir an: Übermittlung der unveränderten Originaldatei direkt aus dem " +
        "Lieferantensystem, Nennung der Kontaktdaten des Lieferanten zur direkten Bestätigung gegenüber Amazon " +
        "sowie Vorlage des zugehörigen Zahlungsbelegs (Überweisung/Kontoauszug)."
    );
  } else if (reason === "lieferant") {
    L.push(
      "Unser Lieferant" + (supplier ? ` (${supplier})` : "") + " ist ein eingetragenes, umsatzsteuerlich " +
        "registriertes Großhandels-/Vertriebsunternehmen und damit eine zulässige Bezugsquelle."
    );
    L.push(
      "Zur Bestätigung der Autorisierung können wir folgende Nachweise vorlegen: Umsatzsteuer-Identifikationsnummer " +
        "und Handelsregister-/Gewerbedaten des Lieferanten, Geschäftsadresse und Kontakt zur unmittelbaren " +
        "Verifizierung sowie ggf. eine Autorisierungs- bzw. Händlerbestätigung."
    );
    L.push(
      "Sollte für die gewünschte Marke ausschließlich der Bezug direkt vom Markeninhaber akzeptiert werden, " +
        "bitten wir um einen ausdrücklichen Hinweis darauf, damit wir eine entsprechende Bezugsquelle nachweisen können."
    );
  } else if (reason === "alt") {
    L.push(
      "Die eingereichte Rechnung lag unseres Erachtens innerhalb des akzeptierten Zeitraums." +
        (invoiceDate ? ` Das Rechnungsdatum ist der ${invoiceDate}.` : "")
    );
    L.push(
      "Sofern der maßgebliche Zeitraum (z. B. 90 oder 180 Tage) überschritten ist, reichen wir umgehend eine " +
        "aktuelle Rechnung desselben Lieferanten nach. Wir bitten um Bestätigung des erforderlichen Zeitfensters."
    );
  } else if (reason === "unvollstaendig") {
    L.push(
      "Wir reichen die Rechnung gern in vollständiger Form erneut ein. Bitte teilen Sie uns mit, welche " +
        "konkrete Pflichtangabe als fehlend bewertet wurde (z. B. vollständige Verkäuferadresse, unsere " +
        "Geschäftsadresse, Kontaktdaten des Lieferanten oder Artikelbezeichnung/Menge)."
    );
    L.push(
      "Unsere auf der Rechnung hinterlegte Geschäftsadresse stimmt mit den im Verkäuferkonto hinterlegten " +
        "Daten überein. Eventuelle Abweichungen korrigieren wir umgehend."
    );
  } else if (reason === "unleserlich") {
    L.push(
      "Wir reichen die Rechnung gern in höherer Auflösung als ungeschützte, klar lesbare PDF-Datei erneut ein " +
        "(keine Screenshots, kein Passwortschutz, vollständige Seiten ohne Beschnitt)."
    );
    L.push(
      "Bitte bestätigen Sie das bevorzugte Format, damit die erneute Einreichung sofort akzeptiert werden kann."
    );
  } else if (reason === "mismatch") {
    L.push(
      "Die Angaben auf der Rechnung beziehen sich auf dasselbe Unternehmen, das dieses Verkäuferkonto betreibt. " +
        "Etwaige Abweichungen (z. B. abweichende Schreibweise, alte Adresse) lassen sich eindeutig auflösen."
    );
    L.push(
      "Bitte teilen Sie uns mit, welche konkrete Angabe als abweichend bewertet wurde. Wir gleichen die Daten " +
        "umgehend mit den Konto- und Rechnungsangaben ab und reichen ggf. eine korrigierte Rechnung nach."
    );
  } else {
    L.push(
      "Wir bitten höflich um eine konkrete Begründung, welche Anforderung als nicht erfüllt bewertet wurde, " +
        "sowie um Nennung der genauen Unterlagen bzw. Angaben, die für eine Freischaltung erforderlich sind. " +
        "Wir stellen die geforderten Nachweise umgehend bereit."
    );
  }

  return L;
}

function generate(data: ToolData): string {
  const store = s(data, "store");
  const brand = s(data, "brand");
  const reason = s(data, "reason", "menge");
  const asins = s(data, "asins");
  const supplier = s(data, "supplier");
  const invoiceNumbers = s(data, "invoiceNumbers");
  const invoiceDate = s(data, "invoiceDate");
  const extra = s(data, "extra");

  const L: string[] = [];
  L.push("Widerspruch gegen die Ablehnung der Verkaufsfreischaltung (Ungating)");
  L.push("");
  if (store) L.push(`Verkäufer / Shop: ${store}`);
  if (brand) L.push(`Marke / Kategorie: ${brand}`);
  if (asins) L.push(`Betroffene ASIN(s): ${asins}`);
  L.push(`Ablehnungsgrund laut Amazon: ${REASON_LABEL[reason] || REASON_LABEL.sonstiges}`);
  if (supplier) L.push(`Lieferant: ${supplier}`);
  if (invoiceNumbers) L.push(`Rechnungsnummer(n): ${invoiceNumbers}`);
  if (invoiceDate) L.push(`Rechnungsdatum: ${invoiceDate}`);
  L.push("");

  L.push("Sehr geehrtes Amazon-Team,");
  L.push("");
  L.push(
    "wir beziehen uns auf die Ablehnung unseres Antrags auf Freischaltung zum Verkauf der oben genannten " +
      "Marke bzw. Kategorie. Nach sorgfältiger Prüfung möchten wir hierzu Stellung nehmen und legen gegen die " +
      "Ablehnung Widerspruch ein. Wir sind überzeugt, die geforderten Voraussetzungen zu erfüllen, und stellen " +
      "alle erforderlichen Nachweise umgehend bereit."
  );
  L.push("");

  L.push("1. Stellungnahme zum konkreten Ablehnungsgrund");
  reasonArgument(data).forEach((p) => {
    L.push(p);
    L.push("");
  });

  L.push("2. Vorliegende Nachweise");
  L.push("Folgende Unterlagen liegen vor und werden auf Anforderung umgehend (erneut) übermittelt:");
  L.push("   • Originalrechnung(en) des Lieferanten als vollständige, lesbare PDF-Datei");
  L.push("   • Zahlungsnachweis (Überweisungsbeleg / Kontoauszug) zur jeweiligen Rechnung");
  L.push("   • Kontakt- und Registrierungsdaten des Lieferanten zur direkten Verifizierung");
  if (extra) {
    bullets(extra).forEach((b) => L.push(b));
  }
  L.push("");

  L.push("3. Bitte");
  L.push(
    "Wir bitten höflich, die Ablehnung zu überprüfen und unseren Antrag erneut zu bewerten. Sollte eine " +
      "einzelne Angabe oder ein Dokument fehlen, bitten wir um einen konkreten Hinweis, damit wir die Unterlage " +
      "umgehend nachreichen können – idealerweise ohne erneute vollständige Ablehnung. Für Rückfragen und zur " +
      "direkten Verifizierung unseres Lieferanten stehen wir jederzeit zur Verfügung."
  );
  L.push("");
  L.push("Mit freundlichen Grüßen");
  L.push(store || "[Dein Name / Shop]");
  L.push("");
  L.push("");
  L.push(DISCLAIMER);

  return L.join("\n");
}

export const markenFreischaltungConfig: ToolConfig = {
  slug: "amazon-marken-freischaltung-widerspruch-generator",
  shortTitle: "Marken-Freischaltung",
  documentName: "Widerspruch Verkaufsfreischaltung",
  icon: BadgeCheck,
  accent: "from-amber-500 to-orange-600",
  badge: "Amazon-Ungating",
  heroTitle: "Amazon Marken-Freischaltung abgelehnt? Widerspruch-Generator",
  heroSubtitle:
    "Antrag auf Verkaufsfreischaltung (Ungating) abgelehnt – z. B. weil plötzlich eine höhere Stückzahl verlangt wird, die Rechnung als „modifiziert“ gilt oder der Lieferant nicht akzeptiert wird? Erstelle in Minuten einen sachlichen, überzeugenden Widerspruch. Kostenlos, nur ein kostenloses Konto nötig.",
  resultFilename: "amazon-marken-freischaltung-widerspruch",
  steps: [
    {
      title: "Konto, Marke & Ablehnungsgrund",
      subtitle: "Was wolltest du freischalten – und was steht in der Ablehnung?",
      fields: [
        { name: "store", label: "Shop- / Verkäufername", type: "text", placeholder: "z. B. MeinShop", colSpan: 1 },
        { name: "brand", label: "Marke / Kategorie", type: "text", placeholder: "z. B. Marke XY", colSpan: 1 },
        {
          name: "reason",
          label: "Ablehnungsgrund laut Amazon",
          type: "select",
          required: true,
          colSpan: 2,
          options: [
            { value: "menge", label: "Stückzahl zu gering / höhere Menge verlangt" },
            { value: "modifiziert", label: "Rechnung als „modifiziert“ eingestuft" },
            { value: "lieferant", label: "Lieferant nicht akzeptiert / nicht autorisiert" },
            { value: "alt", label: "Rechnung zu alt (außerhalb Zeitraum)" },
            { value: "unvollstaendig", label: "Pflichtangaben fehlen" },
            { value: "unleserlich", label: "Dokument unleserlich / schlechte Qualität" },
            { value: "mismatch", label: "Angaben stimmen nicht mit Konto überein" },
            { value: "sonstiges", label: "Sonstiges / unklar" },
          ],
        },
        { name: "asins", label: "Betroffene ASIN(s) (optional)", type: "text", placeholder: "z. B. B0XXXX, B0YYYY", colSpan: 2 },
      ],
    },
    {
      title: "Rechnungs- & Lieferantendaten",
      subtitle: "Diese Angaben machen den Widerspruch konkret und glaubwürdig.",
      fields: [
        { name: "supplier", label: "Lieferant / Großhändler", type: "text", placeholder: "z. B. Großhandel GmbH", colSpan: 2 },
        { name: "invoiceNumbers", label: "Rechnungsnummer(n) (optional)", type: "text", placeholder: "z. B. RE-2026-0042", colSpan: 1 },
        { name: "invoiceDate", label: "Rechnungsdatum (optional)", type: "text", placeholder: "z. B. 14.05.2026", colSpan: 1 },
        {
          name: "invoiceQty",
          label: "Menge auf der Rechnung",
          type: "text",
          placeholder: "z. B. 10",
          colSpan: 1,
          condition: (d) => d.reason === "menge",
        },
        {
          name: "requestedQty",
          label: "Von Amazon verlangte Menge",
          type: "text",
          placeholder: "z. B. 50",
          colSpan: 1,
          condition: (d) => d.reason === "menge",
        },
      ],
    },
    {
      title: "Ergänzende Argumente (optional)",
      subtitle: "Eigene Punkte – pro Zeile ein Argument oder Nachweis.",
      fields: [
        {
          name: "extra",
          label: "Zusätzliche Nachweise / Argumente",
          type: "textarea",
          colSpan: 2,
          placeholder:
            "z. B.\nAutorisierungsbestätigung des Lieferanten liegt vor\nWeitere Rechnung über 40 Einheiten vom 02.06.2026 vorhanden",
          help: "Leer lassen ist okay – der Widerspruch funktioniert auch ohne.",
        },
      ],
    },
  ],
  generate,
  seoSections: [
    {
      heading: "Amazon-Verkaufsfreischaltung (Ungating) abgelehnt – was tun?",
      body: [
        "Viele Marken und Kategorien auf Amazon sind „gegated“: Du darfst sie erst verkaufen, wenn Amazon deinen Antrag auf Freischaltung genehmigt. Dafür verlangt Amazon in der Regel Rechnungen eines echten Lieferanten über eine Mindeststückzahl innerhalb eines bestimmten Zeitraums. Wird der Antrag abgelehnt, ist das selten endgültig – ein sachlicher, gut belegter Widerspruch führt häufig zum Erfolg.",
        "Dieser Generator erstellt dir genau diesen Widerspruch: strukturiert, höflich, faktenbasiert und passend zum konkreten Ablehnungsgrund.",
      ],
    },
    {
      heading: "Die häufigsten Ablehnungsgründe – und die richtige Reaktion",
      body: [
        "„Höhere Stückzahl verlangt“: Oft wird mit 10 Einheiten beantragt und dann plötzlich eine größere Menge gefordert. Antwort: konkrete Mindestmenge und Zeitraum erfragen und ergänzende Rechnungen desselben Lieferanten nachreichen, statt den Antrag fallen zu lassen.",
        "„Rechnung modifiziert“: Hier hilft kein Streit, sondern das Angebot, die unveränderte Originaldatei direkt aus dem Lieferantensystem sowie Zahlungsnachweis und Lieferantenkontakt zur Verifizierung bereitzustellen. „Lieferant nicht autorisiert“: Umsatzsteuer-ID, Handelsregister-/Gewerbedaten und Kontakt des Großhändlers vorlegen.",
      ],
    },
    {
      heading: "Was macht einen Widerspruch erfolgreich?",
      body: [
        "Kurz, sachlich, ohne Schuldzuweisungen – und mit dem klaren Angebot, jeden geforderten Nachweis sofort nachzureichen. Wichtig ist, gezielt auf den genannten Ablehnungsgrund einzugehen und um eine erneute Prüfung statt einer vollständigen Neuablehnung zu bitten.",
        "Reiche, wenn möglich, vollständige PDF-Rechnungen (kein Passwortschutz, kein Beschnitt) plus passenden Zahlungsnachweis ein. Konsistenz zwischen Konto-, Rechnungs- und Lieferantendaten erhöht die Erfolgschance deutlich.",
      ],
    },
  ],
  seo: {
    title: "Amazon Marken-Freischaltung abgelehnt – Widerspruch-Generator | GründerX",
    description:
      "Amazon-Ungating abgelehnt (Stückzahl, „modifizierte“ Rechnung, Lieferant)? Erstelle kostenlos einen sachlichen Widerspruch gegen die abgelehnte Verkaufsfreischaltung. Vorlage in Minuten.",
    keywords:
      "amazon marken freischaltung abgelehnt, amazon ungating widerspruch, amazon kategorie freischalten, amazon rechnung abgelehnt, amazon rechnung modifiziert, amazon verkaufsantrag abgelehnt, amazon brand approval widerspruch",
    faqs: [
      {
        q: "Amazon verlangt plötzlich eine höhere Stückzahl als im Antrag – was tun?",
        a: "Nicht aufgeben. Erfrage die konkret geforderte Mindestmenge und den Zeitraum und reiche ergänzende Rechnungen desselben Lieferanten nach. Der Generator formuliert genau diese Bitte um erneute Prüfung statt vollständiger Ablehnung.",
      },
      {
        q: "Amazon sagt, meine Rechnung sei „modifiziert“ – obwohl sie echt ist.",
        a: "Das passiert oft bei aus Portalen exportierten PDFs. Biete an, die unveränderte Originaldatei direkt aus dem Lieferantensystem, den Zahlungsnachweis und den Lieferantenkontakt zur Verifizierung bereitzustellen. Der Generator baut diese Argumentation automatisch ein.",
      },
      {
        q: "Ist der Generator kostenlos?",
        a: "Ja. Erstellung und Download des Widerspruchs sind kostenlos – du legst nur ein kostenloses GründerX-Konto an, um die fertige Vorlage freizuschalten.",
      },
      {
        q: "Garantiert der Widerspruch die Freischaltung?",
        a: "Nein, die Entscheidung liegt bei Amazon. Ein sachlicher, gut belegter Widerspruch erhöht die Chance aber deutlich, weil er gezielt auf den Ablehnungsgrund eingeht und die passenden Nachweise anbietet.",
      },
    ],
  },
};
