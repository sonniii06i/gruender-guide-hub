// Gesetzliche Stichtage und die Werte, die sich zum Jahreswechsel ändern.
// Stand 22.11.2026. Jede Zahl ist an der verlinkten Primärquelle geprüft
// (Relevanz-Radar, Freigaben 393–396). Neue Einträge nur mit Primärquelle.

export type Quelle = { label: string; url: string };

export const Q = {
  ki_vo: { label: "Verordnung (EU) 2024/1689 (KI-Verordnung), Art. 3, 50, 113", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
  ki_omnibus: { label: "Verordnung (EU) 2026/1744 (Digital-Omnibus zur KI), Art. 111 Abs. 4 und Art. 113 neu", url: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj" },
  ustg14: { label: "§ 14 UStG", url: "https://www.gesetze-im-internet.de/ustg_1980/__14.html" },
  ustg27: { label: "§ 27 Abs. 38 UStG", url: "https://www.gesetze-im-internet.de/ustg_1980/__27.html" },
  ustdv33: { label: "§ 33 UStDV (Kleinbetragsrechnungen)", url: "https://www.gesetze-im-internet.de/ustdv_1980/__33.html" },
  ustdv34a: { label: "§ 34a UStDV (Rechnungen von Kleinunternehmern)", url: "https://www.gesetze-im-internet.de/ustdv_1980/__34a.html" },
  ksvg24: { label: "§ 24 KSVG", url: "https://www.gesetze-im-internet.de/ksvg/__24.html" },
  ksvg25: { label: "§ 25 KSVG", url: "https://www.gesetze-im-internet.de/ksvg/__25.html" },
  ksvg27: { label: "§ 27 KSVG", url: "https://www.gesetze-im-internet.de/ksvg/__27.html" },
  ksk_bemessung: { label: "Künstlersozialkasse: Bemessungsgrundlage", url: "https://www.kuenstlersozialkasse.de/unternehmen-und-verwerter/bemessungsgrundlage" },
  ksk_2027: { label: "Künstlersozialkasse, 08.07.2026: Abgabe 2027 beträgt 5,0 %", url: "https://www.kuenstlersozialkasse.de/nachrichten/detail/kuenstlersozialabgabe-im-jahr-2027-betraegt-50-prozent" },
  bmas_ksa: { label: "BMAS, 03.07.2026: Abgabesatz 2026 4,9 %, 2027 5,0 %", url: "https://www.bmas.de/DE/Service/Presse/Pressemitteilungen/2026/kuenstlersozialversicherung-abgabe-steigt-auf-5-prozent-im-jahr-2027.html" },
  bmas_rg: { label: "BMAS: Sozialversicherungsrechengrößen-Verordnung 2027", url: "https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/sozialversicherungs-rechengroessenverordnung-2027.html" },
  bundesrat_rg: { label: "Bundesrat, 20.11.2026: Zustimmung zur Rechengrößen-Verordnung 2027", url: "https://www.bundesrat.de/DE/plenum/bundesrat-kompakt/bundesrat-kompakt-node.html" },
  breg_mindestlohn: { label: "Bundesregierung: Mindestlohn 14,60 €, Minijob 633 € ab 2027", url: "https://www.bundesregierung.de/breg-de/aktuelles/mindestlohn-steigt-2391010" },
  bmg_zusatz: { label: "BMG, 30.10.2026: durchschnittlicher Zusatzbeitrag 2027", url: "https://www.bundesgesundheitsministerium.de/presse/pressemitteilungen/zusatzbeitragssatz-gkv-2027-festgelegt" },
} satisfies Record<string, Quelle>;

export const STAND = "Stand 22.11.2026";

/** Werte ab 01.01.2027 mit Vorjahreswert, Rechtsstand und Quelle. */
export type Wert2027 = {
  id: string;
  titel: string;
  wert2027: string;
  wert2026?: string;
  /** Für wen der Wert zählt, in einem Halbsatz. */
  fuer: string;
  stand: "beschlossen" | "festgelegt" | "verkuendungOffen";
  quellen: Quelle[];
};

const RG_STAND = "verkuendungOffen" as const;

export const WERTE_2027: Wert2027[] = [
  { id: "mindestlohn", titel: "Mindestlohn", wert2027: "14,60 € je Stunde", wert2026: "13,90 €", fuer: "alle mit Angestellten, Aushilfen oder Praktikanten", stand: "beschlossen", quellen: [Q.breg_mindestlohn] },
  { id: "minijob", titel: "Minijob-Grenze", wert2027: "633 € im Monat", wert2026: "603 €", fuer: "alle mit Minijobbern", stand: "beschlossen", quellen: [Q.breg_mindestlohn] },
  { id: "bezugsgroesse", titel: "Bezugsgröße", wert2027: "4.130 € im Monat (49.560 € im Jahr)", fuer: "freiwillig gesetzlich Versicherte, an ihr hängen Mindestbeiträge", stand: RG_STAND, quellen: [Q.bmas_rg, Q.bundesrat_rg] },
  { id: "bbg_kv", titel: "Beitragsbemessungsgrenze Kranken- und Pflegeversicherung", wert2027: "6.375 € im Monat (76.500 € im Jahr)", wert2026: "5.812,50 € im Monat", fuer: "Höchstbeitrag in der GKV, auch für Selbstständige", stand: RG_STAND, quellen: [Q.bmas_rg, Q.bundesrat_rg] },
  { id: "bbg_rv", titel: "Beitragsbemessungsgrenze Renten- und Arbeitslosenversicherung", wert2027: "8.850 € im Monat (106.200 € im Jahr)", wert2026: "8.450 € im Monat", fuer: "Angestellte und GmbH-Geschäftsführer mit Versicherungspflicht", stand: RG_STAND, quellen: [Q.bmas_rg, Q.bundesrat_rg] },
  { id: "jaeg", titel: "Versicherungspflichtgrenze (Jahresarbeitsentgeltgrenze)", wert2027: "84.150 € im Jahr", wert2026: "77.400 €", fuer: "Angestellte, die in die private Krankenversicherung wechseln wollen", stand: RG_STAND, quellen: [Q.bmas_rg, Q.bundesrat_rg] },
  { id: "zusatzbeitrag", titel: "Durchschnittlicher Zusatzbeitrag GKV", wert2027: "2,9 %", fuer: "Richtwert, deine Kasse kann mehr oder weniger verlangen", stand: "festgelegt", quellen: [Q.bmg_zusatz] },
];

export const STAND_TEXT: Record<Wert2027["stand"], string> = {
  beschlossen: "beschlossen",
  festgelegt: "vom BMG festgelegt",
  verkuendungOffen: "vom Bundesrat beschlossen, Verkündung offen",
};

/** Gesetzliche Stichtage, die nicht vom eigenen Steuerprofil abhängen. */
export type Stichtag = {
  datum: string; // ISO
  titel: string;
  /** Für wen der Termin gilt, kurz. */
  wer: string;
  link: string;
  quellen: Quelle[];
};

export const STICHTAGE: Stichtag[] = [
  { datum: "2026-12-02", titel: "KI-Kennzeichnung: Nachfrist für ältere KI-Tools endet", wer: "Anbieter generativer KI-Systeme, die vor dem 02.08.2026 auf dem Markt waren", link: "/cockpit/ki-kennzeichnung", quellen: [Q.ki_omnibus] },
  { datum: "2027-01-01", titel: "Neue Werte 2027: Mindestlohn, Minijob, Sozialversicherung", wer: "alle mit Mitarbeitern, freiwillig Versicherte", link: "/cockpit/aktuell", quellen: [Q.breg_mindestlohn, Q.bmas_rg] },
  { datum: "2027-01-01", titel: "E-Rechnung Pflicht ab 800.000 € Vorjahresumsatz", wer: "Unternehmen mit mehr als 800.000 € Gesamtumsatz 2026 und Kunden im Inland (B2B)", link: "/cockpit/e-rechnung-check", quellen: [Q.ustg27] },
  { datum: "2027-03-31", titel: "Künstlersozialabgabe: Meldung für 2026", wer: "alle, die 2026 abgabepflichtig waren", link: "/cockpit/ksa-check", quellen: [Q.ksvg27] },
  { datum: "2028-01-01", titel: "E-Rechnung Pflicht für alle B2B-Rechnungen im Inland", wer: "alle Unternehmer außer Kleinunternehmern", link: "/cockpit/e-rechnung-check", quellen: [Q.ustg27] },
];

/** Stichtage von `von` bis einschließlich `bis` (ISO), aufsteigend. */
export const stichtageZwischen = (von: string, bis: string): Stichtag[] =>
  STICHTAGE.filter((s) => s.datum >= von && s.datum <= bis).sort((a, b) => a.datum.localeCompare(b.datum));
