// Inhalt der Vorlage „gruendervereinbarung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../gesellschaft.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann brauchst du eine Gründervereinbarung?",
        text: `Zwischen der ersten Idee und dem Notartermin vergehen meist Monate. In dieser Zeit entsteht Code, ein Markenname, eine Domain, erste Kundenkontakte, und oft steckt schon privates Geld im Projekt. Rechtlich seid ihr in dieser Phase bereits eine GbR und haftet persönlich, aber wem die Ergebnisse gehören und wer wie viel bekommt, ist ungeklärt.

Eine Gründervereinbarung (Founders' Agreement) brauchst du, sobald zwei oder mehr Personen ernsthaft an einem gemeinsamen Vorhaben arbeiten und eine UG oder GmbH planen. Sie ist besonders wichtig, wenn einer in Vollzeit und der andere nebenbei arbeitet, wenn ein Gründer die Kerntechnologie mitbringt oder wenn ihr früh mit Investoren oder Förderprogrammen sprecht, die nach der Teamstruktur fragen. Und sie schützt den Fall, der am häufigsten vorkommt: Ein Mitgründer springt vor der Gründung ab.`,
      },
      {
        titel: "Was muss in ein Founders' Agreement?",
        text: `Die Vereinbarung regelt das Innenverhältnis bis zur Eintragung der Gesellschaft. Die Vorlage deckt in elf Paragraphen alle Punkte ab, über die Gründerteams erfahrungsgemäß streiten:

- Vorhaben, Zieltermin der Gründung und der ausdrückliche Hinweis, dass keine einklagbare Gründungspflicht entsteht (§ 1)
- Rollen und Verantwortungsbereiche, geplante Geschäftsführer, Rhythmus der Gründertreffen (§ 2)
- Zeiteinsatz in Wochenstunden, Vergütung vor der Gründung, bestehende Nebentätigkeiten (§ 3)
- geplante Beteiligungsquoten, Stammkapital, Mindestinhalt der späteren Satzung, Mitarbeiterpool und Umgang mit Investoren (§ 4)
- Vesting mit Cliff und Laufzeit als Verweis auf die spätere Vesting-Vereinbarung (§ 5)
- geistiges Eigentum: Einräumung aller Nutzungsrechte, Übertragung auf die Gesellschaft, vorbestehende Rechte in Anlage 1, Open-Source-Regel (§ 6)
- Kosten, Auslagen, Zustimmungsgrenze und Auslagenliste (§ 7)
- Entscheidungen bis zur Gründung und Schlichtung bei Patt (§ 8)
- Vertraulichkeit und Wettbewerbsverbot (§ 9)
- Ausscheiden eines Gründers und Scheitern der Gründung (§ 10)
- Laufzeit bis zur Handelsregistereintragung, Fortgeltung von IP und Vertraulichkeit (§ 11)

Besonders § 6 und § 10 sind das, was ein späterer Gesellschaftsvertrag nicht mehr rückwirkend heilen kann.`,
      },
      {
        titel: "Gründervereinbarung Muster ausfüllen: Schritt für Schritt",
        text: `Nimm dir für das Ausfüllen einen gemeinsamen Termin, denn jeder Platzhalter ist eine Entscheidung des Teams:

- Präambel: Beschreibung des Vorhabens, geplante Rechtsform und Firma.
- § 1: realistisches Datum für die Gründung.
- § 2: je Gründer den Verantwortungsbereich in ein bis zwei Zeilen, den oder die geplanten Geschäftsführer, den Rhythmus der Treffen.
- § 3: Wochenstunden je Gründer; entscheidet euch zwischen keiner Vergütung und der Vorschuss-Variante und löscht die andere. Bestehende Jobs mit Enddatum eintragen.
- § 4: Beteiligungsquoten, die zusammen 100 Prozent ergeben, das Stammkapital und die Größe eines Mitarbeiterpools.
- § 5: Vesting-Dauer, Cliff und Startdatum; üblich sind 48 Monate, 12 Monate Cliff und der Beginn der Zusammenarbeit.
- § 6 Abs. 3: alle Domains, Repositories, Marken und Entwürfe, die ein Gründer schon vorher hatte, in Anlage 1 aufführen.
- § 7: Zustimmungsgrenze für Auslagen und die bisher verauslagten Beträge mit Belegen in Anlage 2.
- § 8 und § 10: Schwellenwert für zustimmungspflichtige Verträge, Schlichtungsmechanismus, Kündigungsfrist, Frist für die Auslagenerstattung und optional eine Abfindung für geleistete Arbeit.

Danach Ort, Datum und Unterschrift aller Gründer. Die Vorlage gibt es als Word zum Bearbeiten und als PDF zum Unterschreiben.`,
      },
      {
        titel: "Typische Fehler in Gründervereinbarungen",
        text: `Der größte Fehler ist, die Anteile gleich zu verteilen, obwohl Einsatz und Risiko ungleich sind. 50/50 fühlt sich fair an, führt aber bei Patt zur Blockade und bei ungleichem Einsatz zu Frust. Besser: Quoten nach Beitrag und ein Vesting, das Anteile an das Bleiben koppelt.

Zweiter Fehler: Die IP-Klausel bleibt abstrakt. Nur wenn Code, Designs, Domain und Konten konkret benannt sind und ein Gründer seine vorbestehenden Rechte in Anlage 1 offenlegt, lässt sich später beweisen, was der Gesellschaft gehört. Ebenso wichtig: Hat ein Gründer noch einen Arbeitsvertrag, können Arbeitsergebnisse dem Arbeitgeber zustehen; das muss vorab geklärt werden.

Dritter Fehler: Auslagen ohne Beleg. Geld, das ohne Auslagenliste ins Projekt fließt, ist im Streit verloren und bei der Gründung nicht als Darlehen oder Einlage anrechenbar. Vierter Fehler: eine Formulierung, die eine Pflicht zur GmbH-Gründung oder zur Übertragung von Anteilen enthält. Das wäre beurkundungspflichtig und macht die ganze Vereinbarung angreifbar. Die Vorlage spricht deshalb von Absicht und regelt stattdessen präzise, was beim Scheitern passiert.`,
      },
      {
        titel: "Rechtliche Einordnung: Vorgründungsgesellschaft und Formfragen",
        text: `Sobald mehrere Personen ein gemeinsames Ziel verfolgen, entsteht eine Gesellschaft bürgerlichen Rechts, die sogenannte Vorgründungsgesellschaft. Für sie gelten die §§ 705 ff. BGB in der Fassung des MoPeG seit 2024: Alle Beteiligten haften persönlich und unbeschränkt für Verbindlichkeiten, die in dieser Phase entstehen. Die Gründervereinbarung ist damit rechtlich ein GbR-Vertrag mit Zweck Gründungsvorbereitung.

Formfrei ist sie nur, solange sie keine Verpflichtung enthält, eine GmbH zu gründen oder Geschäftsanteile zu übertragen; solche Vorverträge wären nach § 2 beziehungsweise § 15 Abs. 4 GmbHG beurkundungspflichtig. Die Übertragung von Urheberrechten ist nach deutschem Recht nicht möglich (§ 29 UrhG); möglich und in § 6 der Vorlage umgesetzt ist die Einräumung ausschließlicher Nutzungsrechte. Marken und Domains werden dagegen tatsächlich übertragen, Patente und Gebrauchsmuster ebenfalls.

Mit der Eintragung der Gesellschaft ins Handelsregister endet die Vereinbarung; ihre Inhalte wandern in Satzung, Vesting-Vereinbarung und Geschäftsführerverträge. IP- und Vertraulichkeitsregeln gelten nach § 11 der Vorlage fort, damit keine Lücke entsteht.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht und wer dann hilft",
        text: `Die Gründervereinbarung ist ein Schriftform-Dokument für den Normalfall: zwei bis vier natürliche Personen, Software, Dienstleistung oder Handel, noch kein Fremdkapital. Hol dir Unterstützung, wenn

- ein Gründer noch angestellt ist und sein Arbeitsvertrag Erfindungen oder Nebentätigkeiten regelt; hier braucht es eine Freigabe des Arbeitgebers,
- Patente, Forschungsergebnisse einer Hochschule oder Lizenzen Dritter im Spiel sind,
- schon vor der Gründung ein Investor oder Accelerator Anteile zugesagt bekommen soll,
- ein Gründer im Ausland wohnt oder eine ausländische Gesellschaft beteiligt werden soll,
- Förderprogramme wie EXIST oder Gründungsstipendien Bedingungen an die Teamstruktur knüpfen.

In diesen Fällen sollte ein Anwalt für Gesellschaftsrecht die Vereinbarung prüfen und direkt mit Satzung und Vesting abstimmen; ein Steuerberater klärt, wie Auslagen und eingebrachte Werte bei der Gründung behandelt werden. Diese Vorlage von GründerX ist ein Software-Muster und keine Rechtsberatung, aber eine Grundlage, mit der das Beratungsgespräch kürzer und günstiger wird.`,
      },
    ],
  text: `Gründervereinbarung (Vorgründungsvereinbarung)

zwischen

1. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
2. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
[3. ggf. weitere Gründer]

– gemeinsam „die Gründer“ –

Präambel
Die Gründer beabsichtigen, gemeinsam ein Unternehmen mit dem Vorhaben [kurze Beschreibung, z. B. „Entwicklung einer Software zur Terminplanung für Handwerksbetriebe“] (das „Vorhaben“) aufzubauen und hierfür eine [UG (haftungsbeschränkt) / GmbH] mit der Firma „[Name]“ (die „Gesellschaft“) zu gründen. Bis zur Gründung regeln sie ihre Zusammenarbeit mit dieser Vereinbarung. Die Gründer sind sich bewusst, dass sie bis zur Eintragung der Gesellschaft als Gesellschaft bürgerlichen Rechts zusammenarbeiten und persönlich haften.

§ 1 Vorhaben und Ziel
(1) Ziel der Zusammenarbeit ist die Gründung der Gesellschaft bis zum [Datum] und die Entwicklung des Vorhabens bis zur Marktreife.
(2) Die Gründer verpflichten sich, bis zur Gründung alle Handlungen zu unterlassen, die das Vorhaben gefährden, und die Gesellschaft nach der Gründung gemeinsam fortzuführen. Eine einklagbare Verpflichtung zur Gründung der Gesellschaft wird nicht begründet.

§ 2 Rollen und Aufgaben
(1) Die Gründer übernehmen folgende Verantwortungsbereiche:
   a) [Vorname Nachname]: [z. B. Produkt und Technik (CTO): Softwareentwicklung, Infrastruktur, Datenschutz]
   b) [Vorname Nachname]: [z. B. Geschäftsführung und Vertrieb (CEO): Finanzen, Kunden, Partner, Investoren]
   c) [Vorname Nachname]: [z. B. Marketing und Design]
