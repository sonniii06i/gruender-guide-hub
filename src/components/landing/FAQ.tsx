import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Welche Rechtsform passt zu mir – Einzelunternehmen, UG, GmbH oder Holding?",
    a: "Felix vergleicht Einzelunternehmen, UG, GmbH und Holding-Konstrukte anhand deines Umsatzes, deines Risikos und deiner Pläne (Reinvest, Ausschüttung, Exit) – inklusive Wechsel-Wegweiser, wann sich ein Upgrade rechnet.",
  },
  {
    q: "Hilft GründerX bei US-LLC oder HK-Limited?",
    a: "Ja. Bundesstaaten-Vergleich (Wyoming, Delaware, New Mexico, Nevada), Registered-Agent-Auswahl, EIN- und ITIN-Antrag, BOI-Reporting (FinCEN), Form 5472/1120-Reminder sowie Banking (Mercury, Wise, Relay, Brex). Für Hong Kong: Setup, Profits-Tax, Offshore-Status, Audited Accounts und Banking (Statrys, Airwallex, Currenxie) – inkl. deutscher CFC-Regelungen.",
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
    a: "Kategorie-Guides für Elektronik (WEEE/EAR, CE, RoHS), Health & Supplements (NEM-Anzeige BVL, NRV, HCV), Beauty (CPNP, MoCRA), Spielzeug (EN 71, REACH), Apparel (Textilkennzeichnung) und Lebensmittel (LMIV). Plus Anmelde-Wizards für LUCID-Verpackungen, BattG und GPSR.",
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
    a: "Versand DACH (DHL, DPD, GLS, Hermes, UPS) & International (Sendcloud, Easyship, ShipBob), Buchhaltung DE (Lexoffice, sevDesk, DATEV, Candis) und US (Bench, Pilot, Xero), Banking (Holvi, Qonto, Penta, Kontist, Finom / Mercury, Wise, Relay, Brex), Shop-Systeme, Email & Pixel (Klaviyo, Brevo), Tracking (Hyros, Triple Whale) und 3PL (Byrd, ShipBob, BoxBay).",
  },
  {
    q: "Was kostet GründerX?",
    a: "GründerX kostet 99,99 € / Monat. Wer zusätzlich AnwaltX (Vertragsprüfung, Abmahn-Schutz, Streitfall-Hilfe) möchte, bucht das Founder Bundle für 179,99 € / Monat. AnwaltX ist über GründerX nur im Bundle erhältlich.",
  },
  {
    q: "Übernehmt ihr Behördengänge wie die Gewerbeanmeldung?",
    a: "Nein. Wir geben dir Checklisten, ausgefüllte Formular-Vorlagen und Schritt-für-Schritt-Anleitungen – die Einreichung beim Gewerbeamt oder Finanzamt machst du selbst. Felix sorgt dafür, dass nichts fehlt.",
  },
  {
    q: "Sind meine Daten sicher?",
    a: "Ja. GründerX ist DSGVO-konform, alle Daten liegen verschlüsselt auf Servern in der EU. Deine Daten werden nicht zum Training fremder Modelle verwendet.",
  },
];

export const FAQ = () => (
  <section id="faq" className="py-24 bg-secondary/40">
    <div className="container max-w-3xl">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-3">
          FAQ
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-balance">
          Häufige Fragen.
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="rounded-2xl border border-border bg-card px-6 shadow-card"
          >
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
