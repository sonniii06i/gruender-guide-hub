import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ScreenshotFrame, SectionHead } from "@/components/marketing/Marketing";
import { SCREENS, type ScreenKey } from "@/data/screenshots";
import { cn } from "@/lib/utils";

// Abwechselnde Funktions-Zeilen mit echten Cockpit-Screenshots (ProfitPath-Aufbau, 25.10.2026).
// Ersetzt auf der Startseite die alte Produkt-Galerie (ProductPreview) und den Felix-Block (Assistant).
const ZEILEN: { eyebrow: string; titel: string; text: string; punkte: string[]; bild: ScreenKey; to: string; cta: string }[] = [
  {
    eyebrow: "Fragebogen",
    titel: "Der Fragebogen fürs Finanzamt, Feld für Feld erklärt.",
    text: "Alle Teilseiten des ELSTER-Fragebogens in der Reihenfolge, in der ELSTER sie abfragt – mit Erklärung je Feld und Empfehlungen für die verbindlichen Entscheidungen.",
    punkte: ["Kleinunternehmer ja oder nein", "EÜR oder Bilanz, Soll oder Ist", "USt-IdNr gleich mit beantragen"],
    bild: "fse",
    to: "/tools/fse-wizard",
    cta: "Fragebogen-Begleiter ansehen",
  },
  {
    eyebrow: "Fristen",
    titel: "Kein Steuertermin mehr, der dich überrascht.",
    text: "Dein persönlicher Kalender für die nächsten 12 Monate: Voranmeldungen, Vorauszahlungen, Jahreserklärungen – Wochenenden und Feiertage sind schon eingerechnet.",
    punkte: ["Termine passend zu deiner Rechtsform", "Ein Klick in deinen Kalender, mit Erinnerung", "Hinweise zu Neugründer-Regeln und Schonfrist"],
    bild: "steuerkalender",
    to: "/tools/steuerkalender",
    cta: "Steuerkalender ansehen",
  },
  {
    eyebrow: "Marktplatz-Pflichten",
    titel: "LUCID, WEEE und Co. – bevor ein Listing gesperrt wird.",
    text: "Prüfe Schritt für Schritt, welche Registrierungen für deine Produkte gelten, und vergleiche die Anbieter für die Verpackungslizenz.",
    punkte: ["Verpackungspflicht in fünf Schritten geprüft", "Anbieter-Empfehlung nach deinen Mengen", "WEEE-Check für Elektrogeräte"],
    bild: "lucid",
    to: "/tools/lucid-wizard",
    cta: "LUCID-Wizard ansehen",
  },
  {
    eyebrow: "Rechnungen",
    titel: "Rechnungen, die Marken und Kunden ohne Rückfrage annehmen.",
    text: "Der Rechnungs-Generator prüft live alle Pflichtangaben nach § 14 UStG und kennt die Sonderfälle: Kleinunternehmer, Reverse Charge, innergemeinschaftliche Lieferung.",
    punkte: ["Live-Check der Pflichtangaben", "Vier Umsatzsteuer-Modi", "PDF und E-Rechnung"],
    bild: "rechnung",
    to: "/tools/rechnungs-generator",
    cta: "Rechnungs-Generator ansehen",
  },
];

export const FeatureRows = () => (
  <section className="py-16 md:py-32">
    <div className="container max-w-6xl px-4">
      <SectionHead
        eyebrow="Im Cockpit"
        title={<>Weniger Behördendeutsch.<br className="hidden md:block" /> Mehr erledigt.</>}
        lead="So sieht die Arbeit in GründerX aus – echte Ansichten, keine Mockups."
      />
      <div className="space-y-16 md:space-y-32">
        {ZEILEN.map((z, i) => (
          <article key={z.titel} className="grid items-center gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:gap-16">
            <div className={cn(i % 2 === 1 && "lg:order-last")}>
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-blue">{z.eyebrow}</p>
              <h3 className="text-balance text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.035em] text-primary md:text-[2.25rem]">{z.titel}</h3>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{z.text}</p>
              <ul className="mt-6 hidden space-y-2.5 sm:block">
                {z.punkte.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link to={z.to} className="mt-7 inline-flex items-center gap-1.5 font-semibold text-accent-blue underline-offset-4 hover:underline">
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
