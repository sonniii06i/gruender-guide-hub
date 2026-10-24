// Inhalt der Vorlage „antrag-fristverlaengerung-finanzamt“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../verwaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Fristverlängerung beim Finanzamt beantragen solltest",
        text: `Der 31. Juli rückt näher, aber die Jahresbescheinigung der Bank fehlt, der Lieferant hat drei Rechnungen noch nicht nachgereicht, und die Umstellung auf die neue Buchhaltungssoftware hat die Belegablage durcheinandergebracht. Oder das Finanzamt hat dich bereits an die Abgabe erinnert und eine Frist gesetzt. In beiden Fällen ist der Antrag auf Fristverlängerung der richtige Schritt, bevor die Frist abläuft.

Er betrifft die Jahreserklärungen zur Einkommensteuer, Körperschaftsteuer, Gewerbesteuer und Umsatzsteuer samt Gewinnermittlung und Feststellungserklärung. Typische Anlässe sind fehlende Unterlagen Dritter, Krankheit oder Pflege, das erste Geschäftsjahr nach der Gründung und ein Beraterwechsel. Der Antrag ist auch dann sinnvoll, wenn du nur wenige Wochen brauchst: Eine bewilligte Verlängerung verhindert den Verspätungszuschlag und die Schätzung, die sonst beide kommen können.`,
      },
      {
        titel: "Antrag auf Fristverlängerung: Das muss drinstehen",
        text: `Das Finanzamt entscheidet nach Ermessen, und ein Antrag ohne Substanz wird oft abgelehnt. Die Vorlage enthält deshalb:

- Steuernummer und bei Einkommensteuer die Identifikationsnummer
- die genaue Bezeichnung der Erklärungen und des Jahres, auf die sich der Antrag bezieht
- die laufende Frist oder die Aufforderung des Finanzamts mit Datum
- das konkrete neue Abgabedatum, nicht nur „um einige Wochen“
- eine Begründung, die nachvollziehbar ist und sich belegen lässt
- die Zusicherung, dass die Erklärung innerhalb der neuen Frist kommt, und den Stand der Vorbereitung
- einen Hinweis zur erwarteten Nachzahlung, idealerweise mit freiwilliger Vorauszahlung
- die Bitte um Bestätigung und um einen Ersatztermin bei Ablehnung
- Anlagen wie Attest, Schreiben an den Lieferanten oder Mandatsniederlegung

Eine freiwillige Vorauszahlung auf die erwartete Nachzahlung ist kein Pflichtbestandteil, verbessert aber die Chancen spürbar, weil das Finanzamt dann kein Zinsrisiko sieht.`,
      },
      {
        titel: "Fristverlängerung Vorlage ausfüllen: Schritt für Schritt",
        text: `Trage Steuernummer, Identifikationsnummer und die betroffenen Erklärungen in den Kopf ein und wähle im Betreff die Steuerarten, die du tatsächlich noch schuldest. Setze im ersten Absatz die laufende Frist ein, in der Regel den 31. Juli des Folgejahres, oder die vom Finanzamt gesetzte Nachfrist aus dem Erinnerungsschreiben. Lege ein realistisches Zieldatum fest: lieber acht Wochen mit Puffer als vier Wochen, die du wieder verlängern musst.

Wähle aus den vier Begründungsbausteinen den passenden, ersetze die Platzhalter durch Namen, Daten und Dokumente und lösche die übrigen Bausteine. Gib den Vorbereitungsstand in Prozent an und entscheide, ob du eine Nachzahlung erwartest; wenn ja, überweise einen Abschlag unter Angabe der Steuernummer und nenne Datum und Betrag im Antrag. Hänge die Nachweise an, unterschreibe und sende den Antrag über Mein ELSTER unter „Anträge, Einspruch und Mitteilungen“ oder per Brief. Notiere dir das neue Datum sofort im Kalender.`,
      },
      {
        titel: "Typische Fehler beim Fristverlängerungsantrag",
        text: `Der gravierendste Fehler: Der Antrag geht nach Ablauf der Frist ein. Eine rückwirkende Verlängerung ist möglich, aber die Ausnahme; in der Regel läuft dann bereits der Verspätungszuschlag. Zweiter Fehler: kein konkretes Datum. „Ich bitte um Fristverlängerung“ ohne Zieltermin zwingt das Finanzamt, selbst eines zu setzen. Dritter Fehler: Schweigen des Finanzamts als Zustimmung werten. Ohne Bestätigung gilt die alte Frist; frag nach, wenn zwei Wochen vor dem Stichtag keine Antwort da ist.

Vierter Fehler: die Dauerfristverlängerung für Umsatzsteuer-Voranmeldungen mit diesem Antrag verwechseln; die läuft gesondert über ELSTER und gilt für die monatlichen oder vierteljährlichen Voranmeldungen, nicht für die Jahreserklärung. Fünfter Fehler: nach der Bewilligung die neue Frist erneut reißen. Beim zweiten Antrag ist das Finanzamt deutlich strenger, und bei beratenen Steuerpflichtigen gibt es über das gesetzliche Ende hinaus nur noch bei unverschuldeter Verhinderung eine Verlängerung.`,
      },
      {
        titel: "Rechtsgrundlagen: § 109, § 149 und § 152 AO",
        text: `Die Abgabefristen stehen in § 149 AO: Nach Absatz 2 sind Steuererklärungen, die sich auf ein Kalenderjahr beziehen, spätestens sieben Monate nach dessen Ablauf abzugeben, also bis zum 31. Juli des Folgejahres. Lässt du dich von einem Steuerberater oder einer anderen zur Hilfeleistung in Steuersachen befugten Person vertreten, verlängert Absatz 3 die Frist bis zum letzten Tag des Februars des zweiten auf das Kalenderjahr folgenden Jahres.

Die Verlängerung regelt § 109 AO: Fristen können nach Absatz 1 verlängert werden, auch rückwirkend, wenn sie bereits abgelaufen sind; Absatz 2 begrenzt das bei beratenen Steuerpflichtigen auf Fälle, in denen die Frist ohne Verschulden nicht eingehalten werden konnte. Endet eine Frist an einem Samstag, Sonntag oder Feiertag, verschiebt § 108 Abs. 3 AO das Ende auf den nächsten Werktag. Der Verspätungszuschlag folgt aus § 152 AO; nach Absatz 2 ist er zwingend festzusetzen, wenn die Erklärung nicht binnen 14 Monaten nach Ablauf des Kalenderjahres abgegeben wurde, und beträgt nach Absatz 5 für jeden angefangenen Monat 0,25 Prozent der festgesetzten Steuer abzüglich Vorauszahlungen und anzurechnender Steuerabzugsbeträge, mindestens 25 Euro. Gibt niemand ab, darf das Finanzamt nach § 162 AO schätzen.`,
      },
      {
        titel: "Wann der Antrag nicht genügt",
        text: `Die Vorlage deckt den Normalfall ab: Ein nicht beratener Unternehmer braucht einige Wochen oder Monate mehr. Sie hilft nicht, wenn du einen Steuerberater hast und die verlängerte Frist Ende Februar bereits überschritten ist; dann geht nur noch der Nachweis, dass du ohne eigenes Verschulden gehindert warst, und das sollte der Berater formulieren. Sie hilft auch nicht gegen eine bereits ergangene Schätzung; dagegen musst du innerhalb eines Monats Einspruch einlegen und die Erklärung nachreichen, wofür es eine eigene Vorlage gibt.

Für Umsatzsteuer-Voranmeldungen und Lohnsteuer-Anmeldungen gibt es keine individuelle Fristverlängerung in dieser Form; dort nutzt du die Dauerfristverlängerung beziehungsweise musst pünktlich anmelden. Bei mehreren Jahren Rückstand oder laufendem Vollstreckungsverfahren lohnt ein Gespräch mit einem Steuerberater. GründerX ist Software und keine Steuerberatung; die Vorlage gibt dir den formalen Rahmen für einen sauberen Antrag.`,
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
[Identifikationsnummer: [IdNr.]]

Antrag auf Fristverlängerung (§ 109 AO)
[Einkommensteuer- / Körperschaftsteuer- / Gewerbesteuer- / Umsatzsteuer-]Erklärung [Jahr] [einschließlich Gewinnermittlung / Feststellungserklärung]

Sehr geehrte Damen und Herren,

die Frist für die Abgabe der oben genannten Steuererklärung(en) für das Jahr [Jahr] endet am [Datum, z. B. 31.07.[Folgejahr]]. [Alternativ: Mit Schreiben vom [Datum] haben Sie mich zur Abgabe bis zum [Datum] aufgefordert.]

Ich beantrage, die Frist bis zum [Datum] zu verlängern.

Begründung:

[Grund 1 – fehlende Unterlagen: Für die Gewinnermittlung fehlen noch [z. B. die Jahressteuerbescheinigung der [Bank] / die Bescheinigung der [Versicherung] / Rechnungen des Lieferanten [Name]], die ich trotz Anforderung vom [Datum] bisher nicht erhalten habe.]

[Grund 2 – Krankheit oder persönliche Verhinderung: Ich war vom [Datum] bis [Datum] wegen [Krankheit / Unfall / Pflege eines Angehörigen] nicht in der Lage, die Unterlagen zusammenzustellen. Ein Nachweis liegt bei.]

[Grund 3 – Gründung oder Umstellung: Im Jahr [Jahr] habe ich mein Unternehmen gegründet / die Buchhaltung auf [Software] umgestellt. Die Aufarbeitung der Belege für den ersten Abschluss benötigt mehr Zeit als vorgesehen.]

[Grund 4 – Beraterwechsel: Mein bisheriger Steuerberater hat das Mandat zum [Datum] niedergelegt; der neue Berater [Name] hat die Unterlagen erst am [Datum] erhalten.]

Die Erklärung wird innerhalb der beantragten Frist eingereicht; die Vorbereitung ist bereits [zu etwa [Prozent] % / weitgehend] abgeschlossen. [Mit einer Nachzahlung ist nicht zu rechnen. / Eine voraussichtliche Nachzahlung in Höhe von etwa [Betrag] EUR habe ich bereits am [Datum] als freiwillige Vorauszahlung unter Angabe der Steuernummer überwiesen.]

Ich bitte um kurze Bestätigung der Fristverlängerung. Sollten Sie dem Antrag nicht oder nur teilweise entsprechen, bitte ich um Mitteilung, bis wann die Erklärung spätestens vorliegen muss.

Anlagen:
– [ärztliche Bescheinigung / Schreiben an den Lieferanten vom [Datum] / Mandatsniederlegung des Steuerberaters]
– [Kopie der Erinnerung des Finanzamts vom [Datum]]

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[ggf. Funktion, z. B. „Geschäftsführer der [Firma] GmbH“]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
