/**
 * Roadmap-Aufgaben für Solo-Selbstständige (Tool 11).
 *
 * 4 Phasen × 8-10 Aufgaben:
 *  - T0: Vor der Anmeldung (Vorbereitung)
 *  - T30: Erste 30 Tage nach Anmeldung
 *  - T60: 31-60 Tage
 *  - T90: 61-90 Tage
 *
 * Pflicht-Logik: jede Aufgabe hat `triggers` — ein Predicate-Objekt das
 * gegen das User-Setup matchen muss. Wenn alle Trigger erfüllt sind,
 * erscheint die Aufgabe in der personalisierten Roadmap.
 */

export type Phase = "T0" | "T30" | "T60" | "T90";
export type Pflicht = "muss" | "soll" | "kann";

export type Rechtsform = "freiberuf" | "einzel-gewerbe" | "gbr" | "ug-gmbh";
export type UstStatus = "ku" | "regel" | "unsicher";

export type UserSetup = {
  rechtsform: Rechtsform;
  ustStatus: UstStatus;
  euGeschaeft: boolean;       // hat oder plant B2B in EU
  b2b: boolean;                // verkauft an Unternehmen
  bereitsAngemeldet: boolean;  // Gewerbe/FA-Anmeldung schon durch?
  mitarbeiter: boolean;        // hat oder plant Mitarbeiter
};

export type RoadmapTask = {
  id: string;
  phase: Phase;
  pflicht: Pflicht;
  titel: string;
  beschreibung: string;
  schritte: string[];
  zeitaufwand: string;           // z.B. "30 Min" oder "1-2 Std"
  kostenHint?: string;            // z.B. "20-65 €" oder "kostenlos"
  toolLink?: { route: string; label: string };
  externalLink?: { url: string; label: string };
  // Pflicht nur wenn alle Trigger erfüllt
  triggers: Partial<{
    rechtsform: Rechtsform | Rechtsform[];
    ustStatus: UstStatus | UstStatus[];
    euGeschaeft: boolean;
    b2b: boolean;
    bereitsAngemeldet: boolean;
    mitarbeiter: boolean;
  }>;
};

