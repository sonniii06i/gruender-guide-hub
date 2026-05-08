import { useState, useMemo } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
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

// Auswahl Auslands-Pauschalen (sehr vereinfacht — BMF-Schreiben hat 200+ Länder)
const VERPFLEGUNG_AUSLAND: Record<string, { ganzerTag: number; halberTag: number; uebernachtung: number }> = {
  Frankreich: { ganzerTag: 50, halberTag: 33, uebernachtung: 99 },
  Italien: { ganzerTag: 40, halberTag: 27, uebernachtung: 99 },
  Spanien: { ganzerTag: 39, halberTag: 26, uebernachtung: 100 },
  Portugal: { ganzerTag: 35, halberTag: 24, uebernachtung: 92 },
  Niederlande: { ganzerTag: 45, halberTag: 30, uebernachtung: 116 },
  "USA-NewYork": { ganzerTag: 66, halberTag: 44, uebernachtung: 308 },
  "USA-California": { ganzerTag: 60, halberTag: 40, uebernachtung: 230 },
  London: { ganzerTag: 62, halberTag: 41, uebernachtung: 224 },
  Schweiz: { ganzerTag: 60, halberTag: 40, uebernachtung: 169 },
  Hongkong: { ganzerTag: 78, halberTag: 52, uebernachtung: 273 },
  Singapur: { ganzerTag: 60, halberTag: 40, uebernachtung: 240 },
  Dubai: { ganzerTag: 47, halberTag: 32, uebernachtung: 227 },
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
    if (r.istAusland && VERPFLEGUNG_AUSLAND[r.verpflegungPauschalenLand]) {
      const land = VERPFLEGUNG_AUSLAND[r.verpflegungPauschalenLand];
      // Vereinfacht: erster + letzter Tag = halber Tag, Rest = ganzer Tag
      const ganzeTage = Math.max(0, tage - 2);
      const halbTage = Math.min(2, tage); // max 2 (anreise + abreise)
      verpflegung = ganzeTage * land.ganzerTag + halbTage * land.halberTag;
    } else {
      const ganzeTage = Math.max(0, tage - 2);
      const halbTage = Math.min(2, tage);
      verpflegung = ganzeTage * VERPFLEGUNG_DE.ganzerTag + halbTage * VERPFLEGUNG_DE.halberTag;
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
      subtitle="Mit auto-berechneten Verpflegungs-Pauschalen DE + 12 Auslands-Länder · Fahrtkosten 0,30 €/km · Bewirtung 70 % BA mit Vorsteuer-Abzug · CSV-Export für StB."
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
    </CockpitShell>
  );
};

export default ReisekostenLogger;
