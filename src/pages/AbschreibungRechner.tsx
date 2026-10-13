import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Callout,
  ChoiceGroup,
  EmptyState,
  Field,
  KitTable,
  ResultPanel,
  ResultRow,
  ToneBadge,
  ToolLayout,
  ToolSection,
  selectCls,
  type Tone,
} from "@/components/cockpit/kit";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  AlertTriangle,
  Info,
  Laptop,
  Smartphone,
  Armchair,
  Car,
  Package,
  Plus,
  Trash2,
  ShoppingCart,
  TrendingDown,
  FileText,
} from "lucide-react";

// ============================================================
// ABSCHREIBUNGS-RECHNER · Stand Mai 2026
// ============================================================
// Rechtsgrundlagen:
// - §7 EStG: AfA (lineare Absetzung für Abnutzung)
// - §7g EStG: IAB (Investitionsabzugsbetrag, 50% für KMU)
// - §6 Abs. 2 EStG: GWG ≤800€ netto = Sofortabschreibung
// - §6 Abs. 2a EStG: GWG-Pool 250-1000€ (5-Jahres-Sammelposten)
// - BMF-Schreiben 22.2.2022: Computer-Hardware + Software 1-Jahr-Nutzungsdauer
// ============================================================

const GWG_NETTO_SCHWELLE = 800;
const POOL_UNTERGRENZE = 250;
const POOL_OBERGRENZE = 1000;
const POOL_DAUER_JAHRE = 5;

// Default-Grenzsteuersätze
const STEUERSATZ_GMBH = 30; // KSt 15% + SolZ + GewSt ~14% = ~30%
const STEUERSATZ_PRIVAT_DEFAULT = 42; // §32a EStG Spitzensatz inkl. SolZ

const formatEur = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

// ===== ASSET-TYPES =====
type AssetType = {
  id: string;
  icon: any;
  name: string;
  category: string;
  nutzungsdauer: number;
  bmfSofort?: boolean;
  hinweis?: string;
  /** SKR03-Konto für Anschaffung (Soll). */
  skr03?: number;
  /** SKR04-Konto für Anschaffung (Soll). */
  skr04?: number;
};

export const AFA_ASSETS: AssetType[] = [
  // BMF-Sofortabschreibung
  { id: "laptop", icon: Laptop, name: "Laptop / Notebook", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "BMF-Schreiben 22.2.2022 — Sofortabschreibung im Anschaffungsjahr", skr03: 490, skr04: 690 },
  { id: "desktop-pc", icon: Laptop, name: "Desktop-PC / Workstation", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "Wie Laptop", skr03: 490, skr04: 690 },
  { id: "smartphone", icon: Smartphone, name: "Smartphone / iPhone", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "Seit BMF 26.2.2021 als Computer-Hardware", skr03: 490, skr04: 690 },
  { id: "tablet", icon: Smartphone, name: "Tablet / iPad", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "Wie Smartphone", skr03: 490, skr04: 690 },
  { id: "monitor", icon: Laptop, name: "Monitor / Bildschirm", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "Peripheriegerät — Sofortabschreibung", skr03: 490, skr04: 690 },
  { id: "drucker", icon: Laptop, name: "Drucker / Multifunktionsgerät", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "Peripheriegerät", skr03: 490, skr04: 690 },
  { id: "software", icon: Laptop, name: "Software / Lizenzen (kein Abo)", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "ALLE Software Sofortabschreibung seit BMF 2022", skr03: 490, skr04: 690 },
  // Büromöbel
  { id: "schreibtisch", icon: Armchair, name: "Schreibtisch", category: "Büromöbel", nutzungsdauer: 13, hinweis: "AfA-Tabelle ~7,7%/Jahr", skr03: 420, skr04: 650 },
  { id: "buerostuhl", icon: Armchair, name: "Bürostuhl", category: "Büromöbel", nutzungsdauer: 13, hinweis: "Wie Schreibtisch", skr03: 420, skr04: 650 },
  { id: "regal", icon: Armchair, name: "Regal / Aktenschrank", category: "Büromöbel", nutzungsdauer: 13, hinweis: "Wie Büromöbel allgemein", skr03: 420, skr04: 650 },
  { id: "konferenztisch", icon: Armchair, name: "Konferenztisch", category: "Büromöbel", nutzungsdauer: 13, hinweis: "Wie Büromöbel", skr03: 420, skr04: 650 },
  { id: "ladeneinrichtung", icon: Armchair, name: "Ladeneinrichtung", category: "Büromöbel", nutzungsdauer: 8, hinweis: "Schnellere AfA wegen höherer Abnutzung", skr03: 430, skr04: 640 },
  // Fahrzeuge
  { id: "pkw-elektro", icon: Car, name: "PKW Elektro (Firmenwagen)", category: "Fahrzeuge", nutzungsdauer: 6, hinweis: "Reguläre AfA. E-Dienstwagen 0,25/0,5%-Versteuerung separat", skr03: 320, skr04: 520 },
  { id: "pkw-verbrenner", icon: Car, name: "PKW Verbrenner (Firmenwagen)", category: "Fahrzeuge", nutzungsdauer: 6, hinweis: "1%-Regel bei privater Nutzung", skr03: 320, skr04: 520 },
  { id: "e-bike", icon: Car, name: "E-Bike / Pedelec", category: "Fahrzeuge", nutzungsdauer: 7, hinweis: "Überlassung an AN steuerfrei §3 Nr. 37 EStG", skr03: 320, skr04: 520 },
  // Ausstattung
  { id: "kaffeemaschine", icon: Package, name: "Kaffeemaschine (Vollautomat)", category: "Ausstattung", nutzungsdauer: 8, hinweis: "Wenn >800€ netto. Unter 800€ = GWG", skr03: 420, skr04: 650 },
  { id: "kuechenausstattung", icon: Package, name: "Küchenausstattung", category: "Ausstattung", nutzungsdauer: 10, hinweis: "Je nach Einzelteil 8-15 Jahre", skr03: 420, skr04: 650 },
  { id: "video-equipment", icon: Package, name: "Kamera / Video-Equipment", category: "Ausstattung", nutzungsdauer: 7, hinweis: "Anteilige private Nutzung kürzen", skr03: 420, skr04: 650 },
];

