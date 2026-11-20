// PDF-Rechnung → Vorschlag für eine XRechnung (Tool /pdf-in-e-rechnung-umwandeln).
//
// Läuft komplett im Browser: Der Text kommt aus der Textebene des PDFs
// (pdfjs, src/lib/pdfText.ts), hier wird er zu Feldern, Positionen und Summen.
// Alles ist ein VORSCHLAG: Der Nutzer prüft jedes Feld, bevor die XRechnung
// entsteht. Erzeugt wird erst, wenn die Summen der Positionen auf den Cent
// den Summen im PDF entsprechen (summenAbgleich) – sonst stünde in XML und
// PDF eine andere Rechnung (Abschnitt 14c.1 Abs. 4a UStAE, BMF 15.10.2025).
//
// Stand der Rechtslage: 20.11.2026 (Quellen auf der Seite und im Bericht).

import type { ErRechnung } from "@/lib/eRechnungLesen";
import { ibanGueltig } from "@/lib/eRechnungLesen";
import { xrSummen, type XrDaten, type XrModus } from "@/lib/xrechnung";

export type PdfTextTeil = { str: string; x: number; y: number; breite: number; hoehe: number; seite: number };
export type PdfZeile = { text: string; zellen: { text: string; x: number }[]; seite: number; links: string; rechts: string };
export type PdfPosition = XrDaten["positionen"][number] & { einheitText?: string; pruefen?: string };
export type PdfSummen = { netto?: number; ust?: number; brutto?: number; saetze: { satz: number; betrag: number }[] };

export type PdfVorschlag = {
  daten: XrDaten;
  summen: PdfSummen;
  /** Felder, die aus dem PDF erkannt wurden (für die Markierung im Formular). */
  erkannt: string[];
  hinweise: string[];
  bruttopreise: boolean;
};

const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

// ---------------------------------------------------------------- Zeilen

/** Text-Teile zu Zeilen: gleiche Grundlinie, links nach rechts; große Lücken trennen Zellen. */
export function zeilenAusTeilen(teile: PdfTextTeil[], seitenBreite?: number): PdfZeile[] {
  const breite = seitenBreite ?? Math.max(600, ...teile.map((t) => t.x + t.breite));
  const sortiert = teile
    .filter((t) => t.str.trim())
    .sort((a, b) => a.seite - b.seite || b.y - a.y || a.x - b.x);
  const gruppen: PdfTextTeil[][] = [];
  for (const t of sortiert) {
    const g = gruppen[gruppen.length - 1];
    const toleranz = Math.max(2, (t.hoehe || 10) * 0.45);
    if (g && g[0].seite === t.seite && Math.abs(g[0].y - t.y) <= toleranz) g.push(t);
    else gruppen.push([t]);
  }
  return gruppen.map((g) => {
    g.sort((a, b) => a.x - b.x);
    const zellen: { text: string; x: number }[] = [];
    let ende = -Infinity;
    for (const t of g) {
      const h = t.hoehe || 10;
      const luecke = t.x - ende;
      const z = zellen[zellen.length - 1];
      if (z && luecke < h * 0.9) z.text += (luecke > h * 0.12 && !z.text.endsWith(" ") && !t.str.startsWith(" ") ? " " : "") + t.str;
      else zellen.push({ text: t.str, x: t.x });
      ende = Math.max(ende, t.x + t.breite);
    }
    for (const z of zellen) z.text = z.text.replace(/\s+/g, " ").trim();
    const mitte = breite * 0.5;
    return {
      text: zellen.map((z) => z.text).join("  "),
      zellen,
      seite: g[0].seite,
      links: zellen.filter((z) => z.x < mitte).map((z) => z.text).join("  "),
      rechts: zellen.filter((z) => z.x >= mitte).map((z) => z.text).join("  "),
    };
  });
}

/** Für Tests und Text-Eingaben: reiner Text, Spalten mit zwei oder mehr Leerzeichen getrennt. */
export function zeilenAusText(text: string): PdfZeile[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.replace(/\t/g, "  ").trimEnd())
    .filter((l) => l.trim())
    .map((l) => {
      const zellen: { text: string; x: number }[] = [];
      const re = /\S+(?: \S+)*/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(l))) zellen.push({ text: m[0], x: m.index * 6 });
      return {
        text: zellen.map((z) => z.text).join("  "),
        zellen,
        seite: 1,
        links: zellen.filter((z) => z.x < 300).map((z) => z.text).join("  "),
        rechts: zellen.filter((z) => z.x >= 300).map((z) => z.text).join("  "),
      };
    });
}

// ---------------------------------------------------------------- Werte

