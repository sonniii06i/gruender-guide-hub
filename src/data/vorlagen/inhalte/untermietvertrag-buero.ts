// Inhalt der Vorlage „untermietvertrag-buero“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../miete.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Untermietvertrag fürs Büro brauchst",
        text: `Du hast mehr Büro gemietet, als du brauchst, ein Raum steht leer, und ein Freelancer oder ein befreundetes Startup will einziehen. Oder umgekehrt: Du bist frisch gegründet und ziehst in das Büro eines anderen Unternehmens, weil ein eigener Gewerbemietvertrag mit fünf Jahren Laufzeit noch zu groß ist. In beiden Fällen bist du nicht Vertragspartner des Eigentümers, sondern Hauptmieter oder Untermieter, und genau dafür ist diese Vorlage gebaut: ein Raum oder ein einzelner Arbeitsplatz, Mitnutzung von Teeküche, WC und Besprechungsraum, eine Pauschalmiete ohne Nebenkostenabrechnung und kurze Kündigungsfristen. Für viele Nutzer mit Zugangskarten und Tarifen passt eher der Coworking-Nutzungsvertrag, für eine ganze Etage mit eigenem Eingang ein vollständiger Gewerbemietvertrag mit Zustimmung des Eigentümers.`,
      },
      {
        titel: "Was muss in einen Untermietvertrag?",
        text: `Ein Untermietvertrag für Büroräume hängt am Hauptmietvertrag, deshalb beginnt die Vorlage genau dort. Diese Punkte gehören hinein:

- Hauptmietverhältnis mit Datum, Hauptvermieter, Laufzeit und dessen schriftliche Zustimmung als Anlage (§ 1)
- Mietgegenstand: Raumnummer oder Arbeitsplatz, Grundriss, mitbenutzte Flächen und Geräte, mitvermietete Möbel, Briefkasten und Geschäftsanschrift (§ 2)
- Nutzungszweck mit Verbot von Lager, Werkstatt, Publikumsverkehr und weiterer Untervermietung (§ 3)
- Mietzeit, Kündigungsfrist und automatisches Ende mit dem Hauptmietverhältnis (§ 4)
- Pauschalmiete, Umsatzsteuer, Fälligkeit und Kaution (§ 5)
- Schlüssel, Zugangszeiten, Hausordnung und Vertraulichkeit im geteilten Büro (§ 6)
- Haftung und Versicherung (§ 7), Rückgabe (§ 8), Schriftform und Anlagen (§ 9)
- Zustimmungserklärung des Hauptvermieters als Anlage 1

Das Herzstück ist die Kopplung an das Hauptmietverhältnis in § 4 Abs. 2: Endet dein Vertrag mit dem Eigentümer, endet auch die Untermiete, und der Untermieter weiß das von Anfang an. Ohne diese Klausel kann er von dir Schadensersatz verlangen, wenn er ausziehen muss.`,
      },
      {
        titel: "Untermietvertrag Muster ausfüllen: so gehst du vor",
        text: `Beginne mit § 1 und hol dir die Daten aus deinem eigenen Mietvertrag: Datum, Name des Hauptvermieters, Laufzeit oder Kündigungsfrist. Lass die Zustimmungserklärung am Ende der Vorlage vom Hauptvermieter unterschreiben, bevor du selbst unterschreibst. In § 2 wählst du Variante A für einen Raum oder Variante B für einen Arbeitsplatz und streichst die andere; trage mitbenutzte Flächen und das Stundenkontingent für den Besprechungsraum ein. Entscheide in § 2 Abs. 4, ob der Untermieter deine Adresse als Geschäftsanschrift nutzen darf; für eine UG oder GmbH ist das wegen des Handelsregisters wichtig. In § 4 setzt du die Kündigungsfrist, meist ein bis drei Monate zum Monatsende. In § 5 rechnest du die Pauschale aus anteiliger Miete plus Strom, Internet, Reinigung und Heizung und legst Umsatzsteuer-Variante und Kaution fest. In § 6 trägst du Schlüsselzahl und Zugangszeiten ein. Das Muster gibt es kostenlos als Word, PDF und Text.`,
      },
      {
        titel: "Typische Fehler bei der Untervermietung von Büroräumen",
        text: `Der schwerste Fehler ist die Untervermietung ohne Erlaubnis: Der Hauptvermieter kann dich abmahnen und im Wiederholungsfall den Hauptmietvertrag fristlos kündigen, und mit ihm fällt auch die Untermiete. Zweiter Fehler ist eine zu knapp gerechnete Pauschale, denn eine Erhöhung geht nach § 5 Abs. 3 nur einvernehmlich; rechne Strom, Internet, Reinigung und Heizung vorher ehrlich durch. Dritter Fehler ist die vergessene Kündigungsfrist: Ohne Regelung gilt für Geschäftsräume die gesetzliche Frist von rund sechs Monaten zum Quartalsende, für eine Untermiete viel zu lang. Vierter Punkt ist die Umsatzsteuer: Hast du im Hauptmietvertrag zur Umsatzsteuer optiert und vermietest ohne Umsatzsteuer unter, verlierst du anteilig den Vorsteuerabzug. Und zuletzt die Übergabe ohne Liste der mitvermieteten Möbel und ohne Fotos, die am Ende jede Diskussion über Schäden entscheiden würde.`,
      },
      {
        titel: "Rechtliche Grundlagen: § 540 BGB und die Stellung des Untermieters",
        text: `Nach § 540 Abs. 1 BGB darf der Mieter den Gebrauch der Mietsache ohne Erlaubnis des Vermieters keinem Dritten überlassen. Nach § 540 Abs. 2 BGB haftet der Hauptmieter für ein Verschulden des Untermieters wie für eigenes; die Vorlage gibt diese Haftung in § 7 an den Untermieter weiter. Der Untermieter hat kein Vertragsverhältnis zum Hauptvermieter; endet das Hauptmietverhältnis, kann der Hauptvermieter die Räume nach § 546 Abs. 2 BGB direkt vom Untermieter herausverlangen. Für Geschäftsräume gelten im Übrigen die §§ 535 ff. BGB und über § 578 BGB einzelne Wohnraumregeln, darunter die Formvorschrift des § 550 BGB (für Gewerberäume seit 2025 Textform, § 578 Abs. 1 Satz 2 BGB), sobald eine feste Laufzeit über ein Jahr vereinbart wird. Die gesetzliche Kündigungsfrist steht in § 580a Abs. 2 BGB. Umsatzsteuerlich ist die Vermietung nach § 4 Nr. 12 UStG steuerfrei, mit Option nach § 9 UStG, wenn der Untermieter vorsteuerabzugsberechtigt ist. GründerX ist Software und keine Rechtsberatung; im Zweifel lässt du den Vertrag prüfen.`,
      },
      {
        titel: "Wann die Untermietvertrag-Vorlage nicht reicht",
        text: `Die Vorlage ist für einen Raum oder einen Arbeitsplatz mit kurzer Kündigungsfrist gedacht. Vermietest du eine ganze Etage mit eigenem Eingang und fester Laufzeit über ein Jahr unter, brauchst du einen vollständigen Gewerbemietvertrag in der Form des § 550 BGB und mit Nebenkostenabrechnung. Ist der Untermieter eine Privatperson, die nicht gewerblich arbeitet, greifen Verbraucherregeln, die hier nicht abgebildet sind. Verbietet dein Hauptmietvertrag die Untervermietung ausdrücklich oder knüpft er sie an Bedingungen, musst du erst dort nachverhandeln. Untervermietest du Räume in deiner Wohnung, gilt Wohnraummietrecht mit eigenen Regeln. Und wenn der Untermieter eigene Einbauten plant oder mehrere Mitarbeiter mitbringt, lohnt sich eine anwaltliche Prüfung, weil dann Arbeitsstättenregeln, Haftung und Rückbau komplizierter werden.`,
      },
    ],
  text: `Untermietvertrag über Büroräume / einen Arbeitsplatz

zwischen

[Firma / Vorname Nachname], [Straße, PLZ Ort], vertreten durch [Name]
– nachfolgend „Hauptmieter“ –

und

[Firma / Vorname Nachname], [Straße, PLZ Ort], vertreten durch [Name]
– nachfolgend „Untermieter“ –

§ 1 Hauptmietverhältnis und Zustimmung des Vermieters
(1) Der Hauptmieter hat die Geschäftsräume [Straße, PLZ Ort, Geschoss] mit Mietvertrag vom [Datum] von [Name des Hauptvermieters] (nachfolgend „Hauptvermieter“) gemietet. Der Hauptmietvertrag läuft [bis zum [Datum] / unbefristet mit einer Kündigungsfrist von [Frist]].
(2) Der Hauptvermieter hat der Untervermietung mit Erklärung vom [Datum] zugestimmt (Anlage 1). Der Untermieter weiß, dass er in keinem Vertragsverhältnis zum Hauptvermieter steht.
(3) Die nutzungsbezogenen Pflichten aus dem Hauptmietvertrag (Nutzungszweck, Hausordnung, Rücksichtnahme) gelten auch für den Untermieter; die maßgeblichen Regelungen sind ihm [als Anlage 2 ausgehändigt / zur Einsicht vorgelegt] worden.

§ 2 Mietgegenstand und Mitnutzung
(1) Der Hauptmieter vermietet dem Untermieter [Variante A: den Raum Nr. [Zahl] mit ca. [Zahl] m² gemäß Grundriss (Anlage 3) / Variante B: den festen Arbeitsplatz Nr. [Zahl] im Raum [Bezeichnung]] zur alleinigen Nutzung.
(2) Der Untermieter darf Eingangsbereich, Flur, Teeküche, WC, [Besprechungsraum bis zu [Zahl] Stunden pro Woche nach Absprache], [Drucker] und [Internetanschluss] mitbenutzen, mit Rücksicht auf den Betrieb des Hauptmieters.
(3) Mitvermietet sind: [z. B. „Schreibtisch, Bürostuhl, Rollcontainer“]; sie bleiben Eigentum des Hauptmieters.
(4) Ein Hinweis am Briefkasten und an der Bürotür ist zulässig, ein Firmenschild an der Fassade nicht. Die Nutzung der Adresse als Geschäftsanschrift (Handelsregister, Impressum) ist [zulässig / nicht zulässig].

§ 3 Nutzungszweck
Die Räume werden ausschließlich als Büro für [Tätigkeit des Untermieters] genutzt. Publikumsverkehr ist [nur nach Absprache] zulässig. Lager-, Werkstatt- und störende Nutzungen sowie eine weitere Untervermietung sind ausgeschlossen.

§ 4 Mietzeit und Kündigung
(1) Das Untermietverhältnis beginnt am [Datum] und läuft auf unbestimmte Zeit. Beide Parteien können mit einer Frist von [z. B. 1 / 3] Monat(en) zum Monatsende schriftlich kündigen[, erstmals zum [Datum]].
(2) Das Untermietverhältnis endet ohne Kündigung spätestens mit dem Hauptmietverhältnis. Der Hauptmieter informiert den Untermieter unverzüglich über eine Kündigung oder Beendigung des Hauptmietvertrags; jede Partei kann dann mit einer Frist von [z. B. 2] Wochen zum Beendigungszeitpunkt des Hauptmietvertrags kündigen.
(3) Die außerordentliche Kündigung aus wichtigem Grund bleibt unberührt, insbesondere bei Zahlungsverzug mit zwei Monatsmieten, erheblicher Störung des Betriebs des Hauptmieters oder Verstoß gegen § 3.

§ 5 Pauschalmiete, Umsatzsteuer und Kaution
(1) Die Miete beträgt pauschal [Betrag] EUR pro Monat [zuzüglich Umsatzsteuer (derzeit 19 %) – nur, wenn der Hauptmieter zur Umsatzsteuer optiert und der Untermieter vorsteuerabzugsberechtigt ist / ohne Umsatzsteuer, § 4 Nr. 12 UStG].
(2) Mit der Pauschale sind alle Nebenkosten abgegolten, insbesondere Heizung, Strom, Wasser, Reinigung der Gemeinschaftsflächen, Internet und die Mitnutzung nach § 2 Abs. 2. Eine Nebenkostenabrechnung findet nicht statt. [Ausgenommen: [z. B. Druckkosten über [Zahl] Seiten pro Monat].]
(3) Die Miete ist monatlich im Voraus bis zum dritten Werktag auf das Konto IBAN [IBAN] zu zahlen; bei Beginn oder Ende innerhalb eines Monats taggenau anteilig. Eine Änderung der Pauschale ist nur einvernehmlich und schriftlich möglich.
(4) Der Untermieter zahlt bis zum [Datum] eine Kaution von [Betrag, z. B. zwei Monatsmieten] EUR. Sie wird nach Beendigung und ordnungsgemäßer Rückgabe innerhalb von [z. B. 4] Wochen zurückgezahlt, soweit keine Ansprüche offen sind.

§ 6 Pflichten des Untermieters, Schlüssel, Vertraulichkeit
(1) Der Untermieter behandelt Räume, Einrichtung und Gemeinschaftsflächen pfleglich, beachtet die Hausordnung [und die Büroordnung des Hauptmieters (Anlage 4)] und meldet Schäden unverzüglich. Bauliche Veränderungen und Einbauten bedürfen der Zustimmung des Hauptmieters.
(2) Der Untermieter erhält [Anzahl] Schlüssel bzw. Zugangskarten und hat Zugang [rund um die Uhr / werktags von [Uhrzeit] bis [Uhrzeit]]. Verlust ist sofort zu melden; die Kosten einer nötigen Änderung der Schließanlage trägt der Untermieter, soweit er den Verlust zu vertreten hat. Beim Verlassen als Letzter sind Fenster und Bürotür zu schließen.
(3) Beide Parteien wahren Stillschweigen über Geschäftsgeheimnisse, Kundendaten und interne Vorgänge, die sie durch die gemeinsame Büronutzung erfahren. Jede Partei sichert ihre eigenen Daten und Geräte selbst und verwahrt vertrauliche Unterlagen verschlossen.

§ 7 Haftung und Versicherung
(1) Der Untermieter haftet für Schäden, die er, seine Mitarbeiter oder Besucher schuldhaft verursachen, und versichert seine eingebrachten Sachen und seinen Betrieb selbst.
(2) Der Hauptmieter haftet nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten, dann begrenzt auf den vorhersehbaren, vertragstypischen Schaden; die Haftung für Schäden an Leben, Körper und Gesundheit bleibt unberührt. Für eingebrachte Sachen des Untermieters und Ausfälle von Internet, Strom oder Heizung, die er nicht zu vertreten hat, haftet er nicht.

§ 8 Rückgabe
Bei Beendigung gibt der Untermieter den Raum bzw. Arbeitsplatz geräumt, gereinigt und im Übergabezustand unter Berücksichtigung üblicher Abnutzung mit allen Schlüsseln zurück. Bei verspäteter Rückgabe schuldet er für jeden angefangenen Monat die Pauschalmiete als Nutzungsentschädigung.

§ 9 Schlussbestimmungen
(1) Änderungen und Ergänzungen bedürfen der Schriftform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam; die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Gerichtsstand ist, soweit beide Parteien Kaufleute sind, [Ort]. Es gilt deutsches Recht.
(4) Anlagen: Anlage 1 Zustimmung des Hauptvermieters, [Anlage 2 Auszug Hauptmietvertrag, Anlage 3 Grundriss, Anlage 4 Büroordnung].

[Ort], den [Datum]


______________________________
[Name], Hauptmieter


______________________________
[Name], Untermieter


Anlage 1 – Zustimmungserklärung des Hauptvermieters

Ich/Wir, [Name und Anschrift des Hauptvermieters], Vermieter der Geschäftsräume [Straße, PLZ Ort, Geschoss], stimme/n der Untervermietung [des Raums Nr. [Zahl] / eines Arbeitsplatzes] durch den Mieter [Name des Hauptmieters] an [Name des Untermieters] zum Zweck [Nutzungszweck] zu. Die Zustimmung gilt [bis auf Widerruf aus wichtigem Grund / für die Dauer des Hauptmietvertrags]. Ein Vertragsverhältnis zwischen mir/uns und dem Untermieter wird nicht begründet; der Mieter bleibt für alle Pflichten aus dem Hauptmietvertrag verantwortlich.

[Ort], den [Datum]

______________________________
[Name], Hauptvermieter

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
