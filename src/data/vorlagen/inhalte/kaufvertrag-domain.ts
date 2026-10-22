// Inhalt der Vorlage „kaufvertrag-domain“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../kauf.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Domain-Kaufvertrag brauchst",
        text: "Die passende .de- oder .com-Domain ist oft schon vergeben, aber der Inhaber nutzt sie nicht. Dann kaufst du sie ihm ab, über eine Domainbörse, nach einer direkten Anfrage oder im Bekanntenkreis. Umgekehrt verkaufst du Domains aus einem aufgegebenen Projekt oder einer Umbenennung deiner Marke. In beiden Fällen geht es um Geld gegen einen Inhaberwechsel, der technisch über AuthCode oder Push läuft und rechtlich sauber abgesichert sein muss.\n\nDieses Muster regelt den reinen Domainkauf, optional mit Zusatzdomains, Postfächern, Social-Media-Handles, einer eingetragenen Marke und einem Logo. Es sichert die Zahlung über Treuhand oder Zug um Zug ab und lässt den Verkäufer garantieren, dass keine Rechte Dritter, Dispute-Einträge oder Abmahnungen bestehen. Wechselt mit der Domain ein ganzer Shop mit Inhalten, Kunden und Lieferanten, passt der Kaufvertrag Website und Online-Shop besser.",
      },
      {
        titel: "Was muss in einen Domain-Kaufvertrag? Übertragung, Treuhand, Garantien",
        text: "Eine Domain ist kein Eigentum, sondern ein Vertragsverhältnis mit der Registrierungsstelle. Der Vertrag muss deshalb den Inhaberwechsel organisieren, nicht nur den Preis nennen. Die Vorlage regelt:\n\n- Domain, Registrierungsstelle und Registrar sowie mitverkaufte Zusatzdomains, Postfächer und Handles (§ 1)\n- Kaufpreis mit Umsatzsteuer-Variante und Zahlung über Treuhand (Variante A) oder Zug um Zug mit Anzahlung (Variante B) (§ 2)\n- Freiheit von Sperren und Zahlungsrückständen, Übertragung per AuthCode oder Push, Abschluss der Übertragung, Stillhaltepflicht (§ 3)\n- Mitwirkungsfristen, Enddatum, Rücktritt, pauschalierter Schadensersatz, Umgang mit eingehenden E-Mails (§ 4)\n- Garantien: Alleininhaber, keine Pfändung, kein Dispute, keine Abmahnungen, kein Domain-Grabbing, keine Sperrlisten (§ 5)\n- Marke, Logo und Nutzungsverbot ähnlicher Zeichen für den Verkäufer (§ 6)\n- Freistellung und Kaufpreiserstattung bei Garantieverletzung, Haftungsbegrenzung (§ 7)\n- Vertraulichkeit, Schriftform mit E-Mail-Ausnahme für AuthCodes, Gerichtsstand (§§ 8, 9)\n\nDie Definition des Abschlusses in § 3 Abs. 4 ist wichtig: Erst wenn du als Inhaber eingetragen bist und die DNS-Einstellungen kontrollierst, ist der Verkäufer fertig.",
      },
      {
        titel: "Domain-Kaufvertrag Muster ausfüllen: AuthCode, Push oder Treuhand",
        text: "Trage in § 1 den Domainnamen exakt ein und prüfe im Whois oder bei der DENIC, wer Inhaber ist und über welchen Registrar die Domain läuft; der Verkäufer muss diese Person sein. Liste in Absatz 3 auf, was mitgeht: weitere Domains, Postfächer mit Weiterleitungsdauer, Social-Media-Handles. In § 2 Abs. 1 wählst du die Steuer-Variante: Umsatzsteuer bei gewerblichem Verkäufer, keine bei Privatverkauf, Reverse Charge bei einem Käufer im EU-Ausland. Dann entscheidest du zwischen Treuhand (Variante A, Dienst und Gebührenteilung eintragen) und Zug um Zug mit Anzahlung (Variante B).\n\nIn § 3 Abs. 2 bleibt nur ein Übertragungsweg stehen: AuthCode-Transfer zu deinem Provider oder Inhaberwechsel beim selben Registrar. Setze Fristen in Werktagen und die Mindestrestlaufzeit der Registrierung ein. In § 4 trägst du das Enddatum und die Höhe des pauschalierten Schadensersatzes ein. In § 5 Buchstabe f ergänzt der Verkäufer, seit wann er die Domain hält und wofür sie genutzt wurde. In § 6 behältst du nur die passende Variante: ohne Marke, mit Markenübertragung samt Registernummer und Klassen, oder mit Logo und Namen des Designers. Zum Schluss Ort, Datum und Unterschriften.",
      },
      {
        titel: "Typische Fehler beim Domainkauf und wie du sie vermeidest",
        text: "Erster Fehler: Vollzahlung vorab an einen unbekannten Verkäufer. Ist der AuthCode dann falsch oder die Domain gesperrt, läufst du dem Geld hinterher. Nutze Treuhand oder zahle die Hälfte erst nach Eintragung. Zweiter Fehler: keine Markenrecherche. Eine Domain, die einer eingetragenen Marke gleicht, bringt dir als neuem Inhaber die Abmahnung, nicht dem Verkäufer; die Garantie in § 5 hilft nur, wenn er zahlen kann. Prüfe DPMA- und EUIPO-Register vor Vertragsschluss.\n\nDritter Fehler: Transfer-Lock und 60-Tage-Sperre übersehen. Bei vielen generischen Endungen sperrt der Registrar nach einem Inhaberwechsel den Providerwechsel für 60 Tage; plane den Weg (erst Push, dann Transfer oder umgekehrt) vorher. Vierter Fehler: E-Mails des Verkäufers laufen weiter. Nach der Übertragung landen Geschäftsmails unter der Domain bei dir und umgekehrt; § 4 Abs. 3 regelt Löschung und optionale Weiterleitung. Fünfter Fehler: Inhalte mitkaufen, ohne Rechte zu prüfen. Texte, Fotos und Logos haben Urheber; nur wer die Rechtekette belegt, darf sie weiternutzen.",
      },
      {
        titel: "Rechtliche Grundlagen: Rechtskauf, Erschöpfung der Registrierung, Marke, Umsatzsteuer",
        text: "Rechtlich ist der Domainkauf ein Rechtskauf nach § 453 BGB: Verkauft wird die vertragliche Position gegenüber der Registrierungsstelle, nicht eine Sache. Die Kaufrechtsvorschriften gelten entsprechend. Weil eine Domain kein Eigentum im Sinne des Sachenrechts ist, gibt es keinen Eigentumsvorbehalt; die Absicherung läuft über Treuhand und die Reihenfolge von Zahlung und Übertragung. Eine Form ist nicht vorgeschrieben, der Vertrag kann sogar per E-Mail geschlossen werden; die Schriftform dient dem Beweis.\n\nDie Garantien in § 5 sind selbständige Garantieversprechen: Der Verkäufer haftet verschuldensunabhängig, wenn sie falsch sind. Das ist nötig, weil die Domain selbst keinen Mangel haben kann, wohl aber mit Rechten Dritter belastet sein. Wird eine eingetragene Marke mitverkauft, geht sie nach § 27 MarkenG durch Vertrag über; die Umschreibung im Register ist nur deklaratorisch, aber nötig, um das Recht gegenüber Dritten nachzuweisen. Ein Logo ist urheberrechtlich geschützt und kann nur per Nutzungsrechtseinräumung nach § 31 UrhG übertragen werden. Umsatzsteuerlich ist der Verkauf durch einen Unternehmer eine sonstige Leistung; bei Käufern im EU-Ausland mit USt-IdNr greift Reverse Charge.",
      },
      {
        titel: "Wann der Domain-Kaufvertrag aus der Vorlage nicht reicht",
        text: "Bei hohen Kaufpreisen, etwa für kurze .com-Domains oder Gattungsbegriffe, lohnt sich ein Treuhanddienst mit Vertragsprüfung und eine anwaltliche Recherche zu Marken-, Namens- und Firmenrechten in allen Zielländern. Kauft oder verkauft eine Partei im Ausland, musst du Rechtswahl, Gerichtsstand und Umsatzsteuer anpassen; die Vorlage geht von deutschem Recht aus.\n\nBesteht bereits ein Dispute-Eintrag, ein UDRP-Verfahren oder eine Abmahnung, kann die Domain nicht übertragen werden; dann hilft kein Kaufvertrag, sondern nur die Klärung des Streits. Wird mit der Domain ein laufendes Geschäft übergeben, also Shop, Kunden, Newsletter, Lieferanten und Konten, nutze den Kaufvertrag Website und Online-Shop, der Datenschutz und Wettbewerbsverbot regelt. Ist der Verkäufer eine Privatperson, prüft er mit seinem Steuerberater, ob ein privates Veräußerungsgeschäft vorliegt. GründerX ist Software und liefert Muster, keine Rechts- oder Steuerberatung.",
      },
    ],
  text: `Kaufvertrag über eine Internet-Domain

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort], [vertreten durch [Vorname Nachname]], [USt-IdNr. / „handelnd als Privatperson“]
– nachfolgend „Verkäufer“ –

und

[Firma / Vorname Nachname], [Straße, PLZ Ort], [vertreten durch [Vorname Nachname]], [USt-IdNr. / „handelnd als Privatperson“]
– nachfolgend „Käufer“ –

§ 1 Kaufgegenstand
(1) Der Verkäufer ist Inhaber (Domain-Holder) der Domain
   [domainname.de]
   registriert bei der Registrierungsstelle [DENIC eG / Registry der Endung] über den Registrar/Provider [Name] (nachfolgend „Domain“).
(2) Der Verkäufer verkauft dem Käufer sämtliche Rechte und Ansprüche aus dem Registrierungsvertrag an der Domain und verpflichtet sich, die Domain auf den Käufer zu übertragen. Übertragen wird der Inhaberstatus; Eigentum im Sinne des Sachenrechts besteht an einer Domain nicht.
(3) Mitverkauft sind: [keine weiteren Gegenstände / folgende Zusatzdomains: [Liste] / die E-Mail-Postfächer und deren Weiterleitung für [z. B. 3] Monate / die unter der Domain erreichbaren Inhalte gemäß Anlage 1 / Social-Media-Handles [Liste]].
(4) Nicht mitverkauft sind Inhalte, Datenbanken, Nutzerdaten und Software, die unter der Domain betrieben werden, soweit sie nicht in Absatz 3 genannt sind. Der Verkäufer entfernt sie vor der Übertragung.

§ 2 Kaufpreis und Zahlung
(1) Der Kaufpreis beträgt [Betrag] EUR [zuzüglich der gesetzlichen Umsatzsteuer von 19 % / umsatzsteuerfrei, da der Verkäufer als Privatperson handelt / Steuerschuldnerschaft des Leistungsempfängers (Reverse Charge), da der Käufer im EU-Ausland ansässig ist].
[Variante A – Treuhand]
(2) Die Zahlung wird über den Treuhanddienst [Name des Escrow-Dienstes, z. B. Sedo Transfer Service, Escrow.com, Treuhandkonto Notar/Rechtsanwalt] abgewickelt. Der Käufer zahlt den Kaufpreis innerhalb von [z. B. 5] Werktagen nach Vertragsschluss an den Treuhänder. Der Treuhänder gibt den Kaufpreis an den Verkäufer frei, sobald der Käufer als Inhaber der Domain eingetragen ist oder der Käufer die Freigabe erklärt. Die Treuhandgebühren tragen [die Parteien je zur Hälfte / der Käufer / der Verkäufer].
[Variante B – Zug um Zug ohne Treuhand]
(2) Der Käufer zahlt [z. B. 50] % des Kaufpreises bei Vertragsschluss und den Restbetrag innerhalb von [z. B. 3] Werktagen nach Eintragung als Inhaber auf das Konto [IBAN].
(3) Bei Zahlungsverzug gelten die gesetzlichen Verzugszinsen.

§ 3 Übertragung der Domain
(1) Der Verkäufer stellt sicher, dass die Domain zum Zeitpunkt der Übertragung nicht gesperrt (Transfer-Lock, Registrar-Lock, Dispute) ist, keine Zahlungsrückstände beim Registrar bestehen und die Registrierung noch mindestens [z. B. 60] Tage läuft.
(2) Die Übertragung erfolgt [Variante Providerwechsel: durch Übermittlung des AuthCodes (bei .de: AuthInfo) an den Käufer innerhalb von [z. B. 3] Werktagen nach [Vertragsschluss / Eingang des Kaufpreises beim Treuhänder]. Der Käufer stellt unverzüglich den Transferantrag bei seinem Provider [Name] und trägt sich als Inhaber ein.] [Variante Inhaberwechsel beim selben Registrar: durch Änderung der Inhaberdaten (Push) beim Registrar [Name] auf das Kundenkonto des Käufers [Kundennummer].]
(3) Der Verkäufer bestätigt die Übertragung gegenüber dem Registrar bzw. der Registrierungsstelle unverzüglich, sofern eine Bestätigung des bisherigen Inhabers erforderlich ist, und stimmt dem Inhaberwechsel ausdrücklich zu.
(4) Die Übertragung ist abgeschlossen, wenn der Käufer in der Whois-/Inhaberdatenbank der Registrierungsstelle als Inhaber der Domain geführt wird und der Käufer die vollständige Kontrolle über die DNS-Einstellungen hat.
(5) Bis zur Übertragung hält der Verkäufer die Domain in unverändertem Zustand und nimmt keine Änderungen an Inhaberdaten, DNS-Einträgen oder Registrar vor, die dem Käufer nachteilig sind. Er verlängert die Registrierung, soweit sie vor Abschluss der Übertragung ausläuft.

§ 4 Mitwirkung und Fristen
(1) Beide Parteien wirken an der Übertragung unverzüglich mit und beantworten Anfragen des Registrars, der Registrierungsstelle und des Treuhänders innerhalb von [z. B. 2] Werktagen.
(2) Die Übertragung soll bis spätestens [Datum] abgeschlossen sein. Ist sie bis dahin aus Gründen, die der Verkäufer zu vertreten hat, nicht abgeschlossen, kann der Käufer nach Setzung einer Nachfrist von [z. B. 7] Tagen vom Vertrag zurücktreten; bereits gezahlte Beträge sind zurückzuerstatten. Ist sie aus Gründen, die der Käufer zu vertreten hat, nicht abgeschlossen, kann der Verkäufer nach gleicher Nachfrist zurücktreten; die Anzahlung verbleibt in Höhe von [z. B. 10] % des Kaufpreises als pauschalierter Schadensersatz beim Verkäufer, der Nachweis eines geringeren Schadens bleibt dem Käufer möglich.
(3) Der Verkäufer verpflichtet sich, für [z. B. 3] Monate nach Übertragung E-Mails, die an Adressen unter der Domain eingehen, nicht mehr abzurufen und etwaige noch bei ihm eingehende Nachrichten unverzüglich und ungelesen zu löschen. [Optional: Der Käufer richtet für diesen Zeitraum eine Weiterleitung für die Adressen [Liste] an [E-Mail des Verkäufers] ein.]

§ 5 Garantien des Verkäufers
Der Verkäufer garantiert im Wege eines selbständigen Garantieversprechens, dass zum Zeitpunkt des Vertragsschlusses und der Übertragung
   a) er alleiniger Inhaber der Domain ist und frei über sie verfügen kann,
   b) die Domain nicht gepfändet, verpfändet, sicherungsabgetreten oder sonst mit Rechten Dritter belastet ist und kein Dispute-Eintrag, kein UDRP-/ADR-Verfahren und kein sonstiges Streitverfahren über die Domain anhängig oder angedroht ist,
   c) ihm keine Ansprüche Dritter aus Marken-, Namens-, Firmen- oder Wettbewerbsrecht bezüglich der Domain bekannt sind und er in den letzten [z. B. 3] Jahren keine Abmahnung, Unterlassungsaufforderung oder Klage wegen der Domain erhalten hat,
   d) die Domain nicht durch unlautere Mittel (insbesondere Domain-Grabbing, Erschleichen durch Täuschung des Vorinhabers) erworben wurde,
   e) die Domain nicht auf Sperrlisten (Spam, Malware) geführt wird und keine Suchmaschinen-Strafen bekannt sind, [soweit ihm bekannt],
   f) [der Verkäufer die Domain seit dem [Datum] hält und sie zuletzt für [Beschreibung der Nutzung] genutzt wurde].

§ 6 Marke, Logo und Kennzeichen
(1) [Variante ohne Marke: Mit der Domain werden keine Marken-, Namens- oder Firmenrechte übertragen. Der Verkäufer hat kein Markenrecht an der Bezeichnung [Name] angemeldet.]
(2) [Variante mit Marke: Der Verkäufer ist Inhaber der [deutschen Marke Nr. [Nummer] beim DPMA / Unionsmarke Nr. [Nummer] beim EUIPO] „[Marke]“ für die Klassen [Nizza-Klassen]. Diese Marke wird mit allen Rechten für [Betrag] EUR (im Kaufpreis enthalten) an den Käufer übertragen. Der Verkäufer unterzeichnet alle zur Umschreibung im Register erforderlichen Erklärungen; die Umschreibungsgebühren trägt der Käufer.]
(3) [Variante Logo: Der Verkäufer räumt dem Käufer an dem in Anlage 2 abgebildeten Logo und den dort genannten Gestaltungselementen das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte, übertragbare Nutzungsrecht für alle bekannten Nutzungsarten ein, einschließlich des Rechts zur Bearbeitung. Der Verkäufer versichert, dass er diese Rechte vom Urheber [Name des Designers] erworben hat und zur Weiterübertragung berechtigt ist.]
(4) Der Verkäufer verpflichtet sich, die Bezeichnung [Name] und verwechselbare Zeichen nach Übertragung nicht mehr als Domain, Marke, Firma, Social-Media-Handle oder Produktname zu nutzen und keine ähnlichen Domains anzumelden.

§ 7 Haftung und Freistellung
(1) Verletzt der Verkäufer eine Garantie nach § 5, stellt er den Käufer von allen daraus resultierenden Ansprüchen Dritter einschließlich angemessener Rechtsverfolgungskosten frei und ersetzt dem Käufer den entstandenen Schaden. Kann die Domain wegen Rechten Dritter nicht übertragen werden oder verliert der Käufer sie innerhalb von [z. B. 24] Monaten nach Übertragung an einen Dritten, dessen Rechte bereits bei Vertragsschluss bestanden, erstattet der Verkäufer den Kaufpreis.
(2) Im Übrigen haften die Parteien nur für Vorsatz und grobe Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten begrenzt auf den vorhersehbaren, vertragstypischen Schaden, höchstens auf den Kaufpreis. Schäden aus der Verletzung von Leben, Körper oder Gesundheit bleiben unberührt.
(3) Für den wirtschaftlichen Wert der Domain, Besucherzahlen, Suchmaschinenpositionen und die Eignung für die Zwecke des Käufers übernimmt der Verkäufer keine Gewähr, soweit in § 5 nichts anderes garantiert ist.

§ 8 Vertraulichkeit
Die Parteien behandeln den Kaufpreis und die weiteren Konditionen dieses Vertrags vertraulich. Ausgenommen sind Mitteilungen an Steuerberater, Rechtsanwälte, Treuhänder, Registrare und Behörden, soweit erforderlich.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Die Übermittlung von AuthCodes und Bestätigungen per E-Mail ist ausreichend.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist [Ort], soweit beide Parteien Kaufleute sind oder eine Partei keinen allgemeinen Gerichtsstand in Deutschland hat.
(4) Anlagen: [Anlage 1 – Liste der mitverkauften Inhalte und Zugänge; Anlage 2 – Logo und Gestaltungselemente]. Die Anlagen sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Verkäufer, ggf. Firma und Vertreter]


______________________________
[Käufer, ggf. Firma und Vertreter]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
