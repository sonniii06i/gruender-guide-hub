/**
 * Indexierbare Listicles für SEO, AI-Suche und schnelle Orientierung (/listicles & /listicles/:slug).
 * Geschrieben in der GründerX Marken-Stimme (Stand 20.11.2026) + Human Writing:
 * kurz, scannbar, ein Gedanke je Punkt, Stand-Datum, keine erfundenen Zahlen oder Garantien.
 */

export interface ListiclePunkt {
  nummer: number;
  titel: string;
  kurz: string;
  detail: string;
  praxisTipp: string;
  risikoHinweis?: string;
}

export interface ListicleTabelle {
  titel: string;
  lead: string;
  kopf: string[];
  zeilen: string[][];
  fuss: string;
}

export interface Listicle {
  slug: string;
  kategorie: "US-Setup" | "Gründung" | "Unter 18" | "Nebengewerbe" | "Website & App";
  lesezeit: string;
  stand: string;
  standIso: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  titel: string;
  lead: string;
  zielgruppe: string;
  punkte: ListiclePunkt[];
  vergleichTabelle?: ListicleTabelle;
  voraussetzungenBox?: {
    titel: string;
    eintraege: { label: string; text: string }[];
  };
  naechsterSchritt: {
    titel: string;
    text: string;
    guideTo: string;
    guideLabel: string;
    quizTo: string;
    quizLabel: string;
  };
  quellen: { label: string; url: string }[];
}

