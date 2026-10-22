import { VORLAGEN_HINWEIS, type Vorlage } from "./types";

// Vollmachten & Behörden: Vollmachten, Finanzamt, Kündigungen, Einwilligungen.
// Rechtsstand: BGB, HGB, AO, EStG, GewStG, DSGVO, KUG. Stand 2026-10.

export const VORLAGEN_VERWALTUNG: Vorlage[] = [
  {
    slug: "vollmacht-allgemein",
    titel: "Allgemeine Vollmacht für geschäftliche Angelegenheiten",
    kurz: "Vollmacht nach § 167 BGB, mit der du einen Mitgründer, Mitarbeiter oder Angehörigen für bestimmte oder alle Geschäftsangelegenheiten bevollmächtigst.",
    kategorie: "verwaltung",
    dateiname: "Vollmacht-geschaeftlich",
    wofuer: [
      "Du bist im Urlaub, krank oder im Ausland und jemand soll Verträge, Post und Behördensachen für dich erledigen",
      "Ein Mitgründer oder Angehöriger soll dich gegenüber Bank, Finanzamt, Gewerbeamt oder Lieferanten vertreten",
      "Du willst den Umfang klar begrenzen (Betragsgrenze, bestimmte Geschäfte, keine Grundstücke, keine Darlehen)",
      "Als Generalvollmacht für das gesamte Unternehmen, wenn du einer Person voll vertraust",
    ],
    enthaelt: [
      "Vollmachtgeber und Bevollmächtigter",
      "1. Erteilung der Vollmacht (§§ 164, 167 BGB)",
      "2. Umfang der Vollmacht: Positivliste, Ausnahmen, Innenverhältnis",
      "3. Untervollmacht (erlaubt oder nicht)",
      "4. Befreiung von § 181 BGB (optional)",
      "5. Dauer, Widerruf und Erlöschen (§§ 168, 175 BGB)",
      "6. Vorlage im Original (§ 174 BGB)",
      "7. Sonstiges",
      "Unterschriften beider Seiten mit Annahmeerklärung",
    ],
    hinweise: [
      "Für Grundstücksgeschäfte, Handelsregister- und Gesellschaftsregisteranmeldungen genügt diese einfache Vollmacht nicht; dort verlangen Notar und Register eine notariell beglaubigte Vollmacht.",
      "Eine Vollmacht wirkt nach außen auch dann, wenn der Bevollmächtigte interne Grenzen überschreitet. Was er nicht darf, gehört deshalb in Ziffer 2 der Urkunde selbst, nicht nur in eine mündliche Absprache.",
      "Nach dem Widerruf musst du dir die Originalurkunde zurückgeben lassen und Geschäftspartner informieren. Wer die Urkunde weiter vorzeigt, kann dich sonst weiter verpflichten (§§ 170 bis 173 BGB).",
      "Banken erkennen fremde Vollmachten oft nicht an und verlangen ihr eigenes Formular. Für das Geschäftskonto deshalb zusätzlich die Bankvollmacht der Bank einrichten.",
    ],
    faqs: [
      {
        q: "Muss die Vollmacht schriftlich sein?",
        a: "Nein, eine Vollmacht ist grundsätzlich formfrei (§ 167 Abs. 2 BGB). Ohne Urkunde kann der Bevollmächtigte seine Befugnis aber nicht nachweisen, und Dritte dürfen einseitige Erklärungen wie Kündigungen zurückweisen, wenn er kein Original vorlegt (§ 174 BGB). Deshalb immer schriftlich erteilen und das Original mitgeben.",
      },
      {
        q: "Was bedeutet die Befreiung von § 181 BGB?",
        a: "§ 181 BGB verbietet dem Vertreter, Geschäfte mit sich selbst oder als Vertreter beider Seiten abzuschließen. Hebst du das Verbot auf, darf der Bevollmächtigte zum Beispiel Waren deines Unternehmens an sich selbst verkaufen oder einen Vertrag zwischen deiner Firma und seiner eigenen schließen. Nur erteilen, wenn das wirklich gewollt ist.",
      },
      {
        q: "Gilt die Vollmacht auch nach meinem Tod?",
        a: "Nach der gesetzlichen Vermutung erlischt eine Vollmacht im Zweifel nicht mit dem Tod des Vollmachtgebers, sondern wirkt für die Erben weiter. Ziffer 5 der Vorlage lässt dich das ausdrücklich regeln. Wer das Unternehmen im Todesfall absichern will, sollte eine Vollmacht über den Tod hinaus erteilen und sie mit einem Testament abstimmen.",
      },
      {
        q: "Kann ich die Vollmacht jederzeit widerrufen?",
        a: "Ja, solange nichts anderes vereinbart ist, kannst du die Vollmacht jederzeit und ohne Grund widerrufen (§ 168 Satz 2 BGB). Der Widerruf wird wirksam, sobald er dem Bevollmächtigten zugeht. Hol dir die Urkunde zurück und informiere Bank, Steuerberater und wichtige Geschäftspartner.",
      },
    ],
    seo: {
      title: "Vollmacht Vorlage geschäftlich 2026 kostenlos | GründerX",
      description:
        "Allgemeine Vollmacht nach § 167 BGB als kostenlose Vorlage: Umfang, Untervollmacht, § 181 BGB, Dauer und Widerruf. Für Gründer und Unternehmer. Word & PDF.",
    },
    stand: "2026-10",
    text: `Vollmacht

Vollmachtgeber:
[Vorname Nachname / Firma], [Straße, PLZ Ort], [ggf. vertreten durch den Geschäftsführer Vorname Nachname]
– nachfolgend „Vollmachtgeber“ –

Bevollmächtigter:
[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
– nachfolgend „Bevollmächtigter“ –

1. Erteilung der Vollmacht
Der Vollmachtgeber erteilt dem Bevollmächtigten hiermit Vollmacht (§ 167 BGB), ihn in den nachfolgend bezeichneten geschäftlichen Angelegenheiten gerichtlich und außergerichtlich zu vertreten. Erklärungen des Bevollmächtigten im Rahmen dieser Vollmacht wirken unmittelbar für und gegen den Vollmachtgeber (§ 164 BGB).

2. Umfang der Vollmacht
(1) Die Vollmacht umfasst folgende Angelegenheiten:
   a) [z. B. Abschluss, Änderung und Kündigung von Verträgen mit Lieferanten und Kunden bis zu einem Wert von [Betrag] EUR im Einzelfall],
   b) [z. B. Abgabe und Entgegennahme von Erklärungen gegenüber Behörden, insbesondere Gewerbeamt, Finanzamt und IHK],
   c) [z. B. Vertretung gegenüber der [Bank], Freigabe von Überweisungen bis [Betrag] EUR],
   d) [z. B. Entgegennahme von Post, Einschreiben und Zustellungen],
   e) [weitere Angelegenheiten].
[Alternative: (1) Die Vollmacht umfasst alle geschäftlichen Angelegenheiten des Vollmachtgebers im Zusammenhang mit dem Unternehmen [Firma] (Generalvollmacht).]
(2) Nicht von der Vollmacht umfasst sind:
   a) der Erwerb, die Veräußerung und die Belastung von Grundstücken,
   b) die Aufnahme von Darlehen und die Übernahme von Bürgschaften,
   c) der Abschluss und die Beendigung von Arbeitsverträgen,
   d) die Erteilung von Prokura und Registeranmeldungen,
   e) [weitere Ausnahmen].
(3) Der Bevollmächtigte beachtet die Weisungen des Vollmachtgebers und unterrichtet ihn unverzüglich über wesentliche Vorgänge. Im Innenverhältnis gilt ergänzend der [Arbeitsvertrag / Auftrag] vom [Datum].

3. Untervollmacht
Der Bevollmächtigte ist [berechtigt / nicht berechtigt], Untervollmacht zu erteilen. [Falls berechtigt: Die Untervollmacht darf nur im Umfang dieser Vollmacht erteilt werden, erlischt mit ihr und ist dem Vollmachtgeber unverzüglich mitzuteilen.]

4. Befreiung von § 181 BGB
[Variante A: Der Bevollmächtigte ist von den Beschränkungen des § 181 BGB befreit. Er darf also Rechtsgeschäfte im Namen des Vollmachtgebers mit sich selbst oder als Vertreter eines Dritten abschließen.]
[Variante B: Der Bevollmächtigte ist nicht von den Beschränkungen des § 181 BGB befreit. Rechtsgeschäfte mit sich selbst oder als Vertreter eines Dritten bedürfen der gesonderten Zustimmung des Vollmachtgebers.]

5. Dauer, Widerruf und Erlöschen
(1) Die Vollmacht gilt ab dem [Datum] [bis zum [Datum] / auf unbestimmte Zeit].
(2) Der Vollmachtgeber kann die Vollmacht jederzeit ohne Angabe von Gründen widerrufen (§ 168 Satz 2 BGB); der Widerruf wird mit Zugang wirksam. Danach gibt der Bevollmächtigte diese Urkunde unverzüglich im Original zurück (§ 175 BGB).
(3) Die Vollmacht erlischt außerdem mit Beendigung des ihr zugrunde liegenden Rechtsverhältnisses (§ 168 Satz 1 BGB), insbesondere mit dem Ende des [Arbeits- / Auftragsverhältnisses].
(4) Die Vollmacht [erlischt / erlischt nicht] mit dem Tod des Vollmachtgebers.

6. Vorlage der Vollmacht
Der Bevollmächtigte legt diese Vollmacht gegenüber Dritten auf Verlangen im Original vor. Einseitige Rechtsgeschäfte (z. B. Kündigungen) ohne Vorlage der Originalurkunde kann der Empfänger zurückweisen (§ 174 BGB).

7. Sonstiges
Diese Vollmacht ersetzt alle früher erteilten Vollmachten für die unter Ziffer 2 genannten Angelegenheiten. Sie wird in zwei Ausfertigungen erstellt; je eine erhalten Vollmachtgeber und Bevollmächtigter.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Vollmachtgeber
[ggf. Firma und Funktion]


Ich nehme die Vollmacht an.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Bevollmächtigter

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "vollmacht-gesellschafterversammlung",
    titel: "Stimmrechtsvollmacht für die Gesellschafterversammlung",
    kurz: "Vollmacht, mit der ein Gesellschafter einer GmbH, UG oder GbR einen Vertreter zur Versammlung schickt – mit oder ohne Weisungen zu den Tagesordnungspunkten.",
    kategorie: "verwaltung",
    dateiname: "Stimmrechtsvollmacht-Gesellschafterversammlung",
    wofuer: [
      "Du kannst an der Gesellschafterversammlung nicht teilnehmen und willst trotzdem abstimmen",
      "Ein Mitgesellschafter, Steuerberater oder Anwalt soll dein Stimmrecht ausüben",
      "Du willst genau vorgeben, wie bei jedem Tagesordnungspunkt abgestimmt wird",
      "Die Einladung verlangt eine Vollmacht in Textform (§ 47 Abs. 3 GmbHG)",
    ],
    enthaelt: [
      "Gesellschaft, Vollmachtgeber mit Beteiligung, Bevollmächtigter",
      "1. Versammlung, für die die Vollmacht gilt (inkl. Vertagung und Fortsetzung)",
      "2. Umfang: Teilnahme-, Rede-, Antrags- und Stimmrecht, einzelne oder alle TOPs",
      "3. Weisungen je Tagesordnungspunkt (optional)",
      "4. Untervollmacht",
      "5. Form, Dauer und Widerruf (§ 47 Abs. 3 GmbHG)",
      "6. Hinweise zu Vorlage und Stimmverboten (§ 47 Abs. 4 GmbHG)",
      "Unterschrift und Annahmeerklärung",
    ],
    hinweise: [
      "Bei GmbH und UG muss die Vollmacht in Textform vorliegen (§ 47 Abs. 3 GmbHG); eine E-Mail oder ein PDF genügt, ein Anruf nicht. Ohne Vollmacht darf der Versammlungsleiter den Vertreter ausschließen und seine Stimmen nicht zählen.",
      "Zuerst in den Gesellschaftsvertrag schauen: Viele Satzungen erlauben nur bestimmte Vertreter (Mitgesellschafter, Berufsgeheimnisträger) oder verlangen Schriftform. Die Satzung geht vor.",
      "Bei der GbR ist die Beschlussfassung nach dem MoPeG Sache aller Gesellschafter (§ 714 BGB). Eine Vertretung ist nur zulässig, wenn der Gesellschaftsvertrag sie erlaubt oder die übrigen Gesellschafter zustimmen.",
      "Weisungen wirken nur im Innenverhältnis: Stimmt der Vertreter anders ab, ist der Beschluss trotzdem wirksam. Wer das Risiko nicht will, nimmt per Video teil, sofern die Satzung das zulässt.",
    ],
    faqs: [
      {
        q: "Wen darf ich als Vertreter in die Gesellschafterversammlung schicken?",
        a: "Grundsätzlich jede geschäftsfähige Person, also auch einen Mitgesellschafter, Steuerberater, Anwalt oder Familienangehörigen. Die Satzung kann den Kreis aber einschränken, zum Beispiel auf Mitgesellschafter oder zur Verschwiegenheit verpflichtete Berufsträger. Prüfe deshalb vorher den Gesellschaftsvertrag.",
      },
      {
        q: "Muss die Vollmacht für jede Versammlung neu erteilt werden?",
        a: "Nicht zwingend, aber die Vorlage ist bewusst auf eine konkrete Versammlung samt Fortsetzung begrenzt. Das verhindert, dass ein Vertreter Jahre später mit einer alten Vollmacht auftaucht. Für dauerhafte Vertretung kannst du die Vollmacht auf unbestimmte Zeit erteilen, solltest sie dann aber bei jeder Einladung widerrufen können.",
      },
      {
        q: "Gilt die Vollmacht auch für Beschlüsse per E-Mail oder Umlaufverfahren?",
        a: "Nur, wenn das in der Vollmacht steht. Ziffer 2 der Vorlage erstreckt sie ausdrücklich auf Beschlüsse außerhalb der Versammlung (§ 48 Abs. 2 GmbHG) zu denselben Gegenständen. Ohne diesen Satz müsste der Vertreter bei einem Umlaufbeschluss eine neue Vollmacht vorlegen.",
      },
      {
        q: "Darf mein Vertreter abstimmen, wenn ich selbst einem Stimmverbot unterliege?",
        a: "Nein. Stimmverbote nach § 47 Abs. 4 GmbHG, etwa bei deiner eigenen Entlastung oder bei einem Rechtsgeschäft zwischen dir und der Gesellschaft, treffen deine Geschäftsanteile und damit auch den Vertreter. Die Vorlage weist den Bevollmächtigten darauf hin, damit der Beschluss nicht anfechtbar wird.",
      },
    ],
    seo: {
      title: "Stimmrechtsvollmacht Gesellschafterversammlung Vorlage | GründerX",
      description:
        "Vollmacht für die Gesellschafterversammlung (GmbH, UG, GbR) als kostenlose Vorlage: Tagesordnung, Weisungen, Untervollmacht, Textform nach § 47 Abs. 3 GmbHG.",
    },
    stand: "2026-10",
    text: `Stimmrechtsvollmacht für die Gesellschafterversammlung

Gesellschaft:
[Firma] [GmbH / UG (haftungsbeschränkt) / GbR], [Straße, PLZ Ort]
[eingetragen im Handelsregister des Amtsgerichts [Ort] unter HRB [Nummer] / eingetragen im Gesellschaftsregister des Amtsgerichts [Ort] unter GsR [Nummer]]

Vollmachtgeber (Gesellschafter):
[Vorname Nachname], [Straße, PLZ Ort], beteiligt mit [Anzahl] Geschäftsanteilen im Nennbetrag von insgesamt [Betrag] EUR ([Prozent] % des Stammkapitals)
[GbR: beteiligt mit [Prozent] % am Gesellschaftsvermögen]

Bevollmächtigter:
[Vorname Nachname], [Straße, PLZ Ort] [ggf. Mitgesellschafter / Steuerberater / Rechtsanwalt]

1. Versammlung
Die Vollmacht gilt für die [ordentliche / außerordentliche] Gesellschafterversammlung der [Firma] am [Datum] um [Uhrzeit] Uhr in [Ort / per Videokonferenz], zu der mit Schreiben vom [Datum] eingeladen wurde, sowie für jede Vertagung, Fortsetzung oder erneute Einberufung dieser Versammlung mit gleicher Tagesordnung.

2. Umfang
(1) Der Bevollmächtigte ist berechtigt, den Vollmachtgeber in der Versammlung zu vertreten, insbesondere das Teilnahme-, Rede-, Auskunfts- und Antragsrecht sowie das Stimmrecht aus sämtlichen Geschäftsanteilen auszuüben, Widerspruch zu Protokoll zu erklären und alle Erklärungen im Zusammenhang mit der Versammlung abzugeben und entgegenzunehmen.
(2) Die Vollmacht gilt [für alle Tagesordnungspunkte / nur für die folgenden Tagesordnungspunkte: [TOP-Nummern]].
(3) Die Vollmacht umfasst auch die Teilnahme an einer Beschlussfassung außerhalb der Versammlung (§ 48 Abs. 2 GmbHG), sofern sie dieselben Gegenstände betrifft.

3. Weisungen (optional)
[Variante A – ohne Weisungen: Der Bevollmächtigte übt das Stimmrecht nach eigenem Ermessen aus.]
[Variante B – mit Weisungen: Der Bevollmächtigte wird angewiesen, wie folgt abzustimmen:
   TOP 1 [Feststellung des Jahresabschlusses [Jahr]]: [Ja / Nein / Enthaltung]
   TOP 2 [Ergebnisverwendung]: [Ja / Nein / Enthaltung]
   TOP 3 [Entlastung der Geschäftsführung]: [Ja / Nein / Enthaltung]
   TOP 4 [Bestellung / Abberufung eines Geschäftsführers]: [Ja / Nein / Enthaltung]
Bei Anträgen, die von der angekündigten Tagesordnung abweichen, stimmt der Bevollmächtigte mit [Nein / Enthaltung / nach eigenem Ermessen].]
Die Weisungen wirken nur im Innenverhältnis; eine weisungswidrige Stimmabgabe ist gegenüber der Gesellschaft wirksam.

4. Untervollmacht
Der Bevollmächtigte ist [berechtigt / nicht berechtigt], die Vollmacht auf einen Dritten zu übertragen oder Untervollmacht zu erteilen.

5. Form, Dauer und Widerruf
(1) Diese Vollmacht ist in Textform erteilt und genügt damit § 47 Abs. 3 GmbHG. [GbR: Der Gesellschaftsvertrag vom [Datum] lässt die Vertretung bei der Beschlussfassung zu / Die übrigen Gesellschafter haben der Vertretung zugestimmt.]
(2) Die Vollmacht erlischt mit Beendigung der unter Ziffer 1 bezeichneten Versammlung einschließlich ihrer Fortsetzung, spätestens am [Datum].
(3) Der Vollmachtgeber kann die Vollmacht jederzeit gegenüber dem Bevollmächtigten oder gegenüber der Gesellschaft widerrufen. Erscheint der Vollmachtgeber selbst zur Versammlung, gilt die Vollmacht als widerrufen.

6. Hinweise
(1) Der Bevollmächtigte legt diese Vollmacht dem Versammlungsleiter vor Beginn der Versammlung vor; sie wird zu den Versammlungsunterlagen genommen.
(2) Stimmverbote des Vollmachtgebers (§ 47 Abs. 4 GmbHG, z. B. bei der eigenen Entlastung) gelten auch für den Bevollmächtigten.
(3) Der Bevollmächtigte wahrt Verschwiegenheit über alle Angelegenheiten der Gesellschaft, die ihm in der Versammlung bekannt werden.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Gesellschafter (Vollmachtgeber)


Annahme: Ich nehme die Vollmacht an.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Bevollmächtigter

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "handlungsvollmacht",
    titel: "Handlungsvollmacht für Mitarbeiter (§ 54 HGB)",
    kurz: "Handlungsvollmacht als General-, Art- oder Spezialvollmacht, mit der ein Mitarbeiter dein Unternehmen im laufenden Geschäft vertritt und mit „i. V.“ zeichnet.",
    kategorie: "verwaltung",
    dateiname: "Handlungsvollmacht-54-HGB",
    wofuer: [
      "Ein Mitarbeiter soll eigenständig Bestellungen auslösen, Verträge mit Kunden schließen oder Reklamationen regeln",
      "Du willst Vertretungsmacht erteilen, ohne gleich Prokura mit Handelsregistereintrag zu vergeben",
      "Für Einkäufer, Vertriebsmitarbeiter, Filial- oder Projektleiter mit klar abgesteckten Grenzen",
      "Als Spezialvollmacht für ein einzelnes Geschäft, z. B. eine Vertragsverhandlung mit einem Lieferanten",
    ],
    enthaelt: [
      "Unternehmen (Vollmachtgeber) und Bevollmächtigter",
      "1. Art der Vollmacht: General-, Art- oder Spezialhandlungsvollmacht (§ 54 Abs. 1 HGB)",
      "2. Umfang und Grenzen: gesetzliche Ausnahmen (§ 54 Abs. 2 HGB), besondere Befugnisse, interne Beschränkungen, § 181 BGB, § 58 HGB",
      "3. Zeichnung mit dem Zusatz „i. V.“ (§ 57 HGB)",
      "4. Pflichten des Bevollmächtigten",
      "5. Dauer, Widerruf und Erlöschen",
      "6. Hinweis: keine Handelsregistereintragung",
      "Unterschriften und Annahmeerklärung",
    ],
    hinweise: [
      "Die Handlungsvollmacht gibt es nur für Kaufleute, also für e. K., OHG, KG, GmbH und UG. Ein Kleingewerbetreibender ohne Handelsregistereintrag erteilt stattdessen eine gewöhnliche Vollmacht nach § 167 BGB.",
      "Grundstücksgeschäfte, Wechsel, Darlehen und Prozessführung sind ohne ausdrückliche besondere Befugnis ausgeschlossen (§ 54 Abs. 2 HGB). Alles andere, was der Betrieb gewöhnlich mit sich bringt, ist drin, wenn du es nicht in der Urkunde ausnimmst.",
      "Interne Grenzen wie Betragslimits wirken gegenüber Dritten nur, wenn diese sie kannten oder kennen mussten (§ 54 Abs. 3 HGB). Teile wichtigen Lieferanten die Grenzen deshalb schriftlich mit.",
      "Anders als die Prokura wird die Handlungsvollmacht nicht ins Handelsregister eingetragen. Beim Ausscheiden des Mitarbeiters Urkunde zurückfordern und Geschäftspartner informieren, sonst wirkt der Rechtsschein weiter.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen Handlungsvollmacht und Prokura?",
        a: "Die Prokura (§§ 48 ff. HGB) ist gesetzlich auf fast alle Geschäfte festgelegt, kann nach außen nicht beschränkt werden und muss ins Handelsregister eingetragen werden. Die Handlungsvollmacht ist flexibler: Du bestimmst den Umfang selbst, sie ist formfrei und wird nicht eingetragen. Für Mitarbeiter unterhalb der Geschäftsleitung ist sie meist die passende Stufe.",
      },
      {
        q: "Wie unterschreibt ein Handlungsbevollmächtigter richtig?",
        a: "Mit der Firma, dem Zusatz „i. V.“ (in Vollmacht) und seinem Namen (§ 57 HGB). Der Zusatz „ppa.“ ist dem Prokuristen vorbehalten. „i. A.“ (im Auftrag) signalisiert dagegen meist nur eine Botenfunktion und sollte nicht für Vertragsabschlüsse verwendet werden.",
      },
      {
        q: "Was passiert, wenn der Mitarbeiter sein Betragslimit überschreitet?",
        a: "Gegenüber einem gutgläubigen Geschäftspartner ist das Geschäft in der Regel wirksam, weil die Beschränkung Dritte nur bindet, wenn sie davon wussten oder wissen mussten (§ 54 Abs. 3 HGB). Intern hat der Mitarbeiter seine Pflichten verletzt und kann auf Schadensersatz haften. Deshalb Limits an Lieferanten kommunizieren und Bestellprozesse technisch absichern.",
      },
      {
        q: "Erlischt die Handlungsvollmacht automatisch bei Kündigung?",
        a: "Ja, mit dem Ende des Arbeitsverhältnisses erlischt auch die Vollmacht (§ 168 Satz 1 BGB). Trotzdem solltest du sie ausdrücklich widerrufen, die Urkunde einziehen und Geschäftspartner informieren. Wer weiter mit der alten Urkunde auftritt, kann dich sonst gegenüber Gutgläubigen verpflichten.",
      },
    ],
    seo: {
      title: "Handlungsvollmacht Vorlage § 54 HGB kostenlos 2026 | GründerX",
      description:
        "Handlungsvollmacht für Mitarbeiter als kostenlose Vorlage: General-, Art- oder Spezialvollmacht, Grenzen nach § 54 Abs. 2 HGB, Zeichnung i. V., Widerruf.",
    },
    stand: "2026-10",
    text: `Handlungsvollmacht (§ 54 HGB)

Vollmachtgeber:
[Firma] [e. K. / GmbH / UG (haftungsbeschränkt) / OHG / KG], [Straße, PLZ Ort], Handelsregister: Amtsgericht [Ort], [HRA / HRB] [Nummer], vertreten durch [Vorname Nachname, Inhaber / Geschäftsführer]
– nachfolgend „Unternehmen“ –

Bevollmächtigter:
[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort], beschäftigt als [Position] seit dem [Datum]
– nachfolgend „Bevollmächtigter“ –

1. Erteilung und Art der Vollmacht
(1) Das Unternehmen erteilt dem Bevollmächtigten Handlungsvollmacht im Sinne des § 54 HGB.
(2) Die Vollmacht wird erteilt als
[Variante A – Generalhandlungsvollmacht: Vollmacht zum Betrieb des gesamten Handelsgewerbes des Unternehmens (§ 54 Abs. 1 HGB).]
[Variante B – Arthandlungsvollmacht: Vollmacht zur Vornahme der zum Handelsgewerbe gehörenden Geschäfte folgender Art: [z. B. Einkauf von Handelswaren; Abschluss von Kaufverträgen mit Kunden; Bearbeitung von Reklamationen].]
[Variante C – Spezialhandlungsvollmacht: Vollmacht zur Vornahme des folgenden einzelnen Geschäfts: [z. B. „Verhandlung und Abschluss des Rahmenliefervertrags mit der [Firma] GmbH“].]

2. Umfang und Grenzen
(1) Die Vollmacht umfasst alle Geschäfte und Rechtshandlungen, die der Betrieb des Handelsgewerbes [bzw. die Vornahme der bezeichneten Geschäfte] gewöhnlich mit sich bringt (§ 54 Abs. 1 HGB).
(2) Nicht umfasst sind, soweit nicht in Absatz 3 ausdrücklich eingeräumt (§ 54 Abs. 2 HGB):
   a) die Veräußerung und Belastung von Grundstücken,
   b) die Eingehung von Wechselverbindlichkeiten,
   c) die Aufnahme von Darlehen,
   d) die Prozessführung.
(3) [Besondere Befugnisse: Der Bevollmächtigte ist zusätzlich befugt, [z. B. Darlehen bis zu [Betrag] EUR aufzunehmen]. / Besondere Befugnisse werden nicht eingeräumt.]
(4) Im Innenverhältnis darf der Bevollmächtigte ohne vorherige Zustimmung [des Inhabers / der Geschäftsführung] nicht:
   a) Verträge mit einem Wert von mehr als [Betrag] EUR im Einzelfall oder [Betrag] EUR pro Jahr abschließen,
   b) Verträge mit einer Laufzeit von mehr als [z. B. 12] Monaten abschließen,
   c) Forderungen des Unternehmens erlassen, stunden oder abtreten,
   d) [weitere Beschränkungen, z. B. Rabatte über [Prozent] %].
Diese Beschränkungen gelten gegenüber Dritten nur, wenn diese sie kannten oder kennen mussten (§ 54 Abs. 3 HGB).
(5) Der Bevollmächtigte ist [nicht] von den Beschränkungen des § 181 BGB befreit.
(6) Die Übertragung auf Dritte ist nur mit Zustimmung des Unternehmens zulässig (§ 58 HGB).

3. Zeichnung
Der Bevollmächtigte zeichnet mit der Firma, dem Zusatz „i. V.“ und seinem Namen (§ 57 HGB), zum Beispiel:
   [Firma]
   i. V. [Vorname Nachname]
Der Zusatz „ppa.“ ist dem Prokuristen vorbehalten.

4. Pflichten des Bevollmächtigten
Der Bevollmächtigte übt die Vollmacht im Interesse des Unternehmens und im Rahmen der erteilten Weisungen aus und unterrichtet [den Inhaber / die Geschäftsführung] unverzüglich über Geschäfte von erheblicher Bedeutung. Die Pflichten aus dem Arbeitsvertrag vom [Datum] bleiben unberührt.

5. Dauer, Widerruf und Erlöschen
(1) Die Vollmacht gilt ab dem [Datum] [bis zum [Datum] / auf unbestimmte Zeit].
(2) Das Unternehmen kann die Vollmacht jederzeit ohne Angabe von Gründen widerrufen. Der Widerruf wird mit Zugang beim Bevollmächtigten wirksam.
(3) Die Vollmacht erlischt mit Beendigung des Arbeitsverhältnisses (§ 168 Satz 1 BGB).
(4) Nach dem Erlöschen gibt der Bevollmächtigte diese Urkunde im Original zurück (§ 175 BGB) und verwendet den Zusatz „i. V.“ nicht mehr.

6. Hinweis
Die Handlungsvollmacht wird – anders als die Prokura – nicht in das Handelsregister eingetragen. [Sie wird den Geschäftspartnern [Namen] mit Schreiben vom [Datum] bekanntgegeben.]

[Ort], den [Datum]


______________________________
[Vorname Nachname], [Inhaber / Geschäftsführer] der [Firma]


Ich nehme die Handlungsvollmacht an.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Bevollmächtigter

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "einspruch-steuerbescheid",
    titel: "Einspruch gegen Steuerbescheid",
    kurz: "Einspruch nach § 347 AO gegen Einkommensteuer-, Umsatzsteuer-, Gewerbesteuermess- oder Körperschaftsteuerbescheid mit Begründung und Antrag auf Aussetzung der Vollziehung.",
    kategorie: "verwaltung",
    dateiname: "Einspruch-Steuerbescheid",
    wofuer: [
      "Das Finanzamt hat Betriebsausgaben gestrichen, Werte geschätzt oder ohne Erklärung von deiner Steuererklärung abgewichen",
      "Du hast einen Rechen- oder Übernahmefehler im Bescheid entdeckt (z. B. nicht angerechnete Vorauszahlungen)",
      "Du willst die Nachzahlung nicht sofort leisten, solange der Streit läuft (Aussetzung der Vollziehung)",
      "Die Begründung ist noch nicht fertig, aber die Monatsfrist läuft ab",
    ],
    enthaelt: [
      "Briefkopf mit Steuernummer und genauer Bezeichnung des Bescheids",
      "Einspruchserklärung nach § 347 AO mit Zugangsdatum",
      "Begründung mit fünf Beispielgründen zum Auswählen (Betriebsausgaben, Abweichung, Schätzung, Rechenfehler, anhängiges Verfahren)",
      "Konkreter Änderungsantrag",
      "Antrag auf Aussetzung der Vollziehung (§ 361 Abs. 2 AO)",
      "Anlagenverzeichnis und Bitte um Eingangsbestätigung",
      "Unterschrift",
    ],
    hinweise: [
      "Die Einspruchsfrist beträgt einen Monat ab Bekanntgabe (§ 355 Abs. 1 AO). Ein per Post versandter Bescheid gilt am vierten Tag nach der Aufgabe zur Post als bekanntgegeben (§ 122 Abs. 2 Nr. 1 AO, seit 01.01.2025). Fällt das Fristende auf ein Wochenende oder einen Feiertag, endet die Frist am nächsten Werktag.",
      "Der Einspruch allein stoppt die Zahlungspflicht nicht. Ohne bewilligte Aussetzung der Vollziehung musst du die festgesetzte Steuer zum Fälligkeitstag zahlen, sonst fallen Säumniszuschläge von 1 % pro angefangenen Monat an (§ 240 AO).",
      "Das Finanzamt prüft im Einspruchsverfahren den ganzen Bescheid neu und darf ihn auch zu deinen Ungunsten ändern (Verböserung, § 367 Abs. 2 AO). Es muss dich vorher darauf hinweisen; dann kannst du den Einspruch noch zurücknehmen.",
      "Wird die Aussetzung gewährt und der Einspruch später abgewiesen, fallen Aussetzungszinsen an (§ 237 AO). Rechne also durch, ob sich die Aussetzung lohnt.",
      "Einspruch fristwahrend auch ohne vollständige Begründung einlegen und die Begründung nachreichen. Nur die Frist ist hart, die Begründung kann folgen.",
    ],
    faqs: [
      {
        q: "Wie reiche ich den Einspruch ein: Brief, E-Mail oder ELSTER?",
        a: "Der Einspruch muss schriftlich oder elektronisch eingelegt werden (§ 357 Abs. 1 AO). Brief, Fax, die Einspruchsfunktion in Mein ELSTER und auch eine einfache E-Mail genügen; eine Unterschrift ist nicht zwingend, der Absender muss aber erkennbar sein. Am sichersten ist ELSTER, weil der Eingang automatisch protokolliert wird. Ein Anruf reicht nicht.",
      },
      {
        q: "Was ist der Unterschied zwischen Einspruch und schlichtem Änderungsantrag?",
        a: "Der Einspruch hält den ganzen Bescheid offen und zwingt das Finanzamt zu einer förmlichen Entscheidung, gegen die du klagen kannst. Ein Antrag auf schlichte Änderung (§ 172 Abs. 1 Nr. 2a AO) betrifft nur den konkret genannten Punkt und kann nicht zur Verböserung führen. Bei klaren Einzelfehlern reicht die schlichte Änderung, bei strittigen Fragen ist der Einspruch der stärkere Weg.",
      },
      {
        q: "Wann bekomme ich die Aussetzung der Vollziehung?",
        a: "Wenn ernstliche Zweifel an der Rechtmäßigkeit des Bescheids bestehen oder die Vollziehung eine unbillige Härte wäre (§ 361 Abs. 2 AO). Ernstliche Zweifel liegen vor, wenn gute Gründe für deine Sicht sprechen, etwa eine unklare Rechtslage oder offensichtliche Fehler. Die Aussetzung wird nur für den streitigen Betrag gewährt, der Rest ist fällig.",
      },
      {
        q: "Was passiert, wenn ich die Monatsfrist verpasst habe?",
        a: "Dann ist der Bescheid bestandskräftig und der Einspruch wird als unzulässig verworfen. Eine Wiedereinsetzung in den vorigen Stand (§ 110 AO) gibt es nur, wenn du ohne Verschulden verhindert warst, etwa durch Krankenhausaufenthalt, und den Einspruch innerhalb eines Monats nach Wegfall des Hindernisses nachholst. Prüfe sonst, ob der Bescheid unter dem Vorbehalt der Nachprüfung steht oder eine Änderungsvorschrift greift.",
      },
    ],
    seo: {
      title: "Einspruch Steuerbescheid Vorlage kostenlos (§ 347 AO) | GründerX",
      description:
        "Einspruch gegen den Steuerbescheid als kostenlose Vorlage: Monatsfrist, Begründung mit Beispielgründen, Antrag auf Aussetzung der Vollziehung nach § 361 AO.",
    },
    stand: "2026-10",
    text: `[Firma / Vorname Nachname]
[Straße]
[PLZ Ort]
[Telefon], [E-Mail-Adresse]

Finanzamt [Ort]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Steuernummer: [Steuernummer]
[Identifikationsnummer: [IdNr.]]

Einspruch gegen den [Einkommensteuer- / Umsatzsteuer- / Gewerbesteuermess- / Körperschaftsteuer-]bescheid [Jahr] vom [Datum des Bescheids]
Antrag auf Aussetzung der Vollziehung

Sehr geehrte Damen und Herren,

gegen den oben bezeichneten Bescheid vom [Datum], mir zugegangen am [Datum], lege ich hiermit

Einspruch (§ 347 AO)

ein.

Begründung:

[Grund 1 – nicht anerkannte Betriebsausgaben: In dem Bescheid wurden Betriebsausgaben in Höhe von [Betrag] EUR nicht anerkannt (Position „[Bezeichnung]“). Diese Aufwendungen sind betrieblich veranlasst, weil [kurze Erklärung, z. B. „es sich um die Miete für das Lager in [Ort] handelt, das ausschließlich für den Versandhandel genutzt wird“]. Die Rechnungen und Zahlungsbelege füge ich bei.]

[Grund 2 – Abweichung von der Erklärung ohne Erläuterung: Der Bescheid weicht in [Zeile / Position] von meiner Erklärung ab (erklärt: [Betrag] EUR, festgesetzt: [Betrag] EUR), ohne dass die Abweichung erläutert wurde. Ich bitte um Mitteilung der Gründe und um Berücksichtigung der erklärten Werte.]

[Grund 3 – Schätzung: Die Besteuerungsgrundlagen wurden geschätzt (§ 162 AO). Die Schätzung ist überhöht. Die tatsächlichen Werte ergeben sich aus der beigefügten [Steuererklärung / Gewinnermittlung], die ich hiermit nachreiche.]

[Grund 4 – Rechen- oder Übernahmefehler: Die festgesetzte Steuer beruht auf einem offensichtlichen Fehler: [Beschreibung, z. B. „die geleisteten Vorauszahlungen von [Betrag] EUR wurden nicht angerechnet“].]

[Grund 5 – anhängiges Musterverfahren: Die Frage, ob [Rechtsfrage], ist Gegenstand des beim [Bundesfinanzhof / Finanzgericht [Ort]] anhängigen Verfahrens [Aktenzeichen]. Ich beantrage, das Einspruchsverfahren insoweit ruhen zu lassen (§ 363 Abs. 2 AO).]

Ich beantrage, den Bescheid entsprechend zu ändern und die [Steuerart] [Jahr] auf [Betrag] EUR herabzusetzen. [Eine ausführliche Begründung und weitere Belege reiche ich bis zum [Datum] nach.]

Antrag auf Aussetzung der Vollziehung (§ 361 Abs. 2 AO):
Zugleich beantrage ich, die Vollziehung des angefochtenen Bescheids in Höhe des streitigen Betrags von [Betrag] EUR bis zur Entscheidung über den Einspruch auszusetzen. An der Rechtmäßigkeit des Bescheids bestehen aus den genannten Gründen ernstliche Zweifel. [Hilfsweise: Die Vollziehung hätte für mich eine unbillige, nicht durch überwiegende öffentliche Interessen gebotene Härte zur Folge, weil [Begründung, z. B. „die sofortige Zahlung den laufenden Geschäftsbetrieb gefährden würde“].] Den unstreitigen Teil der Steuer in Höhe von [Betrag] EUR zahle ich fristgerecht.

Anlagen:
– Kopie des angefochtenen Bescheids
– [Rechnungen und Kontoauszüge zu Grund 1]
– [Gewinnermittlung / Steuererklärung [Jahr]]
– [weitere Belege]

Ich bitte um eine kurze Eingangsbestätigung.

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[ggf. Funktion, z. B. „Geschäftsführer der [Firma] GmbH“]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "antrag-stundung-finanzamt",
    titel: "Antrag auf Stundung von Steuern (§ 222 AO)",
    kurz: "Stundungsantrag ans Finanzamt mit Härtebegründung, Liquiditätsangaben, Ratenvorschlag und Sicherheiten, damit eine Steuernachzahlung dein Unternehmen nicht ins Wanken bringt.",
    kategorie: "verwaltung",
    dateiname: "Antrag-Stundung-Finanzamt",
    wofuer: [
      "Eine Steuernachzahlung ist fällig, aber das Geld kommt erst in ein paar Wochen oder Monaten rein",
      "Ein Großkunde ist ausgefallen oder zahlt verspätet und deine Liquidität reicht zum Fälligkeitstag nicht",
      "Du willst Säumniszuschläge und Vollstreckung vermeiden und stattdessen Raten vereinbaren",
      "Das Finanzamt hat bereits gemahnt und du brauchst schnell eine belastbare Lösung",
    ],
    enthaelt: [
      "Briefkopf, Steuernummer, Bezeichnung von Steuerart, Bescheid und Fälligkeit",
      "Antrag: Stundung bis zu einem Datum oder Ratenzahlung",
      "Begründung der erheblichen Härte und warum sie vorübergehend ist",
      "Angaben zur wirtschaftlichen Lage (Kontostand, Forderungen, Fixkosten, Umsatzprognose)",
      "Ratenvorschlag mit Anzahlung und Lastschrift",
      "Sicherheiten oder Bitte um Verzicht",
      "Hinweis auf Stundungszinsen (§§ 234, 238 AO) mit optionalem Erlassantrag",
      "Hilfsantrag auf Vollstreckungsaufschub (§ 258 AO), Anlagen, Unterschrift",
    ],
    hinweise: [
      "Stundung gibt es nur bei erheblicher Härte und wenn der Steueranspruch dadurch nicht gefährdet ist (§ 222 AO). Wer nur das Geld lieber anders einsetzt, bekommt keine. Belege die Härte mit Zahlen, nicht mit Prosa.",
      "Für die Stundung fallen Stundungszinsen von 0,5 % pro vollen Monat an (§ 234 Abs. 1, § 238 Abs. 1 AO), also 6 % im Jahr. Das ist mehr als mancher Kontokorrentkredit. Rechne vorher, ob die Bank günstiger ist.",
      "Lohnsteuer und andere Steuerabzugsbeträge sind nicht stundbar (§ 222 Satz 3 und 4 AO), weil du sie nur für andere einbehältst. Bei Umsatzsteuer sind die Finanzämter sehr zurückhaltend, weil sie vom Kunden bereits vereinnahmt wurde.",
      "Den Antrag vor dem Fälligkeitstag stellen. Ab Fälligkeit laufen Säumniszuschläge von 1 % pro angefangenen Monat (§ 240 AO), und zwar auch, wenn der Antrag noch bearbeitet wird und später bewilligt wird.",
    ],
    faqs: [
      {
        q: "Was gilt als „erhebliche Härte“?",
        a: "Eine vorübergehende Zahlungsschwierigkeit, die nicht selbst verschuldet ist und bei der die sofortige Zahlung den Betrieb ernsthaft gefährden würde, zum Beispiel durch Forderungsausfall, Krankheit oder eine unerwartet hohe Nachzahlung nach Betriebsprüfung. Keine Härte liegt vor, wenn du die Nachzahlung lange absehen konntest und keine Rücklage gebildet hast. Das Finanzamt prüft auch, ob du einen Bankkredit bekommen könntest.",
      },
      {
        q: "Muss ich Sicherheiten stellen?",
        a: "Nach § 222 AO soll die Stundung in der Regel nur gegen Sicherheitsleistung gewährt werden. In der Praxis verzichten Finanzämter bei kleineren Beträgen und kurzen Laufzeiten meist darauf, wenn keine Rückstände bestehen. Biete trotzdem etwas an, etwa eine Forderungsabtretung, oder begründe, warum eine Sicherheit entbehrlich ist.",
      },
      {
        q: "Was ist der Unterschied zwischen Stundung und Vollstreckungsaufschub?",
        a: "Die Stundung schiebt die Fälligkeit hinaus; es fallen Stundungszinsen, aber keine Säumniszuschläge an. Der Vollstreckungsaufschub (§ 258 AO) lässt die Fälligkeit bestehen und verhindert nur die Zwangsvollstreckung; Säumniszuschläge laufen weiter. Die Vorlage stellt deshalb den Stundungsantrag und hilfsweise den Aufschub.",
      },
      {
        q: "Wie lange dauert die Bearbeitung und was mache ich bis dahin?",
        a: "Je nach Finanzamt einige Tage bis mehrere Wochen. Bis zur Entscheidung solltest du die vorgeschlagene erste Rate bereits zahlen; das zeigt Zahlungswillen und verringert Zinsen und Zuschläge. Kommt bis zur Fälligkeit keine Antwort, ruf die Vollstreckungsstelle an und verweise auf den Antrag.",
      },
    ],
    seo: {
      title: "Stundungsantrag Finanzamt Vorlage (§ 222 AO) kostenlos | GründerX",
      description:
        "Antrag auf Stundung von Steuern als kostenlose Vorlage: erhebliche Härte begründen, Ratenzahlung vorschlagen, Sicherheiten, Stundungszinsen nach § 238 AO.",
    },
    stand: "2026-10",
    text: `[Firma / Vorname Nachname]
[Straße]
[PLZ Ort]
[Telefon], [E-Mail-Adresse]

Finanzamt [Ort]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Steuernummer: [Steuernummer]

Antrag auf Stundung (§ 222 AO)
[Steuerart, z. B. Einkommensteuer 2025 einschließlich Solidaritätszuschlag] laut Bescheid vom [Datum], fällig am [Datum]

Sehr geehrte Damen und Herren,

mit Bescheid vom [Datum] haben Sie [Steuerart] in Höhe von [Betrag] EUR festgesetzt. Der Betrag ist am [Datum] fällig. Ich beantrage, diesen Betrag

[Variante A: bis zum [Datum] zu stunden.]
[Variante B: in [Anzahl] monatlichen Raten zu je [Betrag] EUR, beginnend am [Datum], zu stunden (Ratenzahlung).]

Begründung:

Die Einziehung bei Fälligkeit würde für mich eine erhebliche Härte bedeuten. [Grund, z. B.: Die Nachzahlung beruht auf dem Gewinn des Jahres [Jahr]. Seit [Monat/Jahr] ist der Umsatz meines Unternehmens durch [z. B. den Ausfall des Hauptkunden [Name] / die verspätete Zahlung einer Forderung in Höhe von [Betrag] EUR / eine Investition in [Gegenstand]] erheblich zurückgegangen. Die liquiden Mittel reichen zum Fälligkeitstag nicht aus, um die Steuer in einer Summe zu zahlen, ohne den laufenden Geschäftsbetrieb (Löhne, Miete, Lieferanten) zu gefährden.]

Die Härte ist vorübergehend: [z. B. Mit dem Zahlungseingang aus dem Auftrag [Bezeichnung] am [Datum] / mit den Umsätzen des Weihnachtsgeschäfts] stehen ab [Monat/Jahr] wieder ausreichende Mittel zur Verfügung. Der Steueranspruch wird durch die Stundung nicht gefährdet. Weitere Steuerrückstände bestehen nicht. [Alternativ: Weitere Rückstände bestehen in Höhe von [Betrag] EUR ([Steuerart]); diese sind in den Ratenplan einbezogen.]

Zur aktuellen wirtschaftlichen Lage:
– Kontostand Geschäftskonto zum [Datum]: [Betrag] EUR
– Offene Forderungen gegen Kunden: [Betrag] EUR, davon fällig bis [Datum]: [Betrag] EUR
– Monatliche Fixkosten (Miete, Personal, Versicherungen, Kredite): [Betrag] EUR
– Erwarteter Umsatz der nächsten drei Monate: [Betrag] EUR
– Verfügbare Kreditlinie: [Betrag] EUR, davon ausgeschöpft: [Betrag] EUR

Ratenvorschlag:
[Anzahl] Raten zu je [Betrag] EUR, jeweils zum [Tag] eines Monats, erstmals am [Datum], letzte Rate am [Datum]. [Eine erste Zahlung in Höhe von [Betrag] EUR habe ich bereits am [Datum] geleistet / leiste ich sofort.] Die Raten [ziehen Sie bitte per SEPA-Lastschrift von dem Konto [IBAN] ein / überweise ich unaufgefordert].

Sicherheiten:
[Variante A: Als Sicherheit biete ich [z. B. die Abtretung der Forderung gegen [Kunde] in Höhe von [Betrag] EUR / eine Bankbürgschaft der [Bank] über [Betrag] EUR] an.]
[Variante B: Ich bitte, von einer Sicherheitsleistung abzusehen, da der Betrag innerhalb von [Anzahl] Monaten vollständig getilgt wird und keine Steuerrückstände aus der Vergangenheit bestehen.]

Mir ist bekannt, dass für die Dauer der Stundung Stundungszinsen von 0,5 % für jeden vollen Monat anfallen (§ 234 Abs. 1, § 238 Abs. 1 AO). [Ich beantrage, die Zinsen aus Billigkeitsgründen zu erlassen (§ 234 Abs. 2 AO), weil [Begründung].]

Bis zur Entscheidung über diesen Antrag bitte ich, von Vollstreckungsmaßnahmen abzusehen. Sollte eine Stundung nicht in Betracht kommen, beantrage ich hilfsweise Vollstreckungsaufschub (§ 258 AO) nach dem vorgeschlagenen Ratenplan.

Anlagen:
– Kopie des Steuerbescheids
– Kontoauszug zum [Datum]
– Liste der offenen Forderungen
– Betriebswirtschaftliche Auswertung [Monat] bis [Monat] [Jahr] / Liquiditätsplan der nächsten sechs Monate
– [Nachweis des Härtegrunds, z. B. Insolvenzmitteilung des Kunden, ärztliche Bescheinigung]

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[ggf. Funktion, z. B. „Geschäftsführer der [Firma] GmbH“]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "antrag-herabsetzung-vorauszahlungen",
    titel: "Antrag auf Herabsetzung der Steuervorauszahlungen",
    kurz: "Antrag nach § 37 Abs. 3 EStG, mit dem du Einkommensteuer-, Körperschaftsteuer- und Gewerbesteuer-Vorauszahlungen an einen gesunkenen Gewinn anpassen lässt.",
    kategorie: "verwaltung",
    dateiname: "Antrag-Herabsetzung-Vorauszahlungen",
    wofuer: [
      "Dein Gewinn liegt dieses Jahr deutlich unter dem Vorjahr, aber die Vorauszahlungen wurden noch auf alter Basis festgesetzt",
      "Ein Großkunde ist weggefallen, du hast investiert oder arbeitest nur noch in Teilzeit",
      "Du willst Liquidität im Unternehmen behalten, statt sie dem Finanzamt zinslos vorzustrecken",
      "Auch für Körperschaftsteuer der GmbH/UG und den Gewerbesteuermessbetrag",
    ],
    enthaelt: [
      "Briefkopf, Steuernummer, Bezeichnung des Vorauszahlungsbescheids",
      "Antrag auf Herabsetzung ab einem bestimmten Termin, ggf. Erstattung bereits gezahlter Beträge",
      "Begründung mit Beispielen (Kundenverlust, Investition, Teilzeit, Umsatzrückgang)",
      "Gewinnprognose als Rechnung: Umsatz minus Kostenblöcke, Vergleich zum Vorjahr",
      "Weitere Einkünfte und Abzugsbeträge bei Einkommensteuer",
      "Ergebnis: voraussichtliche Steuer und neue Vorauszahlung je Quartal",
      "Antrag zum Gewerbesteuermessbetrag für Vorauszahlungszwecke (§ 19 Abs. 3 GewStG)",
      "Anlagen (BWA, Vorjahresvergleich, Nachweise), Unterschrift",
    ],
    hinweise: [
      "Die Vorauszahlungen sind am 10.03., 10.06., 10.09. und 10.12. fällig (§ 37 Abs. 1 EStG). Stell den Antrag einige Wochen vor dem nächsten Termin, sonst wird er erst beim übernächsten wirksam.",
      "Gewerbesteuer zahlst du an die Gemeinde, nicht ans Finanzamt. Das Finanzamt setzt aber den Messbetrag für Vorauszahlungszwecke fest (§ 19 Abs. 3 GewStG); die Gemeinde passt danach die Vorauszahlungen an. Deshalb beide in einem Schreiben beantragen.",
      "Wer zu optimistisch schätzt und die Vorauszahlungen zu stark drückt, bekommt die Differenz mit dem Jahresbescheid als Nachzahlung in einer Summe plus ggf. nachträglich erhöhte Vorauszahlungen. Lieber realistisch schätzen und Rücklage bilden.",
      "Eine Herabsetzung ohne Zahlen funktioniert nicht. Lege eine BWA oder eine nachvollziehbare Gewinnprognose bei; das Finanzamt darf den Antrag sonst ablehnen.",
    ],
    faqs: [
      {
        q: "Kann das Finanzamt die Vorauszahlungen auch nachträglich anpassen?",
        a: "Ja, das Finanzamt kann die Vorauszahlungen bis zum Ablauf des 15. Monats nach dem Veranlagungszeitraum anpassen (§ 37 Abs. 3 Satz 3 EStG), also auch nach oben, wenn sich im Laufe des Jahres ein höherer Gewinn abzeichnet. Umgekehrt kannst du bis dahin auch noch eine Herabsetzung beantragen, etwa um eine hohe Abschlusszahlung zu vermeiden.",
      },
      {
        q: "Gilt der Antrag auch für die GmbH oder UG?",
        a: "Ja. Für die Körperschaftsteuer verweist § 31 Abs. 1 KStG auf die Vorschriften des Einkommensteuergesetzes, die Vorauszahlungen werden also nach § 37 EStG festgesetzt und angepasst. Die Vorlage sieht die Variante Körperschaftsteuer ausdrücklich vor. Beim Geschäftsführergehalt ändert sich nichts, das läuft über die Lohnsteuer.",
      },
      {
        q: "Was passiert mit bereits gezahlten Vorauszahlungen?",
        a: "Wird die Vorauszahlung rückwirkend für das laufende Jahr herabgesetzt, entsteht ein Guthaben, das das Finanzamt erstattet oder mit anderen Steuern verrechnet. Die Vorlage beantragt die Erstattung ausdrücklich. Ohne diesen Satz wird das Guthaben oft erst mit dem Jahresbescheid verrechnet.",
      },
      {
        q: "Gibt es eine Untergrenze, ab der gar keine Vorauszahlungen festgesetzt werden?",
        a: "Ja, Einkommensteuer-Vorauszahlungen werden nur festgesetzt, wenn sie mindestens 400 EUR im Kalenderjahr und mindestens 100 EUR für einen Zahlungstermin betragen (§ 37 Abs. 5 EStG). Liegt deine Prognose darunter, kannst du beantragen, die Vorauszahlungen auf null zu setzen.",
      },
    ],
    seo: {
      title: "Vorauszahlungen herabsetzen: Antrag Finanzamt Vorlage | GründerX",
      description:
        "Antrag auf Herabsetzung der Einkommensteuer-, Körperschaftsteuer- und Gewerbesteuer-Vorauszahlungen (§ 37 Abs. 3 EStG) als Vorlage mit Gewinnprognose.",
    },
    stand: "2026-10",
    text: `[Firma / Vorname Nachname]
[Straße]
[PLZ Ort]
[Telefon], [E-Mail-Adresse]

Finanzamt [Ort]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Steuernummer: [Steuernummer]

Antrag auf Herabsetzung der [Einkommensteuer- / Körperschaftsteuer-]Vorauszahlungen [Jahr] (§ 37 Abs. 3 EStG [i. V. m. § 31 Abs. 1 KStG])
[Antrag auf Festsetzung des Gewerbesteuermessbetrags für Vorauszahlungszwecke (§ 19 Abs. 3 GewStG)]

Sehr geehrte Damen und Herren,

mit Bescheid vom [Datum] haben Sie die [Einkommensteuer- / Körperschaftsteuer-]Vorauszahlungen für [Jahr] auf vierteljährlich [Betrag] EUR (jährlich [Betrag] EUR) festgesetzt. Grundlage war der Gewinn des Jahres [Jahr] in Höhe von [Betrag] EUR.

Ich beantrage, die Vorauszahlungen ab dem [Termin, z. B. 10.06.[Jahr]] auf vierteljährlich [Betrag] EUR herabzusetzen [und die bereits geleistete Vorauszahlung vom [Datum] in Höhe von [Betrag] EUR zu erstatten bzw. mit der nächsten Rate zu verrechnen].

Begründung:

Die wirtschaftliche Lage hat sich gegenüber dem Vorjahr deutlich verändert. [z. B.: Der Hauptkunde [Name], auf den im Vorjahr [Prozent] % des Umsatzes entfielen, hat den Vertrag zum [Datum] gekündigt. / Zum [Datum] habe ich in [Gegenstand] investiert; die Abschreibungen betragen [Betrag] EUR pro Jahr. / Seit [Datum] übe ich die Tätigkeit nur noch in Teilzeit aus. / Der Umsatz der Monate [Monat] bis [Monat] liegt mit [Betrag] EUR um [Prozent] % unter dem Vorjahreszeitraum.]

Gewinnprognose [Jahr]:
   Umsatzerlöse (voraussichtlich): [Betrag] EUR
   abzüglich Wareneinsatz und Fremdleistungen: [Betrag] EUR
   abzüglich Personalkosten: [Betrag] EUR
   abzüglich Raumkosten, Versicherungen, Beiträge: [Betrag] EUR
   abzüglich Abschreibungen: [Betrag] EUR
   abzüglich sonstige Betriebsausgaben: [Betrag] EUR
   voraussichtlicher Gewinn [Jahr]: [Betrag] EUR
   (zum Vergleich Vorjahr: [Betrag] EUR)

[Bei Einkommensteuer: Weitere Einkünfte und Abzugsbeträge bleiben gegenüber dem Vorjahr unverändert / ändern sich wie folgt: [z. B. Einkünfte des Ehegatten aus nichtselbständiger Arbeit [Betrag] EUR, Vorsorgeaufwendungen [Betrag] EUR].]

Daraus ergibt sich eine voraussichtliche [Einkommensteuer / Körperschaftsteuer] [Jahr] von etwa [Betrag] EUR [zuzüglich Solidaritätszuschlag], also Vorauszahlungen von vierteljährlich [Betrag] EUR.

[Gewerbesteuer: Zugleich bitte ich, den Gewerbesteuermessbetrag für Vorauszahlungszwecke [Jahr] auf Grundlage eines voraussichtlichen Gewerbeertrags von [Betrag] EUR festzusetzen und die Gemeinde [Ort] zu informieren, damit die Gewerbesteuervorauszahlungen angepasst werden.]

Sollte sich im Laufe des Jahres eine wesentliche Abweichung von dieser Prognose ergeben, teile ich dies unverzüglich mit. Mir ist bekannt, dass eine zu niedrige Vorauszahlung zu einer Nachzahlung mit der Jahresveranlagung führt.

Anlagen:
– Betriebswirtschaftliche Auswertung (BWA) [Monat] bis [Monat] [Jahr]
– Gewinnermittlung [Vorjahr] zum Vergleich
– [Kündigungsschreiben des Kunden / Investitionsrechnung / weitere Nachweise]
– Kopie des Vorauszahlungsbescheids vom [Datum]

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[ggf. Funktion, z. B. „Geschäftsführer der [Firma] GmbH“]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "antrag-fristverlaengerung-finanzamt",
    titel: "Antrag auf Fristverlängerung für die Steuererklärung",
    kurz: "Antrag nach § 109 AO, mit dem du beim Finanzamt mehr Zeit für Einkommensteuer-, Umsatzsteuer-, Gewerbesteuer- oder Körperschaftsteuererklärung bekommst.",
    kategorie: "verwaltung",
    dateiname: "Antrag-Fristverlaengerung-Steuererklaerung",
    wofuer: [
      "Die Abgabefrist rückt näher und dir fehlen noch Belege, Bankbescheinigungen oder Lieferantenrechnungen",
      "Du warst krank, hast gerade gegründet oder die Buchhaltung umgestellt",
      "Das Finanzamt hat dich mit einer Erinnerung zur Abgabe aufgefordert",
      "Du willst einen Verspätungszuschlag vermeiden, ohne eine unvollständige Erklärung abzugeben",
    ],
    enthaelt: [
      "Briefkopf, Steuernummer, Bezeichnung der Erklärung(en) und des Jahres",
      "Nennung der laufenden Frist bzw. der Aufforderung des Finanzamts",
      "Antrag mit konkretem neuen Abgabedatum",
      "Vier Beispielbegründungen (fehlende Unterlagen, Krankheit, Gründung/Umstellung, Beraterwechsel)",
      "Zusicherung der Abgabe und Hinweis auf freiwillige Vorauszahlung",
      "Bitte um Bestätigung und Ersatztermin bei Ablehnung",
      "Anlagen und Unterschrift",
    ],
    hinweise: [
      "Gesetzliche Abgabefrist ohne Steuerberater: sieben Monate nach Ablauf des Kalenderjahres, also der 31.07. des Folgejahres (§ 149 Abs. 2 AO). Mit Steuerberater: Ende Februar des übernächsten Jahres (§ 149 Abs. 3 AO). Fällt das Fristende auf ein Wochenende oder einen Feiertag, gilt der nächste Werktag (§ 108 Abs. 3 AO). Für ältere Jahre galten verlängerte Corona-Fristen, prüfe das im Einzelfall.",
      "Eine Fristverlängerung ist Ermessenssache (§ 109 AO). Das Finanzamt muss nicht zustimmen; ein Antrag ohne Begründung wird oft abgelehnt. Schweigt das Finanzamt, gilt die Frist nicht automatisch als verlängert.",
      "Der Verspätungszuschlag ist Pflicht, wenn die Erklärung nicht innerhalb von 14 Monaten nach Ablauf des Kalenderjahres eingeht (§ 152 Abs. 2 AO): 0,25 % der festgesetzten Steuer, mindestens 25 EUR je angefangenen Monat (§ 152 Abs. 5 AO). Eine bewilligte Fristverlängerung verhindert ihn.",
      "Die Dauerfristverlängerung für Umsatzsteuer-Voranmeldungen ist etwas anderes: Sie wird einmal elektronisch über ELSTER beantragt (§§ 46 bis 48 UStDV) und gilt dann für jede Voranmeldung. Dieses Schreiben betrifft nur die Jahreserklärungen.",
    ],
    faqs: [
      {
        q: "Bis wann kann ich die Fristverlängerung beantragen?",
        a: "Vor Ablauf der Frist. Ein Antrag nach Fristende ist rechtlich eine rückwirkende Verlängerung, die das Finanzamt zwar gewähren kann (§ 109 Abs. 1 Satz 2 AO), aber nur ausnahmsweise. Stell den Antrag deshalb mindestens zwei bis drei Wochen vor dem Stichtag und mit konkretem Zieldatum.",
      },
      {
        q: "Wie lange wird die Frist üblicherweise verlängert?",
        a: "Üblich sind wenige Wochen bis einige Monate, je nach Begründung. Bei nicht beratenen Steuerpflichtigen verlängern Finanzämter regelmäßig bis in den Herbst, in begründeten Fällen bis zum Jahresende. Über das Ende Februar des übernächsten Jahres hinaus geht es nur, wenn du ohne eigenes Verschulden an der Abgabe gehindert warst (§ 109 Abs. 2 AO).",
      },
      {
        q: "Kann ich den Antrag auch über ELSTER stellen?",
        a: "Ja, in Mein ELSTER gibt es unter „Anträge, Einspruch und Mitteilungen“ den Antrag auf Fristverlängerung. Der Text der Vorlage lässt sich dort in das Begründungsfeld übernehmen. Der elektronische Weg hat den Vorteil, dass der Eingang automatisch protokolliert wird.",
      },
      {
        q: "Was mache ich, wenn das Finanzamt ablehnt?",
        a: "Dann gilt die ursprüngliche Frist oder die im Ablehnungsschreiben gesetzte Nachfrist. Gib die Erklärung so vollständig wie möglich ab und reiche fehlende Angaben per Berichtigung nach (§ 153 AO). Eine vorläufig geschätzte Position ist besser als gar keine Erklärung, weil sonst das Finanzamt schätzt und der Verspätungszuschlag sicher kommt.",
      },
    ],
    seo: {
      title: "Fristverlängerung Steuererklärung: Antrag Vorlage | GründerX",
      description:
        "Antrag auf Fristverlängerung beim Finanzamt (§ 109 AO) als kostenlose Vorlage mit Begründungen, gesetzlichen Abgabefristen und Hinweis zum Verspätungszuschlag.",
    },
    stand: "2026-10",
    text: `[Firma / Vorname Nachname]
[Straße]
[PLZ Ort]
[Telefon], [E-Mail-Adresse]

Finanzamt [Ort]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Steuernummer: [Steuernummer]
[Identifikationsnummer: [IdNr.]]

Antrag auf Fristverlängerung (§ 109 AO)
[Einkommensteuer- / Körperschaftsteuer- / Gewerbesteuer- / Umsatzsteuer-]Erklärung [Jahr] [einschließlich Gewinnermittlung / Feststellungserklärung]

Sehr geehrte Damen und Herren,

die Frist für die Abgabe der oben genannten Steuererklärung(en) für das Jahr [Jahr] endet am [Datum, z. B. 31.07.[Folgejahr]]. [Alternativ: Mit Schreiben vom [Datum] haben Sie mich zur Abgabe bis zum [Datum] aufgefordert.]

Ich beantrage, die Frist bis zum [Datum] zu verlängern.

Begründung:

[Grund 1 – fehlende Unterlagen: Für die Gewinnermittlung fehlen noch [z. B. die Jahressteuerbescheinigung der [Bank] / die Bescheinigung der [Versicherung] / Rechnungen des Lieferanten [Name]], die ich trotz Anforderung vom [Datum] bisher nicht erhalten habe.]

[Grund 2 – Krankheit oder persönliche Verhinderung: Ich war vom [Datum] bis [Datum] wegen [Krankheit / Unfall / Pflege eines Angehörigen] nicht in der Lage, die Unterlagen zusammenzustellen. Ein Nachweis liegt bei.]

[Grund 3 – Gründung oder Umstellung: Im Jahr [Jahr] habe ich mein Unternehmen gegründet / die Buchhaltung auf [Software] umgestellt. Die Aufarbeitung der Belege für den ersten Abschluss benötigt mehr Zeit als vorgesehen.]

[Grund 4 – Beraterwechsel: Mein bisheriger Steuerberater hat das Mandat zum [Datum] niedergelegt; der neue Berater [Name] hat die Unterlagen erst am [Datum] erhalten.]

Die Erklärung wird innerhalb der beantragten Frist eingereicht; die Vorbereitung ist bereits [zu etwa [Prozent] % / weitgehend] abgeschlossen. [Mit einer Nachzahlung ist nicht zu rechnen. / Eine voraussichtliche Nachzahlung in Höhe von etwa [Betrag] EUR habe ich bereits am [Datum] als freiwillige Vorauszahlung unter Angabe der Steuernummer überwiesen.]

Ich bitte um kurze Bestätigung der Fristverlängerung. Sollten Sie dem Antrag nicht oder nur teilweise entsprechen, bitte ich um Mitteilung, bis wann die Erklärung spätestens vorliegen muss.

Anlagen:
– [ärztliche Bescheinigung / Schreiben an den Lieferanten vom [Datum] / Mandatsniederlegung des Steuerberaters]
– [Kopie der Erinnerung des Finanzamts vom [Datum]]

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[ggf. Funktion, z. B. „Geschäftsführer der [Firma] GmbH“]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "kuendigung-vertrag-allgemein",
    titel: "Ordentliche Kündigung eines Dauervertrags",
    kurz: "Kündigungsschreiben für Software-Abos, Telefon- und Internetverträge, Dienstleister und Mitgliedschaften zum nächstmöglichen Termin, mit Widerspruch gegen Weiterbelastung.",
    kategorie: "verwaltung",
    dateiname: "Kuendigung-Dauervertrag",
    wofuer: [
      "Du willst ein Software-Abo, einen Mobilfunk- oder Internetvertrag, eine Mitgliedschaft oder einen Wartungsvertrag beenden",
      "Du kennst das genaue Vertragsende nicht und willst trotzdem rechtssicher zum nächstmöglichen Termin kündigen",
      "Der Anbieter soll den Eingang bestätigen und nach Vertragsende nichts mehr abbuchen",
      "Du willst Rufnummer, Daten oder Guthaben beim Wechsel sichern",
    ],
    enthaelt: [
      "Briefkopf mit Vertrags- und Kundennummer",
      "Kündigungserklärung zum Datum oder zum nächstmöglichen Zeitpunkt",
      "Bitte um schriftliche Bestätigung mit Frist",
      "Widerspruch gegen stillschweigende Verlängerung, Rückgewinnungsangebote und Weiterbelastung; Widerruf des SEPA-Mandats",
      "Zusatzbausteine für Telefon/Internet (Rufnummernmitnahme), Software/Cloud (Datenexport, Löschung) und Mitgliedschaften (Guthaben)",
      "Hinweis auf Textform (§ 309 Nr. 13 BGB) und Kündigungsbutton (§ 312k BGB)",
      "Unterschrift",
    ],
    hinweise: [
      "Kündigungsfrist und Laufzeit stehen im Vertrag oder in den AGB. Für Verbraucherverträge, die seit dem 01.03.2022 geschlossen wurden, gilt: Nach der Erstlaufzeit verlängert sich der Vertrag nur auf unbestimmte Zeit und ist mit höchstens einem Monat Frist kündbar (§ 309 Nr. 9 BGB). Für dich als Unternehmer gilt das nicht automatisch; dort zählt, was im Vertrag steht.",
      "Textform heißt: E-Mail, Kontaktformular oder Kündigungsbutton genügen. Eine AGB-Klausel, die von Verbrauchern Schriftform mit Unterschrift verlangt, ist unwirksam (§ 309 Nr. 13 BGB). Gegenüber Unternehmern kann eine Schriftformklausel wirksam sein, dann lieber per Brief kündigen.",
      "Beweise den Zugang: Einschreiben mit Rückschein, Fax mit Sendebericht oder Screenshot der Kündigungsbestätigung des Kündigungsbuttons. Ohne Nachweis kann der Anbieter behaupten, nichts erhalten zu haben, und ein weiteres Jahr abrechnen.",
      "Die Kündigung endet nicht die Zahlungspflicht für die Restlaufzeit. Wer aus wichtigem Grund (§ 314 BGB) sofort raus will, etwa bei dauerhaft nicht erbrachter Leistung, muss das ausdrücklich erklären und vorher in der Regel abmahnen.",
    ],
    faqs: [
      {
        q: "Was bedeutet „Kündigung zum nächstmöglichen Zeitpunkt“?",
        a: "Du erklärst, dass der Vertrag zum frühesten Termin enden soll, den Vertrag und Gesetz zulassen, auch wenn du das Datum nicht kennst. Die Kündigung ist dann wirksam, selbst wenn du ein falsches Datum genannt hättest. Die Vorlage kombiniert beides: ein konkretes Datum und hilfsweise den nächstmöglichen Termin, damit nichts an einem Rechenfehler scheitert.",
      },
      {
        q: "Was ist der Kündigungsbutton nach § 312k BGB?",
        a: "Unternehmen, die Verbrauchern Dauerverträge über eine Website anbieten, müssen dort eine leicht zugängliche Kündigungsschaltfläche bereithalten, die zu einer Bestätigungsseite führt. Die Kündigung über diesen Button ist auch ohne Login wirksam und muss sofort elektronisch bestätigt werden. Für reine B2B-Verträge gilt die Pflicht nicht, viele Anbieter bieten den Button aber allen Kunden an.",
      },
      {
        q: "Darf der Anbieter nach der Kündigung weiter abbuchen?",
        a: "Nur bis zum Vertragsende und nur für vertraglich geschuldete Beträge. Danach fehlt die Grundlage, und du kannst Lastschriften innerhalb von acht Wochen zurückgeben lassen. Die Vorlage widerspricht der Weiterbelastung ausdrücklich und widerruft das SEPA-Mandat zum Vertragsende, damit du einen klaren Beleg hast.",
      },
      {
        q: "Muss ich eine Begründung angeben?",
        a: "Nein. Eine ordentliche Kündigung braucht keinen Grund, und eine Begründung gibt dem Anbieter nur Ansatzpunkte für Rückgewinnungsversuche. Anders ist es bei der außerordentlichen Kündigung aus wichtigem Grund: Dort musst du den Grund nennen und ihn auf Nachfrage belegen können.",
      },
    ],
    seo: {
      title: "Kündigung Vertrag Vorlage: Abo, Telefon, Verein | GründerX",
      description:
        "Kündigungsschreiben für Dauerverträge als kostenlose Vorlage: zum nächstmöglichen Termin, mit Bestätigungsbitte, Widerspruch gegen Weiterbelastung, Textform.",
    },
    stand: "2026-10",
    text: `[Firma / Vorname Nachname]
[Straße]
[PLZ Ort]
[Telefon], [E-Mail-Adresse]

[Anbieter / Firma]
[Kundenservice / Vertragsverwaltung]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Kündigung des Vertrags [Bezeichnung, z. B. „Software-Abo [Produkt]“ / „Mobilfunkvertrag“ / „Mitgliedschaft“]
Vertragsnummer / Kundennummer: [Nummer]
[Rufnummer / Vertragskonto / E-Mail-Adresse des Nutzerkontos: [Angabe]]

Sehr geehrte Damen und Herren,

hiermit kündige ich den oben bezeichneten Vertrag [fristgerecht zum [Datum] / zum nächstmöglichen Zeitpunkt].

Sollte der von mir genannte Termin nicht der nächstmögliche sein, gilt die Kündigung zum nächstmöglichen Zeitpunkt. Bitte teilen Sie mir dieses Datum mit.

Ich bitte Sie, mir den Eingang der Kündigung und das Datum des Vertragsendes innerhalb von [14] Tagen schriftlich oder per E-Mail an [E-Mail-Adresse] zu bestätigen.

Einer stillschweigenden Verlängerung des Vertrags, Angeboten zur Vertragsfortführung sowie einer Weiterbelastung meines Kontos [IBAN, letzte vier Stellen: [XXXX]] oder meiner Kreditkarte über das Vertragsende hinaus widerspreche ich ausdrücklich. Das erteilte SEPA-Lastschriftmandat widerrufe ich mit Wirkung zum Vertragsende. Beträge, die nach dem Vertragsende abgebucht werden, lasse ich zurückbuchen bzw. fordere sie zurück.

[Bei Telefon- und Internetverträgen: Die Rufnummer [Nummer] möchte ich [zu einem neuen Anbieter mitnehmen / nicht mitnehmen]. Bitte übersenden Sie mir die für die Portierung erforderlichen Daten und bestätigen Sie, dass die Rufnummer bis zur Portierung erreichbar bleibt.]

[Bei Software- und Cloud-Diensten: Bitte nennen Sie mir, bis wann ich meine Daten exportieren kann, und bestätigen Sie die anschließende Löschung meiner personenbezogenen Daten (Art. 17 DSGVO), soweit keine gesetzliche Aufbewahrungspflicht besteht.]

[Bei Mitgliedschaften: Bitte bestätigen Sie, dass ab dem Vertragsende keine Beiträge mehr anfallen, und überweisen Sie ein etwaiges Guthaben auf das Konto [IBAN].]

Hinweis zur Form: Diese Kündigung ist in Textform erklärt. Soweit Ihre AGB für die Kündigung eine strengere Form vorsehen, ist eine solche Klausel gegenüber Verbrauchern unwirksam (§ 309 Nr. 13 BGB). [Bei Online-Verträgen als Verbraucher: Die Kündigung habe ich zusätzlich am [Datum] über Ihre Kündigungsschaltfläche nach § 312k BGB erklärt; die Bestätigung liegt mir vor.]

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[ggf. Firma und Funktion]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "widerspruch-rechnung",
    titel: "Widerspruch gegen eine Rechnung (Rechnungsreklamation)",
    kurz: "Schreiben, mit dem du einer fehlerhaften Lieferanten- oder Dienstleisterrechnung positionsweise widersprichst, nur den unbestrittenen Teil zahlst und eine korrigierte Rechnung forderst.",
    kategorie: "verwaltung",
    dateiname: "Widerspruch-Rechnung",
    wofuer: [
      "Eine Rechnung enthält Positionen, die du nicht bestellt hast, oder falsche Mengen",
      "Der berechnete Preis weicht vom Angebot, der Auftragsbestätigung oder der Preisliste ab",
      "Eine Leistung wurde doppelt berechnet oder gar nicht bzw. mangelhaft erbracht",
      "Der Rechnung fehlen Pflichtangaben nach § 14 UStG und du brauchst sie für den Vorsteuerabzug",
    ],
    enthaelt: [
      "Briefkopf mit Rechnungs-, Kunden- und Bestellnummer",
      "Positionsweiser Widerspruch mit fünf Beispielgründen (nicht bestellt, falsche Menge, Preisabweichung, doppelt, mangelhaft)",
      "Rüge fehlender Pflichtangaben nach § 14 Abs. 4 UStG",
      "Zahlung des unbestrittenen Teils, Zurückbehaltung des streitigen Betrags (§ 320 BGB)",
      "Zurückweisung von Mahnkosten und Verzugszinsen auf den streitigen Teil",
      "Frist für berichtigte Rechnung oder Gutschrift, ggf. als E-Rechnung",
      "Anlagen und Unterschrift",
    ],
    hinweise: [
      "Widersprich sofort und schriftlich. Bei Kaufleuten gilt im Zweifel: Wer eine Rechnung oder ein kaufmännisches Bestätigungsschreiben lange unbeanstandet lässt, hat es schwer, später Einwände durchzusetzen. Eine Frist von wenigen Tagen ist üblich.",
      "Zahle den unbestrittenen Teil pünktlich. Wer die ganze Rechnung zurückhält, gerät mit dem unstreitigen Betrag in Verzug und schuldet darauf Verzugszinsen; bei Geschäften zwischen Unternehmern sind das 9 Prozentpunkte über dem Basiszinssatz plus 40 EUR Pauschale (§ 288 Abs. 2 und 5 BGB).",
      "Ohne vollständige Pflichtangaben (§ 14 Abs. 4 UStG) gibt es keinen Vorsteuerabzug. Fehlt etwa die Steuernummer oder das Leistungsdatum, fordere eine berichtigte Rechnung, nicht nur eine E-Mail mit der Nachbesserung.",
      "Seit dem 01.01.2025 müssen Unternehmen in Deutschland E-Rechnungen (XRechnung, ZUGFeRD) von anderen Unternehmen empfangen können. Eine berichtigte E-Rechnung muss ebenfalls als E-Rechnung ausgestellt werden; ein geändertes PDF reicht dann nicht.",
    ],
    faqs: [
      {
        q: "Darf ich die ganze Rechnung zurückhalten, wenn ein Teil falsch ist?",
        a: "Nein, nur den streitigen Teil. Für den Rest besteht die Zahlungspflicht, und ab Fälligkeit beziehungsweise 30 Tage nach Zugang der Rechnung tritt Verzug ein (§ 286 Abs. 3 BGB). Zahl also den unbestrittenen Betrag unter Angabe der Rechnungsnummer und halte nur die beanstandeten Positionen zurück.",
      },
      {
        q: "Was tun, wenn der Lieferant trotzdem mahnt oder ein Inkassobüro einschaltet?",
        a: "Schick dem Inkassobüro eine Kopie deines Widerspruchs und verweise darauf, dass die Forderung bestritten ist. Inkassokosten für eine bestrittene Forderung musst du nicht tragen, wenn der Widerspruch vor der Beauftragung zugegangen ist. Deshalb den Zugang des Widerspruchs beweisbar machen, etwa per E-Mail mit Lesebestätigung oder Einschreiben.",
      },
      {
        q: "Brauche ich eine Stornorechnung oder reicht eine Gutschrift?",
        a: "Umsatzsteuerlich ist beides möglich: Der Aussteller kann die Rechnung berichtigen (§ 14 Abs. 6 UStG i. V. m. § 31 Abs. 5 UStDV) oder stornieren und neu ausstellen. Wichtig ist, dass die Korrektur eindeutig auf die ursprüngliche Rechnungsnummer verweist. Eine kaufmännische Gutschrift, die den Betrag mindert, ist keine umsatzsteuerliche Gutschrift im Sinne von § 14 Abs. 2 UStG; die Bezeichnung sollte eindeutig sein.",
      },
      {
        q: "Gilt das auch, wenn ich die Ware schon angenommen habe?",
        a: "Ja. Die Annahme der Ware ist keine Anerkennung der Rechnung. Bei Mängeln musst du als Kaufmann aber unverzüglich nach Lieferung rügen (§ 377 HGB), sonst gilt die Ware als genehmigt. Preis- und Mengenfehler in der Rechnung kannst du dagegen auch später noch beanstanden; je früher, desto besser.",
      },
    ],
    seo: {
      title: "Rechnung widersprechen: Vorlage Rechnungsreklamation | GründerX",
      description:
        "Widerspruch gegen eine fehlerhafte Rechnung als kostenlose Vorlage: Positionen beanstanden, unbestrittenen Teil zahlen, Frist für berichtigte Rechnung setzen.",
    },
    stand: "2026-10",
    text: `[Firma / Vorname Nachname]
[Straße]
[PLZ Ort]
[Telefon], [E-Mail-Adresse]

[Firma des Rechnungsstellers]
[Buchhaltung / Debitorenbuchhaltung]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Widerspruch gegen Rechnung Nr. [Rechnungsnummer] vom [Datum]
[Kundennummer: [Nummer] / Bestell- oder Auftragsnummer: [Nummer]]

Sehr geehrte Damen und Herren,

am [Datum] habe ich Ihre oben genannte Rechnung über [Gesamtbetrag] EUR erhalten. Nach Prüfung widerspreche ich der Rechnung in folgenden Punkten:

Position [Nr.] „[Bezeichnung]“, berechnet [Betrag] EUR:
[Grund A – nicht bestellt: Diese Leistung / Ware habe ich nicht bestellt. Eine Bestellung oder Beauftragung liegt nicht vor; andernfalls bitte ich, mir den Auftrag vorzulegen.]
[Grund B – falsche Menge: Bestellt und geliefert wurden [Anzahl] Stück (Lieferschein Nr. [Nummer] vom [Datum]), berechnet wurden [Anzahl] Stück.]
[Grund C – Preisabweichung: Vereinbart war laut [Angebot Nr. [Nummer] vom [Datum] / Auftragsbestätigung vom [Datum] / Preisliste] ein Preis von [Betrag] EUR netto je [Einheit]; berechnet wurden [Betrag] EUR.]
[Grund D – doppelt berechnet: Diese Position wurde bereits mit Rechnung Nr. [Nummer] vom [Datum] berechnet und am [Datum] bezahlt.]
[Grund E – Leistung nicht oder mangelhaft erbracht: Die Leistung wurde [nicht / nur teilweise / mangelhaft] erbracht: [kurze Beschreibung]. Insoweit mache ich mein Zurückbehaltungsrecht geltend (§ 320 BGB) und behalte mir weitere Rechte wegen des Mangels vor.]

Position [Nr.] „[Bezeichnung]“, berechnet [Betrag] EUR:
[Grund wie oben]

[Formale Mängel: Außerdem fehlen auf der Rechnung folgende Pflichtangaben nach § 14 Abs. 4 UStG: [z. B. Ihre Steuernummer oder USt-IdNr. / das Leistungsdatum / die fortlaufende Rechnungsnummer / der anzuwendende Steuersatz und der Steuerbetrag]. Ohne diese Angaben ist der Vorsteuerabzug nicht möglich.]

Der unbestrittene Teil der Rechnung in Höhe von [Betrag] EUR wird [bis zum [Datum] / wurde bereits am [Datum]] auf Ihr Konto [IBAN] überwiesen [unter Abzug des vereinbarten Skontos von [Prozent] %]. Den streitigen Betrag von [Betrag] EUR halte ich bis zur Klärung zurück. Mahnkosten, Verzugszinsen oder Inkassokosten auf den streitigen Betrag erkenne ich nicht an.

Ich bitte Sie, mir bis zum [Datum] eine berichtigte Rechnung über [Betrag] EUR zu übersenden [bzw. eine Stornorechnung oder Gutschrift über [Betrag] EUR mit Bezug auf die Rechnungsnummer zu erteilen]. [Bei E-Rechnung: Bitte übermitteln Sie die berichtigte Rechnung als E-Rechnung im Format [XRechnung / ZUGFeRD] an [E-Mail-Adresse].]

Anlagen:
– Kopie der Rechnung Nr. [Rechnungsnummer]
– [Bestellung / Auftragsbestätigung / Angebot vom [Datum]]
– [Lieferschein Nr. [Nummer]]
– [Zahlungsbeleg zu Rechnung Nr. [Nummer]]

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[ggf. Firma und Funktion]

${VORLAGEN_HINWEIS}`,
  },
  {
    slug: "einwilligung-foto-video",
    titel: "Einwilligung zu Foto- und Videoaufnahmen",
    kurz: "Einwilligungserklärung für Mitarbeiter, Kunden und Teilnehmer zur Anfertigung und Veröffentlichung von Fotos und Videos nach DSGVO und Kunsturhebergesetz.",
    kategorie: "verwaltung",
    dateiname: "Einwilligung-Foto-Video",
    wofuer: [
      "Du willst Mitarbeiter auf der Website, in Stellenanzeigen oder auf LinkedIn zeigen",
      "Kunden oder Teilnehmer einer Veranstaltung, eines Workshops oder Shootings sollen in deinem Marketing erscheinen",
      "Du produzierst Social-Media-Videos, Testimonials oder Messefotos mit erkennbaren Personen",
      "Minderjährige sind abgebildet und die Eltern müssen zustimmen",
    ],
    enthaelt: [
      "Verantwortlicher und abgebildete Person",
      "1. Gegenstand: Anlass und Art der Aufnahmen",
      "2. Zwecke und Kanäle zum Ankreuzen (Website, Social Media, Print, Presse, intern, Werbung, Recruiting); Namensnennung",
      "3. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO, §§ 22, 23 KUG, § 26 Abs. 2 BDSG für Beschäftigte",
      "4. Freiwilligkeit und keine Vergütung",
      "5. Dauer, auch nach Ende des Arbeitsverhältnisses",
      "6. Widerruf (Art. 7 Abs. 3 DSGVO) und seine Grenzen",
      "7. Datenschutzhinweise und Betroffenenrechte",
      "8. Minderjährige: Unterschrift der Sorgeberechtigten",
      "Unterschriftsblock",
    ],
    hinweise: [
      "Die Einwilligung muss freiwillig sein. Bei Mitarbeitern ist das heikel, weil ein Abhängigkeitsverhältnis besteht; deshalb ausdrücklich zusichern, dass eine Ablehnung keine Nachteile hat, und die Einwilligung nicht in den Arbeitsvertrag packen (§ 26 Abs. 2 BDSG).",
      "Jede Plattform und jeder Zweck muss einzeln genannt sein. Wer nur „Website“ angekreuzt hat, darf das Bild nicht in eine bezahlte Instagram-Anzeige stecken. Lieber mehr Kästchen anbieten als später nachfragen.",
      "Ein Widerruf wirkt für die Zukunft. Gedruckte Flyer und bereits von Dritten geteilte Posts musst du nicht einsammeln, Inhalte auf deinen eigenen Kanälen aber zeitnah entfernen. Das kann ein Imagevideo unbrauchbar machen; plane bei zentralen Personen eine Vergütung oder einen Lizenzvertrag ein.",
      "Für Gruppenaufnahmen auf öffentlichen Veranstaltungen kann § 23 Abs. 1 Nr. 3 KUG greifen (Versammlungen, bei denen die Personen nur als Teil der Menge erscheinen). Sobald eine Person herausgestellt wird, brauchst du wieder die Einwilligung.",
      "Die Einwilligung ist zu dokumentieren (Art. 7 Abs. 1 DSGVO). Unterschriebene Formulare so lange aufbewahren, wie die Aufnahmen genutzt werden, und der Person eine Kopie geben.",
    ],
    faqs: [
      {
        q: "Reicht eine mündliche Einwilligung oder ein Nicken vor der Kamera?",
        a: "Rechtlich kann eine Einwilligung auch mündlich oder durch schlüssiges Verhalten erteilt werden, du musst sie aber nachweisen können (Art. 7 Abs. 1 DSGVO). Vor Gericht ist das ohne Schriftstück kaum möglich. Für Beschäftigte verlangt § 26 Abs. 2 BDSG ohnehin Schriftform oder elektronische Form. Deshalb immer unterschreiben lassen oder zumindest per E-Mail bestätigen.",
      },
      {
        q: "Gilt die Einwilligung eines Mitarbeiters auch nach seiner Kündigung weiter?",
        a: "Nur, wenn das vereinbart ist. Die Vorlage regelt, dass bereits veröffentlichte Aufnahmen bleiben dürfen, Neuveröffentlichungen nach dem Ausscheiden aber eine erneute Zustimmung brauchen. Ohne Regelung gehen Gerichte oft davon aus, dass die Einwilligung mit dem Arbeitsverhältnis endet, zumindest bei Bildern, die den Mitarbeiter als Teil des aktuellen Teams zeigen.",
      },
      {
        q: "Ab welchem Alter dürfen Jugendliche selbst einwilligen?",
        a: "Das KUG und die DSGVO nennen für Fotoveröffentlichungen keine feste Altersgrenze; entscheidend ist die Einsichtsfähigkeit. In der Praxis lässt man ab etwa 14 Jahren den Jugendlichen und die Sorgeberechtigten gemeinsam unterschreiben, bis 18 Jahre auf jeden Fall auch die Eltern. Die 16-Jahres-Grenze des Art. 8 DSGVO gilt nur für Online-Dienste, die sich direkt an Kinder richten.",
      },
      {
        q: "Darf ich die Bilder bearbeiten oder mit Musik unterlegen?",
        a: "Übliche Bearbeitungen wie Zuschnitt, Farbkorrektur, Texteinblendungen und Musik sind durch die Vorlage abgedeckt. Nicht erlaubt ist, die Person in einen entstellenden, herabsetzenden oder sinnverfälschenden Zusammenhang zu bringen, etwa als Beispiel für ein Negativszenario. Das würde das Persönlichkeitsrecht verletzen, unabhängig von der Einwilligung.",
      },
    ],
    seo: {
      title: "Einwilligung Fotos & Videos Vorlage (DSGVO, KUG) | GründerX",
      description:
        "Einwilligung für Foto- und Videoaufnahmen von Mitarbeitern, Kunden und Teilnehmern als kostenlose Vorlage: Zwecke, Kanäle, Dauer, Widerruf, Minderjährige.",
    },
    stand: "2026-10",
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
  },
  {
    slug: "mitteilung-adressaenderung-geschaeftspartner",
    titel: "Mitteilung über Umfirmierung, Adress- oder Rechtsformänderung",
    kurz: "Schreiben an Kunden, Lieferanten, Banken und Finanzamt mit alten und neuen Unternehmensdaten, Gültig-ab-Datum und Bitte um Aktualisierung der Stammdaten.",
    kategorie: "verwaltung",
    dateiname: "Mitteilung-Adressaenderung-Umfirmierung",
    wofuer: [
      "Du ziehst mit dem Unternehmen um und alle Partner sollen die neue Adresse rechtzeitig haben",
      "Dein Unternehmen bekommt einen neuen Namen (Umfirmierung)",
      "Du wechselst die Rechtsform, z. B. vom Einzelunternehmen oder der GbR in eine GmbH oder UG",
      "Banken, Versicherungen und das Finanzamt sollen Stammdaten, Kontoinhaber und Steuernummern aktualisieren",
    ],
    enthaelt: [
      "Briefkopf und Betreff mit Art der Änderung und Gültig-ab-Datum",
      "Gegenüberstellung bisher/neu: Firma, Rechtsform, Anschrift, Register, Steuernummer, USt-IdNr., Kontakt",
      "Variante A: reine Adress- oder Namensänderung, alles andere unverändert",
      "Variante B: Rechtsformwechsel mit Vertragsübernahme, neuer Steuernummer und Bankverbindung",
      "Konkrete Bitten: Stammdaten, Rechnungsstellung, Schriftverkehr, Zustimmung",
      "Zusatzbausteine für Banken und Finanzamt (§ 137 AO)",
      "Übergangsfrist, Ansprechpartner, Anlagen",
      "Unterschrift und Gegenzeichnungsfeld für die Vertragsübernahme",
    ],
    hinweise: [
      "Eine Umfirmierung oder Sitzverlegung bei GmbH, UG, OHG, KG und e. K. wird erst mit der Eintragung im Handelsregister wirksam (§ 31 HGB, bei der GmbH §§ 53, 54 GmbHG). Verschicke das Schreiben erst, wenn die Eintragung vorliegt, und leg den Auszug bei.",
      "Beim Wechsel der Rechtsform entsteht ein neuer Rechtsträger mit neuer Steuernummer, neuer USt-IdNr. und meist neuem Konto. Bestehende Verträge gehen nicht automatisch über; Vertragspartner müssen der Übernahme zustimmen (§§ 414, 415 BGB analog für die Vertragsübernahme). Die Vorlage holt diese Zustimmung per Gegenzeichnung ein.",
      "Rechnungen müssen den vollständigen Namen und die Anschrift des Leistungsempfängers tragen (§ 14 Abs. 4 Nr. 1 UStG). Rechnungen auf die alte Firma nach dem Stichtag gefährden den Vorsteuerabzug; deshalb Lieferanten ausdrücklich zur Umstellung auffordern.",
      "Neben den Geschäftspartnern sind zu aktualisieren: Gewerbeamt (Ummeldung, § 14 GewO), Finanzamt (§ 137 AO), IHK/HWK, Berufsgenossenschaft, Impressum und Datenschutzerklärung (§ 5 DDG), Marktplätze, Google Unternehmensprofil, Domain-Registrar und Versicherungen. Für die Post einen Nachsendeauftrag einrichten.",
    ],
    faqs: [
      {
        q: "Muss ich das Finanzamt gesondert informieren?",
        a: "Ja. Änderungen der Anschrift und des Unternehmensnamens teilst du dem Finanzamt formlos mit, am einfachsten über Mein ELSTER. Bei einem Rechtsformwechsel in eine Kapitalgesellschaft ist zusätzlich der Fragebogen zur steuerlichen Erfassung für die neue Gesellschaft Pflicht; er ist innerhalb eines Monats nach Gründung elektronisch zu übermitteln (§ 138 Abs. 1b AO).",
      },
      {
        q: "Bleibt meine USt-IdNr. bei einer Adressänderung erhalten?",
        a: "Ja, solange der Rechtsträger derselbe bleibt. Die USt-IdNr. ist an das Unternehmen gebunden, nicht an die Adresse oder den Namen. Nur bei einem Wechsel der Rechtsform, bei dem eine neue Gesellschaft entsteht, bekommt diese eine eigene USt-IdNr. vom Bundeszentralamt für Steuern. Die alte Nummer gilt dann nur noch für Umsätze bis zum Stichtag.",
      },
      {
        q: "Was passiert mit laufenden Verträgen beim Wechsel ins GmbH-Modell?",
        a: "Beim Einzelunternehmen und bei der GbR gibt es keinen gesetzlichen Übergang der Verträge auf die neue GmbH; jeder Vertrag muss einzeln übernommen werden, und der Vertragspartner muss zustimmen. Die Vorlage bittet um Gegenzeichnung. Wer viele Verträge hat, kann alternativ eine Ausgliederung nach dem Umwandlungsgesetz prüfen, die einen Gesamtübergang ermöglicht, aber Notar und Register kostet.",
      },
      {
        q: "Wie lange sollte ich alte Adresse und alten Namen parallel führen?",
        a: "Für die Post reicht meist ein Nachsendeauftrag von sechs bis zwölf Monaten. Auf Rechnungen und im Impressum muss ab dem Stichtag sofort die neue Firma stehen. Ein Hinweis „vormals [alter Name]“ auf Website und Briefpapier für ein Jahr ist zulässig und hilft Kunden und Lieferanten bei der Zuordnung.",
      },
    ],
    seo: {
      title: "Adressänderung & Umfirmierung mitteilen: Vorlage | GründerX",
      description:
        "Mitteilung über Umfirmierung, Umzug oder Rechtsformwechsel an Kunden, Lieferanten, Banken und Finanzamt als kostenlose Vorlage: neue Daten, Gültig-ab-Datum.",
    },
    stand: "2026-10",
    text: `[Neue Firma]
[Straße]
[PLZ Ort]
[Telefon], [E-Mail-Adresse]

[Firma des Geschäftspartners]
[Ansprechpartner / Abteilung, z. B. Buchhaltung oder Kundenbetreuung]
[Straße]
[PLZ Ort]

[Ort], den [Datum]

Mitteilung: [Umfirmierung / Änderung der Geschäftsadresse / Änderung der Rechtsform] mit Wirkung zum [Datum]
[Unsere Kunden- oder Lieferantennummer bei Ihnen: [Nummer]]

Sehr geehrte Damen und Herren,

wir informieren Sie darüber, dass sich unsere Unternehmensdaten mit Wirkung zum [Datum] ändern.

Bisher:
   Firma: [bisheriger Name]
   Rechtsform: [z. B. Einzelunternehmen / GbR / UG (haftungsbeschränkt)]
   Anschrift: [Straße, PLZ Ort]
   [Handelsregister: Amtsgericht [Ort], [HRA / HRB] [Nummer]]
   Steuernummer: [Nummer]
   [USt-IdNr.: [Nummer]]

Neu ab [Datum]:
   Firma: [neuer Name]
   Rechtsform: [z. B. GmbH]
   Anschrift: [Straße, PLZ Ort]
   [Handelsregister: Amtsgericht [Ort], HRB [Nummer]]
   Steuernummer: [neue Nummer / unverändert]
   [USt-IdNr.: [neue Nummer / unverändert]]
   Telefon: [Nummer / unverändert]
   E-Mail: [Adresse / unverändert]
   Website: [Domain]

[Variante A – Adress- oder Namensänderung: Der Rechtsträger bleibt derselbe. Alle bestehenden Verträge, Bestellungen und Vereinbarungen gelten unverändert fort. Ansprechpartner, Bankverbindung ([IBAN], [Bank]), Steuernummer und USt-IdNr. bleiben unverändert.]

[Variante B – Rechtsformwechsel: Das Unternehmen wird ab dem [Datum] von der neu gegründeten [neue Firma] GmbH fortgeführt. Die GmbH tritt in alle bestehenden Verträge mit Ihnen ein. Soweit für die Vertragsübernahme Ihre Zustimmung erforderlich ist, bitten wir Sie, diese durch Gegenzeichnung dieses Schreibens zu erteilen. Die neue Gesellschaft hat eine eigene Steuernummer und USt-IdNr. (siehe oben) sowie eine neue Bankverbindung: [IBAN], [Bank]. Rechnungen für Leistungen ab dem [Datum] stellen Sie bitte auf die neue Firma aus; Rechnungen für Leistungen bis zum [Datum] weiterhin auf die bisherige Firma.]

Wir bitten Sie,
– Ihre Stammdaten sowie Rechnungs- und Lieferadressen entsprechend zu aktualisieren,
– Rechnungen ab dem [Datum] auf die neue Firma und Anschrift auszustellen (§ 14 Abs. 4 UStG),
– Schriftverkehr und Lieferungen ab dem [Datum] ausschließlich an die neue Anschrift zu richten,
– [bei Rechtsformwechsel: Ihre Zustimmung zur Vertragsübernahme durch Gegenzeichnung zu bestätigen].

[Zusatz für Banken: Bitte aktualisieren Sie den Kontoinhaber, die Korrespondenzadresse, die Kartendaten und die hinterlegten Vertretungsberechtigten. Den aktuellen Handelsregisterauszug und die Gesellschafterliste fügen wir bei.]

[Zusatz für das Finanzamt: Wir bitten um Kenntnisnahme der Änderung (§ 137 AO) und Zuordnung zur Steuernummer [Nummer]. Für die neue Gesellschaft haben wir den Fragebogen zur steuerlichen Erfassung am [Datum] über ELSTER übermittelt.]

Post an die bisherige Anschrift erreicht uns über einen Nachsendeauftrag noch bis zum [Datum]. Für Rückfragen steht Ihnen [Vorname Nachname] unter [Telefon / E-Mail-Adresse] zur Verfügung.

Anlagen:
– [Handelsregisterauszug vom [Datum]]
– [Gewerbeummeldung / Gewerbeanmeldung vom [Datum]]
– [Bestätigung der USt-IdNr. des Bundeszentralamts für Steuern]

Mit freundlichen Grüßen


______________________________
[Vorname Nachname]
[Funktion, z. B. „Geschäftsführer der [neue Firma] GmbH“]


[Bei Rechtsformwechsel – Zustimmung zur Vertragsübernahme:
Wir stimmen dem Eintritt der [neue Firma] GmbH in den Vertrag [Bezeichnung / Vertragsnummer] mit Wirkung zum [Datum] zu.

[Ort], den [Datum]


______________________________
[Firma des Geschäftspartners], [Vorname Nachname, Funktion]]

${VORLAGEN_HINWEIS}`,
  },
];
