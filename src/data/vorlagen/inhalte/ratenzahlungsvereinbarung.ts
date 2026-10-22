// Inhalt der Vorlage „ratenzahlungsvereinbarung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../finanzen.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Ratenzahlungsvereinbarung brauchst",
        text: `Ein Kunde kann die Rechnung nicht auf einmal bezahlen, will aber zahlen. Du selbst hast eine Lieferantenrechnung offen und brauchst Luft bis zum nächsten Auftrag. Oder ein Mahnbescheid läuft schon, und beide Seiten wollen eine Einigung ohne Gerichtstermin. In allen drei Fällen ist die Ratenzahlungsvereinbarung das richtige Dokument.

Sie hat für den Gläubiger zwei Vorteile gegenüber einer mündlichen Zusage: Der Schuldner erkennt die Forderung an und kann sie später nicht mehr bestreiten, und die Verjährung beginnt neu. Für den Schuldner bringt sie Planbarkeit und den Schutz vor Vollstreckung, solange er die Raten pünktlich zahlt. Die Vorlage passt für Forderungen aus Rechnungen, Darlehen oder Schadensersatz zwischen Unternehmen genauso wie gegenüber Privatkunden, mit einer wichtigen Einschränkung bei Zinsen, die weiter unten erklärt wird.`,
      },
      {
        titel: "Was muss in eine Ratenzahlungsvereinbarung?",
        text: `Eine Ratenzahlungsvereinbarung, die vor Gericht hält, enthält mindestens diese Punkte, die alle in der Vorlage stehen:

- Die Forderung mit Rechtsgrund, Rechnungsnummer und Datum, aufgeteilt in Hauptforderung, bisherige Verzugszinsen und Mahnkosten (§ 1 Abs. 1 und 2)
- Das Anerkenntnis des Schuldners dem Grunde und der Höhe nach mit Ausschluss bekannter Einwendungen (§ 1 Abs. 3)
- Den Ratenplan mit Betrag und Fälligkeit jeder Rate oder gleichbleibende Monatsraten mit Schlussrate (§ 2)
- Bankverbindung, Verwendungszweck und die Regel, dass der Eingang beim Gläubiger zählt (§ 2 Abs. 2)
- Stundungszinsen oder ausdrücklich zinslose Stundung (§ 3)
- Die Verfallklausel: Rückstand von zwei Raten, Mahnung, zwei Wochen Nachfrist, dann wird der Rest sofort fällig (§ 4)
- Verzugszinsen nach § 288 BGB und bei Unternehmern die 40-EUR-Pauschale (§ 4 Abs. 2)
- Kostenverteilung, Neubeginn der Verjährung und der Hinweis, dass die alte Forderung samt Sicherheiten bestehen bleibt (§§ 5, 6)

Ohne Verfallklausel müsstest du bei jeder ausgefallenen Rate einzeln mahnen und klagen.`,
      },
      {
        titel: "Ratenzahlung Muster ausfüllen: so gehst du vor",
        text: `Trage Gläubiger und Schuldner mit Anschrift ein; bei Firmen den vollständigen Namen mit Rechtsform. In § 1 übernimmst du die Forderung aus der Rechnung und rechnest die bis heute aufgelaufenen Verzugszinsen und Mahnkosten dazu; die Summe ist die Gesamtforderung, auf die sich der Ratenplan bezieht. In § 2 legst du die Raten fest. Faustregel: lieber wenige, realistische Raten als ein langer Plan, der nach drei Monaten platzt. Prüfe, dass alle Raten zusammen die Gesamtforderung ergeben.

In § 3 wählst du Variante A mit Zins oder Variante B zinslos und streichst die andere. In § 4 kannst du den Zinssatz für den Verzugsfall anpassen: fünf Prozentpunkte über Basiszins bei Verbrauchern, neun zwischen Unternehmern. Ist bereits ein Mahn- oder Vollstreckungsbescheid ergangen, trage in § 6 Abs. 2 das Aktenzeichen ein, damit der Titel bestehen bleibt. Beide Parteien unterschreiben, jede bekommt ein Exemplar.`,
      },
      {
        titel: "Typische Fehler bei Ratenzahlung und Stundung",
        text: `Der erste Fehler ist, Raten zu vereinbaren, ohne die Forderung vorher anerkennen zu lassen. Dann kann der Schuldner nach der dritten Rate Mängel einwenden, und du stehst wieder am Anfang. Der zweite Fehler ist eine Verfallklausel, die schon bei einem Tag Verspätung den Gesamtbetrag fällig stellt; solche Klauseln gelten schnell als unangemessen. Die Vorlage knüpft den Verfall an zwei rückständige Raten, eine schriftliche Mahnung und eine Nachfrist von zwei Wochen.

Der dritte Fehler betrifft Privatkunden: Wer einem Verbraucher gegen Zinsen länger als drei Monate stundet, kann damit ein Verbraucherdarlehen schließen (§ 506 BGB) mit Widerrufsrecht und Pflichtangaben, die in der Vorlage fehlen. Stunde Verbrauchern deshalb zinslos oder halte die Laufzeit kurz. Der vierte Fehler ist die Annahme, die Vereinbarung sei ein Vollstreckungstitel. Sie ist es nicht; bleibt der Schuldner säumig, brauchst du weiterhin Mahnbescheid oder Urteil, nur eben ohne Streit über die Forderung selbst.`,
      },
      {
        titel: "Rechtliche Grundlagen: Anerkenntnis, Verjährung, Verzug, Stundungszinsen",
        text: `Das Anerkenntnis in § 1 lässt die Verjährung neu beginnen (§ 212 Abs. 1 Nr. 1 BGB); für Rechnungen bedeutet das wieder drei volle Jahre ab Jahresende (§§ 195, 199 BGB). Die Stundung schiebt die Fälligkeit hinaus, ändert aber nichts an der Forderung; das stellt § 6 Abs. 3 klar, damit keine Schuldersetzung angenommen wird und Sicherheiten erhalten bleiben. Gerät der Schuldner mit einer kalendermäßig bestimmten Rate in Rückstand, tritt Verzug ohne Mahnung ein (§ 286 Abs. 2 Nr. 1 BGB).

Die Verzugszinsen betragen fünf Prozentpunkte über dem Basiszinssatz, bei Entgeltforderungen zwischen Unternehmern neun Prozentpunkte (§ 288 Abs. 1 und 2 BGB), dazu kommt zwischen Unternehmern die Pauschale von 40 EUR (§ 288 Abs. 5 BGB). Für die Höhe der Stundungszinsen gibt es keine gesetzliche Vorgabe; als Anhaltspunkt: Das Finanzamt verlangt bei einer Steuerstundung 0,5 % pro Monat (§§ 234, 238 AO). Wer deutlich mehr nimmt, riskiert die Einordnung als Wucher.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht: Verbraucher, Titel, Insolvenz",
        text: `Die Vorlage ist für den außergerichtlichen Ratenplan zwischen zwei Parteien gedacht. Sie reicht nicht, wenn du als Unternehmer Verbrauchern entgeltliche Zahlungsaufschübe über drei Monate hinaus anbietest; dafür braucht es die Pflichtangaben des Verbraucherdarlehensrechts, die ein Anwalt formulieren sollte. Sie ersetzt auch keinen vollstreckbaren Titel: Wenn der Schuldner schon einmal nicht gezahlt hat und der Betrag hoch ist, lass das Anerkenntnis notariell beurkunden und mit einer Unterwerfungsklausel versehen oder nimm den Vergleich vor Gericht.

Ist der Schuldner bereits zahlungsunfähig oder läuft ein Insolvenzverfahren, gelten andere Regeln, und Ratenzahlungen können angefochten werden. GründerX stellt die Vorlage als Werkzeug bereit; eine Rechtsberatung im Einzelfall ist sie nicht.`,
      },
    ],
  text: `Ratenzahlungsvereinbarung

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Gläubiger“ –

und

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Schuldner“ –

§ 1 Forderung und Anerkenntnis
(1) Der Gläubiger hat gegen den Schuldner eine Forderung aus [Rechtsgrund, z. B. „Rechnung Nr. [Nummer] vom [Datum] über die Lieferung von [Ware/Leistung]“] in Höhe von [Betrag] EUR (Hauptforderung).
(2) Hinzu kommen bis zum Tag dieser Vereinbarung aufgelaufene Verzugszinsen in Höhe von [Betrag] EUR sowie Mahn- und Rechtsverfolgungskosten in Höhe von [Betrag] EUR. Die Gesamtforderung beläuft sich damit auf [Gesamtbetrag] EUR.
(3) Der Schuldner erkennt die Gesamtforderung nach Absatz 2 dem Grunde und der Höhe nach als bestehend und fällig an. Einwendungen und Einreden gegen die Forderung, die dem Schuldner bei Abschluss dieser Vereinbarung bekannt sind oder bekannt sein mussten, sind ausgeschlossen.

§ 2 Ratenplan und Zahlungsweise
(1) Der Gläubiger stundet dem Schuldner die Gesamtforderung und gestattet die Zahlung in [Anzahl] Raten wie folgt:
   Rate 1: [Betrag] EUR, fällig am [Datum]
   Rate 2: [Betrag] EUR, fällig am [Datum]
   Rate 3: [Betrag] EUR, fällig am [Datum]
   [weitere Raten]
   Schlussrate: [Betrag] EUR, fällig am [Datum]
   [Alternative: in [Anzahl] gleichbleibenden monatlichen Raten von je [Betrag] EUR, erstmals am [Datum], danach jeweils zum [z. B. 15.] eines Monats, sowie einer Schlussrate von [Betrag] EUR am [Datum].]
(2) Die Raten sind kostenfrei auf das Konto des Gläubigers, IBAN [IBAN] bei der [Bank], Verwendungszweck „[Kundennummer/Rechnungsnummer]“, zu überweisen. Maßgeblich für die Rechtzeitigkeit ist der Eingang beim Gläubiger.
(3) Der Schuldner darf jederzeit höhere Raten oder den gesamten Restbetrag vorzeitig zahlen. Sonderzahlungen werden auf die letzten Raten angerechnet.

§ 3 Zinsen
[Variante A: Der gestundete Betrag wird ab dem [Datum] bis zur vollständigen Zahlung mit [z. B. 5] % pro Jahr verzinst. Die Zinsen werden mit der Schlussrate abgerechnet.]
[Variante B: Für die Dauer der Stundung werden keine Zinsen erhoben, solange der Schuldner die Raten vertragsgemäß zahlt.]
Zahlungen werden zunächst auf Kosten, dann auf Zinsen und zuletzt auf die Hauptforderung angerechnet (§ 367 BGB).

§ 4 Verfallklausel bei Zahlungsverzug
(1) Gerät der Schuldner mit zwei Raten ganz oder teilweise in Rückstand und zahlt er den rückständigen Betrag nicht innerhalb von zwei Wochen nach Zugang einer schriftlichen Mahnung, entfällt die Stundung. Der gesamte noch offene Restbetrag wird dann sofort in einer Summe fällig.
(2) Ab Eintritt des Verzugs schuldet der Schuldner Verzugszinsen in Höhe von [fünf Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 1 BGB) / neun Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB, nur wenn kein Verbraucher beteiligt ist)]. [Bei Unternehmern zusätzlich: Je Verzugsfall ist die Pauschale von 40 EUR nach § 288 Abs. 5 BGB geschuldet.]
(3) Das Gleiche wie in Absatz 1 gilt, wenn über das Vermögen des Schuldners die Eröffnung eines Insolvenzverfahrens beantragt wird oder der Schuldner die eidesstattliche Versicherung (Vermögensauskunft) abgibt.

