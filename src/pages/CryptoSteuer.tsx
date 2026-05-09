import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Plus, Trash2, AlertTriangle, Coins, Download } from "lucide-react";

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
};

const CryptoSteuer = () => {
  const [trades, setTrades] = useState<Trade[]>([
    { id: "1", type: "buy", asset: "BTC", amount: 0.5, preisProEinheit: 30000, fee: 50, datum: "2024-01-15" },
    { id: "2", type: "buy", asset: "BTC", amount: 0.3, preisProEinheit: 50000, fee: 30, datum: "2024-08-20" },
    { id: "3", type: "sell", asset: "BTC", amount: 0.4, preisProEinheit: 65000, fee: 80, datum: "2025-03-10" },
  ]);
  const [estSatz, setEstSatz] = useState(0.42);
  const [steuerJahr, setSteuerJahr] = useState(2025);

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
            const steuerfrei = gehaltenTage > 365;
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
  const freigrenze = 1000;
  const steuerpflichtigNachFreigrenze =
    totalSteuerpflichtig < freigrenze ? 0 : totalSteuerpflichtig;
  const steuerlast = steuerpflichtigNachFreigrenze * estSatz;

  const exportCSV = () => {
    const header = "Datum,Typ,Asset,Menge,Preis/Einheit,Fee,Veräußerungsgewinn,Steuerpflichtig,Steuerfrei,Haltedauer\n";
    const rows = fifoResults
      .map(
        (r) =>
          `${r.saleDate},Verkauf,${r.asset},${r.amount},${r.salePreis},,${r.veraeuserungsgewinn.toFixed(2)},${r.steuerpflichtig.toFixed(2)},${r.steuerfrei.toFixed(2)},FIFO-matched`,
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

  return (
    <CockpitShell
      eyebrow="Crypto-Steuer-Modul"
      title="FIFO-Berechnung Crypto-Veräußerungsgewinne"
      subtitle="Trade-by-Trade FIFO-Match nach §23 EStG: Veräußerungsgewinn pro Verkauf, automatische 1-Jahres-Haltefrist-Erkennung, Freigrenze 1.000 € seit 2024. CSV-Export für StB."
    >
      {/* Inputs */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Coins className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Steuerjahr + Tarif</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Steuerjahr</Label>
            <select
              value={steuerJahr}
              onChange={(e) => setSteuerJahr(Number(e.target.value))}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {[2023, 2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Persönlicher ESt-Satz</Label>
            <select
              value={estSatz}
              onChange={(e) => setEstSatz(Number(e.target.value))}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value={0.14}>14 %</option>
              <option value={0.24}>24 %</option>
              <option value={0.32}>32 %</option>
              <option value={0.42}>42 % (Spitzensatz)</option>
              <option value={0.45}>45 % (Reichensteuer)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trades */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm">Deine Trades ({trades.length})</h3>
          <button
            onClick={addTrade}
            className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" /> Trade hinzufügen
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-2">Datum</th>
                <th className="text-left py-2 px-2">Typ</th>
                <th className="text-left py-2 px-2">Asset</th>
                <th className="text-right py-2 px-2">Menge</th>
                <th className="text-right py-2 px-2">Preis/Einheit</th>
                <th className="text-right py-2 px-2">Fee</th>
                <th className="text-center py-2 pl-2"></th>
              </tr>
            </thead>
            <tbody>
              {trades.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0">
                  <td className="py-1 pr-2">
                    <Input
                      type="date"
                      value={t.datum}
                      onChange={(e) => updateTrade(t.id, { datum: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </td>
                  <td className="py-1 px-2">
                    <select
                      value={t.type}
                      onChange={(e) => updateTrade(t.id, { type: e.target.value as Trade["type"] })}
                      className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs"
                    >
                      <option value="buy">Kauf</option>
                      <option value="sell">Verkauf</option>
                    </select>
                  </td>
                  <td className="py-1 px-2">
                    <Input
                      value={t.asset}
                      onChange={(e) => updateTrade(t.id, { asset: e.target.value.toUpperCase() })}
                      className="h-8 text-xs"
                      placeholder="BTC"
                    />
                  </td>
                  <td className="py-1 px-2">
                    <Input
                      type="number"
                      step="0.000001"
                      value={t.amount || ""}
                      onChange={(e) => updateTrade(t.id, { amount: Number(e.target.value) || 0 })}
                      className="h-8 text-xs text-right"
                    />
                  </td>
                  <td className="py-1 px-2">
                    <Input
                      type="number"
                      step="0.01"
                      value={t.preisProEinheit || ""}
                      onChange={(e) => updateTrade(t.id, { preisProEinheit: Number(e.target.value) || 0 })}
                      className="h-8 text-xs text-right"
                    />
                  </td>
                  <td className="py-1 px-2">
                    <Input
                      type="number"
                      step="0.01"
                      value={t.fee || ""}
                      onChange={(e) => updateTrade(t.id, { fee: Number(e.target.value) || 0 })}
                      className="h-8 text-xs text-right"
                    />
                  </td>
                  <td className="py-1 pl-2 text-center">
                    <button
                      onClick={() => removeTrade(t.id)}
                      className="text-red-600 hover:bg-red-500/10 p-1 rounded"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary für Steuerjahr */}
      <div className="rounded-2xl border-2 border-accent-blue/40 bg-gradient-to-br from-card via-card to-accent-blue/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-5 w-5 text-accent-blue" />
          <h3 className="font-bold">Zusammenfassung Steuerjahr {steuerJahr}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-lg bg-secondary/40 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Verkäufe im Jahr</div>
            <div className="text-lg font-bold">{yearResults.length}</div>
          </div>
          <div className="rounded-lg bg-emerald-500/10 p-3">
            <div className="text-[10px] uppercase tracking-wider text-emerald-700">Steuerfrei (&gt; 1 Jahr)</div>
            <div className="text-lg font-bold text-emerald-700">
              {Math.round(totalSteuerfrei).toLocaleString("de-DE")} €
            </div>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-3">
            <div className="text-[10px] uppercase tracking-wider text-amber-700">Steuerpflichtig</div>
            <div className="text-lg font-bold text-amber-700">
              {Math.round(totalSteuerpflichtig).toLocaleString("de-DE")} €
            </div>
          </div>
          <div className="rounded-lg bg-red-500/10 p-3">
            <div className="text-[10px] uppercase tracking-wider text-red-700">ESt-Last</div>
            <div className="text-lg font-bold text-red-700">
              {Math.round(steuerlast).toLocaleString("de-DE")} €
            </div>
          </div>
        </div>
        {totalSteuerpflichtig > 0 && totalSteuerpflichtig <= freigrenze && (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs mt-3">
            ✓ <strong>Freigrenze §23 EStG greift:</strong> Steuerpflichtige Gewinne {Math.round(totalSteuerpflichtig).toLocaleString("de-DE")} € liegen unter 1.000 € → komplett steuerfrei
          </div>
        )}
        <div className="flex justify-end mt-3">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-secondary"
          >
            <Download className="h-3.5 w-3.5" /> CSV für StB exportieren
          </button>
        </div>
      </div>

      {/* Detail pro Verkauf */}
      {yearResults.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 mb-6">
          <h3 className="font-bold text-sm mb-3">Detail pro Verkauf (FIFO-matched)</h3>
          <div className="space-y-3">
            {yearResults.map((r) => (
              <div key={r.saleId} className="rounded-xl border border-border bg-secondary/20 p-3">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                  <div>
                    <span className="font-bold">
                      {r.amount} {r.asset}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      verkauft am {new Date(r.saleDate).toLocaleDateString("de-DE")} zu{" "}
                      {r.salePreis.toLocaleString("de-DE")} €
                    </span>
                  </div>
                  <div className={`font-mono font-semibold ${r.veraeuserungsgewinn >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                    {r.veraeuserungsgewinn >= 0 ? "+" : ""}
                    {Math.round(r.veraeuserungsgewinn).toLocaleString("de-DE")} €
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  {r.matched.map((m, j) => (
                    <div
                      key={j}
                      className={`flex items-center justify-between gap-2 rounded-md p-1.5 ${
                        m.steuerfrei ? "bg-emerald-500/10" : "bg-amber-500/10"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono">{m.amount.toFixed(6)}</span>
                        <span className="text-muted-foreground">
                          gekauft {new Date(m.buyDate).toLocaleDateString("de-DE")}
                        </span>
                        <span className="text-muted-foreground">à</span>
                        <span className="font-mono">{m.buyPreis.toFixed(2)} €</span>
                        <span className="rounded-full bg-card px-1.5 py-0.5 text-[10px]">
                          {m.gehaltenTage} Tage
                        </span>
                      </div>
                      {m.steuerfrei ? (
                        <span className="text-emerald-700 text-[10px] font-semibold">✓ steuerfrei (&gt; 1 J)</span>
                      ) : (
                        <span className="text-amber-700 text-[10px] font-semibold">⚠ steuerpflichtig</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtig — §23 EStG (Privates Veräußerungsgeschäft):</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>1-Jahres-Haltefrist:</strong> Crypto-Coins die länger als 12 Monate gehalten wurden sind
                bei Verkauf STEUERFREI (auch bei Millionen-Gewinn!).
              </li>
              <li>
                <strong>FIFO-Pflicht:</strong> First-In-First-Out für Anschaffungs-/Verkaufs-Match. Andere
                Verfahren (LIFO, Avg) seit BMF-Schreiben 2022 nicht mehr zulässig.
              </li>
              <li>
                <strong>Freigrenze 1.000 €</strong> (seit 2024, vorher 600 €) — bei Unterschreitung KOMPLETT
                steuerfrei. Bei Überschreitung VOLL steuerpflichtig (nicht nur über 1k).
              </li>
              <li>
                <strong>Staking / Lending:</strong> Erträge gelten als Einkünfte aus sonstigen Leistungen (§22 Nr.
                3 EStG) — separat von Veräußerungsgewinnen, eigene Freigrenze 256 €.
              </li>
              <li>
                <strong>NFTs</strong>: gelten meist auch als Crypto-Coins → §23 EStG-Logik.
              </li>
              <li>
                <strong>Mining</strong>: gewerbliche Einkünfte → §15 EStG, dann KSt+GewSt-Pflicht oder ESt-Tarif.
              </li>
              <li>
                <strong>Wallets-Daten</strong>: idealerweise CSV-Export von der Börse (Coinbase, Binance, Kraken
                etc.). Tools wie Cointracking, Koinly machen das automatisch.
              </li>
              <li>Modell ist vereinfacht — bei großen Volumina mit StB für Crypto klären.</li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default CryptoSteuer;
