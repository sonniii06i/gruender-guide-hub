import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Star, Info, AlertTriangle, FileText, ArrowRight } from "lucide-react";
import { Callout, ToolSection } from "@/components/cockpit/kit";

/**
 * Read-only Walkthrough des ELSTER-Formulars
 * "Fragebogen zur steuerlichen Erfassung - Gruendung einer Kapitalgesellschaft
 * bzw. Genossenschaft" (fsekapg-202401).
 * Teilseiten + Zeilennummern 1:1 gegen die echten ELSTER-Screencaptures
 * (durchgeklickt 2026-05-30) verifiziert. Du fuellst direkt in ELSTER aus,
 * diese Seite liest parallel.
 */

interface Field {
  z?: string; // ELSTER-Zeile
  label: string;
  hint?: string;
  star?: boolean; // fuer GmbH/UG-Gruender besonders relevant
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
    title: "Allgemeine Angaben",
    fields: [
      { z: "2", label: "Name (Firma laut Handels- bzw. Genossenschaftsregister)", hint: "Exakt wie im Register eingetragen, inkl. Rechtsformzusatz (z. B. GmbH, UG (haftungsbeschraenkt)).", star: true },
      { z: "3", label: "Ort des Sitzes der Kapitalgesellschaft" },
      { z: "4-6", label: "Geschaeftsadresse (Strasse, Hausnummer, Adressergaenzung, PLZ, Ort)", hint: "Inland oder Ausland. Das ist die ladungsfaehige Anschrift.", star: true },
      { z: "7", label: "Postfachadresse (optional)" },
      { label: "Telefon (Vorwahl international / national / Rufnummer)" },
      { z: "12", label: "Internetadresse (Web)" },
      { z: "13", label: "Art der ausgeuebten Taetigkeiten (genaue Bezeichnung des Gewerbezweigs)", hint: "Praezise beschreiben - das FA leitet daraus Steuerart, Vorauszahlungen und ggf. Gewerbeschluessel ab.", star: true },
      { z: "14", label: "Die Gesellschaft ist ausschliesslich vermoegensverwaltend taetig (Ankreuzfeld)", hint: "Nur ankreuzen, wenn rein vermoegensverwaltend (dann keine USt-Anmeldung/-Abfuehrung). Operative GmbH: leer lassen." },
    ],
  },
  {
    nr: 2,
    title: "Angaben zum Ort der Geschaeftsleitung",
    intro: "Nur ausfuellen, wenn der Ort der Geschaeftsleitung vom Sitz abweicht.",
    fields: [
      { z: "8-10", label: "Abweichende Adresse der Geschaeftsleitung (Inland oder Ausland)", hint: "Relevant fuer die oertliche Zustaendigkeit des Finanzamts (Geschaeftsleitung schlaegt Sitz)." },
    ],
  },
  {
    nr: 3,
    title: "Betriebstaetten",
    intro: "Bei mehr als zehn Betriebstaetten eine Aufstellung als Anhang (PDF) beifuegen.",
    fields: [
      { label: "Bezeichnung der Betriebstaette(n) (Tabelle, weitere hinzufuegbar)", hint: "Weitere Standorte neben dem Sitz - z. B. Lager, Filiale, Lohnsteuer-Betriebstaette." },
    ],
  },
  {
    nr: 4,
    title: "Gesetzlicher Vertreter (Geschaeftsfuehrer/-in, Vorstand)",
    fields: [
      { label: "Name + Vorname je Vertreter (Tabelle, weitere hinzufuegbar)", hint: "Alle bestellten Geschaeftsfuehrer (GmbH/UG) bzw. Vorstaende (Genossenschaft/AG) eintragen.", star: true },
    ],
  },
  {
    nr: 5,
    title: "Steuerliche Beratung",
    intro: "Wenn ein Steuerberater die Gesellschaft betreut.",
    fields: [
      { z: "24-29", label: "Natuerliche Person: Anrede/Titel, Name, Vorname + Adresse/Postfach/Telefon" },
      { z: "30+", label: "Nicht natuerliche Person: Anrede, Firmenbezeichnung + Adresse", hint: "Bei Steuerberatungs-Gesellschaft (z. B. StB-GmbH) statt Einzelperson." },
    ],
  },
  {
    nr: 6,
    title: "Empfangsbevollmaechtigte(r) fuer alle Steuerarten",
    fields: [
      { label: "Die angegebene steuerliche Beratung ist empfangsbevollmaechtigt (Ankreuzfeld)", hint: "Haken setzen, wenn der StB aus Teilseite 5 auch Bescheide etc. empfangen soll." },
      { z: "41-48", label: "Sonst: Empfangsbevollmaechtigte(r) separat erfassen (natuerlich/nicht natuerlich + Adresse)" },
    ],
  },
  {
    nr: 7,
    title: "Bankverbindung fuer Steuererstattungen / SEPA-Lastschriftverfahren",
    intro: "Das ausgefuellte SEPA-Lastschriftmandat zusaetzlich uebermitteln (Anhang).",
    fields: [
      { z: "49", label: "IBAN (inlaendisches Geldinstitut)", star: true },
      { z: "50", label: "IBAN (auslaendisches Geldinstitut)" },
      { z: "51", label: "BIC zur auslaendischen IBAN" },
      { z: "52", label: "Kontoinhaber ist (Auswahl)" },
      { z: "53", label: "Name des abweichenden Kontoinhabers" },
    ],
  },
  {
    nr: 8,
    title: "Gesellschaftsvertrag / Satzung und Eintragung in das Handels-/Genossenschaftsregister",
    intro: "Den Gesellschaftsvertrag / die Satzung beifuegen.",
    fields: [
      { z: "54", label: "Errichtung durch notariellen Vertrag / Protokoll (Datum)", hint: "Bei 1-Personen-/Muster-Gruendung: Protokoll im Sinne des Paragraf 2 Abs. 1a GmbHG.", star: true },
      { z: "55", label: "Antrag beim Handelsregister gestellt + Datum / Eintragung erfolgt", star: true },
      { z: "56", label: "Tag der Eintragung + Ort des Amtsgerichts" },
      { z: "57", label: "Register (Auswahl HRB etc.) + Registernummer", hint: "GmbH/UG = HRB. Nach Eintragung trägst du hier die HRB-Nummer ein.", star: true },
      { z: "57-62", label: "Gruendungsnotar: Anrede/Titel, Name, Vorname + Adresse/Postfach" },
      { z: "63", label: "Rechtsform der Gesellschaft (Auswahl)", hint: "GmbH, UG (haftungsbeschraenkt), AG, eG usw.", star: true },
    ],
  },
  {
    nr: 9,
    title: "Beginn der Taetigkeit, Wirtschaftsjahr, Hoehe Grund-/Stammkapital",
    fields: [
      { z: "64", label: "Beginn der Taetigkeit (Datum)", star: true },
      { z: "65", label: "Abweichendes Wirtschaftsjahr? + ggf. Beginn", hint: "Standard = Kalenderjahr. Abweichend nur mit Grund (und FA-Zustimmung) - meist Kalenderjahr lassen." },
      { z: "66", label: "Hoehe des Grund-/Stammkapitals (Euro)", hint: "GmbH = 25.000 EUR, UG = ab 1 EUR. Laut Gesellschaftsvertrag.", star: true },
      { z: "67", label: "Darauf sind eingezahlt (Euro)", hint: "GmbH-Bargruendung: mind. die Haelfte (12.500 EUR) muss eingezahlt sein. UG: voll einzuzahlen.", star: true },
    ],
  },
  {
    nr: 10,
    title: "Angaben zu den Anteilseignern",
    fields: [
      { label: "Anteilseigner: Name / Firma / Hoehe der Beteiligung in Prozent (Tabelle)", hint: "Alle Gesellschafter mit ihrer Quote.", star: true },
      { z: "67a", label: "Summe der Beteiligungen aller Anteilseigner in Prozent", hint: "Muss 100 % ergeben." },
      { z: "90", label: "Liegen Treuhandverhaeltnisse vor? (bei Ja: Vertrag gesondert uebermitteln)" },
    ],
  },
  {
    nr: 11,
    title: "Angaben zur Gruendung (Bar- oder Sachgruendung)",
    intro: "Bei reiner Bargruendung weitgehend leer. Die umfangreichen Felder betreffen Sachgruendung / Umwandlung / Einbringung.",
    fields: [
      { label: "Bei Bargruendung: ggf. Einbringung Betrieb/Teilbetrieb/Mitunternehmeranteil (Paragraf 20 UmwStG) oder qualifizierter Anteilstausch (Paragraf 21 UmwStG)" },
      { label: "Bei Sachgruendung: eingebrachte Wirtschaftsgueter, Umwandlung (Verschmelzung/Spaltung/Formwechsel), Buch-/Zwischen-/gemeiner Wert", hint: "Hier wird es steuerlich heikel (Buchwertfortfuehrung vs. Aufdeckung stiller Reserven). Bei Sachgruendung/Umwandlung dringend StB.", star: true },
    ],
  },
  {
    nr: 12,
    title: "Betriebsaufspaltung",
    intro: "Nur wenn die Gesellschaft Betriebsgesellschaft im Rahmen einer Betriebsaufspaltung ist.",
    fields: [
      { z: "127", label: "Es handelt sich um die Betriebsgesellschaft (Ankreuzfeld)" },
      { z: "128-130", label: "Besitzunternehmen: Bezeichnung, Land, Steuernummer, Finanzamt, USt-IdNr, Wirtschafts-IdNr" },
      { z: "133-135", label: "Ueberlassene wesentliche Betriebsgrundlagen: Bezeichnung, Datum Miet-/Pachtvertrag, Beginn der Nutzung" },
    ],
  },
  {
    nr: 13,
    title: "Zusatzangaben zur Gesellschaft oder Genossenschaft",
    fields: [
      { z: "137-140", label: "Komplementaerin einer KG? + Bezeichnung der KG, Land, Steuernummer, Finanzamt, Wirtschafts-IdNr", hint: "Relevant bei GmbH & Co. KG-Konstrukten." },
      { z: "141-143", label: "Atypisch stille Beteiligung an der Gesellschaft? + Angaben (bei Ja: Vertrag beifuegen)" },
    ],
  },
  {
    nr: 14,
    title: "Angaben zu Organschaftsverhaeltnissen",
    intro: "Nur bei Konzern-/Organschaftsstrukturen relevant.",
    fields: [
      { z: "144-146", label: "Gesellschaft ist Organtraeger? (koerperschaft-/gewerbe-/umsatzsteuerlich)" },
      { label: "Organgesellschaft: Angaben zum Organtraeger (Gewinnabfuehrungsvertrag beifuegen)" },
      { z: "150-152", label: "Konzernzugehoerigkeit: Name, Land, Steuernummer, Finanzamt, Wirtschafts-IdNr" },
      { label: "Befreiung von der Koerperschaftsteuer (z. B. Paragraf 5 Abs. 1 Nr. 9 KStG - gemeinnuetzig)", hint: "Nur fuer gemeinnuetzige/steuerbefreite Koerperschaften." },
    ],
  },
  {
    nr: 15,
    title: "Festsetzung von Vorauszahlungen (Koerperschaftsteuer, Gewerbesteuer)",
    intro: "Schaetzwerte je Spalte: fuer das Gruendungsjahr und fuer das Folgejahr.",
    fields: [
      { z: "165", label: "Jahresueberschuss / Steuerbilanzgewinn (Euro)", hint: "Realistisch schaetzen - daraus berechnet das FA deine KSt-/GewSt-Vorauszahlungen.", star: true },
      { z: "166", label: "Zu versteuerndes Einkommen (Euro)" },
      { z: "167", label: "Steueranrechnungsbetraege (Euro)" },
      { z: "168", label: "Gewerbeertrag (Euro)" },
    ],
  },
  {
    nr: 16,
    title: "Anmeldung und Abfuehrung der Lohnsteuer",
    intro: "Nur wenn die Gesellschaft Arbeitnehmer beschaeftigt (Geschaeftsfuehrer-Gehalt zaehlt dazu!).",
    fields: [
      { z: "169", label: "Anzahl der Arbeitnehmer insgesamt", hint: "Ein angestellter Gesellschafter-Geschaeftsfuehrer ist auch Arbeitnehmer.", star: true },
      { z: "170", label: "davon Gesellschafter oder deren Ehegatten" },
      { z: "171", label: "davon geringfuegig Beschaeftigte (2 %-Pauschsteuer Minijob-Zentrale)" },
      { z: "172", label: "Beginn der Lohnzahlungen (Datum)" },
      { z: "173", label: "Voraussichtliche Lohnsteuer im Kalenderjahr (Euro)", hint: "Bestimmt den Anmeldungszeitraum (monatlich/quartal/jaehrlich)." },
      { z: "174-177", label: "Lohnsteuerliche Betriebstaette: Bezeichnung + Adresse" },
    ],
  },
  {
    nr: 17,
    title: "Anmeldung und Abfuehrung der Umsatzsteuer",
    intro: "Die zentrale USt-Seite - hier legst du Soll-/Istversteuerung und ggf. Kleinunternehmer fest.",
    fields: [
      { label: "Geschaeftsveraeusserung im Ganzen (Paragraf 1 Abs. 1a UStG)" },
      { label: "Summe der Umsaetze (Gruendungs-/Folgejahr, geschaetzt)", hint: "Grundlage fuer Kleinunternehmer-Pruefung und USt-VA-Rhythmus.", star: true },
      { label: "Kleinunternehmer-Regelung (Paragraf 19 UStG) in Anspruch nehmen?", hint: "Fuer eine operative GmbH mit Vorsteuern aus Einkauf/Aufbau meist NICHT sinnvoll (kein Vorsteuerabzug). Regelbesteuerung ist der Normalfall.", star: true },
      { label: "Sollversteuerung vs. Istversteuerung der Entgelte", hint: "Istversteuerung (USt erst bei Zahlungseingang) schont Liquiditaet - beantragbar bis 800.000 EUR Vorjahresumsatz. Fast immer vorteilhaft.", star: true },
      { label: "Durchschnittssatzbesteuerung (Land-/Forstwirtschaft)" },
    ],
  },
  {
    nr: 18,
    title: "Umsatzsteuer-Identifikationsnummer (USt-IdNr.)",
    fields: [
      { z: "197", label: "USt-IdNr. wird benoetigt (Ankreuzfeld)", hint: "Brauchst du fuer innergemeinschaftlichen B2B-Waren-/Dienstleistungsverkehr (EU-Einkauf/-Verkauf, z. B. Meta/Google-Rechnungen, EU-Lieferanten).", star: true },
      { z: "198", label: "Zusatzangaben fuer juristische Personen: USt-IdNr. wird beantragt, weil ... (Auswahl)" },
      { z: "199", label: "Bereits frueher vergebene USt-IdNr. + Vergabedatum" },
      { z: "200-202", label: "Steuerschuldnerschaft bei Bau-/Gebaeudereinigungsleistungen (Paragraf 13b)" },
    ],
  },
  {
    nr: 19,
    title: "Besonderes Besteuerungsverfahren One-Stop-Shop (OSS)",
    intro: "Fuer grenzueberschreitende B2C-Umsaetze in der EU (Fernverkauf, digitale Leistungen).",
    fields: [
      { z: "203-208", label: "Fuer im Inland ansaessige Unternehmer: OSS in Anspruch nehmen / Verzicht / direkt im EU-Staat versteuern" },
      { z: "210-214", label: "Fuer in anderem EU-Staat ansaessige Unternehmer: entsprechende Optionen", hint: "Relevant ab Ueberschreiten der 10.000-EUR-EU-Lieferschwelle - siehe USt-Rechner (OSS-Tab)." },
    ],
  },
  {
    nr: 20,
    title: "Umsaetze im Bereich des Handels mit Waren ueber das Internet",
    intro: "Fuer E-Commerce-Nachweis gegenueber Marktplatz-Betreibern (Paragraf 25e UStG).",
    fields: [
      { z: "215", label: "Verkauf ueber einen eigenen Webshop (Ankreuzfeld)", star: true },
      { z: "216", label: "Web-Adresse (URL) des Shops" },
      { z: "217", label: "Verkauf ueber elektronische Schnittstelle(n) / Marktplatz (Paragraf 25e UStG)", hint: "Amazon, eBay, Etsy etc.", star: true },
      { z: "218", label: "Elektronische Marktplaetze: Name der Schnittstelle + Identifikationsmerkmal (z. B. Account-Name)" },
    ],
  },
  {
    nr: 21,
    title: "Freistellungsbescheinigung Paragraf 48b EStG (Bauabzugssteuer)",
    fields: [
      { z: "223", label: "Erteilung einer Freistellungsbescheinigung beantragen (Ankreuzfeld)", hint: "Nur fuer Bauleistungs-Erbringer relevant - vermeidet 15 %-Bauabzugssteuer-Einbehalt durch Auftraggeber." },
    ],
  },
  {
    nr: 22,
    title: "Beigefuegte Unterlagen",
    intro: "Ankreuzen, was du mitschickst (Anhaenge auf Teilseite 23 hochladen).",
    fields: [
      { z: "224-226", label: "Vollmacht steuerliche Beratung / Empfangsvollmacht / SEPA-Teilnahmeerklaerung" },
      { z: "227", label: "Gesellschaftsvertrag / Satzung", hint: "Pflicht-Anlage bei der Gruendung.", star: true },
      { z: "228-229", label: "Vertraege Gesellschaft/Gesellschafter (Anstellung, Miete, Darlehen) / Treuhandvertrag" },
      { z: "230-232", label: "Sachgruendungsbericht / Umwandlungsbeschluss / Vertrag atypisch stille Beteiligung" },
      { z: "233-234", label: "Liste der Organgesellschaften / Gewinnabfuehrungsvertrag" },
      { z: "235-236", label: "Weitere Unterlagen (auflisten)" },
    ],
  },
  {
    nr: 23,
    title: "Anhaenge",
    intro: "Datei-Upload (pdf, xml; max. 10 MB/Datei). Alle unter Teilseite 22 angekreuzten Dokumente hier hochladen, dann Alles pruefen und authentifiziert versenden.",
    fields: [
      { label: "Dateien hochladen (Bezeichnung + Datei auswaehlen)", star: true },
    ],
  },
];

