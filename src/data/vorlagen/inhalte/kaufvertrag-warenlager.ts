// Inhalt der Vorlage „kaufvertrag-warenlager“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../kauf.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Kaufvertrag für Warenbestand oder Restposten brauchst",
        text: "Restposten sind für Händler und Online-Seller ein klassischer Einstieg: Ein Shop schließt und verkauft sein Lager, ein Hersteller räumt die Vorsaison, ein Insolvenzverwalter versilbert Bestände, ein Großhändler hat Überbestand. Du kaufst palettenweise zu einem Bruchteil des Einkaufspreises und verkaufst über Marktplätze, deinen Shop oder Outlet-Kanäle weiter. Umgekehrt stehst du als Verkäufer da, wenn du dein Sortiment wechselst oder dein Geschäft aufgibst.\n\nDie Vorlage regelt den Verkauf eines kompletten Bestands anhand einer Inventurliste, mit Stück- oder Pauschalpreis, gemeinsamer Zählung bei Übergabe und Rücknahmeausschluss. Entscheidend sind die Zusicherungen zu Herkunft, Markenrechten und Kennzeichnung, denn beim Weiterverkauf haftest du als Händler. Für laufende Lieferungen vom selben Lieferanten nimmst du den Rahmenliefervertrag, für Ware, die beim Händler Eigentum des Herstellers bleibt, den Kommissionsvertrag.",
      },
      {
        titel: "Was muss in einen Restposten-Kaufvertrag? Inventurliste, Preis, Zusicherungen",
        text: "Ohne genaue Liste weiß niemand, was verkauft wurde. Die Vorlage verlangt in Anlage 1 je Artikel Artikelnummer, EAN, Bezeichnung, Marke, Variante, Menge, Zustand, bei Lebensmitteln und Kosmetik Mindesthaltbarkeitsdatum und Charge, Verpackungseinheit und Stückpreis oder Einzelwert. Darüber hinaus gehören in den Vertrag:\n\n- Stichtag der Inventur und Entnahmeverbot bis zur Übergabe (§ 1 Abs. 2)\n- was nicht mitverkauft ist: Kommissionsware, Vorbehaltsware von Lieferanten, Displays (§ 1 Abs. 3)\n- Kaufpreis als Variante A Stückpreise oder Variante B Pauschale mit Toleranz, Umsatzsteuersatz, Anzahlung (§ 2)\n- Zustand, MHD-Restlaufzeit, Lagerbedingungen, keine Rückrufe, Kennzeichnung für den deutschen Markt (§ 3)\n- Originalware, EWR-Erschöpfung, bekannte Vertriebsbeschränkungen, keine entfernten Seriennummern (§ 4)\n- Übergabe, gemeinsame Zählung, Protokoll, Mengenabweichungen (§ 5)\n- verlängerter Eigentumsvorbehalt und Gefahrübergang (§ 6)\n- Gewährleistung, Rügepflicht, Rücknahmeausschluss, Folgen verletzter Herkunftszusicherung (§ 7)\n- Verantwortung für Kennzeichnung und Produktsicherheit ab Übergabe (§ 8)",
      },
      {
        titel: "Kaufvertrag Warenbestand ausfüllen: Stückpreis oder Pauschale wählen",
        text: "Beginne mit der Inventurliste, am besten als Export aus der Warenwirtschaft des Verkäufers, ergänzt um Zustand und MHD. Trage in der Vorbemerkung den Lagerort und den Grund des Verkaufs ein, in § 1 Abs. 2 das Datum der Liste und ob der Verkäufer bis zur Übergabe noch Bestellungen bedienen darf. Dann entscheidest du dich in § 2 für eine Variante und löschst die andere: Stückpreise, wenn die Mengen unsicher sind, Pauschale mit Toleranz in Prozent, wenn du den Bestand kennst. Prüfe den Umsatzsteuersatz: Bücher, viele Lebensmittel und einige Hygieneprodukte haben sieben Prozent, das kennzeichnest du in der Liste.\n\nIn § 3 Abs. 1 wählst du den Zustand (neu, ohne Originalverpackung, Retourenware, B-Ware) und trägst die MHD-Mindestlaufzeit ein. In § 4 Abs. 2 schreibt der Verkäufer auf, welche Vertriebsbeschränkungen der Hersteller ihm bekannt sind; die optionale Überlassung von Produktfotos behältst du nur, wenn er die Rechte daran hat. In § 5 legst du Abholung oder Lieferung, Palettenzahl und die Frist für eine Nachzählung fest, in § 7 Abs. 1 ob die Gewährleistung ausgeschlossen oder verkürzt ist. Bei der Übergabe zählt ihr gemeinsam und unterschreibt das Protokoll.",
      },
      {
        titel: "Typische Fehler beim Restpostenkauf und wie du sie vermeidest",
        text: "Erster Fehler: Markenware ohne Herkunftsnachweis kaufen. Wurde die Ware nicht vom Markeninhaber oder mit seiner Zustimmung im EWR in Verkehr gebracht, darfst du sie nicht verkaufen, egal wie günstig sie war; Abmahnung und Vernichtung drohen. Lass dir Einkaufsrechnungen zeigen, § 4 Abs. 1 gibt dir das Recht dazu. Zweiter Fehler: Produkte ohne deutsche Kennzeichnung. Elektronik ohne CE, Textilien ohne Materialangabe, Kosmetik ohne deutsche Inhaltsstoffliste musst du nachkennzeichnen oder darfst sie nicht in Verkehr bringen; die Vorlage lässt dich das in § 3 Abs. 4 regeln.\n\nDritter Fehler: Pauschalpreis ohne Toleranzklausel. Fehlen bei der Übergabe zehn Prozent, hast du ohne § 2 Variante B Satz 2 keinen Minderungsanspruch. Vierter Fehler: Rüge vergessen. Nach § 377 HGB musst du Fehlmengen und erkennbare Mängel innerhalb der vereinbarten Werktage anzeigen, sonst gilt die Ware als genehmigt. Fünfter Fehler: Retourenware als „neu“ einkaufen. Ungeprüfte Retouren enthalten Defekte und Fehlteile; der Preis muss das abbilden, und du darfst sie nicht als Neuware verkaufen.",
      },
      {
        titel: "Rechtliche Grundlagen: Erschöpfung, § 377 HGB, Produktsicherheit, Eigentumsvorbehalt",
        text: "Der Kauf eines Warenbestands ist ein Kauf beweglicher Sachen nach §§ 433 ff. BGB zwischen Unternehmern mit der Untersuchungs- und Rügepflicht des § 377 HGB. Unter Unternehmern lässt sich die Gewährleistung für Restposten weitgehend ausschließen, nicht aber für arglistig verschwiegene Mängel, zugesicherte Eigenschaften (§ 444 BGB), Vorsatz, grobe Fahrlässigkeit und Personenschäden. Die Zusicherungen zu Herkunft und Kennzeichnung sind deshalb als Beschaffenheitsvereinbarungen ausgestaltet, für die der Verkäufer trotz Ausschluss einsteht.\n\nMarkenrechtlich gilt die Erschöpfung nach § 24 MarkenG: Ware, die mit Zustimmung des Markeninhabers im Europäischen Wirtschaftsraum in Verkehr gebracht wurde, darf frei weiterverkauft werden; Importe aus Drittstaaten nicht. Vertriebsbindungen des Herstellers wirken nur gegenüber seinen Vertragshändlern. Beim Weiterverkauf bist du Händler im Sinne des Produktsicherheitsrechts und musst Kennzeichnung, Rückverfolgbarkeit und Verpackungs-, Elektro- und Batteriegesetz einhalten. Der verlängerte Eigentumsvorbehalt in § 6 erlaubt dir den Weiterverkauf vor vollständiger Zahlung, tritt aber die Erlösforderung an den Verkäufer ab. Bei Lebensmitteln gelten zusätzlich die Vorschriften zu Mindesthaltbarkeits- und Verbrauchsdatum.",
      },
      {
        titel: "Wann die Vorlage für Restposten nicht reicht",
        text: "Beim Kauf aus einer Insolvenz bestimmt der Verwalter den Vertrag; er verkauft ohne Gewährleistung und ohne Zusicherungen. Dann ersetzt deine eigene Besichtigung mit Stichproben und Fotodokumentation den § 3 und § 4, und du kalkulierst das Risiko in den Preis ein. Beim Import aus Drittstaaten kommen Zoll, Einfuhrumsatzsteuer und die Pflichten des Importeurs nach Produktsicherheitsrecht hinzu; dafür braucht der Vertrag Incoterms und Regeln zur Einfuhrabwicklung.\n\nBei Lebensmitteln, Kosmetik, Nahrungsergänzung, Spielzeug und Elektronik solltest du vor dem Kauf prüfen, ob du die Zulassungs- und Registrierungspflichten (LUCID, stiftung ear, Kosmetikportal CPNP, Rückverfolgbarkeit) selbst erfüllen kannst. Bei Markenware mit selektivem Vertriebssystem und bei größeren Beträgen lohnt die anwaltliche Prüfung der Lieferkette, weil die Freistellung in § 7 Abs. 5 nur so viel wert ist wie der Verkäufer zahlungsfähig. GründerX stellt Software und Muster bereit und ersetzt keine Rechtsberatung.",
      },
    ],
  text: `Kaufvertrag über einen Warenbestand (Restposten)

zwischen

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Verkäufer“ –

und

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Käufer“ –

Vorbemerkung
Beide Parteien handeln als Unternehmer. Der Verkäufer veräußert den in seinem Lager [Adresse] befindlichen Warenbestand [wegen Sortimentswechsel / Geschäftsaufgabe / Überbestand] an den Käufer, der die Ware im eigenen Namen weiterverkauft.

§ 1 Kaufgegenstand und Inventurliste
(1) Der Verkäufer verkauft dem Käufer den in Anlage 1 (Inventurliste) aufgeführten Warenbestand (nachfolgend „Ware“). Die Inventurliste enthält je Artikel: Artikelnummer, EAN/GTIN, Bezeichnung, Marke, Variante (Größe/Farbe), Menge, Zustand, [Mindesthaltbarkeitsdatum, Charge], Verpackungseinheit und [Stückpreis / Einzelwert].
(2) Stand der Inventurliste ist der [Datum]. Zwischen diesem Datum und der Übergabe darf der Verkäufer aus dem Bestand [nichts mehr entnehmen / nur noch bereits eingegangene Kundenbestellungen bedienen; Entnahmen werden in einer aktualisierten Liste bei Übergabe ausgewiesen].
(3) Nicht mitverkauft sind: [z. B. Kommissionsware Dritter, Ware unter Eigentumsvorbehalt von Lieferanten, Displays und Ladenausstattung, Ware mit Verbrauchsdatum].
(4) Der Käufer hat den Bestand am [Datum] besichtigt und Stichproben entnommen.

§ 2 Kaufpreis
[Variante A – Stückpreise]
(1) Der Kaufpreis bemisst sich nach den in Anlage 1 je Artikel vereinbarten Stückpreisen multipliziert mit der bei Übergabe tatsächlich gezählten Menge. Auf Basis der Inventurliste vom [Datum] beträgt der vorläufige Kaufpreis [Betrag] EUR netto.
[Variante B – Pauschalpreis]
(1) Der Kaufpreis für den gesamten Warenbestand gemäß Anlage 1 beträgt pauschal [Betrag] EUR netto. Weicht die bei Übergabe gezählte Gesamtmenge um mehr als [z. B. 3] % nach unten von der Inventurliste ab, mindert sich der Pauschalpreis im Verhältnis der Einzelwerte der fehlenden Artikel.
(2) Zum Kaufpreis kommt die gesetzliche Umsatzsteuer von derzeit 19 % [bzw. 7 % für die in Anlage 1 entsprechend gekennzeichneten Artikel]. Der Verkäufer stellt eine ordnungsgemäße Rechnung aus.
(3) Zahlung: [Betrag] EUR ([z. B. 30] %) als Anzahlung bei Vertragsschluss, der Restbetrag innerhalb von [z. B. 3] Werktagen nach gemeinsamer Zählung bei Übergabe, in jedem Fall vor Abtransport, per Überweisung auf [IBAN].
(4) Bei Zahlungsverzug gelten Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB).

§ 3 Zustand, Mindesthaltbarkeit und Kennzeichnung
(1) Die Ware ist [neu und originalverpackt / neu, teils ohne Originalverpackung / Retourenware, ungeprüft / B-Ware mit folgenden Einschränkungen: [Angabe]]. Der Zustand je Artikel ergibt sich aus Anlage 1.
(2) Bei Ware mit Mindesthaltbarkeitsdatum sichert der Verkäufer zu, dass das MHD bei Übergabe noch mindestens [z. B. 6] Monate läuft, soweit in Anlage 1 nichts Abweichendes angegeben ist. Ware mit kürzerem MHD ist in Anlage 1 gesondert ausgewiesen und mit abgesenktem Preis bewertet.
(3) Der Verkäufer sichert zu, dass die Ware ordnungsgemäß gelagert wurde ([trocken, lichtgeschützt, Temperatur [Bereich]]) und dass ihm keine Rückrufe, Sicherheitswarnungen oder behördlichen Verkaufsverbote für die Ware bekannt sind.
(4) Die Ware ist mit den für den Verkauf in Deutschland erforderlichen Kennzeichnungen versehen ([CE-Kennzeichnung, deutschsprachige Etiketten und Anleitungen, Lebensmittelkennzeichnung, Textilkennzeichnung, Herstellerangaben nach Produktsicherheitsverordnung]) [bzw.: Folgende Artikel sind nicht für den deutschen Markt gekennzeichnet: [Angabe]; der Käufer übernimmt die Nachkennzeichnung].

§ 4 Markenrechte und Weiterverkauf
(1) Der Verkäufer sichert zu, dass die Ware Originalware ist, vom jeweiligen Markeninhaber oder mit dessen Zustimmung im Europäischen Wirtschaftsraum in Verkehr gebracht wurde und keine Fälschungen, Plagiate oder Parallelimporte aus Drittstaaten enthält. Auf Verlangen legt der Verkäufer Einkaufsrechnungen oder Lieferantennachweise vor [in geschwärzter Form hinsichtlich der Preise].
(2) Dem Verkäufer sind [keine / folgende] vertraglichen Vertriebsbeschränkungen der Hersteller bekannt: [z. B. selektives Vertriebssystem der Marke [Marke], Verkaufsverbot auf Marktplätzen laut Händlervertrag]. Der Käufer ist nicht Partei solcher Vereinbarungen; er trägt jedoch das Risiko, dass Hersteller den Weiterverkauf beanstanden, soweit keine Zusicherung nach Absatz 1 verletzt ist.
(3) Seriennummern, Chargen und Herstellerkennzeichnungen sind unverändert. Der Käufer verpflichtet sich, diese nicht zu entfernen.
(4) Ein Recht zur Nutzung von Marken, Logos, Produktbildern und Texten des Verkäufers oder der Hersteller über das für den Weiterverkauf gesetzlich Zulässige hinaus wird nicht eingeräumt. [Optional: Der Verkäufer überlässt dem Käufer seine Produktfotos und Beschreibungstexte für die in Anlage 1 genannten Artikel zur Nutzung im Weiterverkauf; er versichert, dass er hieran die erforderlichen Rechte hat.]

§ 5 Lieferung, Übergabe und Mengenabweichungen
(1) Die Übergabe erfolgt [ab Lager des Verkäufers, Abholung durch den Käufer am [Datum] / durch Lieferung an [Adresse] bis zum [Datum] auf Kosten des [Käufers / Verkäufers]]. Die Ware wird auf [Anzahl] Paletten gestapelt und [folienumwickelt] bereitgestellt.
(2) Bei Übergabe zählen beide Parteien die Ware gemeinsam anhand der Anlage 1 und halten das Ergebnis in einem Übergabeprotokoll fest. Das Protokoll ist Grundlage der Endabrechnung nach § 2.
(3) Ist eine gemeinsame Zählung nicht möglich, zählt der Käufer innerhalb von [z. B. 5] Werktagen nach Erhalt und teilt Abweichungen in Textform mit. Unterbleibt die Mitteilung, gilt die Menge laut Anlage 1 als geliefert.
(4) Teillieferungen sind [zulässig / nicht zulässig].

§ 6 Eigentumsvorbehalt und Gefahrübergang
(1) Die Ware bleibt bis zur vollständigen Zahlung des Kaufpreises Eigentum des Verkäufers. Der Käufer darf die Vorbehaltsware im ordnungsgemäßen Geschäftsgang weiterverkaufen; er tritt die daraus entstehenden Forderungen in Höhe des offenen Kaufpreises bereits jetzt an den Verkäufer ab, der die Abtretung annimmt.
(2) Die Gefahr geht mit Übergabe an den Käufer bzw. an den von ihm beauftragten Transporteur über, bei Lieferung durch den Verkäufer mit Ablieferung.

§ 7 Gewährleistung, Rügepflicht und Rücknahmeausschluss
(1) Der Verkäufer gewährleistet die in §§ 3 und 4 abgegebenen Zusicherungen. Im Übrigen wird die Ware [als Restposten unter Ausschluss der Gewährleistung für Sachmängel verkauft / mit einer auf [z. B. 6] Monate ab Übergabe verkürzten Gewährleistung verkauft].
(2) Der Käufer hat die Ware unverzüglich nach Übergabe zu untersuchen und erkennbare Mängel und Fehlmengen innerhalb von [z. B. 5] Werktagen, verdeckte Mängel unverzüglich nach Entdeckung in Textform zu rügen (§ 377 HGB). Andernfalls gilt die Ware als genehmigt.
(3) Eine Rücknahme nicht verkaufter, nicht benötigter oder nicht absetzbarer Ware ist ausgeschlossen. Das Absatzrisiko trägt der Käufer.
(4) Der Ausschluss bzw. die Verkürzung gilt nicht für arglistig verschwiegene Mängel, bei Vorsatz oder grober Fahrlässigkeit sowie für Schäden aus der Verletzung von Leben, Körper oder Gesundheit.
(5) Verletzt der Verkäufer die Zusicherung nach § 4 Abs. 1 (Originalware, Erschöpfung), kann der Käufer die betroffenen Artikel gegen Erstattung des anteiligen Kaufpreises zurückgeben und Ersatz der ihm nachweislich entstandenen Kosten aus Abmahnungen oder Rückrufen verlangen, soweit er den Verkäufer unverzüglich informiert und ihm die Abwehr überlassen hat.

§ 8 Haftung
(1) Beide Parteien haften unbeschränkt für Vorsatz, grobe Fahrlässigkeit, Schäden aus der Verletzung von Leben, Körper oder Gesundheit sowie nach dem Produkthaftungsgesetz.
(2) Im Übrigen ist die Haftung für leichte Fahrlässigkeit auf den vertragstypischen, vorhersehbaren Schaden begrenzt, höchstens auf den Netto-Kaufpreis. Die Haftung für entgangenen Gewinn ist insoweit ausgeschlossen.
(3) Für die Einhaltung der Vorschriften beim Weiterverkauf (Kennzeichnung, Produktsicherheit, Verpackungsgesetz, Elektrogesetz, Batteriegesetz, Preisangaben, Verbraucherrechte) ist ab Übergabe der Käufer verantwortlich; er stellt den Verkäufer von Ansprüchen Dritter aus seinem Weiterverkauf frei, soweit keine Zusicherung des Verkäufers verletzt ist.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], soweit beide Parteien Kaufleute sind.
(4) Anlage 1 (Inventurliste) und das Übergabeprotokoll sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Firma Verkäufer], vertreten durch [Vorname Nachname]


______________________________
[Firma Käufer], vertreten durch [Vorname Nachname]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
