import { VORLAGEN_HINWEIS, type Vorlage } from "./types";

// Gesellschaft & Gründung: GbR, UG, GmbH, Gesellschafter, Vesting.
// Rechtsstand: MoPeG (seit 01.01.2024), GmbHG, HGB. Stand 2026-10.

export const VORLAGEN_GESELLSCHAFT: Vorlage[] = [
  {
    slug: "gbr-gesellschaftsvertrag",
    titel: "GbR-Gesellschaftsvertrag",
    kurz: "Vollständiger Gesellschaftsvertrag für zwei oder mehr Gründer nach dem neuen GbR-Recht (MoPeG).",
    kategorie: "gesellschaft",
    dateiname: "GbR-Gesellschaftsvertrag",
    wofuer: [
      "Zwei oder mehr Personen gründen gemeinsam ohne Notar und ohne Stammkapital",
      "Nebenberufliche Projekte, Agenturen, Online-Shops oder Beratungen zu zweit",
      "Als Grundlage für die Eintragung als eGbR ins Gesellschaftsregister",
      "Wenn die gesetzliche Grundregel (Haftung mit dem Privatvermögen) klar geregelt werden soll",
    ],
    enthaelt: [
      "§ 1 Name, Sitz und Gegenstand",
      "§ 2 Gesellschafter und Beiträge",
      "§ 3 Geschäftsführung und Vertretung",
      "§ 4 Beschlüsse und Stimmrechte",
      "§ 5 Gewinn- und Verlustverteilung, Entnahmen",
      "§ 6 Geschäftsjahr, Buchführung, Konten",
      "§ 7 Wettbewerbsverbot und Nebentätigkeiten",
      "§ 8 Kündigung, Ausscheiden und Fortsetzung",
      "§ 9 Abfindung",
      "§ 10 Tod eines Gesellschafters",
      "§ 11 Auflösung und Liquidation",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Seit dem MoPeG (01.01.2024) gilt: Ohne Regelung verteilt sich der Gewinn nach Beteiligungsverhältnis, nicht mehr nach Köpfen. Die Vorlage regelt das ausdrücklich.",
      "Alle Gesellschafter haften persönlich und unbeschränkt – auch für Fehler des anderen. Wer das nicht will, braucht eine UG oder GmbH.",
      "Eine Eintragung ins Gesellschaftsregister (eGbR) ist freiwillig, aber Pflicht, wenn die GbR Grundstücke, GmbH-Anteile oder Marken halten soll.",
      "Gewerbliche GbRs melden jeden Gesellschafter beim Gewerbeamt an; die GbR selbst bekommt eine Steuernummer und gibt eine Feststellungserklärung ab.",
    ],
    faqs: [
      {
        q: "Brauche ich für eine GbR überhaupt einen schriftlichen Vertrag?",
        a: "Nein, eine GbR entsteht auch mündlich. Ohne Vertrag gelten aber die gesetzlichen Regeln, die oft nicht passen: keine Regelung zu Arbeitszeit, Entnahmen, Wettbewerb oder Ausscheiden. Der schriftliche Vertrag verhindert den Streit, bevor er entsteht.",
      },
      {
        q: "Was ist der Unterschied zwischen GbR und eGbR?",
        a: "Die eGbR ist dieselbe Gesellschaft, nur im Gesellschaftsregister eingetragen. Vorteil: Sie kann als solche Grundstücke, Anteile und Marken halten und wirkt nach außen verlässlicher. Nachteil: Notar- und Registerkosten und Transparenzregister-Pflicht.",
      },
      {
        q: "Muss der GbR-Vertrag notariell beurkundet werden?",
        a: "Nein. Formfrei genügt, solange die GbR keine Grundstücke einbringt. Für die eGbR-Anmeldung muss nur die Anmeldung zum Register notariell beglaubigt werden, nicht der Vertrag.",
      },
      {
        q: "Was passiert, wenn ein Gesellschafter kündigt?",
        a: "Nach neuem Recht scheidet der Kündigende aus und die GbR wird von den übrigen fortgesetzt – die Gesellschaft löst sich nicht mehr automatisch auf. Die Vorlage regelt die Frist, die Abfindung und das Ausscheiden ausdrücklich.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann brauchst du einen GbR-Gesellschaftsvertrag?",
        text: `Sobald zwei oder mehr Personen gemeinsam ein Geschäft betreiben, entsteht automatisch eine Gesellschaft bürgerlichen Rechts, auch ohne Papier. Typische Fälle: Zwei Freunde starten einen Online-Shop, drei Berater teilen sich Kunden und Büro, ein Entwickler und ein Vertriebler bauen nebenberuflich ein Produkt. Ab dem ersten gemeinsamen Euro gelten dann die gesetzlichen Regeln, und die passen selten zum eigenen Vorhaben.

Ein schriftlicher GbR-Vertrag lohnt sich deshalb vom ersten Tag an, nicht erst beim Streit. Er klärt, wer wie viel Geld und Arbeitszeit einbringt, wer welche Verträge allein unterschreiben darf, wie Gewinn und Entnahmen laufen und was passiert, wenn jemand aussteigt, krank wird oder stirbt. Auch Banken, Gewerbeamt und Finanzamt fragen nach dem Vertrag, und für die Eintragung als eGbR ins Gesellschaftsregister ist er die Grundlage.`,
      },
      {
        titel: "Was muss in einen GbR-Vertrag? Pflichtinhalte und wichtige Klauseln",
        text: `Das Gesetz schreibt keinen Mindestinhalt vor. Damit der Vertrag im Alltag und im Streit trägt, sollten aber diese Punkte drinstehen, so wie sie die Vorlage in den §§ 1 bis 12 abbildet:

- Name, Sitz und Gegenstand der Gesellschaft (§ 1), optional mit dem Zusatz eGbR
- Beiträge jedes Gesellschafters in Geld, Sachen und Arbeitszeit sowie die Beteiligungsquote (§ 2)
- Geschäftsführung und Vertretung mit einer Wertgrenze für Alleinentscheidungen und einem Katalog zustimmungspflichtiger Geschäfte (§ 3)
- Beschlüsse, Stimmrechte und die Fälle, in denen Einstimmigkeit nötig ist (§ 4)
- Gewinn- und Verlustverteilung, monatliche Entnahmen und Steuerrücklage (§ 5)
- Geschäftsjahr, Buchführung, Kapital- und Privatkonten, Geschäftskonto (§ 6)
- Wettbewerbsverbot und erlaubte Nebentätigkeiten (§ 7)
- Kündigung, Ausscheiden und Fortsetzung der Gesellschaft (§ 8)
- Abfindung mit Bewertungsmethode, Ratenzahlung und Schiedsgutachter (§ 9)
- Tod eines Gesellschafters (§ 10), Auflösung und Liquidation (§ 11)
- Schriftform, salvatorische Klausel, Mediation und Gerichtsstand (§ 12)

Fehlt eine dieser Regeln, greift die gesetzliche Grundregel. Die ist seit 2024 zwar moderner als früher, aber zum Beispiel bei Abfindung und Wettbewerb kaum brauchbar.`,
      },
      {
        titel: "GbR-Vertrag Muster richtig ausfüllen: Schritt für Schritt",
        text: `Die Vorlage arbeitet mit Platzhaltern in eckigen Klammern. Gehe sie der Reihe nach durch:

- Kopf: Vorname, Nachname, Geburtsdatum und Anschrift jedes Gesellschafters; den Block für Gesellschafter 3 löschen oder ergänzen.
- § 1: Name der GbR, Sitz, eine konkrete Beschreibung der Tätigkeit und das Startdatum. Der Zusatz eGbR nur, wenn ihr die Eintragung wirklich plant.
- § 2: Bareinlage in Euro mit Zahlungsdatum, Wochenstunden je Gesellschafter, bei Sacheinlagen Gegenstand und vereinbarter Wert. Die Beteiligungsquoten müssen zusammen 100 Prozent ergeben.
- § 3: Wertgrenze, bis zu der jeder allein unterschreiben darf (im Muster 1.000 EUR), und die Schwelle für zustimmungspflichtige Anschaffungen.
- § 5 und § 6: monatliche Entnahmegrenze, Frist für die Rückzahlung von Überentnahmen, Ende des ersten Rumpfgeschäftsjahres, Bank und Verfügungsberechtigung.
- § 7: bestehende Jobs oder Nebentätigkeiten, die ausdrücklich erlaubt bleiben.
- § 8 und § 9: Kündigungsfrist, erster Kündigungstermin, Bewertungsmethode und Ratenzahl für die Abfindung, Abschlag bei Ausscheiden aus wichtigem Grund.
- § 10: Entscheidet euch für eine der beiden Varianten (Fortsetzung ohne oder mit Erben) und löscht die andere.
- § 11: Wer Name, Domain und Social-Media-Konten bei Auflösung behält.

Am Ende Ort, Datum und eigenhändige Unterschriften aller Gesellschafter; jeder bekommt eine Ausfertigung. Lade die Vorlage als Word-Datei, wenn du Klauseln umformulieren willst, oder als PDF zum Ausdrucken.`,
      },
      {
        titel: "Typische Fehler beim GbR-Gesellschaftsvertrag",
        text: `Der häufigste Fehler ist die Vorlage ohne Anpassung zu unterschreiben und Platzhalter oder beide Alternativen stehen zu lassen. Prüfe am Ende mit der Suchfunktion, ob noch eckige Klammern im Text sind.

Zweiter Klassiker: Arbeitszeit wird nicht geregelt. Wenn einer Vollzeit arbeitet und der andere fünf Stunden pro Woche, aber beide 50 Prozent halten, ist Streit programmiert. Entweder die Quoten anpassen oder eine Tätigkeitsvergütung vorab vereinbaren, die § 5 Abs. 1 als Option vorsieht.

Dritter Fehler: keine Steuerrücklage. Die GbR selbst zahlt keine Einkommensteuer, jeder Gesellschafter versteuert seinen Gewinnanteil privat, auch den Teil, der im Unternehmen bleibt. Wer alles entnimmt, steht bei der Steuernachzahlung ohne Geld da.

Außerdem oft vergessen: die Abfindungsklausel. Ohne Methode und Ratenzahlung kann ein Ausscheidender den vollen Verkehrswert sofort verlangen und die Gesellschaft in die Zahlungsunfähigkeit treiben. Und schließlich die Haftung: Alle Gesellschafter haften persönlich und unbeschränkt, auch für Fehler des anderen. Wer das nicht tragen will, braucht eine UG oder GmbH statt einer GbR.`,
      },
      {
        titel: "Rechtliche Grundlagen: GbR nach dem MoPeG seit 2024",
        text: `Die GbR ist in den §§ 705 ff. BGB geregelt. Mit dem Gesetz zur Modernisierung des Personengesellschaftsrechts (MoPeG) wurden diese Vorschriften zum 1. Januar 2024 grundlegend neu gefasst. Die wichtigsten Punkte für Gründer:

- Die GbR ist rechtsfähig, kann also selbst Verträge schließen, klagen und Eigentum halten.
- Ohne Vertrag richtet sich die Gewinnverteilung nach den Beteiligungsverhältnissen, im Zweifel nach dem Wert der vereinbarten Beiträge, nicht mehr nach Köpfen.
- Kündigt ein Gesellschafter, scheidet er aus und die Gesellschaft wird fortgesetzt; die automatische Auflösung ist abgeschafft.
- Ein ausgeschiedener Gesellschafter haftet für Altverbindlichkeiten noch fünf Jahre nach (§ 728b BGB).
- Neu ist das Gesellschaftsregister: Die Eintragung als eGbR ist freiwillig, aber Voraussetzung, wenn die GbR Grundstücke, GmbH-Anteile oder Marken erwerben will. Eingetragene GbRs müssen auch ins Transparenzregister.

Der Vertrag selbst ist formfrei und braucht keinen Notar. Nur wenn ein Gesellschafter ein Grundstück einbringt, ist notarielle Beurkundung nötig. Gewerbliche GbRs melden jeden Gesellschafter beim Gewerbeamt an; freiberufliche GbRs melden sich nur beim Finanzamt. In beiden Fällen gibt die Gesellschaft jährlich eine Feststellungserklärung ab.`,
      },
      {
        titel: "Wann die GbR-Vorlage nicht ausreicht",
        text: `Die Vorlage deckt den Normalfall ab: zwei bis vier natürliche Personen, Bareinlagen und Arbeitskraft, ein überschaubares Geschäft. Hol dir Unterstützung, wenn einer dieser Punkte zutrifft:

- Ein Gesellschafter bringt ein Grundstück, ein bestehendes Unternehmen oder wertvolle Schutzrechte ein; dann sind Notar und Steuerberater Pflicht.
- Eine Gesellschaft (GmbH, UG) soll Gesellschafterin werden oder es geht um Beteiligungen von Investoren.
- Das Geschäft erreicht Umsätze, bei denen die Haftung mit dem Privatvermögen untragbar wird; dann ist die Rechtsform selbst die Frage, nicht der Vertrag.
- Ihr wollt steuerlich gestalten, etwa mit Sonderbetriebsvermögen, Pensionszusagen oder einer späteren Umwandlung in eine GmbH.
- Es gibt schon Streit, oder einer der Beteiligten ist mit einem anderen verheiratet oder verwandt, was Erb- und Familienrecht ins Spiel bringt.

GründerX stellt diese Vorlage als Software-Muster bereit und ersetzt keine Rechtsberatung. Für den Standardfall reicht das Muster als Word oder PDF; für alles darüber hinaus lohnt eine Stunde beim Anwalt für Gesellschaftsrecht, die deutlich günstiger ist als der spätere Streit.`,
      },
    ],
    seo: {
      title: "GbR-Vertrag Vorlage kostenlos (Word & PDF) | GründerX",
      description:
        "GbR-Gesellschaftsvertrag als kostenlose Vorlage nach neuem Recht (MoPeG): Gewinnverteilung, Geschäftsführung, Kündigung, Abfindung. Als Word, PDF und Text.",
    },
    stand: "2026-10",
    text: `Gesellschaftsvertrag einer Gesellschaft bürgerlichen Rechts (GbR)

zwischen

1. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
   – nachfolgend „Gesellschafter 1“ –

2. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
   – nachfolgend „Gesellschafter 2“ –

[3. ggf. weitere Gesellschafter]

– gemeinsam „die Gesellschafter“ –

§ 1 Name, Sitz und Gegenstand
(1) Die Gesellschafter schließen sich zu einer Gesellschaft bürgerlichen Rechts im Sinne der §§ 705 ff. BGB zusammen. Die Gesellschaft führt den Namen „[Name] GbR“. [Optional: Die Gesellschaft wird in das Gesellschaftsregister eingetragen und führt dann den Zusatz „eGbR“.]
(2) Sitz der Gesellschaft ist [Ort].
(3) Gegenstand der Gesellschaft ist [genaue Beschreibung der Tätigkeit, z. B. „der Betrieb eines Online-Shops für Sportbekleidung und die Erbringung von Marketing-Dienstleistungen“]. Die Gesellschaft darf alle Geschäfte vornehmen, die dem Gesellschaftszweck unmittelbar oder mittelbar dienen.
(4) Die Gesellschaft beginnt am [Datum]. Sie wird auf unbestimmte Zeit geschlossen.

§ 2 Gesellschafter, Beiträge und Beteiligung
(1) Die Gesellschafter leisten folgende Beiträge:
   a) Gesellschafter 1: eine Bareinlage von [Betrag] EUR, zahlbar bis zum [Datum], sowie seine Arbeitskraft im Umfang von etwa [Stunden] Stunden pro Woche.
   b) Gesellschafter 2: eine Bareinlage von [Betrag] EUR, zahlbar bis zum [Datum], sowie seine Arbeitskraft im Umfang von etwa [Stunden] Stunden pro Woche.
   [c) Sacheinlagen, z. B. „Gesellschafter 1 bringt den Laptop [Modell] mit einem vereinbarten Wert von [Betrag] EUR ein.“]
(2) Am Vermögen, am Gewinn und am Verlust der Gesellschaft sind die Gesellschafter wie folgt beteiligt: Gesellschafter 1 [z. B. 50] %, Gesellschafter 2 [z. B. 50] %. Diese Beteiligungsverhältnisse gelten auch für Stimmrechte und Abfindung, soweit dieser Vertrag nichts anderes bestimmt.
(3) Eine Nachschusspflicht besteht nicht. Zusätzliche Beiträge können nur durch einstimmigen Beschluss beschlossen werden.

§ 3 Geschäftsführung und Vertretung
(1) Zur Geschäftsführung und Vertretung der Gesellschaft sind alle Gesellschafter gemeinsam berechtigt und verpflichtet. Im Rahmen des gewöhnlichen Geschäftsbetriebs darf jeder Gesellschafter die Gesellschaft allein vertreten, soweit das einzelne Geschäft einen Wert von [Betrag, z. B. 1.000] EUR nicht übersteigt.
(2) Folgende Geschäfte bedürfen stets der vorherigen Zustimmung aller Gesellschafter:
   a) Abschluss, Änderung und Kündigung von Miet-, Leasing-, Arbeits- und Dauerschuldverträgen,
   b) Aufnahme von Darlehen, Übernahme von Bürgschaften und Gewährung von Krediten,
   c) Anschaffungen und Verpflichtungen über [Betrag] EUR im Einzelfall,
   d) Erteilung von Vollmachten und Prokura,
   e) Beginn neuer Geschäftszweige und Aufgabe bestehender,
   f) Einstellung und Entlassung von Mitarbeitern.
(3) Jeder Gesellschafter widmet der Gesellschaft seine Arbeitskraft im in § 2 bestimmten Umfang. Urlaub wird untereinander abgestimmt; Krankheit ist unverzüglich mitzuteilen.
(4) Die Gesellschafter informieren sich gegenseitig laufend über alle wesentlichen Vorgänge und gewähren einander jederzeit Einsicht in Bücher, Konten und Unterlagen.

§ 4 Beschlüsse und Stimmrechte
(1) Gesellschafterbeschlüsse werden in Gesellschafterversammlungen oder, wenn alle Gesellschafter einverstanden sind, schriftlich, per E-Mail oder in Video-/Telefonkonferenz gefasst.
(2) Das Stimmrecht richtet sich nach der Beteiligung gemäß § 2 Abs. 2. Beschlüsse werden mit einfacher Mehrheit gefasst, soweit dieser Vertrag oder das Gesetz nichts anderes vorschreibt.
(3) Einstimmigkeit ist erforderlich für: Änderungen dieses Vertrags, Aufnahme neuer Gesellschafter, Änderung des Gesellschaftszwecks, Auflösung der Gesellschaft, Eintragung ins Gesellschaftsregister sowie die in § 3 Abs. 2 genannten Geschäfte.
(4) Über jede Versammlung wird ein Protokoll gefertigt, das von allen Anwesenden unterzeichnet und allen Gesellschaftern übermittelt wird. Beschlüsse können nur innerhalb von [z. B. 4] Wochen nach Zugang des Protokolls angefochten werden.

§ 5 Gewinn- und Verlustverteilung, Entnahmen
(1) Gewinn und Verlust werden nach Ablauf des Geschäftsjahres im Verhältnis der Beteiligung gemäß § 2 Abs. 2 verteilt. [Optional: Vorab erhält jeder Gesellschafter eine Tätigkeitsvergütung von [Betrag] EUR monatlich, die als Aufwand behandelt wird.]
(2) Jeder Gesellschafter darf monatlich bis zu [Betrag] EUR als Vorschuss auf seinen Gewinnanteil entnehmen, sofern die Liquidität der Gesellschaft dies zulässt. Weitergehende Entnahmen bedürfen eines Gesellschafterbeschlusses.
(3) Die Gesellschafter stellen jeweils einen Betrag zurück, der zur Zahlung der auf den Gewinnanteil entfallenden Einkommensteuer ausreicht; die Steuer auf den Gewinnanteil trägt jeder Gesellschafter selbst.
(4) Übersteigen die Entnahmen eines Gesellschafters seinen Gewinnanteil, ist der Mehrbetrag innerhalb von [z. B. 3] Monaten nach Feststellung des Jahresabschlusses zurückzuzahlen.

§ 6 Geschäftsjahr, Buchführung, Konten
(1) Geschäftsjahr ist das Kalenderjahr. Das erste Geschäftsjahr ist ein Rumpfgeschäftsjahr und endet am 31.12.[Jahr].
(2) Die Gesellschaft führt Bücher nach den steuerlichen Vorschriften (Einnahmenüberschussrechnung, solange keine Buchführungspflicht besteht). Der Jahresabschluss ist innerhalb von [z. B. 6] Monaten nach Ende des Geschäftsjahres zu erstellen und von allen Gesellschaftern festzustellen.
(3) Für jeden Gesellschafter werden ein festes Kapitalkonto (Einlage) und ein variables Privatkonto (Gewinnanteile, Entnahmen, Tätigkeitsvergütung) geführt.
(4) Die Gesellschaft unterhält ein Geschäftskonto bei [Bank], über das alle Zahlungen der Gesellschaft abgewickelt werden. Verfügungsberechtigt sind [alle Gesellschafter einzeln / nur gemeinsam].

§ 7 Wettbewerbsverbot und Nebentätigkeiten
(1) Während der Dauer der Gesellschaft darf kein Gesellschafter ohne schriftliche Zustimmung der übrigen im Geschäftsbereich der Gesellschaft für eigene oder fremde Rechnung tätig werden oder sich an einem Konkurrenzunternehmen beteiligen.
(2) Folgende bestehende Tätigkeiten sind ausgenommen: [z. B. „Anstellung von Gesellschafter 2 bei der Firma X“].
(3) Verstößt ein Gesellschafter gegen das Wettbewerbsverbot, kann die Gesellschaft Schadensersatz verlangen oder verlangen, dass die Geschäfte als für Rechnung der Gesellschaft eingegangen gelten.

§ 8 Kündigung, Ausscheiden und Fortsetzung
(1) Jeder Gesellschafter kann die Gesellschaft mit einer Frist von [z. B. 6] Monaten zum Ende eines Geschäftsjahres kündigen, erstmals zum [Datum]. Die Kündigung bedarf der Schriftform gegenüber allen übrigen Gesellschaftern. Das Recht zur fristlosen Kündigung aus wichtigem Grund bleibt unberührt.
(2) Durch die Kündigung wird die Gesellschaft nicht aufgelöst. Der kündigende Gesellschafter scheidet mit Wirksamwerden der Kündigung aus; die Gesellschaft wird von den übrigen Gesellschaftern fortgesetzt. Bleibt nur ein Gesellschafter übrig, geht das Gesellschaftsvermögen auf ihn über, und er führt das Unternehmen als Einzelunternehmen fort.
(3) Ein Gesellschafter scheidet außerdem aus, wenn
   a) über sein Vermögen das Insolvenzverfahren eröffnet oder mangels Masse abgelehnt wird,
   b) ein Gläubiger seinen Gesellschaftsanteil pfändet und die Pfändung nicht innerhalb von drei Monaten aufgehoben wird,
   c) die übrigen Gesellschafter ihn aus wichtigem Grund (insbesondere grober Pflichtverletzung, Verstoß gegen § 7, dauernde Arbeitsunfähigkeit über [z. B. 12] Monate) durch Beschluss ausschließen; der Betroffene hat dabei kein Stimmrecht.
(4) Der ausscheidende Gesellschafter wird von den Verbindlichkeiten der Gesellschaft im Innenverhältnis freigestellt. Die Nachhaftung nach § 728b BGB bleibt im Außenverhältnis unberührt.

§ 9 Abfindung
(1) Der ausscheidende Gesellschafter erhält eine Abfindung in Höhe seines Anteils am Wert der Gesellschaft. Der Wert wird nach folgender Methode bestimmt: [z. B. „Buchwert zum Stichtag zuzüglich stiller Reserven“ oder „das [1,5]-fache des durchschnittlichen Jahresgewinns der letzten drei Geschäftsjahre“ oder „vereinfachtes Ertragswertverfahren nach §§ 199 ff. BewG“]. Ein Firmenwert wird [nicht / mit [Betrag] EUR] berücksichtigt.
(2) Die Abfindung ist in [z. B. 4] gleichen Halbjahresraten zu zahlen, die erste Rate sechs Monate nach dem Ausscheiden. Der offene Betrag ist mit [z. B. 2] Prozentpunkten über dem Basiszinssatz zu verzinsen. Vorzeitige Zahlung ist jederzeit zulässig.
(3) Scheidet ein Gesellschafter aus wichtigem Grund, den er zu vertreten hat, aus, beträgt die Abfindung [z. B. 75] % des nach Absatz 1 ermittelten Wertes.
(4) Einigen sich die Gesellschafter nicht über den Wert, entscheidet ein von der Industrie- und Handelskammer [Ort] zu benennender Wirtschaftsprüfer oder Steuerberater als Schiedsgutachter verbindlich. Die Kosten tragen die Gesellschaft und der Ausscheidende je zur Hälfte.

§ 10 Tod eines Gesellschafters
(1) Stirbt ein Gesellschafter, wird die Gesellschaft von den übrigen Gesellschaftern fortgesetzt. Die Erben scheiden aus und erhalten die Abfindung nach § 9.
[Alternative: (1) Stirbt ein Gesellschafter, wird die Gesellschaft mit seinen Erben fortgesetzt, sofern diese innerhalb von drei Monaten ihren Eintritt erklären. Mehrere Erben haben einen gemeinsamen Vertreter zu benennen.]
(2) Die übrigen Gesellschafter können innerhalb von drei Monaten nach Kenntnis vom Tod beschließen, die Gesellschaft aufzulösen.

§ 11 Auflösung und Liquidation
(1) Die Gesellschaft wird aufgelöst durch einstimmigen Beschluss der Gesellschafter, durch Eröffnung des Insolvenzverfahrens über das Gesellschaftsvermögen oder in den gesetzlich bestimmten Fällen.
(2) Nach der Auflösung findet die Liquidation statt. Liquidatoren sind alle Gesellschafter gemeinsam, sofern nicht ein Liquidator durch Beschluss bestimmt wird. Das nach Begleichung aller Verbindlichkeiten verbleibende Vermögen wird im Verhältnis der Beteiligung gemäß § 2 Abs. 2 verteilt.
(3) Das Recht, den Namen der Gesellschaft, die Domain [domain.de] und die Social-Media-Konten weiterzuführen, steht [Gesellschafter 1 / dem Gesellschafter zu, der das höchste Gebot abgibt].

§ 12 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform. Das gilt auch für die Aufhebung dieser Schriftformklausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. Die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt. Gleiches gilt für Lücken.
(3) Die Gesellschafter verpflichten sich, bei Streitigkeiten zunächst ein Gespräch unter Hinzuziehung eines neutralen Dritten (Mediation) zu führen, bevor sie gerichtliche Schritte einleiten.
(4) Gerichtsstand ist, soweit gesetzlich zulässig, [Ort]. Es gilt das Recht der Bundesrepublik Deutschland.
(5) Jeder Gesellschafter erhält eine unterschriebene Ausfertigung dieses Vertrags.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gesellschafter 1


______________________________
[Vorname Nachname], Gesellschafter 2


[______________________________
[Vorname Nachname], Gesellschafter 3]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "ug-gesellschaftsvertrag",
    titel: "UG-Gesellschaftsvertrag (haftungsbeschränkt)",
    kurz: "Individueller Gesellschaftsvertrag für eine UG (haftungsbeschränkt) mit Thesaurierungspflicht, Vinkulierung, Einziehung und Abfindung – statt des knappen Musterprotokolls.",
    kategorie: "gesellschaft",
    dateiname: "UG-Gesellschaftsvertrag",
    wofuer: [
      "Gründung einer UG (haftungsbeschränkt) mit zwei oder mehr Gesellschaftern, für die das Musterprotokoll zu dünn ist",
      "Start-ups, die später Investoren aufnehmen und schon jetzt Vinkulierung und Einziehung brauchen",
      "Gründer, die mit kleinem Stammkapital starten und die Haftung auf das Gesellschaftsvermögen begrenzen wollen",
      "Als Entwurf für den Notartermin, damit die Beurkundung nicht am Text scheitert",
    ],
    enthaelt: [
      "§ 1 Firma, Sitz, Gegenstand",
      "§ 2 Stammkapital und Geschäftsanteile",
      "§ 3 Gesetzliche Rücklage (§ 5a GmbHG)",
      "§ 4 Geschäftsführung und Vertretung",
      "§ 5 Gesellschafterversammlung und Beschlüsse",
      "§ 6 Jahresabschluss und Ergebnisverwendung",
      "§ 7 Verfügung über Geschäftsanteile (Vinkulierung)",
      "§ 8 Einziehung von Geschäftsanteilen",
      "§ 9 Abfindung",
      "§ 10 Wettbewerbsverbot",
      "§ 11 Dauer, Kündigung, Bekanntmachungen",
      "§ 12 Gründungsaufwand und Schlussbestimmungen",
    ],
    hinweise: [
      "Der Vertrag muss notariell beurkundet werden (§ 2 GmbHG), seit 2022 auch online per Videokonferenz mit dem Notar. Diese Vorlage ist der Entwurf für den Termin, nicht der Ersatz.",
      "Eine UG muss jedes Jahr 25 % des Jahresüberschusses (nach Abzug eines Verlustvortrags) in die gesetzliche Rücklage einstellen, bis das Stammkapital auf 25.000 EUR erhöht ist (§ 5a Abs. 3 GmbHG). Vollausschüttungen sind bis dahin unzulässig.",
      "Sacheinlagen sind bei der UG verboten, das Stammkapital muss vor der Anmeldung in voller Höhe eingezahlt sein (§ 5a Abs. 2 GmbHG). Mit 1 EUR Stammkapital gründen wenig Gründer, weil die Notar- und Registerkosten sonst sofort zur Überschuldung führen.",
      "Der Zusatz „UG (haftungsbeschränkt)“ oder „Unternehmergesellschaft (haftungsbeschränkt)“ ist Pflicht im Rechtsverkehr. Wer ihn weglässt, riskiert die persönliche Haftung.",
      "Die wirtschaftlich Berechtigten müssen ins Transparenzregister eingetragen werden; die Gesellschafterliste beim Handelsregister muss nach jedem Anteilswechsel aktualisiert werden (§ 40 GmbHG).",
    ],
    faqs: [
      {
        q: "Musterprotokoll oder individueller Vertrag – was ist besser?",
        a: "Das Musterprotokoll (§ 2 Abs. 1a GmbHG) ist günstiger, erlaubt aber nur bis zu drei Gesellschafter, einen Geschäftsführer und keine eigenen Regelungen zu Vinkulierung, Einziehung oder Abfindung. Sobald mehrere Gründer gleichberechtigt zusammenarbeiten oder Investoren geplant sind, lohnt der individuelle Vertrag, weil ein späterer Wechsel wieder zum Notar führt.",
      },
      {
        q: "Wie viel Stammkapital sollte eine UG haben?",
        a: "Gesetzlich reicht 1 EUR. In der Praxis sind 500 bis 1.000 EUR üblich, damit Gründungskosten und erste Ausgaben nicht sofort zur bilanziellen Überschuldung führen. Der Gründungsaufwand, den die Gesellschaft trägt, muss in der Satzung beziffert werden und sollte das Stammkapital nicht übersteigen.",
      },
      {
        q: "Wann wird aus der UG eine GmbH?",
        a: "Wenn das Stammkapital durch Kapitalerhöhung aus der Rücklage oder durch neue Einlagen auf mindestens 25.000 EUR gebracht wird (§ 5a Abs. 5 GmbHG). Die Thesaurierungspflicht entfällt dann, und die Firma kann auf „GmbH“ geändert werden. Der Wechsel erfordert eine Satzungsänderung beim Notar.",
      },
      {
        q: "Was bedeutet die Vinkulierung in § 7 der Vorlage?",
        a: "Vinkulierung heißt: Ein Gesellschafter darf seinen Anteil nur mit Zustimmung der Gesellschafterversammlung verkaufen oder abtreten. So verhindern die Gründer, dass plötzlich ein Fremder mit am Tisch sitzt. Ergänzt wird die Klausel durch ein Vorkaufsrecht und die Einziehung in § 8.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann brauchst du einen eigenen UG-Gesellschaftsvertrag?",
        text: `Für die Gründung einer UG (haftungsbeschränkt) gibt es zwei Wege: das gesetzliche Musterprotokoll oder eine individuelle Satzung. Das Musterprotokoll ist günstig, taugt aber nur für maximal drei Gesellschafter und einen Geschäftsführer und enthält keine Regeln zu Vinkulierung, Einziehung, Abfindung oder Wettbewerbsverbot.

Ein eigener UG-Gesellschaftsvertrag ist der richtige Weg, wenn du mit Mitgründern startest, die nicht nur Kapital, sondern Arbeit einbringen, wenn ihr in ein bis zwei Jahren Investoren aufnehmen wollt oder wenn mehrere Geschäftsführer geplant sind. Auch wer heute allein gründet und später Partner aufnehmen will, spart sich mit einer vollständigen Satzung die zweite Beurkundung. Diese Vorlage ist dafür der Entwurf, den du zum Notartermin mitbringst: Die Beurkundung bleibt Pflicht, aber der Notar muss nur noch prüfen statt entwerfen.`,
      },
      {
        titel: "Was gehört in die UG-Satzung? Pflichtangaben und sinnvolle Klauseln",
        text: `Zwingend sind nach § 3 GmbHG nur Firma, Sitz, Unternehmensgegenstand, Stammkapital sowie Zahl und Nennbeträge der Geschäftsanteile jedes Gesellschafters. Alles Weitere ist freiwillig, entscheidet aber im Ernstfall. Die Vorlage regelt in zwölf Paragraphen:

- Firma mit dem Pflichtzusatz UG (haftungsbeschränkt), Sitz, Gegenstand und Geschäftsjahr (§ 1)
- Stammkapital, Stückelung in 1-Euro-Anteile und Volleinzahlung vor Anmeldung (§ 2)
- die gesetzliche Rücklage von 25 Prozent des Jahresüberschusses nach § 5a GmbHG (§ 3)
- Geschäftsführung, Vertretung, Befreiung von § 181 BGB und zustimmungspflichtige Geschäfte (§ 4)
- Gesellschafterversammlung, Einberufung in Textform, Videokonferenz, Mehrheiten (§ 5)
- Jahresabschluss und Ergebnisverwendung nach Dotierung der Rücklage (§ 6)
- Vinkulierung und Vorerwerbsrecht der Mitgesellschafter (§ 7)
- Einziehung von Anteilen bei Insolvenz, Pfändung, wichtigem Grund, Tod und Vesting (§ 8)
- Abfindung nach dem vereinfachten Ertragswertverfahren mit Abschlag und Raten (§ 9)
- Wettbewerbsverbot mit Vertragsstrafe (§ 10), Kündigung und Bekanntmachungen (§ 11)
- Gründungsaufwand, salvatorische Klausel, Gerichtsstand (§ 12)

Gerade die §§ 7 bis 9 fehlen im Musterprotokoll komplett. Ohne sie kann ein Mitgründer seinen Anteil an jeden verkaufen und eine Trennung endet vor Gericht.`,
      },
      {
        titel: "UG-Gesellschaftsvertrag Muster ausfüllen: die Platzhalter",
        text: `Arbeite die eckigen Klammern von oben nach unten ab:

- Gesellschafter mit Name, Geburtsdatum und Anschrift; den dritten Block löschen oder ergänzen.
- § 1: Firma ohne Sonderzeichen, Sitz (die politische Gemeinde, nicht die Straße), einen Gegenstand, der die geplante Tätigkeit konkret beschreibt, und das Ende des ersten Rumpfgeschäftsjahres.
- § 2: Stammkapital in Euro und die Anzahl der Anteile; dann je Gesellschafter die Anteilsnummern von bis und den Gesamtnennbetrag. Die Summe muss exakt dem Stammkapital entsprechen.
- § 4 Abs. 4: Schwellenwerte für Darlehen, Investitionen, Dauerschuldverträge und Gehälter, die zur Größe des Unternehmens passen.
- § 5: Frist für die ordentliche Versammlung und das Quorum für die Beschlussfähigkeit.
- § 7 Abs. 2: Annahmefrist für das Vorerwerbsrecht, meist vier Wochen.
- § 9: Prozentsatz für die reduzierte Abfindung bei Einziehung aus wichtigem Grund und die Zahl der Jahresraten.
- § 10 Abs. 2 und 3: bestehende Tätigkeiten, die erlaubt bleiben, und die Höhe der Vertragsstrafe.
- § 11: Kündigungsfrist und erster möglicher Kündigungstermin.
- § 12: Gründungsaufwand in Euro, den die Gesellschaft tragen darf.

Der ausgefüllte Entwurf geht als Word-Datei an den Notar. Unterschrieben wird erst im Termin, nicht vorher.`,
      },
      {
        titel: "Häufige Fehler bei der UG-Gründung mit eigener Satzung",
        text: `Fehler Nummer eins: ein Gründungsaufwand, der das Stammkapital übersteigt. Wer mit 500 EUR gründet und 800 EUR Notar- und Registerkosten in die Satzung schreibt, ist am ersten Tag bilanziell überschuldet. Setze das Stammkapital so, dass es die Gründungskosten und die ersten Rechnungen deckt.

Fehler zwei: Sacheinlagen. Bei der UG sind sie verboten; Laptop, Software oder Domain können nur nach der Gründung verkauft oder überlassen werden. Fehler drei: der Firmenzusatz. UG (haftungsbeschränkt) muss auf jeder Rechnung, E-Mail-Signatur und Website stehen. Wer nur UG schreibt, riskiert die persönliche Haftung.

Fehler vier: die Thesaurierung vergessen. Die UG darf nicht den vollen Gewinn ausschütten, ein Viertel muss in die Rücklage. Ein Ausschüttungsbeschluss ohne diesen Posten ist nichtig. Fehler fünf: ein zu weiter oder zu enger Unternehmensgegenstand. Zu eng heißt Satzungsänderung beim Notar, sobald ihr ein neues Produkt anbietet; zu weit und unbestimmt lehnt das Registergericht ab. Und schließlich: Nach der Gründung Transparenzregister und Gesellschafterliste nicht pflegen. Beides muss nach jedem Anteilswechsel aktualisiert werden, sonst drohen Bußgelder.`,
      },
      {
        titel: "Rechtliche Grundlagen der UG (haftungsbeschränkt)",
        text: `Die UG ist keine eigene Rechtsform, sondern eine GmbH mit kleinem Stammkapital nach § 5a GmbHG. Es gelten deshalb alle Vorschriften des GmbH-Gesetzes mit wenigen Besonderheiten:

- Stammkapital ab 1 EUR, Volleinzahlung vor der Anmeldung, keine Sacheinlagen (§ 5a Abs. 1 und 2 GmbHG)
- jährliche Rücklage von 25 Prozent des um einen Verlustvortrag geminderten Jahresüberschusses, bis das Stammkapital auf 25.000 EUR erhöht ist (§ 5a Abs. 3 und 5 GmbHG)
- Pflicht zur sofortigen Einberufung der Gesellschafterversammlung bei drohender Zahlungsunfähigkeit (§ 5a Abs. 4 GmbHG)

Der Gesellschaftsvertrag muss notariell beurkundet werden (§ 2 GmbHG), seit 2022 auch online per Videokonferenz mit dem Notar bei Bargründungen. Die Gesellschaft entsteht erst mit Eintragung ins Handelsregister; wer vorher im Namen der UG handelt, haftet persönlich (§ 11 GmbHG). Satzungsänderungen brauchen eine Dreiviertelmehrheit und erneut den Notar (§ 53 GmbHG). Anteilsübertragungen sind ebenfalls beurkundungspflichtig (§ 15 GmbHG). Nach der Eintragung folgen Gewerbeanmeldung, steuerliche Erfassung, Transparenzregister und, bei Mitarbeitern, die Betriebsnummer.`,
      },
      {
        titel: "Wann du statt der UG-Vorlage Notar, Anwalt oder Steuerberater brauchst",
        text: `Den Notar brauchst du in jedem Fall, denn ohne Beurkundung gibt es keine UG. Die Vorlage spart dir dort Zeit und Besprechungsaufwand, nicht den Termin. Zusätzlich solltest du vor dem Termin Rat holen, wenn

- eine GmbH, ein Verein oder eine ausländische Person Gesellschafter wird,
- ihr direkt bei Gründung eine Vesting-Vereinbarung, einen Beteiligungspool oder Investorenrechte verankern wollt,
- ein Gründer ein bestehendes Einzelunternehmen einbringen will; das geht bei der UG nur über einen Verkauf nach der Gründung und hat steuerliche Folgen,
- die Gesellschafter in verschiedenen Ländern wohnen oder Ehepartner beteiligt sind,
- das Geschäft eine Erlaubnis braucht, etwa Finanzdienstleistungen, Gesundheit oder Handwerk mit Meisterpflicht.

Ein Steuerberater lohnt sich schon bei der Frage, ob die UG überhaupt die richtige Rechtsform ist: Bei geringen Gewinnen und hohem Privatentnahmebedarf kann ein Einzelunternehmen günstiger sein als Körperschaftsteuer plus Kapitalertragsteuer. GründerX liefert mit dieser Vorlage das Muster als Software-Dokument und keine individuelle Rechtsberatung.`,
      },
    ],
    seo: {
      title: "UG-Gesellschaftsvertrag Vorlage kostenlos | GründerX",
      description:
        "UG-Gesellschaftsvertrag als kostenlose Vorlage: Stammkapital, Thesaurierung nach § 5a GmbHG, Vinkulierung, Einziehung, Abfindung. Entwurf für den Notar.",
    },
    stand: "2026-10",
    text: `Gesellschaftsvertrag der [Name] UG (haftungsbeschränkt)

Gesellschafter:

1. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
2. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
[3. ggf. weitere Gesellschafter]

§ 1 Firma, Sitz, Gegenstand
(1) Die Firma der Gesellschaft lautet: [Name] UG (haftungsbeschränkt).
(2) Sitz der Gesellschaft ist [Ort].
(3) Gegenstand des Unternehmens ist [genaue Beschreibung, z. B. „die Entwicklung und der Vertrieb von Software für kleine Unternehmen sowie damit zusammenhängende Dienstleistungen“].
(4) Die Gesellschaft darf alle Geschäfte vornehmen, die geeignet sind, den Gesellschaftszweck unmittelbar oder mittelbar zu fördern. Sie darf Zweigniederlassungen errichten und sich an anderen Unternehmen beteiligen.
(5) Die Gesellschaft ist auf unbestimmte Zeit errichtet. Geschäftsjahr ist das Kalenderjahr; das erste Geschäftsjahr ist ein Rumpfgeschäftsjahr und endet am 31.12.[Jahr].

§ 2 Stammkapital und Geschäftsanteile
(1) Das Stammkapital der Gesellschaft beträgt [Betrag, z. B. 1.000] EUR.
(2) Es ist eingeteilt in [Anzahl, z. B. 1.000] Geschäftsanteile mit einem Nennbetrag von je 1,00 EUR. Hiervon übernehmen:
   a) [Vorname Nachname] [Anzahl] Geschäftsanteile (Nr. 1 bis [Nr.]) im Gesamtnennbetrag von [Betrag] EUR,
   b) [Vorname Nachname] [Anzahl] Geschäftsanteile (Nr. [Nr.] bis [Nr.]) im Gesamtnennbetrag von [Betrag] EUR.
(3) Die Einlagen sind in Geld zu leisten und vor der Anmeldung der Gesellschaft zum Handelsregister in voller Höhe einzuzahlen (§ 5a Abs. 2 GmbHG). Sacheinlagen sind ausgeschlossen.

§ 3 Gesetzliche Rücklage
(1) Die Gesellschaft bildet eine gesetzliche Rücklage, in die jährlich ein Viertel des um einen Verlustvortrag aus dem Vorjahr geminderten Jahresüberschusses einzustellen ist (§ 5a Abs. 3 GmbHG).
(2) Die Rücklage darf nur verwendet werden für eine Kapitalerhöhung aus Gesellschaftsmitteln, zum Ausgleich eines Jahresfehlbetrags, der nicht durch einen Gewinnvortrag gedeckt ist, oder zum Ausgleich eines Verlustvortrags, der nicht durch einen Jahresüberschuss gedeckt ist.
(3) Die Pflicht nach Absatz 1 endet, sobald das Stammkapital durch Beschluss der Gesellschafter auf mindestens 25.000 EUR erhöht wurde. Die Gesellschafter streben die Erhöhung an, sobald die Rücklage dies zulässt.

§ 4 Geschäftsführung und Vertretung
(1) Die Gesellschaft hat einen oder mehrere Geschäftsführer. Ist nur ein Geschäftsführer bestellt, vertritt er die Gesellschaft allein. Sind mehrere bestellt, wird die Gesellschaft durch zwei Geschäftsführer gemeinsam oder durch einen Geschäftsführer zusammen mit einem Prokuristen vertreten.
(2) Die Gesellschafterversammlung kann einzelnen Geschäftsführern Einzelvertretungsbefugnis erteilen und sie von den Beschränkungen des § 181 BGB befreien.
(3) Die Geschäftsführer führen die Geschäfte mit der Sorgfalt eines ordentlichen Geschäftsmannes nach Gesetz, diesem Vertrag, einer etwaigen Geschäftsordnung und den Weisungen der Gesellschafterversammlung.
(4) Folgende Geschäfte bedürfen der vorherigen Zustimmung der Gesellschafterversammlung:
   a) Erwerb, Veräußerung und Belastung von Grundstücken und Beteiligungen,
   b) Aufnahme von Darlehen und Übernahme von Bürgschaften über [Betrag] EUR im Einzelfall,
   c) Investitionen und Verpflichtungen über [Betrag] EUR im Einzelfall oder [Betrag] EUR im Geschäftsjahr,
   d) Abschluss und Kündigung von Miet-, Leasing- und Dauerschuldverträgen mit einer Laufzeit über [z. B. 12] Monate,
   e) Einstellung von Mitarbeitern mit einem Jahresgehalt über [Betrag] EUR,
   f) Erteilung von Prokura und Generalvollmacht,
   g) Aufnahme neuer und Aufgabe bestehender Geschäftszweige.
(5) Der erste Geschäftsführer wird in der Gründungsurkunde bestellt.

§ 5 Gesellschafterversammlung und Beschlüsse
(1) Die ordentliche Gesellschafterversammlung findet innerhalb von [z. B. 6] Monaten nach Ende des Geschäftsjahres statt. Außerordentliche Versammlungen sind einzuberufen, wenn das Interesse der Gesellschaft es erfordert oder Gesellschafter mit mindestens 10 % des Stammkapitals dies verlangen.
(2) Die Einberufung erfolgt durch die Geschäftsführung mit einer Frist von mindestens zwei Wochen in Textform (auch per E-Mail an die zuletzt mitgeteilte Adresse) unter Angabe der Tagesordnung. Der Tag der Absendung und der Tag der Versammlung werden nicht mitgerechnet.
(3) Versammlungen können auch per Video- oder Telefonkonferenz abgehalten werden. Beschlüsse können außerhalb einer Versammlung in Textform gefasst werden, wenn alle Gesellschafter mit dieser Form einverstanden sind oder sich an der Abstimmung beteiligen.
(4) Die Versammlung ist beschlussfähig, wenn mindestens [z. B. 75] % des Stammkapitals vertreten sind. Ist sie nicht beschlussfähig, ist mit gleicher Tagesordnung eine neue Versammlung einzuberufen, die ohne Rücksicht auf das vertretene Kapital beschlussfähig ist; hierauf ist in der Einladung hinzuweisen.
(5) Je 1,00 EUR eines Geschäftsanteils gewährt eine Stimme. Beschlüsse werden mit einfacher Mehrheit der abgegebenen Stimmen gefasst, soweit Gesetz oder dieser Vertrag nicht eine größere Mehrheit vorsehen. Änderungen dieses Vertrags, Kapitalmaßnahmen, Auflösung und Umwandlung bedürfen einer Mehrheit von drei Vierteln der abgegebenen Stimmen.
(6) Über jede Versammlung und jeden Beschluss ist eine Niederschrift zu fertigen, die vom Versammlungsleiter zu unterzeichnen und allen Gesellschaftern zu übermitteln ist. Beschlüsse können nur innerhalb eines Monats nach Zugang der Niederschrift durch Klage angefochten werden.

§ 6 Jahresabschluss und Ergebnisverwendung
(1) Die Geschäftsführer stellen den Jahresabschluss innerhalb der gesetzlichen Fristen auf und legen ihn den Gesellschaftern unverzüglich vor.
(2) Die Gesellschafter beschließen über die Feststellung des Jahresabschlusses und die Verwendung des Ergebnisses. Vor jeder Ausschüttung ist die Rücklage nach § 3 zu bilden.
(3) Der nach Dotierung der Rücklage verbleibende Gewinn wird im Verhältnis der Geschäftsanteile verteilt, soweit die Gesellschafter nicht mit drei Vierteln der Stimmen eine Thesaurierung beschließen.

§ 7 Verfügung über Geschäftsanteile
(1) Die Abtretung, Verpfändung oder sonstige Belastung von Geschäftsanteilen oder Teilen davon bedarf der Zustimmung der Gesellschafterversammlung mit einer Mehrheit von drei Vierteln der abgegebenen Stimmen (§ 15 Abs. 5 GmbHG). Der betroffene Gesellschafter hat kein Stimmrecht.
(2) Will ein Gesellschafter seinen Geschäftsanteil an einen Dritten veräußern, hat er ihn zunächst den übrigen Gesellschaftern im Verhältnis ihrer Beteiligung zu den mit dem Dritten ausgehandelten Bedingungen schriftlich anzubieten. Das Angebot kann innerhalb von [z. B. 4] Wochen angenommen werden. Nicht ausgeübte Rechte wachsen den übrigen Gesellschaftern anteilig zu.
(3) Eine Veräußerung an den Dritten ist nur zulässig, wenn kein Gesellschafter das Angebot angenommen hat, zu Bedingungen, die nicht günstiger sind als die angebotenen, und innerhalb von drei Monaten nach Ablauf der Annahmefrist.

§ 8 Einziehung von Geschäftsanteilen
(1) Die Einziehung von Geschäftsanteilen ist mit Zustimmung des betroffenen Gesellschafters jederzeit zulässig.
(2) Ohne Zustimmung des Betroffenen kann die Einziehung beschlossen werden, wenn
   a) über sein Vermögen das Insolvenzverfahren eröffnet oder die Eröffnung mangels Masse abgelehnt wird,
   b) der Geschäftsanteil gepfändet wird und die Pfändung nicht innerhalb von drei Monaten aufgehoben wird,
   c) der Gesellschafter gegen § 7 oder § 10 verstößt oder einen sonstigen wichtigen Grund in seiner Person setzt, der den übrigen Gesellschaftern die Fortsetzung mit ihm unzumutbar macht,
   d) der Gesellschafter stirbt und die Erben nicht Gesellschafter oder Ehegatten eines Gesellschafters sind,
   e) eine gesonderte Vereinbarung (z. B. Vesting) dies vorsieht.
(3) Der Beschluss bedarf einer Mehrheit von drei Vierteln der abgegebenen Stimmen; der Betroffene hat kein Stimmrecht. Statt der Einziehung kann die Gesellschafterversammlung beschließen, dass der Anteil an die Gesellschaft, einen Gesellschafter oder einen Dritten abzutreten ist.
(4) Die Einziehung darf nur erfolgen, wenn die Abfindung aus freiem, nicht zur Erhaltung des Stammkapitals erforderlichem Vermögen gezahlt werden kann (§§ 30, 34 GmbHG).

§ 9 Abfindung
(1) Der ausscheidende Gesellschafter erhält eine Abfindung in Höhe des Verkehrswerts seines Geschäftsanteils. Der Verkehrswert wird nach dem vereinfachten Ertragswertverfahren (§§ 199 ff. BewG) zum Stichtag des Ausscheidens ermittelt, sofern die Beteiligten sich nicht innerhalb von zwei Monaten auf einen Wert einigen.
(2) In den Fällen des § 8 Abs. 2 lit. a bis c beträgt die Abfindung [z. B. 60] % des Werts nach Absatz 1, höchstens jedoch den Buchwert.
(3) Die Abfindung ist in [z. B. 3] gleichen Jahresraten zu zahlen, die erste Rate sechs Monate nach dem Stichtag. Der offene Betrag wird mit 2 Prozentpunkten über dem Basiszinssatz verzinst. Sicherheiten können nicht verlangt werden.
(4) Streit über die Höhe entscheidet ein von der Industrie- und Handelskammer [Ort] benannter Wirtschaftsprüfer als Schiedsgutachter. Die Kosten tragen Gesellschaft und Ausscheidender je zur Hälfte.

§ 10 Wettbewerbsverbot
(1) Kein Gesellschafter darf während seiner Zugehörigkeit zur Gesellschaft im Geschäftsbereich der Gesellschaft für eigene oder fremde Rechnung tätig werden oder sich an einem Wettbewerber beteiligen. Beteiligungen unter 5 % an börsennotierten Gesellschaften sind erlaubt.
(2) Die Gesellschafterversammlung kann durch Beschluss Befreiung erteilen. Bestehende Tätigkeiten: [z. B. „keine“ oder Aufzählung].
(3) Bei Verstoß kann die Gesellschaft eine Vertragsstrafe von [Betrag] EUR je Fall und darüber hinausgehenden Schadensersatz verlangen.

§ 11 Dauer, Kündigung, Bekanntmachungen
(1) Jeder Gesellschafter kann seine Beteiligung mit einer Frist von [z. B. 6] Monaten zum Ende eines Geschäftsjahres kündigen, erstmals zum [Datum]. Die Kündigung ist durch eingeschriebenen Brief an die Gesellschaft zu erklären.
(2) Die Kündigung führt nicht zur Auflösung. Der Geschäftsanteil des Kündigenden wird nach § 8 Abs. 3 eingezogen oder abgetreten; die Abfindung bestimmt sich nach § 9 Abs. 1.
(3) Bekanntmachungen der Gesellschaft erfolgen im Bundesanzeiger.

§ 12 Gründungsaufwand und Schlussbestimmungen
(1) Die Gesellschaft trägt die mit der Gründung verbundenen Kosten (Notar, Handelsregister, Veröffentlichung, Beratung) bis zu einem Betrag von [Betrag, z. B. 300] EUR. Darüber hinausgehende Kosten tragen die Gesellschafter im Verhältnis ihrer Beteiligung.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung oder, soweit dispositiv, eine wirksame Regelung, die dem Zweck am nächsten kommt.
(3) Nebenabreden zwischen den Gesellschaftern bedürfen der Schriftform, soweit nicht das Gesetz die notarielle Form verlangt.
(4) Gerichtsstand für Streitigkeiten aus diesem Vertrag ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt deutsches Recht.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gesellschafter


______________________________
[Vorname Nachname], Gesellschafter

(Notarielle Beurkundung erforderlich, § 2 GmbHG)

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "gmbh-gesellschaftsvertrag",
    titel: "GmbH-Gesellschaftsvertrag",
    kurz: "Vollständige GmbH-Satzung mit 25.000 EUR Stammkapital, Gesellschafterversammlung, Vinkulierung, Vorkaufsrecht, Einziehung und Abfindung als Entwurf für den Notar.",
    kategorie: "gesellschaft",
    dateiname: "GmbH-Gesellschaftsvertrag",
    wofuer: [
      "Gründung einer GmbH mit zwei oder mehr Gesellschaftern und individuellen Regeln",
      "Umwandlung einer UG in eine GmbH, wenn das Stammkapital auf 25.000 EUR erhöht wird",
      "Wenn Gründer Vinkulierung, Vorkaufsrecht und Einziehung schon in der Satzung verankern wollen",
      "Als Vorbereitung für den Notartermin, damit die Beurkundung nur noch Feinschliff braucht",
    ],
    enthaelt: [
      "§ 1 Firma, Sitz, Dauer, Geschäftsjahr",
      "§ 2 Gegenstand des Unternehmens",
      "§ 3 Stammkapital und Geschäftsanteile",
      "§ 4 Geschäftsführung und Vertretung",
      "§ 5 Zustimmungspflichtige Geschäfte",
      "§ 6 Gesellschafterversammlung",
      "§ 7 Gesellschafterbeschlüsse",
      "§ 8 Jahresabschluss und Gewinnverwendung",
      "§ 9 Verfügung über Geschäftsanteile, Vorkaufsrecht",
      "§ 10 Einziehung und Zwangsabtretung",
      "§ 11 Abfindung",
      "§ 12 Wettbewerbsverbot, Bekanntmachungen, Schlussbestimmungen",
    ],
    hinweise: [
      "Der GmbH-Vertrag muss notariell beurkundet werden (§ 2 GmbHG). Jede spätere Satzungsänderung ebenfalls, mit Dreiviertelmehrheit (§ 53 GmbHG). Diese Vorlage ist der Entwurf für den Notar.",
      "Vor der Anmeldung zum Handelsregister muss auf jeden Geschäftsanteil mindestens ein Viertel, insgesamt aber mindestens 12.500 EUR eingezahlt sein (§ 7 Abs. 2 GmbHG). Der Rest bleibt als offene Einlageforderung bestehen und wird in der Insolvenz vom Verwalter eingefordert.",
      "Die Gesellschafterliste (§ 40 GmbHG) und das Transparenzregister müssen nach jedem Anteilswechsel aktualisiert werden. Nur wer in der Liste steht, gilt gegenüber der Gesellschaft als Gesellschafter (§ 16 GmbHG).",
      "Die Abfindung bei Einziehung darf nicht aus dem Stammkapital bezahlt werden (§§ 30, 34 GmbHG). Zu niedrige Abfindungsklauseln (z. B. starrer Buchwert) hält die Rechtsprechung für sittenwidrig, wenn sie grob vom Verkehrswert abweichen.",
    ],
    faqs: [
      {
        q: "Reichen 12.500 EUR zur Gründung einer GmbH?",
        a: "Zur Anmeldung ja: Es muss mindestens die Hälfte des Mindeststammkapitals eingezahlt sein. Die restlichen 12.500 EUR schulden die Gesellschafter aber weiterhin und müssen sie auf Anforderung einzahlen. In der Insolvenz fordert der Verwalter den offenen Betrag ein, auch viele Jahre später.",
      },
      {
        q: "Was ist der Unterschied zwischen Vinkulierung und Vorkaufsrecht?",
        a: "Die Vinkulierung macht jede Abtretung von der Zustimmung der Gesellschafter abhängig; ohne Zustimmung ist die Übertragung unwirksam. Das Vorkaufsrecht gibt den Mitgesellschaftern zusätzlich das Recht, den Anteil selbst zu den Bedingungen des Dritten zu erwerben. Beides zusammen schützt am besten vor fremden Mitgesellschaftern.",
      },
      {
        q: "Wie wird die Abfindung eines ausscheidenden Gesellschafters berechnet?",
        a: "Die Vorlage knüpft am Verkehrswert nach dem vereinfachten Ertragswertverfahren an und erlaubt einen Abschlag bei Ausscheiden aus wichtigem Grund. Eine Ratenzahlung schützt die Liquidität der Gesellschaft. Ganz ausschließen darf man die Abfindung nicht, und sie darf nicht aus dem gebundenen Stammkapital gezahlt werden.",
      },
      {
        q: "Was muss in der Satzung zwingend stehen?",
        a: "Nach § 3 GmbHG mindestens Firma, Sitz, Unternehmensgegenstand, Höhe des Stammkapitals sowie Zahl und Nennbeträge der von jedem Gesellschafter übernommenen Geschäftsanteile. Alles andere (Vinkulierung, Einziehung, Abfindung, Wettbewerbsverbot) ist freiwillig, aber genau das, was bei Streit entscheidet.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann brauchst du diese GmbH-Satzung als Vorlage?",
        text: `Eine GmbH-Gründung läuft immer über den Notar, und der arbeitet gern mit seinem Standardtext. Der passt für eine Einpersonen-GmbH, aber nicht für ein Team, das Anteile schützen, Investoren vorbereiten oder eine Trennung geordnet regeln will. Diese Vorlage ist für genau diese Fälle gedacht: zwei oder mehr Gesellschafter, individuelle Beteiligungsquoten, Vinkulierung, Vorkaufsrecht, Einziehung und Abfindung.

Auch bei der Umwandlung einer UG in eine GmbH brauchst du eine neue Satzung, weil Firma, Stammkapital und die Rücklagenregel wegfallen. Und wenn ein Gründer sein Einzelunternehmen einbringen will, braucht die Satzung die Sacheinlage-Variante, die das Muster in § 3 vorsieht. Nimm die Vorlage als Entwurf mit zum Notar: Er beurkundet, du sparst die Besprechungszeit, in der sonst jede Klausel von Grund auf diskutiert wird.`,
      },
      {
        titel: "Was muss in einen GmbH-Gesellschaftsvertrag?",
        text: `Das Gesetz verlangt in § 3 GmbHG nur fünf Angaben: Firma, Sitz, Unternehmensgegenstand, Stammkapital sowie Zahl und Nennbeträge der Geschäftsanteile jedes Gesellschafters. Jede gute Satzung geht deutlich darüber hinaus. Die Vorlage enthält:

- Firma, Sitz, Dauer und Geschäftsjahr (§ 1) sowie den Unternehmensgegenstand (§ 2)
- Stammkapital von 25.000 EUR, Stückelung in 25.000 Anteile, Einzahlungsregel und optional die Sacheinlage (§ 3)
- Geschäftsführung, Vertretung, Befreiung von § 181 BGB (§ 4) und den Katalog zustimmungspflichtiger Geschäfte (§ 5)
- Gesellschafterversammlung mit Einberufung in Textform, Quorum, Vertretung und Vorsitz (§ 6)
- Beschlüsse, Stimmrecht je Euro, Dreiviertelmehrheiten und Umlaufverfahren (§ 7)
- Jahresabschluss, Gewinnverwendung und Vorabausschüttungen (§ 8)
- Vinkulierung, Vorkaufsrecht und Pflicht zur aktuellen Gesellschafterliste (§ 9)
- Einziehung und Zwangsabtretung mit den sechs Einziehungsgründen (§ 10)
- Abfindung zum Verkehrswert mit Abschlag, Ratenzahlung und Schiedsgutachter (§ 11)
- Wettbewerbsverbot, Bekanntmachungen, Gründungskosten, Gerichtsstand (§ 12)

Die §§ 9 bis 11 sind das Herzstück für Gründerteams: Sie entscheiden, wer Mitgesellschafter werden kann und was eine Trennung kostet.`,
      },
      {
        titel: "GmbH-Satzung Muster ausfüllen: so gehst du vor",
        text: `Die Platzhalter in eckigen Klammern führen dich durch den Text:

- Gesellschafter mit vollständigen Daten; bei einer Gesellschaft als Gesellschafterin Firma und Handelsregisternummer.
- § 1: Firma mit dem Zusatz GmbH, Sitz und das Ende des ersten Rumpfgeschäftsjahres.
- § 2: Gegenstand so konkret, dass das Registergericht ihn akzeptiert, und so weit, dass ihr nicht bei jedem neuen Produkt zum Notar müsst.
- § 3: Anteilsnummern und Gesamtnennbetrag je Gesellschafter; die Summe muss 25.000 EUR ergeben. Wähle, ob die Hälfte oder der volle Nennbetrag vor der Anmeldung eingezahlt wird. Die Sacheinlage-Variante nur verwenden, wenn wirklich etwas eingebracht wird, sonst löschen.
- § 5: Schwellenwerte für Investitionen, Kredite, Vertragslaufzeiten und Gehälter.
- § 6: Frist für die ordentliche Versammlung und das Quorum.
- § 9 Abs. 2: Ausübungsfrist für das Vorkaufsrecht.
- § 11: Abschlag bei Einziehung aus wichtigem Grund und Anzahl der Halbjahresraten.
- § 12: bestehende erlaubte Tätigkeiten und den Gründungsaufwand, den die Gesellschaft trägt.

Lade das Muster als Word-Datei, fülle es aus und schicke es dem Notar vorab. Unterschrieben wird im Beurkundungstermin, die Vorlage selbst trägt deshalb bewusst den Hinweis auf § 2 GmbHG.`,
      },
      {
        titel: "Typische Fehler bei der GmbH-Gründung und wie du sie vermeidest",
        text: `Der teuerste Fehler ist eine Abfindungsklausel, die später kippt: Ein starrer Buchwert oder ein Ausschluss der Abfindung ist nach ständiger Rechtsprechung unwirksam, wenn er grob vom Verkehrswert abweicht. Die Vorlage knüpft deshalb an den Ertragswert an und erlaubt nur einen Abschlag.

Zweiter Fehler: die zweite Hälfte des Stammkapitals vergessen. Wer nur 12.500 EUR einzahlt, schuldet den Rest weiter, und der Insolvenzverwalter fordert ihn Jahre später ein. Dritter Fehler: Gründungskosten über den in der Satzung bezifferten Betrag hinaus von der Gesellschaft zahlen lassen; das ist eine verbotene Rückzahlung von Stammkapital.

Weitere Klassiker: Der Gesellschafter-Geschäftsführer wird nicht von § 181 BGB befreit und kann seinen eigenen Anstellungsvertrag nicht unterschreiben. Die Gesellschafterliste wird nach einem Anteilsverkauf nicht aktualisiert, sodass der neue Gesellschafter seine Rechte nicht ausüben kann (§ 16 GmbHG). Und die Transparenzregister-Meldung bleibt liegen, obwohl sie seit 2021 für jede GmbH Pflicht ist. Lege nach der Eintragung eine Checkliste an: Gesellschafterliste, Transparenzregister, Gewerbeanmeldung, steuerlicher Erfassungsbogen, Geschäftsführervertrag per Gesellschafterbeschluss.`,
      },
      {
        titel: "Rechtliche Grundlagen: GmbHG, Notar und Handelsregister",
        text: `Die GmbH entsteht in drei Schritten: Beurkundung des Gesellschaftsvertrags beim Notar (§ 2 GmbHG), Einzahlung der Einlagen auf ein Konto der Vorgesellschaft und Eintragung ins Handelsregister (§ 11 GmbHG). Erst mit der Eintragung ist die Haftung auf das Gesellschaftsvermögen beschränkt; wer vorher handelt, haftet persönlich.

Das Mindeststammkapital beträgt 25.000 EUR, vor der Anmeldung müssen auf jeden Anteil ein Viertel und insgesamt mindestens 12.500 EUR eingezahlt sein (§ 7 Abs. 2 GmbHG). Sacheinlagen brauchen einen Sachgründungsbericht und müssen vor der Anmeldung vollständig geleistet sein. Satzungsänderungen erfordern eine Dreiviertelmehrheit und notarielle Beurkundung (§ 53 GmbHG), Anteilsübertragungen ebenfalls den Notar (§ 15 GmbHG).

Die Vinkulierung stützt sich auf § 15 Abs. 5 GmbHG, die Einziehung auf § 34 GmbHG, und die Abfindung darf nie aus dem zur Erhaltung des Stammkapitals nötigen Vermögen gezahlt werden (§ 30 GmbHG). Seit 2022 ist die Online-Gründung per Videokonferenz mit dem Notar möglich, für Bargründungen und seit 2023 auch für bestimmte Sachgründungen. Nach der Eintragung folgen die Meldung an das Transparenzregister, die Gewerbeanmeldung und der Fragebogen zur steuerlichen Erfassung.`,
      },
      {
        titel: "Wann die GmbH-Vorlage allein nicht reicht",
        text: `Notar und Handelsregister sind bei der GmbH ohnehin gesetzt. Zusätzliche Beratung solltest du einplanen, wenn

- ein Einzelunternehmen oder eine GbR eingebracht werden soll; das ist steuerlich eine Einbringung nach dem Umwandlungssteuergesetz und braucht Steuerberater und Einbringungsbilanz,
- Investoren beteiligt werden und Liquidationspräferenzen, Mitverkaufsrechte oder Verwässerungsschutz vereinbart werden sollen; das gehört in eine Gesellschaftervereinbarung, nicht in die öffentliche Satzung,
- Mitarbeiter über ein Beteiligungsprogramm Anteile oder virtuelle Anteile erhalten sollen,
- Ehepartner oder Erben eine Rolle spielen und die Nachfolge gesichert werden muss,
- eine Holding-Struktur mit mehreren Gesellschaften geplant ist.

Diese Vorlage bildet eine solide Standardsatzung ab und ist vom Notar prüfbar. GründerX ist Software und bietet keine Rechtsberatung; die Satzung entfaltet ihre Wirkung erst mit der Beurkundung, und die Feinabstimmung mit Gesellschaftervereinbarung und Geschäftsführervertrag gehört in die Hände eines Anwalts für Gesellschaftsrecht.`,
      },
    ],
    seo: {
      title: "GmbH-Gesellschaftsvertrag Muster kostenlos | GründerX",
      description:
        "GmbH-Satzung als kostenlose Vorlage: Stammkapital 25.000 EUR, Gesellschafterversammlung, Vinkulierung, Einziehung, Abfindung. Entwurf für den Notartermin.",
    },
    stand: "2026-10",
    text: `Gesellschaftsvertrag der [Name] GmbH

Gesellschafter:

1. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
2. [Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
[3. ggf. weitere Gesellschafter oder Gesellschaften mit Handelsregisternummer]

§ 1 Firma, Sitz, Dauer, Geschäftsjahr
(1) Die Firma der Gesellschaft lautet: [Name] GmbH.
(2) Die Gesellschaft hat ihren Sitz in [Ort].
(3) Die Gesellschaft ist auf unbestimmte Zeit errichtet.
(4) Geschäftsjahr ist das Kalenderjahr. Das erste Geschäftsjahr beginnt mit der Eintragung in das Handelsregister und endet am 31.12.[Jahr].

§ 2 Gegenstand des Unternehmens
(1) Gegenstand des Unternehmens ist [genaue Beschreibung, z. B. „der Handel mit Haushaltswaren über das Internet sowie die Erbringung von Logistik- und Marketingdienstleistungen für Dritte“].
(2) Die Gesellschaft ist zu allen Geschäften und Maßnahmen berechtigt, die dem Gegenstand des Unternehmens dienen. Sie kann Zweigniederlassungen errichten, andere Unternehmen gründen, erwerben oder sich an ihnen beteiligen.

§ 3 Stammkapital und Geschäftsanteile
(1) Das Stammkapital der Gesellschaft beträgt 25.000,00 EUR.
(2) Es ist eingeteilt in 25.000 Geschäftsanteile mit einem Nennbetrag von je 1,00 EUR. Hiervon übernehmen:
   a) [Vorname Nachname] [Anzahl] Geschäftsanteile (Nr. 1 bis [Nr.]) im Gesamtnennbetrag von [Betrag] EUR,
   b) [Vorname Nachname] [Anzahl] Geschäftsanteile (Nr. [Nr.] bis 25.000) im Gesamtnennbetrag von [Betrag] EUR.
(3) Die Einlagen sind in Geld zu leisten. Auf jeden Geschäftsanteil ist vor der Anmeldung [die Hälfte / der volle Nennbetrag] einzuzahlen, insgesamt mindestens 12.500,00 EUR. Der Rest ist auf Anforderung der Geschäftsführung nach Gesellschafterbeschluss einzuzahlen.
[Alternative bei Sacheinlage: (3) Der Gesellschafter [Name] leistet seine Einlage auf die Geschäftsanteile Nr. [Nr.] bis [Nr.] durch Einbringung von [Gegenstand, z. B. „dem Einzelunternehmen [Name] mit allen Aktiva und Passiva laut Einbringungsbilanz zum [Datum]“]. Ein etwaiger Mehrwert wird der Kapitalrücklage gutgeschrieben.]

§ 4 Geschäftsführung und Vertretung
(1) Die Gesellschaft hat einen oder mehrere Geschäftsführer, die von der Gesellschafterversammlung bestellt und abberufen werden.
(2) Ist nur ein Geschäftsführer bestellt, vertritt er die Gesellschaft allein. Sind mehrere Geschäftsführer bestellt, vertreten je zwei gemeinsam oder einer gemeinsam mit einem Prokuristen.
(3) Die Gesellschafterversammlung kann allen oder einzelnen Geschäftsführern Einzelvertretungsbefugnis erteilen und sie von den Beschränkungen des § 181 BGB befreien. Gleiches gilt für Liquidatoren.
(4) Die Geschäftsführer sind an die Weisungen der Gesellschafterversammlung und an eine von dieser erlassene Geschäftsordnung gebunden.

§ 5 Zustimmungspflichtige Geschäfte
Die Geschäftsführer bedürfen für folgende Geschäfte der vorherigen Zustimmung der Gesellschafterversammlung:
   a) Erwerb, Veräußerung und Belastung von Grundstücken und grundstücksgleichen Rechten,
   b) Erwerb, Veräußerung und Aufgabe von Beteiligungen und Betrieben,
   c) Investitionen über [Betrag] EUR im Einzelfall oder über [Betrag] EUR im Geschäftsjahr,
   d) Aufnahme von Krediten und Übernahme von Bürgschaften, Garantien und Sicherheiten über [Betrag] EUR,
   e) Gewährung von Darlehen außerhalb des gewöhnlichen Geschäftsbetriebs,
   f) Abschluss, Änderung und Beendigung von Verträgen mit einer Laufzeit über [z. B. 2] Jahre oder einer Jahresbelastung über [Betrag] EUR,
   g) Abschluss von Anstellungsverträgen mit einem Jahresgehalt über [Betrag] EUR, Erteilung von Prokura und Generalvollmacht,
   h) Geschäfte zwischen der Gesellschaft und Gesellschaftern, Geschäftsführern oder deren Angehörigen,
   i) Aufnahme neuer Geschäftszweige und Einstellung bestehender.

§ 6 Gesellschafterversammlung
(1) Die ordentliche Gesellschafterversammlung findet jährlich innerhalb von [z. B. 8] Monaten nach Ende des Geschäftsjahres am Sitz der Gesellschaft statt. Außerordentliche Versammlungen sind einzuberufen, wenn das Interesse der Gesellschaft es erfordert oder Gesellschafter mit mindestens 10 % des Stammkapitals dies unter Angabe des Zwecks verlangen (§ 50 GmbHG).
(2) Die Einberufung erfolgt durch die Geschäftsführung in Textform (Brief oder E-Mail an die zuletzt mitgeteilte Adresse) mit einer Frist von mindestens zwei Wochen unter Mitteilung von Ort, Zeit und Tagesordnung. Für die Fristberechnung werden der Tag der Absendung und der Tag der Versammlung nicht mitgezählt.
(3) Versammlungen können mit Einverständnis aller Gesellschafter per Video- oder Telefonkonferenz abgehalten werden. Ohne Einhaltung von Form und Frist können Beschlüsse gefasst werden, wenn alle Gesellschafter anwesend oder vertreten sind und kein Gesellschafter widerspricht.
(4) Die Versammlung ist beschlussfähig, wenn mindestens [z. B. 75] % des Stammkapitals anwesend oder vertreten sind. Andernfalls ist innerhalb von zwei Wochen eine zweite Versammlung mit gleicher Tagesordnung einzuberufen, die unabhängig vom vertretenen Kapital beschlussfähig ist; darauf ist in der Einladung hinzuweisen.
(5) Jeder Gesellschafter kann sich durch einen anderen Gesellschafter, einen Rechtsanwalt, Steuerberater oder Wirtschaftsprüfer mit schriftlicher Vollmacht vertreten lassen.
(6) Den Vorsitz führt der Gesellschafter mit der höchsten Beteiligung, bei Gleichstand der an Jahren älteste, sofern die Versammlung nichts anderes beschließt. Über die Versammlung ist eine Niederschrift anzufertigen, die der Vorsitzende unterzeichnet und die allen Gesellschaftern innerhalb von zwei Wochen zu übersenden ist.

§ 7 Gesellschafterbeschlüsse
(1) Je 1,00 EUR eines Geschäftsanteils gewährt eine Stimme.
(2) Beschlüsse werden mit einfacher Mehrheit der abgegebenen Stimmen gefasst, soweit Gesetz oder Satzung nicht eine größere Mehrheit vorschreiben. Stimmenthaltungen gelten als nicht abgegeben.
(3) Einer Mehrheit von drei Vierteln der abgegebenen Stimmen bedürfen: Änderungen der Satzung, Kapitalerhöhung und -herabsetzung, Auflösung, Umwandlung, Zustimmung zur Abtretung von Geschäftsanteilen, Einziehung, Abschluss von Unternehmensverträgen und Befreiung vom Wettbewerbsverbot.
(4) Beschlüsse können auch außerhalb einer Versammlung schriftlich, per E-Mail oder in anderer Textform gefasst werden, wenn alle Gesellschafter sich mit dieser Form einverstanden erklären oder sich an der Abstimmung beteiligen (§ 48 Abs. 2 GmbHG).
(5) Beschlüsse können nur innerhalb eines Monats nach Zugang der Niederschrift durch Klage gegen die Gesellschaft angefochten werden.

§ 8 Jahresabschluss und Gewinnverwendung
(1) Die Geschäftsführer stellen den Jahresabschluss und, soweit gesetzlich erforderlich, den Lagebericht innerhalb der gesetzlichen Fristen auf und legen ihn der Gesellschafterversammlung mit einem Vorschlag zur Ergebnisverwendung vor.
(2) Die Gesellschafter beschließen innerhalb der Frist des § 42a GmbHG über die Feststellung des Jahresabschlusses und die Verwendung des Ergebnisses. Sie können den Gewinn ganz oder teilweise in Gewinnrücklagen einstellen oder auf neue Rechnung vortragen.
(3) Der auszuschüttende Gewinn wird im Verhältnis der Geschäftsanteile verteilt. Vorabausschüttungen auf den erwarteten Gewinn sind durch Beschluss zulässig, wenn ein Zwischenabschluss einen entsprechenden Gewinn ausweist.

§ 9 Verfügung über Geschäftsanteile, Vorkaufsrecht
(1) Die Abtretung und Verpfändung von Geschäftsanteilen oder Teilen davon sowie die Bestellung eines Nießbrauchs bedürfen zu ihrer Wirksamkeit der Zustimmung der Gesellschafterversammlung mit drei Vierteln der abgegebenen Stimmen; der veräußernde Gesellschafter ist stimmberechtigt. Übertragungen auf Mitgesellschafter sind zustimmungsfrei.
(2) Den übrigen Gesellschaftern steht im Verhältnis ihrer Beteiligung ein Vorkaufsrecht zu. Der Veräußerer hat ihnen den mit dem Dritten geschlossenen Vertrag unverzüglich in Kopie zu übermitteln. Das Vorkaufsrecht kann innerhalb von [z. B. 6] Wochen nach Zugang durch schriftliche Erklärung ausgeübt werden. Üben nicht alle Berechtigten aus, wächst das Recht den Ausübenden anteilig zu.
(3) Wird das Vorkaufsrecht nicht ausgeübt, gilt die Zustimmung nach Absatz 1 als erteilt, wenn der Dritte diesem Gesellschaftsvertrag und bestehenden Gesellschaftervereinbarungen schriftlich beitritt.
(4) Die Geschäftsführer reichen nach jeder Veränderung unverzüglich eine aktualisierte Gesellschafterliste zum Handelsregister ein (§ 40 GmbHG).

§ 10 Einziehung und Zwangsabtretung
(1) Die Einziehung von Geschäftsanteilen ist mit Zustimmung des betroffenen Gesellschafters jederzeit zulässig.
(2) Ohne Zustimmung kann die Gesellschafterversammlung die Einziehung beschließen, wenn
   a) über das Vermögen des Gesellschafters das Insolvenzverfahren eröffnet oder mangels Masse abgelehnt wird,
   b) in den Geschäftsanteil die Zwangsvollstreckung betrieben wird und die Maßnahme nicht innerhalb von drei Monaten aufgehoben wird,
   c) in der Person des Gesellschafters ein wichtiger Grund vorliegt, insbesondere eine grobe Verletzung der Gesellschafterpflichten oder ein Verstoß gegen das Wettbewerbsverbot,
   d) der Gesellschafter seine Beteiligung kündigt,
   e) der Gesellschafter verstirbt und der Anteil auf Personen übergeht, die nicht Mitgesellschafter oder Abkömmlinge sind,
   f) eine Vesting- oder Gesellschaftervereinbarung dies vorsieht.
(3) Der Beschluss bedarf einer Mehrheit von drei Vierteln der abgegebenen Stimmen; der Betroffene hat kein Stimmrecht. Statt der Einziehung kann die Gesellschafterversammlung verlangen, dass der Anteil an die Gesellschaft, einen Mitgesellschafter oder einen von ihr benannten Dritten abgetreten wird.
(4) Die Einziehung wird mit Zugang des Beschlusses beim Betroffenen wirksam, unabhängig von der Zahlung der Abfindung. Die übrigen Gesellschafter haften anteilig für die Abfindung, wenn die Gesellschaft sie aus freiem Vermögen nicht zahlen kann.

§ 11 Abfindung
(1) Der ausscheidende Gesellschafter erhält eine Abfindung in Höhe des Verkehrswerts seines Geschäftsanteils zum Stichtag des Ausscheidens, ermittelt nach dem vereinfachten Ertragswertverfahren (§§ 199 ff. BewG), sofern sich die Beteiligten nicht innerhalb von zwei Monaten auf einen Wert einigen.
(2) In den Fällen des § 10 Abs. 2 lit. a bis c beträgt die Abfindung [z. B. 70] % des Werts nach Absatz 1.
(3) Die Abfindung ist in [z. B. 4] gleichen Halbjahresraten zu zahlen; die erste Rate wird sechs Monate nach dem Stichtag fällig. Der offene Betrag wird mit 2 Prozentpunkten über dem Basiszinssatz verzinst. Die Gesellschaft darf jederzeit vorzeitig zahlen.
(4) Bei Streit über die Höhe entscheidet ein von der Industrie- und Handelskammer [Ort] benannter Wirtschaftsprüfer als Schiedsgutachter verbindlich. Die Kosten tragen Gesellschaft und Ausscheidender je zur Hälfte.

§ 12 Wettbewerbsverbot, Bekanntmachungen, Schlussbestimmungen
(1) Die Gesellschafter dürfen während ihrer Zugehörigkeit im Geschäftsbereich der Gesellschaft weder für eigene noch für fremde Rechnung tätig sein noch sich an Wettbewerbern beteiligen. Die Gesellschafterversammlung kann durch Beschluss Befreiung erteilen; Bestehendes: [z. B. „keine“].
(2) Bekanntmachungen der Gesellschaft erfolgen ausschließlich im Bundesanzeiger.
(3) Die Gesellschaft trägt die Gründungskosten (Notar, Gericht, Veröffentlichung, Beratung) bis zu einem Betrag von [Betrag, z. B. 2.500] EUR.
(4) Sollte eine Bestimmung dieser Satzung unwirksam sein oder werden, bleibt die Satzung im Übrigen wirksam. Die Gesellschafter sind verpflichtet, die unwirksame Bestimmung durch eine wirksame zu ersetzen, die dem gewollten Zweck am nächsten kommt.
(5) Gerichtsstand ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt das Recht der Bundesrepublik Deutschland.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gesellschafter


______________________________
[Vorname Nachname], Gesellschafter

(Notarielle Beurkundung erforderlich, § 2 GmbHG)

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "gruendervereinbarung",
    titel: "Gründervereinbarung (Founders' Agreement)",
    kurz: "Vorgründungsvereinbarung für Gründerteams vor dem Notartermin: Rollen, Beteiligung, Vesting-Verweis, IP-Übertragung, Kosten und was gilt, wenn die Gründung scheitert.",
    kategorie: "gesellschaft",
    dateiname: "Gruendervereinbarung",
    wofuer: [
      "Zwei oder mehr Gründer arbeiten schon am Produkt, die UG oder GmbH ist aber noch nicht gegründet",
      "Bevor Code, Marke oder Kundenkontakte entstehen, soll klar sein, wem sie gehören",
      "Als Grundlage für die spätere Satzung und Vesting-Vereinbarung beim Notar",
      "Wenn ein Gründer vor der Gründung abspringt und die Beteiligung geregelt werden muss",
    ],
    enthaelt: [
      "§ 1 Vorhaben und Ziel",
      "§ 2 Rollen und Aufgaben der Gründer",
      "§ 3 Zeiteinsatz und Vergütung",
      "§ 4 Beteiligung an der künftigen Gesellschaft",
      "§ 5 Vesting (Verweis)",
      "§ 6 Geistiges Eigentum und Arbeitsergebnisse",
      "§ 7 Kosten und Auslagen",
      "§ 8 Entscheidungen bis zur Gründung",
      "§ 9 Vertraulichkeit und Wettbewerb",
      "§ 10 Ausscheiden und Scheitern der Gründung",
      "§ 11 Laufzeit und Schlussbestimmungen",
    ],
    hinweise: [
      "Sobald mehrere Gründer gemeinsam auf ein Ziel hinarbeiten, bilden sie rechtlich bereits eine GbR (Vorgründungsgesellschaft) und haften persönlich. Die Vereinbarung regelt das Innenverhältnis; nach außen schützt erst die eingetragene UG/GmbH.",
      "Eine verbindliche Pflicht, die GmbH zu gründen (Vorvertrag), müsste notariell beurkundet werden. Die Vorlage formuliert deshalb eine Absicht mit Regeln für den Fall des Scheiterns, keine einklagbare Gründungspflicht.",
      "Die IP-Übertragung wirkt nur, wenn sie konkret ist: Code, Designs, Marken, Domains, Kundenlisten. Bei Urheberrechten ist nur die Einräumung von Nutzungsrechten möglich, nicht die Übertragung des Urheberrechts selbst (§ 29 UrhG).",
      "Wer schon Geld in das Vorhaben steckt, sollte die Kosten als Darlehen oder spätere Einlage dokumentieren, sonst sind sie bei Streit verloren.",
    ],
    faqs: [
      {
        q: "Warum reicht nicht einfach der Gesellschaftsvertrag beim Notar?",
        a: "Weil zwischen Idee und Notartermin oft Monate liegen, in denen Code, Design und Kunden entstehen. Ohne Vereinbarung gehören diese Ergebnisse dem jeweiligen Gründer, und ein Streit über Anteile kann das Vorhaben vor der Gründung beenden. Die Vereinbarung hält die Eckpunkte fest, die später in die Satzung übergehen.",
      },
      {
        q: "Was passiert, wenn ein Mitgründer vor der Gründung aussteigt?",
        a: "Nach der Vorlage verliert er seinen Anspruch auf die Beteiligung, überlässt seine Arbeitsergebnisse den verbleibenden Gründern und erhält seine nachgewiesenen Auslagen erstattet. Ob darüber hinaus eine Vergütung gezahlt wird, legt ihr in § 10 fest.",
      },
      {
        q: "Ist die Gründervereinbarung formfrei gültig?",
        a: "Ja, solange sie keine Verpflichtung zur Gründung einer GmbH oder zur Übertragung von GmbH-Anteilen enthält; diese wären beurkundungspflichtig. Schriftform ist trotzdem Pflicht, weil die Vereinbarung sonst im Streitfall nicht beweisbar ist.",
      },
      {
        q: "Wie sollten wir die Anteile verteilen?",
        a: "Gleiche Anteile sind einfach, aber nur fair, wenn Einsatz und Risiko gleich sind. Wer Vollzeit arbeitet, Kapital einbringt oder die Kerntechnologie liefert, sollte mehr erhalten. Wichtiger als die exakte Zahl ist das Vesting: Es sorgt dafür, dass Anteile nur bleiben, wenn der Gründer auch bleibt.",
      },
    ],
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
    seo: {
      title: "Gründervereinbarung Vorlage kostenlos (Word) | GründerX",
      description:
        "Kostenlose Gründervereinbarung für Start-up-Teams vor der Gründung: Rollen, Anteile, Vesting, IP-Übertragung, Kosten und Ausstieg. Als Word, PDF oder Text.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "vesting-vereinbarung",
    titel: "Vesting-Vereinbarung für Gründeranteile",
    kurz: "Vesting-Vereinbarung für GmbH- oder UG-Gründer: 12 Monate Cliff, 48 Monate linear, Good und Bad Leaver, Call-Option, Abfindung und Beschleunigung beim Exit.",
    kategorie: "gesellschaft",
    dateiname: "Vesting-Vereinbarung",
    wofuer: [
      "Gründerteams, die sicherstellen wollen, dass Anteile nur bleiben, wenn der Gründer auch bleibt",
      "Vor der ersten Finanzierungsrunde, weil Investoren Vesting regelmäßig verlangen",
      "Wenn ein Mitgründer in Teilzeit einsteigt oder später dazukommt",
      "Als Ergänzung zur Satzung mit Einziehungs- und Abtretungsklausel",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Vesting-Anteile",
      "§ 2 Vesting-Zeitraum, Cliff und Vesting-Plan",
      "§ 3 Leaver-Ereignis",
      "§ 4 Good Leaver und Bad Leaver",
      "§ 5 Call-Option und Abtretungsverpflichtung",
      "§ 6 Abfindung je Leaver-Fall",
      "§ 7 Beschleunigung bei Exit (Accelerated Vesting)",
      "§ 8 Verfügungsbeschränkungen",
      "§ 9 Durchführung und Vollmacht",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "Die Vereinbarung enthält die Verpflichtung, GmbH-Anteile abzutreten, und muss deshalb notariell beurkundet werden (§ 15 Abs. 4 GmbHG). Alternativ nehmt ihr die Einziehungsgründe direkt in die Satzung auf; die Vorlage ist dafür vorbereitet.",
      "Vesting betrifft nur das Innenverhältnis der Gesellschafter. Nach außen bleibt der Gründer bis zur Abtretung oder Einziehung Gesellschafter mit allen Rechten; die Gesellschafterliste ist danach zu aktualisieren.",
      "Ein zu niedriger Abfindungswert für Good Leaver kann als sittenwidrig angegriffen werden. Die Vorlage sieht deshalb für gevestete Anteile den Verkehrswert vor und begrenzt nur den Bad-Leaver-Fall.",
      "Steuerlich kann der Erwerb von Anteilen zum Nennwert bei bereits wertvoller Gesellschaft als geldwerter Vorteil gelten. Vor der Unterzeichnung mit dem Steuerberater klären, ob § 19a EStG oder eine Bewertung nötig ist.",
    ],
    faqs: [
      {
        q: "Was bedeutet Cliff und was passiert davor?",
        a: "Der Cliff ist eine Wartezeit, in der noch kein Anteil als verdient gilt. Scheidet ein Gründer innerhalb der ersten 12 Monate aus, verliert er nach der Vorlage alle Vesting-Anteile zum Nennwert. Nach dem Cliff gelten 25 % auf einen Schlag als gevestet, danach monatlich 1/48.",
      },
      {
        q: "Was ist der Unterschied zwischen Good Leaver und Bad Leaver?",
        a: "Ein Good Leaver geht ohne eigenes Verschulden, etwa durch Kündigung der Gesellschaft ohne wichtigen Grund, Krankheit oder Tod. Er behält die gevesteten Anteile oder erhält dafür den Verkehrswert. Ein Bad Leaver kündigt selbst, wird aus wichtigem Grund abberufen oder verletzt Wettbewerbsverbote; er verliert auch gevestete Anteile zu einem reduzierten Wert.",
      },
      {
        q: "Müssen wir die Vesting-Vereinbarung beim Notar unterschreiben?",
        a: "Ja, wenn sie wie diese Vorlage eine Pflicht zur Abtretung von GmbH-Anteilen enthält. Viele Gründer verbinden sie deshalb direkt mit dem Gründungstermin. Ohne Beurkundung ist die Abtretungspflicht unwirksam, und nur eine Einziehung über die Satzung bleibt möglich.",
      },
      {
        q: "Verlangen Investoren ein neues Vesting?",
        a: "Oft ja. Investoren lassen häufig einen Teil der bereits gevesteten Anteile erneut vesten (Re-Vesting), damit die Gründer nach der Runde gebunden bleiben. Mit einer bestehenden, marktüblichen Vereinbarung habt ihr eine bessere Verhandlungsposition als ohne.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann brauchst du eine Vesting-Vereinbarung?",
        text: `Vesting beantwortet eine Frage, die jedes Gründerteam irgendwann trifft: Was passiert mit den Anteilen, wenn ein Gründer nach acht Monaten geht? Ohne Vereinbarung behält er seine 33 Prozent für immer, während die anderen jahrelang weiterarbeiten. Mit Vesting verdient sich jeder Gründer seine Anteile über die Zeit.

Du brauchst die Vereinbarung spätestens bei der Gründung der UG oder GmbH, am besten im selben Notartermin. Sie ist Pflicht, wenn ihr eine Finanzierungsrunde plant, weil Business Angels und VCs Vesting regelmäßig voraussetzen und sonst ein Re-Vesting zu ihren Bedingungen verlangen. Sinnvoll ist sie auch, wenn ein Mitgründer in Teilzeit einsteigt, später dazukommt oder wenn ein Gründer deutlich mehr Anteile hält, als sein laufender Beitrag rechtfertigt. Diese Vorlage ergänzt die Satzung mit Einziehungs- und Abtretungsklausel und regelt das Innenverhältnis der Gesellschafter.`,
      },
      {
        titel: "Was muss in eine Vesting-Vereinbarung für Gründer?",
        text: `Eine Vesting-Klausel ist nur so gut wie ihre Definitionen. Die Vorlage regelt in zehn Paragraphen alle Bausteine, die in der Praxis streitentscheidend sind:

- welche Anteile dem Vesting unterliegen, alle oder nur ein Teil (§ 1)
- Vesting-Zeitraum von 48 Monaten, Cliff von 12 Monaten, monatliche Tranchen danach und Unterbrechungsregeln für Krankheit und Elternzeit (§ 2)
- Leaver-Ereignisse: Kündigung, Abberufung, Tod, Insolvenz, schwere Pflichtverletzung (§ 3)
- Unterscheidung Good Leaver und Bad Leaver (§ 4)
- Call-Option mit Ausübungsfrist, notarieller Ausübung und Einziehung als Alternative (§ 5)
- Abfindung je Fall: Verkehrswert für gevestete Anteile des Good Leavers, Nennwert für ungevestete, reduzierter Wert beim Bad Leaver, Ratenzahlung (§ 6)
- Beschleunigung beim Exit als Single oder Double Trigger (§ 7)
- Verfügungsbeschränkungen und Beitritt von Erwerbern (§ 8)
- Durchführungsvollmacht, Gesellschafterliste, Stimmbindung (§ 9)
- Vorrang vor der Satzung im Innenverhältnis, Laufzeit, Kosten der Beurkundung (§ 10)

Fehlt einer dieser Punkte, etwa die Definition des Verkehrswerts oder die Frist für die Call-Option, bleibt die Klausel im Ernstfall wirkungslos.`,
      },
      {
        titel: "Vesting-Vereinbarung Muster ausfüllen",
        text: `So füllst du die Platzhalter aus:

- Kopf: Name und Anschrift der Gründer, Firma, Sitz, Handelsregisternummer und Vertreter der Gesellschaft.
- § 1: Stammkapital, Anzahl und Nummern der Anteile je Gründer. Entscheidet, ob alle Anteile vesten oder nur ein Prozentsatz, und löscht die nicht gewählte Variante.
- § 2: Vesting-Beginn. Üblich ist der Start der Zusammenarbeit, nicht der Notartermin, damit bereits geleistete Monate zählen. Fristen für Krankheit und Elternzeit eintragen.
- § 3: Monate, ab denen dauerhafte Arbeitsunfähigkeit ein Leaver-Ereignis ist.
- § 5: Ausübungsfrist der Call-Option, meist sechs Monate, und die Paragraphennummer der Einziehungsklausel eurer Satzung.
- § 6: Prozentsatz der Bad-Leaver-Abfindung, Zahl der Jahresraten, Bagatellgrenze für sofortige Zahlung, IHK-Bezirk für den Schiedsgutachter.
- § 7: Single Trigger mit vollständiger oder hälftiger Beschleunigung oder Double Trigger; eine Variante wählen.

Prüfe am Ende, dass alle Zahlen zur Satzung passen: Die Einziehungsgründe in der Satzung müssen auf diese Vereinbarung verweisen, sonst läuft § 5 Abs. 3 ins Leere. Die Word-Fassung eignet sich zur Abstimmung mit dem Notar, die PDF-Fassung zur Unterschrift im Termin.`,
      },
      {
        titel: "Typische Fehler beim Vesting und wie du sie vermeidest",
        text: `Fehler eins: Vesting nur per Handschlag oder in einer E-Mail. Die Abtretungspflicht an GmbH-Anteilen ist ohne notarielle Beurkundung unwirksam, und dann hilft nur noch die Einziehung über die Satzung, falls sie überhaupt vorgesehen ist.

Fehler zwei: zu harte Bad-Leaver-Regeln. Wer einem Gründer nach drei Jahren Arbeit alle Anteile zum Nennwert nehmen will, riskiert, dass ein Gericht die Klausel als sittenwidrig verwirft. Die Vorlage begrenzt den Abschlag deshalb und sieht für gevestete Anteile mindestens einen Teil des Verkehrswerts vor.

Fehler drei: kein Cliff oder ein zu langer. Zwölf Monate sind Standard; ohne Cliff vestet ein Gründer schon nach einem Monat erste Anteile, mit 24 Monaten fühlt sich niemand als Mitgesellschafter.

Fehler vier: Exit nicht bedacht. Ohne Beschleunigungsklausel kann ein Käufer die Gründer nach dem Verkauf entlassen und ungevestete Anteile billig einziehen. Fehler fünf: steuerliche Folgen ignorieren. Erhält ein Gründer Anteile deutlich unter Wert, kann das als geldwerter Vorteil gelten; § 19a EStG bietet seit 2021 einen Aufschub, aber nur bei richtiger Gestaltung. Vor der Unterschrift mit dem Steuerberater sprechen.`,
      },
      {
        titel: "Rechtliche Grundlagen: Vesting im deutschen GmbH-Recht",
        text: `Vesting ist im Gesetz nicht geregelt, sondern eine Kombination aus bekannten Instrumenten des GmbH-Rechts. Die Pflicht, Geschäftsanteile abzutreten, ist nach § 15 Abs. 4 GmbHG beurkundungspflichtig; deshalb gehört die Vereinbarung zum Notar. Die Abtretung selbst braucht ebenfalls die notarielle Form (§ 15 Abs. 3 GmbHG), was die Vorlage über die Vollmacht in § 9 und die notarielle Ausübung in § 5 absichert.

Die Alternative zur Abtretung ist die Einziehung nach § 34 GmbHG, die nur zulässig ist, wenn die Satzung sie vorsieht und die Abfindung aus freiem Vermögen gezahlt werden kann (§ 30 GmbHG). Die Vorlage verweist deshalb auf die Einziehungsklausel der Satzung und verpflichtet im Zweifel die Erwerber zur Zahlung. Die Abfindungshöhe unterliegt den Grenzen, die die Rechtsprechung für Abfindungsklauseln entwickelt hat: Ein grobes Missverhältnis zum Verkehrswert macht die Klausel unwirksam.

Nach jeder Abtretung oder Einziehung muss die Geschäftsführung eine neue Gesellschafterliste zum Handelsregister einreichen (§ 40 GmbHG); erst dann gilt der Erwerber gegenüber der Gesellschaft als Gesellschafter (§ 16 GmbHG). Auch das Transparenzregister ist zu aktualisieren.`,
      },
      {
        titel: "Wann die Vesting-Vorlage nicht ausreicht",
        text: `Die Vorlage bildet das marktübliche Gründer-Vesting ab. Sie reicht nicht, wenn

- die Gesellschaft schon einen Investor hat; dann gehört Vesting in die Gesellschaftervereinbarung der Finanzierungsrunde mit abgestimmten Leaver-Definitionen,
- Anteile an Mitarbeiter ausgegeben werden sollen; dafür sind virtuelle Beteiligungen (VSOP) oder ein Beteiligungsprogramm mit eigenen steuerlichen Regeln das passende Instrument,
- ein Gründer seine Anteile über eine Holding-GmbH hält, weil dann die Leaver-Ereignisse auf die natürliche Person durchgreifen müssen,
- die Gesellschaft bereits einen erheblichen Wert hat und die Zuteilung oder der Rückerwerb steuerlich relevant wird,
- Gründer im Ausland sitzen und Steuer- oder Sozialversicherungsrecht anderer Länder betroffen ist.

In diesen Fällen ist ein Anwalt für Venture-Capital-Recht die richtige Adresse, der Steuerberater sollte parallel die Bewertung prüfen. Der Notar muss die Vereinbarung ohnehin beurkunden und weist auf Formfehler hin, berät aber nicht wirtschaftlich. GründerX stellt dieses Muster als Software bereit und ersetzt keine Rechtsberatung.`,
      },
    ],
    seo: {
      title: "Vesting-Vereinbarung Vorlage kostenlos (Word) | GründerX",
      description:
        "Vesting-Vereinbarung für Gründeranteile als kostenlose Vorlage: 12 Monate Cliff, 48 Monate linear, Good/Bad Leaver, Call-Option, Abfindung, Exit-Beschleunigung.",
    },
    stand: "2026-10",
    text: `Vesting-Vereinbarung

zwischen

1. [Vorname Nachname], wohnhaft [Straße, PLZ Ort] – „Gründer 1“ –
2. [Vorname Nachname], wohnhaft [Straße, PLZ Ort] – „Gründer 2“ –
[3. ggf. weitere Gründer]

– gemeinsam „die Gründer“ oder „die Gesellschafter“ –

und

[Name] [UG (haftungsbeschränkt) / GmbH], [Straße, PLZ Ort], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch [Geschäftsführer] – „die Gesellschaft“ –

§ 1 Gegenstand und Vesting-Anteile
(1) Die Gründer sind am Stammkapital der Gesellschaft von [Betrag] EUR wie folgt beteiligt: Gründer 1 mit [Anzahl] Geschäftsanteilen (Nr. [von] bis [bis]), Gründer 2 mit [Anzahl] Geschäftsanteilen (Nr. [von] bis [bis]).
(2) Sämtliche Geschäftsanteile der Gründer unterliegen dem Vesting nach dieser Vereinbarung („Vesting-Anteile“). [Alternative: Dem Vesting unterliegen [z. B. 80] % der Geschäftsanteile jedes Gründers; die übrigen gelten als sofort gevestet.]
(3) Zweck des Vesting ist, die Beteiligung der Gründer an ihre fortdauernde Tätigkeit für die Gesellschaft zu binden.

§ 2 Vesting-Zeitraum, Cliff und Vesting-Plan
(1) Der Vesting-Zeitraum beträgt 48 Monate und beginnt am [Datum] („Vesting-Beginn“).
(2) Innerhalb der ersten 12 Monate nach Vesting-Beginn gilt kein Vesting-Anteil als gevestet („Cliff“). Mit Ablauf des Cliff gelten 25 % der Vesting-Anteile als gevestet.
(3) Danach gilt mit Ablauf jedes weiteren Monats ein weiteres 1/48 der Vesting-Anteile als gevestet, sodass nach 48 Monaten alle Vesting-Anteile gevestet sind. Angefangene Monate werden nicht berücksichtigt; Bruchteile von Geschäftsanteilen werden kaufmännisch auf ganze Anteile gerundet.
(4) Maßgeblich für den Stand des Vesting ist der Tag des Leaver-Ereignisses nach § 3.
(5) Der Vesting-Lauf wird nicht unterbrochen durch Urlaub, Krankheit bis zu [z. B. 3] Monaten, Elternzeit bis zu [z. B. 6] Monaten oder eine mit Zustimmung der Gesellschafterversammlung vereinbarte Reduzierung der Tätigkeit.

§ 3 Leaver-Ereignis
Ein Leaver-Ereignis liegt vor, wenn die Tätigkeit des Gründers als Geschäftsführer oder in einem sonstigen Dienst- oder Arbeitsverhältnis für die Gesellschaft endet, insbesondere durch
   a) Kündigung oder Aufhebung des Anstellungsvertrags durch den Gründer oder die Gesellschaft,
   b) Abberufung als Geschäftsführer,
   c) Tod oder dauerhafte Arbeitsunfähigkeit über [z. B. 6] Monate,
   d) Eröffnung des Insolvenzverfahrens über das Vermögen des Gründers oder Pfändung seines Geschäftsanteils,
   e) schwerwiegender Verstoß gegen Wettbewerbsverbot, Geheimhaltungspflichten oder diese Vereinbarung, auch ohne Beendigung der Tätigkeit.

§ 4 Good Leaver und Bad Leaver
(1) Ein Gründer ist „Good Leaver“, wenn das Leaver-Ereignis eintritt durch
   a) Kündigung oder Abberufung durch die Gesellschaft ohne wichtigen Grund im Sinne des § 626 BGB,
   b) Kündigung durch den Gründer aus einem von der Gesellschaft zu vertretenden wichtigen Grund,
   c) Tod oder dauerhafte Arbeitsunfähigkeit,
   d) einvernehmliche Aufhebung, bei der die Gesellschafterversammlung den Good-Leaver-Status beschließt.
(2) Ein Gründer ist „Bad Leaver“ in allen anderen Fällen, insbesondere bei
   a) Eigenkündigung ohne von der Gesellschaft zu vertretenden wichtigen Grund,
   b) Kündigung oder Abberufung durch die Gesellschaft aus wichtigem Grund,
   c) den Fällen des § 3 lit. d und e.

§ 5 Call-Option und Abtretungsverpflichtung
(1) Mit Eintritt eines Leaver-Ereignisses bietet der betroffene Gründer hiermit unwiderruflich an, folgende Geschäftsanteile an die Gesellschaft oder an einen oder mehrere von der Gesellschafterversammlung benannte Erwerber (Mitgesellschafter, Gesellschaft oder Dritte) abzutreten („Call-Option“):
   a) als Good Leaver: alle noch nicht gevesteten Vesting-Anteile,
   b) als Bad Leaver: alle Vesting-Anteile, gevestet und nicht gevestet.
(2) Die Call-Option kann innerhalb von [z. B. 6] Monaten nach Kenntnis der Gesellschaft vom Leaver-Ereignis durch Beschluss der Gesellschafterversammlung ausgeübt werden; der betroffene Gründer hat kein Stimmrecht. Die Ausübung erfolgt durch Erklärung gegenüber dem Gründer in notariell beurkundeter Form.
(3) Die Gesellschafterversammlung kann statt der Abtretung die Einziehung der betroffenen Anteile nach § [Nummer] des Gesellschaftsvertrags beschließen. Der Gründer stimmt der Einziehung bereits jetzt zu.
(4) Gevestete Anteile eines Good Leavers verbleiben bei diesem. Die Gesellschafterversammlung kann jedoch innerhalb der Frist nach Absatz 2 verlangen, dass auch diese Anteile gegen Zahlung des Verkehrswerts nach § 6 Abs. 1 abgetreten werden, wenn der Good Leaver nicht mehr für die Gesellschaft tätig ist.

§ 6 Abfindung je Leaver-Fall
(1) Für gevestete Anteile, die nach § 5 Abs. 4 abgetreten werden, erhält der Good Leaver den Verkehrswert zum Tag des Leaver-Ereignisses. Der Verkehrswert entspricht der Bewertung der letzten Finanzierungsrunde, sofern diese nicht länger als 12 Monate zurückliegt, andernfalls dem Wert nach dem vereinfachten Ertragswertverfahren (§§ 199 ff. BewG), mindestens jedoch dem Nennbetrag.
(2) Für nicht gevestete Anteile erhält jeder Leaver den Nennbetrag, höchstens jedoch den Verkehrswert.
(3) Der Bad Leaver erhält für gevestete Anteile [z. B. 50] % des Verkehrswerts nach Absatz 1, mindestens den Nennbetrag, und für nicht gevestete Anteile den Nennbetrag.
(4) Die Abfindung ist in [z. B. 3] gleichen Jahresraten zu zahlen, erstmals [6] Monate nach Abtretung; sie wird mit 2 Prozentpunkten über dem Basiszinssatz verzinst. Beträge bis [Betrag, z. B. 5.000] EUR sind sofort fällig. Zahlungen aus dem gebundenen Vermögen der Gesellschaft (§ 30 GmbHG) sind ausgeschlossen; in diesem Fall zahlen die Erwerber.
(5) Bei Streit über den Verkehrswert entscheidet ein von der Industrie- und Handelskammer [Ort] benannter Wirtschaftsprüfer als Schiedsgutachter; die Kosten tragen die Parteien je zur Hälfte.

§ 7 Beschleunigung bei Exit
(1) Kommt es zu einem Exit, gelten [alle / 50 % der] noch nicht gevesteten Vesting-Anteile mit Wirksamwerden des Exits als gevestet („Single Trigger“).
[Alternative („Double Trigger“): (1) Kommt es zu einem Exit und wird die Tätigkeit des Gründers innerhalb von 12 Monaten danach durch die Gesellschaft oder den Erwerber ohne wichtigen Grund beendet, gelten alle noch nicht gevesteten Vesting-Anteile als gevestet.]
(2) Exit ist die Veräußerung von mehr als 50 % der Geschäftsanteile oder des wesentlichen Vermögens der Gesellschaft an einen Dritten, der nicht Gesellschafter oder mit einem Gesellschafter verbunden ist, sowie ein Börsengang.
(3) Eine Finanzierungsrunde ist kein Exit.

§ 8 Verfügungsbeschränkungen
(1) Die Gründer dürfen über Vesting-Anteile während des Vesting-Zeitraums nicht ohne Zustimmung der Gesellschafterversammlung verfügen; der Gesellschaftsvertrag bleibt unberührt.
(2) Ein Erwerber von Vesting-Anteilen tritt in diese Vereinbarung ein. Die Gründer verpflichten sich, Erwerbern diese Vereinbarung vor Abtretung vorzulegen.

§ 9 Durchführung und Vollmacht
(1) Jeder Gründer bevollmächtigt die Gesellschaft, vertreten durch einen nicht betroffenen Geschäftsführer, unwiderruflich und unter Befreiung von § 181 BGB, die Abtretung nach § 5 in seinem Namen zu erklären und entgegenzunehmen, falls er nicht innerhalb von zwei Wochen nach Aufforderung selbst mitwirkt. Die Vollmacht wird gesondert notariell beglaubigt.
(2) Die Geschäftsführung reicht nach jeder Abtretung oder Einziehung unverzüglich eine aktualisierte Gesellschafterliste zum Handelsregister ein.
(3) Die Gesellschafter verpflichten sich, bei allen Beschlüssen so zu stimmen, wie es zur Durchführung dieser Vereinbarung erforderlich ist.

§ 10 Schlussbestimmungen
(1) Diese Vereinbarung geht als Gesellschaftervereinbarung bei Widersprüchen im Innenverhältnis dem Gesellschaftsvertrag vor. Sie endet mit vollständigem Vesting aller Vesting-Anteile oder mit einem Exit, der alle Anteile erfasst.
(2) Änderungen bedürfen der Schriftform, soweit nicht notarielle Form erforderlich ist; das gilt auch für diese Klausel.
(3) Sollte eine Bestimmung unwirksam sein, bleibt die Vereinbarung im Übrigen wirksam. Die Parteien ersetzen die unwirksame Bestimmung durch eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt deutsches Recht.
(5) Die Kosten der notariellen Beurkundung trägt die Gesellschaft.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gründer 1


______________________________
[Vorname Nachname], Gründer 2


______________________________
[Name] [UG (haftungsbeschränkt) / GmbH], vertreten durch [Geschäftsführer]

(Notarielle Beurkundung erforderlich, § 15 Abs. 4 GmbHG)

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "gesellschafterbeschluss",
    titel: "Gesellschafterbeschluss im Umlaufverfahren",
    kurz: "Schriftlicher Umlaufbeschluss der Gesellschafter einer GmbH oder UG mit mehreren Beschlussgegenständen: Jahresabschluss, Ergebnisverwendung, Entlastung, Geschäftsführerbestellung.",
    kategorie: "gesellschaft",
    dateiname: "Gesellschafterbeschluss-Umlaufverfahren",
    wofuer: [
      "Jährliche Pflichtbeschlüsse einer GmbH oder UG ohne Versammlung erledigen",
      "Gesellschafter sitzen an verschiedenen Orten und wollen per E-Mail oder Post abstimmen",
      "Bestellung oder Abberufung eines Geschäftsführers mit Nachweis für das Handelsregister",
      "Dokumentation für Finanzamt, Bank und Transparenz gegenüber Investoren",
    ],
    enthaelt: [
      "Einleitung: Gesellschaft, Gesellschafter, Verzicht auf Form und Frist",
      "Beschluss 1: Feststellung des Jahresabschlusses",
      "Beschluss 2: Verwendung des Ergebnisses",
      "Beschluss 3: Entlastung der Geschäftsführung",
      "Beschluss 4: Bestellung eines Geschäftsführers",
      "Beschluss 5: Sonstige Beschlüsse (optional)",
      "Abstimmungsergebnis und Feststellung",
      "Unterschriften aller Gesellschafter",
    ],
    hinweise: [
      "Ein Umlaufbeschluss ist nur wirksam, wenn alle Gesellschafter mit der schriftlichen Abstimmung einverstanden sind oder dem Beschluss selbst in Textform zustimmen (§ 48 Abs. 2 GmbHG). Fehlt eine Unterschrift und widerspricht der Gesellschafter, ist der Beschluss anfechtbar.",
      "Der Jahresabschluss muss innerhalb von acht Monaten nach Ende des Geschäftsjahres festgestellt werden, bei kleinen Gesellschaften innerhalb von elf Monaten (§ 42a Abs. 2 GmbHG). Die Offenlegung beim Unternehmensregister läuft unabhängig davon spätestens zwölf Monate nach Bilanzstichtag.",
      "Eine UG darf nur ausschütten, was nach Einstellung von 25 % des Jahresüberschusses in die gesetzliche Rücklage bleibt (§ 5a Abs. 3 GmbHG). Der Ausschüttungsbeschluss muss das ausweisen.",
      "Die Bestellung eines Geschäftsführers muss vom neuen Geschäftsführer zum Handelsregister angemeldet werden; dafür braucht er eine notariell beglaubigte Anmeldung und muss versichern, dass keine Bestellungshindernisse nach § 6 Abs. 2 GmbHG vorliegen.",
      "Gesellschafter-Geschäftsführer dürfen bei der eigenen Entlastung nicht mitstimmen (§ 47 Abs. 4 GmbHG).",
    ],
    faqs: [
      {
        q: "Brauchen wir für den Umlaufbeschluss eine Versammlung?",
        a: "Nein. Das Gesetz erlaubt die Beschlussfassung ohne Versammlung, wenn alle Gesellschafter in Textform mit der schriftlichen Abstimmung einverstanden sind. Die Vorlage enthält diese Zustimmung in der Einleitung. Eine E-Mail mit eingescannter Unterschrift oder eine qualifizierte Signatur reicht aus, wenn die Satzung nichts Strengeres vorschreibt.",
      },
      {
        q: "Müssen alle Gesellschafter unterschreiben?",
        a: "Für das Umlaufverfahren ja: Jeder muss zumindest mit dem Verfahren einverstanden sein. Dem Beschlussinhalt selbst muss nur die nach Satzung erforderliche Mehrheit zustimmen; ein Gesellschafter kann also unterschreiben und mit Nein stimmen. Die Vorlage sieht für jeden Beschluss die Spalte Ja/Nein/Enthaltung vor.",
      },
      {
        q: "Was bedeutet Entlastung der Geschäftsführung?",
        a: "Mit der Entlastung billigen die Gesellschafter die Geschäftsführung des abgelaufenen Jahres und verzichten auf Ersatzansprüche, soweit die Vorgänge aus den vorgelegten Unterlagen erkennbar waren. Verdeckte Pflichtverletzungen bleiben verfolgbar. Deshalb sollte die Entlastung erst nach Einsicht in Jahresabschluss und Bericht erfolgen.",
      },
      {
        q: "Muss der Beschluss notariell beurkundet werden?",
        a: "Für die vier Standardbeschlüsse nicht. Beurkundungspflichtig sind nur Satzungsänderungen, Kapitalmaßnahmen, Umwandlungen und Auflösung. Die Geschäftsführerbestellung selbst ist formfrei, nur die Anmeldung zum Handelsregister braucht die notarielle Beglaubigung der Unterschrift.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann brauchst du einen Gesellschafterbeschluss im Umlaufverfahren?",
        text: `Jede GmbH und UG muss einmal im Jahr den Jahresabschluss feststellen, über den Gewinn entscheiden und die Geschäftsführung entlasten. Bei zwei oder drei Gesellschaftern, die sich ohnehin täglich sehen, wäre eine förmliche Versammlung mit Einladung per Einschreiben reiner Aufwand. Der Umlaufbeschluss erledigt das schriftlich, per Post oder als Scan per E-Mail.

Du brauchst die Vorlage außerdem für Beschlüsse, die ein Dritter sehen will: Das Handelsregister verlangt bei der Bestellung eines Geschäftsführers den Beschluss, die Bank will für eine Kreditlinie den Gesellschafterbeschluss, das Finanzamt fragt beim Geschäftsführergehalt nach der vorherigen Genehmigung, und Investoren prüfen in der Due Diligence das Beschlussbuch. Wer seine Beschlüsse nur mündlich fasst, hat im Streit und in der Betriebsprüfung nichts in der Hand. Diese Vorlage bündelt die vier jährlichen Standardbeschlüsse plus einen freien Beschlussgegenstand in einem Dokument.`,
      },
      {
        titel: "Was muss in einen Umlaufbeschluss der GmbH?",
        text: `Ein Umlaufbeschluss braucht mehr als die bloße Entscheidung. Die Vorlage ist in drei Teile gegliedert:

- Teil I: Bezeichnung der Gesellschaft mit Handelsregisternummer, alle Gesellschafter mit Anteilen und Prozenten, die ausdrückliche Zustimmung zum schriftlichen Verfahren nach § 48 Abs. 2 GmbHG, der Verzicht auf Form und Frist und eine Abstimmungsfrist.
- Teil II: je Beschlussgegenstand der vollständige Beschlusstext, die Stimmabgabe jedes Gesellschafters mit Ja, Nein oder Enthaltung und das Ergebnis in Prozent. Die Vorlage enthält Feststellung des Jahresabschlusses (Beschluss 1), Ergebnisverwendung mit UG-Rücklage, Ausschüttung, Gewinnrücklage und Vortrag (Beschluss 2), Entlastung mit Hinweis auf das Stimmverbot des Gesellschafter-Geschäftsführers (Beschluss 3), Bestellung oder Abberufung eines Geschäftsführers mit Vertretungsregelung und § 181 BGB (Beschluss 4) und einen freien Beschluss (Beschluss 5).
- Teil III: Feststellung des Ergebnisses durch die Geschäftsführung, Wirksamkeitszeitpunkt, Ablage im Beschlussbuch, Unterschriften aller Gesellschafter mit Ort und Datum.

Wichtig ist die Trennung von Verfahrenszustimmung und Abstimmung: Mit dem Verfahren müssen alle einverstanden sein, dem Inhalt nur die nötige Mehrheit.`,
      },
      {
        titel: "Gesellschafterbeschluss Muster ausfüllen: so gehst du vor",
        text: `Die Platzhalter sind schnell erledigt, wenn Jahresabschluss und Gesellschafterliste vorliegen:

- Kopf: Firma, Rechtsform, Sitz, Amtsgericht und HRB-Nummer; je Gesellschafter Anzahl der Anteile, Nennbetrag und Prozentsatz laut aktueller Gesellschafterliste.
- Teil I: Paragraph der Satzung, falls sie das Umlaufverfahren regelt, und die Abstimmungsfrist.
- Beschluss 1: Bilanzstichtag, Datum der Übermittlung des Abschlusses, Bilanzsumme und Jahresüberschuss oder Fehlbetrag.
- Beschluss 2: Bilanzgewinn und die Aufteilung auf Rücklage (nur UG, 25 Prozent), Ausschüttung mit Zahltag, Gewinnrücklagen und Vortrag; die Beträge müssen den Bilanzgewinn genau ergeben. Bei Verlust die Alternative verwenden.
- Beschluss 3: Namen der Geschäftsführer; bei Gesellschafter-Geschäftsführern in der Abstimmungszeile kein Stimmrecht eintragen.
- Beschluss 4: Name, Geburtsdatum, Anschrift, Beginn, Vertretungsbefugnis und § 181 BGB des neuen Geschäftsführers, oder die Abberufungs-Alternative. Die Eckpunkte des Anstellungsvertrags in Anlage 1.
- Beschluss 5: nur ausfüllen, wenn es einen weiteren Gegenstand gibt, sonst streichen.

Jeder Gesellschafter trägt in jeder Abstimmungszeile seine Stimme ein und unterschreibt mit Ort und Datum. Die Geschäftsführung sammelt alle Exemplare, trägt die Ergebnisse ein, unterschreibt die Feststellung und schickt jedem eine vollständige Kopie. Die Vorlage gibt es als Word zur Bearbeitung und als PDF zum Rundsenden.`,
      },
      {
        titel: "Typische Fehler bei Umlaufbeschlüssen",
        text: `Fehler eins: ein Gesellschafter unterschreibt nicht und widerspricht später. Dann fehlt die Zustimmung zum Verfahren und der Beschluss ist anfechtbar. Setze eine Frist, dokumentiere den Versand und hole bei Funkstille lieber zur Versammlung ein.

Fehler zwei: Der Gesellschafter-Geschäftsführer stimmt bei seiner eigenen Entlastung mit. Nach § 47 Abs. 4 GmbHG ist er ausgeschlossen; bei einer Zweipersonen-GmbH mit zwei Geschäftsführern entlastet also jeder den anderen. Fehler drei: Die UG beschließt die Vollausschüttung und vergisst die gesetzliche Rücklage; ein solcher Beschluss ist nichtig.

Fehler vier: Die Ausschüttung wird beschlossen, ohne die Kapitalertragsteuer einzuplanen. Die Gesellschaft muss 25 Prozent plus Solidaritätszuschlag einbehalten und bis zum zehnten des Folgemonats anmelden und abführen. Fehler fünf: Die Geschäftsführerbestellung wird beschlossen, aber nicht zum Handelsregister angemeldet. Der neue Geschäftsführer muss die Anmeldung notariell beglaubigen lassen und versichern, dass keine Bestellungshindernisse vorliegen. Und schließlich: die Fristen. Der Jahresabschluss kleiner Gesellschaften muss binnen elf Monaten festgestellt und binnen zwölf Monaten offengelegt werden; wer den Beschluss im Dezember nachholt, riskiert Ordnungsgeld.`,
      },
      {
        titel: "Rechtliche Grundlagen: § 48 GmbHG und die Jahresbeschlüsse",
        text: `Gesellschafterbeschlüsse werden grundsätzlich in Versammlungen gefasst (§ 48 Abs. 1 GmbHG). Die schriftliche Abstimmung ist nach § 48 Abs. 2 GmbHG zulässig, wenn alle Gesellschafter in Textform mit der Beschlussfassung einverstanden sind oder dem schriftlichen Verfahren zustimmen. Seit der Reform 2023 reicht Textform, also auch eine E-Mail mit eingescannter Unterschrift, sofern die Satzung nichts Strengeres verlangt.

Die Jahresbeschlüsse folgen aus § 46 Nr. 1 GmbHG (Feststellung des Jahresabschlusses, Ergebnisverwendung) und § 46 Nr. 5 GmbHG (Bestellung, Abberufung und Entlastung der Geschäftsführer). Die Frist für die Feststellung ergibt sich aus § 42a Abs. 2 GmbHG: acht Monate, bei kleinen Gesellschaften elf Monate nach Bilanzstichtag. Die Rücklagenpflicht der UG steht in § 5a Abs. 3 GmbHG, das Stimmverbot bei Entlastung in § 47 Abs. 4 GmbHG.

Nicht im Umlaufverfahren möglich sind Beschlüsse, die der notariellen Beurkundung bedürfen: Satzungsänderungen, Kapitalerhöhungen, Umwandlungen und die Auflösung. Bei der Einpersonen-GmbH gilt § 48 Abs. 3 GmbHG: Der Alleingesellschafter muss jeden Beschluss unverzüglich schriftlich niederlegen und unterschreiben. Das Beschlussbuch sollte zehn Jahre aufbewahrt werden, weil es handelsrechtlich zu den Geschäftsunterlagen zählt.`,
      },
      {
        titel: "Wann der Umlaufbeschluss nicht ausreicht",
        text: `Das Umlaufverfahren setzt Einigkeit über das Verfahren voraus. Sobald ein Gesellschafter nicht mitzieht, gegen die Geschäftsführung opponiert oder ein Beschluss angefochten werden könnte, solltest du förmlich zur Versammlung einladen und ein Protokoll führen; beide Vorlagen findest du in dieser Kategorie. Außerdem reicht der Beschluss nicht, wenn

- die Satzung geändert, das Kapital erhöht oder die Gesellschaft aufgelöst werden soll; dann ist der Notar zwingend,
- eine Ausschüttung beschlossen wird, obwohl die Gesellschaft Verluste erwartet oder Gesellschafterdarlehen offen sind; hier sollte der Steuerberater die Kapitalerhaltung und die Liquidität prüfen,
- ein Geschäftsführer aus wichtigem Grund abberufen werden soll und Streit über die Berechtigung droht,
- die Gesellschaft einen Aufsichtsrat oder Beirat hat, dessen Zustimmung die Satzung vorschreibt,
- Investoren Sonderrechte haben, die bestimmte Beschlüsse von ihrer Zustimmung abhängig machen.

In solchen Fällen prüft ein Anwalt für Gesellschaftsrecht den Beschlusstext vorab. Diese Vorlage von GründerX ist ein Software-Muster und keine Rechtsberatung; für die jährlichen Standardbeschlüsse einer unstreitigen GmbH oder UG reicht sie als Word oder PDF vollständig aus.`,
      },
    ],
    seo: {
      title: "Gesellschafterbeschluss Vorlage kostenlos (Word) | GründerX",
      description:
        "Kostenlose Vorlage für den schriftlichen Gesellschafterbeschluss einer GmbH oder UG: Jahresabschluss, Ergebnisverwendung, Entlastung, Geschäftsführerbestellung.",
    },
    stand: "2026-10",
    text: `Gesellschafterbeschluss im schriftlichen Umlaufverfahren

der [Name] [GmbH / UG (haftungsbeschränkt)] mit Sitz in [Ort], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer] (die „Gesellschaft“)

Gesellschafter:
1. [Vorname Nachname], [Anzahl] Geschäftsanteile im Nennbetrag von insgesamt [Betrag] EUR ([Prozent] % des Stammkapitals)
2. [Vorname Nachname], [Anzahl] Geschäftsanteile im Nennbetrag von insgesamt [Betrag] EUR ([Prozent] % des Stammkapitals)
[3. ggf. weitere Gesellschafter]

I. Verzicht auf Form und Frist, Einverständnis mit dem Umlaufverfahren
Die unterzeichnenden Gesellschafter halten sämtliche Geschäftsanteile der Gesellschaft. Sie erklären sich gemäß § 48 Abs. 2 GmbHG [und § [Nummer] des Gesellschaftsvertrags] mit der Beschlussfassung im schriftlichen Umlaufverfahren einverstanden und verzichten auf die Einhaltung aller gesetzlichen und satzungsmäßigen Vorschriften über Form, Frist und Ankündigung einer Gesellschafterversammlung. Die Stimmabgabe erfolgt durch Unterzeichnung dieses Dokuments; die Rücksendung per Post, Fax oder als Scan per E-Mail an die Geschäftsführung ist ausreichend. Abstimmungsfrist: bis zum [Datum].

II. Beschlussgegenstände

Beschluss 1: Feststellung des Jahresabschlusses zum 31.12.[Jahr]
Der von der Geschäftsführung aufgestellte und den Gesellschaftern am [Datum] übermittelte Jahresabschluss der Gesellschaft zum 31.12.[Jahr], bestehend aus Bilanz, Gewinn- und Verlustrechnung und Anhang [sowie Lagebericht], der mit einer Bilanzsumme von [Betrag] EUR und einem Jahresüberschuss / Jahresfehlbetrag von [Betrag] EUR abschließt, wird festgestellt.
Abstimmung: Gesellschafter 1: [Ja / Nein / Enthaltung]   Gesellschafter 2: [Ja / Nein / Enthaltung]
Ergebnis: [angenommen / abgelehnt] mit [Prozent] % der abgegebenen Stimmen.

Beschluss 2: Verwendung des Ergebnisses
Der Bilanzgewinn des Geschäftsjahres [Jahr] in Höhe von [Betrag] EUR wird wie folgt verwendet:
   a) Einstellung in die gesetzliche Rücklage nach § 5a Abs. 3 GmbHG (nur UG): [Betrag] EUR (25 % des um einen Verlustvortrag geminderten Jahresüberschusses),
   b) Ausschüttung an die Gesellschafter im Verhältnis ihrer Geschäftsanteile: [Betrag] EUR, zahlbar am [Datum] unter Einbehalt der Kapitalertragsteuer und des Solidaritätszuschlags,
   c) Einstellung in die Gewinnrücklagen: [Betrag] EUR,
   d) Vortrag auf neue Rechnung: [Betrag] EUR.
[Alternative bei Jahresfehlbetrag: Der Jahresfehlbetrag in Höhe von [Betrag] EUR wird auf neue Rechnung vorgetragen.]
Abstimmung: Gesellschafter 1: [Ja / Nein / Enthaltung]   Gesellschafter 2: [Ja / Nein / Enthaltung]
Ergebnis: [angenommen / abgelehnt] mit [Prozent] % der abgegebenen Stimmen.

Beschluss 3: Entlastung der Geschäftsführung
Dem Geschäftsführer / den Geschäftsführern [Vorname Nachname] [und Vorname Nachname] wird für das Geschäftsjahr [Jahr] Entlastung erteilt.
Hinweis: Ein Gesellschafter, der zugleich Geschäftsführer ist, ist bei seiner eigenen Entlastung vom Stimmrecht ausgeschlossen (§ 47 Abs. 4 GmbHG); bei mehreren Geschäftsführern wird über jede Entlastung getrennt abgestimmt.
Abstimmung über die Entlastung von [Name]: Gesellschafter 1: [Ja / Nein / Enthaltung / kein Stimmrecht]   Gesellschafter 2: [Ja / Nein / Enthaltung / kein Stimmrecht]
Ergebnis: [angenommen / abgelehnt] mit [Prozent] % der abgegebenen stimmberechtigten Stimmen.

Beschluss 4: Bestellung eines Geschäftsführers
[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort], wird mit Wirkung ab dem [Datum] zum [weiteren] Geschäftsführer der Gesellschaft bestellt. Er / sie vertritt die Gesellschaft [einzeln / gemeinsam mit einem weiteren Geschäftsführer oder einem Prokuristen] und ist [von den Beschränkungen des § 181 BGB befreit / nicht von den Beschränkungen des § 181 BGB befreit]. Die Bestellung ist zum Handelsregister anzumelden. Der Abschluss eines Anstellungsvertrags mit dem neuen Geschäftsführer zu den in Anlage 1 bezeichneten Konditionen wird genehmigt; [Vorname Nachname] wird bevollmächtigt, den Vertrag für die Gesellschaft zu unterzeichnen.
[Alternative: Der Geschäftsführer [Vorname Nachname] wird mit Wirkung zum [Datum] abberufen. Der Anstellungsvertrag wird [fristgerecht zum [Datum] / aus wichtigem Grund fristlos] gekündigt.]
Abstimmung: Gesellschafter 1: [Ja / Nein / Enthaltung]   Gesellschafter 2: [Ja / Nein / Enthaltung]
Ergebnis: [angenommen / abgelehnt] mit [Prozent] % der abgegebenen Stimmen.

Beschluss 5: Sonstiges [optional]
[z. B. „Die Geschäftsführung wird ermächtigt, bei der [Bank] eine Kontokorrentlinie bis zu [Betrag] EUR aufzunehmen.“ / „Dem Abschluss des Mietvertrags über die Geschäftsräume [Adresse] mit einer Laufzeit von [Jahren] wird zugestimmt.“ / „Die Gesellschafter stellen fest, dass die Voraussetzungen für die Erhöhung des Stammkapitals auf 25.000 EUR vorliegen, und beauftragen die Geschäftsführung, einen Notartermin zu vereinbaren.“]
Abstimmung: Gesellschafter 1: [Ja / Nein / Enthaltung]   Gesellschafter 2: [Ja / Nein / Enthaltung]
Ergebnis: [angenommen / abgelehnt] mit [Prozent] % der abgegebenen Stimmen.

III. Feststellung
Nach Eingang aller Stimmabgaben stellt die Geschäftsführung das Ergebnis fest und übermittelt jedem Gesellschafter eine Kopie dieses Beschlusses mit allen Unterschriften. Die Beschlüsse werden mit dem Zugang der Feststellung beim letzten Gesellschafter wirksam, soweit oben kein anderes Datum bestimmt ist. Der Beschluss wird im Beschlussbuch der Gesellschaft abgelegt.

Weitere Beschlüsse werden nicht gefasst.


Gesellschafter 1

[Ort], den [Datum]

______________________________
[Vorname Nachname]


Gesellschafter 2

[Ort], den [Datum]

______________________________
[Vorname Nachname]


[Gesellschafter 3

[Ort], den [Datum]

______________________________
[Vorname Nachname]]


Feststellung des Ergebnisses durch die Geschäftsführung

[Ort], den [Datum]

______________________________
[Vorname Nachname], Geschäftsführer

Anlage 1: Eckpunkte des Geschäftsführer-Anstellungsvertrags (bei Beschluss 4)

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "einladung-gesellschafterversammlung",
    titel: "Einladung zur Gesellschafterversammlung",
    kurz: "Einladungsschreiben zur ordentlichen oder außerordentlichen Gesellschafterversammlung einer GmbH oder UG mit Tagesordnung, Frist, Form und den Hinweisen nach § 51 GmbHG.",
    kategorie: "gesellschaft",
    dateiname: "Einladung-Gesellschafterversammlung",
    wofuer: [
      "Jährliche ordentliche Gesellschafterversammlung zu Jahresabschluss und Entlastung",
      "Außerordentliche Versammlung, etwa bei Geschäftsführerwechsel, Kapitalerhöhung oder Krise",
      "Wenn nicht alle Gesellschafter auf Form und Frist verzichten und die Einladung gerichtsfest sein muss",
      "Einberufung auf Verlangen einer Minderheit nach § 50 GmbHG",
    ],
    enthaelt: [
      "Briefkopf, Empfänger, Zustellweg",
      "Ort, Datum, Uhrzeit und Form der Versammlung",
      "Tagesordnung mit Beschlussvorschlägen",
      "Hinweise zu Frist, Unterlagen und Vertretung",
      "Hinweis auf Video- oder Telefonteilnahme",
      "Hinweis auf Beschlussfähigkeit und zweite Versammlung",
      "Anlagen und Unterschrift der Geschäftsführung",
    ],
    hinweise: [
      "Gesetzlich ist die Einladung durch eingeschriebenen Brief mit einer Frist von mindestens einer Woche zu bewirken (§ 51 Abs. 1 GmbHG). Die Satzung kann die Form erleichtern (E-Mail) oder die Frist verlängern; dann gilt die Satzung. Prüfe vor dem Versand, was eure Satzung sagt.",
      "Jeder Beschlussgegenstand muss mindestens drei Tage vor der Versammlung angekündigt sein (§ 51 Abs. 4 GmbHG). Über nicht angekündigte Punkte darf nur beschlossen werden, wenn alle Gesellschafter anwesend sind und keiner widerspricht.",
      "Die Frist läuft erst ab Zugang beziehungsweise ab dem Zeitpunkt, zu dem der Brief bei normalem Postlauf zugegangen wäre. Rechne mit zwei bis drei Tagen Postlaufzeit zusätzlich und dokumentiere den Versand (Einlieferungsbeleg).",
      "Mängel in Einladung oder Ankündigung machen Beschlüsse anfechtbar, bei Nichtladung eines Gesellschafters sogar nichtig. Wer sicher gehen will, holt vorab die Verzichtserklärungen aller Gesellschafter ein (Vollversammlung, § 51 Abs. 3 GmbHG).",
    ],
    faqs: [
      {
        q: "Reicht eine E-Mail als Einladung?",
        a: "Nur wenn die Satzung das ausdrücklich erlaubt. Ohne Satzungsregelung verlangt § 51 GmbHG den eingeschriebenen Brief. Praktikabel ist beides: E-Mail vorab und zusätzlich Einschreiben. Wenn alle Gesellschafter erscheinen und niemand widerspricht, sind Formfehler geheilt.",
      },
      {
        q: "Wie berechne ich die Einladungsfrist richtig?",
        a: "Die gesetzliche Mindestfrist beträgt eine Woche ab Zugang; viele Satzungen verlangen zwei Wochen. Der Tag des Zugangs und der Tag der Versammlung zählen nicht mit. Bei Einschreiben gilt die Einladung als zugegangen, wenn sie bei normalem Postlauf angekommen wäre, auch wenn der Gesellschafter sie nicht abholt.",
      },
      {
        q: "Können Gesellschafter die Einberufung verlangen?",
        a: "Ja. Gesellschafter, die zusammen mindestens 10 % des Stammkapitals halten, können die Einberufung unter Angabe von Zweck und Gründen verlangen (§ 50 Abs. 1 GmbHG). Kommt die Geschäftsführung dem nicht nach, dürfen sie selbst einberufen (§ 50 Abs. 3 GmbHG).",
      },
      {
        q: "Darf die Versammlung per Video stattfinden?",
        a: "Ja, seit 2023 ausdrücklich: Versammlungen können per Video- oder Telefonkonferenz abgehalten werden, wenn alle Gesellschafter in Textform einverstanden sind oder die Satzung das erlaubt (§ 48 Abs. 1 Satz 2 GmbHG). Die Vorlage fragt die Zustimmung in der Einladung ab.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann brauchst du eine förmliche Einladung zur Gesellschafterversammlung?",
        text: `Solange sich alle Gesellschafter einig sind, kommen GmbH und UG mit Umlaufbeschlüssen aus. Die förmliche Einladung wird nötig, sobald das nicht mehr der Fall ist: Ein Gesellschafter blockiert, ein Geschäftsführer soll abberufen werden, eine Kapitalerhöhung oder ein Investoreneinstieg steht an, oder die Gesellschaft steckt in der Krise und § 49 Abs. 3 GmbHG verlangt die Einberufung, weil die Hälfte des Stammkapitals verloren ist.

Auch die jährliche ordentliche Versammlung zu Jahresabschluss und Entlastung sollte förmlich einberufen werden, wenn mehr als drei Gesellschafter beteiligt sind oder nicht alle am selben Ort sitzen. Und wenn eine Minderheit von mindestens zehn Prozent nach § 50 GmbHG die Einberufung verlangt, muss die Geschäftsführung mit genau dieser Form reagieren. Die Vorlage liefert das Einladungsschreiben mit Tagesordnung, Beschlussvorschlägen, Fristhinweisen, Vertretungsregel und der Abfrage zur Videoteilnahme.`,
      },
      {
        titel: "Was muss in die Einladung zur Gesellschafterversammlung?",
        text: `Die Einladung ist das Fundament jedes späteren Beschlusses. Fehlt etwas, sind die Beschlüsse anfechtbar oder nichtig. Die Vorlage enthält alle Pflicht- und Praxisbestandteile:

- Briefkopf der Gesellschaft mit Handelsregisternummer, Zustellweg per Einschreiben, Anschrift des Gesellschafters
- Bezeichnung als ordentliche oder außerordentliche Versammlung und die Rechtsgrundlage (§ 49, § 51 GmbHG, Satzung)
- Datum, Uhrzeit, Ort oder Videokonferenz-Plattform
- vollständige Tagesordnung mit Beschlussvorschlag zu jedem Punkt: Eröffnung und Beschlussfähigkeit, Jahresabschluss, Ergebnisverwendung, Entlastung, Geschäftsführerbestellung, Zustimmungen zu Geschäften, Verschiedenes
- Hinweis auf beigefügte oder ausliegende Unterlagen
- Angabe von Frist und Form und die Ankündigung der Tagesordnung nach § 51 Abs. 2 und 4 GmbHG
- Vertretungsmöglichkeit mit Vollmachtsformular
- Abfrage der Zustimmung zur Video- oder Telefonteilnahme nach § 48 Abs. 1 Satz 2 GmbHG
- Hinweis auf Beschlussfähigkeit und zweite Versammlung
- Angebot der Verzichtserklärung auf Form und Frist
- Unterschrift der Geschäftsführung, Anlagenliste, Verteiler

Die Beschlussvorschläge sind nicht Pflicht, machen die Ankündigung aber präzise und verhindern den Einwand, ein Gegenstand sei nicht ausreichend bezeichnet gewesen.`,
      },
      {
        titel: "Einladung Gesellschafterversammlung Muster ausfüllen",
        text: `Die Platzhalter sind in wenigen Minuten gefüllt, die Fristen brauchen Sorgfalt:

- Kopf: Firma, Rechtsform, Anschrift, Amtsgericht und HRB; Empfänger laut aktueller Gesellschafterliste, für jeden Gesellschafter ein eigenes Schreiben.
- Versammlungsart, Datum mit Wochentag, Uhrzeit, Ort mit Raum oder die Videokonferenz-Variante.
- Tagesordnung: Bilanzstichtag und Ergebnis, Vorschlag zur Ergebnisverwendung, Namen der zu entlastenden Geschäftsführer, bei Bestellung Name, Beginn, Vertretungsbefugnis und § 181 BGB; nicht benötigte Punkte löschen, Nummerierung anpassen.
- Hinweise: welche Unterlagen beiliegen, die Frist laut Satzung oder Gesetz, der Stichtag für Ergänzungsanträge (mindestens drei Tage vor der Versammlung), die Rückmeldefrist und E-Mail-Adresse für die Videoteilnahme, das Quorum aus der Satzung.
- Anlagen: Jahresabschluss, Ergebnisverwendungsvorschlag, Vertragsentwürfe, Vollmachtsformular und Verzichtserklärung beilegen.

Rechne die Frist vom Zugang rückwärts: Tag des Zugangs und Tag der Versammlung zählen nicht, dazu zwei bis drei Tage Postlauf. Versende per Einschreiben und bewahre den Einlieferungsbeleg auf. Die Vorlage gibt es als Word zum Anpassen und als PDF zum Ausdrucken.`,
      },
      {
        titel: "Häufige Fehler bei der Einberufung und ihre Folgen",
        text: `Der häufigste Fehler ist die zu knappe Frist. Wer am Montag einlädt und am Freitag tagen will, verletzt die Wochenfrist des § 51 GmbHG, erst recht die oft längere Satzungsfrist. Folge: Jeder Beschluss ist anfechtbar.

Fehler zwei: Einladung nur per E-Mail, obwohl die Satzung schweigt. Dann gilt das gesetzliche Einschreiben, und ein Gesellschafter, der nicht erscheint, kann die Beschlüsse kippen. Fehler drei: Ein Gesellschafter wird gar nicht geladen, etwa weil die Gesellschafterliste veraltet ist. Dann sind die Beschlüsse nichtig, nicht nur anfechtbar.

Fehler vier: Beschlussgegenstände, die nicht angekündigt waren. Über sie darf nur beschlossen werden, wenn alle Gesellschafter anwesend sind und niemand widerspricht. Fehler fünf: die Einladung unterschreibt ein Prokurist oder ein einzelner Geschäftsführer, obwohl Gesamtvertretung besteht. Einberufungsberechtigt ist die Geschäftsführung in vertretungsberechtigter Zahl, bei Minderheitsverlangen nach § 50 Abs. 3 GmbHG die Gesellschafter selbst. Sichere dich doppelt ab: E-Mail vorab für die Terminabstimmung, Einschreiben für die Form, und bitte alle um die Verzichtserklärung, dann ist jeder Formfehler geheilt.`,
      },
      {
        titel: "Rechtliche Grundlagen: §§ 49 bis 51 GmbHG",
        text: `Die Gesellschafterversammlung wird von den Geschäftsführern einberufen (§ 49 Abs. 1 GmbHG), und zwar immer dann, wenn das Interesse der Gesellschaft es erfordert, insbesondere bei Verlust der Hälfte des Stammkapitals (§ 49 Abs. 3 GmbHG). Gesellschafter mit zusammen mindestens zehn Prozent des Stammkapitals können die Einberufung unter Angabe von Zweck und Gründen verlangen und bei Untätigkeit selbst einberufen (§ 50 GmbHG).

Form und Frist regelt § 51 GmbHG: eingeschriebener Brief, Frist mindestens eine Woche, Ankündigung der Beschlussgegenstände mindestens drei Tage vor der Versammlung. Die Satzung darf die Form erleichtern, etwa auf E-Mail, und die Frist verlängern; sie geht dann vor. Nicht ordnungsgemäß einberufene Versammlungen können nur beschließen, wenn alle Gesellschafter anwesend sind (§ 51 Abs. 3 GmbHG).

Seit 2023 erlaubt § 48 Abs. 1 Satz 2 GmbHG die Versammlung per Video- oder Telefonkonferenz, wenn alle Gesellschafter in Textform zustimmen oder die Satzung es vorsieht. Vertretung ist nach allgemeinen Regeln mit schriftlicher Vollmacht möglich (§ 47 Abs. 3 GmbHG). Die Anfechtungsfrist für Beschlüsse ist im GmbHG nicht geregelt; die Rechtsprechung orientiert sich an der Monatsfrist des Aktienrechts, viele Satzungen legen sie ausdrücklich fest.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht",
        text: `Das Einladungsschreiben passt für die normale GmbH oder UG ohne Aufsichtsrat. Zieh einen Anwalt hinzu, wenn

- die Versammlung einen Streit vorbereitet, etwa die Abberufung eines Gesellschafter-Geschäftsführers, die Einziehung eines Anteils oder den Ausschluss eines Gesellschafters; dort entscheidet jede Formalie,
- Beschlüsse mit Beurkundungspflicht anstehen (Satzungsänderung, Kapitalmaßnahmen, Umwandlung); dann muss der Notar den Termin wahrnehmen und die Einladung darauf abgestimmt sein,
- ein Gesellschafter verstorben ist und Erben oder ein Testamentsvollstrecker zu laden sind,
- ein Gesellschafter im Ausland wohnt und die Zustellung per Einschreiben unsicher ist,
- die Satzung besondere Einberufungsrechte für Investoren, Beiräte oder einen Aufsichtsrat vorsieht.

Bei einer Zweipersonen-GmbH mit Dauerstreit ist die Einladung oft nur der erste Schritt; die Beschlussfassung selbst sollte dann ein Anwalt begleiten. GründerX bietet mit dieser Vorlage ein Software-Muster und keine Rechtsberatung. Für die reguläre Jahresversammlung und unstreitige Beschlüsse reicht das Muster als Word oder PDF, zusammen mit dem Protokoll aus dieser Kategorie.`,
      },
    ],
    seo: {
      title: "Einladung Gesellschafterversammlung Vorlage | GründerX",
      description:
        "Vorlage für die Einladung zur Gesellschafterversammlung (GmbH, UG): Tagesordnung, Frist, Form, Vertretung, Videoteilnahme und Hinweise nach § 51 GmbHG.",
    },
    stand: "2026-10",
    text: `Einladung zur [ordentlichen / außerordentlichen] Gesellschafterversammlung

[Name] [GmbH / UG (haftungsbeschränkt)]
[Straße, PLZ Ort]
Amtsgericht [Ort], HRB [Nummer]

Per Einschreiben [und vorab per E-Mail]

An
[Vorname Nachname]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Einladung zur [ordentlichen / außerordentlichen] Gesellschafterversammlung der [Name] [GmbH / UG (haftungsbeschränkt)]

Sehr geehrte(r) [Frau / Herr] [Nachname],

als Geschäftsführung der [Name] [GmbH / UG (haftungsbeschränkt)] laden wir Sie gemäß § 49 Abs. 1 und § 51 GmbHG [sowie § [Nummer] des Gesellschaftsvertrags] zur [ordentlichen / außerordentlichen] Gesellschafterversammlung ein.

Datum: [Wochentag], [Datum]
Beginn: [Uhrzeit] Uhr
Ort: Geschäftsräume der Gesellschaft, [Straße, PLZ Ort], [Raum]
[Alternativ: Videokonferenz über [Plattform]; die Zugangsdaten erhalten Sie spätestens einen Tag vor der Versammlung per E-Mail.]

Tagesordnung

1. Eröffnung, Feststellung der ordnungsgemäßen Einberufung und der Beschlussfähigkeit, Wahl des Versammlungsleiters und des Protokollführers

2. Vorlage und Erläuterung des Jahresabschlusses zum 31.12.[Jahr] durch die Geschäftsführung
   Beschlussvorschlag: Der Jahresabschluss zum 31.12.[Jahr], der mit einem Jahresüberschuss / Jahresfehlbetrag von [Betrag] EUR abschließt, wird festgestellt.

3. Verwendung des Ergebnisses
   Beschlussvorschlag: [z. B. „Der Bilanzgewinn von [Betrag] EUR wird in Höhe von [Betrag] EUR ausgeschüttet und im Übrigen auf neue Rechnung vorgetragen.“ / „Der Jahresfehlbetrag wird auf neue Rechnung vorgetragen.“]

4. Entlastung der Geschäftsführung für das Geschäftsjahr [Jahr]
   Beschlussvorschlag: Der Geschäftsführung wird Entlastung erteilt.

5. [z. B. Bestellung eines weiteren Geschäftsführers]
   Beschlussvorschlag: [Vorname Nachname] wird mit Wirkung zum [Datum] zum Geschäftsführer bestellt, [einzelvertretungsberechtigt und von § 181 BGB befreit].

6. [z. B. Zustimmung zum Abschluss des Mietvertrags über [Objekt] / Erhöhung des Stammkapitals auf [Betrag] EUR (notarielle Beurkundung in gesondertem Termin) / Beschluss über Gesellschafterdarlehen]
   Beschlussvorschlag: [Text]

7. Verschiedenes (ohne Beschlussfassung)

Hinweise

Unterlagen: Der Jahresabschluss zum 31.12.[Jahr] [mit Lagebericht], der Vorschlag zur Ergebnisverwendung sowie [weitere Unterlagen, z. B. Entwurf des Mietvertrags] liegen dieser Einladung bei [oder: liegen ab sofort in den Geschäftsräumen der Gesellschaft zur Einsicht aus und werden auf Wunsch elektronisch übersandt].

Frist und Form: Diese Einladung wird mit einer Frist von [mindestens einer Woche / zwei Wochen] gemäß [§ 51 Abs. 1 GmbHG / § [Nummer] des Gesellschaftsvertrags] durch eingeschriebenen Brief versandt. Die Gegenstände der Tagesordnung sind hiermit gemäß § 51 Abs. 2 und 4 GmbHG angekündigt. Ergänzungen zur Tagesordnung können bis zum [Datum, mindestens drei Tage vor der Versammlung] schriftlich bei der Geschäftsführung beantragt werden; sie werden allen Gesellschaftern unverzüglich mitgeteilt.

Vertretung: Sie können sich durch einen anderen Gesellschafter oder durch einen zur Berufsverschwiegenheit verpflichteten Dritten (Rechtsanwalt, Steuerberater, Wirtschaftsprüfer) mit schriftlicher Vollmacht vertreten lassen. Ein Vollmachtsformular liegt bei. Die Vollmacht ist spätestens zu Beginn der Versammlung im Original vorzulegen.

Teilnahme per Video oder Telefon: Gemäß § 48 Abs. 1 Satz 2 GmbHG kann die Versammlung ganz oder teilweise per Video- oder Telefonkonferenz abgehalten werden, wenn alle Gesellschafter sich damit in Textform einverstanden erklären [oder die Satzung dies vorsieht]. Bitte teilen Sie uns bis zum [Datum] per E-Mail an [E-Mail-Adresse] mit, ob Sie dieser Form zustimmen und ob Sie persönlich oder digital teilnehmen.

Beschlussfähigkeit: Die Versammlung ist beschlussfähig, wenn [mindestens [Prozent] % des Stammkapitals anwesend oder vertreten sind / nach dem Gesellschaftsvertrag keine besonderen Anforderungen gelten]. Sollte die Versammlung nicht beschlussfähig sein, wird eine zweite Versammlung mit gleicher Tagesordnung einberufen, die unabhängig vom vertretenen Stammkapital beschlussfähig ist.

Verzicht auf Form und Frist: Sofern Sie auf die Einhaltung der Einberufungsfrist und -form verzichten möchten, können Sie dies durch Rücksendung der beiliegenden Verzichtserklärung tun. Dies ermöglicht gegebenenfalls einen früheren Termin.

Bitte bestätigen Sie den Erhalt dieser Einladung und Ihre Teilnahme bis zum [Datum] per E-Mail an [E-Mail-Adresse] oder telefonisch unter [Telefonnummer].

Mit freundlichen Grüßen

[Name] [GmbH / UG (haftungsbeschränkt)]


______________________________
[Vorname Nachname], Geschäftsführer


[______________________________
[Vorname Nachname], Geschäftsführer]

Anlagen:
– Jahresabschluss zum 31.12.[Jahr] [mit Lagebericht]
– Vorschlag zur Ergebnisverwendung
– [Entwurf Mietvertrag / Lebenslauf des vorgeschlagenen Geschäftsführers / Entwurf Darlehensvertrag]
– Vollmachtsformular
– Verzichtserklärung auf Form und Frist

Verteiler: alle Gesellschafter gemäß Gesellschafterliste vom [Datum]; Beschlussbuch der Gesellschaft

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "protokoll-gesellschafterversammlung",
    titel: "Protokoll der Gesellschafterversammlung",
    kurz: "Niederschrift einer Gesellschafterversammlung für GmbH oder UG: Anwesende, Einberufung, Beschlussfähigkeit, Beschlüsse mit Abstimmungsergebnis und Unterschriften.",
    kategorie: "gesellschaft",
    dateiname: "Protokoll-Gesellschafterversammlung",
    wofuer: [
      "Jede Gesellschafterversammlung einer GmbH oder UG gerichtsfest dokumentieren",
      "Nachweis von Beschlüssen gegenüber Handelsregister, Bank, Finanzamt und Investoren",
      "Wenn Beschlüsse angefochten werden könnten und das Abstimmungsverhalten festgehalten werden muss",
      "Als Ablage im Beschlussbuch der Gesellschaft",
    ],
    enthaelt: [
      "Kopf: Gesellschaft, Ort, Datum, Beginn und Ende",
      "1. Teilnehmer, Vertretungen und vertretenes Stammkapital",
      "2. Versammlungsleitung und Protokollführung",
      "3. Einberufung und Beschlussfähigkeit",
      "4. Beschlüsse zu den Tagesordnungspunkten mit Abstimmungsergebnis",
      "5. Widersprüche und Erklärungen zu Protokoll",
      "6. Schluss der Versammlung",
      "Unterschriften und Verteiler",
    ],
    hinweise: [
      "Das GmbHG schreibt für die normale Gesellschafterversammlung kein Protokoll vor, aber ohne Niederschrift ist ein Beschluss kaum beweisbar. Viele Satzungen verlangen das Protokoll ausdrücklich und knüpfen die Anfechtungsfrist an den Zugang.",
      "Beschlüsse, die der notariellen Beurkundung bedürfen (Satzungsänderung, Kapitalerhöhung, Auflösung, Umwandlung), werden vom Notar protokolliert; dieses Protokoll ersetzt den Notar nicht.",
      "Halte das Abstimmungsverhalten und Widersprüche einzelner Gesellschafter namentlich fest. Wer einem Beschluss nicht widerspricht, verliert in vielen Fällen die Möglichkeit, ihn später anzufechten.",
      "Bei der Einpersonen-GmbH muss der Alleingesellschafter jeden Beschluss unverzüglich schriftlich niederlegen und unterschreiben (§ 48 Abs. 3 GmbHG).",
    ],
    faqs: [
      {
        q: "Wer muss das Protokoll unterschreiben?",
        a: "Mindestens der Versammlungsleiter und der Protokollführer, so sieht es die Vorlage vor. Satzungen können die Unterschrift aller anwesenden Gesellschafter verlangen. Je mehr Unterschriften, desto stärker die Beweiskraft; verweigert ein Gesellschafter die Unterschrift, wird das im Protokoll vermerkt.",
      },
      {
        q: "Wie schnell muss das Protokoll verschickt werden?",
        a: "Gesetzlich gibt es keine Frist, aber die Anfechtungsfrist für Beschlüsse (in Anlehnung an das Aktienrecht ein Monat) beginnt nach vielen Satzungen erst mit Zugang des Protokolls. Deshalb sollte die Niederschrift innerhalb von zwei Wochen an alle Gesellschafter gehen, auch an die abwesenden.",
      },
      {
        q: "Was passiert, wenn die Einberufung fehlerhaft war?",
        a: "Sind alle Gesellschafter anwesend oder vertreten und widerspricht niemand der Beschlussfassung, ist der Mangel geheilt (§ 51 Abs. 3 GmbHG). Das Protokoll sollte diesen Verzicht ausdrücklich festhalten. Fehlt ein Gesellschafter und wurde er nicht ordnungsgemäß geladen, sind die Beschlüsse nichtig.",
      },
      {
        q: "Können wir das Protokoll auch für eine Videokonferenz nutzen?",
        a: "Ja. Die Vorlage hat ein Feld für die Form der Versammlung und die Zustimmung der Gesellschafter zur Videokonferenz nach § 48 Abs. 1 Satz 2 GmbHG. Halte fest, wer digital teilgenommen hat und wie die Identität geprüft wurde.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann brauchst du ein Protokoll der Gesellschafterversammlung?",
        text: `Nach jeder Gesellschafterversammlung einer GmbH oder UG. Das Gesetz schreibt die Niederschrift für die normale Versammlung zwar nicht vor, aber ohne Protokoll gibt es keinen Beweis, dass ein Beschluss gefasst wurde, mit welcher Mehrheit und ob jemand widersprochen hat. Genau danach fragen später Handelsregister, Bank, Finanzamt, Investoren und im Streitfall das Gericht.

Besonders wichtig ist das Protokoll, wenn Beschlüsse angefochten werden könnten, wenn ein Geschäftsführer bestellt oder abberufen wird, wenn Ausschüttungen beschlossen werden und wenn die Versammlung per Video stattfand. Viele Satzungen knüpfen außerdem die Anfechtungsfrist an den Zugang des Protokolls, sodass ohne Niederschrift die Frist nie zu laufen beginnt. Die Vorlage deckt alle Bestandteile ab: Teilnehmer, vertretenes Kapital, Einberufung, Beschlussfähigkeit, Beschlüsse mit Abstimmungsergebnis, Widersprüche, Schluss, Unterschriften und Verteiler.`,
      },
      {
        titel: "Was gehört in das Protokoll einer GmbH-Gesellschafterversammlung?",
        text: `Ein brauchbares Protokoll ist ein Ergebnisprotokoll mit den Feststellungen, die Beschlüsse tragen. Die Vorlage gliedert sich in sechs Abschnitte:

- Kopf: Gesellschaft mit HRB-Nummer, Ort oder Plattform, Datum, Beginn und Ende
- 1. Teilnehmer: jeder Gesellschafter mit Anteilen und Prozent, ob persönlich, per Video oder durch Bevollmächtigten vertreten, Geschäftsführer und Gäste, Abwesende und das vertretene Stammkapital in Euro und Prozent
- 2. Wahl von Versammlungsleiter und Protokollführer
- 3. Feststellung der ordnungsgemäßen Einberufung mit Datum und Zustellform, alternativ die Vollversammlung mit Verzicht nach § 51 Abs. 3 GmbHG, bei Videokonferenz die Zustimmungen nach § 48 Abs. 1 Satz 2 GmbHG und die Identitätsprüfung, sowie die Beschlussfähigkeit
- 4. Beschlüsse je Tagesordnungspunkt mit Wortlaut, Ja- und Nein-Stimmen, Enthaltungen und Feststellung des Ergebnisses; bei der Entlastung der Hinweis auf das Stimmverbot nach § 47 Abs. 4 GmbHG
- 5. Widersprüche und Erklärungen einzelner Gesellschafter zu Protokoll
- 6. Schluss, Versandfrist, Einwendungsfrist, Ablage im Beschlussbuch

Dazu Unterschriften von Versammlungsleiter und Protokollführer, optional aller Gesellschafter, und die Anlagen mit Teilnehmerliste, Vollmachten und Jahresabschluss.`,
      },
      {
        titel: "Protokoll Gesellschafterversammlung Muster ausfüllen",
        text: `Fülle das Protokoll am besten noch während der Versammlung aus, dann sind die Zahlen frisch:

- Kopf: Versammlungsart, Firma, Sitz, Amtsgericht, HRB, Ort oder Plattform, Datum und Uhrzeiten.
- Abschnitt 1: für jeden Gesellschafter Name, Anzahl der Anteile, Nennbetrag, Prozent und die Art der Teilnahme; bei Vertretung Name des Bevollmächtigten und Datum der Vollmacht. Abwesende eintragen oder das Wort niemand setzen. Das vertretene Kapital addieren.
- Abschnitt 2: Uhrzeit der Eröffnung, Namen von Versammlungsleiter und Protokollführer.
- Abschnitt 3: Datum und Form der Einladung und die Frist, oder die Vollversammlungs-Alternative; nicht zutreffende Varianten löschen. Den Prozentsatz für die Beschlussfähigkeit und die Satzungsnorm eintragen.
- Abschnitt 4: Bei TOP 1 Bilanzsumme und Ergebnis, bei TOP 2 die Aufteilung des Bilanzgewinns, bei TOP 3 den Namen des Geschäftsführers und die Abstimmung ohne seine Stimmen, bei TOP 4 die Daten des neuen Geschäftsführers. Bei jedem TOP Ja, Nein, Enthaltungen in Zahlen und Prozent.
- Abschnitt 5 und 6: Widersprüche mit Begründung oder den Satz, dass keine erhoben wurden; Uhrzeit des Schlusses, Versand- und Einwendungsfrist.

Unterschreiben lassen, innerhalb von zwei Wochen an alle Gesellschafter senden, auch an die abwesenden, und im Beschlussbuch ablegen. Die Word-Fassung lässt sich als Vorlage für jede weitere Versammlung speichern.`,
      },
      {
        titel: "Typische Fehler im Versammlungsprotokoll",
        text: `Fehler eins: Das Protokoll hält nur fest, dass beschlossen wurde, nicht wie. Ohne Stimmenzahlen lässt sich die Mehrheit nicht nachweisen, und bei Dreiviertelmehrheiten ist das entscheidend. Fehler zwei: Widersprüche werden weggelassen, um Harmonie zu zeigen. Ein Gesellschafter, dessen Widerspruch nicht protokolliert ist, kann später behaupten, er sei übergangen worden; ein Gesellschafter, der nicht widersprochen hat, verliert oft die Anfechtungsmöglichkeit. Beides gehört ins Protokoll.

Fehler drei: Der Gesellschafter-Geschäftsführer wird bei der eigenen Entlastung mitgezählt. Die Vorlage sieht dafür eine getrennte Abstimmungszeile vor. Fehler vier: Bei Videokonferenzen fehlt der Nachweis, dass alle Gesellschafter in Textform zugestimmt haben und wie die Identität geprüft wurde; das macht die Beschlüsse angreifbar.

Fehler fünf: Das Protokoll wird nie verschickt. Dann beginnt nach vielen Satzungen die Anfechtungsfrist nicht, und Beschlüsse bleiben jahrelang angreifbar. Fehler sechs: Beschlüsse, die der Beurkundung bedürfen, werden nur privat protokolliert. Satzungsänderungen, Kapitalerhöhungen, Umwandlung und Auflösung sind ohne notarielles Protokoll nichtig. Nutze die private Niederschrift für alles andere, aber nicht als Ersatz für den Notar.`,
      },
      {
        titel: "Rechtliche Grundlagen der Niederschrift",
        text: `Das GmbH-Gesetz regelt das Protokoll nur an einer Stelle ausdrücklich: Bei der Einpersonen-GmbH muss der Alleingesellschafter jeden Beschluss unverzüglich nach der Beschlussfassung schriftlich niederlegen und unterschreiben (§ 48 Abs. 3 GmbHG). Für alle anderen Gesellschaften folgt die Protokollpflicht aus der Satzung oder aus dem praktischen Beweisbedürfnis, nicht aus dem Gesetz.

Beurkundungspflichtige Beschlüsse werden vom Notar in einer notariellen Niederschrift festgehalten (§ 53 Abs. 2 GmbHG für Satzungsänderungen); das private Protokoll ersetzt diese nicht. Für die Beschlussfähigkeit gilt, was die Satzung sagt; das Gesetz kennt kein Quorum. Stimmverbote ergeben sich aus § 47 Abs. 4 GmbHG, etwa bei Entlastung, Befreiung von einer Verbindlichkeit oder Rechtsgeschäften mit dem Gesellschafter.

Die Anfechtung fehlerhafter Beschlüsse erfolgt durch Klage gegen die Gesellschaft; die Frist wird in Anlehnung an § 246 AktG mit einem Monat angesetzt, kann aber durch die Satzung geregelt sein. Das Protokoll gehört zu den Geschäftsunterlagen, für die handelsrechtlich eine Aufbewahrung von zehn Jahren üblich ist. Bei einer Videokonferenz sichert § 48 Abs. 1 Satz 2 GmbHG die Zulässigkeit, sofern alle Gesellschafter in Textform zugestimmt haben oder die Satzung es erlaubt.`,
      },
      {
        titel: "Wann das Protokoll-Muster nicht ausreicht",
        text: `Die Vorlage reicht für die normale Versammlung einer GmbH oder UG mit unstreitigen Beschlüssen. Sie reicht nicht, wenn

- Satzungsänderungen, Kapitalerhöhungen, Verschmelzungen oder die Auflösung beschlossen werden; dann protokolliert der Notar,
- die Versammlung Streit erwartet, etwa die Abberufung eines Gesellschafter-Geschäftsführers aus wichtigem Grund, den Ausschluss eines Gesellschafters oder die Einziehung von Anteilen; hier sollte ein Anwalt die Versammlung leiten oder zumindest den Beschlusstext vorab prüfen,
- Gesellschafter durch Erben, Testamentsvollstrecker, Insolvenzverwalter oder Pfandgläubiger vertreten werden,
- die Satzung ein Protokoll mit Unterschrift aller Gesellschafter oder eine besondere Form verlangt und ein Gesellschafter die Unterschrift verweigert,
- die Gesellschaft einen Aufsichtsrat hat, dessen Mitwirkung dokumentiert werden muss.

In diesen Fällen ist das Protokoll Teil einer Auseinandersetzung, und jede Formulierung kann vor Gericht landen. Für den Alltag ist das Muster als Word oder PDF ausreichend, am besten zusammen mit der Einladung und dem Umlaufbeschluss aus dieser Kategorie. GründerX liefert die Vorlage als Software-Dokument; eine Rechtsberatung ist damit nicht verbunden.`,
      },
    ],
    seo: {
      title: "Protokoll Gesellschafterversammlung Vorlage | GründerX",
      description:
        "Vorlage für das Protokoll einer Gesellschafterversammlung (GmbH, UG): Anwesende, Beschlussfähigkeit, Beschlüsse mit Abstimmungsergebnis, Unterschriften.",
    },
    stand: "2026-10",
    text: `Protokoll der [ordentlichen / außerordentlichen] Gesellschafterversammlung

der [Name] [GmbH / UG (haftungsbeschränkt)] mit Sitz in [Ort], Amtsgericht [Ort], HRB [Nummer]

Ort: [Geschäftsräume der Gesellschaft, Straße, PLZ Ort / Videokonferenz über [Plattform]]
Datum: [Datum]
Beginn: [Uhrzeit] Uhr   Ende: [Uhrzeit] Uhr

1. Teilnehmer und vertretenes Stammkapital
Anwesend sind:
   a) [Vorname Nachname], Gesellschafter, [Anzahl] Geschäftsanteile, Nennbetrag [Betrag] EUR ([Prozent] %), [persönlich anwesend / per Video zugeschaltet]
   b) [Vorname Nachname], Gesellschafter, [Anzahl] Geschäftsanteile, Nennbetrag [Betrag] EUR ([Prozent] %), vertreten durch [Vorname Nachname] aufgrund schriftlicher Vollmacht vom [Datum], die im Original vorliegt
   c) [Vorname Nachname], Geschäftsführer (ohne Stimmrecht, soweit nicht Gesellschafter)
   d) [ggf. Gäste: Steuerberater [Name], Rechtsanwalt [Name], mit Zustimmung aller Gesellschafter]
Nicht anwesend und nicht vertreten: [Vorname Nachname], [Anzahl] Geschäftsanteile ([Prozent] %) [/ „niemand“].
Vom Stammkapital in Höhe von [Betrag] EUR sind damit [Betrag] EUR ([Prozent] %) anwesend oder vertreten.

2. Versammlungsleitung und Protokollführung
Die Versammlung wird um [Uhrzeit] Uhr von [Vorname Nachname] eröffnet. Auf Vorschlag von [Name] wird [Vorname Nachname] einstimmig zum Versammlungsleiter und [Vorname Nachname] zum Protokollführer gewählt.

3. Einberufung und Beschlussfähigkeit
Der Versammlungsleiter stellt fest, dass die Einladung mit Tagesordnung allen Gesellschaftern am [Datum] durch [eingeschriebenen Brief / E-Mail gemäß § [Nummer] des Gesellschaftsvertrags] zugegangen ist und die Frist von [einer Woche / zwei Wochen] gewahrt wurde. Die Versammlung ist ordnungsgemäß einberufen.
[Alternative: Sämtliche Gesellschafter sind anwesend oder vertreten und erklären sich mit der Abhaltung der Versammlung und der Beschlussfassung über die nachstehenden Gegenstände einverstanden; sie verzichten auf die Einhaltung aller Form- und Fristvorschriften für Einberufung und Ankündigung (§ 51 Abs. 3 GmbHG).]
[Bei Videokonferenz: Alle Gesellschafter haben der Abhaltung per Videokonferenz in Textform zugestimmt (§ 48 Abs. 1 Satz 2 GmbHG); die Zustimmungen liegen dem Protokoll als Anlage bei. Die Identität der zugeschalteten Teilnehmer wurde durch [Bild und Ton / Vorlage des Ausweises] festgestellt.]
Mit [Prozent] % des Stammkapitals ist die Versammlung gemäß [§ [Nummer] des Gesellschaftsvertrags / Gesetz] beschlussfähig. Kein Gesellschafter widerspricht dieser Feststellung.

4. Beschlüsse

TOP 1: Feststellung des Jahresabschlusses zum 31.12.[Jahr]
Die Geschäftsführung erläutert den Jahresabschluss, der mit einer Bilanzsumme von [Betrag] EUR und einem Jahresüberschuss / Jahresfehlbetrag von [Betrag] EUR abschließt. Fragen der Gesellschafter zu [Thema] werden beantwortet.
Beschluss: Der Jahresabschluss zum 31.12.[Jahr] wird festgestellt.
Abstimmung: Ja-Stimmen: [Anzahl] ([Prozent] %), Nein-Stimmen: [Anzahl], Enthaltungen: [Anzahl]. Der Beschluss ist [einstimmig / mit der erforderlichen Mehrheit] gefasst.

TOP 2: Verwendung des Ergebnisses
Beschluss: Der Bilanzgewinn in Höhe von [Betrag] EUR wird wie folgt verwendet: [Einstellung in die gesetzliche Rücklage (UG): [Betrag] EUR; Ausschüttung an die Gesellschafter im Verhältnis der Geschäftsanteile: [Betrag] EUR, fällig am [Datum]; Vortrag auf neue Rechnung: [Betrag] EUR].
Abstimmung: Ja-Stimmen: [Anzahl] ([Prozent] %), Nein-Stimmen: [Anzahl], Enthaltungen: [Anzahl]. Der Beschluss ist gefasst.

TOP 3: Entlastung der Geschäftsführung für das Geschäftsjahr [Jahr]
Der Versammlungsleiter weist darauf hin, dass [Vorname Nachname] als betroffener Geschäftsführer bei seiner Entlastung kein Stimmrecht hat (§ 47 Abs. 4 GmbHG).
Beschluss: Dem Geschäftsführer [Vorname Nachname] wird für das Geschäftsjahr [Jahr] Entlastung erteilt.
Abstimmung (ohne die Stimmen von [Name]): Ja-Stimmen: [Anzahl] ([Prozent] % der stimmberechtigten Stimmen), Nein-Stimmen: [Anzahl], Enthaltungen: [Anzahl]. Der Beschluss ist gefasst.

TOP 4: [z. B. Bestellung eines Geschäftsführers]
Beschluss: [Vorname Nachname], geboren am [Datum], wohnhaft [Anschrift], wird mit Wirkung zum [Datum] zum Geschäftsführer bestellt. Er / sie ist [einzelvertretungsberechtigt / gemeinsam mit einem weiteren Geschäftsführer vertretungsberechtigt] und [von den Beschränkungen des § 181 BGB befreit]. Die Geschäftsführung wird angewiesen, die Anmeldung zum Handelsregister unverzüglich zu veranlassen.
Abstimmung: Ja-Stimmen: [Anzahl] ([Prozent] %), Nein-Stimmen: [Anzahl], Enthaltungen: [Anzahl]. Der Beschluss ist gefasst.

TOP 5: [z. B. Zustimmung zu einem Geschäft nach § [Nummer] des Gesellschaftsvertrags]
Beschluss: [Text des Beschlusses].
Abstimmung: Ja-Stimmen: [Anzahl] ([Prozent] %), Nein-Stimmen: [Anzahl], Enthaltungen: [Anzahl]. Der Beschluss ist [gefasst / abgelehnt].

TOP 6: Verschiedenes
[z. B. „Die Geschäftsführung berichtet über den Stand der Verhandlungen mit [Partner]. Beschlüsse werden hierzu nicht gefasst.“ / „Gesellschafter [Name] regt an, die nächste Versammlung am [Datum] abzuhalten.“]

5. Widersprüche und Erklärungen zu Protokoll
[„Kein Gesellschafter hat gegen einen Beschluss Widerspruch zu Protokoll erklärt.“ / „Gesellschafter [Name] erklärt zu TOP [Nummer] Widerspruch zu Protokoll und begründet dies mit [Begründung].“]

6. Schluss der Versammlung
Weitere Anträge liegen nicht vor. Der Versammlungsleiter schließt die Versammlung um [Uhrzeit] Uhr. Dieses Protokoll wird allen Gesellschaftern innerhalb von [z. B. zwei Wochen] in Kopie übersandt [per E-Mail an die hinterlegten Adressen] und im Beschlussbuch der Gesellschaft abgelegt. Einwendungen gegen den Inhalt des Protokolls sind innerhalb von [z. B. zwei Wochen] nach Zugang schriftlich gegenüber der Geschäftsführung zu erheben.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Versammlungsleiter


______________________________
[Vorname Nachname], Protokollführer


[Zustimmende Unterschriften der anwesenden Gesellschafter:

______________________________
[Vorname Nachname]

______________________________
[Vorname Nachname]]

Anlagen: Teilnehmerliste, Vollmachten, [Zustimmungen zur Videokonferenz], Jahresabschluss zum 31.12.[Jahr]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "geschaeftsfuehrer-anstellungsvertrag",
    titel: "Geschäftsführer-Anstellungsvertrag (GmbH/UG)",
    kurz: "Anstellungsvertrag für Fremd- und Gesellschafter-Geschäftsführer einer GmbH oder UG: Vergütung, Tantieme, Dienstwagen, Urlaub, Wettbewerbsverbot, D&O, Kündigung und Fremdvergleich.",
    kategorie: "gesellschaft",
    dateiname: "Geschaeftsfuehrer-Anstellungsvertrag",
    wofuer: [
      "Gründer, die sich als Gesellschafter-Geschäftsführer ein Gehalt zahlen und es steuerlich absichern wollen",
      "Einstellung eines Fremdgeschäftsführers ohne Beteiligung",
      "Wenn Tantieme, Dienstwagen oder Wettbewerbsverbot schriftlich festgehalten werden müssen",
      "Als Nachweis für das Finanzamt (Fremdvergleich) und die Rentenversicherung (Statusfeststellung)",
    ],
    enthaelt: [
      "§ 1 Bestellung, Aufgaben und Vertretung",
      "§ 2 Pflichten, Zustimmungsvorbehalte und Berichtswesen",
      "§ 3 Arbeitszeit, Arbeitsort und Nebentätigkeit",
      "§ 4 Vergütung und Tantieme",
      "§ 5 Dienstwagen, Auslagen, Versicherungen (D&O)",
      "§ 6 Vergütung bei Krankheit und Tod",
      "§ 7 Urlaub",
      "§ 8 Vertraulichkeit, Herausgabe, Erfindungen",
      "§ 9 Wettbewerbsverbot während und nach der Tätigkeit",
      "§ 10 Haftung",
      "§ 11 Vertragsdauer und Kündigung",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Für Gesellschafter-Geschäftsführer gilt der Fremdvergleich: Der Vertrag muss vorab, schriftlich, klar und wie unter Fremden abgeschlossen und tatsächlich durchgeführt werden. Sonst behandelt das Finanzamt Gehalt, Tantieme oder Dienstwagen als verdeckte Gewinnausschüttung (§ 8 Abs. 3 KStG). Rückwirkende Erhöhungen sind tabu.",
      "Der Vertrag wird von der Gesellschafterversammlung abgeschlossen, nicht von einem Mitgeschäftsführer (§ 46 Nr. 5 GmbHG). Ein Alleingesellschafter-Geschäftsführer braucht zusätzlich die Befreiung von § 181 BGB in der Satzung und muss den Beschluss protokollieren.",
      "Sozialversicherung: Ein Geschäftsführer mit mindestens 50 % der Anteile oder einer umfassenden Sperrminorität ist in der Regel nicht sozialversicherungspflichtig; Minderheitsgesellschafter und Fremdgeschäftsführer meist schon. Lasse den Status über das Statusfeststellungsverfahren bei der Deutschen Rentenversicherung (§ 7a SGB IV) klären, sonst drohen Nachzahlungen für vier Jahre.",
      "Die Tantieme sollte als fester Prozentsatz vom Jahresüberschuss vor Steuern geregelt und nach oben gedeckelt sein. Die Finanzverwaltung sieht Gesamt-Tantiemen über 50 % des Jahresüberschusses und einen Tantieme-Anteil über 25 % der Gesamtvergütung als Indiz für eine verdeckte Gewinnausschüttung.",
      "Das Kündigungsschutzgesetz gilt für Geschäftsführer nicht. Schutz bietet nur die vertragliche Kündigungsfrist; die Abberufung als Organ ist davon unabhängig jederzeit möglich (§ 38 GmbHG).",
    ],
    faqs: [
      {
        q: "Ist der Geschäftsführer Arbeitnehmer?",
        a: "Nein, der Anstellungsvertrag ist ein Dienstvertrag. Arbeitnehmerschutzgesetze wie Kündigungsschutz, Arbeitszeitgesetz oder Bundesurlaubsgesetz gelten nicht unmittelbar. Deshalb regelt die Vorlage Urlaub, Entgeltfortzahlung und Kündigungsfristen ausdrücklich. Für Mutterschutz, Pflegezeit und ähnliche Rechte gibt es Sonderregeln.",
      },
      {
        q: "Wie hoch darf das Gehalt eines Gesellschafter-Geschäftsführers sein?",
        a: "So hoch, wie es ein fremder Geschäftsführer in vergleichbarer Position, Branche und Unternehmensgröße bekommen würde. Zu viel ist verdeckte Gewinnausschüttung, zu wenig kann in der Krise ein Indiz für fehlende Ernsthaftigkeit sein. Vergleichsstudien und die Gehaltsstrukturuntersuchungen der Finanzverwaltung helfen bei der Begründung.",
      },
      {
        q: "Brauche ich eine D&O-Versicherung?",
        a: "Pflicht ist sie nicht, aber Geschäftsführer haften der Gesellschaft gegenüber persönlich und unbegrenzt für Sorgfaltsverstöße (§ 43 GmbHG), zudem für Steuern und Sozialabgaben nach außen. Die Vorlage verpflichtet die Gesellschaft zum Abschluss; die Prämie ist Betriebsausgabe und beim Geschäftsführer kein geldwerter Vorteil, wenn die Gesellschaft im eigenen Interesse versichert.",
      },
      {
        q: "Kann die Gesellschaft den Geschäftsführer einfach abberufen?",
        a: "Ja, die Organstellung kann jederzeit durch Gesellschafterbeschluss widerrufen werden, sofern die Satzung das nicht auf wichtige Gründe beschränkt. Der Anstellungsvertrag läuft dann weiter, bis er ordentlich oder außerordentlich gekündigt ist. Die Vorlage koppelt beides: Mit der Abberufung gilt der Vertrag als zum nächstmöglichen Termin gekündigt.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann brauchst du einen Geschäftsführer-Anstellungsvertrag?",
        text: `Die Bestellung zum Geschäftsführer per Gesellschafterbeschluss macht dich zum Organ der GmbH, regelt aber weder Gehalt noch Urlaub noch Kündigungsfrist. Dafür braucht es den Anstellungsvertrag. Als Gründer, der sich aus seiner eigenen UG oder GmbH ein Gehalt zahlt, brauchst du ihn aus einem handfesten Grund: Ohne vorherigen, schriftlichen und fremdüblichen Vertrag behandelt das Finanzamt dein Gehalt als verdeckte Gewinnausschüttung, und die Gesellschaft darf es nicht als Betriebsausgabe abziehen.

Ebenso nötig ist der Vertrag, wenn ihr einen Fremdgeschäftsführer ohne Beteiligung einstellt, wenn Tantieme, Dienstwagen oder ein nachvertragliches Wettbewerbsverbot vereinbart werden sollen oder wenn die Deutsche Rentenversicherung im Statusfeststellungsverfahren prüft, ob Sozialversicherungspflicht besteht. Die Vorlage deckt beide Fälle ab, Gesellschafter-Geschäftsführer und Fremdgeschäftsführer, und enthält die Klauseln, nach denen Betriebsprüfer zuerst suchen.`,
      },
      {
        titel: "Was muss in einen Geschäftsführervertrag für GmbH und UG?",
        text: `Der Anstellungsvertrag ist ein Dienstvertrag, auf den Arbeitnehmerschutzgesetze nicht direkt anwendbar sind. Deshalb muss er mehr regeln als ein Arbeitsvertrag. Die zwölf Paragraphen der Vorlage:

- Bestellung, Vertretungsbefugnis, Befreiung von § 181 BGB und Verantwortungsbereich (§ 1)
- Zustimmungsvorbehalte, Berichtspflichten und Organisationspflichten wie Buchführung, Steuern, Datenschutz, Compliance (§ 2)
- Arbeitszeit, Dienstsitz, Nebentätigkeiten und Beteiligungen (§ 3)
- Festgehalt, Tantieme mit Bemessungsgrundlage, Deckelung und Fälligkeit, Überprüfungsrhythmus, optional Zuschüsse zur Kranken- und Altersversorgung (§ 4)
- Dienstwagen mit Versteuerung, Auslagen, D&O-Versicherung, Unfallversicherung, Geräte (§ 5)
- Entgeltfortzahlung bei Krankheit und Hinterbliebenenbezüge (§ 6)
- Urlaub und Abgeltung (§ 7)
- Vertraulichkeit, Herausgabe, Erfindungen und Nutzungsrechte (§ 8)
- Wettbewerbsverbot während und nach der Tätigkeit mit Karenzentschädigung und Vertragsstrafe (§ 9)
- Haftung nach § 43 GmbHG, Business Judgement Rule, Freistellung (§ 10)
- Laufzeit, Kündigungsfristen, Kopplung an die Abberufung, Freistellung, Altersgrenze (§ 11)
- Statusfeststellung, Schriftform, Gesellschafterbeschluss (§ 12)

Für den Gesellschafter-Geschäftsführer ist der Beschluss der Gesellschafterversammlung nach § 46 Nr. 5 GmbHG Teil des Vertrags; ohne ihn ist der Vertrag schwebend unwirksam.`,
      },
      {
        titel: "Geschäftsführervertrag Muster ausfüllen: die Platzhalter",
        text: `Gehe die Vorlage mit Satzung und Gesellschafterbeschluss neben dir durch:

- Kopf: Firma, Sitz, HRB, Name des Gesellschafters, der die Versammlung vertritt, Datum des Beschlusses; Daten des Geschäftsführers.
- § 1: Datum von Beschluss und Amtsbeginn, Vertretungsbefugnis und § 181 BGB genau wie im Handelsregister, Verantwortungsbereich.
- § 2: Schwellenwerte für zustimmungspflichtige Geschäfte und Berichtsrhythmus.
- § 3: Vollzeit oder die Teilzeit-Variante mit Wochenstunden, Dienstsitz, bestehende Nebentätigkeiten.
- § 4: Jahresfestgehalt, optional 13. Gehalt, Tantiemesatz und Deckelung, Überprüfungsrhythmus, optionale Zuschüsse. Orientiere dich am Gehalt eines fremden Geschäftsführers in Branche und Größe.
- § 5: Fahrzeugklasse oder Listenpreisgrenze, Versteuerungsmethode, D&O-Deckungssumme, Unfallversicherungssummen.
- § 6 und § 7: Monate der Gehaltsfortzahlung, Hinterbliebenenbezüge, Urlaubstage.
- § 9: Dauer und Gebiet des nachvertraglichen Wettbewerbsverbots, Höhe der Karenzentschädigung, Verzichtsfrist.
- § 11: Vertragsbeginn, unbefristet oder befristete Variante, Kündigungsfrist.
- § 12: Datum des genehmigenden Gesellschafterbeschlusses.

Unterschrieben wird für die Gesellschaft durch den von der Gesellschafterversammlung Bevollmächtigten, nie durch den Geschäftsführer selbst. Die Word-Fassung erlaubt es, die optionalen Klauseln sauber zu löschen; das PDF geht zur Ablage und an den Steuerberater.`,
      },
      {
        titel: "Typische Fehler und wie du sie vermeidest",
        text: `Fehler eins: Der Vertrag wird rückwirkend geschlossen oder das Gehalt rückwirkend erhöht. Beim Gesellschafter-Geschäftsführer ist das eine verdeckte Gewinnausschüttung, egal wie fremdüblich der Betrag ist. Alles muss vorher vereinbart und dann auch so gelebt werden: pünktliche Zahlung, keine stillen Abweichungen.

Fehler zwei: Der Alleingesellschafter-Geschäftsführer unterschreibt beide Seiten, ohne von § 181 BGB befreit zu sein, oder ohne den Beschluss nach § 48 Abs. 3 GmbHG zu protokollieren. Fehler drei: eine Tantieme ohne Deckel oder mit Umsatz als Bemessungsgrundlage. Die Finanzverwaltung erkennt Umsatztantiemen nur in Ausnahmefällen an und sieht Gesamttantiemen über 50 Prozent des Jahresüberschusses kritisch.

Fehler vier: Das nachvertragliche Wettbewerbsverbot ohne Karenzentschädigung. Für Geschäftsführer gilt § 74 HGB nicht direkt, aber ein entschädigungsloses Verbot über längere Zeit ist nach der Rechtsprechung häufig unwirksam. Fehler fünf: Der Sozialversicherungsstatus bleibt ungeklärt. Minderheitsgesellschafter und Fremdgeschäftsführer sind in der Regel versicherungspflichtig; wer das übersieht, zahlt Beiträge für vier Jahre nach. Die Vorlage verpflichtet deshalb beide Seiten zum Statusfeststellungsverfahren.`,
      },
      {
        titel: "Rechtliche und steuerliche Grundlagen",
        text: `Organstellung und Anstellung sind zwei getrennte Rechtsverhältnisse. Die Bestellung und Abberufung erfolgt durch Gesellschafterbeschluss (§ 46 Nr. 5, § 38 GmbHG) und ist jederzeit widerruflich; der Anstellungsvertrag ist ein Dienstvertrag nach §§ 611 ff. BGB, den nur eine Kündigung beendet. Zuständig für Abschluss, Änderung und Kündigung ist die Gesellschafterversammlung, nicht ein Mitgeschäftsführer.

Die Haftung richtet sich nach § 43 GmbHG: Sorgfalt eines ordentlichen Geschäftsmannes, bei Verstoß persönliche Haftung gegenüber der Gesellschaft. Nach außen haftet der Geschäftsführer für nicht abgeführte Steuern (§ 69 AO) und Sozialversicherungsbeiträge sowie bei verspätetem Insolvenzantrag (§ 15a InsO). Die Business Judgement Rule, die § 10 der Vorlage abbildet, schützt unternehmerische Entscheidungen auf angemessener Informationsgrundlage.

Steuerlich gilt für Gesellschafter-Geschäftsführer der Fremdvergleich nach § 8 Abs. 3 Satz 2 KStG: Nur was vorher klar vereinbart, angemessen und tatsächlich durchgeführt ist, bleibt Betriebsausgabe. Beim beherrschenden Gesellschafter kommt das Rückwirkungsverbot hinzu. Sozialversicherungsrechtlich entscheidet die Rechtsmacht: Wer mindestens 50 Prozent hält oder eine umfassende Sperrminorität hat, ist in der Regel nicht abhängig beschäftigt; das Statusfeststellungsverfahren nach § 7a SGB IV schafft Sicherheit. Das Kündigungsschutzgesetz gilt für Geschäftsführer nicht (§ 14 Abs. 1 KSchG).`,
      },
      {
        titel: "Wann du den Vertrag nicht ohne Berater abschließen solltest",
        text: `Beim Geschäftsführervertrag ist der Steuerberater fast immer gefragt, weil er die Angemessenheit von Gehalt und Tantieme einschätzen und die Gesamtausstattung gegen die Richtwerte der Finanzverwaltung prüfen kann. Darüber hinaus brauchst du anwaltliche Hilfe, wenn

- eine Pensionszusage oder betriebliche Altersversorgung über eine Direktversicherung hinaus vereinbart werden soll; hier drohen Rückstellungs- und Erdienbarkeitsfragen,
- der Geschäftsführer zugleich bei einer anderen Konzerngesellschaft angestellt ist oder im Ausland tätig wird,
- Investoren Vorgaben zu Vergütung, Vesting oder Leaver-Regeln machen, die mit dem Anstellungsvertrag verzahnt werden müssen,
- eine Abfindung, ein Aufhebungsvertrag oder die Trennung von einem Fremdgeschäftsführer ansteht,
- der Geschäftsführer Erfinder ist und Patente außerhalb des Arbeitnehmererfindungsgesetzes geregelt werden sollen.

Für den Gründer, der sich ein marktübliches Gehalt zahlt, einen Dienstwagen nutzt und die Standardklauseln braucht, ist die Vorlage als Word oder PDF eine solide Grundlage. GründerX ist Software und ersetzt keine Rechts- oder Steuerberatung; lass den fertigen Vertrag vor dem ersten Gehaltslauf vom Steuerberater gegenlesen.`,
      },
    ],
    seo: {
      title: "Geschäftsführervertrag Vorlage kostenlos (Word) | GründerX",
      description:
        "Kostenloser Geschäftsführer-Anstellungsvertrag für GmbH und UG: Vergütung, Tantieme, Dienstwagen, Urlaub, Wettbewerbsverbot, D&O, Kündigung und Fremdvergleich.",
    },
    stand: "2026-10",
    text: `Geschäftsführer-Anstellungsvertrag

zwischen

[Name] [GmbH / UG (haftungsbeschränkt)], [Straße, PLZ Ort], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch die Gesellschafterversammlung, diese vertreten durch [Vorname Nachname] aufgrund Gesellschafterbeschlusses vom [Datum]
– nachfolgend „Gesellschaft“ –

und

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
– nachfolgend „Geschäftsführer“ –

§ 1 Bestellung, Aufgaben und Vertretung
(1) Der Geschäftsführer wurde durch Beschluss der Gesellschafterversammlung vom [Datum] mit Wirkung zum [Datum] zum Geschäftsführer der Gesellschaft bestellt. Dieser Vertrag regelt das Anstellungsverhältnis.
(2) Der Geschäftsführer vertritt die Gesellschaft [allein / gemeinsam mit einem weiteren Geschäftsführer oder einem Prokuristen]. Er ist [von den Beschränkungen des § 181 BGB befreit / nicht von den Beschränkungen des § 181 BGB befreit].
(3) Der Geschäftsführer führt die Geschäfte der Gesellschaft nach Maßgabe der Gesetze, des Gesellschaftsvertrags, einer Geschäftsordnung für die Geschäftsführung und der Beschlüsse und Weisungen der Gesellschafterversammlung mit der Sorgfalt eines ordentlichen Geschäftsmannes. Sein Verantwortungsbereich umfasst insbesondere [z. B. Vertrieb, Finanzen und Personal].

§ 2 Pflichten, Zustimmungsvorbehalte und Berichtswesen
(1) Der Geschäftsführer hat die Zustimmungsvorbehalte des Gesellschaftsvertrags und der Geschäftsordnung zu beachten. Darüber hinaus bedürfen der vorherigen Zustimmung der Gesellschafterversammlung: [z. B. Geschäfte über [Betrag] EUR im Einzelfall, Einstellung von Mitarbeitern mit Jahresgehalt über [Betrag] EUR, Abschluss von Verträgen mit Gesellschaftern oder deren Angehörigen].
(2) Der Geschäftsführer berichtet der Gesellschafterversammlung [monatlich / quartalsweise] schriftlich über Umsatz, Ergebnis, Liquidität und wesentliche Vorgänge und unverzüglich über alle Umstände, die für die Gesellschaft von erheblicher Bedeutung sind, insbesondere drohende Zahlungsunfähigkeit oder Überschuldung.
(3) Der Geschäftsführer sorgt für eine ordnungsgemäße Buchführung, die fristgerechte Aufstellung des Jahresabschlusses, die Einhaltung steuerlicher und sozialversicherungsrechtlicher Pflichten, den Datenschutz sowie die Einrichtung eines angemessenen Risikofrüherkennungs- und Compliance-Systems.

§ 3 Arbeitszeit, Arbeitsort und Nebentätigkeit
(1) Der Geschäftsführer stellt seine gesamte Arbeitskraft in den Dienst der Gesellschaft. Er ist an feste Arbeitszeiten nicht gebunden, hat aber, soweit die Belange der Gesellschaft es erfordern, auch außerhalb der üblichen Geschäftszeiten zur Verfügung zu stehen. Mehrarbeit ist mit der Vergütung abgegolten.
[Alternative Teilzeit: (1) Der Geschäftsführer ist mit einer regelmäßigen Arbeitszeit von [Stunden] Stunden pro Woche für die Gesellschaft tätig.]
(2) Dienstsitz ist [Ort]. Mobiles Arbeiten ist im Rahmen der betrieblichen Erfordernisse zulässig.
(3) Entgeltliche und unentgeltliche Nebentätigkeiten, Aufsichtsrats- und Beiratsmandate sowie Beteiligungen an anderen Unternehmen (ausgenommen Beteiligungen unter 5 % an börsennotierten Gesellschaften) bedürfen der vorherigen schriftlichen Zustimmung der Gesellschafterversammlung. Bestehende Nebentätigkeiten: [z. B. „keine“]. Veröffentlichungen und Vorträge mit Bezug zur Gesellschaft sind anzuzeigen.

§ 4 Vergütung und Tantieme
(1) Der Geschäftsführer erhält ein festes Jahresgehalt von [Betrag] EUR brutto, zahlbar in zwölf gleichen Monatsraten jeweils zum Monatsende. [Optional: Zusätzlich wird im [November] ein 13. Monatsgehalt gezahlt.]
(2) Zusätzlich erhält der Geschäftsführer eine Tantieme in Höhe von [z. B. 10] % des Jahresüberschusses der Gesellschaft vor Ertragsteuern und vor Abzug der Tantieme selbst, wie er sich aus dem festgestellten Jahresabschluss ergibt. Verlustvorträge aus Vorjahren sind vorab abzuziehen. Die Tantieme ist auf [Betrag, z. B. 30 % des Festgehalts] EUR pro Geschäftsjahr begrenzt. Sie wird einen Monat nach Feststellung des Jahresabschlusses fällig. Bei unterjährigem Beginn oder Ende wird sie zeitanteilig gezahlt.
(3) Die Vergütung wird alle [z. B. 2] Jahre, erstmals zum [Datum], von der Gesellschafterversammlung überprüft. Eine Anpassung bedarf eines Gesellschafterbeschlusses und einer schriftlichen Vertragsänderung vor Beginn des Zeitraums, für den sie gelten soll.
(4) Mit der Vergütung nach Absatz 1 und 2 ist die gesamte Tätigkeit des Geschäftsführers abgegolten. Die Gesellschaft führt Lohnsteuer und, soweit Versicherungspflicht besteht, Sozialversicherungsbeiträge ab.
(5) [Optional: Die Gesellschaft zahlt dem Geschäftsführer einen Zuschuss zur privaten Kranken- und Pflegeversicherung in Höhe des Arbeitgeberanteils, höchstens [Betrag] EUR monatlich, und einen Beitrag zur betrieblichen Altersversorgung von [Betrag] EUR monatlich über [Direktversicherung / Unterstützungskasse].]

§ 5 Dienstwagen, Auslagen, Versicherungen
(1) Die Gesellschaft stellt dem Geschäftsführer einen Dienstwagen der Klasse [z. B. Mittelklasse, Bruttolistenpreis bis [Betrag] EUR] zur dienstlichen und privaten Nutzung zur Verfügung. Die Gesellschaft trägt die Betriebskosten. Der geldwerte Vorteil der Privatnutzung wird nach den steuerlichen Vorschriften [1-%-Regelung / Fahrtenbuch] versteuert und vom Geschäftsführer getragen. Bei Freistellung ist der Wagen herauszugeben.
(2) Die Gesellschaft erstattet dem Geschäftsführer Reise- und Bewirtungskosten sowie sonstige Auslagen im Interesse der Gesellschaft gegen Nachweis im Rahmen der steuerlichen Höchstbeträge.
(3) Die Gesellschaft schließt für den Geschäftsführer eine Vermögensschaden-Haftpflichtversicherung (D&O) mit einer Deckungssumme von mindestens [Betrag] EUR ab und hält sie während der Vertragslaufzeit und einer Nachmeldefrist von mindestens [z. B. 3] Jahren aufrecht. Die Gesellschaft stellt dem Geschäftsführer ferner [eine Unfallversicherung mit [Betrag] EUR für den Invaliditäts- und [Betrag] EUR für den Todesfall].
(4) Die Gesellschaft stellt dem Geschäftsführer Laptop und Mobiltelefon zur dienstlichen und privaten Nutzung zur Verfügung.

§ 6 Vergütung bei Krankheit und Tod
(1) Bei vorübergehender Arbeitsunfähigkeit infolge Krankheit oder Unfall wird das Festgehalt für die Dauer von [z. B. 6] Monaten, längstens bis zur Beendigung des Vertrags, fortgezahlt; Leistungen einer Krankentagegeldversicherung oder Krankenkasse werden angerechnet. Die Tantieme wird für Fehlzeiten über [z. B. 3] Monate zeitanteilig gekürzt.
(2) Stirbt der Geschäftsführer während der Vertragsdauer, wird das Festgehalt für den Sterbemonat und die [z. B. 3] folgenden Monate an [Ehegatten / Lebenspartner / unterhaltsberechtigte Kinder] als Gesamtgläubiger fortgezahlt.

§ 7 Urlaub
(1) Der Geschäftsführer hat Anspruch auf einen Jahresurlaub von [z. B. 30] Arbeitstagen (bei Fünf-Tage-Woche). Die zeitliche Lage ist mit den übrigen Geschäftsführern und, soweit erforderlich, mit der Gesellschafterversammlung abzustimmen, sodass die Geschäftsführung stets gewährleistet bleibt.
(2) Kann der Urlaub aus betrieblichen Gründen nicht bis zum 31. März des Folgejahres genommen werden, wird er abgegolten; Abgeltungsbetrag je Urlaubstag ist 1/250 des Jahresfestgehalts.

§ 8 Vertraulichkeit, Herausgabe, Erfindungen
(1) Der Geschäftsführer bewahrt über alle vertraulichen Angelegenheiten der Gesellschaft, insbesondere Geschäftsgeheimnisse im Sinne des GeschGehG, Kunden-, Preis- und Finanzdaten, auch nach Beendigung des Vertrags Stillschweigen.
(2) Bei Beendigung des Vertrags oder Freistellung gibt der Geschäftsführer unaufgefordert alle Unterlagen, Datenträger, Zugänge und Gegenstände der Gesellschaft zurück und löscht private Kopien. Ein Zurückbehaltungsrecht besteht nicht.
(3) Erfindungen, Software und sonstige schutzfähige Arbeitsergebnisse, die der Geschäftsführer im Rahmen seiner Tätigkeit schafft, stehen der Gesellschaft zu; das Arbeitnehmererfindungsgesetz wird entsprechend angewendet. Der Geschäftsführer räumt der Gesellschaft an urheberrechtlich geschützten Arbeitsergebnissen das ausschließliche, unbeschränkte Nutzungsrecht ein. Eine gesonderte Vergütung ist mit § 4 abgegolten.

§ 9 Wettbewerbsverbot
(1) Während der Vertragsdauer darf der Geschäftsführer weder für eigene noch für fremde Rechnung im Geschäftsbereich der Gesellschaft tätig werden noch sich an Wettbewerbern beteiligen oder diese beraten.
(2) Für die Dauer von [z. B. 12] Monaten nach Beendigung des Vertrags ist es dem Geschäftsführer untersagt, in [räumlicher Bereich, z. B. Deutschland] für ein Unternehmen tätig zu werden, das mit der Gesellschaft auf dem Gebiet [Tätigkeitsbereich] im Wettbewerb steht, oder ein solches Unternehmen zu gründen oder sich daran zu beteiligen. Für die Dauer des Verbots zahlt die Gesellschaft eine Karenzentschädigung von monatlich [z. B. 50] % der zuletzt bezogenen durchschnittlichen monatlichen Gesamtvergütung; anderweitiger Erwerb wird angerechnet, soweit er zusammen mit der Entschädigung 110 % der bisherigen Vergütung übersteigt. Die Gesellschaft kann vor Beendigung des Vertrags schriftlich auf das Verbot verzichten; sie wird dann mit Ablauf von [z. B. 6] Monaten ab Zugang des Verzichts von der Entschädigungspflicht frei.
(3) Für jeden Fall der Zuwiderhandlung ist eine Vertragsstrafe in Höhe einer Monatsvergütung verwirkt; bei Dauerverstößen gilt jeder angefangene Monat als eigener Fall. Weitergehende Ansprüche bleiben unberührt.

§ 10 Haftung
(1) Der Geschäftsführer haftet der Gesellschaft nach § 43 GmbHG. Für Entscheidungen, die er auf angemessener Informationsgrundlage und ohne Interessenkonflikt zum Wohl der Gesellschaft getroffen hat, haftet er nicht.
(2) Hat der Geschäftsführer eine Maßnahme aufgrund eines Gesellschafterbeschlusses oder einer Weisung der Gesellschafterversammlung ausgeführt, ist die Haftung gegenüber der Gesellschaft ausgeschlossen, soweit das Gesetz dies zulässt.
(3) Die Gesellschaft stellt den Geschäftsführer von Ansprüchen Dritter frei, die aus seiner pflichtgemäßen Tätigkeit für die Gesellschaft entstehen, soweit nicht die D&O-Versicherung eintritt und soweit das Gesetz die Freistellung zulässt.

§ 11 Vertragsdauer und Kündigung
(1) Der Vertrag beginnt am [Datum] und wird auf unbestimmte Zeit geschlossen. [Alternative: Der Vertrag wird für die Dauer von [z. B. 3] Jahren bis zum [Datum] geschlossen und verlängert sich um jeweils ein Jahr, wenn er nicht mit einer Frist von [6] Monaten zum Vertragsende gekündigt wird.]
(2) Der Vertrag kann von beiden Seiten mit einer Frist von [z. B. 6] Monaten zum Ende eines Kalendermonats gekündigt werden. Die Kündigung bedarf der Schriftform. Die Kündigung durch die Gesellschaft erfolgt durch die Gesellschafterversammlung.
(3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt für die Gesellschaft insbesondere vor bei groben Pflichtverletzungen, Verstoß gegen § 2 Abs. 1 oder § 9, Vermögensdelikten oder Verlust der Eignung nach § 6 Abs. 2 GmbHG.
(4) Die Abberufung als Geschäftsführer ist jederzeit durch Gesellschafterbeschluss möglich (§ 38 GmbHG). Mit Zugang der Abberufung gilt dieser Vertrag als zum nächstzulässigen Termin nach Absatz 2 gekündigt, sofern die Gesellschaft nicht ausdrücklich etwas anderes erklärt. Der Geschäftsführer kann sein Amt jederzeit niederlegen; die Niederlegung ohne wichtigen Grund gilt zugleich als Kündigung dieses Vertrags zum nächstzulässigen Termin.
(5) Nach Kündigung oder Abberufung ist die Gesellschaft berechtigt, den Geschäftsführer unter Fortzahlung der Festvergütung und Anrechnung offener Urlaubsansprüche freizustellen. Anderweitiger Verdienst wird auf die Vergütung während der Freistellung angerechnet.
(6) Der Vertrag endet, ohne dass es einer Kündigung bedarf, mit Ablauf des Monats, in dem der Geschäftsführer die Regelaltersgrenze der gesetzlichen Rentenversicherung erreicht, oder in dem eine dauerhafte Berufsunfähigkeit festgestellt wird.

§ 12 Schlussbestimmungen
(1) Der Geschäftsführer ist verpflichtet, die Feststellung seines sozialversicherungsrechtlichen Status bei der Deutschen Rentenversicherung Bund (§ 7a SGB IV) gemeinsam mit der Gesellschaft zu beantragen. Beide Parteien wirken an der Klärung mit; die Gesellschaft trägt die Kosten.
(2) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform und eines Beschlusses der Gesellschafterversammlung; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(3) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt deutsches Recht.
(5) Dieser Vertrag wurde durch Beschluss der Gesellschafterversammlung vom [Datum] genehmigt. Er wird in zwei Ausfertigungen erstellt; jede Partei erhält eine.

[Ort], den [Datum]


______________________________
[Name] [GmbH / UG (haftungsbeschränkt)]
vertreten durch die Gesellschafterversammlung, diese vertreten durch [Vorname Nachname]


______________________________
[Vorname Nachname], Geschäftsführer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "gesellschafterdarlehen",
    titel: "Gesellschafterdarlehen an GmbH oder UG",
    kurz: "Darlehensvertrag zwischen einem Gesellschafter und seiner GmbH oder UG: Betrag, fremdüblicher Zins, Laufzeit, Rangrücktritt als Option und Hinweis auf den Nachrang nach § 39 InsO.",
    kategorie: "gesellschaft",
    dateiname: "Gesellschafterdarlehen",
    wofuer: [
      "Ein Gründer gibt seiner UG oder GmbH privates Geld, statt das Stammkapital zu erhöhen",
      "Überbrückung von Liquiditätsengpässen ohne Bank",
      "Gründungskosten oder Auslagen, die ein Gesellschafter vorgestreckt hat, sauber dokumentieren",
      "Wenn eine Bank oder ein Investor einen Rangrücktritt des Gesellschafters verlangt",
    ],
    enthaelt: [
      "§ 1 Darlehensbetrag und Auszahlung",
      "§ 2 Verwendungszweck",
      "§ 3 Zinsen",
      "§ 4 Laufzeit, Tilgung und Rückzahlung",
      "§ 5 Kündigung",
      "§ 6 Sicherheiten",
      "§ 7 Rangrücktritt (Option)",
      "§ 8 Insolvenzrechtlicher Hinweis",
      "§ 9 Steuern und Dokumentation",
      "§ 10 Schlussbestimmungen",
    ],
    hinweise: [
      "In der Insolvenz der Gesellschaft sind Gesellschafterdarlehen kraft Gesetzes nachrangig (§ 39 Abs. 1 Nr. 5 InsO), unabhängig von Verträgen. Rückzahlungen im letzten Jahr vor dem Insolvenzantrag kann der Verwalter anfechten (§ 135 InsO). Ausnahmen gelten für Gesellschafter mit höchstens 10 % Beteiligung ohne Geschäftsführung und für Sanierungsfälle (§ 39 Abs. 4 und 5 InsO).",
      "Der Zins muss fremdüblich sein, sonst droht eine verdeckte Gewinnausschüttung (zu hoch) oder eine verdeckte Einlage (zinslos oder zu niedrig). Orientiere dich an dem, was die Gesellschaft bei einer Bank zahlen würde, und dokumentiere die Herleitung.",
      "Ein qualifizierter Rangrücktritt verhindert, dass das Darlehen in der Überschuldungsprüfung als Verbindlichkeit zählt (§ 19 Abs. 2 Satz 2 InsO). Das kann die Insolvenzantragspflicht abwenden, macht aber die Rückzahlung nur außerhalb der Krise möglich. Nicht leichtfertig unterschreiben.",
      "Die Zinsen sind beim Gesellschafter mit mindestens 10 % Beteiligung keine Kapitalerträge mit Abgeltungsteuer, sondern unterliegen dem persönlichen Steuersatz (§ 32d Abs. 2 Nr. 1 Buchst. b EStG). Die Gesellschaft behält trotzdem Kapitalertragsteuer ein, die dann angerechnet wird.",
      "Ein Darlehen, das bei Gründung oder in der Krise zwingend gegeben werden musste, kann als verdecktes Stammkapital gewertet werden. Bei einer UG ist das Darlehen kein Ersatz für die Kapitalerhöhung auf 25.000 EUR.",
    ],
    faqs: [
      {
        q: "Darlehen oder Kapitalerhöhung: Was ist besser?",
        a: "Das Darlehen ist flexibler: kein Notar, keine Satzungsänderung, Rückzahlung und Zinsen möglich. Dafür ist es in der Insolvenz nachrangig und verbessert das Eigenkapital in der Bilanz nicht. Wer die Bonität gegenüber Banken stärken will, braucht Eigenkapital oder zumindest einen qualifizierten Rangrücktritt.",
      },
      {
        q: "Welcher Zinssatz ist fremdüblich?",
        a: "Der Satz, den die Gesellschaft bei einer Bank für ein unbesichertes Darlehen mit gleicher Laufzeit zahlen müsste. Für junge Gesellschaften liegen solche Sätze oft deutlich über dem Basiszinssatz. Ein zinsloses Darlehen ist beim Gesellschafter zwar zulässig, führt aber nicht zu einer steuerlichen Einlage und kann bei der Gesellschaft als Vorteil hinterfragt werden.",
      },
      {
        q: "Was bedeutet Rangrücktritt genau?",
        a: "Der Gesellschafter erklärt, dass seine Forderung erst nach allen anderen Gläubigern bedient wird und außerhalb einer Insolvenz nur aus künftigen Gewinnen, Liquidationsüberschuss oder freiem Vermögen gezahlt werden darf. Dadurch zählt das Darlehen bei der Überschuldungsprüfung nicht mit. Die Vorlage enthält die Klausel als Option, die ihr ankreuzt oder streicht.",
      },
      {
        q: "Kann ich das Darlehen jederzeit zurückfordern?",
        a: "Nur, wenn es so vereinbart ist und die Gesellschaft nicht in der Krise steckt. Die Vorlage sieht eine feste Laufzeit mit ordentlichem Kündigungsrecht vor. Rückzahlungen im Jahr vor einem Insolvenzantrag muss der Gesellschafter an den Insolvenzverwalter zurückgeben, selbst wenn der Vertrag sie erlaubte.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann brauchst du einen Vertrag über ein Gesellschafterdarlehen?",
        text: `Die typische Situation: Die UG hat 1.000 EUR Stammkapital, aber die erste Warenbestellung kostet 8.000 EUR. Oder die GmbH wartet auf eine große Kundenzahlung und muss trotzdem Gehälter zahlen. Statt einer Kapitalerhöhung beim Notar überweist der Gründer das Geld privat auf das Geschäftskonto. Das ist ein Gesellschafterdarlehen, und ohne Vertrag ist es steuerlich und rechtlich ein Problem.

Du brauchst den Vertrag also immer, wenn Geld vom Gesellschafter in die Gesellschaft fließt, das zurückgezahlt werden soll. Das gilt auch für Gründungskosten und Auslagen, die ein Gesellschafter vorgestreckt hat, für die Überbrückung bis zur nächsten Finanzierungsrunde und für Fälle, in denen eine Bank oder ein Investor einen Rangrücktritt verlangt. Die Vorlage regelt Betrag, fremdüblichen Zins, Laufzeit, Kündigung, Sicherheiten und den Rangrücktritt als ankreuzbare Option.`,
      },
      {
        titel: "Was muss in einen Gesellschafterdarlehensvertrag?",
        text: `Ein Darlehensvertrag zwischen Gesellschafter und GmbH muss so aussehen, als hätten ihn Fremde geschlossen. Die Vorlage enthält dafür in zehn Paragraphen:

- Darlehensbetrag in Ziffern und Worten, Auszahlungsweg und Datum, alternativ die Feststellung bereits geleisteter Zahlungen oder verauslagter Kosten (§ 1)
- Verwendungszweck (§ 2)
- Zinssatz mit dokumentiertem Fremdvergleich, Zinsmethode, Fälligkeit und Umgang mit Kapitalertragsteuer (§ 3)
- Laufzeit, Tilgung in einer Summe oder in Raten, vorzeitige Rückzahlung unter Vorbehalt der Kapitalerhaltung (§ 4)
- ordentliche und außerordentliche Kündigung mit Schriftform (§ 5)
- Sicherheiten und der Hinweis auf deren Anfechtbarkeit (§ 6)
- Rangrücktritt als Option zum Ankreuzen mit dem vollständigen Text eines qualifizierten Rangrücktritts (§ 7)
- insolvenzrechtlicher Hinweis auf § 39 und § 135 InsO (§ 8)
- Steuern, Buchung als Verbindlichkeit gegenüber Gesellschaftern, Gesellschafterbeschluss (§ 9)
- Schriftform, salvatorische Klausel, Gerichtsstand (§ 10)

Die drei Anlagen sind kein Beiwerk: Aufstellung verauslagter Kosten, Herleitung des Zinssatzes und der Gesellschafterbeschluss sind genau die Unterlagen, die ein Betriebsprüfer anfordert.`,
      },
      {
        titel: "Gesellschafterdarlehen Muster ausfüllen: Schritt für Schritt",
        text: `So gehst du vor:

- Kopf: Name und Beteiligungsquote des Gesellschafters, Firma, Sitz, HRB. Achte auf die Vertretung: Ist der Darlehensgeber alleiniger Geschäftsführer ohne Befreiung von § 181 BGB, muss die Gesellschafterversammlung die Gesellschaft vertreten.
- § 1: Betrag in Ziffern und Worten, Bank und IBAN des Geschäftskontos, Auszahlung in einer Summe oder in Tranchen. Für bereits geflossenes Geld die Alternative mit Datum oder der Kostenaufstellung in Anlage 1.
- § 2: konkreter Zweck, etwa Warenbestellung, Liquidität bis zu einem Datum oder eine Anschaffung.
- § 3: Zinssatz. Hole ein Vergleichsangebot deiner Bank für einen unbesicherten Kredit ein oder notiere die Konditionen eines Kontokorrents und lege sie als Anlage 2 bei. Wähle die Zinsfälligkeit.
- § 4: Rückzahlungsdatum oder die Raten-Alternative mit Anzahl, Höhe und erstem Termin.
- § 5: Kündigungsfrist und das Datum, ab dem der Gesellschafter frühestens kündigen darf.
- § 6: ohne Sicherheiten oder die konkrete Sicherheit benennen.
- § 7: genau ein Kästchen ankreuzen. Ohne Krise und ohne Bankforderung ist in der Regel kein Rangrücktritt nötig.
- § 9: Datum des Gesellschafterbeschlusses, der den Vertrag genehmigt (Anlage 3).

Erst unterschreiben, dann überweisen, nie umgekehrt. Die Vorlage gibt es als Word zum Anpassen und als PDF für die Ablage beim Steuerberater.`,
      },
      {
        titel: "Typische Fehler beim Gesellschafterdarlehen",
        text: `Fehler eins: Geld überweisen und den Vertrag Monate später nachreichen. Ohne vorherige Vereinbarung ist die Rückzahlung angreifbar und die Zinsen sind steuerlich nicht anerkannt. Fehler zwei: zinslos oder zu billig. Dann liegt eine verdeckte Einlage nahe, und der Vorteil kann bei der Gesellschaft hinterfragt werden. Zu teuer ist ebenso schädlich, weil der überhöhte Teil als verdeckte Gewinnausschüttung gilt.

Fehler drei: Rangrücktritt unterschreiben, ohne die Folgen zu kennen. Mit qualifiziertem Rangrücktritt darfst du dein Geld nur zurückholen, wenn die Gesellschaft es aus freiem Vermögen zahlen kann; in der Krise ist es faktisch gebunden. Fehler vier: Rückzahlung kurz vor der Insolvenz. Der Insolvenzverwalter fordert nach § 135 InsO jede Rückzahlung des letzten Jahres zurück, auch wenn der Vertrag sie erlaubt hat.

Fehler fünf: Kapitalertragsteuer vergessen. Die Gesellschaft muss auf die Zinsen Kapitalertragsteuer einbehalten und anmelden; beim Gesellschafter mit mindestens zehn Prozent Beteiligung gilt dann der persönliche Steuersatz statt der Abgeltungsteuer. Fehler sechs: Darlehen statt Kapitalerhöhung bei der UG. Ein Darlehen stärkt das Eigenkapital nicht und ersetzt nicht die Erhöhung auf 25.000 EUR, mit der die Rücklagenpflicht endet.`,
      },
      {
        titel: "Rechtliche Grundlagen: InsO, GmbHG und Steuerrecht",
        text: `Gesellschafterdarlehen sind seit der GmbH-Reform 2008 in der Insolvenzordnung geregelt. Nach § 39 Abs. 1 Nr. 5 InsO sind sie in der Insolvenz der Gesellschaft kraft Gesetzes nachrangig; Rückzahlungen im letzten Jahr vor dem Insolvenzantrag und Sicherheiten der letzten zehn Jahre sind nach § 135 InsO anfechtbar. Ausgenommen sind nach § 39 Abs. 4 und 5 InsO Kleinbeteiligte mit höchstens zehn Prozent ohne Geschäftsführung sowie Darlehen zur Sanierung.

Der qualifizierte Rangrücktritt stützt sich auf § 19 Abs. 2 Satz 2 InsO: Forderungen mit Rangrücktritt bleiben bei der Überschuldungsprüfung außer Ansatz. Welche Formulierung dafür ausreicht, hat der Bundesgerichtshof präzisiert; die Vorlage verwendet die anerkannte Form mit Rücktritt hinter alle Gläubiger und Zahlung nur aus freiem Vermögen. Gesellschaftsrechtlich gilt daneben die Kapitalerhaltung nach § 30 GmbHG: Rückzahlungen dürfen das Stammkapital nicht angreifen.

Steuerlich prüft das Finanzamt den Fremdvergleich. Zinsen beim Gesellschafter mit mindestens zehn Prozent Beteiligung fallen nach § 32d Abs. 2 Nr. 1 Buchst. b EStG unter den persönlichen Steuersatz. Die Gesellschaft hat Kapitalertragsteuer einzubehalten. Bei Verzicht auf das Darlehen in der Krise ist der werthaltige Teil eine Einlage, der nicht werthaltige Teil ein steuerpflichtiger Ertrag der Gesellschaft, was häufig übersehen wird.`,
      },
      {
        titel: "Wann die Vorlage nicht ausreicht",
        text: `Für den Normalfall, also ein Gründer leiht seiner UG oder GmbH einen fünfstelligen Betrag zu marktüblichen Konditionen, reicht das Muster. Hol dir Beratung, wenn

- die Gesellschaft bereits in der Krise ist oder die Hälfte des Stammkapitals verloren hat; dann geht es um Insolvenzantragspflicht, und der Rangrücktritt muss mit Steuerberater oder Anwalt abgestimmt werden,
- der Betrag im Verhältnis zum Stammkapital sehr hoch ist und das Finanzamt verdecktes Stammkapital vermuten könnte,
- mehrere Gesellschafter in unterschiedlicher Höhe Darlehen geben und die Gleichbehandlung geregelt werden muss,
- das Darlehen aus dem Ausland kommt oder in Fremdwährung läuft,
- eine spätere Umwandlung in Eigenkapital geplant ist; dann ist ein Wandeldarlehen das richtige Instrument,
- der Darlehensgeber eine Holding-GmbH ist und Konzernfinanzierung mit Zinsschranke und Verrechnungspreisen ins Spiel kommt.

Diese Vorlage ist ein Software-Muster von GründerX und keine Steuer- oder Rechtsberatung. Gerade beim Gesellschafterdarlehen sollte der Steuerberater vor der Auszahlung Zinssatz und Vertragsgestaltung freigeben, weil Fehler hier erst Jahre später in der Betriebsprüfung auffallen.`,
      },
    ],
    seo: {
      title: "Gesellschafterdarlehen Vertrag Vorlage kostenlos | GründerX",
      description:
        "Vertrag für ein Gesellschafterdarlehen an GmbH oder UG: Betrag, fremdüblicher Zins, Laufzeit, Kündigung, Rangrücktritt als Option, Hinweise zu § 39 InsO.",
    },
    stand: "2026-10",
    text: `Darlehensvertrag (Gesellschafterdarlehen)

zwischen

[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort], Gesellschafter der nachstehend bezeichneten Gesellschaft mit einer Beteiligung von [Prozent] % am Stammkapital
– nachfolgend „Darlehensgeber“ –

und

[Name] [GmbH / UG (haftungsbeschränkt)], [Straße, PLZ Ort], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch [den Geschäftsführer [Vorname Nachname] / die Gesellschafterversammlung, soweit der Darlehensgeber zugleich alleiniger Geschäftsführer ist und nicht von § 181 BGB befreit ist]
– nachfolgend „Darlehensnehmerin“ –

§ 1 Darlehensbetrag und Auszahlung
(1) Der Darlehensgeber gewährt der Darlehensnehmerin ein Darlehen in Höhe von [Betrag] EUR (in Worten: [Betrag in Worten] Euro).
(2) Die Auszahlung erfolgt [in einer Summe bis zum [Datum] / in [Anzahl] Teilbeträgen von je [Betrag] EUR jeweils zum [Datum]] durch Überweisung auf das Geschäftskonto der Darlehensnehmerin bei der [Bank], IBAN [IBAN].
[Alternative: (2) Der Darlehensbetrag ist bereits am [Datum] ausgezahlt worden / entspricht den vom Darlehensgeber für die Darlehensnehmerin verauslagten Kosten laut Anlage 1. Die Parteien stellen dies hiermit fest.]

§ 2 Verwendungszweck
Das Darlehen dient [der Finanzierung des laufenden Geschäftsbetriebs / der Anschaffung von [Gegenstand] / der Überbrückung eines Liquiditätsengpasses bis zum [Datum]]. Eine andere Verwendung bedarf der Zustimmung des Darlehensgebers.

§ 3 Zinsen
(1) Das Darlehen wird vom Tag der Auszahlung an mit [z. B. 6,0] % pro Jahr verzinst. Die Parteien haben den Zinssatz anhand der Konditionen bestimmt, zu denen die Darlehensnehmerin ein vergleichbares unbesichertes Darlehen bei einem Kreditinstitut erhalten würde (Fremdvergleich); die Herleitung ist in Anlage 2 dokumentiert.
(2) Die Zinsen werden nach der deutschen Zinsmethode (30/360) berechnet und sind [jährlich nachträglich zum 31.12. / vierteljährlich nachträglich / mit der Tilgung] fällig. Nicht gezahlte Zinsen werden [nicht / mit Fälligkeit dem Darlehenskapital zugeschlagen].
(3) Die Darlehensnehmerin behält auf die Zinsen Kapitalertragsteuer und Solidaritätszuschlag ein und führt sie ab, soweit sie gesetzlich dazu verpflichtet ist, und erteilt dem Darlehensgeber eine Steuerbescheinigung.

§ 4 Laufzeit, Tilgung und Rückzahlung
(1) Das Darlehen wird für die Zeit bis zum [Datum] gewährt und ist zu diesem Zeitpunkt in einer Summe zurückzuzahlen.
[Alternative: (1) Das Darlehen wird in [Anzahl] gleichen [monatlichen / vierteljährlichen] Raten von je [Betrag] EUR zuzüglich Zinsen getilgt, erstmals am [Datum].]
(2) Die Darlehensnehmerin ist berechtigt, das Darlehen jederzeit ganz oder teilweise ohne Vorfälligkeitsentschädigung zurückzuzahlen, soweit die Rückzahlung nicht gegen § 7 oder die Kapitalerhaltung (§ 30 GmbHG) verstößt.
(3) Zahlungen werden zunächst auf Kosten, dann auf Zinsen und zuletzt auf das Kapital angerechnet.

§ 5 Kündigung
(1) Beide Parteien können das Darlehen mit einer Frist von [z. B. 3] Monaten zum Monatsende ordentlich kündigen, der Darlehensgeber jedoch frühestens zum [Datum].
(2) Der Darlehensgeber kann das Darlehen aus wichtigem Grund fristlos kündigen, insbesondere wenn die Darlehensnehmerin mit zwei aufeinanderfolgenden Zins- oder Tilgungsraten in Verzug ist, über ihr Vermögen das Insolvenzverfahren beantragt wird, sie das Darlehen zweckwidrig verwendet oder der Darlehensgeber aus der Gesellschaft ausscheidet.
(3) Kündigungen bedürfen der Schriftform.

§ 6 Sicherheiten
Das Darlehen wird [ohne Sicherheiten gewährt / durch [Sicherungsübereignung von [Gegenstand] / Abtretung der Forderungen gegen [Kunde]] besichert; die Sicherheitenbestellung erfolgt in gesonderter Urkunde]. Dem Darlehensgeber ist bekannt, dass Sicherheiten für Gesellschafterdarlehen, die im letzten Jahr vor einem Insolvenzantrag bestellt wurden, anfechtbar sein können (§ 135 Abs. 1 Nr. 1 InsO: zehn Jahre).

§ 7 Rangrücktritt (Option, Zutreffendes ankreuzen)
[ ] Es wird kein Rangrücktritt vereinbart.
[ ] Qualifizierter Rangrücktritt: Der Darlehensgeber tritt mit seinen Ansprüchen auf Rückzahlung des Darlehens und auf Zinsen im Rang hinter die Forderungen aller gegenwärtigen und künftigen Gläubiger der Darlehensnehmerin im Sinne des § 39 Abs. 1 Nr. 1 bis 5 InsO zurück. Die Erfüllung der Ansprüche kann nur aus künftigen Jahresüberschüssen, aus einem Liquidationsüberschuss oder aus sonstigem freien Vermögen verlangt werden, das nach Befriedigung aller anderen Gläubiger verbleibt, und nur, soweit dadurch weder eine Zahlungsunfähigkeit noch eine Überschuldung der Darlehensnehmerin im Sinne der §§ 17, 19 InsO eintritt oder droht. Dieser Rangrücktritt dient der Vermeidung einer Überschuldung (§ 19 Abs. 2 Satz 2 InsO) und wird im Interesse der Gläubiger der Darlehensnehmerin erklärt; er kann nur mit Zustimmung der Darlehensnehmerin aufgehoben werden, solange die Krise andauert. Die Darlehensnehmerin nimmt die Erklärung an.

§ 8 Insolvenzrechtlicher Hinweis
Die Parteien sind sich bewusst, dass Forderungen aus diesem Darlehen in einem Insolvenzverfahren über das Vermögen der Darlehensnehmerin unabhängig von § 7 nachrangig sind (§ 39 Abs. 1 Nr. 5 InsO), soweit nicht das Kleinbeteiligungsprivileg (höchstens 10 % Beteiligung, keine Geschäftsführung) oder das Sanierungsprivileg (§ 39 Abs. 4 und 5 InsO) eingreift, und dass Rückzahlungen innerhalb eines Jahres vor einem Insolvenzantrag vom Insolvenzverwalter angefochten werden können (§ 135 Abs. 1 Nr. 2 InsO).

§ 9 Steuern und Dokumentation
(1) Die Parteien gehen davon aus, dass die Zinsen beim Darlehensgeber wegen seiner Beteiligung von mindestens 10 % dem persönlichen Steuersatz unterliegen (§ 32d Abs. 2 Nr. 1 Buchst. b EStG). Jede Partei trägt ihre eigenen Steuern.
(2) Dieser Vertrag wurde vor Auszahlung des Darlehens geschlossen und wird in der Buchführung der Darlehensnehmerin als Verbindlichkeit gegenüber Gesellschaftern ausgewiesen. Dem Abschluss hat die Gesellschafterversammlung durch Beschluss vom [Datum] zugestimmt.

§ 10 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Gerichtsstand ist, soweit zulässig, der Sitz der Darlehensnehmerin. Es gilt das Recht der Bundesrepublik Deutschland.
(4) Jede Partei erhält eine unterschriebene Ausfertigung.

Anlagen: 1 Aufstellung verauslagter Kosten (falls zutreffend), 2 Herleitung des Zinssatzes (Fremdvergleich), 3 Gesellschafterbeschluss vom [Datum]

[Ort], den [Datum]


______________________________
[Vorname Nachname], Darlehensgeber


______________________________
[Name] [GmbH / UG (haftungsbeschränkt)], vertreten durch [Vorname Nachname], Geschäftsführer

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "wandeldarlehen",
    titel: "Wandeldarlehensvertrag (Convertible Loan)",
    kurz: "Wandeldarlehen für Business Angels und Frühphasen-Investoren: Betrag, Zins, Wandlung bei qualifizierter Finanzierungsrunde, Discount, Cap, Fälligkeit und Rangrücktritt.",
    kategorie: "gesellschaft",
    dateiname: "Wandeldarlehensvertrag",
    wofuer: [
      "Ein Business Angel will investieren, bevor eine Bewertung der Gesellschaft feststeht",
      "Schnelle Finanzierung ohne sofortige Kapitalerhöhung beim Notar",
      "Überbrückung bis zur ersten Seed-Runde mit institutionellen Investoren",
      "Gründer, die eine Bewertungsdiskussion auf die nächste Runde verschieben wollen",
    ],
    enthaelt: [
      "§ 1 Darlehen, Auszahlung und Verwendung",
      "§ 2 Zinsen",
      "§ 3 Laufzeit und Fälligkeit",
      "§ 4 Pflichtwandlung bei qualifizierter Finanzierungsrunde",
      "§ 5 Wandlungsrecht bei Fälligkeit und Exit",
      "§ 6 Wandlungspreis: Discount und Bewertungsobergrenze (Cap)",
      "§ 7 Durchführung der Wandlung",
      "§ 8 Rangrücktritt",
      "§ 9 Informationsrechte und Zusicherungen",
      "§ 10 Übertragung, Mitwirkungspflichten der Gesellschafter",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Die Wandlung läuft über eine Kapitalerhöhung, die beurkundet werden muss (§§ 53, 55 GmbHG). Ob schon der Wandeldarlehensvertrag selbst beurkundungspflichtig ist, weil er die Gesellschafter zur Mitwirkung verpflichtet, ist in der Rechtsprechung nicht abschließend geklärt. Die sichere Variante ist die Beurkundung des Vertrags; viele Beteiligte wählen stattdessen die Schriftform mit Beitritt aller Gesellschafter und nehmen das Risiko bewusst in Kauf. Vorher mit dem Notar sprechen.",
      "Discount und Cap wirken zusammen: Der Investor erhält den für ihn günstigeren Preis. Bei einem Cap deutlich unter der späteren Bewertung verwässern die Gründer stärker als gedacht; rechne vor Unterschrift die Beispielszenarien durch.",
      "Ohne Rangrücktritt zählt das Darlehen bei der Überschuldungsprüfung als Verbindlichkeit und kann eine Insolvenzantragspflicht auslösen. Investoren akzeptieren den qualifizierten Rangrücktritt in der Regel, weil die Wandlung ihr eigentliches Ziel ist.",
      "Der INVEST-Zuschuss des BAFA kann auch für Wandeldarlehen beantragt werden, wenn die Förderbedingungen eingehalten werden. Bedingungen vor Vertragsschluss prüfen, nicht danach.",
      "Zinsen, die in Anteile gewandelt werden, sind beim Investor trotzdem Kapitalertrag; die Gesellschaft muss Kapitalertragsteuer einbehalten oder der Investor versteuert sie selbst. Die Vorlage sieht deshalb wahlweise Barzahlung der Zinsen vor.",
    ],
    faqs: [
      {
        q: "Was ist eine qualifizierte Finanzierungsrunde?",
        a: "Eine Kapitalerhöhung, bei der neue Investoren mindestens einen festgelegten Betrag, in der Vorlage ein Platzhalter von zum Beispiel 500.000 EUR, als Eigenkapital einzahlen. Erst dann wird das Darlehen automatisch gewandelt. Kleinere Runden lösen die Wandlung nicht aus, sofern der Investor das nicht freiwillig wählt.",
      },
      {
        q: "Wie wird der Wandlungspreis berechnet?",
        a: "Der Investor zahlt pro Anteil den Preis der Finanzierungsrunde abzüglich des Discounts (oft 10 bis 25 %), höchstens jedoch den Preis, der sich aus der Bewertungsobergrenze (Cap) ergibt. Der niedrigere der beiden Preise gilt. Darlehensbetrag plus aufgelaufene Zinsen geteilt durch den Wandlungspreis ergibt die Zahl der neuen Anteile.",
      },
      {
        q: "Was passiert, wenn keine Finanzierungsrunde kommt?",
        a: "Dann wird das Darlehen bei Fälligkeit zur Rückzahlung fällig, oder der Investor wandelt zum Cap-Preis beziehungsweise zu einer vereinbarten Fallback-Bewertung. Die Vorlage gibt dem Investor dieses Wahlrecht, damit er nicht gezwungen ist, eine Gesellschaft in die Insolvenz zu treiben, wenn sie nicht zurückzahlen kann.",
      },
      {
        q: "Müssen alle Gesellschafter mit unterschreiben?",
        a: "Ja, das ist dringend zu empfehlen. Die Wandlung erfordert eine Kapitalerhöhung mit Dreiviertelmehrheit und den Verzicht der Altgesellschafter auf ihr Bezugsrecht. Mit ihrer Unterschrift verpflichten sich alle Gesellschafter, bei der Wandlung mitzuwirken; sonst kann der Investor sein Recht nicht durchsetzen.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann brauchst du einen Wandeldarlehensvertrag?",
        text: `Ein Business Angel will 50.000 EUR in dein Start-up stecken, aber niemand kann heute seriös sagen, was die Gesellschaft wert ist. Eine Kapitalerhöhung beim Notar würde Wochen dauern und eine Bewertung erzwingen. Das Wandeldarlehen (Convertible Loan) löst beides: Das Geld fließt sofort als Darlehen, und die Bewertung wird auf die nächste Finanzierungsrunde verschoben, bei der das Darlehen in Anteile gewandelt wird.

Die Vorlage passt für Frühphasen-Investments von Angels, Family und Friends oder Förderinvestoren, für Brückenfinanzierungen bis zur Seed-Runde und für Gründer, die ihre Anteilsstruktur bis zur ersten institutionellen Runde einfach halten wollen. Sie regelt Betrag, Zins, Laufzeit, die Pflichtwandlung bei einer qualifizierten Runde, das Wahlrecht bei Fälligkeit und Exit, Discount, Cap, die Durchführung der Wandlung und den Rangrücktritt. Die Gesellschafter treten bei, damit die Wandlung später nicht an einer fehlenden Stimme scheitert.`,
      },
      {
        titel: "Was muss in einen Convertible Loan? Die wichtigsten Klauseln",
        text: `Ein Wandeldarlehen ist nur so gut wie seine Wandlungsmechanik. Die Vorlage regelt in elf Paragraphen:

- Darlehensbetrag, Auszahlungsfrist, Verwendungszweck und Verbot von Ausschüttungen aus dem Darlehen (§ 1)
- Zinssatz, Ansammlung der Zinsen und Wahl zwischen Mitwandlung und Barzahlung (§ 2)
- Laufzeit, Ausschluss der ordentlichen Kündigung, Kündigung aus wichtigem Grund (§ 3)
- Definition der qualifizierten Finanzierungsrunde mit Mindestbetrag und die Pflichtwandlung samt Informationsfrist (§ 4)
- Wandlungsrecht bei Fälligkeit zu einer Fallback-Bewertung, beim Exit mit Prämie als Alternative und bei kleineren Kapitalerhöhungen (§ 5)
- Wandlungspreis als niedrigerer Wert aus Discount und Cap, Berechnung der Anteile, Zuzahlung in die Kapitalrücklage (§ 6)
- Durchführung: Kapitalerhöhung, Bezugsrechtsverzicht, Übernahmeerklärung, Beitritt zur Gesellschaftervereinbarung, Kosten (§ 7)
- qualifizierter Rangrücktritt, der die Wandlung unberührt lässt (§ 8)
- Informationsrechte, Zusicherungen zur Anteilsstruktur, Vertraulichkeit (§ 9)
- Übertragbarkeit und Mitwirkungspflichten der Gesellschafter mit Gesellschafterbeschluss (§ 10)
- Formklausel, Schriftform, Gerichtsstand (§ 11)

Die Anlagen Gesellschafterliste, bestehende Optionsrechte und Gesellschafterbeschluss gehören dazu, weil der Investor nur so die Verwässerung berechnen kann.`,
      },
      {
        titel: "Wandeldarlehen Muster ausfüllen und Szenarien durchrechnen",
        text: `Vor dem Ausfüllen solltet ihr die Wandlung in drei Szenarien durchrechnen: Runde über dem Cap, Runde unter dem Cap, keine Runde. Dann die Platzhalter:

- Parteien: Investor, Gesellschaft mit HRB und alle Gesellschafter mit Anteilszahl; Präambel mit Stammkapital und Anteilszahl.
- § 1: Betrag, Auszahlungsfrist, Bank und IBAN, Verwendungszweck.
- § 2: Zinssatz, üblich sind Werte zwischen 4 und 8 Prozent, und die Entscheidung, ob Zinsen mitgewandelt oder bar gezahlt werden.
- § 3: Fälligkeitstag, meist 24 bis 36 Monate nach Auszahlung.
- § 4: Mindestbetrag der qualifizierten Runde und Informationsfrist vor der Beurkundung.
- § 5: Fallback-Bewertung bei Fälligkeit und die Exit-Prämie in Prozent.
- § 6: Discount in Prozent und die Cap-Bewertung pre-money, vollverwässert. Prüfe, ob eure Beteiligungsprogramme in der Definition enthalten sein sollen.
- § 9: Berichtsfristen. § 10: Datum des Gesellschafterbeschlusses.
- § 11: Schriftform oder notarielle Beurkundung; nicht gewählte Variante löschen.

Alle Gesellschafter unterschreiben, nicht nur der Geschäftsführer. Die Word-Fassung ist für die Verhandlung mit dem Investor gedacht, das PDF für die Unterschriftenrunde. Ein Beispiel: 100.000 EUR Darlehen, Runde zu 4 Mio. EUR pre-money, Cap 3 Mio. EUR, Discount 20 Prozent. Der Discount ergibt einen Preis auf Basis 3,2 Mio., der Cap auf Basis 3 Mio.; der Investor wandelt zum Cap-Preis, weil er niedriger ist.`,
      },
      {
        titel: "Typische Fehler bei Wandeldarlehen",
        text: `Fehler eins: Cap und Discount festlegen, ohne die Verwässerung zu rechnen. Ein niedriger Cap kann bei einer guten Runde dazu führen, dass der Angel für 50.000 EUR mehr Anteile bekommt als der Seed-Investor für 500.000 EUR. Rechne jedes Szenario vor Unterschrift durch.

Fehler zwei: Die Gesellschafter unterschreiben nicht mit. Die Wandlung braucht einen Kapitalerhöhungsbeschluss mit Dreiviertelmehrheit und den Bezugsrechtsverzicht aller Altgesellschafter. Fehlt ihre Verpflichtung, kann der Investor sein Recht nicht durchsetzen, und das macht das Darlehen zum einfachen Kredit mit Rückzahlungsrisiko.

Fehler drei: Rangrücktritt vergessen. Ohne ihn zählt das Darlehen bei der Überschuldungsprüfung als Verbindlichkeit, und bei einem Start-up ohne Umsatz kann das vom ersten Tag an die Insolvenzantragspflicht auslösen. Fehler vier: keine Regelung für den Fall, dass keine Runde kommt. Dann ist das Darlehen bei Fälligkeit zurückzuzahlen, was das Start-up meist nicht kann. Die Vorlage gibt dem Investor deshalb ein Wandlungsrecht zur Fallback-Bewertung. Fehler fünf: Die Zinsen werden gewandelt, aber die Kapitalertragsteuer darauf nicht bedacht; bei Mitwandlung muss die Gesellschaft die Steuer trotzdem abführen oder der Investor sie erklären.`,
      },
      {
        titel: "Rechtliche Grundlagen: GmbHG, Formfrage und INVEST",
        text: `Die Wandlung ist eine Kapitalerhöhung gegen Einlage nach §§ 55 ff. GmbHG mit Satzungsänderung nach § 53 GmbHG. Sie muss notariell beurkundet und ins Handelsregister eingetragen werden; der Investor gibt eine notariell beglaubigte Übernahmeerklärung ab. Die Einlage wird durch Verrechnung mit der Darlehensforderung erbracht, was als Sacheinlage gelten kann; deshalb sieht § 6 Abs. 3 der Vorlage die Zuzahlung in die Kapitalrücklage nach § 272 Abs. 2 Nr. 4 HGB und hilfsweise die Bareinlage mit Rückzahlung Zug um Zug vor.

Ob der Wandeldarlehensvertrag selbst beurkundet werden muss, ist nicht abschließend geklärt. Da er Gesellschafter zur Mitwirkung an einer Kapitalerhöhung und den Investor zur Übernahme von Anteilen verpflichtet, wird teilweise eine Beurkundungspflicht in Anlehnung an § 15 Abs. 4 und § 53 GmbHG angenommen. In der Praxis werden viele Wandeldarlehen in Schriftform geschlossen; die sichere Variante ist die Beurkundung, die § 11 Abs. 1 der Vorlage als Alternative bietet.

Der Rangrücktritt folgt § 19 Abs. 2 Satz 2 InsO. Der INVEST-Zuschuss für Wagniskapital des BAFA ist auch für Wandeldarlehen möglich, wenn die Förderbedingungen zu Laufzeit, Wandlung und Beteiligungsquote eingehalten werden. Die Bedingungen ändern sich; prüfe sie vor Vertragsschluss auf der Seite des BAFA, nicht danach.`,
      },
      {
        titel: "Wann du einen Anwalt für das Wandeldarlehen brauchst",
        text: `Ein Wandeldarlehen ist ein Finanzierungsvertrag mit Fernwirkung auf die nächste Runde. Beratung ist angezeigt, wenn

- der Investor ein professioneller VC oder ein Fonds ist, der eigene Vertragsstandards mitbringt und Sonderrechte wie Liquidationspräferenzen oder Mitverkaufsrechte verlangt,
- mehrere Wandeldarlehen mit unterschiedlichen Caps und Discounts parallel laufen und die Reihenfolge der Wandlung geregelt werden muss,
- bereits Investoren beteiligt sind, deren Gesellschaftervereinbarung Zustimmungs- oder Bezugsrechte enthält,
- der Investor aus dem Ausland kommt oder in Fremdwährung finanziert,
- die Gesellschaft Fördermittel bezieht, deren Bedingungen eine Wandlung einschränken,
- die Gesellschaft bereits in der Krise ist und das Darlehen als Sanierungsbeitrag dienen soll.

Der Notar ist bei der Wandlung ohnehin beteiligt und sollte vor Abschluss gefragt werden, ob er den Vertrag beurkundet sehen will. Der Steuerberater klärt die Behandlung der Zinsen und einer möglichen Sacheinlage. Die Vorlage von GründerX ist ein Software-Muster für den Standardfall und keine Rechtsberatung; sie gibt dir aber die Begriffe und die Mechanik an die Hand, um mit Investor und Anwalt auf Augenhöhe zu verhandeln.`,
      },
    ],
    seo: {
      title: "Wandeldarlehen Vorlage kostenlos (Convertible) | GründerX",
      description:
        "Wandeldarlehensvertrag für Business Angels: Betrag, Zins, Wandlung bei qualifizierter Finanzierungsrunde, Discount, Cap, Fälligkeit und Rangrücktritt.",
    },
    stand: "2026-10",
    text: `Wandeldarlehensvertrag

zwischen

[Vorname Nachname / Firma], [Anschrift], [ggf. Handelsregister]
– nachfolgend „Darlehensgeber“ –

und

[Name] [GmbH / UG (haftungsbeschränkt)], [Straße, PLZ Ort], eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer], vertreten durch [Geschäftsführer]
– nachfolgend „Gesellschaft“ –

sowie den Gesellschaftern der Gesellschaft
1. [Vorname Nachname], [Anschrift], [Anzahl] Geschäftsanteile
2. [Vorname Nachname], [Anschrift], [Anzahl] Geschäftsanteile
– nachfolgend „Gesellschafter“ –

Präambel
Die Gesellschaft entwickelt [kurze Beschreibung]. Das Stammkapital beträgt [Betrag] EUR, eingeteilt in [Anzahl] Geschäftsanteile zu je 1,00 EUR. Der Darlehensgeber möchte die Gesellschaft mit einem Darlehen finanzieren, das unter den nachstehenden Bedingungen in Geschäftsanteile gewandelt wird. Die Gesellschafter treten diesem Vertrag bei, um die zur Wandlung erforderlichen Mitwirkungshandlungen sicherzustellen.

§ 1 Darlehen, Auszahlung und Verwendung
(1) Der Darlehensgeber gewährt der Gesellschaft ein Darlehen in Höhe von [Betrag] EUR („Darlehensbetrag“).
(2) Der Darlehensbetrag wird innerhalb von [z. B. 10] Bankarbeitstagen nach Unterzeichnung dieses Vertrags [und Vorlage des Gesellschafterbeschlusses nach § 10 Abs. 3] auf das Konto der Gesellschaft bei der [Bank], IBAN [IBAN], überwiesen.
(3) Das Darlehen dient der Finanzierung des Geschäftsbetriebs der Gesellschaft, insbesondere [Produktentwicklung, Marketing, Personal]. Ausschüttungen, Darlehen an Gesellschafter oder Rückzahlungen anderer Gesellschafterdarlehen dürfen aus dem Darlehensbetrag nicht geleistet werden.

§ 2 Zinsen
(1) Das Darlehen wird ab dem Tag der Auszahlung mit [z. B. 6] % pro Jahr verzinst (30/360). Die Zinsen werden nicht laufend gezahlt, sondern bis zur Wandlung oder Rückzahlung angesammelt und [bei Wandlung mitgewandelt / bei Wandlung in bar gezahlt].
(2) Soweit auf Zinsen Kapitalertragsteuer einzubehalten ist, zahlt die Gesellschaft den entsprechenden Betrag an das Finanzamt und erteilt dem Darlehensgeber eine Steuerbescheinigung.

§ 3 Laufzeit und Fälligkeit
(1) Das Darlehen hat eine Laufzeit bis zum [Datum, z. B. 24 oder 36 Monate nach Auszahlung] („Fälligkeitstag“). Eine ordentliche Kündigung ist für beide Seiten ausgeschlossen.
(2) Der Darlehensgeber kann das Darlehen aus wichtigem Grund fristlos kündigen, insbesondere wenn über das Vermögen der Gesellschaft ein Insolvenzverfahren beantragt wird, die Gesellschaft wesentliche Pflichten aus diesem Vertrag verletzt oder Zusicherungen nach § 9 unrichtig sind.
(3) Am Fälligkeitstag oder nach Kündigung ist der Darlehensbetrag nebst aufgelaufenen Zinsen zur Rückzahlung fällig, soweit nicht eine Wandlung nach §§ 4 oder 5 erfolgt und soweit § 8 dem nicht entgegensteht.

§ 4 Pflichtwandlung bei qualifizierter Finanzierungsrunde
(1) Eine „qualifizierte Finanzierungsrunde“ ist eine Kapitalerhöhung der Gesellschaft, bei der ein oder mehrere Investoren, die nicht bereits Gesellschafter sind, neue Geschäftsanteile gegen Bareinlagen (einschließlich Agio oder Zuzahlung in die Kapitalrücklage) von insgesamt mindestens [Betrag, z. B. 500.000] EUR übernehmen.
(2) Bei einer qualifizierten Finanzierungsrunde wird der Darlehensbetrag zuzüglich der bis zum Tag der Beurkundung der Kapitalerhöhung aufgelaufenen Zinsen („Wandlungsbetrag“) zwingend in Geschäftsanteile der Gesellschaft gewandelt. Der Darlehensgeber erhält Geschäftsanteile derselben Gattung und mit denselben Rechten wie die Investoren der Finanzierungsrunde, soweit diese nicht ausdrücklich an Mindestbeträge geknüpft sind.
(3) Die Gesellschaft informiert den Darlehensgeber mindestens [z. B. 4] Wochen vor der geplanten Beurkundung schriftlich über die Bedingungen der Finanzierungsrunde (Investoren, Bewertung, Beteiligungsvertrag).

§ 5 Wandlungsrecht bei Fälligkeit, Exit und sonstigen Kapitalerhöhungen
(1) Kommt es bis zum Fälligkeitstag nicht zu einer qualifizierten Finanzierungsrunde, kann der Darlehensgeber durch schriftliche Erklärung bis spätestens [z. B. 4] Wochen vor dem Fälligkeitstag verlangen, dass der Wandlungsbetrag auf Grundlage einer Bewertung der Gesellschaft (pre-money, vollverwässert) in Höhe von [Betrag, in der Regel der Cap oder ein niedrigerer Fallback-Wert] EUR gewandelt wird. Erklärt er dies nicht, wird das Darlehen am Fälligkeitstag zur Rückzahlung fällig.
(2) Bei einem Exit (Veräußerung von mehr als 50 % der Geschäftsanteile oder des wesentlichen Vermögens, Börsengang) vor Wandlung kann der Darlehensgeber wählen zwischen (a) Wandlung zum Cap-Preis nach § 6 unmittelbar vor dem Exit und (b) Rückzahlung des Wandlungsbetrags zuzüglich einer Prämie von [z. B. 50] % des Darlehensbetrags.
(3) Bei einer Kapitalerhöhung, die keine qualifizierte Finanzierungsrunde ist, kann der Darlehensgeber die Wandlung zu den Bedingungen dieser Kapitalerhöhung nach § 6 verlangen.

§ 6 Wandlungspreis: Discount und Bewertungsobergrenze
(1) Der Preis je neuem Geschäftsanteil bei Wandlung („Wandlungspreis“) ist der niedrigere der folgenden Beträge:
   a) der von den Investoren der Finanzierungsrunde je Geschäftsanteil gezahlte Preis (Nennbetrag zuzüglich Agio/Zuzahlung) abzüglich eines Abschlags von [z. B. 20] % („Discount“);
   b) der Preis je Geschäftsanteil, der sich aus einer Bewertung der Gesellschaft vor der Finanzierungsrunde (pre-money, vollverwässert einschließlich aller Options- und Mitarbeiterbeteiligungsprogramme) in Höhe von [Betrag, z. B. 3.000.000] EUR ergibt („Cap“).
(2) Die Anzahl der vom Darlehensgeber zu übernehmenden neuen Geschäftsanteile entspricht dem Wandlungsbetrag geteilt durch den Wandlungspreis, abgerundet auf ganze Anteile. Ein Spitzenbetrag wird in bar an den Darlehensgeber zurückgezahlt oder in die Kapitalrücklage geleistet.
(3) Der Darlehensgeber übernimmt die neuen Geschäftsanteile zum Nennbetrag von je 1,00 EUR; der Differenzbetrag zwischen Wandlungsbetrag und Summe der Nennbeträge wird als Zuzahlung in die Kapitalrücklage der Gesellschaft (§ 272 Abs. 2 Nr. 4 HGB) geleistet. Die Einlageverpflichtung wird durch Verrechnung mit dem Darlehensrückzahlungsanspruch erfüllt, soweit rechtlich zulässig; andernfalls zahlt der Darlehensgeber die Einlage in bar ein und die Gesellschaft zahlt das Darlehen Zug um Zug zurück.

§ 7 Durchführung der Wandlung
(1) Zur Durchführung der Wandlung beschließen die Gesellschafter eine Kapitalerhöhung um den erforderlichen Nennbetrag, schließen den Darlehensgeber zur Übernahme der neuen Geschäftsanteile zu und verzichten auf ihr Bezugsrecht. Die Gesellschaft lässt die Kapitalerhöhung unverzüglich zum Handelsregister anmelden und reicht eine aktualisierte Gesellschafterliste ein.
(2) Der Darlehensgeber gibt die Übernahmeerklärung in notariell beglaubigter Form ab und tritt einer bestehenden oder im Rahmen der Finanzierungsrunde abzuschließenden Gesellschaftervereinbarung bei, soweit er dort nicht schlechter gestellt wird als die Investoren der Finanzierungsrunde.
(3) Mit Eintragung der Kapitalerhöhung erlöschen die Ansprüche des Darlehensgebers aus dem Darlehen in Höhe des gewandelten Betrags.
(4) Die Kosten der Kapitalerhöhung trägt die Gesellschaft.

§ 8 Rangrücktritt
Der Darlehensgeber tritt mit seinen Ansprüchen auf Rückzahlung des Darlehens und auf Zinsen im Rang hinter die Forderungen aller gegenwärtigen und künftigen Gläubiger der Gesellschaft im Sinne des § 39 Abs. 1 Nr. 1 bis 5 InsO zurück. Außerhalb eines Insolvenzverfahrens kann er Erfüllung nur aus künftigen Jahresüberschüssen, einem Liquidationsüberschuss oder sonstigem freien Vermögen verlangen und nur, soweit dadurch weder eine Zahlungsunfähigkeit noch eine Überschuldung der Gesellschaft (§§ 17, 19 InsO) eintritt oder droht. Dieser qualifizierte Rangrücktritt dient der Vermeidung einer Überschuldung (§ 19 Abs. 2 Satz 2 InsO). Die Wandlung nach §§ 4 bis 7 bleibt vom Rangrücktritt unberührt.

§ 9 Informationsrechte und Zusicherungen
(1) Die Gesellschaft übermittelt dem Darlehensgeber bis zur Wandlung oder Rückzahlung quartalsweise innerhalb von [z. B. 4] Wochen nach Quartalsende einen Bericht mit Umsatz, Ergebnis, Liquidität und wesentlichen Entwicklungen sowie den Jahresabschluss innerhalb von [6] Monaten nach Geschäftsjahresende. Sie informiert ihn unverzüglich über geplante Kapitalmaßnahmen, Exit-Verhandlungen und Umstände, die den Fortbestand gefährden.
(2) Die Gesellschaft und die Gesellschafter sichern zu, dass zum Tag der Unterzeichnung die Angaben in der Präambel zutreffen, die Gesellschafterliste in Anlage 1 vollständig ist, keine weiteren Options-, Wandlungs- oder Bezugsrechte Dritter bestehen außer den in Anlage 2 genannten, und dass keine Insolvenzgründe vorliegen.
(3) Der Darlehensgeber behandelt alle erhaltenen Informationen vertraulich.

§ 10 Übertragung, Mitwirkungspflichten der Gesellschafter
(1) Der Darlehensgeber darf seine Rechte aus diesem Vertrag nur mit Zustimmung der Gesellschaft übertragen; die Zustimmung darf nur aus wichtigem Grund verweigert werden. Übertragungen an verbundene Unternehmen oder Familienangehörige sind zustimmungsfrei anzuzeigen.
(2) Die Gesellschafter verpflichten sich, alle Beschlüsse zu fassen, Erklärungen abzugeben und Handlungen vorzunehmen, die zur Durchführung der Wandlung erforderlich sind, insbesondere Kapitalerhöhungsbeschlüsse zu fassen und auf Bezugsrechte zu verzichten. Sie verpflichten sich, Geschäftsanteile nur an Erwerber zu übertragen, die dieser Verpflichtung beitreten.
(3) Die Gesellschafterversammlung hat dem Abschluss dieses Vertrags mit Beschluss vom [Datum] zugestimmt (Anlage 3).

§ 11 Schlussbestimmungen
(1) Dieser Vertrag wurde [in Schriftform geschlossen; den Parteien ist bekannt, dass eine notarielle Beurkundung in Betracht kommt, soweit der Vertrag Verpflichtungen zur Übernahme oder Abtretung von Geschäftsanteilen enthält / notariell beurkundet].
(2) Änderungen bedürfen der Schriftform, soweit nicht eine strengere Form gesetzlich erforderlich ist; das gilt auch für diese Klausel.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, der Sitz der Gesellschaft. Es gilt deutsches Recht.

Anlagen: 1 Gesellschafterliste, 2 Bestehende Options- und Wandlungsrechte, 3 Gesellschafterbeschluss

[Ort], den [Datum]


______________________________
[Vorname Nachname / Firma], Darlehensgeber


______________________________
[Name] [GmbH / UG (haftungsbeschränkt)], vertreten durch [Geschäftsführer]


______________________________
[Vorname Nachname], Gesellschafter


______________________________
[Vorname Nachname], Gesellschafter

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "stille-beteiligung",
    titel: "Vertrag über eine stille Beteiligung",
    kurz: "Vertrag über eine typische stille Gesellschaft nach §§ 230 ff. HGB: Einlage, Gewinn- und Verlustbeteiligung, Kontrollrechte, Kündigung und Auseinandersetzung.",
    kategorie: "gesellschaft",
    dateiname: "Stille-Beteiligung",
    wofuer: [
      "Familie, Freunde oder Mitarbeiter wollen Geld geben und am Gewinn teilhaben, aber nicht Gesellschafter werden",
      "Finanzierung eines Einzelunternehmens, einer GbR, UG oder GmbH ohne Notar und ohne Stimmrechte",
      "Wenn der Geldgeber nach außen nicht in Erscheinung treten soll",
      "Als Alternative zum Darlehen, wenn der Geldgeber Chancen und Risiken des Unternehmens mittragen will",
    ],
    enthaelt: [
      "§ 1 Gegenstand und Beginn der stillen Gesellschaft",
      "§ 2 Einlage",
      "§ 3 Geschäftsführung und Rechtsstellung des stillen Gesellschafters",
      "§ 4 Gewinn- und Verlustbeteiligung",
      "§ 5 Entnahmen und Auszahlung",
      "§ 6 Jahresabschluss, Kontroll- und Informationsrechte",
      "§ 7 Zustimmungspflichtige Geschäfte",
      "§ 8 Dauer und Kündigung",
      "§ 9 Auseinandersetzung",
      "§ 10 Tod, Insolvenz, Übertragung",
      "§ 11 Wettbewerb und Vertraulichkeit",
      "§ 12 Schlussbestimmungen",
    ],
    hinweise: [
      "Die typische stille Gesellschaft ist eine reine Innengesellschaft: Der Stille wird nicht Gesellschafter des Unternehmens, hat keine Stimmrechte und haftet Dritten nicht. In der Insolvenz des Unternehmens ist seine Einlage eine einfache Insolvenzforderung, soweit sie den Verlustanteil übersteigt (§ 236 HGB).",
      "Steuerlich erzielt der typische stille Gesellschafter Einkünfte aus Kapitalvermögen (§ 20 Abs. 1 Nr. 4 EStG); das Unternehmen behält Kapitalertragsteuer ein. Wird der Stille auch an stillen Reserven und Firmenwert beteiligt und erhält unternehmerische Mitsprache, wird er zum atypisch stillen Mitunternehmer mit ganz anderen Steuerfolgen. Die Vorlage ist bewusst typisch gehalten.",
      "Verluste des typisch Stillen sind steuerlich nur eingeschränkt nutzbar (Verweis auf § 15a EStG in § 20 Abs. 1 Nr. 4 EStG). Wer Verluste ausschließen will, kann das vertraglich tun (§ 231 Abs. 2 HGB); die Vorlage bietet beide Varianten.",
      "Bei einer GmbH oder UG kann die Beteiligung eines Stillen am Gewinn als Teilgewinnabführungsvertrag gelten, der der Zustimmung der Gesellschafterversammlung bedarf. Hole den Beschluss vor Unterschrift ein.",
      "Wirbt ein Unternehmen öffentlich um viele stille Gesellschafter, kann das eine prospektpflichtige Vermögensanlage sein (VermAnlG). Die Vorlage ist für den Einzelfall gedacht, nicht für Massenangebote.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen stiller Beteiligung und Darlehen?",
        a: "Der Darlehensgeber bekommt feste Zinsen, unabhängig vom Erfolg. Der stille Gesellschafter bekommt einen Anteil am Gewinn und trägt, wenn vereinbart, auch Verluste bis zur Höhe seiner Einlage. Dafür hat er Kontrollrechte wie ein Kommanditist. Für das Unternehmen ist die stille Beteiligung bei schwachem Ergebnis günstiger, bei starkem Ergebnis teurer.",
      },
      {
        q: "Hat der stille Gesellschafter Mitspracherechte?",
        a: "Nur die, die der Vertrag ihm gibt. Gesetzlich darf er den Jahresabschluss verlangen und die Bücher prüfen (§ 233 HGB). Die Vorlage ergänzt einen Katalog zustimmungspflichtiger Geschäfte, der die Einlage schützt, ohne den Stillen zum Mitunternehmer zu machen.",
      },
      {
        q: "Wie wird die stille Beteiligung bei Kündigung abgerechnet?",
        a: "Zum Stichtag wird ein Auseinandersetzungsguthaben ermittelt: Einlage plus nicht entnommene Gewinnanteile minus zugewiesene Verluste. Stille Reserven und Firmenwert bleiben beim typisch Stillen außen vor. Das Guthaben wird in Raten ausgezahlt, damit das Unternehmen nicht in Liquiditätsnot gerät.",
      },
      {
        q: "Muss die stille Beteiligung irgendwo eingetragen werden?",
        a: "Nein, sie erscheint weder im Handelsregister noch in der Gesellschafterliste. Bei einer GmbH oder AG kann die Beteiligung aber als Unternehmensvertrag zustimmungs- und eintragungspflichtig sein, wenn der Stille erheblich am Gewinn beteiligt wird. Steuerlich meldet das Unternehmen die Kapitalerträge über die Kapitalertragsteuer-Anmeldung.",
      },
    ],
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
    seo: {
      title: "Stille Beteiligung Vertrag Vorlage kostenlos | GründerX",
      description:
        "Kostenloser Vertrag über eine typische stille Gesellschaft: Einlage, Gewinn- und Verlustbeteiligung, Kontrollrechte, Kündigung und Auseinandersetzung nach HGB.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "geschaeftsordnung-geschaeftsfuehrung",
    titel: "Geschäftsordnung für die Geschäftsführung",
    kurz: "Geschäftsordnung für mehrere Geschäftsführer einer GmbH oder UG: Ressortverteilung, Gesamtverantwortung, zustimmungspflichtige Geschäfte, Berichtspflichten und Sitzungen.",
    kategorie: "gesellschaft",
    dateiname: "Geschaeftsordnung-Geschaeftsfuehrung",
    wofuer: [
      "Zwei oder mehr Geschäftsführer teilen sich die Arbeit und wollen Zuständigkeiten festhalten",
      "Gesellschafter wollen der Geschäftsführung klare Grenzen und Berichtspflichten vorgeben",
      "Nach einer Finanzierungsrunde, wenn Investoren Zustimmungskataloge verlangen",
      "Zur Haftungsbegrenzung durch eine schriftliche, eindeutige Ressortaufteilung",
    ],
    enthaelt: [
      "§ 1 Geltungsbereich und Grundsätze",
      "§ 2 Gesamtverantwortung und Ressortverteilung",
      "§ 3 Ressorts und Zuständigkeiten",
      "§ 4 Vorsitz und Vertretung",
      "§ 5 Sitzungen der Geschäftsführung",
      "§ 6 Beschlüsse der Geschäftsführung",
      "§ 7 Zustimmungspflichtige Geschäfte",
      "§ 8 Berichtspflichten gegenüber den Gesellschaftern",
      "§ 9 Interessenkonflikte, Vertraulichkeit",
      "§ 10 Inkrafttreten und Änderungen",
    ],
    hinweise: [
      "Eine Ressortaufteilung entlastet nur, wenn sie schriftlich, klar und von allen Geschäftsführern vereinbart ist und die Beteiligten fachlich geeignet sind. Das hat der Bundesgerichtshof 2018 ausdrücklich verlangt. Mündliche Absprachen helfen im Haftungsfall nicht.",
      "Auch bei Ressortverteilung bleibt jeder Geschäftsführer für die Gesamtgesellschaft verantwortlich: Er muss die Kollegen überwachen und bei Anzeichen für Probleme eingreifen. Pflichten wie Insolvenzantrag (§ 15a InsO), Steuern und Sozialabgaben lassen sich nicht delegieren.",
      "Die Geschäftsordnung bindet nur im Innenverhältnis. Nach außen bleibt die Vertretungsmacht so, wie sie im Handelsregister steht (§ 37 Abs. 2 GmbHG). Ein Verstoß macht das Geschäft nicht unwirksam, löst aber Haftung des Geschäftsführers aus.",
      "Die Geschäftsordnung sollte von der Gesellschafterversammlung beschlossen werden, nicht nur von den Geschäftsführern selbst. Nur dann kann sie Zustimmungsvorbehalte wirksam vorgeben (§ 37 Abs. 1 GmbHG), und Änderungen durch die Geschäftsführer sind ausgeschlossen.",
    ],
    faqs: [
      {
        q: "Wer erlässt die Geschäftsordnung?",
        a: "Vorrangig die Gesellschafterversammlung, weil sie den Geschäftsführern Weisungen erteilen kann. Ist in der Satzung nichts geregelt, dürfen die Geschäftsführer sich auch selbst eine Geschäftsordnung geben, solange sie Satzung und Gesellschafterbeschlüssen nicht widerspricht. Die Vorlage sieht den Beschluss der Gesellschafter vor.",
      },
      {
        q: "Schützt die Ressortverteilung vor Haftung?",
        a: "Teilweise. Für Fehler im fremden Ressort haftet ein Geschäftsführer nur, wenn er seine Überwachungspflicht verletzt hat, also Warnzeichen ignoriert oder sich nicht regelmäßig informiert hat. Die schriftliche Aufteilung senkt das Risiko erheblich, beseitigt es aber nicht; bei Krise und Insolvenzreife gilt wieder volle Gesamtverantwortung.",
      },
      {
        q: "Was gehört in den Katalog zustimmungspflichtiger Geschäfte?",
        a: "Alles, was die Gesellschaft über das Tagesgeschäft hinaus bindet: Kredite, Bürgschaften, langfristige Verträge, Investitionen über einem Schwellenwert, Beteiligungen, Personal ab einer Gehaltsgrenze, Geschäfte mit Gesellschaftern. Die Schwellen sollten zur Unternehmensgröße passen; zu niedrige Grenzen lähmen die Geschäftsführung.",
      },
      {
        q: "Brauchen wir die Geschäftsordnung auch mit nur einem Geschäftsführer?",
        a: "Nein, dann reichen Zustimmungsvorbehalte in Satzung oder Anstellungsvertrag. Die Geschäftsordnung entfaltet ihren Wert bei mehreren Geschäftsführern, weil sie Ressorts, Sitzungen und Beschlussfassung regelt. Für den Fall eines späteren zweiten Geschäftsführers kann sie aber schon vorbereitet werden.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann brauchst du eine Geschäftsordnung für die Geschäftsführung?",
        text: `Sobald eine GmbH oder UG zwei oder mehr Geschäftsführer hat, stellt sich jeden Tag die Frage, wer was entscheiden darf. Ohne Geschäftsordnung gilt Gesamtgeschäftsführung: Jeder muss bei allem mitentscheiden, und jeder haftet für alles. Eine schriftliche Ressortverteilung ist der einzige Weg, die Arbeit aufzuteilen und die Haftung des einzelnen Geschäftsführers auf sein Ressort und die Überwachung der Kollegen zu begrenzen.

Du brauchst die Vorlage außerdem, wenn die Gesellschafter der Geschäftsführung Grenzen setzen wollen, etwa über einen Katalog zustimmungspflichtiger Geschäfte und feste Berichtspflichten, oder wenn nach einer Finanzierungsrunde Investoren genau solche Kataloge verlangen. Auch Gründerteams mit einem CEO, CFO und CTO nutzen sie, um Sitzungsrhythmus, Beschlussfassung und Vertretung bei Abwesenheit zu klären. Die Vorlage ist als Beschluss der Gesellschafterversammlung aufgebaut, den die Geschäftsführer gegenzeichnen.`,
      },
      {
        titel: "Was muss in eine Geschäftsordnung der GmbH-Geschäftsführung?",
        text: `Die Geschäftsordnung regelt das Innenverhältnis zwischen Geschäftsführern und zur Gesellschafterversammlung. Die zehn Paragraphen der Vorlage:

- Geltungsbereich, Bindung an Gesetz, Satzung und Weisungen, Abgrenzung zur Vertretung nach außen (§ 1)
- Gesamtverantwortung, Überwachungspflicht und die Liste nicht delegierbarer Pflichten wie Insolvenzantrag, Kapitalerhaltung, Steuern, Sozialabgaben, Gesellschafterliste, Transparenzregister (§ 2)
- konkrete Ressorts für CEO, CFO/COO und CTO, Eigenverantwortung im Budget, Vertretung bei Verhinderung (§ 3)
- Vorsitz ohne Weisungsrecht und interne Grenzen der Einzelvertretung (§ 4)
- Sitzungsrhythmus, Einberufung, Tagesordnung, Protokoll und Aufbewahrung (§ 5)
- Vorlagepflicht an die Gesamtgeschäftsführung, Beschlussfähigkeit, Mehrheit, Stimmengleichheit, Umlaufverfahren, Eskalation an die Gesellschafter (§ 6)
- Katalog zustimmungspflichtiger Geschäfte mit elf Positionen und Eilregelung (§ 7)
- monatliche, vierteljährliche und jährliche Berichte sowie Ad-hoc-Meldungen (§ 8)
- Interessenkonflikte und Vertraulichkeit (§ 9)
- Inkrafttreten, Änderung nur durch Gesellschafterbeschluss, Vorrang der Satzung (§ 10)

Der Katalog in § 7 ist das Stück, das Gesellschafter und Investoren am genauesten lesen; die Ressortverteilung in § 3 ist das Stück, das im Haftungsfall zählt.`,
      },
      {
        titel: "Geschäftsordnung Muster ausfüllen: Ressorts und Schwellen festlegen",
        text: `Die Vorlage ist schnell ausgefüllt, braucht aber vorher eine ehrliche Aufgabenverteilung:

- Kopf: Firma, Sitz, HRB, Datum des Gesellschafterbeschlusses und die Satzungsnorm, falls die Satzung eine Geschäftsordnung vorsieht.
- § 3 Abs. 1: Namen und Ressorts. Bei zwei Geschäftsführern die drei Blöcke auf zwei zusammenführen; jede Aufgabe darf nur in einem Ressort stehen. Prüfe, ob jeder für sein Ressort fachlich geeignet ist, das ist Voraussetzung für die Haftungsentlastung.
- § 3 Abs. 3: Dauer der Verhinderung, ab der vertreten wird, und wer vertritt.
- § 4: Name des Vorsitzenden und die interne Wertgrenze für die Einzelvertretung.
- § 5: Sitzungsrhythmus, Ladungsfrist, Frist für die Tagesordnung, Protokollversand und Aufbewahrungsdauer.
- § 6: Quorum, Einstimmigkeit oder Mehrheit, Regel bei Stimmengleichheit; nicht gewählte Varianten löschen.
- § 7: Schwellenwerte für Investitionen, Kredite, Vertragslaufzeiten, Gehälter und Streitwerte sowie der Stichtag für das Jahresbudget. Setze die Grenzen so, dass das Tagesgeschäft ohne Gesellschafterbeschluss läuft.
- § 8: Stichtag für das Monatsreporting und Horizont der Mittelfristplanung.
- § 10: Datum des Inkrafttretens.

Unterschrieben wird vom Versammlungsleiter für die Gesellschafter und von jedem Geschäftsführer zur Kenntnisnahme. Jeder neue Geschäftsführer bestätigt die Geschäftsordnung bei Amtsantritt. Word für die Anpassung, PDF zur Ablage im Beschlussbuch.`,
      },
      {
        titel: "Typische Fehler bei Geschäftsordnung und Ressortverteilung",
        text: `Fehler eins: Die Ressortverteilung existiert nur mündlich oder in einer E-Mail. Der Bundesgerichtshof verlangt eine klare, schriftliche und von allen Geschäftsführern gebilligte Aufteilung; sonst haftet jeder für alles. Fehler zwei: Die Geschäftsführer geben sich die Ordnung selbst, obwohl die Gesellschafter Zustimmungsvorbehalte wollen. Weisungen an die Geschäftsführung kann nur die Gesellschafterversammlung erteilen (§ 37 Abs. 1 GmbHG); deshalb sieht die Vorlage den Gesellschafterbeschluss vor.

Fehler drei: Die Überwachungspflicht wird als erledigt betrachtet. Auch mit Ressortverteilung muss sich jeder Geschäftsführer regelmäßig über die anderen Ressorts informieren und bei Warnzeichen eingreifen; in der Krise gilt wieder volle Gesamtverantwortung. Fehler vier: zu niedrige Schwellenwerte im Zustimmungskatalog. Wenn jede Bestellung über 500 EUR einen Gesellschafterbeschluss braucht, hält sich niemand daran, und die Geschäftsordnung verliert ihre Wirkung.

Fehler fünf: Die Geschäftsordnung widerspricht der Satzung oder dem Anstellungsvertrag. Satzung geht vor, und ein Zustimmungskatalog im Anstellungsvertrag sollte auf die Geschäftsordnung verweisen statt sie zu wiederholen. Fehler sechs: Kein Protokoll der Geschäftsführersitzungen. Gerade das Protokoll mit abweichenden Voten ist im Haftungsfall der Beweis, dass ein Geschäftsführer seiner Überwachungspflicht nachgekommen ist.`,
      },
      {
        titel: "Rechtliche Grundlagen: § 37 GmbHG und die Haftung nach § 43 GmbHG",
        text: `Die Geschäftsführer sind der Gesellschaft gegenüber verpflichtet, die Beschränkungen einzuhalten, die Satzung oder Gesellschafterbeschlüsse ihnen setzen (§ 37 Abs. 1 GmbHG). Nach außen ist die Vertretungsmacht unbeschränkbar (§ 37 Abs. 2 GmbHG): Ein Vertrag, den ein Geschäftsführer entgegen der Geschäftsordnung schließt, bindet die Gesellschaft, löst aber seine Haftung aus. Die Gesellschafterversammlung ist das oberste Organ der GmbH und kann der Geschäftsführung Weisungen erteilen, deshalb ist sie der richtige Erlasser der Geschäftsordnung.

Die Haftung richtet sich nach § 43 GmbHG: Sorgfalt eines ordentlichen Geschäftsmannes, gesamtschuldnerische Haftung mehrerer Geschäftsführer. Eine Ressortaufteilung begrenzt diese Haftung nur unter den Voraussetzungen, die der BGH in seinem Urteil von 2018 aufgestellt hat: eindeutige, schriftliche Aufgabenzuweisung, fachlich geeignete Personen, Gesamtverantwortung für zentrale Pflichten und laufende Überwachung. Nicht delegierbar sind insbesondere die Insolvenzantragspflicht nach § 15a InsO, die Kapitalerhaltung nach §§ 30, 31 GmbHG, die Pflicht zur Einberufung bei Verlust der Hälfte des Stammkapitals nach § 49 Abs. 3 GmbHG sowie die steuerlichen Pflichten nach § 34 AO mit der Haftung nach § 69 AO und die Abführung von Sozialversicherungsbeiträgen.

Die Geschäftsordnung ist formfrei; ein Beschluss in Textform mit Unterschrift genügt. Sie ist nicht eintragungsfähig und wird nicht veröffentlicht.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht",
        text: `Die Geschäftsordnung aus der Vorlage passt für eine GmbH oder UG mit zwei bis vier Geschäftsführern und einer überschaubaren Gesellschafterstruktur. Anwaltliche Abstimmung brauchst du, wenn

- die Gesellschaft einen Aufsichtsrat oder Beirat hat, dessen Zustimmungsrechte mit dem Katalog in § 7 verzahnt werden müssen,
- Investoren eine Gesellschaftervereinbarung mit eigenen Zustimmungskatalogen und Vetorechten haben; dann müssen Satzung, Gesellschaftervereinbarung und Geschäftsordnung widerspruchsfrei sein,
- die Gesellschaft Teil eines Konzerns ist und Weisungen der Muttergesellschaft berücksichtigt werden müssen,
- Geschäftsführer im Ausland sitzen oder die Gesellschaft regulierten Tätigkeiten nachgeht, etwa im Finanz- oder Gesundheitsbereich mit eigenen Organisationspflichten,
- bereits ein Haftungsfall oder eine Krise im Raum steht und die Geschäftsordnung als Beleg für die Pflichterfüllung dienen soll.

Bei einer Gesellschaft mit nur einem Geschäftsführer reicht ein Zustimmungskatalog in Satzung oder Anstellungsvertrag. GründerX stellt diese Vorlage als Software-Muster bereit, eine Rechtsberatung ist damit nicht verbunden; die Abstimmung mit Satzung und Anstellungsverträgen gehört zum Anwalt, der die Gesellschaft ohnehin betreut.`,
      },
    ],
    seo: {
      title: "Geschäftsordnung Geschäftsführung Vorlage GmbH | GründerX",
      description:
        "Geschäftsordnung für mehrere GmbH- oder UG-Geschäftsführer: Ressortverteilung, Gesamtverantwortung, zustimmungspflichtige Geschäfte, Berichte, Sitzungen.",
    },
    stand: "2026-10",
    text: `Geschäftsordnung für die Geschäftsführung

der [Name] [GmbH / UG (haftungsbeschränkt)] mit Sitz in [Ort], Amtsgericht [Ort], HRB [Nummer]

beschlossen von der Gesellschafterversammlung am [Datum] gemäß § 37 Abs. 1 GmbHG [und § [Nummer] des Gesellschaftsvertrags]

§ 1 Geltungsbereich und Grundsätze
(1) Diese Geschäftsordnung gilt für alle gegenwärtigen und künftigen Geschäftsführer der Gesellschaft. Jeder neu bestellte Geschäftsführer bestätigt ihre Kenntnisnahme schriftlich.
(2) Die Geschäftsführer führen die Geschäfte der Gesellschaft gemeinschaftlich nach Gesetz, Gesellschaftsvertrag, den Beschlüssen und Weisungen der Gesellschafterversammlung, ihren Anstellungsverträgen und dieser Geschäftsordnung. Sie arbeiten vertrauensvoll zusammen und informieren sich gegenseitig laufend über alle wesentlichen Vorgänge in ihren Ressorts.
(3) Die Geschäftsordnung regelt das Innenverhältnis. Die Vertretungsbefugnis im Außenverhältnis richtet sich nach Gesellschaftsvertrag und Handelsregister und bleibt unberührt (§ 37 Abs. 2 GmbHG).

§ 2 Gesamtverantwortung und Ressortverteilung
(1) Die Geschäftsführer tragen gemeinsam die Verantwortung für die gesamte Geschäftsführung. Unbeschadet der Ressortverteilung nach § 3 bleibt jeder Geschäftsführer verpflichtet, sich über die Angelegenheiten der anderen Ressorts zu informieren, die Tätigkeit der übrigen Geschäftsführer zu überwachen und bei Anhaltspunkten für Pflichtverstöße oder Gefahren für die Gesellschaft einzuschreiten.
(2) Nicht delegierbar und stets Sache aller Geschäftsführer gemeinsam sind insbesondere: Überwachung der Zahlungsfähigkeit und Prüfung einer Überschuldung, Stellung eines Insolvenzantrags (§ 15a InsO), Einhaltung der Kapitalerhaltung (§§ 30, 31 GmbHG), Aufstellung des Jahresabschlusses, Abführung von Steuern und Sozialversicherungsbeiträgen, Einreichung der Gesellschafterliste, Erfüllung der Pflichten gegenüber dem Transparenzregister sowie Entscheidungen von grundsätzlicher Bedeutung.
(3) Angelegenheiten, die mehrere Ressorts betreffen, sind gemeinsam zu entscheiden. Im Zweifel ist die Angelegenheit der Gesamtgeschäftsführung vorzulegen.

§ 3 Ressorts und Zuständigkeiten
(1) Die Ressorts werden wie folgt verteilt:
   a) [Vorname Nachname] (Vorsitz / CEO): Strategie und Unternehmensplanung, Vertrieb und Kunden, Marketing, Investoren- und Gesellschafterbeziehungen, Personal, Recht und Verträge, Öffentlichkeitsarbeit.
   b) [Vorname Nachname] (CFO / COO): Finanzen, Buchhaltung und Controlling, Liquiditätsplanung, Steuern, Banken, Versicherungen, Einkauf, Logistik, Verwaltung, Datenschutz-Organisation.
   c) [Vorname Nachname] (CTO): Produktentwicklung, Technik und IT-Infrastruktur, IT-Sicherheit, Qualitätssicherung, Schutzrechte.
   [Bei zwei Geschäftsführern die Ressorts entsprechend zusammenfassen.]
(2) Jeder Geschäftsführer führt sein Ressort eigenverantwortlich im Rahmen des Budgets und der Beschlüsse der Gesamtgeschäftsführung. Er darf Mitarbeitern seines Ressorts Aufgaben übertragen, bleibt aber für Auswahl, Anleitung und Überwachung verantwortlich.
(3) Die Ressortverteilung kann nur durch Beschluss der Gesellschafterversammlung geändert werden. Bei Verhinderung eines Geschäftsführers über mehr als [z. B. 2] Wochen vertritt ihn [der Vorsitzende / der in Absatz 1 jeweils nachfolgend genannte Geschäftsführer] in seinem Ressort.

§ 4 Vorsitz und Vertretung
(1) [Vorname Nachname] ist Vorsitzender der Geschäftsführung. Er koordiniert die Ressorts, bereitet die Sitzungen vor, leitet sie und vertritt die Geschäftsführung gegenüber der Gesellschafterversammlung. Ein Weisungsrecht gegenüber den übrigen Geschäftsführern hat er nicht.
(2) Im Außenverhältnis gilt die im Handelsregister eingetragene Vertretungsregelung. Im Innenverhältnis darf ein Geschäftsführer von einer Einzelvertretungsbefugnis nur innerhalb seines Ressorts und bis zu einem Geschäftswert von [Betrag] EUR Gebrauch machen; darüber hinaus ist die Zustimmung eines weiteren Geschäftsführers einzuholen.

§ 5 Sitzungen der Geschäftsführung
(1) Die Geschäftsführung tritt mindestens [z. B. alle zwei Wochen] zu einer Sitzung zusammen. Darüber hinaus kann jeder Geschäftsführer unter Angabe der Gegenstände eine Sitzung mit einer Frist von [z. B. 3] Werktagen verlangen; in dringenden Fällen entfällt die Frist.
(2) Sitzungen können in Präsenz, per Video- oder Telefonkonferenz stattfinden. Der Vorsitzende übersendet die Tagesordnung spätestens [z. B. 2] Werktage vor der Sitzung.
(3) Über jede Sitzung wird ein Protokoll geführt, das Teilnehmer, Beschlüsse, Abstimmungsergebnisse und abweichende Voten festhält. Es wird innerhalb von [z. B. 5] Werktagen an alle Geschäftsführer verteilt und gilt als genehmigt, wenn nicht innerhalb von einer Woche widersprochen wird. Die Protokolle werden [z. B. 10] Jahre aufbewahrt.

§ 6 Beschlüsse der Geschäftsführung
(1) Der Gesamtgeschäftsführung sind alle Angelegenheiten von grundsätzlicher Bedeutung, ressortübergreifende Angelegenheiten, die Geschäfte nach § 7 vor Einholung der Gesellschafterzustimmung sowie alle Angelegenheiten vorzulegen, die ein Geschäftsführer zur Entscheidung stellt.
(2) Die Geschäftsführung ist beschlussfähig, wenn alle Geschäftsführer geladen und mindestens [die Hälfte / zwei] anwesend sind. Beschlüsse werden [einstimmig / mit einfacher Mehrheit der anwesenden Geschäftsführer] gefasst. [Bei Stimmengleichheit gibt die Stimme des Vorsitzenden den Ausschlag / Bei Stimmengleichheit gilt der Antrag als abgelehnt und ist der Gesellschafterversammlung vorzulegen.]
(3) Beschlüsse können auch außerhalb von Sitzungen per E-Mail oder in anderer Textform gefasst werden, wenn kein Geschäftsführer diesem Verfahren widerspricht.
(4) Ein überstimmter Geschäftsführer kann verlangen, dass die Angelegenheit der Gesellschafterversammlung vorgelegt wird; bis zu deren Entscheidung wird der Beschluss nicht vollzogen, es sei denn, der Gesellschaft droht sonst ein erheblicher Nachteil.

§ 7 Zustimmungspflichtige Geschäfte
(1) Die Geschäftsführung bedarf für folgende Geschäfte und Maßnahmen der vorherigen Zustimmung der Gesellschafterversammlung, soweit sie nicht in einem von der Gesellschafterversammlung genehmigten Jahresbudget enthalten sind:
   a) Erwerb, Veräußerung und Belastung von Grundstücken,
   b) Gründung, Erwerb, Veräußerung und Aufgabe von Unternehmen, Beteiligungen und Zweigniederlassungen,
   c) Investitionen über [Betrag] EUR im Einzelfall oder [Betrag] EUR im Geschäftsjahr,
   d) Aufnahme von Krediten, Gewährung von Darlehen sowie Übernahme von Bürgschaften, Garantien und sonstigen Haftungen über [Betrag] EUR,
   e) Abschluss, Änderung und Beendigung von Verträgen mit einer Laufzeit über [z. B. 2] Jahre oder einem Jahreswert über [Betrag] EUR, insbesondere Miet-, Leasing- und Lizenzverträge,
   f) Einstellung, Beförderung und Entlassung von Mitarbeitern mit einem Jahresgehalt über [Betrag] EUR sowie Zusage von Pensionen, Tantiemen und Beteiligungen,
   g) Erteilung von Prokura und Generalvollmacht,
   h) Geschäfte mit Gesellschaftern, Geschäftsführern, deren Angehörigen oder mit ihnen verbundenen Unternehmen,
   i) Einleitung von Rechtsstreitigkeiten und Abschluss von Vergleichen mit einem Streitwert über [Betrag] EUR,
   j) Aufnahme neuer und Aufgabe bestehender Geschäftsfelder, Änderung der Preis- und Rabattpolitik von grundsätzlicher Bedeutung,
   k) Verabschiedung des Jahresbudgets (Umsatz-, Ergebnis-, Investitions- und Liquiditätsplan) bis zum [Datum] für das folgende Geschäftsjahr.
(2) Die Gesellschafterversammlung kann Schwellenwerte und Katalog durch Beschluss ändern und Zustimmungen allgemein oder für den Einzelfall vorab erteilen.
(3) Kann eine Zustimmung wegen Eilbedürftigkeit nicht rechtzeitig eingeholt werden, darf die Geschäftsführung handeln, wenn der Gesellschaft sonst ein erheblicher Schaden droht; sie informiert die Gesellschafter unverzüglich.

§ 8 Berichtspflichten gegenüber den Gesellschaftern
(1) Die Geschäftsführung berichtet der Gesellschafterversammlung
   a) monatlich bis zum [z. B. 15.] des Folgemonats über Umsatz, Ergebnis, Liquidität und Auftragslage im Vergleich zum Budget (Monatsreporting),
   b) quartalsweise über den Stand der Umsetzung der Unternehmensplanung, Personal, wesentliche Projekte und Risiken,
   c) jährlich mit Vorlage des Jahresabschlusses, des Budgets und einer Mittelfristplanung über [z. B. 3] Jahre.
(2) Unverzüglich zu berichten ist über Umstände, die die Vermögens-, Finanz- oder Ertragslage wesentlich beeinträchtigen können, insbesondere drohende Zahlungsunfähigkeit, Verlust der Hälfte des Stammkapitals (§ 49 Abs. 3 GmbHG), wesentliche Rechtsstreitigkeiten, Behördenverfahren, Datenschutzvorfälle und Kündigungen von Schlüsselkunden oder Schlüsselmitarbeitern.
(3) Die Berichte sind in Textform zu erstatten und von allen Geschäftsführern zu verantworten.

§ 9 Interessenkonflikte, Vertraulichkeit
(1) Jeder Geschäftsführer legt den übrigen Geschäftsführern und der Gesellschafterversammlung Interessenkonflikte unverzüglich offen, insbesondere Beteiligungen an oder Tätigkeiten für Geschäftspartner oder Wettbewerber sowie Geschäfte mit Angehörigen. Er wirkt an Entscheidungen, bei denen er befangen ist, nicht mit.
(2) Die Geschäftsführer bewahren über die Beratungen und Beschlüsse der Geschäftsführung und alle vertraulichen Angelegenheiten der Gesellschaft Stillschweigen, auch nach ihrem Ausscheiden.

§ 10 Inkrafttreten und Änderungen
(1) Diese Geschäftsordnung tritt am [Datum] in Kraft und ersetzt frühere Regelungen.
(2) Änderungen und Ergänzungen bedürfen eines Beschlusses der Gesellschafterversammlung in Textform. Die Geschäftsführer können Änderungen vorschlagen.
(3) Sollte eine Bestimmung unwirksam sein, bleibt die Geschäftsordnung im Übrigen wirksam. Bei Widersprüchen zum Gesellschaftsvertrag geht dieser vor.
(4) Jeder Geschäftsführer erhält eine Ausfertigung; eine weitere wird zu den Unterlagen der Gesellschafterversammlung genommen.

[Ort], den [Datum]

Für die Gesellschafterversammlung:


______________________________
[Vorname Nachname], Versammlungsleiter


Kenntnis genommen und anerkannt:


______________________________
[Vorname Nachname], Geschäftsführer


______________________________
[Vorname Nachname], Geschäftsführer


[______________________________
[Vorname Nachname], Geschäftsführer]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "austritt-gbr-vereinbarung",
    titel: "Ausscheidensvereinbarung GbR-Gesellschafter",
    kurz: "Vereinbarung über das Ausscheiden eines Gesellschafters aus einer GbR: Stichtag, Abfindung, Freistellung, Nachhaftung, Übergabe, Wettbewerb und Erledigungsklausel.",
    kategorie: "gesellschaft",
    dateiname: "Ausscheidensvereinbarung-GbR",
    wofuer: [
      "Ein Gesellschafter verlässt die GbR, die übrigen führen sie fort",
      "Einvernehmliche Trennung statt Kündigung und Streit über die Abfindung",
      "Zwei-Personen-GbR, bei der einer das Geschäft als Einzelunternehmen weiterführt",
      "Wenn der Ausscheidende von Schulden, Mietvertrag und Kreditlinien freigestellt werden soll",
    ],
    enthaelt: [
      "§ 1 Ausscheiden und Stichtag",
      "§ 2 Fortführung der Gesellschaft, Anwachsung",
      "§ 3 Abfindung",
      "§ 4 Auseinandersetzungsbilanz und schwebende Geschäfte",
      "§ 5 Freistellung und Nachhaftung",
      "§ 6 Übergabe, Zugänge, Konten, Vollmachten",
      "§ 7 Name, Domain, Kunden, Register",
      "§ 8 Wettbewerb und Vertraulichkeit",
      "§ 9 Steuern",
      "§ 10 Erledigungsklausel",
      "§ 11 Schlussbestimmungen",
    ],
    hinweise: [
      "Seit dem MoPeG führt das Ausscheiden nicht mehr zur Auflösung: Die GbR besteht mit den übrigen Gesellschaftern fort, der Anteil des Ausscheidenden wächst ihnen an (§§ 712, 723 BGB). Bleibt nur ein Gesellschafter übrig, erlischt die Gesellschaft ohne Liquidation und das Vermögen geht auf ihn über (§ 712a BGB).",
      "Der Ausscheidende haftet für Verbindlichkeiten, die vor seinem Ausscheiden begründet wurden, fünf Jahre weiter (§ 728b BGB). Die Freistellung im Vertrag wirkt nur im Innenverhältnis; gegenüber Bank, Vermieter und Lieferanten hilft nur deren schriftliche Entlassung aus der Haftung.",
      "Ohne vertragliche Regelung schuldet die Gesellschaft eine angemessene Abfindung, der Ausscheidende haftet aber auch für einen Fehlbetrag (§§ 728, 728a BGB). Die Vereinbarung muss deshalb beides regeln: Abfindung und Verlustausgleich.",
      "Ist die GbR im Gesellschaftsregister eingetragen (eGbR), muss das Ausscheiden zum Register angemeldet werden, mit notariell beglaubigter Anmeldung. Auch Gewerbeamt, Finanzamt, Bank und Transparenzregister sind zu informieren.",
      "Steuerlich kann die Abfindung beim Ausscheidenden zu einem Veräußerungsgewinn führen und bei den Verbleibenden zu Anschaffungskosten. Vor Unterschrift mit dem Steuerberater klären, besonders wenn stille Reserven oder ein Firmenwert vergütet werden.",
    ],
    faqs: [
      {
        q: "Wie wird die Abfindung berechnet?",
        a: "Maßgeblich ist zuerst der Gesellschaftsvertrag. Fehlt dort eine Regelung, schuldet die Gesellschaft den Anteil am Verkehrswert. Die Vorlage lässt euch einen festen Betrag oder eine Berechnungsmethode wählen und sieht Ratenzahlung vor. Wer schnell und sauber trennen will, einigt sich auf einen Festbetrag und schließt Nachforderungen aus.",
      },
      {
        q: "Haftet der ausgeschiedene Gesellschafter weiter für Schulden?",
        a: "Ja, für alle Verbindlichkeiten, die vor dem Ausscheiden begründet wurden, bis zu fünf Jahre lang. Das gilt auch für laufende Miet- und Kreditverträge. Die Vereinbarung stellt ihn im Innenverhältnis frei, das heißt die Gesellschaft muss ihm erstatten, was Gläubiger von ihm fordern. Sicherer ist die Entlassung durch den Gläubiger selbst.",
      },
      {
        q: "Was passiert, wenn nach dem Ausscheiden nur ein Gesellschafter übrig bleibt?",
        a: "Die GbR erlischt, weil eine Gesellschaft mindestens zwei Gesellschafter braucht. Das Vermögen geht im Wege der Gesamtrechtsnachfolge auf den Verbleibenden über, der das Geschäft als Einzelunternehmer fortführt. Die Vorlage enthält dafür eine Variante mit Übergang von Verträgen, Konten und Domains.",
      },
      {
        q: "Brauchen wir für die Vereinbarung einen Notar?",
        a: "Nur, wenn Grundstücke zum Gesellschaftsvermögen gehören oder die eGbR-Anmeldung zum Gesellschaftsregister ansteht; dann ist die Unterschrift unter der Registeranmeldung zu beglaubigen, nicht die Vereinbarung selbst. Sonst reicht Schriftform. Jeder Beteiligte sollte eine unterschriebene Ausfertigung erhalten.",
      },
    ],
    ratgeber: [
      {
        titel: "Wann brauchst du eine Vereinbarung über das Ausscheiden aus der GbR?",
        text: `Ein Gesellschafter will raus: wegen eines neuen Jobs, aus persönlichen Gründen oder weil die Zusammenarbeit nicht mehr funktioniert. Die anderen wollen das Geschäft weiterführen. Das Gesetz kennt für diesen Fall die Kündigung mit Abfindung, aber es regelt weder, wer die Domain behält, noch wer den Mietvertrag übernimmt, noch wie der Ausscheidende aus dem Bankkredit kommt.

Die Ausscheidensvereinbarung brauchst du, wenn ihr euch einvernehmlich trennen wollt, statt eine Kündigung mit Fristen und Streit über die Bewertung auszufechten. Sie passt für die Drei-Personen-GbR, die zu zweit weitermacht, ebenso wie für die Zwei-Personen-GbR, bei der einer das Geschäft als Einzelunternehmen übernimmt. Und sie ist der Ort, an dem Freistellung von Schulden, Übergabe von Zugängen, Kundeninformation, Wettbewerb und eine Erledigungsklausel gebündelt werden, damit nach der Unterschrift nichts mehr offen ist.`,
      },
      {
        titel: "Was muss in die Ausscheidensvereinbarung eines GbR-Gesellschafters?",
        text: `Die Vorlage folgt der Logik einer sauberen Trennung in elf Paragraphen:

- Stichtag des Ausscheidens, Ersatz einer etwaigen Kündigung, Freistellung bis dahin (§ 1)
- Fortführung mit Anwachsung und neue Beteiligungsquoten, alternativ Erlöschen der Zwei-Personen-GbR mit Gesamtrechtsnachfolge auf den Verbleibenden, Registeranmeldung bei eGbR (§ 2)
- Abfindung als Festbetrag oder nach Bewertungsmethode, Abgeltung aller Ansprüche, Privatkonto, Zahlungsplan mit Verzinsung und Verfallklausel, Haftung der verbleibenden Gesellschafter, Teilhabe am laufenden Ergebnis (§ 3)
- Auseinandersetzungsbilanz, schwebende Geschäfte, Fehlbetrag (§ 4)
- Freistellung im Innenverhältnis, Hinweis auf die fünfjährige Nachhaftung, Pflicht zur Haftentlassung bei Bank, Vermieter und Lieferanten, Sicherheit (§ 5)
- Übergabe von Unterlagen, Geräten, Zugängen, Erlöschen der Vollmachten, Kontoverfügung, Einsichtsrecht, Tätigkeitsbescheinigung (§ 6)
- Name, Domain, Marke, Social-Media-Konten, Kunden, Meldungen an Gewerbeamt, Finanzamt, Register und Berufsgenossenschaft (§ 7)
- Kunden- und Mitarbeiterschutz mit Vertragsstrafe, Vertraulichkeit (§ 8)
- Steuern und Feststellungserklärung (§ 9)
- Erledigungsklausel mit Ausnahmen (§ 10)
- Fortgeltung des Gesellschaftsvertrags, Schriftform, Gerichtsstand (§ 11)

Die vier Anlagen mit schwebenden Geschäften, Verbindlichkeiten, Übergabeprotokoll und Kundenliste machen die Vereinbarung erst vollständig.`,
      },
      {
        titel: "Austrittsvereinbarung GbR Muster ausfüllen",
        text: `Nimm den Gesellschaftsvertrag, die letzte Bilanz oder EÜR und die Kontoauszüge zur Hand:

- Parteien: Ausscheidender, verbleibende Gesellschafter, Gesellschaft mit Anschrift und bei eGbR die Registernummer. Präambel mit Datum des Gesellschaftsvertrags und der Beteiligungsquote des Ausscheidenden.
- § 1: Stichtag und Beginn der Freistellung mit Höhe der weitergezahlten Entnahmen.
- § 2: Standardvariante mit neuen Quoten oder die Zwei-Personen-Variante; eine löschen. Bei eGbR den Registersatz behalten.
- § 3: Festbetrag oder Bewertungsmethode mit Gutachter; dann Privatkontostand, Zahlungsplan, Zinssatz, Verzugsfrist und Entscheidung zum laufenden Jahresergebnis.
- § 4: Zweck der Auseinandersetzungsbilanz, Prüffrist, Behandlung schwebender Geschäfte und eines Fehlbetrags.
- § 5: die Gläubiger, bei denen die Haftentlassung erwirkt werden soll, Frist und Höhe der Sicherheit.
- § 6: Bank und IBAN des Geschäftskontos, Ende des Einsichtsrechts.
- § 7: Name, Domain, Marke; bei Namensbestandteil des Ausscheidenden Einwilligung oder Änderungsfrist.
- § 8: Dauer, Gebiet und Geschäftsbereich des Kundenschutzes, Vertragsstrafe, oder die Variante ohne Wettbewerbsverbot.
- § 9: Name des Steuerberaters oder die Variante ohne Prüfung.

Anlagen befüllen, Übergabeprotokoll am Stichtag gemeinsam unterschreiben. Die Vorlage gibt es als Word und als PDF.`,
      },
      {
        titel: "Typische Fehler beim Ausscheiden aus der GbR",
        text: `Fehler eins: Die Freistellung im Vertrag wird für eine Entlassung aus der Haftung gehalten. Gegenüber Bank, Vermieter und Lieferanten haftet der Ausscheidende fünf Jahre weiter; nur deren schriftliche Zustimmung befreit ihn. Die Vorlage verpflichtet die Verbleibenden deshalb, diese Zustimmung einzuholen, und sieht hilfsweise eine Sicherheit vor.

Fehler zwei: Abfindung ohne Abgeltungsklausel. Dann streitet man ein Jahr später über Gewinnanteile, Auslagen und Privatkontoguthaben. Fehler drei: Die Steuern werden nicht bedacht. Die Abfindung kann beim Ausscheidenden einen Veräußerungsgewinn auslösen, besonders wenn stille Reserven oder ein Firmenwert vergütet werden; bei den Verbleibenden entstehen Anschaffungskosten. Einmal Steuerberater vor Unterschrift ist günstiger als eine Nachzahlung.

Fehler vier: Zugänge und Domains vergessen. Wenn der Online-Shop auf dem privaten Account des Ausscheidenden läuft, steht das Geschäft still. Das Übergabeprotokoll in Anlage 3 gehört deshalb vor den Stichtag. Fehler fünf: Die Meldungen bleiben liegen. Gewerbeamt, Finanzamt, Transparenzregister und bei eGbR das Gesellschaftsregister müssen informiert werden; der Ausscheidende meldet sein Gewerbe ab. Fehler sechs: Bei der Zwei-Personen-GbR wird die falsche Variante gewählt. Mit nur einem Verbleibenden erlischt die GbR, und das Vermögen geht auf ihn als Einzelunternehmer über.`,
      },
      {
        titel: "Rechtliche Grundlagen nach dem MoPeG: §§ 712 bis 728b BGB",
        text: `Seit dem 1. Januar 2024 gilt das neue Personengesellschaftsrecht. Das Ausscheiden eines Gesellschafters führt nicht mehr zur Auflösung der GbR; die Gesellschaft besteht mit den übrigen fort und der Anteil des Ausscheidenden wächst ihnen an (§ 712 Abs. 1 BGB). Die Ausscheidensgründe sind in § 723 BGB geregelt, darunter die einvernehmliche Vereinbarung, auf die § 1 der Vorlage verweist. Bleibt nur ein Gesellschafter übrig, erlischt die Gesellschaft ohne Liquidation und ihr Vermögen geht im Wege der Gesamtrechtsnachfolge auf ihn über (§ 712a BGB).

Der Ausscheidende hat Anspruch auf eine Abfindung, die ohne vertragliche Regelung dem Wert seines Anteils entspricht, und er haftet für einen Fehlbetrag anteilig (§§ 728, 728a BGB). An schwebenden Geschäften nimmt er nach § 728 Abs. 2 BGB teil, was die Vorlage in § 4 abbedingt oder auf eine Liste beschränkt. Die Nachhaftung für Altverbindlichkeiten endet fünf Jahre nach dem Ausscheiden (§ 728b BGB), gerechnet ab Kenntnis des Gläubigers oder bei eGbR ab Eintragung.

Die Vereinbarung ist formfrei; Schriftform dient dem Beweis. Nur wenn Grundstücke zum Gesellschaftsvermögen gehören oder die eGbR-Anmeldung ansteht, ist der Notar für die Beurkundung beziehungsweise die Beglaubigung der Registeranmeldung nötig. Steuerlich erstellt die Gesellschaft für das Jahr des Ausscheidens die Feststellungserklärung mit dem anteiligen Ergebnis.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht",
        text: `Die Vereinbarung ist für die einvernehmliche Trennung gedacht. Sie reicht nicht, wenn

- die Trennung streitig ist, etwa bei Ausschluss aus wichtigem Grund, Vorwürfen von Pflichtverletzungen oder einem laufenden Gerichtsverfahren; dann braucht jede Seite einen eigenen Anwalt,
- Grundstücke, Fahrzeuge mit Finanzierung, Leasingverträge oder Fördermittel im Gesellschaftsvermögen sind, deren Übergang Zustimmungen Dritter braucht,
- Mitarbeiter beschäftigt sind, deren Arbeitsverhältnisse beim Übergang auf den Verbleibenden nach § 613a BGB zu behandeln sind,
- die Abfindung erheblich ist und stille Reserven, Firmenwert oder ein Veräußerungsgewinn mit Freibeträgen steuerlich gestaltet werden sollen,
- der Ausscheidende Ehepartner oder naher Angehöriger eines Verbleibenden ist, weil dann Schenkungsfragen entstehen können,
- die GbR Marken, Patente oder Lizenzverträge hält, deren Übertragung formgebunden ist.

In diesen Fällen sollten Anwalt und Steuerberater die Vereinbarung gemeinsam prüfen, bevor sie unterschrieben wird. Die Vorlage von GründerX ist ein Software-Muster und keine Rechtsberatung; für die typische Trennung einer kleinen Dienstleistungs- oder Handels-GbR mit klaren Zahlen ist sie als Word oder PDF jedoch eine vollständige Grundlage.`,
      },
    ],
    seo: {
      title: "Austritt aus GbR: Vereinbarung Vorlage kostenlos | GründerX",
      description:
        "Kostenlose Vereinbarung zum Ausscheiden eines GbR-Gesellschafters nach MoPeG: Stichtag, Abfindung, Freistellung, Nachhaftung, Übergabe, Wettbewerb, Erledigung.",
    },
    stand: "2026-10",
    text: `Vereinbarung über das Ausscheiden eines Gesellschafters aus der [Name] GbR

zwischen

1. [Vorname Nachname], wohnhaft [Straße, PLZ Ort]
   – nachfolgend „ausscheidender Gesellschafter“ –

und

2. [Vorname Nachname], wohnhaft [Straße, PLZ Ort]
[3. [Vorname Nachname], wohnhaft [Straße, PLZ Ort]]
   – nachfolgend einzeln und gemeinsam „verbleibende Gesellschafter“ –

sowie der [Name] GbR [eGbR], [Straße, PLZ Ort] [, eingetragen im Gesellschaftsregister des Amtsgerichts [Ort] unter GsR [Nummer]], vertreten durch die verbleibenden Gesellschafter
   – nachfolgend „Gesellschaft“ –

Präambel
Die Parteien sind Gesellschafter der Gesellschaft aufgrund des Gesellschaftsvertrags vom [Datum]. Der ausscheidende Gesellschafter ist am Vermögen, Gewinn und Verlust mit [Prozent] % beteiligt. Die Parteien haben sich darauf verständigt, dass der ausscheidende Gesellschafter einvernehmlich aus der Gesellschaft ausscheidet und die verbleibenden Gesellschafter die Gesellschaft fortführen. Dies regeln sie wie folgt:

§ 1 Ausscheiden und Stichtag
(1) Der ausscheidende Gesellschafter scheidet mit Ablauf des [Datum], 24:00 Uhr („Stichtag“), einvernehmlich aus der Gesellschaft aus (§ 723 Abs. 1 Nr. 2 BGB). Einer Kündigung bedarf es nicht; eine etwa bereits erklärte Kündigung wird durch diese Vereinbarung ersetzt.
(2) Bis zum Stichtag bleibt der ausscheidende Gesellschafter mit allen Rechten und Pflichten Gesellschafter. Ab dem [Datum] ist er von der Geschäftsführung und Vertretung unter Fortzahlung seiner bisherigen Entnahmen von monatlich [Betrag] EUR freigestellt.

§ 2 Fortführung der Gesellschaft, Anwachsung
(1) Die Gesellschaft wird von den verbleibenden Gesellschaftern unter dem bisherigen Namen fortgeführt. Der Anteil des ausscheidenden Gesellschafters am Gesellschaftsvermögen wächst den verbleibenden Gesellschaftern im Verhältnis ihrer bisherigen Beteiligung an (§ 712 Abs. 1 BGB). Die Beteiligungsverhältnisse lauten ab dem Stichtag: [Vorname Nachname] [Prozent] %, [Vorname Nachname] [Prozent] %.
[Alternative bei Zwei-Personen-GbR: (1) Mit dem Ausscheiden erlischt die Gesellschaft ohne Liquidation. Das Gesellschaftsvermögen einschließlich aller Verträge, Forderungen, Verbindlichkeiten, Konten, Domains und Kennzeichen geht im Wege der Gesamtrechtsnachfolge auf den verbleibenden Gesellschafter über, der das Unternehmen als Einzelunternehmen unter dem Namen „[Name]“ fortführt (§ 712a BGB).]
(2) [Bei eGbR: Die Parteien melden das Ausscheiden unverzüglich zum Gesellschaftsregister an und wirken an der notariellen Beglaubigung mit. Die Kosten trägt die Gesellschaft.]

§ 3 Abfindung
(1) Der ausscheidende Gesellschafter erhält für sein Ausscheiden eine Abfindung in Höhe von [Betrag] EUR.
[Alternative: (1) Die Abfindung bemisst sich nach dem Wert seines Anteils zum Stichtag, der nach [Methode, z. B. „dem vereinfachten Ertragswertverfahren nach §§ 199 ff. BewG“ / „dem Buchwert laut Auseinandersetzungsbilanz zuzüglich stiller Reserven im Anlagevermögen“] zu ermitteln ist. Die Parteien beauftragen hierzu [Steuerberater / Wirtschaftsprüfer] als Schiedsgutachter; die Kosten tragen Gesellschaft und ausscheidender Gesellschafter je zur Hälfte.]
(2) Mit der Abfindung sind sämtliche Ansprüche des ausscheidenden Gesellschafters aus dem Gesellschaftsverhältnis abgegolten, insbesondere Ansprüche auf Auseinandersetzungsguthaben, Gewinnanteile für zurückliegende Geschäftsjahre, Tätigkeitsvergütungen, Auslagenersatz und Rückzahlung von Einlagen. Das Guthaben auf seinem Privatkonto in Höhe von [Betrag] EUR zum [Datum] ist in der Abfindung [enthalten / nicht enthalten und wird gesondert bis zum [Datum] ausgezahlt].
(3) Die Abfindung ist wie folgt zu zahlen: [Betrag] EUR bis zum [Datum] und der Rest in [Anzahl] gleichen Raten von je [Betrag] EUR jeweils zum [Datum]. Der offene Betrag wird mit [z. B. 3] % pro Jahr verzinst. Gerät die Gesellschaft mit einer Rate länger als [z. B. 14] Tage in Verzug, wird der gesamte Restbetrag sofort fällig.
(4) Die verbleibenden Gesellschafter haften für die Abfindung neben der Gesellschaft als Gesamtschuldner.
(5) Am Gewinn oder Verlust des laufenden Geschäftsjahres bis zum Stichtag nimmt der ausscheidende Gesellschafter [nicht mehr teil; dies ist in der Abfindung berücksichtigt / zeitanteilig teil; der Anteil wird mit Feststellung des Jahresabschlusses abgerechnet].

§ 4 Auseinandersetzungsbilanz und schwebende Geschäfte
(1) Die Gesellschaft erstellt auf den Stichtag eine Auseinandersetzungsbilanz [, die der Abfindung nach § 3 Abs. 1 Alternative zugrunde liegt / zu Dokumentationszwecken]. Der ausscheidende Gesellschafter erhält eine Abschrift und kann sie innerhalb von [z. B. 4] Wochen prüfen.
(2) An schwebenden Geschäften, die am Stichtag noch nicht abgewickelt sind, nimmt der ausscheidende Gesellschafter nicht mehr teil (abweichend von § 728 Abs. 2 BGB). [Alternative: Er nimmt am Ergebnis der in Anlage 1 aufgeführten schwebenden Geschäfte mit [Prozent] % teil; die Abrechnung erfolgt nach deren Abschluss.]
(3) Ergibt die Auseinandersetzungsbilanz einen Fehlbetrag, ist der ausscheidende Gesellschafter [zum Ausgleich im Verhältnis seiner Beteiligung verpflichtet (§ 728a BGB) / von der Ausgleichspflicht freigestellt; der Fehlbetrag ist in der Abfindung berücksichtigt].

§ 5 Freistellung und Nachhaftung
(1) Die Gesellschaft und die verbleibenden Gesellschafter stellen den ausscheidenden Gesellschafter als Gesamtschuldner von allen Verbindlichkeiten der Gesellschaft frei, die bis zum Stichtag begründet wurden oder danach begründet werden, einschließlich Steuern, Sozialabgaben, Miet-, Leasing-, Kredit- und Lieferverbindlichkeiten. Die wesentlichen Verbindlichkeiten zum Stichtag sind in Anlage 2 aufgeführt.
(2) Die Parteien sind sich bewusst, dass der ausscheidende Gesellschafter gegenüber Dritten für bis zum Stichtag begründete Verbindlichkeiten nach § 728b BGB fünf Jahre weiterhaftet. Die verbleibenden Gesellschafter verpflichten sich, bei folgenden Gläubigern binnen [z. B. 3] Monaten die schriftliche Entlassung des ausscheidenden Gesellschafters aus der Haftung zu erwirken: [Bank (Kontokorrent/Darlehen), Vermieter (Mietvertrag [Objekt]), Leasinggeber, Lieferant]. Gelingt dies nicht, informieren sie den ausscheidenden Gesellschafter und stellen auf Verlangen Sicherheit in Höhe von [Betrag] EUR.
(3) Wird der ausscheidende Gesellschafter von einem Gläubiger in Anspruch genommen, informiert er die Gesellschaft unverzüglich; die Gesellschaft übernimmt die Abwehr und erstattet Zahlungen innerhalb von zwei Wochen.
(4) Für Verbindlichkeiten, die der ausscheidende Gesellschafter pflichtwidrig oder ohne Vertretungsmacht begründet hat, gilt die Freistellung nicht.

§ 6 Übergabe, Zugänge, Konten, Vollmachten
(1) Der ausscheidende Gesellschafter übergibt bis zum Stichtag alle Unterlagen, Geräte, Schlüssel, Daten und Gegenstände der Gesellschaft und übergibt alle Zugangsdaten (Online-Banking, E-Mail, Shop-Systeme, Software, Social-Media-Konten, Cloud-Dienste) laut Übergabeprotokoll (Anlage 3). Eigene Kopien von Geschäftsdaten löscht er, soweit er sie nicht zur Erfüllung steuerlicher Pflichten benötigt.
(2) Alle dem ausscheidenden Gesellschafter erteilten Vollmachten und Kontovollmachten erlöschen zum Stichtag. Die Parteien wirken an der Änderung der Verfügungsberechtigung beim Geschäftskonto [Bank, IBAN] und bei Zahlungsdienstleistern unverzüglich mit.
(3) Die Gesellschaft gewährt dem ausscheidenden Gesellschafter bis zum [Datum, z. B. Ablauf der steuerlichen Aufbewahrungsfristen] auf Verlangen Einsicht in die Unterlagen, die seine Beteiligungszeit betreffen.
(4) Die Gesellschaft erteilt dem ausscheidenden Gesellschafter auf Wunsch eine Bescheinigung über die Dauer und den Inhalt seiner Tätigkeit.

§ 7 Name, Domain, Kunden, Register
(1) Der Gesellschaftsname „[Name]“, die Domain [domain.de], die Marke [Marke] und die Social-Media-Konten verbleiben bei der Gesellschaft. Soweit Domains oder Konten auf den Namen des ausscheidenden Gesellschafters registriert sind, überträgt er sie bis zum Stichtag auf die Gesellschaft oder einen verbleibenden Gesellschafter.
(2) Enthält der Gesellschaftsname den Namen des ausscheidenden Gesellschafters, [willigt er in die Fortführung ein / ist der Name innerhalb von [z. B. 6] Monaten zu ändern].
(3) Die Kundenbeziehungen und Verträge bleiben bei der Gesellschaft. Die verbleibenden Gesellschafter informieren Kunden und Lieferanten in Abstimmung mit dem ausscheidenden Gesellschafter über das Ausscheiden.
(4) Die Gesellschaft meldet das Ausscheiden beim Gewerbeamt, Finanzamt [, Gesellschaftsregister] und Transparenzregister sowie bei der Berufsgenossenschaft an. Der ausscheidende Gesellschafter meldet sein Gewerbe als Gesellschafter ab.

§ 8 Wettbewerb und Vertraulichkeit
(1) Der ausscheidende Gesellschafter verpflichtet sich, für die Dauer von [z. B. 12] Monaten nach dem Stichtag im Gebiet [Ort / Umkreis / Deutschland] keine Kunden der Gesellschaft, die in Anlage 4 aufgeführt sind, im Geschäftsbereich [Bereich] abzuwerben oder zu bedienen und keine Mitarbeiter der Gesellschaft abzuwerben. [Alternative: Der ausscheidende Gesellschafter unterliegt keinem nachvertraglichen Wettbewerbsverbot.]
(2) Für jeden Fall der Zuwiderhandlung ist eine Vertragsstrafe von [Betrag] EUR verwirkt; weitergehender Schadensersatz bleibt vorbehalten.
(3) Beide Seiten behandeln Geschäftsgeheimnisse und den Inhalt dieser Vereinbarung vertraulich und äußern sich über den jeweils anderen nicht herabsetzend.

§ 9 Steuern
(1) Jede Partei trägt die auf sie entfallenden Steuern aus diesem Vorgang selbst. Die Gesellschaft erstellt die Feststellungserklärung für das Jahr des Ausscheidens und stellt dem ausscheidenden Gesellschafter die für seine Steuererklärung erforderlichen Angaben zur Verfügung.
(2) Die Parteien haben die steuerlichen Folgen (insbesondere Veräußerungsgewinn des ausscheidenden Gesellschafters und Anschaffungskosten der verbleibenden Gesellschafter) [mit dem Steuerberater [Name] geprüft / nicht geprüft und übernehmen hierfür keine Gewähr].

§ 10 Erledigungsklausel
(1) Mit Erfüllung dieser Vereinbarung sind sämtliche gegenseitigen Ansprüche der Parteien aus dem Gesellschaftsverhältnis und seiner Beendigung, gleich aus welchem Rechtsgrund, ob bekannt oder unbekannt, erledigt.
(2) Ausgenommen sind Ansprüche aus dieser Vereinbarung, Ansprüche wegen vorsätzlicher Pflichtverletzung sowie Ansprüche aus der Freistellung nach § 5.

§ 11 Schlussbestimmungen
(1) Der Gesellschaftsvertrag vom [Datum] gilt zwischen den verbleibenden Gesellschaftern fort, soweit er durch diese Vereinbarung nicht geändert wird. [Bei Zwei-Personen-GbR: Der Gesellschaftsvertrag endet mit dem Stichtag.]
(2) Änderungen und Ergänzungen bedürfen der Schriftform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(3) Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Vereinbarung im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame, die dem wirtschaftlichen Zweck am nächsten kommt.
(4) Gerichtsstand ist, soweit zulässig, [Ort]. Es gilt das Recht der Bundesrepublik Deutschland.
(5) Jede Partei erhält eine unterschriebene Ausfertigung.

Anlagen: 1 Schwebende Geschäfte, 2 Verbindlichkeiten zum Stichtag, 3 Übergabeprotokoll, 4 Kundenliste (Wettbewerb)

[Ort], den [Datum]


______________________________
[Vorname Nachname], ausscheidender Gesellschafter


______________________________
[Vorname Nachname], verbleibender Gesellschafter


[______________________________
[Vorname Nachname], verbleibender Gesellschafter]

${VORLAGEN_HINWEIS}`,
  },
];
