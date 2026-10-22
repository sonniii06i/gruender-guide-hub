// Inhalt der Vorlage „verschwiegenheitserklaerung-mitarbeiter“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../arbeit.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Verschwiegenheitserklärung für Mitarbeiter brauchst",
        text: `Deine Entwicklerin sieht den kompletten Quellcode, der Vertriebsmitarbeiter kennt jede Kundenkondition, die Werkstudentin hat Zugriff auf die Werbekennzahlen und den Businessplan für die nächste Finanzierungsrunde. Sobald Mitarbeiter Informationen sehen, die deinen Wettbewerbsvorteil ausmachen, reicht der eine Satz zur Verschwiegenheit im Arbeitsvertrag nicht mehr. Du brauchst eine gesonderte Geheimhaltungsvereinbarung, die konkret sagt, was geheim ist, wie es zu schützen ist und was nach dem Ausscheiden gilt.

Die Vorlage ist für alle Beschäftigten gedacht, auch für Werkstudenten, Praktikanten und Minijobber, und lässt sich zu einem bestehenden Arbeitsvertrag nachträglich abschließen. Für Geschäftspartner, Freelancer und Investoren gibt es die NDA-Vorlagen in der Kategorie Geheimhaltung.`,
      },
      {
        titel: "Was muss in eine Verschwiegenheitserklärung nach dem GeschGehG?",
        text: `Seit dem Geschäftsgeheimnisgesetz entscheidet die Dokumentation deiner Schutzmaßnahmen darüber, ob eine Information überhaupt als Geschäftsgeheimnis gilt. Das Muster ist darauf aufgebaut:

- Zweck und Verhältnis zum Arbeitsvertrag mit ausdrücklicher Einordnung als Geheimhaltungsmaßnahme (§ 1)
- Definition der Geschäftsgeheimnisse mit konkreter Aufzählung für dein Unternehmen, Abgrenzung zu sonstigen vertraulichen Informationen und Ausnahmen für Erfahrungswissen (§ 2)
- Geheimhaltungspflichten einschließlich Kopier- und Weitergabeverbot, auch gegenüber Familie und sozialen Medien (§ 3)
- Erlaubte Nutzung und die gesetzlich zwingenden Ausnahmen für Whistleblowing, Behörden, Betriebsrat und Anwalt (§ 4)
- Schutzmaßnahmen, Kennzeichnung als vertraulich, nur freigegebene Systeme (§ 5)
- Rückgabe und Löschung mit Bestätigung in Textform (§ 6)
- Dauer der Pflichten nach dem Ausscheiden, unbegrenzt für echte Geheimnisse, befristet für sonstige Informationen (§ 7)
- Rechtsfolgen, Hinweis auf Strafbarkeit und eine optionale, begrenzte Vertragsstrafe (§ 8)
- Textform, salvatorische Klausel, Empfangsbestätigung (§ 9)

Die Liste in § 2 Abs. 1 ist der Teil, den du nicht abstrakt lassen darfst. Je konkreter sie ist, desto leichter beweist du später, dass der Mitarbeiter wusste, was geheim war.`,
      },
      {
        titel: "Verschwiegenheitserklärung Muster ausfüllen",
        text: `Trage im Kopf Datum des Arbeitsvertrags und Funktion des Mitarbeiters ein. Gehe dann die Buchstaben a) bis g) in § 2 Abs. 1 durch und passe sie an dein Geschäft an: Ein Online-Shop streicht Rezepturen und ergänzt Lieferanten und Werbekennzahlen, ein Software-Start-up betont Quellcode, Architektur und Zugangsdaten, ein Beratungsunternehmen Kundenlisten und Angebotskalkulationen. Unter g) nennst du das eine Geheimnis, das dein Unternehmen ausmacht, mit Namen.

In § 4 Abs. 2 trägst du die interne Meldestelle nach dem Hinweisgeberschutzgesetz ein, falls du eine hast; sonst streichst du den Zusatz und lässt den Verweis auf externe Meldestellen stehen. In § 5 Abs. 2 nennst du die Systeme, über die Geschäftsgeheimnisse laufen dürfen, in § 5 Abs. 4 das Datum der Datenschutzunterweisung. In § 7 Abs. 3 setzt du die Frist für sonstige vertrauliche Informationen; drei Jahre sind üblich. In § 8 entscheidest du dich für oder gegen die Vertragsstrafe und streichst den anderen Absatz. Lass die Erklärung vor dem ersten Zugriff auf die Systeme unterschreiben und lege sie zur Personalakte.`,
      },
      {
        titel: "Typische Fehler bei Geheimhaltungsklauseln für Arbeitnehmer",
        text: `Der häufigste Fehler ist die Catch-all-Klausel: „Alle Informationen über das Unternehmen sind geheim zu halten.“ Gerichte halten solche Klauseln für eine unangemessene Benachteiligung, weil sie den Mitarbeiter in seinem beruflichen Fortkommen lähmen; im Ergebnis gilt dann nur die gesetzliche Mindestpflicht. Die Vorlage definiert konkret und nimmt Erfahrungswissen ausdrücklich aus.

Zweiter Fehler ist das versteckte Wettbewerbsverbot. Wer die Geheimhaltung so weit fasst, dass der Mitarbeiter nach dem Ausscheiden praktisch nicht mehr in der Branche arbeiten kann, hat ein nachvertragliches Wettbewerbsverbot geschaffen, das ohne Karenzentschädigung nach § 74 HGB unverbindlich ist. § 7 Abs. 4 stellt deshalb klar, dass kein Wettbewerbsverbot begründet wird.

Dritter Fehler ist die überhöhte oder unbestimmte Vertragsstrafe. „Bei jedem Verstoß 50.000 EUR“ fällt als unangemessen und intransparent. Vermeide außerdem Klauseln, die Whistleblowing oder den Gang zu Behörden verbieten, und die Vereinbarung ohne tatsächliche Schutzmaßnahmen dahinter: Wer Kundenlisten offen auf dem Server für alle liegen lässt, kann sich nicht auf die Erklärung berufen.`,
      },
      {
        titel: "Rechtliche Grundlagen: Geschäftsgeheimnisgesetz, § 74 HGB, Hinweisgeberschutz",
        text: `Nach § 2 Nr. 1 GeschGehG ist eine Information nur dann ein Geschäftsgeheimnis, wenn sie geheim und deshalb wirtschaftlich wertvoll ist, Gegenstand angemessener Geheimhaltungsmaßnahmen ist und ein berechtigtes Geheimhaltungsinteresse besteht. Die unterschriebene Verschwiegenheitserklärung ist zusammen mit Zugriffsbeschränkungen und Kennzeichnung die wichtigste dieser Maßnahmen. Bei Verstößen gewährt das Gesetz in den §§ 6 bis 10 GeschGehG Ansprüche auf Unterlassung, Beseitigung, Auskunft und Schadensersatz; nach § 23 GeschGehG ist die Verletzung strafbar. § 5 GeschGehG und das Hinweisgeberschutzgesetz schützen Meldungen von Rechtsverstößen.

Während des Arbeitsverhältnisses folgt die Verschwiegenheit schon aus § 241 Abs. 2 BGB. Nach dem Ende darf der Mitarbeiter sein redlich erworbenes Wissen nutzen; nur echte Geschäftsgeheimnisse bleiben geschützt. Eine nachvertragliche Geheimhaltungspflicht ist ohne Entschädigung zulässig, ein nachvertragliches Wettbewerbsverbot dagegen nur mit Karenzentschädigung nach §§ 74 ff. HGB. Vertragsstrafen sind gegenüber Arbeitnehmern trotz § 309 Nr. 6 BGB zulässig, müssen aber transparent und angemessen sein.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht und du anwaltlichen Rat brauchst",
        text: `Willst du einem Vertriebsleiter oder Entwickler nach dem Ausscheiden wirklich verbieten, zur Konkurrenz zu gehen, brauchst du ein nachvertragliches Wettbewerbsverbot mit Karenzentschädigung von mindestens der Hälfte der letzten Bezüge; das ist ein eigener Vertrag mit strengen Formvorschriften und gehört in anwaltliche Hände. Dasselbe gilt für Erfindungen, die dem Arbeitnehmererfindungsgesetz unterliegen, und für Mitarbeiter, die mit Patenten oder Rezepturen arbeiten, die noch nicht angemeldet sind.

Bei Mitarbeitern mit Zugriff auf Gesundheitsdaten, Finanzdaten oder Daten von Kunden mit eigenen Vertraulichkeitsanforderungen müssen die Schutzmaßnahmen in § 5 deutlich über die Mindestregeln hinausgehen. Mit Betriebsrat können Regelungen zu Kontrollen und Löschungsnachweisen mitbestimmungspflichtig sein. GründerX ist Software und keine Rechtsberatung; wenn ein Mitarbeiter bereits Daten mitgenommen hat, zählt jede Stunde, und du solltest sofort einen Anwalt für einstweiligen Rechtsschutz einschalten.`,
      },
    ],
  text: `Verschwiegenheitserklärung (Geheimhaltungsvereinbarung für Beschäftigte)

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], wohnhaft [Straße, PLZ Ort], beschäftigt als [Berufsbezeichnung / Werkstudent / Praktikant] seit dem [Datum]
– nachfolgend „Mitarbeiter“ –

