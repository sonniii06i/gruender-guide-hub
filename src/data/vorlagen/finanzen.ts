import { type Vorlage } from "./types";

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
      title: "Darlehensvertrag privat Vorlage kostenlos (Word) | GründerX",
      description:
        "Privatdarlehen-Vertrag als kostenlose Vorlage: Betrag, Zinsen oder zinslos, Tilgung, Kündigung nach § 488 BGB, Sicherheiten, Verzug. Mit Steuerhinweis.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/darlehensvertrag-privat"),
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
      title: "Darlehensvertrag Unternehmen Vorlage kostenlos | GründerX",
      description:
        "Darlehensvertrag zwischen Unternehmen als kostenlose Vorlage: Tilgungsplan, Zins, Sicherungsübereignung, Abtretung, Kündigungsgründe, KWG-Hinweis.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/darlehensvertrag-unternehmen"),
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
      title: "Ratenzahlungsvereinbarung Vorlage kostenlos | GründerX",
      description:
        "Ratenzahlungsvereinbarung als kostenlose Vorlage: Anerkenntnis der Forderung, Ratenplan, Zinsen, Verfallklausel bei Verzug, Kosten. Word und PDF.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/ratenzahlungsvereinbarung"),
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
      title: "Schuldanerkenntnis Vorlage kostenlos (Word) | GründerX",
      description:
        "Schuldanerkenntnis als kostenlose Vorlage nach § 781 BGB: abstrakt oder deklaratorisch, Fälligkeit, Verzicht auf Einwendungen, Beweiswirkung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/schuldanerkenntnis"),
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
      title: "Abtretungserklärung Vorlage kostenlos (Word) | GründerX",
      description:
        "Forderungsabtretung als kostenlose Vorlage nach § 398 BGB: Zedent, Zessionar, Gegenleistung, Gewähr für Bestand, Muster-Anzeige an den Schuldner.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/abtretungserklaerung-forderung"),
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
      title: "Quittung Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Quittung als kostenlose Vorlage nach § 368 BGB: Zahlungseingang, Teilzahlung oder Übergabe einer Sache. Mit Hinweisen zu Kassenbuch und Bargeldgrenze.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/quittung"),
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
      title: "Bürgschaftserklärung Vorlage kostenlos (Word) | GründerX",
      description:
        "Selbstschuldnerische Bürgschaft als kostenlose Vorlage: Höchstbetrag, Verzicht auf Einrede der Vorausklage, Schriftform nach § 766 BGB, Risikohinweis.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/buergschaft"),
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
      title: "Zahlungserinnerung Vorlage kostenlos (Word) | GründerX",
      description:
        "Zahlungserinnerung als kostenlose Vorlage: erstes Schreiben nach Fälligkeit mit Rechnungsdaten, neuer Frist, Bankverbindung und Verzugshinweis § 286 BGB.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/zahlungserinnerung"),
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
      title: "Letzte Mahnung Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Letzte Mahnung vor Mahnbescheid als kostenlose Vorlage: Verzugszinsen 9 bzw. 5 Punkte über Basiszins, 40-EUR-Pauschale, letzte Frist, Inkasso-Ankündigung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/letzte-mahnung"),
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
      title: "Vergleichsvereinbarung Vorlage kostenlos (Word) | GründerX",
      description:
        "Außergerichtlicher Vergleich über eine streitige Forderung als Vorlage nach § 779 BGB: Vergleichsbetrag, Abgeltungsklausel, Widerrufsvorbehalt, Kosten.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/vergleichsvereinbarung-forderung"),
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
      title: "Rechnung Kleinunternehmer Vorlage kostenlos | GründerX",
      description:
        "Rechnungsvorlage für Kleinunternehmer nach § 19 UStG mit Pflichtangaben, Steuerbefreiungshinweis und Gutschrift. Mit E-Rechnung-Hinweis und Grenzen seit 2025.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/rechnung-kleinunternehmer"),
  },
];
