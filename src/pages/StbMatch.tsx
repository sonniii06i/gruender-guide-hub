import { useState, useMemo, useEffect } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { STB_POOL, STB_AVOID_LIST, matchStbs, plzToRegion, regionLabel, regionCoverage, type Briefing, type StbSpecTag } from "@/data/stbPool";
import {
  Building2,
  Search,
  CheckCircle2,
  AlertTriangle,
  Mail,
  FileText,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Shield,
  Loader2,
  Star,
  Wifi,
  ShieldAlert,
  MessageCircle,
  MapPin,
} from "lucide-react";

const RECHTSFORM_OPTIONS = [
  "Einzelunternehmen (EÜR)",
  "Einzelunternehmen (Bilanz)",
  "GbR",
  "OHG / KG",
  "UG (haftungsbeschränkt)",
  "GmbH",
  "GmbH & Co. KG",
  "Holding-Struktur",
  "AG",
  "Andere",
];

const UMSATZ_OPTIONS: Briefing["umsatzRange"][] = ["0-50k", "50-250k", "250k-1M", "1M-5M", "5M+"];
const BELEGE_OPTIONS: Briefing["belegeMonat"][] = ["≤50", "50-250", "250-1000", "1000+"];

const VERTRIEBSKANAELE = [
  "B2B-Direktvertrieb",
  "Eigener Online-Shop (Shopify, Shopware, Woo)",
  "Amazon FBA / FBM",
  "Marktplätze EU (eBay, Kaufland, Otto, Etsy)",
  "Marktplätze US",
  "Stationärer Handel / POS",
  "Digital-Produkte / SaaS",
  "Beratung / Dienstleistung",
];

const SPEZIAL_TAG_LABELS: Record<StbSpecTag, string> = {
  ecom: "E-Commerce / Marketplaces",
  crypto: "Crypto / DeFi / NFTs",
  holding: "Holding-Strukturen",
  "us-llc": "US-LLC (aus DE-Sicht)",
  "hk-ltd": "HK-Limited / Asien",
  international: "Internationale Mandate",
  "ip-box": "IP-Box / Patentbox",
  stiftung: "Stiftung / Familien-Pool",
  lohn: "Lohnabrechnung viele MA",
  "fa-research": "F&E + Forschungszulage",
  standard: "Standard-Gründer-Mandat",
  kleinunternehmer: "Kleinunternehmer §19 UStG",
};

const SERVICE_OPTIONS = [
  "Laufende Buchhaltung",
  "Jahresabschluss + Steuererklärungen",
  "USt-Voranmeldung monatlich",
  "Lohnabrechnung",
  "Beratung adhoc (stundenweise)",
  "Betriebsprüfungs-Begleitung",
  "Existenzgründungs-Begleitung (1-mal)",
];

type Step = 1 | 2 | 3;