§ 1 Zweck und Verhältnis zum Arbeitsvertrag
(1) Der Mitarbeiter erhält im Rahmen seiner Tätigkeit Zugang zu Geschäftsgeheimnissen und vertraulichen Informationen des Arbeitgebers, seiner Kunden und Geschäftspartner. Diese Vereinbarung konkretisiert die Verschwiegenheitspflicht aus dem Arbeitsvertrag vom [Datum] und ist eine angemessene Geheimhaltungsmaßnahme im Sinne des § 2 Nr. 1 Buchst. b GeschGehG.
(2) Die gesetzlichen Pflichten des Mitarbeiters, insbesondere aus § 241 Abs. 2 BGB, dem Geschäftsgeheimnisgesetz und dem Datenschutzrecht, bleiben neben dieser Vereinbarung bestehen.

§ 2 Begriff des Geschäftsgeheimnisses und vertraulicher Informationen
(1) Geschäftsgeheimnisse sind Informationen, die weder insgesamt noch in ihren Einzelheiten allgemein bekannt oder ohne Weiteres zugänglich sind, deshalb von wirtschaftlichem Wert sind, Gegenstand angemessener Geheimhaltungsmaßnahmen des Arbeitgebers sind und an deren Geheimhaltung ein berechtigtes Interesse besteht (§ 2 Nr. 1 GeschGehG). Hierzu gehören beim Arbeitgeber insbesondere:
   a) Kunden- und Interessentenlisten mit Ansprechpartnern, Konditionen, Umsätzen und Bestellhistorie,
   b) Einkaufsquellen, Lieferanten- und Herstellerkonditionen, Preiskalkulationen, Margen und Rabattstrukturen,
   c) Quellcode, Softwarearchitektur, Zugangsdaten, technische Dokumentation, Rezepturen, Konstruktionen und Verfahren,
   d) Geschäfts-, Finanz- und Marketingpläne, Umsatz- und Ertragszahlen, Investoren- und Finanzierungsunterlagen, Businesspläne,
   e) Produktentwicklungen, Prototypen, nicht veröffentlichte Marken-, Design- und Patentanmeldungen,
   f) Kampagnendaten, Werbekennzahlen, Conversion-Raten, Keyword-Listen und Auswertungen,
   g) [weitere unternehmensspezifische Informationen, z. B. „Rezeptur des Produkts [Bezeichnung]“].
