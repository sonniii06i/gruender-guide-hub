import { type Vorlage } from "./types";

// Kaufverträge: Waren, Fahrzeuge, Inventar, Maschinen, Warenlager, Domains,
// Websites, Unternehmen (Asset Deal), FBA-Geschäfte, Rahmenlieferung, Kommission.
// Rechtsstand: BGB (Kaufrecht §§ 433 ff., Gewährleistung §§ 434 ff.), HGB
// (§ 25, § 377, §§ 383 ff.), § 613a BGB. Stand 2026-10.

export const VORLAGEN_KAUF: Vorlage[] = [
  {
    slug: "kaufvertrag-allgemein",
    titel: "Kaufvertrag über bewegliche Sachen (B2B)",
    kurz: "Allgemeiner Kaufvertrag zwischen Unternehmern mit Lieferung, Gefahrübergang, Eigentumsvorbehalt und Rügepflicht nach HGB.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-B2B",
    wofuer: [
      "Du kaufst oder verkaufst Waren, Geräte oder Material an ein anderes Unternehmen",
      "Einmaliger Kauf ohne Rahmenvertrag, aber mit klaren Regeln zu Lieferung und Mängeln",
      "Wenn du als Verkäufer dein Eigentum bis zur vollständigen Zahlung sichern willst",
      "Wenn du als Käufer wissen willst, bis wann du Mängel rügen musst",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand",
      "§ 2 Kaufpreis und Zahlung",
      "§ 3 Lieferung, Gefahrübergang und Verzug",
      "§ 4 Eigentumsvorbehalt",
      "§ 5 Untersuchungs- und Rügepflicht",
      "§ 6 Gewährleistung",
      "§ 7 Haftung",
      "§ 8 Rücktritt und Verzug",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Zwischen Kaufleuten gilt § 377 HGB: Wer die Ware nicht unverzüglich untersucht und erkennbare Mängel nicht sofort rügt, verliert seine Gewährleistungsrechte. Das steht in der Vorlage, musst du aber im Betrieb auch tatsächlich organisieren.",
      "Der Haftungsausschluss darf nie Vorsatz, grobe Fahrlässigkeit, Verletzung von Leben, Körper und Gesundheit oder wesentliche Vertragspflichten erfassen – sonst ist die ganze Klausel unwirksam (§§ 307, 309 BGB bei Formularverträgen).",
      "Der Eigentumsvorbehalt schützt nur, wenn er vor der Übergabe vereinbart wurde. Ein Aufdruck auf der Rechnung reicht nicht.",
      "Prüfe die Umsatzsteuer: Verkauf an ein Unternehmen im EU-Ausland mit gültiger USt-IdNr ist steuerfrei als innergemeinschaftliche Lieferung – nur mit Belegen (Gelangensbestätigung).",
    ],
    faqs: [
      {
        q: "Wann geht die Gefahr auf den Käufer über?",
        a: "Nach § 446 BGB mit der Übergabe. Beim Versendungskauf zwischen Unternehmern schon mit Übergabe an den Transporteur (§ 447 BGB). Ab dann trägt der Käufer das Risiko, dass die Ware unterwegs beschädigt wird oder verloren geht. Die Vorlage lässt dich zwischen beiden Varianten wählen.",
      },
      {
        q: "Wie lange habe ich als Käufer Gewährleistungsrechte?",
        a: "Gesetzlich zwei Jahre ab Ablieferung (§ 438 BGB). Zwischen Unternehmern lässt sich die Frist für neue Ware auf ein Jahr verkürzen; die Vorlage sieht das als Option vor. Vorsicht: Bei arglistig verschwiegenen Mängeln gilt die Verkürzung nicht.",
      },
      {
        q: "Was passiert, wenn der Käufer nicht zahlt?",
        a: "Nach Fälligkeit und Ablauf der Zahlungsfrist gerät der Käufer in Verzug, bei Unternehmern spätestens 30 Tage nach Rechnung. Es fallen Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz an (§ 288 Abs. 2 BGB) und eine Pauschale von 40 EUR. Dank Eigentumsvorbehalt kannst du die Ware außerdem zurückverlangen.",
      },
      {
        q: "Gilt die Vorlage auch für Verkäufe an Verbraucher?",
        a: "Nein. Gegenüber Verbrauchern sind viele Klauseln unzulässig (Rügepflicht, verkürzte Gewährleistung, Gefahrübergang beim Versand). Für Verbraucher brauchst du die Regeln des Verbrauchsgüterkaufs (§§ 474 ff. BGB) und bei Online-Verkauf die Widerrufsbelehrung.",
      },
    ],
    seo: {
      title: "Kaufvertrag B2B Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Kaufvertrag zwischen Unternehmern als kostenlose Vorlage: Kaufgegenstand, Zahlung, Lieferung, Eigentumsvorbehalt, Rügepflicht § 377 HGB, Gewährleistung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/kaufvertrag-allgemein"),
  },
  {
    slug: "kaufvertrag-privat-gebraucht",
    titel: "Kaufvertrag gebrauchte Sache (privat)",
    kurz: "Kaufvertrag zwischen Privatpersonen über eine gebrauchte Sache mit wirksamem Gewährleistungsausschluss und Zustandsbeschreibung.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Privat-Gebraucht",
    wofuer: [
      "Du verkaufst oder kaufst privat ein gebrauchtes Gerät, Möbel, Fahrrad, Instrument oder Ähnliches",
      "Übergaben über Kleinanzeigen, eBay Kleinanzeigen-Nachfolger oder im Bekanntenkreis mit Barzahlung",
      "Wenn du als Verkäufer die zweijährige Gewährleistung wirksam ausschließen willst",
      "Wenn beide Seiten den Zustand schriftlich festhalten wollen, um späteren Streit zu vermeiden",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand und Zustand",
      "§ 2 Kaufpreis und Zahlung",
      "§ 3 Übergabe und Gefahrübergang",
      "§ 4 Ausschluss der Gewährleistung",
      "§ 5 Zusicherungen des Verkäufers",
      "§ 6 Eigentum und Rechte Dritter",
      "§ 7 Schlussbestimmungen",
      "Übergabebestätigung",
    ],
    hinweise: [
      "Der Gewährleistungsausschluss wirkt nur zwischen Privatpersonen. Sobald eine Seite gewerblich handelt (auch Vielverkäufer auf Marktplätzen), ist der Ausschluss gegenüber einem Verbraucher unwirksam (§ 476 BGB).",
      "Arglistig verschwiegene Mängel und ausdrückliche Zusicherungen bleiben trotz Ausschluss haftungsrelevant (§ 444 BGB). Schreibe alle bekannten Mängel ehrlich in § 1.",
      "Sei vorsichtig mit Formulierungen wie „funktioniert einwandfrei“: Das kann als Beschaffenheitsgarantie gelten und hebelt den Ausschluss aus.",
      "Bei Barzahlung über 10.000 EUR gelten Pflichten nach dem Geldwäschegesetz für gewerbliche Händler; unter Privaten empfiehlt sich trotzdem Überweisung mit Verwendungszweck als Nachweis.",
    ],
    faqs: [
      {
        q: "Darf ich als Privatperson die Gewährleistung wirklich komplett ausschließen?",
        a: "Ja. Beim Verkauf unter Privatpersonen lässt sich die Sachmängelhaftung vertraglich ausschließen. Der Ausschluss gilt aber nicht für Mängel, die du kanntest und verschwiegen hast, und nicht für Eigenschaften, die du ausdrücklich zugesichert hast. Deshalb beschreibt die Vorlage den Zustand und die bekannten Mängel ausdrücklich.",
      },
      {
        q: "Was ist, wenn die Sache nach der Übergabe kaputtgeht?",
        a: "Mit Übergabe geht die Gefahr auf den Käufer über (§ 446 BGB). Wird die Sache danach beschädigt oder fällt sie aus, trägt der Käufer das Risiko, es sei denn, der Mangel war schon bei Übergabe angelegt und wurde arglistig verschwiegen. Ohne Gewährleistungsausschluss würde für sechs Monate vermutet, dass der Mangel schon bei Übergabe vorlag.",
      },
      {
        q: "Brauche ich zusätzlich eine Quittung?",
        a: "Die Vorlage enthält eine Übergabebestätigung, die beide unterschreiben. Sie dokumentiert Zahlung und Übergabe in einem Dokument. Bei Überweisung ist der Kontoauszug zusätzlich ein Beleg. Eine separate Quittung ist dann nicht nötig.",
      },
      {
        q: "Gilt der Vertrag auch für ein gebrauchtes Auto?",
        a: "Für Fahrzeuge solltest du den speziellen Kfz-Kaufvertrag verwenden, weil dort Fahrzeugidentnummer, Kilometerstand, HU, Unfallfreiheit und Ummeldung geregelt werden müssen. Für Fahrräder, E-Bikes, Elektronik, Möbel und Werkzeug passt diese Vorlage.",
      },
    ],
    seo: {
      title: "Kaufvertrag privat gebraucht Vorlage (Word & PDF) | GründerX",
      description:
        "Kaufvertrag zwischen Privatpersonen für gebrauchte Sachen: Zustandsbeschreibung, Gewährleistungsausschluss, Übergabe, Zahlung. Kostenlos als Word, PDF, Text.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/kaufvertrag-privat-gebraucht"),
  },
  {
    slug: "kaufvertrag-firmenwagen",
    titel: "Kfz-Kaufvertrag Firmenwagen (gewerblich)",
    kurz: "Kaufvertrag über ein Fahrzeug zwischen Unternehmern mit Fahrzeugdaten, Unfallfreiheit, Papierübergabe, Ummeldung und Umsatzsteuer.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Firmenwagen",
    wofuer: [
      "Du kaufst oder verkaufst einen Firmenwagen, Transporter oder Lieferwagen von bzw. an ein anderes Unternehmen",
      "Ausgemusterte Flottenfahrzeuge, Leasingrückläufer nach Ablösung oder Fahrzeuge aus der Betriebsaufgabe",
      "Wenn die Umsatzsteuer sauber ausgewiesen werden muss (Regelbesteuerung oder Differenzbesteuerung)",
      "Wenn die Übergabe von Zulassungsbescheinigung Teil I und II, Schlüsseln und HU-Bericht dokumentiert werden soll",
    ],
    enthaelt: [
      "§ 1 Fahrzeug",
      "§ 2 Zubehör und Unterlagen",
      "§ 3 Kaufpreis, Umsatzsteuer und Zahlung",
      "§ 4 Erklärungen des Verkäufers (Unfallfreiheit, Laufleistung, Mängel)",
      "§ 5 Übergabe, Gefahrübergang und Eigentumsvorbehalt",
      "§ 6 Ummeldung, Versicherung und Haftung ab Übergabe",
      "§ 7 Gewährleistung und Haftung",
      "§ 8 Schlussbestimmungen",
      "Übergabeprotokoll",
    ],
    hinweise: [
      "Bis zur Ummeldung haftet der Verkäufer gegenüber der Zulassungsstelle und Versicherung weiter. Melde den Verkauf sofort bei Zulassungsstelle und Versicherung (Veräußerungsanzeige), auch wenn der Käufer die Ummeldung zusagt.",
      "Die Zulassungsbescheinigung Teil II (früher Fahrzeugbrief) erst nach vollständiger Zahlung aushändigen. Wer sie hat, kann das Fahrzeug zulassen und weiterverkaufen.",
      "Umsatzsteuer: Beim Verkauf aus dem Betriebsvermögen fällt Umsatzsteuer an, sofern der Verkäufer nicht Kleinunternehmer ist. Ist das Fahrzeug ohne Vorsteuerabzug erworben worden, kann die Differenzbesteuerung (§ 25a UStG) greifen – dann kein USt-Ausweis auf der Rechnung.",
      "Angaben zu Unfallfreiheit und Kilometerstand sind Beschaffenheitsvereinbarungen. Stimmen sie nicht, haftet der Verkäufer auch bei verkürzter Gewährleistung. Nur schreiben, was du belegen kannst.",
    ],
    faqs: [
      {
        q: "Darf ich die Gewährleistung beim gewerblichen Fahrzeugverkauf ausschließen?",
        a: "Zwischen Unternehmern lässt sich die Gewährleistung für gebrauchte Fahrzeuge auf ein Jahr verkürzen und in Individualverträgen weitgehend ausschließen. Nicht ausschließbar sind arglistig verschwiegene Mängel, Beschaffenheitsgarantien sowie Schäden an Leben, Körper, Gesundheit und grobes Verschulden. Gegenüber Verbrauchern gilt das alles nicht.",
      },
      {
        q: "Was gehört ins Übergabeprotokoll?",
        a: "Kilometerstand bei Übergabe, Tankfüllung, Anzahl Schlüssel, Zulassungsbescheinigung Teil I und II, HU-Bericht, Serviceheft, Zubehör (Winterreifen, Dachträger) und sichtbare Schäden mit Fotos. Beide unterschreiben es – es ist später der Beweis für den Zustand bei Übergabe.",
      },
      {
        q: "Wer zahlt, wenn das Fahrzeug vor der Ummeldung geblitzt wird oder einen Unfall hat?",
        a: "Ab Übergabe trägt der Käufer Gefahr und Haftung; die Vorlage verpflichtet ihn zur unverzüglichen Ummeldung und stellt den Verkäufer von Bußgeldern und Kosten frei. Nach außen bleibt der Verkäufer aber Halter, bis die Zulassungsstelle die Veräußerung kennt – deshalb die Veräußerungsanzeige sofort absenden.",
      },
      {
        q: "Muss der Kaufpreis Umsatzsteuer enthalten?",
        a: "Verkauft ein regelbesteuerter Unternehmer aus dem Betriebsvermögen, ja: Netto plus 19 % USt, der Käufer kann die Vorsteuer ziehen. Kleinunternehmer weisen keine USt aus. Bei Fahrzeugen, die ohne Vorsteuerabzug angeschafft wurden (z. B. von privat), kann die Differenzbesteuerung angewendet werden; dann darf die USt nicht offen ausgewiesen werden.",
      },
    ],
    seo: {
      title: "Kfz-Kaufvertrag gewerblich Vorlage (Word & PDF) | GründerX",
      description:
        "Kfz-Kaufvertrag für Firmenwagen zwischen Unternehmern: FIN, Kilometerstand, HU, Unfallfreiheit, Papiere, Ummeldung, Umsatzsteuer, Haftung, Übergabeprotokoll.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/kaufvertrag-firmenwagen"),
  },
  {
    slug: "kaufvertrag-geschaeftsausstattung",
    titel: "Kaufvertrag Geschäftsausstattung / Inventar",
    kurz: "Kauf von Büroausstattung, Ladeneinrichtung oder Inventar als Paket gegen Pauschalpreis, gekauft wie besichtigt, mit Abholung und Eigentumsvorbehalt.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Geschaeftsausstattung",
    wofuer: [
      "Du übernimmst Möbel, IT, Küchen- oder Ladeneinrichtung von einem Unternehmen, das schließt oder umzieht",
      "Du verkaufst dein altes Büro-Inventar komplett an einen Nachfolger oder Nachmieter",
      "Wenn viele Einzelteile als Paket zu einem Pauschalpreis den Eigentümer wechseln sollen",
      "Wenn klar sein muss, wer wann abbaut, abholt und die Räume besenrein hinterlässt",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand (Inventarliste als Anlage)",
      "§ 2 Pauschalpreis und Zahlung",
      "§ 3 Zustand – gekauft wie besichtigt",
      "§ 4 Übergabe, Demontage und Abholung",
      "§ 5 Eigentumsvorbehalt und Gefahrübergang",
      "§ 6 Rechte Dritter, Software und Daten",
      "§ 7 Gewährleistung und Haftung",
      "§ 8 Schlussbestimmungen",
      "Anlage 1 Inventarliste (Muster)",
    ],
    hinweise: [
      "Die Inventarliste ist der wichtigste Teil. Jede Position mit Stückzahl, Bezeichnung, Seriennummer bei IT und Zustand erfassen und beidseitig abzeichnen – sonst gibt es Streit, was zum Pauschalpreis gehörte.",
      "Geleaste oder finanzierte Geräte (Drucker, Kaffeemaschine, Telefonanlage) gehören dem Leasinggeber, nicht dem Verkäufer. Vorher die Verträge prüfen; die Vorlage lässt den Verkäufer das zusichern.",
      "Software-Lizenzen auf den Rechnern sind oft nicht übertragbar (Volumenlizenzen, Abo). Geräte vor Übergabe zurücksetzen, Daten löschen und Lizenzen gesondert regeln.",
      "Beim Verkauf aus dem Betriebsvermögen fällt Umsatzsteuer an; Pauschalpreis also netto oder brutto klar angeben. Bei einem kompletten Betrieb kann eine nicht steuerbare Geschäftsveräußerung im Ganzen (§ 1 Abs. 1a UStG) vorliegen – dann Steuerberater fragen.",
    ],
    faqs: [
      {
        q: "Was bedeutet „gekauft wie besichtigt“ rechtlich?",
        a: "Der Käufer akzeptiert den Zustand, den er bei der Besichtigung sehen konnte, und der Verkäufer haftet nicht für sichtbare oder bei der Besichtigung erkennbare Mängel. Zwischen Unternehmern lässt sich die Gewährleistung für gebrauchtes Inventar darüber hinaus weitgehend ausschließen, nicht aber für arglistig verschwiegene Mängel und zugesicherte Eigenschaften.",
      },
      {
        q: "Wer baut die Einrichtung ab und wer haftet für Schäden an den Räumen?",
        a: "Die Vorlage sieht vor, dass der Käufer auf eigene Kosten demontiert und abholt und dabei entstehende Schäden an den Räumen ersetzt. Alternativ kann der Verkäufer die Demontage übernehmen; dann sollte ein Übergabetermin an der Rampe vereinbart werden. Wichtig ist der Termin, weil Mietverträge oft eine besenreine Rückgabe zu einem festen Datum verlangen.",
      },
      {
        q: "Wie regeln wir Positionen, die bei Abholung fehlen oder kaputt sind?",
        a: "Für den Pauschalpreis wird die Anlage 1 bei Übergabe abgehakt. Fehlt etwas, das in der Liste steht, mindert sich der Preis um den dort angegebenen Einzelwert. Deshalb sollte die Liste je Position einen Wert enthalten, auch wenn insgesamt pauschal gezahlt wird.",
      },
      {
        q: "Kann ich Inventar vom Vormieter ohne Vertrag einfach übernehmen?",
        a: "Besser nicht. Ohne Vertrag ist unklar, ob der Vormieter überhaupt Eigentümer war, was zum Preis gehört und wer für die Entsorgung nicht gewollter Teile zahlt. Der Vermieter kann außerdem verlangen, dass Einbauten entfernt werden; das sollte zwischen Käufer, Verkäufer und Vermieter abgestimmt sein.",
      },
    ],
    seo: {
      title: "Kaufvertrag Inventar Vorlage kostenlos (Word) | GründerX",
      description:
        "Kaufvertrag für Geschäftsausstattung: Inventarliste, Pauschalpreis, gekauft wie besichtigt, Abholung, Eigentumsvorbehalt. Kostenlos als Word & PDF.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/kaufvertrag-geschaeftsausstattung"),
  },
  {
    slug: "kaufvertrag-maschine",
    titel: "Kaufvertrag gebrauchte Maschine / Anlage",
    kurz: "Kaufvertrag über eine gebrauchte Maschine oder Anlage mit Spezifikation, Probelauf, Abnahme, Demontage, Transport, Dokumentation und begrenzter Gewährleistung.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Maschine",
    wofuer: [
      "Du kaufst eine gebrauchte Produktionsmaschine, CNC-Anlage, Verpackungslinie, Druckmaschine oder Werkstattausrüstung",
      "Du verkaufst eine Maschine aus deinem Betrieb an einen anderen Unternehmer",
      "Wenn Probelauf und Abnahme vor der Zahlung des Restkaufpreises vereinbart werden sollen",
      "Wenn klar sein muss, wer Demontage, Verladung, Transport und Wiederaufbau trägt",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand und technische Spezifikation",
      "§ 2 Kaufpreis und Zahlungsplan",
      "§ 3 Probelauf und Abnahme",
      "§ 4 Demontage, Verladung und Transport",
      "§ 5 Dokumentation, CE-Kennzeichnung und Betriebsanleitung",
      "§ 6 Gefahrübergang und Eigentumsvorbehalt",
      "§ 7 Gewährleistung (begrenzt)",
      "§ 8 Haftung",
      "§ 9 Schlussbestimmungen",
      "Abnahmeprotokoll",
    ],
    hinweise: [
      "Eine gebrauchte Maschine, die vor 1995 in Verkehr gebracht wurde, hat oft keine CE-Kennzeichnung. Beim Weiterverkauf innerhalb der EU gilt sie nicht als neues Inverkehrbringen; der Betreiber muss sie aber nach Betriebssicherheitsverordnung sicher betreiben. Die Vorlage regelt, wer das verantwortet.",
      "Wer eine Maschine wesentlich verändert oder umbaut, kann als Hersteller gelten und muss eine neue Konformitätsbewertung durchführen. Umbauten vor dem Kauf im Vertrag festhalten.",
      "Der Probelauf muss unter realen Bedingungen stattfinden (eigenes Material, Nennleistung). Ein Lauf im Leerlauf beweist wenig. Lege messbare Abnahmekriterien fest.",
      "Transport und Demontage von Maschinen sind Haftungsfallen: Schäden beim Ausbau, Kranarbeiten und Transportschäden. Klare Zuweisung und Transportversicherung in der Vorlage ausfüllen.",
    ],
    faqs: [
      {
        q: "Wann sollte der Restkaufpreis fällig werden?",
        a: "Erst nach erfolgreicher Abnahme beim Verkäufer, spätestens aber vor Beginn der Demontage. So sieht es die Vorlage vor. Der Käufer sieht die Maschine laufen, bevor er den Großteil zahlt; der Verkäufer gibt sie nicht aus der Hand, bevor das Geld da ist. Eine Abnahme nach Wiederaufbau beim Käufer ist riskant, weil Transport und Montage Fehlerquellen sind, die der Verkäufer nicht kontrolliert.",
      },
      {
        q: "Was passiert, wenn der Probelauf fehlschlägt?",
        a: "Die Vorlage gibt dem Verkäufer das Recht, innerhalb einer Frist nachzubessern und den Probelauf zu wiederholen. Scheitert auch der zweite Lauf, kann der Käufer vom Vertrag zurücktreten und erhält die Anzahlung zurück. Welche Messwerte als Erfolg gelten, legt Anlage 1 fest – ohne messbare Kriterien ist jeder Streit vorprogrammiert.",
      },
      {
        q: "Welche Unterlagen muss der Verkäufer mitliefern?",
        a: "Betriebsanleitung in deutscher Sprache, Konformitätserklärung und CE-Kennzeichnung (soweit vorhanden), Schaltpläne, Wartungs- und Prüfnachweise, Ersatzteillisten und Software mit Lizenznachweis. Fehlt die Betriebsanleitung, muss der Käufer sie als Betreiber selbst beschaffen oder erstellen lassen, was teuer wird.",
      },
      {
        q: "Kann die Gewährleistung für eine gebrauchte Maschine ganz ausgeschlossen werden?",
        a: "Unter Unternehmern in einem individuell verhandelten Vertrag weitgehend ja. Die Vorlage wählt einen Mittelweg: Die Leistungswerte aus dem Probelauf sind zugesichert, weitere Gewährleistung wird auf wenige Monate begrenzt oder ausgeschlossen. Nicht ausschließbar bleiben Arglist, Vorsatz, grobe Fahrlässigkeit und Personenschäden.",
      },
    ],
    seo: {
      title: "Kaufvertrag gebrauchte Maschine Vorlage kostenlos | GründerX",
      description:
        "Kaufvertrag für gebrauchte Maschinen und Anlagen: Spezifikation, Probelauf und Abnahme, Demontage, Transport, CE, Betriebsanleitung, begrenzte Gewährleistung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/kaufvertrag-maschine"),
  },
  {
    slug: "kaufvertrag-warenlager",
    titel: "Kaufvertrag Warenbestand / Restposten",
    kurz: "Kaufvertrag über einen kompletten Warenbestand oder Restposten mit Inventurliste, Stück- oder Pauschalpreis, Zustand, MHD, Markenrechten und Rücknahmeausschluss.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Warenlager",
    wofuer: [
      "Du kaufst einen Lagerbestand, eine Insolvenzware oder Restposten von einem Händler oder Hersteller",
      "Du verkaufst dein Restlager bei Sortimentswechsel, Shop-Schließung oder Umzug an einen Aufkäufer",
      "Wenn der Preis je Stück oder pauschal für den Gesamtbestand vereinbart werden soll",
      "Wenn geklärt werden muss, ob die Ware mit Markenrechten frei weiterverkauft werden darf",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand und Inventurliste",
      "§ 2 Kaufpreis (Stückpreise oder Pauschale)",
      "§ 3 Zustand, Mindesthaltbarkeit und Kennzeichnung",
      "§ 4 Markenrechte und Weiterverkauf",
      "§ 5 Lieferung, Übergabe und Mengenabweichungen",
      "§ 6 Eigentumsvorbehalt und Gefahrübergang",
      "§ 7 Gewährleistung, Rügepflicht und Rücknahmeausschluss",
      "§ 8 Haftung",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Markenware darf nur weiterverkauft werden, wenn sie mit Zustimmung des Markeninhabers in der EU bzw. im EWR in Verkehr gebracht wurde (Erschöpfung, § 24 MarkenG). Graue Importe oder Ware mit Vertriebsbindung können Abmahnungen auslösen – die Vorlage lässt den Verkäufer die Herkunft zusichern.",
      "Lebensmittel, Kosmetik und Nahrungsergänzung: Mindesthaltbarkeit, Chargen und Rückverfolgbarkeit sind Pflicht. Ware mit abgelaufenem MHD darf als Lebensmittel nur mit Einschränkungen verkauft werden; bei Verbrauchsdatum gar nicht.",
      "Beim Kauf aus einer Insolvenz verkauft der Insolvenzverwalter regelmäßig unter vollständigem Gewährleistungsausschluss. Dann unbedingt selbst besichtigen und Stichproben ziehen.",
      "Prüfe die Produktsicherheit: Elektronik ohne CE, Spielzeug ohne Konformität oder Produkte mit laufendem Rückruf darfst du als Händler nicht in Verkehr bringen, egal wie günstig der Einkauf war.",
    ],
    faqs: [
      {
        q: "Stückpreis oder Pauschalpreis – was ist besser?",
        a: "Stückpreise sind fair, wenn die Mengen noch nicht sicher sind: Gezahlt wird, was bei der Übergabe gezählt wird. Ein Pauschalpreis ist einfacher und günstiger für den Käufer, wenn er den Bestand kennt, trägt aber das Risiko von Fehlmengen. Die Vorlage bietet beide Varianten und regelt Abweichungen bei der Übergabezählung.",
      },
      {
        q: "Darf ich die gekaufte Markenware auf Amazon oder eBay weiterverkaufen?",
        a: "Grundsätzlich ja, wenn die Ware vom Markeninhaber oder mit seiner Zustimmung im EWR in Verkehr gebracht wurde. Vertriebsbindungen des Herstellers wirken nur zwischen Hersteller und seinem Vertragshändler, nicht gegen dich. Problematisch sind Ware von außerhalb des EWR, Fälschungen und Produkte mit entfernten Seriennummern. Lass dir die Herkunft und Lieferkette belegen.",
      },
      {
        q: "Was gilt, wenn bei der Lieferung weniger Ware da ist als auf der Liste?",
        a: "Bei Stückpreisen zahlst du nur die tatsächlich gelieferte Menge. Beim Pauschalpreis mindert sich der Preis anteilig, wenn die Abweichung über der in der Vorlage festgelegten Toleranz liegt. Entscheidend ist die gemeinsame Zählung bei der Übergabe und die Rüge nach § 377 HGB innerhalb der vereinbarten Frist.",
      },
      {
        q: "Kann ich unverkäufliche Ware an den Verkäufer zurückgeben?",
        a: "Nein, die Vorlage schließt die Rücknahme aus. Der Käufer trägt das Absatzrisiko; dafür kauft er günstig. Rückgaberechte bestehen nur bei Mängeln, die rechtzeitig gerügt wurden, oder wenn der Verkäufer Zusicherungen zur Herkunft oder Verkehrsfähigkeit verletzt hat.",
      },
    ],
    seo: {
      title: "Kaufvertrag Warenbestand Vorlage kostenlos | GründerX",
      description:
        "Kaufvertrag für Warenbestand und Restposten: Inventurliste, Stückpreise oder Pauschale, Zustand und MHD, Markenrechte, Lieferung, Rücknahme ausgeschlossen.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/kaufvertrag-warenlager"),
  },
  {
    slug: "kaufvertrag-domain",
    titel: "Domain-Kaufvertrag",
    kurz: "Kaufvertrag über eine Internet-Domain mit Übertragung per AuthCode, Zahlung über Treuhand, Garantien gegen Rechte Dritter und Übertragung von Marke und Logo.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Domain",
    wofuer: [
      "Du kaufst eine .de-, .com- oder andere Domain von einem privaten oder gewerblichen Inhaber",
      "Du verkaufst eine Domain, die du nicht mehr brauchst, und willst Zug um Zug gegen Zahlung übertragen",
      "Wenn zur Domain eine Marke, ein Logo oder Social-Media-Handles mitübertragen werden sollen",
      "Wenn die Zahlung über einen Treuhandservice abgesichert werden soll",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand",
      "§ 2 Kaufpreis und Zahlung (Treuhand)",
      "§ 3 Übertragung der Domain",
      "§ 4 Mitwirkung und Fristen",
      "§ 5 Garantien des Verkäufers",
      "§ 6 Marke, Logo und Kennzeichen",
      "§ 7 Haftung und Freistellung",
      "§ 8 Vertraulichkeit",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Eine Domain ist kein Eigentum, sondern ein Vertragsverhältnis mit der Registrierungsstelle (DENIC, ICANN-Registrare). Übertragen wird der Inhaberwechsel; die Vorlage regelt deshalb AuthCode, Providerwechsel und die Änderung der Inhaberdaten.",
      "Prüfe vor dem Kauf im DPMA- und EUIPO-Register, ob die Domain fremde Marken verletzt. Eine Domain zu kaufen, die einer bekannten Marke gleicht, kann trotz Kaufvertrag eine Abmahnung auslösen – die Garantie des Verkäufers hilft dir dann nur, wenn er zahlungsfähig ist.",
      "Zahle nie den vollen Kaufpreis vorab an unbekannte Verkäufer. Treuhanddienste (Escrow) oder die Zug-um-Zug-Übertragung über den Registrar sind der sichere Weg.",
      "Bei .de-Domains gibt es keine Haltefrist nach dem Inhaberwechsel; bei vielen generischen Endungen (.com, .net) sperrt der Registrar den Transfer nach einem Inhaberwechsel für 60 Tage. Das beeinflusst, wann du den Provider wechseln kannst.",
    ],
    faqs: [
      {
        q: "Wie läuft die Übertragung einer Domain technisch ab?",
        a: "Der Verkäufer beantragt bei seinem Registrar den AuthCode (bei .de: AuthInfo) und übermittelt ihn dem Käufer. Der Käufer stellt bei seinem Provider den Transferantrag mit diesem Code; dabei werden die Inhaberdaten auf den Käufer geändert. Alternativ ändern beide beim selben Registrar nur den Inhaber (Push). Die Vorlage sieht beide Wege vor.",
      },
      {
        q: "Was ist, wenn die Domain bereits für eine Marke eines Dritten steht?",
        a: "Dann riskierst du als neuer Inhaber Unterlassungs- und Schadensersatzansprüche, auch wenn du die Domain gutgläubig gekauft hast. Die Vorlage lässt den Verkäufer garantieren, dass ihm keine Rechte Dritter bekannt sind und keine Abmahnungen oder Dispute-Einträge vorliegen; bei Verletzung muss er dich freistellen. Eigene Recherche in den Markenregistern bleibt trotzdem Pflicht.",
      },
      {
        q: "Was ist ein DENIC-Dispute und warum steht er in der Vorlage?",
        a: "Ein Dispute-Eintrag bei der DENIC ist eine Sperre, die ein Dritter beantragen kann, der eigene Rechte an einer .de-Domain geltend macht. Sie verhindert die Übertragung an jemand anderen als den Antragsteller. Besteht ein Dispute, kann der Verkäufer die Domain gar nicht übertragen – deshalb garantiert er in der Vorlage, dass keiner vorliegt.",
      },
      {
        q: "Fällt beim Domainverkauf Umsatzsteuer an?",
        a: "Verkauft ein Unternehmer, ist der Verkauf eine sonstige Leistung und grundsätzlich umsatzsteuerpflichtig; bei einem Käufer im EU-Ausland mit USt-IdNr greift das Reverse-Charge-Verfahren. Verkauft eine Privatperson einmalig, fällt keine Umsatzsteuer an. Einkommensteuerlich kann ein privater Verkauf innerhalb eines Jahres nach Anschaffung als privates Veräußerungsgeschäft steuerpflichtig sein.",
      },
    ],
    seo: {
      title: "Domain-Kaufvertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Domain-Kaufvertrag als kostenlose Vorlage: Übertragung per AuthCode, Treuhand-Zahlung, Garantien gegen Rechte Dritter, Marke und Logo. Word, PDF, Text.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/kaufvertrag-domain"),
  },
  {
    slug: "kaufvertrag-website-onlineshop",
    titel: "Kaufvertrag Website / Online-Shop (Asset-Kauf)",
    kurz: "Kaufvertrag über eine Website oder einen Online-Shop als Asset-Kauf: Domain, Inhalte, Kundendaten nach DSGVO, Social-Accounts, Lieferanten, Zugänge, Einarbeitung und Wettbewerbsverbot.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Website-Onlineshop",
    wofuer: [
      "Du kaufst eine laufende Website, einen Blog, ein Affiliate-Projekt oder einen Online-Shop von einem Einzelunternehmer",
      "Du verkaufst dein Webprojekt und willst Domain, Inhalte, Konten und Lieferanten sauber übergeben",
      "Wenn Kundendaten mit übertragen werden und du wissen musst, was die DSGVO erlaubt",
      "Wenn der Verkäufer nach dem Verkauf nicht mit einem ähnlichen Projekt konkurrieren soll",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand (Asset-Liste)",
      "§ 2 Kaufpreis und Zahlung",
      "§ 3 Stichtag und Übergang",
      "§ 4 Übertragung von Domain, Hosting, Inhalten und Konten",
      "§ 5 Kundendaten und Datenschutz",
      "§ 6 Lieferanten, Verträge und laufende Bestellungen",
      "§ 7 Einarbeitung und Unterstützung",
      "§ 8 Garantien des Verkäufers",
      "§ 9 Wettbewerbsverbot",
      "§ 10 Haftung",
      "§ 11 Schlussbestimmungen",
      "Anlage 1 Asset-Liste und Zugänge (Muster)",
    ],
    hinweise: [
      "Kundendaten dürfen nicht einfach „mitverkauft“ werden. Beim Asset-Kauf ist der Käufer ein neuer Verantwortlicher; die Übermittlung braucht eine Rechtsgrundlage. Praxislösung: Vertragsdaten laufender Kunden gehen über (Art. 6 Abs. 1 lit. b DSGVO), Newsletter-Abonnenten nur mit erneuter Einwilligung oder nach Widerspruchslösung mit Information – die Vorlage trennt das.",
      "Plattform-Konten (Amazon, eBay, Etsy, Meta, Google, Shopify) sind laut AGB oft nicht übertragbar. Prüfe die Bedingungen und plane eine Neuanmeldung oder die Übertragung über den Plattform-Support ein.",
      "Inhalte sind nur verkäuflich, wenn der Verkäufer die Nutzungsrechte hat. Stockfotos, Texte von Freelancern und Themes haben eigene Lizenzen, die nicht automatisch übergehen. Die Vorlage lässt den Verkäufer die Rechtekette garantieren.",
      "Übernimmst du den gesamten Geschäftsbetrieb mit Mitarbeitern, gilt § 613a BGB (Übergang der Arbeitsverhältnisse) – dann brauchst du den Unternehmenskaufvertrag (Asset Deal), nicht diese Vorlage.",
    ],
    faqs: [
      {
        q: "Wie wird der Kaufpreis einer Website üblicherweise berechnet?",
        a: "Meist als Vielfaches des monatlichen Gewinns der letzten zwölf Monate, bei Content-Seiten etwa das 20- bis 40-fache, bei Shops mit Lager und Werbekosten eher weniger. Entscheidend ist, dass du die Zahlen vor dem Kauf prüfst: Analytics-Zugang, Zahlungsanbieter-Auszüge, Steuerbescheide. Die Vorlage lässt den Verkäufer Umsatz und Gewinn garantieren.",
      },
      {
        q: "Was passiert mit Bestellungen, die am Stichtag noch offen sind?",
        a: "Die Vorlage ordnet sie dem Verkäufer zu: Er liefert bestellte Ware, erstattet und bearbeitet Retouren aus Verkäufen vor dem Stichtag. Alternativ kann der Käufer die Abwicklung übernehmen und bekommt dafür die Erlöse bzw. eine Pauschale. Wichtig ist eine klare Grenze, sonst streiten beide über jede Rücksendung.",
      },
      {
        q: "Wie lange darf das Wettbewerbsverbot für den Verkäufer gelten?",
        a: "Rechtsprechung akzeptiert beim Unternehmensverkauf in der Regel bis zu zwei Jahre, räumlich und sachlich beschränkt auf das verkaufte Geschäft. Länger oder weiter gefasst ist das Verbot angreifbar. Die Vorlage sieht 24 Monate und eine Vertragsstrafe vor, die bei Verstoß die Beweisnot des Käufers löst.",
      },
      {
        q: "Brauche ich für den Website-Kauf einen Notar?",
        a: "Nein. Ein Asset-Kauf von Domain, Inhalten, Konten und Warenbestand ist formfrei; die Schriftform dient dem Beweis. Ein Notar wird erst nötig, wenn GmbH-Anteile oder Grundstücke übertragen werden. Markenumschreibungen laufen über das DPMA oder EUIPO ohne Notar.",
      },
    ],
    seo: {
      title: "Kaufvertrag Website & Online-Shop Vorlage | GründerX",
      description:
        "Kaufvertrag für Website oder Online-Shop: Domain, Inhalte, Kundendaten nach DSGVO, Social-Accounts, Lieferanten, Zugänge, Einarbeitung, Wettbewerbsverbot.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/kaufvertrag-website-onlineshop"),
  },
  {
    slug: "unternehmenskaufvertrag-asset-deal",
    titel: "Unternehmenskaufvertrag (Asset Deal)",
    kurz: "Kaufvertrag über ein Kleinunternehmen als Asset Deal: Vermögensgegenstände, Verträge, Arbeitsverhältnisse nach § 613a BGB, Kaufpreisaufteilung, Garantien, § 25 HGB, Stichtag, Wettbewerbsverbot.",
    kategorie: "kauf",
    dateiname: "Unternehmenskaufvertrag-Asset-Deal",
    wofuer: [
      "Du übernimmst ein Einzelunternehmen, einen Laden, eine Werkstatt, eine Agentur oder ein Handwerksgeschäft mit Inventar, Kunden und Mitarbeitern",
      "Du verkaufst dein Unternehmen, ohne eine GmbH-Beteiligung zu übertragen (kein Share Deal)",
      "Wenn Mitarbeiter übergehen und der Übergang nach § 613a BGB sauber abgewickelt werden muss",
      "Wenn die Haftung für Altverbindlichkeiten nach § 25 HGB ausgeschlossen werden soll",
    ],
    enthaelt: [
      "§ 1 Verkauf und Übertragung der Vermögensgegenstände",
      "§ 2 Übernahme von Verträgen",
      "§ 3 Übergang der Arbeitsverhältnisse (§ 613a BGB)",
      "§ 4 Nicht übernommene Gegenstände und Verbindlichkeiten",
      "§ 5 Kaufpreis und Aufteilung",
      "§ 6 Stichtag, Übergabe und Abgrenzung",
      "§ 7 Garantien des Verkäufers",
      "§ 8 Rechtsfolgen bei Garantieverletzung",
      "§ 9 Haftung nach § 25 HGB und Firmenfortführung",
      "§ 10 Wettbewerbsverbot",
      "§ 11 Mitwirkung nach dem Stichtag",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Wer ein Handelsgeschäft unter der bisherigen Firma fortführt, haftet für alle Altverbindlichkeiten (§ 25 Abs. 1 HGB). Der Ausschluss wirkt gegenüber Dritten nur, wenn er ins Handelsregister eingetragen und bekanntgemacht oder dem Dritten mitgeteilt wird (§ 25 Abs. 2 HGB). Die Vorlage sieht beides vor – ohne Eintragung ist die Klausel nach außen wertlos.",
      "Arbeitsverhältnisse gehen beim Betriebsübergang automatisch über (§ 613a BGB). Kündigungen wegen des Übergangs sind unwirksam. Jeder Mitarbeiter muss vorher schriftlich informiert werden und hat einen Monat Widerspruchsrecht; eine fehlerhafte Information lässt die Frist nicht laufen.",
      "Die Kaufpreisaufteilung auf Anlagegüter, Warenbestand und Firmenwert bestimmt die Abschreibung beim Käufer und die Besteuerung beim Verkäufer. Vorher mit dem Steuerberater abstimmen; das Finanzamt prüft unrealistische Aufteilungen.",
      "Steuerschulden des Betriebs können den Erwerber treffen (§ 75 AO, Haftung für Betriebssteuern des letzten Jahres vor Übereignung). Unbedenklichkeitsbescheinigung des Finanzamts und Freistellung im Vertrag sind Pflicht.",
      "Grundstücke und GmbH-Anteile brauchen den Notar. Diese Vorlage ist für Betriebe ohne eigenen Grundbesitz; Mietverträge werden mit Zustimmung des Vermieters übernommen.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Asset Deal und Share Deal?",
        a: "Beim Asset Deal kaufst du einzelne Vermögensgegenstände, Verträge und Rechte des Unternehmens; jeder Gegenstand muss einzeln übertragen werden, Verträge brauchen die Zustimmung des Vertragspartners. Beim Share Deal kaufst du die Anteile an der Gesellschaft (GmbH, UG); das Unternehmen bleibt mit allen Verträgen und Risiken unverändert. Für Einzelunternehmen und GbR gibt es nur den Asset Deal.",
      },
      {
        q: "Gehen die Mitarbeiter automatisch mit?",
        a: "Ja. Übernimmst du den Betrieb oder einen abgrenzbaren Betriebsteil, trittst du nach § 613a BGB in alle bestehenden Arbeitsverhältnisse ein, mit Betriebszugehörigkeit, Gehalt, Urlaubsansprüchen und Kündigungsschutz. Der Verkäufer oder du musst jeden Mitarbeiter vorher schriftlich über Zeitpunkt, Grund, Folgen und geplante Maßnahmen informieren. Mitarbeiter können innerhalb eines Monats widersprechen und bleiben dann beim Verkäufer.",
      },
      {
        q: "Wie schütze ich mich als Käufer vor versteckten Schulden?",
        a: "Durch drei Dinge: eine Prüfung vor dem Kauf (Due Diligence: Bilanzen, Verträge, Steuerbescheide, offene Rechtsstreitigkeiten), den Haftungsausschluss nach § 25 Abs. 2 HGB mit Eintragung ins Handelsregister und Garantien des Verkäufers mit Freistellung und einem Kaufpreiseinbehalt oder Treuhandbetrag, aus dem du Ansprüche befriedigen kannst. Die Vorlage enthält alle drei Bausteine.",
      },
      {
        q: "Brauche ich für den Asset Deal einen Notar?",
        a: "Nur wenn ein Grundstück oder GmbH-Anteile mitverkauft werden. Ein Unternehmen ohne Grundbesitz lässt sich privatschriftlich übertragen. Die Handelsregisteranmeldung des Haftungsausschlusses und einer Firmenfortführung muss aber notariell beglaubigt werden. Wegen der Komplexität solltest du den fertigen Vertrag vor Unterschrift anwaltlich prüfen lassen.",
      },
    ],
    seo: {
      title: "Unternehmenskaufvertrag Vorlage (Asset Deal) | GründerX",
      description:
        "Unternehmenskaufvertrag (Asset Deal) als Vorlage: Vermögensgegenstände, Verträge, § 613a BGB, Kaufpreisaufteilung, Garantien, § 25 HGB, Wettbewerbsverbot.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/unternehmenskaufvertrag-asset-deal"),
  },
  {
    slug: "kaufvertrag-amazon-fba-business",
    titel: "Kaufvertrag Amazon-FBA-Geschäft",
    kurz: "Kaufvertrag über ein Amazon-FBA-Geschäft: ASINs und Listings, Marke und Brand Registry, Lagerbestand bei Amazon, Seller-Konto nach Amazon-Regeln, Earn-out, Lieferanten und Garantien zu Umsätzen und Bewertungen.",
    kategorie: "kauf",
    dateiname: "Kaufvertrag-Amazon-FBA-Business",
    wofuer: [
      "Du kaufst eine Private-Label-Marke mit Amazon-Listings, Lagerbestand und Lieferanten von einem anderen Seller",
      "Du verkaufst dein FBA-Geschäft und willst Marke, Listings, Bestand und Lieferanten geordnet übergeben",
      "Wenn offen ist, ob das Seller-Konto übertragen wird oder die ASINs in ein bestehendes Konto des Käufers wandern",
      "Wenn ein Teil des Kaufpreises vom künftigen Umsatz abhängen soll (Earn-out)",
    ],
    enthaelt: [
      "§ 1 Kaufgegenstand (Marke, ASINs, Bestand, Lieferanten)",
      "§ 2 Kaufpreis, Lagerbestand und Earn-out",
      "§ 3 Stichtag und Abgrenzung",
      "§ 4 Übertragung des Seller-Kontos oder der Listings",
      "§ 5 Marke, Brand Registry und Inhalte",
      "§ 6 Lagerbestand bei Amazon und beim Lieferanten",
      "§ 7 Lieferanten und Produktkonformität",
      "§ 8 Garantien des Verkäufers",
      "§ 9 Übergangsphase und Einarbeitung",
      "§ 10 Wettbewerbsverbot",
      "§ 11 Haftung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Amazon erlaubt die Übertragung eines Seller-Kontos nach seinen Bedingungen grundsätzlich nicht ohne Zustimmung von Amazon; in der Praxis wird bei Unternehmensverkäufen der Inhaberwechsel über den Seller Support beantragt oder die Listings werden auf ein Konto des Käufers übertragen. Die Vorlage sieht beide Wege vor und macht den Kaufpreis teilweise davon abhängig.",
      "Bewertungen hängen an der ASIN, nicht am Konto. Bei Übertragung der Listings in ein anderes Konto bleiben Produktbewertungen erhalten, Verkäuferbewertungen (Seller Feedback) nicht. Die Brand Registry muss auf den Käufer als neuen Markeninhaber umgeschrieben werden – das setzt die Markenumschreibung beim DPMA/EUIPO voraus.",
      "Wenn der Verkäufer Bewertungen gekauft, Rabatt-gegen-Bewertung-Aktionen gefahren oder Mehrfachkonten betrieben hat, droht dem Käufer die Kontosperre. Lass dir das ausdrücklich garantieren und prüfe die Account-Health-Historie vor dem Kauf.",
      "Verantwortlicher für Produktsicherheit, Verpackungslizenzierung (LUCID), Elektro- und Batteriegesetz, GPSR-Angaben und Importzoll wird ab Stichtag der Käufer. Fehlende Registrierungen sind kein Problem des Verkäufers mehr, sondern deins.",
      "Lagerbestand bei Amazon wird meist zum Einstandspreis gesondert bezahlt. Vereinbare, wie Fehlmengen, beschädigte Einheiten und Bestand im Transit (Inbound) gezählt werden.",
    ],
    faqs: [
      {
        q: "Kann ich ein Amazon-Seller-Konto überhaupt kaufen?",
        a: "Die Amazon-Bedingungen untersagen die Übertragung des Kontos ohne Amazons Zustimmung. Bei einem echten Unternehmensverkauf kann der Inhaberwechsel über den Seller Support beantragt werden: Neue rechtliche Daten, Bankverbindung, Steuernummern und Ausweise werden hinterlegt und geprüft. Scheitert das, bleibt die Übertragung der ASINs auf ein Konto des Käufers. Die Vorlage knüpft die zweite Kaufpreisrate an den erfolgreichen Weg.",
      },
      {
        q: "Wie wird der Kaufpreis für ein FBA-Geschäft üblicherweise bestimmt?",
        a: "Als Vielfaches des jährlichen bereinigten Gewinns (SDE), bei kleinen Marken etwa das 2- bis 4-fache, zuzüglich des Lagerbestands zum Einstandspreis. Earn-outs, also Nachzahlungen abhängig vom Umsatz nach dem Verkauf, gleichen Unsicherheiten über Ranking und Saisonalität aus. Die Vorlage sieht eine Grundzahlung, eine Rate nach Übertragung und einen optionalen Earn-out vor.",
      },
      {
        q: "Was passiert mit Rückerstattungen und Retouren aus Verkäufen vor dem Stichtag?",
        a: "Amazon bucht Erstattungen und Rücknahmen auf dem Konto, über das verkauft wurde. Die Vorlage ordnet alle Erlöse und Belastungen aus Bestellungen vor dem Stichtag dem Verkäufer zu und regelt eine Abrechnung nach 60 bis 90 Tagen, wenn die meisten Retourenfristen abgelaufen sind. Bei Kontoübertragung muss der Verkäufer dem Käufer diese Belastungen erstatten.",
      },
      {
        q: "Gehen die Lieferantenverträge automatisch auf mich über?",
        a: "Nein. Lieferanten in China oder der EU sind an keinen Vertrag mit dir gebunden. Die Vorlage verpflichtet den Verkäufer, dich vorzustellen, Konditionen, Formen und Werkzeuge zu übergeben und bestehende Bestellungen zu überleiten. Werkzeuge und Formen beim Lieferanten sollten ausdrücklich als dein Eigentum bestätigt werden.",
      },
    ],
    seo: {
      title: "Amazon FBA Kaufvertrag Vorlage kostenlos | GründerX",
      description:
        "Kaufvertrag für ein Amazon-FBA-Geschäft: ASINs, Marke und Brand Registry, Lagerbestand, Seller-Konto nach Amazon-Regeln, Earn-out, Lieferanten, Garantien.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/kaufvertrag-amazon-fba-business"),
  },
  {
    slug: "rahmenliefervertrag",
    titel: "Rahmenliefervertrag mit Lieferant / Hersteller",
    kurz: "Rahmenvertrag für wiederkehrende Warenlieferungen: Produkte, Preise und Preisanpassung, Einzelabrufe, Lieferfristen, Qualität und Muster, optionale Exklusivität, Laufzeit und Kündigung.",
    kategorie: "kauf",
    dateiname: "Rahmenliefervertrag",
    wofuer: [
      "Du beziehst regelmäßig Ware von einem Hersteller oder Großhändler und willst feste Konditionen statt Einzelverhandlung je Bestellung",
      "Du bist Hersteller oder Importeur und lieferst wiederkehrend an einen Händler oder Online-Shop",
      "Wenn Preise für eine Laufzeit gesichert und Preisanpassungen geregelt werden sollen",
      "Wenn Qualität über freigegebene Muster definiert und Exklusivität für ein Gebiet oder einen Kanal vereinbart werden soll",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand und Produkte",
      "§ 2 Einzelabrufe und Bestellabwicklung",
      "§ 3 Preise, Preisanpassung und Zahlung",
      "§ 4 Lieferung, Lieferfristen und Gefahrübergang",
      "§ 5 Qualität, Muster und Produktkonformität",
      "§ 6 Untersuchung, Rüge und Gewährleistung",
      "§ 7 Exklusivität und Mindestabnahme (optional)",
      "§ 8 Eigentumsvorbehalt",
      "§ 9 Haftung und Produkthaftung",
      "§ 10 Geheimhaltung und Schutzrechte",
      "§ 11 Laufzeit und Kündigung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Ein Rahmenvertrag verpflichtet für sich allein noch zu keiner Lieferung; erst der Einzelabruf ist der Kaufvertrag. Wer Planungssicherheit will, braucht Mindestabnahme- oder Mindestliefermengen mit Folgen bei Unterschreitung – die Vorlage sieht das als Option vor.",
      "Preisgleitklauseln müssen transparent sein: an einen objektiven Index (Rohstoff, Frachtindex, Energie) gekoppelt und beidseitig wirkend. Einseitige Preiserhöhungsrechte in Formularverträgen sind angreifbar.",
      "Exklusivität kann kartellrechtlich relevant sein (Vertikal-GVO): Alleinbezugspflichten über fünf Jahre und Beschränkungen des passiven Verkaufs oder des Online-Vertriebs sind problematisch. Bei Marktanteilen über 30 % Rat einholen.",
      "Als Importeur in die EU wirst du zum Inverkehrbringer mit Herstellerpflichten (Produktsicherheit, CE, GPSR-Angaben, Verpackungs- und Elektrogesetz). Lass dir vom Lieferanten die Konformitätsdokumente vertraglich zusichern.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Rahmenvertrag und Kaufvertrag?",
        a: "Der Rahmenvertrag legt die Bedingungen für alle künftigen Geschäfte fest: Produkte, Preise, Lieferfristen, Qualität, Haftung. Der einzelne Kaufvertrag kommt erst mit jedem Abruf zustande. Vorteil: Keine Nachverhandlung bei jeder Bestellung und keine AGB-Schlacht, weil der Rahmen Vorrang hat. Die Vorlage regelt ausdrücklich, dass abweichende AGB nicht gelten.",
      },
      {
        q: "Wie sichere ich mich als Käufer gegen Lieferausfälle ab?",
        a: "Durch verbindliche Lieferfristen mit Vertragsstrafe oder pauschaliertem Schadensersatz bei Verzug, eine Pflicht des Lieferanten zur frühzeitigen Information bei Engpässen, ein Recht zum Deckungskauf auf Kosten des Lieferanten und ein außerordentliches Kündigungsrecht bei wiederholten Verstößen. Die Vorlage enthält diese Bausteine; die Höhe der Pauschale solltest du mit dem Lieferanten verhandeln.",
      },
      {
        q: "Was bedeutet Freigabemuster (Golden Sample)?",
        a: "Ein Muster, das beide Seiten als Referenz für die vereinbarte Beschaffenheit abzeichnen. Jede spätere Lieferung muss diesem Muster entsprechen; Abweichungen sind Mängel. Das ist bei Private-Label-Ware, Verpackungen und Textilien der wirksamste Qualitätsmaßstab, weil Spezifikationen auf Papier selten alles erfassen.",
      },
      {
        q: "Kann ich den Rahmenvertrag jederzeit kündigen?",
        a: "Das hängt von der vereinbarten Laufzeit ab. Die Vorlage sieht eine feste Erstlaufzeit mit automatischer Verlängerung und ordentlicher Kündigungsfrist vor; die außerordentliche Kündigung aus wichtigem Grund bleibt immer möglich. Bereits abgerufene Lieferungen werden auch nach Kündigung noch abgewickelt.",
      },
    ],
    seo: {
      title: "Rahmenliefervertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Rahmenliefervertrag mit Lieferant oder Hersteller: Produkte, Preisanpassung, Einzelabrufe, Lieferfristen, Muster, Exklusivität, Laufzeit, Kündigung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/rahmenliefervertrag"),
  },
  {
    slug: "kommissionsvertrag",
    titel: "Kommissionsvertrag",
    kurz: "Kommissionsvertrag nach §§ 383 ff. HGB: Kommissionsware, Provision, Abrechnung, Eigentum bleibt beim Kommittenten, Rückgabe, Haftung und Laufzeit.",
    kategorie: "kauf",
    dateiname: "Kommissionsvertrag",
    wofuer: [
      "Du gibst Ware in ein Ladengeschäft, einen Concept Store oder an einen Online-Händler, der sie in eigenem Namen für dich verkauft",
      "Du nimmst als Händler Ware von Marken, Designern oder Herstellern in Kommission, ohne sie vorab zu kaufen",
      "Wenn die Ware bis zum Verkauf im Eigentum des Herstellers bleiben soll und nur verkaufte Stücke abgerechnet werden",
      "Wenn Provision, Abrechnungsrhythmus, Rückgabe unverkaufter Ware und Haftung für Verlust klar geregelt sein müssen",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand und Kommissionsware",
      "§ 2 Pflichten des Kommissionärs",
      "§ 3 Verkaufspreise und Weisungen",
      "§ 4 Provision",
      "§ 5 Abrechnung und Auszahlung",
      "§ 6 Eigentum und Herausgabe",
      "§ 7 Lieferung, Lagerung, Rückgabe",
      "§ 8 Haftung für Verlust und Beschädigung",
      "§ 9 Gewährleistung gegenüber Kunden",
      "§ 10 Laufzeit und Kündigung",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Beim Kommissionsgeschäft verkauft der Kommissionär im eigenen Namen, aber für fremde Rechnung (§ 383 HGB). Gegenüber dem Endkunden ist er Verkäufer mit allen Gewährleistungspflichten; im Innenverhältnis trägt der Kommittent das Absatzrisiko. Die Vorlage regelt, wer Gewährleistungskosten am Ende trägt.",
      "Die Ware bleibt Eigentum des Kommittenten, bis sie an den Kunden verkauft ist. Das schützt in der Insolvenz des Händlers (Aussonderung) – aber nur, wenn die Ware eindeutig als Kommissionsware gekennzeichnet und in Listen geführt wird.",
      "Umsatzsteuerlich gilt die Lieferung an den Kommissionär erst mit dem Verkauf an den Kunden als ausgeführt (Kommissionsgeschäft, § 3 Abs. 3 UStG). Der Kommissionär rechnet dem Kommittenten per Gutschrift ab; das Verfahren mit dem Steuerberater abstimmen.",
      "Der Kommissionär hat gesetzlich ein Pfandrecht an der Kommissionsware für seine Provision und Aufwendungen (§ 397 HGB). Wer das als Kommittent nicht will, muss es ausdrücklich ausschließen – die Vorlage sieht das vor.",
    ],
    faqs: [
      {
        q: "Was unterscheidet Kommission von Konsignation und vom normalen Kauf?",
        a: "Beim Kauf erwirbt der Händler die Ware und trägt das Absatzrisiko. Bei der Kommission bleibt die Ware Eigentum des Herstellers; der Händler verkauft sie im eigenen Namen und bekommt eine Provision, unverkaufte Ware geht zurück. Das Konsignationslager ist eine Variante, bei der der Abnehmer die Ware erst bei Entnahme kauft; dort wird der Abnehmer selbst Eigentümer, bei der Kommission nie.",
      },
      {
        q: "Wer haftet, wenn Kommissionsware im Laden gestohlen oder beschädigt wird?",
        a: "Gesetzlich haftet der Kommissionär für die Sorgfalt eines ordentlichen Kaufmanns (§ 384 HGB); zufälligen Untergang trägt grundsätzlich der Eigentümer, also der Kommittent. Die Vorlage überträgt die Gefahr für Verlust, Diebstahl und Beschädigung ab Übernahme auf den Kommissionär und verpflichtet ihn zur Versicherung, denn er hat die Ware unter Kontrolle.",
      },
      {
        q: "Wie wird abgerechnet?",
        a: "Der Kommissionär erstellt in festen Abständen, in der Vorlage monatlich, eine Verkaufsliste mit allen verkauften Stücken, Verkaufspreisen und einbehaltener Provision und zahlt den Erlös abzüglich Provision aus. Umsatzsteuerlich erfolgt die Abrechnung per Gutschrift. Der Kommittent darf die Abrechnung durch Einsicht in die Verkaufsaufzeichnungen prüfen.",
      },
      {
        q: "Darf der Kommissionär die Ware billiger verkaufen als vereinbart?",
        a: "Nein, nicht ohne Zustimmung. Unterschreitet er den vorgegebenen Mindestpreis, muss er dem Kommittenten die Differenz ersetzen (§ 386 HGB). Die Vorlage sieht einen vom Kommittenten festgelegten Verkaufspreis bzw. Mindestpreis und eine Regelung für Rabattaktionen vor.",
      },
    ],
    seo: {
      title: "Kommissionsvertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Kommissionsvertrag nach §§ 383 ff. HGB als Vorlage: Kommissionsware, Provision, Abrechnung, Eigentum beim Kommittenten, Rückgabe, Haftung, Laufzeit.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/kommissionsvertrag"),
  },
];
