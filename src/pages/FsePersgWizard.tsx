import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Star, Info, AlertTriangle, FileText } from "lucide-react";

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
  star?: boolean; // fuer Co-Founder / GbR/KG besonders relevant
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
      { z: "3-5", label: "Geschaeftsadresse (Strasse, Hausnummer, Adressergaenzung, PLZ, Ort) - Inland oder Ausland", hint: "Die ladungsfaehige Anschrift der Gesellschaft.", star: true },
      { z: "6", label: "Postfachadresse (optional)" },
      { z: "10", label: "Telefon (Vorwahl international / national / Rufnummer)" },
      { z: "11", label: "Internetadresse (Web)" },
      { z: "12", label: "Art der ausgeuebten Taetigkeit (genaue Bezeichnung des Gewerbezweigs)", hint: "Praezise beschreiben - das FA leitet daraus Steuerart und Gewerbeschluessel ab.", star: true },
    ],
  },
  {
    nr: 2,
    title: "Angaben zum Ort der Geschaeftsleitung",
    intro: "Nur ausfuellen, wenn der Ort der Geschaeftsleitung von der Geschaeftsadresse abweicht.",
    fields: [
      { z: "7-9", label: "Abweichende Adresse der Geschaeftsleitung (Inland oder Ausland)", hint: "Bestimmt die oertliche Zustaendigkeit des Finanzamts." },
    ],
  },
  {
    nr: 3,
    title: "Betriebstaetten",
    intro: "Bei mehr als zehn Betriebstaetten eine Aufstellung als Anhang (PDF) beifuegen.",
    fields: [
      { label: "Bezeichnung der Betriebstaette(n) (Tabelle, weitere hinzufuegbar)", hint: "Weitere Standorte neben der Hauptadresse - Lager, Filiale, Lohnsteuer-Betriebstaette." },
    ],
  },
  {
    nr: 4,
    title: "Gruendungsangaben",
    intro: "Bei einer Neugruendung ohne Vorgaenger bleiben Vorunternehmen/Vorinhaber leer.",
    fields: [
      { z: "25", label: "Gruendungsform + Gruendungsdatum", hint: "Neugruendung, Uebernahme, Umwandlung etc." },
      { z: "26-28", label: "Vorheriges Unternehmen (Firmenbezeichnung, Adresse, Land/Steuernummer/Finanzamt, USt-IdNr, Wirtschafts-IdNr)", hint: "Nur bei Uebernahme/Fortfuehrung eines bestehenden Betriebs." },
      { z: "29+", label: "Vorheriger Inhaber (Anrede/Titel, Name, Vorname, Adresse, Ordnungskriterium)", hint: "Nur bei Betriebsuebernahme von einer Person." },
    ],
  },
  {
    nr: 5,
    title: "Rechtsform und Beginn der Taetigkeit",
    fields: [
      { z: "31", label: "Rechtsform der Gesellschaft / Gemeinschaft (Auswahl)", hint: "GbR, OHG, KG, PartG, GmbH & Co. KG usw.", star: true },
      { z: "32", label: "Angabe der sonstigen Rechtsform (z. B. Partnerschaftsgesellschaft, ARGE)" },
      { z: "33", label: "Ist die Gesellschaft / Gemeinschaft vermoegensverwaltend? (Auswahl)", hint: "Rein vermoegensverwaltende GbR (z. B. Immobilien-GbR) hat andere Steuerfolgen als gewerbliche.", star: true },
      { z: "34", label: "Beginn der Taetigkeit (inkl. Vorbereitungshandlungen)", star: true },
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
    title: "Bankverbindung fuer Steuererstattungen / SEPA-Lastschriftverfahren",
    intro: "Das ausgefuellte SEPA-Lastschriftmandat zusaetzlich uebermitteln (Anhang).",
    fields: [
      { z: "40", label: "IBAN (inlaendisches Geldinstitut)", star: true },
      { z: "41", label: "IBAN (auslaendisches Geldinstitut)" },
      { z: "42", label: "BIC zur auslaendischen IBAN" },
      { z: "43", label: "Kontoinhaber(in) ist (Auswahl)" },
      { z: "44", label: "Gegebenenfalls abweichende(r) Kontoinhaber(in)" },
    ],
  },
  {
    nr: 8,
    title: "Vertretung der Gesellschaft / Gemeinschaft",
    fields: [
      { label: "Vertreter: Name / Firma (Tabelle, weitere hinzufuegbar)", hint: "Wer die Gesellschaft vertritt - bei GbR i. d. R. die Gesellschafter, bei KG die Komplementaere, bei GmbH & Co. KG die Komplementaer-GmbH.", star: true },
    ],
  },
  {
    nr: 9,
    title: "Steuerliche Beratung",
    intro: "Wenn ein Steuerberater die Gesellschaft betreut.",
    fields: [
      { z: "55", label: "Natuerliche Person: Anrede/Titel, Name, Vorname, Namensvorsatz/-zusatz" },
      { z: "57-61", label: "Adresse (Inland/Ausland), Postfach, Telefon der Beratung" },
      { z: "56", label: "Nicht natuerliche Person: Anrede, Firmenbezeichnung + Adresse", hint: "Bei Steuerberatungs-Gesellschaft statt Einzelperson." },
    ],
  },
  {
    nr: 10,
    title: "Empfangsbevollmaechtigte(r) fuer alle Steuerarten",
    fields: [
      { label: "Die angegebene steuerliche Beratung ist empfangsbevollmaechtigt (Ankreuzfeld)", hint: "Haken setzen, wenn der StB aus Teilseite 9 auch Bescheide empfangen soll." },
      { label: "Sonst: Empfangsbevollmaechtigte(r) separat (natuerlich/nicht natuerlich + Adresse)" },
      { label: "Nur bei nicht rechtsfaehigen Personenvereinigungen: gemeinsame(r) Empfangsbevollmaechtigte(r) nach Paragraf 183 AO", hint: "Wichtig fuer die GbR: eine Person buendelt den FA-Schriftverkehr fuer alle Gesellschafter.", star: true },
    ],
  },
  {
    nr: 11,
    title: "Konzernzugehoerigkeit",
    intro: "Nur wenn die Gesellschaft zu einem Konzern gehoert.",
    fields: [
      { z: "71", label: "Die Gesellschaft gehoert zu einem Konzern (Ankreuzfeld)" },
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
      { z: "77", label: "Voraussichtlicher Gewinn der Gesellschaft (Jahr der Betriebseroeffnung + Folgejahr, Euro)", hint: "Realistisch schaetzen - daraus leitet das FA Vorauszahlungen ab. Die ESt zahlt jeder Gesellschafter privat, die GewSt die Gesellschaft (Freibetrag 24.500 EUR).", star: true },
      { z: "78", label: "Art der Gewinnermittlung: EUER (Paragraf 4 Abs. 3) vs. Betriebsvermoegensvergleich/Bilanz (Paragraf 4 Abs. 1 / Paragraf 5)", hint: "GbR/PartG koennen meist EUER. OHG/KG (Handelsgewerbe) bilanzieren in der Regel.", star: true },
      { z: "79", label: "Liegt ein vom Kalenderjahr abweichendes Wirtschaftsjahr vor? + Beginn", hint: "Standard = Kalenderjahr. Abweichend meist nur bei OHG/KG mit FA-Zustimmung." },
    ],
  },
  {
    nr: 13,
    title: "Angaben zu den Beteiligten und zum voraussichtlichen Gewinnanteil",
    intro: "Der Kern der Personengesellschaft: Der Gewinn wird auf die Gesellschafter verteilt (gesonderte und einheitliche Feststellung) - jeder versteuert seinen Anteil in der privaten ESt. Die Nummer des Beteiligten bei spaeterer FA-Kommunikation beibehalten.",
    fields: [
      { label: "Beteiligte: Angaben zur Person + voraussichtlicher Gewinnanteil im Jahr der Betriebseroeffnung + im Folgejahr (Tabelle, weitere Beteiligte hinzufuegbar)", hint: "Je Beteiligten: Name/Anschrift, persoenliche Steuer-Identifikationsnummer und der prozentuale bzw. betragsmaessige Gewinnanteil laut Gesellschaftsvertrag.", star: true },
    ],
  },
  {
    nr: 14,
    title: "Freistellungsbescheinigung Paragraf 48b EStG (Bauabzugssteuer)",
    fields: [
      { z: "118", label: "Erteilung einer Freistellungsbescheinigung beantragen (Ankreuzfeld)", hint: "Nur fuer Bauleistungs-Erbringer relevant - vermeidet 15 %-Bauabzugssteuer-Einbehalt durch Auftraggeber." },
    ],
  },
  {
    nr: 15,
    title: "Anmeldung und Abfuehrung der Lohnsteuer",
    intro: "Nur wenn die Gesellschaft Arbeitnehmer beschaeftigt.",
    fields: [
      { z: "104", label: "Anzahl der Arbeitnehmer insgesamt", star: true },
      { z: "104", label: "davon Gesellschafter oder deren Ehegatten/Lebenspartner", hint: "Mitarbeitende Gesellschafter werden steuerlich anders behandelt (Sonderverguetung)." },
      { z: "104", label: "davon geringfuegig Beschaeftigte (2 %-Pauschsteuer Minijob-Zentrale)" },
      { label: "Beginn der Lohnzahlungen (Datum)" },
      { label: "Voraussichtliche Lohnsteuer im Kalenderjahr (Euro)", hint: "Bestimmt den Anmeldungszeitraum (monatlich/quartal/jaehrlich)." },
      { z: "104+", label: "Lohnsteuerliche Betriebstaette: Bezeichnung + Adresse" },
    ],
  },
  {
    nr: 16,
    title: "Anmeldung und Abfuehrung der Umsatzsteuer",
    intro: "Die zentrale USt-Seite - hier legst du Kleinunternehmer und Soll-/Istversteuerung fest.",
    fields: [
      { label: "Geschaeftsveraeusserung im Ganzen (Paragraf 1 Abs. 1a UStG)" },
      { label: "Summe der Umsaetze (Jahr der Betriebseroeffnung + Folgejahr, geschaetzt)", hint: "Grundlage fuer Kleinunternehmer-Pruefung und USt-VA-Rhythmus.", star: true },
      { label: "Kleinunternehmer-Regelung (Paragraf 19 UStG) in Anspruch nehmen / darauf verzichten", hint: "Bei vorsteuerlastigem Aufbau (Einkauf, Investitionen) lohnt oft der Verzicht. Sonst KU = keine USt, kein Vorsteuerabzug.", star: true },
      { label: "Soll- vs. Istversteuerung der Entgelte", hint: "Istversteuerung (USt erst bei Zahlungseingang) schont Liquiditaet - bis 800.000 EUR Vorjahresumsatz beantragbar.", star: true },
      { label: "Durchschnittssatzbesteuerung (Land-/Forstwirtschaft) / Soll- oder Istversteuerung der Entgelte" },
    ],
  },
  {
    nr: 17,
    title: "Umsatzsteuerliche Organschaft (Paragraf 2 Abs. 2 Nr. 2 UStG)",
    intro: "Nur bei umsatzsteuerlicher Organschaft. Bei mehr als 2 Verbindungen Aufstellung als Anhang beifuegen.",
    fields: [
      { label: "Die Gesellschaft ist Organtraeger folgender Organgesellschaft(en): Firmenname (Tabelle)", hint: "Relevant in Konzern-/Beteiligungsstrukturen - im Normalfall der Neugruendung leer." },
    ],
  },
  {
    nr: 18,
    title: "Umsatzsteuer-Identifikationsnummer und weitere Angaben zur Umsatzsteuer",
    fields: [
      { label: "USt-IdNr. wird benoetigt (innergemeinschaftlicher Waren-/Dienstleistungsverkehr und/oder Internet-Handel)", hint: "Brauchst du fuer EU-B2B (z. B. Meta/Google-Rechnungen aus IE, EU-Lieferanten) und Marktplatz-Handel.", star: true },
      { label: "Bereits frueher fuer eine Taetigkeit vergebene USt-IdNr. + Vergabedatum" },
      { label: "Steuerschuldnerschaft des Leistungsempfaengers bei Bau-/Gebaeudereinigungsleistungen (Paragraf 13b)" },
    ],
  },
  {
    nr: 19,
    title: "Besonderes Besteuerungsverfahren One-Stop-Shop (OSS)",
    intro: "Fuer grenzueberschreitende B2C-Umsaetze in der EU (Fernverkauf, digitale Leistungen).",
    fields: [
      { label: "Fuer im Inland ansaessige Unternehmer: OSS in Anspruch nehmen / Verzicht / direkt im EU-Staat versteuern", hint: "Relevant ab Ueberschreiten der 10.000-EUR-EU-Lieferschwelle - siehe USt-Rechner (OSS-Tab)." },
      { label: "Fuer in einem anderen EU-Mitgliedstaat ansaessige Unternehmer: entsprechende Optionen" },
    ],
  },
  {
    nr: 20,
    title: "Umsaetze im Bereich des Handels mit Waren ueber das Internet",
    intro: "Fuer E-Commerce-Nachweis gegenueber Marktplatz-Betreibern (Paragraf 25e UStG).",
    fields: [
      { z: "175", label: "Verkauf ueber einen eigenen Webshop (Ankreuzfeld)", star: true },
      { z: "176", label: "Web-Adresse (URL) des Shops" },
      { z: "178", label: "Handel ueber elektronische Schnittstelle(n) / Marktplatz (Paragraf 25e UStG)", hint: "Amazon, eBay, Etsy etc.", star: true },
      { label: "Elektronische Marktplaetze: Name der Schnittstelle + Identifikationsmerkmal (z. B. Account-Name)" },
    ],
  },
  {
    nr: 21,
    title: "Beigefuegte Unterlagen",
    intro: "Ankreuzen, was du mitschickst (Anhaenge auf Teilseite 22 hochladen).",
    fields: [
      { label: "Vertrag der Uebernahme / Einbringung / Umwandlung / Verschmelzung eines Unternehmens" },
      { label: "Vertrag der Gesellschaft / Gemeinschaft (Gesellschaftsvertrag)", hint: "Pflicht-Anlage - auch die GbR sollte einen schriftlichen Vertrag beifuegen.", star: true },
      { label: "Erklaerung ueber die gesellschaftsrechtlichen Vertretungen" },
      { label: "Vertraege zwischen Gesellschaft und Gesellschafter (Anstellungs-, Miet-, Pacht-, Darlehensvertraege)", hint: "Wichtig fuer die Anerkennung von Sonderverguetungen/Sonderbetriebsausgaben." },
      { label: "Gesellschaftsvertrag der Komplementaer-GmbH (bei GmbH & Co. KG)" },
      { label: "Vollmacht/Empfangsvollmacht steuerliche Beratung, SEPA-Teilnahmeerklaerung, weitere Unterlagen" },
    ],
  },
  {
    nr: 22,
    title: "Anhaenge",
    intro: "Datei-Upload (pdf, xml; max. 10 MB/Datei). Alle unter Teilseite 21 angekreuzten Dokumente hier hochladen, dann Alles pruefen und authentifiziert versenden.",
    fields: [
      { label: "Dateien hochladen (Bezeichnung + Datei auswaehlen)", star: true },
    ],
  },
];

