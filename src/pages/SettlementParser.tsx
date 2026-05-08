import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Label } from "@/components/ui/label";
import { Upload, Download, AlertTriangle, CheckCircle2, Package, CreditCard, FileText } from "lucide-react";
import { lookupAmazonCode } from "@/lib/amazonBookingCodes";

type Mode = "amazon" | "stripe";

type ParsedRow = {
  date?: string;
  type: string;
  description?: string;
  amount: number; // in EUR (Amazon) or USD (Stripe)
  currency?: string;
  // Mapped category for grouping
  category: string;
  skr03?: string;
  skr04?: string;
};

const SettlementParser = () => {
  const [params, setParams] = useSearchParams();
  const initialMode = (params.get("mode") as Mode) === "stripe" ? "stripe" : "amazon";
  const [mode, setMode] = useState<Mode>(initialMode);
  const [csvText, setCsvText] = useState("");
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const switchMode = (m: Mode) => {
    setMode(m);
    setRows([]);
    setCsvText("");
    setError(null);
    params.set("mode", m);
    setParams(params);
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setCsvText(text);
    parseCsv(text);
  };

  const parseCsv = (text: string) => {
    setError(null);
    try {
      const parsed = mode === "amazon" ? parseAmazon(text) : parseStripe(text);
      setRows(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Parse-Error");
    }
  };

  // ============================================================
  // Amazon CSV Parser
  // ============================================================
  function parseAmazon(text: string): ParsedRow[] {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length < 2) throw new Error("CSV leer oder ungültig");

    // Amazon-Settlement-CSV-Spalten typisch:
    // settlement-id, settlement-start-date, settlement-end-date, deposit-date, total-amount, currency,
    // transaction-type, order-id, merchant-order-id, adjustment-id, shipment-id, marketplace-name,
    // amount-type, amount-description, amount, fulfillment-id, posted-date, ...
    const header = lines[0].split(/[,;\t]/).map((h) => h.toLowerCase().trim().replace(/^"|"$/g, ""));

    const idxType = findIdx(header, ["transaction-type", "amount-type", "type"]);
    const idxDesc = findIdx(header, ["amount-description", "description"]);
    const idxAmount = findIdx(header, ["amount"]);
    const idxDate = findIdx(header, ["posted-date", "deposit-date", "settlement-start-date", "date"]);
    const idxCurrency = findIdx(header, ["currency"]);

    const result: ParsedRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const row = splitCsvLine(lines[i]);
      if (row.length < 3) continue;

      const type = row[idxType] || "";
      const desc = idxDesc >= 0 ? row[idxDesc] || "" : "";
      const amount = parseFloat((row[idxAmount] || "0").replace(",", "."));
      const date = idxDate >= 0 ? row[idxDate] : "";
      const currency = idxCurrency >= 0 ? row[idxCurrency] || "EUR" : "EUR";

      if (isNaN(amount) || amount === 0) continue;

      // Mappe via lookupAmazonCode
      const lookupKey = desc || type;
      const lookup = lookupAmazonCode(lookupKey);
      const matched = lookup.sub || lookup.prefix;
      const category = matched?.label ?? mapAmazonCategory(type, desc);
      const skr03 = matched?.skr03;
      const skr04 = matched?.skr04;

      result.push({ date, type, description: desc, amount, currency, category, skr03, skr04 });
    }
    return result;
  }

  function mapAmazonCategory(type: string, desc: string): string {
    const t = (type + " " + desc).toLowerCase();
    if (t.includes("order") || t.includes("verkauf")) return "Verkaufserlöse";
    if (t.includes("refund") || t.includes("erstatt")) return "Refunds / Erlösschmälerungen";
    if (t.includes("fba") || t.includes("storage") || t.includes("lager")) return "FBA / Lager";
    if (t.includes("commission") || t.includes("provision") || t.includes("fee")) return "Verkaufsprovisionen";
    if (t.includes("advertis") || t.includes("ad ") || t.includes("ppc")) return "Werbung / PPC";
    if (t.includes("subscription")) return "Subscription Fee";
    if (t.includes("auszahl") || t.includes("payout") || t.includes("disburs")) return "Auszahlungen (Geldtransit)";
    return "Sonstiges";
  }

  // ============================================================
  // Stripe Payout-Parser
  // ============================================================
  function parseStripe(text: string): ParsedRow[] {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length < 2) throw new Error("CSV leer oder ungültig");

    // Stripe payouts.csv Spalten:
    // id, type, source, amount, fee, net, currency, available_on, created, status, description, ...
    const header = lines[0].split(/[,;\t]/).map((h) => h.toLowerCase().trim().replace(/^"|"$/g, ""));

    const idxType = findIdx(header, ["type", "reporting_category"]);
    const idxAmount = findIdx(header, ["amount"]);
    const idxFee = findIdx(header, ["fee"]);
    const idxNet = findIdx(header, ["net"]);
    const idxDate = findIdx(header, ["created", "available_on", "date"]);
    const idxDesc = findIdx(header, ["description"]);
    const idxCurrency = findIdx(header, ["currency"]);

    const result: ParsedRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const row = splitCsvLine(lines[i]);
      if (row.length < 3) continue;

      const type = row[idxType] || "";
      const amount = parseFloat((row[idxAmount] || "0").replace(",", "."));
      const fee = idxFee >= 0 ? parseFloat((row[idxFee] || "0").replace(",", ".")) : 0;
      const date = idxDate >= 0 ? row[idxDate] || "" : "";
      const desc = idxDesc >= 0 ? row[idxDesc] || "" : "";
      const currency = idxCurrency >= 0 ? row[idxCurrency] || "EUR" : "EUR";

      if (isNaN(amount) || amount === 0) continue;

      // Stripe-Mapping
      const t = type.toLowerCase();
      const category = mapStripeCategory(t, desc);
      const skr03 = mapStripeSkr03(t, amount);
      const skr04 = mapStripeSkr04(t, amount);

      result.push({ date, type, description: desc, amount, currency, category, skr03, skr04 });
      // Plus Fee als separate Zeile wenn vorhanden
      if (!isNaN(fee) && fee !== 0 && idxFee >= 0) {
        result.push({
          date,
          type: "fee",
          description: `Stripe-Fee zu ${type}`,
          amount: -Math.abs(fee),
          currency,
          category: "Stripe-Gebühren",
          skr03: "3100 Fremdleistungen (Schlüssel 9)",
          skr04: "5900 Fremdleistungen",
        });
      }
    }
    return result;
  }

  function mapStripeCategory(type: string, desc: string): string {
    if (type.includes("charge") || type.includes("payment")) return "Verkaufserlöse";
    if (type.includes("refund")) return "Refunds";
    if (type.includes("dispute") || type.includes("chargeback")) return "Chargebacks";
    if (type.includes("fee")) return "Stripe-Gebühren";
    if (type.includes("payout") || type.includes("transfer")) return "Auszahlungen";
    if (type.includes("adjustment")) return "Adjustments";
    if (desc.toLowerCase().includes("tip") || desc.toLowerCase().includes("trinkgeld")) return "Trinkgeld";
    return "Sonstiges";
  }

  function mapStripeSkr03(type: string, amount: number): string {
    if (type.includes("charge") || type.includes("payment")) return "8400 Erlöse 19% USt";
    if (type.includes("refund")) return "8730 Erlösschmälerungen";
    if (type.includes("dispute") || type.includes("chargeback")) return "8730 Erlösschmälerungen";
    if (type.includes("fee")) return "3100 Fremdleistungen (Schlüssel 9)";
    if (type.includes("payout") || type.includes("transfer")) return "1360 Geldtransit";
    return amount > 0 ? "8400 Sonstige Erträge" : "4900 Sonstige Aufwendungen";
  }

  function mapStripeSkr04(type: string, amount: number): string {
    if (type.includes("charge") || type.includes("payment")) return "4400 Erlöse 19% USt";
    if (type.includes("refund")) return "4730 Erlösschmälerungen";
    if (type.includes("dispute") || type.includes("chargeback")) return "4730 Erlösschmälerungen";
    if (type.includes("fee")) return "5900 Fremdleistungen";
    if (type.includes("payout") || type.includes("transfer")) return "1460 Geldtransit";
    return amount > 0 ? "4830 Sonstige betriebliche Erträge" : "6300 Sonstige Aufwendungen";
  }

  // ============================================================
  // Helpers
  // ============================================================
  function findIdx(header: string[], names: string[]): number {
    for (const n of names) {
      const i = header.indexOf(n);
      if (i >= 0) return i;
    }
    return -1;
  }

  function splitCsvLine(line: string): string[] {
    // Simpler CSV-Parser mit Quote-Support
    const result: string[] = [];
    let cur = "";
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuote && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuote = !inQuote;
        }
      } else if ((c === "," || c === ";" || c === "\t") && !inQuote) {
        result.push(cur);
        cur = "";
      } else {
        cur += c;
      }
    }
    result.push(cur);
    return result.map((s) => s.trim());
  }

  // Aggregate per Category
  const summary = useMemo(() => {
    const grouped: Record<string, { count: number; sum: number }> = {};
    for (const r of rows) {
      if (!grouped[r.category]) grouped[r.category] = { count: 0, sum: 0 };
      grouped[r.category].count++;
      grouped[r.category].sum += r.amount;
    }
    return Object.entries(grouped)
      .map(([cat, v]) => ({ category: cat, ...v }))
      .sort((a, b) => Math.abs(b.sum) - Math.abs(a.sum));
  }, [rows]);

  const totalIn = rows.filter((r) => r.amount > 0).reduce((s, r) => s + r.amount, 0);
  const totalOut = rows.filter((r) => r.amount < 0).reduce((s, r) => s + r.amount, 0);

  const exportSummary = () => {
    const header = "Kategorie,Anzahl,Summe (€/$),SKR03,SKR04\n";
    const skr03Map: Record<string, string> = {};
    const skr04Map: Record<string, string> = {};
    for (const r of rows) {
      if (r.skr03 && !skr03Map[r.category]) skr03Map[r.category] = r.skr03;
      if (r.skr04 && !skr04Map[r.category]) skr04Map[r.category] = r.skr04;
    }
    const csv = summary
      .map(
        (s) =>
          `"${s.category}",${s.count},${s.sum.toFixed(2)},"${skr03Map[s.category] ?? ""}","${skr04Map[s.category] ?? ""}"`,
      )
      .join("\n");
    const blob = new Blob([header + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${mode}-summary.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <CockpitShell
      eyebrow="Settlement-Parser"
      title={mode === "amazon" ? "Amazon-Settlement-Parser" : "Stripe-Payout-Parser"}
      subtitle={
        mode === "amazon"
          ? "CSV-Upload eines Amazon-Settlement-Berichts → automatisch aufgesplittet pro Fee-Typ + SKR03/04-Mapping. Nutzt die 130+ Codes aus dem Amazon-Buchungstexte-Tool."
          : "Stripe-Payout-CSV → automatisch aufgesplittet (Verkäufe, Fees, Refunds, Chargebacks, Trinkgelder, Auszahlungen) + SKR03/04-Mapping."
      }
    >
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => switchMode("amazon")}
          className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            mode === "amazon"
              ? "bg-accent-blue text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          <Package className="h-3.5 w-3.5" /> Amazon
        </button>
        <button
          onClick={() => switchMode("stripe")}
          className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            mode === "stripe"
              ? "bg-accent-blue text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          <CreditCard className="h-3.5 w-3.5" /> Stripe
        </button>
      </div>

      {/* Upload */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Upload className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">
            {mode === "amazon" ? "Amazon-Settlement-CSV" : "Stripe-Payout-CSV"} hochladen
          </h3>
        </div>
        <div className="text-xs text-muted-foreground mb-3 leading-relaxed">
          {mode === "amazon" ? (
            <>
              <strong>Wo CSV finden:</strong> Seller Central → Reports → Payments → All Statements → Settlement Report
              herunterladen (Format: Flat-File). Spalten: transaction-type, amount-description, amount, posted-date,
              currency, etc.
            </>
          ) : (
            <>
              <strong>Wo CSV finden:</strong> Stripe Dashboard → Payments → Payouts → CSV Export. Oder Reports → All
              transactions → Export.
            </>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Datei wählen</Label>
            <input
              type="file"
              accept=".csv,.tsv,.txt"
              onChange={onFile}
              className="mt-1 block w-full text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-accent-blue file:text-primary-foreground file:font-semibold hover:file:opacity-90"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Oder CSV-Text einfügen</Label>
            <textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              onBlur={() => csvText && parseCsv(csvText)}
              placeholder={
                mode === "amazon"
                  ? "settlement-id,transaction-type,amount-description,amount,..."
                  : "id,type,amount,fee,net,currency,available_on,..."
              }
              className="mt-1 w-full h-20 rounded-md border border-input bg-background px-3 py-2 text-xs font-mono"
            />
          </div>
        </div>
        {csvText && (
          <button
            onClick={() => parseCsv(csvText)}
            className="mt-3 inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-xs font-semibold hover:opacity-90"
          >
            CSV parsen
          </button>
        )}
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-600 mt-3">
            <AlertTriangle className="h-3 w-3 inline mr-1" /> {error}
          </div>
        )}
      </div>

      {/* Results */}
      {rows.length > 0 && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Anzahl Zeilen</div>
              <div className="text-xl font-bold">{rows.length}</div>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
              <div className="text-[10px] uppercase tracking-wider text-emerald-700 mb-1">Plus-Beträge</div>
              <div className="text-xl font-bold text-emerald-700">+{Math.round(totalIn).toLocaleString("de-DE")} €</div>
            </div>
            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4">
              <div className="text-[10px] uppercase tracking-wider text-red-700 mb-1">Minus-Beträge</div>
              <div className="text-xl font-bold text-red-700">{Math.round(totalOut).toLocaleString("de-DE")} €</div>
            </div>
          </div>

          {/* Aggregat per Category */}
          <div className="rounded-2xl border border-border bg-card p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm">Aggregat nach Kategorie</h3>
              <button
                onClick={exportSummary}
                className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-secondary"
              >
                <Download className="h-3.5 w-3.5" /> Summary CSV
              </button>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-2">Kategorie</th>
                  <th className="text-right py-2 px-2">Anzahl</th>
                  <th className="text-right py-2 pl-2">Summe</th>
                </tr>
              </thead>
              <tbody>
                {summary.map((s) => (
                  <tr key={s.category} className="border-b border-border last:border-0">
                    <td className="py-2 pr-2 font-semibold">{s.category}</td>
                    <td className="py-2 px-2 text-right text-muted-foreground">{s.count}</td>
                    <td
                      className={`py-2 pl-2 text-right font-mono font-semibold ${
                        s.sum >= 0 ? "text-emerald-700" : "text-red-700"
                      }`}
                    >
                      {s.sum >= 0 ? "+" : ""}
                      {Math.round(s.sum).toLocaleString("de-DE")} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail-Liste (max 100) */}
          <div className="rounded-2xl border border-border bg-card p-5 mb-6">
            <h3 className="font-bold text-sm mb-3">Zeilen-Detail (Top 100)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-2">Datum</th>
                    <th className="text-left py-2 px-2">Type</th>
                    <th className="text-left py-2 px-2">Kategorie</th>
                    <th className="text-left py-2 px-2">SKR03</th>
                    <th className="text-right py-2 pl-2">Betrag</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 100).map((r, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-1.5 pr-2 text-muted-foreground font-mono text-[10px]">
                        {r.date?.slice(0, 10) || "—"}
                      </td>
                      <td className="py-1.5 px-2 font-mono text-[10px]">{r.type}</td>
                      <td className="py-1.5 px-2">{r.category}</td>
                      <td className="py-1.5 px-2 text-muted-foreground text-[10px]">{r.skr03 || "—"}</td>
                      <td
                        className={`py-1.5 pl-2 text-right font-mono ${
                          r.amount >= 0 ? "text-emerald-700" : "text-red-700"
                        }`}
                      >
                        {r.amount >= 0 ? "+" : ""}
                        {r.amount.toFixed(2)} {r.currency || "€"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {rows.length > 100 && (
              <div className="text-[11px] text-muted-foreground mt-2">
                +{rows.length - 100} weitere Zeilen — exportiere CSV für vollständige Liste
              </div>
            )}
          </div>
        </>
      )}

      {/* Tipps */}
      <div className="rounded-2xl border border-border bg-card p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <FileText className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">
              {mode === "amazon" ? "Amazon-Settlement-Workflow" : "Stripe-Payout-Workflow"}:
            </div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              {mode === "amazon" ? (
                <>
                  <li>
                    <strong>Wann CSV ziehen:</strong> nach jedem Settlement (alle 14 Tage Payout) — komplette
                    Historie unter Reports → Payments
                  </li>
                  <li>
                    <strong>Mapping:</strong> nutzt die 130+ Codes aus dem{" "}
                    <a href="/cockpit/amazon-buchungen" className="text-accent-blue underline">
                      Amazon-Buchungstexte-Tool
                    </a>{" "}
                    automatisch (AMA-SG-DE, AMA-BG-DE, FBAFees, MZNFS, AUSZ-DE, etc.)
                  </li>
                  <li>
                    <strong>Alternative für Auto-Sync:</strong> PayJoe / Amainvoice / Easybill verbinden Amazon
                    direkt mit Lexoffice/sevDesk
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <strong>Wann CSV ziehen:</strong> Stripe Dashboard → Payouts → letzten Monat exportieren
                  </li>
                  <li>
                    <strong>Stripe-Sicht:</strong> Reports → All transactions ist umfangreicher (zeigt auch
                    Disputes, Refunds-Details)
                  </li>
                  <li>
                    <strong>Stripe Tax:</strong> wenn aktiviert, ist USt automatisch dabei → bei Buchung 1:1
                    übernehmen
                  </li>
                  <li>
                    <strong>Direkt-Integration:</strong> Lexoffice, sevDesk haben Stripe-Connector — automatisches
                    Sync ohne CSV
                  </li>
                </>
              )}
              <li>
                <strong>SKR03/04-Mapping:</strong> Tool gibt Empfehlung — final mit StB klären, da Sonderfälle
                (z.B. Mahnungen, Cashback) individuell zu buchen
              </li>
              <li>
                <strong>USt-Behandlung:</strong> Verkäufe + 19 % USt-Default. OSS-Anteil bei EU-B2C separat. Bei
                US-/Drittland: Reverse-Charge oder steuerfreie Ausfuhr.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default SettlementParser;
