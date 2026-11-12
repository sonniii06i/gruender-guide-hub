import type { LexikonInhalt } from "../types";

const inhalt: LexikonInhalt = {
  definition:
    "LUCID ist das öffentliche Online-Verpackungsregister der Zentralen Stelle Verpackungsregister (ZSVR). Wer in Deutschland als Hersteller Verpackungen oder verpackte Ware erstmals bereitstellt, trägt sich dort vor dem ersten Verkauf ein und erhält eine Registrierungsnummer.",
  abschnitte: [
    {
      titel: "Was ist LUCID?",
      bloecke: [
        {
          art: "text",
          text: "LUCID ist der Name der Datenbank, die ZSVR ist die Behörde dahinter, eine Stiftung mit Sitz in Osnabrück. Das Register macht sichtbar, wer für das Recycling welcher Verpackungen zahlt. Jeder kann darin nachsehen, ob ein Unternehmen registriert ist, Kunden und Wettbewerber ebenso wie Marktplätze. Die Registrierung selbst kostet nach Angabe der ZSVR nichts.",
        },
        {
          art: "text",
          text: "Seit dem 12. August 2026 gilt dafür neues Recht: Die europäische Verpackungsverordnung (PPWR, Verordnung (EU) 2025/40) und das deutsche Verpackungsrecht-Durchführungsgesetz (VerpackDG) haben das frühere Verpackungsgesetz abgelöst. Die drei Grundpflichten sind geblieben: registrieren, an einem System beteiligen, Mengen melden. Geändert hat sich, wer sie erfüllen muss.",
        },
      ],
    },
    {
      titel: "Wer muss sich in LUCID registrieren?",
      bloecke: [
        {
          art: "text",
          text: "Registrieren muss sich der Hersteller im Sinne der PPWR. Das ist, vereinfacht gesagt, das Unternehmen, das die erweiterte Herstellerverantwortung in dem Land trägt, in dem die Verpackung zu Abfall wird. Mit dem Hersteller eines Produkts im Alltagssinn hat das wenig zu tun. Die ZSVR nennt für den Online-Handel unter anderem diese Fälle:",
        },
        {
          art: "liste",
          punkte: [
            "Du lässt Versandverpackungen mit deinem Namen, Logo oder deiner Marke herstellen und versendest darin: Du bist Hersteller.",
            "Du fügst neutrale Materialien wie Karton, Klebeband und Füllmaterial selbst zu einer Versandverpackung zusammen: Du bist Hersteller, weil erst durch dich die vollständige Verpackung entsteht.",
            "Du versendest aus dem Ausland direkt an Endabnehmer in Deutschland: Du bist mindestens für die Versandverpackung Hersteller. Ohne Niederlassung in Deutschland musst du zusätzlich einen Bevollmächtigten benennen.",
            "Du lässt Produkte unter deiner eigenen Marke verpacken: Durch den Markenvorrang bist du für diese Verpackungen Hersteller.",
          ],
        },
        {
          art: "text",
          text: "Versandverpackungen sind nach Auskunft der ZSVR ausnahmslos systembeteiligungspflichtig, auch wenn die Sendung an ein Unternehmen geht. Die Registrierung ist eine höchstpersönliche Pflicht: Du kannst Dienstleister mit vielem beauftragen, die Registrierung und die Datenmeldung in LUCID aber nicht (§ 5 Abs. 1 VerpackDG).",
        },
      ],
    },
    {
      titel: "Welche Pflichten und Fristen hängen an LUCID?",
      bloecke: [
        {
          art: "tabelle",
          kopf: ["Pflicht", "Wann", "Grundlage"],
          zeilen: [
            ["Registrierung in LUCID", "vor dem erstmaligen Bereitstellen", "§ 6 Abs. 1 VerpackDG"],
            ["Beteiligung an einem System (Vertrag mit einem dualen System)", "vor dem Bereitstellen, mit Angabe der Registrierungsnummer", "§ 7 Abs. 1 VerpackDG"],
            ["Datenmeldung in LUCID", "unverzüglich nach jeder Meldung an das System", "§ 9 Abs. 1 VerpackDG"],
            ["Vereinfachte Jahresmeldung bei weniger als 10 Tonnen im Vorjahr", "bis 1. Juni des Folgejahres", "§ 9 Abs. 2 VerpackDG"],
            ["Vollständigkeitserklärung", "jährlich bis 15. Mai", "§ 10 Abs. 1 VerpackDG"],
          ],
        },
        {
          art: "text",
          text: "Von der Vollständigkeitserklärung ist befreit, wer im Vorjahr weniger als 80 Tonnen Glas, weniger als 50 Tonnen Papier, Pappe und Karton und weniger als 30 Tonnen der übrigen Materialarten bereitgestellt hat (§ 10 Abs. 4 VerpackDG). Die ZSVR kann sie im Einzelfall trotzdem verlangen. Änderungen an den Registrierungsdaten teilst du unverzüglich mit (§ 6 Abs. 1 VerpackDG).",
        },
        {
          art: "text",
          text: "Für alle, die schon nach altem Recht registriert waren: Die Registrierung gilt fort (§ 68 Abs. 2 VerpackDG). Für Anpassungen der Daten an die neue Rollenverteilung nannte das Gesetz den 12. November 2026. Systembeteiligungen aus der Zeit vor dem 12. August 2026 gelten längstens bis zum 31. Dezember 2026 weiter (§ 68 Abs. 1 VerpackDG).",
        },
      ],
    },
    {
      titel: "Beispiel: Kleiner Shop mit 3.000 Paketen im Jahr",
      bloecke: [
        {
          art: "text",
          text: "Beispiel (frei gewählt): Eine Händlerin verschickt Kerzen in neutralen Kartons, die sie selbst mit Füllpapier und Klebeband packt. Je Paket rechnet sie mit 150 g Karton, 20 g Papier und 5 g Kunststoff für Klebeband und Etikett.",
        },
        {
          art: "tabelle",
          kopf: ["Material", "Rechnung", "Menge im Jahr"],
          zeilen: [
            ["Papier, Pappe, Karton", "3.000 × 170 g", "510 kg"],
            ["Kunststoff", "3.000 × 5 g", "15 kg"],
            ["Summe", "", "525 kg"],
          ],
        },
        {
          art: "text",
          text: "Mit 0,525 Tonnen liegt sie weit unter 10 Tonnen. Für sie genügt die Jahresmeldung bis zum 1. Juni, eine Vollständigkeitserklärung braucht sie nicht. Registrierung und Systembeteiligung braucht sie trotzdem, denn dafür gibt es keine Mindestmenge. Hinzu kommen die Verkaufsverpackungen der Kerzen, wenn sie diese unter eigener Marke verpacken lässt.",
        },
      ],
    },
    {
      titel: "In welcher Reihenfolge gehst du vor?",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Rolle klären: Bist du für Versand- und Produktverpackung Hersteller? Die ZSVR beschreibt die Fälle auf ihrer Seite zum Versand- und Onlinehandel.",
            "In LUCID als Hersteller registrieren. Du brauchst Stammdaten, Steuernummer oder Umsatzsteuer-Identifikationsnummer, eine vertretungsberechtigte Person und deine Markennamen. Danach hast du die Registrierungsnummer.",
            "Vertrag mit einem System schließen und dort die Registrierungsnummer angeben.",
            "Die Mengen aus dem Systemvertrag in LUCID melden, mit denselben Zahlen.",
            "Die Registrierungsnummer bei Marktplatz und Fulfillment-Dienstleister hinterlegen.",
          ],
        },
        {
          art: "text",
          text: "Der letzte Schritt hat einen Grund: Online-Plattformen müssen sich von jedem Hersteller die Registrierung bestätigen lassen und eine Selbstbescheinigung zur Herstellerverantwortung einholen, bevor er ihre Dienste nutzt. Fehlen die Nachweise, dürfen die verpackten Produkte dort nicht angeboten werden. Für Fulfillment-Dienstleister gilt Entsprechendes. Die Anmeldung Schritt für Schritt zeigt der Ratgeber [[/ratgeber/lucid-verpackungsregister-anmelden|LUCID-Registrierung anmelden]], die Kosten der Systembeteiligung schätzt der [[/tools/lucid-wizard|Verpackungslizenz-Rechner]].",
        },
      ],
    },
    {
      titel: "Typische Fehler",
      bloecke: [
        {
          art: "liste",
          punkte: [
            "Nur registrieren. Ohne Systemvertrag und Datenmeldung ist die Pflicht nicht erfüllt.",
            "Verschiedene Steuernummern oder Firmennamen bei LUCID, System und Marktplatz angeben. Der automatische Abgleich schlägt dann fehl.",
            "Markennamen nicht eintragen.",
            "Mengen im System anpassen und die Meldung in LUCID vergessen.",
            "Die Registrierung einem Dienstleister überlassen. Das Gesetz schließt das aus.",
          ],
        },
      ],
    },
    {
      titel: "Was passiert bei Verstößen?",
      bloecke: [
        {
          art: "text",
          text: "Wer sich nicht oder nicht rechtzeitig registriert, handelt ordnungswidrig. Dafür sieht das Gesetz eine Geldbuße bis 100.000 € vor, für die fehlende Systembeteiligung bis 200.000 € (§ 66 Abs. 1 Nr. 1 und 3, Abs. 3 VerpackDG). Das sind Obergrenzen des Gesetzes. Im Alltag bemerken Händler die Lücke meist früher, weil der Marktplatz die Nummer abfragt. Die Registrierung ist an einem Abend erledigt, die Meldungen bleiben jedes Jahr.",
        },
        {
          art: "hinweis",
          text: "Stand der Angaben: 12. November 2026. Diese Seite erklärt den Begriff und ersetzt keine Rechtsberatung. Welche Rolle du für welche Verpackung hast, prüfst du im Einzelfall selbst oder mit fachkundiger Hilfe.",
        },
      ],
    },
  ],
  verwandt: ["ce-kennzeichnung", "dac7", "unit-economics"],
  kontext: [
    {
      pfad: "/ratgeber/lucid-verpackungsregister-anmelden",
      label: "Ratgeber: LUCID-Registrierung Schritt für Schritt",
      text: "Die Anmeldung im Register mit allen Eingabefeldern, vom Konto bis zur Nummer.",
    },
    {
      pfad: "/tools/lucid-wizard",
      label: "Verpackungslizenz-Rechner (LUCID)",
      text: "Schätze deine Verpackungsmengen und die Kosten der Systembeteiligung.",
    },
    {
      pfad: "/tools/vergleich-lucid",
      label: "Vergleich: LUCID und Verpackungslizenz",
      text: "Anbieter für die Systembeteiligung im Überblick.",
    },
    {
      pfad: "/tools/weee-check",
      label: "WEEE / EAR-Register-Check",
      text: "Verkaufst du Elektrogeräte, kommt neben LUCID die Registrierung bei der stiftung ear dazu.",
    },
  ],
  quellen: [
    { titel: "§ 6 VerpackDG: Registrierung; zuständige Behörde", url: "https://www.gesetze-im-internet.de/verpackdg/__6.html" },
    { titel: "§ 7 VerpackDG: Systembeteiligungspflicht", url: "https://www.gesetze-im-internet.de/verpackdg/__7.html" },
    { titel: "§ 9 VerpackDG: Datenmeldungen", url: "https://www.gesetze-im-internet.de/verpackdg/__9.html" },
    { titel: "§ 10 VerpackDG: Vollständigkeitserklärungen", url: "https://www.gesetze-im-internet.de/verpackdg/__10.html" },
    { titel: "§ 66 VerpackDG: Bußgeldvorschriften", url: "https://www.gesetze-im-internet.de/verpackdg/__66.html" },
    { titel: "§ 68 VerpackDG: Übergangsvorschriften", url: "https://www.gesetze-im-internet.de/verpackdg/__68.html" },
    { titel: "ZSVR: PPWR und VerpackDG, was seit dem 12. August 2026 gilt", url: "https://www.verpackungsregister.org/ich-moechte-wissen-was-seit-dem-12-august-2026-gilt" },
    { titel: "ZSVR: So registrieren Sie sich im Verpackungsregister LUCID", url: "https://www.verpackungsregister.org/registrierung/alle-informationen-zur-registrierung" },
    { titel: "ZSVR: Versand- und Onlinehandel", url: "https://www.verpackungsregister.org/themen/versand-und-onlinehandel" },
    { titel: "ZSVR: Datenmeldung", url: "https://www.verpackungsregister.org/systembeteiligung-und-datenmeldung/datenmeldung" },
  ],
};

export default inhalt;
