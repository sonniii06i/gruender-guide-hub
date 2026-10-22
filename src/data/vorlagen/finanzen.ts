import { VORLAGEN_HINWEIS, type Vorlage } from "./types";

// Geld & Forderungen: Darlehen, Ratenzahlung, Schuldanerkenntnis, Abtretung,
// Quittung, Bürgschaft, Mahnwesen, Vergleich, Kleinunternehmer-Rechnung.
// Rechtsstand: BGB (§§ 286, 288, 368, 398, 488 ff., 765 ff., 779, 781),
// UStG/UStDV (§ 19 UStG mit 25.000/100.000 EUR seit 2025, § 34a UStDV),
// InsO (§§ 39, 135), KWG (§§ 1, 32). Stand 2026-10.

export const VORLAGEN_FINANZEN: Vorlage[] = [
  {
    slug: "darlehensvertrag-privat",
    titel: "Darlehensvertrag (Privatdarlehen)",
    kurz: "Darlehen von Familie oder Freunden an Gründer sauber regeln: Betrag, Zins oder zinslos, Tilgung, Kündigung und Sicherheiten.",
    kategorie: "finanzen",
    dateiname: "Darlehensvertrag-Privatdarlehen",
    wofuer: [
      "Eltern, Geschwister oder Freunde leihen dir Startkapital für die Gründung",
      "Du leihst privat Geld an eine andere Person und willst Rückzahlung und Zinsen festhalten",
      "Als Nachweis gegenüber Bank, Finanzamt oder Förderstelle, woher das Eigenkapital stammt",
      "Wenn ein zinsloses Darlehen bewusst von einer Schenkung abgegrenzt werden soll",
    ],
    enthaelt: [
      "§ 1 Darlehensbetrag, Auszahlung und Verwendungszweck",
      "§ 2 Zinsen (verzinst oder zinslos mit Steuerhinweis)",
      "§ 3 Laufzeit, Tilgung, Fälligkeit und vorzeitige Rückzahlung",
      "§ 4 Kündigung (ordentlich, aus wichtigem Grund, § 488 Abs. 3 BGB)",
      "§ 5 Sicherheiten und Freigabe",
      "§ 6 Verzug und Verzugszinsen",
      "§ 7 Informationspflichten",
      "§ 8 Schlussbestimmungen",
    ],
    hinweise: [
      "Ein zinsloses Darlehen ist steuerlich eine Schenkung des Zinsvorteils (§ 7 Abs. 1 Nr. 1 ErbStG). Das Finanzamt rechnet mit 5,5 % pro Jahr, wenn kein niedrigerer Marktzins nachgewiesen wird. Innerhalb der Freibeträge (Kinder 400.000 EUR, sonstige Personen 20.000 EUR in zehn Jahren) bleibt das folgenlos, darüber nicht.",
      "Ohne vereinbarte Laufzeit kann jede Seite mit drei Monaten Frist kündigen (§ 488 Abs. 3 BGB). Wer Planungssicherheit will, schreibt eine feste Laufzeit und schließt die ordentliche Kündigung aus.",
      "Zinsen, die du als Gründer zahlst, sind Betriebsausgaben; der private Darlehensgeber versteuert sie als Kapitalerträge. Das Finanzamt erkennt Verträge unter Angehörigen nur an, wenn sie wie unter Fremden vereinbart und tatsächlich durchgeführt werden.",
      "Überweise das Geld immer per Bank und nie bar. Ohne nachvollziehbaren Geldfluss gilt das Darlehen bei Bank, Finanzamt und im Streitfall schnell als nicht existent.",
    ],
    faqs: [
      {
        q: "Muss ein Privatdarlehen schriftlich abgeschlossen werden?",
        a: "Nein, ein Darlehensvertrag ist formfrei und gilt auch mündlich. Ohne Vertrag musst du im Streit aber beweisen, dass es ein Darlehen und keine Schenkung war, und umgekehrt. Deshalb ist die Schriftform für beide Seiten die bessere Absicherung, erst recht gegenüber dem Finanzamt.",
      },
      {
        q: "Darf ich einem Freund Geld mit Zinsen leihen, ohne eine Bank zu sein?",
        a: "Ja. Ein einzelnes, privates Darlehen ist kein erlaubnispflichtiges Kreditgeschäft nach dem KWG. Problematisch wird es erst, wenn jemand regelmäßig und gewerblich Darlehen vergibt. Die Zinsen muss der Darlehensgeber als Einkünfte aus Kapitalvermögen angeben.",
      },
      {
        q: "Wie hoch dürfen die Zinsen sein?",
        a: "Es gibt keine feste Obergrenze, aber Zinsen, die den marktüblichen Satz um etwa das Doppelte übersteigen, können sittenwidrig und damit unwirksam sein. Orientiere dich an aktuellen Bankzinsen für vergleichbare Kredite und begründe Aufschläge mit fehlenden Sicherheiten.",
      },
      {
        q: "Was passiert, wenn der Darlehensnehmer nicht zurückzahlt?",
        a: "Bei festen Zahlterminen tritt Verzug automatisch ein, und es fallen Verzugszinsen an. Nach erfolgloser Nachfrist kannst du das Darlehen kündigen und den gesamten Rest einfordern, notfalls per Mahnbescheid. Ohne Sicherheiten trägst du das volle Ausfallrisiko.",
      },
    ],
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
    seo: {
      title: "Darlehensvertrag privat Vorlage kostenlos (Word) | GründerX",
      description:
        "Privatdarlehen-Vertrag als kostenlose Vorlage: Betrag, Zinsen oder zinslos, Tilgung, Kündigung nach § 488 BGB, Sicherheiten, Verzug. Mit Steuerhinweis.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "darlehensvertrag-unternehmen",
    titel: "Darlehensvertrag zwischen Unternehmen",
    kurz: "B2B-Darlehen mit Tilgungsplan, Verwendungszweck, Sicherheiten, Informationspflichten und klaren Kündigungsgründen.",
    kategorie: "finanzen",
    dateiname: "Darlehensvertrag-Unternehmen",
    wofuer: [
      "Ein Geschäftspartner, Lieferant oder eine Schwestergesellschaft gibt deinem Unternehmen ein Darlehen",
      "Du leihst als Unternehmer einem anderen Unternehmen einmalig Geld und willst Rückzahlung absichern",
      "Gesellschafterdarlehen an die eigene GmbH oder UG mit Zins- und Tilgungsplan",
      "Zwischenfinanzierung eines Auftrags, einer Maschine oder eines Warenlagers",
    ],
    enthaelt: [
      "§ 1 Darlehensbetrag, Auszahlung und Verwendungszweck",
      "§ 2 Zinsen und Zinszahlung",
      "§ 3 Tilgungsplan und Fälligkeit",
      "§ 4 Sicherheiten (Sicherungsübereignung, Forderungsabtretung, Bürgschaft)",
      "§ 5 Informationspflichten des Darlehensnehmers",
      "§ 6 Kündigung und Kündigungsgründe",
      "§ 7 Verzug und Kosten",
      "§ 8 Abtretung, Aufrechnung, Rangfragen",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Wer gewerbsmäßig oder in kaufmännischem Umfang Darlehen vergibt, betreibt Kreditgeschäft und braucht eine BaFin-Erlaubnis (§ 1 Abs. 1 Satz 2 Nr. 2, § 32 KWG). Ein einzelnes Darlehen an einen Geschäftspartner ist das nicht; eine Reihe von Darlehen gegen Zins kann es werden. Im Zweifel vorher rechtlich prüfen lassen.",
      "Gesellschafterdarlehen sind in der Insolvenz der Gesellschaft nachrangig (§ 39 Abs. 1 Nr. 5 InsO). Rückzahlungen im letzten Jahr vor dem Insolvenzantrag kann der Insolvenzverwalter zurückfordern (§ 135 InsO). Auch Sicherheiten dafür sind anfechtbar.",
      "Zwischen verbundenen Unternehmen oder zwischen Gesellschafter und GmbH muss der Zins fremdüblich sein. Ein zu hoher Zins an den Gesellschafter ist eine verdeckte Gewinnausschüttung, ein zu niedriger kann als verdeckte Einlage gewertet werden.",
      "Sicherungsübereignung und Abtretung wirken nur, wenn die Gegenstände und Forderungen bestimmt genug bezeichnet sind. Nutze Anlagen mit Inventarliste oder Debitorenliste, sonst läuft die Sicherheit ins Leere.",
    ],
    faqs: [
      {
        q: "Braucht mein Unternehmen eine Erlaubnis, um einem anderen Unternehmen Geld zu leihen?",
        a: "Für ein einzelnes Darlehen an einen Geschäftspartner oder eine Beteiligungsgesellschaft nicht. Erlaubnispflichtig wird es, wenn Darlehen gewerbsmäßig, also wiederholt und mit Gewinnerzielungsabsicht, oder in einem Umfang vergeben werden, der einen kaufmännisch eingerichteten Geschäftsbetrieb erfordert. Dann liegt Kreditgeschäft nach dem KWG vor.",
      },
      {
        q: "Was ist der Unterschied zwischen Sicherungsübereignung und Abtretung?",
        a: "Bei der Sicherungsübereignung wird der Darlehensgeber Eigentümer einer Sache (Maschine, Fahrzeug, Warenlager), der Darlehensnehmer darf sie aber weiter nutzen. Bei der Abtretung erhält der Darlehensgeber Forderungen des Darlehensnehmers gegen dessen Kunden. Beides wirkt still, bis der Sicherungsfall eintritt.",
      },
      {
        q: "Wie wird ein Gesellschafterdarlehen an die eigene GmbH behandelt?",
        a: "Der Vertrag ist gültig und die Zinsen sind Betriebsausgabe der GmbH, solange der Zins fremdüblich ist. In der Insolvenz der GmbH steht das Darlehen aber hinter allen anderen Gläubigern, und Rückzahlungen aus dem letzten Jahr vor dem Antrag können angefochten werden. Bei GmbH und UG das Darlehen außerdem per Gesellschafterbeschluss dokumentieren.",
      },
      {
        q: "Welche Verzugszinsen gelten zwischen Unternehmen?",
        a: "Bei Entgeltforderungen zwischen Unternehmen gelten neun Prozentpunkte über dem Basiszinssatz (§ 288 Abs. 2 BGB). Ob die Darlehensrückzahlung selbst eine Entgeltforderung ist, ist umstritten; die Vorlage vereinbart den Verzugszins deshalb ausdrücklich. Dazu kommt die Pauschale von 40 EUR je Verzugsfall (§ 288 Abs. 5 BGB).",
      },
    ],
    ratgeber: [
      {
        titel: "Wann ein Darlehensvertrag zwischen Unternehmen nötig ist",
        text: `Zwischen Unternehmen fließt Geld oft schneller als die Papiere hinterherkommen: Der Lieferant finanziert eine Maschine vor, die Schwestergesellschaft überbrückt einen Liquiditätsengpass, ein Geschäftspartner schießt Geld für einen Großauftrag zu, oder du selbst gibst deiner GmbH ein Gesellschafterdarlehen, weil die Bank noch nicht mitspielt. In all diesen Fällen entsteht ein Darlehen nach § 488 BGB, und zwar auch ohne Vertrag.

Der Vertrag entscheidet aber darüber, welche Zinsen gelten, wann das Geld zurück muss, welche Sicherheiten der Darlehensgeber hat und wann er kündigen darf. Für Gesellschafterdarlehen kommt dazu, dass Finanzamt und Insolvenzverwalter den Vertrag lesen. Die Vorlage ist auf den Darlehensvertrag zwischen zwei Unternehmen zugeschnitten, mit Tilgungsplan, Sicherheitenpaket und optionalem Rangrücktritt.`,
      },
      {
        titel: "Was gehört in den B2B-Darlehensvertrag?",
        text: `Ein Darlehensvertrag zwischen Unternehmen regelt mehr als Betrag und Zins. Die Vorlage enthält:

- Vorbemerkung mit der Klarstellung, dass das Darlehen einmalig und nicht als gewerbsmäßiges Kreditgeschäft vergeben wird, bei Beteiligung mit Hinweis auf §§ 39, 135 InsO
- Darlehensbetrag, Auszahlung in einer Summe oder in Tranchen, Verwendungszweck und Auszahlungsvoraussetzungen (§ 1)
- Zinssatz fest oder variabel über dem Basiszinssatz, Zinsperiode und der Hinweis, dass Kreditzinsen umsatzsteuerfrei sind (§ 2)
- Tilgungsplan mit einzelnen Raten, Annuität oder Endfälligkeit sowie Regeln für vorzeitige Rückzahlung (§ 3)
- Sicherheiten: Sicherungsübereignung von Maschinen oder Warenlager, Abtretung von Kundenforderungen, Bürgschaft des Geschäftsführers (§ 4)
- Informationspflichten wie Jahresabschluss, BWA und Debitorenlisten (§ 5)
- Kündigungsgründe vom Zahlungsrückstand über Zweckverfehlung bis zum Kontrollwechsel (§ 6)
- Verzugszinsen von neun Prozentpunkten über dem Basiszinssatz plus 40 EUR Pauschale (§ 7)
- Abtretung, Aufrechnungsverbot und optionaler Rangrücktritt (§ 8)

Jeder dieser Punkte hat einen Grund: Ohne Informationspflichten erfährst du von der Schieflage des Darlehensnehmers erst, wenn die Rate ausbleibt.`,
      },
      {
        titel: "Vorlage Darlehensvertrag Unternehmen ausfüllen",
        text: `Fülle zuerst beide Firmen mit Rechtsform, Handelsregister und vertretungsberechtigter Person aus; bei einer GbR die Gesellschafter namentlich. In der Vorbemerkung aktivierst du den optionalen Satz zur Beteiligung, wenn der Darlehensgeber Gesellschafter des Darlehensnehmers ist. In § 1 trägst du Betrag, Auszahlungsdatum und den konkreten Zweck ein, etwa das Angebot für die Maschine. In § 2 wählst du zwischen festem Zinssatz und variablem Zins über dem Basiszinssatz.

In § 3 schreibst du den Tilgungsplan Rate für Rate oder übernimmst die Alternative mit gleichbleibenden Annuitäten; prüfe, dass die Summe der Raten den Darlehensbetrag ergibt. In § 4 beschreibst du die Sicherheiten so genau, dass ein Dritter sie erkennen kann: Seriennummer, Lagerort, Kundennamen, und legst die Listen als Anlage 1 und 2 bei. In § 8 Abs. 3 aktivierst du den Rangrücktritt nur bei Gesellschafterdarlehen. Lass bei GmbH und UG einen Gesellschafterbeschluss über die Darlehensaufnahme fassen und nimm ihn als Anlage 3 auf.`,
      },
      {
        titel: "Gesellschafterdarlehen: Rangrücktritt, § 19 InsO und Fremdvergleich",
        text: `Beim Gesellschafterdarlehen passieren die teuersten Fehler. Erstens der fehlende Fremdvergleich: Zahlt die GmbH dem Gesellschafter einen Zins, den sie einem fremden Geldgeber nie zahlen würde, behandelt das Finanzamt den überhöhten Teil als verdeckte Gewinnausschüttung (§ 8 Abs. 3 Satz 2 KStG). Ein zu niedriger oder fehlender Zins kann umgekehrt als verdeckte Einlage gewertet werden. Orientiere dich an dem Zins, den eine Bank für ein vergleichbar besichertes Darlehen verlangen würde, und dokumentiere das.

Zweitens die Rückzahlung kurz vor der Insolvenz: Zahlt die Gesellschaft das Gesellschafterdarlehen im letzten Jahr vor dem Insolvenzantrag zurück, holt sich der Insolvenzverwalter das Geld nach § 135 InsO zurück. Drittens der fehlende Rangrücktritt in der Krise: Ist die Gesellschaft rechnerisch überschuldet, zählt ein Gesellschafterdarlehen ohne qualifizierten Rangrücktritt als Verbindlichkeit (§ 19 Abs. 2 InsO) und kann die Insolvenzantragspflicht auslösen. Mit Rangrücktritt bleibt es in der Überschuldungsprüfung außen vor. Der Rangrücktritt muss ausdrücklich erklärt werden; § 8 Abs. 3 der Vorlage enthält die Formulierung.`,
      },
      {
        titel: "Rechtsgrundlagen: KWG, § 488 BGB, § 288 BGB, Insolvenzordnung",
        text: `Grundlage ist § 488 BGB: Auszahlungspflicht des Darlehensgebers, Zins- und Rückzahlungspflicht des Darlehensnehmers. Verzug tritt bei kalendermäßig bestimmten Raten ohne Mahnung ein (§ 286 Abs. 2 Nr. 1 BGB). Zwischen Unternehmern betragen die Verzugszinsen bei Entgeltforderungen neun Prozentpunkte über dem Basiszinssatz (§ 288 Abs. 2 BGB) plus 40 EUR Pauschale je Verzugsfall (§ 288 Abs. 5 BGB); weil umstritten ist, ob die Darlehensrückzahlung eine Entgeltforderung ist, vereinbart die Vorlage den Zinssatz ausdrücklich. Die außerordentliche Kündigung bei Vermögensverschlechterung stützt sich auf § 490 Abs. 1 BGB.

Kreditzinsen sind umsatzsteuerfrei (§ 4 Nr. 8 Buchstabe a UStG). Gesellschafterdarlehen sind in der Insolvenz nachrangig (§ 39 Abs. 1 Nr. 5 InsO), Rückzahlungen im letzten Jahr anfechtbar (§ 135 InsO). Wer gewerbsmäßig Darlehen vergibt, betreibt Kreditgeschäft nach dem KWG und braucht eine Erlaubnis der BaFin; ein einzelnes Darlehen an einen Geschäftspartner ist davon nicht erfasst.`,
      },
      {
        titel: "Wann du Anwalt, Steuerberater oder Bank brauchst",
        text: `Die Vorlage deckt das einmalige Darlehen zwischen zwei Unternehmen ab. Sie reicht nicht, wenn du als Unternehmen einem Verbraucher Geld leihst, denn dann gelten die Pflichtangaben und das Widerrufsrecht des Verbraucherdarlehens. Sie ersetzt auch keinen Bankkredit mit Grundschuld, keine Konsortialfinanzierung mit mehreren Geldgebern und keinen Darlehensvertrag mit Wandlungsrecht für Investoren.

Sobald Beträge im Spiel sind, die bei Ausfall das Unternehmen gefährden, oder sobald Beteiligungen, Konzernverhältnisse oder Auslandsgesellschaften betroffen sind, lass den Vertrag anwaltlich prüfen; die Fremdüblichkeit des Zinses und die Bilanzierung des Rangrücktritts klärt der Steuerberater. GründerX ist eine Software für Gründer und keine Rechts- oder Steuerberatung.`,
      },
    ],
    seo: {
      title: "Darlehensvertrag Unternehmen Vorlage kostenlos | GründerX",
      description:
        "Darlehensvertrag zwischen Unternehmen als kostenlose Vorlage: Tilgungsplan, Zins, Sicherungsübereignung, Abtretung, Kündigungsgründe, KWG-Hinweis.",
    },
    stand: "2026-10",
    text: `Darlehensvertrag zwischen Unternehmen

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname, Funktion], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer]
– nachfolgend „Darlehensgeber“ –

und

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname, Funktion], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer]
– nachfolgend „Darlehensnehmer“ –

Vorbemerkung
Der Darlehensgeber vergibt dieses Darlehen einmalig und außerhalb eines gewerbsmäßigen Kreditgeschäfts im Sinne des § 1 Abs. 1 Satz 2 Nr. 2 KWG. [Optional: Der Darlehensgeber ist mit [Anteil] % am Darlehensnehmer beteiligt; den Parteien ist bekannt, dass das Darlehen damit als Gesellschafterdarlehen den §§ 39 Abs. 1 Nr. 5, 135 InsO unterliegt.]

§ 1 Darlehensbetrag, Auszahlung und Verwendungszweck
(1) Der Darlehensgeber gewährt dem Darlehensnehmer ein Darlehen in Höhe von [Betrag] EUR (in Worten: [Betrag in Worten] Euro).
(2) Die Auszahlung erfolgt am [Datum] durch Überweisung auf das Geschäftskonto des Darlehensnehmers, IBAN [IBAN] bei der [Bank]. [Alternative: Die Auszahlung erfolgt in Tranchen nach folgendem Plan: [Betrag] EUR am [Datum], [Betrag] EUR am [Datum]. Jede Tranche wird nur ausgezahlt, wenn die Voraussetzungen nach Absatz 4 weiterhin vorliegen.]
(3) Das Darlehen ist zweckgebunden für: [z. B. „die Anschaffung der Produktionsanlage [Bezeichnung] laut Angebot vom [Datum]“ / „die Vorfinanzierung des Auftrags [Kunde, Auftragsnummer]“ / „die Aufstockung des Warenlagers“]. Der Darlehensnehmer weist die zweckentsprechende Verwendung auf Verlangen durch Rechnungen und Zahlungsbelege nach.
(4) Auszahlungsvoraussetzungen sind: [z. B. „Vorlage der unterzeichneten Sicherungsvereinbarung nach § 4“, „Vorlage des Gesellschafterbeschlusses des Darlehensnehmers über die Darlehensaufnahme“].

§ 2 Zinsen
(1) Das Darlehen wird vom Tag der Auszahlung an mit [z. B. 6,0] % pro Jahr verzinst. [Alternative: Der Zinssatz beträgt [z. B. 4] Prozentpunkte über dem jeweiligen Basiszinssatz nach § 247 BGB und wird jeweils zum 1. Januar und 1. Juli angepasst.]
(2) Die Zinsen werden auf den jeweils offenen Darlehensbetrag taggenau (Basis 365 Tage) berechnet und sind [vierteljährlich / monatlich] nachträglich, jeweils zum [Tag], fällig.
(3) Der Darlehensgeber stellt die Zinsen in Rechnung. Umsatzsteuer fällt auf die Gewährung von Krediten nicht an (§ 4 Nr. 8 Buchstabe a UStG).

§ 3 Tilgungsplan und Fälligkeit
(1) Das Darlehen hat eine Laufzeit bis zum [Datum].
(2) Die Rückzahlung erfolgt nach folgendem Tilgungsplan:
   Rate 1: [Betrag] EUR, fällig am [Datum]
   Rate 2: [Betrag] EUR, fällig am [Datum]
   Rate 3: [Betrag] EUR, fällig am [Datum]
   [weitere Raten]
   Schlussrate: [Betrag] EUR, fällig am [Datum]
   [Alternative: Die Rückzahlung erfolgt in [Anzahl] gleichbleibenden Annuitäten von je [Betrag] EUR (Zins und Tilgung), erstmals am [Datum]. / Das Darlehen ist endfällig am [Datum] in einer Summe zurückzuzahlen.]
(3) Zahlungen sind auf das Konto des Darlehensgebers, IBAN [IBAN] bei der [Bank], zu leisten und werden zunächst auf Kosten, dann auf Zinsen und zuletzt auf die Hauptforderung angerechnet (§ 367 BGB).
(4) Vorzeitige Rückzahlungen sind mit einer Ankündigungsfrist von [z. B. 4] Wochen jederzeit zulässig. Eine Vorfälligkeitsentschädigung [wird nicht geschuldet / beträgt [z. B. 1] % des vorzeitig zurückgezahlten Betrags].

§ 4 Sicherheiten
(1) Zur Sicherung aller gegenwärtigen und künftigen Ansprüche des Darlehensgebers aus diesem Vertrag bestellt der Darlehensnehmer folgende Sicherheiten:
   a) Sicherungsübereignung: Der Darlehensnehmer übereignet dem Darlehensgeber die in Anlage 1 bezeichneten Gegenstände [z. B. „Maschine [Typ, Seriennummer]“ / „sämtliche Waren im Lager [Anschrift, Raum]“]. Die Übergabe wird dadurch ersetzt, dass der Darlehensnehmer die Gegenstände als Verwahrer für den Darlehensgeber besitzt (§§ 929, 930 BGB). Der Darlehensnehmer darf die Gegenstände im ordentlichen Geschäftsgang nutzen [und veräußern]; er hat sie pfleglich zu behandeln und gegen die üblichen Risiken zu versichern.
   b) Forderungsabtretung: Der Darlehensnehmer tritt dem Darlehensgeber die in Anlage 2 bezeichneten gegenwärtigen und künftigen Forderungen aus [z. B. „Lieferungen und Leistungen an den Kunden [Name]“ / „allen Lieferungen und Leistungen gegenüber Kunden mit den Anfangsbuchstaben A bis K“] ab (§ 398 BGB). Der Darlehensnehmer bleibt zur Einziehung berechtigt, solange er seine Pflichten aus diesem Vertrag erfüllt. Der Darlehensgeber kann die Einziehungsermächtigung widerrufen und die Abtretung offenlegen, wenn ein Kündigungsgrund nach § 6 Abs. 2 vorliegt.
   c) [Optional: Bürgschaft: [Vorname Nachname] übernimmt gemäß gesonderter Urkunde eine selbstschuldnerische Höchstbetragsbürgschaft über [Betrag] EUR.]
(2) Übersteigt der realisierbare Wert der Sicherheiten den gesicherten Betrag dauerhaft um mehr als [z. B. 10] %, gibt der Darlehensgeber Sicherheiten nach seiner Wahl in entsprechendem Umfang frei.
(3) Der Darlehensgeber darf die Sicherheiten verwerten, wenn das Darlehen gekündigt oder fällig ist und der Darlehensnehmer nach schriftlicher Androhung mit zweiwöchiger Frist nicht gezahlt hat.

§ 5 Informationspflichten
(1) Der Darlehensnehmer übermittelt dem Darlehensgeber während der Laufzeit unaufgefordert
   a) den Jahresabschluss innerhalb von [z. B. 6] Monaten nach Ende des Geschäftsjahres,
   b) [vierteljährlich] eine betriebswirtschaftliche Auswertung,
   c) auf Anforderung aktuelle Debitoren- und Inventarlisten zu den Sicherheiten.
(2) Der Darlehensnehmer informiert den Darlehensgeber unverzüglich über wesentliche Veränderungen seiner Vermögens-, Gesellschafter- oder Haftungsverhältnisse, über Vollstreckungsmaßnahmen Dritter in die Sicherheiten und über jede Beeinträchtigung des Verwendungszwecks.

§ 6 Kündigung
(1) Das Recht zur ordentlichen Kündigung ist für beide Parteien während der Laufzeit ausgeschlossen.
(2) Der Darlehensgeber kann das Darlehen aus wichtigem Grund fristlos kündigen, insbesondere wenn
   a) der Darlehensnehmer mit zwei Raten oder Zinszahlungen ganz oder teilweise in Verzug ist und eine schriftliche Nachfrist von zwei Wochen fruchtlos verstrichen ist,
   b) sich die Vermögensverhältnisse des Darlehensnehmers oder die Werthaltigkeit der Sicherheiten wesentlich verschlechtern oder zu verschlechtern drohen (§ 490 Abs. 1 BGB),
   c) der Darlehensnehmer das Darlehen zweckwidrig verwendet, Informationspflichten nach § 5 trotz Mahnung verletzt oder unrichtige Angaben gemacht hat,
   d) über das Vermögen des Darlehensnehmers ein Insolvenzverfahren beantragt, eröffnet oder mangels Masse abgelehnt wird,
   e) der Darlehensnehmer seinen Geschäftsbetrieb einstellt, veräußert oder ein Kontrollwechsel bei den Gesellschaftern eintritt.
(3) Mit Zugang der Kündigung wird der gesamte offene Darlehensbetrag nebst Zinsen sofort fällig. Jede Kündigung bedarf der Schriftform.

§ 7 Verzug und Kosten
(1) Verzug tritt ohne Mahnung mit Ablauf des jeweiligen Fälligkeitstermins ein (§ 286 Abs. 2 Nr. 1 BGB).
(2) Fällige Beträge sind während des Verzugs mit neun Prozentpunkten über dem jeweiligen Basiszinssatz zu verzinsen (§ 288 Abs. 2 BGB). Dazu kommt je Verzugsfall die Pauschale von 40 EUR (§ 288 Abs. 5 BGB). Der Nachweis eines höheren Schadens bleibt vorbehalten.
(3) Die Kosten der Bestellung, Verwaltung und Verwertung der Sicherheiten trägt der Darlehensnehmer.

§ 8 Abtretung, Aufrechnung, Rangrücktritt
(1) Der Darlehensgeber darf seine Ansprüche aus diesem Vertrag an Dritte abtreten; der Darlehensnehmer nur mit schriftlicher Zustimmung des Darlehensgebers.
(2) Der Darlehensnehmer kann nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen aufrechnen.
(3) [Optional bei Gesellschafterdarlehen: Der Darlehensgeber tritt mit seinen Ansprüchen aus diesem Vertrag im Rang hinter die Forderungen aller anderen Gläubiger des Darlehensnehmers gemäß § 39 Abs. 2 InsO zurück; Rückzahlung und Zinsen werden nur aus künftigen Gewinnen, einem Liquidationsüberschuss oder freiem Vermögen verlangt.]

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Die Parteien ersetzen die unwirksame Bestimmung durch eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist [Ort].
(4) Anlagen: Anlage 1 (Verzeichnis der sicherungsübereigneten Gegenstände), Anlage 2 (Verzeichnis der abgetretenen Forderungen), [Anlage 3 (Gesellschafterbeschluss)].

[Ort], den [Datum]


______________________________
[Firma], Darlehensgeber
vertreten durch [Vorname Nachname]


______________________________
[Firma], Darlehensnehmer
vertreten durch [Vorname Nachname]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "ratenzahlungsvereinbarung",
    titel: "Ratenzahlungsvereinbarung",
    kurz: "Offene Forderung in Raten abbezahlen lassen: Anerkenntnis, Ratenplan, Verzugszinsen und Verfallklausel, wenn eine Rate ausbleibt.",
    kategorie: "finanzen",
    dateiname: "Ratenzahlungsvereinbarung",
    wofuer: [
      "Ein Kunde kann deine Rechnung nicht auf einmal bezahlen und bietet Raten an",
      "Du selbst willst eine offene Lieferantenrechnung gestreckt begleichen",
      "Nach einer Mahnung oder einem Mahnbescheid soll eine Einigung ohne Gericht festgehalten werden",
      "Wenn die Forderung zugleich anerkannt und die Verjährung neu gestartet werden soll",
    ],
    enthaelt: [
      "§ 1 Forderung und Anerkenntnis",
      "§ 2 Ratenplan und Zahlungsweise",
      "§ 3 Zinsen",
      "§ 4 Verfallklausel bei Zahlungsverzug",
      "§ 5 Kosten",
      "§ 6 Verjährung und Stundung",
      "§ 7 Schlussbestimmungen",
    ],
    hinweise: [
      "Mit dem Anerkenntnis beginnt die Verjährung der Forderung neu (§ 212 Abs. 1 Nr. 1 BGB). Für den Gläubiger ist das der wichtigste Punkt der Vereinbarung; der Schuldner verzichtet auf Einwendungen, die er vorher noch hätte vorbringen können.",
      "Gegenüber Verbrauchern kann ein entgeltlicher Zahlungsaufschub über mehr als drei Monate als Verbraucherdarlehen gelten (§ 506 BGB) mit Widerrufsrecht und Pflichtangaben. Bei Privatkunden entweder zinslos stunden oder die Laufzeit kurz halten und im Zweifel prüfen lassen.",
      "Die Verfallklausel macht bei Verzug den gesamten Restbetrag fällig. Sie sollte an einen Rückstand von mindestens zwei Raten und eine kurze Nachfrist geknüpft sein, sonst kann sie als unangemessen angesehen werden.",
      "Eine Ratenzahlungsvereinbarung ist kein Vollstreckungstitel. Zahlt der Schuldner nicht, musst du trotzdem mahnen und einen Mahnbescheid beantragen; der Vorteil ist, dass der Schuldner die Forderung nicht mehr bestreiten kann.",
    ],
    faqs: [
      {
        q: "Darf ich als Gläubiger Zinsen für die Ratenzahlung verlangen?",
        a: "Ja. Ab Verzug stehen dir ohnehin Verzugszinsen zu, und für die Stundung kannst du Stundungszinsen vereinbaren. Gegenüber Verbrauchern ist Vorsicht geboten, weil ein entgeltlicher Zahlungsaufschub über drei Monate hinaus Verbraucherdarlehensrecht auslösen kann. Viele Gläubiger stunden Verbrauchern deshalb zinslos.",
      },
      {
        q: "Was passiert, wenn der Schuldner eine Rate nicht zahlt?",
        a: "Die Vorlage sieht eine Verfallklausel vor: Bleibt der Schuldner mit zwei Raten ganz oder teilweise im Rückstand und zahlt auch nach einer Nachfrist nicht, wird der gesamte Restbetrag sofort fällig. Du kannst dann den vollen Betrag per Mahnbescheid geltend machen, ohne auf das Ende des Ratenplans zu warten.",
      },
      {
        q: "Hat das Anerkenntnis in der Vereinbarung rechtliche Wirkung?",
        a: "Ja, eine doppelte. Die Verjährung beginnt neu zu laufen, und der Schuldner kann die Forderung später nicht mehr mit Einwendungen bestreiten, die er bei Abschluss kannte oder kennen musste. Deshalb sollte der Schuldner die Forderung vor der Unterschrift genau prüfen.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du eine Ratenzahlungsvereinbarung brauchst",
        text: `Ein Kunde kann die Rechnung nicht auf einmal bezahlen, will aber zahlen. Du selbst hast eine Lieferantenrechnung offen und brauchst Luft bis zum nächsten Auftrag. Oder ein Mahnbescheid läuft schon, und beide Seiten wollen eine Einigung ohne Gerichtstermin. In allen drei Fällen ist die Ratenzahlungsvereinbarung das richtige Dokument.

Sie hat für den Gläubiger zwei Vorteile gegenüber einer mündlichen Zusage: Der Schuldner erkennt die Forderung an und kann sie später nicht mehr bestreiten, und die Verjährung beginnt neu. Für den Schuldner bringt sie Planbarkeit und den Schutz vor Vollstreckung, solange er die Raten pünktlich zahlt. Die Vorlage passt für Forderungen aus Rechnungen, Darlehen oder Schadensersatz zwischen Unternehmen genauso wie gegenüber Privatkunden, mit einer wichtigen Einschränkung bei Zinsen, die weiter unten erklärt wird.`,
      },
      {
        titel: "Was muss in eine Ratenzahlungsvereinbarung?",
        text: `Eine Ratenzahlungsvereinbarung, die vor Gericht hält, enthält mindestens diese Punkte, die alle in der Vorlage stehen:

- Die Forderung mit Rechtsgrund, Rechnungsnummer und Datum, aufgeteilt in Hauptforderung, bisherige Verzugszinsen und Mahnkosten (§ 1 Abs. 1 und 2)
- Das Anerkenntnis des Schuldners dem Grunde und der Höhe nach mit Ausschluss bekannter Einwendungen (§ 1 Abs. 3)
- Den Ratenplan mit Betrag und Fälligkeit jeder Rate oder gleichbleibende Monatsraten mit Schlussrate (§ 2)
- Bankverbindung, Verwendungszweck und die Regel, dass der Eingang beim Gläubiger zählt (§ 2 Abs. 2)
- Stundungszinsen oder ausdrücklich zinslose Stundung (§ 3)
- Die Verfallklausel: Rückstand von zwei Raten, Mahnung, zwei Wochen Nachfrist, dann wird der Rest sofort fällig (§ 4)
- Verzugszinsen nach § 288 BGB und bei Unternehmern die 40-EUR-Pauschale (§ 4 Abs. 2)
- Kostenverteilung, Neubeginn der Verjährung und der Hinweis, dass die alte Forderung samt Sicherheiten bestehen bleibt (§§ 5, 6)

Ohne Verfallklausel müsstest du bei jeder ausgefallenen Rate einzeln mahnen und klagen.`,
      },
      {
        titel: "Ratenzahlung Muster ausfüllen: so gehst du vor",
        text: `Trage Gläubiger und Schuldner mit Anschrift ein; bei Firmen den vollständigen Namen mit Rechtsform. In § 1 übernimmst du die Forderung aus der Rechnung und rechnest die bis heute aufgelaufenen Verzugszinsen und Mahnkosten dazu; die Summe ist die Gesamtforderung, auf die sich der Ratenplan bezieht. In § 2 legst du die Raten fest. Faustregel: lieber wenige, realistische Raten als ein langer Plan, der nach drei Monaten platzt. Prüfe, dass alle Raten zusammen die Gesamtforderung ergeben.

In § 3 wählst du Variante A mit Zins oder Variante B zinslos und streichst die andere. In § 4 kannst du den Zinssatz für den Verzugsfall anpassen: fünf Prozentpunkte über Basiszins bei Verbrauchern, neun zwischen Unternehmern. Ist bereits ein Mahn- oder Vollstreckungsbescheid ergangen, trage in § 6 Abs. 2 das Aktenzeichen ein, damit der Titel bestehen bleibt. Beide Parteien unterschreiben, jede bekommt ein Exemplar.`,
      },
      {
        titel: "Typische Fehler bei Ratenzahlung und Stundung",
        text: `Der erste Fehler ist, Raten zu vereinbaren, ohne die Forderung vorher anerkennen zu lassen. Dann kann der Schuldner nach der dritten Rate Mängel einwenden, und du stehst wieder am Anfang. Der zweite Fehler ist eine Verfallklausel, die schon bei einem Tag Verspätung den Gesamtbetrag fällig stellt; solche Klauseln gelten schnell als unangemessen. Die Vorlage knüpft den Verfall an zwei rückständige Raten, eine schriftliche Mahnung und eine Nachfrist von zwei Wochen.

Der dritte Fehler betrifft Privatkunden: Wer einem Verbraucher gegen Zinsen länger als drei Monate stundet, kann damit ein Verbraucherdarlehen schließen (§ 506 BGB) mit Widerrufsrecht und Pflichtangaben, die in der Vorlage fehlen. Stunde Verbrauchern deshalb zinslos oder halte die Laufzeit kurz. Der vierte Fehler ist die Annahme, die Vereinbarung sei ein Vollstreckungstitel. Sie ist es nicht; bleibt der Schuldner säumig, brauchst du weiterhin Mahnbescheid oder Urteil, nur eben ohne Streit über die Forderung selbst.`,
      },
      {
        titel: "Rechtliche Grundlagen: Anerkenntnis, Verjährung, Verzug, Stundungszinsen",
        text: `Das Anerkenntnis in § 1 lässt die Verjährung neu beginnen (§ 212 Abs. 1 Nr. 1 BGB); für Rechnungen bedeutet das wieder drei volle Jahre ab Jahresende (§§ 195, 199 BGB). Die Stundung schiebt die Fälligkeit hinaus, ändert aber nichts an der Forderung; das stellt § 6 Abs. 3 klar, damit keine Schuldersetzung angenommen wird und Sicherheiten erhalten bleiben. Gerät der Schuldner mit einer kalendermäßig bestimmten Rate in Rückstand, tritt Verzug ohne Mahnung ein (§ 286 Abs. 2 Nr. 1 BGB).

Die Verzugszinsen betragen fünf Prozentpunkte über dem Basiszinssatz, bei Entgeltforderungen zwischen Unternehmern neun Prozentpunkte (§ 288 Abs. 1 und 2 BGB), dazu kommt zwischen Unternehmern die Pauschale von 40 EUR (§ 288 Abs. 5 BGB). Für die Höhe der Stundungszinsen gibt es keine gesetzliche Vorgabe; als Anhaltspunkt: Das Finanzamt verlangt bei einer Steuerstundung 0,5 % pro Monat (§§ 234, 238 AO). Wer deutlich mehr nimmt, riskiert die Einordnung als Wucher.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht: Verbraucher, Titel, Insolvenz",
        text: `Die Vorlage ist für den außergerichtlichen Ratenplan zwischen zwei Parteien gedacht. Sie reicht nicht, wenn du als Unternehmer Verbrauchern entgeltliche Zahlungsaufschübe über drei Monate hinaus anbietest; dafür braucht es die Pflichtangaben des Verbraucherdarlehensrechts, die ein Anwalt formulieren sollte. Sie ersetzt auch keinen vollstreckbaren Titel: Wenn der Schuldner schon einmal nicht gezahlt hat und der Betrag hoch ist, lass das Anerkenntnis notariell beurkunden und mit einer Unterwerfungsklausel versehen oder nimm den Vergleich vor Gericht.

Ist der Schuldner bereits zahlungsunfähig oder läuft ein Insolvenzverfahren, gelten andere Regeln, und Ratenzahlungen können angefochten werden. GründerX stellt die Vorlage als Werkzeug bereit; eine Rechtsberatung im Einzelfall ist sie nicht.`,
      },
    ],
    seo: {
      title: "Ratenzahlungsvereinbarung Vorlage kostenlos | GründerX",
      description:
        "Ratenzahlungsvereinbarung als kostenlose Vorlage: Anerkenntnis der Forderung, Ratenplan, Zinsen, Verfallklausel bei Verzug, Kosten. Word und PDF.",
    },
    stand: "2026-10",
    text: `Ratenzahlungsvereinbarung

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Gläubiger“ –

und

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Schuldner“ –

§ 1 Forderung und Anerkenntnis
(1) Der Gläubiger hat gegen den Schuldner eine Forderung aus [Rechtsgrund, z. B. „Rechnung Nr. [Nummer] vom [Datum] über die Lieferung von [Ware/Leistung]“] in Höhe von [Betrag] EUR (Hauptforderung).
(2) Hinzu kommen bis zum Tag dieser Vereinbarung aufgelaufene Verzugszinsen in Höhe von [Betrag] EUR sowie Mahn- und Rechtsverfolgungskosten in Höhe von [Betrag] EUR. Die Gesamtforderung beläuft sich damit auf [Gesamtbetrag] EUR.
(3) Der Schuldner erkennt die Gesamtforderung nach Absatz 2 dem Grunde und der Höhe nach als bestehend und fällig an. Einwendungen und Einreden gegen die Forderung, die dem Schuldner bei Abschluss dieser Vereinbarung bekannt sind oder bekannt sein mussten, sind ausgeschlossen.

§ 2 Ratenplan und Zahlungsweise
(1) Der Gläubiger stundet dem Schuldner die Gesamtforderung und gestattet die Zahlung in [Anzahl] Raten wie folgt:
   Rate 1: [Betrag] EUR, fällig am [Datum]
   Rate 2: [Betrag] EUR, fällig am [Datum]
   Rate 3: [Betrag] EUR, fällig am [Datum]
   [weitere Raten]
   Schlussrate: [Betrag] EUR, fällig am [Datum]
   [Alternative: in [Anzahl] gleichbleibenden monatlichen Raten von je [Betrag] EUR, erstmals am [Datum], danach jeweils zum [z. B. 15.] eines Monats, sowie einer Schlussrate von [Betrag] EUR am [Datum].]
(2) Die Raten sind kostenfrei auf das Konto des Gläubigers, IBAN [IBAN] bei der [Bank], Verwendungszweck „[Kundennummer/Rechnungsnummer]“, zu überweisen. Maßgeblich für die Rechtzeitigkeit ist der Eingang beim Gläubiger.
(3) Der Schuldner darf jederzeit höhere Raten oder den gesamten Restbetrag vorzeitig zahlen. Sonderzahlungen werden auf die letzten Raten angerechnet.

§ 3 Zinsen
[Variante A: Der gestundete Betrag wird ab dem [Datum] bis zur vollständigen Zahlung mit [z. B. 5] % pro Jahr verzinst. Die Zinsen werden mit der Schlussrate abgerechnet.]
[Variante B: Für die Dauer der Stundung werden keine Zinsen erhoben, solange der Schuldner die Raten vertragsgemäß zahlt.]
Zahlungen werden zunächst auf Kosten, dann auf Zinsen und zuletzt auf die Hauptforderung angerechnet (§ 367 BGB).

§ 4 Verfallklausel bei Zahlungsverzug
(1) Gerät der Schuldner mit zwei Raten ganz oder teilweise in Rückstand und zahlt er den rückständigen Betrag nicht innerhalb von zwei Wochen nach Zugang einer schriftlichen Mahnung, entfällt die Stundung. Der gesamte noch offene Restbetrag wird dann sofort in einer Summe fällig.
(2) Ab Eintritt des Verzugs schuldet der Schuldner Verzugszinsen in Höhe von [fünf Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 1 BGB) / neun Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB, nur wenn kein Verbraucher beteiligt ist)]. [Bei Unternehmern zusätzlich: Je Verzugsfall ist die Pauschale von 40 EUR nach § 288 Abs. 5 BGB geschuldet.]
(3) Das Gleiche wie in Absatz 1 gilt, wenn über das Vermögen des Schuldners die Eröffnung eines Insolvenzverfahrens beantragt wird oder der Schuldner die eidesstattliche Versicherung (Vermögensauskunft) abgibt.

§ 5 Kosten
(1) Die bisher entstandenen Kosten nach § 1 Abs. 2 sind in der Gesamtforderung enthalten.
(2) Weitere Kosten der Rechtsverfolgung, die durch einen Verstoß des Schuldners gegen diese Vereinbarung entstehen, trägt der Schuldner.
(3) Jede Partei trägt die Kosten ihrer eigenen Beratung im Zusammenhang mit dieser Vereinbarung.

§ 6 Verjährung und Stundung
(1) Die Parteien sind sich einig, dass die Verjährung der Gesamtforderung mit dem Anerkenntnis nach § 1 Abs. 3 neu beginnt (§ 212 Abs. 1 Nr. 1 BGB).
(2) Solange der Schuldner die Raten vertragsgemäß zahlt, wird der Gläubiger die Forderung nicht gerichtlich geltend machen und keine Vollstreckungsmaßnahmen einleiten. [Optional: Ein bereits erwirkter Mahnbescheid / Vollstreckungsbescheid [Aktenzeichen] bleibt bestehen; der Gläubiger vollstreckt daraus nur, wenn die Stundung nach § 4 entfällt.]
(3) Die Stundung ist keine Erfüllung. Eine Novation (Schuldersetzung) ist nicht gewollt; die ursprüngliche Forderung bleibt mit allen Sicherheiten bestehen.

§ 7 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieser Vereinbarung bedürfen der Schriftform. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(4) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Firma / Vorname Nachname], Gläubiger


______________________________
[Firma / Vorname Nachname], Schuldner

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "schuldanerkenntnis",
    titel: "Schuldanerkenntnis",
    kurz: "Schriftliches Schuldanerkenntnis nach § 781 BGB, abstrakt oder deklaratorisch: Forderung, Grund, Fälligkeit, Verzicht auf Einwendungen.",
    kategorie: "finanzen",
    dateiname: "Schuldanerkenntnis",
    wofuer: [
      "Ein Kunde oder Geschäftspartner soll eine offene Forderung verbindlich bestätigen, bevor du Zeit mit Streit verlierst",
      "Nach einem Schaden, einer Rückzahlung oder einem gescheiterten Projekt soll der Betrag ein für alle Mal feststehen",
      "Als Grundlage für eine spätere Ratenzahlung oder als Beweismittel im Mahnverfahren",
      "Wenn die Verjährung einer älteren Forderung neu beginnen soll",
    ],
    enthaelt: [
      "Variante A: abstraktes Schuldanerkenntnis (eigenständige Verpflichtung)",
      "Variante B: deklaratorisches Schuldanerkenntnis (Bestätigung einer bestehenden Schuld)",
      "§ 1 Forderung und Schuldgrund",
      "§ 2 Anerkenntnis",
      "§ 3 Fälligkeit und Zahlung",
      "§ 4 Verzicht auf Einwendungen und Einreden",
      "§ 5 Verzug",
      "§ 6 Beweiswirkung, Verjährung und Schlussbestimmungen",
    ],
    hinweise: [
      "Das abstrakte Schuldanerkenntnis braucht die Schriftform mit eigenhändiger Unterschrift des Schuldners (§ 781 BGB). Ein Scan reicht zum Nachweis, das Original musst du aufbewahren. Eine E-Mail oder Chatnachricht genügt nicht.",
      "Abstrakt heißt: Der Schuldner muss zahlen, auch wenn der ursprüngliche Grund später wegfällt; er kann das Anerkenntnis nur noch über die ungerechtfertigte Bereicherung (§ 812 Abs. 2 BGB) zurückfordern. Deklaratorisch heißt: Die alte Schuld bleibt, aber alle bekannten Einwendungen sind abgeschnitten. Wähle die Variante bewusst.",
      "Das Anerkenntnis ist kein Vollstreckungstitel. Willst du ohne Gericht vollstrecken können, muss der Schuldner sich notariell der sofortigen Zwangsvollstreckung unterwerfen (§ 794 Abs. 1 Nr. 5 ZPO).",
      "Mit dem Anerkenntnis beginnt die dreijährige Regelverjährung neu (§ 212 Abs. 1 Nr. 1 BGB). Fordere es deshalb an, bevor eine alte Forderung zum Jahresende verjährt.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen abstraktem und deklaratorischem Schuldanerkenntnis?",
        a: "Das abstrakte Anerkenntnis begründet eine neue, vom ursprünglichen Rechtsgrund losgelöste Verpflichtung; der Gläubiger muss den Grund gar nicht mehr beweisen. Das deklaratorische Anerkenntnis bestätigt nur die bestehende Schuld und schließt die Einwendungen aus, die der Schuldner kannte. Im Alltag wird meist die deklaratorische Variante gewählt, weil sie für den Schuldner weniger riskant und für den Gläubiger trotzdem wirksam ist.",
      },
      {
        q: "Kann ich mit einem Schuldanerkenntnis sofort vollstrecken?",
        a: "Nein. Du brauchst weiterhin einen Titel, also einen Vollstreckungsbescheid oder ein Urteil. Das Anerkenntnis macht das Verfahren aber einfach, weil der Schuldner die Forderung nicht mehr bestreiten kann. Nur ein notarielles Anerkenntnis mit Unterwerfungsklausel ist selbst ein Titel.",
      },
      {
        q: "Kann der Schuldner das Anerkenntnis später wieder zurücknehmen?",
        a: "Einseitig nicht. Er kann es nur anfechten, etwa bei Täuschung oder Drohung, oder beim abstrakten Anerkenntnis nachweisen, dass die anerkannte Schuld nie bestand und das Anerkenntnis deshalb ohne Rechtsgrund abgegeben wurde. Die Beweislast dafür liegt beim Schuldner.",
      },
      {
        q: "Reicht ein per E-Mail bestätigter Betrag als Schuldanerkenntnis?",
        a: "Als abstraktes Anerkenntnis nicht, weil § 781 BGB die Schriftform verlangt. Eine E-Mail kann aber als deklaratorisches Anerkenntnis oder zumindest als Beweismittel und als Verjährungsneubeginn wirken. Für die volle Wirkung lass das Dokument unterschreiben.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du ein Schuldanerkenntnis brauchst",
        text: `Ein Schuldanerkenntnis brauchst du immer dann, wenn eine Forderung feststehen soll, bevor Zeit vergeht oder Erinnerungen verblassen. Typische Fälle für Gründer: Ein Kunde gibt am Telefon zu, dass er die Rechnung schuldet, zahlt aber nicht. Ein Geschäftspartner hat einen Schaden verursacht und will den Betrag anerkennen, um Streit zu vermeiden. Ein gescheitertes Projekt endet mit einer Rückzahlungspflicht, über die beide einig sind. Oder eine alte Forderung verjährt zum Jahresende, und du brauchst einen Neubeginn der Frist.

Das schriftliche Anerkenntnis macht aus einer bestreitbaren Behauptung eine Urkunde, die vor Gericht und im Mahnverfahren den Beweis erleichtert. Die Vorlage bietet beide Varianten, abstrakt und deklaratorisch, mit Fälligkeit, Ratenoption und Verzugsregel.`,
      },
      {
        titel: "Abstrakt oder deklaratorisch: Was muss ins Schuldanerkenntnis?",
        text: `Die wichtigste Entscheidung triffst du in § 2 der Vorlage. Beim abstrakten Schuldanerkenntnis (Variante A) entsteht eine neue, vom ursprünglichen Grund losgelöste Verpflichtung nach § 781 BGB; der Gläubiger muss den Grund später nicht mehr beweisen. Beim deklaratorischen Anerkenntnis (Variante B) bestätigt der Schuldner die bestehende Schuld und schneidet sich die Einwendungen ab, die er kannte. Daneben braucht jedes Schuldanerkenntnis:

- Schuldner und Gläubiger mit Anschrift, bei Firmen Handelsregister und vertretungsberechtigte Person
- Betrag in Zahlen und Worten sowie den Schuldgrund mit Rechnungsnummer, Vertragsdatum oder Schadensereignis (§ 1)
- Bisherige Zahlungen und den offenen Restbetrag (§ 1 Abs. 3)
- Fälligkeit, Konto und optional einen Ratenplan mit Verfallklausel (§ 3)
- Verzicht auf bekannte Einwendungen und Aufrechnungsverbot (§ 4)
- Verzug ohne Mahnung und Verzugszinsen nach § 288 BGB (§ 5)
- Hinweis auf Beweiswirkung, Verjährungsneubeginn und darauf, dass es kein Vollstreckungstitel ist (§ 6)
- Datum, Ort und die eigenhändige Unterschrift des Schuldners

Die Schriftform ist beim abstrakten Anerkenntnis gesetzlich vorgeschrieben; eine E-Mail reicht nicht.`,
      },
      {
        titel: "Schuldanerkenntnis Muster ausfüllen",
        text: `Trage in § 1 den Betrag und den genauen Grund ein; je präziser der Grund, desto weniger Angriffsfläche. Zieh bereits geleistete Zahlungen ab und schreib den Restbetrag hin, denn auf diesen bezieht sich das Anerkenntnis. In § 2 wählst du Variante A oder B und streichst die andere; im Zweifel ist Variante B für den Schuldner leichter zu akzeptieren und für den Gläubiger ausreichend. In § 3 setzt du die Fälligkeit ein, sofort oder zu einem Datum, und ergänzt bei Bedarf den Ratenplan.

In § 4 Abs. 2 lässt du den Schuldner erklären, ob er Gegenforderungen hat. In § 5 wählst du den Verzugszinssatz: fünf Prozentpunkte über Basiszins bei Verbrauchern, neun zwischen Unternehmern, dann auch mit der 40-EUR-Pauschale. Der Schuldner unterschreibt eigenhändig auf Papier; du bewahrst das Original auf und gibst ihm eine Abschrift, wie § 6 Abs. 5 vorsieht.`,
      },
      {
        titel: "Typische Fehler beim Schuldanerkenntnis",
        text: `Der häufigste Fehler ist das Anerkenntnis per E-Mail oder Messenger. Als abstraktes Anerkenntnis ist es formnichtig, als Beweismittel nur begrenzt brauchbar. Lass auf Papier unterschreiben, Scan nur als Kopie. Zweiter Fehler: Der Grund fehlt oder ist schwammig („aus Geschäftsbeziehung“). Beim deklaratorischen Anerkenntnis muss klar sein, welche Forderung bestätigt wird, sonst streitet ihr später darüber, was gemeint war.

Dritter Fehler: Der Gläubiger glaubt, er könne aus dem Anerkenntnis sofort vollstrecken. Das geht nur mit notarieller Unterwerfungsklausel; sonst brauchst du weiterhin Mahnbescheid oder Urteil. Vierter Fehler auf Schuldnerseite: Unterschreiben, ohne Rechnung und Vertrag vorher geprüft zu haben. Mit dem Anerkenntnis sind alle bekannten Einwendungen abgeschnitten, auch berechtigte Mängelrügen. Fünfter Fehler: zu lange warten. Verjährt die Forderung zum 31. Dezember, muss das Anerkenntnis vorher vorliegen.`,
      },
      {
        titel: "Rechtsgrundlagen: § 781 BGB, Verjährung und Vollstreckung",
        text: `Das abstrakte Schuldanerkenntnis regelt § 781 BGB und verlangt die schriftliche Erteilung; nur Kaufleute dürfen nach § 350 HGB formfrei anerkennen. Das deklaratorische Anerkenntnis ist gesetzlich nicht eigens geregelt, sondern ein Feststellungsvertrag, den die Rechtsprechung anerkennt. Beide Varianten lassen die Verjährung neu beginnen (§ 212 Abs. 1 Nr. 1 BGB), was bei der dreijährigen Regelverjährung (§ 195 BGB) oft der eigentliche Grund für das Dokument ist.

Beim abstrakten Anerkenntnis kann der Schuldner das Anerkenntnis nur über die ungerechtfertigte Bereicherung zurückfordern, wenn die Schuld nie bestand (§ 812 Abs. 2 BGB); die Beweislast trägt er. Verzug tritt bei einem Kalenderdatum ohne Mahnung ein (§ 286 Abs. 2 Nr. 1 BGB), Verzugszinsen regelt § 288 BGB. Ein Vollstreckungstitel wird das Anerkenntnis erst durch notarielle Beurkundung mit Unterwerfung unter die sofortige Zwangsvollstreckung (§ 794 Abs. 1 Nr. 5 ZPO).`,
      },
      {
        titel: "Wann das Schuldanerkenntnis nicht reicht",
        text: `Die Vorlage reicht für klare Forderungen zwischen Unternehmern und gegenüber Kunden, die ihre Schuld nicht bestreiten. Sie reicht nicht, wenn du sofort vollstrecken können willst; dann gehört der Text zum Notar. Sie reicht auch nicht, wenn die Forderung dem Grunde nach umstritten ist; dafür gibt es die Vergleichsvereinbarung.

Verbraucher, die ein Anerkenntnis mit Ratenplan und Zinsen unterschreiben sollen, können in den Anwendungsbereich des Verbraucherdarlehensrechts geraten; hier solltest du anwaltlichen Rat einholen. Steuerlich ist zu klären, ob und wann eine anerkannte Forderung wertberichtigt oder als Einnahme gebucht wird. GründerX liefert die Vorlage als Werkzeug, keine Rechts- oder Steuerberatung.`,
      },
    ],
    seo: {
      title: "Schuldanerkenntnis Vorlage kostenlos (Word) | GründerX",
      description:
        "Schuldanerkenntnis als kostenlose Vorlage nach § 781 BGB: abstrakt oder deklaratorisch, Fälligkeit, Verzicht auf Einwendungen, Beweiswirkung.",
    },
    stand: "2026-10",
    text: `Schuldanerkenntnis

Schuldner: [Firma / Vorname Nachname], [Straße, PLZ Ort], [geboren am [Datum] / Handelsregister [Amtsgericht, HRB-Nummer]]
– nachfolgend „Schuldner“ –

Gläubiger: [Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Gläubiger“ –

§ 1 Forderung und Schuldgrund
(1) Der Gläubiger hat gegen den Schuldner eine Forderung in Höhe von [Betrag] EUR (in Worten: [Betrag in Worten] Euro).
(2) Die Forderung beruht auf [genauer Grund, z. B. „Rechnung Nr. [Nummer] vom [Datum] über [Leistung]“ / „Darlehensvertrag vom [Datum]“ / „Schadensersatz wegen [Ereignis] vom [Datum]“ / „Rückzahlung der Anzahlung aus dem Vertrag vom [Datum]“].
(3) Auf die Forderung wurden bisher [Betrag] EUR gezahlt. [Alternative: Zahlungen auf die Forderung sind bisher nicht erfolgt.] Offen sind damit [Restbetrag] EUR zuzüglich der in § 5 bestimmten Zinsen.

§ 2 Anerkenntnis
[Variante A – abstraktes Schuldanerkenntnis:]
Der Schuldner erkennt hiermit an, dem Gläubiger den in § 1 bezeichneten Betrag von [Restbetrag] EUR zu schulden. Dieses Anerkenntnis begründet eine selbstständige, vom zugrunde liegenden Rechtsverhältnis unabhängige Verpflichtung im Sinne des § 781 BGB. Der Gläubiger kann aus diesem Anerkenntnis Zahlung verlangen, ohne den in § 1 Abs. 2 genannten Grund darlegen oder beweisen zu müssen.

[Variante B – deklaratorisches Schuldanerkenntnis:]
Der Schuldner bestätigt hiermit, dass die in § 1 bezeichnete Forderung des Gläubigers in Höhe von [Restbetrag] EUR dem Grunde und der Höhe nach besteht und fällig ist. Zweck dieses Anerkenntnisses ist es, die Forderung zwischen den Parteien verbindlich festzustellen und dem Streit oder der Ungewissheit darüber zu entziehen.

[Nicht gewählte Variante streichen.]

§ 3 Fälligkeit und Zahlung
(1) Der anerkannte Betrag ist [sofort / am [Datum]] zur Zahlung fällig.
(2) Die Zahlung erfolgt auf das Konto des Gläubigers, IBAN [IBAN] bei der [Bank], Verwendungszweck „[Rechnungsnummer / Aktenzeichen]“.
(3) [Optional: Der Gläubiger gestattet dem Schuldner die Zahlung in [Anzahl] Raten von je [Betrag] EUR, erstmals am [Datum], jeweils zum [Tag] eines Monats. Gerät der Schuldner mit zwei Raten ganz oder teilweise in Rückstand, wird der gesamte Restbetrag sofort fällig.]

§ 4 Verzicht auf Einwendungen und Einreden
(1) Der Schuldner verzichtet auf alle Einwendungen und Einreden gegen die anerkannte Forderung, die ihm bei Abgabe dieses Anerkenntnisses bekannt sind oder bekannt sein mussten. Hierzu gehören insbesondere Einwendungen gegen den Grund, die Höhe, die Fälligkeit und die ordnungsgemäße Erbringung der zugrunde liegenden Leistung.
(2) Der Schuldner erklärt, dass ihm Gegenforderungen gegen den Gläubiger nicht bekannt sind. [Alternative: Mit folgenden Gegenforderungen wird ausdrücklich nicht aufgerechnet: [Bezeichnung].] Eine Aufrechnung ist nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen zulässig.
(3) Die Rechte des Schuldners aus Anfechtung wegen Täuschung oder Drohung sowie [bei Variante A:] der Anspruch aus § 812 Abs. 2 BGB bleiben unberührt.

§ 5 Verzug
(1) Zahlt der Schuldner nicht bis zu dem in § 3 bestimmten Termin, gerät er ohne weitere Mahnung in Verzug (§ 286 Abs. 2 Nr. 1 BGB).
(2) Der offene Betrag ist ab Verzug mit [fünf Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 1 BGB) / neun Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB, nur zwischen Unternehmern)] zu verzinsen. [Zwischen Unternehmern: Hinzu kommt die Pauschale von 40 EUR nach § 288 Abs. 5 BGB.] Die Geltendmachung eines weiteren Verzugsschadens bleibt vorbehalten.

