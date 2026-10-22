// ===================================================================
// Vorlagen-Bibliothek (/vorlagen): Verträge, Schreiben und Formulare für
// Gründer – kostenlos gegen eine BESTÄTIGTE E-Mail-Adresse (Double-Opt-in,
// siehe src/lib/vorlagen/freigabe.ts und die Edge Functions
// vorlage-anfordern / vorlage-bestaetigen).
//
// Jede Vorlage ist reiner Text mit Platzhaltern in eckigen Klammern
// ("[Name der Gesellschaft]"). Kein Wizard, kein LLM: Der Nutzer lädt die
// Vorlage als PDF, Word (.docx) oder Text und füllt sie selbst aus.
//
// Diese Dateien importieren KEINE React- oder lucide-Module: Der Katalog
// (slug → Titel) wird per scripts/generate-vorlagen-katalog.mjs in
// supabase/functions/_shared/vorlagenKatalog.ts kopiert, damit die
// Bestätigungsmail den Titel kennt, ohne das Frontend zu laden.
// ===================================================================

export type VorlagenKategorie =
  | "gesellschaft"
  | "kauf"
  | "arbeit"
  | "dienstleistung"
  | "geheimhaltung"
  | "miete"
  | "finanzen"
  | "ecommerce"
  | "verwaltung";

export interface VorlagenFaq {
  q: string;
  a: string;
}

export interface VorlagenKategorieInfo {
  key: VorlagenKategorie;
  titel: string;
  kurz: string;
  /** Name eines lucide-Icons; die Zuordnung passiert im Frontend. */
  icon: string;
  /** Eigene Seite /vorlagen/kategorie/<key>: Titel ≤ 60 Zeichen mit „| GründerX“, Description 120–160. */
  seo: { title: string; description: string };
  /** Einleitung der Kategorieseite, 2 bis 3 Absätze Fließtext. */
  intro: string[];
  /** 3 Fragen zur Kategorie (Kategorieseite). */
  faqs: VorlagenFaq[];
}

