/**
 * FseWizard — "Fragebogen zur steuerlichen Erfassung (FsE) — Vollständiger Erklär-Begleiter"
 *
 * Read-only 1:1 Walkthrough der ECHTEN 24 Teilseiten des ELSTER-FsE für
 * Einzelunternehmer/Freiberufler (Formularversion fseeun-202401), in der
 * Reihenfolge + mit den echten ELSTER-Zeilennummern, wie sie im Formular
 * abgefragt werden. Struktur 2026 anhand der echten ELSTER-Maske abgeglichen.
 *
 * Die 4 verbindlichen Entscheidungen (KU §19, EÜR vs Bilanz, Soll vs Ist,
 * USt-IdNr) liegen im echten Formular alle auf Teilseite 18 bzw. 15 — dort
 * sitzen auch die interaktiven Empfehlungs-Widgets.
 *
 * Hinweis: ELSTER-Zeilennummern sind global durchnummeriert (bis ~Z.194) und
 * können je Formular-Version geringfügig variieren — die Feld-Bezeichnungen
 * bleiben gleich.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Callout, ChoiceGroup, StatGrid, StatTile, ToneBadge, ToolSection } from "@/components/cockpit/kit";
import {
  Lightbulb,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const FseWizard = () => {
  return (
    <CockpitShell
      eyebrow="Erste Schritte · für komplette Anfänger:innen"
      title="Fragebogen zur steuerlichen Erfassung (FsE): der Erklär-Begleiter"
      subtitle="Alle 24 Teilseiten des ELSTER-FsE (Einzelunternehmen, Version 2026) in der Reihenfolge, in der ELSTER sie abfragt, mit den echten Zeilennummern und einer Erklärung je Feld. Für die 4 verbindlichen Entscheidungen (KU §19, EÜR/Bilanz, Soll/Ist, USt-IdNr) gibt es Empfehlungs-Widgets. Du füllst direkt in ELSTER aus, diese Seite liest parallel mit."
    >
      <HeroBlock />
      <ElsterLinks />

      {/* ============ STARTSEITE ============ */}
      <Section
        nr="0"
        title="Startseite des Formulars"
        intro="Bevor die Teilseiten kommen: Steuernummer + zuständiges Finanzamt."
      >
        <Field label='Datenübernahme aus „Mein ELSTER"' optional>
          Wenn du bei ELSTER schon ein Profil hast: ja → spart Tipparbeit (Name, Adresse, IdNr).
        </Field>
        <Field label="Steuernummer eingeben ODER „Neue Steuernummer beantragen“">
          Hast du <strong>schon eine Steuernummer</strong> beim FA (z.B. aus Arbeitnehmer-Veranlagung)? → eintragen. Sonst „Neue Steuernummer beantragen" wählen → <strong>Land + Finanzamt</strong> auswählen. Die neue Nummer kommt nach Abgabe per Post.
        </Field>
        <Field label="Persönliche Bearbeitungsnotiz" optional>
          Freitext für dich selbst (z.B. „FsE Gründung 2026"). Sieht nur du.
        </Field>
      </Section>

      {/* ============ TEILSEITE 1 ============ */}
      <Section
        nr="1"
        title="Allgemeine Angaben (Zeilen 2–21)"
        intro="Steuerpflichtige(r), Stand der Ehe, Adresse, Telefon, Web, Art der Tätigkeit: alles auf einer Teilseite."
      >
        <Field nr={2} label="Anrede, Titel · Name · Vorname · Namensvorsatz/Namenszusatz">
          Wie im Personalausweis. Diese vier Felder teilen sich in ELSTER die Zeilenmarke 2.
        </Field>
        <Field nr={3} label="Gegebenenfalls Geburtsname · Geburtsdatum">
          Geburtsname nur falls abweichend (z.B. nach Heirat). Geburtsdatum TT.MM.JJJJ.
        </Field>
        <Field nr={4} label="Ausgeübter Beruf">
          Dein <strong>Hauptberuf</strong> (auch wenn parallel angestellt). Z.B. „Web-Entwickler", „Online-Händlerin".
        </Field>
        <Field nr={5} label="Religion">
          Entscheidet über <strong>Kirchensteuer (KiSt)</strong> als Zuschlag auf die ESt:
          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
            <li><strong>rk/ev</strong>: 8 % in Bayern + Baden-Württemberg, 9 % im Rest</li>
            <li><strong>keine / ausgetreten / andere</strong>: 0 % KiSt</li>
          </ul>
          Austritt beim Standesamt/Amtsgericht (25–60 €) → KiSt-frei ab Folge-Monat.
        </Field>
        <Field nr={5} label="Identifikationsnummer (IdNr)">
          <strong>11-stellig</strong>, lebenslang — vom Bundeszentralamt für Steuern (BZSt). <strong>NICHT</strong> verwechseln mit der Steuernummer (kommt erst NACH der FsE).
          <ToolNote>
            Verloren? Online beim BZSt neu anfordern unter <a href="https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/IdNrIst-Mitteilung/idnrist-mitteilung_node.html" target="_blank" rel="noreferrer" className="underline text-accent-blue">bzst.de</a> (kostenlos, ~6 Wochen Postlaufzeit). <strong>Ohne IdNr keine FsE-Abgabe.</strong>
          </ToolNote>
        </Field>
        <Field nr={6} label="Wirtschafts-Identifikationsnummer" optional>
          Falls bereits vorhanden. Für die meisten Erst-Gründer leer lassen — wird ggf. vergeben.
        </Field>
        <Field nr={11} label="Stand der Ehe / eingetragene Lebenspartnerschaft · seit dem">
          Relevant für das <strong>Splitting-Verfahren</strong>: verheiratet / eingetragene Lebenspartnerschaft → Splitting-Tarif (kann bei stark unterschiedlichen Einkommen mehrere Tausend €/Jahr sparen). „seit dem" = Datum.
        </Field>
        <Field nr={7} label="Adresse (Inland / Ausland): Straße, Hausnummer, Hausnummerzusatz">
          Deine Privatadresse. ELSTER unterscheidet „Adresse im Inland" / „im Ausland".
        </Field>
        <Field nr={8} label="Adressergänzung" optional>Z.B. „c/o Müller", „2. OG links".</Field>
        <Field nr={9} label="Postleitzahl, Wohnort (+ Staat bei Auslandsadresse)" />
        <Field nr={10} label="Postfachadresse" optional>Postfach + PLZ/Ort, falls vorhanden.</Field>
        <Field nr={19} label="Telefon (Vorwahl international / national / Rufnummer)" optional>
          Mehrere Nummern möglich.
        </Field>
        <Field nr={20} label="Web: Internetadresse" optional>Wenn vorhanden.</Field>
        <Field nr={21} label="Art der Tätigkeit (genaue Bezeichnung des Gewerbezweiges)">
          <strong>Freitext (max. 200 Zeichen)</strong> — präzise, was du machst. KEIN WZ-Code-Feld im FsE (das FA ordnet den Code selbst zu). Beispiel: „Online-Handel mit Sneakern (Ein- und Verkauf)" statt nur „Handel".
        </Field>
      </Section>

      {/* ============ TEILSEITE 2 ============ */}
      <Section
        nr="2"
        title="Ehegatte / Ehegattin / eingetragene(r) Lebenspartner(in) (Zeilen 12–18)"
        intro="Nur ausfüllen, wenn verheiratet / verpartnert."
        collapsedByDefault
      >
        <Field nr={12} label="Anrede, Titel · Name · Vorname · Namensvorsatz/-zusatz · Geburtsname" />
        <Field nr={13} label="Ausgeübter Beruf · Geburtsdatum" />
        <Field nr={14} label="Religion (Ehegatte)">Eigener KiSt-Status des Partners.</Field>
        <Field nr={15} label="Identifikationsnummer (Ehegatte)" />
        <Field nr={16} label="Adresse (nur falls abweichend von deiner)" optional />
      </Section>

      {/* ============ TEILSEITE 3 ============ */}
      <Section
        nr="3"
        title="Bankverbindung(en) für Steuererstattungen / SEPA-Lastschriftverfahren"
        intro="Wohin erstattet das FA, und darf es Steuern automatisch abbuchen?"
      >
        <Field label="IBAN (inländisches oder ausländisches Geldinstitut)">
          Konto für <strong>Erstattungen</strong> des Finanzamts. In ELSTER nur eine IBAN-Tabelle (inländisch/ausländisch) — KEINE 20 Einzelfelder.
        </Field>
        <Field label="SEPA-Lastschriftmandat erteilen?">
          Darf das FA Steuern + Vorauszahlungen automatisch abbuchen? (Das eigentliche Mandat wird als „Teilnahmeerklärung SEPA-Lastschriftverfahren" beigefügt — siehe Teilseite 23.)
          <RecommendationCard
            title="Lastschriftmandat: ja oder nein?"
            questions={[
              { id: "puffer", q: "Hast du Liquiditäts-Puffer auf dem Konto?", options: [
                { v: "ja", label: "Ja, 1+ Monat Puffer" },
                { v: "knapp", label: "Knapp" },
                { v: "nein", label: "Eher knapp" },
              ]},
              { id: "diszipliniert", q: "Wie diszipliniert mit Fristen?", options: [
                { v: "vergesslich", label: "Vergesslich, könnte Fristen verpassen" },
                { v: "ok", label: "Mittel — manchmal knapp" },
                { v: "ueberkontrolle", label: "Will alles selbst kontrollieren" },
              ]},
            ]}
            decide={(ans) => {
              if (ans.puffer === "nein") return "EHER NEIN — bei wenig Puffer kann automatische Abbuchung den Account ins Minus bringen → Rücklastschriftgebühr 3-10 € + möglicher Säumniszuschlag.";
              if (ans.diszipliniert === "vergesslich") return "JA — du sparst Säumniszuschläge (1 % pro angefangenem Monat ab Fälligkeit, ohne Mindestgrenze).";
              if (ans.diszipliniert === "ueberkontrolle") return "NEIN — du behältst volle Kontrolle. Achte aber strikt auf die Termine 10.3 / 10.6 / 10.9 / 10.12.";
              return "JA empfohlen — Standard für Selbstständige, vermeidet Verspätungs-Risiko bei vielen Terminen.";
            }}
          />
          <strong>Säumniszuschlag:</strong> 1 % pro angefangenem Monat ab Fälligkeit (§ 240 AO), keine Mindestgrenze.
        </Field>
      </Section>

      {/* ============ TEILSEITE 4 ============ */}
      <Section
        nr="4"
        title="Steuerliche Beratung (Zeilen 32–38)"
        intro="Hast du einen Steuerberater? Nur ausfüllen wenn ja."
      >
        <Field nr={32} label="Natürliche Person: Anrede/Titel, Name, Vorname, Namensvorsatz, Namenszusatz" optional />
        <Field nr={35} label="Adresse + Telefon der Beratung" optional />
        <Field nr={37} label="Nicht natürliche Person: Firmenbezeichnung + Adresse + Telefon" optional>
          Falls die Kanzlei eine Gesellschaft ist.
        </Field>
      </Section>

      {/* ============ TEILSEITE 5 ============ */}
      <Section
        nr="5"
        title="Empfangsbevollmächtigte(r) für alle Steuerarten (Zeilen 39–46)"
        intro="Wer bekommt die Bescheide? (Nicht nur für Ausländer, sondern für jeden relevant, der die Post an jemand anderen leiten will.)"
      >
        <Field nr={39} label='Checkbox „Die angegebene steuerliche Beratung ist empfangsbevollmächtigt."' optional>
          Häkchen, wenn der StB aus Teilseite 4 alle Bescheide bekommen soll.
        </Field>
        <Field nr={40} label="Sonst: Empfangsbevollmächtigte Person/Firma + Adresse + Telefon" optional />
      </Section>

      {/* ============ TEILSEITE 6 ============ */}
      <Section
        nr="6"
        title="Bisherige persönliche Verhältnisse (Zeilen 47–54)"
        intro="Umzug in den letzten 12 Monaten / frühere steuerliche Erfassung."
        collapsedByDefault
      >
        <Field nr={47} label="Innerhalb der letzten 12 Monate zugezogen am" optional>
          Datum + frühere Adresse (Inland/Ausland).
        </Field>
        <Field nr={50} label="In den letzten 3 Jahren für die Einkommensteuer steuerlich erfasst?" optional>
          Falls ja: Land, Steuernummer, Finanzamt. Gleiche Angaben ggf. für Ehegatten.
        </Field>
      </Section>

      {/* ============ TEILSEITE 7 ============ */}
      <Section
        nr="7"
        title="Angaben zum Unternehmen (Zeilen 55–69)"
        intro="Bezeichnung, Anschrift, Beginn der Tätigkeit."
      >
        <Field nr={55} label="Bezeichnung des Unternehmens">
          Als Einzelunternehmer: dein Name (z.B. „Max Mustermann"), optional mit Zusatz („Max Mustermann · NaturKosmetik").
        </Field>
        <Field nr={56} label='Checkbox „Die Anschrift des Unternehmens entspricht meiner Wohnanschrift."'>
          Häkchen → spart die nächsten Adressfelder. Sonst Adresse des Unternehmens + Postfach + Telefon + Web eintragen.
        </Field>
        <Field nr={69} label="Beginn der Tätigkeit (inklusive Vorbereitungshandlungen)">
          <strong>Wichtig:</strong> auch Vorbereitungshandlungen (erste Einkäufe, Anmeldungen) zählen — oft früher als der erste Umsatz. Dieses Datum startet die §138-AO-Frist.
        </Field>
      </Section>

      {/* ============ TEILSEITE 8 ============ */}
      <Section
        nr="8"
        title="Abweichender Ort der Geschäftsleitung (Zeilen 63–68)"
        intro="Nur falls die Geschäftsleitung NICHT an deiner Wohnanschrift ist."
        collapsedByDefault
      >
        <Field nr={63} label='Checkbox „Der abweichende Ort der Geschäftsleitung entspricht meiner Wohnanschrift."' optional>
          Sonst Adresse + Telefon + Web des Geschäftsleitungs- Orts eintragen. Für die meisten Solo-Gründer: nichts auszufüllen.
        </Field>
      </Section>

      {/* ============ TEILSEITE 9 ============ */}
      <Section
        nr="9"
        title="Angaben zu Betriebstätten"
        intro="Nur falls du weitere feste Betriebstätten hast (Filiale, Lager, Werkstatt)."
        collapsedByDefault
      >
        <Field label="Bezeichnung der Betriebstätte (Tabelle)" optional>
          Reine Tabelle in ELSTER. Bei mehr als 10 Betriebstätten: als PDF-Anlage hochladen. Für Solo-Gründer meist leer.
        </Field>
      </Section>

      {/* ============ TEILSEITE 10 ============ */}
      <Section
        nr="10"
        title="Handelsregistereintragung (Zeilen 80–84)"
        intro="Nur relevant bei e.K. / HR-Eintrag, für Klein-Einzelunternehmer meist nicht."
        collapsedByDefault
      >
        <Field nr={80} label="Eintragung beabsichtigt / Antrag gestellt / bereits erfolgt" optional>
          Checkboxen. Plus: „Antrag gestellt am" / „besteht seit".
        </Field>
        <Field nr={82} label="Ort des Amtsgerichts · Register · Registernummer" optional>
          Nur falls HR-Eintrag vorhanden/beantragt.
        </Field>
      </Section>

      {/* ============ TEILSEITE 11 ============ */}
      <Section
        nr="11"
        title="Gründungsform (Zeilen 85–92)"
        intro="Neugründung, Übernahme, Umwandlung, und ggf. Vorgänger."
      >
        <Field nr={85} label="Gründungsart + Gründungsdatum">
          Neugründung (Standard) / Übernahme / Umwandlung / Verlegung.
        </Field>
        <Field nr={87} label="Vorherige(r) Inhaber(in) + Steuernummer + Adresse" optional>
          Nur bei Übernahme/Umwandlung eines bestehenden Unternehmens. Plus vorheriges Unternehmen, dessen USt-IdNr / Wirtschafts-IdNr.
        </Field>
      </Section>

      {/* ============ TEILSEITE 12 ============ */}
      <Section
        nr="12"
        title="Bisherige betriebliche Verhältnisse (Zeilen 93–98)"
        intro="Warst du in den letzten 5 Jahren schon mal gewerblich/selbständig tätig oder beteiligt?"
        collapsedByDefault
      >
        <Field nr={93} label="Frühere gewerbliche/selbständige/L+F-Tätigkeit oder Beteiligung (≥ 1 % Kapitalges.) in den letzten 5 Jahren?" optional>
          Falls ja: Art der Tätigkeit/Beteiligung, Ort, Dauer (vom/bis), USt-IdNr, Wirtschafts-IdNr, Steuernummer der Vortätigkeit.
        </Field>
      </Section>

      {/* ============ TEILSEITE 13 ============ */}
      <Section
        nr="13"
        title="Konzernzugehörigkeit (Zeilen 99–104)"
        intro="Gehört das Einzelunternehmen zu einem Konzern?"
        collapsedByDefault
      >
        <Field nr={99} label='Checkbox „Das Einzelunternehmen gehört zu einem Konzern."' optional>
          Falls ja: Angaben zum herrschenden Unternehmen (Name, Land, Steuernummer, Finanzamt, Wirtschafts-IdNr) + Registereintrag (Amtsgericht, Register, Registernummer). Für die allermeisten Solo-Gründer: nichts.
        </Field>
      </Section>

      {/* ============ TEILSEITE 14 ============ */}
      <Section
        nr="14"
        title="Angaben zur Festsetzung der Vorauszahlungen (Einkommensteuer, Gewerbesteuer) (Zeilen 105–113)"
        intro="Hieraus berechnet das FA deine quartalsweisen Vorauszahlungen (10.3, 10.6, 10.9, 10.12)."
        warn="REALISTISCH schätzen! Zu hoch = Kapital gebunden, zu niedrig = Nachzahlung + nach 15 Monaten Karenz 1,8 %/Jahr (0,15 %/Monat) Nachzahlungszinsen (§ 233a i. V. m. § 238 Abs. 1a AO)."
      >
        <Field nr={105} label="Voraussichtliche Einkünfte (4 Spalten: du / Ehegatte × Eröffnungsjahr / Folgejahr)">
          ELSTER fragt je Einkunftsart: Land- und Forstwirtschaft, <strong>Gewerbebetrieb</strong>, <strong>Selbständige Arbeit</strong> (Freiberuf), Nichtselbständige Arbeit, Kapitalvermögen, Vermietung und Verpachtung, Sonstige Einkünfte (z.B. Renten).
          <br /><br />
          <strong>GEWINN eintragen</strong> (Umsatz minus Betriebsausgaben), <strong>nicht Umsatz!</strong> Gewerbe → „Gewerbebetrieb"; Freiberuf (§ 18 EStG) → „Selbständige Arbeit".
          <RecommendationCard
            title="Konservativ oder optimistisch schätzen?"
            questions={[
              { id: "erfahrung", q: "Wie viel Erfahrung in der Tätigkeit?", options: [
                { v: "neu", label: "Komplett neu / 1. Jahr" },
                { v: "wechsel", label: "Wechsel aus Festanstellung gleicher Branche" },
                { v: "second", label: "2.-3. Selbstständigkeit" },
              ]},
              { id: "puffer", q: "Hast du Liquiditäts-Puffer?", options: [
                { v: "viel", label: "Ja, 6+ Monate" },
                { v: "wenig", label: "Knapp, 2-3 Monate" },
                { v: "keine", label: "Quasi keinen" },
              ]},
            ]}
            decide={(ans) => {
              if (ans.erfahrung === "neu" || ans.puffer === "keine") {
                return "EHER NIEDRIG schätzen (z.B. 30-50 % deines Zielwerts). Vorauszahlungen bleiben klein → Liquidität bleibt im Geschäft. Eine eventuelle Nachzahlung ist im 1. Jahr nicht verzinst (Zinsen erst ab 15. Monat nach Veranlagungsjahr-Ende, § 233a AO).";
              }
              if (ans.erfahrung === "second" && ans.puffer === "viel") {
                return "REALISTISCH schätzen. Du kannst die Vorauszahlungen tragen, und genaue Schätzung vermeidet Nachzahlungs-Überraschungen.";
              }
              return "MITTEL konservativ — etwa 60-70 % deines Optimismus-Zielwerts. Niedrig genug für Liquidität, nicht so niedrig dass das FA rückfragt.";
            }}
          />
          <ToolNote>
            Wie viel bleibt netto? <Link to="/cockpit/brutto-netto-solo" className="underline text-accent-blue">Brutto-Netto Solo-Selbstständig →</Link>
          </ToolNote>
        </Field>
        <Field nr={112} label="Voraussichtliche Höhe der Sonderausgaben" optional>
          KV-Beiträge (oft größter Posten), Vorsorge (Rürup/bAV/Riester), Spenden, Kinderbetreuung.
        </Field>
        <Field nr={113} label="Voraussichtliche Höhe der Steuerabzugsbeträge" optional>
          Bereits einbehaltene Steuern (z.B. Lohnsteuer aus paralleler Anstellung, Kapitalertragsteuer).
        </Field>
      </Section>

      {/* ============ TEILSEITE 15 ============ */}
      <Section
        nr="15"
        title="Angaben zur Gewinnermittlung (Zeilen 114–116)"
        intro="EÜR vs. Bilanz: eine der verbindlichen Entscheidungen."
      >
        <Field nr={114} label="Gewinnermittlungsart (Dropdown)">
          <RecommendationCard
            title="EÜR vs. Bilanz: was passt?"
            questions={[
              { id: "rf", q: "Rechtsform?", options: [
                { v: "kapges", label: "UG/GmbH/AG/eG" },
                { v: "einzel", label: "Einzel/Gewerbe/GbR" },
                { v: "freiberuf", label: "Freiberuf §18 EStG" },
              ]},
              { id: "umsatz", q: "Umsatz Jahr 1?", options: [
                { v: "klein", label: "unter 800k €" },
                { v: "gross", label: "über 800k €" },
              ]},
            ]}
            decide={(ans) => {
              if (ans.rf === "kapges") return "Bilanzierung (§ 5 EStG) — PFLICHT bei Kap.-Ges., kein Wahlrecht.";
              if (ans.rf === "freiberuf") return "EÜR (§ 4 Abs. 3 EStG) — Freiberufler IMMER von Bilanzpflicht befreit.";
              if (ans.umsatz === "gross") return "Bilanzierung (§ 4 Abs. 1 EStG) — Pflicht ab 800k Umsatz / 80k Gewinn (§ 141 AO).";
              return "EÜR (§ 4 Abs. 3 EStG) — Standard für Einzel/GbR unter den Schwellen. Weniger Aufwand.";
            }}
          />
          Im Dropdown wählbar: Einnahmen-Überschuss-Rechnung (§ 4 Abs. 3 EStG) · Vermögensvergleich § 4 Abs. 1 EStG (Bilanz ohne HR) · Vermögensvergleich § 5 EStG (Bilanz mit HR) · sonstige (z.B. § 5a EStG Tonnagesteuer).
        </Field>
        <Field nr={115} label="Erläuterung der sonstigen Gewinnermittlungsart" optional>
          Nur bei „sonstige" (z.B. § 5a EStG).
        </Field>
        <Field nr={116} label="Vom Kalenderjahr abweichendes Wirtschaftsjahr? + Beginn" optional>
          <strong>Kalenderjahr</strong> (01.01.–31.12.) ist Standard. Abweichend nur bei saisonalen Geschäften — braucht FA-Zustimmung.
        </Field>
      </Section>

      {/* ============ TEILSEITE 16 ============ */}
      <Section
        nr="16"
        title="Freistellungsbescheinigung gemäß § 48b EStG (Bauabzugssteuer) (Zeile 117)"
        intro="Nur eine einzige Checkbox, relevant für Bauleistende."
        collapsedByDefault
      >
        <Field nr={117} label='Checkbox „Ich beantrage die Erteilung einer Bescheinigung zur Freistellung vom Steuerabzug bei Bauleistungen gemäß § 48b EStG."' optional>
          Verhindert, dass deine Auftraggeber 15 % Bauabzugssteuer einbehalten. Nur für Bau-/Handwerksleistungen relevant — sonst leer.
        </Field>
      </Section>

      {/* ============ TEILSEITE 17 ============ */}
      <Section
        nr="17"
        title="Angaben zur Anmeldung und Abführung der Lohnsteuer (Zeilen 118–126)"
        intro="Nur wenn du Mitarbeiter/Minijobber beschäftigst."
        collapsedByDefault
      >
        <Field nr={118} label="Anzahl der Arbeitnehmer (einschließlich Aushilfskräfte) insgesamt" optional />
        <Field nr={119} label="Davon: im Unternehmen angestellte Familienangehörige" optional />
        <Field nr={120} label="Davon: geringfügig Beschäftigte (2 % Pauschsteuer an Minijob-Zentrale)" optional>
          Minijob-Grenze 2026: <strong>603 €/Monat</strong> (an Mindestlohn 13,90 € gekoppelt).
        </Field>
        <Field nr={121} label="Beginn der Lohnzahlungen" optional />
        <Field nr={122} label="Voraussichtliche Lohnsteuer im Kalenderjahr" optional />
        <Field nr={123} label="Lohnsteuerliche Betriebstätte (Bezeichnung + Adresse)" optional />
      </Section>

      {/* ============ TEILSEITE 18 ============ */}
      <Section
        nr="18"
        title="Angaben zur Anmeldung und Abführung der Umsatzsteuer (Zeilen 127–162)"
        intro="Die wichtigste Teilseite: hier liegen 3 der 4 verbindlichen Entscheidungen: Kleinunternehmer §19, Soll/Ist, USt-IdNr."
        warn="Mehrere bindende Entscheidungen. Der Verzicht auf §19 KU (Regelbesteuerung) bindet 5 Jahre (§ 19 Abs. 3 UStG). Sorgfältig prüfen."
      >
        <Field nr={127} label="Geschäftsveräußerung im Ganzen (§ 1 Absatz 1a UStG)" optional>
          Nur bei Übernahme eines kompletten Betriebs. Standard: „Keine Angabe".
        </Field>
        <Field nr={128} label="Bisherige umsatzsteuerliche Verhältnisse">
          „Ich werde aktuell bei einem Finanzamt umsatzsteuerlich geführt" — bei Erst-Gründung: nein. Falls ja: Land + Steuernummer (Z.129).
        </Field>
        <Field nr={130} label="Summe der Umsätze (geschätzt): im Jahr der Betriebseröffnung / im Folgejahr">
          <strong>Brutto-Umsatz</strong> (nicht Gewinn). Entscheidet über drei Dinge: KU-Status §19 (Schwelle 25.000 €), USt-Voranmeldungs-Rhythmus, Bilanzierungs-Pflicht (800.000 €).
          <RecommendationCard
            title="Strategie: welche Zahl eintragen?"
            questions={[
              { id: "sicherheit", q: "Wie sicher ist deine Prognose?", options: [
                { v: "vertraege", label: "Hab schon Verträge/Pipeline" },
                { v: "realistisch", label: "Realistische Schätzung" },
                { v: "wunsch", label: "Mehr Wunsch als Plan" },
              ]},
              { id: "naehe25", q: "Liegst du in der Nähe von 25.000 €?", options: [
                { v: "drunter", label: "Klar drunter (<20k)" },
                { v: "grenznah", label: "Grenznah (20-30k)" },
                { v: "drueber", label: "Klar drüber (>30k)" },
              ]},
            ]}
            decide={(ans) => {
              const parts: string[] = [];
              if (ans.sicherheit === "vertraege") parts.push("Du hast Pipeline → trage den realistischen Wert ein.");
              else if (ans.sicherheit === "realistisch") parts.push("Realistischer Wert → eher konservativ. Lieber etwas zu wenig: Vorauszahlungen sonst zu hoch → unnötig Liquidität gebunden.");
              else parts.push("Optimistische Schätzungen lehnt das FA mit Rückfrage ab. Trage NUR ein, was du belegen kannst.");
              if (ans.naehe25 === "grenznah") parts.push("⚠ 25k-Grenze für KU: bei tatsächlichem Überschreiten IM LAUFENDEN JAHR fällt der KU-Status SOFORT weg (ab dem überschreitenden Umsatz). Lieber gleich Regelbesteuerung wählen.");
              else if (ans.naehe25 === "drueber") parts.push("KU §19 nicht möglich → Regelbesteuerung.");
              else parts.push("✅ Klar unter 25k → KU §19 möglich (wenn gewünscht).");
              return parts.join(" ");
            }}
          />
        </Field>
        <Field nr={131} label='Kleinunternehmer-Regelung § 19 UStG in Anspruch nehmen?'>
          Wörtlich in ELSTER: „Meine Umsätze unterliegen … der Kleinunternehmer-Regelung nach § 19 UStG. … keine Umsatzsteuer gesondert ausgewiesen und kein Vorsteuerabzug …".
          <RecommendationCard
            title="KU §19 oder Regelbesteuerung?"
            questions={[
              { id: "umsatz", q: "Geschätzter Umsatz Jahr 1?", options: [
                { v: "klein", label: "unter 15.000 €" },
                { v: "mittel", label: "15.000–25.000 €" },
                { v: "gross", label: "über 25.000 €" },
              ]},
              { id: "kunden", q: "Wer sind deine Kunden?", options: [
                { v: "b2c", label: "Privatkunden (B2C)" },
                { v: "b2b", label: "Unternehmen (B2B)" },
                { v: "mix", label: "Beides" },
              ]},
              { id: "invest", q: "Größere Investitionen geplant (≥5k)?", options: [
                { v: "ja", label: "Ja" },
                { v: "nein", label: "Nein" },
              ]},
            ]}
            decide={(ans) => {
              if (ans.umsatz === "gross") return "REGELBESTEUERUNG zwingend — über 25k geht KU nicht.";
              if (ans.kunden === "b2b") return "REGELBESTEUERUNG — B2B-Kunden wollen Vorsteuer aus deinen Rechnungen ziehen. KU = Wettbewerbsnachteil.";
              if (ans.invest === "ja") return "REGELBESTEUERUNG — du willst Vorsteuer auf Anschaffungen zurück. Bei KU geht das nicht.";
              if (ans.umsatz === "klein" && ans.kunden === "b2c" && ans.invest === "nein") return "KU §19 — klassischer Fall. Keine USt, einfachere Buchhaltung. ⚠ Der Verzicht bindet 5 Jahre (Z.132).";
              return "GRENZFALL — Empfehlung: kurz mit StB sprechen.";
            }}
          />
        </Field>
        <Field nr={132} label='Verzicht auf die Kleinunternehmer-Regelung (§ 19 Absatz 3 UStG)'>
          Wörtlich: „Ich verzichte auf die Anwendung der Kleinunternehmer-Regelung … für mindestens fünf Kalenderjahre". <strong>⚠ 5-Jahres-Bindung!</strong> Sinnvoll bei B2B-Kunden oder hohen Anfangs-Investitionen (Vorsteuer ziehen).
        </Field>
        <Field nr={133} label="Zahllast / Überschuss (geschätzt): Voraussichtliche Umsatzsteuer + Betrag">
          Umsatz × 19 % minus Vorsteuer = Zahllast (positiv) oder Überschuss (negativ = Erstattung). Bei großen Anfangs-Investitionen kann die Vorsteuer überwiegen → Überschuss.
        </Field>
        <Field nr={134} label='Kalendermonat statt Kalendervierteljahr als Voranmeldungszeitraum wählen?' optional>
          Checkbox: monatliche Voranmeldung wählen, wenn ein <strong>Vorsteuer-Überschuss</strong> die Grenzen des § 18 Abs. 2a UStG voraussichtlich übersteigt (= schneller an Erstattungen kommen). <br />
          <strong>Sonst bestimmt das FA den Rhythmus nach der Vorjahres-Zahllast (2026):</strong> monatlich {">"} 9.000 € · vierteljährlich 2.000–9.000 € · jährlich (keine VA) ≤ 2.000 €. <em>(Werte seit BEG IV / 01.01.2025.)</em> Gründer: seit Reform 2025 kein Pflicht-Monatszwang mehr.
        </Field>
        <Field nr={144} label="Steuerbefreiung: ganz/teilweise steuerfreie Umsätze gemäß § 4 UStG?" optional>
          Z.B. Heilberufe (§ 4 Nr. 14), Bildungsleistungen (Nr. 21), Versicherungs-/Finanzvermittlung. Falls ja: Nummer aus § 4 UStG + Art des Umsatzes (Z.145).
        </Field>
        <Field nr={146} label="Ermäßigter Steuersatz 7 % gemäß § 12 Absatz 2 UStG?" optional>
          Nur Spezialfälle (Anlage 2): Lebensmittel, Bücher/Zeitschriften, Nahverkehr, Übernachtung, Kultur. Falls ja: Nummer + Art des Umsatzes (Z.147).
        </Field>
        <Field nr={148} label="Nullsteuersatz gemäß § 12 Absatz 3 UStG?" optional>
          Z.B. PV-Anlagen bis 30 kWp. Mit Unter-Checkboxen (§ 12 Abs. 3 Nr. 1–4) + Art des Umsatzes (Z.149).
        </Field>
        <Field nr={150} label="Durchschnittssatzbesteuerung § 24 UStG (Land-/Forstwirtschaft)?" optional>
          Nur L+F-Betriebe. Mit „Ich nehme in Anspruch" (Z.152) / „Ich verzichte … für mind. 5 Kalenderjahre" (Z.153).
        </Field>
        <Field nr={154} label='Soll- / Istversteuerung: „Ich berechne die Umsatzsteuer nach …"'>
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
              if (ans.umsatz === "gross" && ans.rf === "andere") return "SOLL-VERSTEUERUNG zwingend — über 800k Umsatz kein Ist mehr möglich (außer Freiberuf).";
              if (ans.rf === "freiberuf") return "IST-VERSTEUERUNG — Freiberufler dürfen Ist immer (§ 20 Abs. 1 Nr. 3 UStG). Großer Cashflow-Vorteil.";
              return "IST-VERSTEUERUNG beantragen — USt erst nach Zahlungseingang. Möglich bei Umsatz < 800k.";
            }}
          />
          <strong>Soll:</strong> USt fällig bei Rechnungsstellung (auch wenn Kunde noch nicht zahlte). <strong>Ist:</strong> USt erst nach Zahlungseingang (Cashflow-Vorteil). Den Ist-Antrag stellst du über die Checkboxen Z.155–157 (Umsatz {"<"} 800k / keine Buchführungspflicht / Freiberuf).
        </Field>
        <Field nr={158} label="Antrag auf Umsatzsteuer-Identifikationsnummer (USt-IdNr)?">
          <RecommendationCard
            title="USt-IdNr jetzt mitbeantragen?"
            questions={[
              { id: "eu", q: "Planst du EU-Geschäft?", options: [
                { v: "ja", label: "Ja (Kunden/Lieferanten in EU)" },
                { v: "nein", label: "Nein (rein deutsch)" },
                { v: "vielleicht", label: "Vielleicht zukünftig" },
              ]},
            ]}
            decide={(ans) => {
              if (ans.eu === "ja") return "JA — Häkchen setzen. PFLICHT für EU-B2B (Reverse Charge §13b) und EU-B2C-Plattformen (OSS) sowie Handel über elektronische Schnittstellen (§ 25e UStG).";
              if (ans.eu === "vielleicht") return "JA — kostet nichts extra und kommt nach der Erfassung per Post vom BZSt. Empfehlung: immer mitbeantragen.";
              return "OPTIONAL — bei reinem DE-Geschäft nicht zwingend. Tipp: trotzdem ankreuzen für Flexibilität.";
            }}
          />
          Falls schon eine USt-IdNr aus früherer Tätigkeit vorhanden: in Z.159 eintragen (Nummer + Vergabedatum).
          Schon erfasst und das Häkchen vergessen? <Link to="/ust-id-beantragen" className="underline text-accent-blue">USt-ID nachträglich beim BZSt beantragen →</Link>
        </Field>
        <Field nr={160} label="Steuerschuldnerschaft des Leistungsempfängers bei Bau-/Gebäudereinigungsleistungen (§ 13b UStG)" optional>
          Nur Bau-/Gebäudereinigungs-Unternehmer: Nachweis beantragen (Z.160) + Umfang {">"} 10 % des Weltumsatzes (Z.161/162).
        </Field>
      </Section>

      {/* ============ TEILSEITE 19 ============ */}
      <Section
        nr="19"
        title="Organschaft (§ 2 Absatz 2 Nummer 2 UStG)"
        intro="Nur falls du Organträger einer Organgesellschaft bist (Konzern-Konstellation)."
        collapsedByDefault
      >
        <Field label='„Ich bin Organträger folgender Organgesellschaft:" (Tabelle Firmenbezeichnung)' optional>
          Für Solo-Gründer praktisch nie relevant. Hinweis: Bei Organschaft beantragt der Organträger die USt-IdNr der Organgesellschaft.
        </Field>
      </Section>

      {/* ============ TEILSEITE 20 ============ */}
      <Section
        nr="20"
        title='Besonderes Besteuerungsverfahren „One-Stop-Shop" (Zeilen 163–174)'
        intro="OSS: für B2C-Verkäufe an Privatkunden in andere EU-Länder."
        collapsedByDefault
      >
        <Field nr={163} label="Teilnahme am OSS-Verfahren (Inland / anderer EU-Mitgliedstaat)" optional>
          <strong>OSS</strong> ab <strong>10.000 €/Jahr</strong> B2C-Umsatz in andere EU-Länder: du meldest alle EU-B2C-Umsätze zentral über das BZSt statt sich in jedem Land zu registrieren. Checkbox-Sets für „im Inland ansässig" / „in anderem EU-Staat ansässig". Für reinen DE-Handel: leer.
        </Field>
      </Section>

      {/* ============ TEILSEITE 21 ============ */}
      <Section
        nr="21"
        title="Umsätze im Bereich des Handels mit Waren über das Internet (Zeilen 175–178)"
        intro="Eigener Webshop und/oder Verkauf über Marktplätze (Amazon, eBay, Etsy …)."
        collapsedByDefault
      >
        <Field nr={175} label='Checkbox „Ich verkaufe über einen eigenen Webshop." + Web-Adresse (URL)' optional />
        <Field nr={176} label="Handel über elektronische Schnittstelle(n) i.S.d. § 25e Abs. 5 UStG" optional>
          Falls ja: Tabelle „Elektronische Marktplätze" — Name der Schnittstelle (z.B. Amazon, eBay) + dein Identifikationsmerkmal. Relevant für die Plattform-Haftung nach § 25e UStG.
        </Field>
      </Section>

      {/* ============ TEILSEITE 22 ============ */}
      <Section
        nr="22"
        title="Umsätze im Bereich der Sozialen Medien (Zeilen 183–184)"
        intro="Für Creator / Influencer: Einnahmen über Social-Media-Plattformen."
      >
        <Field nr={183} label='Checkbox „Ich erziele über eine / mehrere Plattformen der Sozialen Medien Umsätze."' optional>
          Relativ neue FsE-Seite. Falls ja: Tabelle „Soziale Medien" — Name der Plattform (z.B. Instagram, TikTok, YouTube) + Accountname (Z.184). Wichtig für Creator/Affiliate-Geschäft.
        </Field>
      </Section>

      {/* ============ TEILSEITE 23 ============ */}
      <Section
        nr="23"
        title="Beigefügte Unterlagen (Zeilen 189–194)"
        intro="Welche Anlagen legst du bei? (Feste Checkbox-Liste.)"
      >
        <Field nr={189} label="Teilnahmeerklärung für das SEPA-Lastschriftverfahren" optional>
          Anhaken, wenn du das Lastschriftmandat (Teilseite 3) als Anhang beifügst.
        </Field>
        <Field nr={190} label="Vollmacht über die steuerliche Beratung · Empfangsvollmacht" optional />
        <Field nr={192} label="Verträge bei Übernahme / Umwandlung" optional />
        <Field nr={193} label="Weitere Unterlagen (Freitext-Aufzählung)" optional />
      </Section>

      {/* ============ TEILSEITE 24 ============ */}
      <Section
        nr="24"
        title="Anhänge"
        intro="Upload der oben angekreuzten Unterlagen."
      >
        <Field label="Anhänge hochladen (nur .pdf / .xml, max. 10 MB pro Datei)">
          Lade hier die in Teilseite 23 angekreuzten Dokumente hoch. Danach: „Prüfen" → „Versenden". Authentifizierung über dein ELSTER-Zertifikat (keine handschriftliche Unterschrift).
        </Field>
      </Section>

      <FinalNotes />
      <CrossLinks />
      <Glossar />

      <Stand2026Footer
        sources={[
          { label: "ELSTER FsE Einzelunternehmen (natürlich)", url: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/fseeun" },
          { label: "ELSTER FsE Kapitalgesellschaft (jur.)", url: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/fsekapg" },
          { label: "§ 138 AO (Anzeigepflicht 1 Monat)", url: "https://www.gesetze-im-internet.de/ao_1977/__138.html" },
          { label: "§ 19 UStG (Kleinunternehmer)", url: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
          { label: "§ 4 Abs. 3 EStG (EÜR)", url: "https://www.gesetze-im-internet.de/estg/__4.html" },
          { label: "§ 20 UStG (Ist-Versteuerung)", url: "https://www.gesetze-im-internet.de/ustg_1980/__20.html" },
          { label: "§ 141 AO (Bilanz-Schwellen 800k/80k)", url: "https://www.gesetze-im-internet.de/ao_1977/__141.html" },
          { label: "§ 48b EStG (Bauabzug-Freistellung)", url: "https://www.gesetze-im-internet.de/estg/__48b.html" },
        ]}
        note="Stand 2026: Struktur anhand der echten ELSTER-Maske (fseeun-202401, 24 Teilseiten) abgeglichen. KU-Grenze 25.000 € Vorjahres-Umsatz / 100.000 € im laufenden Jahr mit sofortigem Wegfall bei Überschreiten; im Gründungsjahr 25.000 € (Reform 2025). USt-Voranmeldung: monatlich >9.000 € / vierteljährlich 2.000–9.000 € / jährlich ≤2.000 € Vorjahres-Zahllast (Werte seit BEG IV 2025). Ist-Versteuerung bis 800.000 € Umsatz (§ 20 UStG). Bilanz-Pflicht ab 800.000 € Umsatz oder 80.000 € Gewinn (§ 141 AO). Frist FsE-Abgabe: 1 Monat ab Tätigkeitsaufnahme (§ 138 AO). 5-Jahres-Bindung bei Verzicht auf § 19 KU. ELSTER-Zeilennummern können je Formular-Version geringfügig variieren — Feld-Bezeichnungen bleiben gleich."
      />
    </CockpitShell>
  );
};

// ============================================================================
// Sub-Components
// ============================================================================

const TEILSEITEN_NAV = Array.from({ length: 25 }, (_, i) => String(i));

const HeroBlock = () => (
  <ToolSection
    title="So nutzt du den Begleiter"
    description="ELSTER in einem Tab, diese Seite im zweiten. Teilseite für Teilseite nachlesen, dann eintragen."
    icon={Lightbulb}
    className="mb-6"
  >
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {[
        <>ELSTER-Konto erstellen, falls noch nicht vorhanden. Die Registrierung dauert laut ELSTER bis zu 10 Werktage (Aktivierungs-Code per Brief).</>,
        <>In ELSTER den „Fragebogen zur steuerlichen Erfassung für Einzelunternehmen" öffnen.</>,
        <>Diese Seite <strong>parallel</strong> öffnen (zweiter Tab oder Monitor).</>,
        <>Teilseiten in der Reihenfolge unten durchgehen: hier nachlesen, dann in ELSTER eintragen.</>,
        <>Bei den 4 verbindlichen Entscheidungen die Empfehlungs-Widgets nutzen.</>,
      ].map((text, i) => (
        <li key={i} className="flex gap-3 rounded-xl border border-border bg-secondary/40 p-3.5 text-sm leading-relaxed text-foreground/85 lg:flex-col lg:gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground tabular">
            {i + 1}
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ol>
    <StatGrid cols={4} className="mt-5">
      <StatTile label="§ 19 KU" value="5 Jahre Bindung" tone="danger" hint="bei Verzicht auf § 19 UStG" />
      <StatTile label="§ 138 AO" value="Frist 1 Monat" tone="warning" hint="ab Aufnahme der Tätigkeit" />
      <StatTile label="Umfang" value="24 Teilseiten" tone="success" hint="echtes ELSTER-Formular" />
      <StatTile label="Dauer" value="60–120 Min" tone="info" hint="mit diesem Begleiter" />
    </StatGrid>
    <nav aria-label="Springe zu Teilseite" className="mt-5 border-t border-border/70 pt-4">
      <p className="mb-2 text-sm font-medium text-foreground">Springe zu Teilseite</p>
      <div className="flex flex-wrap gap-1.5">
        {TEILSEITEN_NAV.map((nr) => (
          <a
            key={nr}
            href={`#teilseite-${nr}`}
            className="flex h-8 min-w-[2rem] items-center justify-center rounded-lg border border-border bg-card px-2 text-xs font-medium text-foreground/80 tabular transition-colors hover:border-accent-blue/40 hover:text-accent-blue"
          >
            {nr === "0" ? "Start" : nr}
          </a>
        ))}
      </div>
    </nav>
  </ToolSection>
);

const ElsterLinks = () => (
  <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2">
    {[
      { href: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/fseeun", t: "FsE für Einzelunternehmen", d: "Solo-Gewerbe, Freiberufler, e.K.", primary: true },
      { href: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/fsekapg", t: "FsE für Kapitalgesellschaften", d: "UG, GmbH, AG, eG", primary: false },
    ].map((l) => (
      <a
        key={l.href}
        href={l.href}
        target="_blank"
        rel="noreferrer"
        className={`press group flex items-center justify-between gap-3 rounded-2xl border p-4 shadow-card transition-colors ${
          l.primary ? "border-accent-blue/30 bg-accent hover:border-accent-blue/50" : "border-border bg-card hover:border-accent-blue/40"
        }`}
      >
        <div className="min-w-0">
          <div className="text-sm font-semibold text-foreground">{l.t}</div>
          <div className="mt-0.5 text-sm text-muted-foreground">{l.d}</div>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent-blue">
          In ELSTER öffnen <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </span>
      </a>
    ))}
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
  <details
    id={`teilseite-${nr}`}
    open={!collapsedByDefault}
    className="group mb-3 scroll-mt-24 rounded-2xl border border-border bg-card shadow-card [&_summary::-webkit-details-marker]:hidden"
  >
    <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-4 md:px-6">
      <span className="flex h-8 min-w-[2rem] shrink-0 items-center justify-center rounded-lg bg-accent px-2 text-sm font-semibold text-accent-blue tabular">
        {nr}
      </span>
      <div className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-muted-foreground">{nr === "0" ? "Vor den Teilseiten" : `Teilseite ${nr}`}</span>
        <h2 className="text-base font-semibold leading-snug tracking-tight">{title}</h2>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{intro}</p>
      </div>
      <ChevronDown className="mt-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <div className="space-y-2 border-t border-border/70 px-4 pb-5 pt-4 md:px-6">
      {warn && (
        <Callout tone="danger" className="mb-3">
          {warn}
        </Callout>
      )}
      {children}
    </div>
  </details>
);

const Field = ({ nr, label, optional, children }: {
  nr?: number;
  label: string;
  optional?: boolean;
  children?: React.ReactNode;
}) => (
  <div className="flex gap-3 rounded-xl border border-border/70 bg-secondary/30 p-3.5">
    {nr != null && (
      <span
        className="mt-0.5 flex h-6 min-w-[2.75rem] shrink-0 items-center justify-center rounded-md border border-border bg-card px-1.5 text-[11px] font-medium text-muted-foreground tabular"
        aria-label={`ELSTER-Zeile ${nr}`}
      >
        Z. {nr}
      </span>
    )}
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-sm font-medium leading-snug text-foreground">{label}</span>
        {optional && <ToneBadge>optional</ToneBadge>}
      </div>
      {children && <div className="mt-1.5 text-sm leading-relaxed text-foreground/75 [&_ul]:mt-1.5">{children}</div>}
    </div>
  </div>
);

const ToolNote = ({ children }: { children: React.ReactNode }) => (
  <Callout tone="info" className="mt-2 p-3">
    {children}
  </Callout>
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
    <div className="my-3 rounded-xl border border-accent-blue/25 bg-accent/60">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:text-accent-blue"
        >
          <span className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-card text-accent-blue">
              <Lightbulb className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              {title}
              <span className="sr-only"> · </span>
              <span className="block text-xs font-normal text-accent-blue">Empfehlung anzeigen</span>
            </span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
        </button>
      ) : (
        <div className="space-y-4 p-4">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-card text-accent-blue">
              <Lightbulb className="h-4 w-4" aria-hidden="true" />
            </span>
            {title}
          </div>
          {questions.map((q) => (
            <div key={q.id}>
              <p className="mb-2 text-sm font-medium text-foreground">{q.q}</p>
              <ChoiceGroup<string>
                size="sm"
                label={q.q}
                value={answers[q.id] ?? ""}
                onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                options={q.options.map((opt) => ({ value: opt.v, label: opt.label }))}
              />
            </div>
          ))}
          {allAnswered ? (
            <Callout tone="success" title="Empfehlung" icon={CheckCircle2}>
              {decide(answers)}
            </Callout>
          ) : (
            <p className="text-xs text-muted-foreground">Beantworte alle Fragen, dann erscheint die Empfehlung.</p>
          )}
        </div>
      )}
    </div>
  );
};

const FinalNotes = () => (
  <Callout tone="warning" title="Vor dem Absenden: letzte Checks" icon={AlertTriangle} className="mb-6 mt-8 p-5">
    <ul className="mt-2 grid gap-x-6 gap-y-2 md:grid-cols-2">
      {[
        <><strong>IdNr</strong> dreimal prüfen (11 Stellen, nicht 13!)</>,
        <><strong>§ 19 KU</strong>-Entscheidung sicher? <strong>5-Jahres-Bindung bei Verzicht!</strong></>,
        <><strong>Ist-Versteuerung</strong> beantragt (wenn passend)?</>,
        <><strong>USt-IdNr</strong>-Häkchen gesetzt (wenn EU-Geschäft möglich)?</>,
        <><strong>IBAN</strong> auf Tippfehler prüfen, falscher Eingang bedeutet Verzögerung</>,
        <><strong>Lastschriftmandat</strong>: ja oder nein bewusst entschieden?</>,
        <><strong>Gewinnermittlungsart</strong>: EÜR vs. Bilanz korrekt?</>,
        <><strong>Vorauszahlungs-Schätzung</strong> realistisch (nicht zu niedrig)?</>,
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <p className="mt-3 text-xs text-muted-foreground">
      Nach dem Absenden: ELSTER-Bestätigungs-Quittung als PDF speichern. Die Steuernummer kommt nach 2–6 Wochen per Post.
    </p>
  </Callout>
);

const CrossLinks = () => (
  <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
    {[
      { to: "/cockpit/gewerbeanmeldung-wizard", t: "Gewerbeanmeldung-Wizard", d: "GewA1 erledigen, bevor du den FsE machst", icon: ArrowLeft },
      { to: "/cockpit/schwellen-check", t: "Schwellen-Check", d: "Die KU-Grenzen 25k/100k nach §19 verstehen", icon: ArrowRight },
      { to: "/cockpit/erste-schritte-roadmap", t: "90-Tage-Roadmap", d: "Was nach dem FsE kommt", icon: ArrowRight },
    ].map((l) => (
      <Link
        key={l.to}
        to={l.to}
        className="press group flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-card transition-colors hover:border-accent-blue/40"
      >
        <div className="min-w-0">
          <div className="text-sm font-semibold text-foreground">{l.t}</div>
          <div className="mt-0.5 text-sm text-muted-foreground">{l.d}</div>
        </div>
        <l.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-blue" aria-hidden="true" />
      </Link>
    ))}
  </div>
);

const Glossar = () => (
  <details className="group mb-6 rounded-2xl border border-border bg-card shadow-card [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-base font-semibold md:px-6">
      <span className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-blue">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        Glossar: FsE-Begriffe einfach erklärt
      </span>
      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <dl className="divide-y divide-border/70 border-t border-border/70 px-5 md:px-6">
      {[
        { b: "FsE (Fragebogen zur steuerlichen Erfassung)", e: "Pflicht-Online-Formular bei ELSTER, das jeder Selbstständige innerhalb 1 Monat nach Tätigkeitsaufnahme abgeben muss (§ 138 AO). Hier teilt das FA dir die Steuernummer zu, legt Vorauszahlungen + USt-Status fest. 100 % digital, kein Papier. Beim Einzelunternehmen 24 Teilseiten." },
        { b: "Steuer-ID (IdNr) vs. Steuernummer", e: "IdNr = 11-stellige LEBENSLANGE Nummer vom BZSt, bekommst du bei Geburt/Zuwanderung. Steuernummer = vom Wohnsitz-FA zugeteilt, ändert sich bei Umzug. Im FsE brauchst du die IdNr; die Steuernummer KOMMT NACH der FsE-Abgabe." },
        { b: "§ 19 UStG Kleinunternehmer (Reform 2025)", e: "Wahl-Recht: Wenn Vorjahres-Umsatz ≤ 25.000 € UND Umsatz im laufenden Jahr ≤ 100.000 € (Überschreiten = sofortiger Wegfall ab dem Umsatz, der die Grenze übersteigt); im Gründungsjahr ≤ 25.000 €. Vorteil: keine USt-Ausweisung, keine USt-VA. Nachteil: kein Vorsteuer-Abzug. ⚠ Der Verzicht bindet 5 Jahre." },
        { b: "EÜR vs. Bilanzierung", e: "EÜR (§ 4 Abs. 3 EStG) = einfache Zufluss/Abfluss-Rechnung. Pflicht für Bilanz: Kap.-Ges. IMMER, Gewerbe ab 800k Umsatz/80k Gewinn (§ 141 AO), Freiberuf NIE." },
        { b: "Soll- vs. Ist-Versteuerung", e: "Soll = USt fällig im Monat der Rechnungsstellung. Ist = USt fällig erst nach Vereinnahmung. Ist hat Cashflow-Vorteil, möglich bei Umsatz < 800k (§ 20 UStG) oder Freiberuf (immer)." },
        { b: "USt-Voranmeldungs-Rhythmus (2026)", e: "Das FA bestimmt nach der Vorjahres-Zahllast: monatlich > 9.000 €, vierteljährlich 2.000–9.000 €, jährlich (keine VA) ≤ 2.000 €. Grenzen seit BEG IV (01.01.2025) angehoben (vorher 7.500/1.000). Frist: 10. Tag nach Zeitraum-Ende." },
        { b: "Vorauszahlungen ESt + GewSt", e: "Quartalsweise: ESt am 10.3., 10.6., 10.9., 10.12. (§ 37 EStG); GewSt an die Gemeinde am 15.2., 15.5., 15.8., 15.11. (§ 19 GewStG). Festsetzung erst ab voraussichtl. Jahressteuer ≥ 400 € (§ 37 EStG). Bei zu niedriger Schätzung: nach 15 Monaten Karenz 1,8 %/Jahr (0,15 %/Monat) Nachzahlungszinsen (§ 233a i. V. m. § 238 Abs. 1a AO)." },
        { b: "USt-IdNr parallel beantragen", e: "Im FsE (Teilseite 18, Z.158) direkt mit ankreuzen — kommt zusammen mit der Steuernummer. Sonst später separat beim BZSt (2–4 Wochen)." },
        { b: "Pflicht-Frist § 138 AO", e: "Einreichung innerhalb 1 Monat ab Tätigkeitsaufnahme (§ 138 Abs. 1b, Abs. 4 AO). Der FsE ist keine Steuererklärung, ein Verspätungszuschlag nach § 152 AO fällt nicht an; das FA kann die Abgabe aber per Zwangsgeld (§ 328 AO) durchsetzen und Besteuerungsgrundlagen schätzen." },
        { b: "OSS / IOSS", e: "One-Stop-Shop (Teilseite 20) für EU-B2C-Versandhandel ab 10.000 €/Jahr in EU-Länder. IOSS für Importe aus Drittländern bis 150 € an EU-Privatkunden. Beides vereinfacht Steuermeldung in EU-Ländern." },
        { b: "Reverse Charge § 13b UStG", e: "Bei B2B-Leistungen an EU-Ausland: Leistungsempfänger schuldet USt in seinem Land. Du stellst Rechnung netto + Hinweis 'Steuerschuldnerschaft des Leistungsempfängers'. USt-IdNr beider Parteien Pflicht." },
      ].map((g) => (
        <div key={g.b} className="py-3.5">
          <dt className="text-sm font-semibold text-foreground">{g.b}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.e}</dd>
        </div>
      ))}
    </dl>
  </details>
);

export default FseWizard;