(2) Als Geschäftsführer der künftigen Gesellschaft soll [Vorname Nachname] bestellt werden. [Optional: Weitere Geschäftsführer: [Name].]
(3) Die Gründer stimmen sich mindestens [wöchentlich] in einem Gründertreffen ab und halten Entscheidungen schriftlich fest.

§ 3 Zeiteinsatz und Vergütung
(1) Die Gründer bringen ihre Arbeitskraft wie folgt ein: [Vorname Nachname] [Stunden] Stunden pro Woche, [Vorname Nachname] [Stunden] Stunden pro Woche.
(2) Bis zur Gründung erhalten die Gründer keine Vergütung. [Alternative: Jeder Gründer erhält ab dem [Datum] eine monatliche Vergütung von [Betrag] EUR, die als Vorschuss auf spätere Geschäftsführervergütungen gilt und nur aus Einnahmen des Vorhabens gezahlt wird.]
(3) Nebentätigkeiten, die den Zeiteinsatz nach Absatz 1 einschränken, sind den übrigen Gründern vorher anzuzeigen. Bestehende Tätigkeiten: [z. B. „Teilzeitanstellung von [Name] bei [Firma] bis zum [Datum]“].

§ 4 Beteiligung an der künftigen Gesellschaft
(1) Am Stammkapital der Gesellschaft sollen die Gründer wie folgt beteiligt werden: [Vorname Nachname] [z. B. 40] %, [Vorname Nachname] [z. B. 40] %, [Vorname Nachname] [z. B. 20] %.
(2) Das Stammkapital soll [Betrag] EUR betragen und von den Gründern im Verhältnis ihrer Beteiligung in bar eingezahlt werden.
(3) Die Gründer verpflichten sich, bei Gründung einen Gesellschaftsvertrag zu beschließen, der mindestens Vinkulierung der Geschäftsanteile, Einziehungsgründe, eine Abfindungsregelung und ein Wettbewerbsverbot enthält. Die Vereinbarung eines Mitarbeiterbeteiligungspools von bis zu [z. B. 10] % des Stammkapitals wird angestrebt.
(4) Für die Aufnahme von Investoren gilt: Jeder Gründer stimmt einer Kapitalerhöhung zu, wenn die Mehrheit der Gründer nach Köpfen dies beschließt und die Beteiligung der Gründer untereinander im gleichen Verhältnis verwässert wird.

