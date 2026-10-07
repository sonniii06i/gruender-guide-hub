// XRechnung 3.0 (CII-Syntax, EN 16931) aus den Daten des Rechnungs-Generators.
//
// Rechtsrahmen (Stand 08.10.2026): § 14 UStG, BMF 15.10.2024/15.10.2025.
// Empfangen müssen alle Unternehmer seit 01.01.2025; Ausstellen Pflicht ab
// 2027 (Vorjahresumsatz > 800.000 €) bzw. ab 2028 für alle. Kleinbetrags-
// rechnungen ≤ 250 € und Kleinunternehmer (§ 19) sind ausgenommen.
//
// Geprüft wird jede Änderung per CI mit dem KoSIT-Validator
// (.github/workflows/xrechnung-validieren.yml, scripts/xrechnung-beispiele.ts).

export type XrModus = "standard" | "kleinunternehmer" | "reverse-charge" | "innergemeinschaftlich";

export type XrDaten = {
  verkaeufer: {
    name: string;
    strasse: string;
    plzOrt: string;
    steuernummer: string;
    ustId: string;
    iban: string;
    bic: string;
    email: string;
    telefon: string;
    kontaktName: string;
  };
  kunde: { name: string; strasse: string; plzOrt: string; land: string; ustId: string; email: string };
  kaeuferReferenz: string;
  rechnungsnummer: string;
  rechnungsdatum: string; // YYYY-MM-DD
  leistungsdatum: string;
  zahlungsziel: number;
  modus: XrModus;
  positionen: { beschreibung: string; menge: number; einzelpreisNetto: number; ustSatz: number }[];
  freitext?: string;
};

const LAENDER: Record<string, string> = {
  deutschland: "DE", germany: "DE", österreich: "AT", oesterreich: "AT", austria: "AT", schweiz: "CH", frankreich: "FR",
  niederlande: "NL", belgien: "BE", luxemburg: "LU", italien: "IT", spanien: "ES", polen: "PL", tschechien: "CZ",
  dänemark: "DK", schweden: "SE", irland: "IE", portugal: "PT", "vereinigtes königreich": "GB", usa: "US",
};
export const landCode = (land: string) => {
  const l = (land || "").trim();
  if (/^[A-Za-z]{2}$/.test(l)) return l.toUpperCase();
  return LAENDER[l.toLowerCase()] ?? "DE";
};

export const trennePlzOrt = (s: string) => {
  const m = (s || "").trim().match(/^(\d{4,5})\s+(.+)$/);
  return m ? { plz: m[1], ort: m[2] } : { plz: "", ort: (s || "").trim() };
};

const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
const b = (n: number) => r2(n).toFixed(2);
const d102 = (iso: string) => iso.replace(/-/g, "");
const x = (s: string) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const KATEGORIE: Record<Exclude<XrModus, "standard">, { code: string; grund: string }> = {
  kleinunternehmer: { code: "E", grund: "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung)." },
  "reverse-charge": { code: "AE", grund: "Steuerschuldnerschaft des Leistungsempfängers (§ 13b UStG)." },
  innergemeinschaftlich: { code: "K", grund: "Steuerfreie innergemeinschaftliche Lieferung (§ 4 Nr. 1b UStG)." },
};

/** Was für eine gültige XRechnung fehlt (BR-DE-/EN-16931-Pflichtfelder). Leer = vollständig. */
export function xrFehlend(d: XrDaten): string[] {
  const f: string[] = [];
  const v = d.verkaeufer;
  if (!v.name.trim()) f.push("Name des Verkäufers");
  if (!trennePlzOrt(v.plzOrt).plz) f.push("PLZ und Ort des Verkäufers (z. B. „10115 Berlin“)");
  if (!v.kontaktName.trim()) f.push("Ansprechpartner (Name) des Verkäufers");
  if (!v.telefon.trim()) f.push("Telefon des Verkäufers");
  if (!/@/.test(v.email)) f.push("E-Mail des Verkäufers");
  if (!v.iban.replace(/\s/g, "")) f.push("IBAN");
  if (!v.ustId.trim() && !v.steuernummer.trim()) f.push("USt-IdNr. oder Steuernummer des Verkäufers");
  if (!d.kunde.name.trim()) f.push("Name des Kunden");
  if (!trennePlzOrt(d.kunde.plzOrt).ort) f.push("Ort des Kunden");
  if (!/@/.test(d.kunde.email)) f.push("E-Mail des Kunden (elektronische Adresse)");
  if (d.modus === "innergemeinschaftlich" && !trennePlzOrt(d.kunde.plzOrt).plz) f.push("PLZ des Kunden (Lieferadresse bei innergemeinschaftlicher Lieferung)");
  if ((d.modus === "reverse-charge" || d.modus === "innergemeinschaftlich") && (!d.kunde.ustId.trim() || !v.ustId.trim()))
    f.push("USt-IdNr. von Verkäufer und Kunde (Pflicht bei Reverse Charge / innergemeinschaftlich)");
  if (!d.rechnungsnummer.trim()) f.push("Rechnungsnummer");
  if (!d.positionen.some((p) => p.beschreibung.trim() && p.menge > 0)) f.push("mindestens eine Position");
  return f;
}

