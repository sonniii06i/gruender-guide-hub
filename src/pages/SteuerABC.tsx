/**
 * SteuerABC — Glossar mit 60+ Begriffen aus dem dt. Steuerrecht.
 *
 * Tool 4 der Anfänger-Wave (Starter-Kategorie).
 * Layout-Pattern: BeginnerHero, Such-Filter, Kategorie-Tabs, Begriff-Karten mit
 * Kurz-Definition + Detail-Block + §-Verweis + Cross-Tool-Links + Stolperfalle.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Lightbulb, Search, BookOpen, ExternalLink, AlertTriangle } from "lucide-react";

type Kategorie =
  | "grundbegriffe"
  | "rechtsformen"
  | "buchhaltung"
  | "ust"
  | "sv-kv"
  | "anlagen"
  | "freibetraege"
  | "fa-verfahren"
  | "international"
  | "investoren";

interface GlossarBegriff {
  begriff: string;
  /** Suchaliase / Synonyme. */
  aliases?: string[];
  kategorie: Kategorie;
  kurzDefinition: string;
  ausfuehrlich: string;
  paragraph?: string;
  beispiel?: string;
  toolLinks?: { route: string; label: string }[];
  warnung?: string;
}

const KATEGORIEN: Record<Kategorie, { label: string; emoji: string }> = {
  grundbegriffe: { label: "Steuer-Grundbegriffe", emoji: "📚" },
  rechtsformen: { label: "Rechtsformen", emoji: "🏛️" },
  buchhaltung: { label: "Buchhaltung", emoji: "📊" },
  ust: { label: "Umsatzsteuer (USt)", emoji: "💱" },
  "sv-kv": { label: "Sozial- & Krankenversicherung", emoji: "❤️" },
  anlagen: { label: "ESt-Anlagen (S/G/EÜR …)", emoji: "📑" },
  freibetraege: { label: "Freibeträge & Pauschalen", emoji: "💰" },
  "fa-verfahren": { label: "Finanzamt-Verfahren", emoji: "🏢" },
  international: { label: "Internationales", emoji: "🌍" },
  investoren: { label: "Investoren & Crypto", emoji: "📈" },
};

