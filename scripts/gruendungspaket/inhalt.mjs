// Gründungspaket 2026 – Inhalt aller Dokumente (Freigabe #5, Betreiber 26.10.2026).
//
// Liegt bewusst NICHT unter src/: Was im Frontend-Bundle steht, kann jeder
// lesen. Die Seite /gruendungspaket bekommt nur Inhaltsverzeichnis und
// Quellen (src/data/gruendungspaket.ts); der Test gruendungspaket.test.ts
// prüft, dass beide Listen übereinstimmen.
//
// Regel für jeden Satz: belegbar (Kodex § 7). Jede Rechtsaussage trägt eine
// Quelle aus QUELLEN, live geprüft am STAND. Was nicht belegt ist, steht als
// „Tipp“ oder „Bei deiner Gemeinde/deinem Finanzamt nachfragen“ da – nie als
// Rechtslage. Keine Steuer- oder Rechtsberatung.
//
// Blocktypen: h (Überschrift), p (Absatz), liste (Aufzählung), check
// (Checkliste mit Kästchen), tabelle ({kopf, zeilen}), quelle (Quellen-IDs),
// rechnung (Rechnungsvorlage, siehe RECHNUNGEN).

export const STAND = "26.10.2026";
export const PRODUKT = "GründerX Gründungspaket 2026";

