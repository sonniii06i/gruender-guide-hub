import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";

/**
 * Öffentliche Affiliate-Support-Seite (Digistore24).
 *
 * Diese Seite ist die im Digistore24-Marktplatzeintrag hinterlegte
 * "Affiliate-Support-Seite" und muss ohne Login erreichbar bleiben.
 * Digistore24 prüft sie auf fünf Punkte: Provisionshöhe, Vorteile für den
 * Affiliate, kurze Beschreibung der Partnerschaft, Promolink/Werbemittel
 * und eine Kontaktmöglichkeit. Nicht kürzen, ohne den Marktplatzeintrag
 * neu genehmigen zu lassen.
 */

const PRODUCTS = [
  {
    id: "728385",
    name: "GründerX — KI-Gründungs-Copilot",
    price: "64,99 €",
    commission: "ca. 16,38 €",
  },
  {
    id: "728388",
    name: "Founder Bundle — AnwaltX + GründerX",
    price: "99,99 €",
    commission: "ca. 25,21 €",
  },
];

const BENEFITS = [
  {
    title: "Wiederkehrend, nicht nur die erste Rate",
    text: "Die 30 % werden auf jede Rate gezahlt, solange das Abo läuft. Ein Kunde, der zwölf Monate bleibt, zahlt dir zwölf Provisionen — nicht eine.",
  },
  {
    title: "Partnerschaft wird automatisch angenommen",
    text: "Kein Bewerbungsverfahren und keine Wartezeit: Anfragen über den Marktplatz oder unseren Einladelink werden sofort freigeschaltet, du kannst direkt starten.",
  },
  {
    title: "Abrechnung komplett über Digistore24",
    text: "Digistore24 ist Reseller und übernimmt Zahlungsabwicklung, Rechnungen, Umsatzsteuer, Käuferservice und Retouren. Du bekommst deine Provision nach dem regulären Digistore24-Auszahlungsrhythmus, ohne dass wir dazwischenstehen.",
  },
  {
    title: "Abo-Produkt statt Einmalverkauf",
    text: "Beide Angebote sind monatliche Abos ohne Mindestlaufzeit. Für dich heißt das: planbarer, aufbauender Umsatz statt einmaliger Spitzen.",
  },
];

