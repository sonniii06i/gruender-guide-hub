/**
 * FseWizard — "Fragebogen zur steuerlichen Erfassung (FsE) — Vollständiger Erklär-Begleiter"
 *
 * Read-only 1:1 Walkthrough aller ~22 Teilseiten des ELSTER-FsE für
 * natürliche Personen (Einzelunternehmer, Freiberufler). Jedes Feld
 * mit ELSTER-Zeilen-Nummer und Erklärung was zu beantworten ist.
 *
 * Bei den binding-critical Entscheidungen (KU §19, EÜR vs Bilanz,
 * Soll vs Ist, USt-IdNr) interaktive Mini-Empfehlungs-Widgets.
 *
 * Hinweis: ELSTER-Zeilen-Nummern können je nach Formular-Version
 * geringfügig variieren — die hier angegebenen entsprechen der
 * Standard-Reihenfolge des FsE EUn 2025/2026. Wenn die Nummern in
 * deiner ELSTER-Session leicht abweichen, ist die Feld-Bezeichnung
 * trotzdem identisch.
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
      title="Fragebogen zur steuerlichen Erfassung (FsE) — Vollständiger Erklär-Begleiter"
      subtitle="1:1 Walkthrough aller ~22 Teilseiten des ELSTER-FsE in der Reihenfolge wie sie abgefragt werden. Jedes Feld mit Zeilen-Nummer + Erklärung was zu beantworten ist. Für die 4 verbindlichen Entscheidungen (KU §19, EÜR/Bilanz, Soll/Ist, USt-IdNr) gibt's Empfehlungs-Widgets. Du füllst direkt in ELSTER aus, diese Seite liest parallel mit."
    >
      <HeroBlock />
      <ElsterLinks />

      {/* ============ TEILSEITE 0 ============ */}
      <Section
        nr="0"
        title="Startseite — Steuernummer + Finanzamt"
        intro="Bevor du loslegst: existiert schon eine Steuernummer? Welches FA ist zuständig?"
      >
        <Field nr={1} label='Datenübernahme aus „Mein ELSTER"' optional>
          Wenn du bei ELSTER schon ein Profil hast: ja → spart Tipparbeit (Name, Adresse, IdNr).
        </Field>
        <Field nr={2} label="Steuernummer">
          Hast du <strong>schon eine Steuernummer</strong> beim FA (z.B. aus Arbeitnehmer-Veranlagung)?
          → eintragen. Sonst leer lassen — neue Nummer kommt nach Abgabe per Post.
        </Field>
        <Field nr={3} label="Bundesland + Finanzamt">
          Auswahl-Dropdown. Zuständig ist das FA an deinem <strong>Wohnsitz</strong> (nicht Betriebsstätte!) bei ESt; bei USt ggf. ein anderes FA für Großstädte.
        </Field>
      </Section>

      {/* ============ TEILSEITE 1 ============ */}
      <Section
        nr="1"
        title="Angaben zur Person (Zeilen 1-12)"
        intro="Deine persönlichen Stammdaten."
      >
        <Field nr={1} label="Anrede">Herr / Frau / divers / keine Angabe.</Field>
        <Field nr={2} label="Titel" optional>Dr., Prof. etc. falls vorhanden.</Field>
        <Field nr={3} label="Familienname">Wie im Personalausweis.</Field>
        <Field nr={4} label="Geburtsname" optional>Nur falls abweichend (z.B. nach Heirat).</Field>
        <Field nr={5} label="Vorname(n)">Alle Vornamen wie im Ausweis.</Field>
        <Field nr={6} label="Geburtsdatum">TT.MM.JJJJ.</Field>
        <Field nr={7} label="Geburtsort">Stadt + ggf. Land.</Field>
        <Field nr={8} label="Geschlecht">männlich / weiblich / divers.</Field>
        <Field nr={9} label="Staatsangehörigkeit">Deutsch oder andere. Bei Nicht-EU: Aufenthaltstitel-Daten in Sektion 5.</Field>
        <Field nr={10} label="Ausgeübter Beruf">
          Dein <strong>Hauptberuf</strong> (auch wenn parallel angestellt). Z.B. „Web-Entwickler", „Grafikdesignerin", „Online-Händlerin".
        </Field>
        <Field nr={11} label="Identifikationsnummer (IdNr)">
          <strong>11-stellig</strong> vom BZSt. Steht auf deinem letzten ESt-Bescheid oder dem Schreiben das du nach Geburt/Zuwanderung bekommen hast.
          <ToolNote>Verloren? Online beim BZSt neu anfordern (~6 Wochen Postlaufzeit).</ToolNote>
        </Field>
        <Field nr={12} label="Religion">
          Für KiSt-Berechnung: rk (römisch-katholisch), ev (evangelisch), oder keine/ausgetreten = 0% KiSt.
        </Field>
      </Section>

      {/* ============ TEILSEITE 2 ============ */}
      <Section
        nr="2"
        title="Anschrift Wohnsitz + Kontakt (Zeilen 13-25)"
        intro="Wo wohnst du, wie erreicht dich das FA."
      >
        <Field nr={13} label="Straße + Hausnummer">Deine Privatadresse.</Field>
        <Field nr={14} label="Adressergänzung" optional>Z.B. „c/o Müller", „2. OG links".</Field>
        <Field nr={15} label="Postleitzahl">5-stellig.</Field>
        <Field nr={16} label="Ort">Wohnort.</Field>
        <Field nr={17} label="Land" optional>Nur falls Wohnsitz im Ausland.</Field>
        <Field nr={18} label="Telefon (Festnetz)" optional>Mit Vorwahl.</Field>
        <Field nr={19} label="Mobil" optional />
        <Field nr={20} label="E-Mail-Adresse">
          Hier landen ELSTER-Postfach-Nachrichten + ggf. Bescheid-Benachrichtigungen. <strong>Aktiv genutzte</strong> Adresse angeben.
        </Field>
        <Field nr={21} label="Bestätigung E-Mail" optional>Bei manchen FA: nochmal eintippen.</Field>
        <Field nr={22} label="Webseite" optional>Wenn vorhanden.</Field>
        <Field nr={23} label="Familienstand">
          ledig / verheiratet / eingetragene Lebenspartnerschaft / geschieden / verwitwet / dauernd getrennt lebend.
        </Field>
        <Field nr={24} label="Datum der Familienstand-Änderung" optional>Bei Heirat/Scheidung: das Datum.</Field>
        <Field nr={25} label="Bisheriger Familienstand" optional>Bei Änderung: alter Status.</Field>
      </Section>

      {/* ============ TEILSEITE 3 ============ */}
      <Section
        nr="3"
        title="Ehegatte / Lebenspartner (Zeilen 26-42)"
        intro="Nur ausfüllen wenn verheiratet oder eingetragene Lebenspartnerschaft. Sonst überspringen."
      >
        <Field nr={26} label="Anrede + Titel Partner" optional />
        <Field nr={27} label="Familienname Partner" optional />
        <Field nr={28} label="Geburtsname Partner" optional />
        <Field nr={29} label="Vorname Partner" optional />
        <Field nr={30} label="Geburtsdatum Partner" optional />
        <Field nr={31} label="Geburtsort Partner" optional />
        <Field nr={32} label="Geschlecht Partner" optional />
        <Field nr={33} label="Staatsangehörigkeit Partner" optional />
        <Field nr={34} label="Ausgeübter Beruf Partner" optional />
        <Field nr={35} label="IdNr Partner" optional>
          <strong>Wichtig für Splitting</strong> bei Zusammenveranlagung. Ohne IdNr keine Splitting-Vorteilsberechnung in der Vorauszahlung.
        </Field>
        <Field nr={36} label="Steuernummer Partner" optional />
        <Field nr={37} label="Religion Partner" optional />
        <Field nr={38} label="Anschrift Partner" optional>
          Falls vom eigenen Wohnsitz abweichend (z.B. dauernd getrennt lebend → andere Veranlagung).
        </Field>
        <Field nr={39} label="Telefon/E-Mail Partner" optional />
        <Field nr={40} label="Ehe-/Lebenspartnerschaftsdatum" optional>Datum der Schließung.</Field>
        <Field nr={41} label="Bei Verwitwung: Sterbedatum" optional />
        <Field nr={42} label="Bei Scheidung: Datum + Aktenzeichen" optional />
      </Section>

      {/* ============ TEILSEITE 4 ============ */}
      <Section
        nr="4"
        title="Bankverbindungen für Erstattungen (Zeilen 43-55)"
        intro="Wohin überweist das FA Steuer-Erstattungen."
      >
        <Field nr={43} label="Kontoinhaber">
          Falls du = Kontoinhaber: Häkchen „identisch mit Antragsteller". Sonst Name eintragen.
        </Field>
        <Field nr={44} label="IBAN">DE… (deutsches Konto) oder ausländische IBAN.</Field>
        <Field nr={45} label="BIC" optional>Bei deutscher IBAN: automatisch vorausgefüllt.</Field>
        <Field nr={46} label="Kreditinstitut-Name" optional>Auto-vorausgefüllt.</Field>
        <Field nr={47} label="Land Kreditinstitut" optional>Nur bei Auslandskonto.</Field>
        <Field nr={48} label="Abweichende Bankverbindung für Lohnsteuer-Erstattungen" optional>
          Selten — nur wenn LSt-Rückzahlungen auf ein anderes Konto sollen als ESt.
        </Field>
        <Field nr={49} label="IBAN LSt-Erstattungs-Konto" optional />
        <Field nr={50} label="BIC LSt-Erstattungs-Konto" optional />
        <Field nr={51} label="Abweichende Bankverbindung für USt-Erstattungen" optional>
          Selten — wenn USt-Rückflüsse auf ein anderes Konto sollen (z.B. USt aufs Geschäftskonto, ESt aufs Privatkonto).
        </Field>
        <Field nr={52} label="IBAN USt-Erstattungs-Konto" optional />
        <Field nr={53} label="BIC USt-Erstattungs-Konto" optional />
        <Field nr={54} label="Land USt-Konto" optional />
        <Field nr={55} label="Bemerkung Bankverbindung" optional />
      </Section>

      {/* ============ TEILSEITE 5 ============ */}
      <Section
        nr="5"
        title="SEPA-Lastschriftmandat (Zeilen 56-68)"
        intro="Darf das FA Steuern + Vorauszahlungen automatisch abbuchen?"
      >
        <Field nr={56} label="SEPA-Lastschriftmandat erteilen?">
          <strong>JA</strong> = FA bucht automatisch ab → kein Säumniszuschlag wegen verpasster Fristen.<br />
          <strong>NEIN</strong> = du überweist jedes Mal selbst → mehr Cashflow-Kontrolle, mehr Verspätungsrisiko.
          <br /><br />
          <strong>Empfehlung:</strong> JA, separates Geschäftskonto mit Puffer.
        </Field>
        <Field nr={57} label="Mandatsreferenz" optional>Vom FA vergeben — leer lassen.</Field>
        <Field nr={58} label="IBAN Lastschriftkonto">
          Meist gleich wie Erstattungskonto. Anderes Konto möglich (z.B. nur Steuer-Konto).
        </Field>
        <Field nr={59} label="BIC Lastschriftkonto" optional />
        <Field nr={60} label="Kontoinhaber Lastschriftkonto" optional />
        <Field nr={61} label="Mandat gilt für: ESt-Vorauszahlungen" optional>Häkchen.</Field>
        <Field nr={62} label="Mandat gilt für: USt" optional />
        <Field nr={63} label="Mandat gilt für: Lohnsteuer" optional />
        <Field nr={64} label="Mandat gilt für: GewSt (Gemeinde abbucht)" optional />
        <Field nr={65} label="Mandat gilt für: Sonstige Abgaben" optional />
        <Field nr={66} label="Ort der Mandatserteilung" optional />
        <Field nr={67} label="Datum Mandatserteilung" optional />
        <Field nr={68} label="Unterschrift" optional>Bei elektronischer Abgabe: ELSTER-Zertifikat.</Field>
      </Section>

      {/* ============ TEILSEITE 6 ============ */}
      <Section
        nr="6"
        title="Steuerliche Beratung (Zeilen 69-79)"
        intro="Hast du einen Steuerberater? Bekommt der die Bescheide?"
      >
        <Field nr={69} label="Steuerberater vorhanden?">
          Ja/Nein. Bei „Nein" alle folgenden Felder leer lassen.
        </Field>
        <Field nr={70} label="Name StB / Kanzlei" optional />
        <Field nr={71} label="Anschrift Kanzlei" optional />
        <Field nr={72} label="Telefon Kanzlei" optional />
        <Field nr={73} label="E-Mail Kanzlei" optional />
        <Field nr={74} label="Steuerberater-Identifikationsnummer (StB-ID)" optional>
          Falls bekannt — beschleunigt Validierung.
        </Field>
        <Field nr={75} label="Bekanntgabe-Vollmacht erteilen?" optional>
          JA → FA sendet alle Bescheide auch an den StB. <strong>Empfehlung wenn StB vorhanden.</strong>
        </Field>
        <Field nr={76} label="Vollmachtsumfang" optional>
          „Empfangsbevollmächtigung" oder „umfassende Vertretungsvollmacht".
        </Field>
        <Field nr={77} label="Vollmacht für Lohnsteuer-Anmeldungen?" optional />
        <Field nr={78} label="Vollmacht für USt-Voranmeldungen?" optional />
        <Field nr={79} label="Bemerkung zu Vollmacht" optional />
      </Section>

      {/* ============ TEILSEITE 7 ============ */}
      <Section
        nr="7"
        title="Empfangsbevollmächtigte (Zeilen 80-88)"
        intro="Nur relevant für Ausländer ohne Wohnsitz in DE — sonst überspringen."
      >
        <Field nr={80} label="Empfangsbevollmächtigten benennen?" optional />
        <Field nr={81} label="Name Bevollmächtigter" optional />
        <Field nr={82} label="Anschrift Bevollmächtigter" optional />
        <Field nr={83} label="Telefon Bevollmächtigter" optional />
        <Field nr={84} label="E-Mail Bevollmächtigter" optional />
        <Field nr={85} label="Vollmachtsumfang" optional />
        <Field nr={86} label="Datum Vollmachts-Erteilung" optional />
        <Field nr={87} label="Bemerkung" optional />
        <Field nr={88} label="Sterbedatum Bevollmächtigter (bei Tod)" optional />
      </Section>

      {/* ============ TEILSEITE 8 ============ */}
      <Section
        nr="8"
        title="Bisherige persönliche Verhältnisse (Zeilen 89-100)"
        intro="Frühere Wohnsitze + frühere Steuernummern — nur die letzten 3-5 Jahre relevant."
      >
        <Field nr={89} label="Frühere Anschrift" optional>Falls innerhalb 12 Monaten umgezogen.</Field>
        <Field nr={90} label="Datum Wegzug" optional />
        <Field nr={91} label="Datum Zuzug" optional />
        <Field nr={92} label="Frühere Steuernummer" optional />
        <Field nr={93} label="Früheres Finanzamt" optional />
        <Field nr={94} label="Bisherige Veranlagung erfolgt?" optional />
        <Field nr={95} label="Bei Eheschließung im aktuellen Jahr: Daten" optional />
        <Field nr={96} label="Bei Scheidung: Daten" optional />
        <Field nr={97} label="Aufenthaltstitel (bei Ausländern)" optional>Art, Nummer, Gültigkeit.</Field>
        <Field nr={98} label="Selbstständigkeits-Erlaubnis (bei Nicht-EU)" optional>Bei Drittstaatlern Pflicht.</Field>
        <Field nr={99} label="Bisherige selbstständige Tätigkeit innerhalb 5 Jahre?" optional />
        <Field nr={100} label="Daten frühere Selbstständigkeit" optional>Tätigkeit, Zeitraum, FA.</Field>
      </Section>

      {/* ============ TEILSEITE 9 ============ */}
      <Section
        nr="9"
        title="Angaben zum Unternehmen (Zeilen 101-115)"
        intro="Was machst du, wo, seit wann."
      >
        <Field nr={101} label="Art der Tätigkeit (Bezeichnung)">
          <strong>Konkret</strong> beschreiben — generische Begriffe lehnt das FA ab:
          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
            <li>❌ Schlecht: „Online-Handel", „Beratung", „Marketing"</li>
            <li>✅ Gut: „Online-Handel mit selbst hergestelltem Silberschmuck via Shopify + Etsy"</li>
          </ul>
          <ToolNote>
            Qualitäts-Check der Beschreibung gibt der{" "}
            <Link to="/cockpit/gewerbeanmeldung-wizard" className="underline text-accent-blue">Gewerbeanmeldung-Wizard Step 4</Link>.
          </ToolNote>
        </Field>
        <Field nr={102} label="Firmierung / Geschäftsname" optional>
          Bei Einzel: optional (z.B. „Max Mustermann Beratung"). Bei UG/GmbH: Pflicht mit Rechtsform-Zusatz.
        </Field>
        <Field nr={103} label="Wirtschaftsklassifikation (WZ-2008-Code)" optional>
          5-stelliger Code. Falls bekannt vom GewA1 → eintragen. Sonst leer (FA ergänzt anhand der Tätigkeitsbeschreibung).
        </Field>
        <Field nr={104} label="Anschrift Geschäftsleitung — Straße/Nr.">
          Bei Home Office: identisch mit Wohnanschrift ankreuzen.
        </Field>
        <Field nr={105} label="Anschrift Geschäftsleitung — PLZ/Ort" />
        <Field nr={106} label="Anschrift Geschäftsleitung — Land" optional />
        <Field nr={107} label="Postfach Unternehmen" optional />
        <Field nr={108} label="Telefon geschäftlich" optional />
        <Field nr={109} label="Telefax geschäftlich" optional />
        <Field nr={110} label="E-Mail geschäftlich" optional />
        <Field nr={111} label="Webseite Unternehmen" optional />
        <Field nr={112} label="Eintragung im Handelsregister?">
          Ja/Nein. Bei Einzel meist nein, außer freiwillige Eintragung als e.K.
        </Field>
        <Field nr={113} label="Registergericht" optional>Bei HRA/HRB-Eintragung.</Field>
        <Field nr={114} label="Register-Nummer" optional>HRA-Nr. (Einzel/Pers-Ges.) oder HRB-Nr. (Kap.-Ges.).</Field>
        <Field nr={115} label="Datum Handelsregister-Eintragung" optional />
      </Section>

      {/* ============ TEILSEITE 10 ============ */}
      <Section
        nr="10"
        title="Gründungsform + Vorgänger (Zeilen 116-130)"
        intro="Wie ist das Unternehmen entstanden?"
      >
        <Field nr={116} label="Tag des Beginns der Tätigkeit">
          Datum der <strong>ersten tatsächlichen Aktivität</strong>. Darf in der Vergangenheit liegen (rückwirkende Anmeldung).
        </Field>
        <Field nr={117} label="Gründungsform">
          Eine ankreuzen:
          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
            <li>Neugründung (Default für Erstgründer)</li>
            <li>Übernahme (Asset-Deal)</li>
            <li>Umwandlung (z.B. Einzel → UG)</li>
            <li>Verlegung aus anderem FA-Bezirk</li>
            <li>Wiedereröffnung (vorher abgemeldet)</li>
          </ul>
        </Field>
        <Field nr={118} label="Datum Übernahme/Umwandlung" optional />
        <Field nr={119} label="Name Vorgänger / früherer Inhaber" optional />
        <Field nr={120} label="Anschrift Vorgänger" optional />
        <Field nr={121} label="Steuernummer Vorgänger" optional />
        <Field nr={122} label="Finanzamt Vorgänger" optional />
        <Field nr={123} label="Bei Umwandlung: bisherige Rechtsform" optional />
        <Field nr={124} label="Bei Umwandlung: Umwandlungsart" optional>
          Formwechsel, Verschmelzung, Spaltung etc. (selten bei Solo).
        </Field>
        <Field nr={125} label="Übertragungsstichtag" optional />
        <Field nr={126} label="Vorbesitzer-Buchwerte fortführen?" optional />
        <Field nr={127} label="Daten Notar / Vertragsurkunde" optional />
        <Field nr={128} label="Erworbene Vermögensgegenstände" optional>Liste / Verweis auf Anlage.</Field>
        <Field nr={129} label="Übernommene Schulden" optional />
        <Field nr={130} label="Kaufpreis Übernahme" optional />
      </Section>

      {/* ============ TEILSEITE 11 ============ */}
      <Section
        nr="11"
        title="Weitere Betriebsstätten (Zeilen 131-140)"
        intro="Mehrere Standorte? Sonst überspringen."
      >
        <Field nr={131} label="Weitere Betriebsstätten vorhanden?">Ja/Nein.</Field>
        <Field nr={132} label="Betriebsstätte 1 — Anschrift" optional />
        <Field nr={133} label="Betriebsstätte 1 — Art (Filiale, Lager, Produktion)" optional />
        <Field nr={134} label="Betriebsstätte 1 — Telefon" optional />
        <Field nr={135} label="Betriebsstätte 1 — Datum Errichtung" optional />
        <Field nr={136} label="Betriebsstätte 2 — Anschrift" optional />
        <Field nr={137} label="Betriebsstätte 2 — Art" optional />
        <Field nr={138} label="Betriebsstätte 2 — Datum" optional />
        <Field nr={139} label='Anlage „weitere Betriebsstätten"' optional>Bei {">"} 2 Stätten zusätzliche Anlage.</Field>
        <Field nr={140} label="Lohnsteuerliche Betriebsstätte" optional>
          Bei mehreren Stätten: welche ist für LSt-Anmeldung zuständig (meist Hauptsitz).
        </Field>
      </Section>

      {/* ============ TEILSEITE 12 ============ */}
      <Section
        nr="12"
        title="Bisherige betriebliche Verhältnisse (Zeilen 141-150)"
        intro="Frühere Selbstständigkeit der letzten 5 Jahre? Sonst überspringen."
      >
        <Field nr={141} label="Bisherige Selbstständigkeit innerhalb 5 Jahre?">Ja/Nein.</Field>
        <Field nr={142} label="Art der früheren Tätigkeit" optional />
        <Field nr={143} label="Zeitraum (von - bis)" optional />
        <Field nr={144} label="Frühere Steuernummer" optional />
        <Field nr={145} label="Früheres Finanzamt" optional />
        <Field nr={146} label="Grund der Beendigung" optional>
          Aufgabe, Übernahme, Insolvenz, Verlegung etc.
        </Field>
        <Field nr={147} label="Bei laufender Parallel-Tätigkeit: Daten" optional />
        <Field nr={148} label="Konzern-/Beteiligungsverhältnisse" optional />
        <Field nr={149} label="Beteiligungen an anderen Unternehmen (>10%)" optional />
        <Field nr={150} label="Bemerkungen zur bisherigen Tätigkeit" optional />
      </Section>

      {/* ============ TEILSEITE 13 ============ */}
      <Section
        nr="13"
        title="Konzern- + Beteiligungsverhältnisse (Zeilen 151-160)"
        intro="Bist du Teil eines Konzerns oder hast Beteiligungen? Bei Solo meist nein."
        collapsedByDefault
      >
        <Field nr={151} label="Beteiligung an einer Personengesellschaft?" optional />
        <Field nr={152} label="Beteiligung an einer Kapitalgesellschaft (>1%)?" optional />
        <Field nr={153} label="Bei Beteiligung: Name + Steuernummer der Gesellschaft" optional />
        <Field nr={154} label="Beteiligungs-Quote (%)" optional />
        <Field nr={155} label="Sind du Geschäftsführer dort?" optional />
        <Field nr={156} label="Konzernzugehörigkeit Mutter-Tochter?" optional />
        <Field nr={157} label="Organschaft (USt/KSt)?" optional />
        <Field nr={158} label="Atypisch stille Beteiligung?" optional />
        <Field nr={159} label="Treuhand-Verhältnisse?" optional />
        <Field nr={160} label="Bemerkungen" optional />
      </Section>

      {/* ============ TEILSEITE 14 ============ */}
      <Section
        nr="14"
        title="Festsetzung der Vorauszahlungen — Einkünfte-Schätzung (Zeilen 161-180)"
        intro="Hieraus berechnet das FA deine quartalsweisen Vorauszahlungen (10.3, 10.6, 10.9, 10.12)."
        warn="REALISTISCH schätzen! Zu hoch = Kapital gebunden, zu niedrig = Nachzahlung + 6%/Jahr Verzugszinsen ab 15. Monat."
      >
        <Field nr={161} label="Voraussichtliche Einkünfte aus Land + Forstwirtschaft" optional>0 für die meisten.</Field>
        <Field nr={162} label="Voraussichtliche Einkünfte aus Gewerbebetrieb">
          <strong>Gewinn</strong> (Umsatz minus Betriebsausgaben), nicht Umsatz! Bei Freiberuf: 0.
          <ToolNote>
            Brutto-Netto-Vorschau:{" "}
            <Link to="/cockpit/brutto-netto-solo" className="underline text-accent-blue">Brutto-Netto Solo →</Link>
          </ToolNote>
        </Field>
        <Field nr={163} label="Voraussichtliche Einkünfte aus selbstständiger Arbeit">
          Bei Freiberuf: Gewinn. Bei Gewerbe: 0.
        </Field>
        <Field nr={164} label="Voraussichtliche Einkünfte aus nichtselbstständiger Arbeit" optional>
          Lohn falls noch angestellt (auch teilzeit / nebenberuflich).
        </Field>
        <Field nr={165} label="Voraussichtliche Einkünfte aus Kapitalvermögen" optional>
          Falls nicht über Abgeltungssteuer abgegolten (z.B. Zinsen vom Privatkredit, ausländische Konten).
        </Field>
        <Field nr={166} label="Voraussichtliche Einkünfte aus Vermietung + Verpachtung" optional>
          Miete minus AfA/Zinsen/Instandhaltung.
        </Field>
        <Field nr={167} label="Sonstige Einkünfte (§22 EStG)" optional>
          Renten (Rürup, Riester etc.), gelegentliche Vermittlungen, Spekulationsgewinne.
        </Field>
        <Field nr={168} label="Bei verheiratet: Einkünfte des Ehegatten" optional />
        <Field nr={169} label="Anzahl Kinder mit Kinderfreibetrag" optional>
          Pro Kind 9.540 € Freibetrag (4.770 € bei Trennung).
        </Field>
        <Field nr={170} label="Voraussichtliche Sonderausgaben" optional>
          KV-Beiträge (oft größter Posten), Vorsorge, Spenden, Schulgeld, Unterhalt.
        </Field>
        <Field nr={171} label="Voraussichtliche außergewöhnliche Belastungen" optional>
          Krankheitskosten, Pflege, Behinderung — über zumutbare Eigenbelastung hinaus.
        </Field>
        <Field nr={172} label="Voraussichtliche Investitionsabzugsbeträge (§ 7g EStG)" optional>
          Bis zu 50% einer geplanten Investition vorab als BA absetzbar.
        </Field>
        <Field nr={173} label="Sonderausgaben Riester" optional>
          Bis 2.100 €/Jahr absetzbar bei Riester-Vertrag.
        </Field>
        <Field nr={174} label="Sonderausgaben Rürup / Basisrente" optional>
          Bis 30.826 €/Jahr (Single 2026), voll absetzbar.
        </Field>
        <Field nr={175} label="bAV-Beiträge" optional>
          Steuer- + SV-frei bis 4% BBG/Jahr.
        </Field>
        <Field nr={176} label="Kirchensteuer-Status (für Vorauszahlung)" optional />
        <Field nr={177} label="Verlustvortrag aus Vorjahren" optional />
        <Field nr={178} label="Erwartete Erstattungs-/Nachzahlungs-Tendenz" optional />
        <Field nr={179} label="Antrag auf Stundung der Vorauszahlung?" optional>
          In Härtefällen möglich, normalerweise nicht.
        </Field>
        <Field nr={180} label="Bemerkungen Vorauszahlungen" optional />
      </Section>

      {/* ============ TEILSEITE 15 ============ */}
      <Section
        nr="15"
        title="Gewinnermittlung (Zeilen 181-185)"
        intro="Wie ermittelst du deinen Gewinn? EÜR vs. Bilanz — bindende Entscheidung pro Jahr."
      >
        <Field nr={181} label="Gewinnermittlungsart">
          <RecommendationCard
            title="EÜR vs. Bilanz — was passt?"
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
          In ELSTER ankreuzen:
          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
            <li>Einnahmen-Überschuss-Rechnung (§ 4 Abs. 3 EStG)</li>
            <li>Vermögensvergleich nach § 4 Abs. 1 EStG (Bilanz ohne HR)</li>
            <li>Vermögensvergleich nach § 5 EStG (Bilanz mit HR-Eintrag)</li>
          </ul>
        </Field>
        <Field nr={182} label="Wirtschaftsjahr">
          <strong>Kalenderjahr</strong> (01.01.–31.12.) ist Standard. Abweichend nur sinnvoll bei saisonalen Geschäften — braucht FA-Zustimmung.
        </Field>
        <Field nr={183} label="Wechsel der Gewinnermittlungsart?" optional>
          Nur bei späterem Wechsel relevant. Erst-Anmelder: leer.
        </Field>
        <Field nr={184} label="Ergänzungsbilanz erforderlich?" optional />
        <Field nr={185} label="Bemerkungen Gewinnermittlung" optional />
      </Section>

      {/* ============ TEILSEITE 16 ============ */}
      <Section
        nr="16"
        title="Freistellungsbescheinigung § 48b EStG — Bauleistungen (Zeilen 186-190)"
        intro="Nur für Bauunternehmer + Handwerk. Sonst überspringen."
        collapsedByDefault
      >
        <Field nr={186} label="Bauleistungen werden erbracht?" optional>
          Ja → Freistellungs-Antrag verhindert dass deine Kunden 15% Bauabzugsteuer einbehalten müssen.
        </Field>
        <Field nr={187} label="Antrag auf Freistellungsbescheinigung" optional />
        <Field nr={188} label="Gültigkeit der Bescheinigung" optional>
          Standard: 3 Jahre. Bei Erst-Antrag oft nur 1 Jahr.
        </Field>
        <Field nr={189} label="Bisherige Freistellungsbescheinigung" optional />
        <Field nr={190} label="Bemerkungen Bauabzug" optional />
      </Section>

      {/* ============ TEILSEITE 17 ============ */}
      <Section
        nr="17"
        title="Lohnsteuer — Arbeitnehmer (Zeilen 191-210)"
        intro="Komplette Sektion überspringen wenn du Solo arbeitest."
        collapsedByDefault
      >
        <Field nr={191} label="Anzahl Arbeitnehmer gesamt" optional>0 = überspringen.</Field>
        <Field nr={192} label="Davon Vollzeit" optional />
        <Field nr={193} label="Davon Teilzeit" optional />
        <Field nr={194} label="Davon geringfügig (Minijob ≤ 538 €)" optional />
        <Field nr={195} label="Davon kurzfristig (≤ 70 Tage/Jahr)" optional />
        <Field nr={196} label="Davon Familienangehörige" optional>
          Hinweis FA prüft Fremdvergleich-Kriterien streng.
        </Field>
        <Field nr={197} label="Davon Auszubildende" optional />
        <Field nr={198} label="Voraussichtliche jährliche Lohnsumme">Brutto-Lohn aller Mitarbeiter.</Field>
        <Field nr={199} label="Voraussichtliche jährliche Lohnsteuer">
          Schätzung der LSt-Summe.
        </Field>
        <Field nr={200} label="Anmeldungszeitraum">
          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
            <li>Monatlich: bei LSt {">"} 5.000 €/Jahr</li>
            <li>Quartalsweise: 1.080 – 5.000 €/Jahr</li>
            <li>Jährlich: bis 1.080 €/Jahr</li>
          </ul>
        </Field>
        <Field nr={201} label="Lohnsteuerliche Betriebsstätte" optional>
          Wo werden Lohnabrechnungen geführt? Meist Hauptsitz.
        </Field>
        <Field nr={202} label="Anschrift Betriebsstätte LSt" optional />
        <Field nr={203} label="Beginn LSt-Abzug" optional>
          Datum des ersten Lohns.
        </Field>
        <Field nr={204} label="Tarifvertrag anwendbar?" optional />
        <Field nr={205} label="Pauschalbesteuerung Minijob mit 2%?" optional />
        <Field nr={206} label="SV-Anmeldung Krankenkasse" optional />
        <Field nr={207} label="Betriebsnummer Arbeitsagentur" optional />
        <Field nr={208} label="UVZ — Unfallversicherungs-Träger (BG)" optional />
        <Field nr={209} label="ELStAM-Verfahren bestätigt" optional />
        <Field nr={210} label="Bemerkungen Lohnsteuer" optional />
      </Section>

      {/* ============ TEILSEITE 18 ============ */}
      <Section
        nr="18"
        title="Umsatzsteuer Allgemein (Zeilen 211-230)"
        intro="Voraussichtliche Umsätze + Voranmeldungs-Zeitraum."
        warn="Mehrere binding-critical Entscheidungen auf dieser + den nächsten Teilseiten. Sorgfältig prüfen."
      >
        <Field nr={211} label="Voraussichtlicher Gesamtumsatz Jahr 1 (Brutto)">
          Brutto-Einnahmen aus Lieferungen/Leistungen. Entscheidet über KU-Status.
        </Field>
        <Field nr={212} label="Voraussichtlicher Gesamtumsatz Jahr 2 (Folgejahr)">
          KU nur möglich wenn Jahr 1 ≤ 25k UND Jahr 2 ≤ 100k.
        </Field>
        <Field nr={213} label="Voraussichtliche USt-Zahllast / Überschuss">
          Schätzung der jährlichen USt — entscheidet über Voranmeldungs-Zeitraum.
        </Field>
        <Field nr={214} label="USt-Voranmeldungs-Zeitraum">
          <strong>Vom FA bestimmt</strong>:
          <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
            <li>Monatlich: USt {">"} 9.000 €/Jahr</li>
            <li>Quartalsweise: 2.000 – 9.000 €/Jahr</li>
            <li>Jährlich: bis 2.000 €/Jahr</li>
          </ul>
        </Field>
        <Field nr={215} label="Bei Gründer: Voranmeldungs-Pflicht" optional>
          Reform 2025: Quartal wieder Standard für Gründer (war vorher 2 Jahre monatlich Pflicht). FA entscheidet.
        </Field>
        <Field nr={216} label="Dauerfristverlängerung beantragen?" optional>
          Verschiebt USt-VA-Frist um 1 Monat. Bei Monats-VA Pflicht zur 1/11-Sondervorauszahlung. Bei Quartal: keine.
        </Field>
        <Field nr={217} label="Sondervorauszahlung (1/11)" optional>
          Bei Dauerfristverlängerung in Monats-VA: 1/11 der Vorjahres-USt als Sondervorauszahlung.
        </Field>
        <Field nr={218} label="Beginn USt-Pflicht / -Voranmeldung">
          Meist gleich Tätigkeitsbeginn.
        </Field>
        <Field nr={219} label="USt-Voranmeldungen elektronisch?" optional>
          Pflicht: ja (ELSTER).
        </Field>
        <Field nr={220} label="Bisherige USt-Pflicht in DE?" optional />
        <Field nr={221} label="Bisherige USt-IdNr (falls vorhanden)" optional />
        <Field nr={222} label="Aktuelle USt-Schuld (offene Beträge)" optional />
        <Field nr={223} label="USt-Liegenschaft / Photovoltaik?" optional>
          Bei PV-Anlage auf eigenem Dach: Spezial-Regel § 12 (3) UStG (0% USt bis 30 kWp).
        </Field>
        <Field nr={224} label="Vorsteuer-Erstattungsanspruch im Erstjahr?" optional>
          Bei großen Anfangs-Investitionen oft hoch — FA prüft.
        </Field>
        <Field nr={225} label="Lieferungen ins EU-Ausland?" optional />
        <Field nr={226} label="Lieferungen in Drittländer?" optional />
        <Field nr={227} label="Sonstige Leistungen an Unternehmer im EU-Ausland?" optional>
          Reverse Charge § 13b UStG.
        </Field>
        <Field nr={228} label="Sonstige Leistungen an Unternehmer im Drittland?" optional />
        <Field nr={229} label="Erwartete Innergemeinschaftliche Erwerbe?" optional />
        <Field nr={230} label="Bemerkungen USt allgemein" optional />
      </Section>

      {/* ============ TEILSEITE 19 ============ */}
      <Section
        nr="19"
        title="Kleinunternehmer-Regelung § 19 UStG (Zeilen 231-240)"
        intro="Eine der wichtigsten Entscheidungen — bindet 5 Jahre."
        warn="§ 19 KU-Wahl bindet dich 5 Jahre! Genau überlegen, besonders bei B2B-Kunden."
      >
        <Field nr={231} label="Kleinunternehmer-Regelung § 19 UStG in Anspruch nehmen?">
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
              if (ans.umsatz === "klein" && ans.kunden === "b2c" && ans.invest === "nein") return "KU §19 — klassischer Fall. Keine USt, einfachere Buchhaltung. ⚠ 5 Jahre Bindung.";
              return "GRENZFALL — Empfehlung: mit StB sprechen (~30 €).";
            }}
          />
        </Field>
        <Field nr={232} label="Verzicht auf Kleinunternehmer-Regelung (Optierung)" optional>
          Nur wenn du UNTER 25k bist ABER trotzdem Regelbesteuerung willst (B2B + Vorsteuer). 5 Jahre Bindung.
        </Field>
        <Field nr={233} label="Voraussichtlicher Umsatz im Gründungsjahr (anteilig)" optional>
          Wenn du nicht zum 01.01. startest: anteilige Hochrechnung auf 12 Monate.
        </Field>
        <Field nr={234} label="Vorjahres-Umsatz (bei Tätigkeits-Aufnahme im Vorjahr)" optional />
        <Field nr={235} label='KU-Spezialfall „Differenzbesteuerung"' optional>
          Bei Wiederverkäufern: Marge zählt, nicht Brutto-Umsatz.
        </Field>
        <Field nr={236} label="KU bei nur steuerfreien Umsätzen?" optional />
        <Field nr={237} label="KU bei nebenberuflich-Status?" optional />
        <Field nr={238} label="Verzichtserklärung schriftlich" optional />
        <Field nr={239} label="Bisherige KU-Wahl bei Vorgänger" optional />
        <Field nr={240} label="Bemerkungen KU" optional />
      </Section>

      {/* ============ TEILSEITE 20 ============ */}
      <Section
        nr="20"
        title="Steuersätze + Versteuerungsart (Zeilen 241-260)"
        intro="Welche USt-Sätze, Soll vs. Ist."
      >
        <Field nr={241} label="Steuersatz 19 % (Regelsteuersatz)" optional>
          Standard für alle Lieferungen/Leistungen außer den Spezial-Ausnahmen.
        </Field>
        <Field nr={242} label="Steuersatz 7 % (ermäßigt)" optional>
          Nur: Lebensmittel, Bücher, Zeitungen, Personenbeförderung kurze Strecken, Hotel-Übernachtung, kulturelle Leistungen, Heilbehandlungen.
        </Field>
        <Field nr={243} label="Steuersatz 0 %" optional>
          Spezial: PV-Anlagen bis 30 kWp (§ 12 Abs. 3 UStG), Goldlieferungen.
        </Field>
        <Field nr={244} label="Steuerbefreite Umsätze § 4 UStG" optional>
          Heilberufe (Nr. 14), Bildungsleistungen (Nr. 21), Versicherungs-/Finanzdienste (Nr. 8, 10, 11).
        </Field>
        <Field nr={245} label="Land- + Forstwirtschaft Pauschalierung § 24 UStG" optional />
        <Field nr={246} label="Soll- vs. Ist-Versteuerung (§§ 16, 20 UStG)">
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
          <strong>Soll-Versteuerung:</strong> USt fällig im Monat der Rechnungsstellung (auch wenn Kunde nicht gezahlt).<br />
          <strong>Ist-Versteuerung:</strong> USt fällig erst nach Zahlungseingang.
        </Field>
        <Field nr={247} label="Antrag auf Ist-Versteuerung" optional>
          Falls du Ist willst: hier explizit beantragen. Bei Freiberuf automatisch genehmigt.
        </Field>
        <Field nr={248} label="Voranmeldungs-Zeitraum (Kalendervierteljahr / Monat)" optional />
        <Field nr={249} label="Vorsteuer-Verteilung bei gemischter Nutzung" optional>
          Bei gemischt privat/betrieblich genutzten Gegenständen (z.B. Auto, Smartphone).
        </Field>
        <Field nr={250} label="Pauschal-Vorsteuer (§ 23 UStG)" optional />
        <Field nr={251} label="Betriebsaufspaltung — Besitzgesellschaft?" optional />
        <Field nr={252} label="Betriebsaufspaltung — Betriebsgesellschaft?" optional />
        <Field nr={253} label="USt-Organschaft als Organträger" optional />
        <Field nr={254} label="USt-Organschaft als Organgesellschaft" optional />
        <Field nr={255} label="Innergemeinschaftliche Dreiecksgeschäfte" optional />
        <Field nr={256} label="Konsignationslager-Regelung (§ 6b UStG)" optional />
        <Field nr={257} label="Lieferung im sog. Reihen-Geschäft" optional />
        <Field nr={258} label="Versteuerung nach vereinnahmten Entgelten beantragt" optional />
        <Field nr={259} label="Antrag auf Nicht-Anwendung der Margenbesteuerung" optional />
        <Field nr={260} label="Bemerkungen Steuersätze / Versteuerung" optional />
      </Section>

      {/* ============ TEILSEITE 21 ============ */}
      <Section
        nr="21"
        title="USt-IdNr + Spezialfälle (Zeilen 261-280)"
        intro="USt-IdNr für EU-Geschäft + diverse Spezial-Anwendungen."
      >
        <Field nr={261} label="USt-Identifikationsnummer (USt-IdNr) beantragen?">
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
              if (ans.eu === "ja") return "JA — USt-IdNr-Häkchen setzen. PFLICHT für EU-B2B (Reverse Charge §13b) und EU-B2C-Plattformen (OSS).";
              if (ans.eu === "vielleicht") return "JA — kostet nichts zusätzlich, ist sofort da. Empfehlung: immer mitbeantragen.";
              return "OPTIONAL — bei reinem DE-Geschäft nicht zwingend. Tipp: trotzdem ankreuzen für Flexibilität.";
            }}
          />
        </Field>
        <Field nr={262} label="Bisherige USt-IdNr (falls vorhanden)" optional />
        <Field nr={263} label="Antrag auf Freistellungsbescheinigung USt 1 TG (Bauleistungen)" optional>
          Nur Bauunternehmer — verhindert dass Auftraggeber USt einbehalten.
        </Field>
        <Field nr={264} label="Bauleistungs-Übergangsregelung" optional />
        <Field nr={265} label="Innergemeinschaftliche Lieferungen — geplant?" optional />
        <Field nr={266} label="Innergemeinschaftliche Erwerbe — geplant?" optional />
        <Field nr={267} label="Lieferschwelle EU-B2C überschritten?" optional>
          Ab 10.000 € pro Jahr in EU: One-Stop-Shop (OSS) statt jedem Land einzeln.
        </Field>
        <Field nr={268} label="OSS-Verfahren beantragen (EU-Schema)" optional>
          Für Versandhandel + elektronische Dienstleistungen an EU-Privatkunden.
        </Field>
        <Field nr={269} label="IOSS-Verfahren (Import One-Stop-Shop)" optional>
          Für Importe aus Drittländern bis 150 € an EU-Privatkunden.
        </Field>
        <Field nr={270} label="Differenzbesteuerung § 25a UStG" optional>
          Für Wiederverkäufer von Gebrauchtwaren (Antiquitäten, Kunst, Second-Hand). USt nur auf Marge.
        </Field>
        <Field nr={271} label="Antrag auf Verzicht auf Differenzbesteuerung" optional />
        <Field nr={272} label="Margenbesteuerung Reiseleistungen § 25 UStG" optional>
          Nur Reiseveranstalter.
        </Field>
        <Field nr={273} label="Reverse Charge Mobilfunkgeräte/Tablets (≥ 5.000 €)" optional />
        <Field nr={274} label="Reverse Charge Goldlieferungen" optional />
        <Field nr={275} label="Reverse Charge Schrott-/Altmaterial-Lieferungen" optional />
        <Field nr={276} label="Reverse Charge Gebäudereinigung" optional />
        <Field nr={277} label="Reverse Charge Strom-/Gaslieferungen" optional />
        <Field nr={278} label="Steuerschuldnerschaft bei Bauleistungen § 13b UStG" optional />
        <Field nr={279} label="Internethandel über elektronische Marktplätze" optional>
          Z.B. Amazon, eBay, Etsy — Plattform haftet bei nicht-registrierten Händlern.
        </Field>
        <Field nr={280} label="Bemerkungen USt-Spezialfälle" optional />
      </Section>

      {/* ============ TEILSEITE 22 ============ */}
      <Section
        nr="22"
        title="Anlagen + Abschluss (Zeilen 281-300)"
        intro="Was muss hochgeladen werden, Abschluss-Versand."
      >
        <Field nr={281} label='Anlage „Gesellschafterliste" (bei Personengesellschaften)' optional />
        <Field nr={282} label='Anlage „Eröffnungsbilanz" (bei Bilanzierung)' optional />
        <Field nr={283} label='Anlage „Gesellschaftsvertrag" (bei GbR)' optional />
        <Field nr={284} label='Anlage „Übernahmevertrag" (bei Übernahme)' optional />
        <Field nr={285} label='Anlage „Kopie Personalausweis"' optional>
          Manchmal angefordert — Vorder- + Rückseite.
        </Field>
        <Field nr={286} label='Anlage „Kopie Aufenthaltstitel" (Ausländer)' optional />
        <Field nr={287} label='Anlage „Steuerberatungs-Vollmacht"' optional />
        <Field nr={288} label='Anlage „Sonstige Unterlagen"' optional />
        <Field nr={289} label='Anlage „Mietvertrag Betriebsstätte"' optional>
          Bei Co-Working / virtueller Adresse oft verlangt.
        </Field>
        <Field nr={290} label="Anlagen-Datei-Größe (max 5 MB pro Datei)" optional />
        <Field nr={291} label="Bestätigung Richtigkeit der Angaben">
          Pflicht-Häkchen vor Absenden.
        </Field>
        <Field nr={292} label="Bestätigung Kenntnis der steuerlichen Folgen">
          Pflicht-Häkchen (besonders KU 5-Jahres-Bindung).
        </Field>
        <Field nr={293} label="Versand-Datum" optional>Wird automatisch gesetzt.</Field>
        <Field nr={294} label="Authentifizierung (ELSTER-Zertifikat)">
          ELSTER signiert elektronisch — keine handschriftliche Unterschrift.
        </Field>
        <Field nr={295} label="Bestätigungs-Quittung speichern">
          Nach Absenden: PDF-Quittung herunterladen + sicher ablegen.
        </Field>
        <Field nr={296} label="Druckansicht erstellen" optional>
          Für eigene Akten — die ausgefüllten Antworten als PDF speichern.
        </Field>
        <Field nr={297} label="Steuer-Nummer wird zugeteilt in 2-6 Wochen">
          Per Post + ELSTER-Postfach.
        </Field>
        <Field nr={298} label="USt-IdNr wird zugeteilt (falls beantragt) ähnlich schnell">
          Vom BZSt, separat vom Wohnsitz-FA.
        </Field>
        <Field nr={299} label="Erste USt-VA-Frist beachten">
          10. des Monats nach dem ersten Voranmeldungs-Zeitraum.
        </Field>
        <Field nr={300} label="Erste ESt-Vorauszahlung am 10.3/6/9/12" />
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
        note="Stand 2026: KU-Grenze 25.000 € Vorjahres-Umsatz / 100.000 € Folgejahr-Prognose (Reform 2025). Ist-Versteuerung bis 800.000 € Umsatz/Jahr (§ 20 UStG). Bilanz-Pflicht ab 800.000 € Umsatz oder 80.000 € Gewinn (§ 141 AO). Frist FsE-Abgabe: 1 Monat ab Tätigkeitsaufnahme (§ 138 AO). 5-Jahres-Bindung bei § 19 KU-Wahl. ELSTER-Zeilen-Nummern können je Formular-Version geringfügig variieren — Feld-Bezeichnungen bleiben gleich."
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
          <li>In ELSTER „Fragebogen zur steuerlichen Erfassung" für deinen Typ öffnen.</li>
          <li>Diese Seite <strong>parallel</strong> öffnen (2. Tab/Monitor).</li>
          <li>Felder werden in der Reihenfolge unten erklärt — bei jeder Frage hier nachlesen, dann in ELSTER eintragen.</li>
          <li>Bei den 4 verbindlichen Entscheidungen Empfehlungs-Widgets nutzen.</li>
        </ol>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] mt-3">
          <div className="rounded-lg bg-red-500/10 p-2 border border-red-500/30">
            <strong className="text-red-700">⚠ § 19 KU</strong>
            <div className="text-muted-foreground mt-0.5">5 Jahre Bindung</div>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-2 border border-amber-500/30">
            <strong className="text-amber-700">⚠ § 138 AO</strong>
            <div className="text-muted-foreground mt-0.5">Frist 1 Monat</div>
          </div>
          <div className="rounded-lg bg-emerald-500/10 p-2 border border-emerald-500/30">
            <strong className="text-emerald-700">✅ ~300 Felder</strong>
            <div className="text-muted-foreground mt-0.5">in 22 Teilseiten</div>
          </div>
          <div className="rounded-lg bg-blue-500/10 p-2 border border-blue-500/30">
            <strong className="text-blue-700">⏱ Dauer</strong>
            <div className="text-muted-foreground mt-0.5">~90-120 Min</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ElsterLinks = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
    <a href="https://www.elster.de/eportal/formulare-leistungen/alleformulare/fseeun"
      target="_blank" rel="noreferrer"
      className="rounded-xl border-2 border-accent-blue bg-accent-blue/5 p-3 text-xs hover:bg-accent-blue/10 transition flex items-center justify-between">
      <div>
        <div className="font-semibold text-foreground">FsE EUn (Einzelunternehmer)</div>
        <div className="text-muted-foreground">Solo-Gewerbe, Freiberufler, e.K.</div>
      </div>
      <ExternalLink className="h-4 w-4 text-accent-blue" />
    </a>
    <a href="https://www.elster.de/eportal/formulare-leistungen/alleformulare/fsekapg"
      target="_blank" rel="noreferrer"
      className="rounded-xl border-2 border-accent-blue bg-accent-blue/5 p-3 text-xs hover:bg-accent-blue/10 transition flex items-center justify-between">
      <div>
        <div className="font-semibold text-foreground">FsE KapG (Kapitalgesellschaften)</div>
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
        <span className="inline-block min-w-[2rem] h-7 px-2 rounded-full bg-purple-500/15 text-purple-700 text-center mr-2 leading-7">{nr}</span>
        {title}
      </span>
      <div className="text-xs text-muted-foreground mt-1 ml-10">{intro}</div>
    </summary>
    {warn && (
      <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-2 text-[11px] my-3 flex items-start gap-1.5">
        <AlertTriangle className="h-3.5 w-3.5 text-red-700 shrink-0 mt-0.5" />
        <span className="text-red-700">{warn}</span>
      </div>
    )}
    <div className="mt-3 space-y-2">{children}</div>
  </details>
);

