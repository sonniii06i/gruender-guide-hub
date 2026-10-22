import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LifeBuoy, MessageSquare, Plus } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { PLANS, formatEurCents } from "@/config/pricing";

const FAQS: { q: string; a: string }[] = [
  { q: "Was ist GründerX?", a: "GründerX ist dein KI-Co-Pilot für die Gründung und das Operative – Steuern, Recht, Marketing, Buchhaltung, Tools. Felix (KI) plus geführte Playbooks bringen dich vom ersten Schritt bis zum laufenden Betrieb." },
  {
    q: "Wie viel kostet GründerX?",
    a: `GründerX kostet ${formatEurCents(PLANS.gruenderx.grossCents)} im Monat oder ${formatEurCents(PLANS["gruenderx-year"].grossCents)} im Jahr. Das Founder-Set (GründerX + AnwaltX) kostet ${formatEurCents(PLANS.bundle.grossCents)} im Monat oder ${formatEurCents(PLANS["bundle-year"].grossCents)} im Jahr. Alle Preise sind Endpreise inkl. 19 % USt. und jederzeit zum Ende der Abrechnungsperiode kündbar. Alle Details: gruenderx.de/preise.`,
  },
  {
    q: "Gibt es eine kostenlose Testphase?",
    a: "Eine Testphase mit Konto gibt es nicht – das Konto entsteht erst nach der Zahlung. Ausprobieren kannst du vorher ohne Konto: WEEE-Check, Brand-Check, LUCID-Wizard sowie Businessplan-Generator, Gründungskosten-Rechner, Rechtsform-Finder und die Amazon-Widerspruchs-Generatoren je einmal kostenlos. Das Ergebnis gibt es jeweils gegen deine E-Mail-Adresse.",
  },
  {
    q: "Gibt es kostenlose Vertragsvorlagen?",
    a: "Ja, über 100 Vorlagen nach deutschem Recht unter gruenderx.de/vorlagen: GbR-Gesellschaftsvertrag, Kaufverträge, Arbeitsverträge, NDA, AGB, Vollmachten, Darlehen, Mahnung und mehr. Du bestätigst einmal deine E-Mail-Adresse, danach lädst du jede Vorlage als Word, PDF oder Text – ohne Konto, ohne Zahlung. Jede Vorlage hat einen Ratgeber zum Ausfüllen.",
  },
  { q: "Ersetzt GründerX meinen Steuerberater oder Anwalt?", a: "Nein. GründerX bereitet dich strukturiert vor, erklärt Begriffe und liefert Templates. Bei rechtsverbindlichen Themen (Steuererklärung, Vertragsprüfung) verweisen wir auf unser Schwesterprodukt AnwaltX bzw. zertifizierte Partner." },
  { q: "Welche Rechtsformen deckt ihr ab?", a: "Schwerpunkt DE: Einzelunternehmen, GbR, UG, GmbH, GmbH & Co. KG. Zusätzlich US-LLC für Creator/E-Commerce. Der Rechtsform-Wizard berechnet die optimale Form für dein Modell." },
  { q: "Wie funktioniert die Bezahlung?", a: "Sichere Abwicklung über Stripe. SEPA-Lastschrift, Kreditkarte und Apple/Google Pay. Rechnungen findest du im Profil → Abrechnung. Du kannst dein Abo dort jederzeit über das Stripe-Portal verwalten." },
  { q: "Kann ich jederzeit kündigen?", a: "Ja. Monatlich kündbar mit einem Klick im Stripe-Kundenportal (Profil → Abrechnung → Verwalten). Nach Ende der bezahlten Periode bleiben deine Daten erhalten, Premium-Features werden gesperrt." },
  { q: "Was passiert mit meinen Daten?", a: "Speicherung auf EU-Servern (Frankfurt). DSGVO-konform. Deine Eingaben werden nicht an Dritte verkauft. Felix-Chats werden zur Qualitätssicherung anonymisiert ausgewertet (kann deaktiviert werden)." },
  { q: "Wie schnell antwortet der Support?", a: "Per E-Mail oder Ticket, in der Regel innerhalb von 24 Stunden." },
  { q: "Funktioniert GründerX auch für US-LLCs / Creator?", a: "Ja, dafür gibt es eigene Playbooks (US-LLC Setup, Creator-Steuern, Stripe-Setup). Für E-Commerce decken wir Shopify, Amazon FBA, EU-OSS und USt-IDs ab." },
  { q: "Bietet ihr Buchhaltung & Lohn?", a: "Wir integrieren Tools (z. B. Lexware, sevDesk) und liefern Vorlagen. Eigene Buchhaltungs-Engine ist in der Roadmap." },
  { q: "Kann ich meinen Account löschen?", a: "Ja – schreib uns ein Ticket über Support, wir löschen Account & Daten innerhalb von 7 Tagen vollständig (Backup-Rotation gemäß DSGVO)." },
  { q: "Bekomme ich eine Rechnung mit ausgewiesener USt?", a: "Ja, jede Stripe-Zahlung erzeugt automatisch eine USt-konforme Rechnung mit deinen Firmendaten (im Profil hinterlegen). Reverse-Charge bei B2B außerhalb DE wird unterstützt." },
];

const FAQ = () => (
  <div className="flex min-h-screen flex-col bg-background">
  <Navbar />
  <main className="flex-1 pt-20 md:pt-24">
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
    {/*
      Natives <details> statt Radix-Accordion. Grund: Radix rendert den Inhalt
      geschlossener Items GAR NICHT ins DOM -- im prerenderten HTML standen
      deshalb nur die sieben Fragen und keine einzige Antwort (91 Woerter auf
      der ganzen Seite). Die Antworten waren nur im FAQPage-JSON-LD vorhanden,
      also fuer strukturierte Daten sichtbar, fuer den Fliesstext-Index aber
      nicht.
      <details> haelt den Inhalt immer im DOM und klappt trotzdem zu.
    */}
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        {FAQS.map((f, i) => (
          <details key={i} className="group px-5 md:px-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left transition-colors hover:text-accent-blue">
              <h2 className="text-[15px] font-semibold leading-snug">{f.q}</h2>
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="-mt-1 max-w-[68ch] pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>

      <aside className="rounded-2xl bg-ink p-6 text-primary-foreground shadow-soft lg:sticky lg:top-20">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-brand-green-glow">
          <LifeBuoy className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-lg font-semibold">Antwort nicht dabei?</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/75">
          Öffne ein Ticket. Wir melden uns in der Regel innerhalb von 24 Stunden.
        </p>
        <Button asChild size="lg" className="mt-5 w-full rounded-xl bg-card font-semibold text-primary shadow-none hover:bg-card/90">
          <Link to="/kontakt">
            <MessageSquare className="h-4 w-4" aria-hidden="true" /> Ticket öffnen
          </Link>
        </Button>
      </aside>
    </div>
  </CockpitShell>
  </main>
  <Footer />
  </div>
);

export default FAQ;