export const VORLAGEN_KATEGORIEN: VorlagenKategorieInfo[] = [
  {
    key: "gesellschaft",
    titel: "Gesellschaft & Gründung",
    kurz: "GbR, UG, GmbH, Gesellschafter, Vesting",
    icon: "Users",
    seo: {
      title: "GbR-, UG- & GmbH-Verträge: Vorlagen kostenlos | GründerX",
      description:
        "Gesellschaftsvertrag für GbR, UG und GmbH, Gesellschaftervereinbarung, Vesting, Beschlüsse: kostenlose Vorlagen nach deutschem Recht als Word, PDF und Text.",
    },
    intro: [
      "Wer zu zweit oder im Team gründet, braucht vor dem ersten Kunden eine schriftliche Regelung: Wer bringt was ein, wer entscheidet, wie wird der Gewinn verteilt und was passiert, wenn jemand aussteigt. Das Gesetz liefert für die GbR seit dem MoPeG (1. Januar 2024) zwar Grundregeln, aber sie passen selten zum eigenen Projekt. Für UG und GmbH ist der Gesellschaftsvertrag ohnehin Pflicht und wird notariell beurkundet.",
      "Diese Kategorie enthält die Verträge rund um Gründung und Gesellschafter: den GbR-Gesellschaftsvertrag nach neuem Recht, Mustersatzungen für UG und GmbH als Vorbereitung auf den Notartermin, Gesellschaftervereinbarungen mit Vesting für Startups, Beschlussvorlagen, Geschäftsführer-Anstellungsverträge und Gründungsprotokolle. Jede Vorlage ist reiner Text mit Platzhaltern in eckigen Klammern, den du als Word, PDF oder Text herunterlädst und selbst ausfüllst.",
    ],
    faqs: [
      {
        q: "Brauche ich für eine GbR einen schriftlichen Vertrag?",
        a: "Nein, eine GbR entsteht auch durch Handschlag. Ohne Vertrag gelten aber die gesetzlichen Regeln der §§ 705 ff. BGB, und die regeln weder Arbeitszeiten noch Entnahmen oder Wettbewerb. Ein schriftlicher Vertrag verhindert genau die Streitpunkte, die Teams am häufigsten auseinanderbringen.",
      },
      {
        q: "Kann ich die UG- oder GmbH-Satzung aus der Vorlage einfach beim Notar einreichen?",
        a: "Ja, als Entwurf. Der Notar prüft und beurkundet den Vertrag, erst damit wird er wirksam. Mit einem vorbereiteten Entwurf sparst du Besprechungszeit und damit oft Notarkosten. Für Standardgründungen mit bis zu drei Gesellschaftern gibt es außerdem das gesetzliche Musterprotokoll.",
      },
      {
        q: "Was ist der Unterschied zwischen Gesellschaftsvertrag und Gesellschaftervereinbarung?",
        a: "Der Gesellschaftsvertrag (Satzung) ist das öffentliche Grunddokument der Gesellschaft. Die Gesellschaftervereinbarung ist ein zusätzlicher, nicht veröffentlichter Vertrag zwischen den Gesellschaftern, etwa zu Vesting, Mitverkaufsrechten oder Wettbewerbsverboten. Beides zusammen ergibt das Regelwerk eines Startups.",
      },
    ],
  },
  {
    key: "kauf",
    titel: "Kaufverträge",
    kurz: "Waren, Fahrzeuge, Inventar, Unternehmen, Domains",
    icon: "ShoppingCart",
    seo: {
      title: "Kaufvertrag Vorlagen kostenlos (Word & PDF) | GründerX",
      description:
        "Kaufvertrag-Muster für Waren, Gebrauchtes, Fahrzeuge, Inventar, Domains und Unternehmenskauf: kostenlose Vorlagen nach deutschem Recht als Word, PDF und Text.",
    },
    intro: [
      "Ein Kaufvertrag kommt nach § 433 BGB schon durch Angebot und Annahme zustande, auch mündlich. Schriftlich wird er dann wichtig, wenn Geld, Zustand und Übergabe sauber belegt sein sollen: beim Kauf von gebrauchten Maschinen, beim Firmenwagen, beim Inventar eines Ladens oder wenn ein ganzes Unternehmen den Besitzer wechselt. Ohne Vertrag streiten die Parteien später über Mängel, Gewährleistung und darüber, wann das Risiko übergegangen ist.",
      "Hier findest du Kaufvertrag-Vorlagen für die typischen Fälle in Gründung und Betrieb: allgemeine Warenkäufe zwischen Unternehmern, Privatverkäufe mit Gewährleistungsausschluss, Fahrzeuge, Inventar- und Betriebsübernahmen, Domains und Online-Shops sowie Rahmenverträge für wiederkehrende Lieferungen. Jede Vorlage nennt Kaufgegenstand, Preis, Übergabe, Gewährleistung und Eigentumsvorbehalt und lässt sich als Word-Datei anpassen.",
    ],
    faqs: [
      {
        q: "Darf ich die Gewährleistung im Kaufvertrag ausschließen?",
        a: "Zwischen Privatpersonen und beim Verkauf von Unternehmer an Unternehmer ist ein Ausschluss weitgehend möglich, nicht aber für arglistig verschwiegene Mängel. Verkaufst du als Unternehmer an Verbraucher, gilt die gesetzliche Gewährleistung von zwei Jahren, bei Gebrauchtware verkürzbar auf ein Jahr.",
      },
      {
        q: "Brauche ich für einen Kaufvertrag einen Notar?",
        a: "Nur bei Grundstücken und Immobilien (§ 311b BGB) sowie beim Verkauf von GmbH-Anteilen (§ 15 GmbHG). Bewegliche Sachen, Fahrzeuge, Inventar, Domains und auch ein Unternehmenskauf als Asset Deal ohne Grundstück lassen sich mit einem einfachen schriftlichen Vertrag abwickeln.",
      },
      {
        q: "Was gehört in jeden Kaufvertrag?",
        a: "Die Parteien mit Anschrift, der Kaufgegenstand so genau, dass kein Zweifel bleibt (Seriennummer, Fahrgestellnummer, Inventarliste), der Preis mit Fälligkeit und Zahlungsweg, Ort und Zeitpunkt der Übergabe, Regeln zu Gewährleistung und Eigentumsvorbehalt sowie Datum und Unterschriften beider Seiten.",
      },
    ],
  },
  {
    key: "arbeit",
    titel: "Arbeit & Personal",
    kurz: "Arbeitsverträge, Minijob, Praktikum, Kündigung, Zeugnis",
    icon: "Briefcase",
    seo: {
      title: "Arbeitsvertrag & Personal: Vorlagen kostenlos | GründerX",
      description:
        "Arbeitsvertrag, Minijob, Praktikum, Werkstudent, Kündigung, Zeugnis, Aufhebungsvertrag: kostenlose Vorlagen für Gründer nach deutschem Arbeitsrecht als Word und PDF.",
    },
    intro: [
      "Die erste Einstellung ist für viele Gründer der Moment, in dem aus dem Projekt ein Arbeitgeber wird. Seit der Reform des Nachweisgesetzes 2022 musst du die wesentlichen Vertragsbedingungen schriftlich festhalten, von der Arbeitszeit über die Vergütung bis zur Kündigungsfrist. Fehlt das, drohen Bußgelder und im Streit gilt die für dich ungünstigere Auslegung.",
      "In dieser Kategorie liegen die Verträge für den Alltag mit Personal: unbefristete und befristete Arbeitsverträge, Minijob und Werkstudent, Praktikum, Aushilfen, Homeoffice-Vereinbarung, Abmahnung, Kündigung, Aufhebungsvertrag und Arbeitszeugnis. Alle Vorlagen berücksichtigen die Pflichtangaben des Nachweisgesetzes und lassen sich als Word-Datei an deinen Betrieb anpassen.",
    ],
    faqs: [
      {
        q: "Muss ein Arbeitsvertrag schriftlich sein?",
        a: "Ein Arbeitsvertrag ist auch mündlich wirksam. Das Nachweisgesetz verpflichtet dich aber, die wesentlichen Bedingungen spätestens am ersten Arbeitstag schriftlich und unterschrieben auszuhändigen. Befristungen müssen vor Arbeitsbeginn schriftlich vereinbart sein, sonst gilt der Vertrag als unbefristet.",
      },
      {
        q: "Welche Probezeit ist erlaubt?",
        a: "Höchstens sechs Monate. In dieser Zeit gilt beidseitig eine Kündigungsfrist von zwei Wochen. Bei befristeten Verträgen muss die Probezeit im Verhältnis zur Laufzeit und zur Art der Tätigkeit angemessen sein.",
      },
      {
        q: "Wie kündige ich rechtssicher?",
        a: "Nur schriftlich auf Papier mit eigenhändiger Unterschrift, nie per E-Mail oder Messenger. Die Kündigung muss dem Mitarbeiter zugehen, am besten persönlich gegen Empfangsbestätigung oder per Boten. Ab elf Mitarbeitern gilt das Kündigungsschutzgesetz, dann brauchst du einen anerkannten Grund.",
      },
    ],
  },
  {
    key: "dienstleistung",
    titel: "Dienstleistung & Projekte",
    kurz: "Freelancer, Beratung, Agentur, Werkvertrag",
    icon: "Handshake",
    seo: {
      title: "Dienstleistungs- & Werkvertrag Vorlagen kostenlos | GründerX",
      description:
        "Freelancer-Vertrag, Dienstleistungsvertrag, Werkvertrag, Agenturvertrag, Beratervertrag, Wartung: kostenlose Vorlagen für Selbstständige als Word, PDF und Text.",
    },
    intro: [
      "Ob du als Freelancer für Kunden arbeitest oder selbst Dienstleister beauftragst: Der Vertrag entscheidet, was geschuldet ist. Beim Dienstvertrag (§ 611 BGB) schuldest du die Tätigkeit, beim Werkvertrag (§ 631 BGB) den Erfolg, also das fertige Werk mit Abnahme und Gewährleistung. Wer das vertauscht, zahlt am Ende für Nachbesserungen oder bekommt sein Honorar nicht.",
      "Diese Kategorie bündelt Verträge für Projekte und laufende Zusammenarbeit: Freelancer- und Dienstleistungsverträge, Werkverträge für Websites und Software, Agentur- und Beraterverträge, Wartungs- und Supportverträge, Rahmenverträge mit Einzelabrufen und Auftragsbestätigungen. Alle Vorlagen enthalten Leistungsbeschreibung, Vergütung, Nutzungsrechte und eine Klausel zur Vermeidung von Scheinselbstständigkeit.",
    ],
    faqs: [
      {
        q: "Dienstvertrag oder Werkvertrag: Was passt zu meinem Projekt?",
        a: "Schuldest du ein konkretes Ergebnis mit Abnahme, etwa eine fertige Website oder ein Logo, passt der Werkvertrag. Schuldest du Zeit und Fachwissen ohne Erfolgsgarantie, etwa Beratung, Betreuung oder Support, passt der Dienstvertrag. Mischformen regelst du am besten mit einem Rahmenvertrag und Einzelaufträgen.",
      },
      {
        q: "Wie vermeide ich Scheinselbstständigkeit?",
        a: "Der Freelancer entscheidet selbst über Ort, Zeit und Art der Arbeit, nutzt eigene Arbeitsmittel, hat mehrere Auftraggeber und ist nicht in deinen Betrieb eingegliedert. Der Vertrag sollte das abbilden und keine Weisungs- oder Anwesenheitspflichten enthalten. Im Zweifel hilft ein Statusfeststellungsverfahren bei der Deutschen Rentenversicherung.",
      },
      {
        q: "Wem gehören die Nutzungsrechte an der Arbeit?",
        a: "Ohne Regelung behält der Freelancer das Urheberrecht und räumt nur die Rechte ein, die der Vertragszweck erfordert. Wer Ergebnisse frei verwenden, bearbeiten und weitergeben will, braucht eine ausdrückliche Klausel zur Übertragung ausschließlicher Nutzungsrechte, die alle Vorlagen hier enthalten.",
      },
    ],
  },
  {
    key: "geheimhaltung",
    titel: "Geheimhaltung & Rechte",
    kurz: "NDA, Lizenzen, Nutzungsrechte, Absichtserklärung",
    icon: "Lock",
    seo: {
      title: "NDA & Lizenzvertrag Vorlagen kostenlos | GründerX",
      description:
        "Geheimhaltungsvereinbarung (NDA), Lizenzvertrag, Nutzungsrechte, Letter of Intent, Markenlizenz: kostenlose Vorlagen für Gründer als Word, PDF und Text.",
    },
    intro: [
      "Bevor du Investoren, Entwicklern oder Lieferanten deine Idee zeigst, sichert eine Geheimhaltungsvereinbarung (NDA), dass vertrauliche Informationen nicht weitergegeben oder selbst genutzt werden. Seit dem Geschäftsgeheimnisgesetz 2019 gilt: Nur wer angemessene Schutzmaßnahmen nachweisen kann, hat überhaupt ein geschütztes Geschäftsgeheimnis. Ein unterschriebenes NDA ist die einfachste dieser Maßnahmen.",
      "Hier liegen die Verträge rund um Vertraulichkeit und geistiges Eigentum: einseitige und gegenseitige NDAs, Absichtserklärungen (Letter of Intent), Lizenzverträge für Software, Marken und Inhalte, Übertragung von Nutzungsrechten, Abtretung von Erfindungen und Vereinbarungen für Foto- und Modelrechte. Jede Vorlage benennt klar, was vertraulich ist, wie lange der Schutz gilt und was bei Verstößen passiert.",
    ],
    faqs: [
      {
        q: "Ist ein NDA ohne Vertragsstrafe sinnvoll?",
        a: "Ja, es schafft Beweis und Klarheit, aber die Durchsetzung ist ohne Vertragsstrafe schwer, weil du den Schaden konkret beziffern musst. Eine angemessene Vertragsstrafe mit Ermäßigungsmöglichkeit nach billigem Ermessen gibt dem NDA Zähne, ohne unwirksam zu werden.",
      },
      {
        q: "Wie lange darf eine Geheimhaltungspflicht gelten?",
        a: "Üblich sind drei bis fünf Jahre nach Vertragsende; für echte Geschäftsgeheimnisse wie Rezepturen oder Quellcode lässt sich auch eine unbegrenzte Dauer vereinbaren, solange die Information geheim bleibt. Pauschale Ewigkeitsklauseln für alles sind riskant und werden von Gerichten eingeschränkt.",
      },
      {
        q: "Was unterscheidet eine Lizenz von einer Übertragung?",
        a: "Bei der Lizenz bleibt der Rechteinhaber Eigentümer und erlaubt die Nutzung in einem bestimmten Umfang, zeitlich, räumlich oder inhaltlich begrenzt. Bei der Übertragung ausschließlicher Nutzungsrechte darf nur noch der Erwerber das Werk nutzen. Das Urheberrecht selbst ist in Deutschland nicht übertragbar.",
      },
    ],
  },
  {
    key: "miete",
    titel: "Miete & Nutzung",
    kurz: "Büro, Lager, Untermiete, Coworking, Leihe",
    icon: "Building2",
    seo: {
      title: "Gewerbemietvertrag Vorlagen kostenlos (Word) | GründerX",
      description:
        "Gewerbemietvertrag für Büro, Laden und Lager, Untermietvertrag, Coworking, Leihvertrag, Stellplatz: kostenlose Vorlagen für Gründer als Word, PDF und Text.",
    },
    intro: [
      "Gewerbliche Mietverträge sind freier verhandelbar als Wohnraummietverträge, dafür schützt das Gesetz den Mieter kaum. Laufzeit, Mieterhöhung, Nebenkosten, Instandhaltung und Konkurrenzschutz stehen nur dann auf deiner Seite, wenn sie im Vertrag stehen. Für Verträge über mehr als ein Jahr gilt außerdem die Schriftform des § 550 BGB, sonst ist der Vertrag mit gesetzlicher Frist kündbar.",
      "Diese Kategorie enthält Vorlagen für Räume und Dinge, die du nutzt, ohne sie zu kaufen: Gewerbemietverträge für Büro, Laden und Lager, Untermietverträge, Coworking- und Schreibtischmiete, Stellplatz- und Lagerflächenmiete, Leihverträge für Geräte und Übergabeprotokolle. Alle Vorlagen enthalten die typischen Streitpunkte wie Schönheitsreparaturen, Kaution und Rückgabe.",
    ],
    faqs: [
      {
        q: "Gilt der Mieterschutz auch für Gewerberäume?",
        a: "Nein, der soziale Mieterschutz des Wohnraummietrechts (Kündigungsschutz, Mietpreisbremse, Kappungsgrenze) gilt nicht für Gewerbemiete. Laufzeit, Kündigung und Mieterhöhung gelten so, wie sie im Vertrag stehen. Genau deshalb lohnt es sich, jede Klausel zu lesen.",
      },
      {
        q: "Darf ich mein Büro untervermieten?",
        a: "Nur mit Erlaubnis des Vermieters (§ 540 BGB). Viele Gewerbemietverträge erlauben die Untervermietung an verbundene Unternehmen von vornherein; für alles andere brauchst du eine schriftliche Zustimmung, die du dem Untermietvertrag beilegen solltest.",
      },
      {
        q: "Was ist bei der Schriftform zu beachten?",
        a: "Ein Gewerbemietvertrag mit Laufzeit über ein Jahr muss alle wesentlichen Punkte in einer Urkunde enthalten, die beide Parteien unterschreiben; Anlagen müssen eindeutig bezeichnet sein. Spätere Änderungen gehören als schriftliche Nachträge dazu, sonst wird der ganze Vertrag ordentlich kündbar.",
      },
    ],
  },
  {
    key: "finanzen",
    titel: "Geld & Forderungen",
    kurz: "Darlehen, Ratenzahlung, Abtretung, Quittung",
    icon: "Coins",
    seo: {
      title: "Darlehensvertrag & Mahnung: Vorlagen kostenlos | GründerX",
      description:
        "Darlehensvertrag, Gesellschafterdarlehen, Ratenzahlung, Mahnung, Abtretung, Quittung, Schuldanerkenntnis: kostenlose Vorlagen für Gründer als Word, PDF und Text.",
    },
    intro: [
      "Geld unter Gründern, Familie oder Geschäftspartnern wird oft per Überweisung und Handschlag geliehen. Fehlt der Vertrag, streiten alle Beteiligten später über Zinsen, Rückzahlung und darüber, ob es überhaupt ein Darlehen war oder eine Schenkung. Beim Finanzamt zählt ohnehin nur, was schriftlich und wie unter Fremden vereinbart wurde.",
      "Hier findest du die Vorlagen für Geldflüsse und Forderungen: Darlehensverträge privat und als Gesellschafterdarlehen, Rangrücktritt, Ratenzahlungsvereinbarung, Stundung, Schuldanerkenntnis, Abtretung, Bürgschaft, Quittung und eine dreistufige Mahnung. Alle Vorlagen nennen Betrag, Zinsen, Fälligkeit und Folgen bei Verzug, damit die Forderung notfalls auch vor Gericht hält.",
    ],
    faqs: [
      {
        q: "Welche Zinsen darf ich im Darlehensvertrag vereinbaren?",
        a: "Zwischen Privaten und Unternehmen gibt es keine feste Obergrenze, aber Wucher (deutlich über dem Marktüblichen) macht den Vertrag nichtig. Zinslos ist ebenfalls möglich; zwischen nahestehenden Personen und bei Gesellschafterdarlehen prüft das Finanzamt, ob die Bedingungen einem Fremdvergleich standhalten.",
      },
      {
        q: "Wann ist eine Mahnung nötig?",
        a: "Verzug tritt ohne Mahnung ein, wenn ein Kalenderdatum vereinbart war, oder spätestens 30 Tage nach Zugang der Rechnung bei Unternehmern. Eine Mahnung ist trotzdem sinnvoll, weil sie den Verzug beweist und den Weg zum gerichtlichen Mahnverfahren ebnet. Verbraucher müssen auf die 30-Tage-Folge in der Rechnung hingewiesen werden.",
      },
      {
        q: "Was bringt ein Rangrücktritt beim Gesellschafterdarlehen?",
        a: "Mit einem qualifizierten Rangrücktritt tritt der Gesellschafter mit seiner Forderung hinter alle anderen Gläubiger zurück. Das Darlehen zählt dann in der Überschuldungsprüfung nicht als Verbindlichkeit und kann eine Insolvenzantragspflicht abwenden. Ohne Rangrücktritt steht das Darlehen wie jede andere Schuld in der Bilanz.",
      },
    ],
  },
  {
    key: "ecommerce",
    titel: "Online-Handel & Vertrieb",
    kurz: "AGB, Widerruf, Lieferanten, Affiliate, Dropshipping",
    icon: "Store",
    seo: {
      title: "AGB, Widerruf & Lieferantenvertrag: Vorlagen | GründerX",
      description:
        "AGB für Online-Shops, Widerrufsbelehrung, Lieferantenvertrag, Dropshipping, Affiliate, Handelsvertreter, Influencer-Kooperation: kostenlose Vorlagen als Word und PDF.",
    },
    intro: [
      "Im Online-Handel sind die Vertragsdokumente Pflicht und Angriffsfläche zugleich: Fehlende oder falsche AGB, eine veraltete Widerrufsbelehrung oder unklare Lieferantenvereinbarungen führen zu Abmahnungen, Zahlungsausfällen und Streit über Retouren. Gleichzeitig sichern gute Verträge die Marge, etwa beim Dropshipping, in Affiliate-Programmen oder bei der Zusammenarbeit mit Influencern.",
      "Diese Kategorie enthält die Vorlagen für Shop und Vertrieb: AGB für den B2C- und B2B-Verkauf, Widerrufsbelehrung mit Muster-Widerrufsformular, Lieferanten- und Dropshipping-Verträge, Affiliate- und Handelsvertreterverträge, Vertriebspartnerschaften, Influencer-Kooperationen, Kommission und Retourenbedingungen. Die Texte folgen den Vorgaben des BGB und der Verbraucherrechte-Richtlinie; prüfe sie vor dem Einsatz gegen den aktuellen Gesetzesstand.",
    ],
    faqs: [
      {
        q: "Reicht eine Vorlage als AGB für meinen Online-Shop?",
        a: "Als Grundlage ja, aber AGB müssen zu deinem Sortiment, deinen Zahlarten und Lieferwegen passen und bei jeder Gesetzesänderung nachgezogen werden. Ein Fehler reicht für eine Abmahnung durch Mitbewerber oder Verbände. Bei größeren Shops lohnt sich ein Abmahnschutz oder die anwaltliche Prüfung.",
      },
      {
        q: "Muss ich Verbrauchern immer ein Widerrufsrecht einräumen?",
        a: "Bei Fernabsatzverträgen ja, 14 Tage ab Erhalt der Ware. Ausnahmen gelten etwa für personalisierte Ware, versiegelte Hygieneartikel nach dem Öffnen, schnell verderbliche Waren und digitale Inhalte nach Beginn der Ausführung mit Zustimmung. Fehlt die Belehrung, verlängert sich die Frist auf zwölf Monate und 14 Tage.",
      },
      {
        q: "Was muss in einem Dropshipping-Vertrag stehen?",
        a: "Wer Vertragspartner des Endkunden ist (in der Regel du), Lieferzeiten und Versandwege, Umgang mit Retouren und Gewährleistung, Preis- und Bestandsinformationen, Haftung für Produktfehler sowie Datenschutz bei der Weitergabe der Kundendaten an den Lieferanten. Ohne diese Punkte trägst du alle Risiken allein.",
      },
    ],
  },
  {
    key: "verwaltung",
    titel: "Vollmachten & Behörden",
    kurz: "Vollmachten, Finanzamt, Kündigungen, Einwilligungen",
    icon: "FileText",
    seo: {
      title: "Vollmacht Vorlagen kostenlos (Word & PDF) | GründerX",
      description:
        "Vollmacht, Handlungsvollmacht, Prokura, Fristverlängerung beim Finanzamt, Einspruch, Kündigung von Verträgen, Einwilligungen: kostenlose Vorlagen als Word, PDF und Text.",
    },
    intro: [
      "Ein Großteil des Verwaltungsalltags eines Unternehmens besteht aus kurzen, aber formgebundenen Schreiben: eine Vollmacht für den Steuerberater, eine Fristverlängerung beim Finanzamt, ein Einspruch gegen den Steuerbescheid, die Kündigung eines Software-Abos oder die Einwilligung eines Mitarbeiters zur Fotonutzung. Wer hier eine Frist oder Formvorschrift übersieht, zahlt Verspätungszuschläge oder verliert Rechte.",
      "In dieser Kategorie liegen die Vorlagen für genau diese Schreiben: allgemeine und Handlungsvollmachten, Prokura-Erteilung, Postvollmacht, Steuerberater-Vollmacht, Fristverlängerung und Einspruch beim Finanzamt, Kündigungsschreiben für Verträge, Datenschutz-Einwilligungen und Widerrufe. Jede Vorlage nennt die Form, in der das Schreiben wirksam wird, und die Frist, die du einhalten musst.",
    ],
    faqs: [
      {
        q: "Muss eine Vollmacht notariell beglaubigt sein?",
        a: "In den meisten Fällen nicht; eine unterschriebene schriftliche Vollmacht reicht. Beglaubigung oder Beurkundung brauchst du bei Grundstücksgeschäften, Handelsregisteranmeldungen und GmbH-Anteilsübertragungen. Banken verlangen oft ihre eigenen Formulare.",
      },
      {
        q: "Wie lege ich Einspruch gegen einen Steuerbescheid ein?",
        a: "Schriftlich oder über ELSTER innerhalb eines Monats nach Bekanntgabe des Bescheids, bei Postzustellung gilt der Bescheid am vierten Tag nach Aufgabe als bekannt gegeben. Der Einspruch muss den Bescheid bezeichnen; die Begründung kannst du nachreichen. Wer die Frist versäumt, kann nur noch über Wiedereinsetzung oder Änderungsanträge arbeiten.",
      },
      {
        q: "Wie kündige ich einen Vertrag rechtssicher?",
        a: "In der Form, die der Vertrag oder das Gesetz verlangt, meist Textform (E-Mail reicht) oder Schriftform mit Unterschrift. Für Online-Verträge mit Verbrauchern müssen Anbieter seit 2022 einen Kündigungsbutton bereitstellen. Nenne Vertragsnummer, Kündigungstermin und bitte um schriftliche Bestätigung.",
      },
    ],
  },
];

