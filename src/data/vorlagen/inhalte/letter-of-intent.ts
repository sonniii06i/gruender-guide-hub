// Inhalt der Vorlage „letter-of-intent“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../geheimhaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Letter of Intent brauchst",
        text: `Ein Letter of Intent (LOI, auf Deutsch Absichtserklärung) hält fest, dass zwei Seiten ernsthaft über eine Transaktion verhandeln und zu welchen Eckpunkten. Typische Situationen: Du willst ein Unternehmen oder einen Geschäftsbetrieb kaufen und vor der teuren Due Diligence wissen, ob der Preisrahmen überhaupt passt. Ein Investor will sich an deiner GmbH beteiligen, und ihr wollt Struktur, Bewertung und Zeitplan fixieren, bevor Anwälte den Beteiligungsvertrag schreiben. Oder du verkaufst dein Unternehmen und gewährst einem Interessenten nur gegen einen klaren Fahrplan Exklusivität.

Der LOI ersetzt weder NDA noch Kaufvertrag, sondern schlägt die Brücke zwischen beiden. Für Finanzierungsrunden mit mehreren Angels ist das Term Sheet aus dieser Bibliothek das passendere Muster, für den Kauf von Anteilen oder Betrieben der LOI.`,
      },
      {
        titel: "Was in eine Absichtserklärung gehört",
        text: `Die Vorlage trennt sauber zwischen Absicht und Verpflichtung. Diese Abschnitte brauchst du:

- Präambel mit Beschreibung der Zielgesellschaft und der Beteiligungsquote des Inhabers.
- § 1 Gegenstand: Share Deal, Asset Deal oder Kapitalerhöhung, wirtschaftlicher Stichtag und geplantes Closing.
- § 2 Wirtschaftliche Eckpunkte: indikativer Kaufpreis, Cash-and-debt-free-Basis, Earn-out, Einbehalt für Garantien, Wettbewerbsverbot des Verkäufers, Finanzierungsvorbehalt.
- § 3 Due Diligence mit Datenraum, Frist, Frageprozess und Grenzen für Kontakte zu Mitarbeitern und Kunden.
- § 4 Exklusivität mit festem Enddatum und optionaler Kostenerstattung bei Verstoß.
- § 5 Vertraulichkeit und abgestimmte Kommunikation, Verweis auf eine bestehende NDA.
- § 6 Kostentragung inklusive Notarkosten.
- § 7 Zeitplan von Due Diligence bis Closing.
- § 8 Unverbindlichkeit: Nur §§ 4, 5, 6, 8 und 9 binden, alles andere ist Absicht.
- § 9 Schlussbestimmungen und Geltungsdauer des LOI.`,
      },
      {
        titel: "LOI Vorlage ausfüllen: Platzhalter und Varianten",
        text: `Lade die Vorlage kostenlos als Word oder PDF herunter. Trage zuerst Interessent und Inhaber mit Rechtsform und Vertreter ein; die Zielgesellschaft nimmst du nur als dritte Partei auf, wenn sie selbst Pflichten übernimmt, etwa den Datenraum zu öffnen. In der Präambel beschreibst du das Geschäft in einem Satz und wählst, ob Anteile, Vermögensgegenstände oder neue Anteile aus einer Kapitalerhöhung erworben werden sollen.

In § 1 streichst du die beiden nicht passenden Varianten und ergänzt Stichtag und Closing-Datum. In § 2 setzt du den indikativen Kaufpreis und die Unterlagen ein, auf denen er beruht (Jahresabschlüsse, BWA, Planung), und entscheidest zwischen Locked Box und Kaufpreisanpassung.

In § 3 trägst du Beginn und Dauer der Due Diligence ein, in § 4 das Enddatum der Exklusivität. Es sollte mit dem Zeitplan in § 7 zusammenpassen: Endet die Prüfung ohne Vertragsentwurf, endet auch die Exklusivität. In § 6 regelst du, wer den Notar bezahlt. Datum, Ort, Unterschriften, fertig.`,
      },
      {
        titel: "Typische Fehler beim Letter of Intent",
        text: `Der größte Fehler ist zu viel Verbindlichkeit. Wer im LOI bereits Kaufpreis, Zahlungsplan und Übergabe abschließend formuliert, läuft Gefahr, dass ein Gericht einen Vorvertrag annimmt. Bei GmbH-Anteilen wäre der ohne Notar nichtig, bei einem Asset Deal dagegen möglicherweise bindend. Halte die wirtschaftlichen Eckpunkte als Absicht und lass § 8 unangetastet.

Zweiter Fehler: Exklusivität ohne Enddatum oder ohne Fahrplan. Der Verkäufer blockiert dann monatelang alle anderen Interessenten, während der Käufer in Ruhe nachdenkt. Koppele die Frist an konkrete Schritte und sieh vor, dass sie nur schriftlich verlängert wird.

Dritter Fehler: unklare Kaufpreisbasis. „1,5 Millionen Euro“ ohne Angabe, ob Schulden abgezogen und Working Capital normalisiert werden, führt in der Due Diligence zwangsläufig zum Streit. Die Vorlage nennt die Basis ausdrücklich.

Vierter Fehler: Abbruch der Verhandlungen ohne Grund, nachdem man den Abschluss als sicher dargestellt hat. § 311 Abs. 2 BGB kann dann zu Ersatz nutzloser Aufwendungen führen. § 8 Abs. 3 der Vorlage stellt klar, dass jede Seite jederzeit aussteigen darf.`,
      },
      {
        titel: "Rechtliche Einordnung: Vorvertrag, Notarpflicht, Haftung",
        text: `Das deutsche Recht kennt den Letter of Intent nicht als eigenen Vertragstyp. Was er bedeutet, ergibt sich aus seinem Inhalt. Die Rechtsprechung unterscheidet die unverbindliche Absichtserklärung vom Vorvertrag, der bereits zum Abschluss des Hauptvertrags verpflichtet. Je konkreter und vollständiger die Regelungen, desto näher rückt der LOI an den Vorvertrag.

Für den Verkauf von GmbH-Anteilen schreibt § 15 Abs. 4 GmbHG die notarielle Beurkundung vor, und zwar auch für die Verpflichtung zur Abtretung. Ein LOI, der eine solche Pflicht enthält, wäre ohne Notar nichtig. Deshalb begründet die Vorlage ausdrücklich keine Übertragungspflicht und verweist auf den notariellen Vertrag.

Die verbindlichen Teile, also Exklusivität, Vertraulichkeit und Kosten, sind normale schuldrechtliche Vereinbarungen nach BGB, die ohne Form gelten. Wer sie verletzt, haftet auf Schadensersatz, bei der Exklusivität nach der optionalen Klausel in § 4 Abs. 3 auf Erstattung der Due-Diligence-Kosten.`,
      },
      {
        titel: "Wann die LOI Vorlage nicht ausreicht",
        text: `Der Mustertext ist auf kleine und mittlere Transaktionen zwischen deutschen Parteien zugeschnitten. Bei Käufern oder Zielgesellschaften im Ausland, bei Konzernen mit eigenen Formularen oder bei einem Verkaufsprozess mit mehreren Bietern gehört der LOI in anwaltliche Hände, schon weil dort Bieterverfahren, Break-up Fees und Rechtswahl verhandelt werden.

Beteiligungen über Wandeldarlehen, Mitarbeiterprogramme oder Beteiligungsgesellschaften mit eigenen Bedingungen lassen sich mit diesem LOI nicht abbilden. Auch wenn Grundstücke zum Kaufgegenstand gehören, gilt für den Hauptvertrag § 311b BGB, und die Absichtserklärung sollte darauf abgestimmt werden.

Sobald die Due Diligence läuft, brauchst du den Kauf- oder Beteiligungsvertrag selbst; der ist bei GmbH-Anteilen Sache des Notars und bei größeren Deals der Kanzlei. GründerX ist eine Software für Gründer und keine Rechtsberatung. Die Vorlage spart dir Zeit und Beratungskosten in der Vorbereitung, ersetzt aber nicht die Prüfung des konkreten Deals, wenn es um dein Unternehmen oder nennenswertes Geld geht.`,
      },
    ],
  text: `Absichtserklärung (Letter of Intent)

über den beabsichtigten Erwerb von [Geschäftsanteilen an der / einer Beteiligung an der / des Geschäftsbetriebs der] [Firma der Zielgesellschaft]

zwischen

[Firma / Vorname Nachname], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Interessent“ –

und

[Firma / Vorname Nachname], [Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname]
– nachfolgend „Inhaber“ –

[und [Firma der Zielgesellschaft], [Rechtsform], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch [Vorname Nachname] – nachfolgend „Gesellschaft“ –]

– gemeinsam „die Parteien“ –

Präambel
Der Inhaber hält [100 / Anteil in %] % der Geschäftsanteile an der Gesellschaft. Die Gesellschaft betreibt [Beschreibung des Geschäfts, z. B. „einen Online-Shop für …“ / „eine Software-Plattform für …“] mit Sitz in [Ort]. Der Interessent beabsichtigt, [sämtliche / einen Teil der] Geschäftsanteile zu erwerben [Alternative: sich im Wege einer Kapitalerhöhung an der Gesellschaft zu beteiligen / die wesentlichen Vermögensgegenstände des Geschäftsbetriebs zu erwerben]. Diese Absichtserklärung hält den Stand der Gespräche und die Rahmenbedingungen für die weiteren Verhandlungen fest.

§ 1 Gegenstand der beabsichtigten Transaktion
(1) Beabsichtigt ist [Variante A: der Erwerb von Geschäftsanteilen im Nennbetrag von insgesamt [Betrag] EUR, entsprechend [Anteil] % des Stammkapitals, durch den Interessenten (Share Deal)] [Variante B: der Erwerb der in einer Anlage zu bestimmenden Vermögensgegenstände, Verträge und Rechte des Geschäftsbetriebs (Asset Deal)] [Variante C: die Übernahme neuer Geschäftsanteile im Rahmen einer Kapitalerhöhung gegen eine Einlage von [Betrag] EUR, sodass der Interessent nach Vollzug mit [Anteil] % beteiligt ist].
(2) Der wirtschaftliche Stichtag soll der [Datum] sein. Der Vollzug (Closing) ist für den [Datum] vorgesehen.
(3) [Optional:] Der Inhaber bleibt für eine Übergangszeit von [z. B. 12] Monaten als Geschäftsführer bzw. Berater für die Gesellschaft tätig; die Bedingungen werden in einem gesonderten Vertrag geregelt.

§ 2 Wirtschaftliche Eckpunkte (indikativ)
(1) Auf Basis der bislang vorgelegten Unterlagen (insbesondere [Jahresabschlüsse [Jahre], BWA per [Datum], Planung [Jahr]]) geht der Interessent von einem Kaufpreis von [Betrag] EUR für [100 / Anteil] % der Geschäftsanteile aus. Der Kaufpreis versteht sich auf Basis „cash and debt free“ und eines normalisierten Working Capital von [Betrag] EUR; Abweichungen zum Stichtag werden [per Locked-Box-Mechanismus / über eine Kaufpreisanpassung nach Stichtagsabschluss] berücksichtigt.
(2) Zahlung: [Betrag] EUR bei Vollzug, [Betrag] EUR als Earn-out, der sich nach [Kennzahl, z. B. EBITDA / Umsatz] der Geschäftsjahre [Jahre] bemisst, [Betrag] EUR als Einbehalt für Garantieansprüche über [z. B. 18] Monate.
(3) Der Inhaber wird im Kaufvertrag marktübliche Garantien abgeben, insbesondere zu Bestand und Lastenfreiheit der Anteile, Richtigkeit der Jahresabschlüsse, Steuern, wesentlichen Verträgen, Arbeitsverhältnissen, Schutzrechten und Rechtsstreitigkeiten. Die Haftung wird betragsmäßig und zeitlich begrenzt.
(4) Der Inhaber wird sich einem Wettbewerbs- und Abwerbeverbot von [z. B. 2] Jahren ab Vollzug im Geschäftsbereich der Gesellschaft unterwerfen.
(5) Die Transaktion steht unter dem Vorbehalt der Finanzierung durch den Interessenten, einer für ihn zufriedenstellenden Due Diligence und ggf. erforderlicher Zustimmungen Dritter (insbesondere [Bank / Vermieter / Schlüsselkunden]).

§ 3 Due Diligence
(1) Der Inhaber gewährt dem Interessenten und seinen Beratern ab dem [Datum] für [z. B. 6] Wochen Zugang zu einem Datenraum mit den für eine rechtliche, steuerliche, finanzielle und [technische / kommerzielle] Prüfung erforderlichen Unterlagen. Die Prüfung erfolgt auf Grundlage einer Anforderungsliste des Interessenten.
(2) Fragen werden über [Ansprechpartner] gestellt und innerhalb von [z. B. 5] Werktagen beantwortet. Gespräche mit Mitarbeitern, Kunden und Lieferanten der Gesellschaft führt der Interessent nur nach vorheriger Abstimmung mit dem Inhaber.
(3) Der Inhaber sichert zu, die Unterlagen nach bestem Wissen vollständig und richtig zur Verfügung zu stellen. Eine Haftung für die Richtigkeit wird erst im Kaufvertrag begründet.

§ 4 Exklusivität
(1) Der Inhaber verpflichtet sich, ab Unterzeichnung bis zum [Datum] (Exklusivitätsfrist) weder selbst noch über Dritte mit anderen Interessenten über einen Verkauf oder eine Beteiligung an der Gesellschaft oder ihrem Geschäftsbetrieb zu verhandeln, dazu Informationen offenzulegen oder Angebote einzuholen oder anzunehmen. Laufende Gespräche mit Dritten werden unverzüglich beendet.
(2) Die Exklusivitätsfrist verlängert sich nur durch schriftliche Vereinbarung. Sie endet vorzeitig, wenn der Interessent schriftlich erklärt, die Verhandlungen nicht fortzusetzen.
(3) [Optional:] Verstößt der Inhaber gegen die Exklusivität, erstattet er dem Interessenten die nachgewiesenen externen Kosten der Due Diligence bis zu [Betrag] EUR.

§ 5 Vertraulichkeit und Kommunikation
(1) Die Parteien behandeln den Inhalt dieser Absichtserklärung, die Tatsache der Verhandlungen und alle im Zuge der Transaktion erhaltenen Informationen vertraulich. [Die zwischen den Parteien am [Datum] geschlossene Geheimhaltungsvereinbarung gilt ergänzend.] Die Weitergabe an Berater, Finanzierungspartner und Organe ist zulässig, soweit diese zur Vertraulichkeit verpflichtet sind.
(2) Öffentliche Mitteilungen und Mitteilungen an Mitarbeiter, Kunden und Lieferanten erfolgen nur nach gemeinsamer Abstimmung. Ist eine Partei gesetzlich zur Offenlegung verpflichtet, informiert sie die andere Partei vorab.
(3) Scheitern die Verhandlungen, gibt jede Partei die erhaltenen Unterlagen zurück oder löscht sie und bestätigt dies auf Verlangen.

§ 6 Kosten
Jede Partei trägt ihre eigenen Kosten und die Kosten ihrer Berater im Zusammenhang mit dieser Absichtserklärung, der Due Diligence und der Verhandlung der Transaktion selbst. Die Kosten der notariellen Beurkundung des Kaufvertrags trägt [der Interessent / die Parteien je zur Hälfte]. [Optional: Kommt der Kaufvertrag aus Gründen, die eine Partei allein zu vertreten hat, nicht zustande, erstattet diese Partei der anderen die externen Beraterkosten bis zu [Betrag] EUR.]

§ 7 Zeitplan
Die Parteien streben folgenden Ablauf an:
   a) Beginn der Due Diligence: [Datum]
   b) Abschluss der Due Diligence: [Datum]
   c) Vorlage des ersten Entwurfs des Kauf- bzw. Beteiligungsvertrags durch [den Interessenten / den Inhaber]: [Datum]
   d) Notarielle Beurkundung (Signing): [Datum]
   e) Vollzug (Closing): [Datum]
Verzögerungen begründen keine Ansprüche; die Parteien passen den Zeitplan einvernehmlich an.

§ 8 Unverbindlichkeit und verbindliche Regelungen
(1) Diese Absichtserklärung dokumentiert den Stand der Verhandlungen. Sie begründet keine Verpflichtung zum Abschluss des Kauf- oder Beteiligungsvertrags und keine Verpflichtung zur Übertragung von Geschäftsanteilen oder Vermögensgegenständen. Die Parteien sind sich bewusst, dass ein Vertrag über GmbH-Geschäftsanteile der notariellen Beurkundung bedarf (§ 15 Abs. 4 GmbHG).
(2) Rechtlich verbindlich sind ausschließlich die §§ 4 (Exklusivität), 5 (Vertraulichkeit), 6 (Kosten), 8 (Unverbindlichkeit) und 9 (Schlussbestimmungen). Alle übrigen Regelungen, insbesondere die §§ 1, 2, 3 und 7, sind unverbindliche Absichtserklärungen, die im endgültigen Vertrag abweichend geregelt werden können.
(3) Jede Partei kann die Verhandlungen jederzeit ohne Angabe von Gründen beenden. Ansprüche wegen des Abbruchs der Verhandlungen, gleich aus welchem Rechtsgrund, sind ausgeschlossen; unberührt bleiben Ansprüche aus Verstößen gegen die verbindlichen Regelungen dieser Absichtserklärung sowie aus vorsätzlichem Handeln.
(4) Ansprüche und Rechte entstehen ausschließlich aus dem endgültigen, notariell beurkundeten Vertrag.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieser Absichtserklärung bedürfen der Schriftform; das gilt auch für die Aufhebung dieser Klausel.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Absichtserklärung im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, [Ort].
(4) Diese Absichtserklärung gilt bis zum [Datum]; sie verliert ihre Wirkung mit Abschluss des endgültigen Vertrags oder mit schriftlicher Beendigung der Verhandlungen durch eine Partei. Die §§ 5 und 6 gelten darüber hinaus fort.

[Ort], den [Datum]


______________________________
[Vorname Nachname], für den Interessenten


______________________________
[Vorname Nachname], Inhaber


[______________________________
[Vorname Nachname], für die Gesellschaft]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
