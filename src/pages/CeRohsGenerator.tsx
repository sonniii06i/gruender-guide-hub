import { useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Callout,
  Field,
  ResultPanel,
  ResultRow,
  ToneBadge,
  ToolLayout,
  ToolSection,
  selectCls,
  stripEmoji,
} from "@/components/cockpit/kit";
import {
  AlertTriangle,
  BatteryCharging,
  Building2,
  Check,
  CheckCircle2,
  CircleDashed,
  Download,
  FileText,
  Info,
  ListChecks,
  Package,
  PenLine,
  ShieldCheck,
} from "lucide-react";

type ProductCategory =
  | "elektrogeraet"
  | "spielzeug"
  | "maschine"
  | "medizinprodukt"
  | "kosmetik"
  | "psa"
  | "messgeraet"
  | "bauprodukt"
  | "wireless";

/** RoHS (2011/65/EU) betrifft Elektro- und Elektronikgeräte → nur dort standardmäßig ankreuzen. */
const ROHS_STANDARD: ProductCategory[] = ["elektrogeraet", "wireless", "maschine", "messgeraet"];
/** Kosmetik (VO 1223/2009): kein CE, keine EU-Konformitätserklärung, sondern Sicherheitsbericht + CPNP-Notifizierung. */
const KEINE_DOC: ProductCategory[] = ["kosmetik"];
/** Bauprodukte (VO 305/2011 bzw. 2024/3110): Leistungserklärung (DoP) statt Konformitätserklärung. */
const DOP_STATT_DOC: ProductCategory[] = ["bauprodukt"];