(2) Vertrauliche Informationen sind darüber hinaus alle Informationen, die als „vertraulich“ gekennzeichnet sind oder bei denen sich die Vertraulichkeit aus der Natur der Information oder den Umständen ergibt, insbesondere interne Kommunikation, Personaldaten, Vertragsinhalte mit Kunden und Partnern sowie Informationen über Geschäftsbeziehungen.
(3) Nicht erfasst sind Informationen, die allgemein bekannt oder öffentlich zugänglich sind, ohne dass der Mitarbeiter dies zu vertreten hat, die der Mitarbeiter nachweislich bereits vor Beginn der Beschäftigung kannte, sowie das allgemeine berufliche Erfahrungswissen, die Fähigkeiten und Kenntnisse, die der Mitarbeiter während der Beschäftigung redlich erworben hat.

§ 3 Geheimhaltungspflichten
(1) Der Mitarbeiter verpflichtet sich, Geschäftsgeheimnisse und vertrauliche Informationen
   a) streng vertraulich zu behandeln und nicht an Dritte weiterzugeben oder zugänglich zu machen; Dritte sind auch Familienangehörige, Freunde und Mitarbeiter des Arbeitgebers, die die Information für ihre Aufgaben nicht benötigen,
   b) ausschließlich für die Erfüllung seiner arbeitsvertraglichen Aufgaben zu nutzen und nicht für eigene oder fremde Zwecke zu verwerten,
   c) nicht ohne dienstliche Notwendigkeit zu kopieren, zu fotografieren, abzuschreiben, auf private Geräte, private Cloud- oder E-Mail-Konten zu übertragen oder auf andere Weise zu vervielfältigen,
   d) nicht in sozialen Medien, Foren, Chats, Vorträgen, Bewerbungen oder Veröffentlichungen zu verwenden.
