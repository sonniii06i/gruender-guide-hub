// Finanzplan für Gründungszuschuss, Einstiegsgeld, Bank und IHK-Stellungnahme:
// Kapitalbedarf, Finanzierung, Rentabilität (3 Jahre), Liquidität (12 Monate),
// Lebenshaltungskosten. Reine Rechenlogik – UI und PDF in GruendungsUnterlagen.tsx.
//
// Vereinfachungen (stehen auch im PDF):
// - Beträge netto, Umsatzsteuer bleibt außen vor (durchlaufender Posten).
// - Investitionen linear abgeschrieben, Wareneinsatz im Monat des Umsatzes bezahlt.
// - Gründungszuschuss/Einstiegsgeld zählen zur Liquidität, nicht zum Gewinn (steuerfrei).
// - Einkommensteuer ist nicht eingerechnet; dafür gibt es die Steuerrücklage.

export type Posten = { name: string; betrag: number };

export type Darlehen = { betrag: number; zinsProzent: number; laufzeitJahre: number; tilgungsfreiMonate: number };

export type FinanzplanEingabe = {
  investitionen: Posten[];
  nutzungsdauerJahre: number;
  gruendungskosten: Posten[];
  reserve: number;
  eigenkapital: number;
  darlehen: Darlehen;
  zuschussMonatlich: number;
  zuschussMonate: number;
  umsatzMonat1: number;
  wachstumMonatProzent: number;
  wachstumJahr2Prozent: number;
  wachstumJahr3Prozent: number;
  wareneinsatzProzent: number;
  /** Kunden zahlen einen Monat später (Rechnung mit Zahlungsziel). */
  zahlungszielEinMonat: boolean;
  kosten: Posten[];
  kostenSteigerungProzent: number;
  personalMonat: number;
  privat: Posten[];
  /** Andere Einkünfte im Haushalt, die die Lebenshaltung mittragen (z. B. Partner). */
  andereEinkuenfteMonat: number;
  steuerruecklageProzent: number;
};

export const summe = (p: Posten[]) => p.reduce((n, x) => n + (Number(x.betrag) || 0), 0);
const r0 = (n: number) => Math.round(n);

export type DarlehensMonat = { zins: number; tilgung: number; rest: number };

/** Monatsplan: erst nur Zinsen (tilgungsfrei), danach Annuität. */
export function darlehensplan(d: Darlehen, monate: number): DarlehensMonat[] {
  const out: DarlehensMonat[] = [];
  let rest = Math.max(0, d.betrag || 0);
  const i = (d.zinsProzent || 0) / 100 / 12;
  const n = Math.max(1, Math.round((d.laufzeitJahre || 0) * 12) - (d.tilgungsfreiMonate || 0));
  const rate = rest === 0 ? 0 : i === 0 ? rest / n : (rest * i) / (1 - Math.pow(1 + i, -n));
  for (let m = 0; m < monate; m++) {
    const zins = rest * i;
    const tilgung = m < (d.tilgungsfreiMonate || 0) || rest <= 0 ? 0 : Math.min(rest, rate - zins);
    rest -= tilgung;
    out.push({ zins, tilgung, rest });
  }
  return out;
}

export type Rentabilitaet = {
  jahr: number;
  umsatz: number;
  wareneinsatz: number;
  rohertrag: number;
  kosten: number;
  personal: number;
  abschreibung: number;
  zinsen: number;
  gewinn: number;
  steuerruecklage: number;
  lebenshaltung: number;
  /** Gewinn − Steuerrücklage − (Lebenshaltung − andere Einkünfte). Positiv = die Gründung trägt dich. */
  ueberschuss: number;
};

export type LiquiditaetMonat = {
  monat: number;
  einUmsatz: number;
  einZuschuss: number;
  einKapital: number;
  ausInvest: number;
  ausWare: number;
  ausKosten: number;
  ausPersonal: number;
  ausZinsTilgung: number;
  ausPrivat: number;
  saldo: number;
  bestand: number;
};

export type Finanzplan = {
  kapitalbedarf: { investitionen: number; gruendungskosten: number; reserve: number; summe: number };
  finanzierung: { eigenkapital: number; darlehen: number; summe: number; luecke: number };
  rentabilitaet: Rentabilitaet[];
  liquiditaet: LiquiditaetMonat[];
  lebenshaltungMonat: number;
  /** Monatsumsatz, ab dem Kosten, Abschreibung, Zinsen, Steuerrücklage und Lebenshaltung gedeckt sind. */
  mindestumsatzMonat: number;
  tiefsterBestand: { monat: number; bestand: number };
  signale: { stufe: "ok" | "warnung" | "kritisch"; text: string }[];
};

