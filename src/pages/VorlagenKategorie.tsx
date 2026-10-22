import { Link, useParams } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";
import { FaqList } from "@/components/public/PublicBlocks";
import { VorlagenKarte } from "@/components/vorlagen/VorlagenKarte";
import { KATEGORIE_AKZENT, kategorieIcon } from "@/components/vorlagen/vorlagenIcons";
import { faqSchema, breadcrumbSchema } from "@/lib/freetools/schema";
import { KATEGORIE_BY_KEY, VORLAGEN_JE_KATEGORIE, VORLAGEN_KATEGORIEN } from "@/data/vorlagen";
import type { VorlagenKategorie as KategorieKey } from "@/data/vorlagen/types";
import NotFound from "./NotFound";

const SITE = "https://gruenderx.de";

// Kategorieseite /vorlagen/kategorie/<key>: eigene Landingpage je Themenfeld
// („Kaufvertrag Vorlagen“, „Gewerbemietvertrag Vorlagen“ …) mit Einleitung,
// allen Vorlagen der Kategorie und FAQ. Der Hub bleibt die Gesamtübersicht.
export default function VorlagenKategorie() {
  const { key = "" } = useParams();
  const kategorie = KATEGORIE_BY_KEY[key as KategorieKey];
  if (!kategorie) return <NotFound />;

  const liste = VORLAGEN_JE_KATEGORIE[kategorie.key];
  const Icon = kategorieIcon(kategorie.icon);
  const andere = VORLAGEN_KATEGORIEN.filter((k) => k.key !== kategorie.key);
  const pfad = `/vorlagen/kategorie/${kategorie.key}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: kategorie.seo.title.replace(/\s*\|\s*GründerX$/, ""),
      description: kategorie.seo.description,
      url: `${SITE}${pfad}`,
      inLanguage: "de",
      isPartOf: { "@type": "WebSite", name: "GründerX", url: SITE },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: liste.length,
        itemListElement: liste.map((v, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: v.titel,
          url: `${SITE}/vorlagen/${v.slug}`,
        })),
      },
    },
    faqSchema(kategorie.faqs),
    breadcrumbSchema([
      { name: "Start", url: `${SITE}/` },
      { name: "Vorlagen", url: `${SITE}/vorlagen` },
      { name: kategorie.titel, url: `${SITE}${pfad}` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo title={kategorie.seo.title} description={kategorie.seo.description} path={pfad} type="website" jsonLd={jsonLd} />
      <Navbar />
      <main id="inhalt">
        <PageHeader
          width="max-w-5xl"
          crumbs={[{ label: "Start", to: "/" }, { label: "Vorlagen", to: "/vorlagen" }, { label: kategorie.titel }]}
          kicker={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/25 bg-brand-green-soft px-3 py-1 text-[13px] font-medium text-brand-green">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {liste.length} Vorlagen, kostenlos als Word, PDF und Text
            </span>
          }
          title={`${kategorie.titel}: Vorlagen & Muster`}
          lead={<p>{kategorie.intro[0]}</p>}
        >
          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${KATEGORIE_AKZENT[kategorie.key]}`}>
              <Icon className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <span>{kategorie.kurz}</span>
          </div>
        </PageHeader>

        <section className="py-12">
          <div className="container max-w-5xl px-4">
            <h2 className="mb-5 text-2xl font-semibold text-foreground">Alle Vorlagen der Kategorie „{kategorie.titel}“</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {liste.map((v) => (
                <VorlagenKarte key={v.slug} vorlage={v} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-card py-12">
          <div className="container max-w-3xl px-4">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Was du zu diesen Vorlagen wissen musst</h2>
            {kategorie.intro.slice(1).map((p) => (
              <p key={p.slice(0, 40)} className="my-3 text-[15px] leading-relaxed text-foreground/85">
                {p}
              </p>
            ))}
            <p className="my-3 text-[15px] leading-relaxed text-foreground/85">
              So funktioniert der Download: Vorlage öffnen, E-Mail-Adresse eingeben, Link in der Bestätigungsmail klicken. Danach sind
              alle Vorlagen der Bibliothek in diesem Browser frei, ohne Konto und ohne Zahlung. Jede Vorlage ist reiner Text mit
              Platzhaltern in eckigen Klammern, dazu Hinweise, Rechtsgrundlagen und ein Ratgeber zum Ausfüllen.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-3xl px-4">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">Häufige Fragen zur Kategorie „{kategorie.titel}“</h2>
            <FaqList items={kategorie.faqs} />
          </div>
        </section>

        <section className="border-t border-border/70 bg-secondary/50 py-12">
          <div className="container max-w-5xl px-4">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Weitere Kategorien</h2>
            <div className="flex flex-wrap gap-2">
              {andere.map((k) => (
                <Link
                  key={k.key}
                  to={`/vorlagen/kategorie/${k.key}`}
                  className="press inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground/80 hover:border-accent-blue/40 hover:text-foreground"
                >
                  {k.titel}
                  <span className="text-xs text-muted-foreground">{VORLAGEN_JE_KATEGORIE[k.key].length}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/vorlagen">
                <Button size="lg" variant="outline">
                  Alle Vorlagen <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/preise">
                <Button size="lg">Vorlagen mit Felix durchgehen</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
