import { Link, Navigate } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Calculator, FileText, Gift, Package, Receipt, ShoppingBag, Sparkles, Store, type LucideIcon } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { FaqList } from "@/components/public/PublicBlocks";
import { BentoGrid, FinalCta, HeroCentered, ScreenshotFrame, SectionHead, StepsPath, TextMarquee, type BentoItem } from "@/components/marketing/Marketing";
import { findZielgruppe } from "@/data/zielgruppen";
import { SCREENS, type ScreenKey } from "@/data/screenshots";
import { TOOL_COUNT } from "@/data/kennzahlen";

const SITE = "https://gruenderx.de";

// Bild und Icon je verlinktem Tool: Gratis-Tools zeigen ihr echtes Ergebnis, Cockpit-Tools einen Ausschnitt.
const KARTE: Record<string, { bild: ScreenKey; icon: LucideIcon }> = {
  "/influencer-steuer-check": { bild: "ausInfluencer", icon: Sparkles },
  "/pr-paket-rechner": { bild: "ausPr", icon: Gift },
  "/tiktok-shop-checkliste": { bild: "ausTiktok", icon: ShoppingBag },
  "gewerbeanmeldung-wizard": { bild: "ausGewerbe", icon: FileText },
  "fse-wizard": { bild: "ausFse", icon: FileText },
  steuerkalender: { bild: "ausKalender", icon: CalendarDays },
  "rechnungs-generator": { bild: "ausRechnung", icon: Receipt },
  "lucid-wizard": { bild: "ausLucid", icon: Package },
  "schwellen-check": { bild: "schwellen", icon: Calculator },
  "shop-profit-rechner": { bild: "shopProfit", icon: Store },
};

const STELLEN = ["Gewerbeamt", "ELSTER", "Finanzamt", "Bundeszentralamt für Steuern", "LUCID", "stiftung ear", "TikTok Shop", "Amazon"];

/**
 * Zielgruppen-Landing (/influencer, /tiktok-shop) im Aufbau von profitpath.com:
 * zentrierter Hero, echter Screenshot, Laufband, Bento mit UI-Ausschnitten,
 * nummerierter Weg, FAQ, Quellen, Schluss-CTA.
 */
const ZielgruppeLanding = ({ slug }: { slug: string }) => {
  const z = findZielgruppe(slug);
  if (!z) return <Navigate to="/" replace />;
  const url = `${SITE}/${z.slug}`;
  const kurz = z.eyebrow.replace(/^Für /, "").split(" · ")[0];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: z.heading,
      description: z.seoDescription,
      url,
      audience: { "@type": "Audience", audienceType: z.eyebrow.replace(/^Für /, "") },
      citation: z.quellen.map((q) => q.url),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: z.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE },
        { "@type": "ListItem", position: 2, name: kurz, item: url },
      ],
    },
  ];

  const bento: BentoItem[] = [
    ...z.freeTools.map((t) => ({
      to: t.to,
      title: t.title,
      text: t.desc,
      icon: KARTE[t.to]?.icon ?? Gift,
      bild: KARTE[t.to] ? SCREENS[KARTE[t.to].bild] : undefined,
      chip: "Gratis, ohne Konto",
    })),
    ...z.tools.slice(0, 3).map((t) => ({
      to: `/tools/${t.slug}`,
      title: t.title,
      text: t.desc,
      icon: KARTE[t.slug]?.icon ?? FileText,
      bild: KARTE[t.slug] ? SCREENS[KARTE[t.slug].bild] : undefined,
    })),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo title={z.seoTitle} description={z.seoDescription} path={`/${z.slug}`} type="website" jsonLd={jsonLd} />
      <Navbar />
      <main id="inhalt">
        <HeroCentered
          crumbs={[{ label: "Start", to: "/" }, { label: kurz }]}
          eyebrow={z.eyebrow}
          title={z.heroTitle}
          accent={z.heroAccent}
          lead={z.lead}
          primary={{ to: z.freeTools[0].to, label: `Gratis: ${z.freeTools[0].title}` }}
          secondary={{ to: "/preise", label: "Preise ansehen" }}
          trust={["Monatlich kündbar", "Server in Frankfurt am Main", `${TOOL_COUNT} Tools & Wizards`]}
        >
          <ScreenshotFrame shot={SCREENS[z.screen]} priority caption="Echte Ansicht aus dem GründerX-Cockpit" />
        </HeroCentered>

        <TextMarquee label="Für die Stellen, mit denen du zu tun hast" items={STELLEN} />

        <section className="container max-w-6xl px-4 py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <SectionHead align="left" eyebrow="Warum jetzt" title={z.warumTitel} />
            </div>
            <div>
              <p className="text-pretty text-lg leading-relaxed text-foreground/85">{z.urgency}</p>
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {z.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 py-3.5 text-[15px] leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-secondary/30 py-24 md:py-32">
          <div className="container max-w-6xl px-4">
            <SectionHead
              eyebrow="Tools"
              title={<>Drei Tools gratis.<br className="hidden md:block" /> Der Rest im Cockpit.</>}
              lead="Starte ohne Konto mit einem der Gratis-Tools. Im Abo kommen die Wizards dazu, die dich durch die Formulare führen."
            />
            <BentoGrid items={bento} />
          </div>
        </section>

        <section className="container max-w-6xl px-4 py-24 md:py-32">
          <SectionHead eyebrow="Ablauf" title={z.wegHeading} />
          <StepsPath
            steps={z.weg}
            note="Die vollständigen Schritte mit Checklisten, ausfüllbaren Formularen und Direkt-Links zu den Ämtern findest du im GründerX-Cockpit."
          />
        </section>

        <section className="border-t border-border/70 py-24 md:py-28">
          <div className="container grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
            {[
              { titel: "Ratgeber", items: z.ratgeber },
              { titel: "Guides & Vorlagen", items: z.guides },
            ].map((g) => (
              <div key={g.titel}>
                <h2 className="mb-5 text-xl font-semibold tracking-tight">{g.titel}</h2>
                <ul className="divide-y divide-border border-y border-border">
                  {g.items.map((r) => (
                    <li key={r.to}>
                      <Link to={r.to} className="group flex items-start justify-between gap-4 py-4">
                        <span>
                          <span className="block font-medium group-hover:text-accent-blue">{r.title}</span>
                          <span className="mt-0.5 block text-sm text-muted-foreground">{r.desc}</span>
                        </span>
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-accent-blue" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="container max-w-6xl px-4 pb-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr,1.2fr] lg:gap-16">
            <div>
              <SectionHead align="left" eyebrow="FAQ" title="Häufige Fragen" />
              <p className="-mt-6 text-sm leading-relaxed text-muted-foreground">
                GründerX ist ein digitales Gründer-Tool und ersetzt keine individuelle Steuer- oder Rechtsberatung. Stand: Oktober 2026.
              </p>
            </div>
            <FaqList items={z.faq} />
          </div>
          <div className="mt-14 border-t border-border pt-6">
            <h2 className="mb-3 text-sm font-semibold">Quellen</h2>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {z.quellen.map((q) => (
                <li key={q.url}>
                  <a href={q.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                    {q.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FinalCta
          title={z.ctaTitle}
          text={z.ctaText}
          primary={{ to: "/checkout", label: "Plan wählen & starten" }}
          secondary={{ to: z.freeTools[0].to, label: `Erst gratis testen: ${z.freeTools[0].title}` }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ZielgruppeLanding;