export function baueXRechnung(d: XrDaten): string {
  const v = d.verkaeufer;
  const vAdr = trennePlzOrt(v.plzOrt);
  const kAdr = trennePlzOrt(d.kunde.plzOrt);
  const pos = d.positionen.filter((p) => p.beschreibung.trim() && p.menge > 0);

  const kat = (p: { ustSatz: number }) =>
    d.modus === "standard" ? (p.ustSatz > 0 ? { code: "S", satz: p.ustSatz, grund: "" } : { code: "Z", satz: 0, grund: "" })
      : { code: KATEGORIE[d.modus].code, satz: 0, grund: KATEGORIE[d.modus].grund };

  const zeilen = pos.map((p, i) => {
    const betrag = r2(p.menge * p.einzelpreisNetto);
    return { i: i + 1, p, betrag, k: kat(p) };
  });

  // Steueraufschlüsselung je Kategorie + Satz (BR-CO-17: Steuer = Basis × Satz, 2 Stellen).
  const gruppen = new Map<string, { code: string; satz: number; grund: string; basis: number }>();
  for (const z of zeilen) {
    const key = `${z.k.code}|${z.k.satz}`;
    const g = gruppen.get(key) ?? { code: z.k.code, satz: z.k.satz, grund: z.k.grund, basis: 0 };
    g.basis = r2(g.basis + z.betrag);
    gruppen.set(key, g);
  }
  const steuern = [...gruppen.values()].map((g) => ({ ...g, steuer: r2((g.basis * g.satz) / 100) }));
  const summeNetto = r2(zeilen.reduce((n, z) => n + z.betrag, 0));
  const summeSteuer = r2(steuern.reduce((n, s) => n + s.steuer, 0));
  const brutto = r2(summeNetto + summeSteuer);
  const faellig = new Date(Date.parse(`${d.rechnungsdatum}T12:00:00Z`) + (d.zahlungsziel || 0) * 864e5).toISOString().slice(0, 10);

  const steuerReg = [
    v.ustId.trim() && `<ram:SpecifiedTaxRegistration><ram:ID schemeID="VA">${x(v.ustId.replace(/\s/g, ""))}</ram:ID></ram:SpecifiedTaxRegistration>`,
    v.steuernummer.trim() && `<ram:SpecifiedTaxRegistration><ram:ID schemeID="FC">${x(v.steuernummer.trim())}</ram:ID></ram:SpecifiedTaxRegistration>`,
  ].filter(Boolean).join("");

  const out = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100" xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100" xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:100" xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:BusinessProcessSpecifiedDocumentContextParameter><ram:ID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</ram:ID></ram:BusinessProcessSpecifiedDocumentContextParameter>
    <ram:GuidelineSpecifiedDocumentContextParameter><ram:ID>urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0</ram:ID></ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>${x(d.rechnungsnummer)}</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime><udt:DateTimeString format="102">${d102(d.rechnungsdatum)}</udt:DateTimeString></ram:IssueDateTime>${
      d.freitext?.trim() ? `\n    <ram:IncludedNote><ram:Content>${x(d.freitext.trim())}</ram:Content></ram:IncludedNote>` : ""
    }
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>
${zeilen
  .map(
    (z) => `    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument><ram:LineID>${z.i}</ram:LineID></ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct><ram:Name>${x(z.p.beschreibung.trim())}</ram:Name></ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement><ram:NetPriceProductTradePrice><ram:ChargeAmount>${b(z.p.einzelpreisNetto)}</ram:ChargeAmount></ram:NetPriceProductTradePrice></ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery><ram:BilledQuantity unitCode="C62">${z.p.menge}</ram:BilledQuantity></ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax><ram:TypeCode>VAT</ram:TypeCode><ram:CategoryCode>${z.k.code}</ram:CategoryCode><ram:RateApplicablePercent>${z.k.satz}</ram:RateApplicablePercent></ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation><ram:LineTotalAmount>${b(z.betrag)}</ram:LineTotalAmount></ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>`,
  )
  .join("\n")}
    <ram:ApplicableHeaderTradeAgreement>
      <ram:BuyerReference>${x(d.kaeuferReferenz.trim() || d.rechnungsnummer)}</ram:BuyerReference>
      <ram:SellerTradeParty>${
        // BR-CO-26: ohne USt-IdNr. braucht es eine Verkäufer-Kennung (BT-29) –
        // bei Kleinunternehmern ohne USt-IdNr. ist das die Steuernummer.
        !v.ustId.trim() && v.steuernummer.trim() ? `\n        <ram:ID>${x(v.steuernummer.trim())}</ram:ID>` : ""
      }
        <ram:Name>${x(v.name)}</ram:Name>
        <ram:DefinedTradeContact>
          <ram:PersonName>${x(v.kontaktName)}</ram:PersonName>
          <ram:TelephoneUniversalCommunication><ram:CompleteNumber>${x(v.telefon)}</ram:CompleteNumber></ram:TelephoneUniversalCommunication>
          <ram:EmailURIUniversalCommunication><ram:URIID>${x(v.email)}</ram:URIID></ram:EmailURIUniversalCommunication>
        </ram:DefinedTradeContact>
        <ram:PostalTradeAddress><ram:PostcodeCode>${x(vAdr.plz)}</ram:PostcodeCode><ram:LineOne>${x(v.strasse)}</ram:LineOne><ram:CityName>${x(vAdr.ort)}</ram:CityName><ram:CountryID>DE</ram:CountryID></ram:PostalTradeAddress>
        <ram:URIUniversalCommunication><ram:URIID schemeID="EM">${x(v.email)}</ram:URIID></ram:URIUniversalCommunication>
        ${steuerReg}
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>${x(d.kunde.name)}</ram:Name>
        <ram:PostalTradeAddress>${kAdr.plz ? `<ram:PostcodeCode>${x(kAdr.plz)}</ram:PostcodeCode>` : ""}${
          d.kunde.strasse.trim() ? `<ram:LineOne>${x(d.kunde.strasse)}</ram:LineOne>` : ""
        }<ram:CityName>${x(kAdr.ort)}</ram:CityName><ram:CountryID>${landCode(d.kunde.land)}</ram:CountryID></ram:PostalTradeAddress>
        <ram:URIUniversalCommunication><ram:URIID schemeID="EM">${x(d.kunde.email)}</ram:URIID></ram:URIUniversalCommunication>${
          d.kunde.ustId.trim()
            ? `\n        <ram:SpecifiedTaxRegistration><ram:ID schemeID="VA">${x(d.kunde.ustId.replace(/\s/g, ""))}</ram:ID></ram:SpecifiedTaxRegistration>`
            : ""
        }
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    <ram:ApplicableHeaderTradeDelivery>${
      d.modus === "innergemeinschaftlich"
        ? `<ram:ShipToTradeParty><ram:Name>${x(d.kunde.name)}</ram:Name><ram:PostalTradeAddress><ram:PostcodeCode>${x(kAdr.plz)}</ram:PostcodeCode>${
            d.kunde.strasse.trim() ? `<ram:LineOne>${x(d.kunde.strasse)}</ram:LineOne>` : ""
          }<ram:CityName>${x(kAdr.ort)}</ram:CityName><ram:CountryID>${landCode(d.kunde.land)}</ram:CountryID></ram:PostalTradeAddress></ram:ShipToTradeParty>`
        : ""
    }<ram:ActualDeliverySupplyChainEvent><ram:OccurrenceDateTime><udt:DateTimeString format="102">${d102(d.leistungsdatum || d.rechnungsdatum)}</udt:DateTimeString></ram:OccurrenceDateTime></ram:ActualDeliverySupplyChainEvent></ram:ApplicableHeaderTradeDelivery>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>
      <ram:SpecifiedTradeSettlementPaymentMeans>
        <ram:TypeCode>58</ram:TypeCode>
        <ram:PayeePartyCreditorFinancialAccount><ram:IBANID>${x(v.iban.replace(/\s/g, "").toUpperCase())}</ram:IBANID></ram:PayeePartyCreditorFinancialAccount>${
          v.bic.trim() ? `\n        <ram:PayeeSpecifiedCreditorFinancialInstitution><ram:BICID>${x(v.bic.trim())}</ram:BICID></ram:PayeeSpecifiedCreditorFinancialInstitution>` : ""
        }
      </ram:SpecifiedTradeSettlementPaymentMeans>
${steuern
  .map(
    (s) =>
      `      <ram:ApplicableTradeTax><ram:CalculatedAmount>${b(s.steuer)}</ram:CalculatedAmount><ram:TypeCode>VAT</ram:TypeCode>${
        s.grund ? `<ram:ExemptionReason>${x(s.grund)}</ram:ExemptionReason>` : ""
      }<ram:BasisAmount>${b(s.basis)}</ram:BasisAmount><ram:CategoryCode>${s.code}</ram:CategoryCode><ram:RateApplicablePercent>${s.satz}</ram:RateApplicablePercent></ram:ApplicableTradeTax>`,
  )
  .join("\n")}
      <ram:SpecifiedTradePaymentTerms><ram:Description>Zahlbar ohne Abzug bis ${faellig.split("-").reverse().join(".")}.</ram:Description><ram:DueDateDateTime><udt:DateTimeString format="102">${d102(faellig)}</udt:DateTimeString></ram:DueDateDateTime></ram:SpecifiedTradePaymentTerms>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>${b(summeNetto)}</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>${b(summeNetto)}</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">${b(summeSteuer)}</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>${b(brutto)}</ram:GrandTotalAmount>
        <ram:DuePayableAmount>${b(brutto)}</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>
`;
  return out;
}
