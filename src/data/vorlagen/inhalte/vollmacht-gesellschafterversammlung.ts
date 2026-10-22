// Inhalt der Vorlage „vollmacht-gesellschafterversammlung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../verwaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Stimmrechtsvollmacht für die Gesellschafterversammlung brauchst",
        text: `Gesellschafterversammlungen fallen selten in ruhige Zeiten: Der Jahresabschluss muss festgestellt werden, während du auf einer Messe bist; ein Mitgesellschafter will einen Geschäftsführer abberufen, während du im Ausland sitzt; die Satzung soll geändert werden, aber du liegst im Krankenhaus. Ohne Vertreter fehlt deine Stimme, und je nach Beteiligung fehlt damit auch die Mehrheit oder das Quorum.

Die Stimmrechtsvollmacht löst das: Ein Mitgesellschafter, dein Steuerberater oder ein Anwalt nimmt teil, spricht, stellt Anträge und stimmt in deinem Namen ab. Sie passt für GmbH und UG ebenso wie für die GbR, sofern deren Gesellschaftsvertrag die Vertretung zulässt. Auch wer bewusst nicht erscheinen, aber mit festen Weisungen abstimmen lassen will, etwa um bei einem Streit unter Gesellschaftern Abstand zu halten, nutzt diese Vorlage.`,
      },
      {
        titel: "Was in die Vollmacht für die Gesellschafterversammlung gehört",
        text: `Damit der Versammlungsleiter die Vollmacht akzeptiert und der Beschluss später nicht angefochten wird, müssen diese Angaben enthalten sein:

- Gesellschaft mit Firma, Rechtsform, Sitz und Registernummer
- Vollmachtgeber mit Anschrift und Beteiligung (Anzahl und Nennbetrag der Geschäftsanteile oder Prozentanteil bei der GbR)
- Bevollmächtigter mit Anschrift und gegebenenfalls Funktion
- die konkrete Versammlung mit Datum, Uhrzeit, Ort und Einladungsdatum sowie der Hinweis auf Vertagung und Fortsetzung (Ziffer 1)
- der Umfang: Teilnahme-, Rede-, Auskunfts-, Antrags- und Stimmrecht, alle oder nur bestimmte Tagesordnungspunkte, Umlaufbeschlüsse (Ziffer 2)
- optional Weisungen je TOP mit Ja, Nein oder Enthaltung (Ziffer 3)
- Untervollmacht, Form, Dauer, Widerruf und Unterschrift (Ziffern 4 und 5)

Die Vorlage ist bewusst auf eine Versammlung begrenzt. Wer eine Dauervollmacht will, streicht in Ziffer 5 die Befristung, sollte dann aber bei jeder Einladung prüfen, ob die Vertretung noch gewollt ist.`,
      },
      {
        titel: "Stimmrechtsvollmacht Muster ausfüllen: so gehst du vor",
        text: `Hol dir zuerst die Einladung und den Gesellschaftsvertrag. Aus der Einladung übernimmst du Datum, Uhrzeit, Ort und die Tagesordnung in Ziffer 1 und 3 der Vorlage; aus der Satzung prüfst du, wen du überhaupt bevollmächtigen darfst und welche Form verlangt ist. Trage dann Gesellschaft, deine Beteiligung und den Bevollmächtigten ein.

In Ziffer 2 Absatz 2 entscheidest du, ob die Vollmacht für alle oder nur für bestimmte TOPs gilt. In Ziffer 3 wählst du Variante A (freies Ermessen) oder Variante B und trägst je TOP deine Weisung ein; lege auch fest, wie bei Anträgen abgestimmt wird, die nicht auf der Tagesordnung standen. Streiche in Ziffer 4 und 5 die nicht zutreffenden Alternativen, setze das Enddatum und unterschreibe. Schicke die Vollmacht als PDF an den Bevollmächtigten und in Kopie an die Geschäftsführung, damit sie vor der Versammlung vorliegt.`,
      },
      {
        titel: "Typische Fehler bei der Stimmrechtsvollmacht",
        text: `Der teuerste Fehler ist die falsche Form: Wer nur telefonisch bevollmächtigt, hat bei GmbH und UG keine wirksame Vollmacht, der Vertreter wird ausgeschlossen und die Stimmen zählen nicht. Mindestens Textform, also E-Mail oder PDF, ist Pflicht; verlangt die Satzung Schriftform, braucht es die eigenhändige Unterschrift auf Papier.

Zweiter Fehler: Die Satzung wird nicht gelesen. Viele Gesellschaftsverträge beschränken den Kreis der Vertreter auf Mitgesellschafter oder Berufsgeheimnisträger; ein Familienmitglied wird dann abgewiesen. Dritter Fehler: Weisungen werden mündlich erteilt und der Vertreter stimmt anders ab. Der Beschluss bleibt wirksam, du hast nur einen Schadensersatzanspruch gegen den Vertreter.

Vierter Fehler: Die Vollmacht wird nicht vor Beginn vorgelegt; die Vorlage verpflichtet den Bevollmächtigten in Ziffer 6 ausdrücklich dazu. Und: Prüfe vorher, ob du bei einem TOP einem Stimmverbot unterliegst, etwa bei deiner eigenen Entlastung. Dann darf auch dein Vertreter nicht mitstimmen.`,
      },
      {
        titel: "Rechtsgrundlagen: § 47 GmbHG, § 714 BGB und die Satzung",
        text: `Für GmbH und UG regelt § 47 GmbHG die Abstimmung: Nach Absatz 3 bedürfen Vollmachten zu ihrer Gültigkeit der Textform, nach Absatz 4 ist ein Gesellschafter bei seiner eigenen Entlastung, seiner Befreiung von einer Verbindlichkeit und bei Rechtsgeschäften zwischen ihm und der Gesellschaft vom Stimmrecht ausgeschlossen. § 48 Abs. 2 GmbHG erlaubt Beschlüsse außerhalb der Versammlung in Textform, wenn alle Gesellschafter zustimmen; die Vorlage erstreckt die Vollmacht darauf.

Die allgemeine Vertretungsregel liefert § 164 BGB, die Erteilung der Vollmacht § 167 BGB. Bei der GbR ist die Beschlussfassung seit dem MoPeG in § 714 BGB geregelt; eine Vertretung bei der Stimmabgabe setzt voraus, dass der Gesellschaftsvertrag sie zulässt oder die Mitgesellschafter zustimmen. In allen Rechtsformen geht die Satzung vor, soweit das Gesetz das erlaubt: Sie kann Vertreter einschränken, strengere Formen verlangen oder die Vertretung ganz ausschließen.`,
      },
      {
        titel: "Wann die Vorlage nicht ausreicht",
        text: `Für Beschlüsse, die notariell beurkundet werden müssen, insbesondere Satzungsänderungen, Kapitalerhöhungen und Umwandlungen, verlangt der Notar in der Regel eine notariell beglaubigte Vollmacht; die Textform-Vollmacht aus dieser Vorlage genügt dort nicht. Gleiches gilt, wenn der Vertreter im Anschluss Handelsregisteranmeldungen unterschreiben soll. Bei Aktiengesellschaften gelten eigene Regeln für die Hauptversammlung, die diese Vorlage nicht abbildet.

Steht ein Gesellschafterstreit im Raum, etwa eine Abberufung oder Einziehung gegen deinen Willen, solltest du nicht nur eine Vollmacht schicken, sondern vorher mit einem Anwalt die Anfechtungsfristen und die Protokollierung des Widerspruchs klären. GründerX stellt dir das Muster als Software zur Verfügung, ersetzt aber keine Rechtsberatung im Einzelfall.`,
      },
    ],
  text: `Stimmrechtsvollmacht für die Gesellschafterversammlung

Gesellschaft:
[Firma] [GmbH / UG (haftungsbeschränkt) / GbR], [Straße, PLZ Ort]
[eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer] / eingetragen im Gesellschaftsregister des Amtsgerichts [Ort] unter GsR [Nummer]]

Vollmachtgeber (Gesellschafter):
[Vorname Nachname], [Straße, PLZ Ort], beteiligt mit [Anzahl] Geschäftsanteilen im Nennbetrag von insgesamt [Betrag] EUR ([Prozent] % des Stammkapitals)
[GbR: beteiligt mit [Prozent] % am Gesellschaftsvermögen]

Bevollmächtigter:
[Vorname Nachname], [Straße, PLZ Ort] [ggf. Mitgesellschafter / Steuerberater / Rechtsanwalt]

1. Versammlung
Die Vollmacht gilt für die [ordentliche / außerordentliche] Gesellschafterversammlung der [Firma] am [Datum] um [Uhrzeit] Uhr in [Ort / per Videokonferenz], zu der mit Schreiben vom [Datum] eingeladen wurde, sowie für jede Vertagung, Fortsetzung oder erneute Einberufung dieser Versammlung mit gleicher Tagesordnung.

2. Umfang
(1) Der Bevollmächtigte ist berechtigt, den Vollmachtgeber in der Versammlung zu vertreten, insbesondere das Teilnahme-, Rede-, Auskunfts- und Antragsrecht sowie das Stimmrecht aus sämtlichen Geschäftsanteilen auszuüben, Widerspruch zu Protokoll zu erklären und alle Erklärungen im Zusammenhang mit der Versammlung abzugeben und entgegenzunehmen.
(2) Die Vollmacht gilt [für alle Tagesordnungspunkte / nur für die folgenden Tagesordnungspunkte: [TOP-Nummern]].
(3) Die Vollmacht umfasst auch die Teilnahme an einer Beschlussfassung außerhalb der Versammlung (§ 48 Abs. 2 GmbHG), sofern sie dieselben Gegenstände betrifft.

3. Weisungen (optional)
[Variante A – ohne Weisungen: Der Bevollmächtigte übt das Stimmrecht nach eigenem Ermessen aus.]
[Variante B – mit Weisungen: Der Bevollmächtigte wird angewiesen, wie folgt abzustimmen:
   TOP 1 [Feststellung des Jahresabschlusses [Jahr]]: [Ja / Nein / Enthaltung]
   TOP 2 [Ergebnisverwendung]: [Ja / Nein / Enthaltung]
   TOP 3 [Entlastung der Geschäftsführung]: [Ja / Nein / Enthaltung]
   TOP 4 [Bestellung / Abberufung eines Geschäftsführers]: [Ja / Nein / Enthaltung]
Bei Anträgen, die von der angekündigten Tagesordnung abweichen, stimmt der Bevollmächtigte mit [Nein / Enthaltung / nach eigenem Ermessen].]
Die Weisungen wirken nur im Innenverhältnis; eine weisungswidrige Stimmabgabe ist gegenüber der Gesellschaft wirksam.

4. Untervollmacht
Der Bevollmächtigte ist [berechtigt / nicht berechtigt], die Vollmacht auf einen Dritten zu übertragen oder Untervollmacht zu erteilen.

5. Form, Dauer und Widerruf
(1) Diese Vollmacht ist in Textform erteilt und genügt damit § 47 Abs. 3 GmbHG. [GbR: Der Gesellschaftsvertrag vom [Datum] lässt die Vertretung bei der Beschlussfassung zu / Die übrigen Gesellschafter haben der Vertretung zugestimmt.]
(2) Die Vollmacht erlischt mit Beendigung der unter Ziffer 1 bezeichneten Versammlung einschließlich ihrer Fortsetzung, spätestens am [Datum].
(3) Der Vollmachtgeber kann die Vollmacht jederzeit gegenüber dem Bevollmächtigten oder gegenüber der Gesellschaft widerrufen. Erscheint der Vollmachtgeber selbst zur Versammlung, gilt die Vollmacht als widerrufen.

6. Hinweise
(1) Der Bevollmächtigte legt diese Vollmacht dem Versammlungsleiter vor Beginn der Versammlung vor; sie wird zu den Versammlungsunterlagen genommen.
(2) Stimmverbote des Vollmachtgebers (§ 47 Abs. 4 GmbHG, z. B. bei der eigenen Entlastung) gelten auch für den Bevollmächtigten.
(3) Der Bevollmächtigte wahrt Verschwiegenheit über alle Angelegenheiten der Gesellschaft, die ihm in der Versammlung bekannt werden.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gesellschafter (Vollmachtgeber)


Annahme: Ich nehme die Vollmacht an.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Bevollmächtigter

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
