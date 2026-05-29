import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useTrackToolEvent } from "@/hooks/useTrackToolEvent";
import {
  Search,
  Loader2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Recycle,
  Building2,
  Hash,
  AlertCircle,
} from "lucide-react";

interface MarkeEntry {
  weeeNr: string;
  registrierungsnummer: string;
  marke: string;
  herstellername: string;
  kategorie: string;
  geraeteart: string;
  veroeffentlichung: string;
  markaustritt: string;
  aktiv: boolean;
}

interface WeeeResult {
  query: string;
  searchedBy: "marke" | "herstellername";
  total: number;
  moreFound: boolean;
  page: number;
  returned: number;
  distinctWeee: number;
  distinctHersteller: number;
  aktivCount: number;
  entries: MarkeEntry[];
  source: string;
  verzeichnisUrl: string;
}

/** Gruppe = eine Registrierung (WEEE-Nr) × Marke, mit allen ihren Gerätearten. */
interface Group {
  key: string;
  weeeNr: string;
  registrierungsnummer: string;
  marke: string;
  herstellername: string;
  aktiv: boolean;
  markaustritt: string;
  veroeffentlichung: string;
  arten: { kategorie: string; geraeteart: string }[];
}

function groupEntries(entries: MarkeEntry[]): Group[] {
  const map = new Map<string, Group>();
  for (const e of entries) {
    const key = `${e.registrierungsnummer}__${e.marke}`;
    let g = map.get(key);
    if (!g) {
      g = {
        key,
        weeeNr: e.weeeNr,
        registrierungsnummer: e.registrierungsnummer,
        marke: e.marke,
        herstellername: e.herstellername,
        aktiv: e.aktiv,
        markaustritt: e.markaustritt,
        veroeffentlichung: e.veroeffentlichung,
        arten: [],
      };
      map.set(key, g);
    }
    if (e.geraeteart && !g.arten.some((a) => a.geraeteart === e.geraeteart)) {
      g.arten.push({ kategorie: e.kategorie, geraeteart: e.geraeteart });
    }
  }
  return Array.from(map.values());
}

function fmtDate(d: string): string {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  return day ? `${day}.${m}.${y}` : d;
}

const WeeeCheck = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WeeeResult | null>(null);
  const [onlyActive, setOnlyActive] = useState(false);
  const track = useTrackToolEvent("weee-check");

  const runCheck = async () => {
    const q = query.trim();
    if (q.length < 2) {
      setError("Bitte mindestens 2 Zeichen eingeben.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    track("search", { query: q });
    try {
      const { data, error: fnError } = await supabase.functions.invoke("check-weee", {
        body: { marke: q },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setResult(data as WeeeResult);
    } catch (e: any) {
      setError(e?.message || "Abfrage fehlgeschlagen. Bitte später nochmal versuchen.");
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") runCheck();
  };

  const groups = useMemo(() => (result ? groupEntries(result.entries) : []), [result]);
  const visibleGroups = useMemo(
    () => (onlyActive ? groups.filter((g) => g.aktiv) : groups),
    [groups, onlyActive],
  );

  return (
    <CockpitShell
      eyebrow="WEEE / EAR-Register-Check"
      title="WEEE-Registrierung prüfen"
      subtitle="Gib eine Marke ein und sieh, welche Einträge im offiziellen EAR-Verzeichnis der stiftung ear dazu registriert sind — mit WEEE-Reg.-Nr., Hersteller bzw. Bevollmächtigtem, Kategorie und Geräteart. Live aus der offiziellen Schnittstelle, kein Scraping."
    >
      {/* Eingabe */}
      <div className="rounded-xl border border-border bg-card p-4 md:p-5">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Marke
        </label>
        <div className="mt-2 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKey}
              placeholder="z. B. Anker, Bosch, deine Marke …"
              className="pl-9"
            />
          </div>
          <button
            onClick={runCheck}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-accent-blue px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Prüfen
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Enthält-Suche (Treffer enthalten den Begriff). Mit <code>*</code> kannst du selbst Platzhalter
          setzen, z. B. <code>Bosch*</code> für „beginnt mit". Nur Wortmarken, keine Bildmarken.
        </p>
        {error && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
      </div>

      {/* Ergebnis */}
      {result && (
        <div className="mt-5 space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SummaryCard icon={<Hash className="h-4 w-4" />} label="Treffer gesamt" value={result.total} />
            <SummaryCard
              icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
              label="davon aktiv"
              value={result.aktivCount}
            />
            <SummaryCard icon={<Recycle className="h-4 w-4" />} label="WEEE-Nummern" value={result.distinctWeee} />
            <SummaryCard
              icon={<Building2 className="h-4 w-4" />}
              label="Hersteller/Bevollm."
              value={result.distinctHersteller}
            />
          </div>

          {result.total === 0 ? (
            <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
              Keine Einträge im EAR-Verzeichnis zu „{result.query}" gefunden. Das heißt nicht zwingend, dass
              keine Registrierung existiert — prüfe Schreibweise/Variationen oder suche direkt im{" "}
              <a href={result.verzeichnisUrl} target="_blank" rel="noreferrer" className="text-accent-blue underline">
                offiziellen Verzeichnis
              </a>
              .
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="text-sm text-muted-foreground">
                  {visibleGroups.length} {visibleGroups.length === 1 ? "Eintrag" : "Einträge"}
                  {result.moreFound && " (weitere vorhanden — Suche verfeinern)"}
                </div>
                <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyActive}
                    onChange={(e) => setOnlyActive(e.target.checked)}
                    className="rounded border-border"
                  />
                  Nur aktive Registrierungen
                </label>
              </div>

              <div className="space-y-3">
                {visibleGroups.map((g) => (
                  <div
                    key={g.key}
                    className={`rounded-xl border bg-card p-4 ${
                      g.aktiv ? "border-border" : "border-border/60 opacity-80"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold">{g.marke}</span>
                          {g.aktiv ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600">
                              <CheckCircle2 className="h-3 w-3" /> aktiv
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                              <XCircle className="h-3 w-3" /> ausgetreten {g.markaustritt && `· ${fmtDate(g.markaustritt)}`}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Building2 className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{g.herstellername}</span>
                        </div>
                      </div>
                      <a
                        href={`https://www.ear-system.de/ear-verzeichnis/hersteller`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-mono hover:bg-muted shrink-0"
                        title="Im offiziellen EAR-Verzeichnis nachschlagen"
                      >
                        {g.weeeNr}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    {/* Gerätearten */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {g.arten.map((a, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs text-foreground/80"
                          title={a.kategorie}
                        >
                          {a.geraeteart}
                        </span>
                      ))}
                    </div>
                    {g.veroeffentlichung && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        Veröffentlicht: {fmtDate(g.veroeffentlichung)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="text-xs text-muted-foreground pt-1">
            Quelle: {result.source} ·{" "}
            <a href={result.verzeichnisUrl} target="_blank" rel="noreferrer" className="text-accent-blue underline">
              offizielles EAR-Verzeichnis
            </a>
            . Keine Rechtsberatung — Registrierungspflicht klärt im Zweifel die stiftung ear.
          </div>
        </div>
      )}
    </CockpitShell>
  );
};

const SummaryCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="rounded-xl border border-border bg-card p-3">
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      {icon}
      {label}
    </div>
    <div className="mt-1 text-2xl font-bold tabular-nums">{value}</div>
  </div>
);

export default WeeeCheck;
