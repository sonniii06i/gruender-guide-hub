import { useMemo, useState, useRef } from "react";
import { csvCell } from "@/lib/csvSafe";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, Trash2, AlertTriangle, Coins, Download, Upload, ChevronDown, ArrowLeftRight } from "lucide-react";
import {
  Callout,
  EmptyState,
  Field,
  KitTable,
  ResultPanel,
  ToneBadge,
  ToolLayout,
  ToolSection,
  selectCls,
} from "@/components/cockpit/kit";
import { parseCsv, type ExchangeFormat } from "@/lib/cryptoCsvParsers";
import { freigrenzeParagraph23, haltefristAbgelaufen } from "@/lib/cryptoSteuer";

type Trade = {
  id: string;
  type: "buy" | "sell";
  asset: string;
  amount: number;
  preisProEinheit: number;
  fee: number;
  datum: string;
};

type FIFOResult = {
  saleId: string;
  asset: string;
  amount: number;
  saleDate: string;
  salePreis: number;
  matched: { buyId: string; buyDate: string; amount: number; buyPreis: number; gehaltenTage: number; steuerfrei: boolean }[];
  veraeuserungsgewinn: number;
  steuerpflichtig: number;
  steuerfrei: number;
  /** Verkaufte Menge ohne passenden Kauf (Kaufhistorie unvollständig) */
  ungedeckt?: number;
};

