// Inhalt der Vorlage „gbr-gesellschaftsvertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../gesellschaft.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
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
};

export default inhalt;
