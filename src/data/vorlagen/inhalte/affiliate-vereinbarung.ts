// Inhalt der Vorlage „affiliate-vereinbarung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../ecommerce.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Affiliate Vertrag brauchst",
        text: `Sobald du Dritten eine Provision für vermittelte Kunden zahlst, entsteht ein Vertrag, ob du ihn aufschreibst oder nicht. Ohne schriftliche Regelung streitet ihr später über Cookie-Laufzeiten, Stornos, nicht zugeordnete Bestellungen und darüber, ob der Partner mit Google-Anzeigen auf deinen Markennamen bieten darf. Die Affiliate-Vereinbarung legt das vorher fest und schützt beide Seiten.

Du brauchst sie, wenn du ein eigenes Partnerprogramm für deinen Shop oder dein digitales Produkt startest, mit Bloggern, YouTubern, Influencern oder Vergleichsportalen auf Provisionsbasis arbeitest oder ein Affiliate-Tool einsetzt und dafür Programmbedingungen brauchst. Für Netzwerke wie Awin oder Tradedoubler gelten deren Rahmenverträge; dort dient die Vorlage nur als Vorlage für deine Programmbeschreibung. Für reine Pauschalkooperationen ohne Provision passt eher ein Influencer-Vertrag.`,
      },
      {
        titel: "Das gehört in eine Affiliate-Vereinbarung",
        text: `Die Vorlage regelt in elf Paragrafen den gesamten Ablauf vom Klick bis zur Auszahlung:

- Teilnahme, Partnerkanäle und die Klarstellung, dass der Partner kein Handelsvertreter ist (§ 1)
- Partnerlinks, Tracking, Cookie-Laufzeit, Last-Click oder First-Click und Vorrang eigener Kanäle (§ 2)
- Provisionssatz, Bemessungsgrundlage und Definition der provisionspflichtigen Transaktion (§ 3)
- Stornofrist, Rückbelastung ausgezahlter Provisionen und Ausweis der Stornos (§ 4)
- monatliche Abrechnung im Gutschriftverfahren, Mindestauszahlung und Einwendungsfrist (§ 5)
- erlaubte Werbemittel, Markennutzung und optional Gutscheinregeln (§ 6)
- verbotene Werbung: Spam, Markenbidding, Cookie-Dropping, irreführende Angaben, mit Vertragsstrafe (§ 7)
- Werbekennzeichnung und Datenschutzpflichten auf der Partnerseite (§ 8)
- deine Pflichten: funktionierendes Tracking, Statistik, aktuelle Werbemittel (§ 9)
- Laufzeit, Kündigung, Sperrung bei Verdacht und Abwicklung offener Provisionen (§ 10)
- Haftung, Freistellung, Gerichtsstand (§ 11)

Die wichtigste Klausel ist die Definition in § 3 Abs. 2: Provision gibt es nur für zugeordnete, bezahlte und nicht rückabgewickelte Bestellungen.`,
      },
      {
        titel: "Affiliate Vertrag Muster ausfüllen",
        text: `Trage in § 1 beide Parteien ein; beim Partner gehört die USt-IdNr. oder der Kleinunternehmerstatus dazu, weil davon die Abrechnung abhängt. Nenne Shop und Produkt und setze die Frist, innerhalb der du neuen Partnerkanälen widersprechen kannst. In § 2 trägst du das Partnerportal oder Tool, die Linkkennung, die Cookie-Laufzeit und das Zuordnungsprinzip ein; 30 Tage und Last-Click sind der häufigste Standard.

§ 3 braucht den Provisionssatz auf den Netto-Warenwert oder eine Festprovision, optional eine Staffel und die Ankündigungsfrist für Änderungen. In § 4 setzt du die Stornofrist, mindestens 30 Tage, damit Widerruf und übliche Retouren abgedeckt sind. In § 5 legst du Abrechnungstag, Mindestauszahlung und Auszahlungsweg fest. Bei § 6 und § 7 entscheidest du, ob Gutscheincodes eingeschränkt werden, ob generische Keywords vom Markenbidding-Verbot ausgenommen sind und wie hoch die Vertragsstrafe ist.

§ 10 braucht Kündigungsfrist, maximale Sperrdauer und die Frist zum Entfernen der Links. In Anlage 1 listest du jeden Partnerkanal mit URL oder Kanalname. Alle Klammern entfernen, Datum und Unterschriften ergänzen.`,
      },
      {
        titel: "Typische Fehler in Partnerprogrammen",
        text: `Der teuerste Fehler ist die Provision auf die Bestellung statt auf die bezahlte, nicht widerrufene Bestellung. Ohne Stornofrist zahlst du Provision für Käufe, die der Kunde zwei Wochen später zurückschickt. Der zweite Fehler ist fehlendes Markenbidding-Verbot: Partner schalten Google Ads auf deinen Markennamen, kassieren Provision für Kunden, die dich ohnehin gesucht hätten, und treiben deine eigenen Klickpreise hoch.

Rechtlich riskant sind Partner ohne Werbekennzeichnung und ohne Consent-Banner. Affiliate-Links müssen als Werbung erkennbar sein, und Tracking-Cookies auf der Partnerseite brauchen eine Einwilligung; Verstöße können auch dich als Auftraggeber treffen. Die Vorlage verpflichtet den Partner in § 8 ausdrücklich dazu. Weitere Fallen: Eigenbestellungen über den eigenen Link, Cashback-Modelle ohne deine Zustimmung, unverlangte Werbemails und die Abrechnung ohne Gutschriftverfahren, bei der die Umsatzsteuer falsch läuft. Prüfe außerdem, ob ein besonders aktiver, exklusiver Partner noch Affiliate oder schon Handelsvertreter ist.`,
      },
      {
        titel: "Rechtliche Grundlagen für Affiliate-Marketing",
        text: `Die Affiliate-Vereinbarung ist ein Vertrag eigener Art mit Elementen von Werbe- und Vermittlungsvertrag. Die Abgrenzung zum Handelsvertreter nach § 84 HGB ist wichtig, weil Handelsvertreter zwingende Rechte haben, etwa den Ausgleichsanspruch nach § 89b HGB bei Vertragsende. Ein Affiliate, der nur Links bereitstellt und nicht ständig als Beauftragter vermittelt, fällt in der Regel nicht darunter; die Vorlage stellt das in § 1 klar.

Für die Werbung des Partners gelten das UWG, insbesondere die Kennzeichnungspflicht kommerzieller Kommunikation nach § 5a Abs. 4 UWG und das Verbot unverlangter Werbung nach § 7 UWG, sowie die Kennzeichnungspflicht nach § 6 DDG und § 22 MStV. Tracking-Cookies auf der Partnerseite unterliegen § 25 TDDDG und der DSGVO. Steuerlich ist die Provision Umsatz des Partners; die Abrechnung per Gutschrift richtet sich nach § 14 Abs. 2 UStG, bei Partnern im EU-Ausland gilt das Reverse-Charge-Verfahren. Die Klauseln unterliegen als AGB der Kontrolle nach den §§ 305 ff. BGB, auch gegenüber Unternehmern.`,
      },
      {
        titel: "Wann die Affiliate Vorlage nicht reicht",
        text: `Die Vorlage ist für ein eigenes Programm mit Partnern aus Deutschland und der EU gedacht. Sie reicht nicht, wenn du über ein Affiliate-Netzwerk arbeitest, das eigene Rahmenbedingungen vorgibt, wenn Partner außerhalb der EU sitzen und andere Steuer- und Datenschutzregeln gelten, oder wenn der Partner so eng eingebunden ist, dass er wie ein Handelsvertreter arbeitet; dann brauchst du einen Handelsvertretervertrag nach den §§ 84 ff. HGB.

Auch bei Influencern mit Pauschalhonorar, Produktplatzierungen oder Content-Produktion ist eine Kooperationsvereinbarung mit Nutzungsrechten die bessere Wahl. Bei hohen Provisionsvolumen, Lead-Programmen für Finanzprodukte oder Programmen mit Sub-Affiliates lohnt sich die anwaltliche Prüfung. GründerX ist Software und keine Rechtsberatung; die Vorlage gibt dir einen vollständigen Rahmen, den du an dein Tracking-Tool und deine tatsächlichen Abrechnungsprozesse anpasst, bevor der erste Partner unterschreibt.`,
      },
    ],
  text: `Affiliate-Vereinbarung (Partnerprogramm)

zwischen

[Firma des Betreibers], [Straße Hausnummer], [PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Betreiber“ –

und

[Firma / Vorname Nachname des Partners], [Straße Hausnummer], [PLZ Ort], [USt-IdNr. / Kleinunternehmer nach § 19 UStG]
– nachfolgend „Partner“ –

§ 1 Gegenstand und Teilnahme
(1) Der Betreiber betreibt den Online-Shop [Shopname] unter [www.domain.de] [bzw. bietet das Produkt [Bezeichnung] an]. Er unterhält ein Partnerprogramm, über das Dritte gegen Provision Kunden vermitteln.
(2) Der Partner bewirbt die Angebote des Betreibers auf seinen in Anlage 1 benannten Websites, Social-Media-Kanälen, Newslettern oder Apps (nachfolgend „Partnerkanäle“). Neue Partnerkanäle sind dem Betreiber vor Nutzung in Textform anzuzeigen; der Betreiber kann innerhalb von [z. B. 5] Werktagen widersprechen.
(3) Der Partner handelt als selbständiger Unternehmer. Er ist nicht Handelsvertreter, nicht bevollmächtigt, Erklärungen für den Betreiber abzugeben, und erwirbt keinen Ausgleichsanspruch nach § 89b HGB. Ein Arbeits- oder Gesellschaftsverhältnis wird nicht begründet.
(4) Die Teilnahme setzt voraus, dass der Partner volljährig und unternehmerisch tätig ist und seine Partnerkanäle den gesetzlichen Anforderungen (Impressum, Datenschutzerklärung) entsprechen.

§ 2 Partnerlinks, Tracking und Cookie-Laufzeit
(1) Der Betreiber stellt dem Partner über [das Partnerportal unter [URL] / das Affiliate-Tool [Bezeichnung]] individuelle Partnerlinks mit Kennung ([z. B. „?ref=[Partner-ID]“]) sowie Werbemittel zur Verfügung.
(2) Klickt ein Nutzer auf einen Partnerlink, wird auf dem Endgerät des Nutzers ein Cookie oder eine vergleichbare Kennung mit einer Laufzeit von [z. B. 30] Tagen gesetzt. Bestellungen innerhalb dieser Laufzeit werden dem Partner zugerechnet, wenn das Cookie beim Abschluss der Bestellung noch vorhanden ist.
(3) Es gilt das [Last-Click-Prinzip: Bei mehreren Partnern wird die Provision dem Partner zugerechnet, dessen Link zuletzt vor der Bestellung angeklickt wurde / First-Click-Prinzip: … zuerst angeklickt wurde]. Eigene Werbekanäle des Betreibers (Newsletter, bezahlte Suchanzeigen, Retargeting) haben Vorrang, wenn der Nutzer zuletzt über diese kam.
(4) Der Partner akzeptiert, dass das Tracking technisch von der Einwilligung des Nutzers abhängt. Bestellungen, die wegen fehlender Einwilligung, Cookie-Löschung, Ad-Blockern oder technischen Störungen nicht zugeordnet werden können, begründen keinen Provisionsanspruch. Die Aufzeichnungen des Betreibers bzw. des Affiliate-Tools sind für die Zuordnung maßgeblich; der Partner kann innerhalb von [z. B. 14] Tagen nach Abrechnung substantiiert widersprechen.

§ 3 Provision und provisionspflichtige Transaktionen
(1) Der Partner erhält für jede provisionspflichtige Transaktion eine Provision in Höhe von [z. B. 10] % des Netto-Warenwerts (Warenwert ohne Umsatzsteuer, Versandkosten, Gutscheine und Rabatte) [Alternative: eine Festprovision von [Betrag] EUR je Neukunde / je Abschluss].
(2) Provisionspflichtig ist eine Bestellung, die
   a) nach § 2 dem Partner zugeordnet ist,
   b) vom Kunden vollständig bezahlt wurde und
   c) nicht innerhalb der Stornofrist nach § 4 widerrufen, zurückgegeben, rückabgewickelt oder vom Betreiber wegen Betrugsverdachts, Zahlungsausfalls oder Verstoßes gegen die AGB abgelehnt wurde.
(3) Eigenbestellungen des Partners, Bestellungen von Mitarbeitern oder Angehörigen des Partners über seine eigenen Links sowie Bestellungen, die durch unzulässige Werbung nach § 7 veranlasst wurden, sind nicht provisionspflichtig.
(4) [Optional: Staffel: Ab [Anzahl] provisionspflichtigen Transaktionen pro Kalendermonat beträgt die Provision [z. B. 12] %, ab [Anzahl] [z. B. 15] %.]
(5) Der Betreiber kann die Provisionssätze mit einer Ankündigungsfrist von [z. B. 30] Tagen in Textform ändern. Für bis dahin zugeordnete Transaktionen gilt der alte Satz. Widerspricht der Partner, endet die Vereinbarung mit Wirksamwerden der Änderung.

§ 4 Stornierungen und Rückbelastungen
(1) Die Stornofrist beträgt [z. B. 30] Tage ab Bestellung. Innerhalb dieser Frist widerrufene, zurückgesandte, nicht bezahlte oder rückabgewickelte Bestellungen entfallen als provisionspflichtige Transaktion.
(2) Wurde eine Provision bereits ausgezahlt und fällt die Transaktion danach weg (z. B. Rückbuchung, späterer Widerruf, Betrug), wird die Provision mit der nächsten Abrechnung verrechnet. Reicht die nächste Abrechnung nicht aus, ist der Partner zur Rückzahlung innerhalb von [z. B. 14] Tagen verpflichtet.
(3) Der Betreiber weist Stornierungen in der Abrechnung je Transaktion mit Grund aus.

§ 5 Abrechnung und Auszahlung
(1) Der Betreiber erstellt monatlich bis zum [z. B. 10.] des Folgemonats eine Abrechnung über alle provisionspflichtigen Transaktionen, deren Stornofrist abgelaufen ist.
(2) Die Auszahlung erfolgt im Gutschriftverfahren (§ 14 Abs. 2 Satz 5 UStG). Der Partner stimmt der Abrechnung per Gutschrift zu und teilt dem Betreiber seine USt-IdNr. oder seinen Status als Kleinunternehmer mit. Bei Partnern aus dem EU-Ausland geht die Steuerschuld auf den Leistungsempfänger über (Reverse-Charge-Verfahren); der Partner weist seine USt-IdNr. nach.
(3) Die Auszahlung erfolgt per [Überweisung / PayPal] auf das vom Partner benannte Konto, sobald das Guthaben mindestens [z. B. 50] EUR beträgt. Guthaben unterhalb des Mindestbetrags werden vorgetragen. Nicht abgerufene Guthaben verfallen [nicht / nach Ablauf von drei Jahren ab Abrechnung].
(4) Einwendungen gegen eine Abrechnung sind innerhalb von [z. B. 30] Tagen nach Zugang in Textform zu erheben; danach gilt die Abrechnung als anerkannt, worauf der Betreiber in der Abrechnung hinweist.

§ 6 Zulässige Werbemittel und Werbeformen
(1) Der Partner darf die vom Betreiber bereitgestellten Banner, Textlinks, Produktbilder, Logos und Produktdaten unverändert in den Partnerkanälen einsetzen. Eigene Texte und Bilder sind zulässig, sofern sie wahr, nicht irreführend und nicht herabsetzend sind.
(2) Zulässig sind insbesondere redaktionelle Beiträge, Produkttests, Vergleiche, Newsletter an Empfänger mit Einwilligung, Social-Media-Beiträge und Videos.
(3) Der Partner erhält das nicht ausschließliche, widerrufliche, auf die Laufzeit beschränkte Recht, die Marken und Werbemittel des Betreibers allein zur Erfüllung dieser Vereinbarung zu nutzen. Eine Registrierung von Domains, Nutzernamen oder Marken, die Marken des Betreibers enthalten, ist untersagt.
(4) [Optional: Der Partner darf Gutscheincodes nur verwenden, die ihm der Betreiber ausdrücklich für seine Kanäle zugeteilt hat. Die Veröffentlichung auf Gutschein-Portalen ist untersagt.]

§ 7 Unzulässige Werbung, Markenbidding-Verbot
(1) Untersagt sind:
   a) unverlangte Werbung per E-Mail, Messenger, SMS oder Telefon (§ 7 UWG), Kommentar-Spam und Massenpostings;
   b) Suchmaschinenwerbung (z. B. Google Ads, Bing Ads) auf Marken, Firmennamen oder Produktbezeichnungen des Betreibers oder deren Schreibvarianten sowie die Verwendung solcher Begriffe in Anzeigentexten oder Anzeigen-URLs (Markenbidding); [Optional: ausgenommen sind generische Keywords wie [Beispiele];]
   c) Cookie-Dropping, erzwungene Klicks, Pop-ups, Pop-unders, Layer, Adware, Toolbars, iFrames und jede Technik, die ein Tracking ohne bewussten Klick des Nutzers auslöst;
   d) irreführende Angaben über Preise, Rabatte, Verfügbarkeit, Testergebnisse oder Eigenschaften der Produkte;
   e) Werbung auf Seiten mit rechtswidrigen, pornografischen, gewaltverherrlichenden oder diskriminierenden Inhalten;
   f) das Nachbauen oder Vortäuschen der Website des Betreibers, insbesondere Bestellseiten, Logos oder Checkout-Elemente;
   g) Cashback- oder Prämienangebote, die Provisionen an Endkunden weitergeben, ohne ausdrückliche Zustimmung des Betreibers.
(2) Bei Verstößen kann der Betreiber die betroffenen Transaktionen stornieren, offene Provisionen einbehalten und den Partner sperren. Schadensersatzansprüche bleiben unberührt. Für jeden schuldhaften Verstoß gegen Absatz 1 Buchstabe b) oder c) zahlt der Partner eine Vertragsstrafe von [Betrag] EUR; der Betreiber kann weitergehenden Schaden nachweisen, die Vertragsstrafe wird angerechnet.

§ 8 Kennzeichnung und Datenschutz auf der Partnerseite
(1) Der Partner kennzeichnet Partnerlinks und bezahlte Empfehlungen als Werbung, sodass der kommerzielle Zweck für den Nutzer erkennbar ist (§ 5a Abs. 4 UWG, § 6 DDG bzw. § 22 MStV), z. B. durch „Werbung“, „Anzeige“ oder einen deutlichen Hinweis auf Affiliate-Links.
(2) Der Partner betreibt seine Kanäle datenschutzkonform. Er nennt das Affiliate-Tracking in seiner Datenschutzerklärung und holt für das Setzen nicht notwendiger Cookies und Kennungen die Einwilligung der Nutzer ein (§ 25 TDDDG, Art. 6 Abs. 1 lit. a DSGVO).
(3) Der Partner erhält keine personenbezogenen Daten der vermittelten Kunden. Die Abrechnung enthält nur Transaktionsnummer, Datum, Warenwert und Status.

§ 9 Pflichten des Betreibers
(1) Der Betreiber stellt ein funktionsfähiges Tracking bereit, hält die Werbemittel aktuell und informiert den Partner über wesentliche Änderungen des Angebots, der Preise und der Programmbedingungen.
(2) Der Betreiber gewährt dem Partner Zugang zu einer Statistik mit Klicks, Transaktionen, Stornos und Provisionen, mindestens monatlich aktualisiert.
(3) Der Betreiber ist für die Rechtmäßigkeit seines Angebots, seiner Preise und seiner Werbeaussagen verantwortlich und stellt den Partner von Ansprüchen Dritter frei, die auf vom Betreiber bereitgestellten Werbemitteln beruhen.

§ 10 Laufzeit, Kündigung, Sperrung
(1) Die Vereinbarung beginnt mit Freischaltung des Partners und läuft auf unbestimmte Zeit. Jede Partei kann sie mit einer Frist von [z. B. 14] Tagen in Textform kündigen.
(2) Das Recht zur außerordentlichen Kündigung bleibt unberührt. Der Betreiber kann den Partner bei begründetem Verdacht eines Verstoßes gegen § 7 vorläufig sperren und Auszahlungen bis zur Klärung zurückhalten, längstens für [z. B. 60] Tage.
(3) Nach Beendigung entfernt der Partner alle Partnerlinks und Werbemittel innerhalb von [z. B. 7] Tagen. Bis dahin zugeordnete provisionspflichtige Transaktionen werden nach Ablauf der Stornofrist noch abgerechnet; danach erlöschen alle Ansprüche. Bei Kündigung durch den Betreiber wegen eines Verstoßes gegen § 7 verfallen noch nicht ausgezahlte Provisionen.

§ 11 Haftung und Schlussbestimmungen
(1) Der Betreiber haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung von Leben, Körper oder Gesundheit. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt; im Übrigen ist sie ausgeschlossen. Ein Anspruch auf eine bestimmte Verfügbarkeit des Trackings oder auf bestimmte Umsätze besteht nicht.
(2) Der Partner stellt den Betreiber von Ansprüchen Dritter frei, die aus der Gestaltung der Partnerkanäle, eigenen Werbeaussagen oder Verstößen gegen § 7 oder § 8 entstehen.
(3) Änderungen bedürfen der Textform. Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam.
(4) Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort], sofern der Partner Kaufmann, juristische Person des öffentlichen Rechts oder ohne allgemeinen Gerichtsstand in Deutschland ist.
(5) Anlage 1: Partnerkanäle des Partners (URLs, Kanalnamen).

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Betreiber


______________________________
[Vorname Nachname], Partner

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
