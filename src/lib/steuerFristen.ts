// Persönlicher Steuer- und Fristenkalender (Stand 08.10.2026).
// Quellen: § 18 UStG, §§ 46–48 UStDV, § 37 EStG, § 31 KStG, § 19 GewStG,
// § 41a EStG, § 23 SGB IV, § 18a UStG, § 149 AO, § 108 Abs. 3 AO, § 325 HGB.
// Verschiebung nur um bundesweite Feiertage; Landesfeiertage (z. B. 31.10.,
// 01.11.) können Fristen regional zusätzlich verschieben – Hinweis in der UI.

export type Rechtsform = "einzel" | "freiberufler" | "kapital";
export type UstRhythmus = "kleinunternehmer" | "monat" | "quartal" | "jahr";

export type FristProfil = {
  rechtsform: Rechtsform;
  ust: UstRhythmus;
  dauerfrist: boolean;
  /** Einkommen- bzw. Körperschaftsteuer-Vorauszahlungen festgesetzt? */
  ekVorauszahlung: boolean;
  /** Gewerbesteuer-Vorauszahlungen festgesetzt? (nicht bei Freiberuflern) */
  gewstVorauszahlung: boolean;
  mitarbeiter: "keine" | "minijob" | "sv";
  lohnsteuer: "monat" | "quartal" | "jahr";
  zm: "keine" | "monat" | "quartal";
  steuerberater: boolean;
  gruendungsjahr: number;
};

export type Frist = {
  datum: string; // nach § 108 AO verschoben
  original: string;
  titel: string;
  art: "ust" | "est" | "gewst" | "lohn" | "sv" | "zm" | "erklaerung" | "hgb";
  hinweis?: string;
};

const iso = (d: Date) => d.toISOString().slice(0, 10);
const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d));

/** Ostersonntag (Gauß/Anonymous Gregorian). */
export function ostern(j: number): Date {
  const a = j % 19, b = Math.floor(j / 100), c = j % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const monat = Math.floor((h + l - 7 * m + 114) / 31), tag = ((h + l - 7 * m + 114) % 31) + 1;
  return utc(j, monat, tag);
}

/** Bundesweite gesetzliche Feiertage eines Jahres als ISO-Daten. */
export function feiertage(j: number): Set<string> {
  const o = ostern(j).getTime();
  const plus = (t: number) => iso(new Date(o + t * 864e5));
  return new Set([
    `${j}-01-01`, plus(-2), plus(1), `${j}-05-01`, plus(39), plus(50), `${j}-10-03`, `${j}-12-25`, `${j}-12-26`,
  ]);
}

/** § 108 Abs. 3 AO: Fristende am Samstag, Sonntag oder Feiertag → nächster Werktag. */
export function verschiebe(datum: string): string {
  let d = new Date(`${datum}T00:00:00Z`);
  for (let i = 0; i < 10; i++) {
    const wt = d.getUTCDay();
    if (wt !== 0 && wt !== 6 && !feiertage(d.getUTCFullYear()).has(iso(d))) break;
    d = new Date(d.getTime() + 864e5);
  }
  return iso(d);
}

const monatsEnde = (j: number, m: number) => new Date(Date.UTC(j, m, 0)).getUTCDate();

/** Drittletzter Bankarbeitstag (SV-Beiträge, § 23 SGB IV); 24.12./31.12. keine Bankarbeitstage. */
export function drittletzterBankarbeitstag(j: number, m: number): string {
  let tag = monatsEnde(j, m);
  let gezaehlt = 0;
  for (;;) {
    const d = utc(j, m, tag);
    const s = iso(d);
    const wt = d.getUTCDay();
    const bank = wt !== 0 && wt !== 6 && !feiertage(j).has(s) && !s.endsWith("-12-24") && !s.endsWith("-12-31");
    if (bank && ++gezaehlt === 3) return s;
    tag--;
  }
}

const MONAT = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