const CryptoSteuer = () => {
  const [trades, setTrades] = useState<Trade[]>([
    { id: "1", type: "buy", asset: "BTC", amount: 0.5, preisProEinheit: 30000, fee: 50, datum: "2024-01-15" },
    { id: "2", type: "buy", asset: "BTC", amount: 0.3, preisProEinheit: 50000, fee: 30, datum: "2024-08-20" },
    { id: "3", type: "sell", asset: "BTC", amount: 0.4, preisProEinheit: 65000, fee: 80, datum: "2025-03-10" },
  ]);
  const [estSatz, setEstSatz] = useState(0.42);
  const [steuerJahr, setSteuerJahr] = useState(2025);
  const [importFormat, setImportFormat] = useState<ExchangeFormat>("generic");
  const [importStatus, setImportStatus] = useState<{ ok: boolean; msg: string; count?: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCsvImport = async (file: File) => {
    try {
      const text = await file.text();
      const result = parseCsv(text, importFormat);
      if (result.errors.length > 0) {
        setImportStatus({ ok: false, msg: result.errors.join(" · ") });
        return;
      }
      if (result.trades.length === 0) {
        setImportStatus({ ok: false, msg: "Keine gültigen Trades in der CSV gefunden." });
        return;
      }
      const newTrades: Trade[] = result.trades.map((t, i) => ({
        ...t,
        id: `csv-${Date.now()}-${i}`,
      }));
      setTrades([...trades, ...newTrades]);
      const skipped = result.skipped ?? [];
      const skippedTxt = skipped.length > 0
        ? ` ${skipped.length} Zeile(n) nicht übernommen: ${skipped.slice(0, 5).map((s) => `Z. ${s.zeile}: ${s.grund}`).join(" · ")}${skipped.length > 5 ? " · …" : ""}`
        : "";
      // Übernommene Zeilen mit fehlendem Teil (z. B. Gebühr in Fremdwährung) getrennt melden
      const hinweise = result.hinweise ?? [];
      const hinweisTxt = hinweise.length > 0
        ? ` ${hinweise.length} Zeile(n) übernommen, aber unvollständig: ${hinweise.slice(0, 5).map((s) => `Z. ${s.zeile}: ${s.grund}`).join(" · ")}${hinweise.length > 5 ? " · …" : ""}`
        : "";
      setImportStatus({
        ok: true,
        msg: `${result.trades.length} Trades aus ${result.format.toUpperCase()}-CSV importiert.${skippedTxt}${hinweisTxt}`,
        count: result.trades.length,
      });
    } catch (e) {
      setImportStatus({ ok: false, msg: `Import-Fehler: ${(e as Error).message}` });
    }
  };

  const addTrade = () => {
    setTrades([
      ...trades,
      {
        id: Date.now().toString(),
        type: "buy",
        asset: "BTC",
        amount: 0,
        preisProEinheit: 0,
        fee: 0,
        datum: new Date().toISOString().slice(0, 10),
      },
    ]);
  };

  const removeTrade = (id: string) => setTrades(trades.filter((t) => t.id !== id));

  const updateTrade = (id: string, patch: Partial<Trade>) =>
    setTrades(trades.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const fifoResults = useMemo((): FIFOResult[] => {
    // Pro Asset getrennt
    const assets = Array.from(new Set(trades.map((t) => t.asset)));
    const allResults: FIFOResult[] = [];

    for (const asset of assets) {
      const assetTrades = trades
        .filter((t) => t.asset === asset)
        .sort((a, b) => a.datum.localeCompare(b.datum));

      // Kauf-Pool
      type Pool = { buyId: string; buyDate: string; restAmount: number; buyPreisProEinheit: number };
      const pool: Pool[] = [];

      for (const t of assetTrades) {
        if (t.type === "buy") {
          // Effektiver Kaufpreis pro Einheit = (preis × menge + fee) / menge
          const effPreis = (t.preisProEinheit * t.amount + t.fee) / t.amount;
          pool.push({ buyId: t.id, buyDate: t.datum, restAmount: t.amount, buyPreisProEinheit: effPreis });
        } else {
          // Verkauf — FIFO matchen
          let restToMatch = t.amount;
          const matched: FIFOResult["matched"] = [];
          let totalKostenbasis = 0;

          while (restToMatch > 0 && pool.length > 0) {
            const oldest = pool[0];
            const matchAmount = Math.min(restToMatch, oldest.restAmount);
            const gehaltenTage = Math.floor(
              (new Date(t.datum).getTime() - new Date(oldest.buyDate).getTime()) / (1000 * 60 * 60 * 24),
            );
            // Kalendergenau nach §23 EStG i. V. m. §§ 187/188 BGB (nicht "> 365 Tage": Schaltjahr-Falle)
            const steuerfrei = haltefristAbgelaufen(oldest.buyDate, t.datum);
            matched.push({
              buyId: oldest.buyId,
              buyDate: oldest.buyDate,
              amount: matchAmount,
              buyPreis: oldest.buyPreisProEinheit,
              gehaltenTage,
              steuerfrei,
            });
            totalKostenbasis += matchAmount * oldest.buyPreisProEinheit;
            oldest.restAmount -= matchAmount;
            restToMatch -= matchAmount;
            if (oldest.restAmount === 0) pool.shift();
          }

          // Nicht gedeckte Menge (Kaufhistorie unvollständig) → Kostenbasis 0 wäre falsch, deshalb ausweisen
          const ungedeckt = restToMatch > 1e-12 ? restToMatch : 0;

          // Effektiver Verkaufspreis pro Einheit (minus Fee)
          const effErloes = (t.preisProEinheit * t.amount - t.fee);
          const veraeuserungsgewinn = effErloes - totalKostenbasis;

          // Aufsplittet in steuerpflichtig + steuerfrei nach 1-Jahr-Frist
          let steuerpflichtig = 0;
          let steuerfrei = 0;
          for (const m of matched) {
            const teilGewinn =
              m.amount * (effErloes / t.amount) - m.amount * m.buyPreis;
            if (m.steuerfrei) steuerfrei += teilGewinn;
            else steuerpflichtig += teilGewinn;
          }

          allResults.push({
            saleId: t.id,
            asset: t.asset,
            amount: t.amount,
            saleDate: t.datum,
            salePreis: t.preisProEinheit,
            matched,
            veraeuserungsgewinn,
            steuerpflichtig,
            steuerfrei,
            ungedeckt,
          });
        }
      }
    }

    return allResults;
  }, [trades]);

  // Aggregat im Steuerjahr
  const yearResults = fifoResults.filter((r) => r.saleDate.startsWith(String(steuerJahr)));
  const totalSteuerpflichtig = yearResults.reduce((sum, r) => sum + r.steuerpflichtig, 0);
  const totalSteuerfrei = yearResults.reduce((sum, r) => sum + r.steuerfrei, 0);

  // Freigrenze §23 (3) EStG: seit 2024 1.000 € (vorher 600 €).
  // Wortlaut "weniger als" → 999,99 € steuerfrei, ab 1.000 € voll steuerpflichtig.
  // Bei NEGATIVEM Saldo (Verluste > Gewinne): kein Steuerlast aktuell, ABER Verlustvortrag möglich (§23 (3) S. 7 EStG) — nur mit gleichartigen Gewinnen verrechenbar.
  const freigrenze = freigrenzeParagraph23(steuerJahr);
  const ungedeckteVerkaeufe = yearResults.filter((r) => (r.ungedeckt ?? 0) > 0);
  const istVerlust = totalSteuerpflichtig < 0;
  const steuerpflichtigNachFreigrenze = istVerlust
    ? 0
    : totalSteuerpflichtig < freigrenze
    ? 0
    : totalSteuerpflichtig;
  const steuerlast = steuerpflichtigNachFreigrenze * estSatz;
  const verlustvortrag = istVerlust ? Math.abs(totalSteuerpflichtig) : 0;

  const exportCSV = () => {
    const header = "Datum,Typ,Asset,Menge,Preis/Einheit,Fee,Veräußerungsgewinn,Steuerpflichtig,Steuerfrei,Haltedauer\n";
    const rows = fifoResults
      .map(
        (r) =>
          `${r.saleDate},Verkauf,${csvCell(r.asset)},${r.amount},${r.salePreis},,${r.veraeuserungsgewinn.toFixed(2)},${r.steuerpflichtig.toFixed(2)},${r.steuerfrei.toFixed(2)},FIFO-matched`,
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `crypto-steuer-${steuerJahr}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const eur = (n: number) => `${Math.round(n).toLocaleString("de-DE")} €`;

  return (
    <CockpitShell
      eyebrow="Steuern · Crypto-Steuer-Modul"
      title="FIFO-Berechnung für Crypto-Veräußerungsgewinne"
      subtitle="Trade für Trade nach FIFO gemäß §23 EStG: Veräußerungsgewinn je Verkauf, automatische Erkennung der 1-Jahres-Haltefrist, Freigrenze 1.000 € seit 2024 (bis 2023: 600 €). CSV-Export für die Steuerberatung."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Steuerjahr und Tarif" icon={Coins}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Steuerjahr" htmlFor="crypto-jahr">
                  <select id="crypto-jahr" value={steuerJahr} onChange={(e) => setSteuerJahr(Number(e.target.value))} className={selectCls}>
                    {[2023, 2024, 2025, 2026].map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Persönlicher ESt-Satz" hint="Grenzsteuersatz, nicht Abgeltungsteuer" htmlFor="crypto-satz">
                  <select id="crypto-satz" value={estSatz} onChange={(e) => setEstSatz(Number(e.target.value))} className={selectCls}>
                    <option value={0.14}>14 %</option>
                    <option value={0.24}>24 %</option>
                    <option value={0.32}>32 %</option>
                    <option value={0.42}>42 % (Spitzensatz)</option>
                    <option value={0.45}>45 % (Reichensteuer)</option>
                  </select>
                </Field>
              </div>
            </ToolSection>

            <ToolSection title="CSV-Import von der Börse" description="Trades werden an die Liste angehängt." icon={Upload}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <Field label="Format" className="flex-1" htmlFor="crypto-format">
                  <select
                    id="crypto-format"
                    value={importFormat}
                    onChange={(e) => setImportFormat(e.target.value as ExchangeFormat)}
                    className={selectCls}
                  >
                    <option value="generic">Automatisch erkennen</option>
                    <option value="binance">Binance Spot Trade History</option>
                    <option value="kraken">Kraken trades.csv</option>
                    <option value="coinbase">Coinbase Transactions</option>
                    <option value="bison">Bison (Boerse Stuttgart)</option>
                  </select>
                </Field>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleCsvImport(file);
                    e.target.value = ""; // Reset für erneuten Upload
                  }}
                  className="hidden"
                />
                <Button type="button" onClick={() => fileInputRef.current?.click()} className="shrink-0">
                  <Upload className="h-4 w-4" aria-hidden="true" /> CSV-Datei wählen
                </Button>
              </div>
              {importStatus && (
                <Callout tone={importStatus.ok ? "success" : "danger"} className="mt-4">
                  <span role={importStatus.ok ? undefined : "alert"}>{importStatus.msg}</span>
                </Callout>
              )}
              <details className="group mt-4 text-sm [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 font-medium text-accent-blue">
                  Wo finde ich die CSV?
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li><strong className="font-medium text-foreground">Binance:</strong> Profil, Wallet, Order History, Spot Order, Export (CSV)</li>
                  <li><strong className="font-medium text-foreground">Kraken:</strong> History, Trades, Export, trades.csv</li>
                  <li><strong className="font-medium text-foreground">Coinbase:</strong> Account, Statements, Generate Report (Transaction History)</li>
                  <li><strong className="font-medium text-foreground">Bison:</strong> Übersicht, Steuerreport / Transaktionsliste (.csv)</li>
                </ul>
              </details>
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker={`Steuerjahr ${steuerJahr}`}
              title="Einkommensteuer auf Crypto-Gewinne"
              value={eur(steuerlast)}
              valueHint={`bei ${Math.round(estSatz * 100)} % Grenzsteuersatz`}
            >
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10">
                {[
                  { l: "Verkäufe", v: String(yearResults.length) },
                  { l: "Steuerfrei", v: eur(totalSteuerfrei) },
                  { l: "Steuerpflichtig", v: eur(totalSteuerpflichtig) },
                ].map((k) => (
                  <div key={k.l} className="min-w-0 bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 truncate font-semibold text-primary-foreground tabular">{k.v}</div>
                  </div>
                ))}
              </div>
              <Button
                variant="secondary"
                onClick={exportCSV}
                className="mt-4 w-full bg-white/10 text-primary-foreground hover:bg-white/15"
              >
                <Download className="h-4 w-4" aria-hidden="true" /> CSV für die Steuerberatung exportieren
              </Button>
            </ResultPanel>

            {totalSteuerpflichtig > 0 && totalSteuerpflichtig < freigrenze && (
              <Callout tone="success" title="Freigrenze nach §23 EStG greift">
                Die steuerpflichtigen Gewinne von {eur(totalSteuerpflichtig)} liegen unter {eur(freigrenze)}, damit komplett steuerfrei.
              </Callout>
            )}
            {ungedeckteVerkaeufe.length > 0 && (
              <Callout tone="warning" title="Kaufhistorie unvollständig">
                {ungedeckteVerkaeufe.length} Verkauf/Verkäufe ({ungedeckteVerkaeufe.map((r) => `${r.ungedeckt} ${r.asset}`).join(", ")}) haben keinen passenden Kauf.
                Für diese Mengen ist die Kostenbasis 0 angesetzt, der Gewinn ist damit zu hoch. Bitte fehlende Käufe ergänzen.
              </Callout>
            )}
            {verlustvortrag > 0 && (
              <Callout tone="warning" title={`Verlustvortrag nach §23 (3) EStG: ${eur(verlustvortrag)}`}>
                Nur mit künftigen Gewinnen aus §23-Geschäften verrechenbar, nicht mit anderen Einkunftsarten. In der
                ESt-Erklärung als „Verlustvortrag nach §10d EStG für private Veräußerungsgeschäfte“ eintragen; das
                Finanzamt stellt ihn fest.
              </Callout>
            )}
          </>
        }
      />

      {/* Trades */}
      <ToolSection
        title={
          <>
            Deine Trades <span className="font-normal text-muted-foreground tabular">({trades.length})</span>
          </>
        }
        icon={ArrowLeftRight}
        className="mb-6"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setTrades([])} disabled={trades.length === 0}>
              <Trash2 className="h-4 w-4" aria-hidden="true" /> Alle löschen
            </Button>
            <Button size="sm" onClick={addTrade}>
              <Plus className="h-4 w-4" aria-hidden="true" /> Trade hinzufügen
            </Button>
          </>
        }
      >
        {trades.length === 0 ? (
          <EmptyState
            icon={Coins}
            title="Noch keine Trades erfasst"
            description="Füge Käufe und Verkäufe manuell hinzu oder importiere die CSV deiner Börse."
            action={
              <Button onClick={addTrade}>
                <Plus className="h-4 w-4" aria-hidden="true" /> Trade hinzufügen
              </Button>
            }
          />
        ) : (
          <KitTable caption="Deine Crypto-Trades" className="relative">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Typ</th>
                <th>Asset</th>
                <th className="!text-right">Menge</th>
                <th className="!text-right">Preis je Einheit (€)</th>
                <th className="!text-right">Gebühr (€)</th>
                <th aria-label="Aktionen" />
              </tr>
            </thead>
            <tbody>
              {trades.map((t) => (
                <tr key={t.id}>
                  <td className="min-w-[150px]">
                    <Input
                      type="date"
                      value={t.datum}
                      onChange={(e) => updateTrade(t.id, { datum: e.target.value })}
                      aria-label="Datum"
                      className="h-9"
                    />
                  </td>
                  <td className="min-w-[110px]">
                    <select
                      value={t.type}
                      onChange={(e) => updateTrade(t.id, { type: e.target.value as Trade["type"] })}
                      aria-label="Typ"
                      className={`${selectCls} h-9`}
                    >
                      <option value="buy">Kauf</option>
                      <option value="sell">Verkauf</option>
                    </select>
                  </td>
                  <td className="min-w-[90px]">
                    <Input
                      value={t.asset}
                      onChange={(e) => updateTrade(t.id, { asset: e.target.value.toUpperCase() })}
                      aria-label="Asset"
                      className="h-9 font-medium"
                      placeholder="BTC"
                    />
                  </td>
                  <td className="min-w-[110px]">
                    <Input
                      type="number"
                      step="0.000001"
                      value={t.amount || ""}
                      onChange={(e) => updateTrade(t.id, { amount: Number(e.target.value) || 0 })}
                      aria-label="Menge"
                      className="h-9 text-right tabular"
                    />
                  </td>
                  <td className="min-w-[120px]">
                    <Input
                      type="number"
                      step="0.01"
                      value={t.preisProEinheit || ""}
                      onChange={(e) => updateTrade(t.id, { preisProEinheit: Number(e.target.value) || 0 })}
                      aria-label="Preis je Einheit"
                      className="h-9 text-right tabular"
                    />
                  </td>
                  <td className="min-w-[96px]">
                    <Input
                      type="number"
                      step="0.01"
                      value={t.fee || ""}
                      onChange={(e) => updateTrade(t.id, { fee: Number(e.target.value) || 0 })}
                      aria-label="Gebühr"
                      className="h-9 text-right tabular"
                    />
                  </td>
                  <td className="w-10 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTrade(t.id)}
                      aria-label="Trade entfernen"
                      className="h-8 w-8 text-muted-foreground hover:bg-danger-soft hover:text-danger"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </KitTable>
        )}
      </ToolSection>

      {/* Detail pro Verkauf */}
      <ToolSection title={`Verkäufe ${steuerJahr} im Detail`} description="FIFO-Zuordnung zu den Käufen" icon={Calculator} className="mb-6">
        {yearResults.length === 0 ? (
          <EmptyState
            className="py-8"
            icon={Calculator}
            title={`Keine Verkäufe in ${steuerJahr}`}
            description="Sobald ein Verkauf im gewählten Steuerjahr liegt, erscheint hier die FIFO-Zuordnung."
          />
        ) : (
          <div className="space-y-3">
            {yearResults.map((r) => (
              <div key={r.saleId} className="rounded-xl border border-border">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 px-4 py-3">
                  <p className="text-sm">
                    <span className="font-semibold tabular">
                      {r.amount} {r.asset}
                    </span>
                    <span className="ml-2 text-muted-foreground tabular">
                      verkauft am {new Date(r.saleDate).toLocaleDateString("de-DE")} zu {r.salePreis.toLocaleString("de-DE")} €
                    </span>
                  </p>
                  <span className={`font-semibold tabular ${r.veraeuserungsgewinn >= 0 ? "text-success" : "text-danger"}`}>
                    {r.veraeuserungsgewinn >= 0 ? "+" : ""}
                    {eur(r.veraeuserungsgewinn)}
                  </span>
                </div>
                <ul className="divide-y divide-border/60">
                  {r.matched.map((m, j) => (
                    <li key={j} className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-sm">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1 tabular">
                        <span className="font-medium">{m.amount.toFixed(6)}</span>
                        <span className="text-muted-foreground">gekauft {new Date(m.buyDate).toLocaleDateString("de-DE")} à {m.buyPreis.toFixed(2)} €</span>
                        <ToneBadge>{m.gehaltenTage} Tage</ToneBadge>
                      </span>
                      {m.steuerfrei ? (
                        <ToneBadge tone="success">steuerfrei, über 1 Jahr</ToneBadge>
                      ) : (
                        <ToneBadge tone="warning">steuerpflichtig</ToneBadge>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </ToolSection>

      {/* Disclaimer */}
      <ToolSection title="Wichtig zu §23 EStG (privates Veräußerungsgeschäft)" icon={AlertTriangle} className="mb-6">
        <dl className="divide-y divide-border/70 text-sm">
          {[
            { t: "1-Jahres-Haltefrist", d: "Coins, die länger als 12 Monate gehalten wurden, sind beim Verkauf steuerfrei, auch bei Millionengewinnen." },
            { t: "FIFO-Pflicht", d: "First-In-First-Out für die Zuordnung von Kauf und Verkauf. Andere Verfahren (LIFO, Durchschnitt) sind seit dem BMF-Schreiben 2022 nicht mehr zulässig." },
            { t: "Freigrenze 1.000 €", d: "Seit 2024 (vorher 600 €). Darunter komplett steuerfrei, darüber voll steuerpflichtig, nicht nur der übersteigende Teil." },
            { t: "Staking und Lending", d: "Erträge gelten als Einkünfte aus sonstigen Leistungen (§22 Nr. 3 EStG), getrennt von Veräußerungsgewinnen, eigene Freigrenze 256 €." },
            { t: "NFTs", d: "Gelten meist ebenfalls als Crypto-Coins, also §23-EStG-Logik." },
            { t: "Mining", d: "Gewerbliche Einkünfte nach §15 EStG, dann KSt und GewSt oder ESt-Tarif." },
            { t: "Verlustverrechnung nach §23 (3) EStG", d: "Verluste aus Crypto-Verkäufen sind nur mit Gewinnen aus privaten Veräußerungsgeschäften verrechenbar, nicht mit Gehalt, Dividenden oder Zinsen. Verbleibende Verluste werden unbegrenzt vorgetragen oder 1 Jahr zurückgetragen." },
            { t: "Loss-Harvesting", d: "Vor Jahresende Coins mit Buchverlust verkaufen und sofort zurückkaufen (in DE kein Wash-Sale-Verbot): Der Verlust ist steuerlich realisiert, die Position bleibt. Nur bei weniger als 1 Jahr Haltedauer relevant." },
            { t: "Steuersatz", d: "Veräußerungsgewinne werden mit deinem persönlichen Grenzsteuersatz besteuert, nicht mit der Abgeltungsteuer von 25 %. Bei hohem Einkommen 42 bis 45 %, bei niedrigem 14 bis 32 %." },
            { t: "Daten der Wallets", d: "Am besten CSV-Export der Börse (Coinbase, Binance, Kraken u. a.). Tools wie Cointracking oder Koinly machen das automatisch." },
          ].map((g) => (
            <div key={g.t} className="py-3 first:pt-0 last:pb-0">
              <dt className="font-semibold">{g.t}</dt>
              <dd className="mt-1 leading-relaxed text-muted-foreground">{g.d}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">Das Modell ist vereinfacht. Bei großen Volumina mit einer auf Crypto spezialisierten Steuerberatung klären.</p>
      </ToolSection>

      <Stand2026Footer
        sources={[
          { label: "§23 EStG (Privates Veräußerungsgeschäft)", url: "https://www.gesetze-im-internet.de/estg/__23.html" },
          { label: "§22 Nr. 3 EStG (Sonstige Einkünfte)", url: "https://www.gesetze-im-internet.de/estg/__22.html" },
          { label: "BMF-Schreiben Crypto 10.05.2022", url: "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Einkommensteuer/2022-05-10-einzelfragen-zur-ertragsteuerrechtlichen-behandlung-von-virtuellen-waehrungen-und-von-sonstigen-token.html" },
        ]}
        note="FIFO-Pflicht seit BMF 2022. Tool berechnet nur Veräußerungsgewinne — Mining/Staking/Lending separat (§22 Nr. 3 EStG, eigene Freigrenze 256 €)."
      />
    </CockpitShell>
  );
};

export default CryptoSteuer;
