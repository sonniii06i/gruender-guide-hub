/**
 * AppUmsatzRechner — "Was bleibt von meinem App-Preis wirklich übrig?"
 *
 * Companion-Tool zum Guide "Eigene App entwickeln & launchen".
 *
 * Rechnet den kompletten Weg vom Store-Preis zum Gewinn:
 *  Endkundenpreis → USt raus (Stores führen sie als Kommissionär ab)
 *  → Store-Provision (15 % Small Business / 30 % Standard)
 *  → dein Netto-Erlös pro Zahler
 *  → mit Downloads × Conversion × Churn: MRR, LTV, Break-even gegen Dev-Kosten.
 *
 * Anfänger-Fehler, die das Tool fixt:
 *  1. Mit 9,99 € rechnen statt mit den ~7,14 €, die real ankommen
 *  2. Small Business Program (15 % statt 30 %) nicht kennen/beantragen
 *  3. Abo-LTV ohne Churn schätzen ("100 Abonnenten × 12 Monate")
 *  4. Break-even nie durchrechnen → Agentur-Angebote nicht bewerten können
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { NumberField } from "@/components/ui/number-field";
import { Label } from "@/components/ui/label";
import {
  Smartphone,
  Calculator,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Landmark,
  HelpCircle,
} from "lucide-react";

const UST_SATZ = 0.19;
const APPLE_JAHR_USD = 99;
const USD_EUR = 0.92; // grobe Umrechnung für die Fixkosten-Schätzung

type Modell = "abo-monat" | "abo-jahr" | "einmalkauf";

const MODELL_LABEL: Record<Modell, string> = {
  "abo-monat": "Abo (monatlich)",
  "abo-jahr": "Abo (jährlich)",
  einmalkauf: "Einmal-Kauf / Lifetime",
};

const AppUmsatzRechner = () => {
  // 1. Monetarisierung
  const [modell, setModell] = useState<Modell>("abo-monat");
  const [preis, setPreis] = useState(9.99);
  const [smallBusiness, setSmallBusiness] = useState(true);
  // 2. Volumen
  const [downloadsMonat, setDownloadsMonat] = useState(1000);
  const [conversion, setConversion] = useState(4); // % der Downloads, die zahlen
  const [churnMonat, setChurnMonat] = useState(8); // % monatlicher Abo-Churn
  // 3. Kosten
  const [devKosten, setDevKosten] = useState(5000);
  const [laufendMonat, setLaufendMonat] = useState(25);

  const istAbo = modell !== "einmalkauf";

  const calc = useMemo(() => {
    const cut = smallBusiness ? 0.15 : 0.3;
    // Preis pro Abrechnungs-Periode → auf Monat normalisieren
    const preisProMonat = modell === "abo-jahr" ? preis / 12 : preis;
    // USt raus (Kommissionärs-Modell: Apple/Google führen die USt auf den Endkundenpreis ab)
    const nettoPreis = preisProMonat / (1 + UST_SATZ);
    const erloesProZahlerMonat = nettoPreis * (1 - cut);

    const neueZahlerMonat = downloadsMonat * (conversion / 100);
    const fixkostenMonat = laufendMonat + (APPLE_JAHR_USD * USD_EUR) / 12;

    // LTV: Abo = Erlös / Churn (geometrische Reihe), Einmalkauf = Erlös einmalig
    const churn = Math.max(churnMonat, 0.1) / 100;
    const ltv = istAbo ? erloesProZahlerMonat / churn : (preis / (1 + UST_SATZ)) * (1 - cut);

    // 36-Monats-Simulation: Abonnenten-Bestand mit Churn bzw. Einmal-Verkäufe
    let abonnenten = 0;
    let kumGewinn = -devKosten;
    let breakEvenMonat: number | null = null;
    const verlauf: { monat: number; umsatz: number; gewinn: number; kum: number }[] = [];
    for (let m = 1; m <= 36; m++) {
      if (istAbo) {
        abonnenten = abonnenten * (1 - churn) + neueZahlerMonat;
      }
      const umsatz = istAbo
        ? abonnenten * erloesProZahlerMonat
        : neueZahlerMonat * ltv;
      const gewinn = umsatz - fixkostenMonat;
      kumGewinn += gewinn;
      if (breakEvenMonat === null && kumGewinn >= 0) breakEvenMonat = m;
      if (m <= 12 || m % 6 === 0) verlauf.push({ monat: m, umsatz, gewinn, kum: kumGewinn });
    }

    const steadyAbonnenten = istAbo ? neueZahlerMonat / churn : 0;
    const mrr12 = verlauf.find((v) => v.monat === 12)?.umsatz ?? 0;

    return {
      cut,
      nettoPreis,
      erloesProZahlerMonat,
      neueZahlerMonat,
      fixkostenMonat,
      ltv,
      steadyAbonnenten,
      mrr12,
      breakEvenMonat,
      verlauf,
      kumGewinn36: kumGewinn,
    };
  }, [modell, preis, smallBusiness, downloadsMonat, conversion, churnMonat, devKosten, laufendMonat, istAbo]);

  const eur = (n: number, digits = 0) =>
    n.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });

  const rentabel = calc.breakEvenMonat !== null && calc.breakEvenMonat <= 18;
  const nieRentabel = calc.breakEvenMonat === null;

  return (
    <CockpitShell
      eyebrow="🚀 Launch · Companion zum App-Guide"
      title="App-Store-Umsatz-Rechner"
      subtitle="Von 9,99 € im Store kommen bei dir ~7,14 € an — USt führt der Store ab, dann geht die Provision runter. Dieses Tool rechnet Preis → Netto-Erlös → MRR/LTV → Break-even gegen deine Entwicklungskosten."
    >
      {/* === 1. Monetarisierung === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-accent-blue" /> 1. Wie verdient deine App Geld?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Modell</Label>
            <select
              value={modell}
              onChange={(e) => setModell(e.target.value as Modell)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {(Object.entries(MODELL_LABEL) as [Modell, string][]).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Store-Preis (€ brutto{modell === "abo-jahr" ? " / Jahr" : modell === "abo-monat" ? " / Monat" : ""})
            </Label>
            <NumberField step="0.01" value={preis} onChange={setPreis} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Der Preis, den Endkunden im Store sehen (inkl. USt)</div>
          </div>
          <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-2 self-end h-10">
            <input
              type="checkbox"
              checked={smallBusiness}
              onChange={(e) => setSmallBusiness(e.target.checked)}
              className="h-4 w-4"
            />
            <span>Small-Business-Tarif (15 % statt 30 %) — gilt unter 1 Mio. $/Jahr</span>
          </label>
        </div>
      </div>

      {/* === 2. Volumen === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent-blue" /> 2. Wie viele Nutzer erwartest du?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Downloads / Monat</Label>
            <NumberField value={downloadsMonat} onChange={setDownloadsMonat} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Ohne Audience sind 300–1.500/Mon im 1. Jahr realistisch</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Conversion zu zahlend (%)</Label>
            <NumberField step="0.1" value={conversion} onChange={setConversion} min={0} max={100} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Benchmark (RevenueCat): ~3–7 % der Downloads zahlen je</div>
          </div>
          {istAbo && (
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Monatlicher Abo-Churn (%)</Label>
              <NumberField step="0.1" value={churnMonat} onChange={setChurnMonat} min={0.1} max={100} className="mt-1" />
              <div className="text-[10px] text-muted-foreground mt-1">Monats-Abos: 8–15 % · Jahres-Abos: 3–6 % (auf Monat gerechnet)</div>
            </div>
          )}
        </div>
      </div>

      {/* === 3. Kosten === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-accent-blue" /> 3. Was kostet dich die App?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Entwicklung einmalig (€)</Label>
            <NumberField value={devKosten} onChange={setDevKosten} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">0 € (selbst mit KI) · 3–10k (Freelancer) · 15k+ (Agentur)</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Laufende Kosten / Monat (€)</Label>
            <NumberField value={laufendMonat} onChange={setLaufendMonat} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Server/Backend, Tools, APIs — Apple-Jahresgebühr rechnen wir automatisch drauf</div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-3 self-end">
            <div className="text-[10px] uppercase text-muted-foreground">Fixkosten gesamt / Monat</div>
            <div className="font-mono text-base font-semibold">{eur(calc.fixkostenMonat, 2)} €</div>
            <div className="text-[10px] text-muted-foreground">inkl. 99 $/Jahr Apple Developer</div>
          </div>
        </div>
      </div>

      {/* === Ergebnis-Hero === */}
      <div
        className={`rounded-2xl border-2 p-5 mb-6 ${
          nieRentabel
            ? "border-red-500/40 bg-red-500/5"
            : rentabel
              ? "border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card"
              : "border-amber-500/40 bg-amber-500/5"
        }`}
      >
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
          Dein Netto-Erlös pro Zahler {istAbo ? "und Monat" : ""}
        </div>
        <div className="flex items-baseline gap-3 flex-wrap mb-3">
          <div className={`text-5xl font-bold ${nieRentabel ? "text-red-700" : rentabel ? "text-emerald-700" : "text-amber-700"}`}>
            {eur(istAbo ? calc.erloesProZahlerMonat : calc.ltv, 2)} €
          </div>
          <div className="text-lg text-muted-foreground">
            von {eur(modell === "abo-jahr" ? preis / 12 : preis, 2)} € Store-Preis{modell === "abo-jahr" ? "/Monat" : ""}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-3">
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">{istAbo ? "MRR nach 12 Monaten" : "Umsatz / Monat"}</div>
            <div className="font-mono text-base font-semibold">{eur(calc.mrr12)} €</div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">LTV pro Zahler</div>
            <div className="font-mono text-base font-semibold">{eur(calc.ltv, 2)} €</div>
          </div>
          {istAbo && (
            <div className="rounded-lg bg-secondary/40 p-2">
              <div className="text-[10px] uppercase text-muted-foreground">Abonnenten-Plateau</div>
              <div className="font-mono text-base font-semibold">{eur(calc.steadyAbonnenten)}</div>
            </div>
          )}
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">Break-even (Dev-Kosten)</div>
            <div className="font-mono text-base font-semibold">
              {calc.breakEvenMonat === null ? "> 36 Mon" : `Monat ${calc.breakEvenMonat}`}
            </div>
          </div>
        </div>

        {nieRentabel && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/40 p-3 text-xs leading-relaxed flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-900">⚠ In 36 Monaten kein Break-even.</strong> Mit diesen Annahmen trägt sich
              die App nicht. Hebel in dieser Reihenfolge: Preis rauf (Store-Nutzer sind weniger preissensibel als du
              denkst), Conversion verbessern (Paywall/Onboarding), Churn senken (Jahres-Abo pushen) — oder
              Entwicklungskosten drücken (KI-selbst statt Agentur).
            </div>
          </div>
        )}
        {rentabel && (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/40 p-3 text-xs">
            ✅ Break-even in {calc.breakEvenMonat} Monaten — solide. Kumulierter Gewinn nach 36 Monaten:{" "}
            <strong>{eur(calc.kumGewinn36)} €</strong>. Ab hier lohnt es, in Wachstum (ASO, Content, Ads) zu investieren.
          </div>
        )}
        {!rentabel && !nieRentabel && (
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/40 p-3 text-xs leading-relaxed">
            <strong>💡 Break-even erst in Monat {calc.breakEvenMonat}.</strong> Machbar, aber lang — prüfe, ob ein
            höherer Preis oder ein Jahres-Abo als Default (weniger Churn) die Kurve steiler macht, bevor du in
            Marketing investierst.
          </div>
        )}
      </div>

      {/* === So wird gerechnet === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-accent-blue" /> So wird gerechnet
        </h3>
        <ol className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="rounded-full bg-accent-blue/10 text-accent-blue h-6 w-6 flex items-center justify-center font-bold text-xs shrink-0">1</span>
            <div className="flex-1">
              <div className="font-semibold">USt raus: Store-Preis ÷ 1,19</div>
              <div className="text-xs text-muted-foreground">
                Apple/Google treten als Kommissionär auf und führen die USt auf den Endkundenpreis selbst ab →{" "}
                <strong className="text-foreground">{eur(calc.nettoPreis, 2)} € netto{istAbo ? "/Monat" : ""}</strong>
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="rounded-full bg-accent-blue/10 text-accent-blue h-6 w-6 flex items-center justify-center font-bold text-xs shrink-0">2</span>
            <div className="flex-1">
              <div className="font-semibold">Store-Provision: −{Math.round(calc.cut * 100)} %</div>
              <div className="text-xs text-muted-foreground">
                {smallBusiness
                  ? "Small Business Program (Apple, aktiv beantragen!) bzw. 15 %-Tier auf die erste 1 Mio. $ (Google, automatisch)"
                  : "Standard-Provision 30 % — unter 1 Mio. $/Jahr verschenkst du Geld: Small Business Program beantragen!"}{" "}
                → <strong className="text-foreground">{eur(calc.erloesProZahlerMonat, 2)} € Erlös pro Zahler{istAbo ? "/Monat" : ""}</strong>
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="rounded-full bg-accent-blue/10 text-accent-blue h-6 w-6 flex items-center justify-center font-bold text-xs shrink-0">3</span>
            <div className="flex-1">
              <div className="font-semibold">Zahler: {eur(downloadsMonat)} Downloads × {conversion} % Conversion</div>
              <div className="text-xs text-muted-foreground">
                = <strong className="text-foreground">{eur(calc.neueZahlerMonat, 1)} neue Zahler/Monat</strong>
                {istAbo && (
                  <> · mit {churnMonat} % Churn pendelt sich der Bestand bei ~{eur(calc.steadyAbonnenten)} Abonnenten ein (Zugänge = Abgänge)</>
                )}
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="rounded-full bg-accent-blue/10 text-accent-blue h-6 w-6 flex items-center justify-center font-bold text-xs shrink-0">4</span>
            <div className="flex-1">
              <div className="font-semibold">Break-even: kumulierter Gewinn gegen {eur(devKosten)} € Entwicklung</div>
              <div className="text-xs text-muted-foreground">
                Monatlicher Gewinn = Umsatz − {eur(calc.fixkostenMonat, 2)} € Fixkosten; Startsaldo −{eur(devKosten)} € →{" "}
                <strong className="text-foreground">
                  {calc.breakEvenMonat === null ? "kein Break-even in 36 Monaten" : `Break-even in Monat ${calc.breakEvenMonat}`}
                </strong>
              </div>
            </div>
          </li>
        </ol>
      </div>

      {/* === Verlaufs-Tabelle === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent-blue" /> Umsatz-Verlauf (Simulation)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="py-1.5 pr-3">Monat</th>
                <th className="py-1.5 pr-3">Umsatz</th>
                <th className="py-1.5 pr-3">Gewinn/Monat</th>
                <th className="py-1.5">Kumuliert (inkl. Dev-Kosten)</th>
              </tr>
            </thead>
            <tbody>
              {calc.verlauf.map((v) => (
                <tr key={v.monat} className="border-b border-border/50">
                  <td className="py-1.5 pr-3 font-mono">{v.monat}</td>
                  <td className="py-1.5 pr-3 font-mono">{eur(v.umsatz)} €</td>
                  <td className={`py-1.5 pr-3 font-mono ${v.gewinn >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                    {eur(v.gewinn)} €
                  </td>
                  <td className={`py-1.5 font-mono ${v.kum >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                    {eur(v.kum)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === Steuer-Hinweis + Guide-Link === */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 mb-6 text-xs leading-relaxed">
        <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
          <Landmark className="h-4 w-4 text-amber-600" /> Steuer-Falle: Auszahlung ≠ Umsatz mit 19 % USt
        </h3>
        <p className="mb-2">
          Die monatliche Store-Auszahlung ist eine <strong>B2B-Leistung an Apple/Google Irland</strong> (Reverse
          Charge): keine USt in deiner Rechnung, aber Meldung in USt-VA (§18b) + Zusammenfassender Meldung — dafür
          brauchst du eine <strong>eigene USt-IdNr., auch als Kleinunternehmer</strong>. Wer die Auszahlung als
          "Umsatz 19 %" bucht, zahlt USt doppelt.
        </p>
        <p>
          Der komplette Ablauf von Idee bis Launch — Developer-Accounts, Googles 12-Tester-Pflicht, Review bestehen,
          Rechtstexte, Steuern — steht im{" "}
          <Link to="/guides/eigene-app-launchen" className="text-accent-blue font-semibold underline">
            Guide „Eigene App entwickeln &amp; launchen"
          </Link>.
        </p>
      </div>

      {/* === Glossar === */}
      <details className="rounded-2xl border border-border bg-card p-5 mb-6">
        <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-accent-blue" /> Glossar — Begriffe einfach erklärt
        </summary>
        <div className="mt-3 space-y-3 text-xs leading-relaxed">
          {[
            { begriff: "Store-Provision (15 % / 30 %)", erklaerung: "Apple und Google behalten 30 % Standard. Real zahlen kleine Entwickler 15 %: Apple über das Small Business Program (unter 1 Mio. $ Umsatz/Jahr, muss AKTIV in App Store Connect beantragt werden), Google automatisch auf die erste 1 Mio. $/Jahr. Apple-Abos kosten ab dem 13. Abonnenten-Monat ebenfalls nur 15 %." },
            { begriff: "Churn", erklaerung: "Anteil der Abonnenten, die pro Monat kündigen. 8 % Churn heißt: Von 100 Abonnenten sind nach einem Monat noch 92 da. Der Abonnenten-Bestand wächst nur, solange neue Zahler > Kündiger — deshalb gibt es ein Plateau bei (neue Zahler ÷ Churn)." },
            { begriff: "LTV (Lifetime Value)", erklaerung: "Was ein Zahler über seine gesamte Abo-Dauer einbringt. Näherung: monatlicher Netto-Erlös ÷ monatliche Churn-Rate. Bei 7,14 € Erlös und 8 % Churn: ~89 € LTV. Die wichtigste Zahl für die Frage, was dich ein Download über Ads kosten darf." },
            { begriff: "MRR (Monthly Recurring Revenue)", erklaerung: "Wiederkehrender Monatsumsatz aus Abos = aktive Abonnenten × Netto-Erlös pro Abonnent. DIE Kennzahl für Abo-Apps." },
            { begriff: "Kommissionärs-Modell", erklaerung: "Bei In-App-Käufen verkauft nicht du an den Endkunden, sondern Apple/Google (irische Gesellschaften) — sie berechnen und führen die USt im Land des Käufers ab. Deine Leistung ist B2B an Irland (Reverse Charge, ZM-Pflicht). Details in Schritt 17 des App-Guides." },
            { begriff: "Break-even", erklaerung: "Der Monat, in dem der kumulierte Gewinn die einmaligen Entwicklungskosten eingeholt hat. Unter 18 Monaten gilt als gesund für Indie-Apps; über 36 Monaten heißt: Annahmen ändern oder Konzept überarbeiten." },
          ].map((g) => (
            <div key={g.begriff} className="rounded-lg bg-secondary/30 p-3">
              <div className="font-semibold text-foreground mb-1">{g.begriff}</div>
              <div className="text-muted-foreground">{g.erklaerung}</div>
            </div>
          ))}
        </div>
      </details>

      {/* === Benchmark-Box === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-accent-blue" /> Benchmarks zum Einordnen (Consumer-Apps 2026)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="rounded-lg bg-secondary/30 p-3">
            <strong className="block mb-1">Conversion Download → zahlend</strong>
            <div className="text-muted-foreground">~3–7 % je nach Kategorie. Mit hartem Paywall-Onboarding (Trial vor Nutzung) auch 10 %+, dafür weniger Downloads.</div>
          </div>
          <div className="rounded-lg bg-secondary/30 p-3">
            <strong className="block mb-1">Monatlicher Churn</strong>
            <div className="text-muted-foreground">Monats-Abos 8–15 %, Jahres-Abos effektiv 3–6 %. Deshalb: Jahres-Abo als Default anbieten.</div>
          </div>
          <div className="rounded-lg bg-secondary/30 p-3">
            <strong className="block mb-1">Trial → Paid</strong>
            <div className="text-muted-foreground">30–50 % der Trial-Starter konvertieren (RevenueCat-Daten). Trial-Länge 3–7 Tage testen.</div>
          </div>
        </div>
      </div>

      <Stand2026Footer
        sources={[
          { label: "Apple Small Business Program", url: "https://developer.apple.com/app-store/small-business-program/" },
          { label: "Google Play Service-Fee-Übersicht", url: "https://support.google.com/googleplay/android-developer/answer/112622" },
          { label: "RevenueCat State of Subscription Apps (Benchmarks)", url: "https://www.revenuecat.com/state-of-subscription-apps/" },
        ]}
        note="Vereinfachte Modell-Rechnung mit 19 % DE-USt und konstanten Annahmen. Reale Auszahlungen variieren je Käuferland (lokale USt-Sätze, Wechselkurse) und Apples/Googles Abrechnungszyklen (~30–45 Tage Verzug)."
      />
    </CockpitShell>
  );
};

export default AppUmsatzRechner;
