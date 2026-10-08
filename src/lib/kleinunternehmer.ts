// Kleinunternehmerregelung § 19 UStG ab 01.01.2025 (BMF 18.03.2025).
// - Vorjahr ≤ 25.000 € UND laufendes Jahr ≤ 100.000 € (vereinnahmter Gesamtumsatz, netto).
// - Gründungsjahr: Grenze 25.000 € (keine Prognose).
// - Schon der Umsatz, mit dem die Grenze überschritten wird, ist voll regelbesteuert.
// - Anlagenverkäufe bleiben außer Ansatz; bei Differenzbesteuerung zählt das volle Entgelt.

export const KU_VORJAHR = 25000;
export const KU_LAUFEND = 100000;

export type KuEingabe = {
  gruendungsjahr: boolean;
  vorjahr: number;
  monate: number[]; // 12 Monatswerte, vereinnahmt, netto, ohne Anlagenverkäufe
  bisMonat: number; // 1–12: wie viele Monate sind schon gelaufen
};

export type KuErgebnis = {
  status: "ku" | "warnung" | "ueberschritten" | "kein-ku";
  grenze: number;
  bisher: number;
  anteil: number;
  monatUeberschritten: number | null; // tatsächlich
  prognoseMonat: number | null; // bei gleichem Tempo
  prognoseJahr: number;
  folgejahrKu: boolean;
  texte: string[];
};

const eur = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";
const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

export function pruefeKleinunternehmer(e: KuEingabe): KuErgebnis {
  const grenze = e.gruendungsjahr ? KU_VORJAHR : KU_LAUFEND;
  const werte = e.monate.map((x) => Math.max(0, x || 0));
  const gelaufen = Math.min(12, Math.max(1, e.bisMonat));
  const bisher = werte.slice(0, gelaufen).reduce((a, b) => a + b, 0);
  let kum = 0;
  let monatUeberschritten: number | null = null;
  werte.slice(0, gelaufen).forEach((w, i) => {
    kum += w;
    if (monatUeberschritten === null && kum > grenze) monatUeberschritten = i + 1;
  });
  const schnitt = bisher / gelaufen;
  const prognoseJahr = Math.round(bisher + schnitt * (12 - gelaufen));
  let prognoseMonat: number | null = null;
  if (monatUeberschritten === null && schnitt > 0) {
    const m = gelaufen + Math.ceil((grenze - bisher) / schnitt);
    prognoseMonat = m <= 12 ? m : null;
  }
  const texte: string[] = [];
  if (!e.gruendungsjahr && e.vorjahr > KU_VORJAHR) {
    texte.push(`Dein Vorjahresumsatz von ${eur(e.vorjahr)} liegt über 25.000 € – in diesem Jahr gilt die Kleinunternehmerregelung nicht, auch wenn du jetzt weniger umsetzt.`);
    return { status: "kein-ku", grenze, bisher, anteil: 0, monatUeberschritten, prognoseMonat: null, prognoseJahr, folgejahrKu: prognoseJahr <= KU_VORJAHR, texte };
  }
  const anteil = Math.min(1.5, bisher / grenze);
  let status: KuErgebnis["status"] = "ku";
  if (monatUeberschritten !== null) {
    status = "ueberschritten";
    texte.push(
      `Grenze von ${eur(grenze)} im ${MONATE[monatUeberschritten - 1]} überschritten: Schon der Umsatz, mit dem du sie überschritten hast, und alle weiteren sind voll umsatzsteuerpflichtig. Rechnungen ab da mit Umsatzsteuer ausstellen und Voranmeldungen abgeben – am besten mit Steuerberater klären.`,
    );
  } else if (anteil >= 0.8 || prognoseMonat !== null) {
    status = "warnung";
    texte.push(
      prognoseMonat
        ? `Bei gleichem Tempo überschreitest du die Grenze von ${eur(grenze)} voraussichtlich im ${MONATE[prognoseMonat - 1]}. Bereite Rechnungsvorlagen mit Umsatzsteuer vor und kläre, ob ein freiwilliger Wechsel (5 Jahre Bindung) sinnvoller ist.`
        : `Du hast ${Math.round(anteil * 100)} % der Grenze von ${eur(grenze)} erreicht.`,
    );
  } else {
    texte.push(`Noch ${eur(grenze - bisher)} bis zur Grenze von ${eur(grenze)}.`);
  }
  if (e.gruendungsjahr) texte.push("Im Gründungsjahr gilt die 25.000-€-Grenze – nicht 100.000 €.");
  const folgejahrKu = prognoseJahr <= KU_VORJAHR;
  texte.push(
    folgejahrKu
      ? "Bleibt dein Jahresumsatz unter 25.000 €, kannst du nächstes Jahr wieder Kleinunternehmer sein."
      : `Mit voraussichtlich ${eur(prognoseJahr)} in diesem Jahr bist du nächstes Jahr kein Kleinunternehmer mehr.`,
  );
  return { status, grenze, bisher, anteil, monatUeberschritten, prognoseMonat, prognoseJahr, folgejahrKu, texte };
}
