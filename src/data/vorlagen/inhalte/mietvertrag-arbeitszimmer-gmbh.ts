// Inhalt der Vorlage „mietvertrag-arbeitszimmer-gmbh“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../miete.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du ein Arbeitszimmer an deine GmbH vermieten solltest",
        text: `Deine UG oder GmbH hat ihren Sitz bei dir zu Hause, du arbeitest im Arbeitszimmer, lagerst Ware im Abstellraum oder empfängst Kunden im Wohnzimmer. Die Raumkosten trägst du privat, obwohl die Gesellschaft die Räume nutzt. Mit einem Mietvertrag zwischen dir als Vermieter und deiner Gesellschaft als Mieterin wird die Miete zur Betriebsausgabe der GmbH, und du versteuerst die Einnahmen privat als Vermietung und Verpachtung. Das funktioniert nur, wenn der Vertrag dem Fremdvergleich standhält: schriftlich vor Nutzungsbeginn, ortsübliche Miete, tatsächliche Zahlung vom Geschäftskonto, jährliche Nebenkostenabrechnung. Genau dafür ist die Vorlage gebaut. Sie enthält außerdem die Hinweise auf die beiden Fallen, die du vorher mit dem Steuerberater klären musst: verdeckte Gewinnausschüttung und Betriebsaufspaltung.`,
      },
      {
        titel: "Was muss in den Mietvertrag zwischen Gesellschafter und GmbH?",
        text: `Der Vertrag muss so aussehen, als hätten ihn fremde Dritte geschlossen. Diese Punkte stehen in der Vorlage:

- Vorbemerkung mit Beteiligung, Geschäftsführung und Eigentum oder Miete der Wohnung
- Vertretung der Gesellschaft mit Befreiung von § 181 BGB oder Gesellschafterbeschluss als Anlage
- Räume mit Grundriss, Gesamtwohnfläche, Flächenanteil in Prozent, Abtrennung von den Privaträumen, Mitbenutzung von Flur und WC (§ 1)
- Nutzungszweck, Geschäftsanschrift für Handelsregister und Impressum, Kundenverkehr, Mitarbeiter, Zustimmung des Wohnungsvermieters (§ 2)
- Mietzeit als unbefristeter oder befristeter Vertrag, außerordentliche Kündigung bei Ausscheiden, Verkauf oder Insolvenz (§ 3)
- Ortsübliche Miete mit Quelle, Nebenkostenvorauszahlung nach Flächenanteil, jährliche Abrechnung, Umsatzsteuer-Variante, regelmäßige Überprüfung (§ 4)
- Zahlung vom Geschäftskonto, Verbot von Barzahlung und Verrechnung, Belege für die Buchführung (§ 5)
- Instandhaltung, Kleinreparaturen, Schönheitsreparaturen, Eigentum an Einbauten (§ 6)
- Haftung, Betriebshaftpflicht, Information der Hausrat- oder Gebäudeversicherung (§ 7)
- Rückgabe und Ummeldung der Geschäftsanschrift (§ 8), Fremdvergleich und steuerliche Hinweise mit Anpassungsklausel (§ 9), Schriftform (§ 10)`,
      },
      {
        titel: "Mietvertrag Arbeitszimmer GmbH ausfüllen: Schritt für Schritt",
        text: `Prüfe zuerst, ob du als Geschäftsführer von § 181 BGB befreit bist; das steht in Satzung und Handelsregister. Wenn nicht, fasst die Gesellschafterversammlung einen Beschluss, und ein anderer Vertreter unterschreibt für die GmbH. In § 1 misst du die Räume aus, trägst Gesamtwohnfläche und Mietfläche ein und rechnest den Flächenanteil aus; er ist der Schlüssel für alle Nebenkosten. In § 2 entscheidest du über Kundenverkehr und Mitarbeiter und holst bei einer Mietwohnung die Zustimmung deines Vermieters als Anlage 4. In § 4 ermittelst du die ortsübliche Miete anhand des Gewerbemietspiegels der IHK oder zweier Vergleichsangebote für kleine Büroflächen und legst die Quelle als Anlage 5 bei; dann setzt du die Nebenkostenvorauszahlung und wählst die Umsatzsteuer-Variante. In § 5 trägst du dein Privatkonto ein, auf das die GmbH monatlich überweist. In § 9 notierst du Name des Steuerberaters und Datum der Besprechung. Die Vorlage gibt es kostenlos als Word, PDF und Text.`,
      },
      {
        titel: "Typische Fehler beim Fremdvergleich",
        text: `Erster Fehler: Der Vertrag wird rückwirkend geschlossen. Das Finanzamt erkennt zwischen beherrschendem Gesellschafter und GmbH nur an, was vorher klar und schriftlich vereinbart war. Zweiter Fehler: zu hohe Miete. Alles über dem ortsüblichen Satz ist eine verdeckte Gewinnausschüttung, die bei der GmbH nicht abziehbar ist und bei dir als Kapitalertrag versteuert wird. Dritter Fehler: Die Miete wird nicht gezahlt, bar gezahlt oder mit Gehalt oder Verrechnungskonto verrechnet; § 5 der Vorlage schließt das aus. Vierter Fehler: keine Nebenkostenabrechnung, obwohl Vorauszahlungen vereinbart sind. Fünfter Fehler: Die Räume sind nicht abgegrenzt, das Arbeitszimmer ist zugleich Gästezimmer. Sechster Fehler: Die Betriebsaufspaltung wird nicht geprüft, obwohl die GmbH ihren gesamten Betrieb aus deinen Räumen führt. Und siebter Fehler: Als Mieter der Wohnung die gewerbliche Nutzung nicht mit dem Vermieter klären und die eigene Wohnung riskieren.`,
      },
      {
        titel: "Rechtliche und steuerliche Grundlagen",
        text: `Zivilrechtlich ist der Vertrag ein Gewerbemietvertrag nach den §§ 535 ff. BGB; bei fester Laufzeit über ein Jahr gilt über § 578 BGB die Schriftform des § 550 BGB. Weil du auf beiden Seiten handelst, brauchst du die Befreiung vom Verbot des Insichgeschäfts nach § 181 BGB. Steuerlich entscheidet der Fremdvergleich: Eine Miete über dem ortsüblichen Niveau ist eine verdeckte Gewinnausschüttung nach § 8 Abs. 3 Satz 2 KStG. Deine Einnahmen sind in der Regel Einkünfte aus Vermietung und Verpachtung nach § 21 EStG, bei einer Betriebsaufspaltung dagegen gewerbliche Einkünfte nach § 15 EStG mit der Folge, dass Räume und GmbH-Anteile Betriebsvermögen werden. Die Abzugsbeschränkung für das häusliche Arbeitszimmer in § 4 Abs. 5 Satz 1 Nr. 6b EStG betrifft den Abzug beim Nutzer selbst, nicht die GmbH als Mieterin. Umsatzsteuerlich ist die Vermietung nach § 4 Nr. 12 UStG steuerfrei, mit Option nach § 9 UStG. GründerX ist Software und ersetzt weder Steuerberater noch Anwalt.`,
      },
      {
        titel: "Wann die Vorlage nicht reicht",
        text: `Diese Vorlage ist der Ausgangspunkt für das Gespräch mit dem Steuerberater, nicht sein Ersatz. Vor der Unterschrift muss er prüfen, ob eine Betriebsaufspaltung droht, denn die Folgen beim Verkauf der Wohnung, beim Umzug oder beim Verkauf der GmbH-Anteile können hoch sein. Bist du Eigentümer und vermietest einen größeren Teil des Hauses oder eine ganze Etage, kommen Fragen zur Aufteilung von Kaufpreis und Abschreibung hinzu. Bei mehreren Gesellschaftern, die alle Räume stellen, bei einer GmbH mit Mitarbeitern in deiner Wohnung oder bei einer Wohnung, die dir und deinem Partner gemeinsam gehört, braucht es individuelle Regelungen. Und sobald die Gesellschaft Umbauten bezahlt oder du selbst zur Umsatzsteuer optierst, lohnt sich eine Beratung, bevor der erste Euro fließt.`,
      },
    ],
  text: `Mietvertrag über Geschäftsräume zwischen Gesellschafter und Gesellschaft

zwischen

[Vorname Nachname], [Straße, PLZ Ort]
– nachfolgend „Vermieter“ –

und

[Name der Gesellschaft] [GmbH / UG (haftungsbeschränkt)], [Straße, PLZ Ort], Amtsgericht [Ort] HRB [Nummer], vertreten durch [den Geschäftsführer [Vorname Nachname], der von den Beschränkungen des § 181 BGB befreit ist / den weiteren Geschäftsführer [Vorname Nachname] aufgrund Gesellschafterbeschlusses vom [Datum] (Anlage 3)]
– nachfolgend „Mieterin“ –

Vorbemerkung
Der Vermieter ist [Alleingesellschafter / mit [Zahl] % beteiligter Gesellschafter] und Geschäftsführer der Mieterin. Die Mieterin benötigt für ihren Geschäftsbetrieb Büroräume. Der Vermieter ist [Eigentümer / Mieter] der Wohnung [Straße, PLZ Ort] und überlässt der Mieterin daraus abgegrenzte Räume zu Bedingungen, wie sie auch unter fremden Dritten vereinbart würden.

§ 1 Mietsache und Flächenanteil
(1) Der Vermieter vermietet der Mieterin in der Wohnung [Straße, PLZ Ort, Geschoss] folgende Räume zur ausschließlichen Nutzung: [z. B. „das Zimmer links vom Eingang (Arbeitszimmer) mit 18,5 m²“ / „Arbeitszimmer (16 m²) und Abstellraum (6 m²) als Lager“] gemäß Grundriss (Anlage 1) (nachfolgend „Mietsache“).
(2) Die Gesamtwohnfläche beträgt [Zahl] m², die Mietsache [Zahl] m²; das entspricht einem Flächenanteil von [Zahl] % („Flächenanteil“), der Grundlage der Nebenkostenumlage nach § 4 ist.
(3) Die Mietsache ist durch eine Tür von den privat genutzten Räumen abgetrennt und wird ausschließlich geschäftlich genutzt; eine private Mitbenutzung findet nicht statt. Flur, Eingang, WC und [Küche] darf die Mieterin mitbenutzen, soweit es für Zugang und Betrieb erforderlich ist; diese Flächen gehen nicht in den Flächenanteil ein.
(4) Die Übergabe erfolgt am [Datum]; die Ausstattung wird im Übergabeprotokoll (Anlage 2) festgehalten. Möbel und Technik beschafft die Mieterin selbst, soweit nicht als mitvermietet bezeichnet.

§ 2 Nutzungszweck, Geschäftsanschrift, Zustimmung des Wohnungsvermieters
(1) Die Mietsache wird der Mieterin zum Betrieb ihres Unternehmens ([Gegenstand laut Satzung]) als Büro [und Lager] überlassen. Die Mieterin darf die Adresse als Geschäftsanschrift im Handelsregister, im Impressum und im Geschäftsverkehr nutzen und ein Firmenschild am Klingelbrett und Briefkasten anbringen.
(2) Kundenverkehr ist [in üblichem Umfang nach Termin / nicht] gestattet; Mitarbeiter dürfen in der Mietsache [bis zu [Zahl] Personen / nicht] beschäftigt werden. Untervermietung ist ausgeschlossen. Die Mieterin hält die für ihren Betrieb geltenden öffentlich-rechtlichen Vorschriften ein.
(3) [Bei Mietwohnung: Der Wohnungsvermieter [Name] hat der gewerblichen Nutzung durch die Mieterin mit Erklärung vom [Datum] zugestimmt (Anlage 4). Endet das Wohnungsmietverhältnis des Vermieters, endet auch dieser Vertrag zum selben Zeitpunkt.]

§ 3 Mietzeit und Kündigung
(1) Das Mietverhältnis beginnt am [Datum] und läuft auf unbestimmte Zeit. Beide Parteien können mit einer Frist von [z. B. 3] Monaten zum Monatsende schriftlich kündigen. [Alternative: Das Mietverhältnis wird fest bis zum [Datum] geschlossen und verlängert sich um jeweils ein Jahr, wenn es nicht mit einer Frist von [z. B. 3] Monaten zum Ablauf gekündigt wird; die Parteien kennen die Schriftformvorschrift des § 550 BGB.]
(2) Die außerordentliche Kündigung aus wichtigem Grund bleibt unberührt, insbesondere wenn der Vermieter aus der Gesellschaft ausscheidet oder seine Geschäftsführung endet, die Mieterin aufgelöst wird oder ein Insolvenzantrag gestellt wird, oder der Vermieter die Wohnung verkauft bzw. sein Wohnungsmietverhältnis endet.

§ 4 Ortsübliche Miete, Nebenkosten und Umsatzsteuer
(1) Die monatliche Miete beträgt [Betrag] EUR ([Betrag] EUR je m²). Sie entspricht der ortsüblichen Miete für vergleichbare Büroflächen in [Ort], ermittelt anhand [des Gewerbemietspiegels der IHK [Ort] / von Vergleichsangeboten (Anlage 5) / des Mietspiegels der Stadt [Ort] mit Zuschlag für gewerbliche Nutzung].
(2) Zusätzlich zahlt die Mieterin eine monatliche Nebenkostenvorauszahlung von [Betrag] EUR. Nach dem Flächenanteil umgelegt werden Heizung und Warmwasser, Strom, Wasser und Abwasser, Müllabfuhr, Hausreinigung und Hausmeister, Grundsteuer, Gebäudeversicherung sowie Internet- und Telefonanschluss, jeweils nach [Hausgeldabrechnung und Versorgerabrechnungen / Nebenkostenabrechnung des Wohnungsvermieters und Versorgerabrechnungen].
(3) Der Vermieter rechnet jährlich bis zum [z. B. 30.06.] des Folgejahres anhand der Belege ab; Nachzahlungen und Guthaben sind binnen vier Wochen auszugleichen. Die Vorauszahlung kann nach einer Abrechnung angemessen angepasst werden.
(4) [Variante A: Die Vermietung ist umsatzsteuerfrei (§ 4 Nr. 12 UStG). / Variante B: Der Vermieter optiert nach § 9 UStG; auf Miete und Nebenkosten ist Umsatzsteuer (derzeit 19 %) zu zahlen. Die Mieterin versichert, die Mietsache ausschließlich für Umsätze zu verwenden, die den Vorsteuerabzug nicht ausschließen. Der Vermieter erteilt monatliche Rechnungen mit Steuerausweis.]
(5) Die Miete wird alle [z. B. 2] Jahre, erstmals zum [Datum], auf Ortsüblichkeit überprüft und schriftlich angepasst. [Optional – Staffel: ab [Datum] [Betrag] EUR, ab [Datum] [Betrag] EUR.]

§ 5 Zahlung und Nachweis
(1) Miete und Vorauszahlung sind monatlich im Voraus bis zum dritten Werktag vom Geschäftskonto der Mieterin auf das Privatkonto des Vermieters IBAN [IBAN] zu überweisen. Barzahlung und Verrechnung mit Gehalt, Darlehen oder Gesellschafterverrechnungskonto sind ausgeschlossen.
(2) Die Mieterin verbucht die Miete als Raumkosten und bewahrt Vertrag, Zahlungsbelege und Nebenkostenabrechnungen bei ihren Buchführungsunterlagen auf. Der Vermieter erklärt die Mieteinnahmen in seiner Einkommensteuererklärung. Eine Aufrechnung der Mieterin ist nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen zulässig.

§ 6 Instandhaltung und Schönheitsreparaturen
(1) Der Vermieter hält die Mietsache einschließlich Fenster, Heizkörper, Elektro- und Wasserinstallation instand. Kleinreparaturen an Teilen, die ihrem häufigen Zugriff unterliegen, trägt die Mieterin bis [Betrag, z. B. 100] EUR je Fall und [Betrag] EUR je Jahr.
(2) Schönheitsreparaturen innerhalb der Mietsache führt die Mieterin durch, wenn der Grad der Abnutzung es erfordert, in der Regel etwa alle [z. B. 5] Jahre. Einbauten und Veränderungen der Installationen bedürfen der Zustimmung des Vermieters; von der Mieterin beschaffte Möbel, Technik und Einbauten bleiben ihr Eigentum. Mängel sind unverzüglich anzuzeigen.

§ 7 Haftung und Versicherung
(1) Die Mieterin haftet für Schäden an Mietsache und Wohnung durch ihren Betrieb, ihre Mitarbeiter oder Besucher, versichert ihre Betriebseinrichtung selbst und unterhält eine Betriebshaftpflichtversicherung.
(2) Der Vermieter haftet nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten, dann begrenzt auf den vorhersehbaren, vertragstypischen Schaden; die Haftung für Schäden an Leben, Körper und Gesundheit bleibt unberührt. § 536a Abs. 1 BGB ist für anfängliche Mängel ausgeschlossen.
(3) Der Vermieter informiert seine [Hausrat- / Wohngebäude-]Versicherung über die gewerbliche Nutzung; Mehrprämien trägt die Mieterin anteilig.

§ 8 Rückgabe
Bei Beendigung gibt die Mieterin die Mietsache geräumt, besenrein und im Zustand des Übergabeprotokolls unter Berücksichtigung vertragsgemäßer Abnutzung zurück; eigene Einbauten entfernt sie, soweit der Vermieter nicht ihre Belassung verlangt. Sie meldet ihre Geschäftsanschrift unverzüglich beim Handelsregister um.

§ 9 Fremdvergleich und steuerliche Hinweise
(1) Die Parteien gestalten und führen dieses Mietverhältnis so durch, wie es zwischen fremden Dritten üblich ist: schriftlicher Vertrag vor Nutzungsbeginn, ortsübliche Miete, regelmäßige unbare Zahlung, jährliche Nebenkostenabrechnung, klare räumliche Abgrenzung.
(2) Den Parteien ist bekannt, dass eine über die ortsübliche Miete hinausgehende Zahlung steuerlich als verdeckte Gewinnausschüttung behandelt werden kann und dass die Überlassung von Räumen, die für die Mieterin eine wesentliche Betriebsgrundlage darstellen, durch einen beherrschenden Gesellschafter eine Betriebsaufspaltung mit gewerblichen Einkünften des Vermieters begründen kann. Die Parteien haben dies [mit dem Steuerberater [Name] am [Datum] erörtert / werden es vor Vollzug mit einem Steuerberater klären].
(3) Stellt die Finanzverwaltung fest, dass die Miete nicht fremdüblich ist, passen die Parteien sie mit Wirkung für die Zukunft auf den fremdüblichen Betrag an.

§ 10 Schlussbestimmungen
(1) Änderungen und Ergänzungen bedürfen der Schriftform; das gilt auch für diese Klausel. Mündliche Nebenabreden bestehen nicht.
(2) Sollte eine Bestimmung unwirksam sein oder werden, bleibt der Vertrag im Übrigen wirksam; die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt.
(3) Gerichtsstand ist, soweit gesetzlich zulässig, [Ort]. Es gilt deutsches Recht.
(4) Anlagen: Anlage 1 Grundriss, Anlage 2 Übergabeprotokoll, [Anlage 3 Gesellschafterbeschluss, Anlage 4 Zustimmung des Wohnungsvermieters, Anlage 5 Vergleichsangebote].

[Ort], den [Datum]


______________________________
[Vorname Nachname], Vermieter


______________________________
[Name der Gesellschaft], vertreten durch [Vorname Nachname, Funktion], Mieterin

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
