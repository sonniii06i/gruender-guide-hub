import { VORLAGEN_HINWEIS, type Vorlage } from "./types";

// Gesellschaft & Gründung: GbR, UG, GmbH, Gesellschafter, Vesting.
// Rechtsstand: MoPeG (seit 01.01.2024), GmbHG, HGB. Stand 2026-10.

export const VORLAGEN_GESELLSCHAFT: Vorlage[] = [
  {
    slug: "gbr-gesellschaftsvertrag",
    titel: "GbR-Gesellschaftsvertrag",
    kurz: "Vollständiger Gesellschaftsvertrag für zwei oder mehr Gründer nach dem neuen GbR-Recht (MoPeG).",
    kategorie: "gesellschaft",
    dateiname: "GbR-Gesellschaftsvertrag",
    wofuer: [
      "Zwei oder mehr Personen gründen gemeinsam ohne Notar und ohne Stammkapital",
      "Nebenberufliche Projekte, Agenturen, Online-Shops oder Beratungen zu zweit",
      "Als Grundlage für die Eintragung als eGbR ins Gesellschaftsregister",
      "Wenn die gesetzliche Grundregel (Haftung mit dem Privatvermögen) klar geregelt werden soll",
    ],
    enthaelt: [
      "§ 1 Name, Sitz und Gegenstand",
      "§ 2 Gesellschafter und Beiträge",
      "§ 3 Geschäftsführung und Vertretung",
      "§ 4 Beschlüsse und Stimmrechte",
      "§ 5 Gewinn- und Verlustverteilung, Entnahmen",
      "§ 6 Geschäftsjahr, Buchführung, Konten",
      "§ 7 Wettbewerbsverbot und Nebentätigkeiten",
      "§ 8 Kündigung, Ausscheiden und Fortsetzung",
      "§ 9 Abfindung",
      "§ 10 Tod eines Gesellschafters",
      "§ 11 Auflösung und Liquidation",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Seit dem MoPeG (01.01.2024) gilt: Ohne Regelung verteilt sich der Gewinn nach Beteiligungsverhältnis, nicht mehr nach Köpfen. Die Vorlage regelt das ausdrücklich.",
      "Alle Gesellschafter haften persönlich und unbeschränkt – auch für Fehler des anderen. Wer das nicht will, braucht eine UG oder GmbH.",
      "Eine Eintragung ins Gesellschaftsregister (eGbR) ist freiwillig, aber Pflicht, wenn die GbR Grundstücke, GmbH-Anteile oder Marken halten soll.",
      "Gewerbliche GbRs melden jeden Gesellschafter beim Gewerbeamt an; die GbR selbst bekommt eine Steuernummer und gibt eine Feststellungserklärung ab.",
    ],
    faqs: [
      {
        q: "Brauche ich für eine GbR überhaupt einen schriftlichen Vertrag?",
        a: "Nein, eine GbR entsteht auch mündlich. Ohne Vertrag gelten aber die gesetzlichen Regeln, die oft nicht passen: keine Regelung zu Arbeitszeit, Entnahmen, Wettbewerb oder Ausscheiden. Der schriftliche Vertrag verhindert den Streit, bevor er entsteht.",
      },
      {
        q: "Was ist der Unterschied zwischen GbR und eGbR?",
        a: "Die eGbR ist dieselbe Gesellschaft, nur im Gesellschaftsregister eingetragen. Vorteil: Sie kann als solche Grundstücke, Anteile und Marken halten und wirkt nach außen verlässlicher. Nachteil: Notar- und Registerkosten und Transparenzregister-Pflicht.",
      },
      {
        q: "Muss der GbR-Vertrag notariell beurkundet werden?",
        a: "Nein. Formfrei genügt, solange die GbR keine Grundstücke einbringt. Für die eGbR-Anmeldung muss nur die Anmeldung zum Register notariell beglaubigt werden, nicht der Vertrag.",
      },
      {
        q: "Was passiert, wenn ein Gesellschafter kündigt?",
        a: "Nach neuem Recht scheidet der Kündigende aus und die GbR wird von den übrigen fortgesetzt – die Gesellschaft löst sich nicht mehr automatisch auf. Die Vorlage regelt die Frist, die Abfindung und das Ausscheiden ausdrücklich.",
      },
    ],
    seo: {
      title: "GbR-Vertrag Vorlage 2026 kostenlos (Word & PDF) | GründerX",
      description:
        "GbR-Gesellschaftsvertrag als kostenlose Vorlage nach neuem Recht (MoPeG): Gewinnverteilung, Geschäftsführung, Kündigung, Abfindung. Download als Word, PDF oder Text.",
    },
    stand: "2026-10",
    text: `Gesellschaftsvertrag einer Gesellschaft bürgerlichen Rechts (GbR)

zwischen

1. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
   – nachfolgend „Gesellschafter 1“ –

2. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
   – nachfolgend „Gesellschafter 2“ –

[3. ggf. weitere Gesellschafter]

– gemeinsam „die Gesellschafter“ –

§ 1 Name, Sitz und Gegenstand
(1) Die Gesellschafter schließen sich zu einer Gesellschaft bürgerlichen Rechts im Sinne der §§ 705 ff. BGB zusammen. Die Gesellschaft führt den Namen „[Name] GbR“. [Optional: Die Gesellschaft wird in das Gesellschaftsregister eingetragen und führt dann den Zusatz „eGbR“.]
(2) Sitz der Gesellschaft ist [Ort].
(3) Gegenstand der Gesellschaft ist [genaue Beschreibung der Tätigkeit, z. B. „der Betrieb eines Online-Shops für Sportbekleidung und die Erbringung von Marketing-Dienstleistungen“]. Die Gesellschaft darf alle Geschäfte vornehmen, die dem Gesellschaftszweck unmittelbar oder mittelbar dienen.
(4) Die Gesellschaft beginnt am [Datum]. Sie wird auf unbestimmte Zeit geschlossen.

§ 2 Gesellschafter, Beiträge und Beteiligung
(1) Die Gesellschafter leisten folgende Beiträge:
   a) Gesellschafter 1: eine Bareinlage von [Betrag] EUR, zahlbar bis zum [Datum], sowie seine Arbeitskraft im Umfang von etwa [Stunden] Stunden pro Woche.
   b) Gesellschafter 2: eine Bareinlage von [Betrag] EUR, zahlbar bis zum [Datum], sowie seine Arbeitskraft im Umfang von etwa [Stunden] Stunden pro Woche.
   [c) Sacheinlagen, z. B. „Gesellschafter 1 bringt den Laptop [Modell] mit einem vereinbarten Wert von [Betrag] EUR ein.“]
(2) Am Vermögen, am Gewinn und am Verlust der Gesellschaft sind die Gesellschafter wie folgt beteiligt: Gesellschafter 1 [z. B. 50] %, Gesellschafter 2 [z. B. 50] %. Diese Beteiligungsverhältnisse gelten auch für Stimmrechte und Abfindung, soweit dieser Vertrag nichts anderes bestimmt.
(3) Eine Nachschusspflicht besteht nicht. Zusätzliche Beiträge können nur durch einstimmigen Beschluss beschlossen werden.

§ 3 Geschäftsführung und Vertretung
(1) Zur Geschäftsführung und Vertretung der Gesellschaft sind alle Gesellschafter gemeinsam berechtigt und verpflichtet. Im Rahmen des gewöhnlichen Geschäftsbetriebs darf jeder Gesellschafter die Gesellschaft allein vertreten, soweit das einzelne Geschäft einen Wert von [Betrag, z. B. 1.000] EUR nicht übersteigt.
(2) Folgende Geschäfte bedürfen stets der vorherigen Zustimmung aller Gesellschafter:
   a) Abschluss, Änderung und Kündigung von Miet-, Leasing-, Arbeits- und Dauerschuldverträgen,
   b) Aufnahme von Darlehen, Übernahme von Bürgschaften und Gewährung von Krediten,
   c) Anschaffungen und Verpflichtungen über [Betrag] EUR im Einzelfall,
   d) Erteilung von Vollmachten und Prokura,
   e) Beginn neuer Geschäftszweige und Aufgabe bestehender,
   f) Einstellung und Entlassung von Mitarbeitern.
(3) Jeder Gesellschafter widmet der Gesellschaft seine Arbeitskraft im in § 2 bestimmten Umfang. Urlaub wird untereinander abgestimmt; Krankheit ist unverzüglich mitzuteilen.
(4) Die Gesellschafter informieren sich gegenseitig laufend über alle wesentlichen Vorgänge und gewähren einander jederzeit Einsicht in Bücher, Konten und Unterlagen.

§ 4 Beschlüsse und Stimmrechte
(1) Gesellschafterbeschlüsse werden in Gesellschafterversammlungen oder, wenn alle Gesellschafter einverstanden sind, schriftlich, per E-Mail oder in Video-/Telefonkonferenz gefasst.
(2) Das Stimmrecht richtet sich nach der Beteiligung gemäß § 2 Abs. 2. Beschlüsse werden mit einfacher Mehrheit gefasst, soweit dieser Vertrag oder das Gesetz nichts anderes vorschreibt.
(3) Einstimmigkeit ist erforderlich für: Änderungen dieses Vertrags, Aufnahme neuer Gesellschafter, Änderung des Gesellschaftszwecks, Auflösung der Gesellschaft, Eintragung ins Gesellschaftsregister sowie die in § 3 Abs. 2 genannten Geschäfte.
(4) Über jede Versammlung wird ein Protokoll gefertigt, das von allen Anwesenden unterzeichnet und allen Gesellschaftern übermittelt wird. Beschlüsse können nur innerhalb von [z. B. 4] Wochen nach Zugang des Protokolls angefochten werden.

§ 5 Gewinn- und Verlustverteilung, Entnahmen
(1) Gewinn und Verlust werden nach Ablauf des Geschäftsjahres im Verhältnis der Beteiligung gemäß § 2 Abs. 2 verteilt. [Optional: Vorab erhält jeder Gesellschafter eine Tätigkeitsvergütung von [Betrag] EUR monatlich, die als Aufwand behandelt wird.]
(2) Jeder Gesellschafter darf monatlich bis zu [Betrag] EUR als Vorschuss auf seinen Gewinnanteil entnehmen, sofern die Liquidität der Gesellschaft dies zulässt. Weitergehende Entnahmen bedürfen eines Gesellschafterbeschlusses.
(3) Die Gesellschafter stellen jeweils einen Betrag zurück, der zur Zahlung der auf den Gewinnanteil entfallenden Einkommensteuer ausreicht; die Steuer auf den Gewinnanteil trägt jeder Gesellschafter selbst.
(4) Übersteigen die Entnahmen eines Gesellschafters seinen Gewinnanteil, ist der Mehrbetrag innerhalb von [z. B. 3] Monaten nach Feststellung des Jahresabschlusses zurückzuzahlen.

§ 6 Geschäftsjahr, Buchführung, Konten
(1) Geschäftsjahr ist das Kalenderjahr. Das erste Geschäftsjahr ist ein Rumpfgeschäftsjahr und endet am 31.12.[Jahr].
(2) Die Gesellschaft führt Bücher nach den steuerlichen Vorschriften (Einnahmenüberschussrechnung, solange keine Buchführungspflicht besteht). Der Jahresabschluss ist innerhalb von [z. B. 6] Monaten nach Ende des Geschäftsjahres zu erstellen und von allen Gesellschaftern festzustellen.
(3) Für jeden Gesellschafter werden ein festes Kapitalkonto (Einlage) und ein variables Privatkonto (Gewinnanteile, Entnahmen, Tätigkeitsvergütung) geführt.
(4) Die Gesellschaft unterhält ein Geschäftskonto bei [Bank], über das alle Zahlungen der Gesellschaft abgewickelt werden. Verfügungsberechtigt sind [alle Gesellschafter einzeln / nur gemeinsam].

§ 7 Wettbewerbsverbot und Nebentätigkeiten
(1) Während der Dauer der Gesellschaft darf kein Gesellschafter ohne schriftliche Zustimmung der übrigen im Geschäftsbereich der Gesellschaft für eigene oder fremde Rechnung tätig werden oder sich an einem Konkurrenzunternehmen beteiligen.
(2) Folgende bestehende Tätigkeiten sind ausgenommen: [z. B. „Anstellung von Gesellschafter 2 bei der Firma X“].
(3) Verstößt ein Gesellschafter gegen das Wettbewerbsverbot, kann die Gesellschaft Schadensersatz verlangen oder verlangen, dass die Geschäfte als für Rechnung der Gesellschaft eingegangen gelten.

§ 8 Kündigung, Ausscheiden und Fortsetzung
(1) Jeder Gesellschafter kann die Gesellschaft mit einer Frist von [z. B. 6] Monaten zum Ende eines Geschäftsjahres kündigen, erstmals zum [Datum]. Die Kündigung bedarf der Schriftform gegenüber allen übrigen Gesellschaftern. Das Recht zur fristlosen Kündigung aus wichtigem Grund bleibt unberührt.
(2) Durch die Kündigung wird die Gesellschaft nicht aufgelöst. Der kündigende Gesellschafter scheidet mit Wirksamwerden der Kündigung aus; die Gesellschaft wird von den übrigen Gesellschaftern fortgesetzt. Bleibt nur ein Gesellschafter übrig, geht das Gesellschaftsvermögen auf ihn über, und er führt das Unternehmen als Einzelunternehmen fort.
(3) Ein Gesellschafter scheidet außerdem aus, wenn
   a) über sein Vermögen das Insolvenzverfahren eröffnet oder mangels Masse abgelehnt wird,
   b) ein Gläubiger seinen Gesellschaftsanteil pfändet und die Pfändung nicht innerhalb von drei Monaten aufgehoben wird,
   c) die übrigen Gesellschafter ihn aus wichtigem Grund (insbesondere grober Pflichtverletzung, Verstoß gegen § 7, dauernde Arbeitsunfähigkeit über [z. B. 12] Monate) durch Beschluss ausschließen; der Betroffene hat dabei kein Stimmrecht.
(4) Der ausscheidende Gesellschafter wird von den Verbindlichkeiten der Gesellschaft im Innenverhältnis freigestellt. Die Nachhaftung nach § 728b BGB bleibt im Außenverhältnis unberührt.

§ 9 Abfindung
(1) Der ausscheidende Gesellschafter erhält eine Abfindung in Höhe seines Anteils am Wert der Gesellschaft. Der Wert wird nach folgender Methode bestimmt: [z. B. „Buchwert zum Stichtag zuzüglich stiller Reserven“ oder „das [1,5]-fache des durchschnittlichen Jahresgewinns der letzten drei Geschäftsjahre“ oder „vereinfachtes Ertragswertverfahren nach §§ 199 ff. BewG“]. Ein Firmenwert wird [nicht / mit [Betrag] EUR] berücksichtigt.
(2) Die Abfindung ist in [z. B. 4] gleichen Halbjahresraten zu zahlen, die erste Rate sechs Monate nach dem Ausscheiden. Der offene Betrag ist mit [z. B. 2] Prozentpunkten über dem Basiszinssatz zu verzinsen. Vorzeitige Zahlung ist jederzeit zulässig.
(3) Scheidet ein Gesellschafter aus wichtigem Grund, den er zu vertreten hat, aus, beträgt die Abfindung [z. B. 75] % des nach Absatz 1 ermittelten Wertes.
(4) Einigen sich die Gesellschafter nicht über den Wert, entscheidet ein von der Industrie- und Handelskammer [Ort] zu benennender Wirtschaftsprüfer oder Steuerberater als Schiedsgutachter verbindlich. Die Kosten tragen die Gesellschaft und der Ausscheidende je zur Hälfte.

§ 10 Tod eines Gesellschafters
(1) Stirbt ein Gesellschafter, wird die Gesellschaft von den übrigen Gesellschaftern fortgesetzt. Die Erben scheiden aus und erhalten die Abfindung nach § 9.
[Alternative: (1) Stirbt ein Gesellschafter, wird die Gesellschaft mit seinen Erben fortgesetzt, sofern diese innerhalb von drei Monaten ihren Eintritt erklären. Mehrere Erben haben einen gemeinsamen Vertreter zu benennen.]
(2) Die übrigen Gesellschafter können innerhalb von drei Monaten nach Kenntnis vom Tod beschließen, die Gesellschaft aufzulösen.

§ 11 Auflösung und Liquidation
(1) Die Gesellschaft wird aufgelöst durch einstimmigen Beschluss der Gesellschafter, durch Eröffnung des Insolvenzverfahrens über das Gesellschaftsvermögen oder in den gesetzlich bestimmten Fällen.
(2) Nach der Auflösung findet die Liquidation statt. Liquidatoren sind alle Gesellschafter gemeinsam, sofern nicht ein Liquidator durch Beschluss bestimmt wird. Das nach Begleichung aller Verbindlichkeiten verbleibende Vermögen wird im Verhältnis der Beteiligung gemäß § 2 Abs. 2 verteilt.
(3) Das Recht, den Namen der Gesellschaft, die Domain [domain.de] und die Social-Media-Konten weiterzuführen, steht [Gesellschafter 1 / dem Gesellschafter zu, der das höchste Gebot abgibt].

§ 12 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform. Das gilt auch für die Aufhebung dieser Schriftformklausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Die Gesellschafter verpflichten sich, bei Streitigkeiten zunächst ein Gespräch unter Hinzuziehung eines neutralen Dritten (Mediation) zu führen, bevor sie gerichtliche Schritte einleiten.
(4) Gerichtsstand ist, soweit gesetzlich zulässig, [Ort]. Es gilt das Recht der Bundesrepublik Deutschland.
(5) Jeder Gesellschafter erhält eine unterschriebene Ausfertigung dieses Vertrags.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gesellschafter 1


______________________________
[Vorname Nachname], Gesellschafter 2


[______________________________
[Vorname Nachname], Gesellschafter 3]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "ug-gesellschaftsvertrag",
    titel: "UG-Gesellschaftsvertrag (haftungsbeschränkt)",
    kurz: "Individueller Gesellschaftsvertrag für eine UG (haftungsbeschränkt) mit Thesaurierungspflicht, Vinkulierung, Einziehung und Abfindung – statt des knappen Musterprotokolls.",
    kategorie: "gesellschaft",
    dateiname: "UG-Gesellschaftsvertrag",
    wofuer: [
      "Gründung einer UG (haftungsbeschränkt) mit zwei oder mehr Gesellschaftern, für die das Musterprotokoll zu dünn ist",
      "Start-ups, die später Investoren aufnehmen und schon jetzt Vinkulierung und Einziehung brauchen",
      "Gründer, die mit kleinem Stammkapital starten und die Haftung auf das Gesellschaftsvermögen begrenzen wollen",
      "Als Entwurf für den Notartermin, damit die Beurkundung nicht am Text scheitert",
    ],
    enthaelt: [
      "§ 1 Firma, Sitz, Gegenstand",
      "§ 2 Stammkapital und Geschäftsanteile",
      "§ 3 Gesetzliche Rücklage (§ 5a GmbHG)",
      "§ 4 Geschäftsführung und Vertretung",
      "§ 5 Gesellschafterversammlung und Beschlüsse",
      "§ 6 Jahresabschluss und Ergebnisverwendung",
      "§ 7 Verfügung über Geschäftsanteile (Vinkulierung)",
      "§ 8 Einziehung von Geschäftsanteilen",
      "§ 9 Abfindung",
      "§ 10 Wettbewerbsverbot",
      "§ 11 Dauer, Kündigung, Bekanntmachungen",
      "§ 12 Gründungsaufwand und Schlussbestimmungen",
    ],
    hinweise: [
      "Der Vertrag muss notariell beurkundet werden (§ 2 GmbHG), seit 2022 auch online per Videokonferenz mit dem Notar. Diese Vorlage ist der Entwurf für den Termin, nicht der Ersatz.",
      "Eine UG muss jedes Jahr 25 % des Jahresüberschusses (nach Abzug eines Verlustvortrags) in die gesetzliche Rücklage einstellen, bis das Stammkapital auf 25.000 EUR erhöht ist (§ 5a Abs. 3 GmbHG). Vollausschüttungen sind bis dahin unzulässig.",
      "Sacheinlagen sind bei der UG verboten, das Stammkapital muss vor der Anmeldung in voller Höhe eingezahlt sein (§ 5a Abs. 2 GmbHG). Mit 1 EUR Stammkapital gründen wenig Gründer, weil die Notar- und Registerkosten sonst sofort zur Überschuldung führen.",
      "Der Zusatz „UG (haftungsbeschränkt)“ oder „Unternehmergesellschaft (haftungsbeschränkt)“ ist Pflicht im Rechtsverkehr. Wer ihn weglässt, riskiert die persönliche Haftung.",
      "Die wirtschaftlich Berechtigten müssen ins Transparenzregister eingetragen werden; die Gesellschafterliste beim Handelsregister muss nach jedem Anteilswechsel aktualisiert werden (§ 40 GmbHG).",
    ],
    faqs: [
      {
        q: "Musterprotokoll oder individueller Vertrag – was ist besser?",
        a: "Das Musterprotokoll (§ 2 Abs. 1a GmbHG) ist günstiger, erlaubt aber nur bis zu drei Gesellschafter, einen Geschäftsführer und keine eigenen Regelungen zu Vinkulierung, Einziehung oder Abfindung. Sobald mehrere Gründer gleichberechtigt zusammenarbeiten oder Investoren geplant sind, lohnt der individuelle Vertrag, weil ein späterer Wechsel wieder zum Notar führt.",
      },
      {
        q: "Wie viel Stammkapital sollte eine UG haben?",
        a: "Gesetzlich reicht 1 EUR. In der Praxis sind 500 bis 1.000 EUR üblich, damit Gründungskosten und erste Ausgaben nicht sofort zur bilanziellen Überschuldung führen. Der Gründungsaufwand, den die Gesellschaft trägt, muss in der Satzung beziffert werden und sollte das Stammkapital nicht übersteigen.",
      },
      {
        q: "Wann wird aus der UG eine GmbH?",
        a: "Wenn das Stammkapital durch Kapitalerhöhung aus der Rücklage oder durch neue Einlagen auf mindestens 25.000 EUR gebracht wird (§ 5a Abs. 5 GmbHG). Die Thesaurierungspflicht entfällt dann, und die Firma kann auf „GmbH“ geändert werden. Der Wechsel erfordert eine Satzungsänderung beim Notar.",
      },
      {
        q: "Was bedeutet die Vinkulierung in § 7 der Vorlage?",
        a: "Vinkulierung heißt: Ein Gesellschafter darf seinen Anteil nur mit Zustimmung der Gesellschafterversammlung verkaufen oder abtreten. So verhindern die Gründer, dass plötzlich ein Fremder mit am Tisch sitzt. Ergänzt wird die Klausel durch ein Vorkaufsrecht und die Einziehung in § 8.",
      },
    ],
    seo: {
      title: "UG-Gesellschaftsvertrag Vorlage 2026 kostenlos | GründerX",
      description:
        "UG-Gesellschaftsvertrag als kostenlose Vorlage: Stammkapital, Thesaurierung nach § 5a GmbHG, Vinkulierung, Einziehung, Abfindung. Entwurf für den Notar.",
    },
    stand: "2026-10",
    text: `Gesellschaftsvertrag der [Name] UG (haftungsbeschränkt)

Gesellschafter:

1. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
2. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
[3. ggf. weitere Gesellschafter]

§ 1 Firma, Sitz, Gegenstand
(1) Die Firma der Gesellschaft lautet: [Name] UG (haftungsbeschränkt).
(2) Sitz der Gesellschaft ist [Ort].
(3) Gegenstand des Unternehmens ist [genaue Beschreibung, z. B. „die Entwicklung und der Vertrieb von Software für kleine Unternehmen sowie damit zusammenhängende Dienstleistungen“].
(4) Die Gesellschaft darf alle Geschäfte vornehmen, die geeignet sind, den Gesellschaftszweck unmittelbar oder mittelbar zu fördern. Sie darf Zweigniederlassungen errichten und sich an anderen Unternehmen beteiligen.
(5) Die Gesellschaft ist auf unbestimmte Zeit errichtet. Geschäftsjahr ist das Kalenderjahr; das erste Geschäftsjahr ist ein Rumpfgeschäftsjahr und endet am 31.12.[Jahr].

§ 2 Stammkapital und Geschäftsanteile
(1) Das Stammkapital der Gesellschaft beträgt [Betrag, z. B. 1.000] EUR.
(2) Es ist eingeteilt in [Anzahl, z. B. 1.000] Geschäftsanteile mit einem Nennbetrag von je 1,00 EUR. Hiervon übernehmen:
   a) [Vorname Nachname] [Anzahl] Geschäftsanteile (Nr. 1 bis [Nr.]) im Gesamtnennbetrag von [Betrag] EUR,
   b) [Vorname Nachname] [Anzahl] Geschäftsanteile (Nr. [Nr.] bis [Nr.]) im Gesamtnennbetrag von [Betrag] EUR.
(3) Die Einlagen sind in Geld zu leisten und vor der Anmeldung der Gesellschaft zum Handelsregister in voller Höhe einzuzahlen (§ 5a Abs. 2 GmbHG). Sacheinlagen sind ausgeschlossen.

§ 3 Gesetzliche Rücklage
(1) Die Gesellschaft bildet eine gesetzliche Rücklage, in die jährlich ein Viertel des um einen Verlustvortrag aus dem Vorjahr geminderten Jahresüberschusses einzustellen ist (§ 5a Abs. 3 GmbHG).
(2) Die Rücklage darf nur verwendet werden für eine Kapitalerhöhung aus Gesellschaftsmitteln, zum Ausgleich eines Jahresfehlbetrags, der nicht durch einen Gewinnvortrag gedeckt ist, oder zum Ausgleich eines Verlustvortrags, der nicht durch einen Jahresüberschuss gedeckt ist.
(3) Die Pflicht nach Absatz 1 endet, sobald das Stammkapital durch Beschluss der Gesellschafter auf mindestens 25.000 EUR erhöht wurde. Die Gesellschafter streben die Erhöhung an, sobald die Rücklage dies zulässt.

