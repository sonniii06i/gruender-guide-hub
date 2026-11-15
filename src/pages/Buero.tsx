import { Link } from "react-router-dom";
import PublicShell from "@/layouts/PublicShell";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { HubNav } from "@/components/landing/HubNav";
import { PARTNER_HINWEIS } from "@/config/partnerLinks";
import { PLANS, formatEurCents } from "@/config/pricing";
import { BUERO, bueroPfad } from "@/data/buero";

const SITE = "https://gruenderx.de";
const TITEL = "Büro-Ausstattung für Gründer: Kaufberatung | GründerX";
const BESCHREIBUNG =
  "Drucker, Monitor, Dockingstation, Headset, Webcam, Aktenvernichter: Kaufberatung für Gründer und Selbstständige nach Hersteller-Datenblättern, ohne Testsieger.";

export default function Buero() {
  const letzterStand = BUERO.map((s) => s.stand).sort().pop() ?? "";
  const standDe = letzterStand
    ? new Date(letzterStand).toLocaleDateString("de-DE", { timeZone: "Europe/Berlin", day: "2-digit", month: "long", year: "numeric" })
    : "";

  return (
    <PublicShell>
      <Seo
        title={TITEL}
        description={BESCHREIBUNG}
        path="/buero"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Büro-Ausstattung für Gründer",
            description: BESCHREIBUNG,
            url: `${SITE}/buero`,
            inLanguage: "de",
            dateModified: letzterStand,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: BUERO.length,
              itemListElement: BUERO.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.titel,
                url: `${SITE}${bueroPfad(s.slug)}`,
              })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Büro-Ausstattung", item: `${SITE}/buero` },
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
            Büro-Ausstattung für Gründer: Was du am Anfang wirklich brauchst
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Für den Start reichen meist ein Laptop, ein ordentlicher Monitor und ein Headset. Drucker, Dockingstation, Webcam
            und Aktenvernichter kommen dazu, sobald der Alltag sie verlangt. Jede Seite hier nennt zuerst, welches Gerät für
            welchen Fall passt, und vergleicht dann eine Handvoll lieferbarer Geräte anhand der Datenblätter der Hersteller.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {BUERO.length} Kaufberatungen · Von{" "}
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
        <section aria-labelledby="buero-seiten">
          <h2 id="buero-seiten" className="text-[1.6rem] font-semibold tracking-tight">Alle Kaufberatungen</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {BUERO.map((s) => (
              <Link
                key={s.slug}
                to={bueroPfad(s.slug)}
                className="press group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent-blue/40 hover:shadow-card"
              >
                <h3 className="text-base font-semibold leading-snug group-hover:text-accent-blue">{s.titel}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.kurz}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="buero-reihenfolge">
          <h2 id="buero-reihenfolge" className="text-[1.6rem] font-semibold tracking-tight">In welcher Reihenfolge solltest du kaufen?</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-foreground/90 marker:text-muted-foreground">
            <li>
              Zuerst das, woran du jeden Tag sitzt: Bildschirm und Ton. Ein{" "}
              <Link to="/buero/monitor" className="font-medium text-accent-blue hover:underline">Monitor</Link> und ein{" "}
              <Link to="/buero/headset" className="font-medium text-accent-blue hover:underline">Headset</Link> nutzt du ab
              dem ersten Arbeitstag.
            </li>
            <li>
              Danach das, was den Laptop zum festen Arbeitsplatz macht: eine{" "}
              <Link to="/buero/dockingstation" className="font-medium text-accent-blue hover:underline">Dockingstation</Link>, wenn
              du täglich mehrere Kabel umsteckst, und eine{" "}
              <Link to="/buero/webcam" className="font-medium text-accent-blue hover:underline">Webcam</Link>, wenn Kundengespräche
              per Video zu deinem Geschäft gehören.
            </li>
            <li>
              Zuletzt die Geräte für Papier: ein{" "}
              <Link to="/buero/drucker" className="font-medium text-accent-blue hover:underline">Drucker</Link> und ein{" "}
              <Link to="/buero/aktenvernichter" className="font-medium text-accent-blue hover:underline">Aktenvernichter</Link>.
              Kauf sie, wenn du merkst, wie viel Papier bei dir wirklich anfällt.
            </li>
          </ol>
        </section>

        <section className="mt-14" aria-labelledby="buero-methode">
          <h2 id="buero-methode" className="text-[1.6rem] font-semibold tracking-tight">Wie die Vergleiche entstehen</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-foreground/90 marker:text-muted-foreground">
            <li>Wir testen die Geräte nicht selbst. Jede Angabe stammt aus dem Datenblatt oder von der Produktseite des Herstellers, die Quelle ist bei jedem Gerät verlinkt.</li>
            <li>Es gibt keine Sterne, keine Noten und keinen Testsieger. Jedes Gerät steht für einen Anwendungsfall, damit du nach deinem Bedarf entscheidest.</li>
            <li>Aufgenommen werden nur Geräte, die am Stand-Tag bei mindestens einem Partnerhändler lieferbar waren. Preise kommen aus den Produktdaten der Händler und tragen ein Datum.</li>
            <li>Die Händlerlinks sind Partnerlinks und mit * gekennzeichnet. {PARTNER_HINWEIS.replace(/^Partnerlink:\s*/, "")}</li>
          </ul>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-secondary/40 p-5 md:p-6">
          <h2 className="text-lg font-semibold tracking-tight">Büro-Geräte in der Buchhaltung</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Wie sich die Anschaffung über die Jahre verteilt, rechnest du im{" "}
            <Link to="/tools/abschreibung" className="font-semibold text-accent-blue hover:underline">Abschreibungs-Rechner</Link>{" "}
            durch. Begriffe dazu erklärt das{" "}
            <Link to="/tools/steuer-abc" className="font-semibold text-accent-blue hover:underline">Steuer-ABC</Link>. Die Seiten
            ersetzen keine Steuerberatung.
          </p>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-card p-5 md:p-7">
          <h2 className="text-xl font-semibold tracking-tight">Das Büro steht. Was kommt bei der Gründung zuerst?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            GründerX zeigt dir die Schritte in der richtigen Reihenfolge: Gewerbeanmeldung, Fragebogen zur steuerlichen
            Erfassung, die Pflichtnummern für Händler und die Fristen danach. Mit dem kostenlosen Konto hast du Gratis-Tools und
            Rechner an einem Ort, ohne Kreditkarte. Den vollen Zugang kannst du danach 7 Tage für 1 € testen, dann{" "}
            {formatEurCents(PLANS.gruenderx.grossCents)} im Monat, monatlich kündbar.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button asChild size="lg" className="h-11 rounded-xl bg-gradient-primary font-semibold">
              <Link to="/auth" data-cta="buero-hub-ende">Kostenlos starten</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 rounded-xl font-semibold">
              <Link to="/gratis-tools" data-cta="buero-hub-ende-tools">Gratis-Tools testen</Link>
            </Button>
          </div>
        </section>

        <HubNav show={["tools", "guides", "ratgeber"]} />
      </div>
    </PublicShell>
  );
}