§ 5 Vesting
(1) Die Geschäftsanteile der Gründer unterliegen nach Gründung einem Vesting über [48] Monate mit einem Cliff von [12] Monaten, gerechnet ab dem [Datum, z. B. Beginn der Zusammenarbeit]. Die Einzelheiten (Good Leaver, Bad Leaver, Call-Option, Abfindung, Beschleunigung bei Exit) werden in einer gesonderten Vesting-Vereinbarung bei Gründung geregelt.
(2) Bis zur Gründung gilt entsprechend: Scheidet ein Gründer vor der Gründung aus, entfällt sein Anspruch auf eine Beteiligung vollständig (§ 10).

§ 6 Geistiges Eigentum und Arbeitsergebnisse
(1) Alle im Rahmen des Vorhabens entstandenen oder entstehenden Arbeitsergebnisse, insbesondere Quellcode, Software, Datenbanken, Designs, Texte, Konzepte, Geschäftspläne, Marken, Logos, Domains, Social-Media-Konten und Kundenkontakte („Arbeitsergebnisse“), sollen der Gesellschaft zustehen.
(2) Jeder Gründer räumt den übrigen Gründern gemeinsam bereits jetzt das ausschließliche, zeitlich, räumlich und inhaltlich unbeschränkte, übertragbare und unterlizenzierbare Nutzungsrecht an seinen Arbeitsergebnissen für alle bekannten Nutzungsarten ein. Mit Eintragung der Gesellschaft werden diese Rechte auf die Gesellschaft übertragen; die Gründer verpflichten sich, hierzu alle erforderlichen Erklärungen abzugeben (insbesondere Übertragungsverträge, Markenumschreibungen, Domain-Übertragungen).
(3) Vorbestehende Rechte, die ein Gründer einbringt, sind in Anlage 1 aufgeführt: [z. B. „Domain [name].de, registriert auf [Name]“; „Code-Repository [Name], Stand [Datum]“]. Nicht aufgeführte Rechte gelten als Arbeitsergebnisse nach Absatz 1.
(4) Eine gesonderte Vergütung für die Rechteeinräumung erfolgt nicht; sie ist mit der Beteiligung nach § 4 abgegolten. Die Gründer stellen sicher, dass keine Rechte Dritter (insbesondere früherer Arbeitgeber oder Auftraggeber) an den Arbeitsergebnissen bestehen.
(5) Open-Source-Komponenten dürfen nur unter Lizenzen verwendet werden, die eine kommerzielle Nutzung ohne Offenlegungspflicht des eigenen Codes erlauben, sofern die Gründer nichts anderes beschließen.