§ 4 Geschäftsführung und Vertretung
(1) Die Gesellschaft hat einen oder mehrere Geschäftsführer. Ist nur ein Geschäftsführer bestellt, vertritt er die Gesellschaft allein. Sind mehrere bestellt, wird die Gesellschaft durch zwei Geschäftsführer gemeinsam oder durch einen Geschäftsführer zusammen mit einem Prokuristen vertreten.
(2) Die Gesellschafterversammlung kann einzelnen Geschäftsführern Einzelvertretungsbefugnis erteilen und sie von den Beschränkungen des § 181 BGB befreien.
(3) Die Geschäftsführer führen die Geschäfte mit der Sorgfalt eines ordentlichen Geschäftsmannes nach Gesetz, diesem Vertrag, einer etwaigen Geschäftsordnung und den Weisungen der Gesellschafterversammlung.
(4) Folgende Geschäfte bedürfen der vorherigen Zustimmung der Gesellschafterversammlung:
   a) Erwerb, Veräußerung und Belastung von Grundstücken und Beteiligungen,
   b) Aufnahme von Darlehen und Übernahme von Bürgschaften über [Betrag] EUR im Einzelfall,
   c) Investitionen und Verpflichtungen über [Betrag] EUR im Einzelfall oder [Betrag] EUR im Geschäftsjahr,
   d) Abschluss und Kündigung von Miet-, Leasing- und Dauerschuldverträgen mit einer Laufzeit über [z. B. 12] Monate,
   e) Einstellung von Mitarbeitern mit einem Jahresgehalt über [Betrag] EUR,
   f) Erteilung von Prokura und Generalvollmacht,
   g) Aufnahme neuer und Aufgabe bestehender Geschäftszweige.
(5) Der erste Geschäftsführer wird in der Gründungsurkunde bestellt.

§ 5 Gesellschafterversammlung und Beschlüsse
(1) Die ordentliche Gesellschafterversammlung findet innerhalb von [z. B. 6] Monaten nach Ende des Geschäftsjahres statt. Außerordentliche Versammlungen sind einzuberufen, wenn das Interesse der Gesellschaft es erfordert oder Gesellschafter mit mindestens 10 % des Stammkapitals dies verlangen.
(2) Die Einberufung erfolgt durch die Geschäftsführung mit einer Frist von mindestens zwei Wochen in Textform (auch per E-Mail an die zuletzt mitgeteilte Adresse) unter Angabe der Tagesordnung. Der Tag der Absendung und der Tag der Versammlung werden nicht mitgerechnet.
(3) Versammlungen können auch per Video- oder Telefonkonferenz abgehalten werden. Beschlüsse können außerhalb einer Versammlung in Textform gefasst werden, wenn alle Gesellschafter mit dieser Form einverstanden sind oder sich an der Abstimmung beteiligen.
(4) Die Versammlung ist beschlussfähig, wenn mindestens [z. B. 75] % des Stammkapitals vertreten sind. Ist sie nicht beschlussfähig, ist mit gleicher Tagesordnung eine neue Versammlung einzuberufen, die ohne Rücksicht auf das vertretene Kapital beschlussfähig ist; hierauf ist in der Einladung hinzuweisen.
(5) Je 1,00 EUR eines Geschäftsanteils gewährt eine Stimme. Beschlüsse werden mit einfacher Mehrheit der abgegebenen Stimmen gefasst, soweit Gesetz oder dieser Vertrag nicht eine größere Mehrheit vorsehen. Änderungen dieses Vertrags, Kapitalmaßnahmen, Auflösung und Umwandlung bedürfen einer Mehrheit von drei Vierteln der abgegebenen Stimmen.
(6) Über jede Versammlung und jeden Beschluss ist eine Niederschrift zu fertigen, die vom Versammlungsleiter zu unterzeichnen und allen Gesellschaftern zu übermitteln ist. Beschlüsse können nur innerhalb eines Monats nach Zugang der Niederschrift durch Klage angefochten werden.

§ 6 Jahresabschluss und Ergebnisverwendung
(1) Die Geschäftsführer stellen den Jahresabschluss innerhalb der gesetzlichen Fristen auf und legen ihn den Gesellschaftern unverzüglich vor.
(2) Die Gesellschafter beschließen über die Feststellung des Jahresabschlusses und die Verwendung des Ergebnisses. Vor jeder Ausschüttung ist die Rücklage nach § 3 zu bilden.
(3) Der nach Dotierung der Rücklage verbleibende Gewinn wird im Verhältnis der Geschäftsanteile verteilt, soweit die Gesellschafter nicht mit drei Vierteln der Stimmen eine Thesaurierung beschließen.

§ 7 Verfügung über Geschäftsanteile
(1) Die Abtretung, Verpfändung oder sonstige Belastung von Geschäftsanteilen oder Teilen davon bedarf der Zustimmung der Gesellschafterversammlung mit einer Mehrheit von drei Vierteln der abgegebenen Stimmen (§ 15 Abs. 5 GmbHG). Der betroffene Gesellschafter hat kein Stimmrecht.
(2) Will ein Gesellschafter seinen Geschäftsanteil an einen Dritten veräußern, hat er ihn zunächst den übrigen Gesellschaftern im Verhältnis ihrer Beteiligung zu den mit dem Dritten ausgehandelten Bedingungen schriftlich anzubieten. Das Angebot kann innerhalb von [z. B. 4] Wochen angenommen werden. Nicht ausgeübte Rechte wachsen den übrigen Gesellschaftern anteilig zu.
(3) Eine Veräußerung an den Dritten ist nur zulässig, wenn kein Gesellschafter das Angebot angenommen hat, zu Bedingungen, die nicht günstiger sind als die angebotenen, und innerhalb von drei Monaten nach Ablauf der Annahmefrist.

§ 8 Einziehung von Geschäftsanteilen
(1) Die Einziehung von Geschäftsanteilen ist mit Zustimmung des betroffenen Gesellschafters jederzeit zulässig.
(2) Ohne Zustimmung des Betroffenen kann die Einziehung beschlossen werden, wenn
   a) über sein Vermögen das Insolvenzverfahren eröffnet oder die Eröffnung mangels Masse abgelehnt wird,
   b) der Geschäftsanteil gepfändet wird und die Pfändung nicht innerhalb von drei Monaten aufgehoben wird,
   c) der Gesellschafter gegen § 7 oder § 10 verstößt oder einen sonstigen wichtigen Grund in seiner Person setzt, der den übrigen Gesellschaftern die Fortsetzung mit ihm unzumutbar macht,
   d) der Gesellschafter stirbt und die Erben nicht Gesellschafter oder Ehegatten eines Gesellschafters sind,
   e) eine gesonderte Vereinbarung (z. B. Vesting) dies vorsieht.
(3) Der Beschluss bedarf einer Mehrheit von drei Vierteln der abgegebenen Stimmen; der Betroffene hat kein Stimmrecht. Statt der Einziehung kann die Gesellschafterversammlung beschließen, dass der Anteil an die Gesellschaft, einen Gesellschafter oder einen Dritten abzutreten ist.
(4) Die Einziehung darf nur erfolgen, wenn die Abfindung aus freiem, nicht zur Erhaltung des Stammkapitals erforderlichem Vermögen gezahlt werden kann (§§ 30, 34 GmbHG).

§ 9 Abfindung
(1) Der ausscheidende Gesellschafter erhält eine Abfindung in Höhe des Verkehrswerts seines Geschäftsanteils. Der Verkehrswert wird nach dem vereinfachten Ertragswertverfahren (§§ 199 ff. BewG) zum Stichtag des Ausscheidens ermittelt, sofern die Beteiligten sich nicht innerhalb von zwei Monaten auf einen Wert einigen.
(2) In den Fällen des § 8 Abs. 2 lit. a bis c beträgt die Abfindung [z. B. 60] % des Werts nach Absatz 1, höchstens jedoch den Buchwert.
(3) Die Abfindung ist in [z. B. 3] gleichen Jahresraten zu zahlen, die erste Rate sechs Monate nach dem Stichtag. Der offene Betrag wird mit 2 Prozentpunkten über dem Basiszinssatz verzinst. Sicherheiten können nicht verlangt werden.
(4) Streit über die Höhe entscheidet ein von der Industrie- und Handelskammer [Ort] benannter Wirtschaftsprüfer als Schiedsgutachter. Die Kosten tragen Gesellschaft und Ausscheidender je zur Hälfte.

§ 10 Wettbewerbsverbot
(1) Kein Gesellschafter darf während seiner Zugehörigkeit zur Gesellschaft im Geschäftsbereich der Gesellschaft für eigene oder fremde Rechnung tätig werden oder sich an einem Wettbewerber beteiligen. Beteiligungen unter 5 % an börsennotierten Gesellschaften sind erlaubt.
(2) Die Gesellschafterversammlung kann durch Beschluss Befreiung erteilen. Bestehende Tätigkeiten: [z. B. „keine“ oder Aufzählung].
(3) Bei Verstoß kann die Gesellschaft eine Vertragsstrafe von [Betrag] EUR je Fall und darüber hinausgehenden Schadensersatz verlangen.

§ 11 Dauer, Kündigung, Bekanntmachungen
(1) Jeder Gesellschafter kann seine Beteiligung mit einer Frist von [z. B. 6] Monaten zum Ende eines Geschäftsjahres kündigen, erstmals zum [Datum]. Die Kündigung ist durch eingeschriebenen Brief an die Gesellschaft zu erklären.
(2) Die Kündigung führt nicht zur Auflösung. Der Geschäftsanteil des Kündigenden wird nach § 8 Abs. 3 eingezogen oder abgetreten; die Abfindung bestimmt sich nach § 9 Abs. 1.
(3) Bekanntmachungen der Gesellschaft erfolgen im Bundesanzeiger.

§ 12 Gründungsaufwand und Schlussbestimmungen
(1) Die Gesellschaft trägt die mit der Gründung verbundenen Kosten (Notar, Handelsregister, Veröffentlichung, Beratung) bis zu einem Betrag von [Betrag, z. B. 300] EUR. Darüber hinausgehende Kosten tragen die Gesellschafter im Verhältnis ihrer Beteiligung.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung oder, soweit dispositiv, eine wirksame Regelung, die dem Zweck am nächsten kommt.
(3) Nebenabreden zwischen den Gesellschaftern bedürfen der Schriftform, soweit nicht das Gesetz die notarielle Form verlangt.
(4) Gerichtsstand für Streitigkeiten aus diesem Vertrag ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt deutsches Recht.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gesellschafter


______________________________
[Vorname Nachname], Gesellschafter

(Notarielle Beurkundung erforderlich, § 2 GmbHG)

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "gmbh-gesellschaftsvertrag",
    titel: "GmbH-Gesellschaftsvertrag",
    kurz: "Vollständige GmbH-Satzung mit 25.000 EUR Stammkapital, Gesellschafterversammlung, Vinkulierung, Vorkaufsrecht, Einziehung und Abfindung als Entwurf für den Notar.",
    kategorie: "gesellschaft",
    dateiname: "GmbH-Gesellschaftsvertrag",
    wofuer: [
      "Gründung einer GmbH mit zwei oder mehr Gesellschaftern und individuellen Regeln",
      "Umwandlung einer UG in eine GmbH, wenn das Stammkapital auf 25.000 EUR erhöht wird",
      "Wenn Gründer Vinkulierung, Vorkaufsrecht und Einziehung schon in der Satzung verankern wollen",
      "Als Vorbereitung für den Notartermin, damit die Beurkundung nur noch Feinschliff braucht",
    ],
    enthaelt: [
      "§ 1 Firma, Sitz, Dauer, Geschäftsjahr",
      "§ 2 Gegenstand des Unternehmens",
      "§ 3 Stammkapital und Geschäftsanteile",
      "§ 4 Geschäftsführung und Vertretung",
      "§ 5 Zustimmungspflichtige Geschäfte",
      "§ 6 Gesellschafterversammlung",
      "§ 7 Gesellschafterbeschlüsse",
      "§ 8 Jahresabschluss und Gewinnverwendung",
      "§ 9 Verfügung über Geschäftsanteile, Vorkaufsrecht",
      "§ 10 Einziehung und Zwangsabtretung",
      "§ 11 Abfindung",
      "§ 12 Wettbewerbsverbot, Bekanntmachungen, Schlussbestimmungen",
    ],
    hinweise: [
      "Der GmbH-Vertrag muss notariell beurkundet werden (§ 2 GmbHG). Jede spätere Satzungsänderung ebenfalls, mit Dreiviertelmehrheit (§ 53 GmbHG). Diese Vorlage ist der Entwurf für den Notar.",
      "Vor der Anmeldung zum Handelsregister muss auf jeden Geschäftsanteil mindestens ein Viertel, insgesamt aber mindestens 12.500 EUR eingezahlt sein (§ 7 Abs. 2 GmbHG). Der Rest bleibt als offene Einlageforderung bestehen und wird in der Insolvenz vom Verwalter eingefordert.",
      "Die Gesellschafterliste (§ 40 GmbHG) und das Transparenzregister müssen nach jedem Anteilswechsel aktualisiert werden. Nur wer in der Liste steht, gilt gegenüber der Gesellschaft als Gesellschafter (§ 16 GmbHG).",
      "Die Abfindung bei Einziehung darf nicht aus dem Stammkapital bezahlt werden (§§ 30, 34 GmbHG). Zu niedrige Abfindungsklauseln (z. B. starrer Buchwert) hält die Rechtsprechung für sittenwidrig, wenn sie grob vom Verkehrswert abweichen.",
    ],
    faqs: [
      {
        q: "Reichen 12.500 EUR zur Gründung einer GmbH?",
        a: "Zur Anmeldung ja: Es muss mindestens die Hälfte des Mindeststammkapitals eingezahlt sein. Die restlichen 12.500 EUR schulden die Gesellschafter aber weiterhin und müssen sie auf Anforderung einzahlen. In der Insolvenz fordert der Verwalter den offenen Betrag ein, auch viele Jahre später.",
      },
      {
        q: "Was ist der Unterschied zwischen Vinkulierung und Vorkaufsrecht?",
        a: "Die Vinkulierung macht jede Abtretung von der Zustimmung der Gesellschafter abhängig; ohne Zustimmung ist die Übertragung unwirksam. Das Vorkaufsrecht gibt den Mitgesellschaftern zusätzlich das Recht, den Anteil selbst zu den Bedingungen des Dritten zu erwerben. Beides zusammen schützt am besten vor fremden Mitgesellschaftern.",
      },
      {
        q: "Wie wird die Abfindung eines ausscheidenden Gesellschafters berechnet?",
        a: "Die Vorlage knüpft am Verkehrswert nach dem vereinfachten Ertragswertverfahren an und erlaubt einen Abschlag bei Ausscheiden aus wichtigem Grund. Eine Ratenzahlung schützt die Liquidität der Gesellschaft. Ganz ausschließen darf man die Abfindung nicht, und sie darf nicht aus dem gebundenen Stammkapital gezahlt werden.",
      },
      {
        q: "Was muss in der Satzung zwingend stehen?",
        a: "Nach § 3 GmbHG mindestens Firma, Sitz, Unternehmensgegenstand, Höhe des Stammkapitals sowie Zahl und Nennbeträge der von jedem Gesellschafter übernommenen Geschäftsanteile. Alles andere (Vinkulierung, Einziehung, Abfindung, Wettbewerbsverbot) ist freiwillig, aber genau das, was bei Streit entscheidet.",
      },
    ],
    seo: {
      title: "GmbH-Gesellschaftsvertrag Vorlage 2026 (Satzung) | GründerX",
      description:
        "GmbH-Satzung als kostenlose Vorlage: Stammkapital 25.000 EUR, Gesellschafterversammlung, Vinkulierung, Einziehung, Abfindung. Entwurf für den Notartermin.",
    },
    stand: "2026-10",
    text: `Gesellschaftsvertrag der [Name] GmbH

Gesellschafter:

1. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
2. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
[3. ggf. weitere Gesellschafter oder Gesellschaften mit Handelsregisternummer]

§ 1 Firma, Sitz, Dauer, Geschäftsjahr
(1) Die Firma der Gesellschaft lautet: [Name] GmbH.
(2) Die Gesellschaft hat ihren Sitz in [Ort].
(3) Die Gesellschaft ist auf unbestimmte Zeit errichtet.
(4) Geschäftsjahr ist das Kalenderjahr. Das erste Geschäftsjahr beginnt mit der Eintragung in das Handelsregister und endet am 31.12.[Jahr].

§ 2 Gegenstand des Unternehmens
(1) Gegenstand des Unternehmens ist [genaue Beschreibung, z. B. „der Handel mit Haushaltswaren über das Internet sowie die Erbringung von Logistik- und Marketingdienstleistungen für Dritte“].
(2) Die Gesellschaft ist zu allen Geschäften und Maßnahmen berechtigt, die dem Gegenstand des Unternehmens dienen. Sie kann Zweigniederlassungen errichten, andere Unternehmen gründen, erwerben oder sich an ihnen beteiligen.

§ 3 Stammkapital und Geschäftsanteile
(1) Das Stammkapital der Gesellschaft beträgt 25.000,00 EUR.
(2) Es ist eingeteilt in 25.000 Geschäftsanteile mit einem Nennbetrag von je 1,00 EUR. Hiervon übernehmen:
   a) [Vorname Nachname] [Anzahl] Geschäftsanteile (Nr. 1 bis [Nr.]) im Gesamtnennbetrag von [Betrag] EUR,
   b) [Vorname Nachname] [Anzahl] Geschäftsanteile (Nr. [Nr.] bis 25.000) im Gesamtnennbetrag von [Betrag] EUR.
(3) Die Einlagen sind in Geld zu leisten. Auf jeden Geschäftsanteil ist vor der Anmeldung [die Hälfte / der volle Nennbetrag] einzuzahlen, insgesamt mindestens 12.500,00 EUR. Der Rest ist auf Anforderung der Geschäftsführung nach Gesellschafterbeschluss einzuzahlen.
[Alternative bei Sacheinlage: (3) Der Gesellschafter [Name] leistet seine Einlage auf die Geschäftsanteile Nr. [Nr.] bis [Nr.] durch Einbringung von [Gegenstand, z. B. „dem Einzelunternehmen [Name] mit allen Aktiva und Passiva laut Einbringungsbilanz zum [Datum]“]. Ein etwaiger Mehrwert wird der Kapitalrücklage gutgeschrieben.]

§ 4 Geschäftsführung und Vertretung
(1) Die Gesellschaft hat einen oder mehrere Geschäftsführer, die von der Gesellschafterversammlung bestellt und abberufen werden.
(2) Ist nur ein Geschäftsführer bestellt, vertritt er die Gesellschaft allein. Sind mehrere Geschäftsführer bestellt, vertreten je zwei gemeinsam oder einer gemeinsam mit einem Prokuristen.
(3) Die Gesellschafterversammlung kann allen oder einzelnen Geschäftsführern Einzelvertretungsbefugnis erteilen und sie von den Beschränkungen des § 181 BGB befreien. Gleiches gilt für Liquidatoren.
(4) Die Geschäftsführer sind an die Weisungen der Gesellschafterversammlung und an eine von dieser erlassene Geschäftsordnung gebunden.

§ 5 Zustimmungspflichtige Geschäfte
Die Geschäftsführer bedürfen für folgende Geschäfte der vorherigen Zustimmung der Gesellschafterversammlung:
   a) Erwerb, Veräußerung und Belastung von Grundstücken und grundstücksgleichen Rechten,
   b) Erwerb, Veräußerung und Aufgabe von Beteiligungen und Betrieben,
   c) Investitionen über [Betrag] EUR im Einzelfall oder über [Betrag] EUR im Geschäftsjahr,
   d) Aufnahme von Krediten und Übernahme von Bürgschaften, Garantien und Sicherheiten über [Betrag] EUR,
   e) Gewährung von Darlehen außerhalb des gewöhnlichen Geschäftsbetriebs,
   f) Abschluss, Änderung und Beendigung von Verträgen mit einer Laufzeit über [z. B. 2] Jahre oder einer Jahresbelastung über [Betrag] EUR,
   g) Abschluss von Anstellungsverträgen mit einem Jahresgehalt über [Betrag] EUR, Erteilung von Prokura und Generalvollmacht,
   h) Geschäfte zwischen der Gesellschaft und Gesellschaftern, Geschäftsführern oder deren Angehörigen,
   i) Aufnahme neuer Geschäftszweige und Einstellung bestehender.

§ 6 Gesellschafterversammlung
(1) Die ordentliche Gesellschafterversammlung findet jährlich innerhalb von [z. B. 8] Monaten nach Ende des Geschäftsjahres am Sitz der Gesellschaft statt. Außerordentliche Versammlungen sind einzuberufen, wenn das Interesse der Gesellschaft es erfordert oder Gesellschafter mit mindestens 10 % des Stammkapitals dies unter Angabe des Zwecks verlangen (§ 50 GmbHG).
(2) Die Einberufung erfolgt durch die Geschäftsführung in Textform (Brief oder E-Mail an die zuletzt mitgeteilte Adresse) mit einer Frist von mindestens zwei Wochen unter Mitteilung von Ort, Zeit und Tagesordnung. Für die Fristberechnung werden der Tag der Absendung und der Tag der Versammlung nicht mitgezählt.
(3) Versammlungen können mit Einverständnis aller Gesellschafter per Video- oder Telefonkonferenz abgehalten werden. Ohne Einhaltung von Form und Frist können Beschlüsse gefasst werden, wenn alle Gesellschafter anwesend oder vertreten sind und kein Gesellschafter widerspricht.
(4) Die Versammlung ist beschlussfähig, wenn mindestens [z. B. 75] % des Stammkapitals anwesend oder vertreten sind. Andernfalls ist innerhalb von zwei Wochen eine zweite Versammlung mit gleicher Tagesordnung einzuberufen, die unabhängig vom vertretenen Kapital beschlussfähig ist; darauf ist in der Einladung hinzuweisen.
(5) Jeder Gesellschafter kann sich durch einen anderen Gesellschafter, einen Rechtsanwalt, Steuerberater oder Wirtschaftsprüfer mit schriftlicher Vollmacht vertreten lassen.
(6) Den Vorsitz führt der Gesellschafter mit der höchsten Beteiligung, bei Gleichstand der an Jahren älteste, sofern die Versammlung nichts anderes beschließt. Über die Versammlung ist eine Niederschrift anzufertigen, die der Vorsitzende unterzeichnet und die allen Gesellschaftern innerhalb von zwei Wochen zu übersenden ist.

§ 7 Gesellschafterbeschlüsse
(1) Je 1,00 EUR eines Geschäftsanteils gewährt eine Stimme.
(2) Beschlüsse werden mit einfacher Mehrheit der abgegebenen Stimmen gefasst, soweit Gesetz oder Satzung nicht eine größere Mehrheit vorschreiben. Stimmenthaltungen gelten als nicht abgegeben.
(3) Einer Mehrheit von drei Vierteln der abgegebenen Stimmen bedürfen: Änderungen der Satzung, Kapitalerhöhung und -herabsetzung, Auflösung, Umwandlung, Zustimmung zur Abtretung von Geschäftsanteilen, Einziehung, Abschluss von Unternehmensverträgen und Befreiung vom Wettbewerbsverbot.
(4) Beschlüsse können auch außerhalb einer Versammlung schriftlich, per E-Mail oder in anderer Textform gefasst werden, wenn alle Gesellschafter sich mit dieser Form einverstanden erklären oder sich an der Abstimmung beteiligen (§ 48 Abs. 2 GmbHG).
(5) Beschlüsse können nur innerhalb eines Monats nach Zugang der Niederschrift durch Klage gegen die Gesellschaft angefochten werden.

§ 8 Jahresabschluss und Gewinnverwendung
(1) Die Geschäftsführer stellen den Jahresabschluss und, soweit gesetzlich erforderlich, den Lagebericht innerhalb der gesetzlichen Fristen auf und legen ihn der Gesellschafterversammlung mit einem Vorschlag zur Ergebnisverwendung vor.
(2) Die Gesellschafter beschließen innerhalb der Frist des § 42a GmbHG über die Feststellung des Jahresabschlusses und die Verwendung des Ergebnisses. Sie können den Gewinn ganz oder teilweise in Gewinnrücklagen einstellen oder auf neue Rechnung vortragen.
(3) Der auszuschüttende Gewinn wird im Verhältnis der Geschäftsanteile verteilt. Vorabausschüttungen auf den erwarteten Gewinn sind durch Beschluss zulässig, wenn ein Zwischenabschluss einen entsprechenden Gewinn ausweist.

§ 9 Verfügung über Geschäftsanteile, Vorkaufsrecht
(1) Die Abtretung und Verpfändung von Geschäftsanteilen oder Teilen davon sowie die Bestellung eines Nießbrauchs bedürfen zu ihrer Wirksamkeit der Zustimmung der Gesellschafterversammlung mit drei Vierteln der abgegebenen Stimmen; der veräußernde Gesellschafter ist stimmberechtigt. Übertragungen auf Mitgesellschafter sind zustimmungsfrei.
(2) Den übrigen Gesellschaftern steht im Verhältnis ihrer Beteiligung ein Vorkaufsrecht zu. Der Veräußerer hat ihnen den mit dem Dritten geschlossenen Vertrag unverzüglich in Kopie zu übermitteln. Das Vorkaufsrecht kann innerhalb von [z. B. 6] Wochen nach Zugang durch schriftliche Erklärung ausgeübt werden. Üben nicht alle Berechtigten aus, wächst das Recht den Ausübenden anteilig zu.
(3) Wird das Vorkaufsrecht nicht ausgeübt, gilt die Zustimmung nach Absatz 1 als erteilt, wenn der Dritte diesem Gesellschaftsvertrag und bestehenden Gesellschaftervereinbarungen schriftlich beitritt.
(4) Die Geschäftsführer reichen nach jeder Veränderung unverzüglich eine aktualisierte Gesellschafterliste zum Handelsregister ein (§ 40 GmbHG).

§ 10 Einziehung und Zwangsabtretung
(1) Die Einziehung von Geschäftsanteilen ist mit Zustimmung des betroffenen Gesellschafters jederzeit zulässig.
(2) Ohne Zustimmung kann die Gesellschafterversammlung die Einziehung beschließen, wenn
   a) über das Vermögen des Gesellschafters das Insolvenzverfahren eröffnet oder mangels Masse abgelehnt wird,
   b) in den Geschäftsanteil die Zwangsvollstreckung betrieben wird und die Maßnahme nicht innerhalb von drei Monaten aufgehoben wird,
   c) in der Person des Gesellschafters ein wichtiger Grund vorliegt, insbesondere eine grobe Verletzung der Gesellschafterpflichten oder ein Verstoß gegen das Wettbewerbsverbot,
   d) der Gesellschafter seine Beteiligung kündigt,
   e) der Gesellschafter verstirbt und der Anteil auf Personen übergeht, die nicht Mitgesellschafter oder Abkömmlinge sind,
   f) eine Vesting- oder Gesellschaftervereinbarung dies vorsieht.
(3) Der Beschluss bedarf einer Mehrheit von drei Vierteln der abgegebenen Stimmen; der Betroffene hat kein Stimmrecht. Statt der Einziehung kann die Gesellschafterversammlung verlangen, dass der Anteil an die Gesellschaft, einen Mitgesellschafter oder einen von ihr benannten Dritten abgetreten wird.
(4) Die Einziehung wird mit Zugang des Beschlusses beim Betroffenen wirksam, unabhängig von der Zahlung der Abfindung. Die übrigen Gesellschafter haften anteilig für die Abfindung, wenn die Gesellschaft sie aus freiem Vermögen nicht zahlen kann.

§ 11 Abfindung
(1) Der ausscheidende Gesellschafter erhält eine Abfindung in Höhe des Verkehrswerts seines Geschäftsanteils zum Stichtag des Ausscheidens, ermittelt nach dem vereinfachten Ertragswertverfahren (§§ 199 ff. BewG), sofern sich die Beteiligten nicht innerhalb von zwei Monaten auf einen Wert einigen.
(2) In den Fällen des § 10 Abs. 2 lit. a bis c beträgt die Abfindung [z. B. 70] % des Werts nach Absatz 1.
(3) Die Abfindung ist in [z. B. 4] gleichen Halbjahresraten zu zahlen; die erste Rate wird sechs Monate nach dem Stichtag fällig. Der offene Betrag wird mit 2 Prozentpunkten über dem Basiszinssatz verzinst. Die Gesellschaft darf jederzeit vorzeitig zahlen.
(4) Bei Streit über die Höhe entscheidet ein von der Industrie- und Handelskammer [Ort] benannter Wirtschaftsprüfer als Schiedsgutachter verbindlich. Die Kosten tragen Gesellschaft und Ausscheidender je zur Hälfte.

§ 12 Wettbewerbsverbot, Bekanntmachungen, Schlussbestimmungen
(1) Die Gesellschafter dürfen während ihrer Zugehörigkeit im Geschäftsbereich der Gesellschaft weder für eigene noch für fremde Rechnung tätig sein noch sich an Wettbewerbern beteiligen. Die Gesellschafterversammlung kann durch Beschluss Befreiung erteilen; Bestehendes: [z. B. „keine“].
(2) Bekanntmachungen der Gesellschaft erfolgen ausschließlich im Bundesanzeiger.
(3) Die Gesellschaft trägt die Gründungskosten (Notar, Gericht, Veröffentlichung, Beratung) bis zu einem Betrag von [Betrag, z. B. 2.500] EUR.
(4) Sollte eine Bestimmung dieser Satzung unwirksam sein oder werden, bleibt die Satzung im Übrigen wirksam. Die Gesellschafter sind verpflichtet, die unwirksame Bestimmung durch eine wirksame zu ersetzen, die dem gewollten Zweck am nächsten kommt.
(5) Gerichtsstand ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt das Recht der Bundesrepublik Deutschland.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gesellschafter


______________________________
[Vorname Nachname], Gesellschafter

(Notarielle Beurkundung erforderlich, § 2 GmbHG)

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "gruendervereinbarung",
    titel: "Gründervereinbarung (Founders' Agreement)",
    kurz: "Vorgründungsvereinbarung für Gründerteams vor dem Notartermin: Rollen, Beteiligung, Vesting-Verweis, IP-Übertragung, Kosten und was gilt, wenn die Gründung scheitert.",
    kategorie: "gesellschaft",
    dateiname: "Gruendervereinbarung",
    wofuer: [
      "Zwei oder mehr Gründer arbeiten schon am Produkt, die UG oder GmbH ist aber noch nicht gegründet",
      "Bevor Code, Marke oder Kundenkontakte entstehen, soll klar sein, wem sie gehören",
      "Als Grundlage für die spätere Satzung und Vesting-Vereinbarung beim Notar",
      "Wenn ein Gründer vor der Gründung abspringt und die Beteiligung geregelt werden muss",
    ],
    enthaelt: [
      "§ 1 Vorhaben und Ziel",
      "§ 2 Rollen und Aufgaben der Gründer",
      "§ 3 Zeiteinsatz und Vergütung",
      "§ 4 Beteiligung an der künftigen Gesellschaft",
      "§ 5 Vesting (Verweis)",
      "§ 6 Geistiges Eigentum und Arbeitsergebnisse",
      "§ 7 Kosten und Auslagen",
      "§ 8 Entscheidungen bis zur Gründung",
      "§ 9 Vertraulichkeit und Wettbewerb",
      "§ 10 Ausscheiden und Scheitern der Gründung",
      "§ 11 Laufzeit und Schlussbestimmungen",
    ],
    hinweise: [
      "Sobald mehrere Gründer gemeinsam auf ein Ziel hinarbeiten, bilden sie rechtlich bereits eine GbR (Vorgründungsgesellschaft) und haften persönlich. Die Vereinbarung regelt das Innenverhältnis; nach außen schützt erst die eingetragene UG/GmbH.",
      "Eine verbindliche Pflicht, die GmbH zu gründen (Vorvertrag), müsste notariell beurkundet werden. Die Vorlage formuliert deshalb eine Absicht mit Regeln für den Fall des Scheiterns, keine einklagbare Gründungspflicht.",
      "Die IP-Übertragung wirkt nur, wenn sie konkret ist: Code, Designs, Marken, Domains, Kundenlisten. Bei Urheberrechten ist nur die Einräumung von Nutzungsrechten möglich, nicht die Übertragung des Urheberrechts selbst (§ 29 UrhG).",
      "Wer schon Geld in das Vorhaben steckt, sollte die Kosten als Darlehen oder spätere Einlage dokumentieren, sonst sind sie bei Streit verloren.",
    ],
    faqs: [
      {
        q: "Warum reicht nicht einfach der Gesellschaftsvertrag beim Notar?",
        a: "Weil zwischen Idee und Notartermin oft Monate liegen, in denen Code, Design und Kunden entstehen. Ohne Vereinbarung gehören diese Ergebnisse dem jeweiligen Gründer, und ein Streit über Anteile kann das Vorhaben vor der Gründung beenden. Die Vereinbarung hält die Eckpunkte fest, die später in die Satzung übergehen.",
      },
      {
        q: "Was passiert, wenn ein Mitgründer vor der Gründung aussteigt?",
        a: "Nach der Vorlage verliert er seinen Anspruch auf die Beteiligung, überlässt seine Arbeitsergebnisse den verbleibenden Gründern und erhält seine nachgewiesenen Auslagen erstattet. Ob darüber hinaus eine Vergütung gezahlt wird, legt ihr in § 10 fest.",
      },
      {
        q: "Ist die Gründervereinbarung formfrei gültig?",
        a: "Ja, solange sie keine Verpflichtung zur Gründung einer GmbH oder zur Übertragung von GmbH-Anteilen enthält; diese wären beurkundungspflichtig. Schriftform ist trotzdem Pflicht, weil die Vereinbarung sonst im Streitfall nicht beweisbar ist.",
      },
      {
        q: "Wie sollten wir die Anteile verteilen?",
        a: "Gleiche Anteile sind einfach, aber nur fair, wenn Einsatz und Risiko gleich sind. Wer Vollzeit arbeitet, Kapital einbringt oder die Kerntechnologie liefert, sollte mehr erhalten. Wichtiger als die exakte Zahl ist das Vesting: Es sorgt dafür, dass Anteile nur bleiben, wenn der Gründer auch bleibt.",
      },
    ],
    seo: {
      title: "Gründervereinbarung Vorlage: Founders' Agreement 2026 | GründerX",
      description:
        "Kostenlose Gründervereinbarung für Start-up-Teams vor der Gründung: Rollen, Anteile, Vesting, IP-Übertragung, Kosten und Ausstieg. Als Word, PDF oder Text.",
    },
    stand: "2026-10",
    text: `Gründervereinbarung (Vorgründungsvereinbarung)