// ===== TYPES =====
type Modus = "bmf-sofort" | "gwg" | "pool" | "linear";

type AbschreibungResult = {
  modus: string;
  modusKey: Modus;
  jahresAfa: number;
  erstjahrAfa: number;
  anzahlJahre: number;
  details: { jahr: number; betrag: number; label: string }[];
  hinweis: string;
};

type CartItem = {
  id: string;
  assetId: string;
  nettoPreis: number;
  istKu: boolean;
  monat: number;
  poolGenutzt: boolean;
  privatAnteilPct: number;
};

// ===== ABSCHREIBUNGS-LOGIK =====
// eslint-disable-next-line react-refresh/only-export-components
export const calcAbschreibung = (
  asset: AssetType,
  nettoPreis: number,
  istKu: boolean,
  monat: number,
  poolGenutzt: boolean,
  privatAnteilPct: number,
): AbschreibungResult => {
  const beruflicherAnteil = (100 - privatAnteilPct) / 100;
  const basis = nettoPreis * beruflicherAnteil;
  // GWG-/Pool-Grenzen gelten für die VOLLEN Anschaffungskosten ohne Vorsteuer (§6 Abs. 2 und 2a EStG),
  // auch beim Kleinunternehmer (Vorsteuer herausrechnen) und unabhängig vom Privatanteil.
  const grenzWert = istKu ? nettoPreis / 1.19 : nettoPreis;

  // 1) BMF-Sofortabschreibung
  if (asset.bmfSofort) {
    return {
      modus: "BMF-Sofortabschreibung (1 Jahr)",
      modusKey: "bmf-sofort",
      jahresAfa: basis,
      erstjahrAfa: basis,
      anzahlJahre: 1,
      details: [{ jahr: 1, betrag: basis, label: "Anschaffungsjahr (komplett)" }],
      hinweis:
        "BMF-Schreiben 22.2.2022: Computer-Hardware/Software haben Nutzungsdauer 1 Jahr — kompletter Preis im Kaufjahr abziehbar, auch bei Anschaffung im Dezember.",
    };
  }

  // 2) Sammelposten: Wer ihn wählt, MUSS alle WG über 250 € bis 1.000 € in den Pool nehmen (§6 Abs. 2a Satz 5 EStG)
  if (poolGenutzt && grenzWert > POOL_UNTERGRENZE && grenzWert <= POOL_OBERGRENZE) {
    const jahresAfa = basis / POOL_DAUER_JAHRE;
    return {
      modus: "Sammelposten §6 Abs. 2a (5 Jahre)",
      modusKey: "pool",
      jahresAfa,
      erstjahrAfa: jahresAfa,
      anzahlJahre: POOL_DAUER_JAHRE,
      details: Array.from({ length: POOL_DAUER_JAHRE }, (_, i) => ({
        jahr: i + 1,
        betrag: jahresAfa,
        label: `Jahr ${i + 1}`,
      })),
      hinweis:
        "Sammelposten: alle WG über 250 € bis 1.000 € netto in einen Pool, 5-Jahres-AfA mit 20 %/Jahr. Pro Wirtschaftsjahr einheitlich entscheiden — entweder GWG-Sofortabschreibung bis 800 € oder Pool für alle WG über 250 €.",
    };
  }

  // 3) GWG ≤ 800 € netto
  if (grenzWert <= GWG_NETTO_SCHWELLE) {
    return {
      modus: `GWG §6 Abs. 2 EStG (≤${istKu ? "952€ brutto" : "800€ netto"})`,
      modusKey: "gwg",
      jahresAfa: basis,
      erstjahrAfa: basis,
      anzahlJahre: 1,
      details: [{ jahr: 1, betrag: basis, label: "Anschaffungsjahr (Sofortabschreibung)" }],
      hinweis:
        "Geringwertiges Wirtschaftsgut: bis 800€ netto Sofortabschreibung im Anschaffungsjahr. Bei KU brutto-Schwelle ~952€.",
    };
  }

  // 4) Lineare AfA §7 EStG
  const jahresAfaVoll = basis / asset.nutzungsdauer;
  const monateImErstjahr = 13 - monat;
  const erstjahrAfa = (jahresAfaVoll * monateImErstjahr) / 12;
  const restjahrAfa = jahresAfaVoll - erstjahrAfa;

  const details = [
    { jahr: 1, betrag: erstjahrAfa, label: `Jahr 1 (${monateImErstjahr}/12 Monate, pro rata)` },
    ...Array.from({ length: asset.nutzungsdauer - 1 }, (_, i) => ({
      jahr: i + 2,
      betrag: jahresAfaVoll,
      label: `Jahr ${i + 2}`,
    })),
    {
      jahr: asset.nutzungsdauer + 1,
      betrag: restjahrAfa,
      label: `Jahr ${asset.nutzungsdauer + 1} (Restmonate)`,
    },
  ];

  return {
    modus: `Lineare AfA §7 EStG (${asset.nutzungsdauer} Jahre)`,
    modusKey: "linear",
    jahresAfa: jahresAfaVoll,
    erstjahrAfa,
    anzahlJahre: asset.nutzungsdauer + (monat > 1 ? 1 : 0),
    details,
    hinweis: `AfA-Tabelle: ${asset.nutzungsdauer} Jahre = ${(100 / asset.nutzungsdauer).toFixed(2)}%/Jahr linear. Pro-rata-temporis im Erstjahr.`,
  };
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const AbschreibungRechner = () => {
  return (
    <CockpitShell
      eyebrow="Steuern · Abschreibung, Stand Mai 2026"
      title="Was kann ich abschreiben, und wie viel Steuer spare ich?"
      subtitle="Rechne eine Anschaffung oder mehrere auf einmal durch: BMF-Sofortabschreibung für Computer, GWG bis 800 €, Sammelposten 250–1000 € und lineare AfA nach §7. Mit Steuer-Ersparnis und SKR03/04-Buchungssatz."
    >
      <Tabs defaultValue="einzel" className="w-full">
        <TabsList className="mb-6 h-auto flex-wrap justify-start">
          <TabsTrigger value="einzel" className="gap-1.5">
            <Calculator className="h-4 w-4" aria-hidden="true" /> Eine Anschaffung
          </TabsTrigger>
          <TabsTrigger value="cart" className="gap-1.5">
            <ShoppingCart className="h-4 w-4" aria-hidden="true" /> Mehrere Anschaffungen
          </TabsTrigger>
          <TabsTrigger value="quickref" className="gap-1.5">
            <FileText className="h-4 w-4" aria-hidden="true" /> AfA-Tabelle und Modi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="einzel"><EinzelRechner /></TabsContent>
        <TabsContent value="cart"><AssetCart /></TabsContent>
        <TabsContent value="quickref"><QuickRef /></TabsContent>
      </Tabs>
    </CockpitShell>
  );
};

// ============================================================
// TAB 1: EINZEL-RECHNER mit Steuer-Ersparnis
// ============================================================
const EinzelRechner = () => {
  const [assetId, setAssetId] = useState<string>("laptop");
  const [betrag, setBetrag] = useState(1190);
  const [istBrutto, setIstBrutto] = useState(true);
  const [istKu, setIstKu] = useState(false);
  const [monat, setMonat] = useState(6);
  const [poolGenutzt, setPoolGenutzt] = useState(false);
  const [privatAnteil, setPrivatAnteil] = useState(0);
  const [empfaengerTyp, setEmpfaengerTyp] = useState<"gmbh" | "privat">("gmbh");
  const [steuersatzCustom, setSteuersatzCustom] = useState(STEUERSATZ_PRIVAT_DEFAULT);

  const asset = AFA_ASSETS.find((a) => a.id === assetId)!;

  // Brutto → Netto (oder unverändert)
  const nettoPreis = useMemo(() => {
    if (istBrutto && !istKu) return betrag / 1.19;
    return betrag; // KU rechnet immer brutto
  }, [betrag, istBrutto, istKu]);

  const ustAbzug = useMemo(() => {
    if (istBrutto && !istKu) return betrag - nettoPreis;
    return 0;
  }, [betrag, nettoPreis, istBrutto, istKu]);

  const result = useMemo(
    () => calcAbschreibung(asset, nettoPreis, istKu, monat, poolGenutzt, privatAnteil),
    [asset, nettoPreis, istKu, monat, poolGenutzt, privatAnteil],
  );

  const steuersatz = empfaengerTyp === "gmbh" ? STEUERSATZ_GMBH : steuersatzCustom;
  const steuerErsparnisErstjahr = (result.erstjahrAfa * steuersatz) / 100;
  const steuerErsparnisGesamt = result.details.reduce(
    (sum, d) => sum + (d.betrag * steuersatz) / 100,
    0,
  );
  const liquiditätsersparnisJahr1 = steuerErsparnisErstjahr + ustAbzug;

  const istPoolRange = nettoPreis >= POOL_UNTERGRENZE && nettoPreis <= POOL_OBERGRENZE;

  return (
    <div className="space-y-6">
      <ToolLayout
        inputs={
          <>
            <ToolSection title="Anschaffung" description="Was du gekauft hast, wann und zu welchem Preis." icon={Package}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Was wurde angeschafft?" htmlFor="afa-asset" className="sm:col-span-2" hint={asset.hinweis}>
                  <select id="afa-asset" value={assetId} onChange={(e) => setAssetId(e.target.value)} className={selectCls}>
                    {Object.entries(
                      AFA_ASSETS.reduce<Record<string, AssetType[]>>((acc, a) => {
                        if (!acc[a.category]) acc[a.category] = [];
                        acc[a.category].push(a);
                        return acc;
                      }, {}),
                    ).map(([cat, items]) => (
                      <optgroup key={cat} label={cat}>
                        {items.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.name} ({a.bmfSofort ? "1 Jahr Sofort" : `${a.nutzungsdauer} Jahre`})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </Field>
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <label htmlFor="afa-betrag" className="block text-sm font-medium text-foreground">
                      {istKu ? "Preis inkl. USt (€)" : istBrutto ? "Brutto-Preis (€)" : "Netto-Preis (€)"}
                    </label>
                    {!istKu && (
                      <button
                        type="button"
                        onClick={() => setIstBrutto((v) => !v)}
                        className="text-xs font-medium text-accent-blue hover:underline"
                      >
                        {istBrutto ? "Netto" : "Brutto"} eingeben
                      </button>
                    )}
                  </div>
                  <Input
                    id="afa-betrag"
                    type="number"
                    min={0}
                    step={0.01}
                    value={betrag}
                    onChange={(e) => setBetrag(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                  {istBrutto && !istKu && (
                    <p className="text-xs text-muted-foreground tabular">
                      Netto: {formatEur(nettoPreis)} · USt-Abzug: {formatEur(ustAbzug)}
                    </p>
                  )}
                </div>
                <Field label="Anschaffungs-Monat (1–12)" htmlFor="afa-monat" hint="Bestimmt die anteilige AfA im ersten Jahr.">
                  <Input
                    id="afa-monat"
                    type="number"
                    min={1}
                    max={12}
                    value={monat}
                    onChange={(e) => setMonat(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
                    className="tabular"
                  />
                </Field>
                <Field label="Privater Nutzungsanteil (%)" htmlFor="afa-privat" hint="Z. B. Laptop 30 % privat: nur 70 % absetzbar." className="sm:col-span-2">
                  <Input
                    id="afa-privat"
                    type="number"
                    min={0}
                    max={100}
                    value={privatAnteil}
                    onChange={(e) => setPrivatAnteil(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                    className="tabular"
                  />
                </Field>
              </div>
              {istPoolRange && !asset.bmfSofort && (
                <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-secondary/40 p-3.5 text-sm">
                  <input
                    type="checkbox"
                    checked={poolGenutzt}
                    onChange={(e) => setPoolGenutzt(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
                  />
                  <span>
                    <span className="font-medium">Sammelposten §6 Abs. 2a EStG nutzen</span>
                    <span className="block text-muted-foreground">Pool 250–1000 €, 5 Jahre gleichmäßig. Alternative zur GWG-Regel.</span>
                  </span>
                </label>
              )}
            </ToolSection>

            <ToolSection title="Steuerliche Situation" description="Davon hängen Vorsteuer und Steuersatz ab." icon={Calculator}>
              <div className="space-y-5">
                <Field label="Steuer-Typ">
                  <ChoiceGroup<boolean>
                    label="Steuer-Typ"
                    value={istKu}
                    onChange={(v) => {
                      setIstKu(v);
                      if (v) setIstBrutto(true);
                    }}
                    options={[
                      { value: false, label: "Regelbesteuerer" },
                      { value: true, label: "Kleinunternehmer §19" },
                    ]}
                  />
                </Field>
                <Field label="Wer setzt die Anschaffung ab?">
                  <ChoiceGroup<"gmbh" | "privat">
                    label="Empfänger"
                    value={empfaengerTyp}
                    onChange={setEmpfaengerTyp}
                    options={[
                      { value: "gmbh", label: `GmbH (~${STEUERSATZ_GMBH}%)` },
                      { value: "privat", label: "Privatperson (§32a)" },
                    ]}
                  />
                </Field>
                {empfaengerTyp === "privat" && (
                  <Field
                    label="Persönlicher Grenzsteuersatz (%)"
                    htmlFor="afa-satz"
                    hint="§32a EStG: 14 % Eingangssatz bis 47,5 % Spitzensatz (inkl. SolZ und Reichensteuer)."
                  >
                    <Input
                      id="afa-satz"
                      type="number"
                      min={14}
                      max={47.5}
                      step={0.5}
                      value={steuersatzCustom}
                      onChange={(e) => setSteuersatzCustom(Math.max(14, Math.min(47.5, Number(e.target.value) || 42)))}
                      className="tabular"
                    />
                  </Field>
                )}
              </div>
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Liquiditäts-Effekt Jahr 1"
              title="Steuer-Ersparnis plus Vorsteuer"
              value={formatEur(liquiditätsersparnisJahr1)}
              valueHint={
                <>
                  Effektive Anschaffungskosten: <span className="font-semibold text-primary-foreground tabular">{formatEur(betrag - liquiditätsersparnisJahr1)}</span> statt{" "}
                  <span className="tabular">{formatEur(betrag)}</span> brutto
                  {result.anzahlJahre > 1 && ". Die restliche Steuer-Ersparnis kommt in den Folgejahren."}
                </>
              }
            >
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                {[
                  { l: "Steuer-Ersparnis Jahr 1", v: formatEur(steuerErsparnisErstjahr), h: `${formatEur(result.erstjahrAfa)} × ${steuersatz} %` },
                  { l: "Steuer-Ersparnis gesamt", v: formatEur(steuerErsparnisGesamt), h: `über ${result.anzahlJahre} Jahr${result.anzahlJahre === 1 ? "" : "e"} verteilt` },
                  { l: "Vorsteuer sofort", v: ustAbzug > 0 ? `+ ${formatEur(ustAbzug)}` : "0,00 €", h: ustAbzug > 0 ? "über die USt-Voranmeldung" : "kein Vorsteuer-Abzug" },
                  { l: "Steuersatz", v: `${steuersatz} %`, h: empfaengerTyp === "gmbh" ? "GmbH pauschal" : "persönlicher Grenzsteuersatz" },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                    <div className="mt-0.5 text-[11px] text-primary-foreground/55 tabular">{k.h}</div>
                  </div>
                ))}
              </div>
            </ResultPanel>

            <ResultPanel kicker="Abschreibungs-Modus" title={result.modus}>
              <div className="divide-y divide-border/70">
                <ResultRow label="Erstjahres-AfA" value={formatEur(result.erstjahrAfa)} strong />
                <ResultRow label="Jahres-AfA (volles Jahr)" value={formatEur(result.jahresAfa)} />
                <ResultRow label="Verteilt über" value={`${result.anzahlJahre} Jahr${result.anzahlJahre === 1 ? "" : "e"}`} />
              </div>
              <Callout tone="info" className="mt-4">
                {result.hinweis}
              </Callout>
            </ResultPanel>
          </>
        }
      />

      <ToolSection
        title="Abschreibungs-Plan"
        description={`${result.details.length} ${result.details.length === 1 ? "Zeile" : "Zeilen"}, Beträge nach Abzug des Privatanteils`}
        icon={TrendingDown}
      >
        <KitTable caption="Abschreibungs-Plan je Jahr">
          <thead>
            <tr>
              <th>Zeitraum</th>
              <th className="!text-right">AfA-Betrag</th>
              <th className="!text-right">Steuer-Ersparnis ({steuersatz} %)</th>
            </tr>
          </thead>
          <tbody>
            {result.details.map((d) => (
              <tr key={d.jahr}>
                <td>{d.label}</td>
                <td className="text-right font-medium">{formatEur(d.betrag)}</td>
                <td className="text-right text-success">{formatEur((d.betrag * steuersatz) / 100)}</td>
              </tr>
            ))}
          </tbody>
        </KitTable>
      </ToolSection>

      {(asset.skr03 || asset.skr04) && !istKu && (
        <ToolSection title="Buchungssatz (Regelbesteuerer)" description="So bucht dein StB oder du die Anschaffung." icon={FileText}>
          <KitTable caption="Buchungssatz SKR03 und SKR04">
            <thead>
              <tr>
                <th>Soll</th>
                <th>Konto</th>
                <th className="!text-right">Betrag</th>
                <th>an Haben</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                // Kontenrahmen: Anlagekonto aus dem Asset (SKR03 0420/0430/0490/0320, SKR04 0650/0640/0690/0520),
                // GWG 0480/0670, Sammelposten 0485/0675; Aufwand: AfA SKR03 4830 / SKR04 6220, GWG-Sofortabschreibung 4855/6260,
                // Auflösung Sammelposten (§ 6 Abs. 2a EStG, 1/5 je Jahr) auf eigene Konten SKR03 4862 / SKR04 6264 (DATEV-Kontenrahmen).
                const k = (n: number | undefined) => String(n ?? 0).padStart(4, "0");
                const istGwg = result.modusKey === "gwg";
                const istPool = result.modusKey === "pool";
                const anlage03 = istGwg ? "0480" : istPool ? "0485" : k(asset.skr03);
                const anlage04 = istGwg ? "0670" : istPool ? "0675" : k(asset.skr04);
                const aufwand03 = istGwg ? "4855" : istPool ? "4862" : "4830";
                const aufwand04 = istGwg ? "6260" : istPool ? "6264" : "6220";
                const sofort = istGwg || result.modusKey === "bmf-sofort";
                return (
                  <>
                    <tr>
                      <td className="whitespace-nowrap">SKR03 {anlage03} / SKR04 {anlage04}</td>
                      <td className="text-muted-foreground">{istGwg ? "GWG (Anschaffung)" : istPool ? "Sammelposten (Anschaffung)" : "Anlagegut (Anschaffung)"}</td>
                      <td className="whitespace-nowrap text-right">{formatEur(nettoPreis)}</td>
                      <td className="whitespace-nowrap text-muted-foreground">1200 / 1800 Bank</td>
                    </tr>
                    {ustAbzug > 0 && (
                      <tr>
                        <td className="whitespace-nowrap">SKR03 1576 / SKR04 1406</td>
                        <td className="text-muted-foreground">Vorsteuer 19%</td>
                        <td className="whitespace-nowrap text-right">{formatEur(ustAbzug)}</td>
                        <td className="whitespace-nowrap text-muted-foreground">1200 / 1800 Bank</td>
                      </tr>
                    )}
                    <tr>
                      <td className="whitespace-nowrap font-medium text-accent-blue">SKR03 {aufwand03} / SKR04 {aufwand04}</td>
                      <td className="text-muted-foreground">{istGwg ? "Sofortabschreibung GWG" : sofort ? "AfA (komplett im Anschaffungsjahr)" : "AfA-Aufwand (jährlich)"}</td>
                      <td className="whitespace-nowrap text-right font-medium text-accent-blue">
                        {formatEur(sofort ? result.erstjahrAfa : result.jahresAfa)}{sofort ? "" : "/Jahr"}
                      </td>
                      <td className="whitespace-nowrap text-muted-foreground">{anlage03} / {anlage04}</td>
                    </tr>
                  </>
                );
              })()}
            </tbody>
          </KitTable>
          <p className="mt-3 text-xs text-muted-foreground">
            Konten-Pseudoangaben: exakte Konten variieren je Kanzlei-Kontenrahmen. Sprich mit deinem StB für das DATEV- oder Lexoffice-Mapping.
          </p>
        </ToolSection>
      )}
    </div>
  );
};

// ============================================================
// TAB 2: ASSET-CART (mehrere Anschaffungen gleichzeitig)
// ============================================================
const AssetCart = () => {
  // KU-Modus für den gesamten Cart (Kleinunternehmer → Preise inkl. USt, kein Vorsteuer-Abzug)
  const [cartIstKu, setCartIstKu] = useState(false);
  const [items, setItems] = useState<CartItem[]>([
    { id: "i1", assetId: "laptop", nettoPreis: 1500, istKu: false, monat: 6, poolGenutzt: false, privatAnteilPct: 0 },
    { id: "i2", assetId: "schreibtisch", nettoPreis: 600, istKu: false, monat: 6, poolGenutzt: false, privatAnteilPct: 0 },
    { id: "i3", assetId: "buerostuhl", nettoPreis: 450, istKu: false, monat: 6, poolGenutzt: false, privatAnteilPct: 0 },
  ]);
  const [empfaengerTyp, setEmpfaengerTyp] = useState<"gmbh" | "privat">("gmbh");
  const [steuersatzCustom, setSteuersatzCustom] = useState(STEUERSATZ_PRIVAT_DEFAULT);

  // KU-Flag gilt für den ganzen Warenkorb und wird direkt an die Berechnung übergeben (kein setState im Render)

  const addItem = () => {
    setItems((p) => [
      ...p,
      { id: `i${Date.now()}`, assetId: "laptop", nettoPreis: 1000, istKu: cartIstKu, monat: 6, poolGenutzt: false, privatAnteilPct: 0 },
    ]);
  };

  const updateItem = (id: string, patch: Partial<CartItem>) => {
    setItems((p) => p.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const removeItem = (id: string) => setItems((p) => p.filter((it) => it.id !== id));

  const steuersatz = empfaengerTyp === "gmbh" ? STEUERSATZ_GMBH : steuersatzCustom;

  const results = useMemo(() => {
    return items.map((it) => {
      const asset = AFA_ASSETS.find((a) => a.id === it.assetId)!;
      const result = calcAbschreibung(
        asset,
        it.nettoPreis,
        cartIstKu,
        it.monat,
        it.poolGenutzt,
        it.privatAnteilPct,
      );
      return { item: it, asset, result };
    });
  }, [items, cartIstKu]);

  const totalNetto = items.reduce((sum, it) => sum + it.nettoPreis, 0);
  const totalErstjahrAfa = results.reduce((sum, r) => sum + r.result.erstjahrAfa, 0);
  const totalSteuerErsparnisGesamt = results.reduce(
    (sum, r) => sum + r.result.details.reduce((s, d) => s + (d.betrag * steuersatz) / 100, 0),
    0,
  );
  const totalErstjahrSteuerErsparnis = (totalErstjahrAfa * steuersatz) / 100;

  // Konsolidierte Mehrjahres-Tabelle
  const maxYears = Math.max(...results.map((r) => r.result.details.length), 0);
  const yearlyTotals: number[] = Array(maxYears).fill(0);
  results.forEach((r) => {
    r.result.details.forEach((d, idx) => {
      yearlyTotals[idx] = (yearlyTotals[idx] || 0) + d.betrag;
    });
  });

  return (
    <div className="space-y-6">
      <Callout tone="accent" title="Mehrere Anschaffungen auf einmal">
        Rechne alle Käufe gemeinsam durch: Abschreibung pro Jahr und kumulierte Steuer-Ersparnis. Sinnvoll für die Planung vor dem Jahresende oder in der Setup-Phase.
      </Callout>

      <ToolLayout
        inputs={
          <>
            <ToolSection title="Steuersatz für die Ersparnis" icon={Calculator}>
              <div className="space-y-4">
                <ChoiceGroup<"gmbh" | "privat">
                  label="Steuersatz für Ersparnis-Berechnung"
                  value={empfaengerTyp}
                  onChange={setEmpfaengerTyp}
                  options={[
                    { value: "gmbh", label: `GmbH (~${STEUERSATZ_GMBH}%)` },
                    { value: "privat", label: "Privatperson (§32a)" },
                  ]}
                />
                {empfaengerTyp === "privat" && (
                  <Field label="Persönlicher Grenzsteuersatz (%)" htmlFor="cart-satz" hint="14 % bis 47,5 %">
                    <Input
                      id="cart-satz"
                      type="number"
                      min={14}
                      max={47.5}
                      step={0.5}
                      value={steuersatzCustom}
                      onChange={(e) => setSteuersatzCustom(Math.max(14, Math.min(47.5, Number(e.target.value) || 42)))}
                      placeholder="Grenzsteuersatz %"
                      className="tabular"
                    />
                  </Field>
                )}
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-secondary/40 p-3.5 text-sm">
                  <input type="checkbox" checked={cartIstKu} onChange={(e) => setCartIstKu(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" />
                  <span>
                    <span className="font-medium">Kleinunternehmer (§19 UStG)</span>
                    <span className="block text-muted-foreground">Preise inkl. USt, kein Vorsteuer-Abzug. AfA-Basis ist der Bruttopreis.</span>
                  </span>
                </label>
              </div>
            </ToolSection>

            <ToolSection
              title="Anschaffungen"
              description={`${items.length} ${items.length === 1 ? "Position" : "Positionen"}`}
              icon={ShoppingCart}
              actions={
                <Button onClick={addItem} variant="outline" size="sm">
                  <Plus className="mr-1 h-4 w-4" /> Hinzufügen
                </Button>
              }
            >
              {results.length === 0 ? (
                <EmptyState
                  icon={ShoppingCart}
                  title="Noch keine Anschaffung"
                  description="Füge die erste Anschaffung hinzu, um Abschreibung und Steuer-Ersparnis zu sehen."
                  action={
                    <Button onClick={addItem}>
                      <Plus className="mr-1 h-4 w-4" /> Anschaffung hinzufügen
                    </Button>
                  }
                />
              ) : (
                <div className="space-y-3">
                  {results.map(({ item, asset, result }, idx) => (
                    <div key={item.id} className="rounded-xl border border-border bg-secondary/30 p-4">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold tabular">Position {idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-danger-soft hover:text-danger"
                          title="Entfernen"
                          aria-label={`Position ${idx + 1} entfernen`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[minmax(0,1fr)_110px_80px_80px]">
                        <Field label="Anschaffung" htmlFor={`cart-a-${item.id}`} className="col-span-2 sm:col-span-1">
                          <select
                            id={`cart-a-${item.id}`}
                            value={item.assetId}
                            onChange={(e) => updateItem(item.id, { assetId: e.target.value })}
                            className={selectCls}
                          >
                            {AFA_ASSETS.map((a) => (
                              <option key={a.id} value={a.id}>
                                {a.name}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label={cartIstKu ? "Preis inkl. USt (€)" : "Netto (€)"} htmlFor={`cart-n-${item.id}`} className="col-span-2 sm:col-span-1">
                          <Input
                            id={`cart-n-${item.id}`}
                            type="number"
                            min={0}
                            value={item.nettoPreis}
                            onChange={(e) => updateItem(item.id, { nettoPreis: Math.max(0, Number(e.target.value) || 0) })}
                            className="tabular"
                          />
                        </Field>
                        <Field label="Monat" htmlFor={`cart-m-${item.id}`}>
                          <Input
                            id={`cart-m-${item.id}`}
                            type="number"
                            min={1}
                            max={12}
                            value={item.monat}
                            onChange={(e) => updateItem(item.id, { monat: Math.max(1, Math.min(12, Number(e.target.value) || 1)) })}
                            className="tabular"
                          />
                        </Field>
                        <Field label="Privat %" htmlFor={`cart-p-${item.id}`}>
                          <Input
                            id={`cart-p-${item.id}`}
                            type="number"
                            min={0}
                            max={100}
                            value={item.privatAnteilPct}
                            onChange={(e) =>
                              updateItem(item.id, { privatAnteilPct: Math.max(0, Math.min(100, Number(e.target.value) || 0)) })
                            }
                            className="tabular"
                          />
                        </Field>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                        <ToneBadge tone={asset.bmfSofort ? "success" : "neutral"}>{result.modus}</ToneBadge>
                        <span className="tabular">
                          Jahr 1: <strong className="font-semibold text-foreground">{formatEur(result.erstjahrAfa)}</strong>
                        </span>
                        <span className="tabular">
                          Ersparnis Jahr 1: <strong className="font-semibold text-success">{formatEur((result.erstjahrAfa * steuersatz) / 100)}</strong>
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button onClick={addItem} variant="outline" className="w-full">
                    <Plus className="mr-1 h-4 w-4" /> Weitere Anschaffung hinzufügen
                  </Button>
                </div>
              )}
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker={`Summe aus ${items.length} ${items.length === 1 ? "Anschaffung" : "Anschaffungen"}`}
              title="Steuer-Ersparnis Jahr 1"
              value={formatEur(totalErstjahrSteuerErsparnis)}
              valueHint={`bei ${steuersatz} % Steuersatz`}
            >
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {[
                  { l: "Anschaffungs-Volumen", v: formatEur(totalNetto) },
                  { l: "AfA Jahr 1", v: formatEur(totalErstjahrAfa) },
                  { l: "Ersparnis gesamt", v: formatEur(totalSteuerErsparnisGesamt) },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                  </div>
                ))}
              </div>
            </ResultPanel>

            {maxYears > 1 && (
              <ToolSection title="Kumulierter Plan" description={`Abschreibung über ${maxYears} Jahre`} icon={TrendingDown}>
                <KitTable caption="Kumulierter Abschreibungs-Plan" className="max-h-[380px] overflow-y-auto">
                  <thead className="sticky top-0">
                    <tr>
                      <th>Jahr</th>
                      <th className="!text-right">AfA gesamt</th>
                      <th className="!text-right">Ersparnis ({steuersatz} %)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyTotals.map((total, idx) => (
                      <tr key={idx}>
                        <td>Jahr {idx + 1}</td>
                        <td className="text-right">{formatEur(total)}</td>
                        <td className="text-right text-success">{formatEur((total * steuersatz) / 100)}</td>
                      </tr>
                    ))}
                  </tbody>
                </KitTable>
              </ToolSection>
            )}
          </>
        }
      />
    </div>
  );
};

// ============================================================
// TAB 3: QUICK-REF + MODI-ERKLÄRUNG
// ============================================================
const QuickRef = () => {
  return (
    <div className="space-y-6">
      <ToolSection title="Die 5 Abschreibungs-Modi" description="Welche Regel gilt wann, mit Beispiel." icon={Info}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <ModusCard
            title="BMF-Sofortabschreibung (1 Jahr)"
            applies="Computer-Hardware + Software (Laptop, PC, Handy, Tablet, Monitor, Drucker, Software-Lizenzen)"
            rule="BMF-Schreiben 22.2.2022: Nutzungsdauer 1 Jahr für ALLE Computer/IT, unabhängig vom Preis"
            example="iPhone 15 Pro 1.500€ netto im November gekauft → 1.500€ voll im Anschaffungsjahr abziehbar"
            color="emerald"
          />
          <ModusCard
            title="GWG ≤800€ (§6 Abs. 2 EStG)"
            applies="Beliebige WG bis 800€ netto (selbständig nutzbar)"
            rule="Geringwertiges Wirtschaftsgut: Sofortabschreibung im Anschaffungsjahr"
            example="Bürostuhl 750€ netto im Dezember → 750€ voll als Betriebsausgabe abziehbar"
            color="blue"
          />
          <ModusCard
            title="Sammelposten §6 Abs. 2a (5 Jahre)"
            applies="WG 250-1000€ netto (alle in einen Pool)"
            rule="Alternative zur GWG: 5-Jahres-Sammelposten, gleichmäßige Abschreibung 20%/Jahr"
            example="Schreibtisch 900€ → Pool → 180€/Jahr für 5 Jahre. Wirtschaftsjahr-Bindung!"
            color="amber"
          />
          <ModusCard
            title="Lineare AfA §7 EStG"
            applies="WG >800€ netto (außer Computer-Hardware)"
            rule="Nutzungsdauer aus AfA-Tabelle. Pro rata temporis im Erstjahr"
            example="Schreibtisch 1.500€ netto im Juni → 13 Jahre AfA = 115,38€/Jahr · Jahr 1: 67,31€ (7/12)"
            color="purple"
          />
          <ModusCard
            title="Degressive AfA §7 Abs. 2 EStG (2025 bis 2027)"
            applies="Bewegliche WG des Anlagevermögens, angeschafft/hergestellt 1.7.2025–31.12.2027"
            rule="Wiedereingeführt durch das Investitionssofortprogramm: max. das 3-Fache der linearen AfA, höchstens 30 %/Jahr (vom Restbuchwert). Wechsel zur linearen AfA möglich."
            example="Maschine 10.000€, lineare ND 10 J (10%) → degressiv 30%: Jahr 1 = 3.000€, Jahr 2 = 2.100€ (30% v. 7.000€) usw."
            color="emerald"
          />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Hinweis: Der interaktive Rechner deckt aktuell die ersten 4 Modi ab; die degressive AfA ist hier
          als Referenz beschrieben (separater Rechen-Modus in Arbeit).
        </p>
      </ToolSection>

      <ToolSection title="AfA-Nutzungsdauern" description={`${AFA_ASSETS.length} typische Anschaffungen im Überblick`} icon={FileText}>
        <KitTable caption="AfA-Nutzungsdauern Quick-Reference">
          <thead>
            <tr>
              <th>Anschaffung</th>
              <th>Kategorie</th>
              <th className="!text-right">Nutzungsdauer</th>
              <th className="!text-right">% / Jahr</th>
              <th>Modus</th>
            </tr>
          </thead>
          <tbody>
            {AFA_ASSETS.map((a) => (
              <tr key={a.id}>
                <td className="font-medium">{a.name}</td>
                <td className="text-muted-foreground">{a.category}</td>
                <td className="whitespace-nowrap text-right">
                  {a.nutzungsdauer} Jahr{a.nutzungsdauer === 1 ? "" : "e"}
                </td>
                <td className="text-right">{(100 / a.nutzungsdauer).toFixed(1)}%</td>
                <td>
                  {a.bmfSofort ? <ToneBadge tone="success">BMF-Sofort</ToneBadge> : <ToneBadge>AfA-Tabelle</ToneBadge>}
                </td>
              </tr>
            ))}
          </tbody>
        </KitTable>
      </ToolSection>

      <Callout tone="warning" title="Wichtige Praxis-Hinweise" icon={AlertTriangle}>
        <ul className="mt-1 list-disc space-y-1.5 pl-4">
          <li>
            <strong>Selbständige Nutzbarkeit</strong> ist Pflicht für GWG: Monitor-Standfuß
            allein ≠ GWG, Monitor schon
          </li>
          <li>
            <strong>BMF-Sofortabschreibung Computer/Software</strong> ist optional, bei IAB
            (§7g) ggf. besser lineare AfA wählen
          </li>
          <li>
            <strong>Kleinunternehmer §19:</strong> Brutto-Preis ist Bemessungsgrundlage,
            800€-Schwelle ~952€ brutto
          </li>
          <li>
            <strong>Pro rata temporis:</strong> Schreibtisch 1.200€ im Oktober (3 Monate) =
            1.200/13/12*3 = 23,08€ Jahr 1
          </li>
          <li>
            <strong>Sammelposten-Falle:</strong> pro Wirtschaftsjahr EINMAL entscheiden, ALLE
            GWG oder ALLE Pool, kein Mix
          </li>
          <li>
            <strong>Bewegliche vs. unbewegliche WG:</strong> Sofortabschreibung nur für
            bewegliche. Einbauküche, Aufzug = unbeweglich
          </li>
          <li>
            <strong>Private Nutzung:</strong> bei gemischter Nutzung anteilig kürzen
          </li>
          <li>
            <strong>IAB §7g:</strong> bei KMU bis 200k€ Gewinn kannst du bis 50% der geplanten
            Investition VOR Anschaffung steuermindernd abziehen, siehe{" "}
            <Link to="/cockpit/iab-rechner" className="font-medium text-accent-blue underline-offset-2 hover:underline">
              IAB-Rechner
            </Link>
          </li>
        </ul>
      </Callout>
    </div>
  );
};

// ============================================================
// SHARED HELPERS
// ============================================================
const ModusCard = ({
  title,
  applies,
  rule,
  example,
  color,
}: {
  title: string;
  applies: string;
  rule: string;
  example: string;
  color: "emerald" | "blue" | "amber" | "purple";
}) => {
  const tone = { emerald: "success", blue: "info", amber: "warning", purple: "accent" }[color] as Tone;
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-2.5">
        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${{ success: "bg-success", info: "bg-info", warning: "bg-warning", accent: "bg-accent-blue" }[tone as "success"]}`} aria-hidden="true" />
        <h3 className="text-sm font-semibold leading-snug">{title}</h3>
      </div>
      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="text-xs font-medium text-muted-foreground">Gilt für</dt>
          <dd className="mt-0.5 text-foreground/85">{applies}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">Regel</dt>
          <dd className="mt-0.5 text-foreground/85">{rule}</dd>
        </div>
      </dl>
      <div className="mt-3 rounded-lg bg-secondary/60 px-3 py-2 text-sm">
        <span className="text-xs font-medium text-muted-foreground">Beispiel</span>
        <p className="mt-0.5 text-foreground/85 tabular">{example}</p>
      </div>
    </div>
  );
};

export default AbschreibungRechner;