§ 7 Kosten und Auslagen
(1) Die Kosten der Gründung (Notar, Handelsregister, Beratung) trägt die Gesellschaft im Rahmen des in der Satzung bezifferten Gründungsaufwands, im Übrigen die Gründer im Verhältnis ihrer Beteiligung.
(2) Auslagen für das Vorhaben vor der Gründung (Software, Hosting, Domains, Reisen) bedürfen ab [Betrag, z. B. 200] EUR im Einzelfall der vorherigen Zustimmung aller Gründer. Nachgewiesene Auslagen werden in einer Auslagenliste geführt und nach Gründung von der Gesellschaft erstattet oder als Gesellschafterdarlehen übernommen, sobald die Liquidität dies zulässt.
(3) Bisherige Auslagen: [Vorname Nachname] [Betrag] EUR, [Vorname Nachname] [Betrag] EUR (Belege in Anlage 2).

§ 8 Entscheidungen bis zur Gründung
(1) Entscheidungen des gewöhnlichen Geschäftsgangs trifft jeder Gründer in seinem Verantwortungsbereich allein.
(2) Folgende Entscheidungen bedürfen der Zustimmung aller Gründer: Abschluss von Verträgen über [Betrag] EUR, Aufnahme von Fremdkapital, Gespräche mit Investoren über Beteiligungen, Anmeldung von Marken und Patenten, Einstellung von Mitarbeitern oder Freelancern, Veröffentlichung des Produkts.
(3) Kommt keine Einigung zustande, entscheidet [die Mehrheit der Gründer nach Köpfen / ein gemeinsam benannter Mentor als Schlichter].

