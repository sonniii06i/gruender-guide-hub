// Inhalt der Vorlage „rechnung-kleinunternehmer“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../finanzen.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du die Kleinunternehmer-Rechnung brauchst",
        text: `Wer die Kleinunternehmerregelung nutzt, schreibt Rechnungen ohne Umsatzsteuer. Das klingt einfach, hat aber eigene Regeln: Die Rechnung muss den Grund für den fehlenden Steuerausweis nennen, darf keine Steuer ausweisen und braucht trotzdem die Pflichtangaben, damit dein Kunde sie als Betriebsausgabe buchen kann. Die Vorlage brauchst du als nebenberuflicher Freelancer, als Shop-Betreiber unter 25.000 EUR Vorjahresumsatz, als Gründer im ersten Jahr, der sich für die Kleinunternehmerregelung entschieden hat, und als Dienstleister für Plattformen oder Agenturen, die statt deiner Rechnung eine Gutschrift ausstellen.

Sie enthält eine vollständige Rechnung mit Positionen, Zahlungsziel und Verzugshinweis sowie eine Gutschrift-Variante und Hinweise zu E-Rechnung, Umsatzgrenzen und Aufbewahrung.`,
      },
      {
        titel: "Pflichtangaben: Was muss auf eine Rechnung nach § 19 UStG?",
        text: `Für Kleinunternehmer gelten seit 2025 reduzierte Pflichtangaben nach § 34a UStDV. Die Vorlage enthält sie alle und ergänzt die Angaben, die Kunden und Buchhaltung erwarten:

- Vollständiger Name und Anschrift von dir und deinem Kunden
- Deine Steuernummer oder Umsatzsteuer-Identifikationsnummer
- Ausstellungsdatum der Rechnung
- Menge und Art der Lieferung oder Umfang und Art der Leistung
- Entgelt in einer Summe, ohne Aufteilung in Netto und Steuer
- Den Hinweis, dass nach § 19 UStG keine Umsatzsteuer berechnet wird
- Fortlaufende Rechnungsnummer und Leistungszeitraum, die gesetzlich nicht vorgeschrieben, aber dringend zu empfehlen sind
- Zahlungsziel, Bankverbindung und optional den Verzugshinweis nach § 286 BGB
- Bei Gutschriften das Wort „Gutschrift“ und den Hinweis auf die Vereinbarung zum Gutschriftsverfahren

Was nicht auf die Rechnung gehört: ein Steuersatz, ein Steuerbetrag oder die Formulierung „inkl. MwSt.“. Jede dieser Angaben kann als Steuerausweis gelten und dich zur Zahlung der Steuer verpflichten.`,
      },
      {
        titel: "Rechnungsvorlage ausfüllen: Schritt für Schritt",
        text: `Trage im Kopf deine Daten mit Steuernummer ein; die USt-IdNr. brauchst du nur, wenn du eine hast, etwa für Geschäfte mit EU-Kunden. Beim Empfänger nennst du Firma, Ansprechpartner und Anschrift. Vergib die Rechnungsnummer fortlaufend und lückenlos, zum Beispiel nach dem Schema Jahr-Zähler. Setze Rechnungsdatum und Leistungszeitraum ein; bei Dauerleistungen den Monat, bei Einzelaufträgen den Tag der Fertigstellung. Fülle die Positionen mit Bezeichnung, Menge, Einzelpreis und Gesamtbetrag; nicht genutzte Zeilen löschst du.

Rechne den Rechnungsbetrag zusammen und lass den Satz zur Steuerbefreiung nach § 19 UStG unverändert stehen. Trage Zahlungsziel und Bankverbindung ein. Den optionalen Verzugshinweis übernimmst du, wenn das Zahlungsdatum mit dem Kunden vereinbart ist und du ohne Mahnung Verzugszinsen berechnen können willst; der Satz zu Verbrauchern ist Voraussetzung für die 30-Tage-Regel. Für Plattformen oder Agenturen nutzt du die Gutschrift-Variante, in der der Kunde als Aussteller steht und deine Daten als leistender Unternehmer.`,
      },
      {
        titel: "Typische Fehler bei Kleinunternehmer-Rechnungen",
        text: `Der teuerste Fehler ist der versehentliche Steuerausweis. Steht auf der Rechnung „19 % MwSt.“ oder ein Steuerbetrag, schuldest du diese Steuer dem Finanzamt (§ 14c UStG), obwohl dein Kunde sie nicht als Vorsteuer abziehen darf. Prüfe deshalb Rechnungsprogramme und Shop-Systeme, die standardmäßig Steuer ausweisen. Der zweite Fehler ist der fehlende Hinweis auf § 19 UStG; ohne ihn fehlt eine Pflichtangabe, und Geschäftskunden reklamieren die Rechnung. Der dritte Fehler sind Lücken in der Rechnungsnummer; die Betriebsprüfung sucht zuerst danach.

Der vierte Fehler ist, die Umsatzgrenze aus den Augen zu verlieren: Über 25.000 EUR Vorjahresumsatz bist du im Folgejahr Regelbesteuerer, über 100.000 EUR im laufenden Jahr sofort ab dem Umsatz, der die Grenze überschreitet. Der fünfte Fehler ist das Postfach, das keine E-Rechnungen empfangen kann; seit 2025 musst du XRechnung und ZUGFeRD von anderen Unternehmen annehmen und unverändert archivieren.`,
      },
      {
        titel: "Rechtsgrundlagen: § 19 UStG, § 34a UStDV, § 14c UStG, E-Rechnung",
        text: `Die Kleinunternehmerregelung steht in § 19 UStG: Umsätze sind steuerfrei, wenn der Gesamtumsatz im Vorjahr 25.000 EUR und im laufenden Jahr 100.000 EUR nicht überschreitet. Der Verzicht auf die Regelung bindet fünf Kalenderjahre (§ 19 Abs. 3 UStG). Die Pflichtangaben der Rechnung regelt für Kleinunternehmer § 34a UStDV; Kleinunternehmer dürfen weiterhin Papier- und PDF-Rechnungen ausstellen (§ 34a Satz 4 UStDV), müssen aber E-Rechnungen anderer Unternehmer empfangen können.

Ein unberechtigter Steuerausweis führt zur Steuerschuld nach § 14c UStG. Die Gutschrift als Rechnung des Leistungsempfängers setzt eine vorherige Vereinbarung voraus (§ 14 Abs. 2 UStG). Rechnungen sind acht Jahre aufzubewahren (§ 14b UStG). Für Umsätze an Kunden in anderen EU-Staaten gibt es seit 2025 die EU-Kleinunternehmerregelung (§ 19a UStG) mit Registrierung beim Bundeszentralamt für Steuern. Einkommensteuer und Gewerbesteuer bleiben von der Kleinunternehmerregelung unberührt.`,
      },
      {
        titel: "Wann die Rechnungsvorlage nicht reicht",
        text: `Die Vorlage reicht für Rechnungen und Gutschriften eines Kleinunternehmers an Kunden in Deutschland. Sie reicht nicht, wenn du die Regelung verlassen hast oder die Grenzen überschreitest; dann brauchst du eine Rechnung mit Steuersatz, Steuerbetrag und allen Angaben des § 14 Abs. 4 UStG. Sie reicht auch nicht für Leistungen an Unternehmen im EU-Ausland mit Reverse-Charge-Hinweis, für Rechnungen an Behörden, die eine XRechnung verlangen, und für Dauerrechnungen mit Mietcharakter.

Ob die Kleinunternehmerregelung für dich überhaupt sinnvoll ist, hängt von Kundenstruktur und Vorsteuern ab; das rechnest du mit dem Steuerberater durch. GründerX stellt die Vorlage als Werkzeug bereit, nicht als Steuerberatung.`,
      },
    ],
  text: `Rechnung (Kleinunternehmer nach § 19 UStG)

[Firma / Vorname Nachname]
[Straße, PLZ Ort]
[Telefon, E-Mail, Website]
Steuernummer: [Steuernummer] [oder USt-IdNr.: [USt-IdNr.]]

Rechnungsempfänger:
[Firma / Vorname Nachname]
[Ansprechpartner]
[Straße, PLZ Ort]
[Kundennummer: [Kundennummer]]

Rechnungsnummer: [fortlaufende Nummer, z. B. 2026-0042]
Rechnungsdatum: [Datum]
Leistungsdatum / Leistungszeitraum: [Datum oder Zeitraum, z. B. 01.10.2026 bis 15.10.2026]
[Auftrags- / Angebotsnummer: [Nummer]]

Rechnung Nr. [Rechnungsnummer]

Sehr geehrte Damen und Herren,

für die nachfolgend aufgeführten Leistungen stelle ich Ihnen vereinbarungsgemäß in Rechnung:

Pos. 1: [Bezeichnung der Leistung oder Lieferung, z. B. „Erstellung von 4 Social-Media-Grafiken“], Menge: [Zahl] [Stück / Stunden / Pauschale], Einzelpreis: [Betrag] EUR, Gesamt: [Betrag] EUR
Pos. 2: [Bezeichnung], Menge: [Zahl], Einzelpreis: [Betrag] EUR, Gesamt: [Betrag] EUR
Pos. 3: [Bezeichnung], Menge: [Zahl], Einzelpreis: [Betrag] EUR, Gesamt: [Betrag] EUR

Rechnungsbetrag: [Gesamtbetrag] EUR

Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.

Bitte überweisen Sie den Rechnungsbetrag von [Gesamtbetrag] EUR bis zum [Zahlungsziel, z. B. 14 Tage nach Rechnungsdatum] ohne Abzug auf das folgende Konto:

Kontoinhaber: [Name]
IBAN: [IBAN]
BIC: [BIC]
Bank: [Bank]
Verwendungszweck: [Rechnungsnummer]

[Optional, nur wenn das Zahlungsdatum vertraglich vereinbart ist: Bei Zahlung nach dem [Datum] geraten Sie ohne weitere Mahnung in Verzug (§ 286 Abs. 2 Nr. 1 BGB). Verbraucher geraten spätestens 30 Tage nach Zugang dieser Rechnung in Verzug (§ 286 Abs. 3 BGB).]

Vielen Dank für Ihren Auftrag.

Mit freundlichen Grüßen

[Vorname Nachname]


Variante: Gutschrift (Abrechnung durch den Leistungsempfänger)

Gutschrift

Aussteller der Gutschrift (Leistungsempfänger):
[Firma], [Straße, PLZ Ort], Steuernummer / USt-IdNr.: [Nummer]

Leistender Unternehmer (Gutschriftsempfänger):
[Vorname Nachname / Firma], [Straße, PLZ Ort], Steuernummer / USt-IdNr.: [Nummer]

Gutschriftsnummer: [Nummer]
Datum: [Datum]
Leistungszeitraum: [Zeitraum]

Abgerechnete Leistungen:
Pos. 1: [Bezeichnung], Menge: [Zahl], Einzelpreis: [Betrag] EUR, Gesamt: [Betrag] EUR
Pos. 2: [Bezeichnung], Menge: [Zahl], Einzelpreis: [Betrag] EUR, Gesamt: [Betrag] EUR

Gutschriftsbetrag: [Gesamtbetrag] EUR

Der leistende Unternehmer ist Kleinunternehmer; gemäß § 19 UStG wird keine Umsatzsteuer berechnet. Diese Gutschrift wird aufgrund der Vereinbarung vom [Datum] über die Abrechnung im Gutschriftsverfahren erteilt (§ 14 Abs. 2 Satz 5 UStG). Sie gilt als Rechnung des leistenden Unternehmers, sofern dieser ihr nicht innerhalb von [z. B. 14] Tagen widerspricht.

Der Gutschriftsbetrag wird bis zum [Datum] auf das Konto IBAN [IBAN] überwiesen.


Hinweise zur Verwendung
1. Pflichtangaben für Kleinunternehmer-Rechnungen (§ 34a UStDV): Name und Anschrift des leistenden Unternehmers und des Leistungsempfängers, Steuernummer oder USt-IdNr. des leistenden Unternehmers, Ausstellungsdatum, Menge und Art der Lieferung oder Umfang und Art der sonstigen Leistung, Entgelt in einer Summe mit Hinweis auf die Steuerbefreiung nach § 19 UStG, bei Gutschriften die Angabe „Gutschrift“. Rechnungsnummer und Leistungszeitraum sind nicht vorgeschrieben, aber dringend empfohlen.
2. Umsatzgrenzen seit 2025: Gesamtumsatz im Vorjahr höchstens 25.000 EUR und im laufenden Jahr höchstens 100.000 EUR (§ 19 Abs. 1 UStG). Bei Überschreiten der 100.000 EUR im laufenden Jahr ist der überschreitende Umsatz bereits steuerpflichtig.
3. E-Rechnung: Kleinunternehmer dürfen Rechnungen weiterhin als Papier oder PDF ausstellen (§ 34a Satz 4 UStDV), müssen aber seit 1. Januar 2025 E-Rechnungen anderer Unternehmer empfangen und unverändert aufbewahren können.
4. Aufbewahrung: Rechnungen und Gutschriften 8 Jahre aufbewahren (§ 14b UStG). Kein Ausweis von Umsatzsteuer, sonst wird sie geschuldet (§ 14c UStG).

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