const FsePersgWizard = () => {
  return (
    <CockpitShell
      eyebrow="Fragebogen zur steuerlichen Erfassung - Personengesellschaft"
      title="FsE Personengesellschaft / -gemeinschaft - Schritt fuer Schritt"
      subtitle="Walkthrough aller 22 Teilseiten des echten ELSTER-Formulars (fsepersg, Stand 2026) fuer die Gruendung einer GbR / OHG / KG / PartG / GmbH & Co. KG - in ELSTER-Reihenfolge, mit Zeilennummern und Erklaerung. Du fuellst direkt in ELSTER aus, diese Seite erklaert parallel. Mit Stern markiert: was im Co-Founder-Fall besonders zaehlt."
    >
      {/* Das Besondere an der PersG */}
      <div className="rounded-2xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-card p-5 mb-4">
        <div className="flex items-start gap-3">
          <Info className="h-6 w-6 text-accent-blue shrink-0 mt-0.5" />
          <div className="text-sm">
            <h3 className="font-bold mb-1">Das Besondere an der Personengesellschaft</h3>
            <p className="text-muted-foreground leading-relaxed">
              Die PersG (GbR/OHG/KG) zahlt selbst <strong>keine Einkommensteuer</strong>. Der Gewinn wird
              auf Gesellschaftsebene ermittelt und nach Quote auf die Beteiligten verteilt
              (<strong>gesonderte und einheitliche Feststellung</strong>, Teilseite 13) - jeder versteuert
              seinen Anteil in der privaten ESt. Gewerbesteuer faellt dagegen auf Gesellschaftsebene an
              (mit 24.500 EUR Freibetrag). Deshalb dreht sich der Fragebogen stark um die
              <strong> Beteiligten und ihre Gewinnanteile</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Anlagenauswahl-Hinweis */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-4 text-sm">
        <p className="text-muted-foreground">
          <strong className="text-foreground">Vor dem Start (Anlagenauswahl):</strong> ELSTER bietet
          neben dem Hauptvordruck <em>FSE PersG</em> optional die <strong>Anlage ARGE</strong> (Zusatzblatt
          fuer Arbeitsgemeinschaften) an - nur ankreuzen, wenn es eine ARGE ist. Im Normalfall (GbR/OHG/KG)
          reicht der Hauptvordruck.
        </p>
      </div>

      {/* Binding-critical Entscheidungen */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 mb-4 text-sm">
        <h3 className="font-bold mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-600" /> Die Entscheidungen, die wirklich zaehlen</h3>
        <ul className="space-y-1.5 text-muted-foreground">
          <li><strong>Gewinnanteile der Beteiligten (Teilseite 13):</strong> Gewinnanteil je Gesellschafter - muss zum Gesellschaftsvertrag passen. Jeder Beteiligte braucht seine persoenliche Steuer-ID.</li>
          <li><strong>Gewinnermittlung (Teilseite 12):</strong> EUER (einfacher) vs. Bilanz. GbR/PartG meist EUER, OHG/KG bilanzieren in der Regel.</li>
          <li><strong>Kleinunternehmer Paragraf 19 (Teilseite 16):</strong> Bei vorsteuerlastigem Aufbau oft Verzicht sinnvoll - sonst kein Vorsteuerabzug.</li>
          <li><strong>Istversteuerung (Teilseite 16):</strong> USt erst bei Zahlungseingang - schont Liquiditaet, bis 800.000 EUR Umsatz beantragbar.</li>
          <li><strong>USt-IdNr. (Teilseite 18):</strong> Ja, sobald EU-B2B oder Marktplatz-Handel.</li>
          <li><strong>Gemeinsame(r) Empfangsbevollmaechtigte(r) (Teilseite 10):</strong> bei der GbR praktisch Pflicht - eine Person buendelt den FA-Schriftverkehr.</li>
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
                      {f.star && <Star className="h-3 w-3 text-amber-500 shrink-0" aria-label="wichtig fuer Co-Founder" />}
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
          Gesellschaftsvertrag (Teilseite 21) - auch die GbR sollte einen schriftlichen Vertrag
          beifuegen -, SEPA-Lastschriftmandat und bei StB-Betreuung die Vollmacht. Wenn eingetragen:
          Handelsregister-/Gesellschaftsregisterauszug. Bei GmbH & Co. KG zusaetzlich den
          Gesellschaftsvertrag der Komplementaer-GmbH. Alles als PDF auf Teilseite 22 hochladen.
        </p>
      </div>

      {/* Cross-Links */}
      <div className="rounded-2xl border border-border bg-card p-5 mt-4 text-sm">
        <h3 className="font-bold mb-2">Passt dazu</h3>
        <ul className="space-y-1">
          <li><Link to="/cockpit/fse-wizard" className="text-accent-blue underline">FsE Einzelunternehmen (wenn du allein startest)</Link></li>
          <li><Link to="/cockpit/fse-kapitalgesellschaft" className="text-accent-blue underline">FsE Kapitalgesellschaft (GmbH/UG statt PersG)</Link></li>
          <li><Link to="/wizard/rechtsform" className="text-accent-blue underline">Rechtsform-Wizard (GbR vs. UG vs. GmbH & Co. KG)</Link></li>
          <li><Link to="/cockpit/anlage-euer" className="text-accent-blue underline">Anlage EUER (Gewinnermittlung, wenn EUER gewaehlt)</Link></li>
          <li><Link to="/cockpit/ust-voranmeldung" className="text-accent-blue underline">USt-Voranmeldung-Walkthrough (nach der Anmeldung)</Link></li>
        </ul>
      </div>

      <Stand2026Footer
        sources={[
          { label: "ELSTER: Fragebogen zur steuerlichen Erfassung (alle Formulare)", url: "https://www.elster.de/eportal/formulare-leistungen/alleformulare" },
          { label: "Paragraf 179-180 AO (gesonderte und einheitliche Feststellung)", url: "https://www.gesetze-im-internet.de/ao_1977/__180.html" },
          { label: "Paragraf 20 UStG (Istversteuerung)", url: "https://www.gesetze-im-internet.de/ustg_1980/__20.html" },
        ]}
        note="Teilseiten + Zeilennummern gegen die echten ELSTER-Screencaptures des Formulars fsepersg-202401 verifiziert (durchgeklickt 2026-05-30). Bei dichten Teilseiten (USt, Lohnsteuer) sind nicht alle Einzel-Zeilennummern ausgewiesen. Reine Erklaerhilfe - die verbindliche Eingabe erfolgt in ELSTER. Bei abweichender Gewinnverteilung, Sonderbetriebsvermoegen und GmbH & Co. KG unbedingt Steuerberater. Keine Steuerberatung."
        stand="Stand 2026"
      />
    </CockpitShell>
  );
};

export default FsePersgWizard;
