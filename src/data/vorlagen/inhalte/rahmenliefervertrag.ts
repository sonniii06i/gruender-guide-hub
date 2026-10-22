// Inhalt der Vorlage „rahmenliefervertrag“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../kauf.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du einen Rahmenliefervertrag brauchst",
        text: "Sobald du regelmäßig beim selben Hersteller oder Großhändler bestellst, wird jede Einzelbestellung zur Verhandlung: Preis, Lieferzeit, Verpackung, Qualität, Haftung, und bei jeder Bestellung schickt der Lieferant seine AGB mit. Ein Rahmenliefervertrag beendet das. Er legt einmal die Bedingungen fest, und jeder Abruf wird ein Kaufvertrag zu diesen Bedingungen. Typische Fälle: Du lässt Private-Label-Ware produzieren, beziehst Verpackungen oder Rohstoffe, bist Importeur und belieferst Händler, oder du führst einen Online-Shop mit festen Lieferanten.\n\nDie Vorlage ist für beide Seiten gedacht, Lieferant und Abnehmer, und regelt Produkte und Preise, Einzelabrufe, Preisanpassung, Lieferfristen mit Verzugspauschale, Qualität über Freigabemuster, Konformität, Rügepflicht, optional Exklusivität und Mindestabnahme, Eigentumsvorbehalt, Produkthaftung, Geheimhaltung und Laufzeit. Für einen einmaligen Kauf reicht der B2B-Kaufvertrag; für Ware, die beim Händler Eigentum des Herstellers bleibt, der Kommissionsvertrag.",
      },
      {
        titel: "Was muss in einen Rahmenliefervertrag? Produkte, Abrufe, Preise, Qualität",
        text: "Ein Rahmenvertrag ohne Produktliste und ohne Abrufmechanik ist nur eine Absichtserklärung. Die Vorlage verlangt deshalb Anlage 1 mit Artikelnummer, Spezifikation, Verpackungseinheit, Mindestbestellmenge, Preis und Lieferzeit je Produkt und regelt:\n\n- Vorrang des Rahmenvertrags vor allen AGB (§ 1 Abs. 4)\n- Einzelabruf in Textform, Bestätigungsfrist, Annahmefiktion, Bedarfsvorschau, Frühwarnpflicht (§ 2)\n- Preisbindung, Anpassungsverlangen ab Kostenänderung oder Preisgleitklausel mit Index, Kündigungsrecht bei Nichteinigung, Mengenbonus, Zahlungsziel (§ 3)\n- verbindliche Liefertermine, Verzugspauschale, Deckungskauf, Gefahrübergang, Lieferschein, Verpackungsvorgaben, höhere Gewalt (§ 4)\n- Freigabemuster, Konformitätsnachweise, Änderungssperre, Qualitätssicherung, Audits, Private Label (§ 5)\n- Rügefristen, Nacherfüllung, Gewährleistungsfrist, Regress, Serienmängel (§ 6)\n- Gebiets- oder Kanalexklusivität, Mindestabnahme, Mindestliefermenge (§ 7)\n- Eigentumsvorbehalt mit Weiterverkaufsermächtigung (§ 8)\n- Haftungsgrenzen, Produkthaftungsfreistellung, Versicherung (§ 9)\n- Geheimhaltung, Schutzrechte, Werkzeuge (§ 10), Laufzeit, Kündigung, Auslaufphase (§ 11)",
      },
      {
        titel: "Rahmenliefervertrag Muster ausfüllen: Schritt für Schritt",
        text: "Erstelle zuerst Anlage 1 mit allen Produkten und Anlage 2 mit Verpackungs- und Kennzeichnungsvorgaben, etwa Kartonmaße, Palettierung und Barcodes. In der Vorbemerkung beschreibst du Produktgruppe und Vertriebsweg. In § 2 setzt du Bestätigungsfrist und Rhythmus der Bedarfsvorschau ein. In § 3 trägst du Lieferbedingung (ab Werk, frei Haus oder Incoterm), Dauer der Preisbindung und die Schwelle für Anpassungsverlangen ein; alternativ wählst du die Preisgleitklausel mit einem Index des Statistischen Bundesamts und einer Obergrenze je Anpassung. Nur eine der beiden Varianten bleibt stehen.\n\nIn § 4 legst du Verzugspauschale und Höchstgrenze fest und wer die Transportversicherung abschließt. In § 5 listest du die einschlägigen Vorschriften auf (CE, REACH, Lebensmittelrecht, Textilkennzeichnung) und streichst, was nicht passt; den Private-Label-Absatz behältst du, wenn unter deiner Marke produziert wird. In § 6 setzt du Rügefristen und Gewährleistungsdauer ein, in § 7 wählst du zwischen Exklusivität, Mindestabnahme und Mindestliefermenge oder streichst den Paragrafen. In § 9 Deckungssummen, in § 11 Erstlaufzeit, Verlängerung und Kündigungsfrist. Das Freigabemuster protokolliert ihr vor der ersten Lieferung in Anlage 3.",
      },
      {
        titel: "Typische Fehler im Rahmenvertrag und wie du sie vermeidest",
        text: "Erster Fehler: Der Rahmenvertrag soll Lieferpflicht erzeugen, enthält aber keine Mindestmengen. Ohne § 7 ist der Lieferant frei, Abrufe abzulehnen, und du bist frei, nichts zu bestellen; wer Planungssicherheit will, muss sie vereinbaren. Zweiter Fehler: Qualität nur über Worte definieren. Spezifikationen auf Papier erfassen selten Haptik, Farbe und Verarbeitung; das Freigabemuster aus § 5 ist der Maßstab, an dem jede Lieferung gemessen wird.\n\nDritter Fehler: Einseitige Preiserhöhungsklauseln. Ein Recht des Lieferanten, Preise nach Belieben anzuheben, ist in Formularverträgen angreifbar; die Vorlage koppelt Anpassungen an nachgewiesene Kostenänderungen oder einen Index und gibt beiden Seiten ein Kündigungsrecht. Vierter Fehler: Konformitätsdokumente erst nach dem Problem anfordern. Als Importeur oder Private-Label-Inhaber giltst du als Hersteller oder Inverkehrbringer; ohne Prüfberichte und Konformitätserklärung vor der ersten Lieferung trägst du das Risiko allein. Fünfter Fehler: Werkzeuge und Formen nicht sichern. Was du bezahlt hast, bleibt dein Eigentum nur, wenn es in § 10 steht und bei Vertragsende herausgegeben wird.",
      },
      {
        titel: "Rechtliche Grundlagen: Kaufrecht, § 377 HGB, Regress, Kartellrecht, Produktsicherheit",
        text: "Der Rahmenvertrag selbst ist ein Vertrag eigener Art; jeder Einzelabruf ist ein Kaufvertrag nach §§ 433 ff. BGB, auf den die Rahmenbedingungen anwendbar sind. Zwischen Kaufleuten gilt die Untersuchungs- und Rügepflicht des § 377 HGB, die die Vorlage wegen des Qualitätssicherungssystems des Lieferanten auf Stichproben beschränkt. Die Gewährleistungsfrist beträgt nach § 438 BGB zwei Jahre; verkaufst du an Verbraucher weiter, sichern §§ 445a, 445b und 478 BGB deinen Rückgriff gegen den Lieferanten, deshalb lässt die Vorlage diesen Regress unberührt.\n\nExklusivitäts- und Mindestabnahmeklauseln sind vertikale Vereinbarungen, die unter das Kartellrecht fallen. Nach der Vertikal-Gruppenfreistellungsverordnung sind Alleinbezugspflichten über fünf Jahre und Verbote des passiven Verkaufs oder des Online-Vertriebs problematisch; deshalb lässt die Vorlage passive Verkäufe zu. Produktsicherheitsrechtlich muss die Ware der Allgemeinen Produktsicherheitsverordnung und den produktspezifischen Vorschriften entsprechen; wer Ware aus Drittstaaten einführt, wird Importeur mit Herstellerpflichten. Der verlängerte Eigentumsvorbehalt nach § 449 BGB mit Vorausabtretung ist im Handel üblich; die Freigabeklausel bei Übersicherung macht ihn wirksam. Eine Form ist nicht vorgeschrieben.",
      },
      {
        titel: "Wann die Rahmenvertrag-Vorlage nicht reicht",
        text: "Sitzt der Lieferant außerhalb Deutschlands, musst du Rechtswahl, Gerichtsstand oder Schiedsklausel, Incoterms, Zahlungsabsicherung (Akkreditiv, Anzahlung gegen Inspektion) und die Importeurspflichten regeln; die Vorlage geht von deutschem Recht und Ausschluss des UN-Kaufrechts aus, was ein ausländischer Lieferant nicht immer akzeptiert. Bei Lieferanten in China sind zusätzlich Qualitätsinspektionen vor Verschiffung und der Schutz deiner Designs im Produktionsland Thema.\n\nBei Marktanteilen über 30 Prozent oder Exklusivität über fünf Jahre sollte ein Kartellrechtler § 7 prüfen. Bei Lebensmitteln, Kosmetik, Medizinprodukten und Spielzeug gelten Zulassungs- und Dokumentationspflichten, die in Anlage 4 konkret benannt werden müssen. Soll der Lieferant nach deinen Entwürfen entwickeln, brauchst du zusätzlich Regeln zu Entwicklungskosten und zum Eigentum an den Ergebnissen. GründerX stellt Software und Muster bereit und ersetzt keine Rechtsberatung; bei hohen Jahresvolumina lohnt die anwaltliche Prüfung vor Unterschrift.",
      },
    ],
  text: `Rahmenliefervertrag

zwischen

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Lieferant“ –

und

[Firma, Rechtsform], [Straße, PLZ Ort], vertreten durch [Vorname Nachname], USt-IdNr. [DE…]
– nachfolgend „Abnehmer“ –

Vorbemerkung
Der Lieferant stellt her bzw. vertreibt [Produktgruppe]. Der Abnehmer vertreibt diese Produkte [im Einzelhandel / über seinen Online-Shop / unter eigener Marke]. Die Parteien wollen ihre Geschäftsbeziehung durch diesen Rahmenvertrag regeln, der für alle während seiner Laufzeit geschlossenen Einzelverträge gilt.

§ 1 Vertragsgegenstand und Produkte
(1) Dieser Vertrag regelt die Bedingungen, zu denen der Lieferant dem Abnehmer die in Anlage 1 aufgeführten Produkte (nachfolgend „Produkte“) liefert. Anlage 1 enthält je Produkt: Artikelnummer, Bezeichnung, Spezifikation, Verpackungseinheit, Mindestbestellmenge, Preis und Lieferzeit.
(2) Dieser Rahmenvertrag begründet für sich allein keine Abnahme- oder Lieferpflicht; Kaufverträge kommen erst durch Einzelabrufe nach § 2 zustande. [Mindestmengen regelt § 7.]
(3) Die Parteien können Anlage 1 jederzeit einvernehmlich in Textform ergänzen oder ändern. Neue Produkte werden durch eine von beiden Seiten bestätigte Ergänzung aufgenommen.
(4) Für alle Einzelabrufe gelten ausschließlich die Bestimmungen dieses Rahmenvertrags. Allgemeine Geschäftsbedingungen einer Partei finden keine Anwendung, auch wenn ihnen im Einzelfall nicht widersprochen wird.

§ 2 Einzelabrufe und Bestellabwicklung
(1) Der Abnehmer bestellt durch Einzelabruf in Textform (E-Mail, Bestellportal, EDI) unter Angabe von Artikelnummer, Menge, Lieferadresse und gewünschtem Liefertermin.
(2) Der Lieferant bestätigt den Abruf innerhalb von [z. B. 2] Werktagen in Textform mit verbindlichem Liefertermin. Bestätigt er nicht innerhalb dieser Frist, gilt der Abruf als zu den Bedingungen des Rahmenvertrags und mit der in Anlage 1 genannten Lieferzeit angenommen. Weicht die Bestätigung vom Abruf ab, kommt der Vertrag nur zustande, wenn der Abnehmer der Abweichung in Textform zustimmt.
(3) Der Abnehmer übermittelt dem Lieferanten [monatlich / quartalsweise] eine unverbindliche Bedarfsvorschau für die folgenden [z. B. 3] Monate. Der Lieferant hält für die vorgesehenen Mengen Kapazitäten und Vormaterial bereit.
(4) Der Lieferant informiert den Abnehmer unverzüglich, wenn absehbar ist, dass ein Liefertermin nicht eingehalten werden kann oder Rohstoffe, Vormaterialien oder Produkte knapp werden.

§ 3 Preise, Preisanpassung und Zahlung
(1) Es gelten die in Anlage 1 vereinbarten Preise in EUR netto zuzüglich der gesetzlichen Umsatzsteuer, [ab Werk / frei Haus Lieferadresse des Abnehmers / gemäß Incoterms 2020 [Klausel, Ort]]. Verpackung ist im Preis enthalten.
(2) Die Preise sind für die Dauer von [z. B. 12] Monaten ab Vertragsbeginn fest. Danach kann jede Partei eine Anpassung verlangen, wenn sich [die Kosten für Rohstoffe, Energie, Fracht oder Löhne] nachweislich um mehr als [z. B. 5] % gegenüber dem Stand bei Vertragsschluss verändert haben. [Alternative Preisgleitklausel: Die Preise ändern sich jeweils zum 1. Januar und 1. Juli im Verhältnis der Veränderung des Index [z. B. Erzeugerpreisindex gewerblicher Produkte, Statistisches Bundesamt, Position [Nummer]] gegenüber dem Stand bei Vertragsschluss, jedoch höchstens um [z. B. 8] % je Anpassung.] Die anpassende Partei legt die Kostenentwicklung offen. Die Anpassung gilt für Abrufe, die nach Ablauf von [z. B. 6] Wochen nach Zugang des Anpassungsverlangens erfolgen.
(3) Kommt bei einem Anpassungsverlangen innerhalb von [z. B. 4] Wochen keine Einigung zustande, kann jede Partei den Rahmenvertrag mit einer Frist von [z. B. 3] Monaten kündigen; bis dahin gelten die bisherigen Preise.
(4) [Optional: Der Abnehmer erhält auf die Preise nach Anlage 1 einen Mengenrabatt von [z. B. 3] % ab einem Jahresumsatz von [Betrag] EUR netto und [z. B. 5] % ab [Betrag] EUR, abgerechnet als Bonus zum Jahresende.]
(5) Rechnungen sind innerhalb von [z. B. 30] Tagen nach Rechnungsdatum und Lieferung ohne Abzug zahlbar [bzw. innerhalb von [z. B. 10] Tagen mit [z. B. 2] % Skonto]. Bei Zahlungsverzug gelten Verzugszinsen von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB).
(6) Der Abnehmer darf nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen aufrechnen; Zurückbehaltungsrechte wegen Mängeln bleiben unberührt.

§ 4 Lieferung, Lieferfristen und Gefahrübergang
(1) Die Lieferzeit je Produkt ergibt sich aus Anlage 1 und beginnt mit Zugang der Bestätigung des Abrufs. Bestätigte Liefertermine sind verbindlich.
(2) Bei Überschreitung eines verbindlichen Liefertermins, die der Lieferant zu vertreten hat, schuldet er ab dem [z. B. 3.] Werktag der Verspätung einen pauschalierten Verzugsschaden von [z. B. 0,5] % des Netto-Auftragswerts der verspäteten Lieferung je angefangene Woche, höchstens [z. B. 5] %. Der Nachweis eines geringeren oder höheren Schadens bleibt beiden Parteien vorbehalten. Nach fruchtlosem Ablauf einer Nachfrist von [z. B. 10] Werktagen kann der Abnehmer vom betroffenen Einzelabruf zurücktreten und einen Deckungskauf vornehmen; Mehrkosten trägt der Lieferant.
(3) Die Gefahr geht [mit Übergabe an den ersten Frachtführer / mit Ablieferung an der Lieferadresse] auf den Abnehmer über. Transportversicherung schließt [der Lieferant / der Abnehmer] ab.
(4) Teillieferungen sind nur mit Zustimmung des Abnehmers zulässig. Jeder Lieferung ist ein Lieferschein mit Abrufnummer, Artikelnummern, Mengen, Chargen und [MHD] beizufügen.
(5) Verpackung: Der Lieferant verpackt transportsicher und gemäß den Verpackungsvorgaben in Anlage 2 (Kartonmaße, Palettierung, Etikettierung, Barcodes). Er ist für die in Verkehr gebrachten Verpackungen nach dem Verpackungsgesetz systembeteiligt, soweit er als Erstinverkehrbringer gilt; [bei Import durch den Abnehmer übernimmt der Abnehmer die Systembeteiligung].
(6) Höhere Gewalt befreit die betroffene Partei für die Dauer der Störung von ihren Leistungspflichten; sie hat die andere Partei unverzüglich zu informieren. Dauert die Störung länger als [z. B. 3] Monate, kann jede Partei die betroffenen Abrufe aufheben.

§ 5 Qualität, Muster und Produktkonformität
(1) Die Produkte müssen der Spezifikation in Anlage 1, den von beiden Parteien freigegebenen Mustern (Freigabemuster, Anlage 3) und den in Deutschland und der EU geltenden gesetzlichen Anforderungen entsprechen, insbesondere dem Produktsicherheitsrecht, der Allgemeinen Produktsicherheitsverordnung (GPSR), [der CE-Kennzeichnungspflicht, REACH, RoHS, Lebensmittelrecht, Textilkennzeichnungsverordnung, Spielzeugrichtlinie].
(2) Der Lieferant stellt vor der ersten Lieferung eines Produkts und auf Verlangen bei jeder Änderung Konformitätsnachweise bereit: [Konformitätserklärung, Prüfberichte akkreditierter Labore, Sicherheitsdatenblätter, technische Dokumentation, Herstellerangaben nach GPSR]. Änderungen an Rezeptur, Material, Konstruktion, Produktionsstandort oder Verpackung bedürfen der vorherigen Zustimmung des Abnehmers in Textform.
(3) Der Lieferant unterhält ein Qualitätssicherungssystem [nach ISO 9001 oder vergleichbar] und führt Chargendokumentation, die Rückverfolgbarkeit über [z. B. 5] Jahre ermöglicht. Der Abnehmer darf nach Ankündigung mit [z. B. 10] Werktagen Frist Audits beim Lieferanten und dessen Unterlieferanten durchführen.
(4) [Private Label: Der Lieferant produziert die Produkte unter der Marke des Abnehmers gemäß den Design- und Verpackungsvorgaben in Anlage 2. Er darf diese Produkte in dieser Aufmachung nicht an Dritte liefern und die Marke des Abnehmers nicht anderweitig nutzen.]

§ 6 Untersuchung, Rüge und Gewährleistung
(1) Der Abnehmer untersucht die Lieferung nach Eingang stichprobenartig auf Identität, Menge, Transportschäden und offensichtliche Mängel und rügt erkennbare Mängel innerhalb von [z. B. 10] Werktagen nach Eingang, verdeckte Mängel innerhalb von [z. B. 10] Werktagen nach Entdeckung in Textform (§ 377 HGB). Eine weitergehende Untersuchungspflicht besteht angesichts des Qualitätssicherungssystems des Lieferanten nicht.
(2) Bei Mängeln kann der Abnehmer nach seiner Wahl Nachbesserung oder Ersatzlieferung verlangen. Der Lieferant holt mangelhafte Ware auf eigene Kosten ab. Schlägt die Nacherfüllung fehl oder ist sie wegen Dringlichkeit unzumutbar, kann der Abnehmer mindern, vom betroffenen Abruf zurücktreten, den Mangel selbst beseitigen lassen und Ersatz der erforderlichen Aufwendungen verlangen oder Schadensersatz verlangen.
(3) Die Gewährleistungsfrist beträgt [24] Monate ab Ablieferung. Für Produkte, die der Abnehmer an Verbraucher weiterverkauft, bleiben die Regressansprüche nach §§ 445a, 445b, 478 BGB unberührt.
(4) Bei Serienmängeln (mehr als [z. B. 3] % einer Charge mangelhaft) kann der Abnehmer die gesamte Charge zurückweisen und Ersatzlieferung verlangen. Der Lieferant trägt die Kosten einer notwendigen Sortierung, Rückholung aus dem Handel und, bei Sicherheitsmängeln, eines Rückrufs.

§ 7 Exklusivität und Mindestabnahme (optional)
(1) [Variante Gebiets-/Kanalexklusivität: Der Lieferant verpflichtet sich, die Produkte während der Laufzeit dieses Vertrags im Gebiet [Deutschland, Österreich, Schweiz] [bzw. im Vertriebskanal [Online-Marktplätze / Fachhandel]] ausschließlich an den Abnehmer zu liefern und keine Dritten zu beliefern, die erkennbar in dieses Gebiet bzw. diesen Kanal liefern. Passive Verkäufe des Lieferanten an Kunden, die unaufgefordert an ihn herantreten, bleiben zulässig, soweit kartellrechtlich geboten.]
(2) [Variante Mindestabnahme: Im Gegenzug verpflichtet sich der Abnehmer, je Vertragsjahr Produkte im Wert von mindestens [Betrag] EUR netto abzurufen. Unterschreitet er diese Menge, kann der Lieferant die Exklusivität für das folgende Vertragsjahr aufheben [oder eine Ausgleichszahlung in Höhe von [z. B. 10] % der Differenz verlangen].]
(3) [Variante Mindestliefermenge: Der Lieferant hält je Monat eine Lieferkapazität von mindestens [Menge] Einheiten für den Abnehmer bereit.]
(4) Beide Parteien bestätigen, dass sie die kartellrechtliche Zulässigkeit der Exklusivität geprüft haben; sollte eine Regelung kartellrechtlich unzulässig sein, gilt sie in dem zulässigen Umfang.

§ 8 Eigentumsvorbehalt
(1) Gelieferte Produkte bleiben bis zur vollständigen Zahlung der jeweiligen Rechnung Eigentum des Lieferanten (einfacher Eigentumsvorbehalt).
(2) Der Abnehmer darf die Vorbehaltsware im ordnungsgemäßen Geschäftsgang weiterveräußern und verarbeiten; er tritt die daraus entstehenden Forderungen in Höhe des offenen Rechnungsbetrags an den Lieferanten ab, der die Abtretung annimmt. Der Abnehmer bleibt zur Einziehung berechtigt, solange er nicht in Zahlungsverzug ist. Übersteigt der Wert der Sicherheiten die gesicherten Forderungen um mehr als 10 %, gibt der Lieferant auf Verlangen Sicherheiten nach seiner Wahl frei.

§ 9 Haftung und Produkthaftung
(1) Die Parteien haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit, für Schäden aus der Verletzung von Leben, Körper oder Gesundheit, nach dem Produkthaftungsgesetz und im Umfang übernommener Garantien.
(2) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt, höchstens auf [Betrag] EUR je Schadensfall und [Betrag] EUR je Vertragsjahr. Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen.
(3) Der Lieferant stellt den Abnehmer von Ansprüchen Dritter aus Produkthaftung frei, soweit der Schaden durch einen Fehler des Produkts verursacht wurde, der im Verantwortungsbereich des Lieferanten liegt, und ersetzt die Kosten eines erforderlichen Rückrufs oder einer Warnaktion, soweit der Abnehmer ihn vorab informiert und abgestimmt hat.
(4) Der Lieferant unterhält eine Betriebs- und Produkthaftpflichtversicherung mit einer Deckungssumme von mindestens [Betrag] EUR je Schadensfall einschließlich [erweiterter Produkthaftpflicht und Rückrufkosten] und weist diese auf Verlangen nach.

§ 10 Geheimhaltung und Schutzrechte
(1) Die Parteien behandeln alle im Rahmen der Zusammenarbeit erlangten Informationen über Preise, Mengen, Kunden, Lieferanten, Rezepturen, Designs und Geschäftsprozesse vertraulich und verwenden sie nur zur Durchführung dieses Vertrags. Die Pflicht gilt [z. B. 3] Jahre über das Vertragsende hinaus.
(2) Vom Abnehmer bereitgestellte Designs, Marken, Spezifikationen, Werkzeuge und Formen bleiben dessen Eigentum bzw. stehen ihm zu; der Lieferant darf sie nur für Lieferungen an den Abnehmer nutzen und gibt sie bei Vertragsende heraus.
(3) Der Lieferant sichert zu, dass die Produkte in der gelieferten Form keine Schutzrechte Dritter in [Deutschland / der EU] verletzen, und stellt den Abnehmer von Ansprüchen Dritter insoweit frei. Dies gilt nicht für Vorgaben, die der Abnehmer gemacht hat.

§ 11 Laufzeit und Kündigung
(1) Der Vertrag beginnt am [Datum] und läuft zunächst bis zum [Datum] (Erstlaufzeit). Er verlängert sich jeweils um [12] Monate, wenn er nicht mit einer Frist von [z. B. 3] Monaten zum Ende der jeweiligen Laufzeit in Schriftform gekündigt wird.
(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt insbesondere vor bei wiederholten Lieferverzögerungen oder Qualitätsmängeln trotz Abmahnung, bei Zahlungsverzug mit mehr als [z. B. 2] Rechnungen trotz Mahnung, bei Verstoß gegen § 7 oder § 10 sowie bei Antrag auf Eröffnung des Insolvenzverfahrens über das Vermögen der anderen Partei.
(3) Zum Zeitpunkt der Beendigung bereits bestätigte Einzelabrufe werden zu den Bedingungen dieses Vertrags abgewickelt. Der Lieferant liefert auf Verlangen des Abnehmers für [z. B. 6] Monate nach Vertragsende Ersatzteile bzw. Nachbestellungen zu den zuletzt gültigen Preisen (Auslaufphase), soweit der Vertrag nicht wegen eines vom Abnehmer zu vertretenden Grundes beendet wurde.
(4) Mit Vertragsende gibt der Lieferant Werkzeuge, Formen, Unterlagen und Marken-Materialien des Abnehmers heraus und stellt die Nutzung der Marke des Abnehmers ein.

§ 12 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform; dies gilt auch für die Aufhebung dieser Klausel. Einzelabrufe, Bestätigungen und Änderungen der Anlage 1 können in Textform erfolgen.
(2) Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ort]. Erfüllungsort für Lieferungen ist [Ort].
(4) Anlagen: Anlage 1 – Produkt- und Preisliste; Anlage 2 – Verpackungs- und Kennzeichnungsvorgaben; Anlage 3 – Freigabemuster (Protokoll); Anlage 4 – Konformitätsdokumente. Die Anlagen sind Bestandteil dieses Vertrags.

[Ort], den [Datum]


______________________________
[Firma Lieferant], vertreten durch [Vorname Nachname]


______________________________
[Firma Abnehmer], vertreten durch [Vorname Nachname]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
