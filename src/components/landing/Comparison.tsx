import { Link } from "react-router-dom";
import { Check, X, ArrowRight } from "lucide-react";

const generic = [
  "Allgemeine Textwände ohne Reihenfolge für deinen Fall",
  "Kein Überblick, was du schon erledigt hast und was noch warten kann",
  "Führt dich nicht Feld für Feld durch ELSTER, LUCID oder Gewerbeanmeldung",
  "Keine interaktiven Arbeitsfenster, Rechner oder Kurz-Checks pro Schritt",
  "Kein persönlicher Fristen-Kalender und keine laufende Quellenprüfung",
];

const ours = [
  "81 interaktive Schritt-für-Schritt-Guides: Webseite, App, Shop, Steuern und US-Setup",
  "Klare Reihenfolge nach Alter (12 bis 70) und Vorhaben mit sichtbarem Fortschritt und XP",
  "Arbeitsfenster öffnen sich direkt im Schritt: Rechner, Wizards, Checklisten und Notizen",
  "Ehrliche Anbieter-Vergleiche mit Preisen, Stärken, Schwächen und echten Praxis-Hinweisen",
  "Fristen-Kalender für Steuern, Rechnungs-Generator und Felix im Chat bei Rückfragen",
];

export const Comparison = () => (
  <section className="py-14 md:py-20">
    <div className="container max-w-6xl px-4">
      <div className="mb-8 max-w-2xl md:mb-10">
        <p className="mb-2.5 inline-flex items-center rounded-full border border-border bg-card px-3 py-0.5 text-[12.5px] font-semibold text-primary shadow-sm">
          Der Unterschied im Alltag
        </p>
        <h2 className="text-balance text-2xl font-semibold leading-[1.14] tracking-[-0.02em] text-primary md:text-[2.125rem]">
          Andere erklären nur. Mit GründerX hakst du jeden Schritt ab.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-2xl border border-border bg-secondary/65 p-6 md:p-7">
          <h3 className="text-lg font-semibold text-muted-foreground">Suche, Foren &amp; freie KI-Chats</h3>
          <p className="mb-6 text-sm text-muted-foreground">40 offene Tabs, widersprüchliche Tipps</p>
          <ul className="space-y-3.5">
            {generic.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px] text-muted-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background/80">
                  <X className="h-3.5 w-3.5 text-muted-foreground/70" aria-hidden="true" />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-primary bg-card p-6 shadow-md md:p-7">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-primary">GründerX Lern-Studio &amp; Cockpit</h3>
            <span className="rounded-full bg-brand-green-soft px-2.5 py-0.5 text-xs font-semibold text-brand-green">
              Ein System
            </span>
          </div>
          <p className="mb-6 text-sm font-medium text-muted-foreground">
            Geführte Kurse, direkte Tools und ein Plan für alle von 12 bis 70
          </p>
          <ul className="space-y-3.5">
            {ours.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green text-brand-green-foreground">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
        Und der Steuerberater? Was er kostet, was er übernimmt und wann er die bessere Wahl ist, steht offen im{" "}
        <Link
          to="/vergleich/gruendung-selbst-steuerberater-gruenderx"
          className="inline-flex items-center gap-1 font-semibold text-accent-blue underline-offset-4 hover:underline"
        >
          Vergleich: Gründung selbst, mit Steuerberater oder mit GründerX
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        .
      </p>
    </div>
  </section>
);