§ 6 Beweiswirkung, Verjährung und Schlussbestimmungen
(1) Den Parteien ist bekannt, dass dieses Anerkenntnis als Urkunde im Rechtsstreit und im gerichtlichen Mahnverfahren Beweis für das Bestehen und die Höhe der Forderung erbringt und dass mit ihm die Verjährung der Forderung neu beginnt (§ 212 Abs. 1 Nr. 1 BGB).
(2) Dieses Anerkenntnis ist kein Vollstreckungstitel. [Optional: Die Parteien beabsichtigen, das Anerkenntnis notariell beurkunden zu lassen und eine Unterwerfung unter die sofortige Zwangsvollstreckung nach § 794 Abs. 1 Nr. 5 ZPO aufzunehmen.]
(3) Änderungen bedürfen der Schriftform. Sollte eine Bestimmung unwirksam sein, bleibt das Anerkenntnis im Übrigen wirksam.
(4) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(5) Der Schuldner hat eine Abschrift dieses Anerkenntnisses erhalten.

[Ort], den [Datum]


______________________________
[Firma / Vorname Nachname], Schuldner
(eigenhändige Unterschrift)


Zur Kenntnis genommen und angenommen:

______________________________
[Firma / Vorname Nachname], Gläubiger

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "abtretungserklaerung-forderung",
    titel: "Abtretungserklärung (Forderungsabtretung)",
    kurz: "Forderung nach § 398 BGB an einen Dritten übertragen: Zedent, Zessionar, Gegenleistung, Gewähr und Muster-Anzeige an den Schuldner.",
    kategorie: "finanzen",
    dateiname: "Abtretungserklaerung-Forderung",
    wofuer: [
      "Du verkaufst eine offene Kundenforderung an einen Dritten oder gibst sie zum Einzug weiter",
      "Ein Darlehensgeber oder Lieferant verlangt eine Forderung als Sicherheit",
      "Beim Übergang eines Vertrags, einer Kundenbeziehung oder eines Projekts sollen die Ansprüche mitgehen",
      "Erstattungsansprüche (z. B. gegen Versicherung oder Plattform) sollen an den tatsächlich Geschädigten gehen",
    ],
    enthaelt: [
      "§ 1 Abgetretene Forderung",
      "§ 2 Abtretung und Übergang von Nebenrechten",
      "§ 3 Gegenleistung",
      "§ 4 Gewährleistung (Bestand ja, Bonität nein)",
      "§ 5 Anzeige an den Schuldner, Unterlagen, Einziehung",
      "§ 6 Schlussbestimmungen",
      "Anlage: Muster der Abtretungsanzeige an den Schuldner",
    ],
    hinweise: [
      "Prüfe vor der Abtretung, ob der Vertrag mit dem Schuldner ein Abtretungsverbot enthält (§ 399 BGB). Zwischen Kaufleuten ist die Abtretung einer Geldforderung trotz Verbots wirksam (§ 354a HGB), der Schuldner darf dann aber weiterhin an den alten Gläubiger zahlen.",
      "Solange der Schuldner nichts von der Abtretung weiß, kann er mit befreiender Wirkung an den alten Gläubiger zahlen (§ 407 BGB). Sende die Anzeige deshalb zeitnah und nachweisbar; am sichersten ist eine Anzeige, die der bisherige Gläubiger selbst unterschreibt (§ 409 BGB).",
      "Der Schuldner behält alle Einwendungen, die er gegen den alten Gläubiger hatte (§ 404 BGB), und kann unter Umständen mit Gegenforderungen aufrechnen (§ 406 BGB). Der Käufer einer Forderung sollte deshalb Vertrag, Rechnung und Schriftverkehr einsehen.",
      "Der Verkäufer haftet dafür, dass die Forderung besteht (Verität), nicht dafür, dass der Schuldner zahlen kann (Bonität). Wer Bonitätsrisiken übernehmen will, muss das ausdrücklich vereinbaren. Gewerblicher Forderungsankauf oder -einzug für Dritte kann eine Registrierung nach dem RDG oder eine KWG-Erlaubnis erfordern.",
    ],
    faqs: [
      {
        q: "Muss der Schuldner der Abtretung zustimmen?",
        a: "Nein. Die Abtretung ist ein Vertrag zwischen altem und neuem Gläubiger und wirkt auch ohne Wissen des Schuldners (§ 398 BGB). Die Zustimmung ist nur nötig, wenn ein vertragliches Abtretungsverbot besteht oder die Leistung ihrem Inhalt nach nur an den bisherigen Gläubiger erbracht werden kann.",
      },
      {
        q: "Wozu dient die Abtretungsanzeige?",
        a: "Sie verhindert, dass der Schuldner weiter an den alten Gläubiger zahlt und damit von seiner Schuld frei wird. Ab Zugang der Anzeige muss er an den neuen Gläubiger leisten. Die Vorlage enthält dafür ein Muster, das der bisherige Gläubiger unterschreibt, weil der Schuldner dann sicher auf die Anzeige vertrauen darf.",
      },
      {
        q: "Was bedeutet: Gewähr für den Bestand, nicht für die Bonität?",
        a: "Der Verkäufer steht dafür ein, dass die Forderung wirklich existiert, ihm gehört, nicht verjährt und frei von Rechten Dritter ist. Ob der Schuldner zahlungsfähig ist, trägt der Käufer selbst. Beim Verkauf an einen Inkassodienst oder Factor wird das Ausfallrisiko oft gesondert geregelt und bepreist.",
      },
      {
        q: "Wie wird die Abtretung umsatzsteuerlich behandelt?",
        a: "Die Abtretung der Forderung selbst ist umsatzsteuerfrei (§ 4 Nr. 8 Buchstabe c UStG). Die ursprüngliche Lieferung oder Leistung bleibt davon unberührt; die Umsatzsteuer darauf schuldet weiterhin der ursprüngliche Leistende. Beim echten Factoring kann die Dienstleistung des Factors steuerpflichtig sein; das solltest du mit dem Steuerberater klären.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du eine Abtretungserklärung brauchst",
        text: `Eine Forderung ist Vermögen, und Vermögen kann man übertragen. Genau das macht die Abtretung: Der bisherige Gläubiger (Zedent) überträgt seine Forderung gegen einen Schuldner auf einen neuen Gläubiger (Zessionar). Gründer brauchen das in vier typischen Situationen. Du verkaufst eine offene Kundenforderung, weil du das Geld jetzt brauchst und nicht in 60 Tagen. Ein Darlehensgeber verlangt Forderungen als Sicherheit für sein Darlehen. Ein Projekt oder Kundenstamm wechselt den Inhaber, und die Zahlungsansprüche sollen mitgehen.

Oder ein Erstattungsanspruch gegen Versicherung oder Plattform soll an die Person gehen, die den Schaden tatsächlich getragen hat. Die Vorlage deckt Forderungskauf, Sicherungsabtretung und Abtretung an Erfüllungs statt ab und bringt die Anzeige an den Schuldner gleich mit.`,
      },
      {
        titel: "Was muss in eine Abtretungserklärung nach § 398 BGB?",
        text: `Die Abtretung selbst ist formfrei, aber ohne Schriftstück kannst du weder dem Schuldner noch einem Gericht beweisen, wem die Forderung gehört. Die Vorlage regelt:

- Die abgetretene Forderung mit Schuldner, Betrag, Rechtsgrund und Fälligkeit; bei künftigen Forderungen den Zeitraum und einen Höchstbetrag (§ 1)
- Die Abtretungserklärung und die Annahme sowie den Übergang von Zinsen, Sicherheiten und Eigentumsvorbehalt (§ 2)
- Die Versicherung, dass die Forderung nicht schon anderweitig abgetreten oder gepfändet ist und kein Abtretungsverbot besteht (§ 2 Abs. 3)
- Die Gegenleistung: Kaufpreis, Sicherungszweck mit Rückabtretung oder Tilgung einer eigenen Schuld (§ 3)
- Die Gewährleistung für den Bestand der Forderung und den Ausschluss der Haftung für die Zahlungsfähigkeit des Schuldners (§ 4)
- Anzeige an den Schuldner, Übergabe der Unterlagen, Weiterleitung von Zahlungen und Datenschutz (§ 5)
- Das Muster der Abtretungsanzeige, das der Zedent unterschreibt (Anlage)

Die Anzeige ist kein Formalismus: Bis der Schuldner von der Abtretung weiß, darf er weiter an den alten Gläubiger zahlen.`,
      },
      {
        titel: "Abtretung Muster ausfüllen: Zedent, Zessionar, Schuldner",
        text: `Setze in den Kopf Zedent und Zessionar mit Anschrift ein. In § 1 beschreibst du die Forderung so, dass sie eindeutig ist: Schuldner, Rechnungsnummer, Datum, Betrag, Fälligkeit. Willst du künftige Forderungen abtreten, nutzt du die Alternative in § 1 Abs. 3 und grenzt sie nach Vertrag, Zeitraum und Höchstbetrag ein. In § 2 Abs. 3 prüfst du den Vertrag mit dem Schuldner auf ein Abtretungsverbot; liegt eines vor, brauchst du dessen Zustimmung und trägst das Datum ein.

In § 3 wählst du Variante A, B oder C und streichst die anderen beiden. In § 4 Abs. 2 entscheidest du, ob der Zedent das Ausfallrisiko ganz oder bis zu einem Betrag übernimmt; ohne diese Alternative trägt es der Zessionar. In § 5 wählst du zwischen sofortiger und stiller Abtretung. Fülle zuletzt die Anlage aus, lass sie vom Zedenten unterschreiben und schick sie nachweisbar an den Schuldner.`,
      },
      {
        titel: "Typische Fehler bei der Forderungsabtretung",
        text: `Fehler Nummer eins: Die Anzeige unterbleibt oder kommt zu spät. Zahlt der Schuldner in der Zwischenzeit an den alten Gläubiger, ist er frei (§ 407 BGB), und der Zessionar muss sich das Geld beim Zedenten holen. Fehler zwei: Das Abtretungsverbot im Kundenvertrag wird übersehen. Zwischen Kaufleuten ist die Abtretung einer Geldforderung trotz Verbots wirksam (§ 354a HGB), der Schuldner darf aber weiter an den Zedenten zahlen; gegenüber Verbrauchern oder Nichtkaufleuten ist die Abtretung bei einem Verbot unwirksam.

Fehler drei: Der Käufer prüft die Forderung nicht. Alle Einwendungen, die der Schuldner gegen den Zedenten hatte, behält er auch gegen den Zessionar (§ 404 BGB), etwa Mängel, Skonto oder Aufrechnung. Fehler vier: unbestimmte Beschreibung bei Globalabtretungen („alle Forderungen“ ohne Kundenliste oder Zeitraum); dann ist die Abtretung unwirksam, weil niemand weiß, welche Forderung gemeint ist.`,
      },
      {
        titel: "Rechtsgrundlagen: §§ 398 bis 409 BGB, § 354a HGB, Umsatzsteuer",
        text: `Die Abtretung regelt § 398 BGB als Vertrag zwischen altem und neuem Gläubiger; der Schuldner muss weder zustimmen noch informiert werden, damit sie wirksam wird. Nebenrechte wie Zinsen, Bürgschaften und Hypotheken gehen nach § 401 BGB mit über. Der Zedent muss Auskunft erteilen und Urkunden herausgeben (§§ 402, 403 BGB). Der Schuldner behält seine Einwendungen (§ 404 BGB) und kann unter den Voraussetzungen des § 406 BGB aufrechnen.

Solange er von der Abtretung nichts weiß, zahlt er befreiend an den Zedenten (§ 407 BGB); hat der Zedent die Abtretung angezeigt, muss er sie gegen sich gelten lassen (§ 409 BGB). Ein vertragliches Abtretungsverbot (§ 399 BGB) wird zwischen Kaufleuten durch § 354a HGB entschärft. Umsatzsteuerlich ist die Abtretung der Forderung selbst steuerfrei (§ 4 Nr. 8 Buchstabe c UStG); die ursprüngliche Leistung bleibt steuerpflichtig wie gehabt.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht: Factoring, Inkasso, Globalzession",
        text: `Die Vorlage reicht für die einzelne Abtretung zwischen zwei Unternehmen oder Personen. Sie reicht nicht für Factoring-Verträge mit laufendem Forderungsankauf, für Globalzessionen an Banken, die mit dem verlängerten Eigentumsvorbehalt von Lieferanten kollidieren können, oder für die Abtretung von Lohn- und Gehaltsansprüchen mit Pfändungsgrenzen.

Wer regelmäßig fremde Forderungen einzieht oder ankauft, braucht unter Umständen eine Registrierung nach dem Rechtsdienstleistungsgesetz oder eine Erlaubnis nach dem KWG; das solltest du vorher anwaltlich klären. Beim Verkauf mit Abschlag stellt sich steuerlich die Frage nach Forderungsverlust und Umsatzsteuerberichtigung beim Zedenten, die der Steuerberater beantwortet. GründerX bietet die Vorlage als Werkzeug an, nicht als Rechts- oder Steuerberatung.`,
      },
    ],
    seo: {
      title: "Abtretungserklärung Vorlage kostenlos (Word) | GründerX",
      description:
        "Forderungsabtretung als kostenlose Vorlage nach § 398 BGB: Zedent, Zessionar, Gegenleistung, Gewähr für Bestand, Muster-Anzeige an den Schuldner.",
    },
    stand: "2026-10",
    text: `Abtretungserklärung (Forderungsabtretung)

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Zedent“ (bisheriger Gläubiger) –

und

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Zessionar“ (neuer Gläubiger) –

§ 1 Abgetretene Forderung
(1) Der Zedent hat gegen [Firma / Vorname Nachname], [Straße, PLZ Ort] (nachfolgend „Schuldner“) eine Forderung in Höhe von [Betrag] EUR aus [Rechtsgrund, z. B. „Rechnung Nr. [Nummer] vom [Datum] über [Lieferung/Leistung]“ / „Vertrag vom [Datum]“], fällig seit dem [Datum].
(2) Die Forderung umfasst die Hauptforderung sowie [aufgelaufene Verzugszinsen seit dem [Datum] / Mahnkosten in Höhe von [Betrag] EUR].
(3) [Alternative bei künftigen Forderungen: Abgetreten werden alle gegenwärtigen und künftigen Forderungen des Zedenten gegen den Schuldner aus [Vertrag/Geschäftsbeziehung], die bis zum [Datum] entstehen, höchstens jedoch bis zu einem Gesamtbetrag von [Betrag] EUR.]

§ 2 Abtretung
(1) Der Zedent tritt die in § 1 bezeichnete Forderung hiermit an den Zessionar ab. Der Zessionar nimmt die Abtretung an (§ 398 BGB).
(2) Mit der Forderung gehen die Neben- und Vorzugsrechte, insbesondere Zinsansprüche, Sicherheiten, Bürgschaften und ein etwaiger Eigentumsvorbehalt, auf den Zessionar über (§ 401 BGB).
(3) Der Zedent versichert, dass die Forderung nicht bereits an einen Dritten abgetreten, verpfändet oder gepfändet ist und dass kein vertragliches Abtretungsverbot entgegensteht. [Alternative: Der Vertrag mit dem Schuldner enthält ein Abtretungsverbot; der Schuldner hat der Abtretung mit Schreiben vom [Datum] zugestimmt.]

§ 3 Gegenleistung
[Variante A – Forderungskauf: Der Zessionar zahlt für die Abtretung einen Kaufpreis von [Betrag] EUR, fällig am [Datum] auf das Konto des Zedenten, IBAN [IBAN].]
[Variante B – Abtretung zur Sicherheit: Die Abtretung erfolgt zur Sicherung der Forderung des Zessionars gegen den Zedenten aus [Darlehensvertrag vom [Datum]] in Höhe von [Betrag] EUR. Nach vollständiger Tilgung der gesicherten Forderung tritt der Zessionar die Forderung an den Zedenten zurück. Der Zedent bleibt bis auf Widerruf zur Einziehung im eigenen Namen berechtigt.]
[Variante C – Abtretung an Erfüllungs statt: Die Abtretung erfolgt zur Tilgung der Forderung des Zessionars gegen den Zedenten aus [Grund] in Höhe von [Betrag] EUR. Mit der Abtretung ist diese Forderung erloschen.]

§ 4 Gewährleistung
(1) Der Zedent steht dafür ein, dass die Forderung besteht, ihm zusteht, in der angegebenen Höhe fällig und nicht verjährt ist, nicht mit Rechten Dritter belastet ist und dass dem Schuldner keine ihm bekannten Einwendungen oder Aufrechnungsmöglichkeiten zustehen (Haftung für den Bestand).
(2) Der Zedent haftet nicht für die Zahlungsfähigkeit des Schuldners. Das Risiko, dass der Schuldner nicht zahlt, trägt der Zessionar. [Alternative: Der Zedent übernimmt das Ausfallrisiko bis zur Höhe von [Betrag] EUR; bleibt der Schuldner trotz Mahnung und Fristsetzung länger als [z. B. 90] Tage nach Fälligkeit säumig, kann der Zessionar vom Zedenten Rückzahlung des Kaufpreises gegen Rückabtretung verlangen.]
(3) Stellt sich heraus, dass die Forderung ganz oder teilweise nicht besteht, hat der Zedent dem Zessionar den Kaufpreis insoweit zurückzuzahlen und entstandene Kosten zu ersetzen.

§ 5 Anzeige, Unterlagen und Einziehung
(1) Der Zedent zeigt dem Schuldner die Abtretung unverzüglich schriftlich an (Muster in der Anlage) und übermittelt dem Zessionar einen Nachweis über den Zugang. [Alternative bei stiller Abtretung: Die Abtretung wird dem Schuldner zunächst nicht angezeigt. Der Zessionar darf die Anzeige vornehmen, sobald [Bedingung, z. B. „der Zedent mit der gesicherten Forderung in Verzug gerät“].]
(2) Der Zedent übergibt dem Zessionar alle zur Geltendmachung erforderlichen Unterlagen, insbesondere Vertrag, Rechnung, Lieferschein, Mahnungen und Schriftverkehr, und erteilt die nötigen Auskünfte (§§ 402, 403 BGB).
(3) Zahlungen, die der Zedent nach der Abtretung vom Schuldner erhält, leitet er unverzüglich an den Zessionar weiter.
(4) Personenbezogene Daten des Schuldners werden nur weitergegeben, soweit das zur Geltendmachung der Forderung erforderlich ist (Art. 6 Abs. 1 Buchstabe f DSGVO).

§ 6 Schlussbestimmungen
(1) Änderungen dieser Vereinbarung bedürfen der Schriftform. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(4) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Firma / Vorname Nachname], Zedent


______________________________
[Firma / Vorname Nachname], Zessionar


Anlage: Muster der Abtretungsanzeige an den Schuldner

[Firma / Vorname Nachname des Zedenten]
[Straße, PLZ Ort]

[Firma / Vorname Nachname des Schuldners]
[Straße, PLZ Ort]

[Ort], den [Datum]

Betreff: Anzeige der Abtretung – [Rechnung Nr. [Nummer] vom [Datum] / Vertrag vom [Datum]]

Sehr geehrte Damen und Herren,

hiermit zeigen wir Ihnen an, dass wir unsere Forderung gegen Sie aus [Rechnung Nr. [Nummer] vom [Datum]] in Höhe von [Betrag] EUR [nebst Zinsen und Kosten] mit Wirkung zum [Datum] an

[Firma / Vorname Nachname des Zessionars], [Straße, PLZ Ort]

abgetreten haben (§ 398 BGB).

Bitte leisten Sie Zahlungen auf diese Forderung ab sofort ausschließlich an den neuen Gläubiger auf das Konto IBAN [IBAN des Zessionars] bei der [Bank], Verwendungszweck „[Rechnungsnummer]“. Zahlungen an uns haben ab Zugang dieses Schreibens keine schuldbefreiende Wirkung mehr (§§ 407, 409 BGB).

Für Rückfragen zur Forderung wenden Sie sich bitte an [Ansprechpartner des Zessionars, Telefon, E-Mail].

Mit freundlichen Grüßen

______________________________
[Firma / Vorname Nachname], Zedent

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "quittung",
    titel: "Quittung",
    kurz: "Quittung nach § 368 BGB für Barzahlung, Teilzahlung oder die Übergabe einer Sache, mit Hinweisen zu Kassenbuch und Bargeldgrenzen.",
    kategorie: "finanzen",
    dateiname: "Quittung",
    wofuer: [
      "Ein Kunde zahlt bar und will einen Beleg",
      "Du zahlst eine Privatperson bar (z. B. Gebrauchtkauf, Auslage) und brauchst den Nachweis für die Buchhaltung",
      "Eine Teilzahlung auf eine größere Forderung soll dokumentiert werden",
      "Die Übergabe einer Sache, von Schlüsseln oder Unterlagen soll bestätigt werden",
    ],
    enthaelt: [
      "Variante A: Quittung über Zahlungseingang (Voll- oder Teilzahlung)",
      "Variante B: Übergabequittung für Sachen, Schlüssel oder Unterlagen",
      "Angaben zu Zahler, Empfänger, Betrag, Grund und Datum",
      "Vermerk zur Umsatzsteuer und zur Rechnungsnummer",
      "Unterschrift des Empfängers",
      "Hinweise zu Kassenbuch, Aufbewahrung und Bargeldgrenze",
    ],
    hinweise: [
      "Eine Quittung ist nur ein Empfangsbekenntnis (§ 368 BGB), keine Rechnung. Für den Vorsteuerabzug braucht der Zahler eine Rechnung mit den Angaben nach § 14 UStG; bis 250 EUR brutto genügt eine Kleinbetragsrechnung (§ 33 UStDV), die diese Quittung mit den Pflichtfeldern erfüllt.",
      "Bareinnahmen und -ausgaben müssen täglich und einzeln aufgezeichnet werden (§ 146 Abs. 1 AO). Wer ein Kassenbuch führt, trägt jede Quittung dort ein; Belege werden 8 Jahre aufbewahrt (§ 147 Abs. 3 AO seit 2025).",
      "Händler, die Bargeld ab 10.000 EUR annehmen, müssen den Zahler nach dem Geldwäschegesetz identifizieren und die Daten aufbewahren (§ 10 Abs. 6a GwG). Eine EU-weite Barzahlungsobergrenze von 10.000 EUR kommt mit der neuen Geldwäscheverordnung ab Juli 2027.",
      "Die Quittung beweist nur den Empfang des Geldes, nicht die Höhe der gesamten Schuld. Bei Teilzahlungen immer den Restbetrag eintragen, damit später kein Streit entsteht.",
    ],
    faqs: [
      {
        q: "Hat der Zahler ein Recht auf eine Quittung?",
        a: "Ja. Wer eine Leistung erbringt, kann vom Empfänger ein schriftliches Empfangsbekenntnis verlangen (§ 368 BGB). Die Kosten der Quittung trägt grundsätzlich der Schuldner (§ 369 BGB), in der Praxis also niemand, weil ein Zettel reicht.",
      },
      {
        q: "Ersetzt die Quittung eine Rechnung?",
        a: "Nein. Die Quittung bestätigt nur den Zahlungseingang. Eine Rechnung ist ein eigenes Dokument mit den Pflichtangaben nach § 14 UStG. Bei Beträgen bis 250 EUR brutto kann die Quittung beides sein, wenn sie Name und Anschrift des Ausstellers, Datum, Menge und Art der Leistung, Bruttobetrag und Steuersatz enthält.",
      },
      {
        q: "Was muss ich beachten, wenn ich als Unternehmer Bargeld annehme?",
        a: "Jede Bareinnahme wird einzeln und zeitnah aufgezeichnet, bei einer Registrierkasse über das zertifizierte System, sonst im Kassenbuch. Die Quittung ist der Beleg dazu. Ab 10.000 EUR greift das Geldwäschegesetz mit Identifizierungspflicht, und viele Branchen sollten Barzahlungen in dieser Höhe grundsätzlich meiden.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du eine Quittung ausstellen oder verlangen solltest",
        text: `Eine Quittung bestätigt, dass Geld oder eine Sache angekommen ist. Mehr nicht, aber genau das ist im Streitfall entscheidend. Als Gründer brauchst du sie in beide Richtungen: Ein Kunde zahlt am Stand, im Laden oder bei der Lieferung bar und will einen Beleg. Du kaufst gebraucht von einer Privatperson, zahlst bar und brauchst den Nachweis für die Buchhaltung, weil es sonst keinen Beleg gibt. Ein Mitarbeiter legt Geld aus und du erstattest es.

Eine Teilzahlung auf eine größere Rechnung soll festgehalten werden, damit der Restbetrag klar ist. Oder du übergibst Schlüssel, Geräte oder Unterlagen und willst später beweisen können, was in welchem Zustand übergeben wurde. Die Vorlage enthält beide Varianten: Quittung über Zahlungseingang und Übergabequittung.`,
      },
      {
        titel: "Was muss auf eine Quittung? Pflichtangaben nach § 368 BGB und § 33 UStDV",
        text: `Das BGB stellt keine Formanforderungen an eine Quittung; sie muss nur den Empfang bestätigen und vom Empfänger unterschrieben sein. Damit sie zugleich für die Buchhaltung taugt, enthält die Vorlage:

- Fortlaufende Quittungsnummer, damit das Kassenbuch lückenlos bleibt
- Name und Anschrift des Empfängers mit Steuernummer oder USt-IdNr.
- Name und Anschrift des Zahlers
- Betrag in Zahlen und Worten sowie Zahlungsart (bar, Karte, Überweisung)
- Grund der Zahlung mit Rechnungsnummer, Kaufgegenstand oder Auftrag
- Umsatzsteuervermerk: enthaltener Steuerbetrag und Satz, Hinweis auf § 19 UStG oder Privatverkauf
- Bei Teilzahlungen Gesamtforderung, Restbetrag und dessen Fälligkeit
- Ort, Datum und Unterschrift des Empfängers

Mit Steuersatz, Datum, Leistungsbeschreibung und Bruttobetrag erfüllt die Quittung bis 250 EUR brutto zugleich die Anforderungen an eine Kleinbetragsrechnung (§ 33 UStDV), sodass der Zahler daraus die Vorsteuer ziehen kann. Die Übergabequittung (Variante B) ersetzt die Geldangaben durch eine Liste der Gegenstände mit Anzahl, Seriennummer und Zustand.`,
      },
      {
        titel: "Quittung Vorlage ausfüllen: Zahlung oder Übergabe",
        text: `Wähle zuerst die Variante: A für Geld, B für Sachen. Bei Variante A trägst du dich als Empfänger mit Steuernummer ein, dann den Zahler. Schreib den Betrag in Zahlen und in Worten, damit niemand eine Null ergänzen kann. Beim Grund nennst du die Rechnungsnummer oder den Gegenstand. Beim Umsatzsteuervermerk streichst du die zwei nicht passenden Alternativen; als Kleinunternehmer bleibt der Hinweis auf § 19 UStG stehen.

Bei einer Teilzahlung füllst du Gesamtforderung, Restbetrag und Fälligkeit aus, bei Vollzahlung den Satz zur vollständigen Begleichung. Bei Variante B listest du jeden Gegenstand einzeln mit Seriennummer und Zustand und nennst den Grund der Übergabe, etwa Kaufvertrag oder Leihe. Der Empfänger unterschreibt, bei der Übergabe beide. Nummeriere die Quittungen fortlaufend und behalte einen Durchschlag oder Scan.`,
      },
      {
        titel: "Typische Fehler bei Quittungen und Barzahlungen",
        text: `Der erste Fehler ist, die Quittung als Rechnung zu behandeln. Über 250 EUR brutto braucht der Zahler für den Vorsteuerabzug eine vollständige Rechnung nach § 14 UStG mit Rechnungsnummer, Nettobetrag, Steuerbetrag und Anschrift des Empfängers; die Quittung ersetzt sie dann nicht. Der zweite Fehler ist das fehlende Kassenbuch. Wer Bargeld annimmt, muss jede Einnahme täglich und einzeln aufzeichnen; eine lose Sammlung von Quittungen ohne Kassenbuch führt bei der Betriebsprüfung zu Hinzuschätzungen.

Der dritte Fehler ist die Teilzahlung ohne Restbetrag: Steht auf der Quittung nur „500 EUR erhalten“, behauptet der Zahler später, damit sei alles bezahlt. Der vierte Fehler sind Barzahlungen ab 10.000 EUR ohne Identifizierung des Zahlers; Güterhändler müssen hier nach dem Geldwäschegesetz Ausweisdaten erfassen. Und schließlich: Quittungen gehören zu den Buchungsbelegen und müssen acht Jahre aufbewahrt werden, auch als Scan unveränderbar.`,
      },
      {
        titel: "Rechtliche und steuerliche Grundlagen: BGB, UStG, AO, GwG",
        text: `Nach § 368 BGB kann der Schuldner gegen Empfang der Leistung ein schriftliches Empfangsbekenntnis verlangen; die Kosten trägt nach § 369 BGB grundsätzlich der Schuldner. Die Quittung beweist den Empfang, nicht die Höhe der ursprünglichen Schuld. Für die Umsatzsteuer gilt: Eine Rechnung braucht die Angaben des § 14 Abs. 4 UStG, eine Kleinbetragsrechnung bis 250 EUR brutto die reduzierten Angaben des § 33 UStDV.

Kasseneinnahmen und -ausgaben sind täglich festzuhalten (§ 146 Abs. 1 AO); elektronische Kassensysteme brauchen eine zertifizierte technische Sicherheitseinrichtung (§ 146a AO). Belege sind acht Jahre aufzubewahren (§ 147 Abs. 3 AO). Händler, die Bargeld ab 10.000 EUR annehmen, müssen den Zahler nach dem Geldwäschegesetz identifizieren und die Daten aufbewahren.`,
      },
      {
        titel: "Wann die Quittungsvorlage nicht reicht",
        text: `Die Vorlage reicht für den Alltag: Barverkäufe, Auslagen, Teilzahlungen, Übergaben. Sie reicht nicht als Ersatz für eine Rechnung über 250 EUR, nicht als Kassensystem für ein Ladengeschäft mit vielen Barumsätzen und nicht als alleiniger Nachweis bei Bargeld ab 10.000 EUR, weil dort zusätzlich die Identifizierungspflicht greift.

Bei Übergaben von hohem Wert, etwa Fahrzeugen oder Maschinen, ergänzt du die Quittung um ein ausführliches Übergabeprotokoll mit Fotos. Wie du Bareinnahmen in deiner Buchführung erfasst und ob du eine Registrierkasse brauchst, klärst du mit dem Steuerberater. GründerX liefert die Quittungsvorlage als Werkzeug, keine Steuerberatung.`,
      },
    ],
    seo: {
      title: "Quittung Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Quittung als kostenlose Vorlage nach § 368 BGB: Zahlungseingang, Teilzahlung oder Übergabe einer Sache. Mit Hinweisen zu Kassenbuch und Bargeldgrenze.",
    },
    stand: "2026-10",
    text: `Quittung

Variante A – Quittung über Zahlungseingang

Quittung Nr. [Nummer]

Empfänger (Aussteller der Quittung):
[Firma / Vorname Nachname]
[Straße, PLZ Ort]
[Steuernummer oder USt-IdNr.]

Zahler:
[Firma / Vorname Nachname]
[Straße, PLZ Ort]

Betrag: [Betrag] EUR
in Worten: [Betrag in Worten] Euro

Zahlungsart: [bar / EC-Karte / Überweisung am [Datum]]

Grund der Zahlung: [z. B. „Rechnung Nr. [Nummer] vom [Datum]“ / „Kauf von [Gegenstand]“ / „Kaution für [Objekt]“ / „Anzahlung auf [Auftrag]“]

Umsatzsteuer: [Im Betrag enthalten sind [z. B. 19] % Umsatzsteuer = [Betrag] EUR. / Kein Steuerausweis; gemäß § 19 UStG wird keine Umsatzsteuer berechnet. / Privatverkauf, keine Umsatzsteuer.]

[Bei Teilzahlung: Es handelt sich um eine Teilzahlung auf die Forderung in Höhe von [Gesamtbetrag] EUR. Nach dieser Zahlung verbleibt ein Restbetrag von [Restbetrag] EUR, fällig am [Datum].]
[Bei Vollzahlung: Mit dieser Zahlung ist die genannte Forderung vollständig beglichen.]

Der Empfang des oben genannten Betrags wird hiermit bestätigt (§ 368 BGB).

[Ort], den [Datum]


______________________________
[Vorname Nachname], Empfänger
(Unterschrift, ggf. Firmenstempel)


Variante B – Übergabequittung

Übergabequittung Nr. [Nummer]

Übergeber:
[Firma / Vorname Nachname]
[Straße, PLZ Ort]

Empfänger:
[Firma / Vorname Nachname]
[Straße, PLZ Ort]

Übergebene Gegenstände:
1. [Bezeichnung, z. B. „Laptop [Marke, Modell], Seriennummer [Nummer]“], Anzahl: [Zahl], Zustand: [neu / gebraucht, ohne erkennbare Mängel / mit folgenden Mängeln: [Beschreibung]]
2. [Bezeichnung, z. B. „3 Schlüssel für Büro [Anschrift], Nr. [Nummer]“], Anzahl: [Zahl]
3. [Bezeichnung, z. B. „Originalunterlagen: [Liste]“]

Grund der Übergabe: [z. B. „Kaufvertrag vom [Datum]“ / „Leihe bis zum [Datum]“ / „Rückgabe nach Ende des Mietvertrags“ / „Rücksendung zur Reparatur“]

Der Empfänger bestätigt, die oben aufgeführten Gegenstände am heutigen Tag vollständig und im beschriebenen Zustand erhalten zu haben. Weitere Gegenstände wurden nicht übergeben.

[Optional: Die Gegenstände bleiben bis zur vollständigen Zahlung des Kaufpreises Eigentum des Übergebers.]

[Ort], den [Datum]


______________________________
[Vorname Nachname], Empfänger


______________________________
[Vorname Nachname], Übergeber


Hinweise zur Verwendung
1. Die Quittung ist ein Empfangsbekenntnis, keine Rechnung. Für den Vorsteuerabzug ist eine Rechnung nach § 14 UStG nötig; bis 250 EUR brutto reicht eine Kleinbetragsrechnung nach § 33 UStDV (Name und Anschrift des Ausstellers, Ausstellungsdatum, Menge und Art der Leistung, Bruttobetrag, Steuersatz oder Hinweis auf Steuerbefreiung).
2. Bareinnahmen und -ausgaben sind täglich und einzeln aufzuzeichnen (§ 146 Abs. 1 AO) und mit Belegnummer im Kassenbuch zu erfassen. Belege sind 8 Jahre aufzubewahren (§ 147 Abs. 3 AO).
3. Bei Barzahlungen ab 10.000 EUR muss ein Güterhändler den Zahler identifizieren (§ 10 Abs. 6a GwG). Quittungsblock mit fortlaufender Nummer verwenden; Durchschlag oder Kopie beim Aussteller verbleibt.

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "buergschaft",
    titel: "Bürgschaftserklärung (selbstschuldnerisch)",
    kurz: "Selbstschuldnerische Höchstbetragsbürgschaft nach §§ 765 ff. BGB: Hauptschuld, Höchstbetrag, Verzicht auf Einrede der Vorausklage, Schriftform.",
    kategorie: "finanzen",
    dateiname: "Buergschaftserklaerung",
    wofuer: [
      "Ein Lieferant, Vermieter oder Darlehensgeber verlangt von dir als Gründer eine persönliche Bürgschaft für deine GmbH oder UG",
      "Eine Privatperson bürgt für ein Darlehen an dein Unternehmen",
      "Du gewährst einem Kunden Lieferantenkredit und willst eine Bürgschaft des Geschäftsführers",
      "Absicherung einer Mietkaution oder eines Zahlungsziels durch Dritte",
    ],
    enthaelt: [
      "§ 1 Hauptschuld und gesicherter Anspruch",
      "§ 2 Bürgschaftserklärung und Höchstbetrag",
      "§ 3 Selbstschuldnerische Haftung, Verzicht auf Einrede der Vorausklage",
      "§ 4 Einreden des Bürgen und Informationsrechte",
      "§ 5 Inanspruchnahme und Zahlung",
      "§ 6 Dauer, Erlöschen und Rückgriff",
      "§ 7 Risikohinweis für den Bürgen",
      "§ 8 Schlussbestimmungen",
    ],
    hinweise: [
      "Die Bürgschaftserklärung muss schriftlich mit eigenhändiger Unterschrift des Bürgen erteilt werden; elektronische Form ist ausgeschlossen (§ 766 BGB). Nur Kaufleute können auch formlos bürgen (§ 350 HGB). Eine per E-Mail oder WhatsApp erklärte Bürgschaft einer Privatperson ist nichtig.",
      "Bürgschaften naher Angehöriger (Ehepartner, Kinder, Eltern) ohne eigenes Einkommen oder Vermögen sind nach der BGH-Rechtsprechung sittenwidrig und nichtig (§ 138 BGB), wenn der Bürge die laufenden Zinsen nicht einmal aus dem pfändbaren Einkommen bezahlen könnte und die Bürgschaft nur aus emotionaler Verbundenheit übernommen wurde. Das schützt den Bürgen, nützt dem Gläubiger aber nichts.",
      "Ohne Höchstbetrag haftet der Bürge für alles, was aus der Hauptschuld entsteht, inklusive Zinsen und Kosten. Setze immer einen Höchstbetrag ein, und als Bürge besteh darauf, dass Zinsen und Kosten darin enthalten sind.",
      "Als Geschäftsführer-Gesellschafter einer GmbH oder UG hebst du mit einer persönlichen Bürgschaft die Haftungsbeschränkung für diese Verbindlichkeit auf. Vereinbare, dass die Bürgschaft endet, wenn du aus der Gesellschaft ausscheidest, sonst haftest du weiter.",
    ],
    faqs: [
      {
        q: "Was bedeutet selbstschuldnerisch?",
        a: "Der Bürge verzichtet auf die Einrede der Vorausklage (§§ 771, 773 BGB). Der Gläubiger kann ihn also sofort in Anspruch nehmen, sobald der Hauptschuldner nicht zahlt, ohne zuerst gegen den Hauptschuldner klagen und vollstrecken zu müssen. Fast alle Bürgschaften im Geschäftsverkehr sind selbstschuldnerisch.",
      },
      {
        q: "Kann ich eine Bürgschaft kündigen?",
        a: "Eine befristete Bürgschaft endet mit Fristablauf (§ 777 BGB). Eine unbefristete Bürgschaft für ein Dauerschuldverhältnis kann der Bürge nach angemessener Zeit mit Frist kündigen, haftet aber für alles, was bis zum Wirksamwerden der Kündigung entstanden ist. Die Vorlage sieht deshalb ein ausdrückliches Kündigungsrecht und eine Begrenzung auf Altverbindlichkeiten vor.",
      },
      {
        q: "Was kann der Bürge dem Gläubiger entgegenhalten?",
        a: "Alle Einreden, die auch dem Hauptschuldner zustehen, etwa Verjährung, Stundung oder Mängel der Leistung (§ 768 BGB). Außerdem kann er die Zahlung verweigern, solange der Hauptschuldner den Vertrag anfechten oder gegen die Forderung aufrechnen könnte (§ 770 BGB). Auf diese Einreden kann in der Bürgschaftsurkunde nicht wirksam pauschal verzichtet werden.",
      },
      {
        q: "Bekommt der Bürge das Geld vom Hauptschuldner zurück?",
        a: "Ja, soweit beim Hauptschuldner etwas zu holen ist. Zahlt der Bürge, geht die Forderung des Gläubigers samt Sicherheiten kraft Gesetzes auf ihn über (§ 774 BGB). Er kann außerdem aus dem Innenverhältnis zum Hauptschuldner Erstattung verlangen; das sollte in einem gesonderten Auftrag oder Vertrag festgehalten sein.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann eine Bürgschaftserklärung verlangt wird",
        text: `Bürgschaften begegnen Gründern meist von der unangenehmen Seite: Der Vermieter der ersten Büroräume will die persönliche Bürgschaft des Geschäftsführers, weil die GmbH noch keine Bilanz hat. Der Lieferant gewährt Zahlungsziel nur, wenn jemand bürgt. Die Bank oder ein privater Darlehensgeber verlangt einen Bürgen für den Gründungskredit. Umgekehrt kannst du als Gläubiger eine Bürgschaft verlangen, wenn du einem Kunden Lieferantenkredit einräumst oder einer jungen Firma Geld leihst.

In allen Fällen verspricht der Bürge, für die Schuld eines anderen einzustehen, wenn dieser nicht zahlt. Die Vorlage bildet die im Geschäftsverkehr übliche Form ab: selbstschuldnerisch, mit Höchstbetrag, mit klarer Beschreibung der Hauptschuld und mit Kündigungs- und Ausstiegsregeln für den Bürgen.`,
      },
      {
        titel: "Was muss in eine selbstschuldnerische Bürgschaft?",
        text: `Eine Bürgschaft ohne klare Grenzen ist ein Blankoscheck. Die Vorlage setzt deshalb an jeder Stelle Grenzen:

- Die Hauptschuld mit Vertrag, Datum und den gesicherten Ansprüchen; andere Ansprüche sind ausdrücklich nicht gesichert (§ 1)
- Den Höchstbetrag in Zahlen und Worten, in dem Zinsen und Kosten enthalten sind (§ 2 Abs. 2)
- Keine Haftung für Erweiterungen des Hauptvertrags ohne Zustimmung des Bürgen (§ 2 Abs. 3)
- Selbstschuldnerische Haftung mit Verzicht auf die Einrede der Vorausklage, aber keine Bürgschaft auf erstes Anfordern (§ 3)
- Die Einreden des Hauptschuldners, die dem Bürgen erhalten bleiben, und Informationspflichten des Gläubigers bei Verzug (§ 4)
- Schriftliche Inanspruchnahme, Zahlungsfrist und den gesetzlichen Forderungsübergang auf den Bürgen (§ 5)
- Befristung oder Kündigungsrecht sowie das Ende der Bürgschaft beim Ausscheiden aus der Gesellschaft (§ 6)
- Einen Risikohinweis, den der Bürge bestätigt (§ 7)
- Schriftform und eigenhändige Unterschrift (§ 8)

Als Gläubiger brauchst du vor allem § 1 bis § 3, als Bürge solltest du auf § 2 Abs. 2, § 4 und § 6 bestehen.`,
      },
      {
        titel: "Bürgschaft Muster ausfüllen: Hauptschuld, Höchstbetrag, Laufzeit",
        text: `Trage Bürge, Gläubiger und Hauptschuldner mit Anschrift ein. In § 1 beschreibst du den Hauptvertrag und streichst die nicht passenden Alternativen, etwa Mietvertrag oder Lieferantenvertrag. In § 2 Abs. 2 setzt du den Höchstbetrag ein; als Bürge rechne durch, ob du diesen Betrag im Ernstfall aufbringen kannst. In § 4 Abs. 2 legst du fest, ab wie vielen Tagen Verzug der Gläubiger den Bürgen informieren muss. In § 5 Abs. 2 steht die Zahlungsfrist nach Inanspruchnahme.

In § 6 Abs. 1 wählst du zwischen Befristung mit Datum und unbefristeter Bürgschaft mit Kündigungsfrist; bei einer Gesellschafter-Bürgschaft aktivierst du Abs. 3, damit die Bürgschaft mit dem Ausscheiden endet. In § 7 ergänzt du das wirtschaftliche Eigeninteresse des Bürgen, zum Beispiel die Beteiligungsquote. Der Bürge unterschreibt eigenhändig auf Papier, der Gläubiger nimmt an.`,
      },
      {
        titel: "Typische Fehler bei Bürgschaften und wie du sie vermeidest",
        text: `Fehler eins: Die Bürgschaft wird per E-Mail, Scan oder in einem Vertragsanhang ohne eigene Unterschrift erklärt. Für Privatpersonen ist das nichtig; nur Kaufleute können formfrei bürgen. Fehler zwei: kein Höchstbetrag oder ein Höchstbetrag, zu dem Zinsen und Kosten noch obendrauf kommen. Dann haftet der Bürge für alles, was sich aus der Hauptschuld entwickelt. Fehler drei: die Bürgschaft des Ehepartners oder der Eltern ohne eigenes Einkommen. Solche Bürgschaften sind nach der Rechtsprechung sittenwidrig, wenn der Bürge die Verpflichtung erkennbar nie erfüllen könnte und nur aus emotionaler Verbundenheit unterschreibt; der Gläubiger steht dann ohne Sicherheit da.

Fehler vier: Der Geschäftsführer bürgt unbefristet, scheidet Jahre später aus der GmbH aus und bürgt weiter für neue Verbindlichkeiten. Die Vorlage sieht deshalb das Ende beim Ausscheiden vor. Fehler fünf: Der Gläubiger erweitert den Kredit, ohne den Bürgen zu fragen, und wundert sich, dass die Bürgschaft die Erhöhung nicht deckt.`,
      },
      {
        titel: "Rechtsgrundlagen: §§ 765 bis 777 BGB, Schriftform, Sittenwidrigkeit",
        text: `Die Bürgschaft ist in §§ 765 ff. BGB geregelt. § 766 BGB verlangt die schriftliche Erteilung der Bürgschaftserklärung und schließt die elektronische Form aus; § 350 HGB befreit Kaufleute davon. Der Umfang der Bürgschaft folgt dem jeweiligen Stand der Hauptschuld (§ 767 BGB), Erweiterungen durch Rechtsgeschäft des Hauptschuldners nach Übernahme binden den Bürgen nicht. Der Bürge kann die Einreden des Hauptschuldners geltend machen (§ 768 BGB) und die Zahlung verweigern, solange Anfechtung oder Aufrechnung möglich sind (§ 770 BGB).

Die Einrede der Vorausklage (§ 771 BGB) entfällt bei der selbstschuldnerischen Bürgschaft (§ 773 Abs. 1 Nr. 1 BGB). Zahlt der Bürge, geht die Forderung auf ihn über (§ 774 BGB). Eine Zeitbürgschaft erlischt mit Fristablauf, wenn der Gläubiger nicht rechtzeitig in Anspruch nimmt (§ 777 BGB). Bürgschaften finanziell krass überforderter Angehöriger sind nach § 138 BGB nichtig.`,
      },
      {
        titel: "Wann die Bürgschaftsvorlage nicht reicht",
        text: `Die Vorlage reicht für Bürgschaften im normalen Geschäftsverkehr: Miete, Lieferantenkredit, privates Darlehen, Gesellschafter-Bürgschaft gegenüber einem Geschäftspartner. Sie reicht nicht gegenüber Banken, die eigene Formulare verwenden, nicht für Bürgschaften auf erstes Anfordern, die im Bauvertrag üblich sind, und nicht für Avale und Bankbürgschaften.

Bürgschaften in sechsstelliger Höhe oder von Personen ohne eigenes Einkommen solltest du vor der Unterschrift anwaltlich prüfen lassen, auf beiden Seiten. Ob die Inanspruchnahme aus einer Bürgschaft steuerlich abziehbar ist, klärt der Steuerberater. GründerX stellt die Vorlage als Werkzeug bereit, keine Rechtsberatung.`,
      },
    ],
    seo: {
      title: "Bürgschaftserklärung Vorlage kostenlos (Word) | GründerX",
      description:
        "Selbstschuldnerische Bürgschaft als kostenlose Vorlage: Höchstbetrag, Verzicht auf Einrede der Vorausklage, Schriftform nach § 766 BGB, Risikohinweis.",
    },
    stand: "2026-10",
    text: `Bürgschaftserklärung (selbstschuldnerische Höchstbetragsbürgschaft)

Bürge:
[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
– nachfolgend „Bürge“ –

Gläubiger:
[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Gläubiger“ –

Hauptschuldner:
[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Hauptschuldner“ –

§ 1 Hauptschuld
(1) Zwischen dem Gläubiger und dem Hauptschuldner besteht [Darlehensvertrag vom [Datum] über [Betrag] EUR / Mietvertrag vom [Datum] über die Räume [Anschrift] / Lieferantenvertrag vom [Datum] mit einem Zahlungsziel von [Tage] Tagen / Rahmenvereinbarung vom [Datum]] (nachfolgend „Hauptvertrag“).
(2) Gesichert werden alle Ansprüche des Gläubigers gegen den Hauptschuldner aus dem Hauptvertrag auf Zahlung von [Darlehensrückzahlung, Zinsen und Kosten / Miete, Nebenkosten und Schadensersatz / Kaufpreis für Lieferungen] einschließlich Verzugszinsen und Kosten der Rechtsverfolgung. Andere Ansprüche des Gläubigers gegen den Hauptschuldner sind nicht gesichert.
(3) Der Bürge erklärt, den Hauptvertrag zu kennen; eine Kopie wurde ihm ausgehändigt.

§ 2 Bürgschaftserklärung und Höchstbetrag
(1) Der Bürge übernimmt hiermit gegenüber dem Gläubiger die Bürgschaft für die Erfüllung der in § 1 Abs. 2 bezeichneten Verbindlichkeiten des Hauptschuldners (§ 765 BGB).
(2) Die Haftung des Bürgen ist auf einen Höchstbetrag von [Betrag] EUR (in Worten: [Betrag in Worten] Euro) begrenzt. Zinsen, Kosten und sonstige Nebenforderungen sind in diesem Höchstbetrag enthalten und erhöhen ihn nicht.
(3) Die Bürgschaft gilt nicht für Erweiterungen des Hauptvertrags, die ohne schriftliche Zustimmung des Bürgen vereinbart werden, insbesondere nicht für die Erhöhung des Darlehens oder des Kreditrahmens.

§ 3 Selbstschuldnerische Haftung
(1) Der Bürge haftet selbstschuldnerisch. Er verzichtet auf die Einrede der Vorausklage (§§ 771, 773 Abs. 1 Nr. 1 BGB). Der Gläubiger kann den Bürgen daher in Anspruch nehmen, sobald der Hauptschuldner eine fällige Verbindlichkeit trotz Mahnung nicht erfüllt, ohne zuvor gegen den Hauptschuldner gerichtlich vorgehen oder vollstrecken zu müssen.
(2) Der Bürge haftet nicht auf erstes Anfordern. Der Gläubiger weist bei der Inanspruchnahme die Fälligkeit und den Rückstand der Hauptschuld nach.

§ 4 Einreden des Bürgen und Informationsrechte
(1) Dem Bürgen stehen die Einreden des Hauptschuldners zu, auch wenn der Hauptschuldner auf sie verzichtet (§ 768 BGB). Er kann die Zahlung verweigern, solange der Hauptschuldner das der Verbindlichkeit zugrunde liegende Rechtsgeschäft anfechten oder der Gläubiger sich durch Aufrechnung gegen eine fällige Forderung des Hauptschuldners befriedigen kann (§ 770 BGB).
(2) Der Gläubiger informiert den Bürgen unverzüglich, wenn der Hauptschuldner mit einer Zahlung länger als [z. B. 30] Tage in Verzug ist, wenn er den Hauptvertrag kündigt oder wenn ihm bekannt wird, dass über das Vermögen des Hauptschuldners ein Insolvenzverfahren beantragt wurde.
(3) Der Bürge kann vom Gläubiger jederzeit Auskunft über den aktuellen Stand der gesicherten Verbindlichkeiten verlangen.

§ 5 Inanspruchnahme und Zahlung
(1) Die Inanspruchnahme aus der Bürgschaft erfolgt schriftlich unter Angabe des geforderten Betrags und seiner Zusammensetzung.
(2) Der Bürge zahlt innerhalb von [z. B. 14] Tagen nach Zugang der Inanspruchnahme auf das Konto des Gläubigers, IBAN [IBAN] bei der [Bank].
(3) Zahlt der Bürge, geht die Forderung des Gläubigers gegen den Hauptschuldner samt den dafür bestellten Sicherheiten in Höhe der Zahlung auf den Bürgen über (§ 774 BGB). Der Gläubiger übergibt dem Bürgen auf Verlangen die hierfür erforderlichen Unterlagen.

§ 6 Dauer, Erlöschen und Kündigung
(1) Die Bürgschaft ist [befristet bis zum [Datum]; sie erlischt mit Ablauf dieses Tages, wenn der Gläubiger den Bürgen nicht bis dahin schriftlich in Anspruch genommen hat (§ 777 BGB) / unbefristet].
(2) Der Bürge kann eine unbefristete Bürgschaft mit einer Frist von [z. B. 3] Monaten schriftlich kündigen. Nach Wirksamwerden der Kündigung haftet er nur noch für Verbindlichkeiten, die bis zu diesem Zeitpunkt entstanden sind.
(3) [Optional bei Gesellschafter-Bürgschaft: Die Bürgschaft endet außerdem, sobald der Bürge als Gesellschafter oder Geschäftsführer aus dem Hauptschuldner ausscheidet und dies dem Gläubiger schriftlich mitgeteilt hat; für Verbindlichkeiten, die danach entstehen, haftet der Bürge nicht.]
(4) Die Bürgschaft erlischt mit der Hauptschuld (§ 767 BGB). Der Gläubiger gibt die Bürgschaftsurkunde nach vollständiger Erfüllung der gesicherten Verbindlichkeiten an den Bürgen zurück.

§ 7 Risikohinweis
Der Bürge bestätigt, auf Folgendes hingewiesen worden zu sein: Er haftet mit seinem gesamten Privatvermögen bis zum Höchstbetrag, auch wenn er aus dem Hauptvertrag selbst keinen Vorteil hat. Der Gläubiger kann ihn ohne vorherige Vollstreckung gegen den Hauptschuldner in Anspruch nehmen. Der Bürge erklärt, dass er nach seinen Einkommens- und Vermögensverhältnissen in der Lage ist, den Höchstbetrag aufzubringen, und die Bürgschaft aus eigenem wirtschaftlichen Interesse [an der Finanzierung der Gesellschaft, an der er mit [Anteil] % beteiligt ist / an dem Hauptvertrag] übernimmt.

§ 8 Schlussbestimmungen
(1) Diese Bürgschaft bedarf der Schriftform und der eigenhändigen Unterschrift des Bürgen (§ 766 BGB). Änderungen bedürfen ebenfalls der Schriftform.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Bürgschaft im Übrigen wirksam.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(4) Der Bürge hat eine Abschrift dieser Erklärung und eine Kopie des Hauptvertrags erhalten.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Bürge
(eigenhändige Unterschrift)


Angenommen:

______________________________
[Firma / Vorname Nachname], Gläubiger

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "zahlungserinnerung",
    titel: "Zahlungserinnerung (1. Schreiben)",
    kurz: "Freundliche Erinnerung nach Fälligkeit mit Rechnungsdaten, neuer Frist, Bankverbindung und Hinweis auf den Verzug nach § 286 BGB.",
    kategorie: "finanzen",
    dateiname: "Zahlungserinnerung",
    wofuer: [
      "Eine Rechnung ist seit einigen Tagen überfällig und du willst die Kundenbeziehung nicht belasten",
      "Als erste Stufe deines Mahnlaufs, bevor es mit Verzugszinsen und letzter Mahnung ernst wird",
      "Wenn du den Verzug rechtssicher auslösen willst, falls die Rechnung keinen festen Zahlungstermin hatte",
      "Für wiederkehrende Nutzung als Textbaustein in Buchhaltungssoftware oder E-Mail",
    ],
    enthaelt: [
      "Absender, Empfänger, Datum und Betreff mit Rechnungsnummer",
      "Höfliche Erinnerung mit Rechnungsdaten (Nummer, Datum, Betrag, Fälligkeit)",
      "Neue Zahlungsfrist mit konkretem Datum",
      "Bankverbindung und Verwendungszweck",
      "Hinweis auf Verzug nach § 286 BGB und die Folgen",
      "Freundlicher Schluss mit Ansprechpartner",
    ],
    hinweise: [
      "Auch eine freundliche Erinnerung ist rechtlich eine Mahnung, wenn sie eindeutig zur Zahlung auffordert (§ 286 Abs. 1 BGB). Das ist gewollt: Ab Zugang ist der Kunde in Verzug, falls er es nicht schon war.",
      "Ohne Mahnung tritt Verzug automatisch 30 Tage nach Fälligkeit und Zugang der Rechnung ein (§ 286 Abs. 3 BGB), bei Verbrauchern aber nur, wenn die Rechnung ausdrücklich darauf hingewiesen hat. Stand in der Rechnung ein konkretes Zahlungsdatum, ist der Kunde ab dem Folgetag in Verzug (§ 286 Abs. 2 Nr. 1 BGB).",
      "Mahngebühren für das erste Schreiben sind nur zulässig, wenn der Kunde bereits in Verzug war; die Erinnerung, die den Verzug erst auslöst, darf nichts kosten. Die 40-EUR-Pauschale (§ 288 Abs. 5 BGB) gibt es nur gegenüber Unternehmern und erst ab Verzug.",
      "Sende die Erinnerung so, dass du den Zugang belegen kannst: E-Mail mit Lesebestätigung plus Brief oder Kundenportal. Im Streit musst du beweisen, dass die Mahnung angekommen ist.",
    ],
    faqs: [
      {
        q: "Wann sollte ich die erste Zahlungserinnerung schicken?",
        a: "Etwa 5 bis 10 Tage nach Fälligkeit. Vorher wirkt es ungeduldig, später verliert die Forderung an Priorität beim Kunden. Bei Neukunden und hohen Beträgen lieber früher und gleich mit einer konkreten Frist von 7 bis 10 Tagen.",
      },
      {
        q: "Muss ich überhaupt mahnen, bevor ich Verzugszinsen verlange?",
        a: "Nicht immer. Hatte die Rechnung ein festes Zahlungsdatum, ist der Kunde ab dem Tag danach automatisch in Verzug. Ohne Datum gilt die 30-Tage-Regel des § 286 Abs. 3 BGB, gegenüber Verbrauchern nur mit entsprechendem Hinweis in der Rechnung. Die Mahnung ist der sichere Weg, weil sie in jedem Fall den Verzug auslöst.",
      },
      {
        q: "Wie viele Mahnungen brauche ich vor dem Mahnbescheid?",
        a: "Rechtlich keine, sobald der Kunde in Verzug ist. Üblich und sinnvoll sind zwei Schreiben: eine freundliche Erinnerung und eine letzte Mahnung mit Frist und Ankündigung des gerichtlichen Mahnverfahrens. Mehr als zwei Mahnungen verzögern nur und kosten Zinsen.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du eine Zahlungserinnerung schreibst",
        text: `Die Zahlungserinnerung ist das erste Schreiben, wenn eine Rechnung über das Zahlungsziel hinaus offen bleibt. Sie ist freundlich formuliert, weil der häufigste Grund für eine unbezahlte Rechnung nicht böser Wille ist, sondern eine verlegte E-Mail, ein Urlaub oder ein interner Freigabestau. Trotzdem ist sie rechtlich eine Mahnung und setzt den Kunden in Verzug, falls er es noch nicht war.

Du brauchst sie etwa fünf bis zehn Tage nach Fälligkeit, als erste Stufe eines Mahnlaufs, bevor die letzte Mahnung mit Zinsen und Pauschale folgt, und als Textbaustein für Buchhaltungssoftware oder E-Mail. Die Vorlage enthält Rechnungsdaten, neue Frist, Bankverbindung, einen Verzugshinweis und ein Gesprächsangebot, falls der Kunde ein Problem mit der Leistung hat.`,
      },
      {
        titel: "Was muss in eine Zahlungserinnerung?",
        text: `Eine Zahlungserinnerung braucht keine Paragraphen, aber alle Daten, die der Kunde zum Zahlen braucht. Die Vorlage enthält:

- Absender mit Telefon, E-Mail und Steuernummer sowie Empfänger mit Ansprechpartner
- Betreff mit Rechnungsnummer und Rechnungsdatum, dazu die Kundennummer
- Eine Übersicht mit Rechnungsnummer, Datum, Betrag, Fälligkeit, bereits gezahltem Betrag und offenem Rest
- Eine neue, konkrete Frist mit Kalenderdatum statt „innerhalb von 10 Tagen“
- Bankverbindung mit IBAN, BIC und Verwendungszweck
- Den Satz, dass sich das Schreiben erledigt hat, falls inzwischen gezahlt wurde
- Ein Gesprächsangebot bei Problemen mit der Leistung
- Den Hinweis auf den Verzug nach § 286 BGB und dass du für dieses Schreiben auf Verzugszinsen verzichtest
- Die Rechnungskopie als Anlage

Die konkrete Frist ist wichtig: Verstreicht sie, ist der Kunde spätestens jetzt in Verzug, und du kannst in der nächsten Stufe Zinsen berechnen.`,
      },
      {
        titel: "Zahlungserinnerung Vorlage ausfüllen und versenden",
        text: `Übernimm Rechnungsnummer, Datum und Betrag exakt aus der Rechnung; ein Zahlendreher gibt dem Kunden einen Grund, nicht zu zahlen. Trage unter „Bereits gezahlt“ Teilzahlungen ein oder 0,00 EUR. Setze die neue Frist als Datum, sieben bis zehn Tage nach dem Schreiben, bei Versand per Post zwei Tage mehr. Prüfe den Absatz zum Verzug: Hatte die Rechnung ein festes Zahlungsdatum, bleibt der erste Satz stehen; hatte sie keins, nimmst du die Alternative, die das Schreiben ausdrücklich zur Mahnung erklärt.

Nenne einen Ansprechpartner mit Durchwahl, damit Rückfragen nicht im Postfach landen. Versende per E-Mail mit Lesebestätigung und bei größeren Beträgen zusätzlich per Post, leg die Rechnungskopie bei und notiere Versanddatum und Weg in deiner Buchhaltung. So kannst du den Zugang später belegen, wenn es zum Mahnbescheid kommt.`,
      },
      {
        titel: "Typische Fehler beim ersten Mahnschreiben",
        text: `Der erste Fehler ist Warten. Je länger eine Rechnung offen ist, desto geringer wird die Zahlungsmoral; nach zwei Monaten ist die Forderung beim Kunden in der Prioritätenliste längst nach unten gerutscht. Der zweite Fehler sind Mahngebühren im ersten Schreiben. Die Erinnerung, die den Verzug erst auslöst, darf nichts kosten, und gegenüber Verbrauchern sind ohnehin nur die tatsächlichen Kosten wie Porto erstattungsfähig. Der dritte Fehler ist ein drohender Ton. Wer im ersten Schreiben mit Inkasso und Schufa droht, verliert den Kunden und gewinnt nichts, denn rechtlich zählt die Fristsetzung, nicht die Drohung.

Der vierte Fehler ist das Vertrauen auf die 30-Tage-Regel bei Verbrauchern: Die greift nur, wenn die Rechnung ausdrücklich darauf hingewiesen hat. Fehlt der Hinweis, löst erst die Mahnung den Verzug aus. Der fünfte Fehler ist der fehlende Zugangsnachweis; ohne ihn kannst du im Streit nicht beweisen, dass du gemahnt hast.`,
      },
      {
        titel: "Rechtsgrundlagen: Verzug nach § 286 BGB und Verzugszinsen",
        text: `Verzug ist in § 286 BGB geregelt. Nach Absatz 1 kommt der Schuldner durch Mahnung nach Fälligkeit in Verzug; die Zahlungserinnerung ist eine solche Mahnung, auch wenn sie freundlich klingt. Nach Absatz 2 Nr. 1 ist keine Mahnung nötig, wenn ein Kalendertag als Zahlungstermin vereinbart war; dann beginnt der Verzug am Tag danach. Nach Absatz 3 tritt Verzug spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung ein, gegenüber Verbrauchern nur mit entsprechendem Hinweis in der Rechnung.

Ab Verzug schuldet der Kunde Verzugszinsen: fünf Prozentpunkte über dem Basiszinssatz, bei Entgeltforderungen ohne Verbraucherbeteiligung neun Prozentpunkte (§ 288 Abs. 1 und 2 BGB). Zwischen Unternehmern kommt die Pauschale von 40 EUR hinzu (§ 288 Abs. 5 BGB). Weitere Verzugsschäden wie Anwalts- oder Inkassokosten sind nach §§ 280, 286 BGB ersatzfähig. Forderungen aus Rechnungen verjähren in drei Jahren zum Jahresende (§§ 195, 199 BGB); die Mahnung hemmt diese Frist nicht.`,
      },
      {
        titel: "Wann die Zahlungserinnerung nicht mehr reicht",
        text: `Bleibt die Zahlungserinnerung ohne Reaktion, folgt die letzte Mahnung mit bezifferten Verzugszinsen, letzter Frist und Ankündigung des Mahnbescheids; dafür gibt es eine eigene Vorlage. Bestreitet der Kunde die Forderung oder rügt Mängel, hilft kein Mahnschreiben mehr, sondern ein Gespräch, eine Vergleichsvereinbarung oder die Klage.

Droht die Verjährung zum Jahresende, beantragst du den gerichtlichen Mahnbescheid, denn nur der hemmt die Verjährung. Bei hohen Beträgen, Auslandskunden oder einem Schuldner in der Krise lohnt sich frühzeitig anwaltlicher Rat. GründerX liefert die Vorlage als Werkzeug und ersetzt keine Rechtsberatung.`,
      },
    ],
    seo: {
      title: "Zahlungserinnerung Vorlage kostenlos (Word) | GründerX",
      description:
        "Zahlungserinnerung als kostenlose Vorlage: erstes Schreiben nach Fälligkeit mit Rechnungsdaten, neuer Frist, Bankverbindung und Verzugshinweis § 286 BGB.",
    },
    stand: "2026-10",
    text: `Zahlungserinnerung

[Firma / Vorname Nachname]
[Straße, PLZ Ort]
[Telefon, E-Mail]
[Steuernummer / USt-IdNr.]

[Firma / Vorname Nachname des Kunden]
[Ansprechpartner]
[Straße, PLZ Ort]

[Ort], den [Datum]

Betreff: Zahlungserinnerung zur Rechnung Nr. [Rechnungsnummer] vom [Rechnungsdatum]
Kundennummer: [Kundennummer]

Sehr geehrte[r] [Frau/Herr Nachname] / Sehr geehrte Damen und Herren,

sicher ist es Ihrer Aufmerksamkeit entgangen: Für unsere Rechnung Nr. [Rechnungsnummer] vom [Rechnungsdatum] über [Leistung / Lieferung, z. B. „Erstellung der Website gemäß Angebot vom [Datum]“] konnten wir bis heute keinen Zahlungseingang feststellen.

Rechnungsnummer: [Rechnungsnummer]
Rechnungsdatum: [Rechnungsdatum]
Rechnungsbetrag: [Betrag] EUR
Fällig seit: [Fälligkeitsdatum]
Bereits gezahlt: [Betrag oder 0,00] EUR
Offener Betrag: [Betrag] EUR

Wir bitten Sie, den offenen Betrag von [Betrag] EUR bis spätestens

[Datum der neuen Frist, z. B. 10 Tage nach Datum dieses Schreibens]

auf das folgende Konto zu überweisen:

Kontoinhaber: [Firma / Name]
IBAN: [IBAN]
BIC: [BIC]
Bank: [Bank]
Verwendungszweck: [Rechnungsnummer]

Sollten Sie die Zahlung in den letzten Tagen bereits veranlasst haben, betrachten Sie dieses Schreiben bitte als gegenstandslos. Falls Sie Fragen zur Rechnung haben oder ein Problem mit der Leistung vorliegt, melden Sie sich bitte kurz bei [Ansprechpartner, Telefon, E-Mail]; wir finden dann gemeinsam eine Lösung.

Zu Ihrer Information: Mit Ablauf des Zahlungsziels befinden Sie sich nach § 286 BGB in Verzug. [Alternative, wenn die Rechnung kein Zahlungsdatum enthielt: Dieses Schreiben ist eine Mahnung im Sinne des § 286 Abs. 1 BGB.] Ab diesem Zeitpunkt sind wir berechtigt, Verzugszinsen in gesetzlicher Höhe sowie die durch den Verzug entstehenden weiteren Kosten zu berechnen. Für dieses erste Schreiben verzichten wir darauf.

Wir bedanken uns für Ihr Verständnis und freuen uns auf die weitere Zusammenarbeit.

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[Funktion, Firma]

Anlage: Kopie der Rechnung Nr. [Rechnungsnummer]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "letzte-mahnung",
    titel: "Letzte Mahnung vor gerichtlichem Mahnverfahren",
    kurz: "Letzte Mahnung mit Verzugszinsen, 40-EUR-Pauschale bei Unternehmern, letzter Frist und Ankündigung von Mahnbescheid oder Inkasso.",
    kategorie: "finanzen",
    dateiname: "Letzte-Mahnung",
    wofuer: [
      "Die Zahlungserinnerung blieb ohne Reaktion und du willst den Druck erhöhen, bevor es zum Gericht geht",
      "Du willst Verzugszinsen und die Verzugspauschale erstmals konkret beziffern",
      "Vor Beauftragung eines Inkassounternehmens oder vor dem Online-Mahnantrag",
      "Wenn die Verjährung zum Jahresende droht und du den Mahnbescheid vorbereitest",
    ],
    enthaelt: [
      "Absender, Empfänger, Datum und Betreff mit Rechnungsnummer",
      "Aufstellung: Hauptforderung, Verzugszinsen, Verzugspauschale, Mahnkosten",
      "Zinsberechnung mit Basiszinssatz (9 bzw. 5 Prozentpunkte darüber)",
      "Letzte Zahlungsfrist mit konkretem Datum",
      "Ankündigung von gerichtlichem Mahnbescheid, Inkasso und Kostenfolgen",
      "Bankverbindung und Hinweis auf Verjährungshemmung",
    ],
    hinweise: [
      "Verzugszinsen betragen 5 Prozentpunkte über dem Basiszinssatz, bei Entgeltforderungen ohne Verbraucherbeteiligung 9 Prozentpunkte (§ 288 Abs. 1 und 2 BGB). Der Basiszinssatz wird von der Bundesbank jeweils zum 1. Januar und 1. Juli veröffentlicht; trage den aktuellen Wert ein, nicht den aus einer alten Vorlage.",
      "Die Pauschale von 40 EUR (§ 288 Abs. 5 BGB) gibt es nur, wenn der Schuldner kein Verbraucher ist. Sie wird auf spätere Anwalts- oder Inkassokosten angerechnet. Gegenüber Privatkunden darfst du nur die tatsächlichen Mahnkosten verlangen, in der Regel Porto und Materialkosten von wenigen Euro.",
      "Der Mahnbescheid hemmt die Verjährung (§ 204 Abs. 1 Nr. 3 BGB), eine Mahnung nicht. Forderungen verjähren in drei Jahren zum Jahresende (§§ 195, 199 BGB). Beantrage den Mahnbescheid online unter mahngerichte.de rechtzeitig vor dem 31. Dezember.",
      "Inkassokosten kannst du dem Schuldner nur in der Höhe weiterberechnen, die ein Rechtsanwalt nach dem RVG verlangen dürfte (§ 13e RDG). Hole vor Beauftragung ein Angebot ein und prüfe, ob der Mahnbescheid nicht günstiger ist.",
    ],
    faqs: [
      {
        q: "Wie berechne ich die Verzugszinsen konkret?",
        a: "Offener Betrag mal Zinssatz mal Verzugstage geteilt durch 365. Der Zinssatz ist der aktuelle Basiszinssatz plus 9 Prozentpunkte (B2B) oder plus 5 Prozentpunkte (Verbraucher). Beispiel: 2.000 EUR, Basiszins 1,27 %, B2B, 60 Tage: 2.000 x 10,27 % x 60 / 365 = 33,76 EUR. Ändert sich der Basiszins während des Verzugs, rechnest du abschnittsweise.",
      },
      {
        q: "Muss ich wirklich einen Anwalt einschalten?",
        a: "Nein. Den Mahnbescheid kannst du selbst online beantragen; die Gerichtskosten (mindestens 36 EUR, abhängig vom Streitwert) muss am Ende der Schuldner tragen. Widerspricht der Schuldner, geht es ins streitige Verfahren, und ab 5.000 EUR Streitwert brauchst du vor dem Landgericht einen Anwalt.",
      },
      {
        q: "Was ist, wenn der Kunde die Forderung bestreitet?",
        a: "Dann hilft keine weitere Mahnung. Prüfe die Einwände sachlich, biete gegebenenfalls einen Vergleich an oder klage. Ein Mahnbescheid bei einer ernsthaft bestrittenen Forderung kostet nur Zeit, weil der Schuldner widersprechen wird und das Verfahren dann ohnehin vor Gericht landet.",
      },
      {
        q: "Darf ich mit Schufa-Eintrag oder Inkasso drohen?",
        a: "Die Ankündigung eines Inkassoverfahrens oder Mahnbescheids ist zulässig. Ein Schufa-Eintrag darf nur unter engen Voraussetzungen angekündigt werden (§ 31 Abs. 2 BDSG): unter anderem mindestens zwei schriftliche Mahnungen, erste Mahnung vier Wochen vor Meldung, Hinweis auf die bevorstehende Meldung und keine Bestreitung der Forderung. Ohne diese Voraussetzungen ist die Drohung selbst rechtswidrig.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du die letzte Mahnung schickst",
        text: `Die letzte Mahnung ist das Schreiben, mit dem du den außergerichtlichen Teil beendest. Sie kommt, wenn die Zahlungserinnerung und gegebenenfalls eine zweite Mahnung ohne Reaktion geblieben sind, wenn du Verzugszinsen und die Verzugspauschale erstmals konkret beziffern willst, bevor du ein Inkassounternehmen beauftragst oder den Online-Mahnantrag stellst, und wenn die Verjährung zum Jahresende droht. Mehr als zwei bis drei Mahnschreiben bringen nichts; jedes weitere kostet Zeit und Zinsen.

Die Vorlage enthält eine Aufstellung von Hauptforderung, Zinsen, Pauschale und Mahnkosten, die Zinsformel mit Basiszinssatz, eine letzte Frist mit Datum und die Ankündigung von Mahnbescheid, Kostenfolge und Vollstreckung. Sie bleibt sachlich, weil Drohungen ohne Rechtsgrundlage nach hinten losgehen.`,
      },
      {
        titel: "Was muss in eine letzte Mahnung? Verzugszinsen, Pauschale, Frist",
        text: `Eine letzte Mahnung, die vor dem Mahngericht Bestand hat, enthält:

- Absender, Empfänger, Versandweg und Betreff mit Rechnungsnummer
- Den Verweis auf Rechnung und vorangegangene Erinnerung mit Daten sowie den Tag des Verzugsbeginns
- Die Aufstellung: Hauptforderung, Verzugszinsen mit Zeitraum, Tagen und Zinssatz, bei Unternehmern die 40-EUR-Pauschale, Mahnkosten, Gesamtbetrag
- Den Hinweis, dass die Zinsen täglich weiterlaufen, mit dem Tagesbetrag
- Die Rechtsgrundlage für den Zinssatz: § 288 Abs. 2 BGB (neun Prozentpunkte) oder Abs. 1 (fünf Prozentpunkte)
- Eine letzte Frist mit Kalenderdatum und dem Zusatz, dass der Eingang auf dem Konto zählt
- Bankverbindung mit Verwendungszweck
- Die Ankündigung von Mahnbescheid oder Inkasso, Kostenerstattung und Zwangsvollstreckung
- Ein Angebot, die Forderung innerhalb der Frist zu bestreiten oder Ratenzahlung zu vereinbaren
- Anlagen: Rechnungskopie und Kopie der Zahlungserinnerung

Die Aufstellung muss stimmen, denn die Beträge übernimmst du später in den Mahnantrag.`,
      },
      {
        titel: "Mahnung Muster ausfüllen: Zinsen richtig berechnen",
        text: `Trage zuerst den Verzugsbeginn ein: der Tag nach dem Zahlungsziel der Rechnung oder der Tag nach Zugang der Zahlungserinnerung. Ermittle dann den aktuellen Basiszinssatz; die Bundesbank veröffentlicht ihn zum 1. Januar und 1. Juli. Rechne die Verzugszinsen nach der Formel: offener Betrag mal Zinssatz mal Verzugstage geteilt durch 365. Bei einer B2B-Forderung ist der Zinssatz Basiszins plus neun Prozentpunkte, gegenüber Verbrauchern plus fünf. Ändert sich der Basiszins im Verzugszeitraum, rechnest du zwei Abschnitte. Trage den Tagesbetrag ein, damit der Schuldner sieht, dass Warten teurer wird.

Die 40-EUR-Pauschale setzt du nur ein, wenn der Schuldner kein Verbraucher ist; streiche sonst die Zeile. Bei Mahnkosten gegenüber Verbrauchern trägst du nur Porto und Material ein. Setze die letzte Frist auf sieben bis zehn Tage nach dem Schreiben. Wähle in der Ankündigung zwischen Mahnbescheid und Inkasso und versende so, dass du den Zugang belegen kannst, etwa per Einwurf-Einschreiben plus E-Mail.`,
      },
      {
        titel: "Typische Fehler bei der letzten Mahnung",
        text: `Der erste Fehler ist der falsche Zinssatz: neun Prozentpunkte gegenüber einem Verbraucher oder ein Basiszins aus einer alten Vorlage. Beides fällt beim Mahngericht oder spätestens im Prozess auf. Der zweite Fehler ist die Pauschale von 40 EUR gegenüber Privatkunden; sie steht nur gegenüber Unternehmern zu. Der dritte Fehler sind erfundene Mahngebühren von 10 oder 15 EUR pro Schreiben; erstattungsfähig sind nur tatsächliche Kosten.

Der vierte Fehler ist eine Schufa-Drohung ohne die Voraussetzungen des § 31 Abs. 2 BDSG; die Drohung selbst kann dann rechtswidrig sein. Der fünfte Fehler ist die Vorstellung, die Mahnung hemme die Verjährung. Das tut sie nicht; nur Mahnbescheid, Klage oder ein Anerkenntnis helfen. Der sechste Fehler ist, bei einer bestrittenen Forderung weiter zu mahnen, statt die Einwände zu prüfen; ein Mahnbescheid landet dann nach Widerspruch ohnehin vor Gericht.`,
      },
      {
        titel: "Rechtsgrundlagen: § 286 BGB, § 288 BGB, Mahnbescheid und Verjährung",
        text: `Verzug tritt nach § 286 BGB durch Mahnung, mit Ablauf eines Kalendertermins oder 30 Tage nach Fälligkeit und Rechnungszugang ein. Die Verzugszinsen regelt § 288 BGB: fünf Prozentpunkte über dem Basiszinssatz (Abs. 1), neun Prozentpunkte bei Entgeltforderungen, an denen kein Verbraucher beteiligt ist (Abs. 2), und die Pauschale von 40 EUR für Unternehmer als Schuldner (Abs. 5), die auf spätere Rechtsverfolgungskosten angerechnet wird. Der Basiszinssatz ergibt sich aus § 247 BGB.

Weitere Verzugsschäden wie Anwalts- und Inkassokosten sind nach §§ 280, 286 BGB zu ersetzen, Inkassokosten aber nur bis zur Höhe der Anwaltsgebühren nach dem RVG (§ 13e RDG). Das gerichtliche Mahnverfahren regeln §§ 688 ff. ZPO; der Mahnbescheid hemmt die Verjährung (§ 204 Abs. 1 Nr. 3 BGB). Forderungen verjähren regelmäßig in drei Jahren ab Ende des Jahres, in dem sie entstanden sind (§§ 195, 199 BGB).`,
      },
      {
        titel: "Wann die Mahnung nicht reicht: Mahnbescheid, Inkasso, Anwalt",
        text: `Zahlt der Schuldner auch nach der letzten Frist nicht, beantragst du online den Mahnbescheid; das geht ohne Anwalt, die Gerichtskosten trägt am Ende der Schuldner. Widerspricht er, geht es ins streitige Verfahren, und bei Streitwerten über 5.000 EUR vor dem Landgericht brauchst du einen Anwalt.

Bei Schuldnern im Ausland, bei bestrittenen Forderungen, bei drohender Insolvenz des Schuldners oder bei Beträgen, die dein eigenes Unternehmen gefährden, solltest du schon vor der letzten Mahnung anwaltlichen Rat einholen. Ein Inkassounternehmen lohnt sich meist nur bei vielen kleinen Forderungen. GründerX stellt die Vorlage als Werkzeug bereit; sie ersetzt keine Rechtsberatung.`,
      },
    ],
    seo: {
      title: "Letzte Mahnung Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Letzte Mahnung vor Mahnbescheid als kostenlose Vorlage: Verzugszinsen 9 bzw. 5 Punkte über Basiszins, 40-EUR-Pauschale, letzte Frist, Inkasso-Ankündigung.",
    },
    stand: "2026-10",
    text: `Letzte Mahnung

[Firma / Vorname Nachname]
[Straße, PLZ Ort]
[Telefon, E-Mail]

[Firma / Vorname Nachname des Schuldners]
[Straße, PLZ Ort]

Per [Post / Einwurf-Einschreiben / E-Mail]

[Ort], den [Datum]

Betreff: Letzte Mahnung – Rechnung Nr. [Rechnungsnummer] vom [Rechnungsdatum]
Kundennummer: [Kundennummer]

Sehr geehrte Damen und Herren,

trotz unserer Zahlungserinnerung vom [Datum der 1. Erinnerung] [und unserer Mahnung vom [Datum]] ist die Rechnung Nr. [Rechnungsnummer] vom [Rechnungsdatum] über [Leistung / Lieferung] bis heute nicht beglichen. Sie befinden sich seit dem [Datum des Verzugsbeginns] in Zahlungsverzug (§ 286 BGB).

Wir fordern Sie hiermit letztmalig auf, den nachstehend aufgeführten Gesamtbetrag zu zahlen:

Hauptforderung (Rechnung Nr. [Rechnungsnummer]): [Betrag] EUR
Verzugszinsen vom [Verzugsbeginn] bis [Datum dieses Schreibens] ([Tage] Tage, [z. B. 9] Prozentpunkte über dem Basiszinssatz von [aktueller Basiszinssatz] %, zusammen [Zinssatz] % p. a.): [Betrag] EUR
[Nur wenn der Schuldner kein Verbraucher ist: Verzugspauschale nach § 288 Abs. 5 BGB: 40,00 EUR]
Mahnkosten ([Anzahl] Mahnschreiben, Porto und Material): [Betrag] EUR
Gesamtbetrag: [Gesamtbetrag] EUR

Die Verzugszinsen laufen bis zum Zahlungseingang weiter; ab dem [Datum dieses Schreibens] kommen täglich [Betrag] EUR hinzu. Grundlage ist § 288 BGB: [Absatz 2, 9 Prozentpunkte über dem Basiszinssatz, da an dem Geschäft kein Verbraucher beteiligt ist / Absatz 1, 5 Prozentpunkte über dem Basiszinssatz].

Bitte überweisen Sie den Gesamtbetrag von [Gesamtbetrag] EUR bis spätestens

[Datum der letzten Frist, z. B. 7 bis 10 Tage nach Datum dieses Schreibens] (Eingang auf unserem Konto)

auf folgendes Konto:

Kontoinhaber: [Firma / Name]
IBAN: [IBAN]
BIC: [BIC]
Verwendungszweck: [Rechnungsnummer]

Geht die Zahlung nicht fristgerecht ein, werden wir ohne weitere Ankündigung
1. beim zuständigen Mahngericht den Erlass eines gerichtlichen Mahnbescheids beantragen (§§ 688 ff. ZPO) [oder: ein Inkassounternehmen / einen Rechtsanwalt mit der Beitreibung beauftragen],
2. die dadurch entstehenden Gerichts-, Anwalts- und Inkassokosten als Verzugsschaden zusätzlich von Ihnen verlangen (§§ 280, 286 BGB),
3. nach Erlass eines Vollstreckungsbescheids die Zwangsvollstreckung in Ihr Vermögen einleiten.

Sollten Sie die Forderung ganz oder teilweise bestreiten, teilen Sie uns die Gründe bitte innerhalb der genannten Frist schriftlich mit. Wenn Sie den Betrag nicht auf einmal zahlen können, sprechen Sie uns vor Fristablauf an; eine Ratenzahlung ist nach Vereinbarung möglich. Nach Fristablauf werden wir Gespräche über eine Stundung nur noch gegen Anerkenntnis der Gesamtforderung führen.

Sollten Sie zwischenzeitlich gezahlt haben, bitten wir um einen Zahlungsnachweis per E-Mail an [E-Mail].

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[Funktion, Firma]

Anlagen: Kopie der Rechnung Nr. [Rechnungsnummer], Kopie der Zahlungserinnerung vom [Datum]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "vergleichsvereinbarung-forderung",
    titel: "Vergleichsvereinbarung über eine streitige Forderung",
    kurz: "Außergerichtlicher Vergleich nach § 779 BGB: Vergleichsbetrag, Zahlung, Erledigung aller Ansprüche, Widerrufsvorbehalt und Kosten.",
    kategorie: "finanzen",
    dateiname: "Vergleichsvereinbarung-Forderung",
    wofuer: [
      "Ein Kunde bestreitet Teile deiner Rechnung und du willst einen schnellen Abschluss statt eines Prozesses",
      "Du selbst bestreitest eine Forderung (z. B. eines Lieferanten) und einigst dich auf einen Teilbetrag",
      "Nach Mängelrügen, Projektabbruch oder Streit über Stundenzahlen soll ein Schlussstrich gezogen werden",
      "Beendigung eines laufenden Mahn- oder Klageverfahrens durch Einigung",
    ],
    enthaelt: [
      "Vorbemerkung: Streitgegenstand und Positionen beider Seiten",
      "§ 1 Vergleichsbetrag",
      "§ 2 Zahlung und Verfallklausel",
      "§ 3 Erledigung aller Ansprüche (Abgeltungsklausel)",
      "§ 4 Umsatzsteuer und Rechnungskorrektur",
      "§ 5 Widerrufsvorbehalt (optional)",
      "§ 6 Kosten und laufende Verfahren",
      "§ 7 Vertraulichkeit und Schlussbestimmungen",
    ],
    hinweise: [
      "Ein Vergleich ist unwirksam, wenn beide Seiten von einem Sachverhalt ausgegangen sind, der tatsächlich nicht stimmt, und der Streit bei richtiger Kenntnis gar nicht entstanden wäre (§ 779 Abs. 1 BGB). Beschreibe den Streit deshalb in der Vorbemerkung ehrlich und vollständig.",
      "Die Abgeltungsklausel ist der Kern: Mit ihr sind alle Ansprüche aus dem Vertrag erledigt, auch die, an die du gerade nicht denkst. Nimm Ansprüche, die bestehen bleiben sollen (z. B. Gewährleistung für die Zukunft, Vertraulichkeit, Nutzungsrechte), ausdrücklich aus.",
      "Zahlt der Schuldner den Vergleichsbetrag nicht, lebt ohne Verfallklausel nur der Vergleichsbetrag als Forderung auf, nicht die ursprüngliche, höhere Forderung. Die Vorlage regelt deshalb, dass bei Verzug der volle Betrag wieder gilt.",
      "Reduzierst du als Gläubiger den Rechnungsbetrag, mindert sich das Entgelt und du musst die Umsatzsteuer berichtigen (§ 17 UStG); der Schuldner korrigiert seinen Vorsteuerabzug entsprechend. Stelle eine Korrekturrechnung aus.",
    ],
    faqs: [
      {
        q: "Ist ein außergerichtlicher Vergleich ein Schuldanerkenntnis?",
        a: "Nein. Beide Seiten geben nach, ohne die Rechtslage zuzugeben. Die Vorlage stellt klar, dass der Vergleich kein Anerkenntnis einer Rechtspflicht ist. Das ist für beide Seiten wichtig, etwa gegenüber Versicherungen oder in Parallelverfahren.",
      },
      {
        q: "Wozu dient der Widerrufsvorbehalt?",
        a: "Er gibt einer oder beiden Seiten eine kurze Frist, den Vergleich noch zu widerrufen, etwa um einen Anwalt, Steuerberater oder Mitgesellschafter zu fragen. Läuft die Frist ohne Widerruf ab, ist der Vergleich endgültig. Wer sofort Sicherheit will, streicht die Klausel.",
      },
      {
        q: "Kann ich aus dem Vergleich vollstrecken?",
        a: "Aus einem privatschriftlichen Vergleich nicht. Vollstreckbar ist nur ein gerichtlicher Vergleich, ein Anwaltsvergleich nach § 796a ZPO oder ein notariell beurkundeter Vergleich mit Unterwerfungsklausel. Bei größeren Beträgen und wackeligem Schuldner lohnt sich der Weg über Anwalt oder Notar.",
      },
      {
        q: "Was passiert mit einem laufenden Mahnverfahren?",
        a: "Die Vorlage regelt, dass der Gläubiger den Antrag zurücknimmt oder das Verfahren nicht weiterbetreibt, sobald der Vergleichsbetrag gezahlt ist. Bis dahin bleibt das Verfahren als Druckmittel bestehen. Die bis dahin entstandenen Kosten werden im Vergleich verteilt.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du eine Vergleichsvereinbarung brauchst",
        text: `Ein Vergleich ist die Einigung, bei der beide Seiten nachgeben, um einen Streit zu beenden. Für Gründer ist das oft der wirtschaftlich beste Ausgang: Ein Kunde bestreitet die Hälfte der Rechnung wegen angeblicher Mängel, und ein Prozess würde länger dauern als das Projekt selbst. Ein Lieferant fordert Mehrkosten, die du nicht beauftragt hast, und ihr einigt euch auf einen Teilbetrag. Ein Projekt wurde abgebrochen, und beide Seiten wollen einen Schlussstrich.

Oder ein Mahnverfahren läuft bereits, und der Schuldner bietet einen Betrag an, den du akzeptieren kannst. Die Vorlage regelt den Vergleichsbetrag, die Zahlung, die Erledigung aller Ansprüche, die Umsatzsteuerkorrektur, einen optionalen Widerrufsvorbehalt und das Schicksal laufender Verfahren.`,
      },
      {
        titel: "Was muss in einen außergerichtlichen Vergleich?",
        text: `Der Vergleich steht und fällt mit der Beschreibung des Streits und der Reichweite der Erledigung. Die Vorlage enthält:

- Vorbemerkung mit Forderung, Rechtsgrund, Einwänden des Schuldners, Gegenansprüchen und laufendem Verfahren
- Die Formel „ohne Anerkennung einer Rechtspflicht, im Wege gegenseitigen Nachgebens“, die den Vergleich von einem Anerkenntnis abgrenzt
- Vergleichsbetrag in Zahlen und Worten mit Angabe, ob Umsatzsteuer enthalten ist (§ 1)
- Zahlungstermin oder Ratenplan und eine Verfallklausel, bei der die ursprüngliche Forderung wieder auflebt (§ 2)
- Abgeltungsklausel für alle bekannten und unbekannten Ansprüche aus dem Vorgang mit ausdrücklichen Ausnahmen (§ 3)
- Klarstellung, dass kein Anerkenntnis vorliegt (§ 3 Abs. 4)
- Rechnungskorrektur nach § 17 UStG bei Minderung des Entgelts (§ 4)
- Optionaler Widerrufsvorbehalt mit Frist (§ 5)
- Kostenverteilung und Rücknahme von Mahnbescheid oder Klage (§ 6)
- Vertraulichkeit, Schriftform, Gerichtsstand (§ 7)

Besonders wichtig ist die Verfallklausel: Ohne sie bleibt nach Nichtzahlung nur der reduzierte Betrag als Forderung übrig.`,
      },
      {
        titel: "Vergleich Muster ausfüllen: Vorbemerkung, Betrag, Abgeltung",
        text: `Beschreibe in der Vorbemerkung ehrlich und vollständig, worum gestritten wird: Forderung, Rechnungsnummer, die Einwände der Gegenseite und etwaige Gegenansprüche. Diese Beschreibung ist später die Grundlage dafür, was der Vergleich erledigt. In § 1 trägst du den Vergleichsbetrag ein und entscheidest, ob er die Umsatzsteuer enthält oder nicht; bei Rechnungen ist „einschließlich“ üblich. In § 2 wählst du Einmalzahlung oder Raten und trägst in Abs. 2 die ursprüngliche Forderung ein, die bei Verzug wieder auflebt.

In § 3 Abs. 2 listest du, was nicht erledigt sein soll, etwa künftige Gewährleistung oder Nutzungsrechte, die erst mit Zahlung übergehen; sonst schreib „keine“. In § 5 wählst du Variante A mit Widerrufsfrist, wenn eine Seite noch Anwalt oder Mitgesellschafter fragen will, sonst Variante B. In § 6 regelst du, wer die bisherigen Kosten trägt und wann ein laufender Mahnbescheid zurückgenommen wird. Beide unterschreiben; als Gläubiger stellst du anschließend die korrigierte Rechnung aus.`,
      },
      {
        titel: "Typische Fehler beim Vergleich über eine Forderung",
        text: `Der erste Fehler ist eine pauschale Abgeltungsklausel ohne Ausnahmen. Damit sind auch Ansprüche erledigt, an die du gerade nicht denkst: Vertraulichkeit, Rückgabe von Unterlagen, Gewährleistung für Mängel, die erst nächsten Monat auftauchen. Nimm ausdrücklich aus, was bleiben soll. Der zweite Fehler ist die fehlende Verfallklausel: Zahlt der Schuldner nicht, hast du den Rabatt verschenkt und nur noch den Vergleichsbetrag als Forderung.

Der dritte Fehler ist eine falsche Vorbemerkung. Beruht der Vergleich auf einem Sachverhalt, den beide Seiten für sicher hielten und der nicht stimmt, ist er unwirksam (§ 779 Abs. 1 BGB). Der vierte Fehler ist die vergessene Umsatzsteuer: Wer den Rechnungsbetrag reduziert, muss die Umsatzsteuer berichtigen und eine Korrekturrechnung stellen, sonst schuldet er dem Finanzamt die zu hoch ausgewiesene Steuer. Der fünfte Fehler ist die Annahme, aus dem Vergleich vollstrecken zu können.`,
      },
      {
        titel: "Rechtsgrundlagen: § 779 BGB, Vollstreckbarkeit und § 17 UStG",
        text: `Der Vergleich ist in § 779 BGB geregelt: ein Vertrag, durch den der Streit oder die Ungewissheit über ein Rechtsverhältnis im Wege gegenseitigen Nachgebens beseitigt wird. Er ist unwirksam, wenn der nach dem Vertrag als feststehend zugrunde gelegte Sachverhalt nicht der Wirklichkeit entspricht und der Streit bei Kenntnis der Sachlage nicht entstanden wäre. Ein privatschriftlicher Vergleich ist kein Vollstreckungstitel; vollstreckbar sind der gerichtliche Vergleich, der Anwaltsvergleich nach § 796a ZPO und der notarielle Vergleich mit Unterwerfungsklausel (§ 794 Abs. 1 Nr. 5 ZPO).

Verzug mit dem Vergleichsbetrag richtet sich nach §§ 286, 288 BGB. Umsatzsteuerlich mindert ein reduzierter Rechnungsbetrag das Entgelt; der Leistende berichtigt die Umsatzsteuer und der Empfänger die Vorsteuer (§ 17 UStG). Ein außergerichtlicher Vergleich hemmt die Verjährung nicht; solange verhandelt wird, ist die Verjährung aber nach § 203 BGB gehemmt.`,
      },
      {
        titel: "Wann die Vergleichsvorlage nicht reicht",
        text: `Die Vorlage reicht für Streitigkeiten über Rechnungen, Projektabbrüche und Mängelrügen zwischen Unternehmen und mit Kunden, bei denen beide Seiten zahlungsfähig und einigungsbereit sind. Sie reicht nicht, wenn du einen vollstreckbaren Titel brauchst; dann schließt du den Vergleich über Anwälte nach § 796a ZPO, beim Notar oder vor Gericht.

Sie reicht auch nicht bei Streit mit Verbrauchern über Widerruf oder Gewährleistung, bei Ansprüchen aus Arbeitsverhältnissen oder bei Beträgen, deren Verlust das Unternehmen gefährdet. Wie Vergleichsbetrag, Forderungsausfall und Steuerkorrektur gebucht werden, klärst du mit dem Steuerberater. GründerX stellt die Vorlage als Werkzeug bereit und ersetzt keine Rechts- oder Steuerberatung.`,
      },
    ],
    seo: {
      title: "Vergleichsvereinbarung Vorlage kostenlos (Word) | GründerX",
      description:
        "Außergerichtlicher Vergleich über eine streitige Forderung als Vorlage nach § 779 BGB: Vergleichsbetrag, Abgeltungsklausel, Widerrufsvorbehalt, Kosten.",
    },
    stand: "2026-10",
    text: `Vergleichsvereinbarung über eine streitige Forderung

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Gläubiger“ –

und

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Schuldner“ –

Vorbemerkung
(1) Der Gläubiger macht gegen den Schuldner eine Forderung in Höhe von [Betrag] EUR aus [Rechtsgrund, z. B. „Rechnung Nr. [Nummer] vom [Datum] über [Leistung]“ / „Vertrag vom [Datum]“] geltend.
(2) Der Schuldner bestreitet die Forderung [ganz / in Höhe von [Betrag] EUR] und beruft sich auf [z. B. „Mängel der Leistung“, „nicht beauftragte Mehrleistungen“, „überhöhte Stundenzahl“, „fehlende Abnahme“]. [Optional: Der Schuldner macht seinerseits Gegenansprüche in Höhe von [Betrag] EUR wegen [Grund] geltend.]
(3) [Optional: Der Gläubiger hat beim Amtsgericht [Ort] unter dem Aktenzeichen [Az.] einen Mahnbescheid beantragt / Klage erhoben.]
(4) Zur Vermeidung eines Rechtsstreits und ohne Anerkennung einer Rechtspflicht, jedoch im Wege gegenseitigen Nachgebens, schließen die Parteien folgenden Vergleich (§ 779 BGB):

§ 1 Vergleichsbetrag
Der Schuldner zahlt an den Gläubiger zur Abgeltung der in der Vorbemerkung bezeichneten Forderung einen Betrag von [Vergleichsbetrag] EUR (in Worten: [Betrag in Worten] Euro) [zuzüglich / einschließlich] Umsatzsteuer.

§ 2 Zahlung und Verfallklausel
(1) Der Vergleichsbetrag ist [bis zum [Datum] in einer Summe / in [Anzahl] Raten von je [Betrag] EUR, erstmals am [Datum], jeweils zum [Tag] eines Monats] auf das Konto des Gläubigers, IBAN [IBAN] bei der [Bank], Verwendungszweck „Vergleich [Rechnungsnummer]“, zu zahlen.
(2) Gerät der Schuldner mit der Zahlung [oder mit einer Rate] ganz oder teilweise länger als [z. B. 10] Tage in Rückstand, entfällt die Reduzierung nach § 1. Der Gläubiger kann dann die ursprüngliche Forderung in Höhe von [ursprünglicher Betrag] EUR nebst Verzugszinsen seit dem [Datum] abzüglich bereits geleisteter Zahlungen verlangen; die Erledigungswirkung nach § 3 entfällt.
(3) Verzugszinsen auf den Vergleichsbetrag richten sich nach § 288 BGB.

§ 3 Erledigung aller Ansprüche
(1) Mit vollständiger Zahlung des Vergleichsbetrags sind sämtliche gegenseitigen Ansprüche der Parteien aus [dem Vertrag vom [Datum] / der Geschäftsbeziehung bis zum [Datum] / dem in der Vorbemerkung bezeichneten Vorgang], gleich ob bekannt oder unbekannt, gleich aus welchem Rechtsgrund, abgegolten und erledigt. Das gilt auch für die in der Vorbemerkung genannten Gegenansprüche des Schuldners.
(2) Von der Erledigung ausgenommen sind: [z. B. „Gewährleistungsansprüche für Mängel, die erst nach Abschluss dieses Vergleichs auftreten“ / „die Verpflichtung zur Vertraulichkeit aus § [Nummer] des Vertrags“ / „Nutzungsrechte an den gelieferten Arbeitsergebnissen, die mit Zahlung des Vergleichsbetrags auf den Schuldner übergehen“ / „keine“].
(3) Die Parteien verzichten wechselseitig auf die Geltendmachung weitergehender Ansprüche aus dem in Absatz 1 bezeichneten Vorgang und nehmen den Verzicht jeweils an.
(4) Dieser Vergleich enthält kein Anerkenntnis einer Rechtspflicht. Keine Partei wird den Inhalt des Vergleichs gegenüber Dritten als Eingeständnis einer Pflichtverletzung darstellen.

§ 4 Umsatzsteuer und Rechnungskorrektur
Soweit sich durch diesen Vergleich das Entgelt für eine umsatzsteuerpflichtige Leistung mindert, stellt der Gläubiger dem Schuldner innerhalb von [z. B. 14] Tagen nach Abschluss dieses Vergleichs eine berichtigte Rechnung über den Vergleichsbetrag aus (§ 17 UStG). Der Schuldner berichtigt seinen Vorsteuerabzug entsprechend.

§ 5 Widerrufsvorbehalt
[Variante A: Jede Partei kann diesen Vergleich bis zum [Datum, z. B. 7 Tage nach Unterzeichnung] durch schriftliche Erklärung gegenüber der anderen Partei widerrufen. Maßgeblich ist der Zugang der Erklärung. Wird der Vergleich nicht fristgerecht widerrufen, ist er endgültig wirksam.]
[Variante B: Ein Widerrufsvorbehalt besteht nicht. Der Vergleich ist mit Unterzeichnung durch beide Parteien wirksam.]

§ 6 Kosten und laufende Verfahren
(1) Jede Partei trägt die ihr bisher entstandenen Kosten der Rechtsverfolgung und Rechtsverteidigung, insbesondere eigene Anwaltskosten, selbst. [Alternative: Der Schuldner erstattet dem Gläubiger die Kosten des Mahnverfahrens in Höhe von [Betrag] EUR zusammen mit dem Vergleichsbetrag.]
(2) [Optional: Der Gläubiger nimmt den Antrag auf Erlass eines Mahnbescheids / die Klage [Aktenzeichen] innerhalb von [z. B. 7] Tagen nach vollständigem Eingang des Vergleichsbetrags zurück. Die Gerichtskosten tragen die Parteien [je zur Hälfte / der Schuldner].]
(3) Die Kosten dieser Vereinbarung tragen die Parteien je zur Hälfte.

§ 7 Vertraulichkeit und Schlussbestimmungen
(1) Die Parteien behandeln Inhalt und Zustandekommen dieses Vergleichs vertraulich, soweit nicht gesetzliche Pflichten oder die Durchsetzung dieses Vergleichs eine Offenlegung erfordern.
(2) Änderungen und Ergänzungen dieser Vereinbarung bedürfen der Schriftform. Mündliche Nebenabreden bestehen nicht.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam. Die Parteien ersetzen die unwirksame Bestimmung durch eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Firma / Vorname Nachname], Gläubiger


______________________________
[Firma / Vorname Nachname], Schuldner

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "rechnung-kleinunternehmer",
    titel: "Rechnung für Kleinunternehmer (mit Gutschrift)",
    kurz: "Rechnungsvorlage nach § 19 UStG mit allen Pflichtangaben, dem Hinweis auf die Steuerbefreiung und einer Gutschrift-Variante.",
    kategorie: "finanzen",
    dateiname: "Rechnung-Kleinunternehmer",
    wofuer: [
      "Du nutzt die Kleinunternehmerregelung und brauchst eine Rechnung ohne Umsatzsteuer, die das Finanzamt akzeptiert",
      "Nebenberufliche Selbstständige, Freelancer und Shop-Betreiber unter 25.000 EUR Vorjahresumsatz",
      "Wenn dein Kunde statt deiner Rechnung eine Gutschrift ausstellt (z. B. Plattformen, Agenturen)",
      "Als Textgrundlage für Rechnungsprogramme und Vorlagen in Word oder Excel",
    ],
    enthaelt: [
      "Rechnungskopf: Aussteller mit Steuernummer oder USt-IdNr., Empfänger, Rechnungsnummer, Datum",
      "Leistungsbeschreibung mit Menge, Art, Leistungszeitraum",
      "Betrag in einer Summe ohne Umsatzsteuer",
      "Pflichthinweis: Gemäß § 19 UStG wird keine Umsatzsteuer berechnet",
      "Zahlungsziel, Bankverbindung, Verzugshinweis",
      "Variante Gutschrift (Abrechnung durch den Leistungsempfänger)",
      "Hinweise zu E-Rechnung, Umsatzgrenzen und Aufbewahrung",
    ],
    hinweise: [
      "Seit 2025 gilt die Kleinunternehmerregelung bis 25.000 EUR Gesamtumsatz im Vorjahr und 100.000 EUR im laufenden Jahr (§ 19 Abs. 1 UStG). Überschreitest du im laufenden Jahr die 100.000 EUR, ist bereits der Umsatz, mit dem du die Grenze reißt, steuerpflichtig; ab dann musst du Umsatzsteuer ausweisen.",
      "Weist du trotz Kleinunternehmerregelung Umsatzsteuer aus, schuldest du sie dem Finanzamt (§ 14c UStG), ohne dass dein Kunde sie abziehen darf. Der Hinweis auf § 19 UStG gehört deshalb auf jede Rechnung; die Pflichtangaben für Kleinunternehmer regelt § 34a UStDV.",
      "E-Rechnung: Seit 1. Januar 2025 musst du E-Rechnungen (XRechnung, ZUGFeRD) von anderen Unternehmen empfangen können; eine E-Mail-Adresse reicht. Ausstellen darfst du als Kleinunternehmer weiterhin Papier- oder PDF-Rechnungen (§ 34a Satz 4 UStDV), auch nach Ende der allgemeinen Übergangsfristen.",
      "Rechnungen sind 8 Jahre aufzubewahren (§ 14b UStG), und zwar im Original beziehungsweise als unveränderte Datei. Vergib Rechnungsnummern fortlaufend und lückenlos; das Finanzamt prüft das bei Betriebsprüfungen zuerst.",
      "Der Verzicht auf die Kleinunternehmerregelung bindet dich fünf Jahre (§ 19 Abs. 3 UStG). Er lohnt sich nur, wenn du vor allem Geschäftskunden hast und hohe Vorsteuern aus Investitionen erwartest.",
    ],
    faqs: [
      {
        q: "Welche Pflichtangaben muss meine Rechnung als Kleinunternehmer enthalten?",
        a: "Nach § 34a UStDV mindestens: Name und Anschrift von dir und dem Kunden, deine Steuernummer oder USt-IdNr., das Ausstellungsdatum, Menge und Art der Leistung, das Entgelt in einer Summe und den Hinweis, dass die Steuerbefreiung nach § 19 UStG gilt. Rechnungsnummer und Leistungszeitraum sind nicht zwingend, aber dringend zu empfehlen, weil Kunden und Buchhaltung sie erwarten.",
      },
      {
        q: "Muss ich als Kleinunternehmer E-Rechnungen schreiben?",
        a: "Nein. Kleinunternehmer dürfen dauerhaft sonstige Rechnungen ausstellen, also Papier oder PDF (§ 34a Satz 4 UStDV). Du musst aber seit 2025 in der Lage sein, E-Rechnungen von anderen Unternehmen zu empfangen und unverändert zu archivieren. Wenn Geschäftskunden eine XRechnung verlangen, kannst du sie freiwillig mit einem kostenlosen Tool erzeugen.",
      },
      {
        q: "Was ist eine Gutschrift und wann brauche ich die Variante?",
        a: "Eine Gutschrift im umsatzsteuerlichen Sinn ist eine Rechnung, die der Kunde statt deiner ausstellt, etwa bei Plattformen, Affiliate-Programmen oder Agenturen. Sie muss vorher vereinbart sein, das Wort Gutschrift tragen und dieselben Pflichtangaben enthalten. Widersprichst du einer Gutschrift nicht, gilt sie als deine Rechnung.",
      },
      {
        q: "Was passiert, wenn ich die 25.000-EUR-Grenze überschreite?",
        a: "Liegt dein Gesamtumsatz im Jahr 2026 über 25.000 EUR, bist du ab 2027 Regelbesteuerer und musst Umsatzsteuer ausweisen und abführen. Das laufende Jahr bleibt bis 100.000 EUR steuerfrei. Prüfe deinen Umsatz im Herbst, damit du Preise und Rechnungsvorlage rechtzeitig umstellen kannst.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann du die Kleinunternehmer-Rechnung brauchst",
        text: `Wer die Kleinunternehmerregelung nutzt, schreibt Rechnungen ohne Umsatzsteuer. Das klingt einfach, hat aber eigene Regeln: Die Rechnung muss den Grund für den fehlenden Steuerausweis nennen, darf keine Steuer ausweisen und braucht trotzdem die Pflichtangaben, damit dein Kunde sie als Betriebsausgabe buchen kann. Die Vorlage brauchst du als nebenberuflicher Freelancer, als Shop-Betreiber unter 25.000 EUR Vorjahresumsatz, als Gründer im ersten Jahr, der sich für die Kleinunternehmerregelung entschieden hat, und als Dienstleister für Plattformen oder Agenturen, die statt deiner Rechnung eine Gutschrift ausstellen.

Sie enthält eine vollständige Rechnung mit Positionen, Zahlungsziel und Verzugshinweis sowie eine Gutschrift-Variante und Hinweise zu E-Rechnung, Umsatzgrenzen und Aufbewahrung.`,
      },
      {
        titel: "Pflichtangaben: Was muss auf eine Rechnung nach § 19 UStG?",
        text: `Für Kleinunternehmer gelten seit 2025 reduzierte Pflichtangaben nach § 34a UStDV. Die Vorlage enthält sie alle und ergänzt die Angaben, die Kunden und Buchhaltung erwarten:

- Vollständiger Name und Anschrift von dir und deinem Kunden
- Deine Steuernummer oder Umsatzsteuer-Identifikationsnummer
- Ausstellungsdatum der Rechnung
- Menge und Art der Lieferung oder Umfang und Art der Leistung
- Entgelt in einer Summe, ohne Aufteilung in Netto und Steuer
- Den Hinweis, dass nach § 19 UStG keine Umsatzsteuer berechnet wird
- Fortlaufende Rechnungsnummer und Leistungszeitraum, die gesetzlich nicht vorgeschrieben, aber dringend zu empfehlen sind
- Zahlungsziel, Bankverbindung und optional den Verzugshinweis nach § 286 BGB
- Bei Gutschriften das Wort „Gutschrift“ und den Hinweis auf die Vereinbarung zum Gutschriftsverfahren

Was nicht auf die Rechnung gehört: ein Steuersatz, ein Steuerbetrag oder die Formulierung „inkl. MwSt.“. Jede dieser Angaben kann als Steuerausweis gelten und dich zur Zahlung der Steuer verpflichten.`,
      },
      {
        titel: "Rechnungsvorlage ausfüllen: Schritt für Schritt",
        text: `Trage im Kopf deine Daten mit Steuernummer ein; die USt-IdNr. brauchst du nur, wenn du eine hast, etwa für Geschäfte mit EU-Kunden. Beim Empfänger nennst du Firma, Ansprechpartner und Anschrift. Vergib die Rechnungsnummer fortlaufend und lückenlos, zum Beispiel nach dem Schema Jahr-Zähler. Setze Rechnungsdatum und Leistungszeitraum ein; bei Dauerleistungen den Monat, bei Einzelaufträgen den Tag der Fertigstellung. Fülle die Positionen mit Bezeichnung, Menge, Einzelpreis und Gesamtbetrag; nicht genutzte Zeilen löschst du.

Rechne den Rechnungsbetrag zusammen und lass den Satz zur Steuerbefreiung nach § 19 UStG unverändert stehen. Trage Zahlungsziel und Bankverbindung ein. Den optionalen Verzugshinweis übernimmst du, wenn du ohne Mahnung Verzugszinsen berechnen können willst; der Satz zu Verbrauchern ist Voraussetzung für die 30-Tage-Regel. Für Plattformen oder Agenturen nutzt du die Gutschrift-Variante, in der der Kunde als Aussteller steht und deine Daten als leistender Unternehmer.`,
      },
      {
        titel: "Typische Fehler bei Kleinunternehmer-Rechnungen",
        text: `Der teuerste Fehler ist der versehentliche Steuerausweis. Steht auf der Rechnung „19 % MwSt.“ oder ein Steuerbetrag, schuldest du diese Steuer dem Finanzamt (§ 14c UStG), obwohl dein Kunde sie nicht als Vorsteuer abziehen darf. Prüfe deshalb Rechnungsprogramme und Shop-Systeme, die standardmäßig Steuer ausweisen. Der zweite Fehler ist der fehlende Hinweis auf § 19 UStG; ohne ihn fehlt eine Pflichtangabe, und Geschäftskunden reklamieren die Rechnung. Der dritte Fehler sind Lücken in der Rechnungsnummer; die Betriebsprüfung sucht zuerst danach.

Der vierte Fehler ist, die Umsatzgrenze aus den Augen zu verlieren: Über 25.000 EUR Vorjahresumsatz bist du im Folgejahr Regelbesteuerer, über 100.000 EUR im laufenden Jahr sofort ab dem Umsatz, der die Grenze überschreitet. Der fünfte Fehler ist das Postfach, das keine E-Rechnungen empfangen kann; seit 2025 musst du XRechnung und ZUGFeRD von anderen Unternehmen annehmen und unverändert archivieren.`,
      },
      {
        titel: "Rechtsgrundlagen: § 19 UStG, § 34a UStDV, § 14c UStG, E-Rechnung",
        text: `Die Kleinunternehmerregelung steht in § 19 UStG: Umsätze sind steuerfrei, wenn der Gesamtumsatz im Vorjahr 25.000 EUR und im laufenden Jahr 100.000 EUR nicht überschreitet. Der Verzicht auf die Regelung bindet fünf Kalenderjahre (§ 19 Abs. 3 UStG). Die Pflichtangaben der Rechnung regelt für Kleinunternehmer § 34a UStDV; Kleinunternehmer dürfen weiterhin Papier- und PDF-Rechnungen ausstellen (§ 34a Satz 4 UStDV), müssen aber E-Rechnungen anderer Unternehmer empfangen können.

Ein unberechtigter Steuerausweis führt zur Steuerschuld nach § 14c UStG. Die Gutschrift als Rechnung des Leistungsempfängers setzt eine vorherige Vereinbarung voraus (§ 14 Abs. 2 UStG). Rechnungen sind acht Jahre aufzubewahren (§ 14b UStG). Für Umsätze an Kunden in anderen EU-Staaten gibt es seit 2025 die EU-Kleinunternehmerregelung (§ 19a UStG) mit Registrierung beim Bundeszentralamt für Steuern. Einkommensteuer und Gewerbesteuer bleiben von der Kleinunternehmerregelung unberührt.`,
      },
      {
        titel: "Wann die Rechnungsvorlage nicht reicht",
        text: `Die Vorlage reicht für Rechnungen und Gutschriften eines Kleinunternehmers an Kunden in Deutschland. Sie reicht nicht, wenn du die Regelung verlassen hast oder die Grenzen überschreitest; dann brauchst du eine Rechnung mit Steuersatz, Steuerbetrag und allen Angaben des § 14 Abs. 4 UStG. Sie reicht auch nicht für Leistungen an Unternehmen im EU-Ausland mit Reverse-Charge-Hinweis, für Rechnungen an Behörden, die eine XRechnung verlangen, und für Dauerrechnungen mit Mietcharakter.

Ob die Kleinunternehmerregelung für dich überhaupt sinnvoll ist, hängt von Kundenstruktur und Vorsteuern ab; das rechnest du mit dem Steuerberater durch. GründerX stellt die Vorlage als Werkzeug bereit, nicht als Steuerberatung.`,
      },
    ],
    seo: {
      title: "Rechnung Kleinunternehmer Vorlage kostenlos | GründerX",
      description:
        "Rechnungsvorlage für Kleinunternehmer nach § 19 UStG mit Pflichtangaben, Steuerbefreiungshinweis und Gutschrift. Mit E-Rechnung-Hinweis und Grenzen seit 2025.",
    },
    stand: "2026-10",
    text: `Rechnung (Kleinunternehmer nach § 19 UStG)

[Firma / Vorname Nachname]
[Straße, PLZ Ort]
[Telefon, E-Mail, Website]
Steuernummer: [Steuernummer] [oder USt-IdNr.: [USt-IdNr.]]

Rechnungsempfänger:
[Firma / Vorname Nachname]
[Ansprechpartner]
[Straße, PLZ Ort]
[Kundennummer: [Kundennummer]]

Rechnungsnummer: [fortlaufende Nummer, z. B. 2026-0042]
Rechnungsdatum: [Datum]
Leistungsdatum / Leistungszeitraum: [Datum oder Zeitraum, z. B. 01.10.2026 bis 15.10.2026]
[Auftrags- / Angebotsnummer: [Nummer]]

Rechnung Nr. [Rechnungsnummer]

Sehr geehrte Damen und Herren,

für die nachfolgend aufgeführten Leistungen stelle ich Ihnen vereinbarungsgemäß in Rechnung:

Pos. 1: [Bezeichnung der Leistung oder Lieferung, z. B. „Erstellung von 4 Social-Media-Grafiken“], Menge: [Zahl] [Stück / Stunden / Pauschale], Einzelpreis: [Betrag] EUR, Gesamt: [Betrag] EUR
Pos. 2: [Bezeichnung], Menge: [Zahl], Einzelpreis: [Betrag] EUR, Gesamt: [Betrag] EUR
Pos. 3: [Bezeichnung], Menge: [Zahl], Einzelpreis: [Betrag] EUR, Gesamt: [Betrag] EUR

Rechnungsbetrag: [Gesamtbetrag] EUR

Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.

Bitte überweisen Sie den Rechnungsbetrag von [Gesamtbetrag] EUR bis zum [Zahlungsziel, z. B. 14 Tage nach Rechnungsdatum] ohne Abzug auf das folgende Konto:

Kontoinhaber: [Name]
IBAN: [IBAN]
BIC: [BIC]
Bank: [Bank]
Verwendungszweck: [Rechnungsnummer]

[Optional: Bei Zahlung nach dem [Datum] geraten Sie ohne weitere Mahnung in Verzug (§ 286 Abs. 2 Nr. 1 BGB). Verbraucher geraten spätestens 30 Tage nach Zugang dieser Rechnung in Verzug (§ 286 Abs. 3 BGB).]

Vielen Dank für Ihren Auftrag.

Mit freundlichen Grüßen

[Vorname Nachname]


Variante: Gutschrift (Abrechnung durch den Leistungsempfänger)

Gutschrift

Aussteller der Gutschrift (Leistungsempfänger):
[Firma], [Straße, PLZ Ort], Steuernummer / USt-IdNr.: [Nummer]

Leistender Unternehmer (Gutschriftsempfänger):
[Vorname Nachname / Firma], [Straße, PLZ Ort], Steuernummer / USt-IdNr.: [Nummer]

Gutschriftsnummer: [Nummer]
Datum: [Datum]
Leistungszeitraum: [Zeitraum]

Abgerechnete Leistungen:
Pos. 1: [Bezeichnung], Menge: [Zahl], Einzelpreis: [Betrag] EUR, Gesamt: [Betrag] EUR
Pos. 2: [Bezeichnung], Menge: [Zahl], Einzelpreis: [Betrag] EUR, Gesamt: [Betrag] EUR

Gutschriftsbetrag: [Gesamtbetrag] EUR

Der leistende Unternehmer ist Kleinunternehmer; gemäß § 19 UStG wird keine Umsatzsteuer berechnet. Diese Gutschrift wird aufgrund der Vereinbarung vom [Datum] über die Abrechnung im Gutschriftsverfahren erteilt (§ 14 Abs. 2 Satz 5 UStG). Sie gilt als Rechnung des leistenden Unternehmers, sofern dieser ihr nicht innerhalb von [z. B. 14] Tagen widerspricht.

Der Gutschriftsbetrag wird bis zum [Datum] auf das Konto IBAN [IBAN] überwiesen.


Hinweise zur Verwendung
1. Pflichtangaben für Kleinunternehmer-Rechnungen (§ 34a UStDV): Name und Anschrift des leistenden Unternehmers und des Leistungsempfängers, Steuernummer oder USt-IdNr. des leistenden Unternehmers, Ausstellungsdatum, Menge und Art der Lieferung oder Umfang und Art der sonstigen Leistung, Entgelt in einer Summe mit Hinweis auf die Steuerbefreiung nach § 19 UStG, bei Gutschriften die Angabe „Gutschrift“. Rechnungsnummer und Leistungszeitraum sind nicht vorgeschrieben, aber dringend empfohlen.
2. Umsatzgrenzen seit 2025: Gesamtumsatz im Vorjahr höchstens 25.000 EUR und im laufenden Jahr höchstens 100.000 EUR (§ 19 Abs. 1 UStG). Bei Überschreiten der 100.000 EUR im laufenden Jahr ist der überschreitende Umsatz bereits steuerpflichtig.
3. E-Rechnung: Kleinunternehmer dürfen Rechnungen weiterhin als Papier oder PDF ausstellen (§ 34a Satz 4 UStDV), müssen aber seit 1. Januar 2025 E-Rechnungen anderer Unternehmer empfangen und unverändert aufbewahren können.
4. Aufbewahrung: Rechnungen und Gutschriften 8 Jahre aufbewahren (§ 14b UStG). Kein Ausweis von Umsatzsteuer, sonst wird sie geschuldet (§ 14c UStG).

${VORLAGEN_HINWEIS}`,
  },
];
