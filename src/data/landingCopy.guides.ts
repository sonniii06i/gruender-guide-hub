import type { LandingCopy } from "./landingCopy";

// Bespoke-Landing-Copy pro Guide-Slug. Generiert; fehlt ein Slug, greift der Fallback.
export const GUIDE_COPY: Record<string, LandingCopy> = {
  "gmbh-gruendung": {
    "seoTitle": "GmbH gründen 2026 – Anleitung, Ablauf & Kosten",
    "seoDescription": "GmbH in Deutschland gründen: vom Notar bis zum Handelsregister-Eintrag. Schritt für Schritt zu Konto, Steuernummer & Gewerbeschein in 4–6 Wochen.",
    "lead": "Dieser Guide führt dich Schritt für Schritt von der Idee zur eingetragenen GmbH – Notartermin, Stammkapital, Handelsregister und alle Pflicht-Anmeldungen inklusive. Für Gründer, die sauber mit Haftungsbeschränkung starten wollen.",
    "urgency": "Die GmbH ist die Rechtsform für ernsthaftes Wachstum – aber genau hier passieren die teuren Fehler. Ein schiefer Gesellschaftsvertrag, eine vergessene Anmeldung oder ein falsch eingezahltes Stammkapital kosten dich Wochen, zusätzliche Notargebühren und im schlimmsten Fall die persönliche Haftung. Jede verschobene Woche ist Umsatz, den du nicht abrechnen kannst. Geh den Weg Schritt für Schritt mit GründerX und hab am Ende eine GmbH, die rechtlich und steuerlich von Tag eins sauber steht.",
    "outcomes": [
      "Eine im Handelsregister eingetragene GmbH mit eigener Rechtspersönlichkeit",
      "Geschäftskonto mit eingezahltem Stammkapital und Einzahlungsbestätigung",
      "Steuernummer vom Finanzamt und ausgefüllter Fragebogen zur steuerlichen Erfassung",
      "Gewerbeschein und alle Pflicht-Anmeldungen (IHK, ggf. Berufsgenossenschaft)",
      "Notariell beurkundeter Gesellschaftsvertrag und Geschäftsführer-Bestellung"
    ],
    "disclaimer": "Dieser Guide ist eine strukturierte Orientierung, keine Rechts- oder Steuerberatung – Notar-, Handelsregister- und Behörden-Anforderungen können sich ändern."
  },
  "ug-gruendung": {
    "seoTitle": "UG gründen 2026 – Anleitung, Kosten & Ablauf",
    "seoDescription": "UG (haftungsbeschränkt) gründen ab 1 € Stammkapital: schnell & günstig zur eingetragenen Mini-GmbH mit Konto und Steuernummer in 3–5 Wochen.",
    "lead": "Dieser Guide zeigt dir Schritt für Schritt, wie du eine UG (haftungsbeschränkt) günstig per Musterprotokoll oder mit Individualsatzung gründest – inklusive Geschäftskonto, Steuernummer und Roadmap zur späteren GmbH. Ideal für Gründer mit kleinem Budget.",
    "urgency": "Die UG ist der schnellste Weg zur Haftungsbeschränkung – schon ab 1 € Stammkapital. Doch wer beim Musterprotokoll falsch abbiegt oder die Rücklagenpflicht ignoriert, baut sich Probleme ein, die später bei der GmbH-Umwandlung teuer werden. Jede Woche ohne Haftungsschutz ist ein vermeidbares Risiko für dein Privatvermögen. Geh die Gründung Schritt für Schritt mit GründerX und starte mit einer UG, die sauber sitzt und auf Wachstum vorbereitet ist.",
    "outcomes": [
      "Eine im Handelsregister eingetragene UG (haftungsbeschränkt)",
      "Geschäftskonto mit eingezahltem Stammkapital",
      "Steuernummer und ausgefüllter Fragebogen zur steuerlichen Erfassung",
      "Gewerbe- und IHK-Anmeldung sowie Eintrag im Transparenzregister",
      "Konkrete Roadmap und Rücklagen-Plan zur späteren Umwandlung in eine GmbH"
    ],
    "disclaimer": "Dieser Guide bietet strukturierte Orientierung und ersetzt keine Rechts- oder Steuerberatung – Musterprotokoll- und Behörden-Vorgaben können sich ändern."
  },
  "einzelunternehmen-gruendung": {
    "seoTitle": "Einzelunternehmen gründen – Anleitung & Kosten",
    "seoDescription": "Einzelunternehmen anmelden – der schnellste Weg ins Business. Mit GewA1, Steuernummer & Konto in 1–3 Wochen, inkl. Familiengericht-Antrag für U18.",
    "lead": "Dieser Guide bringt dich Schritt für Schritt zum angemeldeten Einzelunternehmen – mit ausgefülltem GewA1-Formular, Steuernummer und Geschäftskonto. Inklusive Spezial-Track für Minderjährige mit familiengerichtlicher Genehmigung.",
    "urgency": "Ein Einzelunternehmen ist in Tagen angemeldet – aber genau die scheinbar simplen Schritte stolpern viele: falsch ausgefülltes GewA1, vergessene Finanzamt-Anmeldung oder bei U18 ein fehlender Familiengerichts-Beschluss, der das ganze Business blockiert. Jeder Tag ohne Anmeldung ist Umsatz, den du nicht legal abrechnen kannst – und Verzug kann ein Bußgeld kosten. Geh die Anmeldung Schritt für Schritt mit GründerX und sei in Tagen statt Wochen offiziell startklar.",
    "outcomes": [
      "Angemeldetes Einzelunternehmen mit ausgefülltem GewA1 und Gewerbeschein",
      "Steuernummer und eingereichter Fragebogen zur steuerlichen Erfassung",
      "Getrenntes Geschäftskonto für saubere Buchhaltung",
      "Klärung der Kleinunternehmer-Frage nach §19 UStG",
      "Bei U18: gestellter Familiengericht-Antrag und Genehmigungs-Beschluss"
    ],
    "disclaimer": "Dieser Guide ist strukturierte Orientierung, keine Rechts- oder Steuerberatung – Gewerbeamt- und Familiengericht-Anforderungen können je nach Bundesland abweichen."
  },
  "holding": {
    "seoTitle": "Holding gründen 2026 – Struktur, Steuer & Kosten",
    "seoDescription": "Holding-Struktur aufbauen: Holding-GmbH + operative GmbH für ~1,5 % Steuer auf Ausschüttungen. Schritt für Schritt zur 2-Stufen-Struktur in 6–10 Wochen.",
    "lead": "Dieser Guide erklärt dir Schritt für Schritt, wie du eine Holding-GmbH über deiner operativen GmbH aufbaust – für rund 1,5 % Steuer auf Ausschüttungen und gezielten Vermögensaufbau in der Holding. Für Gründer, die langfristig clever strukturieren.",
    "urgency": "Eine Holding-Struktur spart bei Ausschüttungen und Exit massiv Steuern – aber nur, wenn die Reihenfolge stimmt. Wer die operative GmbH zuerst gründet und die Holding nachschiebt, verschenkt das Steuerprivileg oder löst eine Schenkungssteuer aus. Solche Fehler lassen sich später kaum noch heilen und kosten fünfstellig. Bau die zweistufige Struktur Schritt für Schritt mit GründerX in der richtigen Abfolge auf und sichere dir die steuerlichen Vorteile von Anfang an.",
    "outcomes": [
      "Eingetragene Holding-GmbH mit 25.000 € Stammkapital als Muttergesellschaft",
      "Operative GmbH, deren Anteile von der Holding gehalten werden",
      "Steuerlich optimierte 2-Stufen-Struktur mit ~1,5 % Last auf Ausschüttungen",
      "Saubere Beteiligungs-Dokumentation und Konzern-Buchhaltungs-Setup",
      "Strategie für Vermögensaufbau und Reinvestition innerhalb der Holding"
    ],
    "disclaimer": "Dieser Guide gibt strukturierte Orientierung und ersetzt keine Steuer- oder Rechtsberatung – Holding-Gestaltungen sind komplex und steuerliche Rahmenbedingungen können sich ändern."
  },
  "kleinunternehmer": {
    "seoTitle": "Kleinunternehmer-Regelung §19 UStG nutzen",
    "seoDescription": "Kleinunternehmer-Regelung clever nutzen: keine Umsatzsteuer nach §19 UStG. Saubere Anmeldung & Roadmap zur Regelbesteuerung – in 1 Woche erledigt.",
    "lead": "Dieser Guide führt dich Schritt für Schritt durch die Kleinunternehmer-Regelung nach §19 UStG – von der korrekten Anmeldung bis zur Roadmap, wann sich der Wechsel zur Regelbesteuerung lohnt. Für Gründer mit kleinem Umsatz, die es einfach halten wollen.",
    "urgency": "Die Kleinunternehmer-Regelung spart dir Umsatzsteuer-Voranmeldungen und Bürokratie – aber sie ist nicht für jeden die richtige Wahl. Wer sie blind ankreuzt, verschenkt bei hohen Anfangsinvestitionen den Vorsteuerabzug oder rutscht unbemerkt über die Umsatzgrenze und schuldet dem Finanzamt rückwirkend USt. Diese Fehler kosten bares Geld. Triff die Entscheidung Schritt für Schritt mit GründerX – mit klarer Anmeldung und einer Roadmap, die zu deinem Geschäft passt.",
    "outcomes": [
      "Korrekt im Fragebogen zur steuerlichen Erfassung gewählte §19-Option",
      "Verständnis, wann sich die Regelung lohnt – und wann nicht",
      "Rechnungs-Vorlage mit dem korrekten §19-UStG-Hinweis",
      "Überblick über die aktuellen Umsatzgrenzen und Folgen beim Überschreiten",
      "Klare Roadmap für den Wechsel zur Regelbesteuerung"
    ],
    "disclaimer": "Dieser Guide ist strukturierte Orientierung, keine Steuerberatung – Umsatzgrenzen und Vorgaben des §19 UStG können sich ändern."
  },
  "marke-anmelden": {
    "seoTitle": "Marke anmelden 2026 – DPMA, EUIPO & Kosten",
    "seoDescription": "Marke anmelden bei DPMA, EUIPO oder WIPO: Schritt für Schritt zu 10 Jahren Schutz für deine Brand ab 290 €. Inkl. Domain-Check & Watch-Setup.",
    "lead": "Dieser Guide zeigt dir Schritt für Schritt, wie du deine Marke bei DPMA, EUIPO oder international über Madrid (WIPO) anmeldest – inklusive Marken-Typ-Wahl, Domain-Check, Klassen-Auswahl und Watch-Setup. Für Brands, die ihren Namen rechtssicher schützen wollen.",
    "urgency": "Ein Markenname ohne Schutz ist offen für jeden – und im E-Commerce wird genau das ausgenutzt. Meldet ein anderer deine Brand zuerst an, kannst du Abmahnungen kassieren oder musst deinen eigenen Namen aufgeben, nachdem du Tausende in Marketing gesteckt hast. Falsch gewählte Nizza-Klassen lassen den Schutz ins Leere laufen. Sichere deine Marke Schritt für Schritt mit GründerX – sauber recherchiert, richtig klassifiziert und mit Watch-Strategie für die nächsten 10 Jahre.",
    "outcomes": [
      "Eingetragene Marke bei DPMA (290 €), EUIPO (850 €) oder Madrid (ab 653 CHF)",
      "10 Jahre Markenschutz, sauber in den richtigen Nizza-Klassen abgesichert",
      "Durchgeführte Ähnlichkeits- und Verfügbarkeits-Recherche inkl. Domain-Check",
      "Anmeldefähig vorbereitete Wort- oder Wort-Bild-Marke mit Logo-Datei",
      "Eingerichteter Marken-Watch und Strategie zur rechtserhaltenden Benutzung"
    ],
    "disclaimer": "Dieser Guide bietet strukturierte Orientierung und ersetzt keine markenrechtliche Beratung – Ähnlichkeits-Beurteilungen und Amtsanforderungen können im Einzelfall abweichen."
  },
  "shopify-launch": {
    "seoTitle": "Shopify-Store erstellen 2026 – Anleitung & Kosten",
    "seoDescription": "Shopify-Brand launchen: vom Account bis zum ersten Sale. Alle Settings, Apps, DACH-Rechtstexte & Cost-Hacks für deinen Live-Store in 4–8 Wochen.",
    "lead": "Dieser Guide bringt dich Schritt für Schritt vom leeren Shopify-Account zum ersten Sale – mit Zahlungs-Setup, allen DACH-Compliance-Anmeldungen, Tracking, App-Auswahl und Cost-Saving-Hacks bei der Plan-Wahl. Für angehende D2C-Brands.",
    "urgency": "Ein Shopify-Store ist schnell aufgesetzt – aber genau die Settings, die niemand zeigt, kosten dich Geld und Sichtbarkeit. Falscher Plan? Du verschenkst 0,3–2 % an Transaction-Fees bei jedem Verkauf. Fehlende Rechtstexte oder Cookie-Banner? Direkte Abmahnung, bevor der erste Kunde kauft. Jeder Tag offline ist kein Umsatz. Bau deinen Store Schritt für Schritt mit GründerX – compliant, kostenoptimiert und mit funktionierendem Tracking ab dem ersten Klick.",
    "outcomes": [
      "Live geschalteter Shopify-Store mit eigener Domain und Theme",
      "Eingerichtetes Zahlungs-Setup (Shopify Payments / PayPal / Klarna)",
      "Alle Pflicht-Rechtstexte: Impressum, Datenschutz, AGB, Widerruf, Cookie-Banner",
      "Funktionierendes Conversion-Tracking (Meta, Google, GA4)",
      "Optimal gewählter Plan mit 0,3–2 % gesparter Transaction-Fee"
    ],
    "disclaimer": "Dieser Guide ist strukturierte Orientierung, keine Rechtsberatung – plattform- und rechtliche Anforderungen für den Online-Handel können sich ändern."
  },
  "amazon-fba-launch": {
    "seoTitle": "Amazon FBA starten 2026 – Anleitung & Kosten",
    "seoDescription": "Amazon FBA Brand launchen (DE/EU): von Produkt-Recherche über Sourcing & QC bis zum ersten Sale. End-to-End-Bauanleitung mit Listing, A+ & PPC.",
    "lead": "Dieser Guide führt dich Schritt für Schritt durch den kompletten Amazon-FBA-Launch – von Produkt-Recherche über Sourcing, Qualitätskontrolle und Versand bis zum ersten organischen Sale mit eigener Marke, A+ Content und PPC. Für Seller, die in DE/EU eine Brand aufbauen.",
    "urgency": "Amazon FBA ist die schnellste Bühne für eine Produkt-Marke – aber auch die teuerste, wenn man Fehler macht. Eine 5.000–15.000 € Erstbestellung beim falschen Lieferanten, ein Listing ohne EAN-Strategie oder vergessene LUCID/WEEE/BattG-Registrierungen können dein Geld binden, das Listing sperren oder Bußgelder auslösen. Geh den Launch Schritt für Schritt mit GründerX – mit sauberem Sourcing, QC und Compliance, damit dein Kapital in Verkäufe fließt, nicht in vermeidbare Fehler.",
    "outcomes": [
      "Live geschaltetes Amazon-FBA-Listing mit eigener angemeldeter Marke",
      "Eingelagerte, qualitätsgeprüfte Ware im Amazon-Fulfillment-Center",
      "Optimiertes Listing inkl. A+ Content, Bildern und Keyword-Recherche",
      "Laufende PPC-Kampagnen und Account-Health-Monitoring",
      "Alle Compliance-Registrierungen: LUCID/VerpackG, WEEE und BattG"
    ],
    "disclaimer": "Dieser Guide bietet strukturierte Orientierung und ersetzt keine Rechts-, Steuer- oder Compliance-Beratung – Amazon-Richtlinien und gesetzliche Pflichten können sich ändern."
  },
  "kaufland-launch": {
    "seoTitle": "Kaufland Marketplace verkaufen – Anleitung 2026",
    "seoDescription": "Auf Kaufland Global Marketplace verkaufen (DE/AT/CZ/SK/PL): Seller-Account, Mirakl-Connector, Buy-Box & OSS. Live in 3–6 Wochen – schneller als FBA.",
    "lead": "Dieser Guide zeigt dir Schritt für Schritt den Verkaufsstart auf dem Kaufland Global Marketplace – vom Seller-Account über Sortiment-Listing und Mirakl-Connector bis Buy-Box-Optimierung und OSS für EU-Verkäufe nach DE/AT/CZ/SK/PL. Für Händler, die über eine Plattform expandieren wollen.",
    "urgency": "Kaufland ist Deutschlands drittgrößter Marktplatz und öffnet dir mit einem Account gleich fünf DACH+CEE-Märkte – schneller und günstiger als ein FBA-Aufbau. Doch wer EANs falsch listet, den Mirakl-Connector unsauber anbindet oder OSS für die EU-Verkäufe vergisst, riskiert Performance-Score-Abstürze und Steuerprobleme in mehreren Ländern. Geh den Launch Schritt für Schritt mit GründerX und verkaufe in Wochen statt Monaten – sauber integriert und EU-steuerlich korrekt aufgestellt.",
    "outcomes": [
      "Freigeschalteter Kaufland-Seller-Account mit gelistetem Sortiment",
      "Angebundener Mirakl-Connector (z. B. Plentymarkets/Shopware)",
      "Buy-Box-optimierte Angebote mit Performance-Score-Monitoring",
      "Eingerichtetes OSS-Verfahren für deine EU-Verkäufe nach AT/CZ/SK/PL",
      "Versand-Setup (z. B. Sendcloud) und korrekte Rechnungsstellung"
    ],
    "disclaimer": "Dieser Guide ist strukturierte Orientierung, keine Steuer- oder Rechtsberatung – Marktplatz-Regeln und EU-Steuerpflichten (OSS) können sich ändern."
  },
  "creator-setup": {
    "seoTitle": "Creator werden 2026 – Setup, Steuer & Monetization",
    "seoDescription": "Creator-/Influencer-Setup: Gewerbe, Monetization (TikTok Shop/YT/Meta), Mediakit, Pricing & Werbekennzeichnung. In 2–4 Wochen sauber aufgestellt.",
    "lead": "Dieser Guide bringt dich Schritt für Schritt zum sauberen Creator-Setup – von der Gewerbe-Anmeldung über Plattform-Monetization (TikTok Shop, YouTube, Meta) bis Mediakit, Pricing pro Follower-Range, Brand-Deal-Verträgen und korrekter Werbekennzeichnung. Für Creator, die professionell monetarisieren.",
    "urgency": "Sobald du Geld mit Content verdienst, bist du gewerblich tätig – und das Finanzamt sowie die Wettbewerbszentrale schauen genau hin. Vergessene Anmeldung, fehlende Werbekennzeichnung oder ein schwammiger Brand-Deal-Vertrag können Abmahnungen, Steuernachzahlungen und geplatzte Deals bedeuten. Und ohne Pricing-Tabelle verkaufst du dich unter Wert. Bau dein Setup Schritt für Schritt mit GründerX – angemeldet, korrekt gekennzeichnet und mit Preisen, die deinen Wert abbilden.",
    "outcomes": [
      "Angemeldete gewerbliche Tätigkeit mit Steuernummer und Konto-Setup",
      "Mediakit und Pricing-Tabelle pro Follower-Range",
      "Aktivierte Plattform-Monetization und Affiliate (TikTok Shop/YT/Meta)",
      "Rechtssichere Brand-Deal-Vertragsvorlage und korrekte Werbekennzeichnung",
      "Geklärte Steuersituation inkl. Kleinunternehmer-Frage"
    ],
    "disclaimer": "Dieser Guide gibt strukturierte Orientierung und ersetzt keine Rechts- oder Steuerberatung – Kennzeichnungspflichten und Plattform-Regeln können sich ändern."
  },
  "us-llc": {
    "seoTitle": "US-LLC gründen 2026 – Anleitung für Deutsche",
    "seoDescription": "US-LLC gründen (Wyoming/Delaware/New Mexico) als Nicht-US-Founder: Schritt für Schritt zu EIN, US-Bankkonto und korrekter US/DE-Steuer in 4–8 Wochen.",
    "lead": "Dieser Guide führt dich Schritt für Schritt durch die Gründung einer US-LLC als Nicht-US-Gründer – mit allen Postadressen für SS-4, BOI, Form 5472 und W-7, EIN-Beantragung, US-Bankkonto und sauberer US/DE-Steuer-Einordnung. Für Founder, die in den US-Markt wollen.",
    "urgency": "Eine US-LLC öffnet dir Stripe, US-Banking und den US-Markt – aber die Pflichten dahinter unterschätzen viele. Ein vergessenes Form 5472 kann 25.000 $ Strafe kosten, eine fehlerhafte BOI-Meldung weitere Bußgelder, und eine falsche steuerliche Einordnung führt zu Doppelbesteuerung in DE und USA. Geh die Gründung Schritt für Schritt mit GründerX – mit allen richtigen Adressen und Formularen, damit deine LLC funktioniert, statt teure US-Strafen zu produzieren.",
    "outcomes": [
      "Registrierte US-LLC im gewählten State (Wyoming/Delaware/New Mexico)",
      "EIN (Steuernummer) vom IRS über Form SS-4",
      "Eröffnetes US-Geschäftskonto und Zahlungs-Anbindung (z. B. Stripe)",
      "Erledigte Pflichtmeldungen: BOI, Form 5472 und ggf. W-7",
      "Klare US/DE-Steuer-Einordnung zur Vermeidung von Doppelbesteuerung"
    ],
    "disclaimer": "Dieser Guide ist strukturierte Orientierung, keine Rechts- oder Steuerberatung – US- und deutsche Steuer- sowie Meldepflichten sind komplex und können sich ändern."
  },
  "hk-limited": {
    "seoTitle": "Hong Kong Limited gründen – Anleitung & Steuer",
    "seoDescription": "HK-Limited gründen mit Substanz: Two-Tiered Profits Tax & ggf. Offshore-Status (0 %). Schritt für Schritt zu Bankkonto, BR-Certificate & Audit-Setup.",
    "lead": "Dieser Guide führt dich Schritt für Schritt durch die Gründung einer Hong Kong Limited mit Substanz – von Registrierung, BR-Certificate und Significant-Controllers-Register über das Bankkonto bis zur Two-Tiered Profits Tax und ggf. Offshore-Status. Für erfahrene Founder mit internationalem Geschäft.",
    "urgency": "Eine HK-Limited kann mit Two-Tiered Profits Tax oder Offshore-Status extrem steuereffizient sein – aber die Compliance ist anspruchsvoll und unverzeihlich. Ein verpasster Annual Return, ein fehlendes Audit oder ein schlecht vorbereiteter Offshore-Antrag führen zu Strafen, abgelehnten Bankkonten oder dem Verlust des Steuervorteils. Auch die deutsche Seite (Wegzug, AStG, Substanz) muss stimmen. Bau die HK-Limited Schritt für Schritt mit GründerX auf – mit echter Substanz und sauberer Audit- und Bank-Vorbereitung.",
    "outcomes": [
      "Registrierte HK-Limited mit Business-Registration-Certificate",
      "Eröffnetes Geschäftsbankkonto nach bestandenem KYC",
      "Geführtes Significant-Controllers-Register und Company-Secretary-Setup",
      "Eingerichteter Audit-Prozess für die jährliche Prüfungspflicht",
      "Geprüfte Eignung für Offshore-Profits-Tax-Status (0 % Profits Tax)"
    ],
    "disclaimer": "Dieser Guide gibt strukturierte Orientierung und ersetzt keine Rechts- oder Steuerberatung – HK- und deutsche Steuer-, Substanz- und Meldepflichten sind komplex und können sich ändern."
  },
  "dsgvo-shop": {
    "seoTitle": "DSGVO, AGB & Impressum für Online-Shops 2026",
    "seoDescription": "Abmahnsicherer Online-Shop: Impressum, Datenschutz, AGB, Widerruf, Cookie-Banner & AVV. Alle Pflicht-Texte in 1–2 Wochen, bevor der erste Kunde kauft.",
    "lead": "Dieser Guide bringt dich Schritt für Schritt zu allen Pflicht-Rechtstexten für deinen Online-Shop – Impressum, Datenschutzerklärung, AGB, Widerrufsbelehrung, Cookie-Consent-Banner und AVVs mit allen Daten-Verarbeitern. Für Shop-Betreiber, die abmahnsicher starten wollen.",
    "urgency": "Im deutschen E-Commerce wird abgemahnt, bevor du den ersten Umsatz siehst – ein fehlendes Impressum, eine lückenhafte Datenschutzerklärung oder ein nicht DSGVO-konformer Cookie-Banner reichen. Eine einzige Abmahnung kostet schnell mehrere hundert bis tausend Euro plus Unterlassungserklärung, und ohne AVVs verstößt du bei jedem Tool gegen die DSGVO. Setz die Pflicht-Texte Schritt für Schritt mit GründerX auf – vollständig und abmahnsicher, bevor der erste Kunde kauft.",
    "outcomes": [
      "Vollständiges, korrektes Impressum nach §5 DDG/TMG",
      "Auf deine Tools zugeschnittene Datenschutzerklärung",
      "AGB und rechtssichere Widerrufsbelehrung mit Muster-Formular",
      "DSGVO-konformer Cookie-Consent-Banner mit Opt-in",
      "Abgeschlossene AVVs mit allen Auftragsverarbeitern"
    ],
    "disclaimer": "Dieser Guide ist strukturierte Orientierung, keine Rechtsberatung – Pflichtangaben und DSGVO-Anforderungen für Online-Shops können sich ändern."
  },
  "gpsr-compliance": {
    "seoTitle": "GPSR-Compliance 2026 – Pflichten, Kosten & Anleitung",
    "seoDescription": "GPSR (EU 2023/988) richtig umsetzen: EU-Responsible-Person, Risk-Assessment, Technical Doc & konforme Listings. In 2–4 Wochen rechtssicher verkaufen.",
    "lead": "Dieser Guide zeigt dir Schritt für Schritt, wie du deinen EU-Vertrieb GPSR-konform aufstellst — für Online-Händler, Hersteller und Importeure, die Produkte im EU-Markt verkaufen.",
    "urgency": "Die GPSR gilt verbindlich seit dem 13.12.2024 für jedes Produkt im EU-Markt. Fehlt eine EU-Responsible-Person oder das Risk-Assessment, drohen Listing-Sperren bei Amazon und Co., Bußgelder und im Ernstfall der Verkaufsstopp. Wer das jetzt aufschiebt, riskiert eingefrorene Umsätze mitten im laufenden Geschäft. Bring deine Compliance Schritt für Schritt mit GründerX sauber auf den Stand.",
    "outcomes": [
      "Eine benannte EU-Responsible-Person für deine Produkte (relevant für Non-EU-Seller)",
      "Ein dokumentiertes Risk-Assessment je Produkt",
      "Vollständige Technical Documentation als Nachweis",
      "Ein funktionierendes Recall- und Beschwerde-System",
      "Marketplace-konforme Listings mit allen Pflichtangaben"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung und ersetzt keine Rechtsberatung — die konkreten Anforderungen können je nach Produkt und Marktplatz variieren und sich ändern."
  },
  "oss-anmeldung": {
    "seoTitle": "OSS-Anmeldung beim BZSt – Anleitung & Kosten 2026",
    "seoDescription": "One-Stop-Shop richtig anmelden: eine USt-Meldung in DE statt 27 USt-IDs. Pflicht ab 10.000 € EU-Umsatz. In 2–4 Wochen sauber registriert.",
    "lead": "Dieser Guide führt dich durch die OSS-Registrierung beim BZSt und die quartalsweise Meldung — für E-Commerce-Händler mit grenzüberschreitenden B2C-Verkäufen in der EU.",
    "urgency": "Sobald deine EU-weiten B2C-Verkäufe 10.000 € im Jahr übersteigen, bist du meldepflichtig. Ohne OSS müsstest du dich in jedem Zielland einzeln umsatzsteuerlich registrieren — und falsch abgeführte Umsatzsteuer kann teure Nachzahlungen und Säumniszuschläge auslösen. Je länger du wartest, desto mehr Quartale musst du rückwirkend korrigieren. Registrier dich Schritt für Schritt mit GründerX richtig.",
    "outcomes": [
      "Eine aktive OSS-Registrierung beim Bundeszentralamt für Steuern",
      "Eine korrekte, fristgerechte Quartalsmeldung aller EU-B2C-Verkäufe",
      "Klarheit über die Marketplace-Ausnahme (Amazon & Co. als Steuerschuldner)",
      "Ein sauberer Workflow zwischen Buchhaltung und OSS-Meldung",
      "Eine USt-konforme Grundlage für deine EU-Skalierung"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung und ersetzt keine Steuerberatung — steuerliche Anforderungen und Schwellenwerte können sich ändern und hängen von deinem Einzelfall ab."
  },
  "pan-eu-fba": {
    "seoTitle": "Pan-EU FBA Setup 2026 – Anleitung, Kosten & USt",
    "seoDescription": "Amazon Pan-EU FBA aufsetzen: USt-Registrierungen, OSS, Übersetzungen & Pricing für 7 Länder. Pan-EU vs. EFN vs. CEE — was wann lohnt.",
    "lead": "Dieser Guide erklärt dir die komplette Pan-EU-FBA-Einrichtung samt USt-IDs, Übersetzungen und Compliance — für Amazon-Seller, die von DE aus auf bis zu 7 EU-Länder skalieren wollen.",
    "urgency": "Aktivierst du Pan-EU ohne die nötigen USt-Registrierungen, verschickt Amazon deine Ware in fremde Lager und du bist sofort in mehreren Ländern meldepflichtig — fehlende Registrierungen führen zu Account-Risiken und Nachzahlungen. Die USt-Bearbeitung in EU-Ländern dauert Wochen bis Monate, das lässt sich nicht kurzfristig nachholen. Plan deine Länder-Reihenfolge Schritt für Schritt mit GründerX.",
    "outcomes": [
      "Eine bewusste Entscheidung zwischen Pan-EU, EFN und CEE",
      "USt-Registrierungen in allen relevanten Ziel-Ländern plus OSS",
      "Übersetzte, lokal optimierte Listings je Marktplatz",
      "Länderspezifisches Pricing inklusive korrekter Umsatzsteuer",
      "Eine aktive Pan-EU-FBA-Konfiguration mit sauberer Compliance"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Steuer- oder Rechtsberatung — USt-Pflichten und Amazon-Vorgaben unterscheiden sich je Land und können sich ändern."
  },
  "tiktok-shop-launch": {
    "seoTitle": "TikTok Shop Launch 2026 – Anleitung für Brands",
    "seoDescription": "TikTok Shop in DACH/EU starten: Shop-Tab, Produkt-Listings, Live-Shopping & Affiliate-Programm aufsetzen. In 3–6 Wochen zu den ersten Sales.",
    "lead": "Dieser Guide bringt dich Schritt für Schritt zum aktiven TikTok-Shop-Brand-Account mit Listings, Live-Shopping und Affiliate-Programm — für Brands, Creator und D2C-Händler im DACH-Raum.",
    "urgency": "TikTok Shop ist aktuell einer der reichweitenstärksten neuen Verkaufskanäle mit hoher Discovery-Conversion — wer früh sauber aufsetzt, profitiert von günstiger organischer Reichweite, bevor der Kanal teurer wird. Ein chaotischer Launch mit fehlerhaften Listings kostet dich Sichtbarkeit und Vertrauen, die du später teuer zurückkaufen musst. Bau deinen Shop Schritt für Schritt mit GründerX auf.",
    "outcomes": [
      "Ein verifizierter TikTok Shop Brand-Account mit aktivem Shop-Tab",
      "Konvertierende Produkt-Listings mit Bildern und Videos",
      "Ein einsatzbereites Live-Shopping-Setup",
      "Ein laufendes Affiliate-Programm mit Creator-Provisionen",
      "Deine ersten nachvollziehbaren Sales über den Kanal"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung — TikTok-Shop-Richtlinien, Gebühren und Verfügbarkeit in einzelnen Ländern können sich jederzeit ändern."
  },
  "email-marketing-stack": {
    "seoTitle": "Email-Marketing-Stack aufbauen 2026 – Anleitung",
    "seoDescription": "Klaviyo, MailerLite oder Brevo aufsetzen: Welcome, Cart-Recovery & Win-Back DSGVO-konform. 20–40 % vom DTC-Umsatz aus Email in 2–4 Wochen.",
    "lead": "Dieser Guide zeigt dir den Aufbau eines kompletten Email-Stacks mit allen wichtigen Flows — für D2C-Shops und Online-Händler, die wiederkehrenden Umsatz aus E-Mail holen wollen.",
    "urgency": "Bei vielen D2C-Brands kommen 20–40 % des Umsatzes aus Email — jeder Tag ohne automatisierte Flows ist verschenkter Umsatz aus Traffic, den du längst bezahlt hast. Verlassene Warenkörbe und kalte Leads gehen ohne Welcome- und Cart-Recovery-Strecke dauerhaft verloren. Und ein nicht DSGVO-konformes Setup kann zur Abmahnung werden. Bau deinen Stack Schritt für Schritt mit GründerX auf.",
    "outcomes": [
      "Ein aktiver Email-Anbieter mit verifizierter Domain und Tracking",
      "Welcome-, Cart-Recovery- und Browse-Abandonment-Flows live",
      "Post-Purchase- und Win-Back-Strecken zur LTV-Steigerung",
      "Ein DSGVO-konformes Opt-in mit Double-Opt-in und Pop-up",
      "Ein wiederholbarer Newsletter-Prozess mit Segmentierung"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung und ersetzt keine Rechtsberatung — datenschutzrechtliche Anforderungen können sich ändern und hängen von deinem Einzelfall ab."
  },
  "buchhaltung-setup": {
    "seoTitle": "Buchhaltung-Setup 2026: Lexoffice, sevDesk, DATEV",
    "seoDescription": "Buchhaltungstool wählen & einrichten: Bank-Sync, GoBD-Belege, USt-VA & E-Rechnung. Lexoffice vs. sevDesk vs. DATEV in 1–3 Wochen startklar.",
    "lead": "Dieser Guide hilft dir bei Tool-Wahl und Einrichtung deiner Buchhaltung samt Bank-Sync und StB-Anbindung — für Gründer, Solo-Selbstständige und kleine Teams.",
    "urgency": "Belege im Schuhkarton und Excel-Listen sind nicht GoBD-konform und kosten dich bei jeder Betriebsprüfung Nerven und Geld. Seit 2025 gilt zudem die E-Rechnungs-Pflicht im B2B — wer nicht empfangs- und revisionsfähig aufgestellt ist, gerät schnell in Verzug. Je länger du das aufschiebst, desto teurer wird die nachträgliche Migration. Richte dein System Schritt für Schritt mit GründerX ein.",
    "outcomes": [
      "Ein passendes Buchhaltungstool für deine Unternehmensgröße",
      "Automatischer Bank-Sync mit zugeordneten Transaktionen",
      "GoBD-konforme, revisionssichere Belegerfassung",
      "USt-Voranmeldung per Export und sauberer StB-Schnittstelle",
      "Ein Setup, das die E-Rechnungs-Pflicht ab 2025 erfüllt"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung und ersetzt keine Steuerberatung — buchhalterische und gesetzliche Anforderungen können sich ändern und hängen von deinem Einzelfall ab."
  },
  "wegzugsbesteuerung": {
    "seoTitle": "Wegzugsbesteuerung §6 AStG vermeiden – Strategien",
    "seoDescription": "Wegzugsteuer bei GmbH-Anteilen vermeiden: Stundung, Holding-Restrukturierung & Substanz im Zielland. 12–24 Monate Vorlauf richtig planen.",
    "lead": "Dieser Guide erklärt die Strategien rund um §6 AStG bei einem Wegzug aus Deutschland — für GmbH-Gesellschafter und Unternehmer, die einen Umzug ins Ausland planen.",
    "urgency": "Bei einem Wegzug mit GmbH-Anteilen gelten diese steuerlich als verkauft — du zahlst Steuer auf einen Gewinn, den du gar nicht realisiert hast. Ohne Vorbereitung kann das sechsstellige Beträge kosten. Stundung, Holding-Strukturen und Substanz-Aufbau brauchen 12–24 Monate Vorlauf und lassen sich kurz vor dem Umzug nicht mehr sauber aufsetzen. Plan deinen Wegzug rechtzeitig Schritt für Schritt mit GründerX.",
    "outcomes": [
      "Klarheit, ob und in welcher Höhe §6 AStG dich betrifft",
      "Ein vorbereiteter Stundungs-Antrag für deinen Fall",
      "Eine geprüfte Holding- oder Restrukturierungs-Option",
      "Ein realistischer Plan für Substanz-Aufbau im Zielland",
      "Eine minimierte oder vermiedene Wegzugsteuer-Belastung"
    ],
    "disclaimer": "Dieser Guide bietet ausschließlich Orientierung und ersetzt keine individuelle Steuer- oder Rechtsberatung — internationale Steuerregeln sind komplex und können sich ändern."
  },
  "mitarbeiter-beteiligung": {
    "seoTitle": "Mitarbeiterbeteiligung 2026: VSOP, ESOP & Anteile",
    "seoDescription": "Talente halten ohne Cash: Virtual Stock, ESOP oder echte Anteile mit Vesting & §19a EStG. Beteiligungsprogramm in 4–8 Wochen aufsetzen.",
    "lead": "Dieser Guide vergleicht VSOP, ESOP und echte Anteile und führt dich durch die Umsetzung — für Startup-Gründer, die Talente langfristig binden wollen.",
    "urgency": "Gute Leute bleiben, wenn sie am Erfolg beteiligt sind — ohne Beteiligungsmodell verlierst du Schlüsselpersonen an besser strukturierte Wettbewerber. Ein schlecht aufgesetztes Programm kann dagegen ungewollte Steuerlast beim Mitarbeiter (Dry-Income) oder juristische Streitfälle auslösen. Das Zukunftsfinanzierungsgesetz und §19a EStG bieten 2026 echte Vorteile, wenn du sie richtig nutzt. Setz dein Programm Schritt für Schritt mit GründerX auf.",
    "outcomes": [
      "Eine fundierte Wahl zwischen VSOP, ESOP und echten Anteilen",
      "Ein klarer Vesting-Schedule mit Cliff und Bad-Leaver-Regeln",
      "Eine steuerlich optimierte Struktur (§19a EStG / ZuFinG)",
      "Saubere juristische Dokumentation des Programms",
      "Ein verständliches Modell, das du Kandidaten erklären kannst"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung und ersetzt keine Rechts- oder Steuerberatung — die Regeln zur Mitarbeiterbeteiligung sind komplex und können sich ändern."
  },
  "co-founder-agreement": {
    "seoTitle": "Co-Founder-Agreement: Equity, Vesting & Konflikte",
    "seoDescription": "Founder-Streit vermeiden: Equity-Split, 4-Jahres-Vesting, Cliff & Bad-Leaver sauber regeln. Co-Founder-Agreement in 2–4 Wochen aufsetzen.",
    "lead": "Dieser Guide führt dich durch ein wasserdichtes Co-Founder-Agreement mit Equity, Vesting und Konfliktregeln — für Gründerteams, die vor dem Wachstum klare Verhältnisse schaffen wollen.",
    "urgency": "Founder-Streit ist einer der häufigsten Startup-Killer — ohne klares Agreement kann ein aussteigender Mitgründer mit voller Equity gehen und deine Cap-Table für jeden Investor unbrauchbar machen. Solche Konflikte lassen sich im Nachhinein kaum noch fair lösen. Genau deshalb regelst du Vesting, Cliff und Exit-Klauseln, solange das Verhältnis noch gut ist. Setz euer Agreement Schritt für Schritt mit GründerX auf.",
    "outcomes": [
      "Ein fair begründeter Equity-Split zwischen den Gründern",
      "Ein 4-Jahres-Vesting mit Cliff für alle Beteiligten",
      "Saubere Good-Leaver- und Bad-Leaver-Klauseln",
      "Drag-Along- und Tag-Along-Regelungen für den Exit-Fall",
      "Ein definierter Mechanismus zur Konfliktlösung"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechtsberatung — die konkrete Ausgestaltung sollte juristisch geprüft werden und hängt von eurer Rechtsform ab."
  },
  "foerderung-stipendium": {
    "seoTitle": "Förderungen für Gründer: KfW, EXIST & INVEST 2026",
    "seoDescription": "Bis zu 250k+ € Förder-Cash sichern: KfW-StartGeld, EXIST, INVEST & Länderstipendien — meist non-dilutiv. Anträge Schritt für Schritt stellen.",
    "lead": "Dieser Guide zeigt dir, welche Förderprogramme zu dir passen und wie du sie beantragst — für Gründer, die Cash-Runway ohne Anteilsverlust aufbauen wollen.",
    "urgency": "Viele Förderprogramme sind non-dilutiv — du bekommst Kapital, ohne Anteile abzugeben. Programme wie EXIST oder INVEST haben jedoch enge Fristen und Voraussetzungen, und nach der Gründung oder dem ersten Umsatz bist du oft schon raus. Wer zu spät beantragt, lässt fünf- bis sechsstellige Beträge liegen. Bau deinen Förder-Stack Schritt für Schritt mit GründerX auf.",
    "outcomes": [
      "Eine Übersicht der für dich relevanten Förderprogramme",
      "Geklärte Förderfähigkeit und Timing je Programm",
      "Gestellte Anträge für KfW, EXIST, INVEST und Co.",
      "Mehr Cash-Runway ohne Verwässerung deiner Anteile",
      "Klarheit über Reporting- und Verwendungs-Pflichten"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung — Förderbedingungen, Fristen und Programme ändern sich regelmäßig und sind im Einzelfall mit der jeweiligen Förderstelle zu klären."
  },
  "vc-pitch-deck": {
    "seoTitle": "VC-Runde vorbereiten: Pitch-Deck & Term-Sheet 2026",
    "seoDescription": "Series-A-ready werden: Pitch-Deck, Cap-Table, Datenraum & Term-Sheet-Basics. Von der Vorbereitung bis zum Closing Schritt für Schritt.",
    "lead": "Dieser Guide bereitet dich auf eine VC-Runde vor — von Pitch-Deck über Cap-Table und Datenraum bis Term-Sheet — für Gründer, die institutionelles Kapital aufnehmen wollen.",
    "urgency": "Investoren entscheiden in Minuten — ein schwaches Deck oder eine unsaubere Cap-Table killt dein Investment, bevor es ein Gespräch gibt. Schlecht verhandelte Term-Sheet-Klauseln kosten dich später Kontrolle und Anteile, die du nicht zurückbekommst. Wer unvorbereitet in Gespräche geht, verbrennt Investoren-Kontakte, die endlich sind. Mach deine Runde Schritt für Schritt mit GründerX startklar.",
    "outcomes": [
      "Ein überzeugendes Pitch-Deck mit den 12 Kern-Slides",
      "Eine saubere Cap-Table in einem geeigneten Tool",
      "Ein vorbereiteter, strukturierter Datenraum",
      "Eine recherchierte, passende Investorenliste",
      "Verständnis der wichtigsten Term-Sheet-Standards"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechtsberatung — Term-Sheets und Beteiligungsverträge sollten vor Unterschrift juristisch geprüft werden."
  },
  "performance-marketing-stack": {
    "seoTitle": "Performance-Marketing-Stack 2026: Meta, TikTok, Google",
    "seoDescription": "Ad-Accounts, Pixel, CAPI, server-side Tracking, GA4 & Attribution sauber aufsetzen. Foundation für skalierbaren Ad-Spend in 3–6 Wochen.",
    "lead": "Dieser Guide bringt dir den kompletten Performance-Stack inklusive Tracking und Attribution bei — für D2C-Brands und Performance-Marketer, die skalierbaren Ad-Spend fahren wollen.",
    "urgency": "Ohne sauberes Server-Side-Tracking und CAPI verlierst du durch iOS-Restriktionen und Adblocker einen relevanten Teil deiner Conversion-Signale — und blinde Algorithmen verbrennen Budget. Jeder Euro Ad-Spend auf einem fehlerhaften Setup ist schlechter optimiert als nötig. Je länger du mit lückenhaftem Tracking skalierst, desto teurer wird der spätere Umbau. Bau deinen Stack Schritt für Schritt mit GründerX auf.",
    "outcomes": [
      "Eingerichtete Ad-Accounts in Meta, TikTok und Google",
      "Pixel, Conversion-API und server-side GTM live",
      "Sauber konfiguriertes GA4 mit relevanten Events",
      "Ein Attribution-Tool für ehrliche Kanal-Bewertung",
      "Ein Reporting-Dashboard als Entscheidungsgrundlage"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung — Tracking-Setups müssen DSGVO-konform mit Einwilligung umgesetzt werden, und Plattform-Vorgaben können sich ändern."
  },
  "hiring-erste-10": {
    "seoTitle": "Erste 10 Mitarbeiter einstellen – Anleitung 2026",
    "seoDescription": "Recruiting, Verträge & Onboarding rechtssicher aufsetzen: Stellenanzeige, ATS, Probezeit & Onboarding. Skalierbarer Hiring-Prozess für die ersten Hires.",
    "lead": "Dieser Guide baut dir einen skalierbaren Hiring-Prozess von der Stellenanzeige bis zum Onboarding — für Gründer, die ihre ersten 10 Mitarbeiter rechtssicher einstellen.",
    "urgency": "Deine ersten Hires prägen die Kultur und entscheiden über dein Wachstum — eine Fehlbesetzung kostet schnell ein Vielfaches eines Jahresgehalts an Zeit, Geld und Momentum. Fehlerhafte Arbeitsverträge oder falsch gehandhabte Probezeiten können zu teuren arbeitsrechtlichen Streitfällen führen. Ohne strukturierten Prozess wird jeder Hire zur Improvisation. Bau deinen Recruiting-Prozess Schritt für Schritt mit GründerX auf.",
    "outcomes": [
      "Wiederverwendbare Stellenanzeigen-Templates",
      "Ein eingerichtetes ATS für deinen Bewerber-Funnel",
      "Geprüfte Vertrags-Templates inklusive Probezeit-Regeln",
      "Klarheit über die wichtigsten arbeitsrechtlichen Pflichten",
      "Ein strukturiertes, wiederholbares Onboarding"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechtsberatung — Arbeitsverträge und arbeitsrechtliche Vorgaben sollten im Einzelfall juristisch geprüft werden."
  },
  "cashflow-forecasting": {
    "seoTitle": "Cashflow-Forecasting: 13-Wochen-Plan & Runway",
    "seoDescription": "Cashflow-Forecasting für Founder: 13-Wochen-Plan, Burn-Rate und Runway in 1-2 Wochen aufsetzen. Frühwarn-System gegen Liquiditäts-Krisen.",
    "lead": "Dieser Guide zeigt dir, wie du einen aktiv geführten 13-Wochen-Cashflow-Forecast mit Burn-Rate- und Runway-Tracking aufbaust. Für Founder, E-Commerce und Solo-Selbstständige, die ihre Liquidität im Griff behalten wollen.",
    "urgency": "Rund 80 % der Startup-Failures sind Cashflow- statt Markt-Probleme - und das Geld wird meist still knapp, lange bevor du es merkst. Wer erst beim leeren Konto rechnet, verhandelt aus der Schwäche und zahlt teure Brückenkredite oder verschenkt Anteile. Bau dir das Frühwarn-System jetzt auf, solange du noch Optionen hast. Mit GründerX gehst du Schritt für Schritt durch Setup und laufendes Tracking.",
    "outcomes": [
      "Aktiv geführter 13-Wochen-Cashflow-Forecast als zentrale Steuerungsbasis",
      "Monatliches Burn-Rate-Tracking und transparente Runway-Visibility in Monaten",
      "Frühwarn-System, das Liquiditäts-Engpässe Wochen im Voraus sichtbar macht",
      "Klare Entscheidungsgrundlage für Hiring, Ausgaben und den nächsten Funding-Zeitpunkt",
      "Verhandlungsstärke gegenüber Investoren und Banken durch belastbare Zahlen"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung und ersetzt keine individuelle Steuer- oder Finanzberatung; Tools und Marktbedingungen können sich ändern."
  },
  "insurance-stack": {
    "seoTitle": "Insurance-Stack für Startups: D&O, Cyber & BU",
    "seoDescription": "Versicherungs-Check für Gründer: D&O, Cyber, Produkthaftpflicht und BU in 2-4 Wochen passend bündeln und vor existenzbedrohenden Risiken schützen.",
    "lead": "Dieser Guide hilft dir, ein risiko-angepasstes Versicherungs-Paket aus D&O, Cyber, Produkthaftpflicht, Berufshaftpflicht und BU zusammenzustellen. Für Gründer und Solo-Selbstständige, die sich gegen existenzbedrohende Risiken absichern wollen.",
    "urgency": "Ein einziger Produktfehler, Datenleck oder Haftungsfall kann dich privat in den Ruin treiben - besonders ohne D&O- oder Produkthaftpflicht. Wer erst nach dem Schaden vergleicht, ist nicht versichert und bleibt auf den Kosten sitzen. Schließe Lücken jetzt, bevor das Risiko teuer wird. Mit GründerX prüfst du Schritt für Schritt, welche Policen du wirklich brauchst und welche nicht.",
    "outcomes": [
      "Risiko-angepasstes Versicherungs-Paket statt teurer Über- oder gefährlicher Unterversicherung",
      "D&O-Schutz für persönliche Manager-Haftung, besonders ab Series A relevant",
      "Cyber- und Produkthaftpflicht passend zu deinem Geschäftsmodell abgesichert",
      "Berufshaftpflicht und BU als Absicherung deiner Person und Arbeitskraft",
      "Überblick über realistische Beiträge und Sparpotenzial durch Vergleich"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine individuelle Versicherungs- oder Rechtsberatung; Tarife, Deckungen und Anforderungen können sich ändern."
  },
  "logistik-3pl": {
    "seoTitle": "Logistik skalieren: Self-Ship zu 3PL & Multi-Lager",
    "seoDescription": "Logistik-Skalierung für E-Commerce: von DIY-Versand zu 3PL und Multi-Warehouse. In 4-12 Wochen auf 1.000+ Bestellungen/Tag vorbereiten.",
    "lead": "Dieser Guide zeigt dir, wie du deine Logistik vom Self-Ship über einen 3PL-Partner bis zum Multi-Warehouse für EU und US skalierst. Für E-Commerce- und D2C-Founder, die wachsen, ohne im Versand zu ersticken.",
    "urgency": "Ab etwa 30-50 Bestellungen am Tag frisst dich der eigene Versand auf - Zeit, die du fürs Wachstum brauchst. Wer den 3PL-Wechsel verschleppt, riskiert verspätete Lieferungen, schlechte Reviews und verbrannte Skalierungs-Chancen im Peak. Plane die Integration jetzt, statt mitten im Hype zu improvisieren. Mit GründerX gehst du den Aufbau Schritt für Schritt durch.",
    "outcomes": [
      "Skalierbare Logistik vom DIY-Versand bis zu 1.000+ Bestellungen pro Tag",
      "3PL-Partner integriert und sauber an deinen Shop angebunden",
      "Multi-Warehouse-Setup für EU und US mit kürzeren Lieferzeiten",
      "Automatisierte Versand-Labels und ein funktionierendes Retoure-System",
      "B2B/B2C-Mix-fähige Prozesse, die mit deinem Umsatz mitwachsen"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung und ersetzt keine individuelle Rechts- oder Steuerberatung; Anbieter, Konditionen und Zoll-Anforderungen können sich ändern."
  },
  "seo-ecommerce": {
    "seoTitle": "SEO für E-Commerce: Technical, Content & Backlinks",
    "seoDescription": "E-Commerce-SEO als Skalierungs-Hebel: Technical-SEO, Schema, Content und Backlinks aufbauen. Bei reifen Brands 30-50 % vom Umsatz aus Google.",
    "lead": "Dieser Guide führt dich durch Technical-SEO, Schema-Markup, Content-Strategie und Backlink-Aufbau für deinen Shop. Für E-Commerce- und D2C-Founder, die organischen Traffic als langfristigen Wachstumshebel nutzen wollen.",
    "urgency": "Bei reifen DTC-Brands kommen oft 30-50 % vom Umsatz aus Google - aber SEO braucht 12-24 Monate Vorlauf, bis es trägt. Wer zu spät startet, bleibt dauerhaft von teurem Paid-Traffic abhängig und zahlt jeden Klick aufs Neue. Lege das Fundament jetzt, damit der Effekt eintritt, wenn du ihn brauchst. Mit GründerX arbeitest du dich strukturiert durch Technical, Content und Backlinks.",
    "outcomes": [
      "Technisch sauberer Shop ohne Crawling-, Index- und Ladezeit-Bremsen",
      "Schema-Markup für Rich-Results und bessere Klickraten in der Suche",
      "Content-Strategie mit konkretem Plan für 50+ Blog-Artikel",
      "Aktiver Backlink-Aufbau, der deine Domain-Autorität wachsen lässt",
      "Wachsender organischer Traffic-Kanal, der Paid-Abhängigkeit senkt"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung; Ranking-Ergebnisse sind nicht garantiert und Google-Algorithmen sowie Best Practices können sich jederzeit ändern."
  },
  "b2b-saas-spezifika": {
    "seoTitle": "B2B-SaaS: Pricing, Customer-Success & Enterprise",
    "seoDescription": "B2B-SaaS für DACH aufsetzen: Pricing-Tiers, MRR-Tracking, Customer-Success und Enterprise-Sales mit MEDDIC in 8-16 Wochen live bringen.",
    "lead": "Dieser Guide zeigt dir die SaaS-Spezifika für den DACH-Markt: Pricing-Tiers, Subscriptions, MRR-Tracking, Customer-Success-Prozess und Enterprise-Sales mit MEDDIC. Für B2B-SaaS-Founder, die professionell skalieren wollen.",
    "urgency": "Falsch gesetzte Pricing-Tiers und fehlender Customer-Success kosten dich planbar MRR durch Churn - und im Enterprise-Deal scheiterst du ohne sauberen Procurement-Prozess oft erst beim Einkauf. Wer das spät nachzieht, verbrennt Pipeline und Vertrauen bei großen Kunden. Bau den Stack jetzt richtig auf. Mit GründerX gehst du Pricing, Success und Sales Schritt für Schritt durch.",
    "outcomes": [
      "Durchdachte Pricing-Tiers und Stripe-Subscriptions live im Einsatz",
      "MRR-, Churn- und Retention-Tracking als Steuerungs-Cockpit",
      "Strukturierter Customer-Success-Prozess gegen vermeidbaren Churn",
      "Enterprise-Sales-Pipeline mit MEDDIC-Framework für größere Deals",
      "Auf den DACH-Markt zugeschnittene Procurement- und Vertrags-Basics"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung und ersetzt keine individuelle Rechts- oder Steuerberatung; Tools, Gebühren und Marktstandards können sich ändern."
  },
  "patente-schutzrechte": {
    "seoTitle": "Patent, Gebrauchsmuster & Design anmelden (DPMA)",
    "seoDescription": "Gewerbliche Schutzrechte sichern: Patent, Gebrauchsmuster und Design beim DPMA, EPA oder WIPO anmelden. IP-Strategie vom Sofort-Schutz bis EP-Patent.",
    "lead": "Dieser Guide führt dich durch Patent, Gebrauchsmuster und Design als gewerbliche Schutzrechte - von der Recherche über die Anmeldung bei DPMA, EPA oder WIPO bis zur kombinierten IP-Strategie. Für Gründer mit eigener Technik oder eigenem Produktdesign.",
    "urgency": "Patentschutz gilt nur für Neues - sobald du deine Erfindung öffentlich zeigst oder verkaufst, ist sie oft nicht mehr schützbar. Wer zu spät anmeldet, verliert den Schutz an Wettbewerber, die schneller waren. Sichere deine Idee, bevor du sie zeigst, und nutze das Gebrauchsmuster als Sofort-Schutz. Mit GründerX gehst du Recherche und Anmeldung strukturiert durch.",
    "outcomes": [
      "Patent-Recherche, die teure Doppel- und Fehl-Anmeldungen vermeidet",
      "Gebrauchsmuster als schneller Sofort-Schutz für deine Erfindung",
      "Patent-Anmeldung bei DPMA, EPA oder WIPO sauber vorbereitet",
      "Design-Anmeldung zum Schutz der Optik deines Produkts",
      "Kombinierte IP-Strategie aus Schutzrechten und Marken (siehe marke-anmelden)"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine patentanwaltliche Beratung; Gebühren, Fristen und Schutzvoraussetzungen können sich ändern."
  },
  "ma-sell-side": {
    "seoTitle": "M&A Sell-Side: Exit vorbereiten & Firma verkaufen",
    "seoDescription": "Unternehmen verkaufen: Sell-Side-Prozess von Vendor-DD über Information Memorandum bis SPA-Signing. Strukturierter Exit in 6-18 Monaten.",
    "lead": "Dieser Guide führt dich durch den Sell-Side-Prozess: Exit-Readiness-Audit, Käufer-Liste, Vendor-DD-Paket, Information Memorandum, Term-Sheet und SPA-Verhandlung bis zum Closing. Für Founder, die ihren Exit professionell vorbereiten.",
    "urgency": "Ein Firmenverkauf zieht sich 6-18 Monate - und schlecht vorbereitete Zahlen, Verträge oder Cap-Table drücken den Kaufpreis oder kippen den Deal in der Due Diligence. Wer ohne Vendor-DD und Information Memorandum in Gespräche geht, verhandelt aus der Schwäche. Bereite den Exit jetzt sauber vor. Mit GründerX gehst du den Prozess Schritt für Schritt durch.",
    "outcomes": [
      "Exit-Readiness-Audit, das Deal-Breaker früh aufdeckt und behebt",
      "Strukturierte Käufer-Liste und gezielte Ansprache statt Zufallstreffer",
      "Vendor-DD-Paket und Information Memorandum, die im Due-Diligence-Prozess bestehen",
      "Term-Sheet- und SPA-Verhandlung mit klarer Strategie geführt",
      "Geordnetes Closing ohne böse Überraschungen in letzter Minute"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine M&A-, rechts- oder steuerberatende Begleitung; Marktbedingungen und Anforderungen können sich ändern."
  },
  "crowdfunding-token": {
    "seoTitle": "Crowdfunding & Token-Launch: Financing in DACH/EU",
    "seoDescription": "Alternative Finanzierung ohne VC: Equity-Crowdfunding, Reward-CF oder MiCAR-konformer Token-Launch in der EU - Setup, Kampagne und Compliance.",
    "lead": "Dieser Guide zeigt dir alternative Finanzierungswege jenseits klassischer VCs: Equity-Crowdfunding (Companisto/Seedmatch), Reward-Crowdfunding (Kickstarter) und MiCAR-konformer Token-Launch. Für Gründer, die Kapital ohne Standard-VC-Runde sammeln wollen.",
    "urgency": "Jede Finanzierungsform hat eigene Regeln - ein Token-Launch ohne MiCAR-Konformität oder eine Equity-Kampagne ohne saubere Vorbereitung kann teuer scheitern oder rechtliche Probleme auslösen. Wer ohne Plan startet, verbrennt Marketing-Budget und Reputation in der Community. Wähle das passende Modell und bereite es sauber vor. Mit GründerX gehst du Kampagne oder Token-Launch Schritt für Schritt durch.",
    "outcomes": [
      "Klare Entscheidung zwischen Equity-CF, Reward-CF und Token-Launch",
      "Vorbereitete Crowdfunding-Kampagne mit Story, Zielsumme und Community-Plan",
      "MiCAR-konformer Token-Launch mit White-Paper und Smart-Contract-Audit",
      "Überblick über Plattform-Fees und realistische Setup-Kosten",
      "Verständnis der laufenden Compliance- und Liquiditäts-Pflichten"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine rechts- oder finanzaufsichtsrechtliche Beratung; MiCAR und regulatorische Anforderungen können sich ändern."
  },
  "elster-fse-fillout": {
    "seoTitle": "ELSTER FsE ausfüllen: Fragebogen steuerliche Erfassung",
    "seoDescription": "ELSTER-Fragebogen zur steuerlichen Erfassung selbst ausfüllen: Sektion für Sektion zu Steuernummer und USt-ID - in 2-4 Stunden, ohne teure Tools.",
    "lead": "Dieser Guide führt dich Sektion für Sektion durch den ELSTER-Fragebogen zur steuerlichen Erfassung (FsE) - mit optimierten Vorauszahlungen und richtiger USt-Strategie. Für Einzelunternehmer und Freiberufler, die den FsE ohne Lexware oder sevDesk selbst meistern wollen.",
    "urgency": "Der FsE entscheidet über Kleinunternehmer-Status, Ist- oder Soll-Versteuerung und deine Vorauszahlungen - Fehler hier verfolgen dich oft über Jahre und kosten unnötig Liquidität. Wer planlos ausfüllt, riskiert zu hohe Vorauszahlungen oder eine ungünstige USt-Wahl. Geh jetzt strukturiert durch jede Sektion. Mit GründerX füllst du den FsE Schritt für Schritt sauber aus.",
    "outcomes": [
      "Korrekt eingereichter FsE ohne typische Anfänger-Fehler",
      "Bewusste Wahl zwischen Kleinunternehmer-Regelung und Regelbesteuerung",
      "Optimierte Vorauszahlungen, die deine Liquidität schonen",
      "Richtige USt-Strategie inkl. Ist-Versteuerung wo sinnvoll",
      "Steuernummer und USt-ID am Ende des Prozesses erhalten"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine individuelle Steuerberatung; Formulare, Felder und steuerliche Anforderungen können sich ändern."
  },
  "brand-owner-d2c-setup": {
    "seoTitle": "Brand-Owner & D2C: Komplett-Setup für eigene Brand",
    "seoDescription": "Eigene D2C-Brand aufbauen: Rechtsform, IP-Schutz, Compliance, Shop und Marketing-Stack in 3-9 Monaten orchestriert live bringen.",
    "lead": "Dieser Guide orchestriert den kompletten Brand-Owner-Stack: Rechtsform, IP-Schutz, Produkt-Compliance, eigener Shop und Performance-Marketing samt Logistik. Für Founder, die eine eigene Brand aufbauen und direkt an Endkunden verkaufen wollen.",
    "urgency": "Beim D2C-Aufbau hängt alles zusammen - eine falsche Rechtsform, ungeschützte Marke oder fehlende Produkt-Compliance kann dich später teuer korrigieren oder abmahnen lassen. Wer ohne Reihenfolge baut, reißt Lücken, die im Skalieren auffliegen. Setze den Stack jetzt in der richtigen Sequenz auf. Mit GründerX gehst du von der Rechtsform bis zum Marketing Schritt für Schritt durch.",
    "outcomes": [
      "GmbH oder UG (optional mit Holding) sauber gegründet und strukturiert",
      "Marke und Design geschützt, IP-Strategie steht",
      "Produkt-Compliance erfüllt, bevor du in den Verkauf gehst",
      "Eigener Shop mit Performance-Marketing-Stack live",
      "Skalierbare Logistik angebunden und bereit fürs Wachstum"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine individuelle Rechts- oder Steuerberatung; Compliance-Vorgaben und Plattform-Anforderungen können sich ändern."
  },
  "reseller-marketplace-setup": {
    "seoTitle": "Reseller & Marketplace-Arbitrage: Komplett-Setup",
    "seoDescription": "Reseller-Setup für Amazon, eBay & Kaufland: Rechtsform, Repricing, OSS und Cash-Cycle in 1-3 Monaten aufbauen - mit Source-Diversification.",
    "lead": "Dieser Guide führt dich durch das komplette Reseller-Setup für Amazon, eBay und Kaufland - inklusive Source-Diversification, Repricing, OSS und Cash-Cycle-Management. Für Founder, die mit Buy & Resell ein skalierbares Marketplace-Business aufbauen.",
    "urgency": "Beim Reselling killt dich oft nicht die Marge, sondern der Cash-Cycle - wer Inventar falsch plant oder OSS ignoriert, bindet Kapital tot oder bekommt Steuer-Ärger über Grenzen hinweg. Wer ohne Repricing und diversifizierte Quellen startet, verliert die Buy-Box und Margen. Bau das Fundament jetzt richtig auf. Mit GründerX gehst du Rechtsform, Steuer und Tooling Schritt für Schritt durch.",
    "outcomes": [
      "Rechtsform und Steuer-Setup passend zum Reselling aufgesetzt",
      "Marketplace-Accounts auf Amazon, eBay und Kaufland startklar",
      "Warenwirtschaft und Repricing-Stack für stabile Margen live",
      "OSS-konforme Abwicklung des EU-weiten Verkaufs",
      "Diversifizierte Source-Pipeline und bewusstes Cash-Cycle-Management"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine individuelle Steuer- oder Rechtsberatung; Marketplace-Regeln, Gebühren und OSS-Vorgaben können sich ändern."
  },
  "agency-services-setup": {
    "seoTitle": "Agentur & Service-Business: Founder-Setup",
    "seoDescription": "Agentur oder Consulting gründen: Rechtsform, AGB, Pricing-Modell und Akquise-Pipeline in 1-3 Monaten aufsetzen - subunternehmer-konform.",
    "lead": "Dieser Guide hilft dir, ein Service-Business sauber aufzusetzen: Rechtsform, AGB und Service-Verträge, Pricing-Modell, PM-Tool-Stack und Akquise-Pipeline. Für Founder von Marketing-, Dev-, Design-Agenturen oder Consulting.",
    "urgency": "Ohne saubere AGB und Service-Verträge haftest du bei Scope-Creep und Zahlungsausfällen schnell selbst - und falsch eingebundene Subunternehmer können dir Scheinselbstständigkeit einbrocken. Wer planlos pricet, verschenkt Marge ab dem ersten Kunden. Setze Verträge, Pricing und Prozesse jetzt richtig auf. Mit GründerX gehst du den Aufbau Schritt für Schritt durch.",
    "outcomes": [
      "Passende Rechtsform für dein Service-Business gewählt",
      "AGB und Service-Verträge, die dich bei Streit und Scope-Creep schützen",
      "Durchdachtes Pricing-Modell, das deine Marge sichert",
      "PM-Tool-Stack für planbare Projekt-Abwicklung eingerichtet",
      "Subunternehmer-konforme Zusammenarbeit und laufende Akquise-Pipeline"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine individuelle Rechts- oder Steuerberatung; Vorgaben etwa zur Scheinselbstständigkeit können sich ändern."
  },
  "creator-influencer-setup": {
    "seoTitle": "Creator & Influencer: Founder-Setup & Steuer-Trap",
    "seoDescription": "Creator-Business sauber aufsetzen: Werbekennzeichnung, Steuer-Setup, Sample-Tax und Sponsoring-Verträge in 2-6 Wochen - rechtssicher monetarisieren.",
    "lead": "Dieser Guide zeigt dir, wie du dein Creator-Business sauber aufsetzt: Werbekennzeichnung, Steuer-Setup, Sponsoring-Vertrags-Templates, Affiliate-Stack und die korrekte Behandlung von Geschenken und Samples. Für Creator, Influencer und Affiliates, die professionell monetarisieren wollen.",
    "urgency": "Fehlende Werbekennzeichnung kostet Abmahnungen, und kostenlose PR-Samples sind oft steuerpflichtige Einnahmen - eine Falle, die viele Creator erst bei der Nachzahlung bemerken. Wer ohne Verträge mit Brands arbeitet, steht bei Zahlungsausfall ohne Handhabe da. Setze Compliance und Steuer jetzt sauber auf. Mit GründerX gehst du das Creator-Setup Schritt für Schritt durch.",
    "outcomes": [
      "Geklärte Rechtsform für dein Creator-Business",
      "Rechtssichere Werbekennzeichnung gegen Abmahnungen",
      "Sponsoring-Vertrags-Templates für faire Brand-Deals",
      "Affiliate-Stack sauber aufgesetzt und tracking-fähig",
      "Steuer-Setup mit korrekter Behandlung von Geschenken und Sample-Tax"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine individuelle Rechts- oder Steuerberatung; Kennzeichnungspflichten und steuerliche Vorgaben können sich ändern."
  },
  "coach-experte-setup": {
    "seoTitle": "Coaching-Business gründen: Setup & FernUSG-Check",
    "seoDescription": "Coaching- oder Online-Kurs-Business sauber aufsetzen: Rechtsform, FernUSG-Falle, Plattform, AGB, Pricing & Launch-Funnel. In 2-8 Wochen live.",
    "lead": "Dieser Guide bringt dein Wissens-Business rechtssicher an den Start — von Rechtsform und Freiberuf-Check über die gefürchtete FernUSG-Falle bis zu Kurs-Plattform, Verträgen, Pricing und Launch-Funnel. Für Coaches, Experten und Kursverkäufer, die nicht ins offene Messer laufen wollen.",
    "urgency": "Wer Online-Kurse ohne FernUSG-Prüfung verkauft, riskiert nichtige Verträge und Rückzahlungen über Monate — ein Urteil kann das ganze Business kippen. Genau diese Lücke übersehen die meisten Coaches im Launch-Rausch. Je früher du Verträge, AGB und Plattform sauber aufsetzt, desto weniger musst du später teuer reparieren. Mit GründerX gehst du Schritt für Schritt durch das komplette Founder-Setup, bevor der erste Euro fließt.",
    "outcomes": [
      "Rechtsform gewählt und Freiberuf-vs-Gewerbe-Frage für dein Coaching geklärt",
      "FernUSG-Compliance geprüft — du weißt, ob dein Kurs zulassungspflichtig ist",
      "Kurs-Plattform aufgesetzt mit rechtskonformen AGB und Widerrufsbelehrung",
      "Pricing-Modell und Zahlungsabwicklung stehen",
      "Launch-Funnel skizziert und startklar für den ersten Verkauf"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechts- oder Steuerberatung; gerade beim FernUSG können sich Auslegung und Anforderungen ändern und hängen vom Einzelfall ab."
  },
  "freiberufler-anmelden": {
    "seoTitle": "Freiberufler anmelden: Ohne Gewerbeschein starten",
    "seoDescription": "Als Freiberufler anmelden ohne Gewerbeschein — nur Finanzamt nötig. Steuernummer, KSK- & Haftpflicht-Check und erste Rechnung in 1-3 Wochen.",
    "lead": "Dieser Guide zeigt dir, wie du dich als Freiberufler oder Freelancer korrekt beim Finanzamt anmeldest — ohne Gewerbeschein. Für Selbstständige in Katalogberufen wie Designer, Texter, Entwickler, Berater und kreative Köpfe.",
    "urgency": "Wer sich fälschlich als Gewerbe statt freiberuflich anmeldet, zahlt unnötig Gewerbesteuer und IHK-Beiträge — Geld, das du nie zurückbekommst. Auch die Abgrenzung zur KSK und eine fehlende Haftpflicht werden oft zu spät bedacht. Klärst du das vor dem Start, sparst du dir Nachzahlungen und Ärger mit dem Finanzamt. GründerX führt dich Schritt für Schritt durch Anmeldung, Status-Check und deine erste rechtssichere Rechnung.",
    "outcomes": [
      "Steuernummer als Freiberufler beim Finanzamt beantragt",
      "Geklärt, ob du wirklich freiberuflich oder doch gewerblich bist",
      "KSK-Pflicht und mögliche Mitgliedschaft geprüft",
      "Sinnvolle Berufshaftpflicht für deine Tätigkeit eingeordnet",
      "Erste rechtssichere Rechnung mit allen Pflichtangaben erstellt"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung und ersetzt keine Steuer- oder Rechtsberatung; die Einstufung als freiberuflich entscheidet im Zweifel das Finanzamt und kann sich je nach Tätigkeit unterscheiden."
  },
  "gbr-gruenden": {
    "seoTitle": "GbR gründen: Schritt für Schritt mit Mitgründer",
    "seoDescription": "GbR mit Mitgründer gründen ohne Notar: Vertrag, Steuernummer, Geschäftskonto & GmbH-Roadmap. Schnellste Rechtsform für 2+ Personen, in 1-2 Wochen.",
    "lead": "Dieser Guide bringt dich und deinen Mitgründer mit der GbR schnell an den Start — Gesellschaftsvertrag, Steuernummer, Geschäftskonto und eine Roadmap zur späteren GmbH-Umwandlung. Für Teams ab zwei Personen, die ohne Notar loslegen wollen.",
    "urgency": "Die GbR ist schnell gegründet, aber ihr haftet beide unbeschränkt mit eurem Privatvermögen — ohne sauberen Vertrag wird jeder Streit über Gewinne oder Ausstieg zur Falle. Genau hier scheitern viele Gründerteams. Ein klarer Gesellschaftsvertrag von Anfang an schützt euch vor teuren Konflikten und legt den Pfad zur GmbH schon fest. GründerX führt euch Schritt für Schritt durch Vertrag, Anmeldung und Konto.",
    "outcomes": [
      "GbR-Gesellschaftsvertrag mit klaren Regeln zu Gewinn, Stimmen und Ausstieg",
      "Gewerbe angemeldet und Steuernummer für die GbR beantragt",
      "Geschäftskonto auf die GbR eröffnet",
      "Haftungsrisiken verstanden und bewusst akzeptiert",
      "Roadmap für die spätere Umwandlung in eine GmbH skizziert"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechts- oder Steuerberatung; gerade beim Gesellschaftsvertrag und der Haftung lohnt sich im Zweifel anwaltliche Prüfung."
  },
  "restaurant-eroeffnen": {
    "seoTitle": "Restaurant eröffnen: Konzession, TSE & Genehmigungen",
    "seoDescription": "Restaurant eröffnen Schritt für Schritt: Gaststättenkonzession, Hygiene, TSE-Kasse, GEMA & alle Schulungen. Komplett-Setup in 3-6 Monaten.",
    "lead": "Dieser Guide führt dich durch die komplette Gastro-Eröffnung — Gaststättenkonzession, Hygienevorschriften, TSE-Kasse, GEMA und alle Pflichtschulungen und Versicherungen. Für angehende Gastronomen, die jede Sondergenehmigung im Griff haben wollen.",
    "urgency": "In der Gastronomie kostet jede fehlende Genehmigung bares Geld: Ohne Konzession, TSE-Kasse oder Belehrung droht die Schließung am Eröffnungstag — und das Lebensmittelrecht kennt kein Pardon. Viele unterschätzen die Monate für Behördengänge und Schulungen. Wer früh plant, vermeidet teuren Leerstand und Bußgelder. GründerX führt dich Schritt für Schritt durch alle Konzessionen, Schulungen und die Kassenpflicht.",
    "outcomes": [
      "Gaststättenkonzession und Standort-Genehmigungen beantragt",
      "TSE-konforme Kasse eingerichtet und Belegpflicht erfüllt",
      "Hygienebelehrung, HACCP-Konzept und Personalschulungen abgehakt",
      "GEMA-Anmeldung und Pflichtversicherungen geklärt",
      "Restaurant mit allen Sondergenehmigungen eröffnungsbereit"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung und ersetzt keine Rechtsberatung; konkrete Auflagen zu Konzession, Hygiene und Kasse variieren je nach Kommune und können sich ändern."
  },
  "handwerk-gruenden": {
    "seoTitle": "Handwerksbetrieb gründen: HWK & Meisterpflicht",
    "seoDescription": "Handwerksbetrieb gründen: Anlage A vs. B, Meisterpflicht & Handwerksrolle korrekt anmelden. Mit allen HWK- & BG-Pflichten, in 2-6 Wochen.",
    "lead": "Dieser Guide bringt deinen Handwerksbetrieb sauber in die Handwerksrolle — Abgrenzung Anlage A vs. B, Meisterpflicht, HWK-Eintragung und BG-Anmeldung. Für Handwerker, die ihren Betrieb von Beginn an rechtssicher anmelden wollen.",
    "urgency": "Wer ein zulassungspflichtiges Handwerk ohne Meistereintrag betreibt, riskiert ein Verbot und Bußgelder — und die falsche Einordnung in Anlage A oder B blockiert deinen Start. Diese Hürde übersehen viele bis zur ersten Kontrolle. Klärst du Meisterpflicht und Handwerksrolle vorab, sparst du dir Stillstand und Strafen. GründerX führt dich Schritt für Schritt durch Einstufung, HWK-Eintrag und alle BG-Pflichten.",
    "outcomes": [
      "Geklärt, ob dein Handwerk in Anlage A, B1 oder B2 fällt",
      "Meisterpflicht geprüft und passende Ausübungsberechtigung gefunden",
      "Eintragung in die Handwerksrolle bei der HWK erledigt",
      "Gewerbe angemeldet und Steuernummer beantragt",
      "BG BAU bzw. zuständige Berufsgenossenschaft angemeldet"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechtsberatung; die Zuordnung zur Meisterpflicht und Anlage entscheidet die Handwerkskammer im Einzelfall."
  },
  "immobilien-gmbh": {
    "seoTitle": "Immobilien-GmbH gründen: erweiterte Kürzung nutzen",
    "seoDescription": "Vermögensverwaltende Immobilien-GmbH gründen: erweiterte Kürzung § 9 GewStG = nur 15,825 % Steuer auf Mieten. Setup in 6-10 Wochen.",
    "lead": "Dieser Guide zeigt dir, wie du eine vermögensverwaltende Immobilien-GmbH mit erweiterter gewerbesteuerlicher Kürzung aufsetzt — sodass auf reine Mieterträge nur die Körperschaftsteuer anfällt. Für Vermieter und Investoren, die Mieteinnahmen steueroptimiert bündeln wollen.",
    "urgency": "Die erweiterte Kürzung nach § 9 GewStG bringt enorme Vorteile — aber schon eine einzige schädliche Tätigkeit oder ein Formfehler im Satzungszweck kippt sie für das ganze Jahr. Wer das ohne Plan startet, verschenkt genau den Steuervorteil, für den die GmbH gedacht war. Sauber aufgesetzt sicherst du dir die 15,825-%-Belastung dauerhaft. GründerX führt dich Schritt für Schritt durch Gründung, Satzung und StB-Setup.",
    "outcomes": [
      "Vermögensverwaltende GmbH mit kürzungssicherem Satzungszweck gegründet",
      "Erweiterte Kürzung nach § 9 GewStG korrekt beantragt",
      "Schädliche Tätigkeiten identifiziert und vermieden",
      "Steuerberater-Setup für laufende Buchhaltung und Jahresabschluss aufgebaut",
      "Mieterträge steueroptimiert in der GmbH gebündelt"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung und ersetzt keine Steuer- oder Rechtsberatung; die erweiterte Kürzung ist fehleranfällig und die Voraussetzungen können sich durch Rechtsprechung ändern."
  },
  "ag-gruenden": {
    "seoTitle": "AG gründen: Aktiengesellschaft für VC & ESOP",
    "seoDescription": "AG gründen Schritt für Schritt: Aufsichtsrat, Vorstand, Aktienregister & Gründungsprüfung. Für Startups mit VC-Plänen oder Aktien-Programmen.",
    "lead": "Dieser Guide führt dich durch die Gründung einer Aktiengesellschaft — mit Aufsichtsrat, Vorstand, Aktienregister und Gründungsprüfung. Für ambitionierte Startups mit VC-Plänen, IPO-Ambitionen oder Mitarbeiter-Aktien-Programmen.",
    "urgency": "Die AG bietet maximale Flexibilität für VC-Runden und Aktienprogramme, ist aber formaler und teurer als jede GmbH — Fehler bei Satzung, Gründungsprüfung oder Aufsichtsrat verzögern die Eintragung um Monate. Wer das unterschätzt, verbrennt Anwalts- und Notarkosten und verpasst Investoren-Timing. Sauber geplant gehst du runden-ready an den Markt. GründerX führt dich Schritt für Schritt durch Gründung, Organe und Aktienregister.",
    "outcomes": [
      "AG mit rechtssicherer Satzung notariell gegründet",
      "Vorstand und Aufsichtsrat korrekt bestellt",
      "Gründungsprüfung durchlaufen und Eintragung im Handelsregister erreicht",
      "Aktienregister und Kapitalstruktur sauber aufgesetzt",
      "Struktur vorbereitet für VC-Runde, ESOP oder späteren IPO"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechts- oder Steuerberatung; die AG-Gründung ist komplex und sollte von Notar und Fachanwalt begleitet werden."
  },
  "verein-gug": {
    "seoTitle": "Verein (e.V.) oder gUG gründen: Gemeinnützigkeit",
    "seoDescription": "e.V. oder gemeinnützige UG gründen: Satzung, Anerkennung der Gemeinnützigkeit & Spendenquittungen. Für Social Impact & NGOs, in 6-12 Wochen.",
    "lead": "Dieser Guide zeigt dir, wie du einen e.V. oder eine gemeinnützige UG gründest und die Anerkennung der Gemeinnützigkeit beim Finanzamt erhältst — inklusive Berechtigung für Spendenquittungen. Für Social-Impact-Projekte, NGOs und Sportclubs.",
    "urgency": "Ohne wasserdichte Satzung verweigert das Finanzamt die Gemeinnützigkeit — dann darfst du keine Spendenquittungen ausstellen und verlierst Förderungen und Steuervorteile. Genau an der Satzungsformulierung scheitern viele Initiativen. Wer die Mustervorgaben von Anfang an einhält, bekommt die Anerkennung sauber durch. GründerX führt dich Schritt für Schritt durch Satzung, Eintragung und Gemeinnützigkeits-Antrag.",
    "outcomes": [
      "Rechtsform e.V. vs. gUG bewusst für dein Vorhaben gewählt",
      "Mustersatzung mit gemeinnützigem Zweck erstellt",
      "Eintragung ins Vereins- bzw. Handelsregister erledigt",
      "Anerkennung der Gemeinnützigkeit beim Finanzamt beantragt",
      "Berechtigung zum Ausstellen von Spendenquittungen erhalten"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung und ersetzt keine Rechts- oder Steuerberatung; über die Gemeinnützigkeit entscheidet das Finanzamt anhand deiner Satzung und tatsächlichen Tätigkeit."
  },
  "unternehmenskauf": {
    "seoTitle": "Unternehmen kaufen: Asset vs. Share Deal & DD",
    "seoDescription": "Unternehmen kaufen Schritt für Schritt: Asset Deal vs. Share Deal, Due Diligence, Finanzierung & Übergabe. Mit 100-Tage-Plan, in 4-9 Monaten.",
    "lead": "Dieser Guide führt dich durch den Kauf eines bestehenden Unternehmens — von Asset- vs. Share-Deal über Due Diligence und Finanzierung bis zur Übergabe und dem 100-Tage-Plan. Für Nachfolger und Käufer, die statt bei null lieber etabliert starten.",
    "urgency": "Beim Unternehmenskauf übernimmst du im Share Deal auch verborgene Schulden, Altlasten und Risiken — eine schlampige Due Diligence kann dich teurer kommen als der Kaufpreis selbst. Diesen Punkt unterschätzen viele Käufer im Verhandlungseifer. Wer Struktur und Prüfung von Anfang an ernst nimmt, kauft sicher und finanzierbar. GründerX führt dich Schritt für Schritt durch Deal-Struktur, Prüfung, Finanzierung und Übernahme.",
    "outcomes": [
      "Asset Deal vs. Share Deal für deinen Fall bewertet",
      "Strukturierte Due Diligence zu Finanzen, Verträgen und Risiken durchgeführt",
      "Kaufpreis verhandelt und Finanzierung gesichert",
      "Kaufvertrag mit Garantien und Übergabe-Regeln aufgesetzt",
      "100-Tage-Plan für die Integration nach Übernahme erstellt"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechts-, Steuer- oder M&A-Beratung; ein Unternehmenskauf sollte stets von Fachberatern begleitet werden."
  },
  "meta-ads-setup": {
    "seoTitle": "Meta Ads Setup: Pixel, CAPI & erste Kampagne",
    "seoDescription": "Meta Ads Manager click-by-click aufsetzen: Business Manager, Pixel, CAPI, Audiences & erste Conversion-Kampagne. Komplett in 4-6 Stunden live.",
    "lead": "Dieser Guide führt dich click-by-click durch das komplette Meta-Ads-Setup — Business Manager, Pixel, Conversions API, Domain-Verifizierung, Custom Audiences, Lookalikes und deine erste publishbare Conversion-Kampagne. Für Shop-Betreiber und Werbetreibende, die sauber tracken wollen.",
    "urgency": "Ohne korrekt eingerichteten Pixel und CAPI verbrennt Meta dein Budget auf falsche Zielgruppen — fehlerhaftes Tracking kostet dich täglich Geld und verfälscht jede Optimierung. Genau dieses Fundament wird im Eifer oft übersprungen. Wer Pixel, Domain und Audiences von Anfang an sauber aufsetzt, holt aus jedem Euro mehr raus. GründerX führt dich Schritt für Schritt bis zur ersten startklaren Kampagne.",
    "outcomes": [
      "Business Manager und Werbekonto sauber strukturiert angelegt",
      "Meta-Pixel und Conversions API mit verifizierter Domain installiert",
      "Custom Audiences und Lookalike-Audiences aufgebaut",
      "Tracking-Events geprüft und korrekt feuernd",
      "Erste Conversion-Kampagne publishbar eingerichtet"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung; Meta ändert Interface, Tracking-Vorgaben und Datenschutz-Anforderungen regelmäßig, sodass einzelne Schritte abweichen können."
  },
  "klaviyo-setup": {
    "seoTitle": "Klaviyo Setup: Bis zum Welcome-Flow live",
    "seoDescription": "Klaviyo Schritt für Schritt einrichten: Shop-Sync, DKIM-Sender-Domain, Pop-Up & Welcome-Flow. Erste Sales aus E-Mail in 7 Tagen, in 1 Tag live.",
    "lead": "Dieser Guide bringt dein Klaviyo von null bis zum aktiven Welcome-Flow — Account, Shopify-/WooCommerce-Sync, DKIM-konforme Sender-Domain, Pop-Up und automatisierte Willkommensstrecke. Für Shop-Betreiber, die mit E-Mail wiederkehrenden Umsatz aufbauen wollen.",
    "urgency": "Ohne authentifizierte Sender-Domain landen deine Mails im Spam — und jeder Tag ohne Pop-Up und Welcome-Flow bedeutet verlorene Subscriber und entgangene Sales, die du nie zurückholst. Diesen Hebel lassen viele Shops monatelang liegen. Einmal sauber aufgesetzt, verdient die Strecke automatisch im Hintergrund. GründerX führt dich an einem Tag durch Setup, Domain-Auth und Welcome-Flow.",
    "outcomes": [
      "Klaviyo-Account mit Shopify- oder WooCommerce-Sync verbunden",
      "DKIM-konforme Sender-Domain eingerichtet für hohe Zustellraten",
      "Pop-Up zur E-Mail-Sammlung auf der Webseite live",
      "Automatisierter Welcome-Flow aktiv geschaltet",
      "Erste Sales aus E-Mail-Automation messbar"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung; Klaviyo-Oberfläche, Preise und Zustell-Anforderungen ändern sich laufend, und Versand muss DSGVO-konform mit Double-Opt-in erfolgen."
  },
  "google-ads-merchant-console-setup": {
    "seoTitle": "Google Ads, Merchant Center & Console Setup",
    "seoDescription": "Google Ads, Merchant Center & Search Console verknüpfen: Produkt-Feed, Property-Check & erste Search-Kampagne. Komplett-Setup in 1-2 Tagen.",
    "lead": "Dieser Guide verknüpft alle drei Google-Properties — Ads, Merchant Center und Search Console — bis zum Produkt-Feed, verifizierter Property und erster publishbarer Search-Kampagne. Für Shop-Betreiber, die Paid, Shopping und SEO-Tracking sauber aufstellen wollen.",
    "urgency": "Ein fehlerhafter Produkt-Feed oder eine unverknüpfte Search Console kostet dich Shopping-Sichtbarkeit und blinde SEO-Daten — Reichweite, die du ohne Fundament nie aufholst. Diese Verknüpfungen werden oft halbfertig liegengelassen. Wer alle drei Properties von Anfang an sauber koppelt, sieht jeden Klick und jeden Verkauf. GründerX führt dich Schritt für Schritt bis zur ersten aktiven Kampagne.",
    "outcomes": [
      "Google-Ads-Konto angelegt und Abrechnung eingerichtet",
      "Merchant Center mit validem Produkt-Feed verbunden",
      "Search Console mit verifizierter Property eingerichtet",
      "Alle drei Properties korrekt miteinander verknüpft",
      "Erste Brand-Defense-Search-Kampagne aktiv geschaltet"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung; Google ändert Oberflächen, Feed-Vorgaben und Richtlinien regelmäßig, sodass einzelne Schritte abweichen können."
  },
  "seo-step-by-step": {
    "seoTitle": "SEO Step-by-Step: Von Setup bis Top-3-Rankings",
    "seoDescription": "SEO click-by-click aufbauen: Technical, Content, Backlinks & Monitoring. Bis Money-Keywords Top-10 ranken — erste Rankings in 3-6 Monaten.",
    "lead": "Dieser Guide baut deine SEO von Grund auf — Search Console, Sitemap, Schema-Markup, fünf Pillar-Content-Stücke und ein Backlink-Outreach-Prozess. Für Gründer und Shop-Betreiber, die organischen Traffic statt dauerhafter Ad-Kosten wollen.",
    "urgency": "SEO ist ein Marathon: Jeder Monat ohne saubere Foundation und Content ist verlorene Zeit, die Wettbewerber nutzen, um die Top-Plätze für deine Money-Keywords zu besetzen. Wer erst spät startet, kämpft jahrelang gegen den Vorsprung anderer. Früh angefangen, kompoundiert organischer Traffic kostenlos weiter. GründerX führt dich Schritt für Schritt durch Technical, Content, Backlinks und Monitoring.",
    "outcomes": [
      "Search Console, Sitemap und Schema-Markup sauber eingerichtet",
      "Technische SEO-Basis ohne Crawling- und Indexierungsfehler",
      "Fünf Pillar-Content-Stücke für deine Money-Keywords erstellt",
      "Backlink-Outreach-Prozess aufgesetzt und am Laufen",
      "Monitoring aktiv, um Rankings und Fortschritt zu verfolgen"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung; SEO-Ergebnisse sind nicht garantiert, hängen von Wettbewerb und Aufwand ab, und Google-Algorithmen ändern sich laufend."
  },
  "tiktok-ads-setup": {
    "seoTitle": "TikTok Ads Setup: Konto, Pixel & erste Kampagne",
    "seoDescription": "TikTok Ads von 0 aufsetzen: Business Center, Pixel, Events API, Werbekonto und erste Spark Ad. Click-by-click bis live in 3-5 Stunden.",
    "lead": "Dieser Guide bringt dich click-by-click von null bis zur ersten live geschalteten TikTok-Spark-Ad: Business Center, Pixel, Events API und Werbekonto inklusive. Fuer Gruender, D2C-Shops und Creator, die TikTok als Paid-Kanal erschliessen wollen.",
    "urgency": "TikTok-CPMs sind in vielen Nischen noch deutlich guenstiger als Meta, aber der Vorsprung schrumpft mit jedem neuen Werbetreibenden. Ein falsch aufgesetzter Pixel oder fehlendes Events-API-Tracking bedeutet, dass du Budget verbrennst, ohne Conversions sauber messen zu koennen, und Lookalikes nie sauber lernen. Setz das Fundament jetzt richtig auf, statt spaeter teuer nachzubessern. Mit GründerX hast du jeden Schritt vom Business Center bis zur Spark Ad an einem Ort.",
    "outcomes": [
      "Live TikTok-Werbekonto mit verifiziertem Business Center",
      "Pixel plus Events API sauber installiert und Conversions tracken korrekt",
      "Custom-Audiences und Retargeting-Basis eingerichtet",
      "Eine publishbare Conversion-Spark-Ad fertig zum Launch",
      "Klare Test-Budget-Logik ab 30 Euro pro Tag"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung zum Setup, ersetzt keine Steuer- oder Rechtsberatung, und Plattform-Richtlinien von TikTok koennen sich jederzeit aendern."
  },
  "creator-tiktok-instagram": {
    "seoTitle": "TikTok & Instagram Creator werden: Short-Form-Guide",
    "seoDescription": "Short-Form auf TikTok & Instagram aufbauen: Algo-Mechanik, 4-Tage-Routine, erste 10k Follower und alle Monetarisierungs-Pfade bis Brand-Deals.",
    "lead": "Dieser Guide zeigt dir den Aufbau profitabler Short-Form-Accounts auf TikTok und Instagram: Algorithmus-Mechanik, Posting-Routine und jeden Monetarisierungs-Pfad vom Creator-Fund bis zu Brand-Deals. Fuer angehende Creator und Solo-Selbststaendige, die mit Video Reichweite aufbauen wollen.",
    "urgency": "Short-Form-Reichweite baut sich langsam auf, aber jeder Tag ohne Posting-Routine ist verlorene Lernzeit fuer den Algorithmus und fuer dich. Wer ohne System startet, postet wahllos, sieht keine Muster und gibt nach drei Wochen frustriert auf. Ein klarer 4-Tage-Rhythmus mit Format-Logik bringt dich schneller an die ersten 10k Follower, ab denen echte Monetarisierung greift. Mit GründerX hast du Routine, Hooks und Monetarisierungs-Pfade strukturiert vor dir.",
    "outcomes": [
      "Live TikTok- und Instagram-Accounts mit festem 4-Tage-Posting-Rhythmus",
      "Verstaendnis der Algo-Mechanik fuer Reichweite statt Glueckstreffer",
      "Erste 10k Follower als realistisches Etappenziel",
      "Aktivierte Monetarisierung: Creator-Fund, Live-Gifts, Affiliate, Brand-Deals",
      "Schlankes Equipment- und Editing-Setup ab 100 Euro"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung, ersetzt keine Steuer- oder Rechtsberatung, und Plattform-Programme sowie Monetarisierungs-Bedingungen koennen sich jederzeit aendern."
  },
  "creator-youtube-longform": {
    "seoTitle": "YouTube Channel aufbauen: Long-Form & Monetarisierung",
    "seoDescription": "YouTube Long-Form starten: 1.000 Abos und 4.000 Watch-Hours fuer AdSense, Mid-Rolls, Sponsoring und Newsletter-Funnel. Schritt fuer Schritt.",
    "lead": "Dieser Guide fuehrt dich durch den Aufbau eines monetarisierbaren YouTube-Channels mit Long-Form-Content: von der AdSense-Eligibility ueber Sponsoring bis zu eigenen Produkten. Fuer Creator und Gruender, die auf tiefe Audience-Bindung und hohe CPMs setzen.",
    "urgency": "Long-Form auf YouTube ist das Format mit den hoechsten CPMs und der tiefsten Audience-Bindung, aber bis zur AdSense-Schwelle aus 1.000 Abos und 4.000 Watch-Hours vergehen oft Monate. Jedes Video ohne klare Thumbnail-, Titel- und Retention-Strategie kostet dich Reichweite, die sich kaum zurueckholen laesst. Wer frueh strukturiert startet, baut einen Asset auf, der jahrelang Views und Umsatz traegt. Mit GründerX planst du Channel, Funnel und Monetarisierung von Anfang an sauber.",
    "outcomes": [
      "Live YouTube-Channel mit klarer Nischen- und Format-Strategie",
      "1.000+ Abonnenten und 4.000 Watch-Hours als AdSense-Schwelle",
      "Mid-Roll-Ads aktiviert fuer wiederkehrende AdSense-Einnahmen",
      "Sponsoring-Pipeline und Newsletter-Funnel aufgebaut",
      "Skalierbares Produktions-Setup vom Solo-Dreh bis zum Editor"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung, ersetzt keine Steuer- oder Rechtsberatung, und die Monetarisierungs-Bedingungen des YouTube-Partnerprogramms koennen sich jederzeit aendern."
  },
  "creator-twitter-reddit": {
    "seoTitle": "Twitter (X) & Reddit aufbauen: Text-First Creator-Guide",
    "seoDescription": "Audience auf X und Reddit aufbauen: Threads, Insights, Niche-Authority und Karma. Funnel zu Newsletter und Coaching Schritt fuer Schritt.",
    "lead": "Dieser Guide zeigt dir, wie du auf Twitter (X) ueber Insights und Threads sowie auf Reddit ueber Niche-Authority eine Audience aufbaust und sie in Newsletter und Coaching ueberfuehrst. Fuer text-affine Gruender, Experten und Solo-Selbststaendige.",
    "urgency": "Text-First-Plattformen belohnen Konstanz und echte Substanz, aber genau hier scheitern die meisten, weil sie sporadisch posten oder auf Reddit als Werbung wahrgenommen werden und ihr Karma verbrennen. Ohne klaren Funnel sammelst du Follower, die nie zu Einnahmen werden. Wer Audience und Monetarisierung von Anfang an zusammen denkt, baut eine Liste auf, die unabhaengig vom Algorithmus traegt. Mit GründerX hast du Posting-Logik und Funnel-Aufbau strukturiert vor dir.",
    "outcomes": [
      "Live X- und Reddit-Profile mit klarer Positionierung",
      "Aktive Community statt stiller Follower",
      "5k+ X-Follower oder 10k+ Karma in 2-3 Subreddits als Etappenziel",
      "Funnel zu Newsletter und Coaching aufgesetzt",
      "Verstaendnis fuer Reddit-Regeln, das Bans vermeidet"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung, ersetzt keine Steuer- oder Rechtsberatung, und die Plattform- und Subreddit-Regeln koennen sich jederzeit aendern."
  },
  "creator-pinterest": {
    "seoTitle": "Pinterest Marketing: Traffic-Maschine fuer Gruender",
    "seoDescription": "Pinterest als Search-Engine nutzen: Business-Account, Boards, Idea-Pins und Long-Lifetime-Traffic zu Shop und Newsletter. In 3-9 Monaten.",
    "lead": "Dieser Guide nutzt Pinterest als Such-Maschine mit langlebigem Traffic statt als Social-Feed: Business-Account, Boards, Idea-Pins und automatischer Traffic-Flow zu Shop und Newsletter. Fuer Brand-Owner und Affiliate-Creator, die einen ruhigen Top-Funnel-Kanal wollen.",
    "urgency": "Ein Pinterest-Pin lebt im Schnitt 3-6 Monate, ein TikTok-Video oft nur 24-72 Stunden, doch viele unterschaetzen Pinterest komplett und lassen diesen passiven Traffic-Strom links liegen. Wer jetzt eine saubere Board- und Pin-Struktur aufbaut, sammelt Traffic, der noch in einem Jahr Besucher in deinen Funnel spuelt. Jeder Monat ohne Pinterest-Praesenz ist verschenkte Sichtbarkeit in einer Suchmaschine mit klarer Kaufabsicht. Mit GründerX baust du den Kanal Schritt fuer Schritt strategisch auf.",
    "outcomes": [
      "Live Pinterest-Business-Account mit 50+ thematischen Boards",
      "200+ Idea- und Standard-Pins als Traffic-Basis",
      "Automatischer Traffic-Flow zu Newsletter und Shop",
      "Pin-Lifetime von Monaten statt Stunden ausgenutzt",
      "Schlanker Workflow mit optionalen Tools wie Tailwind und Canva"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung, ersetzt keine Steuer- oder Rechtsberatung, und Pinterest-Richtlinien sowie Tool-Preise koennen sich jederzeit aendern."
  },
  "coach-1-on-1": {
    "seoTitle": "1:1-Coaching starten: Premium-Setup ohne FernUSG",
    "seoDescription": "1:1-Coaching aufsetzen: Premium-Pricing 250-500 Euro/h, klare Vertraege, sauberer Booking-Flow und 8-15 Klienten. In 1-2 Wochen live.",
    "lead": "Dieser Guide bringt dein 1:1-Coaching in 1-2 Wochen live: Premium-Pricing, klare Vertraege und ein sauberer Booking-Flow, ohne FernUSG-Risiko bei rein synchroner Arbeit. Fuer Experten und Solo-Selbststaendige, die ihr Wissen hochpreisig anbieten wollen.",
    "urgency": "Rein synchrones 1:1-Coaching ist der schnellste Weg in profitables Coaching, weil es bei korrektem Setup nicht unter das FernUSG faellt, das asynchrone Kurse zulassungspflichtig macht. Wer ohne klare Vertraege und sauberen Booking-Flow startet, riskiert No-Shows, Streit ueber Leistungsumfang und unbezahlte Stunden. Ein durchdachtes Setup erlaubt dir, ab Tag eins 250-500 Euro pro Stunde sauber abzurechnen. Mit GründerX setzt du Pricing, Vertraege und Booking strukturiert auf.",
    "outcomes": [
      "Live 1:1-Coaching-Setup in 1-2 Wochen",
      "Premium-Pricing von 250-500 Euro pro Stunde definiert",
      "Klare Vertraege, die Leistungsumfang und Bezahlung absichern",
      "Sauberer Booking-Flow gegen No-Shows",
      "8-15 aktive Klienten pro Monat als realistisches Auslastungsziel"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung, ersetzt keine Steuer- oder Rechtsberatung; ob dein Angebot unter das FernUSG faellt, solltest du im Einzelfall rechtlich pruefen lassen, da sich Anforderungen aendern koennen."
  },
  "coach-group-mastermind": {
    "seoTitle": "Group-Coaching & Mastermind aufbauen: 1:n skalieren",
    "seoDescription": "Group-Coaching statt 1:1: 8-12 Klienten parallel, 12-Wochen-Format, Community-Backend und Sales-Pipeline. In 4-8 Wochen zum Launch.",
    "lead": "Dieser Guide zeigt dir den Aufbau eines Group-Coachings oder Masterminds mit 8-12 Klienten parallel: 12-Wochen-Format, Community-Backend und Sales-Pipeline. Fuer Coaches, die ihr 1:1-Modell um den 5- bis 20-fachen Hebel skalieren wollen.",
    "urgency": "Group-Coaching multipliziert deinen Stundensatz, weil du dieselbe Zeit an viele Klienten gleichzeitig verkaufst und ein Community-Effekt entsteht, der die Ergebnisse verbessert. Wer aber ohne klares Format und Sales-Pipeline launcht, fuellt die erste Cohort nicht voll und verbrennt seinen Launch-Schwung. Ein strukturiertes 12-Wochen-Programm mit passendem Community-Backend macht aus deinem Wissen ein skalierbares, teils wiederkehrendes Einkommen. Mit GründerX planst du Format, Backend und Pipeline Schritt fuer Schritt.",
    "outcomes": [
      "Live Group-Coaching-Programm in 4-8 Wochen",
      "8-12 aktive Klienten pro Cohort als realistisches Launch-Ziel",
      "Klares 12-Wochen-Format mit definierten Meilensteinen",
      "Community-Backend auf Discord, Circle oder Skool aufgesetzt",
      "Sales-Pipeline zur Befuellung der naechsten Cohorts"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung, ersetzt keine Steuer- oder Rechtsberatung; je nach Aufbau koennen FernUSG-Fragen relevant werden, und Anforderungen koennen sich aendern."
  },
  "coach-online-course": {
    "seoTitle": "Online-Kurs erstellen: FernUSG & ZFU richtig meistern",
    "seoDescription": "Self-Paced-Kurs aufbauen: FernUSG-Compliance, ZFU-Zulassung, Plattform-Wahl und Launch-Funnel. Schritt fuer Schritt, rechtlich sauber.",
    "lead": "Dieser Guide fuehrt dich durch den Aufbau eines asynchronen Online-Kurses inklusive der kritischen FernUSG-Falle: ZFU-Zulassung, Plattform-Wahl, Launch-Funnel und Customer-Success-Process. Fuer Coaches und Experten, die ihr Wissen maximal skalierbar verkaufen wollen.",
    "urgency": "Self-Paced-Kurse skalieren am staerksten, aber genau hier liegt die teuerste Falle im Coaching-Markt: Wer einen asynchronen Lehrgang ohne ZFU-Zulassung verkauft, riskiert nach FernUSG nichtige Vertraege und Abmahnungen. Viele Anbieter erfahren davon erst, wenn Rueckforderungen oder ein Wettbewerber-Anwalt vor der Tuer stehen. Wer Compliance, Plattform und Funnel von Anfang an zusammen aufsetzt, baut ein sicheres und skalierbares Produkt. Mit GründerX gehst du den Setup-Pfad inklusive ZFU-Schritten strukturiert durch.",
    "outcomes": [
      "Live Online-Kurs auf Elopage, Kajabi oder Coachy",
      "FernUSG-Compliance geklaert und ZFU-Zulassung angestossen",
      "Passende Plattform statt teurer Fehlentscheidung",
      "Launch-Funnel und Customer-Success-Process aufgesetzt",
      "100-1.000+ Kaeufer pro Launch als realistische Groessenordnung"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung, ersetzt keine Steuer- oder Rechtsberatung; ob und in welcher Form eine ZFU-Zulassung noetig ist, musst du im Einzelfall rechtlich pruefen lassen, da sich Anforderungen aendern koennen."
  },
  "coach-membership": {
    "seoTitle": "Membership aufbauen: Recurring Revenue mit Community",
    "seoDescription": "Membership-Site starten: 47-97 Euro/Mon Sweet-Spot, Community-Backend, niedrige Churn und 100-1.000+ Members. In 4-8 Wochen live.",
    "lead": "Dieser Guide zeigt dir den Aufbau einer Membership mit planbaren monatlichen Einnahmen: 47-97 Euro Sweet-Spot, Community-Backend und Churn-Kontrolle. Fuer Coaches und Creator, die wiederkehrendes Einkommen statt Einmal-Verkaeufen aufbauen wollen.",
    "urgency": "Eine Membership verwandelt schwankende Projekt-Einnahmen in planbaren Monthly-Recurring-Revenue, der mit jedem Member waechst. Der haeufigste Fehler ist hohe Churn, weil der laufende Mehrwert und das Community-Erlebnis fehlen, sodass Members nach zwei Monaten wieder kuendigen. Wer Pricing, Content-Rhythmus und Community-Hebel von Anfang an richtig aufsetzt, baut ein Einkommen, das sich Monat fuer Monat stabilisiert. Mit GründerX strukturierst du Setup, Pricing und Retention Schritt fuer Schritt.",
    "outcomes": [
      "Live Membership-Site in 4-8 Wochen",
      "Pricing im 47-97 Euro Sweet-Spot festgelegt",
      "Aktives Community-Backend als Bindungs-Hebel",
      "Churn unter 5 Prozent pro Monat als Zielgroesse",
      "100-1.000+ aktive Members als skalierbares Ziel"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung, ersetzt keine Steuer- oder Rechtsberatung; je nach Content-Form koennen FernUSG-Fragen relevant werden, und Anforderungen koennen sich aendern."
  },
  "crowdfunding-equity": {
    "seoTitle": "Equity-Crowdfunding: Companisto & Seedmatch starten",
    "seoDescription": "Equity-Crowdfunding aufsetzen: bis 6 Mio Euro ECSP-frei, VIB/WIB-Doku, Investor-Reporting und Pooling-Vehicle fuer spaetere VCs.",
    "lead": "Dieser Guide fuehrt dich durch eine Equity-Crowdfunding-Kampagne auf Plattformen wie Companisto oder Seedmatch: Funding-Goal, VIB/WIB-Dokumentation, Investor-Reporting und ein Pooling-Vehicle fuer spaetere VC-Kompatibilitaet. Fuer Gruender mit Kapitalbedarf von 500k bis 3 Mio Euro.",
    "urgency": "Equity-Crowdfunding bringt nicht nur Kapital, sondern auch hunderte Marken-Botschafter, doch ein schlecht strukturiertes Cap-Table oder fehlendes Pooling-Vehicle kann dich spaeter in VC-Runden ausbremsen oder unmoeglich machen. Fehler bei VIB/WIB-Dokumentation oder Investor-Reporting sind teuer und rechtlich heikel. Wer die Struktur vor dem Launch sauber aufsetzt, haelt sich alle Finanzierungs-Optionen offen. Mit GründerX gehst du Pre-Kampagne, Doku und Reporting strukturiert durch.",
    "outcomes": [
      "Live Equity-Crowdfunding-Kampagne mit 500k-3 Mio Euro Funding-Goal",
      "VIB/WIB-Dokumentation vorbereitet",
      "ECSP-Befreiung bis 6 Mio Euro genutzt",
      "Investor-Reporting-Process aufgesetzt",
      "Pooling-Vehicle fuer spaetere VC-Kompatibilitaet eingerichtet"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung, ersetzt keine Rechts- oder Steuerberatung; Equity-Crowdfunding ist stark reguliert und sollte rechtlich begleitet werden, da sich Schwellen und Anforderungen aendern koennen."
  },
  "crowdfunding-reward": {
    "seoTitle": "Reward-Crowdfunding: Kickstarter & Indiegogo starten",
    "seoDescription": "Reward-Crowdfunding planen: Pre-Launch-Liste, Funding-Goal, Fulfillment-Plan und Backerkit-Sales. Pre-Order-Modell ohne Anteils-Transfer.",
    "lead": "Dieser Guide zeigt dir eine Reward-Crowdfunding-Kampagne auf Kickstarter oder Indiegogo nach dem Pre-Order-Modell: Pre-Launch-Email-Liste, Funding-Goal, Fulfillment-Plan und Post-Campaign-Sales via Backerkit. Fuer Hardware- und Innovations-Gruender, die ihren Markt validieren und finanzieren wollen.",
    "urgency": "Reward-Crowdfunding validiert deinen Markt und finanziert die erste Produktion, ohne dass du Anteile abgibst, aber der Erfolg entscheidet sich Wochen vor dem Launch ueber deine Pre-Launch-Email-Liste. Kampagnen ohne aufgewaermtes Publikum starten ins Leere und scheitern in den ersten 48 Stunden. Und wer Fulfillment unterschaetzt, liefert verspaetet und beschaedigt seine Marke dauerhaft. Mit GründerX planst du Pre-Kampagne, Funding und Fulfillment Schritt fuer Schritt.",
    "outcomes": [
      "Live Reward-Crowdfunding-Kampagne mit 50-500k Euro Funding-Ziel",
      "Pre-Launch-Email-Liste von 5-50k Subscribern aufgebaut",
      "Realistischer Fulfillment-Plan vor dem Launch",
      "Post-Campaign-Sales via Backerkit vorbereitet",
      "Marktvalidierung und Finanzierung ohne Anteils-Transfer"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung, ersetzt keine Rechts- oder Steuerberatung; Plattform-Bedingungen, Gebuehren und Verbraucherschutz-Pflichten koennen sich aendern."
  },
  "crowdfunding-token-launch": {
    "seoTitle": "Token-Launch in der EU: MiCAR-konform aufsetzen",
    "seoDescription": "Krypto-Token MiCAR-konform launchen: White-Paper, BaFin-Notification, Smart-Contract-Audit und KYC/AML. Realistisch ab 5 Mio Euro Ziel.",
    "lead": "Dieser Guide fuehrt dich durch einen MiCAR-konformen Token-Launch in der EU: White-Paper, BaFin-Notification, Smart-Contract-Audit und KYC/AML-Setup. Fuer Gruender mit ernsthaftem Krypto-Vorhaben und einem Funding-Ziel ab 5 Mio Euro.",
    "urgency": "Seit MiCAR ist ein Token-Launch in der EU streng reguliert: Ohne korrektes White-Paper, BaFin-Notification, Smart-Contract-Audit und KYC/AML-Setup riskierst du Vertriebsverbote und persoenliche Haftung. Die Compliance-Kosten sind hoch und der Setup-Pfad zieht sich ueber Monate, weshalb sich das Modell realistisch erst ab mehreren Millionen Euro Funding-Ziel rechnet. Wer den Pfad strukturiert plant, vermeidet teure Fehlstarts. Mit GründerX behaeltst du jeden Compliance-Schritt im Blick.",
    "outcomes": [
      "Live Token-Launch MiCAR-konform aufgesetzt",
      "Rechtskonformes White-Paper erstellt",
      "BaFin-Notification vorbereitet",
      "Smart-Contract-Audit eingeplant",
      "KYC/AML-Setup fuer regulatorische Anforderungen"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung, ersetzt keine Rechts- oder Steuerberatung; ein Token-Launch ist hochreguliert, MiCAR-Anforderungen entwickeln sich weiter und sollten zwingend mit spezialisierten Anwaelten umgesetzt werden."
  },
  "hiring-festanstellung": {
    "seoTitle": "Ersten Mitarbeiter einstellen: Festanstellung-Guide",
    "seoDescription": "Erste Festanstellung sauber aufsetzen: KSchG-konformer Arbeitsvertrag, Sozialvers-Meldung und Onboarding. In 2-4 Wochen rechtssicher.",
    "lead": "Dieser Guide bringt dich durch deine erste Festanstellung: KSchG-konformer Arbeitsvertrag, Sozialversicherungs-Meldung und korrektes Onboarding. Fuer Gruender und Solo-Selbststaendige, die ihren ersten Vollzeit-Mitarbeiter einstellen wollen.",
    "urgency": "Der erste Hire ist der Schritt mit den hoechsten rechtlichen Anforderungen: Ein fehlerhafter Arbeitsvertrag, eine verpasste Sozialversicherungs-Meldung oder ignoriertes KSchG koennen schnell vierstellige Nachzahlungen und Streit ausloesen. Wer hier ohne sauberen Process startet, baut sich Risiken ein, die ein Jahr spaeter teuer werden. Mit dem richtigen Setup wird aus deinem ersten Mitarbeiter ein echter Hebel statt eines Klotzes am Bein. Mit GründerX gehst du Vertrag, Meldung und Onboarding strukturiert durch.",
    "outcomes": [
      "Erster Mitarbeiter rechtssicher eingestellt",
      "KSchG-konformer Arbeitsvertrag aufgesetzt",
      "Sozialversicherungs-Meldung korrekt durchgefuehrt",
      "Sauberer Onboarding-Process etabliert",
      "Klarer Blick auf AG-Anteil und laufende Lohnkosten"
    ],
    "disclaimer": "Dieser Guide bietet praktische Orientierung, ersetzt keine Rechts- oder Steuerberatung; Arbeitsvertraege sollten anwaltlich geprueft werden, und arbeits- sowie sozialversicherungsrechtliche Anforderungen koennen sich aendern."
  },
  "hiring-freelancer": {
    "seoTitle": "Freelancer beauftragen: Werkvertrag rechtssicher",
    "seoDescription": "Freelancer rechtssicher beauftragen: sauberer Werkvertrag, Scheinselbstständigkeit vermeiden, Statusfeststellung bei DRV-Risiko. In 1-2 Wochen.",
    "lead": "Dieser Guide zeigt dir Schritt fuer Schritt, wie du als Gruender oder E-Commerce-Haendler Freelancer ueber Werk- oder Dienstvertraege beauftragst - und wie du die teure Scheinselbststaendigkeits-Falle umgehst.",
    "urgency": "Wenn ein Freelancer faktisch wie ein Angestellter arbeitet, kann die Deutsche Rentenversicherung rueckwirkend Sozialabgaben fuer bis zu vier Jahre nachfordern - plus Saeumniszuschlaege und im Ernstfall strafrechtliche Folgen. Gerade bei langfristigen 1-Klient-Beziehungen wird es schnell teuer, wenn der Vertrag und die gelebte Praxis nicht sauber sind. Bau deinen Freelancer-Pool von Anfang an richtig auf, statt spaeter teuer nachzubessern. Mit GruenderX gehst du jeden Schritt strukturiert durch und erkennst Risiko-Faelle, bevor sie zum Problem werden.",
    "outcomes": [
      "Live Freelancer-Pool mit 3-5 Subunternehmern und sauberen Vertraegen",
      "Rechtssichere Werk- bzw. Dienstvertraege als Vorlage",
      "Klarheit ueber die Merkmale der Scheinselbststaendigkeit",
      "Statusfeststellungs-Verfahren bei DRV-Risiko-Faellen eingeleitet",
      "Keine boese Ueberraschung bei einer DRV-Betriebspruefung"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechts- oder Steuerberatung; sozialversicherungsrechtliche Bewertungen sind Einzelfallentscheidungen und Anforderungen koennen sich aendern."
  },
  "hiring-minijob-werkstudent": {
    "seoTitle": "Minijob & Werkstudent einstellen: die Anleitung",
    "seoDescription": "Minijobber (603 EUR) und Werkstudenten richtig einstellen: Vertraege, Minijob-Zentrale, Werkstudent-Status. Geringe Lohnnebenkosten in 1-2 Wochen.",
    "lead": "Dieser Guide fuehrt dich durch die erste Einstellung von Minijobbern und Werkstudenten - mit korrekten Vertraegen, Anmeldung und Status-Bestaetigung. Ideal fuer die Test-Phase oder den Start deiner Skalierung.",
    "urgency": "Minijob und Werkstudent sind die guenstigsten Wege, dir erste Unterstuetzung zu holen - aber Fehler bei der Anmeldung oder der 20-Stunden-Grenze beim Werkstudenten kosten dich nachtraeglich volle Sozialabgaben. Wird die Geringfuegigkeitsgrenze ueberschritten oder die Minijob-Zentrale-Anmeldung versaeumt, drohen Nachzahlungen und Aerger mit der Krankenkasse. Mach es einmal sauber, statt spaeter rueckzurechnen. Mit GruenderX hast du die korrekten Vertraege, Fristen und Grenzen direkt an der Hand.",
    "outcomes": [
      "Erste Minijobber oder Werkstudenten mit korrekten Vertraegen eingestellt",
      "Anmeldung bei der Minijob-Zentrale sauber durchgefuehrt",
      "Werkstudent-Status korrekt geprueft und bestaetigt",
      "Reduzierte Lohnnebenkosten richtig kalkuliert",
      "Saubere Basis fuer den Schritt zur sozialversicherungspflichtigen Stelle"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung und ersetzt keine Lohn-, Steuer- oder Rechtsberatung; Geringfuegigkeitsgrenzen und Anforderungen koennen sich aendern."
  },
  "amazon-brand-registry": {
    "seoTitle": "Amazon Brand Registry freischalten: Anleitung 2026",
    "seoDescription": "Eingetragene Marke im Amazon Brand Registry freischalten: A+ Content, Brand Store, Markenschutz. Schritt fuer Schritt in 1-3 Wochen.",
    "lead": "Dieser Guide zeigt dir, wie du deine eingetragene Marke im Amazon Brand Registry freischaltest und damit Zugriff auf A+ Content, Brand Store, Sponsored Brands und Markenschutz-Tools bekommst.",
    "urgency": "Ohne Brand Registry stehst du Produktpiraten und Listing-Hijackern praktisch schutzlos gegenueber - jeder kann sich an dein Listing haengen und deine Marge kaputtmachen. Gleichzeitig laesst du ohne A+ Content und Brand Store taeglich Conversion liegen. Je laenger du wartest, desto mehr Umsatz und Markenkontrolle verschenkst du. Mit GruenderX gehst du den Freischalt-Prozess sauber durch und nutzt von Anfang an alle Marken-Tools.",
    "outcomes": [
      "Marke im Amazon Brand Registry freigeschaltet",
      "Zugriff auf A+ Content fuer hoehere Conversion",
      "Eigener Brand Store und Sponsored Brands nutzbar",
      "Brand Analytics fuer datenbasierte Entscheidungen",
      "Markenschutz-Tools gegen Hijacker und Counterfeits aktiv"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechts- oder Markenberatung; Amazon-Anforderungen und Markenrecht koennen sich aendern."
  },
  "amazon-transparency": {
    "seoTitle": "Amazon Transparency einrichten: Schutz vor Faelschungen",
    "seoDescription": "Amazon Transparency einrichten: Echtheitscodes pro Einheit gegen Counterfeits und Hijacker. Anleitung Schritt fuer Schritt in 1-2 Wochen.",
    "lead": "Dieser Guide erklaert dir, wie du deine Produkte im Amazon-Transparency-Programm anmeldest und mit eindeutigen Echtheitscodes pro Einheit gegen Faelschungen und Hijacker absicherst.",
    "urgency": "Schon eine einzige Counterfeit-Charge unter deinem Listing kann Bewertungen ruinieren, Retouren ausloesen und deine Marke nachhaltig beschaedigen. Transparency vergibt fuer jede Einheit einen eindeutigen Echtheitscode - faelscht jemand dein Produkt, fliegt es beim Scan sofort auf. Wartest du, bis der erste Hijacker da ist, ist der Schaden meist schon entstanden. Mit GruenderX richtest du Transparency strukturiert ein und schliesst die Luecke, bevor sie ausgenutzt wird.",
    "outcomes": [
      "Produkte im Transparency-Programm angemeldet",
      "Eindeutige Echtheitscodes pro produzierter Einheit",
      "Schutz vor Counterfeits direkt am Produkt",
      "Hijacker werden beim Code-Scan erkannt",
      "Hoeheres Kundenvertrauen durch verifizierte Echtheit"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung und ersetzt keine Rechtsberatung; Amazon-Programmbedingungen und Code-Gebuehren koennen sich aendern."
  },
  "weee-registrierung": {
    "seoTitle": "WEEE-Registrierung: Elektrogeraete bei stiftung ear melden",
    "seoDescription": "WEEE-Registrierung nach ElektroG: Reg.-Nr. bei stiftung ear, Garantie, Mengenmeldung. Marktplatz-konform werden in 2-6 Wochen.",
    "lead": "Dieser Guide fuehrt dich durch die WEEE-Registrierung nach ElektroG bei der stiftung ear - von der Reg.-Nr. ueber die insolvenzsichere Garantie bis zur laufenden Mengenmeldung.",
    "urgency": "Wer Elektrogeraete ohne gueltige WEEE-Reg.-Nr. verkauft, riskiert Bussgelder bis zu 100.000 EUR, Vertriebsverbote und sofortige Sperrung durch Marktplaetze wie Amazon. Plattformen pruefen die Registrierung inzwischen automatisch ab - fehlt sie, sind deine Listings raus. Da die ear-Registrierung Wochen dauern kann, solltest du jetzt starten, statt vor dem Launch festzustecken. Mit GruenderX gehst du jeden Schritt der Registrierung sauber durch.",
    "outcomes": [
      "Gueltige WEEE-Reg.-Nr. (DE...) bei der stiftung ear",
      "Insolvenzsichere Garantie fuer den B2C-Vertrieb hinterlegt",
      "Reg.-Nr. bei allen relevanten Marktplaetzen eingetragen",
      "Laufende Mengenmeldung korrekt aufgesetzt",
      "Vertriebsverbote und Marktplatz-Sperren vermieden"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechtsberatung; ElektroG-Pflichten, Gebuehren und ear-Anforderungen koennen sich aendern."
  },
  "amazon-produkt-anlegen": {
    "seoTitle": "Amazon-Listing erstellen: Titel, Bilder, A+ & Keywords",
    "seoDescription": "Conversion-starkes Amazon-Listing anlegen: Keyword-Recherche, Titel, Bilder, A+, GTIN und Compliance. Bereit zum Ranken in 2-4 Tagen.",
    "lead": "Dieser Guide zeigt dir, wie du ein conversion-optimiertes Amazon-Listing erstellst - keyword-recherchiert, mit starken Bildern und A+, korrekter GTIN und sauberer Compliance.",
    "urgency": "Ein schwaches Listing verbrennt jeden Euro PPC, den du reinsteckst: schlechter Titel, lahme Bilder und falsche Keywords kosten dich Ranking und Conversion ab der ersten Stunde. Wer hier schlampt, kaempft spaeter monatelang gegen ein totes Listing - und Aenderungen am Ranking sind muehsam. Bau dein Listing einmal richtig auf, bevor du Traffic darauf lenkst. Mit GruenderX hast du die komplette Reihenfolge von Keyword bis Compliance an der Hand.",
    "outcomes": [
      "Veroeffentlichtes, conversion-optimiertes Amazon-Listing",
      "Keyword-recherchierter Titel und Bullet Points",
      "Starke Produktbilder und A+ Content",
      "Korrekte GTIN und saubere Compliance-Angaben",
      "Listing bereit zum Ranken und Verkaufen"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung und ersetzt keine Rechtsberatung; Amazon-Richtlinien und GTIN-Anforderungen koennen sich aendern."
  },
  "reseller-freischaltung": {
    "seoTitle": "Amazon Ungating: Marke & Kategorie freischalten lassen",
    "seoDescription": "Gated Marken und Kategorien zum Reselling freischalten: korrekte Distributor-Rechnung, Echtheitsnachweise, akzeptierter Antrag. In 1-4 Wochen.",
    "lead": "Dieser Guide erklaert dir, wie du gated Marken und Kategorien auf Amazon, Kaufland, eBay & Co. zum Weiterverkauf freischalten laesst - mit Rechnungen und Nachweisen, die den Antrag durchgehen lassen.",
    "urgency": "Ohne Ungating sitzt du auf Ware, die du nicht listen darfst - Kapital ist gebunden, der Cashflow steht. Die meisten Antraege scheitern an formalen Details wie einer nicht passenden Distributor-Rechnung oder fehlenden Echtheitsnachweisen, und jede Ablehnung verzoegert deinen Verkaufsstart. Geh den Antrag von Anfang an formal sauber an, statt mehrfach abgelehnt zu werden. Mit GruenderX weisst du genau, welche Rechnungen und Nachweise akzeptiert werden.",
    "outcomes": [
      "Freigeschaltete Marke oder Kategorie auf Amazon, Kaufland und eBay",
      "Korrekte Distributor-Rechnung fuer den Antrag vorbereitet",
      "Passende Echtheitsnachweise zusammengestellt",
      "Antrag formal sauber und akzeptierbar eingereicht",
      "Schneller Verkaufsstart ohne gebundenes Kapital"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechtsberatung; Freischaltungskriterien der Marktplaetze koennen sich jederzeit aendern."
  },
  "dac7": {
    "seoTitle": "DAC7: Plattform-Meldepflicht meistern fuer Verkaeufer",
    "seoDescription": "DAC7 verstehen: Was Marktplaetze ans Finanzamt melden und welche Daten du liefern musst. Keine Konto- oder Auszahlungssperre. In 1-2 Tagen.",
    "lead": "Dieser Guide erklaert dir die DAC7-Meldepflicht: was Plattformen wie Amazon, eBay und Etsy ans Finanzamt melden und welche Steuerdaten du hinterlegen musst.",
    "urgency": "Fehlen deine DAC7-Daten oder passen sie nicht, friert die Plattform schnell deine Auszahlungen ein oder sperrt das Konto - mitten im laufenden Geschaeft. Gleichzeitig gleicht das Finanzamt die gemeldeten Umsaetze direkt mit deiner Steuererklaerung ab, und Abweichungen fallen sofort auf. Bring deine Daten in Ordnung, bevor eine Sperre dich blockiert. Mit GruenderX hinterlegst du alles korrekt und konsistent ueber alle Plattformen.",
    "outcomes": [
      "Korrekt hinterlegte Steuerdaten bei allen Plattformen",
      "Keine DAC7-bedingten Konto- oder Auszahlungssperren",
      "Gemeldete Umsaetze konsistent mit der Steuererklaerung",
      "Klarheit, was die Marktplaetze tatsaechlich melden",
      "Ruhe vor Nachfragen des Finanzamts"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung und ersetzt keine Steuerberatung; DAC7-Meldepflichten und Schwellen koennen sich aendern."
  },
  "amazon-verkaeuferkonto-setup": {
    "seoTitle": "Amazon-Verkaeuferkonto einrichten: komplette Anleitung",
    "seoDescription": "Amazon-Verkaeuferkonto komplett einrichten: Steuer, USt, Rechnungen, Versand, Rechtstexte, Sicherheit. Startklar fuer dein erstes Produkt in 1-2 Wochen.",
    "lead": "Dieser Guide fuehrt dich Schritt fuer Schritt durch die komplette Einrichtung deines Amazon-Verkaeuferkontos - von Steuer- und USt-Einstellungen ueber Versand und Rechtstexte bis zur Absicherung.",
    "urgency": "Ein lueckenhaft eingerichtetes Konto raecht sich frueh: fehlende USt-Einstellungen, falsche Rechnungen oder unvollstaendige Rechtstexte fuehren zu Abmahnungen, Steuerproblemen und im schlimmsten Fall zur Konto-Sperrung samt eingefrorenen Guthaben. Die Verifizierung dauert ohnehin oft Wochen - jeder Fehler verlaengert das. Richte das Konto einmal vollstaendig und sauber ein, bevor das erste Produkt live geht. Mit GruenderX arbeitest du jeden der Einrichtungsschritte strukturiert ab.",
    "outcomes": [
      "Vollstaendig eingerichtetes Amazon-Verkaeuferkonto",
      "Korrekte Steuer-, USt- und Rechnungs-Einstellungen",
      "Versand-, Retouren-Regeln und Rechtstexte hinterlegt",
      "Bankdaten verifiziert und Konto abgesichert",
      "Bereit fuer das erste Produkt und sauberes Wachstum"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Steuer- oder Rechtsberatung; Amazon-Vorgaben und steuerliche Pflichten koennen sich aendern."
  },
  "kaufland-produkt-anlegen": {
    "seoTitle": "Produkt auf Kaufland Marketplace anlegen: Anleitung",
    "seoDescription": "Kaufland-Angebot anlegen: EAN-Katalog andocken, Preis, Bestand, Versand und LUCID/WEEE/USt-Compliance. Veroeffentlicht in 1-2 Wochen.",
    "lead": "Dieser Guide zeigt dir, wie du ueber das Kaufland Seller-Portal ein Produkt anlegst - am EAN-Katalog andockst oder neu erfasst, inklusive Preis, Bestand und korrekter Compliance.",
    "urgency": "Kaufland prueft LUCID-, WEEE- und USt-Angaben streng - fehlt etwas, wird dein Angebot gar nicht erst freigeschaltet oder spaeter offline genommen. Dockst du falsch an den EAN-Katalog an, landest du auf der falschen Produktseite und verlierst Sichtbarkeit und Bewertungen. Mach es von Anfang an konform, statt nachzuarbeiten. Mit GruenderX gehst du Katalog-Anbindung und Compliance Schritt fuer Schritt durch.",
    "outcomes": [
      "Veroeffentlichtes Kaufland-Angebot im Seller-Portal",
      "Korrekt am zentralen EAN-Katalog angedockt oder neu angelegt",
      "Preis, Bestand und Versand sauber hinterlegt",
      "LUCID-, WEEE- und USt-Compliance erfuellt",
      "Zweiter Marktplatz-Kanal neben Amazon aktiv"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung und ersetzt keine Rechts- oder Steuerberatung; Kaufland-Vorgaben und Compliance-Pflichten koennen sich aendern."
  },
  "otto-produkt-anlegen": {
    "seoTitle": "Produkt auf OTTO Market anlegen: Bewerbung & Connect",
    "seoDescription": "Auf OTTO Market verkaufen: Partner-Bewerbung, Partner-Connect-Anbindung und datenstarke Listings. Schritt fuer Schritt durchs Onboarding.",
    "lead": "Dieser Guide begleitet dich durch den Verkaufsstart auf OTTO Market - von der Partner-Bewerbung ueber die technische Partner-Connect-Anbindung bis zu konformen, datenvollstaendigen Listings.",
    "urgency": "OTTO kuratiert hart: Bewerbungen mit duennem Sortiment oder unvollstaendigen Produktdaten werden abgelehnt, und das Onboarding zieht sich oft mehrere Wochen. Wer die Partner-Connect-Anbindung und die Datenqualitaet unterschaetzt, verliert Wochen, bevor der erste Verkauf laeuft. Bereite Bewerbung und Datenfeed sauber vor, statt in der Warteschleife zu haengen. Mit GruenderX gehst du jeden Schritt des OTTO-Onboardings strukturiert an.",
    "outcomes": [
      "Als OTTO-Partner freigeschaltet",
      "Technisch ueber Partner Connect angebunden",
      "Konforme, datenvollstaendige Produkte gelistet",
      "Bewerbung mit ueberzeugendem Sortiment eingereicht",
      "Zugang zu einem kaufkraeftigen, kuratierten Marktplatz"
    ],
    "disclaimer": "Dieser Guide bietet Orientierung und ersetzt keine Rechtsberatung; OTTO-Aufnahmekriterien und technische Anforderungen koennen sich aendern."
  },
  "erste-webseite-seo": {
    "seoTitle": "Erste Webseite erstellen & bei Google sichtbar werden",
    "seoDescription": "Webseite live bringen und organisch ranken: Search Console verifizieren, Sitemap einreichen, On-Page-SEO setzen. Startklar in 1-2 Wochen.",
    "lead": "Dieser Guide zeigt dir, wie du deine erste Webseite technisch sauber live bringst, in der Google Search Console verifizierst und mit On-Page-SEO startklar fuers organische Ranking machst.",
    "urgency": "Jeder Tag ohne sichtbare Webseite ist ein Tag, an dem deine Wunschkunden bei der Konkurrenz landen - und SEO wirkt nicht sofort, sondern braucht Vorlauf, bis Google dich rankt. Wer ohne Search Console, Sitemap und saubere On-Page-Basis startet, verschenkt Monate an Sichtbarkeit, die spaeter schwer aufzuholen sind. Je frueher die Basis steht, desto frueher kommt organischer Traffic. Mit GruenderX gehst du von der Seite bis zur Indexierung jeden Schritt durch.",
    "outcomes": [
      "Live-Webseite mit sauberer technischer Basis",
      "In der Google Search Console verifiziert",
      "Sitemap eingereicht und Indexierung angestossen",
      "On-Page-SEO fuer deine Keywords gesetzt",
      "Startklar, um organisch gefunden zu werden"
    ],
    "disclaimer": "Dieser Guide dient der Orientierung; SEO-Ergebnisse sind nicht garantiert und Suchmaschinen-Anforderungen koennen sich jederzeit aendern."
  }
};
