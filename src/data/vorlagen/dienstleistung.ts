import { type Vorlage } from "./types";

// Dienstleistung & Projekte: Freelancer, Beratung, Agentur, Werkvertrag,
// Handelsvertreter, Kooperation, Subunternehmer, Virtuelle Assistenz.
// Rechtsstand: BGB (§§ 611 ff., 631 ff.), HGB (§§ 84 ff.), SGB IV (§ 7a),
// UWG/MStV (Werbekennzeichnung), DSGVO (Art. 28). Stand 2026-10.

export const VORLAGEN_DIENSTLEISTUNG: Vorlage[] = [
  {
    slug: "dienstleistungsvertrag",
    titel: "Dienstleistungsvertrag (B2B)",
    kurz: "Allgemeiner Dienstvertrag nach § 611 BGB zwischen Unternehmen: Leistung, Stundensatz oder Pauschale, Abrechnung, Haftung, Kündigung.",
    kategorie: "dienstleistung",
    dateiname: "Dienstleistungsvertrag-B2B",
    wofuer: [
      "Du erbringst laufende Leistungen für einen Firmenkunden, ohne einen bestimmten Erfolg zu schulden (Support, Pflege, Betreuung, Buchhaltungsvorbereitung)",
      "Du beauftragst selbst einen Dienstleister und willst Vergütung, Abrechnung und Kündigung sauber festhalten",
      "Abrechnung nach Stunden oder als monatliche Pauschale, mit Nachweis über Stundenzettel",
      "Als Grundlage, wenn später Einzelaufträge oder ein Rahmenvertrag folgen sollen",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand und Leistungsbeschreibung",
      "§ 2 Keine Erfolgsschuld, Weisungsfreiheit",
      "§ 3 Leistungsort, Leistungszeit, Ansprechpartner",
      "§ 4 Mitwirkungspflichten des Auftraggebers",
      "§ 5 Vergütung (Stundensatz oder Pauschale) und Nebenkosten",
      "§ 6 Abrechnung, Zahlung, Verzug",
      "§ 7 Haftung",
      "§ 8 Geheimhaltung und Datenschutz",
      "§ 9 Laufzeit und Kündigung",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Der Dienstvertrag schuldet Tätigkeit, kein Ergebnis. Wenn dein Kunde ein fertiges Werk erwartet (Website, Gutachten, Software), passt der Werkvertrag mit Abnahme und Gewährleistung besser.",
      "Bei B2B-Verträgen gilt der gesetzliche Verzugszins von 9 Prozentpunkten über dem Basiszinssatz und eine Pauschale von 40 EUR (§ 288 BGB). Die Vorlage nutzt das, verzichte nicht leichtfertig darauf.",
      "Eine Haftungsbegrenzung darf nie Vorsatz, grobe Fahrlässigkeit oder Schäden an Leben, Körper und Gesundheit ausschließen (§ 309 Nr. 7 BGB) – sonst ist die ganze Klausel unwirksam.",
      "Wenn eine einzelne Person dauerhaft, allein und weisungsgebunden für dich arbeitet, droht Scheinselbstständigkeit. Dann hilft kein Vertragstext, sondern nur eine andere Arbeitsweise oder ein Arbeitsvertrag.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Dienstvertrag und Werkvertrag?",
        a: "Beim Dienstvertrag (§ 611 BGB) schuldest du das Bemühen, also die Tätigkeit selbst. Beim Werkvertrag (§ 631 BGB) schuldest du ein Ergebnis, das der Kunde abnimmt und bei Mängeln nachbessern lassen kann. Stundenabrechnung ohne Abnahme spricht für einen Dienstvertrag.",
      },
      {
        q: "Kann ich einen Dienstleistungsvertrag jederzeit kündigen?",
        a: "Nur, wenn ihr das vereinbart habt oder das Gesetz es zulässt. Die Vorlage sieht eine ordentliche Kündigungsfrist vor und lässt die außerordentliche Kündigung aus wichtigem Grund unberührt. Ohne Regelung gelten die Fristen des § 621 BGB, die sich nach dem Abrechnungszeitraum richten.",
      },
      {
        q: "Muss ich Stundenzettel führen?",
        a: "Bei Abrechnung nach Aufwand ja, sonst kannst du im Streit die Stunden nicht beweisen. Die Vorlage verlangt einen Tätigkeitsnachweis mit Datum, Dauer und Tätigkeit, den der Kunde innerhalb einer Frist beanstanden kann. Danach gilt er als anerkannt.",
      },
      {
        q: "Brauche ich für B2B-Verträge AGB oder reicht dieser Vertrag?",
        a: "Dieser Vertrag reicht für den Einzelfall. Wenn du dieselben Bedingungen vielen Kunden stellst, sind sie rechtlich AGB und unterliegen der Inhaltskontrolle nach §§ 305 ff. BGB, auch zwischen Unternehmen. Besonders Haftungs- und Zahlungsklauseln müssen dann angemessen bleiben.",
      },
    ],
    seo: {
      title: "Dienstleistungsvertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Dienstleistungsvertrag nach § 611 BGB als kostenlose Vorlage: Leistungsbeschreibung, Stundensatz oder Pauschale, Abrechnung, Haftung, Kündigung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/dienstleistungsvertrag"),
  },
  {
    slug: "werkvertrag",
    titel: "Werkvertrag",
    kurz: "Werkvertrag nach § 631 BGB für ein konkretes Ergebnis: Leistungsbeschreibung, Abnahme, Vergütung, Nacherfüllung, Fristen, Änderungen, Nutzungsrechte.",
    kategorie: "dienstleistung",
    dateiname: "Werkvertrag",
    wofuer: [
      "Du lieferst ein fertiges Ergebnis: Website, Software-Modul, Logo, Video, Gutachten, Übersetzung oder handwerkliches Werk",
      "Du beauftragst einen Dienstleister mit einem festen Ergebnis und willst Abnahme und Gewährleistung klar geregelt haben",
      "Festpreis oder Aufwandsschätzung mit Obergrenze, Zahlung in Raten nach Meilensteinen",
      "Wenn Nutzungsrechte am Ergebnis (Urheberrecht) auf den Kunden übergehen sollen",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand (das Werk)",
      "§ 2 Leistungsbeschreibung und Ausführung",
      "§ 3 Termine und Fristen",
      "§ 4 Mitwirkung des Bestellers",
      "§ 5 Änderungswünsche (Change Requests)",
      "§ 6 Abnahme",
      "§ 7 Vergütung und Zahlung",
      "§ 8 Mängelrechte und Nacherfüllung",
      "§ 9 Nutzungsrechte",
      "§ 10 Haftung",
      "§ 11 Kündigung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Ohne Abnahme keine Fälligkeit und keine Verjährung: Die Abnahme ist der wichtigste Zeitpunkt im Werkvertrag. Die Vorlage regelt Frist, Protokoll und die fiktive Abnahme nach § 640 Abs. 2 BGB.",
      "Der Besteller darf einen Werkvertrag jederzeit frei kündigen (§ 648 BGB), muss dann aber die vereinbarte Vergütung abzüglich ersparter Aufwendungen zahlen. Als Unternehmer solltest du das wissen, als Kunde auch.",
      "Nutzungsrechte an urheberrechtlich geschützten Werken gehen nicht automatisch über. Was nicht ausdrücklich eingeräumt ist, bleibt beim Urheber (§ 31 UrhG, Zweckübertragungslehre). Die Vorlage räumt die Rechte ausdrücklich ein.",
      "Bei Bauleistungen gelten zusätzlich die §§ 650a ff. BGB und ggf. die VOB/B, bei Verbrauchern als Besteller das Verbraucherbauvertragsrecht. Diese Vorlage ist für Werke zwischen Unternehmen gedacht.",
    ],
    faqs: [
      {
        q: "Wann liegt ein Werkvertrag vor und wann ein Dienstvertrag?",
        a: "Entscheidend ist, ob ein Erfolg geschuldet wird. Eine fertige Website, ein Logo oder ein Gutachten sind Werke; eine laufende Beratung oder Betreuung nach Stunden ist ein Dienst. Beim Werkvertrag haftest du für Mängel am Ergebnis, beim Dienstvertrag nur für sorgfältige Arbeit.",
      },
      {
        q: "Was passiert, wenn der Kunde die Abnahme verweigert?",
        a: "Der Besteller darf die Abnahme nur bei wesentlichen Mängeln verweigern. Setzt du ihm nach Fertigstellung eine angemessene Frist zur Abnahme und nennt er innerhalb dieser Frist keinen konkreten Mangel, gilt das Werk nach § 640 Abs. 2 BGB als abgenommen. Die Vorlage legt diese Frist fest.",
      },
      {
        q: "Wie lange hafte ich für Mängel?",
        a: "Die gesetzliche Verjährung beträgt bei Werken zwei Jahre ab Abnahme, bei Bauwerken fünf Jahre (§ 634a BGB). Zwischen Unternehmen kann die Frist vertraglich auf ein Jahr verkürzt werden, nicht aber für Vorsatz, Arglist und Personenschäden.",
      },
      {
        q: "Darf ich bei Änderungswünschen mehr Geld verlangen?",
        a: "Ja, wenn der Änderungswunsch über die vereinbarte Leistungsbeschreibung hinausgeht. Die Vorlage sieht ein Change-Request-Verfahren vor: Du schätzt Mehraufwand und Terminverschiebung, der Kunde gibt in Textform frei. Ohne Freigabe bleibt es beim alten Umfang.",
      },
    ],
    seo: {
      title: "Werkvertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Werkvertrag nach § 631 BGB als kostenlose Vorlage: Leistungsbeschreibung, Abnahme, Festpreis, Nacherfüllung, Change Requests, Nutzungsrechte. Word, PDF, Text.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/werkvertrag"),
  },
  {
    slug: "freelancer-vertrag-it",
    titel: "Freelancer-Vertrag IT / Software",
    kurz: "Vertrag für freie Mitarbeiter in IT und Softwareentwicklung: Projekt, Tagessatz, Remote, Rechte am Code, Weisungsfreiheit gegen Scheinselbstständigkeit.",
    kategorie: "dienstleistung",
    dateiname: "Freelancer-Vertrag-IT-Software",
    wofuer: [
      "Du holst dir als Startup einen Entwickler, DevOps- oder Data-Freelancer für ein Projekt oder eine Sprint-Reihe",
      "Du arbeitest selbst als IT-Freelancer und brauchst einen Vertrag, der Tagessatz, Rechte am Code und Haftung sauber regelt",
      "Remote-Zusammenarbeit mit eigenen Geräten und freier Zeiteinteilung",
      "Wenn die Zusammenarbeit länger dauert und das Risiko der Scheinselbstständigkeit von Anfang an bedacht werden soll",
    ],
    enthaelt: [
      "§ 1 Projekt und Leistungsgegenstand",
      "§ 2 Status des Freelancers, Weisungsfreiheit",
      "§ 3 Durchführung, Remote-Arbeit, Arbeitsmittel",
      "§ 4 Vergütung (Tagessatz), Abrechnung",
      "§ 5 Rechte am Code und an Arbeitsergebnissen",
      "§ 6 Geheimhaltung, Datenschutz, IT-Sicherheit",
      "§ 7 Haftung, Versicherung",
      "§ 8 Laufzeit, Kündigung, Übergabe",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Scheinselbstständigkeit wird nicht am Vertragstext, sondern an der gelebten Praxis gemessen: feste Arbeitszeiten, Einbindung in Teams wie ein Angestellter, Firmenlaptop, Urlaubsabstimmung, nur ein Auftraggeber. Nachzahlungen von Sozialbeiträgen treffen vor allem den Auftraggeber, rückwirkend bis zu vier Jahre.",
      "Mit dem Statusfeststellungsverfahren nach § 7a SGB IV bei der Deutschen Rentenversicherung bekommt ihr vor Beginn eine verbindliche Entscheidung. Seit 2022 ist auch eine Prognoseentscheidung auf Basis des Vertrags möglich.",
      "Code ist urheberrechtlich geschützt und die Rechte bleiben beim Freelancer, solange sie nicht ausdrücklich eingeräumt werden. § 69b UrhG (Rechte des Arbeitgebers) gilt nur für Angestellte, nicht für Freelancer. Die Vorlage räumt die Rechte ausdrücklich ein.",
      "Freelancer mit nur einem Auftraggeber und ohne eigene Angestellte können als arbeitnehmerähnliche Selbstständige rentenversicherungspflichtig sein (§ 2 Satz 1 Nr. 9 SGB VI) – ein Thema für den Freelancer selbst, nicht für den Auftraggeber.",
    ],
    faqs: [
      {
        q: "Wann ist ein IT-Freelancer scheinselbstständig?",
        a: "Wenn er in Wahrheit wie ein Arbeitnehmer arbeitet: weisungsgebunden bei Zeit, Ort und Art der Arbeit, in die Betriebsorganisation eingegliedert, ohne unternehmerisches Risiko. Indizien sind feste Anwesenheit, Firmen-E-Mail und Firmenlaptop, Teilnahme an allen internen Meetings wie ein Mitarbeiter und ein einziger Auftraggeber über Jahre. Jedes Indiz allein ist unschädlich, die Gesamtschau zählt.",
      },
      {
        q: "Wem gehört der Code, den der Freelancer schreibt?",
        a: "Urheber ist immer der Freelancer, das Urheberrecht ist nicht übertragbar. Der Auftraggeber bekommt nur die Nutzungsrechte, die der Vertrag ihm ausdrücklich einräumt. Die Vorlage überträgt ausschließliche, unbeschränkte Nutzungsrechte mit Zahlung der Vergütung und regelt vorbestehende Tools und Open-Source-Komponenten getrennt.",
      },
      {
        q: "Tagessatz oder Stundensatz?",
        a: "In der IT ist der Tagessatz üblich, meist für einen Tag von acht Stunden mit anteiliger Abrechnung halber Tage. Die Vorlage sieht einen Tagessatz vor und regelt, wie Teilzeiten und Mehrstunden abgerechnet werden. Wichtig ist der Tätigkeitsnachweis, den der Auftraggeber innerhalb einer Frist beanstanden kann.",
      },
      {
        q: "Was kostet das Statusfeststellungsverfahren und wie lange dauert es?",
        a: "Das Verfahren bei der Deutschen Rentenversicherung Bund ist kostenfrei. Es dauert erfahrungsgemäß einige Wochen bis mehrere Monate. Wer den Antrag innerhalb eines Monats nach Beginn der Tätigkeit stellt, kann unter bestimmten Voraussetzungen verhindern, dass die Versicherungspflicht rückwirkend ab Beginn eintritt.",
      },
    ],
    seo: {
      title: "Freelancer-Vertrag IT Vorlage kostenlos (Word) | GründerX",
      description:
        "Freelancer-Vertrag für IT und Software als kostenlose Vorlage: Tagessatz, Remote, Rechte am Code, Weisungsfreiheit, Statusfeststellung nach § 7a SGB IV.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/freelancer-vertrag-it"),
  },
  {
    slug: "beratervertrag",
    titel: "Beratervertrag (Beratung & Coaching)",
    kurz: "Beratungsvertrag für Unternehmensberatung, Coaching und Fachberatung: Leistungsumfang, Honorar, Termine, Absagefristen, Haftungsbegrenzung, Abgrenzung zur Rechts- und Steuerberatung.",
    kategorie: "dienstleistung",
    dateiname: "Beratervertrag-Coaching",
    wofuer: [
      "Du bietest als Berater, Coach oder Trainer ein Paket aus Terminen, Workshops oder laufender Begleitung an",
      "Du beauftragst einen Berater (Strategie, Marketing, Vertrieb, Personal) und willst Honorar und Umfang festhalten",
      "Stundenhonorar, Tagessatz oder Paketpreis mit klaren Absage- und Verschiebungsregeln",
      "Wenn klar sein soll, dass keine Rechts-, Steuer- oder Heilberatung geschuldet ist",
    ],
    enthaelt: [
      "§ 1 Gegenstand der Beratung",
      "§ 2 Art der Leistung, keine Erfolgsgarantie",
      "§ 3 Termine, Absage und Verschiebung",
      "§ 4 Mitwirkung des Auftraggebers",
      "§ 5 Honorar, Auslagen, Zahlung",
      "§ 6 Abgrenzung: keine Rechts-, Steuer- oder Heilberatung",
      "§ 7 Vertraulichkeit und Datenschutz",
      "§ 8 Haftung",
      "§ 9 Nutzungsrechte an Unterlagen",
      "§ 10 Laufzeit und Kündigung",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Rechtsberatung darfst du ohne Zulassung nicht anbieten (Rechtsdienstleistungsgesetz), Steuerberatung nur als Steuerberater (StBerG). Allgemeine betriebswirtschaftliche Hinweise sind erlaubt, die konkrete Prüfung eines Vertrags oder einer Steuerfrage nicht. Die Vorlage grenzt das ausdrücklich ab.",
      "Beratungsverträge mit Vertrauensstellung können nach § 627 BGB jederzeit fristlos gekündigt werden, wenn du nicht in einem dauernden Dienstverhältnis mit festen Bezügen stehst. Feste Laufzeiten und Paketpreise sind deshalb nur bedingt belastbar – plane mit Teilabrechnung je Termin.",
      "Absagegebühren müssen angemessen sein. Bei kurzfristiger Absage ist eine Pauschale üblich, die ersparte Aufwendungen berücksichtigt; 100 % für jede Absage hält vor Gericht meist nicht.",
      "Coaching mit gesundheitsbezogenen Versprechen (Angst, Depression, Burnout „heilen“) fällt schnell unter das Heilpraktikergesetz. Bleibe bei beruflicher und persönlicher Entwicklung und sage das im Vertrag.",
    ],
    faqs: [
      {
        q: "Schulde ich als Berater einen Erfolg?",
        a: "Nein, der Beratervertrag ist ein Dienstvertrag. Du schuldest fachgerechte Beratung nach bestem Wissen, nicht den wirtschaftlichen Erfolg der Umsetzung. Die Entscheidung über die Umsetzung bleibt beim Kunden. Die Vorlage hält das ausdrücklich fest.",
      },
      {
        q: "Kann der Kunde den Beratervertrag einfach kündigen?",
        a: "Bei Beratung, die auf besonderem Vertrauen beruht (das ist bei Beratung und Coaching regelmäßig der Fall), darf der Kunde nach § 627 BGB jederzeit kündigen; umgekehrt gilt das für dich auch, aber nicht zur Unzeit. Bereits erbrachte Leistungen werden vergütet. Deshalb rechnet die Vorlage je Termin oder je Monat ab.",
      },
      {
        q: "Darf ich als Unternehmensberater auch Verträge prüfen oder Steuertipps geben?",
        a: "Nur sehr eingeschränkt. Rechtsdienstleistungen sind als Nebenleistung erlaubt, wenn sie zum Berufsbild gehören und untergeordnet sind (§ 5 RDG), konkrete Steuerberatung ist Steuerberatern vorbehalten. Verweise im Zweifel an Anwalt oder Steuerberater, auch um deine Haftung zu begrenzen.",
      },
      {
        q: "Wie sichere ich mich gegen kurzfristige Absagen ab?",
        a: "Mit einer Absagefrist (z. B. 48 Stunden) und einer gestaffelten Ausfallpauschale, die der Kunde bei Absage nach Fristablauf zahlt. Bei Krankheit oder Verhinderung des Beraters wird der Termin kostenfrei nachgeholt. Beides steht in der Vorlage.",
      },
    ],
    seo: {
      title: "Beratervertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Beratervertrag und Coaching-Vertrag als kostenlose Vorlage: Leistungsumfang, Honorar, Absagefristen, Haftungsbegrenzung, keine Rechts- oder Steuerberatung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/beratervertrag"),
  },
  {
    slug: "agenturvertrag-marketing",
    titel: "Agenturvertrag Marketing / Social Media / Ads",
    kurz: "Vertrag zwischen Marketing-, Social-Media- oder Performance-Agentur und Kunde: Leistungspakete, Retainer, Werbebudget getrennt, Reporting, Zugänge, Nutzungsrechte, Kündigung.",
    kategorie: "dienstleistung",
    dateiname: "Agenturvertrag-Marketing-Social-Media",
    wofuer: [
      "Du führst eine Agentur und betreust Kunden laufend: Social Media, Content, Google/Meta Ads, SEO, E-Mail-Marketing",
      "Du beauftragst als Gründer eine Agentur und willst Umfang, Kosten und Ausstieg klar geregelt haben",
      "Monatlicher Retainer mit festem Leistungspaket plus getrennt abgerechnetem Werbebudget",
      "Wenn Content-Rechte, Zugänge zu Werbekonten und Reporting von Anfang an sauber verteilt sein sollen",
    ],
    enthaelt: [
      "§ 1 Leistungen und Leistungspakete",
      "§ 2 Art der Leistung, keine Erfolgsgarantie",
      "§ 3 Werbebudget und Fremdkosten (getrennt vom Honorar)",
      "§ 4 Zugänge, Konten und Inhaberschaft",
      "§ 5 Freigaben, Reporting, Abstimmung",
      "§ 6 Vergütung (Retainer) und Zahlung",
      "§ 7 Nutzungsrechte an Content",
      "§ 8 Rechtliche Verantwortung für Inhalte und Werbung",
      "§ 9 Vertraulichkeit und Datenschutz",
      "§ 10 Haftung",
      "§ 11 Laufzeit und Kündigung, Übergabe",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Werbekonten (Meta Business Manager, Google Ads, TikTok Ads) sollten immer dem Kunden gehören; die Agentur bekommt nur Zugriff als Partner oder Nutzer. Sonst ist beim Agenturwechsel die gesamte Kampagnenhistorie weg und das Budget lief über fremde Konten.",
      "Werbebudget und Agenturhonorar immer trennen. Läuft das Budget über die Agentur, ist das durchlaufender Posten oder Fremdleistung mit Vorkasse – das muss in der Rechnung und im Vertrag erkennbar sein.",
      "Die Agentur haftet nicht automatisch für wettbewerbs- oder markenrechtliche Fehler in Inhalten, die der Kunde freigegeben hat – aber sie muss auf erkennbare Risiken hinweisen. Die Vorlage verteilt die Verantwortung ausdrücklich.",
      "Laufzeiten von 12 Monaten mit automatischer Verlängerung sind zwischen Unternehmen zulässig, aber bei kleinen Kunden ein häufiger Streitpunkt. Kürzere Mindestlaufzeit und 1 bis 3 Monate Kündigungsfrist sind marktüblich.",
    ],
    faqs: [
      {
        q: "Wem gehören die Werbekonten und die Daten darin?",
        a: "Nach der Vorlage dem Kunden. Die Agentur richtet Konten im Namen des Kunden ein oder erhält Zugriff auf bestehende Konten; alle Konten, Pixel, Zielgruppen und Kampagnendaten bleiben beim Kunden. Bei Vertragsende werden die Zugriffe der Agentur entzogen, nicht die Konten übergeben.",
      },
      {
        q: "Schuldet die Agentur bestimmte Ergebnisse wie Reichweite oder Leads?",
        a: "Nein. Der Agenturvertrag ist im Kern ein Dienstvertrag, die Agentur schuldet fachgerechte Arbeit, nicht Zahlen, die von Plattformen, Markt und Produkt abhängen. Nur einzeln vereinbarte Werkleistungen wie ein fertiges Video oder eine Landingpage unterliegen Abnahme und Gewährleistung.",
      },
      {
        q: "Darf ich den Content nach Vertragsende weiter nutzen?",
        a: "Nur, wenn die Nutzungsrechte eingeräumt sind. Die Vorlage überträgt dem Kunden mit Zahlung die unbeschränkten Nutzungsrechte an erstellten Inhalten; für lizenziertes Fremdmaterial (Stockfotos, Musik, Fonts) gelten die jeweiligen Lizenzen, die die Agentur im Namen des Kunden erwirbt.",
      },
      {
        q: "Wer haftet, wenn ein Post gegen Werberecht verstößt?",
        a: "Nach außen immer das werbende Unternehmen, also der Kunde. Im Innenverhältnis haftet die Agentur, wenn der Fehler auf ihrer Arbeit beruht und sie nicht auf das Risiko hingewiesen hat. Freigaben des Kunden und Vorgaben zu Claims verschieben die Verantwortung zum Kunden.",
      },
    ],
    seo: {
      title: "Agenturvertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "Agenturvertrag für Marketing, Social Media und Ads als kostenlose Vorlage: Leistungspakete, Retainer, Werbebudget, Zugänge, Reporting, Nutzungsrechte.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/agenturvertrag-marketing"),
  },
  {
    slug: "rahmenvertrag-dienstleistungen",
    titel: "Rahmenvertrag für Dienstleistungen",
    kurz: "Rahmenvertrag mit Einzelaufträgen (Statements of Work): Rangfolge, Preisliste, Abruf, Mindestanforderungen an Service-Level, Laufzeit und Kündigung der Rahmenbeziehung.",
    kategorie: "dienstleistung",
    dateiname: "Rahmenvertrag-Dienstleistungen",
    wofuer: [
      "Du arbeitest wiederholt für denselben Kunden und willst nicht jedes Mal einen neuen Vertrag verhandeln",
      "Du beauftragst einen Dienstleister immer wieder mit Projekten unterschiedlicher Größe (IT, Beratung, Design, Logistik)",
      "Einzelaufträge sollen kurz sein: Leistung, Termin, Preis – alles Übrige steht im Rahmenvertrag",
      "Wenn Preise, Haftung, Geheimhaltung und Service-Level einmal fest und für alle Aufträge gleich geregelt sein sollen",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Struktur (Rahmenvertrag, Einzelaufträge)",
      "§ 2 Rangfolge der Vertragsdokumente",
      "§ 3 Zustandekommen von Einzelaufträgen (Abruf)",
      "§ 4 Leistungserbringung und Personal",
      "§ 5 Service-Level (Basis)",
      "§ 6 Preise und Preisliste",
      "§ 7 Abrechnung und Zahlung",
      "§ 8 Abnahme bei Werkleistungen",
      "§ 9 Nutzungsrechte",
      "§ 10 Geheimhaltung, Datenschutz",
      "§ 11 Haftung",
      "§ 12 Laufzeit und Kündigung",
      "§ 13 Schlussbestimmungen",
    ],
    hinweise: [
      "Ein Rahmenvertrag verpflichtet für sich allein zu nichts: Ohne Einzelauftrag gibt es weder Leistung noch Vergütung. Wenn du als Dienstleister Mindestabnahmen willst, musst du sie ausdrücklich hineinschreiben.",
      "Die Rangfolge ist das Herzstück. Soll der Einzelauftrag den Rahmenvertrag überschreiben dürfen (z. B. andere Preise), muss das ausdrücklich erlaubt sein, sonst entstehen Widersprüche, die vor Gericht ausgelegt werden.",
      "Die Kündigung des Rahmenvertrags beendet laufende Einzelaufträge nicht automatisch. Die Vorlage regelt, dass begonnene Aufträge zu Ende geführt werden.",
      "Service-Level mit Gutschriften (Service Credits) sind Vertragsstrafen ähnlich. Zwischen Unternehmen zulässig, aber sie müssen messbar und in der Höhe angemessen sein. Nenne Messverfahren und Obergrenze.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Rahmenvertrag und Einzelauftrag?",
        a: "Der Rahmenvertrag regelt die allgemeinen Bedingungen der Zusammenarbeit: Preise, Haftung, Geheimhaltung, Service-Level, Kündigung. Jeder Einzelauftrag (Statement of Work, SOW) beschreibt dann nur noch die konkrete Leistung, Termine und Vergütung. Erst der Einzelauftrag begründet Leistungs- und Zahlungspflichten.",
      },
      {
        q: "Muss ich jeden Einzelauftrag unterschreiben?",
        a: "Nicht zwingend. Die Vorlage lässt Einzelaufträge in Textform zu, also auch per E-Mail oder über ein Ticketsystem, wenn beide Seiten das so vereinbaren. Wichtig ist, dass Leistung, Termin und Preis eindeutig bezeichnet sind und beide Seiten zugestimmt haben.",
      },
      {
        q: "Was passiert mit laufenden Aufträgen, wenn der Rahmenvertrag gekündigt wird?",
        a: "Sie laufen nach den Regeln des Rahmenvertrags weiter, bis sie erfüllt sind. Das ist in der Vorlage ausdrücklich geregelt, weil sonst Streit darüber entsteht, ob Preise und Haftungsregeln noch gelten. Neue Einzelaufträge dürfen nach der Kündigung nicht mehr abgerufen werden.",
      },
      {
        q: "Brauche ich zusätzlich AGB?",
        a: "Nein, der Rahmenvertrag ersetzt deine AGB gegenüber diesem Kunden. Die Vorlage schließt entgegenstehende AGB beider Seiten ausdrücklich aus, damit nicht bei jeder Bestellung die Einkaufsbedingungen des Kunden hineinrutschen.",
      },
    ],
    seo: {
      title: "Rahmenvertrag Dienstleistungen Vorlage kostenlos | GründerX",
      description:
        "Rahmenvertrag für Dienstleistungen mit Einzelaufträgen als kostenlose Vorlage: Rangfolge, Preisliste, Abruf, Service-Level, Haftung, Laufzeit. Word, PDF.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/rahmenvertrag-dienstleistungen"),
  },
  {
    slug: "influencer-kooperationsvertrag",
    titel: "Influencer-Kooperationsvertrag",
    kurz: "Vertrag zwischen Unternehmen und Influencer oder Creator: Deliverables, Werbekennzeichnung, Freigabe, Nutzungsrechte, Exklusivität, Vergütung oder Produkte, Stornierung, Insights.",
    kategorie: "dienstleistung",
    dateiname: "Influencer-Kooperationsvertrag",
    wofuer: [
      "Du buchst als Marke oder Shop einen Influencer für Posts, Reels, Stories oder ein Video",
      "Du bist selbst Creator und willst Umfang, Freigaben und Nutzungsrechte vor dem ersten Post festhalten",
      "Vergütung in Geld, in Produkten oder als Mischung, mit oder ohne Affiliate-Anteil",
      "Wenn die Werbekennzeichnung, die Exklusivität und der Leistungsnachweis per Insights vertraglich sicher sein sollen",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Kampagne",
      "§ 2 Deliverables (Posts, Reels, Stories, Video)",
      "§ 3 Briefing, Freigabe, Veröffentlichung",
      "§ 4 Kennzeichnung als Werbung und rechtliche Vorgaben",
      "§ 5 Vergütung, Produkte, Affiliate",
      "§ 6 Nutzungsrechte am Content",
      "§ 7 Exklusivität und Wettbewerb",
      "§ 8 Leistungsnachweis (Insights) und Mindestdauer der Veröffentlichung",
      "§ 9 Stornierung, Absage, Nichterfüllung",
      "§ 10 Haftung, Freistellung, Verhaltenskodex",
      "§ 11 Vertraulichkeit, Datenschutz",
      "§ 12 Laufzeit und Schlussbestimmungen",
    ],
    hinweise: [
      "Jeder bezahlte oder mit Gratisprodukten vergütete Beitrag muss als Werbung erkennbar sein (§ 5a Abs. 4 UWG, § 22 Abs. 1 MStV). „Werbung“ oder „Anzeige“ am Anfang des Beitrags, nicht versteckt in Hashtags. Abmahnungen treffen Creator und Unternehmen.",
      "Gratisprodukte sind eine Gegenleistung: Steuerlich ein Tausch, der beim Creator als Einnahme zählt, und werberechtlich ein kommerzieller Zweck. Die Vorlage regelt den Warenwert ausdrücklich.",
      "Unternehmen, die Creator für künstlerische oder publizistische Leistungen bezahlen, können zur Künstlersozialabgabe verpflichtet sein. Lass das von deinem Steuerberater prüfen, bevor du regelmäßig mit Creatorn arbeitest.",
      "Nutzungsrechte am Content gehen nicht automatisch an die Marke. Willst du den Beitrag als Anzeige (Whitelisting, Spark Ads) oder auf deiner Website nutzen, muss das ausdrücklich und mit Dauer vereinbart sein.",
      "Übermäßige Kontrolle (Zeitvorgaben, Freigabe jedes Wortes, Exklusivität über Jahre) kann den Creator in Richtung Arbeitnehmer rücken und schadet der Authentizität. Freigabe auf Fakten und Kennzeichnung beschränken.",
    ],
    faqs: [
      {
        q: "Muss ein Beitrag auch dann als Werbung gekennzeichnet werden, wenn ich nur Produkte kostenlos bekomme?",
        a: "Ja. Kostenlose Produkte sind eine Gegenleistung, der Beitrag hat damit einen kommerziellen Zweck und muss gekennzeichnet werden. Nur wenn der Creator das Produkt selbst gekauft hat und keinerlei Gegenleistung erhält, kann die Kennzeichnung entfallen. Die Vorlage schreibt die Kennzeichnung in jedem Fall vor.",
      },
      {
        q: "Wie weise ich nach, dass die vereinbarte Reichweite erbracht wurde?",
        a: "Über Screenshots der Insights aus der jeweiligen Plattform (Reichweite, Impressionen, Interaktionen, Link-Klicks) innerhalb einer Frist nach Veröffentlichung. Die Vorlage legt fest, welche Werte wann zu liefern sind. Eine garantierte Mindestreichweite ist unüblich; Creator schulden die Veröffentlichung, nicht den Algorithmus.",
      },
      {
        q: "Darf ich die Beiträge des Influencers in meinen eigenen Anzeigen nutzen?",
        a: "Nur, wenn der Vertrag das Nutzungsrecht dafür einräumt. Die Vorlage sieht eine Grundnutzung (Reposten auf eigenen Kanälen) und optional ein erweitertes Recht für bezahlte Werbung und Website für eine bestimmte Dauer vor. Dafür ist üblicherweise ein Aufschlag auf das Honorar fällig.",
      },
      {
        q: "Was passiert, wenn der Influencer den Post nicht liefert?",
        a: "Dann ist die Vergütung nicht fällig, bereits gezahlte Vorschüsse sind zurückzuzahlen und gelieferte Produkte zurückzugeben oder zu bezahlen. Die Vorlage sieht eine Nachfrist und danach ein Rücktrittsrecht vor. Bei Absagen aus Gründen beim Unternehmen gibt es eine gestaffelte Stornogebühr.",
      },
    ],
    seo: {
      title: "Influencer-Vertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Influencer-Kooperationsvertrag als kostenlose Vorlage: Deliverables, Werbekennzeichnung, Freigabe, Nutzungsrechte, Exklusivität, Vergütung, Insights.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/influencer-kooperationsvertrag"),
  },
  {
    slug: "handelsvertretervertrag",
    titel: "Handelsvertretervertrag",
    kurz: "Vertrag mit einem selbstständigen Handelsvertreter nach §§ 84 ff. HGB: Gebiet, Provision, Abrechnung, Delkredere optional, Wettbewerbsverbot, Kündigungsfristen, Ausgleichsanspruch.",
    kategorie: "dienstleistung",
    dateiname: "Handelsvertretervertrag",
    wofuer: [
      "Du willst Produkte oder Dienstleistungen über einen selbstständigen Vertriebspartner auf Provisionsbasis verkaufen lassen",
      "Du arbeitest selbst als Handelsvertreter und brauchst einen Vertrag, der Provision und Ausgleich absichert",
      "Vertrieb in einem festen Gebiet oder Kundenkreis, mit oder ohne Alleinvertretung",
      "Wenn die zwingenden Regeln des HGB (Provision, Buchauszug, Kündigungsfristen, Ausgleich) sauber umgesetzt sein sollen",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand, Produkte, Gebiet",
      "§ 2 Rechtsstellung des Handelsvertreters",
      "§ 3 Pflichten des Handelsvertreters",
      "§ 4 Pflichten des Unternehmers",
      "§ 5 Provision und Provisionssätze",
      "§ 6 Entstehung, Fälligkeit, Abrechnung, Buchauszug",
      "§ 7 Delkredere (optional)",
      "§ 8 Wettbewerbsverbot während und nach dem Vertrag",
      "§ 9 Geheimhaltung, Unterlagen, Datenschutz",
      "§ 10 Laufzeit und Kündigung",
      "§ 11 Ausgleichsanspruch (§ 89b HGB)",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Der Ausgleichsanspruch nach § 89b HGB kann im Voraus nicht ausgeschlossen werden. Bei Vertragsende zahlt der Unternehmer dem Handelsvertreter bis zu einer Jahresdurchschnittsprovision, wenn er aus dem geworbenen Kundenstamm weiter Vorteile zieht. Kalkuliere das von Anfang an ein.",
      "Die Kündigungsfristen des § 89 HGB sind Mindestfristen: 1 Monat im ersten Jahr, 2 Monate im zweiten, 3 Monate im dritten bis fünften, danach 6 Monate, jeweils zum Monatsende. Kürzere Fristen sind unwirksam; längere müssen für beide Seiten gleich sein.",
      "Der Handelsvertreter hat einen gesetzlichen Anspruch auf Buchauszug (§ 87c HGB) über alle provisionspflichtigen Geschäfte. Das lässt sich nicht abbedingen; richte die Abrechnung von Anfang an so ein, dass du ihn liefern kannst.",
      "Ein nachvertragliches Wettbewerbsverbot ist nur mit Schriftform, maximal zwei Jahren, Beschränkung auf Gebiet/Kundenkreis und Produkte sowie gegen Karenzentschädigung wirksam (§ 90a HGB).",
      "Arbeitet der Vertreter nur für dich, nach deinen Zeitvorgaben und ohne eigene Organisation, kann er Arbeitnehmer oder Einfirmenvertreter mit Arbeitsgerichtszuständigkeit sein (§ 92a HGB, § 5 Abs. 3 ArbGG). Prüfe die tatsächliche Ausgestaltung.",
    ],
    faqs: [
      {
        q: "Was unterscheidet den Handelsvertreter vom Vertriebsmitarbeiter?",
        a: "Der Handelsvertreter ist selbstständiger Gewerbetreibender, der ständig damit betraut ist, für dich Geschäfte zu vermitteln oder abzuschließen (§ 84 HGB). Er trägt sein Unternehmerrisiko, arbeitet frei in Zeit und Organisation und wird nur per Provision bezahlt. Der Vertriebsmitarbeiter ist Arbeitnehmer mit festem Gehalt und Weisungsbindung.",
      },
      {
        q: "Wann entsteht der Provisionsanspruch?",
        a: "Nach § 87a HGB, sobald und soweit du das Geschäft ausgeführt hast, spätestens wenn der Kunde geleistet hat. Führt der Kunde nicht aus, entfällt die Provision nur, wenn das nicht auf deinem Verhalten beruht. Die Abrechnung muss monatlich erfolgen, spätestens bis Ende des Folgemonats (§ 87c HGB); ein Quartalsrhythmus ist vereinbar.",
      },
      {
        q: "Wie hoch ist der Ausgleichsanspruch bei Vertragsende?",
        a: "Höchstens eine Jahresprovision, berechnet aus dem Durchschnitt der letzten fünf Jahre (bei kürzerer Laufzeit der gesamten Laufzeit). Tatsächlich geschuldet ist der Betrag, der dem Vorteil aus neu geworbenen Kunden und der Billigkeit entspricht. Der Anspruch entfällt unter anderem, wenn der Handelsvertreter selbst ohne Anlass kündigt. Er muss innerhalb eines Jahres nach Vertragsende geltend gemacht werden.",
      },
      {
        q: "Was ist Delkredere und sollte ich es vereinbaren?",
        a: "Mit einer Delkredere-Abrede haftet der Handelsvertreter dafür, dass der Kunde zahlt. Das ist nur für bestimmte Geschäfte oder Kunden möglich, muss schriftlich erfolgen und löst eine zusätzliche Delkredereprovision aus (§ 86b HGB). Für kleine Unternehmen ist es meist unnötig; eine Bonitätsprüfung vor Auftragsannahme ist einfacher.",
      },
    ],
    seo: {
      title: "Handelsvertretervertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Handelsvertretervertrag nach §§ 84 ff. HGB als kostenlose Vorlage: Gebiet, Provision, Buchauszug, Delkredere, Wettbewerbsverbot, Kündigung, Ausgleich.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/handelsvertretervertrag"),
  },
  {
    slug: "provisionsvereinbarung-tippgeber",
    titel: "Provisionsvereinbarung für Tippgeber",
    kurz: "Tippgeber- und Empfehlungsvereinbarung: Provision bei Vertragsabschluss mit dem empfohlenen Kunden, Nachweis, Abrechnung, klare Abgrenzung zur Vermittlung, Laufzeit.",
    kategorie: "dienstleistung",
    dateiname: "Provisionsvereinbarung-Tippgeber",
    wofuer: [
      "Du zahlst Partnern, Bekannten oder Kunden eine Prämie, wenn sie dir einen neuen Kunden bringen",
      "Du empfiehlst selbst Kunden weiter und willst die Provision verbindlich festhalten",
      "Einmalprovision pro Abschluss oder laufende Beteiligung am Umsatz für eine begrenzte Zeit",
      "Wenn klar sein soll, dass der Tippgeber nur Kontakte nennt und nicht für dich verhandelt oder abschließt",
    ],
    enthaelt: [
      "§ 1 Gegenstand: Nennung von Interessenten (Tipp)",
      "§ 2 Abgrenzung: keine Vermittlung, keine Vertretung",
      "§ 3 Form und Nachweis des Tipps, Schutzfrist",
      "§ 4 Provision und Entstehung",
      "§ 5 Abrechnung, Auskunft, Zahlung",
      "§ 6 Pflichten des Tippgebers, Datenschutz",
      "§ 7 Keine Exklusivität, kein Wettbewerbsverbot",
      "§ 8 Laufzeit, Kündigung, Nachwirkung",
      "§ 9 Schlussbestimmungen",
    ],
    hinweise: [
      "Der Tippgeber darf nur den Kontakt herstellen. Sobald er Produkte erklärt, Angebote verhandelt oder Unterlagen abgibt, wird er zum Vermittler – bei Versicherungen, Finanzanlagen, Darlehen und Immobilien braucht er dafür eine Gewerbeerlaubnis (§ 34c, § 34d, § 34f GewO). Die Vorlage zieht diese Grenze ausdrücklich.",
      "Der Interessent muss wissen, dass seine Daten weitergegeben werden. Ohne Einwilligung oder ein anderes berechtigtes Interesse verstößt die Weitergabe gegen die DSGVO. Die Vorlage verpflichtet den Tippgeber, die Einwilligung einzuholen.",
      "Provisionen an Privatpersonen sind für diese steuerpflichtige Einnahmen; ab regelmäßiger Tätigkeit wird daraus ein Gewerbe. Weise deine Tippgeber darauf hin, und kläre, ob sie Umsatzsteuer ausweisen.",
      "Erfolgt die Empfehlung gegenüber Verbrauchern (z. B. Kunden-werben-Kunden), gelten die Regeln für Werbung: keine verdeckte Werbung, keine unzumutbare Belästigung per Mail oder Telefon ohne Einwilligung (§ 7 UWG).",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Tippgeber und Handelsvertreter oder Makler?",
        a: "Der Tippgeber nennt nur den Kontakt und erhält eine Prämie, wenn daraus ein Vertrag wird. Er verhandelt nicht, berät nicht und schließt nicht ab. Der Handelsvertreter ist ständig mit der Vermittlung betraut und hat gesetzliche Rechte wie den Ausgleichsanspruch; der Makler vermittelt im Einzelfall. Beide brauchen in regulierten Branchen eine Erlaubnis, der Tippgeber nicht.",
      },
      {
        q: "Wann ist die Provision fällig?",
        a: "Nach der Vorlage, wenn ein Vertrag zwischen dir und dem genannten Interessenten innerhalb der Schutzfrist zustande kommt und der Kunde die erste Rechnung bezahlt hat. Bei Widerruf, Storno oder Nichtzahlung entfällt die Provision oder wird zurückgefordert. So zahlst du nie für Abschlüsse, die dir nichts bringen.",
      },
      {
        q: "Was ist, wenn ich den Kunden schon kannte?",
        a: "Dann gibt es keine Provision. Die Vorlage sieht vor, dass du einen Tipp innerhalb einer Frist ablehnen kannst, wenn der Kontakt dir bereits bekannt ist oder ein anderer Tippgeber ihn vorher genannt hat. Ohne Ablehnung in der Frist gilt der Tipp als angenommen – das sorgt für Klarheit auf beiden Seiten.",
      },
      {
        q: "Darf ich Tippgeber-Provisionen an Mitarbeiter von Kunden zahlen?",
        a: "Vorsicht: Zahlungen an Angestellte eines Unternehmens dafür, dass sie ihren Arbeitgeber zu dir lenken, können Bestechung im geschäftlichen Verkehr sein (§ 299 StGB). Tippgeber sollten frei und offen handeln; die Vorlage verlangt, dass der Tippgeber keine Pflichten gegenüber dem Interessenten verletzt.",
      },
    ],
    seo: {
      title: "Tippgeber-Vereinbarung Vorlage kostenlos (Word) | GründerX",
      description:
        "Tippgeber- und Empfehlungsvereinbarung als kostenlose Vorlage: Provision bei Abschluss, Nachweis des Tipps, Schutzfrist, Abrechnung, keine Vermittlung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/provisionsvereinbarung-tippgeber"),
  },
  {
    slug: "kooperationsvereinbarung",
    titel: "Kooperationsvereinbarung zwischen Unternehmen",
    kurz: "Vereinbarung für die Zusammenarbeit zweier Unternehmen bei Co-Marketing oder einem gemeinsamen Angebot: Beiträge, Kosten und Erlöse, Marken, Verantwortlichkeiten, keine Gesellschaft, Laufzeit.",
    kategorie: "dienstleistung",
    dateiname: "Kooperationsvereinbarung-Unternehmen",
    wofuer: [
      "Zwei Unternehmen bewerben sich gegenseitig, bündeln Produkte oder bieten gemeinsam ein Paket an",
      "Gemeinsame Aktionen wie Webinare, Events, Newsletter-Tausch, Bundle-Angebote oder Co-Branding",
      "Wenn klar sein soll, wer welche Kosten trägt und wie Erlöse aufgeteilt werden",
      "Wenn ausdrücklich keine GbR entstehen soll und jeder Partner nur für sich haftet",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Ziel der Kooperation",
      "§ 2 Beiträge und Aufgaben der Partner",
      "§ 3 Kosten, Erlöse und Abrechnung",
      "§ 4 Marken, Logos, Nutzungsrechte",
      "§ 5 Verantwortlichkeiten gegenüber Kunden",
      "§ 6 Keine Gesellschaft, keine Vertretung",
      "§ 7 Vertraulichkeit, Datenschutz, Kundendaten",
      "§ 8 Wettbewerb und Kartellrecht",
      "§ 9 Haftung",
      "§ 10 Laufzeit und Kündigung",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Sobald zwei Unternehmen einen gemeinsamen Zweck verfolgen und sich dazu verpflichten, kann nach §§ 705 ff. BGB auch ohne Vertrag eine GbR entstehen – mit gesamtschuldnerischer Haftung. Die Vorlage schließt das ausdrücklich aus und trennt die Beiträge sauber.",
      "Gemeinsame Werbung ist keine gemeinsame Verantwortung: Wer gegenüber dem Kunden Vertragspartner ist, haftet für Lieferung, Gewährleistung und Widerruf. Das muss im Vertrag und auf jeder Kundenseite erkennbar sein.",
      "Kundendaten dürfen nicht einfach zwischen Partnern ausgetauscht werden. Für gemeinsame Aktionen (Gewinnspiel, Webinar-Anmeldung) braucht ihr eine Einwilligung oder eine Vereinbarung über gemeinsame Verantwortlichkeit nach Art. 26 DSGVO.",
      "Absprachen über Preise, Kunden oder Gebiete zwischen Wettbewerbern sind kartellrechtlich verboten (§ 1 GWB). Kooperiert ihr mit einem Konkurrenten, beschränkt die Vereinbarung auf die konkrete Aktion.",
    ],
    faqs: [
      {
        q: "Entsteht durch eine Kooperation automatisch eine GbR?",
        a: "Sie kann entstehen, wenn ihr einen gemeinsamen Zweck mit gemeinsamen Beiträgen verfolgt, etwa ein gemeinsames Produkt unter gemeinsamem Namen verkauft und den Gewinn teilt. Die Vorlage verhindert das, indem jeder Partner seine Leistung im eigenen Namen erbringt, eigene Verträge mit Kunden schließt und keine gemeinsame Kasse existiert.",
      },
      {
        q: "Wie teilen wir Erlöse auf, ohne eine Gesellschaft zu gründen?",
        a: "Über eine Provisions- oder Lizenzlogik: Der Partner, der den Kundenvertrag schließt, zahlt dem anderen einen festen Anteil oder Betrag je Abschluss. Das ist eine gegenseitige Leistungsbeziehung mit Rechnung und Umsatzsteuer, keine Gewinnverteilung. Genau so ist es in der Vorlage angelegt.",
      },
      {
        q: "Darf mein Partner mein Logo überall verwenden?",
        a: "Nur im Rahmen der Kooperation und nach den vereinbarten Vorgaben. Die Vorlage räumt ein einfaches, auf die Kooperation beschränktes Nutzungsrecht ein, verlangt Freigabe für jede Verwendung und endet automatisch mit der Kooperation.",
      },
      {
        q: "Was passiert, wenn ein Kunde Probleme mit der Leistung des Partners hat?",
        a: "Dann richtet sich der Kunde an seinen Vertragspartner, also an den, mit dem er den Vertrag geschlossen hat. Im Innenverhältnis stellt der Partner, der die Leistung schuldet, den anderen frei. Die Vorlage regelt beides und verlangt, dass auf allen Kundenseiten der jeweils verantwortliche Partner genannt wird.",
      },
    ],
    seo: {
      title: "Kooperationsvereinbarung Vorlage kostenlos (Word) | GründerX",
      description:
        "Kooperationsvereinbarung zwischen zwei Unternehmen als kostenlose Vorlage: Beiträge, Kosten, Erlöse, Marken, Kundenverantwortung, keine GbR, Laufzeit.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/kooperationsvereinbarung"),
  },
  {
    slug: "subunternehmervertrag",
    titel: "Subunternehmervertrag",
    kurz: "Vertrag mit einem Subunternehmer für ein Projekt oder Gewerk: Leistung, Termine, Vergütung, Abnahme, Haftung, Weitergabe von Kundenpflichten, Geheimhaltung, Kundenschutz.",
    kategorie: "dienstleistung",
    dateiname: "Subunternehmervertrag",
    wofuer: [
      "Du hast einen Auftrag von einem Kunden und gibst einen Teil davon an einen Nachunternehmer weiter",
      "Du arbeitest selbst als Subunternehmer und willst Termine, Abnahme und Zahlung abgesichert haben",
      "IT-, Handwerks-, Bau-, Agentur- oder Logistikprojekte mit Hauptauftrag und Nachunternehmer",
      "Wenn die Pflichten aus dem Kundenvertrag sauber an den Subunternehmer durchgereicht und der Kunde vor Abwerbung geschützt werden sollen",
    ],
    enthaelt: [
      "§ 1 Vertragsgegenstand und Bezug zum Hauptauftrag",
      "§ 2 Leistungsumfang, Ausführung, Weitergabe von Kundenpflichten",
      "§ 3 Termine, Verzug",
      "§ 4 Vergütung, Abschlagszahlungen, Zahlung",
      "§ 5 Abnahme",
      "§ 6 Mängelhaftung",
      "§ 7 Haftung, Versicherung, Freistellung",
      "§ 8 Personal, Mindestlohn, Sozialabgaben, Nachweise",
      "§ 9 Geheimhaltung, Datenschutz, Kundenschutz",
      "§ 10 Nutzungsrechte",
      "§ 11 Kündigung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Du haftest gegenüber deinem Kunden für den Subunternehmer wie für dich selbst (§ 278 BGB). Deshalb müssen Fristen, Qualität und Gewährleistung im Subunternehmervertrag mindestens so streng sein wie im Hauptauftrag – die Vorlage reicht sie durch.",
      "Nach § 13 MiLoG haftest du wie ein Bürge dafür, dass dein Subunternehmer seinen Leuten den Mindestlohn zahlt, auch ohne eigenes Verschulden. Lass dir die Einhaltung zusichern und bei größeren Aufträgen Nachweise geben.",
      "Bei Bauleistungen gilt die Bauabzugsteuer: Ohne Freistellungsbescheinigung des Subunternehmers musst du 15 % der Rechnung einbehalten und ans Finanzamt abführen (§ 48 EStG). Außerdem kann die Umsatzsteuerschuld auf dich übergehen (§ 13b UStG).",
      "Ein Kundenschutz muss zeitlich und sachlich begrenzt sein, sonst ist er unwirksam. Üblich sind 12 bis 24 Monate nach Projektende, beschränkt auf die Kunden, mit denen der Subunternehmer im Projekt Kontakt hatte.",
      "Setzt der Subunternehmer nur sich selbst ein und arbeitet er nach deinen Weisungen in deinem Team, droht Scheinselbstständigkeit oder illegale Arbeitnehmerüberlassung. Die Vorlage verlangt eigenverantwortliche Ausführung ohne Eingliederung.",
    ],
    faqs: [
      {
        q: "Muss ich meinem Kunden sagen, dass ich einen Subunternehmer einsetze?",
        a: "Das hängt vom Hauptvertrag ab. Viele Kundenverträge verlangen eine Zustimmung oder verbieten den Einsatz. Prüfe das vorher, denn ein Verstoß kann eine Kündigung aus wichtigem Grund rechtfertigen. Gegenüber dem Kunden bleibst du in jedem Fall allein verantwortlich.",
      },
      {
        q: "Wann muss ich den Subunternehmer bezahlen, wenn mein Kunde noch nicht gezahlt hat?",
        a: "Grundsätzlich nach den Fristen des Subunternehmervertrags, unabhängig von der Zahlung deines Kunden. Eine Klausel „Zahlung erst, wenn der Kunde zahlt“ (Pay-when-paid) ist in AGB unwirksam und auch individuell riskant. Die Vorlage koppelt die Fälligkeit an die Abnahme deiner Teilleistung, nicht an die Kundenzahlung.",
      },
      {
        q: "Wie schütze ich mich davor, dass der Subunternehmer meinen Kunden direkt übernimmt?",
        a: "Mit einer Kundenschutzklausel: Der Subunternehmer darf die im Projekt kennengelernten Kunden für eine bestimmte Zeit nicht direkt oder über Dritte bedienen oder abwerben, sonst zahlt er eine Vertragsstrafe. Die Vorlage sieht das mit 12 bis 24 Monaten vor; eine angemessene Dauer ist wichtig für die Wirksamkeit.",
      },
      {
        q: "Wer nimmt die Leistung des Subunternehmers ab, mein Kunde oder ich?",
        a: "Du als Hauptunternehmer nimmst die Leistung deines Subunternehmers ab, unabhängig von der Abnahme durch den Kunden. Die Vorlage sieht eine eigene Abnahme mit Protokoll vor und lässt zu, dass Mängelrügen des Kunden an den Subunternehmer weitergereicht werden, soweit sie seine Leistung betreffen.",
      },
    ],
    seo: {
      title: "Subunternehmervertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Subunternehmervertrag als kostenlose Vorlage: Leistung, Termine, Vergütung, Abnahme, Haftung, Mindestlohn, Kundenpflichten, Geheimhaltung, Kundenschutz.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/subunternehmervertrag"),
  },
  {
    slug: "virtuelle-assistenz-vertrag",
    titel: "Vertrag für Virtuelle Assistenz (VA)",
    kurz: "Vertrag zwischen Auftraggeber und virtueller Assistenz: Aufgabenkatalog, Stundenkontingent, Tools und Zugänge, Datenschutz mit AVV-Hinweis, Vergütung, Kündigung.",
    kategorie: "dienstleistung",
    dateiname: "Virtuelle-Assistenz-Vertrag",
    wofuer: [
      "Du gibst als Gründer Backoffice, E-Mails, Terminplanung, Social Media oder Recherche an eine VA ab",
      "Du arbeitest selbst als virtuelle Assistenz und willst Stundenpakete, Zugänge und Haftung sauber regeln",
      "Monatliches Stundenkontingent mit Abrechnung nach Zeiterfassung oder festes Paket",
      "Wenn die VA mit Kundendaten, Postfächern und Konten arbeitet und Datenschutz und Zugangsschutz geregelt sein müssen",
    ],
    enthaelt: [
      "§ 1 Leistungen und Aufgabenkatalog",
      "§ 2 Selbstständigkeit, Weisungsfreiheit, Arbeitsweise",
      "§ 3 Stundenkontingent, Erreichbarkeit, Zeiterfassung",
      "§ 4 Tools, Zugänge, Sicherheit",
      "§ 5 Datenschutz und Auftragsverarbeitung",
      "§ 6 Vergütung und Abrechnung",
      "§ 7 Vertraulichkeit",
      "§ 8 Haftung",
      "§ 9 Laufzeit, Kündigung, Übergabe",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Eine VA, die Kunden-E-Mails beantwortet, CRM pflegt oder Rechnungen schreibt, verarbeitet personenbezogene Daten in deinem Auftrag. Dann ist ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO Pflicht – ohne ihn ist die Weitergabe der Daten ein Datenschutzverstoß. Der Vertrag enthält den Hinweis, der AVV ist eine eigene Anlage.",
      "Scheinselbstständigkeit ist bei VAs ein echtes Risiko: feste tägliche Arbeitszeiten, Anwesenheit im Firmen-Chat wie ein Mitarbeiter, nur ein Auftraggeber und Vergütung nach Stunden ohne eigenes Risiko. Lass die VA Zeit und Ort selbst bestimmen und akzeptiere, dass sie weitere Kunden hat.",
      "Zugangsdaten nie per E-Mail oder im Klartext weitergeben. Nutze Passwortmanager mit geteilten Tresoren, eigene Nutzerkonten mit beschränkten Rechten und Zwei-Faktor-Authentifizierung. Beim Vertragsende entziehst du Zugänge, statt Passwörter zu ändern, die andere auch nutzen.",
      "Eine VA im Ausland (z. B. außerhalb der EU) macht die Datenübermittlung zum Drittlandtransfer mit zusätzlichen Pflichten (Standardvertragsklauseln). Kläre vorher, wo die VA arbeitet.",
    ],
    faqs: [
      {
        q: "Brauche ich mit meiner VA wirklich einen AVV?",
        a: "Ja, sobald sie personenbezogene Daten für dich verarbeitet, also Kundenmails, Adressen, Bestellungen oder Bewerbungen. Der AVV regelt Weisungen, Sicherheitsmaßnahmen, Unterauftragnehmer und Löschung. Ohne AVV haftest du als Verantwortlicher für die Datenweitergabe. Viele VAs haben ein Muster, sonst nimm ein Standardmuster und füge es als Anlage bei.",
      },
      {
        q: "Was passiert mit nicht genutzten Stunden aus dem Kontingent?",
        a: "Das regelt ihr im Vertrag. Üblich sind Pakete, bei denen nicht genutzte Stunden am Monatsende verfallen oder zu einem Teil in den Folgemonat übertragen werden. Die Vorlage bietet beide Varianten und regelt, wie Mehrstunden über dem Kontingent freigegeben und berechnet werden.",
      },
      {
        q: "Darf die VA Aufgaben an andere weitergeben?",
        a: "Nur, wenn du zustimmst. Bei Zugang zu Kundendaten muss jeder Unterauftragnehmer zusätzlich im AVV genehmigt und verpflichtet sein. Die Vorlage sieht die Zustimmung in Textform vor und lässt die VA für die Hilfspersonen wie für sich selbst haften.",
      },
      {
        q: "Wie vermeide ich, dass meine VA als Angestellte gilt?",
        a: "Durch echte Selbstständigkeit in der Praxis: Die VA bestimmt, wann und wo sie arbeitet, nutzt eigene Geräte, hat mehrere Kunden und tritt nach außen als Unternehmerin auf. Du gibst Aufgaben und Ergebnisse vor, keine Tagesabläufe. Bei Zweifeln hilft das Statusfeststellungsverfahren nach § 7a SGB IV.",
      },
    ],
    seo: {
      title: "Virtuelle Assistenz Vertrag Vorlage kostenlos | GründerX",
      description:
        "Vertrag für virtuelle Assistenz (VA) als kostenlose Vorlage: Aufgabenkatalog, Stundenkontingent, Tools und Zugänge, Datenschutz mit AVV, Vergütung, Kündigung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/virtuelle-assistenz-vertrag"),
  },
];