/** Abschnitt des Ratgeber-Teils unter der Vorschau (Nutzwert + Suchmaschinen). */
export interface RatgeberAbschnitt {
  /** Zwischenüberschrift (H2) mit dem Suchbegriff, z. B. „Was muss in einen GbR-Vertrag?“. 15–90 Zeichen. */
  titel: string;
  /**
   * Fließtext. Absätze durch eine Leerzeile trennen; Zeilen, die mit „- “
   * beginnen, werden als Aufzählung gesetzt. Kein Markdown, kein HTML.
   * Mindestens 50 Wörter je Abschnitt.
   */
  text: string;
}

export interface Vorlage {
  /** URL-Teil unter /vorlagen/, nur a-z, 0-9 und Bindestrich. */
  slug: string;
  /** Anzeigename, z. B. „GbR-Gesellschaftsvertrag“. */
  titel: string;
  /** Ein Satz für die Karte in der Übersicht. */
  kurz: string;
  kategorie: VorlagenKategorie;
  /** Dateiname ohne Endung, z. B. „GbR-Gesellschaftsvertrag“. */
  dateiname: string;
  /** Wann die Vorlage passt: 3 bis 5 Stichpunkte. */
  wofuer: string[];
  /** Was drinsteht: die Abschnitte in Reihenfolge, 5 bis 12 Punkte. */
  enthaelt: string[];
  /** Fallen und Pflichten, die man kennen muss: 2 bis 5 Punkte. */
  hinweise: string[];
  /** 3 bis 5 Fragen samt Antwort (SEO + Nutzen). */
  faqs: VorlagenFaq[];
  /**
   * Lädt Vertragstext und Ratgeber nach (src/data/vorlagen/inhalte/<slug>.ts).
   * Die schweren Felder liegen nicht hier, damit der Hub nur Metadaten lädt;
   * die Detailseite wartet auf dieses Modul, bevor sie Seo-Tags setzt (so
   * nimmt der Prerender den vollen Text mit).
   */
  inhalt: () => Promise<{ default: VorlagenInhalt }>;
  seo: {
    /** ≤ 60 Zeichen inklusive „| GründerX“, Hauptsuchbegriff vorn („GbR-Vertrag Vorlage …“). */
    title: string;
    /** 120 bis 160 Zeichen. */
    description: string;
  };
  /** Stand der Vorlage, z. B. „2026-10“. */
  stand: string;
}

