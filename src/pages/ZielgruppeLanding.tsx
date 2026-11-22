import { Link, Navigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Calculator, FileSpreadsheet, FileText, Gift, Info, Package, PlugZap, Receipt, ShoppingBag, Sparkles, Store, TrendingUp, type LucideIcon } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { FaqList } from "@/components/public/PublicBlocks";
import { BentoGrid, FinalCta, HeroCentered, ScreenshotFrame, SectionHead, StepsPath, TextMarquee, type BentoItem } from "@/components/marketing/Marketing";
import { findZielgruppe } from "@/data/zielgruppen";
import { SCREENS, type ScreenKey } from "@/data/screenshots";
import { TOOL_COUNT } from "@/data/kennzahlen";
import { PLANS, NOT_INCLUDED, formatEurCents } from "@/config/pricing";
import { START_ANGEBOT } from "@/utils/startAngebot";

const SITE = "https://gruenderx.de";

// Bild und Icon je verlinktem Tool: Gratis-Tools zeigen ihr echtes Ergebnis, Cockpit-Tools einen Ausschnitt.
const KARTE: Record<string, { bild?: ScreenKey; icon: LucideIcon }> = {
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
  "/tools/lucid-wizard": { bild: "ausLucid", icon: Package },
  "/tools/weee-check": { icon: PlugZap },
  "/ust-id-beantragen": { icon: BadgeCheck },
  "amazon-parser": { icon: FileSpreadsheet },
  "marge-tracker": { icon: TrendingUp },
};

const MONAT = formatEurCents(PLANS.gruenderx.grossCents);
const AUTOR = { "@type": "Person", name: "Sonni Buttke", jobTitle: "Gründer von GründerX", url: `${SITE}/impressum` };

const STELLEN = ["Gewerbeamt", "ELSTER", "Finanzamt", "Bundeszentralamt für Steuern", "LUCID", "stiftung ear", "TikTok Shop", "Amazon"];