const Field = ({ nr, label, optional, children }: {
  nr: number;
  label: string;
  optional?: boolean;
  children?: React.ReactNode;
}) => (
  <div className="rounded-lg bg-secondary/30 p-2.5">
    <div className="font-semibold text-xs flex items-start gap-2 mb-1">
      <span className="text-[10px] font-mono bg-card text-muted-foreground px-1.5 py-0.5 rounded shrink-0 mt-0.5">{nr}</span>
      <span className="flex-1">
        {label}
        {optional && <span className="ml-1.5 text-[9px] font-normal text-muted-foreground uppercase">(optional)</span>}
      </span>
    </div>
    {children && (
      <div className="text-[11px] text-foreground/80 leading-relaxed ml-7">{children}</div>
    )}
  </div>
);

const ToolNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1.5 rounded bg-accent-blue/10 border border-accent-blue/30 p-1.5 text-[10px] flex items-start gap-1.5">
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
        <div className="space-y-2">
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
          <li><strong>IdNr</strong> dreimal prüfen (11 Stellen, nicht 13!)</li>
          <li><strong>§ 19 KU</strong>-Entscheidung sicher? <strong>5-Jahres-Bindung!</strong></li>
          <li><strong>Ist-Versteuerung</strong> beantragt (wenn passend)?</li>
          <li><strong>USt-IdNr</strong>-Häkchen gesetzt (wenn EU-Geschäft möglich)?</li>
          <li><strong>IBAN/BIC</strong> auf Tippfehler prüfen — falscher Eingang = Verzögerung</li>
          <li><strong>Lastschriftmandat</strong>: ja oder nein bewusst entschieden?</li>
          <li><strong>Gewinnermittlungsart</strong>: EÜR vs. Bilanz korrekt?</li>
          <li><strong>Vorauszahlungs-Schätzung</strong> realistisch (nicht zu niedrig)?</li>
        </ul>
        <div className="text-[11px] text-muted-foreground italic mt-2">
          Nach Absenden: ELSTER-Bestätigungs-Quittung als PDF speichern. Steuernummer kommt 2–6 Wochen per Post.
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
        { b: "FsE (Fragebogen zur steuerlichen Erfassung)", e: "Pflicht-Online-Formular bei ELSTER, das jeder Selbstständige innerhalb 1 Monat nach Tätigkeitsaufnahme abgeben muss (§ 138 AO). Hier teilt das FA dir die Steuernummer zu, legt Vorauszahlungen + USt-Status fest. 100 % digital, kein Papier. 22 Teilseiten, ~250-300 Felder." },
        { b: "Steuer-ID (IdNr) vs. Steuernummer", e: "IdNr = 11-stellige LEBENSLANGE Nummer vom BZSt, bekommst du bei Geburt/Zuwanderung. Steuernummer = vom Wohnsitz-FA zugeteilt, ändert sich bei Umzug. Im FsE brauchst du die IdNr; die Steuernummer KOMMT NACH der FsE-Abgabe." },
        { b: "§ 19 UStG Kleinunternehmer (Reform 2025)", e: "Wahl-Recht: Wenn Vorjahres-Umsatz < 25.000 € UND Folgejahr-Prognose < 100.000 €. Vorteil: keine USt-Ausweisung, keine USt-VA. Nachteil: kein Vorsteuer-Abzug. ⚠ 5 Jahre Bindung." },
        { b: "EÜR vs. Bilanzierung", e: "EÜR (§ 4 Abs. 3 EStG) = einfache Zufluss/Abfluss-Rechnung. Pflicht für Bilanz: Kap.-Ges. IMMER, Gewerbe ab 800k Umsatz/80k Gewinn (§ 141 AO), Freiberuf NIE." },
        { b: "Soll- vs. Ist-Versteuerung", e: "Soll = USt fällig im Monat der Rechnungsstellung. Ist = USt fällig erst nach Vereinnahmung. Ist hat Cashflow-Vorteil, möglich bei Umsatz < 800k (§ 20 UStG) oder Freiberuf (immer)." },
        { b: "Vorauszahlungen ESt + GewSt", e: "Quartalsweise (10.3, 10.6, 10.9, 10.12). Festsetzung erst ab voraussichtl. Jahressteuer ≥ 400 € (§ 37 EStG). Bei zu niedriger Schätzung: ab 15. Monat 6%/Jahr Verzugszinsen." },
        { b: "USt-IdNr parallel beantragen", e: "Im FsE direkt mit ankreuzen — kommt gleichzeitig mit Steuernummer. Sonst später separat beim BZSt (2–4 Wochen)." },
        { b: "Pflicht-Frist § 138 AO", e: "Einreichung innerhalb 1 Monat ab Tätigkeitsaufnahme. Verspätung = Verspätungszuschlag möglich (bis 10% der festgesetzten Steuer, mind. 25 €/angefangener Monat bei Pflicht-Erklärungen)." },
        { b: "OSS / IOSS", e: "One-Stop-Shop für EU-B2C-Versandhandel ab 10.000 €/Jahr in EU-Länder. IOSS für Importe aus Drittländern bis 150 € an EU-Privatkunden. Beides vereinfacht Steuermeldung in EU-Ländern." },
        { b: "Reverse Charge § 13b UStG", e: "Bei B2B-Leistungen an EU-Ausland: Leistungsempfänger schuldet USt in seinem Land. Du stellst Rechnung netto + Hinweis 'Steuerschuldnerschaft des Leistungsempfängers'. USt-IdNr beider Parteien Pflicht." },
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
