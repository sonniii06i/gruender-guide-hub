// Fristen- und Freigrenzen-Logik für private Veräußerungsgeschäfte (§23 EStG), testbar ohne React.

/**
 * Ende der Ein-Jahres-Spekulationsfrist (§23 Abs. 1 Satz 1 Nr. 2 EStG i. V. m. §§ 187 Abs. 1, 188 Abs. 2 und 3 BGB):
 * Die Frist endet mit Ablauf des Tages im Folgejahr, der dem Kauftag entspricht; fehlt dieser Tag (29.02.),
 * mit Ablauf des letzten Tages des Monats.
 */
export function fristEnde(kaufIso: string): string {
  const [y, m, d] = kaufIso.slice(0, 10).split("-").map(Number);
  const letzterTag = new Date(Date.UTC(y + 1, m, 0)).getUTCDate();
  const tag = Math.min(d, letzterTag);
  return `${y + 1}-${String(m).padStart(2, "0")}-${String(tag).padStart(2, "0")}`;
}

/** Steuerfrei, wenn der Verkauf NACH Ablauf der Frist liegt (Verkauf am Jahrestag ist noch steuerpflichtig). */
export function haltefristAbgelaufen(kaufIso: string, verkaufIso: string): boolean {
  return verkaufIso.slice(0, 10) > fristEnde(kaufIso);
}

/** Freigrenze §23 Abs. 3 Satz 5 EStG: 600 € bis VZ 2023, 1.000 € ab VZ 2024 (Wachstumschancengesetz). */
export function freigrenzeParagraph23(steuerJahr: number): number {
  return steuerJahr >= 2024 ? 1000 : 600;
}
