import { describe, expect, it } from "vitest";
import { fristEnde, haltefristAbgelaufen, freigrenzeParagraph23 } from "@/lib/cryptoSteuer";
import { krakenPair, parseCsv, parseNum } from "@/lib/cryptoCsvParsers";

describe("§23 EStG Haltefrist kalendergenau", () => {
  it("Verkauf am Jahrestag nach Schaltjahr ist noch steuerpflichtig", () => {
    // 15.01.2024 → 15.01.2025 = 366 Tage, Frist endet erst mit Ablauf des 15.01.2025
    expect(haltefristAbgelaufen("2024-01-15", "2025-01-15")).toBe(false);
    expect(haltefristAbgelaufen("2024-01-15", "2025-01-16")).toBe(true);
  });
  it("Kauf am 29.02. → Fristende 28.02. des Folgejahres (§188 Abs. 3 BGB)", () => {
    expect(fristEnde("2024-02-29")).toBe("2025-02-28");
  });
  it("Freigrenze 600 € bis 2023, 1.000 € ab 2024", () => {
    expect(freigrenzeParagraph23(2023)).toBe(600);
    expect(freigrenzeParagraph23(2024)).toBe(1000);
  });
});

describe("Crypto-CSV-Parser Runde 2", () => {
  it("Bison: Verkauf wird als Verkauf erkannt", () => {
    const csv = "Datum;Typ;Anlage;Anzahl;Preis;Gebühr\n01.02.2025;Kauf;BTC;0,1;40000;5\n01.03.2025;Verkauf;BTC;0,05;50000;3";
    const r = parseCsv(csv, "bison");
    expect(r.trades.map((t) => t.type)).toEqual(["buy", "sell"]);
  });
  it("Kraken: XXBTZEUR → BTC/EUR, XETHZEUR → ETH/EUR, XDGEUR → DOGE", () => {
    expect(krakenPair("XXBTZEUR")).toEqual({ base: "BTC", quote: "EUR" });
    expect(krakenPair("XETHZEUR")).toEqual({ base: "ETH", quote: "EUR" });
    expect(krakenPair("XDGEUR")).toEqual({ base: "DOGE", quote: "EUR" });
  });
  it("Binance: USDT-Paare werden nicht als EUR übernommen, sondern gemeldet", () => {
    const csv = '"Date(UTC)","Pair","Side","Price","Executed","Amount","Fee"\n"2025-01-02 10:00:00","BTCUSDT","BUY","40000","0.1BTC","4000USDT","1USDT"\n"2025-01-03 10:00:00","BTCEUR","BUY","38000","0.1BTC","3800EUR","0.0001BTC"';
    const r = parseCsv(csv, "binance");
    expect(r.trades).toHaveLength(1);
    expect(r.trades[0].fee).toBeCloseTo(3.8, 10); // 0,0001 BTC × 38.000 €
    expect(r.skipped?.length).toBe(1);
  });
  it("Coinbase: neuer Spaltenname und Hinweiszeilen", () => {
    const csv = 'You can use this transaction report...\n\nTimestamp,Transaction Type,Asset,Quantity Transacted,Price Currency,Price at Transaction,Subtotal,Total (inclusive of fees and/or spread),Fees and/or Spread,Notes\n2025-01-02T10:00:00Z,Buy,BTC,0.1,EUR,40000,4000,4010,10,';
    const r = parseCsv(csv, "generic");
    expect(r.format).toBe("coinbase");
    expect(r.trades).toHaveLength(1);
    expect(r.trades[0].preisProEinheit).toBe(40000);
  });
  it("parseNum: mehrere Tausenderpunkte und lange Nachkommastellen", () => {
    expect(parseNum("1.234.567")).toBe(1234567);
    expect(parseNum("0,123456789")).toBeCloseTo(0.123456789, 12);
  });
});

describe("Crypto-CSV-Parser Runde 3", () => {
  const kopf = "Timestamp,Transaction Type,Asset,Quantity Transacted,Price Currency,Price at Transaction,Subtotal,Total (inclusive of fees and/or spread),Fees and/or Spread,Notes";
  it("Coinbase: Gebühr aus 'Fees and/or Spread', nicht aus 'Total'", () => {
    const r = parseCsv(`${kopf}\n2025-01-02T10:00:00Z,Buy,BTC,0.1,EUR,€40000,€4000,€4010,€10,`, "coinbase");
    expect(r.trades[0].fee).toBe(10);
  });
  it("Coinbase: negative Sell-Werte zählen absolut", () => {
    const r = parseCsv(`${kopf}\n2025-03-02T10:00:00Z,Sell,BTC,-0.1,EUR,€40000,-€4000,-€3990,€10,`, "coinbase");
    expect(r.trades).toHaveLength(1);
    expect(r.trades[0]).toMatchObject({ type: "sell", amount: 0.1, preisProEinheit: 40000, fee: 10 });
  });
  it("Coinbase: negativer Convert erzeugt Kauf des Ziel-Coins mit Subtotal als Anschaffungskosten", () => {
    const r = parseCsv(`${kopf}\n2025-03-02T10:00:00Z,Convert,BTC,-0.1,EUR,€40000,-€4000,-€3990,€10,Converted 0.1 BTC to 2 ETH`, "coinbase");
    expect(r.trades).toHaveLength(2);
    // 4.000 € / 2 ETH = 2.000 € je ETH
    expect(r.trades[1]).toMatchObject({ type: "buy", asset: "ETH", amount: 2, preisProEinheit: 2000 });
  });
  it("Binance: Gebühr in BNB → Trade übernommen, Hinweis statt verworfener Zeile", () => {
    const csv = '"Date(UTC)","Pair","Side","Price","Executed","Amount","Fee"\n"2025-01-03 10:00:00","BTCEUR","BUY","38000","0.1BTC","3800EUR","0.01BNB"';
    const r = parseCsv(csv, "binance");
    expect(r.trades).toHaveLength(1);
    expect(r.trades[0].fee).toBe(0);
    expect(r.skipped).toHaveLength(0);
    expect(r.hinweise).toHaveLength(1);
  });
});
