// Inhalt der Vorlage „kaufvertrag-firmenwagen“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../kauf.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen gewerblichen Kfz-Kaufvertrag brauchst",
        text: "Diese Vorlage ist für den Fahrzeugkauf zwischen zwei Unternehmen gedacht: Du übernimmst den Transporter eines Handwerksbetriebs, der seine Flotte erneuert, kaufst einen abgelösten Leasingrückläufer aus dem Betriebsvermögen eines anderen Unternehmers oder verkaufst deinen Firmenwagen bei Umstellung auf Elektro oder bei Geschäftsaufgabe. Auch der Verkauf eines Lieferwagens an einen anderen Gründer, der als Einzelunternehmer startet, fällt darunter.\n\nAnders als die üblichen Kfz-Kaufverträge der Automobilclubs ist das Muster auf den Verkauf aus dem Betriebsvermögen zugeschnitten: Es regelt Umsatzsteuer mit Regel- und Differenzbesteuerung, hält Beschaffenheitsvereinbarungen zu Unfallfreiheit und Laufleistung fest und enthält ein Übergabeprotokoll. Für den Verkauf an eine Privatperson oder von privat an dich passt es nicht, weil dann Verbraucherrecht beziehungsweise Privatverkaufsregeln gelten.",
      },
      {
        titel: "Was muss in einen Kfz-Kaufvertrag für Firmenwagen?",
        text: "Ein Fahrzeug ist eindeutig nur über seine Papiere identifizierbar. Die Vorlage verlangt daher in § 1 Fahrzeug-Identifizierungsnummer, Kennzeichen, Erstzulassung, Kilometerstand mit Datum, HU-Frist, Antrieb und Leistung, Vorbesitzer und bei Elektrofahrzeugen den Akkuzustand. Zusätzlich gehören hinein:\n\n- Zubehör und die zu übergebenden Unterlagen: Zulassungsbescheinigung Teil I und II, Schlüssel, HU-Bericht, Serviceheft, COC-Papier (§ 2)\n- Kaufpreis mit Umsatzsteuer-Variante: Regelbesteuerung, Differenzbesteuerung oder Kleinunternehmer (§ 3)\n- Erklärungen zu Unfallfreiheit, Schäden, Vornutzung als Taxi oder Mietwagen und Kilometerstand (§ 4)\n- Übergabe, Gefahrübergang, Eigentumsvorbehalt und Herausgabe der Zulassungsbescheinigung Teil II erst nach Zahlung (§ 5)\n- Ummeldungspflicht des Käufers, Veräußerungsanzeige des Verkäufers, Freistellung von Bußgeldern (§ 6)\n- Gewährleistungsausschluss oder Verkürzung mit den gesetzlichen Ausnahmen (§ 7)\n- Übergabeprotokoll mit Kilometerstand, Tankfüllung, Papieren und Schäden\n\nDas Übergabeprotokoll ist kein Anhang zum Abheften, sondern der spätere Beweis für den Zustand bei Übergabe.",
      },
      {
        titel: "Kfz-Kaufvertrag Muster ausfüllen: so gehst du vor",
        text: "Übernimm die Fahrzeugdaten in § 1 direkt aus der Zulassungsbescheinigung Teil I, nicht aus dem Gedächtnis; die FIN hat 17 Zeichen und steht auch im Türholm. Den Kilometerstand liest du am Tag des Vertragsschlusses ab und trägst das Datum dazu ein. In § 2 listest du Winterreifen, Anhängerkupplung, Ladekabel oder Regalsysteme auf und notierst, was vor Übergabe entfernt wird, etwa Firmenbeschriftung oder Telematikbox.\n\nIn § 3 wählst du die Steuer-Variante: Hast du das Fahrzeug mit Vorsteuerabzug gekauft, weist du 19 Prozent Umsatzsteuer aus. Kam es ohne Vorsteuerabzug, zum Beispiel von privat, prüfst du mit dem Steuerberater die Differenzbesteuerung (Alternative A); Kleinunternehmer nehmen Alternative B. Die Restdarlehens-Klausel in Absatz 4 bleibt nur bei finanzierten Fahrzeugen. In § 4 entscheidest du bei jeder Erklärung zwischen den eckigen Varianten und beschreibst Unfallschäden mit Datum, Werkstatt und Kosten. Trage in § 6 die Ummeldefrist in Werktagen ein, in § 7 ob die Gewährleistung ausgeschlossen oder auf zwölf Monate verkürzt wird. Bei der Übergabe füllt ihr gemeinsam das Protokoll aus, macht Fotos und unterschreibt beide.",
      },
      {
        titel: "Typische Fehler beim Firmenwagen-Verkauf und wie du sie vermeidest",
        text: "Der gefährlichste Fehler ist die Herausgabe der Zulassungsbescheinigung Teil II vor Zahlung. Wer den Brief hat, kann das Fahrzeug zulassen und weiterverkaufen; die Vorlage koppelt die Herausgabe deshalb an den Zahlungseingang. Zweitens vergessen viele Verkäufer die Veräußerungsanzeige bei Zulassungsstelle und Versicherung. Bis dahin bist du nach außen Halter: Bußgelder, Mautgebühren und Versicherungsbeiträge landen bei dir, und die Freistellung in § 6 hilft nur, wenn der Käufer zahlungsfähig ist. Sende die Anzeige noch am Tag der Übergabe.\n\nDritter Fehler: „unfallfrei“ ankreuzen, obwohl ein Parkrempler repariert wurde. Die Angaben in § 4 sind Beschaffenheitsvereinbarungen; stimmen sie nicht, haftet der Verkäufer trotz Gewährleistungsausschluss. Schreibe lieber jeden Schaden auf. Vierter Fehler: Umsatzsteuer falsch ausweisen. Wer bei Differenzbesteuerung trotzdem 19 Prozent auf die Rechnung schreibt, schuldet die Steuer, und der Käufer darf sie nicht als Vorsteuer ziehen. Und: Ohne Fotos im Übergabeprotokoll ist jeder spätere Kratzer Streitstoff.",
      },
      {
        titel: "Rechtliche Grundlagen: Beschaffenheit, Gewährleistung, Umsatzsteuer, Halterhaftung",
        text: "Für den Fahrzeugkauf gilt das allgemeine Kaufrecht der §§ 433 ff. BGB. Angaben zu Unfallfreiheit, Laufleistung und Vornutzung sind Beschaffenheitsvereinbarungen nach § 434 BGB; weicht das Fahrzeug davon ab, ist es mangelhaft, unabhängig von einem Gewährleistungsausschluss. Zwischen Unternehmern kann die Gewährleistung für Gebrauchtfahrzeuge verkürzt oder in individuell ausgehandelten Verträgen ausgeschlossen werden, nicht aber für arglistig verschwiegene Mängel, Vorsatz, grobe Fahrlässigkeit und Personenschäden (§§ 444, 309 BGB).\n\nMit der Übergabe geht die Gefahr über (§ 446 BGB), das Eigentum erst mit vollständiger Zahlung, weil die Vorlage einen Eigentumsvorbehalt nach § 449 BGB vorsieht. Die Kfz-Haftpflichtversicherung geht nach § 95 VVG vorläufig auf den Käufer über; die Mitteilungspflicht an die Zulassungsstelle folgt aus der Fahrzeug-Zulassungsverordnung. Umsatzsteuerlich ist der Verkauf aus dem Betriebsvermögen eines regelbesteuerten Unternehmers steuerpflichtig; die Differenzbesteuerung nach § 25a UStG kommt nur bei Fahrzeugen ohne Vorsteuerabzug in Betracht und verbietet den offenen Steuerausweis. Ein Notar ist für den Fahrzeugkauf nie erforderlich.",
      },
      {
        titel: "Wann der Kfz-Kaufvertrag aus der Vorlage nicht reicht",
        text: "Verkaufst du an eine Privatperson, gilt Verbraucherrecht: keine Rügepflicht, Gewährleistung mindestens ein Jahr bei Gebrauchtwagen, Beweislastumkehr im ersten Jahr. Dann brauchst du einen Händler-Kaufvertrag für Verbraucher, nicht dieses Muster. Beim Verkauf ins EU-Ausland kommen innergemeinschaftliche Lieferung, Gelangensbestätigung und bei Neufahrzeugen Sonderregeln hinzu; sprich vorher mit dem Steuerberater.\n\nAuch bei Leasingfahrzeugen reicht die Vorlage nicht, solange der Leasingvertrag läuft: Eigentümer ist der Leasinggeber, du kannst nur mit dessen Zustimmung nach Ablösung verkaufen. Die optionale Restdarlehens-Klausel deckt nur die Ablösung einer Finanzierung ab. Bei Fahrzeugen mit erheblichen Vorschäden, Tachomanipulation im Vorbesitz oder Importfahrzeugen ohne deutsche Papiere lohnt ein Gutachten vor dem Kauf. GründerX stellt Software und Muster bereit, keine Rechtsberatung; bei Streit über Unfallfreiheit oder Laufleistung hilft nur eine anwaltliche Prüfung.",
      },
    ],
  text: `Kaufvertrag über ein Kraftfahrzeug (gewerblich)

zwischen

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Verkäufer“ –

und

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Käufer“ –

Vorbemerkung
Beide Parteien handeln als Unternehmer im Sinne des § 14 BGB. Das Fahrzeug gehört zum Betriebsvermögen des Verkäufers.

§ 1 Fahrzeug
Der Verkäufer verkauft dem Käufer das folgende Fahrzeug (nachfolgend „Fahrzeug“):
   Hersteller / Typ / Modell: [z. B. VW Transporter T6.1 Kasten 2.0 TDI]
   Fahrzeug-Identifizierungsnummer (FIN): [17 Zeichen]
   Amtliches Kennzeichen: [Kennzeichen]
   Erstzulassung: [Datum]
   Kilometerstand laut Tacho: [km] km (Stand [Datum])
   Hauptuntersuchung (HU) gültig bis: [Monat/Jahr]
   Kraftstoff / Antrieb: [Diesel / Benzin / Elektro / Hybrid], Leistung [kW]
   Farbe: [Farbe]
   Anzahl Vorbesitzer laut Zulassungsbescheinigung Teil II: [Anzahl]
   Getriebe: [manuell / automatisch]
   [Elektrofahrzeuge: Akkukapazität [kWh], Ladezustand/State of Health laut Herstellerdiagnose [%] vom [Datum]]

§ 2 Zubehör und Unterlagen
(1) Mitverkauft werden: [z. B. 2. Satz Reifen (Winter) auf Stahlfelgen, Anhängerkupplung, Dachträger, Ladekabel Typ 2, Trennwand, Regalsystem].
(2) Der Verkäufer übergibt bei der Übergabe: Zulassungsbescheinigung Teil I und Teil II, [Anzahl] Schlüssel, HU-Prüfbericht vom [Datum], Serviceheft / Nachweise der Wartungen, Bedienungsanleitung, [COC-Papier, Reparaturrechnungen der letzten [Anzahl] Jahre, Nachweis über Rückruf-Erledigungen].
(3) Nicht mitverkauft sind: [z. B. Firmenbeschriftung wird vor Übergabe entfernt, Telematikbox wird ausgebaut, Tankkarte verbleibt beim Verkäufer].

§ 3 Kaufpreis, Umsatzsteuer und Zahlung
(1) Der Kaufpreis beträgt [Betrag] EUR netto zuzüglich 19 % Umsatzsteuer ([Betrag] EUR), gesamt [Betrag] EUR brutto. Der Verkäufer stellt eine Rechnung mit gesondert ausgewiesener Umsatzsteuer aus.
[Alternative A – Differenzbesteuerung: Der Kaufpreis beträgt [Betrag] EUR. Das Fahrzeug unterliegt der Differenzbesteuerung nach § 25a UStG; Umsatzsteuer wird nicht gesondert ausgewiesen und ein Vorsteuerabzug des Käufers ist nicht möglich.]
[Alternative B – Kleinunternehmer: Der Kaufpreis beträgt [Betrag] EUR. Der Verkäufer ist Kleinunternehmer im Sinne des § 19 UStG; Umsatzsteuer wird nicht ausgewiesen.]
(2) Der Kaufpreis ist [bei Übergabe in bar / per Überweisung auf das Konto [IBAN] bis spätestens [Datum] / bei Übergabe per Echtzeitüberweisung] zu zahlen.
(3) Die Zulassungsbescheinigung Teil II und das Fahrzeug werden erst nach vollständigem Zahlungseingang herausgegeben. Bis dahin bleibt das Fahrzeug Eigentum des Verkäufers (Eigentumsvorbehalt).
(4) [Optional: Das Fahrzeug ist mit einem Restdarlehen bei [Bank/Leasinggeber] in Höhe von [Betrag] EUR belastet. Der Käufer zahlt diesen Betrag mit befreiender Wirkung direkt an [Bank] und den Restkaufpreis von [Betrag] EUR an den Verkäufer. Der Verkäufer stellt sicher, dass die Zulassungsbescheinigung Teil II nach Ablösung an den Käufer herausgegeben wird.]

§ 4 Erklärungen des Verkäufers
(1) Der Verkäufer erklärt, dass das Fahrzeug während seiner Besitzzeit
   a) [unfallfrei war / folgende Unfallschäden hatte: [Beschreibung, Datum, Reparaturkosten, Werkstatt]],
   b) [keine sonstigen Beschädigungen hatte / folgende Schäden hatte: [z. B. Hagelschaden, repariert am [Datum]]],
   c) nicht als Taxi, Mietwagen, Fahrschulwagen oder im Kurierdienst mit Mehrfahrerbetrieb genutzt wurde [bzw. genutzt wurde als: [Angabe]],
   d) der angegebene Kilometerstand nach seiner Kenntnis der tatsächlichen Gesamtfahrleistung entspricht [Ausnahme: Tachowechsel am [Datum] bei [km]].
(2) Über Unfälle und Schäden vor seiner Besitzzeit hat der Verkäufer [keine Kenntnis / folgende Kenntnis: [Angabe aus Vorbesitz, Gutachten, Historie]].
(3) Folgende Mängel sind dem Verkäufer bekannt und werden vom Käufer akzeptiert: [z. B. Steinschlag Windschutzscheibe außerhalb Sichtfeld, Kratzer Stoßstange hinten, Klimaanlage kühlt schwach, Fehlerspeicher-Eintrag [Code]].
(4) Die Angaben in Absatz 1 sind Beschaffenheitsvereinbarungen im Sinne des § 434 Abs. 2 BGB. Weitergehende Garantien übernimmt der Verkäufer nicht.

§ 5 Übergabe, Gefahrübergang und Eigentumsvorbehalt
(1) Die Übergabe erfolgt am [Datum] um [Uhrzeit] in [Ort, Adresse]. Der Kilometerstand bei Übergabe wird im Übergabeprotokoll festgehalten.
(2) Mit der Übergabe geht die Gefahr des zufälligen Untergangs und der Verschlechterung auf den Käufer über.
(3) Das Eigentum am Fahrzeug geht mit vollständiger Zahlung des Kaufpreises auf den Käufer über.
(4) Das Fahrzeug wird [mit amtlichem Kennzeichen zugelassen / abgemeldet mit Kurzzeitkennzeichen des Käufers] übergeben. Bei Übergabe mit Kennzeichen darf der Käufer das Fahrzeug nur zur unverzüglichen Ummeldung oder Abmeldung im Straßenverkehr nutzen.

§ 6 Ummeldung, Versicherung und Haftung ab Übergabe
(1) Der Käufer verpflichtet sich, das Fahrzeug unverzüglich, spätestens innerhalb von [z. B. 3] Werktagen nach Übergabe, auf sich umzumelden oder abzumelden und dem Verkäufer eine Kopie der neuen Zulassungsbescheinigung Teil I bzw. der Abmeldebestätigung zu übersenden.
(2) Der Verkäufer zeigt den Verkauf unverzüglich der Zulassungsstelle und seiner Kfz-Versicherung an (Veräußerungsanzeige) und übermittelt dafür Name, Anschrift und Datum der Übergabe des Käufers.
(3) Ab dem Zeitpunkt der Übergabe trägt der Käufer alle Kosten, Gebühren, Bußgelder, Steuern und Versicherungsbeiträge, die das Fahrzeug betreffen. Er stellt den Verkäufer von allen Ansprüchen Dritter frei, die aus der Nutzung des Fahrzeugs nach Übergabe entstehen, einschließlich Verwarnungs- und Bußgeldern, Maut- und Parkgebühren.
(4) Die bestehende Kfz-Haftpflichtversicherung des Verkäufers geht nach den gesetzlichen Regeln vorläufig auf den Käufer über (§ 95 VVG); Prämien ab Übergabe trägt der Käufer im Innenverhältnis.

§ 7 Gewährleistung und Haftung
(1) Das Fahrzeug wird als Gebrauchtfahrzeug verkauft. Die Gewährleistung für Sachmängel wird [ausgeschlossen / auf 12 Monate ab Übergabe verkürzt].
(2) Der Ausschluss bzw. die Verkürzung gilt nicht für die Beschaffenheitsvereinbarungen in § 4 Abs. 1, für arglistig verschwiegene Mängel, für Ansprüche aus der Verletzung von Leben, Körper oder Gesundheit sowie bei Vorsatz oder grober Fahrlässigkeit des Verkäufers.
(3) Verschleißteile (insbesondere Bremsen, Reifen, Kupplung, Batterie, Beleuchtungsmittel) sowie Mängel, die auf unsachgemäße Nutzung nach Übergabe zurückzuführen sind, begründen keine Ansprüche.
(4) Eine etwaige noch laufende Herstellergarantie oder Anschlussgarantie geht auf den Käufer über, soweit die Garantiebedingungen dies zulassen; der Verkäufer übergibt die Garantieunterlagen.

§ 8 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
(4) Gerichtsstand für Streitigkeiten aus diesem Vertrag ist [Ort], soweit beide Parteien Kaufleute sind.
(5) Das Übergabeprotokoll ist Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Firma Verkäufer], vertreten durch [Vorname Nachname]


______________________________
[Firma Käufer], vertreten durch [Vorname Nachname]


Übergabeprotokoll
Fahrzeug: [Hersteller/Modell], FIN [Nummer]
Übergabe am [Datum] um [Uhrzeit] in [Ort]
Kilometerstand bei Übergabe: [km] km
Tankfüllung / Ladezustand: [z. B. 1/2 / 80 %]
Übergeben: [ ] Zulassungsbescheinigung Teil I  [ ] Zulassungsbescheinigung Teil II  [ ] [Anzahl] Schlüssel  [ ] HU-Bericht  [ ] Serviceheft  [ ] Zubehör gemäß § 2
Sichtbare Schäden bei Übergabe (Fotos als Anlage): [Beschreibung]
Kaufpreis erhalten am [Datum]: [ ] ja, vollständig  [ ] Restbetrag [Betrag] EUR offen bis [Datum]


______________________________                ______________________________
Verkäufer                                      Käufer

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
