// Behörden-Wegweiser über den PVOG-Suchdienst (FITKO, offen, CORS erlaubt).
// PLZ → Gemeinde (ARS) → Leistung „Gewerbe anmelden“ (LeiKa 99050012104000)
// → Online-Antrag(e) und zuständige Stellen. Fällt PVOG aus oder findet nichts
// (z. B. Dresden), zeigt die Seite die allgemeinen Links – nie „keine Behörde“.

const BASIS = "https://pvog.fitko.net/suchdienst/api";
export const LEIKA_GEWERBEANMELDUNG = "99050012104000";

export type Gewerbeamt = {
  gemeinde: string;
  onlineLinks: { titel: string; url: string }[];
  stellen: string[];
};

type PvogOrt = { name: string; ars: string };
type PvogLink = { title?: string; uri?: string };
type PvogLeistung = { id: string; onlineServiceLinks?: PvogLink[] };
type PvogOrg = { title?: string };

async function json<T>(url: string, signal?: AbortSignal): Promise<T> {
  const r = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error(`PVOG HTTP ${r.status}`);
  return (await r.json()) as T;
}

export async function gewerbeamtFuerPlz(plz: string, signal?: AbortSignal): Promise<Gewerbeamt | null> {
  const orte = await json<PvogOrt[]>(`${BASIS}/v2/locations?q=${encodeURIComponent(plz)}`, signal);
  const ort = orte?.[0];
  if (!ort?.ars) return null;
  const l = await json<{ content?: PvogLeistung[] }>(`${BASIS}/v3/servicedescriptions/leikaid?ars=${ort.ars}&leikaIds=${LEIKA_GEWERBEANMELDUNG}`, signal);
  const leistung = l.content?.[0];
  if (!leistung) return { gemeinde: ort.name, onlineLinks: [], stellen: [] };
  let stellen: string[] = [];
  try {
    const d = await json<{ organisations?: PvogOrg[] }>(`${BASIS}/v6/servicedescriptions/${encodeURIComponent(leistung.id)}/detail?ars=${ort.ars}`, signal);
    stellen = (d.organisations ?? []).map((o) => o.title ?? "").filter(Boolean);
  } catch {
    /* Detail optional */
  }
  const gesehen = new Set<string>();
  const onlineLinks = (leistung.onlineServiceLinks ?? [])
    .filter((x) => x.uri && !gesehen.has(x.uri) && gesehen.add(x.uri))
    .map((x) => ({ titel: x.title ?? "Online-Antrag", url: x.uri! }));
  return { gemeinde: ort.name, onlineLinks, stellen: [...new Set(stellen)] };
}

export const finanzamtSucheUrl = (plz: string) =>
  `https://www.bzst.de/DE/Service/Behoerdenwegweiser/Finanzamtsuche/GemFa/finanzamtsuche_Formular.html?nn=95918&resourceId=95914&input_=95918&pageLocale=de&suche=${encodeURIComponent(plz)}`;