export function rechneFinanzplan(e: FinanzplanEingabe): Finanzplan {
  const investitionen = summe(e.investitionen);
  const gruendungskosten = summe(e.gruendungskosten);
  const reserve = Math.max(0, e.reserve || 0);
  const bedarf = investitionen + gruendungskosten + reserve;
  const fin = Math.max(0, e.eigenkapital || 0) + Math.max(0, e.darlehen.betrag || 0);

  const kostenMonat = summe(e.kosten);
  const lebenshaltungMonat = summe(e.privat);
  const privatEntnahme = Math.max(0, lebenshaltungMonat - Math.max(0, e.andereEinkuenfteMonat || 0));
  const wareQuote = Math.min(100, Math.max(0, e.wareneinsatzProzent || 0)) / 100;
  const nd = Math.max(1, e.nutzungsdauerJahre || 3);
  const afaJahr = investitionen / nd;
  const kredit = darlehensplan(e.darlehen, 36);
  const steuerQuote = Math.max(0, e.steuerruecklageProzent || 0) / 100;

  // Umsatz Jahr 1 monatlich, Jahr 2/3 als Jahreswerte.
  const g = (e.wachstumMonatProzent || 0) / 100;
  const umsatzM = Array.from({ length: 12 }, (_, i) => Math.max(0, e.umsatzMonat1 || 0) * Math.pow(1 + g, i));
  const umsatzJ1 = umsatzM.reduce((a, b) => a + b, 0);
  const umsatzJ = [umsatzJ1, umsatzJ1 * (1 + (e.wachstumJahr2Prozent || 0) / 100)];
  umsatzJ.push(umsatzJ[1] * (1 + (e.wachstumJahr3Prozent || 0) / 100));

  const rentabilitaet: Rentabilitaet[] = umsatzJ.map((umsatz, j) => {
    const steig = Math.pow(1 + (e.kostenSteigerungProzent || 0) / 100, j);
    const kosten = kostenMonat * 12 * steig;
    const personal = (e.personalMonat || 0) * 12 * steig;
    const zinsen = kredit.slice(j * 12, j * 12 + 12).reduce((n, m) => n + m.zins, 0);
    const abschreibung = j < nd ? afaJahr : 0;
    // Gründungskosten sind im ersten Jahr Betriebsausgaben.
    const einmalig = j === 0 ? gruendungskosten : 0;
    const wareneinsatz = umsatz * wareQuote;
    const rohertrag = umsatz - wareneinsatz;
    const gewinn = rohertrag - kosten - personal - abschreibung - zinsen - einmalig;
    const steuerruecklage = Math.max(0, gewinn) * steuerQuote;
    return {
      jahr: j + 1,
      umsatz: r0(umsatz),
      wareneinsatz: r0(wareneinsatz),
      rohertrag: r0(rohertrag),
      kosten: r0(kosten + einmalig),
      personal: r0(personal),
      abschreibung: r0(abschreibung),
      zinsen: r0(zinsen),
      gewinn: r0(gewinn),
      steuerruecklage: r0(steuerruecklage),
      lebenshaltung: r0(lebenshaltungMonat * 12),
      ueberschuss: r0(gewinn - steuerruecklage - privatEntnahme * 12),
    };
  });

  const liquiditaet: LiquiditaetMonat[] = [];
  let bestand = 0;
  for (let m = 0; m < 12; m++) {
    const einUmsatz = e.zahlungszielEinMonat ? (m === 0 ? 0 : umsatzM[m - 1]) : umsatzM[m];
    const einZuschuss = m < (e.zuschussMonate || 0) ? Math.max(0, e.zuschussMonatlich || 0) : 0;
    const einKapital = m === 0 ? fin : 0;
    const ausInvest = m === 0 ? investitionen + gruendungskosten : 0;
    const ausWare = umsatzM[m] * wareQuote;
    const ausZinsTilgung = kredit[m].zins + kredit[m].tilgung;
    const saldo = einUmsatz + einZuschuss + einKapital - ausInvest - ausWare - kostenMonat - (e.personalMonat || 0) - ausZinsTilgung - privatEntnahme;
    bestand += saldo;
    liquiditaet.push({
      monat: m + 1,
      einUmsatz: r0(einUmsatz),
      einZuschuss: r0(einZuschuss),
      einKapital: r0(einKapital),
      ausInvest: r0(ausInvest),
      ausWare: r0(ausWare),
      ausKosten: r0(kostenMonat),
      ausPersonal: r0(e.personalMonat || 0),
      ausZinsTilgung: r0(ausZinsTilgung),
      ausPrivat: r0(privatEntnahme),
      saldo: r0(saldo),
      bestand: r0(bestand),
    });
  }

  // Mindestumsatz: Rohertragsquote × U = Fixkosten + AfA + Zinsen + Entnahme, Steuerrücklage auf den Gewinn.
  const fixMonat = kostenMonat + (e.personalMonat || 0) + afaJahr / 12 + (kredit.slice(0, 12).reduce((n, k) => n + k.zins, 0) / 12);
  const quote = 1 - wareQuote;
  const mindestumsatzMonat = quote <= 0 ? Infinity : r0((fixMonat + privatEntnahme / Math.max(0.01, 1 - steuerQuote)) / quote);

  const tief = liquiditaet.reduce((a, b) => (b.bestand < a.bestand ? b : a), liquiditaet[0]);
  const signale: Finanzplan["signale"] = [];
  const luecke = bedarf - fin;
  if (luecke > 0) signale.push({ stufe: "kritisch", text: `Finanzierungslücke von ${luecke.toLocaleString("de-DE")} €: Der Kapitalbedarf ist nicht gedeckt.` });
  else signale.push({ stufe: "ok", text: "Der Kapitalbedarf ist vollständig finanziert." });
  if (tief.bestand < 0)
    signale.push({ stufe: "kritisch", text: `Liquidität wird in Monat ${tief.monat} negativ (${tief.bestand.toLocaleString("de-DE")} €). Reserve, Finanzierung oder Anlauf prüfen.` });
  else signale.push({ stufe: "ok", text: `Die Liquidität bleibt alle 12 Monate positiv (tiefster Stand ${tief.bestand.toLocaleString("de-DE")} € in Monat ${tief.monat}).` });
  const j1 = rentabilitaet[0];
  const j3 = rentabilitaet[2];
  if (j3.ueberschuss < 0)
    signale.push({ stufe: "kritisch", text: "Auch im dritten Jahr deckt der Gewinn deine Lebenshaltung nicht – so ist das Vorhaben nicht tragfähig." });
  else if (j1.ueberschuss < 0)
    signale.push({ stufe: "warnung", text: "Im ersten Jahr reicht der Gewinn noch nicht für deine Lebenshaltung – üblich in der Anlaufphase, muss aber durch Zuschuss oder Reserve gedeckt sein." });
  else signale.push({ stufe: "ok", text: "Schon im ersten Jahr deckt der Gewinn deine Lebenshaltung." });
  if (umsatzM[11] > 0 && umsatzM[11] < mindestumsatzMonat * 0.6)
    signale.push({ stufe: "warnung", text: "Dein Umsatz in Monat 12 liegt deutlich unter dem Mindestumsatz – prüfe, ob die Planung realistisch ist." });
  if (g > 0.15) signale.push({ stufe: "warnung", text: "Mehr als 15 % Wachstum pro Monat gilt bei Prüfern als sehr optimistisch. Begründe die Zahlen (Vorverträge, Anfragen, Marktdaten)." });

  return {
    kapitalbedarf: { investitionen: r0(investitionen), gruendungskosten: r0(gruendungskosten), reserve: r0(reserve), summe: r0(bedarf) },
    finanzierung: { eigenkapital: r0(e.eigenkapital || 0), darlehen: r0(e.darlehen.betrag || 0), summe: r0(fin), luecke: r0(Math.max(0, luecke)) },
    rentabilitaet,
    liquiditaet,
    lebenshaltungMonat: r0(lebenshaltungMonat),
    mindestumsatzMonat,
    tiefsterBestand: { monat: tief.monat, bestand: tief.bestand },
    signale,
  };
}

