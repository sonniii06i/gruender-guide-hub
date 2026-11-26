import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Flame,
  MessageSquare,
  Scale,
  Trophy,
  Wrench,
  Zap,
} from "lucide-react";
import { SectionHead } from "@/components/marketing/Marketing";
import { ANBIETER_ANZAHL, GUIDE_COUNT, TOOL_COUNT } from "@/data/kennzahlen";

/**
 * Asymmetrisches Studio-Bento-Grid (Rebuild 11/2026):
 * Zeigt konkret die 5 Kern-Bausteine von GründerX mit sichtbarer Mini-UI statt leerer Icon-Boxen.
 */
export const Features = () => (
  <section id="features" className="border-t border-border bg-background py-16 md:py-24">
    <div className="container max-w-6xl px-4">
      <SectionHead
        eyebrow="Wie das Lern-Studio funktioniert"
        title="Kein PDF-Friedhof. Ein echtes Arbeits-Studio."
        lead="Kurse, direkte Eingabe-Fenster, Rechner, Quizze, Anbieter-Vergleich und Felix greifen ineinander, damit du am Ende nicht nur gelesen, sondern umgesetzt hast."
      />

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Kachel 1 (Groß, Deep Navy): Guides + Arbeitsfenster */}
        <Link
          to="/guides"
          className="gx-stage press group relative overflow-hidden rounded-3xl p-6 text-white shadow-lift md:p-8 lg:col-span-7"
        >
          <div className="gx-stage-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 text-xs font-bold text-[#6EE7B7]">
                <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
                {GUIDE_COUNT} Kurse + Arbeitsfenster
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                Schritt lesen, Fenster öffnen, direkt erledigen.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                Statt zehn offener Tabs öffnest du das GewA1-Formular, den Notar-Finder, den Firmennamen-Check oder den
                Amex-US-Startcheck direkt im jeweiligen Kursschritt.
              </p>
            </div>

            {/* Mini-Visual eines Arbeitsfensters */}
            <div className="rounded-2xl border border-white/15 bg-black/25 p-4">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-bold text-white">Schritt 3 · GewA1-Arbeitsfenster</span>
                <span className="rounded-md bg-[#10B981] px-2 py-0.5 text-[11px] font-bold text-[#042016]">
                  PDF exportierbar
                </span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {["Tätigkeit (WZ-Code)", "Betriebsstätte", "Startdatum"].map((f) => (
                  <div key={f} className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs">
                    <span className="block text-[10px] text-white/55">{f}</span>
                    <span className="mt-0.5 inline-flex items-center gap-1 font-semibold text-[#6EE7B7]">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> Gespeichert
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>

        {/* Kachel 2 (Rechts oben, Emerald/Light): Gamification & Quizze */}
        <Link
          to="/quiz"
          className="gx-card gx-card-hover press flex flex-col justify-between gap-5 p-6 md:p-7 lg:col-span-5"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-soft px-3 py-1 text-xs font-bold text-brand-green">
              <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
              Spielerisch dranbleiben
            </span>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-primary md:text-2xl">
              XP, Level, Serien &amp; 12 interaktive Quizze
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Jeder erledigte Schritt und jeder Kurz-Check bringt XP. So siehst du deinen echten Fortschritt vom ersten
              Klick bis zur fertigen Gründung.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-secondary/50 p-4">
            <div className="flex items-center justify-between gap-2 text-xs font-bold">
              <span className="inline-flex items-center gap-1.5 text-primary">
                <Zap className="h-4 w-4 text-brand-green" aria-hidden="true" /> Level 3 · Umsetzer
              </span>
              <span className="inline-flex items-center gap-1 text-amber-600 tabular">
                <Flame className="h-3.5 w-3.5" aria-hidden="true" /> 5 Tage Serie
              </span>
            </div>
            <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-card">
              <div className="h-full w-3/4 rounded-full bg-brand-green" />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground tabular">
              <span>450 / 600 XP</span>
              <span className="font-semibold text-primary">Quiz spielen →</span>
            </div>
          </div>
        </Link>

        {/* Kachel 3 (Unten links): 90 Tools & Rechner */}
        <Link
          to="/tools"
          className="gx-card gx-card-hover press flex flex-col justify-between gap-4 p-6 lg:col-span-4"
        >
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Calculator className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-primary">{TOOL_COUNT} Tools, Rechner &amp; Wizards</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Gewerbe-Check, ELSTER-Begleiter, Rechnungs-Generator (PDF + XRechnung), LUCID, WEEE, Marge-Tracker und
              Steuerkalender.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-blue">
            Alle Tools ansehen <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </Link>

        {/* Kachel 4 (Unten Mitte): Felix KI-Co-Pilot */}
        <Link
          to="/auth?mode=signup"
          className="gx-card gx-card-hover press flex flex-col justify-between gap-4 p-6 lg:col-span-4"
        >
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green text-white">
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-primary">Felix erklärt dir jede Formularzeile</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Direkt aus jedem Kursschritt fragen. Felix antwortet ruhig mit Stand, Paragraf und nächstem Schritt (Software, keine Rechts- oder Steuerberatung).
            </p>
          </div>
          <div className="rounded-xl border border-border bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
            „Muss ich bei 18.000 € Umsatz Umsatzsteuer ausweisen?“ → <strong className="text-foreground">§ 19 UStG erklärt</strong>
          </div>
        </Link>

        {/* Kachel 5 (Unten rechts): 210 Anbieter-Vergleich */}
        <Link
          to="/anbieter"
          className="gx-card gx-card-hover press flex flex-col justify-between gap-4 p-6 lg:col-span-4"
        >
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Scale className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-primary">{ANBIETER_ANZAHL} Anbieter direkt nebeneinander</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Geschäftskonten, Kreditkarten, Buchhaltung, Shop-Systeme und Versicherungen mit klaren Bruttopreisen,
              Stärken, Schwächen und 3er-Direktvergleich.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-blue">
            Anbieter vergleichen <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </div>
  </section>
);
