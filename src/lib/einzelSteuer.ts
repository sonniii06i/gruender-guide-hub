// Jahressteuer eines Einzelunternehmers: ESt nach § 35 EStG-Anrechnung, SolZ und Gewerbesteuer (22.11.2026).
// - § 35 Abs. 1 EStG: Die tarifliche ESt ermäßigt sich um das 4,0-fache des GewSt-Messbetrags, höchstens um den
//   Anteil der ESt, der auf die gewerblichen Einkünfte entfällt (Ermäßigungshöchstbetrag), und höchstens um die
//   tatsächlich zu zahlende Gewerbesteuer.
// - § 3 Abs. 2 SolzG i. V. m. § 2 Abs. 6 EStG: Der SolZ bemisst sich nach der festzusetzenden ESt, also nach der
//   Anrechnung; Freigrenze und Milderungszone über solZ() (§§ 3 Abs. 3, 4 SolzG).
// Vereinfachung: Gewerbeertrag = Gewinn (keine Hinzurechnungen/Kürzungen), Single-Tarif.
import { GEWST_ANRECHNUNG_FAKTOR, gewStMessbetrag, progressionESt, solZ } from "@/lib/germanTax";

export type EinzelSteuer = {
  /** Tarifliche ESt vor § 35 */
  estTariflich: number;
  /** Ermäßigung nach § 35 EStG */
  anrechnung: number;
  /** ESt nach Anrechnung (Bemessungsgrundlage des SolZ) */
  est: number;
  solz: number;
  /** Gewerbesteuer an die Gemeinde (brutto, vor Anrechnung) */
  gewst: number;
  total: number;
};

export function einzelSteuer(o: { gewinn: number; andereEinkuenfte?: number; hebesatz: number; gewerbe: boolean }): EinzelSteuer {
  const gewinn = Math.max(0, o.gewinn);
  const zvE = Math.max(0, gewinn + (o.andereEinkuenfte ?? 0));
  const estTariflich = progressionESt(zvE);
  const mess = o.gewerbe ? gewStMessbetrag(gewinn) : 0;
  const gewst = mess * (o.hebesatz / 100);
  const hoechstbetrag = zvE > 0 ? estTariflich * Math.min(1, gewinn / zvE) : 0;
  const anrechnung = Math.min(mess * GEWST_ANRECHNUNG_FAKTOR, gewst, hoechstbetrag);
  const est = estTariflich - anrechnung;
  const solz = solZ(est);
  return { estTariflich, anrechnung, est, solz, gewst, total: est + solz + gewst };
}
