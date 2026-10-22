// Inhalt der Vorlage „lizenzvertrag-software“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../geheimhaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Software-Lizenzvertrag brauchst",
        text: `Sobald du Software nicht als Cloud-Dienst betreibst, sondern Unternehmen zur Installation überlässt, brauchst du einen Lizenzvertrag. Das gilt für Desktop-Programme, Server-Software, On-Premise-Installationen, Plugins und Erweiterungen genauso wie für eine Bibliothek, die ein Kunde in sein eigenes System einbaut. Ohne Vertrag gilt die Zweckübertragungsregel des Urheberrechts, und der Kunde weiß nicht, wie viele Nutzer er anlegen, ob er die Software weiterverkaufen und was er bei Fehlern verlangen darf.

Die Vorlage ist für den B2B-Fall gedacht: Lizenzgeber und Lizenznehmer sind Unternehmen, die Lizenz ist nicht-exklusiv, und du kannst dieselbe Software an beliebig viele Kunden lizenzieren. Sie funktioniert als Einzelvertrag oder als Anlage zu Angebot und AGB. Für Software, die du im Kundenauftrag entwickelst und mit allen Rechten übergibst, nimm den Software-Entwicklungsvertrag; für Endverbraucher brauchst du andere Regeln, insbesondere ohne die Haftungs- und Gewährleistungsverkürzungen dieser Vorlage.`,
      },
      {
        titel: "Was muss in einen Lizenzvertrag für Software?",
        text: `Das Muster regelt die Punkte, über die Anbieter und Kunden später am häufigsten streiten:

- § 1 Vertragsgegenstand: Produktname, Version, Leistungsbeschreibung in Anlage 1, Lieferweg, Systemvoraussetzungen, Quellcode ausdrücklich ausgenommen.
- § 2 Lizenzumfang: nicht ausschließlich, nicht übertragbar, Zahl der benannten Nutzer und Installationen, Standorte, Gebiet, verbundene Unternehmen, Verbot der Nutzung für Dritte als Service.
- § 3 Beschränkungen und die gesetzlichen Mindestrechte nach §§ 69d, 69e UrhG, die du nicht ausschließen kannst, mit Varianten zur Weiterveräußerung.
- § 4 Laufzeit als Dauerlizenz (Variante A) oder Laufzeitlizenz mit Verlängerung (Variante B), Folgen des Vertragsendes, Datenexport.
- § 5 Vergütung: Einmalgebühr oder Monatsgebühr, Wartungsgebühr, Preisanpassung, Verzug und Sperrrecht.
- § 6 Updates, Upgrades und Support mit Reaktionszeiten.
- § 7 Gewährleistung mit Untersuchungs- und Rügepflicht nach § 377 HGB und Nacherfüllung.
- § 8 Haftung mit den üblichen Begrenzungen bei leichter Fahrlässigkeit.
- § 9 Audit und Lizenznachweis mit Schutz des Lizenznehmers.
- § 10 Geheimhaltung, Auftragsverarbeitung, Freistellung bei Schutzrechten Dritter, Open-Source-Liste.
- § 11 Schriftform, Rechtswahl, Gerichtsstand, Anlagen.

Die Anlagen sind kein Beiwerk: Ohne Leistungsbeschreibung gibt es keinen Maßstab für Mängel, ohne Preisliste keinen Anspruch auf Gebühren für zusätzliche Nutzer.`,
      },
      {
        titel: "Lizenzvertrag Muster ausfüllen: Varianten und Platzhalter",
        text: `Lade die Vorlage kostenlos als Word oder PDF herunter. Die wichtigste Entscheidung triffst du in § 4: Dauerlizenz gegen Einmalzahlung oder Laufzeitlizenz gegen laufende Gebühr. Streiche die jeweils andere Variante konsequent in § 3 Abs. 1, § 4, § 5 Abs. 1 und § 7 Abs. 4, denn die Varianten verweisen aufeinander.

In § 1 trägst du Produktname, Version, Lieferweg und Liefertermin ein und legst die Leistungsbeschreibung als Anlage 1 bei; bei Installationsleistungen den Stundensatz. In § 2 bestimmst du die Zahl der benannten Nutzer, die Installationen, Standorte und das Gebiet und legst fest, wie oft ein benannter Nutzer gewechselt werden darf. In § 5 setzt du Gebühren, Zahlungsrhythmus, Preisanpassung und Sperrfrist ein, in § 6 Supportzeiten und Reaktionszeiten, die du auch wirklich halten kannst.

In § 8 legst du die Haftungsobergrenze fest, üblicherweise die Vergütung der letzten zwölf Monate. In § 9 Ankündigungsfrist und Toleranzschwelle für das Audit. In § 10 trägst du die Open-Source-Komponenten in Anlage 4 ein; die Liste solltest du aus deiner Abhängigkeitsverwaltung generieren. Zum Schluss Gerichtsstand, Ort, Datum und Unterschriften.`,
      },
      {
        titel: "Typische Fehler bei Software-Lizenzen",
        text: `Erstens: ein Weiterverkaufsverbot bei der Dauerlizenz. Wird Software gegen Einmalzahlung unbefristet überlassen, ist das Verbreitungsrecht an dieser Kopie erschöpft, und der Kunde darf sie weiterverkaufen. Ein Verbot ist unwirksam und macht einen schlechten Eindruck. Die Vorlage lässt die Weiterveräußerung bei Variante A unter Bedingungen zu und schließt sie nur bei der Laufzeitlizenz aus.

Zweitens: gesetzliche Mindestrechte ausschließen. Sicherungskopie, Beobachten des Programmablaufs und Dekompilierung zur Interoperabilität stehen dem Nutzer zu, egal was im Vertrag steht. Klauseln, die das verbieten, sind nichtig.

Drittens: Support ohne Grenzen. Wer „Support“ zusagt, ohne Zeiten, Kanäle und Reaktionszeiten zu nennen, schuldet im Zweifel mehr, als er leisten kann. § 6 der Vorlage grenzt ein und schließt Fehlbedienung und Fremdsoftware aus.

Viertens: Audit-Klauseln, die jederzeit und unbegrenzt gelten. Solche Klauseln kippen in AGB; die Vorlage begrenzt auf begründeten Verdacht, Ankündigung, Geschäftszeiten und einen verschwiegenen Dritten.

Fünftens: Datenschutz vergessen. Hast du beim Support Zugriff auf personenbezogene Daten des Kunden, ist ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO Pflicht.`,
      },
      {
        titel: "Rechtliche Grundlagen: Urheberrecht, Kauf oder Miete, Gewährleistung",
        text: `Software ist nach § 69a UrhG als Sprachwerk geschützt. Die Rechte des Urhebers (Vervielfältigung, Bearbeitung, Verbreitung, öffentliche Zugänglichmachung) stehen in § 69c UrhG; die Erschöpfung des Verbreitungsrechts bei verkauften Kopien in § 69c Nr. 3 UrhG. Die §§ 69d und 69e UrhG enthalten die Mindestrechte des Nutzers, und § 69g Abs. 2 UrhG erklärt Vertragsklauseln für nichtig, die Sicherungskopie, Programmbeobachtung und Interoperabilitäts-Dekompilierung ausschließen.

Für die Vertragsart gilt: Die Dauerlizenz gegen Einmalzahlung wird wie ein Kauf behandelt, Mängelrechte richten sich nach §§ 434 ff. BGB mit zweijähriger Verjährung, die im B2B-Verhältnis auf ein Jahr verkürzt werden darf. Die Laufzeitlizenz gegen laufende Gebühr ist Miete nach §§ 535 ff. BGB; die verschuldensunabhängige Haftung für anfängliche Mängel nach § 536a Abs. 1 BGB darf unter Unternehmern ausgeschlossen werden, was die Vorlage tut.

Zwischen Kaufleuten gilt die Rügepflicht des § 377 HGB: Wer Mängel nicht unverzüglich anzeigt, verliert seine Rechte. Die Haftungsklausel in § 8 folgt der Rechtsprechung zu wesentlichen Vertragspflichten (Kardinalpflichten), weil ein vollständiger Haftungsausschluss auch unter Unternehmern unwirksam wäre.`,
      },
      {
        titel: "Wann das Lizenzvertrag Muster nicht reicht",
        text: `Die Vorlage ist für Standardsoftware zwischen deutschen Unternehmen gemacht. Für SaaS-Angebote, bei denen du die Software selbst hostest, brauchst du einen Vertrag mit Verfügbarkeitszusagen, Datenhoheit und Auftragsverarbeitung im Mittelpunkt; die White-Label-Vereinbarung in dieser Bibliothek enthält in Variante B einen solchen Teil. Für Verkäufe an Verbraucher gelten die §§ 327 ff. BGB über digitale Produkte mit zwingenden Update- und Gewährleistungspflichten, die dieses Muster nicht abbildet.

Lizenzen an Kunden im Ausland, exklusive Vertriebsrechte für ein Gebiet, Escrow-Vereinbarungen zur Quellcode-Hinterlegung, OEM-Lizenzen mit Weitervertrieb und Verträge mit Konzernen, die eigene Einkaufsbedingungen durchsetzen, solltest du von einer auf IT-Recht spezialisierten Kanzlei prüfen lassen. Gleiches gilt, wenn deine Software Copyleft-Komponenten unter GPL oder AGPL enthält, denn dann kann die Lizenz an deinen Kunden mit den Open-Source-Bedingungen kollidieren.

GründerX ist eine Software für Gründer und keine Rechtsberatung. Die Vorlage gibt dir einen marktüblichen Rahmen; bei hohen Lizenzsummen oder Haftungsrisiken lohnt die anwaltliche Durchsicht vor der ersten Unterschrift.`,
      },
    ],
  text: `Software-Lizenzvertrag

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Lizenzgeber“ –

und

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Lizenznehmer“ –

– gemeinsam „die Parteien“ –

§ 1 Vertragsgegenstand und Lieferung
(1) Gegenstand dieses Vertrags ist die Überlassung der Software „[Produktname]“ in der Version [Version] (nachfolgend „Software“) einschließlich der Benutzerdokumentation zur Nutzung durch den Lizenznehmer. Die Funktionen der Software ergeben sich abschließend aus der Leistungsbeschreibung in Anlage 1.
(2) Die Software wird im Objektcode [als Download über [URL] / auf Datenträger / durch Installation auf Systemen des Lizenznehmers] bereitgestellt. Der Quellcode ist nicht Vertragsgegenstand.
(3) Die Lieferung erfolgt bis zum [Datum]. Installation, Konfiguration, Schulung und Anpassungen sind nicht geschuldet, soweit sie nicht in Anlage 1 vereinbart sind; sie werden nach Aufwand zu [Betrag] EUR je Stunde zuzüglich Umsatzsteuer vergütet.
(4) Systemvoraussetzungen (Betriebssystem, Hardware, Datenbank, Drittsoftware) sind in Anlage 1 beschrieben. Der Lizenznehmer stellt diese Umgebung auf eigene Kosten bereit.

§ 2 Lizenzumfang
(1) Der Lizenzgeber räumt dem Lizenznehmer das nicht ausschließliche, nicht übertragbare, nicht unterlizenzierbare Recht ein, die Software im vereinbarten Umfang für eigene geschäftliche Zwecke zu nutzen.
(2) Der Nutzungsumfang beträgt: [Anzahl] benannte Nutzer (Named User) und [Anzahl] Installationen auf [Arbeitsplätzen / Servern] an den Standorten [Orte]. Ein benannter Nutzer darf höchstens [einmal je Quartal] durch einen anderen ersetzt werden. Eine Erweiterung ist jederzeit gegen die in Anlage 2 genannten Gebühren möglich.
(3) Die Nutzung ist räumlich auf [Deutschland / die EU / weltweit] beschränkt. Die Nutzung durch verbundene Unternehmen im Sinne des § 15 AktG ist [nicht gestattet / gestattet, soweit sie in Anlage 2 aufgeführt sind].
(4) Die Lizenz umfasst das Recht, die Software zu installieren, in den Arbeitsspeicher zu laden, ablaufen zu lassen und anzuzeigen, soweit dies zur bestimmungsgemäßen Nutzung erforderlich ist, sowie eine Sicherungskopie anzufertigen, die als solche zu kennzeichnen ist.
(5) Eine Nutzung der Software zur Erbringung von Dienstleistungen für Dritte (Rechenzentrumsbetrieb, Service-Büro, Software as a Service) ist nur mit gesonderter schriftlicher Vereinbarung zulässig.

§ 3 Beschränkungen und gesetzliche Mindestrechte
(1) Der Lizenznehmer darf die Software nicht vermieten, verleihen, unterlizenzieren, öffentlich zugänglich machen oder Dritten in sonstiger Weise überlassen. [Nur bei Laufzeitlizenz nach § 4 Variante B: Eine Weiterveräußerung ist ausgeschlossen.] [Nur bei Dauerlizenz nach § 4 Variante A: Eine Weiterveräußerung der Software ist zulässig, wenn der Lizenznehmer die Nutzung vollständig einstellt, alle Kopien löscht, der Erwerber diesen Vertragsbedingungen zustimmt und der Lizenzgeber über den Erwerber informiert wird.]
(2) Der Lizenznehmer darf die Software nicht bearbeiten, übersetzen, dekompilieren oder zurückentwickeln und keine Urheberrechtsvermerke, Seriennummern oder Lizenzschlüssel entfernen oder verändern.
(3) Die gesetzlichen Mindestrechte des Lizenznehmers aus §§ 69d und 69e UrhG (insbesondere Fehlerberichtigung im Rahmen der bestimmungsgemäßen Nutzung, Sicherungskopie, Beobachtung des Programmablaufs und Dekompilierung zur Herstellung der Interoperabilität) bleiben unberührt. Vor einer Dekompilierung wird der Lizenznehmer die erforderlichen Schnittstelleninformationen beim Lizenzgeber anfordern, der sie innerhalb von [z. B. 4] Wochen zur Verfügung stellt.

§ 4 Laufzeit und Kündigung
[Variante A – Dauerlizenz:]
(1) Das Nutzungsrecht wird zeitlich unbefristet eingeräumt. Es wird mit vollständiger Zahlung der Lizenzgebühr nach § 5 wirksam.
(2) Der Lizenzgeber kann das Nutzungsrecht aus wichtigem Grund außerordentlich kündigen, insbesondere wenn der Lizenznehmer den Lizenzumfang trotz Abmahnung überschreitet oder gegen § 3 verstößt.
[Variante B – Laufzeitlizenz:]
(1) Der Vertrag beginnt am [Datum] und läuft [z. B. 12] Monate. Er verlängert sich jeweils um [z. B. 12] Monate, wenn er nicht mit einer Frist von [z. B. 3] Monaten zum Ende der jeweiligen Laufzeit schriftlich gekündigt wird.
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt für den Lizenzgeber insbesondere vor, wenn der Lizenznehmer mit zwei Monatsgebühren in Verzug ist oder gegen §§ 2, 3 verstößt.
(3) Nach Ende des Nutzungsrechts stellt der Lizenznehmer die Nutzung ein, deinstalliert die Software, löscht alle Kopien einschließlich Sicherungskopien und bestätigt dies auf Verlangen schriftlich. Der Lizenzgeber stellt auf Wunsch für [z. B. 30] Tage einen Export der Daten des Lizenznehmers in einem gängigen Format bereit.

§ 5 Vergütung und Zahlung
(1) [Variante A:] Die einmalige Lizenzgebühr beträgt [Betrag] EUR zuzüglich gesetzlicher Umsatzsteuer, fällig innerhalb von 14 Tagen nach Lieferung und Rechnungsstellung. [Variante B:] Die Lizenzgebühr beträgt [Betrag] EUR je Monat zuzüglich gesetzlicher Umsatzsteuer, zahlbar [monatlich / jährlich] im Voraus bis zum [3. Werktag] des Zeitraums.
(2) Updates und Support nach § 6 werden [mit [Betrag] EUR je Jahr (Wartungsgebühr) / in der Laufzeitgebühr] vergütet. Zusätzliche Nutzer und Installationen werden nach Anlage 2 abgerechnet.
(3) Der Lizenzgeber darf die laufenden Gebühren erstmals nach [12] Monaten mit einer Ankündigungsfrist von [3] Monaten um höchstens [z. B. 5] % jährlich anpassen. Der Lizenznehmer kann in diesem Fall zum Wirksamwerden der Erhöhung kündigen.
(4) Bei Zahlungsverzug gelten die gesetzlichen Verzugszinsen (§ 288 Abs. 2 BGB). Der Lizenzgeber ist bei Verzug mit mehr als [30] Tagen berechtigt, die Nutzung nach vorheriger Ankündigung bis zur Zahlung zu sperren.

§ 6 Updates, Upgrades und Support
(1) Während der Laufzeit der Wartung stellt der Lizenzgeber Updates (Fehlerbehebungen, Sicherheitskorrekturen, kleinere Verbesserungen) ohne gesonderte Vergütung bereit. Upgrades mit wesentlich erweitertem Funktionsumfang (neue Hauptversion) sind [enthalten / gegen Aufpreis erhältlich].
(2) Der Support umfasst die Annahme und Bearbeitung von Störungsmeldungen per [E-Mail / Ticketsystem / Telefon] an Werktagen von [9] bis [17] Uhr. Reaktionszeiten: bei Störungen, die die Nutzung verhindern, [4] Stunden; bei erheblichen Beeinträchtigungen [1] Werktag; bei sonstigen Störungen [3] Werktage. Eine Behebungszeit wird nicht garantiert; der Lizenzgeber bemüht sich um eine Lösung oder Umgehung.
(3) Der Lizenznehmer spielt Updates innerhalb von [z. B. 3] Monaten nach Bereitstellung ein. Für ältere Versionen wird Support nur für [die jeweils letzte Vorversion / 12 Monate nach Erscheinen der Folgeversion] geleistet.
(4) Nicht vom Support umfasst sind Störungen durch unsachgemäße Nutzung, Eingriffe des Lizenznehmers, Drittsoftware oder nicht freigegebene Systemumgebungen; deren Bearbeitung wird nach Aufwand vergütet.

§ 7 Gewährleistung
(1) Der Lizenzgeber gewährleistet, dass die Software bei vertragsgemäßer Nutzung die in Anlage 1 beschriebenen Funktionen im Wesentlichen erfüllt. Der Lizenznehmer erkennt an, dass Software nach dem Stand der Technik nicht völlig fehlerfrei erstellt werden kann; unerhebliche Abweichungen begründen keine Mängelansprüche.
(2) Der Lizenznehmer untersucht die Software unverzüglich nach Lieferung und zeigt offensichtliche Mängel innerhalb von [z. B. 10] Werktagen, verdeckte Mängel unverzüglich nach Entdeckung in Textform unter nachvollziehbarer Beschreibung an (§ 377 HGB).
(3) Der Lizenzgeber leistet bei Mängeln zunächst Nacherfüllung nach seiner Wahl durch Beseitigung des Mangels, Bereitstellung einer Umgehungslösung oder Lieferung einer mangelfreien Version. Schlägt die Nacherfüllung nach zwei Versuchen innerhalb angemessener Frist fehl, kann der Lizenznehmer die Vergütung mindern oder vom Vertrag zurücktreten bzw. ihn kündigen.
(4) [Variante A:] Mängelansprüche verjähren in [12] Monaten ab Lieferung; dies gilt nicht bei Arglist, Vorsatz, grober Fahrlässigkeit und bei Schäden an Leben, Körper und Gesundheit. [Variante B:] Die verschuldensunabhängige Haftung des Lizenzgebers für bei Vertragsschluss vorhandene Mängel (§ 536a Abs. 1 BGB) ist ausgeschlossen.
(5) Keine Gewährleistung besteht für Mängel, die auf Änderungen durch den Lizenznehmer, nicht freigegebene Systemumgebungen oder Nichtinstallation bereitgestellter Updates zurückgehen.

§ 8 Haftung
(1) Der Lizenzgeber haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei Schäden aus der Verletzung von Leben, Körper oder Gesundheit, nach dem Produkthaftungsgesetz und im Umfang einer übernommenen Garantie.
(2) Bei leicht fahrlässiger Verletzung einer wesentlichen Vertragspflicht (Pflicht, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags erst ermöglicht und auf deren Einhaltung der Lizenznehmer regelmäßig vertrauen darf) ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt, höchstens jedoch auf [Betrag / die in den letzten 12 Monaten gezahlte Vergütung]. Im Übrigen ist die Haftung bei leichter Fahrlässigkeit ausgeschlossen.
(3) Für den Verlust von Daten haftet der Lizenzgeber nur in dem Umfang, der auch bei ordnungsgemäßer, regelmäßiger Datensicherung durch den Lizenznehmer eingetreten wäre.
(4) Die Haftungsbeschränkungen gelten auch zugunsten der Mitarbeiter und Erfüllungsgehilfen des Lizenzgebers.

§ 9 Audit und Lizenznachweis
(1) Der Lizenznehmer führt Aufzeichnungen über die Zahl der Nutzer und Installationen und übermittelt dem Lizenzgeber auf Anfrage, höchstens einmal jährlich, eine schriftliche Bestätigung.
(2) Bei begründetem Verdacht einer Überschreitung kann der Lizenzgeber nach Ankündigung von mindestens [z. B. 10] Werktagen während der Geschäftszeiten durch einen zur Verschwiegenheit verpflichteten Dritten eine Überprüfung durchführen lassen. Die Überprüfung beschränkt sich auf die Lizenznutzung und beeinträchtigt den Geschäftsbetrieb so wenig wie möglich.
(3) Ergibt die Überprüfung eine Überschreitung um mehr als [5] %, zahlt der Lizenznehmer die Gebühren für den Mehrumfang rückwirkend [zum Listenpreis zuzüglich [z. B. 20] %] und trägt die Kosten der Überprüfung.

§ 10 Geheimhaltung, Datenschutz, Schutzrechte Dritter
(1) Die Parteien behandeln alle im Zusammenhang mit diesem Vertrag erlangten Geschäftsgeheimnisse, insbesondere die Software, Lizenzschlüssel, Preise und technische Informationen, vertraulich; dies gilt für [3] Jahre nach Vertragsende fort.
(2) Verarbeitet der Lizenzgeber im Rahmen von Support oder Hosting personenbezogene Daten im Auftrag des Lizenznehmers, schließen die Parteien einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO (Anlage 3).
(3) Der Lizenzgeber stellt den Lizenznehmer von Ansprüchen Dritter frei, die darauf gestützt werden, dass die vertragsgemäße Nutzung der Software Urheber- oder sonstige Schutzrechte in Deutschland verletzt, sofern der Lizenznehmer den Lizenzgeber unverzüglich informiert, ihm die Verteidigung überlässt und ihn unterstützt. Der Lizenzgeber kann in diesem Fall die Software ändern oder austauschen oder ein Nutzungsrecht beschaffen; ist dies nicht mit angemessenem Aufwand möglich, kann er den Vertrag kündigen und die Vergütung anteilig erstatten.
(4) Die Software enthält die in Anlage 4 aufgeführten Open-Source-Komponenten, für die die jeweils genannten Lizenzbedingungen gelten.

§ 11 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel. Allgemeine Geschäftsbedingungen des Lizenznehmers finden keine Anwendung.
(2) Der Lizenznehmer darf Rechte aus diesem Vertrag nur mit schriftlicher Zustimmung des Lizenzgebers übertragen. Aufrechnen darf er nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Ausschließlicher Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort].
(5) Anlagen: Anlage 1 Leistungsbeschreibung und Systemvoraussetzungen, Anlage 2 Preise für Erweiterungen, Anlage 3 Auftragsverarbeitungsvertrag (falls einschlägig), Anlage 4 Open-Source-Komponenten.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Lizenzgeber


______________________________
[Vorname Nachname], für den Lizenznehmer

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
