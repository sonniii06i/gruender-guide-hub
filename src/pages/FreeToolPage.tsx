import { Link } from "react-router-dom";
import { CheckCircle2, Gift, Clock, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FreeToolWizard } from "@/components/freetools/FreeToolWizard";
import { FreeToolPromo } from "@/components/freetools/FreeToolPromo";
import { FREE_TOOLS, type ToolConfig } from "@/lib/freetools";
import { faqSchema, howToSchema, breadcrumbSchema, serviceSchema } from "@/lib/freetools/schema";

const SITE = "https://gruenderx.de";

interface FreeToolPageProps {
  config: ToolConfig;
}

const trust = [
  { icon: Gift, label: "100 % kostenlos", desc: "Erstellen & als PDF herunterladen" },
  { icon: Clock, label: "In Minuten fertig", desc: "Schritt für Schritt, ohne Fachchinesisch" },
  { icon: ShieldCheck, label: "Nur Konto nötig", desc: "Kein Abo – ein kostenloses Konto genügt" },
];

export default function FreeToolPage({ config }: FreeToolPageProps) {
  const jsonLd = [
    serviceSchema(config.seo.title, config.seo.description),
    howToSchema(
      `${config.documentName} kostenlos erstellen`,
      config.seo.description,
      config.steps.map((st) => ({ name: st.title, text: st.subtitle || `Schritt: ${st.title}` }))
    ),
    faqSchema(config.seo.faqs),
    breadcrumbSchema([
      { name: "Start", url: `${SITE}/` },
      { name: "Gratis-Tools", url: `${SITE}/gratis-tools` },
      { name: config.shortTitle, url: `${SITE}/${config.slug}` },
    ]),
  ];

  const others = FREE_TOOLS.filter((t) => t.slug !== config.slug);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={config.seo.title}
        description={config.seo.description}
        path={`/${config.slug}`}
        type="website"
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {config.badge && (
            <Badge variant="secondary" className="mb-4">{config.badge}</Badge>
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">{config.heroTitle}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{config.heroSubtitle}</p>
        </div>
      </section>

      {/* 20%-Rabatt-Promo (Code FOUNDER) */}
      <FreeToolPromo />

      {/* Trust */}
      <section className="pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-3 rounded-xl border bg-card p-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <t.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="pb-20">
        <FreeToolWizard config={config} />
      </section>

      {/* SEO-Content */}
      {config.seoSections && config.seoSections.length > 0 && (
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <article className="space-y-10">
              {config.seoSections.map((sec) => (
                <div key={sec.heading}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">{sec.heading}</h2>
                  {sec.body.map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-3">{p}</p>
                  ))}
                </div>
              ))}
            </article>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">Häufige Fragen</h2>
          <div className="space-y-4">
            {config.seo.faqs.map((f) => (
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

      {/* Weitere Tools */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-center text-foreground mb-8">Weitere kostenlose Gründer-Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {others.map((t) => (
              <Link key={t.slug} to={`/${t.slug}`} className="group flex items-center gap-3 rounded-xl border bg-card p-4 hover:shadow-md transition-shadow">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${t.accent}`}>
                  <t.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{t.shortTitle}</div>
                  <div className="text-xs text-muted-foreground">Kostenlos erstellen</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/gratis-tools" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> Alle kostenlosen Tools ansehen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
