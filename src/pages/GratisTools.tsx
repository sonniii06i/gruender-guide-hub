import { Link } from "react-router-dom";
import { ArrowRight, Gift, Lock, Sparkles, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FreeToolPromo } from "@/components/freetools/FreeToolPromo";
import { FREE_TOOLS } from "@/lib/freetools";
import { TRIAL_TOOLS, TRIAL_CLAIM, GENERATOR_CLAIM } from "@/lib/freetools/trialTools";
import { LANDING_TOOLS } from "@/data/features";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/freetools/schema";

const SITE = "https://gruenderx.de";

const faqs = [
  {
    q: "Sind die Gründer-Tools wirklich kostenlos?",
    a: "Zum Kennenlernen ja: Bei jedem Generator (Businessplan-Generator, Gründungskosten-Rechner, Rechtsform-Finder und die beiden Amazon-Widerspruchs-Generatoren) ist eine Nutzung kostenlos – du gibst deine E-Mail-Adresse an und bekommst das fertige Dokument samt PDF. Beim WEEE-Check, Brand-Check und LUCID-Wizard ist je eine Prüfung kostenlos. Unbegrenzt nutzt du alle Tools mit dem GründerX-Abo.",
  },
  {
    q: "Muss ich ein Konto anlegen?",
    a: "Nein. Für die kostenlosen Tools brauchst du nur deine E-Mail-Adresse. Ein GründerX-Konto entsteht erst mit dem Abo – nach der Zahlung.",
  },
  {
    q: "Was passiert mit meiner E-Mail-Adresse?",
    a: "Wir speichern sie zusammen mit dem genutzten Tool, um die kostenlose Nutzung nachzuhalten, und löschen sie nach 12 Monaten. Werbung senden wir an diese Adresse nicht. Details stehen in der Datenschutzerklärung.",
  },
];

const steps = [
  { icon: Sparkles, title: "Angaben eingeben", desc: "Beantworte ein paar einfache Fragen im Schritt-für-Schritt-Assistenten." },
  { icon: Lock, title: "E-Mail angeben", desc: "Das erste fertige Ergebnis je Tool gibt es gegen deine E-Mail-Adresse – ohne Konto, ohne Zahlung." },
  { icon: Rocket, title: "Loslegen", desc: "Lade dein Ergebnis als PDF herunter und starte durch." },
];

export default function GratisTools() {
  const jsonLd = [
    serviceSchema(
      "Kostenlose Gründer-Tools",
      "Tools für Gründer: Businessplan, Gründungskosten-Rechner und Rechtsform-Finder. Je Generator eine kostenlose Nutzung gegen die E-Mail-Adresse, ohne Konto; unbegrenzt im Abo."
    ),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Start", url: `${SITE}/` },
      { name: "Gratis-Tools", url: `${SITE}/gratis-tools` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Kostenlose Gründer-Tools: Businessplan, Gründungskosten & Rechtsform | GründerX"
        description="Erstelle Businessplan, Gründungskosten-Übersicht und Rechtsform-Empfehlung Schritt für Schritt. 1 kostenlose Nutzung je Generator, nur E-Mail nötig – ohne Konto; unbegrenzt im Abo."
        path="/gratis-tools"
        type="website"
        jsonLd={jsonLd}
      />
      <Navbar />

      <section className="relative pt-28 pb-10 md:pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="secondary" className="mb-4">
            <Gift className="mr-1.5 h-3.5 w-3.5" /> {GENERATOR_CLAIM}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Kostenlose Tools für deine Gründung
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Businessplan, Gründungskosten-Rechner und Rechtsform-Finder – in Minuten erstellt, ohne
            Fachchinesisch. Je Generator ist eine Nutzung kostenlos: Das fertige Ergebnis bekommst du gegen deine
            E-Mail-Adresse – kein Konto, keine Zahlung. Unbegrenzt nutzt du die Generatoren mit dem GründerX-Abo.
          </p>
        </div>
      </section>

      {/* 20%-Rabatt-Promo (Code FOUNDER) */}
      <FreeToolPromo />

      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FREE_TOOLS.map((t) => (
              <Link key={t.slug} to={`/${t.slug}`} className="group block">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${t.accent}`}>
                        <t.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{t.shortTitle}</h2>
                          {t.badge && <Badge variant="outline" className="text-[10px]">{t.badge}</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{t.heroSubtitle}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                          1 kostenlose Nutzung
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Checks aus dem Cockpit: je eine kostenlose Prüfung */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Checks aus dem Cockpit: {TRIAL_CLAIM}</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Diese Tools gehören zum Abo. Eine Prüfung pro Tool ist kostenlos – das Ergebnis gibt es gegen deine
            E-Mail-Adresse.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TRIAL_TOOLS.filter((t) => t.trialPath !== t.landingPath).map((t) => (
              <Link key={t.slug} to={t.trialPath} className="group rounded-xl border bg-card p-4 hover:shadow-md transition-shadow">
                <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{t.name}</div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{t.desc}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Kostenlos prüfen <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">So funktioniert's</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((st, i) => (
              <div key={st.title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 relative">
                  <st.icon className="h-6 w-6 text-primary" />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{st.title}</h3>
                <p className="text-sm text-muted-foreground">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">Häufige Fragen</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <Card key={f.q} className="p-5">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                  <p className="text-sm text-muted-foreground">{f.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Mehr als nur Vorlagen</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Mit GründerX bekommst du alle {LANDING_TOOLS.length} Tools aus der Tool-Übersicht, den KI-Assistenten
            Felix und Schritt-für-Schritt-Guides. Die kostenlosen Tools sind dein Einstieg.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/preise">
              <Button size="lg">
                Preise &amp; Leistungen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/tools">
              <Button size="lg" variant="outline">Alle Tools ansehen</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
