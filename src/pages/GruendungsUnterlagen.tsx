import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Plus, Trash2 } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { eur } from "@/components/cockpit/AmpelCheck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { baueFinanzplanPdf } from "@/lib/finanzplanPdf";
import { BEISPIEL, rechneFinanzplan, summe, type FinanzplanEingabe, type Posten } from "@/lib/finanzplan";

const SPEICHER = "gx-gruendungsunterlagen-v1";
const ladeEntwurf = (): FinanzplanEingabe => {
  try {
    const roh = localStorage.getItem(SPEICHER);
    return roh ? { ...BEISPIEL, ...JSON.parse(roh) } : BEISPIEL;
  } catch {
    return BEISPIEL;
  }
};

const num = (v: string) => (v.trim() === "" ? 0 : Number(v.replace(",", ".")) || 0);
const tsd = (n: number) => Math.round(n).toLocaleString("de-DE");

const PostenListe = ({ titel, hinweis, posten, setze }: { titel: string; hinweis?: string; posten: Posten[]; setze: (p: Posten[]) => void }) => (
  <div>
    <div className="flex items-baseline justify-between mb-1">
      <Label className="text-xs font-semibold">{titel}</Label>
      <span className="text-xs text-muted-foreground">Summe {eur(summe(posten))}</span>
    </div>
    {hinweis && <p className="text-[11px] text-muted-foreground mb-1">{hinweis}</p>}
    <div className="space-y-1.5">
      {posten.map((p, i) => (
        <div key={i} className="flex gap-1.5">
          <Input value={p.name} onChange={(e) => setze(posten.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} className="h-9 text-sm" />
          <Input
            type="number"
            value={p.betrag}
            onChange={(e) => setze(posten.map((x, j) => (j === i ? { ...x, betrag: num(e.target.value) } : x)))}
            className="h-9 w-28 text-sm text-right"
          />
          <button type="button" aria-label="Posten entfernen" onClick={() => setze(posten.filter((_, j) => j !== i))} className="px-2 text-muted-foreground hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => setze([...posten, { name: "", betrag: 0 }])} className="text-xs text-accent-blue inline-flex items-center gap-1 hover:underline">
        <Plus className="h-3 w-3" /> Posten hinzufügen
      </button>
    </div>
  </div>
);

const Zahl = ({ label, wert, setze, hilfe, schritt }: { label: string; wert: number; setze: (n: number) => void; hilfe?: string; schritt?: number }) => (
  <div>
    <Label className="text-xs">{label}</Label>
    <Input type="number" step={schritt} value={wert} onChange={(e) => setze(num(e.target.value))} className="mt-1 h-9" />
    {hilfe && <p className="text-[11px] text-muted-foreground mt-0.5">{hilfe}</p>}
  </div>
);

const GruendungsUnterlagen = () => {
  const [e, setE] = useState<FinanzplanEingabe>(ladeEntwurf);
  const [vorhaben, setVorhaben] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem(SPEICHER, JSON.stringify(e));
    } catch {
      /* privater Modus – dann eben ohne Zwischenspeicher */
    }
  }, [e]);
  const f = useMemo(() => rechneFinanzplan(e), [e]);
  const set = <K extends keyof FinanzplanEingabe>(k: K, v: FinanzplanEingabe[K]) => setE((x) => ({ ...x, [k]: v }));

  const pdf = () => baueFinanzplanPdf(e, f, name, vorhaben).save("finanzplan-gruendung.pdf");

  const signalFarbe = { ok: "text-emerald-700", warnung: "text-amber-700", kritisch: "text-red-700" };

  return (
    <CockpitShell
      eyebrow="Gründungsunterlagen · Gründungszuschuss, Einstiegsgeld, Bank"
      title="Finanzplan-Generator: Kapitalbedarf, Rentabilität & Liquidität"
      subtitle="Genau die Zahlen, die IHK, Arbeitsagentur, Jobcenter und Bank sehen wollen: Kapitalbedarf, Finanzierung, Rentabilitätsvorschau über 3 Jahre, Liquiditätsplan über 12 Monate und deine Lebenshaltungskosten – mit Tragfähigkeits-Ampel und PDF."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 mb-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Dein Name (fürs PDF)</Label>
              <Input value={name} onChange={(ev) => setName(ev.target.value)} className="mt-1 h-9" />
            </div>
            <div>
              <Label className="text-xs">Vorhaben in einem Satz</Label>
              <Input value={vorhaben} onChange={(ev) => setVorhaben(ev.target.value)} placeholder="z. B. Webdesign-Agentur für Handwerksbetriebe" className="mt-1 h-9" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <h2 className="font-bold">1. Kapitalbedarf & Finanzierung</h2>
            <PostenListe titel="Investitionen" hinweis="Dinge, die länger als ein Jahr halten – werden abgeschrieben." posten={e.investitionen} setze={(p) => set("investitionen", p)} />
            <PostenListe titel="Gründungskosten" hinweis="Einmalig: Anmeldung, Beratung, Website, Erstausstattung Marketing." posten={e.gruendungskosten} setze={(p) => set("gruendungskosten", p)} />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Zahl label="Liquiditätsreserve" wert={e.reserve} setze={(n) => set("reserve", n)} hilfe="Puffer für die Anlaufzeit" />
              <Zahl label="Nutzungsdauer Investitionen (Jahre)" wert={e.nutzungsdauerJahre} setze={(n) => set("nutzungsdauerJahre", n)} />
              <Zahl label="Eigenkapital" wert={e.eigenkapital} setze={(n) => set("eigenkapital", n)} />
              <Zahl label="Darlehen" wert={e.darlehen.betrag} setze={(n) => set("darlehen", { ...e.darlehen, betrag: n })} hilfe="z. B. KfW-Startgeld" />
              <Zahl label="Zins % p. a." schritt={0.1} wert={e.darlehen.zinsProzent} setze={(n) => set("darlehen", { ...e.darlehen, zinsProzent: n })} />
              <Zahl label="Laufzeit (Jahre)" wert={e.darlehen.laufzeitJahre} setze={(n) => set("darlehen", { ...e.darlehen, laufzeitJahre: n })} />
              <Zahl label="tilgungsfrei (Monate)" wert={e.darlehen.tilgungsfreiMonate} setze={(n) => set("darlehen", { ...e.darlehen, tilgungsfreiMonate: n })} />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <h2 className="font-bold">2. Umsatz & Kosten</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Zahl label="Umsatz Monat 1 (netto)" wert={e.umsatzMonat1} setze={(n) => set("umsatzMonat1", n)} />
              <Zahl label="Wachstum % pro Monat (Jahr 1)" schritt={0.5} wert={e.wachstumMonatProzent} setze={(n) => set("wachstumMonatProzent", n)} />
              <Zahl label="Wareneinsatz % vom Umsatz" wert={e.wareneinsatzProzent} setze={(n) => set("wareneinsatzProzent", n)} />
              <Zahl label="Wachstum Jahr 2 (%)" wert={e.wachstumJahr2Prozent} setze={(n) => set("wachstumJahr2Prozent", n)} />
              <Zahl label="Wachstum Jahr 3 (%)" wert={e.wachstumJahr3Prozent} setze={(n) => set("wachstumJahr3Prozent", n)} />
              <Zahl label="Personal € / Monat" wert={e.personalMonat} setze={(n) => set("personalMonat", n)} />
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={e.zahlungszielEinMonat} onChange={(ev) => set("zahlungszielEinMonat", ev.target.checked)} />
              Kunden zahlen erst einen Monat später (Rechnung mit Zahlungsziel)
            </label>
            <PostenListe titel="Laufende Betriebskosten pro Monat" posten={e.kosten} setze={(p) => set("kosten", p)} />
            <Zahl label="Kostensteigerung pro Jahr (%)" wert={e.kostenSteigerungProzent} setze={(n) => set("kostenSteigerungProzent", n)} />
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <h2 className="font-bold">3. Privat & Förderung</h2>
            <PostenListe titel="Private Lebenshaltungskosten pro Monat" hinweis="Verlangen viele IHKs für die Tragfähigkeitsbescheinigung." posten={e.privat} setze={(p) => set("privat", p)} />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Zahl label="Andere Einkünfte im Haushalt / Monat" wert={e.andereEinkuenfteMonat} setze={(n) => set("andereEinkuenfteMonat", n)} />
              <Zahl label="Zuschuss / Monat" wert={e.zuschussMonatlich} setze={(n) => set("zuschussMonatlich", n)} hilfe="GZ Phase 1: ALG I + 300 €" />
              <Zahl label="Zuschuss-Monate" wert={e.zuschussMonate} setze={(n) => set("zuschussMonate", n)} />
              <Zahl label="Steuerrücklage % vom Gewinn" wert={e.steuerruecklageProzent} setze={(n) => set("steuerruecklageProzent", n)} />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Höhe ausrechnen: <Link to="/cockpit/gruendungszuschuss" className="text-accent-blue hover:underline">Gründungszuschuss</Link> ·{" "}
              <Link to="/cockpit/einstiegsgeld" className="text-accent-blue hover:underline">Einstiegsgeld</Link>
            </p>
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-4 self-start">
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
            <h2 className="font-bold mb-3">Tragfähigkeit</h2>
            <ul className="space-y-2 text-xs">
              {f.signale.map((s, i) => (
                <li key={i} className={signalFarbe[s.stufe]}>
                  {s.stufe === "ok" ? "✅" : s.stufe === "warnung" ? "⚠️" : "⛔"} {s.text}
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between"><span>Kapitalbedarf</span><strong>{eur(f.kapitalbedarf.summe)}</strong></div>
              <div className="flex justify-between"><span>Finanzierung</span><strong>{eur(f.finanzierung.summe)}</strong></div>
              <div className="flex justify-between"><span>Mindestumsatz / Monat</span><strong>{eur(f.mindestumsatzMonat)}</strong></div>
              {f.rentabilitaet.map((r) => (
                <div key={r.jahr} className="flex justify-between">
                  <span>Gewinn Jahr {r.jahr}</span>
                  <strong className={r.gewinn < 0 ? "text-red-700" : ""}>{eur(r.gewinn)}</strong>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" onClick={pdf}>
              <Download className="h-4 w-4 mr-2" /> Finanzplan als PDF
            </Button>
            <button type="button" className="text-[11px] text-muted-foreground hover:underline mt-2" onClick={() => setE(BEISPIEL)}>
              Auf Beispielwerte zurücksetzen
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 mb-6 overflow-x-auto">
        <h2 className="font-bold mb-3">Liquiditätsplan – 12 Monate</h2>
        <table className="w-full text-xs min-w-[760px]">
          <thead>
            <tr className="text-muted-foreground">
              <th className="text-left font-medium py-1">€</th>
              {f.liquiditaet.map((m) => (
                <th key={m.monat} className="text-right font-medium">M{m.monat}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(
              [
                ["Einnahmen", (m) => m.einUmsatz + m.einZuschuss + m.einKapital],
                ["Ausgaben", (m) => m.ausInvest + m.ausWare + m.ausKosten + m.ausPersonal + m.ausZinsTilgung + m.ausPrivat],
                ["Saldo", (m) => m.saldo],
                ["Kontostand", (m) => m.bestand],
              ] as [string, (m: (typeof f.liquiditaet)[number]) => number][]
            ).map(([label, wert]) => (
              <tr key={label} className="border-t border-border">
                <td className="py-1 font-medium">{label}</td>
                {f.liquiditaet.map((m) => (
                  <td key={m.monat} className={`text-right ${label === "Kontostand" && m.bestand < 0 ? "text-red-700 font-semibold" : ""}`}>
                    {tsd(wert(m))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        Planrechnung, netto ohne Umsatzsteuer. Prüfer achten vor allem darauf, dass Umsätze begründet sind (Anfragen,
        Vorverträge, Preise × Kunden) und die Liquidität nie ins Minus rutscht. Deine Eingaben bleiben nur in diesem Browser
        gespeichert. Für die Gliederung des Textteils:{" "}
        <Link to="/businessplan-erstellen" className="text-accent-blue hover:underline">Businessplan-Generator</Link>.
      </div>
    </CockpitShell>
  );
};

export default GruendungsUnterlagen;