zwischen

1. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
2. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
[3. ggf. weitere Gründer]

– gemeinsam „die Gründer“ –

Präambel
Die Gründer beabsichtigen, gemeinsam ein Unternehmen mit dem Vorhaben [kurze Beschreibung, z. B. „Entwicklung einer Software zur Terminplanung für Handwerksbetriebe“] (das „Vorhaben“) aufzubauen und hierfür eine [UG (haftungsbeschränkt) / GmbH] mit der Firma „[Name]“ (die „Gesellschaft“) zu gründen. Bis zur Gründung regeln sie ihre Zusammenarbeit mit dieser Vereinbarung. Die Gründer sind sich bewusst, dass sie bis zur Eintragung der Gesellschaft als Gesellschaft bürgerlichen Rechts zusammenarbeiten und persönlich haften.

§ 1 Vorhaben und Ziel
(1) Ziel der Zusammenarbeit ist die Gründung der Gesellschaft bis zum [Datum] und die Entwicklung des Vorhabens bis zur Marktreife.
(2) Die Gründer verpflichten sich, bis zur Gründung alle Handlungen zu unterlassen, die das Vorhaben gefährden, und die Gesellschaft nach der Gründung gemeinsam fortzuführen. Eine einklagbare Verpflichtung zur Gründung der Gesellschaft wird nicht begründet.

§ 2 Rollen und Aufgaben
(1) Die Gründer übernehmen folgende Verantwortungsbereiche:
   a) [Vorname Nachname]: [z. B. Produkt und Technik (CTO): Softwareentwicklung, Infrastruktur, Datenschutz]
   b) [Vorname Nachname]: [z. B. Geschäftsführung und Vertrieb (CEO): Finanzen, Kunden, Partner, Investoren]
   c) [Vorname Nachname]: [z. B. Marketing und Design]
(2) Als Geschäftsführer der künftigen Gesellschaft soll [Vorname Nachname] bestellt werden. [Optional: Weitere Geschäftsführer: [Name].]
(3) Die Gründer stimmen sich mindestens [wöchentlich] in einem Gründertreffen ab und halten Entscheidungen schriftlich fest.

§ 3 Zeiteinsatz und Vergütung
(1) Die Gründer bringen ihre Arbeitskraft wie folgt ein: [Vorname Nachname] [Stunden] Stunden pro Woche, [Vorname Nachname] [Stunden] Stunden pro Woche.
(2) Bis zur Gründung erhalten die Gründer keine Vergütung. [Alternative: Jeder Gründer erhält ab dem [Datum] eine monatliche Vergütung von [Betrag] EUR, die als Vorschuss auf spätere Geschäftsführervergütungen gilt und nur aus Einnahmen des Vorhabens gezahlt wird.]
(3) Nebentätigkeiten, die den Zeiteinsatz nach Absatz 1 einschränken, sind den übrigen Gründern vorher anzuzeigen. Bestehende Tätigkeiten: [z. B. „Teilzeitanstellung von [Name] bei [Firma] bis zum [Datum]“].

§ 4 Beteiligung an der künftigen Gesellschaft
(1) Am Stammkapital der Gesellschaft sollen die Gründer wie folgt beteiligt werden: [Vorname Nachname] [z. B. 40] %, [Vorname Nachname] [z. B. 40] %, [Vorname Nachname] [z. B. 20] %.
(2) Das Stammkapital soll [Betrag] EUR betragen und von den Gründern im Verhältnis ihrer Beteiligung in bar eingezahlt werden.
(3) Die Gründer verpflichten sich, bei Gründung einen Gesellschaftsvertrag zu beschließen, der mindestens Vinkulierung der Geschäftsanteile, Einziehungsgründe, eine Abfindungsregelung und ein Wettbewerbsverbot enthält. Die Vereinbarung eines Mitarbeiterbeteiligungspools von bis zu [z. B. 10] % des Stammkapitals wird angestrebt.
(4) Für die Aufnahme von Investoren gilt: Jeder Gründer stimmt einer Kapitalerhöhung zu, wenn die Mehrheit der Gründer nach Köpfen dies beschließt und die Beteiligung der Gründer untereinander im gleichen Verhältnis verwässert wird.

§ 5 Vesting
(1) Die Geschäftsanteile der Gründer unterliegen nach Gründung einem Vesting über [48] Monate mit einem Cliff von [12] Monaten, gerechnet ab dem [Datum, z. B. Beginn der Zusammenarbeit]. Die Einzelheiten (Good Leaver, Bad Leaver, Call-Option, Abfindung, Beschleunigung bei Exit) werden in einer gesonderten Vesting-Vereinbarung bei Gründung geregelt.
(2) Bis zur Gründung gilt entsprechend: Scheidet ein Gründer vor der Gründung aus, entfällt sein Anspruch auf eine Beteiligung vollständig (§ 10).

§ 6 Geistiges Eigentum und Arbeitsergebnisse
(1) Alle im Rahmen des Vorhabens entstandenen oder entstehenden Arbeitsergebnisse, insbesondere Quellcode, Software, Datenbanken, Designs, Texte, Konzepte, Geschäftspläne, Marken, Logos, Domains, Social-Media-Konten und Kundenkontakte („Arbeitsergebnisse“), sollen der Gesellschaft zustehen.
(2) Jeder Gründer räumt den übrigen Gründern gemeinsam bereits jetzt das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte, übertragbare und unterlizenzierbare Nutzungsrecht an seinen Arbeitsergebnissen für alle bekannten Nutzungsarten ein. Mit Eintragung der Gesellschaft werden diese Rechte auf die Gesellschaft übertragen; die Gründer verpflichten sich, hierzu alle erforderlichen Erklärungen abzugeben (insbesondere Übertragungsverträge, Markenumschreibungen, Domain-Übertragungen).
(3) Vorbestehende Rechte, die ein Gründer einbringt, sind in Anlage 1 aufgeführt: [z. B. „Domain [name].de, registriert auf [Name]“; „Code-Repository [Name], Stand [Datum]“]. Nicht aufgeführte Rechte gelten als Arbeitsergebnisse nach Absatz 1.
(4) Eine gesonderte Vergütung für die Rechteeinräumung erfolgt nicht; sie ist mit der Beteiligung nach § 4 abgegolten. Die Gründer stellen sicher, dass keine Rechte Dritter (insbesondere früherer Arbeitgeber oder Auftraggeber) an den Arbeitsergebnissen bestehen.
(5) Open-Source-Komponenten dürfen nur unter Lizenzen verwendet werden, die eine kommerzielle Nutzung ohne Offenlegungspflicht des eigenen Codes erlauben, sofern die Gründer nichts anderes beschließen.

§ 7 Kosten und Auslagen
(1) Die Kosten der Gründung (Notar, Handelsregister, Beratung) trägt die Gesellschaft im Rahmen des in der Satzung bezifferten Gründungsaufwands, im Übrigen die Gründer im Verhältnis ihrer Beteiligung.
(2) Auslagen für das Vorhaben vor der Gründung (Software, Hosting, Domains, Reisen) bedürfen ab [Betrag, z. B. 200] EUR im Einzelfall der vorherigen Zustimmung aller Gründer. Nachgewiesene Auslagen werden in einer Auslagenliste geführt und nach Gründung von der Gesellschaft erstattet oder als Gesellschafterdarlehen übernommen, sobald die Liquidität dies zulässt.
(3) Bisherige Auslagen: [Vorname Nachname] [Betrag] EUR, [Vorname Nachname] [Betrag] EUR (Belege in Anlage 2).

§ 8 Entscheidungen bis zur Gründung
(1) Entscheidungen des gewöhnlichen Geschäftsgangs trifft jeder Gründer in seinem Verantwortungsbereich allein.
(2) Folgende Entscheidungen bedürfen der Zustimmung aller Gründer: Abschluss von Verträgen über [Betrag] EUR, Aufnahme von Fremdkapital, Gespräche mit Investoren über Beteiligungen, Anmeldung von Marken und Patenten, Einstellung von Mitarbeitern oder Freelancern, Veröffentlichung des Produkts.
(3) Kommt keine Einigung zustande, entscheidet [die Mehrheit der Gründer nach Köpfen / ein gemeinsam benannter Mentor als Schlichter].

§ 9 Vertraulichkeit und Wettbewerb
(1) Die Gründer behandeln alle Informationen über das Vorhaben vertraulich und geben sie nur an Berater, Investoren und Dienstleister weiter, die zur Vertraulichkeit verpflichtet sind. Diese Pflicht gilt auch nach Beendigung dieser Vereinbarung für [z. B. 3] Jahre.
(2) Während der Laufzeit dieser Vereinbarung darf kein Gründer ein konkurrierendes Vorhaben betreiben oder sich daran beteiligen.

§ 10 Ausscheiden und Scheitern der Gründung
(1) Jeder Gründer kann diese Vereinbarung mit einer Frist von [z. B. 4] Wochen schriftlich kündigen. Die übrigen Gründer können einen Gründer aus wichtigem Grund (insbesondere bei dauerhafter Nichterfüllung des Zeiteinsatzes, Verstoß gegen §§ 6 oder 9) durch einstimmigen Beschluss ausschließen.
(2) Scheidet ein Gründer aus, so
   a) entfällt sein Anspruch auf Beteiligung an der Gesellschaft,
   b) bleiben die Rechte nach § 6 bei den verbleibenden Gründern; der Ausscheidende gibt alle Zugänge, Unterlagen und Daten heraus und löscht eigene Kopien,
   c) erhält er seine nachgewiesenen Auslagen nach § 7 erstattet, sobald die Gesellschaft gegründet ist oder das Vorhaben Einnahmen erzielt, spätestens nach [z. B. 12] Monaten,
   d) [optional: erhält er für seinen Arbeitseinsatz eine einmalige Vergütung von [Betrag] EUR, zahlbar [Fälligkeit]].
(3) Wird die Gesellschaft nicht bis zum [Datum] gegründet oder beschließen die Gründer, das Vorhaben aufzugeben, endet diese Vereinbarung. Die Arbeitsergebnisse stehen dann allen Gründern gemeinsam zu; jeder darf sie nur mit Zustimmung der übrigen verwerten. Vorbestehende Rechte nach § 6 Abs. 3 fallen an den jeweiligen Gründer zurück. Verbleibendes Vermögen und Schulden werden im Verhältnis der geplanten Beteiligung nach § 4 verteilt.

§ 11 Laufzeit und Schlussbestimmungen
(1) Diese Vereinbarung tritt mit Unterzeichnung in Kraft und endet mit der Eintragung der Gesellschaft in das Handelsregister, soweit ihre Regelungen nicht in Satzung, Vesting- oder Gesellschaftervereinbarung übernommen werden. §§ 6 und 9 gelten fort.
(2) Änderungen bedürfen der Schriftform; das gilt auch für diese Klausel.
(3) Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam. Die Gründer ersetzen die unwirksame Regelung durch eine wirksame, die dem Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, [Ort]. Es gilt deutsches Recht.

Anlagen: 1 Vorbestehende Rechte, 2 Auslagenliste

[Ort], den [Datum]


______________________________
[Vorname Nachname]


______________________________
[Vorname Nachname]


