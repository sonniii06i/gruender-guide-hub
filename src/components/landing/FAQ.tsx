import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Welche Rechtsform passt zu mir?",
    a: "Felix analysiert dein Vorhaben, dein Risikoprofil und deine Umsatzplanung – und empfiehlt dir Einzelunternehmen, UG oder GmbH mit klarer Begründung.",
  },
  {
    q: "Hilft GründerX beim Amazon Seller Account?",
    a: "Ja. Felix begleitet dich von der Vorbereitung der Verifizierungs-Dokumente über die Wahl zwischen Individual- und Professional-Account bis zum Brand Registry und der korrekten Umsatzsteuer-Konfiguration (OSS, EU-VAT).",
  },
  {
    q: "Und Meta Ads / Business Manager?",
    a: "Wir zeigen dir, wie du Business Manager, Werbekonto, Pixel und Conversions API sauber aufsetzt – inklusive Domain-Verifizierung, sodass dein Account nicht direkt gesperrt wird.",
  },
  {
    q: "Welche Buchhaltungs-Software empfehlt ihr?",
    a: "Je nach Geschäftsmodell empfehlen wir Lexware Office, sevDesk, Pennylane oder Datev – und für Cashflow / Banking Qonto, Finom oder Kontist. Felix gibt dir eine konkrete Empfehlung statt einer Liste.",
  },
  {
    q: "Was kostet GründerX?",
    a: "GründerX kostet 99,99 € / Monat. Im Founder Bundle (GründerX + AnwaltX) zahlst du 129 € / Monat statt 159 € einzeln und sparst rund 20 %.",
  },
  {
    q: "Sind meine Daten sicher?",
    a: "Ja. GründerX ist DSGVO-konform, alle Daten liegen verschlüsselt auf Servern in der EU. Wir nutzen deine Daten nicht zum Training fremder Modelle.",
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
