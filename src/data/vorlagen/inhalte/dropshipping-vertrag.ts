// Inhalt der Vorlage „dropshipping-vertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../ecommerce.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Dropshipping Vertrag brauchst",
        text: `Beim Dropshipping verkaufst du Ware, die du nie selbst in der Hand hast: Der Kunde bestellt bei dir, du gibst die Bestellung an den Lieferanten weiter, und der versendet direkt an den Kunden. Rechtlich bist du trotzdem der Verkäufer mit allen Pflichten aus Widerruf, Gewährleistung und Lieferzeit. Was du davon beim Lieferanten zurückholen kannst, regelt allein der Vertrag zwischen euch.

Du brauchst diese Vorlage, sobald du mit einem Hersteller oder Großhändler im Streckengeschäft zusammenarbeitest und bisher nur dessen AGB oder eine E-Mail-Absprache gelten. Sie passt auch, wenn du selbst Lieferant bist und Händlern ein klares Dropshipping-Angebot machen willst. Die Vorlage setzt einen Lieferanten mit Sitz in der EU voraus; bei Lieferanten aus Drittländern wie China kommen Zoll, Einfuhrumsatzsteuer und Importeurspflichten dazu, die hier nicht geregelt sind.`,
      },
      {
        titel: "Das muss in einem Dropshipping Vertrag stehen",
        text: `Die Vorlage folgt dem Ablauf einer Bestellung vom Shop bis zur Retoure und regelt in zwölf Paragrafen:

- die Rollen: du als alleiniger Verkäufer gegenüber dem Endkunden, der Lieferant als Versender (§ 1)
- Produktliste, Produktdaten mit EAN, Bildern, Herstellerangaben und Nutzungsrechte daran (§ 2)
- Einkaufspreise, Versandpauschalen, Rechnungsstellung und deine freie Preisgestaltung (§ 3)
- Bestellübermittlung, Bestätigungsfrist, Bestandsdaten und Cut-off-Zeit für den Versand (§ 4)
- neutraler Versand in deinem Namen ohne Werbung des Lieferanten (§ 5)
- Lieferzeiten, Meldepflicht bei Verzug und Kündigungsrecht bei wiederholter Überschreitung (§ 6)
- Retouren, Widerruf des Endkunden, Gewährleistung und Rückgriff nach §§ 445a, 445b BGB (§ 7)
- Produktsicherheit, GPSR-Angaben, Konformitätsunterlagen, Verpackungsregistrierung, Freistellung (§ 8)
- Datenschutz, Nutzungsbeschränkung der Kundendaten und AVV als Anlage (§ 9)
- Marken, Geheimhaltung, Kundenschutz und optional Exklusivität (§ 10)
- Laufzeit, Kündigung und Abwicklung nach Vertragsende (§ 11)

Jede dieser Klauseln schließt eine Lücke, in der sonst du allein das Risiko trägst.`,
      },
      {
        titel: "Dropshipping Vertrag Muster ausfüllen",
        text: `Beginne mit den Parteien und deinen Verkaufskanälen in § 1; nenne Shop, Domain und Marktplätze, auf denen der Lieferant deine Bestellungen erwarten darf. Entscheide, ob du eine Mindestabnahme akzeptierst oder die Variante ohne Verpflichtung nimmst. In § 2 trägst du die Ankündigungsfristen für Sortimentsänderungen ein und legst fest, wie Produktdaten geliefert werden, etwa als CSV-Feed oder über eine Schnittstelle.

In § 3 kommen Versandpauschale, Rechnungsrhythmus und Zahlungsziel hinein. § 4 braucht den Übermittlungsweg der Bestellungen, die Bestätigungsfrist in Stunden, den Takt der Bestandsdaten und die Uhrzeit, bis zu der Bestellungen noch am selben Tag versendet werden. In § 5 trägst du deine Absenderadresse, die Retourenadresse und die Paketdienste ein, in § 6 die Lieferzeit, die du dann auch im Shop versprechen darfst.

Bei § 7 legst du fest, ob Retouren eine Bearbeitungspauschale kosten und ob Hinsendekosten erstattet werden. In § 8 forderst du die Deckungssumme der Produkthaftpflicht und klärst, wer die Verpackungsregistrierung trägt. § 9 nennt die Löschfrist für Kundendaten, § 11 Beginn, Kündigungsfrist und die Frist zum Entfernen der Produkte aus deinen Kanälen.`,
      },
      {
        titel: "Typische Fehler beim Dropshipping und wie der Vertrag sie abfängt",
        text: `Der häufigste Fehler ist der Glaube, der Lieferant sei für Lieferzeit und Mängel zuständig. Gegenüber dem Kunden bist das immer du. Versprichst du im Shop drei Werktage und der Lieferant braucht zehn, haftest du für den Verzug; deshalb müssen die Lieferzeit in § 6 und die Bestandsdaten in § 4 vertraglich abgesichert sein. Wer ohne Echtzeitbestand arbeitet, verkauft Ware, die es nicht gibt.

Zweiter Fehler: Pakete, in denen Rechnung und Werbung des Lieferanten liegen. Der Kunde bestellt beim nächsten Mal direkt dort. § 5 schließt das aus. Dritter Fehler: fehlende Herstellerangaben und Sicherheitshinweise. Seit der GPSR darfst du ein Produkt ohne diese Daten nicht anbieten, und der Lieferant muss sie dir liefern können. Dazu kommen die Umsatzsteuer beim Reihengeschäft, die bei Auslandslieferungen eine Registrierung im OSS-Verfahren auslösen kann, und die Weitergabe von Kundendaten ohne AVV und ohne Hinweis in der Datenschutzerklärung. Jeder dieser Punkte hat in der Vorlage eine eigene Klausel.`,
      },
      {
        titel: "Rechtliche Grundlagen für Dropshipping-Verträge",
        text: `Der Vertrag zwischen dir und dem Lieferanten ist ein Kaufvertrag unter Kaufleuten mit Elementen eines Rahmenvertrags. Es gelten die §§ 433 ff. BGB zum Kauf und die §§ 434 ff. BGB zur Gewährleistung; der Rückgriff des Händlers beim Lieferanten für Kosten aus Verbraucherreklamationen folgt aus den §§ 445a und 445b BGB. Unter Kaufleuten gilt die Untersuchungs- und Rügepflicht des § 377 HGB, die die Vorlage an die Besonderheit anpasst, dass du die Ware nie siehst.

Gegenüber deinem Endkunden gelten die Fernabsatzregeln der §§ 312c ff. BGB, das Widerrufsrecht der §§ 355 ff. BGB und der Gefahrübergang beim Verbrauchsgüterkauf nach § 475 Abs. 2 BGB. Für die Produktsicherheit sind die Verordnung (EU) 2023/988 (GPSR) und das Produkthaftungsgesetz maßgeblich; bei Drittlandware wirst du oft selbst Importeur. Die Weitergabe von Kundendaten richtet sich nach Art. 28 DSGVO. Verpackungsgesetz und Elektrogesetz regeln, wer registriert sein muss.`,
      },
      {
        titel: "Wann die Dropshipping Vorlage nicht reicht",
        text: `Die Vorlage ist auf EU-Lieferanten und Standardware ausgelegt. Sie reicht nicht, wenn der Lieferant in China oder einem anderen Drittland sitzt: Dann musst du Zollabwicklung, Einfuhrumsatzsteuer, die Rolle als Importeur, die verantwortliche Person in der EU nach GPSR und oft die CE-Konformität selbst verantworten. Auch Plattformen wie Shopify-Apps oder Marktplätze mit eigenen Dropshipping-Regeln setzen zusätzliche Bedingungen, die der Vertrag nicht ersetzt.

Bei regulierten Waren wie Lebensmitteln, Kosmetik, Elektronik mit Funk oder Spielzeug, bei Exklusivvereinbarungen über mehrere Länder und bei hohem Volumen lohnt sich die anwaltliche Prüfung, und die Umsatzsteuer im Reihengeschäft klärst du mit dem Steuerberater, bevor du ins EU-Ausland verkaufst. GründerX ist Software und keine Rechtsberatung. Die Vorlage gibt dir einen vollständigen Rahmen, den du Punkt für Punkt mit deinem Lieferanten abstimmst; unterschreibe nichts, was der Lieferant operativ nicht leisten kann.`,
      },
    ],
  text: `Dropshipping-Vertrag

zwischen

[Firma des Händlers], [Straße Hausnummer], [PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Händler“ –

und

[Firma des Lieferanten], [Straße Hausnummer], [PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Lieferant“ –

– gemeinsam „die Parteien“ –

§ 1 Gegenstand und Rollen der Parteien
(1) Der Händler betreibt den Online-Shop [Shopname] unter [www.domain.de] [sowie Verkaufskanäle auf [Marktplätze]] und verkauft dort im eigenen Namen und auf eigene Rechnung Waren an Endkunden.
(2) Der Lieferant hält die in § 2 bezeichneten Produkte vorrätig und versendet sie auf Bestellung des Händlers unmittelbar an die vom Händler benannten Endkunden (Streckengeschäft / Dropshipping).
(3) Zwischen Lieferant und Endkunde entsteht kein Vertragsverhältnis. Der Händler bleibt gegenüber dem Endkunden alleiniger Verkäufer und Ansprechpartner. Der Lieferant tritt gegenüber dem Endkunden nicht in Erscheinung, soweit dieser Vertrag nichts anderes bestimmt.
(4) Der Händler kauft die Produkte mit jeder Bestellung vom Lieferanten; es gilt Kaufrecht. Der Händler ist nicht verpflichtet, Mindestmengen abzunehmen [Alternative: Der Händler verpflichtet sich zu einem Mindestumsatz von [Betrag] EUR netto pro [Quartal / Jahr]].

§ 2 Produkte, Sortiment und Produktdaten
(1) Gegenstand sind die in Anlage 1 aufgeführten Produkte (nachfolgend „Produkte“). Der Lieferant kann die Liste mit einer Ankündigungsfrist von [z. B. 4] Wochen ändern; auslaufende Produkte sind mindestens [z. B. 8] Wochen vorher anzukündigen.
(2) Der Lieferant stellt dem Händler für jedes Produkt folgende Daten zur Verfügung und hält sie aktuell: Artikelnummer, EAN/GTIN, Bezeichnung, Beschreibung, technische Daten, Maße und Gewicht, Produktbilder in ausreichender Auflösung, Hersteller mit Anschrift und E-Mail-Adresse, ggf. verantwortliche Person in der EU, Warn- und Sicherheitshinweise in deutscher Sprache sowie alle Kennzeichnungen, die für das Inverkehrbringen in Deutschland erforderlich sind.
(3) Der Lieferant räumt dem Händler das nicht ausschließliche, auf die Vertragslaufzeit beschränkte Recht ein, die überlassenen Produktbilder, Texte und Marken zur Bewerbung und zum Verkauf der Produkte in den in § 1 genannten Kanälen zu nutzen. Der Lieferant versichert, hierzu berechtigt zu sein, und stellt den Händler von Ansprüchen Dritter wegen der Nutzung des überlassenen Materials frei.
(4) Produktdaten werden [per CSV-Feed unter [URL] / über die Schnittstelle [Bezeichnung] / per E-Mail] bereitgestellt und mindestens [täglich / wöchentlich] aktualisiert.

§ 3 Einkaufspreise, Versandkosten, Zahlung
(1) Die Einkaufspreise des Händlers ergeben sich aus der Preisliste in Anlage 1 (Nettopreise zuzüglich Umsatzsteuer). Preisänderungen kündigt der Lieferant mindestens [z. B. 30] Tage im Voraus in Textform an; für bereits übermittelte Bestellungen gilt der alte Preis.
(2) Für den Versand an den Endkunden berechnet der Lieferant pauschal [Betrag] EUR netto je Sendung innerhalb Deutschlands [und [Betrag] EUR netto je Sendung in die Länder [Länderliste]]. Verpackung und Handling sind damit abgegolten.
(3) Der Lieferant stellt dem Händler [je Bestellung / wöchentlich gesammelt / monatlich gesammelt] eine Rechnung mit allen Pflichtangaben nach § 14 UStG. Die Rechnung ist innerhalb von [z. B. 14] Tagen ohne Abzug fällig. [Alternative: Zahlung per Vorkasse vor Versand / Lastschrift mit SEPA-Mandat.]
(4) Der Händler legt seine Verkaufspreise gegenüber den Endkunden frei fest. Unverbindliche Preisempfehlungen des Lieferanten sind nicht bindend.

§ 4 Bestellübermittlung und Bestandsdaten
(1) Der Händler übermittelt Bestellungen [automatisch über die Schnittstelle [Bezeichnung] / per E-Mail an [E-Mail-Adresse] / über das Händlerportal unter [URL]] mit folgenden Angaben: Bestellnummer des Händlers, Artikelnummer, Menge, Name und Lieferadresse des Endkunden, ggf. Telefonnummer oder E-Mail-Adresse für die Sendungsbenachrichtigung.
(2) Der Lieferant bestätigt den Eingang jeder Bestellung innerhalb von [z. B. 4] Stunden an Werktagen und meldet unverzüglich, wenn ein Produkt nicht lieferbar ist.
(3) Der Lieferant stellt dem Händler aktuelle Bestandsdaten [in Echtzeit über die Schnittstelle / mindestens [zweimal] täglich] zur Verfügung. Zeigt der Bestand eine Verfügbarkeit an, darf der Händler die Lieferzeit nach § 6 gegenüber dem Endkunden zusagen.
(4) Bestellungen, die bis [Uhrzeit] Uhr an einem Werktag eingehen, werden am selben Werktag versendet; später eingehende am folgenden Werktag.

§ 5 Versand im Namen des Händlers (neutraler Versand)
(1) Der Lieferant versendet die Produkte als Absender „[Firma des Händlers], [Anschrift des Händlers]“ ausschließlich in neutraler Verpackung ohne eigene Firmenangaben, Werbung, Beilagen oder Preisangaben des Lieferanten.
(2) Der Sendung wird ein Lieferschein im Layout des Händlers beigelegt, den der Lieferant [aus der Schnittstelle erzeugt / vom Händler als PDF erhält]. Rechnungen an den Endkunden stellt ausschließlich der Händler.
(3) Der Lieferant übermittelt dem Händler für jede Sendung spätestens am Versandtag die Sendungsnummer und den Versanddienstleister. Der Händler informiert den Endkunden.
(4) Als Retourenadresse gegenüber dem Endkunden wird [die Anschrift des Lieferanten / die Anschrift des Händlers] verwendet.
(5) Der Lieferant setzt die Versanddienstleister [DHL / DPD / GLS / Hermes / UPS] ein und verpackt die Produkte transportsicher. Der Lieferant trägt die Gefahr bis zur Übergabe an den Versanddienstleister; im Verhältnis zum Endkunden gilt § 475 Abs. 2 BGB, sodass der Händler Transportschäden gegenüber dem Endkunden trägt und beim Lieferanten Rückgriff nimmt, soweit die Verpackung oder die Übergabe an den Versanddienstleister mangelhaft war.

§ 6 Lieferzeiten und Lieferverzug
(1) Die Lieferzeit bis zur Zustellung beim Endkunden beträgt bei lieferbaren Produkten innerhalb Deutschlands [z. B. 2 bis 4] Werktage ab Übermittlung der Bestellung. Der Händler darf diese Lieferzeit gegenüber Endkunden ausweisen.
(2) Kann der Lieferant die Lieferzeit nicht einhalten, informiert er den Händler unverzüglich unter Angabe des neuen Liefertermins. Der Händler kann die Bestellung dann stornieren, ohne dass Kosten anfallen.
(3) Überschreitet der Lieferant die Lieferzeit bei mehr als [z. B. 5] % der Bestellungen eines Kalendermonats, kann der Händler nach erfolgloser Abmahnung diesen Vertrag außerordentlich kündigen. Weitergehende Ansprüche, insbesondere Ersatz von Erstattungen, die der Händler Endkunden wegen Lieferverzugs leisten muss, bleiben unberührt.

§ 7 Retouren, Widerruf des Endkunden, Gewährleistung
(1) Widerruft ein Endkunde innerhalb der gesetzlichen Frist, nimmt der Lieferant die Ware an der in § 5 Abs. 4 genannten Adresse zurück. Der Händler erhält für unbeschädigte, vollständige Ware eine Gutschrift in Höhe des Einkaufspreises [abzüglich einer Bearbeitungspauschale von [Betrag] EUR netto]. Die Versandkosten der Hinsendung werden [nicht / zur Hälfte / vollständig] erstattet.
(2) Bei mangelhafter Ware (§§ 434 ff. BGB) steht dem Händler das gesetzliche Gewährleistungsrecht zu. Der Lieferant liefert auf Wunsch des Händlers innerhalb von [z. B. 3] Werktagen kostenfrei Ersatz an den Endkunden oder erstattet den Einkaufspreis. Die Kosten der Rücksendung und der Ersatzlieferung trägt der Lieferant. Der Händler kann zudem die Kosten ersetzt verlangen, die ihm gegenüber dem Endkunden aus der Nacherfüllung entstehen (§ 445a BGB).
(3) Die Rügepflicht nach § 377 HGB gilt mit der Maßgabe, dass der Händler die Ware nicht selbst in Augenschein nimmt. Eine Mängelrüge ist rechtzeitig, wenn der Händler den Mangel innerhalb von [z. B. 5] Werktagen nach Mitteilung des Endkunden an den Lieferanten weiterleitet.
(4) Die Verjährungsfrist für Gewährleistungsansprüche des Händlers gegen den Lieferanten beträgt zwei Jahre ab Ablieferung beim Endkunden; sie tritt frühestens zwei Monate nach dem Zeitpunkt ein, in dem der Händler die Ansprüche des Endkunden erfüllt hat (§ 445b BGB).
(5) Der Lieferant bearbeitet Retouren innerhalb von [z. B. 5] Werktagen nach Eingang und meldet dem Händler Eingang, Zustand und Gutschrift in Textform.

§ 8 Produktsicherheit, Konformität und Produkthaftung
(1) Der Lieferant gewährleistet, dass alle Produkte den in Deutschland und der EU geltenden Vorschriften entsprechen, insbesondere der Verordnung (EU) 2023/988 über die allgemeine Produktsicherheit (GPSR), dem Produktsicherheitsgesetz, den anwendbaren CE-Richtlinien und -Verordnungen (z. B. Niederspannungs-, EMV-, Spielzeug-, Funkanlagen-Richtlinie), der REACH-Verordnung, dem Elektro- und Elektronikgerätegesetz, der Batterieverordnung (EU) 2023/1542 und dem Batteriedurchführungsgesetz, der Lebensmittel- bzw. Kosmetikverordnung sowie den Kennzeichnungs- und Textilkennzeichnungsvorschriften, soweit einschlägig.
(2) Der Lieferant stellt dem Händler auf Anforderung innerhalb von [z. B. 5] Werktagen Konformitätserklärungen, Prüfberichte, Sicherheitsdatenblätter und die Angaben zum Hersteller bzw. zur verantwortlichen Person nach Art. 16 GPSR zur Verfügung. Fehlen diese Unterlagen, darf der Händler das Produkt aus dem Sortiment nehmen und bereits übermittelte Bestellungen stornieren.
(3) Der Lieferant ist für die Registrierung nach dem Verpackungsgesetz (LUCID) und die Systembeteiligung für Versand- und Produktverpackungen verantwortlich, die er in Verkehr bringt; er weist die Registrierungsnummer in Anlage 1 aus. [Alternative: Der Händler ist registriert und übernimmt die Systembeteiligung für Versandverpackungen; der Lieferant meldet ihm monatlich die Verpackungsmengen.]
(4) Der Lieferant informiert den Händler unverzüglich über Rückrufe, Sicherheitswarnungen, behördliche Maßnahmen und ihm bekannt werdende Unfälle mit den Produkten. Rückrufe wickelt der Lieferant auf eigene Kosten ab; der Händler unterstützt bei der Information der Endkunden.
(5) Der Lieferant stellt den Händler von allen Ansprüchen Dritter frei, die auf einem Verstoß der Produkte gegen Absatz 1, auf Produktfehlern im Sinne des Produkthaftungsgesetzes oder auf Verletzung von Schutzrechten Dritter beruhen, einschließlich angemessener Rechtsverfolgungskosten. Der Lieferant unterhält eine Produkthaftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR je Schadensfall und weist diese auf Anforderung nach.

§ 9 Datenschutz und Kundendaten
(1) Der Lieferant verarbeitet die vom Händler übermittelten Daten der Endkunden ausschließlich zur Ausführung der Lieferung und zur Retourenabwicklung. Jede andere Nutzung, insbesondere zu Werbezwecken, zum Aufbau eigener Kundenbeziehungen oder zur Weitergabe an Dritte außerhalb der Versandabwicklung, ist untersagt.
(2) Die Parteien schließen den als Anlage 2 beigefügten Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Der Lieferant löscht Endkundendaten spätestens [z. B. 90] Tage nach Abschluss der Lieferung bzw. der Retoure, soweit keine gesetzlichen Aufbewahrungspflichten bestehen.
(3) Die Kundenbeziehung und alle Kundendaten stehen allein dem Händler zu. Der Lieferant wird Endkunden, die sich an ihn wenden, an den Händler verweisen.

§ 10 Marken, Geheimhaltung, Wettbewerb
(1) Der Lieferant darf die Marken und das Logo des Händlers nur zur Erstellung der Lieferscheine und Versandverpackungen nach § 5 verwenden. Der Händler darf die Marken des Lieferanten und der Hersteller nur zur Bewerbung der Produkte im Rahmen dieses Vertrags verwenden.
(2) Die Parteien behandeln alle Informationen über Konditionen, Umsätze, Kundendaten und Geschäftsabläufe der anderen Partei vertraulich, auch nach Vertragsende, mindestens für [z. B. 3] Jahre.
(3) Der Lieferant verpflichtet sich, Endkunden des Händlers nicht gezielt direkt anzusprechen. Ein darüber hinausgehendes Wettbewerbsverbot besteht nicht; der Lieferant darf weitere Händler beliefern [Alternative bei Exklusivität: Der Lieferant beliefert im Gebiet [Deutschland] für die Dauer dieses Vertrags keine weiteren Online-Händler mit den Produkten der Anlage 1, sofern der Händler den Mindestumsatz nach § 1 Abs. 4 erreicht].

§ 11 Laufzeit und Kündigung
(1) Der Vertrag beginnt am [Datum] und läuft auf unbestimmte Zeit. Er kann von jeder Partei mit einer Frist von [z. B. 3] Monaten zum Monatsende in Textform gekündigt werden, erstmals zum [Datum].
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt für den Händler insbesondere vor, wenn der Lieferant wiederholt gegen § 5, § 8 oder § 9 verstößt; für den Lieferanten insbesondere, wenn der Händler mit mehr als [z. B. zwei] Rechnungen in Verzug ist.
(3) Nach Vertragsende werden bereits übermittelte Bestellungen noch ausgeführt, offene Retouren nach § 7 abgewickelt und die Nutzungsrechte nach § 2 Abs. 3 enden; der Händler entfernt die Produkte innerhalb von [z. B. 14] Tagen aus seinen Kanälen.

§ 12 Schlussbestimmungen
(1) Allgemeine Geschäftsbedingungen des Lieferanten gelten nur, soweit sie diesem Vertrag nicht widersprechen; bei Widersprüchen geht dieser Vertrag vor.
(2) Änderungen und Ergänzungen bedürfen der Textform. Mündliche Nebenabreden bestehen nicht.
(3) Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam; die Parteien ersetzen die unwirksame Bestimmung durch eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], sofern beide Parteien Kaufleute sind.
(5) Anlagen: Anlage 1 (Produkt- und Preisliste, Verpackungsregistrierung), Anlage 2 (Auftragsverarbeitungsvertrag).

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Händler


______________________________
[Vorname Nachname], für den Lieferanten

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
