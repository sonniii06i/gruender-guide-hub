// Inhalt der Vorlage „buergschaft“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../finanzen.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann eine Bürgschaftserklärung verlangt wird",
        text: `Bürgschaften begegnen Gründern meist von der unangenehmen Seite: Der Vermieter der ersten Büroräume will die persönliche Bürgschaft des Geschäftsführers, weil die GmbH noch keine Bilanz hat. Der Lieferant gewährt Zahlungsziel nur, wenn jemand bürgt. Die Bank oder ein privater Darlehensgeber verlangt einen Bürgen für den Gründungskredit. Umgekehrt kannst du als Gläubiger eine Bürgschaft verlangen, wenn du einem Kunden Lieferantenkredit einräumst oder einer jungen Firma Geld leihst.

In allen Fällen verspricht der Bürge, für die Schuld eines anderen einzustehen, wenn dieser nicht zahlt. Die Vorlage bildet die im Geschäftsverkehr übliche Form ab: selbstschuldnerisch, mit Höchstbetrag, mit klarer Beschreibung der Hauptschuld und mit Kündigungs- und Ausstiegsregeln für den Bürgen.`,
      },
      {
        titel: "Was muss in eine selbstschuldnerische Bürgschaft?",
        text: `Eine Bürgschaft ohne klare Grenzen ist ein Blankoscheck. Die Vorlage setzt deshalb an jeder Stelle Grenzen:

- Die Hauptschuld mit Vertrag, Datum und den gesicherten Ansprüchen; andere Ansprüche sind ausdrücklich nicht gesichert (§ 1)
- Den Höchstbetrag in Zahlen und Worten, in dem Zinsen und Kosten enthalten sind (§ 2 Abs. 2)
- Keine Haftung für Erweiterungen des Hauptvertrags ohne Zustimmung des Bürgen (§ 2 Abs. 3)
- Selbstschuldnerische Haftung mit Verzicht auf die Einrede der Vorausklage, aber keine Bürgschaft auf erstes Anfordern (§ 3)
- Die Einreden des Hauptschuldners, die dem Bürgen erhalten bleiben, und Informationspflichten des Gläubigers bei Verzug (§ 4)
- Schriftliche Inanspruchnahme, Zahlungsfrist und den gesetzlichen Forderungsübergang auf den Bürgen (§ 5)
- Befristung oder Kündigungsrecht sowie das Ende der Bürgschaft beim Ausscheiden aus der Gesellschaft (§ 6)
- Einen Risikohinweis, den der Bürge bestätigt (§ 7)
- Schriftform und eigenhändige Unterschrift (§ 8)

Als Gläubiger brauchst du vor allem § 1 bis § 3, als Bürge solltest du auf § 2 Abs. 2, § 4 und § 6 bestehen.`,
      },
      {
        titel: "Bürgschaft Muster ausfüllen: Hauptschuld, Höchstbetrag, Laufzeit",
        text: `Trage Bürge, Gläubiger und Hauptschuldner mit Anschrift ein. In § 1 beschreibst du den Hauptvertrag und streichst die nicht passenden Alternativen, etwa Mietvertrag oder Lieferantenvertrag. In § 2 Abs. 2 setzt du den Höchstbetrag ein; als Bürge rechne durch, ob du diesen Betrag im Ernstfall aufbringen kannst. In § 4 Abs. 2 legst du fest, ab wie vielen Tagen Verzug der Gläubiger den Bürgen informieren muss. In § 5 Abs. 2 steht die Zahlungsfrist nach Inanspruchnahme.

In § 6 Abs. 1 wählst du zwischen Befristung mit Datum und unbefristeter Bürgschaft mit Kündigungsfrist; bei einer Gesellschafter-Bürgschaft aktivierst du Abs. 3, damit die Bürgschaft mit dem Ausscheiden endet. In § 7 ergänzt du das wirtschaftliche Eigeninteresse des Bürgen, zum Beispiel die Beteiligungsquote. Der Bürge unterschreibt eigenhändig auf Papier, der Gläubiger nimmt an.`,
      },
      {
        titel: "Typische Fehler bei Bürgschaften und wie du sie vermeidest",
        text: `Fehler eins: Die Bürgschaft wird per E-Mail, Scan oder in einem Vertragsanhang ohne eigene Unterschrift erklärt. Für Privatpersonen ist das nichtig; nur Kaufleute können formfrei bürgen. Fehler zwei: kein Höchstbetrag oder ein Höchstbetrag, zu dem Zinsen und Kosten noch obendrauf kommen. Dann haftet der Bürge für alles, was sich aus der Hauptschuld entwickelt. Fehler drei: die Bürgschaft des Ehepartners oder der Eltern ohne eigenes Einkommen. Solche Bürgschaften sind nach der Rechtsprechung sittenwidrig, wenn der Bürge die Verpflichtung erkennbar nie erfüllen könnte und nur aus emotionaler Verbundenheit unterschreibt; der Gläubiger steht dann ohne Sicherheit da.

Fehler vier: Der Geschäftsführer bürgt unbefristet, scheidet Jahre später aus der GmbH aus und bürgt weiter für neue Verbindlichkeiten. Die Vorlage sieht deshalb das Ende beim Ausscheiden vor. Fehler fünf: Der Gläubiger erweitert den Kredit, ohne den Bürgen zu fragen, und wundert sich, dass die Bürgschaft die Erhöhung nicht deckt.`,
      },
      {
        titel: "Rechtsgrundlagen: §§ 765 bis 777 BGB, Schriftform, Sittenwidrigkeit",
        text: `Die Bürgschaft ist in §§ 765 ff. BGB geregelt. § 766 BGB verlangt die schriftliche Erteilung der Bürgschaftserklärung und schließt die elektronische Form aus; § 350 HGB befreit Kaufleute davon. Der Umfang der Bürgschaft folgt dem jeweiligen Stand der Hauptschuld (§ 767 BGB), Erweiterungen durch Rechtsgeschäft des Hauptschuldners nach Übernahme binden den Bürgen nicht. Der Bürge kann die Einreden des Hauptschuldners geltend machen (§ 768 BGB) und die Zahlung verweigern, solange Anfechtung oder Aufrechnung möglich sind (§ 770 BGB).

Die Einrede der Vorausklage (§ 771 BGB) entfällt bei der selbstschuldnerischen Bürgschaft (§ 773 Abs. 1 Nr. 1 BGB). Zahlt der Bürge, geht die Forderung auf ihn über (§ 774 BGB). Eine Zeitbürgschaft erlischt mit Fristablauf, wenn der Gläubiger nicht rechtzeitig in Anspruch nimmt (§ 777 BGB). Bürgschaften finanziell krass überforderter Angehöriger sind nach § 138 BGB nichtig.`,
      },
      {
        titel: "Wann die Bürgschaftsvorlage nicht reicht",
        text: `Die Vorlage reicht für Bürgschaften im normalen Geschäftsverkehr: Miete, Lieferantenkredit, privates Darlehen, Gesellschafter-Bürgschaft gegenüber einem Geschäftspartner. Sie reicht nicht gegenüber Banken, die eigene Formulare verwenden, nicht für Bürgschaften auf erstes Anfordern, die im Bauvertrag üblich sind, und nicht für Avale und Bankbürgschaften.

Bürgschaften in sechsstelliger Höhe oder von Personen ohne eigenes Einkommen solltest du vor der Unterschrift anwaltlich prüfen lassen, auf beiden Seiten. Ob die Inanspruchnahme aus einer Bürgschaft steuerlich abziehbar ist, klärt der Steuerberater. GründerX stellt die Vorlage als Werkzeug bereit, keine Rechtsberatung.`,
      },
    ],
  text: `Bürgschaftserklärung (selbstschuldnerische Höchstbetragsbürgschaft)

Bürge:
[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
– nachfolgend „Bürge“ –

Gläubiger:
[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Gläubiger“ –

Hauptschuldner:
[Firma / Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Hauptschuldner“ –

§ 1 Hauptschuld
(1) Zwischen dem Gläubiger und dem Hauptschuldner besteht [Darlehensvertrag vom [Datum] über [Betrag] EUR / Mietvertrag vom [Datum] über die Räume [Anschrift] / Lieferantenvertrag vom [Datum] mit einem Zahlungsziel von [Tage] Tagen / Rahmenvereinbarung vom [Datum]] (nachfolgend „Hauptvertrag“).
(2) Gesichert werden alle Ansprüche des Gläubigers gegen den Hauptschuldner aus dem Hauptvertrag auf Zahlung von [Darlehensrückzahlung, Zinsen und Kosten / Miete, Nebenkosten und Schadensersatz / Kaufpreis für Lieferungen] einschließlich Verzugszinsen und Kosten der Rechtsverfolgung. Andere Ansprüche des Gläubigers gegen den Hauptschuldner sind nicht gesichert.
(3) Der Bürge erklärt, den Hauptvertrag zu kennen; eine Kopie wurde ihm ausgehändigt.

§ 2 Bürgschaftserklärung und Höchstbetrag
(1) Der Bürge übernimmt hiermit gegenüber dem Gläubiger die Bürgschaft für die Erfüllung der in § 1 Abs. 2 bezeichneten Verbindlichkeiten des Hauptschuldners (§ 765 BGB).
(2) Die Haftung des Bürgen ist auf einen Höchstbetrag von [Betrag] EUR (in Worten: [Betrag in Worten] Euro) begrenzt. Zinsen, Kosten und sonstige Nebenforderungen sind in diesem Höchstbetrag enthalten und erhöhen ihn nicht.
(3) Die Bürgschaft gilt nicht für Erweiterungen des Hauptvertrags, die ohne schriftliche Zustimmung des Bürgen vereinbart werden, insbesondere nicht für die Erhöhung des Darlehens oder des Kreditrahmens.

§ 3 Selbstschuldnerische Haftung
(1) Der Bürge haftet selbstschuldnerisch. Er verzichtet auf die Einrede der Vorausklage (§§ 771, 773 Abs. 1 Nr. 1 BGB). Der Gläubiger kann den Bürgen daher in Anspruch nehmen, sobald der Hauptschuldner eine fällige Verbindlichkeit trotz Mahnung nicht erfüllt, ohne zuvor gegen den Hauptschuldner gerichtlich vorgehen oder vollstrecken zu müssen.
(2) Der Bürge haftet nicht auf erstes Anfordern. Der Gläubiger weist bei der Inanspruchnahme die Fälligkeit und den Rückstand der Hauptschuld nach.

§ 4 Einreden des Bürgen und Informationsrechte
(1) Dem Bürgen stehen die Einreden des Hauptschuldners zu, auch wenn der Hauptschuldner auf sie verzichtet (§ 768 BGB). Er kann die Zahlung verweigern, solange der Hauptschuldner das der Verbindlichkeit zugrunde liegende Rechtsgeschäft anfechten oder der Gläubiger sich durch Aufrechnung gegen eine fällige Forderung des Hauptschuldners befriedigen kann (§ 770 BGB).
(2) Der Gläubiger informiert den Bürgen unverzüglich, wenn der Hauptschuldner mit einer Zahlung länger als [z. B. 30] Tage in Verzug ist, wenn er den Hauptvertrag kündigt oder wenn ihm bekannt wird, dass über das Vermögen des Hauptschuldners ein Insolvenzverfahren beantragt wurde.
(3) Der Bürge kann vom Gläubiger jederzeit Auskunft über den aktuellen Stand der gesicherten Verbindlichkeiten verlangen.

§ 5 Inanspruchnahme und Zahlung
(1) Die Inanspruchnahme aus der Bürgschaft erfolgt schriftlich unter Angabe des geforderten Betrags und seiner Zusammensetzung.
(2) Der Bürge zahlt innerhalb von [z. B. 14] Tagen nach Zugang der Inanspruchnahme auf das Konto des Gläubigers, IBAN [IBAN] bei der [Bank].
(3) Zahlt der Bürge, geht die Forderung des Gläubigers gegen den Hauptschuldner samt den dafür bestellten Sicherheiten in Höhe der Zahlung auf den Bürgen über (§ 774 BGB). Der Gläubiger übergibt dem Bürgen auf Verlangen die hierfür erforderlichen Unterlagen.

§ 6 Dauer, Erlöschen und Kündigung
(1) Die Bürgschaft ist [befristet bis zum [Datum]; sie erlischt mit Ablauf dieses Tages, wenn der Gläubiger den Bürgen nicht bis dahin schriftlich in Anspruch genommen hat (§ 777 BGB) / unbefristet].
(2) Der Bürge kann eine unbefristete Bürgschaft mit einer Frist von [z. B. 3] Monaten schriftlich kündigen. Nach Wirksamwerden der Kündigung haftet er nur noch für Verbindlichkeiten, die bis zu diesem Zeitpunkt entstanden sind.
(3) [Optional bei Gesellschafter-Bürgschaft: Die Bürgschaft endet außerdem, sobald der Bürge als Gesellschafter oder Geschäftsführer aus dem Hauptschuldner ausscheidet und dies dem Gläubiger schriftlich mitgeteilt hat; für Verbindlichkeiten, die danach entstehen, haftet der Bürge nicht.]
(4) Die Bürgschaft erlischt mit der Hauptschuld (§ 767 BGB). Der Gläubiger gibt die Bürgschaftsurkunde nach vollständiger Erfüllung der gesicherten Verbindlichkeiten an den Bürgen zurück.

§ 7 Risikohinweis
Der Bürge bestätigt, auf Folgendes hingewiesen worden zu sein: Er haftet mit seinem gesamten Privatvermögen bis zum Höchstbetrag, auch wenn er aus dem Hauptvertrag selbst keinen Vorteil hat. Der Gläubiger kann ihn ohne vorherige Vollstreckung gegen den Hauptschuldner in Anspruch nehmen. Der Bürge erklärt, dass er nach seinen Einkommens- und Vermögensverhältnissen in der Lage ist, den Höchstbetrag aufzubringen, und die Bürgschaft aus eigenem wirtschaftlichen Interesse [an der Finanzierung der Gesellschaft, an der er mit [Anteil] % beteiligt ist / an dem Hauptvertrag] übernimmt.

§ 8 Schlussbestimmungen
(1) Diese Bürgschaft bedarf der Schriftform und der eigenhändigen Unterschrift des Bürgen (§ 766 BGB). Änderungen bedürfen ebenfalls der Schriftform.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Bürgschaft im Übrigen wirksam.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(4) Der Bürge hat eine Abschrift dieser Erklärung und eine Kopie des Hauptvertrags erhalten.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Bürge
(eigenhändige Unterschrift)


Angenommen:

______________________________
[Firma / Vorname Nachname], Gläubiger

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
