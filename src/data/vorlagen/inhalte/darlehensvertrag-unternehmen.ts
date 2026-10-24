// Inhalt der Vorlage „darlehensvertrag-unternehmen“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../finanzen.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann ein Darlehensvertrag zwischen Unternehmen nötig ist",
        text: `Zwischen Unternehmen fließt Geld oft schneller als die Papiere hinterherkommen: Der Lieferant finanziert eine Maschine vor, die Schwestergesellschaft überbrückt einen Liquiditätsengpass, ein Geschäftspartner schießt Geld für einen Großauftrag zu, oder du selbst gibst deiner GmbH ein Gesellschafterdarlehen, weil die Bank noch nicht mitspielt. In all diesen Fällen entsteht ein Darlehen nach § 488 BGB, und zwar auch ohne Vertrag.

Der Vertrag entscheidet aber darüber, welche Zinsen gelten, wann das Geld zurück muss, welche Sicherheiten der Darlehensgeber hat und wann er kündigen darf. Für Gesellschafterdarlehen kommt dazu, dass Finanzamt und Insolvenzverwalter den Vertrag lesen. Die Vorlage ist auf den Darlehensvertrag zwischen zwei Unternehmen zugeschnitten, mit Tilgungsplan, Sicherheitenpaket und optionalem Rangrücktritt.`,
      },
      {
        titel: "Was gehört in den B2B-Darlehensvertrag?",
        text: `Ein Darlehensvertrag zwischen Unternehmen regelt mehr als Betrag und Zins. Die Vorlage enthält:

- Vorbemerkung mit der Klarstellung, dass das Darlehen einmalig und nicht als gewerbsmäßiges Kreditgeschäft vergeben wird, bei Beteiligung mit Hinweis auf §§ 39, 135 InsO
- Darlehensbetrag, Auszahlung in einer Summe oder in Tranchen, Verwendungszweck und Auszahlungsvoraussetzungen (§ 1)
- Zinssatz fest oder variabel über dem Basiszinssatz, Zinsperiode und der Hinweis, dass Kreditzinsen umsatzsteuerfrei sind (§ 2)
- Tilgungsplan mit einzelnen Raten, Annuität oder Endfälligkeit sowie Regeln für vorzeitige Rückzahlung (§ 3)
- Sicherheiten: Sicherungsübereignung von Maschinen oder Warenlager, Abtretung von Kundenforderungen, Bürgschaft des Geschäftsführers (§ 4)
- Informationspflichten wie Jahresabschluss, BWA und Debitorenlisten (§ 5)
- Kündigungsgründe vom Zahlungsrückstand über Zweckverfehlung bis zum Kontrollwechsel (§ 6)
- Verzugszinsen von neun Prozentpunkten über dem Basiszinssatz plus 40 EUR Pauschale (§ 7)
- Abtretung, Aufrechnungsverbot und optionaler Rangrücktritt (§ 8)

Jeder dieser Punkte hat einen Grund: Ohne Informationspflichten erfährst du von der Schieflage des Darlehensnehmers erst, wenn die Rate ausbleibt.`,
      },
      {
        titel: "Vorlage Darlehensvertrag Unternehmen ausfüllen",
        text: `Fülle zuerst beide Firmen mit Rechtsform, Handelsregister und vertretungsberechtigter Person aus; bei einer GbR die Gesellschafter namentlich. In der Vorbemerkung aktivierst du den optionalen Satz zur Beteiligung, wenn der Darlehensgeber Gesellschafter des Darlehensnehmers ist. In § 1 trägst du Betrag, Auszahlungsdatum und den konkreten Zweck ein, etwa das Angebot für die Maschine. In § 2 wählst du zwischen festem Zinssatz und variablem Zins über dem Basiszinssatz.

In § 3 schreibst du den Tilgungsplan Rate für Rate oder übernimmst die Alternative mit gleichbleibenden Annuitäten; prüfe, dass die Summe der Raten den Darlehensbetrag ergibt. In § 4 beschreibst du die Sicherheiten so genau, dass ein Dritter sie erkennen kann: Seriennummer, Lagerort, Kundennamen, und legst die Listen als Anlage 1 und 2 bei. In § 8 Abs. 3 aktivierst du den Rangrücktritt nur bei Gesellschafterdarlehen. Lass bei GmbH und UG einen Gesellschafterbeschluss über die Darlehensaufnahme fassen und nimm ihn als Anlage 3 auf.`,
      },
      {
        titel: "Gesellschafterdarlehen: Rangrücktritt, § 19 InsO und Fremdvergleich",
        text: `Beim Gesellschafterdarlehen passieren die teuersten Fehler. Erstens der fehlende Fremdvergleich: Zahlt die GmbH dem Gesellschafter einen Zins, den sie einem fremden Geldgeber nie zahlen würde, behandelt das Finanzamt den überhöhten Teil als verdeckte Gewinnausschüttung (§ 8 Abs. 3 Satz 2 KStG). Ein zu niedriger oder fehlender Zins ist dagegen nach der BFH-Rechtsprechung keine verdeckte Einlage, weil bloße Nutzungsvorteile nicht einlagefähig sind. Orientiere dich an dem Zins, den eine Bank für ein vergleichbar besichertes Darlehen verlangen würde, und dokumentiere das.

Zweitens die Rückzahlung kurz vor der Insolvenz: Zahlt die Gesellschaft das Gesellschafterdarlehen im letzten Jahr vor dem Insolvenzantrag zurück, holt sich der Insolvenzverwalter das Geld nach § 135 InsO zurück. Drittens der fehlende Rangrücktritt in der Krise: Ist die Gesellschaft rechnerisch überschuldet, zählt ein Gesellschafterdarlehen ohne qualifizierten Rangrücktritt als Verbindlichkeit (§ 19 Abs. 2 InsO) und kann die Insolvenzantragspflicht auslösen. Mit Rangrücktritt bleibt es in der Überschuldungsprüfung außen vor. Der Rangrücktritt muss ausdrücklich erklärt werden; § 8 Abs. 3 der Vorlage enthält die Formulierung.`,
      },
      {
        titel: "Rechtsgrundlagen: KWG, § 488 BGB, § 288 BGB, Insolvenzordnung",
        text: `Grundlage ist § 488 BGB: Auszahlungspflicht des Darlehensgebers, Zins- und Rückzahlungspflicht des Darlehensnehmers. Verzug tritt bei kalendermäßig bestimmten Raten ohne Mahnung ein (§ 286 Abs. 2 Nr. 1 BGB). Zwischen Unternehmern betragen die Verzugszinsen bei Entgeltforderungen neun Prozentpunkte über dem Basiszinssatz (§ 288 Abs. 2 BGB) plus 40 EUR Pauschale je Verzugsfall (§ 288 Abs. 5 BGB); weil umstritten ist, ob die Darlehensrückzahlung eine Entgeltforderung ist, vereinbart die Vorlage den Zinssatz ausdrücklich. Die außerordentliche Kündigung bei Vermögensverschlechterung stützt sich auf § 490 Abs. 1 BGB.

Kreditzinsen sind umsatzsteuerfrei (§ 4 Nr. 8 Buchstabe a UStG). Gesellschafterdarlehen sind in der Insolvenz nachrangig (§ 39 Abs. 1 Nr. 5 InsO), Rückzahlungen im letzten Jahr anfechtbar (§ 135 InsO). Wer gewerbsmäßig Darlehen vergibt, betreibt Kreditgeschäft nach dem KWG und braucht eine Erlaubnis der BaFin; ein einzelnes Darlehen an einen Geschäftspartner ist davon nicht erfasst.`,
      },
      {
        titel: "Wann du Anwalt, Steuerberater oder Bank brauchst",
        text: `Die Vorlage deckt das einmalige Darlehen zwischen zwei Unternehmen ab. Sie reicht nicht, wenn du als Unternehmen einem Verbraucher Geld leihst, denn dann gelten die Pflichtangaben und das Widerrufsrecht des Verbraucherdarlehens. Sie ersetzt auch keinen Bankkredit mit Grundschuld, keine Konsortialfinanzierung mit mehreren Geldgebern und keinen Darlehensvertrag mit Wandlungsrecht für Investoren.

Sobald Beträge im Spiel sind, die bei Ausfall das Unternehmen gefährden, oder sobald Beteiligungen, Konzernverhältnisse oder Auslandsgesellschaften betroffen sind, lass den Vertrag anwaltlich prüfen; die Fremdüblichkeit des Zinses und die Bilanzierung des Rangrücktritts klärt der Steuerberater. GründerX ist eine Software für Gründer und keine Rechts- oder Steuerberatung.`,
      },
    ],
  text: `Darlehensvertrag zwischen Unternehmen

zwischen

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname, Funktion], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer]
– nachfolgend „Darlehensgeber“ –

und

[Firma], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname, Funktion], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer]
– nachfolgend „Darlehensnehmer“ –

Vorbemerkung
Der Darlehensgeber vergibt dieses Darlehen einmalig und außerhalb eines gewerbsmäßigen Kreditgeschäfts im Sinne des § 1 Abs. 1 Satz 2 Nr. 2 KWG. [Optional: Der Darlehensgeber ist mit [Anteil] % am Darlehensnehmer beteiligt; den Parteien ist bekannt, dass das Darlehen damit als Gesellschafterdarlehen den §§ 39 Abs. 1 Nr. 5, 135 InsO unterliegt.]

§ 1 Darlehensbetrag, Auszahlung und Verwendungszweck
(1) Der Darlehensgeber gewährt dem Darlehensnehmer ein Darlehen in Höhe von [Betrag] EUR (in Worten: [Betrag in Worten] Euro).
(2) Die Auszahlung erfolgt am [Datum] durch Überweisung auf das Geschäftskonto des Darlehensnehmers, IBAN [IBAN] bei der [Bank]. [Alternative: Die Auszahlung erfolgt in Tranchen nach folgendem Plan: [Betrag] EUR am [Datum], [Betrag] EUR am [Datum]. Jede Tranche wird nur ausgezahlt, wenn die Voraussetzungen nach Absatz 4 weiterhin vorliegen.]
(3) Das Darlehen ist zweckgebunden für: [z. B. „die Anschaffung der Produktionsanlage [Bezeichnung] laut Angebot vom [Datum]“ / „die Vorfinanzierung des Auftrags [Kunde, Auftragsnummer]“ / „die Aufstockung des Warenlagers“]. Der Darlehensnehmer weist die zweckentsprechende Verwendung auf Verlangen durch Rechnungen und Zahlungsbelege nach.
(4) Auszahlungsvoraussetzungen sind: [z. B. „Vorlage der unterzeichneten Sicherungsvereinbarung nach § 4“, „Vorlage des Gesellschafterbeschlusses des Darlehensnehmers über die Darlehensaufnahme“].

§ 2 Zinsen
(1) Das Darlehen wird vom Tag der Auszahlung an mit [z. B. 6,0] % pro Jahr verzinst. [Alternative: Der Zinssatz beträgt [z. B. 4] Prozentpunkte über dem jeweiligen Basiszinssatz nach § 247 BGB und wird jeweils zum 1. Januar und 1. Juli angepasst.]
(2) Die Zinsen werden auf den jeweils offenen Darlehensbetrag taggenau (Basis 365 Tage) berechnet und sind [vierteljährlich / monatlich] nachträglich, jeweils zum [Tag], fällig.
(3) Der Darlehensgeber stellt die Zinsen in Rechnung. Umsatzsteuer fällt auf die Gewährung von Krediten nicht an (§ 4 Nr. 8 Buchstabe a UStG).

§ 3 Tilgungsplan und Fälligkeit
(1) Das Darlehen hat eine Laufzeit bis zum [Datum].
(2) Die Rückzahlung erfolgt nach folgendem Tilgungsplan:
   Rate 1: [Betrag] EUR, fällig am [Datum]
   Rate 2: [Betrag] EUR, fällig am [Datum]
   Rate 3: [Betrag] EUR, fällig am [Datum]
   [weitere Raten]
   Schlussrate: [Betrag] EUR, fällig am [Datum]
   [Alternative: Die Rückzahlung erfolgt in [Anzahl] gleichbleibenden Annuitäten von je [Betrag] EUR (Zins und Tilgung), erstmals am [Datum]. / Das Darlehen ist endfällig am [Datum] in einer Summe zurückzuzahlen.]
(3) Zahlungen sind auf das Konto des Darlehensgebers, IBAN [IBAN] bei der [Bank], zu leisten und werden zunächst auf Kosten, dann auf Zinsen und zuletzt auf die Hauptforderung angerechnet (§ 367 BGB).
(4) Vorzeitige Rückzahlungen sind mit einer Ankündigungsfrist von [z. B. 4] Wochen jederzeit zulässig. Eine Vorfälligkeitsentschädigung [wird nicht geschuldet / beträgt [z. B. 1] % des vorzeitig zurückgezahlten Betrags].

§ 4 Sicherheiten
(1) Zur Sicherung aller gegenwärtigen und künftigen Ansprüche des Darlehensgebers aus diesem Vertrag bestellt der Darlehensnehmer folgende Sicherheiten:
   a) Sicherungsübereignung: Der Darlehensnehmer übereignet dem Darlehensgeber die in Anlage 1 bezeichneten Gegenstände [z. B. „Maschine [Typ, Seriennummer]“ / „sämtliche Waren im Lager [Anschrift, Raum]“]. Die Übergabe wird dadurch ersetzt, dass der Darlehensnehmer die Gegenstände als Verwahrer für den Darlehensgeber besitzt (§§ 929, 930 BGB). Der Darlehensnehmer darf die Gegenstände im ordentlichen Geschäftsgang nutzen [und veräußern]; er hat sie pfleglich zu behandeln und gegen die üblichen Risiken zu versichern.
   b) Forderungsabtretung: Der Darlehensnehmer tritt dem Darlehensgeber die in Anlage 2 bezeichneten gegenwärtigen und künftigen Forderungen aus [z. B. „Lieferungen und Leistungen an den Kunden [Name]“ / „allen Lieferungen und Leistungen gegenüber Kunden mit den Anfangsbuchstaben A bis K“] ab (§ 398 BGB). Der Darlehensnehmer bleibt zur Einziehung berechtigt, solange er seine Pflichten aus diesem Vertrag erfüllt. Der Darlehensgeber kann die Einziehungsermächtigung widerrufen und die Abtretung offenlegen, wenn ein Kündigungsgrund nach § 6 Abs. 2 vorliegt.
   c) [Optional: Bürgschaft: [Vorname Nachname] übernimmt gemäß gesonderter Urkunde eine selbstschuldnerische Höchstbetragsbürgschaft über [Betrag] EUR.]
(2) Übersteigt der realisierbare Wert der Sicherheiten den gesicherten Betrag dauerhaft um mehr als [z. B. 10] %, gibt der Darlehensgeber Sicherheiten nach seiner Wahl in entsprechendem Umfang frei.
(3) Der Darlehensgeber darf die Sicherheiten verwerten, wenn das Darlehen gekündigt oder fällig ist und der Darlehensnehmer nach schriftlicher Androhung mit zweiwöchiger Frist nicht gezahlt hat.

§ 5 Informationspflichten
(1) Der Darlehensnehmer übermittelt dem Darlehensgeber während der Laufzeit unaufgefordert
   a) den Jahresabschluss innerhalb von [z. B. 6] Monaten nach Ende des Geschäftsjahres,
   b) [vierteljährlich] eine betriebswirtschaftliche Auswertung,
   c) auf Anforderung aktuelle Debitoren- und Inventarlisten zu den Sicherheiten.
(2) Der Darlehensnehmer informiert den Darlehensgeber unverzüglich über wesentliche Veränderungen seiner Vermögens-, Gesellschafter- oder Haftungsverhältnisse, über Vollstreckungsmaßnahmen Dritter in die Sicherheiten und über jede Beeinträchtigung des Verwendungszwecks.

§ 6 Kündigung
(1) Das Recht zur ordentlichen Kündigung ist für beide Parteien während der Laufzeit ausgeschlossen.
(2) Der Darlehensgeber kann das Darlehen aus wichtigem Grund fristlos kündigen, insbesondere wenn
   a) der Darlehensnehmer mit zwei Raten oder Zinszahlungen ganz oder teilweise in Verzug ist und eine schriftliche Nachfrist von zwei Wochen fruchtlos verstrichen ist,
   b) sich die Vermögensverhältnisse des Darlehensnehmers oder die Werthaltigkeit der Sicherheiten wesentlich verschlechtern oder zu verschlechtern drohen (§ 490 Abs. 1 BGB),
   c) der Darlehensnehmer das Darlehen zweckwidrig verwendet, Informationspflichten nach § 5 trotz Mahnung verletzt oder unrichtige Angaben gemacht hat,
   d) über das Vermögen des Darlehensnehmers ein Insolvenzverfahren beantragt, eröffnet oder mangels Masse abgelehnt wird,
   e) der Darlehensnehmer seinen Geschäftsbetrieb einstellt, veräußert oder ein Kontrollwechsel bei den Gesellschaftern eintritt.
(3) Mit Zugang der Kündigung wird der gesamte offene Darlehensbetrag nebst Zinsen sofort fällig. Jede Kündigung bedarf der Schriftform.

§ 7 Verzug und Kosten
(1) Verzug tritt ohne Mahnung mit Ablauf des jeweiligen Fälligkeitstermins ein (§ 286 Abs. 2 Nr. 1 BGB).
(2) Fällige Beträge sind während des Verzugs mit neun Prozentpunkten über dem jeweiligen Basiszinssatz zu verzinsen (§ 288 Abs. 2 BGB). Dazu kommt je Verzugsfall die Pauschale von 40 EUR (§ 288 Abs. 5 BGB). Der Nachweis eines höheren Schadens bleibt vorbehalten.
(3) Die Kosten der Bestellung, Verwaltung und Verwertung der Sicherheiten trägt der Darlehensnehmer.

§ 8 Abtretung, Aufrechnung, Rangrücktritt
(1) Der Darlehensgeber darf seine Ansprüche aus diesem Vertrag an Dritte abtreten; der Darlehensnehmer nur mit schriftlicher Zustimmung des Darlehensgebers.
(2) Der Darlehensnehmer kann nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen aufrechnen.
(3) [Optional bei Gesellschafterdarlehen: Der Darlehensgeber tritt mit seinen Ansprüchen aus diesem Vertrag im Rang hinter die Forderungen aller anderen Gläubiger des Darlehensnehmers gemäß § 39 Abs. 2 InsO zurück; Rückzahlung und Zinsen werden nur aus künftigen Gewinnen, einem Liquidationsüberschuss oder freiem Vermögen verlangt.]

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Die Parteien ersetzen die unwirksame Bestimmung durch eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist [Ort].
(4) Anlagen: Anlage 1 (Verzeichnis der sicherungsübereigneten Gegenstände), Anlage 2 (Verzeichnis der abgetretenen Forderungen), [Anlage 3 (Gesellschafterbeschluss)].

[Ort], den [Datum]


______________________________
[Firma], Darlehensgeber
vertreten durch [Vorname Nachname]


______________________________
[Firma], Darlehensnehmer
vertreten durch [Vorname Nachname]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
