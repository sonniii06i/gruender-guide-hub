import type { LandingCopy } from "./landingCopy";

// Bespoke-Landing-Copy pro Tool-Slug. Generiert; fehlt ein Slug, greift der Fallback.
export const TOOL_COPY: Record<string, LandingCopy> = {
  "gewerbe-check": {
    "seoTitle": "Brauche ich ein Gewerbe? Check in 2 Minuten",
    "seoDescription": "Hobby, Freiberufler oder Gewerbe? Beantworte ein paar Fragen und erfahre, ob du anmelden musst – inkl. Gewinnerzielungsabsicht & §22 EStG.",
    "lead": "Der Decision-Tree für Anfänger ohne Gewerbe: Du beantwortest ein paar Fragen und erfährst, ob du ein Gewerbe brauchst, freiberuflich bist oder noch im Hobby-Bereich liegst.",
    "urgency": "Viele starten ihren Side-Hustle und merken erst beim Brief vom Finanzamt, dass sie längst hätten anmelden müssen. Eine verspätete Gewerbeanmeldung kann ein Bußgeld kosten – und Steuernachzahlungen kommen oft Jahre später geballt. Klär mit dem Gewerbe-Check von GründerX in wenigen Minuten, was für dich gilt, bevor das Amt es für dich entscheidet.",
    "outcomes": [
      "Klare Einordnung: Hobby, Freiberufler oder Gewerbe",
      "Verständnis, was Gewinnerzielungsabsicht und Liebhaberei für dich bedeuten",
      "Eine konkrete Empfehlung, was du jetzt als nächsten Schritt tun musst",
      "Sicherheit, ob du dir die Gewerbeanmeldung sparen kannst oder nicht"
    ],
    "disclaimer": "Der Check gibt dir eine Orientierung und ersetzt keine individuelle Steuer- oder Rechtsberatung."
  },
  "schwellen-check": {
    "seoTitle": "Side-Hustle-Schwellen-Check: Freibeträge 2026",
    "seoDescription": "Alle Freibeträge & Freigrenzen 2026 auf einen Blick: §22, Crypto, Kleinunternehmer, DAC7. Sieh sofort, welche Grenze für dich gilt.",
    "lead": "Der Überblick über alle relevanten Freibeträge und Freigrenzen 2026 für Nebenverdienste – damit du weißt, ab wann du wirklich Steuern zahlst oder gemeldet wirst.",
    "urgency": "Plattformen wie eBay, Vinted oder Etsy melden seit der DAC7-Pflicht automatisch ans Finanzamt – ab 30 Verkäufen oder 2.000 € im Jahr. Wer seine Freigrenzen nicht kennt, zahlt entweder zu viel Steuern oder bekommt unerwartet Post vom Amt. Mit dem Schwellen-Check von GründerX siehst du sofort, welche Grenzen für deinen Side-Hustle zählen.",
    "outcomes": [
      "Überblick über alle Freibeträge und Freigrenzen 2026 für dich",
      "Klarheit, ab welchem Betrag dein Nebenverdienst steuerpflichtig wird",
      "Wissen, ob und ab wann dich eine Plattform via DAC7 ans Finanzamt meldet",
      "Einschätzung, ob du in die Kleinunternehmer-Grenzen passt"
    ],
    "disclaimer": "Die Werte sind allgemeine Orientierung – deine konkrete Steuersituation klärt am sichersten ein Steuerberater."
  },
  "gewerbeanmeldung-wizard": {
    "seoTitle": "Gewerbeanmeldung-Wizard: GewA1 richtig ausfüllen",
    "seoDescription": "Füll das amtliche Gewerbe-Formular GewA1 in 8 Schritten korrekt aus – mit WZ-Branchenschlüssel und Tätigkeits-Check. Ohne Rätselraten.",
    "lead": "Ein 8-Schritte-Wizard, der das amtliche GewA1-Formular mit deinen Daten füllt – von Person und Anschrift bis Rechtsform, Tätigkeit und Branchenschlüssel.",
    "urgency": "Eine schlampig ausgefüllte Gewerbeanmeldung führt zu Rückfragen, falschen Branchenschlüsseln und unnötigen Verzögerungen beim Start. Genau die Tätigkeitsbeschreibung und der WZ-2008-Schlüssel sind die Felder, an denen Anfänger am häufigsten scheitern. Mit dem Gewerbeanmeldung-Wizard von GründerX füllst du das Formular einmal sauber aus und gehst vorbereitet zum Amt.",
    "outcomes": [
      "Ein vollständig ausgefülltes GewA1-Formular mit deinen Daten",
      "Der passende WZ-2008-Branchenschlüssel für deine Tätigkeit",
      "Eine geprüfte Tätigkeitsbeschreibung ohne typische Stolperfallen",
      "Klarheit über die nächsten Behörden-Schritte nach der Anmeldung"
    ],
    "disclaimer": "Der Wizard hilft beim Ausfüllen, ersetzt aber keine verbindliche Auskunft deines Gewerbeamts."
  },
  "erste-schritte-roadmap": {
    "seoTitle": "Erste-Schritte-Roadmap: 90-Tage-Plan zum Start",
    "seoDescription": "Deine persönliche 30/60/90-Tage-Timeline mit allen Pflicht-Aufgaben: Finanzamt, KV, Konto, USt-ID. Nichts mehr vergessen.",
    "lead": "Eine personalisierte 30/60/90-Tage-Timeline mit 15 bis 25 Aufgaben – von der Finanzamt-Anmeldung über die KV-Wahl bis zum Geschäftskonto, sortiert nach Muss, Soll und Kann.",
    "urgency": "Beim Gründen warten Dutzende Aufgaben gleichzeitig – und genau bei den Pflichtterminen wie Finanzamt-Anmeldung oder USt-Voranmeldung wird es teuer, wenn man eine Frist verpasst. Ohne klare Reihenfolge verzettelst du dich oder vergisst etwas Wichtiges. Die Erste-Schritte-Roadmap von GründerX gibt dir die volle Liste in der richtigen Reihenfolge, abhakbar Schritt für Schritt.",
    "outcomes": [
      "Eine persönliche 30/60/90-Tage-Timeline mit allen relevanten Aufgaben",
      "Klare Priorisierung nach Muss, Soll und Kann",
      "Status-Tracking, das festhält, was schon erledigt ist",
      "Sicherheit, dass du keine wichtige Frist oder Anmeldung übersiehst"
    ],
    "disclaimer": "Die Roadmap ist eine allgemeine Orientierung – einzelne Pflichten können je nach Situation abweichen."
  },
  "fse-wizard": {
    "seoTitle": "FsE-Begleiter: Fragebogen steuerliche Erfassung",
    "seoDescription": "Den ELSTER-Fragebogen zur steuerlichen Erfassung Feld für Feld erklärt – inkl. Empfehlungen zu Kleinunternehmer, EÜR & Ist-Versteuerung.",
    "lead": "Ein Walkthrough durch alle 22 Teilseiten und rund 300 Felder des ELSTER-Fragebogens zur steuerlichen Erfassung – du füllst direkt in ELSTER aus, diese Seite erklärt parallel jedes Feld.",
    "urgency": "Der Fragebogen zur steuerlichen Erfassung entscheidet über Weichen, die du jahrelang spürst: Kleinunternehmer nach §19, EÜR oder Bilanz, Soll- oder Ist-Versteuerung. Ein falsches Kreuz hier kostet dich später Liquidität oder unnötigen Aufwand. Der FsE-Begleiter von GründerX führt dich Feld für Feld durch und gibt dir bei den vier bindenden Entscheidungen eine klare Empfehlung.",
    "outcomes": [
      "Verständnis jedes einzelnen FsE-Felds in ELSTER-Reihenfolge",
      "Begründete Entscheidung zu Kleinunternehmer, EÜR/Bilanz, Soll/Ist und USt-IdNr",
      "Ein sauber ausgefüllter Fragebogen ohne unbeabsichtigte Festlegungen",
      "Weniger Rückfragen und Verzögerungen vom Finanzamt"
    ],
    "disclaimer": "Die Empfehlungen sind allgemeine Orientierung und ersetzen keine individuelle Steuerberatung."
  },
  "fse-kapitalgesellschaft": {
    "seoTitle": "FsE Kapitalgesellschaft: GmbH & UG bei ELSTER",
    "seoDescription": "Der ELSTER-Fragebogen für GmbH, UG, AG & eG Seite für Seite erklärt: Stammkapital, Anteilseigner, Organschaft, USt-IdNr & OSS.",
    "lead": "Ein Walkthrough durch alle 23 Teilseiten des ELSTER-Fragebogens zur steuerlichen Erfassung für Kapitalgesellschaften – mit Zeilennummern und Erklärung, während du in ELSTER ausfüllst.",
    "urgency": "Bei einer GmbH oder UG ist der steuerliche Fragebogen komplexer als beim Solo-Start: Stammkapital, Anteilseigner, Sach- oder Bargründung und Organschaft müssen sitzen. Fehler hier ziehen Rückfragen vom Finanzamt nach sich und verzögern den operativen Start deiner Gesellschaft. Mit dem FsE-Begleiter für Kapitalgesellschaften von GründerX gehst du jede Teilseite vorbereitet durch.",
    "outcomes": [
      "Verständnis aller 23 Teilseiten in ELSTER-Reihenfolge",
      "Klarheit bei Stammkapital, Anteilseignern und Gründungsart",
      "Saubere Angaben zu Soll-/Ist-Versteuerung, USt-IdNr und OSS",
      "Ein zügiger, rückfragearmer FsE-Prozess für deine Gesellschaft"
    ],
    "disclaimer": "Bei Kapitalgesellschaften gehört der Fragebogen meist in fachkundige Hände – diese Seite erklärt, ersetzt aber keine Steuerberatung."
  },
  "fse-personengesellschaft": {
    "seoTitle": "FsE Personengesellschaft: GbR, OHG & KG erklärt",
    "seoDescription": "Der ELSTER-Fragebogen für GbR, OHG & KG Seite für Seite: Beteiligte, Gewinnanteile, gesonderte Feststellung, USt & OSS verständlich erklärt.",
    "lead": "Ein Walkthrough durch alle 22 Teilseiten des ELSTER-Fragebogens für Personengesellschaften – mit Zeilennummern, während du selbst in ELSTER ausfüllst.",
    "urgency": "Bei GbR, OHG oder KG kommt eine Hürde dazu, die Solo-Gründer nicht kennen: die gesonderte und einheitliche Feststellung mit den Gewinnanteilen aller Beteiligten. Wer Vertretung und Gewinnverteilung falsch angibt, handelt sich Ärger mit dem Finanzamt und unter den Partnern ein. Der FsE-Begleiter für Personengesellschaften von GründerX führt euch sauber durch jede Teilseite.",
    "outcomes": [
      "Verständnis aller 22 Teilseiten in ELSTER-Reihenfolge",
      "Korrekte Angaben zu Vertretung, Beteiligten und Gewinnanteilen",
      "Klarheit bei Gewinnermittlung, Kleinunternehmer und USt-IdNr",
      "Ein abgestimmter, rückfragearmer FsE für eure Gesellschaft"
    ],
    "disclaimer": "Diese Seite erklärt den Fragebogen, ersetzt bei mehreren Beteiligten aber keine individuelle Steuerberatung."
  },
  "stb-cost-benefit": {
    "seoTitle": "Steuerberater nötig? Cost-Benefit-Check",
    "seoDescription": "Voll-StB, DIY oder Hybrid – welche Variante ist für deinen Umsatz am günstigsten? Vergleich mit StBVV-Gebühren und Zeitkosten in Minuten.",
    "lead": "Ein 3-Szenarien-Vergleich, der dir zeigt, ob sich ein Steuerberater für dich lohnt – Voll-StB, DIY mit Software oder Hybrid, gerechnet mit echten Mittelgebühren und deinem Zeitaufwand.",
    "urgency": "Ein Steuerberater kann ein paar hundert Euro im Jahr kosten – oder mehrere tausend. Wer pauschal alles abgibt, zahlt oft zu viel; wer alles selbst macht, verliert wertvolle Stunden und riskiert Fehler. Mit dem Cost-Benefit-Check von GründerX siehst du schwarz auf weiß, welche Variante bei deinem Umsatz und Gewinn am günstigsten ist.",
    "outcomes": [
      "Ein Kostenvergleich der drei Varianten für deine Zahlen",
      "Transparenz über StBVV-Mittelgebühren und deine Eigenzeit-Kosten",
      "Eine klare Empfehlung, welche Option für dich am günstigsten ist",
      "Eine fundierte Grundlage für das Gespräch mit einem Steuerberater"
    ],
    "disclaimer": "Die Gebühren sind Richtwerte – das individuelle Honorar legt dein Steuerberater nach StBVV fest."
  },
  "buchhaltungssoftware-guide": {
    "seoTitle": "Buchhaltungssoftware-Guide: Lexware, sevDesk & Co",
    "seoDescription": "Lexware Office, sevDesk oder ELSTER direkt? Funktionen, Kosten 2026 und welches Tool zu Solo, E-Commerce oder Kleinunternehmer passt.",
    "lead": "Ein Vergleich von Lexware Office, sevDesk und ELSTER-direkt – mit Funktionen, Kosten-Richtwerten 2026 und einer Empfehlung, welches Tool zu deinem Profil passt.",
    "urgency": "Die falsche Buchhaltungssoftware kostet dich jeden Monat Geld für Funktionen, die du nicht brauchst – oder Nerven, weil das Tool zu deinem Geschäft nicht passt. Gerade als Solo, E-Commerce-Brand oder Kleinunternehmer hast du sehr unterschiedliche Anforderungen. Der Buchhaltungssoftware-Guide von GründerX hilft dir, einmal richtig zu wählen, statt später mühsam umzuziehen.",
    "outcomes": [
      "Ein klarer Funktions- und Kostenvergleich der gängigen Tools",
      "Eine Empfehlung passend zu deinem Profil (Solo, E-Commerce, Kleinunternehmer)",
      "Verständnis, wie du buchst und per ELSTER abgibst",
      "Eine sichere Entscheidung ohne teuren Software-Umzug später"
    ],
    "disclaimer": "Kosten und Funktionen können sich ändern – prüfe vor Abschluss die aktuellen Angaben der Anbieter."
  },
  "ust-voranmeldung": {
    "seoTitle": "USt-Voranmeldung: ELSTER-Vordruck Schritt für Schritt",
    "seoDescription": "Die Umsatzsteuer-Voranmeldung in ELSTER richtig ausfüllen: alle Kennzahlen erklärt, Fristen und Dauerfristverlängerung mit Rechner.",
    "lead": "Ein Walkthrough durch den echten ELSTER-Vordruck USt 1 A – alle relevanten Kennzahlen erklärt, plus Fristen und Dauerfristverlängerung mit Rechner.",
    "urgency": "Die USt-Voranmeldung hat feste Fristen, und das Finanzamt kennt bei Verspätung wenig Gnade: Verspätungszuschläge und Säumniszuschläge sammeln sich schnell an. Wer die Kennzahlen nicht versteht, trägt falsch ein und zahlt drauf. Mit dem USt-Voranmeldung-Walkthrough von GründerX füllst du den Vordruck sicher aus und kennst deine Fristen.",
    "outcomes": [
      "Verständnis aller relevanten Kennzahlen im Vordruck USt 1 A",
      "Klarheit über deine Abgabe-Fristen",
      "Eine berechnete Sondervorauszahlung für die Dauerfristverlängerung",
      "Eine korrekt eingetragene Voranmeldung in ELSTER"
    ],
    "disclaimer": "Der Walkthrough erklärt den Vordruck allgemein und ersetzt keine individuelle Steuerberatung."
  },
  "anlage-euer": {
    "seoTitle": "Anlage EÜR: Gewinnermittlung Zeile für Zeile",
    "seoDescription": "Die Anlage EÜR in ELSTER Zeile für Zeile erklärt – §4 Abs. 3 EStG für Solo & E-Commerce, Brutto-Methode plus Mini-Gewinnrechner.",
    "lead": "Ein Walkthrough durch die echte ELSTER-Anlage EÜR – Zeile für Zeile, mit den relevanten Feldern für Solo und E-Commerce und einem Mini-Gewinnrechner.",
    "urgency": "Die Anlage EÜR ist deine jährliche Gewinnermittlung – und die Zahl darin ist die Basis für deine Einkommensteuer. Wer Betriebsausgaben in die falschen Zeilen schreibt oder die Brutto-Methode missversteht, verschenkt Abzüge oder riskiert eine Korrektur. Der Anlage-EÜR-Walkthrough von GründerX führt dich Zeile für Zeile durch, damit dein Gewinn am Ende stimmt.",
    "outcomes": [
      "Verständnis der relevanten EÜR-Zeilen für dein Geschäft",
      "Klarheit über die Brutto-Methode bei deinen Ausgaben",
      "Ein erster Gewinn-Richtwert über den Mini-Rechner",
      "Eine sauber befüllte Anlage EÜR in ELSTER"
    ],
    "disclaimer": "Diese Seite erklärt den Vordruck allgemein und ersetzt keine individuelle Steuerberatung."
  },
  "stundensatz-rechner": {
    "seoTitle": "Stundensatz-Rechner: Was du wirklich nehmen musst",
    "seoDescription": "Berechne deinen realistischen Stundensatz rückwärts aus Wunsch-Netto, KV und Rücklagen. Schluss mit dem 30-€-Anfängerfehler.",
    "lead": "Ein Rückwärts-Rechner, der aus deinem Wunsch-Netto, Lebenshaltung, Krankenversicherung und Rücklage den Stundensatz ableitet, den du tatsächlich brauchst.",
    "urgency": "Der teuerste Anfängerfehler: den eigenen Stundensatz am alten Vollzeit-Brutto festmachen und 30 € pro Stunde nehmen. Was dabei untergeht, sind Steuern, Krankenversicherung, Rücklagen und die Tatsache, dass nur ein Teil deiner Zeit abrechenbar ist – am Ende arbeitest du für Mindestlohn. Der Stundensatz-Rechner von GründerX zeigt dir, was du wirklich nehmen musst, um davon leben zu können.",
    "outcomes": [
      "Ein konkreter, realistischer Stundensatz für deine Angebote",
      "Verständnis, wie KV, Steuern und Rücklagen deinen Satz beeinflussen",
      "Klarheit über deine wirklich abrechenbaren Stunden",
      "Eine belastbare Basis für deine Preisverhandlungen"
    ],
    "disclaimer": "Das Ergebnis ist ein Orientierungswert – deine tatsächlichen Kosten und Auslastung können abweichen."
  },
  "rechnungs-generator": {
    "seoTitle": "Rechnungs-Generator: §14-konforme Rechnung als PDF",
    "seoDescription": "Schreib deine erste rechtssichere Rechnung: §14 UStG-konform mit allen Pflichtangaben, 4 USt-Modi und PDF-Download. Profil wird gespeichert.",
    "lead": "Ein Generator für deine erste richtige Rechnung – §14-UStG-konform mit vier Umsatzsteuer-Modi, Live-Pflichtangaben-Check und PDF-Download.",
    "urgency": "Eine Rechnung ohne die gesetzlichen Pflichtangaben kann dazu führen, dass dein Kunde den Vorsteuerabzug verliert und du nachbessern musst – peinlich und ärgerlich beim ersten Auftrag. Auch der richtige USt-Modus, ob Standard, Kleinunternehmer oder Reverse-Charge, will getroffen sein. Mit dem Rechnungs-Generator von GründerX schreibst du deine erste Rechnung von Anfang an korrekt.",
    "outcomes": [
      "Eine fertige, §14-UStG-konforme Rechnung als PDF",
      "Den richtigen USt-Modus für deinen Fall ausgewählt",
      "Bestätigung, dass alle Pflichtangaben vorhanden sind",
      "Ein gespeichertes Firmen-Profil mit Logo für die nächste Rechnung"
    ],
    "disclaimer": "Der Pflichtangaben-Check ist eine Hilfe, ersetzt aber bei Sonderfällen keine steuerliche Prüfung."
  },
  "brutto-netto-solo": {
    "seoTitle": "Brutto-Netto-Rechner für Solo-Selbstständige",
    "seoDescription": "Berechne als Selbstständiger, was vom Umsatz wirklich übrig bleibt: Gewinn, ESt, SolZ, GewSt und KV/PV bis zum Netto – Schritt für Schritt.",
    "lead": "Der Brutto-Netto-Rechner für Solo-Selbstständige zeigt dir, was nach allen Steuern und Beiträgen vom Umsatz tatsächlich auf deinem Konto landet.",
    "urgency": "Viele Solo-Selbstständige planen mit dem Umsatz und erleben beim Steuerbescheid eine böse Überraschung. Wer ESt-Progression, SolZ und freiwillige KV/PV nicht einkalkuliert, verkalkuliert sich schnell um Tausende Euro im Jahr. Rechne dein echtes Netto jetzt mit GründerX durch, bevor du Preise und Entnahmen festlegst.",
    "outcomes": [
      "Du kennst dein realistisches Netto vom Umsatz – nicht nur den Gewinn",
      "Du siehst die einzelnen Abzüge transparent: ESt, SolZ, ggf. GewSt, KV/PV",
      "Du erkennst, ob deine Preise deine Steuerlast und Beiträge wirklich decken",
      "Du vergleichst fair, was du als Angestellter beim gleichen AG-Total netto hättest"
    ],
    "disclaimer": "Die Berechnung ist eine Orientierungshilfe und ersetzt keine individuelle Steuerberatung."
  },
  "versicherungs-basis-check": {
    "seoTitle": "Versicherungs-Check für Selbstständige",
    "seoDescription": "Finde heraus, welche Versicherungen du als Solo-Selbstständiger wirklich brauchst: 11 Typen nach Pflicht, dringend und sinnvoll sortiert – neutral.",
    "lead": "Der Versicherungs-Basis-Check sortiert dir nach 7 Fragen 11 Versicherungs-Typen nach Priorität – von Pflicht bis optional, ohne Verkaufsabsicht.",
    "urgency": "Als Solo-Selbstständiger trägst du jedes Risiko allein. Eine fehlende Berufshaftpflicht oder Berufsunfähigkeitsabsicherung kann im Schadensfall die Existenz kosten – während du anderswo für Policen zahlst, die du gar nicht brauchst. Mach jetzt den Basis-Check mit GründerX und sieh klar, was wirklich zählt.",
    "outcomes": [
      "Du weißt, welche Versicherungen Pflicht, dringend, sinnvoll oder verzichtbar sind",
      "Du verstehst dank Schadenbeispielen, wovor jede Police dich konkret schützt",
      "Du hast eine grobe Beitrags-Schätzung für deine Planung",
      "Du gehst mit einer Worauf-Achten-Liste in jedes Beratungsgespräch"
    ],
    "disclaimer": "Der Check ist neutral und unverbindlich und ersetzt keine individuelle Versicherungsberatung."
  },
  "steuer-abc": {
    "seoTitle": "Steuer-ABC: Steuerbegriffe einfach erklärt",
    "seoDescription": "Über 60 deutsche Steuerbegriffe einfach erklärt – von ESt, EÜR und Anlage S bis Reverse Charge §13b. Suchbar, mit §-Verweisen und Tool-Links.",
    "lead": "Das Steuer-ABC erklärt dir über 60 deutsche Steuerbegriffe verständlich – mit Paragrafen-Verweisen und Direktlinks zum passenden Rechner.",
    "urgency": "Steuerbriefe und Buchhaltungssoftware werfen mit Fachbegriffen um sich, und ein Missverständnis bei §13b oder der EÜR kann teuer werden. Statt im Netz Halbwissen zusammenzusuchen, schlägst du jeden Begriff sofort sauber nach. Nutze das Steuer-ABC von GründerX als dein Nachschlagewerk fürs ganze Jahr.",
    "outcomes": [
      "Du verstehst über 60 Steuerbegriffe in Klartext statt Behördendeutsch",
      "Du findest jeden Begriff über die Suche und 10 Kategorien in Sekunden",
      "Du springst per Cross-Link direkt zum passenden GründerX-Tool",
      "Du redest auf Augenhöhe mit Steuerberater und Finanzamt"
    ],
    "disclaimer": "Die Erklärungen dienen dem Verständnis und ersetzen keine individuelle Steuerberatung."
  },
  "rechtsform-wizard": {
    "seoTitle": "Rechtsform-Wizard: Einzelunternehmen bis GmbH",
    "seoDescription": "Finde die passende Rechtsform für dein Business: vom Einzelunternehmer über UG und GmbH bis zur Holding – mit klarer Empfehlung Schritt für Schritt.",
    "lead": "Der Rechtsform-Wizard führt dich vom Einzelunternehmen über UG und GmbH bis zur Holding und zeigt, welche Struktur zu deiner Lage passt.",
    "urgency": "Die falsche Rechtsform kostet dich Jahr für Jahr unnötig Steuern, Haftungsrisiko oder Flexibilität – und ein späterer Wechsel ist teuer und aufwendig. Je früher du richtig aufgestellt bist, desto mehr sparst du dir an Umbau und Beraterkosten. Klär deine Rechtsform jetzt mit dem Wizard von GründerX.",
    "outcomes": [
      "Du kennst die passende Rechtsform für deine aktuelle Situation",
      "Du verstehst die Unterschiede zwischen Einzelunternehmen, UG, GmbH und Holding",
      "Du erkennst, wann sich der Sprung zur nächsten Stufe lohnt",
      "Du gehst vorbereitet ins Gespräch mit Steuerberater oder Notar"
    ],
    "disclaimer": "Die Empfehlung ist eine Orientierung und ersetzt keine individuelle Steuer- oder Rechtsberatung."
  },
  "holding-designer": {
    "seoTitle": "Holding-Struktur-Designer mit Steuer-Effekt",
    "seoDescription": "Vergleiche 8 echte Holding-Strukturen – von 2-Stufen über Familien-Pool bis IP-Holding – mit Steuer-Effekt, Sperrfristen und Empfehlungs-Wizard.",
    "lead": "Der Holding-Designer stellt dir 8 reale Holding-Strukturen mit Steuer-Effekt, Sperrfristen und Praxisbeispielen vor – inklusive Empfehlungs-Wizard.",
    "urgency": "Ohne durchdachte Holding-Struktur zahlst du auf Gewinnausschüttungen und Verkäufe oft deutlich mehr Steuern als nötig. Wer Sperrfristen oder den passenden Aufbau übersieht, verschenkt langfristig fünf- bis sechsstellige Beträge. Vergleiche die Strukturen jetzt mit GründerX, bevor du dein Konstrukt aufsetzt.",
    "outcomes": [
      "Du überblickst 8 Holding-Strukturen vom 2-Stufen-Modell bis zur Stiftung",
      "Du verstehst je Variante den Steuer-Effekt und die relevanten Sperrfristen",
      "Du lernst aus echten Beispiel-Konstrukten statt aus Theorie",
      "Du bekommst eine konkrete Struktur-Empfehlung für deine Ausgangslage"
    ],
    "disclaimer": "Die Inhalte sind allgemeine Information und ersetzen keine individuelle Steuer- oder Rechtsberatung."
  },
  "ip-box": {
    "seoTitle": "IP-Box-Vergleich: 9 EU/CH Patentboxen",
    "seoDescription": "Vergleiche 9 EU- und CH-Patentboxen von 2,5% bis 9% mit Live-Steuerberechnung, BEPS-Nexus, AStG-Risiko und Mindest-Royalties im Überblick.",
    "lead": "Der IP-Box-Vergleich zeigt dir 9 EU- und CH-Patentboxen mit Live-Steuerberechnung, BEPS-Nexus und AStG-Risiko auf einen Blick.",
    "urgency": "Wer seine IP-Erträge über die falsche oder gar keine Patentbox laufen lässt, verschenkt erhebliche Steuervorteile – oder tappt in die AStG-Hinzurechnungsfalle. Ohne sauberen Nexus-Check kann ein Konstrukt im Nachhinein kippen. Vergleiche die Boxen jetzt faktenbasiert mit GründerX, bevor du dich festlegst.",
    "outcomes": [
      "Du vergleichst 9 Patentboxen von CY 2,5% bis NL 9% direkt nebeneinander",
      "Du siehst per Live-Berechnung den Steuer-Effekt auf deine IP-Erträge",
      "Du prüfst BEPS-Nexus, AStG-Risiko und Mindest-Royalties je Standort",
      "Du erkennst, welche Box realistisch zu deinem Setup passt"
    ],
    "disclaimer": "Die Berechnungen sind unverbindlich und ersetzen keine individuelle steuerliche oder rechtliche Beratung."
  },
  "eu-alternativen": {
    "seoTitle": "EU- & CH-Alternativen für Firmensitz & Holding",
    "seoDescription": "Vergleiche 13 Länder von EE 0% bis CH 11,9% plus 5 Multi-Jurisdiktions-Konstrukte für Firmensitz und Holding – mit Steuerlast und Modellen.",
    "lead": "Die EU-/CH-Alternativen geben dir 13 Länder von Estland bis Schweiz und 5 Multi-Jurisdiktions-Konstrukte mit ihren Steuer-Eckdaten an die Hand.",
    "urgency": "Standortwahl ist eine der teuersten Entscheidungen im Steuerrecht – und mit unbedachten Auslandskonstrukten riskierst du Wegzugsbesteuerung und AStG-Ärger. Wer die Optionen nicht kennt, lässt entweder Geld liegen oder läuft in eine Falle. Verschaff dir den Überblick jetzt mit GründerX, bevor du an einen Standort denkst.",
    "outcomes": [
      "Du überblickst 13 EU-/CH-Standorte mit ihren steuerlichen Eckdaten",
      "Du verstehst Spezialmodelle wie EE-Thesaurierung 0% oder AT FlexCo",
      "Du kennst 5 Multi-Jurisdiktions-Konstrukte und ihre Logik",
      "Du gehst informiert in die Standort-Entscheidung mit deinem Berater"
    ],
    "disclaimer": "Die Länderdaten sind allgemeine Information und ersetzen keine individuelle Steuer- oder Rechtsberatung."
  },
  "entscheidungs-engine": {
    "seoTitle": "Struktur-Entscheidungs-Engine für Gründer",
    "seoDescription": "9 Fragen, klare Antwort: Die Entscheidungs-Engine vergleicht alle Strukturen von Einzel über GmbH bis Holding und liefert deine Top-3-Empfehlungen.",
    "lead": "Die Entscheidungs-Engine fragt dich 9 Punkte ab und liefert quer über alle Strukturen deine drei besten Optionen – mit Begründung.",
    "urgency": "Zwischen Einzelunternehmen, Holding, Familien-Pool oder US-LLC verliert man schnell den Überblick und entscheidet aus dem Bauch. Eine schlecht gewählte Struktur bremst Wachstum und kostet später teure Korrekturen. Lass dir jetzt von der Engine bei GründerX deine Top-3 mit klarer Begründung berechnen.",
    "outcomes": [
      "Du erhältst nach 9 Fragen deine drei passendsten Strukturen",
      "Du verstehst je Empfehlung, warum sie zu dir passt",
      "Du vergleichst alle Modelle von Einzel bis US-LLC auf einer Linie",
      "Du sparst dir teure Probier-und-Wechsel-Runden bei der Struktur"
    ],
    "disclaimer": "Die Empfehlungen sind eine Orientierung und ersetzen keine individuelle Steuer- oder Rechtsberatung."
  },
  "auszahlung-optimizer": {
    "seoTitle": "Gewinn-Auszahlungs-Optimizer für GmbH-Inhaber",
    "seoDescription": "Vergleiche 7 Wege, Gewinn aus der GmbH zu entnehmen – von GF-Gehalt über Dividende und Holding bis Pension – mit konkreter Steuerberechnung.",
    "lead": "Der Auszahlungs-Optimizer vergleicht 7 Wege, Gewinn aus deiner GmbH zu holen, jeweils mit konkreter Steuer-Berechnung pro Variante.",
    "urgency": "Wie du Gewinn entnimmst, entscheidet darüber, wie viel das Finanzamt mitnimmt – und der naheliegende Weg ist selten der günstigste. Wer Gehalt, Dividende und Holding-Route nicht durchrechnet, verschenkt bei jeder Ausschüttung Geld. Rechne deine optimale Auszahlung jetzt mit GründerX durch.",
    "outcomes": [
      "Du vergleichst 7 Auszahlungswege mit ihrer jeweiligen Steuerlast",
      "Du siehst pro Variante konkret, was netto bei dir ankommt",
      "Du erkennst clevere Mix-Strategien aus Gehalt, Dividende und Co.",
      "Du triffst deine Entnahme-Entscheidung auf Basis echter Zahlen"
    ],
    "disclaimer": "Die Berechnungen sind unverbindlich und ersetzen keine individuelle Steuerberatung."
  },
  "frist-kalender": {
    "seoTitle": "Steuer-Frist-Kalender für Selbstständige",
    "seoDescription": "Behalte alle Steuerfristen im Blick: USt-VA, ESt, KSt und GewSt – personalisiert nach deiner Rechtsform, damit du keine Deadline mehr verpasst.",
    "lead": "Der Frist-Kalender zeigt dir alle relevanten Steuerfristen – USt-VA, ESt, KSt, GewSt – personalisiert nach deiner Rechtsform.",
    "urgency": "Verpasste Steuerfristen bedeuten Verspätungszuschläge, Säumniszuschläge und im schlimmsten Fall Schätzungen durch das Finanzamt. Eine einzige übersehene USt-Voranmeldung kann dich bares Geld und Nerven kosten. Lass dir deine Fristen jetzt von GründerX nach Rechtsform sortieren und nie wieder eine verpassen.",
    "outcomes": [
      "Du hast alle Steuerfristen passend zu deiner Rechtsform an einem Ort",
      "Du erkennst rechtzeitig, wann USt-VA, ESt, KSt oder GewSt fällig sind",
      "Du vermeidest Verspätungs- und Säumniszuschläge",
      "Du planst Liquidität und Abgaben mit klarem Vorlauf"
    ],
    "disclaimer": "Der Kalender dient der Orientierung; maßgeblich sind die Fristen deines Finanzamts und ggf. deines Steuerberaters."
  },
  "amazon-buchungen": {
    "seoTitle": "Amazon-Buchungstexte mit SKR03/04-Konto",
    "seoDescription": "Schlüssle über 130 Amazon-Buchungscodes wie AMA-SG-DE, FBAFees oder MZNFS auf – mit passendem SKR03/04-Konto und USt-Behandlung per Live-Lookup.",
    "lead": "Der Amazon-Buchungstexte-Lookup übersetzt dir über 130 Codes wie AMA-SG-DE oder FBAFees direkt ins richtige SKR03/04-Konto samt USt-Behandlung.",
    "urgency": "Amazon-Abrechnungen sind ein Buchungs-Dschungel, und falsch verbuchte Codes führen zu falscher Umsatzsteuer und Stress in der Betriebsprüfung. Jede Stunde Rätselraten über AMA-BG-IT oder MZNFS ist verlorene Zeit. Schlag deine Buchungstexte jetzt in Sekunden mit GründerX nach.",
    "outcomes": [
      "Du ordnest über 130 Amazon-Codes dem korrekten SKR03/04-Konto zu",
      "Du kennst je Code die richtige umsatzsteuerliche Behandlung",
      "Du buchst deine Amazon-Settlements schneller und sauberer",
      "Du reduzierst Rückfragen von Steuerberater und Buchhaltung"
    ],
    "disclaimer": "Die Kontierungshinweise sind eine Hilfestellung und ersetzen keine individuelle steuerliche Beratung."
  },
  "pre-year-end": {
    "seoTitle": "Pre-Year-End-Steuercheck mit 7 Hebeln",
    "seoDescription": "Senke deine Steuerlast vor Jahresende: 7 Hebel von IAB über Investitionen bis Verlustverrechnung mit Live-Berechnung und Ersparnis-Summe.",
    "lead": "Der Pre-Year-End-Check prüft 7 Steuer-Hebel ab November – von IAB bis Spendenabzug – mit Live-Berechnung und Gesamt-Ersparnis.",
    "urgency": "Die meisten Steuer-Hebel funktionieren nur bis zum 31. Dezember – wer im November nicht handelt, lässt die Ersparnis ungenutzt verstreichen. IAB, vorgezogene Investitionen oder Verlustverrechnung sind nach Silvester für das Jahr verloren. Prüf deine Hebel jetzt mit GründerX und sichere dir die Ersparnis, solange du noch kannst.",
    "outcomes": [
      "Du kennst 7 konkrete Hebel, um deine Steuerlast vor Jahresende zu senken",
      "Du siehst per Live-Berechnung, was jeder Hebel dir bringt",
      "Du hast über den Ankreuz-Modus deine gesamte mögliche Ersparnis im Blick",
      "Du gehst rechtzeitig vor dem Jahreswechsel in die Umsetzung"
    ],
    "disclaimer": "Die Berechnungen sind unverbindlich und ersetzen keine individuelle Steuerberatung."
  },
  "iab-rechner": {
    "seoTitle": "IAB-Rechner nach §7g EStG für Gründer",
    "seoDescription": "Berechne deinen Investitionsabzugsbetrag nach §7g EStG bis 200.000 €: Voraussetzungs-Check, 3-Jahres-Auflösungsplan und Live-Steuerersparnis.",
    "lead": "Der IAB-Rechner ermittelt deinen Investitionsabzugsbetrag nach §7g EStG bis 200.000 €, prüft die Voraussetzungen und zeigt die Steuerersparnis.",
    "urgency": "Der Investitionsabzugsbetrag verschiebt Steuerlast in die Zukunft und gibt dir heute Liquidität für Investitionen – wer ihn nicht nutzt, verschenkt diesen Vorteil. Werden Gewinngrenzen oder die 3-Jahres-Frist übersehen, droht die teure Rückabwicklung. Rechne deinen IAB jetzt sauber mit GründerX durch.",
    "outcomes": [
      "Du kennst deinen möglichen IAB bis zu 200.000 € nach §7g EStG",
      "Du prüfst per Check, ob du die Gewinn- bzw. Bilanzgrenzen einhältst",
      "Du siehst deine Live-Steuerersparnis und den 3-Jahres-Auflösungsplan",
      "Du planst die Hinzurechnung bei Investition von Anfang an mit ein"
    ],
    "disclaimer": "Die Berechnung ist eine Orientierungshilfe und ersetzt keine individuelle Steuerberatung."
  },
  "kfz-optimizer": {
    "seoTitle": "Firmenwagen versteuern: 1%-Regel oder Fahrtenbuch",
    "seoDescription": "1%-Regel vs. Fahrtenbuch live durchgerechnet, inkl. E-Auto- und Hybrid-Bonus. Finde heraus, welche Methode dir 2026 echtes Geld spart.",
    "lead": "Der Kfz-Versteuerung-Optimizer rechnet 1%-Regel und Fahrtenbuch für deinen Firmenwagen side-by-side durch und sagt dir, welche Methode günstiger ist. Für Gründer und Selbstständige mit Dienstwagen.",
    "urgency": "Die meisten Unternehmer zahlen Jahr für Jahr zu viel, weil sie blind die 1%-Regel nehmen. Bei E-Autos und Hybriden liegt oft Hunderte Euro Differenz pro Monat zwischen den Methoden. Rechne es einmal sauber durch, bevor das Steuerjahr durch ist, und triff deine Wahl mit GründerX auf Basis echter Zahlen.",
    "outcomes": [
      "Klare Empfehlung, ob 1%-Regel oder Fahrtenbuch für dich günstiger ist",
      "E-Auto- und Hybrid-Bonus (0,25 % / 0,5 %) korrekt eingerechnet",
      "Pendlerpauschale-Anrechnung transparent ausgewiesen",
      "Side-by-Side-Vergleich beider Methoden in Euro"
    ],
    "disclaimer": "Dieses Tool liefert eine Orientierungsrechnung und ersetzt keine individuelle Steuerberatung."
  },
  "reisekosten": {
    "seoTitle": "Reisekosten & Verpflegungspauschale 2026 berechnen",
    "seoDescription": "Reisekosten mit Verpflegungspauschalen 2026 für 35+ Länder, Kfz-Kilometer und 70 % Bewirtung erfassen. Hol dir jede absetzbare Position zurück.",
    "lead": "Der Reisekosten- und Bewirtungs-Logger erfasst Dienstreisen mit aktuellen Verpflegungspauschalen 2026 für In- und Ausland sowie Bewirtungsbelege. Für alle, die geschäftlich unterwegs sind und nichts liegenlassen wollen.",
    "urgency": "Jede vergessene Reise und jeder unsauber erfasste Bewirtungsbeleg ist bares Geld, das du dem Finanzamt schenkst. Verpflegungspauschalen und der 70-%-Bewirtungsabzug summieren sich übers Jahr schnell auf vierstellige Beträge. Logge deine Reisen laufend mit GründerX, statt am Jahresende zu raten.",
    "outcomes": [
      "Verpflegungspauschalen 2026 für DE und 35+ Länder automatisch zugeordnet",
      "Kfz-Kilometer mit 0,30 €/km sauber abgerechnet",
      "Bewirtung als 70 % Betriebsausgabe mit voller Vorsteuer erfasst",
      "Saubere Aufstellung als Beleg für deine Buchhaltung"
    ],
    "disclaimer": "Die Berechnung dient der Vorbereitung und ersetzt keine steuerliche Beratung im Einzelfall."
  },
  "salary-vs-dividende": {
    "seoTitle": "GmbH: Gehalt oder Dividende? Steuer-Optimizer 2026",
    "seoDescription": "GF-Gehalt vs. Ausschüttung mit echter Steuer 2026 (KSt, GewSt, SolZ, Abgeltung, TEV) durchgerechnet. Finde die günstigste Entnahme aus deiner GmbH.",
    "lead": "Der Salary-vs-Dividende-Optimizer vergleicht Geschäftsführergehalt und Gewinnausschüttung mit echter Steuerberechnung 2026 über mehrere Szenarien. Für GmbH-Gesellschafter, die ihre Entnahme steuerlich klug aufteilen wollen.",
    "urgency": "Ob du dich über Gehalt oder Ausschüttung bezahlst, entscheidet über Tausende Euro Steuer- und SV-Last pro Jahr. Die meisten GF wählen aus dem Bauch und verschenken den optimalen Mix. Spiel deine fünf Gehalts-Szenarien einmal sauber mit GründerX durch, bevor du die nächste Entnahme festlegst.",
    "outcomes": [
      "Steuerlast für Gehalt vs. Ausschüttung in Euro gegenübergestellt",
      "KSt 15 % + GewSt + SolZ vs. Abgeltung 25 % / TEV 60 % berechnet",
      "Fünf Gehalts-Szenarien auf einen Blick verglichen",
      "SV-Pflicht-Toggle für beherrschende Geschäftsführer berücksichtigt"
    ],
    "disclaimer": "Das Tool zeigt eine modellhafte Berechnung und ersetzt keine individuelle Steuer- oder Rechtsberatung."
  },
  "crypto-steuer": {
    "seoTitle": "Krypto-Steuer 2026: FIFO-Gewinne & Haltefrist",
    "seoDescription": "Krypto-Veräußerungsgewinne per FIFO berechnen, 1-Jahres-Haltefrist und 1.000-€-Freigrenze (§23 EStG) prüfen. CSV-Export für deinen Steuerberater.",
    "lead": "Das Crypto-Steuer-Modul berechnet deine Veräußerungsgewinne pro Trade nach FIFO, erkennt die Haltefrist und prüft die Freigrenze. Für Gründer und Anleger, die ihre Krypto-Trades steuerlich sauber aufstellen wollen.",
    "urgency": "Das Finanzamt schaut bei Krypto immer genauer hin, und falsch berechnete Gewinne können teuer werden. Wer die 1-Jahres-Haltefrist und die 1.000-€-Freigrenze übersieht, zahlt zu viel oder riskiert Nachfragen. Rechne deine Trades sauber per FIFO mit GründerX durch und geh mit klaren Zahlen zum Steuerberater.",
    "outcomes": [
      "Veräußerungsgewinn pro Trade nach FIFO berechnet",
      "1-Jahres-Haltefrist automatisch erkannt und markiert",
      "Freigrenze 1.000 € nach §23 EStG geprüft",
      "Sauberer CSV-Export für deinen Steuerberater"
    ],
    "disclaimer": "Die Berechnung ist eine Vorbereitungshilfe und ersetzt keine steuerliche Beratung."
  },
  "pension": {
    "seoTitle": "Rürup, bAV, Riester oder ETF? Altersvorsorge-Check",
    "seoDescription": "Rürup, bAV, Riester und ETF mit NPV-Diskontierung 2026 vergleichen. Finde heraus, welches Vehikel für deine Altersvorsorge wirklich rechnet.",
    "lead": "Der Rürup/bAV/Riester-Optimizer stellt vier Vorsorge-Vehikel inklusive ETF mit NPV-Diskontierung gegenüber. Für Selbstständige und Gründer, die ihre Altersvorsorge auf Zahlenbasis statt aus dem Bauch wählen wollen.",
    "urgency": "Bei der Altersvorsorge entscheiden kleine Unterschiede in Steuerwirkung und Rendite über Zehntausende Euro bis zur Rente. Wer ohne Vergleich abschließt, bindet sich oft jahrzehntelang ans falsche Vehikel. Rechne Rürup, bAV, Riester und ETF einmal sauber gegeneinander mit GründerX, bevor du unterschreibst.",
    "outcomes": [
      "Vier Vorsorge-Vehikel mit NPV-Diskontierung direkt verglichen",
      "Rürup-Höchstbetrag und bAV-Förderrahmen 2026 eingerechnet",
      "bAV-KV-Freibetrag von 197,75 €/Monat berücksichtigt",
      "Hinweis auf die Riester-Reform ab 2027 inklusive"
    ],
    "disclaimer": "Das Tool liefert keine Anlage- oder Versicherungsberatung, sondern eine modellhafte Orientierung."
  },
  "kv-optimizer": {
    "seoTitle": "Krankenkasse wechseln & sparen: GKV/PKV-Check 2026",
    "seoDescription": "GKV-Zusatzbeiträge 2026 vergleichen und PKV-Hebel (§204 Tarifwechsel) prüfen. Finde dein Sparpotenzial und den richtigen Wechsel-Zeitpunkt.",
    "lead": "Der Krankenkassen-Spar-Optimizer vergleicht GKV-Zusatzbeiträge 2026 und zeigt PKV-Sparhebel sowie den GKV-PKV-Wechsel-Check. Für Selbstständige und Gründer, die ihre Krankenversicherung gezielt günstiger machen wollen.",
    "urgency": "Zwischen der teuersten und günstigsten Kasse liegen 2026 über zwei Beitragspunkte, das sind oft mehrere Hundert Euro pro Jahr. Auch in der PKV verschenken viele Geld, weil sie den Tarifwechsel nach §204 VVG nie prüfen. Check dein Sparpotenzial jetzt mit GründerX, statt den teuren Tarif weiterlaufen zu lassen.",
    "outcomes": [
      "GKV-Zusatzbeiträge 2026 verglichen und Sparpotenzial pro Jahr beziffert",
      "PKV-Hebel über §204-Tarifwechsel und Selbstbehalt aufgezeigt",
      "Wechsel-Check GKV ↔ PKV mit JAEG-Grenze 77.400 €",
      "Konkrete Ersparnis als jährlicher Eurobetrag"
    ],
    "disclaimer": "Das Tool ersetzt keine Versicherungsberatung und prüft keine individuellen Tarifbedingungen."
  },
  "quartal-schaetzung": {
    "seoTitle": "Steuervorauszahlung berechnen: Quartals-Schätzung",
    "seoDescription": "ESt, KSt, GewSt und SolZ für Q1-Q4 schätzen, Termine 10.3/10.6/10.9/10.12 im Blick. Plane deine Rücklage und vermeide Nachzahlungs-Schocks.",
    "lead": "Die Quartals-Steuerschätzung berechnet deine Vorauszahlungen für ESt, KSt, GewSt und SolZ über alle vier Quartale samt Cashflow-Plan. Für Gründer und Unternehmer, die ihre Steuertermine ohne Liquiditätsschock managen wollen.",
    "urgency": "Steuervorauszahlungen treffen viele Unternehmer unvorbereitet und reißen Löcher in die Liquidität. Wer keine Rücklage bildet und Anpassungsanträge verpasst, zahlt entweder drauf oder verschenkt Cash an zu hohe Vorauszahlungen. Plane deine Quartale jetzt mit GründerX, statt von jedem Termin überrascht zu werden.",
    "outcomes": [
      "Vorauszahlungen für ESt, KSt, GewSt und SolZ je Quartal berechnet",
      "Echte Termine 10.3 / 10.6 / 10.9 / 10.12 fest im Blick",
      "Soll-Ist-Abgleich gegen bisherige Vorauszahlung",
      "Cashflow-Plan mit empfohlener 30-%-Rücklage"
    ],
    "disclaimer": "Die Schätzung dient der Liquiditätsplanung und ersetzt keine steuerliche Beratung."
  },
  "amazon-erstattungen": {
    "seoTitle": "Amazon Erstattungen automatisch zurückholen",
    "seoDescription": "Verlorene FBA-Ware, Wareneingangs-Differenzen & unterbezahlte Erstattungen automatisch als Amazon-Cases mit KI-Antworten zurückholen. Gewinn wie in Sellerboard.",
    "lead": "Amazon erstattet verlorene Ware, Wareneingangs-Differenzen und beschädigte Retouren nur selten von allein. Diese Seller-Automation spürt jeden erstattungsfähigen Fall auf und reicht ihn als fertigen Amazon-Case mit KI-Antwort ein – umgesetzt in unserem Tool Arbitragex.",
    "urgency": "Den meisten Amazon-Sellern entgehen laufend 1–3 % vom Umsatz: verlorene FBA-Ware, nicht verbuchte Wareneingänge, beschädigte Retouren und unterbezahlte Erstattungen. Von Hand findet das kaum jemand, und Amazons Erstattungsfristen laufen unbemerkt ab. Ein vollautomatischer Case-Poller holt dieses Geld zurück, während du dich aufs Verkaufen konzentrierst.",
    "outcomes": [
      "Verlorene und beschädigte FBA-Ware, Wareneingangs-Differenzen und unterbezahlte Erstattungen automatisch aufgespürt",
      "Fertige Amazon-Cases inklusive KI-Antworten auf Rückfragen – du prüfst nur",
      "Ein vollautomatischer Case-Poller, der laufend neue Erstattungsfälle einreicht",
      "Gewinn, Bestand und Erstattungen in einem Dashboard wie in Sellerboard"
    ],
    "disclaimer": "Die Erstattungs-Automation läuft in unserem Seller-Tool Arbitragex (arbitrage.anwaltx.de). Höhe und Genehmigung einzelner Erstattungen entscheidet allein Amazon – Ergebnisse können abweichen."
  },
  "amazon-parser": {
    "seoTitle": "Amazon Settlement Report buchen: SKR03/04-Parser",
    "seoDescription": "Amazon-Settlement-CSV automatisch nach Fee-Typ aufsplitten und auf SKR03/04 mappen, über 130+ Buchungs-Codes. CSV-Export für den Steuerberater.",
    "lead": "Der Amazon-Settlement-Parser zerlegt deine Settlement-CSV automatisch nach Fee-Typ und mappt jede Position auf SKR03/04. Für Amazon-Seller, die ihre Auszahlungen sauber und schnell in die Buchhaltung bekommen.",
    "urgency": "Amazon-Settlements manuell aufzudröseln kostet Stunden und führt regelmäßig zu Buchungsfehlern bei den über 130 Fee-Typen. Jeder falsch zugeordnete Posten verzerrt deine Marge und kann beim Steuerberater teuren Mehraufwand verursachen. Lass deine Reports automatisch parsen mit GründerX, statt CSV-Zeilen von Hand zu sortieren.",
    "outcomes": [
      "Settlement-CSV automatisch pro Fee-Typ aufgesplittet",
      "Jede Position auf SKR03/04 gemappt über 130+ Amazon-Codes",
      "Saubere Buchungsvorlage statt manuellem CSV-Wühlen",
      "Fertiger CSV-Export für deinen Steuerberater"
    ],
    "disclaimer": "Das Mapping ist eine Buchhaltungshilfe und ersetzt keine Prüfung durch deinen Steuerberater."
  },
  "datev-mapping": {
    "seoTitle": "Bank-CSV zu DATEV: Auto-Mapper für Lexoffice",
    "seoDescription": "Bank-CSV mit 30+ Auto-Regeln (Amazon, Stripe, PayPal, Ads, RC §13b) automatisch kontieren. Direkter Lexoffice- und DATEV-Export spart Stunden.",
    "lead": "Der DATEV/Lexoffice Auto-Mapper kontiert deine Bank-CSV über 30+ Auto-Regeln für gängige Zahlungs- und Plattformdienste inklusive Reverse-Charge. Für Gründer, die ihre Buchhaltung ohne stundenlanges Zuordnen erledigen wollen.",
    "urgency": "Jede Buchungszeile von Hand zu kontieren frisst Zeit, die du im Business besser nutzt, und Reverse-Charge bei Stripe, Meta oder AWS wird leicht falsch gebucht. Solche Fehler kosten beim Steuerberater Geld und nerven bei der Prüfung. Lass deine Bank-CSV automatisch zuordnen mit GründerX und exportier direkt nach DATEV oder Lexoffice.",
    "outcomes": [
      "Bank-CSV über 30+ Regeln automatisch kontiert",
      "Amazon, Stripe, PayPal, Klarna, Shopify, AWS und Ads erkannt",
      "Reverse-Charge nach §13b automatisch berücksichtigt",
      "Direkter Export für Lexoffice und DATEV"
    ],
    "disclaimer": "Die automatische Kontierung ist eine Hilfe und ersetzt keine fachliche Prüfung durch deinen Steuerberater."
  },
  "amazon-ust": {
    "seoTitle": "Amazon Umsatzsteuer EU & US: Buchungs-Lookup",
    "seoDescription": "Amazon-USt für 6 Konstellationen (DE, EU §13b, FBA/OSS, US, UK) mit Konten, Steuerschlüsseln und Pflicht-Registrierungen. Buche international korrekt.",
    "lead": "Das Amazon-USt-Lookup zeigt dir für sechs typische EU- und US-Konstellationen die richtigen Konten, Steuerschlüssel und Registrierungspflichten. Für Amazon-Seller, die international verkaufen und umsatzsteuerlich sauber bleiben wollen.",
    "urgency": "Umsatzsteuer bei Amazon ist über Ländergrenzen ein Minenfeld, von Reverse-Charge auf Provisionen bis zu FBA-Lagern mit OSS-Pflicht. Wer hier falsch bucht oder eine Registrierung verpasst, riskiert Nachzahlungen und Sperren. Schlag deine Konstellation jetzt mit GründerX nach, bevor das nächste Quartal abgeschlossen ist.",
    "outcomes": [
      "Sechs EU- und US-Konstellationen mit korrekten Konten",
      "Passende Steuerschlüssel inklusive §13b Reverse-Charge",
      "Pflicht-Registrierungen pro Land klar benannt",
      "Klarheit zu FBA-Lager, OSS und US-Marketplace-Facilitator"
    ],
    "disclaimer": "Das Lookup dient der Orientierung und ersetzt keine umsatzsteuerliche Beratung im Einzelfall."
  },
  "stripe-parser": {
    "seoTitle": "Stripe Payout buchen: CSV-Parser mit SKR03/04",
    "seoDescription": "Stripe-Payout-CSV nach Verkäufen, Fees, Refunds und Chargebacks aufsplitten und auf SKR03/04 mappen. CSV-Export für eine saubere Buchhaltung.",
    "lead": "Der Stripe-Payout-Parser zerlegt deine Auszahlungs-CSV in Verkäufe, Fees, Refunds, Chargebacks und Trinkgelder und mappt sie auf SKR03/04. Für alle, die über Stripe abrechnen und ihre Payouts sauber verbuchen wollen.",
    "urgency": "Stripe-Payouts bündeln Verkäufe, Gebühren und Rückbuchungen in eine Summe, die du beim Buchen erst auseinandernehmen musst. Wer das ungenau macht, verzerrt Umsatz und Gewinn und ärgert sich beim Jahresabschluss. Lass deine Payout-CSV automatisch aufsplitten mit GründerX, statt jede Auszahlung von Hand zu zerlegen.",
    "outcomes": [
      "Payout-CSV nach Verkäufen, Fees und Refunds aufgesplittet",
      "Chargebacks und Trinkgelder sauber getrennt ausgewiesen",
      "Jede Position auf SKR03/04 gemappt",
      "Fertiger CSV-Export für die Buchhaltung"
    ],
    "disclaimer": "Der Parser ist eine Buchhaltungshilfe und ersetzt keine Prüfung durch deinen Steuerberater."
  },
  "marge-tracker": {
    "seoTitle": "Marge pro Kanal tracken: Multi-Channel-Rechner",
    "seoDescription": "Marge und ROAS pro SKU über 7 Kanäle (Shopify, Amazon, eBay, Otto) mit Provisionen, Payment-Fees und Retouren berechnen. Erkenne Verlust-Produkte sofort.",
    "lead": "Der Multi-Channel-Marge-Tracker berechnet Marge und ROAS pro SKU und Kanal über sieben Marktplätze inklusive Provisionen, Payment-Fees und Retouren. Für E-Commerce-Gründer, die wissen wollen, womit sie wirklich verdienen.",
    "urgency": "Auf jedem Kanal fressen andere Provisionen, Payment-Fees und Retouren deine Marge, und ohne Überblick verkaufst du womöglich mit Verlust. Produkte, die auf Shopify rentabel sind, können bei Amazon FBA tief im Minus liegen. Rechne deine echte Marge pro Kanal mit GründerX durch, bevor du dein Budget in den falschen Kanal pumpst.",
    "outcomes": [
      "Marge und ROAS pro SKU und Kanal auf einen Blick",
      "Kanal-spezifische Provisionen und Payment-Fees eingerechnet",
      "Werbekosten und Retouren-Quote pro Kanal berücksichtigt",
      "Sieben Kanäle von Shopify bis Etsy direkt vergleichbar"
    ],
    "disclaimer": "Die Berechnung hängt von deinen Eingaben ab und ersetzt keine betriebswirtschaftliche Beratung."
  },
  "bwa": {
    "seoTitle": "Bank-taugliche BWA erstellen: Kennzahlen & Score",
    "seoDescription": "Bankfeste BWA 2026 mit Net Debt/EBITDA, DSCR, FCF und ROCE plus branchen-adjustierten Benchmarks. Geh mit überzeugenden Zahlen ins Bankgespräch.",
    "lead": "Der BWA-Generator erstellt eine bankfeste BWA 2026 mit den entscheidenden Kennzahlen und branchen-adjustierten Benchmarks. Für Gründer und Unternehmer, die Kredit- oder KfW-Gespräche mit belastbaren Zahlen führen wollen.",
    "urgency": "Banken entscheiden über deinen Kredit anhand von Kennzahlen wie DSCR und Net Debt/EBITDA, die in einer normalen BWA gar nicht auftauchen. Wer unvorbereitet ins Gespräch geht, wirkt schwach und riskiert schlechtere Konditionen. Erstelle deine bankfeste BWA mit GründerX, bevor du den nächsten Finanzierungstermin hast.",
    "outcomes": [
      "BWA mit Net Debt/EBITDA, DSCR, FCF und ROCE",
      "Branchen-adjustierte Benchmarks nach Basel IV / KfW",
      "Score nur bei plausibler Datenlage, ehrlich statt geschönt",
      "YoY-Vergleich plus Bilanz- und Cashflow-Sicht"
    ],
    "disclaimer": "Die BWA dient der Vorbereitung und ersetzt keine Beratung durch Steuerberater oder Bank."
  },
  "datev-export": {
    "seoTitle": "Steuerberater-Übergabe: alle Unterlagen sauber bündeln",
    "seoDescription": "Übergib deinem Steuerberater alles in einem Bundle: 30+ Pflicht-Posten, Manifest-PDF mit Mandantendaten und fertiger E-Mail. Spar dir das Hin und Her.",
    "lead": "Stellt dir ein vollständiges Übergabe-Bundle für den Steuerberater zusammen: über 30 Pflicht-Posten in fünf Gruppen, eine Manifest-PDF mit Mandantendaten und Periode plus E-Mail-Helper mit fertigem Body. Für Gründer, E-Commerce und Solo-Selbstständige, die ihren Jahresabschluss oder die monatliche Übergabe stressfrei abwickeln wollen.",
    "urgency": "Jede Rückfrage deines Steuerberaters kostet dich Zeit und manchmal extra Honorar. Wenn Belege fehlen oder unsortiert ankommen, zieht sich die Buchhaltung und du zahlst doppelt. Stell dein Übergabe-Bundle jetzt mit GründerX zusammen und gib alles auf einmal sauber raus.",
    "outcomes": [
      "Eine Checkliste mit 30+ Posten in fünf klaren Gruppen, nichts vergessen",
      "Eine Manifest-PDF mit Mandantendaten, Periode und allen Anhängen",
      "Eine fertige Übergabe-E-Mail, die du nur noch abschicken musst",
      "Weniger Rückfragen und schnellere Bearbeitung durch den Steuerberater",
      "Ein wiederholbarer Ablauf für jede Periode statt jedes Mal Chaos"
    ],
    "disclaimer": "Dieses Tool ist eine Organisationshilfe und ersetzt keine Steuerberatung; die fachliche Prüfung deiner Unterlagen bleibt bei deinem Steuerberater."
  },
  "geschaeftskreditkarten": {
    "seoTitle": "Geschäftskreditkarten-Vergleich für Gründer & Solo",
    "seoDescription": "Vergleiche 12 Geschäftskreditkarten und Spend-Cards: SCHUFA-frei, Solo ab Tag 1, native DATEV, 0-Euro-Einstieg. Finde die passende Karte in Minuten.",
    "lead": "Vergleicht 12 Geschäftskreditkarten und Spend-Cards von Amex über Qonto, Pleo und Moss bis Revolut, Wise und Finom, gefiltert nach deinem Gründer-Typ. Für alle, die SCHUFA-frei, als Solo ab Tag 1, mit nativer DATEV-Anbindung oder zum 0-Euro-Einstieg starten wollen.",
    "urgency": "Ohne passende Geschäftskarte bezahlst du privat vor, vermischst die Buchhaltung und verschenkst Cashback und Zahlungsziele. Die falsche Karte kostet dich später Umstellungsaufwand und vielleicht eine SCHUFA-Ablehnung mitten in der Gründung. Filter jetzt mit GründerX nach deinem Typ und finde die Karte, die wirklich passt.",
    "outcomes": [
      "Eine gefilterte Shortlist statt 12 unübersichtlicher Anbieterseiten",
      "Klarheit, welche Karten SCHUFA-frei oder als Solo ab Tag 1 verfügbar sind",
      "Übersicht über native DATEV-Anbindung und 0-Euro-Einstiege",
      "Vergleich von Gebühren, Limits und Funktionen auf einen Blick",
      "Eine fundierte Entscheidung, ohne dich durch jedes Kleingedruckte zu lesen"
    ],
    "disclaimer": "Die Angaben dienen der Orientierung und ersetzen keine Finanzberatung; Konditionen und Verfügbarkeit prüfst du final beim jeweiligen Anbieter."
  },
  "brand-check": {
    "seoTitle": "Markenname-Check: Marke, Domain & Social live prüfen",
    "seoDescription": "Prüfe deinen Markennamen in einem Klick: DPMA & EUIPO, 8 Domain-TLDs, 5 Social-Handles und Apple App Store. Sieh sofort, ob dein Name noch frei ist.",
    "lead": "Prüft deinen Wunschnamen in einem Klick gegen DPMA und EUIPO über TMView, 8 Domain-Endungen, 5 Social-Handles und den Apple App Store. Für Gründer und Creator, die wissen wollen, ob ihr Markenname überall noch frei ist, bevor sie loslegen.",
    "urgency": "Ein Name, der woanders schon registriert ist, kann dich später Abmahnungen, Rebranding und verlorene Reichweite kosten. Je länger du wartest, desto wahrscheinlicher schnappt sich jemand die Domain oder das Social-Handle. Mach jetzt den Live-Check mit GründerX, bevor du Geld in einen Namen steckst, der nicht frei ist.",
    "outcomes": [
      "Sofortige Marken-Treffer aus DPMA und EUIPO über TMView",
      "Verfügbarkeit von 8 Domain-Endungen auf einen Blick",
      "Check von 5 Social-Handles für IG, TikTok, YouTube, X und GitHub",
      "App-Store-Abgleich, ob dein Name als App schon belegt ist",
      "Eine klare Grundlage für die Namensentscheidung statt blindes Raten"
    ],
    "disclaimer": "Der Check zeigt nur identische und naheliegende Treffer und ersetzt keine markenrechtliche Beratung oder Ähnlichkeitsrecherche durch eine Fachperson."
  },
  "dpma-wizard": {
    "seoTitle": "DPMA Markenanmeldung: Wizard mit Klassen & Kosten",
    "seoDescription": "Melde deine Marke beim DPMA an: Wizard mit Nizza-Klassen-Empfehlung nach Branche, Live-Kostenrechner und Direktlink zur offiziellen Anmeldung.",
    "lead": "Führt dich Schritt für Schritt durch die Markenanmeldung beim DPMA, mit branchenbasierter Empfehlung der Nizza-Klassen, Live-Kostenrechner und Direktlink zur offiziellen Anmeldung. Für Gründer, die ihre Marke selbst anmelden wollen, ohne sich vorher durch Amtsformulare zu kämpfen.",
    "urgency": "Wer ohne Schutz startet, riskiert, dass ein anderer dieselbe Marke anmeldet und dir die Nutzung verbietet. Falsch gewählte Nizza-Klassen kosten dich später eine Nachanmeldung samt neuer Gebühren. Geh jetzt mit dem Wizard von GründerX durch und melde deine Marke richtig vorbereitet an.",
    "outcomes": [
      "Eine branchenpassende Empfehlung, welche Nizza-Klassen du brauchst",
      "Ein Live-Kostenrechner, der dir die Anmeldegebühren sofort zeigt",
      "Schritt-für-Schritt-Führung statt undurchsichtiger Amtsformulare",
      "Den Direktlink zur offiziellen DPMA-Anmeldung an der richtigen Stelle",
      "Sicherheit, alle Pflichtangaben vor dem Absenden geprüft zu haben"
    ],
    "disclaimer": "Der Wizard ist eine Ausfüllhilfe und ersetzt keine Rechtsberatung; die Klassenwahl und der Schutzumfang liegen in deiner Verantwortung."
  },
  "marken-monitor": {
    "seoTitle": "Markenüberwachung: neue Anmeldungen sofort erkennen",
    "seoDescription": "Überwache deine Marken mit Watchlist und Recheck-Button. Diff-Alert zeigt dir neue Anmeldungen seit der letzten Prüfung, bevor sie zum Problem werden.",
    "lead": "Legt deine Marken auf eine Watchlist und meldet per Diff-Alert, welche neuen Anmeldungen seit deiner letzten Prüfung dazugekommen sind, manuell auslösbar per Recheck-Button. Für Markeninhaber, die kollidierende Anmeldungen früh erkennen wollen.",
    "urgency": "Eine Marke ist nur so viel wert, wie du sie verteidigst. Bemerkst du eine ähnliche Anmeldung zu spät, verstreicht die Widerspruchsfrist und der Schutz deiner Marke bröckelt. Setz deine Marken jetzt mit GründerX auf die Watchlist und erkenne neue Anmeldungen, solange du noch handeln kannst.",
    "outcomes": [
      "Eine zentrale Watchlist für alle deine Marken",
      "Ein Recheck-Button, der den Abgleich auf Knopfdruck startet",
      "Diff-Alerts, die nur neue Anmeldungen seit der letzten Prüfung zeigen",
      "Frühe Sichtbarkeit von potenziell kollidierenden Marken",
      "Mehr Reaktionszeit, um auf Anmeldungen reagieren zu können"
    ],
    "disclaimer": "Die Überwachung dient der Information und ersetzt keine markenrechtliche Beratung; ob ein Widerspruch sinnvoll ist, klärst du mit einer Fachperson."
  },
  "vergleich-versand-de": {
    "seoTitle": "Versanddienstleister DACH vergleichen: DHL, DPD, GLS",
    "seoDescription": "Vergleiche DHL, DPD, GLS, Hermes und UPS für deinen Versand in DACH. Finde Konditionen und passenden Anbieter, ohne fünf Angebote einzeln zu prüfen.",
    "lead": "Stellt die DACH-Versanddienstleister DHL, DPD, GLS, Hermes und UPS gegenüber, damit du den passenden Anbieter für dein Versandvolumen findest. Für E-Commerce-Gründer und Shopbetreiber, die ihre Versandkosten im Griff behalten wollen.",
    "urgency": "Versandkosten fressen bei jedem Paket an deiner Marge, und der falsche Anbieter macht das schnell teuer. Wer einfach beim erstbesten bleibt, zahlt oft Monat für Monat zu viel. Vergleich jetzt mit GründerX die DACH-Dienstleister und such dir den, der zu deinem Volumen passt.",
    "outcomes": [
      "DHL, DPD, GLS, Hermes und UPS direkt nebeneinander",
      "Klarheit über Konditionen und Leistungen je Anbieter",
      "Eine Entscheidungsgrundlage passend zu deinem Versandvolumen",
      "Weniger Zeitaufwand als fünf einzelne Anbieterseiten zu prüfen",
      "Eine bessere Verhandlungsbasis für deine Versandverträge"
    ],
    "disclaimer": "Die Übersicht dient der Orientierung; verbindliche Preise und Konditionen erhältst du im individuellen Angebot des jeweiligen Dienstleisters."
  },
  "vergleich-versand-int": {
    "seoTitle": "Internationaler Versand: Sendcloud, Easyship, ShipBob",
    "seoDescription": "Vergleiche Sendcloud, Easyship und ShipBob für deinen internationalen Versand. Finde die Plattform, die zu deinem Cross-Border-Geschäft passt.",
    "lead": "Vergleicht die Versandplattformen Sendcloud, Easyship und ShipBob für den internationalen Versand, damit du Cross-Border-Sendungen effizient abwickelst. Für E-Commerce-Gründer, die über die DACH-Grenzen hinaus verkaufen.",
    "urgency": "Internationaler Versand ist ein Wachstumshebel, aber komplex: Zoll, Tracking und Retouren werden mit der falschen Plattform schnell zum Kostentreiber. Wer hier improvisiert, verliert Kunden an langsame oder teure Lieferungen. Vergleich jetzt mit GründerX die Plattformen und bau deinen Auslandsversand sauber auf.",
    "outcomes": [
      "Sendcloud, Easyship und ShipBob im direkten Vergleich",
      "Übersicht, welche Plattform welche Märkte und Carrier abdeckt",
      "Klarheit über Funktionen wie Label-Erstellung und Tracking",
      "Eine Grundlage, um Cross-Border-Versand planbar zu machen",
      "Weniger Risiko, dich für die falsche Plattform zu entscheiden"
    ],
    "disclaimer": "Die Angaben dienen der Orientierung; konkrete Tarife, Carrier und Zollabwicklung prüfst du final beim jeweiligen Anbieter."
  },
  "vergleich-buchhaltung": {
    "seoTitle": "Buchhaltungssoftware vergleichen: Lexoffice, sevDesk",
    "seoDescription": "Vergleiche Lexoffice, sevDesk, DATEV und Candis für deine Buchhaltung. Finde das Tool, das zu deinem Geschäft und Steuerberater passt.",
    "lead": "Stellt die Buchhaltungslösungen Lexoffice, sevDesk, DATEV und Candis gegenüber, damit du das passende Tool für deine Buchhaltung findest. Für Gründer und Solo-Selbstständige, die ihre Belege und Rechnungen sauber im Griff haben wollen.",
    "urgency": "Buchhaltung mit dem falschen Tool bedeutet Doppelarbeit, Medienbrüche und teure Übergaben an den Steuerberater. Je länger du beim falschen System bleibst, desto aufwendiger wird später der Wechsel. Vergleich jetzt mit GründerX die Optionen und richte deine Buchhaltung von Anfang an passend ein.",
    "outcomes": [
      "Lexoffice, sevDesk, DATEV und Candis nebeneinander",
      "Klarheit, welches Tool zu deinem Steuerberater-Setup passt",
      "Übersicht über Funktionen wie Belegerfassung und DATEV-Anbindung",
      "Eine Entscheidungsgrundlage statt vier einzelner Testphasen",
      "Weniger Risiko, später aufwendig das System wechseln zu müssen"
    ],
    "disclaimer": "Die Übersicht ist eine Orientierungshilfe und ersetzt keine Steuerberatung; welches Tool zu deiner Buchführungspflicht passt, klärst du mit deinem Steuerberater."
  },
  "vergleich-banking-de": {
    "seoTitle": "Geschäftskonto DE vergleichen: Holvi, Qonto, Finom",
    "seoDescription": "Vergleiche Holvi, Qonto, Finom und Vivid als Geschäftskonto in Deutschland. Finde das Konto mit den passenden Konditionen für deine Gründung.",
    "lead": "Vergleicht die deutschen Geschäftskonten Holvi, Qonto, Finom und Vivid, damit du das Konto mit den passenden Konditionen findest. Für Gründer und Solo-Selbstständige, die ihr Geschäft sauber vom Privaten trennen wollen.",
    "urgency": "Ohne eigenes Geschäftskonto vermischst du privat und geschäftlich und machst dir Buchhaltung und Steuer unnötig schwer. Das falsche Konto kostet dich später Gebühren oder einen mühsamen Wechsel mit neuer IBAN. Vergleich jetzt mit GründerX und eröffne das Konto, das zu deiner Gründung passt.",
    "outcomes": [
      "Holvi, Qonto, Finom und Vivid im direkten Vergleich",
      "Übersicht über Kontogebühren, Karten und Limits",
      "Klarheit, welches Konto sich für deine Rechtsform eignet",
      "Eine schnelle Entscheidung statt vier Kontoeröffnungen zum Test",
      "Eine saubere Trennung von privat und geschäftlich ab Tag 1"
    ],
    "disclaimer": "Die Angaben dienen der Orientierung und ersetzen keine Finanzberatung; Konditionen und Eröffnungsvoraussetzungen prüfst du beim jeweiligen Anbieter."
  },
  "vergleich-banking-us": {
    "seoTitle": "US Business Banking: Mercury, Wise, Relay, Brex",
    "seoDescription": "Vergleiche Mercury, Wise, Relay und Brex für dein US-Geschäftskonto. Finde die passende Lösung für deine US-Gründung oder Cross-Border-Zahlungen.",
    "lead": "Vergleicht die US-Geschäftskonten Mercury, Wise, Relay und Brex, damit du die passende Banking-Lösung für dein US-Geschäft findest. Für Gründer mit US-Gesellschaft oder internationalem Zahlungsverkehr.",
    "urgency": "Ein US-Konto entscheidet darüber, ob du USD-Zahlungen sauber empfängst und mit US-Plattformen reibungslos arbeitest. Die falsche Wahl kostet dich Gebühren, Wechselkursverluste oder Probleme bei der Kontoeröffnung als Nicht-US-Person. Vergleich jetzt mit GründerX und finde das US-Banking, das zu deinem Setup passt.",
    "outcomes": [
      "Mercury, Wise, Relay und Brex im direkten Vergleich",
      "Klarheit, welche Lösung für Nicht-US-Gründer zugänglich ist",
      "Übersicht über Gebühren, USD-Handling und Funktionen",
      "Eine Grundlage für sauberen Cross-Border-Zahlungsverkehr",
      "Weniger Risiko bei der Wahl deines US-Geschäftskontos"
    ],
    "disclaimer": "Die Angaben dienen der Orientierung und ersetzen keine Finanz- oder Rechtsberatung; Voraussetzungen für US-Konten klärst du mit dem Anbieter und ggf. einem Berater."
  },
  "vergleich-3pl": {
    "seoTitle": "3PL & Fulfillment vergleichen: Byrd, ShipBob, FromSpace",
    "seoDescription": "Vergleiche Byrd, ShipBob und FromSpace als Fulfillment-Partner. Finde den 3PL, der zu deinem Lager- und Versandvolumen passt.",
    "lead": "Vergleicht die Fulfillment-Dienstleister Byrd, ShipBob und FromSpace, damit du den passenden 3PL-Partner für Lager und Versand findest. Für E-Commerce-Gründer, die Lagerung und Versand auslagern wollen, um zu skalieren.",
    "urgency": "Solange du selbst packst und versendest, ist dein Wachstum durch deine Zeit gedeckelt. Der falsche 3PL bremst dich mit Fehlern, langen Lieferzeiten oder versteckten Lagerkosten. Vergleich jetzt mit GründerX die Fulfillment-Partner und such dir den, mit dem du wirklich skalierst.",
    "outcomes": [
      "Byrd, ShipBob und FromSpace im direkten Vergleich",
      "Übersicht über Standorte, Leistungen und Integrationen",
      "Klarheit, welcher 3PL zu deinem Volumen und deinen Märkten passt",
      "Eine Entscheidungsgrundlage, um Fulfillment sicher auszulagern",
      "Mehr Zeit für Wachstum statt für Lager und Versand"
    ],
    "disclaimer": "Die Übersicht dient der Orientierung; verbindliche Konditionen und Leistungen erhältst du im individuellen Angebot des jeweiligen Dienstleisters."
  },
  "vergleich-lucid": {
    "seoTitle": "LUCID & Verpackungslizenz: Lizenzero, Reclay vergleichen",
    "seoDescription": "Vergleiche Lizenzero, Reclay und BellandVision für deine Verpackungslizenz. Erfülle die LUCID-Pflicht und finde den passenden Anbieter.",
    "lead": "Vergleicht die Verpackungslizenzierer Lizenzero, Reclay und BellandVision, damit du deine Lizenzierungspflicht rund um das LUCID-Register erfüllst und den passenden Anbieter findest. Für alle, die verpackte Ware an Endkunden in Deutschland verschicken.",
    "urgency": "Wer Verpackungen ohne Systembeteiligung in Verkehr bringt, verstößt gegen das Verpackungsgesetz und riskiert Bußgelder und Vertriebsverbote. Das Thema wird gern aufgeschoben, dabei gilt die Pflicht ab dem ersten Paket. Vergleich jetzt mit GründerX die Lizenzierer und werde sauber compliant.",
    "outcomes": [
      "Lizenzero, Reclay und BellandVision im direkten Vergleich",
      "Klarheit über die Kosten der Systembeteiligung je Anbieter",
      "Übersicht, wie die Lizenzierung im LUCID-Kontext abläuft",
      "Eine schnelle Wahl des Anbieters statt langer Recherche",
      "Ein Schritt Richtung Verpackungsgesetz-Konformität"
    ],
    "disclaimer": "Die Übersicht dient der Orientierung und ersetzt keine Rechtsberatung; deine konkreten Pflichten nach dem Verpackungsgesetz prüfst du eigenverantwortlich oder mit einer Fachperson."
  },
  "vergleich-shop": {
    "seoTitle": "Shopsystem vergleichen: Shopify, Shopware, Woo, Headless",
    "seoDescription": "Vergleiche Shopify, Shopware, WooCommerce und Headless für deinen Online-Shop. Finde das Shopsystem, das zu deinem Geschäft und Budget passt.",
    "lead": "Vergleicht die Shopsysteme Shopify, Shopware, WooCommerce und Headless-Setups, damit du die passende Basis für deinen Online-Shop findest. Für E-Commerce-Gründer, die vor der Wahl ihres Shopsystems stehen.",
    "urgency": "Dein Shopsystem ist das Fundament deines Geschäfts und ein späterer Wechsel ist teuer, riskant und kostet oft Rankings und Umsatz. Wer hier vorschnell entscheidet, sitzt jahrelang auf einem System, das nicht mitwächst. Vergleich jetzt mit GründerX die Systeme und bau deinen Shop auf der richtigen Basis.",
    "outcomes": [
      "Shopify, Shopware, WooCommerce und Headless nebeneinander",
      "Klarheit über Kosten, Flexibilität und Pflegeaufwand je System",
      "Übersicht, welches System zu deinem Wachstumsplan passt",
      "Eine fundierte Entscheidung statt teurem Replatforming später",
      "Eine solide technische Basis für deinen Online-Shop"
    ],
    "disclaimer": "Die Angaben dienen der Orientierung; welches System langfristig passt, hängt von deinen individuellen Anforderungen und ggf. der Einschätzung eines Entwicklers ab."
  },
  "vergleich-email": {
    "seoTitle": "E-Mail-Marketing-Tools Vergleich: Klaviyo & Co.",
    "seoDescription": "Klaviyo, Brevo oder ActiveCampaign? Vergleiche die wichtigsten E-Mail-Tools nach Preis, Features & E-Commerce-Eignung – und triff die richtige Wahl.",
    "lead": "Die Anbieter-Vergleichs-Engine stellt Klaviyo, Brevo und ActiveCampaign gegenüber, damit du als Gründer oder Shop-Betreiber das passende E-Mail-Marketing-Tool findest.",
    "urgency": "E-Mail bleibt der profitabelste Kanal im E-Commerce – aber das falsche Tool kostet dich Monat für Monat zu viel und bremst deine Automationen. Je länger du auf der falschen Plattform sitzt, desto teurer wird der spätere Umzug. Vergleiche jetzt mit GründerX und entscheide einmal richtig.",
    "outcomes": [
      "Klaviyo, Brevo und ActiveCampaign nach Preis und Funktionsumfang gegenübergestellt",
      "Klarheit, welches Tool zu deiner Shop-Größe und Listengröße passt",
      "Überblick über Automations-, Segmentierungs- und Deliverability-Stärken",
      "Eine begründete Entscheidung statt wochenlangem Testen"
    ],
    "disclaimer": "Die Vergleichsdaten dienen der Orientierung; prüfe Tarife und Funktionen vor Vertragsabschluss direkt beim Anbieter."
  },
  "vergleich-tracking": {
    "seoTitle": "Tracking-Tools Vergleich: Hyros, Triple Whale & Co.",
    "seoDescription": "Hyros, Triple Whale oder Wicked Reports? Vergleiche die führenden Attribution-Tools für E-Commerce nach Preis, Genauigkeit & Setup-Aufwand.",
    "lead": "Diese Vergleichs-Engine stellt Hyros, Triple Whale und Wicked Reports gegenüber, damit du das richtige Attribution- und Tracking-Tool für deinen Shop wählst.",
    "urgency": "Ohne sauberes Tracking verbrennst du Werbebudget blind – du skalierst Kampagnen, die gar nicht profitabel sind. Jeder Monat mit falscher Attribution bedeutet Fehlentscheidungen im Ad-Spend. Vergleiche jetzt die Tracking-Tools mit GründerX und sieh endlich, was wirklich verkauft.",
    "outcomes": [
      "Hyros, Triple Whale und Wicked Reports direkt gegenübergestellt",
      "Klarheit über Attributionsgenauigkeit, Setup-Aufwand und Kosten",
      "Einschätzung, welches Tool zu deinem Ad-Spend-Level passt",
      "Eine fundierte Wahl, bevor du teuer migrieren musst"
    ],
    "disclaimer": "Die Angaben dienen der Orientierung; Funktionsumfang und Preise prüfst du vor Buchung direkt beim jeweiligen Anbieter."
  },
  "stb-marketplace": {
    "seoTitle": "Steuerberater-Auswahl: E-Com, Crypto & Holding",
    "seoDescription": "Den richtigen Steuerberater finden: Wizard mit 5 Spezialisierungen, Honorar-Ranges, Erst-Termin-Fragen & Red-Flags für E-Com, Crypto & Holding.",
    "lead": "Der StB-Auswahl-Wizard führt dich durch 5 Spezialisierungen – von E-Commerce über Crypto bis Holding und International – mit Pflicht-Knowledge, Honorar-Range und Red-Flags.",
    "urgency": "Ein Steuerberater ohne E-Com- oder Crypto-Erfahrung kann dich teure Fehler kosten – falsche Umsatzsteuer, übersehene Fristen, unnötige Nachzahlungen. Je länger du beim falschen Berater bleibst, desto schwerer wird der Wechsel. Bereite dein Erst-Gespräch jetzt mit GründerX vor und erkenne den richtigen StB.",
    "outcomes": [
      "Die passende Steuerberater-Spezialisierung für dein Geschäftsmodell identifiziert",
      "Konkreter Fragen-Katalog fürs Erstgespräch zum Mitnehmen",
      "Realistische Honorar-Ranges, um Angebote einzuordnen",
      "Red-Flags, an denen du ungeeignete Berater sofort erkennst"
    ],
    "disclaimer": "Dieses Tool ersetzt keine Steuerberatung und vermittelt keine Mandate; es hilft dir, den passenden Berater auszuwählen."
  },
  "ecom-roadmap": {
    "seoTitle": "E-Commerce Brand-Roadmap: Compliance 2026",
    "seoDescription": "Brand launchen in Beauty, Supplement, Electronics & Co.? Kategorie-Roadmap mit DE/EU/US-Compliance-Stack 2026 und den typischen Stolperfallen.",
    "lead": "Die ECom-Brand-Roadmap zeigt dir je nach Kategorie – Beauty, Supplement, Electronics, Toys, Apparel, Food, Pet oder Hardware – den kompletten DE/EU/US-Compliance-Stack 2026.",
    "urgency": "Eine fehlende Registrierung oder Kennzeichnung kann deinen Launch stoppen, bevor er startet – Abmahnungen und gesperrte Amazon-Listings inklusive. Jeder übersehene Compliance-Punkt wird nach dem Launch teurer. Plane deinen Brand-Start jetzt mit der Roadmap von GründerX und gründe rechtssicher.",
    "outcomes": [
      "Kompletter Compliance-Stack für deine Produktkategorie auf einen Blick",
      "Klarheit über DE-, EU- und US-Anforderungen 2026",
      "Frühe Warnung vor den typischen Stolperfallen deiner Kategorie",
      "Eine strukturierte Launch-Checkliste statt Recherche-Chaos"
    ],
    "disclaimer": "Die Roadmap ersetzt keine Rechtsberatung; verbindliche Anforderungen klärst du mit einer Fachperson oder Behörde."
  },
  "lucid-wizard": {
    "seoTitle": "Verpackungslizenz-Rechner LUCID 2026",
    "seoDescription": "LUCID-Verpackungslizenz schnell berechnen: Material-Mengen eingeben, Kostenrange & Anbieter-Empfehlung aus 9 dualen Systemen erhalten. Tarife 2026.",
    "lead": "Der LUCID-Wizard berechnet in 5 Schritten deine Verpackungslizenz-Kosten und empfiehlt dir das passende duale System aus 9 Anbietern – mit Tarifen 2026.",
    "urgency": "Ohne LUCID-Registrierung und Lizenzierung drohen Verkaufsverbote und Bußgelder – und Marktplätze sperren nicht registrierte Händler. Je länger du Mengen ohne Lizenz verschickst, desto höher das Risiko. Berechne deine Verpackungslizenz jetzt mit GründerX und werde sauber compliant.",
    "outcomes": [
      "Konkrete Kostenrange für deine Verpackungslizenz nach Material-Mengen",
      "Empfehlung des passenden dualen Systems aus 9 Anbietern",
      "Aktuelle Tarife 2026 als Kalkulationsgrundlage",
      "Klarheit über deine LUCID-Pflichten vor dem Verkaufsstart"
    ],
    "disclaimer": "Die berechneten Kosten sind Orientierungswerte; den verbindlichen Tarif erhältst du beim gewählten dualen System."
  },
  "ce-rohs": {
    "seoTitle": "CE/RoHS-Konformitätserklärung erstellen (PDF)",
    "seoDescription": "CE- & RoHS-Konformitätserklärung als PDF generieren – für Elektronik, Spielzeug, Maschinen & mehr, inklusive GPSR und Battery-Regulation.",
    "lead": "Der CE/RoHS-Generator erstellt dir die Konformitätserklärung als PDF für 8 Produkt-Kategorien – von Elektronik über Spielzeug bis Wearable, inklusive GPSR und Battery-Reg.",
    "urgency": "Ohne gültige Konformitätserklärung darfst du dein Produkt in der EU nicht verkaufen – fehlt sie, drohen Marktrücknahme und Abmahnung. Seit GPSR prüfen Marktplätze strenger als je zuvor. Erstelle deine CE/RoHS-Erklärung jetzt mit GründerX und mach dein Produkt verkaufsfertig.",
    "outcomes": [
      "Fertige CE/RoHS-Konformitätserklärung als PDF zum Download",
      "Passende Vorlage für eine von 8 Produkt-Kategorien",
      "GPSR- und Battery-Regulation-Anforderungen mitberücksichtigt",
      "Eine vorzeigbare Erklärung statt mühsamer Eigenrecherche"
    ],
    "disclaimer": "Das generierte Dokument ersetzt keine Rechtsprüfung; die inhaltliche Richtigkeit für dein Produkt verantwortest du selbst."
  },
  "weee-check": {
    "seoTitle": "WEEE / EAR-Register-Check: Marke prüfen",
    "seoDescription": "Ist eine Marke im EAR-Verzeichnis registriert? Live-Check der offiziellen stiftung ear: WEEE-Nummer, Hersteller, Kategorie & Status.",
    "lead": "Der WEEE/EAR-Check fragt das offizielle Verzeichnis der stiftung ear live ab und zeigt dir WEEE-Nummer, Hersteller, Kategorie und ob eine Marke aktiv registriert ist.",
    "urgency": "Wer Elektrogeräte ohne WEEE-Registrierung verkauft, riskiert Abmahnungen und gesperrte Listings – und auch Lieferanten-Marken sind nicht immer sauber registriert. Jeder ungeprüfte Artikel ist ein Risiko. Prüfe Marken jetzt live mit GründerX, bevor du listest oder einkaufst.",
    "outcomes": [
      "Live-Auskunft, ob eine Marke im EAR-Verzeichnis registriert ist",
      "WEEE-Reg.-Nr., Hersteller bzw. Bevollmächtigter direkt sichtbar",
      "Kategorie, Geräteart und Status (aktiv/ausgetreten) auf einen Blick",
      "Sicherheit vor dem Einkauf oder Listing risikobehafteter Marken"
    ],
    "disclaimer": "Die Daten stammen aus dem offiziellen EAR-Verzeichnis; für rechtliche Schritte gilt allein der Stand bei der stiftung ear."
  },
  "labor-vergleich": {
    "seoTitle": "Labor-Vergleich: 44 ISO-17025-Labore DE/EU",
    "seoDescription": "Das richtige Prüflabor finden: 44 ISO-17025-Labore für Kosmetik, Food, Electronics & Co. mit Use-Case-Stacks und Kosten-Ballparks.",
    "lead": "Der Labor-Vergleich listet 44 etablierte ISO-17025-Labore in DE und EU für 14 Kategorien – von Kosmetik über Food bis MDR – mit 8 fertigen Use-Case-Stacks.",
    "urgency": "Ohne die richtigen Prüfungen darf dein Produkt nicht in den Verkauf – und das falsche Labor kostet dich Wochen und unnötiges Geld. Jeder Tag ohne Prüfbericht verschiebt deinen Launch. Finde dein passendes Labor jetzt mit GründerX und bring dein Produkt schneller in den Markt.",
    "outcomes": [
      "44 ISO-17025-Labore nach 14 Kategorien gefiltert",
      "Passender Use-Case-Stack für dein Produkt vorgeschlagen",
      "Kosten-Ballparks zur ersten Budgetplanung",
      "Kürzere Suche nach dem richtigen Prüfpartner"
    ],
    "disclaimer": "Kosten-Ballparks sind Richtwerte; das verbindliche Angebot und den Prüfumfang holst du dir direkt beim Labor."
  },
  "visa-helper": {
    "seoTitle": "Visa-Helper: Aufenthaltstitel & Auswandern",
    "seoDescription": "Visa & Aufenthaltstitel in beide Richtungen: 6 Titel nach Deutschland, 27 Visa weltweit raus – mit Profil-Score und §6 AStG Wegzugs-Block.",
    "lead": "Der Visa-Helper deckt beide Richtungen ab: 6 Aufenthaltstitel nach Deutschland mit Profil-Score und 27 Visa-Optionen weltweit – inklusive §6-AStG-Wegzugs-Warnung.",
    "urgency": "Beim Visa- oder Wegzugs-Thema entscheidet die Reihenfolge der Schritte – ein übersehener Punkt wie die Wegzugsbesteuerung kann dich fünfstellig kosten. Je später du planst, desto enger werden deine Optionen. Verschaff dir jetzt mit GründerX den Überblick, bevor du Fakten schaffst.",
    "outcomes": [
      "Passende Aufenthaltstitel oder Auswanderungs-Visa für dein Profil",
      "Profil-Score, der dir die realistischen Optionen zeigt",
      "Warnung vor dem §6-AStG-Wegzugs-Block und der AVOID-Liste",
      "Ein klarer Fahrplan statt verstreuter Behörden-Recherche"
    ],
    "disclaimer": "Dieses Tool ersetzt keine Rechts-, Steuer- oder Migrationsberatung; verbindliche Schritte klärst du mit Fachleuten."
  },
  "foerderung-db": {
    "seoTitle": "Förderprogramme-Datenbank: 40+ in 14 Ländern",
    "seoDescription": "Förderung für dein Startup finden: 40+ Programme in 14 Ländern – KfW, EXIST, EIC, YC, SEIS/EIS – filterbar nach Land, Typ und Phase.",
    "lead": "Die Förderung-Datenbank bündelt über 40 Programme in 14 Ländern – von KfW und EXIST über EIC bis YC und SEIS/EIS – filterbar nach Land, Typ und Gründungsphase.",
    "urgency": "Viele Förderungen musst du beantragen, bevor du startest – wer zu spät kommt, verliert oft den Anspruch komplett. Jeder Monat ohne passendes Programm ist verschenktes Kapital. Finde jetzt mit GründerX die Förderung, die zu deiner Phase passt, und sichere dir den Vorsprung.",
    "outcomes": [
      "Über 40 Förderprogramme aus 14 Ländern im Überblick",
      "Gefiltert nach Land, Typ und deiner Gründungsphase",
      "Wichtige Watchouts pro Programm, um Fehler zu vermeiden",
      "Eine Shortlist passender Programme statt endloser Suche"
    ],
    "disclaimer": "Förderbedingungen und Fristen ändern sich; die verbindlichen Voraussetzungen prüfst du beim jeweiligen Programm-Träger."
  },
  "us-llc-wizard": {
    "seoTitle": "US-LLC gründen: Setup-Wizard in 10 Schritten",
    "seoDescription": "US-LLC sauber aufsetzen: Wizard von Bundesstaat über EIN und W-8BEN-E bis Bank – inklusive Form-5472-$25k-Falle und Kostenrechner.",
    "lead": "Der US-LLC-Wizard führt dich in 10 Schritten durch den Setup – von Bundesstaat, Name und Agent über EIN und W-8BEN-E bis zum Bankkonto, inklusive Kostenrechner.",
    "urgency": "Eine US-LLC ist schnell gegründet – aber die Form-5472-Pflicht wird gern übersehen, und das kostet 25.000 Dollar Strafe pro Versäumnis. Jeder Schritt in falscher Reihenfolge verzögert dein Banking. Setz deine LLC jetzt strukturiert mit GründerX auf und umgeh die teuren Fallen.",
    "outcomes": [
      "Strukturierter 10-Schritte-Fahrplan für dein US-LLC-Setup",
      "Klarheit über EIN, BOI-Status und W-8BEN-E",
      "Frühwarnung vor der Form-5472-$25k-Falle",
      "Kostenüberblick, bevor du loslegst"
    ],
    "disclaimer": "Das Tool ersetzt keine Steuer- oder Rechtsberatung; US-Filings und Fristen bestätigst du mit einem qualifizierten Berater."
  },
  "hk-limited-wizard": {
    "seoTitle": "Hongkong-Limited gründen: Setup-Wizard",
    "seoDescription": "HK-Limited sauber aufsetzen: Wizard von Director über NNC1+BR und SCR bis Profits Tax & Bank – mit Two-Tier-Sätzen 8,25 % / 16,5 %.",
    "lead": "Der HK-Limited-Wizard führt dich in 11 Schritten durch die Gründung – von Director und CompSec über NNC1, BR und SCR bis zu Profits Tax, FSIE und Bankkonto.",
    "urgency": "Eine Hongkong-Limited bietet attraktive Steuersätze – aber FSIE-Regeln und SCR-Pflichten entscheiden, ob du sie überhaupt nutzen darfst. Wer Schritte überspringt, riskiert Ablehnung beim Banking. Setz deine HK-Limited jetzt geführt mit GründerX auf und mach es von Anfang an richtig.",
    "outcomes": [
      "Geführter 11-Schritte-Fahrplan für die HK-Limited-Gründung",
      "Überblick über NNC1, BR, SCR und CompSec-Pflichten",
      "Klarheit zu Profits Tax, FSIE und den Two-Tier-Sätzen",
      "Bessere Vorbereitung aufs oft heikle Bank-Onboarding"
    ],
    "disclaimer": "Das Tool ersetzt keine Steuer- oder Rechtsberatung; verbindliche Schritte klärst du mit einem HK-erfahrenen Berater."
  },
  "us-tax-helper": {
    "seoTitle": "US-Tax-Helper: Welche IRS-Filings brauche ich?",
    "seoDescription": "Welche US-Steuern gelten für deine Struktur? Pflicht-Filings IRS & State – Form 5472, 1120, 1065, 1040-NR – mit Fristen und PDF-Checkliste.",
    "lead": "Der US-Tax-Helper zeigt dir je nach Setup – SMLLC, Partnership, C-Corp oder US-Person – alle Pflicht-Filings bei IRS und State mit Fristen und PDF-Checkliste.",
    "urgency": "Bei US-Steuern hängt alles an deiner Struktur – das falsche oder fehlende Formular wie die Form 5472 kann 25.000 Dollar Strafe auslösen. Jede verpasste Frist wird teuer. Finde jetzt mit GründerX heraus, welche Filings für dich gelten, und reich rechtzeitig ein.",
    "outcomes": [
      "Alle Pflicht-Filings für dein konkretes US-Setup aufgelistet",
      "Fristen zu Form 5472, 1120, 1065 und 1040-NR im Blick",
      "Direkte Formular-Downloads plus PDF-Checkliste",
      "Klarheit zur $25k-Falle und zur BOI-Entwarnung 2025"
    ],
    "disclaimer": "Das Tool ersetzt keine Steuerberatung; deine konkreten US-Pflichten bestätigst du mit einem qualifizierten Steuerexperten."
  },
  "hk-tax-helper": {
    "seoTitle": "HK-Tax-Helper: IRD-Filings & Fristen fuer Limited",
    "seoDescription": "Welche Abgaben fuer deine HK-Limited? Profits Tax Return, Employer's Return, BR-Renewal & NAR1 mit Fristen und Checkliste. Jetzt pruefen.",
    "lead": "Der HK-Tax-Helper zeigt dir je nach Setup (Limited, Sole Proprietor, Partnership) alle Pflicht-Filings beim IRD und Companies Registry. Fuer Gruender mit Hongkong-Struktur, die nichts uebersehen wollen.",
    "urgency": "Ein verpasstes IRD-Filing in Hongkong wird teuer: Strafen, Vorladungen und im schlimmsten Fall die Streichung deiner Company. Die Fristen laufen nach festen Codes, nicht nach deinem Bauchgefuehl. Verschaff dir mit GründerX jetzt den vollstaendigen Ueberblick ueber deine HK-Pflichten.",
    "outcomes": [
      "Liste aller relevanten Filings (BIR51/52/54, Employer's Return, NAR1) fuer dein Setup",
      "Konkrete Fristen ueber die N/D/M-Code-Logik des IRD",
      "Klarheit, ob fuer dich Audit-Pflicht besteht",
      "Quellen zu den Original-Formularen statt Raten",
      "PDF-Checkliste zum Abhaken vor jeder Deadline"
    ],
    "disclaimer": "Dieses Tool dient der Orientierung und ersetzt keine steuerliche oder rechtliche Beratung durch einen qualifizierten Berater in Hongkong."
  },
  "us-hk-banking": {
    "seoTitle": "US & HK Banking: 9 Anbieter im Closure-Risk-Check",
    "seoDescription": "Wise, Mercury, Relay, Brex, Statrys & Co. im Vergleich: Closure-Risk-Score, Trustpilot und 12 Survival-Tipps fuer dein US/HK-Konto.",
    "lead": "Dieser Vergleich stellt 9 US- und HK-Banking-Anbieter gegenueber und bewertet, wie wahrscheinlich eine Konto-Schliessung ist. Fuer Gruender mit US-LLC oder HK-Limited, die ein stabiles Geschaeftskonto brauchen.",
    "urgency": "Ein gesperrtes Geschaeftskonto kann dein ganzes Business lahmlegen, oft ohne Vorwarnung und mit eingefrorenem Guthaben. Genau deshalb zaehlt die Wahl des richtigen Anbieters von Anfang an. Vergleiche jetzt mit GründerX Closure-Risk und Erfahrungen, bevor du dich bindest.",
    "outcomes": [
      "Closure-Risk-Score fuer Wise, Mercury, Relay, Brex, Statrys, Airwallex, Currenxie & HSBC HK",
      "Trustpilot-Einordnung pro Anbieter auf einen Blick",
      "12 Survival-Tipps, um eine Konto-Schliessung zu vermeiden",
      "Klarheit, welcher Anbieter zu US-LLC vs. HK-Limited passt",
      "Eine fundierte Entscheidung statt Trial-and-Error mit echtem Geld"
    ],
    "disclaimer": "Anbieter-Bewertungen sind Momentaufnahmen und ersetzen keine Bank- oder Finanzberatung; pruefe Konditionen immer direkt beim Anbieter."
  },
  "sales-tax-nexus": {
    "seoTitle": "Sales-Tax-Nexus-Check: 46 US-Staaten & Wayfair 2026",
    "seoDescription": "Wo entsteht US Sales-Tax-Nexus? 46 Staaten + DC mit Wayfair-Schwellen 2026, FBA-Logik und Foreign-Seller-Block. Jetzt pruefen.",
    "lead": "Der Sales-Tax-Nexus-Check zeigt dir fuer 46 US-Staaten plus DC, ab wann du Sales Tax abfuehren musst. Fuer E-Commerce-Gruender, die in die USA verkaufen, besonders ueber Amazon FBA.",
    "urgency": "Unbemerkter Sales-Tax-Nexus haeuft schnell vierstellige Nachforderungen an, plus Zinsen und Strafen, die rueckwirkend kommen. Wer in die USA verkauft, kann sich auf Unwissenheit nicht berufen. Pruefe jetzt mit GründerX, in welchen Staaten du wirklich registrierungspflichtig bist.",
    "outcomes": [
      "Wayfair-Schwellen 2026 fuer 46 Staaten + DC auf einen Blick",
      "FBA-Logik: wo dein Lagerbestand Nexus ausloest",
      "Foreign-Seller-Block: die 4 Staaten, die ohne SSN sperren",
      "Verstaendnis der Marketplace-Facilitator-Regeln",
      "SSTRS-Workaround als moeglicher Registrierungs-Shortcut"
    ],
    "disclaimer": "Sales-Tax-Regeln aendern sich laufend; dieses Tool ersetzt keine steuerliche Beratung durch einen US-Tax-Professional."
  },
  "substance-checker": {
    "seoTitle": "Substance-Checker: Briefkasten-Risiko fuer Auslands-GmbH",
    "seoDescription": "Wie hoch ist dein Mailbox-Risiko? Score 0-100 zu Paragraf 50d EStG, AStG & AO fuer 12 EU/CH-Laender. Jetzt Substanz pruefen.",
    "lead": "Der Substance-Requirements-Checker bewertet mit einem Score von 0 bis 100, wie sehr deine Auslandsstruktur als Briefkastenfirma gilt. Fuer Gruender mit Holding oder Gesellschaft in EU oder der Schweiz.",
    "urgency": "Fehlende wirtschaftliche Substanz fuehrt schnell zur Aberkennung von Steuervorteilen und zu Hinzurechnung in Deutschland. Das Finanzamt schaut genau auf Geschaeftsfuehrer-Wohnsitz, Buero und echte Aktivitaet. Pruefe jetzt mit GründerX, wo deine Struktur angreifbar ist, bevor es eine Pruefung tut.",
    "outcomes": [
      "Mailbox-Risiko-Score von 0 bis 100 fuer deine Struktur",
      "Bewertung entlang Paragraf 50d EStG, AStG und Paragraf 10 AO",
      "Vergleich fuer 12 EU- und CH-Laender",
      "Klarheit zu den Faktoren GF-Wohnsitz, lokale Mitarbeiter, Buero und Umsatz",
      "Einordnung deines Principal-Purpose-Test-Grundes"
    ],
    "disclaimer": "Substanz-Bewertungen sind komplex und einzelfallabhaengig; dieses Tool ersetzt keine steuerliche oder rechtliche Beratung."
  },
  "dba-cfc": {
    "seoTitle": "DBA-CFC-Rechner: Hinzurechnung & Quellensteuer",
    "seoDescription": "Berechne AStG-Hinzurechnungsbesteuerung, DBA-Quellensteuer und Mutter-Tochter-RL fuer 14 Laender. Step-by-Step Ausland zu DE.",
    "lead": "Der DBA-CFC-Rechner fuehrt dich Schritt fuer Schritt durch Hinzurechnungsbesteuerung, DBA-Quellensteuer und die Mutter-Tochter-Richtlinie. Fuer Gruender mit Auslandsgesellschaft und deutscher Steuerpflicht.",
    "urgency": "Hinzurechnungsbesteuerung kann Gewinne deiner Auslandsgesellschaft in Deutschland nachversteuern, oft hoeher als gedacht. Wer DBA und Quellensteuer nicht durchrechnet, zahlt doppelt oder verschenkt Reduktionen. Rechne jetzt mit GründerX durch, was am Ende in Deutschland wirklich ankommt.",
    "outcomes": [
      "Step-by-Step-Berechnung der AStG-Hinzurechnung",
      "Reduktion der DBA-Quellensteuer fuer 14 Laender",
      "Pruefung der Mutter-Tochter-Richtlinie auf deine Struktur",
      "Klare Zahl, was vom Auslandsgewinn in DE versteuert wird",
      "Verstaendnis, wo doppelte Besteuerung droht"
    ],
    "disclaimer": "Berechnungen sind vereinfachte Modelle und ersetzen keine steuerliche Beratung im Einzelfall."
  },
  "us-kreditkarten": {
    "seoTitle": "US-Kreditkarten & Miles: 22 Karten + MR-Transfer-Hack",
    "seoDescription": "22 US-Karten, 15 Miles-Sweet-Spots und der DE-US Amex-MR-Transfer-Hack mit FX-Bonus. Velocity-Strategie fuer hohe Sign-up-Bonusse.",
    "lead": "Dieses Tool bündelt 22 US-Kreditkarten, 15 Miles-Sweet-Spots und konkrete Punkte-Strategien fuer Gruender mit US-Setup. Fuer alle, die ihre Geschaefts- und Reiseausgaben hebeln wollen.",
    "urgency": "Wer eine US-Struktur hat, aber keine Karten-Strategie faehrt, laesst jedes Jahr tausende Euro an Sign-up-Bonussen und Miles liegen. Die Sweet-Spots aendern sich, der MR-Transfer-Vorteil nicht ewig. Hol dir jetzt mit GründerX den Ueberblick, bevor sich die besten Angebote schliessen.",
    "outcomes": [
      "Vergleich von 22 US-Kreditkarten an einem Ort",
      "15 Miles-Sweet-Spots fuer maximalen Punkt-Wert",
      "Der DE-zu-US Amex-MR-Transfer-Hack mit FX-Bonus erklaert",
      "Velocity-Strategie zur Maximierung der Jahres-Bonusse",
      "Klare Reihenfolge, welche Karte du wann oeffnest"
    ],
    "disclaimer": "Karten-Konditionen und Bonusse aendern sich haeufig; dieses Tool ist keine Finanzberatung, pruefe Angebote stets direkt beim Anbieter."
  },
  "ust-rechner": {
    "seoTitle": "USt-Rechner DE: Brutto-Netto, Paragraf 19, 13b & OSS",
    "seoDescription": "Umsatzsteuer fuer alle Faelle: Brutto-Netto, Kleinunternehmer Paragraf 19, Reverse-Charge, OSS und IGL mit USt-IdNr-Check. Jetzt rechnen.",
    "lead": "Der USt-Rechner deckt in fünf Tabs die haeufigsten Umsatzsteuer-Faelle ab, von Brutto-Netto bis OSS und innergemeinschaftlicher Lieferung. Fuer Selbststaendige und E-Commerce-Gruender in Deutschland.",
    "urgency": "Ein falscher Umsatzsteuer-Satz oder ein vergessener Reverse-Charge-Hinweis fuehrt schnell zu Rechnungs-Korrekturen und Aerger mit dem Finanzamt. Mit der Kleinunternehmer-Reform 2025 haben sich Grenzen verschoben. Rechne deine Faelle jetzt mit GründerX sauber durch, statt zu schaetzen.",
    "outcomes": [
      "Schnelle Brutto-Netto-Umrechnung in beide Richtungen",
      "Kleinunternehmer-Pruefung nach Paragraf 19 inkl. Reform 2025",
      "Korrekte Behandlung von Reverse-Charge nach Paragraf 13b",
      "OSS-Berechnung fuer B2C-Verkaeufe in der EU",
      "IGL nach Paragraf 6a mit USt-IdNr-Validierung"
    ],
    "disclaimer": "Die Ergebnisse dienen der Orientierung und ersetzen keine steuerliche Beratung durch einen Steuerberater."
  },
  "abschreibung": {
    "seoTitle": "Abschreibungs-Rechner: AfA, GWG & Steuer-Ersparnis",
    "seoDescription": "Berechne Abschreibung fuer 18 Asset-Typen: Sofortabschreibung, GWG, Sammelposten, lineare AfA. Steuer-Ersparnis GmbH vs ESt im Blick.",
    "lead": "Der Abschreibungs-Rechner ermittelt fuer 18 Asset-Typen die passende AfA-Methode und zeigt deine Steuer-Ersparnis. Fuer Gruender und Selbststaendige, die Investitionen steuerlich optimal absetzen wollen.",
    "urgency": "Wer Anschaffungen falsch abschreibt, verschenkt Liquiditaet und zahlt frueher Steuern als noetig. Sofortabschreibung, GWG und Sammelposten haben jeweils eigene Regeln, die ueber deinen Cashflow entscheiden. Rechne jetzt mit GründerX durch, wie viel du wirklich sparst.",
    "outcomes": [
      "Passende AfA-Methode fuer 18 Asset-Typen",
      "Vergleich Sofortabschreibung, GWG, Sammelposten und lineare AfA",
      "Steuer-Ersparnis-Vergleich GmbH gegenueber Einkommensteuer",
      "Sichtbarer Liquiditaets-Effekt deiner Investition",
      "Klarheit, welche Variante sich fuer dein Asset lohnt"
    ],
    "disclaimer": "Die Berechnungen sind vereinfacht und ersetzen keine steuerliche Beratung im Einzelfall."
  },
  "stb-handoff": {
    "seoTitle": "Steuerberater-Hand-off: 3 Angebote per Briefing-PDF",
    "seoDescription": "Erstelle ein praezises Steuerberater-Briefing fuer 10 Gruender-Gruppen und hol dir 3 Angebote von Top-Kanzleien. Wizard + PDF + Email.",
    "lead": "Der Steuerberater-Hand-off fuehrt dich durch einen Wizard fuer deine Gruender-Gruppe und erzeugt ein vollstaendiges Briefing fuer drei Kanzleien. Fuer alle, die schnell den passenden Steuerberater finden wollen.",
    "urgency": "Ein schwammiges Briefing bringt schwammige Angebote und kostet dich Wochen im Hin und Her. Wer mit Pflichtfeldern und den richtigen Fragen startet, bekommt vergleichbare Angebote auf einmal. Erstell dein Briefing jetzt mit GründerX und geh direkt mit drei Kanzleien ins Gespraech.",
    "outcomes": [
      "Wizard fuer 10 Gruender-Gruppen von Solo bis Holding und International",
      "Eigene Pflichtfelder und Trick-Fragen pro Gruppe",
      "Sauberes Briefing-PDF zum Versand",
      "Email-Vorlage fuer die Top-3-Kanzleien",
      "Vergleichbare Angebote statt unklarer Einzelgespraeche"
    ],
    "disclaimer": "Das Tool unterstuetzt nur bei der Anbahnung; die Steuerberatung selbst erfolgt ausschliesslich durch die beauftragte Kanzlei nach Paragraf 9 StBerG."
  },
  "experten-bookings": {
    "seoTitle": "1:1-Berater-Termin: 30-min-Call direkt buchen",
    "seoDescription": "Buche einen 30-Minuten-Call zu Rechtsform, Holding, US-LLC, Steuer-Setup oder E-Com-Strategie. Slot direkt im Kalender waehlen.",
    "lead": "Mit den 1:1-Bookings waehlst du direkt einen Slot fuer einen 30-Minuten-Call zu deinem Thema. Fuer Gruender, die zu Rechtsform, Holding, US-LLC oder Brand-Strategie eine konkrete Einschaetzung brauchen.",
    "urgency": "Stundenlanges Googeln zu Rechtsform oder Holding-Struktur bringt dich oft nur tiefer in die Unsicherheit. Ein gezielter 30-Minuten-Call klaert in einem Gespraech, was sonst Wochen dauert. Sichr dir jetzt mit GründerX deinen Slot, solange Termine frei sind.",
    "outcomes": [
      "Direkte Terminbuchung ohne langes Hin und Her",
      "Klare Themenwahl von Rechtsform bis E-Com-Brand-Strategie",
      "30 fokussierte Minuten auf deine konkrete Situation",
      "Slot-Auswahl bequem im Kalender",
      "Konkrete naechste Schritte statt offener Fragen"
    ],
    "disclaimer": "Ein Beratungsgespraech vermittelt allgemeine Einordnung und ersetzt keine individuelle Steuer- oder Rechtsberatung im Einzelfall."
  },
  "app-umsatz-rechner": {
    "seoTitle": "App-Store-Umsatz-Rechner – was bleibt von 9,99 €?",
    "seoDescription": "Apple & Google App-Umsatz durchrechnen: USt + Store-Provision (15/30 %) raus, MRR, Abo-LTV mit Churn und Break-even gegen deine Entwicklungskosten.",
    "lead": "Der Rechner zeigt dir, was von deinem App-Store-Preis wirklich bei dir ankommt – und ob sich deine App-Idee trägt: Netto-Erlös pro Zahler, MRR-Verlauf, Abo-LTV mit Churn und der Break-even-Monat gegen deine Entwicklungskosten.",
    "urgency": "Die meisten App-Gründer rechnen mit dem Store-Preis – und wundern sich über die Auszahlung: Von 9,99 € führt der Store erst die Umsatzsteuer ab, dann gehen 15–30 % Provision runter, übrig bleiben ~7,14 €. Wer damit nicht kalkuliert, bewertet Agentur-Angebote falsch, setzt Preise zu niedrig an und merkt erst nach Monaten, dass die App sich nie tragen kann. Rechne es in 2 Minuten durch, bevor du Geld in Entwicklung oder Ads steckst.",
    "outcomes": [
      "Dein echter Netto-Erlös pro Zahler nach USt und Store-Provision",
      "MRR-Simulation über 36 Monate mit Downloads, Conversion und Churn",
      "Abo-LTV – die Basis für deine Ads-Kalkulation",
      "Break-even-Monat gegen deine Entwicklungskosten",
      "Klarheit, ob Small Business Program (15 % statt 30 %) für dich greift"
    ],
    "disclaimer": "Vereinfachte Modell-Rechnung mit 19 % DE-USt; reale Auszahlungen variieren je Käuferland und Abrechnungszyklus. Keine Steuerberatung."
  },
  "runway-rechner": {
    "seoTitle": "Runway-Rechner – wie lange reicht dein Geld?",
    "seoDescription": "Burn-Rate & Runway berechnen: Cash + Kosten + Umsatz-Wachstum → simulierter Runway, Cash-Tiefpunkt und Default Alive or Default Dead. Für jeden Gründer.",
    "lead": "Das wichtigste Dashboard jedes jungen Unternehmens in einem Rechner: Wie viele Monate reicht dein Cash – und holt der wachsende Umsatz die Kosten ein, bevor es ausgeht? Mit Burn-Rate, Cash-Tiefpunkt und Paul Grahams Default-Alive-Check.",
    "urgency": "Startups sterben nicht an schlechten Ideen, sondern daran, dass das Geld ausgeht – und zwar meist überraschend, weil niemand den Runway ehrlich gerechnet hat (Privatentnahme vergessen, Wachstum überschätzt, Steuern ignoriert). Wer bei 12 Monaten Runway gegensteuert, hat alle Optionen; wer es bei 3 Monaten merkt, verhandelt aus Schwäche. Der Rechner zeigt dir in 2 Minuten, in welchem Modus du wirklich bist.",
    "outcomes": [
      "Dein Runway in Monaten – simuliert, nicht nur Cash ÷ Burn",
      "Ehrliche Burn-Rate inklusive Privatentnahme",
      "Default Alive oder Default Dead – wirst du rechtzeitig profitabel?",
      "Cash-Tiefpunkt: wie viel Puffer du wirklich brauchst",
      "Konkrete Handlungs-Stufen je nach Runway-Länge"
    ],
    "disclaimer": "Modell-Rechnung mit konstanten Annahmen – reale Geschäfte sind saisonal. Ersetzt keine Liquiditätsplanung mit Steuerberater."
  }
};
