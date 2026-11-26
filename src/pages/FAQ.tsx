import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HelpCircle, LifeBuoy, MessageSquare, Plus } from "lucide-react";
import { Seo } from "@/components/Seo";
import { AdaptiveAppShell } from "@/components/AdaptiveAppShell";
import { PLANS, formatEurCents } from "@/config/pricing";
import { useAuth } from "@/hooks/useAuth";
import { isPrerender } from "@/lib/prerender";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Was ist GründerX?",
    a: "GründerX ist dein KI-Co-Pilot für die Gründung und das Operative: Steuern, Recht, Marketing, Buchhaltung und Tools. Felix (KI) plus geführte Kurse bringen dich vom ersten Schritt bis zum laufenden Betrieb.",
  },
  {
    q: "Wie viel kostet GründerX?",
    a: `GründerX kostet ${formatEurCents(PLANS.gruenderx.grossCents)} im Monat oder ${formatEurCents(PLANS["gruenderx-year"].grossCents)} im Jahr. Alle Preise sind Endpreise inkl. 19 % USt. und jederzeit zum Ende der Abrechnungsperiode kündbar. Alle Details: gruenderx.de/preise.`,
  },
  {
    q: "Gibt es eine kostenlose Testphase?",
    a: "Ja: Das Konto ist kostenlos, und für Neukunden gibt es den vollen Zugang zum Start 7 Tage für 1 €, danach das Monatsabo, monatlich kündbar. Ausprobieren kannst du außerdem ohne Konto: WEEE-Check, Brand-Check, LUCID-Wizard sowie Businessplan-Generator, Gründungskosten-Rechner, Rechtsform-Finder und die Amazon-Widerspruchs-Generatoren je einmal kostenlos. Das Ergebnis gibt es jeweils gegen deine E-Mail-Adresse.",
  },
  {
    q: "Gibt es kostenlose Vertragsvorlagen?",
    a: "Ja, über 100 Vorlagen nach deutschem Recht unter gruenderx.de/vorlagen: GbR-Gesellschaftsvertrag, Kaufverträge, Arbeitsverträge, NDA, AGB, Vollmachten, Darlehen, Mahnung und mehr. Du bestätigst einmal deine E-Mail-Adresse, danach lädst du jede Vorlage als Word, PDF oder Text ohne Konto und ohne Zahlung. Jede Vorlage hat einen Ratgeber zum Ausfüllen.",
  },
  {
    q: "Ersetzt GründerX meinen Steuerberater oder Anwalt?",
    a: "Nein. GründerX bereitet dich strukturiert vor, erklärt Begriffe und liefert Templates. Für rechtsverbindliche Themen (Steuererklärung, Vertragsprüfung) brauchst du weiter eine Steuerberatung oder Kanzlei.",
  },
  {
    q: "Welche Rechtsformen deckt ihr ab?",
    a: "Schwerpunkt DE: Einzelunternehmen, GbR, UG, GmbH, GmbH & Co. KG. Zusätzlich US-LLC für Creator und E-Commerce. Der Rechtsform-Wizard berechnet die optimale Form für dein Modell.",
  },
  {
    q: "Wie funktioniert die Bezahlung?",
    a: "Sichere Abwicklung über Stripe. SEPA-Lastschrift, Kreditkarte und Apple/Google Pay. Rechnungen findest du im Profil unter Abrechnung. Du kannst dein Abo dort jederzeit über das Stripe-Portal verwalten.",
  },
  {
    q: "Kann ich jederzeit kündigen?",
    a: "Ja. Monatlich kündbar mit einem Klick im Stripe-Kundenportal (Profil → Abrechnung → Verwalten) oder direkt über „Verträge hier kündigen“. Nach Ende der bezahlten Periode bleiben deine Daten erhalten, Premium-Features werden gesperrt.",
  },
  {
    q: "Was passiert mit meinen Daten?",
    a: "Speicherung auf EU-Servern (Frankfurt). DSGVO-konform. Deine Eingaben werden nicht an Dritte verkauft. Felix-Chats werden zur Qualitätssicherung anonymisiert ausgewertet (kann deaktiviert werden).",
  },
  {
    q: "Wie schnell antwortet der Support?",
    a: "Per E-Mail oder Ticket, in der Regel innerhalb von 24 Stunden.",
  },
  {
    q: "Funktioniert GründerX auch für US-LLCs / Creator?",
    a: "Ja, dafür gibt es eigene Kurse und Guides (US-LLC Setup, Amex US, Creator-Steuern, Stripe-Setup). Für E-Commerce decken wir Shopify, Amazon FBA, EU-OSS und USt-IDs ab.",
  },
  {
    q: "Bietet ihr Buchhaltung & Lohn?",
    a: "Wir integrieren Tools (z. B. Lexware Office, sevDesk) und liefern Vorlagen sowie fertige Buchungs-Checks. Eine eigene Buchhaltungs-Engine ist in der Roadmap.",
  },
  {
    q: "Kann ich meinen Account löschen?",
    a: "Ja, schreib uns ein Ticket über Support. Wir löschen Account und Daten innerhalb von 7 Tagen vollständig (Backup-Rotation gemäß DSGVO).",
  },
  {
    q: "Bekomme ich eine Rechnung mit ausgewiesener USt?",
    a: "Ja, jede Stripe-Zahlung erzeugt automatisch eine USt-konforme Rechnung mit deinen Firmendaten (im Profil hinterlegen). Reverse-Charge bei B2B außerhalb DE wird unterstützt.",
  },
];

