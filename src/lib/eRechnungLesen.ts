// E-Rechnung lesen: XRechnung/ZUGFeRD-XML in CII- oder UBL-Syntax (EN 16931)
// in ein lesbares Objekt verwandeln und rechnerisch prüfen. Läuft komplett im
// Browser (DOMParser) – die Datei verlässt das Gerät nicht.

export type ErPosition = { name: string; menge: number; einheit: string; preis: number; netto: number; satz: number | null; kategorie: string };
export type ErSteuer = { kategorie: string; satz: number; basis: number; betrag: number; grund?: string };
export type ErPartei = { name: string; strasse: string; plz: string; ort: string; land: string; ustId: string; steuernummer: string; email: string; kontakt: string };

export type ErRechnung = {
  syntax: "CII" | "UBL";
  spezifikation: string;
  typ: string;
  nummer: string;
  datum: string;
  faellig: string;
  leistungsdatum: string;
  waehrung: string;
  kaeuferReferenz: string;
  verkaeufer: ErPartei;
  kaeufer: ErPartei;
  positionen: ErPosition[];
  steuern: ErSteuer[];
  summen: { positionen: number; rabatte: number; zuschlaege: number; netto: number; steuer: number; brutto: number; zahlbar: number; vorausbezahlt: number };
  /** Rabatte (−) und Zuschläge (+) auf Belegebene. */
  zuAbschlaege: { grund: string; betrag: number }[];
  zahlung: { iban: string; bic: string; kontoinhaber: string; verwendungszweck: string; bedingungen: string };
  notizen: string[];
};

export type ErPruefung = { ok: boolean; text: string };

const TYPEN: Record<string, string> = {
  "380": "Rechnung", "381": "Gutschrift", "384": "Korrekturrechnung", "389": "Selbst ausgestellte Rechnung",
  "326": "Teilrechnung", "875": "Teilschlussrechnung", "876": "Abschlagsrechnung", "877": "Schlussrechnung",
};

// Namespace-unabhängige Suche über localName – CII und UBL nutzen verschiedene Präfixe.
const kinder = (el: Element | null | undefined, name: string) =>
  el ? Array.from(el.children).filter((c) => c.localName === name) : [];
const kind = (el: Element | null | undefined, ...pfad: string[]): Element | null => {
  let akt: Element | null | undefined = el;
  for (const p of pfad) {
    akt = kinder(akt, p)[0];
    if (!akt) return null;
  }
  return akt ?? null;
};
const txt = (el: Element | null | undefined, ...pfad: string[]) => (kind(el, ...pfad)?.textContent ?? "").trim();
const zahl = (s: string) => (s.trim() === "" ? 0 : Number(s.trim()));

/** „20261008“ (Format 102) oder „2026-10-08“ → ISO. */
const datum = (s: string) => {
  const t = s.trim();
  if (/^\d{8}$/.test(t)) return `${t.slice(0, 4)}-${t.slice(4, 6)}-${t.slice(6, 8)}`;
  return t.slice(0, 10);
};

function parteiCii(p: Element | null): ErPartei {
  const adr = kind(p, "PostalTradeAddress");
  const steuer = kinder(p, "SpecifiedTaxRegistration").map((r) => kind(r, "ID")).filter(Boolean) as Element[];
  return {
    name: txt(p, "Name"),
    strasse: txt(adr, "LineOne"),
    plz: txt(adr, "PostcodeCode"),
    ort: txt(adr, "CityName"),
    land: txt(adr, "CountryID"),
    ustId: steuer.find((s) => s.getAttribute("schemeID") === "VA")?.textContent?.trim() ?? "",
    steuernummer: steuer.find((s) => s.getAttribute("schemeID") === "FC")?.textContent?.trim() ?? "",
    email: txt(p, "URIUniversalCommunication", "URIID") || txt(p, "DefinedTradeContact", "EmailURIUniversalCommunication", "URIID"),
    kontakt: txt(p, "DefinedTradeContact", "PersonName"),
  };
}

