import { Navbar } from "@/components/landing/Navbar";
import { TIPPS_AKTIV } from "@/lib/freetools/tipps";
import { openConsentSettings } from "@/utils/consent";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";
import { Seo } from "@/components/Seo";
import { ANBIETER_ANZAHL } from "@/data/kennzahlen";

const Datenschutz = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="Datenschutzerklärung | GründerX"
      description="Wie GründerX personenbezogene Daten gemäß DSGVO verarbeitet — Verantwortlicher, Zwecke, Betroffenenrechte und eingesetzte Dienste."
      path="/datenschutz"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Datenschutzerklärung",
        description:
          "Wie GründerX personenbezogene Daten gemäß DSGVO verarbeitet — Verantwortlicher, Zwecke, Betroffenenrechte und eingesetzte Dienste.",
        url: "https://gruenderx.de/datenschutz",
        inLanguage: "de-DE",
        isPartOf: { "@type": "WebSite", name: "GründerX", url: "https://gruenderx.de" },
      }}
    />
    <Navbar />
    <main>
      <PageHeader
        width="max-w-3xl"
        kicker={
          <span className="inline-flex items-center rounded-full border border-accent-blue/20 bg-accent px-3 py-1 text-[13px] font-medium text-accent-blue">
            Rechtliches
          </span>
        }
        title="Datenschutzerklärung"
        lead={<p className="text-base tabular">Stand: Oktober 2026 · Version 2.1 (GründerX-spezifisch)</p>}
      />
      <div className="container max-w-3xl px-4 py-10 md:py-14">
      <div className="prose prose-slate max-w-none rounded-2xl border border-border bg-card p-5 shadow-card prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-a:text-accent-blue sm:p-8 md:p-10">

      <h2 id="ueberblick" className="mt-10 mb-3 text-xl font-semibold md:text-2xl">1. Überblick & Verantwortlicher</h2>
      <p>
        Diese Datenschutzerklärung beschreibt, welche personenbezogenen Daten beim Besuch der Website
        gründerx.de und bei der Nutzung der dort angebotenen GründerX-Plattform verarbeitet werden.
        Wir behandeln deine Daten DSGVO-konform und so sparsam wie möglich.
      </p>
      <p><strong>Verantwortlicher i. S. d. Art. 4 Nr. 7 DSGVO:</strong></p>
      <p>
        Sonni Buttke<br />
        Pinguinweg 18, 22527 Hamburg<br />
        E-Mail: <a href="mailto:datenschutz@gründerx.de">datenschutz@gründerx.de</a><br />
        Telefon: +49 175 4220573
      </p>
      <p>
        Ein Datenschutzbeauftragter ist gesetzlich nicht erforderlich. Bei Fragen zum Datenschutz
        wende dich direkt an die o. g. Adresse.
      </p>

      <h2 id="was-machen-wir" className="mt-10 mb-3 text-xl font-semibold md:text-2xl">2. Was ist GründerX – und welche Daten verarbeiten wir dafür?</h2>
      <p>
        GründerX ist eine SaaS-Plattform für deutsche Gründer:innen mit u. a. folgenden Funktionen:
      </p>
      <ul>
        <li><strong>Playbooks</strong> – Schritt-für-Schritt-Guides für GmbH, UG, Holding, Einzelunternehmen, Kleinunternehmer-Regelung, US-LLC etc.</li>
        <li><strong>Felix-Chat</strong> – KI-Co-Founder (Anthropic Claude, ersatzweise Google Gemini bzw. OpenAI) für Fragen zu Gründung, Steuern, Compliance.</li>
        <li><strong>Steuer-Cockpit</strong> – Frist-Kalender, IAB-Rechner, Quartals-Schätzung.</li>
        <li><strong>Rechtsform-Wizard</strong> – Empfehlung zu Einzel/UG/GmbH/PartG.</li>
        <li><strong>Anbieter-Vergleich</strong> – {ANBIETER_ANZAHL} Anbieter (Banking, Versand, Buchhaltung, Versicherungen etc.) mit Stärken/Schwächen.</li>
        <li><strong>Notar-Finder & Notar-Vorbereitung</strong> – PLZ-basierte Suche (OpenStreetMap) plus Datenerfassung für deinen Notartermin.</li>
        <li><strong>Firmenname-Check</strong> – Live-Verfügbarkeit über NorthData + GLEIF.</li>
      </ul>

      <h2 id="kategorien" className="mt-10 mb-3 text-xl font-semibold md:text-2xl">3. Datenkategorien & Zwecke im Detail</h2>

      <h3 className="font-semibold mt-6">3.1 Konto- und Stammdaten</h3>
      <p><strong>Daten:</strong> E-Mail-Adresse, Passwort-Hash (bcrypt/argon2 via Supabase Auth), optional Vor-/Nachname, Profilbild, Telefonnummer, Rechnungsadresse.</p>
      <p><strong>Zweck:</strong> Konto-Anlage, Login, Bestandsverwaltung, Rechnungsstellung.</p>
      <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>
      <p><strong>Speicherdauer:</strong> Bis zur Konto-Löschung. Rechnungs- und Buchhaltungs-relevante Daten 10 Jahre nach § 147 AO.</p>

      <h3 className="font-semibold mt-6">3.2 Playbook-Fortschritt & Notar-Vorbereitung (besonders sensibel)</h3>
      <p><strong>Daten:</strong> Eingaben in den Playbooks – inklusive personenbezogener Daten von <em>Gesellschafter:innen</em> und <em>Geschäftsführer:innen</em> wie Vor- und Nachname, Geburtsdatum, Geburtsort, Wohnanschrift, Beruf, Familienstand, Stammkapital-Anteil, Sacheinlage-Beschreibung. Dazu Firmen-Stammdaten (Sitz, Geschäftsadresse, Unternehmensgegenstand) und freie Notiz-Felder.</p>
      <p><strong>Zweck:</strong> Strukturierte Vorbereitung deines Notartermins, Wiederaufnahme des Fortschritts bei späterem Login, Generierung von Brief-/Anschreiben-Vorlagen für den Notar.</p>
      <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO.</p>
      <p>
        <strong>Daten Dritter im Notar-Modul:</strong> Soweit du Daten von Mit-Gesellschafter:innen,
        Geschäftsführer:innen oder Familienangehörigen eingibst, bist <em>du</em> der/die Verantwortliche
        i. S. d. Art. 4 Nr. 7 DSGVO für diese Erfassung; wir handeln insoweit als technischer
        Auftragsverarbeiter (Art. 28 DSGVO). Du sicherst zu, die betroffenen Personen nach Art. 13/14 DSGVO
        über Zweck (Notar-Vorbereitung), Speicherort (Supabase EU), Speicherdauer (bis Konto-Löschung)
        und ihre Betroffenenrechte zu informieren. Eine Mustervorlage „Information für Mitgesellschafter:innen"
        stellen wir dir im Notar-Modul als Download bereit. Auf Anforderung der/des Dritten löschen wir
        die Daten unverzüglich.
      </p>
      <p><strong>Speicherort:</strong> Supabase-Datenbank in der EU (Frankfurt am Main).</p>
      <p><strong>Speicherdauer:</strong> Bis zur Konto-Löschung oder bis du den Eintrag manuell löschst. Du kannst jederzeit unter „Meine Guides" Daten löschen oder den gesamten Run zurücksetzen.</p>
      <p><strong>Hinweis:</strong> Die Plattform ersetzt keinen Notar oder Steuerberater. Übermittlung der Daten an einen Notar erfolgt ausschließlich durch dich selbst (z. B. Copy/Paste oder Download als .txt) – wir senden Notar-Daten nicht automatisch an Dritte.</p>

      <h3 className="font-semibold mt-6">3.3 Felix-Chat (KI-Beratung)</h3>
      <p><strong>Daten:</strong> Chat-Verlauf (deine Nachrichten + Felix-Antworten), Zeitstempel, Konversations-ID.</p>
      <p><strong>Verarbeitung:</strong> Deine Nachrichten werden zur Beantwortung an einen KI-Sprachmodell-Anbieter übermittelt. Primär nutzen wir <strong>Anthropic (Claude-API)</strong>; bei dessen Nichtverfügbarkeit greifen wir automatisch der Reihe nach auf <strong>Google Gemini</strong> bzw. <strong>OpenAI (GPT)</strong> zurück, damit der Chat funktionsfähig bleibt. Die Antwort wird zurück an deine Session gesendet und im Chat-Verlauf gespeichert.</p>
      <p>
        <strong>Drittlandtransfer USA – Rechtsgrundlage:</strong> Google LLC ist unter dem
        EU-US Data Privacy Framework (DPF) zertifiziert (Angemessenheitsbeschluss der EU-Kommission
        v. 10.07.2023, C(2023) 4745). Insoweit liegt ein angemessenes Schutzniveau nach Art. 45 DSGVO vor
        und es bedarf keiner zusätzlichen Garantien. Soweit Lovable.dev / das Lovable AI Gateway nicht
        selbst DPF-zertifiziert ist, sichern wir die Übermittlung über die EU-Standardvertragsklauseln
        (Modul 2 / Modul 3, Durchführungsbeschluss (EU) 2021/914) und ein dokumentiertes Transfer Impact
        Assessment (TIA) ab. Auf Anfrage übermitteln wir dir die TIA-Zusammenfassung
        (<a href="mailto:datenschutz@gründerx.de">datenschutz@gründerx.de</a>).
      </p>
      <p>
        <strong>Anthropic und Fallback-Anbieter OpenAI:</strong> Anthropic PBC (Claude-API) verarbeitet deine
        Chat-Nachricht primär; ist weder Anthropic noch Gemini verfügbar, verarbeitet ersatzweise OpenAI, L.L.C. (GPT)
        deine Chat-Nachricht. Beide sitzen in den USA; die Übermittlung sichern wir über die EU-Standardvertragsklauseln (Art. 46 DSGVO) ab. Es
        werden ausschließlich der Nachrichteninhalt und der nötige Kontext übermittelt, keine Konto-Stammdaten.
      </p>
      <p>Nutze Felix nicht für sensible personenbezogene Daten Dritter ohne ausdrückliche Einwilligung.</p>
      <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) i. V. m. Art. 45 DSGVO (DPF) bzw. Art. 46 DSGVO (SCC).</p>
      <p><strong>Speicherdauer:</strong> Bis zur manuellen Löschung durch dich oder Konto-Löschung. Du kannst Konversationen jederzeit unter „Felix-Chat-Verlauf" löschen.</p>

      <h3 className="font-semibold mt-6">3.4 Notar-Suche, Firmenname-Check, Anbieter-Daten</h3>
      <p>
        Bei diesen Funktionen werden <strong>keine personenbezogenen Daten an externe Anbieter</strong> übermittelt –
        nur die Sachanfrage (PLZ, Firmenname). Konkret:
      </p>
      <ul>
        <li><strong>Notar-Finder:</strong> Deine PLZ-Eingabe → OpenStreetMap (Nominatim + Overpass), keine Authentifizierung, keine Cookies.</li>
        <li><strong>Firmenname-Check:</strong> Der gesuchte Firmenname → NorthData + GLEIF. Kein Bezug zu deinem Konto wird übermittelt.</li>
        <li><strong>Anbieter-Vergleich:</strong> Die angezeigten Daten (Preise, Bewertungen) sind statisch in der App gespeichert und werden über automatisierte Audit-Routinen monatlich aktualisiert. Beim Klick auf einen Anbieter-Link verlässt du unsere Seite.</li>
      </ul>

      <h3 className="font-semibold mt-6">3.5 Zahlungs-Daten</h3>
      <p>
        Zahlungen werden über <strong>Stripe Payments Europe Ltd.</strong> (1 Grand Canal Street Lower, Dublin 2, Irland)
        abgewickelt. Stripe ist Auftragsverarbeiter und EU-DSGVO-konform.
      </p>
      <p><strong>Daten:</strong> Du gibst deine Zahlungsdaten direkt bei Stripe ein – <em>wir sehen sie nicht</em>. Wir erhalten von Stripe nur Customer-ID, Subscription-Status, Rechnungsdokumente.</p>
      <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO.</p>
      <p><strong>Stripe-Datenschutz:</strong> <a href="https://stripe.com/de/privacy" target="_blank" rel="noreferrer">stripe.com/de/privacy</a></p>

      <h3 className="font-semibold mt-6">3.6 Page-View-Tracking (intern)</h3>
      <p>
        Wir loggen anonymisierte Seitenaufrufe (Pfad, Zeitstempel, gehashte User-ID), um die meistgenutzten
        Funktionen zu erkennen und das Produkt zu verbessern. Keine IP-Adresse, kein Cross-Site-Tracking; dieses interne
        Tracking nutzt keine externen Analytics-Anbieter. Werbe-Pixel (Meta, Google) laufen nur mit deiner Einwilligung, siehe Abschnitt 6.
      </p>
      <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse: Produktverbesserung).</p>
      <p><strong>Speicherdauer:</strong> 90 Tage.</p>

      <h3 className="font-semibold mt-6">3.7 Server-Log-Dateien</h3>
      <p>Bei jedem Aufruf erfasst der Hosting-Server automatisch:</p>
      <ul>
        <li>Browsertyp und -version</li>
        <li>Betriebssystem</li>
        <li>Referrer-URL</li>
        <li>Hostname / Anonymisierte IP (gekürzt um letztes Oktett)</li>
        <li>Zugriffszeit</li>
      </ul>
      <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (Sicherheit, Missbrauchs-Erkennung).</p>
      <p><strong>Speicherdauer:</strong> 7 Tage, danach Löschung.</p>

      <h3 className="font-semibold mt-6">3.8 Kontakt / Support / E-Mail</h3>
      <p>Wenn du uns per E-Mail oder Kontaktformular schreibst, speichern wir deine Anfrage zur Bearbeitung.</p>
      <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b/f DSGVO. <strong>Speicherdauer:</strong> 3 Jahre nach Abschluss der Anfrage.</p>

      <h3 id="kostenlose-tools" className="font-semibold mt-6">3.9 Kostenlose Tools und Prüfungen (Ergebnis gegen E-Mail-Adresse)</h3>
      <p>
        Einige Tools kannst du ohne Konto je einmal nutzen: den WEEE-Check, den Brand-Check, den LUCID-Wizard, den
        Gründungskosten-Rechner und die Generatoren unter „Gratis-Tools" (Businessplan, Rechtsform-Finder,
        Amazon-Widersprüche). Das Ergebnis schalten wir frei, wenn du deine E-Mail-Adresse angibst.
      </p>
      <p>
        <strong>Daten:</strong> E-Mail-Adresse, das genutzte Tool (Herkunft, z. B. „gx-tool:weee-check") und der
        Zeitpunkt. Die Inhalte, die du in das Tool eingibst, speichern wir dabei nicht. Beim WEEE-Check und beim
        Brand-Check geht der gesuchte Marken- oder Firmenname – ohne deine E-Mail-Adresse – über unsere Server an die
        öffentlichen Quellen, die das Tool abfragt (u. a. EAR-Verzeichnis der stiftung ear, Markenregister, DNS,
        App Store).
      </p>
      <p>
        <strong>Zweck:</strong> Bereitstellung des angeforderten Ergebnisses und Nachhalten der kostenlosen
        Nutzung (eine Prüfung bzw. Nutzung je Tool), damit das Angebot nicht missbraucht wird. Ob du ein Tool schon genutzt
        hast, merkt sich zusätzlich dein Browser im lokalen Speicher (siehe Abschnitt 6). {TIPPS_AKTIV
          ? "Werbung senden wir an diese Adresse nur, wenn du zusätzlich in Tipps per E-Mail einwilligst und das bestätigst (Abschnitt 3.9b)."
          : "Werbung senden wir an diese Adresse nicht; einen Newsletter gibt es nur mit gesonderter, ausdrücklicher Einwilligung."}
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Bereitstellung des angeforderten Ergebnisses)
        und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Missbrauchsabwehr).<br />
        <strong>Speicherdauer:</strong> 12 Monate, danach automatische Löschung.<br />
        <strong>Auftragsverarbeiter:</strong> Supabase (Datenbank, Serverstandort Frankfurt am Main).
      </p>

      {TIPPS_AKTIV && (<>
      <h3 id="tipps" className="font-semibold mt-6">3.9b Tipps per E-Mail nach einem kostenlosen Tool (Double-Opt-in)</h3>
      <p>
        Im E-Mail-Fenster der kostenlosen Tools kannst du freiwillig ankreuzen, dass du in den folgenden 10 Tagen bis zu
        vier E-Mails mit Tipps zum Thema des Tools und zu GründerX bekommen möchtest. Das Häkchen ist nicht vorausgewählt.
        Wir schicken dir zuerst eine Bestätigungsmail; erst nach dem Klick auf den Link darin (Double-Opt-in) senden wir
        die Tipps. Ohne Klick bekommst du nichts.
      </p>
      <p>
        <strong>Daten:</strong> E-Mail-Adresse, das genutzte Tool, die Version des Einwilligungstexts, die Zeitpunkte von
        Anforderung, Bestätigung und Versand der einzelnen Mails. Hast du ein GründerX-Abo, beenden wir die Reihe; dafür
        gleichen wir die Adresse mit unseren Kundenkonten ab. Jede Tipps-Mail enthält ein Zählpixel und über unseren Server
        umgeleitete Links, beide mit einer Kennung der Mail. Damit sehen wir, ob eine Mail geöffnet und welcher Link geklickt
        wurde (Öffnungen sind nur eine Schätzung, weil manche Mailprogramme Bilder vorab laden). Auch das umfasst deine
        Einwilligung.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 7 Abs. 2 UWG). Du kannst sie
        jederzeit mit Wirkung für die Zukunft widerrufen – über den Abmeldelink in jeder Mail oder per Nachricht an uns.<br />
        <strong>Speicherdauer:</strong> Unbestätigte Anfragen löschen wir nach 30 Tagen. Bestätigte Einwilligungen bewahren
        wir als Nachweis 24 Monate nach der Anforderung auf, danach automatische Löschung.<br />
        <strong>Auftragsverarbeiter:</strong> Supabase (Datenbank, Serverstandort Frankfurt am Main); Versand über unser Mailpostfach bei IONOS.
      </p>
      </>)}

      <h3 id="newsletter" className="font-semibold mt-6">3.9c Steuerfristen &amp; Neuigkeiten per E-Mail (Double-Opt-in)</h3>
      <p>
        Im Fuß jeder Seite und am Ende der Ratgeber kannst du dich für Mails mit Erinnerungen an Steuerfristen (z. B.
        USt-Voranmeldung) und Neuigkeiten für Gründer anmelden. Das Häkchen ist nicht vorausgewählt. Wir schicken dir zuerst
        eine Bestätigungsmail; erst nach dem Klick auf den Link darin (Double-Opt-in, gültig 7 Tage) gilt die Anmeldung. Ohne
        Klick bekommst du nichts weiter. Bestätigst du die Anmeldung nicht, löschen wir deine Adresse nach spätestens 30 Tagen
        automatisch. Werbliche Mails schicken wir höchstens zwei pro Woche.
      </p>
      <p>
        <strong>Daten:</strong> E-Mail-Adresse, Marke (GründerX), Herkunft der Anmeldung, Zeitpunkte von Anmeldung und
        Bestätigung sowie die Versandprotokolle der einzelnen Mails. Jede Mail enthält ein Zählpixel und über unseren Server
        umgeleitete Links mit einer Kennung der Mail; damit sehen wir, ob eine Mail geöffnet und welcher Link geklickt wurde
        (Öffnungen sind nur eine Schätzung). Auch das umfasst deine Einwilligung.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 7 Abs. 2 UWG). Du kannst sie
        jederzeit mit Wirkung für die Zukunft widerrufen – über den Abmeldelink in jeder Mail oder per Nachricht an uns.<br />
        <strong>Speicherdauer:</strong> bis zu deiner Abmeldung; danach bleibt die Adresse auf unserer Sperrliste, damit du
        keine Mails mehr bekommst, und den Nachweis der Einwilligung bewahren wir so lange auf, wie Ansprüche daraus geltend
        gemacht werden können.<br />
        <strong>Verarbeitung:</strong> Die Anmeldeliste liegt auf unserem eigenen Server bei Hetzner in Deutschland
        (Anmeldeadresse arbitragex.de, unser Schwesterprojekt); versendet wird über Supabase (Frankfurt am Main) und unser
        Mailpostfach bei IONOS.
      </p>

      <h3 id="vorlagen" className="font-semibold mt-6">3.9a Vorlagen-Bibliothek (Download gegen bestätigte E-Mail-Adresse)</h3>
      <p>
        Die Vertragsvorlagen unter „Vorlagen" (z. B. GbR-Vertrag, Kaufverträge, Arbeitsverträge) kannst du ohne Konto
        herunterladen. Dafür gibst du deine E-Mail-Adresse an; wir schicken dir eine Mail mit einem Bestätigungslink
        (Double-Opt-in). Erst der Klick auf diesen Link schaltet den Download in deinem Browser frei – für alle
        Vorlagen zugleich.
      </p>
      <p>
        <strong>Daten:</strong> E-Mail-Adresse, die angeforderte Vorlage, die Zeitpunkte von Anforderung, Mailversand und
        Bestätigung sowie die Anzahl der gesendeten Mails (Versandbremse: höchstens eine Mail alle zwei Minuten und fünf
        am Tag je Adresse). Die Bestätigungsmail selbst protokollieren wir wie alle Mails (Abschnitt zu E-Mails). Der
        Bestätigungslink enthält deine Adresse und eine Signatur, mit der wir prüfen, dass der Link von uns stammt.
      </p>
      <p>
        <strong>Zweck und Rechtsgrundlage:</strong> Bereitstellung des angeforderten Downloads und Schutz vor Missbrauch
        fremder Adressen (Art. 6 Abs. 1 lit. b und f DSGVO). Die Bestätigung ist <strong>keine</strong> Einwilligung in
        Werbung; einen Newsletter bekommst du dadurch nicht.
      </p>
      <p>
        <strong>Speicherdauer:</strong> Unbestätigte Adressen löschen wir nach 30 Tagen, bestätigte 24 Monate nach der
        letzten Anforderung. Du kannst jederzeit früher die Löschung verlangen (Kontakt unten).
      </p>

      <h3 id="mitgruender" className="font-semibold mt-6">3.10 Mitgründer-Börse</h3>
      <p>
        In der Mitgründer-Börse kannst du freiwillig ein Profil anlegen. <strong>Daten:</strong> Anzeigename, deine Rolle und
        gesuchte Rollen, Region (Bundesland oder „remote“), Branche, Phase, Zeitumfang, Pitch-Text und Skills sowie die
        Kontaktanfragen, die du sendest oder erhältst (Nachricht, Antwort, Status, Zeitpunkt). E-Mail-Adresse, Nachname und
        weitere Kontodaten werden nicht angezeigt.
      </p>
      <p>
        <strong>Sichtbarkeit:</strong> Dein Profil ist nur sichtbar, wenn du es selbst veröffentlichst, und nur für eingeloggte
        Mitglieder mit aktivem Zugang. Kontaktanfragen sehen nur Absender und Empfänger. Kontaktdaten teilst du erst, wenn du sie
        selbst in eine Antwort schreibst.<br />
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (deine Einwilligung durch Veröffentlichen) und lit. b
        (Bereitstellung der Funktion).<br />
        <strong>Speicherdauer:</strong> bis du das Profil löschst oder dein Konto entfernst; Anfragen werden mit dem Konto gelöscht.
        Du kannst die Sichtbarkeit jederzeit zurücknehmen.<br />
        <strong>Auftragsverarbeiter:</strong> Supabase (Datenbank, Serverstandort Frankfurt am Main).
      </p>

      <h3 id="behoerden" className="font-semibold mt-6">3.11 Behörden-Wegweiser</h3>
      <p>
        Gibst du auf der Seite „Gründungsberatung & Behörden finden“ eine Postleitzahl ein, fragt dein Browser direkt beim
        Portalverbund Online-Gateway (PVOG, betrieben im Auftrag der FITKO – Föderale IT-Kooperation, Frankfurt am Main) ab,
        welche Stelle für die Gewerbeanmeldung zuständig ist. Dabei werden die Postleitzahl und – technisch bedingt – deine
        IP-Adresse an den PVOG übermittelt. Wir selbst speichern die Postleitzahl nicht. Der Link zur Finanzamtsuche führt
        zum Bundeszentralamt für Steuern; dort gelten dessen Datenschutzhinweise.<br />
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (von dir angeforderte Suche).
      </p>

      <h3 id="lokale-tools" className="font-semibold mt-6">3.12 Tools, die nur in deinem Browser rechnen</h3>
      <p>
        Der E-Rechnungs-Leser, der Finanzplan-, Pitch-Deck- und Mahnungs-Generator, der Steuer- und Fristenkalender, der
        Kleinunternehmer-Wächter, der Bericht für den Gründungszuschuss Phase 2, die Bankgespräch-Vorbereitung und das
        Event-Radar verarbeiten deine Eingaben und hochgeladenen Dateien ausschließlich in deinem Browser. An uns übertragen
        wird dabei nichts. Damit deine Eingaben beim nächsten Besuch noch da sind, speichern manche Tools sie im lokalen
        Speicher deines Browsers (siehe Abschnitt 6); du kannst ihn jederzeit in den Browser-Einstellungen löschen.
      </p>

      <h3 id="ki-schnittstelle" className="font-semibold mt-6">3.13 KI-Schnittstelle (MCP-Server und GPT-Schnittstelle)</h3>
      <p>
        Unter gruenderx.de/mcp (MCP-Server) und gruenderx.de/api/gpt (Schnittstelle für ChatGPT-GPTs) können KI-Assistenten wie
        ChatGPT oder Claude öffentlich zugängliche GründerX-Inhalte abfragen: Gründer-Events, Bewerbungsfristen, Startup-Guthaben
        und veröffentlichte Ratgeber. Verarbeitet werden nur die Werte, die der Assistent an das jeweilige Werkzeug übergibt, etwa
        ein Bundesland, ein Zeitraum oder ein Stichwort. Diese Werte dienen ausschließlich dazu, die Antwort zu erzeugen, und werden
        nicht gespeichert. Auf deinen Chatverlauf und auf ein GründerX-Konto haben wir keinen Zugriff; eine Anmeldung ist nicht nötig.
        Deine IP-Adresse wird nur kurzzeitig im Arbeitsspeicher der Server-Funktion gehalten (höchstens eine Minute), um zu viele
        Anfragen in kurzer Zeit abzuwehren. Zusätzlich zählen wir, welches Werkzeug aufgerufen wurde, ohne IP-Adresse, ohne
        Eingaben und ohne Bezug zu einer Person (Tabelle der internen Produktanalytik, siehe 3.6). Für die Server-Log-Dateien des
        Hosters gilt Abschnitt 3.7. Für die Verarbeitung in ChatGPT, Claude oder einem anderen KI-Assistenten ist der jeweilige
        Anbieter verantwortlich; dort gelten dessen Datenschutzhinweise.<br />
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (angeforderte Abfrage) und Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an einem stabilen, missbrauchsgeschützten Dienst und an der Reichweitenmessung ohne Personenbezug).
      </p>

      <h2 id="auftragsverarbeiter" className="mt-10 mb-3 text-xl font-semibold md:text-2xl">4. Auftragsverarbeiter, eigenverantwortliche Dritte & Datenflüsse</h2>
      <p>
        Im Folgenden listen wir alle Empfänger nach ihrer datenschutzrechtlichen Rolle (Auftragsverarbeiter
        nach Art. 28 DSGVO oder eigenverantwortlicher Dritter nach Art. 4 Nr. 7 DSGVO):
      </p>

      <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-secondary/60">
          <tr>
            <th className="px-3 py-2.5 text-left font-medium">Anbieter</th>
            <th className="px-3 py-2.5 text-left font-medium">Rolle</th>
            <th className="px-3 py-2.5 text-left font-medium">Zweck</th>
            <th className="px-3 py-2.5 text-left font-medium">Standort</th>
            <th className="px-3 py-2.5 text-left font-medium">Schutzgarantie</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>Supabase Inc.</strong></td>
            <td className="px-3 py-2">Auftragsverarbeiter (Art. 28)</td>
            <td className="px-3 py-2">Datenbank, Auth, Edge Functions</td>
            <td className="px-3 py-2">EU (Frankfurt)</td>
            <td className="px-3 py-2">AVV + SCC für ggf. US-Support-Zugriff</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>Lovable.dev</strong></td>
            <td className="px-3 py-2">Auftragsverarbeiter (Art. 28)</td>
            <td className="px-3 py-2">App-Hosting, CDN</td>
            <td className="px-3 py-2">EU/US</td>
            <td className="px-3 py-2">AVV + SCC + ggf. DPF</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>Lovable AI Gateway</strong></td>
            <td className="px-3 py-2">Auftragsverarbeiter (Art. 28)</td>
            <td className="px-3 py-2">Routing-Schicht für Felix-Chat</td>
            <td className="px-3 py-2">EU/US</td>
            <td className="px-3 py-2">AVV + SCC</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>Google LLC (Gemini)</strong></td>
            <td className="px-3 py-2">Unter-Auftragsverarbeiter</td>
            <td className="px-3 py-2">KI-Modell für Felix-Chat (Fallback)</td>
            <td className="px-3 py-2">USA</td>
            <td className="px-3 py-2"><strong>DPF-zertifiziert</strong> (Art. 45 DSGVO)</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>Anthropic PBC (Claude)</strong></td>
            <td className="px-3 py-2">Unter-Auftragsverarbeiter</td>
            <td className="px-3 py-2">KI-Modell für Felix-Chat (primär, Claude-API)</td>
            <td className="px-3 py-2">USA</td>
            <td className="px-3 py-2">SCC (Art. 46 DSGVO)</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>OpenAI, L.L.C. (GPT)</strong></td>
            <td className="px-3 py-2">Unter-Auftragsverarbeiter</td>
            <td className="px-3 py-2">KI-Modell für Felix-Chat (Fallback)</td>
            <td className="px-3 py-2">USA</td>
            <td className="px-3 py-2">SCC (Art. 46 DSGVO)</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>Stripe Payments Europe Ltd.</strong></td>
            <td className="px-3 py-2"><strong>Eigenverantwortlich</strong> (Art. 4 Nr. 7)</td>
            <td className="px-3 py-2">Zahlungs-Abwicklung, Rechnungen</td>
            <td className="px-3 py-2">EU (Dublin)</td>
            <td className="px-3 py-2">Übermittlung nach Art. 6 Abs. 1 lit. b</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>OpenStreetMap Foundation</strong></td>
            <td className="px-3 py-2">Eigenverantwortlich</td>
            <td className="px-3 py-2">Notar-Suche (Nominatim, Overpass)</td>
            <td className="px-3 py-2">UK</td>
            <td className="px-3 py-2">Keine personenbezogenen Daten – nur PLZ</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>NorthData GmbH</strong></td>
            <td className="px-3 py-2">Eigenverantwortlich</td>
            <td className="px-3 py-2">Firmenname-Verfügbarkeitsprüfung</td>
            <td className="px-3 py-2">EU (München)</td>
            <td className="px-3 py-2">Nur Firmenname</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>GLEIF</strong></td>
            <td className="px-3 py-2">Eigenverantwortlich</td>
            <td className="px-3 py-2">LEI-Verifikation (Firmen)</td>
            <td className="px-3 py-2">Schweiz</td>
            <td className="px-3 py-2">Nur Firmenname</td>
          </tr>
        </tbody>
      </table>
      </div>
      <p className="text-xs text-muted-foreground">
        AVV-Kopien stellen wir dir auf Anfrage zur Verfügung. Stripe handelt nach eigener Privacy-Policy
        eigenverantwortlich und ist insoweit kein Auftragsverarbeiter; siehe <a href="https://stripe.com/de/privacy" target="_blank" rel="noreferrer">stripe.com/de/privacy</a>.
      </p>

      <h2 id="drittland" className="mt-10 mb-3 text-xl font-semibold md:text-2xl">5. Drittlandtransfer (USA / Nicht-EU)</h2>
      <p>
        Bei der Nutzung von Felix-Chat (Anthropic Claude, ersatzweise Google Gemini bzw. OpenAI) findet eine Übermittlung in die USA statt.
        Wir stellen den Schutz über die EU-Standardvertragsklauseln (SCC) sicher und nutzen Anbieter,
        die unter dem EU-US Data Privacy Framework zertifiziert sind. Du kannst den Felix-Chat jederzeit
        nicht nutzen – die anderen Funktionen der Plattform funktionieren ohne KI-Drittland-Transfer.
      </p>

      <h2 id="cookies" className="mt-10 mb-3 text-xl font-semibold md:text-2xl">6. Cookies & lokaler Speicher</h2>
      <p>
        Wir verwenden <strong>technisch unbedingt erforderliche Cookies</strong> i. S. d. § 25 Abs. 2 Nr. 2 TDDDG
        (Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz, vormals TTDSG). Diese sind erforderlich, damit der
        von dir aktiv angeforderte Dienst (Login, Zahlungs-Session, Theme-Auswahl) funktioniert:
      </p>
      <ul>
        <li><strong>sb-access-token / sb-refresh-token</strong> (Supabase Auth) – Login-Session, Lifetime: Session bzw. 7 Tage</li>
        <li><strong>theme-preference</strong> (LocalStorage) – Hell/Dunkel-Modus</li>
        <li><strong>gx-profile-{`{userId}`}</strong> (LocalStorage) – Profil-Cache zur Vermeidung erneuter DB-Roundtrips</li>
        <li><strong>stripe-session</strong> – nur während aktiver Zahlung gesetzt</li>
        <li><strong>gruenderx:vorlagen-freigabe</strong> (LocalStorage) – merkt nach dem Klick auf den Bestätigungslink, dass die Vorlagen in diesem Browser frei sind (Abschnitt 3.9a); enthält deine E-Mail-Adresse und die Signatur des Links</li>
        <li><strong>gruenderx:vorlagen-angefordert</strong> (LocalStorage) – merkt die zuletzt für eine Vorlage eingegebene E-Mail-Adresse, damit du sie beim erneuten Senden nicht noch einmal tippen musst</li>
        <li><strong>gruenderx:tool-unlocked:{`{tool}`}</strong> (LocalStorage) – merkt, dass du ein kostenloses Tool bereits freigeschaltet hast (Abschnitt 3.9); enthält nur den Zeitpunkt, keine E-Mail-Adresse</li>
        <li><strong>gx-event-radar-v1, gx-chancen-radar-besuch, gx-steuerkalender-v1, gx-ku-waechter-v1, gx-gruendungsunterlagen-v1, gx-pitchdeck-v1, gx-gz-phase2-v1, gx-bankgespraech-v1, gx-startup-guthaben-v1, gx-sidebar-zu-v1</strong> (LocalStorage) – deine Eingaben in den Tools aus Abschnitt 3.12, damit sie beim nächsten Besuch erhalten bleiben; sie verlassen deinen Browser nicht</li>
      </ul>
      <p>
        Für diese Cookies ist keine Einwilligung erforderlich.
      </p>
      <p>
        <strong>Marketing-Cookies (nur mit Einwilligung):</strong> Nur wenn du im Cookie-Banner „Alle akzeptieren“
        wählst, laden wir das Meta-Pixel (Meta Platforms Ireland Ltd.) und – sofern aktiv – den Google-Tag für
        Google Ads (Google Ireland Ltd.). Sie messen, welche Anzeigen zu einer Registrierung oder einem Kauf führen,
        und setzen dafür Cookies wie <strong>_fbp</strong>, <strong>_fbc</strong> bzw. <strong>_gcl_*</strong>.
        Dabei können Daten in die USA übermittelt werden. Rechtsgrundlage ist deine Einwilligung
        (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO). Ohne Einwilligung wird keines dieser Skripte geladen.
      </p>
      <p>
        <strong>Widerruf:</strong> Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen –
        über „Cookie-Einstellungen“ im Seitenfuß oder hier:{" "}
        <button
          type="button"
          onClick={openConsentSettings}
          className="font-medium text-foreground underline underline-offset-2 hover:text-accent-blue"
        >
          Cookie-Einstellungen öffnen
        </button>
        . Beim Widerruf löschen wir die Marketing-Cookies und laden die Seite neu.
      </p>

      <h2 id="ki-hinweis" className="mt-10 mb-3 text-xl font-semibold md:text-2xl">7. Keine automatisierte Entscheidungsfindung mit Rechtswirkung</h2>
      <p>
        Felix-Chat, Rechtsform-Wizard und Steuer-Cockpit liefern <strong>menschlich überprüfbare Vorschläge</strong>,
        keine rechtlich verbindlichen Entscheidungen. Der Output enthält stets den Hinweis, dass eine zugelassene
        steuer- oder rechtsberatende Person die finale Entscheidung treffen sollte. Eine ausschließlich
        automatisierte Entscheidung i. S. d. Art. 22 Abs. 1 DSGVO – mit rechtlicher Wirkung oder ähnlich
        erheblicher Beeinträchtigung – findet nicht statt:
      </p>
      <ul>
        <li>(a) Du kannst jeden Vorschlag jederzeit ignorieren oder anpassen.</li>
        <li>(b) Wir treffen keine Vertrags-, Preis- oder Zugangs-Entscheidungen über dich auf Basis von KI-Profilen.</li>
        <li>(c) Profilbildung i. S. d. Art. 4 Nr. 4 DSGVO findet nicht statt.</li>
      </ul>
      <p>
        Soweit du eine Empfehlung umsetzt, beruht dies auf deiner eigenen freien Entscheidung. Diese Linie folgt
        den Leitlinien WP251rev.01 sowie der Rechtsprechung des EuGH (C-634/21, „SCHUFA").
      </p>

      <h2 id="rechte" className="mt-10 mb-3 text-xl font-semibold md:text-2xl">8. Deine Rechte als Betroffene:r</h2>
      <ul>
        <li><strong>Auskunft</strong> (Art. 15 DSGVO) – welche Daten haben wir von dir?</li>
        <li><strong>Berichtigung</strong> (Art. 16) – falsche Daten korrigieren lassen.</li>
        <li><strong>Löschung</strong> (Art. 17) – „Recht auf Vergessenwerden". Du kannst dein Konto und alle Daten jederzeit selbst löschen unter <em>Profil → Sicherheit → „Konto endgültig löschen"</em> (außer gesetzlich aufzubewahrende Rechnungs-Daten). Alternativ formlos per E-Mail.</li>
        <li><strong>Einschränkung</strong> (Art. 18) – Verarbeitung pausieren.</li>
        <li><strong>Datenübertragbarkeit</strong> (Art. 20) – Export deiner Daten in maschinenlesbarem Format (JSON).</li>
        <li><strong>Widerspruch</strong> (Art. 21) – gegen Verarbeitung nach lit. f.</li>
        <li><strong>Widerruf</strong> einmal erteilter Einwilligungen mit Wirkung für die Zukunft.</li>
        <li><strong>Beschwerde bei Aufsichtsbehörde</strong> (Art. 77) – z. B. Hamburgischer Beauftragter für Datenschutz und Informationsfreiheit.</li>
      </ul>
      <p>Anfragen formlos an: <a href="mailto:datenschutz@gründerx.de">datenschutz@gründerx.de</a></p>

      <h2 id="sicherheit" className="mt-10 mb-3 text-xl font-semibold md:text-2xl">9. Sicherheit der Datenverarbeitung</h2>
      <ul>
        <li>HTTPS/TLS 1.3 für alle Verbindungen</li>
        <li>Passwörter werden niemals im Klartext gespeichert (Supabase Auth, bcrypt/argon2)</li>
        <li>Row-Level-Security (RLS) auf Datenbank-Ebene – jede:r User:in sieht nur eigene Daten</li>
        <li>Tägliche Backups, geografisch getrennte Speicherung</li>
        <li>Edge Functions laufen in isolierten Containern</li>
        <li>2FA-Optionen für Mitarbeiter-Accounts (intern)</li>
      </ul>

      <h2 id="aenderungen" className="mt-10 mb-3 text-xl font-semibold md:text-2xl">10. Änderungen dieser Erklärung</h2>
      <p>
        Wir passen diese Datenschutzerklärung gelegentlich an, wenn sich Funktionen oder Auftragsverarbeiter
        ändern. Die jeweils aktuelle Version findest du auf dieser Seite. Bei wesentlichen Änderungen informieren
        wir dich zusätzlich per E-Mail.
      </p>

      <p className="mt-8 text-sm text-muted-foreground">Stand: Mai 2026 · Version 2.0</p>
      </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Datenschutz;