const FAQ = () => {
  const { user } = useAuth();
  const inCockpit = Boolean(user) && !isPrerender();

  return (
    <AdaptiveAppShell
      eyebrow="Hilfe & Antworten"
      width="max-w-5xl"
      kicker={
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
          <HelpCircle className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" />
          Häufige Fragen
        </span>
      }
      title="Häufige Fragen zu GründerX"
      lead={<p>Klare Antworten zu Preisen, Testphase, Kündigung, Rechtsformen, Tools und Datenschutz.</p>}
      seo={
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
      }
    >
      {/* Natives <details>, damit jede Antwort im prerenderten HTML steht. */}
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white shadow-card">
          {FAQS.map((f, i) => (
            <details key={i} open={i === 0} className="group px-5 md:px-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left transition-colors hover:text-primary">
                <h2 className="text-[15px] font-semibold leading-snug text-foreground group-open:text-primary">
                  {f.q}
                </h2>
                <Plus
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45 group-open:text-primary"
                  aria-hidden="true"
                />
              </summary>
              <p className="-mt-1 max-w-[68ch] pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
              <LifeBuoy className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-bold text-primary">Antwort nicht dabei?</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Schreib uns direkt ein Ticket. Wir melden uns in der Regel innerhalb von 24 Stunden.
            </p>
            <Button asChild size="lg" className="press mt-5 w-full rounded-xl">
              <Link to={inCockpit ? "/support" : "/kontakt"}>
                <MessageSquare className="mr-1.5 h-4 w-4" aria-hidden="true" />
                {inCockpit ? "Zum Support" : "Ticket öffnen"}
              </Link>
            </Button>
          </div>

          {!inCockpit && (
            <div className="rounded-2xl border border-brand-green/30 bg-brand-green-soft/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-green">Direkt ausprobieren</p>
              <p className="mt-1.5 text-sm font-semibold text-primary">
                Kostenloses Konto oder 7 Tage für 1 € testen
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Alle 81 Kurse, 90 Tools und Felix ohne Risiko ansehen. Jederzeit kündbar.
              </p>
              <Button asChild size="sm" variant="outline" className="mt-4 w-full rounded-xl border-primary/25 bg-white font-semibold text-primary hover:bg-primary hover:text-white">
                <Link to="/preise">Preise &amp; Zugang ansehen</Link>
              </Button>
            </div>
          )}
        </aside>
      </div>
    </AdaptiveAppShell>
  );
};

export default FAQ;
