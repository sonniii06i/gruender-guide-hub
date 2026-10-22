// Inhalt der Vorlage „kaufvertrag-maschine“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../kauf.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Kaufvertrag für eine gebrauchte Maschine brauchst",
        text: "Gebrauchte Maschinen sind für Gründer im Handwerk und in der Produktion oft der einzige bezahlbare Einstieg: die CNC-Fräse aus einer Betriebsauflösung, die Verpackungslinie eines Herstellers, der umstellt, der Laserschneider aus der Nachbarwerkstatt. Der Preis ist niedrig, das Risiko hoch, weil du die Maschine ausbauen, transportieren und wieder in Betrieb nehmen musst und dabei an vielen Stellen etwas schiefgehen kann.\n\nDiese Vorlage ist auf diesen Ablauf zugeschnitten: Probelauf und Abnahme beim Verkäufer vor Zahlung des Restkaufpreises, klare Zuordnung von Demontage, Verladung und Transport, vollständige Dokumentation und eine begrenzte Gewährleistung. Sie passt für Produktionsmaschinen, Anlagen, Werkstattausrüstung und Druckmaschinen zwischen Unternehmern. Für kleinere Geräte ohne Probelauf reicht der B2B-Kaufvertrag, für ein ganzes Inventarpaket der Inventar-Kaufvertrag.",
      },
      {
        titel: "Was muss in einen Maschinenkaufvertrag? Spezifikation, Probelauf, Abnahme",
        text: "Eine Maschine wird über ihre technischen Daten und ihre Leistung definiert, nicht über den Typ allein. Die Vorlage verlangt deshalb in § 1 Hersteller, Seriennummer, Baujahr, Betriebsstunden, Anschlusswerte, Abmessungen, Steuerung und Software sowie Umbauten und bekannte Mängel. Darüber hinaus gehören hinein:\n\n- Kaufpreis mit Lieferbedingung (ab Standort, inklusive Verladung oder Demontage) und Zahlungsplan mit Anzahlung und Rest nach Abnahme (§ 2)\n- Probelauf unter Betriebsbedingungen mit eigenem Material des Käufers und messbaren Abnahmekriterien in Anlage 1 (§ 3)\n- Nachbesserungsrecht, zweiter Probelauf, Rücktritt und Rückzahlung der Anzahlung (§ 3 Abs. 4)\n- Demontage, Verladung, Transportversicherung, Trennung von Medien, Entsorgung der Betriebsstoffe (§ 4)\n- Betriebsanleitung, Konformitätserklärung, Pläne, Wartungsnachweise, Software-Lizenzen (§ 5)\n- Gefahrübergang mit Demontagebeginn, Eigentumsvorbehalt bis zur Zahlung (§ 6)\n- Gewährleistung auf die Abnahmekriterien und Angaben in § 1, im Übrigen begrenzt oder ausgeschlossen (§ 7)\n- Haftungsbegrenzung und Betreiberverantwortung nach Übergabe (§ 8)\n- Abnahmeprotokoll mit Soll- und Istwerten",
      },
      {
        titel: "Maschinenkaufvertrag Muster ausfüllen: so legst du Abnahmekriterien fest",
        text: "Fülle zuerst § 1 mit den Daten vom Typenschild und aus der Maschinendokumentation: Seriennummer, Baujahr, Betriebsstunden mit Ablesedatum, Anschlusswerte, Gewicht. Frage ausdrücklich nach Umbauten und trage sie mit Datum und Ausführendem ein. Dann die Anlage 1: Lege dort messbare Abnahmekriterien fest, etwa Taktzeit in Sekunden, Toleranz am Prüfteil in Millimetern, Dauerlauf in Stunden ohne Störung. Ohne Zahlen ist der Probelauf nicht überprüfbar.\n\nIn § 2 wählst du die Lieferbedingung und die Aufteilung der Zahlung, üblich sind 30 Prozent Anzahlung und 70 Prozent nach Abnahme. In § 3 trägst du Datum des Probelaufs und die Frist ein, bis zu der du Material und Programme bereitstellst. In § 4 entscheidest du je Satz, wer demontiert, verlädt, Medien trennt und Betriebsstoffe entsorgt; die Klausel zur Transportversicherung über den Kaufpreis bleibt stehen. In § 5 kreuzt du an, ob eine Konformitätserklärung vorhanden ist und ob die Maschine CE-gekennzeichnet ist. In § 7 Abs. 2 wählst du zwischen Ausschluss und einer Gewährleistung von wenigen Monaten. Beim Probelauf füllt ihr gemeinsam das Abnahmeprotokoll mit Soll- und Istwerten aus.",
      },
      {
        titel: "Typische Fehler beim Maschinenkauf und wie du sie vermeidest",
        text: "Der häufigste Fehler ist der Probelauf im Leerlauf. Eine Maschine, die ohne Material läuft, beweist nichts über Toleranzen und Taktzeit; bring eigene Werkstücke und Programme mit, so wie § 3 Abs. 1 es vorsieht. Zweiter Fehler: Restkaufpreis erst nach Wiederaufbau beim Käufer. Dann streitet ihr, ob der Fehler aus dem Transport, der Montage oder der Maschine stammt; die Vorlage legt die Abnahme deshalb an den Standort des Verkäufers.\n\nDritter Fehler: Demontage ohne Fachfirma. Kranarbeiten, Fundamentlösen und Hydraulik sind Haftungsfallen, und Schäden an der Halle des Verkäufers trägt, wer die Arbeit ausführt (§ 4 Abs. 3). Vierter Fehler: keine Betriebsanleitung in deutscher Sprache. Als Betreiber brauchst du sie für Gefährdungsbeurteilung und Unterweisung; fehlt sie, musst du sie teuer erstellen lassen. Fünfter Fehler: Steuerungssoftware übersehen. Viele Hersteller binden Lizenzen an den Erstkäufer; frage vor Vertragsschluss beim Hersteller nach den Umschreibungsgebühren, die nach § 5 Abs. 3 der Käufer trägt.",
      },
      {
        titel: "Rechtliche Grundlagen: Gewährleistung, Gefahrübergang, CE und Betriebssicherheit",
        text: "Der Maschinenkauf ist ein Kauf beweglicher Sachen nach §§ 433 ff. BGB zwischen Unternehmern; die Rügepflicht des § 377 HGB gilt, die Vorlage verweist in § 7 Abs. 5 darauf. Die Abnahmekriterien und die Angaben in § 1 sind Beschaffenheitsvereinbarungen nach § 434 BGB. Für alles andere darf die Gewährleistung unter Unternehmern bei individueller Vereinbarung begrenzt oder ausgeschlossen werden, mit den Grenzen des § 444 BGB für Arglist und Garantien sowie den Grenzen für Vorsatz, grobe Fahrlässigkeit und Personenschäden.\n\nDie Gefahr geht gesetzlich mit Übergabe über (§ 446 BGB); die Vorlage legt sie auf den Beginn der Demontage, weil ab dann der Käufer die Kontrolle hat. Der Eigentumsvorbehalt nach § 449 BGB sichert den Verkäufer. Produktsicherheitsrechtlich gilt: Der Weiterverkauf einer gebrauchten Maschine innerhalb der EU ist kein neues Inverkehrbringen, deshalb ist keine neue CE-Kennzeichnung nötig. Der Käufer muss die Maschine aber als Betreiber nach der Betriebssicherheitsverordnung sicher betreiben, also Gefährdungsbeurteilung, Prüfungen und Schutzeinrichtungen verantworten. Wer eine Maschine wesentlich verändert, kann selbst zum Hersteller werden und eine Konformitätsbewertung schulden; deshalb fragt § 1 Abs. 3 nach Umbauten.",
      },
      {
        titel: "Wann der Maschinenkaufvertrag aus der Vorlage nicht reicht",
        text: "Kaufst du die Maschine im Ausland, kommen UN-Kaufrecht, Incoterms, Zoll und bei Drittstaaten die Pflichten des Importeurs hinzu; dann sollte ein Anwalt den Vertrag anpassen. Beim Kauf aus einer Insolvenz verkauft der Verwalter meist ohne Gewährleistung und ohne Probelauf; dann ersetzt ein eigenes Sachverständigengutachten den § 3. Bei Maschinen mit Finanzierung oder Leasing beim Verkäufer braucht ihr die Ablösebestätigung der Bank, bevor Eigentum übergehen kann.\n\nSoll der Verkäufer die Maschine auch beim Käufer aufstellen und in Betrieb nehmen, ist das ein zusätzlicher Werkvertrag mit eigener Abnahme; die Vorlage sieht nur optionale Unterstützungstage vor. Für Anlagen mit Druckbehältern, Lasern oder Kranen gelten zusätzliche Prüfpflichten vor der ersten Nutzung. Steuerlich klärt der Steuerberater, ob der Kauf als Teil einer Geschäftsveräußerung im Ganzen umsatzsteuerfrei ist. GründerX ist Software und bietet Muster, keine Rechtsberatung; bei hohen Kaufpreisen lohnt die anwaltliche Prüfung vor Unterschrift.",
      },
    ],
  text: `Kaufvertrag über eine gebrauchte Maschine / Anlage

zwischen

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Verkäufer“ –

und

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Käufer“ –

Vorbemerkung
Beide Parteien handeln als Unternehmer. Der Verkäufer betreibt die nachfolgend bezeichnete Maschine in seinem Betrieb in [Adresse] und veräußert sie an den Käufer, der sie in seinem Betrieb in [Adresse] weiterbetreiben will.

§ 1 Kaufgegenstand und technische Spezifikation
(1) Der Verkäufer verkauft dem Käufer die folgende gebrauchte Maschine (nachfolgend „Maschine“):
   Hersteller / Typ: [Hersteller, Typenbezeichnung]
   Maschinen- / Seriennummer: [Nummer]
   Baujahr: [Jahr]
   Betriebsstunden laut Zähler: [Stunden] (Stand [Datum])
   Standort: [Adresse, Halle, Fundament]
   Anschlusswerte: [z. B. 400 V / 32 A, Druckluft 6 bar, Wasseranschluss]
   Abmessungen / Gewicht: [L x B x H in m, kg]
   Steuerung / Software: [Steuerung, Softwareversion, Lizenz]
(2) Mitverkauft sind folgendes Zubehör, Werkzeuge und Ersatzteile: [z. B. Werkzeugsatz, Spannmittel, Absauganlage, Ersatzteile laut Anlage 2].
(3) Die vereinbarte Beschaffenheit ergibt sich abschließend aus Absatz 1, Anlage 1 (technische Spezifikation und Abnahmekriterien) und dem Ergebnis des Probelaufs nach § 3. Umbauten und wesentliche Veränderungen gegenüber dem Auslieferungszustand des Herstellers: [keine / folgende: [Beschreibung, Datum, Ausführender]].
(4) Dem Verkäufer bekannte Mängel und Einschränkungen: [z. B. Spindellager ab 8.000 U/min hörbar, Achse Y Umkehrspiel 0,03 mm, Schutzhaube links Riss].

§ 2 Kaufpreis und Zahlungsplan
(1) Der Kaufpreis beträgt [Betrag] EUR netto zuzüglich 19 % Umsatzsteuer, gesamt [Betrag] EUR brutto, [ab Standort des Verkäufers (ex works, unverladen) / einschließlich Verladung / einschließlich Demontage und Verladung].
(2) Zahlung:
   a) [z. B. 30] % ([Betrag] EUR) als Anzahlung innerhalb von [z. B. 5] Werktagen nach Vertragsschluss,
   b) [z. B. 70] % ([Betrag] EUR) innerhalb von [z. B. 5] Werktagen nach erfolgreicher Abnahme gemäß § 3, in jedem Fall vor Beginn der Demontage.
(3) Zahlungen erfolgen per Überweisung auf das Konto [IBAN], [Bank]. Bei Verzug gelten Zinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB).

§ 3 Probelauf und Abnahme
(1) Der Verkäufer führt die Maschine am [Datum] am Standort des Verkäufers im Beisein des Käufers unter Betriebsbedingungen vor (Probelauf). Der Käufer darf eigenes Material und eigene Programme/Werkstücke einsetzen; er stellt diese bis zum [Datum] bereit.
(2) Die Abnahme gilt als erfolgreich, wenn die in Anlage 1 festgelegten Abnahmekriterien erreicht werden, insbesondere: [z. B. Taktzeit max. [Sekunden], Toleranz [mm] bei Prüfteil, Dauerlauf [Stunden] ohne Störung, Dokumentation vollständig].
(3) Über den Probelauf wird ein Abnahmeprotokoll gefertigt und von beiden Parteien unterzeichnet. Geringfügige Mängel, die die Nutzung nicht wesentlich beeinträchtigen, hindern die Abnahme nicht; sie werden im Protokoll festgehalten und vom Verkäufer bis zum [Datum / vor Demontage] beseitigt.
(4) Werden die Abnahmekriterien nicht erreicht, kann der Verkäufer innerhalb von [z. B. 14] Tagen nachbessern und einen zweiten Probelauf anbieten. Scheitert auch dieser, kann der Käufer vom Vertrag zurücktreten; die Anzahlung wird innerhalb von [z. B. 10] Tagen zurückgezahlt. Weitergehende Ansprüche bestehen nur nach Maßgabe des § 8.
(5) Nimmt der Käufer am vereinbarten Termin ohne wichtigen Grund nicht teil und holt den Termin nicht innerhalb von [z. B. 14] Tagen nach, gilt die Maschine als abgenommen.

§ 4 Demontage, Verladung und Transport
(1) Die Demontage erfolgt durch [den Käufer bzw. ein von ihm beauftragtes Fachunternehmen / den Verkäufer] zwischen dem [Datum] und dem [Datum]. Der Verkäufer gewährt Zugang zu den Räumen, Strom, Druckluft und, soweit vorhanden, Hallenkran und Stapler [gegen / ohne] Kostenerstattung.
(2) Die Verladung erfolgt durch [den Käufer / den Verkäufer]. Der Transport ab Laderampe des Verkäufers ist Sache des Käufers. Der Käufer schließt eine Transportversicherung über den Kaufpreis ab.
(3) Schäden an Gebäude, Fundament, Versorgungsleitungen oder anderen Anlagen des Verkäufers, die bei Demontage und Verladung entstehen, ersetzt diejenige Partei, die die jeweilige Arbeit ausführt oder beauftragt hat.
(4) Der Verkäufer trennt die Maschine vor Demontage von Strom, Druckluft, Wasser und Netzwerk und entleert Betriebsstoffe (Öl, Kühlschmierstoff) [auf seine Kosten / auf Kosten des Käufers]. Die Entsorgung der Betriebsstoffe übernimmt [der Verkäufer / der Käufer].
(5) Der Wiederaufbau und die Inbetriebnahme beim Käufer sind nicht Gegenstand dieses Vertrags. [Optional: Der Verkäufer stellt für [Anzahl] Tage einen Mitarbeiter zur Unterstützung der Inbetriebnahme gegen [Betrag] EUR je Tag zuzüglich Reisekosten zur Verfügung.]

§ 5 Dokumentation, CE-Kennzeichnung und Betriebsanleitung
(1) Der Verkäufer übergibt bei Abnahme folgende Unterlagen: Betriebsanleitung in deutscher Sprache, EG-/EU-Konformitätserklärung [vorhanden / nicht vorhanden, Baujahr vor Geltung der Maschinenrichtlinie], Schalt- und Hydraulikpläne, Wartungs- und Prüfnachweise der letzten [Anzahl] Jahre, Ersatzteilliste, Softwaredatenträger und Lizenznachweise, Programme und Parametersätze [auf Datenträger].
(2) Die Maschine trägt [eine CE-Kennzeichnung des Herstellers vom [Jahr] / keine CE-Kennzeichnung]. Der Verkäufer erklärt, dass er an der Maschine [keine / die in § 1 Abs. 3 genannten] wesentlichen Veränderungen vorgenommen hat. Für die Einhaltung der Anforderungen der Betriebssicherheitsverordnung beim Betrieb nach Übergabe (Gefährdungsbeurteilung, Prüfungen, Schutzeinrichtungen) ist ausschließlich der Käufer als Betreiber verantwortlich.
(3) Software und Steuerungsprogramme werden übertragen, soweit die Lizenzbedingungen des Herstellers dies zulassen. Der Verkäufer unterstützt den Käufer bei der Umschreibung von Lizenzen; Gebühren des Herstellers trägt der Käufer.

§ 6 Gefahrübergang und Eigentumsvorbehalt
(1) Die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung geht mit Beginn der Demontage, spätestens mit Verladung, auf den Käufer über. Führt der Verkäufer die Demontage durch, geht die Gefahr mit Verladung auf das Transportmittel des Käufers über.
(2) Die Maschine bleibt bis zur vollständigen Zahlung des Kaufpreises Eigentum des Verkäufers. Vor vollständiger Zahlung beginnt keine Demontage.

§ 7 Gewährleistung (begrenzt)
(1) Die Maschine wird als gebrauchte Maschine verkauft. Der Verkäufer gewährleistet, dass die Maschine bei Abnahme die in Anlage 1 festgelegten Abnahmekriterien erfüllt und die Angaben in § 1 Abs. 1 zutreffen.
(2) Darüber hinaus wird die Gewährleistung für Sachmängel [ausgeschlossen / auf [z. B. 6] Monate ab Abnahme beschränkt und auf Nachbesserung begrenzt; schlägt die Nachbesserung zweimal fehl, kann der Käufer mindern oder zurücktreten].
(3) Verschleißteile, Betriebsstoffe, Mängel infolge unsachgemäßer Demontage, Transport, Wiederaufbau, Inbetriebnahme oder Bedienung durch den Käufer sowie Abweichungen, die auf andere Aufstell- und Umgebungsbedingungen beim Käufer zurückzuführen sind, sind von der Gewährleistung ausgenommen.
(4) Der Ausschluss bzw. die Begrenzung gilt nicht bei arglistig verschwiegenen Mängeln, bei Vorsatz oder grober Fahrlässigkeit sowie für Schäden aus der Verletzung von Leben, Körper oder Gesundheit.
(5) Der Käufer hat Mängel unverzüglich nach Entdeckung in Textform anzuzeigen (§ 377 HGB).

§ 8 Haftung
(1) Der Verkäufer haftet unbeschränkt für Vorsatz, grobe Fahrlässigkeit, Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie nach dem Produkthaftungsgesetz.
(2) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten haftet der Verkäufer nur für den vertragstypischen, vorhersehbaren Schaden, höchstens bis zur Höhe des Netto-Kaufpreises. Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen, insbesondere für Produktionsausfall, entgangenen Gewinn und Folgeschäden.
(3) Für Schäden, die beim Betrieb der Maschine nach Übergabe entstehen, haftet der Verkäufer nicht; der Käufer stellt den Verkäufer von Ansprüchen Dritter insoweit frei.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], soweit beide Parteien Kaufleute sind.
(4) Anlagen: Anlage 1 – Technische Spezifikation und Abnahmekriterien; Anlage 2 – Zubehör- und Ersatzteilliste; Anlage 3 – Übersicht der übergebenen Dokumentation. Die Anlagen sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Firma Verkäufer], vertreten durch [Vorname Nachname]


______________________________
[Firma Käufer], vertreten durch [Vorname Nachname]


Abnahmeprotokoll
Maschine: [Hersteller/Typ], Seriennummer [Nummer]
Probelauf am [Datum] von [Uhrzeit] bis [Uhrzeit] in [Ort]
Eingesetztes Material / Prüfteil: [Angabe]
Abnahmekriterium 1: [Kriterium] – Sollwert [Wert] – Istwert [Wert] – [ ] erfüllt [ ] nicht erfüllt
Abnahmekriterium 2: [Kriterium] – Sollwert [Wert] – Istwert [Wert] – [ ] erfüllt [ ] nicht erfüllt
Dokumentation gemäß § 5 übergeben: [ ] vollständig  [ ] es fehlt: [Angabe]
Festgestellte geringfügige Mängel (Beseitigung bis [Datum]): [Angabe]
Ergebnis: [ ] Abnahme erklärt  [ ] Abnahme verweigert, zweiter Probelauf am [Datum]


______________________________                ______________________________
Verkäufer                                      Käufer

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
