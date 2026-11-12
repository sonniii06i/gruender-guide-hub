import { Link } from "react-router-dom";
import PublicShell from "@/layouts/PublicShell";
import { Seo } from "@/components/Seo";
import { HubNav } from "@/components/landing/HubNav";
import { LEXIKON_AZ, LEXIKON_JE_THEMA, LEXIKON_THEMEN, lexikonPfad } from "@/data/lexikon";

const SITE = "https://gruenderx.de";
const TITEL = "Gründer-Lexikon: Begriffe für Gründer & Händler | GründerX";
const BESCHREIBUNG =
  "Das GründerX-Lexikon erklärt Begriffe für Gründer und Online-Händler: von Smoke Test und Burn Rate bis LUCID, DAC7 und CE. Mit Rechenbeispiel und Quellen.";

/** Anfangsbuchstaben für die A–Z-Leiste (Ziffern und Umlaute unter dem Grundbuchstaben). */
const buchstabe = (begriff: string) => begriff.trim().charAt(0).toUpperCase();

export default function Lexikon() {
  const letzterStand = LEXIKON_AZ.map((b) => b.stand).sort().pop() ?? "";
  const standDe = letzterStand
    ? new Date(letzterStand).toLocaleDateString("de-DE", { timeZone: "Europe/Berlin", day: "2-digit", month: "long", year: "numeric" })
    : "";
  const buchstaben = [...new Set(LEXIKON_AZ.map((b) => buchstabe(b.begriff)))];

  return (
    <PublicShell>
      <Seo
        title={TITEL}
        description={BESCHREIBUNG}
        path="/lexikon"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Gründer-Lexikon",
            description: BESCHREIBUNG,
            url: `${SITE}/lexikon`,
            inLanguage: "de",
            dateModified: letzterStand,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: LEXIKON_AZ.length,
              itemListElement: LEXIKON_AZ.map((b, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: b.begriff,
                url: `${SITE}${lexikonPfad(b.slug)}`,
              })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Lexikon", item: `${SITE}/lexikon` },
            ],
          },
        ]}
      />

      <header className="relative overflow-hidden border-b border-border/70 bg-hero pb-12 pt-28 md:pb-14 md:pt-32">
        <div
          className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
          aria-hidden="true"
        />
        <div className="container relative max-w-4xl px-4">
          <h1 className="text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] md:text-[3rem]">
            Gründer-Lexikon: Begriffe für Gründer und Online-Händler
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Hier stehen die Begriffe, über die du beim Gründen und Verkaufen stolperst, von der Kennzahl im Pitch-Deck bis zur
            Pflichtnummer vor dem ersten Paket. Jede Seite beginnt mit der Definition in ein bis zwei Sätzen, rechnet ein Beispiel
            durch und nennt die Quelle, aus der Zahlen und Fristen stammen.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {LEXIKON_AZ.length} Begriffe · Von{" "}
            <Link to="/impressum" rel="author" className="font-medium text-foreground hover:underline">Sonni Buttke</Link>, Gründer von GründerX
            {standDe && (
              <>
                {" "}· Stand: <time dateTime={letzterStand}>{standDe}</time>
              </>
            )}
          </p>
        </div>
      </header>

      <div className="container max-w-4xl px-4 py-12 md:py-16">
        <section aria-labelledby="lexikon-az">
          <h2 id="lexikon-az" className="text-xl font-semibold tracking-tight">Alle Begriffe von A bis Z</h2>
          <p className="mt-2 flex flex-wrap gap-2 text-sm" aria-label="Sprung zum Anfangsbuchstaben">
            {buchstaben.map((b) => (
              <a key={b} href={`#buchstabe-${b}`} className="rounded-md border border-border bg-card px-2.5 py-1 font-semibold hover:border-accent-blue/40">
                {b}
              </a>
            ))}
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {LEXIKON_AZ.map((b, i) => {
              const erster = i === 0 || buchstabe(LEXIKON_AZ[i - 1].begriff) !== buchstabe(b.begriff);
              return (
                <li key={b.slug} id={erster ? `buchstabe-${buchstabe(b.begriff)}` : undefined} className="scroll-mt-24">
                  <Link to={lexikonPfad(b.slug)} className="font-medium text-accent-blue hover:underline">
                    {b.begriff}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {LEXIKON_THEMEN.map((t) => {
          const begriffe = LEXIKON_JE_THEMA[t.key];
          if (!begriffe.length) return null;
          return (
            <section key={t.key} className="mt-14" aria-labelledby={`thema-${t.key}`}>
              <h2 id={`thema-${t.key}`} className="scroll-mt-24 text-[1.6rem] font-semibold tracking-tight">{t.titel}</h2>
              <p className="mt-2 text-muted-foreground">{t.kurz}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {begriffe.map((b) => (
                  <Link
                    key={b.slug}
                    to={lexikonPfad(b.slug)}
                    className="press group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent-blue/40 hover:shadow-card"
                  >
                    <h3 className="text-base font-semibold leading-snug group-hover:text-accent-blue">{b.begriff}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.kurz}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <section className="mt-14 rounded-2xl border border-border bg-secondary/40 p-5 md:p-6">
          <h2 className="text-lg font-semibold tracking-tight">Steuerbegriffe und Schritt-für-Schritt-Hilfen</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Das Lexikon erklärt Begriffe. Wie du eine Pflicht in der richtigen Reihenfolge erledigst, zeigen die{" "}
            <Link to="/guides" className="font-semibold text-accent-blue hover:underline">Guides</Link> und die{" "}
            <Link to="/ratgeber" className="font-semibold text-accent-blue hover:underline">Ratgeber</Link>. Steuerbegriffe von
            Abschreibung bis Zahllast stehen im{" "}
            <Link to="/tools/steuer-abc" className="font-semibold text-accent-blue hover:underline">Steuer-ABC</Link>. Die Seiten
            ersetzen keine Steuer- oder Rechtsberatung.
          </p>
        </section>

        <HubNav show={["tools", "guides", "ratgeber"]} />
      </div>
    </PublicShell>
  );
}
