// Inhalt der Vorlage „subunternehmervertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../dienstleistung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
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
};

export default inhalt;
