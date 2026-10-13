/**
 * Crypto-Exchange CSV-Parser für CryptoSteuer-Tool.
 * Unterstützte Formate: Binance Spot Trade Export, Kraken trades.csv,
 * Coinbase Transactions, Bison.
 */

export type ParsedTrade = {
  type: "buy" | "sell";
  asset: string;
  amount: number;
  preisProEinheit: number;
  fee: number;
  datum: string; // ISO YYYY-MM-DD
};

export type SkippedRow = { zeile: number; grund: string };

export type ParseResult = {
  trades: ParsedTrade[];
  errors: string[];
  format: ExchangeFormat;
  /** Zeilen, die bewusst nicht übernommen wurden (z. B. Nicht-EUR-Kurse) — nie stillschweigend verwerfen. */
  skipped?: SkippedRow[];
  /** Zeilen, die übernommen wurden, bei denen aber ein Teil fehlt (z. B. Gebühr in Fremdwährung). */
  hinweise?: SkippedRow[];
};

export type ExchangeFormat = "binance" | "kraken" | "coinbase" | "bison" | "generic";

/**
 * Auto-Detect Exchange-Format basierend auf Header-Zeile.
 */
export function detectFormat(csvText: string): ExchangeFormat {
  const lines = csvText.split(/\r?\n/).slice(0, 15).map((l) => l.toLowerCase());
  // Coinbase-Exporte beginnen mit Hinweiszeilen → Kopfzeile in den ersten Zeilen suchen
  if (lines.some((l) => l.includes("transaction type") && l.includes("quantity transacted"))) return "coinbase";
  const firstLine = lines[0] ?? "";
  // Kraken trades.csv: txid, ordertxid, pair, time, type, ordertype, price, cost, fee, vol
  if (firstLine.includes("ordertxid") && firstLine.includes("ordertype")) return "kraken";
  // Coinbase: Timestamp, Transaction Type, Asset, Quantity Transacted...
  if (firstLine.includes("transaction type") && firstLine.includes("quantity transacted")) return "coinbase";
  // Binance Spot Trade History: Date(UTC), Pair, Side, Price, Executed, Amount, Fee
  if (firstLine.includes("date(utc)") && firstLine.includes("pair") && firstLine.includes("executed")) return "binance";
  // Bison: Datum, Typ, Asset, Anzahl, Preis EUR, Gebühr EUR
  if (firstLine.includes("datum") && (firstLine.includes("anzahl") || firstLine.includes("menge"))) return "bison";
  return "generic";
}

/**
 * Parse CSV nach gewähltem Format.
 */
export function parseCsv(csvText: string, format: ExchangeFormat): ParseResult {
  const f = format === "generic" ? detectFormat(csvText) : format;
  switch (f) {
    case "binance":
      return parseBinance(csvText);
    case "kraken":
      return parseKraken(csvText);
    case "coinbase":
      return parseCoinbase(csvText);
    case "bison":
      return parseBison(csvText);
    default:
      return { trades: [], errors: ["Format nicht erkannt — wähle es manuell aus."], format: "generic" };
  }
}

// ============================================================
// Helpers
// ============================================================

