import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

// ============================================================
// ABSCHREIBUNGS-ERKLÄRER · Stand Mai 2026
// ============================================================
// Rechtsgrundlagen:
// - §7 EStG: AfA (lineare Absetzung für Abnutzung) — Default-Modus
// - §7g EStG: IAB (Investitionsabzugsbetrag, 50% für KMU)
// - §6 Abs. 2 EStG: GWG ≤800€ netto = Sofortabschreibung
// - §6 Abs. 2a EStG: GWG-Pool 250-1000€ (5-Jahres-Sammelposten, alternativ)
// - BMF-Schreiben 22.2.2022: Computer-Hardware + Software AfA-Nutzungsdauer 1 Jahr
//   (Sofortabschreibung im Anschaffungsjahr für Notebooks, Smartphones, Monitore,
//   Software, Drucker, Tablets ALLER Preisklassen)
// ============================================================

const GWG_NETTO_SCHWELLE = 800; // §6 Abs. 2 EStG
const POOL_UNTERGRENZE = 250; // §6 Abs. 2a EStG
const POOL_OBERGRENZE = 1000;
const POOL_DAUER_JAHRE = 5;

const formatEur = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

// ===== AFA-NUTZUNGSDAUERN (offizielle AfA-Tabelle "Allgemein" — Stand BMF 2026) =====
type AssetType = {
  id: string;
  icon: any;
  name: string;
  category: string;
  /** Nutzungsdauer in Jahren laut AfA-Tabelle. */
  nutzungsdauer: number;
  /** BMF-Sondervorschrift: Computer-Hardware/Software seit 1.1.2021 → 1 Jahr (Sofortabschreibung). */
  bmfSofort?: boolean;
  /** Quelle/Hinweis. */
  hinweis?: string;
};