const Partner = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="Partnerprogramm für Affiliates — 30 % wiederkehrend | GründerX"
      description="Bewirb GründerX über Digistore24: 30 % Provision auf jede Rate, wiederkehrend für die gesamte Laufzeit des Abos. Konditionen, Promolinks und Werbemittel auf einen Blick."
      path="/partner"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Partnerprogramm für Affiliates",
        description:
          "Konditionen, Promolinks und Werbemittel für Affiliates, die GründerX über Digistore24 bewerben.",
        url: "https://gruenderx.de/partner",
        inLanguage: "de-DE",
        isPartOf: {
          "@type": "WebSite",
          name: "GründerX",
          url: "https://gruenderx.de",
        },
      }}
    />
    <Navbar />

    <main className="container max-w-3xl pt-32 pb-24">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-2">
        Für Affiliates
      </p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Partnerprogramm für Affiliates
      </h1>
      <p className="text-lg text-muted-foreground mb-12">
        Informationen für Affiliates, die GründerX über Digistore24 bewerben
        möchten — Konditionen, Promolinks und Werbemittel.
      </p>

      <h2 className="text-2xl font-bold tracking-tight mb-4">
        Worum es bei der Partnerschaft geht
      </h2>
      <div className="space-y-4 text-muted-foreground mb-12">
        <p>
          GründerX ist ein KI-Copilot für die Gründung: Rechtsform wählen,
          Gewerbe anmelden, Steuern und Buchhaltung sortieren,
          Marktplatz-Konten bei Amazon und Co. sauber aufsetzen. Ein Abo ohne
          Mindestlaufzeit statt Beratungsstunden.
        </p>
        <p>
          Für dich als Affiliate ist die Zielgruppe der eigentliche Punkt:
          Menschen, die gerade gründen oder ihr Business gerade formalisieren.
          Das ist ein Moment mit hoher Kaufbereitschaft und einer klaren
          To-do-Liste — es funktioniert deshalb in Gründer- und
          E-Commerce-Newslettern, in Selbstständigen-Communities, in
          Ratgeber- und Vergleichsinhalten und in YouTube- oder
          Podcast-Formaten rund um Gründung, Steuern und Onlinehandel.
        </p>
        <p>
          Die Zusammenarbeit läuft vollständig über den Digistore24-Marktplatz.
          Wir stellen Konditionen, Links und Werbemittel; alles Kaufmännische
          wickelt Digistore24 ab.
        </p>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mb-4">Deine Provision</h2>
      <p className="text-muted-foreground mb-6">
        <strong className="text-foreground">30 % Provision auf jede Rate</strong>{" "}
        — auf beide unten aufgeführten Produkte, wiederkehrend für die gesamte
        Laufzeit des Abos und nicht nur auf die Erstzahlung. Es gibt keine
        Deckelung und keine Mindestumsätze.
      </p>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 pr-4 font-semibold">Produkt</th>
              <th className="py-3 pr-4 font-semibold">Digistore24-ID</th>
              <th className="py-3 pr-4 font-semibold">Preis (brutto)</th>
              <th className="py-3 font-semibold">Deine Provision je Monat</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => (
              <tr key={p.id} className="border-b border-border/50">
                <td className="py-3 pr-4 text-muted-foreground">{p.name}</td>
                <td className="py-3 pr-4 text-muted-foreground">{p.id}</td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {p.price} / Monat
                </td>
                <td className="py-3 font-semibold">{p.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-muted-foreground mb-2">
        Die Provision wird auf den Nettobetrag der jeweiligen Rate gerechnet.
        Die angegebenen Euro-Beträge sind deshalb Richtwerte für einen deutschen
        Käufer mit 19 % Umsatzsteuer; bei abweichendem Käuferland ändert sich
        der Nettobetrag und damit der Auszahlbetrag. Maßgeblich ist immer die
        Abrechnung in deinem Digistore24-Konto.
      </p>
      <p className="text-sm text-muted-foreground mb-12">
        Eine zweistufige Empfehlungsprovision (Provision dafür, weitere
        Affiliates zu werben) bieten wir derzeit nicht an.
      </p>

      <h2 className="text-2xl font-bold tracking-tight mb-6">
        Was du als Affiliate davon hast
      </h2>
      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {BENEFITS.map((b) => (
          <div key={b.title} className="rounded-lg border p-5">
            <h3 className="font-bold mb-2">{b.title}</h3>
            <p className="text-sm text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold tracking-tight mb-4">Promolinks</h2>
      <p className="text-muted-foreground mb-6">
        Ersetze <code className="px-1 rounded bg-muted">AFFILIATE</code> durch
        deine Digistore24-ID und{" "}
        <code className="px-1 rounded bg-muted">CAMPAIGNKEY</code> durch einen
        frei wählbaren Namen für die jeweilige Kampagne (oder lasse den Teil
        weg).
      </p>
      <div className="space-y-4 mb-10">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="rounded-lg border p-4">
            <div className="font-semibold mb-2">{p.name}</div>
            <code className="block text-sm break-all text-muted-foreground">
              https://www.checkout-ds24.com/redir/{p.id}/AFFILIATE/CAMPAIGNKEY
            </code>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold tracking-tight mb-3">
        Partnerschaft beantragen
      </h3>
      <p className="text-muted-foreground mb-3">
        Über diesen Einladelink wirst du für alle unsere Produkte auf einmal
        freigeschaltet — auch dann, wenn du noch kein Digistore24-Konto hast:
      </p>
      <code className="block text-sm break-all text-muted-foreground rounded-lg border p-4 mb-12">
        https://www.digistore24.com/signup/728387,728382,728389,728388,728385/
      </code>

      <h2 className="text-2xl font-bold tracking-tight mb-4">Werbemittel</h2>
      <div className="space-y-4 text-muted-foreground mb-12">
        <p>
          Logos, Produktbilder, Banner in den gängigen Formaten sowie fertige
          Textbausteine für Newsletter und Social Media stellen wir dir zur
          Verfügung. Schreib uns kurz, in welchen Formaten und für welchen Kanal
          du sie brauchst — du bekommst das Paket per E-Mail.
        </p>
        <p>
          Zusätzlich darfst du für deine Inhalte frei aus unseren öffentlichen
          Ratgeber- und Tool-Seiten zitieren, solange du auf GründerX als Quelle
          verweist.
        </p>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mb-4">
        Fragen? Schreib uns
      </h2>
      <p className="text-muted-foreground mb-4">
        Für alles rund um die Partnerschaft — Konditionen, Werbemittel,
        Kampagnen-Ideen, Sonderabsprachen — erreichst du uns direkt:
      </p>
      <ul className="text-muted-foreground space-y-2 mb-4">
        <li>
          E-Mail:{" "}
          <a
            href="mailto:impressum@gruenderx.de?subject=Partnerprogramm%20Gr%C3%BCnderX"
            className="text-accent-blue hover:underline"
          >
            impressum@gruenderx.de
          </a>
        </li>
        <li>
          Kontaktformular:{" "}
          <a href="/kontakt" className="text-accent-blue hover:underline">
            gruenderx.de/kontakt
          </a>
        </li>
      </ul>
      <p className="text-muted-foreground">
        Wir antworten in der Regel innerhalb eines Werktages. Die vollständigen
        Anbieterangaben stehen im{" "}
        <a href="/impressum" className="text-accent-blue hover:underline">
          Impressum
        </a>
        .
      </p>
    </main>

    <Footer />
  </div>
);

export default Partner;