[______________________________
[Vorname Nachname]]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "vesting-vereinbarung",
    titel: "Vesting-Vereinbarung für Gründeranteile",
    kurz: "Vesting-Vereinbarung für GmbH- oder UG-Gründer: 12 Monate Cliff, 48 Monate linear, Good und Bad Leaver, Call-Option, Abfindung und Beschleunigung beim Exit.",
    kategorie: "gesellschaft",
    dateiname: "Vesting-Vereinbarung",
    wofuer: [
      "Gründerteams, die sicherstellen wollen, dass Anteile nur bleiben, wenn der Gründer auch bleibt",
      "Vor der ersten Finanzierungsrunde, weil Investoren Vesting regelmäßig verlangen",
      "Wenn ein Mitgründer in Teilzeit einsteigt oder später dazukommt",
      "Als Ergänzung zur Satzung mit Einziehungs- und Abtretungsklausel",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Vesting-Anteile",
      "§ 2 Vesting-Zeitraum, Cliff und Vesting-Plan",
      "§ 3 Leaver-Ereignis",
      "§ 4 Good Leaver und Bad Leaver",
      "§ 5 Call-Option und Abtretungsverpflichtung",
      "§ 6 Abfindung je Leaver-Fall",
      "§ 7 Beschleunigung bei Exit (Accelerated Vesting)",
      "§ 8 Verfügungsbeschränkungen",
      "§ 9 Durchführung und Vollmacht",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Die Vereinbarung enthält die Verpflichtung, GmbH-Anteile abzutreten, und muss deshalb notariell beurkundet werden (§ 15 Abs. 4 GmbHG). Alternativ nehmt ihr die Einziehungsgründe direkt in die Satzung auf; die Vorlage ist dafür vorbereitet.",
      "Vesting betrifft nur das Innenverhältnis der Gesellschafter. Nach außen bleibt der Gründer bis zur Abtretung oder Einziehung Gesellschafter mit allen Rechten; die Gesellschafterliste ist danach zu aktualisieren.",
      "Ein zu niedriger Abfindungswert für Good Leaver kann als sittenwidrig angegriffen werden. Die Vorlage sieht deshalb für gevestete Anteile den Verkehrswert vor und begrenzt nur den Bad-Leaver-Fall.",
      "Steuerlich kann der Erwerb von Anteilen zum Nennwert bei bereits wertvoller Gesellschaft als geldwerter Vorteil gelten. Vor der Unterzeichnung mit dem Steuerberater klären, ob § 19a EStG oder eine Bewertung nötig ist.",
    ],
    faqs: [
      {
        q: "Was bedeutet Cliff und was passiert davor?",
        a: "Der Cliff ist eine Wartezeit, in der noch kein Anteil als verdient gilt. Scheidet ein Gründer innerhalb der ersten 12 Monate aus, verliert er nach der Vorlage alle Vesting-Anteile zum Nennwert. Nach dem Cliff gelten 25 % auf einen Schlag als gevestet, danach monatlich 1/48.",
      },
      {
        q: "Was ist der Unterschied zwischen Good Leaver und Bad Leaver?",
        a: "Ein Good Leaver geht ohne eigenes Verschulden, etwa durch Kündigung der Gesellschaft ohne wichtigen Grund, Krankheit oder Tod. Er behält die gevesteten Anteile oder erhält dafür den Verkehrswert. Ein Bad Leaver kündigt selbst, wird aus wichtigem Grund abberufen oder verletzt Wettbewerbsverbote; er verliert auch gevestete Anteile zu einem reduzierten Wert.",
      },
      {
        q: "Müssen wir die Vesting-Vereinbarung beim Notar unterschreiben?",
        a: "Ja, wenn sie wie diese Vorlage eine Pflicht zur Abtretung von GmbH-Anteilen enthält. Viele Gründer verbinden sie deshalb direkt mit dem Gründungstermin. Ohne Beurkundung ist die Abtretungspflicht unwirksam, und nur eine Einziehung über die Satzung bleibt möglich.",
      },
      {
        q: "Verlangen Investoren ein neues Vesting?",
        a: "Oft ja. Investoren lassen häufig einen Teil der bereits gevesteten Anteile erneut vesten (Re-Vesting), damit die Gründer nach der Runde gebunden bleiben. Mit einer bestehenden, marktüblichen Vereinbarung habt ihr eine bessere Verhandlungsposition als ohne.",
      },
    ],
    seo: {
      title: "Vesting-Vereinbarung Vorlage für Gründer 2026 | GründerX",
      description:
        "Vesting-Vereinbarung für Gründeranteile als kostenlose Vorlage: 12 Monate Cliff, 48 Monate linear, Good/Bad Leaver, Call-Option, Abfindung, Exit-Beschleunigung.",
    },
    stand: "2026-10",
    text: `Vesting-Vereinbarung

zwischen

1. [Vorname Nachname], wohnhaft [Straße, PLZ Ort] – „Gründer 1“ –
2. [Vorname Nachname], wohnhaft [Straße, PLZ Ort] – „Gründer 2“ –
[3. ggf. weitere Gründer]

– gemeinsam „die Gründer“ oder „die Gesellschafter“ –

und

[Name] [UG (haftungsbeschränkt) / GmbH], [Straße, PLZ Ort], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch [Geschäftsführer] – „die Gesellschaft“ –

§ 1 Gegenstand und Vesting-Anteile
(1) Die Gründer sind am Stammkapital der Gesellschaft von [Betrag] EUR wie folgt beteiligt: Gründer 1 mit [Anzahl] Geschäftsanteilen (Nr. [von] bis [bis]), Gründer 2 mit [Anzahl] Geschäftsanteilen (Nr. [von] bis [bis]).
(2) Sämtliche Geschäftsanteile der Gründer unterliegen dem Vesting nach dieser Vereinbarung („Vesting-Anteile“). [Alternative: Dem Vesting unterliegen [z. B. 80] % der Geschäftsanteile jedes Gründers; die übrigen gelten als sofort gevestet.]
(3) Zweck des Vesting ist, die Beteiligung der Gründer an ihre fortdauernde Tätigkeit für die Gesellschaft zu binden.

§ 2 Vesting-Zeitraum, Cliff und Vesting-Plan
(1) Der Vesting-Zeitraum beträgt 48 Monate und beginnt am [Datum] („Vesting-Beginn“).
(2) Innerhalb der ersten 12 Monate nach Vesting-Beginn gilt kein Vesting-Anteil als gevestet („Cliff“). Mit Ablauf des Cliff gelten 25 % der Vesting-Anteile als gevestet.
(3) Danach gilt mit Ablauf jedes weiteren Monats ein weiteres 1/48 der Vesting-Anteile als gevestet, sodass nach 48 Monaten alle Vesting-Anteile gevestet sind. Angefangene Monate werden nicht berücksichtigt; Bruchteile von Geschäftsanteilen werden kaufmännisch auf ganze Anteile gerundet.
(4) Maßgeblich für den Stand des Vesting ist der Tag des Leaver-Ereignisses nach § 3.
(5) Der Vesting-Lauf wird nicht unterbrochen durch Urlaub, Krankheit bis zu [z. B. 3] Monaten, Elternzeit bis zu [z. B. 6] Monaten oder eine mit Zustimmung der Gesellschafterversammlung vereinbarte Reduzierung der Tätigkeit.

§ 3 Leaver-Ereignis
Ein Leaver-Ereignis liegt vor, wenn die Tätigkeit des Gründers als Geschäftsführer oder in einem sonstigen Dienst- oder Arbeitsverhältnis für die Gesellschaft endet, insbesondere durch
   a) Kündigung oder Aufhebung des Anstellungsvertrags durch den Gründer oder die Gesellschaft,
   b) Abberufung als Geschäftsführer,
   c) Tod oder dauerhafte Arbeitsunfähigkeit über [z. B. 6] Monate,
   d) Eröffnung des Insolvenzverfahrens über das Vermögen des Gründers oder Pfändung seines Geschäftsanteils,
   e) schwerwiegender Verstoß gegen Wettbewerbsverbot, Geheimhaltungspflichten oder diese Vereinbarung, auch ohne Beendigung der Tätigkeit.

§ 4 Good Leaver und Bad Leaver
(1) Ein Gründer ist „Good Leaver“, wenn das Leaver-Ereignis eintritt durch
   a) Kündigung oder Abberufung durch die Gesellschaft ohne wichtigen Grund im Sinne des § 626 BGB,
   b) Kündigung durch den Gründer aus einem von der Gesellschaft zu vertretenden wichtigen Grund,
   c) Tod oder dauerhafte Arbeitsunfähigkeit,
   d) einvernehmliche Aufhebung, bei der die Gesellschafterversammlung den Good-Leaver-Status beschließt.
(2) Ein Gründer ist „Bad Leaver“ in allen anderen Fällen, insbesondere bei
   a) Eigenkündigung ohne von der Gesellschaft zu vertretenden wichtigen Grund,
   b) Kündigung oder Abberufung durch die Gesellschaft aus wichtigem Grund,
   c) den Fällen des § 3 lit. d und e.

§ 5 Call-Option und Abtretungsverpflichtung
(1) Mit Eintritt eines Leaver-Ereignisses bietet der betroffene Gründer hiermit unwiderruflich an, folgende Geschäftsanteile an die Gesellschaft oder an einen oder mehrere von der Gesellschafterversammlung benannte Erwerber (Mitgesellschafter, Gesellschaft oder Dritte) abzutreten („Call-Option“):
   a) als Good Leaver: alle noch nicht gevesteten Vesting-Anteile,
   b) als Bad Leaver: alle Vesting-Anteile, gevestet und nicht gevestet.
(2) Die Call-Option kann innerhalb von [z. B. 6] Monaten nach Kenntnis der Gesellschaft vom Leaver-Ereignis durch Beschluss der Gesellschafterversammlung ausgeübt werden; der betroffene Gründer hat kein Stimmrecht. Die Ausübung erfolgt durch Erklärung gegenüber dem Gründer in notariell beurkundeter Form.
(3) Die Gesellschafterversammlung kann statt der Abtretung die Einziehung der betroffenen Anteile nach § [Nummer] des Gesellschaftsvertrags beschließen. Der Gründer stimmt der Einziehung bereits jetzt zu.
(4) Gevestete Anteile eines Good Leavers verbleiben bei diesem. Die Gesellschafterversammlung kann jedoch innerhalb der Frist nach Absatz 2 verlangen, dass auch diese Anteile gegen Zahlung des Verkehrswerts nach § 6 Abs. 1 abgetreten werden, wenn der Good Leaver nicht mehr für die Gesellschaft tätig ist.

§ 6 Abfindung je Leaver-Fall
(1) Für gevestete Anteile, die nach § 5 Abs. 4 abgetreten werden, erhält der Good Leaver den Verkehrswert zum Tag des Leaver-Ereignisses. Der Verkehrswert entspricht der Bewertung der letzten Finanzierungsrunde, sofern diese nicht länger als 12 Monate zurückliegt, andernfalls dem Wert nach dem vereinfachten Ertragswertverfahren (§§ 199 ff. BewG), mindestens jedoch dem Nennbetrag.
(2) Für nicht gevestete Anteile erhält jeder Leaver den Nennbetrag, höchstens jedoch den Verkehrswert.
(3) Der Bad Leaver erhält für gevestete Anteile [z. B. 50] % des Verkehrswerts nach Absatz 1, mindestens den Nennbetrag, und für nicht gevestete Anteile den Nennbetrag.
(4) Die Abfindung ist in [z. B. 3] gleichen Jahresraten zu zahlen, erstmals [6] Monate nach Abtretung; sie wird mit 2 Prozentpunkten über dem Basiszinssatz verzinst. Beträge bis [Betrag, z. B. 5.000] EUR sind sofort fällig. Zahlungen aus dem gebundenen Vermögen der Gesellschaft (§ 30 GmbHG) sind ausgeschlossen; in diesem Fall zahlen die Erwerber.
(5) Bei Streit über den Verkehrswert entscheidet ein von der Industrie- und Handelskammer [Ort] benannter Wirtschaftsprüfer als Schiedsgutachter; die Kosten tragen die Parteien je zur Hälfte.

§ 7 Beschleunigung bei Exit
(1) Kommt es zu einem Exit, gelten [alle / 50 % der] noch nicht gevesteten Vesting-Anteile mit Wirksamwerden des Exits als gevestet („Single Trigger“).
[Alternative („Double Trigger“): (1) Kommt es zu einem Exit und wird die Tätigkeit des Gründers innerhalb von 12 Monaten danach durch die Gesellschaft oder den Erwerber ohne wichtigen Grund beendet, gelten alle noch nicht gevesteten Vesting-Anteile als gevestet.]
(2) Exit ist die Veräußerung von mehr als 50 % der Geschäftsanteile oder des wesentlichen Vermögens der Gesellschaft an einen Dritten, der nicht Gesellschafter oder mit einem Gesellschafter verbunden ist, sowie ein Börsengang.
(3) Eine Finanzierungsrunde ist kein Exit.

§ 8 Verfügungsbeschränkungen
(1) Die Gründer dürfen über Vesting-Anteile während des Vesting-Zeitraums nicht ohne Zustimmung der Gesellschafterversammlung verfügen; der Gesellschaftsvertrag bleibt unberührt.
(2) Ein Erwerber von Vesting-Anteilen tritt in diese Vereinbarung ein. Die Gründer verpflichten sich, Erwerbern diese Vereinbarung vor Abtretung vorzulegen.

§ 9 Durchführung und Vollmacht
(1) Jeder Gründer bevollmächtigt die Gesellschaft, vertreten durch einen nicht betroffenen Geschäftsführer, unwiderruflich und unter Befreiung von § 181 BGB, die Abtretung nach § 5 in seinem Namen zu erklären und entgegenzunehmen, falls er nicht innerhalb von zwei Wochen nach Aufforderung selbst mitwirkt. Die Vollmacht wird gesondert notariell beglaubigt.
(2) Die Geschäftsführung reicht nach jeder Abtretung oder Einziehung unverzüglich eine aktualisierte Gesellschafterliste zum Handelsregister ein.
(3) Die Gesellschafter verpflichten sich, bei allen Beschlüssen so zu stimmen, wie es zur Durchführung dieser Vereinbarung erforderlich ist.

§ 10 Schlussbestimmungen
(1) Diese Vereinbarung geht als Gesellschaftervereinbarung bei Widersprüchen im Innenverhältnis dem Gesellschaftsvertrag vor. Sie endet mit vollständigem Vesting aller Vesting-Anteile oder mit einem Exit, der alle Anteile erfasst.
(2) Änderungen bedürfen der Schriftform, soweit nicht notarielle Form erforderlich ist; das gilt auch für diese Klausel.
(3) Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam. Die Parteien ersetzen die unwirksame Bestimmung durch eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt deutsches Recht.
(5) Die Kosten der notariellen Beurkundung trägt die Gesellschaft.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gründer 1


______________________________
[Vorname Nachname], Gründer 2


______________________________
[Name] [UG (haftungsbeschränkt) / GmbH], vertreten durch [Geschäftsführer]

(Notarielle Beurkundung erforderlich, § 15 Abs. 4 GmbHG)

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "gesellschafterbeschluss",
    titel: "Gesellschafterbeschluss im Umlaufverfahren",
    kurz: "Schriftlicher Umlaufbeschluss der Gesellschafter einer GmbH oder UG mit mehreren Beschlussgegenständen: Jahresabschluss, Ergebnisverwendung, Entlastung, Geschäftsführerbestellung.",
    kategorie: "gesellschaft",
    dateiname: "Gesellschafterbeschluss-Umlaufverfahren",
    wofuer: [
      "Jährliche Pflichtbeschlüsse einer GmbH oder UG ohne Versammlung erledigen",
      "Gesellschafter sitzen an verschiedenen Orten und wollen per E-Mail oder Post abstimmen",
      "Bestellung oder Abberufung eines Geschäftsführers mit Nachweis für das Handelsregister",
      "Dokumentation für Finanzamt, Bank und Transparenz gegenüber Investoren",
    ],
    enthaelt: [
      "Einleitung: Gesellschaft, Gesellschafter, Verzicht auf Form und Frist",
      "Beschluss 1: Feststellung des Jahresabschlusses",
      "Beschluss 2: Verwendung des Ergebnisses",
      "Beschluss 3: Entlastung der Geschäftsführung",
      "Beschluss 4: Bestellung eines Geschäftsführers",
      "Beschluss 5: Sonstige Beschlüsse (optional)",
      "Abstimmungsergebnis und Feststellung",
      "Unterschriften aller Gesellschafter",
    ],
    hinweise: [
      "Ein Umlaufbeschluss ist nur wirksam, wenn alle Gesellschafter mit der schriftlichen Abstimmung einverstanden sind oder dem Beschluss selbst in Textform zustimmen (§ 48 Abs. 2 GmbHG). Fehlt eine Unterschrift und widerspricht der Gesellschafter, ist der Beschluss anfechtbar.",
      "Der Jahresabschluss muss innerhalb von acht Monaten nach Ende des Geschäftsjahres festgestellt werden, bei kleinen Gesellschaften innerhalb von elf Monaten (§ 42a Abs. 2 GmbHG). Die Offenlegung beim Unternehmensregister läuft unabhängig davon spätestens zwölf Monate nach Bilanzstichtag.",
      "Eine UG darf nur ausschütten, was nach Einstellung von 25 % des Jahresüberschusses in die gesetzliche Rücklage bleibt (§ 5a Abs. 3 GmbHG). Der Ausschüttungsbeschluss muss das ausweisen.",
      "Die Bestellung eines Geschäftsführers muss vom neuen Geschäftsführer zum Handelsregister angemeldet werden; dafür braucht er eine notariell beglaubigte Anmeldung und muss versichern, dass keine Bestellungshindernisse nach § 6 Abs. 2 GmbHG vorliegen.",
      "Gesellschafter-Geschäftsführer dürfen bei der eigenen Entlastung nicht mitstimmen (§ 47 Abs. 4 GmbHG).",
    ],
    faqs: [
      {
        q: "Brauchen wir für den Umlaufbeschluss eine Versammlung?",
        a: "Nein. Das Gesetz erlaubt die Beschlussfassung ohne Versammlung, wenn alle Gesellschafter in Textform mit der schriftlichen Abstimmung einverstanden sind. Die Vorlage enthält diese Zustimmung in der Einleitung. Eine E-Mail mit eingescannter Unterschrift oder eine qualifizierte Signatur reicht aus, wenn die Satzung nichts Strengeres vorschreibt.",
      },
      {
        q: "Müssen alle Gesellschafter unterschreiben?",
        a: "Für das Umlaufverfahren ja: Jeder muss zumindest mit dem Verfahren einverstanden sein. Dem Beschlussinhalt selbst muss nur die nach Satzung erforderliche Mehrheit zustimmen; ein Gesellschafter kann also unterschreiben und mit Nein stimmen. Die Vorlage sieht für jeden Beschluss die Spalte Ja/Nein/Enthaltung vor.",
      },
      {
        q: "Was bedeutet Entlastung der Geschäftsführung?",
        a: "Mit der Entlastung billigen die Gesellschafter die Geschäftsführung des abgelaufenen Jahres und verzichten auf Ersatzansprüche, soweit die Vorgänge aus den vorgelegten Unterlagen erkennbar waren. Verdeckte Pflichtverletzungen bleiben verfolgbar. Deshalb sollte die Entlastung erst nach Einsicht in Jahresabschluss und Bericht erfolgen.",
      },
      {
        q: "Muss der Beschluss notariell beurkundet werden?",
        a: "Für die vier Standardbeschlüsse nicht. Beurkundungspflichtig sind nur Satzungsänderungen, Kapitalmaßnahmen, Umwandlungen und Auflösung. Die Geschäftsführerbestellung selbst ist formfrei, nur die Anmeldung zum Handelsregister braucht die notarielle Beglaubigung der Unterschrift.",
      },
    ],
    seo: {
      title: "Gesellschafterbeschluss Vorlage (Umlaufbeschluss) | GründerX",
      description:
        "Kostenlose Vorlage für den schriftlichen Gesellschafterbeschluss einer GmbH oder UG: Jahresabschluss, Ergebnisverwendung, Entlastung, Geschäftsführerbestellung.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "einladung-gesellschafterversammlung",
    titel: "Einladung zur Gesellschafterversammlung",
    kurz: "Einladungsschreiben zur ordentlichen oder außerordentlichen Gesellschafterversammlung einer GmbH oder UG mit Tagesordnung, Frist, Form und den Hinweisen nach § 51 GmbHG.",
    kategorie: "gesellschaft",
    dateiname: "Einladung-Gesellschafterversammlung",
    wofuer: [
      "Jährliche ordentliche Gesellschafterversammlung zu Jahresabschluss und Entlastung",
      "Außerordentliche Versammlung, etwa bei Geschäftsführerwechsel, Kapitalerhöhung oder Krise",
      "Wenn nicht alle Gesellschafter auf Form und Frist verzichten und die Einladung gerichtsfest sein muss",
      "Einberufung auf Verlangen einer Minderheit nach § 50 GmbHG",
    ],
    enthaelt: [
      "Briefkopf, Empfänger, Zustellweg",
      "Ort, Datum, Uhrzeit und Form der Versammlung",
      "Tagesordnung mit Beschlussvorschlägen",
      "Hinweise zu Frist, Unterlagen und Vertretung",
      "Hinweis auf Video- oder Telefonteilnahme",
      "Hinweis auf Beschlussfähigkeit und zweite Versammlung",
      "Anlagen und Unterschrift der Geschäftsführung",
    ],
    hinweise: [
      "Gesetzlich ist die Einladung durch eingeschriebenen Brief mit einer Frist von mindestens einer Woche zu bewirken (§ 51 Abs. 1 GmbHG). Die Satzung kann die Form erleichtern (E-Mail) oder die Frist verlängern; dann gilt die Satzung. Prüfe vor dem Versand, was eure Satzung sagt.",
      "Jeder Beschlussgegenstand muss mindestens drei Tage vor der Versammlung angekündigt sein (§ 51 Abs. 4 GmbHG). Über nicht angekündigte Punkte darf nur beschlossen werden, wenn alle Gesellschafter anwesend sind und keiner widerspricht.",
      "Die Frist läuft erst ab Zugang beziehungsweise ab dem Zeitpunkt, zu dem der Brief bei normalem Postlauf zugegangen wäre. Rechne mit zwei bis drei Tagen Postlaufzeit zusätzlich und dokumentiere den Versand (Einlieferungsbeleg).",
      "Mängel in Einladung oder Ankündigung machen Beschlüsse anfechtbar, bei Nichtladung eines Gesellschafters sogar nichtig. Wer sicher gehen will, holt vorab die Verzichtserklärungen aller Gesellschafter ein (Vollversammlung, § 51 Abs. 3 GmbHG).",
    ],
    faqs: [
      {
        q: "Reicht eine E-Mail als Einladung?",
        a: "Nur wenn die Satzung das ausdrücklich erlaubt. Ohne Satzungsregelung verlangt § 51 GmbHG den eingeschriebenen Brief. Praktikabel ist beides: E-Mail vorab und zusätzlich Einschreiben. Wenn alle Gesellschafter erscheinen und niemand widerspricht, sind Formfehler geheilt.",
      },
      {
        q: "Wie berechne ich die Einladungsfrist richtig?",
        a: "Die gesetzliche Mindestfrist beträgt eine Woche ab Zugang; viele Satzungen verlangen zwei Wochen. Der Tag des Zugangs und der Tag der Versammlung zählen nicht mit. Bei Einschreiben gilt die Einladung als zugegangen, wenn sie bei normalem Postlauf angekommen wäre, auch wenn der Gesellschafter sie nicht abholt.",
      },
      {
        q: "Können Gesellschafter die Einberufung verlangen?",
        a: "Ja. Gesellschafter, die zusammen mindestens 10 % des Stammkapitals halten, können die Einberufung unter Angabe von Zweck und Gründen verlangen (§ 50 Abs. 1 GmbHG). Kommt die Geschäftsführung dem nicht nach, dürfen sie selbst einberufen (§ 50 Abs. 3 GmbHG).",
      },
      {
        q: "Darf die Versammlung per Video stattfinden?",
        a: "Ja, seit 2023 ausdrücklich: Versammlungen können per Video- oder Telefonkonferenz abgehalten werden, wenn alle Gesellschafter in Textform einverstanden sind oder die Satzung das erlaubt (§ 48 Abs. 1 Satz 2 GmbHG). Die Vorlage fragt die Zustimmung in der Einladung ab.",
      },
    ],
    seo: {
      title: "Einladung Gesellschafterversammlung Vorlage GmbH | GründerX",
      description:
        "Vorlage für die Einladung zur Gesellschafterversammlung (GmbH, UG): Tagesordnung, Frist, Form, Vertretung, Videoteilnahme und Hinweise nach § 51 GmbHG.",
    },
    stand: "2026-10",
    text: `Einladung zur [ordentlichen / außerordentlichen] Gesellschafterversammlung

[Name] [GmbH / UG (haftungsbeschränkt)]
[Straße, PLZ Ort]
Amtsgericht [Ort], HRB [Nummer]

Per Einschreiben [und vorab per E-Mail]

An
[Vorname Nachname]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Einladung zur [ordentlichen / außerordentlichen] Gesellschafterversammlung der [Name] [GmbH / UG (haftungsbeschränkt)]

Sehr geehrte(r) [Frau / Herr] [Nachname],

als Geschäftsführung der [Name] [GmbH / UG (haftungsbeschränkt)] laden wir Sie gemäß § 49 Abs. 1 und § 51 GmbHG [sowie § [Nummer] des Gesellschaftsvertrags] zur [ordentlichen / außerordentlichen] Gesellschafterversammlung ein.

Datum: [Wochentag], [Datum]
Beginn: [Uhrzeit] Uhr
Ort: Geschäftsräume der Gesellschaft, [Straße, PLZ Ort], [Raum]
[Alternativ: Videokonferenz über [Plattform]; die Zugangsdaten erhalten Sie spätestens einen Tag vor der Versammlung per E-Mail.]

Tagesordnung

1. Eröffnung, Feststellung der ordnungsgemäßen Einberufung und der Beschlussfähigkeit, Wahl des Versammlungsleiters und des Protokollführers

2. Vorlage und Erläuterung des Jahresabschlusses zum 31.12.[Jahr] durch die Geschäftsführung
   Beschlussvorschlag: Der Jahresabschluss zum 31.12.[Jahr], der mit einem Jahresüberschuss / Jahresfehlbetrag von [Betrag] EUR abschließt, wird festgestellt.

3. Verwendung des Ergebnisses
   Beschlussvorschlag: [z. B. „Der Bilanzgewinn von [Betrag] EUR wird in Höhe von [Betrag] EUR ausgeschüttet und im Übrigen auf neue Rechnung vorgetragen.“ / „Der Jahresfehlbetrag wird auf neue Rechnung vorgetragen.“]

4. Entlastung der Geschäftsführung für das Geschäftsjahr [Jahr]
   Beschlussvorschlag: Der Geschäftsführung wird Entlastung erteilt.

5. [z. B. Bestellung eines weiteren Geschäftsführers]
   Beschlussvorschlag: [Vorname Nachname] wird mit Wirkung zum [Datum] zum Geschäftsführer bestellt, [einzelvertretungsberechtigt und von § 181 BGB befreit].

6. [z. B. Zustimmung zum Abschluss des Mietvertrags über [Objekt] / Erhöhung des Stammkapitals auf [Betrag] EUR (notarielle Beurkundung in gesondertem Termin) / Beschluss über Gesellschafterdarlehen]
   Beschlussvorschlag: [Text]

7. Verschiedenes (ohne Beschlussfassung)

Hinweise

Unterlagen: Der Jahresabschluss zum 31.12.[Jahr] [mit Lagebericht], der Vorschlag zur Ergebnisverwendung sowie [weitere Unterlagen, z. B. Entwurf des Mietvertrags] liegen dieser Einladung bei [oder: liegen ab sofort in den Geschäftsräumen der Gesellschaft zur Einsicht aus und werden auf Wunsch elektronisch übersandt].

Frist und Form: Diese Einladung wird mit einer Frist von [mindestens einer Woche / zwei Wochen] gemäß [§ 51 Abs. 1 GmbHG / § [Nummer] des Gesellschaftsvertrags] durch eingeschriebenen Brief versandt. Die Gegenstände der Tagesordnung sind hiermit gemäß § 51 Abs. 2 und 4 GmbHG angekündigt. Ergänzungen zur Tagesordnung können bis zum [Datum, mindestens drei Tage vor der Versammlung] schriftlich bei der Geschäftsführung beantragt werden; sie werden allen Gesellschaftern unverzüglich mitgeteilt.

Vertretung: Sie können sich durch einen anderen Gesellschafter oder durch einen zur Berufsverschwiegenheit verpflichteten Dritten (Rechtsanwalt, Steuerberater, Wirtschaftsprüfer) mit schriftlicher Vollmacht vertreten lassen. Ein Vollmachtsformular liegt bei. Die Vollmacht ist spätestens zu Beginn der Versammlung im Original vorzulegen.

Teilnahme per Video oder Telefon: Gemäß § 48 Abs. 1 Satz 2 GmbHG kann die Versammlung ganz oder teilweise per Video- oder Telefonkonferenz abgehalten werden, wenn alle Gesellschafter sich damit in Textform einverstanden erklären [oder die Satzung dies vorsieht]. Bitte teilen Sie uns bis zum [Datum] per E-Mail an [E-Mail-Adresse] mit, ob Sie dieser Form zustimmen und ob Sie persönlich oder digital teilnehmen.

Beschlussfähigkeit: Die Versammlung ist beschlussfähig, wenn [mindestens [Prozent] % des Stammkapitals anwesend oder vertreten sind / nach dem Gesellschaftsvertrag keine besonderen Anforderungen gelten]. Sollte die Versammlung nicht beschlussfähig sein, wird eine zweite Versammlung mit gleicher Tagesordnung einberufen, die unabhängig vom vertretenen Stammkapital beschlussfähig ist.

Verzicht auf Form und Frist: Sofern Sie auf die Einhaltung der Einberufungsfrist und -form verzichten möchten, können Sie dies durch Rücksendung der beiliegenden Verzichtserklärung tun. Dies ermöglicht gegebenenfalls einen früheren Termin.

Bitte bestätigen Sie den Erhalt dieser Einladung und Ihre Teilnahme bis zum [Datum] per E-Mail an [E-Mail-Adresse] oder telefonisch unter [Telefonnummer].

Mit freundlichen Grüßen

[Name] [GmbH / UG (haftungsbeschränkt)]


______________________________
[Vorname Nachname], Geschäftsführer


[______________________________
[Vorname Nachname], Geschäftsführer]

