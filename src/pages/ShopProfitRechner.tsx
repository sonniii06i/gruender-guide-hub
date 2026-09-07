/**
 * ShopProfitRechner — "Was bleibt bei einer Bestellung im eigenen Shop übrig?"
 *
 * Für den eigenen Onlineshop (kein Marktplatz — dafür gibt es den
 * Marge-Tracker). Der Unterschied zu jedem Netto-Rechner: Hier wird brutto
 * eingegeben, wie es auf Einkaufs- und Verkaufsbeleg steht, und das Tool
 * rechnet die Umsatzsteuer selbst heraus.
 *
 * Anfänger-Fehler, die das Tool fixt:
 *  1. EK brutto gegen VK brutto rechnen — die 19 % im Einkauf sind Vorsteuer
 *     und damit kein Kostenblock, die 19 % im Verkauf gehören dem Finanzamt.
 *  2. PayPal-Gebühr netto rechnen: Zahlungsgebühren sind nach § 4 Nr. 8 UStG
 *     umsatzsteuerfrei — es gibt keine Vorsteuer, sie kosten voll.
 *  3. Werbung als Monatsbudget sehen statt je Bestellung. Bei 0,51 € Klickpreis
 *     und 2 % Conversion-Rate stecken 25,50 € Werbung in JEDER Bestellung.
 *  4. Break-even nicht kennen: Die entscheidende Zahl ist, wie viele Klicks
 *     eine Bestellung tragen kann, bevor der Deckungsbeitrag aufgebraucht ist.
 */
