import { Link } from "react-router-dom";
import { ArrowRight, CalendarRange } from "lucide-react";

/** Dashboard-Kachel: Verweis auf „Was sich ändert“, bis die Werte 2027 gelten. Ab 01.02.2027 ausgeblendet. */
export const JahreswechselKachel = ({ heute = new Date().toISOString().slice(0, 10) }: { heute?: string }) => {
  if (heute >= "2027-02-01") return null;
  return (
    <Link
      to="/cockpit/aktuell"
      className="press group flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-card transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EDF4FF] text-[#1E40AF]">
        <CalendarRange className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-accent-blue">Ab 01.01.2027</p>
        <p className="mt-0.5 text-[13px] font-semibold leading-snug text-foreground text-pretty">
          Mindestlohn, GKV &amp; E-Rechnung: was sich für dich ändert
        </p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
    </Link>
  );
};
