/**
 * FseWizard — "Fragebogen zur steuerlichen Erfassung (FsE) — Erklär-Begleiter"
 *
 * Read-only Walkthrough. Listet alle FsE-Felder in der ELSTER-Reihenfolge
 * mit Erklärung. KEIN Eingabe-Tool — der User füllt direkt in ELSTER aus
 * und liest hier parallel was bei jedem Feld zu beachten ist.
 *
 * Für die 4 binding-critical Entscheidungen (KU §19, EÜR vs Bilanz,
 * Soll vs Ist, USt-IdNr) gibt's Mini-Rückfrage-Widgets die in 1-2
 * Klicks eine personalisierte Empfehlung ausspucken.
 *
 * Feld-Nummerierung folgt der Struktur des ELSTER-FsE für natürliche
 * Personen (Einzelunternehmer / Freiberufler), Stand 2026.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import {
  Lightbulb,
  ExternalLink,
  Info,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

const FseWizard = () => {
  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Fragebogen zur steuerlichen Erfassung (FsE) — Erklär-Begleiter"
      subtitle="Jedes Feld des ELSTER-FsE in der Reihenfolge wie es abgefragt wird, mit Erklärung was zu beantworten ist + Empfehlungs-Widgets für die 4 verbindlichen Entscheidungen (KU §19, EÜR/Bilanz, Soll/Ist, USt-IdNr). Du füllst direkt in ELSTER aus — diese Seite liest parallel mit."
    >
      <HeroBlock />
      <ElsterLinks />

      {/* Hauptteil: Sektionen mit nummerierten Feldern */}
      <Section
        nr="A"
        title="Allgemeine Angaben"
        intro="Wer bist du, wo wohnst du, wie kontaktiert das FA dich."
      >
        <Field nr={1} label="Steuernummer">
          Falls du <strong>schon eine Steuernummer</strong> beim Wohnsitz-Finanzamt hast (z.B. aus Arbeitnehmer-Veranlagung), gib sie hier ein. Sonst leer lassen — die neue Nummer kommt nach FsE-Abgabe per Post.
        </Field>
        <Field nr={2} label="Steueridentifikationsnummer (IDNr)">
          <strong>11-stellig</strong>, lebenslang. Steht auf dem Schreiben des Bundeszentralamts für Steuern (BZSt) das du nach Geburt/Zuwanderung bekommen hast — oder auf deiner letzten Lohnsteuerbescheinigung.
          <ToolNote>
            Verloren? Online beim BZSt neu anfordern (kostenlos, ~6 Wochen Postlaufzeit). Ohne IDNr kein FsE.
          </ToolNote>
        </Field>
        <Field nr={3} label="Persönliche Angaben">
          Anrede · Familienname · Vorname · Geburtsname (falls abweichend) · Geburtsdatum · Geburtsort · Staatsangehörigkeit · Religion.
          <br /><br />
          <strong>Religion</strong> entscheidet über Kirchensteuer (8% in BY/BW, 9% Rest). „Keine Religion" oder Austritt = 0% KiSt.
        </Field>
        <Field nr={4} label="Adresse + Kontakt">
          Straße · Hausnummer · PLZ · Ort · Telefon · Mobil · E-Mail.
          <br /><br />
          Die <strong>E-Mail</strong> wird das FA für Bescheid-Versand via ELSTER-Postfach nutzen — angeben.
        </Field>
        <Field nr={5} label="Familienstand + Daten Ehegatte (bei verheiratet)" optional>
          Bei <strong>verheiratet/eingetragene Lebensgemeinschaft</strong>: zusätzlich Name, Geburtsdatum, IDNr, Steuernummer des Ehegatten. Wichtig für Splitting-Vorteil bei ESt-Vorauszahlungen.
        </Field>
      </Section>

      <Section
        nr="B"
        title="Anschrift des Unternehmens"
        intro="Wo arbeitest du? Oft = Privatadresse (Home Office)."
      >
        <Field nr={6} label="Anschrift der Geschäftsleitung / Betriebsstätte">
          Wenn du <strong>von zuhause</strong> arbeitest: Privatadresse eintragen, Häkchen „identisch mit Wohnadresse".
          <br /><br />
          Bei Co-Working oder echtem Büro: Geschäftsadresse — muss eine <strong>tatsächlich genutzte Räumlichkeit</strong> sein (das FA prüft bei Verdacht).
        </Field>
        <Field nr={7} label="Mehrere Betriebsstätten" optional>
          Nur ausfüllen wenn du <strong>mehrere Standorte</strong> hast (z.B. Hauptsitz + Lagerhalle, oder Filiale). Sonst überspringen.
        </Field>
      </Section>

      <Section
        nr="C"
        title="Bankverbindung"
        intro="Wohin überweist das FA Erstattungen, wo bucht es Steuern ab."
      >
        <Field nr={8} label="IBAN + BIC (Erstattungskonto)">
          IBAN + BIC für Steuer-Erstattungen. Idealerweise das <strong>Geschäftskonto</strong> (saubere Trennung Privat/Betrieb).
          <ToolNote>
            Noch kein Geschäftskonto?{" "}
            <Link to="/anbieter?cat=Banking%20DE" className="underline text-accent-blue">Banking-Anbieter vergleichen →</Link>
          </ToolNote>
        </Field>
        <Field nr={9} label="SEPA-Lastschriftmandat erteilen?">
          <strong>JA</strong> empfohlen: FA bucht Steuern + Vorauszahlungen automatisch ab → keine Säumniszuschläge wegen verpasster Fristen.
          <br /><br />
          <strong>NEIN</strong>: du überweist jedes Mal selbst — mehr Cashflow-Kontrolle, mehr Verspätungsrisiko.
        </Field>
        <Field nr={10} label="Separate Bankverbindung für USt-Erstattungen" optional>
          Selten. Nur wenn du USt-Rückflüsse auf einem anderen Konto haben willst (z.B. USt aufs Geschäftskonto, ESt aufs Privatkonto).
        </Field>
      </Section>

      <Section
        nr="D"
        title="Steuerliche Beratung / Empfangsbevollmächtigte"
        intro="Wer darf in deinem Namen mit dem FA kommunizieren?"
      >
        <Field nr={11} label="Steuerberater Bekanntgabe-Vollmacht" optional>
          Wenn du einen <strong>Steuerberater</strong> hast: hier Name, Anschrift, Steuerberater-Nr. eintragen + Häkchen „Vollmacht erteilen". Dann sendet das FA alle Bescheide direkt an den StB (parallel zu dir).
          <ToolNote>
            Noch unsicher ob StB?{" "}
            <Link to="/cockpit/stb-cost-benefit" className="underline text-accent-blue">StB-Cost-Benefit-Check →</Link>
          </ToolNote>
        </Field>
        <Field nr={12} label="Empfangsbevollmächtigter (nur für Ausländer)" optional>
          Nur ausfüllen wenn du <strong>keinen Wohnsitz in Deutschland</strong> hast — dann brauchst du eine in DE wohnhafte Person die für dich Post empfängt.
        </Field>
      </Section>

      <Section
        nr="E"
        title="Angaben zur gewerblichen / freiberuflichen Tätigkeit"
        intro="Was machst du, seit wann, in welcher Form?"
      >
        <Field nr={13} label="Art der ausgeübten Tätigkeit (Bezeichnung)">
          <strong>Konkret</strong> beschreiben — generische Begriffe lehnt das FA ab und schickt Rückfrage:
          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
            <li>❌ Schlecht: „Online-Handel", „Beratung", „Marketing"</li>
            <li>✅ Gut: „Online-Handel mit selbst hergestelltem Silberschmuck via Shopify + Etsy"</li>
            <li>✅ Gut: „Strategische Marketing-Beratung für DACH-D2C-Marken (Meta- und TikTok-Ads)"</li>
          </ul>
          <ToolNote>
            Quick-Check der Beschreibungs-Qualität gibt der{" "}
            <Link to="/cockpit/gewerbeanmeldung-wizard" className="underline text-accent-blue">Gewerbeanmeldung-Wizard Step 4</Link>.
          </ToolNote>
        </Field>
        <Field nr={14} label="Beginn der Tätigkeit">
          Datum der <strong>ersten tatsächlichen Aktivität</strong> (nicht Gewerbeanmeldung). Bei rückwirkender Anmeldung: das Datum darf in der Vergangenheit liegen (FA prüft Plausibilität).
        </Field>
        <Field nr={15} label="Gründungsform">
          Eine der folgenden ankreuzen:
          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
            <li><strong>Neugründung</strong> — Standard für Erstgründer</li>
            <li><strong>Übernahme</strong> — Asset-Deal von Vorgänger</li>
            <li><strong>Umwandlung</strong> — z.B. Einzel → UG</li>
            <li><strong>Verlegung</strong> — Sitz aus anderem FA-Bezirk</li>
            <li><strong>Wiedereröffnung</strong> — vorher abgemeldet</li>
          </ul>
        </Field>
        <Field nr={16} label="Daten Vorgänger (bei Übernahme)" optional>
          Nur bei Übernahme: Name, Anschrift, Steuernummer des Vorgängers + Übernahmedatum.
        </Field>
        <Field nr={17} label="Bisherige berufliche Tätigkeit" optional>
          Was hast du <strong>vorher</strong> gemacht? Z.B. „Angestellter Web-Entwickler bis 03/2026 bei XY GmbH". FA nutzt das nur für Kontext, keine steuerliche Wirkung.
        </Field>
      </Section>

      <Section
        nr="F"
        title="Angaben zur Festsetzung der Vorauszahlungen"
        intro="Hieraus berechnet das FA deine quartalsweisen Vorauszahlungen (10.3 · 10.6 · 10.9 · 10.12)."
        warn="Realistisch schätzen! Zu hoch = unnötig Kapital gebunden. Zu niedrig = Nachzahlung + Verzugszinsen."
      >
        <Field nr={18} label="Voraussichtliche Einkünfte aus der angemeldeten Tätigkeit (Gewinn)">
          <strong>Umsatz minus Betriebsausgaben = Gewinn</strong>. Konservative Schätzung im 1. Jahr (z.B. 50-70 % vom Optimismus-Ziel). Wird nach erster Steuererklärung automatisch korrigiert.
          <ToolNote>
            Brutto-Netto-Vorschau:{" "}
            <Link to="/cockpit/brutto-netto-solo" className="underline text-accent-blue">Brutto-Netto Solo-Selbstständig →</Link>
          </ToolNote>
        </Field>
        <Field nr={19} label="Einkünfte aus anderen Einkunftsarten" optional>
          Andere Einkünfte die in deine Veranlagung fließen:
          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
            <li>Lohn / Gehalt (falls noch angestellt)</li>
            <li>Vermietung + Verpachtung (V+V)</li>
            <li>Kapitalerträge (KAP) — falls nicht über Abgeltungssteuer abgegolten</li>
            <li>Sonstige (§22 EStG) — Renten, gelegentliche Vermittlungen</li>
          </ul>
        </Field>
        <Field nr={20} label="Bei verheiratet: Einkünfte des Ehegatten" optional>
          Nur bei Zusammenveranlagung: voraussichtliche Einkünfte des Ehegatten — für Splitting-Berechnung.
        </Field>
        <Field nr={21} label="Sonderausgaben + außergewöhnliche Belastungen" optional>
          Geschätzte Posten die sich steuermindernd auswirken: Krankenkasse, Riester, Spenden, Kinderbetreuung, Behinderung etc. Reduziert die Vorauszahlungs-Festsetzung.
        </Field>
      </Section>

      <Section
        nr="G"
        title="Angaben zur Gewinnermittlung"
        intro="Wie ermittelst du deinen Gewinn? Eine der wichtigeren Entscheidungen."
      >
        <Field nr={22} label="Gewinnermittlungsart">
          <RecommendationCard
            title="EÜR vs. Bilanz — was passt für dich?"
            questions={[
              { id: "rf", q: "Rechtsform?", options: [
                { v: "kapges", label: "UG, GmbH, AG, eG" },
                { v: "einzel", label: "Einzel/Gewerbe/GbR" },
                { v: "freiberuf", label: "Freiberuf §18 EStG" },
              ]},
              { id: "umsatz", q: "Umsatz Jahr 1?", options: [
                { v: "klein", label: "unter 800k €" },
                { v: "gross", label: "über 800k €" },
              ]},
            ]}
            decide={(ans) => {
              if (ans.rf === "kapges") return "Bilanzierung (§ 5 EStG) — PFLICHT bei Kapitalgesellschaften, kein Wahlrecht.";
              if (ans.rf === "freiberuf") return "EÜR (§ 4 Abs. 3 EStG) — Freiberufler sind IMMER von der Bilanzierungspflicht befreit (§ 141 AO greift nicht).";
              if (ans.umsatz === "gross") return "Bilanzierung (§ 4 Abs. 1 EStG) — Pflicht ab 800.000 € Umsatz oder 80.000 € Gewinn (§ 141 AO).";
              return "EÜR (§ 4 Abs. 3 EStG) — Standard für Einzelunternehmer/GbR unter den Schwellen. Deutlich weniger Aufwand.";
            }}
          />
          Bei ELSTER ankreuzen:
          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
            <li><strong>EÜR</strong> (§ 4 Abs. 3 EStG)</li>
            <li><strong>Vermögensvergleich Bilanz</strong> (§ 4 Abs. 1 EStG) — bei Gewerbe ohne Handelsregister</li>
            <li><strong>Vermögensvergleich Bilanz</strong> (§ 5 EStG) — bei Handelsregister-Eintragung</li>
          </ul>
        </Field>
        <Field nr={23} label="Wirtschaftsjahr">
          <strong>Kalenderjahr</strong> (01.01.–31.12.) ist Standard und einfacher. Abweichendes Wirtschaftsjahr (z.B. 01.07.–30.06.) braucht <strong>Zustimmung des FA</strong> + ist nur sinnvoll bei saisonalen Geschäften (z.B. Skischule).
        </Field>
      </Section>

      <Section
        nr="H"
        title="Lohnsteuer (nur wenn Mitarbeiter)"
        intro="Komplette Sektion überspringen wenn du Solo arbeitest."
      >
        <Field nr={24} label="Anzahl Arbeitnehmer" optional>
          Vollzeit + Teilzeit + Minijobber. Wenn 0 → ganze Sektion überspringen.
        </Field>
        <Field nr={25} label="Jährliche Lohnsumme + Anmeldungszeitraum" optional>
          Geschätzte Lohnsumme. <strong>Anmeldungszeitraum</strong>:
          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
            <li>Monatlich: bei Lohnsteuer {">"} 5.000 €/Jahr</li>
            <li>Quartalsweise: 1.080–5.000 €/Jahr</li>
            <li>Jährlich: bis 1.080 €/Jahr</li>
          </ul>
        </Field>
      </Section>

      <Section
        nr="I"
        title="Umsatzsteuer — die wichtigsten Felder"
        intro="Mehrere binding-critical Entscheidungen — sorgfältig prüfen!"
        warn="§ 19 KU-Wahl bindet dich 5 JAHRE. Soll/Ist-Wahl gilt bis Widerruf."
      >
        <Field nr={26} label="Voraussichtlicher Umsatz Jahr 1">
          Schätzung der <strong>Bruttoeinnahmen aus Lieferungen/Leistungen</strong> im 1. Jahr. Entscheidet über KU-Status (Grenze 25k).
        </Field>
        <Field nr={27} label="Voraussichtlicher Umsatz Jahr 2 (Folgejahr)">
          Prognose Folgejahr. KU nur möglich wenn beide Grenzen eingehalten: Jahr 1 ≤ 25k UND Jahr 2 ≤ 100k.
        </Field>
        <Field nr={28} label="Kleinunternehmer-Regelung § 19 UStG">
          <RecommendationCard
            title="KU §19 oder Regelbesteuerung?"
            questions={[
              { id: "umsatz", q: "Geschätzter Umsatz Jahr 1?", options: [
                { v: "klein", label: "unter 15.000 €" },
                { v: "mittel", label: "15.000–25.000 €" },
                { v: "gross", label: "über 25.000 €" },
              ]},
              { id: "kunden", q: "Wer sind deine Kunden?", options: [
                { v: "b2c", label: "Hauptsächlich Privatkunden (B2C)" },
                { v: "b2b", label: "Hauptsächlich Unternehmen (B2B)" },
                { v: "mix", label: "Beides" },
              ]},
              { id: "invest", q: "Größere Investitionen geplant (≥5k)?", options: [
                { v: "ja", label: "Ja (Equipment, Lager, IT)" },
                { v: "nein", label: "Nein" },
              ]},
            ]}
            decide={(ans) => {
              if (ans.umsatz === "gross") return "REGELBESTEUERUNG zwingend — über 25k geht KU nicht. USt-VA-Pflicht.";
              if (ans.kunden === "b2b") return "REGELBESTEUERUNG — B2B-Kunden wollen Vorsteuer aus deinen Rechnungen ziehen. KU wäre Wettbewerbsnachteil.";
              if (ans.invest === "ja") return "REGELBESTEUERUNG — du willst die Vorsteuer auf deine Anschaffungen zurückbekommen. Bei KU geht das nicht.";
              if (ans.umsatz === "klein" && ans.kunden === "b2c" && ans.invest === "nein") return "KU §19 — klassischer Fall. Keine USt auf Rechnung, keine USt-VA, einfachere Buchhaltung. ⚠ 5 Jahre Bindung!";
              return "GRENZFALL — Empfehlung: kurz mit StB sprechen (~30 €). Bei mittlerem Umsatz + Mix-Kunden hängt's vom Detail ab.";
            }}
          />
        </Field>
        <Field nr={29} label="Verzicht auf Kleinunternehmer-Regelung (Optierung)" optional>
          Nur falls du <strong>unter 25k Umsatz bist ABER trotzdem Regelbesteuerung</strong> willst (z.B. wegen B2B/Vorsteuerabzug). Dann hier „Verzicht erklären". Bindung: 5 Jahre.
        </Field>
        <Field nr={30} label="Steuerbefreite Umsätze" optional>
          Nur relevant bei: Heilberufe (§ 4 Nr. 14 UStG), Bildungsleistungen (§ 4 Nr. 21), Versicherungs-/Finanzdienste etc. Standard-Gründer überspringen.
        </Field>
        <Field nr={31} label="Steuersätze (19 % oder 7 %)">
          Standard <strong>19 %</strong> auf alle Lieferungen/Leistungen. <strong>7 %</strong> nur für Spezialfälle (Lebensmittel, Bücher, Personenbeförderung, Hotelübernachtung, kulturelle Leistungen). Im Zweifel: 19 % ankreuzen, bei Bedarf später bei Rechnungsstellung unterscheiden.
        </Field>
        <Field nr={32} label="Soll- vs. Ist-Versteuerung (§ 20 UStG)">
          <RecommendationCard
            title="Soll oder Ist?"
            questions={[
              { id: "umsatz", q: "Voraussichtlicher Umsatz?", options: [
                { v: "klein", label: "unter 800.000 €" },
                { v: "gross", label: "über 800.000 €" },
              ]},
              { id: "rf", q: "Rechtsform?", options: [
                { v: "freiberuf", label: "Freiberuf §18 EStG" },
                { v: "andere", label: "Gewerbe / Kap.-Ges." },
              ]},
            ]}
            decide={(ans) => {
              if (ans.umsatz === "gross" && ans.rf === "andere") return "SOLL-VERSTEUERUNG zwingend — über 800k Umsatz kein Ist-Versteuerungs-Antrag mehr möglich (außer Freiberuf).";
              if (ans.rf === "freiberuf") return "IST-VERSTEUERUNG — Freiberufler dürfen Ist immer (§ 20 Abs. 1 Nr. 3 UStG). Großer Cashflow-Vorteil.";
              return "IST-VERSTEUERUNG beantragen — Cashflow-Vorteil: USt erst zahlen wenn der Kunde tatsächlich gezahlt hat. Möglich bei Umsatz < 800k.";
            }}
          />
          <strong>Soll-Versteuerung</strong> = USt fällig im Monat der Rechnungsstellung (auch wenn Kunde noch nicht gezahlt).<br />
          <strong>Ist-Versteuerung</strong> = USt fällig erst nach Zahlungseingang. <strong>Großer Liquiditäts-Vorteil!</strong>
        </Field>
        <Field nr={33} label="USt-Voranmeldungs-Zeitraum">
          <strong>Vom FA bestimmt</strong>, nicht selbst wählen — basiert auf erwarteter USt-Zahllast:
          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
            <li>Monatlich: USt {">"} 9.000 €/Jahr</li>
            <li>Quartalsweise: 2.000–9.000 €/Jahr</li>
            <li>Jährlich: bis 2.000 €/Jahr</li>
            <li>Gründer im 1. + 2. Jahr: <strong>monatlich Pflicht</strong> (Reform 2025 aufgehoben → wieder dauerverlängerte Quartal-Möglichkeit, aber FA entscheidet)</li>
          </ul>
        </Field>
        <Field nr={34} label="Dauerfristverlängerung beantragen?" optional>
          Ankreuzen wenn du die USt-VA-Abgabefrist um <strong>1 Monat verlängern</strong> willst (z.B. statt 10.4. erst 10.5.). Bedingung bei monatlicher VA: 1/11-Sondervorauszahlung leisten. Bei quartalsweise: keine Sondervorauszahlung.
        </Field>
        <Field nr={35} label="USt-Identifikationsnummer (USt-IdNr) beantragen">
          <RecommendationCard
            title="USt-IdNr jetzt mitbeantragen?"
            questions={[
              { id: "eu", q: "Hast/planst du EU-Geschäft?", options: [
                { v: "ja", label: "Ja (Kunden/Lieferanten in EU-Ländern)" },
                { v: "nein", label: "Nein (rein deutsche Tätigkeit)" },
                { v: "vielleicht", label: "Vielleicht zukünftig" },
              ]},
            ]}
            decide={(ans) => {
              if (ans.eu === "ja") return "JA — USt-IdNr-Häkchen setzen. PFLICHT für EU-B2B (Reverse Charge §13b) und EU-B2C-Plattformen (OSS). Sonst musst du sie später separat beim BZSt beantragen (2–4 Wochen Wartezeit).";
              if (ans.eu === "vielleicht") return "JA — kostet nichts zusätzlich, ist sofort da wenn du sie brauchst. Empfehlung: immer mitbeantragen.";
              return "OPTIONAL — bei reinem DE-Geschäft nicht zwingend. Aber Tipp: trotzdem ankreuzen, kostet nichts und gibt Flexibilität.";
            }}
          />
        </Field>
      </Section>

      <Section
        nr="J"
        title="Besondere Sachverhalte (selten)"
        intro="Nur ausfüllen wenn dein Geschäft genau das macht."
        collapsedByDefault
      >
        <Field nr={36} label="Bauleistungen § 13b UStG" optional>
          Nur bei <strong>Bauunternehmen, Handwerk, Bau-Subunternehmer</strong>. Reverse Charge gilt nur B2B unter Bauunternehmern.
        </Field>
        <Field nr={37} label="Innergemeinschaftliche Lieferungen + Erwerb" optional>
          Bei <strong>regelmäßigem EU-Geschäft</strong>: hier nochmal explizit ankreuzen. Geht Hand in Hand mit USt-IdNr (Feld 35).
        </Field>
        <Field nr={38} label="Differenzbesteuerung § 25a UStG" optional>
          Nur für <strong>Wiederverkäufer von Gebrauchtwaren</strong> (Antik, Kunst, Second-Hand). USt wird nur auf die Marge berechnet.
        </Field>
        <Field nr={39} label="Steuerschuldner Spezialgüter" optional>
          Selten — Mobilfunkgeräte ≥5k € Rechnungsbetrag, Gold/Silber-Lieferungen, Schrottverwertung. Meist nicht relevant.
        </Field>
      </Section>

      <FinalNotes />

      <CrossLinks />

      <Glossar />

      <Stand2026Footer
        sources={[
          { label: "ELSTER FsE (natürliche Person)", url: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/fsegewnatp" },
          { label: "ELSTER FsE (juristische Person)", url: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/fsegewjur" },
          { label: "§ 138 AO (Anzeigepflicht 1 Monat)", url: "https://www.gesetze-im-internet.de/ao_1977/__138.html" },
          { label: "§ 19 UStG (Kleinunternehmer)", url: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
          { label: "§ 4 Abs. 3 EStG (EÜR)", url: "https://www.gesetze-im-internet.de/estg/__4.html" },
          { label: "§ 20 UStG (Ist-Versteuerung)", url: "https://www.gesetze-im-internet.de/ustg_1980/__20.html" },
          { label: "§ 141 AO (Bilanz-Schwellen)", url: "https://www.gesetze-im-internet.de/ao_1977/__141.html" },
        ]}
        note="Stand 2026: KU-Grenze 25.000 € Vorjahres-Umsatz / 100.000 € Prognose Folgejahr (Reform 2025). Ist-Versteuerung bis 800.000 € Umsatz/Jahr (§ 20 UStG). Bilanz-Pflicht ab 800.000 € Umsatz oder 80.000 € Gewinn (§ 141 AO). FsE-Abgabe-Frist: 1 Monat ab Tätigkeitsaufnahme (§ 138 AO). Bindung der § 19 KU-Wahl: 5 Jahre."
      />
    </CockpitShell>
  );
};

// ============================================================================
// Sub-Components
// ============================================================================

const HeroBlock = () => (
  <div className="rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-card to-card p-5 mb-4">
    <div className="flex items-start gap-3">
      <Lightbulb className="h-6 w-6 text-purple-700 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-bold text-sm mb-1">Wie du dieses Tool benutzt</h3>
        <ol className="text-xs text-muted-foreground leading-relaxed mb-2 list-decimal list-inside space-y-1">
          <li>ELSTER-Konto erstellen (falls noch nicht — Aktivierungs-Brief braucht 2–4 Wochen!).</li>
          <li>ELSTER → Formulare → „Fragebogen zur steuerlichen Erfassung" für deinen Typ öffnen.</li>
          <li>Diese Seite <strong>parallel</strong> öffnen (2. Tab/Monitor).</li>
          <li>Felder werden in der Reihenfolge unten erklärt — bei jeder Frage hier nachlesen, dann in ELSTER eintragen.</li>
          <li>Bei den 4 verbindlichen Entscheidungen (KU §19, EÜR/Bilanz, Soll/Ist, USt-IdNr) gibt's Mini-Widgets die 1-2 Fragen stellen und dir die Empfehlung anzeigen.</li>
        </ol>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] mt-3">
          <div className="rounded-lg bg-red-500/10 p-2 border border-red-500/30">
            <strong className="text-red-700">⚠ § 19 KU</strong>
            <div className="text-muted-foreground mt-0.5">5 Jahre Bindung</div>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-2 border border-amber-500/30">
            <strong className="text-amber-700">⚠ Frist § 138 AO</strong>
            <div className="text-muted-foreground mt-0.5">1 Monat ab Start</div>
          </div>
          <div className="rounded-lg bg-emerald-500/10 p-2 border border-emerald-500/30">
            <strong className="text-emerald-700">✅ ~39 Felder</strong>
            <div className="text-muted-foreground mt-0.5">in 10 Sektionen</div>
          </div>
          <div className="rounded-lg bg-blue-500/10 p-2 border border-blue-500/30">
            <strong className="text-blue-700">⏱ Dauer</strong>
            <div className="text-muted-foreground mt-0.5">~60-90 Min</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ElsterLinks = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
    <a href="https://www.elster.de/eportal/formulare-leistungen/alleformulare/fsegewnatp"
      target="_blank" rel="noreferrer"
      className="rounded-xl border-2 border-accent-blue bg-accent-blue/5 p-3 text-xs hover:bg-accent-blue/10 transition flex items-center justify-between">
      <div>
        <div className="font-semibold text-foreground">FsE für natürliche Personen</div>
        <div className="text-muted-foreground">Einzelunternehmer, Freiberufler, GbR-Gesellschafter</div>
      </div>
      <ExternalLink className="h-4 w-4 text-accent-blue" />
    </a>
    <a href="https://www.elster.de/eportal/formulare-leistungen/alleformulare/fsegewjur"
      target="_blank" rel="noreferrer"
      className="rounded-xl border-2 border-accent-blue bg-accent-blue/5 p-3 text-xs hover:bg-accent-blue/10 transition flex items-center justify-between">
      <div>
        <div className="font-semibold text-foreground">FsE für juristische Personen</div>
        <div className="text-muted-foreground">UG, GmbH, AG, eG</div>
      </div>
      <ExternalLink className="h-4 w-4 text-accent-blue" />
    </a>
  </div>
);