§ 5 Kosten
(1) Die bisher entstandenen Kosten nach § 1 Abs. 2 sind in der Gesamtforderung enthalten.
(2) Weitere Kosten der Rechtsverfolgung, die durch einen Verstoß des Schuldners gegen diese Vereinbarung entstehen, trägt der Schuldner.
(3) Jede Partei trägt die Kosten ihrer eigenen Beratung im Zusammenhang mit dieser Vereinbarung.

§ 6 Verjährung und Stundung
(1) Die Parteien sind sich einig, dass die Verjährung der Gesamtforderung mit dem Anerkenntnis nach § 1 Abs. 3 neu beginnt (§ 212 Abs. 1 Nr. 1 BGB).
(2) Solange der Schuldner die Raten vertragsgemäß zahlt, wird der Gläubiger die Forderung nicht gerichtlich geltend machen und keine Vollstreckungsmaßnahmen einleiten. [Optional: Ein bereits erwirkter Mahnbescheid / Vollstreckungsbescheid [Aktenzeichen] bleibt bestehen; der Gläubiger vollstreckt daraus nur, wenn die Stundung nach § 4 entfällt.]
(3) Die Stundung ist keine Erfüllung. Eine Novation (Schuldersetzung) ist nicht gewollt; die ursprüngliche Forderung bleibt mit allen Sicherheiten bestehen.

§ 7 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieser Vereinbarung bedürfen der Schriftform. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(4) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Firma / Vorname Nachname], Gläubiger


______________________________
[Firma / Vorname Nachname], Schuldner

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