const StbMatch = () => {
  const [step, setStep] = useState<Step>(1);

  // Bei jedem Step-Wechsel hochscrollen — sonst bleibt User in alter Scroll-Position
  // und merkt nicht dass die Page gewechselt hat (Hauptursache "Button tut nichts"-UX-Bug).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);
  const [briefing, setBriefing] = useState<Briefing>({
    rechtsform: "GmbH",
    umsatzRange: "50-250k",
    belegeMonat: "50-250",
    mitarbeiter: 0,
    lohnabrechnungenMonat: 0,
    vertriebskanaele: [],
    spezialTags: [],
    toolStack: "egal",
    serviceBedarf: ["Laufende Buchhaltung", "Jahresabschluss + Steuererklärungen", "USt-Voranmeldung monatlich"],
    slaWunsch: "48h",
    budget: "",
    plz: "",
    remoteOk: true,
    painPoints: ["", "", ""],
  });
  const [selectedStbs, setSelectedStbs] = useState<Set<string>>(new Set());
  const [generating, setGenerating] = useState(false);

  const toggleArrayItem = <K extends keyof Briefing>(key: K, val: string) => {
    setBriefing((b) => {
      const arr = b[key] as string[];
      const next = arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
      return { ...b, [key]: next } as Briefing;
    });
  };

  const [onlineOnly, setOnlineOnly] = useState(false);
  const [minRating, setMinRating] = useState<0 | 4.0 | 4.5 | 4.8>(0);
  const [showAll, setShowAll] = useState(false);
  const [showAvoid, setShowAvoid] = useState(false);

  const matches = useMemo(
    () => matchStbs(briefing, { onlineOnly, minRating }),
    [briefing, onlineOnly, minRating],
  );
  const userRegion = briefing.plz ? plzToRegion(briefing.plz) : null;
  const visibleMatches = showAll ? matches : matches.slice(0, 12);
  const selectedStbList = useMemo(() => STB_POOL.filter((s) => selectedStbs.has(s.id)), [selectedStbs]);

  const toggleStb = (id: string) => {
    setSelectedStbs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 3) next.add(id);
      return next;
    });
  };

  const setPainPoint = (idx: number, val: string) => {
    setBriefing((b) => ({
      ...b,
      painPoints: b.painPoints.map((p, i) => (i === idx ? val : p)),
    }));
  };

  // Validierung Step 1
  const step1Valid =
    briefing.rechtsform &&
    briefing.serviceBedarf.length > 0 &&
    briefing.painPoints.filter((p) => p.trim().length > 5).length >= 1;

  const generatePdf = async () => {
    setGenerating(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      let y = 20;

      const line = (text: string, opts: { size?: number; bold?: boolean; gap?: number } = {}) => {
        const { size = 10, bold = false, gap = 5 } = opts;
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.setFontSize(size);
        doc.setFont("helvetica", bold ? "bold" : "normal");
        const wrapped = doc.splitTextToSize(text, 175);
        doc.text(wrapped, 15, y);
        y += wrapped.length * (size * 0.45) + gap;
      };

      line("Anonymisiertes Briefing — Gründer-Mandat", { size: 18, bold: true, gap: 3 });
      line(`Erstellt: ${new Date().toLocaleDateString("de-DE")} · via gruenderx.de`, { size: 8, gap: 8 });

      line("Mandant-Profil (anonymisiert)", { size: 13, bold: true, gap: 3 });
      line(`Rechtsform: ${briefing.rechtsform}`);
      line(`Umsatz-Bereich: ${briefing.umsatzRange}`);
      line(`Belege/Monat: ${briefing.belegeMonat}`);
      line(`Mitarbeiter: ${briefing.mitarbeiter}, davon Lohnabrechnungen: ${briefing.lohnabrechnungenMonat}`);
      if (briefing.plz) line(`PLZ: ${briefing.plz} (Remote-OK: ${briefing.remoteOk ? "ja" : "nein"})`);
      y += 3;

      if (briefing.vertriebskanaele.length > 0) {
        line("Vertriebskanäle", { size: 12, bold: true, gap: 2 });
        briefing.vertriebskanaele.forEach((k) => line(`• ${k}`, { size: 9, gap: 2 }));
        y += 3;
      }

      if (briefing.spezialTags.length > 0) {
        line("Spezial-Anforderungen / Themen", { size: 12, bold: true, gap: 2 });
        briefing.spezialTags.forEach((t) => line(`• ${SPEZIAL_TAG_LABELS[t]}`, { size: 9, gap: 2 }));
        y += 3;
      }

      line("Service-Bedarf", { size: 12, bold: true, gap: 2 });
      briefing.serviceBedarf.forEach((s) => line(`• ${s}`, { size: 9, gap: 2 }));
      y += 3;

      line("Tool-Stack-Wunsch", { size: 12, bold: true, gap: 2 });
      line(briefing.toolStack === "egal" ? "Kein Wunsch" : briefing.toolStack.toUpperCase(), { size: 9, gap: 5 });

      line("Reaktions-SLA-Erwartung", { size: 12, bold: true, gap: 2 });
      line(briefing.slaWunsch === "24h" ? "24h Antwort" : briefing.slaWunsch === "48h" ? "48h Antwort" : "1 Woche", {
        size: 9,
        gap: 5,
      });

      if (briefing.budget) {
        line("Budget-Range (optional)", { size: 12, bold: true, gap: 2 });
        line(briefing.budget, { size: 9, gap: 5 });
      }

      // 3-Punkte-Briefing-Antwort
      const filledPP = briefing.painPoints.filter((p) => p.trim().length > 5);
      if (filledPP.length > 0) {
        line(`Bitte konkret zu folgenden ${filledPP.length} Punkt${filledPP.length > 1 ? "en" : ""} Stellung nehmen`, {
          size: 12,
          bold: true,
          gap: 3,
        });
        line("(2-3 Sätze pro Punkt — kein Standard-Anschreiben)", { size: 8, gap: 4 });
        filledPP.forEach((p, i) => line(`${i + 1}. ${p}`, { size: 10, gap: 4 }));
      }

      y += 5;
      line("Erwartetes Angebot — strukturierte Felder", { size: 12, bold: true, gap: 2 });
      line("• Pauschale Buchhaltung pro Monat (€)", { size: 9, gap: 2 });
      line("• Pauschale Jahresabschluss (€)", { size: 9, gap: 2 });
      line("• Beleg-Aufschlag bei Überschreitung Belege-Range (€/Beleg)", { size: 9, gap: 2 });
      line("• Pauschale Lohnabrechnung (€/MA/Monat)", { size: 9, gap: 2 });
      line("• Stundensatz für Sondervorgänge (€/h)", { size: 9, gap: 2 });
      line("• Honorar-Cap pro Jahr (€) - PFLICHT", { size: 9, gap: 2 });
      line("• Reaktions-SLA-Zusage (24h/48h/1 Wo)", { size: 9, gap: 5 });

      y += 5;
      line("Hinweis", { size: 11, bold: true, gap: 2 });
      line(
        "Dies ist eine erste Honorar-Anfrage. Klartext-Stammdaten (Firma, USt-ID, Bank) werden erst nach Annahme des Angebots übermittelt — DSGVO-konformer 2-Stufen-Flow.",
        { size: 8, gap: 5 },
      );

      doc.save(`gruenderx-stb-briefing-${new Date().toISOString().slice(0, 10)}.pdf`);
    } finally {
      setGenerating(false);
    }
  };

  const buildEmailBody = () => {
    const lines: string[] = [];
    lines.push("Sehr geehrte Damen und Herren,");
    lines.push("");
    lines.push(
      `ich suche eine Steuerberatung für mein Mandat und habe mein Anfrage-Profil über gruenderx.de strukturiert (PDF im Anhang).`,
    );
    lines.push("");
    lines.push("Eckdaten zur Vorab-Einschätzung:");
    lines.push(`• Rechtsform: ${briefing.rechtsform}`);
    lines.push(`• Umsatz-Range: ${briefing.umsatzRange}`);
    lines.push(`• Belege/Monat: ${briefing.belegeMonat}`);
    lines.push(`• Mitarbeiter: ${briefing.mitarbeiter} (davon Lohn: ${briefing.lohnabrechnungenMonat})`);
    if (briefing.spezialTags.length > 0) {
      lines.push(`• Spezial-Themen: ${briefing.spezialTags.map((t) => SPEZIAL_TAG_LABELS[t]).join(", ")}`);
    }
    lines.push("");
    const filledPP = briefing.painPoints.filter((p) => p.trim().length > 5);
    if (filledPP.length > 0) {
      lines.push(`Bitte konkret zu folgenden ${filledPP.length} Punkt${filledPP.length > 1 ? "en" : ""} Stellung nehmen:`);
      filledPP.forEach((p, i) => lines.push(`${i + 1}. ${p}`));
      lines.push("");
    }
    lines.push("Erwartete Angebots-Struktur (PDF im Anhang detailliert):");
    lines.push("• Monatspauschale Buchhaltung");
    lines.push("• Pauschale JA");
    lines.push("• Beleg-Aufschlag");
    lines.push("• Lohn-Pauschale (€/MA/Mon)");
    lines.push("• Stundensatz Sondervorgänge");
    lines.push("• Honorar-Cap pro Jahr (PFLICHT)");
    lines.push(`• Reaktions-SLA-Zusage (Wunsch: ${briefing.slaWunsch})`);
    lines.push("");
    lines.push(
      "Klartext-Stammdaten (Firma, USt-ID, Bank) übermittle ich nach Annahme des Angebots — DSGVO-konformer 2-Stufen-Flow.",
    );
    lines.push("");
    lines.push("Vielen Dank für eine kurze Rückmeldung mit Erstangebot.");
    lines.push("");
    lines.push("Beste Grüße");
    return lines.join("\n");
  };

  const sendEmail = () => {
    if (selectedStbList.length === 0) {
      alert("Bitte mindestens 1 Steuerberater-Profil auswählen.");
      return;
    }
    const subject = `Honorar-Anfrage Gründer-Mandat — ${briefing.rechtsform} (${briefing.umsatzRange})`;
    const body = buildEmailBody();
    const note = `\n\n---\nHinweis: Diese Anfrage geht parallel an ${selectedStbList.length} Kanzleien (BCC). Die Kanzleien sehen sich gegenseitig nicht.`;
    // Mailto-URLs sind URL-länge-limitiert (~2000 chars) — Body ist hier safe.
    // BCC nutzen damit StBs sich nicht gegenseitig sehen.
    const bccList = selectedStbList.map((s) => `info@${new URL(s.url).hostname.replace(/^www\./, "")}`).join(",");
    const url = `mailto:?bcc=${encodeURIComponent(bccList)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + note)}`;
    window.location.href = url;
  };

  const copyEmailBody = async () => {
    try {
      await navigator.clipboard.writeText(buildEmailBody());
      alert("Email-Body in Zwischenablage kopiert. PDF separat anhängen.");
    } catch {
      alert("Konnte nicht in Zwischenablage kopieren.");
    }
  };

  return (
    <CockpitShell
      eyebrow="StB-Hand-off · 3-Angebote-Modell"
      title="Steuerberater-Match in 3 Schritten"
      subtitle="1) Anonymisiertes Briefing ausfüllen · 2) Top-3 passende Kanzleien aus 11 Spezialisten wählen · 3) Briefing-PDF + Email-Helper. Du verschickst selbst — wir sind nur Werkzeug, keine Vermittlung (§9 StBerG-konform)."
      showRelated={false}
    >
      {/* Step-Indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold transition-all ${
                step >= s
                  ? "bg-accent-blue text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
            </div>
            <div className="flex-1">
              <div className={`text-xs font-semibold ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                {s === 1 && "Briefing"}
                {s === 2 && "Kanzleien wählen"}
                {s === 3 && "Bestätigen + Versand"}
              </div>
            </div>
            {s < 3 && <div className={`h-0.5 flex-1 ${step > s ? "bg-accent-blue" : "bg-secondary"}`} />}
          </div>
        ))}
      </div>

      {/* === STEP 1: BRIEFING === */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-bold text-sm mb-3">Mandant-Profil</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Rechtsform *</Label>
                <select
                  value={briefing.rechtsform}
                  onChange={(e) => setBriefing({ ...briefing, rechtsform: e.target.value })}
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
                >
                  {RECHTSFORM_OPTIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs">Umsatz-Range / Jahr *</Label>
                <select
                  value={briefing.umsatzRange}
                  onChange={(e) => setBriefing({ ...briefing, umsatzRange: e.target.value as Briefing["umsatzRange"] })}
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
                >
                  {UMSATZ_OPTIONS.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs">Belege / Monat *</Label>
                <select
                  value={briefing.belegeMonat}
                  onChange={(e) => setBriefing({ ...briefing, belegeMonat: e.target.value as Briefing["belegeMonat"] })}
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
                >
                  {BELEGE_OPTIONS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs">PLZ (für Regional-Match, optional)</Label>
                <Input
                  value={briefing.plz}
                  onChange={(e) => setBriefing({ ...briefing, plz: e.target.value })}
                  placeholder="z.B. 22527"
                  className="h-9 text-sm mt-1"
                  maxLength={5}
                />
              </div>
              <div>
                <Label className="text-xs">Mitarbeiter gesamt</Label>
                <Input
                  type="number"
                  value={briefing.mitarbeiter || ""}
                  onChange={(e) => setBriefing({ ...briefing, mitarbeiter: Math.max(0, Number(e.target.value) || 0) })}
                  className="h-9 text-sm mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Lohnabrechnungen / Monat</Label>
                <Input
                  type="number"
                  value={briefing.lohnabrechnungenMonat || ""}
                  onChange={(e) =>
                    setBriefing({ ...briefing, lohnabrechnungenMonat: Math.max(0, Number(e.target.value) || 0) })
                  }
                  className="h-9 text-sm mt-1"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-bold text-sm mb-3">Vertriebskanäle</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {VERTRIEBSKANAELE.map((k) => (
                <label key={k} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-secondary/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={briefing.vertriebskanaele.includes(k)}
                    onChange={() => toggleArrayItem("vertriebskanaele", k)}
                    className="h-3.5 w-3.5"
                  />
                  <span className="text-xs">{k}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-bold text-sm mb-3">Spezial-Themen (treiben das Match)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {(Object.keys(SPEZIAL_TAG_LABELS) as StbSpecTag[]).map((tag) => (
                <label key={tag} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-secondary/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={briefing.spezialTags.includes(tag)}
                    onChange={() => toggleArrayItem("spezialTags", tag)}
                    className="h-3.5 w-3.5"
                  />
                  <span className="text-xs">{SPEZIAL_TAG_LABELS[tag]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-bold text-sm mb-3">Service-Bedarf *</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {SERVICE_OPTIONS.map((s) => (
                <label key={s} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-secondary/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={briefing.serviceBedarf.includes(s)}
                    onChange={() => toggleArrayItem("serviceBedarf", s)}
                    className="h-3.5 w-3.5"
                  />
                  <span className="text-xs">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-bold text-sm mb-3">Tool-Stack + SLA</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label className="text-xs">Tool-Stack-Wunsch</Label>
                <select
                  value={briefing.toolStack}
                  onChange={(e) => setBriefing({ ...briefing, toolStack: e.target.value as Briefing["toolStack"] })}
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
                >
                  <option value="egal">Kein Wunsch</option>
                  <option value="datev">DATEV</option>
                  <option value="lexoffice">Lexoffice</option>
                  <option value="sevdesk">sevDesk</option>
                  <option value="buchhaltungsbutler">BuchhaltungsButler</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Reaktions-SLA-Wunsch</Label>
                <select
                  value={briefing.slaWunsch}
                  onChange={(e) => setBriefing({ ...briefing, slaWunsch: e.target.value as Briefing["slaWunsch"] })}
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
                >
                  <option value="24h">24h</option>
                  <option value="48h">48h</option>
                  <option value="1woche">1 Woche</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Budget-Range (optional)</Label>
                <Input
                  value={briefing.budget}
                  onChange={(e) => setBriefing({ ...briefing, budget: e.target.value })}
                  placeholder="z.B. 6-12k €/Jahr"
                  className="h-9 text-sm mt-1"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
            <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-blue" /> 3 Pain-Points (mind. 1 ausfüllen) *
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Konkrete Fragen oder Sorgen. StB muss in 2-3 Sätzen jede beantworten — verhindert Standard-Anschreiben.
            </p>
            <div className="space-y-2">
              {briefing.painPoints.map((p, idx) => (
                <Input
                  key={idx}
                  value={p}
                  onChange={(e) => setPainPoint(idx, e.target.value)}
                  placeholder={[
                    "z.B. Wie bucht ihr Amazon-Reverse-Charge §13b für IT/FR/ES korrekt?",
                    "z.B. Erfahrung mit OSS-Verfahren bei FBA-Pan-EU?",
                    "z.B. Wie schnell antwortet ihr auf Mandanten-Email — gleicher Tag, 24h, 48h?",
                  ][idx]}
                  className="h-10 text-sm"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!step1Valid}
              className="inline-flex items-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-6 py-3 text-sm font-bold hover:opacity-90 disabled:opacity-50"
            >
              Zu Schritt 2: Kanzleien wählen <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* === STEP 2: KANZLEIEN === */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex items-start gap-2">
              <Search className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-sm">
                  Top-Match aus {STB_POOL.length} Spezialisten — Algorithm-Score basierend auf deinem Briefing
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Wähle bis zu 3 Kanzleien aus. Match-Algorithm basiert auf Spezial-Tags + Größe + Tool-Stack +
                  Sprachen + Online-Fähigkeit + öffentlichen Bewertungen. Liste ist redaktionell kuratiert
                  (öffentlich bekannte Specialists), keine Affiliate-Beziehung.
                </div>
                <div className="text-xs text-accent-blue font-semibold mt-1">
                  {selectedStbs.size} / 3 ausgewählt · {matches.length} passende Kanzleien gefiltert
                </div>
              </div>
            </div>
          </div>

          {/* === FILTER-CHIPS === */}
          <div className="rounded-2xl border border-border bg-card p-4">
            {userRegion ? (() => {
              const cov = regionCoverage(userRegion);
              const isThin = cov.local <= 2;
              return (
                <div
                  className={`mb-3 rounded-lg border px-3 py-2 ${
                    isThin
                      ? "bg-amber-500/5 border-amber-500/20"
                      : "bg-emerald-500/5 border-emerald-500/20"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <MapPin
                      className={`h-4 w-4 shrink-0 mt-0.5 ${
                        isThin ? "text-amber-700" : "text-emerald-700"
                      }`}
                    />
                    <div className="text-xs leading-relaxed flex-1">
                      <div>
                        <span
                          className={`font-semibold ${
                            isThin ? "text-amber-700" : "text-emerald-700"
                          }`}
                        >
                          PLZ {briefing.plz}
                        </span>
                        <span className="text-muted-foreground"> · </span>
                        <strong>{regionLabel(userRegion)}</strong>
                      </div>
                      <div className="text-muted-foreground mt-0.5">
                        Pool-Coverage: <strong className="text-foreground">{cov.local} lokal</strong>
                        {" · "}
                        <strong className="text-foreground">{cov.neighbor} Nachbar-Region</strong>
                        {" · "}
                        <strong className="text-foreground">{cov.online} Online (überall)</strong>
                        {isThin && (
                          <>
                            {" — "}
                            <span className="text-amber-700 font-semibold">
                              Wenig Lokale in deiner Region. Empfehle Online-Filter aktivieren oder
                              DATEV SmartExperts / StBK-Suche im Pool nutzen.
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="flex items-center gap-2 mb-3 rounded-lg bg-amber-500/5 border border-amber-500/20 px-3 py-2">
                <MapPin className="h-4 w-4 text-amber-700 shrink-0" />
                <div className="text-xs">
                  <span className="text-amber-700 font-semibold">Keine PLZ angegeben</span>
                  <span className="text-muted-foreground"> — Distance wird im Match nicht berücksichtigt. Zurück zu </span>
                  <button onClick={() => setStep(1)} className="underline font-semibold">
                    Briefing
                  </button>
                  <span className="text-muted-foreground"> + PLZ nachtragen für lokale Treffer.</span>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Filter
              </div>
              {(onlineOnly || minRating > 0) && (
                <button
                  onClick={() => {
                    setOnlineOnly(false);
                    setMinRating(0);
                  }}
                  className="text-[11px] text-muted-foreground hover:text-foreground underline"
                >
                  Zurücksetzen
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setOnlineOnly((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  onlineOnly
                    ? "bg-accent-blue text-primary-foreground"
                    : "border border-border bg-card hover:bg-secondary"
                }`}
              >
                <Wifi className="h-3.5 w-3.5" /> Nur Online-Kanzleien
              </button>

              <div className="inline-flex items-center gap-1 border border-border bg-card rounded-full p-1">
                <span className="text-[11px] text-muted-foreground px-2">Min-Rating:</span>
                {([0, 4.0, 4.5, 4.8] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      minRating === r
                        ? "bg-accent-blue text-primary-foreground"
                        : "hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    {r === 0 ? "alle" : `${r.toFixed(1)}★`}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAvoid((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border border-red-500/30 bg-red-500/5 text-red-700 hover:bg-red-500/10"
              >
                <ShieldAlert className="h-3.5 w-3.5" /> AVOID-Liste {showAvoid ? "ausblenden" : "anzeigen"} ({STB_AVOID_LIST.length})
              </button>
            </div>
          </div>

          {/* === AVOID-Box === */}
          {showAvoid && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4">
              <div className="flex items-start gap-2 mb-2">
                <ShieldAlert className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-red-700">
                    Kanzleien wo Community/Reviews überwiegend warnen
                  </div>
                  <div className="text-xs text-red-700/80">
                    Nicht im Match-Pool — basierend auf öffentlichen Beschwerde-Aggregaten.
                  </div>
                </div>
              </div>
              <ul className="space-y-2">
                {STB_AVOID_LIST.map((a, i) => (
                  <li key={i} className="rounded-lg border border-red-500/20 bg-card p-3">
                    <div className="font-semibold text-sm">{a.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{a.reason}</div>
                    <div className="text-[10px] text-muted-foreground/70 mt-1 italic">Quelle: {a.source}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* === KARTEN-GRID === */}
          {visibleMatches.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Keine Kanzleien passen zu deinen Filtern. Schwächere Min-Rating-Schwelle wählen oder
              Online-only-Filter deaktivieren.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {visibleMatches.map((m, idx) => {
              const isSelected = selectedStbs.has(m.stb.id);
              const canSelect = selectedStbs.size < 3 || isSelected;
              return (
                <div
                  key={m.stb.id}
                  className={`rounded-2xl border p-4 transition-all ${
                    isSelected
                      ? "border-accent-blue bg-accent-blue/5"
                      : "border-border bg-card hover:border-accent-blue/40"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider rounded-full bg-accent-blue/10 text-accent-blue px-2 py-0.5">
                          Score {m.score}
                        </span>
                        {idx < 3 && (
                          <span className="text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5">
                            Top {idx + 1}
                          </span>
                        )}
                        {m.stb.online_first && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-blue-500/10 text-blue-700 px-2 py-0.5">
                            <Wifi className="h-2.5 w-2.5" /> Online
                          </span>
                        )}
                        {m.stb.rating !== undefined && (() => {
                          const ratingClass = `inline-flex items-center gap-1 text-[10px] font-bold rounded-full px-2 py-0.5 ${
                            m.stb.rating >= 4.7
                              ? "bg-emerald-500/10 text-emerald-700"
                              : m.stb.rating >= 4.0
                              ? "bg-amber-500/10 text-amber-700"
                              : "bg-red-500/10 text-red-700"
                          }`;
                          const reviewUrl =
                            m.stb.rating_source === "Trustpilot"
                              ? `https://www.trustpilot.com/search?query=${encodeURIComponent(m.stb.name)}`
                              : m.stb.rating_source === "ProvenExpert"
                              ? `https://www.provenexpert.com/de-de/suche/?query=${encodeURIComponent(m.stb.name)}`
                              : m.stb.rating_source === "Google"
                              ? `https://www.google.com/search?q=${encodeURIComponent(m.stb.name + " Bewertungen")}`
                              : m.stb.rating_source === "kununu"
                              ? `https://www.kununu.com/de/search?q=${encodeURIComponent(m.stb.name)}`
                              : null;
                          const inner = (
                            <>
                              <Star className="h-2.5 w-2.5 fill-current" /> {m.stb.rating.toFixed(1)}
                              {m.stb.rating_count !== undefined && (
                                <span className="opacity-70 font-normal">({m.stb.rating_count})</span>
                              )}
                            </>
                          );
                          return reviewUrl ? (
                            <a
                              href={reviewUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className={`${ratingClass} hover:opacity-80`}
                              title={`${m.stb.rating}★ aus ${m.stb.rating_count ?? "?"} Bewertungen via ${m.stb.rating_source} — auf ${m.stb.rating_source} ansehen`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {inner}
                            </a>
                          ) : (
                            <span
                              className={ratingClass}
                              title={`${m.stb.rating}★ aus ${m.stb.rating_count ?? "?"} Bewertungen via ${m.stb.rating_source ?? "?"}`}
                            >
                              {inner}
                            </span>
                          );
                        })()}
                        <span className="text-[10px] text-muted-foreground">
                          {m.stb.groesse === "boutique" ? "Boutique" : m.stb.groesse === "mid" ? "Mid-Market" : "Enterprise"}
                        </span>
                      </div>
                      <h4 className="font-bold text-base flex items-center gap-1.5">
                        <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="truncate">{m.stb.name}</span>
                      </h4>
                      <div className="text-[11px] text-muted-foreground">
                        {m.stb.city} · {m.stb.sprachen.join(", ").toUpperCase()}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleStb(m.stb.id)}
                      disabled={!canSelect}
                      className={`shrink-0 rounded-md text-xs font-semibold px-3 py-1.5 transition-colors ${
                        isSelected
                          ? "bg-accent-blue text-primary-foreground"
                          : canSelect
                          ? "border border-border hover:bg-secondary"
                          : "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      {isSelected ? "✓ Gewählt" : "Wählen"}
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{m.stb.tagline}</p>

                  <div className="text-[11px] text-emerald-700 font-semibold mb-2">{m.stb.honorarHinweis}</div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {m.stb.specs.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] rounded-full border border-border bg-secondary px-2 py-0.5 text-muted-foreground"
                      >
                        {SPEZIAL_TAG_LABELS[s] || s}
                      </span>
                    ))}
                  </div>

                  {m.reason && (
                    <div className="text-[10px] text-accent-blue mb-2">→ {m.reason}</div>
                  )}

                  {m.stb.reddit_mention && (
                    <div className="flex items-start gap-1.5 text-[10px] text-muted-foreground italic mb-2 rounded-md bg-muted/40 px-2 py-1.5">
                      <MessageCircle className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>{m.stb.reddit_mention}</span>
                    </div>
                  )}

                  <details className="text-xs">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                      Was sie besonders gut können
                    </summary>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5 text-muted-foreground">
                      {m.stb.besonders.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                    <a
                      href={m.stb.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent-blue mt-1.5 hover:underline"
                    >
                      Webseite öffnen <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </details>
                </div>
              );
            })}
            </div>
          )}

          {!showAll && matches.length > 12 && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full rounded-xl border border-dashed border-border bg-card hover:bg-secondary px-4 py-3 text-sm font-semibold text-muted-foreground"
            >
              Alle {matches.length} Kanzleien anzeigen ({matches.length - 12} weitere)
            </button>
          )}

          <div className="flex justify-between pb-24 md:pb-20">
            <button
              onClick={() => setStep(1)}
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
            >
              ← Zurück zum Briefing
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={selectedStbs.size === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-6 py-3 text-sm font-bold hover:opacity-90 disabled:opacity-50"
            >
              Zu Schritt 3: PDF + Versand <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* === STICKY BOTTOM-BAR === */}
          {/* Sobald 1+ StB gewählt: schwebende Action-Bar mit Live-Count + CTA.
              Löst UX-Problem dass Weiter-Button am Ende von 30 Karten nicht sichtbar ist. */}
          {selectedStbs.size > 0 && (
            <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.15)]">
              <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-accent-blue/15 shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-accent-blue" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold leading-tight">
                      {selectedStbs.size} Kanzlei{selectedStbs.size === 1 ? "" : "en"} gewählt
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate hidden sm:block">
                      {selectedStbList.map((s) => s.name).join(" · ")}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-5 py-2.5 text-sm font-bold hover:opacity-90 shadow-md shrink-0"
                >
                  <span className="hidden sm:inline">Weiter</span>
                  <span className="sm:hidden">Weiter</span>
                  <span className="hidden md:inline">: Bestätigen + Versand</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === STEP 3: VERSAND === */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-accent-blue/30 bg-gradient-to-br from-accent-blue/5 to-card p-5">
            <h3 className="font-bold text-base mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent-blue" /> Bereit für Versand
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Du hast {selectedStbList.length} Kanzlei{selectedStbList.length === 1 ? "" : "en"} ausgewählt. Lade
              jetzt das Briefing-PDF herunter und schick es per Email — Mailto-Helper bereitet alles vor.
            </p>

            <div className="rounded-xl bg-card border border-border p-4 mb-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                Empfänger ({selectedStbList.length})
              </div>
              <div className="space-y-1.5">
                {selectedStbList.map((s) => (
                  <div key={s.id} className="flex items-center gap-2 text-sm">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-xs text-muted-foreground">· {s.city}</span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-xs text-accent-blue hover:underline inline-flex items-center gap-0.5"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={generatePdf}
                disabled={generating}
                className="inline-flex items-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-4 py-2.5 text-sm font-bold hover:opacity-90 disabled:opacity-50"
              >
                {generating && <Loader2 className="h-4 w-4 animate-spin" />}
                <FileText className="h-4 w-4" /> Briefing-PDF generieren
              </button>
              <button
                onClick={sendEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold hover:bg-secondary"
              >
                <Mail className="h-4 w-4" /> Email öffnen (BCC)
              </button>
              <button
                onClick={copyEmailBody}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold hover:bg-secondary"
              >
                Email-Text kopieren
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-700" /> Wichtig — Was du jetzt tust
            </h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-muted-foreground leading-relaxed">
              <li>
                <strong>PDF generieren</strong> — anonymisiertes Briefing wird heruntergeladen.
              </li>
              <li>
                <strong>Email öffnen</strong> — Standard-Mail-Client öffnet sich mit allen Kanzleien in BCC und
                vorausgefülltem Body.
              </li>
              <li>
                <strong>PDF anhängen</strong> — manuell als Email-Anhang anfügen.
              </li>
              <li>
                <strong>Versenden</strong> — Email geht direkt an alle Kanzleien (kein Umweg über GründerX).
              </li>
              <li>
                <strong>Auf Antworten warten</strong> — Kanzleien antworten meist binnen 48h-1 Woche mit Erstangebot.
              </li>
              <li>
                <strong>Vergleichen + Auswählen</strong> — Pauschalen + Beleg-Cap + SLA + Reaktion vergleichen.
                Wichtig: Mandant nimmt Klartext-Daten erst nach Angebots-Annahme an.
              </li>
            </ol>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 text-[10px] text-muted-foreground leading-relaxed">
            <strong>Rechtlicher Rahmen:</strong> GründerX vermittelt nicht (§9 StBerG). Die Kanzlei-Liste ist
            redaktionell kuratiert basierend auf öffentlich bekannten Spezialisierungen — keine
            Provisions-Beziehung. Eigene Recherche + Erstgespräch bleibt Pflicht. Aufnahme-Kapazität nicht
            garantiert (~30 % der DE-Kanzleien haben Aufnahmestopp wegen Nachwuchs-Knappheit). DSGVO: Klartext-
            Stammdaten (Firma, USt-ID, Bank) erst nach Annahme an die gewählte Kanzlei übermitteln (2-Stufen-Flow).
          </div>

          <div className="flex justify-start">
            <button
              onClick={() => setStep(2)}
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
            >
              ← Zurück zur Kanzlei-Auswahl
            </button>
          </div>
        </div>
      )}
    </CockpitShell>
  );
};

export default StbMatch;
