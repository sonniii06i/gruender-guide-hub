import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, RefreshCcw, Bell, Loader2, ExternalLink, AlertCircle, CheckCircle2, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface WatchEntry {
  id: string;
  name: string;
  addedAt: string;
  lastChecked?: string;
  lastResult?: { totalHits: number | null; sampleHits?: { name: string; office: string }[] };
  newSinceLast?: number;
}

const STORAGE_KEY = "gx-marken-watchlist";

const loadList = (): WatchEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveList = (list: WatchEntry[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {}
};

const MarkenMonitor = () => {
  const [list, setList] = useState<WatchEntry[]>([]);
  const [newName, setNewName] = useState("");
  const [checkingId, setCheckingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setList(loadList());
  }, []);

  const persist = (next: WatchEntry[]) => {
    setList(next);
    saveList(next);
  };

  const add = () => {
    if (!newName.trim() || newName.trim().length < 2) {
      setError("Mindestens 2 Zeichen.");
      return;
    }
    if (list.some((e) => e.name.toLowerCase() === newName.trim().toLowerCase())) {
      setError("Marke schon in der Watchlist.");
      return;
    }
    setError(null);
    persist([
      {
        id: crypto.randomUUID(),
        name: newName.trim(),
        addedAt: new Date().toISOString(),
      },
      ...list,
    ]);
    setNewName("");
  };

  const remove = (id: string) => persist(list.filter((e) => e.id !== id));

  const recheck = async (entry: WatchEntry) => {
    setCheckingId(entry.id);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("check-brand", { body: { name: entry.name } });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      const totalHits: number | null = data?.trademarks?.totalHits ?? null;
      const sampleHits = (data?.trademarks?.hits ?? []).slice(0, 3).map((h: any) => ({ name: h.name, office: h.office }));
      const prev = entry.lastResult?.totalHits ?? null;
      const newSince = prev !== null && totalHits !== null && totalHits > prev ? totalHits - prev : 0;
      const updated: WatchEntry = {
        ...entry,
        lastChecked: new Date().toISOString(),
        lastResult: { totalHits, sampleHits },
        newSinceLast: newSince,
      };
      persist(list.map((e) => (e.id === entry.id ? updated : e)));
    } catch (e: any) {
      setError(`${entry.name}: ${e?.message || "Check fehlgeschlagen"}`);
    } finally {
      setCheckingId(null);
    }
  };

  const recheckAll = async () => {
    for (const entry of list) {
      // sequenziell um TMView nicht zu hammern
      // eslint-disable-next-line no-await-in-loop
      await recheck(entry);
    }
  };

  return (
    <CockpitShell
      eyebrow="Marken-Monitor"
      title="Markenüberwachung — Watchlist"
      subtitle="Trag deine eingetragenen oder geplanten Markennamen ein. Du kannst manuell rechecken (und siehst was sich seit letzter Prüfung geändert hat) — oder bald per täglicher Cron-Routine automatisch via Discord-/Email-Alert."
    >
      {/* Add */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <div className="flex gap-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Markennamen hinzufügen…"
            className="flex-1"
          />
          <button
            onClick={add}
            className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Hinzufügen
          </button>
        </div>
        {error && (
          <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-600">{error}</div>
        )}
        <div className="text-[11px] text-muted-foreground mt-2">
          Watchlist wird im Browser gespeichert (localStorage). Cross-Device-Sync + Daily-Auto-Recheck folgt in einer
          späteren Tranche.
        </div>
      </div>

      {/* List */}
      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Noch keine Marken in der Watchlist. Trag oben deine erste Marke ein.
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">
              {list.length} {list.length === 1 ? "Marke" : "Marken"} in Watchlist
            </div>
            <button
              onClick={recheckAll}
              disabled={!!checkingId}
              className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold hover:bg-secondary/80 disabled:opacity-50"
            >
              {checkingId ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCcw className="h-3 w-3" />}
              Alle rechecken
            </button>
          </div>

          <div className="space-y-3">
            {list.map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="font-bold text-sm font-mono">{entry.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      hinzugefügt {new Date(entry.addedAt).toLocaleDateString("de-DE")}
                      {entry.lastChecked &&
                        ` · zuletzt geprüft ${new Date(entry.lastChecked).toLocaleDateString("de-DE")}`}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => recheck(entry)}
                      disabled={checkingId === entry.id}
                      className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-secondary disabled:opacity-50"
                    >
                      {checkingId === entry.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <RefreshCcw className="h-3 w-3" />
                      )}
                      Recheck
                    </button>
                    <button
                      onClick={() => remove(entry.id)}
                      className="inline-flex items-center rounded-lg border border-red-500/30 text-red-600 px-2 py-1.5 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {entry.lastResult && (
                  <div className="space-y-2">
                    {entry.newSinceLast && entry.newSinceLast > 0 ? (
                      <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-3 text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <Bell className="h-4 w-4 text-orange-600" />
                          <span className="font-bold text-orange-700">
                            +{entry.newSinceLast} neue Marke(n) seit letztem Check!
                          </span>
                        </div>
                        <div className="text-muted-foreground">
                          Aktuell {entry.lastResult.totalHits} Treffer in DPMA + EUIPO. Schau dir die neuen Anmeldungen
                          an — bei direktem Konflikt: Widerspruchsfrist-Optionen prüfen.
                        </div>
                      </div>
                    ) : entry.lastResult.totalHits === null ? (
                      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-800">
                        <AlertCircle className="h-3 w-3 inline mr-1" /> TMView gerade offline — manuell prüfen.
                      </div>
                    ) : entry.lastResult.totalHits === 0 ? (
                      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs text-emerald-700">
                        <CheckCircle2 className="h-3 w-3 inline mr-1" /> 0 Treffer — alles sauber.
                      </div>
                    ) : (
                      <div className="rounded-xl border border-border bg-secondary/40 p-3 text-xs">
                        <div className="font-semibold mb-1">{entry.lastResult.totalHits} bestehende Marke(n)</div>
                        {entry.lastResult.sampleHits && entry.lastResult.sampleHits.length > 0 && (
                          <ul className="text-muted-foreground space-y-0.5">
                            {entry.lastResult.sampleHits.map((h, i) => (
                              <li key={i}>
                                · {h.name} ({h.office})
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                  <Link
                    to={`/cockpit/check?q=${encodeURIComponent(entry.name)}`}
                    className="inline-flex items-center gap-1 text-[11px] text-accent-blue hover:underline"
                  >
                    Voller Live-Check <ExternalLink className="h-3 w-3" />
                  </Link>
                  <a
                    href={`https://www.tmdn.org/tmview/#/tmview/results?text=${encodeURIComponent(entry.name)}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:underline"
                  >
                    TMView <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mt-6 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <Tag className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">So nutzt du den Monitor:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>Trag deine eingetragene Marke ein → "Recheck" für Baseline-Treffer.</li>
              <li>Alle 1–2 Wochen "Alle rechecken" — neue Anmeldungen mit deinem Namen erscheinen als Alert.</li>
              <li>
                Bei +X neuen Marken: in TMView/DPMA-Register die Anmeldungen ansehen — Widerspruchsfrist (3 Monate)
                läuft ab Veröffentlichung.
              </li>
              <li>
                Auto-Recheck (täglich, mit Discord/Email-Alert) folgt in nächster Tranche — sag Bescheid wenn du das
                priorisieren willst.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default MarkenMonitor;