const WAEHRUNG = /^(?:€|EUR|Euro)$/i;
/** Betrag mit genau zwei Nachkommastellen, deutsch („1.234,56“) oder englisch („1,234.56“). */
export function geldWert(token: string): number | null {
  let t = token.replace(/^(?:€|EUR)/i, "").replace(/(?:€|EUR)$/i, "").replace(/[−–]/g, "-").trim();
  let neg = false;
  if (/^-/.test(t)) { neg = true; t = t.slice(1); }
  if (/-$/.test(t)) { neg = true; t = t.slice(0, -1); }
  let n: number | null = null;
  if (/^(?:\d{1,3}(?:[.'  ]\d{3})+|\d+),\d{2}$/.test(t)) n = Number(t.replace(/[.'  ]/g, "").replace(",", "."));
  else if (/^(?:\d{1,3}(?:,\d{3})+|\d+)\.\d{2}$/.test(t)) n = Number(t.replace(/,/g, ""));
  if (n === null || !Number.isFinite(n)) return null;
  return neg ? -n : n;
}
const zahlWert = (t: string): number | null => (/^\d+(?:,\d{1,3})?$/.test(t) ? Number(t.replace(",", ".")) : null);
const prozentWert = (t: string): number | null => {
  const m = t.match(/^(\d{1,2}(?:[,.]\d{1,2})?)%$/);
  return m ? Number(m[1].replace(",", ".")) : null;
};
/** Alle Beträge einer Zeile (Tausenderpunkte, Minus, Währung erlaubt). */
export function betraege(zeile: string): number[] {
  return normalisiere(zeile)
    .split(/\s+/)
    .map(geldWert)
    .filter((n): n is number => n !== null);
}
const normalisiere = (s: string) =>
  s
    .replace(/(\d)\s+%/g, "$1%")
    .replace(/(\d)\s+(€|EUR)\b/g, "$1$2")
    .replace(/(€|EUR)\s+(-?\d)/g, "$1$2")
    .replace(/(\d) (\d{3}(?:[.,]\d{2}))\b/g, "$1$2");

const MONATE = ["januar", "februar", "märz", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "dezember"];
const iso = (j: number, m: number, t: number) => {
  const jahr = j < 100 ? 2000 + j : j;
  const d = new Date(Date.UTC(jahr, m - 1, t));
  if (d.getUTCMonth() !== m - 1 || d.getUTCDate() !== t || jahr < 2000 || jahr > 2100) return "";
  return d.toISOString().slice(0, 10);
};
/** Alle Datumsangaben einer Zeile als ISO (TT.MM.JJJJ, TT.MM.JJ, „12. November 2026“, JJJJ-MM-TT). */
export function daten(zeile: string): string[] {
  const out: string[] = [];
  const re = /(\d{4})-(\d{2})-(\d{2})|\b(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{4}|\d{2})\b|\b(\d{1,2})\.\s*([A-Za-zäÄ]+)\s+(\d{4})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(zeile))) {
    let d = "";
    if (m[1]) d = iso(+m[1], +m[2], +m[3]);
    else if (m[4]) d = iso(+m[6], +m[5], +m[4]);
    else {
      const mon = MONATE.indexOf(m[8].toLowerCase()) + 1;
      if (mon) d = iso(+m[9], mon, +m[7]);
    }
    if (d) out.push(d);
  }
  return out;
}
const monatsZeitraum = (zeile: string): { von: string; bis: string } | null => {
  const m = zeile.toLowerCase().match(/\b(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)\s+(\d{4})\b/);
  if (!m) return null;
  const mon = MONATE.indexOf(m[1]) + 1;
  const ende = new Date(Date.UTC(+m[2], mon, 0)).getUTCDate();
  return { von: iso(+m[2], mon, 1), bis: iso(+m[2], mon, ende) };
};
const tageZwischen = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);

// ---------------------------------------------------------------- Einheiten

const EINHEITEN: [RegExp, string, string][] = [
  [/^(?:stk\.?|stck\.?|stück|st\.?|x|pcs\.?|pc\.?|anz\.?)$/i, "C62", "Stück"],
  [/^(?:std\.?|stunden?|h|hrs?\.?)$/i, "HUR", "Stunde"],
  [/^(?:min\.?|minuten?)$/i, "MIN", "Minute"],
  [/^(?:tage?|tg\.?|pt)$/i, "DAY", "Tag"],
  [/^(?:wochen?|wo\.?)$/i, "WEE", "Woche"],
  [/^(?:monate?|mon\.?|mt\.?)$/i, "MON", "Monat"],
  [/^(?:jahre?|jhr\.?)$/i, "ANN", "Jahr"],
  [/^(?:pauschal|pausch\.?|psch\.?|pschl\.?|pauschale)$/i, "LS", "pauschal"],
  [/^(?:km)$/i, "KMT", "km"],
  [/^(?:m)$/i, "MTR", "m"],
  [/^(?:m²|m2|qm)$/i, "MTK", "m²"],
  [/^(?:kg)$/i, "KGM", "kg"],
  [/^(?:l|liter)$/i, "LTR", "Liter"],
];
export const einheitAus = (t: string): { code: string; text: string } | null => {
  for (const [re, code, text] of EINHEITEN) if (re.test(t)) return { code, text };
  return null;
};

// ---------------------------------------------------------------- Positionen

const SUMMEN_WORT = /\b(?:zwischensumme|summe|gesamt(?:betrag|summe)?|netto(?:betrag)?|brutto(?:betrag)?|rechnungsbetrag|endbetrag|zahlbetrag|zu zahlen|übertrag|uebertrag|mwst|ust|umsatzsteuer|mehrwertsteuer|total|skonto|anzahlung|abschlag)\b/i;
const KEIN_POSTEN = /\b(?:iban|bic|swift|ust-?id|steuer-?nr|steuernummer|telefon|tel\.|fax|e-mail|www\.|bank|konto|amtsgericht|hrb|geschäftsführ|seite \d|page \d)\b|@/i;
const KOPF = /\b(?:pos\.?|position|menge|anzahl|bezeichnung|beschreibung|artikel|leistung|einzelpreis|e-preis|ep|gesamtpreis|gp|betrag|preis|einheit)\b/gi;

