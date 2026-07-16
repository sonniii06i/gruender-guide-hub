import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LifeBuoy, MessageSquare } from "lucide-react";
import { Seo } from "@/components/Seo";
import CockpitShell from "@/components/cockpit/CockpitShell";

const FAQS: { q: string; a: string }[] = [
  { q: "Was ist GründerX?", a: "GründerX ist dein KI-Co-Pilot für die Gründung und das Operative – Steuern, Recht, Marketing, Buchhaltung, Tools. Felix (KI) plus geführte Playbooks bringen dich vom ersten Schritt bis zum laufenden Betrieb." },
  { q: "Wie viel kostet GründerX?", a: "GründerX kostet 49,99 €/Monat. Das Founder Bundle (GründerX + AnwaltX zusammen) kostet 79,99 €/Monat – 20 % günstiger als beide einzeln (99,98 €). Beide jederzeit monatlich kündbar." },
  { q: "Gibt es eine kostenlose Testphase?", a: "Du kannst dich kostenlos registrieren, das Onboarding durchlaufen und alle Inhalte ansehen. Für aktive Features (Felix-Chat, Cockpits, Wizards) ist ein aktives Abo erforderlich." },
  { q: "Ersetzt GründerX meinen Steuerberater oder Anwalt?", a: "Nein. GründerX bereitet dich strukturiert vor, erklärt Begriffe und liefert Templates. Bei rechtsverbindlichen Themen (Steuererklärung, Vertragsprüfung) verweisen wir auf unser Schwesterprodukt AnwaltX bzw. zertifizierte Partner." },
  { q: "Welche Rechtsformen deckt ihr ab?", a: "Schwerpunkt DE: Einzelunternehmen, GbR, UG, GmbH, GmbH & Co. KG. Zusätzlich US-LLC für Creator/E-Commerce. Der Rechtsform-Wizard berechnet die optimale Form für dein Modell." },
  { q: "Wie funktioniert die Bezahlung?", a: "Sichere Abwicklung über Stripe. SEPA-Lastschrift, Kreditkarte und Apple/Google Pay. Rechnungen findest du im Profil → Abrechnung. Du kannst dein Abo dort jederzeit über das Stripe-Portal verwalten." },
  { q: "Kann ich jederzeit kündigen?", a: "Ja. Monatlich kündbar mit einem Klick im Stripe-Kundenportal (Profil → Abrechnung → Verwalten). Nach Ende der bezahlten Periode bleiben deine Daten erhalten, Premium-Features werden gesperrt." },
  { q: "Was passiert mit meinen Daten?", a: "Speicherung auf EU-Servern (Frankfurt). DSGVO-konform. Deine Eingaben werden nicht an Dritte verkauft. Felix-Chats werden zur Qualitätssicherung anonymisiert ausgewertet (kann deaktiviert werden)." },
  { q: "Wie schnell antwortet der Support?", a: "Per E-Mail / Ticket innerhalb von 24h (werktags meist <4h). Founder Bundle-Kunden bekommen Priority-Support innerhalb von 2h." },
  { q: "Funktioniert GründerX auch für US-LLCs / Creator?", a: "Ja, dafür gibt es eigene Playbooks (US-LLC Setup, Creator-Steuern, Stripe-Setup). Für E-Commerce decken wir Shopify, Amazon FBA, EU-OSS und USt-IDs ab." },
  { q: "Bietet ihr Buchhaltung & Lohn?", a: "Wir integrieren Tools (z. B. Lexware, sevDesk) und liefern Vorlagen. Eigene Buchhaltungs-Engine ist in der Roadmap." },
  { q: "Kann ich meinen Account löschen?", a: "Ja – schreib uns ein Ticket über Support, wir löschen Account & Daten innerhalb von 7 Tagen vollständig (Backup-Rotation gemäß DSGVO)." },
  { q: "Bekomme ich eine Rechnung mit ausgewiesener USt?", a: "Ja, jede Stripe-Zahlung erzeugt automatisch eine USt-konforme Rechnung mit deinen Firmendaten (im Profil hinterlegen). Reverse-Charge bei B2B außerhalb DE wird unterstützt." },
];

const FAQ = () => (
  <CockpitShell
    eyebrow="Hilfe"
    title="Häufige Fragen"
    subtitle="Antworten auf die meistgestellten Fragen rund um GründerX."
    showRelated={false}
  >
    <Seo
      title="Häufige Fragen (FAQ) – Gründung, Steuern, Tools | GründerX"
      description="Antworten zu Gründung, Rechtsformen, Preisen, Datenschutz und Funktionen von GründerX. Alles, was Gründer und E-Commerce-Founder wissen wollen."
      path="/faq"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
    <Accordion type="single" collapsible className="space-y-3">
      {FAQS.map((f, i) => (
        <AccordionItem key={i} value={`f-${i}`} className="rounded-2xl border border-border bg-card px-5">
          <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">{f.q}</AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>

    <div className="mt-10 rounded-3xl bg-gradient-primary p-6 md:p-8 text-primary-foreground shadow-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <LifeBuoy className="h-6 w-6 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-lg">Antwort nicht dabei?</h3>
          <p className="text-sm text-primary-foreground/85">Öffne ein Ticket – wir melden uns innerhalb von 24h.</p>
        </div>
      </div>
      <Link to="/kontakt">
        <Button size="lg" className="rounded-full bg-card text-primary hover:bg-card/90 font-semibold">
          <MessageSquare className="h-4 w-4 mr-2" /> Ticket öffnen
        </Button>
      </Link>
    </div>
  </CockpitShell>
);

export default FAQ;