Anlagen:
– Jahresabschluss zum 31.12.[Jahr] [mit Lagebericht]
– Vorschlag zur Ergebnisverwendung
– [Entwurf Mietvertrag / Lebenslauf des vorgeschlagenen Geschäftsführers / Entwurf Darlehensvertrag]
– Vollmachtsformular
– Verzichtserklärung auf Form und Frist

Verteiler: alle Gesellschafter gemäß Gesellschafterliste vom [Datum]; Beschlussbuch der Gesellschaft

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "protokoll-gesellschafterversammlung",
    titel: "Protokoll der Gesellschafterversammlung",
    kurz: "Niederschrift einer Gesellschafterversammlung für GmbH oder UG: Anwesende, Einberufung, Beschlussfähigkeit, Beschlüsse mit Abstimmungsergebnis und Unterschriften.",
    kategorie: "gesellschaft",
    dateiname: "Protokoll-Gesellschafterversammlung",
    wofuer: [
      "Jede Gesellschafterversammlung einer GmbH oder UG gerichtsfest dokumentieren",
      "Nachweis von Beschlüssen gegenüber Handelsregister, Bank, Finanzamt und Investoren",
      "Wenn Beschlüsse angefochten werden könnten und das Abstimmungsverhalten festgehalten werden muss",
      "Als Ablage im Beschlussbuch der Gesellschaft",
    ],
    enthaelt: [
      "Kopf: Gesellschaft, Ort, Datum, Beginn und Ende",
      "1. Teilnehmer, Vertretungen und vertretenes Stammkapital",
      "2. Versammlungsleitung und Protokollführung",
      "3. Einberufung und Beschlussfähigkeit",
      "4. Beschlüsse zu den Tagesordnungspunkten mit Abstimmungsergebnis",
      "5. Widersprüche und Erklärungen zu Protokoll",
      "6. Schluss der Versammlung",
      "Unterschriften und Verteiler",
    ],
    hinweise: [
      "Das GmbHG schreibt für die normale Gesellschafterversammlung kein Protokoll vor, aber ohne Niederschrift ist ein Beschluss kaum beweisbar. Viele Satzungen verlangen das Protokoll ausdrücklich und knüpfen die Anfechtungsfrist an den Zugang.",
      "Beschlüsse, die der notariellen Beurkundung bedürfen (Satzungsänderung, Kapitalerhöhung, Auflösung, Umwandlung), werden vom Notar protokolliert; dieses Protokoll ersetzt den Notar nicht.",
      "Halte das Abstimmungsverhalten und Widersprüche einzelner Gesellschafter namentlich fest. Wer einem Beschluss nicht widerspricht, verliert in vielen Fällen die Möglichkeit, ihn später anzufechten.",
      "Bei der Einpersonen-GmbH muss der Alleingesellschafter jeden Beschluss unverzüglich schriftlich niederlegen und unterschreiben (§ 48 Abs. 3 GmbHG).",
    ],
    faqs: [
      {
        q: "Wer muss das Protokoll unterschreiben?",
        a: "Mindestens der Versammlungsleiter und der Protokollführer, so sieht es die Vorlage vor. Satzungen können die Unterschrift aller anwesenden Gesellschafter verlangen. Je mehr Unterschriften, desto stärker die Beweiskraft; verweigert ein Gesellschafter die Unterschrift, wird das im Protokoll vermerkt.",
      },
      {
        q: "Wie schnell muss das Protokoll verschickt werden?",
        a: "Gesetzlich gibt es keine Frist, aber die Anfechtungsfrist für Beschlüsse (in Anlehnung an das Aktienrecht ein Monat) beginnt nach vielen Satzungen erst mit Zugang des Protokolls. Deshalb sollte die Niederschrift innerhalb von zwei Wochen an alle Gesellschafter gehen, auch an die abwesenden.",
      },
      {
        q: "Was passiert, wenn die Einberufung fehlerhaft war?",
        a: "Sind alle Gesellschafter anwesend oder vertreten und widerspricht niemand der Beschlussfassung, ist der Mangel geheilt (§ 51 Abs. 3 GmbHG). Das Protokoll sollte diesen Verzicht ausdrücklich festhalten. Fehlt ein Gesellschafter und wurde er nicht ordnungsgemäß geladen, sind die Beschlüsse nichtig.",
      },
      {
        q: "Können wir das Protokoll auch für eine Videokonferenz nutzen?",
        a: "Ja. Die Vorlage hat ein Feld für die Form der Versammlung und die Zustimmung der Gesellschafter zur Videokonferenz nach § 48 Abs. 1 Satz 2 GmbHG. Halte fest, wer digital teilgenommen hat und wie die Identität geprüft wurde.",
      },
    ],
    seo: {
      title: "Protokoll Gesellschafterversammlung Vorlage GmbH & UG | GründerX",
      description:
        "Vorlage für das Protokoll einer Gesellschafterversammlung (GmbH, UG): Anwesende, Beschlussfähigkeit, Beschlüsse mit Abstimmungsergebnis, Unterschriften.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "geschaeftsfuehrer-anstellungsvertrag",
    titel: "Geschäftsführer-Anstellungsvertrag (GmbH/UG)",
    kurz: "Anstellungsvertrag für Fremd- und Gesellschafter-Geschäftsführer einer GmbH oder UG: Vergütung, Tantieme, Dienstwagen, Urlaub, Wettbewerbsverbot, D&O, Kündigung und Fremdvergleich.",
    kategorie: "gesellschaft",
    dateiname: "Geschaeftsfuehrer-Anstellungsvertrag",
    wofuer: [
      "Gründer, die sich als Gesellschafter-Geschäftsführer ein Gehalt zahlen und es steuerlich absichern wollen",
      "Einstellung eines Fremdgeschäftsführers ohne Beteiligung",
      "Wenn Tantieme, Dienstwagen oder Wettbewerbsverbot schriftlich festgehalten werden müssen",
      "Als Nachweis für das Finanzamt (Fremdvergleich) und die Rentenversicherung (Statusfeststellung)",
    ],
    enthaelt: [
      "§ 1 Bestellung, Aufgaben und Vertretung",
      "§ 2 Pflichten, Zustimmungsvorbehalte und Berichtswesen",
      "§ 3 Arbeitszeit, Arbeitsort und Nebentätigkeit",
      "§ 4 Vergütung und Tantieme",
      "§ 5 Dienstwagen, Auslagen, Versicherungen (D&O)",
      "§ 6 Vergütung bei Krankheit und Tod",
      "§ 7 Urlaub",
      "§ 8 Vertraulichkeit, Herausgabe, Erfindungen",
      "§ 9 Wettbewerbsverbot während und nach der Tätigkeit",
      "§ 10 Haftung",
      "§ 11 Vertragsdauer und Kündigung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Für Gesellschafter-Geschäftsführer gilt der Fremdvergleich: Der Vertrag muss vorab, schriftlich, klar und wie unter Fremden abgeschlossen und tatsächlich durchgeführt werden. Sonst behandelt das Finanzamt Gehalt, Tantieme oder Dienstwagen als verdeckte Gewinnausschüttung (§ 8 Abs. 3 KStG). Rückwirkende Erhöhungen sind tabu.",
      "Der Vertrag wird von der Gesellschafterversammlung abgeschlossen, nicht von einem Mitgeschäftsführer (§ 46 Nr. 5 GmbHG). Ein Alleingesellschafter-Geschäftsführer braucht zusätzlich die Befreiung von § 181 BGB in der Satzung und muss den Beschluss protokollieren.",
      "Sozialversicherung: Ein Geschäftsführer mit mindestens 50 % der Anteile oder einer umfassenden Sperrminorität ist in der Regel nicht sozialversicherungspflichtig; Minderheitsgesellschafter und Fremdgeschäftsführer meist schon. Lasse den Status über das Statusfeststellungsverfahren bei der Deutschen Rentenversicherung (§ 7a SGB IV) klären, sonst drohen Nachzahlungen für vier Jahre.",
      "Die Tantieme sollte als fester Prozentsatz vom Jahresüberschuss vor Steuern geregelt und nach oben gedeckelt sein. Die Finanzverwaltung sieht Gesamt-Tantiemen über 50 % des Jahresüberschusses und einen Tantieme-Anteil über 25 % der Gesamtvergütung als Indiz für eine verdeckte Gewinnausschüttung.",
      "Das Kündigungsschutzgesetz gilt für Geschäftsführer nicht. Schutz bietet nur die vertragliche Kündigungsfrist; die Abberufung als Organ ist davon unabhängig jederzeit möglich (§ 38 GmbHG).",
    ],
    faqs: [
      {
        q: "Ist der Geschäftsführer Arbeitnehmer?",
        a: "Nein, der Anstellungsvertrag ist ein Dienstvertrag. Arbeitnehmerschutzgesetze wie Kündigungsschutz, Arbeitszeitgesetz oder Bundesurlaubsgesetz gelten nicht unmittelbar. Deshalb regelt die Vorlage Urlaub, Entgeltfortzahlung und Kündigungsfristen ausdrücklich. Für Mutterschutz, Pflegezeit und ähnliche Rechte gibt es Sonderregeln.",
      },
      {
        q: "Wie hoch darf das Gehalt eines Gesellschafter-Geschäftsführers sein?",
        a: "So hoch, wie es ein fremder Geschäftsführer in vergleichbarer Position, Branche und Unternehmensgröße bekommen würde. Zu viel ist verdeckte Gewinnausschüttung, zu wenig kann in der Krise ein Indiz für fehlende Ernsthaftigkeit sein. Vergleichsstudien und die Gehaltsstrukturuntersuchungen der Finanzverwaltung helfen bei der Begründung.",
      },
      {
        q: "Brauche ich eine D&O-Versicherung?",
        a: "Pflicht ist sie nicht, aber Geschäftsführer haften der Gesellschaft gegenüber persönlich und unbegrenzt für Sorgfaltsverstöße (§ 43 GmbHG), zudem für Steuern und Sozialabgaben nach außen. Die Vorlage verpflichtet die Gesellschaft zum Abschluss; die Prämie ist Betriebsausgabe und beim Geschäftsführer kein geldwerter Vorteil, wenn die Gesellschaft im eigenen Interesse versichert.",
      },
      {
        q: "Kann die Gesellschaft den Geschäftsführer einfach abberufen?",
        a: "Ja, die Organstellung kann jederzeit durch Gesellschafterbeschluss widerrufen werden, sofern die Satzung das nicht auf wichtige Gründe beschränkt. Der Anstellungsvertrag läuft dann weiter, bis er ordentlich oder außerordentlich gekündigt ist. Die Vorlage koppelt beides: Mit der Abberufung gilt der Vertrag als zum nächstmöglichen Termin gekündigt.",
      },
    ],
    seo: {
      title: "Geschäftsführervertrag Vorlage GmbH & UG (Anstellung) | GründerX",
      description:
        "Kostenloser Geschäftsführer-Anstellungsvertrag für GmbH und UG: Vergütung, Tantieme, Dienstwagen, Urlaub, Wettbewerbsverbot, D&O, Kündigung und Fremdvergleich.",
    },
    stand: "2026-10",
    text: `Geschäftsführer-Anstellungsvertrag

zwischen

[Name] [GmbH / UG (haftungsbeschränkt)], [Straße, PLZ Ort], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch die Gesellschafterversammlung, diese vertreten durch [Vorname Nachname] aufgrund Gesellschafterbeschlusses vom [Datum]
– nachfolgend „Gesellschaft“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
– nachfolgend „Geschäftsführer“ –

§ 1 Bestellung, Aufgaben und Vertretung
(1) Der Geschäftsführer wurde durch Beschluss der Gesellschafterversammlung vom [Datum] mit Wirkung zum [Datum] zum Geschäftsführer der Gesellschaft bestellt. Dieser Vertrag regelt das Anstellungsverhältnis.
(2) Der Geschäftsführer vertritt die Gesellschaft [allein / gemeinsam mit einem weiteren Geschäftsführer oder einem Prokuristen]. Er ist [von den Beschränkungen des § 181 BGB befreit / nicht von den Beschränkungen des § 181 BGB befreit].
(3) Der Geschäftsführer führt die Geschäfte der Gesellschaft nach Maßgabe der Gesetze, des Gesellschaftsvertrags, einer Geschäftsordnung für die Geschäftsführung und der Beschlüsse und Weisungen der Gesellschafterversammlung mit der Sorgfalt eines ordentlichen Geschäftsmannes. Sein Verantwortungsbereich umfasst insbesondere [z. B. Vertrieb, Finanzen und Personal].

§ 2 Pflichten, Zustimmungsvorbehalte und Berichtswesen
(1) Der Geschäftsführer hat die Zustimmungsvorbehalte des Gesellschaftsvertrags und der Geschäftsordnung zu beachten. Darüber hinaus bedürfen der vorherigen Zustimmung der Gesellschafterversammlung: [z. B. Geschäfte über [Betrag] EUR im Einzelfall, Einstellung von Mitarbeitern mit Jahresgehalt über [Betrag] EUR, Abschluss von Verträgen mit Gesellschaftern oder deren Angehörigen].
(2) Der Geschäftsführer berichtet der Gesellschafterversammlung [monatlich / quartalsweise] schriftlich über Umsatz, Ergebnis, Liquidität und wesentliche Vorgänge und unverzüglich über alle Umstände, die für die Gesellschaft von erheblicher Bedeutung sind, insbesondere drohende Zahlungsunfähigkeit oder Überschuldung.
(3) Der Geschäftsführer sorgt für eine ordnungsgemäße Buchführung, die fristgerechte Aufstellung des Jahresabschlusses, die Einhaltung steuerlicher und sozialversicherungsrechtlicher Pflichten, den Datenschutz sowie die Einrichtung eines angemessenen Risikofrüherkennungs- und Compliance-Systems.

§ 3 Arbeitszeit, Arbeitsort und Nebentätigkeit
(1) Der Geschäftsführer stellt seine gesamte Arbeitskraft in den Dienst der Gesellschaft. Er ist an feste Arbeitszeiten nicht gebunden, hat aber, soweit die Belange der Gesellschaft es erfordern, auch außerhalb der üblichen Geschäftszeiten zur Verfügung zu stehen. Mehrarbeit ist mit der Vergütung abgegolten.
[Alternative Teilzeit: (1) Der Geschäftsführer ist mit einer regelmäßigen Arbeitszeit von [Stunden] Stunden pro Woche für die Gesellschaft tätig.]
(2) Dienstsitz ist [Ort]. Mobiles Arbeiten ist im Rahmen der betrieblichen Erfordernisse zulässig.
(3) Entgeltliche und unentgeltliche Nebentätigkeiten, Aufsichtsrats- und Beiratsmandate sowie Beteiligungen an anderen Unternehmen (ausgenommen Beteiligungen unter 5 % an börsennotierten Gesellschaften) bedürfen der vorherigen schriftlichen Zustimmung der Gesellschafterversammlung. Bestehende Nebentätigkeiten: [z. B. „keine“]. Veröffentlichungen und Vorträge mit Bezug zur Gesellschaft sind anzuzeigen.

§ 4 Vergütung und Tantieme
(1) Der Geschäftsführer erhält ein festes Jahresgehalt von [Betrag] EUR brutto, zahlbar in zwölf gleichen Monatsraten jeweils zum Monatsende. [Optional: Zusätzlich wird im [November] ein 13. Monatsgehalt gezahlt.]
(2) Zusätzlich erhält der Geschäftsführer eine Tantieme in Höhe von [z. B. 10] % des Jahresüberschusses der Gesellschaft vor Ertragsteuern und vor Abzug der Tantieme selbst, wie er sich aus dem festgestellten Jahresabschluss ergibt. Verlustvorträge aus Vorjahren sind vorab abzuziehen. Die Tantieme ist auf [Betrag, z. B. 30 % des Festgehalts] EUR pro Geschäftsjahr begrenzt. Sie wird einen Monat nach Feststellung des Jahresabschlusses fällig. Bei unterjährigem Beginn oder Ende wird sie zeitanteilig gezahlt.
(3) Die Vergütung wird alle [z. B. 2] Jahre, erstmals zum [Datum], von der Gesellschafterversammlung überprüft. Eine Anpassung bedarf eines Gesellschafterbeschlusses und einer schriftlichen Vertragsänderung vor Beginn des Zeitraums, für den sie gelten soll.
(4) Mit der Vergütung nach Absatz 1 und 2 ist die gesamte Tätigkeit des Geschäftsführers abgegolten. Die Gesellschaft führt Lohnsteuer und, soweit Versicherungspflicht besteht, Sozialversicherungsbeiträge ab.
(5) [Optional: Die Gesellschaft zahlt dem Geschäftsführer einen Zuschuss zur privaten Kranken- und Pflegeversicherung in Höhe des Arbeitgeberanteils, höchstens [Betrag] EUR monatlich, und einen Beitrag zur betrieblichen Altersversorgung von [Betrag] EUR monatlich über [Direktversicherung / Unterstützungskasse].]

§ 5 Dienstwagen, Auslagen, Versicherungen
(1) Die Gesellschaft stellt dem Geschäftsführer einen Dienstwagen der Klasse [z. B. Mittelklasse, Bruttolistenpreis bis [Betrag] EUR] zur dienstlichen und privaten Nutzung zur Verfügung. Die Gesellschaft trägt die Betriebskosten. Der geldwerte Vorteil der Privatnutzung wird nach den steuerlichen Vorschriften [1-%-Regelung / Fahrtenbuch] versteuert und vom Geschäftsführer getragen. Bei Freistellung ist der Wagen herauszugeben.
(2) Die Gesellschaft erstattet dem Geschäftsführer Reise- und Bewirtungskosten sowie sonstige Auslagen im Interesse der Gesellschaft gegen Nachweis im Rahmen der steuerlichen Höchstbeträge.
(3) Die Gesellschaft schließt für den Geschäftsführer eine Vermögensschaden-Haftpflichtversicherung (D&O) mit einer Deckungssumme von mindestens [Betrag] EUR ab und hält sie während der Vertragslaufzeit und einer Nachmeldefrist von mindestens [z. B. 3] Jahren aufrecht. Die Gesellschaft stellt dem Geschäftsführer ferner [eine Unfallversicherung mit [Betrag] EUR für den Invaliditäts- und [Betrag] EUR für den Todesfall].
(4) Die Gesellschaft stellt dem Geschäftsführer Laptop und Mobiltelefon zur dienstlichen und privaten Nutzung zur Verfügung.

§ 6 Vergütung bei Krankheit und Tod
(1) Bei vorübergehender Arbeitsunfähigkeit infolge Krankheit oder Unfall wird das Festgehalt für die Dauer von [z. B. 6] Monaten, längstens bis zur Beendigung des Vertrags, fortgezahlt; Leistungen einer Krankentagegeldversicherung oder Krankenkasse werden angerechnet. Die Tantieme wird für Fehlzeiten über [z. B. 3] Monate zeitanteilig gekürzt.
(2) Stirbt der Geschäftsführer während der Vertragsdauer, wird das Festgehalt für den Sterbemonat und die [z. B. 3] folgenden Monate an [Ehegatten / Lebenspartner / unterhaltsberechtigte Kinder] als Gesamtgläubiger fortgezahlt.

§ 7 Urlaub
(1) Der Geschäftsführer hat Anspruch auf einen Jahresurlaub von [z. B. 30] Arbeitstagen (bei Fünf-Tage-Woche). Die zeitliche Lage ist mit den übrigen Geschäftsführern und, soweit erforderlich, mit der Gesellschafterversammlung abzustimmen, sodass die Geschäftsführung stets gewährleistet bleibt.
(2) Kann der Urlaub aus betrieblichen Gründen nicht bis zum 31. März des Folgejahres genommen werden, wird er abgegolten; Abgeltungsbetrag je Urlaubstag ist 1/250 des Jahresfestgehalts.

§ 8 Vertraulichkeit, Herausgabe, Erfindungen
(1) Der Geschäftsführer bewahrt über alle vertraulichen Angelegenheiten der Gesellschaft, insbesondere Geschäftsgeheimnisse im Sinne des GeschGehG, Kunden-, Preis- und Finanzdaten, auch nach Beendigung des Vertrags Stillschweigen.
(2) Bei Beendigung des Vertrags oder Freistellung gibt der Geschäftsführer unaufgefordert alle Unterlagen, Datenträger, Zugänge und Gegenstände der Gesellschaft zurück und löscht private Kopien. Ein Zurückbehaltungsrecht besteht nicht.
(3) Erfindungen, Software und sonstige schutzfähige Arbeitsergebnisse, die der Geschäftsführer im Rahmen seiner Tätigkeit schafft, stehen der Gesellschaft zu; das Arbeitnehmererfindungsgesetz wird entsprechend angewendet. Der Geschäftsführer räumt der Gesellschaft an urheberrechtlich geschützten Arbeitsergebnissen das ausschließliche, unbeschränkte Nutzungsrecht ein. Eine gesonderte Vergütung ist mit § 4 abgegolten.

§ 9 Wettbewerbsverbot
(1) Während der Vertragsdauer darf der Geschäftsführer weder für eigene noch für fremde Rechnung im Geschäftsbereich der Gesellschaft tätig werden noch sich an Wettbewerbern beteiligen oder diese beraten.
(2) Für die Dauer von [z. B. 12] Monaten nach Beendigung des Vertrags ist es dem Geschäftsführer untersagt, in [räumlicher Bereich, z. B. Deutschland] für ein Unternehmen tätig zu werden, das mit der Gesellschaft auf dem Gebiet [Tätigkeitsbereich] im Wettbewerb steht, oder ein solches Unternehmen zu gründen oder sich daran zu beteiligen. Für die Dauer des Verbots zahlt die Gesellschaft eine Karenzentschädigung von monatlich [z. B. 50] % der zuletzt bezogenen durchschnittlichen monatlichen Gesamtvergütung; anderweitiger Erwerb wird angerechnet, soweit er zusammen mit der Entschädigung 110 % der bisherigen Vergütung übersteigt. Die Gesellschaft kann vor Beendigung des Vertrags schriftlich auf das Verbot verzichten; sie wird dann mit Ablauf von [z. B. 6] Monaten ab Zugang des Verzichts von der Entschädigungspflicht frei.
(3) Für jeden Fall der Zuwiderhandlung ist eine Vertragsstrafe in Höhe einer Monatsvergütung verwirkt; bei Dauerverstößen gilt jeder angefangene Monat als eigener Fall. Weitergehende Ansprüche bleiben unberührt.

§ 10 Haftung
(1) Der Geschäftsführer haftet der Gesellschaft nach § 43 GmbHG. Für Entscheidungen, die er auf angemessener Informationsgrundlage und ohne Interessenkonflikt zum Wohl der Gesellschaft getroffen hat, haftet er nicht.
(2) Hat der Geschäftsführer eine Maßnahme aufgrund eines Gesellschafterbeschlusses oder einer Weisung der Gesellschafterversammlung ausgeführt, ist die Haftung gegenüber der Gesellschaft ausgeschlossen, soweit das Gesetz dies zulässt.
(3) Die Gesellschaft stellt den Geschäftsführer von Ansprüchen Dritter frei, die aus seiner pflichtgemäßen Tätigkeit für die Gesellschaft entstehen, soweit nicht die D&O-Versicherung eintritt und soweit das Gesetz die Freistellung zulässt.

§ 11 Vertragsdauer und Kündigung
(1) Der Vertrag beginnt am [Datum] und wird auf unbestimmte Zeit geschlossen. [Alternative: Der Vertrag wird für die Dauer von [z. B. 3] Jahren bis zum [Datum] geschlossen und verlängert sich um jeweils ein Jahr, wenn er nicht mit einer Frist von [6] Monaten zum Vertragsende gekündigt wird.]
(2) Der Vertrag kann von beiden Seiten mit einer Frist von [z. B. 6] Monaten zum Ende eines Kalendermonats gekündigt werden. Die Kündigung bedarf der Schriftform. Die Kündigung durch die Gesellschaft erfolgt durch die Gesellschafterversammlung.
(3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt für die Gesellschaft insbesondere vor bei groben Pflichtverletzungen, Verstoß gegen § 2 Abs. 1 oder § 9, Vermögensdelikten oder Verlust der Eignung nach § 6 Abs. 2 GmbHG.
(4) Die Abberufung als Geschäftsführer ist jederzeit durch Gesellschafterbeschluss möglich (§ 38 GmbHG). Mit Zugang der Abberufung gilt dieser Vertrag als zum nächstzulässigen Termin nach Absatz 2 gekündigt, sofern die Gesellschaft nicht ausdrücklich etwas anderes erklärt. Der Geschäftsführer kann sein Amt jederzeit niederlegen; die Niederlegung ohne wichtigen Grund gilt zugleich als Kündigung dieses Vertrags zum nächstzulässigen Termin.
(5) Nach Kündigung oder Abberufung ist die Gesellschaft berechtigt, den Geschäftsführer unter Fortzahlung der Festvergütung und Anrechnung offener Urlaubsansprüche freizustellen. Anderweitiger Verdienst wird auf die Vergütung während der Freistellung angerechnet.
(6) Der Vertrag endet, ohne dass es einer Kündigung bedarf, mit Ablauf des Monats, in dem der Geschäftsführer die Regelaltersgrenze der gesetzlichen Rentenversicherung erreicht, oder in dem eine dauerhafte Berufsunfähigkeit festgestellt wird.

§ 12 Schlussbestimmungen
(1) Der Geschäftsführer ist verpflichtet, die Feststellung seines sozialversicherungsrechtlichen Status bei der Deutschen Rentenversicherung Bund (§ 7a SGB IV) gemeinsam mit der Gesellschaft zu beantragen. Beide Parteien wirken an der Klärung mit; die Gesellschaft trägt die Kosten.
(2) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform und eines Beschlusses der Gesellschafterversammlung; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(3) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt deutsches Recht.
(5) Dieser Vertrag wurde durch Beschluss der Gesellschafterversammlung vom [Datum] genehmigt. Er wird in zwei Ausfertigungen erstellt; jede Partei erhält eine.

[Ort], den [Datum]


______________________________
[Name] [GmbH / UG (haftungsbeschränkt)]
vertreten durch die Gesellschafterversammlung, diese vertreten durch [Vorname Nachname]


______________________________
[Vorname Nachname], Geschäftsführer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "gesellschafterdarlehen",
    titel: "Gesellschafterdarlehen an GmbH oder UG",
    kurz: "Darlehensvertrag zwischen einem Gesellschafter und seiner GmbH oder UG: Betrag, fremdüblicher Zins, Laufzeit, Rangrücktritt als Option und Hinweis auf den Nachrang nach § 39 InsO.",
    kategorie: "gesellschaft",
    dateiname: "Gesellschafterdarlehen",
    wofuer: [
      "Ein Gründer gibt seiner UG oder GmbH privates Geld, statt das Stammkapital zu erhöhen",
      "Überbrückung von Liquiditätsengpässen ohne Bank",
      "Gründungskosten oder Auslagen, die ein Gesellschafter vorgestreckt hat, sauber dokumentieren",
      "Wenn eine Bank oder ein Investor einen Rangrücktritt des Gesellschafters verlangt",
    ],
    enthaelt: [
      "§ 1 Darlehensbetrag und Auszahlung",
      "§ 2 Verwendungszweck",
      "§ 3 Zinsen",
      "§ 4 Laufzeit, Tilgung und Rückzahlung",
      "§ 5 Kündigung",
      "§ 6 Sicherheiten",
      "§ 7 Rangrücktritt (Option)",
      "§ 8 Insolvenzrechtlicher Hinweis",
      "§ 9 Steuern und Dokumentation",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "In der Insolvenz der Gesellschaft sind Gesellschafterdarlehen kraft Gesetzes nachrangig (§ 39 Abs. 1 Nr. 5 InsO), unabhängig von Verträgen. Rückzahlungen im letzten Jahr vor dem Insolvenzantrag kann der Verwalter anfechten (§ 135 InsO). Ausnahmen gelten für Gesellschafter mit höchstens 10 % Beteiligung ohne Geschäftsführung und für Sanierungsfälle (§ 39 Abs. 4 und 5 InsO).",
      "Der Zins muss fremdüblich sein, sonst droht eine verdeckte Gewinnausschüttung (zu hoch) oder eine verdeckte Einlage (zinslos oder zu niedrig). Orientiere dich an dem, was die Gesellschaft bei einer Bank zahlen würde, und dokumentiere die Herleitung.",
      "Ein qualifizierter Rangrücktritt verhindert, dass das Darlehen in der Überschuldungsprüfung als Verbindlichkeit zählt (§ 19 Abs. 2 Satz 2 InsO). Das kann die Insolvenzantragspflicht abwenden, macht aber die Rückzahlung nur außerhalb der Krise möglich. Nicht leichtfertig unterschreiben.",
      "Die Zinsen sind beim Gesellschafter mit mindestens 10 % Beteiligung keine Kapitalerträge mit Abgeltungsteuer, sondern unterliegen dem persönlichen Steuersatz (§ 32d Abs. 2 Nr. 1 Buchst. b EStG). Die Gesellschaft behält trotzdem Kapitalertragsteuer ein, die dann angerechnet wird.",
      "Ein Darlehen, das bei Gründung oder in der Krise zwingend gegeben werden musste, kann als verdecktes Stammkapital gewertet werden. Bei einer UG ist das Darlehen kein Ersatz für die Kapitalerhöhung auf 25.000 EUR.",
    ],
    faqs: [
      {
        q: "Darlehen oder Kapitalerhöhung: Was ist besser?",
        a: "Das Darlehen ist flexibler: kein Notar, keine Satzungsänderung, Rückzahlung und Zinsen möglich. Dafür ist es in der Insolvenz nachrangig und verbessert das Eigenkapital in der Bilanz nicht. Wer die Bonität gegenüber Banken stärken will, braucht Eigenkapital oder zumindest einen qualifizierten Rangrücktritt.",
      },
      {
        q: "Welcher Zinssatz ist fremdüblich?",
        a: "Der Satz, den die Gesellschaft bei einer Bank für ein unbesichertes Darlehen mit gleicher Laufzeit zahlen müsste. Für junge Gesellschaften liegen solche Sätze oft deutlich über dem Basiszinssatz. Ein zinsloses Darlehen ist beim Gesellschafter zwar zulässig, führt aber nicht zu einer steuerlichen Einlage und kann bei der Gesellschaft als Vorteil hinterfragt werden.",
      },
      {
        q: "Was bedeutet Rangrücktritt genau?",
        a: "Der Gesellschafter erklärt, dass seine Forderung erst nach allen anderen Gläubigern bedient wird und außerhalb einer Insolvenz nur aus künftigen Gewinnen, Liquidationsüberschuss oder freiem Vermögen gezahlt werden darf. Dadurch zählt das Darlehen bei der Überschuldungsprüfung nicht mit. Die Vorlage enthält die Klausel als Option, die ihr ankreuzt oder streicht.",
      },
      {
        q: "Kann ich das Darlehen jederzeit zurückfordern?",
        a: "Nur, wenn es so vereinbart ist und die Gesellschaft nicht in der Krise steckt. Die Vorlage sieht eine feste Laufzeit mit ordentlichem Kündigungsrecht vor. Rückzahlungen im Jahr vor einem Insolvenzantrag muss der Gesellschafter an den Insolvenzverwalter zurückgeben, selbst wenn der Vertrag sie erlaubte.",
      },
    ],
    seo: {
      title: "Gesellschafterdarlehen Vorlage GmbH & UG 2026 | GründerX",
      description:
        "Vertrag für ein Gesellschafterdarlehen an GmbH oder UG: Betrag, fremdüblicher Zins, Laufzeit, Kündigung, Rangrücktritt als Option, Hinweise zu § 39 InsO.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "wandeldarlehen",
    titel: "Wandeldarlehensvertrag (Convertible Loan)",
    kurz: "Wandeldarlehen für Business Angels und Frühphasen-Investoren: Betrag, Zins, Wandlung bei qualifizierter Finanzierungsrunde, Discount, Cap, Fälligkeit und Rangrücktritt.",
    kategorie: "gesellschaft",
    dateiname: "Wandeldarlehensvertrag",
    wofuer: [
      "Ein Business Angel will investieren, bevor eine Bewertung der Gesellschaft feststeht",
      "Schnelle Finanzierung ohne sofortige Kapitalerhöhung beim Notar",
      "Überbrückung bis zur ersten Seed-Runde mit institutionellen Investoren",
      "Gründer, die eine Bewertungsdiskussion auf die nächste Runde verschieben wollen",
    ],
    enthaelt: [
      "§ 1 Darlehen, Auszahlung und Verwendung",
      "§ 2 Zinsen",
      "§ 3 Laufzeit und Fälligkeit",
      "§ 4 Pflichtwandlung bei qualifizierter Finanzierungsrunde",
      "§ 5 Wandlungsrecht bei Fälligkeit und Exit",
      "§ 6 Wandlungspreis: Discount und Bewertungsobergrenze (Cap)",
      "§ 7 Durchführung der Wandlung",
      "§ 8 Rangrücktritt",
      "§ 9 Informationsrechte und Zusicherungen",
      "§ 10 Übertragung, Mitwirkungspflichten der Gesellschafter",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Die Wandlung läuft über eine Kapitalerhöhung, die beurkundet werden muss (§§ 53, 55 GmbHG). Ob schon der Wandeldarlehensvertrag selbst beurkundungspflichtig ist, weil er die Gesellschafter zur Mitwirkung verpflichtet, ist in der Rechtsprechung nicht abschließend geklärt. Die sichere Variante ist die Beurkundung des Vertrags; viele Beteiligte wählen stattdessen die Schriftform mit Beitritt aller Gesellschafter und nehmen das Risiko bewusst in Kauf. Vorher mit dem Notar sprechen.",
      "Discount und Cap wirken zusammen: Der Investor erhält den für ihn günstigeren Preis. Bei einem Cap deutlich unter der späteren Bewertung verwässern die Gründer stärker als gedacht; rechne vor Unterschrift die Beispielszenarien durch.",
      "Ohne Rangrücktritt zählt das Darlehen bei der Überschuldungsprüfung als Verbindlichkeit und kann eine Insolvenzantragspflicht auslösen. Investoren akzeptieren den qualifizierten Rangrücktritt in der Regel, weil die Wandlung ihr eigentliches Ziel ist.",
      "Der INVEST-Zuschuss des BAFA kann auch für Wandeldarlehen beantragt werden, wenn die Förderbedingungen eingehalten werden. Bedingungen vor Vertragsschluss prüfen, nicht danach.",
      "Zinsen, die in Anteile gewandelt werden, sind beim Investor trotzdem Kapitalertrag; die Gesellschaft muss Kapitalertragsteuer einbehalten oder der Investor versteuert sie selbst. Die Vorlage sieht deshalb wahlweise Barzahlung der Zinsen vor.",
    ],
    faqs: [
      {
        q: "Was ist eine qualifizierte Finanzierungsrunde?",
        a: "Eine Kapitalerhöhung, bei der neue Investoren mindestens einen festgelegten Betrag, in der Vorlage ein Platzhalter von zum Beispiel 500.000 EUR, als Eigenkapital einzahlen. Erst dann wird das Darlehen automatisch gewandelt. Kleinere Runden lösen die Wandlung nicht aus, sofern der Investor das nicht freiwillig wählt.",
      },
      {
        q: "Wie wird der Wandlungspreis berechnet?",
        a: "Der Investor zahlt pro Anteil den Preis der Finanzierungsrunde abzüglich des Discounts (oft 10 bis 25 %), höchstens jedoch den Preis, der sich aus der Bewertungsobergrenze (Cap) ergibt. Der niedrigere der beiden Preise gilt. Darlehensbetrag plus aufgelaufene Zinsen geteilt durch den Wandlungspreis ergibt die Zahl der neuen Anteile.",
      },
      {
        q: "Was passiert, wenn keine Finanzierungsrunde kommt?",
        a: "Dann wird das Darlehen bei Fälligkeit zur Rückzahlung fällig, oder der Investor wandelt zum Cap-Preis beziehungsweise zu einer vereinbarten Fallback-Bewertung. Die Vorlage gibt dem Investor dieses Wahlrecht, damit er nicht gezwungen ist, eine Gesellschaft in die Insolvenz zu treiben, wenn sie nicht zurückzahlen kann.",
      },
      {
        q: "Müssen alle Gesellschafter mit unterschreiben?",
        a: "Ja, das ist dringend zu empfehlen. Die Wandlung erfordert eine Kapitalerhöhung mit Dreiviertelmehrheit und den Verzicht der Altgesellschafter auf ihr Bezugsrecht. Mit ihrer Unterschrift verpflichten sich alle Gesellschafter, bei der Wandlung mitzuwirken; sonst kann der Investor sein Recht nicht durchsetzen.",
      },
    ],
    seo: {
      title: "Wandeldarlehen Vorlage: Convertible Loan Start-up 2026 | GründerX",
      description:
        "Wandeldarlehensvertrag für Business Angels: Betrag, Zins, Wandlung bei qualifizierter Finanzierungsrunde, Discount, Cap, Fälligkeit und Rangrücktritt.",
    },
    stand: "2026-10",
    text: `Wandeldarlehensvertrag

zwischen

[Vorname Nachname / Firma], [Anschrift], [ggf. Handelsregister]
– nachfolgend „Darlehensgeber“ –

und

[Name] [GmbH / UG (haftungsbeschränkt)], [Straße, PLZ Ort], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch [Geschäftsführer]
– nachfolgend „Gesellschaft“ –

sowie den Gesellschaftern der Gesellschaft
1. [Vorname Nachname], [Anschrift], [Anzahl] Geschäftsanteile
2. [Vorname Nachname], [Anschrift], [Anzahl] Geschäftsanteile
– nachfolgend „Gesellschafter“ –

Präambel
Die Gesellschaft entwickelt [kurze Beschreibung]. Das Stammkapital beträgt [Betrag] EUR, eingeteilt in [Anzahl] Geschäftsanteile zu je 1,00 EUR. Der Darlehensgeber möchte die Gesellschaft mit einem Darlehen finanzieren, das unter den nachstehenden Bedingungen in Geschäftsanteile gewandelt wird. Die Gesellschafter treten diesem Vertrag bei, um die zur Wandlung erforderlichen Mitwirkungshandlungen sicherzustellen.

§ 1 Darlehen, Auszahlung und Verwendung
(1) Der Darlehensgeber gewährt der Gesellschaft ein Darlehen in Höhe von [Betrag] EUR („Darlehensbetrag“).
(2) Der Darlehensbetrag wird innerhalb von [z. B. 10] Bankarbeitstagen nach Unterzeichnung dieses Vertrags [und Vorlage des Gesellschafterbeschlusses nach § 10 Abs. 3] auf das Konto der Gesellschaft bei der [Bank], IBAN [IBAN], überwiesen.
(3) Das Darlehen dient der Finanzierung des Geschäftsbetriebs der Gesellschaft, insbesondere [Produktentwicklung, Marketing, Personal]. Ausschüttungen, Darlehen an Gesellschafter oder Rückzahlungen anderer Gesellschafterdarlehen dürfen aus dem Darlehensbetrag nicht geleistet werden.

§ 2 Zinsen
(1) Das Darlehen wird ab dem Tag der Auszahlung mit [z. B. 6] % pro Jahr verzinst (30/360). Die Zinsen werden nicht laufend gezahlt, sondern bis zur Wandlung oder Rückzahlung angesammelt und [bei Wandlung mitgewandelt / bei Wandlung in bar gezahlt].
(2) Soweit auf Zinsen Kapitalertragsteuer einzubehalten ist, zahlt die Gesellschaft den entsprechenden Betrag an das Finanzamt und erteilt dem Darlehensgeber eine Steuerbescheinigung.

§ 3 Laufzeit und Fälligkeit
(1) Das Darlehen hat eine Laufzeit bis zum [Datum, z. B. 24 oder 36 Monate nach Auszahlung] („Fälligkeitstag“). Eine ordentliche Kündigung ist für beide Seiten ausgeschlossen.
(2) Der Darlehensgeber kann das Darlehen aus wichtigem Grund fristlos kündigen, insbesondere wenn über das Vermögen der Gesellschaft ein Insolvenzverfahren beantragt wird, die Gesellschaft wesentliche Pflichten aus diesem Vertrag verletzt oder Zusicherungen nach § 9 unrichtig sind.
(3) Am Fälligkeitstag oder nach Kündigung ist der Darlehensbetrag nebst aufgelaufenen Zinsen zur Rückzahlung fällig, soweit nicht eine Wandlung nach §§ 4 oder 5 erfolgt und soweit § 8 dem nicht entgegensteht.

§ 4 Pflichtwandlung bei qualifizierter Finanzierungsrunde
(1) Eine „qualifizierte Finanzierungsrunde“ ist eine Kapitalerhöhung der Gesellschaft, bei der ein oder mehrere Investoren, die nicht bereits Gesellschafter sind, neue Geschäftsanteile gegen Bareinlagen (einschließlich Agio oder Zuzahlung in die Kapitalrücklage) von insgesamt mindestens [Betrag, z. B. 500.000] EUR übernehmen.
(2) Bei einer qualifizierten Finanzierungsrunde wird der Darlehensbetrag zuzüglich der bis zum Tag der Beurkundung der Kapitalerhöhung aufgelaufenen Zinsen („Wandlungsbetrag“) zwingend in Geschäftsanteile der Gesellschaft gewandelt. Der Darlehensgeber erhält Geschäftsanteile derselben Gattung und mit denselben Rechten wie die Investoren der Finanzierungsrunde, soweit diese nicht ausdrücklich an Mindestbeträge geknüpft sind.
(3) Die Gesellschaft informiert den Darlehensgeber mindestens [z. B. 4] Wochen vor der geplanten Beurkundung schriftlich über die Bedingungen der Finanzierungsrunde (Investoren, Bewertung, Beteiligungsvertrag).

§ 5 Wandlungsrecht bei Fälligkeit, Exit und sonstigen Kapitalerhöhungen
(1) Kommt es bis zum Fälligkeitstag nicht zu einer qualifizierten Finanzierungsrunde, kann der Darlehensgeber durch schriftliche Erklärung bis spätestens [z. B. 4] Wochen vor dem Fälligkeitstag verlangen, dass der Wandlungsbetrag auf Grundlage einer Bewertung der Gesellschaft (pre-money, vollverwässert) in Höhe von [Betrag, in der Regel der Cap oder ein niedrigerer Fallback-Wert] EUR gewandelt wird. Erklärt er dies nicht, wird das Darlehen am Fälligkeitstag zur Rückzahlung fällig.
(2) Bei einem Exit (Veräußerung von mehr als 50 % der Geschäftsanteile oder des wesentlichen Vermögens, Börsengang) vor Wandlung kann der Darlehensgeber wählen zwischen (a) Wandlung zum Cap-Preis nach § 6 unmittelbar vor dem Exit und (b) Rückzahlung des Wandlungsbetrags zuzüglich einer Prämie von [z. B. 50] % des Darlehensbetrags.
(3) Bei einer Kapitalerhöhung, die keine qualifizierte Finanzierungsrunde ist, kann der Darlehensgeber die Wandlung zu den Bedingungen dieser Kapitalerhöhung nach § 6 verlangen.

§ 6 Wandlungspreis: Discount und Bewertungsobergrenze
(1) Der Preis je neuem Geschäftsanteil bei Wandlung („Wandlungspreis“) ist der niedrigere der folgenden Beträge:
   a) der von den Investoren der Finanzierungsrunde je Geschäftsanteil gezahlte Preis (Nennbetrag zuzüglich Agio/Zuzahlung) abzüglich eines Abschlags von [z. B. 20] % („Discount“);
   b) der Preis je Geschäftsanteil, der sich aus einer Bewertung der Gesellschaft vor der Finanzierungsrunde (pre-money, vollverwässert einschließlich aller Options- und Mitarbeiterbeteiligungsprogramme) in Höhe von [Betrag, z. B. 3.000.000] EUR ergibt („Cap“).
