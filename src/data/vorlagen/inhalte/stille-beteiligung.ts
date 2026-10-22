// Inhalt der Vorlage „stille-beteiligung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../gesellschaft.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann brauchst du einen Vertrag über eine stille Beteiligung?",
        text: `Die stille Beteiligung ist die Finanzierung aus dem eigenen Umfeld: Eltern, ein Freund oder ein langjähriger Mitarbeiter wollen Geld geben und am Erfolg teilhaben, aber weder im Handelsregister stehen noch mitentscheiden. Anders als beim Darlehen bekommt der Geldgeber keinen festen Zins, sondern einen Anteil am Gewinn, und trägt, wenn vereinbart, auch Verluste bis zur Höhe seiner Einlage.

Du brauchst den Vertrag, wenn ein Einzelunternehmen, eine GbR, eine UG oder GmbH Kapital aufnehmen will, ohne Anteile abzugeben und ohne zum Notar zu gehen, wenn der Geldgeber nach außen nicht in Erscheinung treten soll oder wenn ein Darlehen mit festem Zins für ein junges Unternehmen zu starr wäre. Die Vorlage bildet die typische stille Gesellschaft nach §§ 230 ff. HGB ab, also die Variante ohne Beteiligung an stillen Reserven und Firmenwert, mit Kontrollrechten, Zustimmungskatalog, Kündigung und Auseinandersetzung.`,
      },
      {
        titel: "Was muss in einen Vertrag über eine stille Gesellschaft?",
        text: `Weil der stille Gesellschafter nur die Rechte hat, die der Vertrag ihm gibt, muss der Vertrag vollständig sein. Die Vorlage regelt in zwölf Paragraphen:

- Gegenstand, Beginn, Charakter als Innengesellschaft, Ausschluss von stillen Reserven und Geschäftsführung (§ 1)
- Höhe und Fälligkeit der Einlage, alternativ Umwandlung eines Darlehens, Einlagekonto und Verrechnungskonto, keine Nachschusspflicht (§ 2)
- alleinige Geschäftsführung des Inhabers, keine Außenhaftung des Stillen, Grenze für weitere stille Gesellschafter (§ 3)
- Gewinnbeteiligung in Prozent, Bemessungsgrundlage, Unternehmerlohn, Deckelung, optionale Mindestverzinsung und Verlustbeteiligung zum Ankreuzen (§ 4)
- Gutschrift, Auszahlung, Kapitalertragsteuer und Aufschub bei Liquiditätsgefahr (§ 5)
- Jahresabschluss, Kontrollrechte nach § 233 HGB, Einwendungsfrist, laufende Berichte (§ 6)
- zustimmungspflichtige Geschäfte mit Zustimmungsfiktion (§ 7)
- Laufzeit, ordentliche und außerordentliche Kündigung (§ 8)
- Auseinandersetzungsguthaben, Ratenzahlung, Schiedsgutachter (§ 9)
- Tod, Insolvenz und Übertragung (§ 10)
- Wettbewerb und Vertraulichkeit (§ 11)
- Gesellschafterbeschluss bei GmbH oder UG als Inhaber, Schriftform, Gerichtsstand (§ 12)

Entscheidend für die steuerliche Einordnung sind § 1 Abs. 3 und § 4: Keine Beteiligung an stillen Reserven und keine unternehmerische Mitsprache halten den Stillen typisch.`,
      },
      {
        titel: "Stille Beteiligung Muster ausfüllen",
        text: `Die Platzhalter im Einzelnen:

- Parteien: Inhaber mit Firma, Anschrift und bei GmbH oder UG die HRB-Nummer und der Geschäftsführer; stiller Gesellschafter mit Geburtsdatum und Anschrift.
- § 1: Beschreibung des Unternehmens und Beginn der stillen Gesellschaft.
- § 2: Einlage in Ziffern und Worten, Zahlungsdatum, Bank und IBAN, oder die Alternative mit Umwandlung eines bestehenden Darlehens samt Datum und Betrag.
- § 3 Abs. 3: Obergrenze für die Summe aller stillen Gewinnbeteiligungen.
- § 4: Gewinnbeteiligung in Prozent, Entscheidung vor oder nach Unternehmerlohn und dessen Höhe, Deckelung in Prozent der Einlage, optionale Mindestverzinsung. Genau ein Kästchen bei der Verlustbeteiligung ankreuzen.
- § 5: Fristen für Feststellung und Auszahlung, Zins und Höchstdauer bei Aufschub.
- § 6: Frist für den Jahresabschluss, Einwendungsfrist, Berichtsrhythmus.
- § 7: Schwellenwerte für Kredite und Investitionen.
- § 8: Kündigungsfrist und erster Kündigungstermin. § 9: Anzahl der Jahresraten und IHK-Bezirk.
- § 11: eine der beiden Wettbewerbsvarianten löschen. § 12: Datum des Gesellschafterbeschlusses bei GmbH oder UG.

Nach der Unterschrift bucht der Inhaber die Einlage auf dem Einlagekonto und meldet die Kapitalertragsteuer bei der ersten Gewinngutschrift an. Die Vorlage gibt es als Word und als PDF.`,
      },
      {
        titel: "Typische Fehler bei stillen Beteiligungen",
        text: `Fehler eins: Aus der typischen wird unbemerkt eine atypische stille Gesellschaft. Sobald der Stille an stillen Reserven und Firmenwert beteiligt wird oder über den Zustimmungskatalog hinaus mitentscheidet, ist er steuerlich Mitunternehmer mit gewerblichen Einkünften, eigener Feststellungserklärung und Gewerbesteuerfolgen. Ändere § 1 Abs. 3 und § 4 nicht ohne Steuerberater.

Fehler zwei: Gewinnbeteiligung ohne Deckel und ohne Unternehmerlohn. Bei gutem Ergebnis zahlt der Inhaber dann mehr als jeden Bankzins, und das Finanzamt kann bei nahestehenden Personen eine unangemessene Gewinnverteilung beanstanden. Fehler drei: Die Verlustbeteiligung bleibt ungeregelt. Gesetzlich nimmt der Stille am Verlust teil; wer das nicht will, muss es nach § 231 Abs. 2 HGB ausdrücklich ausschließen.

Fehler vier: Bei einer GmbH oder UG als Inhaber fehlt der Gesellschafterbeschluss. Eine stille Beteiligung an einer Kapitalgesellschaft kann als Teilgewinnabführungsvertrag gelten, der Zustimmung und unter Umständen Eintragung braucht. Fehler fünf: Kapitalertragsteuer vergessen. Der Inhaber muss sie einbehalten, auch wenn der Stille ein Familienmitglied ist. Fehler sechs: öffentlich um viele Stille werben. Ab einer bestimmten Zahl und Summe greift das Vermögensanlagengesetz mit Prospektpflicht; die Vorlage ist für den Einzelfall gedacht.`,
      },
      {
        titel: "Rechtliche Grundlagen: §§ 230 ff. HGB und Steuerrecht",
        text: `Die stille Gesellschaft ist in den §§ 230 bis 236 HGB geregelt. Der Stille leistet eine Einlage, die in das Vermögen des Inhabers übergeht (§ 230 HGB); er ist am Gewinn beteiligt, am Verlust nur, soweit nicht ausgeschlossen, und höchstens bis zur Höhe seiner Einlage (§§ 231, 232 HGB). Seine Kontrollrechte entsprechen denen eines Kommanditisten: Abschrift des Jahresabschlusses und Einsicht in Bücher und Papiere (§ 233 HGB). Bei Beendigung erhält er ein Auseinandersetzungsguthaben (§ 235 HGB), in der Insolvenz des Inhabers ist er mit der nicht durch Verluste verbrauchten Einlage einfacher Insolvenzgläubiger (§ 236 HGB).

Der Vertrag ist formfrei, Schriftform ist aber aus Beweisgründen unverzichtbar. Eine Eintragung im Handels- oder Gesellschaftsregister erfolgt nicht. Bei einer GmbH oder AG als Inhaber kann eine erhebliche Gewinnbeteiligung einen Teilgewinnabführungsvertrag darstellen, für den die Grundsätze der §§ 291 ff. AktG entsprechend herangezogen werden; bei der GmbH ist jedenfalls ein Gesellschafterbeschluss ratsam.

Steuerlich erzielt der typisch Stille Einkünfte aus Kapitalvermögen nach § 20 Abs. 1 Nr. 4 EStG mit Kapitalertragsteuerabzug; Verluste sind über den Verweis auf § 15a EStG nur eingeschränkt nutzbar. Beim Inhaber ist der Gewinnanteil Betriebsausgabe. Der atypisch Stille ist dagegen Mitunternehmer nach § 15 Abs. 1 Nr. 2 EStG.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht und wer dann hilft",
        text: `Die Vorlage passt für eine stille Beteiligung einer einzelnen natürlichen Person am Unternehmen eines Gründers, mit überschaubarem Betrag und klarer Abgrenzung zur Mitunternehmerschaft. Zieh Steuerberater oder Anwalt hinzu, wenn

- eine atypische stille Beteiligung mit Teilhabe an stillen Reserven gewollt ist, etwa um Verluste beim Stillen steuerlich voll nutzbar zu machen,
- der Inhaber eine GmbH oder UG ist und die Gewinnbeteiligung hoch ist; dann ist die Einordnung als Unternehmensvertrag zu prüfen,
- mehrere stille Gesellschafter aufgenommen werden sollen oder die Beteiligung öffentlich angeboten wird,
- der stille Gesellschafter ein Unternehmen, ein Investor oder eine Person im Ausland ist,
- die Einlage in Sachwerten oder durch Arbeitsleistung erbracht werden soll,
- das Unternehmen Fördermittel bezieht, deren Bedingungen Beteiligungen Dritter einschränken.

Der Steuerberater sollte außerdem die Bemessungsgrundlage in § 4 und den Unternehmerlohn absegnen, weil beides über die Angemessenheit entscheidet. GründerX bietet die Vorlage als Software-Muster an; eine Rechts- oder Steuerberatung ist damit nicht verbunden. Für das Standardgeschäft im Familien- und Freundeskreis ist das Muster als Word oder PDF eine tragfähige Grundlage.`,
      },
    ],
  text: `Vertrag über die Errichtung einer stillen Gesellschaft

zwischen

[Vorname Nachname / Firma], [Anschrift], [ggf. Handelsregister HRB [Nummer], vertreten durch [Geschäftsführer]], Inhaber des Unternehmens „[Name des Unternehmens]“ mit Sitz in [Ort]
– nachfolgend „Inhaber“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
– nachfolgend „stiller Gesellschafter“ –

§ 1 Gegenstand und Beginn
(1) Der stille Gesellschafter beteiligt sich als typischer stiller Gesellschafter im Sinne der §§ 230 ff. HGB am Handelsgewerbe des Inhabers, das [Beschreibung des Unternehmens, z. B. „den Betrieb eines Online-Shops für Outdoor-Ausrüstung“] zum Gegenstand hat.
(2) Die stille Gesellschaft beginnt am [Datum]. Sie ist eine reine Innengesellschaft; nach außen tritt allein der Inhaber auf. Ein Gesamthandsvermögen wird nicht gebildet; die Einlage geht in das Vermögen des Inhabers über.
(3) Der stille Gesellschafter ist weder an den stillen Reserven noch am Geschäftswert des Unternehmens beteiligt. Eine Beteiligung an der Geschäftsführung ist ausgeschlossen.

§ 2 Einlage
(1) Der stille Gesellschafter leistet eine Einlage in Höhe von [Betrag] EUR (in Worten: [Betrag in Worten] Euro).
(2) Die Einlage ist bis zum [Datum] in bar auf das Geschäftskonto des Inhabers bei der [Bank], IBAN [IBAN], zu zahlen. [Alternative: Die Einlage wird durch Umwandlung der Darlehensforderung des stillen Gesellschafters vom [Datum] in Höhe von [Betrag] EUR erbracht.]
(3) Die Einlage wird auf einem Einlagekonto gebucht, das unverzinslich geführt wird. Gewinnanteile, Verlustanteile und Entnahmen werden auf einem gesonderten Verrechnungskonto erfasst.
(4) Eine Nachschusspflicht besteht nicht. Verluste über die Einlage hinaus trägt der stille Gesellschafter nicht.

§ 3 Geschäftsführung und Rechtsstellung des stillen Gesellschafters
(1) Die Geschäftsführung und Vertretung des Unternehmens obliegt allein dem Inhaber. Er führt die Geschäfte mit der Sorgfalt eines ordentlichen Kaufmanns und im Interesse auch des stillen Gesellschafters.
(2) Der stille Gesellschafter ist nicht berechtigt, für das Unternehmen zu handeln. Er haftet Dritten gegenüber nicht für Verbindlichkeiten des Unternehmens.
(3) Der Inhaber darf ohne Zustimmung des stillen Gesellschafters weitere stille Gesellschafter aufnehmen, sofern die Gesamtsumme der Gewinnbeteiligungen aller stillen Gesellschafter [z. B. 40] % nicht übersteigt.

§ 4 Gewinn- und Verlustbeteiligung
(1) Der stille Gesellschafter ist am Gewinn des Unternehmens mit [z. B. 15] % beteiligt. Maßgeblich ist der nach den Vorschriften des HGB ermittelte Jahresüberschuss vor Ertragsteuern des Inhabers, vor Abzug der Gewinnanteile stiller Gesellschafter und [vor / nach] Abzug eines angemessenen Unternehmerlohns für den Inhaber in Höhe von [Betrag] EUR pro Jahr. Außerordentliche Erträge aus der Veräußerung von Anlagevermögen bleiben unberücksichtigt.
(2) Der Gewinnanteil ist auf höchstens [z. B. 20] % der Einlage pro Geschäftsjahr begrenzt. [Optional: Der stille Gesellschafter erhält unabhängig vom Ergebnis eine Mindestverzinsung von [z. B. 3] % der Einlage, die auf den Gewinnanteil angerechnet wird.]
(3) Verlustbeteiligung (Zutreffendes ankreuzen):
   [ ] Der stille Gesellschafter nimmt am Verlust im Verhältnis seiner Gewinnbeteiligung teil, jedoch höchstens bis zur Höhe seiner Einlage. Verlustanteile werden dem Verrechnungskonto belastet; spätere Gewinnanteile dienen zunächst dem Ausgleich (§ 232 Abs. 2 HGB).
   [ ] Die Beteiligung am Verlust ist ausgeschlossen (§ 231 Abs. 2 HGB).
(4) Bei unterjährigem Beginn oder Ende wird der Gewinn- und Verlustanteil zeitanteilig berechnet.

§ 5 Entnahmen und Auszahlung
(1) Der Gewinnanteil wird mit Feststellung des Jahresabschlusses, spätestens [z. B. 8] Monate nach Ende des Geschäftsjahres, dem Verrechnungskonto gutgeschrieben und innerhalb von [z. B. 4] Wochen ausgezahlt, soweit das Einlagekonto durch Verluste nicht gemindert ist.
(2) Der Inhaber behält Kapitalertragsteuer und Solidaritätszuschlag ein, führt sie an das Finanzamt ab und erteilt dem stillen Gesellschafter eine Steuerbescheinigung.
(3) Der Inhaber darf die Auszahlung aufschieben, wenn sie die Zahlungsfähigkeit des Unternehmens gefährden würde; der aufgeschobene Betrag wird mit [z. B. 4] % pro Jahr verzinst und spätestens nach [z. B. 12] Monaten gezahlt.

§ 6 Jahresabschluss, Kontroll- und Informationsrechte
(1) Der Inhaber stellt den Jahresabschluss innerhalb von [z. B. 6] Monaten nach Ende des Geschäftsjahres auf und übermittelt dem stillen Gesellschafter eine Abschrift nebst Berechnung seines Gewinn- oder Verlustanteils. Geschäftsjahr ist das Kalenderjahr.
(2) Der stille Gesellschafter hat die Kontrollrechte nach § 233 HGB. Er kann den Jahresabschluss und die Berechnung seines Anteils unter Einsicht in Bücher und Papiere selbst oder durch einen zur Berufsverschwiegenheit verpflichteten Dritten auf seine Kosten prüfen lassen. Einwendungen sind innerhalb von [z. B. 6] Wochen nach Zugang schriftlich zu erheben; andernfalls gilt die Berechnung als anerkannt.
(3) Der Inhaber übermittelt dem stillen Gesellschafter [quartalsweise] eine betriebswirtschaftliche Auswertung und informiert ihn unverzüglich über Umstände, die den Bestand des Unternehmens gefährden.

§ 7 Zustimmungspflichtige Geschäfte
Der Inhaber bedarf der vorherigen schriftlichen Zustimmung des stillen Gesellschafters für:
   a) Veräußerung oder Verpachtung des Unternehmens oder wesentlicher Teile,
   b) Änderung des Unternehmensgegenstands oder Aufgabe des Geschäftsbetriebs,
   c) Aufnahme von Darlehen und Übernahme von Bürgschaften über [Betrag] EUR im Einzelfall,
   d) Investitionen über [Betrag] EUR im Geschäftsjahr,
   e) Aufnahme weiterer stiller Gesellschafter über die Grenze des § 3 Abs. 3 hinaus,
   f) Umwandlung des Unternehmens in eine andere Rechtsform.
