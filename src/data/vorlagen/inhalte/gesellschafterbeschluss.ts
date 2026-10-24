// Inhalt der Vorlage „gesellschafterbeschluss“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../gesellschaft.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann brauchst du einen Gesellschafterbeschluss im Umlaufverfahren?",
        text: `Jede GmbH und UG muss einmal im Jahr den Jahresabschluss feststellen, über den Gewinn entscheiden und die Geschäftsführung entlasten. Bei zwei oder drei Gesellschaftern, die sich ohnehin täglich sehen, wäre eine förmliche Versammlung mit Einladung per Einschreiben reiner Aufwand. Der Umlaufbeschluss erledigt das schriftlich, per Post oder als Scan per E-Mail.

Du brauchst die Vorlage außerdem für Beschlüsse, die ein Dritter sehen will: Das Handelsregister verlangt bei der Bestellung eines Geschäftsführers den Beschluss, die Bank will für eine Kreditlinie den Gesellschafterbeschluss, das Finanzamt fragt beim Geschäftsführergehalt nach der vorherigen Genehmigung, und Investoren prüfen in der Due Diligence das Beschlussbuch. Wer seine Beschlüsse nur mündlich fasst, hat im Streit und in der Betriebsprüfung nichts in der Hand. Diese Vorlage bündelt die vier jährlichen Standardbeschlüsse plus einen freien Beschlussgegenstand in einem Dokument.`,
      },
      {
        titel: "Was muss in einen Umlaufbeschluss der GmbH?",
        text: `Ein Umlaufbeschluss braucht mehr als die bloße Entscheidung. Die Vorlage ist in drei Teile gegliedert:

- Teil I: Bezeichnung der Gesellschaft mit Handelsregisternummer, alle Gesellschafter mit Anteilen und Prozenten, die ausdrückliche Zustimmung zum schriftlichen Verfahren nach § 48 Abs. 2 GmbHG, der Verzicht auf Form und Frist und eine Abstimmungsfrist.
- Teil II: je Beschlussgegenstand der vollständige Beschlusstext, die Stimmabgabe jedes Gesellschafters mit Ja, Nein oder Enthaltung und das Ergebnis in Prozent. Die Vorlage enthält Feststellung des Jahresabschlusses (Beschluss 1), Ergebnisverwendung mit UG-Rücklage, Ausschüttung, Gewinnrücklage und Vortrag (Beschluss 2), Entlastung mit Hinweis auf das Stimmverbot des Gesellschafter-Geschäftsführers (Beschluss 3), Bestellung oder Abberufung eines Geschäftsführers mit Vertretungsregelung und § 181 BGB (Beschluss 4) und einen freien Beschluss (Beschluss 5).
- Teil III: Feststellung des Ergebnisses durch die Geschäftsführung, Wirksamkeitszeitpunkt, Ablage im Beschlussbuch, Unterschriften aller Gesellschafter mit Ort und Datum.

Wichtig ist die Trennung von Verfahrenszustimmung und Abstimmung: Mit dem Verfahren müssen alle einverstanden sein, dem Inhalt nur die nötige Mehrheit.`,
      },
      {
        titel: "Gesellschafterbeschluss Muster ausfüllen: so gehst du vor",
        text: `Die Platzhalter sind schnell erledigt, wenn Jahresabschluss und Gesellschafterliste vorliegen:

- Kopf: Firma, Rechtsform, Sitz, Amtsgericht und HRB-Nummer; je Gesellschafter Anzahl der Anteile, Nennbetrag und Prozentsatz laut aktueller Gesellschafterliste.
- Teil I: Paragraph der Satzung, falls sie das Umlaufverfahren regelt, und die Abstimmungsfrist.
- Beschluss 1: Bilanzstichtag, Datum der Übermittlung des Abschlusses, Bilanzsumme und Jahresüberschuss oder Fehlbetrag.
- Beschluss 2: Bilanzgewinn und die Aufteilung auf Rücklage (nur UG, 25 Prozent), Ausschüttung mit Zahltag, Gewinnrücklagen und Vortrag; die Beträge müssen den Bilanzgewinn genau ergeben. Bei Verlust die Alternative verwenden.
- Beschluss 3: Namen der Geschäftsführer; bei Gesellschafter-Geschäftsführern in der Abstimmungszeile kein Stimmrecht eintragen.
- Beschluss 4: Name, Geburtsdatum, Anschrift, Beginn, Vertretungsbefugnis und § 181 BGB des neuen Geschäftsführers, oder die Abberufungs-Alternative. Die Eckpunkte des Anstellungsvertrags in Anlage 1.
- Beschluss 5: nur ausfüllen, wenn es einen weiteren Gegenstand gibt, sonst streichen.

Jeder Gesellschafter trägt in jeder Abstimmungszeile seine Stimme ein und unterschreibt mit Ort und Datum. Die Geschäftsführung sammelt alle Exemplare, trägt die Ergebnisse ein, unterschreibt die Feststellung und schickt jedem eine vollständige Kopie. Die Vorlage gibt es als Word zur Bearbeitung und als PDF zum Rundsenden.`,
      },
      {
        titel: "Typische Fehler bei Umlaufbeschlüssen",
        text: `Fehler eins: ein Gesellschafter unterschreibt nicht und widerspricht später. Dann fehlt die Zustimmung zum Verfahren und der Beschluss ist anfechtbar. Setze eine Frist, dokumentiere den Versand und hole bei Funkstille lieber zur Versammlung ein.

Fehler zwei: Der Gesellschafter-Geschäftsführer stimmt bei seiner eigenen Entlastung mit. Nach § 47 Abs. 4 GmbHG ist er ausgeschlossen; bei einer Zweipersonen-GmbH mit zwei Geschäftsführern entlastet also jeder den anderen. Fehler drei: Die UG beschließt die Vollausschüttung und vergisst die gesetzliche Rücklage; ein solcher Beschluss ist nichtig.

Fehler vier: Die Ausschüttung wird beschlossen, ohne die Kapitalertragsteuer einzuplanen. Die Gesellschaft muss 25 Prozent plus Solidaritätszuschlag einbehalten und bis zum zehnten des Folgemonats anmelden und abführen. Fehler fünf: Die Geschäftsführerbestellung wird beschlossen, aber nicht zum Handelsregister angemeldet. Der neue Geschäftsführer muss die Anmeldung notariell beglaubigen lassen und versichern, dass keine Bestellungshindernisse vorliegen. Und schließlich: die Fristen. Der Jahresabschluss kleiner Gesellschaften muss binnen elf Monaten festgestellt und binnen zwölf Monaten offengelegt werden; wer den Beschluss im Dezember nachholt, riskiert Ordnungsgeld.`,
      },
      {
        titel: "Rechtliche Grundlagen: § 48 GmbHG und die Jahresbeschlüsse",
        text: `Gesellschafterbeschlüsse werden grundsätzlich in Versammlungen gefasst (§ 48 Abs. 1 GmbHG). Die schriftliche Abstimmung ist nach § 48 Abs. 2 GmbHG zulässig, wenn alle Gesellschafter in Textform mit der Beschlussfassung einverstanden sind oder dem schriftlichen Verfahren zustimmen. Seit dem 1. Januar 2025 genügt auch für die Stimmabgabe die Textform, also auch eine E-Mail mit eingescannter Unterschrift, sofern die Satzung nichts Strengeres verlangt.

Die Jahresbeschlüsse folgen aus § 46 Nr. 1 GmbHG (Feststellung des Jahresabschlusses, Ergebnisverwendung) und § 46 Nr. 5 GmbHG (Bestellung, Abberufung und Entlastung der Geschäftsführer). Die Frist für die Feststellung ergibt sich aus § 42a Abs. 2 GmbHG: acht Monate, bei kleinen Gesellschaften elf Monate nach Bilanzstichtag. Die Rücklagenpflicht der UG steht in § 5a Abs. 3 GmbHG, das Stimmverbot bei Entlastung in § 47 Abs. 4 GmbHG.

Nicht im Umlaufverfahren möglich sind Beschlüsse, die der notariellen Beurkundung bedürfen: Satzungsänderungen, Kapitalerhöhungen, Umwandlungen und die Auflösung. Bei der Einpersonen-GmbH gilt § 48 Abs. 3 GmbHG: Der Alleingesellschafter muss jeden Beschluss unverzüglich schriftlich niederlegen und unterschreiben. Das Beschlussbuch sollte zehn Jahre aufbewahrt werden, weil es handelsrechtlich zu den Geschäftsunterlagen zählt.`,
      },
      {
        titel: "Wann der Umlaufbeschluss nicht ausreicht",
        text: `Das Umlaufverfahren setzt Einigkeit über das Verfahren voraus. Sobald ein Gesellschafter nicht mitzieht, gegen die Geschäftsführung opponiert oder ein Beschluss angefochten werden könnte, solltest du förmlich zur Versammlung einladen und ein Protokoll führen; beide Vorlagen findest du in dieser Kategorie. Außerdem reicht der Beschluss nicht, wenn

- die Satzung geändert, das Kapital erhöht oder die Gesellschaft aufgelöst werden soll; dann ist der Notar zwingend,
- eine Ausschüttung beschlossen wird, obwohl die Gesellschaft Verluste erwartet oder Gesellschafterdarlehen offen sind; hier sollte der Steuerberater die Kapitalerhaltung und die Liquidität prüfen,
- ein Geschäftsführer aus wichtigem Grund abberufen werden soll und Streit über die Berechtigung droht,
- die Gesellschaft einen Aufsichtsrat oder Beirat hat, dessen Zustimmung die Satzung vorschreibt,
- Investoren Sonderrechte haben, die bestimmte Beschlüsse von ihrer Zustimmung abhängig machen.

In solchen Fällen prüft ein Anwalt für Gesellschaftsrecht den Beschlusstext vorab. Diese Vorlage von GründerX ist ein Software-Muster und keine Rechtsberatung; für die jährlichen Standardbeschlüsse einer unstreitigen GmbH oder UG reicht sie als Word oder PDF vollständig aus.`,
      },
    ],
  text: `Gesellschafterbeschluss im schriftlichen Umlaufverfahren

der [Name] [GmbH / UG (haftungsbeschränkt)] mit Sitz in [Ort], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer] (die „Gesellschaft“)

Gesellschafter:
1. [Vorname Nachname], [Anzahl] Geschäftsanteile im Nennbetrag von insgesamt [Betrag] EUR ([Prozent] % des Stammkapitals)
2. [Vorname Nachname], [Anzahl] Geschäftsanteile im Nennbetrag von insgesamt [Betrag] EUR ([Prozent] % des Stammkapitals)
[3. ggf. weitere Gesellschafter]

I. Verzicht auf Form und Frist, Einverständnis mit dem Umlaufverfahren
Die unterzeichnenden Gesellschafter halten sämtliche Geschäftsanteile der Gesellschaft. Sie erklären sich gemäß § 48 Abs. 2 GmbHG [und § [Nummer] des Gesellschaftsvertrags] mit der Beschlussfassung im schriftlichen Umlaufverfahren einverstanden und verzichten auf die Einhaltung aller gesetzlichen und satzungsmäßigen Vorschriften über Form, Frist und Ankündigung einer Gesellschafterversammlung. Die Stimmabgabe erfolgt durch Unterzeichnung dieses Dokuments; die Rücksendung per Post, Fax oder als Scan per E-Mail an die Geschäftsführung ist ausreichend. Abstimmungsfrist: bis zum [Datum].

II. Beschlussgegenstände

Beschluss 1: Feststellung des Jahresabschlusses zum 31.12.[Jahr]
Der von der Geschäftsführung aufgestellte und den Gesellschaftern am [Datum] übermittelte Jahresabschluss der Gesellschaft zum 31.12.[Jahr], bestehend aus Bilanz, Gewinn- und Verlustrechnung und Anhang [sowie Lagebericht], der mit einer Bilanzsumme von [Betrag] EUR und einem Jahresüberschuss / Jahresfehlbetrag von [Betrag] EUR abschließt, wird festgestellt.
Abstimmung: Gesellschafter 1: [Ja / Nein / Enthaltung]   Gesellschafter 2: [Ja / Nein / Enthaltung]
Ergebnis: [angenommen / abgelehnt] mit [Prozent] % der abgegebenen Stimmen.

Beschluss 2: Verwendung des Ergebnisses
Der Bilanzgewinn des Geschäftsjahres [Jahr] in Höhe von [Betrag] EUR wird wie folgt verwendet:
   a) Einstellung in die gesetzliche Rücklage nach § 5a Abs. 3 GmbHG (nur UG): [Betrag] EUR (25 % des um einen Verlustvortrag geminderten Jahresüberschusses),
   b) Ausschüttung an die Gesellschafter im Verhältnis ihrer Geschäftsanteile: [Betrag] EUR, zahlbar am [Datum] unter Einbehalt der Kapitalertragsteuer und des Solidaritätszuschlags,
   c) Einstellung in die Gewinnrücklagen: [Betrag] EUR,
   d) Vortrag auf neue Rechnung: [Betrag] EUR.
[Alternative bei Jahresfehlbetrag: Der Jahresfehlbetrag in Höhe von [Betrag] EUR wird auf neue Rechnung vorgetragen.]
Abstimmung: Gesellschafter 1: [Ja / Nein / Enthaltung]   Gesellschafter 2: [Ja / Nein / Enthaltung]
Ergebnis: [angenommen / abgelehnt] mit [Prozent] % der abgegebenen Stimmen.

Beschluss 3: Entlastung der Geschäftsführung
Dem Geschäftsführer / den Geschäftsführern [Vorname Nachname] [und Vorname Nachname] wird für das Geschäftsjahr [Jahr] Entlastung erteilt.
Hinweis: Ein Gesellschafter, der zugleich Geschäftsführer ist, ist bei seiner eigenen Entlastung vom Stimmrecht ausgeschlossen (§ 47 Abs. 4 GmbHG); bei mehreren Geschäftsführern wird über jede Entlastung getrennt abgestimmt.
Abstimmung über die Entlastung von [Name]: Gesellschafter 1: [Ja / Nein / Enthaltung / kein Stimmrecht]   Gesellschafter 2: [Ja / Nein / Enthaltung / kein Stimmrecht]
Ergebnis: [angenommen / abgelehnt] mit [Prozent] % der abgegebenen stimmberechtigten Stimmen.

Beschluss 4: Bestellung eines Geschäftsführers
[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort], wird mit Wirkung ab dem [Datum] zum [weiteren] Geschäftsführer der Gesellschaft bestellt. Er / sie vertritt die Gesellschaft [einzeln / gemeinsam mit einem weiteren Geschäftsführer oder einem Prokuristen] und ist [von den Beschränkungen des § 181 BGB befreit / nicht von den Beschränkungen des § 181 BGB befreit]. Die Bestellung ist zum Handelsregister anzumelden. Der Abschluss eines Anstellungsvertrags mit dem neuen Geschäftsführer zu den in Anlage 1 bezeichneten Konditionen wird genehmigt; [Vorname Nachname] wird bevollmächtigt, den Vertrag für die Gesellschaft zu unterzeichnen.
[Alternative: Der Geschäftsführer [Vorname Nachname] wird mit Wirkung zum [Datum] abberufen. Der Anstellungsvertrag wird [fristgerecht zum [Datum] / aus wichtigem Grund fristlos] gekündigt.]
Abstimmung: Gesellschafter 1: [Ja / Nein / Enthaltung]   Gesellschafter 2: [Ja / Nein / Enthaltung]
Ergebnis: [angenommen / abgelehnt] mit [Prozent] % der abgegebenen Stimmen.

Beschluss 5: Sonstiges [optional]
[z. B. „Die Geschäftsführung wird ermächtigt, bei der [Bank] eine Kontokorrentlinie bis zu [Betrag] EUR aufzunehmen.“ / „Dem Abschluss des Mietvertrags über die Geschäftsräume [Adresse] mit einer Laufzeit von [Jahren] wird zugestimmt.“ / „Die Gesellschafter stellen fest, dass die Voraussetzungen für die Erhöhung des Stammkapitals auf 25.000 EUR vorliegen, und beauftragen die Geschäftsführung, einen Notartermin zu vereinbaren.“]
Abstimmung: Gesellschafter 1: [Ja / Nein / Enthaltung]   Gesellschafter 2: [Ja / Nein / Enthaltung]
Ergebnis: [angenommen / abgelehnt] mit [Prozent] % der abgegebenen Stimmen.

III. Feststellung
Nach Eingang aller Stimmabgaben stellt die Geschäftsführung das Ergebnis fest und übermittelt jedem Gesellschafter eine Kopie dieses Beschlusses mit allen Unterschriften. Die Beschlüsse werden mit dem Zugang der Feststellung beim letzten Gesellschafter wirksam, soweit oben kein anderes Datum bestimmt ist. Der Beschluss wird im Beschlussbuch der Gesellschaft abgelegt.

Weitere Beschlüsse werden nicht gefasst.


Gesellschafter 1

[Ort], den [Datum]

______________________________
[Vorname Nachname]


Gesellschafter 2

[Ort], den [Datum]

______________________________
[Vorname Nachname]


[Gesellschafter 3

[Ort], den [Datum]

______________________________
[Vorname Nachname]]


Feststellung des Ergebnisses durch die Geschäftsführung

[Ort], den [Datum]

______________________________
[Vorname Nachname], Geschäftsführer

Anlage 1: Eckpunkte des Geschäftsführer-Anstellungsvertrags (bei Beschluss 4)

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