function splitCsvLine(line: string): string[] {
  // Einfache CSV-Trennung mit "-Quoting (kein Multi-Line)
  const result: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      result.push(cur.trim());
      cur = "";
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function parseDate(s: string): string {
  // Akzeptiert "YYYY-MM-DD HH:MM:SS", "YYYY-MM-DD", "DD.MM.YYYY", ISO
  if (!s) return "";
  const trimmed = s.trim().replace(/^"|"$/g, "");
  // ISO with time: 2024-01-15 12:34:56 or 2024-01-15T12:34:56Z
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
  // German DD.MM.YYYY
  const deMatch = trimmed.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
  if (deMatch) return `${deMatch[3]}-${deMatch[2]}-${deMatch[1]}`;
  return trimmed.slice(0, 10);
}

export function parseNum(s: string): number {
  if (!s) return 0;
  // Akzeptiert "1.234,56" (DE) und "1,234.56" (US)
  const trimmed = s.trim().replace(/[^\d,.-]/g, "");
  const dots = (trimmed.match(/\./g) ?? []).length;
  const commas = (trimmed.match(/,/g) ?? []).length;
  // Mehrere gleiche Trenner ohne den anderen = Tausendertrenner ("1.234.567" / "1,234,567")
  if (dots > 1 && commas === 0) return Number(trimmed.replace(/\./g, "")) || 0;
  if (commas > 1 && dots === 0) return Number(trimmed.replace(/,/g, "")) || 0;
  // Beide vorhanden: der letzte ist der Dezimaltrenner
  if (dots > 0 && commas > 0) {
    const n = trimmed.lastIndexOf(",") > trimmed.lastIndexOf(".")
      ? parseFloat(trimmed.replace(/\./g, "").replace(",", "."))
      : parseFloat(trimmed.replace(/,/g, ""));
    return isNaN(n) ? 0 : n;
  }
  // Ein einzelner Trenner gilt als Dezimaltrenner (auch mit mehr als 8 Nachkommastellen)
  const hasDeCommaDecimal = trimmed.match(/,\d+$/);
  const hasUsDotDecimal = trimmed.match(/\.\d+$/);
  let normalized = trimmed;
  if (hasDeCommaDecimal && !hasUsDotDecimal) {
    // DE-Format: 1.234,56 → 1234.56
    normalized = trimmed.replace(/\./g, "").replace(",", ".");
  } else if (hasUsDotDecimal) {
    // US-Format: 1,234.56 → 1234.56
    normalized = trimmed.replace(/,/g, "");
  }
  const n = parseFloat(normalized);
  return isNaN(n) ? 0 : n;
}

/**
 * Extrahiere Asset-Symbol aus Trading-Pair.
 * Bsp.: "BTCEUR" → "BTC", "BTC/EUR" → "BTC", "ETH-USD" → "ETH"
 */
function assetFromPair(pair: string): string {
  if (!pair) return "";
  const cleaned = pair.toUpperCase().replace(/[^A-Z0-9/-]/g, "");
  // Trennzeichen "/", "-" oder "_"
  const separator = cleaned.match(/[/\-_]/);
  if (separator) return cleaned.split(/[/\-_]/)[0];
  // Suffix-Detection (häufige Quote-Currencies)
  const quotes = ["EUR", "USDT", "USDC", "BUSD", "USD", "BTC", "ETH", "GBP", "CHF"];
  for (const q of quotes) {
    if (cleaned.endsWith(q) && cleaned.length > q.length) return cleaned.slice(0, -q.length);
  }
  return cleaned;
}

const KRAKEN_QUOTES = ["ZEUR", "ZUSD", "ZGBP", "ZCHF", "ZCAD", "ZJPY", "USDT", "USDC", "EUR", "USD", "GBP", "CHF", "XXBT", "XBT", "XETH", "ETH"];
const KRAKEN_ALIAS: Record<string, string> = { XBT: "BTC", XDG: "DOGE" };

/** Kraken-Paar in Basis- und Quote-Asset zerlegen ("XXBTZEUR" → BTC/EUR, "XETHZEUR" → ETH/EUR, "SOLEUR" → SOL/EUR). */
export function krakenPair(pairRaw: string): { base: string; quote: string } {
  const pair = (pairRaw || "").toUpperCase().replace(/[^A-Z0-9/]/g, "");
  let base = pair;
  let quote = "";
  if (pair.includes("/")) [base, quote] = pair.split("/");
  else {
    for (const q of KRAKEN_QUOTES) {
      if (pair.endsWith(q) && pair.length > q.length) {
        base = pair.slice(0, -q.length);
        quote = q;
        break;
      }
    }
  }
  const norm = (c: string) => {
    // Legacy-Codes mit X-/Z-Präfix (XXBT, XETH, ZEUR) auf 3 Zeichen kürzen
    const kurz = c.length === 4 && /^[XZ]/.test(c) ? c.slice(1) : c;
    return KRAKEN_ALIAS[kurz] ?? kurz;
  };
  return { base: norm(base), quote: norm(quote) };
}

/** Quote-Währung eines Binance-Paars (Suffix). */
function binanceQuote(pair: string): string {
  const cleaned = (pair || "").toUpperCase().replace(/[^A-Z0-9/-]/g, "");
  if (/[/-]/.test(cleaned)) return cleaned.split(/[/-]/)[1] ?? "";
  const quotes = ["EUR", "USDT", "USDC", "BUSD", "FDUSD", "USD", "BTC", "ETH", "BNB", "GBP", "CHF", "TRY"];
  for (const q of quotes) if (cleaned.endsWith(q) && cleaned.length > q.length) return q;
  return "";
}

// ============================================================
// Binance Spot Trade History
// ============================================================
// Headers (typical export 2024+):
// "Date(UTC)","Pair","Side","Price","Executed","Amount","Fee"

function parseBinance(csv: string): ParseResult {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim());
  const errors: string[] = [];
  const trades: ParsedTrade[] = [];
  if (lines.length < 2) {
    return { trades, errors: ["CSV hat keine Daten-Zeilen"], format: "binance" };
  }
  const header = splitCsvLine(lines[0]).map((h) => h.toLowerCase().replace(/[^a-z]/g, ""));
  const idxDate = header.findIndex((h) => h.includes("date"));
  const idxPair = header.findIndex((h) => h.includes("pair"));
  const idxSide = header.findIndex((h) => h.includes("side") || h.includes("type"));
  const idxPrice = header.findIndex((h) => h === "price");
  const idxExecuted = header.findIndex((h) => h.includes("executed"));
  const idxAmount = header.findIndex((h) => h === "amount");
  const idxFee = header.findIndex((h) => h.includes("fee"));

  if (idxDate === -1 || idxPair === -1 || idxSide === -1 || idxExecuted === -1) {
    errors.push("Binance-Header nicht erkannt. Erwartet: Date, Pair, Side, Executed, Price, Amount, Fee.");
    return { trades, errors, format: "binance" };
  }

  const skipped: SkippedRow[] = [];
  const hinweise: SkippedRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i]);
    if (cols.length < 5) continue;
    const sideRaw = cols[idxSide]?.toUpperCase() ?? "";
    if (!["BUY", "SELL"].includes(sideRaw)) continue;
    const pair = cols[idxPair] ?? "";
    const asset = assetFromPair(pair);
    const quote = binanceQuote(pair);
    if (quote !== "EUR") {
      // Preis in USDT/BTC/… ist kein Euro-Wert → nie stillschweigend als EUR übernehmen (§23 EStG rechnet in EUR)
      skipped.push({ zeile: i + 1, grund: `${pair}: Kurs in ${quote || "unbekannter Währung"}, nicht EUR — bitte mit EUR-Tageskurs manuell erfassen` });
      continue;
    }
    // "Executed" enthält oft "0.00120000BTC" — Asset-Suffix entfernen
    const executedRaw = cols[idxExecuted] ?? "";
    const amountStr = executedRaw.replace(/[A-Z]+$/i, "");
    const amount = Math.abs(parseNum(amountStr));
    const price = idxPrice !== -1 ? parseNum(cols[idxPrice]?.replace(/[A-Z]+$/i, "")) : 0;
    const feeRaw = (idxFee !== -1 ? cols[idxFee] : "0") ?? "0";
    const feeCur = (feeRaw.match(/[A-Z]+$/i)?.[0] ?? "EUR").toUpperCase();
    let fee = Math.abs(parseNum(feeRaw.replace(/[A-Z]+$/i, "")));
    if (amount === 0 || price === 0 || !asset) {
      skipped.push({ zeile: i + 1, grund: "Menge, Preis oder Asset fehlt" });
      continue;
    }
    if (feeCur === asset) fee = fee * price; // Gebühr in Coin-Einheiten → in EUR
    else if (feeCur !== "EUR" && fee > 0) {
      // Trade wird übernommen, nur die Gebühr fehlt → Hinweis, keine verworfene Zeile
      hinweise.push({ zeile: i + 1, grund: `Gebühr in ${feeCur} nicht übernommen (kein EUR-Kurs) — bitte manuell ergänzen` });
      fee = 0;
    }
    trades.push({
      type: sideRaw === "BUY" ? "buy" : "sell",
      asset,
      amount,
      preisProEinheit: price,
      fee,
      datum: parseDate(cols[idxDate]),
    });
  }
  return { trades, errors, format: "binance", skipped, hinweise };
}

