import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Star, Info, FileText, ListChecks, Link2, ArrowRight } from "lucide-react";
import { Callout, ToolSection } from "@/components/cockpit/kit";

/**
 * Read-only Walkthrough des ELSTER-Formulars
 * "Fragebogen zur steuerlichen Erfassung - Gruendung einer Personengesellschaft
 * / -gemeinschaft" (fsepersg-202401) fuer GbR / OHG / KG / PartG / GmbH & Co. KG.
 * Teilseiten + Zeilennummern 1:1 gegen die echten ELSTER-Screencaptures
 * (durchgeklickt 2026-05-30, 25 PNG) verifiziert. Du fuellst direkt in ELSTER aus,
 * diese Seite liest parallel.
 */

interface Field {
  z?: string; // ELSTER-Zeile (wo eindeutig lesbar)
  label: string;
  hint?: string;
  star?: boolean; // für Co-Founder / GbR/KG besonders relevant
}

interface Teilseite {
  nr: number;
  title: string;
  intro?: string;
  fields: Field[];
}

const TEILSEITEN: Teilseite[] = [
  {
    nr: 1,
    title: "Angaben zum Unternehmen",
    fields: [
      { z: "2", label: "Name (Firma laut Handels-/Gesellschaftsregister bzw. Name, unter dem die Gesellschaft/Gemeinschaft auftritt)", hint: "Bei GbR ohne Registereintrag: der gemeinsame Name, unter dem ihr auftretet.", star: true },
      { z: "3-5", label: "Geschäftsadresse (Straße, Hausnummer, Adressergänzung, PLZ, Ort) - Inland oder Ausland", hint: "Die ladungsfähige Anschrift der Gesellschaft.", star: true },
      { z: "6", label: "Postfachadresse (optional)" },
      { z: "10", label: "Telefon (Vorwahl international / national / Rufnummer)" },
      { z: "11", label: "Internetadresse (Web)" },
      { z: "12", label: "Art der ausgeübten Tätigkeit (genaue Bezeichnung des Gewerbezweigs)", hint: "Präzise beschreiben - das FA leitet daraus Steuerart und Gewerbeschlüssel ab.", star: true },
    ],
  },
  {
    nr: 2,
    title: "Angaben zum Ort der Geschäftsleitung",
    intro: "Nur ausfüllen, wenn der Ort der Geschäftsleitung von der Geschäftsadresse abweicht.",
    fields: [
      { z: "7-9", label: "Abweichende Adresse der Geschäftsleitung (Inland oder Ausland)", hint: "Bestimmt die örtliche Zuständigkeit des Finanzamts." },
    ],
  },
  {
    nr: 3,
    title: "Betriebsstätten",
    intro: "Bei mehr als zehn Betriebsstätten eine Aufstellung als Anhang (PDF) beifügen.",
    fields: [
      { label: "Bezeichnung der Betriebsstätte(n) (Tabelle, weitere hinzufügbar)", hint: "Weitere Standorte neben der Hauptadresse - Lager, Filiale, Lohnsteuer-Betriebsstätte." },
    ],
  },
  {
    nr: 4,
    title: "Gründungsangaben",
    intro: "Bei einer Neugründung ohne Vorgänger bleiben Vorunternehmen/Vorinhaber leer.",
    fields: [
      { z: "25", label: "Gründungsform + Gründungsdatum", hint: "Neugründung, Übernahme, Umwandlung etc." },
      { z: "26-28", label: "Vorheriges Unternehmen (Firmenbezeichnung, Adresse, Land/Steuernummer/Finanzamt, USt-IdNr, Wirtschafts-IdNr)", hint: "Nur bei Übernahme/Fortführung eines bestehenden Betriebs." },
      { z: "29+", label: "Vorheriger Inhaber (Anrede/Titel, Name, Vorname, Adresse, Ordnungskriterium)", hint: "Nur bei Betriebsübernahme von einer Person." },
    ],
  },
  {
    nr: 5,
    title: "Rechtsform und Beginn der Tätigkeit",
    fields: [
      { z: "31", label: "Rechtsform der Gesellschaft / Gemeinschaft (Auswahl)", hint: "GbR, OHG, KG, PartG, GmbH & Co. KG usw.", star: true },
      { z: "32", label: "Angabe der sonstigen Rechtsform (z. B. Partnerschaftsgesellschaft, ARGE)" },
      { z: "33", label: "Ist die Gesellschaft / Gemeinschaft vermögensverwaltend? (Auswahl)", hint: "Rein vermögensverwaltende GbR (z. B. Immobilien-GbR) hat andere Steuerfolgen als gewerbliche.", star: true },
      { z: "34", label: "Beginn der Tätigkeit (inkl. Vorbereitungshandlungen)", star: true },
    ],
  },
  {
    nr: 6,
    title: "Handelsregister- / Gesellschaftsregistereintragung",
    intro: "GbR kann sich seit 2024 freiwillig ins Gesellschaftsregister (eGbR) eintragen; OHG/KG sind eintragungspflichtig.",
    fields: [
      { z: "35", label: "Registereintrag beabsichtigt / Antrag beim Register gestellt + Datum", star: true },
      { z: "36", label: "Registereintragung ist erfolgt (Auswahl)" },
      { z: "37", label: "Der Registereintrag besteht seit (Datum)" },
      { z: "38", label: "Ort des Amtsgerichts" },
      { z: "39", label: "Register (Auswahl: HRA / Gesellschaftsregister …) + Registernummer", hint: "OHG/KG = HRA; eingetragene GbR = Gesellschaftsregister (GsR)." },
    ],
  },
  {
    nr: 7,
    title: "Bankverbindung für Steuererstattungen / SEPA-Lastschriftverfahren",
    intro: "Das ausgefüllte SEPA-Lastschriftmandat zusätzlich übermitteln (Anhang).",
    fields: [
      { z: "40", label: "IBAN (inländisches Geldinstitut)", star: true },
      { z: "41", label: "IBAN (ausländisches Geldinstitut)" },
      { z: "42", label: "BIC zur ausländischen IBAN" },
      { z: "43", label: "Kontoinhaber(in) ist (Auswahl)" },
      { z: "44", label: "Gegebenenfalls abweichende(r) Kontoinhaber(in)" },
    ],
  },
  {
    nr: 8,
    title: "Vertretung der Gesellschaft / Gemeinschaft",
    fields: [
      { label: "Vertreter: Name / Firma (Tabelle, weitere hinzufügbar)", hint: "Wer die Gesellschaft vertritt - bei GbR i. d. R. die Gesellschafter, bei KG die Komplementäre, bei GmbH & Co. KG die Komplementär-GmbH.", star: true },
    ],
  },
  {
    nr: 9,
    title: "Steuerliche Beratung",
    intro: "Wenn ein Steuerberater die Gesellschaft betreut.",
    fields: [
      { z: "55", label: "Natürliche Person: Anrede/Titel, Name, Vorname, Namensvorsatz/-zusatz" },
      { z: "57-61", label: "Adresse (Inland/Ausland), Postfach, Telefon der Beratung" },
      { z: "56", label: "Nicht natürliche Person: Anrede, Firmenbezeichnung + Adresse", hint: "Bei Steuerberatungs-Gesellschaft statt Einzelperson." },
    ],
  },
  {
    nr: 10,
    title: "Empfangsbevollmächtigte(r) für alle Steuerarten",
    fields: [
      { label: "Die angegebene steuerliche Beratung ist empfangsbevollmächtigt (Ankreuzfeld)", hint: "Haken setzen, wenn der StB aus Teilseite 9 auch Bescheide empfangen soll." },
      { label: "Sonst: Empfangsbevollmächtigte(r) separat (natürlich/nicht natürlich + Adresse)" },
      { label: "Nur bei nicht rechtsfähigen Personenvereinigungen: gemeinsame(r) Empfangsbevollmächtigte(r) nach Paragraf 183 AO", hint: "Wichtig für die GbR: eine Person bündelt den FA-Schriftverkehr für alle Gesellschafter.", star: true },
    ],
  },
  {
    nr: 11,
    title: "Konzernzugehörigkeit",
    intro: "Nur wenn die Gesellschaft zu einem Konzern gehört.",
    fields: [
      { z: "71", label: "Die Gesellschaft gehört zu einem Konzern (Ankreuzfeld)" },
      { z: "72", label: "Name des herrschenden Unternehmens" },
      { z: "73", label: "Land / Steuernummer / Finanzamt des herrschenden Unternehmens" },
      { z: "74", label: "Wirtschafts-Identifikationsnummer" },
      { z: "75-76", label: "Ort des Amtsgerichts, Register + Registernummer" },
    ],
  },
  {
    nr: 12,
    title: "Angaben zum voraussichtlichen Gewinn und zur Gewinnermittlung",
    fields: [
      { z: "77", label: "Voraussichtlicher Gewinn der Gesellschaft (Jahr der Betriebseröffnung + Folgejahr, Euro)", hint: "Realistisch schätzen - daraus leitet das FA Vorauszahlungen ab. Die ESt zahlt jeder Gesellschafter privat, die GewSt die Gesellschaft (Freibetrag 24.500 EUR).", star: true },
      { z: "78", label: "Art der Gewinnermittlung: EÜR (Paragraf 4 Abs. 3) vs. Betriebsvermögensvergleich/Bilanz (Paragraf 4 Abs. 1 / Paragraf 5)", hint: "GbR/PartG können meist EÜR. OHG/KG (Handelsgewerbe) bilanzieren in der Regel.", star: true },
      { z: "79", label: "Liegt ein vom Kalenderjahr abweichendes Wirtschaftsjahr vor? + Beginn", hint: "Standard = Kalenderjahr. Abweichend meist nur bei OHG/KG mit FA-Zustimmung." },
    ],
  },
  {
    nr: 13,
    title: "Angaben zu den Beteiligten und zum voraussichtlichen Gewinnanteil",
    intro: "Der Kern der Personengesellschaft: Der Gewinn wird auf die Gesellschafter verteilt (gesonderte und einheitliche Feststellung) - jeder versteuert seinen Anteil in der privaten ESt. Die Nummer des Beteiligten bei späterer FA-Kommunikation beibehalten.",
    fields: [
      { label: "Beteiligte: Angaben zur Person + voraussichtlicher Gewinnanteil im Jahr der Betriebseröffnung + im Folgejahr (Tabelle, weitere Beteiligte hinzufügbar)", hint: "Je Beteiligten: Name/Anschrift, persönliche Steuer-Identifikationsnummer und der prozentuale bzw. betragsmäßige Gewinnanteil laut Gesellschaftsvertrag.", star: true },
    ],
  },
  {
    nr: 14,
    title: "Freistellungsbescheinigung Paragraf 48b EStG (Bauabzugssteuer)",
    fields: [
      { z: "118", label: "Erteilung einer Freistellungsbescheinigung beantragen (Ankreuzfeld)", hint: "Nur für Bauleistungs-Erbringer relevant - vermeidet 15 %-Bauabzugssteuer-Einbehalt durch Auftraggeber." },
    ],
  },
  {
    nr: 15,
    title: "Anmeldung und Abführung der Lohnsteuer",
    intro: "Nur wenn die Gesellschaft Arbeitnehmer beschäftigt.",
    fields: [
      { z: "104", label: "Anzahl der Arbeitnehmer insgesamt", star: true },
      { z: "104", label: "davon Gesellschafter oder deren Ehegatten/Lebenspartner", hint: "Mitarbeitende Gesellschafter werden steuerlich anders behandelt (Sondervergütung)." },
      { z: "104", label: "davon geringfügig Beschäftigte (2 %-Pauschsteuer Minijob-Zentrale)" },
      { label: "Beginn der Lohnzahlungen (Datum)" },
      { label: "Voraussichtliche Lohnsteuer im Kalenderjahr (Euro)", hint: "Bestimmt den Anmeldungszeitraum (monatlich/quartal/jährlich)." },
      { z: "104+", label: "Lohnsteuerliche Betriebsstätte: Bezeichnung + Adresse" },
    ],
  },
  {
    nr: 16,
    title: "Anmeldung und Abführung der Umsatzsteuer",
    intro: "Die zentrale USt-Seite - hier legst du Kleinunternehmer und Soll-/Istversteuerung fest.",
    fields: [
      { label: "Geschäftsveräußerung im Ganzen (Paragraf 1 Abs. 1a UStG)" },
      { label: "Summe der Umsätze (Jahr der Betriebseröffnung + Folgejahr, geschätzt)", hint: "Grundlage für Kleinunternehmer-Prüfung und USt-VA-Rhythmus.", star: true },
      { label: "Kleinunternehmer-Regelung (Paragraf 19 UStG) in Anspruch nehmen / darauf verzichten", hint: "Bei vorsteuerlastigem Aufbau (Einkauf, Investitionen) lohnt oft der Verzicht. Sonst KU = keine USt, kein Vorsteuerabzug.", star: true },
      { label: "Soll- vs. Istversteuerung der Entgelte", hint: "Istversteuerung (USt erst bei Zahlungseingang) schont Liquidität - bis 800.000 EUR Vorjahresumsatz beantragbar.", star: true },
      { label: "Durchschnittssatzbesteuerung (Land-/Forstwirtschaft) / Soll- oder Istversteuerung der Entgelte" },
    ],
  },
  {
    nr: 17,
    title: "Umsatzsteuerliche Organschaft (Paragraf 2 Abs. 2 Nr. 2 UStG)",
    intro: "Nur bei umsatzsteuerlicher Organschaft. Bei mehr als 2 Verbindungen Aufstellung als Anhang beifügen.",
    fields: [
      { label: "Die Gesellschaft ist Organträger folgender Organgesellschaft(en): Firmenname (Tabelle)", hint: "Relevant in Konzern-/Beteiligungsstrukturen - im Normalfall der Neugründung leer." },
    ],
  },
  {
    nr: 18,
    title: "Umsatzsteuer-Identifikationsnummer und weitere Angaben zur Umsatzsteuer",
    fields: [
      { label: "USt-IdNr. wird benötigt (innergemeinschaftlicher Waren-/Dienstleistungsverkehr und/oder Internet-Handel)", hint: "Brauchst du für EU-B2B (z. B. Meta/Google-Rechnungen aus IE, EU-Lieferanten) und Marktplatz-Handel.", star: true },
      { label: "Bereits früher für eine Tätigkeit vergebene USt-IdNr. + Vergabedatum" },
      { label: "Steuerschuldnerschaft des Leistungsempfängers bei Bau-/Gebäudereinigungsleistungen (Paragraf 13b)" },
    ],
  },
  {
    nr: 19,
    title: "Besonderes Besteuerungsverfahren One-Stop-Shop (OSS)",
    intro: "Für grenzüberschreitende B2C-Umsätze in der EU (Fernverkauf, digitale Leistungen).",
    fields: [
      { label: "Für im Inland ansässige Unternehmer: OSS in Anspruch nehmen / Verzicht / direkt im EU-Staat versteuern", hint: "Relevant ab Überschreiten der 10.000-EUR-EU-Lieferschwelle - siehe USt-Rechner (OSS-Tab)." },
      { label: "Für in einem anderen EU-Mitgliedstaat ansässige Unternehmer: entsprechende Optionen" },
    ],
  },
  {
    nr: 20,
    title: "Umsätze im Bereich des Handels mit Waren über das Internet",
    intro: "Für E-Commerce-Nachweis gegenüber Marktplatz-Betreibern (Paragraf 25e UStG).",
    fields: [
      { z: "175", label: "Verkauf über einen eigenen Webshop (Ankreuzfeld)", star: true },
      { z: "176", label: "Web-Adresse (URL) des Shops" },
      { z: "178", label: "Handel über elektronische Schnittstelle(n) / Marktplatz (Paragraf 25e UStG)", hint: "Amazon, eBay, Etsy etc.", star: true },
      { label: "Elektronische Marktplätze: Name der Schnittstelle + Identifikationsmerkmal (z. B. Account-Name)" },
    ],
  },
  {
    nr: 21,
    title: "Beigefügte Unterlagen",
    intro: "Ankreuzen, was du mitschickst (Anhänge auf Teilseite 22 hochladen).",
    fields: [
      { label: "Vertrag der Übernahme / Einbringung / Umwandlung / Verschmelzung eines Unternehmens" },
      { label: "Vertrag der Gesellschaft / Gemeinschaft (Gesellschaftsvertrag)", hint: "Pflicht-Anlage - auch die GbR sollte einen schriftlichen Vertrag beifügen.", star: true },
      { label: "Erklärung über die gesellschaftsrechtlichen Vertretungen" },
      { label: "Verträge zwischen Gesellschaft und Gesellschafter (Anstellungs-, Miet-, Pacht-, Darlehensverträge)", hint: "Wichtig für die Anerkennung von Sondervergütungen/Sonderbetriebsausgaben." },
      { label: "Gesellschaftsvertrag der Komplementär-GmbH (bei GmbH & Co. KG)" },
      { label: "Vollmacht/Empfangsvollmacht steuerliche Beratung, SEPA-Teilnahmeerklärung, weitere Unterlagen" },
    ],
  },
  {
    nr: 22,
    title: "Anhänge",
    intro: "Datei-Upload (pdf, xml; max. 10 MB/Datei). Alle unter Teilseite 21 angekreuzten Dokumente hier hochladen, dann Alles prüfen und authentifiziert versenden.",
    fields: [
      { label: "Dateien hochladen (Bezeichnung + Datei auswählen)", star: true },
    ],
  },
];

