// Liest eine PostgREST-Abfrage seitenweise vollstaendig aus.
//
// PostgREST kappt jede Antwort still bei max-rows (Standard 1000). Admin-KPIs
// wurden dadurch aus einer zufaelligen Teilmenge berechnet und sahen trotzdem
// plausibel aus. Diese Hilfe blaettert per range(), bis eine Seite kuerzer als
// die Seitengroesse ist, und meldet, ob die Obergrenze `max` erreicht wurde.
//
// Die Abfrage MUSS eine stabile Sortierung haben, sonst ueberlappen Seiten.

export interface FetchAllResult<T> {
  rows: T[];
  /** true, wenn `max` erreicht wurde -- die Zahlen sind dann unvollstaendig. */
  truncated: boolean;
  error: { message: string } | null;
}

type PageQuery = (
  from: number,
  to: number,
) => PromiseLike<{ data: readonly unknown[] | null; error: { message: string } | null }>;

export async function fetchAllRows<T>(
  page: PageQuery,
  { pageSize = 1000, max = 100_000 }: { pageSize?: number; max?: number } = {},
): Promise<FetchAllResult<T>> {
  const rows: T[] = [];
  for (let from = 0; from < max; from += pageSize) {
    const to = Math.min(from + pageSize, max) - 1;
    const { data, error } = await page(from, to);
    if (error) return { rows, truncated: false, error };
    const chunk = (data ?? []) as T[];
    rows.push(...chunk);
    if (chunk.length < to - from + 1) return { rows, truncated: false, error: null };
  }
  return { rows, truncated: true, error: null };
}
