// Inhalt der Vorlage „gesellschafterdarlehen“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../gesellschaft.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann brauchst du einen Vertrag über ein Gesellschafterdarlehen?",
        text: `Die typische Situation: Die UG hat 1.000 EUR Stammkapital, aber die erste Warenbestellung kostet 8.000 EUR. Oder die GmbH wartet auf eine große Kundenzahlung und muss trotzdem Gehälter zahlen. Statt einer Kapitalerhöhung beim Notar überweist der Gründer das Geld privat auf das Geschäftskonto. Das ist ein Gesellschafterdarlehen, und ohne Vertrag ist es steuerlich und rechtlich ein Problem.

Du brauchst den Vertrag also immer, wenn Geld vom Gesellschafter in die Gesellschaft fließt, das zurückgezahlt werden soll. Das gilt auch für Gründungskosten und Auslagen, die ein Gesellschafter vorgestreckt hat, für die Überbrückung bis zur nächsten Finanzierungsrunde und für Fälle, in denen eine Bank oder ein Investor einen Rangrücktritt verlangt. Die Vorlage regelt Betrag, fremdüblichen Zins, Laufzeit, Kündigung, Sicherheiten und den Rangrücktritt als ankreuzbare Option.`,
      },
      {
        titel: "Was muss in einen Gesellschafterdarlehensvertrag?",
        text: `Ein Darlehensvertrag zwischen Gesellschafter und GmbH muss so aussehen, als hätten ihn Fremde geschlossen. Die Vorlage enthält dafür in zehn Paragraphen:

- Darlehensbetrag in Ziffern und Worten, Auszahlungsweg und Datum, alternativ die Feststellung bereits geleisteter Zahlungen oder verauslagter Kosten (§ 1)
- Verwendungszweck (§ 2)
- Zinssatz mit dokumentiertem Fremdvergleich, Zinsmethode, Fälligkeit und Umgang mit Kapitalertragsteuer (§ 3)
- Laufzeit, Tilgung in einer Summe oder in Raten, vorzeitige Rückzahlung unter Vorbehalt der Kapitalerhaltung (§ 4)
- ordentliche und außerordentliche Kündigung mit Schriftform (§ 5)
- Sicherheiten und der Hinweis auf deren Anfechtbarkeit (§ 6)
- Rangrücktritt als Option zum Ankreuzen mit dem vollständigen Text eines qualifizierten Rangrücktritts (§ 7)
- insolvenzrechtlicher Hinweis auf § 39 und § 135 InsO (§ 8)
- Steuern, Buchung als Verbindlichkeit gegenüber Gesellschaftern, Gesellschafterbeschluss (§ 9)
- Schriftform, salvatorische Klausel, Gerichtsstand (§ 10)

Die drei Anlagen sind kein Beiwerk: Aufstellung verauslagter Kosten, Herleitung des Zinssatzes und der Gesellschafterbeschluss sind genau die Unterlagen, die ein Betriebsprüfer anfordert.`,
      },
      {
        titel: "Gesellschafterdarlehen Muster ausfüllen: Schritt für Schritt",
        text: `So gehst du vor:

- Kopf: Name und Beteiligungsquote des Gesellschafters, Firma, Sitz, HRB. Achte auf die Vertretung: Ist der Darlehensgeber alleiniger Geschäftsführer ohne Befreiung von § 181 BGB, muss die Gesellschafterversammlung die Gesellschaft vertreten.
- § 1: Betrag in Ziffern und Worten, Bank und IBAN des Geschäftskontos, Auszahlung in einer Summe oder in Tranchen. Für bereits geflossenes Geld die Alternative mit Datum oder der Kostenaufstellung in Anlage 1.
- § 2: konkreter Zweck, etwa Warenbestellung, Liquidität bis zu einem Datum oder eine Anschaffung.
- § 3: Zinssatz. Hole ein Vergleichsangebot deiner Bank für einen unbesicherten Kredit ein oder notiere die Konditionen eines Kontokorrents und lege sie als Anlage 2 bei. Wähle die Zinsfälligkeit.
- § 4: Rückzahlungsdatum oder die Raten-Alternative mit Anzahl, Höhe und erstem Termin.
- § 5: Kündigungsfrist und das Datum, ab dem der Gesellschafter frühestens kündigen darf.
- § 6: ohne Sicherheiten oder die konkrete Sicherheit benennen.
- § 7: genau ein Kästchen ankreuzen. Ohne Krise und ohne Bankforderung ist in der Regel kein Rangrücktritt nötig.
- § 9: Datum des Gesellschafterbeschlusses, der den Vertrag genehmigt (Anlage 3).

Erst unterschreiben, dann überweisen, nie umgekehrt. Die Vorlage gibt es als Word zum Anpassen und als PDF für die Ablage beim Steuerberater.`,
      },
      {
        titel: "Typische Fehler beim Gesellschafterdarlehen",
        text: `Fehler eins: Geld überweisen und den Vertrag Monate später nachreichen. Ohne vorherige Vereinbarung ist die Rückzahlung angreifbar und die Zinsen sind steuerlich nicht anerkannt. Fehler zwei: zinslos oder zu billig. Dann liegt eine verdeckte Einlage nahe, und der Vorteil kann bei der Gesellschaft hinterfragt werden. Zu teuer ist ebenso schädlich, weil der überhöhte Teil als verdeckte Gewinnausschüttung gilt.

Fehler drei: Rangrücktritt unterschreiben, ohne die Folgen zu kennen. Mit qualifiziertem Rangrücktritt darfst du dein Geld nur zurückholen, wenn die Gesellschaft es aus freiem Vermögen zahlen kann; in der Krise ist es faktisch gebunden. Fehler vier: Rückzahlung kurz vor der Insolvenz. Der Insolvenzverwalter fordert nach § 135 InsO jede Rückzahlung des letzten Jahres zurück, auch wenn der Vertrag sie erlaubt hat.

Fehler fünf: Kapitalertragsteuer vergessen. Die Gesellschaft muss auf die Zinsen Kapitalertragsteuer einbehalten und anmelden; beim Gesellschafter mit mindestens zehn Prozent Beteiligung gilt dann der persönliche Steuersatz statt der Abgeltungsteuer. Fehler sechs: Darlehen statt Kapitalerhöhung bei der UG. Ein Darlehen stärkt das Eigenkapital nicht und ersetzt nicht die Erhöhung auf 25.000 EUR, mit der die Rücklagenpflicht endet.`,
      },
      {
        titel: "Rechtliche Grundlagen: InsO, GmbHG und Steuerrecht",
        text: `Gesellschafterdarlehen sind seit der GmbH-Reform 2008 in der Insolvenzordnung geregelt. Nach § 39 Abs. 1 Nr. 5 InsO sind sie in der Insolvenz der Gesellschaft kraft Gesetzes nachrangig; Rückzahlungen im letzten Jahr vor dem Insolvenzantrag und Sicherheiten der letzten zehn Jahre sind nach § 135 InsO anfechtbar. Ausgenommen sind nach § 39 Abs. 4 und 5 InsO Kleinbeteiligte mit höchstens zehn Prozent ohne Geschäftsführung sowie Darlehen zur Sanierung.

Der qualifizierte Rangrücktritt stützt sich auf § 19 Abs. 2 Satz 2 InsO: Forderungen mit Rangrücktritt bleiben bei der Überschuldungsprüfung außer Ansatz. Welche Formulierung dafür ausreicht, hat der Bundesgerichtshof präzisiert; die Vorlage verwendet die anerkannte Form mit Rücktritt hinter alle Gläubiger und Zahlung nur aus freiem Vermögen. Gesellschaftsrechtlich gilt daneben die Kapitalerhaltung nach § 30 GmbHG: Rückzahlungen dürfen das Stammkapital nicht angreifen.

Steuerlich prüft das Finanzamt den Fremdvergleich. Zinsen beim Gesellschafter mit mindestens zehn Prozent Beteiligung fallen nach § 32d Abs. 2 Nr. 1 Buchst. b EStG unter den persönlichen Steuersatz. Die Gesellschaft hat Kapitalertragsteuer einzubehalten. Bei Verzicht auf das Darlehen in der Krise ist der werthaltige Teil eine Einlage, der nicht werthaltige Teil ein steuerpflichtiger Ertrag der Gesellschaft, was häufig übersehen wird.`,
      },
      {
        titel: "Wann die Vorlage nicht ausreicht",
        text: `Für den Normalfall, also ein Gründer leiht seiner UG oder GmbH einen fünfstelligen Betrag zu marktüblichen Konditionen, reicht das Muster. Hol dir Beratung, wenn

- die Gesellschaft bereits in der Krise ist oder die Hälfte des Stammkapitals verloren hat; dann geht es um Insolvenzantragspflicht, und der Rangrücktritt muss mit Steuerberater oder Anwalt abgestimmt werden,
- der Betrag im Verhältnis zum Stammkapital sehr hoch ist und das Finanzamt verdecktes Stammkapital vermuten könnte,
- mehrere Gesellschafter in unterschiedlicher Höhe Darlehen geben und die Gleichbehandlung geregelt werden muss,
- das Darlehen aus dem Ausland kommt oder in Fremdwährung läuft,
- eine spätere Umwandlung in Eigenkapital geplant ist; dann ist ein Wandeldarlehen das richtige Instrument,
- der Darlehensgeber eine Holding-GmbH ist und Konzernfinanzierung mit Zinsschranke und Verrechnungspreisen ins Spiel kommt.

Diese Vorlage ist ein Software-Muster von GründerX und keine Steuer- oder Rechtsberatung. Gerade beim Gesellschafterdarlehen sollte der Steuerberater vor der Auszahlung Zinssatz und Vertragsgestaltung freigeben, weil Fehler hier erst Jahre später in der Betriebsprüfung auffallen.`,
      },
    ],
  text: `Darlehensvertrag (Gesellschafterdarlehen)

zwischen

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort], Gesellschafter der nachstehend bezeichneten Gesellschaft mit einer Beteiligung von [Prozent] % am Stammkapital
– nachfolgend „Darlehensgeber“ –

und

[Name] [GmbH / UG (haftungsbeschränkt)], [Straße, PLZ Ort], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch [den Geschäftsführer [Vorname Nachname] / die Gesellschafterversammlung, soweit der Darlehensgeber zugleich alleiniger Geschäftsführer ist und nicht von § 181 BGB befreit ist]
– nachfolgend „Darlehensnehmerin“ –

§ 1 Darlehensbetrag und Auszahlung
(1) Der Darlehensgeber gewährt der Darlehensnehmerin ein Darlehen in Höhe von [Betrag] EUR (in Worten: [Betrag in Worten] Euro).
(2) Die Auszahlung erfolgt [in einer Summe bis zum [Datum] / in [Anzahl] Teilbeträgen von je [Betrag] EUR jeweils zum [Datum]] durch Überweisung auf das Geschäftskonto der Darlehensnehmerin bei der [Bank], IBAN [IBAN].
[Alternative: (2) Der Darlehensbetrag ist bereits am [Datum] ausgezahlt worden / entspricht den vom Darlehensgeber für die Darlehensnehmerin verauslagten Kosten laut Anlage 1. Die Parteien stellen dies hiermit fest.]

§ 2 Verwendungszweck
Das Darlehen dient [der Finanzierung des laufenden Geschäftsbetriebs / der Anschaffung von [Gegenstand] / der Überbrückung eines Liquiditätsengpasses bis zum [Datum]]. Eine andere Verwendung bedarf der Zustimmung des Darlehensgebers.

§ 3 Zinsen
(1) Das Darlehen wird vom Tag der Auszahlung an mit [z. B. 6,0] % pro Jahr verzinst. Die Parteien haben den Zinssatz anhand der Konditionen bestimmt, zu denen die Darlehensnehmerin ein vergleichbares unbesichertes Darlehen bei einem Kreditinstitut erhalten würde (Fremdvergleich); die Herleitung ist in Anlage 2 dokumentiert.
(2) Die Zinsen werden nach der deutschen Zinsmethode (30/360) berechnet und sind [jährlich nachträglich zum 31.12. / vierteljährlich nachträglich / mit der Tilgung] fällig. Nicht gezahlte Zinsen werden [nicht / mit Fälligkeit dem Darlehenskapital zugeschlagen].
(3) Die Darlehensnehmerin behält auf die Zinsen Kapitalertragsteuer und Solidaritätszuschlag ein und führt sie ab, soweit sie gesetzlich dazu verpflichtet ist, und erteilt dem Darlehensgeber eine Steuerbescheinigung.

§ 4 Laufzeit, Tilgung und Rückzahlung
(1) Das Darlehen wird für die Zeit bis zum [Datum] gewährt und ist zu diesem Zeitpunkt in einer Summe zurückzuzahlen.
[Alternative: (1) Das Darlehen wird in [Anzahl] gleichen [monatlichen / vierteljährlichen] Raten von je [Betrag] EUR zuzüglich Zinsen getilgt, erstmals am [Datum].]
(2) Die Darlehensnehmerin ist berechtigt, das Darlehen jederzeit ganz oder teilweise ohne Vorfälligkeitsentschädigung zurückzuzahlen, soweit die Rückzahlung nicht gegen § 7 oder die Kapitalerhaltung (§ 30 GmbHG) verstößt.
(3) Zahlungen werden zunächst auf Kosten, dann auf Zinsen und zuletzt auf das Kapital angerechnet.

§ 5 Kündigung
(1) Beide Parteien können das Darlehen mit einer Frist von [z. B. 3] Monaten zum Monatsende ordentlich kündigen, der Darlehensgeber jedoch frühestens zum [Datum].
(2) Der Darlehensgeber kann das Darlehen aus wichtigem Grund fristlos kündigen, insbesondere wenn die Darlehensnehmerin mit zwei aufeinanderfolgenden Zins- oder Tilgungsraten in Verzug ist, über ihr Vermögen das Insolvenzverfahren beantragt wird, sie das Darlehen zweckwidrig verwendet oder der Darlehensgeber aus der Gesellschaft ausscheidet.
(3) Kündigungen bedürfen der Schriftform.

§ 6 Sicherheiten
Das Darlehen wird [ohne Sicherheiten gewährt / durch [Sicherungsübereignung von [Gegenstand] / Abtretung der Forderungen gegen [Kunde]] besichert; die Sicherheitenbestellung erfolgt in gesonderter Urkunde]. Dem Darlehensgeber ist bekannt, dass Sicherheiten für Gesellschafterdarlehen, die im letzten Jahr vor einem Insolvenzantrag bestellt wurden, anfechtbar sein können (§ 135 Abs. 1 Nr. 1 InsO: zehn Jahre).

§ 7 Rangrücktritt (Option, Zutreffendes ankreuzen)
[ ] Es wird kein Rangrücktritt vereinbart.
[ ] Qualifizierter Rangrücktritt: Der Darlehensgeber tritt mit seinen Ansprüchen auf Rückzahlung des Darlehens und auf Zinsen im Rang hinter die Forderungen aller gegenwärtigen und künftigen Gläubiger der Darlehensnehmerin im Sinne des § 39 Abs. 1 Nr. 1 bis 5 InsO zurück. Die Erfüllung der Ansprüche kann nur aus künftigen Jahresüberschüssen, aus einem Liquidationsüberschuss oder aus sonstigem freien Vermögen verlangt werden, das nach Befriedigung aller anderen Gläubiger verbleibt, und nur, soweit dadurch weder eine Zahlungsunfähigkeit noch eine Überschuldung der Darlehensnehmerin im Sinne der §§ 17, 19 InsO eintritt oder droht. Dieser Rangrücktritt dient der Vermeidung einer Überschuldung (§ 19 Abs. 2 Satz 2 InsO) und wird im Interesse der Gläubiger der Darlehensnehmerin erklärt; er kann nur mit Zustimmung der Darlehensnehmerin aufgehoben werden, solange die Krise andauert. Die Darlehensnehmerin nimmt die Erklärung an.

§ 8 Insolvenzrechtlicher Hinweis
Die Parteien sind sich bewusst, dass Forderungen aus diesem Darlehen in einem Insolvenzverfahren über das Vermögen der Darlehensnehmerin unabhängig von § 7 nachrangig sind (§ 39 Abs. 1 Nr. 5 InsO), soweit nicht das Kleinbeteiligungsprivileg (höchstens 10 % Beteiligung, keine Geschäftsführung) oder das Sanierungsprivileg (§ 39 Abs. 4 und 5 InsO) eingreift, und dass Rückzahlungen innerhalb eines Jahres vor einem Insolvenzantrag vom Insolvenzverwalter angefochten werden können (§ 135 Abs. 1 Nr. 2 InsO).

§ 9 Steuern und Dokumentation
(1) Die Parteien gehen davon aus, dass die Zinsen beim Darlehensgeber wegen seiner Beteiligung von mindestens 10 % dem persönlichen Steuersatz unterliegen (§ 32d Abs. 2 Nr. 1 Buchst. b EStG). Jede Partei trägt ihre eigenen Steuern.
(2) Dieser Vertrag wurde vor Auszahlung des Darlehens geschlossen und wird in der Buchführung der Darlehensnehmerin als Verbindlichkeit gegenüber Gesellschaftern ausgewiesen. Dem Abschluss hat die Gesellschafterversammlung durch Beschluss vom [Datum] zugestimmt.

§ 10 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Gerichtsstand ist, soweit zulässig, der Sitz der Darlehensnehmerin. Es gilt das Recht der Bundesrepublik Deutschland.
(4) Jede Partei erhält eine unterschriebene Ausfertigung.

Anlagen: 1 Aufstellung verauslagter Kosten (falls zutreffend), 2 Herleitung des Zinssatzes (Fremdvergleich), 3 Gesellschafterbeschluss vom [Datum]

[Ort], den [Datum]


______________________________
[Vorname Nachname], Darlehensgeber


______________________________
[Name] [GmbH / UG (haftungsbeschränkt)], vertreten durch [Vorname Nachname], Geschäftsführer

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