function parseCii(doc: Element): ErRechnung {
  const ctx = kind(doc, "ExchangedDocumentContext");
  const ed = kind(doc, "ExchangedDocument");
  const tx = kind(doc, "SupplyChainTradeTransaction");
  const ag = kind(tx, "ApplicableHeaderTradeAgreement");
  const del = kind(tx, "ApplicableHeaderTradeDelivery");
  const st = kind(tx, "ApplicableHeaderTradeSettlement");
  const sum = kind(st, "SpecifiedTradeSettlementHeaderMonetarySummation");
  const pm = kind(st, "SpecifiedTradeSettlementPaymentMeans");
  const terms = kind(st, "SpecifiedTradePaymentTerms");
  return {
    syntax: "CII",
    spezifikation: txt(ctx, "GuidelineSpecifiedDocumentContextParameter", "ID"),
    typ: txt(ed, "TypeCode"),
    nummer: txt(ed, "ID"),
    datum: datum(txt(ed, "IssueDateTime", "DateTimeString")),
    faellig: datum(txt(terms, "DueDateDateTime", "DateTimeString")),
    leistungsdatum: datum(txt(del, "ActualDeliverySupplyChainEvent", "OccurrenceDateTime", "DateTimeString")),
    waehrung: txt(st, "InvoiceCurrencyCode") || "EUR",
    kaeuferReferenz: txt(ag, "BuyerReference"),
    verkaeufer: parteiCii(kind(ag, "SellerTradeParty")),
    kaeufer: parteiCii(kind(ag, "BuyerTradeParty")),
    positionen: kinder(tx, "IncludedSupplyChainTradeLineItem").map((li) => {
      const menge = kind(li, "SpecifiedLineTradeDelivery", "BilledQuantity");
      const steuer = kind(li, "SpecifiedLineTradeSettlement", "ApplicableTradeTax");
      const satz = txt(steuer, "RateApplicablePercent");
      return {
        name: txt(li, "SpecifiedTradeProduct", "Name"),
        menge: zahl(menge?.textContent ?? "0"),
        einheit: menge?.getAttribute("unitCode") ?? "",
        preis: zahl(txt(li, "SpecifiedLineTradeAgreement", "NetPriceProductTradePrice", "ChargeAmount")),
        netto: zahl(txt(li, "SpecifiedLineTradeSettlement", "SpecifiedTradeSettlementLineMonetarySummation", "LineTotalAmount")),
        satz: satz ? zahl(satz) : null,
        kategorie: txt(steuer, "CategoryCode"),
      };
    }),
    steuern: kinder(st, "ApplicableTradeTax").map((t) => ({
      kategorie: txt(t, "CategoryCode"),
      satz: zahl(txt(t, "RateApplicablePercent")),
      basis: zahl(txt(t, "BasisAmount")),
      betrag: zahl(txt(t, "CalculatedAmount")),
      grund: txt(t, "ExemptionReason") || undefined,
    })),
    zuAbschlaege: kinder(st, "SpecifiedTradeAllowanceCharge").map((a) => ({
      grund: txt(a, "Reason") || (txt(a, "ChargeIndicator", "Indicator") === "true" ? "Zuschlag" : "Rabatt"),
      betrag: (txt(a, "ChargeIndicator", "Indicator") === "true" ? 1 : -1) * zahl(txt(a, "ActualAmount")),
    })),
    summen: {
      positionen: zahl(txt(sum, "LineTotalAmount")),
      rabatte: zahl(txt(sum, "AllowanceTotalAmount")),
      zuschlaege: zahl(txt(sum, "ChargeTotalAmount")),
      netto: zahl(txt(sum, "TaxBasisTotalAmount")),
      steuer: zahl(kinder(sum, "TaxTotalAmount")[0]?.textContent ?? "0"),
      brutto: zahl(txt(sum, "GrandTotalAmount")),
      zahlbar: zahl(txt(sum, "DuePayableAmount")),
      vorausbezahlt: zahl(txt(sum, "TotalPrepaidAmount")),
    },
    zahlung: {
      iban: txt(pm, "PayeePartyCreditorFinancialAccount", "IBANID"),
      bic: txt(pm, "PayeeSpecifiedCreditorFinancialInstitution", "BICID"),
      kontoinhaber: txt(pm, "PayeePartyCreditorFinancialAccount", "AccountName"),
      verwendungszweck: txt(st, "PaymentReference"),
      bedingungen: txt(terms, "Description"),
    },
    notizen: kinder(ed, "IncludedNote").map((n) => txt(n, "Content")).filter(Boolean),
  };
}

