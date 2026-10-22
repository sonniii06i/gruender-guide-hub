import { type Vorlage } from "./types";

// Online-Handel & Vertrieb: AGB, Widerruf, Impressum, AVV, Lieferanten,
// Affiliate, Dropshipping, Reseller, Angebot, Auftragsbestätigung.
// Rechtsstand: BGB/EGBGB (Fernabsatz), DDG (seit 14.05.2024, löst das TMG ab),
// DSGVO, GPSR (Verordnung (EU) 2023/988, seit 13.12.2024), OS-Plattform
// eingestellt am 20.07.2025 (kein OS-Link mehr). Stand 2026-10.

export const VORLAGEN_ECOMMERCE: Vorlage[] = [
  {
    slug: "agb-onlineshop",
    titel: "AGB für Online-Shop (B2C)",
    kurz: "Allgemeine Geschäftsbedingungen für den Warenverkauf an Verbraucher über einen eigenen Online-Shop.",
    kategorie: "ecommerce",
    dateiname: "AGB-Onlineshop",
    wofuer: [
      "Eigener Shop (Shopify, WooCommerce, Shopware) mit Verkauf an Verbraucher in Deutschland",
      "Physische Waren, die per Paket oder Spedition versendet werden",
      "Als Grundlage, die du um Besonderheiten (Vorbestellungen, personalisierte Ware, Abo) ergänzt",
      "Wenn du bisher ohne AGB verkaufst und die Pflichtinformationen sauber bündeln willst",
    ],
    enthaelt: [
      "§ 1 Geltungsbereich und Vertragspartner",
      "§ 2 Vertragsschluss und Bestellablauf",
      "§ 3 Preise und Versandkosten",
      "§ 4 Zahlung",
      "§ 5 Lieferung und Lieferzeit",
      "§ 6 Eigentumsvorbehalt",
      "§ 7 Widerrufsrecht",
      "§ 8 Gewährleistung",
      "§ 9 Haftung",
      "§ 10 Streitbeilegung",
      "§ 11 Vertragssprache, Speicherung des Vertragstextes",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Der Bestellbutton muss nach § 312j Abs. 3 BGB eindeutig beschriftet sein („zahlungspflichtig bestellen“ oder gleichwertig). Fehlt das, kommt kein Vertrag zustande – die AGB retten das nicht.",
      "Die OS-Plattform der EU wurde am 20.07.2025 eingestellt. Ein Link auf ec.europa.eu/consumers/odr gehört nicht mehr in AGB oder Impressum; nur der VSBG-Hinweis bleibt Pflicht.",
      "AGB gelten nur, wenn der Kunde sie vor dem Bestellabschluss zur Kenntnis nehmen kann (§ 305 Abs. 2 BGB): Link im Checkout und auf jeder Seite, dazu Speicher- und Druckmöglichkeit.",
      "Bei Preisermäßigungen musst du nach § 11 PAngV den niedrigsten Preis der letzten 30 Tage angeben. Das steht nicht in den AGB, wird aber bei jedem Rabatt geprüft.",
      "Widerrufsbelehrung und Muster-Widerrufsformular sind eigene Dokumente (siehe die Vorlagen dazu). Sie müssen in Textform (E-Mail, PDF) spätestens mit der Ware beim Kunden ankommen.",
    ],
    faqs: [
      {
        q: "Brauche ich für einen Online-Shop überhaupt AGB?",
        a: "Eine gesetzliche Pflicht zu AGB gibt es nicht. Ohne AGB gilt aber das gesetzliche Kaufrecht komplett zu Lasten des Händlers, etwa bei Eigentumsvorbehalt, Zahlungsarten und Lieferzeiten. Außerdem musst du viele Informationen nach Art. 246a EGBGB ohnehin geben, und AGB sind der übliche Ort dafür.",
      },
      {
        q: "Kann ich den Vertragsschluss so gestalten, dass die Bestellung nicht sofort bindend ist?",
        a: "Ja, die Vorlage macht die Bestellung des Kunden zum Angebot, das du erst durch Auftragsbestätigung oder Versand annimmst. Die automatische Eingangsbestätigung nach § 312i BGB ist noch keine Annahme. So kannst du bei Preisfehlern oder fehlendem Bestand ablehnen, musst das aber innerhalb der genannten Frist tun.",
      },
      {
        q: "Darf ich die Gewährleistung gegenüber Verbrauchern verkürzen?",
        a: "Bei Neuware nein, die zwei Jahre nach § 438 BGB sind zwingend. Bei gebrauchten Sachen kann die Frist auf ein Jahr verkürzt werden, aber seit 2022 nur durch eine ausdrückliche, gesonderte Vereinbarung, nicht einfach in den AGB. Die Vorlage sieht deshalb keine Verkürzung vor.",
      },
      {
        q: "Was ist mit dem OS-Link, der früher Pflicht war?",
        a: "Die Verordnung (EU) Nr. 524/2013 wurde aufgehoben und die Plattform zur Online-Streitbeilegung am 20.07.2025 abgeschaltet. Der Link ist damit nicht nur überflüssig, sondern irreführend. Entferne ihn aus AGB, Impressum und Fußzeile. Der Hinweis nach § 36 VSBG, ob du an einem Schlichtungsverfahren teilnimmst, bleibt Pflicht.",
      },
    ],
    seo: {
      title: "AGB Vorlage Online-Shop kostenlos (Word) | GründerX",
      description:
        "AGB für deinen Online-Shop als kostenlose Vorlage: Vertragsschluss, Bestellbutton, Versand, Zahlung, Widerruf, Gewährleistung, Haftung. Stand 2026 ohne OS-Link.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/agb-onlineshop"),
  },
  {
    slug: "widerrufsbelehrung-muster",
    titel: "Widerrufsbelehrung für Warenlieferung",
    kurz: "Widerrufsbelehrung nach dem gesetzlichen Muster (Anlage 1 zu Art. 246a EGBGB) für Online-Shops, mit den Gestaltungshinweisen bereits ausgefüllt.",
    kategorie: "ecommerce",
    dateiname: "Widerrufsbelehrung-Warenlieferung",
    wofuer: [
      "Online-Shop mit Warenverkauf an Verbraucher (Fernabsatz)",
      "Verkauf über Marktplätze, wenn dort eine eigene Belehrung hinterlegt werden muss",
      "Shops mit Teillieferungen, Speditionsware oder regelmäßiger Lieferung (Abo-Box)",
      "Wenn du prüfen willst, ob deine bestehende Belehrung noch dem aktuellen Muster entspricht",
    ],
    enthaelt: [
      "Widerrufsrecht mit Fristbeginn (Gestaltungshinweis 1 ausgefüllt)",
      "Varianten für mehrere Waren, Teilsendungen und regelmäßige Lieferungen",
      "Kontaktangaben für die Widerrufserklärung (Name, Anschrift, Telefon, E-Mail)",
      "Folgen des Widerrufs: Rückzahlung, Zahlungsmittel, Zurückbehaltungsrecht",
      "Rücksendefrist und Rücksendekosten, auch für nicht paketfähige Ware",
      "Wertersatz bei übermäßiger Nutzung",
      "Ausschluss und vorzeitiges Erlöschen (§ 312g Abs. 2 BGB)",
      "Hinweis zur Einbindung mit dem Muster-Widerrufsformular",
    ],
    hinweise: [
      "Die Belehrung muss dem Kunden in Textform (E-Mail, PDF) spätestens mit der Ware zugehen (Art. 246a § 4 EGBGB). Fehlt sie oder ist sie falsch, läuft die Widerrufsfrist erst nach 12 Monaten und 14 Tagen ab (§ 356 Abs. 3 BGB).",
      "Nur eine Fristvariante verwenden: Entscheide dich je nach Shop für „die Waren“, „die letzte Ware“, „die letzte Teilsendung“ oder „die erste Ware“ und streiche die anderen. Mehrere Varianten in einer Belehrung machen sie unklar und damit unwirksam.",
      "Wer die Rücksendekosten übernehmen will, ersetzt den Satz „Sie tragen die unmittelbaren Kosten der Rücksendung“ durch „Wir tragen die Kosten der Rücksendung der Waren“. Ein Rücksendeetikett ersetzt die Belehrung nicht.",
      "Die Ausschlüsse nach § 312g Abs. 2 BGB gelten nur, wenn sie tatsächlich zutreffen. Hygieneartikel sind nur ausgeschlossen, wenn sie versiegelt geliefert und die Versiegelung entfernt wurde; „aus hygienischen Gründen keine Rücknahme“ pauschal ist unwirksam.",
    ],
    faqs: [
      {
        q: "Muss ich das gesetzliche Muster wörtlich übernehmen?",
        a: "Nein, aber es lohnt sich. Wer das Muster richtig ausfüllt, erfüllt die Informationspflicht nach Art. 246a § 1 Abs. 2 Satz 2 EGBGB mit gesetzlicher Vermutung. Eigene Formulierungen tragen das volle Abmahnrisiko. Die Vorlage hält sich deshalb exakt an den Wortlaut und füllt nur die Gestaltungshinweise aus.",
      },
      {
        q: "Wann beginnt die 14-Tage-Frist bei einer Bestellung mit mehreren Paketen?",
        a: "Mit Erhalt der letzten Ware, wenn der Kunde mehrere Waren in einer Bestellung bestellt hat, die getrennt geliefert werden. Wird eine Ware in mehreren Teilsendungen geliefert, zählt die letzte Teilsendung. Die Vorlage enthält beide Varianten; du nimmst die, die zu deinem Versand passt.",
      },
      {
        q: "Muss ich auch die Hinsendekosten erstatten?",
        a: "Ja, die Kosten der Standardlieferung musst du bei Widerruf zurückzahlen. Nur die Mehrkosten einer vom Kunden gewählten teureren Versandart (Express) darfst du behalten. Die Rücksendekosten trägt der Kunde, wenn du ihn darüber belehrt hast; sonst trägst du sie.",
      },
      {
        q: "Was ist mit Ware, die der Kunde benutzt hat?",
        a: "Prüfen wie im Laden darf der Kunde, also auspacken, ansehen, anprobieren. Für darüber hinausgehende Nutzung kannst du Wertersatz verlangen, aber nur, wenn du über diese Folge belehrt hast. Den Widerruf selbst darfst du deshalb nicht verweigern.",
      },
    ],
    seo: {
      title: "Widerrufsbelehrung Muster kostenlos (Word) | GründerX",
      description:
        "Widerrufsbelehrung nach dem gesetzlichen Muster (Anlage 1 EGBGB) für Warenlieferungen: Varianten ausgefüllt, Rücksendekosten, Ausschlüsse. Gratis als Word, PDF.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/widerrufsbelehrung-muster"),
  },
  {
    slug: "muster-widerrufsformular",
    titel: "Muster-Widerrufsformular",
    kurz: "Das gesetzliche Muster-Widerrufsformular (Anlage 2 zu Art. 246a EGBGB) als eigenes Dokument, mit Anleitung zur Einbindung in Shop und Bestellbestätigung.",
    kategorie: "ecommerce",
    dateiname: "Muster-Widerrufsformular",
    wofuer: [
      "Jeder Online-Shop, der an Verbraucher verkauft und eine Widerrufsbelehrung nutzt",
      "Dienstleister und Anbieter digitaler Inhalte im Fernabsatz",
      "Als PDF-Anhang in der Bestellbestätigung oder als Download auf der Widerrufsseite",
    ],
    enthaelt: [
      "Vollständiger Wortlaut der Anlage 2 zu Art. 246a § 1 Abs. 2 Satz 1 Nr. 1 EGBGB",
      "Adressblock des Händlers mit Anschrift und E-Mail",
      "Felder für Ware/Dienstleistung, Bestell- und Erhaltdatum",
      "Felder für Name, Anschrift, Unterschrift und Datum des Verbrauchers",
      "Hinweis zur Einbindung in Bestellablauf, Bestellbestätigung und Widerrufsseite",
      "Hinweis, wie ein Widerruf intern zu bestätigen und zu bearbeiten ist",
    ],
    hinweise: [
      "Das Formular ist Pflicht (Art. 246a § 1 Abs. 2 Satz 1 Nr. 1 EGBGB), aber der Kunde muss es nicht benutzen. Jede eindeutige Erklärung reicht, auch eine formlose E-Mail oder ein Anruf, wenn du Telefon als Weg angibst.",
      "Das Formular gehört in Textform zum Kunden: Verlinkung im Shop allein genügt nicht. Hänge es als PDF an die Bestellbestätigung oder lege es der Ware bei.",
      "Wer einen Widerruf online über ein Webformular ermöglicht, muss den Eingang unverzüglich bestätigen (z. B. per E-Mail); das ist in der Widerrufsbelehrung entsprechend zu ergänzen.",
      "Das Formular nicht umformulieren und nicht um Pflichtfelder wie Bestellnummer oder Rückgabegrund erweitern. Zusätzliche Angaben dürfen nur freiwillig und klar als freiwillig gekennzeichnet sein.",
    ],
    faqs: [
      {
        q: "Reicht es, wenn das Formular auf meiner Website verlinkt ist?",
        a: "Nein. Das Muster-Widerrufsformular muss dem Verbraucher wie die Widerrufsbelehrung auf einem dauerhaften Datenträger zur Verfügung gestellt werden, also per E-Mail, als PDF oder auf Papier. Der Link ist eine sinnvolle Ergänzung, ersetzt aber die Übermittlung nicht.",
      },
      {
        q: "Darf ich das Formular an mein Shop-Design anpassen?",
        a: "Gestaltung ja, Inhalt nein. Logo, Schriftart und Layout sind frei. Der Text sollte dem gesetzlichen Muster entsprechen, damit die Vermutung der ordnungsgemäßen Information greift. Zusätzliche Felder nur als klar freiwillige Angaben, nie als Voraussetzung für den Widerruf.",
      },
      {
        q: "Was mache ich, wenn ein Widerruf ohne Formular kommt?",
        a: "Er ist genauso wirksam. Entscheidend ist, dass der Kunde innerhalb der Frist eindeutig erklärt, den Vertrag zu widerrufen. Bestätige den Eingang, nenne die Rücksendeadresse und erstatte innerhalb von 14 Tagen nach Eingang des Widerrufs, sobald die Ware zurück ist oder der Versandnachweis vorliegt.",
      },
    ],
    seo: {
      title: "Muster-Widerrufsformular kostenlos (Word) | GründerX",
      description:
        "Das gesetzliche Muster-Widerrufsformular für Online-Shops als eigenes Dokument, mit Anleitung zur Einbindung in Bestellbestätigung und Widerrufsseite. Gratis.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/muster-widerrufsformular"),
  },
  {
    slug: "impressum-muster",
    titel: "Impressum nach § 5 DDG",
    kurz: "Impressum-Vorlage nach dem Digitale-Dienste-Gesetz für Einzelunternehmen, GbR, UG und GmbH mit allen Varianten-Blöcken (Handelsregister, USt-IdNr., Aufsicht, MStV).",
    kategorie: "ecommerce",
    dateiname: "Impressum-Muster-DDG",
    wofuer: [
      "Jede geschäftliche Website, jeder Online-Shop und jedes geschäftlich genutzte Social-Media-Profil",
      "Einzelunternehmer, Freiberufler, GbR, UG (haftungsbeschränkt) und GmbH",
      "Wenn dein altes Impressum noch auf das TMG verweist und aktualisiert werden muss",
      "Blogs, Newsletter und Kanäle mit redaktionellen Inhalten (Verantwortlicher nach MStV)",
    ],
    enthaelt: [
      "Block A: Anbieter – Einzelunternehmen / Freiberufler",
      "Block B: Anbieter – GbR mit allen Gesellschaftern",
      "Block C: Anbieter – UG (haftungsbeschränkt) / GmbH mit Geschäftsführer",
      "Kontakt: E-Mail und zweiter schneller Kontaktweg",
      "Handelsregister, Registergericht, Registernummer",
      "USt-IdNr. oder Wirtschafts-Identifikationsnummer",
      "Aufsichtsbehörde bei zulassungspflichtiger Tätigkeit",
      "Berufsrechtliche Angaben für reglementierte Berufe",
      "Berufshaftpflichtversicherung (DL-InfoV)",
      "Verantwortlicher für journalistisch-redaktionelle Inhalte (§ 18 Abs. 2 MStV)",
      "Verbraucherstreitbeilegung (§ 36 VSBG) ohne OS-Link",
    ],
    hinweise: [
      "Seit dem 14.05.2024 steht die Impressumspflicht in § 5 DDG, nicht mehr in § 5 TMG. Ein Verweis auf das TMG ist nicht automatisch abmahnbar, zeigt aber ein ungepflegtes Impressum; die Vorlage verwendet durchgehend das DDG.",
      "Eine ladungsfähige Anschrift ist Pflicht. Postfach, Packstation oder reine Briefkastenadressen reichen nicht. Wer von zu Hause arbeitet, muss die Privatadresse nennen oder eine echte Geschäftsadresse mit Postempfang nutzen.",
      "Die USt-IdNr. ist nur anzugeben, wenn du eine hast. Die Steuernummer gehört nicht ins Impressum. Fehlt die USt-IdNr., kann die Wirtschafts-Identifikationsnummer (W-IdNr.) genannt werden.",
      "Eine UG muss immer als „UG (haftungsbeschränkt)“ oder „Unternehmergesellschaft (haftungsbeschränkt)“ auftreten; der Zusatz darf nicht abgekürzt werden. Fehlt er, droht persönliche Haftung.",
      "Das Impressum muss von jeder Seite mit höchstens zwei Klicks erreichbar und als „Impressum“ erkennbar sein. Das gilt auch für Instagram-, TikTok- und LinkedIn-Profile, die geschäftlich genutzt werden.",
    ],
    faqs: [
      {
        q: "Was hat sich mit dem Wechsel vom TMG zum DDG geändert?",
        a: "Inhaltlich fast nichts: Die Pflichtangaben des § 5 TMG wurden nahezu wortgleich in § 5 DDG übernommen. Neu ist die Rechtsgrundlage, weil das TMG mit dem Digitale-Dienste-Gesetz vom 14.05.2024 aufgehoben wurde. Wer in seinem Impressum „§ 5 TMG“ schreibt, sollte das auf „§ 5 DDG“ ändern.",
      },
      {
        q: "Brauche ich als Kleinunternehmer ein Impressum?",
        a: "Ja, sobald du geschäftsmäßig einen digitalen Dienst anbietest, also eine Website, einen Shop oder ein geschäftliches Social-Media-Profil betreibst. Die Kleinunternehmerregelung betrifft nur die Umsatzsteuer. Ohne USt-IdNr. lässt du das Feld einfach weg.",
      },
      {
        q: "Wann brauche ich einen Verantwortlichen nach § 18 Abs. 2 MStV?",
        a: "Sobald du journalistisch-redaktionelle Inhalte veröffentlichst, etwa einen Blog, Ratgeberartikel oder einen regelmäßigen Newsletter mit Meinungsbeiträgen. Dann nennst du eine natürliche Person mit Name und Anschrift. Bei reinen Produktseiten ist der Block entbehrlich, schadet aber nicht.",
      },
      {
        q: "Muss der Link zur OS-Plattform noch ins Impressum?",
        a: "Nein. Die EU hat die Plattform zur Online-Streitbeilegung am 20.07.2025 abgeschaltet und die zugrunde liegende Verordnung aufgehoben. Der Link führt ins Leere und sollte entfernt werden. Der Hinweis nach § 36 VSBG, ob du an Schlichtungsverfahren teilnimmst, bleibt für Unternehmen mit mehr als zehn Mitarbeitern Pflicht und ist für alle anderen empfehlenswert.",
      },
    ],
    seo: {
      title: "Impressum Vorlage nach § 5 DDG kostenlos | GründerX",
      description:
        "Impressum-Muster nach § 5 DDG für Einzelunternehmen, GbR, UG und GmbH: alle Pflichtangaben, Handelsregister, USt-IdNr., MStV, VSBG. Kostenlos als Word und PDF.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/impressum-muster"),
  },
  {
    slug: "avv-auftragsverarbeitungsvertrag",
    titel: "Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO",
    kurz: "Vertrag zur Auftragsverarbeitung zwischen Verantwortlichem und Dienstleister nach Art. 28 DSGVO mit Anlagen für Datenkategorien, TOM und Unterauftragnehmer.",
    kategorie: "ecommerce",
    dateiname: "Auftragsverarbeitungsvertrag-AVV",
    wofuer: [
      "Du beauftragst einen Dienstleister, der personenbezogene Daten für dich verarbeitet (Fulfillment, Newsletter-Tool, Hosting, Kundenservice, Agentur mit Zugriff auf Kundendaten)",
      "Du bist selbst Dienstleister und brauchst einen AVV für deine Kunden",
      "Freelancer, die mit Kundendaten des Auftraggebers arbeiten (Support, Buchhaltung, Lead-Pflege)",
      "Wenn der Anbieter keinen eigenen AVV stellt und du einen vorlegen musst",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Dauer der Verarbeitung",
      "§ 2 Art, Zweck, Datenkategorien und betroffene Personen",
      "§ 3 Weisungsrecht des Verantwortlichen",
      "§ 4 Pflichten des Auftragsverarbeiters",
      "§ 5 Technische und organisatorische Maßnahmen (TOM)",
      "§ 6 Unterauftragsverhältnisse",
      "§ 7 Verarbeitung in Drittländern",
      "§ 8 Unterstützung bei Betroffenenrechten und Datenpannen",
      "§ 9 Kontrollrechte und Nachweise",
      "§ 10 Löschung und Rückgabe nach Vertragsende",
      "§ 11 Haftung und Schlussbestimmungen",
      "Anlage 1 Verarbeitungsbeschreibung, Anlage 2 TOM, Anlage 3 Unterauftragnehmer",
    ],
    hinweise: [
      "Ohne AVV ist die Weitergabe der Daten an den Dienstleister ein Datenschutzverstoß des Verantwortlichen, nicht nur des Dienstleisters. Der Vertrag muss vor Beginn der Verarbeitung geschlossen sein (Art. 28 Abs. 3 DSGVO), Schriftform oder elektronische Form reicht (Art. 28 Abs. 9 DSGVO).",
      "Die Anlagen sind der eigentliche Inhalt. Ein AVV mit leerer TOM-Anlage und ohne konkrete Datenkategorien erfüllt Art. 28 Abs. 3 nicht. Beschreibe, was tatsächlich passiert, nicht was theoretisch möglich wäre.",
      "Bei US-Anbietern prüfen, ob eine Zertifizierung nach dem EU-US Data Privacy Framework vorliegt oder Standardvertragsklauseln (Durchführungsbeschluss (EU) 2021/914) geschlossen sind. Ein AVV allein deckt die Übermittlung ins Drittland nicht.",
      "Für Unterauftragnehmer gilt: allgemeine Genehmigung mit Informationspflicht und Widerspruchsrecht ist zulässig, aber die aktuelle Liste muss tatsächlich geführt und bei Änderungen mitgeteilt werden (Art. 28 Abs. 2 DSGVO).",
      "Keine Auftragsverarbeitung, sondern eigene Verantwortlichkeit liegt bei Steuerberatern, Rechtsanwälten, Paketdiensten und Zahlungsdienstleistern vor. Dort ist kein AVV nötig, sondern eine Übermittlung auf eigener Rechtsgrundlage.",
    ],
    faqs: [
      {
        q: "Wann brauche ich einen AVV und wann nicht?",
        a: "Einen AVV brauchst du, wenn ein Dienstleister personenbezogene Daten weisungsgebunden für dich verarbeitet, ohne eigene Entscheidung über Zwecke und Mittel: Hosting, E-Mail-Marketing-Tools, Fulfillment-Lager, externer Support, Agenturen mit Datenbankzugriff. Nicht nötig ist er bei eigenverantwortlich tätigen Dritten wie Steuerberater, Anwalt, Paketdienst oder Bank.",
      },
      {
        q: "Muss der AVV unterschrieben werden?",
        a: "Art. 28 Abs. 9 DSGVO verlangt Schriftform, lässt aber ausdrücklich ein elektronisches Format zu. Ein per E-Mail bestätigter PDF-Vertrag, eine Online-Zustimmung im Kundenkonto des Anbieters oder eine qualifizierte elektronische Signatur reichen. Wichtig ist, dass beide Seiten den Inhalt nachweisbar akzeptiert haben.",
      },
      {
        q: "Kann ich stattdessen die Standardvertragsklauseln der EU-Kommission für Auftragsverarbeiter nutzen?",
        a: "Ja, die Kommission hat mit Durchführungsbeschluss (EU) 2021/915 Standardvertragsklauseln für das Verhältnis Verantwortlicher zu Auftragsverarbeiter veröffentlicht. Sie sind umfangreicher und modular. Diese Vorlage ist der kompaktere, in Deutschland übliche Aufbau; beide erfüllen Art. 28 Abs. 3 DSGVO, wenn die Anlagen sauber ausgefüllt sind.",
      },
      {
        q: "Wer haftet, wenn beim Dienstleister Daten abfließen?",
        a: "Nach außen gegenüber Betroffenen haften Verantwortlicher und Auftragsverarbeiter nach Art. 82 DSGVO gemeinsam; der Auftragsverarbeiter aber nur, wenn er seine spezifischen Pflichten verletzt oder gegen Weisungen verstoßen hat. Im Innenverhältnis regelt § 11 der Vorlage den Ausgleich nach Verursachungsanteilen.",
      },
    ],
    seo: {
      title: "AVV Vorlage: Auftragsverarbeitungsvertrag | GründerX",
      description:
        "Auftragsverarbeitungsvertrag nach Art. 28 DSGVO als kostenlose Vorlage mit Anlagen für Datenkategorien, TOM, Unterauftragnehmer und Drittlandtransfer. Gratis.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/avv-auftragsverarbeitungsvertrag"),
  },
  {
    slug: "dropshipping-vertrag",
    titel: "Dropshipping-Vertrag",
    kurz: "Vertrag zwischen Shop-Betreiber und Dropshipping-Lieferanten: Bestellübermittlung, Versand im Namen des Händlers, Retouren, Produktsicherheit (GPSR, CE) und Daten.",
    kategorie: "ecommerce",
    dateiname: "Dropshipping-Vertrag",
    wofuer: [
      "Du betreibst einen Shop und lässt einen Hersteller oder Großhändler direkt an deine Kunden liefern",
      "Du bist Lieferant und willst Händlern ein klares Dropshipping-Angebot machen",
      "Wenn bisher nur die AGB des Lieferanten gelten und Retouren, Lieferzeiten und Haftung ungeregelt sind",
      "Als Grundlage für Lieferanten aus der EU; bei Drittlandlieferanten sind Zoll und Importeurspflichten zu ergänzen",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Rollen der Parteien",
      "§ 2 Produkte, Sortiment und Produktdaten",
      "§ 3 Einkaufspreise, Versandkosten, Zahlung",
      "§ 4 Bestellübermittlung und Bestandsdaten",
      "§ 5 Versand im Namen des Händlers (neutraler Versand)",
      "§ 6 Lieferzeiten und Lieferverzug",
      "§ 7 Retouren, Widerruf des Endkunden, Gewährleistung",
      "§ 8 Produktsicherheit, Konformität und Produkthaftung (GPSR, CE)",
      "§ 9 Datenschutz und Kundendaten",
      "§ 10 Marken, Geheimhaltung, Wettbewerb",
      "§ 11 Laufzeit und Kündigung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Gegenüber dem Endkunden bist immer du der Verkäufer, nicht der Lieferant. Widerruf, Gewährleistung und Lieferverzug treffen dich; der Vertrag regelt nur, was du beim Lieferanten zurückholen kannst.",
      "Seit der GPSR (Verordnung (EU) 2023/988, ab 13.12.2024) musst du im Online-Angebot Hersteller mit Anschrift und E-Mail, ggf. die verantwortliche Person in der EU und Sicherheitshinweise nennen. Kann der Lieferant diese Daten nicht liefern, darfst du das Produkt nicht anbieten.",
      "Liefert der Lieferant aus einem Drittland (z. B. China) direkt an deine Kunden, wirst du in der Regel selbst Importeur mit allen Pflichten (Produkthaftung nach § 4 Abs. 2 ProdHaftG, Konformität, Verpackungsregistrierung bei LUCID, ElektroG). Die Vorlage setzt einen EU-Lieferanten voraus.",
      "Umsatzsteuerlich ist Dropshipping ein Reihengeschäft. Wer bei Lieferungen ins EU-Ausland die bewegte Lieferung hat und wo du dich registrieren musst (OSS), klärst du mit dem Steuerberater, bevor du den ersten Auslandsauftrag annimmst.",
      "Jede Lieferzeit, die du im Shop versprichst, muss der Lieferant vertraglich einhalten. Vereinbare Bestandsdaten in Echtzeit oder tägliche Abgleiche, sonst verkaufst du Ware, die es nicht gibt.",
    ],
    faqs: [
      {
        q: "Wer haftet, wenn ein per Dropshipping geliefertes Produkt mangelhaft ist?",
        a: "Gegenüber dem Kunden du als Verkäufer, mit allen gesetzlichen Gewährleistungsrechten. Du kannst beim Lieferanten Rückgriff nehmen; die Vorlage regelt das in § 7 inklusive Fristen und Kostenerstattung. Für Produktschäden nach dem Produkthaftungsgesetz haftet der Hersteller oder Importeur, bei Drittlandware also oft du.",
      },
      {
        q: "Darf der Lieferant Rechnung und Lieferschein mit seinem Namen beilegen?",
        a: "Das solltest du vertraglich ausschließen. § 5 der Vorlage regelt den neutralen Versand: Lieferschein und Rechnung in deinem Namen, keine Werbung des Lieferanten, dein Absender auf dem Paket. Sonst wenden sich Kunden an den Lieferanten oder bestellen beim nächsten Mal direkt dort.",
      },
      {
        q: "Was muss ich wegen der GPSR im Shop angeben?",
        a: "Für jedes Produkt den Namen, die Postanschrift und eine E-Mail-Adresse des Herstellers, bei Herstellern außerhalb der EU zusätzlich die verantwortliche Person in der EU, eine Produktkennung sowie Warn- und Sicherheitshinweise in deutscher Sprache. Der Vertrag verpflichtet den Lieferanten, diese Daten vollständig und aktuell bereitzustellen.",
      },
      {
        q: "Brauche ich mit dem Dropshipping-Lieferanten einen Auftragsverarbeitungsvertrag?",
        a: "Der Lieferant erhält Name und Adresse deiner Kunden. Ob er Auftragsverarbeiter oder eigenständig Verantwortlicher ist, hängt davon ab, wie weisungsgebunden er handelt. Die Vorlage sieht vorsorglich einen AVV als Anlage vor und verpflichtet den Lieferanten, die Daten nur für die Lieferung zu nutzen. In der Datenschutzerklärung deines Shops musst du die Weitergabe nennen.",
      },
    ],
    seo: {
      title: "Dropshipping Vertrag Vorlage kostenlos | GründerX",
      description:
        "Dropshipping-Vertrag zwischen Shop und Lieferant als kostenlose Vorlage: Bestellübermittlung, neutraler Versand, Lieferzeiten, Retouren, GPSR, Haftung, Daten.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/dropshipping-vertrag"),
  },
  {
    slug: "lieferantenanfrage-grosshandel",
    titel: "Lieferantenanfrage an Hersteller / Großhändler",
    kurz: "Anschreiben für ein Händlerkonto bei Hersteller oder Großhändler: Firmenvorstellung, Gewerbenachweis, Mengen und die richtigen Fragen zu Preisliste, MOQ, Lieferzeiten und Rückgabe.",
    kategorie: "ecommerce",
    dateiname: "Lieferantenanfrage-Grosshandel",
    wofuer: [
      "Du willst als Online-Händler erstmals direkt beim Hersteller oder Großhändler einkaufen",
      "Eröffnung eines Händlerkontos (B2B-Zugang, Preisliste) bei einer Marke",
      "Anfrage für Konditionen, Staffelpreise, Dropshipping oder Gebietsschutz",
      "Als Nachfassvorlage, wenn eine erste Anfrage unbeantwortet blieb",
    ],
    enthaelt: [
      "Betreff und Ansprache mit Bezug zur Marke",
      "Kurze Vorstellung des eigenen Unternehmens und der Verkaufskanäle",
      "Nachweise: Gewerbeanmeldung, USt-IdNr., Handelsregister, Shop-Link",
      "Geplante Mengen und Sortiment",
      "Fragenkatalog: Preisliste, Staffelpreise, MOQ, Lieferzeiten, Zahlungsbedingungen",
      "Fragen zu Exklusivität, Gebietsschutz, Rückgabe, Produktdaten, Konformität",
      "Bitte um Händlerkonto, Ansprechpartner und nächste Schritte",
      "Anlagenverzeichnis",
    ],
    hinweise: [
      "Hersteller prüfen zuerst, ob du ein echtes Unternehmen bist. Ohne Gewerbeanmeldung, USt-IdNr. und einen besuchbaren Shop oder ein Konzept bekommst du in der Regel keine Antwort. Lege die Nachweise direkt bei.",
      "Nenne realistische Mengen. Wer 10.000 Stück ankündigt und dann 20 bestellt, verbrennt den Kontakt. Besser eine ehrliche Startmenge und ein Ausblick auf das erste Jahr.",
      "Frage nach Konformitätsunterlagen (CE, GPSR-Herstellerangaben, Sicherheitsdatenblätter) und Produktdaten (EAN, Bilder, Feeds). Ohne diese Daten kannst du die Ware rechtlich nicht anbieten.",
      "Marken mit selektivem Vertrieb dürfen Online-Händler ablehnen oder Anforderungen an die Präsentation stellen. Ein Nein ist dann rechtlich zulässig; frage nach den Kriterien und erfülle sie.",
    ],
    faqs: [
      {
        q: "Welche Unterlagen verlangen Großhändler für ein Händlerkonto?",
        a: "Üblich sind Gewerbeanmeldung oder Handelsregisterauszug, USt-IdNr., Impressum oder Link zum Shop, bei reglementierten Waren (Elektro, Kosmetik, Lebensmittel) teils weitere Nachweise. Manche verlangen eine Erstbestellung per Vorkasse. Je vollständiger die Anfrage, desto schneller die Freischaltung.",
      },
      {
        q: "Was ist eine MOQ und wie verhandle ich sie?",
        a: "MOQ ist die Mindestbestellmenge (Minimum Order Quantity) je Artikel oder je Bestellung. Frage nach der MOQ pro Artikel und pro Auftrag sowie nach Mischpaletten. Oft lässt sich eine geringere Startmenge gegen Vorkasse oder einen höheren Preis vereinbaren.",
      },
      {
        q: "Soll ich im ersten Anschreiben schon nach Exklusivität fragen?",
        a: "Kurz und ohne Druck, ja. Die Frage zeigt, dass du strategisch denkst. Erwarte aber kein Ja ohne Umsatzgeschichte. Realistischer sind Gebietsschutz für einzelne Kanäle oder zeitlich befristete Exklusivität bei Neuheiten gegen eine Abnahmeverpflichtung.",
      },
      {
        q: "Wie fasse ich nach, wenn keine Antwort kommt?",
        a: "Nach 7 bis 10 Werktagen einmal freundlich per E-Mail mit Bezug auf die Erstanfrage, danach ein Anruf beim Vertrieb. Frage nach dem richtigen Ansprechpartner für Neukunden im Online-Handel. Bleibt auch das ohne Reaktion, sind Distributoren oder Großhändler der Marke der nächste Weg.",
      },
    ],
    seo: {
      title: "Lieferantenanfrage Vorlage (Händlerkonto) | GründerX",
      description:
        "Anschreiben an Hersteller und Großhändler für Händlerkonto und Konditionen: Firmenvorstellung, Nachweise, Fragen zu Preisliste, MOQ, Lieferzeit, Exklusivität.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/lieferantenanfrage-grosshandel"),
  },
  {
    slug: "affiliate-vereinbarung",
    titel: "Affiliate-/Partnerprogramm-Vereinbarung",
    kurz: "Vertrag zwischen Shop-Betreiber und Affiliate: Tracking, Provision, Cookie-Laufzeit, Stornos, Auszahlung, erlaubte Werbemittel, Markenbidding-Verbot und Kennzeichnung.",
    kategorie: "ecommerce",
    dateiname: "Affiliate-Vereinbarung",
    wofuer: [
      "Du startest ein eigenes Partnerprogramm für deinen Shop oder dein digitales Produkt",
      "Zusammenarbeit mit Bloggern, YouTubern, Influencern oder Vergleichsseiten auf Provisionsbasis",
      "Als Programmbedingungen für ein Affiliate-Tool (Tapfiliate, Post Affiliate Pro, eigene Lösung)",
      "Wenn du bisher nur mündlich oder per E-Mail Provisionen zugesagt hast",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Teilnahme am Partnerprogramm",
      "§ 2 Partnerlinks, Tracking und Cookie-Laufzeit",
      "§ 3 Provision und provisionspflichtige Transaktionen",
      "§ 4 Stornierungen und Rückbelastungen",
      "§ 5 Abrechnung und Auszahlung",
      "§ 6 Zulässige Werbemittel und Werbeformen",
      "§ 7 Unzulässige Werbung, Markenbidding-Verbot",
      "§ 8 Kennzeichnung und Datenschutz auf der Partnerseite",
      "§ 9 Pflichten des Betreibers",
      "§ 10 Laufzeit, Kündigung, Sperrung",
      "§ 11 Haftung und Schlussbestimmungen",
    ],
    hinweise: [
      "Der Affiliate muss seine Werbung als solche kennzeichnen (§ 5a Abs. 4 UWG). Verschleierte Empfehlungen können auch dich als Auftraggeber treffen. Die Vorlage verpflichtet den Partner ausdrücklich dazu.",
      "Affiliate-Tracking-Cookies auf der Partnerseite brauchen nach § 25 TDDDG eine Einwilligung des Besuchers. Ohne Consent-Banner beim Partner läuft das Tracking rechtswidrig und die Provision ins Leere.",
      "Markenbidding (Google-Ads auf deinen Markennamen) ist für dich teuer und kann deine eigene Kampagne verdrängen. Das Verbot in § 7 nur aufnehmen, wenn du es auch kontrollierst.",
      "Provisionen sind Umsatz des Affiliates. Bei Gutschriftverfahren (§ 14 Abs. 2 UStG) brauchst du die USt-IdNr. oder den Kleinunternehmerstatus des Partners; bei EU-Partnern gilt Reverse Charge.",
      "Provisionen nur auf tatsächlich bezahlte und nicht widerrufene Bestellungen zahlen. Eine Stornofrist von mindestens 30 Tagen deckt den Widerruf und die üblichen Retouren ab.",
    ],
    faqs: [
      {
        q: "Ist der Affiliate ein Handelsvertreter?",
        a: "In der Regel nein. Der Affiliate vermittelt nicht ständig und nicht als Beauftragter im Sinne des § 84 HGB, sondern stellt Werbeflächen und Links bereit. Die Vorlage stellt das klar und schließt Ausgleichsansprüche nach § 89b HGB aus. Bei intensiver, exklusiver Vermittlungstätigkeit kann die Einordnung anders ausfallen.",
      },
      {
        q: "Welche Cookie-Laufzeit ist üblich?",
        a: "Zwischen 7 und 90 Tagen, bei vielen Shops 30 Tage. Die Laufzeit bestimmt, wie lange nach dem Klick ein Kauf dem Partner zugerechnet wird. Kürzere Laufzeiten senken deine Kosten, längere motivieren Partner. Entscheidend ist das Last-Click- oder First-Click-Modell, das die Vorlage ebenfalls festlegt.",
      },
      {
        q: "Darf ich Provisionen bei Widerruf oder Retoure zurückfordern?",
        a: "Ja, wenn der Vertrag das vorsieht. Die Vorlage definiert die provisionspflichtige Transaktion als vollständig bezahlte und nicht rückabgewickelte Bestellung und verrechnet Stornos mit der nächsten Abrechnung. Ohne diese Regelung könnte ein Partner die Provision auch für widerrufene Käufe verlangen.",
      },
      {
        q: "Was muss der Partner auf seiner Website beachten?",
        a: "Werbekennzeichnung, Impressum, Datenschutzerklärung mit Nennung des Affiliate-Trackings und eine Einwilligung für Tracking-Cookies. Außerdem darf er keine unerlaubten Werbemails versenden (§ 7 UWG) und keine irreführenden Aussagen über dein Produkt machen. Verstöße berechtigen dich zur Sperrung.",
      },
    ],
    seo: {
      title: "Affiliate Vertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Affiliate-Vereinbarung für dein Partnerprogramm als kostenlose Vorlage: Tracking, Cookie-Laufzeit, Provision, Stornos, Auszahlung, Markenbidding-Verbot.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/affiliate-vereinbarung"),
  },
  {
    slug: "vertriebspartnervertrag",
    titel: "Vertriebspartnervertrag (Reseller)",
    kurz: "Vertrag zwischen Hersteller und Wiederverkäufer: Produkte, Gebiet, Einkaufskonditionen, Mindestabnahme, Markennutzung, unverbindliche Preisempfehlung ohne Preisbindung, Laufzeit.",
    kategorie: "ecommerce",
    dateiname: "Vertriebspartnervertrag-Reseller",
    wofuer: [
      "Du stellst Produkte her oder importierst sie und willst sie über Händler verkaufen lassen",
      "Du bist Händler und willst eine Marke als autorisierter Reseller führen",
      "Aufbau eines Händlernetzes mit Gebiets- oder Kanalaufteilung",
      "Wenn bisher nur Bestellungen ohne Rahmenvertrag laufen und Rabatte, Gebiete und Marken ungeregelt sind",
    ],
    enthaelt: [
      "§ 1 Gegenstand, Stellung des Vertriebspartners",
      "§ 2 Vertragsprodukte und Vertragsgebiet",
      "§ 3 Einkaufspreise, Rabatte, Zahlungsbedingungen",
      "§ 4 Bestellung, Lieferung, Gefahrübergang, Eigentumsvorbehalt",
      "§ 5 Mindestabnahme und Berichtspflichten",
      "§ 6 Wiederverkaufspreise (unverbindliche Preisempfehlung)",
      "§ 7 Marken, Werbung, Produktpräsentation",
      "§ 8 Gewährleistung, Rügepflicht, Produkthaftung, Rückruf",
      "§ 9 Geheimhaltung und Kundendaten",
      "§ 10 Laufzeit, Kündigung, Vertragsende",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Preisbindung ist verboten: Du darfst dem Händler keine Mindest- oder Festpreise für den Weiterverkauf vorgeben (§ 1 GWB, Art. 101 AEUV, Art. 4 lit. a Vertikal-GVO 2022/720). Nur unverbindliche Preisempfehlungen und Höchstpreise sind zulässig; Druck oder Anreize zur Einhaltung der UVP sind ebenfalls verboten.",
      "Ein Verbot des Online-Verkaufs oder des Verkaufs über Marktplätze ist nur in engen Grenzen zulässig (qualitative Kriterien im selektiven Vertrieb). Ein pauschales Verbot macht die Klausel nichtig und kann ein Bußgeld auslösen.",
      "Passive Verkäufe (Kunden aus anderen Gebieten, die von sich aus bestellen) dürfen dem Händler nicht verboten werden. Nur aktive Verkäufe in ein exklusiv anderen Partnern zugewiesenes Gebiet dürfen eingeschränkt werden.",
      "Ein Vertragshändler kann nach Vertragsende einen Ausgleichsanspruch analog § 89b HGB haben, wenn er wie ein Handelsvertreter in die Absatzorganisation eingebunden ist und seinen Kundenstamm überlassen muss. Die Vorlage vermeidet die Pflicht zur Überlassung der Kundendaten.",
      "Unter Kaufleuten gilt die Rügepflicht des § 377 HGB: Der Händler muss die Ware sofort prüfen und Mängel unverzüglich anzeigen, sonst gilt sie als genehmigt. Die Vorlage legt die Frist fest.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Vertriebspartner (Reseller) und Handelsvertreter?",
        a: "Der Reseller kauft die Ware auf eigene Rechnung und verkauft sie im eigenen Namen weiter; sein Gewinn ist die Handelsspanne. Der Handelsvertreter vermittelt nur Geschäfte für den Hersteller und bekommt Provision, die Ware bleibt beim Hersteller. Diese Vorlage ist ein Reseller-Vertrag; für Handelsvertreter gelten die zwingenden §§ 84 ff. HGB.",
      },
      {
        q: "Darf ich dem Händler die UVP vorschreiben?",
        a: "Nein. Du darfst eine unverbindliche Preisempfehlung aussprechen und Höchstpreise setzen, aber der Händler muss frei entscheiden können, welchen Preis er verlangt. Sanktionen, Rabattkürzungen oder Lieferstopps wegen Unterschreitung der UVP sind verbotene Preisbindung und werden vom Bundeskartellamt mit Bußgeldern verfolgt.",
      },
      {
        q: "Kann ich dem Händler ein exklusives Gebiet geben?",
        a: "Ja, Alleinvertrieb ist zulässig. Du darfst anderen Händlern dann aktive Verkäufe (gezielte Werbung, Außendienst) in dieses Gebiet untersagen. Passive Verkäufe an Kunden, die von sich aus aus dem Gebiet bestellen, bleiben immer erlaubt, auch über den Online-Shop.",
      },
      {
        q: "Was passiert mit dem Restbestand beim Händler nach Kündigung?",
        a: "Ohne Regelung darf der Händler ihn abverkaufen, auch unter der Marke. Die Vorlage sieht ein Rückkaufrecht des Herstellers zum Einkaufspreis abzüglich eines Abschlags und eine Abverkaufsfrist vor. So verhinderst du, dass die Ware nach Vertragsende verramscht wird.",
      },
    ],
    seo: {
      title: "Vertriebspartnervertrag Vorlage kostenlos | GründerX",
      description:
        "Vertriebspartner- und Reseller-Vertrag als kostenlose Vorlage: Produkte, Gebiet, Rabatte, Mindestabnahme, Marken, UVP ohne Preisbindung, Laufzeit, Kündigung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/vertriebspartnervertrag"),
  },
  {
    slug: "angebot-vorlage",
    titel: "Verbindliches Angebot (B2B)",
    kurz: "Angebotsschreiben an Geschäftskunden mit Positionen, Netto- und Bruttopreisen, Lieferzeit, Zahlungsbedingungen, Bindefrist und klarer Annahmeregel.",
    kategorie: "ecommerce",
    dateiname: "Angebot-B2B",
    wofuer: [
      "Du verkaufst Waren oder Dienstleistungen an Unternehmen und willst ein sauberes Angebot schicken",
      "Projektangebote von Agenturen, Handwerkern, Händlern und Freelancern",
      "Wenn du bisher Preise per E-Mail nennst und Streit über Umfang, Frist oder Gültigkeit entsteht",
      "Als Vorstufe zur Auftragsbestätigung und Rechnung mit denselben Positionen",
    ],
    enthaelt: [
      "Briefkopf mit Pflichtangaben und Angebotsnummer",
      "Leistungsbeschreibung und Positionsliste mit Einzel- und Gesamtpreisen",
      "Netto, Umsatzsteuer, Brutto",
      "Lieferzeit bzw. Leistungszeitraum",
      "Zahlungsbedingungen und Skonto",
      "Bindefrist und Gültigkeit des Angebots",
      "Annahme, AGB-Einbeziehung, Eigentumsvorbehalt",
      "Unterschrift und Annahmevermerk für den Kunden",
    ],
    hinweise: [
      "Ein verbindliches Angebot bindet dich bis zum Ablauf der Bindefrist (§ 145 BGB). Nimmt der Kunde innerhalb der Frist an, ist der Vertrag geschlossen, auch wenn sich deine Einkaufspreise inzwischen geändert haben. Setze die Frist deshalb kurz.",
      "Wer sich nicht binden will, schreibt „freibleibend“ oder „unverbindlich“. Dann ist dein Schreiben nur eine Einladung, und erst deine Auftragsbestätigung schließt den Vertrag. Die Vorlage ist bewusst verbindlich; die Alternative steht als Variante drin.",
      "Nimmt der Kunde mit Änderungen an (andere Menge, anderer Preis, andere Frist), ist das eine Ablehnung mit neuem Angebot (§ 150 Abs. 2 BGB). Dann musst du erneut bestätigen, sonst gibt es keinen Vertrag.",
      "Deine AGB gelten nur, wenn du im Angebot auf sie hinweist und der Kunde sie einsehen kann. Unter Unternehmern reicht der Hinweis mit Link oder Anlage; bei kollidierenden AGB des Kunden gelten nur die übereinstimmenden Teile.",
    ],
    faqs: [
      {
        q: "Wie lange sollte die Bindefrist sein?",
        a: "So kurz, wie es das Geschäft erlaubt: bei Handelsware 7 bis 14 Tage, bei Projekten 30 Tage. Ohne Angabe gilt bei schriftlichen Angeboten die Frist, in der du eine Antwort unter regelmäßigen Umständen erwarten darfst (§ 147 Abs. 2 BGB), was im Streit unklar ist. Die Vorlage nennt ein festes Datum.",
      },
      {
        q: "Was ist der Unterschied zwischen Angebot und Kostenvoranschlag?",
        a: "Ein Kostenvoranschlag ist eine unverbindliche Schätzung, die ohne Vereinbarung nicht vergütet wird (§ 632 Abs. 3 BGB) und bei wesentlicher Überschreitung eine Anzeigepflicht auslöst (§ 650 BGB). Ein Angebot nennt feste Preise und wird mit der Annahme zum Vertrag. Für Händler und Dienstleister mit kalkulierbaren Leistungen ist das Angebot die bessere Wahl.",
      },
      {
        q: "Muss der Kunde das Angebot unterschreiben?",
        a: "Nein, die Annahme ist formfrei und kann per E-Mail, Bestellung oder schlüssiges Verhalten erfolgen. Die Vorlage enthält trotzdem einen Annahmevermerk mit Unterschrift, weil das Beweisprobleme vermeidet. Für Verbraucher gelten zusätzliche Informationspflichten; diese Vorlage ist für Geschäftskunden gedacht.",
      },
      {
        q: "Muss ich im Angebot Brutto- oder Nettopreise angeben?",
        a: "Gegenüber Unternehmern sind Nettopreise mit gesondert ausgewiesener Umsatzsteuer üblich und zulässig. Gegenüber Verbrauchern musst du nach der Preisangabenverordnung Gesamtpreise inklusive Umsatzsteuer nennen. Die Vorlage weist beides aus, damit die Summe eindeutig ist.",
      },
    ],
    seo: {
      title: "Angebot Vorlage B2B kostenlos (Word & PDF) | GründerX",
      description:
        "Angebotsvorlage für Geschäftskunden: Positionen, Netto- und Bruttopreise, Lieferzeit, Zahlungsbedingungen, Bindefrist, Annahme und AGB-Hinweis. Kostenlos.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/angebot-vorlage"),
  },
  {
    slug: "auftragsbestaetigung",
    titel: "Auftragsbestätigung",
    kurz: "Auftragsbestätigung an Geschäftskunden mit Positionen, Terminen, AGB-Einbeziehung und Hinweis auf die Wirkung als kaufmännisches Bestätigungsschreiben.",
    kategorie: "ecommerce",
    dateiname: "Auftragsbestaetigung",
    wofuer: [
      "Du bestätigst eine Bestellung oder einen mündlich bzw. telefonisch erteilten Auftrag eines Geschäftskunden",
      "Annahme einer Bestellung, die vom Angebot abweicht",
      "Wenn dein Angebot freibleibend war und der Vertrag erst durch deine Bestätigung zustande kommt",
      "Als Nachweis für Umfang, Preis und Termin vor Lieferung oder Leistungsbeginn",
    ],
    enthaelt: [
      "Briefkopf mit Pflichtangaben und Bezug auf Angebot und Bestellung",
      "Bestätigte Positionen mit Mengen und Preisen",
      "Liefertermin bzw. Leistungszeitraum und Lieferadresse",
      "Zahlungsbedingungen",
      "Hinweis auf Abweichungen zur Bestellung",
      "AGB-Einbeziehung und Abwehrklausel",
      "Hinweis auf die Wirkung als kaufmännisches Bestätigungsschreiben",
      "Unterschrift und Ansprechpartner",
    ],
    hinweise: [
      "Unter Kaufleuten gilt: Wer einer Auftragsbestätigung nicht unverzüglich widerspricht, akzeptiert ihren Inhalt, auch wenn sie vom mündlich Vereinbarten abweicht (Grundsätze des kaufmännischen Bestätigungsschreibens). Das gilt in beide Richtungen: Prüfe auch Bestätigungen deiner Lieferanten sofort.",
      "Abweichungen von der Bestellung musst du deutlich hervorheben. Versteckte Änderungen in einer Bestätigung binden den Kunden nicht, und bei bewussten Abweichungen, die der Kunde erkennbar nicht akzeptieren würde, greift die Wirkung des Bestätigungsschreibens nicht.",
      "Deine AGB nachträglich über die Auftragsbestätigung einzuführen, funktioniert nur unter Unternehmern und nur, wenn der Kunde nicht widerspricht. Sicherer ist der Hinweis bereits im Angebot.",
      "Die Auftragsbestätigung ist keine Rechnung. Sie löst keine Umsatzsteuer aus und darf keine Rechnungsmerkmale vortäuschen; schreibe nicht „Rechnung“ oder „zahlbar sofort“.",
    ],
    faqs: [
      {
        q: "Was ist ein kaufmännisches Bestätigungsschreiben?",
        a: "Ein Schreiben, mit dem ein Kaufmann einem anderen den Inhalt einer vorher mündlich oder telefonisch getroffenen Vereinbarung bestätigt. Schweigt der Empfänger, gilt der Inhalt als vereinbart, selbst wenn er vom Gespräch abweicht. Die Vorlage nutzt diese Wirkung mit einem ausdrücklichen Hinweis, damit der Kunde Abweichungen sofort prüft.",
      },
      {
        q: "Wann kommt der Vertrag zustande: mit der Bestellung oder mit der Bestätigung?",
        a: "Das hängt davon ab, ob dein Angebot verbindlich war. War es verbindlich, kommt der Vertrag mit der Bestellung des Kunden zustande und die Bestätigung ist nur eine Dokumentation. War das Angebot freibleibend oder gab es keins, ist die Bestellung das Angebot und deine Auftragsbestätigung die Annahme.",
      },
      {
        q: "Was mache ich, wenn der Kunde andere Konditionen bestellt hat als angeboten?",
        a: "Dann ist seine Bestellung ein neues Angebot (§ 150 Abs. 2 BGB). Du kannst es annehmen, indem du genau diese Konditionen bestätigst, oder du bestätigst mit deinen Konditionen und hebst die Abweichung deutlich hervor. Im zweiten Fall ist deine Bestätigung wieder ein neues Angebot, das der Kunde annehmen muss, etwa durch Schweigen unter Kaufleuten oder durch Abnahme der Lieferung.",
      },
      {
        q: "Muss die Auftragsbestätigung unterschrieben sein?",
        a: "Nein, Textform per E-Mail reicht. Wichtig ist, dass sie dem Kunden zugeht und du den Zugang nachweisen kannst. Bei größeren Aufträgen lohnt sich die Bitte um Gegenzeichnung, die die Vorlage als Option vorsieht.",
      },
    ],
    seo: {
      title: "Auftragsbestätigung Vorlage kostenlos (Word) | GründerX",
      description:
        "Auftragsbestätigung für Geschäftskunden als kostenlose Vorlage: Positionen, Termine, Zahlungsbedingungen, AGB-Einbeziehung und Bestätigungsschreiben.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/auftragsbestaetigung"),
  },
  {
    slug: "agb-dienstleistungen-b2b",
    titel: "AGB für Dienstleistungen und Agenturen (B2B)",
    kurz: "Allgemeine Geschäftsbedingungen für Agenturen, Berater, Entwickler und andere Dienstleister gegenüber Unternehmern: Leistungen, Mitwirkung, Vergütung, Nutzungsrechte, Abnahme, Haftung.",
    kategorie: "ecommerce",
    dateiname: "AGB-Dienstleistungen-B2B",
    wofuer: [
      "Agenturen (Marketing, Design, Web, Social Media) mit Geschäftskunden",
      "Freelancer und Berater, die regelmäßig für Unternehmen arbeiten",
      "Software- und App-Entwicklung, Content-Produktion, Fotografie im B2B-Bereich",
      "Wenn Angebote und Verträge auf einen festen Bedingungsrahmen verweisen sollen",
    ],
    enthaelt: [
      "§ 1 Geltungsbereich",
      "§ 2 Vertragsschluss, Angebote, Leistungsänderungen",
      "§ 3 Leistungen und Leistungszeit",
      "§ 4 Mitwirkung des Auftraggebers",
      "§ 5 Vergütung, Fälligkeit, Verzug",
      "§ 6 Abnahme bei Werkleistungen",
      "§ 7 Nutzungsrechte",
      "§ 8 Gewährleistung",
      "§ 9 Haftung",
      "§ 10 Geheimhaltung und Datenschutz",
      "§ 11 Laufzeit und Kündigung",
      "§ 12 Schlussbestimmungen, Gerichtsstand",
    ],
    hinweise: [
      "Diese AGB gelten nur gegenüber Unternehmern (§ 14 BGB). Gegenüber Verbrauchern sind viele Klauseln (Haftungsbegrenzung, Gerichtsstand, Abnahmefiktion, Verjährung) unwirksam. Prüfe bei jedem Auftrag, wer dein Kunde ist.",
      "AGB gelten nur, wenn sie wirksam einbezogen sind: Hinweis im Angebot oder in der Auftragsbestätigung und Zugänglichkeit. Schickt der Kunde eigene Einkaufsbedingungen, gelten bei Widerspruch nur die übereinstimmenden Teile; die Abwehrklausel allein löst das nicht.",
      "Die Haftungsbegrenzung ist nur in der Form der Vorlage wirksam: Vorsatz, grobe Fahrlässigkeit, Personenschäden und Kardinalpflichten dürfen nicht ausgeschlossen werden (§ 307 BGB, § 309 Nr. 7 BGB gilt über § 310 Abs. 1 BGB als Wertungsmaßstab auch im B2B-Bereich).",
      "Nutzungsrechte entstehen nicht automatisch mit der Zahlung. Ohne Klausel bekommt der Kunde nach § 31 Abs. 5 UrhG nur die Rechte, die der Vertragszweck erfordert. Die Vorlage regelt Umfang, Zeitpunkt und Vorbehalt bis zur Zahlung ausdrücklich.",
      "Bei Dauerverträgen mit Agenturen ist die Laufzeit frei verhandelbar, aber überlange Bindung ohne Kündigungsmöglichkeit kann auch im B2B-Bereich unangemessen sein. Die Vorlage sieht eine Mindestlaufzeit mit anschließender monatlicher Kündigung vor.",
    ],
    faqs: [
      {
        q: "Brauche ich als Freelancer wirklich AGB?",
        a: "Pflicht sind sie nicht, aber ohne AGB gilt das Gesetz, das unter anderem keine Haftungsbegrenzung, keine Abnahmefiktion und keine klare Regelung zu Nutzungsrechten enthält. Mit AGB regelst du das einmal und verweist in jedem Angebot darauf, statt es jedes Mal neu zu verhandeln.",
      },
      {
        q: "Was ist der Unterschied zwischen Dienst- und Werkvertrag und warum ist das wichtig?",
        a: "Beim Werkvertrag schuldest du einen Erfolg (fertige Website, Logo, Software) und der Kunde zahlt nach Abnahme; Mängel berechtigen zur Nachbesserung, Minderung oder Rücktritt. Beim Dienstvertrag schuldest du Tätigkeit (Beratung, Betreuung, Stunden) ohne Erfolgsgarantie. Die Vorlage deckt beides ab und ordnet die Abnahme nur Werkleistungen zu.",
      },
      {
        q: "Kann ich die Haftung komplett ausschließen?",
        a: "Nein. Haftung für Vorsatz und grobe Fahrlässigkeit, für Schäden an Leben, Körper und Gesundheit sowie für die Verletzung wesentlicher Vertragspflichten darf auch gegenüber Unternehmern nicht ausgeschlossen werden. Zulässig ist, die Haftung für leichte Fahrlässigkeit bei Kardinalpflichten auf den vorhersehbaren Schaden zu begrenzen und im Übrigen auszuschließen. Genau so ist § 9 der Vorlage gebaut.",
      },
      {
        q: "Wann darf ich die Nutzungsrechte zurückhalten?",
        a: "Bis zur vollständigen Bezahlung, wenn das vereinbart ist. Die Vorlage überträgt die Nutzungsrechte aufschiebend bedingt durch die Zahlung der Vergütung. Nutzt der Kunde das Werk vorher, verletzt er dein Urheberrecht, was dir neben der Vergütung auch Unterlassungs- und Schadensersatzansprüche gibt.",
      },
    ],
    seo: {
      title: "AGB Vorlage Dienstleistungen B2B kostenlos | GründerX",
      description:
        "AGB für Agenturen, Berater und Freelancer gegenüber Unternehmern als kostenlose Vorlage: Leistungen, Mitwirkung, Vergütung, Nutzungsrechte, Abnahme, Haftung.",
    },
    stand: "2026-10",
    inhalt: () => import("./inhalte/agb-dienstleistungen-b2b"),
  },
];
