import { useMemo, useState, type ReactNode } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Callout,
  ChoiceGroup,
  Field,
  ResultPanel,
  ResultRow,
  StatGrid,
  StatTile,
  ToneBadge,
  ToolLayout,
  ToolSection,
  selectCls,
} from "@/components/cockpit/kit";
import {
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Building2,
  ShoppingCart,
  Truck,
  ListChecks,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";

// ============================================================
// USt-RECHNER · Stand Mai 2026
// ============================================================
// Rechtsgrundlagen:
// - §1 UStG: Steuerbare Umsätze
// - §3a Abs. 2 UStG: B2B-Leistungsort = Empfängersitz
// - §6a UStG: IGL (Innergemeinschaftliche Lieferung)
// - §12 UStG: Steuersätze 19%/7%
// - §13b UStG: Reverse Charge
// - §19 UStG: Kleinunternehmer (reformiert 1.1.2025!)
// - OSS-Verfahren: EU-VO 2017/2454 (One-Stop-Shop, seit 1.7.2021)
// ============================================================

// ===== KONSTANTEN — bei Reform aktualisieren =====
const UST_REGULAR = 19;
const UST_REDUCED = 7;
const KU_VORJAHR_NEU = 25000; // §19 UStG ab 1.1.2025 (vorher 22.000)
const KU_AKTUELL_NEU = 100000; // §19 UStG ab 1.1.2025 (vorher 50.000)
const OSS_SCHWELLE = 10000; // EU-B2C Lieferschwelle pro Kalenderjahr

const formatEur = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

const UstRechner = () => {
  return (
    <CockpitShell
      eyebrow="USt-Rechner · Stand Mai 2026"
      title="Deutsche Umsatzsteuer: alle wichtigen Fälle"
      subtitle="Brutto und Netto, Kleinunternehmer §19 (Reform 2025), Reverse Charge §13b, OSS für B2C in der EU und innergemeinschaftliche Lieferung. Mit Quellen und Schwellen."
    >
      <Tabs defaultValue="brutto-netto" className="w-full">
        <div className="-mx-4 mb-6 overflow-x-auto px-4 md:mx-0 md:px-0">
          <TabsList className="h-auto w-max gap-0.5 rounded-xl p-1">
            <TabsTrigger value="brutto-netto" className="gap-1.5 rounded-lg px-3.5 py-2">
              <Calculator className="h-4 w-4" aria-hidden="true" /> Brutto und Netto
            </TabsTrigger>
            <TabsTrigger value="kleinunternehmer" className="gap-1.5 rounded-lg px-3.5 py-2">
              <Building2 className="h-4 w-4" aria-hidden="true" /> Kleinunternehmer §19
            </TabsTrigger>
            <TabsTrigger value="reverse-charge" className="gap-1.5 rounded-lg px-3.5 py-2">
              <Globe className="h-4 w-4" aria-hidden="true" /> Reverse Charge §13b
            </TabsTrigger>
            <TabsTrigger value="oss" className="gap-1.5 rounded-lg px-3.5 py-2">
              <ShoppingCart className="h-4 w-4" aria-hidden="true" /> OSS B2C-EU
            </TabsTrigger>
            <TabsTrigger value="igl" className="gap-1.5 rounded-lg px-3.5 py-2">
              <Truck className="h-4 w-4" aria-hidden="true" /> IGL B2B-EU
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="brutto-netto" className="mt-0"><BruttoNetto /></TabsContent>
        <TabsContent value="kleinunternehmer" className="mt-0"><Kleinunternehmer /></TabsContent>
        <TabsContent value="reverse-charge" className="mt-0"><ReverseCharge /></TabsContent>
        <TabsContent value="oss" className="mt-0"><OssVerfahren /></TabsContent>
        <TabsContent value="igl" className="mt-0"><IglRechner /></TabsContent>
      </Tabs>

      <Callout tone="warning" title="Wichtige Hinweise" className="mt-8">
        <ul className="list-disc space-y-1 pl-4">
          <li>
            §19 UStG wurde zum <strong>1.1.2025 reformiert</strong>: Schwellen 22k→25k (Vorjahr)
            und 50k→100k (laufendes Jahr). Echte Schwelle, nicht Schätzung.
          </li>
          <li>
            OSS-Schwelle <strong>10.000 €/Jahr</strong> gilt seit 1.7.2021 für ALLE EU-Länder
            zusammen (nicht pro Land!).
          </li>
          <li>
            Reverse-Charge §13b ist Pflicht — Rechnung muss "Steuerschuldnerschaft des
            Leistungsempfängers" enthalten.
          </li>
          <li>
            Konkrete Berechnung bei Bauleistungen / IGL-Versendung / Drittland-Konstellationen
            mit StB klären (haftungsbeschränkt: Verkauf an Endkunden in DE).
          </li>
        </ul>
      </Callout>
    </CockpitShell>
  );
};

// ============================================================
// TAB 1: BRUTTO ↔ NETTO
// ============================================================
const BruttoNetto = () => {
  const [direction, setDirection] = useState<"netto-zu-brutto" | "brutto-zu-netto">(
    "netto-zu-brutto",
  );
  const [betrag, setBetrag] = useState(1000);
  const [satz, setSatz] = useState<7 | 19>(19);

  const calc = useMemo(() => {
    if (direction === "netto-zu-brutto") {
      const netto = betrag;
      const ust = netto * (satz / 100);
      const brutto = netto + ust;
      return { netto, ust, brutto };
    } else {
      const brutto = betrag;
      const netto = brutto / (1 + satz / 100);
      const ust = brutto - netto;
      return { netto, ust, brutto };
    }
  }, [direction, betrag, satz]);

  const zuBrutto = direction === "netto-zu-brutto";

  return (
    <ToolLayout
      inputs={
        <>
          <ToolSection title="Betrag und Steuersatz" icon={SlidersHorizontal}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Richtung" htmlFor="bn-richtung">
                <select
                  id="bn-richtung"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value as typeof direction)}
                  className={selectCls}
                >
                  <option value="netto-zu-brutto">Netto → Brutto (USt aufschlagen)</option>
                  <option value="brutto-zu-netto">Brutto → Netto (USt herausrechnen)</option>
                </select>
              </Field>
              <div className="space-y-1.5">
                <p className="text-sm font-medium">USt-Satz</p>
                <ChoiceGroup<7 | 19>
                  label="USt-Satz"
                  value={satz}
                  onChange={(v) => setSatz(v)}
                  options={[
                    { value: 19 as const, label: "19 %" },
                    { value: 7 as const, label: "7 %" },
                  ]}
                  className="[&>button]:flex-1 [&>button]:text-center"
                />
              </div>
              <Field
                className="sm:col-span-2"
                label={zuBrutto ? "Netto-Betrag (€)" : "Brutto-Betrag (€)"}
                htmlFor="bn-betrag"
              >
                <Input
                  id="bn-betrag"
                  type="number"
                  min={0}
                  step={0.01}
                  value={betrag}
                  onChange={(e) => setBetrag(Math.max(0, Number(e.target.value) || 0))}
                  className="tabular"
                />
              </Field>
            </div>
          </ToolSection>

          <ToolSection title="So wird gerechnet" icon={Calculator}>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-medium">Formel</dt>
                <dd className="mt-0.5 text-muted-foreground">
                  Brutto = Netto × (1 + USt-Satz) · Netto = Brutto / (1 + USt-Satz) · USt = Netto × USt-Satz
                </dd>
              </div>
              <div>
                <dt className="font-medium">Reduzierter Satz 7 %</dt>
                <dd className="mt-0.5 text-muted-foreground">
                  Lebensmittel, Bücher, Zeitungen, Personenbeförderung, Beherbergung (§12 Abs. 2 UStG, Anlage 2)
                </dd>
              </div>
            </dl>
          </ToolSection>
        </>
      }
      result={
        <ResultPanel
          variant="ink"
          kicker={zuBrutto ? "Netto → Brutto" : "Brutto → Netto"}
          title={zuBrutto ? "Brutto-Betrag" : "Netto-Betrag"}
          value={formatEur(zuBrutto ? calc.brutto : calc.netto)}
          valueHint={`bei ${satz} % Umsatzsteuer`}
        >
          <div className="divide-y divide-white/10 border-t border-white/10">
            <ResultRow label="Netto" value={formatEur(calc.netto)} />
            <ResultRow label={`USt ${satz}%`} value={formatEur(calc.ust)} />
            <ResultRow label="Brutto" value={formatEur(calc.brutto)} strong />
          </div>
        </ResultPanel>
      }
    />
  );
};

