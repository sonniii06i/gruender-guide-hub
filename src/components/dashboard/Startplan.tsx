import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, Loader2, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStartplan } from "@/hooks/useStartplan";
import { useGuideStart } from "@/hooks/useGuideStart";
import { istAutomatisch, istErledigt, phaseVon, PHASE_LABEL, type PlanProfil, type PlanSchritt } from "@/lib/startplan";
import { cn } from "@/lib/utils";

const ART_LABEL: Record<PlanSchritt["art"], string> = { tool: "Tool", guide: "Guide", vergleich: "Vergleich" };

/**
 * „Dein Fahrplan“: oben der nächste offene Schritt mit einem Hauptknopf, darunter
 * alle Schritte der Phase zum Abhaken. Ersetzt die frühere Einsteiger-Kachel, die
 * allen dieselben vier Tools zeigte.
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
          <Button asChild>
            <Link to={`/playbook/${lauf}`}>Guide fortsetzen <ArrowRight aria-hidden="true" /></Link>
          </Button>
        );
      }
      const startet = starting === s.guideSlug;
      return (
        <Button onClick={() => start(s.guideSlug!)} disabled={startet}>
          {startet ? <><Loader2 className="animate-spin" aria-hidden="true" /> Wird gestartet…</> : <>Guide starten <ArrowRight aria-hidden="true" /></>}
        </Button>
      );
    }
    return (
      <Button asChild>
        <Link to={s.ziel}>{s.art === "vergleich" ? "Vergleich öffnen" : "Jetzt öffnen"} <ArrowRight aria-hidden="true" /></Link>
      </Button>
    );
  };

  return (
    <section className="rounded-lg border border-border bg-card" aria-labelledby="startplan-titel">
      <div className="px-5 pb-5 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <p className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
            <Route className="h-4 w-4" aria-hidden="true" />
            {naechster ? "Dein nächster Schritt" : "Dein Fahrplan"}
            {phase && <span className="text-muted-foreground/80">· Phase: {PHASE_LABEL[phase]}</span>}
          </p>
          <p className="text-[13px] text-muted-foreground tabular">{erledigt} von {schritte.length} erledigt</p>
        </div>
        <div
          className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={erledigt}
          aria-valuemin={0}
          aria-valuemax={schritte.length}
          aria-label="Fortschritt im Fahrplan"
        >
          <div className="h-full rounded-full bg-brand-green transition-[width] duration-300 ease-out" style={{ width: `${pct}%` }} />
        </div>

        {naechster ? (
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h2 id="startplan-titel" className="text-lg font-semibold leading-snug tracking-[-0.01em] text-balance md:text-xl">{naechster.titel}</h2>
              <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-muted-foreground text-pretty">{naechster.warum}</p>
            </div>
            <div className="shrink-0">{hauptknopf(naechster)}</div>
          </div>
        ) : (
          <div className="mt-5">
            <h2 id="startplan-titel" className="text-lg font-semibold leading-snug md:text-xl">Alle Schritte dieser Phase sind erledigt.</h2>
            <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
              Unten findest du Tools und Guides, die zu deinem Vorhaben passen.
              {planAendernLink && <> Bist du schon weiter, <Link to={planAendernLink} className="font-medium text-accent-blue hover:underline">stell deine Phase um</Link>, dann bekommst du den nächsten Fahrplan.</>}
            </p>
          </div>
        )}
      </div>

      <ol className="divide-y divide-border border-t border-border">
        {schritte.map((s, i) => {
          const fertig = istErledigt(s, signale);
          const automatisch = istAutomatisch(s, signale);
          const aktuell = naechster?.id === s.id;
          return (
            <li key={s.id} className={cn("flex items-stretch", aktuell && "bg-secondary/50")}>
              <button
                type="button"
                role="checkbox"
                aria-checked={fertig}
                aria-label={`${s.titel}: ${fertig ? "erledigt" : "als erledigt markieren"}`}
                disabled={automatisch}
                title={automatisch ? "Automatisch erkannt" : undefined}
                onClick={() => umschalten(s.id)}
                className="group flex w-12 shrink-0 items-center justify-center focus-visible:outline-none disabled:cursor-default"
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded border text-[11px] font-semibold tabular transition-colors duration-150",
                    fertig
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-foreground/25 bg-card text-muted-foreground group-hover:border-foreground/50 group-focus-visible:ring-2 group-focus-visible:ring-ring/40",
                  )}
                >
                  {fertig ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" /> : i + 1}
                </span>
              </button>
              <Link
                to={s.guideSlug && laufend[s.guideSlug] ? `/playbook/${laufend[s.guideSlug]}` : s.ziel}
                className="group flex min-w-0 flex-1 items-center gap-3 py-3 pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40"
              >
                <span className="min-w-0 flex-1">
                  <span className={cn("block text-sm font-medium leading-snug", fertig && "text-muted-foreground line-through decoration-foreground/25")}>{s.titel}</span>
                  {!fertig && !aktuell && <span className="mt-0.5 text-[13px] leading-snug text-muted-foreground line-clamp-2">{s.warum}</span>}
                </span>
                <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">{ART_LABEL[s.art]}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/70 group-hover:text-foreground" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ol>
      <p className="border-t border-border px-5 py-2.5 text-xs text-muted-foreground">
        Haken merkt sich dieses Gerät.
        {planAendernLink && <> Passt die Phase nicht mehr? <Link to={planAendernLink} className="font-medium text-accent-blue hover:underline">Angaben ändern</Link></>}
      </p>
    </section>
  );
};