export const ROADMAP_TASKS: RoadmapTask[] = [
  // ============================================================
  // T0: Vor der Anmeldung
  // ============================================================
  {
    id: "t0-1-rechtsform-check",
    phase: "T0",
    pflicht: "muss",
    titel: "Rechtsform festlegen",
    beschreibung: "Freiberuf oder Gewerbe? Entscheidet ob du GewA1 brauchst oder direkt FA-Anmeldung.",
    schritte: [
      "Tool 1 'Brauche ich ein Gewerbe?' durchgehen",
      "Tool 2 'Freiberuf vs Gewerbe-Check' für Berufs-Klärung",
      "Bei Edge-Cases: Steuerberater 15-Min-Erstgespräch (oft kostenlos)",
    ],
    zeitaufwand: "30-60 Min",
    kostenHint: "kostenlos",
    toolLink: { route: "/cockpit/gewerbe-check", label: "Tool 1 starten" },
    triggers: { bereitsAngemeldet: false },
  },
  {
    id: "t0-2-name-firmierung",
    phase: "T0",
    pflicht: "soll",
    titel: "Geschäftsname / Firmierung festlegen",
    beschreibung: "Einzel: optional (z.B. 'Max Mustermann Beratung'). UG/GmbH: Pflicht, muss Rechtsform-Zusatz enthalten.",
    schritte: [
      "Verfügbarkeit prüfen (DPMA Markenregister + Domain-Check)",
      "Bei UG/GmbH: Name muss zur Tätigkeit passen + Rechtsform-Zusatz",
      "Domain + Email sichern",
    ],
    zeitaufwand: "1-2 Std",
    kostenHint: "10-30 €/J Domain",
    triggers: {},
  },
  {
    id: "t0-3-ku-entscheidung",
    phase: "T0",
    pflicht: "muss",
    titel: "§ 19 UStG Kleinunternehmer-Entscheidung vorbereiten",
    beschreibung: "Bindung 5 Jahre! Bei B2B-Kunden meist Regelbesteuerung sinnvoll (kein VS-Abzug bei KU).",
    schritte: [
      "Tool 3 'Schwellen-Check' für Grenzen 25k/100k",
      "Tool 9 'Rechnungs-Generator' KU-Modus testen",
      "Bei Unsicherheit: kannst im FsE (kommt nach Anmeldung) entscheiden",
    ],
    zeitaufwand: "30 Min",
    kostenHint: "kostenlos",
    toolLink: { route: "/cockpit/schwellen-check", label: "Schwellen-Check" },
    triggers: { ustStatus: ["ku", "unsicher"] },
  },
  {
    id: "t0-4-stundensatz",
    phase: "T0",
    pflicht: "soll",
    titel: "Stundensatz / Preise kalkulieren",
    beschreibung: "Anfänger setzen zu niedrig an. Rechne rückwärts vom Wunsch-Netto + Lebenshaltung + SV + Rücklage.",
    schritte: [
      "Tool 6 'Stundensatz-Rechner' durchgehen",
      "Tool 5 'Brutto-Netto Solo' für Steuerlast-Vorschau",
      "Marktpreis-Check bei freelancermap, Honorarspiegel",
    ],
    zeitaufwand: "30 Min",
    toolLink: { route: "/cockpit/stundensatz-rechner", label: "Stundensatz-Rechner" },
    triggers: {},
  },
  {
    id: "t0-5-gewerbeanmeldung",
    phase: "T0",
    pflicht: "muss",
    titel: "Gewerbe anmelden (GewA1)",
    beschreibung: "Bei Gewerbe: GewA1 online (verwaltung.bund.de) oder Bürgeramt. Gebühr 20-65 € stadt-abhängig.",
    schritte: [
      "Tool 10 'Gewerbeanmeldung-Wizard' durchgehen (Vorbereitung)",
      "GewA1 online ausfüllen oder Bürgeramt-Termin buchen",
      "Personalausweis + ggf. Aufenthaltstitel mitbringen",
      "Gebühr in bar oder per EC vor Ort",
    ],
    zeitaufwand: "1-2 Std",
    kostenHint: "20-65 €",
    toolLink: { route: "/cockpit/gewerbeanmeldung-wizard", label: "Tool 10 Wizard" },
    externalLink: { url: "https://verwaltung.bund.de", label: "verwaltung.bund.de" },
    triggers: { rechtsform: ["einzel-gewerbe", "gbr"], bereitsAngemeldet: false },
  },
  {
    id: "t0-6-fa-anmeldung-freiberuf",
    phase: "T0",
    pflicht: "muss",
    titel: "Finanzamt-Anmeldung (Freiberufler)",
    beschreibung: "Freiberufler brauchen KEINE Gewerbeanmeldung — nur die Anmeldung beim FA. Direkt Fragebogen zur steuerlichen Erfassung ausfüllen.",
    schritte: [
      "ELSTER-Konto erstellen oder einloggen",
      "Fragebogen zur steuerlichen Erfassung (FsE) online ausfüllen",
      "§ 19 KU-Entscheidung treffen",
      "Steuernummer + ggf. USt-ID werden zugeteilt",
    ],
    zeitaufwand: "1-2 Std",
    kostenHint: "kostenlos",
    externalLink: { url: "https://www.elster.de", label: "ELSTER" },
    triggers: { rechtsform: "freiberuf", bereitsAngemeldet: false },
  },
  {
    id: "t0-7-notar-ug-gmbh",
    phase: "T0",
    pflicht: "muss",
    titel: "UG/GmbH-Gründung beim Notar",
    beschreibung: "Stammkapital einzahlen, Gesellschaftervertrag notariell beurkunden, Eintrag Handelsregister.",
    schritte: [
      "Notar-Termin vereinbaren (Beurkundung)",
      "UG: ab 1 € Stammkapital · GmbH: 25.000 €",
      "Geschäftskonto eröffnen + Stammkapital einzahlen",
      "Handelsregister-Eintrag (durch Notar)",
      "Steuerliche Erfassung beim FA",
    ],
    zeitaufwand: "2-4 Wochen",
    kostenHint: "300-1.500 € Notar + HR-Gebühren",
    triggers: { rechtsform: "ug-gmbh" },
  },

  // ============================================================
  // T30: Erste 30 Tage
  // ============================================================
  {
    id: "t30-1-geschaeftskonto",
    phase: "T30",
    pflicht: "soll",
    titel: "Geschäftskonto eröffnen",
    beschreibung: "Bei Einzel/Freiberuf rechtlich nicht zwingend, aber DRINGEND empfohlen (saubere Trennung, Buchhaltung). Bei UG/GmbH Pflicht.",
    schritte: [
      "Anbieter vergleichen: Holvi, Kontist, Qonto, Penta, oder Hausbank",
      "Vorab: Gewerbeschein + Personalausweis bereithalten",
      "VideoIdent oder PostIdent für Verifizierung",
    ],
    zeitaufwand: "30-60 Min",
    kostenHint: "0-15 €/Mon",
    triggers: {},
  },
  {
    id: "t30-2-buchhaltungs-software",
    phase: "T30",
    pflicht: "soll",
    titel: "Buchhaltungs-Software einrichten",
    beschreibung: "lexoffice, sevdesk, Buchhaltungsbutler oder StB-Mandanten-Lösung. ZUERST: Tool 7 Cost-Benefit-Check.",
    schritte: [
      "Tool 7 'StB Cost-Benefit-Check' für DIY vs StB-Entscheidung",
      "Software-Trial (meist 14 Tage)",
      "Bank-Import einrichten (HBCI/PSD2)",
      "Erste Belege scannen + kategorisieren",
    ],
    zeitaufwand: "2-4 Std Setup",
    kostenHint: "10-40 €/Mon",
    toolLink: { route: "/cockpit/stb-cost-benefit", label: "Cost-Benefit-Check" },
    triggers: {},
  },
  {
    id: "t30-3-kv-wahl",
    phase: "T30",
    pflicht: "muss",
    titel: "Krankenversicherung wählen / wechseln",
    beschreibung: "Als Selbstständiger: freiwillige GKV / PKV / KSK. Beitrag 200-1.000 €/Monat — die teuerste laufende Position.",
    schritte: [
      "Tool 'KV-Optimizer' für Vergleich GKV-Kassen + PKV",
      "Wenn künstlerisch/publizistisch: Künstlersozialkasse prüfen (-50 % Beitrag)",
      "Bei freiwilliger GKV: Mindestbemessung 1.318 €/Mon",
      "Familienangehörige: kostenlos in GKV mitversichert",
    ],
    zeitaufwand: "2-3 Std",
    kostenHint: "200-1.000 €/Mon",
    toolLink: { route: "/cockpit/kv-optimizer", label: "KV-Optimizer" },
    triggers: {},
  },
  {
    id: "t30-4-fse-warten",
    phase: "T30",
    pflicht: "muss",
    titel: "Fragebogen zur steuerlichen Erfassung (FsE) ausfüllen",
    beschreibung: "Kommt 2-4 Wochen nach Gewerbeanmeldung automatisch. ELSTER-Pflicht. Hier wird § 19 KU FINAL entschieden!",
    schritte: [
      "ELSTER-Konto bereithalten",
      "FsE online ausfüllen (~30 Felder)",
      "§ 19 KU-Entscheidung treffen (5 Jahre Bindung!)",
      "Voraussichtliche Einkünfte angeben (für Steuer-Vorauszahlung)",
      "Anlage S (Freiberuf) oder G (Gewerbe) Pflicht",
    ],
    zeitaufwand: "1-2 Std",
    kostenHint: "kostenlos",
    externalLink: { url: "https://www.elster.de", label: "ELSTER" },
    triggers: { rechtsform: ["einzel-gewerbe", "freiberuf"] },
  },
  {
    id: "t30-5-ust-id-eu",
    phase: "T30",
    pflicht: "muss",
    titel: "USt-ID beantragen (EU-Geschäft)",
    beschreibung: "Beim BZSt online, kostenlos, dauert ~7-14 Tage. Pflicht bei Reverse Charge §13b oder IGL §6a.",
    schritte: [
      "Online-Antrag beim Bundeszentralamt für Steuern (BZSt)",
      "Steuernummer muss bereits vorliegen",
      "ID kommt postalisch",
    ],
    zeitaufwand: "15 Min",
    kostenHint: "kostenlos",
    externalLink: { url: "https://www.bzst.de", label: "BZSt" },
    triggers: { euGeschaeft: true, ustStatus: "regel" },
  },
  {
    id: "t30-6-impressum-dsgvo",
    phase: "T30",
    pflicht: "muss",
    titel: "Impressum + Datenschutzerklärung (DSGVO)",
    beschreibung: "Auf jeder Webseite Pflicht (§5 TMG, Art. 13 DSGVO). Generator + Anwalt für Profi-Version.",
    schritte: [
      "Impressum mit eRecht24-Generator (gratis)",
      "Datenschutzerklärung mit Cookie-Banner + Tracking-Hinweisen",
      "Privatadresse vs c/o-Postanschrift (DSGVO-konform)",
      "Bei Shop: AGB + Widerrufsbelehrung",
    ],
    zeitaufwand: "2-3 Std",
    kostenHint: "0-300 € (Generator/Anwalt)",
    externalLink: { url: "https://www.e-recht24.de/impressum-generator.html", label: "Impressum-Generator" },
    triggers: {},
  },
  {
    id: "t30-7-rechnungs-template",
    phase: "T30",
    pflicht: "muss",
    titel: "Erstes Rechnungs-Template erstellen",
    beschreibung: "§14 UStG-konform mit allen 10 Pflichtangaben. Tool 9 macht das in 5 Min.",
    schritte: [
      "Tool 9 'Rechnungs-Generator' durchgehen",
      "USt-Modus passend wählen (Standard/KU/RC/IGL)",
      "Template als JSON exportieren für Wiederverwendung",
      "Rechnungsnummern-Kreis festlegen (fortlaufend lückenlos!)",
    ],
    zeitaufwand: "30 Min",
    toolLink: { route: "/cockpit/rechnungs-generator", label: "Rechnungs-Generator" },
    triggers: {},
  },

  // ============================================================
  // T60: 31-60 Tage
  // ============================================================
  {
    id: "t60-1-ihk-hwk",
    phase: "T60",
    pflicht: "muss",
    titel: "IHK / HwK-Mitgliedschaft prüfen",
    beschreibung: "Automatisch bei Gewerbeanmeldung. Beitrag ab Gewinn >5.200 €. Befreiung für Neugründer 2 Jahre möglich.",
    schritte: [
      "Schreiben von IHK/HwK abwarten (kommt nach Gewerbeanmeldung)",
      "Bei Neugründung Befreiungs-Antrag stellen (2 Jahre)",
      "Bei niedrigem Gewinn: Grundbeitrag-Reduktion beantragen",
    ],
    zeitaufwand: "30 Min",
    kostenHint: "40-300 €/J ab Gewinn 5.200 €",
    triggers: { rechtsform: ["einzel-gewerbe", "gbr", "ug-gmbh"] },
  },
  {
    id: "t60-2-berufshaftpflicht",
    phase: "T60",
    pflicht: "soll",
    titel: "Berufshaftpflichtversicherung abschließen",
    beschreibung: "Bei bestimmten Berufen Pflicht (Ärzte, Anwälte, StB, Architekten), bei IT/Beratung dringend empfohlen.",
    schritte: [
      "Bedarf je nach Tätigkeit prüfen",
      "Versicherungssumme: Standard 1-3 Mio €",
      "Anbieter: HISCOX, Allianz, R+V, Hiscox-Online",
      "Bei Cyber-Risiko zusätzlich Cyber-Versicherung",
    ],
    zeitaufwand: "1-2 Std",
    kostenHint: "150-600 €/J Solo",
    triggers: {},
  },
  {
    id: "t60-3-stundensatz-marktcheck",
    phase: "T60",
    pflicht: "kann",
    titel: "Stundensatz-Marktcheck nach ersten Kunden",
    beschreibung: "Nach 1-2 Aufträgen: war Preis zu niedrig? Bei mehr als 80% Auftragszusage = Preis erhöhen.",
    schritte: [
      "Erste Auftrags-Bilanz ziehen",
      "Tool 6 erneut durchrechnen mit echten Daten",
      "Bei neuen Kunden: 10-20 % höher anbieten",
    ],
    zeitaufwand: "30 Min",
    toolLink: { route: "/cockpit/stundensatz-rechner", label: "Stundensatz-Rechner" },
    triggers: {},
  },
  {
    id: "t60-4-buchhaltung-routine",
    phase: "T60",
    pflicht: "muss",
    titel: "Buchhaltungs-Routine etablieren",
    beschreibung: "Wöchentlich 1-2 Std reichen. Bank-Import + Belege scannen sofort, sonst Chaos.",
    schritte: [
      "Wöchentlicher Buchhaltungs-Termin im Kalender",
      "Belege sofort scannen (oder Foto in lexoffice/sevdesk)",
      "Quittungs-Mappe mit Datum sortieren",
      "Monats-Abschluss: Bank + Belege abgeglichen",
    ],
    zeitaufwand: "1-2 Std/Woche",
    triggers: {},
  },
  {
    id: "t60-5-ust-va-erste",
    phase: "T60",
    pflicht: "muss",
    titel: "Erste USt-Voranmeldung abgeben",
    beschreibung: "Bei Regelbesteuerung: monatlich oder quartalsweise. Frist: 10. des Folgemonats (Dauerfristverlängerung +1 Monat möglich).",
    schritte: [
      "ELSTER-Konto öffnen, Anlage UStVA",
      "Umsätze + Vorsteuer eintragen",
      "Dauerfristverlängerung beantragen (1/11 als Sondervorauszahlung)",
      "Bei Software: Direkt-Übertragung an ELSTER",
    ],
    zeitaufwand: "30-60 Min",
    kostenHint: "kostenlos",
    externalLink: { url: "https://www.elster.de", label: "ELSTER" },
    triggers: { ustStatus: "regel" },
  },
  {
    id: "t60-6-marken-anmeldung",
    phase: "T60",
    pflicht: "kann",
    titel: "Markenanmeldung (wenn Brand-Aufbau)",
    beschreibung: "DPMA-Anmeldung 290 € (Online), schützt Logo + Name 10 Jahre. Sinnvoll wenn Brand-Aufbau geplant.",
    schritte: [
      "Recherche bestehende Marken (DPMAregister)",
      "Klassifikation Nizza (Waren-/Dienstleistungsklassen)",
      "Online-Antrag DPMA",
      "Veröffentlichung im Markenblatt, 3 Monate Widerspruchsfrist",
    ],
    zeitaufwand: "2-3 Std",
    kostenHint: "290 € + ggf. Anwalt",
    externalLink: { url: "https://www.dpma.de", label: "DPMA" },
    triggers: { b2b: true },
  },

  // ============================================================
  // T90: 61-90 Tage
  // ============================================================
  {
    id: "t90-1-rv-pflicht",
    phase: "T90",
    pflicht: "muss",
    titel: "Rentenversicherungs-Pflicht prüfen",
    beschreibung: "ACHTUNG: Manche Solo-Selbstständige sind RV-PFLICHT (Lehrer, Erzieher, Pflege, KSK, arbeitnehmerähnliche). Folgen: 18,6 % vom Gewinn nachzuzahlen!",
    schritte: [
      "DRV-Selbstauskunft online prüfen (V0023)",
      "Bei Unklarheit: schriftliche Statusfeststellung beantragen (kostenlos)",
      "Wenn pflichtversichert: Anmeldung + Beiträge ab Tag 1",
      "Sonst: freiwillige RV erwägen (Tool 'Pension-Optimizer')",
    ],
    zeitaufwand: "1-2 Std",
    externalLink: { url: "https://www.deutsche-rentenversicherung.de", label: "DRV" },
    triggers: {},
  },
  {
    id: "t90-2-stb-entscheidung",
    phase: "T90",
    pflicht: "soll",
    titel: "Steuerberater-Entscheidung treffen",
    beschreibung: "Nach 2-3 Monaten echter Buchhaltung: weitermachen DIY oder StB beauftragen? Tool 7 hat den Cost-Benefit.",
    schritte: [
      "Tool 7 'StB Cost-Benefit-Check' mit echten Zahlen",
      "Hybrid-Option: DIY-Buchhaltung + StB nur Jahresabschluss",
      "StB-Erstgespräch oft kostenlos (15-30 Min)",
      "Mandatsvereinbarung schriftlich + StBVV-Honorar klären",
    ],
    zeitaufwand: "2-3 Std + 15-30 Min StB-Gespräch",
    toolLink: { route: "/cockpit/stb-cost-benefit", label: "Cost-Benefit-Check" },
    triggers: {},
  },
  {
    id: "t90-3-notgroschen",
    phase: "T90",
    pflicht: "soll",
    titel: "Notgroschen + Steuer-Rücklage aufbauen",
    beschreibung: "Solo-Selbstständige brauchen 3-6 Monatsausgaben Notgroschen + 30-40 % vom Gewinn Steuer-Rücklage.",
    schritte: [
      "Sub-Konto für Steuer-Rücklage einrichten (30-40 % automatisch)",
      "Notgroschen: 3-6 Monatsausgaben auf Tagesgeld",
      "Tool 5 'Brutto-Netto Solo' für Steuerlast-Vorschau",
    ],
    zeitaufwand: "1 Std Setup, dann automatisch",
    toolLink: { route: "/cockpit/brutto-netto-solo", label: "Brutto-Netto Solo" },
    triggers: {},
  },
  {
    id: "t90-4-versicherungs-check",
    phase: "T90",
    pflicht: "kann",
    titel: "Versicherungs-Check (BU, Inhalt, Cyber, Rechtsschutz)",
    beschreibung: "Was fehlt noch? Berufsunfähigkeit ist die wichtigste — bei Solo kein AG-Anteil, ALG-Anwartschaft weg.",
    schritte: [
      "Berufsunfähigkeitsversicherung (BU) wichtigster Baustein",
      "Inhalt: Büroausstattung gegen Diebstahl/Feuer",
      "Cyber: bei IT/Online-Geschäft",
      "Rechtsschutz: oft sinnvoll (Verträge, Forderungen)",
    ],
    zeitaufwand: "3-5 Std",
    kostenHint: "BU 50-150 €/Mon, Rest 20-60 €/Mon",
    triggers: {},
  },
  {
    id: "t90-5-quartal-vorausschau",
    phase: "T90",
    pflicht: "soll",
    titel: "Quartals-Steuerschätzung machen",
    beschreibung: "Tool 'Quartals-Steuerschätzung' für realistische Vorschau auf ESt-Vorauszahlungen.",
    schritte: [
      "Tool 'Quartals-Steuer' mit Hochrechnung 3 Monate",
      "ESt-Vorauszahlungen anpassen lassen (FA-Antrag)",
      "Steuer-Rücklage prüfen und ggf. nachschießen",
    ],
    zeitaufwand: "1-2 Std",
    toolLink: { route: "/cockpit/quartals-steuer", label: "Quartals-Steuer" },
    triggers: {},
  },
  {
    id: "t90-6-mitarbeiter-vorbereitung",
    phase: "T90",
    pflicht: "kann",
    titel: "Mitarbeiter / Minijob vorbereiten (wenn geplant)",
    beschreibung: "Vor erster Einstellung: Betriebsnummer beantragen, Lohnbüro klären, Pflichten verstehen.",
    schritte: [
      "Betriebsnummer bei BfA beantragen (kostenlos, 5 Min)",
      "Lohn-Software / Lohnbüro / DATEV-Lohn auswählen",
      "Sozialversicherung: AG-Anteile, U1/U2-Umlagen",
      "Bei Minijob: Pauschalabgaben 30 % Mini-Job-Zentrale",
    ],
    zeitaufwand: "3-5 Std",
    externalLink: { url: "https://www.arbeitsagentur.de/unternehmen/betriebsnummer", label: "Betriebsnummer beantragen" },
    triggers: { mitarbeiter: true },
  },
];

export const PHASE_LABELS: Record<Phase, { titel: string; subtitel: string }> = {
  T0: { titel: "T0: Vor der Anmeldung", subtitel: "Vorbereitung + Anmeldung" },
  T30: { titel: "T30: Erste 30 Tage", subtitel: "Setup + Pflicht-Schritte" },
  T60: { titel: "T60: 31-60 Tage", subtitel: "Routine etablieren" },
  T90: { titel: "T90: 61-90 Tage", subtitel: "Konsolidierung + langfristig" },
};

// Aufgabe ist relevant für User?
export function taskMatches(task: RoadmapTask, setup: UserSetup): boolean {
  for (const [k, v] of Object.entries(task.triggers)) {
    if (v === undefined) continue;
    const userVal = setup[k as keyof UserSetup];
    if (Array.isArray(v)) {
      if (!v.includes(userVal as never)) return false;
    } else {
      if (userVal !== v) return false;
    }
  }
  return true;
}