(2) Die Anzahl der vom Darlehensgeber zu übernehmenden neuen Geschäftsanteile entspricht dem Wandlungsbetrag geteilt durch den Wandlungspreis, abgerundet auf ganze Anteile. Ein Spitzenbetrag wird in bar an den Darlehensgeber zurückgezahlt oder in die Kapitalrücklage geleistet.
(3) Der Darlehensgeber übernimmt die neuen Geschäftsanteile zum Nennbetrag von je 1,00 EUR; der Differenzbetrag zwischen Wandlungsbetrag und Summe der Nennbeträge wird als Zuzahlung in die Kapitalrücklage der Gesellschaft (§ 272 Abs. 2 Nr. 4 HGB) geleistet. Die Einlageverpflichtung wird durch Verrechnung mit dem Darlehensrückzahlungsanspruch erfüllt, soweit rechtlich zulässig; andernfalls zahlt der Darlehensgeber die Einlage in bar ein und die Gesellschaft zahlt das Darlehen Zug um Zug zurück.

§ 7 Durchführung der Wandlung
(1) Zur Durchführung der Wandlung beschließen die Gesellschafter eine Kapitalerhöhung um den erforderlichen Nennbetrag, schließen den Darlehensgeber zur Übernahme der neuen Geschäftsanteile zu und verzichten auf ihr Bezugsrecht. Die Gesellschaft lässt die Kapitalerhöhung unverzüglich zum Handelsregister anmelden und reicht eine aktualisierte Gesellschafterliste ein.
(2) Der Darlehensgeber gibt die Übernahmeerklärung in notariell beglaubigter Form ab und tritt einer bestehenden oder im Rahmen der Finanzierungsrunde abzuschließenden Gesellschaftervereinbarung bei, soweit er dort nicht schlechter gestellt wird als die Investoren der Finanzierungsrunde.
(3) Mit Eintragung der Kapitalerhöhung erlöschen die Ansprüche des Darlehensgebers aus dem Darlehen in Höhe des gewandelten Betrags.
(4) Die Kosten der Kapitalerhöhung trägt die Gesellschaft.

§ 8 Rangrücktritt
Der Darlehensgeber tritt mit seinen Ansprüchen auf Rückzahlung des Darlehens und auf Zinsen im Rang hinter die Forderungen aller gegenwärtigen und künftigen Gläubiger der Gesellschaft im Sinne des § 39 Abs. 1 Nr. 1 bis 5 InsO zurück. Außerhalb eines Insolvenzverfahrens kann er Erfüllung nur aus künftigen Jahresüberschüssen, einem Liquidationsüberschuss oder sonstigem freien Vermögen verlangen und nur, soweit dadurch weder eine Zahlungsunfähigkeit noch eine Überschuldung der Gesellschaft (§§ 17, 19 InsO) eintritt oder droht. Dieser qualifizierte Rangrücktritt dient der Vermeidung einer Überschuldung (§ 19 Abs. 2 Satz 2 InsO). Die Wandlung nach §§ 4 bis 7 bleibt vom Rangrücktritt unberührt.

§ 9 Informationsrechte und Zusicherungen
(1) Die Gesellschaft übermittelt dem Darlehensgeber bis zur Wandlung oder Rückzahlung quartalsweise innerhalb von [z. B. 4] Wochen nach Quartalsende einen Bericht mit Umsatz, Ergebnis, Liquidität und wesentlichen Entwicklungen sowie den Jahresabschluss innerhalb von [6] Monaten nach Geschäftsjahresende. Sie informiert ihn unverzüglich über geplante Kapitalmaßnahmen, Exit-Verhandlungen und Umstände, die den Fortbestand gefährden.
(2) Die Gesellschaft und die Gesellschafter sichern zu, dass zum Tag der Unterzeichnung die Angaben in der Präambel zutreffen, die Gesellschafterliste in Anlage 1 vollständig ist, keine weiteren Options-, Wandlungs- oder Bezugsrechte Dritter bestehen außer den in Anlage 2 genannten, und dass keine Insolvenzgründe vorliegen.
(3) Der Darlehensgeber behandelt alle erhaltenen Informationen vertraulich.

§ 10 Übertragung, Mitwirkungspflichten der Gesellschafter
(1) Der Darlehensgeber darf seine Rechte aus diesem Vertrag nur mit Zustimmung der Gesellschaft übertragen; die Zustimmung darf nur aus wichtigem Grund verweigert werden. Übertragungen an verbundene Unternehmen oder Familienangehörige sind zustimmungsfrei anzuzeigen.
(2) Die Gesellschafter verpflichten sich, alle Beschlüsse zu fassen, Erklärungen abzugeben und Handlungen vorzunehmen, die zur Durchführung der Wandlung erforderlich sind, insbesondere Kapitalerhöhungsbeschlüsse zu fassen und auf Bezugsrechte zu verzichten. Sie verpflichten sich, Geschäftsanteile nur an Erwerber zu übertragen, die dieser Verpflichtung beitreten.
(3) Die Gesellschafterversammlung hat dem Abschluss dieses Vertrags mit Beschluss vom [Datum] zugestimmt (Anlage 3).

§ 11 Schlussbestimmungen
(1) Dieser Vertrag wurde [in Schriftform geschlossen; den Parteien ist bekannt, dass eine notarielle Beurkundung in Betracht kommt, soweit der Vertrag Verpflichtungen zur Übernahme oder Abtretung von Geschäftsanteilen enthält / notariell beurkundet].
(2) Änderungen bedürfen der Schriftform, soweit nicht eine strengere Form gesetzlich erforderlich ist; das gilt auch für diese Klausel.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt deutsches Recht.

Anlagen: 1 Gesellschafterliste, 2 Bestehende Options- und Wandlungsrechte, 3 Gesellschafterbeschluss

[Ort], den [Datum]


______________________________
[Vorname Nachname / Firma], Darlehensgeber


______________________________
[Name] [GmbH / UG (haftungsbeschränkt)], vertreten durch [Geschäftsführer]


______________________________
[Vorname Nachname], Gesellschafter


