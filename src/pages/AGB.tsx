import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const AGB = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container max-w-3xl pt-32 pb-24 prose prose-slate">
      <h1 className="text-4xl font-extrabold mb-8">Allgemeine Geschäftsbedingungen</h1>

      <h2 className="text-2xl font-bold mt-8 mb-3">Wichtiger Hinweis</h2>
      <p>
        GründerX bietet KI-gestützte Orientierung zu Gründung, Steuern und E-Commerce-Setup, keine
        Rechts- oder Steuerberatung. Für verbindliche Einschätzungen wenden Sie sich bitte an einen
        zugelassenen Steuerberater oder Rechtsanwalt.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-3">§ 1 Geltungsbereich und Vertragspartner</h2>
      <p>(1) Diese AGB gelten für alle Leistungen, die über die Website gründerx.de angeboten werden.</p>
      <p>
        (2) Vertragspartner ist Sonni Buttke, Pinguinweg 18, 22527 Hamburg,
        impressum@gründerx.de, Tel. +49 175 4220573.
      </p>
      <p>(3) Diese AGB gelten ausschließlich. Abweichende AGB des Kunden werden nicht Vertragsbestandteil, sofern nicht ausdrücklich zugestimmt.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">§ 2 Vertragsschluss</h2>
      <p>(1) Die Darstellung der Leistungen stellt kein verbindliches Angebot dar.</p>
      <p>(2) Durch Buchung oder Kontaktaufnahme gibt der Kunde ein verbindliches Angebot ab.</p>
      <p>(3) Die Annahme erfolgt durch Bestätigung in Textform oder Erbringung der Leistung.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">§ 3 Leistungen</h2>
      <p>(1) Der Leistungsumfang ergibt sich aus der jeweiligen Leistungsbeschreibung.</p>
      <p>(2) Leistungen werden nach aktuellem Stand und bestem Wissen erbracht.</p>
      <p>(3) Eine Erfolgsgarantie wird nicht übernommen.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">§ 4 Preise und Zahlungsbedingungen</h2>
      <p>(1) GründerX kostet 99,99 € pro Monat. Das Founder Bundle (GründerX + AnwaltX) kostet 129 € pro Monat.</p>
      <p>(2) Alle Preise verstehen sich inkl. der gesetzlichen Umsatzsteuer, sofern nicht anders ausgewiesen.</p>
      <p>(3) Rechnungen sind innerhalb von 14 Tagen ohne Abzug zu begleichen.</p>
      <p>(4) Bei Zahlungsverzug fallen Verzugszinsen i. H. v. 9 Prozentpunkten über dem Basiszinssatz an.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">§ 5 Mitwirkungspflichten des Kunden</h2>
      <p>(1) Der Kunde stellt alle erforderlichen Informationen vollständig und korrekt bereit.</p>
      <p>(2) Änderungen der Kontaktdaten sind unverzüglich mitzuteilen.</p>
      <p>(3) Der Kunde stellt sicher, dass alle bereitgestellten Dokumente rechtmäßig erlangt wurden.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">§ 6 Haftung</h2>
      <p>(1) Wir haften unbeschränkt für Schäden aus Verletzung von Leben, Körper oder Gesundheit.</p>
      <p>(2) Für sonstige Schäden haften wir nur bei Vorsatz und grober Fahrlässigkeit.</p>
      <p>(3) Die Haftung für mittelbare Schäden ist ausgeschlossen, soweit gesetzlich zulässig.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">§ 7 Datenschutz</h2>
      <p>Wir behandeln Kundendaten vertraulich. Details siehe Datenschutzerklärung.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">§ 8 Kündigung</h2>
      <p>(1) Abos können monatlich zum Monatsende gekündigt werden.</p>
      <p>(2) Das Recht zur außerordentlichen Kündigung bleibt unberührt.</p>
      <p>(3) Kündigungen bedürfen der Textform.</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">§ 9 Schlussbestimmungen</h2>
      <p>(1) Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.</p>
      <p>(2) Gerichtsstand ist Hamburg, sofern der Kunde Vollkaufmann ist.</p>
      <p>(3) Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>

      <p className="mt-8 text-sm text-muted-foreground">Stand: Mai 2026</p>
    </main>
    <Footer />
  </div>
);

export default AGB;