/**
 * Zielgruppen-Landing (/influencer, /tiktok-shop, /amazon-haendler) im Aufbau von profitpath.com:
 * zentrierter Hero, echter Screenshot, Laufband, Bento mit UI-Ausschnitten,
 * nummerierter Weg, FAQ, Quellen, Schluss-CTA.
 *
 * Seit 14.11.2026 optional je Seite (Felder in data/zielgruppen.ts): Antwort zuerst (Frage-H2 mit Stand und Autor),
 * Tabelle mit Rechtsgrundlagen, eigener Beispielfall und Einwände vor dem Schluss-CTA. Seiten ohne diese Felder
 * sehen aus wie bisher.
 *
 * Seit 21.11.2026 zusätzlich optional: Fall-Tabelle (`faelle`) direkt unter der Antwort, z. B. Rechtsform → Kontotyp.
 * Diese Datei ist die Obermenge der Fassung im Zweig lp/amazon-haendler; beim Zusammenführen gilt diese Fassung.
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
      ...(z.stand ? { dateModified: z.stand.iso, author: AUTOR } : {}),
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
      bild: KARTE[t.to]?.bild ? SCREENS[KARTE[t.to].bild!] : undefined,
      chip: "Gratis, ohne Konto",
    })),
    ...z.tools.slice(0, 3).map((t) => ({
      to: `/tools/${t.slug}`,
      title: t.title,
      text: t.desc,
      icon: KARTE[t.slug]?.icon ?? FileText,
      bild: KARTE[t.slug]?.bild ? SCREENS[KARTE[t.slug].bild!] : undefined,
    })),
  ];

  // Einwände am Schluss-CTA: die der Seite, dazu Preis und Grenzen aus config/pricing.ts (nichts getippt).
  const einwaende = z.einwaende
    ? [
        ...z.einwaende,
        {
          q: "Noch ein Abo – was kostet das?",
          a: `Der volle Zugang kostet ${MONAT} im Monat inklusive Umsatzsteuer und ist jederzeit zum Ende der laufenden Abrechnungsperiode kündbar. Neukunden starten mit ${START_ANGEBOT.tage} Tagen für ${START_ANGEBOT.preisText}; ohne Kündigung läuft danach der Monatszugang für ${MONAT} weiter. Die Gratis-Tools auf dieser Seite brauchen kein Konto.`,
        },
        { q: "Was ist nicht enthalten?", a: NOT_INCLUDED },
      ]
    : [];

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

        {z.antwort && (
          <section className="container max-w-3xl px-4 pb-4 pt-10 md:pt-14" aria-labelledby="kurzantwort">
            <h2 id="kurzantwort" className="text-balance text-2xl font-semibold leading-tight tracking-[-0.03em] text-primary md:text-[2rem]">
              {z.antwort.frage}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/85">{z.antwort.text}</p>
            {z.stand && (
              <p className="mt-4 text-sm text-muted-foreground">
                Stand: <time dateTime={z.stand.iso}>{z.stand.text}</time> · Autor:{" "}
                <Link to="/impressum" className="font-medium text-foreground hover:underline">Sonni Buttke</Link>, Gründer von GründerX
              </p>
            )}
          </section>
        )}

        {z.faelle && (
          <section className="container max-w-6xl px-4 pb-10 pt-12 md:pb-16 md:pt-20" aria-labelledby="faelle">
            <SectionHead align="left" eyebrow={z.faelle.eyebrow} title={<span id="faelle">{z.faelle.titel}</span>} lead={z.faelle.lead} />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">
                  {z.faelle.titel}{z.stand ? `, Stand ${z.stand.text}` : ""}
                </caption>
                <thead className="hidden bg-secondary/60 text-sm text-muted-foreground md:table-header-group">
                  <tr>
                    {z.faelle.kopf.map((k) => (
                      <th key={k} scope="col" className="px-5 py-3.5 font-medium">{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {z.faelle.zeilen.map((r) => (
                    <tr key={r[0]} className="block border-t border-border px-5 py-4 first:border-t-0 md:table-row md:px-0 md:py-0 md:first:border-t">
                      <th scope="row" className="block pb-1.5 font-semibold leading-snug md:table-cell md:w-[21%] md:px-5 md:py-4 md:align-top">{r[0]}</th>
                      {r.slice(1).map((c, i) => (
                        <td key={z.faelle!.kopf[i + 1]} className="block py-0.5 text-muted-foreground md:table-cell md:px-5 md:py-4 md:align-top">
                          <span className="font-medium text-foreground md:hidden">{z.faelle!.kopf[i + 1]}: </span>{c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">{z.faelle.fuss}</p>
            {z.faelle.link && (
              <Link to={z.faelle.link.to} className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent-blue hover:underline">
                {z.faelle.link.label} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            )}
          </section>
        )}

        <TextMarquee label="Für die Stellen, mit denen du zu tun hast" items={STELLEN} />

        {z.tabelle && (
          <section className="container max-w-6xl px-4 pt-16 md:pt20" aria-labelledby="pflichten">
            <SectionHead align="left" eyebrow="Reihenfolge" title={<span id="pflichten">{z.tabelle.titel}</span>} lead={z.tabelle.lead} />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">
                  {z.tabelle.titel}{z.stand ? `, Stand ${z.stand.text}` : ""}
                </caption>
                <thead className="hidden bg-secondary/60 text-sm text-muted-foreground md:table-header-group">
                  <tr>
                    {z.tabelle.kopf.map((k) => (
                      <th key={k} scope="col" className="px-5 py-3.5 font-medium">{k}</th>
                    ))}
                    <th scope="col" className="px-5 py-3.5 font-medium">Hilfe in GründerX</th>
                  </tr>
                </thead>
                <tbody>
                  {z.tabelle.zeilen.map((r) => (
                    <tr key={r.schritt} className="block border-t border-border px-5 py-4 first:border-t-0 md:table-row md:px-0 md:py-0 md:first:border-t">
                      <th scope="row" className="block pb-1.5 font-semibold leading-snug md:table-cell md:w-[24%] md:px-5 md:py-4 md:align-top">{r.schritt}</th>
                      <td className="block py-0.5 text-muted-foreground md:table-cell md:px-5 md:py-4 md:align-top">
                        <span className="font-medium text-foreground md:hidden">{z.tabelle!.kopf[1]}: </span>{r.wann}
                      </td>
                      <td className="block py-0.5 text-muted-foreground md:table-cell md:px-5 md:py-4 md:align-top">
                        <span className="font-medium text-foreground md:hidden">{z.tabelle!.kopf[2]}: </span>{r.wo}
                      </td>
                      <td className="block py-0.5 text-muted-foreground md:table-cell md:px-5 md:py-4 md:align-top">
                        <span className="font-medium text-foreground md:hidden">{z.tabelle!.kopf[3]}: </span>{r.grundlage}
                      </td>
                      <td className="block pt-2 md:table-cell md:w-[19%] md:px-5 md:py-4 md:align-top">
                        <Link to={r.hilfe.to} className="inline-flex min-h-11 items-center gap-1 font-medium text-accent-blue hover:underline md:min-h-0">
                          {r.hilfe.label} <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">
              {z.stand && <>Stand: {z.stand.text}. </>}{z.tabelle.fuss}
            </p>
          </section>
        )}

        <section className="container max-w-6xl px-4 py-16 md:py20">
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

        {z.beispiel && (
          <section className="container max-w-6xl px-4 pb-16 md:pb20" aria-labelledby="beispiel">
            <div className="grid gap-8 rounded-[1.5rem] border border-border bg-card p-6 shadow-card md:grid-cols-[1fr,1.1fr] md:gap-14 md:p-10">
              <div>
                <p className="mb-2 text-[13px] font-semibold text-muted-foreground">Beispielrechnung</p>
                <h2 id="beispiel" className="text-balance text-2xl font-semibold leading-tight tracking-[-0.03em] text-primary md:text-[2rem]">{z.beispiel.titel}</h2>
                <p className="mt-4 text-pretty leading-relaxed text-foreground/85">{z.beispiel.text}</p>
                <Link to={z.beispiel.link.to} className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent-blue hover:underline">
                  {z.beispiel.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div>
                <ul className="divide-y divide-border border-y border-border">
                  {z.beispiel.punkte.map((p) => (
                    <li key={p} className="flex gap-3 py-3.5 text-[15px] leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {z.beispiel.hinweis}
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="border-y border-border/70 bg-secondary/30 py-16 md:py20">
          <div className="container max-w-6xl px-4">
            <SectionHead
              eyebrow="Tools"
              title={z.toolsTitel ?? <>Drei Tools gratis.<br className="hidden md:block" /> Der Rest im Cockpit.</>}
              lead={z.toolsLead ?? "Starte ohne Konto mit einem der Gratis-Tools. Im Abo kommen die Wizards dazu, die dich durch die Formulare führen."}
            />
            <BentoGrid items={bento} />
          </div>
        </section>

        <section className="container max-w-6xl px-4 py-16 md:py-20">
          <SectionHead eyebrow="Ablauf" title={z.wegHeading} />
          <StepsPath
            steps={z.weg}
            note="Die vollständigen Schritte mit Checklisten, ausfüllbaren Formularen und Direkt-Links zu den Ämtern findest du im GründerX-Cockpit."
          />
        </section>

        <section className="border-t border-border/70 py-16 md:py-20">
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
                GründerX ist ein digitales Gründer-Tool und ersetzt keine individuelle Steuer- oder Rechtsberatung. Stand: {z.stand?.text ?? "Oktober 2026"}.
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
            {z.stand && (
              <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  So entsteht diese Seite: mit KI-Unterstützung recherchiert und geschrieben, die Rechtsgrundlagen am Gesetzestext geprüft, Stand{" "}
                  {z.stand.text}. Autor und verantwortlich für den Inhalt:{" "}
                  <Link to="/impressum" className="font-semibold text-foreground hover:underline">Sonni Buttke</Link>, Gründer von GründerX. Keine
                  Steuer- oder Rechtsberatung – im Einzelfall Steuerberater fragen.
                </span>
              </p>
            )}
          </div>
        </section>

        {einwaende.length > 0 && (
          <section className="container max-w-6xl px-4 pb-16 md:pb20" aria-labelledby="einwaende">
            <SectionHead align="left" eyebrow="Vor der Entscheidung" title={<span id="einwaende">Was dagegen spricht – und was wir dazu sagen</span>} />
            <dl className="grid gap-4 md:grid-cols-2">
              {einwaende.map((e) => (
                <div key={e.q} className="rounded-2xl bg-card p-5 ring-1 ring-border/70 md:p-6">
                  <dt className="font-semibold leading-snug tracking-tight">{e.q}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{e.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <FinalCta
          title={z.ctaTitle}
          text={z.ctaText}
          primary={{ to: "/preise", label: "Plan wählen & starten" }}
          secondary={{ to: z.freeTools[0].to, label: `Erst gratis testen: ${z.freeTools[0].title}` }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ZielgruppeLanding;
