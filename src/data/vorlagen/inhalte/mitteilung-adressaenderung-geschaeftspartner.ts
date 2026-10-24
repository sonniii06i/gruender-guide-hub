// Inhalt der Vorlage „mitteilung-adressaenderung-geschaeftspartner“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../verwaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du Geschäftspartner über Umzug, Umfirmierung oder Rechtsformwechsel informierst",
        text: `Das Unternehmen zieht aus dem Coworking in eigene Räume, aus dem Projektnamen wird eine eingetragene Firma, oder das Einzelunternehmen wird in eine GmbH überführt. Jede dieser Änderungen betrifft Dutzende Stellen gleichzeitig: Kunden, die Rechnungen an die alte Adresse schicken, Lieferanten, deren Stammdaten noch die alte Firma führen, Banken, die den Kontoinhaber ändern müssen, Versicherungen, Marktplätze, Finanzamt und IHK. Wer das nicht strukturiert mitteilt, bekommt Rechnungen auf den falschen Namen, verliert Post und riskiert den Vorsteuerabzug.

Die Vorlage ist ein Serienbrief für genau diese Mitteilung: einmal ausgefüllt, an alle Partner verschickt, mit Gegenüberstellung alt und neu und einem festen Stichtag. Sie deckt drei Fälle ab: reine Adressänderung, Umfirmierung ohne Rechtsträgerwechsel und den Wechsel der Rechtsform, bei dem Verträge auf die neue Gesellschaft übergehen müssen.`,
      },
      {
        titel: "Was in die Mitteilung über Adressänderung und Umfirmierung gehört",
        text: `Geschäftspartner brauchen alles, was ihre Buchhaltung für die Stammdatenänderung verlangt, in einem Dokument:

- Betreff mit Art der Änderung und dem Datum, ab dem sie gilt
- deine Kunden- oder Lieferantennummer beim Empfänger
- Gegenüberstellung bisher und neu: Firma, Rechtsform, Anschrift, Handelsregister, Steuernummer, USt-IdNr., Telefon, E-Mail, Website
- Variante A für Adress- oder Namensänderung mit der Klarstellung, dass der Rechtsträger und alle Verträge unverändert bleiben
- Variante B für den Rechtsformwechsel mit Vertragseintritt, Bitte um Zustimmung, neuer Steuernummer und Bankverbindung sowie der Abgrenzung, welche Leistungen auf welche Firma zu fakturieren sind
- konkrete Bitten: Stammdaten aktualisieren, Rechnungen ab Stichtag auf die neue Firma, Schriftverkehr nur noch an die neue Anschrift
- Zusatzbausteine für Banken und Finanzamt
- Nachsendefrist, Ansprechpartner und Anlagen wie Handelsregisterauszug und Gewerbeummeldung
- Unterschrift und bei Rechtsformwechsel ein Gegenzeichnungsfeld für die Vertragsübernahme

Die Gegenzeichnung ist bei Variante B der wichtigste Baustein, weil ein Vertrag nicht einseitig auf eine neue Gesellschaft übertragen werden kann.`,
      },
      {
        titel: "Vorlage ausfüllen: Schritt für Schritt zur Mitteilung",
        text: `Warte, bis die Änderung wirksam bzw. eingetragen ist: Bei GmbH und UG wird sie erst mit der Eintragung im Handelsregister wirksam, bei OHG, KG und e. K. wartest du die Eintragung ab, damit du den Auszug beilegen kannst, beim Einzelunternehmen ohne Eintrag die Gewerbeummeldung. Trage dann im Kopf die neuen Firmendaten ein und wähle im Betreff die Art der Änderung. Fülle die Gegenüberstellung vollständig aus; schreibe bei unveränderten Werten ausdrücklich „unverändert“, damit der Empfänger nichts versehentlich überschreibt.

Entscheide dich zwischen Variante A und B und lösche die andere; bei Variante B trägst du den Stichtag ein, ab dem Leistungen auf die neue Gesellschaft zu berechnen sind. Passe die Bitten an und behalte bei Rechtsformwechsel die Zeile zur Gegenzeichnung. Verwende die Zusatzbausteine nur in den Exemplaren an Bank und Finanzamt. Nenne die Nachsendefrist und einen Ansprechpartner. Erstelle aus der Vorlage einen Serienbrief oder eine E-Mail mit PDF-Anhang, verschicke sie an alle Partner und führe eine Liste, wer bestätigt und bei Variante B gegengezeichnet hat.`,
      },
      {
        titel: "Typische Fehler bei Umfirmierung und Adressänderung",
        text: `Erstens: zu früh verschicken. Wer die neue GmbH ankündigt, bevor sie im Handelsregister steht, erzeugt Rechnungen auf eine Gesellschaft, die noch nicht existiert. Zweitens: Lieferanten nicht ausdrücklich zur Umstellung auffordern. Rechnungen auf die alte Firma nach dem Stichtag enthalten einen falschen Leistungsempfänger und gefährden den Vorsteuerabzug; du musst dann jede Rechnung korrigieren lassen. Drittens: beim Rechtsformwechsel annehmen, Verträge gingen automatisch über. Einzelunternehmen und GbR haben keinen gesetzlichen Gesamtübergang; ohne Zustimmung des Partners bleibt der alte Vertragspartner verpflichtet.

Viertens: nur die Geschäftspartner informieren und Behörden vergessen. Gewerbeamt, Finanzamt, IHK oder HWK, Berufsgenossenschaft, Impressum, Datenschutzerklärung, Marktplätze, Google-Unternehmensprofil, Domain-Registrar und Versicherungen müssen ebenfalls aktualisiert werden. Fünftens: keinen Nachsendeauftrag einrichten und Einschreiben vom Finanzamt verpassen. Sechstens: SEPA-Mandate und Lastschriften vergessen, die auf das alte Konto laufen, sodass Zahlungen platzen.`,
      },
      {
        titel: "Rechtliche Grundlagen: § 31 HGB, § 137 AO, § 14 GewO und § 14 UStG",
        text: `Änderungen der Firma, ihres Sitzes und ihrer Inhaber sind nach § 31 HGB zur Eintragung in das Handelsregister anzumelden; bei der GmbH wird eine Satzungsänderung wie ein neuer Name oder Sitz nach § 54 Abs. 3 GmbHG erst mit der Eintragung wirksam. Die Gewerbeummeldung bei Verlegung des Betriebs innerhalb der Gemeinde und die An- und Abmeldung bei Verlegung in eine andere Gemeinde folgen aus § 14 GewO. Gesellschaften und andere Steuerpflichtige, die keine natürlichen Personen sind, müssen dem Finanzamt nach § 137 AO unter anderem Rechtsformänderungen und Sitzverlegungen binnen eines Monats anzeigen; bei Gründung einer neuen Gesellschaft ist nach § 138 Abs. 1b und Abs. 4 AO der Fragebogen zur steuerlichen Erfassung innerhalb eines Monats elektronisch zu übermitteln.

Rechnungen müssen nach § 14 Abs. 4 Nr. 1 UStG den vollständigen Namen und die Anschrift des Leistungsempfängers enthalten, sonst ist der Vorsteuerabzug nach § 15 UStG gefährdet. Die Übernahme eines Vertrags durch eine neue Gesellschaft ist eine Vertragsübernahme, die der Zustimmung aller Beteiligten bedarf; für die Schuldübernahme gelten §§ 414, 415 BGB. Impressumsangaben müssen nach § 5 DDG ständig verfügbar und damit aktuell sein.`,
      },
      {
        titel: "Wann die Mitteilung allein nicht reicht",
        text: `Die Vorlage informiert deine Partner; die Änderung selbst musst du vorher an den richtigen Stellen bewirken. Umfirmierung und Sitzverlegung einer GmbH oder UG erfordern einen notariell beurkundeten Gesellschafterbeschluss und die notariell beglaubigte Anmeldung zum Handelsregister, die der Notar einreicht. Der Wechsel vom Einzelunternehmen oder der GbR in eine GmbH ist entweder eine Neugründung mit Einbringung des Betriebs oder eine Umwandlung nach dem Umwandlungsgesetz; beides betrifft Steuern (Aufdeckung stiller Reserven, Buchwertfortführung), Haftung und Arbeitsverhältnisse und gehört in die Hände von Steuerberater und Notar.

Bei vielen laufenden Verträgen kann eine Ausgliederung nach dem Umwandlungsgesetz den Gesamtübergang ermöglichen, kostet aber Notar und Register. Banken verlangen für die Umstellung des Kontos eigene Formulare, Handelsregisterauszug und Gesellschafterliste, oft mit persönlicher Legitimation. GründerX ist Software und keine Rechts- oder Steuerberatung; die Vorlage spart dir den Schreibaufwand, nicht die Beratung zum Rechtsformwechsel.`,
      },
    ],
  text: `[Neue Firma]
[Straße]
[PLZ Ort]
[Telefon], [E-Mail-Adresse]

[Firma des Geschäftspartners]
[Ansprechpartner / Abteilung, z. B. Buchhaltung oder Kundenbetreuung]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Mitteilung: [Umfirmierung / Änderung der Geschäftsadresse / Änderung der Rechtsform] mit Wirkung zum [Datum]
[Unsere Kunden- oder Lieferantennummer bei Ihnen: [Nummer]]

Sehr geehrte Damen und Herren,

wir informieren Sie darüber, dass sich unsere Unternehmensdaten mit Wirkung zum [Datum] ändern.

Bisher:
   Firma: [bisheriger Name]
   Rechtsform: [z. B. Einzelunternehmen / GbR / UG (haftungsbeschränkt)]
   Anschrift: [Straße, PLZ Ort]
   [Handelsregister: Amtsgericht [Ort], [HRA / HRB] [Nummer]]
   Steuernummer: [Nummer]
   [USt-IdNr.: [Nummer]]

Neu ab [Datum]:
   Firma: [neuer Name]
   Rechtsform: [z. B. GmbH]
   Anschrift: [Straße, PLZ Ort]
   [Handelsregister: Amtsgericht [Ort], HRB [Nummer]]
   Steuernummer: [neue Nummer / unverändert]
   [USt-IdNr.: [neue Nummer / unverändert]]
   Telefon: [Nummer / unverändert]
   E-Mail: [Adresse / unverändert]
   Website: [Domain]

[Variante A – Adress- oder Namensänderung: Der Rechtsträger bleibt derselbe. Alle bestehenden Verträge, Bestellungen und Vereinbarungen gelten unverändert fort. Ansprechpartner, Bankverbindung ([IBAN], [Bank]), Steuernummer und USt-IdNr. bleiben unverändert.]

[Variante B – Rechtsformwechsel: Das Unternehmen wird ab dem [Datum] von der neu gegründeten [neue Firma] GmbH fortgeführt. Die GmbH tritt in alle bestehenden Verträge mit Ihnen ein. Soweit für die Vertragsübernahme Ihre Zustimmung erforderlich ist, bitten wir Sie, diese durch Gegenzeichnung dieses Schreibens zu erteilen. Die neue Gesellschaft hat eine eigene Steuernummer und USt-IdNr. (siehe oben) sowie eine neue Bankverbindung: [IBAN], [Bank]. Rechnungen für Leistungen ab dem [Datum] stellen Sie bitte auf die neue Firma aus; Rechnungen für Leistungen bis zum [Datum] weiterhin auf die bisherige Firma.]

Wir bitten Sie,
– Ihre Stammdaten sowie Rechnungs- und Lieferadressen entsprechend zu aktualisieren,
– Rechnungen ab dem [Datum] auf die neue Firma und Anschrift auszustellen (§ 14 Abs. 4 UStG),
– Schriftverkehr und Lieferungen ab dem [Datum] ausschließlich an die neue Anschrift zu richten,
– [bei Rechtsformwechsel: Ihre Zustimmung zur Vertragsübernahme durch Gegenzeichnung zu bestätigen].

[Zusatz für Banken: Bitte aktualisieren Sie den Kontoinhaber, die Korrespondenzadresse, die Kartendaten und die hinterlegten Vertretungsberechtigten. Den aktuellen Handelsregisterauszug und die Gesellschafterliste fügen wir bei.]

[Zusatz für das Finanzamt: Wir bitten um Kenntnisnahme der Änderung (§ 137 AO) und Zuordnung zur Steuernummer [Nummer]. Für die neue Gesellschaft haben wir den Fragebogen zur steuerlichen Erfassung am [Datum] über ELSTER übermittelt.]

Post an die bisherige Anschrift erreicht uns über einen Nachsendeauftrag noch bis zum [Datum]. Für Rückfragen steht Ihnen [Vorname Nachname] unter [Telefon / E-Mail-Adresse] zur Verfügung.

Anlagen:
– [Handelsregisterauszug vom [Datum]]
– [Gewerbeummeldung / Gewerbeanmeldung vom [Datum]]
– [Bestätigung der USt-IdNr. des Bundeszentralamts für Steuern]

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[Funktion, z. B. „Geschäftsführer der [neue Firma] GmbH“]


[Bei Rechtsformwechsel – Zustimmung zur Vertragsübernahme:
Wir stimmen dem Eintritt der [neue Firma] GmbH in den Vertrag [Bezeichnung / Vertragsnummer] mit Wirkung zum [Datum] zu.

[Ort], den [Datum]


______________________________
[Firma des Geschäftspartners], [Vorname Nachname, Funktion]]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
