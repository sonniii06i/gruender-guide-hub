// Inhalt der Vorlage „protokoll-gesellschafterversammlung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../gesellschaft.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann brauchst du ein Protokoll der Gesellschafterversammlung?",
        text: `Nach jeder Gesellschafterversammlung einer GmbH oder UG. Das Gesetz schreibt die Niederschrift für die normale Versammlung zwar nicht vor, aber ohne Protokoll gibt es keinen Beweis, dass ein Beschluss gefasst wurde, mit welcher Mehrheit und ob jemand widersprochen hat. Genau danach fragen später Handelsregister, Bank, Finanzamt, Investoren und im Streitfall das Gericht.

Besonders wichtig ist das Protokoll, wenn Beschlüsse angefochten werden könnten, wenn ein Geschäftsführer bestellt oder abberufen wird, wenn Ausschüttungen beschlossen werden und wenn die Versammlung per Video stattfand. Viele Satzungen knüpfen außerdem die Anfechtungsfrist an den Zugang des Protokolls, sodass ohne Niederschrift die Frist nie zu laufen beginnt. Die Vorlage deckt alle Bestandteile ab: Teilnehmer, vertretenes Kapital, Einberufung, Beschlussfähigkeit, Beschlüsse mit Abstimmungsergebnis, Widersprüche, Schluss, Unterschriften und Verteiler.`,
      },
      {
        titel: "Was gehört in das Protokoll einer GmbH-Gesellschafterversammlung?",
        text: `Ein brauchbares Protokoll ist ein Ergebnisprotokoll mit den Feststellungen, die Beschlüsse tragen. Die Vorlage gliedert sich in sechs Abschnitte:

- Kopf: Gesellschaft mit HRB-Nummer, Ort oder Plattform, Datum, Beginn und Ende
- 1. Teilnehmer: jeder Gesellschafter mit Anteilen und Prozent, ob persönlich, per Video oder durch Bevollmächtigten vertreten, Geschäftsführer und Gäste, Abwesende und das vertretene Stammkapital in Euro und Prozent
- 2. Wahl von Versammlungsleiter und Protokollführer
- 3. Feststellung der ordnungsgemäßen Einberufung mit Datum und Zustellform, alternativ die Vollversammlung mit Verzicht nach § 51 Abs. 3 GmbHG, bei Videokonferenz die Zustimmungen nach § 48 Abs. 1 Satz 2 GmbHG und die Identitätsprüfung, sowie die Beschlussfähigkeit
- 4. Beschlüsse je Tagesordnungspunkt mit Wortlaut, Ja- und Nein-Stimmen, Enthaltungen und Feststellung des Ergebnisses; bei der Entlastung der Hinweis auf das Stimmverbot nach § 47 Abs. 4 GmbHG
- 5. Widersprüche und Erklärungen einzelner Gesellschafter zu Protokoll
- 6. Schluss, Versandfrist, Einwendungsfrist, Ablage im Beschlussbuch

Dazu Unterschriften von Versammlungsleiter und Protokollführer, optional aller Gesellschafter, und die Anlagen mit Teilnehmerliste, Vollmachten und Jahresabschluss.`,
      },
      {
        titel: "Protokoll Gesellschafterversammlung Muster ausfüllen",
        text: `Fülle das Protokoll am besten noch während der Versammlung aus, dann sind die Zahlen frisch:

- Kopf: Versammlungsart, Firma, Sitz, Amtsgericht, HRB, Ort oder Plattform, Datum und Uhrzeiten.
- Abschnitt 1: für jeden Gesellschafter Name, Anzahl der Anteile, Nennbetrag, Prozent und die Art der Teilnahme; bei Vertretung Name des Bevollmächtigten und Datum der Vollmacht. Abwesende eintragen oder das Wort niemand setzen. Das vertretene Kapital addieren.
- Abschnitt 2: Uhrzeit der Eröffnung, Namen von Versammlungsleiter und Protokollführer.
- Abschnitt 3: Datum und Form der Einladung und die Frist, oder die Vollversammlungs-Alternative; nicht zutreffende Varianten löschen. Den Prozentsatz für die Beschlussfähigkeit und die Satzungsnorm eintragen.
- Abschnitt 4: Bei TOP 1 Bilanzsumme und Ergebnis, bei TOP 2 die Aufteilung des Bilanzgewinns, bei TOP 3 den Namen des Geschäftsführers und die Abstimmung ohne seine Stimmen, bei TOP 4 die Daten des neuen Geschäftsführers. Bei jedem TOP Ja, Nein, Enthaltungen in Zahlen und Prozent.
- Abschnitt 5 und 6: Widersprüche mit Begründung oder den Satz, dass keine erhoben wurden; Uhrzeit des Schlusses, Versand- und Einwendungsfrist.

Unterschreiben lassen, innerhalb von zwei Wochen an alle Gesellschafter senden, auch an die abwesenden, und im Beschlussbuch ablegen. Die Word-Fassung lässt sich als Vorlage für jede weitere Versammlung speichern.`,
      },
      {
        titel: "Typische Fehler im Versammlungsprotokoll",
        text: `Fehler eins: Das Protokoll hält nur fest, dass beschlossen wurde, nicht wie. Ohne Stimmenzahlen lässt sich die Mehrheit nicht nachweisen, und bei Dreiviertelmehrheiten ist das entscheidend. Fehler zwei: Widersprüche werden weggelassen, um Harmonie zu zeigen. Ein Gesellschafter, dessen Widerspruch nicht protokolliert ist, kann später behaupten, er sei übergangen worden; ein Gesellschafter, der nicht widersprochen hat, verliert oft die Anfechtungsmöglichkeit. Beides gehört ins Protokoll.

Fehler drei: Der Gesellschafter-Geschäftsführer wird bei der eigenen Entlastung mitgezählt. Die Vorlage sieht dafür eine getrennte Abstimmungszeile vor. Fehler vier: Bei Videokonferenzen fehlt der Nachweis, dass alle Gesellschafter in Textform zugestimmt haben und wie die Identität geprüft wurde; das macht die Beschlüsse angreifbar.

Fehler fünf: Das Protokoll wird nie verschickt. Dann beginnt nach vielen Satzungen die Anfechtungsfrist nicht, und Beschlüsse bleiben jahrelang angreifbar. Fehler sechs: Beschlüsse, die der Beurkundung bedürfen, werden nur privat protokolliert. Satzungsänderungen, Kapitalerhöhungen, Umwandlung und Auflösung sind ohne notarielles Protokoll nichtig. Nutze die private Niederschrift für alles andere, aber nicht als Ersatz für den Notar.`,
      },
      {
        titel: "Rechtliche Grundlagen der Niederschrift",
        text: `Das GmbH-Gesetz regelt das Protokoll nur an einer Stelle ausdrücklich: Bei der Einpersonen-GmbH muss der Alleingesellschafter jeden Beschluss unverzüglich nach der Beschlussfassung schriftlich niederlegen und unterschreiben (§ 48 Abs. 3 GmbHG). Für alle anderen Gesellschaften folgt die Protokollpflicht aus der Satzung oder aus dem praktischen Beweisbedürfnis, nicht aus dem Gesetz.

Beurkundungspflichtige Beschlüsse werden vom Notar in einer notariellen Niederschrift festgehalten (§ 53 Abs. 3 GmbHG für Satzungsänderungen); das private Protokoll ersetzt diese nicht. Für die Beschlussfähigkeit gilt, was die Satzung sagt; das Gesetz kennt kein Quorum. Stimmverbote ergeben sich aus § 47 Abs. 4 GmbHG, etwa bei Entlastung, Befreiung von einer Verbindlichkeit oder Rechtsgeschäften mit dem Gesellschafter.

Die Anfechtung fehlerhafter Beschlüsse erfolgt durch Klage gegen die Gesellschaft; die Frist wird in Anlehnung an § 246 AktG mit einem Monat angesetzt, kann aber durch die Satzung geregelt sein. Das Protokoll gehört zu den Geschäftsunterlagen, für die handelsrechtlich eine Aufbewahrung von zehn Jahren üblich ist. Bei einer Videokonferenz sichert § 48 Abs. 1 Satz 2 GmbHG die Zulässigkeit, sofern alle Gesellschafter in Textform zugestimmt haben oder die Satzung es erlaubt.`,
      },
      {
        titel: "Wann das Protokoll-Muster nicht ausreicht",
        text: `Die Vorlage reicht für die normale Versammlung einer GmbH oder UG mit unstreitigen Beschlüssen. Sie reicht nicht, wenn

- Satzungsänderungen, Kapitalerhöhungen, Verschmelzungen oder die Auflösung beschlossen werden; dann protokolliert der Notar,
- die Versammlung Streit erwartet, etwa die Abberufung eines Gesellschafter-Geschäftsführers aus wichtigem Grund, den Ausschluss eines Gesellschafters oder die Einziehung von Anteilen; hier sollte ein Anwalt die Versammlung leiten oder zumindest den Beschlusstext vorab prüfen,
- Gesellschafter durch Erben, Testamentsvollstrecker, Insolvenzverwalter oder Pfandgläubiger vertreten werden,
- die Satzung ein Protokoll mit Unterschrift aller Gesellschafter oder eine besondere Form verlangt und ein Gesellschafter die Unterschrift verweigert,
- die Gesellschaft einen Aufsichtsrat hat, dessen Mitwirkung dokumentiert werden muss.

In diesen Fällen ist das Protokoll Teil einer Auseinandersetzung, und jede Formulierung kann vor Gericht landen. Für den Alltag ist das Muster als Word oder PDF ausreichend, am besten zusammen mit der Einladung und dem Umlaufbeschluss aus dieser Kategorie. GründerX liefert die Vorlage als Software-Dokument; eine Rechtsberatung ist damit nicht verbunden.`,
      },
    ],
  text: `Protokoll der [ordentlichen / außerordentlichen] Gesellschafterversammlung

der [Name] [GmbH / UG (haftungsbeschränkt)] mit Sitz in [Ort], Amtsgericht [Ort], HRB [Nummer]

Ort: [Geschäftsräume der Gesellschaft, Straße, PLZ Ort / Videokonferenz über [Plattform]]
Datum: [Datum]
Beginn: [Uhrzeit] Uhr   Ende: [Uhrzeit] Uhr

1. Teilnehmer und vertretenes Stammkapital
Anwesend sind:
   a) [Vorname Nachname], Gesellschafter, [Anzahl] Geschäftsanteile, Nennbetrag [Betrag] EUR ([Prozent] %), [persönlich anwesend / per Video zugeschaltet]
   b) [Vorname Nachname], Gesellschafter, [Anzahl] Geschäftsanteile, Nennbetrag [Betrag] EUR ([Prozent] %), vertreten durch [Vorname Nachname] aufgrund schriftlicher Vollmacht vom [Datum], die im Original vorliegt
   c) [Vorname Nachname], Geschäftsführer (ohne Stimmrecht, soweit nicht Gesellschafter)
   d) [ggf. Gäste: Steuerberater [Name], Rechtsanwalt [Name], mit Zustimmung aller Gesellschafter]
Nicht anwesend und nicht vertreten: [Vorname Nachname], [Anzahl] Geschäftsanteile ([Prozent] %) [/ „niemand“].
Vom Stammkapital in Höhe von [Betrag] EUR sind damit [Betrag] EUR ([Prozent] %) anwesend oder vertreten.

2. Versammlungsleitung und Protokollführung
Die Versammlung wird um [Uhrzeit] Uhr von [Vorname Nachname] eröffnet. Auf Vorschlag von [Name] wird [Vorname Nachname] einstimmig zum Versammlungsleiter und [Vorname Nachname] zum Protokollführer gewählt.

3. Einberufung und Beschlussfähigkeit
Der Versammlungsleiter stellt fest, dass die Einladung mit Tagesordnung allen Gesellschaftern am [Datum] durch [eingeschriebenen Brief / E-Mail gemäß § [Nummer] des Gesellschaftsvertrags] zugegangen ist und die Frist von [einer Woche / zwei Wochen] gewahrt wurde. Die Versammlung ist ordnungsgemäß einberufen.
[Alternative: Sämtliche Gesellschafter sind anwesend oder vertreten und erklären sich mit der Abhaltung der Versammlung und der Beschlussfassung über die nachstehenden Gegenstände einverstanden; sie verzichten auf die Einhaltung aller Form- und Fristvorschriften für Einberufung und Ankündigung (§ 51 Abs. 3 GmbHG).]
[Bei Videokonferenz: Alle Gesellschafter haben der Abhaltung per Videokonferenz in Textform zugestimmt (§ 48 Abs. 1 Satz 2 GmbHG); die Zustimmungen liegen dem Protokoll als Anlage bei. Die Identität der zugeschalteten Teilnehmer wurde durch [Bild und Ton / Vorlage des Ausweises] festgestellt.]
Mit [Prozent] % des Stammkapitals ist die Versammlung gemäß [§ [Nummer] des Gesellschaftsvertrags / Gesetz] beschlussfähig. Kein Gesellschafter widerspricht dieser Feststellung.

4. Beschlüsse

TOP 1: Feststellung des Jahresabschlusses zum 31.12.[Jahr]
Die Geschäftsführung erläutert den Jahresabschluss, der mit einer Bilanzsumme von [Betrag] EUR und einem Jahresüberschuss / Jahresfehlbetrag von [Betrag] EUR abschließt. Fragen der Gesellschafter zu [Thema] werden beantwortet.
Beschluss: Der Jahresabschluss zum 31.12.[Jahr] wird festgestellt.
Abstimmung: Ja-Stimmen: [Anzahl] ([Prozent] %), Nein-Stimmen: [Anzahl], Enthaltungen: [Anzahl]. Der Beschluss ist [einstimmig / mit der erforderlichen Mehrheit] gefasst.

TOP 2: Verwendung des Ergebnisses
Beschluss: Der Bilanzgewinn in Höhe von [Betrag] EUR wird wie folgt verwendet: [Einstellung in die gesetzliche Rücklage (UG): [Betrag] EUR; Ausschüttung an die Gesellschafter im Verhältnis der Geschäftsanteile: [Betrag] EUR, fällig am [Datum]; Vortrag auf neue Rechnung: [Betrag] EUR].
Abstimmung: Ja-Stimmen: [Anzahl] ([Prozent] %), Nein-Stimmen: [Anzahl], Enthaltungen: [Anzahl]. Der Beschluss ist gefasst.

TOP 3: Entlastung der Geschäftsführung für das Geschäftsjahr [Jahr]
Der Versammlungsleiter weist darauf hin, dass [Vorname Nachname] als betroffener Geschäftsführer bei seiner Entlastung kein Stimmrecht hat (§ 47 Abs. 4 GmbHG).
Beschluss: Dem Geschäftsführer [Vorname Nachname] wird für das Geschäftsjahr [Jahr] Entlastung erteilt.
Abstimmung (ohne die Stimmen von [Name]): Ja-Stimmen: [Anzahl] ([Prozent] % der stimmberechtigten Stimmen), Nein-Stimmen: [Anzahl], Enthaltungen: [Anzahl]. Der Beschluss ist gefasst.

TOP 4: [z. B. Bestellung eines Geschäftsführers]
Beschluss: [Vorname Nachname], geboren am [Datum], wohnhaft [Anschrift], wird mit Wirkung zum [Datum] zum Geschäftsführer bestellt. Er / sie ist [einzelvertretungsberechtigt / gemeinsam mit einem weiteren Geschäftsführer vertretungsberechtigt] und [von den Beschränkungen des § 181 BGB befreit]. Die Geschäftsführung wird angewiesen, die Anmeldung zum Handelsregister unverzüglich zu veranlassen.
Abstimmung: Ja-Stimmen: [Anzahl] ([Prozent] %), Nein-Stimmen: [Anzahl], Enthaltungen: [Anzahl]. Der Beschluss ist gefasst.

TOP 5: [z. B. Zustimmung zu einem Geschäft nach § [Nummer] des Gesellschaftsvertrags]
Beschluss: [Text des Beschlusses].
Abstimmung: Ja-Stimmen: [Anzahl] ([Prozent] %), Nein-Stimmen: [Anzahl], Enthaltungen: [Anzahl]. Der Beschluss ist [gefasst / abgelehnt].

TOP 6: Verschiedenes
[z. B. „Die Geschäftsführung berichtet über den Stand der Verhandlungen mit [Partner]. Beschlüsse werden hierzu nicht gefasst.“ / „Gesellschafter [Name] regt an, die nächste Versammlung am [Datum] abzuhalten.“]

5. Widersprüche und Erklärungen zu Protokoll
[„Kein Gesellschafter hat gegen einen Beschluss Widerspruch zu Protokoll erklärt.“ / „Gesellschafter [Name] erklärt zu TOP [Nummer] Widerspruch zu Protokoll und begründet dies mit [Begründung].“]

6. Schluss der Versammlung
Weitere Anträge liegen nicht vor. Der Versammlungsleiter schließt die Versammlung um [Uhrzeit] Uhr. Dieses Protokoll wird allen Gesellschaftern innerhalb von [z. B. zwei Wochen] in Kopie übersandt [per E-Mail an die hinterlegten Adressen] und im Beschlussbuch der Gesellschaft abgelegt. Einwendungen gegen den Inhalt des Protokolls sind innerhalb von [z. B. zwei Wochen] nach Zugang schriftlich gegenüber der Geschäftsführung zu erheben.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Versammlungsleiter


______________________________
[Vorname Nachname], Protokollführer


[Zustimmende Unterschriften der anwesenden Gesellschafter:

______________________________
[Vorname Nachname]

______________________________
[Vorname Nachname]]

Anlagen: Teilnehmerliste, Vollmachten, [Zustimmungen zur Videokonferenz], Jahresabschluss zum 31.12.[Jahr]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
