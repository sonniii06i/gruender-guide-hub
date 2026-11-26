import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import { SectionHead } from "@/components/marketing/Marketing";
import { ANBIETER_ANZAHL, GUIDE_COUNT, TOOL_COUNT } from "@/data/kennzahlen";

const ROWS = [
  {
    thema: "Reihenfolge & Aktualität",
    ohne: "14 widersprüchliche YouTube-Videos, veraltete Grenzen (22.000 € statt 25.000 €)",
    mit: "Aktuelle Regeln 2026 mit Stand & Paragraf, klar sortiert: erst das, dann das",
  },
  {
    thema: "Umsetzung statt Theorie",
    ohne: "Lange Blogtexte ohne Werkzeug, du hängst trotzdem im Formular fest",
    mit: `${GUIDE_COUNT} Kurse zum Durchklicken mit direkten Arbeitsfenstern & ${TOOL_COUNT} Tools`,
  },
  {
    thema: "Handy & Alltag",
    ohne: "Unlesbare PDFs und Tabellen, die auf dem Smartphone nicht bedienbar sind",
    mit: "Handy-first gebaut: Check-Karten, Quizze, XP-Fortschritt und eigene iOS-App",
  },
  {
    thema: "Pflichten & Fristen",
    ohne: "LUCID, WEEE, Transparenzregister oder ELSTER-Frist erst nach Mahnung entdeckt",
    mit: "Fristen-Kalender, Schwellen-Checks und klare Vorab-Warnungen vor dem Start",
  },
  {
    thema: "Anbieter-Auswahl",
    ohne: "Affiliate-Rankings ohne echte Schwächen oder Nebenkosten",
    mit: `${ANBIETER_ANZAHL} Anbieter im 3er-Direktvergleich mit ehrlichen Stärken, Schwächen und Bruttopreisen`,
  },
];

export const Comparison = () => (
  <section className="border-t border-border bg-background py-16 md:py-24">
    <div className="container max-w-6xl px-4">
      <SectionHead
        eyebrow="Der Unterschied im Alltag"
        title="Zusammengegooglet vs. GründerX."
        lead="Warum die meisten nicht an fehlender Motivation scheitern, sondern an der falschen Reihenfolge."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Links: Ohne Struktur */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-card md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ohne System</p>
          <h3 className="mt-1.5 text-xl font-bold text-foreground">YouTube, Foren &amp; offene Tabs</h3>
          <ul className="mt-6 space-y-4">
            {ROWS.map((r) => (
              <li key={r.thema} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-danger-soft text-danger">
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.thema}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{r.ohne}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Rechts: Helle GründerX-Hervorhebung im Lexoffice-/Studyflix-Stil */}
        <div className="rounded-2xl border-2 border-primary bg-white p-6 shadow-soft md:p-8">
          <span className="inline-flex rounded-md bg-brand-green-soft px-2.5 py-0.5 text-xs font-semibold text-brand-green">
            Mit GründerX
          </span>
          <h3 className="mt-2 text-xl font-bold text-primary">Strukturierte Kurse &amp; Gründungs-Cockpit</h3>
          <ul className="mt-6 space-y-4">
            {ROWS.map((r) => (
              <li key={r.thema} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary">{r.thema}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{r.mit}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Unsicher, wann ein Steuerberater sinnvoller ist?{" "}
        <Link
          to="/vergleich/gruendung-selbst-steuerberater-gruenderx"
          className="inline-flex items-center gap-1 font-semibold text-accent-blue underline underline-offset-4 hover:text-primary"
        >
          Zum Vergleich: Selbst, Steuerberater oder GründerX
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </p>
    </div>
  </section>
);
