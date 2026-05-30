import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Star, Info, AlertTriangle, FileText } from "lucide-react";

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
  return (
    <CockpitShell
      eyebrow="Fragebogen zur steuerlichen Erfassung - Kapitalgesellschaft"
      title="FsE Kapitalgesellschaft / Genossenschaft - Schritt fuer Schritt"
      subtitle="Walkthrough aller 23 Teilseiten des echten ELSTER-Formulars (fsekapg, Stand 2026) fuer die Gruendung einer GmbH / UG / AG / eG - in ELSTER-Reihenfolge, mit Zeilennummern und Erklaerung. Du fuellst direkt in ELSTER aus, diese Seite erklaert parallel. Mit ⭐ markiert: was fuer GmbH-/UG-Gruender besonders zaehlt."
    >
      {/* Hinweis-Box */}
      <div className="rounded-2xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-card p-5 mb-4">
        <div className="flex items-start gap-3">
          <Info className="h-6 w-6 text-accent-blue shrink-0 mt-0.5" />
          <div className="text-sm">
            <h3 className="font-bold mb-1">Vorab: das ist der FsE NACH dem Notar</h3>
            <p className="text-muted-foreground leading-relaxed">
              Die Reihenfolge bei der GmbH/UG: <strong>1.</strong> Notarieller Gesellschaftsvertrag,
              <strong> 2.</strong> Geschaeftskonto + Stammkapital einzahlen, <strong>3.</strong> Eintragung
              ins Handelsregister (HRB), <strong>4.</strong> dieser Fragebogen zur steuerlichen Erfassung.
              Du brauchst also Notarvertrag, HRB-Nummer (falls schon da) und die Gesellschafter-/GF-Daten griffbereit.
            </p>
            <p className="mt-2 text-muted-foreground">
              Abgabe nur authentifiziert ueber ELSTER. Das FA vergibt danach die Steuernummer und
              (auf Wunsch, Teilseite 18) die USt-IdNr.
            </p>
          </div>
        </div>
      </div>

      {/* Binding-critical Entscheidungen */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 mb-4 text-sm">
        <h3 className="font-bold mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-600" /> Die 4 Entscheidungen, die wirklich zaehlen</h3>
        <ul className="space-y-1.5 text-muted-foreground">
          <li><strong>Istversteuerung (Teilseite 17):</strong> USt erst bei Zahlungseingang abfuehren statt bei Rechnungsstellung. Bis 800.000 EUR Vorjahresumsatz beantragbar, schont Liquiditaet - fast immer Ja.</li>
          <li><strong>Kleinunternehmer Paragraf 19 (Teilseite 17):</strong> Fuer eine operative GmbH mit Einkauf/Aufbau meist NEIN - du willst den Vorsteuerabzug. Regelbesteuerung ist der Normalfall.</li>
          <li><strong>USt-IdNr. (Teilseite 18):</strong> Ja, sobald du EU-B2B kaufst/verkaufst (Meta-/Google-Ads aus IE, EU-Lieferanten, OSS).</li>
          <li><strong>Vorauszahlungen (Teilseite 15):</strong> Gewinn realistisch schaetzen - zu hoch = Liquiditaet gebunden, zu niedrig = Nachzahlung + angepasste Vorauszahlung.</li>
        </ul>
      </div>

      {/* Teilseiten */}
      <div className="space-y-4">
        {TEILSEITEN.map((ts) => (
          <div key={ts.nr} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xs font-bold text-accent-blue shrink-0 w-6">{ts.nr}</span>
              <h2 className="text-base font-bold">{ts.title}</h2>
            </div>
            {ts.intro && <p className="text-xs text-muted-foreground mb-2 ml-8">{ts.intro}</p>}
            <div className="space-y-0 ml-8">
              {ts.fields.map((f, i) => (
                <div key={i} className="border-t border-border/60 py-2 flex items-start gap-3">
                  {f.z ? (
                    <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-[10px] font-mono font-semibold mt-0.5">Z {f.z}</span>
                  ) : (
                    <span className="shrink-0 w-[34px]" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium flex items-center gap-1.5">
                      {f.label}
                      {f.star && <Star className="h-3 w-3 text-amber-500 shrink-0" aria-label="wichtig fuer GmbH/UG" />}
                    </div>
                    {f.hint && <div className="text-xs text-muted-foreground mt-0.5">{f.hint}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pflicht-Anlagen */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 mt-4 text-sm">
        <h3 className="font-bold mb-1 flex items-center gap-2"><FileText className="h-4 w-4 text-emerald-700" /> Diese Anlagen brauchst du fast immer</h3>
        <p className="text-muted-foreground">
          Gesellschaftsvertrag/Satzung (Teilseite 22, Z227), SEPA-Lastschriftmandat (Z226), bei StB-Betreuung
          Vollmacht (Z224) - und alles als PDF auf Teilseite 23 hochladen. Bei Sachgruendung zusaetzlich
          Sachgruendungsbericht (Z230), bei Organschaft Gewinnabfuehrungsvertrag (Z234).
        </p>
      </div>

      {/* Cross-Links */}
      <div className="rounded-2xl border border-border bg-card p-5 mt-4 text-sm">
        <h3 className="font-bold mb-2">Passt dazu</h3>
        <ul className="space-y-1">
          <li><Link to="/cockpit/fse-wizard" className="text-accent-blue underline">FsE Einzelunternehmen (wenn du doch ohne Kapitalgesellschaft startest)</Link></li>
          <li><Link to="/wizard/rechtsform" className="text-accent-blue underline">Rechtsform-Wizard (Einzelunternehmen vs. UG vs. GmbH vs. Holding)</Link></li>
          <li><Link to="/cockpit/ust-voranmeldung" className="text-accent-blue underline">USt-Voranmeldung-Walkthrough (nach der Anmeldung)</Link></li>
          <li><Link to="/cockpit/salary-dividende" className="text-accent-blue underline">Salary-vs-Dividende-Optimizer (GF-Gehalt vs. Ausschuettung)</Link></li>
          <li><Link to="/cockpit/buchhaltungssoftware-guide" className="text-accent-blue underline">Buchhaltungssoftware-Guide (GmbH braucht Bilanz - StB/Software-Frage)</Link></li>
        </ul>
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
