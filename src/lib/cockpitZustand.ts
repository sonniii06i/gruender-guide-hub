import { supabase } from "@/integrations/supabase/client";

/**
 * Cockpit-Zustand je Konto: von Hand abgehakte Fahrplan-Schritte und ob der
 * Rundgang schon gesehen wurde. Liegt in der Tabelle `cockpit_zustand` und gilt
 * damit auf jedem Gerät. Der localStorage bleibt als schneller erster Anstrich
 * und als Puffer, falls das Speichern gerade nicht klappt.
 */
export interface CockpitZustand {
  plan_abgehakt: string[];
  rundgang_gesehen_am: string | null;
}

/** null = Konto hat noch keine Zeile, undefined = Abfrage fehlgeschlagen. */
export type ServerZustand = CockpitZustand | null | undefined;

const PLAN_KEY = (uid: string) => `gx-startplan-v1-${uid}`;
/** Gesetzt, solange lokale Haken noch nicht auf dem Server angekommen sind. */
const OFFEN_KEY = (uid: string) => `gx-startplan-offen-v1-${uid}`;
/** Gesetzt, sobald dieses Gerät einmal mit dem Server abgeglichen hat. */
const ABGLEICH_KEY = (uid: string) => `gx-startplan-abgleich-v1-${uid}`;
export const RUNDGANG_KEY = "ggh-tour-done-v1";

const MAX_HAKEN = 200;

const nurTexte = (roh: unknown): string[] =>
  Array.isArray(roh) ? [...new Set(roh.filter((x): x is string => typeof x === "string" && x.length > 0 && x.length <= 80))].slice(0, MAX_HAKEN) : [];

const lesen = (key: string): string | null => {
  try { return typeof window === "undefined" ? null : localStorage.getItem(key); } catch { return null; }
};
const schreiben = (key: string, wert: string | null) => {
  try {
    if (wert === null) localStorage.removeItem(key);
    else localStorage.setItem(key, wert);
  } catch { /* ohne Speicher gilt der Stand bis zum Neuladen */ }
};

export const liesLokal = (uid: string | undefined): string[] => {
  if (!uid) return [];
  try { return nurTexte(JSON.parse(lesen(PLAN_KEY(uid)) ?? "[]")); } catch { return []; }
};

export const schreibLokal = (uid: string, haken: string[]) => schreiben(PLAN_KEY(uid), JSON.stringify(nurTexte(haken)));

export interface Abgleich {
  /** Der Stand, der danach gilt. */
  haken: string[];
  /** true = dieser Stand muss noch auf den Server. */
  hochladen: boolean;
}

/**
 * Welcher Stand gilt nach dem Laden?
 * - Abfrage fehlgeschlagen: lokal weiterarbeiten, nichts hochladen.
 * - Erster Abgleich dieses Geräts: beides zusammenführen, damit alte Haken aus
 *   der Zeit vor der Tabelle nicht verloren gehen.
 * - Lokale Änderungen, die noch nicht angekommen sind: lokal gewinnt.
 * - Sonst gilt der Server, auch wenn dort ein Haken wieder entfernt wurde.
 */
export function abgleichen(lokal: string[], server: ServerZustand, opts: { abgeglichen: boolean; offen: boolean }): Abgleich {
  const l = nurTexte(lokal);
  if (server === undefined) return { haken: l, hochladen: false };
  const s = nurTexte(server?.plan_abgehakt);
  const gleich = (a: string[], b: string[]) => a.length === b.length && a.every((x) => b.includes(x));
  if (!opts.abgeglichen) {
    const beide = nurTexte([...s, ...l]);
    return { haken: beide, hochladen: !gleich(beide, s) };
  }
  if (opts.offen) return { haken: l, hochladen: !gleich(l, s) };
  return { haken: s, hochladen: false };
}

// Eine Abfrage je Konto und Seitenaufruf, geteilt zwischen Fahrplan und Rundgang.
const laufend = new Map<string, Promise<ServerZustand>>();

export function ladeZustand(uid: string): Promise<ServerZustand> {
  const da = laufend.get(uid);
  if (da) return da;
  const p: Promise<ServerZustand> = Promise.resolve(
    supabase.from("cockpit_zustand").select("plan_abgehakt, rundgang_gesehen_am").eq("user_id", uid).maybeSingle(),
  ).then(
    ({ data, error }) => {
      if (error) { laufend.delete(uid); return undefined; }
      if (!data) return null;
      return { plan_abgehakt: nurTexte(data.plan_abgehakt), rundgang_gesehen_am: data.rundgang_gesehen_am ?? null };
    },
    () => { laufend.delete(uid); return undefined; },
  );
  laufend.set(uid, p);
  return p;
}

async function speichern(uid: string, patch: Partial<CockpitZustand>): Promise<boolean> {
  try {
    const { error } = await supabase.from("cockpit_zustand").upsert({ user_id: uid, ...patch }, { onConflict: "user_id" });
    if (error) return false;
    // Den geteilten Stand nachziehen, damit ein zweiter Leser im selben Seitenaufruf nichts Altes sieht.
    const alt = await (laufend.get(uid) ?? Promise.resolve(null));
    laufend.set(uid, Promise.resolve({
      plan_abgehakt: patch.plan_abgehakt ?? alt?.plan_abgehakt ?? [],
      rundgang_gesehen_am: patch.rundgang_gesehen_am ?? alt?.rundgang_gesehen_am ?? null,
    }));
    return true;
  } catch {
    return false;
  }
}

/** Haken lokal sichern und auf den Server schreiben. Scheitert das, bleibt die Marke „offen“ stehen. */
export async function speichereHaken(uid: string, haken: string[]): Promise<boolean> {
  const sauber = nurTexte(haken);
  schreibLokal(uid, sauber);
  schreiben(OFFEN_KEY(uid), "1");
  const ok = await speichern(uid, { plan_abgehakt: sauber });
  if (ok) {
    schreiben(OFFEN_KEY(uid), null);
    schreiben(ABGLEICH_KEY(uid), "1");
  }
  return ok;
}

/** Lädt den Server-Stand und gleicht ihn mit diesem Gerät ab. */
export async function ladeHaken(uid: string): Promise<string[]> {
  const server = await ladeZustand(uid);
  const lokal = liesLokal(uid);
  const { haken, hochladen } = abgleichen(lokal, server, {
    abgeglichen: lesen(ABGLEICH_KEY(uid)) === "1",
    offen: lesen(OFFEN_KEY(uid)) === "1",
  });
  if (server === undefined) return haken;
  if (hochladen) {
    await speichereHaken(uid, haken);
  } else {
    schreibLokal(uid, haken);
    schreiben(ABGLEICH_KEY(uid), "1");
  }
  return haken;
}

export const rundgangLokalGesehen = (): boolean => lesen(RUNDGANG_KEY) === "1";

/** Rundgang schon gesehen? Erst das Gerät fragen, dann das Konto. Im Zweifel (Abfrage scheitert) nicht aufdrängen. */
export async function rundgangGesehen(uid: string): Promise<boolean> {
  if (rundgangLokalGesehen()) return true;
  const server = await ladeZustand(uid);
  if (server === undefined) return true;
  if (server?.rundgang_gesehen_am) {
    schreiben(RUNDGANG_KEY, "1");
    return true;
  }
  return false;
}

export function merkeRundgang(uid: string | undefined): void {
  schreiben(RUNDGANG_KEY, "1");
  if (uid) void speichern(uid, { rundgang_gesehen_am: new Date().toISOString() });
}
