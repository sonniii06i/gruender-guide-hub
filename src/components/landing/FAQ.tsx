import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { PLANS, FOUNDER_SATZ, formatEurCents, netCentsOf } from "@/config/pricing";
import { ANBIETER_ANZAHL, ANBIETER_KATEGORIEN, GUIDE_COUNT, TOOL_COUNT } from "@/data/kennzahlen";

const faqs = [
  {
    q: "Für wen ist GründerX gedacht? Geht das auch unter 18 oder ab 50?",
    a: `Ja. GründerX ist bewusst für alle von 12 bis 70 gebaut. Beim Start wählst du deine Altersgruppe und dein Ziel, dann schlagen wir passende Guides vor. Alle ${GUIDE_COUNT} Guides bleiben jederzeit für jeden offen. Unter 18 weisen wir immer klar darauf hin, wo Eltern und Familiengericht einbezogen werden müssen.`,
  },
  {
    q: "Wie funktionieren die interaktiven Guides und Arbeitsfenster?",
    a: "Jeder Guide ist in kurze, klare Schritte aufgebaut, ähnlich wie ein interaktiver Kurs. Statt langer Textwände bekommst du pro Schritt genau eine Aufgabe, einen kurzen Selbst-Check mit XP und direkte Arbeitsfenster (Rechner, Wizards, Checklisten oder Notizen), die du ohne Tab-Wechsel im selben Screen öffnest.",
  },
  {
    q: "Gibt es GründerX auch für das Handy und als App?",
    a: "Ja. Die gesamte Oberfläche ist zuerst für das Handy gedacht, mit unterer App-Navigation und großen Tippflächen. Du kannst GründerX direkt im mobilen Browser nutzen, auf den Homescreen legen oder über unsere App-Umgebung für iOS und Android verwenden.",
  },
  {
    q: "Welche Rechtsform passt zu mir: Einzelunternehmen, UG, GmbH oder Holding?",
    a: "Unser Rechtsform-Finder und Felix vergleichen Einzelunternehmen, UG, GmbH und Holding anhand deines Umsatzes, deines Risikos und deiner Pläne. Du siehst Kosten, Haftung und Pflichten direkt nebeneinander und triffst die Entscheidung selbst.",
  },
  {
    q: "Gibt es einen ehrlichen Guide für Amex US (Privat & Business) und US-LLC?",
    a: "Ja. Im Amex-US-Guide und im US-Setup-Bereich führen wir dich durch den Global Transfer aus Deutschland, echte US-Adresse (z. B. Cloud Residence mit Utility-Nachweis), US-Rufnummer per Tello eSIM für Verifizierungsanrufe, den Unterschied zwischen Wise (Risiko bei Bankprüfung) und Filialbanken wie Chase oder Bank of America sowie die nächsten Schritte zur US Business Amex.",
  },
  {
    q: "Welche Online-Shops, Webseiten und Marketplaces deckt GründerX ab?",
    a: "Vom Bau der ersten eigenen Webseite oder App (inkl. SEO für Google und KI-Suche wie ChatGPT) bis zum Setup für Shopify, Amazon Seller, Kaufland, Stripe und PayPal Business samt Verpackungsregister LUCID, WEEE und GPSR.",
  },
  {
    q: "Welche Anbieter werden verglichen?",
    a: `${ANBIETER_ANZAHL} Anbieter in ${ANBIETER_KATEGORIEN} Kategorien mit Stärken, Schwächen und aktuellen Preisen: Banking DE (u. a. Qonto, Holvi, Finom, Kontist, N26, Revolut), Banking US (Mercury, Wise, Relay, Brex, Chase, Bank of America), Versand DACH, Buchhaltung (Lexware Office, sevDesk, Accountable, BuchhaltungsButler), LUCID, Shop-Systeme, Domains, Versicherungen und Rechtsschutz.`,
  },
  {
    q: "Was kostet GründerX?",
    a: `GründerX kostet ${formatEurCents(PLANS.gruenderx.grossCents)} im Monat oder ${formatEurCents(PLANS["gruenderx-year"].grossCents)} im Jahr (zwei Monate günstiger als zwölf Monatszahlungen). Alle Beträge sind Endpreise inklusive 19 % Umsatzsteuer (monatlich netto ${formatEurCents(netCentsOf(PLANS.gruenderx.grossCents))}). Alle Details stehen auf /preise.`,
  },
  {
    q: "Kann ich monatlich kündigen und gibt es einen Rabatt über die Quizze?",
    a: `Ja. Du kündigst jederzeit selbst im Konto zum Ende der laufenden Abrechnungsperiode, ohne lange Bindung. ${FOUNDER_SATZ} In unseren kostenlosen Quizzen und Umfragen schaltest du denselben Aktionscode direkt nach deinem Ergebnis frei.`,
  },
  {
    q: "Kann ich GründerX erst kostenlos testen?",
    a: `Ja, ohne Konto: Businessplan-Generator, Gründungskosten-Rechner, Rechtsform-Finder, WEEE-Check, Brand-Check, LUCID-Wizard sowie alle Quizze und Listicles kannst du direkt ausprobieren. Mit dem Abo schaltest du alle ${TOOL_COUNT} Tools, alle ${GUIDE_COUNT} interaktiven Guides und Felix unbegrenzt frei.`,
  },
  {
    q: "Übernehmt ihr Behördengänge oder Steuerberatung?",
    a: "Nein. Wir liefern dir klare Schritt-für-Schritt-Anleitungen, ausgefüllte Vorlagen und Rechner. Die Einreichung beim Gewerbeamt, Finanzamt oder Notar machst du selbst. Individuelle Steuer- oder Rechtsberatung ersetzen wir nicht.",
  },
  {
    q: "Sind meine Daten sicher?",
    a: "Deine Konto- und Projektdaten liegen verschlüsselt in einer Datenbank in der EU (Supabase, Frankfurt). Fragen an den KI-Assistenten Felix werden zur Beantwortung an KI-Anbieter übermittelt (abgesichert über EU-US Data Privacy Framework bzw. EU-Standardvertragsklauseln). Deine Daten werden nicht zum Training fremder Modelle verwendet.",
  },
];

export const FAQ = () => (
  <section id="faq" className="border-y border-border bg-secondary/45 py-14 md:py-20">
    <div className="container grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.78fr,1.22fr] lg:gap-14">
      <div>
        <p className="mb-2.5 inline-flex items-center rounded-full border border-border bg-card px-3 py-0.5 text-[12.5px] font-semibold text-primary shadow-sm">
          Klare Antworten
        </p>
        <h2 className="text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-primary md:text-[2.25rem]">
          Häufige Fragen.
        </h2>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg">
          Noch mehr Details findest du auf der{" "}
          <Link to="/faq" className="font-semibold text-accent-blue underline-offset-4 hover:underline">
            FAQ-Seite
          </Link>
          . Etwas offen geblieben? Schreib uns über{" "}
          <Link to="/kontakt" className="font-semibold text-accent-blue underline-offset-4 hover:underline">
            Kontakt
          </Link>
          .
        </p>
      </div>

      {/* Natives <details>, damit jede Antwort im vorgerenderten HTML für Google & KI-Suche steht. */}
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        {faqs.map((f, i) => (
          <details key={i} className="group px-5 sm:px-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-foreground transition-colors hover:text-accent-blue">
              <span>{f.q}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-transform duration-200 group-open:rotate-45 group-open:bg-primary group-open:text-primary-foreground">
                <Plus className="h-4 w-4" aria-hidden="true" />
              </span>
            </summary>
            <p className="-mt-1 pb-5 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
