// Mahnungen und Verzugszinsen nach §§ 286, 288, 247 BGB (Stand 08.10.2026).
// Basiszinssatz nur aus der Bundesbank-Tabelle, nie aus dem Gesetzestext (der nennt
// statisch noch 3,62 %). Nächste Anpassung 01.01.2027 → BASISZINS ergänzen.

export const BASISZINS: { ab: string; satz: number }[] = [
  { ab: "2024-01-01", satz: 3.62 },
  { ab: "2024-07-01", satz: 3.37 },
  { ab: "2025-01-01", satz: 2.27 },
  { ab: "2025-07-01", satz: 1.27 },
  { ab: "2026-01-01", satz: 1.27 },
  { ab: "2026-07-01", satz: 1.52 },
];

export const PAUSCHALE_B2B = 40; // § 288 Abs. 5 BGB
export const MAHNVERFAHREN_MINDESTGEBUEHR = 38; // GKG KV 1100, 0,5-Gebühr, mindestens 38 €

/** Basiszins am Tag `iso`; null, wenn das Datum hinter dem letzten gepflegten Halbjahr liegt. */
export function basiszinsAm(iso: string): number | null {
  const letzter = BASISZINS[BASISZINS.length - 1];
  const naechsteAnpassung = new Date(Date.parse(`${letzter.ab}T12:00:00Z`));
  naechsteAnpassung.setUTCMonth(naechsteAnpassung.getUTCMonth() + 6);
  if (iso >= naechsteAnpassung.toISOString().slice(0, 10)) return null;
  const e = [...BASISZINS].reverse().find((b) => b.ab <= iso);
  return e ? e.satz : null;
}

export type Zinsabschnitt = { von: string; bis: string; tage: number; satz: number; zins: number };

/**
 * Verzugszinsen vom Verzugsbeginn bis Stichtag, abschnittsweise je Basiszins-Halbjahr,
 * act/365. Verbraucher: Basiszins + 5 Prozentpunkte, sonst + 9 (Entgeltforderung).
 */
export function verzugszinsen(betrag: number, verzugAb: string, bis: string, verbraucher: boolean): { abschnitte: Zinsabschnitt[]; summe: number; veraltet: boolean } {
  const aufschlag = verbraucher ? 5 : 9;
  const abschnitte: Zinsabschnitt[] = [];
  let veraltet = false;
  if (!(betrag > 0) || !verzugAb || bis <= verzugAb) return { abschnitte, summe: 0, veraltet };
  const grenzen = BASISZINS.map((b) => b.ab).filter((d) => d > verzugAb && d < bis);
  const punkte = [verzugAb, ...grenzen, bis];
  for (let i = 0; i < punkte.length - 1; i++) {
    const von = punkte[i];
    const bisAbschnitt = punkte[i + 1];
    const basis = basiszinsAm(von);
    if (basis === null) veraltet = true;
    const satz = (basis ?? BASISZINS[BASISZINS.length - 1].satz) + aufschlag;
    const tage = Math.round((Date.parse(bisAbschnitt) - Date.parse(von)) / 864e5);
    abschnitte.push({ von, bis: bisAbschnitt, tage, satz, zins: Math.round(((betrag * satz) / 100) * (tage / 365) * 100) / 100 });
  }
  return { abschnitte, summe: Math.round(abschnitte.reduce((n, a) => n + a.zins, 0) * 100) / 100, veraltet };
}

/** § 286 Abs. 3: spätestens 30 Tage nach Fälligkeit und Zugang (Verbraucher nur mit Hinweis in der Rechnung). */
export function verzugsbeginn(o: { faellig: string; zugang: string; ersteMahnung?: string; verbraucher: boolean; hinweisInRechnung: boolean; kalenderdatumVereinbart: boolean }): { datum: string | null; grund: string } {
  const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T12:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
  if (o.kalenderdatumVereinbart) return { datum: plus(o.faellig, 1), grund: "Zahlungstermin nach dem Kalender vereinbart – Verzug ohne Mahnung ab dem Folgetag (§ 286 Abs. 2 Nr. 1 BGB)." };
  const kandidaten: { d: string; g: string }[] = [];
  if (o.ersteMahnung && o.ersteMahnung >= o.faellig) kandidaten.push({ d: plus(o.ersteMahnung, 1), g: "Verzug durch Mahnung nach Fälligkeit (§ 286 Abs. 1 BGB)." });
  if (!o.verbraucher || o.hinweisInRechnung) {
    const spaeter = o.zugang > o.faellig ? o.zugang : o.faellig;
    kandidaten.push({ d: plus(spaeter, 31), g: "Verzug 30 Tage nach Fälligkeit und Zugang der Rechnung (§ 286 Abs. 3 BGB)." });
  }
  if (!kandidaten.length) return { datum: null, grund: "Noch kein Verzug: Bei Verbrauchern ohne Hinweis in der Rechnung braucht es erst eine Mahnung." };
  kandidaten.sort((a, b) => a.d.localeCompare(b.d));
  return { datum: kandidaten[0].d, grund: kandidaten[0].g };
}

/** Verjährung (§§ 195, 199 BGB): 3 Jahre ab Ende des Jahres der Entstehung → 31.12. des dritten Folgejahres. */
export const verjaehrung = (entstanden: string) => `${Number(entstanden.slice(0, 4)) + 3}-12-31`;