const FseKapgWizard = () => {
  const wichtigGesamt = TEILSEITEN.reduce((n, ts) => n + ts.fields.filter((f) => f.star).length, 0);
  return (
    <CockpitShell
      eyebrow="Fragebogen zur steuerlichen Erfassung: Kapitalgesellschaft"
      title="FsE Kapitalgesellschaft / Genossenschaft Schritt für Schritt"
      subtitle={
        <>
          Walkthrough aller 23 Teilseiten des echten ELSTER-Formulars (fsekapg, Stand 2026) für die Gründung einer GmbH, UG, AG
          oder eG: in ELSTER-Reihenfolge, mit Zeilennummern und Erklärung. Du füllst direkt in ELSTER aus, diese Seite erklärt
          parallel. Mit <Star className="inline h-3.5 w-3.5 -translate-y-px fill-warning text-warning" aria-label="Stern" /> markiert:
          was für GmbH- und UG-Gründer besonders zählt.
        </>
      }
    >
      <div className="mb-6 grid gap-4 break-words [hyphens:auto] lg:grid-cols-2">
        <Callout tone="info" title="Vorab: Das ist der FsE nach dem Notar">
          <p>
            Die Reihenfolge bei der GmbH/UG: <strong>1.</strong> notarieller Gesellschaftsvertrag, <strong>2.</strong> Geschäftskonto
            und Stammkapital einzahlen, <strong>3.</strong> Eintragung ins Handelsregister (HRB), <strong>4.</strong> dieser Fragebogen
            zur steuerlichen Erfassung. Halte Notarvertrag, HRB-Nummer (falls schon da) und die Gesellschafter- und GF-Daten bereit.
          </p>
          <p className="mt-2">
            Abgabe nur authentifiziert über ELSTER. Das Finanzamt vergibt danach die Steuernummer und (auf Wunsch, Teilseite 18) die
            USt-IdNr.
          </p>
        </Callout>
        <Callout tone="warning" title="Die 4 Entscheidungen, die wirklich zählen" icon={AlertTriangle}>
          <ul className="space-y-1.5">
            <li>
              <strong>Istversteuerung (Teilseite 17):</strong> USt erst bei Zahlungseingang abführen statt bei Rechnungsstellung. Bis
              800.000 € Vorjahresumsatz beantragbar, schont die Liquidität: fast immer Ja.
            </li>
            <li>
              <strong>Kleinunternehmer § 19 (Teilseite 17):</strong> Für eine operative GmbH mit Einkauf und Aufbau meist NEIN, du willst
              den Vorsteuerabzug. Regelbesteuerung ist der Normalfall.
            </li>
            <li>
              <strong>USt-IdNr. (Teilseite 18):</strong> Ja, sobald du EU-B2B kaufst oder verkaufst (Meta- und Google-Ads aus IE,
              EU-Lieferanten, OSS).
            </li>
            <li>
              <strong>Vorauszahlungen (Teilseite 15):</strong> Gewinn realistisch schätzen. Zu hoch bindet Liquidität, zu niedrig führt
              zu Nachzahlung und angepasster Vorauszahlung.
            </li>
          </ul>
        </Callout>
      </div>

      <div className="grid items-start gap-6 break-words [hyphens:auto] lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Teilseiten" className="hidden [hyphens:manual] rounded-2xl border border-border bg-card p-3 shadow-card lg:sticky lg:top-20 lg:block">
          <p className="px-2 pb-2 pt-1 text-sm font-semibold">23 Teilseiten</p>
          <ol className="max-h-[70vh] space-y-0.5 overflow-y-auto pr-1 text-sm">
            {TEILSEITEN.map((ts) => (
              <li key={ts.nr}>
                <a
                  href={`#teilseite-${ts.nr}`}
                  className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <span className="w-5 shrink-0 text-xs font-semibold text-accent-blue tabular">{ts.nr}</span>
                  <span className="line-clamp-2 leading-snug">{ts.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground tabular">{wichtigGesamt}</span> Felder sind für GmbH- und UG-Gründer besonders
            wichtig.
          </p>
          {TEILSEITEN.map((ts) => (
            <section
              key={ts.nr}
              id={`teilseite-${ts.nr}`}
              className="scroll-mt-24 rounded-2xl border border-border bg-card shadow-card"
            >
              <div className="flex items-start gap-3 border-b border-border/70 px-5 py-4 md:px-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-accent-blue tabular">
                  {ts.nr}
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold leading-snug tracking-tight">{ts.title}</h2>
                  {ts.intro && <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{ts.intro}</p>}
                </div>
              </div>
              <ul className="divide-y divide-border/70 px-5 md:px-6">
                {ts.fields.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 py-3">
                    <span className="mt-0.5 w-14 shrink-0 sm:w-16">
                      {f.z && (
                        <span className="inline-block rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[11px] font-semibold text-foreground/80">
                          Z {f.z}
                        </span>
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">
                        {f.label}
                        {f.star && (
                          <Star
                            className="ml-1.5 inline h-3.5 w-3.5 -translate-y-px fill-warning text-warning"
                            aria-label="wichtig für GmbH/UG"
                          />
                        )}
                      </div>
                      {f.hint && <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{f.hint}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <Callout tone="success" title="Diese Anlagen brauchst du fast immer" icon={FileText}>
            Gesellschaftsvertrag/Satzung (Teilseite 22, Z 227), SEPA-Lastschriftmandat (Z 226), bei Betreuung durch Steuerberatung die
            Vollmacht (Z 224). Alles als PDF auf Teilseite 23 hochladen. Bei Sachgründung zusätzlich den Sachgründungsbericht (Z 230),
            bei Organschaft den Gewinnabführungsvertrag (Z 234).
          </Callout>

          <ToolSection title="Passt dazu" icon={Info}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                { to: "/cockpit/fse-wizard", t: "FsE Einzelunternehmen", s: "Wenn du doch ohne Kapitalgesellschaft startest" },
                { to: "/wizard/rechtsform", t: "Rechtsform-Wizard", s: "Einzelunternehmen, UG, GmbH oder Holding" },
                { to: "/cockpit/ust-voranmeldung", t: "USt-Voranmeldung-Walkthrough", s: "Nach der Anmeldung" },
                { to: "/cockpit/salary-dividende", t: "Salary-vs-Dividende-Optimizer", s: "GF-Gehalt oder Ausschüttung" },
                { to: "/cockpit/buchhaltungssoftware-guide", t: "Buchhaltungssoftware-Guide", s: "Die GmbH braucht eine Bilanz" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group flex items-start justify-between gap-3 rounded-xl border border-border p-3.5 transition-colors hover:border-accent-blue/40"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{l.t}</span>
                      <span className="block text-xs text-muted-foreground">{l.s}</span>
                    </span>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
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
          { label: "Paragraf 137-139 AO (Anzeigepflicht / steuerliche Erfassung)", url: "https://www.gesetze-im-internet.de/ao_1977/__137.html" },
          { label: "Paragraf 20 UStG (Istversteuerung)", url: "https://www.gesetze-im-internet.de/ustg_1980/__20.html" },
        ]}
        note="Teilseiten + Zeilennummern 1:1 gegen die echten ELSTER-Screencaptures des Formulars fsekapg-202401 verifiziert (durchgeklickt 2026-05-30). Reine Erklaerhilfe - die verbindliche Eingabe erfolgt in ELSTER. Bei Sach-/Umwandlungsgruendung und Organschaft unbedingt Steuerberater. Keine Steuerberatung."
        stand="Stand 2026"
      />
    </CockpitShell>
  );
};

export default FseKapgWizard;
