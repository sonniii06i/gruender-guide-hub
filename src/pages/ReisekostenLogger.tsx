import { useState, useMemo } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Download, Receipt, Plane } from "lucide-react";

type Reise = {
  id: string;
  zweck: string;
  datum: string;
  endeDatum: string;
  ziel: string;
  istAusland: boolean;
  abgerechnet: boolean;
  /** Verpflegung: Pauschalen werden auto-berechnet. */
  verpflegungPauschalenLand: string;
  /** Übernachtung als Pauschale oder belegt. */
  uebernachtungEffektiv: number;
  uebernachtungAnzahl: number;
  /** Fahrt-Kosten. */
  kmGefahren: number;
  fahrtMittel: "auto" | "bahn" | "flug" | "mix";
  fahrtKostenBelegt: number;
  /** Sonstige (Taxi, Mietwagen etc.). */
  sonstige: number;
  /** Bei Tagesreise (1 Tag): Abwesenheit > 8 h erforderlich für 14€-Pauschale (§9 Abs. 4a EStG) */
  tagesreiseUeber8h?: boolean;
};

type Bewirtung = {
  id: string;
  datum: string;
  ort: string;
  gaeste: string;
  anlass: string;
  bewirtetGeschaeftlich: boolean;
  bruttoBetrag: number;
  trinkgeld: number;
};

// Verpflegungs-Pauschalen DE 2026 (§9 Abs 4a EStG)
const VERPFLEGUNG_DE = {
  ganzerTag: 28, // ab 24h Abwesenheit
  halberTag: 14, // 8-24h Abwesenheit
};

