// Inhalt der Vorlage „vergleichsvereinbarung-forderung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../finanzen.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Vergleichsvereinbarung brauchst",
        text: `Ein Vergleich ist die Einigung, bei der beide Seiten nachgeben, um einen Streit zu beenden. Für Gründer ist das oft der wirtschaftlich beste Ausgang: Ein Kunde bestreitet die Hälfte der Rechnung wegen angeblicher Mängel, und ein Prozess würde länger dauern als das Projekt selbst. Ein Lieferant fordert Mehrkosten, die du nicht beauftragt hast, und ihr einigt euch auf einen Teilbetrag. Ein Projekt wurde abgebrochen, und beide Seiten wollen einen Schlussstrich.

Oder ein Mahnverfahren läuft bereits, und der Schuldner bietet einen Betrag an, den du akzeptieren kannst. Die Vorlage regelt den Vergleichsbetrag, die Zahlung, die Erledigung aller Ansprüche, die Umsatzsteuerkorrektur, einen optionalen Widerrufsvorbehalt und das Schicksal laufender Verfahren.`,
      },
      {
        titel: "Was muss in einen außergerichtlichen Vergleich?",
        text: `Der Vergleich steht und fällt mit der Beschreibung des Streits und der Reichweite der Erledigung. Die Vorlage enthält:

- Vorbemerkung mit Forderung, Rechtsgrund, Einwänden des Schuldners, Gegenansprüchen und laufendem Verfahren
- Die Formel „ohne Anerkennung einer Rechtspflicht, im Wege gegenseitigen Nachgebens“, die den Vergleich von einem Anerkenntnis abgrenzt
- Vergleichsbetrag in Zahlen und Worten mit Angabe, ob Umsatzsteuer enthalten ist (§ 1)
- Zahlungstermin oder Ratenplan und eine Verfallklausel, bei der die ursprüngliche Forderung wieder auflebt (§ 2)
- Abgeltungsklausel für alle bekannten und unbekannten Ansprüche aus dem Vorgang mit ausdrücklichen Ausnahmen (§ 3)
- Klarstellung, dass kein Anerkenntnis vorliegt (§ 3 Abs. 4)
- Rechnungskorrektur nach § 17 UStG bei Minderung des Entgelts (§ 4)
- Optionaler Widerrufsvorbehalt mit Frist (§ 5)
- Kostenverteilung und Rücknahme von Mahnbescheid oder Klage (§ 6)
- Vertraulichkeit, Schriftform, Gerichtsstand (§ 7)

Besonders wichtig ist die Verfallklausel: Ohne sie bleibt nach Nichtzahlung nur der reduzierte Betrag als Forderung übrig.`,
      },
      {
        titel: "Vergleich Muster ausfüllen: Vorbemerkung, Betrag, Abgeltung",
        text: `Beschreibe in der Vorbemerkung ehrlich und vollständig, worum gestritten wird: Forderung, Rechnungsnummer, die Einwände der Gegenseite und etwaige Gegenansprüche. Diese Beschreibung ist später die Grundlage dafür, was der Vergleich erledigt. In § 1 trägst du den Vergleichsbetrag ein und entscheidest, ob er die Umsatzsteuer enthält oder nicht; bei Rechnungen ist „einschließlich“ üblich. In § 2 wählst du Einmalzahlung oder Raten und trägst in Abs. 2 die ursprüngliche Forderung ein, die bei Verzug wieder auflebt.

In § 3 Abs. 2 listest du, was nicht erledigt sein soll, etwa künftige Gewährleistung oder Nutzungsrechte, die erst mit Zahlung übergehen; sonst schreib „keine“. In § 5 wählst du Variante A mit Widerrufsfrist, wenn eine Seite noch Anwalt oder Mitgesellschafter fragen will, sonst Variante B. In § 6 regelst du, wer die bisherigen Kosten trägt und wann ein laufender Mahnbescheid zurückgenommen wird. Beide unterschreiben; als Gläubiger stellst du anschließend die korrigierte Rechnung aus.`,
      },
      {
        titel: "Typische Fehler beim Vergleich über eine Forderung",
        text: `Der erste Fehler ist eine pauschale Abgeltungsklausel ohne Ausnahmen. Damit sind auch Ansprüche erledigt, an die du gerade nicht denkst: Vertraulichkeit, Rückgabe von Unterlagen, Gewährleistung für Mängel, die erst nächsten Monat auftauchen. Nimm ausdrücklich aus, was bleiben soll. Der zweite Fehler ist die fehlende Verfallklausel: Zahlt der Schuldner nicht, hast du den Rabatt verschenkt und nur noch den Vergleichsbetrag als Forderung.

Der dritte Fehler ist eine falsche Vorbemerkung. Beruht der Vergleich auf einem Sachverhalt, den beide Seiten für sicher hielten und der nicht stimmt, ist er unwirksam (§ 779 Abs. 1 BGB). Der vierte Fehler ist die vergessene Umsatzsteuer: Wer den Rechnungsbetrag reduziert, muss die Umsatzsteuer berichtigen und eine Korrekturrechnung stellen, sonst schuldet er dem Finanzamt die zu hoch ausgewiesene Steuer. Der fünfte Fehler ist die Annahme, aus dem Vergleich vollstrecken zu können.`,
      },
      {
        titel: "Rechtsgrundlagen: § 779 BGB, Vollstreckbarkeit und § 17 UStG",
        text: `Der Vergleich ist in § 779 BGB geregelt: ein Vertrag, durch den der Streit oder die Ungewissheit über ein Rechtsverhältnis im Wege gegenseitigen Nachgebens beseitigt wird. Er ist unwirksam, wenn der nach dem Vertrag als feststehend zugrunde gelegte Sachverhalt nicht der Wirklichkeit entspricht und der Streit bei Kenntnis der Sachlage nicht entstanden wäre. Ein privatschriftlicher Vergleich ist kein Vollstreckungstitel; vollstreckbar sind der gerichtliche Vergleich, der Anwaltsvergleich nach § 796a ZPO und der notarielle Vergleich mit Unterwerfungsklausel (§ 794 Abs. 1 Nr. 5 ZPO).

Verzug mit dem Vergleichsbetrag richtet sich nach §§ 286, 288 BGB. Umsatzsteuerlich mindert ein reduzierter Rechnungsbetrag das Entgelt; der Leistende berichtigt die Umsatzsteuer und der Empfänger die Vorsteuer (§ 17 UStG). Ein außergerichtlicher Vergleich hemmt die Verjährung nicht; solange verhandelt wird, ist die Verjährung aber nach § 203 BGB gehemmt.`,
      },
      {
        titel: "Wann die Vergleichsvorlage nicht reicht",
        text: `Die Vorlage reicht für Streitigkeiten über Rechnungen, Projektabbrüche und Mängelrügen zwischen Unternehmen und mit Kunden, bei denen beide Seiten zahlungsfähig und einigungsbereit sind. Sie reicht nicht, wenn du einen vollstreckbaren Titel brauchst; dann schließt du den Vergleich über Anwälte nach § 796a ZPO, beim Notar oder vor Gericht.

Sie reicht auch nicht bei Streit mit Verbrauchern über Widerruf oder Gewährleistung, bei Ansprüchen aus Arbeitsverhältnissen oder bei Beträgen, deren Verlust das Unternehmen gefährdet. Wie Vergleichsbetrag, Forderungsausfall und Steuerkorrektur gebucht werden, klärst du mit dem Steuerberater. GründerX stellt die Vorlage als Werkzeug bereit und ersetzt keine Rechts- oder Steuerberatung.`,
      },
    ],
  text: `Vergleichsvereinbarung über eine streitige Forderung

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Gläubiger“ –

und

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Schuldner“ –

Vorbemerkung
(1) Der Gläubiger macht gegen den Schuldner eine Forderung in Höhe von [Betrag] EUR aus [Rechtsgrund, z. B. „Rechnung Nr. [Nummer] vom [Datum] über [Leistung]“ / „Vertrag vom [Datum]“] geltend.
(2) Der Schuldner bestreitet die Forderung [ganz / in Höhe von [Betrag] EUR] und beruft sich auf [z. B. „Mängel der Leistung“, „nicht beauftragte Mehrleistungen“, „überhöhte Stundenzahl“, „fehlende Abnahme“]. [Optional: Der Schuldner macht seinerseits Gegenansprüche in Höhe von [Betrag] EUR wegen [Grund] geltend.]
(3) [Optional: Der Gläubiger hat beim Amtsgericht [Ort] unter dem Aktenzeichen [Az.] einen Mahnbescheid beantragt / Klage erhoben.]
(4) Zur Vermeidung eines Rechtsstreits und ohne Anerkennung einer Rechtspflicht, jedoch im Wege gegenseitigen Nachgebens, schließen die Parteien folgenden Vergleich (§ 779 BGB):

§ 1 Vergleichsbetrag
Der Schuldner zahlt an den Gläubiger zur Abgeltung der in der Vorbemerkung bezeichneten Forderung einen Betrag von [Vergleichsbetrag] EUR (in Worten: [Betrag in Worten] Euro) [zuzüglich / einschließlich] Umsatzsteuer.

§ 2 Zahlung und Verfallklausel
(1) Der Vergleichsbetrag ist [bis zum [Datum] in einer Summe / in [Anzahl] Raten von je [Betrag] EUR, erstmals am [Datum], jeweils zum [Tag] eines Monats] auf das Konto des Gläubigers, IBAN [IBAN] bei der [Bank], Verwendungszweck „Vergleich [Rechnungsnummer]“, zu zahlen.
(2) Gerät der Schuldner mit der Zahlung [oder mit einer Rate] ganz oder teilweise länger als [z. B. 10] Tage in Rückstand, entfällt die Reduzierung nach § 1. Der Gläubiger kann dann die ursprüngliche Forderung in Höhe von [ursprünglicher Betrag] EUR nebst Verzugszinsen seit dem [Datum] abzüglich bereits geleisteter Zahlungen verlangen; die Erledigungswirkung nach § 3 entfällt.
(3) Verzugszinsen auf den Vergleichsbetrag richten sich nach § 288 BGB.

§ 3 Erledigung aller Ansprüche
(1) Mit vollständiger Zahlung des Vergleichsbetrags sind sämtliche gegenseitigen Ansprüche der Parteien aus [dem Vertrag vom [Datum] / der Geschäftsbeziehung bis zum [Datum] / dem in der Vorbemerkung bezeichneten Vorgang], gleich ob bekannt oder unbekannt, gleich aus welchem Rechtsgrund, abgegolten und erledigt. Das gilt auch für die in der Vorbemerkung genannten Gegenansprüche des Schuldners.
(2) Von der Erledigung ausgenommen sind: [z. B. „Gewährleistungsansprüche für Mängel, die erst nach Abschluss dieses Vergleichs auftreten“ / „die Verpflichtung zur Vertraulichkeit aus § [Nummer] des Vertrags“ / „Nutzungsrechte an den gelieferten Arbeitsergebnissen, die mit Zahlung des Vergleichsbetrags auf den Schuldner übergehen“ / „keine“].
(3) Die Parteien verzichten wechselseitig auf die Geltendmachung weitergehender Ansprüche aus dem in Absatz 1 bezeichneten Vorgang und nehmen den Verzicht jeweils an.
(4) Dieser Vergleich enthält kein Anerkenntnis einer Rechtspflicht. Keine Partei wird den Inhalt des Vergleichs gegenüber Dritten als Eingeständnis einer Pflichtverletzung darstellen.

§ 4 Umsatzsteuer und Rechnungskorrektur
Soweit sich durch diesen Vergleich das Entgelt für eine umsatzsteuerpflichtige Leistung mindert, stellt der Gläubiger dem Schuldner innerhalb von [z. B. 14] Tagen nach Abschluss dieses Vergleichs eine berichtigte Rechnung über den Vergleichsbetrag aus (§ 17 UStG). Der Schuldner berichtigt seinen Vorsteuerabzug entsprechend.

§ 5 Widerrufsvorbehalt
[Variante A: Jede Partei kann diesen Vergleich bis zum [Datum, z. B. 7 Tage nach Unterzeichnung] durch schriftliche Erklärung gegenüber der anderen Partei widerrufen. Maßgeblich ist der Zugang der Erklärung. Wird der Vergleich nicht fristgerecht widerrufen, ist er endgültig wirksam.]
[Variante B: Ein Widerrufsvorbehalt besteht nicht. Der Vergleich ist mit Unterzeichnung durch beide Parteien wirksam.]

§ 6 Kosten und laufende Verfahren
(1) Jede Partei trägt die ihr bisher entstandenen Kosten der Rechtsverfolgung und Rechtsverteidigung, insbesondere eigene Anwaltskosten, selbst. [Alternative: Der Schuldner erstattet dem Gläubiger die Kosten des Mahnverfahrens in Höhe von [Betrag] EUR zusammen mit dem Vergleichsbetrag.]
(2) [Optional: Der Gläubiger nimmt den Antrag auf Erlass eines Mahnbescheids / die Klage [Aktenzeichen] innerhalb von [z. B. 7] Tagen nach vollständigem Eingang des Vergleichsbetrags zurück. Die Gerichtskosten tragen die Parteien [je zur Hälfte / der Schuldner].]
(3) Die Kosten dieser Vereinbarung tragen die Parteien je zur Hälfte.

§ 7 Vertraulichkeit und Schlussbestimmungen
(1) Die Parteien behandeln Inhalt und Zustandekommen dieses Vergleichs vertraulich, soweit nicht gesetzliche Pflichten oder die Durchsetzung dieses Vergleichs eine Offenlegung erfordern.
(2) Änderungen und Ergänzungen dieser Vereinbarung bedürfen der Schriftform. Mündliche Nebenabreden bestehen nicht.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam. Die Parteien ersetzen die unwirksame Bestimmung durch eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Firma / Vorname Nachname], Gläubiger


______________________________
[Firma / Vorname Nachname], Schuldner

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
