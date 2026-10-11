import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolSection, Field, StatGrid, StatTile, ToneBadge, EmptyState, selectCls } from "@/components/cockpit/kit";
import { supabase } from "@/integrations/supabase/client";
import { useTrackToolEvent } from "@/hooks/useTrackToolEvent";
import { TrialResult, useToolTrial } from "@/components/freetools/ToolTrial";
import {
  Search,
  Loader2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Recycle,
  Building2,
  Hash,
  Tag,
} from "lucide-react";

/** Die 6 offiziellen ElektroG-Kategorien → interne stiftung-ear kategorienummer (11–16). */
const KATEGORIEN: { nr: number; label: string }[] = [
  { nr: 11, label: "1 · Wärmeüberträger" },
  { nr: 12, label: "2 · Bildschirme & Monitore (>100 cm²)" },
  { nr: 13, label: "3 · Lampen" },
  { nr: 14, label: "4 · Großgeräte (mind. eine Seite > 50 cm)" },
  { nr: 15, label: "5 · Kleingeräte (alle Seiten < 50 cm)" },
  { nr: 16, label: "6 · Kleine IT- & Telekommunikationsgeräte (< 50 cm)" },
];

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
  const [kategorie, setKategorie] = useState<number>(0); // 0 = alle
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WeeeResult | null>(null);
  const [onlyActive, setOnlyActive] = useState(false);
  const track = useTrackToolEvent("weee-check");
  // Nur auf der öffentlichen Probier-Seite gesetzt, im Cockpit null.
  const trial = useToolTrial();

  const runCheck = async () => {
    const q = query.trim();
    if (q.length < 2) {
      setError("Bitte mindestens 2 Zeichen eingeben.");
      return;
    }
    if (trial && !trial.beforeRun()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    track("search", { query: q, kategorie });
    try {
      const { data, error: fnError } = await supabase.functions.invoke("check-weee", {
        body: { marke: q, kategorienummer: kategorie || undefined },
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
      subtitle="Gib eine Marke ein und sieh, welche Einträge im offiziellen EAR-Verzeichnis der stiftung ear dazu registriert sind: mit WEEE-Reg.-Nr., Hersteller bzw. Bevollmächtigtem, Kategorie und Geräteart."
    >
      <ToolSection title="Marke im EAR-Verzeichnis suchen" icon={Recycle} description="Live aus der offiziellen Schnittstelle der stiftung ear.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_16rem]">
          <Field label="Marke" htmlFor="weee-marke" error={error ?? undefined}>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="weee-marke"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="z. B. Anker, Bosch, deine Marke …"
                  className="pl-9"
                />
              </div>
              <Button onClick={runCheck} disabled={loading} className="h-10 shrink-0 font-semibold">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />}
                {loading ? "Prüfe …" : "Prüfen"}
              </Button>
            </div>
          </Field>
          <Field label="Kategorie (optional)" htmlFor="weee-kat">
            <select id="weee-kat" value={kategorie} onChange={(e) => setKategorie(Number(e.target.value))} className={selectCls}>
              <option value={0}>Alle Kategorien</option>
              {KATEGORIEN.map((k) => (
                <option key={k.nr} value={k.nr}>
                  {k.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Enthält-Suche: Treffer enthalten den Begriff. Mit <code className="rounded bg-secondary px-1">*</code> setzt du selbst Platzhalter,
          z. B. <code className="rounded bg-secondary px-1">Bosch*</code> für „beginnt mit“. Nur Wortmarken, keine Bildmarken.
        </p>
      </ToolSection>

      {!result && !loading && (
        <EmptyState
          className="mt-6"
          icon={Search}
          title="Noch keine Suche"
          description="Gib oben eine Marke ein. Du siehst danach jede Registrierung mit WEEE-Nummer, Hersteller, Status und Geräteart."
        />
      )}
      {loading && (
        <div className="mt-6 space-y-3" aria-busy="true" aria-label="Suche läuft …">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl border border-border bg-secondary/60" />
          ))}
        </div>
      )}

      {/* Ergebnis */}
      {result && (
        <TrialResult>
        <div className="mt-6 space-y-5" aria-live="polite">
          <StatGrid cols={4}>
            <StatTile label="Treffer gesamt" value={result.total} />
            <StatTile label="davon aktiv" value={result.aktivCount} tone="success" />
            <StatTile label="WEEE-Nummern" value={result.distinctWeee} />
            <StatTile label="Hersteller oder Bevollmächtigte" value={result.distinctHersteller} />
          </StatGrid>

          {result.total === 0 ? (
            <EmptyState
              icon={XCircle}
              title={`Keine Einträge zu „${result.query}“ gefunden`}
              description={
                <>
                  Das heißt nicht zwingend, dass keine Registrierung existiert. Prüfe Schreibweise und Varianten oder suche direkt im{" "}
                  <a href={result.verzeichnisUrl} target="_blank" rel="noreferrer" className="text-accent-blue underline">
                    offiziellen Verzeichnis
                  </a>
                  .
                </>
              }
            />
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base font-semibold tracking-tight">
                  <span className="tabular">{visibleGroups.length}</span> {visibleGroups.length === 1 ? "Eintrag" : "Einträge"}
                  {result.moreFound && <span className="font-normal text-muted-foreground"> (weitere vorhanden, Suche verfeinern)</span>}
                </h2>
                <label className="inline-flex cursor-pointer select-none items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={onlyActive}
                    onChange={(e) => setOnlyActive(e.target.checked)}
                    className="h-4 w-4 rounded border-border accent-[hsl(var(--primary))]"
                  />
                  Nur aktive Registrierungen
                </label>
              </div>

              <ul className="space-y-3">
                {visibleGroups.map((g) => (
                  <li
                    key={g.key}
                    className={`rounded-xl border bg-card p-4 md:p-5 ${g.aktiv ? "border-border shadow-card" : "border-border/60 bg-secondary/30"}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 font-semibold">
                            <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                            {g.herstellername}
                          </span>
                          {g.aktiv ? (
                            <ToneBadge tone="success"><CheckCircle2 className="h-3 w-3" aria-hidden="true" /> aktiv</ToneBadge>
                          ) : (
                            <ToneBadge tone="neutral"><XCircle className="h-3 w-3" aria-hidden="true" /> ausgetreten{g.markaustritt && `, ${fmtDate(g.markaustritt)}`}</ToneBadge>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Tag className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          Marke: <span className="font-medium text-foreground">{g.marke}</span>
                        </div>
                      </div>
                      <a
                        href={`https://www.ear-system.de/ear-verzeichnis/hersteller`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium tabular transition-colors hover:bg-secondary"
                        title="Im offiziellen EAR-Verzeichnis nachschlagen"
                      >
                        <Hash className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                        {g.weeeNr}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>

                    {/* Gerätearten */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {g.arten.map((a, i) => (
                        <span key={i} className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs text-foreground/80" title={a.kategorie}>
                          {a.geraeteart}
                        </span>
                      ))}
                    </div>
                    {g.veroeffentlichung && (
                      <div className="mt-2 text-xs text-muted-foreground tabular">Veröffentlicht: {fmtDate(g.veroeffentlichung)}</div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="text-xs leading-relaxed text-muted-foreground">
            Quelle: {result.source},{" "}
            <a href={result.verzeichnisUrl} target="_blank" rel="noreferrer" className="text-accent-blue underline">
              offizielles EAR-Verzeichnis
            </a>
            . Keine Rechtsberatung, die Registrierungspflicht klärt im Zweifel die stiftung ear.
          </p>
        </div>
        </TrialResult>
      )}
    </CockpitShell>
  );
};

export default WeeeCheck;