export const LISTICLES: Listicle[] = [
  {
    slug: "amex-us-privat-vorteile",
    kategorie: "US-Setup",
    lesezeit: "3 Min.",
    stand: "November 2026",
    standIso: "2026-11-25",
    seoTitle: "US-Amex privat aus Deutschland: 7 Vorteile & echte Voraussetzungen",
    seoDescription: "Private US-Amex aus Deutschland per Global Transfer: 4x Punkte in Restaurants, 2x/Jahr DE-zu-US-Transfer, 1:1 zu Hilton & Avios und was du an Adresse, eSIM & Bankkonto brauchst.",
    eyebrow: "US-Setup · Stand November 2026",
    titel: "Private US-Amex aus Deutschland: 7 Gründe, warum sie sich lohnt",
    lead: "Eine private US-Amex beantragst du aus Deutschland heraus über den Global Transfer. Schon die US Amex Gold bringt deutlich stärkere Punkte-Raten und Transferkurse als deutsche Karten. Hier stehen die 7 wichtigsten Vorteile und die echten Voraussetzungen.",
    zielgruppe: "Reisende, Gründer und Selbstständige mit bestehender deutscher Amex",
    punkte: [
      {
        nummer: 1,
        titel: "Beantragung direkt aus Deutschland per Global Transfer",
        kurz: "Du brauchst keinen US-Credit-Score, wenn du bereits eine deutsche Amex hältst.",
        detail: "Über American Express Global Card Relationship zieht Amex US deine bestehende deutsche Amex-Historie heran. So startest du mit deiner ersten privaten US-Karte, ohne erst jahrelang US-Kreditpunkte aufzubauen.",
        praxisTipp: "Deine deutsche Amex sollte mindestens 3 Monate aktiv und sauber bezahlt sein, bevor du den Global Transfer anfragst.",
      },
      {
        nummer: 2,
        titel: "Zweimal im Jahr deutsche Punkte zum besseren Kurs in die USA holen",
        kurz: "Deine gesammelten deutschen Membership-Rewards-Punkte werden in den USA mehr wert.",
        detail: "Über den Amex-Support kannst du bis zu zweimal pro Jahr deine deutschen Membership-Rewards-Punkte auf dein US-Punktekonto übertragen. Durch den besseren Umrechnungskurs landet spürbar mehr Gegenwert auf deinem US-Konto.",
        praxisTipp: "Sammle in Deutschland regulär weiter und bündele deine Übertragungen auf zwei feste Zeitpunkte im Jahr.",
      },
      {
        nummer: 3,
        titel: "4x Punkte auf Restaurantbesuche auch in Deutschland",
        kurz: "Jedes Essen im Restaurant bringt in Deutschland viermal so viele Punkte wie sonst üblich.",
        detail: "Die US Amex Gold vergibt 4x Membership-Rewards-Punkte weltweit auf Restaurants und berechnet dabei 0 % Fremdwährungsgebühr. Damit lohnt sich die Karte im ganz normalen deutschen Alltag bei jedem Restaurantbesuch.",
        praxisTipp: "Prüfe vor dem Zahlen kurz die Amex-Akzeptanz. Bei Restaurants mit Amex-Terminal zählt der Umsatz direkt als 4x-Kategorie.",
      },
      {
        nummer: 4,
        titel: "1:1 und bessere Kurse bei Hilton Honors, Avios und Premium-Partnern",
        kurz: "In den USA tauschst du Punkte zu deutlich stärkeren Raten in Flüge und Hotels.",
        detail: "Während deutsche Amex-Konten oft 5:4 oder 3:2 tauschen, bieten US-Konten bei vielen Airline- und Hotelpartnern 1:1 oder bessere Kurse (z. B. Avios bei British Airways, Iberia, Qatar Airways oder Partner-Transfers zu Hilton Honors). Zusätzlich laufen in den USA regelmäßig Transfer-Boni.",
        praxisTipp: "Übertrage Punkte erst dann zum Partner, wenn dein konkreter Flug oder dein Hotel verfügbar ist.",
      },
      {
        nummer: 5,
        titel: "Schon die US Amex Gold reicht als starker Einstieg",
        kurz: "Du musst nicht sofort mit der teuersten Karte starten.",
        detail: "Viele unterschätzen die US Amex Gold: Sie kombiniert die 4x-Restaurant-Rate, 0 % Fremdwährungsgebühr und einen soliden Willkommensbonus bei überschaubarer Jahresgebühr. Danach kannst du dein Setup Schritt für Schritt ausbauen.",
        praxisTipp: "Erst eine Karte sauber einrichten und monatlich pünktlich über dein US-Bankkonto ausgleichen, dann die nächste planen.",
      },
      {
        nummer: 6,
        titel: "Hohe Willkommensboni: Größenordnung 500.000 Punkte über mehrere Karten",
        kurz: "Mehrere US-Karten-Boni summieren sich auf Gegenwerte für mehrere Business-Class-Flüge.",
        detail: "Wer über Zeit neben der Gold-Karte weitere US-Karten beantragt und die jeweiligen Mindestumsätze regulär erfüllt, erreicht realistisch Größenordnungen von rund 500.000 Punkten. Je nach Strecke, Saison und Verfügbarkeit entspricht das grob vier Business-Class-Flügen.",
        praxisTipp: "Rechenbeispiel ohne Garantie: Plane nur Umsätze, die du ohnehin hast, und gleiche jede Abrechnung jeden Monat vollständig aus.",
      },
      {
        nummer: 7,
        titel: "Saubere Basis für den späteren Schritt zur US-Business-Amex",
        kurz: "Mit der ersten privaten US-Karte baust du Vertrauen bei American Express US auf.",
        detail: "Wenn du später zusätzlich mit einer US-LLC und EIN eine US-Business-Amex beantragen möchtest, hilft dir deine laufende US-Kartenhistorie enorm. Wichtig bleibt die klare Trennung zwischen privaten und geschäftlichen Konten.",
        praxisTipp: "Erst die private US-Amex sauber laufen lassen, danach Business-Karten oder EIN-only-Alternativen wie Mercury IO prüfen.",
      },
    ],
    vergleichTabelle: {
      titel: "Vergleich: Deutsche Amex vs. Private US-Amex & Setup-Kosten (Stand 25.11.2026)",
      lead: "Konkrete Werte und Praxis-Bedingungen auf einen Blick, damit du Aufwand und Nutzen vor dem Antrag ehrlich abwägen kannst.",
      kopf: ["Bereich", "Deutsche Amex (Standard)", "Private US-Amex (z. B. Gold)", "Praxis-Hinweis"],
      zeilen: [
        ["Restaurants in DE", "1x (mit Turbo 1,5x) Punkte", "4x Punkte weltweit, 0 % FX", "Lohnt sich im deutschen Alltag sofort"],
        ["Transfer zu Avios / Hilton", "oft 5:4 oder 3:2", "1:1 bzw. bessere US-Kurse", "Deutlich mehr Flug- und Hotelwert je Punkt"],
        ["DE-zu-US-Transfer", "nur als Abgang", "bis zu 2x pro Jahr möglich", "Deutsche Punkte im US-Konto bündeln"],
        ["US-Wohnadresse + Utility-Bill", "nicht nötig", "z. B. Cloud Residence, ca. 300 € / Quartal", "Echte Wohnadresse statt Briefkasten"],
        ["US-Mobilfunknummer", "nicht nötig", "Tello eSIM ab ca. 6 bis 10 $ / Monat", "Pflicht für Amex-Verifizierungsanruf"],
        ["US-Bankkonto", "DE-IBAN reicht", "Chase / Bank of America (sicher) vs. Wise (Risiko)", "Filialbank braucht US-Besuch + Reisepass"],
      ],
      fuss: "Stand 25.11.2026. Gebühren, Punkteraten und Transferkurse können von American Express und den genannten Anbietern jederzeit angepasst werden.",
    },
    voraussetzungenBox: {
      titel: "Ehrliche Voraussetzungen vor dem Antrag (Reihenfolge einhalten)",
      eintraege: [
        {
          label: "US-Wohnadresse + Utility-Bill",
          text: "Echte US-Wohnadresse (z. B. über Cloud Residence, ca. 300 € im Quartal) plus Utility-Rechnung als Adressnachweis (oft direkt über Cloud Residence oder über die US-Mobilfunkrechnung).",
        },
        {
          label: "US-Telefonnummer per eSIM",
          text: "Echter US-Provider wie Tello per eSIM aus Deutschland nutzbar. Amex ruft regelmäßig zur Verifizierung an und erwartet ein kurzes Gespräch.",
        },
        {
          label: "US-Bankkonto (ehrlicher Risiko-Hinweis)",
          text: "Mit Wise kannst du es versuchen: Kommt keine Bankprüfung, hast du Glück; kommt eine Rückfrage, scheitert der Antrag. Auf der sicheren Seite bist du mit einer echten US-Filialbank (z. B. Chase oder Bank of America) per Filialbesuch in den USA und Reisepass.",
        },
      ],
    },
    naechsterSchritt: {
      titel: "Schritt für Schritt zur eigenen US-Amex",
      text: "Im Amex-US-Guide gehen wir jede Voraussetzung in der richtigen Reihenfolge durch. Oder prüfe im 60-Sekunden-Check, was dir noch fehlt.",
      guideTo: "/guides/amex-us-beantragen",
      guideLabel: "Zum Amex-US-Guide",
      quizTo: "/quiz/us-amex-check",
      quizLabel: "US-Amex-Check starten",
    },
    quellen: [
      { label: "American Express US: Global Card Relationship", url: "https://www.americanexpress.com/us/credit-cards/features-benefits/us-newcomers/" },
      { label: "Tello Mobile (US eSIM & Wi-Fi Calling)", url: "https://tello.com" },
    ],
  },
  {
    slug: "gruendung-fehler-reihenfolge",
    kategorie: "Gründung",
    lesezeit: "3 Min.",
    stand: "November 2026",
    standIso: "2026-11-25",
    seoTitle: "5 Reihenfolge-Fehler beim Gründen (und wie du sie vermeidest)",
    seoDescription: "Erst Gewerbe, dann Fragebogen, LUCID vor dem ersten Paket: 5 häufige Reihenfolge-Fehler beim Start in Deutschland mit Fristen und Paragrafen.",
    eyebrow: "Gründung · Stand November 2026",
    titel: "5 Reihenfolge-Fehler beim Gründen, die dich Wochen kosten",
    lead: "Beim Gründen scheitern die meisten an der falschen Reihenfolge. Wenn du diese fünf Schritte sauber nacheinander erledigst, bleiben Formulare und Marktplätze ruhig.",
    zielgruppe: "Alle, die in Deutschland ihr erstes Gewerbe oder ihren ersten Shop starten",
    punkte: [
      {
        nummer: 1,
        titel: "Erst verkaufen, dann anmelden",
        kurz: "Das Gewerbe meldest du gleichzeitig mit dem Start an (§ 14 GewO).",
        detail: "Viele testen erst monatelang und holen den Gewerbeschein später. Gerade auf Marktplätzen wie Amazon oder TikTok Shop führt das schnell zu gesperrten Auszahlungen oder inaktiven Angeboten.",
        praxisTipp: "Zuerst prüfen, ob du ein Gewerbe oder einen freien Beruf ausübst, dann vor dem ersten Verkauf anmelden.",
      },
      {
        nummer: 2,
        titel: "Die Ein-Monats-Frist beim Finanzamt übersehen",
        kurz: "Der Fragebogen zur steuerlichen Erfassung muss innerhalb eines Monats raus (§ 138 Abs. 4 AO).",
        detail: "Die Frist läuft ab dem Beginn deiner Tätigkeit, nicht erst ab dem Brief vom Finanzamt. Ohne abgeschickten Fragebogen wartest du unnötig auf deine Steuernummer.",
        praxisTipp: "ELSTER-Zugang direkt am ersten Tag beantragen, weil der Aktivierungsbrief per Post einige Tage dauert.",
      },
      {
        nummer: 3,
        titel: "Bei der Kleinunternehmerregelung im falschen Feld ankreuzen",
        kurz: "Ein Verzicht auf die Kleinunternehmerregelung bindet dich fünf Kalenderjahre (§ 19 Abs. 3 UStG).",
        detail: "Seit 2025 gelten die neuen Grenzen von 25.000 € im Vorjahr und 100.000 € im laufenden Jahr. Wer unüberlegt verzichtet, bleibt fünf Jahre an die Regelbesteuerung gebunden.",
        praxisTipp: "Vor dem Kreuz im Fragebogen prüfen, ob du an Privatkunden oder Unternehmen verkaufst und wie hoch deine Start-Einkäufe sind.",
      },
      {
        nummer: 4,
        titel: "Das erste Paket ohne LUCID-Nummer verschicken",
        kurz: "Verpackungen registrierst du vor dem ersten Versand an Privatkunden (§ 6 VerpackDG).",
        detail: "Sobald du Ware verpackt an Endkunden sendest, brauchst du eine LUCID-Registrierung und einen Vertrag bei einem dualen System. Marktplätze fragen die Nummer aktiv ab.",
        praxisTipp: "Mit unserem kostenlosen LUCID-Wizard siehst du in zwei Minuten, welche Mengen und Kosten auf dich zukommen.",
      },
      {
        nummer: 5,
        titel: "Privatkonto und Geschäftsgeld mischen",
        kurz: "Ein getrenntes Konto spart dir ab der ersten Rechnung Stunden bei der Steuer.",
        detail: "Wenn private Einkäufe, Miete und geschäftliche Einnahmen auf demselben Konto landen, wird jede EÜR unnötig kompliziert und fehleranfällig.",
        praxisTipp: "Für Einzelunternehmen reicht zum Start ein günstiges oder kostenloses separates Geschäftskonto.",
      },
    ],
    naechsterSchritt: {
      titel: "Deinen persönlichen Start-Fahrplan holen",
      text: "Mach den 60-Sekunden-Gründertyp-Check und sieh genau, was bei dir zuerst kommt und was warten kann.",
      guideTo: "/guides/einzelunternehmen-gruendung",
      guideLabel: "Zum Gründungs-Guide",
      quizTo: "/quiz/gruendertyp",
      quizLabel: "Gründertyp-Quiz starten",
    },
    quellen: [
      { label: "§ 14 GewO (Gewerbeanzeige)", url: "https://www.gesetze-im-internet.de/gewo/__14.html" },
      { label: "§ 138 AO (Steuerliche Erfassung)", url: "https://www.gesetze-im-internet.de/ao_1977/__138.html" },
      { label: "§ 19 UStG (Kleinunternehmerregelung)", url: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
    ],
  },
  {
    slug: "u18-gruenden-regeln",
    kategorie: "Unter 18",
    lesezeit: "3 Min.",
    stand: "November 2026",
    standIso: "2026-11-25",
    seoTitle: "Unter 18 gründen: 6 Regeln für Jugendliche und Eltern (2026)",
    seoDescription: "Ab 12 bis 17 ein Projekt oder Gewerbe starten: Was Eltern unterschreiben müssen, wann das Familiengericht (§ 112 BGB) prüft und was heute schon ohne Gewerbe geht.",
    eyebrow: "Unter 18 & Eltern · Stand November 2026",
    titel: "Unter 18 ein eigenes Business starten: 6 Dinge, die du und deine Eltern wissen müssen",
    lead: "Du bist zwischen 12 und 17 und willst eine Website, eine App, einen Kanal oder ein erstes Produkt aufbauen? Das geht in Deutschland klar geregelt, wenn du deine Eltern früh einbindest.",
    zielgruppe: "Schülerinnen, Schüler (12 bis 17 Jahre) und ihre Eltern",
    punkte: [
      {
        nummer: 1,
        titel: "Lernen, bauen und testen geht sofort ohne Amt",
        kurz: "Website bauen, App programmieren, Portfolio erstellen: dafür brauchst du noch kein Gewerbe.",
        detail: "Ein Gewerbe wird erst Thema, wenn du dauerhaft mit Gewinnabsicht Geld verdienst. Du kannst also erst dein Projekt fertig bauen und prüfen, ob es echte Nachfrage gibt.",
        praxisTipp: "Nutze die Zeit vor der ersten Einnahme, um dein Produkt, deine Website oder deine App sauber fertigzustellen.",
      },
      {
        nummer: 2,
        titel: "Eltern von Anfang an ins Boot holen",
        kurz: "Bis zum 18. Geburtstag vertreten dich deine Erziehungsberechtigten rechtlich.",
        detail: "Verträge, Zahlungsanbieter, Domain-Registrierungen und Behördenanträge laufen unter 18 immer mit Zustimmung der Eltern. Ein offenes Gespräch am Küchentisch spart später viel Ärger.",
        praxisTipp: "Zeigt euch gemeinsam den U18-Check: Dort stehen alle Schritte und Kosten schwarz auf weiß.",
      },
      {
        nummer: 3,
        titel: "Wann das Familiengericht ins Spiel kommt (§ 112 BGB)",
        kurz: "Für ein eigenes Gewerbe auf deinen Namen braucht es Eltern und Familiengericht.",
        detail: "Wenn du ein eigenes Erwerbsgeschäft selbstständig führen möchtest, müssen deine Eltern zustimmen und das Familiengericht genehmigt den Antrag nach § 112 BGB. Dafür fragt das Gericht nach einem kurzen Konzept und schaut oft auch auf schulische Belastbarkeit.",
        praxisTipp: "Im GründerX-Guide Einzelunternehmen (U18-Spezial) findest du die komplette Vorlage für den Antrag ans Familiengericht.",
      },
      {
        nummer: 4,
        titel: "Auf Plattform-Altersgrenzen achten",
        kurz: "Stripe, PayPal, App Store und TikTok Shop verlangen oft Volljährigkeit.",
        detail: "Selbst mit genehmigtem Gewerbe lassen viele Zahlungsanbieter eigene Konten erst ab 18 zu. Prüfe vor dem Launch die Teilnahmebedingungen deiner Plattform.",
        praxisTipp: "Starte bei digitalen Projekten erst mit der Fertigstellung und prüfe mit deinen Eltern, welche Plattform ab welchem Alter erlaubt ist.",
      },
      {
        nummer: 5,
        titel: "Familienversicherung und Kindergeld im Blick behalten",
        kurz: "Bei regelmäßigem Einkommen gelten Grenzen in der gesetzlichen Familienversicherung.",
        detail: "Solange dein monatliches Gesamteinkommen unter der jeweiligen Grenze der Krankenkasse liegt, bleibst du kostenfrei familienversichert. Bei höheren Einnahmen sollte vorher kurz bei der Krankenkasse nachgefragt werden.",
        praxisTipp: "Einnahmen und Ausgaben von Tag 1 in einer simplen Liste festhalten, damit ihr die Zahlen immer kennt.",
      },
      {
        nummer: 6,
        titel: "Steuern erst ab dem Grundfreibetrag, Meldung aber trotzdem sauber",
        kurz: "Einkommensteuer fällt erst oberhalb des Grundfreibetrags an, die Anmeldung bleibt Pflicht.",
        detail: "Auch wenn am Ende 0 € Einkommensteuer fällig sind, müssen Einnahmen aus einer selbstständigen Tätigkeit sauber erfasst und im Rahmen der Steuererklärung gemeldet werden.",
        praxisTipp: "Wählt beim Start die Kleinunternehmerregelung, wenn ihr an Privatpersonen verkauft und kleine Umsätze erwartet.",
      },
    ],
    naechsterSchritt: {
      titel: "U18-Check mit deinen Eltern machen",
      text: "Prüft in 60 Sekunden, was du in deinem Alter sofort starten kannst und welche Dokumente ihr braucht.",
      guideTo: "/u18-gruenden",
      guideLabel: "Zur U18-Übersicht",
      quizTo: "/quiz/u18-check",
      quizLabel: "U18-Check starten",
    },
    quellen: [
      { label: "§ 112 BGB (Selbstständiger Betrieb eines Erwerbsgeschäfts)", url: "https://www.gesetze-im-internet.de/bgb/__112.html" },
      { label: "§ 14 GewO (Gewerbeanzeige)", url: "https://www.gesetze-im-internet.de/gewo/__14.html" },
    ],
  },
  {
    slug: "nebengewerbe-7-pflichten",
    kategorie: "Nebengewerbe",
    lesezeit: "3 Min.",
    stand: "November 2026",
    standIso: "2026-11-25",
    seoTitle: "Nebengewerbe anmelden: 7 Pflichten in der richtigen Reihenfolge",
    seoDescription: "Neben dem Hauptjob gründen: Arbeitgeber informieren, Gewerbeamt, ELSTER, 24.500 € Freibetrag verstehen, Krankenkasse und erste Rechnung.",
    eyebrow: "Nebengewerbe · Stand November 2026",
    titel: "Nebengewerbe neben dem Hauptjob: 7 Pflichten von zuerst bis kann warten",
    lead: "Die meisten Gründungen in Deutschland starten nebenberuflich. Wenn du diese sieben Punkte in Reihenfolge abhakst, kollidiert dein Nebenprojekt weder mit dem Hauptjob noch mit dem Finanzamt.",
    zielgruppe: "Angestellte, die abends oder am Wochenende ihr erstes eigenes Projekt aufbauen",
    punkte: [
      {
        nummer: 1,
        titel: "Arbeitsvertrag prüfen und Arbeitgeber informieren",
        kurz: "Zuerst ein kurzer Blick in deinen Vertrag, dann eine sachliche Anzeige.",
        detail: "Viele Arbeitsverträge verlangen eine Mitteilung bei Nebentätigkeiten. Solange du keine Konkurrenz machst und deine Hauptarbeit nicht leidet, darf der Arbeitgeber das in der Regel nicht einfach verbieten.",
        praxisTipp: "Kurz schriftlich anzeigen: Art der Tätigkeit, maximaler Wochenumfang und Hinweis, dass sie außerhalb der Arbeitszeit stattfindet.",
      },
      {
        nummer: 2,
        titel: "Gewerbe oder Freiberuf sauber trennen",
        kurz: "Nicht jede Tätigkeit braucht einen Gewerbeschein.",
        detail: "Handel, E-Commerce und klassische Agentur-Vermittlung sind Gewerbe. Reine Beratung in Katalogberufen, Design oder Text können freiberuflich sein. Das spart den Gang zum Gewerbeamt und die Gewerbesteuer.",
        praxisTipp: "Im Zweifel prüfst du die Abgrenzung vorab mit unserem Gewerbe-Check.",
      },
      {
        nummer: 3,
        titel: "Krankenkasse kurz melden",
        kurz: "Nebenberuflich bleibt deine Hauptbeschäftigung in der Regel sozialversicherungspflichtig führend.",
        detail: "Solange dein Hauptjob zeitlich und wirtschaftlich im Vordergrund steht (Faustregel der Kassen: unter 20 Stunden pro Woche und Gewinn unter dem Hauptgehalt), zahlst du meist keine zusätzlichen GKV-Beiträge auf das Nebengewerbe.",
        praxisTipp: "Einmal kurz bei deiner Krankenkasse melden, damit du eine schriftliche Bestätigung der Nebenberuflichkeit hast.",
      },
      {
        nummer: 4,
        titel: "Fragebogen zur steuerlichen Erfassung binnen eines Monats",
        kurz: "Geht komplett digital über ELSTER.",
        detail: "Hier schätzt du deinen Gewinn für das laufende und das nächste Jahr und entscheidest dich für oder gegen die Kleinunternehmerregelung (Grenzen: 25.000 € Vorjahr, 100.000 € laufendes Jahr).",
        praxisTipp: "Realistisch niedrig schätzen, damit das Finanzamt keine zu hohen Vorauszahlungen festsetzt.",
      },
      {
        nummer: 5,
        titel: "Den 24.500-€-Freibetrag richtig verstehen",
        kurz: "Der Freibetrag gilt nur für die Gewerbesteuer, nicht für die Einkommensteuer.",
        detail: "Dein Gewinn aus dem Nebengewerbe wird bei der Einkommensteuer zu deinem regulären Gehalt addiert und mit deinem persönlichen Grenzsteuersatz besteuert.",
        praxisTipp: "Lege von jedem Gewinn direkt eine Steuer-Rücklage auf ein separates Unterkonto.",
      },
      {
        nummer: 6,
        titel: "Plattform-Meldegrenze kennen (30 Verkäufe oder 2.000 €)",
        kurz: "Marktplätze melden dich ab 30 Verkäufen oder 2.000 € Umsatz im Jahr ans BZSt (PStTG).",
        detail: "Diese Schwelle ist eine automatische Meldepflicht von Amazon, eBay, Vinted oder Etsy an das Bundeszentralamt für Steuern. Mit einer Befreiung von der Einkommensteuer hat sie nichts zu tun.",
        praxisTipp: "Wenn du planmäßig mit Gewinnabsicht verkaufst, melde dich sauber an statt auf eine Grenze zu hoffen.",
      },
      {
        nummer: 7,
        titel: "Einfache Belegablage ab Tag 1",
        kurz: "Jede Rechnung und jeden Einkaufsbeleg monatlich in einen Ordner legen.",
        detail: "Für die Anlage EÜR am Jahresende brauchst du keine doppelte Buchführung, aber lückenlose Belege für Einnahmen und Ausgaben.",
        praxisTipp: "Monatlich 15 Minuten am Monatsende reichen, wenn du von Beginn an Ordnung hältst.",
      },
    ],
    naechsterSchritt: {
      titel: "Nebengewerbe sauber aufsetzen",
      text: "Starte mit dem Steuer-Quiz oder öffne unsere Nebengewerbe-Übersicht mit allen Gratis-Checks.",
      guideTo: "/nebengewerbe",
      guideLabel: "Zur Nebengewerbe-Seite",
      quizTo: "/quiz/steuern-wissen",
      quizLabel: "Steuer-Quiz starten",
    },
    quellen: [
      { label: "§ 11 GewStG (24.500 € Freibetrag)", url: "https://www.gesetze-im-internet.de/gewstg/__11.html" },
      { label: "§ 4 PStTG (Plattformen-Steuertransparenzgesetz)", url: "https://www.gesetze-im-internet.de/psttg/__4.html" },
    ],
  },
  {
    slug: "website-app-launch-schritte",
    kategorie: "Website & App",
    lesezeit: "3 Min.",
    stand: "November 2026",
    standIso: "2026-11-25",
    seoTitle: "Eigene Website oder App starten: 7 Schritte bis zum Launch",
    seoDescription: "Von der Idee zur ersten Website oder App im App Store und Play Store: Name, Domain, Impressum, Payment, Store-Review und Steuern in der richtigen Reihenfolge.",
    eyebrow: "Website & App · Stand November 2026",
    titel: "Von der Idee zur eigenen Website oder App: 7 Schritte bis zum Launch",
    lead: "Eine Website oder App steht heute schnell online. Die häufigsten Hürden liegen bei Domain-Rechten, Impressum, Store-Accounts und der ersten Auszahlung.",
    zielgruppe: "Einsteiger, Schüler, Studierende, Entwickler und Gründer mit digitaler Idee",
    punkte: [
      {
        nummer: 1,
        titel: "Namen gegen Marken und Domains prüfen",
        kurz: "Vor Logo und Code einmal DPMA, EUIPO und Domains checken.",
        detail: "Nichts bremst härter als ein fertiges Produkt unter einem Namen, der bereits markenrechtlich geschützt ist.",
        praxisTipp: "Nutze unseren kostenlosen Brand-Check, um Name, Domain und Handles in einem Durchgang zu prüfen.",
      },
      {
        nummer: 2,
        titel: "Klein starten: Ein Problem, eine klare Seite oder ein Screen",
        kurz: "Lieber in zwei Wochen mit einer funktionierenden Kernfunktion live gehen.",
        detail: "Die meisten Projekte bleiben liegen, weil der Umfang zu groß geplant wird. Definiere genau ein Ziel, das ein Nutzer am Ende erreicht.",
        praxisTipp: "Schreibe in einem Satz auf, was dein erster Nutzer in 60 Sekunden auf deiner Seite oder App erledigen kann.",
      },
      {
        nummer: 3,
        titel: "Pflichtangaben direkt mit einbauen",
        kurz: "Impressum und Datenschutzerklärung gehören ab dem ersten öffentlichen Aufruf dazu.",
        detail: "Sobald deine Website oder App öffentlich erreichbar ist und geschäftlich oder mit Werbung/Affiliates betrieben wird, verlangt das deutsche Recht ein erreichbares Impressum (§ 5 DDG) und eine passende Datenschutzerklärung.",
        praxisTipp: "Verlinke Impressum und Datenschutz von jeder Seite und im App-Store-Eintrag.",
      },
      {
        nummer: 4,
        titel: "Für Apps: Developer-Accounts früh anlegen",
        kurz: "Apple Developer und Google Play Console brauchen Verifizierung und Vorlauf.",
        detail: "Apple verlangt eine jährliche Gebühr und bei Firmen eine D-U-N-S-Nummer. Google Play verlangt bei neuen privaten Entwicklerkonten vor der Veröffentlichung einen geschlossenen Test mit mindestens 12 Testern über 14 Tage.",
        praxisTipp: "Lege die Store-Konten mindestens 3 bis 4 Wochen vor deinem geplanten Launch-Tag an.",
      },
      {
        nummer: 5,
        titel: "Sichtbarkeit von Tag 1 einplanen (SEO & AI)",
        kurz: "Klare Überschriften, echte Antworten, Sitemap und Search Console.",
        detail: "Wenn deine Website nur leeres JavaScript ausliefert, übersehen Suchmaschinen und KI-Antwortmaschinen deinen Inhalt. Statisches HTML, klare Fragen und saubere Meta-Daten machen den Unterschied.",
        praxisTipp: "Melde deine Domain direkt am Launch-Tag in der Google Search Console an und reiche die Sitemap ein.",
      },
      {
        nummer: 6,
        titel: "Zahlung und Steuern vor dem ersten Euro klären",
        kurz: "Bei App-Store-Auszahlungen und Stripe-Umsätzen gelten klare Umsatzsteuer-Regeln.",
        detail: "Apple und Google sitzen für Europa in Irland. Deine Auszahlungen sind häufig Reverse-Charge-Umsätze, für die du eine USt-IdNr. und eine Zusammenfassende Meldung (ZM) brauchst.",
        praxisTipp: "Beantrage deine USt-IdNr. direkt im Fragebogen zur steuerlichen Erfassung mit.",
      },
      {
        nummer: 7,
        titel: "Erste 10 Nutzer beobachten und direkt verbessern",
        kurz: "Echtes Feedback schlägt jedes geratene Feature.",
        detail: "Schau zu, wo echte Menschen hängen bleiben, kürze Texte und vereinfache Klickwege.",
        praxisTipp: "Starte mit unserem Website- oder App-Guide im GründerX-Cockpit und hake jeden Schritt nacheinander ab.",
      },
    ],
    naechsterSchritt: {
      titel: "Website oder App Schritt für Schritt live bringen",
      text: "Im GründerX-Lernsystem klickst du dich durch den kompletten Website- oder App-Launch-Guide.",
      guideTo: "/webseite-und-app",
      guideLabel: "Zur Website- & App-Seite",
      quizTo: "/quiz/gruendertyp",
      quizLabel: "Deinen Lernpfad finden",
    },
    quellen: [
      { label: "§ 5 DDG (Impressumspflicht)", url: "https://www.gesetze-im-internet.de/ddg/__5.html" },
      { label: "Apple Developer Program", url: "https://developer.apple.com/programs/" },
      { label: "Google Play Console Hilfe", url: "https://support.google.com/googleplay/android-developer/" },
    ],
  },
];

export const getListicle = (slug: string) => LISTICLES.find((l) => l.slug === slug);