export const AFA_ASSETS: AssetType[] = [
  // BMF-Sofortabschreibung (Computer + Software, seit 1.1.2021)
  {
    id: "laptop",
    icon: Laptop,
    name: "Laptop / Notebook",
    category: "IT / Computer",
    nutzungsdauer: 1,
    bmfSofort: true,
    hinweis: "BMF-Schreiben 22.2.2022 — Sofortabschreibung im Anschaffungsjahr, unabhängig vom Preis",
  },
  {
    id: "desktop-pc",
    icon: Laptop,
    name: "Desktop-PC / Workstation",
    category: "IT / Computer",
    nutzungsdauer: 1,
    bmfSofort: true,
    hinweis: "Wie Laptop — Sofortabschreibung BMF-Schreiben",
  },
  {
    id: "smartphone",
    icon: Smartphone,
    name: "Smartphone / iPhone",
    category: "IT / Computer",
    nutzungsdauer: 1,
    bmfSofort: true,
    hinweis: "Seit BMF-Schreiben 26.2.2021 als Computer-Hardware eingestuft — Sofortabschreibung",
  },
  {
    id: "tablet",
    icon: Smartphone,
    name: "Tablet / iPad",
    category: "IT / Computer",
    nutzungsdauer: 1,
    bmfSofort: true,
    hinweis: "Wie Smartphone — Sofortabschreibung",
  },
  {
    id: "monitor",
    icon: Laptop,
    name: "Monitor / Bildschirm",
    category: "IT / Computer",
    nutzungsdauer: 1,
    bmfSofort: true,
    hinweis: "Peripheriegerät — Sofortabschreibung",
  },
  {
    id: "drucker",
    icon: Laptop,
    name: "Drucker / Multifunktionsgerät",
    category: "IT / Computer",
    nutzungsdauer: 1,
    bmfSofort: true,
    hinweis: "Peripheriegerät — Sofortabschreibung",
  },
  {
    id: "software",
    icon: Laptop,
    name: "Software / Lizenzen (kein Abo)",
    category: "IT / Computer",
    nutzungsdauer: 1,
    bmfSofort: true,
    hinweis: "Trivialsoftware <800€ war früher GWG; jetzt ALLE Software Sofortabschreibung",
  },
  // Klassische AfA — Büro-Möbel
  {
    id: "schreibtisch",
    icon: Armchair,
    name: "Schreibtisch",
    category: "Büromöbel",
    nutzungsdauer: 13,
    hinweis: "AfA-Tabelle Allgemein, ~7,7% p.a. linear",
  },
  {
    id: "buerostuhl",
    icon: Armchair,
    name: "Bürostuhl",
    category: "Büromöbel",
    nutzungsdauer: 13,
    hinweis: "Wie Schreibtisch — AfA-Tabelle 13 Jahre",
  },
  {
    id: "regal",
    icon: Armchair,
    name: "Regal / Aktenschrank",
    category: "Büromöbel",
    nutzungsdauer: 13,
    hinweis: "Wie Büromöbel allgemein",
  },
  {
    id: "konferenztisch",
    icon: Armchair,
    name: "Konferenztisch",
    category: "Büromöbel",
    nutzungsdauer: 13,
    hinweis: "Wie Büromöbel",
  },
  {
    id: "ladeneinrichtung",
    icon: Armchair,
    name: "Ladeneinrichtung",
    category: "Büromöbel",
    nutzungsdauer: 8,
    hinweis: "Schnellere AfA als Büromöbel wegen höherer Abnutzung",
  },
  // Fahrzeuge
  {
    id: "pkw-elektro",
    icon: Car,
    name: "PKW Elektro (Firmenwagen)",
    category: "Fahrzeuge",
    nutzungsdauer: 6,
    hinweis: "Reguläre AfA. E-Dienstwagen-Sonderregelung 0,25%-/0,5%-Versteuerung separat (§6 Abs. 1 Nr. 4 EStG)",
  },
  {
    id: "pkw-verbrenner",
    icon: Car,
    name: "PKW Verbrenner (Firmenwagen)",
    category: "Fahrzeuge",
    nutzungsdauer: 6,
    hinweis: "AfA-Tabelle Allgemein. 1%-Regel bei privater Nutzung (§6 Abs. 1 Nr. 4)",
  },
  {
    id: "e-bike",
    icon: Car,
    name: "E-Bike / Pedelec",
    category: "Fahrzeuge",
    nutzungsdauer: 7,
    hinweis: "Lt. AfA-Tabelle. Bei Überlassung an Arbeitnehmer steuerfrei §3 Nr. 37 EStG",
  },
  // Maschinen / Sonstiges
  {
    id: "kaffeemaschine",
    icon: Package,
    name: "Kaffeemaschine (Vollautomat)",
    category: "Ausstattung",
    nutzungsdauer: 8,
    hinweis: "Wenn >800€ netto. Unter 800€ = GWG = Sofortabschreibung",
  },
  {
    id: "kuechenausstattung",
    icon: Package,
    name: "Küchenausstattung",
    category: "Ausstattung",
    nutzungsdauer: 10,
    hinweis: "AfA-Tabelle, je nach Einzelteil 8-15 Jahre",
  },
  {
    id: "video-equipment",
    icon: Package,
    name: "Kamera / Video-Equipment",
    category: "Ausstattung",
    nutzungsdauer: 7,
    hinweis: "Lt. AfA-Tabelle. Bei Content-Creators: Anteilige private Nutzung kürzen",
  },
];

