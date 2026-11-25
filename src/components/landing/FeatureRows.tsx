import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { ScreenshotFrame, SectionHead } from "@/components/marketing/Marketing";
import { SCREENS, type ScreenKey } from "@/data/screenshots";
import { cn } from "@/lib/utils";

const ZEILEN: {
  eyebrow: string;
  titel: string;
  text: string;
  punkte: string[];
  bild: ScreenKey;
  to: string;
  cta: string;
}[] = [
  {
    eyebrow: "Fragebogen",
    titel: "Der Fragebogen fürs Finanzamt, Feld für Feld erklärt.",
    text: "Alle Teilseiten des ELSTER-Fragebogens in der Reihenfolge, in der ELSTER sie abfragt. Bei jeder verbindlichen Entscheidung (wie der Kleinunternehmerregelung) siehst du sofort, was die Option für dich bedeutet.",
    punkte: [
      "Kleinunternehmerregelung verständlich gegenübergestellt",
      "EÜR oder Bilanz, Soll- oder Ist-Versteuerung",
      "USt-IdNr direkt im selben Durchgang beantragen",
    ],
    bild: "fse",
    to: "/tools/fse-wizard",
    cta: "Fragebogen-Begleiter ansehen",
  },
  {
    eyebrow: "Fristen",
    titel: "Kein Steuertermin mehr, der dich überrascht.",
    text: "Dein persönlicher Kalender für die nächsten 12 Monate: Voranmeldungen, Vorauszahlungen und Jahreserklärungen. Wochenenden und Feiertage sind schon eingerechnet.",
    punkte: [
      "Termine passend zu deiner Rechtsform und deinem Bundesland",
      "Ein Klick in deinen Kalender, mit Erinnerung",
      "Hinweise zu Neugründer-Regeln und Schonfrist",
    ],
    bild: "steuerkalender",
    to: "/tools/steuerkalender",
    cta: "Steuerkalender ansehen",
  },
  {
    eyebrow: "Marktplatz-Pflichten",
    titel: "LUCID, WEEE und GPSR in der richtigen Reihenfolge.",
    text: "Prüfe Schritt für Schritt, welche Registrierungen für deine Produkte gelten, bevor du online verkaufst. Dazu siehst du die passenden Anbieter für die Verpackungslizenz im Vergleich.",
    punkte: [
      "Verpackungspflicht in fünf kurzen Schritten geprüft",
      "Anbieter-Vergleich nach deinen geschätzten Mengen",
      "WEEE-Check für Elektronik und GPSR-Checkliste",
    ],
    bild: "lucid",
    to: "/tools/lucid-wizard",
    cta: "LUCID-Wizard ansehen",
  },
  {
    eyebrow: "Rechnungen",
    titel: "Rechnungen, die Marken und Kunden ohne Rückfrage annehmen.",
    text: "Der Rechnungs-Generator prüft live alle Pflichtangaben nach § 14 UStG und kennt die wichtigsten Sonderfälle: Kleinunternehmer, Reverse Charge und innergemeinschaftliche Lieferung.",
    punkte: [
      "Live-Check aller gesetzlichen Pflichtangaben",
      "Vier Umsatzsteuer-Modi für DE, EU und Drittland",
      "Export als PDF und E-Rechnung",
    ],
    bild: "rechnung",
    to: "/tools/rechnungs-generator",
    cta: "Rechnungs-Generator ansehen",
  },
];

export const FeatureRows = () => (
  <section className="py-14 md:py-20">
    <div className="container max-w-6xl px-4">
      <SectionHead
        eyebrow="Direkt im Arbeitsfenster"
        title={
          <>
            Kein Rätselraten im Formular.
            <br className="hidden md:block" /> Einfach Schritt für Schritt erledigen.
          </>
        }
        lead="So sieht die Arbeit in GründerX aus: echte Oberflächen aus dem aktuellen Cockpit, direkt aus deinen Guides heraus zu öffnen."
      />
      <div className="space-y-12 md:space-y-20">
        {ZEILEN.map((z, i) => (
          <article key={z.titel} className="grid items-center gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:gap-14">
            <div className={cn(i % 2 === 1 && "lg:order-last")}>
              <p className="mb-2 inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-primary">
                {z.eyebrow}
              </p>
              <h3 className="text-balance text-xl font-semibold leading-[1.2] tracking-[-0.015em] text-primary md:text-[1.625rem]">
                {z.titel}
              </h3>
              <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-[17px]">
                {z.text}
              </p>
              <ul className="mt-5 space-y-2.5">
                {z.punkte.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[15px] text-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green">
                      <Check className="h-3 w-3" strokeWidth={2.75} aria-hidden="true" />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={z.to}
                className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent-blue underline-offset-4 hover:underline"
              >
                {z.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ScreenshotFrame shot={SCREENS[z.bild]} />
          </article>
        ))}
      </div>
    </div>
  </section>
);
