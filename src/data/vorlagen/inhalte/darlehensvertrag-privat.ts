// Inhalt der Vorlage „darlehensvertrag-privat“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../finanzen.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen privaten Darlehensvertrag brauchst",
        text: `Ein Privatdarlehen ist der häufigste Weg, mit dem Gründer an ihr erstes Kapital kommen: Eltern strecken die Notarkosten vor, ein Freund finanziert den ersten Warenbestand, die Partnerin leiht Geld für Laptop und Website. Solange alles gut läuft, fragt niemand nach einem Vertrag. Streit entsteht erst, wenn die Rückzahlung stockt, wenn der Darlehensgeber das Geld plötzlich zurückbraucht oder wenn das Finanzamt wissen will, woher das Eigenkapital in der Bilanz stammt.

Genau für diese Fälle brauchst du einen schriftlichen Darlehensvertrag. Die Vorlage passt für Darlehen zwischen Privatpersonen und für Darlehen einer Privatperson an dein Einzelunternehmen, deine GbR oder deine GmbH. Sie dient außerdem als Nachweis gegenüber Bank und Förderstelle, dass das Geld geliehen und nicht geschenkt wurde.`,
      },
      {
        titel: "Was muss in einen Darlehensvertrag? Die Pflichtpunkte",
        text: `Ein Darlehensvertrag muss nicht lang sein, aber er muss die Punkte regeln, über die später gestritten wird. Die Vorlage deckt sie in acht Paragraphen ab:

- Darlehensbetrag in Zahlen und Worten, Auszahlungstermin und Konto (§ 1), damit der Geldfluss nachvollziehbar ist
- Verwendungszweck, falls das Geld nur für die Gründung oder eine Anschaffung gedacht ist (§ 1 Abs. 4)
- Zinssatz, Zinsperiode und Berechnungsbasis oder die ausdrückliche Vereinbarung, dass das Darlehen zinslos ist (§ 2)
- Laufzeit, Ratenhöhe, erste Fälligkeit und das Recht auf vorzeitige Rückzahlung ohne Vorfälligkeitsentschädigung (§ 3)
- Kündigung: ordentlich ausgeschlossen oder mit drei Monaten Frist, fristlos bei Zahlungsrückstand oder Insolvenzantrag (§ 4)
- Sicherheiten wie Bürgschaft oder Sicherungsübereignung und deren Freigabe (§ 5)
- Verzugsfolgen mit Verzugszinsen von fünf Prozentpunkten über dem Basiszinssatz (§ 6)
- Schriftformklausel, salvatorische Klausel und Gerichtsstand (§ 8)

Fehlt einer dieser Punkte, greift die gesetzliche Regelung, und die ist für private Darlehen oft unpassend: Ohne vereinbarte Laufzeit kann jede Seite jederzeit mit drei Monaten Frist kündigen.`,
      },
      {
        titel: "Darlehensvertrag Muster ausfüllen: Schritt für Schritt",
        text: `Lade die Vorlage als Word-Datei oder PDF herunter und arbeite die Platzhalter in eckigen Klammern von oben nach unten ab. Trage zuerst beide Parteien mit vollem Namen, Geburtsdatum und Anschrift ein; leiht jemand an deine Firma, steht dort die Firma mit Rechtsform. In § 1 setzt du den Betrag in Zahlen und Worten ein und das Datum, bis zu dem überwiesen wird.

In § 2 entscheidest du dich für einen Zinssatz oder streichst den Absatz und übernimmst die Alternative für das zinslose Darlehen. In § 3 rechnest du den Ratenplan durch: Anzahl der Raten mal Ratenhöhe muss den Darlehensbetrag ergeben, bei Verzinsung kommen die Zinsen dazu. In § 4 wählst du zwischen fester Laufzeit ohne ordentliche Kündigung und unbestimmter Laufzeit mit drei Monaten Frist. In § 5 trägst du Sicherheiten ein oder wählst Variante B. Streiche alle nicht gewählten Alternativen, bevor beide unterschreiben, und überweise das Geld erst nach der Unterschrift.`,
      },
      {
        titel: "Zinsloses Darlehen, Schenkungsteuer und Fremdvergleich",
        text: `Der häufigste Fehler bei Darlehen in der Familie ist das zinslose Darlehen ohne Blick auf die Schenkungsteuer. Verzichtet der Darlehensgeber auf Zinsen, schenkt er steuerlich den Nutzungsvorteil (§ 7 Abs. 1 Nr. 1 ErbStG). Das Finanzamt bewertet diesen Vorteil mit 5,5 % pro Jahr auf den Darlehensbetrag, solange kein niedrigerer marktüblicher Zins nachgewiesen wird. Bei 50.000 EUR sind das als Faustformel 2.750 EUR pro Jahr; die genaue Bewertung läuft über den Kapitalwert nach dem Bewertungsgesetz. Innerhalb der Freibeträge (400.000 EUR bei Kindern, 20.000 EUR bei Geschwistern, Freunden und Partnern ohne Trauschein, jeweils in zehn Jahren) bleibt das folgenlos.

Der zweite Fehler ist der fehlende Fremdvergleich: Das Finanzamt erkennt Zinsen als Betriebsausgaben nur an, wenn der Vertrag so aussieht, wie ihn Fremde geschlossen hätten, und tatsächlich so gelebt wird. Also: Zinsen pünktlich überweisen, Raten einhalten, Änderungen schriftlich nachtragen. Der dritte Fehler ist Bargeld. Ohne Kontoauszug kannst du weder den Geldfluss noch die Rückzahlung beweisen.`,
      },
      {
        titel: "Rechtliche Grundlagen: § 488 BGB, Kündigung und Verzug",
        text: `Das Darlehen regelt § 488 BGB: Der Darlehensgeber muss den Betrag auszahlen, der Darlehensnehmer schuldet Zinsen und Rückzahlung bei Fälligkeit. Ist keine Laufzeit vereinbart, gilt nach § 488 Abs. 3 BGB für beide Seiten eine Kündigungsfrist von drei Monaten; ein zinsloses Darlehen darf der Darlehensnehmer sogar ohne Kündigung zurückzahlen. Die Vorlage schließt die ordentliche Kündigung für die Laufzeit aus und behält dem Darlehensgeber die fristlose Kündigung bei Verschlechterung der Vermögensverhältnisse vor (§ 490 Abs. 1 BGB).

Verzug tritt bei kalendermäßig bestimmten Raten automatisch ein (§ 286 Abs. 2 Nr. 1 BGB), die Verzugszinsen betragen fünf Prozentpunkte über dem Basiszinssatz (§ 288 Abs. 1 BGB). Steuerlich sind die Zinsen beim Darlehensnehmer Betriebsausgaben, beim privaten Darlehensgeber Einkünfte aus Kapitalvermögen. Ein einzelnes privates Darlehen ist kein erlaubnispflichtiges Kreditgeschäft; erst wer wiederholt und gewerbsmäßig Geld verleiht, braucht eine BaFin-Erlaubnis nach dem KWG.`,
      },
      {
        titel: "Wann die kostenlose Vorlage nicht reicht",
        text: `Die Vorlage ist für überschaubare Beträge zwischen Privatpersonen und Gründern gemacht. Sie reicht nicht, wenn ein Unternehmer als Darlehensgeber einem Verbraucher Geld leiht: Dann liegt ein Verbraucherdarlehen vor (§ 491 BGB) mit Pflichtangaben, Widerrufsrecht und Formvorgaben, die die Vorlage nicht enthält. Bei Beträgen, die für eine Seite existenziell sind, bei Grundschulden als Sicherheit oder bei Darlehen von mehreren Geldgebern mit unterschiedlichen Rängen gehört ein Anwalt an den Tisch.

Für die Schenkungsteuer oberhalb der Freibeträge und für die Frage, ob der Zins einem Fremdvergleich standhält, ist der Steuerberater zuständig. GründerX stellt dir die Vorlage als Software-Werkzeug bereit und ersetzt keine Rechts- oder Steuerberatung.`,
      },
    ],
  text: `Darlehensvertrag (Privatdarlehen)

zwischen

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
– nachfolgend „Darlehensgeber“ –

und

[Vorname Nachname / Firma], [Straße, PLZ Ort]
– nachfolgend „Darlehensnehmer“ –

§ 1 Darlehensbetrag, Auszahlung und Verwendungszweck
(1) Der Darlehensgeber gewährt dem Darlehensnehmer ein Darlehen in Höhe von [Betrag] EUR (in Worten: [Betrag in Worten] Euro).
(2) Der Darlehensbetrag wird bis zum [Datum] in einer Summe durch Überweisung auf das Konto des Darlehensnehmers, IBAN [IBAN] bei der [Bank], ausgezahlt. [Alternative: Die Auszahlung erfolgt in [Anzahl] Teilbeträgen zu je [Betrag] EUR, fällig am [Daten].]
(3) Der Empfang des Darlehensbetrags wird durch den Kontoauszug oder eine gesonderte Quittung nachgewiesen.
(4) Das Darlehen dient folgendem Zweck: [z. B. „Gründung und Anlaufkosten des Einzelunternehmens [Name]“ / „Anschaffung von Betriebsausstattung“]. Der Darlehensnehmer darf das Darlehen nur für diesen Zweck verwenden. [Alternative: Das Darlehen wird ohne Zweckbindung gewährt.]

§ 2 Zinsen
(1) Das Darlehen wird mit [z. B. 3,0] % pro Jahr verzinst. Die Zinsen werden auf den jeweils offenen Darlehensbetrag berechnet und sind [monatlich / vierteljährlich / jährlich] nachträglich zum [Tag] fällig. Die Berechnung erfolgt taggenau auf Basis von 365 Tagen im Jahr.
(2) [Alternative bei zinslosem Darlehen: Das Darlehen wird zinslos gewährt. Den Parteien ist bekannt, dass der Verzicht auf Zinsen steuerlich als Schenkung des Nutzungsvorteils gewertet werden kann (§ 7 Abs. 1 Nr. 1 ErbStG), soweit der Vorteil die persönlichen Freibeträge übersteigt.]

§ 3 Laufzeit, Tilgung und Fälligkeit
(1) Das Darlehen wird für die Zeit vom [Datum] bis zum [Datum] gewährt.
(2) Die Rückzahlung erfolgt in [Anzahl] gleichbleibenden monatlichen Raten von je [Betrag] EUR, erstmals am [Datum], danach jeweils zum [z. B. 1.] eines Monats, auf das Konto des Darlehensgebers, IBAN [IBAN] bei der [Bank]. [Alternative: Das Darlehen ist am [Datum] in einer Summe zur Rückzahlung fällig.]
(3) Zahlungen werden zunächst auf Kosten, dann auf Zinsen und zuletzt auf die Hauptforderung angerechnet (§ 367 BGB).
(4) Der Darlehensnehmer darf das Darlehen jederzeit ganz oder teilweise vorzeitig zurückzahlen. Eine Vorfälligkeitsentschädigung wird nicht geschuldet. Bei Teilrückzahlungen verkürzt sich die Laufzeit; die Ratenhöhe bleibt unverändert.
(5) Der Darlehensgeber erteilt auf Verlangen jährlich eine Aufstellung über Zinsen, Tilgung und Restschuld.

§ 4 Kündigung
(1) Das Recht zur ordentlichen Kündigung ist für die vereinbarte Laufzeit ausgeschlossen. [Alternative bei unbestimmter Laufzeit: Beide Parteien können das Darlehen mit einer Frist von drei Monaten kündigen (§ 488 Abs. 3 BGB).]
(2) Der Darlehensgeber kann das Darlehen aus wichtigem Grund fristlos kündigen, insbesondere wenn
   a) der Darlehensnehmer mit zwei aufeinanderfolgenden Raten oder Zinszahlungen ganz oder teilweise in Verzug ist und eine schriftlich gesetzte Nachfrist von zwei Wochen fruchtlos verstrichen ist,
   b) in den Vermögensverhältnissen des Darlehensnehmers eine wesentliche Verschlechterung eintritt oder einzutreten droht, durch die die Rückzahlung gefährdet wird (§ 490 Abs. 1 BGB),
   c) der Darlehensnehmer unrichtige Angaben über seine Vermögensverhältnisse gemacht oder das Darlehen zweckwidrig verwendet hat,
   d) über das Vermögen des Darlehensnehmers die Eröffnung eines Insolvenzverfahrens beantragt wird.
(3) Mit Zugang der Kündigung wird der gesamte noch offene Darlehensbetrag einschließlich aufgelaufener Zinsen sofort zur Rückzahlung fällig.
(4) Das gesetzliche Kündigungsrecht des Darlehensnehmers nach § 489 BGB bleibt unberührt.
(5) Jede Kündigung bedarf der Schriftform.

§ 5 Sicherheiten
(1) [Variante A: Zur Sicherung aller Ansprüche aus diesem Vertrag stellt der Darlehensnehmer folgende Sicherheit: [z. B. „Sicherungsübereignung des Fahrzeugs [Marke, Modell, Fahrzeug-Identifizierungsnummer] gemäß gesonderter Vereinbarung“ / „selbstschuldnerische Bürgschaft von [Name] gemäß gesonderter Bürgschaftsurkunde“ / „Abtretung der Ansprüche aus [Vertrag]“].]
[Variante B: Sicherheiten werden nicht gestellt.]
(2) Der Darlehensgeber gibt gestellte Sicherheiten frei, sobald und soweit ihr Wert den offenen Darlehensbetrag dauerhaft um mehr als [z. B. 20] % übersteigt, spätestens nach vollständiger Rückzahlung.

§ 6 Verzug
(1) Verzug tritt ohne Mahnung ein, wenn eine Zahlung zu dem kalendermäßig bestimmten Termin nicht geleistet wird (§ 286 Abs. 2 Nr. 1 BGB).
(2) Während des Verzugs schuldet der Darlehensnehmer Verzugszinsen in Höhe von fünf Prozentpunkten über dem jeweiligen Basiszinssatz (§ 288 Abs. 1 BGB). Der Nachweis eines höheren oder niedrigeren Schadens bleibt beiden Parteien vorbehalten.

§ 7 Informationspflichten
Der Darlehensnehmer teilt dem Darlehensgeber unverzüglich mit, wenn sich seine Anschrift oder Bankverbindung ändert oder wenn Umstände eintreten, die die vertragsgemäße Rückzahlung gefährden könnten.

§ 8 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Schriftformklausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Anstelle der unwirksamen Bestimmung gilt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit eine Gerichtsstandsvereinbarung gesetzlich zulässig ist, [Ort].
(4) Jede Partei erhält eine unterschriebene Ausfertigung dieses Vertrags.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Darlehensgeber


______________________________
[Vorname Nachname], Darlehensnehmer

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
