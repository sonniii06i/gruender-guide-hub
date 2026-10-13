// Termin-Slots in Europe/Berlin -- unabhaengig von der Zeitzone des Browsers.
//
// Vorher baute Booking.tsx die Slots mit setHours() in der LOKALEN Zeit des
// Besuchers. Wer aus Dubai oder den USA buchte, landete bei "10:00" zu einer
// ganz anderen Berliner Uhrzeit, und der Abgleich mit belegten Slots
// (slot_iso) schlug fehl, weil dieselbe Berliner Stunde ein anderes ISO ergab.

export const BERLIN_TZ = "Europe/Berlin";

export interface Ymd { y: number; m: number; d: number }

const partsFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: BERLIN_TZ,
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function berlinParts(ms: number) {
  const p: Record<string, number> = {};
  for (const x of partsFmt.formatToParts(new Date(ms))) {
    if (x.type !== "literal") p[x.type] = Number(x.value);
  }
  return p as { year: number; month: number; day: number; hour: number; minute: number; second: number };
}

/** Versatz Berlin gegenueber UTC in Minuten zum Zeitpunkt ms (60 oder 120). */
export function berlinOffsetMinutes(ms: number): number {
  const p = berlinParts(ms);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
}

/** UTC-Zeitpunkt (ms) fuer eine Berliner Wanduhrzeit. */
export function berlinWallToUtcMs({ y, m, d }: Ymd, hour: number, minute = 0): number {
  const naive = Date.UTC(y, m - 1, d, hour, minute);
  let ms = naive - berlinOffsetMinutes(naive) * 60000;
  // Zweiter Durchlauf faengt Tage mit Zeitumstellung ab.
  ms = naive - berlinOffsetMinutes(ms) * 60000;
  return ms;
}

/** ISO-String des Slots `hour:00` Berliner Zeit am Tag `day`. */
export function berlinSlotIso(day: Ymd, hour: number): string {
  return new Date(berlinWallToUtcMs(day, hour)).toISOString();
}

/** Heutiges Datum in Berlin. */
export function berlinToday(now = Date.now()): Ymd {
  const p = berlinParts(now);
  return { y: p.year, m: p.month, d: p.day };
}

export function addDays(day: Ymd, n: number): Ymd {
  const t = new Date(Date.UTC(day.y, day.m - 1, day.d + n));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}

/** 0 = Sonntag … 6 = Samstag (Kalendertag, zeitzonenfrei). */
export function weekday(day: Ymd): number {
  return new Date(Date.UTC(day.y, day.m - 1, day.d)).getUTCDay();
}

export const ymdKey = (day: Ymd) =>
  `${day.y}-${String(day.m).padStart(2, "0")}-${String(day.d).padStart(2, "0")}`;

/** Ostersonntag (Gauss/Meeus, gregorianisch). */
export function easterSunday(y: number): Ymd {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const dayN = ((h + l - 7 * m + 114) % 31) + 1;
  return { y, m: month, d: dayN };
}

/** Bundesweite gesetzliche Feiertage in Deutschland. */
export function isGermanNationalHoliday(day: Ymd): boolean {
  const fix = [`01-01`, `05-01`, `10-03`, `12-25`, `12-26`];
  const md = `${String(day.m).padStart(2, "0")}-${String(day.d).padStart(2, "0")}`;
  if (fix.includes(md)) return true;
  const ostern = easterSunday(day.y);
  const beweglich = [-2, 1, 39, 50].map((n) => ymdKey(addDays(ostern, n)));
  return beweglich.includes(ymdKey(day));
}

/** Naechste n Berliner Werktage ab heute (ohne Wochenende und bundesweite Feiertage). */
export function nextBerlinWorkdays(n: number, now = Date.now()): Ymd[] {
  const out: Ymd[] = [];
  let d = berlinToday(now);
  while (out.length < n) {
    const wd = weekday(d);
    if (wd !== 0 && wd !== 6 && !isGermanNationalHoliday(d)) out.push(d);
    d = addDays(d, 1);
  }
  return out;
}
