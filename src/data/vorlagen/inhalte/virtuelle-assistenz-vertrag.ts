// Inhalt der Vorlage „virtuelle-assistenz-vertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../dienstleistung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
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
};

export default inhalt;
