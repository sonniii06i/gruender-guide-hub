// Inhalt der Vorlage „zielvereinbarung-bonus“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../arbeit.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Zielvereinbarung mit Bonus brauchst",
        text: `Du willst deiner Vertriebsmitarbeiterin mehr zahlen, wenn sie mehr Abschlüsse bringt, dein Marketing-Team soll die Akquisekosten senken, oder der erste Entwickler soll am Erfolg des Produkts beteiligt werden, ohne dass du Anteile abgibst. Dafür ist die Zielvereinbarung mit Bonusregelung da: Sie legt messbare Ziele fest, gewichtet sie und sagt, wie viel Geld bei welcher Zielerreichung fließt.

Das Muster ist als jährliche Anlage zum Arbeitsvertrag gebaut und verbindet Unternehmensziel, Teamziel und individuelle Ziele in einem Dokument. Es ist bewusst ohne Freiwilligkeitsvorbehalt und ohne Stichtagsklausel formuliert, weil beides bei leistungsbezogener Vergütung vor Gericht nicht hält. Für Gewinnbeteiligungen, Aktienoptionen oder virtuelle Anteile brauchst du andere Verträge; für eine einfache Weihnachtsgratifikation ohne Ziele genügt ein Satz im Arbeitsvertrag.`,
      },
      {
        titel: "Was muss in eine Zielvereinbarung?",
        text: `Eine Zielvereinbarung muss zwei Fragen beantworten: Was ist zu erreichen, und was passiert bei Abweichung. Das Muster verteilt die Antworten so:

- Zielperiode, Zielbonus bei 100 Prozent und die Klarstellung, dass der Bonus Arbeitsentgelt ist (§ 1)
- Unternehmens-, Team- und Einzelziele mit Messgröße und Datenquelle sowie Schwellen-, Ziel- und Maximalwert je Ziel (§ 2)
- Gewichtung, lineare Staffel zwischen Schwelle und Maximum, Deckelung und eine Beispielrechnung (§ 3)
- Messung, Zwischenstände, Feststellung mit Frist und Widerspruchsrecht (§ 4)
- Auszahlungstermin, optionale Abschläge, Hinweis, dass kein ungekündigtes Arbeitsverhältnis am Stichtag nötig ist (§ 5)
- Zeitanteilige Berechnung bei Eintritt, Austritt, Elternzeit, Krankheit und Freistellung (§ 6)
- Anpassung der Ziele bei veränderten Umständen und Regelung bei fehlender Einigung (§ 7)
- Verfahren und Fristen für die nächste Zielperiode mit Auffangregel (§ 8)
- Textform und Verhältnis zum Arbeitsvertrag (§ 9)

Die Beispielrechnung in § 3 Abs. 4 ist mehr als Dekoration: Sie zeigt beiden Seiten, wie die Formel wirkt, und verhindert später Streit über die Mathematik.`,
      },
      {
        titel: "Zielvereinbarung Muster ausfüllen: SMART-Ziele und Staffel",
        text: `Beginne mit § 1 und lege den Zielbonus bei Planerfüllung als Betrag fest; der Prozentsatz vom Jahresfestgehalt dient nur der Einordnung. In § 2 formulierst du jedes Ziel nach der SMART-Regel: eine Messgröße, ein Zahlenwert, ein Datum und die Datenquelle, aus der der Wert abgelesen wird. „Umsatz laut BWA Dezember“ oder „Sitzungen im Analytics-Tool im Monat Dezember“ sind Datenquellen, „nach Einschätzung der Geschäftsführung“ ist keine.

Verteile die Gewichte so, dass sie zusammen 100 Prozent ergeben, und setze für jedes messbare Ziel Schwelle, Zielwert und Maximum in § 2 Abs. 4. Projektziele wie eine Systemeinführung bekommen nur erreicht oder nicht erreicht plus eine Toleranz für Verzögerungen, die der Mitarbeiter nicht zu vertreten hat. In § 3 Abs. 2 legst du fest, wie viel Prozent Bonus an der Schwelle und am Maximum fließen; 50 und 150 Prozent sind gängig. In § 4 und § 5 trägst du Fristen für Feststellung und Auszahlung ein.`,
      },
      {
        titel: "Typische Fehler bei Bonusregelungen und ihre Folgen",
        text: `Der klassische Fehler ist der Freiwilligkeitsvorbehalt: „Der Bonus wird freiwillig gezahlt, ein Rechtsanspruch besteht nicht.“ Bei einem Bonus, der als Gegenleistung für Zielerreichung versprochen wird, ist das widersprüchlich und unwirksam; der Mitarbeiter bekommt den Bonus trotzdem, und du hast eine Klausel, auf die du dich nie verlassen konntest.

Zweiter Fehler ist die Stichtagsklausel: Bonus nur, wenn das Arbeitsverhältnis am 31. März ungekündigt besteht. Für erarbeitete, leistungsbezogene Vergütung ist das unwirksam. Dritter Fehler sind vage Ziele wie „Kundenzufriedenheit verbessern“ oder „Marke stärken“. Im Streit legt das Gericht sie zugunsten des Mitarbeiters aus.

Vierter und teuerster Fehler ist das vergessene Zielgespräch. Vereinbarst du schuldhaft keine Ziele, schuldest du den Bonus wie bei voller Zielerreichung als Schadensersatz. Vermeide außerdem Ziele, die der Mitarbeiter nicht beeinflussen kann, Formeln ohne Deckel nach oben und Boni, die den Mindestlohn ersetzen sollen; auf den Mindestlohn ist nur anrechenbar, was monatlich und vorbehaltlos gezahlt wird.`,
      },
      {
        titel: "Rechtliche Grundlagen: Zielvereinbarung, billiges Ermessen, Nachweisgesetz",
        text: `Eine eigene gesetzliche Regelung für Zielvereinbarungen gibt es nicht; sie sind Vertragsgestaltung im Rahmen der §§ 611a und 315 BGB. Legt der Arbeitgeber Ziele einseitig fest, muss das nach § 315 BGB billigem Ermessen entsprechen und ist gerichtlich überprüfbar. Weil die Zielvereinbarung vom Arbeitgeber vorformuliert wird, unterliegt sie der AGB-Kontrolle nach §§ 305 ff. BGB; intransparente oder unangemessen benachteiligende Klauseln sind unwirksam.

Das Bundesarbeitsgericht hat in mehreren Entscheidungen die Leitplanken gesetzt: Ein Freiwilligkeitsvorbehalt bei zugesagter leistungsbezogener Vergütung ist unwirksam, eine Stichtagsklausel für bereits erarbeitete Boni ebenfalls, und unterlassene Zielvereinbarungen lösen Schadensersatz in Höhe des Bonus bei voller Zielerreichung aus. Der Zielbonus ist Arbeitsentgelt, also lohnsteuer- und sozialversicherungspflichtig, und als Vergütungsbestandteil nach dem Nachweisgesetz zu dokumentieren. Mutterschutzzeiten dürfen den Bonus nicht mindern; für Elternzeit ohne Entgelt ist eine zeitanteilige Kürzung zulässig, wenn sie vereinbart ist. Krankheitszeiten mit Entgeltfortzahlung mindern den Bonus in dieser Vorlage nicht; eine Kürzung wäre ohnehin nur in den engen Grenzen des § 4a EFZG möglich. Ein Widerrufsvorbehalt ist nur wirksam, wenn er Gründe nennt und der widerrufliche Teil einen kleinen Anteil der Gesamtvergütung nicht übersteigt.`,
      },
      {
        titel: "Wann die Zielvereinbarung-Vorlage nicht reicht",
        text: `Für Provisionsmodelle im Vertrieb mit Abschlussprovisionen, Stornohaftung und Provisionsabrechnung nach § 87c HGB brauchst du eine eigene Provisionsvereinbarung; für Beteiligungen am Unternehmenswert ein Programm für virtuelle Anteile oder Optionen, das steuerlich geprüft ist. Dasselbe gilt für Boni an Geschäftsführer, die im Anstellungsvertrag und gegebenenfalls durch Gesellschafterbeschluss geregelt werden.

Mit Betriebsrat sind Entlohnungsgrundsätze und leistungsbezogene Entgelte nach § 87 Abs. 1 Nr. 10 und 11 BetrVG mitbestimmungspflichtig; dann gehört das Bonussystem in eine Betriebsvereinbarung. Bei Tarifbindung können tarifliche Leistungsentgelte vorgehen. Bei Boni, die einen erheblichen Teil der Vergütung ausmachen, und bei Clawback-Klauseln, mit denen du Boni zurückfordern willst, solltest du einen Fachanwalt für Arbeitsrecht einbeziehen. GründerX stellt Software und Muster bereit, keine Rechts- oder Steuerberatung.`,
      },
    ],
  text: `Zielvereinbarung und Bonusregelung für den Zeitraum [01.01.2027] bis [31.12.2027]

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], beschäftigt als [Berufsbezeichnung] seit dem [Datum]
– nachfolgend „Arbeitnehmer“ –

§ 1 Gegenstand und Zielbonus
(1) Diese Vereinbarung ergänzt den Arbeitsvertrag vom [Datum] und regelt die variable Vergütung des Arbeitnehmers für die Zielperiode vom [Datum] bis [Datum] (Zielperiode).
(2) Der Arbeitnehmer erhält zusätzlich zu seinem Festgehalt einen Zielbonus. Bei einer Zielerreichung von 100 % beträgt der Zielbonus [Betrag] EUR brutto (Zielbonus bei Planerfüllung). Das entspricht [z. B. 15] % des Jahresfestgehalts.
(3) Der Zielbonus ist Arbeitsentgelt und Gegenleistung für die in der Zielperiode erbrachte Arbeitsleistung. Er wird nach Maßgabe der nachfolgenden Regelungen geschuldet; ein Freiwilligkeitsvorbehalt besteht nicht.

§ 2 Ziele für die Zielperiode
Die Parteien vereinbaren folgende Ziele. Jedes Ziel ist spezifisch, messbar, erreichbar, relevant und terminiert formuliert.

(1) Unternehmensziel (Gewichtung [z. B. 30] %):
   Ziel U1: [z. B. „Der Umsatz des Unternehmens im Geschäftsjahr 2027 beträgt mindestens [Betrag] EUR netto (Zielwert 100 %). Messgröße: Umsatz laut Jahresabschluss / BWA Dezember.“]
   [Ziel U2: z. B. „Das EBIT beträgt mindestens [Betrag] EUR.“]

(2) Teamziel (Gewichtung [z. B. 20] %):
   Ziel T1: [z. B. „Das Marketing-Team senkt die durchschnittlichen Kundenakquisitionskosten (CAC) über alle bezahlten Kanäle von [Betrag] EUR auf [Betrag] EUR, gemessen als Jahresdurchschnitt im Werbe-Reporting [Tool].“]

(3) Individuelle Ziele (Gewichtung insgesamt [z. B. 50] %):
   Ziel I1 (Gewichtung [z. B. 20] %): [z. B. „Steigerung des organischen Traffics der Website von [Zahl] auf [Zahl] Sitzungen im Monat Dezember 2027, gemessen in [Analytics-Tool].“]
   Ziel I2 (Gewichtung [z. B. 15] %): [z. B. „Einführung des neuen CRM-Systems [Bezeichnung] bis zum 30.06.2027 mit Schulung aller Vertriebsmitarbeiter; Nachweis durch Abnahmeprotokoll der Geschäftsführung.“]
   Ziel I3 (Gewichtung [z. B. 15] %): [z. B. „Abschluss von mindestens [Anzahl] Neukundenverträgen mit einem Jahresvolumen von je mindestens [Betrag] EUR bis zum 31.12.2027.“]

(4) Für jedes Ziel sind ein Schwellenwert (Zielerreichung 80 %), der Zielwert (100 %) und ein Maximalwert (120 %) wie folgt festgelegt:
   Ziel U1: Schwelle [Wert], Ziel [Wert], Maximum [Wert]
   Ziel T1: Schwelle [Wert], Ziel [Wert], Maximum [Wert]
   Ziel I1: Schwelle [Wert], Ziel [Wert], Maximum [Wert]
   Ziel I2: Projektziel; erreicht (100 %) oder nicht erreicht (0 %); bei Verzögerung um bis zu [z. B. 4] Wochen aus Gründen außerhalb des Verantwortungsbereichs des Arbeitnehmers gilt das Ziel als erreicht
   Ziel I3: Schwelle [Wert], Ziel [Wert], Maximum [Wert]

§ 3 Gewichtung und Zielerreichungsstaffel
(1) Der Zielbonus berechnet sich aus der Summe der gewichteten Zielerreichungsgrade aller Ziele, multipliziert mit dem Zielbonus bei Planerfüllung.
(2) Für jedes messbare Ziel gilt: Unterhalb des Schwellenwerts beträgt der Zielerreichungsgrad 0 %. Zwischen Schwellenwert und Maximalwert wird linear interpoliert; der Schwellenwert entspricht einem Zielerreichungsgrad von [z. B. 50] %, der Zielwert 100 % und der Maximalwert [z. B. 150] %. Über dem Maximalwert bleibt der Zielerreichungsgrad bei [z. B. 150] %.
(3) Der Gesamtbonus ist auf [z. B. 150] % des Zielbonus bei Planerfüllung begrenzt.
(4) Beispielrechnung: Zielerreichung U1 100 % (Gewicht 30 %), T1 120 % (Gewicht 20 %), I1 80 % (Gewicht 20 %), I2 100 % (Gewicht 15 %), I3 0 % (Gewicht 15 %) ergibt 30 + 24 + 16 + 15 + 0 = 85 % des Zielbonus bei Planerfüllung.

§ 4 Messung, Datengrundlage und Feststellung
(1) Maßgeblich für die Messung sind die in § 2 genannten Datenquellen. Die Parteien stimmen die Datengrundlage zu Beginn der Zielperiode ab; Änderungen der Messmethode während der Zielperiode bedürfen der Textform.
(2) Der Arbeitgeber stellt dem Arbeitnehmer quartalsweise, spätestens [z. B. 4] Wochen nach Quartalsende, einen Zwischenstand der Zielerreichung zur Verfügung. Die Parteien führen mindestens zur Jahresmitte ein Zielgespräch.
(3) Der Arbeitgeber stellt die Zielerreichung nach Ende der Zielperiode, spätestens bis zum [z. B. 31.03.] des Folgejahres, fest und teilt sie dem Arbeitnehmer in Textform mit Berechnung mit. Soweit Zielwerte von der Feststellung des Jahresabschlusses abhängen, erfolgt die Feststellung spätestens [z. B. 2] Wochen nach dessen Vorliegen, spätestens am [z. B. 30.06.].
(4) Der Arbeitnehmer kann der Feststellung innerhalb von [z. B. 4] Wochen in Textform widersprechen. Die Parteien bemühen sich dann um eine einvernehmliche Klärung; gelingt sie nicht, bleibt der Rechtsweg offen.

§ 5 Auszahlung und Fälligkeit
(1) Der Zielbonus wird mit der Gehaltsabrechnung für den Monat gezahlt, der auf die Feststellung nach § 4 Abs. 3 folgt, spätestens mit der Abrechnung für [z. B. April] des Folgejahres.
(2) [Optional: Auf den Zielbonus werden quartalsweise Abschläge in Höhe von je [z. B. 15] % des Zielbonus bei Planerfüllung gezahlt. Die Abschläge werden mit dem festgestellten Zielbonus verrechnet; übersteigen die Abschläge den Zielbonus, ist der Mehrbetrag mit der nächsten Gehaltsabrechnung zurückzuzahlen, höchstens jedoch in Höhe der pfändbaren Beträge.]
(3) Der Zielbonus ist Bruttoarbeitsentgelt; Steuern und Sozialversicherungsbeiträge werden abgeführt. Er ist bei der Berechnung von Urlaubsentgelt, Entgeltfortzahlung und sonstigen Ansprüchen nur zu berücksichtigen, soweit das Gesetz dies vorsieht.
(4) Die Auszahlung setzt nicht voraus, dass das Arbeitsverhältnis am Auszahlungstag ungekündigt besteht.

§ 6 Eintritt, Austritt, Elternzeit, Krankheit
(1) Tritt der Arbeitnehmer während der Zielperiode ein oder endet das Arbeitsverhältnis während der Zielperiode, wird der Zielbonus zeitanteilig mit einem Zwölftel je vollen Beschäftigungsmonat der Zielperiode gezahlt.
(2) Bei Austritt während der Zielperiode wird die Zielerreichung zum Austrittsdatum anhand der bis dahin vorliegenden Daten festgestellt. Ist eine Feststellung zum Austrittsdatum nicht möglich (insbesondere bei Jahreszielen), gilt die am Ende der Zielperiode festgestellte Zielerreichung; für Projektziele wird der bis zum Austritt erreichte Fortschritt angemessen bewertet. Der Bonus wird dann zum regulären Termin nach § 5 ausgezahlt.
(3) Für Zeiten ohne Entgeltanspruch von mehr als [z. B. 4] Wochen am Stück (z. B. Elternzeit, unbezahlter Urlaub, Krankheit nach Ablauf der Entgeltfortzahlung) verringert sich der Zielbonus zeitanteilig um ein Zwölftel je vollen Kalendermonat ohne Entgeltanspruch. Zeiten der Entgeltfortzahlung, des Erholungsurlaubs und des Mutterschutzes führen nicht zu einer Kürzung.
(4) Bei einer Freistellung bis zum Austritt gelten die Ziele für die Freistellungszeit als mit [z. B. 100] % erreicht, soweit der Arbeitnehmer sie wegen der Freistellung nicht mehr beeinflussen kann.

§ 7 Anpassung der Ziele bei veränderten Umständen
(1) Ändern sich während der Zielperiode wesentliche Rahmenbedingungen, die der Arbeitnehmer nicht zu vertreten hat (z. B. Wegfall eines Produkts, Umstrukturierung, Wechsel des Aufgabengebiets, erhebliche Marktveränderungen, längere Krankheit, Ausfall wesentlicher Ressourcen), kann jede Partei eine Anpassung der betroffenen Ziele verlangen. Die Parteien werden die Ziele dann in Textform anpassen; die Anpassung gilt ab dem Zeitpunkt der Veränderung.
(2) Kommt eine Einigung über die Anpassung nicht innerhalb von [z. B. 4] Wochen zustande, wird das betroffene Ziel für den Zeitraum ab der Veränderung mit [z. B. 100] % bewertet, wenn die Veränderung aus der Sphäre des Arbeitgebers stammt, sonst nach billigem Ermessen des Arbeitgebers (§ 315 BGB), das gerichtlich überprüfbar ist.
(3) Wechselt der Arbeitnehmer die Position, werden die individuellen Ziele für die neue Position neu vereinbart; die bis dahin erreichten Ziele werden zeitanteilig bewertet.

§ 8 Verfahren für die nächste Zielperiode
(1) Für jede weitere Zielperiode schließen die Parteien bis spätestens [z. B. 31.01.] eine neue Zielvereinbarung. Der Arbeitgeber lädt den Arbeitnehmer rechtzeitig, spätestens [z. B. 4] Wochen vor Ablauf der laufenden Zielperiode, zum Zielgespräch ein und legt einen Vorschlag vor.
(2) Kommt bis zum [z. B. 31.03.] keine Vereinbarung zustande, obwohl der Arbeitgeber einen angemessenen Vorschlag unterbreitet hat, kann der Arbeitgeber die Ziele für die Zielperiode nach billigem Ermessen einseitig festlegen (Zielvorgabe) und dem Arbeitnehmer in Textform mitteilen.
(3) Unterbleibt die Zielvereinbarung oder Zielvorgabe aus Gründen, die der Arbeitgeber zu vertreten hat, gilt für die Zielperiode eine Zielerreichung von 100 %, und der Zielbonus bei Planerfüllung in Höhe des Vorjahres ist geschuldet.

§ 9 Schlussbestimmungen
(1) Diese Vereinbarung ist Bestandteil des Arbeitsvertrags. Änderungen bedürfen der Textform; das gilt auch für diese Klausel.
(2) Soweit diese Vereinbarung keine Regelung enthält, gelten die Bestimmungen des Arbeitsvertrags. Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam; anstelle der unwirksamen Bestimmung gilt die gesetzliche Regelung, insbesondere § 315 BGB.
(3) Jede Partei erhält eine unterschriebene Ausfertigung.

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
