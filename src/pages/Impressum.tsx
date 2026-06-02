import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";

const Impressum = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="Impressum | GründerX"
      description="Impressum und Anbieterkennzeichnung gemäß § 5 TMG von GründerX."
      path="/impressum"
    />
    <Navbar />
    <main className="container max-w-3xl pt-32 pb-24 prose prose-slate">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-2 not-prose">Rechtliches</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Impressum</h1>

      <h2 className="text-2xl font-bold mt-8 mb-3">Angaben gemäß § 5 TMG</h2>
      <h3 className="font-semibold mt-4">Verantwortlich für den Inhalt:</h3>
      <p>Sonni Buttke<br />Einzelunternehmen<br />(Aktuell Ummeldung auf GründerX GmbH im Gange)</p>

      <h3 className="font-semibold mt-4">Umsatzsteuer-ID:</h3>
      <p>DE355021007</p>

      <h3 className="font-semibold mt-4">Anschrift:</h3>
      <p>Pinguinweg 18<br />22527 Hamburg<br />Deutschland</p>

      <h3 className="font-semibold mt-4">Telefon:</h3>
      <p>+49 175 4220573</p>

      <h3 className="font-semibold mt-4">E-Mail:</h3>
      <p>impressum@gründerx.de</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">Wichtiger Hinweis</h2>
      <p>
        GründerX bietet KI-gestützte Orientierung zu Gründung, Steuern und E-Commerce-Setup,
        keine Rechts- oder Steuerberatung im Sinne des Rechtsdienstleistungs- bzw.
        Steuerberatungsgesetzes. Für verbindliche Einschätzungen wenden Sie sich bitte an einen
        zugelassenen Steuerberater oder Rechtsanwalt.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-3">Haftungsausschluss</h2>
      <h3 className="font-semibold mt-4">Haftung für Inhalte</h3>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
        den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
        oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
      <h3 className="font-semibold mt-4">Haftung für Links</h3>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
        Betreiber der Seiten verantwortlich.
      </p>
      <h3 className="font-semibold mt-4">Urheberrecht</h3>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
        deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
        Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
        des jeweiligen Autors bzw. Erstellers.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-3">Affiliate- und Werbe-Hinweis (§ 6 TMG)</h2>
      <p>
        Auf GründerX werden externe Anbieter (z. B. für Banking, Buchhaltung, Versand, Domains,
        Shop-Systeme) verlinkt. Ein Teil dieser Links sind <strong>Partner-Links / Affiliate-Links</strong>{" "}
        (z. B. Impact, AWIN, Direkt-Partnerprogramme). Bei einem Vertragsabschluss über solche Links
        kann GründerX eine Provision oder Pauschale erhalten – für dich entstehen{" "}
        <strong>keine Mehrkosten</strong>. Affiliate-Vergütungen beeinflussen nicht die redaktionelle
        Bewertung oder die Reihenfolge in den Vergleichen. Details siehe{" "}
        <a href="/agb" className="text-accent-blue underline">§ 14 unserer AGB</a>.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-3">Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" className="text-accent-blue underline">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </main>
    <Footer />
  </div>
);

export default Impressum;