Die Zustimmung darf nur aus wichtigem Grund verweigert werden; sie gilt als erteilt, wenn der stille Gesellschafter nicht innerhalb von zwei Wochen nach Zugang der Anfrage widerspricht.

§ 8 Dauer und Kündigung
(1) Die stille Gesellschaft wird auf unbestimmte Zeit geschlossen. Sie kann von jeder Partei mit einer Frist von [z. B. 6] Monaten zum Ende eines Geschäftsjahres gekündigt werden, erstmals zum [Datum].
(2) Das Recht zur fristlosen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt für den stillen Gesellschafter insbesondere vor, wenn der Inhaber die Pflichten aus §§ 5 bis 7 nachhaltig verletzt oder das Unternehmen veräußert.
(3) Die Kündigung bedarf der Schriftform.

§ 9 Auseinandersetzung
(1) Endet die stille Gesellschaft, erhält der stille Gesellschafter ein Auseinandersetzungsguthaben in Höhe des Saldos aus Einlagekonto und Verrechnungskonto zum Stichtag der Beendigung (§ 235 HGB). Stille Reserven, Geschäftswert und schwebende Geschäfte bleiben unberücksichtigt; am Ergebnis des laufenden Geschäftsjahres nimmt er zeitanteilig teil.
(2) Ein negatives Guthaben begründet keine Zahlungspflicht des stillen Gesellschafters.
(3) Das Guthaben ist in [z. B. 3] gleichen Jahresraten zu zahlen, die erste Rate [6] Monate nach dem Stichtag. Der offene Betrag wird mit 2 Prozentpunkten über dem Basiszinssatz verzinst. Vorzeitige Zahlung ist zulässig.
(4) Streit über die Höhe entscheidet ein von der Industrie- und Handelskammer [Ort] benannter Steuerberater oder Wirtschaftsprüfer als Schiedsgutachter verbindlich; die Kosten tragen die Parteien je zur Hälfte.

