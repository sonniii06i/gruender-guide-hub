import { Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, ChevronLeft, ExternalLink, Info, Minus } from "lucide-react";
import PublicShell from "@/layouts/PublicShell";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { AnbieterLink } from "@/components/PartnerLink";
import { LexikonText } from "@/components/lexikon/LexikonText";
import { PARTNER_HINWEIS } from "@/config/partnerLinks";
import { PLANS, formatEurCents } from "@/config/pricing";
import { BUERO, BUERO_BY_SLUG, BUERO_PREISE, bueroAngebote, bueroBild, bueroPfad } from "@/data/buero";
import type { BueroProdukt, BueroSeite as Seite } from "@/data/buero/types";
import { lexikonKlartext, type LexikonBlock } from "@/data/lexikon/types";
import { bueroInhaltLesen } from "@/lib/buero/inhaltLaden";
import NotFound from "./NotFound";

const SITE = "https://gruenderx.de";

const datumDe = (d: string) =>
  // feste Zone: Prerender (UTC) und Besucher rendern dasselbe Datum
  new Date(d).toLocaleDateString("de-DE", { timeZone: "Europe/Berlin", day: "2-digit", month: "long", year: "numeric" });

const euro = (n: number) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });

export default function BueroSeite() {
  const { slug = "" } = useParams();
  const seite = BUERO_BY_SLUG[slug];
  if (!seite) return <NotFound />;
  return (
    <PublicShell>
      {/* Eigene Suspense-Grenze: Die Seite wartet auf inhalte/<slug>.ts; beim Hydrieren bleibt das prerenderte HTML stehen. */}
      <Suspense fallback={<p className="container max-w-4xl px-4 py-36 text-muted-foreground">Kaufberatung wird geladen …</p>}>
        <Inhalt key={slug} seite={seite} />
      </Suspense>
    </PublicShell>
  );
}

