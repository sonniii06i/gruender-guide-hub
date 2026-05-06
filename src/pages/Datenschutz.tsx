import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const Datenschutz = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container max-w-3xl pt-32 pb-24 prose prose-slate prose-headings:scroll-mt-24">
      <h1 className="text-4xl font-extrabold mb-2">Datenschutzerklärung</h1>
      <p className="text-sm text-muted-foreground">Stand: Mai 2026 · Version 2.0 (GründerX-spezifisch)</p>

      <h2 id="ueberblick" className="text-2xl font-bold mt-10 mb-3">1. Überblick & Verantwortlicher</h2>
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

      <h2 id="was-machen-wir" className="text-2xl font-bold mt-10 mb-3">2. Was ist GründerX – und welche Daten verarbeiten wir dafür?</h2>
      <p>
        GründerX ist eine SaaS-Plattform für deutsche Gründer:innen mit u. a. folgenden Funktionen:
      </p>
      <ul>
        <li><strong>Playbooks</strong> – Schritt-für-Schritt-Guides für GmbH, UG, Holding, Einzelunternehmen, Kleinunternehmer-Regelung, US-LLC etc.</li>
        <li><strong>Felix-Chat</strong> – KI-Co-Founder (Google Gemini via Lovable AI Gateway) für Fragen zu Gründung, Steuern, Compliance.</li>
        <li><strong>Steuer-Cockpit</strong> – Frist-Kalender, IAB-Rechner, Quartals-Schätzung.</li>
        <li><strong>Rechtsform-Wizard</strong> – Empfehlung zu Einzel/UG/GmbH/PartG.</li>
        <li><strong>Anbieter-Vergleich</strong> – 90+ Anbieter (Banking, Versand, Buchhaltung, Versicherungen etc.) mit Stärken/Schwächen.</li>
        <li><strong>Notar-Finder & Notar-Vorbereitung</strong> – PLZ-basierte Suche (OpenStreetMap) plus Datenerfassung für deinen Notartermin.</li>
        <li><strong>Firmenname-Check</strong> – Live-Verfügbarkeit über NorthData + GLEIF.</li>
      </ul>

      <h2 id="kategorien" className="text-2xl font-bold mt-10 mb-3">3. Datenkategorien & Zwecke im Detail</h2>

      <h3 className="font-semibold mt-6">3.1 Konto- und Stammdaten</h3>
      <p><strong>Daten:</strong> E-Mail-Adresse, Passwort-Hash (bcrypt/argon2 via Supabase Auth), optional Vor-/Nachname, Profilbild, Telefonnummer, Rechnungsadresse.</p>
      <p><strong>Zweck:</strong> Konto-Anlage, Login, Bestandsverwaltung, Rechnungsstellung.</p>
      <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>
      <p><strong>Speicherdauer:</strong> Bis zur Konto-Löschung. Rechnungs- und Buchhaltungs-relevante Daten 10 Jahre nach § 147 AO.</p>

      <h3 className="font-semibold mt-6">3.2 Playbook-Fortschritt & Notar-Vorbereitung (besonders sensibel)</h3>
      <p><strong>Daten:</strong> Eingaben in den Playbooks – inklusive personenbezogener Daten von <em>Gesellschafter:innen</em> und <em>Geschäftsführer:innen</em> wie Vor- und Nachname, Geburtsdatum, Geburtsort, Wohnanschrift, Beruf, Familienstand, Stammkapital-Anteil, Sacheinlage-Beschreibung. Dazu Firmen-Stammdaten (Sitz, Geschäftsadresse, Unternehmensgegenstand) und freie Notiz-Felder.</p>
      <p><strong>Zweck:</strong> Strukturierte Vorbereitung deines Notartermins, Wiederaufnahme des Fortschritts bei späterem Login, Generierung von Brief-/Anschreiben-Vorlagen für den Notar.</p>
      <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO. Bei Daten Dritter (z. B. Mit-Gesellschafter:innen) musst du als Erfasser die Einwilligung eingeholt haben.</p>
      <p><strong>Speicherort:</strong> Supabase-Datenbank in der EU (siehe Ziffer 5).</p>
      <p><strong>Speicherdauer:</strong> Bis zur Konto-Löschung oder bis du den Eintrag manuell löschst. Du kannst jederzeit unter „Meine Guides" Daten löschen oder den gesamten Run zurücksetzen.</p>
      <p><strong>Hinweis:</strong> Die Plattform ersetzt keinen Notar oder Steuerberater. Übermittlung der Daten an einen Notar erfolgt ausschließlich durch dich selbst (z. B. Copy/Paste oder Download als .txt) – wir senden Notar-Daten nicht automatisch an Dritte.</p>

      <h3 className="font-semibold mt-6">3.3 Felix-Chat (KI-Beratung)</h3>
      <p><strong>Daten:</strong> Chat-Verlauf (deine Nachrichten + Felix-Antworten), Zeitstempel, Konversations-ID.</p>
      <p><strong>Verarbeitung:</strong> Deine Nachrichten werden zur Beantwortung an das <strong>Lovable AI Gateway</strong> übermittelt, das wiederum <strong>Google Gemini</strong> als zugrundeliegendes Sprachmodell nutzt. Die Antwort wird zurück an deine Session gesendet und im Chat-Verlauf gespeichert.</p>
      <p><strong>Drittlandtransfer:</strong> Google Gemini-Server stehen u. U. außerhalb der EU (USA). Lovable AI Gateway sichert dies über EU-Standardvertragsklauseln (SCC) ab. Nutze Felix nicht für sensible personenbezogene Daten Dritter ohne ausdrückliche Einwilligung.</p>
      <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) i. V. m. Art. 49 Abs. 1 lit. b DSGVO (Vertragsdurchführung im Drittland).</p>
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
        Funktionen zu erkennen und das Produkt zu verbessern. Keine IP-Adresse, kein Cross-Site-Tracking, keine externen Analytics-Anbieter
        wie Google Analytics oder Meta Pixel.
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

      <h2 id="auftragsverarbeiter" className="text-2xl font-bold mt-10 mb-3">4. Auftragsverarbeiter & weitergegebene Daten</h2>
      <p>Wir nutzen ausschließlich Auftragsverarbeiter mit DSGVO-konformen Verträgen (Art. 28 DSGVO):</p>

      <table className="w-full text-sm my-4 border border-border">
        <thead className="bg-secondary">
          <tr>
            <th className="text-left px-3 py-2">Anbieter</th>
            <th className="text-left px-3 py-2">Zweck</th>
            <th className="text-left px-3 py-2">Standort</th>
            <th className="text-left px-3 py-2">DSGVO-Schutz</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>Supabase Inc.</strong></td>
            <td className="px-3 py-2">Hosting, Datenbank, Auth, Edge Functions</td>
            <td className="px-3 py-2">EU (Frankfurt)</td>
            <td className="px-3 py-2">AVV + EU-Server</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>Stripe Payments Europe Ltd.</strong></td>
            <td className="px-3 py-2">Zahlungs-Abwicklung, Rechnungen</td>
            <td className="px-3 py-2">EU (Dublin)</td>
            <td className="px-3 py-2">EU-DSGVO-konform</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>Lovable AI Gateway / Google Gemini</strong></td>
            <td className="px-3 py-2">Felix-Chat KI-Antworten</td>
            <td className="px-3 py-2">USA</td>
            <td className="px-3 py-2">EU-Standardvertragsklauseln (SCC)</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>Lovable.dev</strong></td>
            <td className="px-3 py-2">Hosting der App</td>
            <td className="px-3 py-2">EU/US</td>
            <td className="px-3 py-2">SCC, AVV</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>OpenStreetMap Foundation</strong></td>
            <td className="px-3 py-2">Notar-Suche (Nominatim, Overpass)</td>
            <td className="px-3 py-2">UK</td>
            <td className="px-3 py-2">Keine personenbezogenen Daten – nur PLZ</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>NorthData GmbH</strong></td>
            <td className="px-3 py-2">Firmenname-Verfügbarkeitsprüfung</td>
            <td className="px-3 py-2">EU (München)</td>
            <td className="px-3 py-2">Nur Firmenname</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-3 py-2"><strong>GLEIF</strong></td>
            <td className="px-3 py-2">LEI-Verifikation (Firmen)</td>
            <td className="px-3 py-2">Schweiz</td>
            <td className="px-3 py-2">Nur Firmenname</td>
          </tr>
        </tbody>
      </table>

      <h2 id="drittland" className="text-2xl font-bold mt-10 mb-3">5. Drittlandtransfer (USA / Nicht-EU)</h2>
      <p>
        Bei der Nutzung von Felix-Chat (Google Gemini-Backend) findet eine Übermittlung in die USA statt.
        Wir stellen den Schutz über die EU-Standardvertragsklauseln (SCC) sicher und nutzen Anbieter,
        die unter dem EU-US Data Privacy Framework zertifiziert sind. Du kannst den Felix-Chat jederzeit
        nicht nutzen – die anderen Funktionen der Plattform funktionieren ohne KI-Drittland-Transfer.
      </p>

      <h2 id="cookies" className="text-2xl font-bold mt-10 mb-3">6. Cookies & lokaler Speicher</h2>
      <p>Wir verwenden ausschließlich technisch notwendige Cookies und LocalStorage-Einträge:</p>
      <ul>
        <li><strong>sb-access-token / sb-refresh-token</strong> (Supabase Auth) – Login-Session, Lifetime: Session bzw. 7 Tage</li>
        <li><strong>theme-preference</strong> (LocalStorage) – Hell/Dunkel-Modus</li>
        <li><strong>stripe-session</strong> – nur während aktiver Zahlung gesetzt</li>
      </ul>
      <p>Es werden keine Tracking-, Analyse- oder Marketing-Cookies verwendet. Daher ist auch kein Cookie-Banner mit Einwilligungs-Funktion erforderlich.</p>

      <h2 id="ki-hinweis" className="text-2xl font-bold mt-10 mb-3">7. Keine automatisierte Entscheidungsfindung mit Rechtswirkung</h2>
      <p>
        Felix-Chat, Rechtsform-Wizard und Steuer-Cockpit liefern <strong>orientierende Empfehlungen</strong>, aber keine
        rechtlich verbindlichen Entscheidungen. Eine automatisierte Entscheidungsfindung im Sinne des
        Art. 22 DSGVO findet nicht statt. Du triffst alle finalen Entscheidungen selbst, idealerweise nach
        Rücksprache mit Steuerberater oder Anwalt.
      </p>

      <h2 id="rechte" className="text-2xl font-bold mt-10 mb-3">8. Deine Rechte als Betroffene:r</h2>
      <ul>
        <li><strong>Auskunft</strong> (Art. 15 DSGVO) – welche Daten haben wir von dir?</li>
        <li><strong>Berichtigung</strong> (Art. 16) – falsche Daten korrigieren lassen.</li>
        <li><strong>Löschung</strong> (Art. 17) – „Recht auf Vergessenwerden". Auf Wunsch löschen wir dein Konto und alle Daten (außer gesetzlich aufzubewahrende Rechnungs-Daten).</li>
        <li><strong>Einschränkung</strong> (Art. 18) – Verarbeitung pausieren.</li>
        <li><strong>Datenübertragbarkeit</strong> (Art. 20) – Export deiner Daten in maschinenlesbarem Format (JSON).</li>
        <li><strong>Widerspruch</strong> (Art. 21) – gegen Verarbeitung nach lit. f.</li>
        <li><strong>Widerruf</strong> einmal erteilter Einwilligungen mit Wirkung für die Zukunft.</li>
        <li><strong>Beschwerde bei Aufsichtsbehörde</strong> (Art. 77) – z. B. Hamburgischer Beauftragter für Datenschutz und Informationsfreiheit.</li>
      </ul>
      <p>Anfragen formlos an: <a href="mailto:datenschutz@gründerx.de">datenschutz@gründerx.de</a></p>

      <h2 id="sicherheit" className="text-2xl font-bold mt-10 mb-3">9. Sicherheit der Datenverarbeitung</h2>
      <ul>
        <li>HTTPS/TLS 1.3 für alle Verbindungen</li>
        <li>Passwörter werden niemals im Klartext gespeichert (Supabase Auth, bcrypt/argon2)</li>
        <li>Row-Level-Security (RLS) auf Datenbank-Ebene – jede:r User:in sieht nur eigene Daten</li>
        <li>Tägliche Backups, geografisch getrennte Speicherung</li>
        <li>Edge Functions laufen in isolierten Containern</li>
        <li>2FA-Optionen für Mitarbeiter-Accounts (intern)</li>
      </ul>

      <h2 id="aenderungen" className="text-2xl font-bold mt-10 mb-3">10. Änderungen dieser Erklärung</h2>
      <p>
        Wir passen diese Datenschutzerklärung gelegentlich an, wenn sich Funktionen oder Auftragsverarbeiter
        ändern. Die jeweils aktuelle Version findest du auf dieser Seite. Bei wesentlichen Änderungen informieren
        wir dich zusätzlich per E-Mail.
      </p>

      <p className="mt-8 text-sm text-muted-foreground">Stand: Mai 2026 · Version 2.0</p>
    </main>
    <Footer />
  </div>
);

export default Datenschutz;
