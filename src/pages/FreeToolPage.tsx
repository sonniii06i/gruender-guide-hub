import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Gift, Clock, ShieldCheck } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";
import { PublicSection, FaqList } from "@/components/public/PublicBlocks";
import { FreeToolWizard } from "@/components/freetools/FreeToolWizard";
import { FreeToolPromo } from "@/components/freetools/FreeToolPromo";
import { FREE_TOOLS, type ToolConfig } from "@/lib/freetools";
import { faqSchema, howToSchema, breadcrumbSchema, serviceSchema } from "@/lib/freetools/schema";

const SITE = "https://gruenderx.de";

interface FreeToolPageProps {
  config: ToolConfig;
}

const TRUST = [
  { icon: Gift, label: "1 kostenlose Nutzung", desc: "Nur E-Mail nötig, inkl. PDF-Download; unbegrenzt im Abo" },
  { icon: Clock, label: "In Minuten fertig", desc: "Schritt für Schritt, ohne Fachchinesisch" },
  { icon: ShieldCheck, label: "Kein Konto nötig", desc: "Das Ergebnis gibt es gegen deine E-Mail-Adresse" },
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
        canonicalUrl={config.seo.canonicalUrl}
        type="website"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <PageHeader zentriert
          width="max-w-3xl"
          crumbs={[{ label: "Start", to: "/" }, { label: "Gratis-Tools", to: "/gratis-tools" }, { label: config.shortTitle }]}
          kicker={
            config.badge ? (
              <span className="inline-flex items-center rounded-full border border-accent-blue/20 bg-accent px-3 py-1 text-[13px] font-medium text-accent-blue">
                {config.badge}
              </span>
            ) : undefined
          }
          title={config.heroTitle}
          lead={<p>{config.heroSubtitle}</p>}
        >
          <ul className="grid gap-3 sm:grid-cols-3">
            {TRUST.map((t) => (
              <li key={t.label} className="flex items-start gap-3 rounded-xl border border-border bg-card/80 p-3.5 shadow-card backdrop-blur">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue">
                  <t.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">{t.label}</span>
                  <span className="block text-xs leading-relaxed text-muted-foreground">{t.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </PageHeader>

        {/* Wizard */}
        <section className="pb-16 pt-10 md:pb-20 md:pt-12" aria-label={`${config.documentName} erstellen`}>
          {/* 20%-Rabatt-Promo (Code FOUNDER) */}
          <FreeToolPromo />
          <FreeToolWizard config={config} />
        </section>

        <div className="container max-w-3xl space-y-14 px-4 pb-16 md:pb-20">
          {/* SEO-Content */}
          {config.seoSections && config.seoSections.length > 0 && (
            <article className="space-y-10 border-t border-border/70 pt-14">
              {config.seoSections.map((sec) => (
                <section key={sec.heading}>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-[1.75rem]">{sec.heading}</h2>
                  <div className="mt-4 space-y-3">
                    {sec.body.map((p, i) => (
                      <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>
          )}

          {/* FAQ */}
          <PublicSection title="Häufige Fragen">
            <FaqList items={config.seo.faqs} />
          </PublicSection>

          {/* Weitere Tools */}
          <PublicSection title="Weitere kostenlose Gründer-Tools">
            <div className="grid gap-3 sm:grid-cols-2">
              {others.map((t) => (
                <Link
                  key={t.slug}
                  to={`/${t.slug}`}
                  className="press group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent-blue/40 hover:shadow-card"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue">
                    <t.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">{t.shortTitle}</span>
                    <span className="block text-xs text-muted-foreground">1 kostenlose Nutzung</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-blue" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <Link to="/gratis-tools" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue hover:underline">
              Alle kostenlosen Tools ansehen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </PublicSection>
        </div>
      </main>

      <Footer />
    </div>
  );
}
