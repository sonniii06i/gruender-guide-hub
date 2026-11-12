import type { LexikonInhalt } from "../types";

const inhalt: LexikonInhalt = {
  definition:
    "Ein Smoke Test prüft, ob Menschen ein Angebot wirklich haben wollen, bevor es das Produkt gibt. Du zeigst das Angebot so, als wäre es fast fertig, schickst gezielt Besucher darauf und misst, wie viele einen verbindlichen Schritt gehen: Vorbestellung anklicken, E-Mail-Adresse eintragen, Termin buchen.",
  abschnitte: [
    {
      titel: "Was ist ein Smoke Test?",
      bloecke: [
        {
          art: "text",
          text: "Der Begriff kommt aus der Technik: Man schaltet ein Gerät zum ersten Mal ein und schaut, ob es raucht. Im Gründerkontext ist damit ein Nachfragetest gemeint. Die Frage lautet: Würde das jemand kaufen? Ob das Produkt technisch funktioniert, klärst du später. Das ist die billigste Stelle, an der eine Idee scheitern kann, denn bis dahin hast du nur eine Seite gebaut und ein kleines Werbebudget ausgegeben.",
        },
        {
          art: "text",
          text: "Ein Smoke Test misst Verhalten, keine Meinungen. In Umfragen sagen viele Menschen aus Höflichkeit, sie fänden eine Idee gut. Auf einer Angebotsseite mit Preis müssen sie sich entscheiden. Deshalb gehört zum Test immer ein konkreter Preis und ein Schritt, der den Besucher etwas kostet: Zeit, Daten oder eine Zusage.",
        },
      ],
    },
    {
      titel: "Wie funktioniert ein Smoke Test Schritt für Schritt?",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Hypothese aufschreiben: Wer hat welches Problem, und was ist er bereit zu zahlen? Ein Satz, der falsch sein kann.",
            "Erfolgsschwelle vor dem Start festlegen, zum Beispiel: Mindestens 5 % der Besucher klicken auf „Vorbestellen“, mindestens 2 % tragen ihre E-Mail-Adresse ein. Wer die Schwelle erst nach dem Test setzt, redet sich jedes Ergebnis schön.",
            "Eine Angebotsseite bauen: Nutzen, Bild oder Skizze, Preis, ein einziger Knopf. Kein Menü, keine zweite Botschaft.",
            "Passende Besucher einkaufen: Anzeigen bei Meta, Google oder TikTok mit genau der Zielgruppe aus der Hypothese. Freunde und Bekannte zählen nicht, sie klicken aus Sympathie.",
            "Nach dem Klick ehrlich auflösen: Das Produkt ist in Vorbereitung, wer mag, kommt auf die Warteliste.",
            "Auswerten und entscheiden: bauen, Angebot ändern und erneut testen oder die Idee streichen.",
          ],
        },
        {
          art: "text",
          text: "Die schlankere Variante für bestehende Produkte ist der [[/lexikon/fake-door-test|Fake-Door-Test]]: Dort testest du kein ganzes Angebot, sondern eine einzelne Funktion innerhalb eines Produkts, das schon Nutzer hat.",
        },
      ],
    },
    {
      titel: "Beispiel: Smoke Test für ein Gewürz-Abo",
      bloecke: [
        {
          art: "text",
          text: "Beispiel (frei gewählt, keine echten Kundendaten): Eine Gründerin aus Leipzig plant ein Abo für Gewürzmischungen in Nachfüllbeuteln, 14,90 € im Monat. Bevor sie Ware einkauft, baut sie an einem Abend eine Angebotsseite und schaltet eine Woche lang Anzeigen an Hobbyköche in Deutschland.",
        },
        {
          art: "tabelle",
          kopf: ["Größe", "Wert", "Rechnung"],
          zeilen: [
            ["Werbebudget", "300 €", "fest für 7 Tage"],
            ["Besucher auf der Seite", "500", "300 € ÷ 0,60 € je Klick"],
            ["Klick auf „Abo vorbestellen“", "40", "40 ÷ 500 = 8 %"],
            ["E-Mail auf der Warteliste", "15", "15 ÷ 500 = 3 %"],
            ["Kosten je Wartelisten-Eintrag", "20 €", "300 € ÷ 15"],
          ],
        },
        {
          art: "text",
          text: "Beide Schwellen (5 % Klicks, 2 % E-Mails) sind übertroffen, das Interesse ist da. Die 20 € je Eintrag sind aber ein Warnsignal: Selbst wenn jeder Zweite von der Warteliste später wirklich abschließt, kostet ein Abonnent rund 40 € an Werbung. Bei 14,90 € Monatspreis und einem angenommenen Rohertrag von 6 € je Lieferung müsste ein Kunde fast sieben Monate bleiben, um das wieder einzuspielen. Der Test liefert damit mehr als ein Ja oder Nein, nämlich die erste Schätzung für die [[/lexikon/customer-acquisition-cost-cac|Kundengewinnungskosten]] und damit für die [[/lexikon/unit-economics|Unit Economics]].",
        },
      ],
    },
    {
      titel: "Welche Zahlen sind ein gutes Ergebnis?",
      bloecke: [
        {
          art: "text",
          text: "Feste Richtwerte, die für jede Branche gelten, gibt es nicht. Eine Klickrate hängt vom Preis, vom Kanal und davon ab, wie warm die Besucher sind. Aussagekräftig wird der Test erst durch den Vergleich: zwei Preise, zwei Zielgruppen oder zwei Versprechen gegeneinander, bei gleichem Budget. Rechne außerdem mit kleinen Zahlen vorsichtig. Bei 500 Besuchern entscheiden fünf Klicks mehr oder weniger über einen ganzen Prozentpunkt. Unter etwa 300 bis 500 passenden Besuchern je Variante ist das Ergebnis eher ein Hinweis als ein Beleg.",
        },
      ],
    },
    {
      titel: "Typische Fehler beim Smoke Test",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Kein Preis auf der Seite. Dann misst du Neugier, nicht Kaufabsicht.",
            "Die falschen Besucher: breite Zielgruppe, eigene Follower oder Gründerforen statt der späteren Kunden.",
            "Nur Klicks zählen. Erst der zweite Schritt (E-Mail, Vorbestellung, Terminbuchung) zeigt, wie ernst es jemand meint.",
            "Zu früh abbrechen oder nach zwei Tagen umbauen. Wochentage unterscheiden sich, eine volle Woche ist das Minimum.",
            "Das Ergebnis als Umsatzprognose lesen. Ein Smoke Test zeigt Interesse am Angebot. Über die Wiederkaufrate sagt er nichts.",
          ],
        },
      ],
    },
    {
      titel: "Was heißt das für Gründer in Deutschland rechtlich?",
      bloecke: [
        {
          art: "text",
          text: "Ein Smoke Test wirbt für etwas, das es noch nicht gibt. Das ist erlaubt, solange niemand getäuscht wird. Drei Regeln aus dem deutschen Recht solltest du kennen, bevor du Anzeigen schaltest:",
        },
        {
          art: "liste",
          punkte: [
            "Verfügbarkeit nicht vortäuschen. Nach § 5 UWG ist eine geschäftliche Handlung irreführend, wenn sie unwahre oder täuschende Angaben über wesentliche Merkmale wie die Verfügbarkeit der Ware enthält. Der Anhang zu § 3 Abs. 3 UWG nennt als stets unzulässig Angebote zu einem bestimmten Preis, wenn der Unternehmer nicht darüber aufklärt, dass er die Ware voraussichtlich nicht in angemessener Menge bereitstellen kann (Nr. 5). Schreib deshalb spätestens nach dem Klick klar, dass das Produkt in Vorbereitung ist, und nimm kein Geld für etwas, dessen Lieferung offen ist.",
            "E-Mail-Werbung nur mit Einwilligung. Nach § 7 Abs. 2 Nr. 2 UWG ist Werbung per E-Mail ohne vorherige ausdrückliche Einwilligung eine unzumutbare Belästigung. Die Warteliste braucht also einen klaren Einwilligungstext; wofür du die Adresse nutzt, steht in der Datenschutzerklärung.",
            "Tracking nur mit Einwilligung. Werbe-Pixel und Analyse-Cookies speichern Informationen auf dem Gerät des Besuchers. Das ist nach § 25 TDDDG nur mit Einwilligung zulässig, soweit es nicht unbedingt erforderlich ist. Auch eine Testseite braucht deshalb Impressum, Datenschutzerklärung und einen Einwilligungsdialog.",
          ],
        },
        {
          art: "hinweis",
          text: "Diese Übersicht erklärt den Begriff und ersetzt keine Rechtsberatung. Bei Vorverkauf gegen Geld, bei Heilversprechen oder regulierten Produkten gelten weitere Regeln.",
        },
      ],
    },
  ],
  verwandt: ["fake-door-test", "customer-acquisition-cost-cac", "unit-economics", "north-star-metric"],
  kontext: [
    {
      pfad: "/guides/erste-webseite-seo",
      label: "Guide: Erste Webseite & organisch sichtbar werden",
      text: "Von der Domain bis zur ersten Seite, auf der dein Test laufen kann.",
    },
    {
      pfad: "/guides/meta-ads-setup",
      label: "Guide: Meta Ads Manager einrichten",
      text: "Konto, Pixel und erste Kampagne, um passende Besucher auf die Testseite zu bringen.",
    },
    {
      pfad: "/businessplan-erstellen",
      label: "Businessplan erstellen (kostenlos)",
      text: "Trag das Testergebnis als Beleg für die Nachfrage in deinen Businessplan ein.",
    },
  ],
  quellen: [
    { titel: "§ 5 UWG: Irreführende geschäftliche Handlungen", url: "https://www.gesetze-im-internet.de/uwg_2004/__5.html" },
    { titel: "Anhang zu § 3 Abs. 3 UWG, Nr. 5 (Lockangebote)", url: "https://www.gesetze-im-internet.de/uwg_2004/anhang.html" },
    { titel: "§ 7 UWG: Unzumutbare Belästigungen (E-Mail-Werbung)", url: "https://www.gesetze-im-internet.de/uwg_2004/__7.html" },
    { titel: "§ 25 TDDDG: Schutz der Privatsphäre bei Endeinrichtungen", url: "https://www.gesetze-im-internet.de/ttdsg/__25.html" },
    { titel: "The Lean Startup: Principles (Build-Measure-Learn)", url: "https://theleanstartup.com/principles" },
  ],
};

export default inhalt;
