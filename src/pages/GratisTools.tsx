import { Link } from "react-router-dom";
import { ArrowRight, Gift, Lock, Sparkles, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FREE_TOOLS } from "@/lib/freetools";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/freetools/schema";

const SITE = "https://gruenderx.de";

const faqs = [
  {
    q: "Sind die Gründer-Tools wirklich kostenlos?",
    a: "Ja. Das Erstellen und Herunterladen aller Ergebnisse ist kostenlos. Du legst lediglich ein kostenloses GründerX-Konto an, um das fertige Dokument freizuschalten – keine Zahlung, kein Abo.",
  },
  {
    q: "Warum muss ich ein Konto erstellen?",
    a: "So speichern wir deine Ergebnisse, du kannst sie jederzeit wieder aufrufen und erhältst passende Tipps zur Gründung. Das Konto ist und bleibt kostenlos.",
  },
  {
    q: "Was bekomme ich nach der Registrierung noch?",
    a: "Mit deinem kostenlosen Konto bekommst du Zugang zum GründerX-Cockpit und kannst die Vollversionen vieler Tools sowie den KI-Assistenten Felix testen.",
  },
];

const steps = [
  { icon: Sparkles, title: "Angaben eingeben", desc: "Beantworte ein paar einfache Fragen im Schritt-für-Schritt-Assistenten." },
  { icon: Lock, title: "Kostenloses Konto", desc: "Schalte dein Ergebnis mit einem kostenlosen Konto frei – ohne Zahlung." },
  { icon: Rocket, title: "Loslegen", desc: "Lade dein Ergebnis als PDF herunter und starte durch." },
];

export default function GratisTools() {
  const jsonLd = [
    serviceSchema(
      "Kostenlose Gründer-Tools",
      "Kostenlose Tools für Gründer: Businessplan, Gründungskosten-Rechner und Rechtsform-Finder. In Minuten erstellt, nur ein kostenloses Konto nötig."
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
        description="Erstelle Businessplan, Gründungskosten-Übersicht und Rechtsform-Empfehlung kostenlos – Schritt für Schritt, in Minuten fertig. Nur ein kostenloses Konto nötig, kein Abo."
        path="/gratis-tools"
        type="website"
        jsonLd={jsonLd}
      />
      <Navbar />

      <section className="relative pt-12 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="secondary" className="mb-4">
            <Gift className="mr-1.5 h-3.5 w-3.5" /> 100 % kostenlos
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Kostenlose Tools für deine Gründung
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Businessplan, Gründungskosten-Rechner und Rechtsform-Finder – in Minuten erstellt, ohne
            Fachchinesisch. Du brauchst nur ein kostenloses Konto, kein Abo.
          </p>
        </div>
      </section>

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
                          Kostenlos erstellen
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
            Mit GründerX bekommst du über 80 Tools fürs Gründen, den KI-Assistenten Felix und
            Schritt-für-Schritt-Guides. Die kostenlosen Tools sind dein Einstieg.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/auth">
              <Button size="lg">
                Kostenloses Konto erstellen
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