import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { NumberField } from "@/components/ui/number-field";
import { Label } from "@/components/ui/label";
import {
  ShoppingCart,
  Truck,
  MousePointerClick,
  Receipt,
  Target,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";

const UST_SAETZE = [19, 7, 0];

const UstWahl = ({ wert, setzen, id }: { wert: number; setzen: (n: number) => void; id: string }) => (
  <div className="mt-1 inline-flex rounded-lg border border-border overflow-hidden">
    {UST_SAETZE.map((s) => (
      <button
        key={s}
        type="button"
        aria-pressed={wert === s}
        onClick={() => setzen(s)}
        className={`px-3 py-1.5 text-xs font-medium border-r border-border last:border-r-0 transition-colors ${
          wert === s ? "bg-accent-blue text-accent-blue-foreground" : "bg-secondary/40 text-muted-foreground hover:bg-secondary"
        }`}
        id={`${id}-${s}`}
      >
        {s} %
      </button>
    ))}
  </div>
);

const ShopProfitRechner = () => {
  // Einkauf
  const [ekBrutto, setEkBrutto] = useState(12.9);
  const [ekUst, setEkUst] = useState(19);
  const [sonstBrutto, setSonstBrutto] = useState(0.6);
  const [sonstVorsteuer, setSonstVorsteuer] = useState(true);
  // Verkauf
  const [vkBrutto, setVkBrutto] = useState(39.9);
  const [vkUst, setVkUst] = useState(19);
  const [versandKunde, setVersandKunde] = useState(0);
  // Versand & Zahlung
  const [versandKosten, setVersandKosten] = useState(4.5);
  const [versandVorsteuer, setVersandVorsteuer] = useState(true);
  const [ppProzent, setPpProzent] = useState(2.49);
  const [ppFix, setPpFix] = useState(0.35);
  const [ppQuote, setPpQuote] = useState(100);
  // Werbung
  const [cpc, setCpc] = useState(0.51);
  const [modus, setModus] = useState<"cr" | "klicks">("cr");
  const [conversionRate, setConversionRate] = useState(2);
  const [klicksJeVerkauf, setKlicksJeVerkauf] = useState(50);
  const [organischProzent, setOrganischProzent] = useState(0);

  const calc = useMemo(() => {
    const bruttoUmsatz = vkBrutto + versandKunde;
    const nettoErloes = bruttoUmsatz / (1 + vkUst / 100);
    const ustVerkauf = bruttoUmsatz - nettoErloes;

    const ekNetto = ekBrutto / (1 + ekUst / 100);
    const versandNetto = versandVorsteuer ? versandKosten / 1.19 : versandKosten;
    const sonstNetto = sonstVorsteuer ? sonstBrutto / 1.19 : sonstBrutto;

    const paypal = (bruttoUmsatz * (ppProzent / 100) + ppFix) * (ppQuote / 100);

    // Klicks je Verkauf: aus Conversion-Rate abgeleitet oder direkt gesetzt.
    const klicks = modus === "cr" ? (conversionRate > 0 ? 100 / conversionRate : 0) : klicksJeVerkauf;
    const bezahlterAnteil = 1 - organischProzent / 100;
    const werbung = cpc * klicks * bezahlterAnteil;

    const db1 = nettoErloes - ekNetto - versandNetto - paypal - sonstNetto;
    const gewinn = db1 - werbung;

    // Vorsteuer aus allen Kostenbelegen (Werbung: Google/Meta rechnen mit 19 %).
    const vorsteuer =
      (ekBrutto - ekNetto) +
      (versandKosten - versandNetto) +
      (sonstBrutto - sonstNetto) +
      werbung * 0.19;

    // Break-even: was die Werbung maximal kosten darf, bevor die Null steht.
    const wirksam = cpc * bezahlterAnteil;
    const maxKlicks = wirksam > 0 ? db1 / wirksam : 0;
    const minCr = maxKlicks > 0 ? 100 / maxKlicks : 0;
    const maxCpc = klicks > 0 && bezahlterAnteil > 0 ? db1 / (klicks * bezahlterAnteil) : 0;
    const minRoas = db1 > 0 ? bruttoUmsatz / db1 : 0;

    return {
      bruttoUmsatz, nettoErloes, ustVerkauf, ekNetto, versandNetto, sonstNetto,
      paypal, klicks, werbung, db1, gewinn,
      zahllast: ustVerkauf - vorsteuer,
      marge: nettoErloes > 0 ? (gewinn / nettoErloes) * 100 : 0,
      aufschlag: ekNetto > 0 ? nettoErloes / ekNetto : 0,
      roas: werbung > 0 ? bruttoUmsatz / werbung : null,
      maxKlicks, minCr, maxCpc, minRoas,
    };
  }, [
    ekBrutto, ekUst, sonstBrutto, sonstVorsteuer, vkBrutto, vkUst, versandKunde,
    versandKosten, versandVorsteuer, ppProzent, ppFix, ppQuote,
    cpc, modus, conversionRate, klicksJeVerkauf, organischProzent,
  ]);

  const eur = (n: number) => n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  const dez = (n: number, d = 1) => n.toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d });

  // Wechsel der Eingabe-Art: Werte ineinander umrechnen, damit nichts springt.
  const wechsleModus = (ziel: "cr" | "klicks") => {
    if (ziel === modus) return;
    if (ziel === "klicks" && conversionRate > 0) setKlicksJeVerkauf(Math.round((100 / conversionRate) * 10) / 10);
    if (ziel === "cr" && klicksJeVerkauf > 0) setConversionRate(Math.round((100 / klicksJeVerkauf) * 100) / 100);
    setModus(ziel);
  };

  const verteilung = [
    { label: "Ware", wert: calc.ekNetto, klasse: "bg-slate-500" },
    { label: "Versand", wert: calc.versandNetto, klasse: "bg-sky-600" },
    { label: "PayPal", wert: calc.paypal, klasse: "bg-amber-500" },
    { label: "Sonstiges", wert: calc.sonstNetto, klasse: "bg-slate-400" },
    { label: "Werbung", wert: calc.werbung, klasse: "bg-accent-blue" },
    { label: "Gewinn", wert: Math.max(calc.gewinn, 0), klasse: "bg-emerald-600" },
  ].filter((t) => t.wert > 0 && calc.nettoErloes > 0);

  return (
    <CockpitShell
      eyebrow="📊 Buchhaltung & Reporting"
      title="Shop-Profit-Rechner (eigener Onlineshop)"
      subtitle="Einkaufspreis brutto rein, Verkaufspreis brutto rein — das Tool zieht Vorsteuer und Umsatzsteuer heraus und rechnet Versand, PayPal-Gebühren und Klickkosten gegen. Am Ende steht, was je Bestellung wirklich übrig bleibt und wie viele Klicks eine Bestellung tragen kann."
    >
      <div className="mb-4 rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-xs text-muted-foreground">
        Die Felder sind mit <strong className="text-foreground">Beispielwerten</strong> vorbelegt (12,90 € Einkauf · 39,90 € Verkauf · 2 % Conversion-Rate)
        — überschreib sie mit deinen Zahlen, alles rechnet sich sofort neu.
      </div>

      {/* === 1. Einkauf === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <ShoppingCart className="h-4 w-4 text-accent-blue" /> 1. Einkauf — du ziehst die Vorsteuer
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Einkaufspreis brutto (€)</Label>
            <NumberField step="0.01" value={ekBrutto} onChange={setEkBrutto} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">So wie er auf der Lieferantenrechnung steht — inkl. USt</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">USt im Einkauf</Label>
            <UstWahl wert={ekUst} setzen={setEkUst} id="ekust" />
            <div className="text-[10px] text-muted-foreground mt-1">0 % bei Import/IGL oder wenn du Kleinunternehmer bist</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Verpackung / Sonstiges (€ brutto)</Label>
            <NumberField step="0.01" value={sonstBrutto} onChange={setSonstBrutto} min={0} className="mt-1" />
            <label className="flex items-center gap-2 text-[10px] text-muted-foreground mt-1.5 cursor-pointer">
              <input type="checkbox" checked={sonstVorsteuer} onChange={(e) => setSonstVorsteuer(e.target.checked)} className="h-3.5 w-3.5" />
              enthält 19 % USt (Vorsteuer ziehbar)
            </label>
          </div>
        </div>
      </div>

      {/* === 2. Verkauf === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Receipt className="h-4 w-4 text-accent-blue" /> 2. Verkauf — die USt gehört dem Finanzamt
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Verkaufspreis brutto (€)</Label>
            <NumberField step="0.01" value={vkBrutto} onChange={setVkBrutto} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Der Preis, den der Kunde im Shop sieht</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">USt im Verkauf</Label>
            <UstWahl wert={vkUst} setzen={setVkUst} id="vkust" />
            <div className="text-[10px] text-muted-foreground mt-1">7 % z. B. Bücher/Lebensmittel · 0 % als Kleinunternehmer § 19</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Versandpauschale vom Kunden (€ brutto)</Label>
            <NumberField step="0.01" value={versandKunde} onChange={setVersandKunde} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">0 bei Gratisversand — zählt zum Umsatz und wird mitversteuert</div>
          </div>
        </div>
      </div>

      {/* === 3. Versand & Zahlung === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Truck className="h-4 w-4 text-accent-blue" /> 3. Versand &amp; Zahlungsgebühren
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Deine Versandkosten (€ brutto)</Label>
            <NumberField step="0.01" value={versandKosten} onChange={setVersandKosten} min={0} className="mt-1" />
            <label className="flex items-center gap-2 text-[10px] text-muted-foreground mt-1.5 cursor-pointer">
              <input type="checkbox" checked={versandVorsteuer} onChange={(e) => setVersandVorsteuer(e.target.checked)} className="h-3.5 w-3.5" />
              enthält 19 % USt
            </label>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">PayPal prozentual (%)</Label>
            <NumberField step="0.01" value={ppProzent} onChange={setPpProzent} min={0} max={20} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Inland-Standard 2,49 % — auf Bruttoumsatz inkl. Versand</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">PayPal fix (€ je Transaktion)</Label>
            <NumberField step="0.01" value={ppFix} onChange={setPpFix} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">0,35 € Inland · Gebühren sind USt-frei, also keine Vorsteuer</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Anteil PayPal-Zahler (%)</Label>
            <NumberField step="1" value={ppQuote} onChange={setPpQuote} min={0} max={100} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">100 = jede Bestellung. Bei Mix aus Kauf auf Rechnung o. ä. senken</div>
          </div>
        </div>
      </div>

      {/* === 4. Werbung === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <MousePointerClick className="h-4 w-4 text-accent-blue" /> 4. Klickkosten
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Klickpreis netto (€)</Label>
            <NumberField step="0.01" value={cpc} onChange={setCpc} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">Google/Meta rechnen mit USt ab → hier netto eintragen</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Eingabe über</Label>
            <div className="mt-1 inline-flex rounded-lg border border-border overflow-hidden">
              {([["cr", "Conversion-Rate"], ["klicks", "Klicks je Verkauf"]] as const).map(([wert, text]) => (
                <button
                  key={wert}
                  type="button"
                  aria-pressed={modus === wert}
                  onClick={() => wechsleModus(wert)}
                  className={`px-3 py-1.5 text-xs font-medium border-r border-border last:border-r-0 transition-colors ${
                    modus === wert ? "bg-accent-blue text-accent-blue-foreground" : "bg-secondary/40 text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>
            <div className="mt-2">
              {modus === "cr" ? (
                <NumberField step="0.1" value={conversionRate} onChange={setConversionRate} min={0.01} max={100} />
              ) : (
                <NumberField step="1" value={klicksJeVerkauf} onChange={setKlicksJeVerkauf} min={0} />
              )}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              {modus === "cr"
                ? `${dez(calc.klicks)} Klicks je Verkauf · Shop-Schnitt liegt bei 1–3 %`
                : `entspricht ${dez(100 / Math.max(klicksJeVerkauf, 0.0001), 2)} % Conversion-Rate`}
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Organisch / ohne Klick (%)</Label>
            <NumberField step="1" value={organischProzent} onChange={setOrganischProzent} min={0} max={100} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">
              Anteil der Bestellungen ohne bezahlten Klick (SEO, Direkt, Stammkunden) — senkt die Werbekosten anteilig
            </div>
          </div>
        </div>
        <div className="mt-3 rounded-lg bg-secondary/40 p-2.5 text-xs font-mono">
          {dez(calc.klicks)} Klicks × {eur(cpc)}
          {organischProzent > 0 && ` × ${100 - organischProzent} % bezahlt`} = <strong>{eur(calc.werbung)}</strong> Werbung je Bestellung
        </div>
      </div>

      {/* === Ergebnis === */}
      <div
        className={`rounded-2xl border-2 p-5 mb-6 ${
          calc.gewinn >= 0
            ? "border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card"
            : "border-red-500/40 bg-red-500/5"
        }`}
      >
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Gewinn je Bestellung (netto)</div>
        <div className="flex items-baseline gap-3 flex-wrap mb-4">
          <div className={`text-5xl font-bold ${calc.gewinn >= 0 ? "text-emerald-700" : "text-red-700"}`}>
            {calc.gewinn >= 0 ? "" : "−"}{eur(Math.abs(calc.gewinn))}
          </div>
          <div className="text-lg text-muted-foreground">
            {dez(calc.marge)} % Nettomarge
          </div>
        </div>

        {/* Rechenweg als Beleg-Liste */}
        <div className="rounded-xl bg-card border border-border p-4 mb-4">
          <table className="w-full text-xs font-mono">
            <tbody>
              <tr><td className="py-1 text-muted-foreground font-sans">Bruttoumsatz (VK + Versandpauschale)</td><td className="py-1 text-right">{eur(calc.bruttoUmsatz)}</td></tr>
              <tr><td className="py-1 text-muted-foreground font-sans">./. Umsatzsteuer {vkUst} %</td><td className="py-1 text-right">− {eur(calc.ustVerkauf)}</td></tr>
              <tr className="border-t border-border font-semibold"><td className="py-1.5 font-sans">Nettoerlös</td><td className="py-1.5 text-right">{eur(calc.nettoErloes)}</td></tr>
              <tr><td className="py-1 text-muted-foreground font-sans">./. Wareneinsatz netto</td><td className="py-1 text-right">− {eur(calc.ekNetto)}</td></tr>
              <tr><td className="py-1 text-muted-foreground font-sans">./. Versand netto</td><td className="py-1 text-right">− {eur(calc.versandNetto)}</td></tr>
              <tr><td className="py-1 text-muted-foreground font-sans">./. PayPal-Gebühr (ohne Vorsteuer)</td><td className="py-1 text-right">− {eur(calc.paypal)}</td></tr>
              <tr><td className="py-1 text-muted-foreground font-sans">./. Verpackung / Sonstiges netto</td><td className="py-1 text-right">− {eur(calc.sonstNetto)}</td></tr>
              <tr className="border-t border-border font-semibold"><td className="py-1.5 font-sans">Deckungsbeitrag vor Werbung</td><td className="py-1.5 text-right">{eur(calc.db1)}</td></tr>
              <tr><td className="py-1 text-muted-foreground font-sans">./. Werbekosten netto</td><td className="py-1 text-right">− {eur(calc.werbung)}</td></tr>
              <tr className={`border-t-2 border-foreground/40 font-bold ${calc.gewinn >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                <td className="py-1.5 font-sans">Gewinn je Bestellung</td><td className="py-1.5 text-right">{eur(calc.gewinn)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Wohin geht der Nettoerlös */}
        {verteilung.length > 0 && (
          <div className="mb-4">
            <div className="flex h-3.5 w-full overflow-hidden rounded-full border border-border">
              {verteilung.map((t) => (
                <div key={t.label} className={t.klasse} style={{ width: `${(t.wert / calc.nettoErloes) * 100}%` }} />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-muted-foreground">
              {verteilung.map((t) => (
                <span key={t.label} className="inline-flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-sm ${t.klasse}`} />
                  {t.label} {dez((t.wert / calc.nettoErloes) * 100)} %
                </span>
              ))}
              {calc.gewinn < 0 && <span className="text-red-700 font-semibold">Verlust {dez((Math.abs(calc.gewinn) / calc.nettoErloes) * 100)} %</span>}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">Nettomarge</div>
            <div className={`font-mono text-base font-semibold ${calc.gewinn >= 0 ? "text-emerald-700" : "text-red-700"}`}>{dez(calc.marge)} %</div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">Aufschlag auf EK</div>
            <div className="font-mono text-base font-semibold">{dez(calc.aufschlag, 2)}×</div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">ROAS</div>
            <div className="font-mono text-base font-semibold">{calc.roas === null ? "—" : dez(calc.roas, 2)}</div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-2">
            <div className="text-[10px] uppercase text-muted-foreground">USt-Zahllast</div>
            <div className="font-mono text-base font-semibold">{eur(calc.zahllast)}</div>
          </div>
        </div>
      </div>

      {/* === Break-even === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-accent-blue" /> Break-even: was die Werbung tragen kann
        </h3>
        {calc.db1 > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-3">
              <div className="rounded-lg bg-secondary/40 p-2.5">
                <div className="text-[10px] uppercase text-muted-foreground">Klicks je Verkauf max.</div>
                <div className="font-mono text-base font-semibold">{dez(calc.maxKlicks)}</div>
              </div>
              <div className="rounded-lg bg-secondary/40 p-2.5">
                <div className="text-[10px] uppercase text-muted-foreground">Conversion-Rate min.</div>
                <div className="font-mono text-base font-semibold">{dez(calc.minCr, 2)} %</div>
              </div>
              <div className="rounded-lg bg-secondary/40 p-2.5">
                <div className="text-[10px] uppercase text-muted-foreground">Klickpreis max.</div>
                <div className="font-mono text-base font-semibold">{eur(Math.max(calc.maxCpc, 0))}</div>
              </div>
              <div className="rounded-lg bg-secondary/40 p-2.5">
                <div className="text-[10px] uppercase text-muted-foreground">ROAS min.</div>
                <div className="font-mono text-base font-semibold">{dez(calc.minRoas, 2)}</div>
              </div>
            </div>
            {calc.gewinn >= 0 ? (
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/40 p-3 text-xs leading-relaxed">
                ✅ <strong>Puffer:</strong> {dez(Math.max(calc.maxKlicks - calc.klicks, 0))} Klicks je Verkauf mehr, oder ein Klickpreis
                bis {eur(Math.max(calc.maxCpc, 0))} — dann steht die Null. Alles darunter ist dein Gewinn.
              </div>
            ) : (
              <div className="rounded-lg bg-red-500/10 border border-red-500/40 p-3 text-xs leading-relaxed flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-red-900">Die Werbung frisst den Deckungsbeitrag.</strong> Bei {eur(cpc)} je Klick trägt eine
                  Bestellung nur {dez(calc.maxKlicks)} Klicks — gerechnet sind {dez(calc.klicks)}. Hebel: Conversion-Rate hoch
                  (mindestens {dez(calc.minCr, 2)} %), Klickpreis runter (max. {eur(Math.max(calc.maxCpc, 0))}), Warenkorb größer
                  (Bundle, Versandpauschale) oder besser einkaufen.
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg bg-red-500/10 border border-red-500/40 p-3 text-xs leading-relaxed flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-900">Schon ohne Werbung im Minus.</strong> Der Deckungsbeitrag vor Werbung liegt bei{" "}
              {eur(calc.db1)} — jeder bezahlte Klick vergrößert nur den Verlust. Hier hilft kein Kampagnen-Tuning, sondern Preis,
              Einkauf oder Versandkosten.
            </div>
          </div>
        )}
      </div>

      {/* === Glossar === */}
      <details className="rounded-2xl border border-border bg-card p-5 mb-6">
        <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-accent-blue" /> Warum brutto rein und netto raus?
        </summary>
        <div className="mt-3 space-y-3 text-xs leading-relaxed">
          {[
            {
              begriff: "Vorsteuer im Einkauf",
              erklaerung: "Die 19 % auf der Lieferantenrechnung sind für dich kein Kostenblock: Du holst sie dir über die USt-Voranmeldung zurück. Bei 12,90 € brutto sind nur 10,84 € echter Wareneinsatz. Wer brutto gegen brutto rechnet, hält sich für ärmer, als er ist — außer als Kleinunternehmer nach § 19, dann ist der Bruttopreis tatsächlich dein Einkaufspreis (USt-Satz hier auf 0 % stellen).",
            },
            {
              begriff: "Umsatzsteuer im Verkauf",
              erklaerung: "Die 19 % im Verkaufspreis gehören nie dir. Von 39,90 € sind 33,53 € dein Erlös, 6,37 € sind ein durchlaufender Posten ans Finanzamt. Die Versandpauschale vom Kunden teilt das Schicksal der Hauptleistung und wird mit demselben Satz versteuert.",
            },
            {
              begriff: "PayPal-Gebühr",
              erklaerung: "Zahlungsdienstleistungen sind nach § 4 Nr. 8 UStG umsatzsteuerfrei. Es gibt also keine Vorsteuer zu ziehen — die Gebühr kostet in voller Höhe. Berechnungsgrundlage ist der Bruttobetrag inklusive Versandpauschale, nicht dein Nettoerlös.",
            },
            {
              begriff: "Klickkosten je Bestellung",
              erklaerung: "Werbebudget wird meist pro Monat gedacht, entscheidend ist aber der Anteil je Bestellung: Klickpreis × Klicks je Verkauf. Bei 0,51 € netto und 2 % Conversion-Rate braucht eine Bestellung 50 Klicks — 25,50 € Werbung in jeder einzelnen Bestellung. Google und Meta stellen mit USt in Rechnung, deshalb hier den Nettopreis eintragen.",
            },
            {
              begriff: "Deckungsbeitrag vs. Gewinn",
              erklaerung: "Der Deckungsbeitrag vor Werbung ist das Budget, das eine Bestellung für Marketing hergibt. Er ist die Zahl, gegen die du jede Kampagne prüfst. Der Gewinn darunter ist noch vor Fixkosten (Shop, Tools, Steuerberater) und vor Ertragsteuern — die Fixkosten deckst du erst über die Menge.",
            },
            {
              begriff: "ROAS",
              erklaerung: "Return on Ad Spend: Umsatz je Werbe-Euro. Der ROAS allein sagt nichts — erst der Mindest-ROAS aus diesem Rechner sagt, ab wann er reicht. Ein ROAS von 3 ist bei 70 % Marge großartig und bei 25 % Marge ein Verlustgeschäft.",
            },
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
          { label: "PayPal: Gebühren für Händler in Deutschland", url: "https://www.paypal.com/de/webapps/mpp/merchant-fees" },
          { label: "§ 4 Nr. 8 UStG — steuerfreie Umsätze (Zahlungsverkehr)", url: "https://www.gesetze-im-internet.de/ustg_1980/__4.html" },
        ]}
        note="Rechnung je Bestellung ohne Retouren, Fixkosten und Ertragsteuern. Retouren-Quote, Marktplatz-Provisionen und mehrere SKUs rechnet der Multi-Channel-Marge-Tracker. Kleinunternehmer nach § 19 setzen beide USt-Sätze auf 0 % — dann rechnet das Tool durchgängig brutto."
      />
    </CockpitShell>
  );
};

export default ShopProfitRechner;
