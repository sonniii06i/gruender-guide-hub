// Inhalt der Vorlage „wandeldarlehen“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../gesellschaft.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann brauchst du einen Wandeldarlehensvertrag?",
        text: `Ein Business Angel will 50.000 EUR in dein Start-up stecken, aber niemand kann heute seriös sagen, was die Gesellschaft wert ist. Eine Kapitalerhöhung beim Notar würde Wochen dauern und eine Bewertung erzwingen. Das Wandeldarlehen (Convertible Loan) löst beides: Das Geld fließt sofort als Darlehen, und die Bewertung wird auf die nächste Finanzierungsrunde verschoben, bei der das Darlehen in Anteile gewandelt wird.

Die Vorlage passt für Frühphasen-Investments von Angels, Family und Friends oder Förderinvestoren, für Brückenfinanzierungen bis zur Seed-Runde und für Gründer, die ihre Anteilsstruktur bis zur ersten institutionellen Runde einfach halten wollen. Sie regelt Betrag, Zins, Laufzeit, die Pflichtwandlung bei einer qualifizierten Runde, das Wahlrecht bei Fälligkeit und Exit, Discount, Cap, die Durchführung der Wandlung und den Rangrücktritt. Die Gesellschafter treten bei, damit die Wandlung später nicht an einer fehlenden Stimme scheitert.`,
      },
      {
        titel: "Was muss in einen Convertible Loan? Die wichtigsten Klauseln",
        text: `Ein Wandeldarlehen ist nur so gut wie seine Wandlungsmechanik. Die Vorlage regelt in elf Paragraphen:

- Darlehensbetrag, Auszahlungsfrist, Verwendungszweck und Verbot von Ausschüttungen aus dem Darlehen (§ 1)
- Zinssatz, Ansammlung der Zinsen und Wahl zwischen Mitwandlung und Barzahlung (§ 2)
- Laufzeit, Ausschluss der ordentlichen Kündigung, Kündigung aus wichtigem Grund (§ 3)
- Definition der qualifizierten Finanzierungsrunde mit Mindestbetrag und die Pflichtwandlung samt Informationsfrist (§ 4)
- Wandlungsrecht bei Fälligkeit zu einer Fallback-Bewertung, beim Exit mit Prämie als Alternative und bei kleineren Kapitalerhöhungen (§ 5)
- Wandlungspreis als niedrigerer Wert aus Discount und Cap, Berechnung der Anteile, Zuzahlung in die Kapitalrücklage (§ 6)
- Durchführung: Kapitalerhöhung, Bezugsrechtsverzicht, Übernahmeerklärung, Beitritt zur Gesellschaftervereinbarung, Kosten (§ 7)
- qualifizierter Rangrücktritt, der die Wandlung unberührt lässt (§ 8)
- Informationsrechte, Zusicherungen zur Anteilsstruktur, Vertraulichkeit (§ 9)
- Übertragbarkeit und Mitwirkungspflichten der Gesellschafter mit Gesellschafterbeschluss (§ 10)
- Formklausel, Schriftform, Gerichtsstand (§ 11)

Die Anlagen Gesellschafterliste, bestehende Optionsrechte und Gesellschafterbeschluss gehören dazu, weil der Investor nur so die Verwässerung berechnen kann.`,
      },
      {
        titel: "Wandeldarlehen Muster ausfüllen und Szenarien durchrechnen",
        text: `Vor dem Ausfüllen solltet ihr die Wandlung in drei Szenarien durchrechnen: Runde über dem Cap, Runde unter dem Cap, keine Runde. Dann die Platzhalter:

- Parteien: Investor, Gesellschaft mit HRB und alle Gesellschafter mit Anteilszahl; Präambel mit Stammkapital und Anteilszahl.
- § 1: Betrag, Auszahlungsfrist, Bank und IBAN, Verwendungszweck.
- § 2: Zinssatz, üblich sind Werte zwischen 4 und 8 Prozent, und die Entscheidung, ob Zinsen mitgewandelt oder bar gezahlt werden.
- § 3: Fälligkeitstag, meist 24 bis 36 Monate nach Auszahlung.
- § 4: Mindestbetrag der qualifizierten Runde und Informationsfrist vor der Beurkundung.
- § 5: Fallback-Bewertung bei Fälligkeit und die Exit-Prämie in Prozent.
- § 6: Discount in Prozent und die Cap-Bewertung pre-money, vollverwässert. Prüfe, ob eure Beteiligungsprogramme in der Definition enthalten sein sollen.
- § 9: Berichtsfristen. § 10: Datum des Gesellschafterbeschlusses.
- § 11: Schriftform oder notarielle Beurkundung; nicht gewählte Variante löschen.

Alle Gesellschafter unterschreiben, nicht nur der Geschäftsführer. Die Word-Fassung ist für die Verhandlung mit dem Investor gedacht, das PDF für die Unterschriftenrunde. Ein Beispiel: 100.000 EUR Darlehen, Runde zu 4 Mio. EUR pre-money, Cap 3 Mio. EUR, Discount 20 Prozent. Der Discount ergibt einen Preis auf Basis 3,2 Mio., der Cap auf Basis 3 Mio.; der Investor wandelt zum Cap-Preis, weil er niedriger ist.`,
      },
      {
        titel: "Typische Fehler bei Wandeldarlehen",
        text: `Fehler eins: Cap und Discount festlegen, ohne die Verwässerung zu rechnen. Ein niedriger Cap kann bei einer guten Runde dazu führen, dass der Angel für 50.000 EUR mehr Anteile bekommt als der Seed-Investor für 500.000 EUR. Rechne jedes Szenario vor Unterschrift durch.

Fehler zwei: Die Gesellschafter unterschreiben nicht mit. Die Wandlung braucht einen Kapitalerhöhungsbeschluss mit Dreiviertelmehrheit und den Bezugsrechtsverzicht aller Altgesellschafter. Fehlt ihre Verpflichtung, kann der Investor sein Recht nicht durchsetzen, und das macht das Darlehen zum einfachen Kredit mit Rückzahlungsrisiko.

Fehler drei: Rangrücktritt vergessen. Ohne ihn zählt das Darlehen bei der Überschuldungsprüfung als Verbindlichkeit, und bei einem Start-up ohne Umsatz kann das vom ersten Tag an die Insolvenzantragspflicht auslösen. Fehler vier: keine Regelung für den Fall, dass keine Runde kommt. Dann ist das Darlehen bei Fälligkeit zurückzuzahlen, was das Start-up meist nicht kann. Die Vorlage gibt dem Investor deshalb ein Wandlungsrecht zur Fallback-Bewertung. Fehler fünf: Die Zinsen werden gewandelt, aber die Steuer darauf nicht bedacht; auch mitgewandelte Zinsen sind Kapitalertrag, den der Investor erklären muss, soweit kein Steuerabzug erfolgt.`,
      },
      {
        titel: "Rechtliche Grundlagen: GmbHG, Formfrage und INVEST",
        text: `Die Wandlung ist eine Kapitalerhöhung gegen Einlage nach §§ 55 ff. GmbHG mit Satzungsänderung nach § 53 GmbHG. Sie muss notariell beurkundet und ins Handelsregister eingetragen werden; der Investor gibt eine notariell beglaubigte Übernahmeerklärung ab. Die Einlage wird durch Verrechnung mit der Darlehensforderung erbracht, was als Sacheinlage gelten kann; deshalb sieht § 6 Abs. 3 der Vorlage die Zuzahlung in die Kapitalrücklage nach § 272 Abs. 2 Nr. 4 HGB und hilfsweise die Bareinlage mit Rückzahlung Zug um Zug vor.

Ob der Wandeldarlehensvertrag selbst beurkundet werden muss, ist nicht abschließend geklärt. Da er Gesellschafter zur Mitwirkung an einer Kapitalerhöhung und den Investor zur Übernahme von Anteilen verpflichtet, wird teilweise eine Beurkundungspflicht in Anlehnung an § 15 Abs. 4 und § 53 GmbHG angenommen. In der Praxis werden viele Wandeldarlehen in Schriftform geschlossen; die sichere Variante ist die Beurkundung, die § 11 Abs. 1 der Vorlage als Alternative bietet.

Der Rangrücktritt folgt § 19 Abs. 2 Satz 2 InsO. Der INVEST-Zuschuss für Wagniskapital des BAFA ist auch für Wandeldarlehen möglich, wenn die Förderbedingungen zu Laufzeit, Wandlung und Beteiligungsquote eingehalten werden. Die Bedingungen ändern sich; prüfe sie vor Vertragsschluss auf der Seite des BAFA, nicht danach.`,
      },
      {
        titel: "Wann du einen Anwalt für das Wandeldarlehen brauchst",
        text: `Ein Wandeldarlehen ist ein Finanzierungsvertrag mit Fernwirkung auf die nächste Runde. Beratung ist angezeigt, wenn

- der Investor ein professioneller VC oder ein Fonds ist, der eigene Vertragsstandards mitbringt und Sonderrechte wie Liquidationspräferenzen oder Mitverkaufsrechte verlangt,
- mehrere Wandeldarlehen mit unterschiedlichen Caps und Discounts parallel laufen und die Reihenfolge der Wandlung geregelt werden muss,
- bereits Investoren beteiligt sind, deren Gesellschaftervereinbarung Zustimmungs- oder Bezugsrechte enthält,
- der Investor aus dem Ausland kommt oder in Fremdwährung finanziert,
- die Gesellschaft Fördermittel bezieht, deren Bedingungen eine Wandlung einschränken,
- die Gesellschaft bereits in der Krise ist und das Darlehen als Sanierungsbeitrag dienen soll.

Der Notar ist bei der Wandlung ohnehin beteiligt und sollte vor Abschluss gefragt werden, ob er den Vertrag beurkundet sehen will. Der Steuerberater klärt die Behandlung der Zinsen und einer möglichen Sacheinlage. Die Vorlage von GründerX ist ein Software-Muster für den Standardfall und keine Rechtsberatung; sie gibt dir aber die Begriffe und die Mechanik an die Hand, um mit Investor und Anwalt auf Augenhöhe zu verhandeln.`,
      },
    ],
  text: `Wandeldarlehensvertrag

zwischen

[Vorname Nachname / Firma], [Anschrift], [ggf. Handelsregister]
– nachfolgend „Darlehensgeber“ –

und

[Name] [GmbH / UG (haftungsbeschränkt)], [Straße, PLZ Ort], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch [Geschäftsführer]
– nachfolgend „Gesellschaft“ –

sowie den Gesellschaftern der Gesellschaft
1. [Vorname Nachname], [Anschrift], [Anzahl] Geschäftsanteile
2. [Vorname Nachname], [Anschrift], [Anzahl] Geschäftsanteile
– nachfolgend „Gesellschafter“ –

Präambel
Die Gesellschaft entwickelt [kurze Beschreibung]. Das Stammkapital beträgt [Betrag] EUR, eingeteilt in [Anzahl] Geschäftsanteile zu je 1,00 EUR. Der Darlehensgeber möchte die Gesellschaft mit einem Darlehen finanzieren, das unter den nachstehenden Bedingungen in Geschäftsanteile gewandelt wird. Die Gesellschafter treten diesem Vertrag bei, um die zur Wandlung erforderlichen Mitwirkungshandlungen sicherzustellen.

§ 1 Darlehen, Auszahlung und Verwendung
(1) Der Darlehensgeber gewährt der Gesellschaft ein Darlehen in Höhe von [Betrag] EUR („Darlehensbetrag“).
(2) Der Darlehensbetrag wird innerhalb von [z. B. 10] Bankarbeitstagen nach Unterzeichnung dieses Vertrags [und Vorlage des Gesellschafterbeschlusses nach § 10 Abs. 3] auf das Konto der Gesellschaft bei der [Bank], IBAN [IBAN], überwiesen.
(3) Das Darlehen dient der Finanzierung des Geschäftsbetriebs der Gesellschaft, insbesondere [Produktentwicklung, Marketing, Personal]. Ausschüttungen, Darlehen an Gesellschafter oder Rückzahlungen anderer Gesellschafterdarlehen dürfen aus dem Darlehensbetrag nicht geleistet werden.

§ 2 Zinsen
(1) Das Darlehen wird ab dem Tag der Auszahlung mit [z. B. 6] % pro Jahr verzinst (30/360). Die Zinsen werden nicht laufend gezahlt, sondern bis zur Wandlung oder Rückzahlung angesammelt und [bei Wandlung mitgewandelt / bei Wandlung in bar gezahlt].
(2) Soweit auf Zinsen Kapitalertragsteuer einzubehalten ist, zahlt die Gesellschaft den entsprechenden Betrag an das Finanzamt und erteilt dem Darlehensgeber eine Steuerbescheinigung.

§ 3 Laufzeit und Fälligkeit
(1) Das Darlehen hat eine Laufzeit bis zum [Datum, z. B. 24 oder 36 Monate nach Auszahlung] („Fälligkeitstag“). Eine ordentliche Kündigung ist für beide Seiten ausgeschlossen.
(2) Der Darlehensgeber kann das Darlehen aus wichtigem Grund fristlos kündigen, insbesondere wenn über das Vermögen der Gesellschaft ein Insolvenzverfahren beantragt wird, die Gesellschaft wesentliche Pflichten aus diesem Vertrag verletzt oder Zusicherungen nach § 9 unrichtig sind.
(3) Am Fälligkeitstag oder nach Kündigung ist der Darlehensbetrag nebst aufgelaufenen Zinsen zur Rückzahlung fällig, soweit nicht eine Wandlung nach §§ 4 oder 5 erfolgt und soweit § 8 dem nicht entgegensteht.

§ 4 Pflichtwandlung bei qualifizierter Finanzierungsrunde
(1) Eine „qualifizierte Finanzierungsrunde“ ist eine Kapitalerhöhung der Gesellschaft, bei der ein oder mehrere Investoren, die nicht bereits Gesellschafter sind, neue Geschäftsanteile gegen Bareinlagen (einschließlich Agio oder Zuzahlung in die Kapitalrücklage) von insgesamt mindestens [Betrag, z. B. 500.000] EUR übernehmen.
(2) Bei einer qualifizierten Finanzierungsrunde wird der Darlehensbetrag zuzüglich der bis zum Tag der Beurkundung der Kapitalerhöhung aufgelaufenen Zinsen („Wandlungsbetrag“) zwingend in Geschäftsanteile der Gesellschaft gewandelt. Der Darlehensgeber erhält Geschäftsanteile derselben Gattung und mit denselben Rechten wie die Investoren der Finanzierungsrunde, soweit diese nicht ausdrücklich an Mindestbeträge geknüpft sind.
(3) Die Gesellschaft informiert den Darlehensgeber mindestens [z. B. 4] Wochen vor der geplanten Beurkundung schriftlich über die Bedingungen der Finanzierungsrunde (Investoren, Bewertung, Beteiligungsvertrag).

§ 5 Wandlungsrecht bei Fälligkeit, Exit und sonstigen Kapitalerhöhungen
(1) Kommt es bis zum Fälligkeitstag nicht zu einer qualifizierten Finanzierungsrunde, kann der Darlehensgeber durch schriftliche Erklärung bis spätestens [z. B. 4] Wochen vor dem Fälligkeitstag verlangen, dass der Wandlungsbetrag auf Grundlage einer Bewertung der Gesellschaft (pre-money, vollverwässert) in Höhe von [Betrag, in der Regel der Cap oder ein niedrigerer Fallback-Wert] EUR gewandelt wird. Erklärt er dies nicht, wird das Darlehen am Fälligkeitstag zur Rückzahlung fällig.
(2) Bei einem Exit (Veräußerung von mehr als 50 % der Geschäftsanteile oder des wesentlichen Vermögens, Börsengang) vor Wandlung kann der Darlehensgeber wählen zwischen (a) Wandlung zum Cap-Preis nach § 6 unmittelbar vor dem Exit und (b) Rückzahlung des Wandlungsbetrags zuzüglich einer Prämie von [z. B. 50] % des Darlehensbetrags.
(3) Bei einer Kapitalerhöhung, die keine qualifizierte Finanzierungsrunde ist, kann der Darlehensgeber die Wandlung zu den Bedingungen dieser Kapitalerhöhung nach § 6 verlangen.

§ 6 Wandlungspreis: Discount und Bewertungsobergrenze
(1) Der Preis je neuem Geschäftsanteil bei Wandlung („Wandlungspreis“) ist der niedrigere der folgenden Beträge:
   a) der von den Investoren der Finanzierungsrunde je Geschäftsanteil gezahlte Preis (Nennbetrag zuzüglich Agio/Zuzahlung) abzüglich eines Abschlags von [z. B. 20] % („Discount“);
   b) der Preis je Geschäftsanteil, der sich aus einer Bewertung der Gesellschaft vor der Finanzierungsrunde (pre-money, vollverwässert einschließlich aller Options- und Mitarbeiterbeteiligungsprogramme) in Höhe von [Betrag, z. B. 3.000.000] EUR ergibt („Cap“).
(2) Die Anzahl der vom Darlehensgeber zu übernehmenden neuen Geschäftsanteile entspricht dem Wandlungsbetrag geteilt durch den Wandlungspreis, abgerundet auf ganze Anteile. Ein Spitzenbetrag wird in bar an den Darlehensgeber zurückgezahlt oder in die Kapitalrücklage geleistet.
(3) Der Darlehensgeber übernimmt die neuen Geschäftsanteile zum Nennbetrag von je 1,00 EUR; der Differenzbetrag zwischen Wandlungsbetrag und Summe der Nennbeträge wird als Zuzahlung in die Kapitalrücklage der Gesellschaft (§ 272 Abs. 2 Nr. 4 HGB) geleistet. Die Einlageverpflichtung wird durch Verrechnung mit dem Darlehensrückzahlungsanspruch erfüllt, soweit rechtlich zulässig; andernfalls zahlt der Darlehensgeber die Einlage in bar ein und die Gesellschaft zahlt das Darlehen Zug um Zug zurück.

§ 7 Durchführung der Wandlung
(1) Zur Durchführung der Wandlung beschließen die Gesellschafter eine Kapitalerhöhung um den erforderlichen Nennbetrag, schließen den Darlehensgeber zur Übernahme der neuen Geschäftsanteile zu und verzichten auf ihr Bezugsrecht. Die Gesellschaft lässt die Kapitalerhöhung unverzüglich zum Handelsregister anmelden und reicht eine aktualisierte Gesellschafterliste ein.
(2) Der Darlehensgeber gibt die Übernahmeerklärung in notariell beglaubigter Form ab und tritt einer bestehenden oder im Rahmen der Finanzierungsrunde abzuschließenden Gesellschaftervereinbarung bei, soweit er dort nicht schlechter gestellt wird als die Investoren der Finanzierungsrunde.
(3) Mit Eintragung der Kapitalerhöhung erlöschen die Ansprüche des Darlehensgebers aus dem Darlehen in Höhe des gewandelten Betrags.
(4) Die Kosten der Kapitalerhöhung trägt die Gesellschaft.

§ 8 Rangrücktritt
Der Darlehensgeber tritt mit seinen Ansprüchen auf Rückzahlung des Darlehens und auf Zinsen im Rang hinter die Forderungen aller gegenwärtigen und künftigen Gläubiger der Gesellschaft im Sinne des § 39 Abs. 1 Nr. 1 bis 5 InsO zurück. Außerhalb eines Insolvenzverfahrens kann er Erfüllung nur aus künftigen Jahresüberschüssen, einem Liquidationsüberschuss oder sonstigem freien Vermögen verlangen und nur, soweit dadurch weder eine Zahlungsunfähigkeit noch eine Überschuldung der Gesellschaft (§§ 17, 19 InsO) eintritt oder droht. Dieser qualifizierte Rangrücktritt dient der Vermeidung einer Überschuldung (§ 19 Abs. 2 Satz 2 InsO). Die Wandlung nach §§ 4 bis 7 bleibt vom Rangrücktritt unberührt.

§ 9 Informationsrechte und Zusicherungen
(1) Die Gesellschaft übermittelt dem Darlehensgeber bis zur Wandlung oder Rückzahlung quartalsweise innerhalb von [z. B. 4] Wochen nach Quartalsende einen Bericht mit Umsatz, Ergebnis, Liquidität und wesentlichen Entwicklungen sowie den Jahresabschluss innerhalb von [6] Monaten nach Geschäftsjahresende. Sie informiert ihn unverzüglich über geplante Kapitalmaßnahmen, Exit-Verhandlungen und Umstände, die den Fortbestand gefährden.
(2) Die Gesellschaft und die Gesellschafter sichern zu, dass zum Tag der Unterzeichnung die Angaben in der Präambel zutreffen, die Gesellschafterliste in Anlage 1 vollständig ist, keine weiteren Options-, Wandlungs- oder Bezugsrechte Dritter bestehen außer den in Anlage 2 genannten, und dass keine Insolvenzgründe vorliegen.
(3) Der Darlehensgeber behandelt alle erhaltenen Informationen vertraulich.

§ 10 Übertragung, Mitwirkungspflichten der Gesellschafter
(1) Der Darlehensgeber darf seine Rechte aus diesem Vertrag nur mit Zustimmung der Gesellschaft übertragen; die Zustimmung darf nur aus wichtigem Grund verweigert werden. Übertragungen an verbundene Unternehmen oder Familienangehörige sind zustimmungsfrei anzuzeigen.
(2) Die Gesellschafter verpflichten sich, alle Beschlüsse zu fassen, Erklärungen abzugeben und Handlungen vorzunehmen, die zur Durchführung der Wandlung erforderlich sind, insbesondere Kapitalerhöhungsbeschlüsse zu fassen und auf Bezugsrechte zu verzichten. Sie verpflichten sich, Geschäftsanteile nur an Erwerber zu übertragen, die dieser Verpflichtung beitreten.
(3) Die Gesellschafterversammlung hat dem Abschluss dieses Vertrags mit Beschluss vom [Datum] zugestimmt (Anlage 3).

§ 11 Schlussbestimmungen
(1) Dieser Vertrag wurde [in Schriftform geschlossen; den Parteien ist bekannt, dass eine notarielle Beurkundung in Betracht kommt, soweit der Vertrag Verpflichtungen zur Übernahme oder Abtretung von Geschäftsanteilen enthält / notariell beurkundet].
(2) Änderungen bedürfen der Schriftform, soweit nicht eine strengere Form gesetzlich erforderlich ist; das gilt auch für diese Klausel.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt deutsches Recht.

Anlagen: 1 Gesellschafterliste, 2 Bestehende Options- und Wandlungsrechte, 3 Gesellschafterbeschluss

[Ort], den [Datum]


______________________________
[Vorname Nachname / Firma], Darlehensgeber


______________________________
[Name] [GmbH / UG (haftungsbeschränkt)], vertreten durch [Geschäftsführer]


______________________________
[Vorname Nachname], Gesellschafter


______________________________
[Vorname Nachname], Gesellschafter

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
