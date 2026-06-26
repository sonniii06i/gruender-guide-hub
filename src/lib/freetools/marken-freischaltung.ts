import { BadgeCheck } from "lucide-react";
import { type ToolConfig, type ToolData, s, DISCLAIMER } from "./types";

// Widerspruch gegen abgelehnte Marken-/Kategorie-Freischaltung (Ungating) auf Amazon.
// Inhalte auf Basis der aktuellen Amazon-Anforderungen (Stand 2026):
//  - Rechnung von Hersteller ODER autorisiertem Großhändler (keine Endkunden-Quittung,
//    keine Pro-forma-Rechnung)
//  - mindestens 10 Einheiten, Rechnungsdatum innerhalb der letzten 180 Tage (teils 365)
//  - Käuferdaten exakt wie im Seller-Central-Konto; Lieferant mit Name/Anschrift/Telefon/Website
//  - Artikel mit Modellnummer bzw. UPC/EAN; hochauflösend, unverändert, Preise nicht geschwärzt

const REASON_LABEL: Record<string, string> = {
  menge: "Rechnung weist zu geringe Stückzahl auf / es wird eine höhere Menge verlangt",
  modifiziert: "Rechnung wurde als „modifiziert“ / bearbeitet eingestuft",
  lieferant: "Lieferant gilt nicht als autorisierter Großhändler / Hersteller",
  quittung: "Eingereichtes Dokument wurde als Quittung statt Großhandelsrechnung gewertet",
  autorisierung: "Autorisierung / Erlaubnis der Marke fehlt (LOA / Vertriebsvereinbarung)",
  alt: "Rechnung ist zu alt (außerhalb des akzeptierten Zeitraums)",
  unvollstaendig: "Pflichtangaben auf der Rechnung fehlen (Lieferant, Käufer, Artikel)",
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
      "Die von uns eingereichte(n) Rechnung(en) erfüllte(n) die zum Antragszeitpunkt kommunizierte Mindestmenge " +
        "(üblich: mindestens 10 Einheiten innerhalb der letzten 180 Tage). Die Ablehnung stützt sich nun auf eine " +
        "höhere Stückzahl, die in der ursprünglichen Aufforderung nicht genannt war."
    );
    if (invoiceQty)
      L.push(
        `Unsere Rechnung weist eine Abnahmemenge von ${invoiceQty} Einheiten aus.` +
          (requestedQty ? ` Aktuell werden ${requestedQty} Einheiten gefordert.` : "")
      );
    L.push(
      "Amazon erwartet in der Regel Rechnungen über die gesamte angebotene bzw. verkaufte Menge desselben Produkts. " +
        "Wir reichen umgehend ergänzende Rechnungen desselben autorisierten Lieferanten nach, bis die geforderte " +
        "Gesamtmenge vollständig belegt ist – gern auch als konsolidierte Aufstellung."
    );
    L.push(
      "Wir bitten höflich um Bestätigung der konkret geforderten Mindestmenge sowie des maßgeblichen Zeitraums und " +
        "darum, unseren Antrag nach Eingang der ergänzenden Belege erneut zu prüfen, statt ihn vollständig abzulehnen."
    );
  } else if (reason === "modifiziert") {
    L.push(
      "Die eingereichte Rechnung ist authentisch und wurde inhaltlich in keiner Weise verändert. Es handelt sich um " +
        "eine vollständige Originalrechnung unseres Lieferanten über eine tatsächlich abgeschlossene Bestellung – " +
        "keine Pro-forma-Rechnung."
    );
    L.push(
      "Häufige Auslöser der automatischen Einstufung als „modifiziert“ sind nachträglich bearbeitete PDF-Dateien, " +
        "geschwärzte oder entfernte Preise, Beschnitte oder eine als PDF neu gespeicherte/zusammengeführte Datei. Bei " +
        "uns liegen ausgewiesene Preise vor, es wurde nichts entfernt, geschwärzt oder verändert."
    );
    L.push(
      "Zur Verifizierung bieten wir an: die unveränderte Originaldatei direkt aus dem Lieferantensystem, eine " +
        "Bestätigung des Lieferanten (gern per direkter E-Mail an Amazon), den zugehörigen Zahlungsnachweis " +
        "(Überweisungsbeleg/Kontoauszug) sowie Auftragsbestätigung bzw. Lieferschein als Querverweis."
    );
    L.push(
      "Wir bitten, die Rechnung anhand dieser zusätzlichen Nachweise erneut – idealerweise manuell – zu prüfen."
    );
  } else if (reason === "lieferant") {
    L.push(
      "Unser Lieferant" + (supplier ? ` (${supplier})` : "") + " ist ein eingetragenes, umsatzsteuerlich " +
        "registriertes Großhandels-/Vertriebsunternehmen und damit eine zulässige Bezugsquelle. Amazon akzeptiert " +
        "Rechnungen von Herstellern oder autorisierten Groß-/Fachhändlern – es handelt sich nicht um eine " +
        "Endkunden-Quittung oder einen Einzelhandelsbeleg."
    );
    L.push(
      "Zur Bestätigung der Seriosität und Autorisierung legen wir auf Wunsch vor: Umsatzsteuer-Identifikationsnummer, " +
        "Handelsregister-/Gewerbedaten, vollständige Anschrift, Telefon und Website des Lieferanten, einen direkten " +
        "Ansprechpartner zur unmittelbaren Verifizierung sowie – soweit verlangt – ein Autorisierungsschreiben (Letter " +
        "of Authorization), das den Verkauf der Marke ausdrücklich auch auf Amazon gestattet."
    );
    L.push(
      "Sollte für die gewünschte Marke ausschließlich der Direktbezug vom Markeninhaber akzeptiert werden, bitten wir " +
        "um einen ausdrücklichen Hinweis, damit wir eine entsprechende Bezugsquelle nachweisen können."
    );
  } else if (reason === "quittung") {
    L.push(
      "Bei dem beanstandeten Beleg handelt es sich um eine vollständige Rechnung, nicht um eine bloße Quittung. Sollte " +
        "das eingereichte Dokument als Endkunden- bzw. Kassenbeleg gewertet worden sein, reichen wir umgehend eine " +
        "ordnungsgemäße Großhandelsrechnung unseres autorisierten Lieferanten nach."
    );
    L.push(
      "Eine ungating-taugliche Rechnung stammt von einem Hersteller oder autorisierten Großhändler und enthält " +
        "vollständige Lieferanten- und Käuferdaten, Rechnungsnummer und -datum sowie die Artikel mit Modellnummer bzw. " +
        "UPC/EAN und Menge. Diese Anforderungen erfüllen wir vollständig."
    );
    L.push(
      "Wir bitten um Bestätigung, dass die nachgereichte Großhandelsrechnung akzeptiert wird, sowie um erneute Prüfung."
    );
  } else if (reason === "autorisierung") {
    L.push(
      "Wir beziehen die Produkte aus einer legitimen, autorisierten Quelle. Sofern für die Marke ein ausdrücklicher " +
        "Autorisierungsnachweis verlangt wird, legen wir ein Autorisierungsschreiben (Letter of Authorization) bzw. " +
        "eine Händler-/Vertriebsvereinbarung vor, die den Vertrieb – ausdrücklich auch auf Amazon – gestattet."
    );
    L.push(
      "Ergänzend stellen wir Einkaufsrechnungen des autorisierten Lieferanten sowie dessen vollständige Kontaktdaten " +
        "zur direkten Verifizierung bereit."
    );
    L.push(
      "Wir bitten um Mitteilung, welcher konkrete Nachweis (LOA, Vertriebsvereinbarung oder Herstellerbestätigung) für " +
        "die Freischaltung erforderlich ist, damit wir genau diesen umgehend einreichen können."
    );
  } else if (reason === "alt") {
    L.push(
      "Die eingereichte Rechnung lag nach unserem Verständnis innerhalb des akzeptierten Zeitraums." +
        (invoiceDate ? ` Das Rechnungsdatum ist der ${invoiceDate}.` : "")
    );
    L.push(
      "Maßgeblich ist üblicherweise das Rechnungsdatum innerhalb der letzten 180 Tage (in einzelnen Fällen werden bis " +
        "zu 365 Tage akzeptiert). Sollte dieser Zeitraum überschritten sein, stellen wir umgehend eine aktuelle " +
        "Rechnung desselben Lieferanten über die geforderte Menge bereit – in der Regel noch am selben Tag."
    );
    L.push(
      "Wir bitten um Bestätigung des konkret erforderlichen Zeitfensters und um erneute Prüfung nach Einreichung der " +
        "aktuellen Rechnung."
    );
  } else if (reason === "unvollstaendig") {
    L.push(
      "Wir reichen die Rechnung gern in vollständiger Form erneut ein. Damit wir gezielt nachbessern können, bitten " +
        "wir um Mitteilung, welche konkrete Pflichtangabe als fehlend bewertet wurde."
    );
    L.push(
      "Eine vollständige Rechnung enthält: vollständiger Name und Anschrift des Lieferanten (mit Telefon und " +
        "Website/E-Mail), unseren Firmennamen und unsere Anschrift exakt wie im Amazon-Verkäuferkonto, Rechnungsnummer " +
        "und -datum, die Artikelbezeichnung mit Modellnummer bzw. UPC/EAN sowie die Menge. Wir stellen sicher, dass " +
        "alle diese Angaben enthalten und gut lesbar sind."
    );
    L.push(
      "Etwaige Lücken schließen wir umgehend und reichen die vervollständigte Rechnung nach."
    );
  } else if (reason === "unleserlich") {
    L.push(
      "Wir reichen die Rechnung gern in einwandfrei lesbarer Form erneut ein: als hochauflösenden Scan bzw. als " +
        "digitale Originaldatei (PDF) mit vollständigen Seiten, ohne Beschnitt, ohne Passwortschutz und ohne starke " +
        "Komprimierung."
    );
    L.push(
      "Amazon erwartet eine klar lesbare Vorlage – kein abfotografiertes, schräges oder beschnittenes Bild. Die beste " +
        "Lesbarkeit erreichen wir mit der digitalen Originaldatei direkt aus dem Lieferantensystem; alternativ liefern " +
        "wir einen sauberen Farb-Scan in hoher Auflösung."
    );
    L.push(
      "Bitte bestätigen Sie das bevorzugte Format, damit die erneute Einreichung sofort akzeptiert werden kann."
    );
  } else if (reason === "mismatch") {
    L.push(
      "Die Angaben auf der Rechnung beziehen sich auf dasselbe Unternehmen, das dieses Verkäuferkonto betreibt. " +
        "Etwaige Abweichungen – etwa eine abweichende Schreibweise, eine frühere Anschrift oder ein Zusatz im " +
        "Firmennamen – lassen sich eindeutig auflösen."
    );
    L.push(
      "Amazon verlangt eine exakte Übereinstimmung zwischen den Rechnungsangaben und den im Verkäuferkonto " +
        "hinterlegten Daten (Firmenname und Anschrift). Bitte teilen Sie uns mit, welche konkrete Angabe als " +
        "abweichend bewertet wurde (z. B. Name, Adresse oder Steuernummer)."
    );
    L.push(
      "Zur Auflösung bieten wir an: Aktualisierung der Kontodaten auf die exakte Firmierung, eine vom Lieferanten auf " +
        "den korrekten Konto-Namen/-Anschrift neu ausgestellte Rechnung sowie unsere Gewerbe-/Handelsregisterdaten zum " +
        "Identitätsnachweis."
    );
  } else {
    L.push(
      "Wir bitten höflich um eine konkrete Begründung, welche Anforderung als nicht erfüllt bewertet wurde, sowie um " +
        "Nennung der genau erforderlichen Unterlagen bzw. Angaben für die Freischaltung."
    );
    L.push(
      "Proaktiv stellen wir bereits jetzt unser vollständiges Nachweispaket bereit: Originalrechnung(en) eines " +
        "autorisierten Lieferanten, den zugehörigen Zahlungsnachweis sowie Kontakt- und Registrierungsdaten des " +
        "Lieferanten zur direkten Verifizierung."
    );
    L.push(
      "Wir bitten um einen konkreten Hinweis, welcher einzelne Punkt noch fehlt, damit wir ihn umgehend nachreichen " +
        "können – idealerweise ohne erneute vollständige Ablehnung."
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
    "wir beziehen uns auf die Ablehnung unseres Antrags auf Freischaltung zum Verkauf der oben genannten Marke bzw. " +
      "Kategorie. Nach sorgfältiger Prüfung nehmen wir hierzu Stellung und legen gegen die Ablehnung Widerspruch ein. " +
      "Wir erfüllen die Voraussetzungen und stellen alle erforderlichen Nachweise umgehend bereit."
  );
  L.push("");

  L.push("1. Stellungnahme zum konkreten Ablehnungsgrund");
  reasonArgument(data).forEach((p) => {
    L.push(p);
    L.push("");
  });

  L.push("2. Erfüllte Anforderungen an die Rechnung");
  L.push("Unsere Rechnung erfüllt die von Amazon verlangten Standardanforderungen:");
  L.push("   • Ausgestellt von einem Hersteller bzw. autorisierten Großhändler (keine Endkunden-Quittung, keine Pro-forma-Rechnung)");
  L.push("   • Mindestens 10 Einheiten des Produkts, Rechnungsdatum innerhalb der letzten 180 Tage");
  L.push("   • Käufername und -anschrift stimmen exakt mit dem Amazon-Verkäuferkonto überein");
  L.push("   • Vollständige Lieferantendaten: Name, Anschrift, Telefon und Website/E-Mail");
  L.push("   • Artikelbezeichnung mit Modellnummer bzw. UPC/EAN sowie Menge");
  L.push("   • Hochauflösende, unveränderte Originalrechnung mit ausgewiesenen Preisen");
  L.push("");

  L.push("3. Vorliegende Nachweise");
  L.push("Folgende Unterlagen werden auf Anforderung umgehend (erneut) übermittelt:");
  L.push("   • Originalrechnung(en) des autorisierten Lieferanten als vollständige, lesbare PDF-Datei");
  L.push("   • Zahlungsnachweis (Überweisungsbeleg / Kontoauszug) zur jeweiligen Rechnung");
  L.push("   • Kontakt- und Registrierungsdaten des Lieferanten zur direkten Verifizierung");
  L.push("   • Soweit erforderlich: Autorisierungsschreiben (LOA) bzw. Vertriebsvereinbarung");
  if (extra) {
    bullets(extra).forEach((b) => L.push(b));
  }
  L.push("");

  L.push("4. Bitte");
  L.push(
    "Wir bitten höflich, die Ablehnung zu überprüfen und unseren Antrag erneut zu bewerten. Sollte eine einzelne " +
      "Angabe oder ein Dokument fehlen, bitten wir um einen konkreten Hinweis, damit wir die Unterlage umgehend " +
      "nachreichen können – idealerweise ohne erneute vollständige Ablehnung. Für Rückfragen und zur direkten " +
      "Verifizierung unseres Lieferanten stehen wir jederzeit zur Verfügung."
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
    "Antrag auf Verkaufsfreischaltung (Ungating) abgelehnt – z. B. weil plötzlich eine höhere Stückzahl verlangt wird, die Rechnung als „modifiziert“ gilt, der Lieferant nicht akzeptiert wird oder eine Autorisierung fehlt? Erstelle in Minuten einen sachlichen, faktenbasierten Widerspruch nach den aktuellen Amazon-Anforderungen. Kostenlos, nur ein kostenloses Konto nötig.",
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
            { value: "quittung", label: "Quittung statt Großhandelsrechnung" },
            { value: "autorisierung", label: "Autorisierung der Marke fehlt (LOA)" },
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
            "z. B.\nAutorisierungsschreiben (LOA) des Herstellers liegt vor\nWeitere Rechnung über 40 Einheiten vom 02.06.2026 vorhanden",
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
        "Viele Marken und Kategorien auf Amazon sind „gegated“: Du darfst sie erst verkaufen, wenn Amazon deinen Antrag auf Freischaltung genehmigt. Amazon verlangt dafür in der Regel eine Rechnung von einem Hersteller oder autorisierten Großhändler über mindestens 10 Einheiten, ausgestellt innerhalb der letzten 180 Tage. Wird der Antrag abgelehnt, ist das selten endgültig – ein sachlicher, faktenbasierter Widerspruch führt häufig zum Erfolg.",
        "Dieser Generator erstellt dir genau diesen Widerspruch: strukturiert, höflich und passend zum konkreten Ablehnungsgrund – inklusive der Anforderungen, die deine Rechnung erfüllen muss.",
      ],
    },
    {
      heading: "Die Amazon-Anforderungen an die Rechnung (2026)",
      body: [
        "Akzeptiert werden ausschließlich Rechnungen von Herstellern oder autorisierten Großhändlern – keine Endkunden-Quittungen, keine Einzelhandelsbelege und keine Pro-forma-Rechnungen. Die Rechnung muss mindestens 10 Einheiten ausweisen und innerhalb der letzten 180 Tage (in Einzelfällen 365 Tage) datiert sein.",
        "Dein Firmenname und deine Anschrift müssen exakt mit dem Amazon-Verkäuferkonto übereinstimmen. Der Lieferant muss mit Name, Anschrift, Telefon und Website nachvollziehbar sein, die Artikel mit Modellnummer bzw. UPC/EAN aufgeführt. Reiche eine hochauflösende, unveränderte Originalrechnung mit ausgewiesenen Preisen ein – kein abfotografiertes Bild, kein Beschnitt, keine geschwärzten Preise.",
      ],
    },
    {
      heading: "Häufige Ablehnungsgründe – und die richtige Reaktion",
      body: [
        "„Höhere Stückzahl verlangt“: Amazon will oft Rechnungen über die gesamte angebotene Menge. Reiche ergänzende Rechnungen desselben autorisierten Lieferanten nach und bitte um erneute Prüfung statt Komplettablehnung. „Rechnung modifiziert“: meist Folge bearbeiteter PDFs, geschwärzter Preise oder einer Pro-forma-Rechnung – biete die unveränderte Originaldatei, Zahlungsnachweis und Lieferantenkontakt zur Verifizierung an.",
        "„Lieferant nicht autorisiert“ / „Autorisierung fehlt“: lege Umsatzsteuer-ID, Handelsregister-/Gewerbedaten und Kontakt des Großhändlers vor – und, falls verlangt, ein Autorisierungsschreiben (LOA), das den Verkauf auf Amazon ausdrücklich gestattet. Ungating-Anträge dauern oft 6–8 Wochen und werden streng geprüft; ein präziser Widerspruch spart Runden.",
      ],
    },
  ],
  seo: {
    title: "Amazon Marken-Freischaltung abgelehnt – Widerspruch-Generator | GründerX",
    description:
      "Amazon-Ungating abgelehnt (Stückzahl, „modifizierte“ Rechnung, Lieferant, Autorisierung)? Erstelle kostenlos einen faktenbasierten Widerspruch nach den aktuellen Amazon-Anforderungen. Vorlage in Minuten.",
    keywords:
      "amazon marken freischaltung abgelehnt, amazon ungating widerspruch, amazon kategorie freischalten, amazon rechnung abgelehnt, amazon rechnung modifiziert, amazon verkaufsantrag abgelehnt, amazon brand approval widerspruch, amazon ungating rechnung anforderungen",
    faqs: [
      {
        q: "Welche Rechnung akzeptiert Amazon für die Freischaltung?",
        a: "Eine Rechnung von einem Hersteller oder autorisierten Großhändler über mindestens 10 Einheiten, datiert innerhalb der letzten 180 Tage, mit deinem exakten Konto-Namen und -Adresse, vollständigen Lieferantendaten (Name, Anschrift, Telefon, Website) und Artikeln mit Modellnummer/UPC. Keine Quittungen, keine Pro-forma-Rechnungen, keine geschwärzten Preise.",
      },
      {
        q: "Amazon verlangt plötzlich eine höhere Stückzahl als im Antrag – was tun?",
        a: "Nicht aufgeben. Amazon will häufig Rechnungen über die gesamte angebotene Menge. Erfrage die genaue Mindestmenge und reiche ergänzende Rechnungen desselben autorisierten Lieferanten nach. Der Generator formuliert die Bitte um erneute Prüfung statt vollständiger Ablehnung.",
      },
      {
        q: "Amazon sagt, meine Rechnung sei „modifiziert“ – obwohl sie echt ist.",
        a: "Das passiert oft bei bearbeiteten PDFs, geschwärzten Preisen oder Pro-forma-Rechnungen. Reiche die unveränderte Originaldatei mit ausgewiesenen Preisen ein und biete Zahlungsnachweis sowie Lieferantenkontakt zur Verifizierung an. Genau diese Argumentation baut der Generator ein.",
      },
      {
        q: "Ist der Generator kostenlos?",
        a: "Ja. Erstellung und Download des Widerspruchs sind kostenlos – du legst nur ein kostenloses GründerX-Konto an, um die fertige Vorlage freizuschalten.",
      },
    ],
  },
};
