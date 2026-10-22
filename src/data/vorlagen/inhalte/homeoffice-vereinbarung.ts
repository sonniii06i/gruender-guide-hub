// Inhalt der Vorlage „homeoffice-vereinbarung“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../arbeit.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Homeoffice-Vereinbarung brauchst",
        text: `Dein Team arbeitet seit Monaten zwei bis drei Tage pro Woche von zu Hause, aber im Arbeitsvertrag steht nur der Firmensitz als Arbeitsort. Oder ein neuer Mitarbeiter wohnt 200 Kilometer entfernt und soll nur zum Teamtag kommen. In beiden Fällen brauchst du eine schriftliche Regelung, die festlegt, wie viel mobiles Arbeiten erlaubt ist, wann der Mitarbeiter erreichbar sein muss, wer die Ausstattung stellt und wie du das Ganze beenden kannst.

Die Vorlage ist als Zusatzvereinbarung zu einem bestehenden Arbeitsvertrag gebaut und als mobiles Arbeiten gefasst, nicht als Telearbeitsplatz. Das ist bewusst so, weil ein Telearbeitsplatz nach der Arbeitsstättenverordnung die komplette Einrichtung des Arbeitsplatzes durch dich verlangen würde. Für Mitarbeiter, die vollständig remote arbeiten, und für Arbeit aus dem Ausland reicht das Muster nicht aus.`,
      },
      {
        titel: "Was muss in eine Homeoffice-Vereinbarung?",
        text: `Das Muster regelt die Punkte, die im Alltag und im Streit zählen:

- Gegenstand, Abgrenzung zur Telearbeit, Freiwilligkeit (§ 1)
- Umfang in Tagen oder Prozent, Präsenztage, Anordnungsrecht für Anwesenheit, Beschränkung auf Deutschland (§ 2)
- Arbeitszeit, Kernzeit, Erreichbarkeit, Recht auf Nichterreichbarkeit, tägliche Zeiterfassung (§ 3)
- Leihweise gestellte Arbeitsmittel, private Nutzung, Kostenpauschale oder Verzicht, Rückgabe (§ 4)
- Datenschutz und IT-Sicherheit mit konkreten Mindestregeln und Meldefrist bei Datenpannen (§ 5)
- Arbeitsschutz, Gefährdungsbeurteilung, Unterweisung, Selbstauskunft, Unfallversicherung (§ 6)
- Zutritt zur Wohnung nur mit Ankündigung und Zustimmung (§ 7)
- Haftung für Arbeitsmittel und Schäden (§ 8)
- Laufzeit, Widerruf mit Frist und Gründen, sofortige Aussetzung bei schweren Verstößen (§ 9)
- Textform für Änderungen, Anlagen (§ 10)

Die Widerrufsklausel in § 9 ist das Herzstück für dich als Arbeitgeber. Ohne sie wird aus jahrelanger Praxis eine betriebliche Übung, und du bekommst den Mitarbeiter nicht mehr ins Büro zurück.`,
      },
      {
        titel: "Homeoffice-Vereinbarung Muster ausfüllen",
        text: `Trage in § 1 das Datum des Arbeitsvertrags und den betrieblichen Arbeitsort ein. In § 2 entscheidest du, ob du feste Homeoffice-Tage, eine Höchstzahl pro Woche oder einen Prozentsatz vereinbarst, und legst den Teamtag fest.

In § 3 setzt du die Kernarbeitszeit, den Rahmen für die freie Verteilung, das Kommunikationstool und das Zeiterfassungssystem. In § 4 listest du die gestellten Geräte mit Inventarnummer auf und wählst zwischen Monatspauschale, Verzicht auf Erstattung und einmaligem Zuschuss zu Stuhl oder Tisch. § 5 braucht das Datum deiner IT-Sicherheitsrichtlinie, den Zugangsweg und die Meldeadresse für Datenpannen; die Unterweisungen in § 5 Abs. 2 und § 6 Abs. 1 müssen vor dem Start tatsächlich stattgefunden haben. In § 9 trägst du die Widerrufsfrist ein, vier Wochen zum Monatsende sind angemessen. Hänge die Checkliste zum mobilen Arbeitsplatz, die IT-Richtlinie und das Übergabeprotokoll für die Geräte an; der Mitarbeiter füllt die Checkliste vor dem ersten Homeoffice-Tag aus.`,
      },
      {
        titel: "Typische Fehler bei Homeoffice-Regelungen",
        text: `Der häufigste Fehler ist das Fehlen jeder Regelung. Wer Homeoffice jahrelang duldet, schafft eine betriebliche Übung, auf die sich der Mitarbeiter berufen kann; ein späteres Zurückholen ins Büro wird dann zur Änderungskündigung. Zweiter Fehler ist das Gegenteil: eine Klausel „jederzeit ohne Grund widerrufbar“. Sie ist als unangemessene Benachteiligung unwirksam, und du stehst wieder ohne Widerrufsrecht da. Die Vorlage nennt deshalb Gründe und eine Frist.

Dritter Fehler ist die vergessene Zeiterfassung. Das Arbeitszeitgesetz gilt zu Hause genauso, und seit der Entscheidung des Bundesarbeitsgerichts von 2022 musst du die Arbeitszeit aller Mitarbeiter erfassen, auch im Homeoffice.

Vermeide außerdem stillschweigend erlaubte Arbeit aus dem Ausland, weil schon wenige Wochen Sozialversicherungs- und Steuerpflichten im anderen Land auslösen können, die Nutzung privater Geräte und privater Cloud-Konten für Firmendaten sowie Zutrittsklauseln, die ohne Zustimmung des Mitarbeiters auskommen wollen; sie sind wegen Art. 13 GG unwirksam.`,
      },
      {
        titel: "Rechtliche Grundlagen: Arbeitszeitgesetz, Arbeitsschutz, Unfallversicherung",
        text: `Einen gesetzlichen Anspruch auf Homeoffice gibt es in Deutschland nicht; mobiles Arbeiten entsteht nur durch Vertrag, Betriebsvereinbarung oder betriebliche Übung. Das Arbeitszeitgesetz gilt ortsunabhängig mit Höchstarbeitszeit, Pausen, elf Stunden Ruhezeit und Sonntagsruhe; die Pflicht zur Zeiterfassung folgt aus § 3 Abs. 2 Nr. 1 ArbSchG in der Auslegung des Bundesarbeitsgerichts vom 13.09.2022.

Das Arbeitsschutzgesetz verlangt auch für mobiles Arbeiten eine Gefährdungsbeurteilung und Unterweisung; die Arbeitsstättenverordnung mit ihren Anforderungen an Bildschirmarbeitsplätze gilt nach § 2 Abs. 7 ArbStättV nur für fest eingerichtete Telearbeitsplätze. Der gesetzliche Unfallversicherungsschutz ist nach § 8 Abs. 1 Satz 3 SGB VII im Homeoffice dem im Betrieb gleichgestellt. Datenschutzrechtlich bleibst du nach Art. 32 DSGVO für technische und organisatorische Maßnahmen verantwortlich, auch für Daten auf dem Küchentisch des Mitarbeiters; Datenpannen musst du nach Art. 33 DSGVO binnen 72 Stunden melden. Ein Widerruf des Homeoffice muss billigem Ermessen nach § 106 GewO und § 315 BGB entsprechen.`,
      },
      {
        titel: "Wann die Homeoffice-Vorlage nicht reicht",
        text: `Mit Betriebsrat ist die Ausgestaltung mobiler Arbeit nach § 87 Abs. 1 Nr. 14 BetrVG mitbestimmungspflichtig; dann gehört die Regelung in eine Betriebsvereinbarung, und das Muster dient nur als Entwurf dafür. Bei vollständiger Remote-Arbeit ohne Präsenztage, bei einem fest eingerichteten Telearbeitsplatz oder bei Arbeit aus dem Ausland brauchst du eine Vereinbarung, die Arbeitsort, Sozialversicherung, Steuer und gegebenenfalls Aufenthaltsrecht im Detail regelt, am besten mit Steuerberater und Fachanwalt.

Für Mitarbeiter mit Zugang zu besonders sensiblen Daten, etwa Gesundheitsdaten oder Zahlungsinformationen, muss die IT-Sicherheitsrichtlinie deutlich strenger sein, als die Mindestregeln in § 5 es vorsehen. Bei Tarifbindung können tarifliche Regelungen zu mobiler Arbeit vorgehen. GründerX ist Software und keine Rechtsberatung; die Vorlage ist der Rahmen, die konkrete Gefährdungsbeurteilung und die IT-Richtlinie musst du selbst erstellen oder erstellen lassen.`,
      },
    ],
  text: `Zusatzvereinbarung zum Arbeitsvertrag über mobiles Arbeiten (Homeoffice)

zwischen

[Firma, Rechtsform], vertreten durch [Vorname Nachname, Funktion], [Straße, PLZ Ort]
– nachfolgend „Arbeitgeber“ –

und

[Vorname Nachname], wohnhaft [Straße, PLZ Ort]
– nachfolgend „Arbeitnehmer“ –

§ 1 Gegenstand und Verhältnis zum Arbeitsvertrag
(1) Diese Vereinbarung ergänzt den Arbeitsvertrag vom [Datum]. Sie regelt, unter welchen Bedingungen der Arbeitnehmer seine Arbeitsleistung teilweise außerhalb der Betriebsstätte erbringen darf (mobiles Arbeiten).
(2) Mobiles Arbeiten ist die Erbringung der Arbeitsleistung an einem vom Arbeitnehmer gewählten Ort außerhalb des Betriebs, insbesondere in seiner Wohnung, unter Nutzung von Informations- und Kommunikationstechnik. Es handelt sich nicht um Telearbeit im Sinne des § 2 Abs. 7 ArbStättV; ein fest eingerichteter Telearbeitsplatz wird nicht vereinbart.
(3) Alle übrigen Regelungen des Arbeitsvertrags bleiben unverändert, insbesondere Tätigkeit, Arbeitszeitumfang, Vergütung und Urlaub. Betrieblicher Arbeitsort bleibt [Straße, PLZ Ort].
(4) Mobiles Arbeiten ist freiwillig; der Arbeitnehmer kann jederzeit im Betrieb arbeiten.

§ 2 Umfang, Ort und Präsenztage
(1) Der Arbeitnehmer darf an bis zu [z. B. 3] Arbeitstagen pro Woche mobil arbeiten. [Alternativ: bis zu [z. B. 60] % seiner monatlichen Arbeitszeit.] Die Tage werden [jeweils bis zum [z. B. Donnerstag] der Vorwoche mit [Vorname Nachname, Funktion] abgestimmt / fest auf [Wochentage] gelegt].
(2) An mindestens [z. B. 2] Tagen pro Woche, insbesondere am [z. B. Dienstag] (Teamtag), arbeitet der Arbeitnehmer im Betrieb. Der Arbeitgeber kann aus betrieblichen Gründen (Kundentermine, Workshops, Inventur, Einarbeitung neuer Kollegen, Störungen) mit einer Ankündigungsfrist von [z. B. 2] Arbeitstagen, in dringenden Fällen auch kurzfristiger, Anwesenheit im Betrieb anordnen.
(3) Mobiles Arbeiten erfolgt in der Wohnung des Arbeitnehmers oder an anderen Orten innerhalb Deutschlands, die den Anforderungen an Datenschutz und Arbeitsschutz nach §§ 5 und 6 genügen. Mobiles Arbeiten im Ausland ist nur nach vorheriger Freigabe des Arbeitgebers in Textform für den Einzelfall zulässig; der Arbeitgeber prüft dabei sozialversicherungs-, steuer- und aufenthaltsrechtliche Folgen.
(4) Der Arbeitnehmer stellt sicher, dass er während der mobilen Arbeit ungestört und konzentriert arbeiten kann. Betreuungspflichten und Arbeitsleistung dürfen nicht gleichzeitig wahrgenommen werden.

§ 3 Arbeitszeit, Erreichbarkeit und Zeiterfassung
(1) Die vertragliche Arbeitszeit und die betrieblichen Regelungen zur Arbeitszeit gelten auch beim mobilen Arbeiten. Die Vorschriften des Arbeitszeitgesetzes (Höchstarbeitszeit, Ruhepausen, Ruhezeit von elf Stunden, Sonn- und Feiertagsruhe) sind einzuhalten. Mehrarbeit ist nur nach vorheriger Anordnung oder Genehmigung zulässig.
(2) Während der Kernarbeitszeit von [z. B. 10:00] bis [z. B. 15:00] Uhr ist der Arbeitnehmer telefonisch, per E-Mail und über [z. B. Microsoft Teams / Slack] erreichbar. Außerhalb der Kernarbeitszeit verteilt er seine Arbeitszeit im Rahmen von [z. B. 07:00] bis [z. B. 20:00] Uhr frei. Er trägt seinen Status (verfügbar, Pause, abwesend) im Kalender bzw. Kommunikationstool ein.
(3) Außerhalb der Arbeitszeit, im Urlaub und bei Krankheit besteht keine Pflicht zur Erreichbarkeit. Der Arbeitgeber erwartet keine Reaktion auf Nachrichten außerhalb der Arbeitszeit.
(4) Der Arbeitnehmer erfasst Beginn, Ende und Pausen seiner täglichen Arbeitszeit im System [Bezeichnung] am selben Tag. Der Arbeitgeber ist zur Zeiterfassung gesetzlich verpflichtet (§ 3 Abs. 2 Nr. 1 ArbSchG) und kontrolliert die Aufzeichnungen stichprobenartig.
(5) Dienstreisen vom mobilen Arbeitsort aus werden wie Dienstreisen vom Betrieb behandelt; Fahrten zwischen Wohnung und Betrieb an Präsenztagen sind keine Dienstreisen.

§ 4 Ausstattung und Kostenerstattung
(1) Der Arbeitgeber stellt dem Arbeitnehmer für die mobile Arbeit folgende Arbeitsmittel leihweise zur Verfügung: [Laptop [Modell, Inventarnummer], Headset, Mobiltelefon, [Monitor, Tastatur, Maus, Dockingstation]]. Die Arbeitsmittel bleiben Eigentum des Arbeitgebers und dürfen nur dienstlich genutzt werden; [eine private Nutzung des Laptops in geringem Umfang ist gestattet / ausgeschlossen].
(2) Der Arbeitnehmer stellt einen geeigneten Arbeitsplatz, einen Internetanschluss mit ausreichender Bandbreite sowie Strom und Mobiliar selbst zur Verfügung.
(3) Zur Abgeltung der Kosten für Internet, Strom und Arbeitsplatz zahlt der Arbeitgeber eine monatliche Pauschale von [Betrag, z. B. 25] EUR, die mit dem Gehalt abgerechnet wird. [Alternativ: Eine gesonderte Kostenerstattung erfolgt nicht; die Parteien sind sich einig, dass die Ersparnis von Fahrtkosten und Fahrtzeit die Aufwendungen des Arbeitnehmers ausgleicht.] [Optional: Der Arbeitgeber erstattet einmalig bis zu [Betrag] EUR gegen Beleg für einen ergonomischen Bürostuhl / Schreibtisch; die Gegenstände gehen in das Eigentum des Arbeitnehmers über.]
(4) Verbrauchsmaterial (Papier, Toner) stellt der Arbeitgeber auf Anforderung. Dienstliche Ausdrucke sind auf das Nötige zu beschränken und nach § 5 zu entsorgen.
(5) Defekte und Verlust von Arbeitsmitteln meldet der Arbeitnehmer unverzüglich. Reparatur und Ersatz übernimmt der Arbeitgeber, soweit der Arbeitnehmer den Schaden nicht grob fahrlässig oder vorsätzlich verursacht hat. Bei Beendigung des mobilen Arbeitens oder des Arbeitsverhältnisses gibt der Arbeitnehmer alle Arbeitsmittel unverzüglich zurück.

§ 5 Datenschutz und IT-Sicherheit
(1) Der Arbeitnehmer wahrt beim mobilen Arbeiten die Vertraulichkeit von Geschäftsgeheimnissen und personenbezogenen Daten in gleicher Weise wie im Betrieb (Art. 32 DSGVO). Er hält die IT-Sicherheitsrichtlinie des Arbeitgebers vom [Datum] und folgende Mindestregeln ein:
   a) Nur die vom Arbeitgeber gestellten Geräte und freigegebene Software werden genutzt; private Geräte, private E-Mail-Konten und private Cloud-Speicher sind für dienstliche Daten ausgeschlossen.
   b) Der Zugriff auf Unternehmenssysteme erfolgt ausschließlich über [VPN / den gesicherten Zugang [Bezeichnung]] mit Zwei-Faktor-Authentifizierung. Passwörter werden nicht gespeichert oder weitergegeben.
   c) Bildschirme werden bei jedem Verlassen des Arbeitsplatzes gesperrt; Dritte, auch Familienmitglieder und Mitbewohner, dürfen keinen Einblick in dienstliche Daten erhalten. In öffentlichen Räumen (Zug, Café) werden keine vertraulichen Daten bearbeitet und keine vertraulichen Gespräche geführt; Blickschutzfolie ist zu verwenden.
   d) Öffentliche, ungesicherte WLAN-Netze werden nur über VPN genutzt.
   e) Papierunterlagen werden verschlossen aufbewahrt und ausschließlich im Betrieb oder mit einem Aktenvernichter der Sicherheitsstufe P-4 entsorgt.
   f) Datenschutzverletzungen (z. B. Verlust eines Geräts, Fehlversand, Einbruch) meldet der Arbeitnehmer unverzüglich, spätestens innerhalb von 24 Stunden, an [Vorname Nachname / datenschutz@[domain.de]], damit die 72-Stunden-Frist nach Art. 33 DSGVO eingehalten werden kann.
(2) Der Arbeitnehmer bestätigt, die Unterweisung zum Datenschutz und zur IT-Sicherheit am [Datum] erhalten zu haben, und nimmt an Auffrischungen teil.

§ 6 Arbeitsschutz und Unfallversicherung
(1) Die Vorschriften des Arbeitsschutzgesetzes gelten auch beim mobilen Arbeiten. Der Arbeitgeber hat die Gefährdungsbeurteilung für mobiles Arbeiten erstellt und den Arbeitnehmer am [Datum] zu ergonomischer Arbeitsplatzgestaltung, Bildschirmarbeit, Pausen und Bewegung unterwiesen.
(2) Der Arbeitnehmer richtet seinen mobilen Arbeitsplatz nach den Empfehlungen des Arbeitgebers ein (ausreichende Beleuchtung, geeigneter Stuhl und Tisch, Bildschirm in Augenhöhe, externe Tastatur bei längerer Arbeit) und füllt die Selbstauskunft „Checkliste mobiler Arbeitsplatz“ aus, die Anlage dieser Vereinbarung ist. Mängel meldet er dem Arbeitgeber.
(3) Beim mobilen Arbeiten besteht gesetzlicher Unfallversicherungsschutz im gleichen Umfang wie im Betrieb (§ 8 Abs. 1 Satz 3 SGB VII). Unfälle meldet der Arbeitnehmer unverzüglich an den Arbeitgeber.

§ 7 Zutritt zur Wohnung
(1) Der Arbeitgeber, seine Fachkraft für Arbeitssicherheit, der Datenschutzbeauftragte oder eine Aufsichtsbehörde können den mobilen Arbeitsplatz in der Wohnung des Arbeitnehmers nach vorheriger Ankündigung von mindestens [z. B. 5] Arbeitstagen und nur mit Zustimmung des Arbeitnehmers besichtigen, um die Einhaltung von Arbeitsschutz und Datenschutz zu prüfen.
(2) Der Arbeitnehmer wird die Zustimmung nicht ohne sachlichen Grund verweigern. Verweigert er den Zutritt dauerhaft, kann der Arbeitgeber das mobile Arbeiten nach § 9 widerrufen. Ein Zutritt gegen den Willen des Arbeitnehmers oder von Mitbewohnern findet nicht statt.

§ 8 Haftung
(1) Der Arbeitnehmer haftet für Schäden an Arbeitsmitteln und für Datenschutzverletzungen nach den Grundsätzen der beschränkten Arbeitnehmerhaftung (volle Haftung nur bei Vorsatz und grober Fahrlässigkeit).
(2) Für Schäden an privaten Gegenständen des Arbeitnehmers, die durch die dienstliche Nutzung entstehen, haftet der Arbeitgeber nur, wenn er sie zu vertreten hat oder sie typischerweise aus der Tätigkeit folgen.
(3) Für Schäden, die Dritte (Familienangehörige, Besucher) an Arbeitsmitteln verursachen, haftet der Arbeitnehmer wie für eigenes Verschulden, soweit er die Gegenstände nicht sorgfältig verwahrt hat.

§ 9 Dauer, Widerruf und Beendigung
(1) Diese Vereinbarung gilt ab dem [Datum] auf unbestimmte Zeit. [Optional: Sie wird zunächst für eine Erprobungsphase bis zum [Datum] geschlossen und verlängert sich danach auf unbestimmte Zeit, wenn keine Seite bis zum [Datum] in Textform widerspricht.]
(2) Jede Partei kann diese Vereinbarung mit einer Frist von [z. B. 4] Wochen zum Monatsende in Textform widerrufen. Der Arbeitgeber übt das Widerrufsrecht nach billigem Ermessen (§ 106 GewO, § 315 BGB) aus; ein Widerruf kommt insbesondere in Betracht bei
   a) betrieblichen Gründen wie Änderung der Aufgaben, Einführung neuer Prozesse oder Bedarf an Anwesenheit im Team,
   b) wiederholten Verstößen gegen die Regelungen zu Arbeitszeit, Erreichbarkeit, Datenschutz oder Arbeitsschutz,
   c) erheblichen Leistungsmängeln, die im Zusammenhang mit dem mobilen Arbeiten stehen,
   d) Wegfall der Voraussetzungen nach § 2 Abs. 3 und 4.
(3) Bei schwerwiegenden Verstößen, insbesondere gegen § 5, kann der Arbeitgeber das mobile Arbeiten mit sofortiger Wirkung aussetzen.
(4) Mit Beendigung dieser Vereinbarung arbeitet der Arbeitnehmer wieder vollständig im Betrieb. Die Vereinbarung endet außerdem automatisch mit dem Arbeitsverhältnis. Die Rückgabepflicht nach § 4 Abs. 5 gilt in jedem Fall.

§ 10 Schlussbestimmungen
(1) Änderungen dieser Vereinbarung bedürfen der Textform; das gilt auch für diese Klausel.
(2) Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam.
(3) Anlagen: Checkliste mobiler Arbeitsplatz (Selbstauskunft), IT-Sicherheitsrichtlinie vom [Datum], Übergabeprotokoll Arbeitsmittel. Der Arbeitnehmer bestätigt den Erhalt einer unterschriebenen Ausfertigung.

[Ort], den [Datum]


______________________________
[Firma], vertreten durch [Vorname Nachname]
Arbeitgeber


______________________________
[Vorname Nachname]
Arbeitnehmer

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