/** Eine Tabellenzeile als Position lesen; null, wenn es keine ist. */
export function leseZeileAlsPosition(zeile: string): (PdfPosition & { satzAusZeile: boolean }) | null {
  if (KEIN_POSTEN.test(zeile)) return null;
  const tokens = normalisiere(zeile).split(/\s+/).filter(Boolean);
  // Rechter Zahlenblock: Beträge, Prozente, Mengen, Einheiten, Währung
  let i = tokens.length - 1;
  const rechts: string[] = [];
  while (i >= 0) {
    const t = tokens[i];
    if (geldWert(t) !== null || prozentWert(t) !== null || zahlWert(t) !== null || einheitAus(t) || WAEHRUNG.test(t)) {
      rechts.unshift(t);
      i--;
    } else break;
  }
  let links = tokens.slice(0, i + 1);
  const geld = rechts.map(geldWert).filter((n): n is number => n !== null);
  if (!geld.length) return null;
  let text = links.join(" ");
  if (!/\p{L}{2,}/u.test(text) || SUMMEN_WORT.test(text)) return null;

  let satz: number | null = null;
  let einheit: { code: string; text: string } | null = null;
  let menge: number | null = null;
  for (const t of rechts) {
    const p = prozentWert(t);
    if (p !== null) satz = p;
    const e = einheitAus(t);
    if (e && !einheit) einheit = e;
  }
  // Menge rechts als reine Zahl vor dem ersten Betrag (z. B. „3,5 Std 85,00 297,50“)
  // Zahlen davor gehören zur Bezeichnung („iPhone 15  1 Stk  799,00“).
  const ersterGeldIdx = rechts.findIndex((t) => geldWert(t) !== null);
  let mengeIdx = -1;
  for (let k = 0; k < ersterGeldIdx; k++) if (zahlWert(rechts[k]) !== null) mengeIdx = k;
  // Mit nur einem Betrag zählt eine Zahl nur mit Einheit dahinter als Menge („2 Stk 49,98“, nicht „Wartung 2026 1.200,00“).
  if (mengeIdx >= 0 && geld.length === 1 && !einheitAus(rechts[mengeIdx + 1] ?? "")) mengeIdx = -1;
  let mengeRechts: { token: string; wert: number } | null = null;
  if (mengeIdx >= 0) {
    menge = zahlWert(rechts[mengeIdx]);
    mengeRechts = { token: rechts[mengeIdx], wert: menge! };
    links = [...links, ...rechts.slice(0, mengeIdx).filter((t) => !einheitAus(t))];
  } else {
    links = [...links, ...rechts.slice(0, Math.max(0, ersterGeldIdx)).filter((t) => zahlWert(t) !== null)];
  }
  // Links: Positionsnummer und/oder Menge + Einheit am Zeilenanfang
  if (links.length >= 2 && /^\d{1,3}\.?$/.test(links[0])) {
    const e1 = einheitAus(links[1]);
    if (e1 && menge === null) {
      menge = Number(links[0].replace(".", ""));
      einheit = einheit ?? e1;
      links = links.slice(2);
    } else if (links.length >= 3 && zahlWert(links[1]) !== null && einheitAus(links[2])) {
      if (menge === null) menge = zahlWert(links[1]);
      einheit = einheit ?? einheitAus(links[2]);
      links = links.slice(3);
    } else {
      links = links.slice(1);
    }
  } else if (links.length >= 2 && zahlWert(links[0]) !== null && einheitAus(links[1])) {
    if (menge === null) menge = zahlWert(links[0]);
    einheit = einheit ?? einheitAus(links[1]);
    links = links.slice(2);
  }
  text = links.join(" ").trim();
  if (!/\p{L}{2,}/u.test(text)) return null;

  const gesamt = geld[geld.length - 1];
  let einzel: number | null = geld.length >= 2 ? geld[geld.length - 2] : null;
  if (geld.length >= 3 && menge === null) {
    const m3 = geld[geld.length - 3];
    if (einzel !== null && Math.abs(r2(m3 * einzel) - gesamt) <= 0.01) menge = m3;
  }
  let pruefen: string | undefined;
  const passt = (m: number, e: number) => Math.abs(r2(m * e) - gesamt) <= 0.01;
  if (einzel !== null) {
    if (menge !== null && passt(menge, einzel)) {
      /* ok */
    } else if (Math.abs(Math.abs(einzel) - Math.abs(gesamt)) <= 0.01) {
      menge = 1;
    } else {
      const q = gesamt / einzel;
      const rund = Math.round(q * 1000) / 1000;
      if (q > 0 && passt(rund, einzel)) menge = rund;
      else {
        menge = 1;
        einzel = gesamt;
        pruefen = "Menge und Einzelpreis prüfen";
      }
    }
  } else if (menge !== null && menge > 0) {
    const e = Math.round((gesamt / menge) * 10000) / 10000;
    if (passt(menge, e)) einzel = e;
    else {
      menge = 1;
      einzel = gesamt;
    }
  } else {
    menge = 1;
    einzel = gesamt;
  }
  if (gesamt < 0 && einzel! > 0) einzel = -einzel!;
  // Rechte Zahl war doch keine Menge: zurück in die Bezeichnung
  if (mengeRechts && menge !== mengeRechts.wert) text = `${text} ${mengeRechts.token}`;
  return {
    beschreibung: text,
    menge: menge!,
    einzelpreisNetto: einzel!,
    ustSatz: satz ?? NaN,
    einheit: einheit?.code,
    einheitText: einheit?.text,
    pruefen,
    satzAusZeile: satz !== null,
  };
}