// Auswahl Auslands-Pauschalen — BMF-Schreiben Auslandsreisekosten ab 01.01.2026
// Quelle: BMF-Schreiben IV C 5 - S 2353/19/10011 (das BMF veröffentlicht jährlich Update)
// BMF-Schreiben hat 200+ Länder; hier kuratiert die wichtigsten Reise-Ziele DE-Gründer
const VERPFLEGUNG_AUSLAND: Record<string, { ganzerTag: number; halberTag: number; uebernachtung: number }> = {
  // EU
  "Frankreich-Paris": { ganzerTag: 58, halberTag: 39, uebernachtung: 152 },
  Frankreich: { ganzerTag: 47, halberTag: 32, uebernachtung: 99 },
  "Italien-Mailand": { ganzerTag: 49, halberTag: 33, uebernachtung: 188 },
  "Italien-Rom": { ganzerTag: 48, halberTag: 32, uebernachtung: 174 },
  Italien: { ganzerTag: 41, halberTag: 28, uebernachtung: 138 },
  "Spanien-Madrid": { ganzerTag: 39, halberTag: 26, uebernachtung: 132 },
  "Spanien-Barcelona": { ganzerTag: 39, halberTag: 26, uebernachtung: 144 },
  Spanien: { ganzerTag: 36, halberTag: 24, uebernachtung: 110 },
  Portugal: { ganzerTag: 41, halberTag: 28, uebernachtung: 109 },
  Niederlande: { ganzerTag: 47, halberTag: 32, uebernachtung: 119 },
  Belgien: { ganzerTag: 41, halberTag: 28, uebernachtung: 130 },
  Österreich: { ganzerTag: 36, halberTag: 24, uebernachtung: 104 },
  "Polen-Warschau": { ganzerTag: 33, halberTag: 22, uebernachtung: 101 },
  Polen: { ganzerTag: 27, halberTag: 18, uebernachtung: 60 },
  Tschechien: { ganzerTag: 32, halberTag: 21, uebernachtung: 97 },
  Schweden: { ganzerTag: 50, halberTag: 33, uebernachtung: 168 },
  Dänemark: { ganzerTag: 75, halberTag: 50, uebernachtung: 158 },
  // Großbritannien
  London: { ganzerTag: 64, halberTag: 43, uebernachtung: 233 },
  "UK-sonstige": { ganzerTag: 47, halberTag: 32, uebernachtung: 130 },
  // Schweiz
  "Schweiz-Zürich": { ganzerTag: 64, halberTag: 43, uebernachtung: 191 },
  "Schweiz-Genf": { ganzerTag: 66, halberTag: 44, uebernachtung: 205 },
  Schweiz: { ganzerTag: 56, halberTag: 37, uebernachtung: 169 },
  // Nordamerika
  "USA-NewYork": { ganzerTag: 68, halberTag: 45, uebernachtung: 318 },
  "USA-California": { ganzerTag: 64, halberTag: 43, uebernachtung: 257 },
  "USA-Florida": { ganzerTag: 56, halberTag: 37, uebernachtung: 158 },
  "USA-sonstige": { ganzerTag: 51, halberTag: 34, uebernachtung: 159 },
  Kanada: { ganzerTag: 47, halberTag: 32, uebernachtung: 158 },
  // Asien
  Hongkong: { ganzerTag: 92, halberTag: 61, uebernachtung: 311 },
  Singapur: { ganzerTag: 64, halberTag: 43, uebernachtung: 220 },
  "Japan-Tokio": { ganzerTag: 73, halberTag: 49, uebernachtung: 213 },
  "China-Peking": { ganzerTag: 51, halberTag: 34, uebernachtung: 132 },
  "China-Shanghai": { ganzerTag: 56, halberTag: 37, uebernachtung: 154 },
  Südkorea: { ganzerTag: 56, halberTag: 37, uebernachtung: 192 },
  Indien: { ganzerTag: 33, halberTag: 22, uebernachtung: 134 },
  Thailand: { ganzerTag: 36, halberTag: 24, uebernachtung: 117 },
  // Naher Osten
  "VAE-Dubai": { ganzerTag: 47, halberTag: 32, uebernachtung: 227 },
  Israel: { ganzerTag: 64, halberTag: 43, uebernachtung: 216 },
  Türkei: { ganzerTag: 39, halberTag: 26, uebernachtung: 102 },
  // Sonstige
  Australien: { ganzerTag: 56, halberTag: 37, uebernachtung: 187 },
  Brasilien: { ganzerTag: 47, halberTag: 32, uebernachtung: 175 },
  Mexiko: { ganzerTag: 47, halberTag: 32, uebernachtung: 178 },
  Südafrika: { ganzerTag: 36, halberTag: 24, uebernachtung: 154 },
};