function Block({ block }: { block: LexikonBlock }) {
  switch (block.art) {
    case "text":
      return (
        <p className="mt-4 leading-relaxed text-foreground/90">
          <LexikonText text={block.text} />
        </p>
      );
    case "liste":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-foreground/90 marker:text-muted-foreground">
          {block.punkte.map((p, i) => (
            <li key={i}>
              <LexikonText text={p} />
            </li>
          ))}
        </ul>
      );
    case "formel":
      return <p className="mt-4 rounded-xl border border-border bg-secondary/50 px-4 py-3 font-medium tabular">{block.text}</p>;
    case "tabelle":
      return (
        <div className="mt-5 overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-sm [&_td]:border-t [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_th]:bg-secondary/60 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold">
            <thead>
              <tr>
                {block.kopf.map((k, i) => (
                  <th key={i} scope="col">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.zeilen.map((z, i) => (
                <tr key={i}>
                  {z.map((c, j) => (
                    <td key={j} className="tabular">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "hinweis":
      return (
        <p className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{block.text}</span>
        </p>
      );
  }
}

const wert = (p: BueroProdukt, label: string) => p.daten.find((d) => d.label === label)?.wert ?? "–";

function ProduktKarte({ p, ort }: { p: BueroProdukt; ort: string }) {
  const angebote = bueroAngebote(p.ean);
  const bild = bueroBild(p.ean);
  return (
    <article id={p.id} className="scroll-mt-24 rounded-2xl border border-border bg-card p-5 shadow-card md:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {bild && (
          <img
            src={bild}
            alt={p.name}
            width={144}
            height={144}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-36 w-36 shrink-0 rounded-xl border border-border bg-white object-contain p-2"
          />
        )}
        <div className="min-w-0">
          <p className="inline-flex items-center rounded-full border border-foreground/25 bg-accent px-3 py-0.5 text-[13px] font-medium text-muted-foreground">
            {p.rolle}
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight">{p.name}</h3>
          <p className="mt-2 leading-relaxed text-foreground/90">{p.kurz}</p>
        </div>
      </div>

      <dl className="mt-5 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
        {p.daten.map((d) => (
          <div key={d.label} className="flex justify-between gap-4 border-b border-border/60 py-1.5">
            <dt className="text-muted-foreground">{d.label}</dt>
            <dd className="text-right font-medium tabular">{d.wert}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid gap-5 text-sm sm:grid-cols-2">
        <div>
          <p className="font-semibold">Stärken laut Datenblatt</p>
          <ul className="mt-2 space-y-1.5">
            {p.plus.map((x, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold">Grenzen laut Datenblatt</p>
          <ul className="mt-2 space-y-1.5">
            {p.minus.map((x, i) => (
              <li key={i} className="flex items-start gap-2">
                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-border/70 pt-5 sm:flex-row sm:flex-wrap sm:items-center">
        {angebote.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Am {datumDe(BUERO_PREISE.stand)} bei keinem unserer Partnerhändler lieferbar.
          </p>
        ) : (
          angebote.map((a, i) => (
            <Button key={a.haendler} asChild size="lg" variant={i === 0 ? "default" : "outline"} className="h-11 rounded-xl font-semibold">
              <AnbieterLink url={a.url} ort={ort} data-cta="buero-angebot">
                {euro(a.preis)} bei {a.haendler} <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </AnbieterLink>
            </Button>
          ))
        )}
        <a
          href={p.datenblatt.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline sm:ml-auto"
        >
          Datenblatt: {p.datenblatt.titel} <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function Inhalt({ seite }: { seite: Seite }) {
  const inhalt = bueroInhaltLesen(seite);
  const pfad = bueroPfad(seite.slug);
  const url = `${SITE}${pfad}`;
  const ort = `buero-${seite.slug}`;
  const andere = BUERO.filter((s) => s.slug !== seite.slug);
  const preisStand = datumDe(BUERO_PREISE.stand);

  return (
    <>
      <Seo
        title={seite.seo.title}
        description={seite.seo.description}
        path={pfad}
        type="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: seite.titel,
            description: seite.seo.description,
            abstract: lexikonKlartext(inhalt.antwort),
            image: `${SITE}/og-image.png`,
            inLanguage: "de",
            datePublished: seite.veroeffentlicht,
            dateModified: seite.stand,
            author: { "@type": "Person", name: "Sonni Buttke", jobTitle: "Gründer von GründerX", url: `${SITE}/impressum` },
            publisher: {
              "@type": "Organization",
              name: "GründerX",
              logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            citation: [...inhalt.produkte.map((p) => p.datenblatt.url), ...inhalt.quellen.map((q) => q.url)],
          },
          {
            // Nur die Liste der verglichenen Geräte. Bewusst ohne Review, Rating oder Offer:
            // Es gibt keinen eigenen Test, und die Preise gehören dem Händler.
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: seite.titel,
            numberOfItems: inhalt.produkte.length,
            itemListElement: inhalt.produkte.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: `${url}#${p.id}`,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Büro-Ausstattung", item: `${SITE}/buero` },
              { "@type": "ListItem", position: 3, name: seite.name, item: url },
            ],
          },
        ]}
      />

      <article>
        <header className="relative overflow-hidden border-b border-border/70 bg-hero pb-12 pt-28 md:pb-14 md:pt-24">
          <div
            className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
            aria-hidden="true"
          />
          <div className="container relative max-w-4xl px-4">
            <Link to="/buero" className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Büro-Ausstattung für Gründer
            </Link>
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center rounded-full border border-foreground/25 bg-accent px-3 py-0.5 text-[13px] font-medium text-accent-blue">
                Datenblatt-Vergleich
              </span>
              <span>
                Stand: <time dateTime={seite.stand}>{datumDe(seite.stand)}</time>
              </span>
            </div>
            <h1 className="text-balance text-[1.875rem] font-semibold leading-[1.12] tracking-[-0.02em] md:text-[2.5rem]">{seite.titel}</h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed">
              <LexikonText text={inhalt.antwort} />
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Von{" "}
              <Link to="/impressum" rel="author" className="font-medium text-foreground hover:underline">Sonni Buttke</Link>
              , Gründer von GründerX · Vergleich nach Hersteller-Datenblättern, kein eigener Gerätetest
            </p>
            {/* Kennzeichnung vor dem ersten Partnerlink der Seite */}
            <p className="mt-3 text-sm text-muted-foreground">
              Diese Seite enthält Partnerlinks, gekennzeichnet mit *. {PARTNER_HINWEIS.replace(/^Partnerlink:\s*/, "")}
            </p>
          </div>
        </header>

        <div className="container max-w-4xl px-4 py-12 md:py-16">
          <section aria-labelledby="vergleich">
            <h2 id="vergleich" className="text-[1.6rem] font-semibold leading-snug tracking-tight">
              {inhalt.produkte.length} Geräte im Vergleich
            </h2>
            {/* Breiter als der Textspalt (ab xl), darunter seitlich scrollbar: Die Datenblatt-Werte sind lang. */}
            <div className="mt-5 overflow-x-auto rounded-xl border border-border bg-card xl:-mx-24">
              <table className="w-full min-w-[920px] border-collapse text-[13px] leading-snug [&_td]:border-t [&_td]:border-border [&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:align-top [&_th]:font-semibold [&_thead_th]:bg-secondary/60 [&_tbody_th]:border-t [&_tbody_th]:border-border">
                <thead>
                  <tr>
                    <th scope="col" className="min-w-[9.5rem]">Gerät</th>
                    <th scope="col">Gedacht für</th>
                    {inhalt.vergleich.map((l) => (
                      <th key={l} scope="col">{l}</th>
                    ))}
                    <th scope="col">Preis ab</th>
                  </tr>
                </thead>
                <tbody>
                  {inhalt.produkte.map((p) => {
                    const a = bueroAngebote(p.ean)[0];
                    return (
                      <tr key={p.id}>
                        <th scope="row">
                          <a href={`#${p.id}`} className="font-semibold text-accent-blue hover:underline">{p.name}</a>
                        </th>
                        <td>{p.rolle}</td>
                        {inhalt.vergleich.map((l) => (
                          <td key={l} className="tabular">{wert(p, l)}</td>
                        ))}
                        <td className="whitespace-nowrap tabular">{a ? euro(a.preis) : "–"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Preise inklusive Umsatzsteuer, ohne Versand, laut Händler am {preisStand}. Sie ändern sich laufend, es gilt der
              Preis beim Händler.
            </p>
          </section>

          <section className="mt-12" aria-labelledby="auswahl">
            <h2 id="auswahl" className="text-[1.6rem] font-semibold leading-snug tracking-tight">Wie diese Auswahl entstanden ist</h2>
            <p className="mt-4 leading-relaxed text-foreground/90">
              <LexikonText text={inhalt.auswahl} />
            </p>
          </section>

          <section className="mt-12" aria-labelledby="geraete">
            <h2 id="geraete" className="text-[1.6rem] font-semibold leading-snug tracking-tight">Die Geräte im Einzelnen</h2>
            <div className="mt-6 space-y-6">
              {inhalt.produkte.map((p) => (
                <ProduktKarte key={p.id} p={p} ort={ort} />
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              * {PARTNER_HINWEIS} Preise laut Händler am {preisStand}.
            </p>
          </section>

          <nav aria-label="Kaufberatung" className="mt-14 rounded-xl border border-border bg-card p-4 md:p-5">
            <p className="text-sm font-semibold">Kaufberatung</p>
            <ol className="mt-2 space-y-1 text-sm">
              {inhalt.abschnitte.map((a, i) => (
                <li key={i}>
                  <a href={`#abschnitt-${i + 1}`} className="text-accent-blue hover:underline">{a.titel}</a>
                </li>
              ))}
            </ol>
          </nav>

          {inhalt.abschnitte.map((a, i) => (
            <section key={i} aria-labelledby={`abschnitt-${i + 1}`}>
              <h2 id={`abschnitt-${i + 1}`} className="mt-12 scroll-mt-24 text-[1.6rem] font-semibold leading-snug tracking-tight">
                {a.titel}
              </h2>
              {a.bloecke.map((b, j) => (
                <Block key={j} block={b} />
              ))}
            </section>
          ))}

          <section className="mt-14" aria-labelledby="weitere-geraete">
            <h2 id="weitere-geraete" className="text-lg font-semibold tracking-tight">Weitere Büro-Ausstattung</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {andere.map((s) => (
                <Link
                  key={s.slug}
                  to={bueroPfad(s.slug)}
                  className="press group rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/30"
                >
                  <p className="mb-1 text-sm font-semibold leading-snug">{s.titel}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{s.kurz}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14" aria-labelledby="passende-hilfen">
            <h2 id="passende-hilfen" className="text-lg font-semibold tracking-tight">Passende Tools, Guides und Ratgeber</h2>
            <ul className="mt-4 space-y-3">
              {inhalt.kontext.map((k) => (
                <li key={k.pfad} className="rounded-xl border border-border bg-card p-4">
                  <Link to={k.pfad} className="inline-flex items-center gap-1 text-sm font-semibold text-accent-blue hover:underline">
                    {k.label} <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{k.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14" aria-labelledby="quellen">
            <h2 id="quellen" className="text-lg font-semibold tracking-tight">Quellen</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Datenblätter und Produktseiten der Hersteller, abgerufen am {datumDe(seite.stand)}. Alle Gerätedaten stammen von dort.
            </p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
              {[...inhalt.produkte.map((p) => ({ titel: p.datenblatt.titel, url: p.datenblatt.url })), ...inhalt.quellen].map((q) => (
                <li key={q.url}>
                  <a href={q.url} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">
                    {q.titel}
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14 rounded-2xl border border-border bg-card p-5 md:p-7">
            <h2 className="text-xl font-semibold tracking-tight">Das Büro steht. Was kommt bei der Gründung zuerst?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              GründerX zeigt dir die Schritte in der richtigen Reihenfolge: Gewerbeanmeldung, Fragebogen zur steuerlichen
              Erfassung, die Pflichtnummern für Händler und die Fristen danach. Mit dem kostenlosen Konto hast du Gratis-Tools
              und Rechner an einem Ort, ohne Kreditkarte. Den vollen Zugang mit allen Guides und Felix kannst du danach 7 Tage
              für 1 € testen, dann {formatEurCents(PLANS.gruenderx.grossCents)} im Monat, monatlich kündbar.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button asChild size="lg" className="h-11 rounded-xl bg-gradient-primary font-semibold">
                <Link to="/auth" data-cta="buero-ende">Kostenlos starten</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-xl font-semibold">
                <Link to="/gratis-tools" data-cta="buero-ende-tools">Gratis-Tools testen</Link>
              </Button>
            </div>
          </section>

          <div className="mt-14 flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-5 md:p-6">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              So entsteht diese Seite: Wir haben die Geräte nicht selbst getestet. Mit KI-Unterstützung recherchiert und
              geschrieben, jede Geräteangabe am Datenblatt des Herstellers geprüft, Stand {datumDe(seite.stand)}. Preise und
              Lieferbarkeit kommen aus den Produktdaten der Händler. Autor und verantwortlich für den Inhalt:{" "}
              <Link to="/impressum" className="font-semibold text-foreground hover:underline">Sonni Buttke</Link>, Gründer von
              GründerX. Keine Steuer- oder Rechtsberatung.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
