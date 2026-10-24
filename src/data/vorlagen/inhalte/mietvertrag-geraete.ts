// Inhalt der Vorlage „mietvertrag-geraete“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../miete.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Mietvertrag für Geräte und Equipment brauchst",
        text: `Du vermietest Kamera- und Tontechnik, Werkzeuge, Maschinen, Veranstaltungstechnik oder einen Transporter an andere Unternehmen. Oder du mietest selbst für ein Projekt eine Maschine, ein Messe-Set oder einen Lieferwagen und willst vorher wissen, wer zahlt, wenn das Gerät kaputtgeht, gestohlen wird oder einen Tag zu spät zurückkommt. Für beide Seiten ist dieser Mietvertrag gebaut: feste Mietzeit nach Tagen, Wochen oder Monaten, Mietzins mit Umsatzsteuer, Kaution, Übergabeprotokoll mit Seriennummern, klare Haftungsverteilung und Verzugsregeln. Er gilt zwischen Unternehmern; Verbraucherrecht spielt keine Rolle. Soll ein Gegenstand kostenlos überlassen werden, nimmst du stattdessen den Leihvertrag. Für Räume und Flächen gibt es den Gewerbemietvertrag und den Mietvertrag für Lagerflächen.`,
      },
      {
        titel: "Was muss in einen Geräte-Mietvertrag?",
        text: `Bei beweglichen Sachen geht es vor allem um Zustand, Haftung und Rückgabe. Diese Punkte stehen in der Vorlage:

- Mietgegenstand als Liste mit Hersteller, Modell, Seriennummer und Zubehör, Übergabeprotokoll mit Fotos, Eigentumsvorbehalt des Vermieters (§ 1)
- Mietzeit mit Datum und Uhrzeit, Ort von Abholung und Rückgabe, Verlängerung nur in Textform, Ausschluss der stillschweigenden Verlängerung, Variante für Dauermiete, fristlose Kündigung (§ 2)
- Mietzins netto je Tag, Woche oder Monat, Umsatzsteuer oder Kleinunternehmerregelung, enthaltene und nicht enthaltene Leistungen, Fälligkeit, Verzugszinsen und Stornostaffel (§ 3)
- Kaution mit Form und Rückzahlungsfrist (§ 4)
- Übergabe in geprüftem Zustand, Einweisung, Mängelanzeige, Ersatzgerät oder Reparatur, Minderung und Kündigung bei Ausfall, Ausschluss der Garantiehaftung (§ 5)
- Bestimmungsgemäßer Gebrauch, Fahrerliste, Einsatzort, Verwahrung, Pflege und Freistellung (§ 6)
- Haftung des Mieters mit Wiederbeschaffungswert, Versicherung beim Vermieter oder Mieter, Haftungsgrenze des Vermieters, Polizeianzeige bei Diebstahl (§ 7)
- Rückgabe, Nachrügefrist für verdeckte Schäden, Nutzungsentschädigung und Folgeschaden bei Verspätung, Verjährung (§ 8)
- Eigentum, Pfändung und Insolvenz (§ 9), Schlussbestimmungen mit Ausschluss fremder AGB (§ 10)`,
      },
      {
        titel: "Mietvertrag Equipment ausfüllen: so gehst du vor",
        text: `Fülle § 1 wie eine Packliste aus: jedes Gerät mit Modell und Seriennummer, dazu Akkus, Ladegeräte, Koffer. Was nicht auf der Liste steht, kann am Ende nicht als fehlend berechnet werden. In § 2 trägst du Übergabe und Rückgabe mit Uhrzeit ein und legst fest, ob abgeholt oder geliefert wird. In § 3 setzt du den Mietzins je Tag, Woche oder Monat und die Gesamtsumme, entscheidest zwischen Umsatzsteuer und Kleinunternehmerregelung, listest enthaltene Leistungen wie Verschleiß und Transportkoffer und nicht enthaltene wie Kraftstoff und Bedienpersonal und legst die Stornostaffel fest. In § 4 bestimmst du Kaution und Rückzahlungsfrist. In § 5 setzt du die Frist, innerhalb derer der Vermieter Ersatz stellt. In § 7 vereinbarst du den Wiederbeschaffungswert und wählst Variante A mit Versicherung beim Vermieter und Selbstbeteiligung oder Variante B mit Versicherung durch den Mieter. In § 8 setzt du Nachrügefrist und Mindestbetrag der Nutzungsentschädigung. Kostenlos als Word, PDF und Text.`,
      },
      {
        titel: "Typische Fehler bei der Vermietung von Geräten",
        text: `Der wichtigste Fehler: kein Übergabeprotokoll mit Fotos. Ohne Protokoll kann der Vermieter Schäden nicht beweisen und der Mieter nicht belegen, dass die Kratzer schon da waren. Zweiter Fehler: die Garantiehaftung für anfängliche Mängel nicht ausschließen; dann haftet der Vermieter ohne Verschulden für Produktionsausfälle, wenn das Gerät wegen eines verborgenen Fehlers stehen bleibt. Dritter Fehler: keine Regel für die stillschweigende Verlängerung, sodass aus einer Wochenmiete ein unbefristetes Mietverhältnis wird, wenn der Mieter einfach weiternutzt. Vierter Fehler: der Wiederbeschaffungswert fehlt, und bei Diebstahl streitet ihr über den Zeitwert. Fünfter Fehler: Verzugszinsen und Mahnpauschale selbst erfinden statt auf das Gesetz zu verweisen. Sechster Fehler: als Kleinunternehmer Umsatzsteuer ausweisen oder umgekehrt als Regelunternehmer vergessen, dass die Vermietung beweglicher Sachen immer umsatzsteuerpflichtig ist.`,
      },
      {
        titel: "Rechtliche Grundlagen: Mietrecht für bewegliche Sachen",
        text: `Auch für Geräte gilt das allgemeine Mietrecht der §§ 535 ff. BGB. Der Vermieter schuldet den vertragsgemäßen Zustand während der Mietzeit; bei Mängeln ist die Miete nach § 536 BGB gemindert, und der Mieter muss Mängel nach § 536c BGB unverzüglich anzeigen. Die verschuldensunabhängige Haftung für anfängliche Mängel aus § 536a Abs. 1 BGB ist zwischen Unternehmern abdingbar. Abnutzung durch vertragsgemäßen Gebrauch hat der Mieter nach § 538 BGB nicht zu vertreten. Die stillschweigende Verlängerung regelt § 545 BGB, die Nutzungsentschädigung bei verspäteter Rückgabe § 546a BGB, die sechsmonatige Verjährung von Ersatzansprüchen § 548 BGB. Verzugszinsen und die Pauschale von 40 Euro zwischen Unternehmern stehen in § 288 Abs. 2 und 5 BGB. Die Formvorschrift des § 550 BGB gilt nur für Räume und Grundstücke, nicht für bewegliche Sachen; deshalb reicht in der Vorlage Textform. Umsatzsteuerlich ist die Vermietung beweglicher Sachen steuerpflichtig, Kleinunternehmer nach § 19 UStG weisen keine Steuer aus. GründerX ist keine Rechtsberatung.`,
      },
      {
        titel: "Wann die Geräte-Mietvertrag-Vorlage nicht reicht",
        text: `Die Vorlage ist für einzelne Mietvorgänge zwischen Unternehmern gedacht. Vermietest du regelmäßig an viele Kunden, brauchst du Mietbedingungen als AGB, die zu deinem Buchungs- und Zahlungsprozess passen und auch gegenüber Verbrauchern halten, inklusive Widerrufsbelehrung bei Online-Abschluss. Bei Fahrzeugen kommen Halterpflichten, Kfz-Versicherung, Schadensabwicklung und Fahrerprüfung hinzu, die ein Autovermietvertrag detaillierter regelt. Bei Baumaschinen, Hebebühnen oder Geräten mit Bedienpersonal spielen Unfallverhütungsvorschriften und die Abgrenzung zum Werkvertrag eine Rolle. Bei hochwertigen Anlagen über lange Laufzeiten mit Kaufoption bist du beim Leasing, das eigene steuerliche und bilanzielle Regeln hat. In all diesen Fällen lohnt sich die anwaltliche Prüfung, bevor das erste Gerät das Lager verlässt.`,
      },
    ],
  text: `Mietvertrag über Geräte / Equipment

zwischen

[Firma des Vermieters, Rechtsform], [Straße, PLZ Ort], vertreten durch [Name]
– nachfolgend „Vermieter“ –

und

[Firma des Mieters, Rechtsform], [Straße, PLZ Ort], vertreten durch [Name], [USt-IdNr.]
– nachfolgend „Mieter“ –

§ 1 Mietgegenstand und Übergabeprotokoll
(1) Der Vermieter vermietet dem Mieter folgende Gegenstände (nachfolgend „Mietgegenstand“):
   a) [Bezeichnung, Hersteller, Modell, Seriennummer, z. B. „Kamera [Modell], S/N [Nummer]“], Zubehör: [Akkus, Ladegerät, Koffer]
   b) [Bezeichnung, z. B. „Objektiv [Modell], S/N [Nummer]“]
   c) [Bezeichnung, z. B. „Transporter [Marke, Modell], Kennzeichen [Kennzeichen], km-Stand [Zahl]“]
(2) Bei Übergabe werden Zustand, Zubehör, Seriennummern, [Kilometerstand / Betriebsstunden] und vorhandene Schäden im Übergabeprotokoll mit Fotos (Anlage 1) festgehalten, das beide Parteien unterzeichnen. Der Mietgegenstand bleibt Eigentum des Vermieters.

§ 2 Mietzeit, Verlängerung und Kündigung
(1) Die Mietzeit beginnt mit der Übergabe am [Datum, Uhrzeit] und endet mit der Rückgabe am [Datum, Uhrzeit] (feste Mietzeit). Abholung und Rückgabe erfolgen [am Sitz des Vermieters, [Adresse] / durch Lieferung an [Adresse] gegen Lieferpauschale nach § 3].
(2) Eine Verlängerung ist nur mit Zustimmung des Vermieters möglich und spätestens [z. B. 2] Werktage vor Ablauf in Textform anzufragen. Ohne Zustimmung gilt die Mietzeit nicht als verlängert, auch wenn der Mieter weiter nutzt; § 545 BGB ist ausgeschlossen.
(3) Eine ordentliche Kündigung während der festen Mietzeit ist ausgeschlossen. [Bei Dauermiete: Das Mietverhältnis läuft auf unbestimmte Zeit und kann mit einer Frist von [z. B. 2] Wochen zum Monatsende in Textform gekündigt werden.]
(4) Die fristlose Kündigung aus wichtigem Grund bleibt unberührt, für den Vermieter insbesondere bei Zahlungsverzug, vertragswidrigem Gebrauch, Überlassung an Dritte, Verbringung ins Ausland ohne Zustimmung oder Insolvenzantrag des Mieters.

§ 3 Mietzins, Umsatzsteuer, Zahlung und Verzug
(1) Der Mietzins beträgt [Betrag] EUR netto je [Tag / Woche / Monat], für die vereinbarte Mietzeit insgesamt [Betrag] EUR netto, zuzüglich Umsatzsteuer (derzeit 19 %). [Bei Kleinunternehmern: Umsatzsteuer wird nach § 19 UStG nicht berechnet.]
(2) Enthalten sind: [z. B. „normaler Verschleiß, zwei Akkus, Transportkoffer“]. Nicht enthalten sind: [z. B. „Verbrauchsmaterial, Kraftstoff, Lieferung und Abholung (Pauschale [Betrag] EUR), Bedienpersonal“].
(3) Der Mietzins ist [bei Übergabe / innerhalb von [z. B. 7] Tagen nach Rechnung / bei Dauermiete monatlich im Voraus] ohne Abzug auf das Konto IBAN [IBAN] zu zahlen.
(4) Bei Zahlungsverzug schuldet der Mieter Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz und die Pauschale von 40 EUR (§ 288 Abs. 2 und 5 BGB); weiterer Verzugsschaden bleibt vorbehalten. Aufrechnung und Zurückbehaltung sind nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen zulässig.
(5) Sagt der Mieter vor Übergabe ab, schuldet er [bis [Zahl] Tage vor Mietbeginn [Zahl] %, danach [Zahl] %] des Mietzinses, es sei denn, der Vermieter kann anderweitig vermieten; der Nachweis eines geringeren Schadens bleibt dem Mieter vorbehalten.

§ 4 Kaution
Der Mieter leistet vor Übergabe eine Kaution von [Betrag] EUR [in bar / per Überweisung / durch Kreditkartenreservierung] zur Sicherung aller Ansprüche aus diesem Vertrag. Sie wird nach ordnungsgemäßer Rückgabe und Prüfung innerhalb von [z. B. 14] Tagen unverzinst zurückgezahlt, soweit keine Ansprüche bestehen.

§ 5 Übergabe, Einweisung und Mängel
(1) Der Vermieter übergibt den Mietgegenstand funktionsfähig, gereinigt und, soweit vorgeschrieben, geprüft (z. B. DGUV-Prüfung, Hauptuntersuchung). Er weist den Mieter bei Übergabe ein und übergibt die Bedienungsanleitung.
(2) Der Mieter prüft den Mietgegenstand bei Übergabe auf offensichtliche Mängel und Vollständigkeit und hält Beanstandungen im Protokoll fest. Später erkannte Mängel zeigt er unverzüglich in Textform an (§ 536c BGB).
(3) Bei einem vom Mieter nicht zu vertretenden Mangel stellt der Vermieter innerhalb von [z. B. 24] Stunden an Werktagen Ersatz oder repariert. Gelingt dies nicht, mindert sich der Mietzins anteilig; bei vollständigem Ausfall über mehr als [z. B. 2] Werktage kann der Mieter kündigen.
(4) Die verschuldensunabhängige Haftung des Vermieters für anfängliche Mängel (§ 536a Abs. 1 BGB) ist ausgeschlossen.

§ 6 Pflichten des Mieters und Einsatzort
(1) Der Mieter gebraucht den Mietgegenstand nur bestimmungsgemäß, nach Anleitung und Einweisung und durch geeignetes Personal [bei Fahrzeugen: nur durch vorab benannte Fahrer mit gültiger Fahrerlaubnis der Klasse [Klasse]]. Sicherheits- und Unfallverhütungsvorschriften sind einzuhalten.
(2) Einsatzort ist [Adresse]. Verbringung ins Ausland oder an einen anderen Einsatzort bedarf der Zustimmung des Vermieters in Textform.
(3) Der Mieter schützt den Mietgegenstand vor Witterung, Feuchtigkeit, Überlastung und Zugriff Unbefugter, verwahrt ihn außerhalb der Nutzung in verschlossenen Räumen oder Fahrzeugen und lässt ihn nicht unbeaufsichtigt an öffentlichen Orten. Veränderungen, Reparaturen und das Öffnen des Geräts sind nicht gestattet; Störungen meldet er unverzüglich. Die laufende Pflege (Reinigung, [Kraftstoff, Akkuladung]) obliegt dem Mieter.
(4) Der Mieter stellt den Vermieter von Ansprüchen Dritter, Bußgeldern und Gebühren aus dem Gebrauch frei und haftet für Personen, denen er den Gebrauch ermöglicht, wie für sich selbst.

§ 7 Haftung, Versicherung und Diebstahl
(1) Der Mieter haftet für Beschädigung, Verlust und Untergang des Mietgegenstands während der Mietzeit, soweit er sie zu vertreten hat oder durch die geschuldete Sorgfalt hätte abwenden können. Bei Verlust oder Totalschaden ersetzt er den Wiederbeschaffungswert, der mit [Betrag] EUR netto vereinbart wird, soweit er keinen geringeren Wert nachweist; bei Beschädigung die Reparaturkosten zuzüglich Mietausfall während der Reparatur. Verschleiß durch vertragsgemäßen Gebrauch ist ausgenommen (§ 538 BGB).
(2) [Variante A: Der Vermieter unterhält eine [Elektronik- / Maschinenbruch- / Vollkasko-]Versicherung mit Selbstbeteiligung von [Betrag] EUR je Schadensfall. Der Mieter zahlt dafür [Betrag] EUR netto je [Tag / Mietzeit] und trägt im Schadensfall die Selbstbeteiligung sowie nicht gedeckte Schäden (insbesondere Vorsatz, grobe Fahrlässigkeit, fehlende Sicherung). / Variante B: Der Mieter versichert den Mietgegenstand für die Mietzeit auf eigene Kosten zum Wiederbeschaffungswert und weist dies vor Übergabe nach; Entschädigungsansprüche tritt er an den Vermieter ab.]
(3) Der Vermieter haftet für Schäden des Mieters, insbesondere Produktionsausfall und entgangenen Gewinn, nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten, dann begrenzt auf den vorhersehbaren, vertragstypischen Schaden, höchstens auf [den vereinbarten Mietzins / [Betrag] EUR]. Die Haftung für Schäden an Leben, Körper und Gesundheit und nach dem Produkthaftungsgesetz bleibt unberührt.
(4) Bei Diebstahl, Einbruch, Unfall oder Beschlagnahme schaltet der Mieter unverzüglich die Polizei ein und übermittelt dem Vermieter eine Kopie der Anzeige.

§ 8 Rückgabe und Verspätung
(1) Der Mieter gibt den Mietgegenstand zum vereinbarten Zeitpunkt vollständig, gereinigt, [vollgetankt / mit vollem Akku] und im Zustand des Übergabeprotokolls abzüglich vertragsgemäßer Abnutzung zurück; gespeicherte Daten sichert und löscht er vorher. Ein Rückgabeprotokoll wird erstellt; der Vermieter darf innerhalb von [z. B. 3] Werktagen nicht ohne Weiteres erkennbare Schäden nachträglich rügen. Fehlendes Zubehör wird zum Wiederbeschaffungswert berechnet.
(2) Bei verspäteter Rückgabe schuldet der Mieter für jeden angefangenen Tag den vereinbarten Tagesmietzins, mindestens [Betrag] EUR, als Nutzungsentschädigung (§ 546a BGB) und ersetzt den Schaden, wenn der Vermieter deshalb einen Folgemieter nicht beliefern kann.
(3) Ersatzansprüche des Vermieters wegen Veränderungen oder Verschlechterungen verjähren in sechs Monaten ab Rückgabe (§ 548 BGB).

§ 9 Eigentum und Zugriff Dritter
Der Mieter darf den Mietgegenstand nicht untervermieten, verleihen, verpfänden oder Dritten überlassen und keine Eigentumskennzeichnungen entfernen. Bei Pfändung, Beschlagnahme oder Insolvenz weist er auf das Eigentum des Vermieters hin, informiert ihn unverzüglich und übermittelt die zur Abwehr nötigen Unterlagen.

§ 10 Schlussbestimmungen
(1) Änderungen und Ergänzungen bedürfen der Textform. Mündliche Nebenabreden bestehen nicht; Geschäftsbedingungen des Mieters finden keine Anwendung.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam; an ihre Stelle tritt die gesetzliche Regelung.
(3) Erfüllungsort ist der Sitz des Vermieters. Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]. Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.
(4) Anlagen: Anlage 1 Übergabeprotokoll mit Fotos, [Anlage 2 Fahrerliste, Anlage 3 Versicherungsbedingungen].

[Ort], den [Datum]


______________________________
[Name, Funktion], für den Vermieter


______________________________
[Name, Funktion], für den Mieter

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