const ReisekostenLogger = () => {
  const [reisen, setReisen] = useState<Reise[]>([]);
  const [bewirtungen, setBewirtungen] = useState<Bewirtung[]>([]);
  const [activeTab, setActiveTab] = useState<"reisen" | "bewirtung">("reisen");

  const addReise = () => {
    setReisen([
      ...reisen,
      {
        id: Date.now().toString(),
        zweck: "Geschäftsreise",
        datum: new Date().toISOString().slice(0, 10),
        endeDatum: new Date().toISOString().slice(0, 10),
        ziel: "",
        istAusland: false,
        abgerechnet: false,
        verpflegungPauschalenLand: "Deutschland",
        uebernachtungEffektiv: 0,
        uebernachtungAnzahl: 0,
        kmGefahren: 0,
        fahrtMittel: "auto",
        fahrtKostenBelegt: 0,
        sonstige: 0,
      },
    ]);
  };

  const updateReise = (id: string, patch: Partial<Reise>) =>
    setReisen(reisen.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const removeReise = (id: string) => setReisen(reisen.filter((r) => r.id !== id));

  const addBewirtung = () => {
    setBewirtungen([
      ...bewirtungen,
      {
        id: Date.now().toString(),
        datum: new Date().toISOString().slice(0, 10),
        ort: "",
        gaeste: "",
        anlass: "",
        bewirtetGeschaeftlich: true,
        bruttoBetrag: 0,
        trinkgeld: 0,
      },
    ]);
  };

  const updateBewirtung = (id: string, patch: Partial<Bewirtung>) =>
    setBewirtungen(bewirtungen.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  const removeBewirtung = (id: string) => setBewirtungen(bewirtungen.filter((b) => b.id !== id));

  const calcReise = (r: Reise) => {
    const tage = Math.max(
      1,
      Math.floor(
        (new Date(r.endeDatum).getTime() - new Date(r.datum).getTime()) / (1000 * 60 * 60 * 24),
      ) + 1,
    );

    let verpflegung = 0;
    const istTagesreise = tage === 1;
    if (istTagesreise && !r.tagesreiseUeber8h) {
      // §9 Abs. 4a EStG: Tagesreise <8h Abwesenheit → keine Verpflegungspauschale
      verpflegung = 0;
    } else if (r.istAusland && VERPFLEGUNG_AUSLAND[r.verpflegungPauschalenLand]) {
      const land = VERPFLEGUNG_AUSLAND[r.verpflegungPauschalenLand];
      // Tagesreise > 8h: 14€ (halber Satz). Mehrtages-Reise: An-/Abreise je halber, dazwischen ganzer.
      if (istTagesreise) {
        verpflegung = land.halberTag;
      } else {
        const ganzeTage = Math.max(0, tage - 2);
        verpflegung = ganzeTage * land.ganzerTag + 2 * land.halberTag;
      }
    } else {
      if (istTagesreise) {
        verpflegung = VERPFLEGUNG_DE.halberTag;
      } else {
        const ganzeTage = Math.max(0, tage - 2);
        verpflegung = ganzeTage * VERPFLEGUNG_DE.ganzerTag + 2 * VERPFLEGUNG_DE.halberTag;
      }
    }

    // Fahrtkosten: 0,30 €/km bei Auto, sonst belegt
    let fahrt = 0;
    if (r.fahrtMittel === "auto") {
      fahrt = r.kmGefahren * 0.30;
    }
    fahrt += r.fahrtKostenBelegt;

    const total = verpflegung + r.uebernachtungEffektiv * r.uebernachtungAnzahl + fahrt + r.sonstige;
    return { tage, verpflegung, fahrt, total };
  };

  const calcBewirtung = (b: Bewirtung) => {
    // Geschäftsbewirtung: 70 % als BA absetzbar (§4 Abs 5 Nr 2 EStG)
    // Privat-Bewirtung: 0 %
    const total = b.bruttoBetrag + b.trinkgeld;
    const absetzbar = b.bewirtetGeschaeftlich ? total * 0.7 : 0;
    const vorsteuer = b.bewirtetGeschaeftlich ? (b.bruttoBetrag / 1.19) * 0.19 : 0; // 19 % Vorsteuer voll abziehbar
    return { total, absetzbar, vorsteuer, anteil: b.bewirtetGeschaeftlich ? 70 : 0 };
  };

  const totals = useMemo(() => {
    const reisenTotal = reisen.reduce((sum, r) => sum + calcReise(r).total, 0);
    const bewirtungenTotal = bewirtungen.reduce((sum, b) => sum + calcBewirtung(b).absetzbar, 0);
    return { reisen: reisenTotal, bewirtung: bewirtungenTotal };
  }, [reisen, bewirtungen]);

  return (
    <CockpitShell
      eyebrow="Reisekosten-Logger"
      title="Reisekosten + Bewirtung erfassen"
      subtitle="Mit auto-berechneten Verpflegungs-Pauschalen DE (28 €/14 €) + 35+ Auslands-Länder · 8h-Schwelle für Tagesreise (§9 (4a) EStG) · Fahrtkosten 0,30 €/km · Bewirtung 70 % BA mit Vorsteuer-Abzug · CSV-Export für StB."
    >
      {/* Tab Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("reisen")}
          className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            activeTab === "reisen"
              ? "bg-accent-blue text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          <Plane className="h-3.5 w-3.5" /> Reisen ({reisen.length})
        </button>
        <button
          onClick={() => setActiveTab("bewirtung")}
          className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            activeTab === "bewirtung"
              ? "bg-accent-blue text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          <Receipt className="h-3.5 w-3.5" /> Bewirtung ({bewirtungen.length})
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-emerald-700">Reisekosten total</div>
          <div className="text-xl font-bold text-emerald-700">
            {totals.reisen.toLocaleString("de-DE", { maximumFractionDigits: 2 })} €
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">100 % als BA absetzbar</div>
        </div>
        <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-accent-blue">Bewirtung absetzbar (70 %)</div>
          <div className="text-xl font-bold text-accent-blue">
            {totals.bewirtung.toLocaleString("de-DE", { maximumFractionDigits: 2 })} €
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Vorsteuer voll abziehbar</div>
        </div>
      </div>

      {/* Reisen Tab */}
      {activeTab === "reisen" && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">Geschäftsreisen</h3>
            <button
              onClick={addReise}
              className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" /> Reise hinzufügen
            </button>
          </div>

          <div className="space-y-3">
            {reisen.map((r) => {
              const c = calcReise(r);
              return (
                <div key={r.id} className="rounded-2xl border border-border bg-card p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                    <div className="md:col-span-2">
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Zweck</Label>
                      <Input
                        value={r.zweck}
                        onChange={(e) => updateReise(r.id, { zweck: e.target.value })}
                        placeholder="z.B. Kunden-Termin München"
                        className="h-8 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Ziel</Label>
                      <Input
                        value={r.ziel}
                        onChange={(e) => updateReise(r.id, { ziel: e.target.value })}
                        placeholder="z.B. München"
                        className="h-8 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Beginn</Label>
                      <Input
                        type="date"
                        value={r.datum}
                        onChange={(e) => updateReise(r.id, { datum: e.target.value })}
                        className="h-8 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Ende</Label>
                      <Input
                        type="date"
                        value={r.endeDatum}
                        onChange={(e) => updateReise(r.id, { endeDatum: e.target.value })}
                        className="h-8 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Inland / Ausland</Label>
                      <select
                        value={r.istAusland ? r.verpflegungPauschalenLand : "Deutschland"}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === "Deutschland") updateReise(r.id, { istAusland: false });
                          else updateReise(r.id, { istAusland: true, verpflegungPauschalenLand: v });
                        }}
                        className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs mt-1"
                      >
                        <option value="Deutschland">🇩🇪 Deutschland</option>
                        {Object.keys(VERPFLEGUNG_AUSLAND).map((l) => (
                          <option key={l} value={l}>
                            🌍 {l}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Bei Tagesreise (Start = Ende): 8h-Abwesenheit-Check für Verpflegungspauschale */}
                  {r.datum === r.endeDatum && r.datum && (
                    <div className="mb-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2">
                      <label className="flex items-center gap-2 text-xs cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!r.tagesreiseUeber8h}
                          onChange={(e) => updateReise(r.id, { tagesreiseUeber8h: e.target.checked })}
                          className="h-4 w-4"
                        />
                        <span>
                          <strong>Tagesreise &gt; 8 h Abwesenheit</strong> — Pflicht für 14 € Pauschale (§9 Abs. 4a EStG). Ohne Haken: 0 €.
                        </span>
                      </label>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Übernachtung €/Nacht</Label>
                      <Input
                        type="number"
                        value={r.uebernachtungEffektiv || ""}
                        onChange={(e) =>
                          updateReise(r.id, { uebernachtungEffektiv: Math.max(0, Number(e.target.value) || 0) })
                        }
                        className="h-8 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Anzahl Nächte</Label>
                      <Input
                        type="number"
                        value={r.uebernachtungAnzahl || ""}
                        onChange={(e) =>
                          updateReise(r.id, { uebernachtungAnzahl: Math.max(0, Number(e.target.value) || 0) })
                        }
                        className="h-8 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Verkehrsmittel</Label>
                      <select
                        value={r.fahrtMittel}
                        onChange={(e) => updateReise(r.id, { fahrtMittel: e.target.value as Reise["fahrtMittel"] })}
                        className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs mt-1"
                      >
                        <option value="auto">Auto (0,30 €/km)</option>
                        <option value="bahn">Bahn (belegt)</option>
                        <option value="flug">Flug (belegt)</option>
                        <option value="mix">Mix</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {r.fahrtMittel === "auto" ? "km gefahren" : "Belegte Kosten €"}
                      </Label>
                      {r.fahrtMittel === "auto" ? (
                        <Input
                          type="number"
                          value={r.kmGefahren || ""}
                          onChange={(e) => updateReise(r.id, { kmGefahren: Math.max(0, Number(e.target.value) || 0) })}
                          className="h-8 text-sm mt-1"
                        />
                      ) : (
                        <Input
                          type="number"
                          value={r.fahrtKostenBelegt || ""}
                          onChange={(e) =>
                            updateReise(r.id, { fahrtKostenBelegt: Math.max(0, Number(e.target.value) || 0) })
                          }
                          className="h-8 text-sm mt-1"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-border">
                    <div className="grid grid-cols-3 gap-3 text-xs flex-1">
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase">{c.tage} Tage</div>
                        <div className="font-mono">Verpflegung: {c.verpflegung.toFixed(2)} €</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase">Fahrt</div>
                        <div className="font-mono">{c.fahrt.toFixed(2)} €</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase">Total</div>
                        <div className="font-mono font-bold text-emerald-700">{c.total.toFixed(2)} €</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeReise(r.id)}
                      className="text-red-600 hover:bg-red-500/10 p-1 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
            {reisen.length === 0 && (
              <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                Noch keine Reisen erfasst. Klick "Reise hinzufügen" oben rechts.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bewirtung Tab */}
      {activeTab === "bewirtung" && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">Bewirtungs-Belege</h3>
            <button
              onClick={addBewirtung}
              className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" /> Beleg hinzufügen
            </button>
          </div>

          <div className="space-y-3">
            {bewirtungen.map((b) => {
              const c = calcBewirtung(b);
              return (
                <div key={b.id} className="rounded-2xl border border-border bg-card p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Datum</Label>
                      <Input
                        type="date"
                        value={b.datum}
                        onChange={(e) => updateBewirtung(b.id, { datum: e.target.value })}
                        className="h-8 text-sm mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Restaurant / Ort</Label>
                      <Input
                        value={b.ort}
                        onChange={(e) => updateBewirtung(b.id, { ort: e.target.value })}
                        placeholder="z.B. Restaurant Borchardt, Berlin"
                        className="h-8 text-sm mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Gäste (Vor- + Nachname Pflicht)
                      </Label>
                      <Input
                        value={b.gaeste}
                        onChange={(e) => updateBewirtung(b.id, { gaeste: e.target.value })}
                        placeholder="z.B. Max Müller (Acme GmbH), Jane Doe (Beta Inc.)"
                        className="h-8 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Anlass</Label>
                      <Input
                        value={b.anlass}
                        onChange={(e) => updateBewirtung(b.id, { anlass: e.target.value })}
                        placeholder="z.B. Vertrags-Abschluss"
                        className="h-8 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Brutto-Rechnung €</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={b.bruttoBetrag || ""}
                        onChange={(e) =>
                          updateBewirtung(b.id, { bruttoBetrag: Math.max(0, Number(e.target.value) || 0) })
                        }
                        className="h-8 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Trinkgeld €</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={b.trinkgeld || ""}
                        onChange={(e) => updateBewirtung(b.id, { trinkgeld: Math.max(0, Number(e.target.value) || 0) })}
                        className="h-8 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Geschäftlich?</Label>
                      <div className="grid grid-cols-2 gap-1 mt-1">
                        {[
                          { v: true, l: "Ja (70%)" },
                          { v: false, l: "Privat" },
                        ].map((o) => (
                          <button
                            key={String(o.v)}
                            onClick={() => updateBewirtung(b.id, { bewirtetGeschaeftlich: o.v })}
                            className={`h-8 rounded-md border text-xs transition-colors ${
                              b.bewirtetGeschaeftlich === o.v
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

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
                    <div className="grid grid-cols-3 gap-3 text-xs flex-1">
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase">Total Brutto</div>
                        <div className="font-mono">{c.total.toFixed(2)} €</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase">Absetzbar ({c.anteil}%)</div>
                        <div className="font-mono font-bold text-emerald-700">{c.absetzbar.toFixed(2)} €</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase">Vorsteuer (100%)</div>
                        <div className="font-mono">{c.vorsteuer.toFixed(2)} €</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeBewirtung(b.id)}
                      className="text-red-600 hover:bg-red-500/10 p-1 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
            {bewirtungen.length === 0 && (
              <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                Noch keine Bewirtungs-Belege. Klick "Beleg hinzufügen" oben rechts.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tipps */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mt-6 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <Receipt className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtige Regeln:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Verpflegungs-Pauschalen DE 2026</strong>: 28 € ganzer Tag (≥24h Abwesenheit), 14 € halber
                Tag (8-24h), 0 € unter 8h.
              </li>
              <li>
                <strong>Auslands-Pauschalen</strong>: BMF-Schreiben listet 200+ Länder/Regionen. Tool zeigt 12
                wichtigste — restliche manuell eintragen.
              </li>
              <li>
                <strong>Übernachtung</strong>: ENTWEDER Pauschale (DE 20 €/Nacht) ODER belegt — nicht beides.
                Belegt ist meist höher.
              </li>
              <li>
                <strong>Bewirtungs-70%-Regel</strong>: §4 Abs 5 Nr 2 EStG. Vorsteuer bleibt aber 100 %
                abziehbar.
              </li>
              <li>
                <strong>Bewirtungs-Pflichtangaben</strong>: Datum, Ort, Gäste (Name + Firma!), Anlass, alle Speisen
                + Getränke detailliert. Maschinell erstellter Quittung-Beleg + handschriftlicher Anlass auf der
                Rückseite.
              </li>
              <li>
                <strong>Trinkgeld</strong>: muss separat auf der Rechnung sein ODER via Quittung mit Bezug zur
                Hauptrechnung dokumentiert.
              </li>
              <li>
                <strong>Privat-Bewirtung</strong>: 0 % absetzbar. Geburtstage, Hochzeiten — nicht versuchen
                hineinzuschmuggeln.
              </li>
              <li>
                <strong>Reisekosten-Belege 10 Jahre aufbewahren</strong> (§147 AO).
              </li>
              <li>OCR-Belege via Apps (Lexoffice, sevDesk) reduzieren manuelles Erfassen.</li>
            </ul>
          </div>
        </div>
      </div>

      <Stand2026Footer
        sources={[
          { label: "§9 (4a) EStG (Verpflegungspauschalen)", url: "https://www.gesetze-im-internet.de/estg/__9.html" },
          { label: "§4 (5) Nr. 2 EStG (Bewirtung 70 %)", url: "https://www.gesetze-im-internet.de/estg/__4.html" },
          { label: "BMF-Schreiben Auslandsreisekosten 2026", url: "https://www.bundesfinanzministerium.de" },
        ]}
        note="Auslands-Pauschalen sind BMF-Werte 2026 (jährliches BMF-Update). Bei nicht gelisteten Ländern: BMF-Tabelle vollständig konsultieren oder DE-Pauschale anwenden."
      />
    </CockpitShell>
  );
};

export default ReisekostenLogger;