______________________________
[Vorname Nachname], Gesellschafter

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "stille-beteiligung",
    titel: "Vertrag über eine stille Beteiligung",
    kurz: "Vertrag über eine typische stille Gesellschaft nach §§ 230 ff. HGB: Einlage, Gewinn- und Verlustbeteiligung, Kontrollrechte, Kündigung und Auseinandersetzung.",
    kategorie: "gesellschaft",
    dateiname: "Stille-Beteiligung",
    wofuer: [
      "Familie, Freunde oder Mitarbeiter wollen Geld geben und am Gewinn teilhaben, aber nicht Gesellschafter werden",
      "Finanzierung eines Einzelunternehmens, einer GbR, UG oder GmbH ohne Notar und ohne Stimmrechte",
      "Wenn der Geldgeber nach außen nicht in Erscheinung treten soll",
      "Als Alternative zum Darlehen, wenn der Geldgeber Chancen und Risiken des Unternehmens mittragen will",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Beginn der stillen Gesellschaft",
      "§ 2 Einlage",
      "§ 3 Geschäftsführung und Rechtsstellung des stillen Gesellschafters",
      "§ 4 Gewinn- und Verlustbeteiligung",
      "§ 5 Entnahmen und Auszahlung",
      "§ 6 Jahresabschluss, Kontroll- und Informationsrechte",
      "§ 7 Zustimmungspflichtige Geschäfte",
      "§ 8 Dauer und Kündigung",
      "§ 9 Auseinandersetzung",
      "§ 10 Tod, Insolvenz, Übertragung",
      "§ 11 Wettbewerb und Vertraulichkeit",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Die typische stille Gesellschaft ist eine reine Innengesellschaft: Der Stille wird nicht Gesellschafter des Unternehmens, hat keine Stimmrechte und haftet Dritten nicht. In der Insolvenz des Unternehmens ist seine Einlage eine einfache Insolvenzforderung, soweit sie den Verlustanteil übersteigt (§ 236 HGB).",
      "Steuerlich erzielt der typische stille Gesellschafter Einkünfte aus Kapitalvermögen (§ 20 Abs. 1 Nr. 4 EStG); das Unternehmen behält Kapitalertragsteuer ein. Wird der Stille auch an stillen Reserven und Firmenwert beteiligt und erhält unternehmerische Mitsprache, wird er zum atypisch stillen Mitunternehmer mit ganz anderen Steuerfolgen. Die Vorlage ist bewusst typisch gehalten.",
      "Verluste des typisch Stillen sind steuerlich nur eingeschränkt nutzbar (Verweis auf § 15a EStG in § 20 Abs. 1 Nr. 4 EStG). Wer Verluste ausschließen will, kann das vertraglich tun (§ 231 Abs. 2 HGB); die Vorlage bietet beide Varianten.",
      "Bei einer GmbH oder UG kann die Beteiligung eines Stillen am Gewinn als Teilgewinnabführungsvertrag gelten, der der Zustimmung der Gesellschafterversammlung bedarf. Hole den Beschluss vor Unterschrift ein.",
      "Wirbt ein Unternehmen öffentlich um viele stille Gesellschafter, kann das eine prospektpflichtige Vermögensanlage sein (VermAnlG). Die Vorlage ist für den Einzelfall gedacht, nicht für Massenangebote.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen stiller Beteiligung und Darlehen?",
        a: "Der Darlehensgeber bekommt feste Zinsen, unabhängig vom Erfolg. Der stille Gesellschafter bekommt einen Anteil am Gewinn und trägt, wenn vereinbart, auch Verluste bis zur Höhe seiner Einlage. Dafür hat er Kontrollrechte wie ein Kommanditist. Für das Unternehmen ist die stille Beteiligung bei schwachem Ergebnis günstiger, bei starkem Ergebnis teurer.",
      },
      {
        q: "Hat der stille Gesellschafter Mitspracherechte?",
        a: "Nur die, die der Vertrag ihm gibt. Gesetzlich darf er den Jahresabschluss verlangen und die Bücher prüfen (§ 233 HGB). Die Vorlage ergänzt einen Katalog zustimmungspflichtiger Geschäfte, der die Einlage schützt, ohne den Stillen zum Mitunternehmer zu machen.",
      },
      {
        q: "Wie wird die stille Beteiligung bei Kündigung abgerechnet?",
        a: "Zum Stichtag wird ein Auseinandersetzungsguthaben ermittelt: Einlage plus nicht entnommene Gewinnanteile minus zugewiesene Verluste. Stille Reserven und Firmenwert bleiben beim typisch Stillen außen vor. Das Guthaben wird in Raten ausgezahlt, damit das Unternehmen nicht in Liquiditätsnot gerät.",
      },
      {
        q: "Muss die stille Beteiligung irgendwo eingetragen werden?",
        a: "Nein, sie erscheint weder im Handelsregister noch in der Gesellschafterliste. Bei einer GmbH oder AG kann die Beteiligung aber als Unternehmensvertrag zustimmungs- und eintragungspflichtig sein, wenn der Stille erheblich am Gewinn beteiligt wird. Steuerlich meldet das Unternehmen die Kapitalerträge über die Kapitalertragsteuer-Anmeldung.",
      },
    ],
    seo: {
      title: "Stille Beteiligung Vertrag Vorlage (§§ 230 ff. HGB) | GründerX",
      description:
        "Kostenloser Vertrag über eine typische stille Gesellschaft: Einlage, Gewinn- und Verlustbeteiligung, Kontrollrechte, Kündigung und Auseinandersetzung nach HGB.",
    },
    stand: "2026-10",
    text: `Vertrag über die Errichtung einer stillen Gesellschaft

zwischen

[Vorname Nachname / Firma], [Anschrift], [ggf. Handelsregister HRB [Nummer], vertreten durch [Geschäftsführer]], Inhaber des Unternehmens „[Name des Unternehmens]“ mit Sitz in [Ort]
– nachfolgend „Inhaber“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
– nachfolgend „stiller Gesellschafter“ –

§ 1 Gegenstand und Beginn
(1) Der stille Gesellschafter beteiligt sich als typischer stiller Gesellschafter im Sinne der §§ 230 ff. HGB am Handelsgewerbe des Inhabers, das [Beschreibung des Unternehmens, z. B. „den Betrieb eines Online-Shops für Outdoor-Ausrüstung“] zum Gegenstand hat.
(2) Die stille Gesellschaft beginnt am [Datum]. Sie ist eine reine Innengesellschaft; nach außen tritt allein der Inhaber auf. Ein Gesamthandsvermögen wird nicht gebildet; die Einlage geht in das Vermögen des Inhabers über.
(3) Der stille Gesellschafter ist weder an den stillen Reserven noch am Geschäftswert des Unternehmens beteiligt. Eine Beteiligung an der Geschäftsführung ist ausgeschlossen.

§ 2 Einlage
(1) Der stille Gesellschafter leistet eine Einlage in Höhe von [Betrag] EUR (in Worten: [Betrag in Worten] Euro).
(2) Die Einlage ist bis zum [Datum] in bar auf das Geschäftskonto des Inhabers bei der [Bank], IBAN [IBAN], zu zahlen. [Alternative: Die Einlage wird durch Umwandlung der Darlehensforderung des stillen Gesellschafters vom [Datum] in Höhe von [Betrag] EUR erbracht.]
(3) Die Einlage wird auf einem Einlagekonto gebucht, das unverzinslich geführt wird. Gewinnanteile, Verlustanteile und Entnahmen werden auf einem gesonderten Verrechnungskonto erfasst.
(4) Eine Nachschusspflicht besteht nicht. Verluste über die Einlage hinaus trägt der stille Gesellschafter nicht.

§ 3 Geschäftsführung und Rechtsstellung des stillen Gesellschafters
(1) Die Geschäftsführung und Vertretung des Unternehmens obliegt allein dem Inhaber. Er führt die Geschäfte mit der Sorgfalt eines ordentlichen Kaufmanns und im Interesse auch des stillen Gesellschafters.
(2) Der stille Gesellschafter ist nicht berechtigt, für das Unternehmen zu handeln. Er haftet Dritten gegenüber nicht für Verbindlichkeiten des Unternehmens.
(3) Der Inhaber darf ohne Zustimmung des stillen Gesellschafters weitere stille Gesellschafter aufnehmen, sofern die Gesamtsumme der Gewinnbeteiligungen aller stillen Gesellschafter [z. B. 40] % nicht übersteigt.

§ 4 Gewinn- und Verlustbeteiligung
(1) Der stille Gesellschafter ist am Gewinn des Unternehmens mit [z. B. 15] % beteiligt. Maßgeblich ist der nach den Vorschriften des HGB ermittelte Jahresüberschuss vor Ertragsteuern des Inhabers, vor Abzug der Gewinnanteile stiller Gesellschafter und [vor / nach] Abzug eines angemessenen Unternehmerlohns für den Inhaber in Höhe von [Betrag] EUR pro Jahr. Außerordentliche Erträge aus der Veräußerung von Anlagevermögen bleiben unberücksichtigt.
(2) Der Gewinnanteil ist auf höchstens [z. B. 20] % der Einlage pro Geschäftsjahr begrenzt. [Optional: Der stille Gesellschafter erhält unabhängig vom Ergebnis eine Mindestverzinsung von [z. B. 3] % der Einlage, die auf den Gewinnanteil angerechnet wird.]
(3) Verlustbeteiligung (Zutreffendes ankreuzen):
   [ ] Der stille Gesellschafter nimmt am Verlust im Verhältnis seiner Gewinnbeteiligung teil, jedoch höchstens bis zur Höhe seiner Einlage. Verlustanteile werden dem Verrechnungskonto belastet; spätere Gewinnanteile dienen zunächst dem Ausgleich (§ 232 Abs. 2 HGB).
   [ ] Die Beteiligung am Verlust ist ausgeschlossen (§ 231 Abs. 2 HGB).
(4) Bei unterjährigem Beginn oder Ende wird der Gewinn- und Verlustanteil zeitanteilig berechnet.

§ 5 Entnahmen und Auszahlung
(1) Der Gewinnanteil wird mit Feststellung des Jahresabschlusses, spätestens [z. B. 8] Monate nach Ende des Geschäftsjahres, dem Verrechnungskonto gutgeschrieben und innerhalb von [z. B. 4] Wochen ausgezahlt, soweit das Einlagekonto durch Verluste nicht gemindert ist.
(2) Der Inhaber behält Kapitalertragsteuer und Solidaritätszuschlag ein, führt sie an das Finanzamt ab und erteilt dem stillen Gesellschafter eine Steuerbescheinigung.
(3) Der Inhaber darf die Auszahlung aufschieben, wenn sie die Zahlungsfähigkeit des Unternehmens gefährden würde; der aufgeschobene Betrag wird mit [z. B. 4] % pro Jahr verzinst und spätestens nach [z. B. 12] Monaten gezahlt.

§ 6 Jahresabschluss, Kontroll- und Informationsrechte
(1) Der Inhaber stellt den Jahresabschluss innerhalb von [z. B. 6] Monaten nach Ende des Geschäftsjahres auf und übermittelt dem stillen Gesellschafter eine Abschrift nebst Berechnung seines Gewinn- oder Verlustanteils. Geschäftsjahr ist das Kalenderjahr.
(2) Der stille Gesellschafter hat die Kontrollrechte nach § 233 HGB. Er kann den Jahresabschluss und die Berechnung seines Anteils unter Einsicht in Bücher und Papiere selbst oder durch einen zur Berufsverschwiegenheit verpflichteten Dritten auf seine Kosten prüfen lassen. Einwendungen sind innerhalb von [z. B. 6] Wochen nach Zugang schriftlich zu erheben; andernfalls gilt die Berechnung als anerkannt.
(3) Der Inhaber übermittelt dem stillen Gesellschafter [quartalsweise] eine betriebswirtschaftliche Auswertung und informiert ihn unverzüglich über Umstände, die den Bestand des Unternehmens gefährden.

§ 7 Zustimmungspflichtige Geschäfte
Der Inhaber bedarf der vorherigen schriftlichen Zustimmung des stillen Gesellschafters für:
   a) Veräußerung oder Verpachtung des Unternehmens oder wesentlicher Teile,
   b) Änderung des Unternehmensgegenstands oder Aufgabe des Geschäftsbetriebs,
   c) Aufnahme von Darlehen und Übernahme von Bürgschaften über [Betrag] EUR im Einzelfall,
   d) Investitionen über [Betrag] EUR im Geschäftsjahr,
   e) Aufnahme weiterer stiller Gesellschafter über die Grenze des § 3 Abs. 3 hinaus,
   f) Umwandlung des Unternehmens in eine andere Rechtsform.
Die Zustimmung darf nur aus wichtigem Grund verweigert werden; sie gilt als erteilt, wenn der stille Gesellschafter nicht innerhalb von zwei Wochen nach Zugang der Anfrage widerspricht.

§ 8 Dauer und Kündigung
(1) Die stille Gesellschaft wird auf unbestimmte Zeit geschlossen. Sie kann von jeder Partei mit einer Frist von [z. B. 6] Monaten zum Ende eines Geschäftsjahres gekündigt werden, erstmals zum [Datum].
(2) Das Recht zur fristlosen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt für den stillen Gesellschafter insbesondere vor, wenn der Inhaber die Pflichten aus §§ 5 bis 7 nachhaltig verletzt oder das Unternehmen veräußert.
(3) Die Kündigung bedarf der Schriftform.

§ 9 Auseinandersetzung
(1) Endet die stille Gesellschaft, erhält der stille Gesellschafter ein Auseinandersetzungsguthaben in Höhe des Saldos aus Einlagekonto und Verrechnungskonto zum Stichtag der Beendigung (§ 235 HGB). Stille Reserven, Geschäftswert und schwebende Geschäfte bleiben unberücksichtigt; am Ergebnis des laufenden Geschäftsjahres nimmt er zeitanteilig teil.
(2) Ein negatives Guthaben begründet keine Zahlungspflicht des stillen Gesellschafters.
(3) Das Guthaben ist in [z. B. 3] gleichen Jahresraten zu zahlen, die erste Rate [6] Monate nach dem Stichtag. Der offene Betrag wird mit 2 Prozentpunkten über dem Basiszinssatz verzinst. Vorzeitige Zahlung ist zulässig.
(4) Streit über die Höhe entscheidet ein von der Industrie- und Handelskammer [Ort] benannter Steuerberater oder Wirtschaftsprüfer als Schiedsgutachter verbindlich; die Kosten tragen die Parteien je zur Hälfte.

§ 10 Tod, Insolvenz, Übertragung
(1) Stirbt der stille Gesellschafter, wird die stille Gesellschaft mit seinen Erben fortgesetzt; mehrere Erben benennen einen gemeinsamen Vertreter. Der Inhaber kann die stille Gesellschaft innerhalb von sechs Monaten nach Kenntnis vom Tod mit einer Frist von drei Monaten kündigen.
(2) Stirbt der Inhaber oder wird über sein Vermögen das Insolvenzverfahren eröffnet, endet die stille Gesellschaft; die Rechte des stillen Gesellschafters richten sich nach § 236 HGB.
(3) Der stille Gesellschafter darf seine Beteiligung nur mit schriftlicher Zustimmung des Inhabers übertragen oder belasten.

§ 11 Wettbewerb und Vertraulichkeit
(1) Der stille Gesellschafter unterliegt keinem Wettbewerbsverbot. [Alternative: Der stille Gesellschafter darf sich während der Dauer der stillen Gesellschaft nicht an einem Wettbewerber des Unternehmens beteiligen.]
(2) Der stille Gesellschafter behandelt alle Informationen über das Unternehmen vertraulich, auch nach Beendigung der stillen Gesellschaft.

§ 12 Schlussbestimmungen
(1) [Bei GmbH/UG als Inhaber: Die Gesellschafterversammlung des Inhabers hat dem Abschluss dieses Vertrags mit Beschluss vom [Datum] zugestimmt.]
(2) Änderungen und Ergänzungen bedürfen der Schriftform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, [Ort]. Es gilt das Recht der Bundesrepublik Deutschland.
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname / Firma], Inhaber


______________________________
[Vorname Nachname], stiller Gesellschafter

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "geschaeftsordnung-geschaeftsfuehrung",
    titel: "Geschäftsordnung für die Geschäftsführung",
    kurz: "Geschäftsordnung für mehrere Geschäftsführer einer GmbH oder UG: Ressortverteilung, Gesamtverantwortung, zustimmungspflichtige Geschäfte, Berichtspflichten und Sitzungen.",
    kategorie: "gesellschaft",
    dateiname: "Geschaeftsordnung-Geschaeftsfuehrung",
    wofuer: [
      "Zwei oder mehr Geschäftsführer teilen sich die Arbeit und wollen Zuständigkeiten festhalten",
      "Gesellschafter wollen der Geschäftsführung klare Grenzen und Berichtspflichten vorgeben",
      "Nach einer Finanzierungsrunde, wenn Investoren Zustimmungskataloge verlangen",
      "Zur Haftungsbegrenzung durch eine schriftliche, eindeutige Ressortaufteilung",
    ],
    enthaelt: [
      "§ 1 Geltungsbereich und Grundsätze",
      "§ 2 Gesamtverantwortung und Ressortverteilung",
      "§ 3 Ressorts und Zuständigkeiten",
      "§ 4 Vorsitz und Vertretung",
      "§ 5 Sitzungen der Geschäftsführung",
      "§ 6 Beschlüsse der Geschäftsführung",
      "§ 7 Zustimmungspflichtige Geschäfte",
      "§ 8 Berichtspflichten gegenüber den Gesellschaftern",
      "§ 9 Interessenkonflikte, Vertraulichkeit",
      "§ 10 Inkrafttreten und Änderungen",
    ],
    hinweise: [
      "Eine Ressortaufteilung entlastet nur, wenn sie schriftlich, klar und von allen Geschäftsführern vereinbart ist und die Beteiligten fachlich geeignet sind. Das hat der Bundesgerichtshof 2018 ausdrücklich verlangt. Mündliche Absprachen helfen im Haftungsfall nicht.",
      "Auch bei Ressortverteilung bleibt jeder Geschäftsführer für die Gesamtgesellschaft verantwortlich: Er muss die Kollegen überwachen und bei Anzeichen für Probleme eingreifen. Pflichten wie Insolvenzantrag (§ 15a InsO), Steuern und Sozialabgaben lassen sich nicht delegieren.",
      "Die Geschäftsordnung bindet nur im Innenverhältnis. Nach außen bleibt die Vertretungsmacht so, wie sie im Handelsregister steht (§ 37 Abs. 2 GmbHG). Ein Verstoß macht das Geschäft nicht unwirksam, löst aber Haftung des Geschäftsführers aus.",
      "Die Geschäftsordnung sollte von der Gesellschafterversammlung beschlossen werden, nicht nur von den Geschäftsführern selbst. Nur dann kann sie Zustimmungsvorbehalte wirksam vorgeben (§ 37 Abs. 1 GmbHG), und Änderungen durch die Geschäftsführer sind ausgeschlossen.",
    ],
    faqs: [
      {
        q: "Wer erlässt die Geschäftsordnung?",
        a: "Vorrangig die Gesellschafterversammlung, weil sie den Geschäftsführern Weisungen erteilen kann. Ist in der Satzung nichts geregelt, dürfen die Geschäftsführer sich auch selbst eine Geschäftsordnung geben, solange sie Satzung und Gesellschafterbeschlüssen nicht widerspricht. Die Vorlage sieht den Beschluss der Gesellschafter vor.",
      },
      {
        q: "Schützt die Ressortverteilung vor Haftung?",
        a: "Teilweise. Für Fehler im fremden Ressort haftet ein Geschäftsführer nur, wenn er seine Überwachungspflicht verletzt hat, also Warnzeichen ignoriert oder sich nicht regelmäßig informiert hat. Die schriftliche Aufteilung senkt das Risiko erheblich, beseitigt es aber nicht; bei Krise und Insolvenzreife gilt wieder volle Gesamtverantwortung.",
      },
      {
        q: "Was gehört in den Katalog zustimmungspflichtiger Geschäfte?",
        a: "Alles, was die Gesellschaft über das Tagesgeschäft hinaus bindet: Kredite, Bürgschaften, langfristige Verträge, Investitionen über einem Schwellenwert, Beteiligungen, Personal ab einer Gehaltsgrenze, Geschäfte mit Gesellschaftern. Die Schwellen sollten zur Unternehmensgröße passen; zu niedrige Grenzen lähmen die Geschäftsführung.",
      },
      {
        q: "Brauchen wir die Geschäftsordnung auch mit nur einem Geschäftsführer?",
        a: "Nein, dann reichen Zustimmungsvorbehalte in Satzung oder Anstellungsvertrag. Die Geschäftsordnung entfaltet ihren Wert bei mehreren Geschäftsführern, weil sie Ressorts, Sitzungen und Beschlussfassung regelt. Für den Fall eines späteren zweiten Geschäftsführers kann sie aber schon vorbereitet werden.",
      },
    ],
    seo: {
      title: "Geschäftsordnung Geschäftsführung GmbH Vorlage | GründerX",
      description:
        "Geschäftsordnung für mehrere GmbH- oder UG-Geschäftsführer: Ressortverteilung, Gesamtverantwortung, zustimmungspflichtige Geschäfte, Berichte, Sitzungen.",
    },
    stand: "2026-10",
    text: `Geschäftsordnung für die Geschäftsführung

der [Name] [GmbH / UG (haftungsbeschränkt)] mit Sitz in [Ort], Amtsgericht [Ort], HRB [Nummer]

beschlossen von der Gesellschafterversammlung am [Datum] gemäß § 37 Abs. 1 GmbHG [und § [Nummer] des Gesellschaftsvertrags]

§ 1 Geltungsbereich und Grundsätze
(1) Diese Geschäftsordnung gilt für alle gegenwärtigen und künftigen Geschäftsführer der Gesellschaft. Jeder neu bestellte Geschäftsführer bestätigt ihre Kenntnisnahme schriftlich.
(2) Die Geschäftsführer führen die Geschäfte der Gesellschaft gemeinschaftlich nach Gesetz, Gesellschaftsvertrag, den Beschlüssen und Weisungen der Gesellschafterversammlung, ihren Anstellungsverträgen und dieser Geschäftsordnung. Sie arbeiten vertrauensvoll zusammen und informieren sich gegenseitig laufend über alle wesentlichen Vorgänge in ihren Ressorts.
(3) Die Geschäftsordnung regelt das Innenverhältnis. Die Vertretungsbefugnis im Außenverhältnis richtet sich nach Gesellschaftsvertrag und Handelsregister und bleibt unberührt (§ 37 Abs. 2 GmbHG).

§ 2 Gesamtverantwortung und Ressortverteilung
(1) Die Geschäftsführer tragen gemeinsam die Verantwortung für die gesamte Geschäftsführung. Unbeschadet der Ressortverteilung nach § 3 bleibt jeder Geschäftsführer verpflichtet, sich über die Angelegenheiten der anderen Ressorts zu informieren, die Tätigkeit der übrigen Geschäftsführer zu überwachen und bei Anhaltspunkten für Pflichtverstöße oder Gefahren für die Gesellschaft einzuschreiten.
(2) Nicht delegierbar und stets Sache aller Geschäftsführer gemeinsam sind insbesondere: Überwachung der Zahlungsfähigkeit und Prüfung einer Überschuldung, Stellung eines Insolvenzantrags (§ 15a InsO), Einhaltung der Kapitalerhaltung (§§ 30, 31 GmbHG), Aufstellung des Jahresabschlusses, Abführung von Steuern und Sozialversicherungsbeiträgen, Einreichung der Gesellschafterliste, Erfüllung der Pflichten gegenüber dem Transparenzregister sowie Entscheidungen von grundsätzlicher Bedeutung.
(3) Angelegenheiten, die mehrere Ressorts betreffen, sind gemeinsam zu entscheiden. Im Zweifel ist die Angelegenheit der Gesamtgeschäftsführung vorzulegen.

§ 3 Ressorts und Zuständigkeiten
(1) Die Ressorts werden wie folgt verteilt:
   a) [Vorname Nachname] (Vorsitz / CEO): Strategie und Unternehmensplanung, Vertrieb und Kunden, Marketing, Investoren- und Gesellschafterbeziehungen, Personal, Recht und Verträge, Öffentlichkeitsarbeit.
   b) [Vorname Nachname] (CFO / COO): Finanzen, Buchhaltung und Controlling, Liquiditätsplanung, Steuern, Banken, Versicherungen, Einkauf, Logistik, Verwaltung, Datenschutz-Organisation.
   c) [Vorname Nachname] (CTO): Produktentwicklung, Technik und IT-Infrastruktur, IT-Sicherheit, Qualitätssicherung, Schutzrechte.
   [Bei zwei Geschäftsführern die Ressorts entsprechend zusammenfassen.]
(2) Jeder Geschäftsführer führt sein Ressort eigenverantwortlich im Rahmen des Budgets und der Beschlüsse der Gesamtgeschäftsführung. Er darf Mitarbeitern seines Ressorts Aufgaben übertragen, bleibt aber für Auswahl, Anleitung und Überwachung verantwortlich.
(3) Die Ressortverteilung kann nur durch Beschluss der Gesellschafterversammlung geändert werden. Bei Verhinderung eines Geschäftsführers über mehr als [z. B. 2] Wochen vertritt ihn [der Vorsitzende / der in Absatz 1 jeweils nachfolgend genannte Geschäftsführer] in seinem Ressort.

§ 4 Vorsitz und Vertretung
(1) [Vorname Nachname] ist Vorsitzender der Geschäftsführung. Er koordiniert die Ressorts, bereitet die Sitzungen vor, leitet sie und vertritt die Geschäftsführung gegenüber der Gesellschafterversammlung. Ein Weisungsrecht gegenüber den übrigen Geschäftsführern hat er nicht.
(2) Im Außenverhältnis gilt die im Handelsregister eingetragene Vertretungsregelung. Im Innenverhältnis darf ein Geschäftsführer von einer Einzelvertretungsbefugnis nur innerhalb seines Ressorts und bis zu einem Geschäftswert von [Betrag] EUR Gebrauch machen; darüber hinaus ist die Zustimmung eines weiteren Geschäftsführers einzuholen.

§ 5 Sitzungen der Geschäftsführung
(1) Die Geschäftsführung tritt mindestens [z. B. alle zwei Wochen] zu einer Sitzung zusammen. Darüber hinaus kann jeder Geschäftsführer unter Angabe der Gegenstände eine Sitzung mit einer Frist von [z. B. 3] Werktagen verlangen; in dringenden Fällen entfällt die Frist.
(2) Sitzungen können in Präsenz, per Video- oder Telefonkonferenz stattfinden. Der Vorsitzende übersendet die Tagesordnung spätestens [z. B. 2] Werktage vor der Sitzung.
(3) Über jede Sitzung wird ein Protokoll geführt, das Teilnehmer, Beschlüsse, Abstimmungsergebnisse und abweichende Voten festhält. Es wird innerhalb von [z. B. 5] Werktagen an alle Geschäftsführer verteilt und gilt als genehmigt, wenn nicht innerhalb von einer Woche widersprochen wird. Die Protokolle werden [z. B. 10] Jahre aufbewahrt.