const DIRECTIVES: Record<ProductCategory, { name: string; emoji: string; directives: { code: string; name: string; relevant: boolean }[]; standardNotes: string[] }> = {
  elektrogeraet: {
    name: "Elektrogerät / Elektronik",
    emoji: "⚡",
    directives: [
      { code: "2014/35/EU", name: "Niederspannungsrichtlinie (LVD)", relevant: true },
      { code: "2014/30/EU", name: "EMV-Richtlinie", relevant: true },
      { code: "2011/65/EU + (EU) 2015/863", name: "RoHS-Richtlinie (Stoffbeschränkung)", relevant: true },
      { code: "(EU) 2019/2021", name: "Ecodesign-Verordnung", relevant: false },
    ],
    standardNotes: [
      "Harmonisierte Normen typisch: EN 62368-1, EN 55032, EN 55035, EN 61000-3-2/3-3",
      "★ EU Battery Reg 2023/1542 seit 18.8.2024: für Geräte mit Akku → CE+CFP-Declaration (Industrial >2kWh seit 18.2.2026), Digital Battery Passport 18.2.2027",
      "★ DE BattDG: Migration alter EAR-Registrierungen + OfH-Zuordnung pro Kategorie bis 15.1.2026 PFLICHT (sonst Marktverlust)",
      "★ Konsumgüter mit Akku: TRIPLE-EPR (Battery + WEEE + Verpackungs-LUCID)",
      "Bei Funk: zusätzlich Wireless-Kategorie wählen",
    ],
  },
  spielzeug: {
    name: "Spielzeug",
    emoji: "🧸",
    directives: [
      { code: "2009/48/EG", name: "Spielzeugrichtlinie", relevant: true },
      { code: "2011/65/EU", name: "RoHS (bei elektrischem Spielzeug)", relevant: false },
      { code: "1907/2006/EG", name: "REACH (Chemikalien)", relevant: true },
    ],
    standardNotes: [
      "EN 71-1, -2, -3 (Mechanik, Brennbarkeit, Schwermetalle)",
      "GS-Zeichen optional (TÜV/DEKRA-zertifiziert)",
      "Warnhinweis 'Nicht für Kinder unter 3 Jahren' wenn Kleinteile",
    ],
  },
  maschine: {
    name: "Maschine / Anlage",
    emoji: "⚙️",
    directives: [
      { code: "2006/42/EG", name: "Maschinenrichtlinie (gültig BIS 19.1.2027)", relevant: true },
      { code: "(EU) 2023/1230", name: "★ Machinery Regulation (ab 20.1.2027 voll wirksam — ERSETZT 2006/42/EG!)", relevant: true },
      { code: "2014/30/EU", name: "EMV (wenn elektrisch)", relevant: false },
      { code: "2014/35/EU", name: "Niederspannung (wenn 50–1000 V)", relevant: false },
    ],
    standardNotes: [
      "★ AB 20.1.2027: Neue Machinery Regulation 2023/1230 — Annex I Part A erweitert um kollaborative Roboter, autonome Mobilmaschinen, Safety-Software, AI mit Safety-Funktion → ZWINGEND Notified Body",
      "★ Annex I Part B: Self-Assessment via harmonisierte Standards möglich (kein NB nötig)",
      "★ Digital Documentation: User-Manual/EU-DoC dürfen elektronisch geliefert werden (Hardcopy nur auf Anfrage)",
      "EN ISO 12100 (Sicherheit von Maschinen)",
      "Risikobeurteilung Pflicht (DIN EN ISO 12100)",
      "Substantial Modification = neuer Hersteller (also Re-Bewertung)",
    ],
  },
  medizinprodukt: {
    name: "Medizinprodukt",
    emoji: "💊",
    directives: [
      { code: "(EU) 2017/745", name: "Medical Device Regulation (MDR)", relevant: true },
      { code: "(EU) 2017/746", name: "In-Vitro Diagnostic Regulation (IVDR)", relevant: false },
    ],
    standardNotes: [
      "Klassifizierung I / IIa / IIb / III essentiell — bestimmt Aufwand",
      "Ab Klasse IIa: Notified Body (Benannte Stelle) PFLICHT",
      "ISO 13485 (Qualitätsmanagement) typisch erforderlich",
      "UDI-Code (Unique Device Identification) Pflicht seit 2024",
      "★ MDR-Legacy-Übergangsfristen (VO 2023/607): Class III + implantable IIb bis 31.12.2027, Class IIa/IIb/Im/Is bis 31.12.2028",
      "★ ACHTUNG: Übergangsfrist NUR für Legacy-Devices mit MDD-Zertifikat + NB-Antrag bis 26.5.2024. Neue Produkte 2026: KEIN Bestandsschutz!",
      "★ EUDAMED-Registrierung + EU-Bevollmächtigter für non-EU Pflicht",
      "★ Borderline-Falle: 'Wellness'-Wearables mit medizinischen Claims (Schlaftracking, Mood-Detection) können MDR-pflichtig werden",
    ],
  },
  kosmetik: {
    name: "Kosmetik",
    emoji: "💄",
    directives: [
      { code: "(EG) 1223/2009", name: "Kosmetik-Verordnung", relevant: true },
    ],
    standardNotes: [
      "CPNP-Notifikation bei Kommission Pflicht VOR Verkauf",
      "Sicherheitsbewertung durch qualifizierten Sachverständigen (Sicherheitsbericht)",
      "Verantwortliche Person in EU pflichtig",
      "INCI-Liste, Mindesthaltbarkeit, Charge auf Verpackung",
    ],
  },
  psa: {
    name: "Persönliche Schutzausrüstung (PSA)",
    emoji: "🦺",
    directives: [{ code: "(EU) 2016/425", name: "PSA-Verordnung", relevant: true }],
    standardNotes: [
      "Kategorie I (einfach) / II / III (Lebensgefahr) — bestimmt Aufwand",
      "Kategorie II + III: Notified Body PFLICHT",
      "Baumusterprüfung + Qualitätssicherung",
    ],
  },
  messgeraet: {
    name: "Messgerät",
    emoji: "📏",
    directives: [
      { code: "2014/32/EU", name: "Messgeräte-Richtlinie (MID)", relevant: true },
      { code: "2014/31/EU", name: "Nichtselbsttätige Waagen", relevant: false },
    ],
    standardNotes: ["Notified Body bei Modul B (Baumusterprüfung)", "Eichung kalibriert"],
  },
  bauprodukt: {
    name: "Bauprodukt",
    emoji: "🧱",
    directives: [{ code: "(EU) 305/2011", name: "Bauproduktenverordnung (CPR)", relevant: true }],
    standardNotes: [
      "Leistungserklärung (DoP) statt klassischer Konformitätserklärung",
      "Harmonisierte technische Spezifikation Pflicht (hEN oder EAD)",
    ],
  },
  wireless: {
    name: "Funkgerät / Wireless (zusätzlich)",
    emoji: "📡",
    directives: [
      { code: "2014/53/EU", name: "Funkanlagen-Richtlinie (RED)", relevant: true },
      { code: "2014/30/EU", name: "EMV (in RED enthalten)", relevant: false },
    ],
    standardNotes: [
      "EN 300 328 (2,4 GHz), EN 301 893 (5 GHz)",
      "Notified Body wenn nicht harmonisierte Normen genutzt",
    ],
  },
};

