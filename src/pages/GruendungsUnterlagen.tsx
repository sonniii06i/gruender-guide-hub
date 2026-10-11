import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CalendarRange, CheckCircle2, Download, FileText, Home, Plus, Trash2, TrendingUp, Wallet, XCircle } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { eur } from "@/components/cockpit/AmpelCheck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Callout, Field, KitTable, ResultPanel, ToolLayout, ToolSection } from "@/components/cockpit/kit";
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
  <div className="rounded-xl border border-border/80 bg-background/60 p-4">
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <p className="text-sm font-medium text-foreground">{titel}</p>
      <span className="text-xs text-muted-foreground">
        Summe <span className="font-semibold text-foreground tabular">{eur(summe(posten))}</span>
      </span>
    </div>
    {hinweis && <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{hinweis}</p>}
    <div className="mt-3 space-y-2">
      {posten.map((p, i) => (
        <div key={i} className="flex gap-2">
          <Input
            aria-label={`${titel}: Bezeichnung ${i + 1}`}
            value={p.name}
            onChange={(e) => setze(posten.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
            className="h-9 min-w-0 text-sm"
          />
          <Input
            aria-label={`${titel}: Betrag ${i + 1} in Euro`}
            type="number"
            value={p.betrag}
            onChange={(e) => setze(posten.map((x, j) => (j === i ? { ...x, betrag: num(e.target.value) } : x)))}
            className="h-9 w-28 shrink-0 text-right text-sm tabular"
          />
          <button
            type="button"
            aria-label="Posten entfernen"
            onClick={() => setze(posten.filter((_, j) => j !== i))}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-danger-soft hover:text-danger"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setze([...posten, { name: "", betrag: 0 }])}
        className="inline-flex items-center gap-1 rounded-md px-1 py-1 text-sm font-medium text-accent-blue hover:underline"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Posten hinzufügen
      </button>
    </div>
  </div>
);

const Zahl = ({ label, wert, setze, hilfe, schritt }: { label: string; wert: number; setze: (n: number) => void; hilfe?: string; schritt?: number }) => (
  <Field label={label} hint={hilfe}>
    <Input aria-label={label} type="number" step={schritt} value={wert} onChange={(e) => setze(num(e.target.value))} className="h-10 tabular" />
  </Field>
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

  const SIGNAL = {
    ok: { Icon: CheckCircle2, cls: "text-success" },
    warnung: { Icon: AlertTriangle, cls: "text-warning" },
    kritisch: { Icon: XCircle, cls: "text-danger" },
  } as const;

  return (
    <CockpitShell
      eyebrow="Gründungsunterlagen · Gründungszuschuss, Einstiegsgeld, Bank"
      title="Finanzplan-Generator: Kapitalbedarf, Rentabilität & Liquidität"
      subtitle="Genau die Zahlen, die IHK, Arbeitsagentur, Jobcenter und Bank sehen wollen: Kapitalbedarf, Finanzierung, Rentabilitätsvorschau über 3 Jahre, Liquiditätsplan über 12 Monate und deine Lebenshaltungskosten, mit Tragfähigkeits-Ampel und PDF."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection icon={FileText} title="Für das PDF" description="Erscheint auf dem Deckblatt deines Finanzplans.">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Dein Name" htmlFor="fp-name">
                  <Input id="fp-name" value={name} onChange={(ev) => setName(ev.target.value)} />
                </Field>
                <Field label="Vorhaben in einem Satz" htmlFor="fp-vorhaben">
                  <Input id="fp-vorhaben" value={vorhaben} onChange={(ev) => setVorhaben(ev.target.value)} placeholder="z. B. Webdesign-Agentur für Handwerksbetriebe" />
                </Field>
              </div>
            </ToolSection>

            <ToolSection icon={Wallet} title="Kapitalbedarf & Finanzierung" description="Was du einmalig brauchst und woher das Geld kommt.">
              <div className="space-y-4">
                <PostenListe titel="Investitionen" hinweis="Dinge, die länger als ein Jahr halten, werden abgeschrieben." posten={e.investitionen} setze={(p) => set("investitionen", p)} />
                <PostenListe titel="Gründungskosten" hinweis="Einmalig: Anmeldung, Beratung, Website, Erstausstattung Marketing." posten={e.gruendungskosten} setze={(p) => set("gruendungskosten", p)} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Zahl label="Liquiditätsreserve" wert={e.reserve} setze={(n) => set("reserve", n)} hilfe="Puffer für die Anlaufzeit" />
                  <Zahl label="Nutzungsdauer Investitionen (Jahre)" wert={e.nutzungsdauerJahre} setze={(n) => set("nutzungsdauerJahre", n)} />
                  <Zahl label="Eigenkapital" wert={e.eigenkapital} setze={(n) => set("eigenkapital", n)} />
                  <Zahl label="Darlehen" wert={e.darlehen.betrag} setze={(n) => set("darlehen", { ...e.darlehen, betrag: n })} hilfe="z. B. KfW-Startgeld" />
                  <Zahl label="Zins % p. a." schritt={0.1} wert={e.darlehen.zinsProzent} setze={(n) => set("darlehen", { ...e.darlehen, zinsProzent: n })} />
                  <Zahl label="Laufzeit (Jahre)" wert={e.darlehen.laufzeitJahre} setze={(n) => set("darlehen", { ...e.darlehen, laufzeitJahre: n })} />
                  <Zahl label="Tilgungsfrei (Monate)" wert={e.darlehen.tilgungsfreiMonate} setze={(n) => set("darlehen", { ...e.darlehen, tilgungsfreiMonate: n })} />
                </div>
              </div>
            </ToolSection>

            <ToolSection icon={TrendingUp} title="Umsatz & Kosten" description="Netto, ohne Umsatzsteuer.">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Zahl label="Umsatz Monat 1 (netto)" wert={e.umsatzMonat1} setze={(n) => set("umsatzMonat1", n)} />
                  <Zahl label="Wachstum % pro Monat (Jahr 1)" schritt={0.5} wert={e.wachstumMonatProzent} setze={(n) => set("wachstumMonatProzent", n)} />
                  <Zahl label="Wareneinsatz % vom Umsatz" wert={e.wareneinsatzProzent} setze={(n) => set("wareneinsatzProzent", n)} />
                  <Zahl label="Personal € / Monat" wert={e.personalMonat} setze={(n) => set("personalMonat", n)} />
                  <Zahl label="Wachstum Jahr 2 (%)" wert={e.wachstumJahr2Prozent} setze={(n) => set("wachstumJahr2Prozent", n)} />
                  <Zahl label="Wachstum Jahr 3 (%)" wert={e.wachstumJahr3Prozent} setze={(n) => set("wachstumJahr3Prozent", n)} />
                </div>
                <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" checked={e.zahlungszielEinMonat} onChange={(ev) => set("zahlungszielEinMonat", ev.target.checked)} />
                  Kunden zahlen erst einen Monat später (Rechnung mit Zahlungsziel)
                </label>
                <PostenListe titel="Laufende Betriebskosten pro Monat" posten={e.kosten} setze={(p) => set("kosten", p)} />
                <Zahl label="Kostensteigerung pro Jahr (%)" wert={e.kostenSteigerungProzent} setze={(n) => set("kostenSteigerungProzent", n)} />
              </div>
            </ToolSection>

            <ToolSection icon={Home} title="Privat & Förderung" description="Verlangen viele IHKs für die Tragfähigkeitsbescheinigung.">
              <div className="space-y-4">
                <PostenListe titel="Private Lebenshaltungskosten pro Monat" posten={e.privat} setze={(p) => set("privat", p)} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Zahl label="Andere Einkünfte im Haushalt / Monat" wert={e.andereEinkuenfteMonat} setze={(n) => set("andereEinkuenfteMonat", n)} />
                  <Zahl label="Zuschuss / Monat" wert={e.zuschussMonatlich} setze={(n) => set("zuschussMonatlich", n)} hilfe="GZ Phase 1: ALG I + 300 €" />
                  <Zahl label="Zuschuss-Monate" wert={e.zuschussMonate} setze={(n) => set("zuschussMonate", n)} />
                  <Zahl label="Steuerrücklage % vom Gewinn" wert={e.steuerruecklageProzent} setze={(n) => set("steuerruecklageProzent", n)} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Höhe ausrechnen: <Link to="/cockpit/gruendungszuschuss" className="text-accent-blue hover:underline">Gründungszuschuss</Link>,{" "}
                  <Link to="/cockpit/einstiegsgeld" className="text-accent-blue hover:underline">Einstiegsgeld</Link>
                </p>
              </div>
            </ToolSection>
          </>
        }
        result={
          <ResultPanel
            variant="ink"
            kicker="Tragfähigkeit"
            title="Mindestumsatz pro Monat"
            value={eur(f.mindestumsatzMonat)}
            valueHint="So viel Umsatz brauchst du, damit Kosten, Privatentnahme und Rücklage gedeckt sind."
          >
            <ul className="space-y-2.5 text-sm">
              {f.signale.map((sig, i) => {
                const S = SIGNAL[sig.stufe];
                return (
                  <li key={i} className="flex gap-2.5">
                    <S.Icon className={`mt-0.5 h-4 w-4 shrink-0 ${S.cls === "text-success" ? "text-brand-green-glow" : S.cls === "text-warning" ? "text-amber-300" : "text-red-300"}`} aria-hidden="true" />
                    <span>{sig.text}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 divide-y divide-white/10 border-t border-white/10 text-sm">
              <div className="flex justify-between py-2.5"><span>Kapitalbedarf</span><span className="font-medium tabular">{eur(f.kapitalbedarf.summe)}</span></div>
              <div className="flex justify-between py-2.5"><span>Finanzierung</span><span className="font-medium tabular">{eur(f.finanzierung.summe)}</span></div>
              {f.rentabilitaet.map((r) => (
                <div key={r.jahr} className="flex justify-between py-2.5">
                  <span>Gewinn Jahr {r.jahr}</span>
                  <span className={`font-medium tabular ${r.gewinn < 0 ? "text-red-300" : ""}`}>{eur(r.gewinn)}</span>
                </div>
              ))}
            </div>
            <Button className="mt-5 h-11 w-full rounded-xl bg-card font-semibold text-primary shadow-none hover:bg-card/90" onClick={pdf}>
              <Download className="mr-1 h-4 w-4" /> Finanzplan als PDF
            </Button>
            <button type="button" className="mt-3 text-xs text-primary-foreground/70 underline-offset-2 hover:underline" onClick={() => setE(BEISPIEL)}>
              Auf Beispielwerte zurücksetzen
            </button>
          </ResultPanel>
        }
      />

      <ToolSection icon={CalendarRange} title="Liquiditätsplan – 12 Monate" description="Beträge in Euro. Rot markiert: Monate mit negativem Kontostand." className="mb-6">
        <KitTable caption="Liquiditätsplan über 12 Monate" className="[&_table]:min-w-[760px] [&_table]:text-xs">
          <thead>
            <tr>
              <th>€</th>
              {f.liquiditaet.map((m) => (
                <th key={m.monat} className="!text-right">M{m.monat}</th>
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
              <tr key={label} className={label === "Kontostand" ? "font-semibold" : ""}>
                <td className="font-medium">{label}</td>
                {f.liquiditaet.map((m) => (
                  <td key={m.monat} className={`text-right ${label === "Kontostand" && m.bestand < 0 ? "bg-danger-soft text-danger" : ""}`}>
                    {tsd(wert(m))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </KitTable>
      </ToolSection>

      <Callout tone="neutral" title="So prüfen IHK, Agentur und Bank">
        Planrechnung, netto ohne Umsatzsteuer. Prüfer achten vor allem darauf, dass Umsätze begründet sind (Anfragen,
        Vorverträge, Preise × Kunden) und die Liquidität nie ins Minus rutscht. Deine Eingaben bleiben nur in diesem Browser
        gespeichert. Für die Gliederung des Textteils:{" "}
        <Link to="/businessplan-erstellen" className="text-accent-blue hover:underline">Businessplan-Generator</Link>.
      </Callout>
    </CockpitShell>
  );
};

export default GruendungsUnterlagen;
