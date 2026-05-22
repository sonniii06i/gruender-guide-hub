import { Info } from "lucide-react";
import { NumberField } from "@/components/ui/number-field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Gewerbesteuer-Hebesätze für DACH-Großstädte (Stand 2026, gerundet).
// Quelle: jeweilige Kommune (Hebesatz-Satzungen). Update wenn Reform.
const CITY_HEBESAETZE: Array<{ city: string; pct: number; note?: string }> = [
  { city: "Berlin", pct: 410 },
  { city: "Hamburg", pct: 470 },
  { city: "München", pct: 490 },
  { city: "Köln", pct: 475 },
  { city: "Frankfurt a. M.", pct: 460 },
  { city: "Stuttgart", pct: 420 },
  { city: "Düsseldorf", pct: 440 },
  { city: "Leipzig", pct: 460 },
  { city: "Dortmund", pct: 485 },
  { city: "Bremen", pct: 460 },
  { city: "Hannover", pct: 480 },
  { city: "Nürnberg", pct: 447 },
  { city: "Mittelstadt (Beispiel)", pct: 400, note: "typisch" },
  { city: "Kleinstadt / ländlich", pct: 360, note: "350-380" },
];

type Props = {
  value: number;
  onChange: (n: number) => void;
  className?: string;
  min?: number;
  max?: number;
};

/**
 * NumberField für GewSt-Hebesatz mit Info-Icon-Popover, das Großstadt-
 * Presets als Click-to-Fill anbietet und den aktuell entsprechenden
 * Stadt-Match anzeigt.
 */
export const HebesatzPicker = ({ value, onChange, className, min = 200, max = 900 }: Props) => {
  // Aktueller Wert → passende Stadt (±2 % Toleranz für gerundete Anzeige)
  const matchingCity = CITY_HEBESAETZE.find((c) => Math.abs(c.pct - value) <= 2);

  return (
    <div className={className}>
      <div className="flex items-center gap-1.5">
        <div className="flex-1">
          <NumberField value={value} onChange={onChange} min={min} max={max} className="h-9" />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Gewerbesteuer-Hebesatz nach Stadt auswählen"
              className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition"
            >
              <Info className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-3" align="end">
            <div className="text-xs font-semibold mb-2">Hebesatz nach Stadt übernehmen</div>
            <div className="max-h-60 overflow-y-auto -mx-1">
              {CITY_HEBESAETZE.map((c) => {
                const active = Math.abs(c.pct - value) <= 2;
                return (
                  <button
                    key={c.city}
                    type="button"
                    onClick={() => onChange(c.pct)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition ${
                      active ? "bg-accent-blue/15 text-accent-blue font-semibold" : "hover:bg-secondary/40"
                    }`}
                  >
                    <span>
                      {c.city}
                      {c.note && <span className="text-[10px] text-muted-foreground ml-1">({c.note})</span>}
                    </span>
                    <span className="font-mono tabular-nums">{c.pct} %</span>
                  </button>
                );
              })}
            </div>
            <div className="text-[10px] text-muted-foreground mt-2 pt-2 border-t border-border">
              Min 200 %, Max 900 %. Bundesweit gültiger Mindesthebesatz seit 2004: 200 %.
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="text-[10px] text-muted-foreground mt-1">
        Aktuell: <strong className="text-foreground">{value} %</strong>
        {matchingCity && <span> (≈ {matchingCity.city})</span>}
      </div>
    </div>
  );
};