export const QUELLEN = {
  gewo14: { titel: "§ 14 Gewerbeordnung (Anzeigepflicht)", url: "https://www.gesetze-im-internet.de/gewo/__14.html" },
  ao138: { titel: "§ 138 Abgabenordnung (Anzeigen über die Erwerbstätigkeit)", url: "https://www.gesetze-im-internet.de/ao_1977/__138.html" },
  ustg14: { titel: "§ 14 Umsatzsteuergesetz (Ausstellung von Rechnungen)", url: "https://www.gesetze-im-internet.de/ustg_1980/__14.html" },
  ustg19: { titel: "§ 19 Umsatzsteuergesetz (Kleinunternehmer)", url: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
  ustg27: { titel: "§ 27 Abs. 38 Umsatzsteuergesetz (Übergangsregeln E-Rechnung)", url: "https://www.gesetze-im-internet.de/ustg_1980/__27.html" },
  ustg27a: { titel: "§ 27a Umsatzsteuergesetz (Umsatzsteuer-Identifikationsnummer)", url: "https://www.gesetze-im-internet.de/ustg_1980/__27a.html" },
  ustdv33: { titel: "§ 33 UStDV (Rechnungen über Kleinbeträge)", url: "https://www.gesetze-im-internet.de/ustdv_1980/__33.html" },
  ustdv34a: { titel: "§ 34a UStDV (Rechnungen von Kleinunternehmern)", url: "https://www.gesetze-im-internet.de/ustdv_1980/__34a.html" },
  bmf2025: {
    titel: "BMF-Schreiben vom 15.10.2025, III C 2 - S 7287-a/00019/007/243 (E-Rechnung, Änderung des UStAE)",
    url: "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Umsatzsteuer/Umsatzsteuer-Anwendungserlass/2025-10-15-einfuehrung-obligatorische-e-rechnung.html",
  },
  elster: { titel: "ELSTER-Hilfe: Registrierung bei Mein ELSTER", url: "https://www.elster.de/eportal/helpGlobal?themaGlobal=help_registrierung" },
  bzstFaq: {
    titel: "BZSt: Wo kann eine USt-IdNr. beantragt werden?",
    url: "https://www.bzst.de/DE/Unternehmen/Identifikationsnummern/Umsatzsteuer-Identifikationsnummer/FAQ/FAQ_Vergabe/FAQTexte/faq_003.html",
  },
  bzstVergabe: {
    titel: "BZSt: Vergabe und Erteilung der USt-IdNr.",
    url: "https://www.bzst.de/DE/Unternehmen/Identifikationsnummern/Umsatzsteuer-Identifikationsnummer/Vergabe_USt_IdNr/vergabe_ust_idnr_node.html",
  },
};

export const HINWEIS =
  "Dieses Paket ist eine Arbeitshilfe und keine Steuer- oder Rechtsberatung. Es gibt die Rechtslage zum Stand " +
  STAND + " wieder, belegt mit den genannten amtlichen Quellen. Prüfe vor jeder Verwendung, ob sich etwas geändert " +
  "hat, und hole dir in Zweifelsfällen Rat bei einer Steuerberaterin, einem Steuerberater oder deinem Finanzamt.";

// ------------------------------------------------------------------------------------------------
// Rechnungsvorlagen: gemeinsame Bausteine, je Variante die Pflichtangaben.
// ------------------------------------------------------------------------------------------------
export const RECHNUNGEN = {
  regel: {
    titel: "Rechnung (Regelbesteuerung)",
    untertitel: "Pflichtangaben nach § 14 Abs. 4 UStG",
    nummer: true,
    leistungsdatum: true,
    steuer: "regel",
    fussnote:
      "Pflichtangaben nach § 14 Abs. 4 Satz 1 UStG: vollständiger Name und Anschrift beider Seiten, Steuernummer oder " +
      "USt-IdNr., Ausstellungsdatum, fortlaufende Rechnungsnummer, Menge und Art bzw. Umfang und Art der Leistung, " +
      "Zeitpunkt der Leistung, Entgelt nach Steuersätzen aufgeschlüsselt, Steuersatz und Steuerbetrag. " +
      "Achtung: An andere Unternehmen im Inland ist seit 2025 grundsätzlich eine E-Rechnung zu stellen; diese Word-Vorlage " +
      "ist eine „sonstige Rechnung“ und nur in den Übergangsfällen nach § 27 Abs. 38 UStG zulässig (siehe Leitfaden E-Rechnung).",
    quellen: ["ustg14", "ustg27"],
  },
  klein: {
    titel: "Rechnung (Kleinunternehmer nach § 19 UStG)",
    untertitel: "Pflichtangaben nach § 34a UStDV",
    nummer: false,
    leistungsdatum: false,
    steuer: "klein",
    fussnote:
      "Pflichtangaben nach § 34a UStDV: vollständiger Name und Anschrift beider Seiten, Steuernummer, USt-IdNr. oder " +
      "Kleinunternehmer-Identifikationsnummer, Ausstellungsdatum, Menge und Art bzw. Umfang und Art der Leistung, " +
      "Gesamtentgelt und ein Hinweis auf die Steuerbefreiung nach § 19 UStG. Eine fortlaufende Nummer ist nicht vorgeschrieben " +
      "(Abschnitt 14.5 Abs. 14 UStAE i. d. F. des BMF-Schreibens vom 15.10.2025) – für deine eigene Ordnung trotzdem sinnvoll. " +
      "Kleinunternehmer dürfen immer als Papier- oder PDF-Rechnung abrechnen; für PDF braucht es das Einverständnis des Empfängers.",
    quellen: ["ustdv34a", "ustg19", "bmf2025"],
  },
  kleinbetrag: {
    titel: "Rechnung über einen Kleinbetrag (bis 250 Euro brutto)",
    untertitel: "Pflichtangaben nach § 33 UStDV",
    nummer: false,
    leistungsdatum: false,
    steuer: "kleinbetrag",
    fussnote:
      "Pflichtangaben nach § 33 UStDV für Rechnungen, deren Gesamtbetrag 250 Euro nicht übersteigt: vollständiger Name und " +
      "Anschrift des leistenden Unternehmers, Ausstellungsdatum, Menge und Art bzw. Umfang und Art der Leistung, Entgelt und " +
      "Steuerbetrag in einer Summe sowie der Steuersatz (bei Steuerbefreiung ein Hinweis darauf). Gilt nicht für Leistungen nach " +
      "§§ 3c, 6a und 13b UStG. Kleinbetragsrechnungen dürfen immer als sonstige Rechnung (Papier/PDF) gestellt werden.",
    quellen: ["ustdv33", "bmf2025"],
  },
};

// ------------------------------------------------------------------------------------------------
// Dokumente
// ------------------------------------------------------------------------------------------------
export const DOKUMENTE = [
  {
    datei: "00-Uebersicht-und-Quellen",
    titel: "Übersicht, Reihenfolge und Quellen",
    formate: ["pdf"],
    bloecke: [
      { typ: "p", text: "Willkommen im " + PRODUKT + ". Hier ist alles, was du für die ersten Behördenschritte und deine ersten Rechnungen brauchst – in der Reihenfolge, in der es dran ist." },
      { typ: "h", text: "Die Reihenfolge in Kurzform" },
      {
        typ: "liste",
        punkte: [
          "1. Gewerbe anmelden – gleichzeitig mit dem Beginn (§ 14 Abs. 1 GewO). Freiberufler melden sich stattdessen direkt beim Finanzamt (§ 138 Abs. 1 AO).",
          "2. ELSTER-Zugang einrichten – ohne Steuernummer geht zunächst nur die Registrierung mit E-Mail, die genau für den Fragebogen reicht.",
          "3. Fragebogen zur steuerlichen Erfassung elektronisch abgeben – innerhalb eines Monats (§ 138 Abs. 1b, Abs. 4 AO).",
          "4. USt-IdNr. gleich im Fragebogen mit beantragen, wenn du sie brauchst (BZSt).",
          "5. Rechnungen schreiben – mit der passenden Vorlage: Regelbesteuerung, Kleinunternehmer oder Kleinbetrag.",
          "6. E-Rechnungen empfangen können – Pflicht seit 01.01.2025, auch für Kleinunternehmer; ein normales E-Mail-Postfach reicht.",
        ],
      },
      { typ: "h", text: "Was im Paket steckt" },
      {
        typ: "tabelle",
        kopf: ["Datei", "Wofür"],
        zeilen: [
          ["01–03 Rechnungsvorlagen (Word + PDF)", "Regelbesteuerung, Kleinunternehmer, Kleinbetrag bis 250 €"],
          ["04 Leitfaden E-Rechnung (PDF + Word)", "Fristen 2025–2028, Formate, Ausnahmen"],
          ["05 Checkliste Gewerbeanmeldung", "Was du mitbringst, was danach passiert"],
          ["06 Checkliste Fragebogen", "Angaben vorbereiten, Frist, USt-IdNr.-Feld"],
          ["07 Checkliste ELSTER-Zugang", "Welche Registrierung, Ablauf, Sicherung"],
          ["08 Checkliste USt-IdNr.", "Drei Wege zum Antrag, Zustellung per Post"],
          ["09 Gründer-Tracker (Excel)", "Rechnungsausgang, Kleinunternehmer-Grenzen, Fristen"],
        ],
      },
      { typ: "h", text: "Wichtig" },
      { typ: "p", text: HINWEIS },
      { typ: "h", text: "Quellen (live geprüft am " + STAND + ")" },
      { typ: "quelle", ids: Object.keys(QUELLEN) },
    ],
  },
  { datei: "01-Rechnungsvorlage-Regelbesteuerung", titel: RECHNUNGEN.regel.titel, formate: ["docx", "pdf"], rechnung: "regel" },
  { datei: "02-Rechnungsvorlage-Kleinunternehmer", titel: RECHNUNGEN.klein.titel, formate: ["docx", "pdf"], rechnung: "klein" },
  { datei: "03-Rechnungsvorlage-Kleinbetrag", titel: RECHNUNGEN.kleinbetrag.titel, formate: ["docx", "pdf"], rechnung: "kleinbetrag" },
  {
    datei: "04-Leitfaden-E-Rechnung",
    titel: "Leitfaden E-Rechnung 2025–2028",
    formate: ["pdf", "docx"],
    bloecke: [
      { typ: "p", text: "Seit 2025 unterscheidet das Gesetz zwei Arten von Rechnungen: die E-Rechnung in einem strukturierten elektronischen Format, das eine elektronische Verarbeitung ermöglicht, und die „sonstige Rechnung“ – Papier oder ein anderes elektronisches Format wie ein einfaches PDF (§ 14 Abs. 1 UStG)." },
      { typ: "quelle", ids: ["ustg14"] },
      { typ: "h", text: "Wann eine E-Rechnung Pflicht ist" },
      { typ: "p", text: "Für Leistungen an ein anderes Unternehmen für dessen Unternehmen ist eine E-Rechnung zu stellen, wenn beide im Inland ansässig sind (§ 14 Abs. 2 Satz 2 Nr. 1 UStG). Die Rechnung ist innerhalb von sechs Monaten nach der Leistung auszustellen. An Privatkunden besteht diese Pflicht nicht." },
      { typ: "quelle", ids: ["ustg14"] },
      { typ: "h", text: "Die Übergangsfristen (§ 27 Abs. 38 UStG)" },
      {
        typ: "tabelle",
        kopf: ["Leistung ausgeführt", "Statt E-Rechnung noch erlaubt", "Bedingung"],
        zeilen: [
          ["01.01.2025 – 31.12.2026", "Papier oder anderes elektronisches Format (z. B. PDF)", "PDF nur mit Zustimmung des Empfängers"],
          ["01.01.2027 – 31.12.2027", "Papier oder anderes elektronisches Format", "Gesamtumsatz des Ausstellers im Vorjahr höchstens 800.000 €; PDF nur mit Zustimmung"],
          ["01.01.2027 – 31.12.2027", "EDI-Verfahren (EU-Empfehlung 94/820/EG)", "Zustimmung des Empfängers"],
          ["ab 01.01.2028", "keine Übergangsregel mehr", "E-Rechnung bei inländischen B2B-Umsätzen"],
        ],
      },
      { typ: "quelle", ids: ["ustg27"] },
      { typ: "h", text: "Empfangen musst du schon jetzt" },
      { typ: "p", text: "Inländische Unternehmer müssen E-Rechnungen empfangen können – auch Kleinunternehmer. Ein eigenes Postfach nur für E-Rechnungen ist nicht nötig; ein normales E-Mail-Postfach reicht (Abschnitt 14.1 Abs. 5 UStAE i. d. F. des BMF-Schreibens vom 15.10.2025)." },
      { typ: "quelle", ids: ["bmf2025"] },
      { typ: "h", text: "Ausnahmen: hier reicht immer Papier oder PDF" },
      {
        typ: "liste",
        punkte: [
          "Rechnungen über Kleinbeträge bis 250 € Gesamtbetrag (§ 33 UStDV).",
          "Rechnungen von Kleinunternehmern nach § 19 UStG (§ 34a UStDV).",
          "Fahrausweise für die Personenbeförderung (§ 34 UStDV).",
          "Für ein PDF statt Papier braucht es die Zustimmung des Empfängers; sie bedarf keiner besonderen Form (BMF-Schreiben vom 15.10.2025).",
        ],
      },
      { typ: "quelle", ids: ["ustdv33", "ustdv34a", "bmf2025"] },
      { typ: "h", text: "Welche Formate zählen" },
      { typ: "p", text: "Laut BMF erfüllen der Standard XRechnung und – unter bestimmten Voraussetzungen – das hybride Format ZUGFeRD ab Version 2.0.1 die Anforderungen; ausgenommen sind die ZUGFeRD-Profile MINIMUM und BASIC-WL. Ein PDF aus Word ist keine E-Rechnung." },
      { typ: "quelle", ids: ["bmf2025"] },
      { typ: "h", text: "Was das für dich heißt" },
      {
        typ: "check",
        punkte: [
          "Prüfe, ob du Kleinunternehmer bist (Vorjahr höchstens 25.000 €, laufendes Jahr höchstens 100.000 € Gesamtumsatz, § 19 Abs. 1 UStG). Dann darfst du weiter mit Papier/PDF abrechnen.",
          "Stellst du Rechnungen an Unternehmen im Inland: Bis Ende 2026 ist PDF mit Zustimmung noch erlaubt, 2027 nur bis 800.000 € Vorjahresumsatz.",
          "Richte jetzt den Empfang ein: Adresse für Rechnungen festlegen und Lieferanten mitteilen.",
          "Wähle bis spätestens 2027/2028 ein Programm, das XRechnung oder ZUGFeRD (ab 2.0.1, nicht MINIMUM/BASIC-WL) erzeugt.",
        ],
      },
      { typ: "quelle", ids: ["ustg19", "ustg27", "bmf2025"] },
    ],
  },
  {
    datei: "05-Checkliste-Gewerbeanmeldung",
    titel: "Checkliste Gewerbeanmeldung",
    formate: ["pdf", "docx"],
    bloecke: [
      { typ: "p", text: "Wer einen stehenden Gewerbebetrieb anfängt, muss das der zuständigen Behörde gleichzeitig anzeigen (§ 14 Abs. 1 GewO). Zuständig ist deine Gemeinde bzw. Stadt; viele bieten die Anmeldung online an. Die Gemeinde gibt die Anmeldung an das Finanzamt weiter (§ 138 Abs. 1 AO)." },
      { typ: "quelle", ids: ["gewo14", "ao138"] },
      { typ: "h", text: "Vorher klären" },
      {
        typ: "check",
        punkte: [
          "Bin ich gewerblich tätig oder freiberuflich? Freiberufler melden kein Gewerbe an, sondern die Aufnahme der Tätigkeit beim Finanzamt (§ 138 Abs. 1 AO).",
          "Braucht mein Gewerbe vorher eine Erlaubnis? Bei der Gemeinde nachfragen, bevor du anmeldest.",
          "Wo ist der Sitz bzw. die Betriebsstätte? Danach richtet sich die zuständige Gemeinde.",
          "Startdatum festlegen – die Anzeige erfolgt gleichzeitig mit dem Beginn.",
        ],
      },
      { typ: "h", text: "Bereitlegen" },
      {
        typ: "check",
        punkte: [
          "Personalausweis oder Reisepass (welche Nachweise genau verlangt werden, steht auf der Seite deiner Gemeinde).",
          "Genaue Beschreibung der Tätigkeit in einem Satz – sie landet beim Finanzamt und bei der IHK/HWK.",
          "Anschrift der Betriebsstätte, Datum des Beginns.",
          "Bei erlaubnispflichtigen Tätigkeiten: Erlaubnis bzw. Nachweis.",
          "Gebühr: Die Höhe legt die Gemeinde fest – vorher auf ihrer Website nachsehen.",
        ],
      },
      { typ: "h", text: "Danach passiert" },
      {
        typ: "check",
        punkte: [
          "Bestätigung der Gewerbeanmeldung (Gewerbeschein) aufheben.",
          "Das Finanzamt erfährt von der Gemeinde von deiner Anmeldung (§ 138 Abs. 1 AO).",
          "Fragebogen zur steuerlichen Erfassung innerhalb eines Monats elektronisch abgeben (§ 138 Abs. 1b, Abs. 4 AO) – siehe Checkliste 06.",
          "Tipp: Häufig meldet sich danach die IHK oder Handwerkskammer – das ist ein normaler Schritt nach der Anmeldung.",
        ],
      },
      { typ: "quelle", ids: ["gewo14", "ao138"] },
    ],
  },
  {
    datei: "06-Checkliste-Fragebogen-steuerliche-Erfassung",
    titel: "Checkliste Fragebogen zur steuerlichen Erfassung",
    formate: ["pdf", "docx"],
    bloecke: [
      { typ: "p", text: "Bei Betriebseröffnung oder Aufnahme einer freiberuflichen Tätigkeit verlangt das Finanzamt weitere Auskünfte – den Fragebogen zur steuerlichen Erfassung. Er ist als amtlicher Datensatz elektronisch zu übermitteln, nur bei unbilliger Härte auf Antrag auf Papier (§ 138 Abs. 1b AO). Frist: innerhalb eines Monats nach dem meldepflichtigen Ereignis (§ 138 Abs. 4 AO)." },
      { typ: "quelle", ids: ["ao138"] },
      { typ: "h", text: "Zugang" },
      { typ: "p", text: "Ohne Steuernummer kannst du dich bei Mein ELSTER nur mit E-Mail registrieren – dann steht dir genau der Fragebogen zur steuerlichen Erfassung zur Verfügung (ELSTER-Hilfe). Siehe Checkliste 07." },
      { typ: "quelle", ids: ["elster"] },
      { typ: "h", text: "Angaben vorbereiten (Tipp: vor dem Ausfüllen sammeln)" },
      {
        typ: "check",
        punkte: [
          "Steuer-Identifikationsnummer und persönliche Daten.",
          "Bankverbindung für das Geschäft.",
          "Tätigkeit, Beginn, Anschrift der Betriebsstätte, Datum der Gewerbeanmeldung.",
          "Deine Schätzung von Umsatz und Gewinn für das Gründungsjahr und das Folgejahr – realistisch, nicht geschönt.",
          "Entscheidung Kleinunternehmerregelung ja/nein (Grenzen: Vorjahr 25.000 €, laufendes Jahr 100.000 €, § 19 Abs. 1 UStG).",
          "USt-IdNr. benötigt? Dann das entsprechende Feld im Fragebogen ankreuzen (BZSt).",
        ],
      },
      { typ: "quelle", ids: ["ustg19", "bzstFaq"] },
      { typ: "h", text: "Nach dem Absenden" },
      {
        typ: "check",
        punkte: [
          "Übermittlungsprotokoll speichern.",
          "Steuernummer abwarten – das Finanzamt teilt sie dir mit. Danach kannst du ELSTER mit Steuernummer nutzen.",
          "USt-IdNr. kommt getrennt vom BZSt per Post (siehe Checkliste 08).",
        ],
      },
      { typ: "quelle", ids: ["bzstFaq"] },
    ],
  },
  {
    datei: "07-Checkliste-ELSTER-Zugang",
    titel: "Checkliste ELSTER-Zugang",
    formate: ["pdf", "docx"],
    bloecke: [
      { typ: "p", text: "Mein ELSTER kennt mehrere Login-Arten: Zertifikatsdatei (.pfx mit Passwort), ElsterSecure (App mit QR-Code), Personalausweis über die AusweisApp sowie Sicherheitsstick und Signaturkarte. Für eine Organisation wird bei der Registrierung deren Steuernummer gebraucht (ELSTER-Hilfe)." },
      { typ: "quelle", ids: ["elster"] },
      { typ: "h", text: "Welche Registrierung passt?" },
      {
        typ: "tabelle",
        kopf: ["Deine Lage", "Registrierung"],
        zeilen: [
          ["Noch keine Steuernummer fürs Gewerbe", "Registrierung nur mit E-Mail – reicht für den Fragebogen zur steuerlichen Erfassung"],
          ["Steuer-ID vorhanden, Privatperson/Einzelunternehmen", "Registrierung mit Identifikationsnummer, z. B. Zertifikatsdatei"],
          ["Organisation mit eigener Steuernummer", "Registrierung mit der Steuernummer der Organisation"],
        ],
      },
      { typ: "quelle", ids: ["elster"] },
      { typ: "h", text: "Ablauf Zertifikatsdatei" },
      {
        typ: "check",
        punkte: [
          "Persönliche Angaben eingeben (Identifikationsnummer bzw. Steuernummer der Organisation, Geburtsdatum, E-Mail, Benutzername).",
          "E-Mail mit dem Verifizierungscode bestätigen.",
          "Aktivierungs-ID kommt per E-Mail, Aktivierungs-Code per Brief – der Brief kann einige Tage dauern; plane das vor der Monatsfrist des Fragebogens ein.",
          "Mit beiden Angaben die Zertifikatsdatei erstellen und einen Test-Login machen.",
          "Tipp: Sicherungskopie der .pfx-Datei an einem zweiten Ort ablegen und das Passwort sicher verwahren.",
        ],
      },
      { typ: "quelle", ids: ["elster"] },
    ],
  },
  {
    datei: "08-Checkliste-USt-IdNr",
    titel: "Checkliste Umsatzsteuer-Identifikationsnummer",
    formate: ["pdf", "docx"],
    bloecke: [
      { typ: "p", text: "Die USt-IdNr. erteilt das Bundeszentralamt für Steuern (BZSt) auf Antrag; der Antrag nennt Name, Anschrift und die Steuernummer, unter der du umsatzsteuerlich geführt wirst (§ 27a Abs. 1 UStG). Du brauchst sie z. B. für Geschäfte mit Unternehmen in anderen EU-Staaten." },
      { typ: "quelle", ids: ["ustg27a"] },
      { typ: "h", text: "Drei Wege zum Antrag (BZSt)" },
      {
        typ: "check",
        punkte: [
          "Neugründung: im Fragebogen zur steuerlichen Erfassung das Feld für die USt-IdNr. ankreuzen – das Finanzamt leitet den Antrag ans BZSt weiter.",
          "Bereits steuerlich erfasst: Online-Formular des BZSt („USt-IdNr. Internet Vergabeverfahren“).",
          "Schriftlich: über das Kontaktformular des BZSt oder per Post an den Dienstsitz Saarlouis, 66738 Saarlouis.",
        ],
      },
      { typ: "quelle", ids: ["bzstFaq"] },
      { typ: "h", text: "Danach" },
      {
        typ: "check",
        punkte: [
          "Die Nummer kommt per Post vom BZSt – bis dahin keine Nummer auf Rechnungen „ausdenken“.",
          "Nummer in Rechnungsvorlage 01 eintragen, wo du sie brauchst (Pflichtangabe nach § 14 Abs. 4 Nr. 2 UStG: Steuernummer oder USt-IdNr.).",
          "Bei EU-Geschäftspartnern deren USt-IdNr. beim BZSt bestätigen lassen (Tipp).",
        ],
      },
      { typ: "quelle", ids: ["bzstVergabe", "ustg14"] },
    ],
  },
  { datei: "09-Gruender-Tracker", titel: "Gründer-Tracker: Rechnungen, Kleinunternehmer-Grenzen, Fristen", formate: ["xlsx"], tracker: true },
];

/** Inhaltsverzeichnis (für src/data/gruendungspaket.ts und den Test). */
export const INHALTSVERZEICHNIS = DOKUMENTE.map((d) => ({ datei: d.datei, titel: d.titel, formate: d.formate }));
