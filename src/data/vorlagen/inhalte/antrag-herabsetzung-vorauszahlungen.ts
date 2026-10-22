// Inhalt der Vorlage „antrag-herabsetzung-vorauszahlungen“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../verwaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du die Vorauszahlungen beim Finanzamt herabsetzen lässt",
        text: `Vorauszahlungen bemisst das Finanzamt nach der letzten Veranlagung. War das Vorjahr stark, zahlst du vierteljährlich auf einen Gewinn, den du dieses Jahr vielleicht gar nicht erreichst: Der Hauptkunde ist weg, du hast in Maschinen oder Software investiert, du arbeitest wegen Elternzeit nur noch halbtags, oder das zweite Geschäftsjahr nach der Gründung läuft einfach langsamer an als das erste.

Jeder Euro Vorauszahlung, der über der tatsächlichen Steuer liegt, ist ein zinsloses Darlehen an den Staat, das du erst mit dem Jahresbescheid zurückbekommst, oft erst eineinhalb Jahre später. Der Antrag auf Herabsetzung holt dir diese Liquidität sofort zurück. Er gilt für Einkommensteuer-Vorauszahlungen von Einzelunternehmern und Gesellschaftern, für Körperschaftsteuer-Vorauszahlungen von GmbH und UG und über den Messbetrag auch für die Gewerbesteuer-Vorauszahlungen an die Gemeinde.`,
      },
      {
        titel: "Antrag auf Herabsetzung der Vorauszahlungen: Inhalt und Pflichtangaben",
        text: `Das Finanzamt passt die Vorauszahlungen nur an, wenn es die neue Prognose nachvollziehen kann. Deshalb gehören in den Antrag:

- Steuernummer, Steuerart und das Datum des Vorauszahlungsbescheids
- die bisherige Festsetzung je Quartal und der Gewinn, auf dem sie beruht
- der Antrag mit dem Termin, ab dem die Herabsetzung gelten soll, und der neuen Quartalshöhe
- gegebenenfalls der Antrag auf Erstattung oder Verrechnung bereits gezahlter Beträge
- die Begründung mit der konkreten Ursache des Gewinnrückgangs
- eine Gewinnprognose als Rechnung: Umsatz minus Wareneinsatz, Personal, Raumkosten, Abschreibungen und sonstige Kosten, mit Vorjahresvergleich
- bei Einkommensteuer die weiteren Einkünfte und Abzugsbeträge, etwa Einkünfte des Ehegatten und Vorsorgeaufwendungen
- die daraus abgeleitete voraussichtliche Jahressteuer und neue Vorauszahlung
- der Antrag zum Gewerbesteuermessbetrag für Vorauszahlungszwecke
- Anlagen: BWA, Vorjahresgewinnermittlung, Nachweise

Die Zusage, wesentliche Abweichungen mitzuteilen, steht in der Vorlage, weil das Finanzamt die Vorauszahlungen sonst später wieder hochsetzt und du den Vertrauensvorschuss verlierst.`,
      },
      {
        titel: "Vorlage ausfüllen: Gewinnprognose Schritt für Schritt",
        text: `Hol dir den Vorauszahlungsbescheid und die aktuelle BWA aus deiner Buchhaltung. Übertrage zuerst die festgesetzten Beträge und den zugrunde liegenden Vorjahresgewinn in den ersten Absatz. Lege dann fest, ab welchem Termin die Herabsetzung gelten soll; realistisch ist der nächste Fälligkeitstag, der mindestens vier Wochen entfernt liegt. Beschreibe in der Begründung mit einem der Beispielsätze, was sich geändert hat, und belege es mit Zahlen oder Dokumenten.

Für die Gewinnprognose rechnest du die bisherigen Monate der BWA auf das Jahr hoch und korrigierst um bekannte Effekte wie den weggefallenen Kunden oder neue Abschreibungen. Bei der Einkommensteuer ergänzt du die übrigen Einkünfte und Abzugsbeträge, weil das Finanzamt die Steuer auf das Gesamteinkommen schätzt. Nenne die daraus folgende Jahressteuer und teile durch vier für die neue Quartalsrate. Trage bei Gewerbebetrieb den voraussichtlichen Gewerbeertrag für den Messbetrag ein, hänge BWA, Vorjahresvergleich und Nachweise an und sende den Antrag über Mein ELSTER oder per Brief.`,
      },
      {
        titel: "Typische Fehler beim Herabsetzungsantrag",
        text: `Erstens: zu optimistisch schätzen. Wer die Vorauszahlungen auf null drückt und im Dezember doch einen guten Auftrag abrechnet, bekommt mit dem Jahresbescheid die gesamte Nachzahlung in einer Summe und zusätzlich eine nachträglich erhöhte Vorauszahlung für das Folgejahr. Zweitens: zu spät beantragen. Der Antrag wirkt erst, wenn das Finanzamt den neuen Bescheid erlässt; Anträge wenige Tage vor dem 10. März, 10. Juni, 10. September oder 10. Dezember greifen erst für das übernächste Quartal.

Drittens: Zahlen ohne Beleg. Eine Prognose ohne BWA oder Vorjahresvergleich wird als Behauptung behandelt. Viertens: die Gewerbesteuer vergessen. Das Finanzamt ändert die Einkommensteuer, die Gemeinde zieht die alte Gewerbesteuer-Vorauszahlung weiter ein, weil niemand den Messbetrag angepasst hat. Fünftens: Erstattung nicht beantragen. Ohne ausdrücklichen Antrag bleibt ein Guthaben aus bereits gezahlten Raten oft bis zum Jahresbescheid liegen.`,
      },
      {
        titel: "Rechtsgrundlagen: § 37 EStG, § 31 KStG und § 19 GewStG",
        text: `Die Vorauszahlungen zur Einkommensteuer sind in § 37 EStG geregelt. Nach Absatz 1 sind sie am 10. März, 10. Juni, 10. September und 10. Dezember zu entrichten. Absatz 3 bestimmt, dass das Finanzamt die Vorauszahlungen nach der voraussichtlichen Einkommensteuer festsetzt und sie an die Steuer anpassen kann, die sich für den Veranlagungszeitraum voraussichtlich ergeben wird; diese Anpassung ist bis zum Ablauf des 15. Monats nach dem Veranlagungszeitraum möglich. Absatz 5 legt fest, dass Vorauszahlungen nur festgesetzt werden, wenn sie mindestens 400 Euro im Kalenderjahr und mindestens 100 Euro je Termin betragen.

Für Kapitalgesellschaften verweist § 31 Abs. 1 KStG auf diese Vorschriften. Die Gewerbesteuer-Vorauszahlungen sind nach § 19 Abs. 1 GewStG am 15. Februar, 15. Mai, 15. August und 15. November an die Gemeinde fällig; nach § 19 Abs. 3 GewStG kann die Gemeinde sie anpassen, und das Finanzamt setzt dafür den Steuermessbetrag für Vorauszahlungszwecke fest. Der Antrag beim Finanzamt ist formfrei; dass du ihn mit Zahlen belegen musst, folgt aus der allgemeinen Mitwirkungspflicht nach § 90 AO.`,
      },
      {
        titel: "Wann der Antrag allein nicht reicht",
        text: `Bei einem klaren Umsatzrückgang mit sauberer BWA kannst du den Antrag selbst stellen. Schwieriger wird es, wenn die Prognose von Bewertungsfragen abhängt: Sonderabschreibungen, Investitionsabzugsbeträge, Verlustvorträge, eine Thesaurierung in der GmbH oder Einkünfte aus mehreren Quellen mit Progressionsvorbehalt. Hier rechnet ein Steuerberater die voraussichtliche Steuer genauer und verhindert, dass du zu tief oder zu hoch ansetzt. Hast du bereits einen Berater mit Empfangsvollmacht, sollte der Antrag über ihn laufen, damit das Finanzamt nicht zwei Ansprechpartner hat.

Ist die Lage so angespannt, dass selbst die herabgesetzten Raten nicht leistbar sind, hilft nicht die Herabsetzung, sondern ein Stundungsantrag für die bereits fälligen Beträge, für den es eine eigene Vorlage gibt. GründerX ist Software und keine Steuerberatung; die Vorlage strukturiert deinen Antrag, die steuerliche Berechnung bleibt deine oder die deines Beraters.`,
      },
    ],
  text: `[Firma / Vorname Nachname]
[Straße]
[PLZ Ort]
[Telefon], [E-Mail-Adresse]

Finanzamt [Ort]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Steuernummer: [Steuernummer]

Antrag auf Herabsetzung der [Einkommensteuer- / Körperschaftsteuer-]Vorauszahlungen [Jahr] (§ 37 Abs. 3 EStG [i. V. m. § 31 Abs. 1 KStG])
[Antrag auf Festsetzung des Gewerbesteuermessbetrags für Vorauszahlungszwecke (§ 19 Abs. 3 GewStG)]

Sehr geehrte Damen und Herren,

mit Bescheid vom [Datum] haben Sie die [Einkommensteuer- / Körperschaftsteuer-]Vorauszahlungen für [Jahr] auf vierteljährlich [Betrag] EUR (jährlich [Betrag] EUR) festgesetzt. Grundlage war der Gewinn des Jahres [Jahr] in Höhe von [Betrag] EUR.

Ich beantrage, die Vorauszahlungen ab dem [Termin, z. B. 10.06.[Jahr]] auf vierteljährlich [Betrag] EUR herabzusetzen [und die bereits geleistete Vorauszahlung vom [Datum] in Höhe von [Betrag] EUR zu erstatten bzw. mit der nächsten Rate zu verrechnen].

Begründung:

Die wirtschaftliche Lage hat sich gegenüber dem Vorjahr deutlich verändert. [z. B.: Der Hauptkunde [Name], auf den im Vorjahr [Prozent] % des Umsatzes entfielen, hat den Vertrag zum [Datum] gekündigt. / Zum [Datum] habe ich in [Gegenstand] investiert; die Abschreibungen betragen [Betrag] EUR pro Jahr. / Seit [Datum] übe ich die Tätigkeit nur noch in Teilzeit aus. / Der Umsatz der Monate [Monat] bis [Monat] liegt mit [Betrag] EUR um [Prozent] % unter dem Vorjahreszeitraum.]

Gewinnprognose [Jahr]:
   Umsatzerlöse (voraussichtlich): [Betrag] EUR
   abzüglich Wareneinsatz und Fremdleistungen: [Betrag] EUR
   abzüglich Personalkosten: [Betrag] EUR
   abzüglich Raumkosten, Versicherungen, Beiträge: [Betrag] EUR
   abzüglich Abschreibungen: [Betrag] EUR
   abzüglich sonstige Betriebsausgaben: [Betrag] EUR
   voraussichtlicher Gewinn [Jahr]: [Betrag] EUR
   (zum Vergleich Vorjahr: [Betrag] EUR)

[Bei Einkommensteuer: Weitere Einkünfte und Abzugsbeträge bleiben gegenüber dem Vorjahr unverändert / ändern sich wie folgt: [z. B. Einkünfte des Ehegatten aus nichtselbständiger Arbeit [Betrag] EUR, Vorsorgeaufwendungen [Betrag] EUR].]

Daraus ergibt sich eine voraussichtliche [Einkommensteuer / Körperschaftsteuer] [Jahr] von etwa [Betrag] EUR [zuzüglich Solidaritätszuschlag], also Vorauszahlungen von vierteljährlich [Betrag] EUR.

[Gewerbesteuer: Zugleich bitte ich, den Gewerbesteuermessbetrag für Vorauszahlungszwecke [Jahr] auf Grundlage eines voraussichtlichen Gewerbeertrags von [Betrag] EUR festzusetzen und die Gemeinde [Ort] zu informieren, damit die Gewerbesteuervorauszahlungen angepasst werden.]

Sollte sich im Laufe des Jahres eine wesentliche Abweichung von dieser Prognose ergeben, teile ich dies unverzüglich mit. Mir ist bekannt, dass eine zu niedrige Vorauszahlung zu einer Nachzahlung mit der Jahresveranlagung führt.

Anlagen:
– Betriebswirtschaftliche Auswertung (BWA) [Monat] bis [Monat] [Jahr]
– Gewinnermittlung [Vorjahr] zum Vergleich
– [Kündigungsschreiben des Kunden / Investitionsrechnung / weitere Nachweise]
– Kopie des Vorauszahlungsbescheids vom [Datum]

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[ggf. Funktion, z. B. „Geschäftsführer der [Firma] GmbH“]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
