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
    seo: {
      title: "Darlehensvertrag privat: Vorlage kostenlos (Word, PDF) | GründerX",
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
    seo: {
      title: "Darlehensvertrag Unternehmen (B2B): Vorlage kostenlos | GründerX",
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
    seo: {
      title: "Ratenzahlungsvereinbarung Vorlage kostenlos (Word/PDF) | GründerX",
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
    seo: {
      title: "Schuldanerkenntnis Vorlage § 781 BGB kostenlos | GründerX",
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
    seo: {
      title: "Abtretungserklärung Forderung: Vorlage § 398 BGB | GründerX",
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
    seo: {
      title: "Quittung Vorlage kostenlos: Barzahlung & Übergabe | GründerX",
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
    seo: {
      title: "Bürgschaft Vorlage selbstschuldnerisch § 765 BGB | GründerX",
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
    seo: {
      title: "Zahlungserinnerung Vorlage: freundlich & rechtssicher | GründerX",
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
    seo: {
      title: "Letzte Mahnung Vorlage mit Verzugszinsen & Pauschale | GründerX",
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
    seo: {
      title: "Vergleichsvereinbarung Forderung: Vorlage kostenlos | GründerX",
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
    seo: {
      title: "Rechnung Kleinunternehmer Vorlage § 19 UStG kostenlos | GründerX",
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