/** Alle Fristen von `von` (ISO) an für `monate` Monate. */
export function fristenFuer(p: FristProfil, von: string, monate = 12): { fristen: Frist[]; hinweise: string[] } {
  const start = new Date(`${von}T00:00:00Z`);
  const ende = iso(new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + monate, start.getUTCDate())));
  const out: Frist[] = [];
  const hinweise: string[] = [];
  const add = (original: string, titel: string, art: Frist["art"], hinweis?: string) => {
    const datum = verschiebe(original);
    if (datum >= von && datum <= ende) out.push({ datum, original, titel, art, hinweis });
  };
  const jahre = [start.getUTCFullYear() - 1, start.getUTCFullYear(), start.getUTCFullYear() + 1, start.getUTCFullYear() + 2];

  // Neugründer: Monatspflicht im Gründungs- und Folgejahr; ausgesetzt für 2021–2026 (§ 18 Abs. 2 S. 6 UStG).
  const neugruender = (j: number) => (j === p.gruendungsjahr || j === p.gruendungsjahr + 1) && j >= 2027;
  if (p.ust !== "kleinunternehmer" && [p.gruendungsjahr, p.gruendungsjahr + 1].some((j) => j >= 2027))
    hinweise.push("Neugründer: Ab 2027 gilt im Gründungs- und im Folgejahr wieder die monatliche USt-Voranmeldung (Aussetzung nur bis 2026).");

  for (const j of jahre) {
    // ---- Umsatzsteuer ----
    if (p.ust !== "kleinunternehmer" && p.ust !== "jahr") {
      const monatlich = p.ust === "monat" || neugruender(j);
      const plus = p.dauerfrist ? 1 : 0;
      if (monatlich) {
        for (let m = 1; m <= 12; m++) {
          const f = new Date(Date.UTC(j, m + plus, 10));
          add(iso(f), `USt-Voranmeldung ${MONAT[m - 1]} ${j}`, "ust", "Abgabe per ELSTER und Zahlung");
        }
        if (p.dauerfrist) add(`${j}-02-10`, `Sondervorauszahlung 1/11 + Antrag Dauerfristverlängerung ${j}`, "ust");
      } else {
        for (let q = 1; q <= 4; q++) {
          const f = new Date(Date.UTC(j, q * 3 + plus, 10));
          add(iso(f), `USt-Voranmeldung ${q}. Quartal ${j}`, "ust", "Abgabe per ELSTER und Zahlung");
        }
      }
    }
    // ---- ESt/KSt-Vorauszahlungen ----
    if (p.ekVorauszahlung)
      for (const m of [3, 6, 9, 12])
        add(`${j}-${String(m).padStart(2, "0")}-10`, `${p.rechtsform === "kapital" ? "Körperschaftsteuer" : "Einkommensteuer"}-Vorauszahlung`, "est");
    // ---- GewSt ----
    if (p.gewstVorauszahlung && p.rechtsform !== "freiberufler")
      for (const m of [2, 5, 8, 11]) add(`${j}-${String(m).padStart(2, "0")}-15`, "Gewerbesteuer-Vorauszahlung (an die Gemeinde)", "gewst");
    // ---- Lohn ----
    if (p.mitarbeiter !== "keine") {
      const lst = p.lohnsteuer === "monat" ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : p.lohnsteuer === "quartal" ? [3, 6, 9, 12] : [12];
      for (const m of lst) {
        const f = new Date(Date.UTC(j, m, 10));
        add(iso(f), `Lohnsteuer-Anmeldung (${p.lohnsteuer === "monat" ? MONAT[m - 1] : p.lohnsteuer === "quartal" ? `${m / 3}. Quartal` : "Jahr"} ${j})`, "lohn");
      }
      if (p.mitarbeiter === "sv")
        for (let m = 1; m <= 12; m++) add(drittletzterBankarbeitstag(j, m), `Sozialversicherungsbeiträge ${MONAT[m - 1]} (Beitragsnachweis 2 Arbeitstage vorher)`, "sv");
    }
    // ---- Zusammenfassende Meldung ----
    if (p.zm !== "keine") {
      const ms = p.zm === "monat" ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [3, 6, 9, 12];
      for (const m of ms) add(iso(new Date(Date.UTC(j, m, 25))), `Zusammenfassende Meldung (BZSt) ${p.zm === "monat" ? MONAT[m - 1] : `${m / 3}. Quartal`} ${j}`, "zm");
    }
    // ---- Jahreserklärungen (§ 149 AO, ab Besteuerungszeitraum 2025 ohne Übergangsregel) ----
    if (j >= 2025) {
      const frist = p.steuerberater ? iso(new Date(Date.UTC(j + 2, 2, 0))) : `${j + 1}-07-31`;
      add(frist, `Steuererklärungen ${j} (ESt/KSt, USt, GewSt)${p.steuerberater ? " – mit Steuerberater" : ""}`, "erklaerung");
    }
    // ---- Offenlegung Jahresabschluss (§ 325 HGB) ----
    if (p.rechtsform === "kapital" && j >= p.gruendungsjahr)
      out.push(...(`${j + 1}-12-31` >= von && `${j + 1}-12-31` <= ende
        ? [{ datum: `${j + 1}-12-31`, original: `${j + 1}-12-31`, titel: `Offenlegung Jahresabschluss ${j} (Unternehmensregister)`, art: "hgb" as const, hinweis: "§ 325 HGB – keine Verschiebung nach AO" }]
        : []));
  }
  if (p.ust === "kleinunternehmer") hinweise.push("Kleinunternehmer: keine USt-Voranmeldungen. E-Rechnungen empfangen musst du trotzdem können.");
  if (p.ust === "jahr") hinweise.push("Befreit von Voranmeldungen (Vorjahressteuer bis 2.000 €): nur die Jahreserklärung.");
  hinweise.push("Zahlungen per Überweisung bis 3 Tage nach Fälligkeit ohne Säumniszuschlag (Schonfrist), bei Lastschrift gilt der Fälligkeitstag.");
  out.sort((a, b) => a.datum.localeCompare(b.datum) || a.titel.localeCompare(b.titel));
  return { fristen: out, hinweise };
}