function parteiUbl(p: Element | null): ErPartei {
  const party = kind(p, "Party");
  const adr = kind(party, "PostalAddress");
  const steuer = kinder(party, "PartyTaxScheme");
  const ust = steuer.find((s) => txt(s, "TaxScheme", "ID") === "VAT");
  const fc = steuer.find((s) => txt(s, "TaxScheme", "ID") !== "VAT");
  return {
    name: txt(party, "PartyLegalEntity", "RegistrationName") || txt(party, "PartyName", "Name"),
    strasse: txt(adr, "StreetName"),
    plz: txt(adr, "PostalZone"),
    ort: txt(adr, "CityName"),
    land: txt(adr, "Country", "IdentificationCode"),
    ustId: txt(ust, "CompanyID"),
    steuernummer: txt(fc, "CompanyID"),
    email: txt(party, "EndpointID") || txt(party, "Contact", "ElectronicMail"),
    kontakt: txt(party, "Contact", "Name"),
  };
}

function parseUbl(doc: Element): ErRechnung {
  const gutschrift = doc.localName === "CreditNote";
  const zeilen = kinder(doc, gutschrift ? "CreditNoteLine" : "InvoiceLine");
  const sum = kind(doc, "LegalMonetaryTotal");
  const taxTotal = kinder(doc, "TaxTotal").find((t) => kinder(t, "TaxSubtotal").length) ?? kinder(doc, "TaxTotal")[0];
  const pm = kind(doc, "PaymentMeans");
  return {
    syntax: "UBL",
    spezifikation: txt(doc, "CustomizationID"),
    typ: txt(doc, gutschrift ? "CreditNoteTypeCode" : "InvoiceTypeCode") || (gutschrift ? "381" : "380"),
    nummer: txt(doc, "ID"),
    datum: datum(txt(doc, "IssueDate")),
    faellig: datum(txt(doc, "DueDate") || txt(kind(doc, "PaymentMeans"), "PaymentDueDate")),
    leistungsdatum: datum(txt(doc, "Delivery", "ActualDeliveryDate")),
    waehrung: txt(doc, "DocumentCurrencyCode") || "EUR",
    kaeuferReferenz: txt(doc, "BuyerReference"),
    verkaeufer: parteiUbl(kind(doc, "AccountingSupplierParty")),
    kaeufer: parteiUbl(kind(doc, "AccountingCustomerParty")),
    positionen: zeilen.map((z) => {
      const menge = kind(z, gutschrift ? "CreditedQuantity" : "InvoicedQuantity");
      const kat = kind(z, "Item", "ClassifiedTaxCategory");
      const satz = txt(kat, "Percent");
      return {
        name: txt(z, "Item", "Name"),
        menge: zahl(menge?.textContent ?? "0"),
        einheit: menge?.getAttribute("unitCode") ?? "",
        preis: zahl(txt(z, "Price", "PriceAmount")),
        netto: zahl(txt(z, "LineExtensionAmount")),
        satz: satz ? zahl(satz) : null,
        kategorie: txt(kat, "ID"),
      };
    }),
    steuern: kinder(taxTotal, "TaxSubtotal").map((t) => ({
      kategorie: txt(t, "TaxCategory", "ID"),
      satz: zahl(txt(t, "TaxCategory", "Percent")),
      basis: zahl(txt(t, "TaxableAmount")),
      betrag: zahl(txt(t, "TaxAmount")),
      grund: txt(t, "TaxCategory", "TaxExemptionReason") || undefined,
    })),
    zuAbschlaege: kinder(doc, "AllowanceCharge").map((a) => ({
      grund: txt(a, "AllowanceChargeReason") || (txt(a, "ChargeIndicator") === "true" ? "Zuschlag" : "Rabatt"),
      betrag: (txt(a, "ChargeIndicator") === "true" ? 1 : -1) * zahl(txt(a, "Amount")),
    })),
    summen: {
      positionen: zahl(txt(sum, "LineExtensionAmount")),
      rabatte: zahl(txt(sum, "AllowanceTotalAmount")),
      zuschlaege: zahl(txt(sum, "ChargeTotalAmount")),
      netto: zahl(txt(sum, "TaxExclusiveAmount")),
      steuer: zahl(txt(taxTotal, "TaxAmount")),
      brutto: zahl(txt(sum, "TaxInclusiveAmount")),
      zahlbar: zahl(txt(sum, "PayableAmount")),
      vorausbezahlt: zahl(txt(sum, "PrepaidAmount")),
    },
    zahlung: {
      iban: txt(pm, "PayeeFinancialAccount", "ID"),
      bic: txt(pm, "PayeeFinancialAccount", "FinancialInstitutionBranch", "ID"),
      kontoinhaber: txt(pm, "PayeeFinancialAccount", "Name"),
      verwendungszweck: txt(pm, "PaymentID"),
      bedingungen: txt(doc, "PaymentTerms", "Note"),
    },
    notizen: kinder(doc, "Note").map((n) => (n.textContent ?? "").trim()).filter(Boolean),
  };
}

