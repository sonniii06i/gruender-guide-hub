// Inhalt der Vorlage „einwilligung-foto-video“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../verwaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine Einwilligung für Fotos und Videos brauchst",
        text: `Teamfoto auf der Website, Mitarbeiterporträts in der Stellenanzeige, das Recruiting-Video auf LinkedIn, Kundenstimmen als Clip auf Instagram, Messefotos im Newsletter: Sobald eine Person erkennbar ist und du das Material veröffentlichst, brauchst du eine Rechtsgrundlage. Bei Mitarbeitern, Kunden und Veranstaltungsteilnehmern ist das in der Praxis fast immer die Einwilligung, und zwar bevor die Kamera läuft.

Die Vorlage deckt die typischen Konstellationen ab: Mitarbeiter in der laufenden Unternehmenskommunikation, Kunden und Teilnehmer bei Workshops, Shootings oder Events, Testimonials, bezahlte Anzeigen mit Gesichtern und minderjährige Abgebildete mit Unterschrift der Eltern. Sie ist auch dann richtig, wenn du Fotos von einem externen Fotografen aufnehmen lässt; der Fotograf bringt die Urheberrechte am Bild mit, die Rechte der abgebildeten Person holst du selbst ein.`,
      },
      {
        titel: "Was in die Einwilligungserklärung gehört",
        text: `Eine Einwilligung ist nur wirksam, wenn die Person weiß, worin sie einwilligt. Deshalb muss die Fotoeinwilligung konkret sein:

- Verantwortlicher mit Anschrift, Vertreter und gegebenenfalls Datenschutzbeauftragtem
- abgebildete Person mit Kontaktdaten und Status als Mitarbeiter, Kunde oder Teilnehmer
- Anlass und Art der Aufnahmen, einschließlich Ton (Ziffer 1)
- Zwecke und Kanäle einzeln zum Ankreuzen: Website, jede Social-Media-Plattform, Print, Presse, intern, bezahlte Werbung, Stellenanzeigen; dazu die Entscheidung über Namensnennung (Ziffer 2)
- Rechtsgrundlagen und bei Beschäftigten der Hinweis auf Freiwilligkeit ohne Nachteile (Ziffer 3)
- Freiwilligkeit und Vergütung (Ziffer 4)
- Dauer, auch nach Ende des Arbeitsverhältnisses (Ziffer 5)
- Widerruf, seine Wirkung und seine Grenzen (Ziffer 6)
- Datenschutzhinweise mit Betroffenenrechten und Hinweis auf weltweite Abrufbarkeit (Ziffer 7)
- Regelung für Minderjährige mit Unterschrift der Sorgeberechtigten (Ziffer 8)
- Ort, Datum, Unterschrift und die Aushändigung einer Kopie

Jeder Kanal, den du später nutzen willst, muss heute schon angekreuzt sein.`,
      },
      {
        titel: "Einwilligung Vorlage ausfüllen: Schritt für Schritt",
        text: `Trage dein Unternehmen als Verantwortlichen ein und ergänze den Datenschutzbeauftragten, falls du einen benannt hast. Fülle die Daten der abgebildeten Person aus und wähle den Status. Beschreibe in Ziffer 1 den Anlass so konkret wie möglich, etwa „Teamshooting am 12. Mai in den Büroräumen“, und lösche „einschließlich Tonaufnahmen“, wenn nur fotografiert wird. Lass die Person in Ziffer 2 selbst ankreuzen, welche Kanäle sie freigibt, und entscheide gemeinsam über die Namensnennung.

Behalte in Ziffer 3 und 5 die Sätze für Beschäftigte nur bei Mitarbeitern. Lege in Ziffer 5 die Dauer fest; unbefristet ist zulässig, eine Befristung auf einige Jahre erhöht aber die Akzeptanz. Trage in Ziffer 6 die E-Mail-Adresse für den Widerruf und in Ziffer 7 den Link zu deinen Datenschutzhinweisen ein. Bei Minderjährigen unterschreiben die Sorgeberechtigten und ab 14 Jahren zusätzlich der Jugendliche. Drucke zwei Exemplare, lass unterschreiben, gib eines mit und archiviere das andere, solange du die Aufnahmen nutzt.`,
      },
      {
        titel: "Typische Fehler bei Foto- und Videoeinwilligungen",
        text: `Erstens: Die Einwilligung steht im Arbeitsvertrag. Dort ist sie nicht freiwillig und damit angreifbar; nutze ein eigenes Formular, das der Mitarbeiter auch ablehnen kann. Zweitens: Kanäle fehlen. Wer nur „Website“ angekreuzt hat, darf das Foto nicht in eine Instagram-Anzeige stecken; bezahlte Werbung ist ein eigener Zweck und steht deshalb als eigenes Kästchen in der Vorlage. Drittens: keine Dokumentation. Du musst die Einwilligung nachweisen können; ein Nicken vor der Kamera reicht nicht, und bei Beschäftigten ist ohnehin Schriftform oder elektronische Form vorgesehen.

Viertens: Widerruf ignorieren. Nach dem Widerruf müssen die Aufnahmen aus deinen Kanälen verschwinden; wer das verschleppt, riskiert Unterlassungsansprüche und Bußgelder. Fünftens: Dauer nach dem Ausscheiden ungeregelt. Ohne Klausel gehen Gerichte häufig davon aus, dass die Einwilligung mit dem Arbeitsverhältnis endet. Sechstens: Gruppenfotos als Freibrief. Die Ausnahme für Versammlungen greift nur, solange niemand herausgestellt wird; sobald du ein Gesicht in den Vordergrund stellst, brauchst du die Einwilligung dieser Person.`,
      },
      {
        titel: "Rechtsgrundlagen: Art. 6 und 7 DSGVO, §§ 22, 23 KUG, § 26 BDSG",
        text: `Fotos und Videos erkennbarer Personen sind personenbezogene Daten. Ihre Verarbeitung braucht eine Rechtsgrundlage nach Art. 6 Abs. 1 DSGVO; für Marketingzwecke ist das in der Regel die Einwilligung nach Buchstabe a. Art. 7 DSGVO legt die Bedingungen fest: Der Verantwortliche muss die Einwilligung nachweisen können (Absatz 1), die Erklärung muss verständlich und von anderen Sachverhalten getrennt sein (Absatz 2), und die Person kann sie jederzeit mit Wirkung für die Zukunft widerrufen, worüber sie vorher zu informieren ist (Absatz 3).

Für die Veröffentlichung gilt daneben das Kunsturhebergesetz: Nach § 22 KUG dürfen Bildnisse nur mit Einwilligung des Abgebildeten verbreitet werden, § 23 KUG nennt Ausnahmen, etwa Bilder von Versammlungen, auf denen Personen nur als Teil der Menge erscheinen. Für Beschäftigte sieht § 26 Abs. 2 BDSG vor, dass die Einwilligung schriftlich oder elektronisch erfolgen soll, die Freiwilligkeit besonders zu prüfen ist und der Arbeitgeber über Zweck und Widerrufsrecht aufklärt. Die Informationspflichten nach Art. 13 DSGVO erfüllt Ziffer 7 der Vorlage zusammen mit deinen Datenschutzhinweisen.`,
      },
      {
        titel: "Wann die Einwilligung nicht ausreicht",
        text: `Für Models, Schauspieler und Sprecher in Werbeproduktionen ist die Einwilligung zu schwach: Dort brauchst du einen Model- oder Mitwirkendenvertrag mit Vergütung, Nutzungsrechten, Buy-out und einem vertraglich eingeschränkten Widerruf, sonst kann ein Widerruf die ganze Kampagne stoppen. Für die Rechte am Bild selbst, also die Urheberrechte des Fotografen oder Videografen, brauchst du einen Lizenz- oder Werkvertrag; die Einwilligung der abgebildeten Person ersetzt ihn nicht.

Bei Aufnahmen an Schulen, in Kitas, in Arztpraxen oder bei sensiblen Themen wie Gesundheit und Religion gelten strengere Maßstäbe, und die Datenschutzaufsicht schaut genauer hin. Betreibst du internationale Kampagnen oder lässt du Daten außerhalb der EU verarbeiten, sollte ein Datenschutzberater oder Anwalt die Konstellation prüfen. GründerX stellt die Vorlage als Software bereit und ersetzt keine Rechtsberatung.`,
      },
    ],
  text: `Einwilligung in die Anfertigung und Veröffentlichung von Foto- und Videoaufnahmen

Verantwortlicher:
[Firma], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], Telefon [Nummer], E-Mail [E-Mail-Adresse]
[Datenschutzbeauftragter, falls benannt: [Name, Kontakt]]

Abgebildete Person:
[Vorname Nachname], [Straße, PLZ Ort], [E-Mail-Adresse]
[Status: Mitarbeiter/in / Kunde/Kundin / Teilnehmer/in der Veranstaltung „[Name]“ am [Datum]]

1. Gegenstand
Ich willige ein, dass der Verantwortliche im Rahmen von [Anlass, z. B. „der Firmenveranstaltung am [Datum]“ / „der Produktion von Marketingmaterial im Zeitraum [Datum] bis [Datum]“ / „der laufenden Unternehmenskommunikation“] Foto- und Videoaufnahmen [einschließlich Tonaufnahmen] von mir anfertigt, auf denen ich erkennbar bin.

2. Zwecke und Kanäle
Die Aufnahmen dürfen für folgende Zwecke verwendet und auf folgenden Kanälen veröffentlicht werden (Zutreffendes ankreuzen):
[ ] Website des Verantwortlichen ([Domain])
[ ] Social-Media-Kanäle des Verantwortlichen: [ ] Instagram  [ ] LinkedIn  [ ] TikTok  [ ] YouTube  [ ] Facebook  [ ] [weitere]
[ ] Druckerzeugnisse (Flyer, Broschüren, Plakate, Messestände)
[ ] Pressemitteilungen und Weitergabe an Medien
[ ] Interne Kommunikation (Intranet, Mitarbeiterinformationen, Präsentationen)
[ ] Bezahlte Online-Werbung (Anzeigen) auf den oben genannten Plattformen
[ ] Stellenanzeigen und Karriereseiten
[ ] [weiterer Zweck]
Die Aufnahmen dürfen für diese Zwecke bearbeitet werden (Zuschnitt, Farbkorrektur, Text- und Musikeinblendungen), nicht jedoch in einen entstellenden oder herabsetzenden Zusammenhang gebracht werden. [Mein Name darf nicht genannt werden. / Mein Name und meine Funktion dürfen in Bildunterschriften genannt werden.]

3. Rechtsgrundlage
Die Verarbeitung der Aufnahmen erfolgt auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die Verbreitung und öffentliche Zurschaustellung erfolgt auf Grundlage dieser Einwilligung nach §§ 22, 23 Kunsturhebergesetz (KUG). [Für Beschäftigte: Die Einwilligung wird nach § 26 Abs. 2 BDSG schriftlich erteilt. Ich wurde darüber aufgeklärt, dass sie freiwillig ist, dass ich sie jederzeit widerrufen kann und dass mir aus einer Ablehnung oder einem Widerruf keine arbeitsrechtlichen Nachteile entstehen.]

4. Freiwilligkeit und Vergütung
Die Einwilligung ist freiwillig. Aus einer Verweigerung entstehen mir keine Nachteile. Für die Anfertigung und Nutzung der Aufnahmen erhalte ich keine Vergütung; Ansprüche auf ein Honorar oder eine Lizenzgebühr bestehen nicht.

5. Dauer
Die Einwilligung gilt [zeitlich unbefristet / bis zum [Datum] / für die Dauer von [Anzahl] Jahren ab Unterzeichnung]. [Für Beschäftigte: Sie gilt über das Ende des Beschäftigungsverhältnisses hinaus für Aufnahmen, die bis dahin veröffentlicht wurden. Neue Veröffentlichungen nach dem Ausscheiden erfolgen nur mit erneuter Zustimmung.]

6. Widerruf
Ich kann diese Einwilligung jederzeit ohne Angabe von Gründen mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO), z. B. per E-Mail an [E-Mail-Adresse]. Der Widerruf berührt nicht die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung. Nach dem Widerruf entfernt der Verantwortliche die Aufnahmen aus den von ihm kontrollierten Kanälen und löscht sie, soweit keine Aufbewahrungspflicht besteht. Bereits gedruckte Materialien und von Dritten (z. B. Suchmaschinen, andere Nutzer) kopierte Inhalte können nicht zurückgerufen werden; der Verantwortliche informiert Dritte, denen er die Aufnahmen übermittelt hat, über den Widerruf (Art. 17 Abs. 2 DSGVO).

7. Hinweise zur Datenverarbeitung
Bei einer Veröffentlichung im Internet sind die Aufnahmen weltweit abrufbar; Plattformbetreiber mit Sitz außerhalb der EU (z. B. in den USA) können auf die Daten zugreifen. Die Aufnahmen werden beim Verantwortlichen für die Dauer der Nutzung gespeichert. Ich habe das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie auf Beschwerde bei einer Datenschutzaufsichtsbehörde (Art. 15 bis 21 und Art. 77 DSGVO). Die vollständigen Datenschutzhinweise finde ich unter [URL].

8. Minderjährige
Ist die abgebildete Person minderjährig, ist die Einwilligung der sorgeberechtigten Person(en) erforderlich. Ab dem vollendeten 14. Lebensjahr unterschreibt die minderjährige Person zusätzlich selbst. [Bei gemeinsamem Sorgerecht unterschreiben beide Elternteile, oder ein Elternteil versichert mit seiner Unterschrift, auch im Einverständnis des anderen zu handeln.]

[Ort], den [Datum]


______________________________
[Vorname Nachname], abgebildete Person


[Bei Minderjährigen:]

______________________________
[Vorname Nachname], sorgeberechtigte Person 1


______________________________
[Vorname Nachname], sorgeberechtigte Person 2


Der Verantwortliche händigt der abgebildeten Person eine Kopie dieser Einwilligung aus.

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