const CeRohsGenerator = () => {
  const [category, setCategory] = useState<ProductCategory>("elektrogeraet");
  const [productName, setProductName] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [manufacturerAddress, setManufacturerAddress] = useState("");
  const [authorizedRep, setAuthorizedRep] = useState("");
  const [signerName, setSignerName] = useState("");
  const [signerPosition, setSignerPosition] = useState("Geschäftsführer");
  const [signerCity, setSignerCity] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [appliedNorms, setAppliedNorms] = useState("");
  const [includeRohs, setIncludeRohs] = useState(ROHS_STANDARD.includes("elektrogeraet"));
  const [selectedDirectives, setSelectedDirectives] = useState<string[]>([]);

  // GPSR (VO 2023/988, gilt seit 13.12.2024): Responsible Person in der EU für non-EU Hersteller (Art. 16)
  const [includeGPSR, setIncludeGPSR] = useState(true);
  const [gpsrRpName, setGpsrRpName] = useState("");
  const [gpsrRpAddress, setGpsrRpAddress] = useState("");
  const [gpsrRpEmail, setGpsrRpEmail] = useState("");
  const [gpsrRpPhone, setGpsrRpPhone] = useState("");
  // Battery Regulation (VO 2023/1542): Akku-Statement + CFP wenn relevant
  const [includeBattery, setIncludeBattery] = useState(false);
  const [batteryType, setBatteryType] = useState<"portable" | "industrial-le2kwh" | "industrial-gt2kwh" | "ev" | "lmt">("portable");
  const [batteryChemistry, setBatteryChemistry] = useState("Li-Ion");
  const [batteryCapacityWh, setBatteryCapacityWh] = useState(0);
  const [batteryCfpKgCo2PerKwh, setBatteryCfpKgCo2PerKwh] = useState<number | "">("");

  const cat = DIRECTIVES[category];

  // Auto-select default-relevant directives
  const useDefaultDirectives = () => {
    const defaults = cat.directives.filter((d) => d.relevant).map((d) => d.code);
    setSelectedDirectives(defaults);
  };

  const toggleDirective = (code: string) => {
    setSelectedDirectives(
      selectedDirectives.includes(code)
        ? selectedDirectives.filter((c) => c !== code)
        : [...selectedDirectives, code],
    );
  };

  const downloadPDF = async () => {
    // Keine falsche Rechtserklärung erzeugen: Kosmetik hat keine DoC, Bauprodukte eine DoP
    if (KEINE_DOC.includes(category) || DOP_STATT_DOC.includes(category)) return;
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const left = 20;
    const right = 190;
    let y = 20;

    const writeBlock = (text: string, opts?: { bold?: boolean; size?: number; spaceAfter?: number; align?: "left" | "center" }) => {
      doc.setFontSize(opts?.size ?? 10);
      doc.setFont("helvetica", opts?.bold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text, right - left);
      lines.forEach((line: string) => {
        if (y > 275) {
          doc.addPage();
          y = 20;
        }
        if (opts?.align === "center") {
          doc.text(line, (left + right) / 2, y, { align: "center" });
        } else {
          doc.text(line, left, y);
        }
        y += (opts?.size ?? 10) * 0.45 + 1;
      });
      y += opts?.spaceAfter ?? 2;
    };

    // Title
    writeBlock("EU-Konformitätserklärung", { bold: true, size: 16, align: "center", spaceAfter: 2 });
    writeBlock("EU Declaration of Conformity", { size: 11, align: "center", spaceAfter: 8 });

    // Hersteller
    writeBlock("1. Hersteller / Manufacturer", { bold: true, size: 11, spaceAfter: 2 });
    writeBlock(manufacturer || "[Hersteller-Name]");
    writeBlock(manufacturerAddress || "[Hersteller-Adresse]", { spaceAfter: 6 });

    // Bevollmächtigter
    if (authorizedRep) {
      writeBlock("2. Bevollmächtigter / Authorized Representative", { bold: true, size: 11, spaceAfter: 2 });
      writeBlock(authorizedRep, { spaceAfter: 6 });
    }

    // Produkt
    writeBlock("3. Produkt / Product", { bold: true, size: 11, spaceAfter: 2 });
    writeBlock(`Bezeichnung: ${productName || "[Produktname]"}`);
    writeBlock(`Modell / Type: ${modelNumber || "[Modellbezeichnung]"}`);
    writeBlock(`Kategorie: ${cat.name}`, { spaceAfter: 6 });

    // Erklärung
    writeBlock("4. Erklärung / Declaration", { bold: true, size: 11, spaceAfter: 2 });
    writeBlock(
      "Wir erklären in alleiniger Verantwortung, dass das oben genannte Produkt mit den folgenden EU-Richtlinien / Verordnungen übereinstimmt:",
      { spaceAfter: 4 },
    );
    writeBlock(
      "We declare under our sole responsibility that the product mentioned above is in conformity with the following EU directives / regulations:",
      { size: 9, spaceAfter: 6 },
    );

    // Richtlinien
    selectedDirectives.forEach((code) => {
      const dir = cat.directives.find((d) => d.code === code);
      if (dir) writeBlock(`• ${dir.code} — ${dir.name}`, { size: 10 });
    });
    if (includeRohs && !selectedDirectives.includes("2011/65/EU + (EU) 2015/863")) {
      writeBlock("• 2011/65/EU + (EU) 2015/863 — RoHS-Richtlinie (Stoffbeschränkung)", { size: 10 });
    }
    y += 4;

    // Normen
    if (appliedNorms.trim()) {
      writeBlock("5. Angewendete Normen / Applied Standards", { bold: true, size: 11, spaceAfter: 2 });
      appliedNorms
        .split("\n")
        .filter(Boolean)
        .forEach((n) => writeBlock(`• ${n}`, { size: 10 }));
      y += 4;
    }

    // RoHS-Abschnitt
    if (includeRohs) {
      writeBlock("6. RoHS-Erklärung / RoHS Declaration", { bold: true, size: 11, spaceAfter: 2 });
      writeBlock(
        "Das Produkt erfüllt die Anforderungen der RoHS-Richtlinie 2011/65/EU sowie der delegierten Richtlinie (EU) 2015/863 zur Beschränkung der Verwendung bestimmter gefährlicher Stoffe in Elektro- und Elektronikgeräten:",
        { size: 9, spaceAfter: 2 },
      );
      ["Blei (Pb)", "Quecksilber (Hg)", "Cadmium (Cd)", "Sechswertiges Chrom (Cr6+)", "PBB", "PBDE", "DEHP", "BBP", "DBP", "DIBP"].forEach((subst) => {
        writeBlock(`• ${subst}`, { size: 9 });
      });
      y += 4;
    }

    // GPSR-Block — Verantwortliche Wirtschaftsakteur in der Union (Art. 16 VO 2023/988)
    if (includeGPSR) {
      if (y > 240) { doc.addPage(); y = 20; }
      writeBlock("7. GPSR — Verantwortlicher Wirtschaftsakteur in der EU / Responsible Economic Operator", { bold: true, size: 11, spaceAfter: 2 });
      writeBlock(
        "Verordnung (EU) 2023/988 über die allgemeine Produktsicherheit (GPSR, anwendbar seit 13.12.2024). Für Produkte, die in der EU in Verkehr gebracht werden, muss ein in der EU ansässiger Wirtschaftsakteur (Hersteller, Importeur, Bevollmächtigter oder Fulfilment-Dienstleister) benannt sein. Name + Adresse müssen auf Produkt, Verpackung oder Beipackzettel sichtbar sein.",
        { size: 9, spaceAfter: 4 },
      );
      writeBlock(`Name: ${gpsrRpName || "[Name / Firmenname]"}`, { size: 10 });
      writeBlock(`Anschrift: ${gpsrRpAddress || "[Vollständige Adresse in der EU]"}`, { size: 10 });
      if (gpsrRpEmail) writeBlock(`E-Mail: ${gpsrRpEmail}`, { size: 10 });
      if (gpsrRpPhone) writeBlock(`Telefon: ${gpsrRpPhone}`, { size: 10 });
      y += 4;
    }

    // Battery-Regulation-Block (VO 2023/1542)
    if (includeBattery) {
      if (y > 240) { doc.addPage(); y = 20; }
      writeBlock("8. EU-Batterieverordnung 2023/1542 / EU Battery Regulation", { bold: true, size: 11, spaceAfter: 2 });
      writeBlock(
        "Das Produkt enthält Batterien/Akkus gemäß Verordnung (EU) 2023/1542 (anwendbar seit 18.8.2024). Konformität mit den dort genannten Anforderungen wird hiermit erklärt.",
        { size: 9, spaceAfter: 4 },
      );
      const batteryTypeLabel: Record<typeof batteryType, string> = {
        portable: "Gerätebatterie (portable) — Art. 6 (Konsumelektronik)",
        "industrial-le2kwh": "Industriebatterie ≤ 2 kWh",
        "industrial-gt2kwh": "Industriebatterie > 2 kWh — CFP-Erklärung (Art. 7) ab 18.2.2026, Leistungsklasse ab 18.8.2027 (de facto verschoben bis 18 Mon. nach finalem CFP-Rechtsakt, Stand 2026 noch offen)",
        ev: "EV-Batterie / Traktionsbatterie — CFP-Pflicht seit 18.2.2025",
        lmt: "LMT-Batterie (E-Bikes, E-Scooter)",
      };
      writeBlock(`Batterie-Typ: ${batteryTypeLabel[batteryType]}`, { size: 10 });
      writeBlock(`Chemie: ${batteryChemistry || "—"}`, { size: 10 });
      if (batteryCapacityWh > 0) writeBlock(`Nennkapazität: ${batteryCapacityWh} Wh`, { size: 10 });
      writeBlock("Schadstoffe (Art. 6): Hg < 0,0005 %, Cd < 0,002 %, Pb < 0,01 % (Massenanteil)", { size: 9 });
      const cfpRelevant = batteryType === "ev" || batteryType === "industrial-gt2kwh" || batteryType === "lmt";
      if (cfpRelevant) {
        if (batteryCfpKgCo2PerKwh !== "" && Number(batteryCfpKgCo2PerKwh) > 0) {
          writeBlock(`Carbon Footprint (CFP-Erklärung Art. 7): ${batteryCfpKgCo2PerKwh} kg CO₂-eq / kWh über Lebenszyklus`, { size: 10, bold: true });
        } else {
          writeBlock("Carbon Footprint (CFP-Erklärung Art. 7): [Wert ergänzen — PEFCR-Methode pflichtig]", { size: 9 });
        }
      }
      writeBlock("Kennzeichnung: durchgestrichene Mülltonne + chemisches Symbol (Pb/Cd/Hg) bei Bedarf · QR-Code für Digital Battery Passport ab 18.2.2027 Pflicht", { size: 9 });
      writeBlock("EPR / Rücknahme: Registrierung bei BattDG-Stiftung EAR (DE) bzw. nationalem Rücknahmesystem", { size: 9 });
      y += 4;
    }

    // Unterschrift
    if (y > 240) {
      doc.addPage();
      y = 20;
    }
    writeBlock("9. Unterzeichner / Signed for and on behalf of", { bold: true, size: 11, spaceAfter: 2 });
    writeBlock(`Ort, Datum: ${signerCity || "—"}, ${new Date(issueDate).toLocaleDateString("de-DE")}`, { spaceAfter: 12 });
    writeBlock("________________________________________");
    writeBlock(signerName || "[Name Unterzeichner]", { bold: true });
    writeBlock(signerPosition || "[Position]", { size: 9, spaceAfter: 4 });

    // Footer
    y = Math.max(y, 270);
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(
      "Diese Erklärung bescheinigt die Übereinstimmung mit den genannten EU-Richtlinien — keine Garantie für Eigenschaften.",
      left,
      y,
      { maxWidth: right - left },
    );

    doc.save(`konformitaetserklaerung-${(productName || "produkt").toLowerCase().replace(/[^a-z0-9]/g, "-")}.pdf`);
  };

  const pflichtOffen = [
    !productName && "Produktname",
    !manufacturer && "Hersteller",
    selectedDirectives.length === 0 && "mindestens eine Richtlinie",
  ].filter(Boolean) as string[];
  const bereit = pflichtOffen.length === 0;

  const Haken = ({ an }: { an: boolean }) => (
    <span
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
        an ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
      }`}
      aria-hidden="true"
    >
      {an && <Check className="h-3.5 w-3.5" />}
    </span>
  );

  return (
    <CockpitShell
      eyebrow="Produkt & Compliance · CE/RoHS-Generator, Stand Mai 2026"
      title="EU-Konformitätserklärung als PDF"
      subtitle="9 Produkt-Kategorien mit den passenden EU-Richtlinien, dazu die Blöcke für GPSR und die EU-Batterieverordnung. Am Ende lädst du ein PDF herunter, das nur noch unterschrieben werden muss."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Produkt-Kategorie" description="Bestimmt, welche Richtlinien und Normen vorgeschlagen werden." icon={Package}>
              <div role="group" aria-label="Produkt-Kategorie" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {(Object.keys(DIRECTIVES) as ProductCategory[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={category === k}
                    onClick={() => {
                      setCategory(k);
                      setSelectedDirectives([]);
                      setIncludeRohs(ROHS_STANDARD.includes(k));
                    }}
                    className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium leading-snug transition-colors ${
                      category === k
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground/80 hover:border-foreground/25 hover:text-foreground"
                    }`}
                  >
                    {stripEmoji(DIRECTIVES[k].name)}
                  </button>
                ))}
              </div>
            </ToolSection>

            <ToolSection title="Produkt und Hersteller" icon={FileText}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Produktname" htmlFor="ce-name">
                  <Input id="ce-name" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="z. B. SmartLamp X1" />
                </Field>
                <Field label="Modell / Typ-Bezeichnung" htmlFor="ce-modell">
                  <Input id="ce-modell" value={modelNumber} onChange={(e) => setModelNumber(e.target.value)} placeholder="z. B. SL-X1-2026" />
                </Field>
                <Field label="Hersteller: Firmenname" htmlFor="ce-hersteller" className="sm:col-span-2">
                  <Input id="ce-hersteller" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} placeholder="z. B. Mustermann GmbH" />
                </Field>
                <Field label="Vollständige Anschrift" htmlFor="ce-anschrift" className="sm:col-span-2">
                  <Textarea
                    id="ce-anschrift"
                    value={manufacturerAddress}
                    onChange={(e) => setManufacturerAddress(e.target.value)}
                    placeholder="Musterstr. 1, 10115 Berlin, Deutschland"
                    className="min-h-[60px]"
                  />
                </Field>
                <Field
                  label="Bevollmächtigter in der EU"
                  hint="Optional, Pflicht bei Herstellern aus Drittländern."
                  htmlFor="ce-bevoll"
                  className="sm:col-span-2"
                >
                  <Textarea
                    id="ce-bevoll"
                    value={authorizedRep}
                    onChange={(e) => setAuthorizedRep(e.target.value)}
                    placeholder="Falls Hersteller außerhalb EU sitzt: EU-Bevollmächtigter mit Adresse"
                    className="min-h-[50px]"
                  />
                </Field>
              </div>
            </ToolSection>

            <ToolSection
              title="Anwendbare EU-Richtlinien"
              description={`Vorschläge für ${stripEmoji(cat.name)}`}
              icon={ShieldCheck}
              actions={
                <Button type="button" variant="outline" size="sm" onClick={useDefaultDirectives}>
                  Standard übernehmen
                </Button>
              }
            >
              <div className="space-y-2">
                {cat.directives.map((d) => {
                  const an = selectedDirectives.includes(d.code);
                  return (
                    <button
                      key={d.code}
                      type="button"
                      aria-pressed={an}
                      onClick={() => toggleDirective(d.code)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                        an ? "border-primary/40 bg-accent" : "border-border bg-card hover:border-foreground/25"
                      }`}
                    >
                      <Haken an={an} />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-accent-blue tabular">{d.code}</span>
                          {d.relevant && <ToneBadge tone="success">Standard für diese Kategorie</ToneBadge>}
                        </span>
                        <span className="mt-0.5 block text-sm text-foreground">{d.name}</span>
                      </span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  aria-pressed={includeRohs}
                  onClick={() => setIncludeRohs(!includeRohs)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                    includeRohs ? "border-success/30 bg-success-soft" : "border-border bg-card hover:border-foreground/25"
                  }`}
                >
                  <Haken an={includeRohs} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">RoHS-Erklärung mit aufnehmen</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      Bestätigt Stoffbeschränkung (10 Substanzen: Pb, Hg, Cd, Cr6+, PBB, PBDE, DEHP, BBP, DBP, DIBP)
                    </span>
                  </span>
                </button>
              </div>
            </ToolSection>

            <ToolSection
              title="GPSR: verantwortlicher Wirtschaftsakteur in der EU"
              description="Pflicht seit 13.12.2024 (VO 2023/988 Art. 16)."
              icon={Building2}
              actions={<ToneBadge tone={includeGPSR ? "success" : "neutral"}>{includeGPSR ? "Im PDF" : "Nicht im PDF"}</ToneBadge>}
            >
              <button
                type="button"
                aria-pressed={includeGPSR}
                onClick={() => setIncludeGPSR(!includeGPSR)}
                className="flex w-full items-start gap-3 text-left"
              >
                <Haken an={includeGPSR} />
                <span className="text-sm text-foreground/85">
                  GPSR-Block aufnehmen. Bei Herstellung außerhalb der EU muss ein EU-Akteur (Importeur, Bevollmächtigter, Fulfilment) benannt sein. Die Daten müssen auch auf Verpackung und im Online-Shop sichtbar sein.
                </span>
              </button>
              {includeGPSR && (
                <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border/70 pt-4 sm:grid-cols-2">
                  <Field label="Name / Firmenname" htmlFor="gpsr-name">
                    <Input id="gpsr-name" value={gpsrRpName} onChange={(e) => setGpsrRpName(e.target.value)} placeholder="z. B. Importeur GmbH" />
                  </Field>
                  <Field label="Anschrift (EU)" htmlFor="gpsr-adr">
                    <Input id="gpsr-adr" value={gpsrRpAddress} onChange={(e) => setGpsrRpAddress(e.target.value)} placeholder="Musterstr. 1, 12345 Berlin, DE" />
                  </Field>
                  <Field label="E-Mail" htmlFor="gpsr-mail">
                    <Input id="gpsr-mail" value={gpsrRpEmail} onChange={(e) => setGpsrRpEmail(e.target.value)} placeholder="compliance@firma.de" />
                  </Field>
                  <Field label="Telefon (optional)" htmlFor="gpsr-tel">
                    <Input id="gpsr-tel" value={gpsrRpPhone} onChange={(e) => setGpsrRpPhone(e.target.value)} placeholder="+49 ..." />
                  </Field>
                </div>
              )}
            </ToolSection>

            <ToolSection
              title="EU-Batterieverordnung 2023/1542"
              description="Pflicht für alle Produkte mit Akku oder Batterie."
              icon={BatteryCharging}
              actions={<ToneBadge tone={includeBattery ? "success" : "neutral"}>{includeBattery ? "Im PDF" : "Nicht im PDF"}</ToneBadge>}
            >
              <button
                type="button"
                aria-pressed={includeBattery}
                onClick={() => setIncludeBattery(!includeBattery)}
                className="flex w-full items-start gap-3 text-left"
              >
                <Haken an={includeBattery} />
                <span className="text-sm text-foreground/85">
                  Batterie-Block aufnehmen. CFP-Erklärung gestaffelt: EV ab 18.2.2025, Industrie &gt;2kWh ab 18.2.2026, LMT ab 18.8.2028 (jeweils vorbehaltlich Verschiebung bis zum finalen CFP-Rechtsakt). Digital Battery Passport ab 18.2.2027.
                </span>
              </button>
              {includeBattery && (
                <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border/70 pt-4 sm:grid-cols-2">
                  <Field label="Batterie-Typ" htmlFor="bat-typ">
                    <select
                      id="bat-typ"
                      value={batteryType}
                      onChange={(e) => setBatteryType(e.target.value as typeof batteryType)}
                      className={selectCls}
                    >
                      <option value="portable">Geräte-/Konsumentenbatterie (portable)</option>
                      <option value="industrial-le2kwh">Industriebatterie ≤ 2 kWh</option>
                      <option value="industrial-gt2kwh">Industriebatterie &gt; 2 kWh (CFP-pflichtig)</option>
                      <option value="ev">EV-Batterie / Traktion (CFP-pflichtig)</option>
                      <option value="lmt">LMT: E-Bike, E-Scooter (CFP-pflichtig)</option>
                    </select>
                  </Field>
                  <Field label="Chemie" htmlFor="bat-chemie">
                    <Input id="bat-chemie" value={batteryChemistry} onChange={(e) => setBatteryChemistry(e.target.value)} placeholder="z. B. Li-Ion NMC, LiFePO4, NiMH" />
                  </Field>
                  <Field label="Nennkapazität (Wh)" htmlFor="bat-wh">
                    <Input
                      id="bat-wh"
                      type="number"
                      value={batteryCapacityWh || ""}
                      onChange={(e) => setBatteryCapacityWh(Math.max(0, Number(e.target.value) || 0))}
                      placeholder="z. B. 50"
                      className="tabular"
                    />
                  </Field>
                  <Field
                    label={`CFP (kg CO₂-eq/kWh), ${batteryType === "ev" || batteryType === "industrial-gt2kwh" || batteryType === "lmt" ? "pflichtig" : "optional"}`}
                    hint="Aus PEFCR-Berechnung (siehe Annex II VO 2023/1542)"
                    htmlFor="bat-cfp"
                  >
                    <Input
                      id="bat-cfp"
                      type="number"
                      value={batteryCfpKgCo2PerKwh}
                      onChange={(e) => setBatteryCfpKgCo2PerKwh(e.target.value === "" ? "" : Math.max(0, Number(e.target.value) || 0))}
                      placeholder="PEFCR-Methode pflichtig"
                      className="tabular"
                    />
                  </Field>
                </div>
              )}
            </ToolSection>

            <ToolSection title="Angewendete harmonisierte Normen" description="Eine Norm pro Zeile." icon={ListChecks}>
              <Callout tone="neutral" icon={Info} title={`Tipps für ${stripEmoji(cat.name)}`} className="mb-4">
                <ul className="list-disc space-y-0.5 pl-4">
                  {cat.standardNotes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </Callout>
              <Textarea
                aria-label="Angewendete harmonisierte Normen"
                value={appliedNorms}
                onChange={(e) => setAppliedNorms(e.target.value)}
                placeholder={"EN 62368-1:2014\nEN 55032:2015\nEN 55035:2017\nEN 61000-3-2:2014"}
                className="min-h-[110px] font-mono text-xs"
              />
            </ToolSection>

            <ToolSection title="Unterzeichner" icon={PenLine}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" htmlFor="sig-name">
                  <Input id="sig-name" value={signerName} onChange={(e) => setSignerName(e.target.value)} placeholder="Max Mustermann" />
                </Field>
                <Field label="Position" htmlFor="sig-pos">
                  <Input id="sig-pos" value={signerPosition} onChange={(e) => setSignerPosition(e.target.value)} placeholder="Geschäftsführer" />
                </Field>
                <Field label="Ort" htmlFor="sig-ort">
                  <Input id="sig-ort" value={signerCity} onChange={(e) => setSignerCity(e.target.value)} placeholder="Berlin" />
                </Field>
                <Field label="Ausstellungs-Datum" htmlFor="sig-datum">
                  <Input id="sig-datum" type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
                </Field>
              </div>
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Deine Konformitätserklärung"
              title={productName || "Noch kein Produktname"}
            >
              <div className="divide-y divide-white/10">
                <ResultRow label="Kategorie" value={stripEmoji(cat.name)} />
                <ResultRow
                  label="Richtlinien"
                  value={`${selectedDirectives.length} ausgewählt${includeRohs ? " + RoHS" : ""}`}
                />
                <ResultRow label="GPSR-Block" value={includeGPSR ? "ja" : "nein"} />
                <ResultRow label="Batterie-Block" value={includeBattery ? "ja" : "nein"} />
              </div>
              <div className={`mt-4 rounded-xl p-3 text-sm ${bereit ? "bg-white/10 text-primary-foreground" : "bg-white/[0.06] text-primary-foreground/80"}`}>
                {bereit ? (
                  <span className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green-glow" aria-hidden="true" />
                    Alle Pflichtangaben sind da. Das PDF kann erstellt werden.
                  </span>
                ) : (
                  <span className="flex items-start gap-2">
                    <CircleDashed className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Es fehlt noch: {pflichtOffen.join(", ")}.</span>
                  </span>
                )}
              </div>
              {KEINE_DOC.includes(category) && (
                <p className="mt-4 rounded-xl bg-white/[0.06] p-3 text-sm text-primary-foreground/85">
                  Kosmetik trägt kein CE-Zeichen und hat keine EU-Konformitätserklärung (VO (EG) 1223/2009). Pflicht sind
                  Sicherheitsbericht, Produktinformationsdatei und die CPNP-Notifizierung vor dem Verkauf. Darum gibt es hier kein PDF.
                </p>
              )}
              {DOP_STATT_DOC.includes(category) && (
                <p className="mt-4 rounded-xl bg-white/[0.06] p-3 text-sm text-primary-foreground/85">
                  Bauprodukte mit harmonisierter Norm brauchen eine Leistungserklärung (DoP) nach der Bauproduktenverordnung,
                  keine EU-Konformitätserklärung. Dieses Tool erzeugt keine DoP — darum gibt es hier kein PDF.
                </p>
              )}
              <Button
                onClick={downloadPDF}
                disabled={!productName || selectedDirectives.length === 0 || !manufacturer || KEINE_DOC.includes(category) || DOP_STATT_DOC.includes(category)}
                className="press mt-4 h-11 w-full rounded-xl bg-card text-foreground hover:bg-card/90"
              >
                <Download className="mr-2 h-4 w-4" /> Konformitätserklärung als PDF
              </Button>
            </ResultPanel>

            <Callout tone="warning" title="Wichtig vor dem Unterschreiben" icon={AlertTriangle}>
              <ul className="mt-1 list-disc space-y-1 pl-4">
                <li>
                  <strong>CE ist eine Selbsterklärung des Herstellers</strong>, kein Prüfsiegel. Du bist verantwortlich für
                  die Korrektheit.
                </li>
                <li>
                  Bei <strong>Notified-Body-Pflicht</strong> (Maschinen Anhang IV, MDR Klasse IIa+, PSA Kat II/III, Funk
                  ohne harmonisierte Normen): zusätzliche Baumusterprüfung NÖTIG. Generator allein reicht nicht.
                </li>
                <li>
                  <strong>Technische Dokumentation</strong> muss separat erstellt sein (Konstruktionsunterlagen,
                  Risikobeurteilung, Prüfberichte), 10 Jahre aufzubewahren.
                </li>
                <li>
                  <strong>CE-Kennzeichen</strong> auf Produkt (oder Verpackung wenn Produkt zu klein), ≥ 5 mm hoch
                </li>
                <li>
                  Bei <strong>Drittland-Hersteller</strong> (CN, US, etc.): EU-Bevollmächtigter PFLICHT
                </li>
                <li>
                  Bei <strong>komplexen Produkten</strong> (Medizinprodukt, Maschine, Funk) zwingend mit
                  Compliance-Anwalt + ggf. Notified Body
                </li>
              </ul>
            </Callout>
          </>
        }
      />

      <ToolSection
        title="Weitere Pflichten 2026 neben CE und RoHS"
        description="Querschnitts-Regelungen, die zusätzlich gelten können."
        icon={AlertTriangle}
      >
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            {
              t: "EU GPSR 2023/988",
              s: "live seit 13.12.2024, DE-Durchsetzung 19.2.2026",
              tone: "danger" as const,
              b: <>Pflicht für ALLE Konsumgüter (B2C) zusätzlich zu sektoralen Richtlinien. Non-EU-Hersteller braucht <strong>Responsible Person in EU (RPE)</strong>, Hersteller+RPE-Adresse am Produkt UND im Online-Listing, dokumentiertes Risk Assessment (10 Jahre Retention). Strafen bis €100.000 pro Verstoß. KEINE Bestandsschutz-Klausel für Vor-Dez-2024-Bestand!</>,
            },
            {
              t: "EU Battery Reg 2023/1542",
              s: "live seit 18.8.2024",
              tone: "danger" as const,
              b: <>Carbon-Footprint-Declaration für Industrial &gt;2kWh seit 18.2.2026, Digital Battery Passport ab 18.2.2027. DE-BattDG-Migration bis <strong>15.1.2026</strong> Pflicht (sonst Marktverlust). Konsumgüter mit Akku = TRIPLE-EPR (Battery + WEEE + LUCID).</>,
            },
            {
              t: "Machinery Regulation 2023/1230",
              s: "ab 20.1.2027",
              tone: "warning" as const,
              b: <>Ersetzt Maschinenrichtlinie 2006/42/EG vollständig. Annex I Part A erweitert um kollaborative Roboter + AI mit Safety-Funktion (zwingend Notified Body).</>,
            },
            {
              t: "AI Act Article 50",
              s: "geplant 2.8.2026",
              tone: "warning" as const,
              b: <>Chatbot-Disclosure, Deepfake-Marking, AI-Output-Label Pflicht für jeden Anbieter (auch Solo-SaaS). High-Risk-Frist 2.8.2026 möglicherweise verschoben via Digital Omnibus (UNCLEAR, politische Einigung 7.5.2026 noch nicht final).</>,
            },
            {
              t: "EUDR 2023/1115",
              s: "verschoben durch VO 2025/2650",
              tone: "info" as const,
              b: <>Large/Medium Operators 30.12.2026, SME/Micro 30.6.2027. Für Holz/Möbel/Schoko/Kaffee relevant: Geolocation-Polygone der Anbauflächen Pflicht.</>,
            },
            {
              t: "MDR-Legacy-Fristen (VO 2023/607)",
              s: "bis 2027/2028",
              tone: "info" as const,
              b: <>Class III + implantable IIb bis 31.12.2027, Class IIa/IIb/Im/Is bis 31.12.2028. Nur für Bestand mit MDD-Zertifikat + NB-Antrag bis 26.5.2024!</>,
            },
          ].map((r) => (
            <li key={r.t} className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold">{r.t}</h3>
                <ToneBadge tone={r.tone}>{r.s}</ToneBadge>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground [&_strong]:text-foreground">{r.b}</p>
            </li>
          ))}
        </ul>
      </ToolSection>
    </CockpitShell>
  );
};

export default CeRohsGenerator;
