import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const Datenschutz = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container max-w-3xl pt-32 pb-24 prose prose-slate">
      <h1 className="text-4xl font-extrabold mb-8">Datenschutzerklärung</h1>

      <h2 className="text-2xl font-bold mt-8 mb-3">Allgemeine Hinweise</h2>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
        personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
      </p>

      <h3 className="font-semibold mt-4">Verantwortlich für die Datenerfassung:</h3>
      <p>
        Sonni Buttke<br />
        Pinguinweg 18, 22527 Hamburg<br />
        E-Mail: impressum@gründerx.de<br />
        Telefon: +49 175 4220573
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-3">Datenerfassung auf dieser Website</h2>
      <h3 className="font-semibold mt-4">Kontaktformular und E-Mail-Kontakt</h3>
      <p>
        Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben
        zwecks Bearbeitung der Anfrage gespeichert.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
        <br />
        <strong>Speicherdauer:</strong> Bis zur vollständigen Bearbeitung, längstens 3 Jahre.
      </p>

      <h3 className="font-semibold mt-4">Server-Log-Dateien</h3>
      <ul>
        <li>Browsertyp und Browserversion</li>
        <li>Verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse (anonymisiert)</li>
      </ul>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO ·{" "}
        <strong>Speicherdauer:</strong> 7 Tage
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-3">Cookies</h2>
      <p>
        Diese Website verwendet nur technisch notwendige Cookies (Session, Theme-Präferenzen,
        Spracheinstellungen). Diese enthalten keine personenbezogenen Daten.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-3">Ihre Rechte</h2>
      <ul>
        <li>Auskunftsrecht (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
        <li>Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>
      <p>Anfragen bitte an: impressum@gründerx.de</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine
        verschlüsselte Verbindung erkennen Sie am Schloss-Symbol in Ihrer Browserzeile.
      </p>

      <p className="mt-8 text-sm text-muted-foreground">Stand: Mai 2026</p>
    </main>
    <Footer />
  </div>
);

export default Datenschutz;