/**
 * Schwere Felder einer Vorlage, die die Detailseite nachlädt
 * (src/data/vorlagen/inhalte/<slug>.ts, siehe scripts/split-vorlagen-inhalte.mjs).
 * Der Hub lädt nur die Metadaten.
 */
export interface VorlagenInhalt {
  /**
   * Die Vorlage selbst. Erste Zeile = Titel. Abschnitte als „§ 1 Name“ oder
   * nummeriert („1. …“); Platzhalter in eckigen Klammern. Mindestens 1.500
   * Zeichen; endet mit Unterschriftsblock und dem HINWEIS-Absatz.
   */
  text: string;
  /**
   * Ratgeber-Teil unter der Vorschau: 4 bis 8 Abschnitte, zusammen mindestens
   * 450 Wörter. Erklärt, wann man die Vorlage braucht, was hinein muss, wie
   * man sie ausfüllt, typische Fehler, Rechtsgrundlagen und wann sie nicht
   * reicht. Das ist der Teil, mit dem die Seite bei Google gegen die langen
   * Ratgeber-Seiten der Konkurrenz besteht.
   */
  ratgeber: RatgeberAbschnitt[];
}

export const VORLAGEN_HINWEIS =
  "HINWEIS: Diese Vorlage von GründerX (gruenderx.de) ist ein unverbindliches Muster und ersetzt keine " +
  "Rechts- oder Steuerberatung. Vor der Verwendung an den Einzelfall anpassen und im Zweifel prüfen lassen.";

/** Slug-Form, gleich mit dem Check-Constraint in vorlagen_leads. */
export const VORLAGEN_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