// ============================================================
// TAB 2: KLEINUNTERNEHMER §19 (Reform 2025!)
// ============================================================
const Kleinunternehmer = () => {
  const [umsatzVorjahr, setUmsatzVorjahr] = useState(20000);
  const [umsatzAktuell, setUmsatzAktuell] = useState(40000);
  const [istExistenzgruender, setIstExistenzgruender] = useState(false);
  const [gruendungsMonat, setGruendungsMonat] = useState(7); // Juli

  const result = useMemo(() => {
    // Gründungsjahr (§19 Abs. 1 Satz 2 UStG n. F., BMF 18.03.2025 / Abschn. 19.1 Abs. 4 UStAE):
    // volle Grenze 25.000 € OHNE Hochrechnung; wer sie überschreitet, verliert die KU sofort.
    // Erst für das FOLGEJAHR wird der Umsatz des Rumpfjahres auf 12 Monate hochgerechnet (§19 Abs. 4 Satz 2 UStG).
    if (istExistenzgruender) {
      const aktiveMonate = 12 - Math.max(0, Math.min(11, gruendungsMonat - 1));
      const aktuellOk = umsatzAktuell <= KU_VORJAHR_NEU;
      const folgejahrHochgerechnet = (umsatzAktuell / aktiveMonate) * 12;
      return {
        vorjahrOk: true,
        aktuellOk,
        istKu: aktuellOk,
        verlustImLaufendenJahr: !aktuellOk,
        anteiligeSchwelle: KU_VORJAHR_NEU,
        folgejahrHochgerechnet,
        istExistenzgruender: true,
      };
    }
    const vorjahrOk = umsatzVorjahr <= KU_VORJAHR_NEU;
    const aktuellOk = umsatzAktuell <= KU_AKTUELL_NEU;
    const istKu = vorjahrOk && aktuellOk;
    const verlustImLaufendenJahr = umsatzAktuell > KU_AKTUELL_NEU;
    return { vorjahrOk, aktuellOk, istKu, verlustImLaufendenJahr, anteiligeSchwelle: 0, folgejahrHochgerechnet: umsatzAktuell, istExistenzgruender: false };
  }, [umsatzVorjahr, umsatzAktuell, istExistenzgruender, gruendungsMonat]);

  return (
    <ToolLayout
      inputs={
        <>
          <Callout tone="info" title="Reform 1.1.2025">
            Schwellen erhöht von 22.000/50.000 € auf <strong>25.000/100.000 €</strong>. KU-Umsatz ist jetzt
            "steuerfrei" (vorher "wird nicht erhoben"). Bei Überschreitung der 100k im laufenden
            Jahr → sofortiger Verlust des KU-Status (vorher: erst im Folgejahr).
          </Callout>

          <ToolSection title="Deine Umsätze" icon={SlidersHorizontal}>
            <div className="space-y-4">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3.5 transition-colors hover:border-foreground/25 has-[:checked]:border-accent-blue/40 has-[:checked]:bg-accent">
                <input
                  type="checkbox"
                  checked={istExistenzgruender}
                  onChange={(e) => setIstExistenzgruender(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[hsl(var(--accent-blue))]"
                />
                <span className="text-sm">
                  <span className="block font-medium">Existenzgründer im Gründungsjahr</span>
                  <span className="mt-0.5 block text-muted-foreground">Kein Vorjahres-Umsatz, Grenze 25.000 € im Gründungsjahr (ohne Hochrechnung)</span>
                </span>
              </label>
              {istExistenzgruender && (
                <Field
                  label="Gründungsmonat"
                  htmlFor="ku-monat"
                  hint={
                    <>
                      Für das Folgejahr hochgerechnet:{" "}
                      <strong className="text-foreground tabular">{Math.round(result.folgejahrHochgerechnet).toLocaleString("de-DE")} €</strong>{" "}
                      (= Umsatz / {12 - (gruendungsMonat - 1)} × 12). Liegt das über 25.000 €, ist im Folgejahr keine KU möglich.
                    </>
                  }
                >
                  <select
                    id="ku-monat"
                    value={gruendungsMonat}
                    onChange={(e) => setGruendungsMonat(Number(e.target.value))}
                    className={selectCls}
                  >
                    {["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"].map((m, i) => (
                      <option key={m} value={i + 1}>{m} ({12 - i} Mon. verbleibend)</option>
                    ))}
                  </select>
                </Field>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {!istExistenzgruender && (
                  <Field label="Vorjahres-Umsatz (netto, €)" htmlFor="ku-vorjahr" hint={`Schwelle: ${KU_VORJAHR_NEU.toLocaleString("de-DE")} €`}>
                    <Input
                      id="ku-vorjahr"
                      type="number"
                      min={0}
                      value={umsatzVorjahr}
                      onChange={(e) => setUmsatzVorjahr(Math.max(0, Number(e.target.value) || 0))}
                      className="tabular"
                    />
                  </Field>
                )}
                <Field
                  label="Aktueller Jahres-Umsatz (netto, €)"
                  htmlFor="ku-aktuell"
                  hint={`Schwelle: ${istExistenzgruender ? Math.round(result.anteiligeSchwelle).toLocaleString("de-DE") : KU_AKTUELL_NEU.toLocaleString("de-DE")} €`}
                >
                  <Input
                    id="ku-aktuell"
                    type="number"
                    min={0}
                    value={umsatzAktuell}
                    onChange={(e) => setUmsatzAktuell(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
              </div>
            </div>
          </ToolSection>

          <ToolSection title="Was bedeutet der KU-Status konkret?" icon={ListChecks}>
            <ul className="list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Keine USt-Berechnung</strong> auf Rechnungen (kein 19%/7%-Aufschlag)</li>
              <li>Rechnungs-Hinweis: <em>"Gemäß §19 UStG wird keine Umsatzsteuer erhoben"</em></li>
              <li><strong className="text-foreground">KEIN Vorsteuer-Abzug</strong> möglich (eingekaufte USt = Aufwand)</li>
              <li>
                <strong className="text-foreground">Verzicht auf KU-Regelung</strong> ("Option zur Regelbesteuerung") bindet 5
                Jahre — schriftlich beim Finanzamt anmelden
              </li>
              <li>
                <strong className="text-foreground">Reverse-Charge §13b</strong>: greift auch für KU bei Einkauf aus EU-Ausland —
                USt-Schuldnerschaft, aber kein VSt-Abzug
              </li>
              <li>
                <strong className="text-foreground">Ab Überschreitung 100k im laufenden Jahr</strong>: SOFORTIGER Wechsel zur
                Regelbesteuerung — Rechnungen für Umsätze NACH Überschreitung mit USt
              </li>
            </ul>
          </ToolSection>
        </>
      }
      result={
        <StatusPanel
          ok={result.istKu}
          okTone="success"
          failTone="danger"
          kicker="KU-Status §19 UStG"
          title={
            result.istKu
              ? "Kleinunternehmer"
              : result.verlustImLaufendenJahr
              ? "Verlust im laufenden Jahr"
              : "Regelbesteuerer"
          }
        >
          <div className="space-y-2">
            <FactRow
              ok={result.vorjahrOk}
              label={`Vorjahr ≤ ${KU_VORJAHR_NEU.toLocaleString("de-DE")} €`}
              value={`${umsatzVorjahr.toLocaleString("de-DE")} €`}
            />
            <FactRow
              ok={result.aktuellOk}
              label={`Aktuell ≤ ${(istExistenzgruender ? KU_VORJAHR_NEU : KU_AKTUELL_NEU).toLocaleString("de-DE")} €`}
              value={`${umsatzAktuell.toLocaleString("de-DE")} €`}
            />
          </div>
        </StatusPanel>
      }
    />
  );
};

// ============================================================
// TAB 3: REVERSE-CHARGE §13b
// ============================================================
const ReverseCharge = () => {
  const [empfaengerSitz, setEmpfaengerSitz] = useState<"de" | "eu" | "drittland">("eu");
  const [art, setArt] = useState<"dienstleistung" | "werklieferung" | "bauleistung" | "metalle">(
    "dienstleistung",
  );
  const [istB2b, setIstB2b] = useState(true);
  const [hatUstId, setHatUstId] = useState(true);

  const result = useMemo(() => {
    let rcGreift = false;
    let begruendung = "";
    let rechnungsHinweis = "";

    if (empfaengerSitz === "de") {
      if (art === "bauleistung" && istB2b) {
        rcGreift = true;
        begruendung = "§13b Abs. 2 Nr. 4 UStG: Bauleistung zwischen Bauunternehmern";
        rechnungsHinweis = "Steuerschuldnerschaft des Leistungsempfängers";
      } else if (art === "metalle" && istB2b) {
        rcGreift = true;
        begruendung = "§13b Abs. 2 Nr. 7 UStG: Lieferung von Metallen/Schrott";
        rechnungsHinweis = "Steuerschuldnerschaft des Leistungsempfängers";
      } else {
        begruendung = "Standard-Inlandsfall — DE-USt 19%/7% mit Vorsteuer-Abzug";
      }
    } else if (empfaengerSitz === "eu") {
      if (istB2b && hatUstId) {
        rcGreift = true;
        if (art === "dienstleistung") {
          begruendung =
            "§3a Abs. 2 UStG: B2B-Leistung an EU-Unternehmer mit USt-IdNr. → Leistungsort = Empfängersitz → RC §13b";
          rechnungsHinweis = "Reverse Charge — Steuerschuldnerschaft des Leistungsempfängers";
        } else {
          begruendung = "§13b Abs. 1 UStG: Werklieferung an EU-B2B-Empfänger";
          rechnungsHinweis = "Reverse Charge — Steuerschuldnerschaft des Leistungsempfängers";
        }
      } else if (!istB2b) {
        begruendung =
          "EU-B2C → bis 10k/Jahr DE-USt, darüber OSS-Verfahren (siehe OSS-Tab)";
      } else {
        begruendung = "Keine USt-IdNr. → kein RC, DE-USt 19% wie Inlandskunde";
      }
    } else {
      // drittland
      if (istB2b) {
        rcGreift = true;
        begruendung =
          "§3a Abs. 2 UStG / Drittland-B2B → Leistungsort im Ausland → nicht steuerbar in DE";
        rechnungsHinweis = "Not subject to German VAT (B2B service abroad)";
      } else {
        begruendung =
          "Drittland-B2C: Sondervorschriften (z.B. Tele-/Streaming-Dienste § 3a Abs. 5 — Empfängerort)";
      }
    }

    return { rcGreift, begruendung, rechnungsHinweis };
  }, [empfaengerSitz, art, istB2b, hatUstId]);

  return (
    <ToolLayout
      inputs={
        <ToolSection title="Dein Fall" icon={SlidersHorizontal}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Sitz des Empfängers" htmlFor="rc-sitz">
              <select
                id="rc-sitz"
                value={empfaengerSitz}
                onChange={(e) => setEmpfaengerSitz(e.target.value as typeof empfaengerSitz)}
                className={selectCls}
              >
                <option value="de">Deutschland</option>
                <option value="eu">EU-Ausland</option>
                <option value="drittland">Drittland (US, UK, CH ...)</option>
              </select>
            </Field>
            <Field label="Art der Leistung" htmlFor="rc-art">
              <select
                id="rc-art"
                value={art}
                onChange={(e) => setArt(e.target.value as typeof art)}
                className={selectCls}
              >
                <option value="dienstleistung">Dienstleistung (IT, Beratung, SaaS)</option>
                <option value="werklieferung">Werklieferung (Lieferung + Montage)</option>
                <option value="bauleistung">Bauleistung (§13b Abs. 2 Nr. 4)</option>
                <option value="metalle">Metalle/Schrott (§13b Abs. 2 Nr. 7)</option>
              </select>
            </Field>
            <div className="space-y-1.5">
              <p className="text-sm font-medium">B2B oder B2C?</p>
              <ChoiceGroup<boolean>
                label="B2B oder B2C"
                value={istB2b}
                onChange={setIstB2b}
                options={[
                  { value: true, label: "B2B (Unternehmer)" },
                  { value: false, label: "B2C (Privatkunde)" },
                ]}
                className="[&>button]:flex-1 [&>button]:text-center"
              />
            </div>
            {empfaengerSitz === "eu" && istB2b && (
              <div className="space-y-1.5">
                <p className="text-sm font-medium">Gültige USt-IdNr. vorhanden?</p>
                <ChoiceGroup<boolean>
                  label="Gültige USt-IdNr. vorhanden"
                  value={hatUstId}
                  onChange={setHatUstId}
                  options={[
                    { value: true, label: "Ja, geprüft" },
                    { value: false, label: "Nein" },
                  ]}
                  className="[&>button]:flex-1 [&>button]:text-center"
                />
                <p className="text-xs text-muted-foreground">
                  Pflicht-Validierung über das{" "}
                  <a
                    href="https://evatr.bff-online.de/eVatR/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent-blue underline-offset-2 hover:underline"
                  >
                    BZSt-Bestätigungsverfahren
                  </a>
                </p>
              </div>
            )}
          </div>
        </ToolSection>
      }
      result={
        <StatusPanel
          ok={result.rcGreift}
          okTone="success"
          failTone="warning"
          kicker="Reverse-Charge-Status"
          title={result.rcGreift ? "Reverse Charge greift" : "Standard-USt (kein RC)"}
        >
          <p className="text-sm leading-relaxed text-foreground/80">{result.begruendung}</p>
          {result.rechnungsHinweis && <PflichtHinweis text={result.rechnungsHinweis} />}
        </StatusPanel>
      }
    />
  );
};

// ============================================================
// TAB 4: OSS B2C-EU
// ============================================================
const OssVerfahren = () => {
  const [umsatzB2cEu, setUmsatzB2cEu] = useState(15000);
  const [zielLand, setZielLand] = useState<"at" | "fr" | "it" | "nl" | "es" | "pl">("at");

  const ZIEL_LAENDER: Record<string, { name: string; ust: number }> = {
    at: { name: "Österreich", ust: 20 },
    fr: { name: "Frankreich", ust: 20 },
    it: { name: "Italien", ust: 22 },
    nl: { name: "Niederlande", ust: 21 },
    es: { name: "Spanien", ust: 21 },
    pl: { name: "Polen", ust: 23 },
  };

  const result = useMemo(() => {
    const ueberSchwelle = umsatzB2cEu > OSS_SCHWELLE;
    const zielUst = ZIEL_LAENDER[zielLand].ust;
    return { ueberSchwelle, zielUst };
  }, [umsatzB2cEu, zielLand]);

  return (
    <ToolLayout
      inputs={
        <>
          <Callout tone="info" title="OSS-Verfahren (seit 1.7.2021)">
            Bei B2C-Verkäufen in andere EU-Länder gilt eine{" "}
            <strong>einheitliche Lieferschwelle 10.000 €/Jahr für ALLE EU-Länder zusammen</strong>{" "}
            (nicht pro Land!). Unter 10k → DE-USt. Über 10k → USt des Ziel-Landes via OSS
            (One-Stop-Shop beim BZSt, quartalsweise Meldung).
          </Callout>

          <ToolSection title="Deine EU-Verkäufe" icon={SlidersHorizontal}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="B2C-EU-Umsatz gesamt pro Jahr (€)"
                htmlFor="oss-umsatz"
                hint={`Schwelle: ${OSS_SCHWELLE.toLocaleString("de-DE")} € (alle EU-Länder kombiniert)`}
              >
                <Input
                  id="oss-umsatz"
                  type="number"
                  min={0}
                  value={umsatzB2cEu}
                  onChange={(e) => setUmsatzB2cEu(Math.max(0, Number(e.target.value) || 0))}
                  className="tabular"
                />
              </Field>
              <Field label="Zielland (Beispiel)" htmlFor="oss-land">
                <select
                  id="oss-land"
                  value={zielLand}
                  onChange={(e) => setZielLand(e.target.value as typeof zielLand)}
                  className={selectCls}
                >
                  {Object.entries(ZIEL_LAENDER).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.name} ({v.ust}% USt)
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </ToolSection>

          <ToolSection title="OSS in der Praxis" icon={ListChecks}>
            <ul className="list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
              <li>OSS-Anmeldung beim BZSt: <code className="rounded bg-secondary px-1 py-0.5 text-xs text-foreground">BOP-Portal</code> (BZSt-Online-Portal)</li>
              <li>
                <strong className="text-foreground">Quartals-Meldung</strong>: bis Ende des Folgemonats (Q1 → 30.4., Q2 → 31.7., Q3
                → 31.10., Q4 → 31.1.)
              </li>
              <li>
                <strong className="text-foreground">Verzicht möglich</strong>: bewusst auf OSS verzichten, dann nationale
                Registrierung im Ziel-Land Pflicht (lohnt sich kaum)
              </li>
              <li>Amazon Pan-EU-FBA hat eigene Komplikationen (Lager in IT/FR/ES/PL/CZ) — siehe Amazon-USt-Tool</li>
            </ul>
          </ToolSection>
        </>
      }
      result={
        <StatusPanel
          ok={!result.ueberSchwelle}
          okTone="success"
          failTone="warning"
          kicker="OSS-Status"
          title={result.ueberSchwelle ? "Über 10k: OSS-Pflicht" : "Unter 10k: DE-USt"}
        >
          {result.ueberSchwelle ? (
            <div className="space-y-3 text-sm">
              <p className="leading-relaxed text-foreground/80">
                Du musst <strong className="text-foreground">{ZIEL_LAENDER[zielLand].name}-USt {result.zielUst}%</strong>{" "}
                abführen, gemeldet via OSS-Portal beim BZSt (quartalsweise, ohne nationale
                Registrierung im Ziel-Land nötig).
              </p>
              <div className="rounded-xl border border-border bg-card p-3.5">
                <p className="text-sm font-medium">Beispiel: 100 € Brutto-Verkauf nach {ZIEL_LAENDER[zielLand].name}</p>
                <div className="mt-1 divide-y divide-border/70">
                  <ResultRow label="Netto" value={`~${(100 / (1 + result.zielUst / 100)).toFixed(2)} €`} />
                  <ResultRow label={`${result.zielUst}% USt an BZSt`} value={`${(100 - 100 / (1 + result.zielUst / 100)).toFixed(2)} €`} />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-foreground/80">
              Du verrechnest <strong className="text-foreground">DE-USt 19%/7%</strong> wie bei Inlandskunden. Erst ab
              Überschreitung der 10k-Schwelle wechselt die USt-Pflicht zum Ziel-Land.
            </p>
          )}
        </StatusPanel>
      }
    />
  );
};

// ============================================================
// TAB 5: IGL B2B-EU
// ============================================================
const IglRechner = () => {
  const [warenwert, setWarenwert] = useState(5000);
  const [hatUstId, setHatUstId] = useState(true);
  const [hatBelege, setHatBelege] = useState(true);

  const istIgl = hatUstId && hatBelege;

  return (
    <ToolLayout
      inputs={
        <>
          <Callout tone="info" title="Innergemeinschaftliche Lieferung (IGL) §6a UStG">
            B2B-Warenverkauf an EU-Empfänger ist <strong>steuerfrei</strong> wenn (1) Empfänger eine
            gültige USt-IdNr. hat, (2) Ware DE verlässt, (3) Belegnachweis (Frachtbrief/Spediteur)
            UND Buchnachweis (USt-IdNr.-Bestätigung) vorliegen. Pflicht: Zusammenfassende Meldung
            (ZM) bis 25. des Folgemonats.
          </Callout>

          <ToolSection title="Deine Lieferung" icon={SlidersHorizontal}>
            <div className="space-y-4">
              <Field label="Warenwert netto (€)" htmlFor="igl-wert">
                <Input
                  id="igl-wert"
                  type="number"
                  min={0}
                  value={warenwert}
                  onChange={(e) => setWarenwert(Math.max(0, Number(e.target.value) || 0))}
                  className="tabular"
                />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <p className="text-sm font-medium">Gültige USt-IdNr. und qualifizierte Bestätigung?</p>
                  <ChoiceGroup<boolean>
                    label="Gültige USt-IdNr. und qualifizierte Bestätigung"
                    value={hatUstId}
                    onChange={setHatUstId}
                    options={[
                      { value: true, label: "Ja" },
                      { value: false, label: "Nein" },
                    ]}
                    className="[&>button]:flex-1 [&>button]:text-center"
                  />
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm font-medium">Belegnachweis (Frachtbrief, CMR, Spediteur-Bestätigung)?</p>
                  <ChoiceGroup<boolean>
                    label="Belegnachweis vorhanden"
                    value={hatBelege}
                    onChange={setHatBelege}
                    options={[
                      { value: true, label: "Ja, vorhanden" },
                      { value: false, label: "Nein/unvollständig" },
                    ]}
                    className="[&>button]:flex-1 [&>button]:text-center"
                  />
                </div>
              </div>
            </div>
          </ToolSection>

          <ToolSection title="IGL in der Praxis: Pflichten" icon={ListChecks}>
            <ul className="list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">USt-IdNr. validieren:</strong> qualifizierte Bestätigung via{" "}
                <a
                  href="https://evatr.bff-online.de/eVatR/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent-blue underline-offset-2 hover:underline"
                >
                  evatr.bff-online.de
                </a>{" "}
                (Bestätigungsverfahren §18e UStG) — bei jeder neuen Geschäftsbeziehung
              </li>
              <li>
                <strong className="text-foreground">Zusammenfassende Meldung (ZM):</strong> bis 25. des Folgemonats elektronisch
                via BZSt-Portal
              </li>
              <li>
                <strong className="text-foreground">Quick Fixes 2020</strong>: USt-IdNr. ist materielle Voraussetzung, nicht nur
                formell. Ohne USt-IdNr.: keine IGL!
              </li>
              <li>
                <strong className="text-foreground">Belegnachweis</strong>: Gelangensbestätigung, Frachtbrief (CMR), Spediteur-
                Bescheinigung — mind. einer davon zwingend
              </li>
            </ul>
          </ToolSection>
        </>
      }
      result={
        <StatusPanel
          ok={istIgl}
          okTone="success"
          failTone="danger"
          kicker="IGL-Status"
          title={istIgl ? "Steuerfrei (IGL)" : "DE-USt 19% Pflicht"}
        >
          <StatGrid cols={2}>
            <StatTile label="Rechnungsbetrag" value={formatEur(istIgl ? warenwert : warenwert * 1.19)} />
            <StatTile
              label="USt-Anteil"
              value={formatEur(istIgl ? 0 : warenwert * 0.19)}
              tone={istIgl ? "success" : "danger"}
            />
          </StatGrid>

          {istIgl && (
            <PflichtHinweis
              text="Steuerfreie innergemeinschaftliche Lieferung gem. §4 Nr. 1b i.V.m. §6a UStG"
              zusatz="Dazu Pflichtangaben: eigene USt-IdNr., USt-IdNr. des Empfängers und Hinweis auf IGL"
            />
          )}

          {!istIgl && (
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground">Folge:</strong> ohne gültige USt-IdNr. ODER ohne Belegnachweis greift IGL nicht
              — du musst <strong className="text-foreground">19% DE-USt</strong> berechnen und abführen. Rückwirkend Erstattung
              möglich, wenn Nachweise nachgereicht werden (komplexer Prozess).
            </p>
          )}
        </StatusPanel>
      }
    />
  );
};

// ============================================================
// SHARED HELPERS
// ============================================================

/** Ergebnis-Karte mit Status-Ton (grün = passt, sonst Warnung/Gefahr). */
const StatusPanel = ({
  ok,
  okTone,
  failTone,
  kicker,
  title,
  children,
}: {
  ok: boolean;
  okTone: "success";
  failTone: "warning" | "danger";
  kicker: string;
  title: string;
  children: ReactNode;
}) => {
  const tone = ok ? okTone : failTone;
  const Icon = ok ? CheckCircle2 : failTone === "danger" ? XCircle : AlertTriangle;
  return (
    <section
      aria-live="polite"
      className={
        tone === "success"
          ? "rounded-2xl border border-success/30 bg-success-soft p-5 shadow-soft md:p-6"
          : tone === "warning"
          ? "rounded-2xl border border-warning/30 bg-warning-soft p-5 shadow-soft md:p-6"
          : "rounded-2xl border border-danger/30 bg-danger-soft p-5 shadow-soft md:p-6"
      }
    >
      <div className="flex items-start gap-3">
        <Icon
          className={`mt-0.5 h-6 w-6 shrink-0 ${tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger"}`}
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{kicker}</p>
          <h2 className="mt-0.5 text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
};

const PflichtHinweis = ({ text, zusatz }: { text: string; zusatz?: string }) => (
  <div className="mt-3 rounded-xl border border-border bg-card p-3.5">
    <div className="flex items-center justify-between gap-2">
      <p className="text-sm font-medium">Rechnungs-Hinweis</p>
      <ToneBadge tone="danger">Pflicht</ToneBadge>
    </div>
    <p className="mt-1.5 font-mono text-sm">"{text}"</p>
    {zusatz && <p className="mt-2 text-xs text-muted-foreground">{zusatz}</p>}
  </div>
);

const FactRow = ({ ok, label, value }: { ok: boolean; label: string; value: string }) => (
  <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm">
    <div className="flex items-center gap-2">
      {ok ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-label="erfüllt" />
      ) : (
        <AlertTriangle className="h-4 w-4 shrink-0 text-danger" aria-label="überschritten" />
      )}
      <span>{label}</span>
    </div>
    <span className="font-medium tabular">{value}</span>
  </div>
);

export default UstRechner;
