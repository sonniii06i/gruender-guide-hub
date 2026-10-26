import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/landing/PageHeader";
import { KitTable } from "@/components/cockpit/kit";
import { PublicSection, InfoCard } from "@/components/public/PublicBlocks";
import { Repeat, Zap, Receipt, CalendarClock, Link2, Mail } from "lucide-react";

const BENEFIT_ICONS = [Repeat, Zap, Receipt, CalendarClock];

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
      title="GründerX-Partnerprogramm: 30 % wiederkehrende Provision"
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

    <main>
      <PageHeader
        width="max-w-4xl"
        crumbs={[{ label: "Start", to: "/" }, { label: "Partnerprogramm" }]}
        kicker={<span className="text-sm font-medium text-accent-blue">Für Affiliates</span>}
        title="Partnerprogramm für Affiliates"
        lead={
          <p>
            Informationen für Affiliates, die GründerX über Digistore24 bewerben
            möchten — Konditionen, Promolinks und Werbemittel.
          </p>
        }
      >
        <dl className="grid max-w-2xl grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:grid-cols-3">
          <div className="px-5 py-4">
            <dt className="text-sm text-muted-foreground">Provision</dt>
            <dd className="text-2xl font-semibold tracking-tight tabular">30 %</dd>
          </div>
          <div className="border-t border-border px-5 py-4 sm:border-l sm:border-t-0">
            <dt className="text-sm text-muted-foreground">Laufzeit</dt>
            <dd className="text-lg font-semibold">jede Rate</dd>
          </div>
          <div className="border-t border-border px-5 py-4 sm:border-l sm:border-t-0">
            <dt className="text-sm text-muted-foreground">Abwicklung</dt>
            <dd className="text-lg font-semibold">Digistore24</dd>
          </div>
        </dl>
      </PageHeader>

      <div className="container max-w-4xl space-y-14 px-4 py-12 md:py-16">
        <PublicSection title="Worum es bei der Partnerschaft geht">
          <div className="max-w-[68ch] space-y-4 leading-relaxed text-muted-foreground">
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
        </PublicSection>

        <PublicSection title="Deine Provision">
          <p className="mb-6 max-w-[68ch] leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">30 % Provision auf jede Rate</strong>{" "}
            — auf beide unten aufgeführten Produkte, wiederkehrend für die gesamte
            Laufzeit des Abos und nicht nur auf die Erstzahlung. Es gibt keine
            Deckelung und keine Mindestumsätze.
          </p>

          <KitTable caption="Produkte und Provision" className="mb-5 shadow-card">
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Digistore24-ID</th>
                <th>Preis (brutto)</th>
                <th>Deine Provision je Monat</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p) => (
                <tr key={p.id}>
                  <td className="min-w-[12rem] text-foreground/85">{p.name}</td>
                  <td className="text-muted-foreground">{p.id}</td>
                  <td className="whitespace-nowrap text-muted-foreground">{p.price} / Monat</td>
                  <td className="whitespace-nowrap font-semibold">{p.commission}</td>
                </tr>
              ))}
            </tbody>
          </KitTable>

          <div className="max-w-[68ch] space-y-2 text-sm leading-relaxed text-muted-foreground">
            <p>
              Die Provision wird auf den Nettobetrag der jeweiligen Rate gerechnet.
              Die angegebenen Euro-Beträge sind deshalb Richtwerte für einen deutschen
              Käufer mit 19 % Umsatzsteuer; bei abweichendem Käuferland ändert sich
              der Nettobetrag und damit der Auszahlbetrag. Maßgeblich ist immer die
              Abrechnung in deinem Digistore24-Konto.
            </p>
            <p>
              Eine zweistufige Empfehlungsprovision (Provision dafür, weitere
              Affiliates zu werben) bieten wir derzeit nicht an.
            </p>
          </div>
        </PublicSection>

        <PublicSection title="Was du als Affiliate davon hast">
          <div className="grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <InfoCard key={b.title} title={b.title} icon={BENEFIT_ICONS[i]}>
                <p className="text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </InfoCard>
            ))}
          </div>
        </PublicSection>

        <PublicSection
          title="Promolinks"
          lead={
            <p>
              Ersetze <code className="rounded bg-secondary px-1.5 py-0.5 text-[0.9em] text-foreground">AFFILIATE</code> durch
              deine Digistore24-ID und{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-[0.9em] text-foreground">CAMPAIGNKEY</code> durch einen
              frei wählbaren Namen für die jeweilige Kampagne (oder lasse den Teil
              weg).
            </p>
          }
        >
          <div className="space-y-3">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Link2 className="h-4 w-4 text-accent-blue" aria-hidden="true" /> {p.name}
                </div>
                <code className="block break-all rounded-lg bg-secondary/60 p-3 text-sm text-foreground/80" translate="no">
                  https://www.checkout-ds24.com/redir/{p.id}/AFFILIATE/CAMPAIGNKEY
                </code>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-accent-blue/20 bg-accent/60 p-5 md:p-6">
            <h3 className="text-lg font-semibold tracking-tight">Partnerschaft beantragen</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Über diesen Einladelink wirst du für alle unsere Produkte auf einmal
              freigeschaltet — auch dann, wenn du noch kein Digistore24-Konto hast:
            </p>
            <code className="mt-3 block break-all rounded-lg border border-border bg-card p-3 text-sm text-foreground/80" translate="no">
              https://www.digistore24.com/signup/728387,728382,728389,728388,728385/
            </code>
          </div>
        </PublicSection>

        <PublicSection title="Werbemittel">
          <div className="max-w-[68ch] space-y-4 leading-relaxed text-muted-foreground">
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
        </PublicSection>

        <PublicSection title="Fragen? Schreib uns">
          <InfoCard icon={Mail}>
            <p className="leading-relaxed text-muted-foreground">
              Für alles rund um die Partnerschaft — Konditionen, Werbemittel,
              Kampagnen-Ideen, Sonderabsprachen — erreichst du uns direkt:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>
                E-Mail:{" "}
                <a
                  href="mailto:impressum@gruenderx.de?subject=Partnerprogramm%20Gr%C3%BCnderX"
                  className="font-medium text-accent-blue hover:underline"
                >
                  impressum@gruenderx.de
                </a>
              </li>
              <li>
                Kontaktformular:{" "}
                <a href="/kontakt" className="font-medium text-accent-blue hover:underline">
                  gruenderx.de/kontakt
                </a>
              </li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Wir antworten in der Regel innerhalb eines Werktages. Die vollständigen
              Anbieterangaben stehen im{" "}
              <a href="/impressum" className="font-medium text-accent-blue hover:underline">
                Impressum
              </a>
              .
            </p>
          </InfoCard>
        </PublicSection>
      </div>
    </main>

    <Footer />
  </div>
);

export default Partner;