§ 9 Vertraulichkeit und Wettbewerb
(1) Die Gründer behandeln alle Informationen über das Vorhaben vertraulich und geben sie nur an Berater, Investoren und Dienstleister weiter, die zur Vertraulichkeit verpflichtet sind. Diese Pflicht gilt auch nach Beendigung dieser Vereinbarung für [z. B. 3] Jahre.
(2) Während der Laufzeit dieser Vereinbarung darf kein Gründer ein konkurrierendes Vorhaben betreiben oder sich daran beteiligen.

§ 10 Ausscheiden und Scheitern der Gründung
(1) Jeder Gründer kann diese Vereinbarung mit einer Frist von [z. B. 4] Wochen schriftlich kündigen. Die übrigen Gründer können einen Gründer aus wichtigem Grund (insbesondere bei dauerhafter Nichterfüllung des Zeiteinsatzes, Verstoß gegen §§ 6 oder 9) durch einstimmigen Beschluss ausschließen.
(2) Scheidet ein Gründer aus, so
   a) entfällt sein Anspruch auf Beteiligung an der Gesellschaft,
   b) bleiben die Rechte nach § 6 bei den verbleibenden Gründern; der Ausscheidende gibt alle Zugänge, Unterlagen und Daten heraus und löscht eigene Kopien,
   c) erhält er seine nachgewiesenen Auslagen nach § 7 erstattet, sobald die Gesellschaft gegründet ist oder das Vorhaben Einnahmen erzielt, spätestens nach [z. B. 12] Monaten,
   d) [optional: erhält er für seinen Arbeitseinsatz eine einmalige Vergütung von [Betrag] EUR, zahlbar [Fälligkeit]].
(3) Wird die Gesellschaft nicht bis zum [Datum] gegründet oder beschließen die Gründer, das Vorhaben aufzugeben, endet diese Vereinbarung. Die Arbeitsergebnisse stehen dann allen Gründern gemeinsam zu; jeder darf sie nur mit Zustimmung der übrigen verwerten. Vorbestehende Rechte nach § 6 Abs. 3 fallen an den jeweiligen Gründer zurück. Verbleibendes Vermögen und Schulden werden im Verhältnis der geplanten Beteiligung nach § 4 verteilt.

§ 11 Laufzeit und Schlussbestimmungen
(1) Diese Vereinbarung tritt mit Unterzeichnung in Kraft und endet mit der Eintragung der Gesellschaft in das Handelsregister, soweit ihre Regelungen nicht in Satzung, Vesting- oder Gesellschaftervereinbarung übernommen werden. §§ 6 und 9 gelten fort.
(2) Änderungen bedürfen der Schriftform; das gilt auch für diese Klausel.
(3) Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam. Die Gründer ersetzen die unwirksame Regelung durch eine wirksame, die dem Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, [Ort]. Es gilt deutsches Recht.

Anlagen: 1 Vorbestehende Rechte, 2 Auslagenliste

[Ort], den [Datum]


______________________________
[Vorname Nachname]


______________________________
[Vorname Nachname]


[______________________________
[Vorname Nachname]]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
