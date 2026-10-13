// alleSeiten.ts — liest eine PostgREST-Abfrage seitenweise bis zum Ende.
//
// Ohne .range() liefert PostgREST höchstens max-rows (Standard 1000) Zeilen —
// still, ohne Fehler. Mehrere Funktionen (Wochenmail, Ankündigungen, Backfill)
// erreichten so nur die ersten 1000 Nutzer und meldeten trotzdem Erfolg.
//
// `bauen` muss jedes Mal eine NEUE Abfrage mit stabiler Sortierung liefern.

type Abfrage = {
  range(von: number, bis: number): PromiseLike<{ data: unknown[] | null; error: { message: string } | null }>;
};

export async function alleSeiten<T>(
  bauen: () => Abfrage,
  seite = 1000,
): Promise<{ data: T[]; error: { message: string } | null }> {
  const out: T[] = [];
  for (let von = 0; ; von += seite) {
    const { data, error } = await bauen().range(von, von + seite - 1);
    if (error) return { data: out, error };
    const rows = (data ?? []) as T[];
    out.push(...rows);
    if (rows.length < seite) break;
  }
  return { data: out, error: null };
}
