import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Callout, ChoiceGroup, EmptyState, Field, KitTable, StatGrid, StatTile, ToolSection } from "@/components/cockpit/kit";
import { cn } from "@/lib/utils";
import {
  Upload,
  Download,
  CheckCircle2,
  Package,
  CreditCard,
  FileText,
  FileUp,
  FileSpreadsheet,
  FlaskConical,
  Layers,
  ListTree,
  Play,
} from "lucide-react";
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
  // Amazon CSV Parser — handhabt Settlement-Reports mit echten amount-description-Werten
  // ============================================================
  function parseAmazon(text: string): ParsedRow[] {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length < 2) throw new Error("CSV leer oder ungültig");

    // Header auch mit splitCsvLine parsen (handhabt Quotes korrekt, falls Header zitiert ist)
    const sep = trennzeichen(lines[0]);
    const header = splitCsvLine(lines[0], sep).map((h) => h.toLowerCase().trim().replace(/^"|"$/g, ""));

    const idxType = findIdx(header, ["transaction-type", "amount-type", "type"]);
    const idxDesc = findIdx(header, ["amount-description", "description"]);
    const idxAmount = findIdx(header, ["amount"]);
    const idxDate = findIdx(header, ["posted-date", "deposit-date", "settlement-start-date", "date"]);
    const idxCurrency = findIdx(header, ["currency"]);

    const result: ParsedRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const row = splitCsvLine(lines[i], sep);
      if (row.length < 3) continue;

      const type = (row[idxType] || "").replace(/^"|"$/g, "");
      const desc = (idxDesc >= 0 ? row[idxDesc] || "" : "").replace(/^"|"$/g, "");
      const amount = parseMoney(row[idxAmount] || "0");
      const date = (idxDate >= 0 ? row[idxDate] || "" : "").replace(/^"|"$/g, "");
      const currency = (idxCurrency >= 0 ? row[idxCurrency] || "EUR" : "EUR").replace(/^"|"$/g, "");

      if (isNaN(amount) || amount === 0) continue;

      // Erst echte amount-description-Mapping (granular), dann fallback auf Buchungs-Code-Lookup
      const mapped = mapAmazonSettlementLine(type, desc, amount);
      if (mapped) {
        result.push({ date, type, description: desc, amount, currency, ...mapped });
        continue;
      }

      // Letzte Chance: Buchungs-Code-Lookup (für CSVs mit AMA-SG-DE-XXX Codes)
      const lookup = lookupAmazonCode(desc || type);
      const matched = lookup.sub || lookup.prefix;
      result.push({
        date, type, description: desc, amount, currency,
        category: matched?.label ?? mapAmazonCategoryFallback(type, desc),
        skr03: matched?.skr03,
        skr04: matched?.skr04,
      });
    }
    return result;
  }

  /** Mappt typische Amazon-Settlement-amount-description-Werte auf Kategorie + SKR03/04. */
  function mapAmazonSettlementLine(
    type: string,
    desc: string,
    amount: number,
  ): { category: string; skr03?: string; skr04?: string } | null {
    const d = desc.toLowerCase().trim();
    const t = type.toLowerCase().trim();
    const both = `${t} ${d}`;
    const isRefundContext = t === "refund" || t === "chargeback" || d.includes("refund") || d.includes("chargeback");

    // Refund/Chargeback ZUERST prüfen — überschreibt sonst 'Principal' → Erlöse
    if (isRefundContext && (d === "principal" || d === "")) {
      return { category: "Refund (Erlösschmälerung)", skr03: "8720 Erlösschmälerungen 19 % USt", skr04: "4720 Erlösschmälerungen 19 % USt" };
    }
    if (isRefundContext && (d === "shipping" || d === "giftwrap")) {
      return { category: "Refund Versand/GiftWrap (Erlösschmälerung)", skr03: "8720 Erlösschmälerungen 19 % USt", skr04: "4720 Erlösschmälerungen 19 % USt" };
    }

    // Verkauf-Erlöse
    if (d === "principal") return { category: "Verkaufserlöse (Principal)", skr03: "8400 Erlöse 19% USt", skr04: "4400 Erlöse 19% USt" };
    if (d === "tax" || d === "shippingtax" || d === "giftwraptax" || d === "marketplacefacilitatorvat-principal") {
      return { category: "USt-Anteil (durchlaufend)", skr03: "1776 USt 19%", skr04: "3806 USt 19%" };
    }
    if (d === "shipping" || d === "shippingchargeback") return { category: "Versanderlöse", skr03: "8400 Erlöse Versand 19%", skr04: "4400 Erlöse Versand 19%" };
    if (d === "giftwrap" || d === "giftwrapchargeback") return { category: "Geschenkverpackungs-Erlöse", skr03: "8400 Erlöse 19%", skr04: "4400 Erlöse 19%" };

    // Provisionen (negativ = Aufwand, positiv = Refund-Gutschrift)
    if (d === "commission" || d === "fixedclosingfee" || d === "variableclosingfee") {
      return { category: "Verkaufsprovision (Referral Fee)", skr03: "3100 Fremdleistungen (Schlüssel 9)", skr04: "5900 Fremdleistungen" };
    }
    if (d === "refundcommission") return { category: "Provisionsgutschrift bei Refund", skr03: "3100 Fremdleistungen (Schlüssel 9)", skr04: "5900 Fremdleistungen" };

    // FBA
    if (d.startsWith("fba per unit") || d === "fbaperunitfulfillmentfee" || d.includes("pick&pack") || d.includes("pickandpack")) {
      return { category: "FBA Pick&Pack", skr03: "3100 FBA-Fees (Schlüssel 9)", skr04: "5900 FBA-Fees" };
    }
    if (d === "fbaweighthandling" || d === "fba weight handling fee") return { category: "FBA Weight Handling", skr03: "3100 FBA-Fees (Schlüssel 9)", skr04: "5900 FBA-Fees" };
    if (d.includes("fbastoragefee") || d.includes("storage fee") || (d.includes("storage") && !d.includes("longterm"))) {
      return { category: "FBA Storage Fee", skr03: "4210 Mieten (FBA-Lager)", skr04: "6310 Mieten" };
    }
    if (d.includes("longtermstorage") || d.includes("long term storage")) return { category: "FBA Long-Term Storage", skr03: "4210 Mieten (FBA-Lager)", skr04: "6310 Mieten" };
    if (d.includes("inboundtransportation") || d.includes("inboundshipping") || d.includes("inbound shipping")) {
      return { category: "FBA Inbound-Versand", skr03: "3800 Bezugsnebenkosten", skr04: "5840 Bezugsnebenkosten" };
    }
    if (d.includes("disposal") || d.includes("removalfee") || d.includes("removal fee")) {
      return { category: "FBA Removal/Disposal", skr03: "4900 Sonstige Aufwendungen", skr04: "6300 Sonstige Aufwendungen" };
    }

    // Werbung
    if (d.includes("advertising") || d.includes("sponsored") || d.includes("headline") || d.includes("ppc") || t === "advertising") {
      return { category: "Amazon Werbung (PPC/Sponsored)", skr03: "4600 Werbekosten", skr04: "6600 Werbekosten" };
    }

    // Subscription / Account-Fees
    if (d.includes("subscription") || t.includes("subscription")) {
      return { category: "Subscription/Pro-Account-Gebühr", skr03: "4910 Software / Sonstige Abos", skr04: "6815 Sonstige Abos" };
    }

    // Refunds / Erlösschmälerungen
    if (t === "refund" && (d === "" || d === "principal")) {
      return { category: "Refund (Erlösschmälerung)", skr03: "8720 Erlösschmälerungen 19 % USt", skr04: "4720 Erlösschmälerungen 19 % USt" };
    }
    if (t === "chargeback" || d.includes("chargeback")) {
      return { category: "Chargeback / A-to-Z", skr03: "8720 Erlösschmälerungen 19 % USt", skr04: "4720 Erlösschmälerungen 19 % USt" };
    }

    // Auszahlungen / Reserve
    if (t.includes("transfer") || d.includes("payout") || d.includes("disburse")) {
      return { category: "Auszahlung (Geldtransit)", skr03: "1360 Geldtransit", skr04: "1460 Geldtransit" };
    }
    if (d.includes("reserve") || t.includes("reserve")) {
      return { category: "Reserve (kein BuchungsImpact)", skr03: "—", skr04: "—" };
    }

    // Adjustments / Gutschrift / Lending
    if (t === "adjustment" || d.includes("adjustment")) {
      return { category: amount > 0 ? "Sonstige Erträge (Anpassung)" : "Sonstige Aufwendungen (Anpassung)", skr03: amount > 0 ? "2700 Sonstige Erträge" : "4900 Sonstige Aufwendungen", skr04: amount > 0 ? "4830 Sonstige betriebliche Erträge" : "6300 Sonstige Aufwendungen" };
    }

    // Coupons / Promotional Rebates (mindern Erlöse — Erlösschmälerung)
    if (d.includes("coupon") || d.includes("promorebate") || d.includes("promotional rebate") || d.includes("promotionmetafee") || d === "promotionrebates") {
      return { category: "Coupon / Promotional Rebate (Erlösschmälerung)", skr03: "8720 Erlösschmälerungen 19 % USt", skr04: "4720 Erlösschmälerungen 19 % USt" };
    }

    // Goodwill / Concessions (Kulanz-Erstattung)
    if (d.includes("goodwill") || d.includes("concession")) {
      return { category: "Goodwill/Kulanz-Erstattung (Erlösschmälerung)", skr03: "8720 Erlösschmälerungen 19 % USt", skr04: "4720 Erlösschmälerungen 19 % USt" };
    }

    // SAFE-T Reimbursement (Erstattung bei verlorenen/beschädigten FBA-Items)
    if (d.includes("safe-t") || d.includes("safet") || d.includes("warehouse damage") || d.includes("lost inventory reimbursement") || d.includes("lost_inventory_reimbursement")) {
      // Echter Schadenersatz, nicht steuerbar → kein Erlöskonto mit USt-Automatik (8400 = Erlöse 19 %)
      return { category: "SAFE-T / FBA-Reimbursement (Schadenersatz, ohne USt)", skr03: "2742 Versicherungsentschädigungen und Schadenersatz", skr04: "4970 Versicherungsentschädigungen und Schadenersatz" };
    }

    // FBA Return Per Order Fee
    if (d.includes("returnperorder") || d.includes("return per order")) {
      return { category: "FBA Return-Processing-Fee", skr03: "3100 FBA-Fees (Schlüssel 9)", skr04: "5900 FBA-Fees" };
    }

    // Amazon Lending / Capital
    if (t.includes("lending") || d.includes("lending") || d.includes("loan disbursement") || d.includes("loan repayment")) {
      return { category: "Amazon Lending (Kreditgewährung/-rückzahlung)", skr03: amount > 0 ? "1700 Sonst. Verbindlichkeiten (Loan)" : "1700 Sonst. Verbindlichkeiten (Tilgung)", skr04: "3500 Sonst. Verbindlichkeiten" };
    }

    // Compensated Clawback (Amazon zieht eine vorherige Erstattung zurück)
    if (d.includes("compensatedclawback") || d.includes("compensated clawback") || d.includes("a-to-z guarantee claim")) {
      return { category: "A-to-Z / Compensated Clawback", skr03: "8720 Erlösschmälerungen 19 % USt", skr04: "4720 Erlösschmälerungen 19 % USt" };
    }

    // Service Fee (z.B. EFN-, MCI-, Multichannel-Service)
    if (d.includes("servicefee") || d === "service fee") {
      return { category: "Amazon Service-Fee (EFN/MCI/MFN)", skr03: "3100 Fremdleistungen (Schlüssel 9)", skr04: "5900 Fremdleistungen" };
    }

    void both;
    return null;
  }

  function mapAmazonCategoryFallback(type: string, desc: string): string {
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

  /** Robust money parser: erkennt DE-Format (1.234,56) UND EN-Format (1,234.56 oder 1234.56). */
  function parseMoney(raw: string): number {
    if (!raw) return 0;
    const s = raw.trim().replace(/\s/g, "").replace(/[€$£"]/g, "");
    if (!s || !/^-?[\d.,]+$/.test(s)) return NaN;
    const hasComma = s.includes(",");
    const hasDot = s.includes(".");
    let n: string;
    if (hasComma && hasDot) {
      // Letztes Zeichen entscheidet — Komma/Punkt mit größerem Index ist Dezimaltrenner
      n = s.lastIndexOf(",") > s.lastIndexOf(".") ? s.replace(/\./g, "").replace(",", ".") : s.replace(/,/g, "");
    } else if (hasComma) {
      n = s.replace(",", ".");
    } else {
      // Nur Punkte: wenn ≥2 Punkte ODER Punkt mit 3 Nachkommastellen → Tausender
      const parts = s.split(".");
      n = parts.length > 2 || (parts.length === 2 && parts[1].length === 3 && parts[0].length <= 3)
        ? s.replace(/\./g, "")
        : s;
    }
    const v = parseFloat(n);
    return Number.isFinite(v) ? v : NaN;
  }

  // ============================================================
  // Stripe Payout-Parser — handhabt sowohl Dashboard-CSV (Decimal) als auch
  // API-Export balance_transactions.csv (Cent) via Auto-Erkennung.
  // ============================================================
  function parseStripe(text: string): ParsedRow[] {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length < 2) throw new Error("CSV leer oder ungültig");

    const sep = trennzeichen(lines[0]);
    const header = splitCsvLine(lines[0], sep).map((h) => h.toLowerCase().trim().replace(/^"|"$/g, ""));

    const idxType = findIdx(header, ["reporting_category", "type"]);
    const idxAmount = findIdx(header, ["amount", "gross"]);
    const idxFee = findIdx(header, ["fee"]);
    const idxNet = findIdx(header, ["net"]);
    const idxDate = findIdx(header, ["created", "available_on", "available_on_date", "date"]);
    const idxDesc = findIdx(header, ["description", "memo"]);
    const idxCurrency = findIdx(header, ["currency"]);

    // === Schritt 1: alle Zeilen einlesen (raw amounts) ===
    type Raw = { type: string; amount: number; fee: number; date: string; desc: string; currency: string };
    const raws: Raw[] = [];
    for (let i = 1; i < lines.length; i++) {
      const row = splitCsvLine(lines[i], sep);
      if (row.length < 3) continue;
      const type = (row[idxType] || "").replace(/^"|"$/g, "");
      const amount = parseMoney(row[idxAmount] || "0");
      const fee = idxFee >= 0 ? parseMoney(row[idxFee] || "0") : 0;
      const date = (idxDate >= 0 ? row[idxDate] || "" : "").replace(/^"|"$/g, "");
      const desc = (idxDesc >= 0 ? row[idxDesc] || "" : "").replace(/^"|"$/g, "");
      const currency = (idxCurrency >= 0 ? row[idxCurrency] || "EUR" : "EUR").replace(/^"|"$/g, "");
      if (isNaN(amount) || amount === 0) continue;
      raws.push({ type, amount, fee: isNaN(fee) ? 0 : fee, date, desc, currency });
    }
    if (raws.length === 0) throw new Error("Keine gültigen Zeilen gefunden");

    // === Schritt 2: Cent-vs-Decimal Auto-Erkennung ===
    // Stripe API-Export liefert Cent (Integer ohne Komma), Dashboard-Export Decimal.
    // Heuristik: wenn ≥80% der amounts ganzzahlig UND |median| > 100 → Cent
    const integerCount = raws.filter((r) => Number.isInteger(r.amount)).length;
    const integerRatio = integerCount / raws.length;
    const absAmounts = raws.map((r) => Math.abs(r.amount)).sort((a, b) => a - b);
    const median = absAmounts[Math.floor(absAmounts.length / 2)];
    const isCent = integerRatio >= 0.8 && median >= 100;
    const divisor = isCent ? 100 : 1;

    // === Schritt 3: Fee-Spalte vs. separate fee-Zeile dedup ===
    // Wenn die CSV bereits eine "stripe_fee"-/"fee"-Zeile separat hat, dürfen wir
    // die fee-Spalte einer Charge nicht NOCHMAL als eigene Zeile anlegen.
    const hasExplicitFeeRows = raws.some((r) => {
      const t = r.type.toLowerCase();
      return t === "stripe_fee" || t === "fee" || t === "application_fee";
    });

    const result: ParsedRow[] = [];
    for (const r of raws) {
      const amount = r.amount / divisor;
      const fee = r.fee / divisor;
      const t = r.type.toLowerCase();
      const category = mapStripeCategory(t, r.desc);
      const skr03 = mapStripeSkr03(t, amount, r.desc);
      const skr04 = mapStripeSkr04(t, amount, r.desc);
      result.push({ date: r.date, type: r.type, description: r.desc, amount, currency: r.currency, category, skr03, skr04 });

      // Fee nur als separate Zeile anlegen WENN die CSV nicht selbst fee-Zeilen hat
      if (!hasExplicitFeeRows && fee !== 0) {
        result.push({
          date: r.date,
          type: "fee",
          description: `Stripe-Fee zu ${r.type}`,
          amount: -Math.abs(fee),
          currency: r.currency,
          category: "Stripe-Gebühren",
          skr03: "3100 Fremdleistungen (Schlüssel 9)",
          skr04: "5900 Fremdleistungen",
        });
      }
    }
    void idxNet;
    return result;
  }

  function mapStripeCategory(type: string, desc: string): string {
    const d = desc.toLowerCase();
    // Trinkgeld zuerst — bevor charge-Match greift (Trinkgeld kommt oft als type=charge)
    if (d.includes("tip") || d.includes("trinkgeld") || d.includes("gratuity")) return "Trinkgeld";
    // reporting_category: charge, refund, dispute, fee, payout, advance, transfer, tax, partial_capture_reversal etc.
    if (type === "charge" || type === "payment" || type.includes("charge") || type.includes("payment")) return "Verkaufserlöse";
    if (type === "partial_capture_reversal" || type === "refund" || type.includes("refund")) return "Refunds / Erlösschmälerungen";
    if (type === "dispute" || type === "dispute_reversal" || type.includes("dispute") || type.includes("chargeback")) return "Chargebacks / Disputes";
    if (type === "tax") return "Stripe Tax (USt-Anteil)";
    if (type === "issuing_authorization" || type === "issuing_transaction") return "Stripe Issuing (Karten-Aktion)";
    if (type === "fee_refund" || type === "application_fee_refund") return "Fee-Gutschrift";
    if (type === "advance" || type === "advance_funding") return "Stripe Capital (Vorfinanzierung)";
    if (type === "fee" || type === "stripe_fee" || type === "application_fee" || type.includes("fee")) return "Stripe-Gebühren";
    if (type === "payout" || type === "payout_failure" || type === "transfer" || type.includes("payout") || type.includes("transfer")) return "Auszahlungen (Geldtransit)";
    if (type === "topup" || type === "topup_reversal") return "Stripe Top-up (Einzahlung)";
    if (type === "adjustment" || type.includes("adjustment")) return "Adjustments";
    if (type === "connect_collection_transfer" || type === "connect_reserved_funds") return "Stripe Connect Transfer";
    if (type === "reserved_funds") return "Reserve (kein BuchungsImpact)";
    if (d.includes("tip") || d.includes("trinkgeld") || d.includes("gratuity")) return "Trinkgeld";
    return "Sonstiges";
  }

  function mapStripeSkr03(type: string, amount: number, desc = ""): string {
    const d = desc.toLowerCase();
    if (d.includes("tip") || d.includes("trinkgeld") || d.includes("gratuity")) return "8400 Erlöse Trinkgeld 19% USt";
    if (type === "charge" || type === "payment" || type.includes("charge") || type.includes("payment")) return "8400 Erlöse 19% USt";
    if (type === "tax") return "1776 USt 19% (durchlaufend)";
    if (type === "refund" || type === "partial_capture_reversal" || type.includes("refund")) return "8720 Erlösschmälerungen 19 % USt";
    if (type === "dispute" || type.includes("dispute") || type.includes("chargeback")) return "8720 Erlösschmälerungen 19 % USt";
    // Zahlungsabwicklung ist Finanzdienstleistung (§ 4 Nr. 8 UStG, steuerfrei) → kein BU 9, Nebenkosten des Geldverkehrs
    if (type === "fee" || type === "stripe_fee" || type === "application_fee" || type.includes("fee")) return "4970 Nebenkosten des Geldverkehrs (ohne Vorsteuer)";
    if (type === "payout" || type === "transfer" || type === "topup" || type.includes("payout") || type.includes("transfer")) return "1360 Geldtransit";
    if (type === "advance") return "1700 Sonst. Verbindlichkeiten (Capital-Loan)";
    return amount > 0 ? "2700 Sonstige Erträge" : "4900 Sonstige Aufwendungen";
  }

  function mapStripeSkr04(type: string, amount: number, desc = ""): string {
    const d = desc.toLowerCase();
    if (d.includes("tip") || d.includes("trinkgeld") || d.includes("gratuity")) return "4400 Erlöse Trinkgeld 19% USt";
    if (type === "charge" || type === "payment" || type.includes("charge") || type.includes("payment")) return "4400 Erlöse 19% USt";
    if (type === "tax") return "3806 USt 19% (durchlaufend)";
    if (type === "refund" || type === "partial_capture_reversal" || type.includes("refund")) return "4720 Erlösschmälerungen 19 % USt";
    if (type === "dispute" || type.includes("dispute") || type.includes("chargeback")) return "4720 Erlösschmälerungen 19 % USt";
    if (type === "fee" || type === "stripe_fee" || type === "application_fee" || type.includes("fee")) return "6855 Nebenkosten des Geldverkehrs (ohne Vorsteuer)";
    if (type === "payout" || type === "transfer" || type === "topup" || type.includes("payout") || type.includes("transfer")) return "1460 Geldtransit";
    if (type === "advance") return "3500 Sonst. Verbindlichkeiten (Capital-Loan)";
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

  /** Trennzeichen je Datei aus der Kopfzeile bestimmen (sonst zerbrechen deutsche Dezimalzahlen in TSV/CSV mit ;). */
  function trennzeichen(headerLine: string): string {
    const zaehle = (c: string) => headerLine.split(c).length - 1;
    const tabs = zaehle("\t");
    const semis = zaehle(";");
    const kommas = zaehle(",");
    if (tabs >= semis && tabs >= kommas && tabs > 0) return "\t";
    if (semis >= kommas && semis > 0) return ";";
    return ",";
  }

  function splitCsvLine(line: string, sep = ","): string[] {
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
      } else if (c === sep && !inQuote) {
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

  const eur = (n: number) => Math.round(n).toLocaleString("de-DE");
  const ladeDemo = () => {
    const demo = mode === "amazon" ? AMAZON_DEMO_CSV : STRIPE_DEMO_CSV;
    setCsvText(demo);
    parseCsv(demo);
  };

  return (
    <CockpitShell
      eyebrow="Buchhaltung · Settlement-Parser"
      title={mode === "amazon" ? "Amazon-Settlement-Parser" : "Stripe-Payout-Parser"}
      subtitle={
        mode === "amazon"
          ? "Lade den Settlement-Bericht aus Seller Central hoch: Jede Zeile wird nach Gebührenart aufgeteilt und mit einem SKR03/04-Konto versehen. Grundlage sind die 130+ Codes aus dem Amazon-Buchungstexte-Tool."
          : "Lade den Stripe-Payout-Export hoch: Verkäufe, Gebühren, Erstattungen, Chargebacks, Trinkgelder und Auszahlungen werden getrennt und mit SKR03/04-Konten versehen."
      }
    >
      <ChoiceGroup
        className="mb-6"
        label="Quelle wählen"
        value={mode}
        onChange={switchMode}
        options={[
          { value: "amazon", label: <span className="inline-flex items-center gap-2"><Package className="h-4 w-4" aria-hidden="true" /> Amazon-Settlement</span> },
          { value: "stripe", label: <span className="inline-flex items-center gap-2"><CreditCard className="h-4 w-4" aria-hidden="true" /> Stripe-Payout</span> },
        ]}
      />

      {/* Upload */}
      <ToolSection
        className="mb-6"
        icon={Upload}
        title={`${mode === "amazon" ? "Amazon-Settlement-CSV" : "Stripe-Payout-CSV"} hochladen`}
        description={
          mode === "amazon"
            ? "Seller Central → Berichte → Zahlungen → Alle Abrechnungen → Settlement-Bericht als Flat-File herunterladen. Benötigte Spalten: transaction-type, amount-description, amount, posted-date, currency."
            : "Stripe Dashboard → Zahlungen → Auszahlungen → CSV-Export. Ausführlicher: Berichte → Alle Transaktionen → Export."
        }
        actions={
          <Button variant="outline" size="sm" onClick={ladeDemo}>
            <FlaskConical aria-hidden="true" /> Demo-CSV laden
          </Button>
        }
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Datei wählen" htmlFor="sp-file" hint="Die Datei wird nur in deinem Browser ausgewertet.">
            <label
              htmlFor="sp-file"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary/30 px-4 py-6 text-center transition-colors hover:border-accent-blue/40 hover:bg-accent/50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-blue">
                <FileUp className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium">Datei auswählen</span>
              <span className="text-xs text-muted-foreground">CSV, TSV oder TXT</span>
              <input id="sp-file" type="file" accept=".csv,.tsv,.txt" onChange={onFile} className="sr-only" />
            </label>
          </Field>
          <Field label="Oder CSV-Text einfügen" htmlFor="sp-text" hint="Wird beim Verlassen des Feldes automatisch ausgewertet.">
            <textarea
              id="sp-text"
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              onBlur={() => csvText && parseCsv(csvText)}
              placeholder={
                mode === "amazon"
                  ? "settlement-id,transaction-type,amount-description,amount,..."
                  : "id,type,amount,fee,net,currency,available_on,..."
              }
              className="h-[8.25rem] w-full rounded-md border border-input bg-card px-3 py-2 font-mono text-xs shadow-[0_1px_2px_hsl(var(--primary)/0.04)] transition-[border-color,box-shadow] focus:border-ring focus:outline-none focus:ring-[3px] focus:ring-ring/25"
            />
          </Field>
        </div>
        {csvText && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => parseCsv(csvText)}>
              <Play aria-hidden="true" /> CSV auswerten
            </Button>
          </div>
        )}
        {error && (
          <Callout tone="danger" title="Die CSV konnte nicht gelesen werden" className="mt-4">
            {error}
          </Callout>
        )}
      </ToolSection>

      {/* Results */}
      {rows.length > 0 ? (
        <>
          <StatGrid cols={3} className="mb-6">
            <StatTile label="Zeilen erkannt" value={rows.length.toLocaleString("de-DE")} />
            <StatTile label="Summe Gutschriften" value={`+${eur(totalIn)} €`} tone="success" emphasis />
            <StatTile label="Summe Belastungen" value={`${eur(totalOut)} €`} tone="danger" emphasis />
          </StatGrid>

          <ToolSection
            className="mb-6"
            icon={Layers}
            title="Summen nach Kategorie"
            description="Sortiert nach Betrag. Der Export enthält zusätzlich die SKR03- und SKR04-Konten."
            actions={
              <Button variant="outline" size="sm" onClick={exportSummary}>
                <Download aria-hidden="true" /> Zusammenfassung als CSV
              </Button>
            }
          >
            <KitTable caption="Summen nach Kategorie">
              <thead>
                <tr>
                  <th>Kategorie</th>
                  <th className="!text-right">Anzahl</th>
                  <th className="!text-right">Summe</th>
                </tr>
              </thead>
              <tbody>
                {summary.map((s) => (
                  <tr key={s.category}>
                    <td className="font-medium">{s.category}</td>
                    <td className="text-right text-muted-foreground">{s.count}</td>
                    <td className={cn("whitespace-nowrap text-right font-semibold", s.sum >= 0 ? "text-success" : "text-danger")}>
                      {s.sum >= 0 ? "+" : ""}
                      {eur(s.sum)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </KitTable>
          </ToolSection>

          <ToolSection
            className="mb-6"
            icon={ListTree}
            title="Einzelzeilen"
            description={rows.length > 100 ? "Die ersten 100 Zeilen. Für die vollständige Liste die Zusammenfassung exportieren." : "Alle Zeilen mit vorgeschlagenem SKR03-Konto."}
          >
            <KitTable caption="Einzelzeilen des Berichts" className="max-h-[520px] overflow-y-auto">
              <thead className="sticky top-0">
                <tr>
                  <th>Datum</th>
                  <th>Typ</th>
                  <th>Kategorie</th>
                  <th>SKR03</th>
                  <th className="!text-right">Betrag</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 100).map((r, i) => (
                  <tr key={i}>
                    <td className="whitespace-nowrap text-muted-foreground">{r.date?.slice(0, 10) || "n/a"}</td>
                    <td className="font-mono text-xs">{r.type}</td>
                    <td>{r.category}</td>
                    <td className="text-xs text-muted-foreground">{r.skr03 || "n/a"}</td>
                    <td className={cn("whitespace-nowrap text-right font-medium", r.amount >= 0 ? "text-success" : "text-danger")}>
                      {r.amount >= 0 ? "+" : ""}
                      {r.amount.toFixed(2)} {r.currency || "€"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </KitTable>
            {rows.length > 100 && (
              <p className="mt-3 text-xs text-muted-foreground tabular">
                {rows.length - 100} Zeilen mehr, im CSV-Export vollständig enthalten.
              </p>
            )}
          </ToolSection>
        </>
      ) : (
        <EmptyState
          className="mb-6"
          icon={FileSpreadsheet}
          title="Noch kein Bericht ausgewertet"
          description={
            mode === "amazon"
              ? "Lade deinen Settlement-Bericht hoch oder probiere es mit der Demo-CSV. Danach siehst du Summen je Gebührenart und die passenden Konten."
              : "Lade deinen Payout-Export hoch oder probiere es mit der Demo-CSV. Danach siehst du Summen je Kategorie und die passenden Konten."
          }
          action={
            <Button variant="outline" onClick={ladeDemo}>
              <FlaskConical aria-hidden="true" /> Demo-CSV laden
            </Button>
          }
        />
      )}

      {/* Tipps */}
      <ToolSection icon={FileText} title={mode === "amazon" ? "Amazon-Settlement: so gehst du vor" : "Stripe-Payout: so gehst du vor"}>
        <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
          {mode === "amazon" ? (
            <>
              <Tipp titel="Wann CSV ziehen">
                Nach jedem Settlement (Auszahlung alle 14 Tage). Die komplette Historie liegt unter Berichte → Zahlungen.
              </Tipp>
              <Tipp titel="Zuordnung">
                Nutzt automatisch die 130+ Codes aus dem{" "}
                <a href="/cockpit/amazon-buchungen" className="font-medium text-accent-blue hover:underline">
                  Amazon-Buchungstexte-Tool
                </a>{" "}
                (AMA-SG-DE, AMA-BG-DE, FBAFees, MZNFS, AUSZ-DE usw.).
              </Tipp>
              <Tipp titel="Automatischer Abgleich">
                PayJoe, Amainvoice oder Easybill verbinden Amazon direkt mit Lexoffice oder sevDesk.
              </Tipp>
            </>
          ) : (
            <>
              <Tipp titel="Wann CSV ziehen">Stripe Dashboard → Auszahlungen → letzten Monat exportieren.</Tipp>
              <Tipp titel="Ausführlichere Sicht">Berichte → Alle Transaktionen zeigt auch Disputes und Details zu Erstattungen.</Tipp>
              <Tipp titel="Stripe Tax">Wenn aktiviert, ist die USt automatisch enthalten und wird 1:1 übernommen.</Tipp>
              <Tipp titel="Direkt-Integration">Lexoffice und sevDesk haben einen Stripe-Connector, der ohne CSV synchronisiert.</Tipp>
            </>
          )}
          <Tipp titel="SKR03/04-Konten">
            Das Tool gibt eine Empfehlung. Sonderfälle (z.B. Mahnungen, Cashback) final mit deiner Steuerberatung klären.
          </Tipp>
          <Tipp titel="Umsatzsteuer">
            Verkäufe standardmäßig mit 19 % USt. OSS-Anteil bei EU-B2C separat. Bei US/Drittland: Reverse-Charge oder steuerfreie Ausfuhr.
          </Tipp>
        </ul>
      </ToolSection>
    </CockpitShell>
  );
};

const Tipp = ({ titel, children }: { titel: string; children: React.ReactNode }) => (
  <li className="flex gap-2.5">
    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
    <span>
      <strong className="font-medium text-foreground">{titel}:</strong> {children}
    </span>
  </li>
);

// ============================================================
// Demo-CSVs für Self-Test — realistische Beispiele inkl. Edge-Cases
// ============================================================

/**
 * Amazon Settlement Report (anonymisiert, gekürzte Spalten — gleiche Header die echte SP-API liefert).
 * Edge-Cases drin: Principal+Tax+Commission, Refund mit RefundCommission, FBA-Fees, Storage, PPC,
 * Subscription, Reserve (=0, wird gefiltert), Adjustment, leerer transaction-type.
 */
const AMAZON_DEMO_CSV = `"settlement-id","settlement-start-date","settlement-end-date","deposit-date","total-amount","currency","transaction-type","order-id","marketplace-name","amount-type","amount-description","amount","posted-date"
"123456","2026-05-01 00:00:00 UTC","2026-05-14 23:59:59 UTC","2026-05-16 00:00:00 UTC","842.13","EUR","Order","202-1234567-1234001","Amazon.de","ItemPrice","Principal","99.00","2026-05-03 10:12:00 UTC"
"123456","","","","","EUR","Order","202-1234567-1234001","Amazon.de","ItemPrice","Tax","18.81","2026-05-03 10:12:00 UTC"
"123456","","","","","EUR","Order","202-1234567-1234001","Amazon.de","ItemFees","Commission","-14.85","2026-05-03 10:12:00 UTC"
"123456","","","","","EUR","Order","202-1234567-1234001","Amazon.de","ItemFees","FBA Per Unit Fulfillment Fee","-3.45","2026-05-03 10:12:00 UTC"
"123456","","","","","EUR","Order","202-1234567-1234002","Amazon.de","ItemPrice","Principal","129.99","2026-05-04 08:45:00 UTC"
"123456","","","","","EUR","Order","202-1234567-1234002","Amazon.de","ItemPrice","Shipping","4.99","2026-05-04 08:45:00 UTC"
"123456","","","","","EUR","Order","202-1234567-1234002","Amazon.de","ItemFees","Commission","-20.25","2026-05-04 08:45:00 UTC"
"123456","","","","","EUR","Refund","202-1234567-1234001","Amazon.de","ItemPrice","Principal","-99.00","2026-05-08 15:30:00 UTC"
"123456","","","","","EUR","Refund","202-1234567-1234001","Amazon.de","ItemFees","RefundCommission","14.85","2026-05-08 15:30:00 UTC"
"123456","","","","","EUR","Storage Fee","","Amazon.de","ItemFees","FBAStorageFee","-12.99","2026-05-15 00:00:00 UTC"
"123456","","","","","EUR","Advertising","","Amazon.de","ItemFees","Sponsored Products","-45.30","2026-05-10 12:00:00 UTC"
"123456","","","","","EUR","Other","","Amazon.de","ItemFees","Subscription Fee","-39.00","2026-05-01 00:00:00 UTC"
"123456","","","","","EUR","","","Amazon.de","","Current Reserve Amount","0.00","2026-05-16 00:00:00 UTC"
"123456","","","","","EUR","Adjustment","","Amazon.de","ItemAdjustment","Adjustment","-8.99","2026-05-12 16:00:00 UTC"
"123456","","","","","EUR","ServiceFee","","Amazon.de","ItemFees","Coupon","-5.00","2026-05-07 14:00:00 UTC"
"123456","","","","","EUR","Adjustment","","Amazon.de","Goodwill","GoodwillRefund","-12.50","2026-05-09 09:30:00 UTC"
"123456","","","","","EUR","Other","","Amazon.de","Reimbursement","SAFE-T Reimbursement","24.99","2026-05-13 11:00:00 UTC"
"123456","","","","","EUR","Lending","","","","Loan Disbursement","5000.00","2026-05-05 09:00:00 UTC"
"123456","","","","","EUR","Transfer","","","","Disbursement","-842.13","2026-05-16 00:00:00 UTC"`;

/**
 * Stripe balance_transactions.csv (API-Format mit Cent-Beträgen).
 * Edge-Cases: charge mit fee in eigener Spalte, separater stripe_fee-Eintrag (Doppel-Fee-Test),
 * refund, dispute, payout, tax, advance (Stripe Capital), fee_refund, trinkgeld in description.
 */
const STRIPE_DEMO_CSV = `id,reporting_category,amount,fee,net,currency,available_on,created,status,description
txn_001,charge,1190,0,1190,eur,2026-05-10,2026-05-10,available,Bestellung #12345
txn_002,stripe_fee,-29,0,-29,eur,2026-05-10,2026-05-10,available,Stripe processing fees
txn_003,charge,2999,0,2999,eur,2026-05-11,2026-05-11,available,Bestellung #12346 mit Trinkgeld
txn_004,stripe_fee,-72,0,-72,eur,2026-05-11,2026-05-11,available,Stripe processing fees
txn_005,refund,-1190,0,-1190,eur,2026-05-12,2026-05-12,available,Refund Bestellung #12345
txn_006,fee_refund,29,0,29,eur,2026-05-12,2026-05-12,available,Refunded Stripe fee
txn_007,dispute,-5000,0,-5000,eur,2026-05-13,2026-05-13,available,Chargeback - card_not_present
txn_008,dispute,-1500,0,-1500,eur,2026-05-13,2026-05-13,available,Dispute fee
txn_009,tax,-228,0,-228,eur,2026-05-10,2026-05-10,available,Stripe Tax remitted
txn_010,advance,50000,0,50000,eur,2026-05-14,2026-05-14,available,Stripe Capital advance
txn_011,charge,1500,0,1500,eur,2026-05-14,2026-05-14,available,Customer tip / Trinkgeld
txn_012,payout,-48000,0,-48000,eur,2026-05-15,2026-05-15,paid,STRIPE PAYOUT
txn_013,adjustment,-50,0,-50,eur,2026-05-15,2026-05-15,available,Manual adjustment`;

export default SettlementParser;
