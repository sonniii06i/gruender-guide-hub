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
    q: "Wie funktioniert die KI?",
    a: "Unsere KI ist auf tausenden realen Gründungen aus E-Commerce und Creator-Bereich trainiert. Sie versteht deutsches Steuer- und Gesellschaftsrecht und gibt jederzeit Quellen an.",
  },
  {
    q: "Ersetzt GründerX meinen Steuerberater?",
    a: "Wir ersetzen viele Routine-Aufgaben (USt-Voranmeldung, Belege, EÜR-Vorbereitung). Bei komplexen Fragen vermitteln wir dich gezielt an einen Steuerberater.",
  },
  {
    q: "Was kostet das Founder Bundle?",
    a: "Das Bundle (GründerX + AnwaltX) kostet 49€/Monat – statt 68€ einzeln. Du sparst rund 30% und bekommst Felix und Juri in einem Account.",
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