// ---------------------------------------------------------------- Summen

const NETTO = /\b(?:netto(?:betrag|summe)?|summe netto|gesamt netto|nettosumme|zwischensumme|warenwert|rechnungsbetrag netto)\b/i;
const BRUTTO_STARK = /\b(?:brutto(?:betrag|summe)?|gesamtbetrag|rechnungsbetrag|endbetrag|gesamtsumme|zu zahlen(?:der betrag)?|zahlbetrag|summe brutto|gesamt brutto|rechnungssumme|total)\b/i;
const BRUTTO_SCHWACH = /^(?:gesamt|summe)\b/i;
const STEUER = /\b(?:ust|mwst|umsatzsteuer|mehrwertsteuer|vat)\b/i;
const STEUER_NICHT = /ust-?id|ust\.?-?idnr|identifikationsnummer|steuernummer|steuer-?nr|befreit|§|gemäß|reverse|kleinunternehmer|enthält keine|ohne ust|nicht ausgewiesen/i;

export function leseSummen(zeilen: PdfZeile[]): PdfSummen {
  const s: PdfSummen = { saetze: [] };
  let bruttoSchwach: number | undefined;
  for (const z of zeilen) {
    const t = normalisiere(z.text);
    const b = betraege(t);
    if (!b.length) continue;
    const letzter = b[b.length - 1];
    if (STEUER.test(t) && !STEUER_NICHT.test(t) && !NETTO.test(t.replace(/zzgl\.?|inkl\.?/gi, "")) && !/brutto/i.test(t)) {
      const p = t.match(/(\d{1,2}(?:[,.]\d{1,2})?)%/);
      const satz = p ? Number(p[1].replace(",", ".")) : NaN;
      if (!s.saetze.some((x) => x.satz === satz && x.betrag === letzter) || Number.isNaN(satz)) s.saetze.push({ satz, betrag: letzter });
      continue;
    }
    if (NETTO.test(t) && !/brutto/i.test(t)) s.netto = letzter;
    else if (BRUTTO_STARK.test(t) && !/\bnetto\b/i.test(t)) s.brutto = letzter;
    else if (BRUTTO_SCHWACH.test(t.trim()) && !/\bnetto\b/i.test(t)) bruttoSchwach = letzter;
  }
  if (s.brutto === undefined && bruttoSchwach !== undefined) s.brutto = bruttoSchwach;
  if (s.saetze.length) s.ust = r2(s.saetze.reduce((n, x) => n + x.betrag, 0));
  return s;
}

// ---------------------------------------------------------------- Kopfdaten

const wertNachLabel = (zeilen: PdfZeile[], label: RegExp, wert: RegExp): string => {
  for (let i = 0; i < zeilen.length; i++) {
    const z = zeilen[i];
    for (let k = 0; k < z.zellen.length; k++) {
      const c = z.zellen[k].text;
      const lm = c.match(label);
      if (!lm) continue;
      const rest = c.slice((lm.index ?? 0) + lm[0].length);
      const w = rest.match(wert) ?? z.zellen[k + 1]?.text.match(wert);
      if (w) return (w[1] ?? w[0]).trim();
      // Wert eine Zeile tiefer in derselben Spalte (Kopf-Tabellen)
      const unten = zeilen[i + 1]?.zellen.find((u) => Math.abs(u.x - z.zellen[k].x) < 25);
      const w2 = unten?.text.match(wert);
      if (w2) return (w2[1] ?? w2[0]).trim();
    }
  }
  return "";
};

const PLZ_ORT = /^(?:D-|DE-)?(\d{5})\s+(\p{Lu}[\p{L} .\-()/]+?)$/u;
const ANREDE = /^(?:herrn?|frau|firma|z\.?\s?hd\.?|an|rechnung an|rechnungsempfänger|kunde|empfänger)[:]?$/i;

type Adresse = { name: string; strasse: string; plzOrt: string; land?: string };
const blockVor = (zellen: string[], idx: number): Adresse => {
  const plzOrt = zellen[idx].replace(/^(?:D-|DE-)/, "");
  let strasse = "";
  let j = idx - 1;
  if (j >= 0 && /\d/.test(zellen[j]) && !PLZ_ORT.test(zellen[j])) strasse = zellen[j--];
  const namen: string[] = [];
  while (j >= 0 && namen.length < 2) {
    const c = zellen[j].trim();
    if (!c || ANREDE.test(c) || /[·•|]/.test(c) || PLZ_ORT.test(c) || c.length > 70) break;
    namen.unshift(c);
    j--;
  }
  return { name: namen[0] ?? "", strasse, plzOrt };
};

/** Absenderzeile über dem Anschriftfeld: „Muster GmbH · Hauptstr. 1 · 10115 Berlin“. */
const leseAbsenderzeile = (z: string): Adresse | null => {
  if (!/[·•|]|\s[-–]\s|,\s/.test(z) || z.length > 140) return null;
  const teile = z.split(/\s*[·•|]\s*|\s+[-–]\s+|,\s+/).map((t) => t.trim()).filter(Boolean);
  const pi = teile.findIndex((t) => PLZ_ORT.test(t.replace(/^(?:D-|DE-)/, "")));
  if (pi < 1) return null;
  const strasse = pi >= 2 ? teile[pi - 1] : /\d/.test(teile[0]) ? teile[0] : "";
  const name = pi >= 2 || !strasse ? teile[0] : "";
  if (!name) return null;
  return { name, strasse, plzOrt: teile[pi].replace(/^(?:D-|DE-)/, "") };
};