(2) Der Mitarbeiter wird Geschäftsgeheimnisse von Kunden, Lieferanten und Geschäftspartnern, die ihm im Rahmen seiner Tätigkeit anvertraut werden, in gleicher Weise schützen.
(3) Der Mitarbeiter wird ihm bekannt werdende Verstöße Dritter gegen die Geheimhaltung sowie den Verdacht eines unbefugten Zugriffs unverzüglich dem Arbeitgeber melden.

§ 4 Erlaubte Nutzung und Ausnahmen
(1) Die Weitergabe von Informationen ist erlaubt, soweit sie zur Erfüllung der Aufgaben des Mitarbeiters erforderlich ist und an Personen erfolgt, die ihrerseits zur Vertraulichkeit verpflichtet sind (Kollegen, beauftragte Dienstleister, Berater).
(2) Unberührt bleibt das Recht des Mitarbeiters, Geschäftsgeheimnisse offenzulegen, soweit dies zur Aufdeckung einer rechtswidrigen Handlung oder eines beruflichen oder sonstigen Fehlverhaltens erforderlich ist und geeignet ist, das allgemeine öffentliche Interesse zu schützen (§ 5 Nr. 2 GeschGehG), sowie das Recht, Meldungen nach dem Hinweisgeberschutzgesetz an die interne Meldestelle [Bezeichnung / Kontakt] oder eine externe Meldestelle abzugeben.
(3) Unberührt bleiben außerdem gesetzliche Auskunfts- und Offenlegungspflichten gegenüber Gerichten und Behörden, das Recht, sich an den Betriebsrat, eine Gewerkschaft oder einen Rechtsanwalt zu wenden, sowie Erklärungen, zu denen der Mitarbeiter gesetzlich verpflichtet ist. Soweit möglich, informiert der Mitarbeiter den Arbeitgeber vorab über die Offenlegung.

§ 5 Schutzmaßnahmen und Umgang mit Daten
(1) Der Mitarbeiter hält die IT-Sicherheits- und Datenschutzrichtlinien des Arbeitgebers in der jeweils gültigen Fassung ein, insbesondere: Zugangsdaten geheim halten und nicht weitergeben, Bildschirme sperren, nur freigegebene Geräte und Software nutzen, Unterlagen verschlossen aufbewahren, Dokumente über die vorgesehenen Systeme teilen statt per privatem Messenger.
(2) Der Mitarbeiter verwendet zur Speicherung und Übermittlung von Geschäftsgeheimnissen ausschließlich die vom Arbeitgeber bereitgestellten Systeme [Bezeichnung]. Lokale Kopien auf privaten Geräten sind untersagt.
(3) Der Mitarbeiter kennzeichnet von ihm erstellte Dokumente mit Geschäftsgeheimnissen als „vertraulich“ und beschränkt deren Verteilerkreis auf das Erforderliche.
(4) Personenbezogene Daten verarbeitet der Mitarbeiter nur nach Weisung des Arbeitgebers und im Rahmen der Datenschutzunterweisung vom [Datum].