§ 6 Beschlüsse der Geschäftsführung
(1) Der Gesamtgeschäftsführung sind alle Angelegenheiten von grundsätzlicher Bedeutung, ressortübergreifende Angelegenheiten, die Geschäfte nach § 7 vor Einholung der Gesellschafterzustimmung sowie alle Angelegenheiten vorzulegen, die ein Geschäftsführer zur Entscheidung stellt.
(2) Die Geschäftsführung ist beschlussfähig, wenn alle Geschäftsführer geladen und mindestens [die Hälfte / zwei] anwesend sind. Beschlüsse werden [einstimmig / mit einfacher Mehrheit der anwesenden Geschäftsführer] gefasst. [Bei Stimmengleichheit gibt die Stimme des Vorsitzenden den Ausschlag / Bei Stimmengleichheit gilt der Antrag als abgelehnt und ist der Gesellschafterversammlung vorzulegen.]
(3) Beschlüsse können auch außerhalb von Sitzungen per E-Mail oder in anderer Textform gefasst werden, wenn kein Geschäftsführer diesem Verfahren widerspricht.
(4) Ein überstimmter Geschäftsführer kann verlangen, dass die Angelegenheit der Gesellschafterversammlung vorgelegt wird; bis zu deren Entscheidung wird der Beschluss nicht vollzogen, es sei denn, der Gesellschaft droht sonst ein erheblicher Nachteil.

§ 7 Zustimmungspflichtige Geschäfte
(1) Die Geschäftsführung bedarf für folgende Geschäfte und Maßnahmen der vorherigen Zustimmung der Gesellschafterversammlung, soweit sie nicht in einem von der Gesellschafterversammlung genehmigten Jahresbudget enthalten sind:
   a) Erwerb, Veräußerung und Belastung von Grundstücken,
   b) Gründung, Erwerb, Veräußerung und Aufgabe von Unternehmen, Beteiligungen und Zweigniederlassungen,
   c) Investitionen über [Betrag] EUR im Einzelfall oder [Betrag] EUR im Geschäftsjahr,
   d) Aufnahme von Krediten, Gewährung von Darlehen sowie Übernahme von Bürgschaften, Garantien und sonstigen Haftungen über [Betrag] EUR,
   e) Abschluss, Änderung und Beendigung von Verträgen mit einer Laufzeit über [z. B. 2] Jahre oder einem Jahreswert über [Betrag] EUR, insbesondere Miet-, Leasing- und Lizenzverträge,
   f) Einstellung, Beförderung und Entlassung von Mitarbeitern mit einem Jahresgehalt über [Betrag] EUR sowie Zusage von Pensionen, Tantiemen und Beteiligungen,
   g) Erteilung von Prokura und Generalvollmacht,
   h) Geschäfte mit Gesellschaftern, Geschäftsführern, deren Angehörigen oder mit ihnen verbundenen Unternehmen,
   i) Einleitung von Rechtsstreitigkeiten und Abschluss von Vergleichen mit einem Streitwert über [Betrag] EUR,
   j) Aufnahme neuer und Aufgabe bestehender Geschäftsfelder, Änderung der Preis- und Rabattpolitik von grundsätzlicher Bedeutung,
   k) Verabschiedung des Jahresbudgets (Umsatz-, Ergebnis-, Investitions- und Liquiditätsplan) bis zum [Datum] für das folgende Geschäftsjahr.
(2) Die Gesellschafterversammlung kann Schwellenwerte und Katalog durch Beschluss ändern und Zustimmungen allgemein oder für den Einzelfall vorab erteilen.
(3) Kann eine Zustimmung wegen Eilbedürftigkeit nicht rechtzeitig eingeholt werden, darf die Geschäftsführung handeln, wenn der Gesellschaft sonst ein erheblicher Schaden droht; sie informiert die Gesellschafter unverzüglich.

§ 8 Berichtspflichten gegenüber den Gesellschaftern
(1) Die Geschäftsführung berichtet der Gesellschafterversammlung
   a) monatlich bis zum [z. B. 15.] des Folgemonats über Umsatz, Ergebnis, Liquidität und Auftragslage im Vergleich zum Budget (Monatsreporting),
   b) quartalsweise über den Stand der Umsetzung der Unternehmensplanung, Personal, wesentliche Projekte und Risiken,
   c) jährlich mit Vorlage des Jahresabschlusses, des Budgets und einer Mittelfristplanung über [z. B. 3] Jahre.
(2) Unverzüglich zu berichten ist über Umstände, die die Vermögens-, Finanz- oder Ertragslage wesentlich beeinträchtigen können, insbesondere drohende Zahlungsunfähigkeit, Verlust der Hälfte des Stammkapitals (§ 49 Abs. 3 GmbHG), wesentliche Rechtsstreitigkeiten, Behördenverfahren, Datenschutzvorfälle und Kündigungen von Schlüsselkunden oder Schlüsselmitarbeitern.
(3) Die Berichte sind in Textform zu erstatten und von allen Geschäftsführern zu verantworten.

§ 9 Interessenkonflikte, Vertraulichkeit
(1) Jeder Geschäftsführer legt den übrigen Geschäftsführern und der Gesellschafterversammlung Interessenkonflikte unverzüglich offen, insbesondere Beteiligungen an oder Tätigkeiten für Geschäftspartner oder Wettbewerber sowie Geschäfte mit Angehörigen. Er wirkt an Entscheidungen, bei denen er befangen ist, nicht mit.
(2) Die Geschäftsführer bewahren über die Beratungen und Beschlüsse der Geschäftsführung und alle vertraulichen Angelegenheiten der Gesellschaft Stillschweigen, auch nach ihrem Ausscheiden.

§ 10 Inkrafttreten und Änderungen
(1) Diese Geschäftsordnung tritt am [Datum] in Kraft und ersetzt frühere Regelungen.
(2) Änderungen und Ergänzungen bedürfen eines Beschlusses der Gesellschafterversammlung in Textform. Die Geschäftsführer können Änderungen vorschlagen.
(3) Sollte eine Bestimmung unwirksam sein, bleibt die Geschäftsordnung im Übrigen wirksam. Bei Widersprüchen zum Gesellschaftsvertrag geht dieser vor.
(4) Jeder Geschäftsführer erhält eine Ausfertigung; eine weitere wird zu den Unterlagen der Gesellschafterversammlung genommen.

[Ort], den [Datum]

Für die Gesellschafterversammlung:


______________________________
[Vorname Nachname], Versammlungsleiter


Kenntnis genommen und anerkannt:


______________________________
[Vorname Nachname], Geschäftsführer


______________________________
[Vorname Nachname], Geschäftsführer


[______________________________
[Vorname Nachname], Geschäftsführer]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "austritt-gbr-vereinbarung",
    titel: "Ausscheidensvereinbarung GbR-Gesellschafter",
    kurz: "Vereinbarung über das Ausscheiden eines Gesellschafters aus einer GbR: Stichtag, Abfindung, Freistellung, Nachhaftung, Übergabe, Wettbewerb und Erledigungsklausel.",
    kategorie: "gesellschaft",
    dateiname: "Ausscheidensvereinbarung-GbR",
    wofuer: [
      "Ein Gesellschafter verlässt die GbR, die übrigen führen sie fort",
      "Einvernehmliche Trennung statt Kündigung und Streit über die Abfindung",
      "Zwei-Personen-GbR, bei der einer das Geschäft als Einzelunternehmen weiterführt",
      "Wenn der Ausscheidende von Schulden, Mietvertrag und Kreditlinien freigestellt werden soll",
    ],
    enthaelt: [
      "§ 1 Ausscheiden und Stichtag",
      "§ 2 Fortführung der Gesellschaft, Anwachsung",
      "§ 3 Abfindung",
      "§ 4 Auseinandersetzungsbilanz und schwebende Geschäfte",
      "§ 5 Freistellung und Nachhaftung",
      "§ 6 Übergabe, Zugänge, Konten, Vollmachten",
      "§ 7 Name, Domain, Kunden, Register",
      "§ 8 Wettbewerb und Vertraulichkeit",
      "§ 9 Steuern",
      "§ 10 Erledigungsklausel",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Seit dem MoPeG führt das Ausscheiden nicht mehr zur Auflösung: Die GbR besteht mit den übrigen Gesellschaftern fort, der Anteil des Ausscheidenden wächst ihnen an (§§ 712, 723 BGB). Bleibt nur ein Gesellschafter übrig, erlischt die Gesellschaft ohne Liquidation und das Vermögen geht auf ihn über (§ 712a BGB).",
      "Der Ausscheidende haftet für Verbindlichkeiten, die vor seinem Ausscheiden begründet wurden, fünf Jahre weiter (§ 728b BGB). Die Freistellung im Vertrag wirkt nur im Innenverhältnis; gegenüber Bank, Vermieter und Lieferanten hilft nur deren schriftliche Entlassung aus der Haftung.",
      "Ohne vertragliche Regelung schuldet die Gesellschaft eine angemessene Abfindung, der Ausscheidende haftet aber auch für einen Fehlbetrag (§§ 728, 728a BGB). Die Vereinbarung muss deshalb beides regeln: Abfindung und Verlustausgleich.",
      "Ist die GbR im Gesellschaftsregister eingetragen (eGbR), muss das Ausscheiden zum Register angemeldet werden, mit notariell beglaubigter Anmeldung. Auch Gewerbeamt, Finanzamt, Bank und Transparenzregister sind zu informieren.",
      "Steuerlich kann die Abfindung beim Ausscheidenden zu einem Veräußerungsgewinn führen und bei den Verbleibenden zu Anschaffungskosten. Vor Unterschrift mit dem Steuerberater klären, besonders wenn stille Reserven oder ein Firmenwert vergütet werden.",
    ],
    faqs: [
      {
        q: "Wie wird die Abfindung berechnet?",
        a: "Maßgeblich ist zuerst der Gesellschaftsvertrag. Fehlt dort eine Regelung, schuldet die Gesellschaft den Anteil am Verkehrswert. Die Vorlage lässt euch einen festen Betrag oder eine Berechnungsmethode wählen und sieht Ratenzahlung vor. Wer schnell und sauber trennen will, einigt sich auf einen Festbetrag und schließt Nachforderungen aus.",
      },
      {
        q: "Haftet der ausgeschiedene Gesellschafter weiter für Schulden?",
        a: "Ja, für alle Verbindlichkeiten, die vor dem Ausscheiden begründet wurden, bis zu fünf Jahre lang. Das gilt auch für laufende Miet- und Kreditverträge. Die Vereinbarung stellt ihn im Innenverhältnis frei, das heißt die Gesellschaft muss ihm erstatten, was Gläubiger von ihm fordern. Sicherer ist die Entlassung durch den Gläubiger selbst.",
      },
      {
        q: "Was passiert, wenn nach dem Ausscheiden nur ein Gesellschafter übrig bleibt?",
        a: "Die GbR erlischt, weil eine Gesellschaft mindestens zwei Gesellschafter braucht. Das Vermögen geht im Wege der Gesamtrechtsnachfolge auf den Verbleibenden über, der das Geschäft als Einzelunternehmer fortführt. Die Vorlage enthält dafür eine Variante mit Übergang von Verträgen, Konten und Domains.",
      },
      {
        q: "Brauchen wir für die Vereinbarung einen Notar?",
        a: "Nur, wenn Grundstücke zum Gesellschaftsvermögen gehören oder die eGbR-Anmeldung zum Gesellschaftsregister ansteht; dann ist die Unterschrift unter der Registeranmeldung zu beglaubigen, nicht die Vereinbarung selbst. Sonst reicht Schriftform. Jeder Beteiligte sollte eine unterschriebene Ausfertigung erhalten.",
      },
    ],
    seo: {
      title: "Ausscheiden aus GbR: Austrittsvereinbarung Vorlage | GründerX",
      description:
        "Kostenlose Vereinbarung zum Ausscheiden eines GbR-Gesellschafters nach MoPeG: Stichtag, Abfindung, Freistellung, Nachhaftung, Übergabe, Wettbewerb, Erledigung.",
    },
    stand: "2026-10",
    text: `Vereinbarung über das Ausscheiden eines Gesellschafters aus der [Name] GbR

zwischen

1. [Vorname Nachname], wohnhaft [Straße, PLZ Ort]
   – nachfolgend „ausscheidender Gesellschafter“ –

und

2. [Vorname Nachname], wohnhaft [Straße, PLZ Ort]
[3. [Vorname Nachname], wohnhaft [Straße, PLZ Ort]]
   – nachfolgend einzeln und gemeinsam „verbleibende Gesellschafter“ –

sowie der [Name] GbR [eGbR], [Straße, PLZ Ort] [, eingetragen im Gesellschaftsregister des Amtsgerichts [Ort] unter GsR [Nummer]], vertreten durch die verbleibenden Gesellschafter
   – nachfolgend „Gesellschaft“ –

Präambel
Die Parteien sind Gesellschafter der Gesellschaft aufgrund des Gesellschaftsvertrags vom [Datum]. Der ausscheidende Gesellschafter ist am Vermögen, Gewinn und Verlust mit [Prozent] % beteiligt. Die Parteien haben sich darauf verständigt, dass der ausscheidende Gesellschafter einvernehmlich aus der Gesellschaft ausscheidet und die verbleibenden Gesellschafter die Gesellschaft fortführen. Dies regeln sie wie folgt:

§ 1 Ausscheiden und Stichtag
(1) Der ausscheidende Gesellschafter scheidet mit Ablauf des [Datum], 24:00 Uhr („Stichtag“), einvernehmlich aus der Gesellschaft aus (§ 723 Abs. 1 Nr. 2 BGB). Einer Kündigung bedarf es nicht; eine etwa bereits erklärte Kündigung wird durch diese Vereinbarung ersetzt.
(2) Bis zum Stichtag bleibt der ausscheidende Gesellschafter mit allen Rechten und Pflichten Gesellschafter. Ab dem [Datum] ist er von der Geschäftsführung und Vertretung unter Fortzahlung seiner bisherigen Entnahmen von monatlich [Betrag] EUR freigestellt.

§ 2 Fortführung der Gesellschaft, Anwachsung
(1) Die Gesellschaft wird von den verbleibenden Gesellschaftern unter dem bisherigen Namen fortgeführt. Der Anteil des ausscheidenden Gesellschafters am Gesellschaftsvermögen wächst den verbleibenden Gesellschaftern im Verhältnis ihrer bisherigen Beteiligung an (§ 712 Abs. 1 BGB). Die Beteiligungsverhältnisse lauten ab dem Stichtag: [Vorname Nachname] [Prozent] %, [Vorname Nachname] [Prozent] %.
[Alternative bei Zwei-Personen-GbR: (1) Mit dem Ausscheiden erlischt die Gesellschaft ohne Liquidation. Das Gesellschaftsvermögen einschließlich aller Verträge, Forderungen, Verbindlichkeiten, Konten, Domains und Kennzeichen geht im Wege der Gesamtrechtsnachfolge auf den verbleibenden Gesellschafter über, der das Unternehmen als Einzelunternehmen unter dem Namen „[Name]“ fortführt (§ 712a BGB).]
(2) [Bei eGbR: Die Parteien melden das Ausscheiden unverzüglich zum Gesellschaftsregister an und wirken an der notariellen Beglaubigung mit. Die Kosten trägt die Gesellschaft.]

§ 3 Abfindung
(1) Der ausscheidende Gesellschafter erhält für sein Ausscheiden eine Abfindung in Höhe von [Betrag] EUR.
[Alternative: (1) Die Abfindung bemisst sich nach dem Wert seines Anteils zum Stichtag, der nach [Methode, z. B. „dem vereinfachten Ertragswertverfahren nach §§ 199 ff. BewG“ / „dem Buchwert laut Auseinandersetzungsbilanz zuzüglich stiller Reserven im Anlagevermögen“] zu ermitteln ist. Die Parteien beauftragen hierzu [Steuerberater / Wirtschaftsprüfer] als Schiedsgutachter; die Kosten tragen Gesellschaft und ausscheidender Gesellschafter je zur Hälfte.]
(2) Mit der Abfindung sind sämtliche Ansprüche des ausscheidenden Gesellschafters aus dem Gesellschaftsverhältnis abgegolten, insbesondere Ansprüche auf Auseinandersetzungsguthaben, Gewinnanteile für zurückliegende Geschäftsjahre, Tätigkeitsvergütungen, Auslagenersatz und Rückzahlung von Einlagen. Das Guthaben auf seinem Privatkonto in Höhe von [Betrag] EUR zum [Datum] ist in der Abfindung [enthalten / nicht enthalten und wird gesondert bis zum [Datum] ausgezahlt].
(3) Die Abfindung ist wie folgt zu zahlen: [Betrag] EUR bis zum [Datum] und der Rest in [Anzahl] gleichen Raten von je [Betrag] EUR jeweils zum [Datum]. Der offene Betrag wird mit [z. B. 3] % pro Jahr verzinst. Gerät die Gesellschaft mit einer Rate länger als [z. B. 14] Tage in Verzug, wird der gesamte Restbetrag sofort fällig.
(4) Die verbleibenden Gesellschafter haften für die Abfindung neben der Gesellschaft als Gesamtschuldner.
(5) Am Gewinn oder Verlust des laufenden Geschäftsjahres bis zum Stichtag nimmt der ausscheidende Gesellschafter [nicht mehr teil; dies ist in der Abfindung berücksichtigt / zeitanteilig teil; der Anteil wird mit Feststellung des Jahresabschlusses abgerechnet].

§ 4 Auseinandersetzungsbilanz und schwebende Geschäfte
(1) Die Gesellschaft erstellt auf den Stichtag eine Auseinandersetzungsbilanz [, die der Abfindung nach § 3 Abs. 1 Alternative zugrunde liegt / zu Dokumentationszwecken]. Der ausscheidende Gesellschafter erhält eine Abschrift und kann sie innerhalb von [z. B. 4] Wochen prüfen.
(2) An schwebenden Geschäften, die am Stichtag noch nicht abgewickelt sind, nimmt der ausscheidende Gesellschafter nicht mehr teil (abweichend von § 728 Abs. 2 BGB). [Alternative: Er nimmt am Ergebnis der in Anlage 1 aufgeführten schwebenden Geschäfte mit [Prozent] % teil; die Abrechnung erfolgt nach deren Abschluss.]
(3) Ergibt die Auseinandersetzungsbilanz einen Fehlbetrag, ist der ausscheidende Gesellschafter [zum Ausgleich im Verhältnis seiner Beteiligung verpflichtet (§ 728a BGB) / von der Ausgleichspflicht freigestellt; der Fehlbetrag ist in der Abfindung berücksichtigt].

§ 5 Freistellung und Nachhaftung
(1) Die Gesellschaft und die verbleibenden Gesellschafter stellen den ausscheidenden Gesellschafter als Gesamtschuldner von allen Verbindlichkeiten der Gesellschaft frei, die bis zum Stichtag begründet wurden oder danach begründet werden, einschließlich Steuern, Sozialabgaben, Miet-, Leasing-, Kredit- und Lieferverbindlichkeiten. Die wesentlichen Verbindlichkeiten zum Stichtag sind in Anlage 2 aufgeführt.
(2) Die Parteien sind sich bewusst, dass der ausscheidende Gesellschafter gegenüber Dritten für bis zum Stichtag begründete Verbindlichkeiten nach § 728b BGB fünf Jahre weiterhaftet. Die verbleibenden Gesellschafter verpflichten sich, bei folgenden Gläubigern binnen [z. B. 3] Monaten die schriftliche Entlassung des ausscheidenden Gesellschafters aus der Haftung zu erwirken: [Bank (Kontokorrent/Darlehen), Vermieter (Mietvertrag [Objekt]), Leasinggeber, Lieferant]. Gelingt dies nicht, informieren sie den ausscheidenden Gesellschafter und stellen auf Verlangen Sicherheit in Höhe von [Betrag] EUR.
(3) Wird der ausscheidende Gesellschafter von einem Gläubiger in Anspruch genommen, informiert er die Gesellschaft unverzüglich; die Gesellschaft übernimmt die Abwehr und erstattet Zahlungen innerhalb von zwei Wochen.
(4) Für Verbindlichkeiten, die der ausscheidende Gesellschafter pflichtwidrig oder ohne Vertretungsmacht begründet hat, gilt die Freistellung nicht.

§ 6 Übergabe, Zugänge, Konten, Vollmachten
(1) Der ausscheidende Gesellschafter übergibt bis zum Stichtag alle Unterlagen, Geräte, Schlüssel, Daten und Gegenstände der Gesellschaft und übergibt alle Zugangsdaten (Online-Banking, E-Mail, Shop-Systeme, Software, Social-Media-Konten, Cloud-Dienste) laut Übergabeprotokoll (Anlage 3). Eigene Kopien von Geschäftsdaten löscht er, soweit er sie nicht zur Erfüllung steuerlicher Pflichten benötigt.
(2) Alle dem ausscheidenden Gesellschafter erteilten Vollmachten und Kontovollmachten erlöschen zum Stichtag. Die Parteien wirken an der Änderung der Verfügungsberechtigung beim Geschäftskonto [Bank, IBAN] und bei Zahlungsdienstleistern unverzüglich mit.
(3) Die Gesellschaft gewährt dem ausscheidenden Gesellschafter bis zum [Datum, z. B. Ablauf der steuerlichen Aufbewahrungsfristen] auf Verlangen Einsicht in die Unterlagen, die seine Beteiligungszeit betreffen.
(4) Die Gesellschaft erteilt dem ausscheidenden Gesellschafter auf Wunsch eine Bescheinigung über die Dauer und den Inhalt seiner Tätigkeit.

§ 7 Name, Domain, Kunden, Register
(1) Der Gesellschaftsname „[Name]“, die Domain [domain.de], die Marke [Marke] und die Social-Media-Konten verbleiben bei der Gesellschaft. Soweit Domains oder Konten auf den Namen des ausscheidenden Gesellschafters registriert sind, überträgt er sie bis zum Stichtag auf die Gesellschaft oder einen verbleibenden Gesellschafter.
(2) Enthält der Gesellschaftsname den Namen des ausscheidenden Gesellschafters, [willigt er in die Fortführung ein / ist der Name innerhalb von [z. B. 6] Monaten zu ändern].
(3) Die Kundenbeziehungen und Verträge bleiben bei der Gesellschaft. Die verbleibenden Gesellschafter informieren Kunden und Lieferanten in Abstimmung mit dem ausscheidenden Gesellschafter über das Ausscheiden.
(4) Die Gesellschaft meldet das Ausscheiden beim Gewerbeamt, Finanzamt [, Gesellschaftsregister] und Transparenzregister sowie bei der Berufsgenossenschaft an. Der ausscheidende Gesellschafter meldet sein Gewerbe als Gesellschafter ab.

§ 8 Wettbewerb und Vertraulichkeit
(1) Der ausscheidende Gesellschafter verpflichtet sich, für die Dauer von [z. B. 12] Monaten nach dem Stichtag im Gebiet [Ort / Umkreis / Deutschland] keine Kunden der Gesellschaft, die in Anlage 4 aufgeführt sind, im Geschäftsbereich [Bereich] abzuwerben oder zu bedienen und keine Mitarbeiter der Gesellschaft abzuwerben. [Alternative: Der ausscheidende Gesellschafter unterliegt keinem nachvertraglichen Wettbewerbsverbot.]
(2) Für jeden Fall der Zuwiderhandlung ist eine Vertragsstrafe von [Betrag] EUR verwirkt; weitergehender Schadensersatz bleibt vorbehalten.
(3) Beide Seiten behandeln Geschäftsgeheimnisse und den Inhalt dieser Vereinbarung vertraulich und äußern sich über den jeweils anderen nicht herabsetzend.

§ 9 Steuern
(1) Jede Partei trägt die auf sie entfallenden Steuern aus diesem Vorgang selbst. Die Gesellschaft erstellt die Feststellungserklärung für das Jahr des Ausscheidens und stellt dem ausscheidenden Gesellschafter die für seine Steuererklärung erforderlichen Angaben zur Verfügung.
(2) Die Parteien haben die steuerlichen Folgen (insbesondere Veräußerungsgewinn des ausscheidenden Gesellschafters und Anschaffungskosten der verbleibenden Gesellschafter) [mit dem Steuerberater [Name] geprüft / nicht geprüft und übernehmen hierfür keine Gewähr].

§ 10 Erledigungsklausel
(1) Mit Erfüllung dieser Vereinbarung sind sämtliche gegenseitigen Ansprüche der Parteien aus dem Gesellschaftsverhältnis und seiner Beendigung, gleich aus welchem Rechtsgrund, ob bekannt oder unbekannt, erledigt.
(2) Ausgenommen sind Ansprüche aus dieser Vereinbarung, Ansprüche wegen vorsätzlicher Pflichtverletzung sowie Ansprüche aus der Freistellung nach § 5.

§ 11 Schlussbestimmungen
(1) Der Gesellschaftsvertrag vom [Datum] gilt zwischen den verbleibenden Gesellschaftern fort, soweit er durch diese Vereinbarung nicht geändert wird. [Bei Zwei-Personen-GbR: Der Gesellschaftsvertrag endet mit dem Stichtag.]
(2) Änderungen und Ergänzungen bedürfen der Schriftform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, [Ort]. Es gilt das Recht der Bundesrepublik Deutschland.
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

Anlagen: 1 Schwebende Geschäfte, 2 Verbindlichkeiten zum Stichtag, 3 Übergabeprotokoll, 4 Kundenliste (Wettbewerb)

[Ort], den [Datum]


______________________________
[Vorname Nachname], ausscheidender Gesellschafter


______________________________
[Vorname Nachname], verbleibender Gesellschafter


[______________________________
[Vorname Nachname], verbleibender Gesellschafter]

${VORLAGEN_HINWEIS}`,
  },
];