// ---------------------------------------------------------------- Hauptfunktion

export function leereDaten(): XrDaten {
  return {
    verkaeufer: { name: "", strasse: "", plzOrt: "", steuernummer: "", ustId: "", iban: "", bic: "", email: "", telefon: "", kontaktName: "" },
    kunde: { name: "", strasse: "", plzOrt: "", land: "Deutschland", ustId: "", email: "" },
    kaeuferReferenz: "",
    rechnungsnummer: "",
    rechnungsdatum: "",
    leistungsdatum: "",
    zahlungsziel: NaN,
    modus: "standard",
    positionen: [],
  };
}

export function lesePdfRechnung(zeilen: PdfZeile[]): PdfVorschlag {
  const d = leereDaten();
  const erkannt: string[] = [];
  const hinweise: string[] = [];
  const voll = zeilen.map((z) => z.text).join("\n");
  const setze = (feld: string, wert: string | undefined, schreib: (w: string) => void) => {
    if (wert) {
      schreib(wert);
      erkannt.push(feld);
    }
  };

  // Rechnungsnummer
  const nr =
    wertNachLabel(zeilen, /\b(?:rechnungs-?\s?(?:nummer|nr\.?)|rechnung\s+nr\.?|rechnung\s+no\.?|beleg-?\s?(?:nummer|nr\.?)|invoice\s+(?:no\.?|number))\s*[:#]?/i, /^\s*[:#]?\s*([A-Z0-9][A-Z0-9\-/_.]*\d[A-Z0-9\-/_.]*)/i) ||
    (voll.match(/^\s*Rechnung\s+(?!an\b|vom\b|für\b)([A-Z0-9][A-Z0-9\-/_.]*\d[A-Z0-9\-/_.]*)\s*$/im)?.[1] ?? "");
  setze("rechnungsnummer", nr, (w) => (d.rechnungsnummer = w));

  // Datum, Leistungsdatum, Leistungszeitraum
  const DATUM = /(\d{1,2}\.\s?\d{1,2}\.\s?\d{2,4}|\d{4}-\d{2}-\d{2}|\d{1,2}\.\s*[A-Za-zä]+\s+\d{4})/;
  const rd = wertNachLabel(zeilen, /\b(?:rechnungsdatum|belegdatum|invoice date|rechnung vom|datum)\b\s*:?/i, DATUM);
  let rDatum = rd ? daten(rd)[0] : "";
  if (!rDatum) {
    const z = zeilen.slice(0, 30).find((x) => daten(x.text).length && !/leistung|liefer|fällig|zahlbar|zeitraum|bis|geboren/i.test(x.text));
    rDatum = z ? daten(z.text)[0] : "";
  }
  setze("rechnungsdatum", rDatum, (w) => (d.rechnungsdatum = w));

  const zr = zeilen.find((z) => /leistungszeitraum|abrechnungszeitraum|liefer-?\s?\/?\s?leistungszeitraum|zeitraum/i.test(z.text));
  if (zr) {
    const dd = daten(zr.text);
    const mz = monatsZeitraum(zr.text);
    if (dd.length >= 2 && dd[0] <= dd[1]) setze("leistungszeitraum", "x", () => (d.leistungszeitraum = { von: dd[0], bis: dd[1] }));
    else if (mz) setze("leistungszeitraum", "x", () => (d.leistungszeitraum = mz));
  }
  const ld = wertNachLabel(zeilen, /\b(?:leistungsdatum|lieferdatum|liefer-?\s?\/?\s?leistungsdatum|leistungszeitpunkt|datum der leistung|lieferung am|leistung am)\b\s*:?/i, DATUM);
  if (ld) setze("leistungsdatum", daten(ld)[0], (w) => (d.leistungsdatum = w));
  else if (/(?:leistungs|liefer)(?:datum|zeitpunkt)\s+(?:entspricht|ist gleich|=)\s+(?:dem\s+)?rechnungsdatum/i.test(voll) && d.rechnungsdatum)
    setze("leistungsdatum", d.rechnungsdatum, (w) => (d.leistungsdatum = w));

  // Zahlungsziel und -bedingungen
  const bis = voll.match(/(?:zahlbar|fällig|zahlung)\s+(?:ohne abzug\s+)?(?:bis(?:\s+zum|\s+spätestens)?|spätestens\s+(?:am|bis)|am)\s+(\d{1,2}\.\s?\d{1,2}\.\s?\d{2,4})/i);
  const faelligLabel = wertNachLabel(zeilen, /\b(?:fälligkeit(?:sdatum)?|fällig am|zahlungsziel|due date)\b\s*:?/i, DATUM);
  const tage = voll.match(/(?:innerhalb|binnen)\s+(?:von\s+)?(\d{1,3})\s+tag/i) ?? voll.match(/zahlungsziel\s*:?\s*(\d{1,3})\s+tag/i) ?? voll.match(/(\d{1,3})\s+tage\s+netto/i);
  const faelligIso = bis ? daten(bis[1])[0] : faelligLabel ? daten(faelligLabel)[0] : "";
  if (faelligIso && d.rechnungsdatum && faelligIso >= d.rechnungsdatum) setze("zahlungsziel", "x", () => (d.zahlungsziel = tageZwischen(d.rechnungsdatum, faelligIso)));
  else if (tage) setze("zahlungsziel", "x", () => (d.zahlungsziel = Number(tage[1])));
  else if (/zahlbar sofort|sofort (?:fällig|zahlbar)|sofort ohne abzug|zahlbar ohne abzug sofort/i.test(voll)) setze("zahlungsziel", "x", () => (d.zahlungsziel = 0));
  const skonto = zeilen.find((z) => /skonto/i.test(z.text));
  if (skonto) {
    setze("zahlungsbedingungen", skonto.text.replace(/\s{2,}/g, " "), (w) => (d.zahlungsbedingungen = w));
    hinweise.push("Im PDF steht Skonto. Prüfe den Text der Zahlungsbedingungen: Er geht so in die E-Rechnung.");
  }

  // Bank, Steuer, Kontakt
  const ibanKand = voll.toUpperCase().match(/\b[A-Z]{2}\d{2}(?: ?[A-Z0-9]{4}){2,7}(?: ?[A-Z0-9]{1,4})?\b/g) ?? [];
  const iban = ibanKand.map((k) => k.replace(/\s/g, "")).find((k) => ibanGueltig(k));
  setze("verkaeufer.iban", iban, (w) => (d.verkaeufer.iban = w.replace(/(.{4})/g, "$1 ").trim()));
  setze("verkaeufer.bic", voll.match(/\b(?:BIC|SWIFT)(?:-Code)?\s*:?\s*([A-Z]{4}[A-Z]{2}[A-Z0-9]{2}(?:[A-Z0-9]{3})?)\b/)?.[1], (w) => (d.verkaeufer.bic = w));

  const USTID = /\b((?:AT|BE|BG|CY|CZ|DE|DK|EE|EL|ES|FI|FR|HR|HU|IE|IT|LT|LU|LV|MT|NL|PL|PT|RO|SE|SI|SK|XI)\s?[0-9A-Z]{2}[0-9A-Z ]{6,11}[0-9A-Z])\b/;
  const ustZeilen = zeilen.filter((z) => /ust\.?-?\s?id|ust-?idnr|umsatzsteuer-?id|vat(?:\s?(?:id|no|reg))|uid|identifikationsnummer/i.test(z.text));
  const ustIds: { id: string; kunde: boolean }[] = [];
  for (const z of ustZeilen) {
    for (const c of z.zellen) {
      const m = c.text.toUpperCase().match(USTID);
      if (m) ustIds.push({ id: m[1].replace(/\s/g, ""), kunde: /ihre|kunden|empfänger|leistungsempfänger|customer|buyer/i.test(c.text) });
    }
  }
  const nackt = [...voll.matchAll(/\bDE\s?\d{3}\s?\d{3}\s?\d{3}\b/g)].map((m) => m[0].replace(/\s/g, ""));
  for (const n of nackt) if (!ustIds.some((u) => u.id === n)) ustIds.push({ id: n, kunde: false });
  const kundeId = ustIds.find((u) => u.kunde);
  const eigene = ustIds.filter((u) => !u.kunde && u.id !== kundeId?.id);
  if (eigene.length) setze("verkaeufer.ustId", eigene.length > 1 && !kundeId ? eigene[eigene.length - 1].id : eigene[0].id, (w) => (d.verkaeufer.ustId = w));
  const kId = kundeId?.id ?? (eigene.length > 1 ? eigene[0].id : "");
  if (kId && kId !== d.verkaeufer.ustId) setze("kunde.ustId", kId, (w) => (d.kunde.ustId = w));
  setze("verkaeufer.steuernummer", voll.match(/\b(?:steuer-?\s?(?:nummer|nr\.?)|st\.?\s?-?\s?nr\.?)\s*:?\s*(\d{2,3}\s?\/\s?\d{3,4}\s?\/\s?\d{4,5}|\d{10,13})\b/i)?.[1], (w) => (d.verkaeufer.steuernummer = w));

  const mails = [...voll.matchAll(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g)].map((m) => m[0]);
  setze("verkaeufer.email", mails[0], (w) => (d.verkaeufer.email = w));
  setze("verkaeufer.telefon", voll.match(/\b(?:tel(?:efon)?\.?|fon|phone|mobil|handy)\s*:?\s*(\+?\d[\d \/()\-–]{5,}\d)/i)?.[1]?.trim(), (w) => (d.verkaeufer.telefon = w));
  setze("verkaeufer.kontaktName", voll.match(/\b(?:[Aa]nsprechpartner(?:in)?|[Ii]hr(?:e)? [Aa]nsprechpartner(?:in)?|[Bb]earbeiter(?:in)?|[Kk]ontakt)\s*:?\s*(\p{Lu}\p{Ll}+(?:[ \t]\p{Lu}\p{Ll}+){1,2})/u)?.[1], (w) => (d.verkaeufer.kontaktName = w));

  // Adressen: Absenderzeile → Anschriftfeld links → Briefkopf rechts → Fußzeile
  const linksZellen = zeilen.flatMap((z) => (z.links ? z.links.split("  ") : []));
  const rechtsZellen = zeilen.flatMap((z) => (z.rechts ? z.rechts.split("  ") : []));
  let absender: Adresse | null = null;
  let absIdx = -1;
  for (let k = 0; k < Math.min(linksZellen.length, 40) && !absender; k++) {
    absender = leseAbsenderzeile(linksZellen[k]);
    if (absender) absIdx = k;
  }
  const plzIdx = (zellen: string[], ab = 0) => zellen.findIndex((c, k) => k >= ab && PLZ_ORT.test(c.replace(/^(?:D-|DE-)/, "")));
  const kIdx = plzIdx(linksZellen, absIdx + 1);
  let kunde: Adresse | null = kIdx >= 0 ? blockVor(linksZellen, kIdx) : null;
  if (kunde && absender && kunde.plzOrt === absender.plzOrt && kunde.name === absender.name) kunde = null;
  let verk = absender;
  if (!verk) {
    const rIdx = plzIdx(rechtsZellen);
    if (rIdx >= 0) verk = blockVor(rechtsZellen, rIdx);
  }
  if (!verk) {
    const fuss = zeilen.slice(-12).flatMap((z) => z.zellen.map((c) => c.text));
    const fIdx = plzIdx(fuss);
    if (fIdx >= 0) verk = blockVor(fuss, fIdx);
    const firma = fuss.find((c) => /\b(?:GmbH|UG|AG|e\.\s?K\.|GbR|OHG|KG|PartG|e\.\s?V\.)\b/.test(c));
    if (verk && !verk.name && firma) verk.name = firma;
  }
  if (verk) {
    setze("verkaeufer.name", verk.name, (w) => (d.verkaeufer.name = w));
    setze("verkaeufer.strasse", verk.strasse, (w) => (d.verkaeufer.strasse = w));
    setze("verkaeufer.plzOrt", verk.plzOrt, (w) => (d.verkaeufer.plzOrt = w));
  }
  if (kunde) {
    setze("kunde.name", kunde.name, (w) => (d.kunde.name = w));
    setze("kunde.strasse", kunde.strasse, (w) => (d.kunde.strasse = w));
    setze("kunde.plzOrt", kunde.plzOrt, (w) => (d.kunde.plzOrt = w));
  }
  const ref = wertNachLabel(zeilen, /\b(?:leitweg-?id|käuferreferenz|ihre bestell(?:nummer|nr\.?)|bestellnummer|ihr zeichen|auftragsnummer|po number)\b\s*:?/i, /^\s*:?\s*([A-Z0-9][\w\-/.]{2,})/i);
  setze("kaeuferReferenz", ref, (w) => (d.kaeuferReferenz = w));

  // Steuerfall
  let modus: XrModus = "standard";
  if (/§\s*19\s*(?:abs\.?\s*1\s*)?ustg|kleinunternehmer/i.test(voll)) modus = "kleinunternehmer";
  else if (/§\s*13\s?b|steuerschuldnerschaft des leistungsempfängers|reverse[\s-]charge|auto-?liquidation|inversione contabile|inversión del sujeto pasivo/i.test(voll)) modus = "reverse-charge";
  else if (/innergemeinschaftliche lieferung|§\s*4\s*nr\.?\s*1\s*b|§\s*6a\s*ustg/i.test(voll)) modus = "innergemeinschaftlich";
  d.modus = modus;
  if (modus !== "standard") erkannt.push("modus");

  // Positionen: zwischen Tabellenkopf und erster Summenzeile
  const summen = leseSummen(zeilen);
  const kopf = zeilen.findIndex((z) => (z.text.match(KOPF) ?? []).length >= 2);
  const start = kopf >= 0 ? kopf + 1 : Math.max(0, kIdx >= 0 ? zeilen.findIndex((z) => z.links.includes(linksZellen[kIdx])) + 1 : 0);
  const pos: (PdfPosition & { satzAusZeile: boolean })[] = [];
  let zuletzt = -2;
  for (let k = start; k < zeilen.length; k++) {
    const t = zeilen[k].text;
    if (pos.length && /^(?:zwischensumme|summe|gesamt|netto|rechnungsbetrag|endbetrag)\b/i.test(t.trim())) break;
    if ((t.match(KOPF) ?? []).length >= 2) continue; // Tabellenkopf auf Folgeseiten
    const p = leseZeileAlsPosition(t);
    if (p) {
      pos.push(p);
      zuletzt = k;
    } else if (pos.length && zuletzt === k - 1 && !betraege(t).length && !SUMMEN_WORT.test(t) && !KEIN_POSTEN.test(t) && t.length < 120 && pos[pos.length - 1].beschreibung.length < 250) {
      pos[pos.length - 1].beschreibung += ` ${t.replace(/\s{2,}/g, " ")}`;
      zuletzt = k;
    }
  }

  // Steuersätze: aus der Zeile, sonst der einzige Satz der Summen, sonst 19 % zum Prüfen
  const saetze = [...new Set(summen.saetze.map((s) => s.satz).filter((s) => !Number.isNaN(s)))];
  for (const p of pos) {
    if (modus !== "standard") p.ustSatz = 0;
    else if (Number.isNaN(p.ustSatz)) {
      if (saetze.length === 1) p.ustSatz = saetze[0];
      else {
        p.ustSatz = saetze.includes(19) || !saetze.length ? 19 : saetze[0];
        if (saetze.length > 1 || summen.ust) p.pruefen = p.pruefen ?? "Steuersatz prüfen";
      }
    }
  }

  // Bruttopreise? Summe der Zeilen = Bruttobetrag statt Netto
  const zeilenSumme = r2(pos.reduce((n, p) => n + r2(p.menge * p.einzelpreisNetto), 0));
  let bruttopreise = false;
  if (modus === "standard" && summen.brutto !== undefined && summen.netto !== undefined && summen.brutto !== summen.netto && Math.abs(zeilenSumme - summen.brutto) <= 0.01) {
    bruttopreise = true;
    for (const p of pos) {
      const f = 1 + p.ustSatz / 100;
      const zeileNetto = r2(r2(p.menge * p.einzelpreisNetto) / f);
      p.einzelpreisNetto = p.menge === 1 ? zeileNetto : Math.round((p.einzelpreisNetto / f) * 10000) / 10000;
    }
    hinweise.push("Die Positionen im PDF sind Bruttopreise. Sie sind in Netto umgerechnet; prüfe den Summenabgleich.");
  }
  d.positionen = pos.map(({ satzAusZeile: _s, ...p }) => p);
  if (pos.length) erkannt.push("positionen");

  if (!zeilen.length) hinweise.push("Das PDF hat keine Textebene (z. B. ein Scan). Trage die Daten bitte von Hand ein.");
  return { daten: d, summen, erkannt, hinweise, bruttopreise };
}

// ---------------------------------------------------------------- ZUGFeRD-Anhang

/** Profil eines eingebetteten ZUGFeRD/Factur-X-XML: E-Rechnung im Sinne des § 14 UStG? */
export function profilAus(spezifikation: string): { name: string; eRechnung: boolean } {
  const s = spezifikation.toLowerCase();
  if (s.includes("xrechnung")) return { name: "XRechnung", eRechnung: true };
  if (s.includes("minimum")) return { name: "ZUGFeRD MINIMUM", eRechnung: false };
  if (s.includes("basicwl") || s.includes("basic-wl")) return { name: "ZUGFeRD BASIC-WL", eRechnung: false };
  if (s.includes("extended")) return { name: "ZUGFeRD EXTENDED", eRechnung: true };
  if (s.includes("basic")) return { name: "ZUGFeRD BASIC", eRechnung: true };
  if (s.includes("en16931")) return { name: "ZUGFeRD EN 16931 (COMFORT)", eRechnung: true };
  return { name: spezifikation || "unbekanntes Profil", eRechnung: false };
}

/** Daten aus einer gelesenen E-Rechnung (z. B. ZUGFeRD MINIMUM) als Startwerte. */
export function ausERechnung(r: ErRechnung): XrDaten {
  const d = leereDaten();
  const plzOrt = (p: { plz: string; ort: string }) => [p.plz, p.ort].filter(Boolean).join(" ");
  d.verkaeufer = {
    ...d.verkaeufer,
    name: r.verkaeufer.name, strasse: r.verkaeufer.strasse, plzOrt: plzOrt(r.verkaeufer), land: r.verkaeufer.land || "DE",
    ustId: r.verkaeufer.ustId, steuernummer: r.verkaeufer.steuernummer, email: r.verkaeufer.email, kontaktName: r.verkaeufer.kontakt,
    iban: r.zahlung.iban, bic: r.zahlung.bic,
  };
  d.kunde = { name: r.kaeufer.name, strasse: r.kaeufer.strasse, plzOrt: plzOrt(r.kaeufer), land: r.kaeufer.land || "DE", ustId: r.kaeufer.ustId, email: r.kaeufer.email };
  d.kaeuferReferenz = r.kaeuferReferenz;
  d.rechnungsnummer = r.nummer;
  d.rechnungsdatum = r.datum;
  d.leistungsdatum = r.leistungsdatum;
  if (r.faellig && r.datum) d.zahlungsziel = Math.max(0, tageZwischen(r.datum, r.faellig));
  const kats = new Set(r.steuern.map((s) => s.kategorie));
  d.modus = kats.has("AE") ? "reverse-charge" : kats.has("K") ? "innergemeinschaftlich" : kats.has("E") && /§\s*19|kleinunternehmer/i.test(r.steuern.map((s) => s.grund ?? "").join(" ")) ? "kleinunternehmer" : "standard";
  d.positionen = r.positionen.map((p) => ({
    beschreibung: p.name,
    menge: p.menge,
    einzelpreisNetto: p.menge ? Math.round((p.netto / p.menge) * 10000) / 10000 : p.preis,
    ustSatz: p.satz ?? 0,
    einheit: p.einheit || undefined,
  }));
  return d;
}

// ---------------------------------------------------------------- Abgleich

export type Abgleich = { punkte: { name: string; pdf?: number; xml: number; ok: boolean | null }[]; ok: boolean; geprueft: boolean };

/** Summen der künftigen XRechnung gegen die Summen im PDF, auf den Cent. */
export function summenAbgleich(d: XrDaten, pdf: Pick<PdfSummen, "netto" | "ust" | "brutto">): Abgleich {
  const s = xrSummen(d);
  const punkt = (name: string, xml: number, wert?: number) => ({ name, xml, pdf: wert, ok: wert === undefined ? null : Math.abs(r2(wert) - xml) < 0.005 });
  const punkte = [punkt("Netto", s.summeNetto, pdf.netto), punkt("Umsatzsteuer", s.summeSteuer, pdf.ust), punkt("Brutto", s.brutto, pdf.brutto)];
  const geprueft = punkte.some((p) => p.ok !== null && p.name === "Brutto") || (punkte[0].ok !== null && punkte[1].ok !== null);
  return { punkte, ok: geprueft && punkte.every((p) => p.ok !== false), geprueft };
}
