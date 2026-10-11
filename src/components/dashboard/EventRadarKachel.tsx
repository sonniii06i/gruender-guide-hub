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
      className="press group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card hover:border-accent-blue/40 hover:shadow-soft md:p-5"
    >
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-blue">
        <Bell className="h-5 w-5" aria-hidden="true" />
        {neu > 0 && (
          <span className="absolute -right-1.5 -top-1.5 rounded-full bg-danger px-1.5 text-[10px] font-semibold leading-4 text-white tabular">{neu > 99 ? "99+" : neu}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-accent-blue">Event-Radar</p>
        <p className="font-semibold leading-snug">
          {!eingerichtet
            ? "Hackathons, IHK-Gründerabende und KI-Meetups in deiner Nähe: Radar einrichten"
            : neu > 0
              ? `${neu} neue Events ${region ? `in ${BUNDESLAND_NAMES[region]}` : "für dich"} seit deinem letzten Besuch`
              : `Nichts Neues ${region ? `in ${BUNDESLAND_NAMES[region]}` : ""}. Deine nächsten Termine ansehen`}
        </p>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
    </Link>
  );
};
