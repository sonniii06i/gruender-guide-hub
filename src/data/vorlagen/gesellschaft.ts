import { type Vorlage } from "./types";

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
      "Seit dem MoPeG (01.01.2024) gilt: Ohne Regelung verteilt sich der Gewinn nach den vereinbarten Beteiligungsverhältnissen, hilfsweise nach dem Wert der Beiträge; erst wenn beides fehlt, nach Köpfen (§ 709 Abs. 3 BGB). Die Vorlage regelt das ausdrücklich.",
      "Alle Gesellschafter haften persönlich und unbeschränkt – auch für Fehler des anderen. Wer das nicht will, braucht eine UG oder GmbH.",
      "Eine Eintragung ins Gesellschaftsregister (eGbR) ist freiwillig, aber Voraussetzung, wenn die GbR Grundstücke erwerben oder in eine GmbH-Gesellschafterliste eingetragen werden soll.",
      "Gewerbliche GbRs melden jeden Gesellschafter beim Gewerbeamt an; die GbR selbst bekommt eine Steuernummer und gibt eine Feststellungserklärung ab.",
    ],
    faqs: [
      {
        q: "Brauche ich für eine GbR überhaupt einen schriftlichen Vertrag?",
        a: "Nein, eine GbR entsteht auch mündlich. Ohne Vertrag gelten aber die gesetzlichen Regeln, die oft nicht passen: keine Regelung zu Arbeitszeit, Entnahmen, Wettbewerb oder Ausscheiden. Der schriftliche Vertrag verhindert den Streit, bevor er entsteht.",
      },
      {
        q: "Was ist der Unterschied zwischen GbR und eGbR?",
        a: "Die eGbR ist dieselbe Gesellschaft, nur im Gesellschaftsregister eingetragen. Vorteil: Sie kann Grundstücke erwerben und GmbH-Anteile halten und wirkt nach außen verlässlicher. Nachteil: Notar- und Registerkosten und Transparenzregister-Pflicht.",
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
      title: "GbR-Vertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "GbR-Gesellschaftsvertrag als kostenlose Vorlage nach neuem Recht (MoPeG): Gewinnverteilung, Geschäftsführung, Kündigung, Abfindung. Als Word, PDF und Text.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/gbr-gesellschaftsvertrag"),
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
      title: "UG-Gesellschaftsvertrag Vorlage kostenlos | GründerX",
      description:
        "UG-Gesellschaftsvertrag als kostenlose Vorlage: Stammkapital, Thesaurierung nach § 5a GmbHG, Vinkulierung, Einziehung, Abfindung. Entwurf für den Notar.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/ug-gesellschaftsvertrag"),
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
      title: "GmbH-Gesellschaftsvertrag Muster kostenlos | GründerX",
      description:
        "GmbH-Satzung als kostenlose Vorlage: Stammkapital 25.000 EUR, Gesellschafterversammlung, Vinkulierung, Einziehung, Abfindung. Entwurf für den Notartermin.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/gmbh-gesellschaftsvertrag"),
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
      title: "Gründervereinbarung Vorlage kostenlos (Word) | GründerX",
      description:
        "Kostenlose Gründervereinbarung für Start-up-Teams vor der Gründung: Rollen, Anteile, Vesting, IP-Übertragung, Kosten und Ausstieg. Als Word, PDF oder Text.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/gruendervereinbarung"),
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
      title: "Vesting-Vereinbarung Vorlage kostenlos (Word) | GründerX",
      description:
        "Vesting-Vereinbarung für Gründeranteile als kostenlose Vorlage: 12 Monate Cliff, 48 Monate linear, Good/Bad Leaver, Call-Option, Abfindung, Exit-Beschleunigung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/vesting-vereinbarung"),
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
      "Ein Umlaufbeschluss ist nur wirksam, wenn alle Gesellschafter mit der Stimmabgabe in Textform einverstanden sind oder dem Beschluss selbst in Textform zustimmen (§ 48 Abs. 2 GmbHG). Fehlt eine Unterschrift und widerspricht der Gesellschafter, ist der Beschluss anfechtbar.",
      "Der Jahresabschluss muss innerhalb von acht Monaten nach Ende des Geschäftsjahres festgestellt werden, bei kleinen Gesellschaften innerhalb von elf Monaten (§ 42a Abs. 2 GmbHG). Die Offenlegung beim Unternehmensregister läuft unabhängig davon spätestens zwölf Monate nach Bilanzstichtag.",
      "Eine UG darf nur ausschütten, was nach Einstellung von 25 % des Jahresüberschusses in die gesetzliche Rücklage bleibt (§ 5a Abs. 3 GmbHG). Der Ausschüttungsbeschluss muss das ausweisen.",
      "Die Bestellung eines Geschäftsführers muss vom neuen Geschäftsführer zum Handelsregister angemeldet werden; dafür braucht er eine notariell beglaubigte Anmeldung und muss versichern, dass keine Bestellungshindernisse nach § 6 Abs. 2 Satz 2 Nr. 2 und 3 sowie Satz 3 GmbHG vorliegen (§ 39 Abs. 3 GmbHG).",
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
      title: "Gesellschafterbeschluss Vorlage kostenlos (Word) | GründerX",
      description:
        "Kostenlose Vorlage für den schriftlichen Gesellschafterbeschluss einer GmbH oder UG: Jahresabschluss, Ergebnisverwendung, Entlastung, Geschäftsführerbestellung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/gesellschafterbeschluss"),
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
        a: "Ja, seit dem 1. August 2022 ausdrücklich: Versammlungen können per Video- oder Telefonkonferenz abgehalten werden, wenn alle Gesellschafter in Textform einverstanden sind oder die Satzung das erlaubt (§ 48 Abs. 1 Satz 2 GmbHG). Die Vorlage fragt die Zustimmung in der Einladung ab.",
      },
    ],
    seo: {
      title: "Einladung Gesellschafterversammlung Vorlage | GründerX",
      description:
        "Vorlage für die Einladung zur Gesellschafterversammlung (GmbH, UG): Tagesordnung, Frist, Form, Vertretung, Videoteilnahme und Hinweise nach § 51 GmbHG.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/einladung-gesellschafterversammlung"),
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
      title: "Protokoll Gesellschafterversammlung Vorlage | GründerX",
      description:
        "Vorlage für das Protokoll einer Gesellschafterversammlung (GmbH, UG): Anwesende, Beschlussfähigkeit, Beschlüsse mit Abstimmungsergebnis, Unterschriften.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/protokoll-gesellschafterversammlung"),
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
      title: "Geschäftsführervertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Kostenloser Geschäftsführer-Anstellungsvertrag für GmbH und UG: Vergütung, Tantieme, Dienstwagen, Urlaub, Wettbewerbsverbot, D&O, Kündigung und Fremdvergleich.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/geschaeftsfuehrer-anstellungsvertrag"),
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
      "Der Zins muss fremdüblich sein: Ein zu hoher Zins ist im übersteigenden Teil verdeckte Gewinnausschüttung. Ein zinsloses oder zu billiges Darlehen ist zwar keine verdeckte Einlage, weil Nutzungsvorteile nicht einlagefähig sind, sollte aber ebenso begründet sein. Orientiere dich an dem, was die Gesellschaft bei einer Bank zahlen würde, und dokumentiere die Herleitung.",
      "Ein qualifizierter Rangrücktritt verhindert, dass das Darlehen in der Überschuldungsprüfung als Verbindlichkeit zählt (§ 19 Abs. 2 Satz 2 InsO). Das kann die Insolvenzantragspflicht abwenden, macht aber die Rückzahlung nur außerhalb der Krise möglich. Nicht leichtfertig unterschreiben.",
      "Die Zinsen sind beim Gesellschafter mit mindestens 10 % Beteiligung keine Kapitalerträge mit Abgeltungsteuer, sondern unterliegen dem persönlichen Steuersatz (§ 32d Abs. 2 Nr. 1 Buchst. b EStG). Kapitalertragsteuer behält die Gesellschaft auf solche unverbrieften Darlehenszinsen nicht ein (§ 43 Abs. 1 Satz 1 Nr. 7 EStG); der Gesellschafter erklärt die Zinsen selbst.",
      "Ein Darlehen bleibt Fremdkapital: Das frühere Eigenkapitalersatzrecht ist seit 2008 abgeschafft, an seine Stelle tritt der Nachrang in der Insolvenz. Bei einer UG ist das Darlehen kein Ersatz für die Kapitalerhöhung auf 25.000 EUR.",
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
      title: "Gesellschafterdarlehen Vertrag Vorlage kostenlos | GründerX",
      description:
        "Vertrag für ein Gesellschafterdarlehen an GmbH oder UG: Betrag, fremdüblicher Zins, Laufzeit, Kündigung, Rangrücktritt als Option, Hinweise zu § 39 InsO.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/gesellschafterdarlehen"),
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
      "Zinsen, die in Anteile gewandelt werden, sind beim Investor trotzdem Kapitalertrag. Ein Kapitalertragsteuerabzug ist beim unverbrieften Wandeldarlehen nach dem Gesetzeswortlaut in der Regel nicht vorgesehen (§ 43 Abs. 1 Satz 1 Nr. 2 EStG erfasst Wandelanleihen als Teilschuldverschreibungen); dann versteuert der Investor die Zinsen selbst. Mit dem Steuerberater klären. Die Vorlage sieht deshalb wahlweise Barzahlung der Zinsen vor.",
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
      title: "Wandeldarlehen Vorlage kostenlos (Convertible) | GründerX",
      description:
        "Wandeldarlehensvertrag für Business Angels: Betrag, Zins, Wandlung bei qualifizierter Finanzierungsrunde, Discount, Cap, Fälligkeit und Rangrücktritt.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/wandeldarlehen"),
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
      title: "Stille Beteiligung Vertrag Vorlage kostenlos | GründerX",
      description:
        "Kostenloser Vertrag über eine typische stille Gesellschaft: Einlage, Gewinn- und Verlustbeteiligung, Kontrollrechte, Kündigung und Auseinandersetzung nach HGB.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/stille-beteiligung"),
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
      "Eine Ressortaufteilung entlastet nur, wenn sie klar und eindeutig ist, von allen Geschäftsführern mitgetragen wird und die Beteiligten fachlich geeignet sind (BGH, Urteil vom 6.11.2018, II ZR 11/17). Schriftform verlangt der BGH nicht zwingend, aber ohne schriftliche Fassung ist die Aufteilung im Haftungsfall kaum zu beweisen.",
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
      title: "Geschäftsordnung Geschäftsführung Vorlage GmbH | GründerX",
      description:
        "Geschäftsordnung für mehrere GmbH- oder UG-Geschäftsführer: Ressortverteilung, Gesamtverantwortung, zustimmungspflichtige Geschäfte, Berichte, Sitzungen.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/geschaeftsordnung-geschaeftsfuehrung"),
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
      title: "Austritt aus GbR: Vereinbarung Vorlage kostenlos | GründerX",
      description:
        "Kostenlose Vereinbarung zum Ausscheiden eines GbR-Gesellschafters nach MoPeG: Stichtag, Abfindung, Freistellung, Nachhaftung, Übergabe, Wettbewerb, Erledigung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/austritt-gbr-vereinbarung"),
  },
];
