/**
 * RunwayRechner — "Wie lange reicht mein Geld — und werde ich vorher profitabel?"
 *
 * Universal-Tool für jeden Gründer: Cash + Kosten + Umsatz(-Wachstum) →
 * monatliche Simulation → Runway in Monaten, Cash-Tiefpunkt und die
 * Paul-Graham-Frage "Default Alive or Default Dead?" (erreicht der wachsende
 * Umsatz die Kosten, BEVOR das Geld ausgeht?).
 *
 * Anfänger-Fehler, die das Tool fixt:
 *  1. Runway statisch rechnen (Cash ÷ Burn) und Umsatz-Wachstum ignorieren
 *  2. Nicht wissen, ob man auf Profitabilität zuläuft oder auf die Wand
 *  3. Privatentnahme vergessen — der Gründer-Lohn ist auch Burn
 *  4. Zu spät reagieren: Kosten senkt man bei 12 Monaten Runway, nicht bei 3
 */
import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { NumberField } from "@/components/ui/number-field";
import { Label } from "@/components/ui/label";
import {
  Flame,
  Calculator,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  PiggyBank,
} from "lucide-react";

const MAX_MONATE = 60;

const RunwayRechner = () => {
  const [cash, setCash] = useState(20000);
  const [fixkostenMonat, setFixkostenMonat] = useState(1500);
  const [privatentnahmeMonat, setPrivatentnahmeMonat] = useState(1000);
  const [umsatzMonat, setUmsatzMonat] = useState(800);
  const [margeProzent, setMargeProzent] = useState(80);
  const [wachstumProzent, setWachstumProzent] = useState(8);

  const calc = useMemo(() => {
    const kosten = fixkostenMonat + privatentnahmeMonat;
    const marge = margeProzent / 100;
    const wachstum = wachstumProzent / 100;

    let bestand = cash;
    let umsatz = umsatzMonat;
    let runwayMonate: number | null = null; // Monat, in dem Cash < 0 fällt
    let profitabelMonat: number | null = null; // Monat, ab dem Deckungsbeitrag >= Kosten
    let tiefpunkt = cash;
    let tiefpunktMonat = 0;
    const verlauf: { monat: number; umsatz: number; saldo: number; bestand: number }[] = [];

    for (let m = 1; m <= MAX_MONATE; m++) {
      const deckungsbeitrag = umsatz * marge;
      const saldo = deckungsbeitrag - kosten;
      bestand += saldo;
      if (profitabelMonat === null && saldo >= 0) profitabelMonat = m;
      if (bestand < tiefpunkt) {
        tiefpunkt = bestand;
        tiefpunktMonat = m;
      }
      if (runwayMonate === null && bestand < 0) runwayMonate = m;
      if (m <= 12 || m % 6 === 0) verlauf.push({ monat: m, umsatz, saldo, bestand });
      if (runwayMonate !== null && m >= runwayMonate + 2) break; // kurz nach dem Aus abbrechen
      umsatz = umsatz * (1 + wachstum);
    }

    const burnHeute = kosten - umsatzMonat * marge;
    // Default Alive: Profitabilität wird erreicht, bevor das Geld ausgeht
    const defaultAlive = profitabelMonat !== null && (runwayMonate === null || profitabelMonat < runwayMonate);

    // Cash-0-Datum (nur wenn das Geld ausgeht)
    let cashEndeDatum: string | null = null;
    if (runwayMonate !== null) {
      const d = new Date();
      d.setMonth(d.getMonth() + runwayMonate);
      cashEndeDatum = d.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
    }

    return { kosten, burnHeute, runwayMonate, profitabelMonat, defaultAlive, tiefpunkt, tiefpunktMonat, verlauf, cashEndeDatum };
  }, [cash, fixkostenMonat, privatentnahmeMonat, umsatzMonat, margeProzent, wachstumProzent]);

  const eur = (n: number) => Math.round(n).toLocaleString("de-DE");

  const kritisch = calc.runwayMonate !== null && calc.runwayMonate <= 6 && !calc.defaultAlive;

  return (
    <CockpitShell
      eyebrow="📊 Buchhaltung & Reporting"
      title="Runway- & Burn-Rate-Rechner"
      subtitle="Die wichtigste Zahl jedes jungen Unternehmens: Wie viele Monate reicht das Geld — und wird der wachsende Umsatz die Kosten einholen, BEVOR es ausgeht? (Paul Graham: „Default Alive or Default Dead?“)"
    >
      {/* === 1. Cash & Kosten === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <PiggyBank className="h-4 w-4 text-accent-blue" /> 1. Cash &amp; monatliche Kosten
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Kontostand heute (€)</Label>
            <NumberField value={cash} onChange={setCash} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Geschäftskonto + fest fürs Business reserviertes Geld</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Fixkosten / Monat (€)</Label>
            <NumberField value={fixkostenMonat} onChange={setFixkostenMonat} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Software, Server, Miete, Versicherungen, StB, Ads-Grundbudget</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Privatentnahme / Gehalt / Monat (€)</Label>
            <NumberField value={privatentnahmeMonat} onChange={setPrivatentnahmeMonat} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Dein Lebensunterhalt ist auch Burn — ehrlich eintragen (0 wenn nebenberuflich)</div>
          </div>
        </div>
      </div>

      {/* === 2. Umsatz === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent-blue" /> 2. Umsatz &amp; Wachstum
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Umsatz / Monat aktuell (€ netto)</Label>
            <NumberField value={umsatzMonat} onChange={setUmsatzMonat} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Ohne USt. 0 wenn noch vor Launch</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Deckungsbeitrag / Marge (%)</Label>
            <NumberField value={margeProzent} onChange={setMargeProzent} min={0} max={100} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">SaaS/Apps/Dienstleistung 80–95 % · E-Com nach Wareneinsatz+Versand oft 25–45 %</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Umsatz-Wachstum / Monat (%)</Label>
            <NumberField step="0.5" value={wachstumProzent} onChange={setWachstumProzent} min={0} max={100} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Ehrlich schätzen: 5–10 %/Mon ist für Bootstrapper schon stark</div>
          </div>
        </div>
      </div>

      {/* === Ergebnis-Hero === */}
      <div
        className={`rounded-2xl border-2 p-5 mb-6 ${
          kritisch
            ? "border-red-500/40 bg-red-500/5"
            : calc.defaultAlive
              ? "border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card"
              : "border-amber-500/40 bg-amber-500/5"
        }`}
      >
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Dein Runway</div>
        <div className="flex items-baseline gap-3 flex-wrap mb-3">
          <div className={`text-5xl font-bold ${kritisch ? "text-red-700" : calc.defaultAlive ? "text-emerald-700" : "text-amber-700"}`}>
            {calc.runwayMonate === null ? "60+" : calc.runwayMonate} Monate
          </div>
          {calc.cashEndeDatum && (
            <div className="text-lg text-muted-foreground">Cash reicht bis ~{calc.cashEndeDatum}</div>
          )}
          {calc.runwayMonate === null && (
            <div className="text-lg text-muted-foreground">das Geld geht in der Simulation nicht aus 🎉</div>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-3">
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">Netto-Burn heute</div>
            <div className={`font-mono text-base font-semibold ${calc.burnHeute > 0 ? "text-red-700" : "text-emerald-700"}`}>
              {calc.burnHeute > 0 ? `−${eur(calc.burnHeute)}` : `+${eur(-calc.burnHeute)}`} €/Mon
            </div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">Profitabel ab</div>
            <div className="font-mono text-base font-semibold">
              {calc.profitabelMonat === null ? "> 60 Mon" : calc.profitabelMonat === 1 ? "jetzt" : `Monat ${calc.profitabelMonat}`}
            </div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">Cash-Tiefpunkt</div>
            <div className="font-mono text-base font-semibold">
              {eur(calc.tiefpunkt)} € {calc.tiefpunktMonat > 0 && <span className="text-[10px] text-muted-foreground">(Mon {calc.tiefpunktMonat})</span>}
            </div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">Status</div>
            <div className={`font-semibold text-base ${calc.defaultAlive ? "text-emerald-700" : "text-red-700"}`}>
              {calc.defaultAlive ? "Default Alive ✅" : "Default Dead ⚠️"}
            </div>
          </div>
        </div>

        {kritisch && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/40 p-3 text-xs leading-relaxed flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-900">⚠ Unter 6 Monate Runway ohne Kurs auf Profitabilität — Alarmstufe.</strong>{" "}
              Jetzt handeln, nicht in Monat 5: Kosten radikal kürzen (jedes Abo/Tool hinterfragen), Privatentnahme
              senken oder Nebeneinkommen aufbauen, Umsatz-Quick-Wins (Preise rauf, Jahresvorauszahlung mit Rabatt,
              Bestandskunden nachfassen). Fundraising/Kredit dauert 3–6 Monate — mit 2 Monaten Runway verhandelst du
              aus Schwäche.
            </div>
          </div>
        )}
        {calc.defaultAlive && (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/40 p-3 text-xs">
            ✅ <strong>Default Alive:</strong> Mit den aktuellen Annahmen erreichst du Profitabilität
            {calc.profitabelMonat !== null && calc.profitabelMonat > 1 && <> in Monat {calc.profitabelMonat}</>}, bevor das
            Geld ausgeht (Tiefpunkt: {eur(calc.tiefpunkt)} €). Das Wachstum ist deine Lebensader — schütze es, bevor du
            neue Fixkosten aufbaust.
          </div>
        )}
        {!calc.defaultAlive && !kritisch && (
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/40 p-3 text-xs leading-relaxed">
            <strong>💡 Default Dead, aber noch Zeit:</strong> Mit aktuellem Wachstum wird der Umsatz die Kosten nicht
            rechtzeitig einholen. Du hast {calc.runwayMonate ?? "60+"} Monate, um das zu ändern — jeder Monat früher
            gehandelt zählt doppelt: Wachstum beschleunigen ODER Burn senken. Rechne beide Hebel oben durch (z.B.
            Fixkosten −20 %, Wachstum +2 Punkte) und schau, was den Status kippt.
          </div>
        )}
      </div>

      {/* === Verlaufs-Tabelle === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Flame className="h-4 w-4 text-accent-blue" /> Cash-Verlauf (Simulation)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="py-1.5 pr-3">Monat</th>
                <th className="py-1.5 pr-3">Umsatz</th>
                <th className="py-1.5 pr-3">Monats-Saldo</th>
                <th className="py-1.5">Kontostand</th>
              </tr>
            </thead>
            <tbody>
              {calc.verlauf.map((v) => (
                <tr key={v.monat} className="border-b border-border/50">
                  <td className="py-1.5 pr-3 font-mono">{v.monat}</td>
                  <td className="py-1.5 pr-3 font-mono">{eur(v.umsatz)} €</td>
                  <td className={`py-1.5 pr-3 font-mono ${v.saldo >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                    {v.saldo >= 0 ? "+" : ""}{eur(v.saldo)} €
                  </td>
                  <td className={`py-1.5 font-mono ${v.bestand >= 0 ? "" : "text-red-700 font-bold"}`}>
                    {eur(v.bestand)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-[10px] text-muted-foreground mt-2">
          Annahme: Umsatz wächst {wachstumProzent} %/Monat, Kosten bleiben konstant. Steuern auf Gewinne sind nicht
          abgezogen — ab Profitabilität ~30 % Rücklage einplanen.
        </div>
      </div>

      {/* === Faustregeln === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-accent-blue" /> Faustregeln für Gründer
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="rounded-lg bg-emerald-500/5 p-3 border border-emerald-500/20">
            <strong className="text-emerald-700 block mb-1">✅ 12+ Monate Runway</strong>
            <div className="text-muted-foreground">Komfortzone: Du kannst in Wachstum investieren und Experimente fahren, die erst in Monaten zahlen.</div>
          </div>
          <div className="rounded-lg bg-amber-500/5 p-3 border border-amber-500/20">
            <strong className="text-amber-700 block mb-1">⚠️ 6–12 Monate</strong>
            <div className="text-muted-foreground">Fokus-Modus: Nur noch Maßnahmen mit Umsatz-Wirkung in &lt; 90 Tagen. Neue Fixkosten: Stopp.</div>
          </div>
          <div className="rounded-lg bg-red-500/5 p-3 border border-red-500/20">
            <strong className="text-red-700 block mb-1">🚨 &lt; 6 Monate</strong>
            <div className="text-muted-foreground">Überlebens-Modus: Kosten sofort kürzen, Einnahmen vorziehen, ggf. nebenher Cashflow-Quelle aufbauen.</div>
          </div>
        </div>
      </div>

      {/* === Glossar === */}
      <details className="rounded-2xl border border-border bg-card p-5 mb-6">
        <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-accent-blue" /> Glossar — Begriffe einfach erklärt
        </summary>
        <div className="mt-3 space-y-3 text-xs leading-relaxed">
          {[
            { begriff: "Burn-Rate", erklaerung: "Wie viel Cash du pro Monat netto verlierst: alle Kosten (inkl. deiner Privatentnahme!) minus Deckungsbeitrag aus Umsatz. Bei 2.500 € Kosten und 640 € Deckungsbeitrag: 1.860 € Burn/Monat." },
            { begriff: "Runway", erklaerung: "Wie viele Monate dein Cash bei aktuellem Kurs reicht. Nicht statisch (Cash ÷ Burn), sondern simuliert — wachsender Umsatz verlängert den Runway jeden Monat." },
            { begriff: "Default Alive / Default Dead", erklaerung: "Paul Grahams Frage an jedes Startup: Erreichst du mit aktuellem Wachstum Profitabilität, BEVOR das Geld ausgeht? Ja = Default Alive (du brauchst niemanden). Nein = Default Dead (du bist auf externes Geld oder eine Kurskorrektur angewiesen — je früher du das weißt, desto mehr Optionen hast du)." },
            { begriff: "Deckungsbeitrag / Marge", erklaerung: "Was vom Umsatz nach direkten Kosten übrig bleibt (Wareneinsatz, Versand, Payment-Fees, Store-Provision). SaaS/Apps: 80–95 %. E-Commerce: oft nur 25–45 % — deshalb fühlt sich E-Com-Umsatz größer an, als er ist." },
            { begriff: "Cash-Tiefpunkt", erklaerung: "Der niedrigste Kontostand der Simulation. Auch wer am Ende profitabel wird, kann vorher durch ein Tal müssen — der Tiefpunkt zeigt, wie viel Puffer du wirklich brauchst." },
          ].map((g) => (
            <div key={g.begriff} className="rounded-lg bg-secondary/30 p-3">
              <div className="font-semibold text-foreground mb-1">{g.begriff}</div>
              <div className="text-muted-foreground">{g.erklaerung}</div>
            </div>
          ))}
        </div>
      </details>

      <Stand2026Footer
        sources={[
          { label: "Paul Graham: Default Alive or Default Dead?", url: "https://paulgraham.com/aord.html" },
        ]}
        note="Modell-Rechnung mit konstanten Kosten und konstanter Wachstumsrate — reale Geschäfte sind saisonal und sprunghaft. Für die Bank-taugliche Sicht mit echten Zahlen: BWA-Generator im Cockpit."
      />
    </CockpitShell>
  );
};

export default RunwayRechner;