const Section = ({ nr, title, intro, warn, children, collapsedByDefault }: {
  nr: string;
  title: string;
  intro: string;
  warn?: string;
  children: React.ReactNode;
  collapsedByDefault?: boolean;
}) => (
  <details open={!collapsedByDefault} className="rounded-2xl border border-border bg-card p-4 mb-3">
    <summary className="cursor-pointer">
      <span className="font-bold text-sm">
        <span className="inline-block w-7 h-7 rounded-full bg-purple-500/15 text-purple-700 text-center mr-2 leading-7">{nr}</span>
        {title}
      </span>
      <div className="text-xs text-muted-foreground mt-1 ml-9">{intro}</div>
    </summary>
    {warn && (
      <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-2 text-[11px] my-3 flex items-start gap-1.5">
        <AlertTriangle className="h-3.5 w-3.5 text-red-700 shrink-0 mt-0.5" />
        <span className="text-red-700">{warn}</span>
      </div>
    )}
    <div className="mt-3 space-y-2.5">{children}</div>
  </details>
);

const Field = ({ nr, label, optional, children }: {
  nr: number;
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg bg-secondary/30 p-3">
    <div className="font-semibold text-sm flex items-start gap-2 mb-1.5">
      <span className="text-[11px] font-mono bg-card text-muted-foreground px-1.5 py-0.5 rounded shrink-0 mt-0.5">{nr}</span>
      <span className="flex-1">
        {label}
        {optional && <span className="ml-1.5 text-[10px] font-normal text-muted-foreground uppercase">(optional)</span>}
      </span>
    </div>
    <div className="text-xs text-foreground/80 leading-relaxed ml-7">{children}</div>
  </div>
);

const ToolNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-2 rounded bg-accent-blue/10 border border-accent-blue/30 p-2 text-[11px] flex items-start gap-1.5">
    <Info className="h-3 w-3 text-accent-blue shrink-0 mt-0.5" />
    <span>{children}</span>
  </div>
);

