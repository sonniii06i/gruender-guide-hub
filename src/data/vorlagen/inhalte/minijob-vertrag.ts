// Inhalt der Vorlage „minijob-vertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../arbeit.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Minijob-Vertrag brauchst",
        text: `Die Pakete stapeln sich, der Laden braucht samstags eine zweite Kraft, oder jemand soll zweimal die Woche die Buchhaltung vorbereiten: Für Beschäftigungen mit wenigen Stunden, deren Verdienst unter der Geringfügigkeitsgrenze bleibt, ist der Minijob der günstigste legale Weg. Du zahlst Pauschalabgaben an die Minijob-Zentrale statt der vollen Sozialversicherung, und der Minijobber bekommt sein Geld meist brutto gleich netto.

Diese Vorlage passt für Aushilfen im Versand, im Lager, im Verkauf, im Büro und in der Gastronomie, für Rentner, Studierende und Menschen mit Hauptjob. Sie passt nicht für Studierende mit mehr als der Verdienstgrenze; die nehmen den Werkstudentenvertrag. Für Praktika gibt es den Praktikumsvertrag, für befristete Saisonkräfte über der Grenze den befristeten Arbeitsvertrag.`,
      },
      {
        titel: "Was muss in einen Minijob-Vertrag?",
        text: `Minijobber sind Arbeitnehmer, deshalb gelten das Nachweisgesetz und seine Pflichtangaben uneingeschränkt. Dazu kommen Regelungen, die speziell die Geringfügigkeit sichern:

- Tätigkeit, Beginn, Arbeitsort und Tarifhinweis (§ 1)
- Die Einordnung als geringfügige Beschäftigung mit Verdienstgrenze und Anmeldung bei der Minijob-Zentrale (§ 2)
- Feste Wochenstunden, damit kein Abrufverhältnis mit 20 Stunden unterstellt wird (§ 3)
- Stundenlohn mindestens in Höhe des Mindestlohns, Fälligkeit und Aufzeichnungspflicht (§ 3 Abs. 4, § 4)
- Urlaub nach Arbeitstagen pro Woche (§ 5)
- Entgeltfortzahlung bei Krankheit und an Feiertagen (§ 6)
- Die Rentenversicherungspflicht und die Erklärung zur Befreiung (§ 7)
- Angaben zu weiteren Beschäftigungen, weil sie die Geringfügigkeit beeinflussen (§ 8)
- Probezeit, Kündigungsfrist, Schriftform und Klagefrist (§ 9)
- Ausschlussfristen und Schlussbestimmungen (§ 10)

Besonders wichtig ist § 7 Abs. 3: Dort entscheidet der Minijobber, ob er sich von der Rentenversicherung befreien lässt. Ohne diese Erklärung musst du den Eigenanteil einbehalten.`,
      },
      {
        titel: "Minijob-Vertrag Muster ausfüllen: Stunden und Grenze berechnen",
        text: `Rechne zuerst, nicht erst beim Ausfüllen: Teile die Geringfügigkeitsgrenze durch den Stundenlohn und du hast die höchstmögliche Monatsstundenzahl. Beim Mindestlohn sind das 2026 rund 43 Stunden; zahlst du 15 EUR, bleiben etwa 40 Stunden. Trage in § 3 Abs. 1 die Wochenstunden und ihre Verteilung auf die Tage ein, in § 3 Abs. 2 die durchschnittliche Monatsstundenzahl.

In § 4 wählst du zwischen Stundenlohn und festem Monatsentgelt. Bei Stundenlohn ist die Verdienstgrenze besser zu steuern, weil die Monatssumme mit den Stunden schwankt; ein festes Monatsentgelt ist für Minijobber mit gleichbleibendem Plan praktischer. Planst du eine Sonderzahlung, trage sie in § 4 Abs. 3 ein und rechne sie auf zwölf Monate verteilt in die Grenze ein. In § 5 berechnest du den Urlaub: gesetzliche 20 Tage geteilt durch 5, multipliziert mit den Arbeitstagen pro Woche. In § 8 lässt du den Minijobber seine weiteren Jobs eintragen, in § 7 Abs. 3 seine Entscheidung zur Rentenversicherung ankreuzen. Melde ihn vor dem ersten Arbeitstag bei der Minijob-Zentrale an und nimm das Merkblatt zur Rentenversicherung zu den Unterlagen.`,
      },
      {
        titel: "Typische Fehler bei Minijobs und ihre Folgen",
        text: `Der klassische Fehler ist der Minijob „nach Bedarf“ ohne feste Stundenzahl. Dann gilt nach § 12 TzBfG ein Abrufverhältnis mit 20 Wochenstunden als vereinbart, und beim Mindestlohn liegt der Verdienst damit weit über der Grenze; bei einer Betriebsprüfung werden die vollen Sozialabgaben nachgefordert.

Zweiter Fehler: Urlaubs- oder Weihnachtsgeld, das die Jahresgrenze sprengt. Einmalzahlungen zählen anteilig mit. Dritter Fehler sind fehlende Stundenaufzeichnungen; nach § 17 MiLoG musst du Beginn, Ende und Dauer der Arbeitszeit dokumentieren und zwei Jahre aufbewahren, sonst droht ein Bußgeld und im Streit gilt die Darstellung des Minijobbers.

Vermeide außerdem die vergessene Anmeldung vor Arbeitsbeginn, den fehlenden Nachweis über weitere Beschäftigungen und die Annahme, Minijobber hätten keinen Anspruch auf Urlaub, Entgeltfortzahlung oder Feiertagsbezahlung. Alle drei stehen ihnen genauso zu wie Vollzeitkräften.`,
      },
      {
        titel: "Rechtliche Grundlagen: Geringfügigkeitsgrenze, Mindestlohn, Pauschalabgaben",
        text: `Die geringfügig entlohnte Beschäftigung ist in § 8 Abs. 1 Nr. 1 SGB IV geregelt. Seit Oktober 2022 ist die Verdienstgrenze dynamisch an den Mindestlohn gekoppelt und entspricht einer Wochenarbeitszeit von zehn Stunden zum Mindestlohn. Mit 13,90 EUR Mindestlohn liegt sie 2026 bei 603 EUR im Monat; mit der nächsten Mindestlohnstufe steigt sie. Prüfe vor jeder Vertragsänderung die aktuelle Grenze bei der Minijob-Zentrale.

Du zahlst als Arbeitgeber Pauschalbeiträge zur Kranken- und Rentenversicherung, eine Pauschsteuer nach § 40a Abs. 2 EStG sowie Umlagen und Unfallversicherung, insgesamt rund 30 Prozent. Der Minijobber ist rentenversicherungspflichtig mit einem Eigenanteil und kann sich nach § 6 Abs. 1b SGB VI befreien lassen. Der Mindestlohn gilt nach dem MiLoG ohne Ausnahme; das Bundesurlaubsgesetz, das Entgeltfortzahlungsgesetz, das Kündigungsschutzgesetz und § 622 BGB gelten ebenfalls. Ein gelegentliches Überschreiten der Grenze ist in höchstens zwei Monaten im Jahr und bis zum Doppelten der Grenze erlaubt.`,
      },
      {
        titel: "Wann die Minijob-Vorlage nicht reicht",
        text: `Sobald der Minijobber dauerhaft mehr verdienen soll, endet die Geringfügigkeit; dann brauchst du einen Teilzeitvertrag im Übergangsbereich mit voller, aber reduzierter Sozialversicherung. Für kurzfristige Beschäftigungen von höchstens drei Monaten oder 70 Arbeitstagen im Jahr gilt ein anderes Modell mit eigenen Regeln, das dieses Muster nicht abdeckt.

In Privathaushalten läuft der Minijob über das Haushaltsscheck-Verfahren; in Branchen mit Sofortmeldepflicht wie Gastronomie, Bau oder Logistik musst du die Anmeldung noch vor Arbeitsbeginn elektronisch abgeben. Bei Tarifbindung können Mindestentgelte über dem gesetzlichen Mindestlohn gelten. Wenn du unsicher bist, ob eine bestimmte Konstellation noch geringfügig ist, etwa bei mehreren Jobs oder Rentnern vor der Regelaltersgrenze, frag deinen Steuerberater oder die Minijob-Zentrale. GründerX liefert das Muster, nicht die Rechtsberatung.`,
      },
    ],
  text: `Arbeitsvertrag über eine geringfügig entlohnte Beschäftigung (Minijob)

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort], Rentenversicherungsnummer [Nummer]
– nachfolgend „Arbeitnehmer“ –

§ 1 Beginn, Tätigkeit und Arbeitsort
(1) Der Arbeitnehmer wird ab dem [Datum] [auf unbestimmte Zeit / befristet bis zum [Datum] nach § 14 Abs. 2 TzBfG] als [Tätigkeit, z. B. „Aushilfe im Versand“] eingestellt.
(2) Zu den Aufgaben gehören insbesondere: [z. B. „Kommissionieren und Verpacken von Bestellungen, Annahme von Warenlieferungen, einfache Lagerarbeiten“]. Der Arbeitgeber kann im Rahmen des billigen Ermessens auch andere gleichwertige Tätigkeiten zuweisen.
(3) Arbeitsort ist [Straße, PLZ Ort].
(4) Tarifverträge oder Betriebsvereinbarungen finden auf das Arbeitsverhältnis keine Anwendung.

§ 2 Geringfügige Beschäftigung und Verdienstgrenze
(1) Die Beschäftigung ist eine geringfügig entlohnte Beschäftigung im Sinne des § 8 Abs. 1 Nr. 1 SGB IV. Das regelmäßige monatliche Arbeitsentgelt überschreitet die Geringfügigkeitsgrenze (im Jahr 2026: 603 EUR; die Grenze wird jährlich an den Mindestlohn angepasst) nicht.
(2) Beide Parteien achten darauf, dass das Arbeitsentgelt einschließlich etwaiger Einmalzahlungen im Jahresdurchschnitt die Geringfügigkeitsgrenze nicht übersteigt. Der Arbeitgeber meldet die Beschäftigung vor Arbeitsbeginn bei der Minijob-Zentrale (Deutsche Rentenversicherung Knappschaft-Bahn-See) an und führt die Pauschalabgaben ab.
(3) Ein unvorhersehbares Überschreiten der Grenze (z. B. durch Krankheitsvertretung) ist nur in höchstens zwei Kalendermonaten im Jahr und bis zur doppelten Geringfügigkeitsgrenze zulässig; darüber hinaus bedarf es einer vorherigen Absprache.

§ 3 Arbeitszeit und Abruf
(1) Die regelmäßige Arbeitszeit beträgt [z. B. 10] Stunden pro Woche. Sie wird auf die Wochentage [z. B. Montag und Donnerstag, jeweils 5 Stunden] verteilt. [Alternativ: Die Lage der Arbeitszeit wird jeweils [z. B. zwei Wochen] im Voraus in einem Dienstplan festgelegt; die Stundenzahl nach Satz 1 bleibt unverändert.]
(2) Die monatliche Arbeitszeit beträgt im Durchschnitt [z. B. 43] Stunden; das sich daraus ergebende Entgelt überschreitet die Geringfügigkeitsgrenze nicht.
(3) Zusätzliche Stunden leistet der Arbeitnehmer nur nach vorheriger Vereinbarung mit dem Arbeitgeber. Mehrarbeit wird mit dem vereinbarten Stundenlohn vergütet oder innerhalb von [z. B. 2] Monaten durch Freizeit ausgeglichen.
(4) Der Arbeitnehmer erfasst Beginn, Ende und Dauer der täglichen Arbeitszeit [im System / auf dem Stundenzettel] (§ 17 MiLoG). Der Arbeitgeber bewahrt die Aufzeichnungen zwei Jahre auf.

§ 4 Vergütung und Fälligkeit
(1) Der Arbeitnehmer erhält einen Bruttostundenlohn von [Betrag, mindestens 13,90] EUR. [Alternativ: ein monatliches Bruttoentgelt von [Betrag, höchstens 603] EUR für [Stunden] Stunden im Monat.] Der Stundenlohn beträgt stets mindestens den jeweils gültigen gesetzlichen Mindestlohn (13,90 EUR seit 01.01.2026, 14,60 EUR ab 01.01.2027).
(2) Das Entgelt ist jeweils am [z. B. 10.] des Folgemonats fällig und wird bargeldlos auf das vom Arbeitnehmer benannte Konto gezahlt. Der Arbeitgeber erteilt monatlich eine Entgeltabrechnung.
(3) [Optional: Der Arbeitnehmer erhält eine Sonderzahlung von [Betrag] EUR brutto mit der Abrechnung für [Monat]. Die Sonderzahlung wird bei der Prüfung der Geringfügigkeitsgrenze anteilig auf das Jahr verteilt berücksichtigt.]
(4) Die Besteuerung erfolgt pauschal durch den Arbeitgeber (2 % Pauschsteuer, § 40a Abs. 2 EStG). [Alternativ: Die Besteuerung erfolgt nach den individuellen Lohnsteuerabzugsmerkmalen des Arbeitnehmers.]

§ 5 Urlaub
(1) Der Arbeitnehmer hat Anspruch auf bezahlten Erholungsurlaub von [z. B. 8] Arbeitstagen im Kalenderjahr. Die Berechnung erfolgt anteilig nach den Arbeitstagen pro Woche: [z. B. 20 Urlaubstage bei Fünf-Tage-Woche ÷ 5 × 2 Arbeitstage = 8 Tage].
(2) Der Urlaub wird unter Berücksichtigung der Wünsche des Arbeitnehmers und der betrieblichen Belange festgelegt und ist mindestens [z. B. 2] Wochen vorher zu beantragen. Im Eintritts- und Austrittsjahr wird der Urlaub zeitanteilig gewährt, soweit § 5 BUrlG nichts anderes bestimmt.
(3) Bei Beendigung des Arbeitsverhältnisses wird nicht genommener Urlaub abgegolten.

§ 6 Krankheit, Feiertage, Entgeltfortzahlung
(1) Der Arbeitnehmer teilt eine Arbeitsverhinderung unverzüglich vor Beginn der Arbeitszeit mit. Dauert eine Arbeitsunfähigkeit länger als drei Kalendertage, ist sie spätestens am darauffolgenden Arbeitstag ärztlich feststellen zu lassen.
(2) Im Krankheitsfall wird das Entgelt nach dem Entgeltfortzahlungsgesetz bis zu sechs Wochen fortgezahlt. Für Arbeitszeit, die wegen eines gesetzlichen Feiertags ausfällt, wird das Entgelt gezahlt, das ohne den Feiertag angefallen wäre (§ 2 EFZG).

§ 7 Rentenversicherung und Befreiung
(1) Die Beschäftigung ist rentenversicherungspflichtig. Der Arbeitnehmer trägt die Differenz zwischen dem Pauschalbeitrag des Arbeitgebers (15 %) und dem vollen Beitragssatz der gesetzlichen Rentenversicherung (derzeit 3,6 % des Entgelts); dieser Anteil wird vom Entgelt einbehalten.
(2) Der Arbeitnehmer kann sich auf schriftlichen Antrag gegenüber dem Arbeitgeber von der Rentenversicherungspflicht befreien lassen (§ 6 Abs. 1b SGB VI). Die Befreiung wirkt ab dem Monat des Antrags, wenn der Arbeitgeber sie innerhalb von sechs Wochen der Minijob-Zentrale meldet, und gilt für die gesamte Dauer der Beschäftigung; sie kann nicht widerrufen werden. Der Arbeitgeber hat den Arbeitnehmer über die Folgen (keine vollen Pflichtbeitragszeiten, kein Anspruch auf Riester-Förderung) informiert.
(3) Der Arbeitnehmer erklärt hiermit: [Ich beantrage die Befreiung von der Rentenversicherungspflicht. / Ich beantrage keine Befreiung und zahle den Eigenanteil.]

§ 8 Weitere Beschäftigungen, Verschwiegenheit
(1) Der Arbeitnehmer erklärt, dass er [keine weitere Beschäftigung ausübt / folgende weitere Beschäftigungen ausübt: [Arbeitgeber, Entgelt, Art]]. [Ich übe eine sozialversicherungspflichtige Hauptbeschäftigung aus bei [Arbeitgeber]: ja / nein.] Die Aufnahme weiterer Beschäftigungen oder Änderungen ist dem Arbeitgeber unverzüglich mitzuteilen, da sie die Beurteilung der Geringfügigkeit beeinflussen.
(2) Der Arbeitnehmer bewahrt über Geschäfts- und Betriebsgeheimnisse sowie Kundendaten Stillschweigen, auch nach Beendigung des Arbeitsverhältnisses. Personenbezogene Daten verarbeitet er nur nach Weisung des Arbeitgebers.
(3) Bei Beendigung gibt der Arbeitnehmer Schlüssel, Arbeitsmittel und Unterlagen vollständig zurück.

§ 9 Probezeit, Kündigung, Klagefrist
(1) Die ersten [z. B. 3] Monate gelten als Probezeit mit einer beiderseitigen Kündigungsfrist von zwei Wochen. Danach beträgt die Kündigungsfrist vier Wochen zum 15. oder zum Ende eines Kalendermonats; verlängerte gesetzliche Fristen nach § 622 Abs. 2 BGB gelten für beide Seiten.
(2) Jede Kündigung bedarf der Schriftform (§ 623 BGB). Das Recht zur außerordentlichen Kündigung bleibt unberührt.
(3) Hinweis: Will der Arbeitnehmer die Unwirksamkeit einer Kündigung geltend machen, muss er innerhalb von drei Wochen nach Zugang Klage beim Arbeitsgericht erheben (§ 4 KSchG). Nach Zugang einer Kündigung hat er sich unverzüglich bei der Agentur für Arbeit arbeitsuchend zu melden (§ 38 SGB III).

§ 10 Ausschlussfristen und Schlussbestimmungen
(1) Ansprüche aus dem Arbeitsverhältnis verfallen, wenn sie nicht innerhalb von drei Monaten nach Fälligkeit in Textform gegenüber der anderen Partei geltend gemacht und, bei Ablehnung oder Schweigen über einen Monat, innerhalb von drei weiteren Monaten eingeklagt werden. Ausgenommen sind Ansprüche auf den gesetzlichen Mindestlohn, Ansprüche aus Haftung wegen Vorsatz oder wegen Verletzung von Leben, Körper oder Gesundheit sowie unverzichtbare Ansprüche.
(2) Änderungen dieses Vertrags bedürfen der Textform; das gilt auch für diese Klausel. Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam.
(3) Der Arbeitnehmer bestätigt, eine unterschriebene Ausfertigung dieses Vertrags und das Merkblatt der Minijob-Zentrale zur Rentenversicherung erhalten zu haben.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Arbeitgeber


______________________________
[Vorname Nachname]
Arbeitnehmer

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
