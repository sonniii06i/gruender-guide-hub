/**
 * Rechenkern des Brutto-Netto-Rechners für Solo-Selbstständige (Stand 2026).
 * Reine Funktion, damit die Steuerlogik ohne React testbar ist.
 */
import {
  progressionESt,
  solZ,
  SOLZ_FREIGRENZE_SINGLE,
  SOLZ_FREIGRENZE_VERHEIRATET,
  GEWST_MESSZAHL,
  GEWST_FREIBETRAG_NATUERLICH,
  GEWST_ANRECHNUNG_FAKTOR,
  RUERUP_MAX_SINGLE,
  RUERUP_MAX_VERHEIRATET,
} from "@/lib/germanTax";

export const MINDEST_BEMESSUNG_GKV_MONAT_2026 = 1318.33; // freiwillig versicherte Selbstständige
export const BBG_KV_MONAT_2026 = 5812.5; // Höchst-Bemessung (69.750 €/Jahr; 2025: 5.512,50)
export const KV_ALLG_SATZ = 14.6;
export const KV_ZUSATZ_DEFAULT = 2.9;
export const PV_SATZ_KINDERLOS = 4.2; // 3.6 + 0.6 Kinderlos-Zuschlag
export const PV_SATZ_KIND = 3.6;
export const PV_ZUSCHLAG_KINDERLOS = 0.6;
export const RV_SATZ = 18.6; // freiwillige RV: AN+AG-Anteil selbst, gleicher Satz wie Pflicht
export const BBG_RV_MONAT_2026 = 8450;

export type Rechtsform = "freiberuf" | "gewerbe";
export type KvVariante = "gkv-freiwillig" | "pkv" | "ksk";

export type BruttoNettoSoloInput = {
  umsatz: number;
  betriebsausgaben: number;
  rechtsform: Rechtsform;
  hebesatz: number;
  kvVariante: KvVariante;
  zusatzBeitrag: number;
  kinderlos: boolean;
  pkvBeitragMonat: number;
  /** Anteil des PKV-Beitrags für die Basisabsicherung in % (steht in der Beitragsbescheinigung des Versicherers). */
  pkvBasisAnteil: number;
  rvFreiwillig: boolean;
  kistSatz: number;
  verheiratet: boolean;
};

