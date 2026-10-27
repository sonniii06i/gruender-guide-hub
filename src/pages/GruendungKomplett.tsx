import { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { startGuestCheckout } from "@/utils/guestCheckout";
import { ArrowRight, Check, CalendarClock, FileSpreadsheet, Landmark, Wallet } from "lucide-react";
import { TOOL_COUNT } from "@/data/features";
import { WERBE_HINWEIS } from "@/lib/werbeHinweis";

/**
 * Anzeigen-Landingpage für die Meta-Kampagne "Gründungsstack"
 * (Route /gruendung-komplett).
 *
 * WARUM ES DIESE SEITE ÜBERHAUPT GIBT. Die Anzeige zeigte vorher auf
 * /us-llc-30-tage. Das Creative handelt jetzt aber von der deutschen Gründung —
 * Gewerbeanmeldung, Buchhaltung, Umsatzsteuer-Voranmeldung. Wer nach diesem
 * Video klickt und auf einer Seite über Registered Agents in Wyoming landet,
 * springt sofort ab. Und Meta bewertet den Bruch zwischen Anzeigenversprechen
 * und Zielseite als irreführend — bei einem Konto, das schon einmal
 * eingeschränkt war, ist das kein theoretisches Risiko.
 *
 * BEWUSST KEINE SEO-SEITE, wie bei /us-llc-30-tage: ein Versprechen, ein Weg,
 * keine globale Navigation. Jeder zusätzliche Link ist bei bezahltem Traffic
 * ein Ausgang.
 *
 * DIE WERKZEUG-ZAHL IST GEZÄHLT, NICHT GESCHÄTZT: TOOL_COUNT aus
 * data/features.ts = genau die auf /tools verlinkten Werkzeuge. Seit 06.10.2026
 * automatisch statt fest eingetragen (vorher „78" von Hand, /tools zeigte 79).
 * Eine belegbare Zahl ist das Einzige, was diese Seite von einer beliebigen
 * "Alles-in-einem"-Behauptung unterscheidet.
 *
 * § 5 StBerG. Steuerberatung ist genauso erlaubnispflichtig wie Rechtsberatung
 * nach dem RDG. Deshalb steht hier durchgehend "vorbereiten", "berechnen",
 * "Fristen im Blick" — und nirgends "wir erledigen deine Steuer". Wer diese
 * Seite ändert, hält diese Grenze bitte ein.
 */

// Belegt durch vorhandene Werkzeuge — wer den Text ändert, prüft, ob sie noch existieren:
//   Gründen     /tools/rechtsform-wizard, /tools/gewerbe-check, /tools/gewerbeanmeldung-wizard
//   Aufsetzen   /tools/vergleich-banking-de, /tools/geschaeftskreditkarten, /tools/vergleich-buchhaltung
//   Abrechnen   /tools/ust-voranmeldung, /tools/anlage-euer, /tools/bwa, /tools/datev-export
//   Dranbleiben /tools/frist-kalender, /tools/steuer-abc, /tools/stb-cost-benefit
//
// Die Werkzeuge werden hier NICHT verlinkt: Auf einer bezahlten Landingpage ist
// jeder zusätzliche Link ein Ausgang. Sie stehen als Beleg, nicht als Navigation.
const ETAPPEN = [
  {
    icon: Landmark,
    titel: "Gründen",
    text:
      "Rechtsform-Wizard, Gewerbe-Check und Gewerbeanmeldung-Assistent, dazu der " +
      "Gründungskosten-Rechner. Am Ende steht, welche Form zur Lage passt und was " +
      "sie tatsächlich kostet — vor dem Gang zum Amt, nicht danach.",
  },
  {
    icon: Wallet,
    titel: "Aufsetzen",
    text:
      "Geschäftskonto und Geschäftskreditkarten im Vergleich, Buchhaltungssoftware " +
      "gegenübergestellt statt geraten. Die Entscheidungen, die man einmal trifft " +
      "und danach jahrelang mitschleppt.",
  },
  {
    icon: FileSpreadsheet,
    titel: "Abrechnen",
    text:
      "Umsatzsteuer-Voranmeldung und Anlage EÜR vorbereitet, Umsatzsteuer und " +
      "Quartalsschätzung gerechnet, BWA und DATEV-Export für die Übergabe an die " +
      "Kanzlei. Die Formulare, die am Ende in Elster landen.",
  },
  {
    icon: CalendarClock,
    titel: "Dranbleiben",
    text:
      "Fristenkalender, Steuer-ABC und die Rechnung, ob sich eine Steuerkanzlei " +
      "zum jeweiligen Zeitpunkt lohnt. Denn nach der Gründung hört es nicht auf — " +
      "es fängt an, regelmäßig zu werden.",
  },
];

const GruendungKomplett = () => {
  // pay-first: Der Klick geht direkt in den Stripe-Checkout, nicht mehr auf
  // /auth. Der Preis steht am Button — ein Preis, der erst nach dem Klick
  // auftaucht, kostet Vertrauen und ist bei Meta ein Ablehnungsgrund.
  const [checkoutError, setCheckoutError] = useState(false);

  const Cta = ({ label = "Zugang freischalten", onInk = false }: { label?: string; onInk?: boolean }) => (
    <div className="flex flex-col items-center gap-2">
      <Button
        size="lg"
        className={`h-12 rounded-xl px-8 text-base font-semibold ${onInk ? "bg-card text-primary hover:bg-card/90" : "bg-gradient-primary hover:opacity-95"}`}
        onClick={() => {
          setCheckoutError(false);
          startGuestCheckout("gruenderx").catch(() => setCheckoutError(true));
        }}
      >
        {label}
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </Button>
      <span className={`text-xs tabular ${onInk ? "text-primary-foreground/70" : "text-muted-foreground"}`}>64,99 € / Monat · monatlich kündbar</span>
      {checkoutError && (
        <span role="alert" className={`text-xs ${onInk ? "font-medium text-primary-foreground" : "text-danger"}`}>
          Der Checkout ließ sich nicht öffnen. Bitte noch einmal versuchen.
        </span>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-background">
      <Seo
        title="Vom Gewerbeschein bis zur Umsatzsteuer-Voranmeldung | GründerX"
        description={`${TOOL_COUNT} Werkzeuge für die Unternehmensgründung: Rechtsform, Gewerbeanmeldung, Geschäftskonto, Buchhaltung, Umsatzsteuer-Voranmeldung und EÜR — in der Reihenfolge, in der sie gebraucht werden.`}
        path="/gruendung-komplett"
        noindex
      />

      {/* Kein globales Menü: nur die Marke, ohne Link (bezahlter Traffic, ein Weg) */}
      <div className="absolute inset-x-0 top-0 z-10">
        <div className="container flex h-16 max-w-6xl items-center gap-2 px-4">
          <Logo asImage className="h-7 w-7" />
          <span className="text-base font-semibold tracking-tight">GründerX</span>
        </div>
      </div>

      <main>
      {/* Hero -- wiederholt die Einblendung der Anzeige woertlich. */}
      <section className="relative overflow-hidden border-b border-border/70 bg-hero pb-16 pt-28 md:pb-20 md:pt-32">
        <div
          className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
          aria-hidden="true"
        />
        <div className="container relative max-w-3xl px-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/25 bg-brand-green-soft px-3 py-1 text-[13px] font-medium text-brand-green">
            Für Gründerinnen und Gründer in Deutschland
          </span>

          <h1 className="mt-6 text-balance text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[3.5rem]">
            <span className="block">{TOOL_COUNT} Werkzeuge zwischen</span>
            <span className="block text-accent-blue">Gewerbeschein und Steuererklärung.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
            Gewerbe anmelden ist der kleinste Teil. Danach kommen{" "}
            <strong className="font-semibold text-foreground">
              Rechtsform, Geschäftskonto, Buchhaltung, Umsatzsteuer-Voranmeldung, EÜR
            </strong>{" "}
            — und die Fristen dazu.
          </p>

          <div className="mt-9 flex justify-center">
            <Cta />
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Zahlung zuerst, danach legst du dein Konto an.
          </p>
        </div>
      </section>

      {/* Die vier Etappen -- Chronologie einer echten Gruendung. */}
      <section className="container max-w-6xl px-4 py-16 md:py-20">
        <h2 className="text-center text-2xl font-semibold tracking-tight md:text-[1.75rem]">
          In der Reihenfolge, in der es tatsächlich passiert
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ETAPPEN.map((e, i) => (
            <li key={e.titel} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-blue">
                  <e.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium tabular text-muted-foreground">Etappe {i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{e.titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Die These, ausformuliert. */}
      <section className="border-y border-border/70 bg-secondary/40">
        <div className="container grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:py-20">
          <div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-[1.75rem]">
              Jeder Schritt ist gut dokumentiert. Nur an achtzehn verschiedenen Stellen.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Die Gewerbeanmeldung erklärt die Stadt. Die Rechtsform erklärt die IHK. Die
              Umsatzsteuer erklärt das Finanzamt, die Buchhaltung der Softwareanbieter,
              und die Fristen stehen in einem PDF, das man einmal gelesen und danach nie
              wieder geöffnet hat.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Keine dieser Quellen ist falsch. Nur sagt keine davon, was als Nächstes
              dran ist — und genau daran scheitert es meistens. Nicht am einzelnen
              Schritt, sondern an der Reihenfolge.
            </p>
          </div>
          <div className="self-start rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-base font-semibold">Im Zugang enthalten</h3>
            <ul className="mt-4 space-y-3">
              {[
                `${TOOL_COUNT} Rechner, Assistenten und Vergleiche`,
                "Von der Rechtsformwahl bis zur EÜR",
                "Fristenkalender statt PDF im Downloads-Ordner",
                "KI-Co-Pilot Felix für Zwischenfragen",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="tabular">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container max-w-6xl px-4 py-16 md:py-20">
        <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-12 text-center text-primary-foreground shadow-soft md:px-10">
          <div className="pointer-events-none absolute inset-0 bg-dots-light" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Schritt eins ist immer derselbe
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-primary-foreground/75">
              Profil anlegen, Ausgangslage angeben: Danach steht die Reihenfolge für
              deinen Fall.
            </p>
            <div className="mt-8 flex justify-center">
              <Cta label="Jetzt freischalten" onInk />
            </div>
          </div>
        </div>
      </section>
      </main>

      <footer className="border-t border-border">
        <div className="container max-w-3xl space-y-3 px-4 py-8 text-center text-xs leading-relaxed text-muted-foreground">
          <p>
            GründerX bereitet Unterlagen vor, rechnet und erinnert an Fristen. Es
            leistet keine Steuer- oder Rechtsberatung im Sinne des StBerG und des RDG.
            Bearbeitungszeiten von Ämtern, Banken und Finanzämtern sind davon
            unabhängig.
          </p>
          <p>{WERBE_HINWEIS}</p>
          <p className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link to="/impressum" className="underline underline-offset-2 hover:text-foreground">Impressum</Link>
            <Link to="/datenschutz" className="underline underline-offset-2 hover:text-foreground">Datenschutz</Link>
            <Link to="/agb" className="underline underline-offset-2 hover:text-foreground">AGB</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GruendungKomplett;
