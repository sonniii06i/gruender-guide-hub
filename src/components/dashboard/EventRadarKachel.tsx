import { Link } from "react-router-dom";
import { ArrowRight, Bell } from "lucide-react";
import { useRadarZaehler } from "@/lib/eventRadar";
import { BUNDESLAND_NAMES } from "@/data/foerderprogramme";

/** Dashboard-Kachel: neue Events im persönlichen Radar oder Einladung zum Einrichten. */
export const EventRadarKachel = () => {
  const { neu, eingerichtet, region } = useRadarZaehler();
  return (
    <Link
      to="/cockpit/event-radar"
      className="press group flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-card transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md"
    >
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FDF6E7] text-[#B45309]">
        <Bell className="h-4 w-4" aria-hidden="true" />
        {neu > 0 && (
          <span className="absolute -right-1 -top-1 rounded-full bg-danger px-1.5 text-[10px] font-bold leading-4 text-white tabular">
            {neu > 99 ? "99+" : neu}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Event-Radar</p>
        <p className="mt-0.5 text-[13px] font-semibold leading-snug text-foreground text-pretty">
          {!eingerichtet
            ? "Hackathons & Meetups in deiner Nähe aktivieren"
            : neu > 0
              ? `${neu} neue Events ${region ? `in ${BUNDESLAND_NAMES[region]}` : "für dich"}`
              : `Deine nächsten Termine${region ? ` in ${BUNDESLAND_NAMES[region]}` : ""} ansehen`}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
    </Link>
  );
};