export const BEISPIEL: FinanzplanEingabe = {
  investitionen: [
    { name: "Laptop & Technik", betrag: 2500 },
    { name: "Büroausstattung", betrag: 1000 },
  ],
  nutzungsdauerJahre: 3,
  gruendungskosten: [
    { name: "Gewerbeanmeldung & Beratung", betrag: 400 },
    { name: "Website & Logo", betrag: 1200 },
  ],
  reserve: 3000,
  eigenkapital: 5000,
  darlehen: { betrag: 5000, zinsProzent: 6, laufzeitJahre: 5, tilgungsfreiMonate: 6 },
  zuschussMonatlich: 0,
  zuschussMonate: 6,
  umsatzMonat1: 2500,
  wachstumMonatProzent: 6,
  wachstumJahr2Prozent: 20,
  wachstumJahr3Prozent: 10,
  wareneinsatzProzent: 10,
  zahlungszielEinMonat: true,
  kosten: [
    { name: "Miete / Coworking", betrag: 250 },
    { name: "Versicherungen (Betrieb)", betrag: 60 },
    { name: "Software & Tools", betrag: 80 },
    { name: "Marketing", betrag: 300 },
    { name: "Telefon & Internet", betrag: 50 },
    { name: "Buchhaltung / Steuerberater", betrag: 120 },
    { name: "Sonstiges", betrag: 100 },
  ],
  kostenSteigerungProzent: 3,
  personalMonat: 0,
  privat: [
    { name: "Miete & Nebenkosten", betrag: 750 },
    { name: "Kranken- & Pflegeversicherung", betrag: 260 },
    { name: "Altersvorsorge", betrag: 100 },
    { name: "Lebensmittel & Haushalt", betrag: 400 },
    { name: "Mobilität", betrag: 100 },
    { name: "Sonstiges (Versicherungen, Freizeit)", betrag: 190 },
  ],
  andereEinkuenfteMonat: 0,
  steuerruecklageProzent: 20,
};