export class ErFehler extends Error {}

export function leseERechnung(xml: string): ErRechnung {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.getElementsByTagName("parsererror").length) throw new ErFehler("Die Datei ist kein gültiges XML.");
  const wurzel = doc.documentElement;
  if (wurzel.localName === "CrossIndustryInvoice") return parseCii(wurzel);
  if (wurzel.localName === "Invoice" || wurzel.localName === "CreditNote") return parseUbl(wurzel);
  throw new ErFehler(`Unbekanntes Format („${wurzel.localName}“). Unterstützt: XRechnung/ZUGFeRD in CII- oder UBL-Syntax.`);
}

/** IBAN-Prüfziffer (ISO 13616, mod 97). */
export function ibanGueltig(iban: string): boolean {
  const s = iban.replace(/\s/g, "").toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(s)) return false;
  const umgestellt = (s.slice(4) + s.slice(0, 4)).replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
  let rest = 0;
  for (const ziffer of umgestellt) rest = (rest * 10 + Number(ziffer)) % 97;
  return rest === 1;
}

const r2 = (n: number) => Math.round(n * 100) / 100;
const gleich = (a: number, b: number) => Math.abs(a - b) <= 0.011;

/** Rechnerische Prüfung nach den EN-16931-Regeln (BR-CO-10/15/16/17) plus IBAN. */
export function pruefeERechnung(r: ErRechnung): ErPruefung[] {
  const p: ErPruefung[] = [];
  const summePos = r2(r.positionen.reduce((n, x) => n + x.netto, 0));
  const zwischen = r.summen.positionen || summePos;
  p.push({ ok: gleich(summePos, zwischen), text: `Summe der Positionen ${summePos.toFixed(2)} = Positionssumme ${zwischen.toFixed(2)} (BR-CO-10)` });
  const netto = r2(zwischen - r.summen.rabatte + r.summen.zuschlaege);
  p.push({
    ok: gleich(netto, r.summen.netto) || r.summen.netto === 0,
    text: r.summen.rabatte || r.summen.zuschlaege
      ? `Positionen ${zwischen.toFixed(2)} − Rabatte ${r.summen.rabatte.toFixed(2)} + Zuschläge ${r.summen.zuschlaege.toFixed(2)} = Netto ${r.summen.netto.toFixed(2)} (BR-CO-13)`
      : `Nettobetrag ${r.summen.netto.toFixed(2)} stimmt mit den Positionen überein (BR-CO-13)`,
  });
  for (const s of r.steuern) {
    const soll = r2((s.basis * s.satz) / 100);
    p.push({ ok: gleich(soll, s.betrag), text: `Steuer ${s.satz} % auf ${s.basis.toFixed(2)} = ${soll.toFixed(2)} (ausgewiesen ${s.betrag.toFixed(2)})` });
  }
  p.push({ ok: gleich(r2(r.summen.netto + r.summen.steuer), r.summen.brutto), text: `Netto + Steuer = Brutto (${r.summen.brutto.toFixed(2)})` });
  if (r.zahlung.iban) p.push({ ok: ibanGueltig(r.zahlung.iban), text: `IBAN-Prüfziffer ${ibanGueltig(r.zahlung.iban) ? "gültig" : "UNGÜLTIG – nicht überweisen, beim Absender nachfragen"}` });
  p.push({ ok: !!(r.verkaeufer.ustId || r.verkaeufer.steuernummer), text: r.verkaeufer.ustId || r.verkaeufer.steuernummer ? "USt-IdNr. oder Steuernummer des Absenders vorhanden" : "Weder USt-IdNr. noch Steuernummer des Absenders – Pflichtangabe fehlt" });
  return p;
}

export const typName = (code: string) => TYPEN[code] ?? `Belegart ${code}`;
