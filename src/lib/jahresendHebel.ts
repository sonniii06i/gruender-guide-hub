// Steuerlicher Abzug einer vor dem 31.12. vorgezogenen Investition im laufenden Jahr.
import { GWG_SCHWELLE, IAB_GEWINN_GRENZE } from "@/lib/germanTax";

/** §7g Abs. 5 EStG: Sonder-AfA bis zu 40 % für Wirtschaftsgüter, angeschafft nach dem 31.12.2023 (Wachstumschancengesetz). */
export const SONDER_AFA_7G_QUOTE = 0.4;

export type InvestArt = "gwg" | "anlage";

export type InvestInput = {
  /** Netto-Anschaffungskosten gesamt */
  betrag: number;
  art: InvestArt;
  /** Betriebsgewöhnliche Nutzungsdauer in Jahren (AfA-Tabelle), nur für "anlage" */
  nutzungsdauer: number;
  /** Monate im Jahr ab Anschaffung inkl. Anschaffungsmonat (Dezember = 1), §7 Abs. 1 Satz 4 EStG */
  monate: number;
  /** Gewinn vor Investition (für die 200.000-€-Grenze der Sonder-AfA, §7g Abs. 6 Nr. 1 i. V. m. Abs. 1 Satz 2 Nr. 1) */
  gewinn: number;
  sonderAfa: boolean;
};

/** Gewinnminderung im laufenden Jahr. GWG bis 800 € netto je Stück sofort (§6 Abs. 2 EStG), Nutzungsdauer 1 Jahr (Computer/Software, BMF 22.02.2022) voll, sonst zeitanteilige lineare AfA. */
export function abzugVorgezogeneInvestition(i: InvestInput) {
  if (i.betrag <= 0) return { abzug: 0, afa: 0, sonderAfa: 0, sonderAfaMoeglich: false };
  if (i.art === "gwg") return { abzug: i.betrag, afa: i.betrag, sonderAfa: 0, sonderAfaMoeglich: false };
  const nd = Math.max(1, i.nutzungsdauer);
  const monate = Math.min(12, Math.max(1, Math.round(i.monate)));
  // BMF-Schreiben vom 22.02.2022 (IV C 3 - S 2190/21/10002 :025): Computerhardware und Software
  // mit Nutzungsdauer 1 Jahr dürfen im Anschaffungsjahr voll abgeschrieben werden – keine Zwölftelung.
  const afa = nd <= 1 ? i.betrag : (i.betrag / nd) * (monate / 12);
  const sonderAfaMoeglich = i.gewinn <= IAB_GEWINN_GRENZE;
  const sonder = i.sonderAfa && sonderAfaMoeglich ? i.betrag * SONDER_AFA_7G_QUOTE : 0;
  return { abzug: Math.min(i.betrag, afa + sonder), afa, sonderAfa: sonder, sonderAfaMoeglich };
}

export { GWG_SCHWELLE };
