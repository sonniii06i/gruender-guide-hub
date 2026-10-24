import { type Vorlage } from "./types";

// Arbeit & Personal: Arbeitsverträge, Minijob, Werkstudent, Praktikum,
// Kündigung, Aufhebung, Abmahnung, Zeugnis, Homeoffice, Geheimhaltung, Bonus.
// Rechtsstand: NachwG (Fassung seit 01.08.2022, Textform seit 01.01.2025),
// TzBfG, KSchG, BUrlG, EFZG, MiLoG (13,90 EUR seit 01.01.2026, 14,60 EUR ab
// 01.01.2027), Minijob-Grenze 603 EUR/Monat (2026), GeschGehG. Stand 2026-10.

export const VORLAGEN_ARBEIT: Vorlage[] = [
  {
    slug: "arbeitsvertrag-unbefristet",
    titel: "Arbeitsvertrag (unbefristet)",
    kurz: "Unbefristeter Arbeitsvertrag für Vollzeit oder Teilzeit mit allen Pflichtangaben nach dem Nachweisgesetz.",
    kategorie: "arbeit",
    dateiname: "Arbeitsvertrag-unbefristet",
    wofuer: [
      "Deine erste Festanstellung in Vollzeit oder Teilzeit ohne Enddatum",
      "Wenn du die Pflichtangaben nach dem Nachweisgesetz (§ 2 NachwG) in einem Dokument erledigen willst",
      "Als Grundlage für Zusatzvereinbarungen wie Homeoffice, Bonus oder Geheimhaltung",
      "Für Start-ups ohne Tarifbindung und ohne Betriebsrat",
    ],
    enthaelt: [
      "§ 1 Beginn, Tätigkeit und Arbeitsort",
      "§ 2 Probezeit",
      "§ 3 Arbeitszeit, Pausen und Überstunden",
      "§ 4 Vergütung und Fälligkeit",
      "§ 5 Urlaub",
      "§ 6 Krankheit und Entgeltfortzahlung",
      "§ 7 Nebentätigkeit, Verschwiegenheit, Datenschutz",
      "§ 8 Fortbildung und betriebliche Altersversorgung",
      "§ 9 Kündigung und Kündigungsverfahren",
      "§ 10 Ausschlussfristen",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Seit August 2022 verlangt § 2 NachwG deutlich mehr Pflichtangaben (u. a. Probezeit, Überstunden, Fälligkeit des Gehalts, Kündigungsverfahren mit Klagefrist). Fehlen sie, droht ein Bußgeld bis 2.000 EUR je Verstoß. Diese Vorlage deckt alle Punkte ab.",
      "Die Probezeit darf höchstens sechs Monate dauern; in dieser Zeit gilt die Kündigungsfrist von zwei Wochen (§ 622 Abs. 3 BGB). Kündigungsschutz nach dem KSchG greift erst nach sechs Monaten und nur in Betrieben mit mehr als zehn Vollzeitkräften.",
      "Pauschale Überstundenabgeltung ist nur wirksam, wenn die Zahl der abgegoltenen Stunden klar begrenzt ist. „Alle Überstunden sind mit dem Gehalt abgegolten“ ist unwirksam.",
      "Ausschlussfristen müssen mindestens drei Monate betragen, Textform (E-Mail) genügen lassen und den Mindestlohn sowie Haftung für Vorsatz ausnehmen, sonst sind sie insgesamt unwirksam.",
      "Der Stundenlohn darf 13,90 EUR brutto (seit 01.01.2026) nicht unterschreiten; ab 01.01.2027 gelten 14,60 EUR. Bei Festgehalt die tatsächlichen Stunden nachrechnen.",
    ],
    faqs: [
      {
        q: "Muss ein Arbeitsvertrag schriftlich sein?",
        a: "Nein, ein Arbeitsvertrag kommt auch mündlich zustande. Aber die wesentlichen Bedingungen musst du nach dem Nachweisgesetz spätestens am ersten Arbeitstag (Name, Gehalt, Arbeitszeit) und innerhalb von sieben Tagen bzw. einem Monat für den Rest aushändigen. Seit 2025 reicht dafür die Textform, wenn das Dokument zugänglich, speicherbar und ausdruckbar ist und du den Arbeitnehmer zu einem Empfangsnachweis aufforderst (nicht in Branchen nach § 2a SchwarzArbG wie Bau oder Gastronomie); die Kündigung braucht dagegen immer Papier und Unterschrift.",
      },
      {
        q: "Wie lange darf die Probezeit sein?",
        a: "Maximal sechs Monate. Innerhalb der Probezeit können beide Seiten mit zwei Wochen Frist kündigen. Danach gilt die gesetzliche Grundfrist von vier Wochen zum 15. oder zum Monatsende, die sich für den Arbeitgeber mit der Betriebszugehörigkeit verlängert.",
      },
      {
        q: "Wie viel Urlaub muss ich mindestens geben?",
        a: "Gesetzlich 24 Werktage bei einer Sechs-Tage-Woche, das entspricht 20 Arbeitstagen bei einer Fünf-Tage-Woche (§ 3 BUrlG). Üblich sind 25 bis 30 Tage. Bei Teilzeit mit weniger Wochentagen rechnest du anteilig nach Arbeitstagen, nicht nach Stunden.",
      },
      {
        q: "Was passiert, wenn ich Pflichtangaben vergesse?",
        a: "Der Vertrag bleibt wirksam, aber du riskierst ein Bußgeld und bist im Streit in der schlechteren Position: Fehlt zum Beispiel der Hinweis auf die Probezeit oder die Ausschlussfrist, kann sich der Arbeitnehmer darauf berufen, dass sie nicht gilt. Nachholen ist jederzeit möglich, am besten mit Empfangsbestätigung.",
      },
    ],
    seo: {
      title: "Arbeitsvertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Unbefristeter Arbeitsvertrag als kostenlose Vorlage mit allen Pflichtangaben nach Nachweisgesetz: Probezeit, Gehalt, Urlaub, Kündigung. Word, PDF oder Text.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/arbeitsvertrag-unbefristet"),
  },
  {
    slug: "arbeitsvertrag-befristet",
    titel: "Arbeitsvertrag (befristet)",
    kurz: "Sachgrundlos befristeter Arbeitsvertrag nach § 14 Abs. 2 TzBfG mit allen Pflichtangaben und sauberer Schriftform.",
    kategorie: "arbeit",
    dateiname: "Arbeitsvertrag-befristet",
    wofuer: [
      "Du willst jemanden zunächst für ein Projekt oder eine Saison einstellen, ohne Dauerbindung",
      "Für die ersten vier Jahre nach Gründung: Existenzgründer dürfen bis zu vier Jahre sachgrundlos befristen (§ 14 Abs. 2a TzBfG)",
      "Wenn die Person noch nie bei dir beschäftigt war (Vorbeschäftigungsverbot)",
      "Als Verlängerungsvertrag innerhalb der Zwei-Jahres-Grenze",
    ],
    enthaelt: [
      "§ 1 Befristung, Beginn und Ende",
      "§ 2 Tätigkeit und Arbeitsort",
      "§ 3 Probezeit und ordentliche Kündigung",
      "§ 4 Arbeitszeit und Überstunden",
      "§ 5 Vergütung und Fälligkeit",
      "§ 6 Urlaub, Krankheit, Entgeltfortzahlung",
      "§ 7 Nebentätigkeit, Verschwiegenheit, Datenschutz",
      "§ 8 Fortbildung und betriebliche Altersversorgung",
      "§ 9 Kündigungsverfahren, Klagefrist, Meldepflicht",
      "§ 10 Ausschlussfristen",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Die Befristung muss vor dem ersten Arbeitstag von beiden Seiten eigenhändig auf Papier unterschrieben sein (§ 14 Abs. 4 TzBfG). Fängt der Arbeitnehmer vorher an oder wird per E-Mail unterschrieben, entsteht ein unbefristetes Arbeitsverhältnis.",
      "Ohne Sachgrund sind höchstens zwei Jahre und höchstens drei Verlängerungen erlaubt. Eine Verlängerung muss nahtlos anschließen und darf nur die Laufzeit ändern; jede andere Änderung (Gehalt, Stunden) im Verlängerungsvertrag macht die Befristung unwirksam.",
      "War die Person schon einmal bei dir angestellt, auch als Werkstudent oder Minijobber, ist eine sachgrundlose Befristung in der Regel ausgeschlossen (§ 14 Abs. 2 Satz 2 TzBfG). Nur bei sehr langem Abstand macht das BAG Ausnahmen.",
      "Ein befristeter Vertrag kann nur ordentlich gekündigt werden, wenn das ausdrücklich vereinbart ist (§ 15 Abs. 4 TzBfG). Diese Vorlage vereinbart es.",
      "Arbeitet der Arbeitnehmer nach dem Enddatum mit deinem Wissen weiter, gilt der Vertrag als unbefristet verlängert (§ 15 Abs. 6 TzBfG). Widersprich sofort schriftlich, wenn das nicht gewollt ist.",
    ],
    faqs: [
      {
        q: "Wie oft darf ich einen befristeten Vertrag verlängern?",
        a: "Ohne Sachgrund höchstens dreimal, und zwar nur innerhalb von insgesamt zwei Jahren. Als Existenzgründer darfst du in den ersten vier Jahren nach der Gründung bis zu vier Jahre lang beliebig oft verlängern (§ 14 Abs. 2a TzBfG). Die Verlängerung muss schriftlich vor Ablauf des alten Vertrags vereinbart werden.",
      },
      {
        q: "Brauche ich einen Grund für die Befristung?",
        a: "Nein, bis zu zwei Jahren nicht. Länger geht nur mit Sachgrund, etwa Vertretung einer Mitarbeiterin in Elternzeit, Projektbefristung oder vorübergehender Mehrbedarf (§ 14 Abs. 1 TzBfG). Der Sachgrund muss bei Vertragsschluss wirklich vorliegen; du solltest ihn dann im Vertrag nennen und dokumentieren.",
      },
      {
        q: "Gilt die Probezeit auch bei befristeten Verträgen?",
        a: "Ja, sie muss aber im Verhältnis zur Laufzeit angemessen sein (§ 15 Abs. 3 TzBfG). Bei einem Jahresvertrag sind drei Monate üblich, sechs Monate wären bei einem Sechsmonatsvertrag unzulässig. Die Probezeit ändert nichts am Enddatum, sie erleichtert nur die Kündigung.",
      },
      {
        q: "Was passiert, wenn die Befristung unwirksam ist?",
        a: "Dann gilt das Arbeitsverhältnis als unbefristet (§ 16 TzBfG). Der Arbeitnehmer muss das aber innerhalb von drei Wochen nach dem vereinbarten Ende per Klage geltend machen (§ 17 TzBfG). Danach bleibt es bei der Befristung, auch wenn sie fehlerhaft war.",
      },
    ],
    seo: {
      title: "Befristeter Arbeitsvertrag Vorlage kostenlos | GründerX",
      description:
        "Befristeter Arbeitsvertrag ohne Sachgrund als kostenlose Vorlage: § 14 TzBfG, max. 2 Jahre, Schriftform, Probezeit, Kündigung. Word, PDF oder Text.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/arbeitsvertrag-befristet"),
  },
  {
    slug: "minijob-vertrag",
    titel: "Minijob-Vertrag (geringfügige Beschäftigung)",
    kurz: "Arbeitsvertrag für eine geringfügige Beschäftigung bis 603 EUR im Monat mit Stundenlohn, Urlaub und Rentenversicherungs-Hinweis.",
    kategorie: "arbeit",
    dateiname: "Minijob-Vertrag",
    wofuer: [
      "Deine erste Aushilfe für Versand, Lager, Laden oder Büro mit wenigen Stunden pro Woche",
      "Wenn du die Verdienstgrenze von 603 EUR im Monat (2026) sicher einhalten willst",
      "Für Minijobber, die als Rentner, Studierende oder neben einer Hauptbeschäftigung arbeiten",
      "Als Nachweis nach dem Nachweisgesetz, der auch für Minijobs Pflicht ist",
    ],
    enthaelt: [
      "§ 1 Beginn, Tätigkeit und Arbeitsort",
      "§ 2 Geringfügige Beschäftigung und Verdienstgrenze",
      "§ 3 Arbeitszeit und Abruf",
      "§ 4 Vergütung und Fälligkeit",
      "§ 5 Urlaub",
      "§ 6 Krankheit, Feiertage, Entgeltfortzahlung",
      "§ 7 Rentenversicherung und Befreiung",
      "§ 8 Weitere Beschäftigungen, Verschwiegenheit",
      "§ 9 Probezeit, Kündigung, Klagefrist",
      "§ 10 Ausschlussfristen und Schlussbestimmungen",
    ],
    hinweise: [
      "Die Verdienstgrenze ist dynamisch: 2026 sind es 603 EUR im Monat (Mindestlohn 13,90 EUR × 130 ÷ 3, aufgerundet), 2027 mit 14,60 EUR Mindestlohn 633 EUR. Beim Mindestlohn sind das etwa 43 Stunden im Monat; Urlaubs- und Weihnachtsgeld zählen anteilig mit.",
      "Du zahlst als Arbeitgeber Pauschalabgaben von rund 30 % (13 % Krankenversicherung, 15 % Rentenversicherung, 2 % Pauschsteuer, Umlagen) an die Minijob-Zentrale. Die Anmeldung erfolgt mit der ersten Entgeltabrechnung, spätestens innerhalb von sechs Wochen nach Beschäftigungsbeginn (§ 6 DEÜV); in bestimmten Branchen (z. B. Gastronomie, Logistik) zusätzlich als Sofortmeldung spätestens bei Arbeitsaufnahme.",
      "Minijobber sind vollwertige Arbeitnehmer: Urlaub, Entgeltfortzahlung im Krankheitsfall, Feiertagsbezahlung, Kündigungsschutz und Mutterschutz gelten genauso wie bei Vollzeitkräften.",
      "Ohne feste Arbeitszeit gilt ein Abrufverhältnis mit 20 Stunden pro Woche als vereinbart (§ 12 Abs. 1 TzBfG), und die Verdienstgrenze wird gesprengt. Deshalb steht die wöchentliche Stundenzahl ausdrücklich im Vertrag.",
      "Die Rentenversicherungspflicht gilt automatisch (3,6 % Eigenanteil des Minijobbers). Eine Befreiung ist nur auf schriftlichen oder elektronischen Antrag des Minijobbers möglich (§ 6 Abs. 1b SGB VI), den du der Minijob-Zentrale meldest und zu den Lohnunterlagen nimmst; aufheben lassen kann er sie nur einmal (§ 6 Abs. 6 SGB VI).",
    ],
    faqs: [
      {
        q: "Wie viele Stunden darf ein Minijobber 2026 arbeiten?",
        a: "Das hängt vom Stundenlohn ab. Beim Mindestlohn von 13,90 EUR sind es rund 43 Stunden im Monat, damit die Grenze von 603 EUR eingehalten wird. Zahlst du mehr, sinkt die Stundenzahl entsprechend. Einmalzahlungen wie Weihnachtsgeld werden auf das Jahr verteilt mitgerechnet: Entscheidend ist, dass im Jahresdurchschnitt 603 EUR im Monat nicht überschritten werden.",
      },
      {
        q: "Was passiert, wenn die Verdienstgrenze überschritten wird?",
        a: "Ein gelegentliches, nicht vorhersehbares Überschreiten (z. B. Krankheitsvertretung) ist bis zu zweimal im Jahr und bis zum doppelten Betrag erlaubt. Alles darüber macht die Beschäftigung sozialversicherungspflichtig, und zwar ab dem Zeitpunkt, ab dem absehbar war, dass die Grenze gerissen wird. Dann drohen Nachzahlungen für beide Seiten.",
      },
      {
        q: "Muss ich dem Minijobber Urlaub und Lohnfortzahlung geben?",
        a: "Ja, Minijobber haben dieselben Rechte wie alle anderen Arbeitnehmer. Der Urlaub wird nach Arbeitstagen pro Woche berechnet: Bei zwei Arbeitstagen pro Woche sind das gesetzlich acht Tage im Jahr. Im Krankheitsfall zahlst du bis zu sechs Wochen weiter; die Minijob-Zentrale erstattet dir davon je nach Umlagesatz einen Großteil.",
      },
      {
        q: "Kann ein Minijobber mehrere Minijobs haben?",
        a: "Nur, wenn alle Minijobs zusammen 603 EUR nicht übersteigen. Neben einer sozialversicherungspflichtigen Hauptbeschäftigung bleibt genau ein Minijob ohne Zusammenrechnung ein Minijob mit Pauschalabgaben; jeder weitere wird mit der Hauptbeschäftigung zusammengerechnet. Deshalb fragt die Vorlage weitere Beschäftigungen ab, und der Minijobber muss Änderungen melden.",
      },
    ],
    seo: {
      title: "Minijob-Vertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Minijob-Vertrag als kostenlose Vorlage 2026: Verdienstgrenze 603 EUR, Mindestlohn 13,90 EUR, Urlaub, Rentenversicherung, Minijob-Zentrale. Word & PDF.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/minijob-vertrag"),
  },
  {
    slug: "werkstudentenvertrag",
    titel: "Werkstudentenvertrag",
    kurz: "Arbeitsvertrag für Werkstudenten mit 20-Stunden-Grenze, Immatrikulationsnachweis, Semesterferien-Regelung und Sozialversicherungs-Hinweisen.",
    kategorie: "arbeit",
    dateiname: "Werkstudentenvertrag",
    wofuer: [
      "Du stellst eine Studentin oder einen Studenten neben dem Studium ein, etwa für Entwicklung, Marketing oder Support",
      "Wenn du das Werkstudentenprivileg (nur Rentenversicherung, keine Kranken-, Pflege- und Arbeitslosenversicherung) sicher nutzen willst",
      "Für Beschäftigungen über der Minijob-Grenze, aber unter 20 Stunden pro Woche in der Vorlesungszeit",
      "Als Vertrag, der sich in den Semesterferien vorübergehend aufstocken lässt",
    ],
    enthaelt: [
      "§ 1 Beginn, Tätigkeit und Arbeitsort",
      "§ 2 Werkstudentenstatus und Nachweispflichten",
      "§ 3 Arbeitszeit in Vorlesungszeit und Semesterferien",
      "§ 4 Vergütung und Fälligkeit",
      "§ 5 Urlaub und Prüfungszeiten",
      "§ 6 Krankheit und Entgeltfortzahlung",
      "§ 7 Verschwiegenheit, Arbeitsergebnisse, Datenschutz",
      "§ 8 Probezeit, Kündigung, Ende des Studiums",
      "§ 9 Ausschlussfristen und Schlussbestimmungen",
    ],
    hinweise: [
      "Das Werkstudentenprivileg gilt nur, wenn das Studium im Vordergrund steht: in der Vorlesungszeit höchstens 20 Stunden pro Woche. Ausnahmen (Abend, Nacht, Wochenende, Semesterferien) sind möglich, aber insgesamt dürfen nicht mehr als 26 Wochen im Jahr über 20 Stunden gearbeitet werden.",
      "Der Student muss ordentlich immatrikuliert sein: nicht im Urlaubssemester, nicht exmatrikuliert, nicht nur Promotionsstudent und in der Regel nicht über dem 25. Fachsemester. Lass dir jedes Semester die Immatrikulationsbescheinigung geben und lege sie zu den Lohnunterlagen.",
      "In der Rentenversicherung ist der Werkstudent voll beitragspflichtig (je 9,3 % Arbeitgeber und Arbeitnehmer). Kranken-, Pflege- und Arbeitslosenversicherung fallen weg; die Umlagen U1, U2 und die Unfallversicherung zahlst du trotzdem.",
      "Mindestlohn (13,90 EUR seit 2026), Urlaub, Entgeltfortzahlung und Kündigungsschutz gelten uneingeschränkt. Ein Werkstudent ist arbeitsrechtlich ein normaler Teilzeitarbeitnehmer.",
      "Eine Befristung „bis zum Studienende“ ist eine Zweckbefristung und rechtlich wacklig. Sicherer ist ein unbefristeter Vertrag mit Mitteilungspflicht bei Exmatrikulation oder eine kalendermäßige Befristung nach § 14 Abs. 2 TzBfG.",
    ],
    faqs: [
      {
        q: "Wie viele Stunden darf ein Werkstudent arbeiten?",
        a: "In der Vorlesungszeit höchstens 20 Stunden pro Woche, sonst entfällt das Werkstudentenprivileg und du zahlst volle Sozialversicherung. In den Semesterferien darf er Vollzeit arbeiten, solange im Jahr nicht mehr als 26 Wochen über 20 Stunden zusammenkommen. Die Vorlage regelt beide Phasen getrennt.",
      },
      {
        q: "Was kostet mich ein Werkstudent an Sozialabgaben?",
        a: "Nur den Arbeitgeberanteil zur Rentenversicherung (9,3 %) plus Umlagen und Unfallversicherung. Kranken-, Pflege- und Arbeitslosenversicherung entfallen. Bei einem Gehalt von 1.200 EUR brutto zahlst du also rund 120 EUR statt gut 240 EUR bei einer regulären Teilzeitkraft.",
      },
      {
        q: "Darf ein Werkstudent mehr als 603 EUR verdienen?",
        a: "Ja, es gibt keine Verdienstgrenze. Ab 603,01 EUR ist er kein Minijobber mehr, sondern Werkstudent mit Rentenversicherungspflicht. Beachte aber die Familienversicherung: Übersteigt das Einkommen ein Siebtel der monatlichen Bezugsgröße (2026 sind das 565 EUR, der Wert steigt jährlich), fällt der Student aus der Familienversicherung der Eltern und muss sich selbst studentisch versichern.",
      },
      {
        q: "Was passiert, wenn der Student das Studium abbricht?",
        a: "Mit der Exmatrikulation endet das Werkstudentenprivileg, nicht automatisch der Arbeitsvertrag. Ab diesem Zeitpunkt ist die Beschäftigung voll sozialversicherungspflichtig. Die Vorlage verpflichtet den Studenten, die Exmatrikulation sofort zu melden, und gibt dir ein ordentliches Kündigungsrecht.",
      },
    ],
    seo: {
      title: "Werkstudentenvertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Werkstudentenvertrag als kostenlose Vorlage: 20-Stunden-Regel, Semesterferien, Immatrikulationsnachweis, Vergütung, Urlaub. Word, PDF oder Text.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/werkstudentenvertrag"),
  },
  {
    slug: "praktikumsvertrag",
    titel: "Praktikumsvertrag",
    kurz: "Praktikumsvertrag für Pflicht- und freiwillige Praktika mit Lernzielen, Dauer, Vergütung nach Mindestlohngesetz, Betreuung und Zeugnis.",
    kategorie: "arbeit",
    dateiname: "Praktikumsvertrag",
    wofuer: [
      "Du nimmst einen Schüler oder Studierenden für ein Pflichtpraktikum nach Studien- oder Prüfungsordnung auf",
      "Für ein freiwilliges Orientierungspraktikum bis drei Monate vor oder während des Studiums",
      "Für ein längeres freiwilliges Praktikum, bei dem der Mindestlohn gilt",
      "Wenn du die Pflichtangaben für Praktikanten nach § 2 Abs. 1a NachwG erfüllen willst",
    ],
    enthaelt: [
      "§ 1 Art und Zweck des Praktikums",
      "§ 2 Dauer, Probezeit und Arbeitszeit",
      "§ 3 Lern- und Ausbildungsziele",
      "§ 4 Vergütung",
      "§ 5 Pflichten des Unternehmens und Betreuung",
      "§ 6 Pflichten des Praktikanten",
      "§ 7 Urlaub, Krankheit, Fehlzeiten",
      "§ 8 Verschwiegenheit und Arbeitsergebnisse",
      "§ 9 Beendigung",
      "§ 10 Zeugnis und Schlussbestimmungen",
    ],
    hinweise: [
      "Mindestlohn (13,90 EUR seit 2026) gilt nicht für Pflichtpraktika nach Schul-, Ausbildungs- oder Studienordnung und nicht für freiwillige Praktika bis drei Monate zur Orientierung oder studienbegleitend (§ 22 Abs. 1 MiLoG). Dauert ein freiwilliges Praktikum von vornherein länger als drei Monate, gilt der Mindestlohn ab dem ersten Tag, nicht erst ab dem vierten Monat.",
      "Freiwillige Praktikanten fallen unter § 26 BBiG: Eine Vertragsniederschrift nach dem BBiG ist zwar nicht nötig, die Pflichtangaben nach § 2 Abs. 1a NachwG müssen aber vor Beginn schriftlich vorliegen; es gibt Urlaub, Entgeltfortzahlung und einen Zeugnisanspruch. Eine Kündigung nach der Probezeit ist nur aus wichtigem Grund oder durch den Praktikanten mit vier Wochen Frist möglich (§ 22 BBiG).",
      "Eine Verlängerung des freiwilligen Praktikums über drei Monate hinaus, auch nur um eine Woche, löst Mindestlohn für die gesamte Dauer aus. Lieber neu entscheiden, ob daraus ein Werkstudenten- oder Arbeitsverhältnis wird.",
      "Für Pflichtpraktikanten zahlst du keine Sozialabgaben, wenn das Praktikum in der Studienordnung vorgeschrieben ist. Freiwillige Praktika mit Vergütung sind sozialversicherungspflichtig wie ein normales Arbeitsverhältnis; unter 603 EUR gelten Minijob-Regeln.",
      "Ein Praktikum darf keine verdeckte Arbeitsstelle sein. Steht die Arbeitsleistung im Vordergrund statt des Lernens, ist der Praktikant Arbeitnehmer mit vollem Mindestlohn, rückwirkend.",
    ],
    faqs: [
      {
        q: "Muss ich einem Praktikanten den Mindestlohn zahlen?",
        a: "Nicht bei Pflichtpraktika und nicht bei freiwilligen Praktika bis drei Monate, die der Orientierung dienen oder studienbegleitend sind. Bei allen anderen Praktika, also freiwillig und länger als drei Monate oder nach abgeschlossener Ausbildung, gilt der volle Mindestlohn von 13,90 EUR pro Stunde. Minderjährige ohne Berufsabschluss sind ebenfalls ausgenommen.",
      },
      {
        q: "Wie lange darf ein Praktikum dauern?",
        a: "Gesetzlich gibt es keine Höchstdauer, aber die Drei-Monats-Grenze entscheidet über den Mindestlohn. Pflichtpraktika richten sich nach der Studienordnung, oft 8 bis 26 Wochen. Ein freiwilliges Praktikum über sechs Monate wirkt schnell wie ein verkapptes Arbeitsverhältnis; dann solltest du einen Arbeitsvertrag abschließen.",
      },
      {
        q: "Brauchen Praktikanten einen schriftlichen Vertrag?",
        a: "Ja. § 26 BBiG verzichtet zwar auf die Vertragsniederschrift nach § 11 BBiG, aber das Nachweisgesetz verlangt in § 2 Abs. 1a, dass du Praktikanten vor Beginn schriftlich und unterschrieben folgende Pflichtangaben aushändigst: Lern- und Ausbildungsziele, Beginn, Dauer, tägliche Praktikumszeit, Vergütung, Urlaub und Tarifhinweise. Diese Vorlage enthält alle Punkte.",
      },
      {
        q: "Hat ein Praktikant Anspruch auf ein Zeugnis?",
        a: "Ja, nach § 16 BBiG hat jeder Praktikant Anspruch auf ein schriftliches Zeugnis mit Art, Dauer und Ziel des Praktikums sowie den erworbenen Fähigkeiten. Auf Verlangen wird es um Leistung und Verhalten ergänzt (qualifiziertes Zeugnis). Für Pflichtpraktika verlangt die Hochschule zusätzlich meist eine Bescheinigung über die abgeleisteten Wochen.",
      },
    ],
    seo: {
      title: "Praktikumsvertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Praktikumsvertrag als kostenlose Vorlage für Pflicht- und freiwillige Praktika: Lernziele, Dauer, Mindestlohn, Betreuung, Zeugnis. Word, PDF oder Text.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/praktikumsvertrag"),
  },
  {
    slug: "kuendigung-arbeitgeber",
    titel: "Kündigungsschreiben Arbeitgeber (ordentlich)",
    kurz: "Ordentliches Kündigungsschreiben in zwei Varianten, in der Probezeit und nach der Probezeit, mit allen Pflichthinweisen und Zugangsnachweis.",
    kategorie: "arbeit",
    dateiname: "Kuendigung-Arbeitgeber",
    wofuer: [
      "Du willst ein Arbeitsverhältnis in der Probezeit mit zwei Wochen Frist beenden",
      "Du kündigst nach der Probezeit ordentlich unter Einhaltung der gesetzlichen oder vertraglichen Frist",
      "Für Kleinbetriebe bis zehn Mitarbeiter, in denen das Kündigungsschutzgesetz nicht gilt",
      "Als formsicheres Schreiben mit Hinweis auf Arbeitsagentur, Resturlaub und Zeugnis",
    ],
    enthaelt: [
      "Variante A: Kündigung in der Probezeit (zwei Wochen Frist)",
      "Variante B: Kündigung nach der Probezeit (Frist nach § 622 BGB oder Vertrag)",
      "Betreff, Kündigungserklärung und Beendigungsdatum mit hilfsweisem nächstmöglichen Termin",
      "Hinweis auf die Meldepflicht bei der Agentur für Arbeit (§ 38 SGB III)",
      "Resturlaub, Freistellung und Urlaubsabgeltung",
      "Zeugnis, Arbeitspapiere und Rückgabe von Firmeneigentum",
      "Eigenhändige Unterschrift des Vertretungsberechtigten",
      "Empfangsbestätigung und Übergabeprotokoll für den Zugangsnachweis",
    ],
    hinweise: [
      "Eine Kündigung ist nur auf Papier mit eigenhändiger Unterschrift wirksam (§ 623 BGB). E-Mail, PDF, WhatsApp oder eingescannte Unterschrift sind nichtig. Unterschreiben darf nur, wer vertretungsberechtigt ist (Geschäftsführer, Inhaber, Prokurist); sonst Originalvollmacht beilegen, sonst kann der Arbeitnehmer die Kündigung nach § 174 BGB zurückweisen.",
      "Die Frist läuft erst ab Zugang. Übergib das Schreiben persönlich gegen Unterschrift oder lass es durch einen Boten in den Briefkasten werfen, der den Inhalt kennt und Datum und Uhrzeit notiert. Einschreiben mit Rückschein scheitert, wenn niemand annimmt.",
      "Gilt das Kündigungsschutzgesetz (mehr als zehn Vollzeitkräfte und mehr als sechs Monate Betriebszugehörigkeit), brauchst du einen betriebs-, verhaltens- oder personenbedingten Grund. Der Grund gehört nicht ins Schreiben, muss aber im Prozess bewiesen werden.",
      "Sonderkündigungsschutz prüfen: Schwangere, Eltern in Elternzeit, Schwerbehinderte (Zustimmung des Integrationsamts), Pflegezeit, Betriebsratsmitglieder und Auszubildende nach der Probezeit kannst du nicht oder nur mit behördlicher Zustimmung ordentlich kündigen. Mit Betriebsrat ist die vorherige Anhörung nach § 102 BetrVG Pflicht, sonst ist die Kündigung unwirksam.",
      "Die Kündigungsfrist verlängert sich mit der Betriebszugehörigkeit: nach 2 Jahren ein Monat, nach 5 Jahren zwei Monate, nach 8 Jahren drei Monate, jeweils zum Monatsende (§ 622 Abs. 2 BGB). Die Grundfrist beträgt vier Wochen zum 15. oder zum Monatsende.",
    ],
    faqs: [
      {
        q: "Muss ich im Kündigungsschreiben einen Grund nennen?",
        a: "Nein, bei einer ordentlichen Kündigung nicht. Ausnahmen sind Auszubildende nach der Probezeit und Kündigungen während Schwangerschaft oder Mutterschutz mit behördlicher Zustimmung. Ein genannter Grund bindet dich eher, als dass er hilft. Auf Verlangen musst du den Grund bei einer fristlosen Kündigung schriftlich mitteilen (§ 626 Abs. 2 BGB).",
      },
      {
        q: "Wie lang ist die Kündigungsfrist in der Probezeit?",
        a: "Zwei Wochen zu jedem beliebigen Tag, wenn die Probezeit vereinbart ist und höchstens sechs Monate dauert (§ 622 Abs. 3 BGB). Die Kündigung muss innerhalb der Probezeit zugehen; das Ende darf danach liegen. Am letzten Tag der Probezeit zugestellt, läuft die Frist noch zwei Wochen weiter.",
      },
      {
        q: "Was passiert mit dem Resturlaub?",
        a: "Resturlaub muss grundsätzlich in natura bis zum Ende des Arbeitsverhältnisses genommen werden. Du kannst den Arbeitnehmer unwiderruflich freistellen und den Urlaub dabei ausdrücklich anrechnen; das Schreiben enthält diese Formulierung. Was nicht genommen werden kann, wird mit dem Schlussgehalt ausgezahlt (§ 7 Abs. 4 BUrlG).",
      },
      {
        q: "Wann kann der Arbeitnehmer gegen die Kündigung klagen?",
        a: "Innerhalb von drei Wochen nach Zugang des Schreibens beim Arbeitsgericht (§ 4 KSchG). Das gilt auch in Kleinbetrieben, weil dort zumindest Formfehler, Diskriminierung oder Sittenwidrigkeit geprüft werden. Nach Ablauf der Frist ist die Kündigung wirksam, selbst wenn sie fehlerhaft war. Du musst auf die Frist nicht hinweisen, aber der Nachweis im Arbeitsvertrag muss sie nennen.",
      },
    ],
    seo: {
      title: "Kündigungsschreiben Arbeitgeber Vorlage kostenlos | GründerX",
      description:
        "Kündigungsschreiben für Arbeitgeber als kostenlose Vorlage: ordentliche Kündigung in und nach der Probezeit, Fristen, Schriftform, Resturlaub. Word & PDF.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/kuendigung-arbeitgeber"),
  },
  {
    slug: "aufhebungsvertrag",
    titel: "Aufhebungsvertrag",
    kurz: "Einvernehmliche Beendigung des Arbeitsverhältnisses mit Abfindung, Freistellung, Urlaub, Zeugnisnote, Rückgabe und Erledigungsklausel.",
    kategorie: "arbeit",
    dateiname: "Aufhebungsvertrag",
    wofuer: [
      "Du und der Mitarbeiter wollt euch ohne Kündigung und ohne Prozessrisiko trennen",
      "Wenn eine Kündigung wegen Kündigungsschutz oder Sonderkündigungsschutz schwierig wäre",
      "Für einen klaren Schnitt mit Abfindung, Zeugnisnote und Freistellung in einem Dokument",
      "Als Vergleich nach einer bereits ausgesprochenen Kündigung",
    ],
    enthaelt: [
      "§ 1 Beendigung des Arbeitsverhältnisses",
      "§ 2 Freistellung und Urlaub",
      "§ 3 Vergütung bis zum Ende",
      "§ 4 Abfindung",
      "§ 5 Zeugnis",
      "§ 6 Rückgabe von Firmeneigentum und Daten",
      "§ 7 Verschwiegenheit und Stillschweigen",
      "§ 8 Hinweise zur Sperrzeit und Sozialversicherung",
      "§ 9 Erledigungsklausel",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Der Aufhebungsvertrag braucht Schriftform: Papier, beide Unterschriften im Original (§ 623 BGB). Eine E-Mail oder ein DocuSign-PDF ist nichtig, und der Mitarbeiter kann später einfach weiterarbeiten.",
      "Sperrzeit beim Arbeitslosengeld: Die Arbeitsagentur verhängt in der Regel zwölf Wochen Sperrzeit (§ 159 SGB III), weil der Mitarbeiter mitgewirkt hat. Keine Sperrzeit gibt es, wenn eine betriebsbedingte Kündigung drohte, die Kündigungsfrist eingehalten wird und die Abfindung zwischen 0,25 und 0,5 Bruttomonatsgehältern pro Beschäftigungsjahr liegt. Der Vertrag muss das dokumentieren.",
      "Wird die Kündigungsfrist nicht eingehalten, ruht das Arbeitslosengeld zusätzlich bis zum Ablauf der fiktiven Frist (§ 158 SGB III). Das Beendigungsdatum deshalb mindestens auf das Ende der ordentlichen Kündigungsfrist legen.",
      "Die Abfindung ist sozialversicherungsfrei und wird ermäßigt besteuert (Fünftelregelung, § 34 EStG). Seit 2025 wird die Fünftelregelung nicht mehr über die Lohnabrechnung, sondern nur noch über die Steuererklärung des Mitarbeiters gewährt; weise ihn darauf hin.",
      "Gebot fairen Verhandelns (BAG 2019): Keine Überrumpelung, keine Drohung mit einer offensichtlich unzulässigen Kündigung, Bedenkzeit anbieten. Sonst kann der Vertrag unwirksam sein. Ein gesetzliches Widerrufsrecht hat der Mitarbeiter dagegen nicht.",
    ],
    faqs: [
      {
        q: "Muss ich eine Abfindung zahlen?",
        a: "Nein, es gibt keinen gesetzlichen Anspruch. Die Abfindung ist der Preis dafür, dass der Mitarbeiter auf Kündigungsschutz verzichtet. Üblich ist ein halbes Bruttomonatsgehalt pro Beschäftigungsjahr (§ 1a KSchG als Orientierung). In Kleinbetrieben ohne Kündigungsschutz kann sie deutlich niedriger ausfallen oder ganz entfallen.",
      },
      {
        q: "Kann der Mitarbeiter den Aufhebungsvertrag widerrufen?",
        a: "Nein, ein Widerrufsrecht wie bei Verbraucherverträgen gibt es nicht, auch nicht bei Unterzeichnung zu Hause. Anfechtung ist nur bei Täuschung oder widerrechtlicher Drohung möglich, etwa wenn du mit einer fristlosen Kündigung drohst, die ein vernünftiger Arbeitgeber nie ernsthaft erwägen würde. Gib Bedenkzeit, dann bist du auf der sicheren Seite.",
      },
      {
        q: "Was bedeutet die Formulierung „für den Verlust des Arbeitsplatzes“?",
        a: "Sie stellt klar, dass die Zahlung eine Entschädigung ist und kein Arbeitslohn. Nur dann ist die Abfindung sozialversicherungsfrei und steuerlich begünstigt. Rückständiges Gehalt, Bonus oder Urlaubsabgeltung dürfen nicht in die Abfindung gepackt werden; sie sind normal abzurechnen.",
      },
      {
        q: "Was ist eine Erledigungsklausel und warum ist sie wichtig?",
        a: "Sie regelt, dass mit Erfüllung des Vertrags alle gegenseitigen Ansprüche aus dem Arbeitsverhältnis erledigt sind, egal ob bekannt oder unbekannt. So verhinderst du, dass Monate später Überstunden, Bonus oder Spesen nachgefordert werden. Ausgenommen bleiben unverzichtbare Ansprüche wie gesetzlicher Mindesturlaub, Mindestlohn und die betriebliche Altersversorgung.",
      },
    ],
    seo: {
      title: "Aufhebungsvertrag Vorlage kostenlos mit Abfindung | GründerX",
      description:
        "Aufhebungsvertrag als kostenlose Vorlage: Beendigungsdatum, Freistellung, Abfindung, Zeugnisnote, Erledigungsklausel, Hinweis Sperrzeit. Word & PDF.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/aufhebungsvertrag"),
  },
  {
    slug: "abmahnung-arbeitnehmer",
    titel: "Abmahnung Arbeitnehmer",
    kurz: "Abmahnungsschreiben mit konkretem Sachverhalt, Pflichtverletzung, Aufforderung, Kündigungsandrohung, Personalakte und Gegendarstellungsrecht.",
    kategorie: "arbeit",
    dateiname: "Abmahnung-Arbeitnehmer",
    wofuer: [
      "Ein Mitarbeiter kommt wiederholt zu spät, fehlt unentschuldigt oder meldet sich nicht krank",
      "Bei Arbeitsverweigerung, Missachtung von Weisungen oder Verstößen gegen Sicherheits- und Datenschutzregeln",
      "Als notwendige Vorstufe für eine spätere verhaltensbedingte Kündigung",
      "Wenn du das Fehlverhalten sauber dokumentieren willst, ohne gleich zu kündigen",
    ],
    enthaelt: [
      "Briefkopf, Betreff und persönliche Zustellung",
      "1. Konkreter Sachverhalt mit Datum, Uhrzeit, Ort und Zeugen",
      "2. Verletzte Pflicht aus Arbeitsvertrag, Gesetz oder Weisung",
      "3. Aufforderung zu vertragsgemäßem Verhalten",
      "4. Androhung arbeitsrechtlicher Konsequenzen bis zur Kündigung",
      "5. Aufnahme in die Personalakte und Recht auf Gegendarstellung",
      "Unterschrift, Empfangsbestätigung, Übergabeprotokoll",
      "Anlage: Muster für die Gegendarstellung des Arbeitnehmers",
    ],
    hinweise: [
      "Eine Abmahnung braucht drei Teile: konkreter Sachverhalt (Hinweisfunktion), klare Benennung als Pflichtverletzung (Rügefunktion) und Androhung der Kündigung im Wiederholungsfall (Warnfunktion). Fehlt eines, ist es nur eine Ermahnung und trägt keine Kündigung.",
      "Immer nur ein Vorwurf pro Abmahnung, exakt beschrieben mit Datum, Uhrzeit und Ort. Pauschale Vorwürfe („wiederholt unpünktlich“) sind unwirksam. Ist ein Punkt einer Sammelabmahnung falsch, fällt die ganze Abmahnung.",
      "Eine Abmahnung ist formfrei, aber nur schriftlich beweisbar. Übergib sie persönlich gegen Unterschrift oder per Boten; der Betriebsrat muss nicht beteiligt werden, und eine vorherige Anhörung des Mitarbeiters ist nicht Pflicht, aber sinnvoll.",
      "Zeitnah handeln: Nach mehreren Monaten gilt das Fehlverhalten als verziehen. Eine feste Frist gibt es nicht; zwei bis drei Wochen nach Kenntnis sind sicher.",
      "Der Mitarbeiter darf eine Gegendarstellung zur Personalakte geben (§ 83 Abs. 2 BetrVG, das gilt auch ohne Betriebsrat; in Kleinstbetrieben außerhalb des BetrVG aus der Fürsorgepflicht) und kann auf Entfernung klagen, wenn die Abmahnung falsch oder zu unbestimmt ist. Nach Jahren ohne weitere Vorfälle verliert die Abmahnung ihre Wirkung.",
    ],
    faqs: [
      {
        q: "Wie viele Abmahnungen brauche ich vor einer Kündigung?",
        a: "Gesetzlich keine feste Zahl. Eine einschlägige Abmahnung für dasselbe Fehlverhalten reicht, wenn sie wirksam war und der Verstoß sich wiederholt. Bei leichten Verstößen erwarten Gerichte oft zwei bis drei, bei schweren (Diebstahl, Tätlichkeit) ist gar keine nötig. Wichtig ist, dass die Abmahnung dasselbe Pflichtenfeld betrifft wie der spätere Kündigungsgrund.",
      },
      {
        q: "Muss der Mitarbeiter die Abmahnung unterschreiben?",
        a: "Nein. Die Unterschrift bestätigt nur den Empfang, nicht die Richtigkeit. Verweigert er sie, lass einen Zeugen die Übergabe protokollieren; die Abmahnung ist trotzdem zugegangen und wirksam. Ein Einverständnis mit dem Inhalt brauchst du nie.",
      },
      {
        q: "Wie lange bleibt die Abmahnung in der Personalakte?",
        a: "Es gibt keine feste Löschfrist. Entfernt werden muss sie, wenn sie unrichtig ist oder nach längerer Zeit beanstandungsfreien Verhaltens ihre Warnfunktion verloren hat; Gerichte nehmen je nach Schwere zwei bis drei Jahre an. Der Mitarbeiter kann die Entfernung verlangen und notfalls einklagen.",
      },
      {
        q: "Kann ich eine Abmahnung per E-Mail schicken?",
        a: "Rechtlich ja, weil die Abmahnung formfrei ist. Praktisch nein: Du musst den Zugang und den Inhalt beweisen, und eine E-Mail kann der Mitarbeiter bestreiten. Nutze Papier mit Empfangsbestätigung oder Boten; die E-Mail höchstens als zusätzliche Ankündigung.",
      },
    ],
    seo: {
      title: "Abmahnung Arbeitnehmer Vorlage kostenlos (Word) | GründerX",
      description:
        "Abmahnung Arbeitnehmer als kostenlose Vorlage: konkreter Sachverhalt, Pflichtverletzung, Kündigungsandrohung, Personalakte, Gegendarstellung. Word & PDF.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/abmahnung-arbeitnehmer"),
  },
  {
    slug: "arbeitszeugnis",
    titel: "Arbeitszeugnis (qualifiziert, Note „gut“)",
    kurz: "Qualifiziertes Arbeitszeugnis mit Aufgabenbeschreibung, Leistungs- und Verhaltensbeurteilung in der Note „gut“ und wohlwollender Schlussformel.",
    kategorie: "arbeit",
    dateiname: "Arbeitszeugnis-qualifiziert",
    wofuer: [
      "Ein Mitarbeiter verlässt dein Unternehmen und hat Anspruch auf ein qualifiziertes Zeugnis (§ 109 GewO)",
      "Als Zwischenzeugnis bei Wechsel des Vorgesetzten, Umstrukturierung oder auf Wunsch des Mitarbeiters",
      "Wenn du die Zeugnissprache nicht kennst und keine versteckten Abwertungen schreiben willst",
      "Als vereinbarte Zeugnisnote in einem Aufhebungsvertrag oder Vergleich",
    ],
    enthaelt: [
      "Briefkopf und Überschrift (Zeugnis / Zwischenzeugnis)",
      "Einleitung: Person, Beschäftigungsdauer, Position",
      "Unternehmensbeschreibung (kurz)",
      "Aufgabenbeschreibung in Stichpunkten oder Fließtext",
      "Leistungsbeurteilung: Fachwissen, Arbeitsweise, Belastbarkeit, Erfolge",
      "Zusammenfassende Leistungsbewertung („stets zu unserer vollen Zufriedenheit“)",
      "Verhaltensbeurteilung gegenüber Vorgesetzten, Kollegen und Kunden",
      "Beendigungsgrund (neutral) und Schlussformel mit Dank, Bedauern und Wünschen",
      "Ort, Datum, Unterschrift und Übersicht der Zeugnisnoten",
    ],
    hinweise: [
      "Das Zeugnis muss nach der Rechtsprechung wahr und wohlwollend sein; § 109 Abs. 2 GewO verlangt klare Formulierungen ohne versteckte Aussagen. Geheimzeichen, Formulierungen mit versteckter Bedeutung und Auslassungen wichtiger Punkte sind verboten. Fehlt etwa die Ehrlichkeit bei einem Kassierer oder das Verhalten gegenüber Vorgesetzten, liest jeder Personaler eine Abwertung.",
      "Note „gut“ heißt in der Zeugnissprache „stets zu unserer vollen Zufriedenheit“; „zu unserer vollen Zufriedenheit“ ist nur befriedigend, „stets zu unserer vollsten Zufriedenheit“ sehr gut. Die Vorlage ist durchgängig auf „gut“ formuliert.",
      "Reihenfolge im Verhalten beachten: Vorgesetzte, Kollegen, Kunden. Werden Kollegen vor Vorgesetzten genannt, gilt das als Hinweis auf Probleme mit der Führung.",
      "Das Zeugnis braucht Papier mit Firmenbriefkopf und eigenhändiger Unterschrift eines Vorgesetzten oder Vertretungsberechtigten; seit 2025 ist mit Einverständnis des Mitarbeiters auch die elektronische Form mit qualifizierter Signatur möglich. Keine Flecken, keine Knicke, kein Datum weit nach dem Austritt, keine Eselsohren: All das gilt als Signal.",
      "Beweislast: Will der Mitarbeiter eine bessere Note als „befriedigend“, muss er die Leistung beweisen; willst du schlechter als „befriedigend“ beurteilen, musst du das beweisen (BAG). Verhandelte Noten im Aufhebungsvertrag sind für dich bindend.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen einfachem und qualifiziertem Zeugnis?",
        a: "Das einfache Zeugnis nennt nur Art und Dauer der Beschäftigung. Das qualifizierte Zeugnis bewertet zusätzlich Leistung und Verhalten und muss auf Verlangen des Mitarbeiters erteilt werden (§ 109 Abs. 1 GewO). In der Praxis verlangen fast alle das qualifizierte Zeugnis, weil ein einfaches Zeugnis bei Bewerbungen misstrauisch macht.",
      },
      {
        q: "Wann muss ich das Zeugnis ausstellen?",
        a: "Spätestens mit dem Ende des Arbeitsverhältnisses, auf Verlangen auch schon mit Zugang der Kündigung als vorläufiges Zeugnis. Ein Zwischenzeugnis kannst du bei triftigem Grund verlangen lassen (Vorgesetztenwechsel, Elternzeit, geplante Bewerbung). Der Anspruch verjährt nach drei Jahren, kann aber durch Ausschlussfristen im Arbeitsvertrag früher verfallen.",
      },
      {
        q: "Muss ich eine Schlussformel mit Dank und guten Wünschen schreiben?",
        a: "Nein, darauf besteht nach dem BAG kein Anspruch. Fehlt sie aber, liest jeder Personaler das als Zeichen für eine Trennung im Streit. Bei einer guten Beurteilung ist sie üblich, und du schadest dem Mitarbeiter ohne Not, wenn du sie weglässt. In Aufhebungsverträgen wird sie meist ausdrücklich vereinbart.",
      },
      {
        q: "Darf ich den Grund für die Beendigung nennen?",
        a: "Nur, wenn der Mitarbeiter es wünscht oder zumindest einverstanden ist. Üblich ist die neutrale Formulierung „auf eigenen Wunsch“ bei Eigenkündigung oder „im besten Einvernehmen“ bei Aufhebung. Eine Arbeitgeberkündigung wird meist nur mit „Das Arbeitsverhältnis endet am …“ umschrieben; Krankheit oder Abmahnungen gehören niemals ins Zeugnis.",
      },
    ],
    seo: {
      title: "Arbeitszeugnis Vorlage kostenlos: Note gut (Word) | GründerX",
      description:
        "Qualifiziertes Arbeitszeugnis als kostenlose Vorlage mit Note gut: Aufgaben, Leistung, Verhalten, Schlussformel und Zeugnissprache erklärt. Word & PDF.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/arbeitszeugnis"),
  },
  {
    slug: "homeoffice-vereinbarung",
    titel: "Homeoffice-Vereinbarung (mobiles Arbeiten)",
    kurz: "Zusatzvereinbarung zum Arbeitsvertrag über mobiles Arbeiten: Umfang, Erreichbarkeit, Zeiterfassung, Ausstattung, Datenschutz, Arbeitsschutz, Widerruf.",
    kategorie: "arbeit",
    dateiname: "Homeoffice-Vereinbarung",
    wofuer: [
      "Du erlaubst einem Mitarbeiter, einen Teil der Woche von zu Hause oder unterwegs zu arbeiten",
      "Wenn Erreichbarkeit, Kernzeiten und Zeiterfassung im Homeoffice klar geregelt sein sollen",
      "Für die Ausstattung (Laptop, Monitor, Kostenpauschale) und die Rückgabe bei Ende",
      "Als Ergänzung zu einem bestehenden Arbeitsvertrag, ohne ihn neu aufzusetzen",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Verhältnis zum Arbeitsvertrag",
      "§ 2 Umfang, Ort und Präsenztage",
      "§ 3 Arbeitszeit, Erreichbarkeit und Zeiterfassung",
      "§ 4 Ausstattung und Kostenerstattung",
      "§ 5 Datenschutz und IT-Sicherheit",
      "§ 6 Arbeitsschutz und Unfallversicherung",
      "§ 7 Zutritt zur Wohnung",
      "§ 8 Haftung",
      "§ 9 Dauer, Widerruf und Beendigung",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Mobiles Arbeiten ist kein Telearbeitsplatz im Sinne der Arbeitsstättenverordnung (§ 2 Abs. 7 ArbStättV). Bei Telearbeit müsstest du den Arbeitsplatz zu Hause komplett einrichten; bei mobilem Arbeiten reichen Gerät, Unterweisung und eine Gefährdungsbeurteilung. Die Vorlage ist bewusst als mobiles Arbeiten gefasst.",
      "Arbeitszeitgesetz und Zeiterfassungspflicht gelten im Homeoffice uneingeschränkt (BAG, Beschluss vom 13.09.2022, 1 ABR 22/21): Höchstarbeitszeit, Pausen, elf Stunden Ruhezeit und das Verbot von Sonntagsarbeit. Der Mitarbeiter muss seine Zeiten täglich erfassen.",
      "Ein Widerruf des Homeoffice ist nur mit angemessener Ankündigungsfrist und sachlichem Grund zulässig; eine Klausel „jederzeit ohne Grund“ ist unwirksam. Die Vorlage nennt Gründe und eine Frist.",
      "Zutritt zur Wohnung des Mitarbeiters ist nur mit seiner Zustimmung möglich (Art. 13 GG). Vereinbare deshalb Besichtigung nach Ankündigung oder eine Selbstauskunft per Checkliste.",
      "Mit Betriebsrat ist die Ausgestaltung mobiler Arbeit mitbestimmungspflichtig (§ 87 Abs. 1 Nr. 14 BetrVG). Die Homeoffice-Pauschale von 6 EUR pro Tag (max. 1.260 EUR im Jahr) macht der Mitarbeiter in seiner Steuererklärung geltend; deine Kostenerstattung ist davon unabhängig.",
    ],
    faqs: [
      {
        q: "Hat ein Mitarbeiter Anspruch auf Homeoffice?",
        a: "Nein, in Deutschland gibt es keinen gesetzlichen Anspruch auf Homeoffice. Es entsteht nur durch Vertrag, Betriebsvereinbarung oder betriebliche Übung. Genau deshalb solltest du mobiles Arbeiten schriftlich regeln, mit Widerrufsrecht; sonst wird aus jahrelanger Duldung ein Anspruch.",
      },
      {
        q: "Wer zahlt die Ausstattung und die Stromkosten?",
        a: "Gesetzlich schuldest du Aufwendungsersatz für Kosten, die der Mitarbeiter in deinem Interesse trägt (§ 670 BGB). In der Praxis stellst du Laptop und Zubehör und zahlst entweder eine kleine Monatspauschale oder gar nichts, weil der Mitarbeiter sich Fahrtkosten spart. Beides ist zulässig, solange es vereinbart ist. Eine steuerfreie Erstattung ist nur für nachgewiesene Kosten möglich.",
      },
      {
        q: "Ist der Mitarbeiter im Homeoffice unfallversichert?",
        a: "Ja, seit 2021 ist der Versicherungsschutz im Homeoffice dem im Betrieb gleichgestellt (§ 8 Abs. 1 Satz 3 SGB VII). Versichert sind Tätigkeiten im Zusammenhang mit der Arbeit, etwa der Weg zum Drucker oder zur Toilette, auch der Weg zur Kita. Nicht versichert sind private Verrichtungen wie Kochen oder das Öffnen der Haustür für ein privates Paket.",
      },
      {
        q: "Darf der Mitarbeiter aus dem Ausland arbeiten?",
        a: "Nur mit deiner Zustimmung, und du solltest sie restriktiv erteilen. Schon wenige Wochen im EU-Ausland können Sozialversicherungs- und Steuerpflichten im anderen Land auslösen; innerhalb der EU ist nach Art. 13 VO (EG) 883/2004 schon ab 25 % Arbeitszeit im Wohnsitzstaat die Sozialversicherung dort fällig, sofern nicht auf Antrag die Ausnahme für grenzüberschreitende Telearbeit (unter 50 %) greift. Die Vorlage beschränkt mobiles Arbeiten auf Deutschland und erlaubt Ausnahmen nur nach Einzelfreigabe.",
      },
    ],
    seo: {
      title: "Homeoffice-Vereinbarung Vorlage kostenlos (Word) | GründerX",
      description:
        "Homeoffice-Vereinbarung als kostenlose Vorlage: mobiles Arbeiten, Erreichbarkeit, Zeiterfassung, Ausstattung, Datenschutz, Widerruf. Word, PDF oder Text.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/homeoffice-vereinbarung"),
  },
  {
    slug: "verschwiegenheitserklaerung-mitarbeiter",
    titel: "Verschwiegenheitserklärung für Mitarbeiter",
    kurz: "Geheimhaltungsvereinbarung nach dem Geschäftsgeheimnisgesetz für Angestellte: Definition, Pflichten, Dauer nach dem Ende, Rückgabe, optionale Vertragsstrafe.",
    kategorie: "arbeit",
    dateiname: "Verschwiegenheitserklaerung-Mitarbeiter",
    wofuer: [
      "Mitarbeiter mit Zugang zu Kundendaten, Preisen, Quellcode, Rezepturen oder Lieferantenkonditionen",
      "Wenn dein Arbeitsvertrag nur eine allgemeine Verschwiegenheitsklausel enthält",
      "Als „angemessene Geheimhaltungsmaßnahme“, damit deine Informationen überhaupt als Geschäftsgeheimnis geschützt sind (§ 2 GeschGehG)",
      "Für Werkstudenten, Praktikanten und Minijobber, die ebenfalls Einblick in Interna haben",
    ],
    enthaelt: [
      "§ 1 Zweck und Verhältnis zum Arbeitsvertrag",
      "§ 2 Begriff des Geschäftsgeheimnisses und vertraulicher Informationen",
      "§ 3 Geheimhaltungspflichten",
      "§ 4 Erlaubte Nutzung und Ausnahmen (Whistleblowing, gesetzliche Pflichten)",
      "§ 5 Schutzmaßnahmen und Umgang mit Daten",
      "§ 6 Rückgabe und Löschung",
      "§ 7 Dauer der Pflichten nach Ende des Arbeitsverhältnisses",
      "§ 8 Rechtsfolgen bei Verstößen und optionale Vertragsstrafe",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Seit dem Geschäftsgeheimnisgesetz (2019) ist eine Information nur geschützt, wenn du „angemessene Geheimhaltungsmaßnahmen“ nachweisen kannst (§ 2 Nr. 1 GeschGehG). Ohne unterschriebene Verschwiegenheitserklärung, Zugriffsbeschränkungen und Kennzeichnung verlierst du im Prozess, auch wenn der Mitarbeiter alles kopiert hat.",
      "Catch-all-Klauseln („alle Informationen über das Unternehmen sind geheim“) sind nach der Rechtsprechung unwirksam, weil sie den Mitarbeiter unangemessen benachteiligen. Die Vorlage definiert Geheimnisse konkret und nimmt allgemeines Erfahrungswissen aus.",
      "Nach dem Ende des Arbeitsverhältnisses darf der Mitarbeiter sein redlich erworbenes Wissen und Können beruflich verwenden; nur echte Geschäftsgeheimnisse bleiben tabu. Eine nachvertragliche Geheimhaltungspflicht ist ohne Entschädigung zulässig, ein nachvertragliches Wettbewerbsverbot dagegen nur mit Karenzentschädigung (§ 74 HGB).",
      "Eine Vertragsstrafe ist nicht Pflicht und im Arbeitsrecht nur wirksam, wenn der Verstoß klar bestimmt ist und die Höhe angemessen bleibt (Orientierung: ein Bruttomonatsgehalt). Ohne Vertragsstrafe hast du trotzdem Unterlassung, Auskunft und Schadensersatz nach §§ 6 bis 10 GeschGehG, nur den Schaden musst du dann beweisen.",
      "Whistleblowing darfst du nicht verbieten: Meldungen von Rechtsverstößen nach dem Hinweisgeberschutzgesetz und § 5 GeschGehG bleiben erlaubt. Eine Klausel, die das versucht, macht die Vereinbarung angreifbar.",
    ],
    faqs: [
      {
        q: "Reicht die Verschwiegenheitsklausel im Arbeitsvertrag nicht aus?",
        a: "Für einfache Fälle ja, aber sie ist meist zu pauschal und nennt keine konkreten Geheimnisse, keine Schutzmaßnahmen und keine Rückgabepflichten. Für die Beweisführung im Prozess nach dem GeschGehG brauchst du den Nachweis, dass der Mitarbeiter wusste, welche Informationen geheim sind und wie er sie schützen muss. Die gesonderte Erklärung liefert genau das.",
      },
      {
        q: "Wie lange gilt die Verschwiegenheit nach dem Ausscheiden?",
        a: "Für echte Geschäftsgeheimnisse zeitlich unbegrenzt, solange die Information geheim bleibt und wirtschaftlichen Wert hat. Für sonstige vertrauliche Informationen ohne Geheimnisqualität empfiehlt sich eine feste Frist von zwei bis fünf Jahren. Allgemeine Berufserfahrung und Branchenkenntnis bleiben immer frei verwendbar.",
      },
      {
        q: "Darf ich eine Vertragsstrafe vereinbaren?",
        a: "Ja, gegenüber Arbeitnehmern ist das trotz § 309 Nr. 6 BGB zulässig, weil das Arbeitsrecht Besonderheiten anerkennt. Die Strafe muss aber transparent formuliert und der Höhe nach angemessen sein; mehr als ein Bruttomonatsgehalt pro Verstoß ist riskant. Zusätzlich solltest du den Anspruch auf weitergehenden Schadensersatz ausdrücklich vorbehalten.",
      },
      {
        q: "Darf der Mitarbeiter Kundenlisten mitnehmen, wenn er kündigt?",
        a: "Nein. Kundenlisten mit Konditionen und Ansprechpartnern sind klassische Geschäftsgeheimnisse, und das Kopieren ist nach § 4 GeschGehG verboten, strafbar nach § 23 GeschGehG. Was er im Kopf behalten hat, darf er aber nutzen, solange er es nicht systematisch notiert oder kopiert hat. Deshalb regelt die Vorlage Rückgabe und Löschung ausdrücklich.",
      },
    ],
    seo: {
      title: "Verschwiegenheitserklärung Mitarbeiter Vorlage | GründerX",
      description:
        "Verschwiegenheitserklärung für Mitarbeiter als kostenlose Vorlage nach GeschGehG: Geschäftsgeheimnis, Pflichten, Dauer, Rückgabe, Vertragsstrafe. Word & PDF.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/verschwiegenheitserklaerung-mitarbeiter"),
  },
  {
    slug: "zielvereinbarung-bonus",
    titel: "Zielvereinbarung und Bonusregelung",
    kurz: "Zielvereinbarung mit SMART-Zielen, Gewichtung, Messung, Auszahlung, Regelung bei Eintritt, Austritt und Krankheit, rechtssicher ohne Freiwilligkeitsvorbehalt.",
    kategorie: "arbeit",
    dateiname: "Zielvereinbarung-Bonus",
    wofuer: [
      "Du willst Mitarbeitern im Vertrieb, Marketing oder in der Entwicklung eine variable Vergütung geben",
      "Als jährliche Anlage zum Arbeitsvertrag mit konkreten, messbaren Zielen",
      "Wenn du Bonusstreit beim Ausscheiden, bei Krankheit oder bei verfehlten Zielen vermeiden willst",
      "Für Teamziele, Unternehmensziele und individuelle Ziele in einem Dokument",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Zielbonus",
      "§ 2 Ziele für den Zeitraum (Unternehmens-, Team- und Einzelziele, SMART)",
      "§ 3 Gewichtung und Zielerreichungsstaffel",
      "§ 4 Messung, Datengrundlage und Feststellung",
      "§ 5 Auszahlung und Fälligkeit",
      "§ 6 Eintritt, Austritt, Elternzeit, Krankheit",
      "§ 7 Anpassung der Ziele bei veränderten Umständen",
      "§ 8 Verfahren für die nächste Zielperiode",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Kein Freiwilligkeitsvorbehalt: Ein Bonus, der als Gegenleistung für Arbeit versprochen wird, kann nicht gleichzeitig „freiwillig und ohne Rechtsanspruch“ sein; eine solche Klausel ist unwirksam und intransparent (BAG, Urteil vom 14.09.2011, 10 AZR 526/10). Die Vorlage verzichtet deshalb darauf und regelt stattdessen klar, was wann geschuldet ist.",
      "Keine Stichtagsklausel für erarbeitete Boni: Eine Regelung, nach der der Bonus nur bei ungekündigtem Arbeitsverhältnis am Auszahlungstag gezahlt wird, ist für leistungsbezogene Vergütung unwirksam (BAG, Urteil vom 13.11.2013, 10 AZR 848/12). Wer bis zum Austritt Ziele erreicht hat, bekommt den Bonus anteilig.",
      "Wenn du schuldhaft keine Ziele vereinbarst, kann der Mitarbeiter Schadensersatz in Höhe des Bonus bei 100 % Zielerreichung verlangen (BAG, Urteil vom 12.12.2007, 10 AZR 97/07). Deshalb enthält die Vorlage ein Verfahren mit Fristen und eine Regelung für den Fall, dass keine Einigung zustande kommt.",
      "Ziele müssen SMART sein: spezifisch, messbar, erreichbar, relevant und terminiert. „Kundenzufriedenheit verbessern“ ist kein Ziel, „NPS von 42 auf 50 bis 31.12.“ schon. Unklare Ziele gehen zu deinen Lasten.",
      "Der Zielbonus ist Arbeitsentgelt: sozialversicherungspflichtig, lohnsteuerpflichtig und beim Mindestlohn nur anrechenbar, wenn er monatlich gezahlt wird. Er gehört als Vergütungsbestandteil in den Nachweis nach § 2 NachwG.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Zielvereinbarung und Zielvorgabe?",
        a: "Bei der Zielvereinbarung legen beide Seiten die Ziele gemeinsam fest; bei der Zielvorgabe bestimmst du sie einseitig nach billigem Ermessen (§ 315 BGB). Die Vereinbarung motiviert mehr und hält vor Gericht besser, wenn sie fair zustande kam. Die Vorlage setzt auf Vereinbarung mit einem Auffangrecht zur Vorgabe, falls ihr euch nicht einigt.",
      },
      {
        q: "Was passiert mit dem Bonus, wenn der Mitarbeiter im Laufe des Jahres kündigt?",
        a: "Er bekommt den Bonus zeitanteilig für die Monate, die er gearbeitet hat, auf Basis der bis dahin feststellbaren Zielerreichung oder, wenn das nicht möglich ist, der Zielerreichung des Gesamtjahres. Eine Klausel, die den Bonus bei Kündigung ganz entfallen lässt, ist unwirksam. Die Vorlage regelt die Berechnung ausdrücklich.",
      },
      {
        q: "Darf ich den Bonus bei schlechter Geschäftslage streichen?",
        a: "Nur, wenn das Unternehmensergebnis selbst ein gewichtetes Ziel ist; dann sinkt der Bonus automatisch. Ein pauschaler Widerrufsvorbehalt wegen wirtschaftlicher Lage ist nur wirksam, wenn er die Gründe nennt und der widerrufliche Teil unter 25 % der Gesamtvergütung bleibt. Sicherer ist, das EBIT oder den Umsatz als Unternehmensziel zu gewichten.",
      },
      {
        q: "Wie hoch sollte der Zielbonus sein?",
        a: "Üblich sind 10 bis 20 % des Jahresgehalts bei Fachkräften, 20 bis 40 % im Vertrieb und bei Führungskräften. Wichtiger als die Höhe ist die Struktur: ein Teil Unternehmensziel, ein Teil Teamziel, ein Teil individuelle Ziele, jeweils mit einer Staffel von 80 bis 120 % Zielerreichung, damit auch knapp verfehlte und übertroffene Ziele abgebildet werden.",
      },
    ],
    seo: {
      title: "Zielvereinbarung Bonus Vorlage kostenlos (Word) | GründerX",
      description:
        "Zielvereinbarung und Bonusregelung als kostenlose Vorlage: SMART-Ziele, Gewichtung, Messung, Auszahlung, Eintritt und Austritt, ohne Freiwilligkeitsvorbehalt.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/zielvereinbarung-bonus"),
  },
];
