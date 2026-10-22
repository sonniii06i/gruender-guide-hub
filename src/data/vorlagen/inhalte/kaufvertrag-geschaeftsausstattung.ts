// Inhalt der Vorlage „kaufvertrag-geschaeftsausstattung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../kauf.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Kaufvertrag für Inventar und Büroausstattung brauchst",
        text: "Ein Büro schließt, ein Café gibt auf, eine Agentur zieht in kleinere Räume: In solchen Momenten wechseln Schreibtische, Monitore, Küchengeräte und Ladeneinrichtung als Paket den Eigentümer. Für Gründer ist das eine günstige Erstausstattung, für den Verkäufer eine schnelle Lösung, weil die Räume oft zu einem festen Datum besenrein zurückgegeben werden müssen.\n\nDiese Vorlage regelt genau diesen Paketkauf: viele Einzelteile, ein Pauschalpreis, gekauft wie besichtigt, Abholung durch den Käufer. Typische Fälle sind die Übernahme der Einrichtung vom Vormieter, der Kauf der kompletten IT eines aufgelösten Teams oder der Verkauf deines eigenen Inventars an einen Nachfolger. Für einzelne hochwertige Geräte mit Gewährleistung passt der B2B-Kaufvertrag besser, für Maschinen mit Probelauf der Maschinenkaufvertrag und für einen ganzen Betrieb mit Mitarbeitern der Unternehmenskaufvertrag.",
      },
      {
        titel: "Was muss in einen Inventar-Kaufvertrag? Pflichtinhalte und Inventarliste",
        text: "Herzstück ist die Inventarliste in Anlage 1. Ohne sie weiß später niemand, ob der Bürostuhl Nummer sieben zum Pauschalpreis gehörte. Die Vorlage verlangt je Position Stückzahl, Bezeichnung, Hersteller und Modell, Seriennummer bei IT, Standort, Zustand und Einzelwert. Darüber hinaus müssen geregelt sein:\n\n- was ausgenommen ist, insbesondere Leasing- und Mietgeräte sowie fest verbundene Einbauten (§ 1)\n- Pauschalpreis netto und brutto, Anzahlung und Restzahlung, Rechnung nach § 14 UStG (§ 2)\n- Besichtigung und Kauf wie besichtigt mit Offenlegung versteckter Mängel (§ 3)\n- Übergabetermin, Demontage, Abholung, Schäden an den Räumen, Frist wegen Mietvertragsende (§ 4)\n- Eigentumsvorbehalt und Gefahrübergang ab Übergabe oder Demontagebeginn (§ 5)\n- Zusicherung des Eigentums, Software-Lizenzen, Datenlöschung, Entfernen von Logos (§ 6)\n- Gewährleistungsausschluss mit Ausnahmen und Haftungsobergrenze (§ 7)\n\nDie Einzelwerte in der Liste sind keine Einzelkaufpreise, aber sie bestimmen die Minderung, wenn bei der Abholung etwas fehlt, und sie helfen beim Buchen der Anlagegüter.",
      },
      {
        titel: "Inventar-Kaufvertrag Muster ausfüllen: Schritt für Schritt",
        text: "Beginne nicht mit dem Vertrag, sondern mit der Liste. Geh gemeinsam durch die Räume, fotografiere jede Position und trage sie in Anlage 1 ein: Raum, Stückzahl, Bezeichnung, Seriennummer, Zustand, Einzelwert. Markiere Leasinggeräte als „ausgenommen“. Erst dann füllst du den Vertrag aus. In der Vorbemerkung trägst du Adresse und Auszugsdatum ein, in § 1 Abs. 3 entscheidest du, ob Einbauten wie Theke oder Trennwände mitverkauft werden; dazu brauchst du die Zustimmung des Vermieters.\n\nIn § 2 setzt du den Pauschalpreis netto und brutto ein, die Anzahlung und die Fälligkeit des Rests. In § 3 kommen Besichtigungsdatum und die bekannten versteckten Mängel, etwa ein lauter Kühlschrankkompressor oder eine defekte Gasfeder. In § 4 legst du Übergabetermin, Abholfrist und die Verantwortung für Bohrlöcher fest; die Alternative, dass der Verkäufer demontiert, wählst du nur, wenn das wirklich so vereinbart ist. In § 6 Abs. 2 notierst du in der Liste, welche Software-Lizenzen übertragbar sind, und in Abs. 4, wer Logos entfernt. Bei der Übergabe hakt ihr die Liste gemeinsam ab und unterschreibt sie.",
      },
      {
        titel: "Typische Fehler bei Inventarübernahme und wie du sie vermeidest",
        text: "Erster Fehler: Der Verkäufer verkauft, was ihm nicht gehört. Multifunktionsdrucker, Kaffeevollautomaten und Telefonanlagen sind oft geleast; der Leasinggeber holt sie ab, und der Käufer hat dafür bezahlt. Lass dir in § 6 das Eigentum zusichern und frag nach den Leasingverträgen. Zweiter Fehler: Software gilt als mitgekauft. Microsoft-365-Abos, Volumenlizenzen und Adobe-Konten sind personengebunden; nur Lizenzen mit übertragbarem Schlüssel wechseln. Dritter Fehler: Datenträger mit Firmendaten übergeben. Der Verkäufer muss vor Übergabe löschen und Geräte aus Verwaltungssystemen (MDM) und Konten entfernen, sonst sind Notebooks gesperrt und der Datenschutz ist verletzt.\n\nVierter Fehler: keine Frist für die Abholung. Endet der Mietvertrag des Verkäufers, steht das Inventar plötzlich auf dem Gehweg oder wird kostenpflichtig eingelagert; § 4 Abs. 4 regelt das, nur ausfüllen musst du es. Und schließlich: Einzelwerte weglassen. Dann lässt sich bei fehlenden Positionen nichts mindern, und der Steuerberater kann die Anlagegüter nicht einzeln aktivieren.",
      },
      {
        titel: "Rechtliche Grundlagen: Gewährleistung, Gefahrübergang, Umsatzsteuer beim Inventarkauf",
        text: "Der Inventarkauf ist ein Kauf beweglicher Sachen nach §§ 433 ff. BGB zwischen Unternehmern. Die Klausel „gekauft wie besichtigt“ ist eine Beschaffenheitsvereinbarung: Der Käufer akzeptiert den bei der Besichtigung erkennbaren Zustand. Darüber hinaus darf die Gewährleistung für gebrauchtes Inventar unter Unternehmern weitgehend ausgeschlossen werden; nicht ausschließbar bleiben nach § 444 BGB arglistig verschwiegene Mängel und zugesicherte Eigenschaften sowie Vorsatz, grobe Fahrlässigkeit und Personenschäden.\n\nDie Gefahr geht nach § 446 BGB mit Übergabe über; die Vorlage zieht sie auf den Beginn der Demontage vor, weil der Käufer ab dann die Kontrolle hat. Der Eigentumsvorbehalt nach § 449 BGB sichert den Verkäufer bis zur Restzahlung. Fest mit dem Gebäude verbundene Einbauten können nach §§ 93 ff. BGB wesentliche Bestandteile des Gebäudes sein und dem Vermieter gehören; deshalb braucht ihr dessen Zustimmung. Umsatzsteuerlich ist der Verkauf aus dem Betriebsvermögen steuerpflichtig. Wird ein kompletter Betrieb mit allen wesentlichen Grundlagen übertragen, kann eine nicht steuerbare Geschäftsveräußerung im Ganzen nach § 1 Abs. 1a UStG vorliegen; das klärt der Steuerberater vorher.",
      },
      {
        titel: "Wann die Vorlage nicht reicht: Betrieb, Vermieter, Insolvenz",
        text: "Übernimmst du mit dem Inventar auch Kunden, Verträge oder Mitarbeiter, ist das kein Inventarkauf mehr, sondern ein Betriebsübergang. Dann greifen § 613a BGB für die Arbeitsverhältnisse und § 25 HGB für Altverbindlichkeiten bei Firmenfortführung; dafür gibt es den Unternehmenskaufvertrag als Asset Deal. Sollen die Räume gleich mit übernommen werden, brauchst du zusätzlich einen neuen Mietvertrag oder den Eintritt in den bestehenden mit Zustimmung des Vermieters; Einbauten regelt ihr am besten zu dritt.\n\nKaufst du aus einer Insolvenz, verkauft der Insolvenzverwalter unter vollständigem Gewährleistungsausschluss und oft ohne Zusicherung des Eigentums; prüfe dann selbst, ob Leasing- oder Vorbehaltsware dabei ist. Bei Inventar mit Prüfpflichten, etwa Gastronomieküchen, Aufzügen oder elektrischen Betriebsmitteln, musst du als neuer Betreiber eigene Prüfungen organisieren; die Vorlage schließt die Haftung des Verkäufers dafür aus. GründerX liefert Software und Muster, keine Rechts- oder Steuerberatung.",
      },
    ],
  text: `Kaufvertrag über Geschäftsausstattung und Inventar

zwischen

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Verkäufer“ –

und

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Käufer“ –

Vorbemerkung
Der Verkäufer gibt seine Geschäftsräume in [Adresse] zum [Datum] auf / verlegt seinen Betrieb und veräußert die dort befindliche Geschäftsausstattung. Beide Parteien handeln als Unternehmer.

§ 1 Kaufgegenstand
(1) Der Verkäufer verkauft dem Käufer die in Anlage 1 (Inventarliste) aufgeführten Gegenstände (nachfolgend „Inventar“). Die Inventarliste enthält je Position Stückzahl, Bezeichnung, Hersteller/Modell, Seriennummer (bei IT und Geräten), Standort, Zustand und Einzelwert.
(2) Nicht mitverkauft sind die in Anlage 1 als „ausgenommen“ gekennzeichneten Gegenstände sowie alle Gegenstände, die nicht im Eigentum des Verkäufers stehen (insbesondere Leasing- und Mietgeräte).
(3) Fest mit dem Gebäude verbundene Einbauten (z. B. [Theke, Einbauküche, Trennwände, Beleuchtungsanlage]) werden [mitverkauft, soweit sie in Anlage 1 aufgeführt sind und der Vermieter dem Verbleib bzw. Ausbau zugestimmt hat / nicht mitverkauft].

§ 2 Pauschalpreis und Zahlung
(1) Der Kaufpreis für das gesamte Inventar beträgt pauschal [Betrag] EUR netto zuzüglich 19 % Umsatzsteuer, gesamt [Betrag] EUR brutto. Die in Anlage 1 angegebenen Einzelwerte dienen der Aufteilung bei Fehlmengen (§ 4 Abs. 5) und der buchhalterischen Zuordnung; sie sind keine Einzelkaufpreise.
(2) Der Kaufpreis ist wie folgt fällig: [Betrag] EUR bei Vertragsschluss als Anzahlung, der Restbetrag von [Betrag] EUR spätestens [bei Übergabe / bis zum [Datum]] per Überweisung auf [IBAN].
(3) Der Verkäufer stellt eine ordnungsgemäße Rechnung im Sinne des § 14 UStG aus.
(4) Bei Zahlungsverzug gelten die gesetzlichen Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB).

§ 3 Zustand – gekauft wie besichtigt
(1) Das Inventar ist gebraucht. Der Käufer hat es am [Datum] in den Räumen [Adresse] vollständig besichtigt und, soweit möglich, in Betrieb genommen.
(2) Das Inventar wird „gekauft wie besichtigt“ verkauft. Der Käufer übernimmt es in dem bei der Besichtigung vorgefundenen Zustand mit allen sichtbaren und bei der Besichtigung erkennbaren Gebrauchsspuren und Mängeln.
(3) Der Verkäufer hat folgende ihm bekannte, nicht ohne Weiteres erkennbare Mängel offengelegt: [z. B. Server-Festplatte 2 meldet SMART-Fehler, Kühlschrank Kompressor laut, Bürostuhl Nr. 7 Gasfeder defekt].
(4) Der Käufer kauft das Inventar insgesamt; die Übernahme einzelner Positionen unter Ablehnung anderer ist ausgeschlossen.

§ 4 Übergabe, Demontage und Abholung
(1) Die Übergabe erfolgt am [Datum] ab [Uhrzeit] in [Adresse]. Der Verkäufer stellt den Zugang zu den Räumen und zur Laderampe/zum Lastenaufzug sicher.
(2) Die Demontage, Verpackung, Verladung und der Transport sind Sache des Käufers und erfolgen auf seine Kosten und Gefahr. [Alternative: Der Verkäufer demontiert die Einbauten und stellt das Inventar transportfertig im Erdgeschoss bereit.]
(3) Der Käufer hat die Räume des Verkäufers bei Demontage und Abholung sorgfältig zu behandeln. Schäden an Wänden, Böden, Türen und Installationen, die durch die Abholung entstehen, ersetzt der Käufer. Bohrlöcher und Dübel sind [vom Käufer fachgerecht zu verschließen / Sache des Verkäufers].
(4) Die Abholung muss bis spätestens [Datum] abgeschlossen sein, weil der Mietvertrag des Verkäufers zu diesem Datum endet. Nicht abgeholtes Inventar darf der Verkäufer nach vorheriger Ankündigung per E-Mail mit einer Frist von [z. B. 5] Werktagen auf Kosten des Käufers einlagern oder entsorgen.
(5) Bei Übergabe prüfen beide Parteien die Vollständigkeit anhand der Anlage 1 und zeichnen die Liste ab. Fehlt eine Position oder ist sie seit der Besichtigung beschädigt worden, mindert sich der Pauschalpreis um den in Anlage 1 angegebenen Einzelwert. Weitergehende Ansprüche bestehen insoweit nicht.

§ 5 Eigentumsvorbehalt und Gefahrübergang
(1) Das Inventar bleibt bis zur vollständigen Zahlung des Kaufpreises Eigentum des Verkäufers.
(2) Die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung geht mit der Übergabe, spätestens mit Beginn der Demontage durch den Käufer, auf den Käufer über.
(3) Der Käufer darf das Inventar vor vollständiger Zahlung nicht weiterveräußern oder verpfänden.

§ 6 Rechte Dritter, Software und Daten
(1) Der Verkäufer sichert zu, dass er Eigentümer aller in Anlage 1 aufgeführten Gegenstände ist und diese frei von Rechten Dritter sind, insbesondere nicht geleast, gemietet, sicherungsübereignet oder unter Eigentumsvorbehalt gekauft sind. Für Positionen, bei denen dies nicht gilt, ist dies in Anlage 1 vermerkt.
(2) Auf IT-Geräten installierte Software ist nur mitverkauft, soweit die Lizenz übertragbar ist und in Anlage 1 mit Lizenzschlüssel bzw. Lizenznachweis aufgeführt ist. Nicht übertragbare Lizenzen (insbesondere Abonnements und Volumenlizenzen) werden vom Verkäufer vor Übergabe entfernt.
(3) Der Verkäufer löscht vor Übergabe sämtliche auf Datenträgern gespeicherten Daten nach dem Stand der Technik (z. B. Werksreset, Überschreiben) und trennt die Geräte von Konten, Mobilfunkverträgen und Verwaltungssystemen (MDM). Der Käufer ist nicht berechtigt, dennoch verbliebene Daten zu nutzen, und löscht sie unverzüglich.
(4) Firmenschilder, Logos und Beschriftungen des Verkäufers entfernt [der Verkäufer vor Übergabe / der Käufer vor Nutzung]. Ein Recht zur Nutzung der Marken und Kennzeichen des Verkäufers wird nicht eingeräumt.

§ 7 Gewährleistung und Haftung
(1) Die Gewährleistung für Sachmängel des gebrauchten Inventars ist ausgeschlossen, soweit in diesem Vertrag nichts anderes bestimmt ist.
(2) Der Ausschluss gilt nicht für die Zusicherungen in § 6 Abs. 1, für arglistig verschwiegene Mängel, für Ansprüche aus der Verletzung von Leben, Körper oder Gesundheit sowie bei Vorsatz oder grober Fahrlässigkeit.
(3) Der Verkäufer haftet nicht für die Eignung des Inventars für die Zwecke des Käufers, für Energieverbrauch, Sicherheitszertifizierungen oder die Vereinbarkeit mit den Räumen des Käufers.
(4) Im Übrigen ist die Haftung beider Parteien für leichte Fahrlässigkeit auf den vertragstypischen, vorhersehbaren Schaden, höchstens auf den Netto-Kaufpreis, begrenzt.

§ 8 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], soweit beide Parteien Kaufleute sind.
(4) Anlage 1 (Inventarliste) ist Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Firma Verkäufer], vertreten durch [Vorname Nachname]


______________________________
[Firma Käufer], vertreten durch [Vorname Nachname]


Anlage 1 – Inventarliste (Muster)
Nr. | Stück | Bezeichnung / Hersteller / Modell | Seriennummer | Standort | Zustand | Einzelwert EUR | Bemerkung
1 | [Anzahl] | [z. B. Schreibtisch 160x80, weiß] | – | [Raum 1] | [gut] | [Betrag] | –
2 | [Anzahl] | [z. B. Notebook, Hersteller, Modell] | [Seriennummer] | [Raum 2] | [gebraucht, Akku 80 %] | [Betrag] | [Lizenz übertragbar: ja/nein]
3 | [Anzahl] | [z. B. Multifunktionsdrucker] | [Seriennummer] | [Flur] | – | – | ausgenommen (Leasing)
[weitere Positionen]
Summe Einzelwerte: [Betrag] EUR (Pauschalpreis gemäß § 2: [Betrag] EUR)

Bei Übergabe geprüft am [Datum]:        ______________________________        ______________________________
                                         Verkäufer                              Käufer

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
