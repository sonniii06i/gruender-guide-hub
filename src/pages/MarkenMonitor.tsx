import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, RefreshCcw, Bell, Loader2, ExternalLink, AlertCircle, CheckCircle2, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout, EmptyState, ToolSection } from "@/components/cockpit/kit";
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
      const patch: Partial<WatchEntry> = {
        lastChecked: new Date().toISOString(),
        lastResult: { totalHits, sampleHits },
        newSinceLast: newSince,
      };
      // Funktionaler Setter, damit recheckAll sequentielle Updates nicht überschreibt.
      setList((prevList) => {
        const next = prevList.map((e) => (e.id === entry.id ? { ...e, ...patch } : e));
        saveList(next);
        return next;
      });
    } catch (e: any) {
      setError(`${entry.name}: ${e?.message || "Check fehlgeschlagen"}`);
    } finally {
      setCheckingId(null);
    }
  };

  const recheckAll = async () => {
    // Snapshot fixieren — list kann sich während Loop ändern.
    const snapshot = list;
    for (const entry of snapshot) {
      // eslint-disable-next-line no-await-in-loop
      await recheck(entry);
    }
  };

  return (
    <CockpitShell
      eyebrow="Marken-Monitor"
      title="Markenüberwachung: Watchlist"
      subtitle="Trag deine eingetragenen oder geplanten Markennamen ein und prüfe sie regelmäßig neu. Du siehst, was sich seit der letzten Prüfung in DPMA und EUIPO geändert hat."
      actions={
        list.length > 0 ? (
          <Button variant="outline" onClick={recheckAll} disabled={!!checkingId}>
            {checkingId ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <RefreshCcw className="h-4 w-4" aria-hidden="true" />}
            Alle neu prüfen
          </Button>
        ) : undefined
      }
    >
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <div className="min-w-0 space-y-6">
          <ToolSection title="Marke hinzufügen" icon={Plus}>
            <form
              className="flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                add();
              }}
            >
              <label htmlFor="marke-neu" className="sr-only">Markenname</label>
              <Input
                id="marke-neu"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Markenname, z. B. Lumora …"
                className="flex-1"
              />
              <Button type="submit" className="shrink-0">
                <Plus className="h-4 w-4" aria-hidden="true" /> Hinzufügen
              </Button>
            </form>
            {error && <Callout tone="danger" className="mt-3">{error}</Callout>}
            <p className="mt-3 text-xs text-muted-foreground">
              Die Watchlist wird in diesem Browser gespeichert. Eine automatische tägliche Prüfung gibt es noch nicht.
            </p>
          </ToolSection>

          {list.length === 0 ? (
            <EmptyState
              icon={Tag}
              title="Noch keine Marken in der Watchlist"
              description="Trag oben deine erste Marke ein. Danach siehst du hier die Treffer aus DPMA und EUIPO und was sich seit der letzten Prüfung geändert hat."
            />
          ) : (
            <section aria-label="Watchlist">
              <h2 className="mb-3 text-base font-semibold">
                <span className="tabular">{list.length}</span> {list.length === 1 ? "Marke" : "Marken"} in der Watchlist
              </h2>
              <ul className="space-y-3">
                {list.map((entry) => (
                  <li key={entry.id} className="rounded-2xl border border-border bg-card p-4 shadow-card md:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="break-words text-base font-semibold">{entry.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Hinzugefügt {new Date(entry.addedAt).toLocaleDateString("de-DE")}
                          {entry.lastChecked && `, zuletzt geprüft ${new Date(entry.lastChecked).toLocaleDateString("de-DE")}`}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-1.5">
                        <Button size="sm" variant="outline" onClick={() => recheck(entry)} disabled={checkingId === entry.id}>
                          {checkingId === entry.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : <RefreshCcw className="h-3.5 w-3.5" aria-hidden="true" />}
                          Prüfen
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => remove(entry.id)}
                          aria-label={`${entry.name} entfernen`}
                          className="px-2.5 text-danger hover:border-danger/40 hover:bg-danger-soft hover:text-danger"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>

                    {entry.lastResult && (
                      <div className="mt-3">
                        {entry.newSinceLast && entry.newSinceLast > 0 ? (
                          <Callout tone="warning" icon={Bell} title={`${entry.newSinceLast} neue Marke(n) seit der letzten Prüfung`}>
                            Aktuell {entry.lastResult.totalHits} Treffer in DPMA und EUIPO. Sieh dir die neuen Anmeldungen an; bei direktem
                            Konflikt die Widerspruchsfrist prüfen.
                          </Callout>
                        ) : entry.lastResult.totalHits === null ? (
                          <Callout tone="warning" icon={AlertCircle}>TMView ist gerade nicht erreichbar. Bitte manuell prüfen.</Callout>
                        ) : entry.lastResult.totalHits === 0 ? (
                          <Callout tone="success" icon={CheckCircle2}>Keine Treffer in DPMA und EUIPO.</Callout>
                        ) : (
                          <Callout tone="neutral" title={`${entry.lastResult.totalHits} bestehende Marke(n)`}>
                            {entry.lastResult.sampleHits && entry.lastResult.sampleHits.length > 0 && (
                              <ul className="mt-1 space-y-0.5 text-muted-foreground">
                                {entry.lastResult.sampleHits.map((h, i) => (
                                  <li key={i}>
                                    {h.name} <span className="text-xs">({h.office})</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </Callout>
                        )}
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <Link to={`/cockpit/check?q=${encodeURIComponent(entry.name)}`} className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
                        Voller Live-Check <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                      <a
                        href={`https://www.tmdn.org/tmview/#/tmview/results?text=${encodeURIComponent(entry.name)}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
                      >
                        TMView <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <ToolSection title="So nutzt du den Monitor" icon={Tag} className="lg:sticky lg:top-20">
          <ol className="space-y-3 text-sm leading-relaxed text-foreground/85">
            {[
              "Trag deine eingetragene Marke ein und prüfe sie einmal: das ist dein Ausgangsstand.",
              "Prüfe alle ein bis zwei Wochen alle Marken neu. Neue Anmeldungen mit deinem Namen erscheinen als Hinweis.",
              "Bei neuen Treffern die Anmeldungen in TMView oder im DPMA-Register ansehen. Die Widerspruchsfrist (3 Monate) läuft ab Veröffentlichung.",
            ].map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular">{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
        </ToolSection>
      </div>
    </CockpitShell>
  );
};

export default MarkenMonitor;
