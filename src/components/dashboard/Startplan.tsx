import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, Loader2, Route, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStartplan } from "@/hooks/useStartplan";
import { useGuideStart } from "@/hooks/useGuideStart";
import { istAutomatisch, istErledigt, phaseVon, PHASE_LABEL, type PlanProfil, type PlanSchritt } from "@/lib/startplan";
import { cn } from "@/lib/utils";

const ART_LABEL: Record<PlanSchritt["art"], string> = { tool: "Tool", guide: "Kurs", vergleich: "Vergleich" };

/**
 * Helle Studyflix-/Lexoffice-Startplan-Karte („Dein nächster Schritt“):
 * Ruhiger, hell getönter Fokus-Kopf mit Fortschrittsbalken und direktem Startknopf,
 * darunter sauber gegliederte Schritt-Zeilen zum Abhaken.
 */
export const Startplan = ({ profil, planAendernLink }: { profil: PlanProfil; planAendernLink?: string }) => {
  const { schritte, signale, laufend, umschalten, naechster, erledigt } = useStartplan(profil);
  const { start, starting } = useGuideStart();
  const phase = phaseVon(profil.founder_stage);
  const pct = Math.round((erledigt / Math.max(1, schritte.length)) * 100);

  const hauptknopf = (s: PlanSchritt) => {
    if (s.guideSlug) {
      const lauf = laufend[s.guideSlug];
      if (lauf) {
        return (
          <Button
            asChild
            size="lg"
            className="press h-11 rounded-xl bg-primary px-5 font-semibold text-white hover:bg-primary/90"
          >
            <Link to={`/playbook/${lauf}`}>
              Kurs fortsetzen <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        );
      }
      const startet = starting === s.guideSlug;
      return (
        <Button
          size="lg"
          onClick={() => start(s.guideSlug!)}
          disabled={startet}
          className="press h-11 rounded-xl bg-primary px-5 font-semibold text-white hover:bg-primary/90"
        >
          {startet ? (
            <>
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden="true" /> Wird gestartet…
            </>
          ) : (
            <>
              Kurs starten <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      );
    }
    return (
      <Button
        asChild
        size="lg"
        className="press h-11 rounded-xl bg-primary px-5 font-semibold text-white hover:bg-primary/90"
      >
        <Link to={s.ziel}>
          {s.art === "vergleich" ? "Vergleich öffnen" : "Jetzt öffnen"}{" "}
          <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
        </Link>
      </Button>
    );
  };

  return (
    <section className="gx-card overflow-hidden" aria-labelledby="startplan-titel" data-tour="fahrplan">
      {/* Ruhiger, heller Fokus-Kopf */}
      <div className="border-b border-border bg-[#F4F7FC] px-5 py-5 md:px-6 md:py-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <p className="inline-flex items-center gap-2 font-semibold text-primary">
            <Route className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" />
            {naechster ? "Dein nächster Schritt" : "Dein Gründungs-Pfad"}
            {phase && <span className="font-medium text-muted-foreground">· {PHASE_LABEL[phase]}</span>}
          </p>
          <p className="font-semibold text-primary tabular">
            {erledigt} von {schritte.length} erledigt ({pct} %)
          </p>
        </div>

        <div
          className="mt-3 flex gap-1.5"
          role="progressbar"
          aria-valuenow={erledigt}
          aria-valuemin={0}
          aria-valuemax={schritte.length}
          aria-label="Fortschritt im Fahrplan"
        >
          {schritte.map((s) => {
            const done = istErledigt(s, signale);
            const active = naechster?.id === s.id;
            return (
              <span
                key={s.id}
                className={cn(
                  "h-2 flex-1 rounded-full transition-colors duration-300",
                  done ? "bg-brand-green" : active ? "bg-primary" : "bg-border",
                )}
              />
            );
          })}
        </div>

        {naechster ? (
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold">
                <span className="rounded-md bg-white px-2 py-0.5 text-primary ring-1 ring-border">{ART_LABEL[naechster.art]}</span>
                <span className="inline-flex items-center gap-0.5 rounded-md bg-brand-green-soft px-2 py-0.5 text-brand-green tabular">
                  <Zap className="h-3 w-3" aria-hidden="true" /> +100 XP
                </span>
              </div>
              <h2 id="startplan-titel" className="text-xl font-bold leading-snug tracking-tight text-primary md:text-[1.4rem]">
                {naechster.titel}
              </h2>
              <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-muted-foreground text-pretty">
                {naechster.warum}
              </p>
            </div>
            <div className="shrink-0">{hauptknopf(naechster)}</div>
          </div>
        ) : (
          <div className="mt-5">
            <h2 id="startplan-titel" className="text-xl font-bold leading-snug text-primary md:text-2xl">
              Alle Schritte dieser Phase sind erledigt.
            </h2>
            <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
              Unten findest du weitere Kurse und Werkzeuge für dein Vorhaben.
              {planAendernLink && (
                <>
                  {" "}
                  Bist du schon weiter,{" "}
                  <Link to={planAendernLink} className="font-semibold text-accent-blue underline">
                    stell deine Phase um
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Schritt-Liste */}
      <ol className="divide-y divide-border p-2 sm:p-3">
        {schritte.map((s, i) => {
          const fertig = istErledigt(s, signale);
          const automatisch = istAutomatisch(s, signale);
          const aktuell = naechster?.id === s.id;
          return (
            <li
              key={s.id}
              className={cn(
                "flex items-stretch rounded-xl transition-colors",
                aktuell && "bg-accent/60",
              )}
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={fertig}
                aria-label={`${s.titel}: ${fertig ? "erledigt" : "als erledigt markieren"}`}
                disabled={automatisch}
                title={automatisch ? "Automatisch erkannt" : undefined}
                onClick={() => umschalten(s.id)}
                className="group flex w-14 shrink-0 items-center justify-center focus-visible:outline-none disabled:cursor-default"
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold tabular transition-all duration-150",
                    fertig
                      ? "border-brand-green bg-brand-green text-white"
                      : aktuell
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-white text-muted-foreground group-hover:border-primary/50",
                  )}
                >
                  {fertig ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> : i + 1}
                </span>
              </button>
              <Link
                to={s.guideSlug && laufend[s.guideSlug] ? `/playbook/${laufend[s.guideSlug]}` : s.ziel}
                className="group flex min-w-0 flex-1 items-center gap-3 py-3.5 pr-3 focus-visible:outline-none"
              >
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block text-sm font-semibold leading-snug",
                      fertig ? "text-muted-foreground line-through decoration-foreground/25" : "text-foreground group-hover:text-primary",
                    )}
                  >
                    {s.titel}
                  </span>
                  {!fertig && (
                    <span className="mt-0.5 block text-xs leading-snug text-muted-foreground line-clamp-1">
                      {s.warum}
                    </span>
                  )}
                </span>
                <span className="hidden shrink-0 rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground sm:inline">
                  {ART_LABEL[s.art]}
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/70 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-secondary/40 px-5 py-3 text-xs text-muted-foreground">
        <span>Deine Fortschritte gelten auf Handy, Web &amp; iOS-App.</span>
        {planAendernLink && (
          <Link to={planAendernLink} className="font-semibold text-accent-blue hover:underline">
            Phase &amp; Ziel ändern →
          </Link>
        )}
      </div>
    </section>
  );
};
