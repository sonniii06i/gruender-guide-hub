// Inhalt der Vorlage „schuldanerkenntnis“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../finanzen.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du ein Schuldanerkenntnis brauchst",
        text: `Ein Schuldanerkenntnis brauchst du immer dann, wenn eine Forderung feststehen soll, bevor Zeit vergeht oder Erinnerungen verblassen. Typische Fälle für Gründer: Ein Kunde gibt am Telefon zu, dass er die Rechnung schuldet, zahlt aber nicht. Ein Geschäftspartner hat einen Schaden verursacht und will den Betrag anerkennen, um Streit zu vermeiden. Ein gescheitertes Projekt endet mit einer Rückzahlungspflicht, über die beide einig sind. Oder eine alte Forderung verjährt zum Jahresende, und du brauchst einen Neubeginn der Frist.

Das schriftliche Anerkenntnis macht aus einer bestreitbaren Behauptung eine Urkunde, die vor Gericht und im Mahnverfahren den Beweis erleichtert. Die Vorlage bietet beide Varianten, abstrakt und deklaratorisch, mit Fälligkeit, Ratenoption und Verzugsregel.`,
      },
      {
        titel: "Abstrakt oder deklaratorisch: Was muss ins Schuldanerkenntnis?",
        text: `Die wichtigste Entscheidung triffst du in § 2 der Vorlage. Beim abstrakten Schuldanerkenntnis (Variante A) entsteht eine neue, vom ursprünglichen Grund losgelöste Verpflichtung nach § 781 BGB; der Gläubiger muss den Grund später nicht mehr beweisen. Beim deklaratorischen Anerkenntnis (Variante B) bestätigt der Schuldner die bestehende Schuld und schneidet sich die Einwendungen ab, die er kannte. Daneben braucht jedes Schuldanerkenntnis:

- Schuldner und Gläubiger mit Anschrift, bei Firmen Handelsregister und vertretungsberechtigte Person
- Betrag in Zahlen und Worten sowie den Schuldgrund mit Rechnungsnummer, Vertragsdatum oder Schadensereignis (§ 1)
- Bisherige Zahlungen und den offenen Restbetrag (§ 1 Abs. 3)
- Fälligkeit, Konto und optional einen Ratenplan mit Verfallklausel (§ 3)
- Verzicht auf bekannte Einwendungen und Aufrechnungsverbot (§ 4)
- Verzug ohne Mahnung und Verzugszinsen nach § 288 BGB (§ 5)
- Hinweis auf Beweiswirkung, Verjährungsneubeginn und darauf, dass es kein Vollstreckungstitel ist (§ 6)
- Datum, Ort und die eigenhändige Unterschrift des Schuldners

Die Schriftform ist beim abstrakten Anerkenntnis gesetzlich vorgeschrieben; eine E-Mail reicht nicht.`,
      },
      {
        titel: "Schuldanerkenntnis Muster ausfüllen",
        text: `Trage in § 1 den Betrag und den genauen Grund ein; je präziser der Grund, desto weniger Angriffsfläche. Zieh bereits geleistete Zahlungen ab und schreib den Restbetrag hin, denn auf diesen bezieht sich das Anerkenntnis. In § 2 wählst du Variante A oder B und streichst die andere; im Zweifel ist Variante B für den Schuldner leichter zu akzeptieren und für den Gläubiger ausreichend. In § 3 setzt du die Fälligkeit ein, sofort oder zu einem Datum, und ergänzt bei Bedarf den Ratenplan.

In § 4 Abs. 2 lässt du den Schuldner erklären, ob er Gegenforderungen hat. In § 5 wählst du den Verzugszinssatz: fünf Prozentpunkte über Basiszins bei Verbrauchern, neun zwischen Unternehmern, dann auch mit der 40-EUR-Pauschale. Der Schuldner unterschreibt eigenhändig auf Papier; du bewahrst das Original auf und gibst ihm eine Abschrift, wie § 6 Abs. 5 vorsieht.`,
      },
      {
        titel: "Typische Fehler beim Schuldanerkenntnis",
        text: `Der häufigste Fehler ist das Anerkenntnis per E-Mail oder Messenger. Als abstraktes Anerkenntnis ist es formnichtig, als Beweismittel nur begrenzt brauchbar. Lass auf Papier unterschreiben, Scan nur als Kopie. Zweiter Fehler: Der Grund fehlt oder ist schwammig („aus Geschäftsbeziehung“). Beim deklaratorischen Anerkenntnis muss klar sein, welche Forderung bestätigt wird, sonst streitet ihr später darüber, was gemeint war.

Dritter Fehler: Der Gläubiger glaubt, er könne aus dem Anerkenntnis sofort vollstrecken. Das geht nur mit notarieller Unterwerfungsklausel; sonst brauchst du weiterhin Mahnbescheid oder Urteil. Vierter Fehler auf Schuldnerseite: Unterschreiben, ohne Rechnung und Vertrag vorher geprüft zu haben. Mit dem Anerkenntnis sind alle bekannten Einwendungen abgeschnitten, auch berechtigte Mängelrügen. Fünfter Fehler: zu lange warten. Verjährt die Forderung zum 31. Dezember, muss das Anerkenntnis vorher vorliegen.`,
      },
      {
        titel: "Rechtsgrundlagen: § 781 BGB, Verjährung und Vollstreckung",
        text: `Das abstrakte Schuldanerkenntnis regelt § 781 BGB und verlangt die schriftliche Erteilung; nur Kaufleute dürfen nach § 350 HGB formfrei anerkennen. Das deklaratorische Anerkenntnis ist gesetzlich nicht eigens geregelt, sondern ein Feststellungsvertrag, den die Rechtsprechung anerkennt. Beide Varianten lassen die Verjährung neu beginnen (§ 212 Abs. 1 Nr. 1 BGB), was bei der dreijährigen Regelverjährung (§ 195 BGB) oft der eigentliche Grund für das Dokument ist.

Beim abstrakten Anerkenntnis kann der Schuldner das Anerkenntnis nur über die ungerechtfertigte Bereicherung zurückfordern, wenn die Schuld nie bestand (§ 812 Abs. 2 BGB); die Beweislast trägt er. Verzug tritt bei einem Kalenderdatum ohne Mahnung ein (§ 286 Abs. 2 Nr. 1 BGB), Verzugszinsen regelt § 288 BGB. Ein Vollstreckungstitel wird das Anerkenntnis erst durch notarielle Beurkundung mit Unterwerfung unter die sofortige Zwangsvollstreckung (§ 794 Abs. 1 Nr. 5 ZPO).`,
      },
      {
        titel: "Wann das Schuldanerkenntnis nicht reicht",
        text: `Die Vorlage reicht für klare Forderungen zwischen Unternehmern und gegenüber Kunden, die ihre Schuld nicht bestreiten. Sie reicht nicht, wenn du sofort vollstrecken können willst; dann gehört der Text zum Notar. Sie reicht auch nicht, wenn die Forderung dem Grunde nach umstritten ist; dafür gibt es die Vergleichsvereinbarung.

Verbraucher, die ein Anerkenntnis mit Ratenplan und Zinsen unterschreiben sollen, können in den Anwendungsbereich des Verbraucherdarlehensrechts geraten; hier solltest du anwaltlichen Rat einholen. Steuerlich ist zu klären, ob und wann eine anerkannte Forderung wertberichtigt oder als Einnahme gebucht wird. GründerX liefert die Vorlage als Werkzeug, keine Rechts- oder Steuerberatung.`,
      },
    ],
  text: `Schuldanerkenntnis

Schuldner: [Firma / Vorname Nachname], [Straße, PLZ Ort], [geboren am [Datum] / Handelsregister [Amtsgericht, HRB-Nummer]]
– nachfolgend „Schuldner“ –

Gläubiger: [Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Gläubiger“ –

§ 1 Forderung und Schuldgrund
(1) Der Gläubiger hat gegen den Schuldner eine Forderung in Höhe von [Betrag] EUR (in Worten: [Betrag in Worten] Euro).
(2) Die Forderung beruht auf [genauer Grund, z. B. „Rechnung Nr. [Nummer] vom [Datum] über [Leistung]“ / „Darlehensvertrag vom [Datum]“ / „Schadensersatz wegen [Ereignis] vom [Datum]“ / „Rückzahlung der Anzahlung aus dem Vertrag vom [Datum]“].
(3) Auf die Forderung wurden bisher [Betrag] EUR gezahlt. [Alternative: Zahlungen auf die Forderung sind bisher nicht erfolgt.] Offen sind damit [Restbetrag] EUR zuzüglich der in § 5 bestimmten Zinsen.

§ 2 Anerkenntnis
[Variante A – abstraktes Schuldanerkenntnis:]
Der Schuldner erkennt hiermit an, dem Gläubiger den in § 1 bezeichneten Betrag von [Restbetrag] EUR zu schulden. Dieses Anerkenntnis begründet eine selbstständige, vom zugrunde liegenden Rechtsverhältnis unabhängige Verpflichtung im Sinne des § 781 BGB. Der Gläubiger kann aus diesem Anerkenntnis Zahlung verlangen, ohne den in § 1 Abs. 2 genannten Grund darlegen oder beweisen zu müssen.

[Variante B – deklaratorisches Schuldanerkenntnis:]
Der Schuldner bestätigt hiermit, dass die in § 1 bezeichnete Forderung des Gläubigers in Höhe von [Restbetrag] EUR dem Grunde und der Höhe nach besteht und fällig ist. Zweck dieses Anerkenntnisses ist es, die Forderung zwischen den Parteien verbindlich festzustellen und dem Streit oder der Ungewissheit darüber zu entziehen.

[Nicht gewählte Variante streichen.]

§ 3 Fälligkeit und Zahlung
(1) Der anerkannte Betrag ist [sofort / am [Datum]] zur Zahlung fällig.
(2) Die Zahlung erfolgt auf das Konto des Gläubigers, IBAN [IBAN] bei der [Bank], Verwendungszweck „[Rechnungsnummer / Aktenzeichen]“.
(3) [Optional: Der Gläubiger gestattet dem Schuldner die Zahlung in [Anzahl] Raten von je [Betrag] EUR, erstmals am [Datum], jeweils zum [Tag] eines Monats. Gerät der Schuldner mit zwei Raten ganz oder teilweise in Rückstand, wird der gesamte Restbetrag sofort fällig.]

§ 4 Verzicht auf Einwendungen und Einreden
(1) Der Schuldner verzichtet auf alle Einwendungen und Einreden gegen die anerkannte Forderung, die ihm bei Abgabe dieses Anerkenntnisses bekannt sind oder bekannt sein mussten. Hierzu gehören insbesondere Einwendungen gegen den Grund, die Höhe, die Fälligkeit und die ordnungsgemäße Erbringung der zugrunde liegenden Leistung.
(2) Der Schuldner erklärt, dass ihm Gegenforderungen gegen den Gläubiger nicht bekannt sind. [Alternative: Mit folgenden Gegenforderungen wird ausdrücklich nicht aufgerechnet: [Bezeichnung].] Eine Aufrechnung ist nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen zulässig.
(3) Die Rechte des Schuldners aus Anfechtung wegen Täuschung oder Drohung sowie [bei Variante A:] der Anspruch aus § 812 Abs. 2 BGB bleiben unberührt.

§ 5 Verzug
(1) Zahlt der Schuldner nicht bis zu dem in § 3 bestimmten Termin, gerät er ohne weitere Mahnung in Verzug (§ 286 Abs. 2 Nr. 1 BGB).
(2) Der offene Betrag ist ab Verzug mit [fünf Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 1 BGB) / neun Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB, nur zwischen Unternehmern)] zu verzinsen. [Zwischen Unternehmern: Hinzu kommt die Pauschale von 40 EUR nach § 288 Abs. 5 BGB.] Die Geltendmachung eines weiteren Verzugsschadens bleibt vorbehalten.

§ 6 Beweiswirkung, Verjährung und Schlussbestimmungen
(1) Den Parteien ist bekannt, dass dieses Anerkenntnis als Urkunde im Rechtsstreit und im gerichtlichen Mahnverfahren Beweis für das Bestehen und die Höhe der Forderung erbringt und dass mit ihm die Verjährung der Forderung neu beginnt (§ 212 Abs. 1 Nr. 1 BGB).
(2) Dieses Anerkenntnis ist kein Vollstreckungstitel. [Optional: Die Parteien beabsichtigen, das Anerkenntnis notariell beurkunden zu lassen und eine Unterwerfung unter die sofortige Zwangsvollstreckung nach § 794 Abs. 1 Nr. 5 ZPO aufzunehmen.]
(3) Änderungen bedürfen der Schriftform. Sollte eine Bestimmung unwirksam sein, bleibt das Anerkenntnis im Übrigen wirksam.
(4) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(5) Der Schuldner hat eine Abschrift dieses Anerkenntnisses erhalten.

[Ort], den [Datum]


______________________________
[Firma / Vorname Nachname], Schuldner
(eigenhändige Unterschrift)


Zur Kenntnis genommen und angenommen:

______________________________
[Firma / Vorname Nachname], Gläubiger

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