§ 10 Tod, Insolvenz, Übertragung
(1) Stirbt der stille Gesellschafter, wird die stille Gesellschaft mit seinen Erben fortgesetzt; mehrere Erben benennen einen gemeinsamen Vertreter. Der Inhaber kann die stille Gesellschaft innerhalb von sechs Monaten nach Kenntnis vom Tod mit einer Frist von drei Monaten kündigen.
(2) Stirbt der Inhaber oder wird über sein Vermögen das Insolvenzverfahren eröffnet, endet die stille Gesellschaft; die Rechte des stillen Gesellschafters richten sich nach § 236 HGB.
(3) Der stille Gesellschafter darf seine Beteiligung nur mit schriftlicher Zustimmung des Inhabers übertragen oder belasten.

§ 11 Wettbewerb und Vertraulichkeit
(1) Der stille Gesellschafter unterliegt keinem Wettbewerbsverbot. [Alternative: Der stille Gesellschafter darf sich während der Dauer der stillen Gesellschaft nicht an einem Wettbewerber des Unternehmens beteiligen.]
(2) Der stille Gesellschafter behandelt alle Informationen über das Unternehmen vertraulich, auch nach Beendigung der stillen Gesellschaft.

§ 12 Schlussbestimmungen
(1) [Bei GmbH/UG als Inhaber: Die Gesellschafterversammlung des Inhabers hat dem Abschluss dieses Vertrags mit Beschluss vom [Datum] zugestimmt.]
(2) Änderungen und Ergänzungen bedürfen der Schriftform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, [Ort]. Es gilt das Recht der Bundesrepublik Deutschland.
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

[Ort], den [Datum]


______________________________
[Vorname Nachname / Firma], Inhaber


______________________________
[Vorname Nachname], stiller Gesellschafter

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
