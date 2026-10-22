// Inhalt der Vorlage „abtretungserklaerung-forderung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../finanzen.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Abtretungserklärung brauchst",
        text: `Eine Forderung ist Vermögen, und Vermögen kann man übertragen. Genau das macht die Abtretung: Der bisherige Gläubiger (Zedent) überträgt seine Forderung gegen einen Schuldner auf einen neuen Gläubiger (Zessionar). Gründer brauchen das in vier typischen Situationen. Du verkaufst eine offene Kundenforderung, weil du das Geld jetzt brauchst und nicht in 60 Tagen. Ein Darlehensgeber verlangt Forderungen als Sicherheit für sein Darlehen. Ein Projekt oder Kundenstamm wechselt den Inhaber, und die Zahlungsansprüche sollen mitgehen.

Oder ein Erstattungsanspruch gegen Versicherung oder Plattform soll an die Person gehen, die den Schaden tatsächlich getragen hat. Die Vorlage deckt Forderungskauf, Sicherungsabtretung und Abtretung an Erfüllungs statt ab und bringt die Anzeige an den Schuldner gleich mit.`,
      },
      {
        titel: "Was muss in eine Abtretungserklärung nach § 398 BGB?",
        text: `Die Abtretung selbst ist formfrei, aber ohne Schriftstück kannst du weder dem Schuldner noch einem Gericht beweisen, wem die Forderung gehört. Die Vorlage regelt:

- Die abgetretene Forderung mit Schuldner, Betrag, Rechtsgrund und Fälligkeit; bei künftigen Forderungen den Zeitraum und einen Höchstbetrag (§ 1)
- Die Abtretungserklärung und die Annahme sowie den Übergang von Zinsen, Sicherheiten und Eigentumsvorbehalt (§ 2)
- Die Versicherung, dass die Forderung nicht schon anderweitig abgetreten oder gepfändet ist und kein Abtretungsverbot besteht (§ 2 Abs. 3)
- Die Gegenleistung: Kaufpreis, Sicherungszweck mit Rückabtretung oder Tilgung einer eigenen Schuld (§ 3)
- Die Gewährleistung für den Bestand der Forderung und den Ausschluss der Haftung für die Zahlungsfähigkeit des Schuldners (§ 4)
- Anzeige an den Schuldner, Übergabe der Unterlagen, Weiterleitung von Zahlungen und Datenschutz (§ 5)
- Das Muster der Abtretungsanzeige, das der Zedent unterschreibt (Anlage)

Die Anzeige ist kein Formalismus: Bis der Schuldner von der Abtretung weiß, darf er weiter an den alten Gläubiger zahlen.`,
      },
      {
        titel: "Abtretung Muster ausfüllen: Zedent, Zessionar, Schuldner",
        text: `Setze in den Kopf Zedent und Zessionar mit Anschrift ein. In § 1 beschreibst du die Forderung so, dass sie eindeutig ist: Schuldner, Rechnungsnummer, Datum, Betrag, Fälligkeit. Willst du künftige Forderungen abtreten, nutzt du die Alternative in § 1 Abs. 3 und grenzt sie nach Vertrag, Zeitraum und Höchstbetrag ein. In § 2 Abs. 3 prüfst du den Vertrag mit dem Schuldner auf ein Abtretungsverbot; liegt eines vor, brauchst du dessen Zustimmung und trägst das Datum ein.

In § 3 wählst du Variante A, B oder C und streichst die anderen beiden. In § 4 Abs. 2 entscheidest du, ob der Zedent das Ausfallrisiko ganz oder bis zu einem Betrag übernimmt; ohne diese Alternative trägt es der Zessionar. In § 5 wählst du zwischen sofortiger und stiller Abtretung. Fülle zuletzt die Anlage aus, lass sie vom Zedenten unterschreiben und schick sie nachweisbar an den Schuldner.`,
      },
      {
        titel: "Typische Fehler bei der Forderungsabtretung",
        text: `Fehler Nummer eins: Die Anzeige unterbleibt oder kommt zu spät. Zahlt der Schuldner in der Zwischenzeit an den alten Gläubiger, ist er frei (§ 407 BGB), und der Zessionar muss sich das Geld beim Zedenten holen. Fehler zwei: Das Abtretungsverbot im Kundenvertrag wird übersehen. Zwischen Kaufleuten ist die Abtretung einer Geldforderung trotz Verbots wirksam (§ 354a HGB), der Schuldner darf aber weiter an den Zedenten zahlen; gegenüber Verbrauchern oder Nichtkaufleuten ist die Abtretung bei einem Verbot unwirksam.

Fehler drei: Der Käufer prüft die Forderung nicht. Alle Einwendungen, die der Schuldner gegen den Zedenten hatte, behält er auch gegen den Zessionar (§ 404 BGB), etwa Mängel, Skonto oder Aufrechnung. Fehler vier: unbestimmte Beschreibung bei Globalabtretungen („alle Forderungen“ ohne Kundenliste oder Zeitraum); dann ist die Abtretung unwirksam, weil niemand weiß, welche Forderung gemeint ist.`,
      },
      {
        titel: "Rechtsgrundlagen: §§ 398 bis 409 BGB, § 354a HGB, Umsatzsteuer",
        text: `Die Abtretung regelt § 398 BGB als Vertrag zwischen altem und neuem Gläubiger; der Schuldner muss weder zustimmen noch informiert werden, damit sie wirksam wird. Nebenrechte wie Zinsen, Bürgschaften und Hypotheken gehen nach § 401 BGB mit über. Der Zedent muss Auskunft erteilen und Urkunden herausgeben (§§ 402, 403 BGB). Der Schuldner behält seine Einwendungen (§ 404 BGB) und kann unter den Voraussetzungen des § 406 BGB aufrechnen.

Solange er von der Abtretung nichts weiß, zahlt er befreiend an den Zedenten (§ 407 BGB); hat der Zedent die Abtretung angezeigt, muss er sie gegen sich gelten lassen (§ 409 BGB). Ein vertragliches Abtretungsverbot (§ 399 BGB) wird zwischen Kaufleuten durch § 354a HGB entschärft. Umsatzsteuerlich ist die Abtretung der Forderung selbst steuerfrei (§ 4 Nr. 8 Buchstabe c UStG); die ursprüngliche Leistung bleibt steuerpflichtig wie gehabt.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht: Factoring, Inkasso, Globalzession",
        text: `Die Vorlage reicht für die einzelne Abtretung zwischen zwei Unternehmen oder Personen. Sie reicht nicht für Factoring-Verträge mit laufendem Forderungsankauf, für Globalzessionen an Banken, die mit dem verlängerten Eigentumsvorbehalt von Lieferanten kollidieren können, oder für die Abtretung von Lohn- und Gehaltsansprüchen mit Pfändungsgrenzen.

Wer regelmäßig fremde Forderungen einzieht oder ankauft, braucht unter Umständen eine Registrierung nach dem Rechtsdienstleistungsgesetz oder eine Erlaubnis nach dem KWG; das solltest du vorher anwaltlich klären. Beim Verkauf mit Abschlag stellt sich steuerlich die Frage nach Forderungsverlust und Umsatzsteuerberichtigung beim Zedenten, die der Steuerberater beantwortet. GründerX bietet die Vorlage als Werkzeug an, nicht als Rechts- oder Steuerberatung.`,
      },
    ],
  text: `Abtretungserklärung (Forderungsabtretung)

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Zedent“ (bisheriger Gläubiger) –

und

[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Zessionar“ (neuer Gläubiger) –

§ 1 Abgetretene Forderung
(1) Der Zedent hat gegen [Firma / Vorname Nachname], [Straße, PLZ Ort] (nachfolgend „Schuldner“) eine Forderung in Höhe von [Betrag] EUR aus [Rechtsgrund, z. B. „Rechnung Nr. [Nummer] vom [Datum] über [Lieferung/Leistung]“ / „Vertrag vom [Datum]“], fällig seit dem [Datum].
(2) Die Forderung umfasst die Hauptforderung sowie [aufgelaufene Verzugszinsen seit dem [Datum] / Mahnkosten in Höhe von [Betrag] EUR].
(3) [Alternative bei künftigen Forderungen: Abgetreten werden alle gegenwärtigen und künftigen Forderungen des Zedenten gegen den Schuldner aus [Vertrag/Geschäftsbeziehung], die bis zum [Datum] entstehen, höchstens jedoch bis zu einem Gesamtbetrag von [Betrag] EUR.]

§ 2 Abtretung
(1) Der Zedent tritt die in § 1 bezeichnete Forderung hiermit an den Zessionar ab. Der Zessionar nimmt die Abtretung an (§ 398 BGB).
(2) Mit der Forderung gehen die Neben- und Vorzugsrechte, insbesondere Zinsansprüche, Sicherheiten, Bürgschaften und ein etwaiger Eigentumsvorbehalt, auf den Zessionar über (§ 401 BGB).
(3) Der Zedent versichert, dass die Forderung nicht bereits an einen Dritten abgetreten, verpfändet oder gepfändet ist und dass kein vertragliches Abtretungsverbot entgegensteht. [Alternative: Der Vertrag mit dem Schuldner enthält ein Abtretungsverbot; der Schuldner hat der Abtretung mit Schreiben vom [Datum] zugestimmt.]

§ 3 Gegenleistung
[Variante A – Forderungskauf: Der Zessionar zahlt für die Abtretung einen Kaufpreis von [Betrag] EUR, fällig am [Datum] auf das Konto des Zedenten, IBAN [IBAN].]
[Variante B – Abtretung zur Sicherheit: Die Abtretung erfolgt zur Sicherung der Forderung des Zessionars gegen den Zedenten aus [Darlehensvertrag vom [Datum]] in Höhe von [Betrag] EUR. Nach vollständiger Tilgung der gesicherten Forderung tritt der Zessionar die Forderung an den Zedenten zurück. Der Zedent bleibt bis auf Widerruf zur Einziehung im eigenen Namen berechtigt.]
[Variante C – Abtretung an Erfüllungs statt: Die Abtretung erfolgt zur Tilgung der Forderung des Zessionars gegen den Zedenten aus [Grund] in Höhe von [Betrag] EUR. Mit der Abtretung ist diese Forderung erloschen.]

§ 4 Gewährleistung
(1) Der Zedent steht dafür ein, dass die Forderung besteht, ihm zusteht, in der angegebenen Höhe fällig und nicht verjährt ist, nicht mit Rechten Dritter belastet ist und dass dem Schuldner keine ihm bekannten Einwendungen oder Aufrechnungsmöglichkeiten zustehen (Haftung für den Bestand).
(2) Der Zedent haftet nicht für die Zahlungsfähigkeit des Schuldners. Das Risiko, dass der Schuldner nicht zahlt, trägt der Zessionar. [Alternative: Der Zedent übernimmt das Ausfallrisiko bis zur Höhe von [Betrag] EUR; bleibt der Schuldner trotz Mahnung und Fristsetzung länger als [z. B. 90] Tage nach Fälligkeit säumig, kann der Zessionar vom Zedenten Rückzahlung des Kaufpreises gegen Rückabtretung verlangen.]
(3) Stellt sich heraus, dass die Forderung ganz oder teilweise nicht besteht, hat der Zedent dem Zessionar den Kaufpreis insoweit zurückzuzahlen und entstandene Kosten zu ersetzen.

§ 5 Anzeige, Unterlagen und Einziehung
(1) Der Zedent zeigt dem Schuldner die Abtretung unverzüglich schriftlich an (Muster in der Anlage) und übermittelt dem Zessionar einen Nachweis über den Zugang. [Alternative bei stiller Abtretung: Die Abtretung wird dem Schuldner zunächst nicht angezeigt. Der Zessionar darf die Anzeige vornehmen, sobald [Bedingung, z. B. „der Zedent mit der gesicherten Forderung in Verzug gerät“].]
(2) Der Zedent übergibt dem Zessionar alle zur Geltendmachung erforderlichen Unterlagen, insbesondere Vertrag, Rechnung, Lieferschein, Mahnungen und Schriftverkehr, und erteilt die nötigen Auskünfte (§§ 402, 403 BGB).
(3) Zahlungen, die der Zedent nach der Abtretung vom Schuldner erhält, leitet er unverzüglich an den Zessionar weiter.
(4) Personenbezogene Daten des Schuldners werden nur weitergegeben, soweit das zur Geltendmachung der Forderung erforderlich ist (Art. 6 Abs. 1 Buchstabe f DSGVO).

§ 6 Schlussbestimmungen
(1) Änderungen dieser Vereinbarung bedürfen der Schriftform. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(4) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Firma / Vorname Nachname], Zedent


______________________________
[Firma / Vorname Nachname], Zessionar


Anlage: Muster der Abtretungsanzeige an den Schuldner

[Firma / Vorname Nachname des Zedenten]
[Straße, PLZ Ort]

[Firma / Vorname Nachname des Schuldners]
[Straße, PLZ Ort]

[Ort], den [Datum]

Betreff: Anzeige der Abtretung – [Rechnung Nr. [Nummer] vom [Datum] / Vertrag vom [Datum]]

Sehr geehrte Damen und Herren,

hiermit zeigen wir Ihnen an, dass wir unsere Forderung gegen Sie aus [Rechnung Nr. [Nummer] vom [Datum]] in Höhe von [Betrag] EUR [nebst Zinsen und Kosten] mit Wirkung zum [Datum] an

[Firma / Vorname Nachname des Zessionars], [Straße, PLZ Ort]

abgetreten haben (§ 398 BGB).

Bitte leisten Sie Zahlungen auf diese Forderung ab sofort ausschließlich an den neuen Gläubiger auf das Konto IBAN [IBAN des Zessionars] bei der [Bank], Verwendungszweck „[Rechnungsnummer]“. Zahlungen an uns haben ab Zugang dieses Schreibens keine schuldbefreiende Wirkung mehr (§§ 407, 409 BGB).

Für Rückfragen zur Forderung wenden Sie sich bitte an [Ansprechpartner des Zessionars, Telefon, E-Mail].

Mit freundlichen Grüßen

______________________________
[Firma / Vorname Nachname], Zedent

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
