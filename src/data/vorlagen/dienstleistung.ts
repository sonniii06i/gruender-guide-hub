import { VORLAGEN_HINWEIS, type Vorlage } from "./types";

// Dienstleistung & Projekte: Freelancer, Beratung, Agentur, Werkvertrag,
// Handelsvertreter, Kooperation, Subunternehmer, Virtuelle Assistenz.
// Rechtsstand: BGB (§§ 611 ff., 631 ff.), HGB (§§ 84 ff.), SGB IV (§ 7a),
// UWG/MStV (Werbekennzeichnung), DSGVO (Art. 28). Stand 2026-10.

export const VORLAGEN_DIENSTLEISTUNG: Vorlage[] = [
  {
    slug: "dienstleistungsvertrag",
    titel: "Dienstleistungsvertrag (B2B)",
    kurz: "Allgemeiner Dienstvertrag nach § 611 BGB zwischen Unternehmen: Leistung, Stundensatz oder Pauschale, Abrechnung, Haftung, Kündigung.",
    kategorie: "dienstleistung",
    dateiname: "Dienstleistungsvertrag-B2B",
    wofuer: [
      "Du erbringst laufende Leistungen für einen Firmenkunden, ohne einen bestimmten Erfolg zu schulden (Support, Pflege, Betreuung, Buchhaltungsvorbereitung)",
      "Du beauftragst selbst einen Dienstleister und willst Vergütung, Abrechnung und Kündigung sauber festhalten",
      "Abrechnung nach Stunden oder als monatliche Pauschale, mit Nachweis über Stundenzettel",
      "Als Grundlage, wenn später Einzelaufträge oder ein Rahmenvertrag folgen sollen",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand und Leistungsbeschreibung",
      "§ 2 Keine Erfolgsschuld, Weisungsfreiheit",
      "§ 3 Leistungsort, Leistungszeit, Ansprechpartner",
      "§ 4 Mitwirkungspflichten des Auftraggebers",
      "§ 5 Vergütung (Stundensatz oder Pauschale) und Nebenkosten",
      "§ 6 Abrechnung, Zahlung, Verzug",
      "§ 7 Haftung",
      "§ 8 Geheimhaltung und Datenschutz",
      "§ 9 Laufzeit und Kündigung",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Der Dienstvertrag schuldet Tätigkeit, kein Ergebnis. Wenn dein Kunde ein fertiges Werk erwartet (Website, Gutachten, Software), passt der Werkvertrag mit Abnahme und Gewährleistung besser.",
      "Bei B2B-Verträgen gilt der gesetzliche Verzugszins von 9 Prozentpunkten über dem Basiszinssatz und eine Pauschale von 40 EUR (§ 288 BGB). Die Vorlage nutzt das, verzichte nicht leichtfertig darauf.",
      "Eine Haftungsbegrenzung darf nie Vorsatz, grobe Fahrlässigkeit oder Schäden an Leben, Körper und Gesundheit ausschließen (§ 309 Nr. 7 BGB) – sonst ist die ganze Klausel unwirksam.",
      "Wenn eine einzelne Person dauerhaft, allein und weisungsgebunden für dich arbeitet, droht Scheinselbstständigkeit. Dann hilft kein Vertragstext, sondern nur eine andere Arbeitsweise oder ein Arbeitsvertrag.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Dienstvertrag und Werkvertrag?",
        a: "Beim Dienstvertrag (§ 611 BGB) schuldest du das Bemühen, also die Tätigkeit selbst. Beim Werkvertrag (§ 631 BGB) schuldest du ein Ergebnis, das der Kunde abnimmt und bei Mängeln nachbessern lassen kann. Stundenabrechnung ohne Abnahme spricht für einen Dienstvertrag.",
      },
      {
        q: "Kann ich einen Dienstleistungsvertrag jederzeit kündigen?",
        a: "Nur, wenn ihr das vereinbart habt oder das Gesetz es zulässt. Die Vorlage sieht eine ordentliche Kündigungsfrist vor und lässt die außerordentliche Kündigung aus wichtigem Grund unberührt. Ohne Regelung gelten die Fristen des § 621 BGB, die sich nach dem Abrechnungszeitraum richten.",
      },
      {
        q: "Muss ich Stundenzettel führen?",
        a: "Bei Abrechnung nach Aufwand ja, sonst kannst du im Streit die Stunden nicht beweisen. Die Vorlage verlangt einen Tätigkeitsnachweis mit Datum, Dauer und Tätigkeit, den der Kunde innerhalb einer Frist beanstanden kann. Danach gilt er als anerkannt.",
      },
      {
        q: "Brauche ich für B2B-Verträge AGB oder reicht dieser Vertrag?",
        a: "Dieser Vertrag reicht für den Einzelfall. Wenn du dieselben Bedingungen vielen Kunden stellst, sind sie rechtlich AGB und unterliegen der Inhaltskontrolle nach §§ 305 ff. BGB, auch zwischen Unternehmen. Besonders Haftungs- und Zahlungsklauseln müssen dann angemessen bleiben.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Dienstleistungsvertrag brauchst",
        text: `Ein Dienstleistungsvertrag passt, wenn du für einen Firmenkunden laufend tätig bist, ohne ein fertiges Ergebnis zu versprechen: Betreuung eines Onlineshops, technischer Support, Pflege von Produktdaten, vorbereitende Buchhaltung oder Beratung nach Stunden. Typische Fälle sind die Agentur, die monatlich die Website eines Kunden pflegt, der IT-Dienstleister, der die Systeme eines Mittelständlers betreut, oder der Freelancer, der seine Stunden gegenüber einem Startup abrechnet.

Auch als Auftraggeber brauchst du das Muster, sobald du selbst einen Dienstleister beauftragst und Vergütung, Abrechnung und Kündigung festhalten willst, bevor die erste Rechnung kommt. Die Vorlage ist auf das Verhältnis zwischen Unternehmen zugeschnitten; für Verbraucher als Kunden gelten zusätzliche Schutzvorschriften, die dieser Mustervertrag nicht abbildet.`,
      },
      {
        titel: "Was muss in einen Dienstleistungsvertrag?",
        text: `Ein brauchbarer Dienstvertrag beantwortet fünf Fragen: Was wird getan, wo und wann, was kostet es, wer haftet wofür, und wie kommt man wieder auseinander. Die Vorlage setzt das in zehn Paragrafen um:

- § 1 Vertragsgegenstand: die Leistung so konkret, dass ein Dritter versteht, was dazugehört; Einzelheiten in Anlage 1
- § 2 Keine Erfolgsschuld und Weisungsfreiheit des Auftragnehmers
- § 3 Leistungsort, Stundenumfang, Erreichbarkeit, Ansprechpartner
- § 4 Mitwirkungspflichten des Auftraggebers mit Fristen für Zugänge und Freigaben
- § 5 Vergütung als Stundensatz oder Monatspauschale, Reisekosten, Preisanpassung
- § 6 Abrechnung mit Tätigkeitsnachweis, Zahlungsziel, Verzugszinsen
- § 7 Haftung mit Begrenzung auf den vertragstypischen Schaden
- § 8 Geheimhaltung und Auftragsverarbeitung nach Art. 28 DSGVO
- § 9 Laufzeit, Kündigung, Rückgabe von Unterlagen
- § 10 Schlussbestimmungen mit Textform, salvatorischer Klausel und Gerichtsstand

Nutzungsrechte fehlen bewusst, weil ein reiner Dienstvertrag meist keine Werke hervorbringt. Entstehen doch Texte, Grafiken oder Code, ergänze die Rechteklausel aus dem Werkvertrag oder dem Freelancer-Vertrag.`,
      },
      {
        titel: "Dienstleistungsvertrag Muster ausfüllen: Schritt für Schritt",
        text: `Lade die Vorlage als Word-Datei, PDF oder Text herunter und arbeite die Platzhalter in eckigen Klammern von oben nach unten ab. Im Kopf trägst du beide Parteien mit Rechtsform, Anschrift und vertretungsberechtigter Person ein. In § 1 ersetzt du das Beispiel durch deine Leistung und legst die Leistungsbeschreibung als Anlage 1 bei; entscheide, ob Subunternehmer zustimmungspflichtig sein sollen, und streiche die optionale Klammer sonst.

In § 3 trägst du Leistungsort, ungefähren Stundenumfang und Erreichbarkeit ein. Feste Reaktionszeiten gehören nur hinein, wenn du sie wirklich einhalten kannst. In § 5 wählst du Variante A (Stundensatz mit Abrechnungstakt) oder Variante B (Pauschale mit Stundenkontingent und Mehrstundensatz) und löschst die andere; Kleinunternehmer übernehmen den Satz zu § 19 UStG. In § 6 legst du Abrechnungsrhythmus, Beanstandungsfrist und Zahlungsziel fest, in § 7 die Haftungsobergrenze, in § 9 Beginn, Kündigungsfrist und ersten Kündigungstermin. Zum Schluss Gerichtsstand, Anlagenliste, Ort, Datum und zwei Unterschriften.`,
      },
      {
        titel: "Typische Fehler im Dienstvertrag und wie du sie vermeidest",
        text: `Der häufigste Fehler ist die falsche Vertragsart: Wer eine fertige Website, ein Gutachten oder eine Software liefern soll, schuldet ein Werk mit Abnahme und Gewährleistung. Gerichte entscheiden nach dem tatsächlichen Inhalt, nicht nach der Überschrift. Prüfe deshalb ehrlich, ob der Kunde ein Ergebnis erwartet.

Zweiter Klassiker ist die Leistungsbeschreibung aus zwei Sätzen. Dann streitet ihr später, ob der Newsletter-Versand zum Shop-Support gehört. Schreib in Anlage 1 auf, was enthalten ist, und nenne Beispiele für Zusatzleistungen.

Dritter Punkt ist die Scheinselbstständigkeit: Arbeitet eine einzelne Person dauerhaft, fast ausschließlich und zu festen Zeiten für dich, hilft § 2 der Vorlage nicht, weil die Deutsche Rentenversicherung die gelebte Praxis prüft. Weitere Fehler: Stunden ohne Tätigkeitsnachweis abrechnen, Haftung pauschal ausschließen und damit die ganze Klausel verlieren, den gesetzlichen Verzugszins streichen oder die Kündigungsfrist vergessen, sodass die kurzen Fristen des § 621 BGB gelten.`,
      },
      {
        titel: "Rechtliche Grundlagen: Dienstvertrag nach § 611 BGB",
        text: `Der Dienstvertrag ist in den §§ 611 ff. BGB geregelt. Geschuldet ist die Dienstleistung selbst, nicht ihr Erfolg; die Vergütung wird nach § 614 BGB nach der Leistung fällig, bei Abrechnung nach Zeitabschnitten jeweils am Ende des Abschnitts. Fehlt eine vertragliche Kündigungsregel, gelten die Fristen des § 621 BGB, die sich nach dem Vergütungszeitraum richten. Bei Diensten höherer Art, die auf besonderem Vertrauen beruhen, erlaubt § 627 BGB zusätzlich eine jederzeitige Kündigung.

Für den Zahlungsverzug zwischen Unternehmern gilt § 288 BGB: Verzugszinsen von neun Prozentpunkten über dem Basiszinssatz und die Pauschale von 40 Euro nach Absatz 5. Verwendest du den Vertrag mehrfach mit gleichem Wortlaut, sind seine Klauseln Allgemeine Geschäftsbedingungen und unterliegen auch im B2B-Verkehr der Inhaltskontrolle der §§ 305 ff. BGB; § 309 Nr. 7 BGB verbietet den Haftungsausschluss für Personenschäden und grobe Fahrlässigkeit. Ob jemand selbstständig oder beschäftigt ist, bestimmt § 7 Abs. 1 SGB IV nach Weisungsgebundenheit und Eingliederung. Verarbeitet der Auftragnehmer personenbezogene Daten für dich, verlangt Art. 28 DSGVO einen Auftragsverarbeitungsvertrag.`,
      },
      {
        titel: "Wann die kostenlose Vorlage nicht reicht",
        text: `Die Vorlage deckt die laufende Zusammenarbeit zwischen zwei Unternehmen ab. Hol dir anwaltlichen Rat, wenn der Kunde ein Verbraucher ist, wenn Service-Level mit Gutschriften oder Vertragsstrafen vereinbart werden sollen, wenn der Vertrag Auslandsbezug hat oder wenn es um Summen geht, bei denen eine unwirksame Haftungsklausel existenzbedrohend wäre. Dasselbe gilt, wenn du den Vertrag als Standard für viele Kunden einsetzt: Dann lohnt eine AGB-Prüfung, weil eine unwirksame Klausel ersatzlos entfällt.

Arbeitet eine Einzelperson in einem Umfang, der einer Vollzeitstelle nahekommt, beantragt ihr vor Beginn gemeinsam die Statusfeststellung nach § 7a SGB IV bei der Deutschen Rentenversicherung Bund. Für Projekte mit festem Ergebnis nimm den Werkvertrag, für wiederkehrende Einzelaufträge den Rahmenvertrag mit Einzelabrufen. GründerX stellt dir das Muster als Software bereit und ersetzt keine Rechtsberatung; die Verantwortung für den Einzelfall bleibt bei dir.`,
      },
    ],
    seo: {
      title: "Dienstleistungsvertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Dienstleistungsvertrag nach § 611 BGB als kostenlose Vorlage: Leistungsbeschreibung, Stundensatz oder Pauschale, Abrechnung, Haftung, Kündigung.",
    },
    stand: "2026-10",
    text: `Dienstleistungsvertrag

zwischen

[Firma / Name des Auftraggebers], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftraggeber“ –

und

[Firma / Name des Auftragnehmers], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftragnehmer“ –

– gemeinsam „die Parteien“ –

§ 1 Vertragsgegenstand und Leistungsbeschreibung
(1) Der Auftragnehmer erbringt für den Auftraggeber folgende Dienstleistungen: [genaue Beschreibung, z. B. „laufende Betreuung und Pflege des Onlineshops [Domain], Pflege von Produktdaten, technischer Support für die Mitarbeiter des Auftraggebers per E-Mail und Telefon an Werktagen“].
(2) Einzelheiten zu Art, Umfang und Qualität der Leistungen ergeben sich aus der Leistungsbeschreibung in Anlage 1, die Bestandteil dieses Vertrags ist. Bei Widersprüchen geht dieser Vertrag der Anlage vor.
(3) Leistungen, die in Absatz 1 und Anlage 1 nicht genannt sind, sind nicht geschuldet. Zusätzliche Leistungen werden gesondert in Textform beauftragt und nach § 5 vergütet.
(4) Der Auftragnehmer ist berechtigt, zur Erfüllung seiner Pflichten qualifizierte Mitarbeiter oder Subunternehmer einzusetzen. Er bleibt für deren Leistungen verantwortlich wie für eigene. [Optional: Der Einsatz von Subunternehmern bedarf der vorherigen Zustimmung des Auftraggebers in Textform.]

§ 2 Keine Erfolgsschuld, Weisungsfreiheit
(1) Dieser Vertrag ist ein Dienstvertrag im Sinne der §§ 611 ff. BGB. Der Auftragnehmer schuldet die sorgfältige Erbringung der vereinbarten Tätigkeit nach dem Stand der Technik und den anerkannten Regeln seines Fachgebiets, nicht die Herbeiführung eines bestimmten wirtschaftlichen oder technischen Erfolgs.
(2) Der Auftragnehmer ist in der Gestaltung seiner Tätigkeit, insbesondere bei Arbeitszeit, Arbeitsort und Arbeitsweise, frei. Fachliche Vorgaben des Auftraggebers zum Leistungsinhalt bleiben unberührt. Der Auftragnehmer ist nicht in die Betriebsorganisation des Auftraggebers eingegliedert.
(3) Der Auftragnehmer darf für weitere Auftraggeber tätig sein, soweit § 8 nicht entgegensteht.

§ 3 Leistungsort, Leistungszeit, Ansprechpartner
(1) Die Leistungen werden [in den Räumen des Auftragnehmers / remote / in den Räumen des Auftraggebers in [Ort], soweit die Aufgabe es erfordert] erbracht.
(2) Der Auftragnehmer stellt seine Leistungen in einem Umfang von etwa [Stunden] Stunden pro [Woche / Monat] zur Verfügung. Erreichbarkeit: [z. B. „Mo–Fr 9–17 Uhr per E-Mail und Telefon; Reaktion auf Anfragen in der Regel innerhalb eines Werktags“]. Feste Reaktions- oder Wiederherstellungszeiten sind nur geschuldet, wenn sie in Anlage 1 ausdrücklich vereinbart sind.
(3) Ansprechpartner des Auftraggebers ist [Vorname Nachname, E-Mail, Telefon], Ansprechpartner des Auftragnehmers ist [Vorname Nachname, E-Mail, Telefon]. Beide sind berechtigt, verbindliche Erklärungen zur Durchführung dieses Vertrags abzugeben, nicht jedoch Vertragsänderungen.

§ 4 Mitwirkungspflichten des Auftraggebers
(1) Der Auftraggeber stellt dem Auftragnehmer alle für die Leistung erforderlichen Informationen, Unterlagen, Zugänge und Freigaben rechtzeitig und unentgeltlich zur Verfügung, insbesondere [z. B. „Zugänge zum Shopsystem, zur Warenwirtschaft und zum Ticketsystem“].
(2) Der Auftraggeber benennt Entscheidungen und Freigaben innerhalb von [z. B. 3] Werktagen nach Anfrage. Verzögert sich die Leistung, weil der Auftraggeber seine Mitwirkung nicht oder verspätet erbringt, verschieben sich vereinbarte Termine entsprechend; Mehraufwand wird nach § 5 Abs. 1 vergütet.
(3) Der Auftraggeber ist für die Sicherung seiner Daten selbst verantwortlich, soweit die Datensicherung nicht ausdrücklich Teil der Leistungsbeschreibung ist.

§ 5 Vergütung und Nebenkosten
(1) Die Vergütung beträgt [Variante A: [Betrag] EUR je Stunde; angefangene Stunden werden im [15-Minuten]-Takt abgerechnet] [Variante B: eine monatliche Pauschale von [Betrag] EUR für die in Anlage 1 beschriebenen Leistungen bis zu [Stunden] Stunden im Monat; darüber hinausgehende Stunden werden mit [Betrag] EUR je Stunde abgerechnet]. Alle Beträge verstehen sich zuzüglich der gesetzlichen Umsatzsteuer. [Bei Kleinunternehmern: Der Auftragnehmer weist gemäß § 19 UStG keine Umsatzsteuer aus.]
(2) Reisekosten, Fahrtzeiten und Auslagen werden nur erstattet, wenn sie vorab in Textform freigegeben wurden. Fahrten werden mit [Betrag] EUR je Kilometer, Fahrtzeiten mit [z. B. 50] % des Stundensatzes abgerechnet; Bahn- und Flugtickets sowie Übernachtungen gegen Beleg.
(3) Die Vergütung kann vom Auftragnehmer erstmals nach Ablauf von [z. B. 12] Monaten mit einer Ankündigungsfrist von [z. B. 2] Monaten angepasst werden. Widerspricht der Auftraggeber, kann der Auftragnehmer den Vertrag zum Zeitpunkt des Wirksamwerdens der Anpassung kündigen.

§ 6 Abrechnung, Zahlung, Verzug
(1) Der Auftragnehmer rechnet [monatlich zum Monatsende / nach Abschluss der Leistung] ab. Bei Abrechnung nach Aufwand fügt er einen Tätigkeitsnachweis mit Datum, Dauer und Beschreibung der Tätigkeit bei. Beanstandet der Auftraggeber den Nachweis nicht innerhalb von [z. B. 10] Werktagen nach Zugang in Textform, gilt er als anerkannt; der Auftragnehmer weist in der Rechnung auf diese Folge hin.
(2) Rechnungen sind innerhalb von [z. B. 14] Tagen nach Zugang ohne Abzug zahlbar. [Optional: Bei einer Pauschalvergütung ist die Zahlung jeweils im Voraus bis zum [3.] Werktag des Monats fällig.]
(3) Bei Zahlungsverzug schuldet der Auftraggeber Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz sowie die Pauschale von 40 EUR nach § 288 Abs. 5 BGB. Die Geltendmachung eines weiteren Schadens bleibt vorbehalten.
(4) Befindet sich der Auftraggeber mit mehr als einer Rechnung in Verzug, kann der Auftragnehmer nach Ankündigung in Textform mit einer Frist von [z. B. 7] Tagen seine Leistungen bis zum Ausgleich zurückhalten.
(5) Der Auftraggeber kann nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen aufrechnen.

§ 7 Haftung
(1) Der Auftragnehmer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
(2) Bei leichter Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht), also einer Pflicht, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags erst ermöglicht und auf deren Einhaltung der Auftraggeber regelmäßig vertrauen darf. In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt, höchstens auf [Betrag, z. B. die Vergütung der letzten 12 Monate] EUR je Schadensfall.
(3) Für den Verlust von Daten haftet der Auftragnehmer nur bis zu dem Betrag, der bei ordnungsgemäßer und regelmäßiger Datensicherung durch den Auftraggeber zur Wiederherstellung erforderlich gewesen wäre.
(4) Die Haftung nach dem Produkthaftungsgesetz und für zugesicherte Eigenschaften bleibt unberührt. Die Beschränkungen gelten auch zugunsten der Mitarbeiter und Erfüllungsgehilfen des Auftragnehmers.
(5) [Optional: Der Auftragnehmer unterhält eine Betriebs-/Vermögensschadenhaftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR und weist diese auf Verlangen nach.]

§ 8 Geheimhaltung und Datenschutz
(1) Beide Parteien behandeln alle ihnen im Rahmen dieses Vertrags bekannt werdenden Geschäfts- und Betriebsgeheimnisse sowie als vertraulich gekennzeichneten Informationen der anderen Partei vertraulich und nutzen sie nur zur Durchführung dieses Vertrags. Die Pflicht gilt für [z. B. 3] Jahre über das Vertragsende hinaus.
(2) Ausgenommen sind Informationen, die öffentlich bekannt sind oder werden, ohne dass die empfangende Partei dies zu vertreten hat, die ihr bereits rechtmäßig bekannt waren oder die sie aufgrund gesetzlicher oder behördlicher Anordnung offenlegen muss.
(3) Verarbeitet der Auftragnehmer personenbezogene Daten im Auftrag des Auftraggebers, schließen die Parteien vor Beginn der Verarbeitung einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Beide Parteien verpflichten ihre Mitarbeiter auf die Vertraulichkeit.
(4) Der Auftragnehmer darf den Auftraggeber nach dessen Zustimmung in Textform als Referenzkunden mit Name und Logo nennen.

§ 9 Laufzeit und Kündigung
(1) Der Vertrag beginnt am [Datum] und läuft auf unbestimmte Zeit. [Alternative: Der Vertrag hat eine feste Laufzeit bis zum [Datum] und verlängert sich um jeweils [z. B. 12] Monate, wenn er nicht mit einer Frist von [z. B. 3] Monaten zum Laufzeitende gekündigt wird.]
(2) Jede Partei kann den Vertrag mit einer Frist von [z. B. 3] Monaten zum Monatsende kündigen, erstmals zum [Datum].
(3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt insbesondere vor, wenn der Auftraggeber mit zwei Monatsvergütungen in Verzug ist, eine Partei wesentliche Vertragspflichten trotz Abmahnung mit Fristsetzung weiter verletzt oder über das Vermögen einer Partei das Insolvenzverfahren eröffnet oder mangels Masse abgelehnt wird.
(4) Jede Kündigung bedarf der Schriftform. Bis zum Vertragsende erbrachte Leistungen werden nach § 5 vergütet. Nach Vertragsende übergibt der Auftragnehmer alle Unterlagen, Zugangsdaten und Arbeitsergebnisse des Auftraggebers und löscht verbleibende Kopien, soweit keine gesetzlichen Aufbewahrungspflichten bestehen.

§ 10 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform. Das gilt auch für die Aufhebung dieses Textformerfordernisses. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist, soweit beide Parteien Kaufleute, juristische Personen des öffentlichen Rechts oder öffentlich-rechtliche Sondervermögen sind, [Ort].
(4) Folgende Anlagen sind Bestandteil dieses Vertrags: Anlage 1 Leistungsbeschreibung, [Anlage 2 Auftragsverarbeitungsvertrag].
(5) Jede Partei erhält eine unterschriebene Ausfertigung dieses Vertrags.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Auftraggeber


______________________________
[Vorname Nachname], für den Auftragnehmer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "werkvertrag",
    titel: "Werkvertrag",
    kurz: "Werkvertrag nach § 631 BGB für ein konkretes Ergebnis: Leistungsbeschreibung, Abnahme, Vergütung, Nacherfüllung, Fristen, Änderungen, Nutzungsrechte.",
    kategorie: "dienstleistung",
    dateiname: "Werkvertrag",
    wofuer: [
      "Du lieferst ein fertiges Ergebnis: Website, Software-Modul, Logo, Video, Gutachten, Übersetzung oder handwerkliches Werk",
      "Du beauftragst einen Dienstleister mit einem festen Ergebnis und willst Abnahme und Gewährleistung klar geregelt haben",
      "Festpreis oder Aufwandsschätzung mit Obergrenze, Zahlung in Raten nach Meilensteinen",
      "Wenn Nutzungsrechte am Ergebnis (Urheberrecht) auf den Kunden übergehen sollen",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand (das Werk)",
      "§ 2 Leistungsbeschreibung und Ausführung",
      "§ 3 Termine und Fristen",
      "§ 4 Mitwirkung des Bestellers",
      "§ 5 Änderungswünsche (Change Requests)",
      "§ 6 Abnahme",
      "§ 7 Vergütung und Zahlung",
      "§ 8 Mängelrechte und Nacherfüllung",
      "§ 9 Nutzungsrechte",
      "§ 10 Haftung",
      "§ 11 Kündigung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Ohne Abnahme keine Fälligkeit und keine Verjährung: Die Abnahme ist der wichtigste Zeitpunkt im Werkvertrag. Die Vorlage regelt Frist, Protokoll und die fiktive Abnahme nach § 640 Abs. 2 BGB.",
      "Der Besteller darf einen Werkvertrag jederzeit frei kündigen (§ 648 BGB), muss dann aber die vereinbarte Vergütung abzüglich ersparter Aufwendungen zahlen. Als Unternehmer solltest du das wissen, als Kunde auch.",
      "Nutzungsrechte an urheberrechtlich geschützten Werken gehen nicht automatisch über. Was nicht ausdrücklich eingeräumt ist, bleibt beim Urheber (§ 31 UrhG, Zweckübertragungslehre). Die Vorlage räumt die Rechte ausdrücklich ein.",
      "Bei Bauleistungen gelten zusätzlich die §§ 650a ff. BGB und ggf. die VOB/B, bei Verbrauchern als Besteller das Verbraucherbauvertragsrecht. Diese Vorlage ist für Werke zwischen Unternehmen gedacht.",
    ],
    faqs: [
      {
        q: "Wann liegt ein Werkvertrag vor und wann ein Dienstvertrag?",
        a: "Entscheidend ist, ob ein Erfolg geschuldet wird. Eine fertige Website, ein Logo oder ein Gutachten sind Werke; eine laufende Beratung oder Betreuung nach Stunden ist ein Dienst. Beim Werkvertrag haftest du für Mängel am Ergebnis, beim Dienstvertrag nur für sorgfältige Arbeit.",
      },
      {
        q: "Was passiert, wenn der Kunde die Abnahme verweigert?",
        a: "Der Besteller darf die Abnahme nur bei wesentlichen Mängeln verweigern. Setzt du ihm nach Fertigstellung eine angemessene Frist zur Abnahme und nennt er innerhalb dieser Frist keinen konkreten Mangel, gilt das Werk nach § 640 Abs. 2 BGB als abgenommen. Die Vorlage legt diese Frist fest.",
      },
      {
        q: "Wie lange hafte ich für Mängel?",
        a: "Die gesetzliche Verjährung beträgt bei Werken zwei Jahre ab Abnahme, bei Bauwerken fünf Jahre (§ 634a BGB). Zwischen Unternehmen kann die Frist vertraglich auf ein Jahr verkürzt werden, nicht aber für Vorsatz, Arglist und Personenschäden.",
      },
      {
        q: "Darf ich bei Änderungswünschen mehr Geld verlangen?",
        a: "Ja, wenn der Änderungswunsch über die vereinbarte Leistungsbeschreibung hinausgeht. Die Vorlage sieht ein Change-Request-Verfahren vor: Du schätzt Mehraufwand und Terminverschiebung, der Kunde gibt in Textform frei. Ohne Freigabe bleibt es beim alten Umfang.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Werkvertrag brauchst",
        text: `Ein Werkvertrag ist die richtige Wahl, wenn am Ende etwas Fertiges steht, das dein Kunde prüfen und abnehmen kann: eine Website, ein Software-Modul, ein Logo, ein Video, eine Übersetzung, ein Gutachten oder ein handwerkliches Werk wie die Beschichtung eines Hallenbodens. Du versprichst nicht nur Bemühen, sondern ein Ergebnis mit vereinbarten Eigenschaften.

Typische Situationen: Eine Webagentur baut für ein Startup den Online-Auftritt zum Festpreis. Ein Grafiker liefert ein Corporate Design in drei Meilensteinen. Ein Entwickler erstellt eine Schnittstelle nach Pflichtenheft. Als Auftraggeber brauchst du das Muster, wenn du ein festes Ergebnis einkaufst und sicherstellen willst, dass du bei Mängeln Nachbesserung verlangen und die Nutzungsrechte bekommst. Die Vorlage ist für Werke zwischen Unternehmen gedacht; Bauverträge mit Verbrauchern folgen eigenen Regeln.`,
      },
      {
        titel: "Was muss in einen Werkvertrag?",
        text: `Beim Werkvertrag entscheidet die Qualität der Leistungsbeschreibung darüber, ob ihr später über Mängel streitet oder nicht. Die Vorlage gliedert alles Nötige in zwölf Paragrafen:

- § 1 und § 2 Vertragsgegenstand und Leistungsbeschreibung: das Werk so genau, dass Abweichungen messbar sind, mit Pflichtenheft oder Angebot als Anlage 1 und einer Rangfolge der Dokumente
- § 3 Termine und Meilensteine, optional mit gedeckelter Vertragsstrafe
- § 4 Mitwirkung des Bestellers: Inhalte, Zugänge, Freigabefristen, Rechte an beigestelltem Material
- § 5 Änderungswünsche als Change-Request-Verfahren mit Prüfung, Angebot und Freigabe in Textform
- § 6 Abnahme mit Prüffrist, Protokoll, fiktiver Abnahme nach § 640 Abs. 2 BGB und Teilabnahmen
- § 7 Vergütung als Festpreis oder Aufwand mit Obergrenze, Zahlungsplan nach Meilensteinen, Eigentumsvorbehalt
- § 8 Mängelrechte, Nacherfüllung und Verjährung
- § 9 Nutzungsrechte am Werk, Referenznutzung, Open-Source-Komponenten, Quellcode
- § 10 Haftung, § 11 Kündigung nach § 648 und § 648a BGB, § 12 Schlussbestimmungen

Ohne Abnahmeregelung fehlt dem Vertrag das Herzstück: Erst die Abnahme macht die Vergütung fällig und startet die Gewährleistungsfrist.`,
      },
      {
        titel: "Werkvertrag Muster richtig ausfüllen",
        text: `Beginne mit den Parteien und der Bezeichnung des Werks in § 1; das Muster nennt Beispiele für Website, Logo und Bodenbeschichtung, die du durch dein Projekt ersetzt. Lege das Angebot oder Pflichtenheft als Anlage 1 bei und trage Nummer und Datum ein. In § 3 setzt du Beginn, Meilensteine und den Termin der Bereitstellung zur Abnahme; entscheide, ob die Termine verbindlich sind und ob du die optionale Vertragsstrafe behalten willst.

In § 4 listest du, was der Besteller liefern muss, und legst die Freigabefrist fest. In § 5 trägst du den Stundensatz für Unterbrechungen und die Vergütung für die Prüfung von Änderungswünschen ein. In § 6 bestimmst du die Prüffrist für die Abnahme. In § 7 wählst du Festpreis oder Aufwand, regelst Material und Fremdkosten und verteilst die Raten auf Vertragsschluss, Meilenstein und Abnahme. In § 8 legst du die Verjährungsfrist fest, in § 9 ausschließliches oder einfaches Nutzungsrecht und ob der Besteller den Quellcode erhält. Zum Schluss Haftungsobergrenze in § 10, Gerichtsstand, Anlagen und Unterschriften. Die Word-Version lässt sich dafür direkt bearbeiten.`,
      },
      {
        titel: "Typische Fehler beim Werkvertrag",
        text: `Fehler Nummer eins ist die vergessene Abnahme. Viele Freelancer liefern, der Kunde nutzt das Werk, und niemand erklärt die Abnahme. Dann ist unklar, ab wann die Vergütung fällig ist und wann die Gewährleistung endet. Die Vorlage löst das über die Abnahmeanzeige mit Frist und die fiktive Abnahme, wenn der Kunde schweigt oder das Werk produktiv nutzt.

Fehler Nummer zwei: Änderungen werden auf Zuruf umgesetzt. Ohne Change-Request-Verfahren wächst der Umfang, der Festpreis bleibt. Nutze § 5 konsequent und setze nichts um, was nicht in Textform freigegeben ist.

Fehler Nummer drei: Nutzungsrechte werden nicht geregelt. Nach § 31 UrhG und der Zweckübertragungslehre bleibt alles beim Urheber, was nicht ausdrücklich eingeräumt ist. Weitere Stolperfallen sind Meilensteine ohne Zwischenzahlungen, ein Verbot von Subunternehmern ohne Ausnahme für Standardtools und die Erwartung, dass der Kunde den Vertrag nicht kündigen kann, obwohl § 648 BGB ihm das jederzeit erlaubt.`,
      },
      {
        titel: "Rechtliche Grundlagen: Werkvertrag nach § 631 BGB",
        text: `Der Werkvertrag ist in den §§ 631 ff. BGB geregelt. Der Unternehmer schuldet die Herstellung des versprochenen Werks, der Besteller die Vergütung, die nach § 641 BGB mit der Abnahme fällig wird. § 640 BGB regelt die Abnahme: Wegen unwesentlicher Mängel darf sie nicht verweigert werden, und nach Absatz 2 gilt das Werk als abgenommen, wenn der Besteller trotz Fristsetzung und Hinweis keinen Mangel benennt.

Die Mängelrechte stehen in § 634 BGB: Nacherfüllung, Selbstvornahme, Minderung, Rücktritt und Schadensersatz. Sie verjähren nach § 634a BGB bei den meisten Werken in zwei Jahren ab Abnahme, bei Bauwerken in fünf Jahren; zwischen Unternehmen ist eine Verkürzung möglich, nicht aber für Arglist und Personenschäden. § 648 BGB erlaubt dem Besteller die freie Kündigung gegen Zahlung der Vergütung abzüglich ersparter Aufwendungen, § 648a BGB die Kündigung aus wichtigem Grund. Für Bauleistungen gelten zusätzlich die §§ 650a ff. BGB. Nutzungsrechte an urheberrechtlich geschützten Werken richten sich nach § 31 UrhG und gehen nur über, soweit sie ausdrücklich eingeräumt werden.`,
      },
      {
        titel: "Wann die Werkvertrag-Vorlage nicht reicht",
        text: `Die Vorlage ist für überschaubare Projekte zwischen Unternehmen gedacht. Bei Bauleistungen, Verbraucherbauverträgen oder wenn die VOB/B einbezogen werden soll, lass den Vertrag von einem Anwalt anpassen; dort gelten eigene Fristen, Sicherheiten und Abnahmeregeln. Dasselbe gilt für Softwareprojekte mit agiler Entwicklung ohne festes Pflichtenheft, bei denen Werk- und Dienstelemente gemischt sind, und für Projekte, deren Volumen eine unwirksame Haftungsklausel zum Existenzrisiko macht.

Setzt du den Vertrag unverändert bei vielen Kunden ein, wird er zu AGB und sollte auf die Inhaltskontrolle geprüft werden. Bei laufender Betreuung nach dem Projekt ergänze einen Dienstleistungs- oder Wartungsvertrag. GründerX liefert die Vorlage als Software; die rechtliche Prüfung deines konkreten Projekts bleibt bei dir oder deinem Anwalt.`,
      },
    ],
    seo: {
      title: "Werkvertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Werkvertrag nach § 631 BGB als kostenlose Vorlage: Leistungsbeschreibung, Abnahme, Festpreis, Nacherfüllung, Change Requests, Nutzungsrechte. Word, PDF, Text.",
    },
    stand: "2026-10",
    text: `Werkvertrag

zwischen

[Firma / Name], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Besteller“ –

und

[Firma / Name], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Unternehmer“ –

– gemeinsam „die Parteien“ –

§ 1 Vertragsgegenstand
(1) Der Unternehmer verpflichtet sich, für den Besteller folgendes Werk herzustellen: [genaue Bezeichnung, z. B. „eine responsive Unternehmenswebsite mit [Anzahl] Seiten auf Basis von [System] einschließlich Kontaktformular und Blog“ / „ein Logo mit Wort-Bild-Marke in den Dateiformaten SVG, PNG und PDF“ / „eine Beschichtung der Hallenböden in Halle 2“].
(2) Dieser Vertrag ist ein Werkvertrag im Sinne der §§ 631 ff. BGB. Der Unternehmer schuldet den in § 2 beschriebenen Erfolg.

§ 2 Leistungsbeschreibung und Ausführung
(1) Art, Umfang, Funktionen und Qualität des Werks ergeben sich abschließend aus der Leistungsbeschreibung in Anlage 1 (Pflichtenheft/Angebot Nr. [Nummer] vom [Datum]). Bei Widersprüchen gilt die Rangfolge: dieser Vertrag, Anlage 1, sonstige Unterlagen.
(2) Der Unternehmer führt das Werk nach dem Stand der Technik und den anerkannten Regeln seines Fachs aus. Er darf Subunternehmer einsetzen; er haftet für sie wie für eigenes Handeln. [Optional: Der Einsatz von Subunternehmern bedarf der Zustimmung des Bestellers in Textform.]
(3) Der Unternehmer bestimmt Arbeitszeit, Arbeitsort und Arbeitsmittel selbst, soweit Anlage 1 oder die Natur des Werks nichts anderes verlangt.
(4) Der Unternehmer stellt dem Besteller auf Anfrage Zwischenstände zur Verfügung und informiert ihn unverzüglich, wenn er erkennt, dass Vorgaben des Bestellers, beigestellte Materialien oder Vorarbeiten Dritter zur mangelhaften Herstellung führen würden.

§ 3 Termine und Fristen
(1) Der Unternehmer beginnt mit der Ausführung am [Datum]. Folgende Meilensteine sind vereinbart:
   a) [Meilenstein 1, z. B. „Entwurf/Konzept“] bis zum [Datum],
   b) [Meilenstein 2, z. B. „Testversion“] bis zum [Datum],
   c) Fertigstellung und Bereitstellung zur Abnahme bis zum [Datum].
(2) Die Termine sind [verbindlich / unverbindliche Planungstermine]. Sie verschieben sich angemessen, wenn der Besteller seine Mitwirkungspflichten nicht rechtzeitig erfüllt, Änderungen nach § 5 beauftragt oder Umstände höherer Gewalt eintreten.
(3) [Optional: Überschreitet der Unternehmer den Fertigstellungstermin aus Gründen, die er zu vertreten hat, zahlt er eine Vertragsstrafe von [z. B. 0,2] % der Nettovergütung je Werktag, höchstens [z. B. 5] % der Nettovergütung. Die Vertragsstrafe wird auf einen Schadensersatzanspruch angerechnet.]

§ 4 Mitwirkung des Bestellers
(1) Der Besteller stellt rechtzeitig und unentgeltlich alle erforderlichen Inhalte, Daten, Materialien, Zugänge und Entscheidungen bereit, insbesondere [z. B. „Texte und Bilder in druckfähiger Qualität, Zugang zum Hosting, Logo-Dateien“].
(2) Der Besteller prüft Entwürfe und Zwischenstände und erteilt Freigaben oder nennt Änderungswünsche innerhalb von [z. B. 5] Werktagen. Äußert er sich nicht, darf der Unternehmer nach einer weiteren Erinnerung mit Nachfrist von [z. B. 3] Werktagen den Zwischenstand als freigegeben behandeln.
(3) Der Besteller versichert, dass er an allen beigestellten Inhalten die erforderlichen Rechte hat, und stellt den Unternehmer von Ansprüchen Dritter wegen dieser Inhalte frei.

§ 5 Änderungswünsche (Change Requests)
(1) Der Besteller kann Änderungen oder Erweiterungen des Werks in Textform vorschlagen. Der Unternehmer prüft den Vorschlag innerhalb von [z. B. 5] Werktagen und teilt mit, ob und zu welchen Bedingungen (Mehr- oder Minderaufwand, Vergütung, Terminverschiebung) er die Änderung umsetzen kann.
(2) Die Änderung wird erst verbindlich, wenn der Besteller das Angebot des Unternehmers in Textform annimmt. Bis dahin wird das Werk nach dem bisherigen Stand weitergeführt, es sei denn, der Besteller ordnet in Textform eine Unterbrechung an; die Unterbrechungszeit verschiebt die Termine und wird nach Aufwand mit [Betrag] EUR je Stunde vergütet.
(3) Der Aufwand für die Prüfung von Änderungswünschen ist [bis zu [Stunden] Stunden je Änderungswunsch kostenfrei / mit [Betrag] EUR je Stunde zu vergüten].

§ 6 Abnahme
(1) Nach Fertigstellung stellt der Unternehmer das Werk zur Abnahme bereit und zeigt dies dem Besteller in Textform an. Der Besteller prüft das Werk innerhalb von [z. B. 10] Werktagen und erklärt die Abnahme oder teilt die festgestellten Mängel konkret in Textform mit.
(2) Wegen unwesentlicher Mängel darf die Abnahme nicht verweigert werden; solche Mängel werden im Abnahmeprotokoll festgehalten und vom Unternehmer innerhalb von [z. B. 10] Werktagen beseitigt.
(3) Das Werk gilt als abgenommen, wenn der Besteller innerhalb der Frist nach Absatz 1 die Abnahme nicht unter Angabe mindestens eines Mangels verweigert (§ 640 Abs. 2 BGB). Der Unternehmer weist den Besteller in der Abnahmeanzeige auf diese Folge hin. Das Werk gilt ferner als abgenommen, wenn der Besteller es produktiv nutzt oder veröffentlicht.
(4) Teilabnahmen sind für in sich abgeschlossene Teile des Werks (Meilensteine nach § 3) vereinbart. Mit der Abnahme geht die Gefahr auf den Besteller über und die Verjährung der Mängelansprüche beginnt.

§ 7 Vergütung und Zahlung
(1) Die Vergütung beträgt [Variante A: einen Festpreis von [Betrag] EUR] [Variante B: [Betrag] EUR je Stunde nach tatsächlichem Aufwand, geschätzt mit [Stunden] Stunden; der Unternehmer informiert den Besteller, sobald absehbar ist, dass die Schätzung um mehr als [z. B. 10] % überschritten wird, und benötigt für den Mehraufwand eine Freigabe in Textform], jeweils zuzüglich gesetzlicher Umsatzsteuer. Material und Fremdkosten [sind enthalten / werden gegen Beleg zuzüglich [z. B. 10] % Handling erstattet].
(2) Die Vergütung ist wie folgt fällig: [z. B. 30] % bei Vertragsschluss, [z. B. 30] % bei Erreichen des Meilensteins [Nr.], [z. B. 40] % nach Abnahme. Rechnungen sind innerhalb von [z. B. 14] Tagen nach Zugang zahlbar.
(3) Bei Zahlungsverzug gelten Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz und die Pauschale nach § 288 Abs. 5 BGB. Der Unternehmer darf bei Verzug mit einer Abschlagszahlung die Arbeiten nach Ankündigung in Textform einstellen; die Termine verschieben sich entsprechend.
(4) Bis zur vollständigen Zahlung behält sich der Unternehmer das Eigentum an gelieferten Gegenständen und Datenträgern vor; Nutzungsrechte nach § 9 gehen erst mit vollständiger Zahlung über.

§ 8 Mängelrechte und Nacherfüllung
(1) Der Unternehmer gewährleistet, dass das Werk bei Abnahme die in Anlage 1 vereinbarte Beschaffenheit hat und frei von Rechten Dritter ist, die der vertraglichen Nutzung entgegenstehen.
(2) Bei Mängeln hat der Besteller zunächst Anspruch auf Nacherfüllung. Der Unternehmer kann nach seiner Wahl den Mangel beseitigen oder das Werk neu herstellen. Der Besteller setzt hierfür eine angemessene Frist von mindestens [z. B. 10] Werktagen.
(3) Schlägt die Nacherfüllung zweimal fehl, wird sie verweigert oder ist sie dem Besteller unzumutbar, kann der Besteller den Mangel selbst beseitigen lassen und Ersatz der erforderlichen Aufwendungen verlangen, die Vergütung mindern oder bei erheblichen Mängeln vom Vertrag zurücktreten. Schadensersatz richtet sich nach § 10.
(4) Keine Mängel sind Abweichungen, die auf fehlerhaften oder unvollständigen Vorgaben des Bestellers, auf von ihm beigestellten Inhalten oder auf Eingriffen Dritter nach Abnahme beruhen.
(5) Mängelansprüche verjähren in [z. B. 12 Monaten / 2 Jahren] ab Abnahme; bei Bauwerken in 5 Jahren. Die Verkürzung gilt nicht für Vorsatz, Arglist und Ansprüche nach § 10 Abs. 1.

§ 9 Nutzungsrechte
(1) Der Unternehmer räumt dem Besteller mit vollständiger Zahlung der Vergütung das [ausschließliche / einfache], zeitlich, räumlich und inhaltlich unbeschränkte Recht ein, das Werk und alle Arbeitsergebnisse für eigene Zwecke zu nutzen, zu vervielfältigen, zu verbreiten, öffentlich zugänglich zu machen, zu bearbeiten und in andere Werke einzufügen. [Optional: Das Nutzungsrecht ist beschränkt auf [z. B. die Nutzung im Internet und in Printmedien im deutschsprachigen Raum].]
(2) Der Unternehmer darf das Werk zur Eigenwerbung in Referenzen zeigen, sofern der Besteller nicht in Textform widerspricht. Das Recht des Unternehmers, als Urheber genannt zu werden, [bleibt bestehen / wird im Umfang des gesetzlich Zulässigen nicht ausgeübt].
(3) Für Open-Source-Komponenten und Fremdsoftware gelten deren Lizenzbedingungen; der Unternehmer legt eine Liste der verwendeten Komponenten vor. Vorbestehende Werkzeuge, Bibliotheken und Know-how des Unternehmers bleiben in seinem Eigentum; der Besteller erhält daran ein einfaches Nutzungsrecht, soweit es für die Nutzung des Werks erforderlich ist.
(4) [Bei Software: Der Besteller erhält den Quellcode und die Dokumentation mit Abnahme.]

§ 10 Haftung
(1) Der Unternehmer haftet unbeschränkt für Vorsatz, grobe Fahrlässigkeit, arglistig verschwiegene Mängel, übernommene Garantien und Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie nach dem Produkthaftungsgesetz.
(2) Bei leichter Fahrlässigkeit haftet der Unternehmer nur für die Verletzung wesentlicher Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren Schaden, höchstens [Betrag, z. B. die Nettovergütung dieses Vertrags] EUR.
(3) Für Datenverlust haftet der Unternehmer nur bis zum Wiederherstellungsaufwand bei ordnungsgemäßer Datensicherung des Bestellers.

§ 11 Kündigung
(1) Der Besteller kann den Vertrag bis zur Vollendung des Werks jederzeit kündigen (§ 648 BGB). Der Unternehmer kann dann die vereinbarte Vergütung verlangen, muss sich jedoch anrechnen lassen, was er infolge der Aufhebung an Aufwendungen erspart oder durch anderweitige Verwendung seiner Arbeitskraft erwirbt oder zu erwerben böswillig unterlässt. Es wird vermutet, dass dem Unternehmer [z. B. 5] % der auf den noch nicht erbrachten Teil entfallenden Vergütung zustehen; der Nachweis eines höheren oder niedrigeren Betrags bleibt beiden Parteien offen.
(2) Beide Parteien können den Vertrag aus wichtigem Grund kündigen (§ 648a BGB). Die Kündigung bedarf der Schriftform.
(3) Nach einer Kündigung ist der bis dahin erbrachte Teil des Werks abzunehmen und zu vergüten; § 6 gilt entsprechend.

§ 12 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt deutsches Recht. Gerichtsstand ist, soweit beide Parteien Kaufleute, juristische Personen des öffentlichen Rechts oder öffentlich-rechtliche Sondervermögen sind, [Ort].
(4) Anlagen: Anlage 1 Leistungsbeschreibung/Angebot, [Anlage 2 Zeitplan], [Anlage 3 Komponentenliste].
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Besteller


______________________________
[Vorname Nachname], für den Unternehmer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "freelancer-vertrag-it",
    titel: "Freelancer-Vertrag IT / Software",
    kurz: "Vertrag für freie Mitarbeiter in IT und Softwareentwicklung: Projekt, Tagessatz, Remote, Rechte am Code, Weisungsfreiheit gegen Scheinselbstständigkeit.",
    kategorie: "dienstleistung",
    dateiname: "Freelancer-Vertrag-IT-Software",
    wofuer: [
      "Du holst dir als Startup einen Entwickler, DevOps- oder Data-Freelancer für ein Projekt oder eine Sprint-Reihe",
      "Du arbeitest selbst als IT-Freelancer und brauchst einen Vertrag, der Tagessatz, Rechte am Code und Haftung sauber regelt",
      "Remote-Zusammenarbeit mit eigenen Geräten und freier Zeiteinteilung",
      "Wenn die Zusammenarbeit länger dauert und das Risiko der Scheinselbstständigkeit von Anfang an bedacht werden soll",
    ],
    enthaelt: [
      "§ 1 Projekt und Leistungsgegenstand",
      "§ 2 Status des Freelancers, Weisungsfreiheit",
      "§ 3 Durchführung, Remote-Arbeit, Arbeitsmittel",
      "§ 4 Vergütung (Tagessatz), Abrechnung",
      "§ 5 Rechte am Code und an Arbeitsergebnissen",
      "§ 6 Geheimhaltung, Datenschutz, IT-Sicherheit",
      "§ 7 Haftung, Versicherung",
      "§ 8 Laufzeit, Kündigung, Übergabe",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Scheinselbstständigkeit wird nicht am Vertragstext, sondern an der gelebten Praxis gemessen: feste Arbeitszeiten, Einbindung in Teams wie ein Angestellter, Firmenlaptop, Urlaubsabstimmung, nur ein Auftraggeber. Nachzahlungen von Sozialbeiträgen treffen vor allem den Auftraggeber, rückwirkend bis zu vier Jahre.",
      "Mit dem Statusfeststellungsverfahren nach § 7a SGB IV bei der Deutschen Rentenversicherung bekommt ihr vor Beginn eine verbindliche Entscheidung. Seit 2022 ist auch eine Prognoseentscheidung auf Basis des Vertrags möglich.",
      "Code ist urheberrechtlich geschützt und die Rechte bleiben beim Freelancer, solange sie nicht ausdrücklich eingeräumt werden. § 69b UrhG (Rechte des Arbeitgebers) gilt nur für Angestellte, nicht für Freelancer. Die Vorlage räumt die Rechte ausdrücklich ein.",
      "Freelancer mit nur einem Auftraggeber und ohne eigene Angestellte können als arbeitnehmerähnliche Selbstständige rentenversicherungspflichtig sein (§ 2 Satz 1 Nr. 9 SGB VI) – ein Thema für den Freelancer selbst, nicht für den Auftraggeber.",
    ],
    faqs: [
      {
        q: "Wann ist ein IT-Freelancer scheinselbstständig?",
        a: "Wenn er in Wahrheit wie ein Arbeitnehmer arbeitet: weisungsgebunden bei Zeit, Ort und Art der Arbeit, in die Betriebsorganisation eingegliedert, ohne unternehmerisches Risiko. Indizien sind feste Anwesenheit, Firmen-E-Mail und Firmenlaptop, Teilnahme an allen internen Meetings wie ein Mitarbeiter und ein einziger Auftraggeber über Jahre. Jedes Indiz allein ist unschädlich, die Gesamtschau zählt.",
      },
      {
        q: "Wem gehört der Code, den der Freelancer schreibt?",
        a: "Urheber ist immer der Freelancer, das Urheberrecht ist nicht übertragbar. Der Auftraggeber bekommt nur die Nutzungsrechte, die der Vertrag ihm ausdrücklich einräumt. Die Vorlage überträgt ausschließliche, unbeschränkte Nutzungsrechte mit Zahlung der Vergütung und regelt vorbestehende Tools und Open-Source-Komponenten getrennt.",
      },
      {
        q: "Tagessatz oder Stundensatz?",
        a: "In der IT ist der Tagessatz üblich, meist für einen Tag von acht Stunden mit anteiliger Abrechnung halber Tage. Die Vorlage sieht einen Tagessatz vor und regelt, wie Teilzeiten und Mehrstunden abgerechnet werden. Wichtig ist der Tätigkeitsnachweis, den der Auftraggeber innerhalb einer Frist beanstanden kann.",
      },
      {
        q: "Was kostet das Statusfeststellungsverfahren und wie lange dauert es?",
        a: "Das Verfahren bei der Deutschen Rentenversicherung Bund ist kostenfrei. Es dauert erfahrungsgemäß einige Wochen bis mehrere Monate. Wer den Antrag innerhalb eines Monats nach Beginn der Tätigkeit stellt, kann unter bestimmten Voraussetzungen verhindern, dass die Versicherungspflicht rückwirkend ab Beginn eintritt.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Freelancer-Vertrag für IT brauchst",
        text: `Diesen Freelancer-Vertrag brauchst du, sobald ein externer Entwickler, DevOps-Spezialist, Data Engineer oder UX-Designer für dein Startup arbeitet, ohne angestellt zu sein. Typische Fälle: Du holst dir für sechs Monate einen Backend-Entwickler in die Sprint-Reihe, du lässt eine Schnittstelle zur Warenwirtschaft bauen, oder du brauchst für den Launch zusätzliche Kapazität im Frontend.

Umgekehrt nutzen IT-Freelancer das Muster als eigenen Standardvertrag, wenn der Kunde keinen hat oder nur unausgewogene Einkaufsbedingungen anbietet. Der Vertrag ist als Dienstvertrag angelegt, weil die meisten Freelancer-Einsätze nach Tagen abgerechnet werden und kein abnahmefähiges Werk zum Festpreis geschuldet ist. Für einzelne Festpreis-Arbeitspakete lässt sich die Werkvertragsregel in § 1 Abs. 3 zuschalten.`,
      },
      {
        titel: "Was muss in einen Freelancer-Vertrag?",
        text: `Ein Freelancer-Vertrag für IT muss drei Dinge besonders gut können: die Selbstständigkeit absichern, die Rechte am Code übertragen und die Zusammenarbeit remote organisieren. Die Vorlage regelt in neun Paragrafen:

- § 1 Projekt und Leistungsgegenstand mit Projektbeschreibung in Anlage 1 und Einordnung als Dienstvertrag
- § 2 Status des Freelancers: keine Weisungen zu Zeit, Ort und Art, keine Anwesenheitspflicht, Recht auf weitere Auftraggeber, eigenes unternehmerisches Risiko, optional die gemeinsame Statusfeststellung
- § 3 Remote-Arbeit, eigene Hardware, Zugänge zu Repository und Ticketsystem, Sprint-Termine nur soweit nötig
- § 4 Tagessatz mit Definition des Personentags, Budget mit Warnschwelle, monatlicher Tätigkeitsnachweis, Reisekosten
- § 5 Rechte am Code: ausschließliche, übertragbare Nutzungsrechte, Vorbestehendes Material, Open-Source-Regeln, Freistellung
- § 6 Geheimhaltung, Auftragsverarbeitung nach Art. 28 DSGVO, IT-Sicherheit, optionale Vertragsstrafe
- § 7 Haftung und IT-Haftpflichtversicherung
- § 8 Laufzeit, Kündigung und Übergabe mit Mitwirkung zum Tagessatz
- § 9 Schlussbestimmungen

Fehlt § 5, bleibt der Code beim Freelancer. Fehlt § 2, hast du bei einer Prüfung durch die Rentenversicherung kein Argument.`,
      },
      {
        titel: "Freelancer-Vertrag Muster ausfüllen",
        text: `Trage im Kopf den Auftraggeber mit Rechtsform und den Freelancer mit Anschrift und Umsatzsteuer-Identifikationsnummer oder Steuernummer ein. In § 1 beschreibst du das Projekt konkret, etwa Sprache, Framework und Ziel der Entwicklung, und legst die Projektbeschreibung als Anlage 1 bei. Wenn einzelne Arbeitspakete zum Festpreis geliefert werden, behalte die Alternative zur Werkleistung, sonst streiche sie.

In § 2 Abs. 6 entscheidest du, ob ihr die Statusfeststellung beantragen wollt. In § 3 trägst du den Ort und die Anzahl der Präsenztage ein, den geplanten Umfang in Personentagen und den Vorlauf für die Verfügbarkeit; wenn der Auftraggeber aus Sicherheitsgründen ein verwaltetes Notebook stellt, behalte die optionale Klammer. In § 4 setzt du Tagessatz, Abrechnungstakt, Gesamtbudget, Warnschwelle, Beanstandungsfrist, Zahlungsziel und die Reisekostensätze.

In § 6 legst du die Dauer der Geheimhaltung und die Vertragsstrafe fest oder streichst sie. In § 7 trägst du Haftungsobergrenze und Deckungssumme der Versicherung ein, in § 8 Beginn, Ende, Verlängerung und Kündigungsfrist. Danach Gerichtsstand, Anlagen, Datum und Unterschriften. Als Word-Datei ist das in einer halben Stunde erledigt.`,
      },
      {
        titel: "Scheinselbstständigkeit und andere typische Fehler",
        text: `Der teuerste Fehler ist die gelebte Scheinselbstständigkeit. Der Vertrag sagt Weisungsfreiheit, die Praxis zeigt Firmenlaptop, Firmen-E-Mail, feste Kernzeiten, Teilnahme an jedem internen Meeting und einen einzigen Auftraggeber über Jahre. Bei einer Prüfung zählt die Gesamtschau, und die Nachzahlung der Sozialversicherungsbeiträge trifft vor allem den Auftraggeber. Halte Vertrag und Alltag deckungsgleich: eigene Geräte, eigene Zeiteinteilung, Ergebnisabstimmung statt Tagesanweisung.

Zweiter Fehler: Rechte am Code nur mündlich oder gar nicht geregelt. Der Freelancer ist Urheber, § 69b UrhG gilt nur für Arbeitnehmer. Ohne § 5 kannst du den Code zwar nutzen, aber nicht sicher weiterverkaufen oder lizenzieren.

Dritter Fehler: Copyleft-Lizenzen ohne Freigabe. Eine GPL-Bibliothek im Kern deines Produkts kann dich zur Offenlegung zwingen; die Komponentenliste aus § 5 Abs. 4 verhindert das. Weitere Stolperfallen sind fehlende Budgetwarnung, Tätigkeitsnachweise ohne Beanstandungsfrist und Produktivdaten in der Entwicklungsumgebung ohne Auftragsverarbeitungsvertrag.`,
      },
      {
        titel: "Rechtliche Grundlagen: Dienstvertrag, SGB IV und Urheberrecht",
        text: `Der Freelancer-Vertrag ist ein Dienstvertrag nach den §§ 611 ff. BGB; geschuldet ist die fachgerechte Entwicklungsleistung, nicht ein abnahmefähiges Werk. Für Festpreis-Pakete gelten ergänzend die §§ 631 ff. BGB mit Abnahme und Mängelhaftung.

Ob eine Beschäftigung im sozialversicherungsrechtlichen Sinn vorliegt, bestimmt § 7 Abs. 1 SGB IV nach Weisungsgebundenheit und Eingliederung in die Arbeitsorganisation. Das Statusfeststellungsverfahren nach § 7a SGB IV bei der Deutschen Rentenversicherung Bund liefert eine verbindliche Entscheidung, seit 2022 auch als Prognose vor Beginn. Freelancer ohne eigene Angestellte, die im Wesentlichen für einen Auftraggeber arbeiten, können nach § 2 Satz 1 Nr. 9 SGB VI selbst rentenversicherungspflichtig sein.

Software ist nach § 69a UrhG urheberrechtlich geschützt. Nutzungsrechte werden nach § 31 UrhG eingeräumt und reichen nur so weit, wie der Vertrag es ausdrücklich sagt. Für personenbezogene Daten gilt Art. 28 DSGVO, für Geschäftsgeheimnisse das Geschäftsgeheimnisgesetz, das angemessene Schutzmaßnahmen wie eine Geheimhaltungsklausel voraussetzt.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht: Statusfeststellung und Anwalt",
        text: `Dauert der Einsatz länger als ein paar Monate, läuft er in Vollzeit oder ist der Freelancer die einzige Person für eine Kernfunktion deines Produkts, solltest du die Statusfeststellung nach § 7a SGB IV beantragen, statt dich auf den Vertragstext zu verlassen. Bei Festpreisprojekten mit großem Volumen, bei Entwicklung für regulierte Branchen wie Medizin oder Finanzen und bei Freelancern aus dem Ausland gehört der Vertrag zum Anwalt, weil Haftung, Steuer und Datenschutz dann anders liegen.

Vermittelt eine Agentur den Freelancer, prüfe deren Vertragskette; manche Konstruktionen sind verdeckte Arbeitnehmerüberlassung, die ohne Erlaubnis nach dem AÜG unzulässig ist. Nutzt du den Vertrag für viele Freelancer, lass ihn als AGB prüfen. GründerX ist Software und keine Rechtsberatung; die Vorlage spart dir den ersten Entwurf, nicht die Prüfung im Einzelfall.`,
      },
    ],
    seo: {
      title: "Freelancer-Vertrag IT Vorlage kostenlos (Word) | GründerX",
      description:
        "Freelancer-Vertrag für IT und Software als kostenlose Vorlage: Tagessatz, Remote, Rechte am Code, Weisungsfreiheit, Statusfeststellung nach § 7a SGB IV.",
    },
    stand: "2026-10",
    text: `Vertrag über freie Mitarbeit (IT / Softwareentwicklung)

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftraggeber“ –

und

[Vorname Nachname / Firma], [Straße, PLZ Ort], [USt-IdNr. / Steuernummer]
– nachfolgend „Freelancer“ –

– gemeinsam „die Parteien“ –

§ 1 Projekt und Leistungsgegenstand
(1) Der Auftraggeber beauftragt den Freelancer mit folgenden Leistungen im Projekt „[Projektname]“: [genaue Beschreibung, z. B. „Entwicklung einer REST-API in [Sprache/Framework] für die Anbindung des Shopsystems an die Warenwirtschaft, einschließlich automatisierter Tests und technischer Dokumentation“].
(2) Die Leistungen werden in Anlage 1 (Projektbeschreibung) näher beschrieben. Konkrete Arbeitspakete werden zwischen den Parteien in Textform abgestimmt; der Freelancer entscheidet eigenverantwortlich, wie er sie technisch umsetzt.
(3) Dieser Vertrag ist ein Dienstvertrag (§§ 611 ff. BGB). Der Freelancer schuldet die fachgerechte Erbringung der Entwicklungsleistung nach dem Stand der Technik, nicht einen bestimmten Erfolg. [Alternative für Festpreisprojekte: Für in Anlage 1 als „Werkleistung“ gekennzeichnete Arbeitspakete gelten ergänzend die Regeln zu Abnahme und Mängelhaftung nach §§ 631 ff. BGB.]

§ 2 Status des Freelancers, Weisungsfreiheit
(1) Der Freelancer ist selbstständiger Unternehmer. Er ist nicht Arbeitnehmer des Auftraggebers und nicht in dessen Betriebsorganisation eingegliedert. Ein Arbeitsverhältnis wird nicht begründet.
(2) Der Freelancer ist bei der Durchführung der Leistungen hinsichtlich Zeit, Ort und Art der Ausführung frei und unterliegt keinen Weisungen des Auftraggebers. Fachliche Vorgaben zum Leistungsinhalt (Anforderungen, Schnittstellen, Coding-Richtlinien, Zielarchitektur) sind keine Weisungen in diesem Sinne.
(3) Der Freelancer ist nicht verpflichtet, an internen Veranstaltungen des Auftraggebers teilzunehmen, Anwesenheitszeiten einzuhalten oder Urlaub abzustimmen. Er stimmt lediglich Zeiten ab, in denen er für Abstimmungen nicht erreichbar ist, soweit dies für das Projekt erforderlich ist.
(4) Der Freelancer ist berechtigt, für andere Auftraggeber tätig zu sein, auch für Wettbewerber des Auftraggebers, soweit § 6 (Geheimhaltung) eingehalten wird. Er ist berechtigt, Aufträge abzulehnen.
(5) Der Freelancer darf Leistungen durch eigene Mitarbeiter oder Subunternehmer erbringen lassen, die fachlich gleich qualifiziert sind, und benennt diese dem Auftraggeber vorab; er bleibt für die Leistung verantwortlich.
(6) Der Freelancer trägt sein unternehmerisches Risiko selbst. Er sorgt selbst für die Versteuerung seiner Einkünfte und für seine Kranken-, Pflege- und Altersvorsorge. [Optional: Die Parteien beantragen vor Aufnahme der Tätigkeit gemeinsam die Feststellung des Erwerbsstatus nach § 7a SGB IV bei der Deutschen Rentenversicherung Bund.]

§ 3 Durchführung, Remote-Arbeit, Arbeitsmittel
(1) Der Freelancer erbringt die Leistungen grundsätzlich remote von einem Ort seiner Wahl. Präsenztermine beim Auftraggeber in [Ort] finden nur nach gemeinsamer Abstimmung statt, voraussichtlich etwa [Anzahl] Tage pro Monat; Reisekosten werden nach § 4 Abs. 4 erstattet.
(2) Der Freelancer setzt eigene Hardware und Software ein. Der Auftraggeber stellt lediglich Zugänge zu den projektbezogenen Systemen (Repository, Ticketsystem, Test- und Staging-Umgebungen, Kommunikationskanäle) bereit, soweit dies technisch oder aus Sicherheitsgründen erforderlich ist. [Optional: Aus Gründen der IT-Sicherheit stellt der Auftraggeber ein verwaltetes Notebook, das ausschließlich für den Zugriff auf seine Systeme zu nutzen ist.]
(3) Der Freelancer nimmt an projektbezogenen Abstimmungen (z. B. Sprint-Planung, Reviews) teil, soweit sie für die Leistungserbringung erforderlich sind. Der voraussichtliche Umfang beträgt etwa [Tage] Personentage pro [Woche / Monat]; der Freelancer teilt dem Auftraggeber seine geplante Verfügbarkeit jeweils [z. B. zwei Wochen] im Voraus mit.
(4) Der Freelancer hält die vom Auftraggeber benannten technischen Richtlinien (Coding-Standards, Branching-Modell, Review-Prozess, Sicherheitsvorgaben) ein und dokumentiert seine Arbeit im Repository in einer Weise, die eine Übernahme durch Dritte ermöglicht.

§ 4 Vergütung, Abrechnung
(1) Der Freelancer erhält einen Tagessatz von [Betrag] EUR zuzüglich gesetzlicher Umsatzsteuer. Ein Personentag umfasst 8 Stunden. Teilleistungen werden anteilig im [Halbtages- / Stunden-]Takt abgerechnet; über 8 Stunden hinausgehende Zeiten an einem Tag werden nur abgerechnet, wenn sie vorab in Textform freigegeben wurden.
(2) Das Gesamtbudget für das Projekt beträgt [Betrag] EUR netto [bzw. [Anzahl] Personentage]. Erkennt der Freelancer, dass das Budget zu [z. B. 80] % ausgeschöpft ist, zeigt er dies dem Auftraggeber in Textform an; darüber hinausgehende Leistungen bedürfen einer Freigabe in Textform.
(3) Der Freelancer rechnet monatlich ab und fügt einen Tätigkeitsnachweis bei (Datum, Dauer, Arbeitspaket oder Ticket). Beanstandet der Auftraggeber den Nachweis nicht innerhalb von [z. B. 10] Werktagen in Textform, gilt er als anerkannt; der Freelancer weist in der Rechnung darauf hin. Rechnungen sind innerhalb von [z. B. 14] Tagen ohne Abzug zahlbar.
(4) Vorab in Textform freigegebene Reisekosten werden gegen Beleg erstattet (Bahn 2. Klasse / Economy, Hotel bis [Betrag] EUR je Nacht, Pkw mit [Betrag] EUR je Kilometer). Reisezeiten werden mit [z. B. 50] % des Tagessatzes anteilig vergütet.
(5) Bei Zahlungsverzug gelten Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz und die Pauschale nach § 288 Abs. 5 BGB.

§ 5 Rechte am Code und an Arbeitsergebnissen
(1) Der Freelancer räumt dem Auftraggeber an allen im Rahmen dieses Vertrags geschaffenen Arbeitsergebnissen (Quellcode, Objektcode, Dokumentation, Konzepte, Datenmodelle, Konfigurationen, Designs) das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte, übertragbare und unterlizenzierbare Recht ein, sie in jeder bekannten Nutzungsart zu nutzen, insbesondere zu vervielfältigen, zu bearbeiten, zu verbreiten, öffentlich zugänglich zu machen und in andere Werke zu integrieren. Die Rechtseinräumung umfasst auch die Nutzung für künftige Produkte und Geschäftsbereiche des Auftraggebers.
(2) Die Rechtseinräumung wird mit Entstehung des jeweiligen Arbeitsergebnisses wirksam; sie steht unter der auflösenden Bedingung, dass die hierauf entfallende Vergütung nicht gezahlt wird. Der Freelancer übergibt die Arbeitsergebnisse laufend durch Einchecken in das Repository des Auftraggebers.
(3) Vorbestehende Werkzeuge, Bibliotheken, Frameworks und Know-how des Freelancers („Vorbestehendes Material“) bleiben sein Eigentum. Soweit er solches Material in die Arbeitsergebnisse einbringt, räumt er dem Auftraggeber daran ein einfaches, unbeschränktes, unentgeltliches Nutzungsrecht ein, das die Nutzung der Arbeitsergebnisse ermöglicht. Der Freelancer kennzeichnet Vorbestehendes Material in der Dokumentation.
(4) Open-Source-Software darf nur eingesetzt werden, wenn deren Lizenz mit der vorgesehenen Nutzung durch den Auftraggeber vereinbar ist. Komponenten unter Lizenzen mit Copyleft-Wirkung (z. B. GPL, AGPL) dürfen nur nach Freigabe des Auftraggebers in Textform eingesetzt werden. Der Freelancer führt eine Liste aller eingesetzten Komponenten mit Lizenzangabe.
(5) Der Freelancer versichert, dass die Arbeitsergebnisse von ihm oder seinen nach § 2 Abs. 5 benannten Personen geschaffen werden und frei von Rechten Dritter sind, die der Nutzung entgegenstehen. Er stellt den Auftraggeber von Ansprüchen Dritter frei, soweit diese auf einer schuldhaften Verletzung dieser Zusicherung beruhen.
(6) Der Freelancer verzichtet gegenüber dem Auftraggeber auf das Recht auf Urheberbenennung, soweit gesetzlich zulässig. Erfindungen, die im Rahmen dieses Vertrags entstehen, werden dem Auftraggeber angezeigt; die Parteien einigen sich dann über die Übertragung gegen angemessene Vergütung.
(7) Die Vergütung nach § 4 gilt alle Rechtseinräumungen nach diesem Paragrafen ab.

§ 6 Geheimhaltung, Datenschutz, IT-Sicherheit
(1) Der Freelancer behandelt alle Informationen über den Auftraggeber, dessen Kunden, Produkte, Systeme, Quellcodes, Geschäftszahlen und Pläne, die er im Zusammenhang mit diesem Vertrag erhält, streng vertraulich und nutzt sie nur zur Vertragsdurchführung. Diese Pflicht gilt [z. B. 5] Jahre über das Vertragsende hinaus, für Geschäftsgeheimnisse im Sinne des GeschGehG unbegrenzt.
(2) Ausgenommen sind Informationen, die ohne Verschulden des Freelancers öffentlich bekannt sind oder werden, ihm nachweislich schon vorher bekannt waren oder die er aufgrund gesetzlicher Pflicht offenlegen muss. Allgemeines Erfahrungswissen und Fähigkeiten, die der Freelancer bei der Tätigkeit erwirbt, darf er weiter nutzen, soweit keine Geschäftsgeheimnisse des Auftraggebers betroffen sind.
(3) Erhält der Freelancer Zugriff auf personenbezogene Daten, für die der Auftraggeber verantwortlich ist, schließen die Parteien einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO (Anlage 2). Der Freelancer verwendet Produktivdaten nur, soweit es der Auftraggeber ausdrücklich erlaubt; für Entwicklung und Test sind anonymisierte oder synthetische Daten zu verwenden.
(4) Der Freelancer sichert seine Geräte nach dem Stand der Technik (Festplattenverschlüsselung, aktuelle Updates, Zwei-Faktor-Authentifizierung für alle Zugänge des Auftraggebers), verwendet die Zugangsdaten nur persönlich und meldet Sicherheitsvorfälle oder den Verlust von Geräten oder Zugangsdaten unverzüglich. Nach Vertragsende löscht er alle Daten des Auftraggebers und bestätigt dies in Textform.
(5) Für jeden schuldhaften Verstoß gegen Absatz 1 zahlt der Freelancer eine Vertragsstrafe von [Betrag] EUR; weitergehende Schadensersatzansprüche bleiben unberührt, die Vertragsstrafe wird angerechnet. [Optional streichen.]

§ 7 Haftung, Versicherung
(1) Der Freelancer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
(2) Bei leichter Fahrlässigkeit haftet der Freelancer nur bei Verletzung wesentlicher Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren Schaden, höchstens auf [Betrag, z. B. die in den letzten 6 Monaten gezahlte Nettovergütung] EUR je Vertragsjahr.
(3) Für Datenverlust haftet der Freelancer nur bis zum Wiederherstellungsaufwand bei ordnungsgemäßer Datensicherung durch den Auftraggeber. Der Auftraggeber ist für Code-Reviews, Tests vor Produktivsetzung und Backups seiner Systeme selbst verantwortlich, soweit diese Aufgaben nicht ausdrücklich dem Freelancer übertragen sind.
(4) Der Freelancer unterhält eine IT-Haftpflichtversicherung (Vermögensschäden) mit einer Deckungssumme von mindestens [Betrag] EUR und weist sie auf Verlangen nach.

§ 8 Laufzeit, Kündigung, Übergabe
(1) Der Vertrag beginnt am [Datum] und endet [mit Abschluss des Projekts, voraussichtlich am [Datum] / am [Datum]]. [Optional: Er verlängert sich um jeweils [z. B. 3] Monate, wenn er nicht mit einer Frist von [z. B. 4] Wochen zum Laufzeitende gekündigt wird.]
(2) Beide Parteien können den Vertrag mit einer Frist von [z. B. 4] Wochen zum Monatsende kündigen. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Kündigungen bedürfen der Schriftform.
(3) Nach einer Kündigung übergibt der Freelancer den aktuellen Stand aller Arbeitsergebnisse einschließlich Dokumentation und wirkt auf Wunsch des Auftraggebers bis zu [z. B. 3] Tagen zum vereinbarten Tagessatz an der Übergabe mit. Die bis zum Vertragsende erbrachten Leistungen werden nach § 4 vergütet.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An ihre Stelle tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt deutsches Recht. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(4) Anlagen: Anlage 1 Projektbeschreibung, Anlage 2 Auftragsverarbeitungsvertrag, [Anlage 3 Technische Richtlinien].
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Auftraggeber


______________________________
[Vorname Nachname], Freelancer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "beratervertrag",
    titel: "Beratervertrag (Beratung & Coaching)",
    kurz: "Beratungsvertrag für Unternehmensberatung, Coaching und Fachberatung: Leistungsumfang, Honorar, Termine, Absagefristen, Haftungsbegrenzung, Abgrenzung zur Rechts- und Steuerberatung.",
    kategorie: "dienstleistung",
    dateiname: "Beratervertrag-Coaching",
    wofuer: [
      "Du bietest als Berater, Coach oder Trainer ein Paket aus Terminen, Workshops oder laufender Begleitung an",
      "Du beauftragst einen Berater (Strategie, Marketing, Vertrieb, Personal) und willst Honorar und Umfang festhalten",
      "Stundenhonorar, Tagessatz oder Paketpreis mit klaren Absage- und Verschiebungsregeln",
      "Wenn klar sein soll, dass keine Rechts-, Steuer- oder Heilberatung geschuldet ist",
    ],
    enthaelt: [
      "§ 1 Gegenstand der Beratung",
      "§ 2 Art der Leistung, keine Erfolgsgarantie",
      "§ 3 Termine, Absage und Verschiebung",
      "§ 4 Mitwirkung des Auftraggebers",
      "§ 5 Honorar, Auslagen, Zahlung",
      "§ 6 Abgrenzung: keine Rechts-, Steuer- oder Heilberatung",
      "§ 7 Vertraulichkeit und Datenschutz",
      "§ 8 Haftung",
      "§ 9 Nutzungsrechte an Unterlagen",
      "§ 10 Laufzeit und Kündigung",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Rechtsberatung darfst du ohne Zulassung nicht anbieten (Rechtsdienstleistungsgesetz), Steuerberatung nur als Steuerberater (StBerG). Allgemeine betriebswirtschaftliche Hinweise sind erlaubt, die konkrete Prüfung eines Vertrags oder einer Steuerfrage nicht. Die Vorlage grenzt das ausdrücklich ab.",
      "Beratungsverträge mit Vertrauensstellung können nach § 627 BGB jederzeit fristlos gekündigt werden, wenn du nicht in einem dauernden Dienstverhältnis mit festen Bezügen stehst. Feste Laufzeiten und Paketpreise sind deshalb nur bedingt belastbar – plane mit Teilabrechnung je Termin.",
      "Absagegebühren müssen angemessen sein. Bei kurzfristiger Absage ist eine Pauschale üblich, die ersparte Aufwendungen berücksichtigt; 100 % für jede Absage hält vor Gericht meist nicht.",
      "Coaching mit gesundheitsbezogenen Versprechen (Angst, Depression, Burnout „heilen“) fällt schnell unter das Heilpraktikergesetz. Bleibe bei beruflicher und persönlicher Entwicklung und sage das im Vertrag.",
    ],
    faqs: [
      {
        q: "Schulde ich als Berater einen Erfolg?",
        a: "Nein, der Beratervertrag ist ein Dienstvertrag. Du schuldest fachgerechte Beratung nach bestem Wissen, nicht den wirtschaftlichen Erfolg der Umsetzung. Die Entscheidung über die Umsetzung bleibt beim Kunden. Die Vorlage hält das ausdrücklich fest.",
      },
      {
        q: "Kann der Kunde den Beratervertrag einfach kündigen?",
        a: "Bei Beratung, die auf besonderem Vertrauen beruht (das ist bei Beratung und Coaching regelmäßig der Fall), darf der Kunde nach § 627 BGB jederzeit kündigen; umgekehrt gilt das für dich auch, aber nicht zur Unzeit. Bereits erbrachte Leistungen werden vergütet. Deshalb rechnet die Vorlage je Termin oder je Monat ab.",
      },
      {
        q: "Darf ich als Unternehmensberater auch Verträge prüfen oder Steuertipps geben?",
        a: "Nur sehr eingeschränkt. Rechtsdienstleistungen sind als Nebenleistung erlaubt, wenn sie zum Berufsbild gehören und untergeordnet sind (§ 5 RDG), konkrete Steuerberatung ist Steuerberatern vorbehalten. Verweise im Zweifel an Anwalt oder Steuerberater, auch um deine Haftung zu begrenzen.",
      },
      {
        q: "Wie sichere ich mich gegen kurzfristige Absagen ab?",
        a: "Mit einer Absagefrist (z. B. 48 Stunden) und einer gestaffelten Ausfallpauschale, die der Kunde bei Absage nach Fristablauf zahlt. Bei Krankheit oder Verhinderung des Beraters wird der Termin kostenfrei nachgeholt. Beides steht in der Vorlage.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Beratervertrag brauchst",
        text: `Ein Beratervertrag gehört an den Anfang jeder bezahlten Beratung, jedes Coachings und jedes Trainings, das über ein einzelnes Gespräch hinausgeht. Typische Fälle: Du begleitest als Unternehmensberater ein Startup beim Aufbau des Vertriebs, du coachst eine Geschäftsführerin über sechs Monate, du gibst als Marketing-Berater Workshops oder du bietest ein Paket aus Analyse, Terminen und Abschlussbericht an.

Auch als Auftraggeber brauchst du das Muster, wenn du einen Berater für Strategie, Personal oder Finanzen engagierst und vorher klären willst, was genau geliefert wird, was ein Termin kostet und was bei Absagen passiert. Die Vorlage ist für Beratung und Coaching zwischen Unternehmen gebaut; für Privatpersonen als Kunden kommen Verbraucherschutzregeln dazu, die hier nicht enthalten sind.`,
      },
      {
        titel: "Was muss in einen Beratervertrag?",
        text: `Beratungsverträge scheitern selten an der Beratung, meist an unklaren Erwartungen. Die Vorlage hält deshalb in elf Paragrafen fest:

- § 1 Gegenstand der Beratung mit Aufzählung der Termine, Berichte und Erreichbarkeit zwischen den Terminen
- § 2 Dienstvertrag ohne Erfolgsgarantie: keine Umsatz-, Gewinn- oder Einsparziele, Umsetzung bleibt beim Kunden
- § 3 Termine, Absagefrist und gestaffelte Ausfallpauschale, kostenlose Nachholung bei Verhinderung des Beraters
- § 4 Mitwirkung des Auftraggebers und Ansprechpartner mit Entscheidungsbefugnis
- § 5 Honorar als Stundensatz, Tagessatz oder Paketpreis mit Einzelwerten, Auslagen, Abrechnung und Verzug
- § 6 Abgrenzung: keine Rechts-, Steuer-, Heil- oder Anlageberatung
- § 7 Vertraulichkeit, Datenschutz, Löschfrist für Gesprächsnotizen, keine Aufzeichnung ohne Zustimmung
- § 8 Haftung mit Begrenzung und verkürzter Verjährung
- § 9 Nutzungsrechte an Berichten und Präsentationen, Methoden bleiben beim Berater
- § 10 Laufzeit, Kündigung nach § 627 BGB, anteilige Abrechnung von Paketen
- § 11 Schlussbestimmungen

Die Einzelwerte im Paketpreis sind kein Detail: Sie entscheiden, was bei einer vorzeitigen Kündigung abgerechnet wird.`,
      },
      {
        titel: "Beratervertrag Muster ausfüllen",
        text: `Ersetze in § 1 das Beispiel durch dein Thema und fülle die Liste in Absatz 2 mit dem, was tatsächlich enthalten ist: Dauer des Auftaktgesprächs, Anzahl und Länge der Termine, ob persönlich oder per Video, ob ein schriftlicher Bericht dazugehört und wie viele Stunden E-Mail-Rückfragen pro Monat abgedeckt sind. In § 2 Abs. 3 legst du fest, ob du persönlich leistest oder benannte Mitarbeiter einsetzen darfst.

In § 3 trägst du Absagefrist und die beiden Stufen der Ausfallpauschale ein, dazu Ort der Termine und die Regel für Reisezeiten. In § 4 nennst du den Ansprechpartner des Kunden. In § 5 wählst du Variante A, B oder C und löschst die anderen; bei Paketpreisen trägst du die Einzelwerte je Termin und für den Bericht ein. Kleinunternehmer behalten den Satz zu § 19 UStG. In § 7 setzt du die Löschfrist für Gesprächsnotizen, in § 8 Haftungsobergrenze und Verjährungsfrist, in § 10 Beginn, Ende oder Kündigungsfrist. Dann Gerichtsstand, Datum und Unterschriften. Die Vorlage gibt es als Word, PDF und Text.`,
      },
      {
        titel: "Typische Fehler im Beratungsvertrag",
        text: `Der häufigste Fehler ist das Erfolgsversprechen in der Werbung, das der Vertrag dann nicht mehr einfängt: Umsatzverdopplung auf der Website, Dienstvertrag im Vertrag. Gerichte lesen beides zusammen. Halte Marketing und Vertrag konsistent und bleibe bei dem, was du beeinflussen kannst.

Zweiter Fehler: Rechts- oder Steuerfragen nebenbei beantworten. Die konkrete Prüfung eines Vertrags oder einer steuerlichen Gestaltung ist Anwälten und Steuerberatern vorbehalten; wer das trotzdem tut, riskiert Abmahnung und haftet ohne Versicherungsschutz. § 6 der Vorlage zieht die Grenze, du musst sie im Alltag einhalten.

Dritter Fehler: Paketpreise ohne Einzelwerte. Kündigt der Kunde nach § 627 BGB nach der Hälfte, musst du nachweisen, was die erbrachten Termine wert waren. Weitere Stolperfallen sind Absagepauschalen von 100 Prozent, die vor Gericht selten halten, Coaching mit Gesundheitsversprechen, das unter das Heilpraktikergesetz fällt, und fehlende Regeln für Gesprächsnotizen und Aufzeichnungen.`,
      },
      {
        titel: "Rechtliche Grundlagen: § 611 und § 627 BGB",
        text: `Beratung und Coaching sind Dienstverträge nach den §§ 611 ff. BGB. Geschuldet ist die sorgfältige Beratung, nicht der wirtschaftliche Erfolg. Besonders wichtig ist § 627 BGB: Dienste höherer Art, die aufgrund besonderen Vertrauens übertragen werden, kann der Kunde jederzeit kündigen, wenn der Berater nicht in einem dauernden Dienstverhältnis mit festen Bezügen steht. Der Berater darf ebenfalls kündigen, aber nicht zur Unzeit. Bereits erbrachte Leistungen sind nach § 628 BGB zu vergüten.

Rechtsdienstleistungen regelt das Rechtsdienstleistungsgesetz; § 5 RDG erlaubt sie nur als Nebenleistung zum eigentlichen Berufsbild. Hilfeleistung in Steuersachen ist nach dem Steuerberatungsgesetz den dort genannten Berufen vorbehalten. Für Zahlungsverzug gilt § 288 BGB, für die Haftungsbegrenzung gelten die Grenzen der §§ 305 ff. BGB, sobald der Vertrag mehrfach verwendet wird. Berichte und Präsentationen des Beraters sind nach § 2 UrhG geschützt, sodass der Kunde nur die in § 9 eingeräumten Nutzungsrechte erhält.`,
      },
      {
        titel: "Wann der Beratervertrag nicht reicht",
        text: `Für Coaching mit Privatpersonen, Online-Kurse oder Mitgliedschaftsprogramme brauchst du zusätzlich Widerrufsbelehrung und verbraucherkonforme Laufzeitregeln; dafür ist diese B2B-Vorlage nicht gemacht. Geht es um Interimsmanagement, bei dem du tatsächlich Entscheidungen im Unternehmen triffst, um Beratung mit Erfolgshonorar oder um Mandate mit sehr hohen Honoraren, lass den Vertrag anwaltlich anpassen.

Berührst du in deiner Beratung regelmäßig Rechts- oder Steuerfragen, kläre mit einem Anwalt, wo bei deinem Berufsbild die Grenze der zulässigen Nebenleistung liegt. Bei gesundheitsnahem Coaching entscheidet im Zweifel das Gesundheitsamt, ob eine Heilpraktikererlaubnis nötig ist. GründerX stellt die Vorlage als Software bereit und ersetzt keine Rechtsberatung; die Anpassung an deinen Einzelfall bleibt deine Aufgabe.`,
      },
    ],
    seo: {
      title: "Beratervertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Beratervertrag und Coaching-Vertrag als kostenlose Vorlage: Leistungsumfang, Honorar, Absagefristen, Haftungsbegrenzung, keine Rechts- oder Steuerberatung.",
    },
    stand: "2026-10",
    text: `Beratervertrag

zwischen

[Firma / Name], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftraggeber“ –

und

[Firma / Name des Beraters], [Straße, PLZ Ort]
– nachfolgend „Berater“ –

– gemeinsam „die Parteien“ –

§ 1 Gegenstand der Beratung
(1) Der Berater berät und begleitet den Auftraggeber zu folgendem Thema: [genaue Beschreibung, z. B. „Entwicklung einer Vertriebsstrategie für das Produkt [Name] einschließlich Zielgruppenanalyse, Preisgestaltung und Aufbau eines Vertriebsprozesses“ / „Business-Coaching für die Geschäftsführung zu Führung, Priorisierung und Zeitmanagement“].
(2) Die Beratung umfasst:
   a) [z. B. ein Auftaktgespräch von etwa [Stunden] Stunden zur Analyse der Ausgangslage],
   b) [z. B. [Anzahl] Beratungstermine von je [Dauer] Stunden, persönlich in [Ort] oder per Videokonferenz],
   c) [z. B. einen schriftlichen Abschlussbericht mit Handlungsempfehlungen],
   d) [z. B. Erreichbarkeit per E-Mail für Rückfragen zwischen den Terminen im Umfang von bis zu [Stunden] Stunden pro Monat].
(3) Leistungen, die in Absatz 2 nicht genannt sind, insbesondere die Umsetzung der Empfehlungen im Unternehmen des Auftraggebers, sind nicht Gegenstand dieses Vertrags und werden bei Bedarf gesondert vereinbart.

§ 2 Art der Leistung, keine Erfolgsgarantie
(1) Dieser Vertrag ist ein Dienstvertrag (§§ 611 ff. BGB). Der Berater erbringt seine Leistungen nach bestem Wissen und Gewissen, mit der Sorgfalt eines ordentlichen Beraters und auf Grundlage der vom Auftraggeber bereitgestellten Informationen.
(2) Der Berater schuldet keinen bestimmten wirtschaftlichen Erfolg, insbesondere keine Umsatz-, Gewinn- oder Einsparziele. Alle Entscheidungen über die Umsetzung von Empfehlungen trifft der Auftraggeber eigenverantwortlich.
(3) Der Berater ist in der Gestaltung seiner Tätigkeit frei und keinen Weisungen des Auftraggebers unterworfen. Er darf für andere Auftraggeber tätig sein. Er erbringt die Leistung [persönlich / persönlich oder durch namentlich benannte Mitarbeiter mit gleichwertiger Qualifikation].

§ 3 Termine, Absage und Verschiebung
(1) Termine werden einvernehmlich in Textform vereinbart. Vereinbarte Termine sind verbindlich.
(2) Der Auftraggeber kann einen Termin bis [z. B. 48] Stunden vor Beginn kostenfrei in Textform absagen oder verschieben. Bei späterer Absage oder Nichterscheinen berechnet der Berater eine Ausfallpauschale von [z. B. 50] % des auf den Termin entfallenden Honorars; bei Absage am selben Tag oder Nichterscheinen [z. B. 80] %. Dem Auftraggeber bleibt der Nachweis vorbehalten, dass kein oder ein geringerer Ausfall entstanden ist; dem Berater der Nachweis eines höheren Schadens.
(3) Ist der Berater aus von ihm zu vertretenden Gründen oder wegen Krankheit verhindert, teilt er dies unverzüglich mit; der Termin wird kostenfrei nachgeholt. Weitergehende Ansprüche des Auftraggebers bestehen insoweit nicht.
(4) Termine finden [in den Räumen des Auftraggebers / in den Räumen des Beraters / per Videokonferenz] statt. Reisezeiten werden [nicht / mit [z. B. 50] % des Stundensatzes] vergütet.

§ 4 Mitwirkung des Auftraggebers
(1) Der Auftraggeber stellt dem Berater alle für die Beratung erforderlichen Informationen und Unterlagen vollständig und rechtzeitig zur Verfügung und benennt einen Ansprechpartner mit Entscheidungsbefugnis: [Vorname Nachname, Funktion].
(2) Der Berater darf die vom Auftraggeber gemachten Angaben als richtig und vollständig zugrunde legen; eine Prüfung auf Richtigkeit schuldet er nur, wenn dies ausdrücklich vereinbart ist.
(3) Verzögerungen, die auf fehlender Mitwirkung beruhen, verlängern Fristen entsprechend. Mehraufwand wird nach § 5 Abs. 1 vergütet.

§ 5 Honorar, Auslagen, Zahlung
(1) Das Honorar beträgt [Variante A: [Betrag] EUR je Stunde, abgerechnet im [15-Minuten-]Takt] [Variante B: [Betrag] EUR je Beratungstag (8 Stunden), halbe Tage anteilig] [Variante C: einen Paketpreis von [Betrag] EUR für die in § 1 Abs. 2 genannten Leistungen; der Paketpreis entspricht [Anzahl] Terminen zu je [Betrag] EUR und einem Bericht zu [Betrag] EUR], jeweils zuzüglich gesetzlicher Umsatzsteuer. [Bei Kleinunternehmern: Der Berater weist gemäß § 19 UStG keine Umsatzsteuer aus.]
(2) Reisekosten und Auslagen werden gegen Beleg erstattet, wenn sie vorab in Textform freigegeben wurden; Pkw mit [Betrag] EUR je Kilometer, Bahn 2. Klasse, Übernachtungen bis [Betrag] EUR.
(3) Abrechnung: [Variante A/B: monatlich nach Aufwand mit Tätigkeitsnachweis] [Variante C: [z. B. 50] % bei Vertragsschluss, [z. B. 50] % nach dem letzten Termin / monatlich anteilig]. Rechnungen sind innerhalb von [z. B. 14] Tagen ohne Abzug zahlbar.
(4) Bei Zahlungsverzug gelten Verzugszinsen in gesetzlicher Höhe (zwischen Unternehmern 9 Prozentpunkte über dem Basiszinssatz) und die Pauschale nach § 288 Abs. 5 BGB. Der Berater darf weitere Termine bis zum Ausgleich offener Rechnungen zurückstellen.

§ 6 Abgrenzung: keine Rechts-, Steuer- oder Heilberatung
(1) Der Berater erbringt keine Rechtsdienstleistungen im Sinne des Rechtsdienstleistungsgesetzes und keine Hilfeleistung in Steuersachen im Sinne des Steuerberatungsgesetzes. Allgemeine Hinweise auf rechtliche oder steuerliche Rahmenbedingungen sind unverbindlich und ersetzen nicht die Beratung durch Rechtsanwalt oder Steuerberater; der Auftraggeber zieht diese bei Bedarf selbst hinzu.
(2) Der Berater erbringt keine Heilbehandlung, Psychotherapie oder medizinische Beratung. Coaching dient der beruflichen und persönlichen Entwicklung gesunder Personen. Der Auftraggeber bzw. die gecoachte Person trägt die Verantwortung dafür, bei gesundheitlichen Beschwerden ärztliche oder therapeutische Hilfe in Anspruch zu nehmen.
(3) Keine Anlageberatung: Hinweise zu Finanzierung oder Investitionen sind allgemeiner Natur und keine Anlage- oder Finanzberatung.

§ 7 Vertraulichkeit und Datenschutz
(1) Der Berater behandelt alle Informationen über den Auftraggeber, dessen Geschäft, Kunden, Zahlen und Pläne sowie alle Inhalte der Beratungsgespräche streng vertraulich, auch über das Vertragsende hinaus. Mitarbeiter und Hilfspersonen werden entsprechend verpflichtet.
(2) Ausgenommen sind Informationen, die ohne Verschulden des Beraters öffentlich bekannt sind, oder deren Offenlegung gesetzlich oder behördlich angeordnet ist.
(3) Der Berater verarbeitet personenbezogene Daten nur zur Vertragsdurchführung und nach den Vorgaben der DSGVO. Gesprächsnotizen werden [z. B. 12] Monate nach Vertragsende gelöscht, soweit keine Aufbewahrungspflichten bestehen. Aufzeichnungen (Audio/Video) von Terminen erfolgen nur mit ausdrücklicher Zustimmung beider Seiten.
(4) Der Berater darf den Auftraggeber nur nach Zustimmung in Textform als Referenz nennen.

§ 8 Haftung
(1) Der Berater haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
(2) Bei leichter Fahrlässigkeit haftet der Berater nur bei Verletzung wesentlicher Vertragspflichten und begrenzt auf den vertragstypischen, vorhersehbaren Schaden, höchstens auf [Betrag, z. B. das Honorar dieses Vertrags, mindestens 10.000] EUR je Schadensfall.
(3) Der Berater haftet nicht für Entscheidungen, die der Auftraggeber auf Grundlage der Beratung trifft, und nicht für Schäden, die auf unrichtigen oder unvollständigen Angaben des Auftraggebers beruhen.
(4) Ansprüche gegen den Berater verjähren in [z. B. 12] Monaten ab Kenntnis des Anspruchsgrundes, spätestens drei Jahre nach der Leistung; das gilt nicht für Ansprüche nach Absatz 1.
(5) [Optional: Der Berater unterhält eine Vermögensschadenhaftpflichtversicherung mit einer Deckungssumme von [Betrag] EUR.]

§ 9 Nutzungsrechte an Unterlagen
(1) Der Auftraggeber erhält an Berichten, Präsentationen, Konzepten und Arbeitshilfen, die der Berater für ihn erstellt, ein einfaches, zeitlich unbeschränktes Nutzungsrecht für interne Zwecke. Eine Weitergabe an Dritte oder Veröffentlichung bedarf der Zustimmung des Beraters, ausgenommen die Weitergabe an Berater, Banken und Investoren des Auftraggebers unter Vertraulichkeit.
(2) Methoden, Vorlagen, Tools und Vorwissen des Beraters bleiben sein Eigentum und dürfen von ihm weiter verwendet werden, soweit dabei keine vertraulichen Informationen des Auftraggebers offengelegt werden.

§ 10 Laufzeit und Kündigung
(1) Der Vertrag beginnt am [Datum] und [endet mit Erbringung der in § 1 Abs. 2 genannten Leistungen, voraussichtlich am [Datum] / läuft auf unbestimmte Zeit und kann von beiden Seiten mit einer Frist von [z. B. 4] Wochen zum Monatsende gekündigt werden].
(2) Das Recht zur Kündigung nach § 627 BGB und aus wichtigem Grund bleibt unberührt. Kündigt der Berater, darf er nicht zur Unzeit kündigen, es sei denn, ein wichtiger Grund liegt vor.
(3) Kündigungen bedürfen der Schriftform. Bis zum Vertragsende erbrachte Leistungen werden nach § 5 vergütet; bei Paketpreisen anteilig nach dem in § 5 Abs. 1 genannten Einzelwert der erbrachten Leistungen. Bereits geleistete Vorauszahlungen für nicht erbrachte Leistungen werden erstattet.

§ 11 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An ihre Stelle tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt deutsches Recht. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(4) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Auftraggeber


______________________________
[Vorname Nachname], Berater

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "agenturvertrag-marketing",
    titel: "Agenturvertrag Marketing / Social Media / Ads",
    kurz: "Vertrag zwischen Marketing-, Social-Media- oder Performance-Agentur und Kunde: Leistungspakete, Retainer, Werbebudget getrennt, Reporting, Zugänge, Nutzungsrechte, Kündigung.",
    kategorie: "dienstleistung",
    dateiname: "Agenturvertrag-Marketing-Social-Media",
    wofuer: [
      "Du führst eine Agentur und betreust Kunden laufend: Social Media, Content, Google/Meta Ads, SEO, E-Mail-Marketing",
      "Du beauftragst als Gründer eine Agentur und willst Umfang, Kosten und Ausstieg klar geregelt haben",
      "Monatlicher Retainer mit festem Leistungspaket plus getrennt abgerechnetem Werbebudget",
      "Wenn Content-Rechte, Zugänge zu Werbekonten und Reporting von Anfang an sauber verteilt sein sollen",
    ],
    enthaelt: [
      "§ 1 Leistungen und Leistungspakete",
      "§ 2 Art der Leistung, keine Erfolgsgarantie",
      "§ 3 Werbebudget und Fremdkosten (getrennt vom Honorar)",
      "§ 4 Zugänge, Konten und Inhaberschaft",
      "§ 5 Freigaben, Reporting, Abstimmung",
      "§ 6 Vergütung (Retainer) und Zahlung",
      "§ 7 Nutzungsrechte an Content",
      "§ 8 Rechtliche Verantwortung für Inhalte und Werbung",
      "§ 9 Vertraulichkeit und Datenschutz",
      "§ 10 Haftung",
      "§ 11 Laufzeit und Kündigung, Übergabe",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Werbekonten (Meta Business Manager, Google Ads, TikTok Ads) sollten immer dem Kunden gehören; die Agentur bekommt nur Zugriff als Partner oder Nutzer. Sonst ist beim Agenturwechsel die gesamte Kampagnenhistorie weg und das Budget lief über fremde Konten.",
      "Werbebudget und Agenturhonorar immer trennen. Läuft das Budget über die Agentur, ist das durchlaufender Posten oder Fremdleistung mit Vorkasse – das muss in der Rechnung und im Vertrag erkennbar sein.",
      "Die Agentur haftet nicht automatisch für wettbewerbs- oder markenrechtliche Fehler in Inhalten, die der Kunde freigegeben hat – aber sie muss auf erkennbare Risiken hinweisen. Die Vorlage verteilt die Verantwortung ausdrücklich.",
      "Laufzeiten von 12 Monaten mit automatischer Verlängerung sind zwischen Unternehmen zulässig, aber bei kleinen Kunden ein häufiger Streitpunkt. Kürzere Mindestlaufzeit und 1 bis 3 Monate Kündigungsfrist sind marktüblich.",
    ],
    faqs: [
      {
        q: "Wem gehören die Werbekonten und die Daten darin?",
        a: "Nach der Vorlage dem Kunden. Die Agentur richtet Konten im Namen des Kunden ein oder erhält Zugriff auf bestehende Konten; alle Konten, Pixel, Zielgruppen und Kampagnendaten bleiben beim Kunden. Bei Vertragsende werden die Zugriffe der Agentur entzogen, nicht die Konten übergeben.",
      },
      {
        q: "Schuldet die Agentur bestimmte Ergebnisse wie Reichweite oder Leads?",
        a: "Nein. Der Agenturvertrag ist im Kern ein Dienstvertrag, die Agentur schuldet fachgerechte Arbeit, nicht Zahlen, die von Plattformen, Markt und Produkt abhängen. Nur einzeln vereinbarte Werkleistungen wie ein fertiges Video oder eine Landingpage unterliegen Abnahme und Gewährleistung.",
      },
      {
        q: "Darf ich den Content nach Vertragsende weiter nutzen?",
        a: "Nur, wenn die Nutzungsrechte eingeräumt sind. Die Vorlage überträgt dem Kunden mit Zahlung die unbeschränkten Nutzungsrechte an erstellten Inhalten; für lizenziertes Fremdmaterial (Stockfotos, Musik, Fonts) gelten die jeweiligen Lizenzen, die die Agentur im Namen des Kunden erwirbt.",
      },
      {
        q: "Wer haftet, wenn ein Post gegen Werberecht verstößt?",
        a: "Nach außen immer das werbende Unternehmen, also der Kunde. Im Innenverhältnis haftet die Agentur, wenn der Fehler auf ihrer Arbeit beruht und sie nicht auf das Risiko hingewiesen hat. Freigaben des Kunden und Vorgaben zu Claims verschieben die Verantwortung zum Kunden.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Agenturvertrag brauchst",
        text: `Ein Agenturvertrag gehört vor den ersten Post und vor die erste Kampagne. Typische Fälle: Du führst eine Social-Media-Agentur und betreust Kunden im monatlichen Retainer. Du steuerst als Performance-Agentur Meta- und Google-Ads mit fremdem Budget. Du bist Gründer und beauftragst eine Agentur für Content, SEO oder E-Mail-Marketing und willst wissen, was im Paket steckt, wem die Werbekonten gehören und wie du wieder herauskommst.

Die Vorlage ist für laufende Betreuung mit festem Leistungspaket gebaut. Einzelne Produktionen wie ein Imagefilm oder eine Landingpage sind als Werkleistungen eingebettet, aber der Kern bleibt ein Dienstvertrag. Für reine Einmalprojekte nimm den Werkvertrag, für Creator-Buchungen den Influencer-Kooperationsvertrag.`,
      },
      {
        titel: "Was muss in einen Agenturvertrag?",
        text: `Agenturverträge streiten sich an drei Stellen: Umfang, Budget und Zugänge. Die Vorlage regelt in zwölf Paragrafen:

- § 1 Leistungspaket mit Stückzahlen pro Monat für Beiträge, Anzeigen, Grafiken und Reporting, Ausschlüsse und Stundensatz für Zusatzleistungen
- § 2 Dienstvertrag ohne Garantie für Reichweite, Leads oder Rankings; einzelne Werkleistungen mit Abnahme
- § 3 Werbebudget getrennt vom Honorar, als Direktzahlung des Kunden oder als durchlaufender Posten mit Vorauszahlung
- § 4 Werbekonten, Business-Manager, Pixel und Zielgruppen gehören dem Kunden; die Agentur erhält nur Zugriffsrechte
- § 5 Freigabeprozess mit Frist, Verfall nicht genutzter Kontingente, monatliches Reporting
- § 6 Retainer im Voraus, optionale Setup-Gebühr und erfolgsabhängiger Anteil, Preisanpassung
- § 7 Nutzungsrechte an Content, Fremdlizenzen, Referenznutzung
- § 8 Verteilung der rechtlichen Verantwortung für Werbeaussagen und Kennzeichnung
- § 9 Vertraulichkeit und Auftragsverarbeitung, § 10 Haftung ohne Plattformrisiken
- § 11 Mindestlaufzeit, Verlängerung, Kündigung, Übergabe in bearbeitbaren Formaten
- § 12 Schlussbestimmungen

Die Kontoinhaberschaft in § 4 ist der Punkt, den Kunden beim Agenturwechsel am häufigsten bereuen.`,
      },
      {
        titel: "Agenturvertrag Muster ausfüllen",
        text: `Trage Kunde und Agentur mit Rechtsform ein und gib dem Leistungspaket in § 1 einen Namen. Fülle die Stückzahlen ehrlich: Kanäle, Beiträge, Stories, Anzeigenplattformen, Grafiken, Videos, Texte, Umfang des Strategiegesprächs. Setze den Stundensatz für Zusatzleistungen. In § 3 trägst du das anfängliche Werbebudget ein, wählst Variante A oder B und legst die zulässige Überschreitung und den Handling-Aufschlag für Fremdkosten fest.

In § 4 setzt du die Frist, in der der Kunde Zugänge gewährt. In § 5 legst du Freigabefrist, Verfall oder Übertrag von Kontingenten, Reporting-Termin und Abstimmungsrhythmus fest; wenn Community-Management ohne Einzelfreigabe laufen soll, behalte Absatz 2. In § 6 trägst du Retainer, Fälligkeit, Zahlungsziel, optionale Setup-Gebühr und Erfolgsanteil ein. In § 9 setzt du die Dauer der Vertraulichkeit, in § 10 den Haftungszeitraum, in § 11 Beginn, Mindestlaufzeit, Verlängerung, Kündigungsfrist und Übergabefrist. Danach Gerichtsstand, Anlagen und Unterschriften. Die Word-Datei lässt sich dafür direkt bearbeiten.`,
      },
      {
        titel: "Typische Fehler im Agenturvertrag",
        text: `Der folgenreichste Fehler: Werbekonten laufen auf die Agentur. Beim Wechsel sind Kampagnenhistorie, Pixel-Daten und Zielgruppen weg, und die Rechnungen der Plattform standen auf fremdem Namen. § 4 der Vorlage verhindert das, aber nur, wenn ihr es auch so einrichtet.

Zweiter Fehler: Werbebudget und Honorar in einer Summe. Dann weiß der Kunde nicht, was die Agentur verdient, und die Agentur trägt das Zahlungsausfallrisiko für Mediakosten. Trennt beides in Vertrag und Rechnung.

Dritter Fehler: Zusagen zu Reichweite oder Leads. Werden sie zum Vertragsinhalt, schuldet die Agentur ein Werk, das sie nicht kontrollieren kann. Weitere Stolperfallen sind Freigaben per Chat ohne Nachweis, fehlende Lizenzen für Stockmaterial und Musik, Werbekennzeichnung, die niemand prüft, zwölf Monate Mindestlaufzeit mit stiller Verlängerung bei kleinen Kunden und fehlende Übergaberegeln, sodass bezahlte Inhalte nur als flache Exporte ankommen.`,
      },
      {
        titel: "Rechtliche Grundlagen für Marketing- und Social-Media-Agenturen",
        text: `Die laufende Betreuung ist ein Dienstvertrag nach den §§ 611 ff. BGB, einzelne Produktionen sind Werkverträge nach den §§ 631 ff. BGB mit Abnahme nach § 640 BGB. Nutzungsrechte an Texten, Grafiken und Videos entstehen nach dem Urheberrechtsgesetz beim Urheber und gehen nur im Umfang des § 7 der Vorlage über; für Fremdmaterial gelten die Lizenzbedingungen der Anbieter.

Werbung muss als solche erkennbar sein. § 5a Abs. 4 UWG verbietet verdeckte kommerzielle Kommunikation, § 22 Abs. 1 MStV verlangt die Kennzeichnung in Telemedien; Verstöße treffen nach außen den werbenden Unternehmer, also den Kunden. Für Lead-Formulare, Custom Audiences und Community-Nachrichten ist die Agentur meist Auftragsverarbeiter, sodass Art. 28 DSGVO einen Vertrag verlangt; für Cookie-Einwilligungen bleibt der Kunde als Verantwortlicher zuständig. Für Zahlungsverzug gilt § 288 BGB, für Haftungsklauseln bei mehrfacher Verwendung die Inhaltskontrolle nach den §§ 305 ff. BGB.`,
      },
      {
        titel: "Wann die Agenturvertrag-Vorlage nicht reicht",
        text: `Übernimmt die Agentur Shop- oder Website-Entwicklung, Influencer-Buchungen im Namen des Kunden oder die gesamte Marketingabteilung als Outsourcing, braucht es Zusatzverträge: Werkvertrag, Influencer-Kooperationsvertrag, Rahmenvertrag. Wird mit Gesundheits-, Finanz- oder Umweltaussagen geworben, muss ein Anwalt die Claims prüfen; die Vorlage verteilt nur die Verantwortung, sie macht Aussagen nicht zulässig.

Bei erfolgsabhängiger Vergütung in größerem Umfang, bei Kunden außerhalb Deutschlands oder wenn die Agentur Verträge mit Plattformen und Dienstleistern im eigenen Namen für den Kunden schließt, gehört der Vertrag in anwaltliche Hände. Setzt du ihn für alle Kunden ein, lass ihn als AGB prüfen. GründerX liefert das Muster als Software, nicht als Rechtsberatung; die Verantwortung für Werbeinhalte und Verträge bleibt bei Agentur und Kunde.`,
      },
    ],
    seo: {
      title: "Agenturvertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Agenturvertrag für Marketing, Social Media und Ads als kostenlose Vorlage: Leistungspakete, Retainer, Werbebudget, Zugänge, Reporting, Nutzungsrechte.",
    },
    stand: "2026-10",
    text: `Agenturvertrag (Marketing, Social Media, Online-Werbung)

zwischen

[Firma des Kunden], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Kunde“ –

und

[Firma der Agentur], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Agentur“ –

– gemeinsam „die Parteien“ –

§ 1 Leistungen und Leistungspakete
(1) Die Agentur erbringt für den Kunden laufende Marketingleistungen nach dem in Anlage 1 beschriebenen Leistungspaket „[Name des Pakets]“. Das Paket umfasst insbesondere:
   a) Social Media: Betreuung der Kanäle [z. B. Instagram, TikTok, LinkedIn] mit [Anzahl] Beiträgen und [Anzahl] Stories/Reels pro Monat, Community-Management an Werktagen innerhalb von [z. B. 24] Stunden,
   b) Online-Werbung: Planung, Einrichtung und Steuerung von Kampagnen auf [z. B. Meta Ads, Google Ads, TikTok Ads], einschließlich Zielgruppen, Anzeigentexten und Creatives, mit laufender Optimierung,
   c) Content-Erstellung: [Anzahl] Grafiken, [Anzahl] Kurzvideos, [Anzahl] Blog- oder Newsletter-Texte pro Monat,
   d) Reporting und Strategie: monatlicher Bericht nach § 5 und ein Strategiegespräch von etwa [Dauer] pro [Monat / Quartal].
(2) Nicht enthalten sind insbesondere: Foto- und Videoproduktionen mit externer Crew, Influencer-Honorare, Werbebudget (§ 3), Lizenzen für Stockmaterial und Software, Druck und Versand sowie Entwicklung von Websites. Solche Leistungen werden auf Anfrage gesondert angeboten.
(3) Zusatzleistungen außerhalb des Pakets werden mit [Betrag] EUR je Stunde abgerechnet, nachdem der Kunde eine Aufwandsschätzung in Textform freigegeben hat.
(4) Die Agentur darf freie Mitarbeiter und Subunternehmer (z. B. Grafiker, Texter, Videografen) einsetzen und bleibt für deren Leistungen verantwortlich.

§ 2 Art der Leistung, keine Erfolgsgarantie
(1) Die laufenden Leistungen nach § 1 sind Dienstleistungen (§§ 611 ff. BGB). Die Agentur arbeitet nach dem anerkannten Stand des Online-Marketings und mit der Sorgfalt einer ordentlichen Agentur. Sie schuldet keinen bestimmten Erfolg, insbesondere keine Reichweiten, Follower-Zahlen, Klickpreise, Conversion-Raten, Umsätze oder Rankings. Zielwerte in Anlage 1 sind Planungsgrößen.
(2) Einzelne, in Anlage 1 als Werkleistung gekennzeichnete Ergebnisse (z. B. ein fertiges Video, eine Landingpage) werden nach Fertigstellung zur Abnahme vorgelegt; für sie gelten ergänzend die §§ 631 ff. BGB.
(3) Die Agentur ist in der Gestaltung der Arbeit frei und nicht in die Betriebsorganisation des Kunden eingegliedert. Inhaltliche Vorgaben des Kunden (Markenrichtlinien, Tonalität, Sperrthemen) sind zu beachten.

§ 3 Werbebudget und Fremdkosten
(1) Das Werbebudget (Mediakosten für Plattformen wie Meta, Google, TikTok) ist nicht Bestandteil der Agenturvergütung. Es beträgt zunächst [Betrag] EUR pro Monat und wird vom Kunden festgelegt; Änderungen teilt der Kunde in Textform mit mindestens [z. B. 5] Werktagen Vorlauf mit.
(2) Das Werbebudget wird [Variante A: direkt vom Kunden über ein auf ihn laufendes Zahlungsmittel in seinem Werbekonto bezahlt] [Variante B: von der Agentur verauslagt und monatlich gegen Nachweis als durchlaufender Posten bzw. Fremdleistung ohne Aufschlag weiterberechnet; der Kunde leistet eine Vorauszahlung in Höhe des Monatsbudgets]. Die Agentur darf das vereinbarte Budget ohne Freigabe nicht um mehr als [z. B. 10] % überschreiten.
(3) Sonstige Fremdkosten (Stockmaterial, Musiklizenzen, Tools, Influencer) werden nur nach Freigabe in Textform beauftragt und [ohne Aufschlag / mit einem Handling-Aufschlag von [z. B. 10] %] weiterberechnet.

§ 4 Zugänge, Konten und Inhaberschaft
(1) Alle Social-Media-Profile, Werbekonten, Business-Manager, Pixel, Tracking-Container, Zielgruppen, Domains und Tools, die für den Kunden genutzt werden, stehen im Eigentum und unter der Inhaberschaft des Kunden. Die Agentur richtet neue Konten stets auf den Kunden ein und erhält nur Zugriffsrechte als Partner, Nutzer oder Verwalter.
(2) Der Kunde gewährt der Agentur die für die Leistung erforderlichen Zugriffe (Rollen, Rechte) innerhalb von [z. B. 5] Werktagen nach Vertragsschluss. Zugangsdaten werden nur über ein sicheres Verfahren übermittelt und nie in E-Mails im Klartext; wo möglich, werden personalisierte Zugänge mit Zwei-Faktor-Authentifizierung verwendet.
(3) Die Agentur nutzt die Zugänge ausschließlich zur Vertragsdurchführung und entzieht ausgeschiedenen Mitarbeitern den Zugriff unverzüglich. Bei Vertragsende entfernt der Kunde die Zugriffe der Agentur; die Agentur wirkt daran mit und gibt alle ihr bekannten Zugangsdaten zurück.

§ 5 Freigaben, Reporting, Abstimmung
(1) Die Agentur legt Inhalte (Beiträge, Anzeigen, Creatives, Texte) vor Veröffentlichung in einem Redaktionsplan oder Freigabetool zur Freigabe vor. Der Kunde gibt innerhalb von [z. B. 2] Werktagen frei oder nennt Änderungswünsche. Bleibt die Freigabe aus, verschiebt sich die Veröffentlichung; nicht genutzte Kontingente eines Monats verfallen [am Monatsende / werden bis zu [z. B. 30] % in den Folgemonat übertragen].
(2) [Optional: Für Community-Management und reaktive Inhalte darf die Agentur innerhalb der in Anlage 1 festgelegten Leitlinien ohne Einzelfreigabe veröffentlichen.]
(3) Die Agentur erstellt bis zum [z. B. 10.] Werktag jedes Monats einen Bericht über den Vormonat mit den wesentlichen Kennzahlen (z. B. Reichweite, Interaktionen, Follower-Entwicklung, Ausgaben, Klickpreise, Conversions, Kosten je Conversion) sowie Empfehlungen. Der Kunde erhält jederzeit Einsicht in seine Werbekonten.
(4) Ansprechpartner: für den Kunden [Vorname Nachname, E-Mail], für die Agentur [Vorname Nachname, E-Mail]. Regelmäßige Abstimmungstermine finden [z. B. alle zwei Wochen] per Videokonferenz statt.

§ 6 Vergütung und Zahlung
(1) Die Agentur erhält für das Leistungspaket nach § 1 eine monatliche Pauschalvergütung (Retainer) von [Betrag] EUR zuzüglich gesetzlicher Umsatzsteuer. [Optional: Für die Einrichtung (Setup, Strategie, Kontenstruktur) fällt einmalig [Betrag] EUR an.] [Optional: Zusätzlich erhält die Agentur eine erfolgsabhängige Vergütung von [z. B. 10] % des vom Kunden freigegebenen Werbebudgets.]
(2) Der Retainer ist monatlich im Voraus bis zum [z. B. 3.] Werktag fällig; Zusatzleistungen und Fremdkosten werden nachträglich zum Monatsende abgerechnet. Zahlungsziel: [z. B. 14] Tage ohne Abzug.
(3) Bei Zahlungsverzug gelten Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz und die Pauschale nach § 288 Abs. 5 BGB. Die Agentur darf bei Verzug mit mehr als einer Monatsvergütung nach Ankündigung mit [z. B. 7] Tagen Frist Kampagnen pausieren und Leistungen zurückhalten; Nachteile aus der Pause trägt der Kunde.
(4) Die Agentur kann den Retainer erstmals nach [z. B. 12] Monaten mit einer Frist von [z. B. 2] Monaten anpassen. Widerspricht der Kunde, kann die Agentur zum Wirksamwerden der Anpassung kündigen.

§ 7 Nutzungsrechte an Content
(1) Die Agentur räumt dem Kunden mit vollständiger Zahlung der jeweiligen Monatsvergütung an allen für ihn erstellten Inhalten (Texte, Grafiken, Fotos, Videos, Anzeigen, Konzepte) das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte Recht ein, sie für eigene Werbe- und Kommunikationszwecke in allen Medien zu nutzen, zu bearbeiten und zu vervielfältigen.
(2) Für Fremdmaterial (Stockfotos, Musik, Schriften, Vorlagen) gelten die Bedingungen der jeweiligen Lizenz; die Agentur erwirbt Lizenzen im Namen und auf Rechnung des Kunden oder weist auf Nutzungsbeschränkungen hin. Für Personen, die in Inhalten abgebildet sind, holt die Agentur die erforderlichen Einwilligungen ein, soweit sie die Aufnahme organisiert hat.
(3) Nicht freigegebene Entwürfe, Konzepte und Ideen bleiben Eigentum der Agentur. Die Agentur darf veröffentlichte Arbeiten als Referenz in ihrer Eigenwerbung zeigen, solange der Kunde nicht in Textform widerspricht.
(4) Konten, Follower, Daten und Inhalte, die der Kunde eingebracht hat, bleiben in jedem Fall beim Kunden.

§ 8 Rechtliche Verantwortung für Inhalte und Werbung
(1) Die Agentur gestaltet Inhalte und Anzeigen nach den ihr bekannten rechtlichen Anforderungen (insbesondere UWG, Kennzeichnung von Werbung, Urheber- und Markenrecht, Plattformrichtlinien) und weist den Kunden auf erkennbare rechtliche Risiken hin. Eine umfassende Rechtsprüfung, insbesondere von Produktaussagen, Gesundheits-, Umwelt- und Preisangaben, schuldet die Agentur nicht; sie empfiehlt bei Bedarf die Prüfung durch einen Rechtsanwalt.
(2) Der Kunde ist für die inhaltliche Richtigkeit aller Angaben über seine Produkte, Preise, Verfügbarkeiten und Eigenschaften sowie für die Rechte an von ihm beigestellten Materialien verantwortlich. Mit der Freigabe nach § 5 Abs. 1 übernimmt der Kunde die Verantwortung für den freigegebenen Inhalt, soweit die Agentur nicht einen Verstoß gegen Absatz 1 zu vertreten hat.
(3) Jede Partei stellt die andere von Ansprüchen Dritter frei, die auf einer von ihr zu vertretenden Verletzung der Pflichten aus diesem Paragrafen beruhen, einschließlich angemessener Rechtsverfolgungskosten.
(4) Gewinnspiele, Influencer-Kooperationen und Werbung gegenüber Minderjährigen werden nur nach gesonderter Abstimmung durchgeführt.

§ 9 Vertraulichkeit und Datenschutz
(1) Beide Parteien behandeln alle Geschäftsgeheimnisse und vertraulichen Informationen der anderen Partei (Zahlen, Strategien, Zugangsdaten, Kundendaten, Konditionen) vertraulich, auch [z. B. 3] Jahre über das Vertragsende hinaus.
(2) Soweit die Agentur personenbezogene Daten im Auftrag des Kunden verarbeitet (z. B. Community-Nachrichten, Newsletter-Listen, Lead-Formulare, Custom Audiences), schließen die Parteien einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO (Anlage 2). Für Tracking und Pixel ist der Kunde als Verantwortlicher für Einwilligungen (Cookie-Banner) und Datenschutzerklärung zuständig; die Agentur unterstützt mit den nötigen Angaben.

§ 10 Haftung
(1) Die Agentur haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
(2) Bei leichter Fahrlässigkeit haftet die Agentur nur bei Verletzung wesentlicher Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren Schaden, höchstens auf die in den letzten [z. B. 6] Monaten gezahlte Nettovergütung (ohne Werbebudget und Fremdkosten).
(3) Für Ausfälle, Sperrungen, Richtlinienänderungen oder Reichweitenverluste, die von Plattformen verursacht werden, haftet die Agentur nicht, soweit sie diese nicht durch einen Verstoß gegen Plattformrichtlinien zu vertreten hat.

§ 11 Laufzeit und Kündigung, Übergabe
(1) Der Vertrag beginnt am [Datum] und hat eine Mindestlaufzeit von [z. B. 6] Monaten. Danach verlängert er sich jeweils um [z. B. 3] Monate, wenn er nicht mit einer Frist von [z. B. 1 Monat] zum Ende der jeweiligen Laufzeit gekündigt wird.
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt für die Agentur insbesondere vor, wenn der Kunde mit zwei Monatsvergütungen in Verzug ist oder von der Agentur rechtswidrige Inhalte verlangt; für den Kunden insbesondere, wenn die Agentur trotz Abmahnung wesentliche Leistungen nicht erbringt oder unautorisierte Ausgaben im Werbekonto tätigt.
(3) Kündigungen bedürfen der Schriftform. Nach Vertragsende übergibt die Agentur innerhalb von [z. B. 10] Werktagen alle erstellten und bezahlten Inhalte in bearbeitbaren Dateiformaten, Redaktionspläne, Zielgruppendefinitionen und eine Dokumentation der laufenden Kampagnen. Laufende Kampagnen werden zum Vertragsende pausiert, sofern der Kunde nichts anderes anordnet.

§ 12 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An ihre Stelle tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt deutsches Recht. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(4) Anlagen: Anlage 1 Leistungspaket und Zielwerte, Anlage 2 Auftragsverarbeitungsvertrag, [Anlage 3 Markenrichtlinien].
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Kunden


______________________________
[Vorname Nachname], für die Agentur

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "rahmenvertrag-dienstleistungen",
    titel: "Rahmenvertrag für Dienstleistungen",
    kurz: "Rahmenvertrag mit Einzelaufträgen (Statements of Work): Rangfolge, Preisliste, Abruf, Mindestanforderungen an Service-Level, Laufzeit und Kündigung der Rahmenbeziehung.",
    kategorie: "dienstleistung",
    dateiname: "Rahmenvertrag-Dienstleistungen",
    wofuer: [
      "Du arbeitest wiederholt für denselben Kunden und willst nicht jedes Mal einen neuen Vertrag verhandeln",
      "Du beauftragst einen Dienstleister immer wieder mit Projekten unterschiedlicher Größe (IT, Beratung, Design, Logistik)",
      "Einzelaufträge sollen kurz sein: Leistung, Termin, Preis – alles Übrige steht im Rahmenvertrag",
      "Wenn Preise, Haftung, Geheimhaltung und Service-Level einmal fest und für alle Aufträge gleich geregelt sein sollen",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Struktur (Rahmenvertrag, Einzelaufträge)",
      "§ 2 Rangfolge der Vertragsdokumente",
      "§ 3 Zustandekommen von Einzelaufträgen (Abruf)",
      "§ 4 Leistungserbringung und Personal",
      "§ 5 Service-Level (Basis)",
      "§ 6 Preise und Preisliste",
      "§ 7 Abrechnung und Zahlung",
      "§ 8 Abnahme bei Werkleistungen",
      "§ 9 Nutzungsrechte",
      "§ 10 Geheimhaltung, Datenschutz",
      "§ 11 Haftung",
      "§ 12 Laufzeit und Kündigung",
      "§ 13 Schlussbestimmungen",
    ],
    hinweise: [
      "Ein Rahmenvertrag verpflichtet für sich allein zu nichts: Ohne Einzelauftrag gibt es weder Leistung noch Vergütung. Wenn du als Dienstleister Mindestabnahmen willst, musst du sie ausdrücklich hineinschreiben.",
      "Die Rangfolge ist das Herzstück. Soll der Einzelauftrag den Rahmenvertrag überschreiben dürfen (z. B. andere Preise), muss das ausdrücklich erlaubt sein, sonst entstehen Widersprüche, die vor Gericht ausgelegt werden.",
      "Die Kündigung des Rahmenvertrags beendet laufende Einzelaufträge nicht automatisch. Die Vorlage regelt, dass begonnene Aufträge zu Ende geführt werden.",
      "Service-Level mit Gutschriften (Service Credits) sind Vertragsstrafen ähnlich. Zwischen Unternehmen zulässig, aber sie müssen messbar und in der Höhe angemessen sein. Nenne Messverfahren und Obergrenze.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Rahmenvertrag und Einzelauftrag?",
        a: "Der Rahmenvertrag regelt die allgemeinen Bedingungen der Zusammenarbeit: Preise, Haftung, Geheimhaltung, Service-Level, Kündigung. Jeder Einzelauftrag (Statement of Work, SOW) beschreibt dann nur noch die konkrete Leistung, Termine und Vergütung. Erst der Einzelauftrag begründet Leistungs- und Zahlungspflichten.",
      },
      {
        q: "Muss ich jeden Einzelauftrag unterschreiben?",
        a: "Nicht zwingend. Die Vorlage lässt Einzelaufträge in Textform zu, also auch per E-Mail oder über ein Ticketsystem, wenn beide Seiten das so vereinbaren. Wichtig ist, dass Leistung, Termin und Preis eindeutig bezeichnet sind und beide Seiten zugestimmt haben.",
      },
      {
        q: "Was passiert mit laufenden Aufträgen, wenn der Rahmenvertrag gekündigt wird?",
        a: "Sie laufen nach den Regeln des Rahmenvertrags weiter, bis sie erfüllt sind. Das ist in der Vorlage ausdrücklich geregelt, weil sonst Streit darüber entsteht, ob Preise und Haftungsregeln noch gelten. Neue Einzelaufträge dürfen nach der Kündigung nicht mehr abgerufen werden.",
      },
      {
        q: "Brauche ich zusätzlich AGB?",
        a: "Nein, der Rahmenvertrag ersetzt deine AGB gegenüber diesem Kunden. Die Vorlage schließt entgegenstehende AGB beider Seiten ausdrücklich aus, damit nicht bei jeder Bestellung die Einkaufsbedingungen des Kunden hineinrutschen.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Rahmenvertrag brauchst",
        text: `Ein Rahmenvertrag lohnt sich, sobald du mit demselben Partner öfter als zweimal arbeitest und nicht jedes Mal Haftung, Geheimhaltung und Preise neu verhandeln willst. Typische Fälle: Eine IT-Beratung liefert für einen Kunden laufend Projekte unterschiedlicher Größe. Eine Designagentur produziert wiederkehrend Content für mehrere Marken eines Konzerns. Ein Logistikdienstleister übernimmt saisonal Lager- und Versandaufträge.

Als Auftraggeber nutzt du das Muster, um einen Lieferantenpool mit einheitlichen Bedingungen aufzubauen; als Dienstleister, um deinem Stammkunden Einzelaufträge per E-Mail oder Ticket anbieten zu können. Der Rahmenvertrag selbst verpflichtet zu nichts; erst der Einzelauftrag (Statement of Work) löst Leistung und Zahlung aus. Genau das macht ihn flexibel.`,
      },
      {
        titel: "Was muss in einen Rahmenvertrag für Dienstleistungen?",
        text: `Ein Rahmenvertrag ist ein Regelwerk für künftige Aufträge. Die Vorlage legt in dreizehn Paragrafen fest:

- § 1 Gegenstand und Struktur: was jeder Einzelauftrag mindestens enthalten muss, optional eine Mindestabnahme
- § 2 Rangfolge der Dokumente und Ausschluss fremder AGB und Einkaufsbedingungen
- § 3 Zustandekommen von Einzelaufträgen: Anfrage, Angebot, Annahme in Textform, vereinfachter Abruf bis zu einem Schwellenwert, Änderungsverfahren
- § 4 Leistungserbringung, Schlüsselpersonen, Subunternehmer, Mitwirkung
- § 5 Basis-Service-Level mit Servicezeiten, Reaktionszeiten nach Priorität, optional Gutschriften
- § 6 Preisliste mit Tages- und Stundensätzen, jährliche Preisanpassung
- § 7 Abrechnung, Tätigkeitsnachweis, Zahlungsziel, Zurückbehaltung
- § 8 Abnahme bei Werkleistungen, § 9 Nutzungsrechte
- § 10 Geheimhaltung und Auftragsverarbeitung für alle Einzelaufträge
- § 11 Haftung je Einzelauftrag und je Vertragsjahr, Versicherung
- § 12 Laufzeit, Kündigung und Fortgeltung für laufende Einzelaufträge
- § 13 Schlussbestimmungen plus Muster eines Einzelauftrags als Anlage 2

Die Rangfolge in § 2 ist der Teil, den du am sorgfältigsten lesen solltest: Sie bestimmt, was gilt, wenn Einzelauftrag und Rahmenvertrag sich widersprechen.`,
      },
      {
        titel: "Rahmenvertrag Muster ausfüllen",
        text: `Trage beide Unternehmen ein und beschreibe in § 1 den Leistungsbereich, etwa Softwareentwicklung, Design oder Logistik. Entscheide, ob eine Mindestabnahme pro Jahr vereinbart wird; als Dienstleister ist das deine wichtigste Verhandlungsposition. In § 3 nennst du die Personen, die Einzelaufträge erteilen und annehmen dürfen, setzt die Angebotsfrist und den Schwellenwert für vereinfachte Abrufe.

In § 5 legst du Servicezeiten, Reaktionszeiten je Priorität und den Meldeweg fest. Behalte die Gutschriftenregel nur, wenn du Reaktionszeiten tatsächlich messen kannst. In § 6 verweist du auf die Preisliste in Anlage 1 und trägst Anpassungstermin, Frist und Obergrenze ein. In § 7 setzt du Zahlungsplan für Festpreise, Beanstandungsfrist und Zahlungsziel, in § 8 Prüffrist und Verjährung, in § 9 ausschließliche oder einfache Rechte. In § 11 trägst du die Haftungsgrenzen und die Deckungssumme ein, in § 12 Beginn, Laufzeit und Kündigungsfristen. Fülle das Muster des Einzelauftrags in Anlage 2 einmal beispielhaft aus, damit beide Seiten wissen, wie Abrufe aussehen sollen.`,
      },
      {
        titel: "Typische Fehler bei Rahmenverträgen",
        text: `Der häufigste Fehler: Der Einzelauftrag weicht vom Rahmenvertrag ab, ohne das zu sagen. Dann gilt nach § 2 der Rahmenvertrag, und der im Einzelauftrag vereinbarte Sonderpreis ist angreifbar. Kennzeichne Abweichungen ausdrücklich, wie Anlage 2 es vorsieht.

Zweiter Fehler: Einkaufsbedingungen des Kunden auf jeder Bestellung. Ohne den Ausschluss in § 2 Abs. 2 rutschen sie mit jedem Abruf hinein. Dritter Fehler: Der Rahmenvertrag wird gekündigt und niemand weiß, ob laufende Projekte noch nach seinen Regeln abgerechnet werden; § 12 Abs. 3 klärt das.

Weitere Stolperfallen sind Service-Level ohne Messverfahren, Mindestabnahmen, die der Dienstleister erwartet, aber nie hineingeschrieben hat, Schlüsselpersonen, die ohne Regel ausgetauscht werden, und Einzelaufträge aus einem Satz per Chat, bei denen später Leistung, Termin und Preis fehlen. Nutze das Muster in Anlage 2 für jeden Abruf.`,
      },
      {
        titel: "Rechtliche Grundlagen für Rahmenvertrag und Einzelauftrag",
        text: `Der Rahmenvertrag ist gesetzlich nicht eigens geregelt; er ist ein Vertrag nach den allgemeinen Regeln der §§ 145 ff. BGB über Angebot und Annahme, der die Bedingungen künftiger Verträge festlegt. Jeder Einzelauftrag ist je nach Inhalt ein Dienstvertrag nach § 611 BGB oder ein Werkvertrag nach § 631 BGB mit Abnahme nach § 640 BGB und Mängelrechten nach § 634 BGB.

Weil der Rahmenvertrag für viele Aufträge vorformuliert ist, gelten seine Klauseln regelmäßig als Allgemeine Geschäftsbedingungen nach § 305 BGB; die Inhaltskontrolle der §§ 307 ff. BGB greift auch zwischen Unternehmen, besonders bei Haftung, Vertragsstrafen und Gutschriften. Widersprechende AGB beider Seiten heben sich nach der Rechtsprechung gegenseitig auf, deshalb der ausdrückliche Ausschluss in § 2. Für Zahlungsverzug gilt § 288 BGB, für die freie Kündigung von Werkleistungen § 648 BGB. Für Datenverarbeitung im Auftrag verlangt Art. 28 DSGVO einen Vertrag, den die Vorlage als Anlage 3 für alle Einzelaufträge mitgelten lässt.`,
      },
      {
        titel: "Wann der Rahmenvertrag nicht reicht",
        text: `Bei Rahmenverträgen mit großen Konzernen, öffentlichen Auftraggebern oder im regulierten Umfeld wie Banken und Gesundheitswesen kommen Compliance-Anhänge, Auditrechte und besondere Service-Level dazu; dort solltest du mit Anwalt verhandeln. Dasselbe gilt für Rahmenverträge mit hohen Mindestabnahmen, für Exklusivität oder Wettbewerbsverbote und für Verträge mit Partnern außerhalb Deutschlands.

Soll der Rahmenvertrag Arbeitnehmerüberlassung oder Personalgestellung abdecken, ist er das falsche Instrument; dafür gilt das AÜG mit Erlaubnispflicht. Für reine Betriebs- und Wartungsleistungen mit harten Wiederherstellungszeiten brauchst du einen ausgearbeiteten SLA-Vertrag statt des Basis-Service-Levels in § 5. GründerX stellt das Muster als Software bereit und ersetzt keine Rechtsberatung.`,
      },
    ],
    seo: {
      title: "Rahmenvertrag Dienstleistungen Vorlage kostenlos | GründerX",
      description:
        "Rahmenvertrag für Dienstleistungen mit Einzelaufträgen als kostenlose Vorlage: Rangfolge, Preisliste, Abruf, Service-Level, Haftung, Laufzeit. Word, PDF.",
    },
    stand: "2026-10",
    text: `Rahmenvertrag über Dienstleistungen

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftraggeber“ –

und

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftragnehmer“ –

– gemeinsam „die Parteien“ –

§ 1 Gegenstand und Struktur
(1) Dieser Rahmenvertrag regelt die allgemeinen Bedingungen, zu denen der Auftragnehmer für den Auftraggeber Leistungen im Bereich [z. B. „Softwareentwicklung und IT-Beratung“ / „Grafikdesign und Content-Produktion“ / „Logistik- und Lagerdienstleistungen“] erbringt.
(2) Die konkreten Leistungen werden in Einzelaufträgen („Einzelauftrag“ oder „Statement of Work“) vereinbart. Jeder Einzelauftrag enthält mindestens: Leistungsbeschreibung, Art der Leistung (Dienst- oder Werkleistung), Termine oder Laufzeit, Vergütung oder Abrechnungsmodell, Ansprechpartner und ggf. besondere Anforderungen.
(3) Dieser Rahmenvertrag begründet für sich keine Pflicht des Auftraggebers, Einzelaufträge zu erteilen, und keine Pflicht des Auftragnehmers, Einzelaufträge anzunehmen. [Optional: Der Auftraggeber verpflichtet sich zur Abnahme von mindestens [Anzahl] Personentagen bzw. [Betrag] EUR netto je Vertragsjahr.]
(4) Für jeden Einzelauftrag gelten die Bestimmungen dieses Rahmenvertrags, ohne dass es einer erneuten Bezugnahme bedarf.

§ 2 Rangfolge der Vertragsdokumente
(1) Bei Widersprüchen gilt folgende Rangfolge: 1. der jeweilige Einzelauftrag, soweit er ausdrücklich von diesem Rahmenvertrag abweicht und die Abweichung als solche kennzeichnet; 2. dieser Rahmenvertrag mit seinen Anlagen; 3. der Einzelauftrag im Übrigen; 4. sonstige Unterlagen (Angebote, Leistungsbeschreibungen, Protokolle).
(2) Allgemeine Geschäfts-, Einkaufs- oder Lieferbedingungen einer Partei gelten nicht, auch wenn ihnen nicht ausdrücklich widersprochen wird und auch wenn sie auf Bestellungen, Rechnungen oder Auftragsbestätigungen verwiesen werden.

§ 3 Zustandekommen von Einzelaufträgen
(1) Der Auftraggeber fragt Leistungen in Textform an. Der Auftragnehmer unterbreitet innerhalb von [z. B. 5] Werktagen ein Angebot in Form eines Einzelauftrags nach dem Muster in Anlage 2.
(2) Ein Einzelauftrag kommt zustande, wenn beide Parteien ihn unterzeichnen oder der Auftraggeber das Angebot in Textform annimmt (E-Mail genügt). Zur Erteilung und Annahme von Einzelaufträgen sind berechtigt: für den Auftraggeber [Vorname Nachname, Funktion], für den Auftragnehmer [Vorname Nachname, Funktion]; Änderungen werden in Textform mitgeteilt.
(3) Für Einzelaufträge bis zu einem Nettowert von [Betrag] EUR genügt ein Abruf des Auftraggebers über [z. B. das Ticketsystem / per E-Mail] unter Angabe von Leistung, Termin und Preislistenposition; der Einzelauftrag kommt mit Bestätigung des Auftragnehmers in Textform zustande.
(4) Änderungen eines laufenden Einzelauftrags (Umfang, Termine, Vergütung) bedürfen einer Änderungsvereinbarung in Textform. Der Auftragnehmer teilt die Auswirkungen eines Änderungswunsches auf Aufwand und Termine innerhalb von [z. B. 5] Werktagen mit.

§ 4 Leistungserbringung und Personal
(1) Der Auftragnehmer erbringt die Leistungen nach dem Stand der Technik und den anerkannten Regeln seines Fachs mit qualifiziertem Personal. Er bestimmt die Ausführung in eigener Verantwortung; sein Personal unterliegt keinen Weisungen des Auftraggebers und wird nicht in dessen Betrieb eingegliedert.
(2) Im Einzelauftrag namentlich benannte Schlüsselpersonen tauscht der Auftragnehmer nur aus wichtigem Grund (z. B. Ausscheiden, längere Krankheit) gegen gleichwertig qualifizierte Personen aus und informiert den Auftraggeber vorab. Der Auftraggeber kann aus sachlichem Grund den Austausch einer Person verlangen.
(3) Subunternehmer dürfen nur mit Zustimmung des Auftraggebers in Textform eingesetzt werden; der Auftragnehmer haftet für sie wie für eigenes Handeln und verpflichtet sie entsprechend § 10.
(4) Der Auftraggeber erbringt die im Einzelauftrag beschriebenen Mitwirkungsleistungen (Informationen, Zugänge, Freigaben) rechtzeitig. Verzögerungen aus unterlassener Mitwirkung verschieben Termine und berechtigen zur Abrechnung des Mehraufwands nach Preisliste.

§ 5 Service-Level (Basis)
(1) Soweit ein Einzelauftrag laufende Betriebs-, Support- oder Wartungsleistungen umfasst, gelten, wenn der Einzelauftrag nichts anderes bestimmt, folgende Mindestanforderungen:
   a) Servicezeiten: Montag bis Freitag [z. B. 9–17 Uhr], ausgenommen bundeseinheitliche Feiertage,
   b) Reaktionszeit (Rückmeldung mit Einschätzung) innerhalb der Servicezeit: Priorität 1 (Betriebsstillstand) [z. B. 2] Stunden, Priorität 2 (wesentliche Beeinträchtigung) [z. B. 8] Stunden, Priorität 3 (sonstige) [z. B. 2] Werktage,
   c) Meldeweg: [z. B. Ticketsystem [URL], E-Mail [Adresse], Telefon [Nummer]].
(2) Wiederherstellungs- oder Lösungszeiten werden nur geschuldet, wenn sie im Einzelauftrag ausdrücklich vereinbart sind. Die Einhaltung von Reaktionszeiten wird je Kalendermonat auf Grundlage der Ticketdaten gemessen.
(3) [Optional: Unterschreitet der Auftragnehmer in einem Monat die vereinbarte Quote eingehaltener Reaktionszeiten von [z. B. 95] %, erhält der Auftraggeber eine Gutschrift von [z. B. 5] % der monatlichen Vergütung des betroffenen Einzelauftrags je angefangene [5] Prozentpunkte Unterschreitung, höchstens [z. B. 20] % der Monatsvergütung. Weitergehende Ansprüche richten sich nach § 11; Gutschriften werden angerechnet.]
(4) Nicht als Verletzung des Service-Levels gelten Zeiten, die auf fehlender Mitwirkung des Auftraggebers, Störungen bei Dritten (Hosting, Telekommunikation, Plattformen), angekündigten Wartungsfenstern oder höherer Gewalt beruhen.

§ 6 Preise und Preisliste
(1) Es gelten die Preise der Preisliste in Anlage 1 (Stunden- und Tagessätze nach Rollen, Pauschalen für Standardleistungen, Reisekosten). Abweichende Preise im Einzelauftrag müssen ausdrücklich als Abweichung gekennzeichnet sein.
(2) Alle Preise verstehen sich netto zuzüglich gesetzlicher Umsatzsteuer. Ein Personentag umfasst 8 Stunden; Teilzeiten werden im [Halbtages- / Stunden-]Takt abgerechnet.
(3) Der Auftragnehmer kann die Preisliste jeweils zum [z. B. 1. Januar] eines Jahres mit einer Ankündigungsfrist von [z. B. 3] Monaten um höchstens [z. B. 5] % anpassen, erstmals zum [Datum]. Für bereits erteilte Einzelaufträge mit Festpreis gilt die Anpassung nicht. Widerspricht der Auftraggeber, kann der Auftragnehmer den Rahmenvertrag zum Wirksamwerden der Anpassung kündigen.
(4) Reisekosten werden nur nach Freigabe in Textform und nach den Sätzen der Preisliste erstattet.

§ 7 Abrechnung und Zahlung
(1) Leistungen nach Aufwand werden monatlich mit Tätigkeitsnachweis (Datum, Person, Dauer, Tätigkeit, Einzelauftrag) abgerechnet; Festpreise nach dem Zahlungsplan des Einzelauftrags, mangels Zahlungsplan [z. B. 40] % bei Beauftragung und [z. B. 60] % nach Abnahme. Beanstandet der Auftraggeber einen Tätigkeitsnachweis nicht innerhalb von [z. B. 10] Werktagen in Textform, gilt er als anerkannt; die Rechnung weist darauf hin.
(2) Rechnungen sind innerhalb von [z. B. 30] Tagen nach Zugang ohne Abzug zahlbar. Jede Rechnung nennt die Nummer des Einzelauftrags und eine vom Auftraggeber vorgegebene Bestell- oder Kostenstellennummer, soweit mitgeteilt.
(3) Bei Zahlungsverzug gelten Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz und die Pauschale nach § 288 Abs. 5 BGB. Bei Verzug mit mehr als [z. B. zwei] Rechnungen darf der Auftragnehmer nach Ankündigung mit [z. B. 10] Tagen Frist die Leistungen aus allen Einzelaufträgen zurückhalten.
(4) Aufrechnung und Zurückbehaltung sind dem Auftraggeber nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen gestattet.

§ 8 Abnahme bei Werkleistungen
(1) Ist eine Leistung im Einzelauftrag als Werkleistung bezeichnet, zeigt der Auftragnehmer die Fertigstellung in Textform an. Der Auftraggeber prüft innerhalb von [z. B. 10] Werktagen und erklärt die Abnahme oder rügt konkrete Mängel in Textform. Unwesentliche Mängel berechtigen nicht zur Verweigerung der Abnahme; sie werden im Protokoll festgehalten und nachgebessert.
(2) Rügt der Auftraggeber innerhalb der Frist keinen Mangel oder nimmt er die Leistung produktiv in Gebrauch, gilt sie als abgenommen; der Auftragnehmer weist in der Fertigstellungsanzeige auf diese Folge hin.
(3) Mängelansprüche verjähren in [z. B. 12] Monaten ab Abnahme, ausgenommen Vorsatz, Arglist und Ansprüche nach § 11 Abs. 1. Für Dienstleistungen gibt es keine Abnahme; die Vergütung ist nach Leistungserbringung fällig.

§ 9 Nutzungsrechte
(1) An allen im Rahmen von Einzelaufträgen erstellten Arbeitsergebnissen räumt der Auftragnehmer dem Auftraggeber mit vollständiger Zahlung das [ausschließliche / einfache], zeitlich, räumlich und inhaltlich unbeschränkte Recht ein, sie für eigene Zwecke zu nutzen, zu vervielfältigen, zu bearbeiten, zu verbreiten und öffentlich zugänglich zu machen. Abweichungen regelt der Einzelauftrag.
(2) Vorbestehende Werkzeuge, Bibliotheken, Methoden und Standardkomponenten des Auftragnehmers bleiben sein Eigentum; der Auftraggeber erhält daran ein einfaches, unbeschränktes Nutzungsrecht, soweit es für die Nutzung der Arbeitsergebnisse erforderlich ist. Für Fremd- und Open-Source-Komponenten gelten deren Lizenzen; der Auftragnehmer legt eine Komponentenliste vor.

§ 10 Geheimhaltung, Datenschutz
(1) Beide Parteien behandeln alle vertraulichen Informationen und Geschäftsgeheimnisse der anderen Partei, die ihnen im Zusammenhang mit diesem Rahmenvertrag oder einem Einzelauftrag bekannt werden, vertraulich und verwenden sie nur zur Vertragsdurchführung. Die Pflicht gilt [z. B. 5] Jahre über das Ende des Rahmenvertrags hinaus, für Geschäftsgeheimnisse im Sinne des GeschGehG unbegrenzt. Übliche Ausnahmen (öffentlich bekannt, rechtmäßig vorbekannt, gesetzliche Offenlegungspflicht) gelten.
(2) Soweit der Auftragnehmer personenbezogene Daten im Auftrag des Auftraggebers verarbeitet, gilt der Auftragsverarbeitungsvertrag in Anlage 3 für alle Einzelaufträge. Der Auftragnehmer verpflichtet sein Personal zur Vertraulichkeit und setzt angemessene technische und organisatorische Maßnahmen um.
(3) Der Auftragnehmer darf den Auftraggeber nur nach Zustimmung in Textform als Referenz nennen.

§ 11 Haftung
(1) Jede Partei haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit, für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, für arglistig verschwiegene Mängel, übernommene Garantien und nach dem Produkthaftungsgesetz.
(2) Bei leichter Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren Schaden, je Einzelauftrag höchstens auf [z. B. 100] % der Nettovergütung des betroffenen Einzelauftrags, insgesamt je Vertragsjahr höchstens auf [Betrag] EUR.
(3) Für Datenverlust haftet der Auftragnehmer nur bis zum Wiederherstellungsaufwand bei ordnungsgemäßer Datensicherung durch den Auftraggeber, soweit die Datensicherung nicht Teil des Einzelauftrags ist.
(4) Der Auftragnehmer unterhält eine Betriebs- und Vermögensschadenhaftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR je Schadensfall und weist sie auf Verlangen nach.

§ 12 Laufzeit und Kündigung
(1) Dieser Rahmenvertrag beginnt am [Datum] und läuft [auf unbestimmte Zeit / bis zum [Datum] und verlängert sich jeweils um 12 Monate, wenn er nicht mit einer Frist von [z. B. 3] Monaten zum Laufzeitende gekündigt wird]. Er kann von jeder Partei mit einer Frist von [z. B. 3] Monaten zum Monatsende gekündigt werden.
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt, insbesondere bei nachhaltiger Verletzung wesentlicher Pflichten trotz Abmahnung mit Fristsetzung, bei Zahlungsverzug mit zwei Rechnungen oder bei Insolvenz einer Partei.
(3) Die Kündigung des Rahmenvertrags berührt bereits erteilte Einzelaufträge nicht; sie werden zu den Bedingungen dieses Rahmenvertrags abgewickelt, sofern sie nicht gesondert gekündigt werden. Nach Zugang der Kündigung dürfen keine neuen Einzelaufträge abgerufen werden. Einzelaufträge mit Dienstleistungscharakter können gesondert mit einer Frist von [z. B. 4] Wochen zum Monatsende gekündigt werden; für Werkleistungen gilt § 648 BGB.
(4) Kündigungen bedürfen der Schriftform. Nach Beendigung übergibt der Auftragnehmer alle Arbeitsergebnisse, Unterlagen und Daten des Auftraggebers und löscht verbleibende Kopien, soweit keine Aufbewahrungspflichten bestehen.

§ 13 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Rahmenvertrags bedürfen der Schriftform; Einzelaufträge und deren Änderungen der Textform. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An ihre Stelle tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(4) Anlagen: Anlage 1 Preisliste, Anlage 2 Muster Einzelauftrag, Anlage 3 Auftragsverarbeitungsvertrag.
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

Anlage 2 – Muster Einzelauftrag Nr. [Nummer] zum Rahmenvertrag vom [Datum]
1. Leistung: [Beschreibung]
2. Art: [Dienstleistung / Werkleistung]
3. Termine / Laufzeit: [Beginn, Meilensteine, Ende]
4. Vergütung: [Festpreis [Betrag] EUR / nach Aufwand gemäß Preisliste, Budget [Betrag] EUR]
5. Ansprechpartner: [Auftraggeber / Auftragnehmer]
6. Besonderheiten / Abweichungen vom Rahmenvertrag: [keine / Beschreibung]
Annahme in Textform: [Datum, Namen]

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Auftraggeber


______________________________
[Vorname Nachname], für den Auftragnehmer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "influencer-kooperationsvertrag",
    titel: "Influencer-Kooperationsvertrag",
    kurz: "Vertrag zwischen Unternehmen und Influencer oder Creator: Deliverables, Werbekennzeichnung, Freigabe, Nutzungsrechte, Exklusivität, Vergütung oder Produkte, Stornierung, Insights.",
    kategorie: "dienstleistung",
    dateiname: "Influencer-Kooperationsvertrag",
    wofuer: [
      "Du buchst als Marke oder Shop einen Influencer für Posts, Reels, Stories oder ein Video",
      "Du bist selbst Creator und willst Umfang, Freigaben und Nutzungsrechte vor dem ersten Post festhalten",
      "Vergütung in Geld, in Produkten oder als Mischung, mit oder ohne Affiliate-Anteil",
      "Wenn die Werbekennzeichnung, die Exklusivität und der Leistungsnachweis per Insights vertraglich sicher sein sollen",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Kampagne",
      "§ 2 Deliverables (Posts, Reels, Stories, Video)",
      "§ 3 Briefing, Freigabe, Veröffentlichung",
      "§ 4 Kennzeichnung als Werbung und rechtliche Vorgaben",
      "§ 5 Vergütung, Produkte, Affiliate",
      "§ 6 Nutzungsrechte am Content",
      "§ 7 Exklusivität und Wettbewerb",
      "§ 8 Leistungsnachweis (Insights) und Mindestdauer der Veröffentlichung",
      "§ 9 Stornierung, Absage, Nichterfüllung",
      "§ 10 Haftung, Freistellung, Verhaltenskodex",
      "§ 11 Vertraulichkeit, Datenschutz",
      "§ 12 Laufzeit und Schlussbestimmungen",
    ],
    hinweise: [
      "Jeder bezahlte oder mit Gratisprodukten vergütete Beitrag muss als Werbung erkennbar sein (§ 5a Abs. 4 UWG, § 22 Abs. 1 MStV). „Werbung“ oder „Anzeige“ am Anfang des Beitrags, nicht versteckt in Hashtags. Abmahnungen treffen Creator und Unternehmen.",
      "Gratisprodukte sind eine Gegenleistung: Steuerlich ein Tausch, der beim Creator als Einnahme zählt, und werberechtlich ein kommerzieller Zweck. Die Vorlage regelt den Warenwert ausdrücklich.",
      "Unternehmen, die Creator für künstlerische oder publizistische Leistungen bezahlen, können zur Künstlersozialabgabe verpflichtet sein. Lass das von deinem Steuerberater prüfen, bevor du regelmäßig mit Creatorn arbeitest.",
      "Nutzungsrechte am Content gehen nicht automatisch an die Marke. Willst du den Beitrag als Anzeige (Whitelisting, Spark Ads) oder auf deiner Website nutzen, muss das ausdrücklich und mit Dauer vereinbart sein.",
      "Übermäßige Kontrolle (Zeitvorgaben, Freigabe jedes Wortes, Exklusivität über Jahre) kann den Creator in Richtung Arbeitnehmer rücken und schadet der Authentizität. Freigabe auf Fakten und Kennzeichnung beschränken.",
    ],
    faqs: [
      {
        q: "Muss ein Beitrag auch dann als Werbung gekennzeichnet werden, wenn ich nur Produkte kostenlos bekomme?",
        a: "Ja. Kostenlose Produkte sind eine Gegenleistung, der Beitrag hat damit einen kommerziellen Zweck und muss gekennzeichnet werden. Nur wenn der Creator das Produkt selbst gekauft hat und keinerlei Gegenleistung erhält, kann die Kennzeichnung entfallen. Die Vorlage schreibt die Kennzeichnung in jedem Fall vor.",
      },
      {
        q: "Wie weise ich nach, dass die vereinbarte Reichweite erbracht wurde?",
        a: "Über Screenshots der Insights aus der jeweiligen Plattform (Reichweite, Impressionen, Interaktionen, Link-Klicks) innerhalb einer Frist nach Veröffentlichung. Die Vorlage legt fest, welche Werte wann zu liefern sind. Eine garantierte Mindestreichweite ist unüblich; Creator schulden die Veröffentlichung, nicht den Algorithmus.",
      },
      {
        q: "Darf ich die Beiträge des Influencers in meinen eigenen Anzeigen nutzen?",
        a: "Nur, wenn der Vertrag das Nutzungsrecht dafür einräumt. Die Vorlage sieht eine Grundnutzung (Reposten auf eigenen Kanälen) und optional ein erweitertes Recht für bezahlte Werbung und Website für eine bestimmte Dauer vor. Dafür ist üblicherweise ein Aufschlag auf das Honorar fällig.",
      },
      {
        q: "Was passiert, wenn der Influencer den Post nicht liefert?",
        a: "Dann ist die Vergütung nicht fällig, bereits gezahlte Vorschüsse sind zurückzuzahlen und gelieferte Produkte zurückzugeben oder zu bezahlen. Die Vorlage sieht eine Nachfrist und danach ein Rücktrittsrecht vor. Bei Absagen aus Gründen beim Unternehmen gibt es eine gestaffelte Stornogebühr.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Influencer-Vertrag brauchst",
        text: `Ein Influencer-Kooperationsvertrag gehört vor jede bezahlte Zusammenarbeit mit Creatorn, auch wenn die Vergütung nur aus Produkten besteht. Typische Fälle: Ein D2C-Shop bucht drei Reels und eine Story-Sequenz für einen Produktlaunch. Eine App lässt ein YouTube-Video mit Produktintegration produzieren. Ein Lokal lädt Creator gegen Gratisessen ein und erwartet Beiträge.

Umgekehrt brauchen Creator das Muster, um Umfang, Korrekturschleifen, Nutzungsrechte und Stornobedingungen festzuhalten, bevor sie Zeit in Produktion stecken. Die Vorlage deckt Instagram, TikTok, YouTube und Blogs ab und regelt beide Vergütungsformen, Geld und Ware, sowie optional eine Affiliate-Provision. Für Agenturen, die Creator vermitteln, dient sie als Grundlage des Vertrags zwischen Marke und Creator.`,
      },
      {
        titel: "Was muss in einen Influencer-Kooperationsvertrag?",
        text: `Im Influencer-Marketing streiten sich die Beteiligten über Kennzeichnung, Freigaben, Reichweite und darüber, wer den Content später nutzen darf. Die Vorlage regelt in zwölf Paragrafen:

- § 1 Kampagne, Produkt, Zeitraum, Selbstständigkeit des Creators
- § 2 Deliverables mit Anzahl, Format, Länge, Veröffentlichungsfenster, Pflichtinhalten und Mindestdauer online
- § 3 Briefing, Entwurfsvorlage, Freigabefrist mit Freigabefiktion, Korrekturschleifen, Linkübermittlung
- § 4 Werbekennzeichnung nach § 5a Abs. 4 UWG und § 22 Abs. 1 MStV, Plattformregeln, Verantwortung des Unternehmens für Produktaussagen
- § 5 Honorar in Raten, Warenwert der Produkte, optionale Affiliate-Provision, Verzug
- § 6 Nutzungsrechte: Grundnutzung auf eigenen Kanälen, optional erweiterte Nutzung in Ads und Shop gegen Zuschlag
- § 7 Exklusivität mit Dauer und Vergütung
- § 8 Insights als Leistungsnachweis, Versicherung organischer Reichweite, Rückzahlung bei vorzeitiger Löschung
- § 9 Storno-Staffel, Nachfrist, Rücktritt, Kündigung aus wichtigem Grund
- § 10 Freistellungen und Verhaltenskodex, § 11 Vertraulichkeit und Embargo, § 12 Laufzeit

Die Freigabefiktion in § 3 schützt den Creator vor Marken, die Entwürfe wochenlang liegen lassen.`,
      },
      {
        titel: "Influencer-Vertrag Muster ausfüllen",
        text: `Trage das Unternehmen und den Creator mit Plattform, Nutzername und Profil-URL ein. In § 1 gibst du der Kampagne einen Namen und setzt den Zeitraum. In § 2 listest du die Deliverables mit Stückzahl, Format, Länge und Veröffentlichungsfenster und trägst Pflichtinhalte wie Rabattcode, Link und Hashtags ein; lege fest, wie lange die Beiträge online bleiben müssen.

In § 3 setzt du Vorlagefrist für Entwürfe, Freigabefrist und den Preis weiterer Korrekturschleifen. In § 5 trägst du Honorar, Ratenaufteilung, Zahlungsziel, die Produkte mit Warenwert und die Entscheidung ein, ob sie beim Creator bleiben; aktiviere die Affiliate-Klausel nur, wenn du Bestellungen dem Code zuordnen kannst. In § 6 entscheidest du, ob die erweiterte Nutzung in bezahlter Werbung dazugehört, und trägst Dauer und Zuschlag ein. In § 7 setzt du Dauer, Wettbewerber und Vergütung der Exklusivität, in § 8 Fristen für Insights und die aktuellen Kanalzahlen, in § 9 die Storno-Staffel und Nachfrist. Lege das Briefing als Anlage 1 bei. Die Vorlage gibt es kostenlos als Word, PDF und Text.`,
      },
      {
        titel: "Typische Fehler bei Influencer-Kooperationen",
        text: `Der teuerste Fehler ist die fehlende oder versteckte Werbekennzeichnung. Das Wort Werbung im zwanzigsten Hashtag reicht nicht; Abmahnungen treffen Creator und Marke. Die Vorlage verlangt die Kennzeichnung am Anfang des Beitrags und in jedem Story-Element.

Zweiter Fehler: Nutzungsrechte nur stillschweigend vorausgesetzt. Eine Marke schaltet das Reel als Anzeige, der Creator hat dafür nie zugestimmt und nie ein Honorar bekommen. § 6 trennt Grundnutzung und erweiterte Nutzung. Dritter Fehler: Reichweitengarantien. Creator schulden Veröffentlichung, nicht den Algorithmus; wer Reichweite verspricht, haftet dafür.

Weitere Stolperfallen sind Freigaben, die in kreative Entscheidungen eingreifen und damit Authentizität und Selbstständigkeit gefährden, Gratisprodukte ohne Warenwert und ohne Hinweis auf die Steuerpflicht, Exklusivität über Monate ohne Vergütung und Gewinnspiele ohne Teilnahmebedingungen. Prüfe außerdem mit deinem Steuerberater, ob für Honorare an Creator die Künstlersozialabgabe anfällt.`,
      },
      {
        titel: "Rechtliche Grundlagen: UWG, MStV und Urheberrecht",
        text: `Der Kooperationsvertrag ist ein gemischter Vertrag: Die Produktion der Beiträge ist werkvertraglich geprägt, die Veröffentlichung und Rechtseinräumung folgen dem Urheber- und Dienstvertragsrecht. Nach § 5a Abs. 4 UWG handelt unlauter, wer den kommerziellen Zweck einer geschäftlichen Handlung nicht kenntlich macht; § 22 Abs. 1 MStV verlangt, dass Werbung in Telemedien als solche erkennbar ist. Beides gilt auch bei Vergütung in Produkten.

Der Creator ist Urheber seiner Beiträge nach dem Urheberrechtsgesetz; Nutzungsrechte gehen nach § 31 UrhG nur in dem Umfang über, der vereinbart ist. Persönlichkeitsrechte abgebildeter Personen und Musiklizenzen muss der Creator selbst klären. Für Gewinnspiele gelten die Transparenzpflichten des UWG und die Plattformregeln. Honorare an selbstständige Creator können nach dem Künstlersozialversicherungsgesetz abgabepflichtig sein. Überlassene Produkte sind beim Creator Betriebseinnahmen; die Vorlage weist darauf hin. Für Zahlungsverzug gilt § 288 BGB.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht",
        text: `Bei Kampagnen mit mehreren Creatorn, Agenturen als Zwischenpartei oder internationalen Creatorn solltest du den Vertrag anwaltlich anpassen lassen, weil Rechtekette, Steuer und Kennzeichnungspflichten dann komplexer werden. Dasselbe gilt für regulierte Produkte wie Nahrungsergänzungsmittel, Kosmetik mit Wirkversprechen, Finanzprodukte, Alkohol oder Glücksspiel, bei denen Werbebeschränkungen bis zum Werbeverbot reichen.

Langfristige Markenbotschafter-Verträge mit monatlicher Vergütung, Exklusivität über Jahre und festen Terminen rücken den Creator in Richtung Arbeitnehmer; hier lohnt die Prüfung auf Scheinselbstständigkeit. Bei Gewinnspielen und Nutzung von Kundendaten brauchst du zusätzlich Teilnahmebedingungen und Datenschutzregelungen. GründerX liefert das Muster als Software und ersetzt keine Rechtsberatung.`,
      },
    ],
    seo: {
      title: "Influencer-Vertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Influencer-Kooperationsvertrag als kostenlose Vorlage: Deliverables, Werbekennzeichnung, Freigabe, Nutzungsrechte, Exklusivität, Vergütung, Insights.",
    },
    stand: "2026-10",
    text: `Influencer-Kooperationsvertrag

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Unternehmen“ –

und

[Vorname Nachname / Firma], [Straße, PLZ Ort], Kanal/Profil: [Plattform, Nutzername, URL]
– nachfolgend „Creator“ –

– gemeinsam „die Parteien“ –

§ 1 Gegenstand und Kampagne
(1) Das Unternehmen beauftragt den Creator, im Rahmen der Kampagne „[Kampagnenname]“ für das Produkt bzw. die Dienstleistung [Bezeichnung] Inhalte zu erstellen und auf seinen Kanälen zu veröffentlichen.
(2) Kampagnenzeitraum: [Datum] bis [Datum]. Zielgruppe und Kernbotschaften ergeben sich aus dem Briefing in Anlage 1.
(3) Der Creator ist selbstständig tätig und gestaltet die Inhalte in seinem eigenen Stil. Er ist nicht in die Organisation des Unternehmens eingegliedert und unterliegt keinen Weisungen über die in diesem Vertrag und im Briefing genannten inhaltlichen Vorgaben hinaus.

§ 2 Deliverables
(1) Der Creator erstellt und veröffentlicht folgende Inhalte („Deliverables“):
   a) [Anzahl] Feed-Beitrag/Beiträge auf [Plattform] (Bild oder Karussell mit mindestens [Anzahl] Bildern), Veröffentlichung zwischen dem [Datum] und dem [Datum],
   b) [Anzahl] Reel(s)/Kurzvideo(s) auf [Plattform] mit einer Länge von [z. B. 20–60] Sekunden, Veröffentlichung am [Datum/Zeitraum],
   c) [Anzahl] Story-Sequenz(en) mit je mindestens [Anzahl] Story-Elementen, davon mindestens eines mit Link-Sticker/Swipe-Up zu [URL], Veröffentlichung am [Datum],
   d) [optional: ein YouTube-Video mit einer Produktintegration von mindestens [Dauer] Minuten / ein Blogbeitrag mit mindestens [Anzahl] Wörtern].
(2) Pflichtinhalte: Nennung von [Marke/Produkt], Verlinkung des Profils [@Nutzername], Verwendung des Rabattcodes [CODE] und des Links [URL], Hashtags [#…]. Weitere Vorgaben (Do's and Don'ts, Sperrbegriffe) ergeben sich aus Anlage 1.
(3) Die Inhalte bleiben mindestens [z. B. 6 Monate / dauerhaft] online und werden in dieser Zeit nicht gelöscht, archiviert oder ohne Zustimmung des Unternehmens verändert. Stories bleiben [z. B. 24 Stunden] sichtbar und werden [optional: für [Dauer] als Highlight gespeichert].
(4) Der Creator produziert die Inhalte selbst mit eigenen Mitteln. Das Unternehmen stellt Produkte (§ 5 Abs. 2), Bildmaterial und Logos nach Bedarf.

§ 3 Briefing, Freigabe, Veröffentlichung
(1) Das Unternehmen übergibt das Briefing (Anlage 1) bis zum [Datum]. Der Creator legt dem Unternehmen Entwürfe der Deliverables (Bilder, Videos, Texte) mindestens [z. B. 5] Werktage vor dem geplanten Veröffentlichungstermin in Textform vor.
(2) Das Unternehmen prüft die Entwürfe innerhalb von [z. B. 2] Werktagen auf Richtigkeit der Produktangaben, Einhaltung des Briefings und rechtliche Vorgaben und gibt frei oder nennt konkrete Änderungswünsche. Die kreative Gestaltung, Wortwahl und Bildsprache liegen beim Creator; Änderungswünsche beschränken sich auf sachlich falsche Aussagen, Verstöße gegen Anlage 1 und rechtliche Vorgaben. Eine Korrekturschleife ist im Honorar enthalten, weitere werden mit [Betrag] EUR je Schleife vergütet.
(3) Äußert sich das Unternehmen nicht innerhalb der Frist, gilt der Entwurf als freigegeben. Der Creator veröffentlicht nur freigegebene Inhalte zu den vereinbarten Terminen.
(4) Bildunterschriften, Textbausteine und Rabattcodes werden wie freigegeben verwendet. Nach Veröffentlichung sendet der Creator dem Unternehmen innerhalb von 24 Stunden die Links zu den Beiträgen.

§ 4 Kennzeichnung als Werbung und rechtliche Vorgaben
(1) Der Creator kennzeichnet jedes Deliverable deutlich als Werbung, und zwar zu Beginn des Beitragstextes bzw. gut sichtbar im Bild/Video mit „Werbung“ oder „Anzeige“ (§ 5a Abs. 4 UWG, § 22 Abs. 1 MStV); bei Stories in jedem einzelnen Story-Element. Zusätzlich nutzt er die Kennzeichnungsfunktion der Plattform (z. B. „Bezahlte Partnerschaft mit …“), soweit verfügbar. Die Kennzeichnung ersetzt die Plattformfunktion nicht und umgekehrt.
(2) Die Kennzeichnungspflicht gilt unabhängig davon, ob die Vergütung in Geld oder in Produkten besteht, und auch für Stories, Livestreams, Pinned Comments und Link-in-Bio-Hinweise.
(3) Der Creator beachtet die Richtlinien der jeweiligen Plattform, das Urheber- und Markenrecht (insbesondere bei Musik, Fremdbildern, fremden Marken), das Persönlichkeitsrecht abgebildeter Personen sowie die Vorgaben für Gewinnspiele. Gesundheits-, Wirkungs- und Umweltaussagen über das Produkt trifft er nur, wie im Briefing vom Unternehmen freigegeben.
(4) Das Unternehmen stellt sicher, dass die im Briefing vorgegebenen Produkt- und Werbeaussagen rechtlich zulässig sind, und informiert den Creator über branchenspezifische Werbebeschränkungen (z. B. Alkohol, Nahrungsergänzungsmittel, Finanzprodukte, Jugendschutz).

§ 5 Vergütung, Produkte, Affiliate
(1) Der Creator erhält für die Deliverables und die Rechtseinräumung nach § 6 ein Honorar von [Betrag] EUR zuzüglich gesetzlicher Umsatzsteuer [bei Kleinunternehmern: ohne Umsatzsteuer gemäß § 19 UStG]. Fällig: [z. B. 50] % nach Vertragsschluss, [z. B. 50] % nach Veröffentlichung des letzten Deliverables und Übermittlung der Insights nach § 8, jeweils innerhalb von [z. B. 14] Tagen nach Rechnungszugang.
(2) Das Unternehmen stellt dem Creator folgende Produkte zur Verfügung: [Produkte, Menge], Warenwert insgesamt [Betrag] EUR brutto. Die Produkte [verbleiben beim Creator und sind Teil der Vergütung / werden nach der Produktion zurückgegeben]. Der Creator versteuert den Wert überlassener Produkte selbst.
(3) [Optional: Zusätzlich erhält der Creator eine Affiliate-Provision von [z. B. 10] % des Nettoumsatzes aller Bestellungen, die über den Rabattcode [CODE] oder den Link [URL] innerhalb von [z. B. 30] Tagen nach Klick zustande kommen und nicht widerrufen oder storniert werden. Abrechnung monatlich mit Nachweis der Bestellzahlen; Auszahlung ab einem Guthaben von [Betrag] EUR.]
(4) Produktions- und Reisekosten sind im Honorar enthalten, sofern nicht in Anlage 1 gesonderte Erstattungen vereinbart sind. Beauftragt das Unternehmen zusätzliche Deliverables, wird dies in Textform nachbeauftragt und gesondert vergütet.
(5) Bei Zahlungsverzug gelten Verzugszinsen in gesetzlicher Höhe und die Pauschale nach § 288 Abs. 5 BGB.

§ 6 Nutzungsrechte am Content
(1) Der Creator bleibt Urheber der Deliverables. Er räumt dem Unternehmen mit Zahlung des Honorars folgende Nutzungsrechte ein:
   a) Grundnutzung: das einfache, zeitlich unbeschränkte Recht, die veröffentlichten Deliverables auf den eigenen Social-Media-Kanälen des Unternehmens zu teilen, zu reposten und einzubetten, unter Nennung des Creators,
   b) [Optional, erweiterte Nutzung: das einfache Recht, die Deliverables für die Dauer von [z. B. 12] Monaten ab Veröffentlichung in bezahlter Werbung (z. B. Whitelisting, Spark Ads, Creator-Lizenzierung), auf der Website und im Onlineshop des Unternehmens, in Newslettern und auf Marktplatz-Produktseiten zu nutzen, auch mit Zuschnitten und Untertiteln. Hierfür wird ein Zuschlag von [Betrag] EUR gezahlt.]
(2) Nicht umfasst sind Print, TV, Außenwerbung und die Nutzung für andere Produkte oder Marken des Unternehmens; sie bedürfen einer gesonderten Vereinbarung.
(3) Das Unternehmen räumt dem Creator das Recht ein, Marke, Logo und bereitgestelltes Material des Unternehmens für die Deliverables zu nutzen. Es versichert, über die nötigen Rechte zu verfügen.
(4) Nach Ende der Nutzungsdauer stellt das Unternehmen die Nutzung der Deliverables in bezahlter Werbung ein; auf eigenen Kanälen veröffentlichte Reposts dürfen bestehen bleiben.

§ 7 Exklusivität und Wettbewerb
(1) Während des Kampagnenzeitraums und für [z. B. 4] Wochen danach veröffentlicht der Creator keine bezahlten Kooperationen für Produkte, die mit dem Produkt des Unternehmens unmittelbar konkurrieren, insbesondere nicht für [Wettbewerber / Produktkategorie]. Redaktionelle, unbezahlte Erwähnungen bleiben erlaubt.
(2) Für die Exklusivität nach Absatz 1 erhält der Creator [keine gesonderte Vergütung; sie ist im Honorar enthalten / eine Vergütung von [Betrag] EUR].
(3) Eine weitergehende Exklusivität (längere Dauer, weitere Kategorien) bedarf einer gesonderten Vereinbarung mit gesonderter Vergütung.

§ 8 Leistungsnachweis (Insights) und Mindestdauer der Veröffentlichung
(1) Der Creator übermittelt dem Unternehmen innerhalb von [z. B. 7] Tagen nach Veröffentlichung jedes Deliverables und erneut nach [z. B. 30] Tagen Screenshots der Plattform-Insights mit mindestens folgenden Werten: Reichweite bzw. erreichte Konten, Impressionen/Aufrufe, Interaktionen (Likes, Kommentare, Speicherungen, Shares), Link-Klicks und bei Stories Antworten und Sticker-Klicks.
(2) Der Creator versichert, dass seine Reichweite und Interaktionen organisch entstanden sind und er keine gekauften Follower, Likes oder Kommentare und keine Engagement-Gruppen einsetzt. Zum Vertragsschluss hat der Kanal [Anzahl] Follower und eine durchschnittliche Reichweite je Beitrag von etwa [Anzahl] (Stand [Datum]).
(3) Eine bestimmte Reichweite oder Interaktionsrate wird nicht geschuldet. Weicht die tatsächliche Reichweite eines Deliverables um mehr als [z. B. 50] % von der in Absatz 2 genannten durchschnittlichen Reichweite nach unten ab, [verhandeln die Parteien über eine zusätzliche Story als Ausgleich / besteht kein Ausgleichsanspruch].
(4) Löscht der Creator ein Deliverable vor Ablauf der Mindestdauer nach § 2 Abs. 3 oder verändert es wesentlich, zahlt er [z. B. 50] % des auf das Deliverable entfallenden Honoraranteils zurück, es sei denn, die Löschung beruht auf einer rechtlichen Verpflichtung oder einer Weisung des Unternehmens.

§ 9 Stornierung, Absage, Nichterfüllung
(1) Sagt das Unternehmen die Kampagne ganz oder teilweise ab, zahlt es bei Absage bis [z. B. 14] Tage vor dem ersten Veröffentlichungstermin [z. B. 25] %, danach [z. B. 50] % und nach Freigabe der Entwürfe 100 % des Honorars der betroffenen Deliverables; bereits überlassene Produkte verbleiben beim Creator.
(2) Liefert der Creator ein Deliverable nicht zum vereinbarten Termin, setzt das Unternehmen eine Nachfrist von [z. B. 5] Werktagen. Verstreicht sie fruchtlos, kann das Unternehmen vom Vertrag hinsichtlich des betroffenen Deliverables zurücktreten; gezahlte Vorschüsse sind insoweit zurückzuzahlen und überlassene Produkte zurückzugeben oder zum Warenwert zu bezahlen.
(3) Verschiebungen aus Gründen, die keine Partei zu vertreten hat (Krankheit, Plattformausfall, Lieferverzögerung der Produkte), werden einvernehmlich neu terminiert.
(4) Jede Partei kann den Vertrag aus wichtigem Grund fristlos kündigen, insbesondere wenn die andere Partei durch ihr Verhalten in der Öffentlichkeit das Ansehen der anderen Partei schwer schädigt (z. B. diskriminierende, extremistische oder strafbare Äußerungen), wiederholt gegen § 4 verstößt oder zahlungsunfähig wird.

§ 10 Haftung, Freistellung, Verhaltenskodex
(1) Der Creator stellt das Unternehmen von Ansprüchen Dritter frei, die auf einer von ihm zu vertretenden Verletzung von Rechten Dritter in den Deliverables (Urheber-, Marken-, Persönlichkeitsrechte, Musiklizenzen) oder auf fehlender Werbekennzeichnung beruhen.
(2) Das Unternehmen stellt den Creator von Ansprüchen Dritter frei, die auf vom Unternehmen vorgegebenen Produkt- und Werbeaussagen, auf bereitgestelltem Material oder auf Mängeln des Produkts beruhen.
(3) Im Übrigen haften die Parteien unbeschränkt für Vorsatz, grobe Fahrlässigkeit und Schäden an Leben, Körper und Gesundheit; bei leichter Fahrlässigkeit nur bei Verletzung wesentlicher Vertragspflichten, begrenzt auf das Honorar dieses Vertrags.
(4) Der Creator verzichtet in den Deliverables und im Zusammenhang mit der Kampagne auf diskriminierende, verletzende oder irreführende Inhalte und äußert sich über das Unternehmen und seine Produkte wahrheitsgemäß; ehrliche Kritik bleibt im Rahmen des Briefings zulässig.

§ 11 Vertraulichkeit, Datenschutz
(1) Die Parteien behandeln Honorar, Konditionen, Briefing-Inhalte, nicht veröffentlichte Produktinformationen und Launch-Termine vertraulich, auch nach Vertragsende. Der Creator veröffentlicht nichts über das Produkt vor dem in Anlage 1 genannten Starttermin (Embargo).
(2) Personenbezogene Daten werden nur zur Vertragsdurchführung verarbeitet. Soweit der Creator Daten von Gewinnspielteilnehmern oder Kunden an das Unternehmen übermittelt, stellen die Parteien die datenschutzrechtliche Grundlage vorher sicher.
(3) Das Unternehmen darf den Creator nach Veröffentlichung in Pressemitteilungen und Kampagnenübersichten als Kooperationspartner nennen; der Creator darf das Unternehmen in seinem Portfolio nennen.

§ 12 Laufzeit und Schlussbestimmungen
(1) Der Vertrag tritt mit Unterzeichnung in Kraft und endet mit Erfüllung aller Pflichten, spätestens mit Ablauf der Nutzungsdauer nach § 6; die Pflichten nach § 2 Abs. 3, § 8 Abs. 4 und § 11 bestehen fort.
(2) Änderungen und Ergänzungen bedürfen der Textform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An ihre Stelle tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Es gilt deutsches Recht. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]; sonst gilt der gesetzliche Gerichtsstand.
(5) Anlagen: Anlage 1 Briefing (Kernbotschaften, Do's and Don'ts, Termine, Embargo), [Anlage 2 Produktliste].
(6) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für das Unternehmen


______________________________
[Vorname Nachname], Creator

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "handelsvertretervertrag",
    titel: "Handelsvertretervertrag",
    kurz: "Vertrag mit einem selbstständigen Handelsvertreter nach §§ 84 ff. HGB: Gebiet, Provision, Abrechnung, Delkredere optional, Wettbewerbsverbot, Kündigungsfristen, Ausgleichsanspruch.",
    kategorie: "dienstleistung",
    dateiname: "Handelsvertretervertrag",
    wofuer: [
      "Du willst Produkte oder Dienstleistungen über einen selbstständigen Vertriebspartner auf Provisionsbasis verkaufen lassen",
      "Du arbeitest selbst als Handelsvertreter und brauchst einen Vertrag, der Provision und Ausgleich absichert",
      "Vertrieb in einem festen Gebiet oder Kundenkreis, mit oder ohne Alleinvertretung",
      "Wenn die zwingenden Regeln des HGB (Provision, Buchauszug, Kündigungsfristen, Ausgleich) sauber umgesetzt sein sollen",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand, Produkte, Gebiet",
      "§ 2 Rechtsstellung des Handelsvertreters",
      "§ 3 Pflichten des Handelsvertreters",
      "§ 4 Pflichten des Unternehmers",
      "§ 5 Provision und Provisionssätze",
      "§ 6 Entstehung, Fälligkeit, Abrechnung, Buchauszug",
      "§ 7 Delkredere (optional)",
      "§ 8 Wettbewerbsverbot während und nach dem Vertrag",
      "§ 9 Geheimhaltung, Unterlagen, Datenschutz",
      "§ 10 Laufzeit und Kündigung",
      "§ 11 Ausgleichsanspruch (§ 89b HGB)",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Der Ausgleichsanspruch nach § 89b HGB kann im Voraus nicht ausgeschlossen werden. Bei Vertragsende zahlt der Unternehmer dem Handelsvertreter bis zu einer Jahresdurchschnittsprovision, wenn er aus dem geworbenen Kundenstamm weiter Vorteile zieht. Kalkuliere das von Anfang an ein.",
      "Die Kündigungsfristen des § 89 HGB sind Mindestfristen: 1 Monat im ersten Jahr, 2 Monate im zweiten, 3 Monate im dritten bis fünften, danach 6 Monate, jeweils zum Monatsende. Kürzere Fristen sind unwirksam; längere müssen für beide Seiten gleich sein.",
      "Der Handelsvertreter hat einen gesetzlichen Anspruch auf Buchauszug (§ 87c HGB) über alle provisionspflichtigen Geschäfte. Das lässt sich nicht abbedingen; richte die Abrechnung von Anfang an so ein, dass du ihn liefern kannst.",
      "Ein nachvertragliches Wettbewerbsverbot ist nur mit Schriftform, maximal zwei Jahren, Beschränkung auf Gebiet/Kundenkreis und Produkte sowie gegen Karenzentschädigung wirksam (§ 90a HGB).",
      "Arbeitet der Vertreter nur für dich, nach deinen Zeitvorgaben und ohne eigene Organisation, kann er Arbeitnehmer oder Einfirmenvertreter mit Arbeitsgerichtszuständigkeit sein (§ 92a HGB, § 5 Abs. 3 ArbGG). Prüfe die tatsächliche Ausgestaltung.",
    ],
    faqs: [
      {
        q: "Was unterscheidet den Handelsvertreter vom Vertriebsmitarbeiter?",
        a: "Der Handelsvertreter ist selbstständiger Gewerbetreibender, der ständig damit betraut ist, für dich Geschäfte zu vermitteln oder abzuschließen (§ 84 HGB). Er trägt sein Unternehmerrisiko, arbeitet frei in Zeit und Organisation und wird nur per Provision bezahlt. Der Vertriebsmitarbeiter ist Arbeitnehmer mit festem Gehalt und Weisungsbindung.",
      },
      {
        q: "Wann entsteht der Provisionsanspruch?",
        a: "Nach § 87a HGB, sobald und soweit du das Geschäft ausgeführt hast, spätestens wenn der Kunde geleistet hat. Führt der Kunde nicht aus, entfällt die Provision nur, wenn das nicht auf deinem Verhalten beruht. Die Abrechnung muss monatlich erfolgen, spätestens bis Ende des Folgemonats (§ 87c HGB); ein Quartalsrhythmus ist vereinbar.",
      },
      {
        q: "Wie hoch ist der Ausgleichsanspruch bei Vertragsende?",
        a: "Höchstens eine Jahresprovision, berechnet aus dem Durchschnitt der letzten fünf Jahre (bei kürzerer Laufzeit der gesamten Laufzeit). Tatsächlich geschuldet ist der Betrag, der dem Vorteil aus neu geworbenen Kunden und der Billigkeit entspricht. Der Anspruch entfällt unter anderem, wenn der Handelsvertreter selbst ohne Anlass kündigt. Er muss innerhalb eines Jahres nach Vertragsende geltend gemacht werden.",
      },
      {
        q: "Was ist Delkredere und sollte ich es vereinbaren?",
        a: "Mit einer Delkredere-Abrede haftet der Handelsvertreter dafür, dass der Kunde zahlt. Das ist nur für bestimmte Geschäfte oder Kunden möglich, muss schriftlich erfolgen und löst eine zusätzliche Delkredereprovision aus (§ 86b HGB). Für kleine Unternehmen ist es meist unnötig; eine Bonitätsprüfung vor Auftragsannahme ist einfacher.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Handelsvertretervertrag brauchst",
        text: `Einen Handelsvertretervertrag brauchst du, wenn ein selbstständiger Vertriebspartner dauerhaft für dich Kunden gewinnt und dafür Provision erhält. Typische Fälle: Ein Hersteller von Lebensmitteln lässt den Einzelhandel in zwei Bundesländern durch einen Vertreter bearbeiten. Ein SaaS-Startup gibt den Vertrieb in eine Branche an einen erfahrenen Außendienstler ab. Ein Großhändler setzt regionale Bezirksvertreter ein.

Als Handelsvertreter nutzt du das Muster, um Provision, Buchauszug, Kündigungsfristen und Ausgleichsanspruch von Anfang an abzusichern. Die Vorlage setzt die zwingenden Regeln der §§ 84 ff. HGB um, die du vertraglich nicht umgehen kannst, und bietet Varianten für Vermittlungs- und Abschlussvertreter, Alleinvertretung und Delkredere. Für einmalige Empfehlungen ohne Dauerbeziehung passt die Tippgeber-Vereinbarung besser.`,
      },
      {
        titel: "Was muss in einen Handelsvertretervertrag?",
        text: `Das HGB gibt den Rahmen vor, der Vertrag füllt ihn aus. Die Vorlage gliedert in zwölf Paragrafen:

- § 1 Produkte, Vertragsgebiet oder Kundenkreis, Alleinvertretung ja oder nein, Abschlussvollmacht
- § 2 Rechtsstellung als selbstständiger Gewerbetreibender nach § 84 HGB, Anzeige weiterer Vertretungen, Untervertreter
- § 3 Pflichten des Handelsvertreters: Bemühen, Berichte, Einhaltung der Preise, Bonitätshinweise
- § 4 Pflichten des Unternehmers: Unterlagen, Information über Annahme und Ausführung nach § 86a HGB
- § 5 Provisionssätze, Bemessungsgrundlage, Nachvertragsprovision nach § 87 Abs. 3 HGB, optional Garantieprovision
- § 6 Entstehung nach § 87a HGB, monatliche Abrechnung, Buchauszug nach § 87c HGB, Einwendungsfrist
- § 7 Delkredere nach § 86b HGB als Variante
- § 8 Wettbewerbsverbot während der Laufzeit, optional nachvertraglich nach § 90a HGB mit Karenzentschädigung
- § 9 Geheimhaltung nach § 90 HGB, Rückgabe der Unterlagen, Datenschutz
- § 10 Kündigungsfristen nach § 89 HGB, fristlose Kündigung nach § 89a HGB
- § 11 Ausgleichsanspruch nach § 89b HGB mit Kundenliste zum Vertragsbeginn
- § 12 Schlussbestimmungen mit Hinweis auf § 5 Abs. 3 ArbGG

Die Altkundenliste in Anlage 1 ist später die Grundlage für die Ausgleichsberechnung. Lege sie am ersten Tag an.`,
      },
      {
        titel: "Handelsvertretervertrag Muster ausfüllen",
        text: `Trage den Unternehmer und den Handelsvertreter mit Gewerbeanmeldung ein. In § 1 beschreibst du Produkte und Gebiet oder Kundenkreis und wählst zwischen Variante A (Alleinvertretung mit Bezirksprovision) und Variante B (keine Exklusivität). Entscheide, ob der Vertreter Verträge in deinem Namen abschließen darf; die meisten Unternehmer belassen es bei der Vermittlung mit Annahmevorbehalt.

In § 3 legst du den Berichtsrhythmus fest. In § 5 trägst du den Provisionssatz, abweichende Sätze für Produktgruppen oder Großkunden, die Frist für Nachvertragsgeschäfte und optional Kostenzuschuss oder Garantieprovision ein. In § 6 setzt du Abrechnungsrhythmus, Zahlungsziel und Einwendungsfrist. In § 7 wählst du Variante A ohne Delkredere oder Variante B mit Delkredereprovision und Haftungsgrenze. In § 8 entscheidest du über das nachvertragliche Wettbewerbsverbot mit Dauer und Karenzentschädigung und trägst die Vertragsstrafe ein. In § 10 setzt du Beginn, Probezeit und gegebenenfalls längere Fristen für beide Seiten. Fülle Anlage 1 mit den Altkunden zum Vertragsbeginn. Die Word-Vorlage lässt sich dafür direkt bearbeiten.`,
      },
      {
        titel: "Typische Fehler im Handelsvertretervertrag",
        text: `Der klassische Fehler ist der Versuch, den Ausgleichsanspruch auszuschließen oder zu verkürzen. § 89b Abs. 4 HGB verbietet das im Voraus; solche Klauseln sind nichtig und wecken Misstrauen. Kalkuliere den Ausgleich stattdessen ein und führe die Kundenliste sauber.

Zweiter Fehler: zu kurze Kündigungsfristen. Die Fristen des § 89 HGB sind Mindestfristen; wer einen Monat für das dritte Vertragsjahr vereinbart, hat trotzdem drei. Dritter Fehler: Buchauszug verweigern oder die Abrechnung so führen, dass er nicht lieferbar ist. Der Anspruch aus § 87c HGB ist unabdingbar.

Weitere Stolperfallen sind ein nachvertragliches Wettbewerbsverbot ohne Schriftform, Karenzentschädigung oder Begrenzung, das nach § 90a HGB unwirksam ist, Vertreter mit nur einem Unternehmer und festen Vorgaben, die als Einfirmenvertreter oder Arbeitnehmer gelten können, und die Vermischung von Provision und Fixgehalt, die die Selbstständigkeit in Frage stellt.`,
      },
      {
        titel: "Rechtliche Grundlagen: §§ 84 bis 92c HGB",
        text: `Das Handelsvertreterrecht steht in den §§ 84 bis 92c HGB. § 84 HGB definiert den Handelsvertreter als selbstständigen Gewerbetreibenden, der ständig damit betraut ist, Geschäfte zu vermitteln oder abzuschließen. § 86 HGB regelt seine Pflichten, § 86a HGB die des Unternehmers. Die Provision folgt aus § 87 HGB, ihre Entstehung und Fälligkeit aus § 87a HGB, Abrechnung und Buchauszug aus § 87c HGB. Delkredere ist in § 86b HGB geregelt, das Wettbewerbsverbot nach Vertragsende in § 90a HGB.

Die Kündigungsfristen des § 89 HGB sind zwingende Mindestfristen, die fristlose Kündigung regelt § 89a HGB. Der Ausgleichsanspruch nach § 89b HGB ist auf eine durchschnittliche Jahresprovision begrenzt, im Voraus unabdingbar und binnen eines Jahres geltend zu machen. § 92a HGB erlaubt Mindestbedingungen für Einfirmenvertreter; nach § 5 Abs. 3 ArbGG gelten Einfirmenvertreter mit geringem Verdienst arbeitsgerichtlich als Arbeitnehmer. Für Kundendaten gilt die DSGVO; ob der Vertreter Auftragsverarbeiter oder eigener Verantwortlicher ist, hängt von seiner Entscheidungsfreiheit ab.`,
      },
      {
        titel: "Wann der Handelsvertretervertrag nicht reicht",
        text: `Bei Vertretern im Ausland, bei Vertrieb von Versicherungen, Finanzprodukten oder Immobilien mit Erlaubnispflichten nach der Gewerbeordnung und bei Vertragshändler- oder Franchise-Modellen, in denen der Partner im eigenen Namen kauft und verkauft, brauchst du einen anderen oder angepassten Vertrag und anwaltliche Begleitung. Dasselbe gilt, wenn du einem Vertreter ein Fixum, ein Fahrzeug und feste Arbeitszeiten gibst; dann ist er wahrscheinlich Arbeitnehmer, und der Vertrag sollte ein Arbeitsvertrag sein.

Streit über den Ausgleichsanspruch am Vertragsende ist fast immer ein Fall für den Anwalt, weil die Berechnung von Kundenstamm, Abwanderungsquote und Billigkeit abhängt. Bei Vertreternetzen mit Untervertretern und bei Mehrfirmenvertretern mit Wettbewerbsprodukten lohnt eine Prüfung von Wettbewerbs- und Kartellrecht. GründerX stellt das Muster als Software bereit und ersetzt keine Rechtsberatung.`,
      },
    ],
    seo: {
      title: "Handelsvertretervertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Handelsvertretervertrag nach §§ 84 ff. HGB als kostenlose Vorlage: Gebiet, Provision, Buchauszug, Delkredere, Wettbewerbsverbot, Kündigung, Ausgleich.",
    },
    stand: "2026-10",
    text: `Handelsvertretervertrag

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Unternehmer“ –

und

[Vorname Nachname / Firma], [Straße, PLZ Ort], Gewerbeanmeldung [Ort, Datum]
– nachfolgend „Handelsvertreter“ –

– gemeinsam „die Parteien“ –

§ 1 Vertragsgegenstand, Produkte, Gebiet
(1) Der Unternehmer betraut den Handelsvertreter damit, ständig Geschäfte über folgende Produkte und Leistungen zu vermitteln [und im Namen des Unternehmers abzuschließen]: [Produkte/Leistungen, z. B. „das gesamte Sortiment an [Produktgruppe] laut jeweils gültiger Preisliste“].
(2) Vertragsgebiet ist [Gebiet, z. B. „die Bundesländer Bayern und Baden-Württemberg“ / Kundenkreis, z. B. „Apotheken und Drogerien in Deutschland“]. [Variante A: Der Handelsvertreter ist für das Vertragsgebiet als Alleinvertreter (Bezirksvertreter im Sinne des § 87 Abs. 2 HGB) bestellt; der Unternehmer setzt dort keine weiteren Vertreter ein.] [Variante B: Der Unternehmer darf im Vertragsgebiet weitere Handelsvertreter einsetzen und selbst Kunden betreuen; § 87 Abs. 2 HGB findet keine Anwendung.]
(3) Der Handelsvertreter ist [nicht] zum Abschluss von Verträgen im Namen des Unternehmers bevollmächtigt. [Bei Vermittlungsvertretern: Er nimmt Aufträge unter dem Vorbehalt der Annahme durch den Unternehmer entgegen.] Zur Entgegennahme von Zahlungen und zur Gewährung von Stundungen, Nachlässen oder Rückgaben ist er nicht berechtigt, soweit nicht im Einzelfall in Textform ermächtigt.
(4) Der Unternehmer kann das Sortiment, die Preise und die Verkaufsbedingungen jederzeit ändern und teilt Änderungen dem Handelsvertreter mit angemessenem Vorlauf mit.

§ 2 Rechtsstellung des Handelsvertreters
(1) Der Handelsvertreter ist selbstständiger Gewerbetreibender im Sinne des § 84 Abs. 1 HGB. Er gestaltet seine Tätigkeit und seine Arbeitszeit im Wesentlichen frei und trägt die Kosten seines Geschäftsbetriebs (Büro, Fahrzeug, Personal, Kommunikation, Versicherungen) selbst, soweit dieser Vertrag nichts anderes bestimmt.
(2) Der Handelsvertreter darf auch für andere Unternehmer tätig sein, soweit § 8 dem nicht entgegensteht. Er ist verpflichtet, dem Unternehmer vor Aufnahme jede weitere Vertretung anzuzeigen.
(3) Der Handelsvertreter darf Untervertreter nur mit Zustimmung des Unternehmers in Textform einsetzen. Vertragsbeziehungen bestehen dann nur zwischen Handelsvertreter und Untervertreter.
(4) Der Handelsvertreter meldet sein Gewerbe an und führt seine Steuern und Sozialabgaben selbst ab. Beide Parteien sind sich bewusst, dass die tatsächliche Durchführung dem Status eines Selbstständigen entsprechen muss.

§ 3 Pflichten des Handelsvertreters
(1) Der Handelsvertreter bemüht sich mit der Sorgfalt eines ordentlichen Kaufmanns um die Vermittlung von Geschäften und nimmt dabei die Interessen des Unternehmers wahr (§ 86 Abs. 1 HGB). Er besucht die Kunden im Vertragsgebiet regelmäßig, wirbt neue Kunden und pflegt den Bestand.
(2) Er gibt dem Unternehmer unverzüglich die erforderlichen Nachrichten, insbesondere über jede Vermittlung und jeden Abschluss, über Kundenwünsche, Reklamationen, Bonitätsrisiken und Markt- und Wettbewerbsentwicklungen. Er berichtet [monatlich / quartalsweise] in Textform über seine Tätigkeit und Besuche.
(3) Er hält die Preise, Verkaufs- und Lieferbedingungen des Unternehmers ein, verwendet nur die vom Unternehmer freigegebenen Unterlagen und gibt keine Zusicherungen ab, die über die Produktbeschreibung des Unternehmers hinausgehen.
(4) Er prüft, soweit ihm möglich, die Kreditwürdigkeit neuer Kunden und teilt dem Unternehmer bekannte Zweifel mit. Eine Haftung für die Zahlungsfähigkeit übernimmt er nur nach § 7.
(5) Er darf keine Geschenke oder Vorteile von Kunden annehmen, die über übliche geringfügige Aufmerksamkeiten hinausgehen.

§ 4 Pflichten des Unternehmers
(1) Der Unternehmer unterstützt den Handelsvertreter bei seiner Tätigkeit und stellt ihm die erforderlichen Unterlagen (Muster, Preislisten, Kataloge, Werbematerial, Zugang zum Bestellsystem) unentgeltlich zur Verfügung (§ 86a Abs. 1 HGB). Die Unterlagen bleiben Eigentum des Unternehmers.
(2) Der Unternehmer teilt dem Handelsvertreter unverzüglich mit, ob er ein vermitteltes Geschäft annimmt oder ablehnt und ob ein abgeschlossenes Geschäft nicht ausgeführt wird. Er informiert ihn, wenn er Geschäfte voraussichtlich nur in erheblich geringerem Umfang abschließen kann oder will, als der Handelsvertreter unter gewöhnlichen Umständen erwarten durfte (§ 86a Abs. 2 HGB).
(3) Der Unternehmer informiert den Handelsvertreter über Direktgeschäfte mit Kunden des Vertragsgebiets und über Änderungen von Preisen und Bedingungen.
(4) Der Unternehmer ist für die Qualität der Produkte, Lieferung, Rechnungsstellung und Reklamationsbearbeitung verantwortlich.

§ 5 Provision und Provisionssätze
(1) Der Handelsvertreter erhält für alle während der Vertragsdauer abgeschlossenen Geschäfte, die auf seine Tätigkeit zurückzuführen sind oder mit Kunden abgeschlossen werden, die er für Geschäfte der gleichen Art geworben hat, eine Provision (§ 87 Abs. 1 HGB). [Bei Alleinvertretung: Er erhält auch Provision für Geschäfte, die ohne seine Mitwirkung mit Kunden seines Vertragsgebiets abgeschlossen werden (§ 87 Abs. 2 HGB).]
(2) Die Provision beträgt [z. B. 10] % des Nettorechnungswerts (Rechnungsbetrag ohne Umsatzsteuer, abzüglich gewährter Rabatte, Skonti und Gutschriften; Fracht- und Verpackungskosten bleiben außer Ansatz). Für folgende Produktgruppen oder Kunden gelten abweichende Sätze: [Produktgruppe A: [z. B. 7] %; Großkunden laut Anlage 1: [z. B. 5] %].
(3) Für Geschäfte, die erst nach Vertragsende abgeschlossen werden, erhält der Handelsvertreter Provision nach Maßgabe des § 87 Abs. 3 HGB, wenn er sie vermittelt oder so eingeleitet hat, dass der Abschluss überwiegend auf seine Tätigkeit zurückzuführen ist, und der Abschluss innerhalb von [z. B. 3] Monaten nach Vertragsende erfolgt.
(4) Mit der Provision sind alle Aufwendungen des Handelsvertreters abgegolten. [Optional: Der Unternehmer zahlt zusätzlich einen Kostenzuschuss von [Betrag] EUR monatlich für [Zweck] / in den ersten [Anzahl] Monaten eine Garantieprovision von [Betrag] EUR monatlich, die mit verdienten Provisionen verrechnet wird.]
(5) Die Provision versteht sich zuzüglich gesetzlicher Umsatzsteuer.

§ 6 Entstehung, Fälligkeit, Abrechnung, Buchauszug
(1) Der Provisionsanspruch entsteht, sobald und soweit der Unternehmer das Geschäft ausgeführt hat (§ 87a Abs. 1 HGB). Er entsteht spätestens, wenn der Kunde geleistet hat. Führt der Kunde nicht aus, entfällt der Anspruch, es sei denn, die Nichtausführung beruht auf Umständen, die der Unternehmer zu vertreten hat (§ 87a Abs. 2 und 3 HGB). Bereits ausgezahlte Provisionen auf entfallene Ansprüche werden mit der nächsten Abrechnung verrechnet.
(2) Der Unternehmer rechnet die Provision [monatlich / vierteljährlich], spätestens bis zum Ende des auf den Abrechnungszeitraum folgenden Monats ab (§ 87c Abs. 1 HGB). Die Abrechnung enthält alle provisionspflichtigen Geschäfte mit Kunde, Datum, Rechnungsnummer, Nettowert, Provisionssatz und Provisionsbetrag sowie Stornierungen und Gutschriften.
(3) Die Provision ist mit der Abrechnung fällig und innerhalb von [z. B. 14] Tagen zu zahlen. Der Handelsvertreter stellt hierüber eine Rechnung mit ausgewiesener Umsatzsteuer; alternativ erteilt der Unternehmer eine Gutschrift im umsatzsteuerlichen Sinne.
(4) Der Handelsvertreter kann bei der Abrechnung einen Buchauszug über alle Geschäfte verlangen, für die ihm Provision gebührt, sowie Auskunft über alle für den Provisionsanspruch wesentlichen Umstände (§ 87c Abs. 2 und 3 HGB). Diese Rechte können nicht ausgeschlossen werden.
(5) Einwendungen gegen eine Abrechnung sind innerhalb von [z. B. 3] Monaten nach Zugang in Textform zu erheben; die gesetzlichen Kontrollrechte bleiben unberührt.

§ 7 Delkredere (optional)
[Variante A: (1) Der Handelsvertreter übernimmt keine Haftung für die Erfüllung der Verbindlichkeiten der Kunden.]
[Variante B: (1) Der Handelsvertreter übernimmt für die in Anlage 2 genannten Kunden/Geschäfte die Haftung dafür, dass der Kunde seine Zahlungspflicht erfüllt (Delkredere, § 86b HGB). Diese Übernahme erfolgt schriftlich durch diese Vereinbarung und kann nur für bestimmte Geschäfte oder bestimmte Kunden erklärt werden.
(2) Für jedes Delkredere-Geschäft erhält der Handelsvertreter zusätzlich eine Delkredereprovision von [z. B. 2] % des Nettorechnungswerts, die mit Abschluss des Geschäfts entsteht.
(3) Die Haftung ist auf [z. B. 50] % des Nettorechnungswerts je Geschäft begrenzt und setzt voraus, dass der Unternehmer den Kunden zweimal erfolglos gemahnt hat.]

§ 8 Wettbewerbsverbot während und nach dem Vertrag
(1) Während der Vertragsdauer darf der Handelsvertreter ohne Zustimmung des Unternehmers in Textform keine Produkte vertreiben oder vermitteln, die mit den Vertragsprodukten im Wettbewerb stehen, und sich nicht an Wettbewerbern beteiligen. Dies folgt bereits aus seiner Interessenwahrungspflicht nach § 86 HGB.
(2) [Optional, nachvertragliches Wettbewerbsverbot nach § 90a HGB: Für die Dauer von [höchstens 2] Jahren nach Vertragsende darf der Handelsvertreter im Vertragsgebiet bzw. gegenüber dem Kundenkreis nach § 1 Abs. 2 keine mit den Vertragsprodukten konkurrierenden Produkte vertreiben oder vermitteln. Der Unternehmer zahlt für die Dauer des Verbots eine angemessene Karenzentschädigung von [Betrag] EUR monatlich. Diese Abrede bedarf der Schriftform; der Handelsvertreter erhält eine vom Unternehmer unterzeichnete Urkunde. Der Unternehmer kann bis zum Vertragsende schriftlich auf das Verbot verzichten und wird dann mit Ablauf von sechs Monaten seit der Erklärung von der Entschädigungspflicht frei.]
(3) Für jeden schuldhaften Verstoß gegen Absatz 1 [oder 2] zahlt der Handelsvertreter eine Vertragsstrafe von [Betrag] EUR; weitergehender Schadensersatz bleibt vorbehalten, die Vertragsstrafe wird angerechnet.

§ 9 Geheimhaltung, Unterlagen, Datenschutz
(1) Der Handelsvertreter hat Geschäfts- und Betriebsgeheimnisse des Unternehmers, insbesondere Kundenlisten, Konditionen, Kalkulationen und Produktentwicklungen, auch nach Vertragsende geheim zu halten (§ 90 HGB).
(2) Nach Vertragsende gibt er alle Unterlagen, Muster, Zugänge und Daten des Unternehmers unverzüglich zurück bzw. löscht sie und bestätigt dies in Textform; ein Zurückbehaltungsrecht besteht nur wegen fälliger, unbestrittener Provisionsforderungen an den Unterlagen, die der Unternehmer ihm zur Verfügung gestellt hat (§ 88a HGB).
(3) Kundendaten verarbeitet der Handelsvertreter nur im Rahmen dieses Vertrags und nach den Vorgaben der DSGVO. Die Parteien legen in Anlage 3 fest, ob der Handelsvertreter als eigener Verantwortlicher oder als Auftragsverarbeiter handelt, und schließen bei Bedarf einen Vertrag nach Art. 28 DSGVO.

§ 10 Laufzeit und Kündigung
(1) Der Vertrag beginnt am [Datum] und läuft auf unbestimmte Zeit. [Optional: Die ersten [z. B. 6] Monate gelten als Probezeit, in der mit einer Frist von einem Monat zum Monatsende gekündigt werden kann.]
(2) Der Vertrag kann von beiden Parteien mit den gesetzlichen Fristen des § 89 Abs. 1 HGB gekündigt werden: im ersten Vertragsjahr mit einer Frist von einem Monat, im zweiten Vertragsjahr von zwei Monaten, im dritten bis fünften Vertragsjahr von drei Monaten und danach von sechs Monaten, jeweils zum Ende eines Kalendermonats. [Optional: Abweichend wird für beide Parteien eine Kündigungsfrist von [z. B. 6] Monaten zum Monatsende vereinbart; die Frist für den Unternehmer ist nie kürzer als die für den Handelsvertreter.]
(3) Das Recht zur Kündigung aus wichtigem Grund ohne Einhaltung einer Frist (§ 89a HGB) bleibt unberührt. Ein wichtiger Grund liegt insbesondere vor bei nachhaltigen Verstößen gegen § 3, § 8 oder § 9, bei Verzug des Unternehmers mit Provisionszahlungen trotz Mahnung oder bei Insolvenz einer Partei.
(4) Jede Kündigung bedarf der Schriftform.

§ 11 Ausgleichsanspruch (§ 89b HGB)
(1) Nach Beendigung des Vertrags kann der Handelsvertreter vom Unternehmer einen angemessenen Ausgleich verlangen, wenn und soweit der Unternehmer aus der Geschäftsverbindung mit neuen Kunden, die der Handelsvertreter geworben hat, auch nach Vertragsende erhebliche Vorteile hat und die Zahlung des Ausgleichs unter Berücksichtigung aller Umstände, insbesondere der dem Handelsvertreter entgehenden Provisionen, der Billigkeit entspricht. Der wesentlichen Erweiterung der Geschäftsverbindung mit einem bestehenden Kunden steht die Werbung eines neuen Kunden gleich.
(2) Der Ausgleich beträgt höchstens eine nach dem Durchschnitt der letzten fünf Jahre der Tätigkeit berechnete Jahresprovision; bei kürzerer Dauer ist der Durchschnitt der Vertragsdauer maßgebend.
(3) Der Anspruch besteht nicht, wenn der Handelsvertreter den Vertrag selbst gekündigt hat, es sei denn, ein Verhalten des Unternehmers hat hierzu begründeten Anlass gegeben oder dem Handelsvertreter kann wegen seines Alters oder wegen Krankheit die Fortsetzung nicht zugemutet werden; ferner nicht, wenn der Unternehmer aus wichtigem Grund wegen schuldhaften Verhaltens des Handelsvertreters gekündigt hat oder ein Dritter aufgrund einer Vereinbarung mit dem Unternehmer in den Vertrag eintritt.
(4) Der Anspruch kann im Voraus nicht ausgeschlossen werden. Er ist innerhalb eines Jahres nach Vertragsende geltend zu machen.
(5) Die Parteien führen die zur Berechnung erforderlichen Kundenlisten mit Datum der Erstwerbung (Anlage 1: Altkunden bei Vertragsbeginn) und schreiben sie fort.

§ 12 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An ihre Stelle tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt und den zwingenden Vorschriften der §§ 84 ff. HGB entspricht.
(3) Es gilt deutsches Recht. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]. Die Zuständigkeit der Arbeitsgerichte nach § 5 Abs. 3 ArbGG bleibt unberührt.
(4) Anlagen: Anlage 1 Kundenliste bei Vertragsbeginn und Sonderkonditionen, [Anlage 2 Delkredere-Kunden], Anlage 3 Datenschutz.
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Unternehmer


______________________________
[Vorname Nachname], Handelsvertreter

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "provisionsvereinbarung-tippgeber",
    titel: "Provisionsvereinbarung für Tippgeber",
    kurz: "Tippgeber- und Empfehlungsvereinbarung: Provision bei Vertragsabschluss mit dem empfohlenen Kunden, Nachweis, Abrechnung, klare Abgrenzung zur Vermittlung, Laufzeit.",
    kategorie: "dienstleistung",
    dateiname: "Provisionsvereinbarung-Tippgeber",
    wofuer: [
      "Du zahlst Partnern, Bekannten oder Kunden eine Prämie, wenn sie dir einen neuen Kunden bringen",
      "Du empfiehlst selbst Kunden weiter und willst die Provision verbindlich festhalten",
      "Einmalprovision pro Abschluss oder laufende Beteiligung am Umsatz für eine begrenzte Zeit",
      "Wenn klar sein soll, dass der Tippgeber nur Kontakte nennt und nicht für dich verhandelt oder abschließt",
    ],
    enthaelt: [
      "§ 1 Gegenstand: Nennung von Interessenten (Tipp)",
      "§ 2 Abgrenzung: keine Vermittlung, keine Vertretung",
      "§ 3 Form und Nachweis des Tipps, Schutzfrist",
      "§ 4 Provision und Entstehung",
      "§ 5 Abrechnung, Auskunft, Zahlung",
      "§ 6 Pflichten des Tippgebers, Datenschutz",
      "§ 7 Keine Exklusivität, kein Wettbewerbsverbot",
      "§ 8 Laufzeit, Kündigung, Nachwirkung",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Der Tippgeber darf nur den Kontakt herstellen. Sobald er Produkte erklärt, Angebote verhandelt oder Unterlagen abgibt, wird er zum Vermittler – bei Versicherungen, Finanzanlagen, Darlehen und Immobilien braucht er dafür eine Gewerbeerlaubnis (§ 34c, § 34d, § 34f GewO). Die Vorlage zieht diese Grenze ausdrücklich.",
      "Der Interessent muss wissen, dass seine Daten weitergegeben werden. Ohne Einwilligung oder ein anderes berechtigtes Interesse verstößt die Weitergabe gegen die DSGVO. Die Vorlage verpflichtet den Tippgeber, die Einwilligung einzuholen.",
      "Provisionen an Privatpersonen sind für diese steuerpflichtige Einnahmen; ab regelmäßiger Tätigkeit wird daraus ein Gewerbe. Weise deine Tippgeber darauf hin, und kläre, ob sie Umsatzsteuer ausweisen.",
      "Erfolgt die Empfehlung gegenüber Verbrauchern (z. B. Kunden-werben-Kunden), gelten die Regeln für Werbung: keine verdeckte Werbung, keine unzumutbare Belästigung per Mail oder Telefon ohne Einwilligung (§ 7 UWG).",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Tippgeber und Handelsvertreter oder Makler?",
        a: "Der Tippgeber nennt nur den Kontakt und erhält eine Prämie, wenn daraus ein Vertrag wird. Er verhandelt nicht, berät nicht und schließt nicht ab. Der Handelsvertreter ist ständig mit der Vermittlung betraut und hat gesetzliche Rechte wie den Ausgleichsanspruch; der Makler vermittelt im Einzelfall. Beide brauchen in regulierten Branchen eine Erlaubnis, der Tippgeber nicht.",
      },
      {
        q: "Wann ist die Provision fällig?",
        a: "Nach der Vorlage, wenn ein Vertrag zwischen dir und dem genannten Interessenten innerhalb der Schutzfrist zustande kommt und der Kunde die erste Rechnung bezahlt hat. Bei Widerruf, Storno oder Nichtzahlung entfällt die Provision oder wird zurückgefordert. So zahlst du nie für Abschlüsse, die dir nichts bringen.",
      },
      {
        q: "Was ist, wenn ich den Kunden schon kannte?",
        a: "Dann gibt es keine Provision. Die Vorlage sieht vor, dass du einen Tipp innerhalb einer Frist ablehnen kannst, wenn der Kontakt dir bereits bekannt ist oder ein anderer Tippgeber ihn vorher genannt hat. Ohne Ablehnung in der Frist gilt der Tipp als angenommen – das sorgt für Klarheit auf beiden Seiten.",
      },
      {
        q: "Darf ich Tippgeber-Provisionen an Mitarbeiter von Kunden zahlen?",
        a: "Vorsicht: Zahlungen an Angestellte eines Unternehmens dafür, dass sie ihren Arbeitgeber zu dir lenken, können Bestechung im geschäftlichen Verkehr sein (§ 299 StGB). Tippgeber sollten frei und offen handeln; die Vorlage verlangt, dass der Tippgeber keine Pflichten gegenüber dem Interessenten verletzt.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du eine Tippgeber-Vereinbarung brauchst",
        text: `Eine Tippgeber-Vereinbarung brauchst du, sobald du jemandem Geld dafür versprichst, dass er dir einen Kunden nennt. Typische Fälle: Ein Steuerberater empfiehlt deiner Webagentur Mandanten, ein zufriedener Kunde bringt zwei weitere, ein Netzwerkpartner nennt dir Firmen mit Bedarf an deiner Software. Auch Kunden-werben-Kunden-Programme und Partnerprogramme mit Einmalprämie laufen über diese Logik.

Als Tippgeber nutzt du das Muster, um Provision, Schutzfrist und Abrechnung verbindlich zu machen, bevor du Kontakte weitergibst. Entscheidend ist die Abgrenzung: Der Tippgeber nennt nur den Kontakt, er berät, verhandelt und schließt nicht ab. Wer mehr tut, ist Vermittler oder Handelsvertreter mit anderen Pflichten; dafür gibt es den Handelsvertretervertrag.`,
      },
      {
        titel: "Was muss in eine Provisionsvereinbarung für Tippgeber?",
        text: `Die Vereinbarung muss vor allem klären, wann ein Tipp zählt und wann Geld fließt. Die Vorlage regelt in neun Paragrafen:

- § 1 Gegenstand: Benennung von Interessenten für bestimmte Produkte, keine Pflicht zur Benennung oder zum Abschluss, keine Handelsvertretung
- § 2 Abgrenzung: keine Erläuterung, keine Preise, keine Verhandlung, keine Vertretung, strikte Beschränkung bei erlaubnispflichtigen Produkten
- § 3 Form des Tipps in Textform mit Einwilligung des Interessenten, Bestätigung oder Ablehnung binnen Frist, Schutzfrist
- § 4 Provision als Festbetrag oder Prozentsatz mit Deckel, Entstehung nach Zahlung der ersten Rechnung, Rückforderung bei Storno, keine Kettenprovision
- § 5 Mitteilung von Abschlüssen, Abrechnung per Rechnung oder Gutschrift, jährliche Statusübersicht, Prüfrecht
- § 6 Pflichten des Tippgebers: Einwilligung dokumentieren, keine Werbeanrufe ohne Erlaubnis, keine falschen Versprechen, Information nach Art. 14 DSGVO
- § 7 Keine Exklusivität, kein Wettbewerbsverbot
- § 8 Laufzeit, Kündigung, Nachwirkung für angenommene Tipps
- § 9 Schlussbestimmungen

Die Ablehnungsfrist in § 3 Abs. 2 ist der Schutz des Unternehmens vor Provisionen für Kunden, die es längst kannte.`,
      },
      {
        titel: "Tippgeber-Vereinbarung Muster ausfüllen",
        text: `Trage das Unternehmen und den Tippgeber ein; bei Privatpersonen reichen Name und Anschrift. In § 1 beschreibst du die Produkte oder Leistungen, für die Tipps vergütet werden. In § 3 setzt du den Übermittlungsweg (E-Mail-Adresse oder Formular), die Frist zur Bestätigung oder Ablehnung und die Schutzfrist; entscheide, ob Abschlüsse nach Fristablauf noch provisionspflichtig sind, wenn die Verhandlungen vorher begannen.

In § 4 wählst du Variante A mit festem Betrag oder Variante B mit Prozentsatz, Bemessungszeitraum und Höchstbetrag je Kunde. Trage die Rückforderungsfrist bei Storno und die Frist ein, nach der Folgeaufträge nicht mehr zählen. Bei Tippgebern, die Umsatzsteuer ausweisen, behalte den Zusatz. In § 5 setzt du Mitteilungsfrist, Abrechnungsrhythmus, Zahlungsziel und die Abweichung, ab der das Unternehmen Prüfkosten trägt. In § 8 trägst du Beginn und Kündigungsfrist ein. Dann Gerichtsstand, Datum und Unterschriften. Lade die Vorlage als Word-Datei und passe die Beträge an.`,
      },
      {
        titel: "Typische Fehler bei Tippgeber-Provisionen",
        text: `Der gefährlichste Fehler ist der Tippgeber, der zu viel tut. Erklärt er Produkte, nennt Preise oder legt Unterlagen vor, ist er Vermittler. Bei Versicherungen, Finanzanlagen, Darlehen und Immobilien braucht er dann eine Erlaubnis nach § 34c, § 34d oder § 34f GewO, und das Unternehmen arbeitet mit einem unerlaubt tätigen Vermittler. § 2 der Vorlage zieht die Grenze; sprich sie mit jedem Tippgeber durch.

Zweiter Fehler: Kontaktdaten ohne Einwilligung weitergeben. Der Interessent hat sein Einverständnis nie erklärt, das Unternehmen ruft an, und der erste Kontakt ist bereits ein Datenschutz- und UWG-Verstoß. Dritter Fehler: Provision bei Vertragsschluss statt bei Zahlung. Dann zahlst du für Kunden, die nie eine Rechnung begleichen.

Weitere Stolperfallen sind Zahlungen an Angestellte des Kunden, die als Bestechung nach § 299 StGB strafbar sein können, fehlende Schutzfristen, Kettenprovisionen und Tippgeber, die mit deinem Logo als Partner auftreten.`,
      },
      {
        titel: "Rechtliche Grundlagen: Tippgeber, Makler, § 7 UWG und DSGVO",
        text: `Die Tippgeber-Vereinbarung ist gesetzlich nicht eigens geregelt. Sie ist ein Vertrag eigener Art, der dem Maklervertrag nach den §§ 652 ff. BGB ähnelt, aber auf die bloße Namhaftmachung beschränkt ist. Der Maklerlohn nach § 652 BGB entsteht beim Nachweis oder bei der Vermittlung eines Vertrags; die Vorlage knüpft strenger an die erste Zahlung an. Von der Handelsvertretung nach § 84 HGB unterscheidet sich der Tippgeber dadurch, dass er nicht ständig betraut ist und nicht vermittelt.

Erlaubnispflichten für Vermittler stehen in § 34c GewO (Immobilien, Darlehen), § 34d GewO (Versicherungen) und § 34f GewO (Finanzanlagen). Bei Versicherungen gilt die bloße Namhaftmachung eines Interessenten als erlaubnisfrei; bei Immobilien und Darlehen ist dagegen schon der Nachweis einer Vertragsgelegenheit erlaubnispflichtig, die Grenze ist dort noch enger. Für die Ansprache gilt § 7 UWG: Werbeanrufe und Werbe-E-Mails brauchen eine Einwilligung. Für die Datenweitergabe braucht das Unternehmen eine Rechtsgrundlage nach Art. 6 DSGVO und muss den Interessenten nach Art. 14 DSGVO über die Herkunft seiner Daten informieren. Provisionen sind beim Tippgeber steuerpflichtige Einnahmen.`,
      },
      {
        titel: "Wann die Tippgeber-Vorlage nicht reicht",
        text: `Sobald Tippgeber regelmäßig für dich tätig werden, Kunden besuchen oder Verkaufsgespräche führen, ist die Vereinbarung das falsche Instrument; dann brauchst du einen Handelsvertretervertrag mit allen Folgen des HGB. Bei Tipps für Versicherungen, Darlehen, Immobilien oder Finanzanlagen lass die Abgrenzung von einem Anwalt prüfen, weil die Erlaubnispflicht schon bei kleinen Übergriffen greift.

Für Kunden-werben-Kunden-Aktionen gegenüber Verbrauchern brauchst du zusätzlich Teilnahmebedingungen und eine datenschutzkonforme Gestaltung des Empfehlungsformulars. Zahlst du Provisionen an Personen, die beim empfohlenen Kunden angestellt sind, hol dir vorher Rat; der Grat zur Bestechlichkeit ist schmal. Für Partnerprogramme mit Tracking und vielen Partnern nimm den Affiliate-Vertrag. GründerX stellt die Vorlage als Software bereit und ersetzt keine Rechtsberatung.`,
      },
    ],
    seo: {
      title: "Tippgeber-Vereinbarung Vorlage kostenlos (Word) | GründerX",
      description:
        "Tippgeber- und Empfehlungsvereinbarung als kostenlose Vorlage: Provision bei Abschluss, Nachweis des Tipps, Schutzfrist, Abrechnung, keine Vermittlung.",
    },
    stand: "2026-10",
    text: `Tippgeber- und Provisionsvereinbarung

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Unternehmen“ –

und

[Vorname Nachname / Firma], [Straße, PLZ Ort]
– nachfolgend „Tippgeber“ –

– gemeinsam „die Parteien“ –

§ 1 Gegenstand
(1) Der Tippgeber benennt dem Unternehmen Personen oder Unternehmen, die voraussichtlich Interesse an folgenden Produkten oder Leistungen des Unternehmens haben („Interessenten“): [Produkte/Leistungen, z. B. „Webdesign- und SEO-Leistungen für kleine Unternehmen“].
(2) Der Tippgeber ist zur Benennung von Interessenten berechtigt, aber nicht verpflichtet. Das Unternehmen ist nicht verpflichtet, mit benannten Interessenten Verträge zu schließen.
(3) Diese Vereinbarung begründet kein Arbeitsverhältnis, keine Handelsvertretung im Sinne der §§ 84 ff. HGB, keinen Maklervertrag und keine Gesellschaft.

§ 2 Abgrenzung: keine Vermittlung, keine Vertretung
(1) Die Tätigkeit des Tippgebers beschränkt sich darauf, dem Unternehmen den Namen und die Kontaktdaten des Interessenten sowie eine kurze Beschreibung seines Bedarfs mitzuteilen und, soweit der Interessent einverstanden ist, einen Erstkontakt herzustellen.
(2) Der Tippgeber ist nicht berechtigt und nicht verpflichtet, die Produkte oder Leistungen des Unternehmens zu erläutern, zu bewerben, Angebote oder Preise zu nennen, Verhandlungen zu führen, Unterlagen oder Verträge auszuhändigen oder Erklärungen im Namen des Unternehmens abzugeben. Er tritt gegenüber dem Interessenten nicht als Vertreter oder Berater des Unternehmens auf.
(3) Soweit die Produkte oder Leistungen des Unternehmens einer Vermittlungserlaubnis unterliegen (z. B. Versicherungen, Finanzanlagen, Darlehen, Immobilien), bleibt die Tätigkeit des Tippgebers auf die bloße Namhaftmachung beschränkt; jede weitergehende Tätigkeit ist untersagt.

§ 3 Form und Nachweis des Tipps, Schutzfrist
(1) Ein Tipp ist in Textform (E-Mail an [Adresse] oder über das Formular [URL]) zu übermitteln und enthält: Name und Kontaktdaten des Interessenten, Ansprechpartner, Beschreibung des Bedarfs, Datum des Tipps und die Bestätigung, dass der Interessent mit der Weitergabe seiner Daten und der Kontaktaufnahme durch das Unternehmen einverstanden ist.
(2) Das Unternehmen bestätigt den Eingang des Tipps innerhalb von [z. B. 5] Werktagen in Textform. Es kann den Tipp innerhalb dieser Frist ablehnen, wenn der Interessent dem Unternehmen bereits bekannt ist (bestehender Kunde, laufende Verhandlung, bereits von einem anderen Tippgeber benannt). Erfolgt keine Ablehnung, gilt der Tipp als angenommen und der Interessent als vom Tippgeber benannt.
(3) Die Schutzfrist beträgt [z. B. 6] Monate ab Annahme des Tipps. Kommt innerhalb der Schutzfrist ein Vertrag zwischen Unternehmen und Interessent zustande, ist der Abschluss provisionspflichtig. Verträge, die nach Ablauf der Schutzfrist geschlossen werden, sind [nicht provisionspflichtig / provisionspflichtig, wenn die Verhandlungen nachweislich innerhalb der Schutzfrist begonnen haben].

§ 4 Provision und Entstehung
(1) Für jeden provisionspflichtigen Abschluss erhält der Tippgeber [Variante A: eine einmalige Provision von [Betrag] EUR] [Variante B: eine Provision von [z. B. 10] % des Nettoauftragswerts (bzw. bei laufenden Verträgen des Nettoumsatzes der ersten [z. B. 12] Monate), höchstens [Betrag] EUR je Kunde] [jeweils zuzüglich Umsatzsteuer, soweit der Tippgeber Unternehmer ist und Umsatzsteuer ausweist].
(2) Der Provisionsanspruch entsteht, wenn der Vertrag mit dem Interessenten wirksam zustande gekommen ist, eine etwaige Widerrufs- oder Rücktrittsfrist abgelaufen ist und der Interessent die erste Rechnung vollständig bezahlt hat. Bei umsatzabhängiger Provision entsteht der Anspruch anteilig mit jeder bezahlten Rechnung.
(3) Wird der Vertrag innerhalb von [z. B. 6] Monaten nach Abschluss rückabgewickelt, gekündigt oder zahlt der Kunde nicht, entfällt die Provision anteilig; bereits gezahlte Beträge sind zurückzuzahlen oder werden mit künftigen Provisionen verrechnet. Dies gilt nicht, wenn die Nichtdurchführung vom Unternehmen zu vertreten ist.
(4) Keine Provision fällt an für Folgeaufträge, Vertragsverlängerungen oder Zusatzbestellungen des Kunden, die nach Ablauf von [z. B. 12] Monaten nach dem ersten Abschluss erfolgen, sowie für Verträge mit Personen, die vom Interessenten weiterempfohlen wurden (keine Kettenprovision).
(5) Mit der Provision sind alle Aufwendungen des Tippgebers abgegolten. Der Tippgeber versteuert die Provision selbst. Erzielt er Provisionen regelmäßig, obliegt ihm die gewerbe- und steuerrechtliche Anmeldung.

§ 5 Abrechnung, Auskunft, Zahlung
(1) Das Unternehmen teilt dem Tippgeber den Abschluss eines provisionspflichtigen Vertrags mit einem von ihm benannten Interessenten innerhalb von [z. B. 14] Tagen in Textform mit, unter Angabe von Vertragsdatum und (bei umsatzabhängiger Provision) Auftragswert. Namen und Details, die der Geheimhaltung gegenüber dem Kunden unterliegen, werden nur insoweit offengelegt, wie es zur Berechnung erforderlich ist.
(2) Das Unternehmen rechnet die Provision [monatlich / vierteljährlich] bis zum [z. B. 15.] des Folgemonats ab. Der Tippgeber stellt auf Basis der Abrechnung eine Rechnung oder das Unternehmen erteilt eine Gutschrift. Zahlung innerhalb von [z. B. 14] Tagen nach Rechnungszugang.
(3) Der Tippgeber kann auf Verlangen einmal jährlich eine Aufstellung aller von ihm benannten Interessenten mit dem Stand (abgelehnt, offen, Abschluss, Storno) erhalten.
(4) Bei umsatzabhängiger Provision darf der Tippgeber die Richtigkeit der Abrechnung durch einen zur Verschwiegenheit verpflichteten Steuerberater oder Wirtschaftsprüfer prüfen lassen, wenn er begründete Zweifel darlegt; die Kosten trägt das Unternehmen, wenn die Abrechnung um mehr als [z. B. 5] % zu seinen Ungunsten abweicht.

§ 6 Pflichten des Tippgebers, Datenschutz
(1) Der Tippgeber übermittelt nur Interessenten, die mit der Weitergabe ihrer Daten und der Kontaktaufnahme durch das Unternehmen einverstanden sind. Er dokumentiert die Einwilligung (z. B. durch E-Mail des Interessenten oder Angabe im Tipp-Formular) und legt sie auf Verlangen vor. Er verwendet die Daten der Interessenten nur zum Zweck der Benennung.
(2) Der Tippgeber macht gegenüber Interessenten keine unwahren oder irreführenden Angaben über das Unternehmen und seine Leistungen, verspricht keine Konditionen und übt keinen Druck aus. Er kontaktiert Interessenten nicht auf Wegen, die ohne deren Einwilligung unzulässig sind (insbesondere keine Werbeanrufe oder Werbe-E-Mails ohne Einwilligung, § 7 UWG).
(3) Der Tippgeber versichert, dass er durch die Benennung keine Pflichten gegenüber dem Interessenten oder gegenüber einem Arbeit- oder Auftraggeber verletzt und keine ihm im Rahmen einer solchen Beziehung anvertrauten vertraulichen Informationen verwendet.
(4) Der Tippgeber verwendet Name, Logo und Werbematerial des Unternehmens nur, wenn und wie das Unternehmen es in Textform freigegeben hat. Er tritt nicht als Partner oder Vertreter des Unternehmens auf.
(5) Das Unternehmen informiert benannte Interessenten bei der ersten Kontaktaufnahme über die Herkunft ihrer Daten nach Art. 14 DSGVO.

§ 7 Keine Exklusivität, kein Wettbewerbsverbot
(1) Der Tippgeber darf auch anderen Unternehmen Interessenten benennen; eine Exklusivität besteht nicht. Das Unternehmen darf weitere Tippgeber einsetzen und Kunden selbst werben.
(2) Ein Wettbewerbsverbot wird nicht vereinbart. Vertrauliche Informationen des Unternehmens, die der Tippgeber erhält, hält er jedoch geheim.

§ 8 Laufzeit, Kündigung, Nachwirkung
(1) Die Vereinbarung beginnt am [Datum] und läuft auf unbestimmte Zeit. Sie kann von beiden Seiten mit einer Frist von [z. B. 1 Monat] zum Monatsende in Textform gekündigt werden; das Recht zur Kündigung aus wichtigem Grund bleibt unberührt.
(2) Tipps, die vor Zugang der Kündigung angenommen wurden, bleiben provisionspflichtig, wenn der Abschluss innerhalb der Schutzfrist nach § 3 Abs. 3 erfolgt. Umsatzabhängige Provisionen für bereits abgeschlossene Verträge werden bis zum Ende des in § 4 Abs. 1 genannten Zeitraums weitergezahlt.
(3) Nach Kündigung darf der Tippgeber nicht mehr auf diese Vereinbarung oder eine Partnerschaft mit dem Unternehmen hinweisen.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieser Vereinbarung bedürfen der Textform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam. An ihre Stelle tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Es gilt deutsches Recht. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]; sonst gilt der gesetzliche Gerichtsstand.
(4) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für das Unternehmen


______________________________
[Vorname Nachname], Tippgeber

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "kooperationsvereinbarung",
    titel: "Kooperationsvereinbarung zwischen Unternehmen",
    kurz: "Vereinbarung für die Zusammenarbeit zweier Unternehmen bei Co-Marketing oder einem gemeinsamen Angebot: Beiträge, Kosten und Erlöse, Marken, Verantwortlichkeiten, keine Gesellschaft, Laufzeit.",
    kategorie: "dienstleistung",
    dateiname: "Kooperationsvereinbarung-Unternehmen",
    wofuer: [
      "Zwei Unternehmen bewerben sich gegenseitig, bündeln Produkte oder bieten gemeinsam ein Paket an",
      "Gemeinsame Aktionen wie Webinare, Events, Newsletter-Tausch, Bundle-Angebote oder Co-Branding",
      "Wenn klar sein soll, wer welche Kosten trägt und wie Erlöse aufgeteilt werden",
      "Wenn ausdrücklich keine GbR entstehen soll und jeder Partner nur für sich haftet",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Ziel der Kooperation",
      "§ 2 Beiträge und Aufgaben der Partner",
      "§ 3 Kosten, Erlöse und Abrechnung",
      "§ 4 Marken, Logos, Nutzungsrechte",
      "§ 5 Verantwortlichkeiten gegenüber Kunden",
      "§ 6 Keine Gesellschaft, keine Vertretung",
      "§ 7 Vertraulichkeit, Datenschutz, Kundendaten",
      "§ 8 Wettbewerb und Kartellrecht",
      "§ 9 Haftung",
      "§ 10 Laufzeit und Kündigung",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Sobald zwei Unternehmen einen gemeinsamen Zweck verfolgen und sich dazu verpflichten, kann nach §§ 705 ff. BGB auch ohne Vertrag eine GbR entstehen – mit gesamtschuldnerischer Haftung. Die Vorlage schließt das ausdrücklich aus und trennt die Beiträge sauber.",
      "Gemeinsame Werbung ist keine gemeinsame Verantwortung: Wer gegenüber dem Kunden Vertragspartner ist, haftet für Lieferung, Gewährleistung und Widerruf. Das muss im Vertrag und auf jeder Kundenseite erkennbar sein.",
      "Kundendaten dürfen nicht einfach zwischen Partnern ausgetauscht werden. Für gemeinsame Aktionen (Gewinnspiel, Webinar-Anmeldung) braucht ihr eine Einwilligung oder eine Vereinbarung über gemeinsame Verantwortlichkeit nach Art. 26 DSGVO.",
      "Absprachen über Preise, Kunden oder Gebiete zwischen Wettbewerbern sind kartellrechtlich verboten (§ 1 GWB). Kooperiert ihr mit einem Konkurrenten, beschränkt die Vereinbarung auf die konkrete Aktion.",
    ],
    faqs: [
      {
        q: "Entsteht durch eine Kooperation automatisch eine GbR?",
        a: "Sie kann entstehen, wenn ihr einen gemeinsamen Zweck mit gemeinsamen Beiträgen verfolgt, etwa ein gemeinsames Produkt unter gemeinsamem Namen verkauft und den Gewinn teilt. Die Vorlage verhindert das, indem jeder Partner seine Leistung im eigenen Namen erbringt, eigene Verträge mit Kunden schließt und keine gemeinsame Kasse existiert.",
      },
      {
        q: "Wie teilen wir Erlöse auf, ohne eine Gesellschaft zu gründen?",
        a: "Über eine Provisions- oder Lizenzlogik: Der Partner, der den Kundenvertrag schließt, zahlt dem anderen einen festen Anteil oder Betrag je Abschluss. Das ist eine gegenseitige Leistungsbeziehung mit Rechnung und Umsatzsteuer, keine Gewinnverteilung. Genau so ist es in der Vorlage angelegt.",
      },
      {
        q: "Darf mein Partner mein Logo überall verwenden?",
        a: "Nur im Rahmen der Kooperation und nach den vereinbarten Vorgaben. Die Vorlage räumt ein einfaches, auf die Kooperation beschränktes Nutzungsrecht ein, verlangt Freigabe für jede Verwendung und endet automatisch mit der Kooperation.",
      },
      {
        q: "Was passiert, wenn ein Kunde Probleme mit der Leistung des Partners hat?",
        a: "Dann richtet sich der Kunde an seinen Vertragspartner, also an den, mit dem er den Vertrag geschlossen hat. Im Innenverhältnis stellt der Partner, der die Leistung schuldet, den anderen frei. Die Vorlage regelt beides und verlangt, dass auf allen Kundenseiten der jeweils verantwortliche Partner genannt wird.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du eine Kooperationsvereinbarung brauchst",
        text: `Eine Kooperationsvereinbarung brauchst du, sobald zwei Unternehmen gemeinsam auftreten, ohne gemeinsam zu werden. Typische Fälle: Ein Shop für Fitnessgeräte und ein Ernährungscoach bieten ein Bundle an. Zwei SaaS-Anbieter empfehlen sich gegenseitig in Newslettern. Eine Agentur und ein Fotograf veranstalten gemeinsame Workshops. Zwei Marken produzieren eine Co-Branding-Edition.

Das Muster klärt, wer was beiträgt, wer welche Kosten trägt, wie Erlöse fließen, wer mit dem Kunden den Vertrag schließt und wie lange die Partner die Logos des anderen nutzen dürfen. Vor allem verhindert es, dass aus der Zusammenarbeit ungewollt eine GbR mit gesamtschuldnerischer Haftung wird. Für gemeinsame Gesellschaften mit gemeinsamer Kasse ist dagegen der Gesellschaftsvertrag das richtige Dokument.`,
      },
      {
        titel: "Was muss in eine Kooperationsvereinbarung?",
        text: `Eine gute Kooperationsvereinbarung ist eine Sammlung gegenseitiger Leistungsversprechen, keine Gesellschaft. Die Vorlage regelt in elf Paragrafen:

- Präambel und § 1 Gegenstand: die konkreten Maßnahmen wie Verlinkung, Bundle, Webinare, Pressemitteilung, mit Maßnahmenplan als Anlage 1
- § 2 Beiträge jedes Partners im eigenen Namen, auf eigene Kosten, mit Ansprechpartnern
- § 3 Kosten und Erlöse: eigene Kosten selbst, gemeinsame Kosten nur nach Freigabe, Erlöse über Provision oder festen Betrag je Bundle, keine gemeinsame Kasse
- § 4 Marken und Logos: einfaches Nutzungsrecht nur für die Kooperation, Freigabe jeder Verwendung, Umgang mit gemeinsam erstellten Inhalten nach Vertragsende
- § 5 Verantwortung gegenüber Kunden: jeder ist Vertragspartner seiner Kunden, Kennzeichnung auf allen Kundenseiten, Freistellung
- § 6 Ausdrücklicher Ausschluss einer Gesellschaft und jeder Vertretung
- § 7 Vertraulichkeit, Kundendaten und gemeinsame Verantwortlichkeit nach Art. 26 DSGVO
- § 8 Wettbewerb und Kartellrecht: keine Preis-, Kunden- oder Gebietsabsprachen
- § 9 Haftung, § 10 Laufzeit und Abwicklung, § 11 Schlussbestimmungen

§ 6 Abs. 3 ist die Rückfallklausel: Sollte ein Gericht doch eine GbR sehen, bleibt im Innenverhältnis jeder für seinen Bereich allein verantwortlich.`,
      },
      {
        titel: "Kooperationsvereinbarung Muster ausfüllen",
        text: `Beschreibe in der Präambel beide Partner in einem Satz und in § 1 die Kooperation mit den konkreten Maßnahmen: Anzahl der Newsletter, Höhe des Gutscheins, Zahl der Webinare, Starttermin. Halte Details im Maßnahmenplan fest und lege ihn als Anlage 1 bei. In § 2 trägst du die Beiträge beider Seiten ein, etwa Landingpage und Versand bei Partner A, Coaching und Bewerbung bei Partner B, dazu die Ansprechpartner und den Abstimmungsrhythmus.

In § 3 legst du den Verteilungsschlüssel für gemeinsame Kosten fest und wählst für Erlöse Variante A (Provision je vermitteltem Abschluss) oder Variante B (fester Betrag je Bundle); trage Abrechnungsrhythmus und Zahlungsziel ein. In § 4 legst du die Freigabefrist für Markenverwendungen fest und entscheidest, wem die Aktionsbezeichnung zusteht. In § 5 Abs. 2 nennst du, wer beim Bundle Vertragspartner des Kunden ist. In § 7 setzt du die Vertraulichkeitsdauer, in § 8 optional die Wettbewerber, mit denen keine gleichartige Kooperation laufen soll, in § 9 die Haftungsgrenze und in § 10 Laufzeit, Kündigungsfrist und Abwicklungsfrist. Die Word-Vorlage ist dafür direkt bearbeitbar.`,
      },
      {
        titel: "Typische Fehler bei Kooperationen zwischen Unternehmen",
        text: `Der größte Fehler ist die unbemerkte GbR. Gemeinsamer Name, gemeinsames Konto, geteilter Gewinn: Dann haften beide Partner für alles, was der andere im Rahmen der Kooperation tut. Die Vorlage vermeidet das, aber nur, wenn ihr im Alltag keine gemeinsame Kasse führt und jeder seine Rechnungen selbst stellt.

Zweiter Fehler: Der Kunde weiß nicht, mit wem er einen Vertrag hat. Bei Bundles muss auf der Bestellseite stehen, wer liefert, wer die Gewährleistung trägt und an wen der Widerruf geht. Dritter Fehler: Kundendaten werden ausgetauscht, weil es praktisch ist. Ohne Einwilligung oder Vereinbarung nach Art. 26 DSGVO ist das ein Datenschutzverstoß.

Weitere Stolperfallen sind Logos, die nach dem Ende der Kooperation weiterlaufen, Preisabsprachen mit einem Wettbewerber, die gegen § 1 GWB verstoßen, mündlich vereinbarte Erlösanteile und Gutscheine, die nach der Trennung niemand mehr einlösen will. § 10 Abs. 3 regelt den letzten Punkt ausdrücklich.`,
      },
      {
        titel: "Rechtliche Grundlagen: GbR-Risiko, DSGVO und Kartellrecht",
        text: `Nach § 705 BGB entsteht eine Gesellschaft bürgerlichen Rechts, sobald sich mehrere Personen verpflichten, einen gemeinsamen Zweck in der durch den Vertrag bestimmten Weise zu fördern. Ein schriftlicher Vertrag ist dafür nicht nötig; es reicht gemeinsames Handeln. Seit der Reform des Personengesellschaftsrechts 2024 haften die Gesellschafter einer GbR nach § 721 BGB persönlich und gesamtschuldnerisch. Deshalb stellt die Vorlage in § 2, § 3 und § 6 klar, dass jeder Partner im eigenen Namen handelt und kein gemeinsames Vermögen entsteht.

Die gegenseitige Nutzung von Marken ist eine Lizenz; § 30 MarkenG erlaubt sie, der Umfang richtet sich nach dem Vertrag. Entscheiden beide Partner gemeinsam über Zweck und Mittel einer Datenverarbeitung, sind sie gemeinsam Verantwortliche nach Art. 26 DSGVO und müssen das in einer Vereinbarung festlegen. § 1 GWB verbietet Vereinbarungen zwischen Unternehmen, die den Wettbewerb beschränken, insbesondere Preis-, Gebiets- und Kundenabsprachen; Kooperationen zwischen Wettbewerbern sind deshalb eng auf die konkrete Maßnahme zu begrenzen. Werbung für die Kooperation unterliegt dem UWG, Preisangaben der Preisangabenverordnung.`,
      },
      {
        titel: "Wann die Kooperationsvereinbarung nicht reicht",
        text: `Wollt ihr ein gemeinsames Produkt unter gemeinsamem Namen verkaufen, Gewinne teilen oder ein gemeinsames Konto führen, ist das eine Gesellschaft; dann brauchst du einen GbR- oder GmbH-Gesellschaftsvertrag und nicht diese Vorlage. Kooperierst du mit einem direkten Wettbewerber, lass die Vereinbarung kartellrechtlich prüfen, besonders bei Absprachen über Preise, Sortimente oder Kunden.

Bei Kooperationen mit Partnern im Ausland, bei gemeinsamen Marken, die angemeldet werden sollen, bei Lizenzierung von Software oder Inhalten über die Kooperation hinaus und bei Kooperationen mit Umsätzen, die für einen Partner existenziell sind, gehört der Vertrag zum Anwalt. Gewinnspiele und gemeinsame Anmeldeseiten brauchen zusätzlich Teilnahmebedingungen und eine Vereinbarung nach Art. 26 DSGVO. GründerX liefert das Muster als Software, nicht als Rechtsberatung.`,
      },
    ],
    seo: {
      title: "Kooperationsvereinbarung Vorlage kostenlos (Word) | GründerX",
      description:
        "Kooperationsvereinbarung zwischen zwei Unternehmen als kostenlose Vorlage: Beiträge, Kosten, Erlöse, Marken, Kundenverantwortung, keine GbR, Laufzeit.",
    },
    stand: "2026-10",
    text: `Kooperationsvereinbarung

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Partner A“ –

und

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Partner B“ –

– gemeinsam „die Partner“ –

Präambel
Partner A [kurze Beschreibung, z. B. „betreibt einen Onlineshop für Fitnessgeräte“]. Partner B [z. B. „bietet Online-Ernährungscoaching an“]. Die Partner möchten ihre Angebote gegenseitig bewerben und ein gemeinsames Angebot für ihre Kunden schaffen, ohne eine gemeinsame Gesellschaft zu gründen. Dies vorausgeschickt vereinbaren sie:

§ 1 Gegenstand und Ziel der Kooperation
(1) Gegenstand der Kooperation ist [genaue Beschreibung, z. B. „die gemeinsame Vermarktung eines Pakets aus [Produkt A] und [Leistung B] unter der Bezeichnung „[Aktionsname]“ sowie die gegenseitige Bewerbung in Newslettern, Social-Media-Kanälen und auf den Websites der Partner“].
(2) Die Kooperation umfasst insbesondere folgende Maßnahmen:
   a) [z. B. gegenseitige Verlinkung und Vorstellung auf den Websites und in je [Anzahl] Newslettern pro Quartal],
   b) [z. B. ein gemeinsames Bundle-Angebot: Kunden, die [Produkt A] kaufen, erhalten einen Gutschein über [Betrag/Prozent] für [Leistung B] und umgekehrt],
   c) [z. B. [Anzahl] gemeinsame Webinare oder Events pro Jahr],
   d) [z. B. gemeinsame Pressemitteilung zum Start am [Datum]].
(3) Die Einzelheiten jeder Maßnahme (Inhalt, Termine, Verantwortliche, Budget) werden in einem Maßnahmenplan (Anlage 1) festgehalten, der in Textform fortgeschrieben wird.
(4) Jeder Partner bleibt in seinem übrigen Geschäft vollständig frei. Eine Pflicht zur Ausweitung der Kooperation besteht nicht.

§ 2 Beiträge und Aufgaben der Partner
(1) Partner A übernimmt: [z. B. Erstellung der Landingpage, Abwicklung der Bestellungen des Bundles, Versand der Produkte, Bereitstellung von [Anzahl] Produktbildern].
(2) Partner B übernimmt: [z. B. Erbringung der Coaching-Leistung gegenüber den Kunden, Erstellung der Webinar-Inhalte, Bewerbung in seinen Kanälen mit mindestens [Anzahl] Beiträgen pro Monat].
(3) Jeder Partner erbringt seine Beiträge im eigenen Namen, mit eigenen Mitteln und auf eigene Kosten, soweit § 3 nichts anderes bestimmt. Er setzt hierfür eigenes Personal oder eigene Dienstleister ein und bleibt für diese verantwortlich.
(4) Die Partner benennen je einen Ansprechpartner: für Partner A [Vorname Nachname, E-Mail], für Partner B [Vorname Nachname, E-Mail]. Die Ansprechpartner stimmen sich [z. B. monatlich] ab und halten Ergebnisse in Textform fest.

§ 3 Kosten, Erlöse und Abrechnung
(1) Jeder Partner trägt die Kosten seiner eigenen Beiträge selbst. Gemeinsame Kosten (z. B. externe Dienstleister, Werbebudget, Veranstaltungsräume) werden nur nach vorheriger Freigabe beider Partner in Textform beauftragt und im Verhältnis [z. B. 50 : 50] getragen. Der Partner, der die Rechnung erhält, berechnet dem anderen dessen Anteil mit Beleg weiter.
(2) Erlöse: Jeder Partner schließt Verträge mit Kunden im eigenen Namen und vereinnahmt die Erlöse aus seinen Verträgen selbst. [Variante A: Für jeden Kunden, der über die Kooperation (Gutscheincode [CODE], Link [URL], Bundle) einen Vertrag mit dem anderen Partner schließt, erhält der vermittelnde Partner eine Vergütung von [z. B. 15] % des Nettoumsatzes des ersten Auftrags bzw. [Betrag] EUR je Abschluss.] [Variante B: Beim Bundle-Angebot rechnet Partner A den Gesamtpreis gegenüber dem Kunden ab und zahlt Partner B für dessen Leistungsanteil einen festen Betrag von [Betrag] EUR netto je verkauftem Bundle.]
(3) Vergütungen nach Absatz 2 werden [monatlich / quartalsweise] bis zum [z. B. 15.] des Folgemonats auf Grundlage einer Aufstellung der betreffenden Abschlüsse abgerechnet und mit Rechnung zuzüglich Umsatzsteuer gezahlt; Zahlungsziel [z. B. 14] Tage. Stornierte, widerrufene oder nicht bezahlte Aufträge werden in der nächsten Abrechnung berichtigt.
(4) Jeder Partner darf die für ihn relevanten Abrechnungsunterlagen des anderen einmal jährlich durch einen zur Verschwiegenheit verpflichteten Steuerberater oder Wirtschaftsprüfer prüfen lassen, wenn er begründete Zweifel darlegt.
(5) Eine gemeinsame Kasse, ein gemeinsames Konto oder gemeinsames Vermögen werden nicht gebildet.

§ 4 Marken, Logos, Nutzungsrechte
(1) Jeder Partner räumt dem anderen für die Dauer dieser Vereinbarung das einfache, nicht übertragbare, unentgeltliche Recht ein, seine Firma, Marken, Logos und die in Anlage 2 bezeichneten Werbematerialien ausschließlich im Rahmen der Kooperationsmaßnahmen nach § 1 zu nutzen. Jede Verwendung außerhalb der Kooperation bedarf gesonderter Zustimmung.
(2) Marken und Logos werden nur in der vom Inhaber freigegebenen Form (Markenrichtlinien in Anlage 2) verwendet. Jede konkrete Verwendung (Anzeige, Landingpage, Pressetext) wird dem Inhaber vor Veröffentlichung zur Freigabe vorgelegt; er antwortet innerhalb von [z. B. 3] Werktagen, sonst gilt die Verwendung als freigegeben. Eine Markenlizenz im Übrigen wird nicht eingeräumt.
(3) Gemeinsam erstellte Inhalte (z. B. Webinar-Aufzeichnungen, Landingpage-Texte, gemeinsame Grafiken) dürfen beide Partner während der Kooperation in ihren Kanälen nutzen. Nach Beendigung darf jeder Partner solche Inhalte weiter nutzen, in denen Marken, Logos und Beiträge des anderen entfernt oder unkenntlich gemacht wurden; im Übrigen ist die Nutzung einzustellen. Rechte an Vorbestehendem (Produkte, Kurse, Software, Texte eines Partners) bleiben bei diesem.
(4) Die Bezeichnung „[Aktionsname]“ für das gemeinsame Angebot [steht Partner A zu / wird von beiden Partnern nur gemeinsam und nur während der Kooperation genutzt; keine Partei meldet sie als Marke an, ohne dass die andere zustimmt].

§ 5 Verantwortlichkeiten gegenüber Kunden
(1) Jeder Partner ist allein Vertragspartner seiner Kunden und allein verantwortlich für seine Produkte und Leistungen, insbesondere für Produktinformationen, Preise, Lieferung, Leistungserbringung, Gewährleistung, Widerruf, Reklamationen, Rechnungsstellung und Kundenservice.
(2) Auf allen Kundenseiten, Bestellstrecken, Angeboten und in der Werbung wird deutlich gemacht, welcher Partner für welches Produkt oder welche Leistung Vertragspartner ist. Bei Bundles nach § 3 Abs. 2 Variante B ist [Partner A] Vertragspartner des Kunden für das Gesamtpaket; Partner B erbringt seine Leistung als Erfüllungsgehilfe von Partner A gegenüber dem Kunden.
(3) Jeder Partner stellt den anderen von Ansprüchen Dritter frei, die auf seinen Produkten, Leistungen, Werbeaussagen oder einer Verletzung seiner Pflichten aus dieser Vereinbarung beruhen, einschließlich angemessener Rechtsverfolgungskosten.
(4) Jeder Partner beachtet in seiner Werbung für die Kooperation das Wettbewerbsrecht (insbesondere Preisangaben, Kennzeichnung von Werbung, Gewinnspielregeln) und hält die Plattformrichtlinien ein.

§ 6 Keine Gesellschaft, keine Vertretung
(1) Die Partner wollen keine Gesellschaft bürgerlichen Rechts oder sonstige Gesellschaft gründen. Es werden keine gemeinsamen Beiträge zu einem gemeinsamen Vermögen geleistet, kein gemeinsamer Gewinn verteilt und keine gemeinsamen Verbindlichkeiten begründet. Jeder Partner handelt im eigenen Namen und auf eigene Rechnung.
(2) Kein Partner ist berechtigt, den anderen zu vertreten, Erklärungen in dessen Namen abzugeben oder Verbindlichkeiten für ihn einzugehen. Die Partner treten nach außen nicht als gemeinsames Unternehmen, Joint Venture oder unter einer gemeinsamen Firma auf.
(3) Sollte ein Gericht die Kooperation dennoch als Gesellschaft einordnen, vereinbaren die Partner bereits jetzt, dass im Innenverhältnis jeder Partner die aus seinem Geschäftsbereich stammenden Verbindlichkeiten allein trägt und den anderen davon freistellt.

§ 7 Vertraulichkeit, Datenschutz, Kundendaten
(1) Die Partner behandeln alle vertraulichen Informationen des jeweils anderen (Kundenzahlen, Umsätze, Konditionen, Pläne, Zugangsdaten) vertraulich und nutzen sie nur für die Kooperation, auch [z. B. 3] Jahre über deren Ende hinaus.
(2) Kundendaten verbleiben bei dem Partner, der sie erhoben hat. Eine Weitergabe an den anderen Partner erfolgt nur, soweit der Kunde eingewilligt hat oder sie zur Erfüllung eines vom Kunden geschlossenen Vertrags erforderlich ist, und nur im dafür nötigen Umfang. Für gemeinsame Maßnahmen, bei denen beide Partner über Zweck und Mittel der Verarbeitung entscheiden (z. B. gemeinsame Anmeldeseite für ein Webinar), schließen die Partner eine Vereinbarung über die gemeinsame Verantwortlichkeit nach Art. 26 DSGVO (Anlage 3) und informieren die Betroffenen darüber.
(3) Werbliche Ansprache der Kunden des anderen Partners (Newsletter, Anrufe) erfolgt ausschließlich über die Kanäle des jeweils anderen Partners oder nach eigener Einwilligung des Kunden.

§ 8 Wettbewerb und Kartellrecht
(1) Die Partner bleiben in ihrer Preisgestaltung, ihrer Kundenauswahl und ihrem Marktverhalten frei. Diese Vereinbarung enthält keine Absprachen über Preise gegenüber Kunden (ausgenommen den Preis des gemeinsamen Bundles nach § 3 Abs. 2 Variante B, den Partner A als Vertragspartner festlegt), über Kunden- oder Gebietsaufteilung oder über die Beschränkung des Wettbewerbs.
(2) Jeder Partner darf während und nach der Kooperation mit Dritten zusammenarbeiten, auch mit Wettbewerbern des anderen. [Optional: Während der Laufzeit führen die Partner keine vergleichbare Kooperation mit einem unmittelbaren Wettbewerber des anderen Partners durch; betroffene Wettbewerber: [Namen].]

§ 9 Haftung
(1) Jeder Partner haftet dem anderen unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
(2) Bei leichter Fahrlässigkeit haftet ein Partner nur bei Verletzung wesentlicher Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren Schaden, höchstens auf [Betrag] EUR je Vertragsjahr.
(3) Ein Ausgleich entgangener Erlöse oder nicht erreichter Reichweiten- oder Umsatzziele ist ausgeschlossen; Zielwerte in Anlage 1 sind unverbindliche Planungsgrößen.

§ 10 Laufzeit und Kündigung
(1) Die Vereinbarung beginnt am [Datum] und läuft [bis zum [Datum] / auf unbestimmte Zeit]. Sie kann von jedem Partner mit einer Frist von [z. B. 3] Monaten zum Monatsende gekündigt werden, erstmals zum [Datum].
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt, insbesondere bei wesentlicher Vertragsverletzung trotz Abmahnung, bei rufschädigendem Verhalten, bei Insolvenz oder bei einem Kontrollwechsel beim anderen Partner.
(3) Kündigungen bedürfen der Schriftform. Nach Beendigung stellen die Partner innerhalb von [z. B. 30] Tagen jede gemeinsame Werbung ein, entfernen Marken und Logos des anderen aus ihren Kanälen und wickeln begonnene Kundenaufträge und ausstehende Vergütungen nach § 3 ordnungsgemäß ab. Gutscheine, die vor Beendigung ausgegeben wurden, werden bis zu ihrem Ablaufdatum eingelöst.

§ 11 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieser Vereinbarung bedürfen der Textform; das gilt auch für diese Klausel. Der Maßnahmenplan (Anlage 1) kann von den Ansprechpartnern in Textform fortgeschrieben werden. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam. An ihre Stelle tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Es gilt deutsches Recht. Gerichtsstand ist, soweit beide Partner Kaufleute sind, [Ort].
(4) Anlagen: Anlage 1 Maßnahmenplan, Anlage 2 Marken- und Werbematerialien mit Richtlinien, [Anlage 3 Vereinbarung nach Art. 26 DSGVO].
(5) Jeder Partner erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für Partner A


______________________________
[Vorname Nachname], für Partner B

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "subunternehmervertrag",
    titel: "Subunternehmervertrag",
    kurz: "Vertrag mit einem Subunternehmer für ein Projekt oder Gewerk: Leistung, Termine, Vergütung, Abnahme, Haftung, Weitergabe von Kundenpflichten, Geheimhaltung, Kundenschutz.",
    kategorie: "dienstleistung",
    dateiname: "Subunternehmervertrag",
    wofuer: [
      "Du hast einen Auftrag von einem Kunden und gibst einen Teil davon an einen Nachunternehmer weiter",
      "Du arbeitest selbst als Subunternehmer und willst Termine, Abnahme und Zahlung abgesichert haben",
      "IT-, Handwerks-, Bau-, Agentur- oder Logistikprojekte mit Hauptauftrag und Nachunternehmer",
      "Wenn die Pflichten aus dem Kundenvertrag sauber an den Subunternehmer durchgereicht und der Kunde vor Abwerbung geschützt werden sollen",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand und Bezug zum Hauptauftrag",
      "§ 2 Leistungsumfang, Ausführung, Weitergabe von Kundenpflichten",
      "§ 3 Termine, Verzug",
      "§ 4 Vergütung, Abschlagszahlungen, Zahlung",
      "§ 5 Abnahme",
      "§ 6 Mängelhaftung",
      "§ 7 Haftung, Versicherung, Freistellung",
      "§ 8 Personal, Mindestlohn, Sozialabgaben, Nachweise",
      "§ 9 Geheimhaltung, Datenschutz, Kundenschutz",
      "§ 10 Nutzungsrechte",
      "§ 11 Kündigung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Du haftest gegenüber deinem Kunden für den Subunternehmer wie für dich selbst (§ 278 BGB). Deshalb müssen Fristen, Qualität und Gewährleistung im Subunternehmervertrag mindestens so streng sein wie im Hauptauftrag – die Vorlage reicht sie durch.",
      "Nach § 13 MiLoG haftest du wie ein Bürge dafür, dass dein Subunternehmer seinen Leuten den Mindestlohn zahlt, auch ohne eigenes Verschulden. Lass dir die Einhaltung zusichern und bei größeren Aufträgen Nachweise geben.",
      "Bei Bauleistungen gilt die Bauabzugsteuer: Ohne Freistellungsbescheinigung des Subunternehmers musst du 15 % der Rechnung einbehalten und ans Finanzamt abführen (§ 48 EStG). Außerdem kann die Umsatzsteuerschuld auf dich übergehen (§ 13b UStG).",
      "Ein Kundenschutz muss zeitlich und sachlich begrenzt sein, sonst ist er unwirksam. Üblich sind 12 bis 24 Monate nach Projektende, beschränkt auf die Kunden, mit denen der Subunternehmer im Projekt Kontakt hatte.",
      "Setzt der Subunternehmer nur sich selbst ein und arbeitet er nach deinen Weisungen in deinem Team, droht Scheinselbstständigkeit oder illegale Arbeitnehmerüberlassung. Die Vorlage verlangt eigenverantwortliche Ausführung ohne Eingliederung.",
    ],
    faqs: [
      {
        q: "Muss ich meinem Kunden sagen, dass ich einen Subunternehmer einsetze?",
        a: "Das hängt vom Hauptvertrag ab. Viele Kundenverträge verlangen eine Zustimmung oder verbieten den Einsatz. Prüfe das vorher, denn ein Verstoß kann eine Kündigung aus wichtigem Grund rechtfertigen. Gegenüber dem Kunden bleibst du in jedem Fall allein verantwortlich.",
      },
      {
        q: "Wann muss ich den Subunternehmer bezahlen, wenn mein Kunde noch nicht gezahlt hat?",
        a: "Grundsätzlich nach den Fristen des Subunternehmervertrags, unabhängig von der Zahlung deines Kunden. Eine Klausel „Zahlung erst, wenn der Kunde zahlt“ (Pay-when-paid) ist in AGB unwirksam und auch individuell riskant. Die Vorlage koppelt die Fälligkeit an die Abnahme deiner Teilleistung, nicht an die Kundenzahlung.",
      },
      {
        q: "Wie schütze ich mich davor, dass der Subunternehmer meinen Kunden direkt übernimmt?",
        a: "Mit einer Kundenschutzklausel: Der Subunternehmer darf die im Projekt kennengelernten Kunden für eine bestimmte Zeit nicht direkt oder über Dritte bedienen oder abwerben, sonst zahlt er eine Vertragsstrafe. Die Vorlage sieht das mit 12 bis 24 Monaten vor; eine angemessene Dauer ist wichtig für die Wirksamkeit.",
      },
      {
        q: "Wer nimmt die Leistung des Subunternehmers ab, mein Kunde oder ich?",
        a: "Du als Hauptunternehmer nimmst die Leistung deines Subunternehmers ab, unabhängig von der Abnahme durch den Kunden. Die Vorlage sieht eine eigene Abnahme mit Protokoll vor und lässt zu, dass Mängelrügen des Kunden an den Subunternehmer weitergereicht werden, soweit sie seine Leistung betreffen.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Subunternehmervertrag brauchst",
        text: `Einen Subunternehmervertrag brauchst du, sobald du einen Auftrag angenommen hast und einen Teil davon an ein anderes Unternehmen weitergibst. Typische Fälle: Eine Agentur hat eine Website verkauft und lässt die Programmierung von einem Entwicklerstudio machen. Ein Handwerksbetrieb übernimmt eine Sanierung und vergibt die Elektroinstallation. Ein IT-Haus führt eine Software ein und holt einen Spezialisten für die Schnittstelle. Ein Logistiker gibt Teilstrecken an einen Frachtführer.

Als Subunternehmer nutzt du das Muster, um Termine, Abnahme, Zahlung unabhängig vom Kunden und Haftungsgrenzen abzusichern. Die Vorlage ist als Werkvertrag angelegt, weil der Nachunternehmer in der Regel ein abgrenzbares Gewerk oder Teilprojekt schuldet, und reicht die Pflichten aus dem Hauptauftrag an ihn weiter.`,
      },
      {
        titel: "Was muss in einen Subunternehmervertrag?",
        text: `Der Subunternehmervertrag muss zwei Verträge zusammenhalten: den mit deinem Kunden und den mit deinem Nachunternehmer. Die Vorlage regelt in zwölf Paragrafen:

- § 1 Bezug zum Hauptauftrag, Beschreibung des Teilgewerks, maßgebliche Teile des Kundenvertrags als Anlage 1, keine Vertragsbeziehung zwischen Subunternehmer und Kunde
- § 2 Fachgerechte Ausführung, Weitergabe der Kundenpflichten, Eigenverantwortung ohne Eingliederung, Bedenkenanzeige, keine Direktverhandlung mit dem Kunden
- § 3 Verbindliche Termine, Behinderungsanzeige, gedeckelte Vertragsstrafe, Anpassung bei Verzögerung des Hauptauftrags
- § 4 Vergütung als Pauschale, Einheitspreise oder Aufwand, Abschlagszahlungen, Sicherheitseinbehalt, Fälligkeit unabhängig von der Kundenzahlung, Bauabzugsteuer und § 13b UStG bei Bauleistungen
- § 5 Eigene Abnahme durch den Hauptunternehmer, fiktive Abnahme, Teilabnahmen
- § 6 Mängelhaftung mit Weiterleitung von Kundenrügen und Verjährung, die an den Hauptauftrag gekoppelt ist
- § 7 Freistellung, Haftungsgrenze, Betriebshaftpflicht
- § 8 Personal, Mindestlohn, Sozialabgaben, Nachweise, Arbeitsschutz
- § 9 Geheimhaltung, Auftragsverarbeitung, Kundenschutz mit Vertragsstrafe
- § 10 Nutzungsrechte mindestens im Umfang des Hauptauftrags
- § 11 Kündigung nach § 648 und § 648a BGB sowie bei Wegfall des Hauptauftrags
- § 12 Schlussbestimmungen, optional VOB/B

Anlage 1 ist das Herzstück: Was der Subunternehmer nicht kennt, kann er nicht einhalten.`,
      },
      {
        titel: "Subunternehmervertrag Muster ausfüllen",
        text: `Trage Hauptunternehmer und Subunternehmer ein und beschreibe in § 1 den Hauptauftrag und das weitergegebene Gewerk so genau wie möglich, bei Bauleistungen mit Positionen des Leistungsverzeichnisses. Stelle aus dem Kundenvertrag die relevanten Teile (Leistungsbeschreibung, Termine, Qualität, Sicherheit, Gewährleistungsfrist, Nutzungsrechte) als Anlage 1 zusammen, ohne deine Kalkulation offenzulegen. Lege das Angebot des Subunternehmers als Anlage 2 bei.

In § 3 setzt du Beginn, Meilensteine, Fertigstellung, Vertragsstrafe und die Schwelle, ab der über Mehrkosten verhandelt wird. In § 4 wählst du Variante A, B oder C, legst Abschlagsrhythmus, Sicherheitseinbehalt und Zahlungsziel fest und behältst bei Bauleistungen die Sätze zu § 13b UStG und § 48b EStG. In § 5 setzt du die Abnahmefrist, in § 6 die Verjährungsfrist mit Kopplung an den Hauptauftrag, in § 7 Haftungsgrenze und Deckungssummen. In § 8 trägst du den Rhythmus für Nachweise und die Leitung vor Ort ein, in § 9 Dauer des Kundenschutzes und Vertragsstrafe. Entscheide in § 12, ob die VOB/B vereinbart wird. Die Vorlage gibt es kostenlos als Word und PDF.`,
      },
      {
        titel: "Typische Fehler beim Einsatz von Subunternehmern",
        text: `Der häufigste Fehler ist die Lücke zwischen Hauptauftrag und Subunternehmervertrag: Dem Kunden schuldest du fünf Jahre Gewährleistung, vom Subunternehmer bekommst du zwei. Oder der Kunde hat eine Vertragsstrafe, der Subunternehmer nicht. § 6 Abs. 4 und § 7 Abs. 1 der Vorlage koppeln beides, aber nur mit einer vollständigen Anlage 1.

Zweiter Fehler: Zahlung erst, wenn der Kunde zahlt. Solche Pay-when-paid-Klauseln sind in AGB unwirksam und individuell riskant; die Vorlage koppelt die Fälligkeit an die eigene Abnahme. Dritter Fehler: Der Subunternehmer arbeitet allein, nach deinen Weisungen, in deinem Team. Das ist Scheinselbstständigkeit oder verdeckte Arbeitnehmerüberlassung, und beides trifft dich als Auftraggeber.

Weitere Stolperfallen sind fehlende Nachweise zu Mindestlohn und Sozialabgaben, für die du nach § 13 MiLoG wie ein Bürge haftest, die vergessene Freistellungsbescheinigung bei Bauleistungen, ein Kundenschutz ohne zeitliche Grenze, der unwirksam ist, und der Subunternehmer, der Änderungen direkt mit dem Kunden verhandelt.`,
      },
      {
        titel: "Rechtliche Grundlagen: § 278 BGB, MiLoG, Bauabzugsteuer",
        text: `Gegenüber deinem Kunden haftest du für den Subunternehmer wie für dich selbst, weil er dein Erfüllungsgehilfe nach § 278 BGB ist. Der Subunternehmervertrag ist ein Werkvertrag nach den §§ 631 ff. BGB mit Abnahme nach § 640 BGB, Mängelrechten nach § 634 BGB und Verjährung nach § 634a BGB; bei Bauleistungen gelten zusätzlich die §§ 650a ff. BGB und, wenn vereinbart, die VOB/B. § 648 BGB erlaubt dir die freie Kündigung gegen Vergütung abzüglich ersparter Aufwendungen.

Nach § 13 MiLoG haftet der Auftraggeber für den Mindestlohn der Beschäftigten seines Subunternehmers wie ein Bürge, der auf die Einrede der Vorausklage verzichtet hat; § 14 AEntG regelt dasselbe für Branchenmindestlöhne, § 28e SGB IV für Sozialversicherungsbeiträge bei Bauleistungen. Bei Bauleistungen muss der Leistungsempfänger nach § 48 EStG 15 Prozent der Rechnung einbehalten, wenn keine Freistellungsbescheinigung nach § 48b EStG vorliegt, und nach § 13b UStG geht die Umsatzsteuerschuld auf ihn über. Für Datenverarbeitung gilt Art. 28 DSGVO. Kundenschutzklauseln müssen nach der Rechtsprechung zeitlich, räumlich und sachlich begrenzt sein.`,
      },
      {
        titel: "Wann der Subunternehmervertrag nicht reicht",
        text: `Bei Bauvorhaben mit öffentlichem Auftraggeber, bei Vergaben nach VOB/A, bei Nachunternehmerketten über mehrere Stufen oder bei Aufträgen, deren Vertragsstrafen und Gewährleistungsfristen aus dem Hauptauftrag deine Existenz berühren, lass den Vertrag anwaltlich prüfen. Dasselbe gilt für Subunternehmer aus dem Ausland, weil dann Entsenderecht, Sozialversicherung und Steuer anders laufen.

Soll der Subunternehmer Personal in dein Team stellen, das nach deinen Weisungen arbeitet, ist das Arbeitnehmerüberlassung und braucht eine Erlaubnis nach dem AÜG; der Werkvertrag wäre dann nur Fassade. Für wiederkehrende Beauftragung desselben Nachunternehmers nimm den Rahmenvertrag mit Einzelaufträgen. Bei Streit über Mängel, die der Kunde rügt und der Subunternehmer bestreitet, hilft ein selbstständiges Beweisverfahren, das ein Anwalt einleitet. GründerX stellt das Muster als Software bereit und ersetzt keine Rechtsberatung.`,
      },
    ],
    seo: {
      title: "Subunternehmervertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Subunternehmervertrag als kostenlose Vorlage: Leistung, Termine, Vergütung, Abnahme, Haftung, Mindestlohn, Kundenpflichten, Geheimhaltung, Kundenschutz.",
    },
    stand: "2026-10",
    text: `Subunternehmervertrag

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Hauptunternehmer“ –

und

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Subunternehmer“ –

– gemeinsam „die Parteien“ –

§ 1 Vertragsgegenstand und Bezug zum Hauptauftrag
(1) Der Hauptunternehmer ist von [Kunde / „dem Kunden“] mit [Beschreibung des Hauptauftrags, z. B. „der Entwicklung und Einführung einer Warenwirtschaftssoftware“ / „der Sanierung des Bürogebäudes [Adresse]“] beauftragt („Hauptauftrag“).
(2) Der Hauptunternehmer beauftragt den Subunternehmer mit folgendem Teil der Leistungen aus dem Hauptauftrag: [genaue Beschreibung des Gewerks/Teilprojekts, z. B. „Entwicklung der Schnittstelle zum Kassensystem einschließlich Dokumentation und Tests“ / „die Elektroinstallation gemäß Leistungsverzeichnis Positionen 3.1 bis 3.8“].
(3) Die für die Leistung des Subunternehmers maßgeblichen Teile des Hauptauftrags (Leistungsbeschreibung, Spezifikationen, Qualitätsanforderungen, Terminplan, Sicherheitsvorgaben) sind dem Subunternehmer als Anlage 1 übergeben worden und Bestandteil dieses Vertrags. Vertragliche Beziehungen zwischen dem Subunternehmer und dem Kunden entstehen nicht.
(4) Rangfolge bei Widersprüchen: dieser Vertrag, Anlage 1, das Angebot des Subunternehmers vom [Datum] (Anlage 2).

§ 2 Leistungsumfang, Ausführung, Weitergabe von Kundenpflichten
(1) Der Subunternehmer erbringt die Leistung vollständig, fachgerecht, nach dem Stand der Technik und den anerkannten Regeln seines Fachs sowie in der in Anlage 1 beschriebenen Qualität. Er hält alle Anforderungen ein, die der Hauptunternehmer gegenüber dem Kunden für diesen Leistungsteil einzuhalten hat, soweit sie ihm in Anlage 1 bekannt gemacht wurden (Weitergabe der Kundenpflichten).
(2) Der Subunternehmer führt die Leistung eigenverantwortlich und mit eigenem, fachlich geeignetem Personal aus. Er ist nicht in den Betrieb des Hauptunternehmers oder des Kunden eingegliedert und unterliegt bei Zeit, Ort und Art der Ausführung keinen Weisungen, soweit nicht die Koordination auf der Baustelle bzw. im Projekt dies erfordert. Eine Überlassung von Arbeitnehmern findet nicht statt.
(3) Der Subunternehmer darf Leistungen nur mit Zustimmung des Hauptunternehmers in Textform an weitere Nachunternehmer vergeben und verpflichtet diese entsprechend diesem Vertrag.
(4) Der Subunternehmer prüft die ihm übergebenen Unterlagen, Vorgaben und Vorleistungen anderer auf Eignung und meldet Bedenken unverzüglich in Textform an. Er nimmt an den vom Hauptunternehmer anberaumten Koordinationsterminen teil und berichtet [wöchentlich / zu den Meilensteinen] über den Stand.
(5) Der Subunternehmer tritt gegenüber dem Kunden nicht als selbstständiger Vertragspartner auf, gibt keine Erklärungen im Namen des Hauptunternehmers ab und verhandelt keine Änderungen direkt mit dem Kunden. Änderungs- oder Zusatzwünsche des Kunden leitet er an den Hauptunternehmer weiter.

§ 3 Termine, Verzug
(1) Beginn der Leistung: [Datum]. Zwischentermine: [Meilenstein 1 bis [Datum]; Meilenstein 2 bis [Datum]]. Fertigstellung und Bereitstellung zur Abnahme: bis zum [Datum]. Die Termine sind verbindlich.
(2) Behinderungen zeigt der Subunternehmer unverzüglich in Textform an. Termine verschieben sich nur, soweit die Behinderung vom Hauptunternehmer oder vom Kunden zu vertreten ist oder auf höherer Gewalt beruht, um die Dauer der Behinderung zuzüglich einer angemessenen Wiederanlaufzeit.
(3) Überschreitet der Subunternehmer einen verbindlichen Termin aus Gründen, die er zu vertreten hat, zahlt er eine Vertragsstrafe von [z. B. 0,2] % der Nettoauftragssumme je Werktag, insgesamt höchstens [z. B. 5] % der Nettoauftragssumme. Die Vertragsstrafe wird auf Schadensersatzansprüche angerechnet; der Vorbehalt der Vertragsstrafe kann bis zur Schlusszahlung erklärt werden.
(4) Verzögert sich der Hauptauftrag insgesamt aus Gründen, die der Subunternehmer nicht zu vertreten hat, kann der Hauptunternehmer die Termine durch Erklärung in Textform anpassen; führt dies zu einer Verschiebung um mehr als [z. B. 8] Wochen, verhandeln die Parteien über Mehrkosten des Subunternehmers.

§ 4 Vergütung, Abschlagszahlungen, Zahlung
(1) Die Vergütung beträgt [Variante A: pauschal [Betrag] EUR netto für die gesamte Leistung nach § 1 Abs. 2] [Variante B: nach Einheitspreisen gemäß Anlage 2, Abrechnung nach Aufmaß/Nachweis; voraussichtliche Auftragssumme [Betrag] EUR netto] [Variante C: [Betrag] EUR je Stunde/Tag nach Aufwand, Budget [Betrag] EUR, Überschreitung nur nach Freigabe in Textform], jeweils zuzüglich gesetzlicher Umsatzsteuer. [Bei Bauleistungen: Soweit § 13b UStG anwendbar ist, schuldet der Hauptunternehmer die Umsatzsteuer; der Subunternehmer stellt netto mit entsprechendem Hinweis in Rechnung.]
(2) Mit der Vergütung sind alle Leistungen nach § 1 und § 2 einschließlich Nebenleistungen (Anfahrt, Werkzeuge, Verbrauchsmaterial, Dokumentation, Koordinationstermine) abgegolten. Zusatzleistungen werden nur vergütet, wenn sie vor Ausführung vom Hauptunternehmer in Textform beauftragt wurden.
(3) Abschlagszahlungen: Der Subunternehmer kann [monatlich / je Meilenstein] Abschlagsrechnungen über nachweislich erbrachte und vertragsgemäße Leistungen stellen. Die Schlussrechnung wird nach Abnahme gestellt. [Optional: Von jeder Abschlagszahlung wird ein Sicherheitseinbehalt von [z. B. 5] % einbehalten, der nach mangelfreier Abnahme bzw. gegen Bürgschaft ausgezahlt wird.]
(4) Rechnungen sind innerhalb von [z. B. 30] Tagen nach Zugang und, bei der Schlussrechnung, nach Abnahme zahlbar. Die Fälligkeit ist nicht davon abhängig, ob der Kunde den Hauptunternehmer bezahlt hat.
(5) [Bei Bauleistungen: Der Subunternehmer legt vor der ersten Zahlung eine gültige Freistellungsbescheinigung nach § 48b EStG vor. Liegt sie nicht vor, behält der Hauptunternehmer 15 % des Rechnungsbetrags als Bauabzugsteuer ein und führt sie ab.]
(6) Bei Zahlungsverzug gelten Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz und die Pauschale nach § 288 Abs. 5 BGB.

§ 5 Abnahme
(1) Nach Fertigstellung zeigt der Subunternehmer die Abnahmereife in Textform an. Der Hauptunternehmer nimmt die Leistung innerhalb von [z. B. 10] Werktagen förmlich ab; über die Abnahme wird ein Protokoll erstellt, in dem festgestellte Mängel und Fristen zu deren Beseitigung festgehalten werden. Wegen unwesentlicher Mängel darf die Abnahme nicht verweigert werden.
(2) Erklärt sich der Hauptunternehmer innerhalb der Frist nicht und benennt er keinen Mangel, gilt die Leistung als abgenommen (§ 640 Abs. 2 BGB); der Subunternehmer weist in der Anzeige darauf hin.
(3) Die Abnahme durch den Kunden gegenüber dem Hauptunternehmer ersetzt die Abnahme nach Absatz 1 nicht und ist für sie nicht Voraussetzung. Verweigert der Kunde die Abnahme wegen Mängeln, die der Leistung des Subunternehmers zuzurechnen sind, kann der Hauptunternehmer die Abnahme insoweit ebenfalls verweigern.
(4) Teilabnahmen erfolgen für in sich abgeschlossene Leistungsteile, soweit in Anlage 1 vorgesehen.

§ 6 Mängelhaftung
(1) Der Subunternehmer gewährleistet, dass seine Leistung bei Abnahme der vereinbarten Beschaffenheit entspricht, den anerkannten Regeln der Technik genügt und frei von Rechten Dritter ist.
(2) Bei Mängeln kann der Hauptunternehmer Nacherfüllung verlangen; der Subunternehmer beseitigt angezeigte Mängel innerhalb der im Protokoll genannten oder einer sonst angemessenen Frist, bei betriebsverhindernden Mängeln unverzüglich. Nach fruchtlosem Fristablauf kann der Hauptunternehmer den Mangel auf Kosten des Subunternehmers selbst oder durch Dritte beseitigen lassen, mindern oder bei erheblichen Mängeln zurücktreten; Schadensersatz nach § 7.
(3) Mängelrügen des Kunden, die die Leistung des Subunternehmers betreffen, leitet der Hauptunternehmer an diesen weiter; der Subunternehmer behandelt sie wie eigene Mängelrügen des Hauptunternehmers.
(4) Mängelansprüche verjähren in [z. B. 2 Jahren / bei Bauwerken 5 Jahren] ab Abnahme, mindestens jedoch so lange, wie der Hauptunternehmer dem Kunden für diesen Leistungsteil nach dem Hauptauftrag haftet (längstens [z. B. 5] Jahre plus 3 Monate); die Frist des Hauptauftrags ist in Anlage 1 angegeben.

§ 7 Haftung, Versicherung, Freistellung
(1) Der Subunternehmer haftet nach den gesetzlichen Vorschriften für Schäden, die er, seine Mitarbeiter oder seine Nachunternehmer verursachen. Er stellt den Hauptunternehmer von allen Ansprüchen des Kunden und Dritter frei, die auf einer mangelhaften oder verspäteten Leistung des Subunternehmers oder auf einem Verstoß gegen diesen Vertrag beruhen, einschließlich Vertragsstrafen, die der Hauptunternehmer deshalb dem Kunden schuldet, soweit sie dem Subunternehmer bei Vertragsschluss aus Anlage 1 bekannt waren.
(2) Bei leichter Fahrlässigkeit ist die Haftung des Subunternehmers für Vermögensschäden, die nicht Mangelbeseitigungskosten sind, auf [Betrag, z. B. das Zweifache der Nettoauftragssumme] EUR begrenzt; dies gilt nicht für Schäden an Leben, Körper und Gesundheit, für Ansprüche aus Absatz 1, soweit sie auf Ansprüchen des Kunden beruhen, und nicht für Garantien.
(3) Der Subunternehmer unterhält eine Betriebshaftpflichtversicherung mit Deckungssummen von mindestens [Betrag] EUR für Personen- und [Betrag] EUR für Sach- und Vermögensschäden und weist dies vor Leistungsbeginn und auf Verlangen nach.

§ 8 Personal, Mindestlohn, Sozialabgaben, Nachweise
(1) Der Subunternehmer setzt nur Personal ein, das ordnungsgemäß angemeldet ist, über die erforderlichen Qualifikationen und, soweit nötig, Arbeitserlaubnisse verfügt. Er zahlt seinen Beschäftigten mindestens den gesetzlichen Mindestlohn und etwaige für ihn geltende Branchenmindestlöhne und erfüllt alle Pflichten zur Abführung von Steuern und Sozialversicherungsbeiträgen. Er stellt den Hauptunternehmer von einer Haftung nach § 13 MiLoG, § 14 AEntG und § 28e SGB IV frei.
(2) Der Subunternehmer legt vor Leistungsbeginn und danach auf Verlangen, höchstens [z. B. quartalsweise], vor: Gewerbeanmeldung bzw. Handelsregisterauszug, Unbedenklichkeitsbescheinigung der Krankenkasse bzw. der zuständigen Einzugsstelle, Unbedenklichkeitsbescheinigung des Finanzamts, [bei Bauleistungen: Freistellungsbescheinigung nach § 48b EStG, Unbedenklichkeitsbescheinigung der Berufsgenossenschaft bzw. der SOKA-BAU, soweit einschlägig], Nachweis der Haftpflichtversicherung.
(3) Der Subunternehmer hält Arbeitsschutz- und Sicherheitsvorschriften ein, unterweist sein Personal und befolgt die Sicherheitsvorgaben des Kunden am Einsatzort (Anlage 1). Er benennt eine verantwortliche Leitung vor Ort: [Vorname Nachname, Telefon].
(4) Verstöße gegen Absatz 1 oder 2 berechtigen den Hauptunternehmer nach Abmahnung mit Fristsetzung zur außerordentlichen Kündigung.

§ 9 Geheimhaltung, Datenschutz, Kundenschutz
(1) Der Subunternehmer behandelt alle Informationen über den Hauptunternehmer, den Kunden, den Hauptauftrag, Preise, Kalkulationen, technische Unterlagen und Betriebsinterna streng vertraulich und verwendet sie nur zur Erfüllung dieses Vertrags, auch [z. B. 3] Jahre über das Vertragsende hinaus. Er verpflichtet sein Personal und seine Nachunternehmer entsprechend. Übliche Ausnahmen (öffentlich bekannt, rechtmäßig vorbekannt, gesetzliche Offenlegungspflicht) gelten.
(2) Soweit der Subunternehmer personenbezogene Daten des Kunden oder des Hauptunternehmers verarbeitet, schließen die Parteien einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO (Anlage 3), und der Subunternehmer erfüllt die vom Hauptunternehmer gegenüber dem Kunden übernommenen Datenschutzpflichten, soweit sie seinen Leistungsteil betreffen.
(3) Kundenschutz: Der Subunternehmer wird für die Dauer dieses Vertrags und für [z. B. 18] Monate nach dessen Beendigung ohne Zustimmung des Hauptunternehmers in Textform weder unmittelbar noch über Dritte für den Kunden oder mit ihm verbundene Unternehmen Leistungen erbringen, die Gegenstand des Hauptauftrags oder diesem gleichartig sind, noch den Kunden hierfür ansprechen oder Mitarbeiter des Hauptunternehmers abwerben. Dies gilt nur für Kunden und Personen, mit denen der Subunternehmer im Rahmen dieses Vertrags in Kontakt gekommen ist.
(4) Für jeden schuldhaften Verstoß gegen Absatz 1 oder 3 zahlt der Subunternehmer eine Vertragsstrafe von [Betrag, z. B. 10.000] EUR; bei Dauerverstößen gilt jeder angefangene Monat als eigener Verstoß. Weitergehender Schadensersatz bleibt vorbehalten, die Vertragsstrafe wird angerechnet.
(5) Der Subunternehmer darf den Kunden und das Projekt nur mit Zustimmung des Hauptunternehmers in Textform als Referenz nennen.

§ 10 Nutzungsrechte
(1) An allen Arbeitsergebnissen, die der Subunternehmer im Rahmen dieses Vertrags erstellt (Pläne, Dokumentationen, Software, Texte, Designs, Berechnungen), räumt er dem Hauptunternehmer mit Entstehung das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte, übertragbare und unterlizenzierbare Nutzungsrecht ein, mindestens in dem Umfang, den der Hauptunternehmer dem Kunden nach dem Hauptauftrag einräumen muss (Anlage 1). Die Rechtseinräumung steht unter der auflösenden Bedingung der Nichtzahlung der Vergütung.
(2) Vorbestehende Werkzeuge, Bibliotheken und Standardkomponenten des Subunternehmers bleiben sein Eigentum; der Hauptunternehmer und der Kunde erhalten daran ein einfaches, unbeschränktes Nutzungsrecht, soweit es zur Nutzung der Arbeitsergebnisse erforderlich ist. Open-Source-Komponenten werden mit Lizenzangabe dokumentiert und nur eingesetzt, soweit ihre Lizenz mit der Nutzung nach Anlage 1 vereinbar ist.

§ 11 Kündigung
(1) Der Hauptunternehmer kann den Vertrag jederzeit kündigen (§ 648 BGB). Der Subunternehmer erhält dann die vereinbarte Vergütung abzüglich ersparter Aufwendungen und anderweitigen Erwerbs; die bis dahin erbrachte Leistung wird abgenommen und abgerechnet.
(2) Wird der Hauptauftrag vom Kunden gekündigt oder entfällt er aus Gründen, die der Hauptunternehmer nicht zu vertreten hat, kann der Hauptunternehmer diesen Vertrag mit sofortiger Wirkung kündigen; der Subunternehmer erhält die Vergütung für die bis dahin erbrachten, vertragsgemäßen Leistungen sowie Ersatz nachgewiesener, unvermeidbarer Kosten aus bereits eingegangenen Verpflichtungen, nicht aber entgangenen Gewinn.
(3) Beide Parteien können aus wichtigem Grund kündigen (§ 648a BGB), insbesondere bei nachhaltiger Verletzung wesentlicher Pflichten trotz Abmahnung, bei Verstößen gegen § 8 oder § 9, bei Zahlungsverzug mit zwei Abschlagsrechnungen oder bei Insolvenz einer Partei.
(4) Kündigungen bedürfen der Schriftform. Nach Kündigung übergibt der Subunternehmer unverzüglich alle Arbeitsergebnisse, Unterlagen und Zugänge und räumt den Einsatzort.

§ 12 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An ihre Stelle tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt deutsches Recht. [Bei Bauleistungen optional: Die VOB/B in der bei Vertragsschluss geltenden Fassung ist als Ganzes vereinbart und dem Subunternehmer bekannt; bei Widersprüchen gehen die Regelungen dieses Vertrags vor.] Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(4) Anlagen: Anlage 1 Auszug Hauptauftrag (Leistungsbeschreibung, Termine, Qualitäts- und Sicherheitsvorgaben, Gewährleistungsfrist, Nutzungsrechte), Anlage 2 Angebot des Subunternehmers, [Anlage 3 Auftragsverarbeitungsvertrag].
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Hauptunternehmer


______________________________
[Vorname Nachname], für den Subunternehmer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "virtuelle-assistenz-vertrag",
    titel: "Vertrag für Virtuelle Assistenz (VA)",
    kurz: "Vertrag zwischen Auftraggeber und virtueller Assistenz: Aufgabenkatalog, Stundenkontingent, Tools und Zugänge, Datenschutz mit AVV-Hinweis, Vergütung, Kündigung.",
    kategorie: "dienstleistung",
    dateiname: "Virtuelle-Assistenz-Vertrag",
    wofuer: [
      "Du gibst als Gründer Backoffice, E-Mails, Terminplanung, Social Media oder Recherche an eine VA ab",
      "Du arbeitest selbst als virtuelle Assistenz und willst Stundenpakete, Zugänge und Haftung sauber regeln",
      "Monatliches Stundenkontingent mit Abrechnung nach Zeiterfassung oder festes Paket",
      "Wenn die VA mit Kundendaten, Postfächern und Konten arbeitet und Datenschutz und Zugangsschutz geregelt sein müssen",
    ],
    enthaelt: [
      "§ 1 Leistungen und Aufgabenkatalog",
      "§ 2 Selbstständigkeit, Weisungsfreiheit, Arbeitsweise",
      "§ 3 Stundenkontingent, Erreichbarkeit, Zeiterfassung",
      "§ 4 Tools, Zugänge, Sicherheit",
      "§ 5 Datenschutz und Auftragsverarbeitung",
      "§ 6 Vergütung und Abrechnung",
      "§ 7 Vertraulichkeit",
      "§ 8 Haftung",
      "§ 9 Laufzeit, Kündigung, Übergabe",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Eine VA, die Kunden-E-Mails beantwortet, CRM pflegt oder Rechnungen schreibt, verarbeitet personenbezogene Daten in deinem Auftrag. Dann ist ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO Pflicht – ohne ihn ist die Weitergabe der Daten ein Datenschutzverstoß. Der Vertrag enthält den Hinweis, der AVV ist eine eigene Anlage.",
      "Scheinselbstständigkeit ist bei VAs ein echtes Risiko: feste tägliche Arbeitszeiten, Anwesenheit im Firmen-Chat wie ein Mitarbeiter, nur ein Auftraggeber und Vergütung nach Stunden ohne eigenes Risiko. Lass die VA Zeit und Ort selbst bestimmen und akzeptiere, dass sie weitere Kunden hat.",
      "Zugangsdaten nie per E-Mail oder im Klartext weitergeben. Nutze Passwortmanager mit geteilten Tresoren, eigene Nutzerkonten mit beschränkten Rechten und Zwei-Faktor-Authentifizierung. Beim Vertragsende entziehst du Zugänge, statt Passwörter zu ändern, die andere auch nutzen.",
      "Eine VA im Ausland (z. B. außerhalb der EU) macht die Datenübermittlung zum Drittlandtransfer mit zusätzlichen Pflichten (Standardvertragsklauseln). Kläre vorher, wo die VA arbeitet.",
    ],
    faqs: [
      {
        q: "Brauche ich mit meiner VA wirklich einen AVV?",
        a: "Ja, sobald sie personenbezogene Daten für dich verarbeitet, also Kundenmails, Adressen, Bestellungen oder Bewerbungen. Der AVV regelt Weisungen, Sicherheitsmaßnahmen, Unterauftragnehmer und Löschung. Ohne AVV haftest du als Verantwortlicher für die Datenweitergabe. Viele VAs haben ein Muster, sonst nimm ein Standardmuster und füge es als Anlage bei.",
      },
      {
        q: "Was passiert mit nicht genutzten Stunden aus dem Kontingent?",
        a: "Das regelt ihr im Vertrag. Üblich sind Pakete, bei denen nicht genutzte Stunden am Monatsende verfallen oder zu einem Teil in den Folgemonat übertragen werden. Die Vorlage bietet beide Varianten und regelt, wie Mehrstunden über dem Kontingent freigegeben und berechnet werden.",
      },
      {
        q: "Darf die VA Aufgaben an andere weitergeben?",
        a: "Nur, wenn du zustimmst. Bei Zugang zu Kundendaten muss jeder Unterauftragnehmer zusätzlich im AVV genehmigt und verpflichtet sein. Die Vorlage sieht die Zustimmung in Textform vor und lässt die VA für die Hilfspersonen wie für sich selbst haften.",
      },
      {
        q: "Wie vermeide ich, dass meine VA als Angestellte gilt?",
        a: "Durch echte Selbstständigkeit in der Praxis: Die VA bestimmt, wann und wo sie arbeitet, nutzt eigene Geräte, hat mehrere Kunden und tritt nach außen als Unternehmerin auf. Du gibst Aufgaben und Ergebnisse vor, keine Tagesabläufe. Bei Zweifeln hilft das Statusfeststellungsverfahren nach § 7a SGB IV.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du einen Vertrag für virtuelle Assistenz brauchst",
        text: `Einen VA-Vertrag brauchst du, sobald eine virtuelle Assistenz Zugriff auf dein Postfach, deinen Kalender, dein CRM oder deine Buchhaltung bekommt. Typische Fälle: Ein Solo-Gründer gibt E-Mail-Vorsortierung und Terminplanung ab. Ein Onlineshop lässt Kundenanfragen zum Lieferstatus beantworten. Eine Beraterin lässt Rechnungen vorbereiten und Belege hochladen. Ein Coach übergibt die Social-Media-Pflege nach Redaktionsplan.

Als virtuelle Assistenz nutzt du das Muster als eigenen Standardvertrag, um Stundenpakete, Erreichbarkeit, Zugänge und Haftung sauber zu regeln. Die Vorlage ist ein Dienstvertrag mit monatlichem Kontingent und enthält die Verweise auf den Auftragsverarbeitungsvertrag, den du fast immer brauchst, weil VAs mit personenbezogenen Daten arbeiten.`,
      },
      {
        titel: "Was muss in einen VA-Vertrag?",
        text: `Ein VA-Vertrag muss die Aufgaben eingrenzen, die Selbstständigkeit sichern und Daten schützen. Die Vorlage regelt in zehn Paragrafen:

- § 1 Aufgabenkatalog mit Beispielen von Postfach bis Kundenservice, Ausschluss zulassungspflichtiger Tätigkeiten und Entscheidungen über einer Betragsgrenze, Arbeitsanweisungen als Anlage 1
- § 2 Selbstständigkeit: eigene Zeit, Ort und Geräte, weitere Auftraggeber, keine Urlaubsabstimmung, Weitergabe an Dritte nur mit Zustimmung
- § 3 Monatliches Stundenkontingent mit Verfall oder Übertrag, Mehrstunden nach Freigabe, Bearbeitungszeiten statt fester Erreichbarkeit, Zeiterfassung mit Beanstandungsfrist
- § 4 Zugänge als eigene Nutzerkonten mit minimalen Rechten, Passwortmanager, Zwei-Faktor-Authentifizierung, Meldung von Vorfällen, Rückgabe bei Vertragsende
- § 5 Auftragsverarbeitung nach Art. 28 DSGVO als Anlage 2, Verarbeitung nur in EU und EWR
- § 6 Stundensatz oder Pauschale, Auslagen, Abrechnung, Verzug, Preisanpassung
- § 7 Vertraulichkeit und Auftreten gegenüber Dritten
- § 8 Haftung mit Begrenzung und Haftungsausschluss für geprüfte Ergebnisse
- § 9 Laufzeit, Testphase, Kündigung, Übergabe an eine Nachfolge
- § 10 Schlussbestimmungen

Die Betragsgrenze für Entscheidungen in § 1 Abs. 2 verhindert, dass die VA versehentlich Verträge für dich schließt.`,
      },
      {
        titel: "Virtuelle Assistenz Vertrag ausfüllen",
        text: `Trage Auftraggeber und Assistenz mit Umsatzsteuer-Identifikationsnummer oder Steuernummer ein. In § 1 streichst du die Aufgaben, die nicht gebraucht werden, und ergänzt deine eigenen; setze die Betragsgrenze für finanzielle Entscheidungen und lege Arbeitsanweisungen als Anlage 1 bei. In § 2 Abs. 3 trägst du ein, ab welcher Abwesenheitsdauer und mit welchem Vorlauf die VA informiert.

In § 3 setzt du das Stundenkontingent und wählst Verfall oder Übertrag nicht genutzter Stunden, dazu die Warnschwelle, die üblichen Bearbeitungs- und Antwortzeiten, den Erfassungstakt und das Tool. In § 4 listest du die Systeme auf, zu denen die VA Zugang bekommt. In § 6 wählst du Stundensatz oder Pauschale, trägst Zahlungsziel und Preisanpassung ein; Kleinunternehmer behalten den Satz zu § 19 UStG. In § 7 setzt du die Dauer der Vertraulichkeit, in § 8 Haftungsgrenze und optional die Versicherung, in § 9 Beginn, Testphase, Kündigungsfrist und Übergabeumfang. Füge den Auftragsverarbeitungsvertrag als Anlage 2 bei, bevor die VA das erste Postfach öffnet. Die Vorlage gibt es als Word, PDF und Text.`,
      },
      {
        titel: "Typische Fehler bei VA-Verträgen",
        text: `Der häufigste Fehler ist der fehlende Auftragsverarbeitungsvertrag. Die VA beantwortet Kundenmails, pflegt Adressen und schreibt Rechnungen, aber der AVV sollte später geschlossen werden. Bis dahin ist jede Weitergabe ein Datenschutzverstoß, für den du als Verantwortlicher haftest.

Zweiter Fehler: Zugangsdaten per Messenger. Das Hauptpasswort des Shops wandert in einen Chat, bleibt dort nach Vertragsende, und niemand weiß, wer es noch kennt. § 4 verlangt eigene Konten, Passwortmanager und Zwei-Faktor-Authentifizierung. Dritter Fehler: Die VA arbeitet wie eine Angestellte, mit täglichen Kernzeiten, Pflicht zur Anwesenheit im Team-Chat und nur einem Kunden. Dann droht Scheinselbstständigkeit mit Nachzahlung der Sozialversicherungsbeiträge.

Weitere Stolperfallen sind Stundenpakete ohne Regel für nicht genutzte Stunden, Mehrstunden ohne Freigabe, die VA im Drittland ohne Standardvertragsklauseln, Buchführung mit Kontierung und Abschlüssen, die dem Steuerberatungsgesetz unterliegt, und Kündigung ohne Übergabe, sodass offene Vorgänge liegen bleiben.`,
      },
      {
        titel: "Rechtliche Grundlagen: Dienstvertrag, Art. 28 DSGVO, § 7 SGB IV",
        text: `Der VA-Vertrag ist ein Dienstvertrag nach den §§ 611 ff. BGB: Geschuldet ist sorgfältige Tätigkeit, kein Erfolg. Ob die Assistenz sozialversicherungsrechtlich beschäftigt ist, bestimmt § 7 Abs. 1 SGB IV nach Weisungsgebundenheit und Eingliederung; das Statusfeststellungsverfahren nach § 7a SGB IV schafft Klarheit.

Verarbeitet die VA personenbezogene Daten im Auftrag, ist sie Auftragsverarbeiter nach Art. 4 Nr. 8 DSGVO, und Art. 28 DSGVO verlangt einen Vertrag mit festgelegtem Inhalt: Gegenstand, Dauer, Art und Zweck, Datenkategorien, Weisungen, technische und organisatorische Maßnahmen, Unterauftragsverarbeiter, Löschung. Verarbeitung außerhalb des EWR ist nur mit Garantien nach Art. 44 ff. DSGVO zulässig, etwa Standardvertragsklauseln. Buchführung mit Kontierung und Jahresabschlüsse sind nach dem Steuerberatungsgesetz nur unter engen Voraussetzungen erlaubt; das Sammeln und Hochladen von Belegen ist unproblematisch. Geschäftsgeheimnisse sind nach dem Geschäftsgeheimnisgesetz nur geschützt, wenn angemessene Maßnahmen wie eine Vertraulichkeitsklausel bestehen. Für Zahlungsverzug gilt § 288 BGB.`,
      },
      {
        titel: "Wann der VA-Vertrag nicht reicht",
        text: `Arbeitet die VA außerhalb der EU, brauchst du zusätzlich zum AVV Standardvertragsklauseln und eine Prüfung des Datentransfers; hier lohnt der Blick eines Datenschutzberaters. Soll die VA Buchführung mit Kontierung übernehmen, kläre vorher, ob sie die Voraussetzungen des Steuerberatungsgesetzes erfüllt, sonst machen sich beide angreifbar.

Läuft die Zusammenarbeit in Vollzeit, mit festen Zeiten und ohne weitere Kunden, ist ein Arbeitsvertrag ehrlicher als ein Dienstvertrag; die Statusfeststellung nach § 7a SGB IV gibt Sicherheit. Übernimmt die VA Zahlungsverkehr, Vertragsabschlüsse oder Behördenkommunikation in deinem Namen, brauchst du eine Vollmacht mit klaren Grenzen. Bei VA-Agenturen mit mehreren Assistenzen passt der Rahmenvertrag besser. GründerX stellt die Vorlage als Software bereit und ersetzt keine Rechtsberatung.`,
      },
    ],
    seo: {
      title: "Virtuelle Assistenz Vertrag Vorlage kostenlos | GründerX",
      description:
        "Vertrag für virtuelle Assistenz (VA) als kostenlose Vorlage: Aufgabenkatalog, Stundenkontingent, Tools und Zugänge, Datenschutz mit AVV, Vergütung, Kündigung.",
    },
    stand: "2026-10",
    text: `Dienstleistungsvertrag über virtuelle Assistenz

zwischen

[Firma / Name], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Auftraggeber“ –

und

[Vorname Nachname / Firma], [Straße, PLZ Ort], [USt-IdNr. / Steuernummer]
– nachfolgend „Assistenz“ –

– gemeinsam „die Parteien“ –

§ 1 Leistungen und Aufgabenkatalog
(1) Die Assistenz unterstützt den Auftraggeber als selbstständige virtuelle Assistenz bei administrativen, organisatorischen und kommunikativen Aufgaben. Zum Aufgabenkatalog gehören:
   a) [z. B. Bearbeitung des Postfachs [Adresse]: Sortieren, Beantworten von Standardanfragen nach Vorlagen, Weiterleitung von Entscheidungsfragen],
   b) [z. B. Terminplanung und Kalenderpflege, Vorbereitung von Meetings],
   c) [z. B. Vorbereitende Buchhaltung: Belege sammeln, in [Tool] hochladen, Rechnungen nach Vorgabe erstellen],
   d) [z. B. Pflege von Social-Media-Kanälen nach Redaktionsplan, Community-Antworten nach Leitfaden],
   e) [z. B. Recherche, Datenpflege im CRM, Erstellung von Präsentationen und Dokumenten],
   f) [z. B. Kundenservice: Beantwortung von Anfragen zu Bestellungen und Lieferstatus nach FAQ].
(2) Nicht zum Aufgabenkatalog gehören Tätigkeiten, die einer besonderen Zulassung bedürfen (insbesondere Rechts- und Steuerberatung, Buchführung mit Kontierung und Abschlüssen im Sinne des StBerG), Entscheidungen mit finanzieller Tragweite über [Betrag] EUR sowie Erklärungen im Namen des Auftraggebers gegenüber Behörden, Banken und Vertragspartnern, soweit nicht in Anlage 1 ausdrücklich freigegeben.
(3) Der Auftraggeber übergibt für wiederkehrende Aufgaben Arbeitsanweisungen, Vorlagen und Leitfäden (Anlage 1), die in Textform fortgeschrieben werden. Neue Aufgabenarten werden in Textform abgestimmt.
(4) Die Assistenz schuldet die sorgfältige Erbringung der Tätigkeit (Dienstvertrag, §§ 611 ff. BGB), nicht einen bestimmten Erfolg.

§ 2 Selbstständigkeit, Weisungsfreiheit, Arbeitsweise
(1) Die Assistenz ist selbstständige Unternehmerin bzw. selbstständiger Unternehmer. Ein Arbeitsverhältnis wird nicht begründet. Sie trägt ihr unternehmerisches Risiko, versteuert ihre Einkünfte selbst und sorgt selbst für ihre soziale Absicherung.
(2) Die Assistenz bestimmt Arbeitszeit, Arbeitsort und Arbeitsmittel selbst. Sie arbeitet mit eigener Hardware und eigener Software, soweit nicht bestimmte Tools des Auftraggebers nach § 4 zu nutzen sind. Vorgaben des Auftraggebers beziehen sich auf Inhalt, Qualität und Fristen der Aufgaben, nicht auf die Arbeitsorganisation.
(3) Die Assistenz darf für weitere Auftraggeber tätig sein. Sie ist berechtigt, Aufträge abzulehnen, und nicht verpflichtet, an internen Veranstaltungen des Auftraggebers teilzunehmen oder Urlaub abzustimmen; sie teilt lediglich geplante Abwesenheiten von mehr als [z. B. 3] Werktagen mit [z. B. 2] Wochen Vorlauf mit.
(4) Die Assistenz darf Aufgaben nur mit Zustimmung des Auftraggebers in Textform an Dritte (eigene Mitarbeiter, Unterauftragnehmer) weitergeben. Bei Zugang zu personenbezogenen Daten gilt zusätzlich § 5. Die Assistenz haftet für Hilfspersonen wie für eigenes Handeln.

§ 3 Stundenkontingent, Erreichbarkeit, Zeiterfassung
(1) Der Auftraggeber bucht ein monatliches Kontingent von [Anzahl] Stunden. Die Assistenz hält dieses Kontingent für den Auftraggeber frei. [Variante A: Nicht genutzte Stunden verfallen am Monatsende.] [Variante B: Nicht genutzte Stunden werden bis zu [z. B. 25] % des Kontingents in den Folgemonat übertragen und verfallen danach.]
(2) Stunden über das Kontingent hinaus erbringt die Assistenz nur nach Freigabe des Auftraggebers in Textform; sie werden nach § 6 Abs. 1 abgerechnet. Die Assistenz zeigt an, wenn [z. B. 80] % des Kontingents verbraucht sind.
(3) Bearbeitungszeiten: Die Assistenz bearbeitet Aufgaben in der Regel innerhalb von [z. B. 1 Werktag] und beantwortet Nachrichten des Auftraggebers an Werktagen in der Regel innerhalb von [z. B. 4] Stunden zwischen [z. B. 9 und 17 Uhr]. Feste Erreichbarkeitszeiten sind damit nicht vereinbart; dringende Aufgaben werden als solche gekennzeichnet und vorab abgestimmt.
(4) Die Assistenz erfasst ihre Arbeitszeit je Aufgabe im [15-Minuten]-Takt mit Datum, Dauer und Tätigkeit [im Tool [Name]] und stellt dem Auftraggeber die Aufstellung monatlich mit der Rechnung zur Verfügung. Beanstandet der Auftraggeber die Aufstellung nicht innerhalb von [z. B. 10] Werktagen in Textform, gilt sie als anerkannt; die Rechnung weist darauf hin.

§ 4 Tools, Zugänge, Sicherheit
(1) Der Auftraggeber stellt der Assistenz Zugänge zu den für die Aufgaben nötigen Systemen bereit, insbesondere zu [z. B. E-Mail-Postfach, Kalender, CRM, Shop-Backend, Social-Media-Konten, Buchhaltungstool, Projektmanagement-Tool]. Die Zugänge werden als eigene Nutzerkonten mit den jeweils geringsten nötigen Rechten eingerichtet; eine Übergabe von Zugangsdaten erfolgt nur über einen Passwortmanager oder ein anderes verschlüsseltes Verfahren, niemals per E-Mail oder Messenger im Klartext.
(2) Die Assistenz nutzt die Zugänge ausschließlich zur Vertragsdurchführung, gibt sie nicht weiter, aktiviert Zwei-Faktor-Authentifizierung, wo verfügbar, hält Geräte und Software aktuell und verschlüsselt die Datenträger ihrer Geräte. Sie speichert Daten des Auftraggebers nur in den vom Auftraggeber bereitgestellten Systemen, nicht lokal oder in eigenen Cloud-Diensten, soweit nicht in Anlage 1 ausdrücklich erlaubt.
(3) Die Assistenz meldet den Verlust von Geräten oder Zugangsdaten, verdächtige Anmeldungen und sonstige Sicherheitsvorfälle unverzüglich, spätestens innerhalb von 24 Stunden.
(4) Konten, Daten, Inhalte und Kontakte, die die Assistenz für den Auftraggeber anlegt oder pflegt, stehen allein dem Auftraggeber zu. Bei Vertragsende entzieht der Auftraggeber die Zugänge; die Assistenz gibt alle Unterlagen zurück, löscht verbleibende Daten des Auftraggebers und bestätigt dies in Textform.

§ 5 Datenschutz und Auftragsverarbeitung
(1) Soweit die Assistenz im Rahmen ihrer Aufgaben personenbezogene Daten (z. B. von Kunden, Interessenten, Lieferanten, Bewerbern oder Mitarbeitern des Auftraggebers) verarbeitet, geschieht dies im Auftrag und nach Weisung des Auftraggebers. Die Parteien schließen hierzu vor Beginn der Verarbeitung einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO (Anlage 2), der Gegenstand, Dauer, Art und Zweck der Verarbeitung, die Datenkategorien, die technischen und organisatorischen Maßnahmen, die Genehmigung von Unterauftragnehmern und die Löschung regelt.
(2) Die Assistenz verarbeitet die Daten nur innerhalb der Europäischen Union bzw. des Europäischen Wirtschaftsraums. Eine Verarbeitung in Drittländern (auch durch Nutzung von Tools mit Serverstandort außerhalb der EU) bedarf der vorherigen Zustimmung des Auftraggebers in Textform und der dafür erforderlichen Garantien.
(3) Die Assistenz verpflichtet sich und etwaige Hilfspersonen auf die Vertraulichkeit und unterstützt den Auftraggeber bei Betroffenenanfragen und bei der Meldung von Datenschutzverletzungen.

§ 6 Vergütung und Abrechnung
(1) Die Vergütung beträgt [Variante A: [Betrag] EUR je Stunde für Stunden innerhalb und außerhalb des Kontingents] [Variante B: eine monatliche Pauschale von [Betrag] EUR für das Kontingent nach § 3 Abs. 1; Mehrstunden nach Freigabe mit [Betrag] EUR je Stunde], jeweils zuzüglich gesetzlicher Umsatzsteuer. [Bei Kleinunternehmern: Die Assistenz weist gemäß § 19 UStG keine Umsatzsteuer aus.]
(2) Auslagen (z. B. Porto, Softwarelizenzen, die ausschließlich für den Auftraggeber angeschafft werden) werden nur nach Freigabe in Textform gegen Beleg erstattet.
(3) Die Assistenz rechnet monatlich zum Monatsende mit Zeitaufstellung nach § 3 Abs. 4 ab [Variante B: die Pauschale ist jeweils bis zum [3.] Werktag des Monats im Voraus fällig]. Rechnungen sind innerhalb von [z. B. 14] Tagen nach Zugang ohne Abzug zahlbar.
(4) Bei Zahlungsverzug gelten Verzugszinsen in gesetzlicher Höhe (zwischen Unternehmern 9 Prozentpunkte über dem Basiszinssatz) und die Pauschale nach § 288 Abs. 5 BGB. Bei Verzug mit mehr als einer Monatsrechnung darf die Assistenz nach Ankündigung mit [z. B. 7] Tagen Frist ihre Leistungen zurückhalten.
(5) Die Vergütung kann erstmals nach [z. B. 12] Monaten mit einer Ankündigungsfrist von [z. B. 2] Monaten angepasst werden; widerspricht der Auftraggeber, kann die Assistenz zum Wirksamwerden kündigen.

§ 7 Vertraulichkeit
(1) Die Assistenz behandelt alle Informationen über den Auftraggeber, dessen Kunden, Lieferanten, Mitarbeiter, Finanzen, Preise, Strategien und Interna streng vertraulich, nutzt sie nur zur Vertragsdurchführung und gibt sie nicht an Dritte weiter. Diese Pflicht gilt [z. B. 3] Jahre über das Vertragsende hinaus, für Geschäftsgeheimnisse im Sinne des GeschGehG unbegrenzt.
(2) Ausgenommen sind Informationen, die ohne Verschulden der Assistenz öffentlich bekannt sind, oder deren Offenlegung gesetzlich oder behördlich angeordnet ist.
(3) Die Assistenz darf den Auftraggeber nur nach Zustimmung in Textform als Referenz nennen. Sie tritt gegenüber Dritten, soweit sie im Namen des Auftraggebers kommuniziert (z. B. Kundenservice), unter der vom Auftraggeber vorgegebenen Bezeichnung auf und gibt sich nicht als Mitarbeiterin bzw. Mitarbeiter aus, wenn der Auftraggeber dies nicht wünscht.

§ 8 Haftung
(1) Die Assistenz haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
(2) Bei leichter Fahrlässigkeit haftet die Assistenz nur bei Verletzung wesentlicher Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren Schaden, höchstens auf [Betrag, z. B. die Vergütung der letzten 3 Monate] EUR je Schadensfall.
(3) Für Arbeitsergebnisse, die der Auftraggeber vor Verwendung prüft oder freigibt (z. B. Rechnungen, Verträge, Veröffentlichungen), haftet die Assistenz nur für Fehler, die bei der Prüfung nicht erkennbar waren. Für Datenverlust haftet sie nur bis zum Wiederherstellungsaufwand bei ordnungsgemäßer Datensicherung des Auftraggebers.
(4) [Optional: Die Assistenz unterhält eine Vermögensschadenhaftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR.]

§ 9 Laufzeit, Kündigung, Übergabe
(1) Der Vertrag beginnt am [Datum] und läuft auf unbestimmte Zeit. [Optional: Die ersten [z. B. 4] Wochen gelten als Testphase, in der beide Seiten mit einer Frist von [z. B. 7] Tagen kündigen können.]
(2) Beide Parteien können den Vertrag mit einer Frist von [z. B. 4] Wochen zum Monatsende kündigen. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt, insbesondere bei Verstößen gegen § 4, § 5 oder § 7, bei Zahlungsverzug mit zwei Monatsrechnungen oder bei Insolvenz einer Partei. Kündigungen bedürfen der Schriftform.
(3) Nach Kündigung übergibt die Assistenz innerhalb von [z. B. 5] Werktagen eine Übersicht aller offenen Aufgaben, laufenden Vorgänge und Ansprechpartner, dokumentiert wiederkehrende Abläufe in Anlage 1 fort und wirkt auf Wunsch des Auftraggebers bis zu [z. B. 5] Stunden zum vereinbarten Stundensatz an der Übergabe an eine Nachfolge mit. § 4 Abs. 4 gilt entsprechend.

§ 10 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An ihre Stelle tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Es gilt deutsches Recht. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]; sonst gilt der gesetzliche Gerichtsstand.
(4) Anlagen: Anlage 1 Aufgabenkatalog, Arbeitsanweisungen und freigegebene Tools, Anlage 2 Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Auftraggeber


______________________________
[Vorname Nachname], Assistenz

${VORLAGEN_HINWEIS}`,
  },
];
