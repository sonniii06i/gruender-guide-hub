import { Link } from "react-router-dom";
import { ArrowRight, CalendarRange } from "lucide-react";

/** Dashboard-Kachel: Verweis auf „Was sich ändert“, bis die Werte 2027 gelten. Ab 01.02.2027 ausgeblendet. */
export const JahreswechselKachel = ({ heute = new Date().toISOString().slice(0, 10) }: { heute?: string }) => {
  if (heute >= "2027-02-01") return null;
  return (
    <Link
      to="/cockpit/aktuell"
      className="press group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:border-foreground/30"
    >
      <CalendarRange className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-muted-foreground">Ab 01.01.2027</p>
        <p className="text-sm font-medium leading-snug text-pretty">Mindestlohn, Minijob, Krankenversicherung, E-Rechnung: was sich für dich ändert</p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
    </Link>
  );
};