// ============================================================
// Kraken trades.csv
// ============================================================
// Headers: "txid","ordertxid","pair","time","type","ordertype","price","cost","fee","vol","margin","misc","ledgers"

function parseKraken(csv: string): ParseResult {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim());
  const errors: string[] = [];
  const trades: ParsedTrade[] = [];
  if (lines.length < 2) return { trades, errors: ["CSV hat keine Daten-Zeilen"], format: "kraken" };

  const header = splitCsvLine(lines[0]).map((h) => h.toLowerCase().replace(/"/g, ""));
  const idx = (name: string) => header.indexOf(name);
  const iPair = idx("pair");
  const iTime = idx("time");
  const iType = idx("type");
  const iPrice = idx("price");
  const iVol = idx("vol");
  const iFee = idx("fee");

  if (iPair === -1 || iTime === -1 || iType === -1 || iVol === -1) {
    errors.push("Kraken-Header nicht erkannt. Erwartet: pair, time, type, price, vol, fee.");
    return { trades, errors, format: "kraken" };
  }

  const skipped: SkippedRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i]);
    if (cols.length < 6) continue;
    const typeRaw = cols[iType]?.toLowerCase().replace(/"/g, "") ?? "";
    if (!["buy", "sell"].includes(typeRaw)) continue;
    // Kraken-Spezifika: XXBTZEUR → BTC/EUR, XETHZEUR → ETH/EUR, XDG → DOGE
    const { base: asset, quote } = krakenPair(cols[iPair]?.replace(/"/g, "") ?? "");
    if (quote !== "EUR") {
      skipped.push({ zeile: i + 1, grund: `${cols[iPair]}: Kurs in ${quote || "unbekannter Währung"}, nicht EUR — bitte mit EUR-Tageskurs manuell erfassen` });
      continue;
    }
    const amount = Math.abs(parseNum(cols[iVol]?.replace(/"/g, "") ?? "0"));
    const price = Math.abs(parseNum(cols[iPrice]?.replace(/"/g, "") ?? "0"));
    const fee = iFee !== -1 ? Math.abs(parseNum(cols[iFee]?.replace(/"/g, "") ?? "0")) : 0;
    if (amount === 0 || price === 0 || !asset) {
      skipped.push({ zeile: i + 1, grund: "Menge, Preis oder Asset fehlt" });
      continue;
    }
    trades.push({
      type: typeRaw as "buy" | "sell",
      asset,
      amount,
      preisProEinheit: price,
      fee,
      datum: parseDate(cols[iTime]?.replace(/"/g, "") ?? ""),
    });
  }
  return { trades, errors, format: "kraken", skipped };
}

// ============================================================
// Coinbase Transactions
// ============================================================
// Headers: "Timestamp","Transaction Type","Asset","Quantity Transacted",
//   "Spot Price Currency","Spot Price at Transaction","Subtotal",
//   "Total (inclusive of fees and/or spread)","Fees and/or Spread","Notes"

function parseCoinbase(csv: string): ParseResult {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim());
  const errors: string[] = [];
  const trades: ParsedTrade[] = [];
  if (lines.length < 2) return { trades, errors: ["CSV hat keine Daten-Zeilen"], format: "coinbase" };

  // Coinbase-CSV hat oft Disclaimer in den ersten Zeilen — Header-Zeile suchen
  const headerIdx = lines.findIndex((l) => l.toLowerCase().includes("transaction type"));
  if (headerIdx === -1) {
    errors.push("Coinbase-Header 'Transaction Type' nicht gefunden.");
    return { trades, errors, format: "coinbase" };
  }
  const header = splitCsvLine(lines[headerIdx]).map((h) => h.toLowerCase());
  const idxTime = header.findIndex((h) => h.includes("timestamp"));
  const idxType = header.findIndex((h) => h.includes("transaction type"));
  const idxAsset = header.findIndex((h) => h === "asset");
  const idxQty = header.findIndex((h) => h.includes("quantity transacted"));
  // Ältere Exporte: "Spot Price at Transaction", neuere: "Price at Transaction"
  const idxPrice = header.findIndex((h) => h.includes("price at transaction"));
  const idxCur = header.findIndex((h) => h.includes("price currency"));
  const idxSubtotal = header.findIndex((h) => h === "subtotal");
  const idxNotes = header.findIndex((h) => h === "notes");
  // Genau die Gebührenspalte ("Fees and/or Spread"), nie "Total (inclusive of fees and/or spread)"
  const idxFee = header.findIndex((h) => h.startsWith("fees") || h === "fee");

  if (idxType === -1 || idxAsset === -1 || idxQty === -1) {
    errors.push("Coinbase-Header nicht vollständig.");
    return { trades, errors, format: "coinbase" };
  }

  const skipped: SkippedRow[] = [];
  const hinweise: SkippedRow[] = [];
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i]);
    if (cols.length < 5) continue;
    const typeRaw = cols[idxType]?.replace(/"/g, "").toLowerCase() ?? "";
    let mappedType: "buy" | "sell" | null = null;
    if (typeRaw === "buy" || typeRaw === "purchase" || typeRaw === "advanced trade buy") mappedType = "buy";
    else if (typeRaw === "sell" || typeRaw === "advanced trade sell") mappedType = "sell";
    else if (typeRaw === "convert") mappedType = "sell"; // Convert = Verkauf + Kauf (Kauf-Zweig unten)
    // Receive/Send/Reward/Stake/Earn ignorieren — keine Käufe
    if (!mappedType) continue;
    const zelle = (idx: number) => (idx !== -1 ? cols[idx]?.replace(/"/g, "") ?? "" : "");
    const cur = zelle(idxCur).trim().toUpperCase();
    if (cur && cur !== "EUR") {
      skipped.push({ zeile: i + 1, grund: `Kurs in ${cur}, nicht EUR — bitte mit EUR-Tageskurs manuell erfassen` });
      continue;
    }
    const asset = zelle(idxAsset).toUpperCase();
    // Neuere Exporte führen Sell/Convert mit negativem Vorzeichen ("-0.1", "-€4000");
    // die Richtung steckt im Transaktionstyp, die Beträge zählen absolut.
    const amount = Math.abs(parseNum(zelle(idxQty) || "0"));
    const price = Math.abs(parseNum(zelle(idxPrice) || "0"));
    const fee = Math.abs(parseNum(zelle(idxFee) || "0"));
    const datum = parseDate(zelle(idxTime));
    if (amount === 0 || price === 0 || !asset) {
      skipped.push({ zeile: i + 1, grund: "Menge, Preis oder Asset fehlt" });
      continue;
    }
    trades.push({ type: mappedType, asset, amount, preisProEinheit: price, fee, datum });
    if (typeRaw === "convert") {
      // Notes: "Converted 0.01 BTC to 0.15 ETH" → empfangener Coin bekommt den Wert als Anschaffungskosten
      const m = zelle(idxNotes).match(/converted\s+([\d.,]+)\s+([A-Za-z0-9]+)\s+to\s+([\d.,]+)\s+([A-Za-z0-9]+)/i);
      const wert = idxSubtotal !== -1 ? Math.abs(parseNum(zelle(idxSubtotal))) : amount * price;
      if (m && parseNum(m[3]) > 0 && wert > 0) {
        const zielMenge = parseNum(m[3]);
        trades.push({ type: "buy", asset: m[4].toUpperCase(), amount: zielMenge, preisProEinheit: wert / zielMenge, fee: 0, datum });
      } else {
        // Verkaufsseite ist übernommen, nur der Kauf des Ziel-Coins fehlt → Hinweis
        hinweise.push({ zeile: i + 1, grund: "Convert ohne lesbare Notiz: Kauf des Ziel-Coins bitte manuell erfassen" });
      }
    }
  }
  return { trades, errors, format: "coinbase", skipped, hinweise };
}

// ============================================================
// Bison (Boerse Stuttgart Crypto)
// ============================================================
// Headers (typisch DE): "Datum","Typ","Anlage","Anzahl","Preis","Wert","Gebühr"

function parseBison(csv: string): ParseResult {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim());
  const errors: string[] = [];
  const trades: ParsedTrade[] = [];
  if (lines.length < 2) return { trades, errors: ["CSV hat keine Daten-Zeilen"], format: "bison" };

  // Bison verwendet Semikolon ODER Komma — auto-detect
  const sep = lines[0].includes(";") ? ";" : ",";
  const splitFn = (line: string) =>
    sep === ";" ? line.split(";").map((s) => s.trim()) : splitCsvLine(line);

  const header = splitFn(lines[0]).map((h) => h.toLowerCase());
  const iDate = header.findIndex((h) => h.includes("datum"));
  const iType = header.findIndex((h) => h.includes("typ") || h.includes("seite"));
  const iAsset = header.findIndex((h) => h.includes("anlage") || h.includes("asset") || h.includes("crypto"));
  const iAmount = header.findIndex((h) => h.includes("anzahl") || h.includes("menge"));
  const iPrice = header.findIndex((h) => h.includes("preis") || h.includes("kurs"));
  const iFee = header.findIndex((h) => h.includes("gebühr") || h.includes("gebuehr") || h.includes("fee"));

  if (iDate === -1 || iType === -1 || iAsset === -1 || iAmount === -1) {
    errors.push("Bison-Header nicht erkannt. Erwartet: Datum, Typ, Anlage, Anzahl, Preis, Gebühr.");
    return { trades, errors, format: "bison" };
  }

  const skipped: SkippedRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitFn(lines[i]);
    if (cols.length < 4) continue;
    const typeRaw = cols[iType]?.toLowerCase() ?? "";
    let mappedType: "buy" | "sell" | null = null;
    // "verkauf" enthält "kauf" → Verkauf zuerst prüfen
    if (typeRaw.includes("verkauf") || typeRaw.includes("sell")) mappedType = "sell";
    else if (typeRaw.includes("kauf") || typeRaw.includes("buy")) mappedType = "buy";
    if (!mappedType) continue;
    const asset = cols[iAsset]?.toUpperCase() ?? "";
    // Richtung steckt im Typ; Vorzeichen in Menge/Preis/Gebühr nicht übernehmen
    const amount = Math.abs(parseNum(cols[iAmount] ?? "0"));
    const price = iPrice !== -1 ? Math.abs(parseNum(cols[iPrice] ?? "0")) : 0;
    const fee = iFee !== -1 ? Math.abs(parseNum(cols[iFee] ?? "0")) : 0;
    if (amount === 0 || price === 0 || !asset) {
      skipped.push({ zeile: i + 1, grund: "Menge, Preis oder Asset fehlt" });
      continue;
    }
    trades.push({
      type: mappedType,
      asset,
      amount,
      preisProEinheit: price,
      fee,
      datum: parseDate(cols[iDate] ?? ""),
    });
  }
  return { trades, errors, format: "bison", skipped };
}
