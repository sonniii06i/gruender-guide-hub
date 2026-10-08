// Scheinselbstständigkeit (§ 7 SGB IV) und Rentenversicherungspflicht
// arbeitnehmerähnlicher Selbstständiger (§ 2 S. 1 Nr. 9 SGB VI).
// Stand 08.10.2026. Indizien nach DRV („Scheinselbstständigkeit“, Selbstcheck
// Erwerbsstatus). Werte 2026 aus DRV-Formular V0091 (live geprüft).
// Das Ergebnis ist eine Risikoeinschätzung, keine Statusentscheidung – die
// trifft nur die Clearingstelle der DRV (§ 7a SGB IV, Antrag V0027).

export const RV_2026 = {
  geringfuegigkeit: 603, // € / Monat (§ 8 Abs. 1a SGB IV, Mindestlohn 13,90 €)
  beitragssatz: 18.6,
  mindestbeitrag: 112.16,
  regelbeitrag: 735.63,
  halberRegelbeitrag: 367.82, // für die ersten 3 Kalenderjahre nach Aufnahme wählbar
  hoechstbeitrag: 1571.7,
} as const;

export type Indiz = { id: string; frage: string; richtung: "abhaengig" | "selbststaendig"; gewicht: 1 | 2 | 3 };

/** Ja = das Merkmal trifft zu. */
export const INDIZIEN: Indiz[] = [
  { id: "weisung", frage: "Der Auftraggeber bestimmt, wie, wann und wo du arbeitest (uneingeschränkte Weisungen).", richtung: "abhaengig", gewicht: 3 },
  { id: "zeiten", frage: "Du hast feste Arbeitszeiten oder Anwesenheitspflichten.", richtung: "abhaengig", gewicht: 2 },
  { id: "raeume", frage: "Du arbeitest in den Räumen des Auftraggebers oder an Orten, die er bestimmt.", richtung: "abhaengig", gewicht: 2 },
  { id: "software", frage: "Du musst Hard- und Software des Auftraggebers nutzen, mit der er dich kontrollieren kann.", richtung: "abhaengig", gewicht: 2 },
  { id: "berichte", frage: "Du lieferst regelmäßig detaillierte Berichte in kurzen Abständen.", richtung: "abhaengig", gewicht: 1 },
  { id: "eingliederung", frage: "Du bist ins Team eingebunden wie Angestellte (Mail-Adresse, Dienstpläne, Meetings, Vertretung).", richtung: "abhaengig", gewicht: 3 },
  { id: "urlaub", frage: "Es gibt Urlaubsregeln oder Bezahlung bei Krankheit wie bei Angestellten.", richtung: "abhaengig", gewicht: 3 },
  { id: "stundenlohn", frage: "Du wirst wie ein Angestellter nach Zeit bezahlt, ohne eigenes Verlustrisiko.", richtung: "abhaengig", gewicht: 2 },
  { id: "persoenlich", frage: "Du musst die Arbeit persönlich erledigen und darfst niemanden beauftragen.", richtung: "abhaengig", gewicht: 1 },
  { id: "kapital", frage: "Du setzt eigenes Kapital und eigene Betriebsmittel ein (Ausstattung, Software, Fahrzeug).", richtung: "selbststaendig", gewicht: 2 },
  { id: "preise", frage: "Du verhandelst deine Preise frei und kalkulierst selbst.", richtung: "selbststaendig", gewicht: 2 },
  { id: "akquise", frage: "Du machst eigene Werbung und suchst aktiv weitere Kunden.", richtung: "selbststaendig", gewicht: 2 },
  { id: "mitarbeiter", frage: "Du beschäftigst eigene Mitarbeiter oder könntest Aufträge an Subunternehmer geben.", richtung: "selbststaendig", gewicht: 3 },
  { id: "haftung", frage: "Du haftest für Mängel und trägst ein echtes Verlustrisiko.", richtung: "selbststaendig", gewicht: 2 },
  { id: "mehrereKunden", frage: "Du arbeitest für mehrere Auftraggeber.", richtung: "selbststaendig", gewicht: 2 },
];

export type StatusErgebnis = {
  punkteAbhaengig: number;
  punkteSelbststaendig: number;
  risiko: "niedrig" | "mittel" | "hoch" | "offen";
  beantwortet: number;
};

export function bewerteStatus(antworten: Record<string, boolean | undefined>): StatusErgebnis {
  let a = 0, s = 0, n = 0;
  for (const i of INDIZIEN) {
    const v = antworten[i.id];
    if (v === undefined) continue;
    n++;
    if (v && i.richtung === "abhaengig") a += i.gewicht;
    if (v && i.richtung === "selbststaendig") s += i.gewicht;
  }
  const risiko = n < INDIZIEN.length * 0.6 ? "offen" : a >= 8 && a > s ? "hoch" : a >= 4 || a > s ? "mittel" : "niedrig";
  return { punkteAbhaengig: a, punkteSelbststaendig: s, risiko, beantwortet: n };
}

export type RvEingabe = {
  anteilHauptkunde: number; // % der Betriebseinnahmen
  svPflichtigeMitarbeiter: boolean;
  minijobSummeMonat: number; // Summe aller Minijob-Löhne
  einkommenMonat: number; // Arbeitseinkommen (Gewinn) pro Monat
  monateSeitStart: number;
};

export type RvErgebnis = {
  pflichtig: boolean;
  gruende: string[];
  befreiungMoeglich: boolean;
  beitragGeschaetzt: number;
};

export function pruefeRvPflicht(e: RvEingabe): RvErgebnis {
  const gruende: string[] = [];
  // Mehrere Minijobber zusammen über der Geringfügigkeitsgrenze zählen als ein versicherungspflichtiger Arbeitnehmer.
  const hatArbeitnehmer = e.svPflichtigeMitarbeiter || e.minijobSummeMonat > RV_2026.geringfuegigkeit;
  const einAuftraggeber = e.anteilHauptkunde >= (5 / 6) * 100;
  const geringfuegig = e.einkommenMonat <= RV_2026.geringfuegigkeit;
  if (hatArbeitnehmer) gruende.push("Du beschäftigst (rechnerisch) einen versicherungspflichtigen Arbeitnehmer – damit keine Pflicht nach Nr. 9.");
  if (!einAuftraggeber) gruende.push(`Dein Hauptkunde bringt unter 5/6 deiner Einnahmen (${e.anteilHauptkunde} %) – kein „im Wesentlichen ein Auftraggeber“.`);
  if (geringfuegig) gruende.push(`Einkommen bis ${RV_2026.geringfuegigkeit} € im Monat ist geringfügig und rentenversicherungsfrei (§ 5 Abs. 2 SGB VI).`);
  const pflichtig = !hatArbeitnehmer && einAuftraggeber && !geringfuegig;
  if (pflichtig) gruende.push("Ein Hauptauftraggeber (≥ 5/6 der Einnahmen) und keine versicherungspflichtigen Mitarbeiter: Rentenversicherungspflicht nach § 2 Satz 1 Nr. 9 SGB VI.");
  const basis = Math.min(Math.max(e.einkommenMonat, RV_2026.geringfuegigkeit), RV_2026.hoechstbeitrag / (RV_2026.beitragssatz / 100));
  return {
    pflichtig,
    gruende,
    befreiungMoeglich: pflichtig && e.monateSeitStart <= 36,
    beitragGeschaetzt: Math.round(basis * RV_2026.beitragssatz) / 100,
  };
}