const AbschreibungRechner = () => {
  const [assetId, setAssetId] = useState<string>("laptop");
  const [nettoPreis, setNettoPreis] = useState(1200);
  const [istKleinunternehmer, setIstKleinunternehmer] = useState(false);
  const [anschaffungsMonat, setAnschaffungsMonat] = useState(6); // Juni
  const [poolGenutzt, setPoolGenutzt] = useState(false);

  const asset = AFA_ASSETS.find((a) => a.id === assetId)!;

  // Anschaffungspreis: bei KU = brutto (kein VSt-Abzug), sonst netto als Basis
  const anschaffungsBasis = nettoPreis;

  const result = useMemo(() => {
    // 1) BMF-Sofortabschreibung (Computer-Hardware/Software)?
    if (asset.bmfSofort) {
      return {
        modus: "BMF-Sofortabschreibung (1 Jahr)" as const,
        jahresAfa: anschaffungsBasis,
        anzahlJahre: 1,
        details: [`Anschaffungsjahr: ${formatEur(anschaffungsBasis)} voll abgeschrieben`],
        hinweis:
          "BMF-Schreiben 22.2.2022: Computer-Hardware + Software haben eine betriebsgewöhnliche Nutzungsdauer von 1 Jahr — kompletter Anschaffungspreis im Kaufjahr als Betriebsausgabe abziehbar. Auch wenn Anschaffung erst im Dezember.",
      };
    }

    // 2) GWG-Sofortabschreibung (≤800€ netto)?
    if (anschaffungsBasis <= GWG_NETTO_SCHWELLE && !istKleinunternehmer) {
      return {
        modus: "GWG §6 Abs. 2 EStG (≤800€)" as const,
        jahresAfa: anschaffungsBasis,
        anzahlJahre: 1,
        details: [`Anschaffungsjahr: ${formatEur(anschaffungsBasis)} voll abgeschrieben`],
        hinweis:
          "Geringwertiges Wirtschaftsgut: bis 800€ netto Sofortabschreibung im Anschaffungsjahr (auch wenn Dezember). Bei KU: 800€ brutto = ~672€ netto (16% Tax) Schwelle.",
      };
    }

    // 3) Pool-Abschreibung (250-1000€, 5 Jahre)?
    if (poolGenutzt && anschaffungsBasis >= POOL_UNTERGRENZE && anschaffungsBasis <= POOL_OBERGRENZE) {
      const jahresAfa = anschaffungsBasis / POOL_DAUER_JAHRE;
      const details = Array.from({ length: POOL_DAUER_JAHRE }, (_, i) => `Jahr ${i + 1}: ${formatEur(jahresAfa)}`);
      return {
        modus: "Sammelposten §6 Abs. 2a (5 Jahre)" as const,
        jahresAfa,
        anzahlJahre: POOL_DAUER_JAHRE,
        details,
        hinweis:
          "Alternative zur GWG: alle WG zwischen 250-1000€ in einen Pool, gleichmäßige Abschreibung über 5 Jahre. Bindung: pro Wirtschaftsjahr einmal entscheiden — entweder alles GWG oder alles Pool.",
      };
    }

    // 4) Reguläre AfA (lineare Abschreibung, pro rata temporis)
    const jahresAfaVoll = anschaffungsBasis / asset.nutzungsdauer;
    const monateImErstjahr = 13 - anschaffungsMonat; // Anschaffung Juni → 7 Monate Erstjahr
    const jahresAfaErstjahr = (jahresAfaVoll * monateImErstjahr) / 12;
    const details = [
      `Jahr 1 (${monateImErstjahr} Monate, pro rata): ${formatEur(jahresAfaErstjahr)}`,
      ...Array.from({ length: asset.nutzungsdauer - 1 }, (_, i) =>
        `Jahr ${i + 2}: ${formatEur(jahresAfaVoll)}`,
      ),
      `Jahr ${asset.nutzungsdauer + 1} (Rest): ${formatEur(jahresAfaVoll - jahresAfaErstjahr)}`,
    ];
    return {
      modus: `Lineare AfA §7 EStG (${asset.nutzungsdauer} Jahre)` as const,
      jahresAfa: jahresAfaVoll,
      anzahlJahre: asset.nutzungsdauer,
      details,
      hinweis: `AfA-Tabelle Allgemein: ${asset.nutzungsdauer} Jahre Nutzungsdauer = ${(100 / asset.nutzungsdauer).toFixed(2)}% jährlich linear. Pro-rata-temporis im Erstjahr (Anschaffungsmonat zählt).`,
    };
  }, [asset, anschaffungsBasis, istKleinunternehmer, anschaffungsMonat, poolGenutzt]);

  const istGwgRange = anschaffungsBasis <= GWG_NETTO_SCHWELLE;
  const istPoolRange = anschaffungsBasis >= POOL_UNTERGRENZE && anschaffungsBasis <= POOL_OBERGRENZE;

  return (
    <CockpitShell
      eyebrow="Abschreibungs-Erklärer · Stand Mai 2026"
      title="Wie schreibt man Laptops, Handys, Schreibtische ab?"
      subtitle="GWG ≤800€ (§6 Abs. 2 EStG) · BMF-Sofortabschreibung für Computer/Software (1-Jahres-Nutzungsdauer seit 2021) · Sammelposten 250-1000€ (§6 Abs. 2a) · Lineare AfA §7 EStG mit AfA-Tabelle. 18 typische Asset-Types."
    >
      {/* ============ INPUTS ============ */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
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
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              {istKleinunternehmer ? "Brutto-Preis (€)" : "Netto-Preis (€)"}
            </Label>
            <Input
              type="number"
              min={0}
              step={0.01}
              value={nettoPreis}
              onChange={(e) => setNettoPreis(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              {istKleinunternehmer
                ? "Als Kleinunternehmer ist Brutto die Bemessungsgrundlage (kein VSt-Abzug)"
                : "Bemessungsgrundlage ist Netto — Vorsteuer wird separat geltend gemacht"}
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Anschaffungs-Monat (1-12)
            </Label>
            <Input
              type="number"
              min={1}
              max={12}
              value={anschaffungsMonat}
              onChange={(e) => setAnschaffungsMonat(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Pro rata temporis: Anschaffung Juni → 7 Monate Erstjahr
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Empfänger</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: false, l: "Regelbesteuerer" },
                { v: true, l: "Kleinunternehmer §19" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setIstKleinunternehmer(o.v)}
                  className={`rounded-md border h-10 text-sm ${
                    istKleinunternehmer === o.v
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

        {/* Pool-Toggle nur wenn in Range */}
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
                gleichmäßig) — alternativ zur GWG-Regel. Achtung: Wirtschaftsjahr-Bindung.
              </span>
            </label>
          </div>
        )}
      </div>

      {/* ============ ERGEBNIS ============ */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/5 p-6 mb-4">
        <div className="flex items-start gap-3 mb-3">
          <Calculator className="h-6 w-6 text-emerald-700 shrink-0" />
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Empfohlener Abschreibungs-Modus
            </div>
            <div className="text-2xl font-bold">{result.modus}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl bg-card border border-border p-3">
            <div className="text-xs text-muted-foreground mb-1">Erstjahres-Abschreibung</div>
            <div className="text-2xl font-bold text-emerald-700">
              {formatEur(result.modus.includes("Sofort") || result.modus.includes("GWG") || result.modus.includes("Pool")
                ? result.jahresAfa
                : (result.jahresAfa * (13 - anschaffungsMonat)) / 12)}
            </div>
          </div>
          <div className="rounded-xl bg-card border border-border p-3">
            <div className="text-xs text-muted-foreground mb-1">Über gesamt</div>
            <div className="text-2xl font-bold">
              {result.anzahlJahre} Jahr{result.anzahlJahre === 1 ? "" : "e"}
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-card border border-border p-3 mb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Abschreibungs-Plan
          </div>
          <ul className="text-sm space-y-1 font-mono">
            {result.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3 text-xs flex items-start gap-2">
          <Info className="h-3.5 w-3.5 text-blue-700 shrink-0 mt-0.5" />
          <div className="text-muted-foreground">{result.hinweis}</div>
        </div>
      </div>

      {/* ============ MODUS-INFO (alle 4 Modi sichtbar) ============ */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Info className="h-4 w-4" /> Alle 4 Abschreibungs-Modi im Überblick
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ModusCard
            title="BMF-Sofortabschreibung (1 Jahr)"
            applies="Computer-Hardware + Software (Laptop, PC, Handy, Tablet, Monitor, Drucker, Software-Lizenzen)"
            rule="BMF-Schreiben 22.2.2022: Nutzungsdauer 1 Jahr für ALLE Computer-/IT-Hardware unabhängig vom Preis"
            example="iPhone 15 Pro 1.500€ netto im November gekauft → 1.500€ voll im Anschaffungsjahr abziehbar"
            color="emerald"
          />
          <ModusCard
            title="GWG ≤800€ (§6 Abs. 2 EStG)"
            applies="Beliebige Wirtschaftsgüter bis 800€ netto (selbständig nutzbar)"
            rule="Geringwertiges Wirtschaftsgut: Sofortabschreibung im Anschaffungsjahr"
            example="Bürostuhl 750€ netto im Dezember → 750€ voll als Betriebsausgabe abziehbar"
            color="blue"
          />
          <ModusCard
            title="Sammelposten §6 Abs. 2a (5 Jahre)"
            applies="Wirtschaftsgüter 250-1000€ netto (alle in einen Pool)"
            rule="Alternative zur GWG: 5-Jahres-Sammelposten, gleichmäßige Abschreibung 20%/Jahr"
            example="Schreibtisch 900€ → Pool → 180€/Jahr für 5 Jahre. Achtung: Wirtschaftsjahr-Bindung!"
            color="amber"
          />
          <ModusCard
            title="Lineare AfA §7 EStG"
            applies="Wirtschaftsgüter >800€ netto (außer Computer-Hardware)"
            rule="Nutzungsdauer aus AfA-Tabelle. Pro rata temporis im Erstjahr (Monat der Anschaffung zählt)"
            example="Schreibtisch 1.500€ netto im Juni → 13 Jahre AfA = 115,38€/Jahr · Jahr 1: 67,31€ (7/12)"
            color="purple"
          />
        </div>
      </div>

      {/* ============ AFA-TABELLE QUICK-REF ============ */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-4">
        <h3 className="font-bold text-sm mb-3">AfA-Nutzungsdauern (Quick-Reference)</h3>
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
                  <td className="py-2 px-2 font-mono">{a.nutzungsdauer} Jahr{a.nutzungsdauer === 1 ? "" : "e"}</td>
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

      {/* ============ WICHTIGE HINWEISE ============ */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Wichtige Praxis-Hinweise:</strong>
            <ul className="list-disc pl-4 space-y-1 mt-1 text-muted-foreground">
              <li>
                <strong>Selbständige Nutzbarkeit</strong> ist Pflicht für GWG: ein Monitor-Standfuß
                allein ist KEIN GWG (nicht selbst nutzbar), ein Monitor schon
              </li>
              <li>
                <strong>BMF-Sofortabschreibung Computer/Software</strong> ist optional — bei
                Investitionsabzugsbetrag (§7g) ggf. besser lineare AfA wählen
              </li>
              <li>
                <strong>Kleinunternehmer §19:</strong> Brutto-Preis ist Bemessungsgrundlage (kein
                VSt-Abzug), 800€-Schwelle gilt für Brutto-KU dann effektiv ~ {Math.round(GWG_NETTO_SCHWELLE * 1.19)}€
              </li>
              <li>
                <strong>Pro rata temporis im Erstjahr:</strong> nur die Monate ab Anschaffung
                zählen. Schreibtisch 1.200€ im Oktober (3 Monate) = 1.200/13/12*3 = 23,08€ im
                Erstjahr
              </li>
              <li>
                <strong>Sammelposten-Falle:</strong> entscheidest du dich pro Wirtschaftsjahr
                EINMAL — entweder ALLE WG zwischen 250-1000€ als GWG (sofort) ODER als Pool (5
                Jahre). Mix-and-match nicht erlaubt!
              </li>
              <li>
                <strong>Bewegliche vs. unbewegliche WG:</strong> Sofortabschreibung nur für
                bewegliche Wirtschaftsgüter. Einbauküche, Aufzug, Sanitäranlagen = unbeweglich
              </li>
              <li>
                <strong>Private Nutzung:</strong> bei gemischter Nutzung muss der private Anteil
                gekürzt werden (z.B. Laptop 70% beruflich → 70% Abschreibung)
              </li>
              <li>
                <strong>IAB §7g:</strong> Bei KMU bis 200k€ Gewinn kannst du bis zu 50% der
                geplanten Investition VOR Anschaffung steuermindernd abziehen — eigenes Tool
                /cockpit/iab-rechner
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
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
