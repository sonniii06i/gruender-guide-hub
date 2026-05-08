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
      "Bei Akku/Battery-Geräten zusätzlich: BattG (DE) + Batteriegesetz",
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
      { code: "2006/42/EG", name: "Maschinenrichtlinie", relevant: true },
      { code: "2014/30/EU", name: "EMV (wenn elektrisch)", relevant: false },
      { code: "2014/35/EU", name: "Niederspannung (wenn 50–1000 V)", relevant: false },
    ],
    standardNotes: [
      "EN ISO 12100 (Sicherheit von Maschinen)",
      "Risikobeurteilung Pflicht (DIN EN ISO 12100)",
      "Notfall-Stopp + Schutzeinrichtungen",
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

    // Unterschrift
    if (y > 240) {
      doc.addPage();
      y = 20;
    }
    writeBlock("7. Unterzeichner / Signed for and on behalf of", { bold: true, size: 11, spaceAfter: 2 });
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
      eyebrow="CE/RoHS-Generator"
      title="EU-Konformitätserklärung als PDF"
      subtitle="Pflicht-Dokument bei CE-Kennzeichnung. 8 Produkt-Kategorien voreingestellt mit relevanten EU-Richtlinien + RoHS-Erklärung. PDF-Download fertig zum Unterschreiben."
    >
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
