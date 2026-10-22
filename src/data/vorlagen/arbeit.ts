import { VORLAGEN_HINWEIS, type Vorlage } from "./types";

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
        a: "Nein, ein Arbeitsvertrag kommt auch mündlich zustande. Aber die wesentlichen Bedingungen musst du nach dem Nachweisgesetz spätestens am ersten Arbeitstag (Name, Gehalt, Arbeitszeit) und innerhalb von sieben Tagen bzw. einem Monat für den Rest aushändigen. Seit 2025 reicht dafür die Textform, wenn das Dokument speicherbar ist und der Arbeitnehmer einen Empfang bestätigt; die Kündigung braucht dagegen immer Papier und Unterschrift.",
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
      title: "Arbeitsvertrag Vorlage 2026 unbefristet (Word & PDF) | GründerX",
      description:
        "Unbefristeter Arbeitsvertrag als kostenlose Vorlage mit allen Pflichtangaben nach Nachweisgesetz: Probezeit, Gehalt, Urlaub, Kündigung. Word, PDF oder Text.",
    },
    stand: "2026-10",
    text: `Arbeitsvertrag

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
– nachfolgend „Arbeitnehmer“ –

§ 1 Beginn, Tätigkeit und Arbeitsort
(1) Der Arbeitnehmer wird ab dem [Datum] auf unbestimmte Zeit als [Berufsbezeichnung, z. B. „Online-Marketing-Manager“] eingestellt.
(2) Zu den Aufgaben gehören insbesondere: [kurze Beschreibung der Tätigkeit, z. B. „Planung und Steuerung von Werbekampagnen, Betreuung der Social-Media-Kanäle, Auswertung der Kennzahlen“]. Der Arbeitgeber kann dem Arbeitnehmer im Rahmen des billigen Ermessens (§ 106 GewO) auch andere gleichwertige Aufgaben übertragen, die seinen Kenntnissen und Fähigkeiten entsprechen.
(3) Arbeitsort ist [Straße, PLZ Ort]. Der Arbeitgeber kann den Arbeitnehmer vorübergehend auch an anderen Orten im Umkreis von [z. B. 50] km einsetzen, soweit dies betrieblich erforderlich und dem Arbeitnehmer zumutbar ist. [Optional: Mobiles Arbeiten wird in einer gesonderten Vereinbarung geregelt.]
(4) Auf das Arbeitsverhältnis finden keine Tarifverträge und keine Betriebsvereinbarungen Anwendung. [Alternativ: Auf das Arbeitsverhältnis findet der Tarifvertrag [Bezeichnung] in seiner jeweils gültigen Fassung Anwendung.]

§ 2 Probezeit
(1) Die ersten [z. B. 6, höchstens 6] Monate des Arbeitsverhältnisses gelten als Probezeit.
(2) Während der Probezeit kann das Arbeitsverhältnis von beiden Seiten mit einer Frist von zwei Wochen gekündigt werden (§ 622 Abs. 3 BGB).

§ 3 Arbeitszeit, Pausen und Überstunden
(1) Die regelmäßige Arbeitszeit beträgt [z. B. 40] Stunden pro Woche, verteilt auf die Wochentage Montag bis Freitag mit [z. B. 8] Stunden täglich. [Bei Teilzeit: Die Verteilung der Arbeitszeit auf die einzelnen Wochentage wird wie folgt festgelegt: [Tage und Stunden].]
(2) Beginn und Ende der täglichen Arbeitszeit sowie die Pausen richten sich nach den betrieblichen Regelungen; derzeit gilt eine Kernarbeitszeit von [z. B. 10:00] bis [z. B. 15:00] Uhr. Die gesetzlichen Ruhepausen (§ 4 ArbZG: 30 Minuten bei mehr als sechs Stunden, 45 Minuten bei mehr als neun Stunden) und die Ruhezeit von elf Stunden (§ 5 ArbZG) sind einzuhalten. Die Arbeitszeit wird vom Arbeitnehmer täglich im System [Bezeichnung] erfasst.
(3) Der Arbeitnehmer ist verpflichtet, bei betrieblicher Notwendigkeit (z. B. Auftragsspitzen, Projektabschluss, Vertretung) im gesetzlich zulässigen Rahmen Überstunden zu leisten, wenn der Arbeitgeber sie anordnet oder nachträglich genehmigt. Überstunden sind nur auf Anordnung oder mit Genehmigung des Arbeitgebers zulässig.
(4) Mit dem monatlichen Gehalt sind bis zu [z. B. 10] Überstunden im Kalendermonat abgegolten. Darüber hinausgehende Überstunden werden innerhalb von [z. B. 3] Monaten durch Freizeit ausgeglichen oder, wenn ein Ausgleich nicht möglich ist, mit dem anteiligen Bruttostundenlohn vergütet.

§ 4 Vergütung und Fälligkeit
(1) Der Arbeitnehmer erhält ein monatliches Bruttogehalt von [Betrag] EUR. [Bei Stundenlohn: Der Arbeitnehmer erhält einen Bruttostundenlohn von [Betrag, mindestens 13,90] EUR.] Das Gehalt wird zusammengesetzt aus [Grundgehalt [Betrag] EUR, Zulage [Bezeichnung] [Betrag] EUR] und ist jeweils am letzten Bankarbeitstag des laufenden Monats fällig. Die Zahlung erfolgt bargeldlos auf das vom Arbeitnehmer benannte Konto.
(2) [Optional: Der Arbeitnehmer erhält zusätzlich eine jährliche Sonderzahlung in Höhe von [Betrag] EUR brutto, fällig mit dem Gehalt für [Monat]. Die Sonderzahlung wird im Eintritts- und Austrittsjahr zeitanteilig gezahlt.] [Optional: Eine variable Vergütung wird in einer gesonderten Zielvereinbarung geregelt.]
(3) Zuschläge für Sonn-, Feiertags- und Nachtarbeit werden [nicht gezahlt / wie folgt gezahlt: [Prozentsatz]].
(4) Die Abtretung oder Verpfändung von Vergütungsansprüchen ist ausgeschlossen. Bei einer Lohnpfändung trägt der Arbeitnehmer die Bearbeitungskosten in nachgewiesener Höhe.
(5) Die Zahlung von Vergütungsbestandteilen, die nicht in diesem Vertrag vereinbart sind, erfolgt nur aufgrund gesonderter Vereinbarung.

§ 5 Urlaub
(1) Der Arbeitnehmer hat Anspruch auf [z. B. 28] Arbeitstage Erholungsurlaub im Kalenderjahr bei einer Fünf-Tage-Woche. Davon sind 20 Arbeitstage gesetzlicher Mindesturlaub nach dem Bundesurlaubsgesetz; die übrigen [z. B. 8] Tage sind vertraglicher Zusatzurlaub.
(2) Der Urlaub wird vom Arbeitgeber unter Berücksichtigung der Wünsche des Arbeitnehmers und der betrieblichen Belange festgelegt. Der Urlaubsantrag ist mindestens [z. B. 4] Wochen vor Urlaubsbeginn zu stellen.
(3) Im Eintritts- und Austrittsjahr wird der Urlaub zeitanteilig gewährt, soweit nicht § 5 BUrlG etwas anderes bestimmt. Der vertragliche Zusatzurlaub verfällt mit dem 31.03. des Folgejahres, wenn er nicht genommen wurde; für den gesetzlichen Urlaub gelten die gesetzlichen Regeln einschließlich der Hinweispflichten des Arbeitgebers.
(4) Endet das Arbeitsverhältnis, wird nicht genommener Urlaub abgegolten (§ 7 Abs. 4 BUrlG).

§ 6 Krankheit und Entgeltfortzahlung
(1) Der Arbeitnehmer teilt dem Arbeitgeber eine Arbeitsverhinderung und deren voraussichtliche Dauer unverzüglich, spätestens vor Beginn der Arbeitszeit am ersten Tag, mit.
(2) Dauert die Arbeitsunfähigkeit länger als drei Kalendertage, hat der Arbeitnehmer sie spätestens am darauffolgenden Arbeitstag ärztlich feststellen zu lassen; gesetzlich Versicherte lassen die Bescheinigung elektronisch übermitteln (eAU). Der Arbeitgeber kann die Feststellung auch früher verlangen.
(3) Die Entgeltfortzahlung richtet sich nach dem Entgeltfortzahlungsgesetz (sechs Wochen, nach vierwöchigem ununterbrochenem Bestehen des Arbeitsverhältnisses).

§ 7 Nebentätigkeit, Verschwiegenheit, Datenschutz
(1) Jede entgeltliche Nebentätigkeit ist dem Arbeitgeber vor Aufnahme in Textform anzuzeigen. Der Arbeitgeber kann die Nebentätigkeit untersagen, wenn berechtigte betriebliche Interessen entgegenstehen, insbesondere wenn sie die Arbeitsleistung beeinträchtigt, gegen das Arbeitszeitgesetz verstößt oder im Wettbewerb zum Arbeitgeber steht.
(2) Der Arbeitnehmer wird über alle Geschäfts- und Betriebsgeheimnisse sowie vertrauliche Angelegenheiten des Arbeitgebers, seiner Kunden und Geschäftspartner Stillschweigen bewahren, auch nach Beendigung des Arbeitsverhältnisses, solange und soweit ein berechtigtes Geheimhaltungsinteresse besteht. Die Rechte aus dem Geschäftsgeheimnisgesetz und dem Hinweisgeberschutzgesetz bleiben unberührt.
(3) Der Arbeitnehmer verpflichtet sich, die ihm zugänglichen personenbezogenen Daten nur im Rahmen seiner Aufgaben und nach Weisung des Arbeitgebers zu verarbeiten. Die Datenschutzinformation für Beschäftigte (Art. 13 DSGVO) hat der Arbeitnehmer erhalten.
(4) Der Arbeitnehmer ist verpflichtet, bei Beendigung des Arbeitsverhältnisses oder auf Verlangen alle Arbeitsmittel, Unterlagen, Zugangsdaten und Kopien an den Arbeitgeber herauszugeben; ein Zurückbehaltungsrecht besteht nicht.

§ 8 Fortbildung und betriebliche Altersversorgung
(1) Der Arbeitgeber bietet dem Arbeitnehmer die Teilnahme an betrieblich erforderlichen Fortbildungen an; die Kosten trägt der Arbeitgeber, die Teilnahmezeit gilt als Arbeitszeit. [Optional: Für Fortbildungen mit Kosten über [Betrag] EUR wird eine gesonderte Rückzahlungsvereinbarung geschlossen.]
(2) Der Arbeitnehmer hat das Recht, im Rahmen des § 1a BetrAVG einen Teil seines Entgelts in eine betriebliche Altersversorgung umzuwandeln. Versorgungsträger ist [Name und Anschrift des Versorgungsträgers, z. B. Direktversicherung bei [Versicherer]]. Der Arbeitgeber leistet den gesetzlichen Zuschuss von 15 % des umgewandelten Betrags, soweit er Sozialversicherungsbeiträge spart. [Alternativ, wenn noch kein Versorgungsträger besteht: Eine betriebliche Altersversorgung wird derzeit nicht angeboten; der gesetzliche Anspruch auf Entgeltumwandlung bleibt unberührt.]

§ 9 Kündigung und Kündigungsverfahren
(1) Nach Ablauf der Probezeit kann das Arbeitsverhältnis von beiden Seiten mit einer Frist von [z. B. 4 Wochen zum 15. oder zum Ende eines Kalendermonats / 3 Monaten zum Monatsende] gekündigt werden. Verlängert sich die gesetzliche Kündigungsfrist für den Arbeitgeber nach § 622 Abs. 2 BGB, gilt diese längere Frist auch für den Arbeitnehmer.
(2) Jede Kündigung bedarf der Schriftform (§ 623 BGB); E-Mail, Fax oder Messenger genügen nicht. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
(3) Hinweis auf das Kündigungsverfahren: Will der Arbeitnehmer geltend machen, dass eine Kündigung sozial ungerechtfertigt oder aus anderen Gründen unwirksam ist, muss er innerhalb von drei Wochen nach Zugang der schriftlichen Kündigung Klage beim Arbeitsgericht erheben (§ 4 KSchG). Wird die Frist versäumt, gilt die Kündigung als von Anfang an wirksam (§ 7 KSchG).
(4) Der Arbeitgeber kann den Arbeitnehmer nach Ausspruch einer Kündigung unter Fortzahlung der Vergütung und unter Anrechnung offener Urlaubs- und Freizeitausgleichsansprüche von der Arbeitsleistung freistellen.
(5) Das Arbeitsverhältnis endet ohne Kündigung spätestens mit Ablauf des Monats, in dem der Arbeitnehmer die Regelaltersgrenze der gesetzlichen Rentenversicherung erreicht.
(6) Der Arbeitnehmer ist verpflichtet, sich nach Zugang einer Kündigung unverzüglich, spätestens drei Monate vor Beendigung des Arbeitsverhältnisses, bei der Agentur für Arbeit arbeitsuchend zu melden (§ 38 Abs. 1 SGB III).

§ 10 Ausschlussfristen
(1) Alle Ansprüche aus dem Arbeitsverhältnis und solche, die mit dem Arbeitsverhältnis in Verbindung stehen, verfallen, wenn sie nicht innerhalb von drei Monaten nach Fälligkeit gegenüber der anderen Vertragspartei in Textform geltend gemacht werden.
(2) Lehnt die andere Partei den Anspruch ab oder erklärt sie sich nicht innerhalb eines Monats nach Geltendmachung, verfällt der Anspruch, wenn er nicht innerhalb von drei weiteren Monaten gerichtlich geltend gemacht wird.
(3) Die Ausschlussfristen gelten nicht für Ansprüche auf den gesetzlichen Mindestlohn, für Ansprüche aus der Haftung wegen Vorsatz, für Ansprüche wegen Verletzung des Lebens, des Körpers oder der Gesundheit sowie für sonstige Ansprüche, auf die gesetzlich nicht verzichtet werden kann.

§ 11 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform; dies gilt auch für die Änderung dieser Klausel. Individuelle mündliche Abreden nach Vertragsschluss bleiben wirksam (§ 305b BGB).
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Anstelle der unwirksamen Bestimmung gilt die gesetzliche Regelung.
(3) Der Arbeitnehmer bestätigt, eine unterschriebene Ausfertigung dieses Vertrags erhalten zu haben.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Arbeitgeber


______________________________
[Vorname Nachname]
Arbeitnehmer

${VORLAGEN_HINWEIS}`,
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
      title: "Befristeter Arbeitsvertrag Vorlage 2026 (Word & PDF) | GründerX",
      description:
        "Befristeter Arbeitsvertrag ohne Sachgrund als kostenlose Vorlage: § 14 TzBfG, max. 2 Jahre, Schriftform, Probezeit, Kündigung. Word, PDF oder Text.",
    },
    stand: "2026-10",
    text: `Befristeter Arbeitsvertrag

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
– nachfolgend „Arbeitnehmer“ –

§ 1 Befristung, Beginn und Ende
(1) Der Arbeitnehmer wird ab dem [Datum] befristet bis zum [Datum] eingestellt. Das Arbeitsverhältnis endet mit Ablauf dieses Tages, ohne dass es einer Kündigung bedarf.
(2) Die Befristung erfolgt ohne Sachgrund nach § 14 Abs. 2 TzBfG. Die Gesamtdauer einschließlich etwaiger Verlängerungen überschreitet zwei Jahre nicht. [Bei Existenzgründern: Die Befristung erfolgt nach § 14 Abs. 2a TzBfG; das Unternehmen wurde am [Datum] gegründet, die Gesamtdauer überschreitet vier Jahre nicht.] [Bei Verlängerung: Dieser Vertrag ist die [erste / zweite / dritte] Verlängerung des befristeten Arbeitsvertrags vom [Datum]; er schließt sich unmittelbar an dessen Ende an und ändert nur die Laufzeit.]
(3) Der Arbeitnehmer versichert, dass er zuvor noch nicht bei dem Arbeitgeber beschäftigt war, auch nicht als Werkstudent, Praktikant mit Arbeitnehmerstatus oder geringfügig Beschäftigter.
(4) Diese Befristungsabrede wird von beiden Parteien vor Aufnahme der Tätigkeit eigenhändig unterschrieben (§ 14 Abs. 4 TzBfG). Eine Fortsetzung des Arbeitsverhältnisses über den Befristungstermin hinaus bedarf einer schriftlichen Vereinbarung vor Ablauf der Befristung.

§ 2 Tätigkeit und Arbeitsort
(1) Der Arbeitnehmer wird als [Berufsbezeichnung] eingestellt. Zu den Aufgaben gehören insbesondere: [Beschreibung der Tätigkeit]. Der Arbeitgeber kann im Rahmen des billigen Ermessens (§ 106 GewO) auch andere gleichwertige Aufgaben übertragen.
(2) Arbeitsort ist [Straße, PLZ Ort]. [Optional: Mobiles Arbeiten wird in einer gesonderten Vereinbarung geregelt.]
(3) Auf das Arbeitsverhältnis finden keine Tarifverträge und keine Betriebsvereinbarungen Anwendung. [Alternativ: Es gilt der Tarifvertrag [Bezeichnung].]

§ 3 Probezeit und ordentliche Kündigung
(1) Die ersten [z. B. 3] Monate gelten als Probezeit. Sie steht im angemessenen Verhältnis zur Dauer der Befristung (§ 15 Abs. 3 TzBfG). In der Probezeit kann das Arbeitsverhältnis von beiden Seiten mit einer Frist von zwei Wochen gekündigt werden.
(2) Das befristete Arbeitsverhältnis kann auch nach der Probezeit von beiden Seiten vor Ablauf der Befristung ordentlich gekündigt werden (§ 15 Abs. 4 TzBfG). Die Kündigungsfrist beträgt [z. B. 4 Wochen zum 15. oder zum Ende eines Kalendermonats]; verlängerte gesetzliche Fristen nach § 622 Abs. 2 BGB gelten für beide Seiten.
(3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.

§ 4 Arbeitszeit und Überstunden
(1) Die regelmäßige Arbeitszeit beträgt [z. B. 40] Stunden pro Woche, verteilt auf Montag bis Freitag mit [z. B. 8] Stunden täglich. [Bei Teilzeit: Verteilung auf die Wochentage: [Tage und Stunden].]
(2) Beginn und Ende der täglichen Arbeitszeit und die Pausen richten sich nach den betrieblichen Regelungen; die gesetzlichen Ruhepausen und die Ruhezeit von elf Stunden nach dem Arbeitszeitgesetz sind einzuhalten. Die Arbeitszeit wird im System [Bezeichnung] erfasst.
(3) Bei betrieblicher Notwendigkeit ist der Arbeitnehmer verpflichtet, auf Anordnung des Arbeitgebers im gesetzlich zulässigen Rahmen Überstunden zu leisten. Bis zu [z. B. 8] Überstunden im Monat sind mit dem Gehalt abgegolten; weitere Überstunden werden innerhalb von [z. B. 3] Monaten durch Freizeit ausgeglichen oder mit dem anteiligen Bruttostundenlohn vergütet.

§ 5 Vergütung und Fälligkeit
(1) Der Arbeitnehmer erhält ein monatliches Bruttogehalt von [Betrag] EUR [bei Stundenlohn: einen Bruttostundenlohn von [Betrag, mindestens 13,90] EUR], fällig am letzten Bankarbeitstag des laufenden Monats, zahlbar bargeldlos auf das vom Arbeitnehmer benannte Konto.
(2) [Optional: Sonderzahlungen, Zulagen oder eine variable Vergütung: [Bezeichnung, Betrag, Fälligkeit]. Im Eintritts- und Austrittsjahr werden Sonderzahlungen zeitanteilig gezahlt.]
(3) Zuschläge für Sonn-, Feiertags- und Nachtarbeit werden [nicht gezahlt / wie folgt gezahlt: [Prozentsatz]].
(4) Die Abtretung und Verpfändung von Vergütungsansprüchen ist ausgeschlossen.

§ 6 Urlaub, Krankheit, Entgeltfortzahlung
(1) Der Arbeitnehmer hat Anspruch auf [z. B. 28] Arbeitstage Erholungsurlaub im Kalenderjahr bei einer Fünf-Tage-Woche, davon 20 Arbeitstage gesetzlicher Mindesturlaub. Im Eintritts- und Austrittsjahr sowie bei kürzerer Laufzeit wird der Urlaub zeitanteilig mit einem Zwölftel je vollen Monat gewährt, soweit § 5 BUrlG nichts anderes bestimmt. Der Urlaub wird unter Berücksichtigung der Wünsche des Arbeitnehmers und der betrieblichen Belange festgelegt; bei Ende des Arbeitsverhältnisses wird nicht genommener Urlaub abgegolten.
(2) Der Arbeitnehmer teilt eine Arbeitsverhinderung unverzüglich mit und lässt eine Arbeitsunfähigkeit, die länger als drei Kalendertage dauert, spätestens am darauffolgenden Arbeitstag ärztlich feststellen. Die Entgeltfortzahlung richtet sich nach dem Entgeltfortzahlungsgesetz.

§ 7 Nebentätigkeit, Verschwiegenheit, Datenschutz
(1) Entgeltliche Nebentätigkeiten sind dem Arbeitgeber vor Aufnahme in Textform anzuzeigen; er kann sie untersagen, wenn berechtigte betriebliche Interessen entgegenstehen.
(2) Der Arbeitnehmer bewahrt über Geschäfts- und Betriebsgeheimnisse sowie vertrauliche Angelegenheiten des Arbeitgebers, seiner Kunden und Partner Stillschweigen, auch nach Beendigung des Arbeitsverhältnisses, solange ein berechtigtes Geheimhaltungsinteresse besteht. Die Rechte aus dem Geschäftsgeheimnisgesetz und dem Hinweisgeberschutzgesetz bleiben unberührt.
(3) Personenbezogene Daten verarbeitet der Arbeitnehmer nur im Rahmen seiner Aufgaben und nach Weisung. Bei Beendigung sind alle Arbeitsmittel, Unterlagen und Zugangsdaten herauszugeben.

§ 8 Fortbildung und betriebliche Altersversorgung
(1) Betrieblich erforderliche Fortbildungen bietet der Arbeitgeber auf seine Kosten an; die Teilnahmezeit ist Arbeitszeit.
(2) Der Arbeitnehmer kann im Rahmen des § 1a BetrAVG Entgelt in eine betriebliche Altersversorgung umwandeln. Versorgungsträger ist [Name und Anschrift des Versorgungsträgers]. [Alternativ: Eine betriebliche Altersversorgung wird derzeit nicht angeboten; der gesetzliche Anspruch auf Entgeltumwandlung bleibt unberührt.]

§ 9 Kündigungsverfahren, Klagefrist, Meldepflicht
(1) Jede Kündigung bedarf der Schriftform (§ 623 BGB).
(2) Will der Arbeitnehmer geltend machen, dass eine Kündigung unwirksam ist, muss er innerhalb von drei Wochen nach Zugang der Kündigung Klage beim Arbeitsgericht erheben (§ 4 KSchG). Will er geltend machen, dass die Befristung unwirksam ist, muss er innerhalb von drei Wochen nach dem vereinbarten Ende des Arbeitsverhältnisses Klage erheben (§ 17 TzBfG).
(3) Der Arbeitnehmer ist verpflichtet, sich spätestens drei Monate vor dem Ende des befristeten Arbeitsverhältnisses bei der Agentur für Arbeit arbeitsuchend zu melden (§ 38 Abs. 1 SGB III).

§ 10 Ausschlussfristen
(1) Alle Ansprüche aus dem Arbeitsverhältnis verfallen, wenn sie nicht innerhalb von drei Monaten nach Fälligkeit gegenüber der anderen Partei in Textform geltend gemacht werden. Lehnt die andere Partei ab oder äußert sie sich nicht innerhalb eines Monats, verfällt der Anspruch, wenn er nicht innerhalb von drei weiteren Monaten gerichtlich geltend gemacht wird.
(2) Ausgenommen sind Ansprüche auf den gesetzlichen Mindestlohn, Ansprüche aus der Haftung wegen Vorsatz, wegen Verletzung des Lebens, des Körpers oder der Gesundheit sowie Ansprüche, auf die gesetzlich nicht verzichtet werden kann.

§ 11 Schlussbestimmungen
(1) Änderungen dieses Vertrags bedürfen der Textform; dies gilt auch für diese Klausel. Eine Verlängerung oder Änderung der Befristung bedarf stets der Schriftform.
(2) Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam; an die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Der Arbeitnehmer bestätigt, eine beidseitig unterschriebene Ausfertigung dieses Vertrags vor Arbeitsbeginn erhalten zu haben.

[Ort], den [Datum, vor dem ersten Arbeitstag]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Arbeitgeber


______________________________
[Vorname Nachname]
Arbeitnehmer

${VORLAGEN_HINWEIS}`,
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
      "Du zahlst als Arbeitgeber Pauschalabgaben von rund 30 % (13 % Krankenversicherung, 15 % Rentenversicherung, 2 % Pauschsteuer, Umlagen) an die Minijob-Zentrale. Die Anmeldung muss vor dem ersten Arbeitstag erfolgen; in bestimmten Branchen (z. B. Gastronomie, Logistik) zusätzlich als Sofortmeldung.",
      "Minijobber sind vollwertige Arbeitnehmer: Urlaub, Entgeltfortzahlung im Krankheitsfall, Feiertagsbezahlung, Kündigungsschutz und Mutterschutz gelten genauso wie bei Vollzeitkräften.",
      "Ohne feste Arbeitszeit gilt ein Abrufverhältnis mit 20 Stunden pro Woche als vereinbart (§ 12 Abs. 1 TzBfG), und die Verdienstgrenze wird gesprengt. Deshalb steht die wöchentliche Stundenzahl ausdrücklich im Vertrag.",
      "Die Rentenversicherungspflicht gilt automatisch (3,6 % Eigenanteil des Minijobbers). Eine Befreiung ist nur auf schriftlichen Antrag des Minijobbers möglich, den du der Minijob-Zentrale meldest und zu den Lohnunterlagen nimmst.",
    ],
    faqs: [
      {
        q: "Wie viele Stunden darf ein Minijobber 2026 arbeiten?",
        a: "Das hängt vom Stundenlohn ab. Beim Mindestlohn von 13,90 EUR sind es rund 43 Stunden im Monat, damit die Grenze von 603 EUR eingehalten wird. Zahlst du mehr, sinkt die Stundenzahl entsprechend. Einmalzahlungen wie Weihnachtsgeld werden auf das Jahr verteilt mitgerechnet: Entscheidend ist, dass im Jahresdurchschnitt 603 EUR im Monat nicht überschritten werden.",
      },
      {
        q: "Was passiert, wenn die Verdienstgrenze überschritten wird?",
        a: "Ein gelegentliches, nicht vorhersehbares Überschreiten (z. B. Krankheitsvertretung) ist bis zu zweimal im Jahr und bis zum doppelten Betrag erlaubt. Alles darüber macht die Beschäftigung ab dem Zeitpunkt sozialversicherungspflichtig, und zwar rückwirkend ab dem Monat, ab dem absehbar war, dass die Grenze gerissen wird. Dann drohen Nachzahlungen für beide Seiten.",
      },
      {
        q: "Muss ich dem Minijobber Urlaub und Lohnfortzahlung geben?",
        a: "Ja, Minijobber haben dieselben Rechte wie alle anderen Arbeitnehmer. Der Urlaub wird nach Arbeitstagen pro Woche berechnet: Bei zwei Arbeitstagen pro Woche sind das gesetzlich acht Tage im Jahr. Im Krankheitsfall zahlst du bis zu sechs Wochen weiter; die Minijob-Zentrale erstattet dir davon je nach Umlagesatz einen Großteil.",
      },
      {
        q: "Kann ein Minijobber mehrere Minijobs haben?",
        a: "Nur, wenn alle Minijobs zusammen unter 603 EUR bleiben. Neben einer sozialversicherungspflichtigen Hauptbeschäftigung ist genau ein Minijob abgabenfrei möglich; jeder weitere wird mit der Hauptbeschäftigung zusammengerechnet. Deshalb fragt die Vorlage weitere Beschäftigungen ab, und der Minijobber muss Änderungen melden.",
      },
    ],
    seo: {
      title: "Minijob-Vertrag Vorlage 2026: 603 € (Word & PDF) | GründerX",
      description:
        "Minijob-Vertrag als kostenlose Vorlage 2026: Verdienstgrenze 603 EUR, Mindestlohn 13,90 EUR, Urlaub, Rentenversicherung, Minijob-Zentrale. Word & PDF.",
    },
    stand: "2026-10",
    text: `Arbeitsvertrag über eine geringfügig entlohnte Beschäftigung (Minijob)

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort], Rentenversicherungsnummer [Nummer]
– nachfolgend „Arbeitnehmer“ –

§ 1 Beginn, Tätigkeit und Arbeitsort
(1) Der Arbeitnehmer wird ab dem [Datum] [auf unbestimmte Zeit / befristet bis zum [Datum] nach § 14 Abs. 2 TzBfG] als [Tätigkeit, z. B. „Aushilfe im Versand“] eingestellt.
(2) Zu den Aufgaben gehören insbesondere: [z. B. „Kommissionieren und Verpacken von Bestellungen, Annahme von Warenlieferungen, einfache Lagerarbeiten“]. Der Arbeitgeber kann im Rahmen des billigen Ermessens auch andere gleichwertige Tätigkeiten zuweisen.
(3) Arbeitsort ist [Straße, PLZ Ort].
(4) Tarifverträge oder Betriebsvereinbarungen finden auf das Arbeitsverhältnis keine Anwendung.

§ 2 Geringfügige Beschäftigung und Verdienstgrenze
(1) Die Beschäftigung ist eine geringfügig entlohnte Beschäftigung im Sinne des § 8 Abs. 1 Nr. 1 SGB IV. Das regelmäßige monatliche Arbeitsentgelt überschreitet die Geringfügigkeitsgrenze (im Jahr 2026: 603 EUR; die Grenze wird jährlich an den Mindestlohn angepasst) nicht.
(2) Beide Parteien achten darauf, dass das Arbeitsentgelt einschließlich etwaiger Einmalzahlungen im Jahresdurchschnitt die Geringfügigkeitsgrenze nicht übersteigt. Der Arbeitgeber meldet die Beschäftigung vor Arbeitsbeginn bei der Minijob-Zentrale (Deutsche Rentenversicherung Knappschaft-Bahn-See) an und führt die Pauschalabgaben ab.
(3) Ein unvorhersehbares Überschreiten der Grenze (z. B. durch Krankheitsvertretung) ist nur in höchstens zwei Kalendermonaten im Jahr und bis zur doppelten Geringfügigkeitsgrenze zulässig; darüber hinaus bedarf es einer vorherigen Absprache.

§ 3 Arbeitszeit und Abruf
(1) Die regelmäßige Arbeitszeit beträgt [z. B. 10] Stunden pro Woche. Sie wird auf die Wochentage [z. B. Montag und Donnerstag, jeweils 5 Stunden] verteilt. [Alternativ: Die Lage der Arbeitszeit wird jeweils [z. B. zwei Wochen] im Voraus in einem Dienstplan festgelegt; die Stundenzahl nach Satz 1 bleibt unverändert.]
(2) Die monatliche Arbeitszeit beträgt im Durchschnitt [z. B. 43] Stunden; das sich daraus ergebende Entgelt überschreitet die Geringfügigkeitsgrenze nicht.
(3) Zusätzliche Stunden leistet der Arbeitnehmer nur nach vorheriger Vereinbarung mit dem Arbeitgeber. Mehrarbeit wird mit dem vereinbarten Stundenlohn vergütet oder innerhalb von [z. B. 2] Monaten durch Freizeit ausgeglichen.
(4) Der Arbeitnehmer erfasst Beginn, Ende und Dauer der täglichen Arbeitszeit [im System / auf dem Stundenzettel] (§ 17 MiLoG). Der Arbeitgeber bewahrt die Aufzeichnungen zwei Jahre auf.

§ 4 Vergütung und Fälligkeit
(1) Der Arbeitnehmer erhält einen Bruttostundenlohn von [Betrag, mindestens 13,90] EUR. [Alternativ: ein monatliches Bruttoentgelt von [Betrag, höchstens 603] EUR für [Stunden] Stunden im Monat.] Der Stundenlohn beträgt stets mindestens den jeweils gültigen gesetzlichen Mindestlohn (13,90 EUR seit 01.01.2026, 14,60 EUR ab 01.01.2027).
(2) Das Entgelt ist jeweils am [z. B. 10.] des Folgemonats fällig und wird bargeldlos auf das vom Arbeitnehmer benannte Konto gezahlt. Der Arbeitgeber erteilt monatlich eine Entgeltabrechnung.
(3) [Optional: Der Arbeitnehmer erhält eine Sonderzahlung von [Betrag] EUR brutto mit der Abrechnung für [Monat]. Die Sonderzahlung wird bei der Prüfung der Geringfügigkeitsgrenze anteilig auf das Jahr verteilt berücksichtigt.]
(4) Die Besteuerung erfolgt pauschal durch den Arbeitgeber (2 % Pauschsteuer, § 40a Abs. 2 EStG). [Alternativ: Die Besteuerung erfolgt nach den individuellen Lohnsteuerabzugsmerkmalen des Arbeitnehmers.]

§ 5 Urlaub
(1) Der Arbeitnehmer hat Anspruch auf bezahlten Erholungsurlaub von [z. B. 8] Arbeitstagen im Kalenderjahr. Die Berechnung erfolgt anteilig nach den Arbeitstagen pro Woche: [z. B. 20 Urlaubstage bei Fünf-Tage-Woche ÷ 5 × 2 Arbeitstage = 8 Tage].
(2) Der Urlaub wird unter Berücksichtigung der Wünsche des Arbeitnehmers und der betrieblichen Belange festgelegt und ist mindestens [z. B. 2] Wochen vorher zu beantragen. Im Eintritts- und Austrittsjahr wird der Urlaub zeitanteilig gewährt, soweit § 5 BUrlG nichts anderes bestimmt.
(3) Bei Beendigung des Arbeitsverhältnisses wird nicht genommener Urlaub abgegolten.

§ 6 Krankheit, Feiertage, Entgeltfortzahlung
(1) Der Arbeitnehmer teilt eine Arbeitsverhinderung unverzüglich vor Beginn der Arbeitszeit mit. Dauert eine Arbeitsunfähigkeit länger als drei Kalendertage, ist sie spätestens am darauffolgenden Arbeitstag ärztlich feststellen zu lassen.
(2) Im Krankheitsfall wird das Entgelt nach dem Entgeltfortzahlungsgesetz bis zu sechs Wochen fortgezahlt. Für Arbeitszeit, die wegen eines gesetzlichen Feiertags ausfällt, wird das Entgelt gezahlt, das ohne den Feiertag angefallen wäre (§ 2 EFZG).

§ 7 Rentenversicherung und Befreiung
(1) Die Beschäftigung ist rentenversicherungspflichtig. Der Arbeitnehmer trägt die Differenz zwischen dem Pauschalbeitrag des Arbeitgebers (15 %) und dem vollen Beitragssatz der gesetzlichen Rentenversicherung (derzeit 3,6 % des Entgelts); dieser Anteil wird vom Entgelt einbehalten.
(2) Der Arbeitnehmer kann sich auf schriftlichen Antrag gegenüber dem Arbeitgeber von der Rentenversicherungspflicht befreien lassen (§ 6 Abs. 1b SGB VI). Die Befreiung wirkt ab dem Monat des Antrags, wenn der Arbeitgeber sie innerhalb von sechs Wochen der Minijob-Zentrale meldet, und gilt für die gesamte Dauer der Beschäftigung; sie kann nicht widerrufen werden. Der Arbeitgeber hat den Arbeitnehmer über die Folgen (keine vollen Pflichtbeitragszeiten, kein Anspruch auf Riester-Förderung) informiert.
(3) Der Arbeitnehmer erklärt hiermit: [Ich beantrage die Befreiung von der Rentenversicherungspflicht. / Ich beantrage keine Befreiung und zahle den Eigenanteil.]

§ 8 Weitere Beschäftigungen, Verschwiegenheit
(1) Der Arbeitnehmer erklärt, dass er [keine weitere Beschäftigung ausübt / folgende weitere Beschäftigungen ausübt: [Arbeitgeber, Entgelt, Art]]. [Ich übe eine sozialversicherungspflichtige Hauptbeschäftigung aus bei [Arbeitgeber]: ja / nein.] Die Aufnahme weiterer Beschäftigungen oder Änderungen ist dem Arbeitgeber unverzüglich mitzuteilen, da sie die Beurteilung der Geringfügigkeit beeinflussen.
(2) Der Arbeitnehmer bewahrt über Geschäfts- und Betriebsgeheimnisse sowie Kundendaten Stillschweigen, auch nach Beendigung des Arbeitsverhältnisses. Personenbezogene Daten verarbeitet er nur nach Weisung des Arbeitgebers.
(3) Bei Beendigung gibt der Arbeitnehmer Schlüssel, Arbeitsmittel und Unterlagen vollständig zurück.

§ 9 Probezeit, Kündigung, Klagefrist
(1) Die ersten [z. B. 3] Monate gelten als Probezeit mit einer beiderseitigen Kündigungsfrist von zwei Wochen. Danach beträgt die Kündigungsfrist vier Wochen zum 15. oder zum Ende eines Kalendermonats; verlängerte gesetzliche Fristen nach § 622 Abs. 2 BGB gelten für beide Seiten.
(2) Jede Kündigung bedarf der Schriftform (§ 623 BGB). Das Recht zur außerordentlichen Kündigung bleibt unberührt.
(3) Hinweis: Will der Arbeitnehmer die Unwirksamkeit einer Kündigung geltend machen, muss er innerhalb von drei Wochen nach Zugang Klage beim Arbeitsgericht erheben (§ 4 KSchG). Nach Zugang einer Kündigung hat er sich unverzüglich bei der Agentur für Arbeit arbeitsuchend zu melden (§ 38 SGB III).

§ 10 Ausschlussfristen und Schlussbestimmungen
(1) Ansprüche aus dem Arbeitsverhältnis verfallen, wenn sie nicht innerhalb von drei Monaten nach Fälligkeit in Textform gegenüber der anderen Partei geltend gemacht und, bei Ablehnung oder Schweigen über einen Monat, innerhalb von drei weiteren Monaten eingeklagt werden. Ausgenommen sind Ansprüche auf den gesetzlichen Mindestlohn, Ansprüche aus Haftung wegen Vorsatz oder wegen Verletzung von Leben, Körper oder Gesundheit sowie unverzichtbare Ansprüche.
(2) Änderungen dieses Vertrags bedürfen der Textform; das gilt auch für diese Klausel. Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam.
(3) Der Arbeitnehmer bestätigt, eine unterschriebene Ausfertigung dieses Vertrags und das Merkblatt der Minijob-Zentrale zur Rentenversicherung erhalten zu haben.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Arbeitgeber


______________________________
[Vorname Nachname]
Arbeitnehmer

${VORLAGEN_HINWEIS}`,
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
        a: "Ja, es gibt keine Verdienstgrenze. Ab 603,01 EUR ist er kein Minijobber mehr, sondern Werkstudent mit Rentenversicherungspflicht. Beachte aber die Familienversicherung: Übersteigt das Einkommen ein Siebtel der monatlichen Bezugsgröße (2025 waren das 535 EUR, der Wert steigt jährlich), fällt der Student aus der Familienversicherung der Eltern und muss sich selbst studentisch versichern.",
      },
      {
        q: "Was passiert, wenn der Student das Studium abbricht?",
        a: "Mit der Exmatrikulation endet das Werkstudentenprivileg, nicht automatisch der Arbeitsvertrag. Ab diesem Zeitpunkt ist die Beschäftigung voll sozialversicherungspflichtig. Die Vorlage verpflichtet den Studenten, die Exmatrikulation sofort zu melden, und gibt dir ein ordentliches Kündigungsrecht.",
      },
    ],
    seo: {
      title: "Werkstudentenvertrag Vorlage 2026 (Word & PDF) | GründerX",
      description:
        "Werkstudentenvertrag als kostenlose Vorlage: 20-Stunden-Regel, Semesterferien, Immatrikulationsnachweis, Vergütung, Urlaub. Word, PDF oder Text.",
    },
    stand: "2026-10",
    text: `Arbeitsvertrag für Werkstudenten

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort], immatrikuliert an der [Hochschule] im Studiengang [Studiengang], Matrikelnummer [Nummer]
– nachfolgend „Werkstudent“ –

§ 1 Beginn, Tätigkeit und Arbeitsort
(1) Der Werkstudent wird ab dem [Datum] [auf unbestimmte Zeit / befristet bis zum [Datum] nach § 14 Abs. 2 TzBfG; die Befristung ist vor Arbeitsbeginn schriftlich vereinbart] als Werkstudent im Bereich [z. B. „Softwareentwicklung“] eingestellt.
(2) Zu den Aufgaben gehören insbesondere: [z. B. „Entwicklung und Test von Web-Anwendungen, Pflege der Dokumentation, Unterstützung des Teams bei Projekten“]. Der Arbeitgeber kann im Rahmen des billigen Ermessens (§ 106 GewO) gleichwertige Aufgaben zuweisen, die dem Ausbildungsstand des Werkstudenten entsprechen.
(3) Arbeitsort ist [Straße, PLZ Ort]. [Optional: Mobiles Arbeiten ist nach Absprache im Umfang von bis zu [z. B. 50] % der Arbeitszeit möglich; Einzelheiten regelt eine gesonderte Vereinbarung.]
(4) Tarifverträge und Betriebsvereinbarungen finden auf das Arbeitsverhältnis keine Anwendung.

§ 2 Werkstudentenstatus und Nachweispflichten
(1) Der Werkstudent ist als ordentlich Studierender an einer staatlichen oder staatlich anerkannten Hochschule eingeschrieben. Das Studium steht im Vordergrund; die Beschäftigung ist ihm nach Zeit und Umfang untergeordnet (Werkstudentenprivileg, § 6 Abs. 1 Nr. 3 SGB V, § 27 Abs. 4 SGB III).
(2) Der Werkstudent legt bei Vertragsschluss und danach unaufgefordert zu Beginn jedes Semesters, spätestens bis zum [z. B. 15.04. bzw. 15.10.], eine aktuelle Immatrikulationsbescheinigung vor.
(3) Der Werkstudent teilt dem Arbeitgeber unverzüglich mit, wenn er exmatrikuliert wird, ein Urlaubssemester nimmt, das Studium abschließt oder abbricht, in ein Promotionsstudium wechselt, das 25. Fachsemester überschreitet oder weitere Beschäftigungen aufnimmt. Diese Umstände beeinflussen die sozialversicherungsrechtliche Beurteilung.
(4) Fällt das Werkstudentenprivileg weg, wird die Beschäftigung als reguläre Teilzeitbeschäftigung sozialversicherungspflichtig fortgeführt, bis die Parteien eine Änderung vereinbaren oder das Arbeitsverhältnis beendet wird.

§ 3 Arbeitszeit in Vorlesungszeit und Semesterferien
(1) Während der Vorlesungszeit beträgt die regelmäßige Arbeitszeit [z. B. 16, höchstens 20] Stunden pro Woche. Die Lage der Arbeitszeit stimmen die Parteien unter Berücksichtigung des Stundenplans jeweils [z. B. monatlich] ab; der Stundenplan hat Vorrang vor betrieblichen Wünschen.
(2) In der vorlesungsfreien Zeit kann die Arbeitszeit nach Absprache auf bis zu [z. B. 40] Stunden pro Woche erhöht werden. Die Parteien achten darauf, dass der Werkstudent im Kalenderjahr nicht in mehr als 26 Wochen mehr als 20 Stunden pro Woche arbeitet. Die Erhöhung ist vorher in Textform zu vereinbaren und endet spätestens mit Beginn der Vorlesungszeit.
(3) Die Höchstgrenze von 20 Stunden pro Woche in der Vorlesungszeit darf nur überschritten werden, wenn die Mehrarbeit am Abend (nach [z. B. 18:00] Uhr), in der Nacht oder am Wochenende geleistet wird und die Grenze nach Absatz 2 Satz 2 eingehalten bleibt. Die Anordnung von Überstunden ist im Übrigen ausgeschlossen.
(4) Der Werkstudent erfasst Beginn, Ende und Dauer seiner täglichen Arbeitszeit [im System / auf dem Stundenzettel]. Die gesetzlichen Ruhepausen und Ruhezeiten nach dem Arbeitszeitgesetz sind einzuhalten.

§ 4 Vergütung und Fälligkeit
(1) Der Werkstudent erhält einen Bruttostundenlohn von [Betrag, mindestens 13,90] EUR [alternativ: ein monatliches Bruttogehalt von [Betrag] EUR für die in § 3 Abs. 1 vereinbarte Arbeitszeit; zusätzliche Stunden in der vorlesungsfreien Zeit werden mit [Betrag] EUR je Stunde vergütet]. Der Stundenlohn unterschreitet den jeweils gültigen gesetzlichen Mindestlohn nicht.
(2) Die Vergütung wird monatlich nachträglich auf Basis der erfassten Stunden abgerechnet und ist am [z. B. letzten Bankarbeitstag des Monats / 10. des Folgemonats] fällig; die Zahlung erfolgt bargeldlos auf das vom Werkstudenten benannte Konto.
(3) Die Beschäftigung ist rentenversicherungspflichtig; Beiträge zur Kranken-, Pflege- und Arbeitslosenversicherung fallen nicht an, solange das Werkstudentenprivileg besteht. Der Werkstudent ist selbst für seine Krankenversicherung (studentische oder Familienversicherung) verantwortlich und weist sie auf Verlangen nach.
(4) [Optional: Sonderzahlungen: [Bezeichnung, Betrag, Fälligkeit].] Zuschläge für Sonn-, Feiertags- und Nachtarbeit werden [nicht / wie folgt: [Prozentsatz]] gezahlt.

§ 5 Urlaub und Prüfungszeiten
(1) Der Werkstudent hat Anspruch auf bezahlten Erholungsurlaub von [z. B. 12] Arbeitstagen im Kalenderjahr bei einer [z. B. Drei]-Tage-Woche. Der Anspruch wird nach dem Verhältnis der Arbeitstage pro Woche zu einer Fünf-Tage-Woche mit [z. B. 20] Tagen berechnet. Ändert sich die Zahl der wöchentlichen Arbeitstage, wird der Urlaub für die Folgezeit angepasst.
(2) Der Urlaub wird unter Berücksichtigung der Wünsche des Werkstudenten und der betrieblichen Belange festgelegt; im Eintritts- und Austrittsjahr wird er zeitanteilig gewährt, soweit § 5 BUrlG nichts anderes bestimmt. Bei Beendigung wird nicht genommener Urlaub abgegolten.
(3) Für Prüfungen, Pflichtveranstaltungen und Exkursionen stellt der Arbeitgeber den Werkstudenten auf rechtzeitigen Antrag (mindestens [z. B. 2] Wochen vorher) unbezahlt frei. [Optional: Je Semester werden bis zu [z. B. 3] bezahlte Freistellungstage für Prüfungstage gewährt.]

§ 6 Krankheit und Entgeltfortzahlung
(1) Der Werkstudent teilt eine Arbeitsverhinderung unverzüglich vor Beginn der Arbeitszeit mit und lässt eine Arbeitsunfähigkeit, die länger als drei Kalendertage dauert, spätestens am darauffolgenden Arbeitstag ärztlich feststellen.
(2) Die Entgeltfortzahlung im Krankheitsfall richtet sich nach dem Entgeltfortzahlungsgesetz. Bei Stundenlohn wird der Durchschnitt der letzten [z. B. 3] Monate zugrunde gelegt.

§ 7 Verschwiegenheit, Arbeitsergebnisse, Datenschutz
(1) Der Werkstudent bewahrt über Geschäfts- und Betriebsgeheimnisse, Quellcode, Kundendaten und vertrauliche Angelegenheiten des Arbeitgebers Stillschweigen, auch nach Beendigung des Arbeitsverhältnisses, solange ein berechtigtes Geheimhaltungsinteresse besteht. Die Rechte aus dem Geschäftsgeheimnisgesetz und dem Hinweisgeberschutzgesetz bleiben unberührt.
(2) Alle Arbeitsergebnisse, die der Werkstudent in Erfüllung seiner Aufgaben schafft (insbesondere Software, Texte, Grafiken, Konzepte), stehen dem Arbeitgeber zu. Der Werkstudent räumt dem Arbeitgeber daran das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte Nutzungsrecht ein; für Software gilt § 69b UrhG. Die Vergütung nach § 4 gilt diese Rechteeinräumung ab, soweit gesetzlich zulässig. Erfindungen unterliegen dem Arbeitnehmererfindungsgesetz.
(3) Die Verwendung von Arbeitsergebnissen oder Unternehmensdaten für Abschluss- oder Seminararbeiten bedarf der vorherigen Zustimmung des Arbeitgebers in Textform.
(4) Personenbezogene Daten verarbeitet der Werkstudent nur im Rahmen seiner Aufgaben und nach Weisung des Arbeitgebers. Bei Beendigung gibt er alle Arbeitsmittel, Zugangsdaten und Unterlagen zurück und löscht lokale Kopien.

§ 8 Probezeit, Kündigung, Ende des Studiums
(1) Die ersten [z. B. 3, höchstens 6] Monate gelten als Probezeit mit einer beiderseitigen Kündigungsfrist von zwei Wochen.
(2) Danach kann das Arbeitsverhältnis von beiden Seiten mit einer Frist von [z. B. 4 Wochen zum 15. oder zum Ende eines Kalendermonats] gekündigt werden; verlängerte gesetzliche Fristen nach § 622 Abs. 2 BGB gelten für beide Seiten. [Bei Befristung: Das befristete Arbeitsverhältnis kann vor Ablauf der Befristung ordentlich gekündigt werden (§ 15 Abs. 4 TzBfG).]
(3) Jede Kündigung bedarf der Schriftform (§ 623 BGB). Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
(4) Hinweis auf das Kündigungsverfahren: Will der Werkstudent geltend machen, dass eine Kündigung unwirksam ist, muss er innerhalb von drei Wochen nach Zugang Klage beim Arbeitsgericht erheben (§ 4 KSchG). Nach Zugang einer Kündigung ist er verpflichtet, sich unverzüglich bei der Agentur für Arbeit arbeitsuchend zu melden (§ 38 SGB III).
(5) Endet das Studium durch Abschluss, Abbruch oder Exmatrikulation, teilen die Parteien einander unverzüglich mit, ob sie das Arbeitsverhältnis als reguläres Arbeitsverhältnis fortsetzen wollen. Kommt keine Einigung zustande, kann jede Seite ordentlich nach Absatz 2 kündigen.

§ 9 Ausschlussfristen und Schlussbestimmungen
(1) Ansprüche aus dem Arbeitsverhältnis verfallen, wenn sie nicht innerhalb von drei Monaten nach Fälligkeit in Textform gegenüber der anderen Partei geltend gemacht und, bei Ablehnung oder Schweigen über einen Monat, innerhalb von drei weiteren Monaten eingeklagt werden. Ausgenommen sind Ansprüche auf den gesetzlichen Mindestlohn, Ansprüche aus Haftung wegen Vorsatz oder wegen Verletzung von Leben, Körper oder Gesundheit sowie unverzichtbare Ansprüche.
(2) Fortbildung und betriebliche Altersversorgung: Betrieblich erforderliche Fortbildungen bietet der Arbeitgeber auf seine Kosten an. Der Anspruch auf Entgeltumwandlung nach § 1a BetrAVG bleibt unberührt; Versorgungsträger ist [Name und Anschrift / derzeit nicht eingerichtet].
(3) Änderungen dieses Vertrags bedürfen der Textform; das gilt auch für diese Klausel. Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam.
(4) Der Werkstudent bestätigt, eine unterschriebene Ausfertigung dieses Vertrags erhalten zu haben.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Arbeitgeber


______________________________
[Vorname Nachname]
Werkstudent

${VORLAGEN_HINWEIS}`,
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
      "Freiwillige Praktikanten sind „zur Berufsbildung Beschäftigte“ nach § 26 BBiG: Der Vertrag muss schriftlich sein, es gibt Urlaub, Entgeltfortzahlung und einen Zeugnisanspruch. Eine Kündigung nach der Probezeit ist nur aus wichtigem Grund oder durch den Praktikanten mit vier Wochen Frist möglich (§ 22 BBiG).",
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
        a: "Ja. Für freiwillige Praktika verlangt § 26 in Verbindung mit § 11 BBiG eine schriftliche Niederlegung der wesentlichen Inhalte, und das Nachweisgesetz nennt in § 2 Abs. 1a Pflichtangaben für Praktikanten: Lern- und Ausbildungsziele, Beginn, Dauer, tägliche Praktikumszeit, Vergütung, Urlaub und Tarifhinweise. Diese Vorlage enthält alle Punkte.",
      },
      {
        q: "Hat ein Praktikant Anspruch auf ein Zeugnis?",
        a: "Ja, nach § 16 BBiG hat jeder Praktikant Anspruch auf ein schriftliches Zeugnis mit Art, Dauer und Ziel des Praktikums sowie den erworbenen Fähigkeiten. Auf Verlangen wird es um Leistung und Verhalten ergänzt (qualifiziertes Zeugnis). Für Pflichtpraktika verlangt die Hochschule zusätzlich meist eine Bescheinigung über die abgeleisteten Wochen.",
      },
    ],
    seo: {
      title: "Praktikumsvertrag Vorlage 2026 (Word & PDF) | GründerX",
      description:
        "Praktikumsvertrag als kostenlose Vorlage für Pflicht- und freiwillige Praktika: Lernziele, Dauer, Mindestlohn, Betreuung, Zeugnis. Word, PDF oder Text.",
    },
    stand: "2026-10",
    text: `Praktikumsvertrag

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Unternehmen“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
[bei Minderjährigen: gesetzlich vertreten durch [Vorname Nachname der Eltern]]
– nachfolgend „Praktikant“ –

§ 1 Art und Zweck des Praktikums
(1) Das Unternehmen nimmt den Praktikanten zu einem Praktikum im Bereich [z. B. „Online-Marketing“] auf.
(2) Art des Praktikums (Zutreffendes ankreuzen oder streichen):
   [ ] Pflichtpraktikum nach der [Studien- / Prüfungs- / Ausbildungs-]Ordnung der [Hochschule / Schule], [Bezeichnung und Paragraf der Ordnung], vorgeschriebene Dauer [Wochen] Wochen.
   [ ] Freiwilliges Praktikum zur Orientierung für eine Berufsausbildung oder ein Studium, Dauer höchstens drei Monate.
   [ ] Freiwilliges Praktikum begleitend zu einem Studium oder einer Ausbildung, Dauer höchstens drei Monate.
   [ ] Freiwilliges Praktikum mit einer Dauer von mehr als drei Monaten (Mindestlohn gilt ab dem ersten Tag).
(3) Das Praktikum dient dem Erwerb praktischer Kenntnisse und Erfahrungen zur Vorbereitung auf eine berufliche Tätigkeit. Der Lernzweck steht im Vordergrund; der Praktikant wird nicht als Ersatz für eine reguläre Arbeitskraft eingesetzt. Es wird kein Arbeitsverhältnis begründet; auf freiwillige Praktika finden die §§ 10 bis 23 und 25 BBiG entsprechende Anwendung (§ 26 BBiG).

§ 2 Dauer, Probezeit und Arbeitszeit
(1) Das Praktikum beginnt am [Datum] und endet am [Datum], ohne dass es einer Kündigung bedarf. Die Dauer beträgt [Wochen] Wochen.
(2) Die ersten [z. B. 2, höchstens: bei Praktika bis 3 Monate angemessen kurz] Wochen gelten als Probezeit (§ 20 BBiG), in der beide Seiten jederzeit ohne Einhaltung einer Frist kündigen können.
(3) Die regelmäßige Praktikumszeit beträgt [z. B. 38] Stunden pro Woche, verteilt auf Montag bis Freitag von [z. B. 09:00] bis [z. B. 17:00] Uhr mit [z. B. 30] Minuten Pause. Die Vorschriften des Arbeitszeitgesetzes und, bei Minderjährigen, des Jugendarbeitsschutzgesetzes (höchstens 8 Stunden täglich und 40 Stunden wöchentlich, keine Arbeit vor 6:00 und nach 20:00 Uhr) sind einzuhalten. Überstunden werden nicht angeordnet.
(4) Der Praktikant erfasst seine Anwesenheitszeiten [im System / in einem Praktikumsnachweis], der wöchentlich vom Betreuer gegengezeichnet wird.

§ 3 Lern- und Ausbildungsziele
(1) Der Praktikant soll während des Praktikums insbesondere folgende Kenntnisse und Fähigkeiten erwerben:
   a) [z. B. „Aufbau und Auswertung von Social-Media-Kampagnen“],
   b) [z. B. „Grundlagen der Suchmaschinenoptimierung und des Content-Managements“],
   c) [z. B. „Einblick in Kundenkommunikation, Angebotserstellung und Projektabläufe“],
   d) [z. B. „Mitarbeit an einem eigenen Projekt: [Bezeichnung]“].
(2) Das Praktikum gliedert sich in folgende Abschnitte: [z. B. Woche 1 bis 2 Einarbeitung und Begleitung, Woche 3 bis 8 Mitarbeit in Projekten, Woche 9 bis 12 eigenes Projekt mit Abschlusspräsentation].
(3) Soweit eine Studien- oder Prüfungsordnung Inhalte vorschreibt, werden diese berücksichtigt; der Praktikant legt die Ordnung und etwaige Vorgaben der Hochschule bei Vertragsschluss vor.

§ 4 Vergütung
(1) [Bei Mindestlohnpflicht: Der Praktikant erhält eine Vergütung von [Betrag, mindestens 13,90] EUR brutto je Stunde, das sind bei der vereinbarten Praktikumszeit monatlich etwa [Betrag] EUR brutto. Der jeweils gültige gesetzliche Mindestlohn wird nicht unterschritten.]
[Bei Pflichtpraktikum oder freiwilligem Praktikum bis drei Monate: Der Praktikant erhält eine freiwillige monatliche Vergütung von [Betrag] EUR brutto. Ein gesetzlicher Mindestlohnanspruch besteht nach § 22 Abs. 1 MiLoG nicht. / Das Praktikum wird nicht vergütet.]
(2) Die Vergütung ist jeweils am [z. B. letzten Bankarbeitstag des Monats] fällig und wird bargeldlos auf das vom Praktikanten benannte Konto gezahlt.
(3) Das Unternehmen erstattet dem Praktikanten nachgewiesene Auslagen, die im Auftrag des Unternehmens entstehen. [Optional: Der Praktikant erhält ein Jobticket / eine Fahrtkostenpauschale von [Betrag] EUR monatlich.]
(4) Die sozialversicherungs- und steuerrechtliche Behandlung richtet sich nach der Art des Praktikums; das Unternehmen nimmt die erforderlichen Meldungen vor. Der Praktikant weist [bei Pflichtpraktikum: durch Bescheinigung der Hochschule] nach, dass das Praktikum vorgeschrieben ist.

§ 5 Pflichten des Unternehmens und Betreuung
(1) Das Unternehmen vermittelt dem Praktikanten die Kenntnisse und Fähigkeiten nach § 3 und überträgt ihm nur Aufgaben, die dem Zweck des Praktikums dienen.
(2) Betreuer des Praktikanten ist [Vorname Nachname, Funktion]. Der Betreuer weist den Praktikanten ein, steht für Fragen zur Verfügung, führt regelmäßig, mindestens [z. B. alle zwei Wochen], ein Feedbackgespräch und bewertet den Lernfortschritt. Bei Abwesenheit vertritt ihn [Vorname Nachname].
(3) Das Unternehmen stellt die erforderlichen Arbeitsmittel kostenlos zur Verfügung, unterweist den Praktikanten in Arbeitssicherheit und Datenschutz und meldet ihn bei der zuständigen Unfallversicherung an.
(4) Das Unternehmen stellt den Praktikanten für Prüfungen, Pflichtveranstaltungen der Hochschule und Berufsschulunterricht frei.

§ 6 Pflichten des Praktikanten
(1) Der Praktikant bemüht sich, die Lernziele zu erreichen, führt die ihm übertragenen Aufgaben sorgfältig aus, befolgt die Weisungen des Betreuers und hält die betrieblichen Ordnungen, Sicherheits- und Datenschutzvorschriften ein.
(2) Der Praktikant führt [einen Praktikumsbericht / ein Berichtsheft] nach den Vorgaben der [Hochschule / Schule] und legt ihn dem Betreuer regelmäßig vor. Das Unternehmen unterstützt die Erstellung und zeichnet den Bericht gegen.
(3) Arbeitsmittel, Unterlagen und Zugangsdaten behandelt der Praktikant sorgfältig und gibt sie bei Ende des Praktikums vollständig zurück.

§ 7 Urlaub, Krankheit, Fehlzeiten
(1) Der Praktikant hat Anspruch auf bezahlten Erholungsurlaub von [z. B. 2] Arbeitstagen je vollen Praktikumsmonat (anteilig aus [z. B. 20] Tagen bei einer Fünf-Tage-Woche, bei Minderjährigen nach § 19 JArbSchG). Der Urlaub wird in Abstimmung mit dem Betreuer genommen.
(2) Bei Krankheit informiert der Praktikant das Unternehmen unverzüglich vor Beginn der Praktikumszeit und legt bei einer Dauer von mehr als drei Kalendertagen eine ärztliche Bescheinigung vor. Bei vergüteten Praktika richtet sich die Fortzahlung der Vergütung nach dem Entgeltfortzahlungsgesetz.
(3) Fehlzeiten von mehr als [z. B. 10] Arbeitstagen werden auf Wunsch des Praktikanten nachgeholt, soweit die Praktikumsordnung dies verlangt und das Unternehmen dies ermöglichen kann; das Praktikum verlängert sich dann entsprechend. Bei freiwilligen Praktika bis drei Monate darf die Verlängerung die Drei-Monats-Grenze nicht überschreiten.

§ 8 Verschwiegenheit und Arbeitsergebnisse
(1) Der Praktikant bewahrt über Geschäfts- und Betriebsgeheimnisse, Kundendaten und vertrauliche Angelegenheiten des Unternehmens Stillschweigen, auch nach Ende des Praktikums, solange ein berechtigtes Geheimhaltungsinteresse besteht. Die Verwendung von Unternehmensinformationen im Praktikumsbericht oder in einer Abschlussarbeit bedarf der vorherigen Zustimmung des Unternehmens in Textform; das Unternehmen stimmt zu, soweit keine Geheimnisse offengelegt werden.
(2) An Arbeitsergebnissen, die der Praktikant im Rahmen des Praktikums schafft, räumt er dem Unternehmen das ausschließliche, zeitlich und räumlich unbeschränkte Nutzungsrecht ein. Der Praktikant darf seine Arbeitsergebnisse in anonymisierter Form in Bewerbungsunterlagen zeigen, soweit das Unternehmen nicht widerspricht.
(3) Der Praktikant verarbeitet personenbezogene Daten nur nach Weisung und wurde über die Datenschutzpflichten unterrichtet.

§ 9 Beendigung
(1) Das Praktikum endet mit Ablauf der in § 2 vereinbarten Zeit.
(2) Während der Probezeit kann das Praktikum von beiden Seiten jederzeit ohne Frist gekündigt werden. Nach der Probezeit kann es gekündigt werden
   a) von beiden Seiten aus wichtigem Grund ohne Einhaltung einer Frist,
   b) vom Praktikanten mit einer Frist von vier Wochen, wenn er die Ausbildung oder das Praktikum aufgeben oder sich für eine andere Berufstätigkeit ausbilden lassen will (§ 22 Abs. 2 BBiG).
(3) Jede Kündigung bedarf der Schriftform und muss im Fall des Absatzes 2 unter Angabe der Kündigungsgründe erfolgen.
(4) Bei vorzeitiger Beendigung erhält der Praktikant eine Bescheinigung über die bis dahin abgeleistete Zeit.

§ 10 Zeugnis und Schlussbestimmungen
(1) Bei Beendigung des Praktikums erteilt das Unternehmen dem Praktikanten ein schriftliches Zeugnis über Art, Dauer und Ziel des Praktikums sowie die erworbenen Fähigkeiten und Kenntnisse (§ 16 BBiG). Auf Verlangen des Praktikanten werden auch Leistung und Verhalten beurteilt. Für Pflichtpraktika stellt das Unternehmen zusätzlich die von der [Hochschule / Schule] verlangte Praktikumsbescheinigung aus.
(2) Tarifverträge und Betriebsvereinbarungen finden auf das Praktikum keine Anwendung. [Alternativ: Es gilt der Tarifvertrag [Bezeichnung].]
(3) Änderungen dieses Vertrags bedürfen der Schriftform. Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam.
(4) Der Praktikant [und seine gesetzlichen Vertreter] bestätigt, eine unterschriebene Ausfertigung dieses Vertrags erhalten zu haben.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Unternehmen


______________________________
[Vorname Nachname]
Praktikant


[______________________________
[Vorname Nachname], gesetzlicher Vertreter (bei Minderjährigen)]

${VORLAGEN_HINWEIS}`,
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
      title: "Kündigung Arbeitgeber Vorlage 2026 (Word & PDF) | GründerX",
      description:
        "Kündigungsschreiben für Arbeitgeber als kostenlose Vorlage: ordentliche Kündigung in und nach der Probezeit, Fristen, Schriftform, Resturlaub. Word & PDF.",
    },
    stand: "2026-10",
    text: `Kündigung des Arbeitsverhältnisses (ordentliche Kündigung durch den Arbeitgeber)

[Firma, Rechtsform]
[Straße, PLZ Ort]

[Vorname Nachname des Arbeitnehmers]
[Straße, PLZ Ort]

Persönlich übergeben / durch Boten zugestellt am [Datum]

[Ort], den [Datum]


VARIANTE A: KÜNDIGUNG IN DER PROBEZEIT

Betreff: Kündigung Ihres Arbeitsverhältnisses in der Probezeit

Sehr geehrte Frau / Sehr geehrter Herr [Nachname],

hiermit kündigen wir das mit Ihnen bestehende Arbeitsverhältnis vom [Datum des Arbeitsvertrags] innerhalb der vereinbarten Probezeit ordentlich und fristgerecht mit der Frist von zwei Wochen (§ 622 Abs. 3 BGB) zum [Datum, zwei Wochen nach Zugang], hilfsweise zum nächstmöglichen Zeitpunkt.

Wir bitten Sie, folgende Hinweise zu beachten:

1. Meldung bei der Agentur für Arbeit: Sie sind nach § 38 Abs. 1 SGB III verpflichtet, sich spätestens drei Tage nach Zugang dieser Kündigung persönlich bei der Agentur für Arbeit arbeitsuchend zu melden, da zwischen Zugang und Beendigung weniger als drei Monate liegen. Eine verspätete Meldung kann zu einer Sperrzeit beim Arbeitslosengeld führen. Bitte beachten Sie außerdem die Pflicht zur Eigenbemühung um eine neue Beschäftigung.

2. Resturlaub: Ihr noch offener Urlaubsanspruch beträgt nach unseren Unterlagen [Anzahl] Tage. [Wir gewähren Ihnen diesen Urlaub in der Zeit vom [Datum] bis [Datum]. / Wir stellen Sie ab dem [Datum] bis zum Ende des Arbeitsverhältnisses unwiderruflich unter Fortzahlung der Vergütung und unter Anrechnung Ihrer Urlaubsansprüche sowie etwaiger Freizeitausgleichsansprüche von der Arbeitsleistung frei.] Urlaub, der bis zum Beendigungstermin nicht genommen werden kann, wird mit der letzten Gehaltsabrechnung abgegolten.

3. Zeugnis und Arbeitspapiere: Sie erhalten mit der Schlussabrechnung Ihre Arbeitspapiere (elektronische Lohnsteuerbescheinigung, Meldebescheinigung zur Sozialversicherung, Arbeitsbescheinigung für die Agentur für Arbeit) und ein Arbeitszeugnis. Bitte teilen Sie uns mit, ob Sie ein einfaches oder ein qualifiziertes Zeugnis (§ 109 GewO) wünschen.

4. Rückgabe: Bitte geben Sie spätestens am letzten Arbeitstag alle Arbeitsmittel, Schlüssel, Zugangskarten, Unterlagen und Daten des Unternehmens an [Vorname Nachname, Funktion] zurück und löschen Sie dienstliche Daten auf privaten Geräten.

Wir danken Ihnen für Ihre Mitarbeit und wünschen Ihnen für Ihren weiteren beruflichen Weg alles Gute.

Mit freundlichen Grüßen


______________________________
[Vorname Nachname], [Geschäftsführer / Inhaber / Prokurist]
[Firma]
(eigenhändige Unterschrift im Original)


VARIANTE B: KÜNDIGUNG NACH DER PROBEZEIT

Betreff: Ordentliche Kündigung Ihres Arbeitsverhältnisses

Sehr geehrte Frau / Sehr geehrter Herr [Nachname],

hiermit kündigen wir das mit Ihnen bestehende Arbeitsverhältnis vom [Datum des Arbeitsvertrags] ordentlich und fristgerecht zum [Datum, z. B. 31.12.2026], hilfsweise zum nächstmöglichen Zeitpunkt.

Die Kündigungsfrist ergibt sich aus [§ 622 Abs. 1 BGB (vier Wochen zum 15. oder zum Ende eines Kalendermonats) / § 622 Abs. 2 BGB (bei [Anzahl] Jahren Betriebszugehörigkeit [Anzahl] Monate zum Monatsende) / § [Nummer] Ihres Arbeitsvertrags ([Frist])].

[Optional, falls Betriebsrat besteht: Der Betriebsrat wurde vor Ausspruch dieser Kündigung nach § 102 BetrVG angehört.]

Wir bitten Sie, folgende Hinweise zu beachten:

1. Meldung bei der Agentur für Arbeit: Sie sind nach § 38 Abs. 1 SGB III verpflichtet, sich spätestens drei Monate vor Beendigung des Arbeitsverhältnisses persönlich bei der Agentur für Arbeit arbeitsuchend zu melden. Liegen zwischen Zugang dieser Kündigung und dem Beendigungstermin weniger als drei Monate, haben Sie sich innerhalb von drei Tagen nach Zugang zu melden. Eine verspätete Meldung kann zu einer Sperrzeit beim Arbeitslosengeld führen. Sie sind außerdem verpflichtet, sich aktiv um eine neue Beschäftigung zu bemühen.

2. Resturlaub und Freistellung: Ihr noch offener Urlaubsanspruch beträgt nach unseren Unterlagen [Anzahl] Tage. [Wir gewähren Ihnen diesen Urlaub in der Zeit vom [Datum] bis [Datum]. / Wir stellen Sie ab dem [Datum] bis zum Ende des Arbeitsverhältnisses unwiderruflich unter Fortzahlung der Vergütung und unter Anrechnung Ihrer Urlaubsansprüche sowie etwaiger Freizeitausgleichsansprüche von der Arbeitsleistung frei. Während der Freistellung ist Ihnen die Aufnahme einer anderweitigen Tätigkeit gestattet; anderweitiger Verdienst wird nach § 615 Satz 2 BGB angerechnet.] Nicht nehmbarer Urlaub wird mit der Schlussabrechnung abgegolten (§ 7 Abs. 4 BUrlG).

3. Zeugnis und Arbeitspapiere: Mit der Schlussabrechnung erhalten Sie Ihre Arbeitspapiere und ein qualifiziertes Arbeitszeugnis (§ 109 GewO). Auf Wunsch stellen wir Ihnen vorab ein Zwischenzeugnis aus.

4. Rückgabe von Firmeneigentum: Bitte geben Sie spätestens am letzten Arbeitstag alle Arbeitsmittel (insbesondere [Laptop, Mobiltelefon, Schlüssel, Zugangskarten, Firmenwagen]), Unterlagen und Daten des Unternehmens an [Vorname Nachname, Funktion] zurück und löschen Sie dienstliche Daten auf privaten Geräten. Ein Zurückbehaltungsrecht besteht nicht.

5. Verschwiegenheit: Ihre Pflicht zur Verschwiegenheit über Geschäfts- und Betriebsgeheimnisse besteht auch nach Beendigung des Arbeitsverhältnisses fort.

[Optional: Betriebliche Altersversorgung: Über die Fortführung Ihrer Direktversicherung bei [Versorgungsträger] informieren wir Sie gesondert; Sie können den Vertrag privat fortführen.]

Wir danken Ihnen für Ihre Mitarbeit und wünschen Ihnen für Ihre berufliche und private Zukunft alles Gute.

Mit freundlichen Grüßen


______________________________
[Vorname Nachname], [Geschäftsführer / Inhaber / Prokurist]
[Firma]
(eigenhändige Unterschrift im Original)


EMPFANGSBESTÄTIGUNG (vom Arbeitnehmer zu unterschreiben, nur Zugang, kein Einverständnis)

Ich bestätige, das vorstehende Kündigungsschreiben im Original am [Datum] um [Uhrzeit] Uhr erhalten zu haben.

[Ort], den [Datum]

______________________________
[Vorname Nachname], Arbeitnehmer


ÜBERGABEPROTOKOLL (falls keine Empfangsbestätigung erteilt wird)

Das Kündigungsschreiben vom [Datum] wurde am [Datum] um [Uhrzeit] Uhr
[ ] dem Arbeitnehmer persönlich übergeben, Unterschrift verweigert,
[ ] durch den Boten [Vorname Nachname] in den Briefkasten [Anschrift] eingeworfen; der Bote hat das Schreiben zuvor gelesen und das Kuvert selbst verschlossen.

______________________________
[Vorname Nachname], Bote / Zeuge

${VORLAGEN_HINWEIS}`,
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
      title: "Aufhebungsvertrag Vorlage 2026 mit Abfindung | GründerX",
      description:
        "Aufhebungsvertrag als kostenlose Vorlage: Beendigungsdatum, Freistellung, Abfindung, Zeugnisnote, Erledigungsklausel, Hinweis Sperrzeit. Word & PDF.",
    },
    stand: "2026-10",
    text: `Aufhebungsvertrag

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
– nachfolgend „Arbeitnehmer“ –

Vorbemerkung
Der Arbeitnehmer ist seit dem [Datum] auf Grundlage des Arbeitsvertrags vom [Datum] als [Berufsbezeichnung] beim Arbeitgeber beschäftigt. Die Parteien sind sich einig, das Arbeitsverhältnis einvernehmlich zu beenden. [Die Beendigung erfolgt auf Veranlassung des Arbeitgebers zur Vermeidung einer ansonsten unvermeidbaren betriebsbedingten Kündigung, die zum selben Zeitpunkt ausgesprochen worden wäre. / Die Beendigung erfolgt auf Wunsch des Arbeitnehmers.] Der Arbeitgeber hat den Arbeitnehmer am [Datum] auf die Möglichkeit hingewiesen, sich vor Unterzeichnung rechtlich beraten zu lassen, und ihm eine Bedenkzeit bis zum [Datum] eingeräumt.

§ 1 Beendigung des Arbeitsverhältnisses
(1) Das Arbeitsverhältnis endet im gegenseitigen Einvernehmen mit Ablauf des [Datum, mindestens Ende der ordentlichen Kündigungsfrist].
(2) Der Beendigungstermin entspricht [der ordentlichen Kündigungsfrist des Arbeitgebers von [Dauer] nach § 622 Abs. 2 BGB / § [Nummer] des Arbeitsvertrags / einem späteren Zeitpunkt]. [Optional: Der Arbeitnehmer ist berechtigt, das Arbeitsverhältnis vor dem Beendigungstermin mit einer Ankündigungsfrist von [z. B. 1 Woche] vorzeitig zu beenden, wenn er ein neues Arbeitsverhältnis aufnimmt. In diesem Fall erhöht sich die Abfindung nach § 4 um [z. B. 50] % der bis zum ursprünglichen Beendigungstermin ersparten Bruttovergütung.]
(3) [Optional: Der Arbeitgeber nimmt die Kündigung vom [Datum] zurück; der Arbeitnehmer nimmt die Rücknahme an. / Die Parteien sind sich einig, dass die Kündigung vom [Datum] gegenstandslos ist.]

§ 2 Freistellung und Urlaub
(1) Der Arbeitnehmer wird ab dem [Datum] bis zum Beendigungstermin unwiderruflich unter Fortzahlung der vertragsgemäßen Vergütung von der Verpflichtung zur Arbeitsleistung freigestellt.
(2) Die Freistellung erfolgt unter Anrechnung sämtlicher noch offener Urlaubsansprüche (derzeit [Anzahl] Tage) sowie etwaiger Ansprüche auf Freizeitausgleich. Der Urlaub wird zu Beginn der Freistellung in natura gewährt; danach besteht kein Urlaubsanspruch mehr. Sollte der Arbeitnehmer während des Urlaubs arbeitsunfähig erkranken, gilt § 9 BUrlG.
(3) Während der Freistellung darf der Arbeitnehmer eine anderweitige Tätigkeit aufnehmen, soweit sie nicht im Wettbewerb zum Arbeitgeber steht. Anderweitiger Verdienst wird [nicht angerechnet / nach § 615 Satz 2 BGB angerechnet].
(4) Der Arbeitnehmer steht dem Arbeitgeber während der Freistellung für Rückfragen zur Übergabe seiner Aufgaben in angemessenem Umfang telefonisch oder per E-Mail zur Verfügung. Er übergibt seine laufenden Aufgaben bis zum [Datum] an [Vorname Nachname] und dokumentiert den Stand schriftlich.

§ 3 Vergütung bis zum Ende
(1) Der Arbeitgeber rechnet das Arbeitsverhältnis bis zum Beendigungstermin ordnungsgemäß auf Basis des bisherigen Bruttomonatsgehalts von [Betrag] EUR ab und zahlt die Vergütung zu den üblichen Terminen.
(2) [Variable Vergütung: Für das laufende Geschäftsjahr erhält der Arbeitnehmer eine anteilige variable Vergütung in Höhe von [Betrag] EUR brutto, fällig mit der Schlussabrechnung. Weitere Ansprüche auf Bonus, Provision oder Zielvergütung bestehen nicht. / Ansprüche auf variable Vergütung sind in der Abfindung berücksichtigt.]
(3) Etwaige Sachbezüge ([Firmenwagen, Diensthandy]) werden bis zum [Datum] gewährt; danach sind sie zurückzugeben.

§ 4 Abfindung
(1) Für den Verlust des Arbeitsplatzes zahlt der Arbeitgeber dem Arbeitnehmer in entsprechender Anwendung der §§ 9, 10 KSchG eine Abfindung in Höhe von [Betrag] EUR brutto. [Berechnung: [z. B. 0,5] Bruttomonatsgehälter je Beschäftigungsjahr bei [Anzahl] Jahren Betriebszugehörigkeit.]
(2) Die Abfindung ist mit der Schlussabrechnung, spätestens am [Datum], zur Zahlung fällig. Der Anspruch ist bereits mit Abschluss dieses Vertrags entstanden und vererblich.
(3) Die Abfindung wird nach den gesetzlichen Vorschriften versteuert; die Lohnsteuer wird vom Arbeitgeber einbehalten. Der Arbeitnehmer wurde darauf hingewiesen, dass eine ermäßigte Besteuerung nach § 34 EStG (Fünftelregelung) seit 2025 nur noch im Rahmen seiner Einkommensteuererklärung geltend gemacht werden kann. Sozialversicherungsbeiträge fallen auf die Abfindung nicht an.

§ 5 Zeugnis
(1) Der Arbeitgeber erteilt dem Arbeitnehmer zum Beendigungstermin ein wohlwollendes qualifiziertes Arbeitszeugnis, das sich auf Führung und Leistung erstreckt und die Gesamtbeurteilung „[stets zu unserer vollen Zufriedenheit (gut) / stets zu unserer vollsten Zufriedenheit (sehr gut)]“ enthält. Das Zeugnis enthält eine Dankes- und Bedauernsformel mit guten Wünschen für die Zukunft.
(2) Der Arbeitnehmer kann dem Arbeitgeber bis zum [Datum] einen Entwurf vorlegen, von dem der Arbeitgeber nur aus wichtigem Grund abweichen wird.
(3) Auf Wunsch erhält der Arbeitnehmer unverzüglich ein Zwischenzeugnis gleichen Inhalts.

§ 6 Rückgabe von Firmeneigentum und Daten
(1) Der Arbeitnehmer gibt spätestens am [Datum, z. B. Beginn der Freistellung] sämtliches Eigentum des Arbeitgebers zurück, insbesondere [Laptop, Mobiltelefon, Schlüssel, Zugangskarten, Firmenwagen mit Schlüsseln und Papieren], sowie alle Geschäftsunterlagen und Datenträger einschließlich Kopien. Ein Zurückbehaltungsrecht besteht nicht.
(2) Dienstliche Daten auf privaten Geräten und in privaten Cloud- oder E-Mail-Konten löscht der Arbeitnehmer nach Rückgabe und bestätigt die Löschung in Textform. Zugangsdaten zu Konten des Arbeitgebers (Social Media, Domains, Software) übergibt er vollständig.
(3) Der Arbeitgeber händigt dem Arbeitnehmer die Arbeitspapiere (elektronische Lohnsteuerbescheinigung, Meldebescheinigung zur Sozialversicherung, Arbeitsbescheinigung nach § 312 SGB III) mit der Schlussabrechnung aus.

§ 7 Verschwiegenheit und Stillschweigen
(1) Der Arbeitnehmer bewahrt über Geschäfts- und Betriebsgeheimnisse des Arbeitgebers auch nach Beendigung Stillschweigen; die Rechte aus dem Geschäftsgeheimnisgesetz und dem Hinweisgeberschutzgesetz bleiben unberührt.
(2) Beide Parteien bewahren über den Inhalt dieses Vertrags, insbesondere über die Höhe der Abfindung, Stillschweigen, soweit keine gesetzliche Offenbarungspflicht besteht (Finanzamt, Agentur für Arbeit, Berater, Ehegatte).
(3) Die Parteien äußern sich gegenüber Dritten nicht abfällig übereinander. Die Trennung wird intern und extern als einvernehmlich kommuniziert; der Wortlaut wird abgestimmt.
(4) [Optional: Ein nachvertragliches Wettbewerbsverbot wird nicht vereinbart. / Das nachvertragliche Wettbewerbsverbot aus § [Nummer] des Arbeitsvertrags wird einvernehmlich aufgehoben; Ansprüche auf Karenzentschädigung bestehen nicht.]

§ 8 Hinweise zur Sperrzeit und Sozialversicherung
(1) Der Arbeitgeber hat den Arbeitnehmer darauf hingewiesen, dass der Abschluss eines Aufhebungsvertrags zu einer Sperrzeit beim Arbeitslosengeld von bis zu zwölf Wochen (§ 159 SGB III) und zu einem Ruhen des Anspruchs (§ 158 SGB III) führen kann, dass die Anspruchsdauer sich entsprechend verkürzen kann und dass der Arbeitnehmer sich unverzüglich, spätestens drei Monate vor dem Beendigungstermin, bei der Agentur für Arbeit arbeitsuchend melden muss (§ 38 SGB III).
(2) Der Arbeitnehmer wurde darauf hingewiesen, dass er sich zu den Folgen für Arbeitslosengeld, Krankenversicherung und Steuern selbst bei der Agentur für Arbeit, der Krankenkasse und einem Steuerberater informieren sollte. Der Arbeitgeber übernimmt für sozial- und steuerrechtliche Folgen keine Gewähr.
(3) [Optional: Der Arbeitgeber stellt dem Arbeitnehmer auf Verlangen eine Bescheinigung aus, dass die Beendigung zur Vermeidung einer betriebsbedingten Kündigung erfolgt ist und die Kündigungsfrist eingehalten wurde.]

§ 9 Erledigungsklausel
(1) Mit Erfüllung dieses Vertrags sind sämtliche gegenseitigen finanziellen Ansprüche aus dem Arbeitsverhältnis und seiner Beendigung, gleich ob bekannt oder unbekannt, gleich aus welchem Rechtsgrund, erledigt und abgegolten.
(2) Ausgenommen sind Ansprüche, auf die nicht verzichtet werden kann (insbesondere gesetzlicher Mindesturlaub, gesetzlicher Mindestlohn, unverfallbare Anwartschaften auf betriebliche Altersversorgung), Ansprüche aus diesem Vertrag sowie Ansprüche wegen vorsätzlicher oder grob fahrlässiger Pflichtverletzung.
(3) [Optional: Der Arbeitnehmer verpflichtet sich, eine beim Arbeitsgericht [Ort] anhängige Kündigungsschutzklage (Az. [Aktenzeichen]) innerhalb einer Woche nach Unterzeichnung zurückzunehmen.]

§ 10 Schlussbestimmungen
(1) Dieser Vertrag bedarf der Schriftform (§ 623 BGB). Änderungen und Ergänzungen bedürfen ebenfalls der Schriftform; mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam. Die Parteien verpflichten sich, die unwirksame Bestimmung durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt; die Beendigung des Arbeitsverhältnisses nach § 1 bleibt davon unberührt.
(3) Der Arbeitnehmer bestätigt, dass er den Vertrag in Ruhe lesen konnte, auf die Möglichkeit rechtlicher Beratung hingewiesen wurde und ihm eine Bedenkzeit eingeräumt wurde. Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Arbeitgeber


______________________________
[Vorname Nachname]
Arbeitnehmer

${VORLAGEN_HINWEIS}`,
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
      "Der Mitarbeiter darf eine Gegendarstellung zur Personalakte geben (§ 83 Abs. 2 BetrVG, in Betrieben ohne Betriebsrat aus der Fürsorgepflicht) und kann auf Entfernung klagen, wenn die Abmahnung falsch oder zu unbestimmt ist. Nach Jahren ohne weitere Vorfälle verliert die Abmahnung ihre Wirkung.",
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
      title: "Abmahnung Arbeitnehmer Vorlage 2026 (Word & PDF) | GründerX",
      description:
        "Abmahnung Arbeitnehmer als kostenlose Vorlage: konkreter Sachverhalt, Pflichtverletzung, Kündigungsandrohung, Personalakte, Gegendarstellung. Word & PDF.",
    },
    stand: "2026-10",
    text: `Abmahnung

[Firma, Rechtsform]
[Straße, PLZ Ort]

[Vorname Nachname des Arbeitnehmers]
[Abteilung / Personalnummer]
[Straße, PLZ Ort]

Persönlich übergeben am [Datum]

[Ort], den [Datum]

Betreff: Abmahnung wegen [z. B. „unentschuldigten Fehlens am 14.10.2026“ / „wiederholter Verspätung am 06.10.2026 und 09.10.2026“ / „Nichtbeachtung der Weisung vom 02.10.2026“]

Sehr geehrte Frau / Sehr geehrter Herr [Nachname],

wir müssen Sie wegen des nachfolgend beschriebenen Verhaltens abmahnen.

1. Sachverhalt
Am [Datum, Wochentag] [sind Sie um [Uhrzeit] Uhr am Arbeitsplatz [Ort / Abteilung] erschienen, obwohl Ihre Arbeitszeit nach [Dienstplan / § [Nummer] des Arbeitsvertrags] um [Uhrzeit] Uhr beginnt. Sie waren damit [Anzahl] Minuten verspätet, ohne dies vorher anzukündigen oder nachträglich zu entschuldigen. / sind Sie der Arbeit ferngeblieben, ohne uns zu informieren und ohne eine Arbeitsunfähigkeit mitzuteilen oder nachzuweisen. Erst am [Datum] um [Uhrzeit] Uhr haben Sie sich telefonisch bei [Vorname Nachname] gemeldet. / hat Ihnen [Vorname Nachname, Funktion] um [Uhrzeit] Uhr die Weisung erteilt, [konkrete Weisung]. Sie haben die Ausführung mit den Worten „[Zitat]“ abgelehnt und die Aufgabe bis Arbeitsende um [Uhrzeit] Uhr nicht erledigt.]
Zeugen des Vorfalls sind [Vorname Nachname, Funktion] und [Vorname Nachname, Funktion]. [Belege: Zeiterfassung vom [Datum], E-Mail vom [Datum], Gesprächsnotiz vom [Datum].]
[Optional: In dem Gespräch am [Datum] haben wir Ihnen Gelegenheit gegeben, den Vorfall zu erklären. Sie haben angegeben: „[Zusammenfassung]“. Diese Erklärung rechtfertigt das Verhalten nicht, weil [Begründung].]

2. Pflichtverletzung
Mit diesem Verhalten haben Sie gegen Ihre arbeitsvertraglichen Pflichten verstoßen, und zwar gegen [§ [Nummer] Ihres Arbeitsvertrags (Arbeitszeit) / Ihre Pflicht aus § 5 Abs. 1 EFZG, eine Arbeitsunfähigkeit und deren voraussichtliche Dauer unverzüglich mitzuteilen / Ihre Pflicht, Weisungen des Arbeitgebers im Rahmen von § 106 GewO zu befolgen / die betriebliche Regelung [Bezeichnung] vom [Datum], die Ihnen am [Datum] ausgehändigt wurde]. [Bereits am [Datum] haben wir Sie in einem Gespräch auf dieses Verhalten hingewiesen.]
Wir sind nicht bereit, dieses Verhalten hinzunehmen. Es beeinträchtigt [den Betriebsablauf, die Zusammenarbeit im Team, die Termintreue gegenüber Kunden] und stellt eine erhebliche Verletzung Ihrer Vertragspflichten dar.

3. Aufforderung
Wir fordern Sie auf, Ihre arbeitsvertraglichen Pflichten künftig uneingeschränkt zu erfüllen, insbesondere [Ihre Arbeit pünktlich zum Beginn Ihrer Arbeitszeit aufzunehmen / eine Arbeitsverhinderung unverzüglich vor Arbeitsbeginn telefonisch bei [Vorname Nachname] zu melden und bei einer Dauer von mehr als drei Kalendertagen eine ärztliche Bescheinigung vorzulegen / Weisungen Ihrer Vorgesetzten zu befolgen und zugewiesene Aufgaben ordnungsgemäß und fristgerecht zu erledigen].

4. Androhung von Konsequenzen
Wir weisen Sie ausdrücklich darauf hin, dass wir im Wiederholungsfall oder bei einer vergleichbaren Pflichtverletzung arbeitsrechtliche Konsequenzen ziehen werden. Dies kann bis zur Kündigung Ihres Arbeitsverhältnisses führen, gegebenenfalls auch zur außerordentlichen Kündigung.

5. Personalakte und Gegendarstellung
Diese Abmahnung wird zu Ihrer Personalakte genommen. Sie haben das Recht, zu dieser Abmahnung eine schriftliche Gegendarstellung abzugeben, die ebenfalls zur Personalakte genommen wird. Sie können die Gegendarstellung jederzeit bei [Vorname Nachname, Funktion] einreichen; eine Frist hierfür besteht nicht. Sie haben außerdem das Recht, jederzeit Einsicht in Ihre Personalakte zu nehmen.

Wir hoffen, dass Sie dieses Schreiben zum Anlass nehmen, Ihr Verhalten zu ändern, und wir weiterhin gut zusammenarbeiten können. Für ein Gespräch stehen wir Ihnen gern zur Verfügung.

Mit freundlichen Grüßen


______________________________
[Vorname Nachname], [Geschäftsführer / Inhaber / Personalleiter]
[Firma]


EMPFANGSBESTÄTIGUNG

Ich bestätige, dieses Schreiben am [Datum] erhalten zu haben. Mit meiner Unterschrift erkenne ich den Inhalt nicht an.

______________________________
[Vorname Nachname], Arbeitnehmer


ÜBERGABEPROTOKOLL (falls die Empfangsbestätigung verweigert wird)

Die Abmahnung vom [Datum] wurde am [Datum] um [Uhrzeit] Uhr in [Raum / Ort] dem Arbeitnehmer im Beisein von [Vorname Nachname, Funktion] übergeben. Der Arbeitnehmer hat die Unterschrift der Empfangsbestätigung verweigert [und das Schreiben [mitgenommen / liegen gelassen; es wurde ihm anschließend per Boten zugestellt]].

______________________________
[Vorname Nachname], Zeuge


ANLAGE: MUSTER FÜR EINE GEGENDARSTELLUNG (zur Weitergabe an den Arbeitnehmer)

[Vorname Nachname des Arbeitnehmers]
An [Firma], z. Hd. [Vorname Nachname, Personalabteilung]

Gegendarstellung zur Abmahnung vom [Datum]

Zu der mir am [Datum] übergebenen Abmahnung nehme ich wie folgt Stellung:
[Darstellung des Sachverhalts aus Sicht des Arbeitnehmers, z. B. Gründe für die Verspätung, Nachweise, Zeugen.]
Ich bitte, diese Gegendarstellung zu meiner Personalakte zu nehmen (§ 83 Abs. 2 BetrVG). [Optional: Ich bitte um Entfernung der Abmahnung aus der Personalakte, weil [Begründung].]

[Ort], den [Datum]

______________________________
[Vorname Nachname]

${VORLAGEN_HINWEIS}`,
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
      "Das Zeugnis muss wahr und wohlwollend sein (§ 109 Abs. 2 GewO). Geheimzeichen, Formulierungen mit versteckter Bedeutung und Auslassungen wichtiger Punkte sind verboten. Fehlt etwa die Ehrlichkeit bei einem Kassierer oder das Verhalten gegenüber Vorgesetzten, liest jeder Personaler eine Abwertung.",
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
      title: "Arbeitszeugnis Vorlage 2026: qualifiziert, Note gut | GründerX",
      description:
        "Qualifiziertes Arbeitszeugnis als kostenlose Vorlage mit Note gut: Aufgaben, Leistung, Verhalten, Schlussformel und Zeugnissprache erklärt. Word & PDF.",
    },
    stand: "2026-10",
    text: `Arbeitszeugnis

[Firma, Rechtsform]
[Straße, PLZ Ort]
[Firmenbriefkopf mit Logo und Kontaktdaten]


Zeugnis
[Alternativ: Zwischenzeugnis]

Frau / Herr [Vorname Nachname], geboren am [Datum] in [Geburtsort], war vom [Datum] bis zum [Datum] in unserem Unternehmen als [Berufsbezeichnung, z. B. „Online-Marketing-Managerin“] beschäftigt. [Bei Zwischenzeugnis: ist seit dem [Datum] in unserem Unternehmen als [Berufsbezeichnung] beschäftigt.]

Die [Firma] ist ein [Jahr] gegründetes Unternehmen mit Sitz in [Ort], das [kurze Beschreibung, z. B. „einen Online-Shop für nachhaltige Sportbekleidung betreibt und Marken bei der Entwicklung von Direktvertriebskanälen berät“]. Mit [Anzahl] Mitarbeitenden betreut das Unternehmen [z. B. „Kunden in Deutschland, Österreich und der Schweiz“].

Frau / Herr [Nachname] war in der Abteilung [Bezeichnung] tätig und berichtete direkt an [Funktion, z. B. „die Geschäftsführung“]. [Zum [Datum] wurde sie / er zur / zum [Position] befördert und übernahm zusätzlich die fachliche Führung von [Anzahl] Mitarbeitenden.]

Ihr / Sein Aufgabengebiet umfasste im Wesentlichen:
– [z. B. „Planung, Umsetzung und Auswertung von Performance-Kampagnen auf Meta, Google und TikTok mit einem Jahresbudget von rund [Betrag] EUR“],
– [z. B. „Konzeption und Betreuung der Social-Media-Kanäle einschließlich Content-Planung und Community-Management“],
– [z. B. „Suchmaschinenoptimierung der Shop-Seiten und Steuerung externer Agenturen“],
– [z. B. „Aufbau des monatlichen Reportings für die Geschäftsführung und Ableitung von Maßnahmen“],
– [z. B. „Einarbeitung und fachliche Anleitung von Werkstudierenden und Praktikanten“].

Frau / Herr [Nachname] verfügt über ein fundiertes und umfassendes Fachwissen, das sie / er sicher und gewinnbringend in der Praxis einsetzte. Sie / Er arbeitete sich schnell in neue Themen ein und erweiterte ihre / seine Kenntnisse laufend, unter anderem durch [z. B. „die Zertifizierung als Google Ads Professional“]. Ihre / Seine Auffassungsgabe ist gut; auch komplexe Zusammenhänge erfasste sie / er rasch und entwickelte daraus praktikable Lösungen.

Sie / Er arbeitete stets sorgfältig, strukturiert und zuverlässig. Auch unter hoher Belastung, etwa in der Vorweihnachtszeit und bei Produkteinführungen, behielt sie / er den Überblick und erzielte termingerecht gute Ergebnisse. Frau / Herr [Nachname] zeigte ein hohes Maß an Eigeninitiative und Engagement, brachte regelmäßig eigene Ideen ein und setzte diese selbstständig um. Hervorzuheben ist [z. B. „die Neustrukturierung des Kampagnen-Reportings, mit der die Auswertungszeit um rund 40 Prozent gesenkt wurde“ / „der Aufbau des TikTok-Kanals auf über [Anzahl] Follower innerhalb eines Jahres“].

[Bei Führungsverantwortung: Ihre / Seine Mitarbeitenden führte sie / er zielorientiert und motivierend. Sie / Er verstand es, das Team zu guten Leistungen anzuleiten, und wurde als Führungskraft anerkannt und geschätzt.]

Die Leistungen von Frau / Herrn [Nachname] haben stets unsere volle Zufriedenheit gefunden.

Ihr / Sein Verhalten gegenüber Vorgesetzten, Kolleginnen und Kollegen sowie Kunden und Geschäftspartnern war stets einwandfrei. Sie / Er war im Team wegen ihrer / seiner hilfsbereiten, offenen und verbindlichen Art sehr geschätzt und trug zu einer guten Arbeitsatmosphäre bei. Von Kunden und Partnern wurde sie / er als kompetente und verlässliche Ansprechpartnerin / verlässlicher Ansprechpartner wahrgenommen.

Frau / Herr [Nachname] verlässt unser Unternehmen [auf eigenen Wunsch / im besten gegenseitigen Einvernehmen] zum [Datum], um sich beruflich neu zu orientieren. Wir bedauern ihr / sein Ausscheiden sehr und danken ihr / ihm für die stets gute und erfolgreiche Zusammenarbeit. Für ihren / seinen weiteren Berufs- und Lebensweg wünschen wir ihr / ihm alles Gute und weiterhin viel Erfolg.
[Bei Zwischenzeugnis: Dieses Zwischenzeugnis wird auf Wunsch von Frau / Herrn [Nachname] wegen [z. B. „des Wechsels der Vorgesetzten“] erteilt. Wir danken ihr / ihm für die bisherige gute Zusammenarbeit und freuen uns auf die weitere.]

[Ort], den [Datum, möglichst der letzte Arbeitstag]


______________________________
[Vorname Nachname]
[Geschäftsführer / Inhaber / Personalleitung]
[Firma]


ÜBERSICHT DER ZEUGNISSPRACHE (nicht Teil des Zeugnisses; vor dem Ausdruck entfernen)

Zusammenfassende Leistungsbewertung:
– sehr gut: „stets zu unserer vollsten Zufriedenheit“
– gut: „stets zu unserer vollen Zufriedenheit“ (diese Vorlage)
– befriedigend: „zu unserer vollen Zufriedenheit“ / „stets zu unserer Zufriedenheit“
– ausreichend: „zu unserer Zufriedenheit“
– mangelhaft: „im Großen und Ganzen zu unserer Zufriedenheit“
– ungenügend: „hat sich bemüht, den Anforderungen gerecht zu werden“

Verhaltensbeurteilung:
– sehr gut: „stets vorbildlich“
– gut: „stets einwandfrei“ (diese Vorlage) oder „vorbildlich“
– befriedigend: „einwandfrei“ / „stets korrekt“
– ausreichend: „korrekt“ / „ohne Beanstandung“

Reihenfolge der Personen: Vorgesetzte, Kolleginnen und Kollegen, Kunden. Jede Abweichung gilt als Hinweis.
Für die Note „gut“ gehören Fachwissen, Arbeitsweise, Belastbarkeit, Eigeninitiative, ein konkreter Erfolg, Verhalten und eine Schlussformel mit Dank, Bedauern und Zukunftswünschen ins Zeugnis. Was fehlt, wird als Schwäche gelesen.

${VORLAGEN_HINWEIS}`,
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
        a: "Nur mit deiner Zustimmung, und du solltest sie restriktiv erteilen. Schon wenige Wochen im EU-Ausland können Sozialversicherungs- und Steuerpflichten im anderen Land auslösen; innerhalb der EU ist ab 25 % Arbeitszeit im Wohnsitzstaat die Sozialversicherung dort fällig. Die Vorlage beschränkt mobiles Arbeiten auf Deutschland und erlaubt Ausnahmen nur nach Einzelfreigabe.",
      },
    ],
    seo: {
      title: "Homeoffice-Vereinbarung Vorlage 2026 (Word & PDF) | GründerX",
      description:
        "Homeoffice-Vereinbarung als kostenlose Vorlage: mobiles Arbeiten, Erreichbarkeit, Zeiterfassung, Ausstattung, Datenschutz, Widerruf. Word, PDF oder Text.",
    },
    stand: "2026-10",
    text: `Zusatzvereinbarung zum Arbeitsvertrag über mobiles Arbeiten (Homeoffice)

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], wohnhaft [Straße, PLZ Ort]
– nachfolgend „Arbeitnehmer“ –

§ 1 Gegenstand und Verhältnis zum Arbeitsvertrag
(1) Diese Vereinbarung ergänzt den Arbeitsvertrag vom [Datum]. Sie regelt, unter welchen Bedingungen der Arbeitnehmer seine Arbeitsleistung teilweise außerhalb der Betriebsstätte erbringen darf (mobiles Arbeiten).
(2) Mobiles Arbeiten ist die Erbringung der Arbeitsleistung an einem vom Arbeitnehmer gewählten Ort außerhalb des Betriebs, insbesondere in seiner Wohnung, unter Nutzung von Informations- und Kommunikationstechnik. Es handelt sich nicht um Telearbeit im Sinne des § 2 Abs. 7 ArbStättV; ein fest eingerichteter Telearbeitsplatz wird nicht vereinbart.
(3) Alle übrigen Regelungen des Arbeitsvertrags bleiben unverändert, insbesondere Tätigkeit, Arbeitszeitumfang, Vergütung und Urlaub. Betrieblicher Arbeitsort bleibt [Straße, PLZ Ort].
(4) Mobiles Arbeiten ist freiwillig; der Arbeitnehmer kann jederzeit im Betrieb arbeiten.

§ 2 Umfang, Ort und Präsenztage
(1) Der Arbeitnehmer darf an bis zu [z. B. 3] Arbeitstagen pro Woche mobil arbeiten. [Alternativ: bis zu [z. B. 60] % seiner monatlichen Arbeitszeit.] Die Tage werden [jeweils bis zum [z. B. Donnerstag] der Vorwoche mit [Vorname Nachname, Funktion] abgestimmt / fest auf [Wochentage] gelegt].
(2) An mindestens [z. B. 2] Tagen pro Woche, insbesondere am [z. B. Dienstag] (Teamtag), arbeitet der Arbeitnehmer im Betrieb. Der Arbeitgeber kann aus betrieblichen Gründen (Kundentermine, Workshops, Inventur, Einarbeitung neuer Kollegen, Störungen) mit einer Ankündigungsfrist von [z. B. 2] Arbeitstagen, in dringenden Fällen auch kurzfristiger, Anwesenheit im Betrieb anordnen.
(3) Mobiles Arbeiten erfolgt in der Wohnung des Arbeitnehmers oder an anderen Orten innerhalb Deutschlands, die den Anforderungen an Datenschutz und Arbeitsschutz nach §§ 5 und 6 genügen. Mobiles Arbeiten im Ausland ist nur nach vorheriger Freigabe des Arbeitgebers in Textform für den Einzelfall zulässig; der Arbeitgeber prüft dabei sozialversicherungs-, steuer- und aufenthaltsrechtliche Folgen.
(4) Der Arbeitnehmer stellt sicher, dass er während der mobilen Arbeit ungestört und konzentriert arbeiten kann. Betreuungspflichten und Arbeitsleistung dürfen nicht gleichzeitig wahrgenommen werden.

§ 3 Arbeitszeit, Erreichbarkeit und Zeiterfassung
(1) Die vertragliche Arbeitszeit und die betrieblichen Regelungen zur Arbeitszeit gelten auch beim mobilen Arbeiten. Die Vorschriften des Arbeitszeitgesetzes (Höchstarbeitszeit, Ruhepausen, Ruhezeit von elf Stunden, Sonn- und Feiertagsruhe) sind einzuhalten. Mehrarbeit ist nur nach vorheriger Anordnung oder Genehmigung zulässig.
(2) Während der Kernarbeitszeit von [z. B. 10:00] bis [z. B. 15:00] Uhr ist der Arbeitnehmer telefonisch, per E-Mail und über [z. B. Microsoft Teams / Slack] erreichbar. Außerhalb der Kernarbeitszeit verteilt er seine Arbeitszeit im Rahmen von [z. B. 07:00] bis [z. B. 20:00] Uhr frei. Er trägt seinen Status (verfügbar, Pause, abwesend) im Kalender bzw. Kommunikationstool ein.
(3) Außerhalb der Arbeitszeit, im Urlaub und bei Krankheit besteht keine Pflicht zur Erreichbarkeit. Der Arbeitgeber erwartet keine Reaktion auf Nachrichten außerhalb der Arbeitszeit.
(4) Der Arbeitnehmer erfasst Beginn, Ende und Pausen seiner täglichen Arbeitszeit im System [Bezeichnung] am selben Tag. Der Arbeitgeber ist zur Zeiterfassung gesetzlich verpflichtet (§ 3 Abs. 2 Nr. 1 ArbSchG) und kontrolliert die Aufzeichnungen stichprobenartig.
(5) Dienstreisen vom mobilen Arbeitsort aus werden wie Dienstreisen vom Betrieb behandelt; Fahrten zwischen Wohnung und Betrieb an Präsenztagen sind keine Dienstreisen.

§ 4 Ausstattung und Kostenerstattung
(1) Der Arbeitgeber stellt dem Arbeitnehmer für die mobile Arbeit folgende Arbeitsmittel leihweise zur Verfügung: [Laptop [Modell, Inventarnummer], Headset, Mobiltelefon, [Monitor, Tastatur, Maus, Dockingstation]]. Die Arbeitsmittel bleiben Eigentum des Arbeitgebers und dürfen nur dienstlich genutzt werden; [eine private Nutzung des Laptops in geringem Umfang ist gestattet / ausgeschlossen].
(2) Der Arbeitnehmer stellt einen geeigneten Arbeitsplatz, einen Internetanschluss mit ausreichender Bandbreite sowie Strom und Mobiliar selbst zur Verfügung.
(3) Zur Abgeltung der Kosten für Internet, Strom und Arbeitsplatz zahlt der Arbeitgeber eine monatliche Pauschale von [Betrag, z. B. 25] EUR, die mit dem Gehalt abgerechnet wird. [Alternativ: Eine gesonderte Kostenerstattung erfolgt nicht; die Parteien sind sich einig, dass die Ersparnis von Fahrtkosten und Fahrtzeit die Aufwendungen des Arbeitnehmers ausgleicht.] [Optional: Der Arbeitgeber erstattet einmalig bis zu [Betrag] EUR gegen Beleg für einen ergonomischen Bürostuhl / Schreibtisch; die Gegenstände gehen in das Eigentum des Arbeitnehmers über.]
(4) Verbrauchsmaterial (Papier, Toner) stellt der Arbeitgeber auf Anforderung. Dienstliche Ausdrucke sind auf das Nötige zu beschränken und nach § 5 zu entsorgen.
(5) Defekte und Verlust von Arbeitsmitteln meldet der Arbeitnehmer unverzüglich. Reparatur und Ersatz übernimmt der Arbeitgeber, soweit der Arbeitnehmer den Schaden nicht grob fahrlässig oder vorsätzlich verursacht hat. Bei Beendigung des mobilen Arbeitens oder des Arbeitsverhältnisses gibt der Arbeitnehmer alle Arbeitsmittel unverzüglich zurück.

§ 5 Datenschutz und IT-Sicherheit
(1) Der Arbeitnehmer wahrt beim mobilen Arbeiten die Vertraulichkeit von Geschäftsgeheimnissen und personenbezogenen Daten in gleicher Weise wie im Betrieb (Art. 32 DSGVO). Er hält die IT-Sicherheitsrichtlinie des Arbeitgebers vom [Datum] und folgende Mindestregeln ein:
   a) Nur die vom Arbeitgeber gestellten Geräte und freigegebene Software werden genutzt; private Geräte, private E-Mail-Konten und private Cloud-Speicher sind für dienstliche Daten ausgeschlossen.
   b) Der Zugriff auf Unternehmenssysteme erfolgt ausschließlich über [VPN / den gesicherten Zugang [Bezeichnung]] mit Zwei-Faktor-Authentifizierung. Passwörter werden nicht gespeichert oder weitergegeben.
   c) Bildschirme werden bei jedem Verlassen des Arbeitsplatzes gesperrt; Dritte, auch Familienmitglieder und Mitbewohner, dürfen keinen Einblick in dienstliche Daten erhalten. In öffentlichen Räumen (Zug, Café) werden keine vertraulichen Daten bearbeitet und keine vertraulichen Gespräche geführt; Blickschutzfolie ist zu verwenden.
   d) Öffentliche, ungesicherte WLAN-Netze werden nur über VPN genutzt.
   e) Papierunterlagen werden verschlossen aufbewahrt und ausschließlich im Betrieb oder mit einem Aktenvernichter der Sicherheitsstufe P-4 entsorgt.
   f) Datenschutzverletzungen (z. B. Verlust eines Geräts, Fehlversand, Einbruch) meldet der Arbeitnehmer unverzüglich, spätestens innerhalb von 24 Stunden, an [Vorname Nachname / datenschutz@[domain.de]], damit die 72-Stunden-Frist nach Art. 33 DSGVO eingehalten werden kann.
(2) Der Arbeitnehmer bestätigt, die Unterweisung zum Datenschutz und zur IT-Sicherheit am [Datum] erhalten zu haben, und nimmt an Auffrischungen teil.

§ 6 Arbeitsschutz und Unfallversicherung
(1) Die Vorschriften des Arbeitsschutzgesetzes gelten auch beim mobilen Arbeiten. Der Arbeitgeber hat die Gefährdungsbeurteilung für mobiles Arbeiten erstellt und den Arbeitnehmer am [Datum] zu ergonomischer Arbeitsplatzgestaltung, Bildschirmarbeit, Pausen und Bewegung unterwiesen.
(2) Der Arbeitnehmer richtet seinen mobilen Arbeitsplatz nach den Empfehlungen des Arbeitgebers ein (ausreichende Beleuchtung, geeigneter Stuhl und Tisch, Bildschirm in Augenhöhe, externe Tastatur bei längerer Arbeit) und füllt die Selbstauskunft „Checkliste mobiler Arbeitsplatz“ aus, die Anlage dieser Vereinbarung ist. Mängel meldet er dem Arbeitgeber.
(3) Beim mobilen Arbeiten besteht gesetzlicher Unfallversicherungsschutz im gleichen Umfang wie im Betrieb (§ 8 Abs. 1 Satz 3 SGB VII). Unfälle meldet der Arbeitnehmer unverzüglich an den Arbeitgeber.

§ 7 Zutritt zur Wohnung
(1) Der Arbeitgeber, seine Fachkraft für Arbeitssicherheit, der Datenschutzbeauftragte oder eine Aufsichtsbehörde können den mobilen Arbeitsplatz in der Wohnung des Arbeitnehmers nach vorheriger Ankündigung von mindestens [z. B. 5] Arbeitstagen und nur mit Zustimmung des Arbeitnehmers besichtigen, um die Einhaltung von Arbeitsschutz und Datenschutz zu prüfen.
(2) Der Arbeitnehmer wird die Zustimmung nicht ohne sachlichen Grund verweigern. Verweigert er den Zutritt dauerhaft, kann der Arbeitgeber das mobile Arbeiten nach § 9 widerrufen. Ein Zutritt gegen den Willen des Arbeitnehmers oder von Mitbewohnern findet nicht statt.

§ 8 Haftung
(1) Der Arbeitnehmer haftet für Schäden an Arbeitsmitteln und für Datenschutzverletzungen nach den Grundsätzen der beschränkten Arbeitnehmerhaftung (volle Haftung nur bei Vorsatz und grober Fahrlässigkeit).
(2) Für Schäden an privaten Gegenständen des Arbeitnehmers, die durch die dienstliche Nutzung entstehen, haftet der Arbeitgeber nur, wenn er sie zu vertreten hat oder sie typischerweise aus der Tätigkeit folgen.
(3) Für Schäden, die Dritte (Familienangehörige, Besucher) an Arbeitsmitteln verursachen, haftet der Arbeitnehmer wie für eigenes Verschulden, soweit er die Gegenstände nicht sorgfältig verwahrt hat.

§ 9 Dauer, Widerruf und Beendigung
(1) Diese Vereinbarung gilt ab dem [Datum] auf unbestimmte Zeit. [Optional: Sie wird zunächst für eine Erprobungsphase bis zum [Datum] geschlossen und verlängert sich danach auf unbestimmte Zeit, wenn keine Seite bis zum [Datum] in Textform widerspricht.]
(2) Jede Partei kann diese Vereinbarung mit einer Frist von [z. B. 4] Wochen zum Monatsende in Textform widerrufen. Der Arbeitgeber übt das Widerrufsrecht nach billigem Ermessen (§ 106 GewO, § 315 BGB) aus; ein Widerruf kommt insbesondere in Betracht bei
   a) betrieblichen Gründen wie Änderung der Aufgaben, Einführung neuer Prozesse oder Bedarf an Anwesenheit im Team,
   b) wiederholten Verstößen gegen die Regelungen zu Arbeitszeit, Erreichbarkeit, Datenschutz oder Arbeitsschutz,
   c) erheblichen Leistungsmängeln, die im Zusammenhang mit dem mobilen Arbeiten stehen,
   d) Wegfall der Voraussetzungen nach § 2 Abs. 3 und 4.
(3) Bei schwerwiegenden Verstößen, insbesondere gegen § 5, kann der Arbeitgeber das mobile Arbeiten mit sofortiger Wirkung aussetzen.
(4) Mit Beendigung dieser Vereinbarung arbeitet der Arbeitnehmer wieder vollständig im Betrieb. Die Vereinbarung endet außerdem automatisch mit dem Arbeitsverhältnis. Die Rückgabepflicht nach § 4 Abs. 5 gilt in jedem Fall.

§ 10 Schlussbestimmungen
(1) Änderungen dieser Vereinbarung bedürfen der Textform; das gilt auch für diese Klausel.
(2) Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam.
(3) Anlagen: Checkliste mobiler Arbeitsplatz (Selbstauskunft), IT-Sicherheitsrichtlinie vom [Datum], Übergabeprotokoll Arbeitsmittel. Der Arbeitnehmer bestätigt den Erhalt einer unterschriebenen Ausfertigung.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Arbeitgeber


______________________________
[Vorname Nachname]
Arbeitnehmer

${VORLAGEN_HINWEIS}`,
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
      title: "Verschwiegenheitserklärung Mitarbeiter Vorlage 2026 | GründerX",
      description:
        "Verschwiegenheitserklärung für Mitarbeiter als kostenlose Vorlage nach GeschGehG: Geschäftsgeheimnis, Pflichten, Dauer, Rückgabe, Vertragsstrafe. Word & PDF.",
    },
    stand: "2026-10",
    text: `Verschwiegenheitserklärung (Geheimhaltungsvereinbarung für Beschäftigte)

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], wohnhaft [Straße, PLZ Ort], beschäftigt als [Berufsbezeichnung / Werkstudent / Praktikant] seit dem [Datum]
– nachfolgend „Mitarbeiter“ –

§ 1 Zweck und Verhältnis zum Arbeitsvertrag
(1) Der Mitarbeiter erhält im Rahmen seiner Tätigkeit Zugang zu Geschäftsgeheimnissen und vertraulichen Informationen des Arbeitgebers, seiner Kunden und Geschäftspartner. Diese Vereinbarung konkretisiert die Verschwiegenheitspflicht aus dem Arbeitsvertrag vom [Datum] und ist eine angemessene Geheimhaltungsmaßnahme im Sinne des § 2 Nr. 1 Buchst. b GeschGehG.
(2) Die gesetzlichen Pflichten des Mitarbeiters, insbesondere aus § 241 Abs. 2 BGB, dem Geschäftsgeheimnisgesetz und dem Datenschutzrecht, bleiben neben dieser Vereinbarung bestehen.

§ 2 Begriff des Geschäftsgeheimnisses und vertraulicher Informationen
(1) Geschäftsgeheimnisse sind Informationen, die weder insgesamt noch in ihren Einzelheiten allgemein bekannt oder ohne Weiteres zugänglich sind, deshalb von wirtschaftlichem Wert sind, Gegenstand angemessener Geheimhaltungsmaßnahmen des Arbeitgebers sind und an deren Geheimhaltung ein berechtigtes Interesse besteht (§ 2 Nr. 1 GeschGehG). Hierzu gehören beim Arbeitgeber insbesondere:
   a) Kunden- und Interessentenlisten mit Ansprechpartnern, Konditionen, Umsätzen und Bestellhistorie,
   b) Einkaufsquellen, Lieferanten- und Herstellerkonditionen, Preiskalkulationen, Margen und Rabattstrukturen,
   c) Quellcode, Softwarearchitektur, Zugangsdaten, technische Dokumentation, Rezepturen, Konstruktionen und Verfahren,
   d) Geschäfts-, Finanz- und Marketingpläne, Umsatz- und Ertragszahlen, Investoren- und Finanzierungsunterlagen, Businesspläne,
   e) Produktentwicklungen, Prototypen, nicht veröffentlichte Marken-, Design- und Patentanmeldungen,
   f) Kampagnendaten, Werbekennzahlen, Conversion-Raten, Keyword-Listen und Auswertungen,
   g) [weitere unternehmensspezifische Informationen, z. B. „Rezeptur des Produkts [Bezeichnung]“].
(2) Vertrauliche Informationen sind darüber hinaus alle Informationen, die als „vertraulich“ gekennzeichnet sind oder bei denen sich die Vertraulichkeit aus der Natur der Information oder den Umständen ergibt, insbesondere interne Kommunikation, Personaldaten, Vertragsinhalte mit Kunden und Partnern sowie Informationen über Geschäftsbeziehungen.
(3) Nicht erfasst sind Informationen, die allgemein bekannt oder öffentlich zugänglich sind, ohne dass der Mitarbeiter dies zu vertreten hat, die der Mitarbeiter nachweislich bereits vor Beginn der Beschäftigung kannte, sowie das allgemeine berufliche Erfahrungswissen, die Fähigkeiten und Kenntnisse, die der Mitarbeiter während der Beschäftigung redlich erworben hat.

§ 3 Geheimhaltungspflichten
(1) Der Mitarbeiter verpflichtet sich, Geschäftsgeheimnisse und vertrauliche Informationen
   a) streng vertraulich zu behandeln und nicht an Dritte weiterzugeben oder zugänglich zu machen; Dritte sind auch Familienangehörige, Freunde und Mitarbeiter des Arbeitgebers, die die Information für ihre Aufgaben nicht benötigen,
   b) ausschließlich für die Erfüllung seiner arbeitsvertraglichen Aufgaben zu nutzen und nicht für eigene oder fremde Zwecke zu verwerten,
   c) nicht ohne dienstliche Notwendigkeit zu kopieren, zu fotografieren, abzuschreiben, auf private Geräte, private Cloud- oder E-Mail-Konten zu übertragen oder auf andere Weise zu vervielfältigen,
   d) nicht in sozialen Medien, Foren, Chats, Vorträgen, Bewerbungen oder Veröffentlichungen zu verwenden.
(2) Der Mitarbeiter wird Geschäftsgeheimnisse von Kunden, Lieferanten und Geschäftspartnern, die ihm im Rahmen seiner Tätigkeit anvertraut werden, in gleicher Weise schützen.
(3) Der Mitarbeiter wird ihm bekannt werdende Verstöße Dritter gegen die Geheimhaltung sowie den Verdacht eines unbefugten Zugriffs unverzüglich dem Arbeitgeber melden.

§ 4 Erlaubte Nutzung und Ausnahmen
(1) Die Weitergabe von Informationen ist erlaubt, soweit sie zur Erfüllung der Aufgaben des Mitarbeiters erforderlich ist und an Personen erfolgt, die ihrerseits zur Vertraulichkeit verpflichtet sind (Kollegen, beauftragte Dienstleister, Berater).
(2) Unberührt bleibt das Recht des Mitarbeiters, Geschäftsgeheimnisse offenzulegen, soweit dies zur Aufdeckung einer rechtswidrigen Handlung oder eines beruflichen oder sonstigen Fehlverhaltens erforderlich ist und geeignet ist, das allgemeine öffentliche Interesse zu schützen (§ 5 Nr. 2 GeschGehG), sowie das Recht, Meldungen nach dem Hinweisgeberschutzgesetz an die interne Meldestelle [Bezeichnung / Kontakt] oder eine externe Meldestelle abzugeben.
(3) Unberührt bleiben außerdem gesetzliche Auskunfts- und Offenlegungspflichten gegenüber Gerichten und Behörden, das Recht, sich an den Betriebsrat, eine Gewerkschaft oder einen Rechtsanwalt zu wenden, sowie Erklärungen, zu denen der Mitarbeiter gesetzlich verpflichtet ist. Soweit möglich, informiert der Mitarbeiter den Arbeitgeber vorab über die Offenlegung.

§ 5 Schutzmaßnahmen und Umgang mit Daten
(1) Der Mitarbeiter hält die IT-Sicherheits- und Datenschutzrichtlinien des Arbeitgebers in der jeweils gültigen Fassung ein, insbesondere: Zugangsdaten geheim halten und nicht weitergeben, Bildschirme sperren, nur freigegebene Geräte und Software nutzen, Unterlagen verschlossen aufbewahren, Dokumente über die vorgesehenen Systeme teilen statt per privatem Messenger.
(2) Der Mitarbeiter verwendet zur Speicherung und Übermittlung von Geschäftsgeheimnissen ausschließlich die vom Arbeitgeber bereitgestellten Systeme [Bezeichnung]. Lokale Kopien auf privaten Geräten sind untersagt.
(3) Der Mitarbeiter kennzeichnet von ihm erstellte Dokumente mit Geschäftsgeheimnissen als „vertraulich“ und beschränkt deren Verteilerkreis auf das Erforderliche.
(4) Personenbezogene Daten verarbeitet der Mitarbeiter nur nach Weisung des Arbeitgebers und im Rahmen der Datenschutzunterweisung vom [Datum].

§ 6 Rückgabe und Löschung
(1) Bei Beendigung des Arbeitsverhältnisses, bei Freistellung oder jederzeit auf Verlangen des Arbeitgebers gibt der Mitarbeiter sämtliche Unterlagen, Datenträger, Geräte und sonstigen Gegenstände, die Geschäftsgeheimnisse oder vertrauliche Informationen enthalten, einschließlich aller Kopien, Notizen und Auszüge unverzüglich und vollständig an den Arbeitgeber zurück.
(2) Auf privaten Geräten, in privaten E-Mail-Konten, Cloud-Speichern und Messengern gespeicherte dienstliche Daten löscht der Mitarbeiter unwiderruflich und bestätigt die vollständige Rückgabe und Löschung in Textform. Auf Verlangen des Arbeitgebers ermöglicht der Mitarbeiter in zumutbarem Umfang die Überprüfung der Löschung.
(3) Ein Zurückbehaltungsrecht an Unterlagen und Daten des Arbeitgebers ist ausgeschlossen.

§ 7 Dauer der Pflichten nach Ende des Arbeitsverhältnisses
(1) Die Pflichten aus dieser Vereinbarung gelten für die Dauer des Arbeitsverhältnisses und darüber hinaus.
(2) Für Geschäftsgeheimnisse im Sinne des § 2 Abs. 1 gelten die Pflichten nach Ende des Arbeitsverhältnisses zeitlich unbegrenzt fort, solange die Information ein Geschäftsgeheimnis ist.
(3) Für sonstige vertrauliche Informationen im Sinne des § 2 Abs. 2 gelten die Pflichten für die Dauer von [z. B. 3] Jahren nach Ende des Arbeitsverhältnisses.
(4) Die nachvertragliche Geheimhaltungspflicht hindert den Mitarbeiter nicht daran, nach Ende des Arbeitsverhältnisses in derselben Branche tätig zu werden und sein allgemeines Erfahrungswissen zu nutzen. Ein nachvertragliches Wettbewerbsverbot wird durch diese Vereinbarung nicht begründet.

§ 8 Rechtsfolgen bei Verstößen und optionale Vertragsstrafe
(1) Bei Verstößen gegen diese Vereinbarung stehen dem Arbeitgeber die gesetzlichen Ansprüche auf Unterlassung, Beseitigung, Vernichtung, Rückruf, Auskunft und Schadensersatz zu (§§ 6 bis 10 GeschGehG, §§ 280, 823 BGB). Der Mitarbeiter wird darauf hingewiesen, dass der unbefugte Erwerb, die Nutzung oder Offenlegung von Geschäftsgeheimnissen nach § 23 GeschGehG strafbar sein kann und arbeitsrechtliche Konsequenzen bis zur außerordentlichen Kündigung nach sich ziehen kann.
(2) [Optional: Für jeden Fall der schuldhaften Verletzung der Pflichten aus § 3 Abs. 1 Buchst. a oder b oder aus § 6 zahlt der Mitarbeiter an den Arbeitgeber eine Vertragsstrafe in Höhe von [Betrag, Orientierung: ein Bruttomonatsgehalt] EUR. Bei einem fortgesetzten Verstoß (z. B. dauerhafte Nutzung einer kopierten Kundenliste) gilt jeder angefangene Monat als eigener Verstoß, insgesamt höchstens [z. B. 3] Bruttomonatsgehälter. Die Vertragsstrafe wird auf einen Schadensersatzanspruch angerechnet; die Geltendmachung eines weitergehenden Schadens bleibt vorbehalten. Die Vertragsstrafe darf in keinem Fall außer Verhältnis zur Schwere des Verstoßes stehen; das Gericht kann sie auf Antrag herabsetzen.]
(3) [Alternativ ohne Vertragsstrafe: Eine Vertragsstrafe wird nicht vereinbart. Der Arbeitgeber behält sich sämtliche gesetzlichen Ansprüche vor.]

§ 9 Schlussbestimmungen
(1) Änderungen dieser Vereinbarung bedürfen der Textform; das gilt auch für diese Klausel.
(2) Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam; an die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Der Mitarbeiter bestätigt, diese Vereinbarung gelesen und verstanden zu haben, die Gelegenheit zu Rückfragen gehabt und eine unterschriebene Ausfertigung erhalten zu haben.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Arbeitgeber


______________________________
[Vorname Nachname]
Mitarbeiter

${VORLAGEN_HINWEIS}`,
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
      title: "Zielvereinbarung Bonus Vorlage 2026 (Word & PDF) | GründerX",
      description:
        "Zielvereinbarung und Bonusregelung als kostenlose Vorlage: SMART-Ziele, Gewichtung, Messung, Auszahlung, Eintritt und Austritt, ohne Freiwilligkeitsvorbehalt.",
    },
    stand: "2026-10",
    text: `Zielvereinbarung und Bonusregelung für den Zeitraum [01.01.2027] bis [31.12.2027]

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], beschäftigt als [Berufsbezeichnung] seit dem [Datum]
– nachfolgend „Arbeitnehmer“ –

§ 1 Gegenstand und Zielbonus
(1) Diese Vereinbarung ergänzt den Arbeitsvertrag vom [Datum] und regelt die variable Vergütung des Arbeitnehmers für die Zielperiode vom [Datum] bis [Datum] (Zielperiode).
(2) Der Arbeitnehmer erhält zusätzlich zu seinem Festgehalt einen Zielbonus. Bei einer Zielerreichung von 100 % beträgt der Zielbonus [Betrag] EUR brutto (Zielbonus bei Planerfüllung). Das entspricht [z. B. 15] % des Jahresfestgehalts.
(3) Der Zielbonus ist Arbeitsentgelt und Gegenleistung für die in der Zielperiode erbrachte Arbeitsleistung. Er wird nach Maßgabe der nachfolgenden Regelungen geschuldet; ein Freiwilligkeitsvorbehalt besteht nicht.

§ 2 Ziele für die Zielperiode
Die Parteien vereinbaren folgende Ziele. Jedes Ziel ist spezifisch, messbar, erreichbar, relevant und terminiert formuliert.

(1) Unternehmensziel (Gewichtung [z. B. 30] %):
   Ziel U1: [z. B. „Der Umsatz des Unternehmens im Geschäftsjahr 2027 beträgt mindestens [Betrag] EUR netto (Zielwert 100 %). Messgröße: Umsatz laut Jahresabschluss / BWA Dezember.“]
   [Ziel U2: z. B. „Das EBIT beträgt mindestens [Betrag] EUR.“]

(2) Teamziel (Gewichtung [z. B. 20] %):
   Ziel T1: [z. B. „Das Marketing-Team senkt die durchschnittlichen Kundenakquisitionskosten (CAC) über alle bezahlten Kanäle von [Betrag] EUR auf [Betrag] EUR, gemessen als Jahresdurchschnitt im Werbe-Reporting [Tool].“]

(3) Individuelle Ziele (Gewichtung insgesamt [z. B. 50] %):
   Ziel I1 (Gewichtung [z. B. 20] %): [z. B. „Steigerung des organischen Traffics der Website von [Zahl] auf [Zahl] Sitzungen im Monat Dezember 2027, gemessen in [Analytics-Tool].“]
   Ziel I2 (Gewichtung [z. B. 15] %): [z. B. „Einführung des neuen CRM-Systems [Bezeichnung] bis zum 30.06.2027 mit Schulung aller Vertriebsmitarbeiter; Nachweis durch Abnahmeprotokoll der Geschäftsführung.“]
   Ziel I3 (Gewichtung [z. B. 15] %): [z. B. „Abschluss von mindestens [Anzahl] Neukundenverträgen mit einem Jahresvolumen von je mindestens [Betrag] EUR bis zum 31.12.2027.“]

(4) Für jedes Ziel sind ein Schwellenwert (Zielerreichung 80 %), der Zielwert (100 %) und ein Maximalwert (120 %) wie folgt festgelegt:
   Ziel U1: Schwelle [Wert], Ziel [Wert], Maximum [Wert]
   Ziel T1: Schwelle [Wert], Ziel [Wert], Maximum [Wert]
   Ziel I1: Schwelle [Wert], Ziel [Wert], Maximum [Wert]
   Ziel I2: Projektziel; erreicht (100 %) oder nicht erreicht (0 %); bei Verzögerung um bis zu [z. B. 4] Wochen aus Gründen außerhalb des Verantwortungsbereichs des Arbeitnehmers gilt das Ziel als erreicht
   Ziel I3: Schwelle [Wert], Ziel [Wert], Maximum [Wert]

§ 3 Gewichtung und Zielerreichungsstaffel
(1) Der Zielbonus berechnet sich aus der Summe der gewichteten Zielerreichungsgrade aller Ziele, multipliziert mit dem Zielbonus bei Planerfüllung.
(2) Für jedes messbare Ziel gilt: Unterhalb des Schwellenwerts beträgt der Zielerreichungsgrad 0 %. Zwischen Schwellenwert und Maximalwert wird linear interpoliert; der Schwellenwert entspricht einem Zielerreichungsgrad von [z. B. 50] %, der Zielwert 100 % und der Maximalwert [z. B. 150] %. Über dem Maximalwert bleibt der Zielerreichungsgrad bei [z. B. 150] %.
(3) Der Gesamtbonus ist auf [z. B. 150] % des Zielbonus bei Planerfüllung begrenzt.
(4) Beispielrechnung: Zielerreichung U1 100 % (Gewicht 30 %), T1 120 % (Gewicht 20 %), I1 80 % (Gewicht 20 %), I2 100 % (Gewicht 15 %), I3 0 % (Gewicht 15 %) ergibt 30 + 24 + 16 + 15 + 0 = 85 % des Zielbonus bei Planerfüllung.

§ 4 Messung, Datengrundlage und Feststellung
(1) Maßgeblich für die Messung sind die in § 2 genannten Datenquellen. Die Parteien stimmen die Datengrundlage zu Beginn der Zielperiode ab; Änderungen der Messmethode während der Zielperiode bedürfen der Textform.
(2) Der Arbeitgeber stellt dem Arbeitnehmer quartalsweise, spätestens [z. B. 4] Wochen nach Quartalsende, einen Zwischenstand der Zielerreichung zur Verfügung. Die Parteien führen mindestens zur Jahresmitte ein Zielgespräch.
(3) Der Arbeitgeber stellt die Zielerreichung nach Ende der Zielperiode, spätestens bis zum [z. B. 31.03.] des Folgejahres, fest und teilt sie dem Arbeitnehmer in Textform mit Berechnung mit. Soweit Zielwerte von der Feststellung des Jahresabschlusses abhängen, erfolgt die Feststellung spätestens [z. B. 2] Wochen nach dessen Vorliegen, spätestens am [z. B. 30.06.].
(4) Der Arbeitnehmer kann der Feststellung innerhalb von [z. B. 4] Wochen in Textform widersprechen. Die Parteien bemühen sich dann um eine einvernehmliche Klärung; gelingt sie nicht, bleibt der Rechtsweg offen.

§ 5 Auszahlung und Fälligkeit
(1) Der Zielbonus wird mit der Gehaltsabrechnung für den Monat gezahlt, der auf die Feststellung nach § 4 Abs. 3 folgt, spätestens mit der Abrechnung für [z. B. April] des Folgejahres.
(2) [Optional: Auf den Zielbonus werden quartalsweise Abschläge in Höhe von je [z. B. 15] % des Zielbonus bei Planerfüllung gezahlt. Die Abschläge werden mit dem festgestellten Zielbonus verrechnet; übersteigen die Abschläge den Zielbonus, ist der Mehrbetrag mit der nächsten Gehaltsabrechnung zurückzuzahlen, höchstens jedoch in Höhe der pfändbaren Beträge.]
(3) Der Zielbonus ist Bruttoarbeitsentgelt; Steuern und Sozialversicherungsbeiträge werden abgeführt. Er ist bei der Berechnung von Urlaubsentgelt, Entgeltfortzahlung und sonstigen Ansprüchen nur zu berücksichtigen, soweit das Gesetz dies vorsieht.
(4) Die Auszahlung setzt nicht voraus, dass das Arbeitsverhältnis am Auszahlungstag ungekündigt besteht.

§ 6 Eintritt, Austritt, Elternzeit, Krankheit
(1) Tritt der Arbeitnehmer während der Zielperiode ein oder endet das Arbeitsverhältnis während der Zielperiode, wird der Zielbonus zeitanteilig mit einem Zwölftel je vollen Beschäftigungsmonat der Zielperiode gezahlt.
(2) Bei Austritt während der Zielperiode wird die Zielerreichung zum Austrittsdatum anhand der bis dahin vorliegenden Daten festgestellt. Ist eine Feststellung zum Austrittsdatum nicht möglich (insbesondere bei Jahreszielen), gilt die am Ende der Zielperiode festgestellte Zielerreichung; für Projektziele wird der bis zum Austritt erreichte Fortschritt angemessen bewertet. Der Bonus wird dann zum regulären Termin nach § 5 ausgezahlt.
(3) Für Zeiten ohne Entgeltanspruch von mehr als [z. B. 4] Wochen am Stück (z. B. Elternzeit, unbezahlter Urlaub, Krankheit nach Ablauf der Entgeltfortzahlung) verringert sich der Zielbonus zeitanteilig um ein Zwölftel je vollen Kalendermonat ohne Entgeltanspruch. Zeiten der Entgeltfortzahlung, des Erholungsurlaubs und des Mutterschutzes führen nicht zu einer Kürzung.
(4) Bei einer Freistellung bis zum Austritt gelten die Ziele für die Freistellungszeit als mit [z. B. 100] % erreicht, soweit der Arbeitnehmer sie wegen der Freistellung nicht mehr beeinflussen kann.

§ 7 Anpassung der Ziele bei veränderten Umständen
(1) Ändern sich während der Zielperiode wesentliche Rahmenbedingungen, die der Arbeitnehmer nicht zu vertreten hat (z. B. Wegfall eines Produkts, Umstrukturierung, Wechsel des Aufgabengebiets, erhebliche Marktveränderungen, längere Krankheit, Ausfall wesentlicher Ressourcen), kann jede Partei eine Anpassung der betroffenen Ziele verlangen. Die Parteien werden die Ziele dann in Textform anpassen; die Anpassung gilt ab dem Zeitpunkt der Veränderung.
(2) Kommt eine Einigung über die Anpassung nicht innerhalb von [z. B. 4] Wochen zustande, wird das betroffene Ziel für den Zeitraum ab der Veränderung mit [z. B. 100] % bewertet, wenn die Veränderung aus der Sphäre des Arbeitgebers stammt, sonst nach billigem Ermessen des Arbeitgebers (§ 315 BGB), das gerichtlich überprüfbar ist.
(3) Wechselt der Arbeitnehmer die Position, werden die individuellen Ziele für die neue Position neu vereinbart; die bis dahin erreichten Ziele werden zeitanteilig bewertet.

§ 8 Verfahren für die nächste Zielperiode
(1) Für jede weitere Zielperiode schließen die Parteien bis spätestens [z. B. 31.01.] eine neue Zielvereinbarung. Der Arbeitgeber lädt den Arbeitnehmer rechtzeitig, spätestens [z. B. 4] Wochen vor Ablauf der laufenden Zielperiode, zum Zielgespräch ein und legt einen Vorschlag vor.
(2) Kommt bis zum [z. B. 31.03.] keine Vereinbarung zustande, obwohl der Arbeitgeber einen angemessenen Vorschlag unterbreitet hat, kann der Arbeitgeber die Ziele für die Zielperiode nach billigem Ermessen einseitig festlegen (Zielvorgabe) und dem Arbeitnehmer in Textform mitteilen.
(3) Unterbleibt die Zielvereinbarung oder Zielvorgabe aus Gründen, die der Arbeitgeber zu vertreten hat, gilt für die Zielperiode eine Zielerreichung von 100 %, und der Zielbonus bei Planerfüllung in Höhe des Vorjahres ist geschuldet.

§ 9 Schlussbestimmungen
(1) Diese Vereinbarung ist Bestandteil des Arbeitsvertrags. Änderungen bedürfen der Textform; das gilt auch für diese Klausel.
(2) Soweit diese Vereinbarung keine Regelung enthält, gelten die Bestimmungen des Arbeitsvertrags. Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam; anstelle der unwirksamen Bestimmung gilt die gesetzliche Regelung, insbesondere § 315 BGB.
(3) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Arbeitgeber


______________________________
[Vorname Nachname]
Arbeitnehmer

${VORLAGEN_HINWEIS}`,
  },
];