const RecommendationCard = ({ title, questions, decide }: {
  title: string;
  questions: { id: string; q: string; options: { v: string; label: string }[] }[];
  decide: (ans: Record<string, string>) => string;
}) => {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const allAnswered = questions.every((q) => answers[q.id]);

  return (
    <div className="rounded-lg bg-purple-500/8 border border-purple-500/30 p-3 my-2">
      {!open ? (
        <button type="button" onClick={() => setOpen(true)}
          className="w-full text-left text-xs font-semibold text-purple-700 hover:text-purple-800 flex items-center gap-1.5">
          <Lightbulb className="h-3.5 w-3.5" /> {title} — Empfehlung anzeigen ↓
        </button>
      ) : (
        <div className="space-y-2.5">
          <div className="text-xs font-semibold text-purple-700 flex items-center gap-1.5">
            <Lightbulb className="h-3.5 w-3.5" /> {title}
          </div>
          {questions.map((q) => (
            <div key={q.id}>
              <div className="text-[11px] font-medium text-foreground mb-1">{q.q}</div>
              <div className="flex flex-wrap gap-1.5">
                {q.options.map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt.v }))}
                    className={`text-[11px] rounded-full px-2.5 py-1 border transition ${
                      answers[q.id] === opt.v
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-card border-border hover:border-purple-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {allAnswered && (
            <div className="rounded bg-emerald-500/10 border border-emerald-500/30 p-2 text-xs text-emerald-800 flex items-start gap-1.5 mt-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0 mt-0.5" />
              <span>{decide(answers)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FinalNotes = () => (
  <div className="rounded-2xl bg-amber-500/10 border-2 border-amber-500/50 p-4 mb-4 text-xs">
    <div className="flex items-start gap-2">
      <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
      <div className="flex-1 space-y-2">
        <div className="font-bold text-amber-800">Vor dem Absenden — letzte Checks:</div>
        <ul className="space-y-1 list-disc list-inside text-foreground/90">
          <li><strong>Steuer-ID</strong> dreimal prüfen (11 Stellen, nicht 13!)</li>
          <li><strong>§ 19 KU</strong>-Entscheidung sicher? 5-Jahres-Bindung!</li>
          <li><strong>Ist-Versteuerung</strong> beantragt (wenn passend)?</li>
          <li><strong>USt-IdNr</strong>-Häkchen gesetzt (wenn EU-Geschäft möglich)?</li>
          <li><strong>IBAN/BIC</strong> auf Tippfehler prüfen — falscher Eingang = Verzögerung</li>
          <li><strong>Lastschriftmandat</strong>: ja oder nein bewusst entschieden?</li>
        </ul>
        <div className="text-[11px] text-muted-foreground italic mt-2">
          Nach Absenden: ELSTER-Bestätigung speichern. Steuernummer kommt 2–6 Wochen per Post.
        </div>
      </div>
    </div>
  </div>
);

const CrossLinks = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
    <Link to="/cockpit/gewerbeanmeldung-wizard" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
      <div className="font-semibold mb-0.5">← Gewerbeanmeldung-Wizard</div>
      <div className="text-muted-foreground">GewA1 BEVOR du FsE machst</div>
    </Link>
    <Link to="/cockpit/schwellen-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
      <div className="font-semibold mb-0.5">Schwellen-Check (KU-Grenzen)</div>
      <div className="text-muted-foreground">25k/100k §19 KU verstehen</div>
    </Link>
    <Link to="/cockpit/erste-schritte-roadmap" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
      <div className="font-semibold mb-0.5">90-Tage-Roadmap →</div>
      <div className="text-muted-foreground">Was kommt nach dem FsE</div>
    </Link>
  </div>
);

const Glossar = () => (
  <details className="rounded-2xl border border-border bg-card p-5 mb-6">
    <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-accent-blue" /> Glossar — FsE-Begriffe einfach erklärt
    </summary>
    <div className="mt-3 space-y-3 text-xs leading-relaxed">
      {[
        { b: "FsE (Fragebogen zur steuerlichen Erfassung)", e: "Pflicht-Online-Formular bei ELSTER, das jeder Selbstständige innerhalb 1 Monat nach Tätigkeitsaufnahme abgeben muss (§ 138 AO). Hier teilt das FA dir die Steuernummer zu, legt Vorauszahlungen + USt-Status fest. 100 % digital, kein Papier." },
        { b: "Steuer-ID vs. Steuernummer", e: "Steuer-ID (IDNr) = 11-stellige LEBENSLANGE Nummer vom BZSt, bekommst du bei Geburt/Zuwanderung. Steuernummer = vom Wohnsitz-FA zugeteilt, ändert sich bei Umzug. Im FsE brauchst du die Steuer-ID; die Steuernummer KOMMT NACH der FsE-Abgabe." },
        { b: "§ 19 UStG Kleinunternehmer (Reform 2025)", e: "Wahl-Recht: Wenn Vorjahres-Umsatz < 25.000 € UND Folgejahr-Prognose < 100.000 €. Vorteil: keine USt-Ausweisung, keine USt-VA. Nachteil: kein Vorsteuer-Abzug. ⚠ 5 Jahre Bindung." },
        { b: "EÜR vs. Bilanzierung", e: "EÜR (§ 4 Abs. 3 EStG) = einfache Zufluss/Abfluss-Rechnung. Pflicht für Bilanz: Kap.-Ges. IMMER, Gewerbe ab 800k Umsatz/80k Gewinn (§ 141 AO), Freiberuf NIE." },
        { b: "Soll- vs. Ist-Versteuerung", e: "Soll = USt fällig im Monat der Rechnungsstellung. Ist = USt fällig erst nach Vereinnahmung. Ist hat Cashflow-Vorteil, möglich bei Umsatz < 800k (§ 20 UStG) oder Freiberuf (immer)." },
        { b: "Vorauszahlungen ESt + GewSt", e: "Quartalsweise (10.3, 10.6, 10.9, 10.12). Festsetzung erst ab voraussichtl. Jahressteuer ≥ 400 € (§ 37 EStG)." },
        { b: "USt-IdNr parallel beantragen", e: "Im FsE direkt mit ankreuzen — dann kommt USt-IdNr gleichzeitig mit Steuernummer. Sonst später separat beim BZSt (2–4 Wochen)." },
        { b: "Pflicht-Frist 1 Monat (§ 138 AO)", e: "Einreichung innerhalb 1 Monat ab Tätigkeitsaufnahme. Verspätung = Verspätungszuschlag möglich." },
      ].map((g) => (
        <div key={g.b} className="rounded-lg bg-secondary/30 p-3">
          <div className="font-semibold text-foreground mb-1">{g.b}</div>
          <div className="text-muted-foreground">{g.e}</div>
        </div>
      ))}
    </div>
  </details>
);

export default FseWizard;