const GLOSSAR: GlossarBegriff[] = [
  // ========== GRUNDBEGRIFFE ==========
  { begriff: "Einkommensteuer (ESt)", aliases: ["ESt", "Einkommenssteuer"], kategorie: "grundbegriffe",
    kurzDefinition: "Steuer auf das Einkommen natürlicher Personen — progressiver Tarif 14–45 %.",
    ausfuehrlich: "Die ESt erfasst alle 7 Einkunftsarten (§2 EStG): Land-/Forst, Gewerbe, selbstständige Arbeit, nichtselbstständige Arbeit, Kapitalvermögen, Vermietung, sonstige Einkünfte. Tarif 2026: Grundfreibetrag 12.348 € · 14 % Eingangssatz · 42 % Spitzensatz ab 68.481 € · 45 % Reichensteuer ab 277.826 €.",
    paragraph: "§32a EStG", beispiel: "Selbstständiger mit 50.000 € Gewinn zahlt ~10.500 € ESt.",
    toolLinks: [{ route: "/cockpit/quartals-steuer", label: "Quartals-Steuerschätzung" }],
  },
  { begriff: "Umsatzsteuer (USt)", aliases: ["USt", "Mehrwertsteuer", "MwSt"], kategorie: "grundbegriffe",
    kurzDefinition: "Steuer auf Umsätze (Verkäufe + Dienstleistungen). Standardsatz 19 %, ermäßigt 7 %.",
    ausfuehrlich: "Die USt wird vom Endverbraucher getragen — Unternehmer schlagen sie auf den Netto-Preis auf, ziehen die VSt für eigene Einkäufe ab und führen die Differenz ans FA ab. Pflicht-Anmeldung (USt-VA) monatlich/quartalsweise/jährlich abhängig vom Vorjahres-USt-Betrag.",
    paragraph: "UStG", toolLinks: [{ route: "/cockpit/ust-rechner", label: "USt-Rechner" }],
  },
  { begriff: "Körperschaftsteuer (KSt)", aliases: ["KSt", "Koerperschaftsteuer"], kategorie: "grundbegriffe",
    kurzDefinition: "Steuer auf den Gewinn von Kapitalgesellschaften (GmbH, UG, AG). Pauschal 15 %.",
    ausfuehrlich: "KSt ist die ESt-Variante für juristische Personen. Pauschal 15 % auf den Gewinn vor Ausschüttung. Auf KSt fällt zusätzlich 5,5 % SolZ an. Bei Ausschüttung an natürliche Anteilseigner: zusätzlich 26,375 % Abgeltungsteuer (Doppelbesteuerung der Dividende).",
    paragraph: "KStG", toolLinks: [{ route: "/cockpit/salary-dividende", label: "Salary vs. Dividende-Optimizer" }],
  },
  { begriff: "Gewerbesteuer (GewSt)", aliases: ["GewSt"], kategorie: "grundbegriffe",
    kurzDefinition: "Kommunale Steuer auf Gewerbeertrag. Hebesatz 200–490 % je Gemeinde. Freibetrag 24.500 € für Einzel & PersGes.",
    ausfuehrlich: "Messzahl 3,5 % × Hebesatz der Gemeinde = effektiver GewSt-Satz. Berlin 410 % → ~14,4 %. Bei Einzelunternehmen + Personengesellschaften 24.500 € Freibetrag. GewSt wird auf ESt via §35 EStG mit Faktor 4,0 angerechnet — bei Hebesatz ≤ 400 % effektiv neutral.",
    paragraph: "§§ 7-11 GewStG, §35 EStG",
  },
  { begriff: "Solidaritätszuschlag (SolZ)", aliases: ["SolZ", "Soli"], kategorie: "grundbegriffe",
    kurzDefinition: "5,5 % Zuschlag auf ESt + KSt. Bei ESt: Freigrenze bis 19.950 €/J (Single).",
    ausfuehrlich: "Seit 2021 für 90 % der Steuerzahler abgeschafft (Freigrenze 19.950 € ESt für Single, 39.900 € verheiratet). Bei KSt: KEINE Freigrenze — fällt immer voll an.",
    paragraph: "SolZG",
  },
  { begriff: "Kirchensteuer (KiSt)", aliases: ["KiSt"], kategorie: "grundbegriffe",
    kurzDefinition: "Zuschlag auf ESt für Mitglieder anerkannter Religionsgemeinschaften. 8 % (Bayern, BW) oder 9 % (Rest).",
    ausfuehrlich: "Nur fällig wenn du steuerlich Mitglied einer Kirche bist (Eintrag im Personalausweis war früher, heute beim FA). Kirchenaustritt = sofortige Befreiung ab nächstem Monat.",
    paragraph: "Landes-KiStG",
  },
  { begriff: "Zu versteuerndes Einkommen (zvE)", aliases: ["zvE", "ZVE"], kategorie: "grundbegriffe",
    kurzDefinition: "Das Einkommen, auf das letztlich die ESt-Progressionstabelle angewendet wird.",
    ausfuehrlich: "Summe der Einkünfte (aus 7 Einkunftsarten) minus Sonderausgaben (Vorsorgeaufwendungen, Spenden, KiSt) minus außergewöhnliche Belastungen minus Grundfreibetrag = zvE. Auf das zvE wird der §32a-Tarif angewendet.",
    paragraph: "§2 Abs. 5 EStG",
  },
  { begriff: "Grenzsteuersatz", aliases: ["Grenzsteuersatz", "Spitzensatz"], kategorie: "grundbegriffe",
    kurzDefinition: "Der Steuersatz, den DER NÄCHSTE EURO Einkommen kostet (nicht der Durchschnitt).",
    ausfuehrlich: "Wichtig für Spar-Strategien (z.B. IAB, Sonderausgaben): jeder zusätzlich abgesetzte Euro wird mit dem Grenzsteuersatz gespart, nicht mit dem Durchschnitt. Bei 80k Gewinn: Durchschnittssatz ~28 %, aber Grenzsteuersatz schon 42 % (Spitzensatz ab 68.481 €).",
    beispiel: "Bei 1.000 € IAB-Abzug und Grenzsatz 42 % sparst du 420 € ESt — nicht 280 € (Durchschnitt).",
  },
  { begriff: "Vorsteuer (VSt)", aliases: ["VSt", "Vorsteuerabzug"], kategorie: "grundbegriffe",
    kurzDefinition: "USt, die du beim Einkauf an andere Unternehmer zahlst — kannst du vom FA zurückfordern.",
    ausfuehrlich: "Beispiel: Du kaufst einen Laptop für 1.190 € (1.000 € + 190 € VSt). Die 190 € VSt holst du dir vom FA zurück. Voraussetzung: ordnungsgemäße Rechnung mit USt-Ausweis + UStID-Nummer des Lieferanten. Kleinunternehmer §19 können KEINE VSt ziehen.",
    paragraph: "§15 UStG",
  },

  // ========== RECHTSFORMEN ==========
  { begriff: "Einzelunternehmen (EU/e.K.)", aliases: ["Einzelunternehmer", "e.K.", "EU"], kategorie: "rechtsformen",
    kurzDefinition: "Gründerfreundlichste Rechtsform — eine Person, volle Haftung mit Privatvermögen.",
    ausfuehrlich: "Anmeldung beim Gewerbeamt (Gewerbe) oder direkt FA (Freiberuf). Keine Mindestkapital-Pflicht, einfache EÜR statt Bilanz. Gewinn versteuert mit persönlicher ESt + ggf. GewSt + SolZ. Volle persönliche Haftung — auch mit Privatvermögen.",
    toolLinks: [{ route: "/cockpit/gewerbe-check", label: "Brauche ich Gewerbe?" }],
  },
  { begriff: "Freiberufler (§18 EStG)", aliases: ["Freiberuf", "Freelancer"], kategorie: "rechtsformen",
    kurzDefinition: "Selbstständige Katalog-Berufe (Arzt, Anwalt, Ingenieur, Künstler etc.) — kein Gewerbe, keine GewSt.",
    ausfuehrlich: "Ausschließlich §18 Abs. 1 Nr. 1 EStG (Katalog) oder 'ähnliche Berufe'. Keine Gewerbeanmeldung, keine IHK-Pflicht, keine GewSt — nur FA-Fragebogen. EÜR ohne Größen-Schwelle. Voraussetzung: spezielle Qualifikation + persönlich erbrachte Leistung.",
    paragraph: "§18 EStG",
    toolLinks: [{ route: "/cockpit/freiberuf-check", label: "Freiberuf vs. Gewerbe-Check" }],
  },
  { begriff: "UG (haftungsbeschränkt)", aliases: ["UG", "Unternehmergesellschaft", "Mini-GmbH"], kategorie: "rechtsformen",
    kurzDefinition: "Mini-Variante der GmbH — ab 1 € Stammkapital, Pflicht-Rücklage 25 % bis 25.000 € erreicht.",
    ausfuehrlich: "Notarvertrag erforderlich (~500-800 € Gründungskosten), aber kein Mindestkapital. Erst nach Erreichen von 25.000 € Stammkapital Umfirmierung zu GmbH möglich. Beschränkte Haftung auf Gesellschaftsvermögen. KSt + GewSt + SolZ. Pflicht zur doppelten Buchführung + Bilanz.",
    paragraph: "§5a GmbHG",
  },
  { begriff: "GmbH (Gesellschaft mit beschränkter Haftung)", aliases: ["GmbH"], kategorie: "rechtsformen",
    kurzDefinition: "Klassische Kapitalgesellschaft — 25.000 € Mindeststammkapital (12.500 € einzuzahlen), beschränkte Haftung.",
    ausfuehrlich: "Beschränkte Haftung auf Gesellschaftsvermögen — Privatvermögen geschützt (außer bei Steuer-Hinterziehung / Geschäftsführer-Pflichtverletzung). KSt 15 % + SolZ + GewSt = ~30 % auf Gewinn. Bei Ausschüttung an Privatperson: zusätzlich 26,375 % AbgSt. Doppelte Buchführung + Jahresabschluss Pflicht.",
    paragraph: "GmbHG", toolLinks: [{ route: "/wizard/rechtsform", label: "Rechtsform-Wizard" }],
  },
  { begriff: "GbR (Gesellschaft bürgerlichen Rechts)", aliases: ["GbR"], kategorie: "rechtsformen",
    kurzDefinition: "Mind. 2 Personen, einfache PersGes-Struktur, volle persönliche Haftung aller Gesellschafter.",
    ausfuehrlich: "Kein Mindestkapital, kein Notarvertrag (aber empfehlenswert!). Anmeldung beim Gewerbeamt (oder FA bei Freiberuf-GbR). Volle gesamtschuldnerische Haftung — jeder haftet für alle Verbindlichkeiten der Gesellschaft mit Privatvermögen. Gewinnverteilung nach Vereinbarung.",
    warnung: "Volle persönliche Haftung aller Gesellschafter ist extrem riskant. Bei größerem Risiko: UG oder GmbH gründen.",
  },
  { begriff: "Holding-Struktur", aliases: ["Holding"], kategorie: "rechtsformen",
    kurzDefinition: "Konstrukt mit Mutter-GmbH ('Holding') als Anteilseigner der operativen Tochter-GmbH.",
    ausfuehrlich: "Hauptvorteil: §8b KStG — Dividenden zwischen Kapitalgesellschaften zu 95 % steuerfrei (5 % Pauschale = effektiv 1,5 % belastet). Veräußerungsgewinne aus GmbH-Anteilen auch 95 % steuerfrei. Sinnvoll bei: Reinvest-Strategie, Multi-Brand, IP-Lizenzierung, Exit-Vorbereitung. Sperrfrist 7 Jahre §22 UmwStG.",
    paragraph: "§8b KStG, §22 UmwStG", toolLinks: [{ route: "/cockpit/holding-designer", label: "Holding-Designer" }],
  },

  // ========== BUCHHALTUNG ==========
  { begriff: "EÜR (Einnahmen-Überschuss-Rechnung)", aliases: ["EÜR", "Einnahmenüberschussrechnung"], kategorie: "buchhaltung",
    kurzDefinition: "Vereinfachte Gewinnermittlung: Einnahmen minus Ausgaben = Gewinn.",
    ausfuehrlich: "Erlaubt für Freiberufler (unabhängig vom Umsatz) und Gewerbetreibende bis 800.000 € Jahresumsatz oder 80.000 € Jahresgewinn (Stand 2026, vor Reform 600/60 k). Über diesen Grenzen: Pflicht zur doppelten Buchführung + Bilanz. EÜR muss elektronisch über ELSTER eingereicht werden.",
    paragraph: "§4 Abs. 3 EStG",
  },
  { begriff: "Doppelte Buchführung", aliases: ["Bilanz", "Doppik"], kategorie: "buchhaltung",
    kurzDefinition: "Vollständige Buchhaltung mit Bilanz, GuV, Soll/Haben-Buchungen.",
    ausfuehrlich: "Pflicht für Kapitalgesellschaften (GmbH, UG, AG) und große Einzel-/PersGes (>800k Umsatz, >80k Gewinn). Jeder Geschäftsvorfall wird auf 2 Konten gebucht (Soll + Haben). Jahresabschluss = Bilanz + GuV + Anhang + ggf. Lagebericht. Pflicht-Veröffentlichung im Bundesanzeiger.",
    paragraph: "§§ 238-263 HGB",
  },
  { begriff: "GoBD", aliases: ["GoBD", "Grundsätze ordnungsmäßiger Buchführung"], kategorie: "buchhaltung",
    kurzDefinition: "BMF-Regeln zur digitalen Buchführung: Unveränderbarkeit, Nachvollziehbarkeit, Vollständigkeit.",
    ausfuehrlich: "GoBD = Grundsätze ordnungsmäßiger Buchführung in digitaler Form. Pflicht: 10 Jahre Aufbewahrung (Rechnungen, Bankauszüge, Verträge). Belege müssen unveränderbar (revisionssicher) gespeichert werden. Verfahrensdokumentation Pflicht. Bei Verstoß: FA kann Buchführung als 'nicht ordnungsgemäß' verwerfen und schätzen.",
    paragraph: "BMF-Schreiben 2014/2019",
  },
  { begriff: "SKR03 / SKR04", aliases: ["Kontenrahmen"], kategorie: "buchhaltung",
    kurzDefinition: "Standard-Kontenrahmen für die Buchhaltung. SKR03 (Industriegliederung) oder SKR04 (Abschlussgliederung).",
    ausfuehrlich: "DATEV-Standardkontenrahmen — 4-stellige Konten gruppiert nach Funktion. Beispiele SKR03: 1200 Bank, 8400 Erlöse 19%, 3100 Fremdleistungen. SKR04 ist näher an HGB-Gliederung (bevorzugt von WPs für Konzernabschlüsse). Wechsel zwischen den Rahmen mid-Jahr nicht erlaubt.",
    toolLinks: [{ route: "/cockpit/amazon-buchungen", label: "Amazon-Buchungstexte (130+ Codes mit SKR03)" }],
  },
  { begriff: "BWA (Betriebswirtschaftliche Auswertung)", aliases: ["BWA"], kategorie: "buchhaltung",
    kurzDefinition: "Monatliche/quartalsweise Auswertung der Buchhaltung — interne Steuerung & Bank-Vorlage.",
    ausfuehrlich: "Aus der laufenden Buchhaltung erstellt: Umsatz, Material, Personal, sonst. Aufwand, EBITDA, EBIT, vorläufiger Gewinn. Pflicht: keine — aber Banken erwarten BWA bei Kreditvergaben. Auch Selbstkontrolle für Liquiditätsplanung.",
    toolLinks: [{ route: "/cockpit/bwa-generator", label: "BWA-Generator (Bank-tauglich)" }],
  },
  { begriff: "Geringwertige Wirtschaftsgüter (GWG)", aliases: ["GWG"], kategorie: "buchhaltung",
    kurzDefinition: "Wirtschaftsgüter unter 800 € netto — können sofort als Aufwand abgeschrieben werden (statt AfA).",
    ausfuehrlich: "GWG-Grenze 2026: 800 € netto. Wahlrecht: (a) Sofortabschreibung im Jahr der Anschaffung oder (b) Sammelposten 250-1.000 € (Pool-Abschreibung über 5 Jahre). Computer, Tablets, Bürostühle, kleinere Geräte typische GWG.",
    paragraph: "§6 Abs. 2 EStG",
    toolLinks: [{ route: "/cockpit/abschreibung", label: "Abschreibungs-Rechner" }],
  },
  { begriff: "AfA (Abschreibung für Abnutzung)", aliases: ["AfA", "Abschreibung", "Linear AfA"], kategorie: "buchhaltung",
    kurzDefinition: "Verteilung der Anschaffungskosten über die Nutzungsdauer (z.B. Laptop 3 Jahre, Maschine 10 Jahre).",
    ausfuehrlich: "Standard linear: Anschaffungskosten / Nutzungsdauer (AfA-Tabellen BMF). Ab 800 € netto (über GWG). Im Anschaffungs-/Veräußerungsjahr nur Halbjahr-AfA. Digital Wirtschaftsgüter (Computer, Software) seit 2021: 1-Jahres-AfA möglich.",
    paragraph: "§7 EStG",
  },

  // ========== USt ==========
  { begriff: "Kleinunternehmer §19 UStG", aliases: ["Kleinunternehmerregelung", "KU", "§19"], kategorie: "ust",
    kurzDefinition: "Befreiung von USt-Ausweisung bis 25.000 € Vorjahres-Umsatz / 100.000 € aktuelles Jahr (Reform 2025).",
    ausfuehrlich: "Vorteil: weniger Bürokratie, kein USt-Aufschlag, USt-VA-frei. Nachteil: KEIN Vorsteuer-Abzug. Pflicht-Hinweis auf Rechnung: 'Gemäß §19 UStG wird keine Umsatzsteuer berechnet'. Verzicht möglich für 5 Jahre Bindung (sinnvoll bei hohen Investitionen).",
    paragraph: "§19 UStG",
    toolLinks: [{ route: "/cockpit/ust-rechner", label: "USt-Rechner" }],
  },
  { begriff: "USt-Voranmeldung (USt-VA)", aliases: ["USt-VA", "Voranmeldung"], kategorie: "ust",
    kurzDefinition: "Monatliche/quartalsweise Meldung an FA: vereinnahmte USt minus VSt = USt-Zahllast.",
    ausfuehrlich: "Frist: 10. des Folgemonats/-quartals. Mit Dauerfristverlängerung +1 Monat (1/11 Sondervorauszahlung). Periodizität: ab 7.500 € USt-Vorjahr monatlich, sonst Quartal, unter 1.000 € jährlich. Bei Existenzgründung im 1.+2. Jahr immer monatlich (Reform 2024 aufgehoben für ab 2025).",
    paragraph: "§18 UStG",
  },
  { begriff: "Reverse Charge §13b UStG", aliases: ["RC", "Reverse Charge", "§13b"], kategorie: "ust",
    kurzDefinition: "Steuerschuldnerschaft-Umkehr bei B2B-Leistungen aus EU/Drittland — du als Empfänger schuldest die USt.",
    ausfuehrlich: "Beispiel: Du als DE-Unternehmer kaufst bei Stripe (IE) ein. Stripe stellt netto-Rechnung ohne USt. DU als Empfänger berechnest 19 % USt darauf, deklarierst sie in USt-VA UND ziehst sie sofort als VSt wieder ab → saldoneutral. Aber doppelter Buchungsaufwand. DATEV-BU-Schlüssel 19.",
    paragraph: "§13b UStG",
    toolLinks: [{ route: "/cockpit/datev-mapper", label: "DATEV-Mapper (RC §13b auto)" }],
  },
  { begriff: "Innergemeinschaftliche Lieferung (IGL)", aliases: ["IGL", "innergemeinschaftlich"], kategorie: "ust",
    kurzDefinition: "Steuerfreie B2B-Lieferung an EU-Unternehmer mit gültiger USt-ID des Empfängers.",
    ausfuehrlich: "Voraussetzungen: Lieferung an Unternehmer in anderem EU-Staat + gültige USt-IdNr. des Empfängers (Validierung via VIES!) + Buch- und Belegnachweise. Du stellst netto-Rechnung mit USt-IdNr. beider Parteien + Hinweis 'Steuerfreie innergemeinschaftliche Lieferung'. Plus: Zusammenfassende Meldung (ZM) bis 25. des Folgemonats.",
    paragraph: "§6a UStG",
  },
  { begriff: "OSS (One-Stop-Shop)", aliases: ["OSS", "One-Stop-Shop"], kategorie: "ust",
    kurzDefinition: "Zentralisierte EU-USt-Meldung beim BZSt für B2C-Verkäufe ins EU-Ausland ab 10.000 €/Jahr.",
    ausfuehrlich: "Seit Juli 2021. Bei B2C-Fernverkäufen ins EU-Ausland über 10.000 €/Jahr (Lieferschwelle): statt 27 EU-USt-Registrierungen ein einziges Konto beim Bundeszentralamt für Steuern (BZSt). Quartals-Meldung bis letzter Tag des Folgemonats (Q1=30.04., Q2=31.07.). USt-Sätze aller EU-Länder.",
    paragraph: "§§ 18i ff. UStG, EU-RL 2017/2455",
  },
  { begriff: "Marketplace-Facilitator-Tax", aliases: ["Plattform-Steuer"], kategorie: "ust",
    kurzDefinition: "Plattform (Amazon, eBay etc.) zieht USt vom Endkunden ein statt vom Verkäufer.",
    ausfuehrlich: "Greift seit Juli 2021 EU-weit für Verkäufer mit Sitz AUSSERHALB der EU (DE-sitzige Verkäufer melden via OSS). Sowie Marketplace-Facilitator in den USA (45 Staaten). Bei UK Brexit: für B2C ≤ £135 zieht Marketplace die UK-VAT direkt ein.",
  },
  { begriff: "Dauerfristverlängerung", aliases: ["DFV"], kategorie: "ust",
    kurzDefinition: "Verlängerung der USt-VA-Frist um 1 Monat — Antrag einmalig beim FA.",
    ausfuehrlich: "Kostet 'Sondervorauszahlung' = 1/11 der gesamten USt des Vorjahres (wird im November des Folgejahres verrechnet). Vorteil: mehr Zeit für Buchhaltung. Sinnvoll bei monatlicher Meldung — bei quartalsweiser nicht so kritisch.",
    paragraph: "§§ 46-48 UStDV",
  },

  // ========== SOZIAL-/KRANKEN-VERSICHERUNG ==========
  { begriff: "GKV (Gesetzliche Krankenversicherung)", aliases: ["GKV"], kategorie: "sv-kv",
    kurzDefinition: "Pflicht-Krankenversicherung — allgemeiner Satz 14,6 % + kassenindividueller Zusatzbeitrag (2,18-4,39 % 2026).",
    ausfuehrlich: "Pflicht für Arbeitnehmer bis JAEG 77.400 €/J 2026. Selbstständige können freiwillig versichern (Mindestbeitrag 260-280 €/Mon). Top-günstige Kassen: BKK firmus 2,18 %, hkk 2,39 %, TK 2,69 %. Wechsel jederzeit zum übernächsten Monat.",
    toolLinks: [{ route: "/cockpit/kv-optimizer", label: "KV-Optimizer (Spar-Hebel)" }],
  },
  { begriff: "PKV (Private Krankenversicherung)", aliases: ["PKV"], kategorie: "sv-kv",
    kurzDefinition: "Private Voll-KV — möglich für Selbstständige, Beamte, Angestellte über JAEG.",
    ausfuehrlich: "Beitrag risikobasiert (Alter, Vorerkrankungen). Vorteile: bessere Leistungen, Wahlfreiheit. Nachteile: 13 % Beitragserhöhung 2026 bei 60 % der PKV-Versicherten, Rückwechsel ab 55 fast unmöglich, Kinder müssen separat versichert werden. §204 VVG Tarifwechsel intern: 15-30 % Sparen möglich ohne Verlust der Altersrückstellungen.",
  },
  { begriff: "KSK (Künstlersozialkasse)", aliases: ["KSK", "Künstlersozial"], kategorie: "sv-kv",
    kurzDefinition: "Spezielle Sozial-Versicherung für selbständige Künstler/Publizisten — Bund übernimmt 50 % der KV/RV-Beiträge.",
    ausfuehrlich: "Pflichtmitgliedschaft für: Maler, Musiker, Schauspieler, Autoren, Journalisten, Fotografen, Designer (wenn freiberuflich + überwiegend selbstständig). Mindesteinkommen 3.900 €/Jahr (sonst Befreiung). Auftraggeber zahlen KSK-Abgabe (5,0 % 2026) auf gezahlte Honorare.",
    paragraph: "KSVG",
  },
  { begriff: "BBG (Beitragsbemessungsgrenze)", aliases: ["BBG"], kategorie: "sv-kv",
    kurzDefinition: "Höchstgrenze für SV-Beiträge. BBG-RV 2026: 101.400 €/J (bundeseinheitlich). BBG-KV: 66.150 €/J.",
    ausfuehrlich: "Über der BBG werden keine SV-Beiträge mehr erhoben — verdienst du z.B. 200.000 € als Angestellter, zahlst du KV/RV nur bis BBG. Seit 2025 ist die BBG-RV bundeseinheitlich (vorher West/Ost unterschiedlich).",
  },
  { begriff: "JAEG (Jahresarbeitsentgeltgrenze)", aliases: ["JAEG", "Pflichtversicherungsgrenze"], kategorie: "sv-kv",
    kurzDefinition: "Schwelle für Wechsel von GKV-Pflicht zu PKV — 2026: 77.400 €/Jahr (6.450 €/Monat).",
    ausfuehrlich: "Arbeitnehmer mit Brutto über JAEG für 12 Monate ununterbrochen dürfen in PKV wechseln. Bestands-JAEG (PKV-Versicherte vor 2002): 69.750 €. Selbstständige + GmbH-GF brauchen JAEG NICHT — können jederzeit PKV.",
    paragraph: "§6 Abs. 1 Nr. 1 SGB V",
  },
  { begriff: "Familienversicherung", aliases: ["Familienvers"], kategorie: "sv-kv",
    kurzDefinition: "Kostenlose Mitversicherung Ehepartner/Kinder in der GKV des Hauptverdieners.",
    ausfuehrlich: "Ehepartner: kostenlos mitversichert wenn Einkommen <535 €/Monat (Stand 2026 — wird jährlich angepasst). Kinder: bis 23 J. (mit Schule/Studium bis 25). Bei Selbstständigkeit/höherem Einkommen: eigene Versicherung Pflicht.",
    paragraph: "§10 SGB V",
  },

  // ========== ESt-ANLAGEN ==========
  { begriff: "Anlage S", aliases: ["Anlage S"], kategorie: "anlagen",
    kurzDefinition: "ESt-Anlage für Einkünfte aus selbstständiger Arbeit (= Freiberufler).",
    ausfuehrlich: "Hier trägst du nur den GEWINN ein (Detail-Rechnung in der separaten Anlage EÜR). Werbungskosten-Pauschbetrag 102 € — wer mehr abziehen will, muss in EÜR genau aufstellen.",
    paragraph: "§18 EStG",
  },
  { begriff: "Anlage G", aliases: ["Anlage G"], kategorie: "anlagen",
    kurzDefinition: "ESt-Anlage für Einkünfte aus Gewerbebetrieb.",
    ausfuehrlich: "Wie Anlage S, aber für Gewerbetreibende. Detail-Rechnung in der separaten Anlage EÜR. Plus: hier wird auch der GewSt-Anrechnungsbetrag eingetragen (§35 EStG).",
    paragraph: "§15 EStG",
  },
  { begriff: "Anlage EÜR", aliases: ["Anlage EÜR"], kategorie: "anlagen",
    kurzDefinition: "Detailliertes Formular für die Gewinnermittlung — alle Einnahmen + Ausgaben aufgelistet.",
    ausfuehrlich: "Pflicht-Anlage zur ESt-Erklärung für alle EÜR-Pflichtige (Freiberufler + kleine Gewerbe). Muss elektronisch über ELSTER eingereicht werden. Strukturiert nach Einnahmen (Erlöse, sonst. Einkünfte) und Ausgaben (Wareneinsatz, Personal, Raumkosten, Werbung, Abschreibungen etc.).",
  },
  { begriff: "Anlage V", aliases: ["Anlage V"], kategorie: "anlagen",
    kurzDefinition: "ESt-Anlage für Einkünfte aus Vermietung + Verpachtung.",
    ausfuehrlich: "Pro Immobilie eine Anlage V. Einnahmen (Kalt-Miete + Umlage) minus Werbungskosten (Zinsen, AfA, Reparaturen, Hausgeld). Mietverlust voll mit anderen Einkünften verrechenbar.",
    paragraph: "§21 EStG",
  },
  { begriff: "Anlage SO (Sonstige)", aliases: ["Anlage SO"], kategorie: "anlagen",
    kurzDefinition: "ESt-Anlage für sonstige Einkünfte: Tipps, Reichweite-Awards, gelegentliche Vermietung.",
    ausfuehrlich: "Freigrenze 256 €/Jahr nach §22 Nr. 3 EStG. Über dieser Grenze: voller Betrag mit persönlichem ESt-Satz besteuert.",
    paragraph: "§22 Nr. 3 EStG",
  },
  { begriff: "Anlage KAP", aliases: ["Anlage KAP"], kategorie: "anlagen",
    kurzDefinition: "ESt-Anlage für Einkünfte aus Kapitalvermögen (Zinsen, Dividenden, Crypto in manchen Fällen).",
    ausfuehrlich: "Pflicht NUR wenn (a) Bank nicht voll Abgeltungsteuer einbehalten hat (z.B. Auslands-Broker) oder (b) Günstigerprüfung erwünscht (persönlicher ESt-Satz <25 %) oder (c) Sparerpauschbetrag noch nicht aufgeteilt. Sonst optional.",
    paragraph: "§20 EStG",
  },
  { begriff: "Anlage AV", aliases: ["Anlage AV"], kategorie: "anlagen",
    kurzDefinition: "ESt-Anlage für Altersvorsorgeaufwendungen — Rürup, Riester, gesetzliche Rente, KV/PV-Beiträge.",
    ausfuehrlich: "Hier trägst du Sonderausgaben für Altersvorsorge ein. 2026: Rürup bis 30.826 €/J 100 % absetzbar (Single). Riester bis 2.100 €/J via Günstigerprüfung. Plus: gesetzliche RV-Beiträge, freiwillige KV-Beiträge.",
    paragraph: "§§ 10, 10a EStG",
  },

  // ========== FREIBETRÄGE ==========
  { begriff: "Grundfreibetrag", aliases: ["Grundfreibetrag"], kategorie: "freibetraege",
    kurzDefinition: "Existenzminimum-Freibetrag bei der ESt — 2026: 12.348 € Single / 24.696 € verheiratet.",
    ausfuehrlich: "Bis zu diesem Einkommen fällt keine ESt an. Wird jährlich angepasst (an Inflation/Existenzminimum). Gilt für jede natürliche Person, unabhängig von Einkunftsart.",
    paragraph: "§32a Abs. 1 Nr. 1 EStG",
  },
  { begriff: "Sparerpauschbetrag", aliases: ["Sparerpauschbetrag"], kategorie: "freibetraege",
    kurzDefinition: "Steuerfreier Kapitalertrag — 1.000 € Single / 2.000 € verheiratet 2026.",
    ausfuehrlich: "Gilt für Zinsen, Dividenden, ETF-Gewinne. Freistellungsauftrag bei jeder Bank stellen — sonst wird Abgeltungsteuer abgezogen, die du via Anlage KAP zurückholst. Bei mehreren Banken aufteilen.",
    paragraph: "§20 Abs. 9 EStG",
  },
  { begriff: "Übungsleiter-Pauschale", aliases: ["Übungsleiter", "§3 Nr. 26"], kategorie: "freibetraege",
    kurzDefinition: "3.000 €/Jahr steuerfrei für nebenberufliche pädagogische/künstlerische/pflegerische Tätigkeit bei gemeinnützigen Auftraggebern.",
    ausfuehrlich: "Typisch: Trainer im Sportverein, Volkshochschul-Kursleiter, Nachhilfe in der Schule, freie Lehrkräfte an gemeinnützigen Einrichtungen. Kombinierbar mit Ehrenamtspauschale bei unterschiedlichen Tätigkeiten.",
    paragraph: "§3 Nr. 26 EStG",
    toolLinks: [{ route: "/cockpit/schwellen-check", label: "Schwellen-Check" }],
  },
  { begriff: "Ehrenamtspauschale", aliases: ["Ehrenamt", "§3 Nr. 26a"], kategorie: "freibetraege",
    kurzDefinition: "840 €/Jahr steuerfrei für ehrenamtliche Tätigkeit bei gemeinnützigen Organisationen.",
    ausfuehrlich: "Typisch: Vereinsvorstand, Schöffe, ehrenamtliche Helfer. Kumulierbar mit Übungsleiter (3.840 € möglich) bei unterschiedlichen Tätigkeiten.",
    paragraph: "§3 Nr. 26a EStG",
  },
  { begriff: "Werbungskosten-Pauschbetrag", aliases: ["Werbungskosten"], kategorie: "freibetraege",
    kurzDefinition: "Pauschal-Abzug für Arbeitsmittel — Anlage S 102 €/J, Anlage N (Arbeitnehmer) 1.230 €/J.",
    ausfuehrlich: "Greift automatisch ohne Einzelnachweis. Höhere tatsächliche Werbungskosten? → Einzelaufstellung in der Erklärung — dann zählt der höhere Wert.",
    paragraph: "§9a EStG",
  },

  // ========== FA-VERFAHREN ==========
  { begriff: "ELSTER", aliases: ["ELSTER", "Elektronische Steuererklärung"], kategorie: "fa-verfahren",
    kurzDefinition: "Online-Portal des FA für Steuererklärungen, USt-VA, Fragebögen — kostenlos.",
    ausfuehrlich: "Pflicht-Tool für: USt-Voranmeldungen, Lohnsteuer-Anmeldungen, Anlage EÜR. Account braucht Aktivierungs-Code per Post (5-10 Tage). Alternative kommerzielle Tools: Lexoffice, sevdesk, Taxfix etc.",
  },
  { begriff: "Steuernummer vs USt-IdNr", aliases: ["USt-IdNr", "Steuernummer"], kategorie: "fa-verfahren",
    kurzDefinition: "Zwei verschiedene Nummern: Steuernummer = lokales FA, USt-IdNr = EU-weit für IGL.",
    ausfuehrlich: "Steuernummer: bekommst du nach Fragebogen-Bearbeitung (2-6 Wochen). Format: 12/345/67890. USt-IdNr: separate Beantragung beim BZSt (online) — Format DE123456789. Pflicht bei IGL-Geschäften (B2B-EU-Lieferungen).",
  },
  { begriff: "Fragebogen zur steuerlichen Erfassung", aliases: ["Fragebogen", "Erfassungsfragebogen"], kategorie: "fa-verfahren",
    kurzDefinition: "Pflicht-Formular nach Gründung — du gibst dem FA voraussichtliche Umsätze + Gewinne an.",
    ausfuehrlich: "Pflicht binnen 1 Monat nach Gewerbeanmeldung / Aufnahme der freiberuflichen Tätigkeit. Via ELSTER. FA berechnet daraus deine Vorauszahlungen (ESt/GewSt/USt). Realistisch schätzen — Anpassung später möglich, aber zu niedrig = Nachzahlung-Schock.",
  },
  { begriff: "Betriebsprüfung", aliases: ["Außenprüfung", "BP"], kategorie: "fa-verfahren",
    kurzDefinition: "Detaillierte Kontrolle deiner Buchhaltung durch FA — Stichproben oder gezielt.",
    ausfuehrlich: "Bei Klein-/Mittel: alle 3-7 Jahre. Bei Groß-Unternehmen: laufend (Anschluss-BP). Prüfungs-Schwerpunkte: USt, Personalkosten, Geschäftsführer-Gehalt, Verrechnungspreise. Bei Verstößen: Nachforderung + 6 % Zinsen + ggf. Strafverfahren.",
    paragraph: "§§ 193 ff. AO",
  },
  { begriff: "Festsetzungsverjährung", aliases: ["Verjährung"], kategorie: "fa-verfahren",
    kurzDefinition: "Frist, nach der Steuern nicht mehr nachgefordert werden können — i.d.R. 4 Jahre.",
    ausfuehrlich: "Regelfall 4 Jahre nach Abgabe der Steuererklärung. Bei leichtfertiger Steuerverkürzung: 5 Jahre. Bei Steuerhinterziehung: 10 Jahre. Beginnt am Ende des Kalenderjahrs der Abgabe → Hinterziehung 2024 verjährt frühestens 2034.",
    paragraph: "§§ 169 ff. AO",
  },

  // ========== INTERNATIONAL ==========
  { begriff: "Doppelbesteuerungsabkommen (DBA)", aliases: ["DBA"], kategorie: "international",
    kurzDefinition: "Bilateraler Vertrag: vermeidet, dass dasselbe Einkommen in 2 Ländern besteuert wird.",
    ausfuehrlich: "DE hat DBAs mit ~95 Ländern. Methoden: Anrechnung (ausländische Steuer wird auf DE-Steuer angerechnet) oder Freistellung (ausländisches Einkommen ist DE steuerfrei). Spezielle Regeln je Einkunftsart (Dividende, Zinsen, Lizenzgebühren).",
  },
  { begriff: "Quellensteuer", aliases: ["Quellensteuer", "WHT"], kategorie: "international",
    kurzDefinition: "Steuer, die der Zahlende einbehält und ans FA des Quellenstaats abführt (z.B. auf Dividenden, Zinsen, Lizenzgebühren).",
    ausfuehrlich: "Bei DE-Dividende an Ausland: 25 % Quellensteuer (mit SolZ 26,375 %). Mit gültigem DBA oft Reduktion (z.B. 5-15 %). EU-Mutter-Tochter-Richtlinie: 0 % bei ≥10 % Beteiligung + 12 Monate Halten.",
  },
  { begriff: "§AStG (Außensteuergesetz Hinzurechnungsbesteuerung)", aliases: ["AStG", "Hinzurechnung", "CFC"], kategorie: "international",
    kurzDefinition: "DE besteuert passive Gewinne deiner Auslands-Tochter, wenn dort <15 % Steuer + du beherrscht (>50 %).",
    ausfuehrlich: "Greift bei: Holding mit Beteiligung an niedrig besteuerten Auslandsgesellschaften (z.B. Cayman 0 %). Passive Einkünfte (Zinsen, Lizenzen, Mieten) werden zu DE-Steuerquote (~30 %) hochbesteuert. Aktive Einkünfte (operativer Handel, Dienstleistung) ausgenommen.",
    paragraph: "§§ 7-14 AStG",
    toolLinks: [{ route: "/cockpit/dba-cfc", label: "DBA-CFC-Rechner" }],
  },
  { begriff: "US-LLC", aliases: ["LLC", "Limited Liability Company"], kategorie: "international",
    kurzDefinition: "US-Rechtsform mit beschränkter Haftung — kann als 'disregarded entity' transparent besteuert werden.",
    ausfuehrlich: "Beliebt für: Online-Business, Amazon-FBA-US, Kreditkarten-Strategien. Single-Member LLC: Gewinn fließt direkt zum Owner (= transparent). Pflichten: Form 5472 + pro-forma 1120 (auch ohne US-Income, $25.000 Strafe!) + Sales-Tax-Check pro Staat.",
    toolLinks: [{ route: "/cockpit/us-llc-wizard", label: "US-LLC Setup-Wizard" }],
  },

  // ========== INVESTOREN & CRYPTO ==========
  { begriff: "Abgeltungsteuer", aliases: ["Abgeltungssteuer", "AbgSt"], kategorie: "investoren",
    kurzDefinition: "Pauschal 25 % Steuer auf Kapitalerträge (Zinsen, Dividenden, ETF-Gewinne) + 5,5 % SolZ = 26,375 %.",
    ausfuehrlich: "Wird direkt von der Bank einbehalten. Bei niedrigem persönlichen ESt-Satz (<25 %) lohnt sich Günstigerprüfung in Anlage KAP — dann wird der niedrigere Satz angewandt. Greift NICHT bei Krypto (§23 EStG, persönlicher Satz).",
    paragraph: "§32d EStG",
  },
  { begriff: "§23 EStG (Privates Veräußerungsgeschäft)", aliases: ["§23", "Spekulationssteuer"], kategorie: "investoren",
    kurzDefinition: "Steuer auf Gewinne aus dem Verkauf von Privatvermögen — Crypto, Antiquitäten, Gold etc.",
    ausfuehrlich: "Steuerfrei wenn (a) >1 Jahr gehalten (Crypto, Edelmetalle) oder >10 Jahre (Immobilien) oder (b) Gesamtgewinn aller §23-Geschäfte <1.000 €/Jahr (FREIGRENZE — 1 € drüber = alles steuerpflichtig!). Persönlicher Steuersatz, nicht Abgeltungsteuer.",
    paragraph: "§23 EStG",
    toolLinks: [{ route: "/cockpit/crypto-steuer", label: "Crypto-Steuer-Modul" }],
  },
  { begriff: "FIFO (First In - First Out)", aliases: ["FIFO"], kategorie: "investoren",
    kurzDefinition: "Standard-Methode bei Crypto/Aktien-Verkäufen: die zuerst gekauften Coins gelten als zuerst verkauft.",
    ausfuehrlich: "Wichtig für die 1-Jahres-Haltefrist §23 EStG: Wenn du Bitcoin in 2023+2024 gekauft und in 2026 verkauft hast, gelten ZUERST die 2023er Coins als verkauft (= über 1 Jahr = steuerfrei). FIFO ist Standard bei Krypto. Bei Aktien-Depots: in Deutschland auch FIFO Pflicht (anders als USA).",
  },
  { begriff: "Vorabpauschale", aliases: ["Vorabpauschale"], kategorie: "investoren",
    kurzDefinition: "Fiktiver Mindest-Ertrag von ETFs — bei thesaurierenden Fonds wird auf Basis Basiszins berechnet und besteuert.",
    ausfuehrlich: "Eingeführt 2018 mit InvStG-Reform. Berechnung: Basiszinssatz × Fondswert × 70 % (Aktienfonds Teilfreistellung). Bank berechnet automatisch und führt 26,375 % AbgSt ab — auch wenn keine Ausschüttung passiert. Wird beim Verkauf vom Gewinn abgezogen, damit nicht doppelt besteuert.",
    paragraph: "§18 InvStG",
  },
  { begriff: "Teilfreistellung (Aktien-/Misch-/Anleihen-ETF)", aliases: ["Teilfreistellung", "InvStG"], kategorie: "investoren",
    kurzDefinition: "Pauschale Steuerfreistellung je Fonds-Typ — Aktien 30 %, Misch 15 %, Anleihen 0 %.",
    ausfuehrlich: "Greift auf Vorabpauschale UND Veräußerungsgewinn. Bei Aktien-ETF (>50 % Aktien-Anteil): 30 % steuerfrei, nur 70 % mit 26,375 % besteuert = effektiv 18,46 % Steuer auf Gewinn. Misch-ETF: 15 % steuerfrei. Anleihen-/Geldmarkt-ETF: keine Teilfreistellung.",
    paragraph: "§20 InvStG",
  },
];

