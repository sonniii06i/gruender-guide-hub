import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  AlertTriangle,
  CheckCircle2,
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
  { id: "laptop", icon: Laptop, name: "Laptop / Notebook", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "BMF-Schreiben 22.2.2022 — Sofortabschreibung im Anschaffungsjahr", skr03: 490, skr04: 670 },
  { id: "desktop-pc", icon: Laptop, name: "Desktop-PC / Workstation", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "Wie Laptop", skr03: 490, skr04: 670 },
  { id: "smartphone", icon: Smartphone, name: "Smartphone / iPhone", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "Seit BMF 26.2.2021 als Computer-Hardware", skr03: 490, skr04: 670 },
  { id: "tablet", icon: Smartphone, name: "Tablet / iPad", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "Wie Smartphone", skr03: 490, skr04: 670 },
  { id: "monitor", icon: Laptop, name: "Monitor / Bildschirm", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "Peripheriegerät — Sofortabschreibung", skr03: 490, skr04: 670 },
  { id: "drucker", icon: Laptop, name: "Drucker / Multifunktionsgerät", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "Peripheriegerät", skr03: 490, skr04: 670 },
  { id: "software", icon: Laptop, name: "Software / Lizenzen (kein Abo)", category: "IT / Computer", nutzungsdauer: 1, bmfSofort: true, hinweis: "ALLE Software Sofortabschreibung seit BMF 2022", skr03: 490, skr04: 670 },
  // Büromöbel
  { id: "schreibtisch", icon: Armchair, name: "Schreibtisch", category: "Büromöbel", nutzungsdauer: 13, hinweis: "AfA-Tabelle ~7,7%/Jahr", skr03: 420, skr04: 650 },
  { id: "buerostuhl", icon: Armchair, name: "Bürostuhl", category: "Büromöbel", nutzungsdauer: 13, hinweis: "Wie Schreibtisch", skr03: 420, skr04: 650 },
  { id: "regal", icon: Armchair, name: "Regal / Aktenschrank", category: "Büromöbel", nutzungsdauer: 13, hinweis: "Wie Büromöbel allgemein", skr03: 420, skr04: 650 },
  { id: "konferenztisch", icon: Armchair, name: "Konferenztisch", category: "Büromöbel", nutzungsdauer: 13, hinweis: "Wie Büromöbel", skr03: 420, skr04: 650 },
  { id: "ladeneinrichtung", icon: Armchair, name: "Ladeneinrichtung", category: "Büromöbel", nutzungsdauer: 8, hinweis: "Schnellere AfA wegen höherer Abnutzung", skr03: 420, skr04: 650 },
  // Fahrzeuge
  { id: "pkw-elektro", icon: Car, name: "PKW Elektro (Firmenwagen)", category: "Fahrzeuge", nutzungsdauer: 6, hinweis: "Reguläre AfA. E-Dienstwagen 0,25/0,5%-Versteuerung separat", skr03: 320, skr04: 540 },
  { id: "pkw-verbrenner", icon: Car, name: "PKW Verbrenner (Firmenwagen)", category: "Fahrzeuge", nutzungsdauer: 6, hinweis: "1%-Regel bei privater Nutzung", skr03: 320, skr04: 540 },
  { id: "e-bike", icon: Car, name: "E-Bike / Pedelec", category: "Fahrzeuge", nutzungsdauer: 7, hinweis: "Überlassung an AN steuerfrei §3 Nr. 37 EStG", skr03: 320, skr04: 540 },
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
const calcAbschreibung = (
  asset: AssetType,
  nettoPreis: number,
  istKu: boolean,
  monat: number,
  poolGenutzt: boolean,
  privatAnteilPct: number,
): AbschreibungResult => {
  const beruflicherAnteil = (100 - privatAnteilPct) / 100;
  const basis = nettoPreis * beruflicherAnteil;

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

  // KU: Brutto ist Basis (kein VSt-Abzug). Bei Regelbesteuerer: Netto
  const ku_schwelle = istKu ? GWG_NETTO_SCHWELLE * 1.19 : GWG_NETTO_SCHWELLE;

  // 2) GWG ≤800€
  if (basis <= ku_schwelle) {
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

  // 3) Pool 250-1000€ (alternativ zu GWG, hier explizit gewählt)
  if (poolGenutzt && basis >= POOL_UNTERGRENZE && basis <= POOL_OBERGRENZE) {
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
        "Sammelposten: alle WG 250-1000€ in einen Pool, 5-Jahres-AfA mit 20%/Jahr. Achtung: pro Wirtschaftsjahr einmal entscheiden — entweder alles GWG oder alles Pool.",
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
      eyebrow="Abschreibungs-Rechner · Stand Mai 2026"
      title="Was kann ich abschreiben — und wieviel Steuer spare ich?"
      subtitle="Einzel-Rechner mit Steuer-Ersparnis · Asset-Cart für mehrere Anschaffungen gleichzeitig · 18 Asset-Types · BMF-Sofortabschreibung Computer + GWG ≤800€ + Sammelposten 250-1000€ + Lineare AfA §7. Inkl. SKR03/04-Buchungssatz."
    >
      <Tabs defaultValue="einzel" className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto">
          <TabsTrigger value="einzel">
            <Calculator className="h-4 w-4 mr-1" /> Einzel-Rechner
          </TabsTrigger>
          <TabsTrigger value="cart">
            <ShoppingCart className="h-4 w-4 mr-1" /> Asset-Cart (mehrere)
          </TabsTrigger>
          <TabsTrigger value="quickref">
            <FileText className="h-4 w-4 mr-1" /> AfA-Tabelle + Modi-Erklärung
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
    <div className="space-y-4">
      {/* ===== INPUTS ===== */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Was wurde angeschafft?
            </Label>
            <select
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
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
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>{istBrutto && !istKu ? "Brutto-Preis (€)" : "Netto-Preis (€)"}</span>
              {!istKu && (
                <button
                  onClick={() => setIstBrutto((v) => !v)}
                  className="text-[10px] underline hover:text-foreground"
                >
                  → {istBrutto ? "Netto" : "Brutto"} eingeben
                </button>
              )}
            </Label>
            <Input
              type="number"
              min={0}
              step={0.01}
              value={betrag}
              onChange={(e) => setBetrag(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            {istBrutto && !istKu && (
              <div className="text-[10px] text-muted-foreground mt-1">
                → Netto: {formatEur(nettoPreis)} · USt-Abzug: {formatEur(ustAbzug)}
              </div>
            )}
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Anschaffungs-Monat (1-12)
            </Label>
            <Input
              type="number"
              min={1}
              max={12}
              value={monat}
              onChange={(e) => setMonat(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Steuer-Typ
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: false, l: "Regelbesteuerer" },
                { v: true, l: "Kleinunternehmer §19" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => {
                    setIstKu(o.v);
                    if (o.v) setIstBrutto(true);
                  }}
                  className={`rounded-md border h-10 text-sm ${
                    istKu === o.v
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
              Privater Nutzungsanteil (%)
            </Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={privatAnteil}
              onChange={(e) => setPrivatAnteil(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Z.B. Laptop 30% privat → nur 70% absetzbar
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Empfänger
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: "gmbh" as const, l: `GmbH (~${STEUERSATZ_GMBH}%)` },
                { v: "privat" as const, l: "Privatperson (§32a)" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setEmpfaengerTyp(o.v)}
                  className={`rounded-md border h-10 text-sm ${
                    empfaengerTyp === o.v
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

        {empfaengerTyp === "privat" && (
          <div className="rounded-xl bg-card border border-border p-3 mt-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Persönlicher Grenzsteuersatz (%)
            </Label>
            <Input
              type="number"
              min={14}
              max={47.5}
              step={0.5}
              value={steuersatzCustom}
              onChange={(e) => setSteuersatzCustom(Math.max(14, Math.min(47.5, Number(e.target.value) || 42)))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              §32a EStG: 14% Eingangsgrenze bis 47,5% Spitzensatz (inkl. SolZ + Reichensteuer)
            </div>
          </div>
        )}

        {istPoolRange && !asset.bmfSofort && (
          <div className="rounded-xl bg-card border border-border p-3 mt-2">
            <label className="flex items-start gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={poolGenutzt}
                onChange={(e) => setPoolGenutzt(e.target.checked)}
                className="mt-0.5"
              />
              <span>
                <strong>Sammelposten §6 Abs. 2a EStG nutzen</strong> (Pool 250-1000€, 5 Jahre
                gleichmäßig) — alternativ zur GWG-Regel
              </span>
            </label>
          </div>
        )}
      </div>

      {/* ===== ABSCHREIBUNGS-MODUS ===== */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/5 p-5">
        <div className="flex items-start gap-3 mb-3">
          <Calculator className="h-6 w-6 text-emerald-700 shrink-0" />
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Abschreibungs-Modus
            </div>
            <div className="text-2xl font-bold">{result.modus}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <ResultCard label="Erstjahres-AfA" value={formatEur(result.erstjahrAfa)} color="emerald" />
          <ResultCard label="Jahres-AfA (volljährig)" value={formatEur(result.jahresAfa)} color="blue" />
          <ResultCard label="Über gesamt" value={`${result.anzahlJahre} Jahr${result.anzahlJahre === 1 ? "" : "e"}`} color="purple" />
        </div>

        <details className="rounded-xl bg-card border border-border p-3 mb-3">
          <summary className="cursor-pointer text-sm font-semibold">
            Vollständiger Abschreibungs-Plan ({result.details.length} Zeilen)
          </summary>
          <ul className="mt-2 text-sm space-y-1 font-mono">
            {result.details.map((d) => (
              <li key={d.jahr} className="flex justify-between">
                <span>{d.label}</span>
                <span className="font-bold">{formatEur(d.betrag)}</span>
              </li>
            ))}
          </ul>
        </details>

        <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3 text-xs flex items-start gap-2">
          <Info className="h-3.5 w-3.5 text-blue-700 shrink-0 mt-0.5" />
          <div className="text-muted-foreground">{result.hinweis}</div>
        </div>
      </div>

      {/* ===== STEUER-ERSPARNIS (das was User WIRKLICH wissen will) ===== */}
      <div className="rounded-2xl border-2 border-accent-blue/40 bg-gradient-to-br from-accent-blue/5 to-card p-5">
        <div className="flex items-start gap-3 mb-3">
          <TrendingDown className="h-6 w-6 text-accent-blue shrink-0" />
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Was du tatsächlich sparst (Steuer + USt)
            </div>
            <div className="text-2xl font-bold">€-Effekt ({steuersatz}% Steuersatz)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="rounded-xl bg-card border border-border p-4">
            <div className="text-xs text-muted-foreground mb-1">Steuer-Ersparnis Jahr 1</div>
            <div className="text-2xl font-bold text-emerald-700">
              {formatEur(steuerErsparnisErstjahr)}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              = {formatEur(result.erstjahrAfa)} × {steuersatz}%
            </div>
          </div>
          <div className="rounded-xl bg-card border border-border p-4">
            <div className="text-xs text-muted-foreground mb-1">Steuer-Ersparnis gesamt</div>
            <div className="text-2xl font-bold text-emerald-700">
              {formatEur(steuerErsparnisGesamt)}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              über {result.anzahlJahre} Jahr{result.anzahlJahre === 1 ? "" : "e"} verteilt
            </div>
          </div>
        </div>

        {ustAbzug > 0 && (
          <div className="rounded-xl bg-card border border-amber-500/30 p-4 mb-3">
            <div className="text-xs text-muted-foreground mb-1">Zusätzlich: USt-Vorsteuer-Abzug</div>
            <div className="text-xl font-bold text-amber-700">
              + {formatEur(ustAbzug)} sofort
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              VSt geht in deine USt-Voranmeldung — Erstattung im selben Monat/Quartal
            </div>
          </div>
        )}

        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4">
          <div className="text-xs uppercase tracking-wider text-emerald-700 font-bold mb-1">
            Liquiditäts-Effekt Jahr 1 (Steuer + USt-VSt)
          </div>
          <div className="text-3xl font-bold text-emerald-700">
            {formatEur(liquiditätsersparnisJahr1)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Effektive Anschaffungskosten:{" "}
            <strong>{formatEur(betrag - liquiditätsersparnisJahr1)}</strong> (statt {formatEur(betrag)} brutto)
            {result.anzahlJahre > 1 && " — restliche Steuer-Ersparnis kommt in Folgejahren"}
          </div>
        </div>
      </div>

      {/* ===== BUCHUNGSSATZ ===== */}
      {(asset.skr03 || asset.skr04) && !istKu && (
        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4" /> Buchungssatz (Regelbesteuerer)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-1 pr-2">Soll</th>
                  <th className="py-1 px-2">Konto</th>
                  <th className="py-1 px-2 text-right">Betrag</th>
                  <th className="py-1 pl-2">an Haben</th>
                </tr>
              </thead>
              <tbody>
                {result.modusKey === "bmf-sofort" || result.modusKey === "gwg" ? (
                  <>
                    <tr className="border-b border-border/40">
                      <td className="py-1 pr-2">SKR03 {asset.skr03} / SKR04 {asset.skr04}</td>
                      <td className="py-1 px-2 text-muted-foreground">
                        {result.modusKey === "bmf-sofort" ? "Sofortabschr. Hardware" : "GWG-Aufwand"}
                      </td>
                      <td className="py-1 px-2 text-right">{formatEur(nettoPreis)}</td>
                      <td className="py-1 pl-2 text-muted-foreground">1200 / 1800 Bank</td>
                    </tr>
                    {ustAbzug > 0 && (
                      <tr>
                        <td className="py-1 pr-2">SKR03 1576 / SKR04 1406</td>
                        <td className="py-1 px-2 text-muted-foreground">Vorsteuer 19%</td>
                        <td className="py-1 px-2 text-right">{formatEur(ustAbzug)}</td>
                        <td className="py-1 pl-2 text-muted-foreground">1200 / 1800 Bank</td>
                      </tr>
                    )}
                  </>
                ) : (
                  <>
                    <tr className="border-b border-border/40">
                      <td className="py-1 pr-2">SKR03 0410 / SKR04 0650</td>
                      <td className="py-1 px-2 text-muted-foreground">
                        Anlage (AfA-pflichtig)
                      </td>
                      <td className="py-1 px-2 text-right">{formatEur(nettoPreis)}</td>
                      <td className="py-1 pl-2 text-muted-foreground">1200 / 1800 Bank</td>
                    </tr>
                    {ustAbzug > 0 && (
                      <tr className="border-b border-border/40">
                        <td className="py-1 pr-2">SKR03 1576 / SKR04 1406</td>
                        <td className="py-1 px-2 text-muted-foreground">Vorsteuer 19%</td>
                        <td className="py-1 px-2 text-right">{formatEur(ustAbzug)}</td>
                        <td className="py-1 pl-2 text-muted-foreground">1200 / 1800 Bank</td>
                      </tr>
                    )}
                    <tr>
                      <td className="py-1 pr-2 text-accent-blue">SKR03 {asset.skr03} / SKR04 {asset.skr04}</td>
                      <td className="py-1 px-2 text-muted-foreground">
                        AfA-Aufwand (jährlich)
                      </td>
                      <td className="py-1 px-2 text-right text-accent-blue">{formatEur(result.jahresAfa)}/Jahr</td>
                      <td className="py-1 pl-2 text-muted-foreground">0410 / 0650 (Wertberichtigung)</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className="text-[10px] text-muted-foreground mt-2">
            Konten-Pseudoangaben — exakte Konten je Kanzlei-Kontenrahmen variieren. Sprich mit deinem StB für DATEV/Lexoffice-Mapping.
          </div>
        </div>
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

  // KU-Flag in alle Items propagieren
  useMemo(() => {
    setItems((p) => p.map((it) => ({ ...it, istKu: cartIstKu })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartIstKu]);

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
        it.istKu,
        it.monat,
        it.poolGenutzt,
        it.privatAnteilPct,
      );
      return { item: it, asset, result };
    });
  }, [items]);

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
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="text-accent-blue">Asset-Cart:</strong> Mehrere Anschaffungen
            gleichzeitig durchrechnen. Zeigt Gesamt-Abschreibung pro Jahr + kumulierte
            Steuer-Ersparnis. Sinnvoll für Pre-Year-End-Planung oder Setup-Phase.
          </div>
        </div>
      </div>

      {/* Steuer-Typ Switch */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
          Steuersatz für Ersparnis-Berechnung
        </Label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {[
            { v: "gmbh" as const, l: `GmbH (~${STEUERSATZ_GMBH}%)` },
            { v: "privat" as const, l: "Privatperson (§32a)" },
          ].map((o) => (
            <button
              key={o.v}
              onClick={() => setEmpfaengerTyp(o.v)}
              className={`rounded-md border h-10 text-sm ${
                empfaengerTyp === o.v
                  ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                  : "border-border hover:bg-secondary"
              }`}
            >
              {o.l}
            </button>
          ))}
        </div>
        {empfaengerTyp === "privat" && (
          <Input
            type="number"
            min={14}
            max={47.5}
            step={0.5}
            value={steuersatzCustom}
            onChange={(e) => setSteuersatzCustom(Math.max(14, Math.min(47.5, Number(e.target.value) || 42)))}
            placeholder="Grenzsteuersatz %"
          />
        )}
        <label className="flex items-center gap-2 text-xs cursor-pointer mt-3 pt-3 border-t border-border">
          <input type="checkbox" checked={cartIstKu} onChange={(e) => setCartIstKu(e.target.checked)} className="h-4 w-4" />
          <span><strong>Kleinunternehmer (§19 UStG)</strong> — Preise inkl. USt, kein Vorsteuer-Abzug → AfA-Basis = Brutto</span>
        </label>
      </div>

      {/* Cart-Items */}
      <div className="space-y-2">
        {results.map(({ item, asset, result }) => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-3">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_120px_80px_80px_auto] gap-2 items-end mb-2">
              <div>
                <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Asset</Label>
                <select
                  value={item.assetId}
                  onChange={(e) => updateItem(item.id, { assetId: e.target.value })}
                  className="mt-0.5 h-9 w-full rounded-md border border-input bg-background px-2 text-xs"
                >
                  {AFA_ASSETS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Netto (€)
                </Label>
                <Input
                  type="number"
                  min={0}
                  value={item.nettoPreis}
                  onChange={(e) => updateItem(item.id, { nettoPreis: Math.max(0, Number(e.target.value) || 0) })}
                  className="mt-0.5 h-9 text-xs"
                />
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Monat</Label>
                <Input
                  type="number"
                  min={1}
                  max={12}
                  value={item.monat}
                  onChange={(e) => updateItem(item.id, { monat: Math.max(1, Math.min(12, Number(e.target.value) || 1)) })}
                  className="mt-0.5 h-9 text-xs"
                />
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Privat %</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={item.privatAnteilPct}
                  onChange={(e) =>
                    updateItem(item.id, { privatAnteilPct: Math.max(0, Math.min(100, Number(e.target.value) || 0)) })
                  }
                  className="mt-0.5 h-9 text-xs"
                />
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="h-9 px-2 text-red-700 hover:bg-red-500/10 rounded-md self-end"
                title="Entfernen"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-[11px] text-muted-foreground">
              <Badge variant={asset.bmfSofort ? "default" : "outline"} className="text-[10px]">
                {result.modus}
              </Badge>
              <span>
                Jahr 1: <strong className="text-foreground">{formatEur(result.erstjahrAfa)}</strong>
              </span>
              <span>
                · Steuer-Ersparnis Jahr 1:{" "}
                <strong className="text-emerald-700">
                  {formatEur((result.erstjahrAfa * steuersatz) / 100)}
                </strong>
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={addItem} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-1" /> Asset hinzufügen
      </Button>

      {/* Totals */}
      <div className="rounded-2xl border-2 border-accent-blue/40 bg-gradient-to-br from-card via-card to-accent-blue/5 p-5">
        <h3 className="font-bold text-base mb-3 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-accent-blue" /> Cart-Total ({items.length} Assets)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <ResultCard label="Anschaffungs-Volumen" value={formatEur(totalNetto)} color="blue" />
          <ResultCard label="AfA Jahr 1" value={formatEur(totalErstjahrAfa)} color="purple" />
          <ResultCard
            label="Steuer-Ersparnis Jahr 1"
            value={formatEur(totalErstjahrSteuerErsparnis)}
            color="emerald"
            highlight
          />
          <ResultCard label="Steuer-Ersparnis gesamt" value={formatEur(totalSteuerErsparnisGesamt)} color="emerald" />
        </div>

        {/* Mehrjahres-Tabelle */}
        {maxYears > 1 && (
          <details className="rounded-xl bg-card border border-border p-3">
            <summary className="cursor-pointer text-sm font-semibold">
              Kumulierter Abschreibungs-Plan über {maxYears} Jahre
            </summary>
            <div className="overflow-x-auto">
            <table className="w-full text-xs mt-2 font-mono">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-1">Jahr</th>
                  <th className="py-1 text-right">AfA Total</th>
                  <th className="py-1 text-right">Steuer-Ersparnis ({steuersatz}%)</th>
                </tr>
              </thead>
              <tbody>
                {yearlyTotals.map((total, idx) => (
                  <tr key={idx} className="border-b border-border/40">
                    <td className="py-1">Jahr {idx + 1}</td>
                    <td className="py-1 text-right">{formatEur(total)}</td>
                    <td className="py-1 text-right text-emerald-700">
                      {formatEur((total * steuersatz) / 100)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

// ============================================================
// TAB 3: QUICK-REF + MODI-ERKLÄRUNG
// ============================================================
const QuickRef = () => {
  return (
    <div className="space-y-4">
      {/* 4 Modi-Karten */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Info className="h-4 w-4" /> Die 5 Abschreibungs-Modi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            title="Degressive AfA §7 Abs. 2 EStG (2025–2027)"
            applies="Bewegliche WG des Anlagevermögens, angeschafft/hergestellt 1.7.2025–31.12.2027"
            rule="Wiedereingeführt durch das Investitionssofortprogramm: max. das 3-Fache der linearen AfA, höchstens 30 %/Jahr (vom Restbuchwert). Wechsel zur linearen AfA möglich."
            example="Maschine 10.000€, lineare ND 10 J (10%) → degressiv 30%: Jahr 1 = 3.000€, Jahr 2 = 2.100€ (30% v. 7.000€) usw."
            color="emerald"
          />
        </div>
        <p className="text-[11px] text-muted-foreground mt-3">
          Hinweis: Der interaktive Rechner deckt aktuell die ersten 4 Modi ab; die degressive AfA ist hier
          als Referenz beschrieben (separater Rechen-Modus in Arbeit).
        </p>
      </div>

      {/* AfA-Tabelle */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-bold text-sm mb-3">AfA-Nutzungsdauern Quick-Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 px-2 font-semibold">Asset</th>
                <th className="py-2 px-2 font-semibold">Kategorie</th>
                <th className="py-2 px-2 font-semibold">Nutzungsdauer</th>
                <th className="py-2 px-2 font-semibold">% / Jahr</th>
                <th className="py-2 px-2 font-semibold">Modus</th>
              </tr>
            </thead>
            <tbody>
              {AFA_ASSETS.map((a) => (
                <tr key={a.id} className="border-b border-border/40 hover:bg-secondary/30">
                  <td className="py-2 px-2 font-medium">{a.name}</td>
                  <td className="py-2 px-2 text-muted-foreground">{a.category}</td>
                  <td className="py-2 px-2 font-mono">
                    {a.nutzungsdauer} Jahr{a.nutzungsdauer === 1 ? "" : "e"}
                  </td>
                  <td className="py-2 px-2 font-mono">{(100 / a.nutzungsdauer).toFixed(1)}%</td>
                  <td className="py-2 px-2">
                    {a.bmfSofort ? (
                      <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/30">
                        BMF-Sofort
                      </Badge>
                    ) : (
                      <Badge variant="outline">AfA-Tabelle</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Praxis-Hinweise */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Wichtige Praxis-Hinweise:</strong>
            <ul className="list-disc pl-4 space-y-1 mt-1 text-muted-foreground">
              <li>
                <strong>Selbständige Nutzbarkeit</strong> ist Pflicht für GWG: Monitor-Standfuß
                allein ≠ GWG, Monitor schon
              </li>
              <li>
                <strong>BMF-Sofortabschreibung Computer/Software</strong> ist optional — bei IAB
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
                <strong>Sammelposten-Falle:</strong> pro Wirtschaftsjahr EINMAL entscheiden — ALLE
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
                Investition VOR Anschaffung steuermindernd abziehen — siehe /cockpit/iab-rechner
              </li>
            </ul>
          </div>
        </div>
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
  color: "emerald" | "amber" | "blue" | "purple";
  highlight?: boolean;
}) => {
  const colorClass = {
    emerald: "border-emerald-500/40 bg-emerald-500/5 text-emerald-700",
    amber: "border-amber-500/40 bg-amber-500/5 text-amber-700",
    blue: "border-blue-500/40 bg-blue-500/5 text-blue-700",
    purple: "border-purple-500/40 bg-purple-500/5 text-purple-700",
  }[color];
  return (
    <div
      className={`rounded-2xl border ${highlight ? "border-2" : ""} ${colorClass} p-4 ${
        highlight ? "shadow-md" : ""
      }`}
    >
      <div className="text-xs uppercase tracking-wider opacity-80 mb-1">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
};

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
  const colorClass = {
    emerald: "border-emerald-500/30 bg-emerald-500/5",
    blue: "border-blue-500/30 bg-blue-500/5",
    amber: "border-amber-500/30 bg-amber-500/5",
    purple: "border-purple-500/30 bg-purple-500/5",
  }[color];
  return (
    <div className={`rounded-xl border ${colorClass} p-3`}>
      <div className="font-bold text-sm mb-2">{title}</div>
      <div className="space-y-1.5 text-xs">
        <div>
          <strong className="text-foreground">Gilt für:</strong>{" "}
          <span className="text-muted-foreground">{applies}</span>
        </div>
        <div>
          <strong className="text-foreground">Regel:</strong>{" "}
          <span className="text-muted-foreground">{rule}</span>
        </div>
        <div className="rounded-md bg-card border border-border px-2 py-1.5">
          <strong className="text-foreground">Beispiel:</strong>{" "}
          <span className="text-muted-foreground">{example}</span>
        </div>
      </div>
    </div>
  );
};

export default AbschreibungRechner;
