import { useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, AlertTriangle, FileText, Download } from "lucide-react";

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
  const [includeRohs, setIncludeRohs] = useState(true);
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
        "industrial-gt2kwh": "Industriebatterie > 2 kWh — CFP-Pflicht seit 18.2.2025 (Erklärung) / 18.8.2025 (Klasse)",
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

  return (
    <CockpitShell
      eyebrow="CE/RoHS-Generator · Stand Mai 2026"
      title="EU-Konformitätserklärung als PDF"
      subtitle="8 Produkt-Kategorien mit aktuellen EU-Richtlinien. ★ NEU 2026: GPSR (live!), Battery Reg, Machinery Reg ab 1/2027, MDR-Übergangsfristen. PDF-Download fertig zum Unterschreiben."
    >
      {/* ★ KRITISCHE 2025/2026-UPDATES — Querschnitt-Warning (NEU) */}
      <div className="rounded-2xl border-2 border-red-500/40 bg-red-500/5 p-4 mb-6 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-700 shrink-0 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          <div>
            <div className="font-bold text-red-700 mb-2">★ Kritische Querschnitts-Regelungen 2026 (zusätzlich zu CE/RoHS!)</div>
            <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground">
              <li>
                <strong className="text-foreground">EU GPSR 2023/988 (live seit 13.12.2024, DE-Durchsetzung 19.2.2026):</strong>{" "}
                Pflicht für ALLE Konsumgüter (B2C) zusätzlich zu sektoralen Richtlinien. Non-EU-Hersteller
                braucht <strong>Responsible Person in EU (RPE)</strong>, Hersteller+RPE-Adresse am Produkt UND
                im Online-Listing, dokumentiertes Risk Assessment (10 Jahre Retention). Strafen bis €100.000
                pro Verstoß. KEINE Bestandsschutz-Klausel für Vor-Dez-2024-Bestand!
              </li>
              <li>
                <strong className="text-foreground">EU Battery Reg 2023/1542 (live seit 18.8.2024):</strong>{" "}
                Carbon-Footprint-Declaration für Industrial &gt;2kWh seit 18.2.2026, Digital Battery Passport
                ab 18.2.2027. DE-BattDG-Migration bis <strong>15.1.2026</strong> Pflicht (sonst Marktverlust).
                Konsumgüter mit Akku = TRIPLE-EPR (Battery + WEEE + LUCID).
              </li>
              <li>
                <strong className="text-foreground">Machinery Regulation 2023/1230 (ab 20.1.2027):</strong>{" "}
                Ersetzt Maschinenrichtlinie 2006/42/EG vollständig. Annex I Part A erweitert um
                kollaborative Roboter + AI mit Safety-Funktion (zwingend Notified Body).
              </li>
              <li>
                <strong className="text-foreground">AI Act Article 50 (geplant 2.8.2026):</strong>{" "}
                Chatbot-Disclosure, Deepfake-Marking, AI-Output-Label Pflicht für jeden Anbieter (auch Solo-
                SaaS). High-Risk-Frist 2.8.2026 möglicherweise verschoben via Digital Omnibus (UNCLEAR — politische
                Einigung 7.5.2026 noch nicht final).
              </li>
              <li>
                <strong className="text-foreground">EUDR 2023/1115:</strong> VERSCHOBEN durch VO 2025/2650 —
                Large/Medium Operators 30.12.2026, SME/Micro 30.6.2027. Für Holz/Möbel/Schoko/Kaffee
                relevant — Geolocation-Polygone der Anbauflächen Pflicht.
              </li>
              <li>
                <strong className="text-foreground">MDR-Legacy-Fristen (VO 2023/607):</strong> Class III +
                implantable IIb bis 31.12.2027, Class IIa/IIb/Im/Is bis 31.12.2028. Nur für Bestand mit
                MDD-Zertifikat + NB-Antrag bis 26.5.2024!
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Produkt-Kategorie</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          {(Object.keys(DIRECTIVES) as ProductCategory[]).map((k) => (
            <button
              key={k}
              onClick={() => {
                setCategory(k);
                setSelectedDirectives([]);
              }}
              className={`text-left rounded-xl border p-3 text-xs transition-colors ${
                category === k
                  ? "border-accent-blue bg-accent-blue/10 ring-1 ring-accent-blue/30"
                  : "border-border hover:border-accent-blue/40"
              }`}
            >
              <div className="text-xl mb-1">{DIRECTIVES[k].emoji}</div>
              <div className="font-semibold leading-tight">{DIRECTIVES[k].name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Product Data */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">Produkt-Daten</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Produktname</Label>
            <Input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="z.B. SmartLamp X1" className="mt-1" />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Modell / Typ-Bezeichnung</Label>
            <Input value={modelNumber} onChange={(e) => setModelNumber(e.target.value)} placeholder="z.B. SL-X1-2026" className="mt-1" />
          </div>
        </div>
      </div>

      {/* Manufacturer */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">Hersteller</h3>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Firmenname</Label>
            <Input value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} placeholder="z.B. Mustermann GmbH" className="mt-1" />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Vollständige Anschrift</Label>
            <Textarea
              value={manufacturerAddress}
              onChange={(e) => setManufacturerAddress(e.target.value)}
              placeholder="Musterstr. 1, 10115 Berlin, Deutschland"
              className="mt-1 min-h-[60px]"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Bevollmächtigter EU (optional, Pflicht bei Drittland-Hersteller)
            </Label>
            <Textarea
              value={authorizedRep}
              onChange={(e) => setAuthorizedRep(e.target.value)}
              placeholder="Falls Hersteller außerhalb EU sitzt: EU-Bevollmächtigter mit Adresse"
              className="mt-1 min-h-[50px]"
            />
          </div>
        </div>
      </div>

      {/* Directives */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm">Anwendbare EU-Richtlinien</h3>
          <button
            onClick={useDefaultDirectives}
            className="text-xs text-accent-blue hover:underline"
          >
            Standard für {cat.name} übernehmen
          </button>
        </div>
        <div className="space-y-2">
          {cat.directives.map((d) => (
            <button
              key={d.code}
              onClick={() => toggleDirective(d.code)}
              className={`w-full text-left rounded-xl border p-3 transition-colors flex items-start gap-3 ${
                selectedDirectives.includes(d.code)
                  ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                  : "border-border hover:border-accent-blue/40"
              }`}
            >
              <div
                className={`h-5 w-5 rounded border ${
                  selectedDirectives.includes(d.code) ? "bg-accent-blue border-accent-blue" : "border-border"
                } flex items-center justify-center shrink-0 mt-0.5`}
              >
                {selectedDirectives.includes(d.code) && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
              </div>
              <div className="flex-1">
                <div className="font-mono text-xs font-bold text-accent-blue mb-0.5">{d.code}</div>
                <div className="text-sm">{d.name}</div>
                {d.relevant && <div className="text-[11px] text-emerald-700 mt-0.5">✓ Standard für diese Kategorie</div>}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-3">
          <button
            onClick={() => setIncludeRohs(!includeRohs)}
            className={`w-full text-left rounded-xl border p-3 transition-colors flex items-start gap-3 ${
              includeRohs
                ? "border-emerald-500/40 bg-emerald-500/5"
                : "border-border hover:border-accent-blue/40"
            }`}
          >
            <div
              className={`h-5 w-5 rounded border ${
                includeRohs ? "bg-emerald-500 border-emerald-500" : "border-border"
              } flex items-center justify-center shrink-0 mt-0.5`}
            >
              {includeRohs && <CheckCircle2 className="h-3 w-3 text-white" />}
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">RoHS-Erklärung mit aufnehmen</div>
              <div className="text-[11px] text-muted-foreground">
                Bestätigt Stoffbeschränkung (10 Substanzen: Pb, Hg, Cd, Cr6+, PBB, PBDE, DEHP, BBP, DBP, DIBP)
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* GPSR — Verantwortlicher Wirtschaftsakteur */}
      <div className="rounded-2xl border-2 border-amber-500/40 bg-amber-500/5 p-5 mb-6">
        <button
          onClick={() => setIncludeGPSR(!includeGPSR)}
          className="w-full text-left flex items-center gap-3 mb-3"
        >
          <div className={`h-5 w-5 rounded border ${includeGPSR ? "bg-amber-500 border-amber-500" : "border-border"} flex items-center justify-center shrink-0`}>
            {includeGPSR && <CheckCircle2 className="h-3 w-3 text-white" />}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">GPSR — Verantwortlicher Wirtschaftsakteur in der EU ★ Pflicht seit 13.12.2024</h3>
            <p className="text-[11px] text-muted-foreground">VO 2023/988 Art. 16: Bei non-EU Herstellung muss ein EU-Akteur (Importeur, Bevollmächtigter, Fulfilment) benannt sein. Daten auch auf Verpackung/Online-Shop sichtbar.</p>
          </div>
        </button>
        {includeGPSR && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Name / Firmenname</Label>
              <Input value={gpsrRpName} onChange={(e) => setGpsrRpName(e.target.value)} placeholder="z.B. Importeur GmbH" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Anschrift (EU)</Label>
              <Input value={gpsrRpAddress} onChange={(e) => setGpsrRpAddress(e.target.value)} placeholder="Musterstr. 1, 12345 Berlin, DE" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">E-Mail</Label>
              <Input value={gpsrRpEmail} onChange={(e) => setGpsrRpEmail(e.target.value)} placeholder="compliance@firma.de" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Telefon (optional)</Label>
              <Input value={gpsrRpPhone} onChange={(e) => setGpsrRpPhone(e.target.value)} placeholder="+49 ..." className="mt-1" />
            </div>
          </div>
        )}
      </div>

      {/* EU Battery Regulation 2023/1542 */}
      <div className="rounded-2xl border-2 border-purple-500/40 bg-purple-500/5 p-5 mb-6">
        <button
          onClick={() => setIncludeBattery(!includeBattery)}
          className="w-full text-left flex items-center gap-3 mb-3"
        >
          <div className={`h-5 w-5 rounded border ${includeBattery ? "bg-purple-500 border-purple-500" : "border-border"} flex items-center justify-center shrink-0`}>
            {includeBattery && <CheckCircle2 className="h-3 w-3 text-white" />}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">EU-Batterieverordnung 2023/1542 — Konformitäts-Block</h3>
            <p className="text-[11px] text-muted-foreground">Pflicht für alle Produkte mit Akku/Batterie. CFP-Erklärung seit 18.2.2025 für EV/Industrial &gt;2kWh/LMT. Digital Battery Passport ab 18.2.2027.</p>
          </div>
        </button>
        {includeBattery && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Batterie-Typ</Label>
              <select
                value={batteryType}
                onChange={(e) => setBatteryType(e.target.value as typeof batteryType)}
                className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="portable">Geräte-/Konsumentenbatterie (portable)</option>
                <option value="industrial-le2kwh">Industriebatterie ≤ 2 kWh</option>
                <option value="industrial-gt2kwh">Industriebatterie &gt; 2 kWh (CFP-pflichtig)</option>
                <option value="ev">EV-Batterie / Traktion (CFP-pflichtig)</option>
                <option value="lmt">LMT — E-Bike, E-Scooter (CFP-pflichtig)</option>
              </select>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Chemie</Label>
              <Input value={batteryChemistry} onChange={(e) => setBatteryChemistry(e.target.value)} placeholder="z.B. Li-Ion NMC, LiFePO4, NiMH" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nennkapazität (Wh)</Label>
              <Input
                type="number"
                value={batteryCapacityWh || ""}
                onChange={(e) => setBatteryCapacityWh(Math.max(0, Number(e.target.value) || 0))}
                placeholder="z.B. 50"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                CFP (kg CO₂-eq/kWh) {batteryType === "ev" || batteryType === "industrial-gt2kwh" || batteryType === "lmt" ? "★ pflichtig" : "optional"}
              </Label>
              <Input
                type="number"
                value={batteryCfpKgCo2PerKwh}
                onChange={(e) => setBatteryCfpKgCo2PerKwh(e.target.value === "" ? "" : Math.max(0, Number(e.target.value) || 0))}
                placeholder="PEFCR-Methode pflichtig"
                className="mt-1"
              />
              <div className="text-[10px] text-muted-foreground mt-1">Aus PEFCR-Berechnung (siehe Annex II VO 2023/1542)</div>
            </div>
          </div>
        )}
      </div>

      {/* Standards */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">Angewendete harmonisierte Normen (eine pro Zeile)</h3>
        <div className="rounded-xl bg-secondary/40 p-3 mb-2 text-[11px] text-muted-foreground">
          <strong>Tipps für {cat.name}:</strong>
          <ul className="list-disc pl-4 mt-1 space-y-0.5">
            {cat.standardNotes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
        <Textarea
          value={appliedNorms}
          onChange={(e) => setAppliedNorms(e.target.value)}
          placeholder={"EN 62368-1:2014\nEN 55032:2015\nEN 55035:2017\nEN 61000-3-2:2014"}
          className="min-h-[100px] font-mono text-xs"
        />
      </div>

      {/* Signer */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">Unterzeichner</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Name</Label>
            <Input value={signerName} onChange={(e) => setSignerName(e.target.value)} placeholder="Max Mustermann" className="mt-1" />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Position</Label>
            <Input
              value={signerPosition}
              onChange={(e) => setSignerPosition(e.target.value)}
              placeholder="Geschäftsführer"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Ort</Label>
            <Input value={signerCity} onChange={(e) => setSignerCity(e.target.value)} placeholder="Berlin" className="mt-1" />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Ausstellungs-Datum</Label>
            <Input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="rounded-2xl border-2 border-accent-blue/40 bg-gradient-to-br from-card via-card to-accent-blue/5 p-6 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-bold text-lg mb-1">Bereit?</div>
            <div className="text-sm text-muted-foreground">
              {selectedDirectives.length === 0
                ? "Wähle mindestens eine Richtlinie aus."
                : `${selectedDirectives.length} Richtlinie(n) ausgewählt${includeRohs ? " + RoHS" : ""}`}
            </div>
          </div>
          <button
            onClick={downloadPDF}
            disabled={!productName || selectedDirectives.length === 0 || !manufacturer}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-6 py-3 text-sm font-bold hover:opacity-90 disabled:opacity-50"
          >
            <Download className="h-4 w-4" /> Konformitätserklärung als PDF
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtig:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>CE = Selbsterklärung des Herstellers</strong> — kein Prüfsiegel. Du bist verantwortlich für
                die Korrektheit.
              </li>
              <li>
                Bei <strong>Notified-Body-Pflicht</strong> (Maschinen Anhang IV, MDR Klasse IIa+, PSA Kat II/III, Funk
                ohne harmonisierte Normen): zusätzliche Baumusterprüfung NÖTIG. Generator allein reicht nicht.
              </li>
              <li>
                <strong>Technische Dokumentation</strong> muss separat erstellt sein (Konstruktionsunterlagen,
                Risikobeurteilung, Prüfberichte) — 10 Jahre aufzubewahren.
              </li>
              <li>
                <strong>CE-Kennzeichen</strong> auf Produkt (oder Verpackung wenn Produkt zu klein) — ≥ 5 mm hoch
              </li>
              <li>
                Bei <strong>Drittland-Hersteller</strong> (CN, US, etc.): EU-Bevollmächtigter PFLICHT
              </li>
              <li>
                Bei <strong>komplexen Produkten</strong> (Medizinprodukt, Maschine, Funk) zwingend mit
                Compliance-Anwalt + ggf. Notified Body
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default CeRohsGenerator;