const FsePersgWizard = () => {
  return (
    <CockpitShell
      eyebrow="Fragebogen zur steuerlichen Erfassung · Personengesellschaft"
      title="FsE Personengesellschaft / -gemeinschaft: Schritt für Schritt"
      subtitle="Walkthrough aller 22 Teilseiten des echten ELSTER-Formulars (fsepersg, Stand 2026) für die Gründung einer GbR, OHG, KG, PartG oder GmbH & Co. KG: in ELSTER-Reihenfolge, mit Zeilennummern und Erklärung. Du füllst direkt in ELSTER aus, diese Seite erklärt parallel."
    >
      <div className="mb-6 space-y-4">
        <Callout tone="accent" icon={Info} title="Das Besondere an der Personengesellschaft">
          Die PersG (GbR/OHG/KG) zahlt selbst <strong>keine Einkommensteuer</strong>. Der Gewinn wird
          auf Gesellschaftsebene ermittelt und nach Quote auf die Beteiligten verteilt
          (<strong>gesonderte und einheitliche Feststellung</strong>, Teilseite 13); jeder versteuert
          seinen Anteil in der privaten ESt. Gewerbesteuer fällt dagegen auf Gesellschaftsebene an
          (mit 24.500 EUR Freibetrag). Deshalb dreht sich der Fragebogen stark um die
          <strong> Beteiligten und ihre Gewinnanteile</strong>.
        </Callout>

        <Callout tone="warning" title="Die Entscheidungen, die wirklich zählen">
          <ul className="space-y-1.5">
            <li><strong>Gewinnanteile der Beteiligten (Teilseite 13):</strong> Gewinnanteil je Gesellschafter, muss zum Gesellschaftsvertrag passen. Jeder Beteiligte braucht seine persönliche Steuer-ID.</li>
            <li><strong>Gewinnermittlung (Teilseite 12):</strong> EÜR (einfacher) vs. Bilanz. GbR/PartG meist EÜR, OHG/KG bilanzieren in der Regel.</li>
            <li><strong>Kleinunternehmer Paragraf 19 (Teilseite 16):</strong> Bei vorsteuerlastigem Aufbau oft Verzicht sinnvoll, sonst kein Vorsteuerabzug.</li>
            <li><strong>Istversteuerung (Teilseite 16):</strong> USt erst bei Zahlungseingang. Schont Liquidität, bis 800.000 EUR Umsatz beantragbar.</li>
            <li><strong>USt-IdNr. (Teilseite 18):</strong> Ja, sobald EU-B2B oder Marktplatz-Handel.</li>
            <li><strong>Gemeinsame(r) Empfangsbevollmächtigte(r) (Teilseite 10):</strong> bei der GbR praktisch Pflicht, eine Person bündelt den FA-Schriftverkehr.</li>
          </ul>
        </Callout>

        <Callout tone="neutral" icon={ListChecks} title="Vor dem Start: Anlagenauswahl">
          ELSTER bietet neben dem Hauptvordruck <em>FSE PersG</em> optional die <strong>Anlage ARGE</strong> (Zusatzblatt
          für Arbeitsgemeinschaften) an. Nur ankreuzen, wenn es eine ARGE ist. Im Normalfall (GbR/OHG/KG)
          reicht der Hauptvordruck.
        </Callout>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Teilseiten" className="hidden rounded-2xl border border-border bg-card p-3 shadow-card lg:sticky lg:top-20 lg:block lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <p className="px-2 pb-2 text-sm font-semibold">22 Teilseiten</p>
          <ol className="space-y-0.5">
            {TEILSEITEN.map((ts) => (
              <li key={ts.nr}>
                <a
                  href={`#teilseite-${ts.nr}`}
                  className="flex gap-2 rounded-lg px-2 py-1.5 text-xs leading-snug text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <span className="w-5 shrink-0 font-semibold text-accent-blue tabular">{ts.nr}</span>
                  <span className="min-w-0 [overflow-wrap:anywhere]">{ts.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-4">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="rounded-md bg-secondary px-1.5 py-0.5 font-mono font-semibold text-foreground">Z 12</span> ELSTER-Zeile
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" aria-hidden="true" /> im Co-Founder-Fall besonders wichtig
            </span>
          </p>
          {TEILSEITEN.map((ts) => (
            <section key={ts.nr} id={`teilseite-${ts.nr}`} className="scroll-mt-24 rounded-2xl border border-border bg-card shadow-card">
              <div className="flex items-start gap-3 border-b border-border/70 px-5 py-4 md:px-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-accent-blue tabular">
                  {ts.nr}
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold leading-snug tracking-tight">{ts.title}</h2>
                  {ts.intro && <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{ts.intro}</p>}
                </div>
              </div>
              <ul className="divide-y divide-border/60 px-5 md:px-6">
                {ts.fields.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 py-3">
                    <span
                      className={`mt-0.5 w-16 shrink-0 whitespace-nowrap rounded-md px-1.5 py-0.5 text-center font-mono text-[11px] font-semibold ${f.z ? "bg-secondary text-foreground" : "text-muted-foreground/50"}`}
                    >
                      {f.z ? `Z ${f.z}` : "·"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-snug">
                        {f.label}
                        {f.star && (
                          <Star className="ml-1.5 inline h-3.5 w-3.5 -translate-y-px fill-warning text-warning" aria-label="wichtig für Co-Founder" />
                        )}
                      </p>
                      {f.hint && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.hint}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <Callout tone="success" icon={FileText} title="Diese Anlagen brauchst du fast immer">
            Gesellschaftsvertrag (Teilseite 21), denn auch die GbR sollte einen schriftlichen Vertrag
            beifügen, dazu SEPA-Lastschriftmandat und bei StB-Betreuung die Vollmacht. Wenn eingetragen:
            Handelsregister- oder Gesellschaftsregisterauszug. Bei GmbH & Co. KG zusätzlich den
            Gesellschaftsvertrag der Komplementär-GmbH. Alles als PDF auf Teilseite 22 hochladen.
          </Callout>

          <ToolSection title="Passt dazu" icon={Link2}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                { to: "/cockpit/fse-wizard", l: "FsE Einzelunternehmen", d: "Wenn du allein startest" },
                { to: "/cockpit/fse-kapitalgesellschaft", l: "FsE Kapitalgesellschaft", d: "GmbH/UG statt PersG" },
                { to: "/wizard/rechtsform", l: "Rechtsform-Wizard", d: "GbR vs. UG vs. GmbH & Co. KG" },
                { to: "/cockpit/anlage-euer", l: "Anlage EÜR", d: "Gewinnermittlung, wenn EÜR gewählt" },
                { to: "/cockpit/ust-voranmeldung", l: "USt-Voranmeldung-Walkthrough", d: "Nach der Anmeldung" },
              ].map((x) => (
                <li key={x.to}>
                  <Link
                    to={x.to}
                    className="group flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:border-accent-blue/40"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{x.l}</span>
                      <span className="block text-xs text-muted-foreground">{x.d}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-blue" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </ToolSection>
        </div>
      </div>

      <Stand2026Footer
        sources={[
          { label: "ELSTER: Fragebogen zur steuerlichen Erfassung (alle Formulare)", url: "https://www.elster.de/eportal/formulare-leistungen/alleformulare" },
          { label: "Paragraf 179-180 AO (gesonderte und einheitliche Feststellung)", url: "https://www.gesetze-im-internet.de/ao_1977/__180.html" },
          { label: "Paragraf 20 UStG (Istversteuerung)", url: "https://www.gesetze-im-internet.de/ustg_1980/__20.html" },
        ]}
        note="Teilseiten + Zeilennummern gegen die echten ELSTER-Screencaptures des Formulars fsepersg-202401 verifiziert (durchgeklickt 2026-05-30). Bei dichten Teilseiten (USt, Lohnsteuer) sind nicht alle Einzel-Zeilennummern ausgewiesen. Reine Erklärhilfe - die verbindliche Eingabe erfolgt in ELSTER. Bei abweichender Gewinnverteilung, Sonderbetriebsvermögen und GmbH & Co. KG unbedingt Steuerberater. Keine Steuerberatung."
        stand="Stand 2026"
      />
    </CockpitShell>
  );
};

export default FsePersgWizard;
