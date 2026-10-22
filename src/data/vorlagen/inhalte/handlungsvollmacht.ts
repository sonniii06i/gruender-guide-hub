// Inhalt der Vorlage „handlungsvollmacht“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../verwaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einem Mitarbeiter Handlungsvollmacht erteilst",
        text: `Spätestens wenn dein Unternehmen den dritten oder vierten Mitarbeiter hat, kannst du nicht mehr jede Bestellung und jeden Kundenvertrag selbst unterschreiben. Der Einkäufer soll Ware ordern, die Vertriebsmitarbeiterin soll Angebote verbindlich annehmen, der Filialleiter soll Reklamationen abschließend regeln. Ohne Vollmacht handeln diese Personen als Vertreter ohne Vertretungsmacht, und jeder Vertrag hängt davon ab, ob du ihn nachträglich genehmigst.

Die Handlungsvollmacht nach § 54 HGB ist die Lösung für diese Ebene unterhalb der Geschäftsführung: Sie ist formfrei, wird nicht ins Handelsregister eingetragen und lässt sich auf das Tagesgeschäft, eine Geschäftsart oder ein einzelnes Geschäft zuschneiden. Typisch sind Generalhandlungsvollmachten für Betriebsleiter, Arthandlungsvollmachten für Einkauf oder Vertrieb und Spezialhandlungsvollmachten für eine konkrete Vertragsverhandlung, etwa mit einem neuen Lieferanten.`,
      },
      {
        titel: "Handlungsvollmacht: Das muss im Muster stehen",
        text: `Die Vorlage folgt dem Aufbau, den Geschäftspartner und Gerichte erwarten:

- Unternehmen als Vollmachtgeber mit Rechtsform, Handelsregister und vertretungsberechtigter Person
- Bevollmächtigter mit Name, Geburtsdatum, Anschrift, Position und Eintrittsdatum
- Art der Vollmacht: General-, Art- oder Spezialhandlungsvollmacht (Ziffer 1 Absatz 2), nur eine Variante bleibt stehen
- Umfang und Grenzen (Ziffer 2): die gesetzlichen Ausnahmen für Grundstücke, Wechsel, Darlehen und Prozesse, besondere Befugnisse, interne Betragsgrenzen, § 181 BGB und die Übertragbarkeit
- Zeichnungsregel mit „i. V.“ (Ziffer 3)
- Pflichten des Bevollmächtigten und Verweis auf den Arbeitsvertrag (Ziffer 4)
- Beginn, Ende, Widerruf, Rückgabe der Urkunde (Ziffer 5) und der Hinweis, dass keine Registereintragung erfolgt (Ziffer 6)
- Unterschrift des Inhabers oder Geschäftsführers und Annahme des Mitarbeiters

Interne Grenzen wie „maximal 10.000 EUR je Vertrag“ gehören in Ziffer 2 Absatz 4. Sie binden Dritte nur, wenn diese sie kannten; deshalb sieht Ziffer 6 die Mitteilung an wichtige Geschäftspartner vor.`,
      },
      {
        titel: "Handlungsvollmacht Vorlage ausfüllen",
        text: `Beginne mit den Stammdaten des Unternehmens und des Mitarbeiters; die Position und das Eintrittsdatum stammen aus dem Arbeitsvertrag. Wähle in Ziffer 1 Absatz 2 genau eine Variante und lösche die anderen beiden: Variante A für einen Betriebs- oder Niederlassungsleiter, Variante B mit einer konkreten Beschreibung der Geschäftsart für Einkauf, Vertrieb oder Kundenservice, Variante C mit dem einzelnen Geschäft samt Vertragspartner.

In Ziffer 2 Absatz 3 entscheidest du, ob eine der gesetzlich ausgeschlossenen Befugnisse ausnahmsweise eingeräumt wird, sonst bleibt „Besondere Befugnisse werden nicht eingeräumt“ stehen. Trage in Absatz 4 Betragsgrenzen, Laufzeitgrenzen und Rabattgrenzen ein, die zu deinem Freigabeprozess passen. In Absatz 5 streichst du „nicht“, wenn der Mitarbeiter Insichgeschäfte abschließen darf, was selten gewollt ist.

Setze in Ziffer 5 Beginn und gegebenenfalls Ende ein, drucke zwei Exemplare, unterschreibe und lass den Mitarbeiter die Annahme unterzeichnen. Eine Kopie kommt in die Personalakte, eine Mitteilung an die in Ziffer 6 genannten Geschäftspartner.`,
      },
      {
        titel: "Typische Fehler bei der Handlungsvollmacht",
        text: `Erster Fehler: Die Vollmacht wird einem Kleingewerbetreibenden ohne Handelsregistereintrag nachgebaut. Die Handlungsvollmacht gibt es nur für Kaufleute; alle anderen erteilen eine gewöhnliche Vollmacht nach BGB, für die es eine eigene Vorlage gibt.

Zweiter Fehler: Betragslimits stehen nur in der Urkunde, aber kein Lieferant kennt sie. Überschreitet der Mitarbeiter das Limit, ist der Vertrag gegenüber dem gutgläubigen Partner wirksam, und du bleibst gebunden. Teile Limits deshalb schriftlich mit und hinterlege sie in Bestellsystemen. Dritter Fehler: Der Mitarbeiter unterschreibt mit „ppa.“ oder „i. A.“. „ppa.“ ist dem Prokuristen vorbehalten, „i. A.“ wird oft als bloße Botenerklärung gelesen; richtig ist „i. V.“.

Vierter Fehler: Beim Ausscheiden wird die Urkunde nicht eingezogen und niemand informiert. Da nichts im Register steht, können Geschäftspartner den Wegfall nicht erkennen, und der Rechtsschein wirkt weiter. Zieh die Urkunde ein und schreib die Partner an, denen du die Vollmacht angezeigt hattest.`,
      },
      {
        titel: "Rechtsgrundlagen: § 54 HGB, § 57 HGB und die Abgrenzung zur Prokura",
        text: `§ 54 Abs. 1 HGB beschreibt die drei Stufen der Handlungsvollmacht und legt fest, dass sie sich auf alle Geschäfte erstreckt, die der Betrieb eines solchen Handelsgewerbes oder die Vornahme solcher Geschäfte gewöhnlich mit sich bringt. § 54 Abs. 2 HGB nimmt Grundstücksveräußerungen und -belastungen, Wechselverbindlichkeiten, Darlehensaufnahme und Prozessführung aus, sofern die Befugnis nicht besonders erteilt wurde. § 54 Abs. 3 HGB bestimmt, dass sonstige Beschränkungen Dritten nur entgegengehalten werden können, wenn sie diese kannten oder kennen mussten.

§ 57 HGB regelt die Zeichnung mit einem Zusatz, der das Vollmachtsverhältnis ausdrückt, in der Praxis „i. V.“; § 58 HGB verbietet die Übertragung ohne Zustimmung des Inhabers. Die Prokura steht in den §§ 48 bis 53 HGB: Sie muss ausdrücklich erteilt werden, umfasst nach § 49 HGB nahezu alle Geschäfte, ist nach außen nicht beschränkbar und wird nach § 53 HGB ins Handelsregister eingetragen. Für Erlöschen und Rückgabe der Urkunde gelten ergänzend die §§ 168 und 175 BGB.`,
      },
      {
        titel: "Wann Handlungsvollmacht nicht ausreicht",
        text: `Soll der Mitarbeiter Darlehen aufnehmen, Grundstücke belasten, Prozesse führen oder nach außen unbeschränkt auftreten, ist die Prokura das richtige Instrument; sie erfordert die Anmeldung zum Handelsregister durch den Inhaber oder alle Geschäftsführer in notariell beglaubigter Form. Für die Vertretung in Gerichtsverfahren braucht der Mitarbeiter außerdem eine Prozessvollmacht, und vor Land- und Oberlandesgerichten besteht Anwaltszwang.

Bankgeschäfte laufen über die Kontovollmacht der Bank, nicht über diese Urkunde. Steuerliche Vertretung gegenüber dem Finanzamt erfolgt über das amtliche Vollmachtsformular, meist durch den Steuerberater. Bei Filialstrukturen mit vielen Bevollmächtigten lohnt eine Vollmachtsordnung, die Stufen und Freigabeprozesse festlegt; dabei hilft ein Anwalt. GründerX liefert die Vorlage als Software und ersetzt keine Rechtsberatung.`,
      },
    ],
  text: `Handlungsvollmacht (§ 54 HGB)

Vollmachtgeber:
[Firma] [e. K. / GmbH / UG (haftungsbeschränkt) / OHG / KG], [Straße, PLZ Ort], Handelsregister: Amtsgericht [Ort], [HRA / HRB] [Nummer], vertreten durch [Vorname Nachname, Inhaber / Geschäftsführer]
– nachfolgend „Unternehmen“ –

Bevollmächtigter:
[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort], beschäftigt als [Position] seit dem [Datum]
– nachfolgend „Bevollmächtigter“ –

1. Erteilung und Art der Vollmacht
(1) Das Unternehmen erteilt dem Bevollmächtigten Handlungsvollmacht im Sinne des § 54 HGB.
(2) Die Vollmacht wird erteilt als
[Variante A – Generalhandlungsvollmacht: Vollmacht zum Betrieb des gesamten Handelsgewerbes des Unternehmens (§ 54 Abs. 1 HGB).]
[Variante B – Arthandlungsvollmacht: Vollmacht zur Vornahme der zum Handelsgewerbe gehörenden Geschäfte folgender Art: [z. B. Einkauf von Handelswaren; Abschluss von Kaufverträgen mit Kunden; Bearbeitung von Reklamationen].]
[Variante C – Spezialhandlungsvollmacht: Vollmacht zur Vornahme des folgenden einzelnen Geschäfts: [z. B. „Verhandlung und Abschluss des Rahmenliefervertrags mit der [Firma] GmbH“].]

2. Umfang und Grenzen
(1) Die Vollmacht umfasst alle Geschäfte und Rechtshandlungen, die der Betrieb des Handelsgewerbes [bzw. die Vornahme der bezeichneten Geschäfte] gewöhnlich mit sich bringt (§ 54 Abs. 1 HGB).
(2) Nicht umfasst sind, soweit nicht in Absatz 3 ausdrücklich eingeräumt (§ 54 Abs. 2 HGB):
   a) die Veräußerung und Belastung von Grundstücken,
   b) die Eingehung von Wechselverbindlichkeiten,
   c) die Aufnahme von Darlehen,
   d) die Prozessführung.
(3) [Besondere Befugnisse: Der Bevollmächtigte ist zusätzlich befugt, [z. B. Darlehen bis zu [Betrag] EUR aufzunehmen]. / Besondere Befugnisse werden nicht eingeräumt.]
(4) Im Innenverhältnis darf der Bevollmächtigte ohne vorherige Zustimmung [des Inhabers / der Geschäftsführung] nicht:
   a) Verträge mit einem Wert von mehr als [Betrag] EUR im Einzelfall oder [Betrag] EUR pro Jahr abschließen,
   b) Verträge mit einer Laufzeit von mehr als [z. B. 12] Monaten abschließen,
   c) Forderungen des Unternehmens erlassen, stunden oder abtreten,
   d) [weitere Beschränkungen, z. B. Rabatte über [Prozent] %].
Diese Beschränkungen gelten gegenüber Dritten nur, wenn diese sie kannten oder kennen mussten (§ 54 Abs. 3 HGB).
(5) Der Bevollmächtigte ist [nicht] von den Beschränkungen des § 181 BGB befreit.
(6) Die Übertragung auf Dritte ist nur mit Zustimmung des Unternehmens zulässig (§ 58 HGB).

3. Zeichnung
Der Bevollmächtigte zeichnet mit der Firma, dem Zusatz „i. V.“ und seinem Namen (§ 57 HGB), zum Beispiel:
   [Firma]
   i. V. [Vorname Nachname]
Der Zusatz „ppa.“ ist dem Prokuristen vorbehalten.

4. Pflichten des Bevollmächtigten
Der Bevollmächtigte übt die Vollmacht im Interesse des Unternehmens und im Rahmen der erteilten Weisungen aus und unterrichtet [den Inhaber / die Geschäftsführung] unverzüglich über Geschäfte von erheblicher Bedeutung. Die Pflichten aus dem Arbeitsvertrag vom [Datum] bleiben unberührt.

5. Dauer, Widerruf und Erlöschen
(1) Die Vollmacht gilt ab dem [Datum] [bis zum [Datum] / auf unbestimmte Zeit].
(2) Das Unternehmen kann die Vollmacht jederzeit ohne Angabe von Gründen widerrufen. Der Widerruf wird mit Zugang beim Bevollmächtigten wirksam.
(3) Die Vollmacht erlischt mit Beendigung des Arbeitsverhältnisses (§ 168 Satz 1 BGB).
(4) Nach dem Erlöschen gibt der Bevollmächtigte diese Urkunde im Original zurück (§ 175 BGB) und verwendet den Zusatz „i. V.“ nicht mehr.

6. Hinweis
Die Handlungsvollmacht wird – anders als die Prokura – nicht in das Handelsregister eingetragen. [Sie wird den Geschäftspartnern [Namen] mit Schreiben vom [Datum] bekanntgegeben.]

[Ort], den [Datum]


______________________________
[Vorname Nachname], [Inhaber / Geschäftsführer] der [Firma]


Ich nehme die Handlungsvollmacht an.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Bevollmächtigter

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
