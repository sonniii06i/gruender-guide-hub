import { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { startGuestCheckout } from "@/utils/guestCheckout";
import { ArrowRight, Check, CalendarClock, FileSpreadsheet, Landmark, Wallet } from "lucide-react";

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
 * DIE ZAHL 78 IST GEZÄHLT, NICHT GESCHÄTZT. Sie stammt aus den auf /tools
 * verlinkten Werkzeugen (Stand 07.08.2026). Wer Werkzeuge entfernt oder
 * hinzufügt, zählt bitte neu — eine belegbare Zahl ist das Einzige, was diese
 * Seite von einer beliebigen "Alles-in-einem"-Behauptung unterscheidet.
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

  const Cta = ({ label = "Zugang freischalten" }: { label?: string }) => (
    <div className="flex flex-col items-center gap-2">
      <Button
        size="lg"
        className="rounded-full h-14 px-10 text-base font-semibold shadow-glow"
        onClick={() => {
          setCheckoutError(false);
          startGuestCheckout("gruenderx").catch(() => setCheckoutError(true));
        }}
      >
        {label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <span className="text-xs text-muted-foreground">64,99 € / Monat · monatlich kündbar</span>
      {checkoutError && (
        <span className="text-xs text-destructive">
          Der Checkout ließ sich nicht öffnen. Bitte noch einmal versuchen.
        </span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Vom Gewerbeschein bis zur Umsatzsteuer-Voranmeldung | GründerX"
        description="78 Werkzeuge für die Unternehmensgründung: Rechtsform, Gewerbeanmeldung, Geschäftskonto, Buchhaltung, Umsatzsteuer-Voranmeldung und EÜR — in der Reihenfolge, in der sie gebraucht werden."
        path="/gruendung-komplett"
        noindex
      />

      {/* Hero -- wiederholt die Einblendung der Anzeige woertlich. */}
      <section className="relative bg-hero pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60" aria-hidden="true">
          <div className="absolute top-16 left-1/4 h-96 w-96 rounded-full bg-accent-blue/20 blur-3xl" />
          <div className="absolute top-40 right-1/4 h-96 w-96 rounded-full bg-brand-green/15 blur-3xl" />
        </div>

        <div className="container max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green-soft px-4 py-1.5 text-sm font-semibold text-brand-green">
            Für Gründerinnen und Gründer in Deutschland
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.12] tracking-tight text-balance">
            <span className="block">78 Werkzeuge zwischen</span>
            <span className="block text-accent-blue">Gewerbeschein und Steuererklärung.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground text-balance">
            Gewerbe anmelden ist der kleinste Teil. Danach kommen{" "}
            <strong className="text-foreground">
              Rechtsform, Geschäftskonto, Buchhaltung, Umsatzsteuer-Voranmeldung, EÜR
            </strong>{" "}
            — und die Fristen dazu.
          </p>

          <div className="mt-9 flex justify-center">
            <Cta />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            64,99 € / Monat · monatlich kündbar · Zahlung zuerst, danach legst du dein Konto an
          </p>
        </div>
      </section>

      {/* Die vier Etappen -- Chronologie einer echten Gruendung. */}
      <section className="container max-w-6xl py-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">
          In der Reihenfolge, in der es tatsächlich passiert
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ETAPPEN.map((e) => (
            <Card key={e.titel} className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/10">
                  <e.icon className="h-5 w-5 text-accent-blue" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{e.titel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Die These, ausformuliert. */}
      <section className="border-y border-border bg-muted/30">
        <div className="container max-w-3xl py-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center text-balance">
            Jeder Schritt ist gut dokumentiert. Nur an achtzehn verschiedenen Stellen.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Die Gewerbeanmeldung erklärt die Stadt. Die Rechtsform erklärt die IHK. Die
            Umsatzsteuer erklärt das Finanzamt, die Buchhaltung der Softwareanbieter,
            und die Fristen stehen in einem PDF, das man einmal gelesen und danach nie
            wieder geöffnet hat.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Keine dieser Quellen ist falsch. Nur sagt keine davon, was als Nächstes
            dran ist — und genau daran scheitert es meistens. Nicht am einzelnen
            Schritt, sondern an der Reihenfolge.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "78 Rechner, Assistenten und Vergleiche",
              "Von der Rechtsformwahl bis zur EÜR",
              "Fristenkalender statt PDF im Downloads-Ordner",
              "KI-Co-Pilot Felix für Zwischenfragen",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container max-w-2xl py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Schritt eins ist immer derselbe
        </h2>
        <p className="mt-4 text-muted-foreground">
          Profil anlegen, Ausgangslage angeben — danach steht die Reihenfolge für
          deinen Fall.
        </p>
        <div className="mt-8 flex justify-center">
          <Cta label="Jetzt freischalten" />
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container max-w-3xl py-8 text-center text-xs text-muted-foreground space-y-3">
          <p>
            GründerX bereitet Unterlagen vor, rechnet und erinnert an Fristen. Es
            leistet keine Steuer- oder Rechtsberatung im Sinne des StBerG und des RDG.
            Bearbeitungszeiten von Ämtern, Banken und Finanzämtern sind davon
            unabhängig.
          </p>
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
