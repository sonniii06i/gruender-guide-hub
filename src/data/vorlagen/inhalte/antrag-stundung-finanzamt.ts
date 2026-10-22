// Inhalt der Vorlage „antrag-stundung-finanzamt“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../verwaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann ein Stundungsantrag beim Finanzamt sinnvoll ist",
        text: `Die Einkommensteuer für ein gutes Vorjahr wird fällig, aber dieses Jahr ist der Großkunde abgesprungen; die Umsatzsteuer-Nachzahlung nach der Betriebsprüfung trifft dich mitten in der Investitionsphase; eine Forderung über fünfstellige Beträge hängt seit Wochen bei einem zahlungsunfähigen Kunden. In solchen Lagen ist die Steuer nicht strittig, du kannst sie nur gerade nicht in einer Summe zahlen.

Genau dafür gibt es die Stundung nach § 222 AO: Das Finanzamt schiebt die Fälligkeit hinaus oder akzeptiert Raten, und du vermeidest Säumniszuschläge, Mahnungen und Vollstreckung. Der Antrag lohnt sich, sobald absehbar ist, dass dein Konto am Fälligkeitstag nicht reicht, und solange die Ursache des Engpasses vorübergehend ist. Er ist dagegen der falsche Weg, wenn du die Steuer für falsch hältst; dann brauchst du den Einspruch mit Antrag auf Aussetzung der Vollziehung, der eine eigene Vorlage hat.`,
      },
      {
        titel: "Stundungsantrag: Das muss drinstehen",
        text: `Finanzämter entscheiden nach Aktenlage. Ein Antrag ohne Zahlen wird abgelehnt oder mit Rückfragen verzögert, während die Säumniszuschläge schon laufen. Die Vorlage enthält deshalb alles, was die Stundungsstelle sehen will:

- Steuernummer, Steuerart, Bescheiddatum, Betrag und Fälligkeitstag
- den Antrag selbst: Stundung bis zu einem Datum oder Ratenzahlung mit Anzahl und Höhe der Raten
- die Begründung der erheblichen Härte mit der konkreten Ursache
- den Nachweis, dass die Härte vorübergehend ist und der Steueranspruch nicht gefährdet wird
- Angaben zur wirtschaftlichen Lage: Kontostand, offene Forderungen, Fixkosten, Umsatzprognose, Kreditlinie
- den Ratenplan mit erster Zahlung und Lastschrift oder Überweisung
- Sicherheiten oder die Bitte, darauf zu verzichten
- den Hinweis auf die Stundungszinsen und optional den Antrag auf Zinserlass
- den Hilfsantrag auf Vollstreckungsaufschub und die Anlagen

Je konkreter die Zahlen, desto schneller die Entscheidung.`,
      },
      {
        titel: "Antrag auf Stundung ausfüllen: Schritt für Schritt",
        text: `Übernimm zuerst Steuerart, Bescheiddatum, Betrag und Fälligkeit aus dem Bescheid in Betreff und ersten Absatz. Entscheide dich zwischen Variante A (Stundung bis zu einem Datum, wenn ein konkreter Zahlungseingang ansteht) und Variante B (Ratenzahlung) und lösche die andere. In der Begründung ersetzt du die Beispiele durch deine Situation: Nenne den Kunden, der ausgefallen ist, die Forderung, die offen ist, oder die Investition, die das Geld gebunden hat. Im Absatz zur vorübergehenden Härte trägst du ein, ab wann und woher wieder Mittel fließen.

Fülle die fünf Zahlen zur wirtschaftlichen Lage mit Werten vom Stichtag; sie müssen zu den beigefügten Kontoauszügen passen. Berechne den Ratenplan so, dass er bei realistischer Liquidität auch eingehalten werden kann, und leiste die erste Rate möglichst sofort. Wähle bei den Sicherheiten Variante A oder B, prüfe, ob du einen Zinserlass beantragen willst, hänge Bescheid, Kontoauszug, Forderungsliste und BWA an und unterschreibe. Sende den Antrag vor dem Fälligkeitstag, am besten über Mein ELSTER oder per Fax mit Sendebericht.`,
      },
      {
        titel: "Typische Fehler beim Stundungsantrag und wie du sie vermeidest",
        text: `Der häufigste Fehler ist der zu späte Antrag. Säumniszuschläge entstehen ab dem Tag nach der Fälligkeit, auch wenn die Stundung später bewilligt wird; stell den Antrag deshalb Wochen, nicht Tage vorher. Zweiter Fehler: Lohnsteuer oder einbehaltene Kapitalertragsteuer werden mit beantragt. Diese Abzugsbeträge sind von der Stundung ausgeschlossen, weil du sie nur treuhänderisch für andere einbehältst; der Antrag wird insoweit abgelehnt und kostet Glaubwürdigkeit.

Dritter Fehler: Die Begründung besteht aus allgemeinen Formulierungen wie „schwierige Marktlage“ ohne Zahlen. Vierter Fehler: Der Ratenplan ist zu ehrgeizig, die zweite Rate platzt, und die Stundung wird widerrufen; dann ist der gesamte Restbetrag sofort fällig. Fünfter Fehler: Du verschweigst weitere Rückstände oder eine ungenutzte Kreditlinie. Das Finanzamt kennt deine Steuerkonten ohnehin und fragt nach Kreditmöglichkeiten; wer unvollständig antwortet, verspielt den Ermessensspielraum.`,
      },
      {
        titel: "Rechtsgrundlagen: § 222, § 234, § 238 und § 258 AO",
        text: `Die Stundung steht in § 222 AO: Die Finanzbehörde kann Ansprüche ganz oder teilweise stunden, wenn die Einziehung bei Fälligkeit eine erhebliche Härte bedeuten würde und der Anspruch durch die Stundung nicht gefährdet erscheint; die Stundung soll in der Regel nur auf Antrag und gegen Sicherheitsleistung gewährt werden. Steuerabzugsbeträge wie die Lohnsteuer sind nach § 222 Satz 3 und 4 AO ausgenommen.

Für die Dauer der Stundung fallen nach § 234 Abs. 1 AO Stundungszinsen an, die nach § 238 Abs. 1 AO 0,5 Prozent für jeden vollen Monat betragen; § 234 Abs. 2 AO erlaubt einen Zinsverzicht aus Billigkeitsgründen. Ohne Stundung entstehen nach § 240 AO Säumniszuschläge von einem Prozent des rückständigen Betrags für jeden angefangenen Monat. Der Vollstreckungsaufschub nach § 258 AO ist die mildere Alternative, wenn die Vollstreckung unbillig wäre; er lässt die Fälligkeit bestehen. Ist die Steuer dauerhaft nicht zahlbar, kommt nur ein Erlass nach § 227 AO in Betracht, der an deutlich strengere Voraussetzungen geknüpft ist.`,
      },
      {
        titel: "Wann der Stundungsantrag nicht mehr reicht",
        text: `Die Vorlage hilft bei einem vorübergehenden Engpass mit klarer Ursache und absehbarem Ende. Sie hilft nicht, wenn die Zahlungsunfähigkeit dauerhaft ist: Dann prüft das Finanzamt, ob der Anspruch gefährdet ist, und lehnt ab. Bei einer GmbH oder UG musst du in dieser Lage die Insolvenzantragspflicht im Blick behalten; Zahlungsunfähigkeit verpflichtet die Geschäftsführung, ohne schuldhaftes Zögern, spätestens aber innerhalb von drei Wochen Insolvenzantrag zu stellen, und das Finanzamt ist dabei ein Gläubiger wie jeder andere.

Ebenso wenig passt die Vorlage, wenn bereits Vollstreckungsmaßnahmen laufen und eine Kontopfändung droht; dann brauchst du neben dem Antrag ein Gespräch mit der Vollstreckungsstelle und meist einen Steuerberater, der die Gesamtlage mit allen Steuerarten und Rückständen darlegt. GründerX ist Software und keine Steuerberatung; für die Verhandlung über Sicherheiten und Zinserlass ist ein Berater der richtige Ansprechpartner.`,
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

Antrag auf Stundung (§ 222 AO)
[Steuerart, z. B. Einkommensteuer 2025 einschließlich Solidaritätszuschlag] laut Bescheid vom [Datum], fällig am [Datum]

Sehr geehrte Damen und Herren,

mit Bescheid vom [Datum] haben Sie [Steuerart] in Höhe von [Betrag] EUR festgesetzt. Der Betrag ist am [Datum] fällig. Ich beantrage, diesen Betrag

[Variante A: bis zum [Datum] zu stunden.]
[Variante B: in [Anzahl] monatlichen Raten zu je [Betrag] EUR, beginnend am [Datum], zu stunden (Ratenzahlung).]

Begründung:

Die Einziehung bei Fälligkeit würde für mich eine erhebliche Härte bedeuten. [Grund, z. B.: Die Nachzahlung beruht auf dem Gewinn des Jahres [Jahr]. Seit [Monat/Jahr] ist der Umsatz meines Unternehmens durch [z. B. den Ausfall des Hauptkunden [Name] / die verspätete Zahlung einer Forderung in Höhe von [Betrag] EUR / eine Investition in [Gegenstand]] erheblich zurückgegangen. Die liquiden Mittel reichen zum Fälligkeitstag nicht aus, um die Steuer in einer Summe zu zahlen, ohne den laufenden Geschäftsbetrieb (Löhne, Miete, Lieferanten) zu gefährden.]

Die Härte ist vorübergehend: [z. B. Mit dem Zahlungseingang aus dem Auftrag [Bezeichnung] am [Datum] / mit den Umsätzen des Weihnachtsgeschäfts] stehen ab [Monat/Jahr] wieder ausreichende Mittel zur Verfügung. Der Steueranspruch wird durch die Stundung nicht gefährdet. Weitere Steuerrückstände bestehen nicht. [Alternativ: Weitere Rückstände bestehen in Höhe von [Betrag] EUR ([Steuerart]); diese sind in den Ratenplan einbezogen.]

Zur aktuellen wirtschaftlichen Lage:
– Kontostand Geschäftskonto zum [Datum]: [Betrag] EUR
– Offene Forderungen gegen Kunden: [Betrag] EUR, davon fällig bis [Datum]: [Betrag] EUR
– Monatliche Fixkosten (Miete, Personal, Versicherungen, Kredite): [Betrag] EUR
– Erwarteter Umsatz der nächsten drei Monate: [Betrag] EUR
– Verfügbare Kreditlinie: [Betrag] EUR, davon ausgeschöpft: [Betrag] EUR

Ratenvorschlag:
[Anzahl] Raten zu je [Betrag] EUR, jeweils zum [Tag] eines Monats, erstmals am [Datum], letzte Rate am [Datum]. [Eine erste Zahlung in Höhe von [Betrag] EUR habe ich bereits am [Datum] geleistet / leiste ich sofort.] Die Raten [ziehen Sie bitte per SEPA-Lastschrift von dem Konto [IBAN] ein / überweise ich unaufgefordert].

Sicherheiten:
[Variante A: Als Sicherheit biete ich [z. B. die Abtretung der Forderung gegen [Kunde] in Höhe von [Betrag] EUR / eine Bankbürgschaft der [Bank] über [Betrag] EUR] an.]
[Variante B: Ich bitte, von einer Sicherheitsleistung abzusehen, da der Betrag innerhalb von [Anzahl] Monaten vollständig getilgt wird und keine Steuerrückstände aus der Vergangenheit bestehen.]

Mir ist bekannt, dass für die Dauer der Stundung Stundungszinsen von 0,5 % für jeden vollen Monat anfallen (§ 234 Abs. 1, § 238 Abs. 1 AO). [Ich beantrage, die Zinsen aus Billigkeitsgründen zu erlassen (§ 234 Abs. 2 AO), weil [Begründung].]

Bis zur Entscheidung über diesen Antrag bitte ich, von Vollstreckungsmaßnahmen abzusehen. Sollte eine Stundung nicht in Betracht kommen, beantrage ich hilfsweise Vollstreckungsaufschub (§ 258 AO) nach dem vorgeschlagenen Ratenplan.

Anlagen:
– Kopie des Steuerbescheids
– Kontoauszug zum [Datum]
– Liste der offenen Forderungen
– Betriebswirtschaftliche Auswertung [Monat] bis [Monat] [Jahr] / Liquiditätsplan der nächsten sechs Monate
– [Nachweis des Härtegrunds, z. B. Insolvenzmitteilung des Kunden, ärztliche Bescheinigung]

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[ggf. Funktion, z. B. „Geschäftsführer der [Firma] GmbH“]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
