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
      className="mb-12 flex items-center gap-4 rounded-2xl border border-accent-blue/30 bg-gradient-to-r from-accent-blue/10 via-card to-card p-4 md:p-5 hover:border-accent-blue/60 transition-colors group"
    >
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-blue text-primary-foreground">
        <Bell className="h-5 w-5" />
        {neu > 0 && (
          <span className="absolute -top-1.5 -right-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold px-1.5 leading-4">{neu > 99 ? "99+" : neu}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-blue">Event-Radar</p>
        <p className="font-semibold">
          {!eingerichtet
            ? "Hackathons, IHK-Gründerabende & KI-Meetups in deiner Nähe – Radar einrichten"
            : neu > 0
              ? `${neu} neue Events ${region ? `in ${BUNDESLAND_NAMES[region]}` : "für dich"} seit deinem letzten Besuch`
              : `Nichts Neues ${region ? `in ${BUNDESLAND_NAMES[region]}` : ""} – deine nächsten Termine ansehen`}
        </p>
      </div>
      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
};
