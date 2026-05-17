import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Building2,
  Hammer,
  ShoppingCart,
  Info,
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
      title="Deutsche Umsatzsteuer — alle wichtigen Fälle"
      subtitle="Brutto↔Netto · Kleinunternehmer §19 (Reform 2025!) · Reverse-Charge §13b · OSS-EU · IGL B2B-EU. Mit Quellen und Schwellen."
    >
      <Tabs defaultValue="brutto-netto" className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto">
          <TabsTrigger value="brutto-netto">
            <Calculator className="h-4 w-4 mr-1" /> Brutto↔Netto
          </TabsTrigger>
          <TabsTrigger value="kleinunternehmer">
            <Building2 className="h-4 w-4 mr-1" /> Kleinunternehmer §19
          </TabsTrigger>
          <TabsTrigger value="reverse-charge">
            <Globe className="h-4 w-4 mr-1" /> Reverse-Charge §13b
          </TabsTrigger>
          <TabsTrigger value="oss">
            <ShoppingCart className="h-4 w-4 mr-1" /> OSS B2C-EU
          </TabsTrigger>
          <TabsTrigger value="igl">
            <Globe className="h-4 w-4 mr-1" /> IGL B2B-EU
          </TabsTrigger>
        </TabsList>

        <TabsContent value="brutto-netto"><BruttoNetto /></TabsContent>
        <TabsContent value="kleinunternehmer"><Kleinunternehmer /></TabsContent>
        <TabsContent value="reverse-charge"><ReverseCharge /></TabsContent>
        <TabsContent value="oss"><OssVerfahren /></TabsContent>
        <TabsContent value="igl"><IglRechner /></TabsContent>
      </Tabs>

      <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Wichtige Hinweise:</strong>
            <ul className="list-disc pl-4 space-y-1 mt-1 text-muted-foreground">
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
          </div>
        </div>
      </div>
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

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Richtung</Label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as typeof direction)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="netto-zu-brutto">Netto → Brutto (USt aufschlagen)</option>
              <option value="brutto-zu-netto">Brutto → Netto (USt herausrechnen)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">USt-Satz</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[19, 7].map((s) => (
                <button
                  key={s}
                  onClick={() => setSatz(s as 7 | 19)}
                  className={`rounded-md border h-10 text-sm font-semibold ${
                    satz === s
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {s}%
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            {direction === "netto-zu-brutto" ? "Netto-Betrag (€)" : "Brutto-Betrag (€)"}
          </Label>
          <Input
            type="number"
            min={0}
            step={0.01}
            value={betrag}
            onChange={(e) => setBetrag(Math.max(0, Number(e.target.value) || 0))}
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <ResultCard label="Netto" value={formatEur(calc.netto)} color="emerald" />
        <ResultCard label={`USt ${satz}%`} value={formatEur(calc.ust)} color="amber" />
        <ResultCard label="Brutto" value={formatEur(calc.brutto)} color="blue" highlight />
      </div>

      <div className="rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">
        <strong className="text-foreground">Formel:</strong> Brutto = Netto × (1 + USt-Satz) ·{" "}
        Netto = Brutto / (1 + USt-Satz) · USt = Netto × USt-Satz
        <br />
        <strong className="text-foreground">Reduzierter Satz 7%:</strong> Lebensmittel, Bücher,
        Zeitungen, Personenbeförderung, Beherbergung (§12 Abs. 2 UStG, Anlage 2)
      </div>
    </div>
  );
};

// ============================================================
// TAB 2: KLEINUNTERNEHMER §19 (Reform 2025!)
// ============================================================
const Kleinunternehmer = () => {
  const [umsatzVorjahr, setUmsatzVorjahr] = useState(20000);
  const [umsatzAktuell, setUmsatzAktuell] = useState(40000);

  const result = useMemo(() => {
    const vorjahrOk = umsatzVorjahr <= KU_VORJAHR_NEU;
    const aktuellOk = umsatzAktuell <= KU_AKTUELL_NEU;
    const istKu = vorjahrOk && aktuellOk;

    // Bei Überschreitung der 100k-Schwelle im laufenden Jahr:
    // sofortiger Verlust des KU-Status (seit Reform 2025)
    const verlustImLaufendenJahr = umsatzAktuell > KU_AKTUELL_NEU;

    return { vorjahrOk, aktuellOk, istKu, verlustImLaufendenJahr };
  }, [umsatzVorjahr, umsatzAktuell]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="text-blue-700">Reform 1.1.2025:</strong> Schwellen erhöht von
            22.000/50.000 € auf <strong>25.000/100.000 €</strong>. KU-Umsatz ist jetzt
            "steuerfrei" (vorher "wird nicht erhoben"). Bei Überschreitung der 100k im laufenden
            Jahr → sofortiger Verlust des KU-Status (vorher: erst im Folgejahr).
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Vorjahres-Umsatz (Brutto, €)
            </Label>
            <Input
              type="number"
              min={0}
              value={umsatzVorjahr}
              onChange={(e) => setUmsatzVorjahr(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Schwelle: {KU_VORJAHR_NEU.toLocaleString("de-DE")} €
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Aktueller Jahres-Umsatz (Brutto, €)
            </Label>
            <Input
              type="number"
              min={0}
              value={umsatzAktuell}
              onChange={(e) => setUmsatzAktuell(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Schwelle: {KU_AKTUELL_NEU.toLocaleString("de-DE")} €
            </div>
          </div>
        </div>
      </div>

      <div
        className={`rounded-2xl border-2 p-5 ${
          result.istKu
            ? "border-emerald-500/40 bg-emerald-500/5"
            : "border-red-500/40 bg-red-500/5"
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          {result.istKu ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-700" />
          ) : (
            <AlertTriangle className="h-6 w-6 text-red-700" />
          )}
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              KU-Status §19 UStG
            </div>
            <div className="text-2xl font-bold">
              {result.istKu
                ? "✓ Kleinunternehmer"
                : result.verlustImLaufendenJahr
                ? "✗ Verlust im laufenden Jahr"
                : "✗ Regelbesteuerer"}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <FactRow
            ok={result.vorjahrOk}
            label={`Vorjahr ≤ ${KU_VORJAHR_NEU.toLocaleString("de-DE")} €`}
            value={`${umsatzVorjahr.toLocaleString("de-DE")} €`}
          />
          <FactRow
            ok={result.aktuellOk}
            label={`Aktuell ≤ ${KU_AKTUELL_NEU.toLocaleString("de-DE")} €`}
            value={`${umsatzAktuell.toLocaleString("de-DE")} €`}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-2">
        <div className="font-semibold text-sm mb-1">Was bedeutet KU-Status konkret?</div>
        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
          <li><strong>Keine USt-Berechnung</strong> auf Rechnungen (kein 19%/7%-Aufschlag)</li>
          <li>Rechnungs-Hinweis: <em>"Gemäß §19 UStG wird keine Umsatzsteuer erhoben"</em></li>
          <li><strong>KEIN Vorsteuer-Abzug</strong> möglich (eingekaufte USt = Aufwand)</li>
          <li>
            <strong>Verzicht auf KU-Regelung</strong> ("Option zur Regelbesteuerung") bindet 5
            Jahre — schriftlich beim Finanzamt anmelden
          </li>
          <li>
            <strong>Reverse-Charge §13b</strong>: greift auch für KU bei Einkauf aus EU-Ausland —
            USt-Schuldnerschaft, aber kein VSt-Abzug
          </li>
          <li>
            <strong>Ab Überschreitung 100k im laufenden Jahr</strong>: SOFORTIGER Wechsel zur
            Regelbesteuerung — Rechnungen für Umsätze NACH Überschreitung mit USt
          </li>
        </ul>
      </div>
    </div>
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
    <div className="space-y-4">
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Empfänger-Sitz
            </Label>
            <select
              value={empfaengerSitz}
              onChange={(e) => setEmpfaengerSitz(e.target.value as typeof empfaengerSitz)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="de">🇩🇪 Deutschland</option>
              <option value="eu">🇪🇺 EU-Ausland</option>
              <option value="drittland">🌍 Drittland (US, UK, CH...)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Art der Leistung
            </Label>
            <select
              value={art}
              onChange={(e) => setArt(e.target.value as typeof art)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="dienstleistung">Dienstleistung (IT, Beratung, SaaS)</option>
              <option value="werklieferung">Werklieferung (Lieferung + Montage)</option>
              <option value="bauleistung">Bauleistung (§13b Abs. 2 Nr. 4)</option>
              <option value="metalle">Metalle/Schrott (§13b Abs. 2 Nr. 7)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              B2B oder B2C?
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: true, l: "B2B (Unternehmer)" },
                { v: false, l: "B2C (Privatkunde)" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setIstB2b(o.v)}
                  className={`rounded-md border h-10 text-sm ${
                    istB2b === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          {empfaengerSitz === "eu" && istB2b && (
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Gültige USt-IdNr. vorhanden?
              </Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {[
                  { v: true, l: "Ja, geprüft" },
                  { v: false, l: "Nein" },
                ].map((o) => (
                  <button
                    key={String(o.v)}
                    onClick={() => setHatUstId(o.v)}
                    className={`rounded-md border h-10 text-sm ${
                      hatUstId === o.v
                        ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">
                Pflicht-Validierung via{" "}
                <a
                  href="https://evatr.bff-online.de/eVatR/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-blue underline"
                >
                  BZSt-Bestätigungsverfahren
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`rounded-2xl border-2 p-5 ${
          result.rcGreift
            ? "border-emerald-500/40 bg-emerald-500/5"
            : "border-amber-500/40 bg-amber-500/5"
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          {result.rcGreift ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-700" />
          ) : (
            <Info className="h-6 w-6 text-amber-700" />
          )}
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Reverse-Charge-Status
            </div>
            <div className="text-2xl font-bold">
              {result.rcGreift ? "✓ Reverse-Charge greift" : "✗ Standard-USt (kein RC)"}
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground mb-2">{result.begruendung}</div>
        {result.rechnungsHinweis && (
          <div className="rounded-xl bg-card border border-border p-3 mt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Rechnungs-Hinweis (Pflicht)
            </div>
            <div className="font-mono text-sm">"{result.rechnungsHinweis}"</div>
          </div>
        )}
      </div>
    </div>
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
    <div className="space-y-4">
      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="text-blue-700">OSS-Verfahren (seit 1.7.2021):</strong> Bei B2C-
            Verkäufen in andere EU-Länder gilt eine{" "}
            <strong>einheitliche Lieferschwelle 10.000 €/Jahr für ALLE EU-Länder zusammen</strong>{" "}
            (nicht pro Land!). Unter 10k → DE-USt. Über 10k → USt des Ziel-Landes via OSS
            (One-Stop-Shop beim BZSt, quartalsweise Meldung).
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Gesamt-B2C-EU-Umsatz / Jahr (€)
            </Label>
            <Input
              type="number"
              min={0}
              value={umsatzB2cEu}
              onChange={(e) => setUmsatzB2cEu(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Schwelle: {OSS_SCHWELLE.toLocaleString("de-DE")} € (alle EU-Länder kombiniert)
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Ziel-Land (Beispiel)
            </Label>
            <select
              value={zielLand}
              onChange={(e) => setZielLand(e.target.value as typeof zielLand)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {Object.entries(ZIEL_LAENDER).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.name} ({v.ust}% USt)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div
        className={`rounded-2xl border-2 p-5 ${
          result.ueberSchwelle
            ? "border-amber-500/40 bg-amber-500/5"
            : "border-emerald-500/40 bg-emerald-500/5"
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          {result.ueberSchwelle ? (
            <AlertTriangle className="h-6 w-6 text-amber-700" />
          ) : (
            <CheckCircle2 className="h-6 w-6 text-emerald-700" />
          )}
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              OSS-Status
            </div>
            <div className="text-2xl font-bold">
              {result.ueberSchwelle ? "✗ Über 10k → OSS-Pflicht" : "✓ Unter 10k → DE-USt"}
            </div>
          </div>
        </div>

        {result.ueberSchwelle ? (
          <div className="text-sm">
            <div className="mb-2">
              Du musst <strong>{ZIEL_LAENDER[zielLand].name}-USt {result.zielUst}%</strong>{" "}
              abführen, gemeldet via OSS-Portal beim BZSt (quartalsweise, ohne nationale
              Registrierung im Ziel-Land nötig).
            </div>
            <div className="rounded-lg bg-card border border-border p-3 text-xs">
              <strong>Beispiel:</strong> 100 € Brutto-Verkauf nach {ZIEL_LAENDER[zielLand].name} = ~
              {(100 / (1 + result.zielUst / 100)).toFixed(2)} € Netto + {result.zielUst}% USt ={" "}
              {(100 - 100 / (1 + result.zielUst / 100)).toFixed(2)} € USt an BZSt
            </div>
          </div>
        ) : (
          <div className="text-sm">
            Du verrechnest <strong>DE-USt 19%/7%</strong> wie bei Inlandskunden. Erst ab
            Überschreitung der 10k-Schwelle wechselt die USt-Pflicht zum Ziel-Land.
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-2">
        <div className="font-semibold text-sm">OSS-Praxis:</div>
        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
          <li>OSS-Anmeldung beim BZSt: <code>BOP-Portal</code> (BZSt-Online-Portal)</li>
          <li>
            <strong>Quartals-Meldung</strong>: bis 30. des Folgemonats (Q1 → 30.4., Q2 → 30.7., Q3
            → 30.10., Q4 → 30.1.)
          </li>
          <li>
            <strong>Verzicht möglich</strong>: bewusst auf OSS verzichten, dann nationale
            Registrierung im Ziel-Land Pflicht (lohnt sich kaum)
          </li>
          <li>Amazon Pan-EU-FBA hat eigene Komplikationen (Lager in IT/FR/ES/PL/CZ) — siehe Amazon-USt-Tool</li>
        </ul>
      </div>
    </div>
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
    <div className="space-y-4">
      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="text-blue-700">Innergemeinschaftliche Lieferung (IGL) §6a UStG:</strong>{" "}
            B2B-Warenverkauf an EU-Empfänger ist <strong>steuerfrei</strong> wenn (1) Empfänger eine
            gültige USt-IdNr. hat, (2) Ware DE verlässt, (3) Belegnachweis (Frachtbrief/Spediteur)
            UND Buchnachweis (USt-IdNr.-Bestätigung) vorliegen. Pflicht: Zusammenfassende Meldung
            (ZM) bis 25. des Folgemonats.
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Warenwert Netto (€)
            </Label>
            <Input
              type="number"
              min={0}
              value={warenwert}
              onChange={(e) => setWarenwert(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Gültige USt-IdNr. + qualifizierte Bestätigung?
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: true, l: "Ja" },
                { v: false, l: "Nein" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setHatUstId(o.v)}
                  className={`rounded-md border h-10 text-sm ${
                    hatUstId === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Belegnachweis (Frachtbrief, CMR, Spediteur-Bestätigung)?
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: true, l: "Ja, vorhanden" },
                { v: false, l: "Nein/unvollständig" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setHatBelege(o.v)}
                  className={`rounded-md border h-10 text-sm ${
                    hatBelege === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`rounded-2xl border-2 p-5 ${
          istIgl ? "border-emerald-500/40 bg-emerald-500/5" : "border-red-500/40 bg-red-500/5"
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          {istIgl ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-700" />
          ) : (
            <AlertTriangle className="h-6 w-6 text-red-700" />
          )}
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">IGL-Status</div>
            <div className="text-2xl font-bold">
              {istIgl ? "✓ Steuerfrei (IGL)" : "✗ DE-USt 19% Pflicht"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-card border border-border p-3">
            <div className="text-xs text-muted-foreground mb-1">Rechnungsbetrag</div>
            <div className="text-xl font-bold">
              {formatEur(istIgl ? warenwert : warenwert * 1.19)}
            </div>
          </div>
          <div className="rounded-lg bg-card border border-border p-3">
            <div className="text-xs text-muted-foreground mb-1">USt-Anteil</div>
            <div className={`text-xl font-bold ${istIgl ? "text-emerald-700" : "text-red-700"}`}>
              {formatEur(istIgl ? 0 : warenwert * 0.19)}
            </div>
          </div>
        </div>

        {istIgl && (
          <div className="rounded-xl bg-card border border-border p-3 mt-3">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Rechnungs-Hinweis (Pflicht)
            </div>
            <div className="font-mono text-sm">
              "Steuerfreie innergemeinschaftliche Lieferung gem. §4 Nr. 1b i.V.m. §6a UStG"
            </div>
            <div className="text-[10px] text-muted-foreground mt-2">
              + Pflichtangaben: eigene USt-IdNr. + USt-IdNr. des Empfängers + Hinweis auf IGL
            </div>
          </div>
        )}

        {!istIgl && (
          <div className="text-sm mt-3">
            <strong>Folge:</strong> ohne gültige USt-IdNr. ODER ohne Belegnachweis greift IGL nicht
            — du musst <strong>19% DE-USt</strong> berechnen und abführen. Rückwirkend Erstattung
            möglich, wenn Nachweise nachgereicht werden (komplexer Prozess).
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-2">
        <div className="font-semibold text-sm">IGL-Praxis (Pflichten):</div>
        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
          <li>
            <strong>USt-IdNr. validieren:</strong> qualifizierte Bestätigung via{" "}
            <a
              href="https://evatr.bff-online.de/eVatR/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue underline"
            >
              evatr.bff-online.de
            </a>{" "}
            (Bestätigungsverfahren §18e UStG) — bei jeder neuen Geschäftsbeziehung
          </li>
          <li>
            <strong>Zusammenfassende Meldung (ZM):</strong> bis 25. des Folgemonats elektronisch
            via BZSt-Portal
          </li>
          <li>
            <strong>Quick Fixes 2020</strong>: USt-IdNr. ist materielle Voraussetzung, nicht nur
            formell. Ohne USt-IdNr.: keine IGL!
          </li>
          <li>
            <strong>Belegnachweis</strong>: Gelangensbestätigung, Frachtbrief (CMR), Spediteur-
            Bescheinigung — mind. einer davon zwingend
          </li>
        </ul>
      </div>
    </div>
  );
};

// ============================================================
// SHARED HELPERS
// ============================================================
const ResultCard = ({
  label,
  value,
  color,
  highlight,
}: {
  label: string;
  value: string;
  color: "emerald" | "amber" | "blue";
  highlight?: boolean;
}) => {
  const colorClass = {
    emerald: "border-emerald-500/40 bg-emerald-500/5 text-emerald-700",
    amber: "border-amber-500/40 bg-amber-500/5 text-amber-700",
    blue: "border-blue-500/40 bg-blue-500/5 text-blue-700",
  }[color];
  return (
    <div
      className={`rounded-2xl border ${highlight ? "border-2" : ""} ${colorClass} p-4 ${
        highlight ? "shadow-md" : ""
      }`}
    >
      <div className="text-xs uppercase tracking-wider opacity-80 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

const FactRow = ({ ok, label, value }: { ok: boolean; label: string; value: string }) => (
  <div className="flex items-center justify-between rounded-lg bg-card border border-border px-3 py-2">
    <div className="flex items-center gap-2">
      {ok ? (
        <CheckCircle2 className="h-4 w-4 text-emerald-700" />
      ) : (
        <AlertTriangle className="h-4 w-4 text-red-700" />
      )}
      <span>{label}</span>
    </div>
    <span className="font-mono text-sm">{value}</span>
  </div>
);

export default UstRechner;