§ 6 Rückgabe und Löschung
(1) Bei Beendigung des Arbeitsverhältnisses, bei Freistellung oder jederzeit auf Verlangen des Arbeitgebers gibt der Mitarbeiter sämtliche Unterlagen, Datenträger, Geräte und sonstigen Gegenstände, die Geschäftsgeheimnisse oder vertrauliche Informationen enthalten, einschließlich aller Kopien, Notizen und Auszüge unverzüglich und vollständig an den Arbeitgeber zurück.
(2) Auf privaten Geräten, in privaten E-Mail-Konten, Cloud-Speichern und Messengern gespeicherte dienstliche Daten löscht der Mitarbeiter unwiderruflich und bestätigt die vollständige Rückgabe und Löschung in Textform. Auf Verlangen des Arbeitgebers ermöglicht der Mitarbeiter in zumutbarem Umfang die Überprüfung der Löschung.
(3) Ein Zurückbehaltungsrecht an Unterlagen und Daten des Arbeitgebers ist ausgeschlossen.

§ 7 Dauer der Pflichten nach Ende des Arbeitsverhältnisses
(1) Die Pflichten aus dieser Vereinbarung gelten für die Dauer des Arbeitsverhältnisses und darüber hinaus.
(2) Für Geschäftsgeheimnisse im Sinne des § 2 Abs. 1 gelten die Pflichten nach Ende des Arbeitsverhältnisses zeitlich unbegrenzt fort, solange die Information ein Geschäftsgeheimnis ist.
(3) Für sonstige vertrauliche Informationen im Sinne des § 2 Abs. 2 gelten die Pflichten für die Dauer von [z. B. 3] Jahren nach Ende des Arbeitsverhältnisses.
(4) Die nachvertragliche Geheimhaltungspflicht hindert den Mitarbeiter nicht daran, nach Ende des Arbeitsverhältnisses in derselben Branche tätig zu werden und sein allgemeines Erfahrungswissen zu nutzen. Ein nachvertragliches Wettbewerbsverbot wird durch diese Vereinbarung nicht begründet.

§ 8 Rechtsfolgen bei Verstößen und optionale Vertragsstrafe
(1) Bei Verstößen gegen diese Vereinbarung stehen dem Arbeitgeber die gesetzlichen Ansprüche auf Unterlassung, Beseitigung, Vernichtung, Rückruf, Auskunft und Schadensersatz zu (§§ 6 bis 10 GeschGehG, §§ 280, 823 BGB). Der Mitarbeiter wird darauf hingewiesen, dass der unbefugte Erwerb, die Nutzung oder Offenlegung von Geschäftsgeheimnissen nach § 23 GeschGehG strafbar sein kann und arbeitsrechtliche Konsequenzen bis zur außerordentlichen Kündigung nach sich ziehen kann.
(2) [Optional: Für jeden Fall der schuldhaften Verletzung der Pflichten aus § 3 Abs. 1 Buchst. a oder b oder aus § 6 zahlt der Mitarbeiter an den Arbeitgeber eine Vertragsstrafe in Höhe von [Betrag, Orientierung: ein Bruttomonatsgehalt] EUR. Bei einem fortgesetzten Verstoß (z. B. dauerhafte Nutzung einer kopierten Kundenliste) gilt jeder angefangene Monat als eigener Verstoß, insgesamt höchstens [z. B. 3] Bruttomonatsgehälter. Die Vertragsstrafe wird auf einen Schadensersatzanspruch angerechnet; die Geltendmachung eines weitergehenden Schadens bleibt vorbehalten. Die Vertragsstrafe darf in keinem Fall außer Verhältnis zur Schwere des Verstoßes stehen; das Gericht kann sie auf Antrag herabsetzen.]
(3) [Alternativ ohne Vertragsstrafe: Eine Vertragsstrafe wird nicht vereinbart. Der Arbeitgeber behält sich sämtliche gesetzlichen Ansprüche vor.]

§ 9 Schlussbestimmungen
(1) Änderungen dieser Vereinbarung bedürfen der Textform; das gilt auch für diese Klausel.
(2) Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam; an die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
(3) Der Mitarbeiter bestätigt, diese Vereinbarung gelesen und verstanden zu haben, die Gelegenheit zu Rückfragen gehabt und eine unterschriebene Ausfertigung erhalten zu haben.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Arbeitgeber


______________________________
[Vorname Nachname]
Mitarbeiter

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
