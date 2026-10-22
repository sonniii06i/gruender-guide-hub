// Inhalt der Vorlage „widerspruch-rechnung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../verwaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einer Rechnung widersprechen solltest",
        text: `Rechnungen prüfen ist lästig, aber jede unbeanstandete Rechnung wird irgendwann gebucht, bezahlt und als Vorsteuer geltend gemacht. Typische Anlässe für einen Widerspruch: Der Lieferant berechnet 120 statt der gelieferten 100 Stück, die Agentur setzt den Listenpreis statt des vereinbarten Projektpreises an, die Hosting-Firma stellt die Migration doppelt in Rechnung, der Handwerker berechnet Material, das nie verbaut wurde, oder es fehlen auf der Rechnung Steuernummer und Leistungsdatum, sodass dein Vorsteuerabzug wackelt.

Auch wenn du als Unternehmer eine Leistung nur mangelhaft erhalten hast, ist die Rechnungsreklamation der erste Schritt, um den Betrag teilweise zurückzuhalten. Die Vorlage ist für Rechnungen von Lieferanten und Dienstleistern an dein Unternehmen gedacht und funktioniert für Papier-, PDF- und E-Rechnungen gleichermaßen.`,
      },
      {
        titel: "Was in den Widerspruch gegen eine Rechnung gehört",
        text: `Ein guter Widerspruch ist positionsgenau und hält den Rest der Geschäftsbeziehung sauber. Die Vorlage enthält:

- Rechnungsnummer, Rechnungsdatum, Kunden- und Bestellnummer, damit die Buchhaltung des Lieferanten die Rechnung sofort findet
- das Eingangsdatum der Rechnung, weil ab dort Zahlungs- und Rügefristen laufen
- je beanstandeter Position Nummer, Bezeichnung, berechneten Betrag und den konkreten Grund
- fünf Begründungsbausteine: nicht bestellt, falsche Menge, Preisabweichung, doppelt berechnet, Leistung nicht oder mangelhaft erbracht
- die Rüge fehlender Pflichtangaben für den Vorsteuerabzug
- die Zahlung des unbestrittenen Teils mit Datum und Konto sowie die Zurückbehaltung des streitigen Betrags
- die Zurückweisung von Mahnkosten, Verzugszinsen und Inkassokosten auf den streitigen Teil
- die Frist für eine berichtigte Rechnung, Stornorechnung oder Gutschrift, bei Bedarf als E-Rechnung
- Anlagen mit Bestellung, Lieferschein und Zahlungsbelegen

Die Trennung in unbestrittenen und streitigen Betrag ist der Kern des Schreibens: Sie zeigt Zahlungswillen und nimmt dem Lieferanten das Argument, du wolltest nur Zeit gewinnen.`,
      },
      {
        titel: "Rechnung reklamieren: Vorlage Schritt für Schritt ausfüllen",
        text: `Lege Rechnung, Bestellung oder Auftragsbestätigung und Lieferschein nebeneinander. Trage Rechnungsnummer, Datum, Gesamtbetrag und Eingangsdatum in Betreff und ersten Absatz ein. Für jede beanstandete Position kopierst du den Positionsblock, setzt Nummer, Bezeichnung und Betrag ein und wählst genau einen Grund A bis E; die übrigen Bausteine löschst du. Bei Grund B nennst du die Lieferscheinnummer, bei Grund C das Dokument mit dem vereinbarten Preis, bei Grund D die frühere Rechnungsnummer und das Zahlungsdatum.

Prüfe die Rechnung dann auf die Pflichtangaben und liste die fehlenden auf, oder lösche den Absatz, wenn alles vollständig ist. Rechne den unbestrittenen Betrag aus, überweise ihn fristgerecht mit der Rechnungsnummer im Verwendungszweck und trage Datum und Betrag ein. Setze eine Frist von etwa zwei Wochen für die berichtigte Rechnung, hänge die Belege an und sende den Widerspruch per E-Mail an die Buchhaltung des Lieferanten, bei größeren Beträgen zusätzlich per Brief.`,
      },
      {
        titel: "Typische Fehler bei der Rechnungsreklamation",
        text: `Erster Fehler: zu lange warten. Wer eine Rechnung wochenlang liegen lässt, gerät mit dem unstreitigen Teil in Verzug und hat es bei Mengen- und Mangelrügen schwer, weil Kaufleute unverzüglich rügen müssen. Zweiter Fehler: die ganze Rechnung zurückhalten. Dann schuldest du auf den unstreitigen Teil Verzugszinsen und die Pauschale von 40 Euro, selbst wenn du mit dem Rest recht hattest. Dritter Fehler: nur anrufen. Eine mündliche Beanstandung lässt sich nicht beweisen; schreib, und zwar mit Zugangsnachweis.

Vierter Fehler: unklare Forderung. „Bitte prüfen Sie die Rechnung“ ist kein Widerspruch; nenne Position, Betrag und Grund und fordere eine konkrete Korrektur. Fünfter Fehler: fehlende Pflichtangaben per E-Mail nachbessern lassen. Für den Vorsteuerabzug brauchst du ein berichtigtes Rechnungsdokument mit Bezug auf die ursprüngliche Rechnung, bei E-Rechnungen wieder im strukturierten Format. Sechster Fehler: Skonto trotz Streit voll abziehen; Skonto gibt es nur, wenn du innerhalb der Skontofrist zahlst, und nur auf den tatsächlich gezahlten Betrag.`,
      },
      {
        titel: "Rechtsgrundlagen: § 14 UStG, § 320 BGB, § 286 BGB und § 377 HGB",
        text: `Die Pflichtangaben einer Rechnung stehen in § 14 Abs. 4 UStG: vollständiger Name und Anschrift beider Seiten, Steuernummer oder Umsatzsteuer-Identifikationsnummer des Leistenden, Ausstellungsdatum, fortlaufende Rechnungsnummer, Menge und Art der Leistung, Zeitpunkt der Leistung, Entgelt nach Steuersätzen aufgeschlüsselt, Steuersatz und Steuerbetrag. Ohne diese Angaben scheitert der Vorsteuerabzug nach § 15 UStG; eine Berichtigung erlaubt § 14 Abs. 6 UStG in Verbindung mit § 31 Abs. 5 UStDV. Seit dem 1. Januar 2025 müssen inländische Unternehmer E-Rechnungen anderer Unternehmer empfangen können; die Pflicht, selbst E-Rechnungen auszustellen, kommt gestaffelt.

Das Zurückbehaltungsrecht bei nicht oder mangelhaft erbrachter Gegenleistung folgt aus § 320 BGB. Verzug tritt nach § 286 Abs. 3 BGB spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung ein; der Verzugszins zwischen Unternehmern beträgt nach § 288 Abs. 2 BGB neun Prozentpunkte über dem Basiszinssatz, dazu kommt die Pauschale von 40 Euro nach § 288 Abs. 5 BGB. Für Kaufleute gilt die Rügepflicht des § 377 HGB: Mängel der gelieferten Ware sind unverzüglich anzuzeigen, sonst gilt die Ware als genehmigt.`,
      },
      {
        titel: "Wann der Widerspruch nicht reicht",
        text: `Bei Mengen-, Preis- und Doppelberechnungsfehlern erledigt sich die Sache meist mit einer korrigierten Rechnung. Komplizierter wird es, wenn der Lieferant die Nachbesserung verweigert und mahnt oder ein Inkassobüro einschaltet; dann solltest du die Forderung weiterhin schriftlich bestreiten und bei einem gerichtlichen Mahnbescheid innerhalb von zwei Wochen Widerspruch beim Gericht einlegen, sonst folgt ein Vollstreckungsbescheid.

Geht es um Mängel einer Werkleistung, etwa einer Website oder eines Umbaus, sind Fristsetzung zur Nacherfüllung, Minderung und Schadensersatz eigene Schritte, die mit einem Anwalt abgestimmt sein sollten. Streitest du mit einem Lieferanten im Ausland, kommen Reverse-Charge-Fragen und fremdes Recht hinzu. GründerX ist Software und keine Rechts- oder Steuerberatung; ob eine Rechnung umsatzsteuerlich korrekt ist, prüft im Zweifel dein Steuerberater.`,
      },
    ],
  text: `[Firma / Vorname Nachname]
[Straße]
[PLZ Ort]
[Telefon], [E-Mail-Adresse]

[Firma des Rechnungsstellers]
[Buchhaltung / Debitorenbuchhaltung]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Widerspruch gegen Rechnung Nr. [Rechnungsnummer] vom [Datum]
[Kundennummer: [Nummer] / Bestell- oder Auftragsnummer: [Nummer]]

Sehr geehrte Damen und Herren,

am [Datum] habe ich Ihre oben genannte Rechnung über [Gesamtbetrag] EUR erhalten. Nach Prüfung widerspreche ich der Rechnung in folgenden Punkten:

Position [Nr.] „[Bezeichnung]“, berechnet [Betrag] EUR:
[Grund A – nicht bestellt: Diese Leistung / Ware habe ich nicht bestellt. Eine Bestellung oder Beauftragung liegt nicht vor; andernfalls bitte ich, mir den Auftrag vorzulegen.]
[Grund B – falsche Menge: Bestellt und geliefert wurden [Anzahl] Stück (Lieferschein Nr. [Nummer] vom [Datum]), berechnet wurden [Anzahl] Stück.]
[Grund C – Preisabweichung: Vereinbart war laut [Angebot Nr. [Nummer] vom [Datum] / Auftragsbestätigung vom [Datum] / Preisliste] ein Preis von [Betrag] EUR netto je [Einheit]; berechnet wurden [Betrag] EUR.]
[Grund D – doppelt berechnet: Diese Position wurde bereits mit Rechnung Nr. [Nummer] vom [Datum] berechnet und am [Datum] bezahlt.]
[Grund E – Leistung nicht oder mangelhaft erbracht: Die Leistung wurde [nicht / nur teilweise / mangelhaft] erbracht: [kurze Beschreibung]. Insoweit mache ich mein Zurückbehaltungsrecht geltend (§ 320 BGB) und behalte mir weitere Rechte wegen des Mangels vor.]

Position [Nr.] „[Bezeichnung]“, berechnet [Betrag] EUR:
[Grund wie oben]

[Formale Mängel: Außerdem fehlen auf der Rechnung folgende Pflichtangaben nach § 14 Abs. 4 UStG: [z. B. Ihre Steuernummer oder USt-IdNr. / das Leistungsdatum / die fortlaufende Rechnungsnummer / der anzuwendende Steuersatz und der Steuerbetrag]. Ohne diese Angaben ist der Vorsteuerabzug nicht möglich.]

Der unbestrittene Teil der Rechnung in Höhe von [Betrag] EUR wird [bis zum [Datum] / wurde bereits am [Datum]] auf Ihr Konto [IBAN] überwiesen [unter Abzug des vereinbarten Skontos von [Prozent] %]. Den streitigen Betrag von [Betrag] EUR halte ich bis zur Klärung zurück. Mahnkosten, Verzugszinsen oder Inkassokosten auf den streitigen Betrag erkenne ich nicht an.

Ich bitte Sie, mir bis zum [Datum] eine berichtigte Rechnung über [Betrag] EUR zu übersenden [bzw. eine Stornorechnung oder Gutschrift über [Betrag] EUR mit Bezug auf die Rechnungsnummer zu erteilen]. [Bei E-Rechnung: Bitte übermitteln Sie die berichtigte Rechnung als E-Rechnung im Format [XRechnung / ZUGFeRD] an [E-Mail-Adresse].]

Anlagen:
– Kopie der Rechnung Nr. [Rechnungsnummer]
– [Bestellung / Auftragsbestätigung / Angebot vom [Datum]]
– [Lieferschein Nr. [Nummer]]
– [Zahlungsbeleg zu Rechnung Nr. [Nummer]]

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[ggf. Firma und Funktion]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