const SteuerABC = () => {
  const [search, setSearch] = useState("");
  const [katFilter, setKatFilter] = useState<Kategorie | "alle">("alle");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return GLOSSAR.filter((g) => {
      if (katFilter !== "alle" && g.kategorie !== katFilter) return false;
      if (!q) return true;
      const heystack = [
        g.begriff,
        g.kurzDefinition,
        g.ausfuehrlich,
        g.paragraph || "",
        ...(g.aliases || []),
      ]
        .join(" ")
        .toLowerCase();
      return heystack.includes(q);
    });
  }, [search, katFilter]);

  const byKat = useMemo(() => {
    const m: Record<Kategorie, GlossarBegriff[]> = {
      grundbegriffe: [], rechtsformen: [], buchhaltung: [], ust: [], "sv-kv": [],
      anlagen: [], freibetraege: [], "fa-verfahren": [], international: [], investoren: [],
    };
    for (const g of filtered) m[g.kategorie].push(g);
    return m;
  }, [filtered]);

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Steuer-ABC — 60+ Begriffe einfach erklärt"
      subtitle="Vollständiges Glossar des deutschen Steuerrechts für Anfänger:innen. Suchbar, kategorisiert, mit §-Verweisen, Beispielen und Cross-Links zu allen relevanten Tools."
    >
      {/* === BeginnerHero === */}
      <div className="rounded-2xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-card p-5 mb-6">
        <div className="flex items-start gap-3">
          <BookOpen className="h-6 w-6 text-accent-blue shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1">Was ist das hier?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Du liest Begriffe wie „EÜR", „Reverse Charge §13b" oder „Anlage KAP" und verstehst nur Bahnhof?
              Dieses Glossar erklärt {GLOSSAR.length}+ deutsche Steuer-Begriffe in einfacher Sprache — mit
              §-Verweis, konkretem Beispiel und Link zum passenden Tool, wo du das berechnen / einreichen
              kannst. Such direkt nach dem Begriff, der dich verwirrt.
            </p>
          </div>
        </div>
      </div>

      {/* === Suche === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Begriff suchen … z.B. 'KSK', 'EÜR', 'Reverse Charge', 'Holding', 'AbgSt' …"
            className="h-11 text-base pl-10"
            autoFocus
          />
        </div>
        {search.trim() && (
          <div className="text-[11px] text-muted-foreground mt-2">
            {filtered.length} von {GLOSSAR.length} Treffer:innen
          </div>
        )}
      </div>

      {/* === Kategorie-Filter === */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setKatFilter("alle")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            katFilter === "alle"
              ? "bg-accent-blue text-primary-foreground"
              : "bg-secondary hover:bg-accent-blue/10 border border-border"
          }`}
        >
          📚 Alle ({GLOSSAR.length})
        </button>
        {(Object.keys(KATEGORIEN) as Kategorie[]).map((k) => {
          const count = GLOSSAR.filter((g) => g.kategorie === k).length;
          return (
            <button
              key={k}
              onClick={() => setKatFilter(k)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                katFilter === k
                  ? "bg-accent-blue text-primary-foreground"
                  : "bg-secondary hover:bg-accent-blue/10 border border-border"
              }`}
            >
              {KATEGORIEN[k].emoji} {KATEGORIEN[k].label} ({count})
            </button>
          );
        })}
      </div>

      {/* === Begriff-Karten gruppiert nach Kategorie === */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm">
          Keine Treffer für „{search}". Tipp: probiere allgemeinere Begriffe, oder schau in „📚 Alle" durch.
        </div>
      ) : (
        <div className="space-y-6 mb-6">
          {(Object.keys(KATEGORIEN) as Kategorie[]).map((k) => {
            if (byKat[k].length === 0) return null;
            return (
              <section key={k}>
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span>{KATEGORIEN[k].emoji}</span>
                  <span>{KATEGORIEN[k].label}</span>
                  <span className="text-xs text-muted-foreground font-normal">({byKat[k].length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {byKat[k].map((g) => (
                    <BegriffCard key={g.begriff} g={g} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* === Cross-Links === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        <Link to="/cockpit/gewerbe-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Brauche ich Gewerbe?</div>
          <div className="text-muted-foreground">Tool 1 für komplette Anfänger:innen</div>
        </Link>
        <Link to="/cockpit/freiberuf-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Freiberuf vs Gewerbe-Check</div>
          <div className="text-muted-foreground">Tool 2 mit 46 Berufen + Edge-Cases</div>
        </Link>
        <Link to="/cockpit/schwellen-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Side-Hustle-Schwellen-Check</div>
          <div className="text-muted-foreground">Tool 3 — alle Freibeträge 2026</div>
        </Link>
      </div>

      <Stand2026Footer
        sources={[
          { label: "EStG (Einkommensteuergesetz)", url: "https://www.gesetze-im-internet.de/estg/" },
          { label: "UStG (Umsatzsteuergesetz)", url: "https://www.gesetze-im-internet.de/ustg_1980/" },
          { label: "GewStG (Gewerbesteuergesetz)", url: "https://www.gesetze-im-internet.de/gewstg/" },
          { label: "KStG (Körperschaftsteuergesetz)", url: "https://www.gesetze-im-internet.de/kstg_1977/" },
          { label: "AO (Abgabenordnung)", url: "https://www.gesetze-im-internet.de/ao_1977/" },
          { label: "ELSTER-Portal", url: "https://www.elster.de" },
        ]}
        note="Glossar deckt die wichtigsten Begriffe für Gründer:innen + Selbstständige ab. Bei rechtlich/steuerlich kritischen Entscheidungen immer mit Steuerberater abklären — Gesetzes-Stand kann sich kontinuierlich ändern."
      />
    </CockpitShell>
  );
};

const BegriffCard = ({ g }: { g: GlossarBegriff }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`rounded-2xl border bg-card p-4 transition ${expanded ? "border-accent-blue/40" : "border-border hover:border-accent-blue/40"}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-sm leading-tight">{g.begriff}</h3>
        {g.paragraph && (
          <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[10px] font-mono shrink-0">
            {g.paragraph}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">{g.kurzDefinition}</p>
      {expanded && (
        <div className="mt-2 space-y-2 text-xs leading-relaxed border-t border-border pt-2">
          <p className="text-foreground">{g.ausfuehrlich}</p>
          {g.beispiel && (
            <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-2 text-[11px]">
              <strong className="text-blue-700">💡 Beispiel:</strong> {g.beispiel}
            </div>
          )}
          {g.warnung && (
            <div className="rounded-lg bg-amber-500/5 border border-amber-500/30 p-2 text-[11px] flex items-start gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-700 shrink-0 mt-0.5" />
              <div><strong className="text-amber-700">Stolperfalle:</strong> {g.warnung}</div>
            </div>
          )}
          {g.toolLinks && g.toolLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {g.toolLinks.map((t) => (
                <Link
                  key={t.route}
                  to={t.route}
                  className="inline-flex items-center gap-1 rounded-lg border border-accent-blue/40 bg-accent-blue/5 text-accent-blue px-2 py-1 text-[11px] font-semibold hover:bg-accent-blue/10"
                >
                  {t.label} <ExternalLink className="h-2.5 w-2.5" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-[11px] text-accent-blue hover:underline font-semibold"
      >
        {expanded ? "← Weniger" : "Mehr lesen →"}
      </button>
    </div>
  );
};

export default SteuerABC;