export function berechneBruttoNettoSolo(i: BruttoNettoSoloInput) {
  const gewinn = Math.max(0, i.umsatz - i.betriebsausgaben);
  const pvSatz = i.kinderlos ? PV_SATZ_KINDERLOS : PV_SATZ_KIND;

  // === KV/PV ===
  let kvJahr = 0;
  let kvAbziehbar = 0;
  if (i.kvVariante === "gkv-freiwillig") {
    const bemessungJahr = Math.max(MINDEST_BEMESSUNG_GKV_MONAT_2026, Math.min(BBG_KV_MONAT_2026, gewinn / 12)) * 12;
    const kv = bemessungJahr * ((KV_ALLG_SATZ + i.zusatzBeitrag) / 100);
    const pv = bemessungJahr * (pvSatz / 100);
    kvJahr = kv + pv;
    // §10 Abs. 1 Nr. 3 Buchst. a Satz 4 EStG: Beiträge mit Krankengeldanspruch (allg. Satz 14,6 %) um 4 % kürzen; PV voll.
    kvAbziehbar = kv * 0.96 + pv;
  } else if (i.kvVariante === "pkv") {
    kvJahr = i.pkvBeitragMonat * 12;
    // Nur der Basisabsicherungs-Anteil ist nach §10 Abs. 1 Nr. 3 EStG unbegrenzt abziehbar.
    kvAbziehbar = kvJahr * Math.min(100, Math.max(0, i.pkvBasisAnteil)) / 100;
  } else {
    // KSK (§§ 1, 15 KSVG): Bemessung = Arbeitseinkommen bis zur BBG, Versicherte tragen die Hälfte;
    // den Kinderlosen-Zuschlag der PV (0,6 %) tragen sie allein.
    const bemessungJahr = Math.min(BBG_KV_MONAT_2026, gewinn / 12) * 12;
    const kv = bemessungJahr * ((KV_ALLG_SATZ + i.zusatzBeitrag) / 100) / 2;
    const pv = bemessungJahr * (PV_SATZ_KIND / 100) / 2 + (i.kinderlos ? bemessungJahr * (PV_ZUSCHLAG_KINDERLOS / 100) : 0);
    kvJahr = kv + pv;
    kvAbziehbar = kv * 0.96 + pv;
  }

  // === Rentenversicherung ===
  // KSK-Versicherte sind rentenversicherungspflichtig (§1 KSVG) und zahlen den halben Beitrag (§15 KSVG: 9,3 %).
  let rvJahr = 0;
  let rvPflichtKsk = false;
  if (i.kvVariante === "ksk") {
    rvPflichtKsk = true;
    rvJahr = Math.min(BBG_RV_MONAT_2026, gewinn / 12) * 12 * (RV_SATZ / 2 / 100);
  } else if (i.rvFreiwillig) {
    rvJahr = Math.min(BBG_RV_MONAT_2026, gewinn / 12) * 12 * (RV_SATZ / 100);
  }
  // §10 Abs. 1 Nr. 2, Abs. 3 EStG: Altersvorsorge seit 2023 zu 100 % abziehbar, bis zum Höchstbetrag.
  const rvAbziehbar = Math.min(rvJahr, i.verheiratet ? RUERUP_MAX_VERHEIRATET : RUERUP_MAX_SINGLE);

  // === ESt === zvE = Gewinn − abziehbare Vorsorgeaufwendungen (§10 Abs. 1 Nr. 2 und 3 EStG)
  const vorsorgeAbzug = kvAbziehbar + rvAbziehbar;
  const zvE = Math.max(0, gewinn - vorsorgeAbzug);
  const eSt = i.verheiratet ? 2 * progressionESt(zvE / 2) : progressionESt(zvE);

  // === GewSt (nur bei Gewerbe) mit §35 EStG ===
  let gewSt = 0;
  let gewStAnrechnung = 0;
  if (i.rechtsform === "gewerbe") {
    const gewstBasis = Math.max(0, gewinn - GEWST_FREIBETRAG_NATUERLICH);
    const gewstMessbetrag = gewstBasis * GEWST_MESSZAHL;
    const gewstBrutto = gewstMessbetrag * (i.hebesatz / 100);
    // §35 Abs. 1 EStG: 4,0 × Messbetrag, höchstens tatsächlich zu zahlende GewSt und tarifliche ESt
    gewStAnrechnung = Math.min(gewstMessbetrag * GEWST_ANRECHNUNG_FAKTOR, gewstBrutto, eSt);
    gewSt = Math.max(0, gewstBrutto - gewStAnrechnung);
  }

  // SolZ bemisst sich nach der ESt nach §35-Ermäßigung (§3 Abs. 1 Nr. 1 SolzG: festgesetzte ESt);
  // Freigrenze bei Zusammenveranlagung 40.700 € (§3 Abs. 3 SolzG).
  const solzFreigrenze = i.verheiratet ? SOLZ_FREIGRENZE_VERHEIRATET : SOLZ_FREIGRENZE_SINGLE;
  const solz = solZ(Math.max(0, eSt - gewStAnrechnung), solzFreigrenze);
  // KiSt: §35 bleibt unberücksichtigt (§51a Abs. 2 Satz 3 EStG)
  const kist = eSt * (i.kistSatz / 100);

  const steuerGesamt = eSt + solz + kist + gewSt;
  const sozialGesamt = kvJahr + rvJahr;
  const nettoJahr = Math.max(0, gewinn - steuerGesamt - sozialGesamt);
  const nettoMonat = nettoJahr / 12;
  const steuerquote = gewinn > 0 ? (steuerGesamt / gewinn) * 100 : 0;
  const gesamtbelastung = gewinn > 0 ? ((steuerGesamt + sozialGesamt) / gewinn) * 100 : 0;

  // === Vergleichs-Szenario: Angestellter bei gleichem AG-Total ===
  const AG_SV_QUOTE = 0.205;
  const an_brutto = gewinn / (1 + AG_SV_QUOTE);
  const an_kvpv = Math.min(an_brutto, BBG_KV_MONAT_2026 * 12) * 0.1025;
  const an_rvav = Math.min(an_brutto, BBG_RV_MONAT_2026 * 12) * 0.106;
  const an_sv = an_kvpv + an_rvav;
  const an_zvE = an_brutto - an_sv;
  const an_eSt = i.verheiratet ? 2 * progressionESt(an_zvE / 2) : progressionESt(an_zvE);
  const an_solz = solZ(an_eSt, solzFreigrenze);
  const an_kist = an_eSt * (i.kistSatz / 100);
  const an_netto = Math.max(0, an_brutto - an_sv - an_eSt - an_solz - an_kist);

  return {
    gewinn, zvE, vorsorgeAbzug, solzFreigrenze, rvPflichtKsk,
    eSt, solz, kist, gewSt, gewStAnrechnung,
    kvJahr, rvJahr, sozialGesamt, steuerGesamt,
    nettoJahr, nettoMonat,
    steuerquote, gesamtbelastung,
    anNetto: an_netto, anSv: an_sv, anESt: an_eSt, anBrutto: an_brutto,
  };
}
