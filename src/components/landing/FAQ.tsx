import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { PLANS, FOUNDER_CODE, formatEurCents, netCentsOf } from "@/config/pricing";
import { ANBIETER_ANZAHL, ANBIETER_KATEGORIEN } from "@/data/kennzahlen";


const faqs = [
  {
    q: "Welche Rechtsform passt zu mir – Einzelunternehmen, UG, GmbH oder Holding?",
    a: "Felix vergleicht Einzelunternehmen, UG, GmbH und Holding-Konstrukte anhand deines Umsatzes, deines Risikos und deiner Pläne (Reinvest, Ausschüttung, Exit) – inklusive Wechsel-Wegweiser, wann sich ein Upgrade rechnet.",
  },
  {
    q: "Hilft GründerX bei US-LLC oder HK-Limited?",
    a: "Ja. Bundesstaaten-Vergleich (Wyoming, Delaware, New Mexico, Nevada), Registered-Agent-Auswahl, EIN- und ITIN-Antrag, BOI-Status (seit 26.03.2025 für US-LLCs entfallen), Form 5472/1120-Reminder sowie Banking (Mercury, Wise, Relay, Brex). Für Hong Kong: Setup, Profits-Tax, Offshore-Status, Audited Accounts und Banking (Statrys, Airwallex, Currenxie) – inkl. deutscher CFC-Regelungen.",
  },
  {
    q: "Welche Marketplaces deckt GründerX ab?",
    a: "Schritt-für-Schritt-Setup für Amazon Seller, Kaufland, Shopify, Stripe und PayPal Business – inkl. Verifizierung, EU-Setup, Domain, Payment und Versand. Plus Plattform-Vergleich, welcher Channel zu welchem Produkt passt.",
  },
  {
    q: "Was deckt die Steuer-Funktion ab?",
    a: "DE-Steuer-Cockpit mit Frist-Kalender (USt, ESt, KSt, GewSt, GuV), Dokumenten-Pflicht-Übersicht, IAB-Rechner, Kfz (1 % vs. Fahrtenbuch), Reisekosten-Logger, Pre-Year-End-Check, OSS-Anmeldung sowie US- und HK-Tax-Helper inkl. W-8BEN für Whop & Co.",
  },
  {
    q: "Wie hilft ihr bei eigener Brand und Compliance?",
    a: "Kategorie-Guides für Elektronik (WEEE/EAR, CE, RoHS), Health & Supplements (NEM-Anzeige BVL, NRV, HCV), Beauty (CPNP, MoCRA), Spielzeug (EN 71, REACH), Apparel (Textilkennzeichnung) und Lebensmittel (LMIV). Plus Anmelde-Wizards für LUCID-Verpackungen, BattDG und GPSR.",
  },
  {
    q: "Kann ich vor dem Launch Marken, Domain und Social-Handles prüfen?",
    a: "Ja. Brand-Launch-Tools mit Marken-Check (DPMA, EUIPO, USPTO), Domain-Check (.de/.com/.io), Social-Handles (Instagram, TikTok, YouTube, X), App-Store-Check und einem Risiko-Score mit Empfehlung.",
  },
  {
    q: "Hilft GründerX bei Amazon-Buchhaltung?",
    a: "Ja – Settlement-Report-Parser (Amazon-CSV → Buchungen), DATEV/Lexoffice-Mapping (SKR03/SKR04), USt-Behandlung inkl. Reverse-Charge für EU-/US-Werbung und ein Marge-Tracker pro SKU.",
  },
  {
    q: "Welche Anbieter werden verglichen?",
    a: `${ANBIETER_ANZAHL} Anbieter in ${ANBIETER_KATEGORIEN} Kategorien, jeweils mit Stärken und Schwächen aus Reddit, DTC-Slack und E-Commerce-Foren. Darunter: Banking DE (Qonto, Holvi, Finom, Kontist, Deutsche Bank, Commerzbank, Sparkasse, Volksbank, Postbank, HVB, Targobank, DKB, Fyrst, N26, Revolut, Vivid, Bunq), Banking US (Mercury, Wise, Relay, Brex, Novo, Bluevine, Found), Versand DACH (DHL, DPD, GLS, Hermes, UPS, Sendcloud), Buchhaltung (lexoffice, sevDesk, Candis, BuchhaltungsButler, Accountable, smartsteuer), 3PL/Fulfillment (byrd, ShipBob, Warehousing1, Logward), LUCID (Lizenzero, Reclay), Email-Marketing (Klaviyo, Brevo, Mailchimp, MailerLite, Omnisend, Postmark, ActiveCampaign), Tracking (Triple Whale, Hyros, Northbeam, Polar Analytics, RockerBox), Shop-Systeme (Shopify, Shopware, WooCommerce, BigCommerce, Lightspeed), Domains (Cloudflare Registrar, Namecheap, IONOS, ALL-INKL, INWX, Porkbun), Workspace/Email (Google Workspace, Microsoft 365, mailbox.org, Proton, Fastmail), Geschäftsfahrzeug (Sixt Leasing, ALD/Ayvens, VW/Mercedes/BMW Financial Services, Vehiculum, LeasePlan, FINN), Haftpflichtversicherung (Hiscox, exali, mailo, Andsafe, Adam Riese, Allianz, AXA, HDI, thinksurance, VOV) und Rechtsschutz (Roland, ARAG, DAS, Advocard, DEURAG, HDI). Die Liste wird automatisiert geprüft: neue Anbieter werden vorgeschlagen, tote Links gemeldet, Preise nachgezogen.`,
  },
  {
    q: "Was kostet GründerX?",
    a: `GründerX kostet ${formatEurCents(PLANS.gruenderx.grossCents)} im Monat oder ${formatEurCents(PLANS["gruenderx-year"].grossCents)} im Jahr – im Jahreszugang zwei Monate geschenkt. Wer beide KIs will (GründerX + AnwaltX: Vertragsprüfung, Abmahn-Schutz, Streitfall-Hilfe), bucht das Founder-Set für ${formatEurCents(PLANS.bundle.grossCents)} im Monat oder ${formatEurCents(PLANS["bundle-year"].grossCents)} im Jahr statt ${formatEurCents(PLANS.bundle.anchorCents!)} für beide einzeln. Alle Beträge sind Endpreise inklusive 19 % Umsatzsteuer (netto ${formatEurCents(netCentsOf(PLANS.gruenderx.grossCents))} bzw. ${formatEurCents(netCentsOf(PLANS.bundle.grossCents))}); an der Kasse wird nichts aufgeschlagen. Alle Details auf der Preisseite unter /preise.`,
  },
  {
    q: "Kann ich monatlich kündigen oder binde ich mich lange?",
    a: `GründerX ist ein Abo, das du jederzeit im Konto zum Ende der laufenden Abrechnungsperiode kündigst – keine Mindestlaufzeit über die gebuchte Periode hinaus. Im Monatsabo bekommst du mit dem Code ${FOUNDER_CODE.code} im ersten Monat ${FOUNDER_CODE.percent} % Rabatt; das Jahresabo ist stattdessen dauerhaft um zwei Monatsbeiträge günstiger.`,
  },
  {
    q: "Muss ich sofort zahlen oder kann ich GründerX erst ausprobieren?",
    a: "Ein Konto gibt es erst nach der Zahlung – eine Testphase mit Konto bieten wir nicht an. Ausprobieren kannst du vorher trotzdem, ohne Konto: WEEE-Check, Brand-Check, LUCID-Wizard sowie Businessplan-Generator, Gründungskosten-Rechner, Rechtsform-Finder und die Amazon-Widerspruchs-Generatoren je einmal kostenlos. Das Ergebnis gibt es jeweils gegen deine E-Mail-Adresse. Mit dem Abo sind alle Tools, die Guides und Felix ab dem ersten Tag freigeschaltet, ohne Abrechnung pro Wizard oder pro Frage.",
  },
  {
    q: "Ich habe null Vorwissen – ist GründerX trotzdem für mich?",
    a: "Gerade dann. Die Wizards erklären jeden Schritt in Klartext statt Behörden-Deutsch, vom ELSTER-Fragebogen bis zur ersten Rechnung. Felix beantwortet deine Fragen im Chat, wenn du irgendwo hängst – du brauchst weder Steuer- noch Rechtsvorwissen.",
  },
  {
    q: "Übernehmt ihr Behördengänge wie die Gewerbeanmeldung?",
    a: "Nein. Wir geben dir Checklisten, ausgefüllte Formular-Vorlagen und Schritt-für-Schritt-Anleitungen – die Einreichung beim Gewerbeamt oder Finanzamt machst du selbst. Felix sorgt dafür, dass nichts fehlt.",
  },
  {
    q: "Sind meine Daten sicher?",
    a: "Deine Konto- und Projektdaten liegen verschlüsselt in einer Datenbank in der EU (Supabase, Frankfurt). Fragen an den KI-Assistenten Felix und KI-Textfunktionen werden zur Beantwortung an KI-Anbieter übermittelt, teils in den USA (abgesichert über das EU-US Data Privacy Framework bzw. EU-Standardvertragsklauseln) – Details in der Datenschutzerklärung. Deine Daten werden nicht zum Training fremder Modelle verwendet.",
  },
];

export const FAQ = () => (
  <section id="faq" className="border-y border-border/70 bg-secondary/50 py-14 md:py-28">
    <div className="container grid max-w-6xl gap-10 lg:grid-cols-[0.8fr,1.2fr] lg:gap-16">
      <div>
        <h2 className="text-balance text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-primary md:text-[3rem]">Häufige Fragen.</h2>
        <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted-foreground">
          Mehr Antworten auf der{" "}
          <Link to="/faq" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">
            FAQ-Seite
          </Link>
          . Etwas anderes? Schreib uns über{" "}
          <Link to="/kontakt" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">
            Kontakt
          </Link>
          .
        </p>
      </div>

      {/*
        Natives <details> statt Radix-Accordion: Radix rendert geschlossene
        Inhalte GAR NICHT ins DOM. Auf der Startseite standen deshalb nur die
        Fragen im prerenderten HTML, keine einzige Antwort — genau der Teil,
        der Einwände abbaut, war für den Index unsichtbar.
      */}
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        {faqs.map((f, i) => (
          <details key={i} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold transition-colors hover:text-accent-blue">
              {f.q}
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="-mt-1 pb-5 leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
