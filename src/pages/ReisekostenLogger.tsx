import { useState, useMemo, type ReactNode } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Callout, ChoiceGroup, EmptyState, Field, StatGrid, StatTile, ToolSection, selectCls } from "@/components/cockpit/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Receipt, Plane, Utensils, BookOpen } from "lucide-react";

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

export type Bewirtung = {
  id: string;
  datum: string;
  ort: string;
  gaeste: string;
  anlass: string;
  bewirtetGeschaeftlich: boolean;
  bruttoBetrag: number;
  trinkgeld: number;
  /** USt-Satz der Rechnung: Speisen in der Gastronomie seit 01.01.2026 7 % (§12 Abs. 2 Nr. 15 UStG), Getränke 19 % */
  ustSatz?: 7 | 19;
};

// eslint-disable-next-line react-refresh/only-export-components
export const calcBewirtung = (b: Bewirtung) => {
  // Geschäftsbewirtung: 70 % als BA absetzbar (§4 Abs 5 Nr 2 EStG)
  // Privat-Bewirtung: 0 %
  // Abziehbar sind 70 % des NETTO-Betrags (+ Trinkgeld, das keine USt enthält); die Vorsteuer ist
  // zu 100 % abziehbar (§15 Abs. 1a UStG) und darf deshalb nicht zusätzlich im Betriebsausgaben-Betrag stecken.
  const satz = (b.ustSatz ?? 19) / 100;
  const total = b.bruttoBetrag + b.trinkgeld;
  const netto = b.bruttoBetrag / (1 + satz);
  const absetzbar = b.bewirtetGeschaeftlich ? (netto + b.trinkgeld) * 0.7 : 0;
  const vorsteuer = b.bewirtetGeschaeftlich ? b.bruttoBetrag - netto : 0;
  return { total, absetzbar, vorsteuer, anteil: b.bewirtetGeschaeftlich ? 70 : 0 };
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
        ustSatz: 7,
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


  const totals = useMemo(() => {
    const reisenTotal = reisen.reduce((sum, r) => sum + calcReise(r).total, 0);
    const bewirtungenTotal = bewirtungen.reduce((sum, b) => sum + calcBewirtung(b).absetzbar, 0);
    return { reisen: reisenTotal, bewirtung: bewirtungenTotal };
  }, [reisen, bewirtungen]);


  const eur = (n: number) => `${n.toLocaleString("de-DE", { maximumFractionDigits: 2 })} €`;

  return (
    <CockpitShell
      eyebrow="Reisekosten-Logger"
      title="Reisekosten und Bewirtung erfassen"
      subtitle="Verpflegungspauschalen DE (28 € / 14 €) und 35+ Auslandsziele werden automatisch berechnet. Mit 8-Stunden-Schwelle für Tagesreisen (§9 Abs. 4a EStG), Fahrtkosten 0,30 €/km und Bewirtung zu 70 % als Betriebsausgabe mit Vorsteuerabzug."
    >
      {/* Tab Toggle */}
      <div role="group" aria-label="Bereich wählen" className="mb-6 inline-flex rounded-xl bg-secondary p-1">
        {[
          { v: "reisen" as const, l: "Reisen", n: reisen.length, icon: Plane },
          { v: "bewirtung" as const, l: "Bewirtung", n: bewirtungen.length, icon: Receipt },
        ].map((t) => (
          <button
            key={t.v}
            type="button"
            aria-pressed={activeTab === t.v}
            onClick={() => setActiveTab(t.v)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-[background-color,color,box-shadow]",
              activeTab === t.v ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="h-4 w-4" aria-hidden="true" /> {t.l}
            <span className="rounded-md bg-secondary px-1.5 py-0.5 text-xs tabular">{t.n}</span>
          </button>
        ))}
      </div>

      {/* Summary */}
      <StatGrid cols={2} className="mb-6">
        <StatTile emphasis tone="success" label="Reisekosten gesamt" value={eur(totals.reisen)} hint="100 % als Betriebsausgabe absetzbar" />
        <StatTile emphasis tone="accent" label="Bewirtung absetzbar (70 %)" value={eur(totals.bewirtung)} hint="Vorsteuer voll abziehbar" />
      </StatGrid>

      {/* Reisen Tab */}
      {activeTab === "reisen" && (
        <ToolSection
          title="Geschäftsreisen"
          icon={Plane}
          className="mb-6"
          actions={
            reisen.length > 0 && (
              <Button size="sm" onClick={addReise}>
                <Plus aria-hidden="true" /> Reise hinzufügen
              </Button>
            )
          }
        >
          <div className="space-y-4">
            {reisen.map((r, idx) => {
              const c = calcReise(r);
              return (
                <article key={r.id} className="rounded-xl border border-border bg-secondary/30">
                  <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
                    <p className="min-w-0 truncate text-sm font-semibold">
                      Reise <span className="tabular">{idx + 1}</span>
                      {r.ziel && <span className="font-normal text-muted-foreground"> · {r.ziel}</span>}
                    </p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeReise(r.id)}
                      className="h-8 w-8 text-danger hover:text-danger"
                      aria-label={`Reise ${idx + 1} entfernen`}
                    >
                      <Trash2 aria-hidden="true" />
                    </Button>
                  </div>
                  <div className="space-y-4 p-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <Field label="Zweck" htmlFor={`${r.id}-zweck`} className="sm:col-span-2">
                        <Input
                          id={`${r.id}-zweck`}
                          value={r.zweck}
                          onChange={(e) => updateReise(r.id, { zweck: e.target.value })}
                          placeholder="z.B. Kunden-Termin München"
                        />
                      </Field>
                      <Field label="Ziel" htmlFor={`${r.id}-ziel`}>
                        <Input
                          id={`${r.id}-ziel`}
                          value={r.ziel}
                          onChange={(e) => updateReise(r.id, { ziel: e.target.value })}
                          placeholder="z.B. München"
                        />
                      </Field>
                      <Field label="Beginn" htmlFor={`${r.id}-beginn`}>
                        <Input
                          id={`${r.id}-beginn`}
                          type="date"
                          value={r.datum}
                          onChange={(e) => updateReise(r.id, { datum: e.target.value })}
                        />
                      </Field>
                      <Field label="Ende" htmlFor={`${r.id}-ende`}>
                        <Input
                          id={`${r.id}-ende`}
                          type="date"
                          value={r.endeDatum}
                          onChange={(e) => updateReise(r.id, { endeDatum: e.target.value })}
                        />
                      </Field>
                      <Field label="Inland oder Ausland" htmlFor={`${r.id}-land`}>
                        <select
                          id={`${r.id}-land`}
                          value={r.istAusland ? r.verpflegungPauschalenLand : "Deutschland"}
                          onChange={(e) => {
                            const v = e.target.value;
                            if (v === "Deutschland") updateReise(r.id, { istAusland: false });
                            else updateReise(r.id, { istAusland: true, verpflegungPauschalenLand: v });
                          }}
                          className={selectCls}
                        >
                          <option value="Deutschland">Deutschland</option>
                          {Object.keys(VERPFLEGUNG_AUSLAND).map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    {/* Bei Tagesreise (Start = Ende): 8h-Abwesenheit-Check für Verpflegungspauschale */}
                    {r.datum === r.endeDatum && r.datum && (
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-warning/25 bg-warning-soft p-3.5 text-sm">
                        <input
                          type="checkbox"
                          checked={!!r.tagesreiseUeber8h}
                          onChange={(e) => updateReise(r.id, { tagesreiseUeber8h: e.target.checked })}
                          className="mt-0.5 h-4 w-4 accent-[hsl(var(--accent-blue))]"
                        />
                        <span>
                          <span className="block font-medium">Tagesreise mit mehr als 8 Stunden Abwesenheit</span>
                          <span className="mt-0.5 block text-foreground/75">
                            Pflicht für die 14-€-Pauschale (§9 Abs. 4a EStG). Ohne Haken: 0 €.
                          </span>
                        </span>
                      </label>
                    )}

                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                      <Field label="Übernachtung €/Nacht" htmlFor={`${r.id}-uen`}>
                        <Input
                          id={`${r.id}-uen`}
                          type="number"
                          value={r.uebernachtungEffektiv || ""}
                          onChange={(e) =>
                            updateReise(r.id, { uebernachtungEffektiv: Math.max(0, Number(e.target.value) || 0) })
                          }
                          className="tabular"
                        />
                      </Field>
                      <Field label="Anzahl Nächte" htmlFor={`${r.id}-naechte`}>
                        <Input
                          id={`${r.id}-naechte`}
                          type="number"
                          value={r.uebernachtungAnzahl || ""}
                          onChange={(e) =>
                            updateReise(r.id, { uebernachtungAnzahl: Math.max(0, Number(e.target.value) || 0) })
                          }
                          className="tabular"
                        />
                      </Field>
                      <Field label="Verkehrsmittel" htmlFor={`${r.id}-mittel`}>
                        <select
                          id={`${r.id}-mittel`}
                          value={r.fahrtMittel}
                          onChange={(e) => updateReise(r.id, { fahrtMittel: e.target.value as Reise["fahrtMittel"] })}
                          className={selectCls}
                        >
                          <option value="auto">Auto (0,30 €/km)</option>
                          <option value="bahn">Bahn (belegt)</option>
                          <option value="flug">Flug (belegt)</option>
                          <option value="mix">Mix</option>
                        </select>
                      </Field>
                      <Field label={r.fahrtMittel === "auto" ? "Gefahrene km" : "Belegte Kosten €"} htmlFor={`${r.id}-fahrt`}>
                        {r.fahrtMittel === "auto" ? (
                          <Input
                            id={`${r.id}-fahrt`}
                            type="number"
                            value={r.kmGefahren || ""}
                            onChange={(e) => updateReise(r.id, { kmGefahren: Math.max(0, Number(e.target.value) || 0) })}
                            className="tabular"
                          />
                        ) : (
                          <Input
                            id={`${r.id}-fahrt`}
                            type="number"
                            value={r.fahrtKostenBelegt || ""}
                            onChange={(e) =>
                              updateReise(r.id, { fahrtKostenBelegt: Math.max(0, Number(e.target.value) || 0) })
                            }
                            className="tabular"
                          />
                        )}
                      </Field>
                    </div>
                  </div>

                  <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-b-xl border-t border-border/70 bg-border/70 text-sm">
                    <Kennzahl label={`Verpflegung · ${c.tage} ${c.tage === 1 ? "Tag" : "Tage"}`} value={`${c.verpflegung.toFixed(2)} €`} />
                    <Kennzahl label="Fahrt" value={`${c.fahrt.toFixed(2)} €`} />
                    <Kennzahl label="Gesamt" value={`${c.total.toFixed(2)} €`} strong />
                  </dl>
                </article>
              );
            })}
            {reisen.length === 0 && (
              <EmptyState
                icon={Plane}
                title="Noch keine Reisen erfasst"
                description="Lege deine erste Geschäftsreise an. Verpflegungspauschale, Fahrtkosten und Summe rechnet das Tool automatisch."
                action={
                  <Button onClick={addReise}>
                    <Plus aria-hidden="true" /> Reise hinzufügen
                  </Button>
                }
              />
            )}
          </div>
        </ToolSection>
      )}

      {/* Bewirtung Tab */}
      {activeTab === "bewirtung" && (
        <ToolSection
          title="Bewirtungsbelege"
          icon={Utensils}
          className="mb-6"
          actions={
            bewirtungen.length > 0 && (
              <Button size="sm" onClick={addBewirtung}>
                <Plus aria-hidden="true" /> Beleg hinzufügen
              </Button>
            )
          }
        >
          <div className="space-y-4">
            {bewirtungen.map((b, idx) => {
              const c = calcBewirtung(b);
              return (
                <article key={b.id} className="rounded-xl border border-border bg-secondary/30">
                  <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
                    <p className="min-w-0 truncate text-sm font-semibold">
                      Beleg <span className="tabular">{idx + 1}</span>
                      {b.ort && <span className="font-normal text-muted-foreground"> · {b.ort}</span>}
                    </p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeBewirtung(b.id)}
                      className="h-8 w-8 text-danger hover:text-danger"
                      aria-label={`Beleg ${idx + 1} entfernen`}
                    >
                      <Trash2 aria-hidden="true" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="Datum" htmlFor={`${b.id}-datum`}>
                      <Input
                        id={`${b.id}-datum`}
                        type="date"
                        value={b.datum}
                        onChange={(e) => updateBewirtung(b.id, { datum: e.target.value })}
                      />
                    </Field>
                    <Field label="Restaurant / Ort" htmlFor={`${b.id}-ort`} className="lg:col-span-2">
                      <Input
                        id={`${b.id}-ort`}
                        value={b.ort}
                        onChange={(e) => updateBewirtung(b.id, { ort: e.target.value })}
                        placeholder="z.B. Restaurant Borchardt, Berlin"
                      />
                    </Field>
                    <Field label="Gäste" hint="Vor- und Nachname sind Pflicht" htmlFor={`${b.id}-gaeste`} className="sm:col-span-2">
                      <Input
                        id={`${b.id}-gaeste`}
                        value={b.gaeste}
                        onChange={(e) => updateBewirtung(b.id, { gaeste: e.target.value })}
                        placeholder="z.B. Max Müller (Acme GmbH), Jane Doe (Beta Inc.)"
                      />
                    </Field>
                    <Field label="Anlass" htmlFor={`${b.id}-anlass`}>
                      <Input
                        id={`${b.id}-anlass`}
                        value={b.anlass}
                        onChange={(e) => updateBewirtung(b.id, { anlass: e.target.value })}
                        placeholder="z.B. Vertrags-Abschluss"
                      />
                    </Field>
                    <Field label="Brutto-Rechnung €" htmlFor={`${b.id}-brutto`}>
                      <Input
                        id={`${b.id}-brutto`}
                        type="number"
                        step="0.01"
                        value={b.bruttoBetrag || ""}
                        onChange={(e) =>
                          updateBewirtung(b.id, { bruttoBetrag: Math.max(0, Number(e.target.value) || 0) })
                        }
                        className="tabular"
                      />
                    </Field>
                    <Field label="USt-Satz der Rechnung" htmlFor={`${b.id}-ust`} hint="Speisen im Restaurant seit 2026: 7 %, Getränke 19 %. Gemischte Rechnungen als zwei Belege erfassen.">
                      <select
                        id={`${b.id}-ust`}
                        value={b.ustSatz ?? 19}
                        onChange={(e) => updateBewirtung(b.id, { ustSatz: Number(e.target.value) === 7 ? 7 : 19 })}
                        className={selectCls}
                      >
                        <option value={7}>7 % (Speisen)</option>
                        <option value={19}>19 % (Getränke)</option>
                      </select>
                    </Field>
                    <Field label="Trinkgeld €" htmlFor={`${b.id}-tip`}>
                      <Input
                        id={`${b.id}-tip`}
                        type="number"
                        step="0.01"
                        value={b.trinkgeld || ""}
                        onChange={(e) => updateBewirtung(b.id, { trinkgeld: Math.max(0, Number(e.target.value) || 0) })}
                        className="tabular"
                      />
                    </Field>
                    <div className="space-y-1.5">
                      <p className="text-sm font-medium">Geschäftlich?</p>
                      <ChoiceGroup<boolean>
                        label="Geschäftlich"
                        value={b.bewirtetGeschaeftlich}
                        onChange={(v) => updateBewirtung(b.id, { bewirtetGeschaeftlich: v })}
                        options={[
                          { value: true, label: "Ja (70%)" },
                          { value: false, label: "Privat" },
                        ]}
                        className="[&>button]:flex-1 [&>button]:text-center"
                      />
                    </div>
                  </div>

                  <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-b-xl border-t border-border/70 bg-border/70 text-sm">
                    <Kennzahl label="Brutto gesamt" value={`${c.total.toFixed(2)} €`} />
                    <Kennzahl label={`Absetzbar (${c.anteil}% vom Netto)`} value={`${c.absetzbar.toFixed(2)} €`} strong />
                    <Kennzahl label="Vorsteuer (100%)" value={`${c.vorsteuer.toFixed(2)} €`} />
                  </dl>
                </article>
              );
            })}
            {bewirtungen.length === 0 && (
              <EmptyState
                icon={Receipt}
                title="Noch keine Bewirtungsbelege"
                description="Erfasse Geschäftsessen mit Gästen und Anlass. Das Tool zeigt dir den absetzbaren Anteil und die Vorsteuer."
                action={
                  <Button onClick={addBewirtung}>
                    <Plus aria-hidden="true" /> Beleg hinzufügen
                  </Button>
                }
              />
            )}
          </div>
        </ToolSection>
      )}

      {/* Tipps */}
      <ToolSection title="Wichtige Regeln" icon={BookOpen} className="mb-6">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 text-sm leading-relaxed text-muted-foreground md:grid-cols-2">
          <Regel titel="Verpflegungs-Pauschalen DE 2026">
            28 € ganzer Tag (≥24h Abwesenheit), 14 € halber Tag (8-24h), 0 € unter 8h.
          </Regel>
          <Regel titel="Auslands-Pauschalen">
            BMF-Schreiben listet 200+ Länder/Regionen. Tool zeigt 12 wichtigste — restliche manuell eintragen.
          </Regel>
          <Regel titel="Übernachtung">
            ENTWEDER Pauschale (DE 20 €/Nacht) ODER belegt — nicht beides. Belegt ist meist höher.
          </Regel>
          <Regel titel="Bewirtungs-70%-Regel">§4 Abs 5 Nr 2 EStG. Vorsteuer bleibt aber 100 % abziehbar.</Regel>
          <Regel titel="Bewirtungs-Pflichtangaben">
            Datum, Ort, Gäste (Name + Firma!), Anlass, alle Speisen + Getränke detailliert. Maschinell erstellter
            Quittung-Beleg + handschriftlicher Anlass auf der Rückseite.
          </Regel>
          <Regel titel="Trinkgeld">
            muss separat auf der Rechnung sein ODER via Quittung mit Bezug zur Hauptrechnung dokumentiert.
          </Regel>
          <Regel titel="Privat-Bewirtung">
            0 % absetzbar. Geburtstage, Hochzeiten — nicht versuchen hineinzuschmuggeln.
          </Regel>
          <Regel titel="Reisekosten-Belege 8 Jahre aufbewahren">(§147 Abs. 3 AO, Buchungsbelege seit BEG IV 2025; Bücher und Abschlüsse weiter 10 Jahre).</Regel>
        </ul>
        <Callout tone="info" className="mt-5" icon={Receipt}>
          OCR-Belege via Apps (Lexoffice, sevDesk) reduzieren manuelles Erfassen.
        </Callout>
      </ToolSection>

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

const Kennzahl = ({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) => (
  <div className="bg-card px-4 py-3">
    <dt className="text-xs text-muted-foreground">{label}</dt>
    <dd className={cn("mt-0.5 tabular", strong ? "font-semibold text-success" : "font-medium")}>{value}</dd>
  </div>
);

const Regel = ({ titel, children }: { titel: string; children: ReactNode }) => (
  <li className="flex gap-2.5">
    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" aria-hidden="true" />
    <span>
      <strong className="font-semibold text-foreground">{titel}:</strong> {children}
    </span>
  </li>
);

export default ReisekostenLogger;
